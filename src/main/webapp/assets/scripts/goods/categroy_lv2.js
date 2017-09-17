define(function (require) {
    require.async(['jquery', 'contabs'], function () {
        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils')
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
                    return "<img class='js-img-open' data-value='" + value + "' src='" + value + "?x-oss-process=image/resize,w_100'/>";
                } else
                    return "-"
            },
        }, {
            field: 'addTime', title: '添加时间', align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function (e, value, row, index) {
                    $("#js-update-catId").val(row.catId);
                    $("#js-update-name").val(row.name);
                    $("#js-update-img-show").html("<div class='expmpleBox'><img id='js-update-img'  data-value='" + row.iconImg + "' src='" + row.iconImg + "?x-oss-process=image/resize,w_100'/></div>");
                    $("#js-update-attr-box").html('');
                    $.ajax({
                        url: "/shop-goods/categroyattr/ajax/list",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        type: "post",
                        dataType: "json",
                        data: {
                            code: row.catId,
                        },
                        async: true, success: function (data) {
                            for (var int = 0; int < data.length; int++) {
                                $("#js-update-attr-box").append("<span class='label label-info js-attr js-update-attr' data-uuid='" + data[int].uuid + "' data-des='" + data[int].attireDes + "'>" + data[int].attrName + "</span>");
                                $common.addArrayItem("add-att-array-temp", {
                                    name: data[int].attrName,
                                    des: data[int].attireDes,
                                    uuid: data[int].uuid,
                                    opt: []
                                }, "uuid");
                            }
                        }, error: function () {
                            $alert._alert("分类属性加载失败");
                        }
                    });
                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-delete': function (e, value, row, index) {
                    $alert._warning("确认删除该分类？", "该操作将删除二级商品分类\"" + row.name + "\"", function () {
                        $.ajax({
                            url: "/shop-goods/categroy/ajax/del",
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
        var $t = t._init("table", "/shop-goods/categroy/list", columns, function (d) {
            d.catID = $("#js-parent-catId").val()
        });
        var imgUP = null, imgUpdateUP = null;
        $('#addModal').on('shown.bs.modal', function (e) {
            localStorage.removeItem("add-att-array-temp");
            imgUP = $upload._init(imgUP, '#js-add-img-up', function (file, response) {
                $("#js-add-img-show").html("<div class='expmpleBox'><img  id='js-add-img'  data-value='" + response.url + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });
        $('#updateModal').on('shown.bs.modal', function (e) {
            imgUpdateUP = $upload2._init(imgUpdateUP, '#js-update-img-up', function (file, response) {
                $("#js-update-img-show").html("<div class='expmpleBox'><img  id='js-update-img'  data-value='" + response.url + "' src='" + response.url + "?x-oss-process=image/resize,w_100'/></div>");
            });
        });
        $('#updateModal,#addModal').on('hidden.bs.modal', function (e) {
            localStorage.removeItem("add-att-array-temp");
            localStorage.removeItem("delete-att-array");
            localStorage.removeItem("delete-attopt-array");
        });
        /*添加商品分类*/
        $(document).on("click", "#js-add", function (e) {
            $('#js-add-name').val('');
            $('#js-add-img-show').html('');
            $("#js-add-attr-box").html('');
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
                url: "/shop-goods/categroy/ajax/add2",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: n,
                    iconId: icon,
                    code: $("#js-parent-catId").val(),
                    attrStr: localStorage.getItem("add-att-array-temp")
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
        /*修改商品分类信息*/
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
                url: "/shop-goods/categroy/ajax/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: n,
                    iconImg: icon,
                    attrStr: localStorage.getItem("add-att-array-temp"),
                    delAttrStr: localStorage.getItem("delete-att-array"),
                    delOptStr: localStorage.getItem("delete-attopt-array"),
                    catId: $("#js-update-catId").val()
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
        /*添加分类属性*/
        $(document).on("click", "#js-add-attr-btn", function (e) {
            $("#js-del-attr-btn").addClass('hide');
            $("#js-attr-name").val('');
            $("#js-attr-des").val('');
            $("#js-attr-uuid").val('');
            $("#js-attr-inp").val('#js-add-attr-box');
            $("#opt-box").html('');
            $("#addAttrModal").modal();
        });
        $(document).on("click", "#js-update-attr-btn", function (e) {
            $("#js-attr-name").val('');
            $("#js-attr-des").val('');
            $("#js-attr-uuid").val('');
            $("#js-attr-inp").val('#js-update-attr-box');
            $("#opt-box").html('');
            $("#addAttrModal").modal();
        });
        /*保存属性*/
        $(document).on("click", "#js-save-attr-btn", function (e) {
            var uuid = $('#js-attr-uuid').val();
            var name = $('#js-attr-name').val();
            var des = $('#js-attr-des').val();
            if (!$common._noEmpty(name)) {
                $alert._alert("属性名不能为空");
                return;
            }
            if (!$common._noEmpty(uuid)) {
                uuid = $common._generateMixed();
                $($("#js-attr-inp").val()).append("<span class='label label-info js-attr js-add-attr' data-des='" + des + "' data-uuid=" + uuid + ">" + name + "</span>");
            }
            var optArray = [];
            $(".js-attr-opt").each(function (e) {
                optArray.push({
                    uuid: $common._noEmpty($(this).data('uuid')) ? $(this).data('uuid') : $common._generateMixed(),
                    name: $(this).val()
                });
            });
            $common.addArrayItem("add-att-array-temp", {name: name, des: des, uuid: uuid, opt: optArray}, "uuid");
            $("#addAttrModal").modal('hide');
        });


        /*添加可选项*/
        $(document).on("click", "#js-add-attr-option", function (e) {
            $("#opt-box").append('<div class="form-group"><label>可选项</label><div><input class="form-control js-attr-opt required" style="width:70%;display:inline-block" placeholder="可选项值"> <a class="btn btn-danger js-del-attr-opt">删除</a></div></div>');
        });

        
        /*删除可选项*/
        $(document).on("click", ".js-del-attr-opt", function (e) {
            var attroptUuid = $(this).prev().data('uuid');
            if ($common._noEmpty(attroptUuid)) {
                $common.addArrayItem("delete-attopt-array", {uuid: attroptUuid}, "uuid");
            }
            $(this).parent().parent().remove();
        })


        /*修改商品分类属性*/
        var delAtr;
        var delAtrStr;
        $(document).on("click", ".js-attr", function (e) {
            delAtr = this;
            delAtrStr = $(this).text();
            $("#opt-box").html('');
            $("#js-del-attr-btn").removeClass('hide');
            $("#js-attr-name").val($(this).text());
            $("#js-attr-des").val($(this).data("des"));
            var attrUuid = $(this).data('uuid');
            if ($common._noEmpty(attrUuid)) {
                var attrArray = $common.getArrayItem("add-att-array-temp", "uuid", attrUuid), atop = attrArray.opt;
                $('#js-attr-uuid').val(attrUuid);
                /**
                 * 如果在本地缓存中没有属性子分类则查询库
                 */
                if (atop.length == 0) {
                    $.ajax({
                        url: "/shop-goods/categroyattroption/ajax/list",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        type: "post",
                        dataType: "json",
                        data: {
                            attrId: attrUuid,
                        },
                        async: true, success: function (data) {
                            for (var int = 0; int < data.length; int++) {
                                $("#opt-box").append('<div class="form-group"><label>可选项</label><div><input data-uuid="' + data[int].uuid + '" class="form-control js-attr-opt required" style="width:70%;display:inline-block" placeholder="可选项值" value="' + data[int].optionName + '"> <a class="btn btn-danger js-del-attr-opt">删除</a></div></div>');
                            }
                        }, error: function () {
                            $alert._alert("获取属性数据失败");
                        }
                    });
                } else {
                    for (var int = 0; int < atop.length; int++) {
                        $("#opt-box").append('<div class="form-group"><label>可选项</label><div><input data-uuid="' + atop[int].uuid + '" class="form-control js-attr-opt required" style="width:70%;display:inline-block" placeholder="可选项值" value="' + atop[int].name + '"> <a class="btn btn-danger js-del-attr-opt">删除</a></div></div>');
                    }
                }

            }
            $("#addAttrModal").modal();
        });


        /*删除分类属性*/
        $(document).on("click", "#js-del-attr-btn", function (e) {
            $common.deleteArrayItem("add-att-array-temp", "name", delAtrStr);
            var attrUuid = $('#js-attr-uuid').val();
            if ($common._noEmpty(attrUuid)) {
                $common.addArrayItem("delete-att-array", {uuid: attrUuid}, "uuid");
            }
            delAtr.remove();
            $("#addAttrModal").modal('hide');
        });

    });
});