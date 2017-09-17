<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 广告界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>		
	<jsp:include page="../head/videoCss.jsp"></jsp:include>	
	<style type="text/css">
		.js-img-open{
			height:48px;
		}
		#js-add-img-show img {
			width: 100px;
		}
	</style>
</head>

<body class="gray-bg">
    <div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>广告界面</h2>
        </div>
    </div>

     <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
		            <div id="toolbar" class="btn-group">
						<!-- 工具菜单 -->
						<a class="btn btn-outline btn-success js-add">添加新的滚动广告</a>
						<label>广告位置</label>
                		<select class="form-control js-change-table-params" id="js-ad-pos" style="width: 100px;display: inline-block;">
							<option value="" selected="selected">全部</option>
							<option value="shopHomeTop">商城首页</option>
							<option value="cateTop">分类首页</option>
							<option value="monitorHomeTop">监控首页</option>
							<option value="monitorPlay">监控播放页</option>
						</select>
						<label>广告状态</label>
                		<select class="form-control js-change-table-params" id="js-ad-status" style="width: 100px;display: inline-block;">
							<option value="" selected="selected">全部</option>
							<option value="online">上线</option>
							<option value="offline">下线</option>
						</select>
					</div>
	                <table id="table"></table>
            </div>
        </div>
    </div>
<form>
<!-- Modal -->
  <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
     	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
		<h4 class="modal-title" id="myModalLabel">添加/修改广告基础信息</h4> 
     </div> 
     <div class="modal-body">
     	<input type="hidden" id="js-update-uuid" />
     	 <div class="form-group">
		 	<label>广告图片</label><small>(图片大小建议:宽x高=540x280)</small> 
		 	<div id="js-add-img-show"></div>
		 	<div id="js-add-img-up">上传广告图片</div>
		 </div>
	     <div class="form-group">
			<label>广告名</label>
			<input class="form-control required" id="js-add-name" placeholder="广告名">
		 </div>
		 <div class="form-group">
			 <label>奖励金币</label>
			 <input class="form-control" id="js-coin" placeholder="奖励金币">
		 </div>
		 <div class="form-group">
			<label>广告位置</label>
			<label class="radio-inline">
			<input class="radio" type="radio" name="position" checked="checked" id="shopHomeTop" value="shopHomeTop">
			<label for="shopHomeTop">商城首页</label>
			<input class="radio" type="radio" name="position" id="cateTop" value="cateTop">
			<label for="cateTop">分类首页</label>
			<input class="radio" type="radio" name="position" id="monitorHomeTop" value="monitorHomeTop">
			<label for="monitorHomeTop">监控首页</label>
			<input class="radio" type="radio" name="position" id="monitorPlay" value="monitorPlay">
			<label for="monitorPlay">监控播放页</label>
		 </div>
		 <div class="form-group">
			<label>广告类型</label>
			<label class="radio-inline">
			<input class="radio" type="radio" name="type" checked="checked" id="innerUrl" value="innerUrl" />
			<label for="innerUrl">内部链接</label>
			<input class="radio" type="radio" name="type" id="outerUrl" value="outerUrl" />
			<label for="outerUrl">外部链接</label>
			<input class="radio simpleGoods" type="radio" name="type" id="simpleGoods" value="simpleGoods" />
			<label for="simpleGoods" class="simpleGoods">指定商品</label>
		 	</div>
		  <div class="form-group">
			<label>广告状态</label>
			<label class="radio-inline">
			<input class="radio" type="radio" name="status" checked="checked" id="online" value="online">
			<label for="online">上线</label>
			<input class="radio" type="radio" name="status" id="offline" value="offline">
			<label for="offline">下线</label>
		 </div>
		  <!-- 内部链接详情：开始 -->
		 <div class="form-group needHide video-Type">
			<label>视频类型</label>
			<label class="radio-inline">
			<input class="radio" type="radio" name="videoType" checked="checked" id="inner" value="inner">
			<label for="inner">内部视频</label>
			<input class="radio" type="radio" name="videoType" id="outer" value="outer">
			<label for="outer">外部视频</label>
		 </div>
		
		 <div class="form-group needHide vt-hide hide video-type-outer">
			<label>外部视频通用代码</label>
			<input class="form-control required" id="js-video-addr" style="margin: 10px auto;" placeholder="视频地址">
			<div class="js-outer-video-show"></div>
		</div>


		<div class="form-group needHide vt-hide video-type-inner">
			<label>上传视频</label>
			<div class="js-video-show"></div>
			<div class="js-video-up">上传广告视频</div>
		</div>
		 <div class="form-group needHide innerUrlDiv">
			<label>内容详情 </label>
			<small>(上传图片大小最好在2M以内)</small>
			<div class="form-group" id="editorItem">
				<script id="editor" type="text/plain" style="height:500px;"></script>
			</div>
		</div>
		  <!-- 内部链接详情：结束 -->
		 <!-- 外部链接详情：开始 -->
		 <div class="form-group needHide hide" id="outerUrlDiv">
			<label>外部连接</label>
			<input class="form-control required" id="js-ad-url" placeholder="外部连接地址">
		 </div>
		  <!-- 外部链接详情：结束 -->
		  <!-- 选择商品：开始 -->
		<div class="form-group needHide hide" id="simpleGoodsDiv">
			<label style="width: 100px;">选择指定商品</label>
			<input class="form-control" style="width: 55%;display: inline-block;" id="goods-name" placeholder="输入商品名字,点击搜索进行选择"> 
			<input class="hide" id="goods-uuid"> 
		 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-goods-select-btn"  >搜索</span>
		</div>
		<div class="form-group needHide hide" id="goods-selectBox">
			<label style="width: 100px;"></label>
			<select class="form-control" style="width: 56%;display: inline-block;" id="js-goods-select">
			</select>
			<span class="btn btn-outline btn-primary"  id="js-goods-sure" style="float: right;">确定</span>
		</div>
		  <!-- 选择商品：结束 -->
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
      <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">添加</a>
      <a type="button" id="js-update-btn" class="btn btn-outline btn-primary hide">保存</a> 
     </div> 
    </div> 
    <!-- /.modal-content --> 
   </div> 
   <!-- /.modal-dialog --> 
  </div> 
 <!-- /.modal -->
</form>
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("ad/adList");</script>
</body>
</html>
