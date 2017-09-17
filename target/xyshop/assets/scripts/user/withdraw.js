define(function(require) {
	require.async(['jquery','icheck'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils')
			var alert=require('alertUtils')
			var $alert=new alert();
			var table=require('tableUtils');
			/*订单表*/
			var ordert=new table();
			var columns=[
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
					field: 'userPhone', title: '手机号',  align: 'center',
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
		            field: 'status', title: '状态',  align: 'center',
		            formatter:function(value, row, index){
		            	switch (value) {
							case 'wait':return "<span class='badge'>待处理</span>";
							case 'success':return "<span class='badge badge-info'>提现成功</span>";
							case 'fail':return "<span class='badge badge-info'>提现拒绝</span>";
		            	}
							return "-";
	                }
		        },{
		            field: 'exchangeBak', title: '拒绝理由',  align: 'center',
		        },{
		            field: 'exchangeNum', title: '银行流水',  align: 'center',
					formatter:function(value, row, index){
						if(!!value){
							return value + '  -';
						}
						return '-';
	                }
		        },{
		            field: 'addTime', title: '录入时间',  align: 'center',
		        },{
		            field: 'remarks', title: '备注',  align: 'center',
		        },{
		            field: 'bankinfo', title: '提现银行信息',  align: 'center'
		        }
	        ];
			ordert._setTool('#order-toolbar');
			ordert._setSort('addTime','desc');
			var $ordert = ordert._init("ordertable", "/shop-users/withdraw/ajax/unionlist", columns, function(d){
				d.status=$('#js-choise-status').val();
				d.payWay=$('#js-choise-payway').val();
				d.startTime=$('#js-date-begin').val();
				d.endTime=$('#js-date-end').val();
//				d.userName=$('#js-user-name').val();
			});
			
			/*指定订单筛选条件，刷新订单列表*/
			$(".js-change-table-params").change(function(e){
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
			$("#js-date-begin").click(function(e){
				laydate(start);
			});
			$("#js-date-end").click(function(e){
				laydate(end);
			});
			$(document).on("click","#laydate_clear",function(e){
				$ordert._refresh();
			});
			
			$("#js-export-record").click(function(e){
				var h = '<div id="order-toolbar" class="btn-group">';
				h += '从&nbsp;<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-export-date-begin" placeholder="开始时间">';
				h += '&nbsp;至&nbsp;<input class="form-control layer-date js-change-table-params" style="width: 150px;vertical-align: baseline;" id="js-export-date-end" placeholder="结束时间">';
				h += '</div>';
				
				swal({
				  title: "选择导出记录日期区间",
				  text: h,
				  html:true,
				  type: "warning",
				  showCancelButton: true,
				  cancelButtonText:"取消",
				  confirmButtonColor: "#DD6B55",
				  confirmButtonText: "导出",
				  closeOnConfirm: false
				},
				function(){
					var e_start_date = $("#js-export-date-begin").val();
					var e_end_date = $("#js-export-date-end").val();
					
					$('#js-export-date-begin').css('border-color', '#D7D7D7');
					$('#js-export-date-end').css('border-color', '#D7D7D7');
					if(!!!e_start_date){
						$('#js-export-date-begin').css('border-color', '#f00');
					}else if(!!!e_end_date){
						$('#js-export-date-begin').css('border-color', '#D7D7D7');
						$('#js-export-date-end').css('border-color', '#f00');
					}else{
						
						var left = document.body.clientWidth/2 - 200;
						var top = document.body.clientHeight/2 - 200;
						window.open('/shop-users/withdraw/export?startDate=' + e_start_date + '&endDate=' + e_end_date,"_blank","toolbar=yes, location=yes, directories=no, status=yes, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400, left=" + left + ", top=" + top )
//						window.open('/shop-users/withdraw/export?startDate=' + e_start_date + '&endDate=' + e_end_date);
//						window.location = '/shop-users/withdraw/export?startDate=' + e_start_date + '&endDate=' + e_end_date;
					}
					
				});
				
				var export_start = {
					elem: "#js-export-date-begin",
					format: "YYYY-MM-DD",
					istoday: true,
					min: "2017-04-20",
					max: "2099-06-16",
					istime: false,
					istoday: true,
					choose: function(datas) {
						export_end.min = datas;
						export_end.start = datas;
					}
				};
				var export_end = {
					elem: "#js-export-date-end",
					format: "YYYY-MM-DD",
					min: "2017-04-21",
					max: "2099-06-16",
					istime: false,
					istoday: true,
					choose: function(datas) {
						export_start.max = datas;
					}
				};
				$("#js-export-date-begin").click(function(e){
					laydate(export_start);
				});
				$("#js-export-date-end").click(function(e){
					laydate(export_end);
				});
			});
	});
});
