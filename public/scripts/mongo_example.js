"use strict";

const MongoClient = require("mongodb").MongoClient;

const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }

    // console.log(`Connected to mongodb: ${MONGODB_URI}`);

    // Trying to "get all the tweets"... find them...
    // .find returns a cursor which allows the user to operate on the data. The cursor also implements the Node.js 0.10.x or higher stream interface, allowing the user to pipe the results to other streams.

    db.collection("tweets").find().toArray((err, results) => {
        if (err) throw err;
        console.log("results array", results);

        db.close();
    });

    //db.close() is inside the callback now.




    //any program logic that needs to use the mongoDB connection needs to be invoked here.
    //ie. an entry point for a database-connected application.



    // db.close();
})