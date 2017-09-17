define(function(require) {
    require.async(['jquery', 'contabs'], function() {
        var common = require('common');
        var $common = new common();
        require('jqueryUtils');
        require("imgTip");
        var alert = require('alertUtils');
        var $alert = new alert();
        var table = require('tableUtils');
        /*用户表表*/
        var autht = new table();
        var columns = [{
            field: 'user.headImg',
            title: '用户头像',
            align: 'center',
            formatter: function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' src='" + value + "' />";
                }
                return "-";
            }
        }, {
            field: 'user.name',
            title: '用户名',
            align: 'center',
        }, {
            field: 'realname',
            title: '真实姓名',
            align: 'center',
        }, {
            field: 'idcard',
            title: '身份证号',
            align: 'center',
        }, {
            field: 'idcardup',
            title: '身份证正面',
            align: 'center',
            formatter:  function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' src='" + value + "' />";
                }
                return "-";
            }
        }, {
            field: 'idcardown',
            title: '身份证反面',
            align: 'center',
            formatter:  function(value, row, index) {
                if ($common._noEmpty(value)) {
                    return "<img class='js-img-open' src='" + value + "' />";
                }
                return "-";
            }
        }, {
            field: 'createDate',
            title: '创建日期',
            align: 'center',
        }, {
            field: 'operate',
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var opt = [];
                opt.push('<a class="btn btn-outline btn-danger authfail">驳回</a>');
                opt.push('<a class="btn btn-outline btn-success authsuccess">通过</a>');
                return opt.join(" ");
            },
            events: {
                'click .authfail': function(e, value, row, index) {
                	$("#updateuuid").val(row.uuid);
                	$("#updateuseruuid").val(row.useruuid);
                    $("#failModal").modal({
                        backdrop: 'static'
                    });
                },
                'click .authsuccess': function(e, value, row, index) {
                    reviewRes(row.uuid, row.useruuid, "success", "");
                }
            }
        }];
        autht._setSort('createDate', 'desc');
        var $autht = autht._init("table", "/shop-users/users/ajax/auths", columns, function(d) {
            d.status = "review";
        });
        /*指定用户筛选条件，刷新用户列表*/
        $(".js-change-table-params").change(function(e) {
            $autht._refresh();
        });

        $(".authAction").click(function() {
            reviewRes($("#updateuuid").val(), $("#updateuseruuid").val(), "fail", $("#failReason").val());
        });

        var reviewRes = function(_uuid, _userUuid, res, reason) {
        	var sender = {
                uuid: _uuid,
                status: res,
                failReason: reason
            }
            $.post('/shop-users/users/ajax/updateauth', sender, function(data, textStatus, xhr) {
            	
            	//发送模板消息
                templateNofity(_userUuid, res);
            	
                if(res == "fail") {
                    res = "驳回成功";
                    
                    $("#failModal").modal('hide');
                } else {
                    res = "审核成功";
                }
                $alert._alert(res);
                $autht._refresh();
            });
        };
        
        //发送模板消息
        var templateNofity = function(userUuid, type){
        	var url = $('#wx_domain').val();
            $.ajax({
        	   async:false,
        	   url: url + 'notify/auth.html?userUuid=' + userUuid + '&type=' + type,
        	   type: "get",
        	   dataType: 'jsonp',
        	   jsonp: 'callback',
        	   jsonpCallback:"success_jsonpCallback",
        	   timeout: 5000,
        	   success: function (json){
        		   console.log('模板消息发送成功');
        		   console.log(json.status);
        	   },
        	   error: function(xhr){
        		   console.log(xhr);
        	   }
            });
        }
    });
});
