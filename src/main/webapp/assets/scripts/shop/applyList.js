define(function(require) {
    require.async(['jquery'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils')
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');

        /*商户提现申请表*/
        var money = new table();
        var c_columns = [{
            field: 'shopName',
            title: '申请商家',
            align: 'center',
        }, {
            field: 'bankNo',
            title: '银行卡号',
            align: 'center',
            formatter: function(value, row, index) {
                return value + " -";
            }
        }, {
            field: 'bankUser',
            title: '户名',
            align: 'center',
        }, {
            field: 'bankName',
            title: '开户行',
            align: 'center',
        }, {
            field: 'money',
            title: '提现金额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
        }, {
            field: 'leftMoney',
            title: '当前余额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
        }, {
            field: 'withdrawed',
            title: '累计提现金额',
            align: 'center',
            formatter: function(value, row, index) {
                return value + "元";
            }
            
        }, {
            field: 'addTime',
            title: '申请日期',
            align: 'center',
            sortable: true,
        }, {
            field: 'type',
            title: '类型',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'income':
                        return "<span class='badge badge-info'>收入</span>";
                    case 'expend':
                        return "<span class='badge badge-danger'>支出</span>";
                }
                return "-";
            }
        }, {
            field: 'status',
            title: '当前状态',
            align: 'center',
            formatter: function(value, row, index) {
                switch (value) {
                    case 'wait':
                        return "<span class='badge badge-info'>等待确认</span>";
                    case 'success':
                        return "<span class='badge badge-success'>提现成功</span>";
                    case 'fail':
                        return "<span class='badge badge-danger'>提现失败</span>";
                }
                return "-";
            }
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                if(row.status === "wait") {
                    opt.push('<a class="btn btn-outline btn-danger js-refuse">拒绝</a>');
                    opt.push('<a class="btn btn-outline btn-success js-agree">同意</a>');
                } else {
                    opt.push('--');
                }
                return opt.join(" ");
            },
            events: {
                'click .js-refuse': function(e, value, row, index) {
                    swal({
                            title: "确认拒绝该提现申请？",
                            type: "input",
                            showCancelButton: true,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "是的，不通过申请！",
                            cancelButtonText: "让我再考虑一下…",
                            closeOnConfirm: false,
                            closeOnCancel: false,
                            inputPlaceholder: "填写不通过该申请的原因",
                        },
                        function(inputValue) {
                            if (inputValue) {
                                $.ajax({
                                    url: "/shop-supplier/moneyrecord/ajax/fail",
                                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        uuid: row.uuid,
                                        failReason: inputValue
                                    },
                                    async: true,
                                    success: function(data) {
                                        $alert._strSuc("操作成功");
                                        $money._refresh();
                                    },
                                    error: function() {
                                        $alert._alert("操作失败");
                                    }
                                });

                            } else {
                                swal("已取消", "您取消了操作或拒绝原因为空！", "error");
                            }
                        })
                },
                'click .js-agree': function(e, value, row, index) {
                    $alert._warning("确认同意该提现申请？", "该操作将同意商家\"" + row.money + "\"元(备注:" + row.remarks + ")的提现申请", function() {
                        $.ajax({
                            url: "/shop-supplier/moneyrecord/ajax/pass",
                            contentType: "application/x-www-form-urlencoded; charset=utf-8",
                            type: "post",
                            dataType: "json",
                            data: {
                                uuid: row.uuid,
                            },
                            async: true,
                            success: function(data) {
                                $alert._strSuc("操作成功");
                                $money._refresh();
                            },
                            error: function() {
                                $alert._alert("操作失败");
                            }
                        });

                    });
                },
            },
        }];
        money._setTool('#apply-toolbar');
        money._setSort('addTime', 'desc');
        var $money = money._init("moneytable", "/shop-supplier/moneyrecord/ajax/applylist", c_columns, function(p) {
            p.status = $("#js-choise-status").val();
            p.startTime = $('#js-date-begin').val();
            p.endTime = $('#js-date-end').val();
        });

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
                $money._refresh();
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
                $money._refresh();
            }
        };
        $("#js-date-begin").click(function(e) {
            laydate(start);
        });
        $("#js-date-end").click(function(e) {
            laydate(end);
        });
        $(document).on("click", "#laydate_clear", function(e) {
            $money._refresh();
        });


        $("#js-choise-status").change(function() {
            $money._refresh();
        })

        $("#js-export-record").click(function() {
            var left = document.body.clientWidth/2 - 200;
            var top = document.body.clientHeight/2 - 200;
            window.open('/shop-supplier/moneyrecord/ajax/export?startTime=' + $('#js-date-begin').val() + '&endTime=' + $('#js-date-end').val() + '&status=' + $("#js-choise-status").val() + '&params=' + $(".search > input").val(),"_blank","toolbar=yes, location=yes, directories=no, status=yes, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400, left=" + left + ", top=" + top )
        });

        /*商家提现记录*/
        // var tixian = new table();
        // var columns = [{
        //     field: 'shopName',
        //     title: '申请商家',
        //     align: 'center',
        // }, {
        //     field: 'money',
        //     title: '涉及金额',
        //     align: 'center',
        //     formatter: function(value, row, index) {
        //         return value + "元";
        //     }
        // }, {
        //     field: 'type',
        //     title: '类型',
        //     align: 'center',
        //     formatter: function(value, row, index) {
        //         switch (value) {
        //             case 'income':
        //                 return "<span class='badge badge-info'>收入</span>";
        //             case 'expend':
        //                 return "<span class='badge badge-danger'>支出</span>";
        //         }
        //         return "-";
        //     }
        // }, {
        //     field: 'leftMoney',
        //     title: '收支后余额',
        //     align: 'center',
        //     formatter: function(value, row, index) {
        //         return value + "元";
        //     }
        // }, {
        //     field: 'remarks',
        //     title: '备注',
        //     align: 'center',
        // }, {
        //     field: 'addTime',
        //     title: '申请时间',
        //     align: 'center',
        // }, {
        //     field: 'status',
        //     title: '当前状态',
        //     align: 'center',
        //     formatter: function(value, row, index) {
        //         switch (value) {
        //             case 'wait':
        //                 return "<span class='badge badge-info'>等待确认</span>";
        //             case 'success':
        //                 return "<span class='badge badge-success'>提现成功</span>";
        //             case 'fail':
        //                 return "<span class='badge badge-danger'>提现失败</span>";
        //         }
        //         return "-";
        //     }
        // }];
        // tixian._setTool('#toolbar');
        // tixian._setSort('addTime', 'desc');
        // var $tixian = tixian._init("tixiantable", "/shop-supplier/moneyrecord/ajax/tixianlist", columns, function(d) {
        //     d.status = $('#js-choise-status').val();
        //     d.shopName = $('#js-shop-name').val();
        // });
        // /*指定订单筛选条件，刷新订单列表*/
        // $(".js-change-table-params").change(function(e) {
        //     $tixian._refresh();
        // });

    });
});
