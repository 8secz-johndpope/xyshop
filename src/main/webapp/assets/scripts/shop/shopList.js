define(function (require) {
    require.async(['jquery', 'contabs', 'ueditor', 'ueconfig', 'icheck'], function () {
        /**
         * 高德地图
         */
        require('AMap');

        var imgs = require("imgsUtils");
        var $imgs = new imgs();
        var common = require('common');
        var $common = new common();
        var edit = UE.getEditor('editor');
        require('jqueryUtils');
        require("imgTip");
        require('laydate');
        var alert = require('alertUtils');
        var $alert = new alert();
        var upload = require('uploadUtils');
        var $upload = new upload(),
            $upload2 = new upload();


        var map = new AMap.Map('allmap', {
            resizeEnable: true,
            zoom: 13,
            center: [116.39, 39.9],
            keyboardEnable: true
        });

        AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Geocoder'], function () {
            var autoOptions = {
                city: "",
                input: "keyword" //使用联想输入的input的id
            };
            autocomplete = new AMap.Autocomplete(autoOptions);
            var placeSearch = new AMap.PlaceSearch({
                city: "",
                map: map
            })
            AMap.event.addListener(autocomplete, "select", function (e) {
                //TODO 针对选中的poi实现自己的功能
                placeSearch.search(e.poi.name)
            });


            var geocoder = new AMap.Geocoder({
                city: "010" //城市，默认：“全国”
            });

            map.on('click', function (e) {
                map.clearMap();
                document.getElementById("js-add-jingweidu").value = (e.lnglat.getLng() + ',' + e.lnglat.getLat());
                var marker = new AMap.Marker({
                    map: map,
                    bubble: true
                })
                marker.setPosition(e.lnglat);
                geocoder.getAddress(e.lnglat, function (status, result) {
                    if (status == 'complete') {
                        console.log(result);
                        document.getElementById('keyword').value = result.regeocode.formattedAddress
                    }
                })
            })
        });
        /**
         * end
         */


        /**
         * 加载表格
         */
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
            visible: false,
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
            formatter: function (value, row, index) {
                if ($common._noEmpty(row.thumbImgShow)) {
                    return "<img class='js-img-open' data-value='" + row.thumbImgShow + "' src='" + row.thumbImgShow + "'/>";
                } else
                    return "-"
            },
        }, {
            field: 'scale',
            title: '结算比例',
            align: 'center',
            visible: false,
        }, {
            field: 'longitude',
            title: '经纬度',
            align: 'center',
            formatter: function (value, row, index) {
                return value + "," + row.latitude;
            },
        }, {
            field: 'endtime',
            title: '合同到期日期',
            align: 'center',
        }, {
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                if (value === "freeze") {
                    return "<span style='color: red;'>冻结</span>";
                } else if (value === "online") {
                    return "<span>上架</span>";
                }
            }
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
            field: 'scale',
            title: '结算比例',
            align: 'center',
            visible: false,
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                opt.push('<a class="btn btn-outline btn-danger js-freeze">' + (row.status == "freeze" ? "解冻" : "冻结") + '</a>');
                // opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                opt.push('<a class="btn btn-outline btn-success js-scale">配置结算比例</a>');
                opt.push('<a href="shop/home.html?u=' + row.uuid + '" class="btn btn-outline btn-info J_menuItem">详情</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function (e, value, row, index) {
                    updateModel(row);
                },
                'click .js-freeze': function (e, value, row, index) {
                    freezeAction(row);
                },
                'click .js-scale': function (e, value, row, index) {
                    modScale(row);
                }
                // 'click .js-delete': function (e, value, row, index) {
                //     $alert._warning("确认删除该商家？", "该操作将删除商家:\"" + row.name + "\"", function () {
                //         $.post("/xyshop-supplier/shop/del", {
                //             uuid: row.uuid
                //         }, function (data, textStatus, jqXHR) {
                //             $alert._strSuc("商家删除成功");
                //             $t._refresh();
                //         }, "json");
                //     });
                // }
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "/xyshop-supplier/shop/pagelist", columns, function (p) {
            p.status = $("#js-choise-status").val();
        });
        /**
         * end
         */


        /*指定选条件，刷新列表*/
        $(".js-change-table-params").change(function (e) {
            $t._refresh();
        });


        /**
         * 更新面板
         * @param row
         */
        var updateModel = function (row) {
            $("#js-update-uuid").val(row.uuid);
            $("#js-add-name").val(row.name);
            $("#js-add-shopphone").val(row.shopPhone);
            $("#js-add-ownerphone").val(row.ownerPhone);

            $("#js-add-scale").val(row.scale);
            $("#js-add-endTime").val(row.endtime);
            var areasArray = row.areaid.split(',');
            $("#js-add-pro").val(areasArray[0]);

            getAreaFuc("#js-add-city", areasArray[0]).then(function () {
                $("#js-add-city").val(areasArray[1]);
                getAreaFuc("#js-add-area", areasArray[1]).then(function () {
                    $("#js-add-area").val(areasArray[2]);
                });
            });

            $("#js-add-address").val(row.address);
            $("#js-add-jingweidu").val(row.longitude + "," + row.latitude);
            /*百度地图加载*/
            map.clearMap();
            var lnglat = new AMap.LngLat(row.longitude, row.latitude);
            var mark = new AMap.Marker({
                position: lnglat
            });
            map.setZoom(13);
            map.setCenter(lnglat);
            map.panTo(lnglat);
            map.add(mark);

            $("#cat-name").val(row.shopCatName);
            $("#cat-uuid").val(row.shopCatUuid);

            $(".js-thumbimg-show").html(imgUpStr(row.thumbImg, row.thumbImgShow, 'js-thumb-img'));
            $(".js-moreimg-show").html(imgUpStr(row.moreImg, row.moreImgShow, 'js-more-img'));

            $('#js-add-btn').addClass('hide');
            $('#js-update-btn').removeClass('hide');
            $('#js-pwd-box').addClass('hide');
            $("#addModal").modal({
                backdrop: 'static'
            });

            $.post(row.shopDetail, {}, function (data, textStatus, jqXHR) {
                edit.setContent(data);
            }, "text");
        }


        /**
         * 冻结操作
         * @param row
         */
        var freezeAction = function (row) {
            var text, _status;
            if (row.status == "freeze") {
                text = "解冻";
                _status = "online";
            } else {
                text = "冻结";
                _status = "freeze";
            }
            $alert._warning("确认" + text + "商家？", "该操作将" + text + "商家:\"" + row.name + "\"", function () {
                $.ajax({
                    url: "/xyshop-supplier/shop/update",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: {
                        uuid: row.uuid,
                        status: _status
                    },
                    async: true,
                    success: function (data) {
                        $alert._strSuc("商家" + text + "成功");
                        $t._refresh();
                    },
                    error: function () {
                        $alert._alert("操作失败");
                    }
                });
            });
        };


        var modScale = function (row) {
            $alert._fuc(function () {
                swal({
                        title: row.name,
                        type: "input",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "修改",
                        cancelButtonText: "取消",
                        closeOnConfirm: false,
                        closeOnCancel: false,
                        inputPlaceholder: "修改结算比例"
                    },
                    function (inputValue) {
                        if (inputValue) {
                            let params = {
                                uuid: row.uuid,
                                scale: inputValue
                            };
                            $.post("/xyshop-supplier/shop/modify", params, function (result) {
                                if (result === "success") {
                                    $alert._strSuc("结算比例修改成功");
                                    $t._refresh();
                                } else {
                                    $alert._strSuc("结算比例修改失败");
                                }
                            });
                        } else {
                            swal("已取消", "您取消了操作或没有填写参数！", "error");
                        }
                    })
            });
        }


        /**
         * 显示上传的图片
         * @param {*} src
         * @param {*} index
         */
        var imgUpStr = function (org, src, _class) {
            if ($common._noEmpty(src)) {
                if (src.indexOf('#') > 0) {
                    var orglist = org.split("#");
                    var imglist = src.split("#"),
                        temp = [];
                    for (var int = 0; int < imglist.length; int++) {
                        temp.push("<img class='js-img-open " + _class + "' data-value='" + orglist[int] + "' src='" + imglist[int] + "?x-oss-process=image/resize,w_200'/>");
                    }
                    return temp.join(' ');
                } else {
                    return "<img class='js-img-open " + _class + "'' data-value='" + org + "' src='" + src + "?x-oss-process=image/resize,w_200'/>";
                }
            } else
                return "-";
        };


        var imgThumbUP = null,
            imgMoreUP = null;

        $('#addModal,#updateModal').on('shown.bs.modal', function (e) {
            imgThumbUP = $upload._init(imgThumbUP, '.js-thumbimg-up', function (file, response) {
                $(".js-thumbimg-show").html("<div class='expmpleBox'><img  id='js-thumb-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_200'/></div>");
            }, 1);
            imgMoreUP = $upload2._init(imgMoreUP, '.js-moreimg-up', function (file, response) {
                var appendOImagesFlag = $common._imgUP("js-more-img", "" + response.url);
                if (appendOImagesFlag) {
                    $(".js-moreimg-show").append("<div class='expmpleBox'><img  class='js-more-img'  data-value='" + response.value + "' src='" + response.url + "?x-oss-process=image/resize,w_200'/></div>");
                }
            });
        }).on('hidden.bs.modal', function (e) {
            $('.js-init').val('');
            $('#js-add-pro').val('-');
            $('#js-thumb-img').html('');
            $(".js-moreimg-show").html('');
            $("#js-add-city").val('-');
            $("#js-add-area").val('-');
            $("#js-add-scale").val("20");
            $("#js-add-endTime").val('');
            $('#js-add-thumbimg-show').html('');
            $('#js-add-moeimg-show').html('');
            $('#js-add-btn').removeClass('hide');
            $('#js-update-btn').addClass('hide');
            $('#js-pwd-box').removeClass('hide');
            edit.setContent('');
            imgThumbUP.destroy();
            imgMoreUP.destroy();
            imgThumbUP = null;
            imgMoreUP = null;
        });

        /*添加新的商家*/
        $(document).on("click", "#js-add", function (e) {
            map.panBy(300, 160);
            $("#addModal").modal({
                backdrop: 'static'
            });
        });

        var endTime = {
            elem: "#js-add-endTime",
            format: "YYYY-MM-DD",
            min: "2016-06-16",
            max: "2099-06-16",
            istime: false,
            istoday: true,
        };

        $("#js-add-endTime").click(function (e) {
            laydate(endTime);
        });


        $(document).on("click", "#js-add-btn", function (e) {
            var pro = $('#js-add-pro').val(),
                city = $('#js-add-city').val(),
                area = $('#js-add-area').val();
            var catId = $('#cat-uuid').val(),
                ownerPhone = $('#js-add-ownerphone').val(),
                shopPhone = $('#js-add-shopphone').val();
            if (!$common._noEmpty(shopPhone)) {
                $alert._alert("店里手机号不能为空");
                return;
            }
            if (shopPhone.length > 13) {
                $alert._alert("店里手机号格式错误");
                return;
            } else {
                /*手机号判重*/
            }
            if (!$common._noEmpty(ownerPhone)) {
                $alert._alert("店长手机号不能为空");
                return;
            }
            if (ownerPhone.length > 13) {
                $alert._alert("店长手机号格式错误");
                return;
            }

            if (!$common._noEmpty(pro) || pro == '-') {
                $alert._alert("省份不能为空");
                return;
            }
            if (!$common._noEmpty(city) || city == '-') {
                $alert._alert("城市不能为空");
                return;
            }
            if (!$common._noEmpty(area) || area == '-') {
                $alert._alert("区县不能为空");
                return;
            }
            if (!$common._noEmpty(catId)) {
                $alert._alert("所属分类不能为空");
                return;
            }
            var areasid = pro + "," + city + "," + area;

            var imgstr = "";
            $(".js-more-img").each(function (d) {
                imgstr = imgstr + "#" + $(this).data('value');
            });
            if (imgstr == "") {
                imgstr = "#"
            }

            var lonlet = $("#js-add-jingweidu").val().split(",");

            $.ajax({
                url: "/xyshop-supplier/shop/save",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: $("#js-add-name").val(),
                    shopPhone: shopPhone,
                    ownerPhone: ownerPhone,
                    address: $('#js-add-address').val(),

                    thumbImg: $('#js-thumb-img').data('value'),
                    moreImg: imgstr.substring(1),

                    longitude: lonlet[0],
                    latitude: lonlet[1],

                    endtime: $("#js-add-endTime").val(),

                    shopCatUuid: $('#cat-uuid').val(),
                    shopCatName: $('#cat-name').val(),

                    areaid: areasid,
                    areaname: $("#js-add-pro").find("option:selected").text() + "," + $("#js-add-city").find("option:selected").text() + "," + $("#js-add-area").find("option:selected").text(),

                    shopDetail: UE.getEditor('editor').getContent(),

                    scale: $("#js-add-scale").val(),
                },
                async: true,
                success: function (data) {
                    if (data == 1) {
                        $alert._strSuc("商户添加成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("商户添加失败");
                    }
                },
                error: function () {
                    $alert._alert("商户添加加失败");
                },
                beforeSend: function (XMLHttpRequest, self) {
                    var array = {};
                    array.beforeImgs = "";
                    var temp = $common._paramsEmptyFill(self, array);
                    if (!temp.r) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                    self.data = temp.data;
                }
            });
        });
        /*修改商家类别*/
        $(document).on("click", "#js-update-btn", function (e) {
            var pro = $('#js-add-pro').val(),
                city = $('#js-add-city').val(),
                area = $('#js-add-area').val();
            var catId = $('#cat-uuid').val(),
                ownerPhone = $('#js-add-ownerphone').val(),
                shopPhone = $('#js-add-shopphone').val();
            if (!$common._noEmpty(shopPhone)) {
                $alert._alert("店里手机号不能为空");
                return;
            }
            if (shopPhone.length > 13) {
                $alert._alert("店里手机号格式错误");
                return;
            }
            if (!$common._noEmpty(ownerPhone)) {
                $alert._alert("店长手机号不能为空");
                return;
            }
            if (ownerPhone.length > 13) {
                $alert._alert("店长手机号格式错误");
                return;
            }
            if (!$common._noEmpty(pro) || pro == '-') {
                $alert._alert("省份不能为空");
                return;
            }
            if (!$common._noEmpty(city) || city == '-') {
                $alert._alert("城市不能为空");
                return;
            }
            if (!$common._noEmpty(area) || area == '-') {
                $alert._alert("区县不能为空");
                return;
            }
            if (!$common._noEmpty(catId)) {
                $alert._alert("所属分类不能为空");
                return;
            }
            var areasid = pro + "," + city + "," + area;
            var imgstr = "";
            $(".js-more-img").each(function (d) {
                imgstr = imgstr + "#" + $(this).data('value');
            });
            if (imgstr == "") {
                imgstr = "#"
            }

            var lonlet = $("#js-add-jingweidu").val().split(",");

            $.ajax({
                url: "/xyshop-supplier/shop/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#js-update-uuid").val(),
                    name: $("#js-add-name").val(),
                    shopPhone: shopPhone,
                    ownerPhone: ownerPhone,
                    address: $('#js-add-address').val(),

                    thumbImg: $('#js-thumb-img').data('value'),
                    moreImg: imgstr.substring(1),

                    longitude: lonlet[0],
                    latitude: lonlet[1],

                    endtime: $("#js-add-endTime").val(),

                    shopCatUuid: $('#cat-uuid').val(),
                    shopCatName: $('#cat-name').val(),

                    areaid: areasid,
                    areaname: $("#js-add-pro").find("option:selected").text() + "," + $("#js-add-city").find("option:selected").text() + "," + $("#js-add-area").find("option:selected").text(),

                    shopDetail: UE.getEditor('editor').getContent(),

                    scale: $("#js-add-scale").val(),
                },
                async: true,
                success: function (data) {
                    if (data == 1) {
                        $alert._strSuc("商户修改成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("商户修改失败");
                    }
                },
                error: function () {
                    $alert._alert("商户修改加败");
                },
                beforeSend: function (XMLHttpRequest, self) {
                    var array = {};
                    var temp = $common._paramsEmptyFill(self, array);
                    //						console.log(self);
                    if (!temp.r) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                    self.data = temp.data;
                }
            });
        });


        /**
         * 加载城市列表
         *
         * @param {any} seletive 填充目标元素
         * @param {any} area 选择的城市id
         */
        var getAreaFuc = function (seletive, area) {
            var def = $.Deferred();
            $.ajax({
                url: "district/list",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    areaid: area
                },
                async: false,
                success: function (data) {
                    $(seletive).html('');
                    $(seletive).append('<option value="-">-</option>');
                    for (var key in data) {
                        $(seletive).append('<option value="' + data[key].id + '">' + data[key].name + '</option>');
                    }
                    def.resolve(data);
                },
                error: function (xhr) {
                    def.reject(xhr);
                    $alert._alert("城市列表加载失败");
                }
            });
            return def.promise();
        }
        $(document).ready(function (e) {
            getAreaFuc("#js-add-pro", 0);
        });
        $(document).on("change", ".js-pro", function (e) {
            getAreaFuc("#js-add-city", $(this).val());
        });
        $(document).on("change", ".js-city", function (e) {
            getAreaFuc("#js-add-area", $(this).val());
        });

        /**
         * 搜索所属分类
         */
        $(document).on("click", "#js-cat-select-btn", function (e) {
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
                success: function (data) {
                    for (var key in data) {
                        $("#js-cat-select").append('<option value="' + data[key].uuid + '">' + data[key].name + '</option>');
                    }
                    $("#cat-selectBox").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-cat-sure", function (e) {
            $("#cat-selectBox").addClass('hide');
            $("#cat-uuid").val($("#js-cat-select").val().split('-')[0]);
            $("#cat-name").val($("#js-cat-select").find("option:selected").text());
        });

        /*删除图片*/
        $(document).on("click", ".js-img-open, .js-more-img", function (e) {
            var that = this;
            if ($(this).parent().hasClass("expmpleBox")) {
                that = $(this).parent();
            }
            $alert._warning("确认删除该图片？", "该操作将删除选中图片", function () {
                that.remove();
                // $alert._strSuc("图片成功移出。");
            });
        });

        /**
         * 校验商户名
         */
        $(document).on("change", "#js-add-name,#js-update-name", function (e) {
            var shopName = $(this).val();
            if (shopName == '') {
                $alert._alert('该店铺名不能为空');
                return;
            }
            $.post("/xyshop-supplier/shop/only", {name: shopName},
                function (data, textStatus, jqXHR) {
                    if (data) {
                        $alert._alert('该店铺名已被使用,请更换店铺名字');
                    }
                },
                "json"
            );
        });

        $(document).on("change", "#js-add-ownerphone", function (e) {
            var ownerphone = $(this).val();
            if (ownerphone == '') {
                $alert._alert('店长手机不能为空');
                return;
            }
            $.post("/xyshop-supplier/shop/only", {ownerPhone: ownerphone},
                function (data, textStatus, jqXHR) {
                    if (data) {
                        $alert._alert('店长手机已被使用,请更换');
                    }
                },
                "json"
            );
        });
    });
});