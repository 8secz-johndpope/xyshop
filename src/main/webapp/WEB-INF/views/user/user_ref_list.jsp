<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
	<base href="<%=basePath%>">
    <title>管理后台 - 用户管理</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/layerDate.jsp"></jsp:include>
    <style>
		.js-img-open {
			height:40px;
		}
	</style>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
		            <div id="toolbar" class="btn-group">
             	<label style="padding-left: 10px;">用户身份:</label>
             	<select class="form-control js-change-table-params" id="js-choise-role" style="width: 150px;display: inline-block;">
             		<option value="" selected="selected">全部</option>
             		<option value="bronze">铜牌用户</option>
             		<option value="silver">银牌用户</option>
             		<option value="gold">金牌用户</option>
             	</select>
             	<label>注册时间</label>
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"   id="js-date-begin" placeholder="开始时间">
				<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;"  id="js-date-end" placeholder="结束时间"> 
             	
					</div>
	                <table id="table"></table>
            </div>
        </div>
    </div>
    
<!-- 添加新的品牌：开始 -->
<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> 
   <div class="modal-dialog"> 
    <div class="modal-content"> 
     <div class="modal-header"> 
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> 
      <h4 class="modal-title" id="myModalLabel">修改会员上下级隶属关系</h4> 
     </div> 
     <div class="modal-body">
     <input type="hidden" id="js-update-uuid">
	    <div class="form-group">
			<label style="width: 100px;">选择新的推举人</label>
			<input class="form-control" style="width: 55%;display: inline-block;" id="user-name" placeholder="会员名字,认证名字,手机号,ID"> 
			<input class="hide" id="user-uuid"> 
		 	<span style="width: 20%;float: right;"  class="btn  btn-info" id="js-user-select-btn">搜索</span>
		</div>
		<div class="form-group hide" id="user-selectBox">
			<label style="width: 100px;"></label>
			<select class="form-control" style="width: 56%;display: inline-block;" id="js-user-select">
			</select>
			<span class="btn btn-outline btn-primary"  id="js-user-sure" style="float: right;">确定</span>
		</div>
     </div> 
     <div class="modal-footer"> 
      <a type="button" class="btn btn-outline btn-default"  data-dismiss="modal">取消</a> 
      <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">修改</a>
     </div> 
    </div> 
   </div> 
</div>
<!-- 添加新的品牌：结束 -->
    
<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>seajs.use("user/userRefList");</script>
</body>
</html>
