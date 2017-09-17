define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        var alert = require('alertUtils');
        var $alert = new alert();
        var table = require('tableUtils');
        var report = new table();
        
        var columns_income = [
        	{
	            field: 'date',
	            title: '时间',
	            align: 'center',
	        }, {
	            field: 'total',
	            title: '合计',
	            align: 'center'
	        }, {
	            field: 'weixin',
	            title: '微信支付',
	            align: 'center'
	        }, {
	            field: 'offline',
	            title: '线下支付',
	            align: 'center'
	        }, {
	            field: 'wallet',
	            title: '钱包佣金支付',
	            align: 'center'
	        }, {
	            field: 'convert',
	            title: '积分转金币',
	            align: 'center'
	        }, {
	            field: 'dayreturn',
	            title: '日返金币',
	            align: 'center'
	        }, {
	            field: 'backreturn',
	            title: '立返金币',
	            align: 'center'
	        }
        ];
        report._setTool('#report-toolbar');
        report._setSort('addTime', 'desc');
        var $report = report._init("reportTable", "/shop-users/report/ajax/coin/list", columns_income, function(d) {
            d.begin = $('#js-date-begin').val();
            d.end = $('#js-date-end').val();
            d.type = $('#js-choise-day').val();
            d.way = $('#js-choise-way').val();
        });

        $('#js-choise-way').change(function(e){
        	
        	var columns = [];
        	var way = $('#js-choise-way').val();
        	if(way == 'expend'){
        		columns = [
                	{
        	            field: 'date',
        	            title: '时间',
        	            align: 'center',
        	        }, {
        	            field: 'total',
        	            title: '合计',
        	            align: 'center'
        	        }, {
        	            field: 'selfgoods',
        	            title: '购买自营产品',
        	            align: 'center'
        	        }, {
        	            field: 'withdraw',
        	            title: '提现',
        	            align: 'center'
        	        }, {
        	            field: 'shoppay',
        	            title: '商家买单',
        	            align: 'center'
        	        }, {
        	            field: 'coinshop',
        	            title: '金币商城购物',
        	            align: 'center'
        	        }
                ];
        	}else{
        		columns = columns_income;
        	};
        	
        	$('#reportTable').bootstrapTable('refreshOptions', {columns:columns});
        	$report._refresh();
        });
        
        $(".js-change-table-params").change(function(e) {
            if ($(this).val() != 'custom') {
                $('#js-time-span').css('display', 'none');
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