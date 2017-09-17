/*时间选择工具*/
define(function(require, exports, module) {
	require('jquery');
	/*加载layerdate时间选择器*/
	require('laydate');
	var time=require('time');
	function Date(){}
	module.exports=Date;
	Date.prototype._init=function(beginDate,endDate,fun){
  		var start = {
			elem: beginDate,
			format: "YYYY-MM-DD",
			min: time.getDifDay(-30),
			max: time.getToday(),
			istime: false,
			istoday: true,
			choose: function(datas) {
				end.min = datas;
				end.start = datas;
				end.max=time.getTwoDayDif(time.getToday(),time.getDayDifDay(datas,30))<0?time.getDayDifDay(datas,30):time.getToday();
				if (fun) {
					fun();
				}
			}
		};
		var end = {
			elem: endDate,
			format: "YYYY-MM-DD",
			min: "2016-06-16",
			max: time.getToday(),
			istime: false,
			istoday: true,
			choose: function(datas) {
				start.max = datas;
				start.min = time.getDayDifDay(datas,-30);
				if (Math.abs(time.getTwoDayDif($(start.elem).val(),datas))>30) {
					$(start.elem).val(time.getDayDifDay(datas,-10));
					start.start = time.getDayDifDay(datas,-10);
				}
				if (fun) {
					fun();
				}
			}
		};
		$(beginDate).click(function(e){
			laydate(start);
		});
		$(endDate).click(function(e){
			laydate(end);
		});
		
	}
	
	
});
