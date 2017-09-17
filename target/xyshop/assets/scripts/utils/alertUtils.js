define(function(require, exports, module) {
    require('jquery');
    require('sweet');

    function Alert() {}
    module.exports = Alert;
    Alert.prototype._deleteSuc = function() {
        swal("删除成功！", "您已经永久删除了这条信息。", "success");
    }
    Alert.prototype._addSuc = function() {
        swal("添加成功！", "您已经成功添加了一条信息。", "success");
    }
    Alert.prototype._updateSuc = function() {
        swal("修改成功！", "您已经成功修改了一条信息。", "success");
    }
    Alert.prototype._strSuc = function(str) {
        swal("操作成功", str, "success");
    }
    Alert.prototype._strErr = function(str) {
        swal("操作失败", str, "error");
    }
    Alert.prototype._alert = function(str) {
        swal(str);
    }

    Alert.prototype._delete = function(str, fuc) {
        swal({
                title: str,
                text: "删除后将无法恢复，请谨慎操作！",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是的，我要删除！",
                cancelButtonText: "让我再考虑一下…",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function() {
                if (fuc) {
                    fuc();
                }
            })
    }
    Alert.prototype._pass = function(str, fuc) {
        swal({
                title: str,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#76EE00",
                confirmButtonText: "是的，通过审核！",
                cancelButtonText: "让我再考虑一下…",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function() {
                if (fuc) {
                    fuc();
                }
            })
    }
    Alert.prototype._fail = function(str, fuc) {
        swal({
                title: str,
                type: "input",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "是的，不通过审核！",
                cancelButtonText: "让我再考虑一下…",
                closeOnConfirm: false,
                closeOnCancel: true,
                inputPlaceholder: "填写不通过审核的原因",
            },
            function(inputValue) {
                if (inputValue) {
                    if (fuc) {
                        fuc(inputValue);
                    }
                } else {
                    // swal("已取消", "您取消了操作或拒绝原因为空！", "error");
                }
            })
    }
    Alert.prototype._fuc = function(fuc) {
        if (fuc) {
            fuc();
        }
    }
    Alert.prototype._warning = function(str, str1, fuc) {
        swal({
                title: str,
                text: str1,
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#76EE00",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true,
                closeOnCancel: true
            },
            function() {
                // if (isConfirm) {
                if (fuc) {
                    fuc();
                }
                // } else {
                //     // swal("已取消", "您取消了操作！", "error")
                // }
            });
    }

});