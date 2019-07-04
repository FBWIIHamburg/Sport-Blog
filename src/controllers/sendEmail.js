const databaseManger = require('./databaseManager')
//MAILGUN Stuff
const mailgun = require("mailgun-js");
const APIkey = "key-e295100edf35cc9f011295c138b24724";
const APIbaseURL = "https://api.mailgun.net/v3/sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org"
const DOMAIN = "sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org";
const mg = mailgun({ apiKey: APIkey, domain: DOMAIN });
//
const config = require('../routes/mongoConfig')
const dburl = config.configMongoURI

//Node Mailer
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "dci.developer1989@gmail.com",
        pass: "12345678910dci"
    }
});
let getVerNum = function (req, callback) {
    databaseManger.check(dburl, config.dbname, config.collectionName, {
        userName: req.body.userName,
    }, (response) => {
        if (response) {
            if (response.error) {
                callback({ error: response.error })
            } else {
                callback(response.verNum)
            }
        } else {
            callback(false)
        }
    })
}
  function sendEmail (req, callback1) {
getVerNum(req,(verNum)=>{
if(verNum){
    //rand=Math.floor((Math.random() * 100) + 54);
host=req.get('host');
link="http://"+req.get('host')+"/verification?id="+verNum;
mailOptions={
    to : req.body.email,
    subject : "Please confirm your Email account",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
}
//mailgun
// mailOptions={
//     from: ' brad@sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org',
//     to : req.body.email,
//     subject : "Email Verfiying",
//     html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
// }
console.log(mailOptions);
//mailgun
//mg.messages().send(mailOptions, function(error, body)
smtpTransport.sendMail(mailOptions, function(error, response)
{
 if(error){
    
        console.log(error);
    console.log("email has been not sended");
    callback1(false)
 }else{
        console.log("Message sent: " + response.message);
   console.log("Email has ben sent");
   callback1(true)
     }
});

}else{
    //vernum not found
    callback1(0)
}
})

}


module.exports = { sendEmail, getVerNum }


//  rand = req.body.verNum;
//  let host = req.get('host');
//  let link = "http://" + req.get('host') + "/signin/?id=" + rand;

//  let data = {
//      from: ' brad@sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org',
//      to: req.body.email,
//      subject: 'mostafa ',
//      html: `Hello,<br> Please Click on the link to verify your email.<br><a href=${link}+">Click here to verify</a>`
//  };
//  mg.messages().send(data, function (error, body) {
//     console.log("MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"+body)
//  });