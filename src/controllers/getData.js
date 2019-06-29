const {
    MongoClient,
    ObjectID
} = require('mongodb');
dbname = "blog";
const conf = require('../routes/mongoConfig');

function getUser(userName,passowrd,callback) {
    (async function mongo() {
        let client;
        try {
            const client = await MongoClient.connect(conf.configMongoURI, { useNewUrlParser: true });
            const db = client.db(dbname);
            const user = await db.collection('users').findOne({
                userName: userName,
                passowrd:passowrd
            })
            //console.log(user.userName,user.passowrd)
            if (user.userName===userName && user.passowrd===passowrd) {
                client.close();
                callback(true)
            } else {
               
                
                client.close();
                callback(false)

            }
        } catch (error) {
           // console.log(error.message);
          //  client.close();
            callback(false)
        }
    }())
}
module.exports = { getUser }

