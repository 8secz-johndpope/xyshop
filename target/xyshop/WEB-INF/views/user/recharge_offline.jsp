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
    <title>管理后台 - 会员充值订单管理界</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-12">
            <h2>会员充值-线下支付审核界面<small>(确认收款后充值金额将会打入用户账户,并打印该订单信息.)</small></h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="order-toolbar" class="btn-group">
             	<label>充值时间</label>
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间"> 
<!--              	<input class="form-control js-change-table-params" style="width:200px;display: inline-block;" id="js-order-no" placeholder="订单号……(若无要求则不填)"> -->
<!--              	<input class="form-control js-change-table-params" style="width:200px;display: inline-block;padding-left: 10px;" id="js-user-name" placeholder="用户名称……(若无要求则不填)"> -->
			</div>
                <table id="ordertable"></table>
                <input id="wx_domain" type="hidden" value="<%=Config.WX_DOMAIN%>" />
            </div>
        </div>
    </div>
    
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("user/rechargeOffline");</script>
</body>
</html>