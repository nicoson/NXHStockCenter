var mysql = require('./db');
mysql.connect();
database = "strategyDatabase";
table = "test"

mysql.query("select * from "+database+'.'+table, function(err,rows,fields){
	var data = [];
	for(var i=0; i<rows.length; i++){
		
	}
	mysql.end();
});