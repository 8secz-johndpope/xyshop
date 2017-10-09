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
	        height: 40px;
	    }
    </style>
</head>

<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
                <div id="toolbar" class="btn-group">
                    <label style="padding-left: 10px;">用户状态:</label>
                    <select class="form-control js-change-table-params" id="js-choise-role" style="width: 150px;display: inline-block;">
                        <option value="" selected="selected">全部</option>
                        <option value="online">正常</option>
                        <option value="offline">冻结</option>
                    </select>
                    <label>注册时间</label>
                    <input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-begin" placeholder="开始时间">
                    <input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-date-end" placeholder="结束时间">
                </div>
                <table id="table"></table>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="userAuth" tabindex="-1" role="dialog" aria-labelledby="userAuthLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">会员实名认证</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="updateuuid" />
                    <div class="form-group">
                        <label>真实姓名：</label>
                        <b class="realName"></b>
                    </div>
                    <div class="form-group">
                        <label>身份证号码：</label>
                        <b class="idcord"></b>
                    </div>
                    <div class="form-group">
                        <label>身份证附件照：</label>
                        <br>
                        <img src="" alt="" class="idcordup" style="width: 400px; height: 240px;">
                        <img src="" alt="" class="idcordown" style="width: 400px; height: 240px;">
                    </div>
                    <div class="form-group authinfo">
                        
                    </div>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <jsp:include page="../head/scripts.jsp"></jsp:include>
    <script>
    	seajs.use("user/userList");
    </script>
</body>
</html>