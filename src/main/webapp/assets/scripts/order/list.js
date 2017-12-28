define(function(require) {
    require.async(['jquery', 'icheck'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        /*订单支付表*/
        var ordert = new table();
        var columns = [{
            field: 'orderNo',
            title: '订单号',
            align: 'center',
        }, {
            field: 'shopName',
            title: '商家',
            align: 'center',
        }, {
            field: 'good.name',
            title: '商品名',
            align: 'center',
        }, {
            field: 'totalPrice',
            title: '订单总金额',
            align: 'center',
        }, {
            field: 'payPrice',
            title: '支付金额',
            align: 'center',
        }, {
            field: 'cardCode',
            title: '序列码',
            align: 'center',
        }, {
            field: 'sysTips',
            title: '优惠卷',
            align: 'center',
        }, {
            field: 'status',
            title: '订单状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'waitPay':
                        return "<span class='badge badge-danger'>待支付</span>"
                    case 'waitConsume':
                        return "<span class='badge badge-primary'>待使用</span>"
                    case 'consumed':
                        return "<span class='badge badge-warning'>已完成</span>"
                    case 'refunded':
                        return "<span class='badge badge-success'>已退款</span>"
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
            sortable: true
        }, {
            field: 'payTime',
            title: '支付时间',
            align: 'center',
            sortable: true
        }, {
            field: 'completeTime',
            title: '核销时间',
            align: 'center',
            sortable: true
        }];
        ordert._setTool('#order-toolbar');
        ordert._setSort('addTime', 'desc');
        var $ordert = ordert._init("ordertable", "/xyshop-supplier/order/list", columns, function(d) {
            d.status = $('#js-choise-status').val();
            d.payWay = $('#js-choise-payway').val();
            d.startTime = $('#js-date-begin').val();
            d.endTime = $('#js-date-end').val();
        });


        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            $ordert._refresh();
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
                $ordert._refresh();
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
                $ordert._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });
        $(document).on("click", "#laydate_clear", function(e) {
            $ordert._refresh();
        });
    });
});