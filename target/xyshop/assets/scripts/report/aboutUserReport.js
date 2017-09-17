define(function(require) {
    require.async(['jquery', 'icheck'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();

        $(document).ready(function(e) {
            total();
        });

        var table = require('tableUtils');
        /*订单表*/
        var ordert = new table();
        var columns = [{
            field: 'todayCount',
            title: '单日新增会员',
            align: 'center',
        }, {
            field: 'totalCount',
            title: '累计会员数量',
            align: 'center',
        }, {
            field: 'xiaofeiCount',
            title: '单日充值会员',
            align: 'center',
        }, {
            field: 'nonXiaofeiCount',
            title: '单日未充值会员',
            align: 'center',
        }, {
            field: 'endTime',
            title: '时间',
            align: 'center',
        }];
        ordert._setTool('#order-toolbar');
        var $ordert = ordert._init("reportTable", "/shop-users/users/ajax/initUserCountDataList", columns, function(d) {
            d.begin = $('#js-date-begin').val();
            d.end = $('#js-date-end').val();
            d.day = $('#js-choise-day').val();
        });
        /*指定订单筛选条件，刷新订单列表*/
        $(".js-change-table-params").change(function(e) {
            if ($(this).val() != 'appoint') {
                $('#time-span').html('');
                $('#js-time-span').css('display', 'none');
            } else {
                $('#time-span').html('统计从 ' + $('#js-date-begin').val() + '日  至  ' + $('#js-date-end').val() + '的数据');
                $('#js-time-span').css('display', 'inline');
            }

            total();
            $ordert._refresh();
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
                $('#time-span').html('统计从 ' + $('#js-date-begin').val() + '日  至  ' + $('#js-date-end').val() + '的数据');
                total();
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
                $('#time-span').html('统计从 ' + $('#js-date-begin').val() + '日  至  ' + $('#js-date-end').val() + '的数据');
                total();
                $ordert._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });

        var total = function() {
            $.ajax({
                url: "/shop-users/users/ajax/initUserCountData",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    begin: $('#js-date-begin').val(),
                    end: $('#js-date-end').val(),
                    day: $('#js-choise-day').val(),
                },
                async: true,
                success: function(data) {
                    $('#js-user-beginTime').text(data["beginTime"]);
                    $('#js-user-endTime').text(data["endTime"]);
                    $('#js-user-todayCount').text(data["todayCount"]);
                    $('#js-user-totalCount').text(data["totalCount"]);
                    $('#js-user-xiaofeiCount').text(data["xiaofeiCount"]);
                    $('#js-user-nonXiaofeiCount').text(data["nonXiaofeiCount"]);
                },
                error: function() {
                    $alert._alert("用户数据加载失败！");
                }
            });
        }

    });
});