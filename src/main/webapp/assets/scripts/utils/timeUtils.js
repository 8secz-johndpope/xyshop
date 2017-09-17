define(function(require, exports, module) {
  var $ = require('jquery');
  /*
   * 获取今天的日期，格式YYYY-MM-DD
   * */
  exports.getToday = function(e){
	  var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      if(month < 10) month = "0"+month;
      if(day < 10) day = "0"+day;
      return(year+"-"+month+"-"+day); 
  }
  /* */
  exports.getNow = function(e){
	  var now = new Date();
      var year = now.getFullYear();       //年
      var month = now.getMonth() + 1;     //月
      var day = now.getDate();            //日
      if(month < 10) month = "0"+month;
      if(day < 10) day = "0"+day;
      return(year+"-"+month+"-"+day+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()); 
  }
  /*
   * 获取与今天的日期相差dif天的格式，格式YYYY-MM-DD
   * */
  exports.getDifDay = function(dif){
	  var tDate=new Date();
	  tDate.setDate(new Date().getDate()+dif);
      var year = tDate.getFullYear();       //年
      var month = tDate.getMonth() + 1;     //月
      var day = tDate.getDate();            //日
      if(month < 10) month = "0"+month;
      if(day < 10) day = "0"+day;
      return(year+"-"+month+"-"+day); 
  }
  /*
   * 获取与指定的日期相差dif天的格式，格式YYYY-MM-DD
   * */
  exports.getDayDifDay = function(day,dif){
	  var tDate=new Date(day);
	  tDate.setDate(tDate.getDate()+dif);
      var year = tDate.getFullYear();       //年
      var month = tDate.getMonth() + 1;     //月
      var day = tDate.getDate();            //日
      if(month < 10) month = "0"+month;
      if(day < 10) day = "0"+day;
      return(year+"-"+month+"-"+day); 
  }
  /*
   * 获取两个日期之间相差天数，格式YYYY-MM-DD
   * */
  exports.getTwoDayDif=function(day1,day2){
	  var sta_date = new Date(day1);
	  var end_date = new Date(day2);
	  return (end_date-sta_date)/(1000*3600*24);//求出两个时间的时间差，这个是天数  
  }
  /*
   * day1是否大于day2，格式YYYY-MM-DD
   * */
  exports.getTwoDayBefore=function(day1,day2){
	  var sta_date = new Date(day1);
	  var end_date = new Date(day2);
	  return sta_date>end_date;
  }
  /*
   * 判断时间是否晚于现在，格式YYYY-MM-DD
   * */
  exports.getDayBeforeNow=function(day){
	  var sta_date = new Date(day);
	  var end_date = new Date();
	  return sta_date>=end_date;
  }
});