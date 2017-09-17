<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理后台 - 空白页</title>
    <jsp:include page="head/baseHead.jsp"></jsp:include>
	<jsp:include page="head/layerDate.jsp"></jsp:include>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
    	 <div class="row">
    		<div class="col-sm-12">
    			<a class="btn btn-info btn-rounded" target="_blank" href="http://daili.hvfen.com">代理商后台入口</a> 
    			<a class="btn btn-warning btn-rounded" target="_blank" href="http://shop.hvfen.com">店铺后台入口</a>
            </div>
    	  <!-- 用户数据统计 :开始 -->
    	 	<a>
    		<div class="col-sm-3">
                <div class="widget style1 lazur-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-user-plus fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>今日增加会员</span><h2 class="font-bold" id="js-user-todayCount">0</h2></div>
                </div></div>
            </div>
            </a>
            <a>
            <div class="col-sm-3">
                <div class="widget style1 lazur-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-user fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>累计会员</span><h2 class="font-bold" id="js-user-totalCount">0</h2></div>
                </div></div>
            </div>
            </a>
            <a>
            <div class="col-sm-3">
                <div class="widget style1 lazur-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-user fa-5x"></i><i class="fa fa-yen fa-2x"></i></div>
                        <div class="col-xs-6 text-right"><span>消费充值会员</span><h2 class="font-bold" id="js-user-xiaofeiCount">0</h2></div>
                </div></div>
            </div>
            </a>
            <a>
            <div class="col-sm-3">
                <div class="widget style1 lazur-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-user-times fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>未消费会员</span><h2 class="font-bold" id="js-user-nonXiaofeiCount">0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 用户数据统计 :结束 -->
            <!-- 充值数据统计 :开始 -->
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-credit-card fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>日充值金额统计</span><h2 class="font-bold" id="js-recharge-day">0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-credit-card fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>月充值金额统计</span><h2 class="font-bold" id="js-recharge-month">0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-credit-card fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>充值总量统计</span><h2 class="font-bold" id="js-recharge-total">0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 充值数据统计:结束 -->
             <!-- 充值数据统计 :开始 -->
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-money fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>日返还金币/积分统计</span><h2 class="font-bold" id="js-back-day">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-money fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>月返还金币/积分统计</span><h2 class="font-bold" id="js-back-month">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-money fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>总返还金币/积分统计</span><h2 class="font-bold" id="js-back-total">0/0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 充值数据统计:结束 -->
            <!-- 佣金数据统计 :开始 -->
            <div class="col-sm-4">
                <div class="widget style1 navy-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-cny fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>日产生/提现佣金统计</span><h2 class="font-bold" id="js-commission-day">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 navy-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-cny fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>月产生/提现佣金统计</span><h2 class="font-bold" id="js-commission-month">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 navy-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-cny fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>累计产生/提现佣金统计</span><h2 class="font-bold" id="js-commission-total">0/0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 佣金数据统计:结束 -->
            <!-- 积分商城订单数据统计 :开始 -->
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>积分商城日订单金额/数量统计</span><h2 class="font-bold" id="js-order-day">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>积分商城月订单金额/数量统计</span><h2 class="font-bold" id="js-order-month">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 yellow-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>积分商城累计订单金额/数量统计</span><h2 class="font-bold" id="js-order-total">0/0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 积分商城订单数据统计:结束 -->
            <!-- 商家订单数据统计 :开始 -->
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>商家日订单金额/数量统计</span><h2 class="font-bold" id="js-shoporder-day">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>商家月订单金额/数量统计</span><h2 class="font-bold" id="js-shoporder-month">0/0</h2></div>
                </div></div>
            </div>
            <div class="col-sm-4">
                <div class="widget style1 blue-bg"><div class="row">
                        <div class="col-xs-6"><i class="fa fa-file-text fa-5x"></i></div>
                        <div class="col-xs-6 text-right"><span>商家累计订单金额/数量统计</span><h2 class="font-bold" id="js-shoporder-total">0/0</h2></div>
                </div></div>
            </div>
            </a>
            <!-- 商家订单数据统计:结束 -->
    	</div> 
    </div>
<jsp:include page="head/scripts.jsp"></jsp:include>
<script>seajs.use("home");</script>
</body>
</html>
