<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 角色管理</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
</head>

<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2 id="title" data-phone="${phone}" data-uuid="${uuid}">用户${phone}的地址列表</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
		            <div id="toolbar" class="btn-group">
						<!-- 工具菜单 -->
					</div>
	                <table id="table"></table>
            </div>
        </div>
    </div>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("user/userList");</script>
</body>
</html>
