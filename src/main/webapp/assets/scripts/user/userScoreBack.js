define(function(require) {
	require.async(['jquery'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils')
			var alert=require('alertUtils')
			var $alert=new alert();
			var table=require('tableUtils');
			/*用户积分返还表*/
			var scoreBack=new table();
			var sBack_columns=[{
	            field: 'userName', title: '用户名',  align: 'center',
	        },{
	            field: 'leftScore', title: '剩余带返还积分',  align: 'center',
	        },{
	            field: 'dayScore', title: '每日返还积分',  align: 'center',
	        },{
	            field: 'remarks', title: '积分返还备注',  align: 'center',
	        },{
	            field: 'addTime', title: '录入时间',  align: 'center',
	        }];
			scoreBack._setTool('#score-back-toolbar');
			scoreBack._setSort('addTime','desc');
			var $scoreBack = scoreBack._init("score-back-table","/shop-users/scoreback/list",sBack_columns,function(d){
			});
	});
});