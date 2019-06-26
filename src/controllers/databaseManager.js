/**
 * This Module CreatedBy Yourname
 *to control evrything about connecting to Databas With Mongo 
 */
const express = require("express");
const MongoClient = require('mongodb').MongoClient;

/**
 * This Function  is For Inserting the Data to Database
 * @param {*} serverDbUrl as a String Value
 * @param {*} dbName as a String Value
 * @param {*} colName as a String Value
 * @param {*} val as an Object
 * @param {*} callback Calling back Function
 */
function check (serverDbUrl, dbName, colName, val, callback) {
    // asynic Function to make a connection to the Database
    (async function () {
        try {
            //connecting to the Server
            const Client = await MongoClient.connect(serverDbUrl, {
                useNewUrlParser: true
            });
            //connecting to Database
            const db = await Client.db(dbName);
            //connecting to collection
            const col = await db.collection(colName);
            //connecting to the Value
            const response = await col.findOne(val);
            Client.close(); //closeing the Connection
            //check the response
            if (response) {
                callback(response)
            } else {
                callback(false);
            }
        } catch (error) {
            //calling back the error
            callback(error);
        }
    }())
}


/**
 * This Function  is For Inserting the Data to Database
 * @param {*} serverDbUrl as a String Value
 * @param {*} dbName as a String Value
 * @param {*} colName as a String Value
 * @param {*} val as an Object
 * @param {*} callback Calling back Function
 */
 
 function insertToDb (serverDbUrl, dbName, colName, val, callback) {
    // asynic Function to make a connection to the Database
    (async function () {
        try {
            //connecting to the Server
            const Client = await MongoClient.connect(serverDbUrl, {
                useNewUrlParser: true
            });
            //connecting to Database
            const db = await Client.db(dbName);
            //connecting to collection
            const col = await db.collection(colName);
            //connecting to the Value
            const response = await col.insertOne(val);
            Client.close(); //closeing the Connection
            //check the response
            if (response) {
                //check if the response error When error the response.message is exist then return the error message
                callback(response)
            } else {
                callback(false);
            }
        } catch (error) {
            //calling back the error
            callback(error);
        }
    }())
}

module.exports = {
    check,
    insertToDb
};