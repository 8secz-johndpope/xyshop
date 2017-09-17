define(function(require) {
	require.async(['jquery'], function() {
		var common=require('common');
		var $common=new common();
		require('jqueryUtils');
		var alert=require('alertUtils');
		var $alert=new alert();
		var table=require('tableUtils');
		
		var c_t=new table();
		var c_columns=[
			{
				field: 'userName', title: '用户名',  align: 'center'
	        },{
				field: 'realName', title: '认证名',  align: 'center'
	        },{
				field: 'bankNo', title: '银行卡号',  align: 'center',
				formatter:function(value, row, index){
					return value + '  -';
                }
	        },{
				field: 'bankInfo', title: '开户行',  align: 'center'
	        },{
				field: 'userPhone', title: '手机号',  align: 'center'
	        },{
	            field: 'type', title: '提现类型',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'commission':return "<span class='badge badge-primary'>佣金</span>";
						case 'coin':return "<span class='badge badge-success'>金币</span>";
					}
					return "-";
                }
	        },{
	            field: 'actual_amount', title: '提现金额',  align: 'center',
	        },{
	            field: 'totalAmount', title: '实际提现金额',  align: 'center',
	        },{
	            field: 'charge_scale', title: '手续费比例',  align: 'center',
	        },{
	            field: 'charge', title: '手续费金额',  align: 'center',
	        },{
	            field: 'addTime', title: '录入时间',  align: 'center',
	        },{
	            field: 'remarks', title: '备注',  align: 'center',
				formatter:function(value, row, index){
					return value.split('-')[0];
                }
	        },{
	            field: 'bankinfo', title: '提现银行信息',  align: 'center'
	        },
	        {
	            field: 'userUuid',
	            title: '银行卡信息',
	            align: 'center',
	            formatter: function(value, row, index) {
                	return '<a class="bankInfo" style="color:#19AA8D;">查看</a>';
	            },
	            events: {
			        'click .bankInfo': function (e, value, row, index){
			        	$.ajax({
							url:"/shop-users/users/ajax/info",
							contentType: "application/x-www-form-urlencoded; charset=utf-8", 
							type: "post",
							dataType:"json",
							data:{
								uuid:row.userUuid,
							},
							async:false,
							success:function(data){
								swal({
					                title:"会员提现信息",
					                text:'<span style="color:#000;">' + data.realName + '<br/>' + row.actual_amount + '元<br/><br/>' + data.bankInfo + '<br/>' + data.bankNo + '</span>',
					                html:true
								});
							},error:function(){
								$alert._alert("获取用户会员银行卡信息失败失败");
							}
						});
			        }
			    }
	        },
	        {
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	var opt=[];
                	opt.push('<a class="btn btn-outline btn-danger js-refuse">拒绝</a>');
                	opt.push('<a class="btn btn-outline btn-success js-agree">同意</a>');
                	return opt.join(" ");
	            },
	            events: {
			        'click .js-refuse': function (e, value, row, index) {
			        	swal({
			        		title: "确认拒绝该提现申请？",
			        		text: "请输入给用户<" + row.userName + ">的拒绝理由",
			        		type: "input",
			        		showCancelButton: true,
			        		cancelButtonText:'让我再考虑一下...',
			        		confirmButtonText:'确定',
			        		closeOnConfirm: false,
			        		animation: "slide-from-top",
			        		inputPlaceholder: "拒绝理由" 
			        	},
			        	function(inputValue){
			        		if (inputValue === false){
		        				return false;
		        			}else{
		        				if (inputValue === "") {swal.showInputError("请输入拒绝理由!"); return false};
		        				$.ajax({
									url:"/shop-users/withdraw/ajax/fail",
									contentType: "application/x-www-form-urlencoded; charset=utf-8", 
									type: "post",
									dataType:"json",
									data:{
										adminUuid:$('#adminUuid').val(),
										uuid:row.uuid,
										bak:inputValue
									},
									async:true,success:function(data){
										$alert._strSuc("操作成功");
										$c_t._refresh();
										
										templateNofity(row.userUuid, row.uuid);
										
									},error:function(){
										$alert._alert("操作失败");
									}
								});
		        			};
			        	});
			        },
			        'click .js-agree': function (e, value, row, index) {
			        	swal({
			        		title: "确认同意该提现申请？",
			        		text: "请输入给用户<" + row.userName + ">的<" + row.actual_amount + ">元网银转账交易流水号",
			        		type: "input",
			        		showCancelButton: true,
			        		cancelButtonText:'让我再考虑一下...',
			        		confirmButtonText:'确定',
			        		closeOnConfirm: false,
			        		animation: "slide-from-top",
			        		inputPlaceholder: "网银转账交易流水号" 
			        	},
			        	function(inputValue){
			        		if (inputValue === false){
		        				return false;
		        			}else{
		        				if (inputValue === "") {swal.showInputError("请输入网银转账交易流水号!"); return false};
		        				$.ajax({
									url:"/shop-users/withdraw/ajax/pass",
									contentType: "application/x-www-form-urlencoded; charset=utf-8", 
									type: "post",
									dataType:"json",
									data:{
										adminUuid:$('#adminUuid').val(),
										uuid:row.uuid,
										number:inputValue
									},
									async:true,success:function(data){
										$alert._strSuc("操作成功");
										$c_t._refresh();
										
										templateNofity(row.userUuid, row.uuid);
										
									},error:function(){
										$alert._alert("操作失败");
									}
								});
		        			};
			        	});
			        },
			    },
	        }
	    ];
		
		c_t._setTool('#apply-toolbar');
		c_t._setSort('addTime','asc');
		var $c_t = c_t._init("moneytable", "/shop-users/withdraw/ajax/wait/list", c_columns);
		
		//发送模板消息
        var templateNofity = function(userUuid, withdrawRecordUuid){
        	
        	var url = $('#wx_domain').val();
            $.ajax({
        	   async:false,
        	   url: url + 'notify/withdraw.html?userUuid=' + userUuid + '&withdrawRecordUuid=' + withdrawRecordUuid,
        	   type: "get",
        	   dataType: 'jsonp',
        	   jsonp: 'callback',
        	   jsonpCallback:"success_jsonpCallback",
        	   timeout: 5000,
        	   success: function (json){
        		   console.log('模板消息发送成功');
        		   console.log(json.status);
        	   },
        	   error: function(xhr){
        		   console.log(xhr);
        	   }
            });
        }
	});
});