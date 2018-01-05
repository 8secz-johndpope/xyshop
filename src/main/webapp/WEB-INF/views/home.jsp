<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>管理后台 - 空白页</title>
    <jsp:include page="head/baseHead.jsp"></jsp:include>
	<jsp:include page="head/layerDate.jsp"></jsp:include>
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
        
    </style>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content">
    	 <div class="row above">
            <div id="adPageView" class="col-sm-6 charts">
            </div>
            <div id="leaguer" class="col-sm-6 charts">
            </div>
    	</div>
        <div class="row insulate"><div class="col-sm-12"></div></div>
    	<div class="row below">
            <div id="orderPageView" class="col-sm-4 charts">
            </div>
            <div id="platformIncomeExpend" class="col-sm-4 charts">
            </div>
            <div id="disk" class="col-sm-4 charts">
            </div>
        </div>
    </div>
<jsp:include page="head/scripts.jsp"></jsp:include>
<script>seajs.use("home");</script>
</body>
</html>
