define(function(require) {
	require.async(['jquery'], function() {
		var alert = require('alertUtils');
		require("echarts");

		var $alert = new alert();

		// 广告点击量
		var adPageView = echarts.init(document.getElementById("adPageView"));
		// 订单交易量
		var orderPageView = echarts.init(document.getElementById("orderPageView"));
		// 平台收支
		var platformIncomeExpend = echarts.init(document.getElementById("platformIncomeExpend"));
		// 新用户统计
		var leaguer = echarts.init(document.getElementById("leaguer"));



		let platformIncomeExpendOption = {
			title: {
				text: 'ECharts 入门示例'
			},
			tooltip: {},
			legend: {
				data: ['收入', '支出']
			},
			xAxis: {
				data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
			},
			yAxis: {},
			series: [{
				name: '收入',
				type: 'bar',
				data: [5, 20, 36, 10, 10, 20]
			}, {
				name: '支出',
				type: 'bar',
				data: [15, 10, 50, 12, 18, 23]
			}]
		};



		$(document).ready(function(e) {
			adPageView.setOption({});
			$.post('/xyshop-supplier/order/charts', {
				type: 'W'
			}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				orderPageView.setOption(data);
			}, "json");


			$.post('/xyshop-supplier/user/charts', {
				type: "W"
			}, function(_data, textStatus, xhr) {
				/*optional stuff to do after success */
				let leaguerOption = {
					// Make gradient line here
					visualMap: [{
						show: false,
						type: 'continuous',
						seriesIndex: 0,
						min: 0,
					}],
					title: [{
						left: 'center',
						text: '近七日新增会员'
					}],
					tooltip: {
						trigger: 'axis'
					},
					xAxis: [{
						data: _data.date
					}],
					yAxis: [{
						splitLine: {
							show: false
						}
					}],
					series: [{
						type: 'line',
						showSymbol: false,
						data: _data.value
					}]
				};
				leaguer.setOption(leaguerOption);
			}, "json");


			$.post('ad/lastWeekHits', {}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				console.log(JSON.stringify(data));
				let xaxisArray = new Array(), seriesArray = new Array();
				for (var i = 0; i < data.length; i++) {
					xaxisArray.push(data[i].name);
					seriesArray.push(data[i].hits);
				}

				let adOption = {
					title: {
						text: '广告点击量'
					},
					tooltip: {},
					legend: {
						data: ['广告名']
					},
					xAxis: {
						data: xaxisArray
					},
					yAxis: {},
					series: [{
						name: '广告名',
						type: 'bar',
						data: seriesArray
					}]
				};
				adPageView.setOption(adOption);
			});

			// leaguer.setOption(leaguerOption);
			// adPageView.setOption(adOption);
			platformIncomeExpend.setOption(platformIncomeExpendOption);

		});

	});
});