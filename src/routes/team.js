var express = require('express');
var router = express.Router();

const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')

router.get('/madrid/:user', (req, res) =>{
    getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
        if(favClub){
          const user = req.params.user;
              getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
                  if(myUser){
                    getData.check1(config.configMongoURI, 'home', 'Players', {clubName : "Real Madrid" }, (players) => {  
                        if(players){
                            console.log(players);
                            // var goalkeeper = [];
                            // var defender = [];
                            // var midfielder = [];
                            // var forward = [];
                            // var trainers = []; 
                            // for (let i = 0; i < players.length; i++) {
                            //     if(players[i].position === 'trainer'){
                            //         trainers.push(players[i]) ;
                            //     }else if(players[i].position === 'Goalkeeper'){
                            //         goalkeeper.push(players[i]) ;
                            //     }else if(players[i].players === 'Defender'){
                            //         defender.push(players[i]) ;
                            //     }else if(players[i].position === 'Midfielder'){
                            //         midfielder.push(players[i]) ;
                            //     }else if(players[i].position === 'Forward'){
                            //         forward.push(players[i]) ;
                            //     }
                                
                            // }
                            res.render("team", {myUser, favClub ,players , clubclass: 'real'});                       
                        }  else{
                              res.send('error')
                        }  
      
            }) 
                    }
                      
                            
                         
                  
                      
              })
        }
      })

});


router.get('/barca/:user', (req, res) =>{
    getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
        if(favClub){
          const user = req.params.user;
              getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
                  if(myUser){
                      res.render("team", {myUser, favClub, clubclass: 'barca'});
                      //console.log(myUser);   
                  }
                      
              })
        }
      })

});








module.exports = router;