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

})