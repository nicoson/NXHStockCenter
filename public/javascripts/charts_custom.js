require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});

function kDraw(stockname, tdate, tdata){
	require(
		[
		'echarts',
		'echarts/chart/k' 
		],
		function (ec) {
			var myChart = ec.init(document.getElementById('echarts')); 
			var option = {
				// title : {
				// 	text: '2013年上半年上证指数'
				// },
				tooltip : {
					trigger: 'axis',
					formatter: function (params) {
						var res = params[0].seriesName + ' ' + params[0].name;
						res += '<br/>  开盘 : ' + params[0].value[0] + '  最高 : ' + params[0].value[3];
						res += '<br/>  收盘 : ' + params[0].value[1] + '  最低 : ' + params[0].value[2];
						return res;
					},
					backgroundColor: 'rgba(255,255,255,0.3)'
				},
				// legend: {
				// 	data:['上证指数']
				// },
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataZoom : {show: true},
						dataView : {show: true, readOnly: false},
						magicType: {show: true, type: ['line', 'bar']},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				dataZoom : {
					show : true,
					realtime: true,
					start : 20,
					end : 100
				},
				xAxis : [
				{
					type : 'category',
					boundaryGap : true,
					axisTick: {onGap:false},
					splitLine: {show:false},
					axisLabel: {textStyle:{color: 'white'}},
					data: tdate
				}
				],
				yAxis : [
				{
					type : 'value',
					scale:true,
					axisLabel: {textStyle:{color: 'white'}},
					boundaryGap: [0.01, 0.01]
				}
				],
				series : [
				{
					name: stockname,
					type:'k',
					data: tdata	// 开盘，收盘，最低，最高
				}]
			};

			myChart.setOption(option); 
		}
	);
}

function AreaDraw(tdate, tdata){
	require(
		[
		'echarts',
		'echarts/chart/line' 
		],
		function (ec) {
			var myChart = ec.init(document.getElementById('echartPortfolio')); 
			option = {
				// title : {
				// 	text: 'Portfolio Earning Fields'
				// },
				tooltip : {
					trigger: 'axis'
				},
				// legend: {
				// 	data:['意向','预购','成交']
				// },
				// toolbox: {
				// 	show : true,
				// 	feature : {
				// 		mark : {show: true},
				// 		dataView : {show: true, readOnly: false},
				// 		magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
				// 		restore : {show: true},
				// 		saveAsImage : {show: true}
				// 	}
				// },
				calculable : true,
				dataZoom : {
					show : true,
					realtime: true,
					start : 20,
					end : 100
				},
				xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					axisLabel: {textStyle:{color: 'white'}},
					data : tdate
				}
				],
				yAxis : [
				{
					type : 'value',
					axisLabel: {textStyle:{color: 'white'}},
					scale: true
				}
				],
				series : [
				{
					name:'total amount',
					type:'line',
					smooth:true,
					itemStyle: {
						normal: {
							areaStyle: {
								color: "rgba(255,255,255,0.3)",
								type: 'default'
							}
						}
					},
					data:tdata
				}
				]
			};

			myChart.setOption(option); 
		}
	);
}