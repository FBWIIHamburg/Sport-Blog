const express = require('express');
const router = express.Router();
const sendData = require('../controllers/sendData');
const databaseManger = require('../controllers/databaseManager')
const conf = require('../routes/mongoConfig')

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


const notRobot = require('../controllers/notRobot')
const mailManager = require('../controllers/sendEmail')
/* GET register page. */
router.get('/', function (req, res, next) {
  res.render("register");
});


router.route('/').post((req, res) => {
  notRobot(req, (notrobot) => {
    if (notrobot) {
      //if not robot we work on our function
      //res.send("not robot")
      databaseManger.check(conf.configMongoURI, conf.dbname, "users", {
        userName: req.userName
      }, (response) => {
        if (response) {
      
          console.log("User name Used Use other ")
          callback(response)
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





})
module.exports = { router }