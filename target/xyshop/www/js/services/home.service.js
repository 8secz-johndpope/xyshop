;
angular.module('home.service', [])
	.factory("Home", ["$q", "$http", "base", function($q, $http, base) {

		return {
			getCarousel: function() {
				return $http.jsonp("", {
					params: {

					}
				});
			},

			/**
			 * 猜你喜欢
			 * @param  {[type]} inx [description]
			 * @return {[type]}     [description]
			 */
			maybeLike: function(inx) {
				var defer = $q.defer();
				base.request('promaybeLike', {curInx: inx})
				.then(function(resp) {
					if(resp.data) {
						defer.resolve(resp.data);
					}
				}, function(resp) {
					base.prompt('获取商品出错');
					defer.reject(resp);
				});
				return defer.promise;
			},


			/**
			 * 首页分类
			 * @return {[type]} [description]
			 */
			loadProty: function () {
				var defer = $q.defer();
				if(!sessionStorage.getItem("homeproty")) {
					base.request("pthomeproty", {})
					.then(function(resp) {
						if(resp.state == "ok") {
							sessionStorage.setItem("homeproty", JSON.stringify(resp.data));
							defer.resolve(resp.data);
						} else {
							base.prompt(resp.reason);
						}
					}, function(resp){
						base.prompt("请求错误");
					});
				} else {
					defer.resolve(JSON.parse(sessionStorage.getItem("homeproty")));
				}
				return defer.promise;
			},

			/**
			 * 所有分类
			 * @return {[type]} [description]
			 */
			loadAllProty: function() {
				var defer = $q.defer();
				if(!sessionStorage.getItem("allproty")) {
					base.request("ptgetProductTypeNodes", {})
					.then(function(resp) {
						sessionStorage.setItem("allproty", JSON.stringify(resp));
						defer.resolve(resp);
					}, function(resp){
						base.prompt("请求错误");
					});
				} else {
					defer.resolve(JSON.parse(sessionStorage.getItem("allproty")));
				}
				return defer.promise;
			},

			/**
			 * 所有地理位置
			 */
			loadAllAddress: function() {
				var defer = $q.defer();
				base.request("adchengshiTwo", {})
				.then(function(resp) {
					defer.resolve(resp);
				}, function(resp){
					base.prompt('获取地理位置出错');
					defer.reject(resp);
				});
				return defer.promise;
			},

			/**
			 * 热门城市
			 */
			loadHotAddress: function() {
				var defer = $q.defer();
				base.request("adhotCity", {})
				.then(function(resp) {
					defer.resolve(resp);
				},function(resp) {
					base.prompt("获取热门城市出错");
					defer.reject(resp);
				});
				return defer.promise;
			},

			/**
			 * 切换县区
			 */
			loadRegionalAddress: function(addrs) {
				var defer = $q.defer();
				base.request("adgetXianji", {cityName: addrs})
					.then(function(resp) {
						defer.resolve(resp);
					},function(resp) {
						base.prompt("获取县区出错");
						defer.reject(resp);
					});
				return defer.promise;
			},
			
			/**
			 * 下载搜索商品类店铺列表
			 */
			loadTypeSearchList: function(arg){
				var defer = $q.defer();
				base.request("shgetShopAndName", {name: arg}).then(function(resp){
					defer.resolve(resp.data);
				},function(resp){
					defer.reject(resp);
				});
				return defer.promise;
			}
		};
	}]);
