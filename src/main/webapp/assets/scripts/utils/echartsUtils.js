define(function(require, exports, module) {
  var $ = require('jquery');
  require('echarts');
  /*
   * 获取今天的日期，格式YYYY-MM-DD
   * */
  exports.getBar = function(title,id,xdata,ydata){
	  var t = echarts.init(document.getElementById(id)),
	    n = {
		  	color: [function (e) {
			      var red = Math.ceil(Math.random()*255);
			      return 'rgb(' + red + ',160,255)';
		  	}],
	        title: {
	            text: title+"统计图"
	        },
	        tooltip: {
	            trigger: "axis"
	        },
	        grid: {
	            x: 30,
	            x2: 40,
	            y2: 24
	        },
	        calculable: !0,
	        xAxis: [{
	            type: "category",
	            data: xdata
	        }],
	        yAxis: [{
	            type: "value"
	        }],
	        series: [{
	            name: title,
	            type: "bar",
	            data: ydata,
	            markPoint: {
	                data: [{
	                    type: "max",
	                    name: "最大值"
	                },
	                {
	                    type: "min",
	                    name: "最小值"
	                }]
	            },
	            markLine: {
	                data: [{
	                    type: "average",
	                    name: "平均值",
	                }]
	            }
	        },]
	    };
	    t.setOption(n);
	    return t;
  }
});