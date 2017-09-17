<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html>
<html>

<head>
    <base href="<%=basePath%>">
    <title>管理后台 - 优惠卷界面</title>
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

        small {
            margin-left: 10px;
            color: indianred;
        }
    </style>
</head>

<body class="gray-bg">
<div class="row wrapper border-bottom white-bg page-heading">
    <div class="col-sm-4">
        <h2>优惠卷管理界面</h2>
    </div>
</div>
<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-sm-12">
            <div id="toolbar" class="btn-group">
                <a type="button" id="js-add" class="btn btn-outline btn-primary">添加优惠卷</a>
                <label>优惠卷状态</label>
                <select class="form-control js-change-table-params" id="js-choise-status"
                        style="width: 100px;display: inline-block;">
                    <option value="" selected="selected">全部</option>
                    <option value="online">正常</option>
                    <option value="waitOnline">待上线</option>
                    <option value="freeze">冻结</option>
                    <option value="expired">已过期</option>
                </select>
            </div>
            <table id="table"></table>
        </div>
    </div>
</div>
<form>
    <!-- 添加新的优惠卷 ：开始-->
    <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">添加/修改优惠卷</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="js-update-uuid"/>
                    <div class="form-group">
                        <label>优惠卷名称</label>
                        <input class="form-control required js-init" id="js_name" placeholder="优惠卷名称">
                    </div>
                    <div class="form-group">
                        <label>描述</label>
                        <textarea class="form-control" id="desc" style="resize: none;" placeholder="输入优惠卷描述，可以不填"></textarea>
                    </div>
                    <div class="form-group">
                        <label>承担方</label>
                        <select class="form-control" name="bear_party" id="bear_party">
                            <option value="operator">官方</option>
                            <option value="supplier">商家</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>目标群体</label>
                        <div style="display: block;">
                            <select class="form-control" name="to_user" id="to_user">
                                <option value="newuser">新用户</option>
                                <option value="olduser">老用户</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>消费金额</label><small>(消费 >= 一定条件, 参数为0 代表无任何条件限制)</small>
                        <input type="number" step="0.01" class="form-control required" id="to_user_value" value="" placeholder="输入消费金额">
                    </div>

                    <div class="form-group" >
                        <label>优惠卷规则</label>
                        <div style="display: block;">
                            <select class="form-control" name="rule" id="rule">
                                <option selected value="recoupon">返券</option>
                                <option value="discount">折扣</option>
                                <option value="fulldown">满减</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>优惠卷规则值</label><small id="rule-desc">(输入优惠卷编号)</small>
                        <input class="form-control required" id="rule_value" value="" placeholder="优惠卷规则值">
                    </div>

                    <div class="form-group">
                        <label>目标商品</label>
                        <div style="display: block;">
                            <select class="form-control" name="rule" id="to_goods">
                                <option selected value="all">全场</option>
                                <option value="cate">某类型商品</option>
                                <option value="shop">商铺</option>
                            </select>
                        </div>
                    </div>
                    <!-- 选择分类：开始 -->
                    <div class="form-group hide" id="to-good-search-panel">
                        <label style="width: 100px;" id="js-togood-sel-text"></label>
                        <input class="form-control js-init" style="width: 55%;display: inline-block;" id="js-togood-search"
                               placeholder="">
                        <input class="hide js-init" id="js-togood-value">
                        <span style="width: 20%;float: right;" class="btn  btn-info" id="js-cat-select-btn">搜索</span>
                    </div>
                    <div class="form-group hide" id="to-good-selectBox">
                        <label style="width: 100px;"></label>
                        <select class="form-control" style="width: 56%;display: inline-block;" id="js-to-good-select">
                        </select>
                        <span class="btn btn-outline btn-primary" id="js-to-good-sure" style="float: right;">确定</span>
                    </div>

                    <div class="form-group">
                        <label>优惠卷数量</label>
                        <input type="number" min="1" step="1" class="form-control required" id="js-count" placeholder="优惠卷数量">
                    </div>

                    <div class="form-group">
                        <label>有效期起</label>
                        <input class="form-control js-init" id="js-start-time" placeholder="有效期起">
                    </div>
                    <div class="form-group">
                        <label>有效期止</label>
                        <input class="form-control js-init" id="js-end-time" placeholder="有效期止">
                    </div>
                    <div class="form-group">
                        <label>使用方式</label>
                        <label class="radio-inline">
                        <input class="radio" type="radio" name="use-method" checked="checked" id="explicit" value="explicit" />
                        <label for="explicit">显式使用 <small>(满足一定条件自动赠送优惠卷，用户主动选择使用)</small></label>
                        <br>
                        <input class="radio" type="radio" name="use-method" id="implicit" value="implicit" />
                        <label for="implicit">隐式使用 <small>(系统自动使用，可用于发放优惠卷等)</small></label>
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
    <!-- 添加新的优惠卷：结束  -->
</form>

<jsp:include page="../head/scripts.jsp"></jsp:include>
<script>
    seajs.use("shop/couponList");
</script>
</body>

</html>