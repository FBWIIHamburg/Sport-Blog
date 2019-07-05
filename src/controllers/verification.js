const express = require('express');
const router = express.Router();
//const getData=require('../controllers/getData');
//const datar=require('./register');
const databaseManger=require('../controllers/databaseManager')
router.use(express.json());
router.use(express.urlencoded({extended:false})); 
const conf = require('../routes/mongoConfig')
const {MongoClient,ObjectID} = require('mongodb');

router.route('/').get( function(req, res,) {
    databaseManger.check(conf.configMongoURI, conf.dbname, conf.collectionName, {
        verNum:Number(req.query.id)
      }, (response) => {
        if (response) {
            
          var host = req.get('host');
          var link = "http://" + req.get('host') + "verification/?id=" +response.verNum;
  
          console.log(req.protocol + ":/" + req.get('host'));
          if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
            console.log("Domain is matched. Information is from Authentic email");
            if (req.query.id == response.verNum) {
  
              console.log("email is verified");
              //res.end("<h1>Email " + response.userName + " is been Successfully verified");
            }
            else {
              console.log(response.verNum)
              console.log("email is not verified");
              res.end("<h1>Bad Request</h1>");
            }
          }
          else {
            res.end("<h1>Request is from unknown source");
          }
  let id;
            //!delete and update 
            databaseManger.update(conf.configMongoURI, conf.dbname, conf.collectionName, {
verNum:Number(req.query.id)

            },{
                    verNum:"0000",
                    verfied:true,
                    active:true,
                 
              }
              
              )

          console.log("User name FOUND ")
          res.end("<h1>Email " + response.userName + " is been Successfully verified</h1><br>"+
          "<a href=/signin>click to sign in</a>");

          
        } else {
          res.send("link expired ")
          console.log(response)

          callback(false)
        }
  
      })

});


module.exports=router