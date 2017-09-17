angular.module("realtime.controller", ["ionic"])
	.controller('realtimeCtrl', ["$scope", "$rootScope", "$state", "$ionicScrollDelegate", "$ionicTabsDelegate", "$timeout", "$window", "base", "RealTime",
	function($scope, $rootScope, $state, $ionicScrollDelegate, $ionicTabsDelegate, $timeout, $window, base, RealTime) {

		$scope.advs = ['img/adv4.jpg', 'img/adv5.jpg', 'img/adv6.jpg'];


		$scope.tasks = [
			{
				"ID": "1",
				"name": "兴义市",
				"tree": [
					{
						"ID": "11",
						"name": "桔山新区",
						"tree": [{
							"ID": "111",
							"name": "北京路"
						}]
					}
				]
			},
			{
				"yeji": "2",
				"name": "西安市",
				"tree": [
					{
						"ID": "21",
						"name": "高新区",
						"tree": [
							{
								"ID": "211",
								"name": "科技四路"
							}
						]
					}
				]
			}
		];

	$scope.cancel = false;
	$scope.searchSender = {
		key: null,
		placeholder: '输入店铺名',
		currentTownship: '定位中',
		geolocHolder: '请输入地址',
		curCity: sessionStorage.getItem("curCity"),
		curLngLat: sessionStorage.getItem("geolocation"),
		geolocKey: null,
		shopPage: 0,
		moreDataCanBeLoaded: true,
		firstLoad: true
	}

	/**
	 * 逆向地理编码当前位置
	 * @return {[type]} [description]
	 */
	$scope.reGeoTownship = function() {
		var url = "http://restapi.amap.com/v3/geocode/regeo";
		var params = {
			key: base.GaodeRestapiKey,
			radius: 0,
			location: $scope.searchSender.curLngLat
		}
		$scope.searchSender.currentTownship = "定位中";
		base.request(url, params).then(function(json) {
			if(json.info == "OK") {
				console.log(json);
				$scope.searchSender.currentTownship = json.regeocode.formatted_address.substring(json.regeocode.formatted_address.indexOf(json.regeocode.addressComponent.township) + json.regeocode.addressComponent.township.length, json.regeocode.formatted_address.length);

				$scope.townshipStyle = {
				 	left: "40px",
				 	width: '30%',
				 	'font-size': '12px;',
				 	'line-height': '49px'
				}
				$scope.clear();
				$scope.searchShop();
			} else {
				base.prompt("获取位置失败");
			}
		});
	}


	/**
	 * 定位当前位置
	 * @return {[type]} [description]
	 */
	$scope.poscurloc = function() {
		//定位
		if(!$scope.initMap) {
			$scope.initMap = function() {
	            $scope.mapObj = new AMap.Map('iCenter');
	            $scope.mapObj.plugin('AMap.Geolocation', function () {
	                $scope.geolocation = new AMap.Geolocation({
	                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
	                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
	                    maximumAge: 0,           //定位结果缓存0毫秒，默认：0
	                    convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
	                    showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
	                    showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
	                    panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
	                    zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
	                });
	                $scope.geolocation.getCurrentPosition();
	                $scope.mapObj.addControl($scope.geolocation);
	                //返回定位信息
	                AMap.event.addListener($scope.geolocation, 'complete', function(GeolocationResult) {
	                    sessionStorage.setItem("geolocation", GeolocationResult.position.lng +","+ GeolocationResult.position.lat);
	                    $scope.searchSender.curLngLat = sessionStorage.getItem("geolocation");
	                    $scope.reGeoTownship();
	                });
	                //返回定位出错信息
	                AMap.event.addListener($scope.geolocation, 'error', function() {
	                    console.log("error");
	                    base.alert($scope, "提示", "无法定位您的位置");
	                });
	            });
	        }
	        $scope.initMap();
		} else {
        	$scope.initMap();
        	$scope.seaModal.hide();
		}
	}
	// $scope.poscurloc();


	$scope.searchModel = function() {
		$scope.addrList = null;
		$scope.searchSender.geolocKey = null;
		base.openModal($scope, "templates/change-addr.html", "slideInUp").then(function(modal) {
			modal.show();
			$scope.seaModal = modal;
		});
	}

	/**
	 * 输入提示
	 * @return {[type]} [description]
	 */
	$scope.inputtips = function() {
		var url = "http://restapi.amap.com/v3/assistant/inputtips";
		var params = {
			key: base.GaodeRestapiKey,
			city: sessionStorage.getItem("curCity"),
			keywords: $scope.searchSender.geolocKey,
		}

		base.request(url, params).then(function(json) {
			console.log(json);
			if(json.info == "OK") {
				 $scope.addrList = json.tips;
			} else {
				base.prompt("获取位置失败");
			}
		});
	}


	/**
	 * 搜索
	 * @param  {[type]} arg [description]
	 * @return {[type]}     [description]
	 */
	$scope.search = function(arg) {
		$scope.searchOptions.pageIndex = 0;
		$scope.searchOptions.keywords = arg;
		$scope.scopeList = []
		base.loading();
		$scope.searchShop();
	}

	/**
	 * 切换位置
	 * @return {[type]} [description]
	 */
	$scope.swipeloc = function(arg) {
		$scope.seaModal.hide();
		$scope.searchSender.currentTownship = arg.name;
		$scope.searchOptions.pageIndex = 0;
		$scope.scopeList = [];
		if(arg.location.length == 0) {
			var url = "http://restapi.amap.com/v3/geocode/geo";
	        base.request(url, { key: base.GaodeRestapiKey, address: arg.name }).then(function(data) {
	            if (data.info == "OK") {
	                $scope.searchSender.curLngLat = data.geocodes[0].location;
	                base.loading();
					$scope.searchShop();
	            }
	        });
		} else {
			$scope.searchSender.curLngLat = arg.location;
			base.loading();
			$scope.searchShop();
		}



	}

	/**
	 * 搜索附近商家
	 * @return {[type]} [description]
	 */
	$scope.searchOptions = {
	    pageIndex: 0,
	    pageSize:20,
	    orderBy:'_distance:ASC',
	    keywords: ''
	};
	$scope.scopeList = new Array();
	$scope.searchShop = function() {
		$scope.searchOptions.pageIndex++;
		var center = $scope.searchSender.curLngLat.split(",");
		//加载CloudDataSearch服务插件
		AMap.plugin('AMap.CloudDataSearch', function() {//回调函数
			$scope.cloudSearch = new AMap.CloudDataSearch(base.GaodeTableId, $scope.searchOptions); //构造云数据检索类
			$scope.cloudSearch.searchNearBy(center, 10000, function(state, data) {
				if(data) {
					if(data.info == "OK") {
						// var _ids = new Array();
						//延时，不然加载过快 angular 阻止页面响应
						$timeout(function() {
							for (var i = 0; i < data.datas.length; i++) {
								$scope.scopeList.push(data.datas[i]);
								// _ids.push(data.datas[i].shopId);
							}

							if(data.datas.length < 20) {
								$scope.searchSender.moreDataCanBeLoaded = false;
							}
						}, 400);

						// base.request('shsearchByIds', {'ids': _ids.join(",")}).then(function(data) {
						// 	console.log(angular.toJson(data) );
						// });
					} else {
						$scope.searchSender.moreDataCanBeLoaded = false;
					}
					$scope.$broadcast('scroll.infiniteScrollComplete');

					//首次加载完成
					$timeout(function() {
						$scope.searchSender.firstLoad = false;
						base.loaded();
					}, 600);
				}
				base.loaded();
			});
		})

	}

	//点击店铺目录进入店铺详情
	$scope.shopDetails = function(arg) {
		$state.go("tab.sort-shop-list", {backWhere: 'tab.sort', key: arg});
	};

	$scope.clear = function() {
		base.loading();
		$scope.scopeList = [];
		$scope.searchOptions.pageIndex = 0;
		$scope.searchSender.firstLoad = true;
		$scope.searchSender.moreDataCanBeLoaded = true;
		$scope.searchSender.curCity = sessionStorage.getItem("curCity");
		$scope.searchSender.curLngLat = sessionStorage.getItem("geolocation");
	}


	$scope.$on("$ionicView.enter", function() {
		$scope.contentStyle = {
			height: $window.innerHeight - (44 + 50) + "px"
		}
		console.log($scope.searchSender.curCity +"-"+ sessionStorage.getItem("curCity"));
		$timeout(function() {
			if($scope.searchSender.curCity != sessionStorage.getItem("curCity") || $scope.searchSender.firstLoad) {
				$scope.clear();
				$scope.reGeoTownship();
			}
		}, 300);

	});
}])
.controller('shopDetailsCtrl', ['$scope', '$ionicTabsDelegate', '$stateParams', '$rootScope', '$state', '$window', '$ionicScrollDelegate', 'base', 'RealTime',  function($scope, $ionicTabsDelegate, $stateParams, $rootScope, $state, $window, $ionicScrollDelegate, base, RealTime){

	$scope.firstLoad = true;

	//加载商铺信息
	$scope.loadShopDetails = function(){
		console.log($stateParams.key);
		RealTime.getShopDetails($stateParams.key).then(function(data){
			$scope.shopDetail = data;
			$scope.loadShopPros();
			//console.log(JSON.stringify(data));
		},function(resp){
			$rootScope.prompt("获取店铺详情失败");
		});
	};

	/**
	 * 加载店铺商品列表
	 * @return {[type]} [description]
	 */
	$scope.canbeLoadMore = true;
	$scope.curInx = 0;
	$scope.shopPros = new Array();
	$scope.loadShopPros = function(){
		RealTime.getShopPros($scope.shopDetail.shopId, $scope.curInx++).then(function(data){
			if(data && data.length < 20) {
				$scope.canbeLoadMore = false;
			}
			for (var i = 0; i < data.length; i++) {
				data[i].productimgurl = data[i].productimgurl.split('，')[0];
				$scope.shopPros.push(data[i]);
			}
			$ionicScrollDelegate.resize();
		},function(resp){
			$rootScope.prompt("获取店铺商品失败");
		});
	}

	//点击店铺商品列表进入商品详情
	$scope.shopProDetails = function(arg){
		$state.go($stateParams.backWhere + "-shop-pro-details", {backWhere: $stateParams.backWhere, proId: arg});
	}

	$scope.$on("$ionicView.enter", function() {
		if($scope.firstLoad) {
			$scope.firstLoad = false;
			$scope.loadShopDetails();
		}
	});

	// 店铺高德地图导航
	$scope.transfer = function(){
		if($scope.shopDetail.lng && $scope.shopDetail.lat) {
			$state.go($stateParams.backWhere + "-shop-transfer", {backWhere: $stateParams.backWhere, shop: angular.toJson($scope.shopDetail)});
		} else {
			base.prompt($scope, "无法定位商铺");
		}
	};
}])
.controller("shopTransferCtrl", ['$scope', '$ionicTabsDelegate', '$stateParams', '$rootScope', '$state', '$window', '$ionicHistory', 'base', 'RealTime',  function($scope, $ionicTabsDelegate, $stateParams, $rootScope, $state, $window, $ionicHistory, base, RealTime){

	$scope.shop = angular.fromJson($stateParams.shop);

	$scope.glview = {
		style: {
			width: $window.innerWidth + 'px',
			height: ($window.innerHeight*0.7) + 'px'
		},
		transferStyle: {
			width: $window.innerWidth + 'px',
			height: ($window.innerHeight*0.3) + 'px',
			top: ($window.innerHeight*0.7) + 'px',
			position: "absolute"
		},
		panel: 'panel',
		glcontainer: 'mapContainer',
		curCity: sessionStorage.getItem("curCity"),
		search: null,
		type: 1
	};

	$scope.initMap = function() {
		if(!$scope.map) {
			$scope.map = new AMap.Map($scope.glview.glcontainer, {
				resizeEnable: true,
				center: [$scope.shop.lng, $scope.shop.lat],//地图中心点
				zoom: 13 //地图显示的缩放级别
			});
		}
	}

	$scope.initMapTransfer = function(trans_id) {
		$scope.map.clearMap();
		if($scope.trans)
			$scope.trans.clear();
		if(trans_id == 1){
			//加载公交换乘插件
			AMap.service(["AMap.Transfer"], function() {
				$scope.transOptions = {
					map: $scope.map,
					city: $scope.glview.curCity,
					panel:'panel', //公交城市
					policy: AMap.TransferPolicy.LEAST_TIME //乘车策略
				};
				console.log($scope.glview.curCity);
				//构造公交换乘类
				$scope.trans = new AMap.Transfer($scope.transOptions);
				//根据起、终点坐标查询公交换乘路线
				$scope.trans.search(sessionStorage.getItem("geolocation").split(","), [$scope.shop.lng, $scope.shop.lat], function(status, result){
					console.log(status + "," + result);
				});
			});
		}
		if(trans_id == 2){
			//加载驾车插件
			AMap.service(["AMap.Driving"], function() {
				$scope.transOptions = {
					map: $scope.map,
					city: $scope.glview.curCity,
					panel:'panel', //驾车城市
					policy: AMap.DrivingPolicy.LEAST_TIME //驾车策略
				};
				console.log($scope.glview.curCity);
				//构造驾车类
				$scope.trans = new AMap.Driving($scope.transOptions);
				//根据起、终点坐标查询驾车路线
				$scope.trans.search(sessionStorage.getItem("geolocation").split(","), [$scope.shop.lng, $scope.shop.lat], function(status, result){
				});
			});
		}
		if(trans_id == 3){
			//加载步行插件
			AMap.service(["AMap.Walking"], function() {
				$scope.transOptions = {
					map: $scope.map,
					city: $scope.glview.curCity,
					panel:'panel' //步行城市
				};
				console.log($scope.glview.curCity);
				//构造步行类
				$scope.trans = new AMap.Walking($scope.transOptions);
				//根据起、终点坐标查询步行路线
				$scope.trans.search(sessionStorage.getItem("geolocation").split(","), [$scope.shop.lng, $scope.shop.lat], function(status, result){
				});
			});
		}
		if(trans_id == 4){
			//加载骑行插件
			AMap.service(["AMap.Riding"], function() {
				$scope.transOptions = {
					map: $scope.map,
					city: $scope.glview.curCity,
					panel:'panel', //骑行城市
					policy: 0
				};
				console.log($scope.glview.curCity);
				//构造骑行类
				$scope.trans = new AMap.Riding($scope.transOptions);
				//根据起、终点坐标查询骑行路线
				$scope.trans.search(sessionStorage.getItem("geolocation").split(","), [$scope.shop.lng, $scope.shop.lat], function(status, result){
				});
			});
		}
	};
	$scope.$on("$ionicView.afterEnter", function() {
		$scope.initMapTransfer(1);
	});
}]);
