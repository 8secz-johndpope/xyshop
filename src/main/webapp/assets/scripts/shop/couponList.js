define(function(require) {
    require.async(['jquery', 'contabs', 'icheck'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        var alert = require('alertUtils');
        var $alert = new alert();
        require('laydate');
        require('dateformat');

        // 优惠卷使用方式
        var useMethod = null;


        /**
         * 加载表格
         */
        var table = require('tableUtils');
        var t = new table();
        var columns = [{
            field: 'number',
            title: '优惠卷编号',
            align: 'center',
        }, {
            field: 'name',
            title: '优惠卷名',
            align: 'center',
        }, {
            field: 'bearParty',
            title: '优惠额承担方',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'supplier':
                        return '商铺承担';
                    case 'operator':
                        return '官方承担';
                }
            }
        }, {
            field: 'toUser',
            title: '目标群体',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case "all":
                        return "所有用户";
                    case 'newuser':
                        return '新用户';
                    case 'olduser':
                        return '老用户';
                }
            }
        }, {
            field: 'toUserValue',
            title: '满足金额(>=)',
            align: 'center',
        }, {
            field: 'rule',
            title: '优惠卷规则',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'recoupon':
                        return '返券';
                    case 'discount':
                        return '折扣';
                    case 'fulldown':
                        return '满减';
                }
            }
        }, {
            field: 'ruleValue',
            title: '优惠卷规则值',
            align: 'center',
        }, {
            field: 'toGoods',
            title: '目标商品',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'all':
                        return '全场';
                    case 'cate':
                        return '某类型商品';
                    case 'shop':
                        return '商铺';
                }
            }
        }, {
            field: 'toGoodsValue',
            title: '目标商品值',
            align: 'center',
            formatter: function(value, row, index) {
                return row.toGoods == "all" ? "*" : row.toGoodsValueText;
            }
        }, {
            field: 'total',
            title: '优惠卷数量',
            align: 'center',
            formatter: function(value, row, index) {
                if (value == 0) {
                    return "无限制"
                }
                return value;
            }
        }, {
            field: 'userMaxNum',
            title: '领取数量限制',
            align: 'center',
        }, {
            field: 'used',
            title: '已发放(使用)',
            align: 'center',
        }, {
            field: 'startTime',
            title: '有效期起',
            align: 'center',
        }, {
            field: 'endTime',
            title: '有效期止',
            align: 'center',
            formatter: function(value, row, index) {
                return value == "forever" ? '永久有效' : value;
            }

        }, {
            field: 'useMethod',
            title: '使用方式',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'explicit':
                        return '<span class="text-success">显式使用</span>';
                    case 'implicit':

                        return '<span class="text-info">隐式使用</span>';
                }
            }
        }, {
            field: 'description',
            title: '描述',
            align: 'center',
            visible: false,
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'expired':
                        return '<span class="text-danger">已过期</span>';
                    case 'freeze':
                        return '<span class="text-danger">冻结</span>';
                    case 'online':
                        return '<span class="text-success">正常</span>';
                    case 'waitOnline':
                        return '<span class="text-warning">待上线</span>';
                }
            }
        }, {
            field: 'author',
            title: '创建人',
            align: 'center'
        }, {
            field: 'addTime',
            title: '创建时间',
            align: 'center',
            visible: false,
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                opt.push('<a class="btn btn-outline btn-danger js-freeze">' + (row.status == "freeze" ? "解冻" : "冻结") + '</a>');
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function(e, value, row, index) {
                    $("#js-update-uuid").val(row.uuid);
                    $("#js_name").val(row.name);
                    $("#desc").val(row.description);
                    $("#bear_party").val(row.bearParty);
                    $("#to_user").val(row.toUser);
                    $("#to_user_value").val(row.toUserValue);
                    $("#rule").val(row.rule);
                    $("#rule_value").val(row.ruleValue);
                    $("#to_goods").val(row.toGoods);
                    switch (row.toGoods) {
                        case 'all':
                            $("#to-good-search-panel, #to-good-selectBox").addClass("hide");
                            $("#js-togood-search").val('');
                            $("#js-togood-value").val('');
                            $("#js-to-good-select").empty();
                            break;
                        case 'cate':
                        case 'shop':
                        case 'good':
                            if (row.toGoods == "cate") {
                                $("#js-togood-sel-text").text("搜索商品分类");
                            } else if (row.toGoods == "shop") {
                                $("#js-togood-sel-text").text("搜索商铺");
                            } else {
                                $("#js-togood-sel-text").text("搜索商品");
                            }
                            $("#js-togood-search").val(row.toGoodsValueText);
                            $("#js-togood-value").val(row.toGoodsValue);
                            $("#to-good-search-panel").removeClass("hide");
                            $("#to-good-selectBox").addClass("hide");
                            break;
                    }
                    $("#js-count").val(row.total);
                    $("#js-usermax").val(row.userMaxNum);
                    $("#js-start-time").val(row.startTime);
                    $("#js-end-time").val((row.endTime == 'forever') ? '' : row.endTime);
                    $("#" + row.useMethod).iCheck('check');
                    useMethod = row.useMethod;

                    $("#js-add-btn").addClass('hide');
                    $("#js-update-btn").removeClass('hide');

                    $("#addModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-freeze': function(e, value, row, index) {
                    var text, _status;
                    if (row.status == "freeze") {
                        text = "解冻";
                        _status = "online";
                    } else {
                        text = "冻结";
                        _status = "freeze";
                    }
                    $alert._warning("确认" + text + "该优惠卷？", "", function() {

                    });
                },
                'click .js-delete': function(e, value, row, index) {
                    $alert._warning("确认删除该优惠卷？", "", function() {
                        $.post("coupon/del", {
                            key: row.uuid
                        }, function(data, textStatus, jqXHR) {
                            $alert._strSuc("优惠卷删除成功");
                            $t._refresh();
                        }, "json");
                    });
                }
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "coupon/pagelist", columns, function(p) {
            p.status = $("#js-choise-status").val();
        });
        /**
         * end
         */


        /*指定选条件，刷新列表*/
        $(".js-change-table-params").change(function(e) {
            $t._refresh();
        });


        $('#addModal').on('hidden.bs.modal', function(e) {

        });

        /*添加优惠卷*/
        $(document).on("click", "#js-add", function(e) {

            $("#js_name").val("");
            $("#desc").val("");
            $("#bear_party").val("");
            $("#to_user").val("");
            $("#to_user_value").val("");
            $("#rule").val("");
            $("#rule_value").val("");
            $("#to_goods").val("");
            $("#js-count").val("");
            $("#js-usermax").val("");
            $("#js-start-time").val("");
            $("#js-end-time").val("");
            $("input[value='explicit']").iCheck('check');

            $("#js-add-btn").removeClass('hide');
            $("#js-update-btn").addClass('hide');

            $("#addModal").modal({
                backdrop: 'static'
            });
        });


        /**
         * 有效期起止
         * @type {{elem: string, format: string, min: string, max: string, istime: boolean, istoday: boolean}}
         */
        var date = new Date();
        var startTime = {
            elem: "#js-start-time",
            format: "YYYY-MM-DD",
            min: dateFormat(date, 'isoDate'),
            max: "2099-06-16",
            istime: false,
            istoday: true,
        };
        var endTime = {
            elem: "#js-end-time",
            format: "YYYY-MM-DD",
            min: dateFormat(date, 'isoDate'),
            max: "2099-06-16",
            istime: false,
            istoday: true,
        };

        $("#js-start-time").click(function(e) {
            laydate(startTime);
        });
        $("#js-end-time").click(function(e) {
            laydate(endTime);
        });


        $("#to_user").change(function(e) {
            if ($(this).val() == "newuser") {
                $("#to_goods").children(":gt(0)").hide();
            } else {
                $("#to_goods").children(":gt(0)").show();
            }
        });


        /**
         * 优惠卷规则
         * 
         * 
         * BEGIN
         */
        $("#rule").change(function(e) {
            switch ($(this).val()) {
                case 'recoupon':
                    $("#rule-desc").text("(输入优惠卷编号)");
                    break;
                case 'discount':
                    $("#rule-desc").text("(输入折扣比例，如8.5折，输入85)");
                    break;
                case 'fulldown':
                    $("#rule-desc").text("(输入减免金额)");
                    break;
            }
        });
        /**
         * END
         */



        /**
         *  目标商品
         *  全场所有商品参加活动
         *  某一类型商品参加活动
         *  某一商铺参加优惠活动
         * 
         *  BEGIN
         */
        $("#to_goods").change(function(e) {
            switch ($(this).val()) {
                case 'all':
                    $("#to-good-search-panel, #to-good-selectBox").addClass("hide");
                    $("#js-togood-search").val('');
                    $("#js-togood-value").val('')
                    $("#js-to-good-select").empty();
                    break;
                case 'cate':
                    $("#js-togood-sel-text").text("搜索商品分类");
                    $("#to-good-search-panel").removeClass("hide");
                    $("#to-good-selectBox").addClass("hide");
                    break;
                case 'shop':
                    $("#js-togood-sel-text").text("搜索商铺");
                    $("#to-good-search-panel").removeClass("hide");
                    $("#to-good-selectBox").addClass("hide");
                    break;
            }
        });

        $("#js-cat-select-btn").click(function(e) {

            var _url, _search = $("#js-togood-search").val();

            if ($("#to_goods").val() == "cate") {
                _url = "/xyshop-supplier/shop-categroy/list";
            } else {
                _url = "/xyshop-supplier/shop/list";
            }

            var seletive = $("#js-to-good-select");

            $.post(_url, {
                name: _search
            }, function(data, textStatus, jqXHR) {
                $(seletive).empty().append('<option value="-">-</option>');
                for (var key in data) {
                    $(seletive).append('<option value="' + data[key].uuid + '">' + data[key].name + '</option>');
                }
                $("#to-good-selectBox").removeClass("hide");
            }, "json");
        });

        $("#js-to-good-sure").click(function(e) {
            $("#js-togood-search").val($("#js-to-good-select").find("option:selected").text());
            $("#js-togood-value").val($("#js-to-good-select").val());
            $("#to-good-selectBox").addClass("hide");
        });

        /**
         * END
         */



        $(document).on("click", "#js-add-btn", function(e) {

            var vernull = false;
            $("#addModal .form-group input.required").each(function(inx, item) {
                if (!$(item).val()) {
                    $alert._alert($(item).parent().children().first().text() + "不能为空");
                    vernull = true;
                    return false;
                }
            });
            if (vernull) return false;

            var _toGoodValue = $("#js-togood-value").val(),
                _tips = "";
            switch ($("#to_goods").val()) {
                case 'cate':
                    if (!_toGoodValue) {
                        _tips = "请输入商品类别";
                        vernull = true;
                    }
                    break;
                case 'shop':
                    if (!_toGoodValue) {
                        _tips = "请输入商铺名";
                        vernull = true;
                    }
                    break;
            }
            if (vernull) {
                $alert._alert(_tips);
                return false;
            }

            $.ajax({
                url: "coupon/save",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#js_name").val(),
                    description: $("#desc").val(),
                    bearParty: $("#bear_party").val(),
                    toUser: $("#to_user").val(),
                    toUserValue: $("#to_user_value").val(),
                    rule: $("#rule").val(),
                    ruleValue: $("#rule_value").val(),
                    toGoods: $("#to_goods").val(),
                    toGoodsValue: _toGoodValue,
                    total: $("#js-count").val(),
                    userMaxNum: $("#js-usermax").val(),
                    startTime: $("#js-start-time").val(),
                    endTime: $("#js-end-time").val(),
                    useMethod: useMethod
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("优惠卷添加成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("优惠卷添加失败");
                    }
                },
                error: function() {
                    $alert._alert("优惠卷添加加失败");
                }
            });
        });
        /*修改商家类别*/
        $(document).on("click", "#js-update-btn", function(e) {


            var vernull = false;
            $("#addModal .form-group input.required").each(function(inx, item) {
                if (!$(item).val()) {
                    $alert._alert($(item).parent().children().first().text() + "不能为空");
                    vernull = true;
                    return false;
                }
            });
            if (vernull) return false;

            var _toGoodValue = $("#js-togood-value").val(),
                _tips = "";
            switch ($("#to_goods").val()) {
                case 'cate':
                    if (!_toGoodValue) {
                        _tips = "请输入商品类别";
                        vernull = true;
                    }
                    break;
                case 'shop':
                    if (!_toGoodValue) {
                        _tips = "请输入商铺名";
                        vernull = true;
                    }
                    break;
            }
            if (vernull) {
                $alert._alert(_tips);
                return false;
            }


            $.ajax({
                url: "coupon/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#js-update-uuid").val(),
                    name: $("#js_name").val(),
                    description: $("#desc").val(),
                    bearParty: $("#bear_party").val(),
                    toUser: $("#to_user").val(),
                    toUserValue: $("#to_user_value").val(),
                    rule: $("#rule").val(),
                    ruleValue: $("#rule_value").val(),
                    toGoods: $("#to_goods").val(),
                    toGoodsValue: _toGoodValue,
                    total: $("#js-count").val(),
                    userMaxNum: $("#js-usermax").val(),
                    startTime: $("#js-start-time").val(),
                    endTime: $("#js-end-time").val(),
                    useMethod: useMethod
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("优惠卷修改成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("优惠卷修改失败");
                    }
                },
                error: function() {
                    $alert._alert("优惠卷修改失败");
                }
            });
        });


        /**
         * 搜索所属分类
         */
        $(document).on("click", "#js-cat-select-btn", function(e) {
            $("#js-cat-select").empty();
            $.ajax({
                url: "/xyshop-supplier/shop-categroy/list",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#cat-name").val()
                },
                async: true,
                success: function(data) {
                    for (var key in data) {
                        $("#js-cat-select").append('<option value="' + data[key].uuid + '">' + data[key].name + '</option>');
                    }
                    $("#cat-selectBox").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-cat-sure", function(e) {
            $("#cat-selectBox").addClass('hide');
            $("#cat-uuid").val($("#js-cat-select").val().split('-')[0]);
            $("#cat-name").val($("#js-cat-select").find("option:selected").text());
        });



        $('input.radio').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%' // optional
        }).on("ifChecked", function(event) {
            useMethod = $(event.target).val();
            console.log(useMethod);
        });
    });
});