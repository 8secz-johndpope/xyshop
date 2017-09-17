/*提现参数设置*/
/*审核失败列表*/
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
	            field: 'value', title: '参数值',  align: 'center'
	        },{
	            field: 'time', title: '修改时间',  align: 'center',
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	                return [
	                    '<a class="btn btn-outline btn-info js-params-setting">设置参数</a>'
	                ].join('');
	            },
	            events: {
			        'click .js-params-setting': function (e, value, row, index) {
			        	$alert._fuc(function(){
			        		swal({
			                    title: "修改提现参数",
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
			     							$alert._strSuc("提现参数修改成功");
			    							$t._refresh();
			    						},error:function(){
			    							swal("操作失败", "提现参数修改失败,请稍后重试！", "error");
			     						}
			     					});
			                		 
			                     } else {
			                         swal("已取消", "您取消了操作！", "error");
			                     }
			                })
			        	});
			        }
			    },
	        }];
			var $t = t._init("table","/huatuo-other/params/list",columns,function(d){
				d.type="cash"
			});
	});
});