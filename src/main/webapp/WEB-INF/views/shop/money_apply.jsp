<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商户提现申请</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
		    	<div id="apply-toolbar" class="btn-group">
		        	<label>商户提现申请</label>
		        	<label>状态:</label>
		        	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 150px;display: inline-block;">
	             		<option value="wait" selected="selected">等待确认</option>
	             		<option value="success">成功提现</option>
	             		<option value="fail">拒绝提现</option>
             		</select>
             		<label>申请时间</label>
                    <input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin" placeholder="开始时间">
                    <input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end" placeholder="结束时间">

                    <a type="button" id="js-export-record" class="btn btn-outline btn-primary" style="float:right; margin-left:20px;">提现报表导出</a>
				</div>
	            <table id="moneytable"></table>
            </div>
            
            <!-- <div class="col-sm-12">
		    	<div id="toolbar" class="btn-group">
		        	<label>商户提现记录:</label>
		        	<label>状态:</label>
		        	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 150px;display: inline-block;">
	             		<option value="" selected="selected">全部</option>
	             		<option value="success">成功提现</option>
	             		<option value="wait">等待确认</option>
	             		<option value="fail">拒绝提现</option>
             		</select>
		        	<input class="form-control js-change-table-params" style="width:200px;display: inline-block;padding-left: 10px;" id="js-shop-name" placeholder="店铺名称……(若无要求则不填)">
				</div>
	            <table id="tixiantable"></table>
            </div> -->
        </div>
    </div>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("shop/applyList");</script>
</body>
</html>
