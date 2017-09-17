angular.module('products.controller', ['ionic'])

//产品列表控制器
.controller("proListCtrl", ["$scope", "$ionicTabsDelegate", "$ionicHistory", "$stateParams", "$state", "$timeout", "base", "Home", "Products",
        function($scope, $ionicTabsDelegate, $ionicHistory, $stateParams, $state, $timeout, base, Home, Products) {

            $scope.title = $stateParams.title;

            $scope.firstLoad = true;

            //获取产品分类商品列表传的对象
            $scope.searchParams = {
                typeid: $stateParams.productTypeId,
                productProducttypeid: $stateParams.productProducttypeid ? $stateParams.productProducttypeid : "-1",
                nearby: 50000,
                sort: 0,
                curProInx: 0,
                moreDataCanBeLoaded: true,
                nearbyshops: '',
                allowLoad: false
            };

            $scope.selected = {
                type: '',
                nearby: '附近(智能距离)',
                sort: '智能排序'
            }

            //返回按键
            $scope.itemBack = function() {
                $ionicHistory.goBack();
            }

            /**
             * 定位当前位置附近商铺
             * @return {[type]} [description]
             */
            $scope.nearbyshop = function() {
                $scope.searchOptions = {
                    pageIndex: 0,
                    pageSize: 100,
                    orderBy: '_distance',
                };
                //初始化
                base.loading();
                $scope.typePros = new Array();
                $scope.searchParams.curProInx = 0;
                $scope.searchParams.allowLoad = false;
                $scope.searchParams.moreDataCanBeLoaded = true;

                AMap.plugin('AMap.CloudDataSearch', function() { //回调函数
                    $scope.cloudSearch = new AMap.CloudDataSearch(base.GaodeTableId, $scope.searchOptions); //构造云数据检索类
                    var center = sessionStorage.getItem("geolocation").split(",");
                    $scope.cloudSearch.searchNearBy(center, $scope.searchParams.nearby, function(state, data) {
                        console.log("load cloud data end");
                        console.log(sessionStorage.getItem("geolocation"));
                        console.log(data);
                        if (data && data.datas && data.datas.length > 0) {
                            if (data.info == "OK") {
                                var shops = new Array();
                                for (var i = 0; i < data.datas.length; i++) {
                                    shops.push(data.datas[i].shopId);
                                }
                                $scope.searchParams.nearbyshops = shops.join(",");
                                $timeout(function() {
                                	$scope.loadTypePro(true);
                                }, 300);
                            }
                        } else {
                        	$scope.searchParams.moreDataCanBeLoaded = false;
                        	base.loaded();
                        }
                    });
                })
            }

            /**
             * 下载产品分类的全部商品列表
             * @return {[type]} [description]
             */
            $scope.typePros = new Array();
            $scope.loadTypePro = function(allow) {
                if(allow) {
                    $scope.searchParams.curProInx++;
                    Products.getProByType($scope.searchParams).then(function(data) {
                        if (data && data.length < 20) {
                            $scope.searchParams.moreDataCanBeLoaded = false;
                        }
                        if(!$scope.typePros) {
                            $scope.typePros = new Array();
                        }
                        for (var i = 0; i < data.length; i++) {
                            data[i].showpic = data[i].productimgurl.split("，")[0];
                            $scope.typePros.push(data[i]);
                        }
                        if ($scope.typePros && $scope.typePros.length == 0) {
                            $scope.typePros = new Array();

                        }
                        $scope.searchParams.allowLoad = true;
                        base.loaded();
                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    }, function(resp) {
                        base.prompt("获取分类商品失败");
                    });
                }
            }

            /**
             * 下载全部分类数组（为获取子分类产品列表所需要的id）
             */
            $scope.getTypeChild = function() {
                Home.loadAllProty().then(function(data) {
                    var temp = null;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].id == $stateParams.productTypeId) {
                            $scope.typeChild = data[i];
                            $scope.typeChild.childs.splice(0, 0, { "name": "全部", "id": "-1" });
                            for (var j = 0; j < data[i].childs.length; j++) {
                                if ($stateParams.productProducttypeid == data[i].childs[j].id) {
                                    temp = data[i].childs[j].name;
                                }
                            }
                        }
                    }
                    if (temp) {
                        $scope.selected.type = temp;
                    } else {
                        $scope.selected.type = $scope.typeChild.childs[0].name
                    }
                });
            }
            $scope.getTypeChild();

            $scope.anewSearch = function() {
                $scope.typePros = new Array();
                $scope.searchParams.curProInx = 0;
                $scope.searchParams.moreDataCanBeLoaded = true;
            }

            /**
             * 商品类浮动框
             * @param  {[type]}
             * @return {[type]}
             */
            base.openPopover("templates/item-PopoverProList.html", $scope).then(function(popover) {
                $scope.openPopoverProList = popover;
            });


            /**
             * 附近商品浮动框
             * @param  {[type]}
             * @return {[type]}
             */
            base.openPopover("templates/item-PopoverNearby.html", $scope).then(function(popover) {
                $scope.openPopoverNearby = popover;
            });

            $scope.contentList1 = [
                { text: "附近(智能距离)", value: 500 },
                { text: "1千米", value: 1000 },
                { text: "3千米", value: 3000 },
                { text: "5千米", value: 5000 },
                { text: "10千米", value: 10000 },
                { text: "全城", value: 50000 }
            ];
            /**
             * 商品排序类浮动框
             * @param  {[type]}
             * @return {[type]}
             */
            base.openPopover("templates/item-PopoverSort.html", $scope).then(function(popover) {
                $scope.openPopoverSort = popover;
            });

            $scope.contentList2 = [
                { text: "智能排序", value: 0 },
                { text: "离我最近", value: 1 },
                { text: "人气最高", value: 2 }
            ];

            /**
             * 点击分类商品目录进入商品详情
             */
            $scope.typeProDetails = function(arg) {
                $state.go("tab.home-shop-pro-details", { backWhere: 'tab.home', proId: arg });
            }

            $scope.$on("$ionicView.enter", function() {
            	if ($scope.firstLoad) {
            		$scope.firstLoad = false;
            		$scope.nearbyshop();
            	}
            });
        }
    ])
    //产品详情控制器
    .controller("proDetailsCtrl", ["$scope", "$state", "$ionicTabsDelegate", "$ionicHistory", "$stateParams", "$ionicSlideBoxDelegate", "$sce", "base", "Products", "Account",
        function($scope, $state, $ionicTabsDelegate, $ionicHistory, $stateParams, $ionicSlideBoxDelegate, $sce, base, Products, Account) {
            //下载商品详情
            $scope.loadProDetails = function() {
                //console.log(JSON.stringify($stateParams.proId));
                Products.getProDetails($stateParams.proId).then(function(data) {
                    $scope.proDetails = data;
                    $scope.proDetails.gallery = data[0].productimgurl.split('，');
                    $ionicSlideBoxDelegate.update();
                    console.log(data);
                    //获取商品图文详情
                    base.request("proloadProDetail", { "id": $scope.proDetails[0].productid }).then(function(resp) {
                        console.log(resp.reason);
                        $scope.proDetail = $sce.trustAsHtml(resp.reason);
                    });
                }, function(resp) {
                    base.prompt("获取商品详情失败");
                });
            }

            $scope.loadProDetails();
            //点击抢购了进入提交订单
            $scope.goSubmitOrder = function() {
                    if (Account.signined) {
                        $state.go($stateParams.backWhere + "-shop-pro-order", { backWhere: $stateParams.backWhere, product: angular.toJson($scope.proDetails[0]) });
                    } else {
                        base.prompt($scope, "请先登录");
                    }
                }
                //点击商品详情中的商家信息进入店铺详情
            $scope.proShopDetails = function(arg) {
                $state.go($stateParams.backWhere + "-shop-list", { backWhere: $stateParams.backWhere, key: arg });
            }
        }
    ]);
