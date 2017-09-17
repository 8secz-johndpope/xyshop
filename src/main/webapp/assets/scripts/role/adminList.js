define(function(require) {
    require.async(['jquery'], function() {

        require('jqueryUtils');
        var common = require('common');
        var table = require('tableUtils');
        var alert = require('alertUtils');

        $(document).ready(function(e) {
            $.ajax({
                url: "role/roleList",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                async: true,
                success: function(data) {
                    for (var key in data) {
                        $(".js-role").append('<option value="' + key + '">' + data[key] + "</option>");
                    }
                }
            });
        });

        var $common = new common();
        var t = new table();
        var $alert = new alert();
        var columns = [{
            field: 'adminName',
            title: '名字',
            align: 'center',
            sortable: true,
        }, {
            field: 'adminEmail',
            title: '登录帐号',
            align: 'center',
        }, {
            field: 'roleName',
            title: '帐号帐号',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                return [
                    '<a class="btn btn-outline btn-success js-update">修改帐号</a>',
                    '<a class="btn btn-outline btn-warning js-reset">重置密码</a>',
                    '<a class="btn btn-outline btn-danger js-delete">删除</a>'
                ].join('');
            },
            events: {
                /*修改帐号*/
                'click .js-update': function(e, value, row, index) {
                    $("#js-admin-name-u").val(row.adminName);
                    $("#js-admin-phone-u").val(row.adminEmail);
                    $("#js-admin-role-u").val(row.roleUuid);
                    $("#js-uuid").val(row.uuid);
                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                },
                //删除帐号
                'click .js-delete': function(e, value, row, index) {
                    $("#js-delete-uuid").val(row.uuid);
                    $("#js-delete-name").text(row.adminName);
                    $("#deleteModal").modal({
                        backdrop: 'static'
                    });
                },
                /*重置密码*/
                'click .js-reset': function(e, value, row, index) {
                    $("#js-reset-uuid").val(row.uuid);
                    $("#resetModal").modal({
                        backdrop: 'static'
                    });
                },
            },
        }];
        t._setSort('adminName', 'asc');
        var $t = t._init("table", "admin/pagelist", columns);

        /*添加帐号*/
        $(".js-add").click(function(e) {
            $('.form-control').val('');
            $("#myModal").modal({
                backdrop: 'static'
            });
        });
        $('#js-add-btn').click(function(e) {
            $.ajax({
                url: "admin/save",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    adminName: $('#js-admin-name').val(),
                    adminEmail: $("#js-admin-phone").val(),
                    adminPwd: $('#js-admin-password').val(),
                    roleUuid: $('#js-admin-role').val(),
                    roleName: $("#js-admin-role option:selected").text(),
                },
                dataType: "json",
                async: true,
                success: function(data) {
                    if (data.res == -1) {
                        $alert._alert("登录账号已存在");
                    } else {
                        $alert._addSuc();
                        $t._refresh();
                        $("#myModal").modal('hide');
                    }
                },
                error: function(e) {
                    $alert._alert("添加失败");
                },
                beforeSend: function(XMLHttpRequest) {
                    if (!$common._paramsEmpty($(this))) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                }
            });
        });
        /*修改帐号*/
        $('#js-update-btn').click(function(e) {
            $.ajax({
                url: "admin/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    uuid: $('#js-uuid').val(),
                    adminName: $('#js-admin-name-u').val(),
                    adminEmail: $("#js-admin-phone-u").val(),
                    roleUuid: $('#js-admin-role-u').val(),
                    roleName: $("#js-admin-role-u option:selected").text(),
                },
                dataType: "json",
                async: true,
                success: function(data) {
                    $alert._updateSuc();
                    $t._refresh();
                    $("#updateModal").modal('hide');
                },
                error: function(e) {
                    $alert._alert('修改失败');
                },
                beforeSend: function(XMLHttpRequest) {
                    if (!$common._paramsEmpty($(this))) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                }
            });
        });
        /*删除帐号*/
        $('#js-delete-btn').click(function(e) {
            $.ajax({
                url: "admin/delete",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    uuid: $('#js-delete-uuid').val(),
                },
                dataType: "json",
                async: true,
                success: function(data) {
                    $alert._deleteSuc();
                    $t._refresh();
                    $("#deleteModal").modal('hide');
                },
                error: function(e) {
                    $alert._alert("删除失败");
                }
            });
        });
        /*重置登录密码*/
        $(document).on("click", "#js-reset-btn", function(e) {
            var n = $("#js-new-pwd").val(),
                r = $("#js-replace-pwd").val();
            if (n != r) {
                $alert._alert("两次输入的密码不一致！");
                return;
            }

            $.ajax({
                url: "admin/resetpwd",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $('#js-reset-uuid').val(),
                    adminPwd: $("#js-new-pwd").val()
                },
                async: true,
                success: function(data) {
                    if (data == 1) {
                        $alert._alert("重置成功！");
                        $("#resetModal").modal('hide');
                    }
                },
                error: function(e) {
                    $alert._alert("密码重置失败！");
                },
                beforeSend: function(XMLHttpRequest) {
                    if (!$common._paramsEmpty($(this))) {
                        $alert._alert('请确认所有参数都填写完整!');
                        XMLHttpRequest.abort();
                    }
                }
            });
        });
        /*表单验证*/
        var validate = require('validateUtils');
        var $validate = new validate();
        $validate._init('form');
        $validate.equalTo("#js-replace-pwd", "#js-new-pwd");
        $validate.add(".form-control", "required");
    });
});