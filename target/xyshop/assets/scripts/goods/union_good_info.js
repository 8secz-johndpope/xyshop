define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        require("utils");
        /*商品评价表*/
        // var t=new table();
        // var columns=[{
        //           field: 'userName', title: '用户',  align: 'center',
        //       },{
        //           field: 'judgeLevel', title: '评星等级',  align: 'center',
        //       },{
        //           field: 'judgeContent', title: '评价内容',  align: 'center',
        //       },{
        //           field: 'addTime', title: '录入时间',  align: 'center',
        //       },{
        //           field: 'orderNo', title: '订单号',  align: 'center',
        //       }];
        // t._setSort('addTime','desc');
        // var $t = t._init("table","/shop-goods/goodsjudge/list",columns,function(d){
        // 	d.goodsUuid=$('#js-goods-uuid').val()
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
            field: 'goodsNum',
            title: '购买数量',
            align: 'center',
        }, {
            field: 'totalPrice',
            title: '订单总价',
            align: 'center',
        }, {
            field: 'status',
            title: '订单状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'waitPay':
                        return "<span class='badge'>待支付</span>";
                    case 'paySuccess':
                        return "<span class='badge badge-success'>支付成功</span>";
                    case 'payFail':
                        return "<span class='badge badge-success'>支付失败</span>";
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
        var $ordert = ordert._init("ordertable", "/shop-orders/unionorders/ajax/list", columns, function(d) {
            d.goodsUuid = QueryString.uuid;
            // d.status=$('#js-choise-status').val();
            d.payWay = $('#js-choise-payway').val();
        });
        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            $ordert._refresh();
        });

    });
});
