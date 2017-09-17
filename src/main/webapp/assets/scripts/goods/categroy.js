define(function (require) {
    require.async(['jquery', 'contabs'], function () {
        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils');
        var $alert = new alert();
        var upload = require('uploadUtils');
        var $upload = new upload(), $upload2 = new upload();
        var table = require('tableUtils');
        var t = new table();
        var columns = [{
            field: 'name', title: '分类名字', align: 'center',
        }, {
            field: 'catId', title: '分类编号', align: 'center',
        }, {
            field: 'level', title: '分类级别', align: 'center',
        }, {
            field: 'iconImg', title: '分类图标', align: 'center',
            formatter: function (value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img data-value='" + value + "' class='js-img-open' src='" + row.iconImgShow + "?x-oss-process=image/resize,w_100'/>";
                } else
                    return "-"
            },
        }, {
            field: 'addTime', title: '修改时间', align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                opt.push('<a href="shop/good-category-next.html?u=' + row.catId + '&n=' + row.name + '" data-index="cat-next-' + index + '"  class="btn btn-outline btn-info js-jiesuan J_menuItem">查看二级分类</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function (e, value, row, index) {
                    $("#js-update-catId").val(row.uuid);
                    $("#js-update-name").val(row.name);
                    $("#js-update-img-show").html("<div class='expmpleBox'><img id='js-update-img'  data-value='" + row.iconImg + "' src='" + row.iconImgShow + "?x-oss-process=image/resize,w_100'/></div>");
                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-delete': function (e, value, row, index) {
                    $alert._warning("确认删除该分类？", "该操作将删除一级商品分类\"" + row.name + "\"", function () {
                        $.ajax({
                            url: "/xyshop-supplier/category/del",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                            },
                            async: true, success: function (data) {
                                $alert._strSuc("分类删除成功");
                                $t._refresh();
                            }, error: function () {
                                $alert._alert("操作失败");
                            }
                        });

                    });
                },
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "/xyshop-supplier/category/pagelist", columns);


        var imgUP = null, imgUpdateUP = null;
        $('#addModal').on('shown.bs.modal', function (e) {
            imgUP = $upload._init(imgUP, '#js-add-img-up', function (file, response) {
                $("#js-add-img-show").html("<div class='expmpleBox'><img  id='js-add-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });
        $('#updateModal').on('shown.bs.modal', function (e) {
            imgUpdateUP = $upload2._init(imgUpdateUP, '#js-update-img-up', function (file, response) {
                $("#js-update-img-show").html("<div class='expmpleBox'><img  id='js-update-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });
        /*添加商品分类*/
        $(document).on("click", "#js-add", function (e) {
            $('#js-add-name').val('');
            $('#js-add-img-show').html('');
            $("#addModal").modal({
                backdrop: 'static'
            });
        });
        $(document).on("click", "#js-add-btn", function (e) {
            var n = $('#js-add-name').val();
            var icon = $('#js-add-img').data('value');
            if (!$common._noEmpty(n)) {
                $alert._alert("分类名称不能为空");
                return;
            }
            if (!$common._noEmpty(icon)) {
                $alert._alert("分类图标不能为空");
                return;
            }
            $.ajax({
                url: "/xyshop-supplier/category/save-lv1",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: n,
                    iconId: icon,
                },
                async: true, success: function (data) {
                    if (data == 1) {
                        $alert._strSuc("分类添加成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("分类添加失败");
                    }
                }, error: function () {
                    $alert._alert("分类添加失败");
                }
            });
        });
        /*修改商品分类*/
        $(document).on("click", "#js-update-btn", function (e) {
            var n = $('#js-update-name').val();
            var icon = $('#js-update-img').data('value');
            if (!$common._noEmpty(n)) {
                $alert._alert("分类名称不能为空");
                return;
            }
            if (!$common._noEmpty(icon)) {
                $alert._alert("分类图标不能为空");
                return;
            }
            $.ajax({
                url: "/xyshop-supplier/category/revise",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#js-update-catId").val(),
                    name: n,
                    iconImg: icon,
                },
                async: true, success: function (data) {
                    if (data == 1) {
                        $alert._strSuc("分类修改成功");
                        $t._refresh();
                        $("#updateModal").modal('hide');
                    } else {
                        $alert._alert("分类修改失败");
                    }
                }, error: function () {
                    $alert._alert("分类修改失败");
                }
            });
        });

    });
});