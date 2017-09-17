<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
             	<label>订单状态</label>
             	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
             		<option value="" selected="selected">全部</option>
             		<option value="waitPay">待支付</option>
             		<option value="paySuccess">支付成功</option>
             		<option value="payFail">支付失败</option>
				</select>
             	<label style="padding-left: 10px;">支付方式:</label>
             	<select class="form-control js-change-table-params" id="js-choise-payway" style="width: 150px;display: inline-block;">
             		<option value="" selected="selected">全部</option>
             		<option value="coin">金币支付</option>
             		<option value="weixin">微信支付</option>
             		<option value="alipay">支付宝</option>
             		<option value="unionPay">银联支付</option>
             	</select>
             	<label>下单时间</label>
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间"> 
			</div>
                <table id="ordertable"></table>
            </div>
        </div>
    </div>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("order/paylist");</script>
</body>
</html>
