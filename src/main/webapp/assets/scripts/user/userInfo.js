define(function(require) {
    require.async(['jquery', 'contabs'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');

        /*用户表表*/
        // var usert = new table();
        // var columns = [{
        //         field: 'headImg',
        //         title: '用户头像',
        //         align: 'center',
        //         formatter: function(value, row, index) {
        //             if ($common._noEmpty(value)) {
        //                 return "<img width='40px' id='headImg'  data-value='" + value + "' src='" + value + "'/>";
        //             }
        //             return "-";
        //         }
        //     }, {
        //         field: 'name',
        //         title: '用户名',
        //         align: 'center',
        //     }, {
        //         field: 'realName',
        //         title: '认证名',
        //         align: 'center',
        //     }, {
        //         field: 'birthday',
        //         title: '出生日期',
        //         align: 'center',
        //         visible: false,
        //     }, {
        //         field: 'gender',
        //         title: '性别',
        //         align: 'center',
        //     }, {
        //         field: 'phoneNum',
        //         title: '手机号',
        //         align: 'center',
        //     }, {
        //         field: 'score',
        //         title: '当前积分',
        //         align: 'center',
        //     }, {
        //         field: 'coin',
        //         title: '当前金币',
        //         align: 'center',
        //     }, {
        //         field: 'commission',
        //         title: '佣金',
        //         align: 'center',
        //     }, {
        //         field: 'role',
        //         title: '当前角色',
        //         align: 'center',
        //         formatter: function(value, row, index) {
        //             switch (value) {
        //                 case 'bronze':
        //                     return "<span class='badge badge-warning'>铜牌会员</span>";
        //                 case 'silver':
        //                     return "<span class='badge badge-primary'>银牌会员</span>";
        //                 case 'gold':
        //                     return "<span class='badge badge-danger'>金牌会员</span>";
        //             }
        //             return "-";
        //         }
        //     },
        //     //	        {
        //     //	            field: 'alipayAccount', title: '绑定的提现支付宝账户',  align: 'center',
        //     //	        },
        //     {
        //         field: 'refUserName',
        //         title: '推荐人用户名',
        //         align: 'center',
        //     }, {
        //         field: 'addTime',
        //         title: '注册时间',
        //         align: 'center',
        //     }
        // ];
        // var $usert = usert._init("table", "/xyshop-supplier/user/details", columns, function(d) {
        //     d.uuid = $('#js-user-uuid').val();
        // });
        // var next_usert = new table();
        // next_usert._setTool('#user-toolbar');
        // next_usert._setSort('addTime', 'desc');
        // var $next_usert = next_usert._init("user-table", "/shop-users/users/list", columns, function(d) {
        //     d.refUserUuid = $('#js-user-uuid').val();
        // });

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
        var $ordert = ordert._init("ordertable", "/shop-orders/order/userlist", columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
            d.status = $('#js-choise-status').val();
            d.payWay = $('#js-choise-payway').val();
        });

        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            $ordert._refresh();
        });


        /** 消费记录 */
        var exreTab = new table();
        var exre_col = [{
            field: 'money',
            title: '涉及金额',
            align: 'center'
        }, {
            field: 'leftmoney',
            title: '收支后余额',
            align: 'center'
        }, {
            field: 'type',
            title: '类型',
            align: 'center',
            formatter: function(value, row, index) {
                return "income" === value ? "收入" : '支出';
            }
        }, {
            field: 'remark',
            title: '备注',
            align: 'center'
        }, {
            field: 'addtime',
            title: '录入时间',
            align: 'center'
        }];
        exreTab._setTool('#exre-toolbar');
        var $exreTab = exreTab._init("exretable", "/shop-users/usercoin/erlist", exre_col, function(d) {
            d.userUuid = $('#js-user-uuid').val();
            d.payWay = $('#js-er-payway').val();
        });

        /*指定订单筛选条件，刷新订单列表*/
        $("#js-er-payway").change(function(e) {
            $exreTab._refresh();
        });


        /*用户地址表*/
        // var addres = new table();
        // var a_columns = [{
        //     field: 'linkName',
        //     title: '收货人姓名',
        //     align: 'center',
        // }, {
        //     field: 'linkPhone',
        //     title: '收货人手机号',
        //     align: 'center',
        // }, {
        //     field: 'addressCity',
        //     title: '收货地址的省市区',
        //     align: 'center',
        // }, {
        //     field: 'addressDetail',
        //     title: '详细地址',
        //     align: 'center',
        // }, {
        //     field: 'addTime',
        //     title: '录入时间',
        //     align: 'center',
        // }];
        // addres._setTool('#address-toolbar');
        // addres._setSort('addTime', 'desc');
        // var $addres = addres._init("addresstable", "/shop-users/useraddress/list", a_columns, function(d) {
        //     d.userUuid = $('#js-user-uuid').val();
        // });

        /*用户金币记录表*/
        var coin = new table();
        var c_columns = [{
            field: 'coin',
            title: '涉及金币',
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
            field: 'leftCoin',
            title: '收支后剩余金币',
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
            title: '录入时间',
            align: 'center',
        }];
        coin._setTool('#coin-toolbar');
        coin._setSort('addTime', 'desc');
        var $coin = coin._init("cointable", "/shop-users/usercoin/userlist", c_columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
        });

        /*用户金币返还表*/
        var coinBack = new table();
        var cBack_columns = [{
            field: 'userName',
            title: '用户名',
            align: 'center',
        }, {
            field: 'leftCoin',
            title: '剩余带返还金币',
            align: 'center',
        }, {
            field: 'dayCoin',
            title: '每日返还金币',
            align: 'center',
        }, {
            field: 'remarks',
            title: '金币返还备注',
            align: 'center',
        }, {
            field: 'addTime',
            title: '录入时间',
            align: 'center',
        }];
        coinBack._setTool('#coin-back-toolbar');
        coinBack._setSort('addTime', 'desc');
        var $coinBack = coinBack._init("coin-back-table", "/shop-users/coinback/userlist", cBack_columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
        });

        /*用户积分记录表*/
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
        var $score = score._init("scoretable", "/shop-users/userscore/userlist", s_columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
        });

        /*用户积分返还表*/
        var scoreBack = new table();
        var sBack_columns = [{
            field: 'userName',
            title: '用户名',
            align: 'center',
        }, {
            field: 'leftScore',
            title: '剩余带返还积分',
            align: 'center',
        }, {
            field: 'dayScore',
            title: '每日返还积分',
            align: 'center',
        }, {
            field: 'remarks',
            title: '积分返还备注',
            align: 'center',
        }, {
            field: 'addTime',
            title: '录入时间',
            align: 'center',
        }];
        scoreBack._setTool('#score-back-toolbar');
        scoreBack._setSort('addTime', 'desc');
        var $scoreBack = scoreBack._init("score-back-table", "/shop-users/scoreback/userlist", sBack_columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
        });

        /*用户佣金记录表*/
        var commission = new table();
        var commission_columns = [{
            field: 'commission',
            title: '涉及佣金',
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
            field: 'leftCommission',
            title: '收支后剩余佣金',
            align: 'center',
        }, {
            field: 'realName',
            title: '来源人姓名',
            align: 'center',
        }, {
            field: 'phoneNum',
            title: '来源人手机号',
            align: 'center',
        }, {
            field: 'sourceType',
            title: '方式',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'selfgoods':
                        return "<span class='badge badge-info'>购买自营产品</span>";
                    case 'recharge':
                        return "<span class='badge badge-danger'>充值</span>";
                    case 'withdraw':
                        return "<span class='badge badge-danger'>提现</span>";
                    case 'customer_md':
                        return "<span class='badge badge-danger'>下级会员线下买单</span>";
                    case 'shop_sd':
                        return "<span class='badge badge-danger'>推荐商家线下收单</span>";
                    case 'convertcoin':
                        return "<span class='badge badge-danger'>钱包佣金充值金币</span>";
                }
                return "-";
            }
        }, {
            field: 'remarks',
            title: '备注',
            align: 'center',
        }, {
            field: 'addTime',
            title: '录入时间',
            align: 'center',
        }];
        commission._setTool('#commission-toolbar');
        commission._setSort('addTime', 'desc');
        var $commission = commission._init("commissiontable", "/shop-users/usercommission/unionlist", commission_columns, function(d) {
            d.userUuid = $('#js-user-uuid').val();
        });
    });

});