var express = require('express');
var router = express.Router();

const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')
const {MongoClient,ObjectId} = require('mongodb');

router.get('/madrid/:user', function (req, res) {
    getData.check(config.configMongoURI, 'home', 'render', { club: "Real Madrid" }, (favClub) => {
          if (favClub) {
                const user = req.params.user;
                getData.check(config.configMongoURI, 'blog', 'users', { userName: user }, (myUser) => {
                      if (myUser) {
                      getData.check1(config.configMongoURI, 'blog', 'posts', { }, (blogs) => {  
                            if(blogs){
                            res.render("blog", { myUser, favClub, blogs, clubclass: 'real' });
                            }  else{
                                  res.send('error');
                            }  
          
                }) 
          }   

                })
          }
    })
});


router.get('/barca/:user', function (req, res) {
    getData.check(config.configMongoURI, 'home', 'render', { club: "Barcelona" }, (favClub) => {
          if (favClub) {
                const user = req.params.user;
                getData.check(config.configMongoURI, 'blog', 'users', { userName: user }, (myUser) => {
                      if (myUser) {
                      getData.check1(config.configMongoURI, 'blog', 'posts', { }, (blogs) => {  
                            if(blogs){
                            res.render("blog", { myUser, favClub, blogs, clubclass: 'barca' });
                            }  else{
                                  res.send('error');
                            }  
          
                }) 
          }   

                })
          }
    })
});


////// single blog


router.get('/madrid/:user/oneBlog/:id', function (req, res) {
    getData.check(config.configMongoURI, 'home', 'render', { club: "Real Madrid" }, (favClub) => {
          if (favClub) {
                const user = req.params.user;
                const id = req.params.id;
                getData.check(config.configMongoURI, 'blog', 'users', { userName: user }, (myUser) => {
                      if (myUser) {
                      getData.check(config.configMongoURI, 'blog', 'posts', { _id: new ObjectId(id)} , (blog) => {  
                            if(blog){
                                console.log(blog);
                            res.render("blog-details", { myUser, favClub, blog, clubclass: 'real' });
                            }  else{
                                  res.send('error');
                            }  
          
                }) 
          }   

                })
          }
    })
});


router.post('/madrid/:user/oneBlog', function (req, res) {
    getData.insertToDb(config.configMongoURI, 'blog', 'comments', {
        id: req.body.id, comment: req.body.message
      }, (comment) => {
        if(comment){
          res.send(comment);
        }else{
          res.send(error.message);
        }
      })
});


router.get('/barca/:user/oneBlog/:id', function (req, res) {
    getData.check(config.configMongoURI, 'home', 'render', { club: "Barcelona" }, (favClub) => {
          if (favClub) {
                const user = req.params.user;
                getData.check(config.configMongoURI, 'blog', 'users', { userName: user }, (myUser) => {
                      if (myUser) {
                      getData.check(config.configMongoURI, 'blog', 'posts', { _id: new ObjectId(req.body.id) }, (blog) => {  
                            if(blog){
                            res.render("blog-details", { myUser, favClub, blog, clubclass: 'barca' });
                            }  else{
                                  res.send('error');
                            }  
          
                }) 
          }   

                })
          }
    })
});

module.exports = router;
