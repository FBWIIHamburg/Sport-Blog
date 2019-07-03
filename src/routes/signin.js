const express = require('express');
const router = express.Router();
const getData=require('../controllers/getData');
const datar=require('./register');

router.use(express.json());
router.use(express.urlencoded({extended:false})); 

router.route('/').get( function(req, res, ) {
    var rand=Math.floor((Math.random() * 100) + 54);
    var   host=req.get('host');
    var   link="http://"+req.get('host')+"signin/?id="+rand;

    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
          
            console.log("email is verified");
            res.end("<h1>Email "+datar.data.to+" is been Successfully verified");
        }
        else
        {
            console.log(rand)
            console.log("email is not verified");
           // res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    } 
    res.render('signin');
  });



   



  router.route('/signin').get((req,res)=>{

   
   // res.render('signin');

  })
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