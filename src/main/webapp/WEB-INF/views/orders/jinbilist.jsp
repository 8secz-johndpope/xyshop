<%@page import="com.mx.home.utils.Config"%>
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 -积分商城订单管理界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>

<body class="gray-bg">
<%-- <input type="hidden" id="js-goods-uuid" value="${uuid}"> --%>
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>积分商城订单管理界面</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="order-toolbar" class="btn-group">
             	<label>订单状态</label>
             	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
             		<option value="" selected="selected">全部</option>
             		<option value="waitPay">待支付</option>
             		<option value="waitDelivery">待发货</option>
             		<option value="waitTake">待收货</option>
             		<option value="waitJudge">待评价</option>
             		<option value="judged">已评价</option>
             		<option value="canceled">已取消</option>
				</select>
<!-- 				<label style="padding-left: 10px; display: none;">订单类型:</label> -->
<input type="hidden" id="js-choise-type" value="shop" />
<!--              	<select class="form-control js-change-table-params" id="js-choise-type" style="width: 150px; display: none;"> -->
<!--              		<option value="shop">金币支付订单</option> -->
<!--              	</select> -->
<input type="hidden" id="js-choise-payway" value="coin" />
<!--              	<label style="padding-left: 10px;">支付方式:</label> -->
<!--              	<select class="form-control js-change-table-params" id="js-choise-payway" style="width: 150px;display: inline-block;"> -->
<!--              		<option value="" selected="selected">全部</option> -->
<!--              		<option value="coin">金币支付</option> -->
<!--              		<option value="weixin">微信支付</option> -->
<!--              		<option value="alipay">支付宝</option> -->
<!--              		<option value="unionPay">银联支付</option> -->
<!--              	</select> -->
             	<label>下单时间</label>
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间"> 
             	<br>
<!--              	<input class="form-control js-change-table-params" style="width:48%;display: inline-block;" id="js-goods-name" placeholder="商品名称……(若无要求则不填)"> -->
<!--              	<input class="form-control js-change-table-params" style="width:48%;display: inline-block;padding-left: 10px;" id="js-user-name" placeholder="用户名称……(若无要求则不填)"> -->
			</div>
                <table id="ordertable"></table>
                <input id="wx_domain" type="hidden" value="<%=Config.WX_DOMAIN%>" />
            </div>
        </div>
    </div>
<form>

<!-- 填写物流信息：开始 -->
 <div class="modal fade" id="wuliuModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
      <h4 class="modal-title" id="myModalLabel">填写物流信息</h4> 
     </div> 
     <div class="modal-body">
     	<input type="hidden" id="js-order-no">
     	<input type="hidden" id="js-order-uuid">
     	
     	<a class="list-group-item">
			<label>物流名称</label>
			<input class="radio" type="radio" name="wuliu" checked="checked" value="SF"><label>顺丰快递</label>
			<input class="radio" type="radio" name="wuliu" value="STO"><label>申通快递</label>
			<input class="radio" type="radio" name="wuliu" value="ZTO"><label>中通快递</label>
			<input class="radio" type="radio" name="wuliu" value="YTO"><label>圆通快递</label>
			<input class="radio" type="radio" name="wuliu" value="YD"><label>韵达快递</label>
		</a>
     	<a class="list-group-item">
			<label>物流单号</label>
			<input class="form-control" type="number" id="p-wuliudanhao" placeholder="物流单号">
		</a>
		<input   type="hidden" id="p-uuid" >
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
      <a type="button" id="js-delivered-btn" class="btn btn-outline btn-primary">确定</a>
     </div> 
    </div> 
    <!-- /.modal-content --> 
   </div> 
   <!-- /.modal-dialog --> 
  </div> 
<!-- 填写物流信息：结束 -->
<!-- 物流详情区域：开始 -->
 <div class="modal fade" id="wuliuinfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
      <h4 class="modal-title" id="myModalLabel">物流详情</h4> 
     </div> 
     <div class="modal-body" id="wuliuinfo">
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">关闭</a> 
     </div> 
    </div> 
    <!-- /.modal-content --> 
   </div> 
   <!-- /.modal-dialog --> 
  </div> 
<!-- 物流详情：结束 -->
</form>    
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("order/jifenlist");</script>
</body>
</html>
