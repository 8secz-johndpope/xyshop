angular.module('starter.controllers', ["ionic", "home.controller", "realtime.controller", "cart.controller", "account.controller", "products.controller"])
.controller('baseCtrl', function($scope, $rootScope) {
	$rootScope.regexp = {
                username: /[^\u4e00-\u9fa5]/g,
                email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
                useridcard: /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/,
                phone: /^1[3|4|5|7|8][0-9]{9}$/
            }
});
