var express = require('express')
var app = express()
var http = require('http')
var path = require('path')

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.get('/request/:add_id',function(req,res) {
	
	
	 var add_id = req.params.add_id;
	 res.sendFile(path.join(__dirname + '/images/'+add_id+'.png'));
	 

	 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("stat_db");
   
	   	 var myquery = {id:4};
		var myobj1 = {$inc: { 'impressions': 1}};
		var newquery = {id:4,'action_list.action_type':'photo_view'};
		var newobject = {$inc: {'action_list.$.value':1}}
		dbo.collection("collections").update(myquery,myobj1, function(err, res){
		if(err) throw err;
		console.log("Count updated");
		db.close();
		});
		
		
	 dbo.collection("collections").update(newquery,newobject, function(err, res){
	if(err) throw err;
	console.log("Count updated");
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
			var myquery2 = {id:4};
			var myobj3 = {$inc : {"unique_impressions" : 1 } };
			var myquery3 = {id:4,'unique_action_list.action_type':'photo_view'}
			var myobj4 = {$inc: {'unique_action_list.$.value':1}};
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

 
	
app.listen(5000);