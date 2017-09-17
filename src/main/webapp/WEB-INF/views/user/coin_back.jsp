<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 待返还金币列表</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
		            <div id="coin-back-toolbar" class="btn-group">
             			<label>用户待返还金币列表</label>
					</div>
	                <table id="coin-back-table"></table>
            </div>
        </div>
    </div>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("user/userCoinBack");</script>
</body>
</html>
