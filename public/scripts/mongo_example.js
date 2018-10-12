"use strict";

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }

    console.log(`Connected to mongodb: ${MONGODB_URI}`);


    //refactored function

    function getTweets(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
            if (err) {
                return callback(err);
            }
            callback(null, tweets);
        });
    }

    //later this function can be invoked...
    //REMEMEBER: if you pass `getTweets` to another scope, it still has a closure over `db`, so it will still work.

    getTweets((err, tweets) => {
        if (err) throw err;


        console.log("loggin each tweet:");
        // to setup the database you won't need the for loop.
        for (let tweet of tweets) {
            console.log(tweet);
        }
        db.close();
    });

    // // Trying to "get all the tweets"... find them...
    // // .find returns a cursor which allows the user to operate on the data. The cursor also implements the Node.js 0.10.x or higher stream interface, allowing the user to pipe the results to other streams.
    //previous code before refactored.
    // db.collection("tweets").find().toArray((err, results) => {
    //     if (err) throw err;
    //     // console.log("results array", results);
    //     db.close();
    // });

    // //db.close() is inside the callback now.


})