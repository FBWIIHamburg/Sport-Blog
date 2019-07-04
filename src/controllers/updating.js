const {
    MongoClient,
    ObjectID
} = require('mongodb');
dbname = "blog";
const conf = require('../routes/mongoConfig');
const databaseMang = require('./databaseManager');

databaseMang.update(conf.configMongoURI,conf.collectionName,conf.dbname,
  {
    name:req.body.fullname,
    birthDate :req.body.birthDate,
    userName : req.body.userName,
    passowrd:req.body.password,
    favoriteClub: req.body.favoriteClub
  },
  {
    $set:{
      name:req.body.fullname,
      birthDate :req.body.birthday,
      userName : req.body.userName,
      passowrd:req.body.passWord,
      favoriteClub :req.body.club
    }
  }
  )


module.exports = { update }

     