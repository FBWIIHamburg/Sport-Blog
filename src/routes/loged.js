const express = require('express');
const session = require('express-session');
const router = express.Router();


const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// router.use(session({ secret: 'soccer' }));

// router.use((req, res, next) => {
// if(req.session.sportSession === true){
//       next();
// } else {
//       res.redirect('/signin');
// }
// });

router.get('/madrid/home/:user', function (req, res, next) {
      getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
            if(favClub){
                  const user = req.params.user;
                  getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
                        if(myUser){
                           res.render("userHome", {myUser, favClub, clubclass: 'real'});
                   console.log(myUser);   
                        }
                  
                  })
            }
          })
    });

    router.get('/barca/home/:user', function (req, res, next) {
      getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
            if(favClub){
                  const user = req.params.user;
                  getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
                        if(myUser){
                           res.render("userHome", {myUser, favClub, clubclass: 'barca'});
                       // console.log(favClub);   
                        }
                  
                  })
            }
          })
    });







    module.exports = router