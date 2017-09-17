/**
* products.service Module
*
* Description
*/
angular.module('products.service', [])
.factory('Products', ["$http", "$q", "base", function($http, $q, base) {
	var products = {
		//获取商品详情
		getProDetails: function(arg){
			var defer = $q.defer();
			base.request('prosearch', {"product.productId": arg}).then(function(resp){
				//console.log(resp);
				defer.resolve(resp.data);
			},function(resp){
				defer.reject(resp);
			});
			return defer.promise;
		},
		//获取产品分类的商品列表
		getProByType: function(arg){
			var defer = $q.defer();
			var params = base.corvertBean("product", arg);
			base.request('prosearch', params).then(function(resp){
				//console.log(resp);
				defer.resolve(resp.data);
			},function(resp){
				defer.reject(resp);
			});
			return defer.promise;
		},
	};
	return products;
}]);