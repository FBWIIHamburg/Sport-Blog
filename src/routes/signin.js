const express = require('express');
const router = express.Router();
//const getData=require('../controllers/getData');
const datar = require('./register');
const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')


router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.route('/').get(function (req, res, ) {



  res.render('signin');
});

router.route('/').post((req, res) => {
  getData.check(config.configMongoURI, config.dbname, config.collectionName, {
    userName: req.body.userName,

  }, (response) => {
   // console.log(response+"<br>"+userName+"<br>"+req.body.userName)

    if (response) {
     // console.log(response+"<br>"+userName+"<br>"+req.body.userName)
      if (req.body.userName === response.userName &&
        req.body.passowrd === response.passowrd &&
        response.verfied === true &&
        response.active === true) {
        if (response.favoriteClub === "real") {
          if (response.admin === true) {
            res.send("welcome madride admin")
          } else {
            res.send("welcome madride user")
          }
        } else if (response.favoriteClub === "barce") {
          if (response.admin === true) {
            res.send("welcome barce admin")
          } else {
            res.send("welcome barce user")
          }

        } else {
          res.send("welcome");
        }

      } else {
        res.send("username or passowrd is wrong")
      }
    }

    else {
      res.send("user not found");
    }



  });

})

router.route('/moin').get(function (req, res, ) {



  res.send('signin');
});

  module.exports = router;
