<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>店铺后台 - 商品详情界面</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
            <jsp:include page="../head/uploadCss.jsp"></jsp:include>
        </head>

        <body class="gray-bg">
            <input type="hidden" id="js-goods-uuid" value="${uuid}">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <!-- <div class="col-sm-12">
                        <div id="toolbar" class="btn-group">
                            <label>商品评价表</label>
                        </div>
                        <table id="table"></table>
                    </div> -->
                    <div class="col-sm-12">
                        <h3>商品订单表</h3>
                        <div id="order-toolbar" class="btn-group">
                            <!-- <label>订单状态</label>
                            <select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
                                <option value="" selected="selected">全部</option>
                                <option value="waitPay">待支付</option>
                                <option value="waitDelivery">待发货</option>
                                <option value="waitTake">待收货</option>
                                <option value="waitJudge">待评价</option>
                                <option value="judged">已评价</option>
                            </select> -->
                            <label style="padding-left: 10px;">支付方式:</label>
                            <select class="form-control js-change-table-params" id="js-choise-payway" style="width: 150px;display: inline-block;">
                                <option value="" selected="selected">全部</option>
                                <option value="coin">金币支付</option>
                                <option value="weixin">微信支付</option>
                                <!-- <option value="alipay">支付宝</option>
                                <option value="unionPay">银联支付</option> -->
                            </select>
                        </div>
                        <table id="ordertable"></table>
                    </div>
                </div>
            </div>
            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
            seajs.use("goods/union_good_info");
            </script>
        </body>
        </html>
