<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>XXXX管理后台 - 佣金返还统计报表</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>金币返还记录统计报表</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
	            <div id="report-toolbar" class="btn-group">
	             	<label>会员数量统计</label>
	             	<select class="form-control js-change-table-params" id="js-choise-day" style="width: 250px;display: inline-block;">
	             		<option value="total" selected="selected">累计数据</option>
	             		<option value="day">按日统计数据</option>
	             		<option value="month">按月统计数据</option>
					</select>
					<span id="js-time-span"></span>
				</div>
                <table id="reportTable"></table>
            </div>
        </div>
    </div>
  
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("report/aboutCoinBackReport");</script>
</body>
</html>
