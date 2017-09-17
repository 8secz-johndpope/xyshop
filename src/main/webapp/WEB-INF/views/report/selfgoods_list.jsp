<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>

<head>
    <base href="<%=basePath%>">
    <title>XXXX管理后台 - 自营产品订单统计报表</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>自营产品订单统计报表</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
                <div id="report-toolbar" class="btn-group">
                    <label>自营产品订单统计</label>
                    <select class="form-control js-change-table-params" id="js-choise-day" data-selType="day" style="width: 250px;display: inline-block;">
						<option value="total" selected="selected">累计数据</option>
						<option value="day">按日统计数据</option>
						<option value="month">按月统计数据</option>
						<option value="custom" id="js-appoint-time">指定统计时间</option>
					</select>
                     <span id="js-time-span" style="display:none;">
					<label>时间区间统计</label>
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin" placeholder="开始时间">
					<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end" placeholder="结束时间">
					</span>
                     <select class="form-control js-change-table-params" id="js-choise-goods" data-selType="goods" style="width: 250px;display: inline-block;">
						<option value="0" selected="selected">所有</option>
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
                 </div>
                 <table id="reportTable"></table>
             </div>
         </div>
     </div>

     <jsp:include page="../head/scripts.jsp"></jsp:include>
    <script>
        seajs.use("report/aboutSelfGoodsOrderReport");
    </script>
</body>
</html>