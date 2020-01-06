var express = require('express');
var app= express();
app.get('/', function(req, res){
  res.sendFile(__dirname +'/Lpg.html');
});

app.get('/Regestrationpage',function(req, res){
  res.sendFile(__dirname +'/Reg.html');
});

const MongoClient = require('mongodb').MongoClient;
const assert = require ("assert");
const url = 'mongodb://localhost:27017';
const dbname = 'fruitsDB';
const client = new MongoClient(url, {useNewUrlParser: true });
client.connect(err => {
  assert.equal(null,err);
  console.log("connected succsfully")
  // perform actions on the collection object
  const db=client.db(dbname);
  insertDocuments(db, function(){
  });
});
const insertDocuments = function (db, callback){
  const collection =db.collection('fruits');
  collection.insertMany(
    [ {
      name:"apple",
      score: 3
},
    {
    name:"banana",
    score: 5
  },
    {
    name:"kela",
    score: 5
  }
  ],
    function(err , result){
      assert.equal(err, null);
      assert.equal(3,result.result.n);
      assert.equal(3,result.ops.length);
      console.log("insterd 3 documents into collection")
      callback(result);
    });
};
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');
