const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended:false})); 
var request = require('request');


const notRobot=(req,callback)=>{
    console.log(req.body)
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
     console.log({"responseCode" : 1,"responseDesc" : "Please select captcha"});
    }
    // Put your secret key here.
    var secretKey = "6LeB3KkUAAAAAIaosUpss5F6VHnpMelkDtrfmgbj";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl,function(error,response,body) {

      body = JSON.parse(body);
      //!last  found problem  
      console.log(body)
      // Success will be true or false depending upon captcha validation.
      if(body.success !== undefined && !body.success) {
        console.log({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
        callback(false)
      }else{
        console.log({"responseCode" : 0,"responseDesc" : "Sucess"});
callback(true)
      }
    });
}





module.exports=notRobot