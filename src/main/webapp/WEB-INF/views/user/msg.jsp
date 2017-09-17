<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@page import="com.mx.home.utils.Config"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html>
<head>
    <base href="<%=basePath%>">
    <title>管理后台 - 给指定会员发送模板消息</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/layerDate.jsp"></jsp:include>
    <style>
    .js-img-open {
        height: 40px;
    }
    #toolTipLayer img {
        width: 550px;
    }
    </style>
</head>
<body class="gray-bg">
    <div class="wrapper wrapper-content">
        <div class="row">
            <div class="col-sm-12">
                <div id="toolbar" class="btn-group">
                    <label style="padding-left: 10px;">用户身份:</label>
                    <select class="form-control js-change-table-params" id="js-choise-status" style="width: 150px;display: inline-block;">
                        <option value="review" selected="selected">待审核</option>
                        <option value="pass">已通过</option>
                        <option value="refuse">已拒绝</option>
                    </select>
                </div>
                <table id="table"></table>
                <input id="wx_domain" type="hidden" value="<%=Config.WX_DOMAIN%>" />
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="failModal" tabindex="-1" role="dialog" aria-labelledby="userAuthLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">拒绝</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="cmt-uuid" />
                    <div class="form-group">
                        <label style="float:left;line-height:100px">拒绝理由：</label>
                        <textarea style="float: left; height: 100px; width: 80%;  resize: none;" id="failReason"></textarea>
                    </div>
                </div>
                <div class="modal-footer" style="margin-top: 80px;">
                    <a type="button" class="btn btn-outline btn-danger" data-dismiss="modal">取消</a>
                    <a type="button" class="btn btn-outline btn-primary cmt-trundown">确定</a>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <jsp:include page="../head/scripts.jsp"></jsp:include>
    <script>
    	seajs.use("user/msg");
    </script>
</body>
</html>