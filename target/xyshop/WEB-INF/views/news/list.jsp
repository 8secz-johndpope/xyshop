<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商城资讯界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<style type="text/css">
		.js-img-open{
			height:48px;
		}
	</style>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>商城资讯管理</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
             	<a type="button" id="js-add" class="btn btn-outline btn-primary">添加新的资讯</a>
			</div>
                <table id="table"></table>
            </div>
        </div>
    </div>
	<form>
	<!-- 添加新的品牌：开始 -->
	<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
	   <div class="modal-dialog"> 
	    <div class="modal-content"> 
	     <div class="modal-header"> 
	      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
	      <h4 class="modal-title" id="myModalLabel">添加/修改资讯</h4> 
	     </div> 
	     <div class="modal-body">
	     <input type="hidden" id="js-update-uuid">
	     	<div class="form-group">
			 	<label>广告图片</label><small>(图片大小建议:宽x高=200x160)</small> 
			 	<div id="js-add-img-show"></div>
			 	<div id="js-add-img-up">上传广告图片</div>
			 </div>
		     <div class="form-group">
				<label>标题</label>
				<input class="form-control required" id="js-add-title" placeholder="标题">
			 </div>
			 <div class="form-group">
				<label>简述</label>
				<input class="form-control required" id="js-add-desc" placeholder="简述">
			 </div>
			  <div class="form-group">
				<label>状态</label>
				<label class="radio-inline">
				<input class="radio" type="radio" name="status" checked="checked" value="offline">下线
				<input class="radio" type="radio" name="status" value="online">上线
	            </label>
			 </div>
			  <div class="form-group">
				<label>资讯类型</label>
				<label class="radio-inline">
				<input class="radio" type="radio" name="type" checked="checked" value="outerUrl">外部链接
				<input class="radio" type="radio" name="type" value="selfUrl">内部连接
				</label>
			 </div>
			 <div class="form-group" id="js-outerUrl-box">
				<label>资讯链接地址 </label>
				<input class="form-control required" id="js-add-url" placeholder="资讯链接地址">
			 </div>
			 <div class="form-group" id="js-selfUrl-box">
				<label>资讯详情 </label><small>(上传图片大小最好在2M以内)</small>
				<div class="form-group" id="editorItem">
					<script id="editor" type="text/plain" style="height:500px;"></script>
				</div>
			 </div>
	     </div> 
	     <div class="modal-footer"> 
	      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
	      <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">添加</a>
	      <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">修改</a>
	     </div> 
	    </div> 
	   </div> 
	</div>
	<!-- 添加新的品牌：结束 -->
	</form> 
	<jsp:include page="../head/scripts.jsp"></jsp:include>
	<script>seajs.use("news/list");</script>
</body>
</html>