define(function(require) {
	require.async(['jquery','icheck'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils')
			var alert=require('alertUtils')
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
						case 'waitPay':return "<span class='badge'>待付款</span>";
						case 'paySuccess':return "<span class='badge badge-info'>支付完成</span>";
						case 'payFail':return "<span class='badge badge-info'>支付失败</span>";
	            	}
						return "-";
                }
	        },{
	            field: 'addTime', title: '录入时间',  align: 'center',
	        }];
			ordert._setTool('#order-toolbar');
			ordert._setSort('addTime','desc');
			var $ordert = ordert._init("ordertable","/shop-users/recharge/ajax/unionlist",columns,function(d){
//				d.orderNo=$('#js-order-no').val();
				d.status=$('#js-choise-status').val();
				d.payWay=$('#js-choise-payway').val();
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
	});
});