var mysql = require('./db');
mysql.connect();

function stockget(){}

stockget.getId = function(database, table, callback){
	mysql.query("select * from "+database+'.'+table+' where stockid != 000000', function(err,rows,fields){
		if(err){
			console.log("no data");
			//mysql.end();
			return callback(null);
		}
		var data = [];
		for(var i=0; i<rows.length; i++){
			if(rows[i].stockid[0] == '6'){
				data.push('sh'+rows[i].stockid); 
			}else if(rows[i].stockid[0] == '0' || rows[i].stockid[0] == '3'){
				data.push('sz'+rows[i].stockid); 
			}
		}
		data = data.join(',');
		//mysql.end();
		return callback(data);
	});
};

stockget.getData = function(id, database, callback){
	mysql.query("select * from "+database+".t"+id+" order by tradedate", function(err,rows,fields){
		if(err){
			console.log("no data");
			return callback(null);
		}
		var tdate=[];
		var sdata=[];
		for(var i=0; i<rows.length; i++){
			tdate.push(rows[i].tradedate.getFullYear()+'/'+(rows[i].tradedate.getMonth()+1)+'/'+rows[i].tradedate.getDate());
			sdata.push([(rows[i].open/rows[i].weight).toFixed(2),(rows[i].close/rows[i].weight).toFixed(2),(rows[i].low/rows[i].weight).toFixed(2),(rows[i].high/rows[i].weight).toFixed(2)]);
		}
		return callback({date: tdate, data: sdata});
	});
}

module.exports = stockget;