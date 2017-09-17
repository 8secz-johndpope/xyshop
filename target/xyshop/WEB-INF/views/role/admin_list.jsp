<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>管理后台 - 帐号管理</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
        </head>

        <body class="gray-bg">
            <div class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-sm-12">
                        <div id="toolbar" class="btn-group">
                            <!-- 工具菜单 -->
                            <a class="btn btn-outline btn-success js-add">添加</a>
                        </div>
                        <table id="table"></table>
                    </div>
                </div>
            </div>
            <form>
                <!--  添加帐号 -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">添加新的账号</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>账号名字</label>
                                    <input class="form-control required" placeholder="账号名字" id="js-admin-name">
                                </div>
                                <div class="form-group">
                                    <label>登录帐号</label>
                                    <input class="form-control" placeholder="登录帐号" id="js-admin-phone">
                                </div>
                                <div class="form-group">
                                    <label>账号登录密码</label>
                                    <input class="form-control" placeholder="账号登录密码" id="js-admin-password">
                                </div>
                                <div class="form-group">
                                    <label>选择账号角色</label>
                                    <select class="form-control js-role" style="width: 56%;display: inline-block;" id="js-admin-role">
			</select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                                <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">确定</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.添加帐号 -->

                <!--  修改帐号 -->
                <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">修改账号信息</h4>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" id="js-uuid">
                                <div class="form-group">
                                    <label>账号名字</label>
                                    <input class="form-control" placeholder="账号名字" id="js-admin-name-u">
                                </div>
                                <div class="form-group">
                                    <label>登录帐号</label>
                                    <input class="form-control" placeholder="登录帐号" id="js-admin-phone-u">
                                </div>
                                <div class="form-group">
                                    <label>选择账号帐号</label>
                                    <select class="form-control js-role" style="width: 56%;display: inline-block;" id="js-admin-role-u">
			</select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                                <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">修改</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.修改帐号 -->
                <!--  删除帐号-->
                <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">删除帐号</h4>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" id="js-delete-uuid">
                                <div class="form-group">
                                    <label>帐号名字:<span id="js-delete-name"></span></label>
                                </div>
                                <h3>确认删除该帐号？</h3>
                            </div>
                            <div class="modal-footer">
                                <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                                <a type="button" id="js-delete-btn" class="btn btn-outline btn-primary">确定</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.删除帐号 -->

                <!-- 重置密码 -->
                <div class="modal fade" id="resetModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">重置登录密码</h4>
                            </div>
                            <div class="modal-body">
                                <input type="hidden" id="js-reset-uuid">
                                <div class="form-group">
                                    <label>输入新密码</label>
                                    <input class="form-control" id="js-new-pwd" placeholder="新密码">
                                </div>
                                <div class="form-group">
                                    <label>再次输入新密码</label>
                                    <input class="form-control" id="js-replace-pwd" placeholder="再次输入新密码">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                                <a type="button" id="js-reset-btn" class="btn btn-outline btn-primary">确定</a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- /. 重置密码-->
            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
                seajs.use("role/adminList");
            </script>
        </body>

        </html>