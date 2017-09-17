define(function(require) {
	require.async(['jquery','contabs'], function() {
		var imgs=require("imgsUtils");
		var $imgs=new imgs();
		var common=require('common');
		var $common=new common();
		require('jqueryUtils');
		require("imgTip");
		var alert=require('alertUtils')
		var $alert=new alert();
		var upload=require('uploadUtils');
		var $upload=new upload();
		var table=require('tableUtils');
		var t=new table();
		var columns = [{
			field: 'name',
			title: '商品名',
			align: 'center',
		}, {
			field: 'thumbImg',
			title: '商品图片',
			align: 'center',
			formatter: function(value, row, index) {
				return imgUpStr(value);
			}
		},{
            field: 'recommendImg', title: '推荐图',  align: 'center',
            formatter: function(value, row, index) {
            	if ($common._noEmpty(value)) {
					return "<img class='js-img-open' data-value='"+value+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+value+"?x-oss-process=image/resize,w_200'/>";
				}else
					return "-"
            },
        }, {
			field: 'shopName',
			title: '商家',
			align: 'center'
		}, {
			field: 'brandIdName',
			title: '品牌',
			align: 'center'
		}, {
			field: 'catIdName',
			title: '分类',
			align: 'center'
		}, {
			field: 'moreImg',
			title: '更多图片',
			align: 'center',
			formatter: function(value, row, index) {
				$imgs.lunbo("lunbo-" + index);
				return imgUpStr(value, index);
			}
		}, {
			field: 'saleNum',
			title: '销售量',
			align: 'center',
			sortable: true
		}, {
			field: 'operate',
			title: '操作',
			align: 'center',
			formatter: function(value, row, index) {
				var opt = [];
				opt.push('<a class="btn btn-outline btn-info js-update">修改推荐图片</a>');
            	opt.push('<a class="btn btn-outline btn-danger js-remove">撤销推荐</a>');
				return opt.join(" ");
			},
			events: {
				'click .js-remove': function (e, value, row, index) {
		        	$alert._warning("确认撤销该商品的推荐？","该操作将撤销商品:\""+row.name+"\"的推荐",function(){
		        		$.ajax({
							url:"/shop-goods/goods/ajax/removerecommend",
							contentType: "application/x-www-form-urlencoded; charset=utf-8", 
							type: "post",
							dataType:"json",
							data:{
								uuid:row.uuid,
							},
							async:true,success:function(data){
								if (data==1) {
									$alert._strSuc("撤销商品推荐成功");
	    							$t._refresh();
								}else{
									$alert._alert("操作失败");
								}
							},error:function(){
								$alert._alert("操作失败");
							}
						});
		        	});
		        },
		        'click .js-update': function (e, value, row, index) {
		        	$("#js-add-img-show").html("<img id='js-add-img'  data-value='"+row.recommendImg+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+row.recommendImg+"?x-oss-process=image/resize,w_200'/>");
					$('#shop-name').val(row.name);
		        	$('#shop-uuid').val(row.uuid);
		        	$("#addModal").modal({
						backdrop:'static'
					});
		        }
			},
		}];
		t._setSort('updateTime', 'desc');
		var $t = t._init("table", "/shop-goods/goods/commlist", columns);
		var imgUP=null;
		$('#addModal').on('shown.bs.modal', function (e) {
			imgUP=$upload._init(imgUP,'#js-add-img-up',function(file, response){
					$("#js-add-img-show").html("<img  id='js-add-img'  data-value='"+response.url+"' src='http://huifenshopimg-1253471825.file.myqcloud.com/"+response.url+"?x-oss-process=image/resize,w_200'/>");
				});
		});
		
		var imgUpStr = function(src, index) {
			if ($common._noEmpty(src)) {
				if (src.indexOf('#') > 0) {
					var imglist = src.split("#"),
						temp = [];
					for (var int = 0; int < imglist.length; int++) {
						temp.push("<img class='js-img-open' data-value='" + imglist[int] + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + imglist[int] + "'/>");
					}
					return temp.join(' ');
				} else {
					return "<img class='js-img-open' data-value='" + src + "' src='http://huifenshopimg-1253471825.file.myqcloud.com/" + src + "'/>";
				}
			} else
				return "-";
		};

		/*添加商家类别*/
		$(document).on("click","#js-add",function(e){
			$('#js-add-img-show').html('');
			$('#shop-name').val('');
        	$('#shop-uuid').val('');
			$("#addModal").modal({
				backdrop:'static'
			});
		});
		
		$(document).on("click","#js-add-btn",function(e){
			var uuid=$('#goods-uuid').val();
			var recommendImg=$('#js-add-img').data('value');
			if (!$common._noEmpty(uuid)) {
				$alert._alert("推荐商品不能为空");
        		return;
			}
			if (!$common._noEmpty(recommendImg)) {
				$alert._alert("推荐商品展示图片不能为空");
        		return;
			}
			$.ajax({
				url:"/shop-goods/goods/ajax/updatecommendgoods",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				type: "post",
				dataType:"json",
				data:{
					uuid:uuid,
					recommendImg:recommendImg,
				},
				async:true,success:function(data){
					if (data==1) {
						$alert._strSuc("商品推荐添加/修改成功");
						$t._refresh();
						$("#addModal").modal('hide');
					}else{
						$alert._alert("操作失败");
					}
				},error:function(){
					$alert._alert("操作失败");
				}
			});
		});
		
	  /*选择商家*/
	  $(document).on("click","#js-goods-select-btn",function(e){
		  $("#js-goods-select").empty();
		  $.ajax({
				url:"/shop-goods/goods/ajax/idlist",
				contentType: "application/x-www-form-urlencoded; charset=utf-8", 
				type: "post",
				dataType:"json",
				data:{
					name:$("#goods-name").val()
				},
				async:true,success:function(data){
					for (var key in data) { 
						$("#js-goods-select").append('<option value="'+key+'">'+data[key]+'</option>');
					} 
					$("#goods-selectBox").removeClass('hide');
				}
			  });
	  }); 
	  
	  $(document).on("click","#js-goods-sure",function(e){
		  $("#goods-selectBox").addClass('hide');
		  $("#goods-uuid").val($("#js-goods-select").val().split('-')[0]);
		  $("#goods-name").val($("#js-goods-select").find("option:selected").text());
	  });

	});
});