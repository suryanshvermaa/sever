const nodemailer=require('nodemailer');
require('dotenv').config();

exports.otpGenAndSend=async(email)=>{
     const transporter=await nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MY_EMAIL,
            pass:process.env.MY_PASSWORD
        }
     });

     
     //random otp generation
     const randomNumber=Math.random()*1000000;
     const otp=Math.floor(randomNumber).toString();

     if(otp.length!=6){
      const powerFactor=6-otp.length;
     otp*=Math.pow(10,powerFactor);
     }
    

     

     const info=await transporter.sendMail({
        from:'suryanshverma9580@gmail.com',
        to:email,
        subject:'YOUR OTP!!',
        text:"YOUR OTP for verfication on suryansh's website is",
        html:`<h2 style="text-align:center;">YOUR OTP for verfication on suryansh's website is</h2><h1 style="text-align:center;"><b>${otp}</b></h1>`
     })
     return otp;
}