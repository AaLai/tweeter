"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection('tweeter').insertOne(newTweet, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, result);
        }
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweeter').find().sort({created_at : - 1}).toArray(callback);
    },

    // Get only the newest tweet in DB, will eventually modify to get newest user tweet
    getLatestTweet: function(callback) {
      db.collection('tweeter').find().sort({created_at : -1}).limit(1).toArray(callback);
    }
  }
};
