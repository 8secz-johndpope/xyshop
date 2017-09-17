define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        var report = new table();
        var columns = [{
            field: 'date',
            title: '时间',
            align: 'center',
        }, {
            field: 'number',
            title: '订单数',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "单";
            }
        }, {
            field: 'money',
            title: '订单总额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
        }];

        report._setTool('#report-toolbar');
        report._setSort('addTime', 'desc');
        var $report = report._init("reportTable", "/shop-users/report/ajax/selfgoods/list", columns, function(d) {
            d.type = $('#js-choise-day').val();
            d.guuid = $('#js-choise-goods').val();
            d.begin = $('#js-date-begin').val();
            d.end = $('#js-date-end').val();
        });

        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            if ($(this).val() != 'custom') {
                if ($(this).data("selType") == "day") {
                    $('#js-time-span').css('display', 'none');
                }
                $report._refresh();
            } else {
                $('#js-time-span').css('display', 'inline');
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
                $report._refresh();
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
                $report._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });
    });
});