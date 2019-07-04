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

  res.render('signin', {navlogo: 'img/logos/logo-title-min.jpeg'});
});

router.route('/').post((req, res) => {
  // req.session.sportSession = true
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
        if (response.favoriteClub === "Real Madrid") {
          if (response.admin === true) {
            res.send("welcome madrid admin")
          } else {
            res.redirect("/loged/madrid/home/"+response.userName);
          }
        } else if (response.favoriteClub === "Barcelona") {
          if (response.admin === true) {
            res.send("welcome barce admin")
          } else {
            res.redirect("/loged/barca/home/"+response.userName)
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
