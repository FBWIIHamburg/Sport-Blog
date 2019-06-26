// const databaseManger = require('./databaseManager')
// const {
//     MongoClient,
//     ObjectID
// } = require('mongodb');
// dbname = "blog";


// const conf = require('../routes/mongoConfig')

// function addUser(name1, birthDate1, gender1, user, email1,
//     passowrd1, favoriteClub1, photos1, callback) {
//     databaseManger.check(conf.configMongoURI, conf.dbname, "users", {
//         userName: user
//     }, (response) => {
//         if (response) {
//             console.log(response + "\n ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
//             callback(response)
//         } else {
//             //insert
//             databaseManger.insertToDb(conf.configMongoURI, conf.dbname, "users", {
//                 name: name1,
//                 birthDate: birthDate1,
//                 gender: gender1,
//                 userName: user,
//                 email: email1,
//                 passowrd: passowrd1,
//                 favoriteClub: favoriteClub1,
//                 photos: photos1,
//                 verNum: Math.floor((Math.random() * 100) + 54 * 5555 + 80 * 0975436789),
//                 admin: false,
//                 verfied: false,
//                 active: false
//             }, (inserted) => {
//                 if (inserted) {
//                     console.log("£££££££££££Inserted Line 37££££££££££" + inserted)
//                     callback(true)
//                 } else {
//                     callback(false)
//                 }
//             });
//         }
//     });
//     //     function addUser(name, birthDate, gender, user, email,
//     //         passowrd, favoriteClub, photos, callback) {
//     //     (async function mongo() {
//     //         let client;
//     //         try {
//     //             const client = await MongoClient.connect(conf.configMongoURI, { useNewUrlParser: true });
//     //             const db = client.db(dbname);
//     //             const user = await db.collection('users').findOne({
//     //                 userName: userName
//     //             })
//     //             if (user) {
//     //                 client.close();
//     //                 callback(false)
//     //             } else {
//     //                 const db = client.db(dbname);
//     //                 const user = await db.collection('users').insertOne({
//     //                     name: name,
//     //                     birthDate: birthDate,
//     //                     gender: gender,
//     //                     userName: userName,
//     //                     email: email,
//     //                     passowrd: passowrd,
//     //                     favoriteClub: favoriteClub,
//     //                      photos: photos,
//     //                     verNum: Math.floor((Math.random() * 100) + 54*5555+80*0975436789),
//     //                     admin: false,
//     //                     verfied: false,
//     //                     active:false,


//     //                 }, (inserted) => {
//     //                     if (inserted) {
//     //                         console.log("£££££££££££Inserted Line 37££££££££££"+inserted)

//     //                         callback(true)
//     //                     } else {
//     //                         callback(false)
//     //                     }
//     //                 })
//     //                 client.close();
//     //                 callback(true)

//     //             }
//     //         } catch (error) {
//     //             console.log(error.message);
//     //           //  client.close();

//     //             callback(error.message)
//     //         }
//     //     }())
//     // }
//     module.exports = { addUser }