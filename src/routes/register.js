const express = require('express');
const router = express.Router();
const sendData = require('../controllers/sendData');
const databaseManger = require('../controllers/databaseManager')
const conf = require('../routes/mongoConfig')
const { check, oneOf, validationResult } = require('express-validator');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


const notRobot = require('../controllers/notRobot')
const mailManager = require('../controllers/sendEmail')
/* GET register page. */
router.get('/', function (req, res, next) {
  res.render("register");
});


router.route('/').post(
  oneOf([
    check('name').isLength({ min: 3 }),

  ]), (req, res) => {
    //const name  = req.body.name
    if (validationResult(req).isEmpty()) {
      console.log("ok validation")
      notRobot(req, (notrobot) => {
        if (notrobot) {
          //if not robot we work on our function
          //res.send("not robot")
          databaseManger.check(conf.configMongoURI, conf.dbname, "users", {
            $or: [ { userName: req.body.userName }, {email: req.body.email } ]
            
            
          }, (response) => {
            if (response) {
              if (response.message) {
                console.log("ERRRRRRROR   " + response)
              } else {
                console.log("User name or email is Used Use other")
              }
              // console.log("User name or email is Used Use other ")
              // callback(response)
            } else {
  
              databaseManger.insertToDb(conf.configMongoURI, conf.dbname, "users", {
                name: req.body.name, birthDate: req.body.birthday, gender: req.body.gender,
                userName: req.body.userName, email: req.body.email,
                passowrd: req.body.passowrd, favoriteClub: req.body.club, verNum: Math.floor((Math.random() * 100) - Math.random() + 54 * 5555 + 80 * 0975436789),
                admin: false,
                verfied: false,
                active: false,
              }, (satatus) => {
                if (satatus) {
                  console.log("#Done insert Data")
                  mailManager.sendEmail(req, (ok) => {
                    if (ok == 0) {
                      res.send("vernum not found ")
                    } else if (!ok) {
                      res.send("email error ")
                    } else {
                      //Done evrything
                      //i should render home page with aler message to verifye email 
                      res.send("ok");
                    }
                  })
                } else {
                  console.log("#############Not Done insert Data")
                  res.send(satatus)
                }
  
  
              })
  
  
            }
  
          })
        } else {
          res.send("am a robot")
        }
      })
    }
    else {
      res.send("not ok validation")
    }

    
  })







module.exports = router 