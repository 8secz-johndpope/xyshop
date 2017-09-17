/*穴位贴参数设置*/
define(function(require) {
	require.async(['jquery'], function() {
			var common=require('common');
			var $common=new common();
			var alert=require('alertUtils')
			var $alert=new alert();
			var table=require('tableUtils');
			var t=new table();
			var columns=[{
	            field: 'introduce', title: '参数介绍',  align: 'center',
	        },{
	            field: 'value', title: '参数值',  align: 'center',
	            formatter:function(value, row, index){
                	if (!$common._noEmpty(value)) {
                		return "-";
					}else{
						if (value=="open") {
							return "<span class='badge badge-info'>开启</span>";
						}else if(value=="close"){
							return "<span class='badge badge-danger'>关闭</span>";
						}else{
							return value;
						}
					}
                }
	        },{
	            field: 'time', title: '修改时间',  align: 'center',
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	switch (row.value) {
					case "open": return '<a class="btn btn-outline btn-danger js-params-close">关闭</a>';
					case "close": return '<a class="btn btn-outline btn-info js-params-open">开启</a>';
					}
	            	return '<a class="btn btn-outline btn-info js-params-setting">设置参数</a>';
	            },
	            events: {
			        'click .js-params-close': function (e, value, row, index) {
			        	$alert._warning("确认关闭参数？","该操作将关闭\""+row.introduce+"\"分成设置",function(){
			        		$.ajax({
								url:"/huatuo-other/params/update",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
									value: "close",
								},
								async:true,success:function(data){
									$alert._strSuc("参数设置成功关闭");
	    							$t._refresh();
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        		
			        	});
			        },
			        'click .js-params-open': function (e, value, row, index) {
			        	$alert._warning("确认开启参数？","该操作将开启"+row.introduce+"分成设置",function(){
			        		$.ajax({
								url:"/huatuo-other/params/update",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
									value:"open",
								},
								async:true,success:function(data){
									$alert._strSuc("参数开启成功");
	    							$t._refresh();
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        		
			        	});
			        },
			        'click .js-params-setting': function (e, value, row, index) {
			        	$alert._fuc(function(){
			        		swal({
			                    title: "修改穴位贴参数",
			                    type: "input",
			                    showCancelButton: true,
			                    confirmButtonColor: "#DD6B55",
			                    confirmButtonText: "是的，修改参数！",
			                    cancelButtonText: "让我再考虑一下…",
			                    closeOnConfirm: false,
			                    closeOnCancel: false,
			                    inputPlaceholder: "修改参数值"
			                },
			                function(inputValue) {
			                	 if (inputValue) {
			                		 if (!$common._numBigZero(inputValue)) {
			                			 $alert._alert("参数值不能小于0");
			                			 return;
									}
			                		 $.ajax({
			     						url:"/huatuo-other/params/update",
			     						contentType: "application/x-www-form-urlencoded; charset=utf-8", 
			     						type: "post",
			     						dataType:"text",
			     						data:{
			     							uuid:row.uuid,
			     							value:inputValue
			     						},
			     						async:true,success:function(data){
			     							$alert._strSuc("穴位贴参数修改成功");
			    							$t._refresh();
			    						},error:function(){
			    							swal("操作失败", "穴位贴参数修改失败,请稍后重试！", "error");
			     						}
			     					});
			                		 
			                     } else {
			                         swal("已取消", "您取消了操作或没有填写参数！", "error");
			                     }
			                })
			        	});
			        }
			    },
	        }];
			var $t = t._init("table","/huatuo-other/params/list",columns,function(d){
				d.type="message"
			});
	});
});