<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>XXXX管理后台 - 佣金统计报表</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
            <jsp:include page="../head/layerDate.jsp"></jsp:include>
        </head>

        <body class="gray-bg">
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-sm-4">
                    <h2>佣金记录统计报表</h2>
                </div>
            </div>
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-sm-12">
                        <div id="income-toolbar" class="btn-group">
                            <label>佣金产生数据统计表</label>
                            <select class="form-control js-income-table-params js-table-params" id="js-income-day" data-type="income" style="width: 250px;display: inline-block;">
								<option value="total" selected="selected">累计数据</option>
								<option value="day">按日统计数据</option>
								<option value="month">按月统计数据</option>
								<option value="custom" id="js-appoint-time">指定统计时间</option>
							</select>
                            <span class="js-time-span" style="display:none;">
								<label>时间区间统计</label>
								<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin" placeholder="开始时间">
								<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end" placeholder="结束时间">
							</span>
                        </div>
                        <table id="incomeTable"></table>
                    </div>
                    <div class="col-sm-12">
                        <div id="expend-toolbar" class="btn-group">
                            <label>佣金提现数据统计表</label>
                            <select class="form-control js-expend-table-params js-table-params" id="js-expend-day" data-type="expend" style="width: 250px;display: inline-block;">
								<option value="total" selected="selected">累计数据</option>
								<option value="day">按日统计数据</option>
								<option value="month">按月统计数据</option>
								<option value="custom" id="js-appoint-time-1">指定统计时间</option>
							</select>
                            <span class="js-time-span" style="display:none;">
								<label>时间区间统计</label>
								<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin-1" placeholder="开始时间">
								<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end-1" placeholder="结束时间">
							</span>
                        </div>
                        <table id="expendTable"></table>
                    </div>
                </div>
            </div>

            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
                seajs.use("report/aboutCommissionReport");
            </script>
        </body>

        </html>