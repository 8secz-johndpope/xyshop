/*分成参数设置*/
define(function (require) {
    require.async(['jquery'], function () {
        var common = require('common');
        var $common = new common();
        var alert = require('alertUtils')
        var $alert = new alert();
        var table = require('tableUtils');
        var t = new table();
        var columns = [{
            field: 'name',
            title: '配置名',
            align: 'center',
        }, {
            field: 'paramValue',
            title: '参数值',
            align: 'center',
            formatter: function (value, row, index) {
                if (!$common._noEmpty(value)) {
                    return "-";
                } else {
                    return value;
                }
            }
        }, {
            field: 'introduce',
            title: '配置介绍',
            align: 'center',
        }, {
            field: 'time',
            title: '修改时间',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                return '<a class="btn btn-outline btn-info js-params-setting">设置参数</a>';
            },
            events: {
                'click .js-params-setting': function (e, value, row, index) {
                    $alert._fuc(function () {
                        swal({
                                title: row.name,
                                type: "input",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "修改",
                                cancelButtonText: "取消",
                                closeOnConfirm: false,
                                closeOnCancel: false,
                                inputPlaceholder: "修改参数值"
                            },
                            function (inputValue) {
                                if (inputValue) {
                                    let params = {
                                        uuid: row.uuid,
                                        paramValue: inputValue
                                    };
                                    $.post("params/update", params, function (result) {
                                        if(result === "success") {
                                            $alert._strSuc("参数修改成功");
                                            $t._refresh();
                                        } else {
                                            $alert._strSuc("参数修改失败");
                                        }
                                    });
                                } else {
                                    swal("已取消", "您取消了操作或没有填写参数！", "error");
                                }
                            })
                    });
                }
            },
        }];
        var $t = t._init("table", "params/list", columns);
    });
});
