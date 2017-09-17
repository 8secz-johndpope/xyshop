define(function(require) {
	require.async(['jquery','contabs'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils');
			var alert=require('alertUtils');
			var $alert=new alert();
			var table=require('tableUtils');
			
			/*订单表*/
			var ordert=new table();
			var columns=[{
	            field: 'orderNo', title: '订单号',  align: 'center',
	        },{
	            field: 'userName', title: '用户名',  align: 'center',
	        },{
	            field: 'realName', title: '认证名',  align: 'center',
	        },{
	            field: 'phoneNum', title: '手机号',  align: 'center',
	            formatter:function(value, row, index){
	            	if(!value){
	            		return '-';
	            	}
					return value;
                }
	        },{
	            field: 'money', title: '充值金额',  align: 'center',
	            formatter:function(value, row, index){
					return value+"元";
                }
	        },{
	            field: 'coin', title: '兑换金币',  align: 'center',
	        },{
	            field: 'payWay', title: '支付方式',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'weixin':return "<span class='badge badge-primary'>微信支付</span>";
						case 'offline':return "<span class='badge badge-success'>线下支付</span>";
						case 'wallet':return "<span class='badge badge-success'>钱包支付</span>";
					}
					return "-";
                }
	        },{
	            field: 'status', title: '状态',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'waitPay':return "<span class='badge'>等待确认</span>";
						case 'paySuccess':return "<span class='badge badge-info'>支付完成</span>";
						case 'payFail':return "<span class='badge badge-info'>支付失败</span>";
	            	}
						return "-";
                }
	        },{
	            field: 'addTime', title: '录入时间',  align: 'center',
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	var opt=[];
                	opt.push('<a class="btn btn-outline btn-success js-pass">确认收款</a>');
                	opt.push('<a class="btn btn-outline btn-danger js-fail">支付失败</a>');
//                	opt.push('<a id="js-print-'+index+'" href="recharge/print.html?u='+row.uuid+'" class="btn btn-outline btn-info js-print J_menuItem">打印订单</a>');
                	return opt.join(" ");
	            },
	            events: {
			        'click .js-pass': function (e, value, row, index) {
			        	$alert._warning("确认收款？","请确认收到会员\""+row.userName+"\""+row.money+"元的线下支付金额.",function(){
			        		$.ajax({
								url:"/shop-users/recharge/ajax/pass",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
								},
								async:true,success:function(data){
									templateNofity(row.uuid);
									if(data[0]=="success"){
										$alert._strSuc("确认收款成功");
										$('#js-print-'+index).click();
										$ordert._refresh();
									}else{
										$alert._alert("操作失败");
									}
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        	});
			        },
			        'click .js-fail': function (e, value, row, index) {
			        	$alert._warning("确认支付失败？","请确认收到没有收到会员\""+row.userName+"\""+row.money+"元的线下支付金额.",function(){
			        		$.ajax({
								url:"/shop-users/recharge/ajax/fail",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
								},
								async:true,success:function(data){
//									templateNofity(row.uuid);
									if(data[0]=="success"){
										$alert._strSuc("该充值状态成功改为支付失败状态");
										$ordert._refresh();
									}else{
										$alert._alert("操作失败");
									}
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        	});
			        },
			    },
	        }];
			ordert._setTool('#order-toolbar');
			ordert._setSort('addTime','desc');
			var $ordert = ordert._init("ordertable","/shop-users/recharge/ajax/wait/unionlist",columns,function(d){
//				d.orderNo=$('#js-order-no').val();
				d.startTime=$('#js-date-begin').val();
				d.endTime=$('#js-date-end').val();
//				d.userName=$('#js-user-name').val();
			});
			/*指定订单筛选条件，刷新订单列表*/
			$(".js-change-table-params").change(function(e){
				$ordert._refresh();
			});
			/*时间选择器*/
			/*加载layerdate时间选择器*/
			require('laydate');
		  	var start = {
				elem: "#js-date-begin",
				format: "YYYY-MM-DD",
				min: "2016-06-16",
				max: "2099-06-16",
				istime: false,
				istoday: true,
				choose: function(datas) {
					end.min = datas;
					end.start = datas;
					$ordert._refresh();
				}
			};
			var end = {
				elem: "#js-date-end",
				format: "YYYY-MM-DD",
				min: "2016-06-16",
				max: "2099-06-16",
				istime: false,
				istoday: true,
				choose: function(datas) {
					start.max = datas;
					$ordert._refresh();
				}
			};
			$("#js-date-begin").click(function(e){
				laydate(start);
			});
			$("#js-date-end").click(function(e){
				laydate(end);
			});
			$(document).on("click","#laydate_clear",function(e){
				$ordert._refresh();
			});
		
			
			//发送模板消息
			var templateNofity = function(orderUuid){
	        	
				var url = $('#wx_domain').val();
	            $.ajax({
	        	   async:false,
	        	   url: url + 'notify/olrecharge.html?orderUuid=' + orderUuid,
	        	   type: "get",
	        	   dataType: 'jsonp',
	        	   jsonp: 'callback',
	        	   jsonpCallback:"success_jsonpCallback",
	        	   timeout: 5000,
	        	   success: function (json){
	        		   console.log('模板消息发送成功');
	        		   console.log(json.status);
	        	   },
	        	   error: function(xhr){
	        		   console.log(xhr);
	        	   }
	            });
	        	
	        }
	});
});