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
			var columns=[{
	            field: 'orderNo', title: '订单号',  align: 'center',
	        },{
	            field: 'userName', title: '用户',  align: 'center',
	        },{
	            field: 'goodsName', title: '商品名',  align: 'center',
	        },{
	            field: 'goodsSalePrice', title: '购买时商品单价',  align: 'center',
	        },{
	            field: 'buyNum', title: '购买数量',  align: 'center',
	        },{
	            field: 'totalPrice', title: '订单总价',  align: 'center',
	            formatter:function(value, row, index){
	            	if($common._noEmpty(value))return "￥"+value;else return "-";
                }
	        },{
	            field: 'totalScore', title: '花费的积分',  align: 'center',
	            formatter:function(value, row, index){
	            	if($common._noEmpty(value))return value;else return "-";
                }
	        },{
	            field: 'freight', title: '运费',  align: 'center',
	        },{
	            field: 'shipInfo', title: '配送地址信息',  align: 'center',visible:false,
	        },{
	            field: 'status', title: '订单状态',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'waitPay':return "<span class='badge'>待支付</span>";
						case 'waitDelivery':return "<span class='badge badge-info'>待发货</span>";
						case 'waitTake':return "<span class='badge badge-info'>待收货</span>";
						case 'waitJudge':return "<span class='badge badge-success'>待评价</span>";
						case 'judged':return "<span class='badge badge-success'>已评价</span>";
					}
						return "-";
                }
	        },{
	            field: 'payWay', title: '支付方式',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'coin':return "<span class='badge badge-warning'>金币支付</span>";
						case 'weixin':return "<span class='badge badge-primary'>微信支付</span>";
						case 'alipay':return "<span class='badge badge-danger'>支付宝</span>";
						case 'unionPay':return "<span class='badge badge-success'>银联支付</span>";
					}
					return "-";
                }
	        },{
	            field: 'type', title: '订单类型',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'shop':return "<span class='badge badge-primary'>商城订单</span>";
						case 'score':return "<span class='badge badge-success'>积分兑换订单</span>";
					}
					return "-";
                }
	        },{
	            field: 'addTime', title: '下单时间',  align: 'center',
	        },{
	            field: 'remarks', title: '备注信息',  align: 'center',visible:false,
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	var opt=[];
	            	switch (row.status) {
	            		case 'waitPay':break;
						case 'waitDelivery':opt.push('<a class="btn btn-outline btn-success js-wuliuModal">填写快递信息</a>');break;
						default:opt.push('<a class="btn btn-outline btn-info js-delivery">查看物流信息</a>');break;
	            	}
	            	
                	return opt.join(" ");
	            },
	            events: {
			        'click .js-wuliuModal': function (e, value, row, index) {
			        	  $("#js-order-no").val(row.orderNo);
						  $("#wuliuModal").modal({backdrop:'static'});
			        },
			        'click .js-delivery': function (e, value, row, index) {
			        	$.ajax({
							url:"/shop-orders/order/wuliu",
							contentType: "application/x-www-form-urlencoded; charset=utf-8", 
							type: "post",
							dataType:"json",
							data:{
					  			orderNo:row.orderNo,
							},
							async:true,success:function(data){
								$("#wuliuinfo").html('');
								if (data[0]=='error') {
									$("#wuliuinfo").append('<a class="list-group-item" ><label>没有找到相关物流信息</label></a>');
								}else{
									for (var int = data.length-1; int >=0; int--) {
										$("#wuliuinfo").append('<a class="list-group-item" ><label>时间:</label><span>'+data[int]["AcceptTime"]+'</span></a>');
										$("#wuliuinfo").append('<a class="list-group-item" ><label>达到:</label><span>'+data[int]["AcceptStation"]+'</span></a>');
									}
								}
								$("#wuliuinfoModal").modal();
							}
						  });
			        },
			    },
	        }];
			ordert._setTool('#order-toolbar');
			ordert._setSort('addTime','desc');
			var $ordert = ordert._init("ordertable","/shop-orders/order/list",columns,function(d){
				d.goodsUuid=$('#js-goods-uuid').val();
				d.status=$('#js-choise-status').val();
				d.payWay=$('#js-choise-payway').val();
				d.startTime=$('#js-date-begin').val();
				d.endTime=$('#js-date-end').val();
				d.goodsName=$('#js-goods-name').val();
				d.userName=$('#js-user-name').val();
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
			$('input.radio').iCheck({
			    checkboxClass: 'icheckbox_square-green',
			    radioClass: 'iradio_square-green',
			    increaseArea: '20%' // optional
			});
			$(document).on('ifChecked', 'input.radio',function(event){
				$("input[name='"+$(this).attr('name')+"']").removeAttr("checked");
				$(this).attr("checked","checked");
			});
			/*填写物流信息*/
			$('#js-delivered-btn').click(function(e){
				var wuliu=$("input[name='wuliu'][checked]").val();
				var wuliuName=$("input[name='wuliu'][checked='checked']").parent().next().text();
				var wuliuno=$('#p-wuliudanhao').val();
				if (wuliuno) {
					$alert._alert('物流单号不能为空');
				}
				$alert._warning("确认信息填写无误？","该操作将修改订单\""+$('#js-order-no').val()+"\"的物流信息为："+wuliuName+","+wuliuno,function(){
	        		$.ajax({
						url:"/shop-orders/order/addwuliu",
						contentType: "application/x-www-form-urlencoded; charset=utf-8", 
						type: "post",
						dataType:"json",
						data:{
							orderNo:$('#js-order-no').val(),
							logisticsName:wuliuName,
							logisticsCode:wuliu,
							logisticsNo:wuliuno
						},
						async:true,success:function(data){
							if (data[0]=='success') {
								$alert._strSuc("物流信息填写成功");
								$ordert._refresh();
								$("#wuliuModal").modal('hide');
							}else{
								$alert._alert("操作失败");
							}
						},error:function(){
							$alert._alert("操作失败");
						},beforeSend:function(XMLHttpRequest){
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