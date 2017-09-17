<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 会员提现管理页</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>会员提现记录管理界面</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
	            <div id="order-toolbar" class="btn-group">
	             	<label>订单状态</label>
	             	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
	             		<option value="" selected="selected">全部</option>
	             		<option value="wait">待处理</option>
	             		<option value="success">提现成功</option>
	             		<option value="fail">提现拒绝</option>
					</select>
					<select class="form-control js-change-table-params" id="js-choise-payway" style="width: 100px;display: inline-block;">
	             		<option value="" selected="selected">全部</option>
	             		<option value="commission">佣金提现</option>
	             		<option value="coin">金币提现</option>
					</select>
	             	<label>提现时间</label>
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间"> 
	<!--              	<br> -->
	<!-- <!--              	<input class="form-control js-change-table-params" style="width:48%;display: inline-block;padding-left: 10px;" id="js-user-name" placeholder="用户名，手机号……(若无要求则不填)"> -->
	<!--              	<br> -->
	<!--              	<input class="form-control js-change-table-params" style="width:48%;display: inline-block;padding-left: 10px;" id="js-user-name" placeholder="用户名，手机号……(若无要求则不填)"> -->
	<!--              	<input class="form-control js-change-table-params" style="width:249px; display: inline-block;padding-left: 10px;" id="js-user-name" placeholder="用户名，手机号(若无要求则不填)"> -->
	
					<a type="button" id="js-export-record" class="btn btn-outline btn-primary" style="float:right; margin-left:20px;">提现报表导出</a>
				</div>
                <table id="ordertable"></table>
            </div>
        </div>
    </div>
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("user/withdraw");</script>
</body>
</html>