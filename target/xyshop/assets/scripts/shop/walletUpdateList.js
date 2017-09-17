define(function (require) {
    require.async(['jquery'], function () {
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
            field: 'addTime',
            title: '申请时间',
            align: 'center',
            sortable: true
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
        }, {
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
            field: 'status',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 'wait':
                        return "<span class='badge badge-info'>等待审核</span>";
                }
                return "-";
            }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-danger js-refuse">拒绝</a>');
                opt.push('<a class="btn btn-outline btn-success js-agree">同意</a>');
                return opt.join(" ");
            },
            events: {
                'click .js-refuse': function (e, value, row, index) {
                    $("#wallet-uuid").val(row.uuid);
                    $("#failModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .js-agree': function (e, value, row, index) {
                    $alert._warning("确认同意该修改申请？", "该操作将同意商家\"" + row.shopName + "\"的修改申请", function () {
                        $.ajax({
                            url: "/xyshop-supplier/updateWallet/pass",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                                actioner: $("#actioner").val(),
                                actionern: $("#actionern").val(),
                            },
                            async: true,
                            success: function (data) {
                                if (parseInt(data) > 0) {
                                    $alert._strSuc("操作成功");
                                    $money._refresh();
                                } else $alert._alert("操作失败");
                            },
                            error: function () {
                                $alert._alert("操作失败");
                            }
                        });

                    });
                },
            },
        }];
        money._setTool('#toolbar');
        money._setSort('addTime', 'desc');
        var $money = money._init("table", "/xyshop-supplier/updateWallet/pagelist", c_columns);


        $(".walletAction").click(function (e) {
            $.ajax({
                url: "/xyshop-supplier/updateWallet/fail",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                type: "post",
                dataType: "json",
                data: {
                    uuid: $("#wallet-uuid").val(),
                    rebut: $("#failReason").val()
                },
                async: true,
                success: function (data) {
                    if (parseInt(data) > 0) {
                        $alert._strSuc("驳回成功");
                        $money._refresh();
                        $("#failModal").modal('hide');
                    } else $alert._alert("驳回失败");
                },
                error: function () {
                    $alert._alert("操作失败");
                }
            });
        })
    });
});