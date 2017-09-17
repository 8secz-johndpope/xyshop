define(function(require) {
    require.async(['jquery', 'contabs'], function() {
        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils')
        var $alert = new alert();
        var upload = require('uploadUtils');
        var $upload = new upload();
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
                    return "<img class='js-img-open' data-value='" + value + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + value + "?x-oss-process=image/resize,w_200'/>";
                } else
                    return "-"
            },
        }, {
            field: 'recommendImg',
            title: '门店推荐图',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' data-value='" + value + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + value + "?x-oss-process=image/resize,w_200'/>";
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
                opt.push('<a class="btn btn-outline btn-info js-update">修改推荐图片</a>');
                opt.push('<a class="btn btn-outline btn-danger js-remove">撤销推荐</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-remove': function(e, value, row, index) {
                    $alert._warning("确认撤销该商家的推荐？", "该操作将撤销商家:\"" + row.name + "\"的推荐", function() {
                        $.ajax({
                            url: "/shop-supplier/shop/ajax/removerecommend",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                            },
                            async: true,
                            success: function(data) {
                                if (data == 1) {
                                    $alert._strSuc("撤销商家推荐成功");
                                    $t._refresh();
                                } else {
                                    $alert._alert("操作失败");
                                }
                            },
                            error: function() {
                                $alert._alert("操作失败");
                            }
                        });
                    });
                },
                'click .js-update': function(e, value, row, index) {
                    $("#js-add-img-show").html("<img id='js-add-img'  data-value='" + row.recommendImg + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + row.recommendImg + "?x-oss-process=image/resize,w_200'/>");
                    $('#shop-name').val(row.name);
                    $('#shop-uuid').val(row.uuid);
                    $("#addModal").modal({
                        backdrop: 'static'
                    });
                }
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "/shop-supplier/shop/ajax/recommendlist", columns);
        var imgUP = null;
        $('#addModal').on('shown.bs.modal', function(e) {
            imgUP = $upload._init(imgUP, '#js-add-img-up', function(file, response) {
                $("#js-add-img-show").html("<img  id='js-add-img'  data-value='" + response.url + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + response.url + "?x-oss-process=image/resize,w_200'/>");
            });
        });
        /*添加商家类别*/
        $(document).on("click", "#js-add", function(e) {
            $('#js-add-img-show').html('');
            $('#shop-name').val('');
            $('#shop-uuid').val('');
            $("#addModal").modal({
                backdrop: 'static'
            });
        });
        $(document).on("click", "#js-add-btn", function(e) {
            var uuid = $('#shop-uuid').val();
            var recommendImg = $('#js-add-img').data('value');
            if (!$common._noEmpty(uuid)) {
                $alert._alert("推荐商家不能为空");
                return;
            }
            if (!$common._noEmpty(recommendImg)) {
                $alert._alert("推荐商家展示图片不能为空");
                return;
            }
            $.ajax({
                url: "/shop-supplier/shop/ajax/updatecommendshop",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: uuid,
                    recommendImg: recommendImg,
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("商家推荐添加/修改成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("操作失败");
                    }
                },
                error: function() {
                    $alert._alert("操作失败");
                }
            });
        });
        /*选择商家*/
        $(document).on("click", "#js-shop-select-btn", function(e) {
            $("#js-shop-select").empty();
            $.ajax({
                url: "/shop-supplier/shop/ajax/idlist",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#shop-name").val()
                },
                async: true,
                success: function(data) {
                    for (var key in data) {
                        $("#js-shop-select").append('<option value="' + key + '">' + data[key] + '</option>');
                    }
                    $("#shop-selectBox").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-shop-sure", function(e) {
            $("#shop-selectBox").addClass('hide');
            $("#shop-uuid").val($("#js-shop-select").val().split('-')[0]);
            $("#shop-name").val($("#js-shop-select").find("option:selected").text());
        });

    });
});