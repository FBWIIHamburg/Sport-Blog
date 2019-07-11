var express = require('express');
var router = express.Router();

const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')
const multer = require('multer');

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// multer storage

var myStorage = multer.diskStorage({
  destination:'./public/img/blog/postes',
  filename : (req, file, callback) =>{
        callback(null , Date.now()+'-'+file.originalname);
  }
})

var upload = multer({storage: myStorage});
router.use('/barca/profile/', upload.array('photo', 10));
router.use('/madrid/profile/', upload.array('photo', 10));


router.get('/madrid/profile/:user', function(req, res, next) {
  getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
    if(favClub){
      const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                getData.check1(config.configMongoURI, 'blog', 'posts', {user: user }, (blogs) => {  
                  if(blogs){
                  res.render("userProfile", { myUser, favClub, blogs, clubclass: 'real' });
                  }  else{
                        res.send('error')
                  }  

                }) 
                  //console.log(myUser);   
              }
                  
          })
    }
  })
});

// router.post("/madrid/profile/:user",(req,res)=>{
//   res.send(req.body.club);
// })

router.post('/madrid/profile/:user', function(req, res) {
//console.log(req.body);
  let user = req.params.user;
  console.log(user);
  const files = req.files ;
  var img = [];
  for (let i = 0; i < files.length; i++) {
        img.push(
              files[i].destination.replace("./public"," ")+ files[i].filename
        );
  }
 console.log('images === '+img);
  let title = req.body.adTitle;
  let q = req.body.category;
  let club = req.body.club;
  let description = req.body.description;
  let name = user;
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;



 console.log(club);
  if (!files) {
    const error = new Error('Please upload files');
    error.httpStatusCode = 400;
    return next(error);
  }

  getData.insertToDb(config.configMongoURI, 'blog', 'posts', {
    title: title, images: img, category: q,
    clubCategory: club, description: description,user: name, date: dateTime, comments: ' ', likes: ' '
  }, (blog) => {
    if(blog){
      res.send(blog);
    }else{
      res.send(error.message);
    }
  })
  });

router.get('/barca/profile/:user', function (req, res, next) {

  getData.check(config.configMongoURI, 'home', 'render', {club: "Barcelona"}, (favClub) =>{
    if(favClub){
      const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                getData.check1(config.configMongoURI, 'blog', 'posts', {user: user }, (blogs) => {  
                  if(blogs){
                  res.render("userProfile", { myUser, favClub, blogs, clubclass: 'barca' });
                  }  else{
                        res.send('error')
                  }  

                }) 
                  //console.log(myUser);   
              }
                  
          })
    }
  })
});

router.post('/barca/profile/:user', function(req, res) {
  //console.log(req.body);
  let user = req.params.user;
  console.log(user);
  const files = req.files ;
  var img = [];
  for (let i = 0; i < files.length; i++) {
        img.push(
              files[i].destination.replace("./public"," ")+ files[i].filename
        );
  }
 console.log('images === '+img);
  let title = req.body.adTitle;
  let q = req.body.category;
  let club = req.body.club;
  let description = req.body.description;
  let name = user;
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;



 console.log(club);
  if (!files) {
    const error = new Error('Please upload files');
    error.httpStatusCode = 400;
    return next(error);
  }

  getData.insertToDb(config.configMongoURI, 'blog', 'posts', {
    title: title, images: img, category: q,
    clubCategory: club, description: description,user: name, date: dateTime, comments: ' ', likes: ' '
  }, (blog) => {
    if(blog){
      res.send(blog);
    }else{
      res.send(error.message);
    }
  })
  });



module.exports = router
