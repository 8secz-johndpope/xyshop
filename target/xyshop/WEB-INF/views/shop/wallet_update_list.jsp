<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>XXXX.管理后台 - 店铺结算信息修改审核界面</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
            <jsp:include page="../head/uploadCss.jsp"></jsp:include>
            <style type="text/css">
                .js-img-open {
                    margin: 10px;
                }
            </style>
        </head>

        <body class="gray-bg">
            <input type="hidden" id="actioner" value="${adminUuid }">
            <input type="hidden" id="actionern" value="${adminName }">
            <div class="row wrapper border-bottom white-bg page-heading">
                <div class="col-sm-4">
                    <h2>商家结算信息修改审核</h2>
                </div>
            </div>
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-sm-12">
                        <div id="toolbar" class="btn-group">
                            <label>修改申请审核列表</label>
                        </div>
                        <table id="table"></table>
                    </div>
                </div>
            </div>
            <!-- Modal -->
            <div class="modal fade" id="failModal" tabindex="-1" role="dialog" aria-labelledby="walletLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">驳回</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="wallet-uuid" />
                            <div class="form-group">
                                <label style="float:left;line-height:100px">驳回理由：</label>
                                <textarea style="float: left; height: 100px; width: 80%;  resize: none;" id="failReason"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer" style="margin-top: 80px;">
                            <a type="button" class="btn btn-outline btn-danger" data-dismiss="modal">取消</a>
                            <a type="button" class="btn btn-outline btn-primary walletAction">确定</a>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
                seajs.use("shop/walletUpdateList");
            </script>
        </body>

        </html>