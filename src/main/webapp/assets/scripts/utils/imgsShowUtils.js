define(function(require, exports, module) {
  require('jquery');
  function imgsLunBo(){
	  this.temp=0
  }
  module.exports=imgsLunBo;
  imgsLunBo.prototype.lunbo = function(className){
	  var lo=function (className){
		  var arrary=className.split("#");
		  var imgs=$("."+arrary[0]),length=parseInt(imgs.length),temp=parseInt(arrary[1]);
		  if (length>0) {
			  imgs.addClass("hide");
			  if (temp>=length) {temp=0;}
			  imgs.eq(temp).removeClass('hide');
			  temp=temp+1;
		  }
		  setTimeout(function(){
				 lo(arrary[0]+"#"+temp);
			  }, 3000);
			  
	  }
	  lo(className+"#0");
  }
 
});