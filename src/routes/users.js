var express = require('express');
var router = express.Router();

const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')

router.get('/madrid/profile/:user', function(req, res, next) {
  getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
    if(favClub){
      const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                  res.render("userProfile", {myUser, favClub, clubclass: 'real'});
                  //console.log(myUser);   
              }
                  
          })
    }
  })
});

router.get('/barca/profile/:user', function (req, res, next) {
  getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
        if(favClub){
          const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                  res.render("userProfile", {myUser, favClub, clubclass: 'barca'});
               // console.log(favClub);   
                }
          })
        }
      })
});

module.exports = router;
