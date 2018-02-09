<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理后台 - 空白页</title>
    <style>
        html, body,.wrapper {
            height: 100%;
        }
        .above {
            height: 45%;
        }

        .insulate {
            height: 10%;
        }
        .below {
            height: 45%;
        }
        .above div.charts, .below div.charts {
            height: 100%;
        }
        .alert{
            padding: 35px 15px!important;
        }

        .alert-skyblue {
            color: #0a6869;
            background-color: #48eff1;
            border-color: #10dcde;
        }
    </style>
    <jsp:include page="head/baseHead.jsp"></jsp:include>
    <jsp:include page="head/layerDate.jsp"></jsp:include>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content">
    	 <div class="row above">
            <div id="" class="col-sm-4 charts">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="alert alert-success">
                            <b>今日收入：</b>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="alert alert-success">
                            <b>本月收入：</b>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="alert alert-info">
                            <b>本季度收入：</b>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="alert alert-info">
                            <b>今年收入：</b>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <div class="alert alert-warning">
                            <b>今日支出：</b>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="alert alert-warning">
                             <b>总支出：</b>
                        </div>
                    </div>
                </div>
            </div>
            <div id="adPageView" class="col-sm-4 charts">
            </div>
            <div id="leaguer" class="col-sm-4 charts">
            </div>
    	</div>
        <div class="row insulate"><div class="col-sm-12"></div></div>
    	<div class="row below">
            <div class="col-sm-4 charts">
                <div class="alert alert-skyblue">
                    <b>会员总人数：</b>
                </div>
                <div class="alert alert-danger">
                    <b>支付完成订单量：</b>
                </div>
            </div>
            <div id="orderPageView" class="col-sm-4 charts">
            </div>
            <div id="disk" class="col-sm-4 charts">
            </div>
        </div>
    </div>
<jsp:include page="head/scripts.jsp"></jsp:include>
<script>seajs.use("home");</script>
</body>
</html>
