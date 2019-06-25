const {
    MongoClient,
    ObjectID
} = require('mongodb');
dbname = "blog";


const conf = require('../routes/mongoConfig')

function addUser(name, birthDate, gender, userName, email,
    passowrd, favoriteClub,callback, photos) {
    (async function mongo() {
        let client;
        try {
            const client = await MongoClient.connect(conf.configMongoURI, { useNewUrlParser: true });
            const db = client.db(dbname);
            const user = await db.collection('users').findOne({
                userName: userName
            })
            if (user) {
                client.close();
                callback(false)
            } else {
                const db = client.db(dbname);
                const user = await db.collection('users').insertOne({
                    name: name,
                    birthDate: birthDate,
                    gender: gender,
                    userName: userName,
                    email: email,
                    passowrd: passowrd,
                    favoriteClub: favoriteClub,
                     photos: photos,
                    verNum: Math.floor((Math.random() * 100) + 54*5555+80*0975436789),
                    admin: false,
                    verfied: false,
                    active:false,


                })
                client.close();
                callback(true)

            }
        } catch (error) {
            console.log(error.message);
          //  client.close();

            callback(false)
        }
    }())
}
module.exports = { addUser }