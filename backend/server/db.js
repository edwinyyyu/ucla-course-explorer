const { MongoClient } = require('mongodb');

const credentials = require('./credentials');

let db;

module.exports = {
  connectToDb: callback => {
    MongoClient.connect(credentials.MONGO_CONNECTION_STRING)
    .then(client => {
      db = client.db('courseDB');
      return callback();
    })
    .catch(err => {
      console.log(err);
      return callback(err);
    });
  },
  getDb: () => db
};
