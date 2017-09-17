define(function (require, exports, module) {
    require('jquery');
    require('bootstrap');
    require('table');
    require('locale');
    require('export');
    require('tableedit');
    require('bootstrapedit');
    require('tableexport');
    window.JQuery = $;

    function Table() {
        this.toolbar = '#toolbar';
        this.sortName = 'addTime';
        this.sortOrder = 'asc';
    }
    module.exports = Table;
    Table.prototype._showfuc = function (fuc) {
        this.showfuc = fuc;
    }
    Table.prototype._complete = function (fuc) {
        this.completefuc = fuc;
    }
    /*设置工具栏，必须在初始化表格前使用*/
    Table.prototype._setTool = function (toolName) {
        this.toolbar = toolName;
    }
    /*设置默认排序，必须在初始化表格前使用*/
    Table.prototype._setSort = function (name, order) {
        this.sortName = name;
        this.sortOrder = order;
    }
    Table.prototype._init = function (tableName, url, columns, params, fuc) {
        this.fuc = fuc;
        this.params = params;
        //1.初始化Table
        var oTable = this._tableInit();
        oTable._init(tableName, url, columns);
        return oTable;
    }
    Table.prototype._tableInit = function () {
        var that = this;
        var oTableInit = new Object();
        var $table = new Object();
        //初始化表格
        oTableInit._init = function (tableName, url, columns) {
            $table = $('#' + tableName);
            $table.bootstrapTable({
                url: url, //请求后台的URL（*）
                method: 'post', //请求方式（*）
                toolbar: that.toolbar, //工具按钮用哪个容器
                striped: true, //是否显示行间隔色
                cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
                pagination: true, //是否显示分页（*）
                sortable: true, //是否启用排序
                showExport: true, //是否显示导出
                exportDataType: "all", //basic', 'all', 'selected'.
                queryParams: oTableInit.queryParams, //传递参数（*）
                sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
                pageNumber: 1, //初始化加载第一页，默认第一页
                pageSize: 10, //每页的记录行数（*）
                pageList: [10, 25, 50, 100], //可供选择的每页的行数（*）
                search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
                strictSearch: true,
                showRefresh: true, //是否显示刷新按钮
                minimumCountColumns: 2, //最少允许的列数
                clickToSelect: true, //是否启用点击选中行
                height: getHeight, //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
                sortName: that.sortName, // 设置默认排序为 name
                sortOrder: that.sortOrder, // 设置排序为反序 desc
                uniqueId: columns[0]["field"], //每一行的唯一标识，一般为主键列
                undefinedText: "-",
                showToggle: true, //是否显示详细视图和列表视图的切换按钮
                cardView: false, //是否显示详细视图
                detailView: false, //是否显示父子表
                showColumns: true,
                minimumCountColumns: 2,
                columns: columns,
                responseHandler: function (res) {
                    return {
                        total: res.total,
                        rows: res.list
                    };
                },
                onEditableSave: oTableInit.onEditableSave,
                onSort: function (name, order) {
                    $table.bootstrapTable('showLoading');
                },
                onLoadSuccess: function () {
                    $table.bootstrapTable('hideLoading');
                    if (that.completefuc) {
                        that.completefuc();
                    };

                    $('.js-img-open').on('mouseover', function (e) {
                        var imgUrl = e.target.src;
                        toolTip("<img src='" + imgUrl + "' />");
                    });
                    $('.js-img-open').on('mouseout', function (e) {
                        toolTip();
                    });
                },
                onColumnSwitch: function (field, checked) {
                    if (that.showfuc) {
                        that.showfuc(field, checked);
                    }
                }
            });
        };

        //得到查询的参数
        oTableInit.queryParams = function (params) {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                limit: params.limit, //页面大小
                offset: params.offset, //页码
                order: params.order,
                ordername: params.sort,
                departmentname: $("#txt_search_departmentname").val(),
                statu: $("#txt_search_statu").val(),
                search: params.search
            };
            if (that.params) that.params(temp);
            return temp;
        };

        oTableInit.detailFormatter = function (index, row) {
            var html = [];
            $.each(row, function (key, value) {
                console.log('<p><b>' + key + ':</b> ' + value + '</p>');
                html.push('<p><b>' + key + ':</b> ' + value + '</p>');
            });
            return html.join('');
        }
        //操作函数
        oTableInit._delRow = function (field, values) { //delete
            $table.bootstrapTable('remove', {
                field: field,
                values: values
            });
        }
        oTableInit._refresh = function () {
            $table.bootstrapTable('refresh', {});
        };
        oTableInit.getData = function () {
            return $table.bootstrapTable('getData');
        }

        oTableInit.onEditableSave = function (field, row, oldValue, $el) {
            if (that.fuc) {
                that.fuc(field, row, oldValue, $el);
            }
        }
        return oTableInit;
    };

    function _buttonInit() {
        var oInit = new Object();
        var postdata = {};
        oInit._init = function () {
            //初始化页面上面的按钮事件
        };
        return oInit;
    };
    //设置按钮
    Table.prototype._operateFormatter = function (value, row, index) {
        return [
            '<a class="btn btn-outline btn-success js-update">修改</a>',
            '<a class="btn btn-outline btn-danger js-delete">删除</a>'
        ].join('');
    }

    //获取行高
    function getHeight() {
        return $(window).height() - $('h1').outerHeight(true);
    }

});