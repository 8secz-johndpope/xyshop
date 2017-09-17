define(function(require) {
	require.async(['jquery','contabs'], function() {
			var common=require('common');
			var $common=new common();
			require('jqueryUtils');
			require("imgTip");
			var alert=require('alertUtils')
			var $alert=new alert();
			var table=require('tableUtils');
			/*用户表表*/
			var usert=new table();
			var columns=[
			{
	            field: 'sceneid',
	            title: '会员ID',
	            align: 'center',
	            formatter: function(value, row, index) {
	                return value + "00";
	            }
	        },{
            field: 'headImg', title: '用户头像',  align: 'center',
            formatter:function(value, row, index){
            	if($common._noEmpty(value)){
            		return  "<img class='js-img-open' src='"+value+"'/>";
            	}
				return "-";
            }
	        },{
	            field: 'name', title: '用户名',  align: 'center',
	        },{
	            field: 'birthday', title: '出生日期',  align: 'center',visible:false,
	        },{
	            field: 'gender', title: '性别',  align: 'center',
	        },{
	            field: 'phoneNum', title: '手机号',  align: 'center',
	        },{
	            field: 'score', title: '当前积分',  align: 'center',
	        },{
	            field: 'coin', title: '当前金币',  align: 'center',
	        },{
	            field: 'commission', title: '佣金',  align: 'center',
	        },{
	            field: 'role', title: '当前角色',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'bronze':return "<span class='badge badge-warning'>铜牌会员</span>";
						case 'silver':return "<span class='badge badge-primary'>银牌会员</span>";
						case 'gold':return "<span class='badge badge-danger'>金牌会员</span>";
					}
					return "-";
                }
	        },{
	            field: 'alipayAccount', title: '绑定的提现支付宝账户',  align: 'center',
	        },{
	            field: 'refUserName', title: '推荐人会员名',  align: 'center',
	        }, {
	            field: 'refsceneid',
	            title: '推荐人ID',
	            align: 'center',
	            formatter: function(value, row, index) {
	                if ($common._noEmpty(value)) {
	                	return value + "00";
	                }
	                return "-";
	            }
	        },{
	            field: 'realName', title: '真实姓名',  align: 'center',visible:false,
	        },{
	            field: 'cardId', title: '身份证号',  align: 'center',visible:false,
	        },{
	            field: 'bankNo', title: '银行卡号',  align: 'center',visible:false,
	        },{
	            field: 'bankInfo', title: '银行的开户行信息',  align: 'center',visible:false,
	        },{
	            field: 'familyAddress', title: '现家庭住址的省市区',  align: 'center',visible:false,
	        },{
	            field: 'addressDetail', title: '现家庭住址',  align: 'center',visible:false,
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	var opt=[];
	            	opt.push('<a class="btn btn-outline btn-success js-update">修改隶属关系</a>');
	            	return opt.join(" ");
	            },events: {
			        'click .js-update': function (e, value, row, index) {
			        	  $("#js-update-uuid").val(row.uuid);
			        	  $("#user-uuid").val(row.refUserUuid);
			        	  $("#user-name").val(row.refUserName);
						  $("#updateModal").modal({backdrop:'static'});
			        },
			    },
	        }];
			usert._setSort('addTime','desc');
			var $usert = usert._init("table","/shop-users/users/list",columns,function(d){
				d.role=$('#js-choise-role').val();
				d.startTime=$('#js-date-begin').val();
				d.endTime=$('#js-date-end').val();
			});
			/*指定用户筛选条件，刷新用户列表*/
			$(".js-change-table-params").change(function(e){
				$usert._refresh();
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
					$usert._refresh();
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
					$usert._refresh();
				}
			};
			$("#js-date-begin").click(function(e){
				laydate(start);
			});
			$("#js-date-end").click(function(e){
				laydate(end);
			});
			$(document).on("click","#laydate_clear",function(e){
				$usert._refresh();
			});
			
			  $(document).on("click","#js-user-select-btn",function(e){
				  $("#js-user-select").empty();
				  $.ajax({
						url:"/shop-users/users/ajax/idlist",
						contentType: "application/x-www-form-urlencoded; charset=utf-8", 
						type: "post",
						dataType:"json",
						data:{
							name:$("#user-name").val()
						},
						async:true,success:function(data){
							for (var key in data) { 
								$("#js-user-select").append('<option value="'+key+'">'+data[key]+'</option>');
							} 
							$("#user-selectBox").removeClass('hide');
						}
					  });
			  }); 
			  $(document).on("click","#js-user-sure",function(e){
				  $("#user-selectBox").addClass('hide');
				  $("#user-uuid").val($("#js-user-select").val().split('-')[0]);
				  $("#user-name").val($("#js-user-select").find("option:selected").text());
			  });
			  
			  $(document).on("click","#js-update-btn",function(e){
				  var refUserUuid=$('#user-uuid').val();
				  var refUserName=$('#user-name').val();
				  if(!$common._noEmpty(refUserUuid)){
					  $alert._alert('上级会员不能为空');
					  return;
				  }
				  $.ajax({
						url:"/shop-users/users/ajax/updaterefuser",
						contentType: "application/x-www-form-urlencoded; charset=utf-8", 
						type: "post",
						dataType:"json",
						data:{
							refUserName:refUserName,
							refUserUuid:refUserUuid,
							uuid:$('#js-update-uuid').val(),
						},
						async:true,success:function(data){
							if(data[0]=='success'){
								$alert._alert('会员隶属关系修改成功');
								$("#updateModal").modal('hide');
								$usert._refresh();
							}else{
								$alert._alert('会员隶属关系修改失败');
							}
						},error:function(e){
							$alert._alert('会员隶属关系修改失败');
						}
					  });
			  });
	});
});