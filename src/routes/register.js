const express = require('express');
const router = express.Router();
const sendData=require('../controllers/sendData');
router.use(express.json());
router.use(express.urlencoded({extended:false})); 
var request = require('request');



const notRobot=require('../controllers/notRobot')
const mailManager=require('../controllers/sendEmail')
/* GET register page. */
router.get('/', function(req, res, next) {
  res.render("register");
});


var rand,data,host,link;
router.route('/').post((req,res)=>{
  notRobot(req,(notrobot)=>{
if(notrobot){
  //if not robot we work on our function
  //res.send("not robot")
    sendData.addUser(req.body.name,req.body.birthday,req.body.gender,
    req.body.userName,req.body.email,
    req.body.passowrd,req.body.club,(callback)=>{if(callback){
      mailManager.sendEmail(req,(ok)=>{
        if(ok==0){
          res.send("vernum not found 11111111111111")
        }else if(!ok){
          res.send("email error 9999999999999")
        }else{
          res.send("ok");
        }
          })
    }else{
      res.send("error.message")
    }
  })
 
}else{
  res.send("am a robot")
}
  })

   


    
})
module.exports = {router,data};
