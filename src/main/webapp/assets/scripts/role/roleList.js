define(function(require) {
    require.async(['jquery', 'icheck', 'ztree'], function() {
        var jQuery = $;

        var common = require('common');
        var $common = new common();

        require('jqueryUtils');

        var alert = require('alertUtils')
        var $alert = new alert();

        var table = require('tableUtils');
        var t = new table();

        // 存放权限
        var powers = new Array();
        // 锁定
        var lock = false;

        var setting = {
            check: {
                enable: true
            },
            data: {
                key: {
                    name: "menuName",
                },
                simpleData: {
                    enable: true,
                    idKey: "uuid",
                    pIdKey: "parentUuid",
                    rootPId: "root"
                }
            }
        };

        $.ajax({
            url: "role/menulist",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            type: "post",
            dataType: "json",
            async: true,
            success: function(data) {
                $.fn.zTree.init($("#ztreeMenu"), setting, data);
            }
        });
        // 禁止
        $("#ztreeMenu").delegate("a", 'click', function() { return false; });


        var columns = [{
            field: 'roleName',
            title: '角色名字',
            align: 'center',
            sortable: true,
        }, {
            field: 'roleDescription',
            title: '角色描述',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                if (row.power == 1) {
                    return [
                        '<a class="btn btn-outline btn-success js-update">修改权限</a>',
                        '<a class="btn btn-outline btn-danger js-delete">删除</a>'
                    ].join('');
                } else {
                    return "--";
                }
            },
            events: {
                /*修改角色*/
                'click .js-update': function(e, value, row, index) {
                    $('input[name="power"]').iCheck('uncheck');
                    $('#js-update-btn').removeClass('hide');
                    $('#js-add-btn').addClass('hide');
                    $('#js-uuid').val(row.uuid);
                    $("#js-role-name").val(row.roleName);
                    $("#js-role-description").val(row.roleDescription);
                    powers = new Array();
                    $.ajax({
                        url: "role/role-hasmenu",
                        contentType: "application/x-www-form-urlencoded; charset=utf-8",
                        type: "post",
                        data: {
                            roleId: row.uuid,
                        },
                        dataType: "json",
                        async: true,
                        success: function(data) {
                            var zTree = $.fn.zTree.getZTreeObj("ztreeMenu");
                            for (var int = 0; int < data.length; int++) {
                                var node = zTree.getNodeByParam("uuid", data[int], null);
                                if (!!node) {
                                    if (node.parent != "root" || (node.parent == "root" && node.children == null)) {
                                        zTree.checkNode(node, true, true);
                                    }
                                }
                            }
                        }
                    });
                    $("#myModal").modal({
                        backdrop: 'static'
                    });
                },
                //删除角色
                'click .js-delete': function(e, value, row, index) {
                    $("#js-delete-uuid").val(row.uuid);
                    $("#js-delete-name").text(row.roleName);
                    $("#deleteModal").modal({
                        backdrop: 'static'
                    });
                }
            },
        }];

        t._setSort('roleName', 'asc');
        var $t = t._init("table", "role/pagelist", columns);

        /**
         * 取消修改
         */
        $("#js-modal-cancel").click(function(e) {
            $("#myModal").modal('hide');
            var zTree = $.fn.zTree.getZTreeObj("ztreeMenu");
            var nodes = zTree.getCheckedNodes(true);
            for (var i = 0, l = nodes.length; i < l; i++) {
                zTree.checkNode(nodes[i], false, false);
            }
        });

        /*添加角色*/
        $(".js-add").click(function(e) {
            $('#js-add-btn').removeClass('hide');
            $('#js-update-btn').addClass('hide');
            $('input[name="power"]').iCheck('uncheck');
            $('.form-control').val('');
            powers = new Array();
            $("#myModal").modal({
                backdrop: 'static'
            });
        });
        $('#js-add-btn').click(function(e) {
            if (lock) {
                return false;
            }
            luck = true;
            var zTree = $.fn.zTree.getZTreeObj("ztreeMenu");
            var nodes = zTree.getCheckedNodes(true);
            for (var i = 0; i < nodes.length; i++) {
                powers.push(nodes[i].uuid);
            }

            if (powers.length == 0) {
                alert('权限不能为空！');
                return;
            }
            $.ajax({
                url: "role/save",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    roleName: $('#js-role-name').val(),
                    roleDesc: $('#js-role-description').val(),
                    menus: powers.join(',')
                },
                dataType: "json",
                async: true,
                success: function(data) {
                    $alert._addSuc();
                    $t._refresh();
                    luck = false;
                    $("#myModal").modal('hide');
                }
            });
        });
        /*修改角色*/
        $('#js-update-btn').click(function(e) {
            if (lock) {
                return false;
            }
            lock = true;
            var zTree = $.fn.zTree.getZTreeObj("ztreeMenu");
            var nodes = zTree.getCheckedNodes(true);
            for (var i = 0; i < nodes.length; i++) {
                powers.push(nodes[i].uuid);
            }

            if (powers.length == 0) {
                alert('权限不能为空！');
                return;
            }
            $.ajax({
                url: "role/update",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    uuid: $('#js-uuid').val(),
                    roleName: $('#js-role-name').val(),
                    roleDesc: $('#js-role-description').val(),
                    menus: powers.join(',')
                },
                dataType: "json",
                async: true,
                success: function(data) {
                    $alert._updateSuc();
                    $t._refresh();
                    lock = false;
                    $("#myModal").modal('hide');
                }
            });
        });
        /*删除角色*/
        $('#js-delete-btn').click(function(e) {
            $.ajax({
                url: "role/delete",
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
                }
            });
        });
    });
});