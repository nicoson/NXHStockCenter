var mysql = require('./db');
mysql.connect();

function stockget(database, table, callback){
	mysql.query("select * from "+database+'.'+table, function(err,rows,fields){
		if(err){
			console.log("no data");
			//mysql.end();
			return callback(null);
		}
		var data = [];
		for(var i=0; i<rows.length; i++){
			if(rows[i].stocktype == 1){
				data.push('sh'+rows[i].stockid); 
			}else if(rows[i].stocktype == 2){
				data.push('sz'+rows[i].stockid); 
			}
		}
		data = data.join(',');
		//mysql.end();
		return callback(data);
	});
}

module.exports = stockget;