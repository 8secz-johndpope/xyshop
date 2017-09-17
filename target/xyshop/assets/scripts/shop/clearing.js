define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');

        var money = new table();
        var c_columns = [{
            field: 'shopName',
            title: '申请店铺',
            align: 'center',
        }, {
            field: 'ownerPhone',
            title: '店长电话',
            align: 'center',
        }, {
            field: 'oldCartId',
            title: '修改前-银行卡帐号',
            align: 'center',
        }, {
            field: 'oldCartUName',
            title: '修改前-持卡人姓名',
            align: 'center',
        }, {
            field: 'oldCartName',
            title: '修改前-银行',
            align: 'center',
        } , {
            field: 'cartId',
            title: '银行卡帐号',
            align: 'center',
        }, {
            field: 'cartUName',
            title: '持卡人姓名',
            align: 'center',
        }, {
            field: 'cartName',
            title: '银行',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-success js-wallet-edit">修改结算信息</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-wallet-edit': function(e, value, row, index) {
                    $("#js-update-uuid").val(row.uuid);
                    $("#js-update-old-cartId").val(row.cartId);
                    $("#js-update-old-username").val(row.cartUName);
                    $("#js-update-old-cartName").val(row.cartName);

                    $("#js-update-cartId").val("");
                    $("#js-update-username").val("");
                    $("#js-update-cartName").val("");

                    $("#js-update-shopname").val(row.shopName);

                    $("#updateModal").modal({
                        backdrop: 'static'
                    });
                }
            },
        }];
        money._setTool('#toolbar');
        money._setSort('addTime', 'desc');
        var $money = money._init("table", "/shop-supplier/walletupdate/ajax/list", c_columns, function(p) {
            p.status = "success";
        });

        $("#js-update-btn").click(function(e) {
            $.ajax({
                url: "/shop-supplier/walletupdate/ajax/save-admin",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                data: {
                    'oldCartId': $("#js-update-old-cartId").val(),
                    'oldCartName': $("#js-update-old-username").val(),
                    'oldCartUName': $("#js-update-old-cartName").val(),
                    'cartId': $("#js-update-cartId").val(),
                    'cartName': $("#js-update-cartName").val(),
                    'cartUName': $("#js-update-username").val(),
                    'uuid': $("#js-update-uuid").val(),
                    'shopName': $("#js-update-shopname").val(),
                    'actioner': $("#actioner").val(),
                    'actionern': $("#actionern").val()
                },
                async: true,
                success: function(data) {
                    if(data == "success") {
                        $money._refresh();
                        $("#updateModal").modal('hide');
                        $alert._alert("修改成功");
                    } else {
                        $alert._alert("修改失败");
                    }
                },
                error: function() {
                    $alert._alert("操作失败");
                }
            });
        })
    });
});
