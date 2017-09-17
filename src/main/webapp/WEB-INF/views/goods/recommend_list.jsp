<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商品推荐管理界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<style>
		td{
			border-spacing: 0px;
		}
		.js-img-open {
			height:48px;
		}
	</style>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>积分商城商品推荐管理</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
             	<a type="button" id="js-add" class="btn btn-outline btn-primary">推荐新的商品</a> 
			</div>
                <table id="table"></table>
            </div>
        </div>
    </div>
    <form>
    	<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
		   <div class="modal-dialog"> 
		    <div class="modal-content"> 
		     <div class="modal-header"> 
		      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
		      <h4 class="modal-title" id="myModalLabel">添加/修改积分商城商品推荐</h4> 
		     </div> 
		     <div class="modal-body">
		     	 <div class="form-group">
		     	 	<!-- 选择商家：开始 -->
				<div class="form-group">
					<label style="width: 100px;">选择商品</label>
					<input class="form-control" style="width: 55%;display: inline-block;" id="goods-name" placeholder="输入商品名字,点击搜索进行选择"> 
					<input class="hide" id="goods-uuid"> 
				 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-goods-select-btn"  >搜索</span>
				</div>
				<div class="form-group hide" id="goods-selectBox">
					<label style="width: 100px;"></label>
					<select class="form-control" style="width: 56%;display: inline-block;" id="js-goods-select">
					</select>
					<span class="btn btn-outline btn-primary"  id="js-goods-sure" style="float: right;">确定</span>
				</div>
				  <!-- 选择商家：结束 -->
				 	<label>首页展示的推荐图</label><small>(建议单张图片保持在2M以内,470*285像素的图片展示效果最佳)</small> 
				 	<div id="js-add-img-show"></div>
				 	<div id="js-add-img-up">上传展示的推荐图</div>
				 </div>
				<!-- 选择代理商：结束 -->
		     </div> 
		     <div class="modal-footer"> 
		      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
		      <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">确定</a>
		     </div> 
		    </div> 
		   </div> 
		  </div>
    </form>
    
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("goods/recommendList");</script>
</body>
</html>