define(function(require) {
    require.async(['jquery', 'icheck'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        var ordert = new table();
        var columns = [{
            field: 'orderNo',
            title: '订单号',
            align: 'center',
        }, {
            field: 'userName',
            title: '用户',
            align: 'center'
        }, {
            field: 'realName',
            title: '认证名',
            align: 'center'
        }, {
            field: 'sceneid',
            title: '用户ID',
            align: 'center',
            formatter: function(value, row, index) {
                if (!value) {
                    return '-';
                }
                return value + '00';
            }
        }, {
            field: 'shopName',
            title: '商家名称',
            align: 'center',
        }, {
            field: 'totalPrice',
            title: '订单总价',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) return "￥" + value;
                else return "-";
            }
        }, {
            field: 'status',
            title: '订单状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'waitPay':
                        return "<span class='badge'>待付款</span>";
                    case 'paySuccess':
                        return "<span class='badge badge-info'>支付完成</span>";
                    case 'payFail':
                        return "<span class='badge badge-info'>支付失败</span>";
                    case 'waitConsume':
                        return "<span class='badge badge-info'>待使用</span>";
                    case 'consumed':
                        if (row.buyType == "custom") {
                            return "<span class='badge badge-info'>消费成功</span>";
                        } else {
                            return "<span class='badge badge-info'>已使用</span>";
                        }
                    case 'refunded':
                        return "<span class='badge badge-danger'>已退款</span>";
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
                    case 'wallet':
                        return "<span class='badge badge-success'>钱包支付</span>";
                }
                return "-";
            }
        }, {
            field: 'addTime',
            title: '下单时间',
            align: 'center',
        }];
        ordert._setTool('#order-toolbar');
        ordert._setSort('addTime', 'desc');
        var $ordert = ordert._init("ordertable", "/shop-orders/unionorders/ajax/unionlist", columns, function(d) {
            //				d.shopName=$('#js-shop-name').val();
            d.status = $('#js-choise-status').val();
            d.payWay = $('#js-choise-payway').val();
            d.startTime = $('#js-date-begin').val();
            d.endTime = $('#js-date-end').val();
            //				d.goodsName=$('#js-goods-name').val();
            //				d.userName=$('#js-user-name').val();
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
        $('input.radio').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%' // optional
        });
        $(document).on('ifChecked', 'input.radio', function(event) {
            $("input[name='" + $(this).attr('name') + "']").removeAttr("checked");
            $(this).attr("checked", "checked");
        });
        /*填写物流信息*/
        $('#js-delivered-btn').click(function(e) {
            var wuliu = $("input[name='wuliu'][checked]").val();
            var wuliuName = $("input[name='wuliu'][checked='checked']").parent().next().text();
            var wuliuno = $('#p-wuliudanhao').val();
            if (wuliuno) {
                $alert._alert('物流单号不能为空');
            }
            $alert._warning("确认信息填写无误？", "该操作将修改订单\"" + $('#js-order-no').val() + "\"的物流信息为：" + wuliuName + "," + wuliuno, function() {
                $.ajax({
                    url: "/shop-orders/order/addwuliu",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    type: "post",
                    dataType: "json",
                    data: {
                        orderNo: $('#js-order-no').val(),
                        logisticsName: wuliuName,
                        logisticsCode: wuliu,
                        logisticsNo: wuliuno
                    },
                    async: true,
                    success: function(data) {
                        if (data[0] == 'success') {
                            $alert._strSuc("物流信息填写成功");
                            $ordert._refresh();
                            $("#wuliuModal").modal('hide');
                        } else {
                            $alert._alert("操作失败");
                        }
                    },
                    error: function() {
                        $alert._alert("操作失败");
                    },
                    beforeSend: function(XMLHttpRequest) {
                        if (!$common._paramsEmpty($(this))) {
                            $alert._alert('请确认所有参数都填写完整!');
                            XMLHttpRequest.abort();
                        }
                    }
                });
            });
        });
    });
});