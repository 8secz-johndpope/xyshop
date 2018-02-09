<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>

<head>
    <base href="<%=basePath%>">
    <title>管理后台 - 商家管理界面</title>
    <jsp:include page="../head/baseHead.jsp"></jsp:include>
    <jsp:include page="../head/tableCss.jsp"></jsp:include>
    <jsp:include page="../head/uploadCss.jsp"></jsp:include>
    <style type="text/css">
        .js-img-open {
            margin: 10px;
            height: 48px;
        }

        .expmpleBox img {
            width: 100px;
        }

        #tip {
            width: 180px;
            background-color: #1ab394;
            color: #333;
            border: 1px solid silver;
            box-shadow: 3px 4px 3px 0px silver;
            position: absolute;
            /* top: 43.6%; */
            margin-top: -305px;
            right: 50px;
            border-radius: 5px;
            overflow: hidden;
            line-height: 20px;
        }

        #tip input[type="text"] {
            height: 25px;
            border: 0;
            padding-left: 5px;
            width: 90%;
            margin: 0px 5%;
            border-radius: 3px;
            outline: none;
        }

        .amap-sug-result {
                z-index: 2060!important;
        }
    </style>
</head>

<body class="gray-bg">
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
                <a type="button" id="js-add" class="btn btn-outline btn-primary">添加新的商家</a>
                <label>商家状态</label>
                <select class="form-control js-change-table-params" id="js-choise-status"
                        style="width: 100px;display: inline-block;">
                    <option value="" selected="selected">全部</option>
                    <option value="online">正常</option>
                    <option value="freeze">已冻结</option>
                </select>
            </div>
            <table id="table"></table>
        </div>
    </div>
</div>
<form>
    <!-- 添加新的商家 ：开始-->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">添加/修改商家</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="js-update-uuid"/>
                    <div class="form-group">
                        <label>商家缩略图</label>
                        <small>(430*430像素的图片展示效果最佳)</small>
                        <div class="js-thumbimg-show"></div>
                        <div class="js-thumbimg-up">上传商家缩略图</div>
                    </div>
                    <div class="form-group">
                        <label>更多商家图片</label>
                        <small>(470*285像素的图片展示效果最佳)</small>
                        <div class="js-moreimg-show"></div>
                        <div class="js-moreimg-up">上传商家更多图</div>
                        <span style="position: absolute; margin-top: -30px; left: 160px; color: chocolate;">(点击图片即可删除)</span>
                    </div>
                    <div class="form-group">
                        <label>名称</label>
                        <input class="form-control required js-init" id="js-add-name" placeholder="商家名称">
                    </div>
                    <div class="form-group">
                        <label>店里手机</label>
                        <input class="form-control required js-init" id="js-add-shopphone" placeholder="店里手机">
                    </div>
                    <div class="form-group">
                        <label>店长手机(后台登录账户)</label>
                        <input class="form-control required js-init" id="js-add-ownerphone" placeholder="店长手机">
                    </div>
                    <div class="form-group" id="whole-scale">
                        <label>结算比例</label>
                        <div style="display: block;">
                            <input class="form-control required js-init" id="js-add-scale" placeholder="结算比例">
                            <!-- <span style="display: inline-block;">%</span> -->
                        </div>
                    </div>
                    <div class="form-group" id="whole-scale">
                        <label>合同到期日期</label>
                        <div style="display: block;">
                            <input class="form-control required js-init" id="js-add-endTime" placeholder="合同到期日期">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>所在地区</label>
                        <div style="display: block;">
                            <select class="form-control required js-pro" id="js-add-pro"
                                    style="width:31%;display: inline-block;" placeholder="省">
                                <option value="-" selected="selected">-</option>
                            </select>
                            <select class="form-control required js-city" id="js-add-city"
                                    style="width:31%;display: inline-block;" placeholder="市">
                                <option value="-">-</option>
                            </select>
                            <select class="form-control required js-area" id="js-add-area"
                                    style="width:31%;display: inline-block;" placeholder="县">
                                <option value="-">-</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>商家地址</label>
                        <input class="form-control required js-init" id="js-add-address" placeholder="商家地址">
                    </div>
                    <div class="form-group">
                        <label>经纬度</label>
                        <input class="form-control required js-init" id="js-add-jingweidu" placeholder="经纬度">
                    </div>
                    <div class="form-group">
                        <div id="allmap" style="width:95%;height:300px;border: 1px solid #CCCFD3;margin: 10px"></div>
                        <div id="tip">
                            <input type="text" id="keyword" name="keyword" placeholder="请输入关键字：(选定后搜索)"/>
                        </div>
                    </div>

                    <!-- 选择分类：开始 -->
                    <div class="form-group">
                        <label style="width: 100px;">选择所属分类</label>
                        <input class="form-control js-init" style="width: 55%;display: inline-block;" id="cat-name"
                               placeholder="输入分类名字,点击搜索进行选择">
                        <input class="hide js-init" id="cat-uuid">
                        <span style="width: 20%;float: right;" class="btn  btn-info" id="js-cat-select-btn">搜索</span>
                    </div>
                    <div class="form-group hide" id="cat-selectBox">
                        <label style="width: 100px;"></label>
                        <select class="form-control" style="width: 56%;display: inline-block;" id="js-cat-select">
                        </select>
                        <span class="btn btn-outline btn-primary" id="js-cat-sure" style="float: right;">确定</span>
                    </div>
                    <!-- 选择分类：结束 -->
                    <div class="form-group">
                        <label>商户详情 </label>
                        <small>(上传图片大小最好在2M以内)</small>
                        <div class="form-group" id="editorItem">
                            <script id="editor" type="text/plain" style="height:500px;"></script>
                        </div>
                    </div>
                    <div class="form-group">
                        <p><label style="color: red;">商铺密码默认为 000000</label></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <a type="button" class="btn btn-outline btn-default" data-dismiss="modal">取消</a>
                    <a type="button" id="js-add-btn" class="btn btn-outline btn-primary">添加</a>
                    <a type="button" id="js-update-btn" class="btn btn-outline btn-primary hide">修改</a>
                </div>
            </div>
        </div>
    </div>
    <!-- 添加新的商家：结束  -->
</form>

<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>
    seajs.use("shop/shopList");
</script>
</body>

</html>