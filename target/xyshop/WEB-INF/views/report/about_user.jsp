<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>XXXX管理后台 - 会员数量统计报表</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
	<input type="hidden" id="js-shop-uuid" value="${sessionScope.shopUuid }">
	<input type="hidden" id="js-begin-date">
	<input type="hidden" id="js-end-date">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>会员数量统计报表</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
	            <div class="btn-group">
	             	<label>会员数量统计</label>
	             	<select class="form-control js-change-table-params" id="js-choise-day" style="width: 250px;display: inline-block;">
<!-- 	             		<option value="" selected="selected">默认</option> -->
	             		<option value="today" selected="selected">今日数据统计</option>
<!-- 	             		<option value="yesterday">昨日数据统计</option> -->
	             		<option value="7day">7日内数据统计</option>
	             		<option value="30day">30日数据统计</option>
	             		<option value="week">本周数据统计</option>
	             		<option value="month">本月数据统计</option>
	             		<option value="appoint" id="js-appoint-time">指定统计时间</option>
					</select>
					<span id="js-time-span" style="display:none;">
						<label>时间区间统计</label>
						<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin" placeholder="开始时间">
						<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end" placeholder="结束时间">
					</span>
					&nbsp;&nbsp;&nbsp;&nbsp;
					<span id="time-span"></span>
				</div>
                <table id="table" class="table table-striped table-bordered table-hover">
                	<thread>
	                	<tr>
		                	<th>开始时间</th>
		                	<th>结束时间</th>
		                	<th>增加会员</th>
		                	<th>累计会员</th>
		                	<th>统计时间内充值会员</th>
		                	<th>统计时间内未充值会员</th>
	                	</tr>
                	</thread>
                	<tr>
	                	<td id="js-user-beginTime">-</td>
	                	<td id="js-user-endTime">-</td>
                		<td id="js-user-todayCount">0</td>
                		<td id="js-user-totalCount">0</td>
                		<td id="js-user-xiaofeiCount">0</td>
                		<td id="js-user-nonXiaofeiCount">0</td>
                	</tr>
                </table>
            </div>
            <div class="col-sm-12">
            	<div id="order-toolbar" class="btn-group">
	             	<label>所选时间内每日数据统计</label>
				</div>
            	<table id="reportTable"></table>
            </div>
        </div>
    </div>
  
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("report/aboutUserReport");</script>
</body>
</html>