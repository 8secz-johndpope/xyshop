<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商品类型列表界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<style type="text/css">
		.label{
			margin: 10px;
		}
		.js-img-open {
			height:48px;
		}
	</style>
</head>
<body class="gray-bg">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2>商品分类管理</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
             	<a type="button" id="js-add" class="btn btn-outline btn-primary">添加商品分类</a> 
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
      <h4 class="modal-title" id="myModalLabel">添加一级商品分类</h4> 
     </div> 
     <div class="modal-body">
     <input type="hidden" id="js-update-uuid">
     	 <div class="form-group">
		 	<label>分类图片</label><small></small> 
		 	<div id="js-add-img-show"></div>
		 	<div id="js-add-img-up">上传分类图片</div>
		 </div>
	     <div class="form-group">
			<label>分类名称</label>
			<input class="form-control required" id="js-add-name" placeholder="商品分类名称">
		 </div>
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
      <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">添加</a>
     </div> 
    </div> 
   </div> 
  </div> 
<!-- /.modal -->    
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
      <h4 class="modal-title" id="myModalLabel">修改一级分类</h4> 
     </div> 
     <div class="modal-body">
     	<input type="hidden" id="js-update-catId" />
     	 <div class="form-group">
		 	<label>分类图片</label><small></small> 
		 	<div id="js-update-img-show"></div>
		 	<div id="js-update-img-up">修改分类图片</div>
		 </div>
	     <div class="form-group">
			<label>分类名称</label>
			<input class="form-control required" id="js-update-name" placeholder="商品分类名称">
		 </div>
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
      <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">修改</a>
     </div> 
    </div> 
   </div> 
</div> 
<!-- /.modal --> 
</form> 
    
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("goods/categroy");</script>
</body>
</html>
