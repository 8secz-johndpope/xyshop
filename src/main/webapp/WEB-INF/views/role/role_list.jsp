<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <title>管理后台 - 角色管理</title>
            <jsp:include page="../head/baseHead.jsp"></jsp:include>
            <jsp:include page="../head/tableCss.jsp"></jsp:include>
            <jsp:include page="../head/ztreeCss.jsp"></jsp:include>
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
            <!--  添加角色 -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">添加新的角色</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="js-uuid">
                            <div class="form-group">
                                <label>角色名字</label>
                                <input class="form-control" placeholder="角色名字" id="js-role-name">
                            </div>
                            <div class="form-group">
                                <label>角色描述</label>
                                <textarea class="form-control" placeholder="角色描述" id="js-role-description"></textarea>
                            </div>
                            <div class="form-group">
                                <label>选择角色权限</label>
                                <div>
                                    <ul id="ztreeMenu" class="ztree"></ul>
                                </div>
                                <!-- <label class="radio-inline" id="checkBox-list">
                                </label> -->
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a type="button" id="js-modal-cancel" class="btn btn-outline btn-default">取消</a>
                            <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">确定</a>
                            <a type="button" id="js-update-btn" class="btn btn-outline btn-primary hide">修改</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.添加角色 -->
            <!--  删除角色 -->
            <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">删除角色</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="js-delete-uuid">
                            <div class="form-group">
                                <label>角色名字:<span id="js-delete-name"></span></label>
                            </div>
                            <h3>确认删除该角色和与该角色相关联的的所有帐号？</h3>
                        </div>
                        <div class="modal-footer">
                            <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                            <a type="button" id="js-delete-btn" class="btn btn-outline btn-primary">确定</a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.添加角色 -->
            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
                seajs.use("role/roleList");
            </script>
        </body>

        </html>