/*系统通知设置*/
define(function(require) {
	require.async(['jquery','bootstrap','ue'], function() {
			var edit=UE.getEditor('editor');
			var common=require('common');
			var $common=new common();
			var alert=require('alertUtils')
			var $alert=new alert();
			$(document).ready(function(e){
				$.ajax({
					url:"/huatuo-other/notice/info",
					contentType: "application/x-www-form-urlencoded; charset=utf-8", 
					type: "post",
					dataType:"json",
					async:true,success:function(data){
						$("#serverNoticePage").html(data["serverNotice"]);
						$("#cureAvoidPage").html(data["cureAvoid"]);
						$("#orderNoticePage").html(data["orderNotice"]);
						$("#otherInfoPage").html(data["otherInfo"]);
						$("#uuid").val(data["uuid"]);
					},error:function(){
						$alert._alert("数据初始化失败,请重新加载");
					}
				});
			});
			/*修改窗口*/
			$(".js-update").click(function(e){
				$("#updateType").val($(this).data("page"));
				edit.setContent($("#"+$(this).data("page")+"Page").html());
				$("#myModal").modal({
					  backdrop:'static'
				  });
			});
			/*保存修改*/
			 $(document).on("click","#save",function(e){
				  $.ajax({
						url:"/huatuo-other/notice/save",
						contentType: "application/x-www-form-urlencoded; charset=utf-8", 
						type: "post",
						dataType:"json",
						data:{
							uuid:$("#uuid").val(),
							param:$("#updateType").val(),
							content:edit.getContent()
						},
						async:true,success:function(data){
							$("#myModal").modal('hide');
							$("#"+$("#updateType").val()+"Page").html(edit.getContent());
							$alert._alert("修改成功");
						},error:function(){
							$("#myModal").modal('hide')
							$alert._alert("操作失败");
						}
					});
			  });
	});
});