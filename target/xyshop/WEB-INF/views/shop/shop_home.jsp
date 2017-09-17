<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商家详情界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
</head>

<body class="gray-bg">
	<input type="hidden" id="js-shop-uuid" value="${uuid }">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>商家详情界面</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
	            <div id="toolbar" class="btn-group">
	            	<label>商家基本资料</label>
				</div>
                <table id="table"></table>
            </div>
            
            <div class="col-sm-12">
	            <div id="order-toolbar" class="btn-group">
	             	<label>商家订单表：订单状态</label>
	             	<select class="form-control js-change-table-params" id="js-choise-status" style="width: 100px;display: inline-block;">
	             		<option value="" selected="selected">全部</option>
	             		<option value="waitPay">待支付</option>
	             		<option value="waitDelivery">待发货</option>
	             		<option value="waitTake">待收货</option>
	             		<option value="waitJudge">待评价</option>
	             		<option value="judged">已评价</option>
					</select>
	             	<label style="padding-left: 10px;">支付方式:</label>
	             	<select class="form-control js-change-table-params" id="js-choise-payway" style="width: 150px;display: inline-block;">
	             		<option value="" selected="selected">全部</option>
	             		<option value="coin">金币支付</option>
	             		<option value="weixin">微信支付</option>
	             		<option value="alipay">支付宝</option>
	             		<option value="unionPay">银联支付</option>
	             	</select>
				</div>
                <table id="ordertable"></table>
            </div>
            
            <div class="col-sm-12">
	            <div id="coin-toolbar" class="btn-group">
	             	<label>商户收支记录</label>
				</div>
                <table id="cointable"></table>
            </div>
            
             <div class="col-sm-12">
	            <div id="score-toolbar" class="btn-group">
	             	<label>商户积分记录</label>
				</div>
                <table id="scoretable"></table>
            </div>
            
        </div>
    </div>
    
    
    
    <!-- 商家详情 -->
    
<!-- 修改商家信息：开始 -->    
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
      <h4 class="modal-title" id="myModalLabel">修改商家信息</h4> 
     </div> 
     <div class="modal-body">
     	<input type="hidden" id="js-update-uuid" />
     	 <div class="form-group">
		 	<label>门店缩略图</label><small>(建议单张图片保持在200K以内,430*430像素的图片展示效果最佳)</small> 
		 	<div class="js-update-thumbimg-show"></div>
		 	<div class="js-thumbimg-up">上传门店缩略图</div>
		 </div>
		 <div class="form-group">
		 	<label>门店缩略图</label><small>(建议单张图片保持在200K以内,640*420像素的图片展示效果最佳)</small> 
		 	<div class="js-update-moreimg-show"></div>
		 	<div class="js-moreimg-up">上传门店更多图</div>
		 </div>
	     <div class="form-group">
			<label>名称</label>
			<input class="form-control required js-init" id="js-update-name" placeholder="商家名称">
		 </div>
		 <div class="form-group">
			<label>店里手机</label>
			<input class="form-control required js-init" id="js-update-shopphone" placeholder="店里手机">
		 </div>
		 <div class="form-group">
			<label>店长手机(后台登录账户)</label>
			<input class="form-control required js-init" id="js-update-ownerphone" placeholder="店长手机">
		 </div>
		 <div class="form-group">
			<label>所在地区</label>
			<div style="display: block;">
				<select class="form-control required js-pro" id="js-update-pro" style="width:31%;display: inline-block;" placeholder="省">
					<option value="-" selected="selected">-</option>
				</select>
				<select class="form-control required js-city" id="js-update-city" style="width:31%;display: inline-block;" placeholder="市">
					<option value="-">-</option>
				</select>
				<select class="form-control required js-area" id="js-update-area" style="width:31%;display: inline-block;" placeholder="县">
					<option value="-">-</option>
				</select>
			</div>
		 </div>
		  <div class="form-group">
			<label>门店地址</label>
			<input class="form-control required js-init" id="js-update-address" placeholder="门店地址">
		 </div>
		 <div class="form-group">
			<label>经纬度</label><small><a target="_blank" href="http://api.map.baidu.com/lbsapi/getpoint/index.html">坐标拾取系统</a>(打开坐标拾取系统,复制经纬度粘贴即可)</small>
			<input class="form-control required js-init" id="js-update-jingweidu" placeholder="经纬度">
		 </div>
		 <div class="form-group">
			<label>商户的身份</label>
			<select class="form-control required" id="js-update-role">
				<option value="union" selected="selected">商家</option>
				<option value="supplier">供应商</option>
			</select>
		 </div>
		 <!-- 选择分类：开始 -->
		<div class="form-group">
			<label style="width: 100px;">选择所属分类</label>
			<input class="form-control js-init" style="width: 55%;display: inline-block;" id="cat-name-update" placeholder="输入分类名字,点击搜索进行选择"> 
			<input class="hide js-init" id="cat-uuid-update"> 
		 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-cat-select-btn-update"  >搜索</span>
		</div>
		<div class="form-group hide" id="cat-selectBox-update">
			<label style="width: 100px;"></label>
			<select class="form-control" style="width: 56%;display: inline-block;" id="js-cat-select-update">
			</select>
			<span class="btn btn-outline btn-primary"  id="js-cat-sure-update" style="float: right;">确定</span>
		</div>
		  <!-- 选择分类：结束 -->
		   <!-- 选择分类：开始 -->
		<div class="form-group">
			<label style="width: 100px;">选择所属分类</label>
			<input class="form-control js-init" style="width: 55%;display: inline-block;" id="cat-name-update" placeholder="输入分类名字,点击搜索进行选择"> 
			<input class="hide js-init" id="cat-uuid-update"> 
		 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-cat-select-btn-update"  >搜索</span>
		</div>
		<div class="form-group hide" id="cat-selectBox-update">
			<label style="width: 100px;"></label>
			<select class="form-control" style="width: 56%;display: inline-block;" id="js-cat-select-update">
			</select>
			<span class="btn btn-outline btn-primary"  id="js-cat-sure-update" style="float: right;">确定</span>
		</div>
		  <!-- 选择分类：结束 -->
		<!-- 选择代理商：开始 -->
		<div class="form-group">
			<label style="width: 100px;">所属代理商</label>
			<input class="form-control js-init" style="width: 55%;display: inline-block;" id="agent-name-update" placeholder="输入名字,点击搜索选择,不填则为总后台"> 
			<input class="hide js-init" id="agent-uuid-update"> 
		 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-agent-select-btn-update">搜索</span>
		</div>
		<div class="form-group hide" id="agent-selectBox-update">
			<label style="width: 100px;"></label>
			<select class="form-control" style="width: 56%;display: inline-block;" id="js-agent-select-update">
			</select>
			<span class="btn btn-outline btn-primary"  id="js-agent-sure-update" style="float: right;">确定</span>
		</div>
		<!-- 选择代理商：结束 -->
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a>
      <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">添加</a>
     </div> 
    </div> 
   </div> 
</div> 
<!-- 修改商家信息：结束 -->     
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("shop/shopHome");</script>
</body>
</html>
