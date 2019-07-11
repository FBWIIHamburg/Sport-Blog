
const express = require('express');
const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const getData = require('../controllers/databaseManager')
const config = require('../routes/mongoConfig')






const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));


router.get('/madrid/:user', (req, res) => {
  getData.check(config.configMongoURI, 'home', 'render', {club: "Real Madrid"}, (favClub) =>{
    if(favClub){
      const user = req.params.user;
          getData.check(config.configMongoURI, 'blog', 'users', {userName: user}, (myUser) =>{
              if(myUser){
                  res.render("contact", {myUser, favClub, clubclass: 'real'});
                  //console.log(myUser);   
              }
                  
          })
    }
  })
});


router.post('/madrid/:user', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'dci.developer1989@gmail.com', // generated ethereal user
        pass: '12345678910dci'  // generated ethereal password
    }
   // tls:{
     // rejectUnauthorized:false
    //}
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from:'dci.developer1989@gmail.com', // sender address
      to: 'dci.developer1989@gmail.com', // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.message, // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      else{
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('success')
    };
  });
  });

module.exports=router;