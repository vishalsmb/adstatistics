var express = require('express')
var app = express()
var http = require('http')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.get('/click/:add_id',function(req,res) {
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("stat_db");
   
  
  var meta_data = req.get('User-Agent');

   var myquery = {id:4, 'action_list.action_type': 'clicks'};
   var myobj1 = {$inc: { 'action_list.$.value': 1}}
  var myquery1 = {id:4};	 
  	dbo.collection("collections").update(myquery,myobj1, function(err, res){
	if(err) throw err;
	console.log("Count updated");
	db.close();
	});

var meta_data1 = { $addToSet: { meta_data: [ { host: req.headers.host, referer : req.headers.referer, user_agent:req.get('User-Agent')}] } };
	dbo.collection("collections").update(myquery1,meta_data1, function(err, res){
	if(err) throw err;
	console.log("Meta information updated");
	db.close();
	});
	

	MongoClient.connect(url, function(err,db) {
		if(err) throw err;
		var dbo = db.db("stat_db");
		var myquery1 = {ad_id:4};
		var myobj2 = {$addToSet: { assoc_ips : [ {ip : req.ip}]}};
		dbo.collection("collection1").update(myquery1,myobj2, function(err, res){
		if(err) throw err;
		console.log("IP updated");
		
	if(res.result.nModified != 0)
	{
			MongoClient.connect(url, function(err,db) {
			if(err) throw err;
			var dbo = db.db("stat_db");
			
			var myquery3 = {id:4,'unique_action_list.action_type':'clicks'}
			var myobj4 = {$inc: { 'unique_action_list.$.value': 1}};
			dbo.collection("collections").update(myquery2,myobj3, function(err, res){
			if(err) throw err;
			else console.log("Unique impression updated");
			db.close();
			});
			});
	}
	
	
	db.close();
	});

	});
	


  });
});

app.get('/admin',function(req,res) {

	var MongoClient = require('mongodb').MongoClient;
	var url = "mongodb://localhost:27017/";

	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	var dbo = db.db("stat_db");
	
	dbo.collection("collections").find({}).toArray(function(err, result) {
	    if (err) throw err;
	    res.send(result);
	    db.close();
  });	

	});
})
app.listen(9500,function() {
	console.log("Listening on 9500");
})