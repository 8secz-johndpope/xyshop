<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>管理后台 - 会员详情界面</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
            <jsp:include page="../head/uploadCss.jsp"></jsp:include>
        </head>

        <body class="gray-bg">
            <input type="hidden" id="js-user-uuid" value="${uuid}">
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-sm-4">
                    <h2>会员详情界面</h2>
                </div>
            </div>
            <div class="wrapper wrapper-content">
                <div class="row">
                    <!-- <div class="col-sm-12">
                        <div id="toolbar" class="btn-group">
                            <label>会员信息</label>
                        </div>
                        <table id="table"></table>
                    </div> -->

                    <%--<div class="col-sm-12">--%>
                        <%--<div id="user-toolbar" class="btn-group">--%>
                            <%--<label>下级会员列表</label>--%>
                        <%--</div>--%>
                        <%--<table id="user-table"></table>--%>
                    <%--</div>--%>

                    <div class="col-sm-12">
                        <div id="order-toolbar" class="btn-group">
                            <label>会员订单表：订单状态</label>
                            <select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
								<option value="" selected="selected">全部</option>
								<option value="waitPay">待支付</option>
								<option value="waitTake">待消费</option>
								<option value="waitJudge">待评价</option>
								<!-- <option value="judged">已评价</option> -->
							</select>
                            <label style="padding-left: 10px;">支付方式:</label>
                            <select class="form-control js-change-table-params" id="js-choise-payway" style="width: 150px;display: inline-block;">
								<option value="" selected="selected">全部</option>
								<option value="coin">金币支付</option>
								<option value="weixin">微信支付</option>
								<option value="alipay">支付宝</option>
							</select>
                        </div>
                        <table id="ordertable"></table>
                    </div>

                    <div class="col-sm-12">
                        <div id="coin-toolbar" class="btn-group">
                            <label>会员金币记录</label>
                        </div>
                        <table id="cointable"></table>
                    </div>
                    <%--<div class="col-sm-12">--%>
                        <%--<div id="coin-back-toolbar" class="btn-group">--%>
                            <%--<label>会员待返还金币列表</label>--%>
                        <%--</div>--%>
                        <%--<table id="coin-back-table"></table>--%>
                    <%--</div>--%>
                    <div class="col-sm-12">
                        <div id="commission-toolbar" class="btn-group">
                            <label>会员佣金记录</label>
                        </div>
                        <table id="commissiontable"></table>
                    </div>

                    <div class="col-sm-12">
                        <div id="exre-toolbar" class="btn-group">
                            <label>会员商家消费记录</label>
                            <label style="padding-left: 10px;">消费方式:</label>
                            <select class="form-control" id="js-er-payway" style="width: 150px;display: inline-block;">
								<option value="coin">金币支付</option>
								<option value="wxpay">微信支付</option>
                                <option value="alipay">支付宝支付</option>
							</select>
                        </div>
                        <table id="exretable"></table>
                    </div>

                    <!-- <div class="col-sm-12">
                        <div id="address-toolbar" class="btn-group">
                            <label>会员地址列表</label>
                        </div>
                        <table id="addresstable"></table>
                    </div> -->


                </div>
            </div>

            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
                seajs.use("user/userInfo");
            </script>
        </body>

        </html>