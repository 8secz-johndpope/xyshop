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
                    <h2>商家结算信息修改</h2>
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
            <!--店铺修改:开始 -->
            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                            <h4 class="modal-title" id="myModalLabel">修改店铺结算信息(银行卡帐号不能都为空)</h4>
                        </div>
                        <div class="modal-body">
                            <input type="hidden" id="js-update-uuid">
                            <!-- <div class="form-group">
                                <label>支付宝帐号</label>
                                <input class="form-control required" id="js-update-alipay" placeholder="支付宝提现帐号">
                            </div>
                            <div class="form-group">
                                <label>绑定的支付宝提现账户名，用于转账校验</label>
                                <input class="form-control required" id="js-update-alipayName" placeholder="绑定的支付宝提现账户名，用于转账校验">
                            </div> -->
                            <input type="hidden" id="js-update-uuid">
                            <input type="hidden" id="js-update-old-cartId">
                            <input type="hidden" id="js-update-old-username">
                            <input type="hidden" id="js-update-old-cartName">
                            <input type="hidden" id="js-update-shopname">
                            <div class="form-group">
                                <label>银行卡帐号</label>
                                <input class="form-control required" id="js-update-cartId" placeholder="银行卡帐号">
                            </div>
                            <div class="form-group">
                                <label>卡主姓名</label>
                                <input class="form-control required" id="js-update-username" placeholder="卡主姓名">
                            </div>
                            <div class="form-group">
                                <label>银行卡所在银行</label>
                                <input class="form-control required" id="js-update-cartName" placeholder="银行卡所在银行">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                            <a type="button" id="js-update-btn" class="btn btn-outline btn-primary">提交</a>
                        </div>
                    </div>
                </div>
            </div>
            <!--店铺修改:结束 -->
            <jsp:include page="../head/scripts.jsp"></jsp:include>
            <script>
            seajs.use("shop/clearing");
            </script>
        </body>

        </html>
