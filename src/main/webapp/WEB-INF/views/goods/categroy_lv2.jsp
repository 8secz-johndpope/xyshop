<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 商品分类列表界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
	<jsp:include page="../head/tableCss.jsp"></jsp:include>
	<jsp:include page="../head/uploadCss.jsp"></jsp:include>
	<style type="text/css">
		.label{
			margin: 10px;
			display: inline-block;
		}
		.js-img-open {
			height:48px;
		}
	</style>
</head>

<body class="gray-bg">
<input type="hidden" id="js-parent-catId" value="${catId}">
	<div class="row wrapper border-bottom white-bg page-heading">
        <div class="col-sm-4">
            <h2><span id="cate-name">${catName }</span>->二级商品分类管理</h2>
        </div>
    </div>
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
             	<a type="button" id="js-add" class="btn btn-outline btn-primary">添加二级商品分类</a> 
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
      <h4 class="modal-title" id="myModalLabel">添加二级商品分类</h4> 
     </div> 
     <div class="modal-body">
     	 <div class="form-group">
		 	<label>分类图片</label><small></small> 
		 	<div id="js-add-img-show"></div>
		 	<div id="js-add-img-up">上传分类图片</div>
		 </div>
	     <div class="form-group">
			<label>分类名称</label>
			<input class="form-control required" id="js-add-name" placeholder="商品分类名称">
		 </div>
		 <div class="form-group">
			<label>分类属性</label><small>点击属性进行删除操作</small> 
			<br>
			<div id="js-add-attr-box">
			</div>
			<br>
			<div class="btn btn-outline btn-sm btn-primary" id="js-add-attr-btn">添加属性</div>
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
      <h4 class="modal-title" id="myModalLabel">修改二级分类</h4> 
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
		 <div class="form-group">
			<label>分类属性</label><small>(点击属性进行删除修改操作)</small> 
			<br>
			<div id="js-update-attr-box">
			</div>
			<br>
			<div class="btn btn-outline btn-sm btn-primary" id="js-update-attr-btn">添加属性</div>
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
<!-- 添加商品分类属性:开始 --> 
<div class="modal fade" id="addAttrModal" style="top:20px"  tabindex="0" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog modal-sm"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
      <h4 class="modal-title" id="myModalLabel">添加/修改商品分类属性</h4> 
     </div> 
     <div class="modal-body">
     	<input type="hidden" id='js-attr-inp'>
     	<input type="hidden" id='js-attr-uuid'>
	    <div class="form-group">
			<label>属性名称</label>
			<input class="form-control required" id="js-attr-name" placeholder="分类属性">
		</div>
		<div class="form-group">		
			<label>属性描述</label>
			<textarea  class="form-control required" id="js-attr-des" placeholder="属性描述"></textarea>
		</div>
		<div id="opt-box">
		</div>
		<a class="btn btn-outline btn-sm btn-primary" id="js-add-attr-option">添加可选项</a>
		
		
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a>
      <a type="button" id="js-del-attr-btn" class="btn btn-outline btn-danger hide">删除</a> 
      <a type="button" id="js-save-attr-btn" class="btn btn-outline btn-primary">确定</a>
     </div> 
    </div> 
   </div> 
</div> 
<!-- 添加商品分类属性:结束 -->
</form> 
    
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("goods/categroy_lv2");</script>
</body>
</html>
