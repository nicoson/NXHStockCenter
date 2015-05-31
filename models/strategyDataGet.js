var async = require('async');
var mysql = require('./db');
mysql.connect();

function stockget(){}

stockget.getId = function(database, table, callback){
	mysql.query("select * from "+database+'.'+table+' order by stockid', function(err,rows,fields){
		if(err){
			console.log("no data");
			//mysql.end();
			return callback(null);
		}
		var id = [];
		var data = [];
		for(var i=0; i<rows.length; i++){
			if(rows[i].stockid == '000000'){
				
			}else if(rows[i].stockid[0] == '6'){
				id.push('sh'+rows[i].stockid); 
			}else if(rows[i].stockid[0] == '0' || rows[i].stockid[0] == '3'){
				id.push('sz'+rows[i].stockid); 
			}
			data.push([rows[i].stockid,
				rows[i].buydate.getFullYear().toString()+
				(rows[i].buydate.getMonth()+1).toString()+
				rows[i].buydate.getDate().toString(),
				rows[i].buyprice,rows[i].amount
			]);
		}
		id = id.join(',');

		var w = [];
		async.eachSeries(rows.slice(1), function(row,callback){
			mysql.query("select weight from "+'updateDatabase.t'+row.stockid+' order by tradedate desc limit 1', function(err,subrows,fields){
				w.push(subrows[0].weight);
				callback();
			});
		}, function(err){
			console.log(w);
			return callback([data,id,w]);
		});
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

stockget.getEarningTable = function(database, table, callback){
	mysql.query("select * from "+database+'.'+table+' order by tradedate', function(err,rows,fields){
		if(err){
			console.log("no data");
			return callback(null);
		}
		return callback(rows);
	});
}

module.exports = stockget;