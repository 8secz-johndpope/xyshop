define(function(require) {
	require.async(['jquery'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils')
			var alert=require('alertUtils')
			var $alert=new alert();
			var table=require('tableUtils');
			/*用户金币返还表*/
			var coinBack=new table();
			var cBack_columns=[{
	            field: 'userName', title: '用户名',  align: 'center',
	        },{
	            field: 'leftCoin', title: '剩余带返还金币',  align: 'center',
	        },{
	            field: 'dayCoin', title: '每日返还金币',  align: 'center',
	        },{
	            field: 'remarks', title: '金币返还备注',  align: 'center',
	        },{
	            field: 'addTime', title: '录入时间',  align: 'center',
	        }];
			coinBack._setTool('#coin-back-toolbar');
			coinBack._setSort('addTime','desc');
			var $coinBack = coinBack._init("coin-back-table","/shop-users/coinback/list",cBack_columns,function(d){
			});
	});
});