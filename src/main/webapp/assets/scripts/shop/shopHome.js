define(function(require) {
    require.async(['jquery', 'contabs'], function() {
        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        require("imgTip");
        var alert = require('alertUtils')
        var $alert = new alert();
        var upload = require('uploadUtils');
        var $upload = new upload(),
            $upload2 = new upload();
        var table = require('tableUtils');
        var t = new table();
        var columns = [{
            field: 'name',
            title: '商家名字',
            align: 'center',
        }, {
            field: 'shopPhone',
            title: '店里电话',
            align: 'center',
        }, {
            field: 'ownerPhone',
            title: '店长手机',
            align: 'center',
        }, {
            field: 'address',
            title: '门店地址',
            align: 'center',
        }, {
            field: 'thumbImg',
            title: '门店缩略图',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img  class='js-img-open' style='width: 100px;' data-value='" + value + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + value + "?x-oss-process=image/resize,w_200'/>";
                } else
                    return "-"
            },
        }, {
            field: 'longitude',
            title: '经纬度',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "," + row.latitude;
            },
        }, {
            field: 'role',
            title: '角色',
            align: 'center',
            formatter: function(value, row, index) {
                if (value == 'supplier') {
                    return '供应商';
                } else if (value = 'union') {
                    return '商家';
                }
                return '-';
            },
        }, {
            field: 'shopCatName',
            title: '商户所属分类',
            align: 'center',
        }, {
            field: 'areaname',
            title: '所在地区',
            align: 'center',
        }, {
            field: 'addTime',
            title: '添加时间',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                //                	opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                //                	opt.push('<a class="btn btn-outline btn-danger js-delete">冻结</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function(e, value, row, index) {
                    $("#js-update-uuid").val(row.uuid);
                    $("#js-update-name").val(row.name);
                    $("#js-update-shopphone").val(row.shopPhone);
                    $("#js-update-ownerphone").val(row.ownerPhone);
                    var areasArray = row.areaid.split(',');
                    $("#js-update-pro").val(areasArray[0]);
                    $.ajax({
                        url: "/shop-supplier/area/ajax/citylist",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        type: "post",
                        dataType: "json",
                        data: {
                            provinceid: areasArray[0]
                        },
                        async: true,
                        success: function(data) {
                            $(".js-city").html('');
                            $(".js-city").append('<option value="-">-</option>');
                            for (var key in data) {
                                $(".js-city").append('<option value="' + key + '">' + data[key] + '</option>');
                            }
                            $("#js-update-city").val(areasArray[1]);
                            $.ajax({
                                url: "/shop-supplier/area/ajax/areaslist",
                                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                type: "post",
                                dataType: "json",
                                data: {
                                    cityid: areasArray[1]
                                },
                                async: true,
                                success: function(data) {
                                    $(".js-area").html('');
                                    $(".js-area").append('<option value="-">-</option>');
                                    for (var key in data) {
                                        $(".js-area").append('<option value="' + key + '">' + data[key] + '</option>');
                                    }
                                    $("#js-update-area").val(areasArray[2]);
                                },
                                error: function() {
                                    $alert._alert("县列表加载失败");
                                }
                            });
                        },
                        error: function() {
                            $alert._alert("城市列表加载失败");
                        }
                    });
                    $("#js-update-address").val(row.address);
                    $("#js-update-jingweidu").val(row.longitude + "," + row.latitude);
                    $("#js-update-role").val(row.role);
                    $("#cat-name-update").val(row.shopCatName);
                    $("#cat-uuid-update").val(row.shopCatId);
                    $(".js-update-thumbimg-show").html("<div class='expmpleBox'><img id='js-update-thumb-img'  data-value='" + row.thumbImg + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + row.thumbImg + "?x-oss-process=image/resize,w_200'/></div>");
                    $(".js-update-moreimg-show").html(imgUpStr(row.moreImg));
                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-delete': function(e, value, row, index) {
                    $alert._warning("确认冻结该商家？", "该操作将冻结商家:\"" + row.name + "\"", function() {
                        $.ajax({
                            url: "/shop-supplier/shop/ajax/del",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                            },
                            async: true,
                            success: function(data) {
                                $alert._strSuc("商家冻结成功");
                                $t._refresh();
                            },
                            error: function() {
                                $alert._alert("操作失败");
                            }
                        });

                    });
                },
            },
        }];
        var $t = t._init("table", "/shop-supplier/shop/ajax/shopInfo", columns, function(d) {
            d.shopUuid = $('#js-shop-uuid').val();
        });

        var imgUpStr = function(src, index) {
            if ($common._noEmpty(src)) {
                if (src.indexOf('#') > 0) {
                    var imglist = src.split("#"),
                        temp = [];
                    for (var int = 0; int < imglist.length; int++) {
                        temp.push("<img class='js-img-open js-update-more-img' data-value='" + imglist[int] + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/s" + imglist[int] + "?x-oss-process=image/resize,w_200'/>");
                    }
                    return temp.join(' ');
                } else {
                    return "<img class='js-img-open js-update-more-img' data-value='" + src + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + src + "?x-oss-process=image/resize,w_200'/>";
                }
            } else
                return "-";
        };

        var imgThumbUP = null,
            imgMoreUP = null;
        $('#addModal,#updateModal').on('shown.bs.modal', function(e) {
            var id;
            switch ($(this).context.id) {
                case 'addModal':
                    id = "js-add";
                    break;
                case 'updateModal':
                    id = "js-update";
                    break;
            }
            imgThumbUP = $upload._init(imgThumbUP, '.js-thumbimg-up', function(file, response) {
                $("." + id + "-thumbimg-show").html("<div class='expmpleBox'><img  id='" + id + "-thumb-img'  data-value='" + response.url + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + response.url + "?x-oss-process=image/resize,w_200'/></div>");
            });
            imgMoreUP = $upload2._init(imgMoreUP, '.js-moreimg-up', function(file, response) {
                $("." + id + "-moreimg-show").append("<div class='expmpleBox'><img  class='" + id + "-more-img'  data-value='" + response.url + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + response.url + "?x-oss-process=image/resize,w_200'/></div>");
            });
        });
        /*修改商家类别*/
        $(document).on("click", "#js-update-btn", function(e) {
            var pro = $('#js-update-pro').val(),
                city = $('#js-update-city').val(),
                area = $('#js-update-area').val();
            var catId = $('#cat-uuid-update').val(),
                ownerPhone = $('#js-update-ownerphone').val(),
                shopPhone = $('#js-update-shopphone').val();
            if (!$common._noEmpty(shopPhone)) {
                $alert._alert("店里手机号不能为空");
                return;
            }
            if (shopPhone.length != 11) {
                $alert._alert("店里手机号格式错误");
                return;
            }
            if (!$common._noEmpty(ownerPhone)) {
                $alert._alert("店长手机号不能为空");
                return;
            }
            if (ownerPhone.length != 11) {
                $alert._alert("店长手机号格式错误");
                return;
            }
            if (!$common._noEmpty(pro) || pro == '-') { $alert._alert("省份不能为空");
                return; }
            if (!$common._noEmpty(city) || city == '-') { $alert._alert("城市不能为空");
                return; }
            if (!$common._noEmpty(area) || area == '-') { $alert._alert("区县不能为空");
                return; }
            if (!$common._noEmpty(catId)) {
                $alert._alert("所属分类不能为空");
                return;
            }
            var areasid = pro + "," + city + "," + area;
            var imgstr = "";
            $(".js-update-more-img").each(function(d) {
                imgstr = imgstr + "#" + $(this).data('value');
            });
            if (imgstr == "") { imgstr = "#" }
            $.ajax({
                url: "/shop-supplier/shop/ajax/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#js-update-name").val(),
                    shopPhone: shopPhone,
                    ownerPhone: ownerPhone,
                    address: $('#js-update-address').val(),
                    thumbImg: $('#js-update-thumb-img').data('value'),
                    moreImg: imgstr.substring(1),
                    jingweidu: $('#js-update-jingweidu').val(),
                    role: $('#js-update-role').val(),
                    catId: $('#cat-uuid-update').val(),
                    catName: $('#cat-name-update').val(),
                    areaId: areasid,
                    areaName: $("#js-update-pro").find("option:selected").text() + "," + $("#js-update-city").find("option:selected").text() + "," + $("#js-update-area").find("option:selected").text(),
                    uuid: $('#js-update-uuid').val(),
                    refAgentName: $('#agent-name-update').val(),
                    refAgentUuid: $('#agent-uuid-update').val(),
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("商户修改成功");
                        $t._refresh();
                        $("#updateModal").modal('hide');
                    } else {
                        $alert._alert("商户修改失败");
                    }
                },
                error: function() {
                    $alert._alert("商户修改加败");
                },
                beforeSend: function(XMLHttpRequest, self) {
                    var array = {};
                    var temp = $common._paramsEmptyFill(self, array);
                    console.log(self);
                    if (!temp.r) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                    self.data = temp.data;
                }
            });
        });
        /*获取省市县*/
        $(document).ready(function(e) {
            $.ajax({
                url: "/shop-supplier/area/ajax/provincelist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                async: true,
                success: function(data) {
                    for (var key in data) {
                        $(".js-pro").append('<option value="' + key + '">' + data[key] + '</option>');
                    }
                },
                error: function() {
                    $alert._alert("城市列表加载失败");
                }
            });
        });
        $(document).on("change", ".js-pro", function(e) {
            var pro = $(this).val();
            $.ajax({
                url: "/shop-supplier/area/ajax/citylist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    provinceid: pro
                },
                async: true,
                success: function(data) {
                    $(".js-city").html('');
                    $(".js-city").append('<option value="-">-</option>');
                    for (var key in data) {
                        $(".js-city").append('<option value="' + key + '">' + data[key] + '</option>');
                    }
                },
                error: function() {
                    $alert._alert("城市列表加载失败");
                }
            });
        });

        $(document).on("change", ".js-city", function(e) {
            var city = $(this).val();
            $.ajax({
                url: "/shop-supplier/area/ajax/areaslist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    cityid: city
                },
                async: true,
                success: function(data) {
                    $(".js-area").html('');
                    $(".js-area").append('<option value="-">-</option>');
                    for (var key in data) {
                        $(".js-area").append('<option value="' + key + '">' + data[key] + '</option>');
                    }
                },
                error: function() {
                    $alert._alert("县列表加载失败");
                }
            });
        });

        /*搜索所属分类*/
        $(document).on("click", "#js-cat-select-btn-update", function(e) {
            $("#js-cat-select-update").empty();
            $.ajax({
                url: "/shop-supplier/categroy/ajax/idlist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#cat-name-update").val()
                },
                async: true,
                success: function(data) {
                    for (var key in data) {
                        $("#js-cat-select-update").append('<option value="' + key + '">' + data[key] + '</option>');
                    }
                    $("#cat-selectBox-update").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-cat-sure-update", function(e) {
            $("#cat-selectBox-update").addClass('hide');
            $("#cat-uuid-update").val($("#js-cat-select-update").val().split('-')[0]);
            $("#cat-name-update").val($("#js-cat-select-update").find("option:selected").text());
        });
        /*搜索代理商*/
        $(document).on("click", "#js-agent-select-btn-update", function(e) {
            $("#js-agent-select-update").empty();
            $.ajax({
                url: "/shop-agent/agent/ajax/shopagentlist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#agent-name-update").val()
                },
                async: true,
                success: function(data) {
                    for (var int = 0; int < data.length; int++) {
                        $("#js-agent-select-update").append('<option value="' + data[int]['uuid'] + '" data-role="' + data[int]["role"] + '" data-agentname="' + data[int]["areaName"] + '">' + data[int]['name'] + '</option>');
                    }
                    $("#js-agent-select-update").append('<option value="admin" data-role="admin">总后台</option>');
                    $("#agent-selectBox-update").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-agent-sure-update", function(e) {
            $("#agent-selectBox-update").addClass('hide');
            $("#agent-uuid-update").val($("#js-agent-select-update").val().split('-')[0]);
            $("#agent-name-update").val($("#js-agent-select-update").find("option:selected").text());
        });
        /*删除图片*/
        $(document).on("click", ".js-img-open", function(e) {
            var that = this;
            $alert._warning("确认删除该图片？", "该操作将删除选中图片", function() {
                that.remove();
                $alert._strSuc("图片成功移出。");
            });
        });

        /*商品订单表*/
        var ordert = new table();
        var columns = [{
            field: 'orderNo',
            title: '订单号',
            align: 'center',
        }, {
            field: 'userName',
            title: '用户',
            align: 'center',
        }, {
            field: 'goodsSalePrice',
            title: '购买时商品单价',
            align: 'center',
        }, {
            field: 'buyNum',
            title: '购买数量',
            align: 'center',
        }, {
            field: 'totalPrice',
            title: '订单总价',
            align: 'center',
        }, {
            field: 'freight',
            title: '运费',
            align: 'center',
        }, {
            field: 'shipInfo',
            title: '配送地址信息',
            align: 'center',
            visible: false,
        }, {
            field: 'status',
            title: '订单状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'waitPay':
                        return "<span class='badge'>待支付</span>";
                    case 'waitDelivery':
                        return "<span class='badge badge-info'>待发货</span>";
                    case 'waitTake':
                        return "<span class='badge badge-info'>待收货</span>";
                    case 'waitJudge':
                        return "<span class='badge badge-success'>待评价</span>";
                    case 'judged':
                        return "<span class='badge badge-success'>已评价</span>";
                }
                return "-";
            }
        }, {
            field: 'payWay',
            title: '支付方式',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'coin':
                        return "<span class='badge badge-warning'>金币支付</span>";
                    case 'weixin':
                        return "<span class='badge badge-primary'>微信支付</span>";
                    case 'alipay':
                        return "<span class='badge badge-danger'>支付宝</span>";
                    case 'unionPay':
                        return "<span class='badge badge-success'>银联支付</span>";
                }
                return "-";
            }
        }, {
            field: 'addTime',
            title: '下单时间',
            align: 'center',
        }, {
            field: 'remarks',
            title: '备注信息',
            align: 'center',
            visible: false,
        }];
        ordert._setTool('#order-toolbar');
        ordert._setSort('addTime', 'desc');
        var $ordert = ordert._init("ordertable", "/shop-orders/order/shoplist", columns, function(d) {
            d.shopUuid = $('#js-shop-uuid').val();
            d.status = $('#js-choise-status').val();
            d.payWay = $('#js-choise-payway').val();
        });
        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            $ordert._refresh();
        });

        /*商户收支记录表*/
        var coin = new table();
        var c_columns = [{
            field: 'money',
            title: '涉及金额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
        }, {
            field: 'type',
            title: '类型',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'income':
                        return "<span class='badge badge-info'>收入</span>";
                    case 'expend':
                        return "<span class='badge badge-danger'>支出</span>";
                }
                return "-";
            }
        }, {
            field: 'leftMoney',
            title: '收支后余额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
        }, {
            field: 'remarks',
            title: '备注',
            align: 'center',
        }, {
            field: 'addTime',
            title: '录入/申请时间',
            align: 'center',
        }, {
            field: 'payType',
            title: '支付类型',
            align: 'center',
            formatter: function(value, row, inx) {
                switch (value) {
                    case 'weixin':
                        return '微信支付';
                    case 'coin':
                        return '金币支付';
                    case 'alipay':
                        return '支付宝';
                    case 'unionPay':
                        return '银联支付';
                }
                return "-";
            }
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'wait':
                        return "<span class='badge badge-info'>等待处理</span>";
                    case 'success':
                        return "<span class='badge badge-success'>成功</span>";
                    case 'fail':
                        return "<span class='badge badge-danger'>失败</span>";
                }
                return "-";
            }
        }, {
            field: 'operateTime',
            title: '处理时间',
            align: 'center',
        }];
        coin._setTool('#coin-toolbar');
        coin._setSort('addTime', 'desc');
        var $coin = coin._init("cointable", "/shop-supplier/moneyrecord/ajax/shoplist", c_columns, function(d) {
            d.shopUuid = $('#js-shop-uuid').val();
        });

        /*商户积分记录表*/
        var score = new table();
        var s_columns = [{
            field: 'score',
            title: '涉及积分',
            align: 'center',
        }, {
            field: 'type',
            title: '类型',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'income':
                        return "<span class='badge badge-info'>收入</span>";
                    case 'expend':
                        return "<span class='badge badge-danger'>支出</span>";
                }
                return "-";
            }
        }, {
            field: 'leftScore',
            title: '收支后剩余积分',
            align: 'center',
        }, {
            field: 'remarks',
            title: '备注',
            align: 'center',
        }, {
            field: 'addTime',
            title: '录入时间',
            align: 'center',
        }];
        score._setTool('#score-toolbar');
        score._setSort('addTime', 'desc');
        var $score = score._init("scoretable", "/shop-supplier/shopsocrerecord/ajax/shoplist", s_columns, function(d) {
            d.shopUuid = $('#js-shop-uuid').val();
        });


    });
});
