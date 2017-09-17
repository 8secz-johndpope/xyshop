angular.module("home.controller", ["ionic"])
    .controller('HomeCtrl', ["$scope", "$state", "$stateParams", "$ionicScrollDelegate", "$timeout", "$window", "$ionicLoading", "$ionicPopover", "$ionicTabsDelegate", "$cordovaGeolocation", "$ionicHistory", "$q", "$ionicPosition", "base", "Home",
        function($scope, $state, $stateParams, $ionicScrollDelegate, $timeout, $window, $ionicLoading, $ionicPopover, $ionicTabsDelegate, $cordovaGeolocation, $ionicHistory, $q, $ionicPosition, base, Home) {

            $scope.advs = ['img/adv1.jpg', 'img/adv2.jpg', 'img/adv3.jpg'];

            /**
             * 获取猜你喜欢列表
             * @type {Object}
             */
            $scope.options = {
                loop: false,
                maybeInx: 0,
                moreDataCanBeLoaded: true
            }
            $scope.protys = new Array();
            $scope.likes = new Array();
            $scope.loadMaybeLike = function() {
                if ($scope.options.maybeInx >= 5) {
                    $scope.options.moreDataCanBeLoaded = false;
                } else {
                    Home.maybeLike($scope.options.maybeInx++).then(function(data) {
                        if (data.length < 20) {
                            $scope.options.moreDataCanBeLoaded = false;
                        }
                        for (var i = 0; i < data.length; i++) {
                            data[i].productimgurl = data[i].productimgurl.split('，')[0];
                            $scope.likes.push(data[i]);
                        }
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    });
                }
            }

            //判断首页分类是不是全部分类
            $scope.searchpro = function(arg) {
                if (arg.action == "all") {
                    $state.go('tab.home-protype-all');
                } else if (arg.action == undefined) {
                    $state.go('tab.home-pro-list-details', { title: arg.producttypename, backWhere: 'tab.home', productTypeId: arg.producttypeid });
                } else if (arg.action == "none") {

                }
            }

            /**
             * 加载首页分类
             * @return {[type]} [description]
             */
            $scope.loadProty = function() {
                Home.loadProty().then(function(data) {
                    data.push({
                        producttypename: '全部分类',
                        default1: 'img/more.png',
                        action: 'all'
                    });
                    var surplus = 20 - data.length
                    for (var i = 0; i < surplus; i++) {
                        data.push({
                            producttypename: ' ',
                            default1: 'img/tc.png',
                            action: 'none'
                        });
                    }
                    var ptObj = new Array();
                    var split = Math.ceil((data.length) / 10);
                    for (var i = 0; i < split; i++) {
                        var pt_page = data.slice(i * 10, (i + 1) * 10);

                        var pt_row = Math.ceil(pt_page.length / 5);
                        var ptObjItem = new Array();
                        for (var j = 0; j < pt_row; j++) {
                            ptObjItem.push(pt_page.slice(j * 5, (j + 1) * 5));
                        }
                        ptObj.push(ptObjItem);
                    }
                    $scope.protys = ptObj;
                });
            }

            /**
             * 加载广告
             * @return {[type]} [description]
             */
            // $scope.loadAd = function() {
            //     base.request("proloadAd", {city: sessionStorage.getItem("curCity")}).then(function(data) {
            //         console.log(data);
            //         $scope.advs = data;
            //         var offset = 6 - $scope.advs.length;
            //         for (var i = 0; i < offset; i++) {
            //             var sender = {
            //                 default2: '',
            //                 action: 'alert',
            //                 pro: {
            //                     productimgurl: 'img/zhaozu.png',
            //                     productname: '广告位招租'
            //                 }
            //             }
            //             $scope.advs.push(sender);
            //         }
            //     });
            // }

            $scope.adgopro = function(action, proid) {
                if(action == "alert") {
                    base.alert($scope, "提示", "该位置暂无商品");
                } else {
                    $state.go("tab.home-shop-pro-details", { backWhere: 'tab.home', proId: proid });
                }
            }


            /**********************end***********************/

            /**
             * home-search-modal.html搜索框模块
             * @param  {[type]}
             * @return {[type]}
             */
            base.openModal($scope, "templates/home-search-modal.html", "slideInDown").then(function(modal) {
                $scope.searchModal = modal;

                $scope.openSearchPanel = function() {

                    if (localStorage.getItem('historysearch')) {
                        $scope.searchItems = angular.fromJson(localStorage.getItem('historysearch')).reverse();
                    }
                    $scope.searchModal.show();
                }

                $scope.clearhispanel = function() {
                    localStorage.removeItem("historysearch");
                    $scope.searchItems = null;
                    base.prompt($scope, "清除完成");
                }

            });

            //搜索模块内的搜索框
            $scope.searchShopSender = {
                key: null,
                placeholder: '搜索商品类'
            }

            $scope.searchShop = function(arg) {
                var historys = null;
                if (arg) {
                    if (localStorage.getItem('historysearch')) {
                        historys = angular.fromJson(localStorage.getItem('historysearch'));
                    } else {
                        historys = new Array();
                    }
                    if (historys.includes(arg)) {
                        historys.splice(historys.indexOf(arg), 1);
                        historys.push(arg);
                    } else {
                        historys.push(arg);
                    }
                    localStorage.setItem("historysearch", angular.toJson(historys));

                    if (historys.length == 10) {
                        historys.shift();
                    }
                }
                $state.go('tab.home-protype-search', { backWhere: 'tab.home', key: arg });
                $scope.clearShopKey();
                $scope.searchModal.hide();
            }

            $scope.clearShopKey = function(arg) {
                $scope.searchShopSender.key = null;
                $timeout(function() {
                    $scope.cancel = !arg;
                }, 5);
            }
            /**********************end***********************/

            /**
             * 所有分类
             * @return {[type]} [description]
             */
            $scope.loadItems = function() {
                Home.loadAllProty().then(function(data) {
                    //console.log(JSON.stringify(data));
                    for (var i = 0; i < data.length; i++) {
                        var ptyItemCld = new Array(),
                            childRow = new Array(),
                            childItems = new Array();
                        for (var j = 0; j < data[i].childs.length; j++) {
                            if (j > 0 && j % 4 == 0) {
                                childRow.push(childItems);
                                childItems = new Array();
                            }
                            childItems.push(data[i].childs[j]);
                            if (j == data[i].childs.length - 1) {
                                childRow.push(childItems);
                            }
                        }
                        data[i].childs = childRow;
                    }
                    $scope.protyItems = data;
                });
            };

            /**
             * 点击全部分类目录进入商品分类列表
             */
            $scope.proListByTybe = function(theme, arg1, arg2) {
                    $state.go("tab.home-pro-list-details", { title: theme, backWhere: 'tab.home', productTypeId: arg1, productProducttypeid: arg2 });
                }
                /**
                 * 获取所有地理位置
                 */
            $scope.loadAddrs = function() {
                if (!sessionStorage.getItem("citys")) {
                    Home.loadAllAddress().then(function(data) {
                        $scope.addres = data;
                        sessionStorage.setItem("citys", angular.toJson(data.data));
                        $scope.citys = data.data;
                    });
                } else {
                    $scope.citys = angular.fromJson(sessionStorage.getItem("citys"));
                }

            };


            /**
             * 首页默认的当前地址
             */
            $scope.defailtAddress = {
                clientSide: sessionStorage.getItem('curCity')
            };

            /**
             * home-address-modal.html城市选择模块
             * @param  {[type]}
             * @return {[type]}
             */
            $scope.searchCity = function() {
                base.openModal($scope, "templates/home-address-modal.html", "slideInDown").then(function(modal) {
                    $scope.addressModal = modal;
                    $scope.addressModal.show();
                    //城市选择模板内的搜索框
                    $scope.searchCitySender = {
                        key: null,
                        placeholder: '输入城市名'
                    }

                    $scope.cityInx = 0;
                    // $scope.citys = angular.fromJson(sessionStorage.getItem("citys"));
                    $scope.addrList = new Array();
                    $scope.moreCity = function(arg) {
                        var temp = $scope.cityInx;
                        $scope.cityInx += arg;
                        for (var i = temp; i < $scope.cityInx; i++) {
                            $scope.addrList.push($scope.citys[i]);
                        }
                    }
                    $scope.moreCity(3);
                    $timeout(function() {
                        $scope.moreCity($scope.citys.length - 3);
                    }, 800);


                    $scope.clearCityKey = function(arg) {
                        $scope.searchCitySender.key = null;
                        $timeout(function() {
                            $scope.cancel = !arg;
                        }, 5);
                    }

                    $scope.filterCity = function(arg) {
                        for (var i = 0; i < $scope.addrList.length; i++) {
                            for (var j = 0; j < $scope.addrList[i].city.length; j++) {
                                if (arg.trim().includes($scope.addrList[i].city[j].name) || $scope.addrList[i].city[j].name.includes(arg.trim())) {
                                    console.log($scope.addrList[i].city[j]);
                                    var pos = $ionicPosition.position(angular.element($(".radio-" + $scope.addrList[i].city[j].id).get(0)));
                                    $ionicScrollDelegate.$getByHandle("cityscroll").scrollBy(0, pos.top, true);
                                    return;
                                }
                            }
                        }
                    }

                    //切换县区
                    $scope.myArea = function(addrs) {
                        $scope.Area = !$scope.Area;
                        Home.loadRegionalAddress(addrs).then(function(data) {
                            console.log(data);
                            if (data.data.length == 0) {
                                console.log("该地区没有分级了");
                                $scope.regional = "";
                            } else {
                                $scope.regional = data;
                            }
                        });
                    };

                    $scope.chooseCity = function() {
                        $scope.addressModal.remove();
                        sessionStorage.setItem("curCity", $scope.defailtAddress.clientSide);
                        var url = "http://restapi.amap.com/v3/geocode/geo";
                        base.request(url, { key: base.GaodeRestapiKey, address: $scope.defailtAddress.clientSide }).then(function(data) {
                            if (data.info == "OK") {
                                sessionStorage.setItem("geolocation", data.geocodes[0].location);
                                console.log(data.geocodes[0].location);
                            }
                        });
                        // $scope.loadAd();
                    }
                });
            }


            /**
             * 热门城市
             */
            $scope.loadHotAddrs = function() {
                Home.loadHotAddress().then(function(data) {
                    $scope.hotAddress = data;
                });
            };

            /**
             * 定位城市后切换
             * @param  {[type]} city  [定位的城市]
             * @param  {[type]} swipe [是否切换]
             * @return {[type]}       [description]
             */
            $scope.swipeCity = function(city, swipe) {
                if (swipe) {
                    for (var i = 0; i < $scope.citys.length; i++) {
                        for (var j = 0; j < $scope.citys[i].city.length; j++) {
                            if (city.includes($scope.citys[i].city[j].name)) {
                                $scope.defailtAddress.clientSide = $scope.citys[i].city[j].name;
                                break;
                            }
                        }
                    }
                }
                sessionStorage.setItem("curCity", $scope.defailtAddress.clientSide);
                // $scope.loadAd();
            }


            /**
             * 定位，改变当前城市
             * @return {[type]} [description]
             */
            $scope.initMap = function() {
                $scope.mapObj = new AMap.Map('iCenter');
                $scope.mapObj.plugin('AMap.Geolocation', function() {
                    $scope.geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, //是否使用高精度定位，默认:true
                        noIpLocate: 0,
                        timeout: 10000, //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, //定位结果缓存0毫秒，默认：0
                        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    //返回定位信息
                    AMap.event.addListener($scope.geolocation, 'complete', function(GeolocationResult) {
                        console.log(GeolocationResult);
                        var url = 'http://restapi.amap.com/v3/geocode/regeo';
                        var params = {
                            key: base.GaodeRestapiKey,
                            location: GeolocationResult.position.lng + "," + GeolocationResult.position.lat
                        }

                        base.request(url, params).then(function(data) {
                            $scope.citys = angular.fromJson(sessionStorage.getItem("citys"));
                            if (!data.regeocode.addressComponent.city.includes($scope.defailtAddress.clientSide)) {
                                base.confirm($scope, '提示', "定位到您当前城市为<span style='color: #29D2B3;'>" + data.regeocode.addressComponent.city + "</span>, 是否切换?").then(function(res) {
                                    $scope.swipeCity(data.regeocode.addressComponent.city, res);
                                });
                            }
                        });
                        sessionStorage.setItem("geolocation", GeolocationResult.position.lng + "," + GeolocationResult.position.lat);
                    });
                    //返回定位出错信息
                    AMap.event.addListener($scope.geolocation, 'error', function(GeolocationError) {
                        console.log(GeolocationError);
                        if(!sessionStorage.getItem("geoloerror")) {
                            sessionStorage.setItem("geoloerror", "true")
                            base.alert($scope, '提示', '无法定位您的位置');
                        }
                    });

                    $scope.mapObj.addControl($scope.geolocation);
                    $scope.geolocation.getCurrentPosition();
                });
            }
            $scope.initMap();


            /**
             * 点击猜你喜欢目录进入商品详情
             */
            $scope.maybeLikeDetails = function(arg) {
                console.log(arg);
                $state.go("tab.home-shop-pro-details", { backWhere: 'tab.home', proId: arg });
            }

            $scope.clearCityKey = function() {
                $scope.searchCitySender.key = null;
            }


            $scope.$on("$ionicView.enter", function() {
                var adh = $window.innerWidth * 0.35 + 'px';
                $scope.ad_height = {
                    height: adh
                };
                // $scope.loadMaybeLike();
            });

            $scope.$on("$ionicView.beforeEnter", function () {
                $scope.loadItems();
                // $scope.loadAd();
                $scope.loadProty();
                $scope.loadHotAddrs();
                $scope.loadAddrs();
            });
        }
    ])
    .controller('proTypeSearchCtrl', ["$scope", "$state", "$timeout", "$stateParams", "$ionicHistory", "$q", "base", "Home",
        function($scope, $state, $timeout, $stateParams, $ionicHistory, $q, base, Home) {
            //返回按键
            $scope.backWhere = function() {
                $state.go($stateParams.backWhere);
            }
            $scope.key = $stateParams.key;
             //搜索模块内的搜索框
            $scope.searchShopSender = {
                key: null,
                placeholder: '搜索商品类'
            }

            $scope.searchShop = function(arg) {
                $state.go('tab.home-protype-search', { backWhere: 'tab.home', key: arg });
                $scope.clearShopKey();
            }

            $scope.clearShopKey = function(arg) {
                    $scope.searchShopSender.key = null;
                    $timeout(function() {
                        $scope.cancel = !arg;
                    }, 5);
                }
            //获取搜索商品类店铺列表
            $scope.getTypeSearchList = function() {
                Home.loadTypeSearchList($stateParams.key).then(function(data) {
                    console.log(JSON.stringify(data));
                    $scope.typeSearchList = data;
                }, function(resp) {
                    base.prompt("获取店铺列表失败");
                });
            }
            $scope.getTypeSearchList();

            //点击搜索店铺目录进入店铺详情
            $scope.typeSearchShopDetails = function(arg) {
                $state.go("tab.home-shop-list", { backWhere: 'tab.home', key: arg });
            };
            //点击搜索店铺商品目录进入商品详情
             $scope.typeSearchShopProDetails = function(arg) {
                $state.go("tab.home-shop-pro-details", { backWhere: 'tab.home', proId: arg });
            }
        }
    ]);
