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
			 * ����ϲ��
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
					base.prompt('��ȡ��Ʒ����');
					defer.reject(resp);
				});
				return defer.promise;
			},


			/**
			 * ��ҳ����
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
						base.prompt("�������");
					});
				} else {
					defer.resolve(JSON.parse(sessionStorage.getItem("homeproty")));
				}
				return defer.promise;
			},

			/**
			 * ���з���
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
						base.prompt("�������");
					});
				} else {
					defer.resolve(JSON.parse(sessionStorage.getItem("allproty")));
				}
				return defer.promise;
			},

			/**
			 * ���е���λ��
			 */
			loadAllAddress: function() {
				var defer = $q.defer();
				base.request("adchengshiTwo", {})
				.then(function(resp) {
					defer.resolve(resp);
				}, function(resp){
					base.prompt('��ȡ����λ�ó���');
					defer.reject(resp);
				});
				return defer.promise;
			},

			/**
			 * ���ų���
			 */
			loadHotAddress: function() {
				var defer = $q.defer();
				base.request("adhotCity", {})
				.then(function(resp) {
					defer.resolve(resp);
				},function(resp) {
					base.prompt("��ȡ���ų��г���");
					defer.reject(resp);
				});
				return defer.promise;
			},

			/**
			 * �л�����
			 */
			loadRegionalAddress: function(addrs) {
				var defer = $q.defer();
				base.request("adgetXianji", {cityName: addrs})
					.then(function(resp) {
						defer.resolve(resp);
					},function(resp) {
						base.prompt("��ȡ��������");
						defer.reject(resp);
					});
				return defer.promise;
			},
			
			/**
			 * ����������Ʒ������б�
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
