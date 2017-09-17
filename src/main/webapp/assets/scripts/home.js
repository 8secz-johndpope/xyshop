define(function(require) {
	require.async(['jquery'], function() {
		var alert=require('alertUtils')
		var $alert=new alert();
		$(document).ready(function(e){
			/*加载用户数据统计*/
			 $.ajax({
					url:"/shop-users/users/ajax/initUserCountData",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-user-todayCount').text(data["todayCount"]);
						$('#js-user-totalCount').text(data["totalCount"]);
						$('#js-user-xiaofeiCount').text(data["xiaofeiCount"]);
						$('#js-user-nonXiaofeiCount').text(data["nonXiaofeiCount"]);
					},error:function(){
						$alert._alert("用户数据加载失败！");
					}
			 });
			 /*充值记录*/
			 $.ajax({
					url:"/shop-users/recharge/ajax/count",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-recharge-day').text(data["today"]);
						$('#js-recharge-month').text(data["month"]);
						$('#js-recharge-total').text(data["total"]);
					},error:function(){
						$alert._alert("充值数据加载失败！");
					}
			 });
			 /*返还记录*/
			 $.ajax({
					url:"/shop-users/report/ajax/back/count",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-back-day').text(data["coin_today"]+"/"+data["score_today"]);
						$('#js-back-month').text(data["coin_month"]+"/"+data["score_month"]);
						$('#js-back-total').text(data["coin_total"]+"/"+data["score_total"]);
					},error:function(){
						$alert._alert("返还数据加载失败！");
					}
			 });
			 /*佣金记录*/
			 $.ajax({
					url:"/shop-users/report/ajax/commission/count",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-commission-day').text(data["income_today"]+"/"+data["expend_today"]);
						$('#js-commission-month').text(data["income_month"]+"/"+data["expend_month"]);
						$('#js-commission-total').text(data["income_total"]+"/"+data["expend_total"]);
					},error:function(){
						$alert._alert("佣金数据加载失败！");
					}
			 });
			 /*积分商城订单*/
			 $.ajax({
					url:"/shop-orders/report/ajax/order/count",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-order-day').text(data["order_today"].replace("null","0"));
						$('#js-order-month').text(data["order_month"].replace("null","0"));
						$('#js-order-total').text(data["order_total"].replace("null","0"));
					},error:function(){
						$alert._alert("积分商城订单数据加载失败！");
					}
			 });
			 /*联盟商户订单*/
			 $.ajax({
					url:"/shop-orders/report/ajax/shoporder/count",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$('#js-shoporder-day').text(data["order_today"].replace("null","0"));
						$('#js-shoporder-month').text(data["order_month"].replace("null","0"));
						$('#js-shoporder-total').text(data["order_total"].replace("null","0"));
					},error:function(){
						$alert._alert("商家订单数据加载失败！");
					}
			 });
		});
		
		
	});
});