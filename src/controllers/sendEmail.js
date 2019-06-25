const databaseManger = require('./databaseManager')
const mailgun = require("mailgun-js");
const APIkey = "985a2bc5e09a5bfac4921a13db061ef4-29b7488f-40ee8b7d";
const APIbaseURL = "https://api.mailgun.net/v3/sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org"
const DOMAIN = "sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org";
const mg = mailgun({ apiKey: APIkey, domain: DOMAIN });
const config = require('../routes/mongoConfig')
const dburl = config.configMongoURI
const getVerNum = function (req, callback) {
    databaseManger.check(dburl, config.dbname, config.collectionName, {
        userName: req.name,
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
const sendEmail = function (req, callback1) {
let rand;
getVerNum(req,(verNum)=>{
if(verNum){
    rand=verNum
}else{
    //vernum not found
    callback1(0)
}
})
//rand=Math.floor((Math.random() * 100) + 54);
host=req.get('host');
link="http://"+req.get('host')+"/signin?id="+rand;
mailOptions={
    from: ' brad@sandboxda85dfdc822a49429a930a0e2bed9ccf.mailgun.org',
    to : req.body.email,
    subject : "EEmail Verfiying",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
}
console.log(mailOptions);
mg.messages().send(mailOptions, function(error, body){
 if(error){
        console.log(error);
    console.log("error11111111111");
 }else{
        console.log("Message sent: " + body.message);
   console.log("sent1111111");
     }
});

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