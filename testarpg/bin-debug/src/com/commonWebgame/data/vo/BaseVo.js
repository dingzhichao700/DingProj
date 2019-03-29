var egret;
(function (egret) {
    var BaseVo = (function () {
        /**
         * 构造函数
         */
        function BaseVo() {
            //this.className = this.constructor["name"];
        }
        var __egretProto__ = BaseVo.prototype;
        return BaseVo;
    })();
    egret.BaseVo = BaseVo;
    BaseVo.prototype.__class__ = "egret.BaseVo";
})(egret || (egret = {}));
