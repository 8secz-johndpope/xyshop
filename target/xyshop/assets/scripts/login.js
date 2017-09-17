define(function(require) {
	  require.async('jquery', function() {
		  $(".btn-login").click(function(){
			  var n=$("#adminEmail").val(),p=$("#adminPwd").val();
			  $.ajax({
					url:"admin/login",
					contentType: "application/x-www-form-urlencoded;charset=utf-8", 
					type: "POST",
					data:{
						adminEmail:n,
						adminPwd:p
					},
					async:true,success:function(data){
						if(data == "logerr") {
                            alert('用户不存在或者密码错误！');
						} else {
                            $("#login").submit();
						}
					}
			  	});
		  });
		  $(document).keydown(function (event) {
			  if(event.keyCode==13){
				  $(".btn-login").click();  
			  }
		  });
	  });
});