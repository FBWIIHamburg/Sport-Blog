var express = require('express');
var router = express.Router();

const getData = require('../controllers/databaseManager');
const config = require('../routes/mongoConfig');
const mailManager = require('../controllers/sendEmail')

// router.use(express.json());
// router.use(express.urlencoded({ extended: false }));


router.get('/madrid/:user', (req, res) => {
    getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
        if(favClub){
    const user = req.params.user;
    getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
        if(myUser){
            res.render("updateProfile", {myUser, favClub, clubclass: 'real'});
            //console.log(myUser);   
        }
    })
}   

})
});

router.get('/barca/:user', (req, res) => {
    getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
        if(favClub){
    const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                  res.render("updateProfile", {myUser, favClub, clubclass: 'barca'});
                  //console.log(myUser);   
              }
                  
          })
       
        }
});
});

router.post('/barca/:user', (req, res) => {
    getData.update(config.configMongoURI, 'blog', 'users', {
        userName:req.params.user
        
                    },{
                        name:req.body.fullname,
                        birthDate:req.body.birthdate,
                        userName:req.body.username,
                        favoriteClub:req.body.favclub,
                       
                         
                      }
                      
                      )
//   ,(response)=>{
//             if (response) {
// res.send("done");
//          }else{

// res.send(error.message)         
//    }
//         }
        
    
    res.send("hhhhh");
   
});


router.post('/madrid/:user', (req, res) => {
    getData.update(config.configMongoURI, 'blog', 'users', {
        userName:req.params.user
        
                    },{
                        name:req.body.fullname,
                        birthDate:req.body.birthdate,
                        userName:req.body.username,
                        favoriteClub:req.body.favclub,
                       
                         
                      }
                      
                      )
//   ,(response)=>{
//             if (response) {
// res.send("done");
//          }else{

// res.send(error.message)         
//    }
//         }
        
    
    res.send("huhuhu");
   
});




//forgetting password asda
// router.post('/madrid/:user', (req, res) => {

//     getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
//         if(favClub){
//     const user = req.params.user;
//           getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
//               if(myUser.user===req.body.email){
//                   //res.render("updateProfile", {myUser, favClub, clubclass: 'barca'});
//                   //console.log(myUser);  
                  
//                   mailManager.sendEmail(req, (ok) => {
//                     if (ok == 0) {
//                       res.send("vernum not found ")
//                     } else if (!ok) {
//                       res.send("email error ")
//                     } else {
//                       //Done evrything
//                       //i should render home page with aler message to verifye email 
//                       res.send("ok");
//                     }
//                   })
//               }
                  
//           })
       
//         }

   
// //   ,(response)=>{
// //             if (response) {
// // res.send("done");
// //          }else{

// // res.send(error.message)         
// //    }
// //         }
        
    
//     res.send("huhuhu");
   
// });
// })

module.exports = router