const express = require('express');
const router = express.Router();
const getData=require('../controllers/getData');
router.use(express.json());
router.use(express.urlencoded({extended:false})); 

router.route('/').get( function(req, res, ) {
    res.render('signin');
  });
  
router.route('/').post((req,res)=>{
   getData.getUser(req.body.userName,req.body.passowrd,(callback)=>{
    if(callback){
        res.send("Welcome");
       }else{
           res.send(req.body);
       }
   })
   
   

})



module.exports = router;