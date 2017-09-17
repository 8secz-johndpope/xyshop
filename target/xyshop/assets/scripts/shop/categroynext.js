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
        var $upload = new upload(),
            $upload2 = new upload();
        var table = require('tableUtils');
        var t = new table();
        var columns = [{
            field: 'name',
            title: '类别名字',
            align: 'center',
        }, {
            field: 'catId',
            title: '类别编号',
            align: 'center',
        }, {
            field: 'level',
            title: '类别级别',
            align: 'center',
        }, {
            field: 'iconImg',
            title: '类别图标',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' data-value='" + value + "' src='" + row.iconImgPath + "?x-oss-process=image/resize,w_100'/>";
                } else
                    return "-"
            },
        }, {
            field: 'addTime',
            title: '修改时间',
            align: 'center',
            sortable: true
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function(e, value, row, index) {
                    $("#js-update-uuid").val(row.uuid);
                    $("#js-update-name").val(row.name);
                    $("#js-update-img-show").html("<div class='expmpleBox'><img id='js-update-img'  data-value='" + row.iconImg + "' src='" + row.iconImg + "?x-oss-process=image/resize,w_100'/></div>");
                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-delete': function(e, value, row, index) {
                    $alert._warning("确认删除该类别？", "该操作将删除二级商家类别\"" + row.name + "\"", function() {
                        $.ajax({
                            url: "/shop-supplier/categroy/ajax/del",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                            },
                            async: true,
                            success: function(data) {
                                $alert._strSuc("类别删除成功");
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
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "/xyshop-supplier/shop-categroy/pagelist", columns, function(d) {
            d.catid = $("#js-parent-catId").val()
        });


        var imgUP = null,
            imgUpdateUP = null;
        $('#addModal').on('shown.bs.modal', function(e) {
            imgUP = $upload._init(imgUP, '#js-add-img-up', function(file, response) {
                $("#js-add-img-show").html("<div class='expmpleBox'><img  id='js-add-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });
        $('#updateModal').on('shown.bs.modal', function(e) {
            imgUpdateUP = $upload2._init(imgUpdateUP, '#js-update-img-up', function(file, response) {
                $("#js-update-img-show").html("<div class='expmpleBox'><img  id='js-update-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });


        /*添加商家类别*/
        $(document).on("click", "#js-add", function(e) {
            $('#js-add-name').val('');
            $('#js-add-img-show').html('');
            $("#addModal").modal({
                backdrop: 'static'
            });
        });
        $(document).on("click", "#js-add-btn", function(e) {
            var n = $('#js-add-name').val();
            var icon = $('#js-add-img').data('value');
            if (!$common._noEmpty(n)) {
                $alert._alert("类别名称不能为空");
                return;
            }
            if (!$common._noEmpty(icon)) {
                $alert._alert("类别图标不能为空");
                return;
            }
            $.ajax({
                url: "/xyshop-supplier/shop-categroy/save-lv2",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: n,
                    iconId: icon,
                    catPid: $("#js-parent-catId").val(),
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("类别添加成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("类别添加失败");
                    }
                },
                error: function() {
                    $alert._alert("类别添加失败");
                }
            });
        });
        /*修改商家类别*/
        $(document).on("click", "#js-update-btn", function(e) {
            var n = $('#js-update-name').val();
            var icon = $('#js-update-img').data('value');
            if (!$common._noEmpty(n)) {
                $alert._alert("类别名称不能为空");
                return;
            }
            if (!$common._noEmpty(icon)) {
                $alert._alert("类别图标不能为空");
                return;
            }
            $.ajax({
                url: "/xyshop-supplier/shop-categroy/revise",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#js-update-uuid").val(),
                    name: n,
                    iconImg: icon,
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._strSuc("类别修改成功");
                        $t._refresh();
                        $("#updateModal").modal('hide');
                    } else {
                        $alert._alert("类别修改失败");
                    }
                },
                error: function() {
                    $alert._alert("类别修改失败");
                }
            });
        });

    });
});