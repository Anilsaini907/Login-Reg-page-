var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express();
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');
});

app.post('/index.html', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var pass = req.body.password;
	var phone =req.body.phone;

	var data = {
		"name": name,
		"email":email,
		"password":pass,
		"phone":phone
	}
db.collection('details').insertOne(data,function(err, collection){
		if (err) throw err;
    console.log(data)
		console.log("Record inserted Successfully");
	});
	return res.sendFile(__dirname + '/signup_success.html');
});

app.get('/Login',function(req, res){
  res.sendFile(__dirname +'/Lpg.html');
});

app.post('/Lpg.html',function(req, res){
  var Email = req.body.email1;
	var password1 = req.body.pass1;
  console.log(Email + password1);


var collection = db.collection('details');
collection.findOne({ email: req.body.email1, password: req.body.pass1 }, function(err, doc){
if(err) throw err;
if(doc)
{
return res.send("welcome to homepage");
console.log("Found: " +  req.body.email1 + ", pass=" + req.body.pass1);
} else {
console.log("Not found: " +  req.body.email1);
return res.sendFile(__dirname + '/index.html');
}
db.close();
});

});

app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect(__dirname + '/index.html');
}).listen(3000)

console.log("server listening at port 3000");
