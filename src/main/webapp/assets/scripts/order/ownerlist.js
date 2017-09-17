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
            field: 'userName', title: '下单用户',  align: 'center'
        },{
            field: 'realName', title: '认证名',  align: 'center'
        },{
            field: 'sceneid', title: '用户ID',  align: 'center',
            formatter:function(value, row, index){
            	if(!value){
            		return '-';
            	}
				return value + '00';
            }
        },{
            field: 'phoneNum', title: '手机号',  align: 'center',
            formatter:function(value, row, index){
            	if(!value){
            		return '-';
            	}
				return value;
            }
        },{
            field: 'selfGoodsName', title: '商品名',  align: 'center',
        },{
            field: 'totalPrice', title: '支付金币',  align: 'center',
            formatter:function(value, row, index){
            	if($common._noEmpty(value))return value;else return "-";
            }
        }
        ,{
            field: 'orderStatus', title: '订单状态',  align: 'center',
            formatter:function(value, row, index){
            	switch (value) {
					case 'waitPay':return "<span class='badge'>待确认</span>";
					case 'paySuccess':return "<span class='badge badge-info'>完成</span>";
					case 'payFail':return "<span class='badge badge-info'>支付失败</span>";
				}
				return "-";
            }
        }
        ,{
            field: 'addTime', title: '下单时间',  align: 'center',
        },{
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
            	var opt=[];
            	
        		if(row.orderStatus == 'waitPay'){
        			opt.push('<a value="' + row.orderNo + '" class="btn btn-outline btn-danger js-resetmsg">重发微信确认消息</a>');
        		};
            	
            	if(row.orderStatus == 'paySuccess'){
            		
                	opt.push('<a id="js-print-'+index+'" class="btn btn-outline btn-info js-print J_menuItem js-print_owner">打印订单</a>');
            	};
            	
            	return opt.join(" ");
            },
            events: {
		        'click .js-print_owner': function (e, value, row, index) {
		        	swal({
	        		  title: "正在打印",
	        		  width:1000,
	        		  text: '<iframe style="display:none;" src="invoice/ownergoods.html?u='+row.uuid+'"  frameborder="0"></iframe>',
	        		  html: true
	        		});
		        },
		        'click .js-resetmsg': function (e, value, row, index) {
		        	var url = $('#wx_domain').val();
		            $.ajax({
		        	   async:false,
		        	   url: url + 'notify/highselfgoods.html?data=' + row.orderNo,
		        	   type: "get",
		        	   dataType: 'jsonp',
		        	   jsonp: 'callback',
		        	   jsonpCallback:"success_jsonpCallback",
		        	   timeout: 5000,
		        	   success: function (json){
		        		   console.log('模板消息发送成功');
		        		   $alert._alert('提交成功');
		        		   $("#myModal").modal('hide');
		        		   console.log(json.status);
		        	   },
		        	   error: function(xhr){
		        		   console.log(xhr);
		        	   }
		            });
		        }
            },
        }];
		ordert._setTool('#order-toolbar');
		ordert._setSort('addTime','desc');
		var $ordert = ordert._init("ordertable","/shop-orders/ownerorder/list",columns,function(d){
			d.startTime=$('#js-date-begin').val();
			d.endTime=$('#js-date-end').val();
            d.guuid = $('#js-choise-goods').val();
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
		
		$("#js-buy-selfgoods").click(function(e) {
			var h = '<option value="" selected="selected">请选择自营产品</option>';
			$.ajax({
				url:"/shop-goods/selfgoods/listhigh",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				type: "post",
				dataType:"json",
				async:false,
				success:function(data){
					if(data.length > 0){
						$.each(data, function(index, obj){
//							if(obj.price >= 10000){
								h += '<option value="' + obj.uuid + '" price="' + obj.price + '" desc="' + obj.content + '">' + obj.name + ' (' + obj.price + '金币)</option>';
//							}
						});
					}
					$('#js-selfgoods').html(h);
					
					$("#myModal").modal({
						backdrop: 'static'
					});
					
					$('#user-sceneid').val('');
					$('#userUuid').val('');
					$('#js-selfgoods').val('');
					$('#selgfoods_num').val('1');
					$('#coinTotal').val('0');
					$('#userName').html("");
					$('#userCoin').html("");
				},error:function(){
//						$alert._alert("查询会员信息失败");
				}
			});
		});
		
		$('#js-user-find').click(function(){
			var user_sceneid = $('#user-sceneid').val();
			if(!user_sceneid){
				$alert._alert("请输入会员ID");
				return;
			}
			
			$.ajax({
				url:"/shop-users/users/ajax/sceneid",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				type: "post",
				dataType:"json",
				data:{
					sceneid:user_sceneid.substr(0, user_sceneid.length-2),
				},
				async:false,
				success:function(data){
					if('0' == data){
						$alert._alert("未查询到此会员信息,请检查输入");
					}else{
						$('#userName').html("用户名: " + data.name);
						$('#userCoin').html("金币: " + data.coin);
						$('#userUuid').val(data.uuid);
					}
				},error:function(){
					$alert._alert("查询会员信息失败");
				}
			});
		});
		
		$('#js-selfgoods').on('change', function(a, b){
			$('#desc').html($("#js-selfgoods").find("option:selected").attr('desc'));
			countCoin();
		});
		$('#selgfoods_num').change(function(a, b){
			var num = $('#selgfoods_num').val();
			if(num < 1){
				$('#selgfoods_num').val('1');
				return false;
			}else{
				countCoin();
			}
		});
		
		var countCoin = function(){
			var selfgoods_id = $('#js-selfgoods').val();
			var price = $("#js-selfgoods").find("option:selected").attr('price');
			var num = $('#selgfoods_num').val();
			$('#coinTotal').val(price * num);
		}
		
		$('#js-selfgoods-submit').click(function(){
			var userUuid = $('#userUuid').val();
			var selfgoods_id = $('#js-selfgoods').val();
			var num = $('#selgfoods_num').val();
			
			if(!userUuid){
				$alert._alert("请先查询会员ID");
				return;
			}
			if(!selfgoods_id){
				$alert._alert("请选择自营产品");
				return;
			}
			if(!num || num < 1){
				$alert._alert("请输入正确的购买数量");
				return;
			}
			
			var url = $('#wx_domain').val();
            $.ajax({
        	   async:false,
        	   url: url + 'selfGoods/waitbuy.html?userUuid=' + userUuid + '&selfGoodsUuid=' + selfgoods_id + '&selfGoodsCount=' + num,
        	   type: "get",
        	   dataType: 'jsonp',
        	   jsonp: 'callback',
        	   jsonpCallback:"success_jsonpCallback",
        	   timeout: 5000,
        	   success: function (json){
        		   if(json.status == 'true'){
        			   templateNofity(json.msg);
        		   }else{
        			   $alert._alert(json.msg);
        		   }
        	   },
        	   error: function(xhr){
        		   console.log(xhr);
        	   }
            });
			
			//发送模板消息
	        var templateNofity = function(data){
	        	var url = $('#wx_domain').val();
	            $.ajax({
	        	   async:false,
	        	   url: url + 'notify/highselfgoods.html?data=' + data.join(','),
	        	   type: "get",
	        	   dataType: 'jsonp',
	        	   jsonp: 'callback',
	        	   jsonpCallback:"success_jsonpCallback",
	        	   timeout: 5000,
	        	   success: function (json){
	        		   $alert._alert('提交成功');
	        		   $("#myModal").modal('hide');
	        	   },
	        	   error: function(xhr){
	        		   console.log(xhr);
	        	   }
	            });
	        };
	        
		})
		
	});
});