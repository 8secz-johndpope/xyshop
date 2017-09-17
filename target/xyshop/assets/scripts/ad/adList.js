define(function (require) {
    require.async(['jquery', 'contabs', 'icheck', 'ueditor', 'ueconfig', 'videojs'], function () {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils')
        var $alert = new alert();

        var upload = require('uploadUtils');
        var $upload = new upload();
        var $uploadVideo = new upload();

        var table = require('tableUtils');
        var edit = UE.getEditor('editor');
        require('videojs');

        var playerId = undefined;

        var t = new table();
        var columns = [{
            field: 'name',
            title: '名字',
            align: 'center',
        }, {
            field: 'coin',
            title: '奖励金币',
            align: 'center',
        }, {
            field: 'imgUrl',
            title: '广告图片',
            align: 'center',
            formatter: function (value, row, index) {
                return "<img class='js-img-open' data-value='" + value + "' src='" + row.imgUrlShow + "?x-oss-process=image/resize,w_200'/>";
            }
        }, {
            field: 'position',
            title: '广告位置',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case "shopHomeTop":
                        return '<span class="badge badge-info">商城首页</span>';
                    case "monitorHomeTop":
                        return '<span class="badge badge-success">监控首页</span>';
                    case "monitorHomeTop":
                        return '<span class="badge badge-warning">分类首页</span>';
                }
                return "-";
            }
        }, {
            field: 'type',
            title: '所属类型',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 'outerUrl':
                        return '<span class="badge badge-info">外部链接</span>';
                    case 'simpleGoods':
                        return '<span class="badge badge-success">指定商品</span>';
                    case 'innerUrl':
                        return '<span class="badge badge-warning">内部链接</span>';
                }
                return "-";
            }
        }, {
            field: 'videoType',
            title: '视频类型',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 'inner':
                        return '<span class="badge badge-info">内部视频</span>';
                    case 'outer':
                        return '<span class="badge badge-success">外部视频</span>';
                }
                return "-";
            }
        }, {
            field: 'status',
            title: '当前状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 'online':
                        return "<span class='badge badge-success'>上线</span>";
                    case 'offline':
                        return "<span class='badge badge-danger'>下线</span>";
                }
                return "-";
            }
        }, {
            field: 'addTime',
            title: '添加时间',
            align: 'center',
            sortable: true
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                if (row.status == 'offline') {
                    opt.push('<a class="btn btn-outline btn-info js-online">上架</a>');
                } else {
                    opt.push('<a class="btn btn-outline btn-danger js-offline">下架</a>');
                }
                opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-update': function (e, value, row, index) {
                    $('#js-update-btn').removeClass('hide');
                    $('#js-add-btn').addClass('hide');

                    $("#js-update-uuid").val(row.uuid);
                    $('#js-add-img-show').html("<img id='js-add-img' data-value='" + row.imgUrl + "' src='" + row.imgUrlShow + "?x-oss-process=image/resize,w_200'/>");
                    $("input[name='position'][value='" + row.position + "']").iCheck('check');
                    $("input[name='type'][value='" + row.type + "']").iCheck('check');
                    $("input[name='status'][value='" + row.status + "']").iCheck('check');
                    $('#js-add-name').val(row.name);
                    $("#js-coin").val(row.coin);

                    $('.needHide').addClass('hide');
                    switch (row.type) {
                        case 'outerUrl':
                            $("#js-ad-url").val(row.gotoInfo);
                            $("#outerUrlDiv").removeClass('hide');
                            break;
                        case 'simpleGoods':
                            $("#goods-uuid").val(row.gotoInfo);
                            infoName = $('#goods-name').val(row.gotoInfoName);
                            $("#simpleGoodsDiv").removeClass('hide');
                            break;
                        case 'innerUrl':
                            $(".innerUrlDiv").removeClass('hide');

                            $("#cat-uuid").val(row.gotoInfo);
                            infoName = $('#cat-name').val(row.gotoInfoName);

                            $("input[name='videoType'][value='" + row.videoType + "']").iCheck('check');

                            $(".vt-hide").addClass("hide");
                            switch (row.videoType) {
                                case "inner":
                                    var video = JSON.parse(row.videoInfo);
                                    playerId = '_' + row.uuid;
                                    $(".js-video-show").html('<video id="' + playerId + '" data-video-precessImg="' + video.img + '" data-video-value="' + video.video + '" class="video-js" poster="' + video.imgShow + '" controls><source src="' + video.videoShow + '"></source><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to aweb browser that<a href="http://videojs.com/html5-video-support/" target="_blank">你的浏览器不支持HTML5播放器</a></p></video>');
                                    videojs(playerId, {
                                        width: $(".innerUrlDiv").width()
                                    });
                                    $(".video-js").css({
                                        width: "100%",
                                        height: '300px',
                                        "margin-bottom": "10px"
                                    });
                                    $(".video-type-inner").removeClass('hide');
                                    break;
                                case 'outer':
                                    $("#js-video-addr").val(row.videoInfo);
                                    var videoHtml = $(row.videoInfo);
                                    $(videoHtml).width("100%");
                                    $(".js-outer-video-show").html(videoHtml);
                                    $(".video-type-outer").removeClass('hide');
                                    break;
                            }
                            $.get(row.gotoInfo, {},
                                function (data, textStatus, jqXHR) {
                                    edit.setContent(data);
                                },
                                "text"
                            );
                            break;
                    }
                    $("#addModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-online': function (e, value, row, index) {
                    $alert._warning("确认上架该广告吗？", "", function () {
                        $.ajax({
                            url: "ad/online",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                key: row.uuid,
                            },
                            async: true,
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    $alert._strSuc("广告上架成功");
                                    $t._refresh();
                                } else {
                                    $alert._alert("操作失败");
                                }
                            },
                            error: function () {
                                $alert._alert("操作失败");
                            }
                        });
                    });
                },
                'click .js-offline': function (e, value, row, index) {
                    $alert._warning("确认下架该广告吗？", "", function () {
                        $.ajax({
                            url: "ad/offline",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                key: row.uuid,
                            },
                            async: true,
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    $alert._strSuc("广告下架成功");
                                    $t._refresh();
                                } else {
                                    $alert._alert("操作失败");
                                }
                            },
                            error: function () {
                                $alert._alert("操作失败");
                            }
                        });
                    });
                },
                'click .js-delete': function (e, value, row, index) {
                    $alert._warning("确认删除该广告吗？", "", function () {
                        $.ajax({
                            url: "ad/del",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                key: row.uuid,
                            },
                            async: true,
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    $alert._strSuc("广告删除成功");
                                    $t._refresh();
                                } else {
                                    $alert._alert("操作失败");
                                }
                            },
                            error: function () {
                                $alert._alert("操作失败");
                            }
                        });
                    });
                }
            },
        }];
        t._setSort('addTime', 'desc');
        var $t = t._init("table", "ad/pagelist", columns, function(a){
            a.position = $("#js-ad-pos").val();
            a.status = $("#js-ad-status").val();
        });

        $(".js-change-table-params").change(function() {
            $t._refresh();
        });


        var imgUP = null,
            videoUp = null;
        $('#addModal').on('shown.bs.modal', function (e) {
            imgUP = $upload._init(imgUP, '#js-add-img-up', function (file, response) {
                $("#js-add-img-show").html("<img  id='js-add-img'  data-value='" + response.value + "' src='" + response.url + "'/></div>");
            });
            videoUp = $uploadVideo._init(videoUp, '.js-video-up', function (file, response) {
                if (response.done) {
                    playerId = "_" + Math.round(Math.random() * 100000000);
                    $(".js-video-show").html('<video id="' + playerId + '" data-video-precessImg="' + response.precessImgValue + '" data-video-value="' + response.value + '" class="video-js" poster="' + response.precessImg + '" controls><source src="' + response.url + '"></source><p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to aweb browser that<a href="http://videojs.com/html5-video-support/" target="_blank">你的浏览器不支持HTML5播放器</a></p></video>');
                    videojs(playerId, {
                        width: $(".innerUrlDiv").width()
                    });
                }
            }, 1);
        }).on('hidden.bs.modal', function () {
            $("#js-update-uuid").val('');
            $('#js-add-img-show').empty();
            $("input[name='position'][value='shopHomeTop']").iCheck('check');
            $("input[name='type'][value='innerUrl']").iCheck('check');
            $("input[name='status'][value='online']").iCheck('check');
            $('#js-add-name').val('');
            $(".js-video-show").empty();
            edit.setContent('');
            $("#js-ad-url").val("");
            $("#goods-name").val("");
            $("#goods-uuid").val("");

            $(".vt-hide").addClass("hide");
            $(".video-type-inner").removeClass('hide');
        });
        /*添加商品分类*/
        $(document).on("click", ".js-add", function (e) {
            $('#js-update-btn').addClass('hide');
            $('#js-add-btn').removeClass('hide');
            $('.form-control').val('');
            $('#js-add-img-show').html('');
            $("#addModal").modal({
                backdrop: 'static'
            });
        });

        $(document).on("ifChecked", "input[name='position']", function () {
            if ($(this).val() == "monitorHomeTop" || $(this).val() == "monitorPlay") {
                $(".simpleGoods").hide();
                $(".simpleGoods").prev().hide();
            } else {
                $(".simpleGoods").show();
                $(".simpleGoods").prev().show();
            }
        });

        /**
         * 广告类型
         */
        $(document).on('ifChecked', "input[name='type']", function (event) {
            $('.needHide').addClass('hide');
            switch ($(this).val()) {
                case 'outerUrl':
                    $("#outerUrlDiv").removeClass('hide')
                    break;
                case 'simpleGoods':
                    $("#simpleGoodsDiv").removeClass('hide')
                    break;
                case 'innerUrl':
                    $(".vt-hide").addClass("hide");
                    var videoType = $('input[name="videoType"][checked="checked"]').val();
                    if (videoType == 'inner') {
                        $(".video-type-inner").removeClass("hide");
                    } else {
                        $(".video-type-outer").removeClass("hide");
                    }
                    $(".video-Type").removeClass("hide");
                    $(".innerUrlDiv").removeClass("hide");
                    break;
            }
        });


        /**
         * 视频类型
         */
        $(document).on('ifChecked', "input[name='videoType']", function (event) {
            $(".vt-hide").addClass("hide");
            if ($(this).val() == 'inner') {
                $(".video-type-inner").removeClass('hide');
            } else {
                $(".video-type-outer").removeClass('hide');
            }
        });


        $("#js-video-addr").change(function (e) {
            e.preventDefault();
            var playerId = "_" + Math.round(Math.random() * 100000000);
            var videoHtml = $($(this).val());
            $(videoHtml).width($(".innerUrlDiv").width());
            $(".js-outer-video-show").html(videoHtml);
        });


        /**
         * 添加
         */
        $(document).on("click", "#js-add-btn", function (e) {
            var n = $('#js-add-name').val();
            var _position = $("input[name='position'][checked='checked']").val();
            var _type = $("input[name='type'][checked='checked']").val();
            var _imgUrl = $("#js-add-img").data('value');

            var _goto_info = "",
                _goto_info_name = "",
                _video_info = "",
                _video_type = "";

            var pass = true,
                tips = "";

            if (!_imgUrl) {
                $alert._alert("请上传图片");
                return;
            }

            if (!$common._noEmpty(n)) {
                $alert._alert("广告名称不能为空");
                return;
            }

            switch (_type) {
                case 'outerUrl':
                    _goto_info = $("#js-ad-url").val();
                    if (!_goto_info) {
                        pass = false;
                        tips = "外部链接不能为空";
                    }
                    break;
                case 'simpleGoods':
                    _goto_info = $("#goods-uuid").val();
                    _goto_info_name = $('#goods-name').val();
                    if (!_goto_info) {
                        pass = false;
                        tips = "未指定商品";
                    }
                    break;
                case 'innerUrl':
                    _goto_info = edit.getContent();

                    var videoType = $('input[name="videoType"][checked="checked"]').val();
                    _video_type = videoType;
                    if (videoType == 'inner') {
                        _video_info = JSON.stringify({
                            img: $("#" + playerId).data("videoPrecessimg"),
                            video: $("#" + playerId).data("videoValue")
                        });
                    } else {
                        _video_info = $("#js-video-addr").val();
                    }

                    if (!_goto_info) {
                        pass = false;
                        tips = "内部链接内容不能为空";
                    }
                    break;
            }

            if (!pass) {
                $alert._alert(tips);
                return false;
            }

            $.ajax({
                url: "ad/save",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: n,
                    coin: $("#js-coin").val(),
                    position: _position,
                    imgUrl: _imgUrl,
                    gotoInfo: _goto_info,
                    gotoInfoName: _goto_info_name,
                    videoType: _video_type,
                    videoInfo: _video_info,
                    status: $("input[name='status'][checked='checked']").val(),
                    type: _type
                },
                async: true,
                success: function (data) {
                    if (parseInt(data) > 0) {
                        $alert._strSuc("添加广告成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("添加广告失败");
                    }
                },
                error: function () {
                    $alert._alert("滚动广告添加失败");
                }
            });
        });


        /**
         * 修改广告内容
         */
        $(document).on("click", "#js-update-btn", function (e) {

            var n = $('#js-add-name').val();
            var _position = $("input[name='position'][checked='checked']").val();
            var _type = $("input[name='type'][checked='checked']").val();
            var _imgUrl = $("#js-add-img").data('value');

            var _goto_info = "",
                _goto_info_name = "",
                _video_info = "",
                _video_type = "";

            var pass = true,
                tips = "";

            if (!_imgUrl) {
                $alert._alert("请上传图片");
                return;
            }

            if (!$common._noEmpty(n)) {
                $alert._alert("广告名称不能为空");
                return;
            }

            switch (_type) {
                case 'outerUrl':
                    _goto_info = $("#js-ad-url").val();
                    if (!_goto_info) {
                        pass = false;
                        tips = "外部链接不能为空";
                    }
                    break;
                case 'simpleGoods':
                    _goto_info = $("#goods-uuid").val();
                    _goto_info_name = $('#goods-name').val();
                    if (!_goto_info) {
                        pass = false;
                        tips = "未指定商品";
                    }
                    break;
                case 'innerUrl':
                    _goto_info = edit.getContent();

                    var videoType = $('input[name="videoType"][checked="checked"]').val();
                    _video_type = videoType;
                    if (videoType == 'inner') {
                        _video_info = JSON.stringify({
                            img: $("#" + playerId).data("videoPrecessimg"),
                            video: $("#" + playerId).data("videoValue")
                        });
                    } else {
                        _video_info = $("#js-video-addr").val();
                    }

                    if (!_goto_info) {
                        pass = false;
                        tips = "内部链接内容不能为空";
                    }
                    break;
            }

            if (!pass) {
                $alert._alert(tips);
                return false;
            }


            $.ajax({
                url: "ad/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#js-update-uuid").val(),
                    name: n,
                    coin: $("#js-coin").val(),
                    position: _position,
                    imgUrl: _imgUrl,
                    gotoInfo: _goto_info,
                    gotoInfoName: _goto_info_name,
                    videoType: _video_type,
                    videoInfo: _video_info,
                    status: $("input[name='status'][checked='checked']").val(),
                    type: _type
                },
                async: true,
                success: function (data) {
                    if (parseInt(data) > 0) {
                        $alert._strSuc("广告修改成功");
                        $t._refresh();
                        $("#addModal").modal('hide');
                    } else {
                        $alert._alert("广告修改失败");
                    }
                },
                error: function () {
                    $alert._alert("广告修改失败");
                }
            });
        });


        /*搜索指定商品*/
        $(document).on("click", "#js-goods-select-btn", function (e) {
            $("#js-goods-select").empty();
            let _name = $("#goods-name").val();
            if (!_name) {
                $alert._alert("请输入关键字查询商品");
                return false;
            }
            $.ajax({
                url: "/xyshop-supplier/goods/list",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    name: _name,
                },
                async: true,
                success: function (data) {
                    for (var key in data) {
                        $("#js-goods-select").append('<option value="' + data[key].uuid + '">' + data[key].name + '</option>');
                    }
                    $("#goods-selectBox").removeClass('hide');
                }
            });
        });
        $(document).on("click", "#js-goods-sure", function (e) {
            $("#goods-selectBox").addClass('hide');
            $("#goods-uuid").val($("#js-goods-select").val());
            $("#goods-name").val($("#js-goods-select").find("option:selected").text());
        });
        $(document).on('ifChecked', 'input.radio', function (event) {
            $("input[name='" + $(this).attr('name') + "']").removeAttr("checked");
            $(this).attr("checked", "checked");
        });
        $('input.radio').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%' // optional
        });

    });
});