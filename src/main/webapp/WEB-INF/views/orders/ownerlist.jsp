<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@page import="com.mx.home.utils.Config"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 订单管理界</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
	<%-- <input type="hidden" id="js-goods-uuid" value="${uuid}"> --%>
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>订单管理界面</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
	            <div id="order-toolbar" class="btn-group">
	<!--              	<label>订单状态</label> -->
	<!--              	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;"> -->
	<!--              		<option value="" selected="selected">全部</option> -->
	<!--              		<option value="waitPay">等待支付</option> -->
	<!--              		<option value="paySuccess">支付完成</option> -->
	<!--              		<option value="payFail">支付失败</option> -->
	<!-- 				</select> -->
	             	<label>下单时间</label>
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间">
					
					<select class="form-control js-change-table-params" id="js-choise-goods" data-selType="goods" style="width: 250px;display: inline-block;">
						<option value="" selected="selected">所有</option>
						<option value="402881e95a87b033015a87b0379c0000">新会员专享(¥1)</option>
						<option value="402881e95a87b033015a87b038380001">月卡(¥1000)</option>
						<option value="402881e95a87b033015a87b0387b0002">季卡(¥30000)</option>
						<option value="cc4a44b839864453927be7d82e7b975f">半年卡(¥30000)</option>
						<option value="402881e95a87b033015a87b038c40003">半年卡(¥90000)</option>
						<option value="abf54eb08a7c4b319d9b240e8eef7934">年卡(¥1000)</option>
						<option value="0d9e22bc1a7248c6af8e807c576679db">年卡(¥5000)</option>
						<option value="cc88dc3361604a35afc3c299aa57f632">年卡(¥10000)</option>
						<option value="ee0eeb1ad83543a7aa60b4871c0fe9f1">年卡(¥50000)</option>
						<option value="76e4acfdd64a48a7bbac79af45272767">活动年卡(¥300)</option>
						<option value="c8c9724ac4134d1ca643826429f8cfd3">活动年卡(¥500)</option>
					</select> 
					<a type="button" id="js-buy-selfgoods" class="btn btn-outline btn-primary" style="float:right; margin-left:20px;">会员大额自营产品购买</a>
				</div>
                <table id="ordertable"></table>
            </div>
        </div>
    </div>
    
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
	   <div class="modal-dialog"> 
		<div class="modal-content"> 
		     <div class="modal-header"> 
		      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
		      <h4 class="modal-title" id="myModalLabel">会员大额自营产品购买提交</h4> 
		     </div>
		     <div class="modal-body">
		     	<form class="form-horizontal" role="form">
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">会员ID: </label>
				    <div class="col-sm-10">
				      <input type="text" style="float:left; width:60%;" class="form-control" id="user-sceneid" placeholder="请输入会员ID">
				      <a type="button" id="js-user-find" class="btn btn-outline btn-primary" style="float:left; float:right; margin-left:20px;">查询</a>
				    </div>
				  </div>
				  <div class="form-group">
				  	<input id="userUuid" type="hidden" />
				  	<input id="wx_domain" type="hidden" value="<%=Config.WX_DOMAIN%>" />
				    <label id="userName" class="col-sm-3 control-label">用户名: </label>
				    <label id="userCoin" class="col-sm-3 control-label">金币: </label>
				  </div>
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">自营产品: </label>
				    <div class="col-sm-10">
				    	<select class="form-control js-change-total" id="js-selfgoods" style="width: 300px;display: inline-block;">
						</select>
				    </div>
				  </div>
				  <div class="form-group">
				    <label for="firstname" class="col-sm-2 control-label">购买数量: </label>
				    <div class="col-sm-10">
				      <input type="number" class="form-control" id="selgfoods_num" placeholder="请输入购买数量" value="1">
				    </div>
				  </div>
				  <div class="form-group">
				    <label class="col-sm-2 control-label">金币总计: </label>
				    <div class="col-sm-10">
					    <input id="coinTotal" disabled="disabled" type="text" class="form-control" value="0">
				    </div>
				  </div>
				  <div class="form-group">
				    <label id="desc" class="control-label" style='text-align:center;'></label>
				  </div>
				</form>
		     </div> 
		     <div class="modal-footer"> 
			      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
			      <a type="button" id="js-selfgoods-submit" class="btn btn-outline btn-primary">确定</a>
		     </div>
			</div>
		</div>
	</div>
    
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("order/ownerlist");</script>
</body>
</html>