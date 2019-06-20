const express = require('express');
const router = express.Router();
const sendData=require('../controllers/sendData');
router.use(express.json());
router.use(express.urlencoded({extended:false})); 

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render("register");
});

router.route('/').post((req,res)=>{
  console.log(req.body)

  
  sendData.addUser(req.body.name,req.body.birthday,req.body.gender,
    req.body.userName,req.body.email,
    req.body.passowrd,req.body.club,(callback)=>{if(callback){
      res.render("signin")
    }else{
      res.send(req.body)
    }})
    
})
module.exports = router;
