const express = require('express');
const router = express.Router();
//const getData=require('../controllers/getData');
const session = require('express-session');
const datar = require('./register');
const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// router.use(session({ secret: 'soccer' }));

router.route('/').get(function (req, res) {

  res.render('changepassowrd', {navlogo: 'img/logos/logo-title-min.jpeg'});
});
var nodemailer = require("nodemailer");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "dci.developer1989@gmail.com",
        pass: "12345678910dci"
    }
});
var rand,mailOptions,host,link;
router.route('/').post((req, res) => {
  // req.session.sportSession = true
  getData.check(config.configMongoURI, config.dbname, config.collectionName, {
    userName: req.body.userName,

  }, (response) => {
    //console.log(response+"<br>"+userName+"<br>"+req.body.userName)

    if (response) {
     // console.log(response+"<br>"+userName+"<br>"+req.body.userName)
      if (req.body.userName === response.userName){
        rand=Math.floor((Math.random() * 100) + 54);
        host=req.get('host');
        link="http://"+req.get('host')+"/passowrd/verify?id="+rand;
        mailOptions={
            to : response.email,
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response){
         if(error){
                console.log(error);
            res.end("error");
         }else{
                console.log("Message sent: " + response.message);
            res.end("sent");
             }
            })
console.log("moin")
res.send("MOIN")

      } else {
        res.send("username or passowrd is wrong")
      }
    }

    else {
      res.send("user not found");
    }



  });

})
router.route('/verify').get(function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
res.render("changepassowrd1", {navlogo: 'img/logos/logo-title-min.jpeg'})        }
        else
        {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    });

    router.route('/verify').post(function(req,res){
        getData.update(config.configMongoURI, "blog", "users", {
            verNum:"0000"
                        },{
                                passowrd:req.body.userName,
                                verNum:"0000"
                           
                            
                               
                          }
                          
                          )
res.send("moinsss")

    })

  module.exports = router;
