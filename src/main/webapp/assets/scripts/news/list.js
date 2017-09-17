define(function(require) {
	require.async(['jquery','icheck','ue'], function() {
			var common=require('common');
			var $common=new common();
			var edit=UE.getEditor('editor');
			require('jqueryUtils');
			require("imgTip");
			var alert=require('alertUtils')
			var $alert=new alert();
			var upload=require('uploadUtils');
			var $upload=new upload();
			var table=require('tableUtils');
			var t=new table();
			var columns=[{
	            field: 'title', title: '标题',  align: 'center'
	        },{
	            field: 'description', title: '简述',  align: 'center'
	        },{
	            field: 'img', title: '广告图片',  align: 'center',
	            formatter:function(value, row, index){
	            	if(!value){
	            		return '';
	            	}else{
	            		return "<img class='js-img-open' data-value='"+value+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+value+"?x-oss-process=image/resize,w_200'/>";
	            	}
                }
	        },{
	            field: 'status', title: '当前状态',  align: 'center',
	            formatter:function(value, row, index){
	            	switch (value) {
						case 'online':return "<span class='badge badge-success'>上线</span>";
						case 'offline':return "<span class='badge badge-danger'>下线</span>";
					}
					return "-";
                }
	        },{
	            field: 'pv', title: '浏览量',  align: 'center'
	        },{
	            field: 'hrefUrl', title: '链接地址',  align: 'center',
	            formatter:function(value, row, index){
	            	if (value.indexOf("http://")<0) {
						value="http://"+value;
					}
					return "<a target='_blank' href='"+value+"'><span class='badge badge-info'>查看</span></a>";
                }
	        },{
	            field: 'addTime', title: '添加时间',  align: 'center',
	        },{
	            field: 'operate',
	            title: '操作',
	            align: 'center',
	            formatter: function(value, row, index) {
	            	var opt=[];
                	opt.push('<a class="btn btn-outline btn-success js-update">修改</a>');
                	if (row.status=='offline') {
                		opt.push('<a class="btn btn-outline btn-info js-online">上架</a>');
					}else{
						opt.push('<a class="btn btn-outline btn-danger js-offline">下架</a>');
					}
                	opt.push('<a class="btn btn-outline btn-danger js-delete">删除</a>');
                	return opt.join(" ");
	            },
	            events: {
			        'click .js-update': function (e, value, row, index) {
			        	  $("#js-update-uuid").val(row.uuid);
			        	  $('#js-add-img-show').html("<img id='js-add-img'   data-value='"+row.img+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+row.img+"?x-oss-process=image/resize,w_200'/>");
			        	  $('#js-update-btn').removeClass('hide');
			        	  $('#js-add-btn').addClass('hide');
			        	  $("input[name='status'][value='"+row.status+"']").iCheck('check');
			        	  $("input[name='type'][value='"+row.type+"']").iCheck('check');
			        	  $('#js-add-title').val(row.title);
			        	  $('#js-add-desc').val(row.description);
			        	  $('#js-add-url').val(row.hrefUrl);
			        	  if (row.type=='selfUrl') {
			        		  $('#js-outerUrl-box').addClass('hide');
			        		  $('#js-selfUrl-box').removeClass('hide');
			        		  $.get(row.hrefUrl, function(data){
					        		var start=data.indexOf("<body>"),end=data.indexOf('</body>');
					        		edit.setContent(data.substring(start,end));
			        		  });
			        	  }else{
			        		  $('#js-outerUrl-box').removeClass('hide');
			        		  $('#js-selfUrl-box').addClass('hide');
			        	  }
						  $("#addModal").modal({backdrop:'static'});
			        },
			        'click .js-online': function (e, value, row, index) {
			        	$alert._warning("确认上架操作？","该操作将资讯\""+row.title+"\"上架",function(){
			        		$.ajax({
								url:"news/ajax/online",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
								},
								async:true,success:function(data){
									if(data[0]=="success"){
										$alert._strSuc("资讯上架成功");
		    							$t._refresh();
									}else{
										$alert._alert("操作失败");
									}
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        	});
			        },
			        'click .js-delete': function (e, value, row, index) {
			        	$alert._warning("确认删除操作？","该操作将资讯\""+row.title+"\"删除",function(){
			        		$.ajax({
								url:"news/ajax/del",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
								},
								async:true,success:function(data){
									if(data[0]=="success"){
										$alert._strSuc("资讯删除成功");
		    							$t._refresh();
									}else{
										$alert._alert("操作失败");
									}
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        	});
			        },'click .js-offline': function (e, value, row, index) {
			        	$alert._warning("确认操作？","该操作将资讯\""+row.title+"\"下架",function(){
			        		$.ajax({
								url:"news/ajax/offline",
								contentType: "application/x-www-form-urlencoded; charset=utf-8", 
								type: "post",
								dataType:"json",
								data:{
									uuid:row.uuid,
								},
								async:true,success:function(data){
									if(data[0]=="success"){
										$alert._strSuc("资讯下架成功");
		    							$t._refresh();
									}else{
										$alert._alert("操作失败");
									}
								},error:function(){
									$alert._alert("操作失败");
								}
							});
			        	});
			        },
			    },
	        }];
			t._setSort('addTime','desc');
			var $t = t._init("table","news/list",columns);
			
			/*添加商城资讯*/
			var imgUP=null;
			var imgUP=null;
			$('#addModal').on('shown.bs.modal', function (e) {
				imgUP=$upload._init(imgUP,'#js-add-img-up',function(file, response){
					$("#js-add-img-show").html("<img  id='js-add-img'  data-value='"+response.url+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+response.url+"'/></div>");
				});
			});
			
			$(document).on("click","#js-add",function(e){
				$("#js-selfUrl-box").addClass('hide');
				$("#js-outerUrl-box").removeClass('hide');
				$('#js-update-btn').addClass('hide');
				$('#js-add-btn').removeClass('hide');
				$("input[name='type'][value='outerUrl']").iCheck('check');
				$('.form-control').val('');
				
				$("#addModal").modal({
					backdrop:'static'
				});
			});
			
			$(document).on("click","#js-add-btn",function(e){
				var title=$('#js-add-title').val();
				var desc=$('#js-add-desc').val();
				var url=$('#js-add-url').val();
				if (!$common._noEmpty(title)) {
					$alert._alert("资讯标题不能为空");
            		return;
				}
				if ("outerUrl"==$("input[name='type'][checked='checked']").val()&&!$common._noEmpty(url)) {
					$alert._alert("资讯链接不能为空");
            		return;
				}
				$.ajax({
					url:"news/ajax/add",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					data:{
						title:title,
						desc:desc,
						img:$("#js-add-img").data('value'),
						status:$("input[name='status'][checked='checked']").val(),
						type:$("input[name='type'][checked='checked']").val(),
						url:url,
						info:edit.getContent()
					},
					async:true,success:function(data){
						if (data=="success") {
							$alert._strSuc("成功添加新的商城资讯");
							$t._refresh();
							$("#addModal").modal('hide');
						}else{
							$alert._alert("商城资讯添加失败");
						}
					},error:function(){
						$alert._alert("商城资讯添加失败");
					}
				});
			});
			/*修改资讯内容*/
			$(document).on("click","#js-update-btn",function(e){
				var title=$('#js-add-title').val();
				var desc=$('#js-add-desc').val();
				var url=$('#js-add-url').val();
				if (!$common._noEmpty(title)) {
					$alert._alert("资讯标题不能为空");
            		return;
				}
				if (!$common._noEmpty(url)) {
					$alert._alert("资讯链接不能为空");
            		return;
				}
				$.ajax({
					url:"news/ajax/update",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					data:{
						title:title,
						desc:desc,
						img:$("#js-add-img").data('value'),
						status:$("input[name='status'][checked='checked']").val(),
						type:$("input[name='type'][checked='checked']").val(),
						url:url,
						info:edit.getContent(),
						uuid:$("#js-update-uuid").val()
					},
					async:true,success:function(data){
						if (data=="success") {
							$alert._strSuc("成功修改商城资讯信息");
							$t._refresh();
							$("#addModal").modal('hide');
						}else{
							$alert._alert("商城资讯修改失败");
						}
					},error:function(){
						$alert._alert("商城资讯添加失败");
					}
				});
			});
			
			$(document).on('ifChecked', 'input.radio',function(event){
				$("input[name='"+$(this).attr('name')+"']").removeAttr("checked");
				$(this).attr("checked","checked");
			});
			$('input.radio').iCheck({
				    checkboxClass: 'icheckbox_square-green',
				    radioClass: 'iradio_square-green',
				    increaseArea: '20%' // optional
			});
			$(document).on("ifChecked","input[name='type']",function(e){
				edit.setContent('');
				switch ($(this).val()) {
				case 'outerUrl':{
					$("#js-outerUrl-box").removeClass('hide');
					$("#js-selfUrl-box").addClass('hide');
				};break;
				case 'selfUrl':{
					$("#js-outerUrl-box").addClass('hide');
					$("#js-selfUrl-box").removeClass('hide');
				};break;
			}
			});
			
	});
});