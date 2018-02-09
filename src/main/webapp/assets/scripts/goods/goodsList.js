define(function (require) {
    require.async(['jquery', 'contabs', 'icheck', 'ueditor', 'ueconfig'], function () {
        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var edit = UE.getEditor('editor');
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
            field: 'goodNo',
            title: '商品编号',
            align: 'center',
        }, {
            field: 'name',
            title: '商品名',
            align: 'center',
        }, {
            field: 'shopName',
            title: '商家',
            align: 'center',
            sortable: true,
        }, {
            field: 'thumbImg',
            title: '商品图片',
            align: 'center',
            formatter: function (value, row, index) {
                return imgUpStr(row.thumbImgShow);
            }
        }, {
            field: 'moreImg',
            title: '更多图片',
            align: 'center',
            visible: false,
            formatter: function (value, row, index) {
                $imgs.lunbo("lunbo-" + index);
                return imgUpStr(row.moreImgShow, index);
            }
        }, {
            field: 'orgPrice',
            title: '门市价',
            align: 'center',
        }, {
            field: 'price',
            title: '价格',
            align: 'center',
        }, {
            field: 'saleNum',
            title: '销售量',
            align: 'center',
            sortable: true,
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case "wait":
                        return "<span class='badge badge-info'>待上架</span>";
                    case "online":
                        return "<span class='badge badge-success'>已上架</span>";
                    case "offline":
                        return "<span class='badge badge-danger'>已下架</span>";
                    case "freeze":
                        return "<span class='badge badge-danger'>已冻结</span>";
                    case "reject":
                        return "<span class='badge badge-danger'>已驳回</span>";
                }
                return "-";
            }
        }, {
            field: 'addTime',
            title: '添加时间',
            align: 'center',
            sortable: true,
        }, {
            field: 'updateTime',
            title: '修改时间',
            align: 'center',
            sortable: true,
            visible: false,
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">查看</a>');
                switch (row.status) {
                    case "wait":
                        opt.push('<a class="btn btn-outline btn-primary js-resolve">通过</a>');
                        opt.push('<a class="btn btn-outline btn-danger js-reject">驳回</a>');
                        break;
                    case "online":
                        opt.push('<a class="btn btn-outline btn-danger js-goodown">下架</a>');
                        opt.push('<a class="btn btn-outline btn-primary js-freeze">冻结</a>');
                        break;
                    case "offline":
                        opt.push('<a class="btn btn-outline btn-primary js-goodup">上架</a>');
                        opt.push('<a class="btn btn-outline btn-danger js-freeze">冻结</a>');
                        break;
                    case "freeze":
                        opt.push('<a class="btn btn-outline btn-danger js-unfreeze">解冻</a>');
                        break;
                }
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                //opt.push('<a href="goodsinfo.html?u=' + row.uuid + '" class="btn btn-outline btn-info J_menuItem">详情</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function (e, value, row, index) {
                    $('#updateuuid').val(row.uuid);
                    $("#js-add-goods-btn").addClass('hide');
                    $("#js-upate-goods-btn").removeClass('hide');
                    $.get(row.desFile, function (data) {
                        edit.setContent(data);
                    });
                    $("#goodno").val(row.goodNo);
                    $("#name").val(row.name);
                    $("#shop-uuid").val(row.shopUuid);
                    $("#shop-name").val(row.shopName);
                    $("#orgprice").val(row.orgPrice);
                    $("#price").val(row.price);
                    //$("#balance").val(row.balance);
                    //$("#stock").val(row.stock);
                    //$("#cat-uuid").val(row.catId);
                    //$("#cat-name").val(row.catName);
                    //$("#brand-uuid").val(row.brandId);
                    //$("#brand-name").val(row.brandName);

                    $("#headImgShow").html("<img id='headImg'  data-value='" + row.thumbImg + "' src='" + row.thumbImgShow + "?x-oss-process=image/resize,w_200'/></div>");
                    if ($common._noEmpty(row.moreImg)) {
                        if (!row.moreImg.includes('#')) {
                            $("#otherheadImgShow").append("<img  class='js-img-open otherImg' data-value='" + row.moreImg + "' src='" + row.moreImgShow + "?x-oss-process=image/resize,w_200'/></div>");
                        } else {
                            var imagelist = row.moreImg.split('#');
                            var imagelistShow = row.moreImgShow.split('#');
                            for (var int = 0; int < imagelistShow.length; int++) {
                                if (imagelistShow[int]) {
                                    $("#otherheadImgShow").append("<img class='js-img-open otherImg' data-value='" + imagelist[int] + "' src='" + imagelistShow[int] + "?x-oss-process=image/resize,w_200'/>");
                                }
                            }
                        }
                    }
                    $("#myModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-goodown': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/down', {'uuid': row.uuid}, "确定下架该商品吗？", "下架成功");
                },
                'click .js-goodup': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/up', {'uuid': row.uuid}, "确定上架该商品吗？", "上架成功");
                },
                'click .js-freeze': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/freeze', {'uuid': row.uuid}, "确定冻结该商品吗？", "冻结成功");
                },
                'click .js-unfreeze': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/unfreeze', {'uuid': row.uuid}, "确定解冻该商品吗？", "解冻成功");
                },
                'click .js-resolve': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/resolve', {'uuid': row.uuid}, "确定审核该商品吗？", "审核成功");
                },
                'click .js-delete': function (e, value, row, index) {
                    execAction('/xyshop-supplier/goods/delete', {'uuid': row.uuid}, "确定删除该商品吗？", "删除成功");
                },
                'click .js-reject': function (e, value, row, index) {
                    $('#updateuuid').val(row.uuid);
                    $("#failModal").modal({
                        backdrop: 'static'
                    });
                }
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "/xyshop-supplier/goods/pagelist", columns, function (d) {
            d.uuid = $('#js-shop-uuid').val();
            d.status = $("#js-choise-online").val();
        });


        /**
         * [商品状态]
         */
        $(".js-change-table-params").change(function (e) {
            $t._refresh();
        });


        var imgUpStr = function (src, index) {
            if ($common._noEmpty(src)) {
                if (src.indexOf('#') > 0) {
                    var imglist = src.split("#"),
                        temp = [];
                    for (var int = 0; int < imglist.length; int++) {
                        temp.push("<img class='js-img-open' data-value='" + imglist[int] + "' src='" + imglist[int] + "'/>");
                    }
                    return temp.join(' ');
                } else {
                    return "<img class='js-img-open' data-value='" + src + "' src='" + src + "'/>";
                }
            } else
                return "-";
        };


        $('#myModal').on('hidden.bs.modal', function (e) {
            $(".form-control").val('');
            $("#headImgShow").html('');
            $("#otherheadImgShow").html('');
        });


        /**
         * 相关操作
         * @param action
         * @param args
         * @param tips
         * @param suctips
         */
        var execAction = function (action, args, tips, suctips) {
            $alert._warning(tips, "", function () {
                $.post(action, args, function (data, textStatus, xhr) {
                    /*optional stuff to do after success */
                    $alert._alert(suctips);
                    $t._refresh();
                });
            });
        }


        /**
         * 驳回
         */
        $(document).on("click", "#js-back-action", function (e) {
            var _rebut = $("#failReason").val();
            if (!_rebut) {
                $alert._alert("必须填写驳回理由");
                return false;
            }
            $.post('/xyshop-supplier/goods/reject', {
                'uuid': $('#updateuuid').val(),
                'rebut': _rebut,
            }, function (data, textStatus, xhr) {
                /*optional stuff to do after success */
                $alert._alert('驳回成功');
                $t._refresh();
                $("#failModal").modal('hide');
            });
        });

    });
});
