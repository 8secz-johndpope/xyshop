define(function(require) {
	require.async(['jquery'], function() {
		var alert = require('alertUtils');
		require("echarts");
		

		var $alert = new alert();

		// 广告点击量
		var adPageView = echarts.init(document.getElementById("adPageView"), "dark");
		// 订单交易量
		var orderPageView = echarts.init(document.getElementById("orderPageView"));
		// 平台收支
		var platformIncomeExpend = echarts.init(document.getElementById("platformIncomeExpend"));
		// 新用户统计
		var leaguer = echarts.init(document.getElementById("leaguer"));

		var disk = echarts.init(document.getElementById("disk"));



		let platformIncomeExpendOption = {
			title: {
				subtext: '测试'
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

			/**
			 * 近七日支付订单和已完成订单统计
			 */
			$.post('/xyshop-supplier/order/charts', {
				type: 'W'
			}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				orderPageView.setOption(data);
			}, "json");


			/**
			 * 近七日新增用户
			 */
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
						subtext: '近七日新增会员'
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

			/**
			 * 近七日点击量最多的广告
			 */
			$.post('ad/lastWeekHits', {}, function(data, textStatus, xhr) {
				/*optional stuff to do after success */
				console.log(JSON.stringify(data));
				let xaxisArray = new Array(),
					seriesArray = new Array();
				for (var i = 0; i < data.length; i++) {
					xaxisArray.push(data[i].name);
					seriesArray.push(data[i].hits);
				}

				let adOption = {
					title: {
						subtext: '近七日广告点击量'
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

			$.post('file/disk', {}, function(result, textStatus, xhr) {
				/*optional stuff to do after success */

				for (var i = 0; i < result.series.length; i++) {
					result.series[i].type = "bar";
					result.series[i].label = {
						normal: {
							show: true,
							position: 'insideRight'
						}
					}
				}

				let option = {
					title: {
						subtext: "磁盘监控"
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: { // 坐标轴指示器，坐标轴触发有效
							type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						}
					},
					legend: {
						data: result.legendData
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: {
						type: 'value'
					},
					yAxis: {
						type: 'category',
						data: result.yAxisData
					},
					series: result.series
				};
				disk.setOption(option);
			});

			// leaguer.setOption(leaguerOption);
			// adPageView.setOption(adOption);
			platformIncomeExpend.setOption(platformIncomeExpendOption);

		});

	});
});