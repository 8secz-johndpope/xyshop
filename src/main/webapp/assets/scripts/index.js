define(function(require) {
    require('jquery');
    require('bootstrap');
    require('metisMenu');
    require('slimscroll');

    require('hplus');
    require('contabs_index');
    require('pace');
    var alert = require('alertUtils')
    var $alert = new alert();
    $(document).on("click", ".js-index-update-pwd", function(e) {
        $("#pwdIndexModal").modal();
    });
    /*修改登录密码*/
    $(document).on("click", "#js-index-pwd-btn", function(e) {
        var o = $('#js-index-old-pwd').val(),
            n = $("#js-index-new-pwd").val(),
            r = $("#js-index-replace-pwd").val();
        if (n != r) {
            $alert._alert("两次输入的密码不一致！");
            return;
        }
        //  if (n.length<6) {
        // 	$alert._alert("密码的长度必须大于6位！");
        // 	return;
        //  }
        $.ajax({
            url: "admin/updpwd",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            type: "post",
            dataType: "json",
            data: {
                oldPass: $('#js-index-old-pwd').val(),
                newPass: $("#js-index-new-pwd").val()
            },
            async: true,
            success: function(data) {
                if (data == -1) {
                    $alert._alert('原始密码不对！');

                } else if (data == 1) {
                    $alert._alert("修改成功！");
                    $("#pwdIndexModal").modal('hide');
                }
            },
            error: function() {
                $alert._alert("修改失败！");
            }
        });
    });
});