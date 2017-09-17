/*门店列表管理*/
define(function(require) {
	require('jquery');
	var common=require('common');
	var $common=new common();
	(function($){
		var _ajax=$.ajax;
		$.ajax=function(opt){
			var fn = {
				error:function(XMLHttpRequest, textStatus, errorThrown){},
				success:function(data, textStatus){},
				beforeSend:function(XMLHttpRequest,self){},
				complete:function(XMLHttpRequest, textStatus){},
			}
			fn.data=opt.data;
			if(opt.error){
				fn.error=opt.error;
			}
			if(opt.success){
				fn.success=opt.success;
			}
			if(opt.beforeSend){
				fn.beforeSend=opt.beforeSend;
			}
			if(opt.complete){
				fn.complete=opt.complete;
			}
			var _opt = $.extend(opt,{
				error:function(XMLHttpRequest, textStatus, errorThrown){
					fn.error(XMLHttpRequest, textStatus, errorThrown);
				},
				success:function(data, textStatus){
					fn.success(data, textStatus);
				}
				,beforeSend:function(XMLHttpRequest,self){
					fn.beforeSend(XMLHttpRequest,self);
					if (XMLHttpRequest.statusText!="canceled") {
						$common._showLoding();
					}
					
				},complete:function(XMLHttpRequest, textStatus){
					fn.complete(XMLHttpRequest, textStatus);
					$common._hideLoding();
				}
			});
			_ajax(_opt);
		};
	})(jQuery);
});