const express = require("express");


const {otpGenAndSend} =require('./otp.js');
const cors=require('cors');
const mongoose=require('mongoose')


const app=express();









app.use(express.json());
app.use(express.urlencoded({extended:true}));


const connection=async()=>{
  try {
    await  mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("erroe");
  }
}
connection();

const userSchema=new mongoose.Schema({
  user:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  otp:{
    type:String,
    required:true,
  },
  verified:{
     type:String,
     default:false
  }
})
const User=mongoose.model('User',userSchema);
app.post('/signup',async(req,res)=>{
  const {email,password}=req.body;
  const user=new User({
    email,
    password
  })
  const otp=await otpGenAndSend(email);
  user.otp=otp;
  await user.save();
  res.json("user created");
})



app.post("/signup/:otp",async (req, res) => {
 
  const otp=req.params.otp;
  const email=req.body.email;
  const user=await User.find({email});
  if(user.otp==otp){
    user.verified=true
    await user.save();
    return res.json({success:'success'});
  }
 res.json({wrong:'wrong'});
});


 
app.listen(8080, () => {
  console.log("server is running on port 8080");
});


