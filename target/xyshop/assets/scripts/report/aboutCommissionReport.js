define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        var income = new table();
        var columns = [{
            field: 'date',
            title: '时间',
            align: 'center',
        }, {
            field: 'money',
            title: '产生佣金',
            align: 'center',
            formatter: function(value, row, index) {
                return value;
            }
        }];
        income._setTool('#income-toolbar');
        income._setSort('addTime', 'desc');
        var $income = income._init("incomeTable", "/shop-users/report/ajax/commission/income/list", columns, function(d) {
            d.begin = $('#js-date-begin').val();
            d.end = $('#js-date-end').val();
            d.type = $('#js-income-day').val();
        });
        /*指定订单筛选条件，刷新订单列表*/
        // $(".js-income-table-params").change(function(e) {
        //     $income._refresh();
        // });



        var expend = new table();
        var columns = [{
            field: 'date',
            title: '时间',
            align: 'center',
        }, {
            field: 'money',
            title: '提现佣金',
            align: 'center',
            formatter: function(value, row, index) {
                return value;
            }
        }];
        expend._setTool('#expend-toolbar');
        expend._setSort('addTime', 'desc');
        var $expend = expend._init("expendTable", "/shop-users/report/ajax/commission/expend/list", columns, function(d) {
            d.begin = $('#js-date-begin-1').val();
            d.end = $('#js-date-end-1').val();
            d.type = $('#js-expend-day').val();
        });


        /*指定订单筛选条件，刷新订单列表*/
        $(".js-table-params").change(function(e) {
            if ($(this).val() != 'custom') {
                $(this).parent().find(".js-time-span").css('display', 'none');
                if ($(this).data("type") == "income") {
                    $income._refresh();
                } else {
                    $expend._refresh();
                }
            } else {
                $(this).parent().find(".js-time-span").css('display', 'inline');;
            }
        });


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
                $income._refresh();
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
                $income._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });


        var start_1 = {
            elem: "#js-date-begin-1",
            format: "YYYY-MM-DD",
            min: "2016-06-16",
            max: "2099-06-16",
            istime: false,
            istoday: true,
            choose: function(datas) {
                end.min = datas;
                end.start = datas;
                $expend._refresh();
            }
        };
        var end_1 = {
            elem: "#js-date-end-1",
            format: "YYYY-MM-DD",
            min: "2016-06-16",
            max: "2099-06-16",
            istime: false,
            istoday: true,
            choose: function(datas) {
                start.max = datas;
                $expend._refresh();
            }
        };
        $("#js-date-begin-1").click(function(e) {
            laydate(start_1);
        });
        $("#js-date-end-1").click(function(e) {
            laydate(end_1);
        });
    });
});