define(function (require, exports, module) {
    var newUse = function (array, fuc) {
        this.num = array.length;
        this.fuc = fuc;
        for (var i = 0; i < array.length; i++) {
            this.loadJs(array[i]);
        }
    }
    newUse.prototype.loadJs = function (array) {
        var that = this;
        if (typeof(array) == "string") array = [array];
        var callBac=(array.length == 1?function(){
            if (--that.num == 0){
                if (that.fuc)that.fuc();
            }
        }:function(){
            array.shift();
            that.loadJs(array);
        })
        seajs.use(array[0],callBac);
    }
    exports.use = function (array, fuc) {
        new newUse(array, fuc);
    }
});