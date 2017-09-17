define(function(require) {
    require.async(['jquery', 'contabs'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils');
        var $alert = new alert();
        var table = require('tableUtils');
        /*用户表表*/
        var usert = new table();
        var columns = [
        {
            field: 'sceneid',
            title: '会员ID',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "00";
            }
        },
        {
            field: 'headImg',
            title: '用户头像',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' src='" + value + "' />";
                }
                return "-";
            }
        }, {
            field: 'name',
            title: '用户名',
            align: 'center',
        }, {
            field: 'realName',
            title: '认证名',
            align: 'center'
        }, {
            field: 'birthday',
            title: '出生日期',
            align: 'center',
            visible: false,
        }, {
            field: 'gender',
            title: '性别',
            align: 'center',
        }, {
            field: 'phoneNum',
            title: '手机号',
            align: 'center',
        }, {
            field: 'score',
            title: '当前积分',
            align: 'center',
        }, {
            field: 'coin',
            title: '当前金币',
            align: 'center',
        }, {
            field: 'commission',
            title: '佣金',
            align: 'center',
        }, {
            field: 'role',
            title: '当前角色',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'bronze':
                        return "<span class='badge badge-warning'>铜牌会员</span>";
                    case 'silver':
                        return "<span class='badge badge-primary'>银牌会员</span>";
                    case 'gold':
                        return "<span class='badge badge-danger'>金牌会员</span>";
                }
                return "-";
            }
        }
//        , {
//            field: 'alipayAccount',
//            title: '绑定的提现支付宝账户',
//            align: 'center',
//        }
        , {
            field: 'refUserName',
            title: '推荐人会员名',
            align: 'center',
        }, {
            field: 'refsceneid',
            title: '推荐人ID',
            align: 'center',
            formatter: function(value, row, index) {
            	if ($common._noEmpty(value)) {
                	return value + "00";
                }
                return "-";
            }
        },{
            field: 'cardId',
            title: '身份证号',
            align: 'center',
            visible: false,
        }, {
            field: 'bankNo',
            title: '银行卡号',
            align: 'center',
            visible: false,
        }, {
            field: 'bankInfo',
            title: '银行的开户行信息',
            align: 'center',
            visible: false,
        }, {
            field: 'familyAddress',
            title: '现家庭住址的省市区',
            align: 'center',
            visible: false,
        }, {
            field: 'addressDetail',
            title: '现家庭住址',
            align: 'center',
            visible: false,
        }, {
            field: 'authRes',
            title: '是否已实名',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case '1':
                        return "<span class='text-success'>已认证</span>";
                    case '0':
                        return "<span class='text-muted'>未认证</span>";
                }
                return "-";
            }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
            	var opt = [];
                opt.push('<a href="userInfo.html?u=' + row.uuid + '" class="btn btn-outline btn-success js-info J_menuItem">用户详情</a>');
                opt.push('<a class="btn btn-outline btn-warning js-upd-grade">修改等级</a>');
                opt.push('<a class="btn btn-outline btn-danger userauth">实名信息</a>');
                return opt.join(" ");
            },
            events: {
                'click .userauth': function(e, value, row, index) {
                    $.post('/shop-users/users/ajax/userauthinfo', { uuid: row.uuid }, function(data, textStatus, xhr) {
                        /*optional stuff to do after success */
                        if (data && data.idcard) {
                            $(".realName").text(data.realname);
                            $(".idcord").text(data.idcard);
                            $('.idcordup').attr('src', data.idcardup);
                            $('.idcordown').attr('src', data.idcardown);
                            $("#updateuuid").val(data.uuid);
                        	// switch(data.status) {
                        	// 	case 'fail':
                        	// 		$(".authinfo").append('<b style="color:red;">该会员实名信息已驳回</b>');
                        	// 		$(".modal-footer").hide();
                        	// 		break;
                        	// 	case 'success':
                        	// 		$(".authinfo").append('<b style="color: green;">该会员实名信息已审核</b>');
                        	// 		$(".modal-footer").hide();
                        	// 		break;
                        	// 	case "review":
                        	// 		$('.authinfo').empty();
                        	// 		$(".modal-footer").show();
                        	// 		break;
                        	// }
                            	
                            $("#userAuth").modal({
                                backdrop: 'static'
                            });
                        } else {
                        	$alert._alert("该会员尚未填写认证信息");
                        }
                    }, 'json');
                },
                'click .js-upd-grade': function(e, value, row, index) {
                    $("#useruuid").val(row.uuid);
                    $("#gradeModal").modal({
                        backdrop: 'static'
                    });
                }
            }
        }];
        usert._setSort('addTime', 'desc');
        var $usert = usert._init("table", "/shop-users/users/list", columns, function(d) {
            d.role = $('#js-choise-role').val();
            d.startTime = $('#js-date-begin').val();
            d.endTime = $('#js-date-end').val();
        });

        /*指定用户筛选条件，刷新用户列表*/
        $(".js-change-table-params").change(function(e) {
            $usert._refresh();
        });

        $(".gradeAction").click(function(e) {
            $.post('/shop-users/users/updgrade', {uuid:  $("#useruuid").val(), grade: $("#js-choise-grade").val()}, function(data, textStatus, xhr) {
                /*optional stuff to do after success */
                if(data == "success") {
                    $alert._alert("修改成功");
                    $("#gradeModal").modal('hide');
                    $usert._refresh();
                } else {
                    $alert._alert("修改失败");
                }
            });
        });

        /*时间选择器*/
        /*加载layerdate时间选择器*/
        require('laydate');
        var start = {
            elem: "#js-date-begin",
            format: "YYYY-MM-DD",
            min: "2016-06-16",
            max: "2099-06-16",
            istime: false,
            istoday: true,
            choose: function(datas) {
                end.min = datas;
                end.start = datas;
                $usert._refresh();
            }
        };
        var end = {
            elem: "#js-date-end",
            format: "YYYY-MM-DD",
            min: "2016-06-16",
            max: "2099-06-16",
            istime: false,
            istoday: true,
            choose: function(datas) {
                start.max = datas;
                $usert._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });
        $(document).on("click", "#laydate_clear", function(e) {
            $usert._refresh();
        });
    });
});
