<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 会员推荐商家_分佣参数设置</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
</head>

<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>会员推荐商家_商家收单流水分佣参数设置</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            	<div id="toolbar" class="btn-group"></div>
                <table id="table"></table>
            </div>
        </div>
    </div>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("system/fy_sd_Params");</script>
</body>
</html>