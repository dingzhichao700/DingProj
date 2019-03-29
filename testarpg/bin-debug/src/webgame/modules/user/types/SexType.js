var egret;
(function (egret) {
    var SexType = (function () {
        function SexType() {
        }
        var __egretProto__ = SexType.prototype;
        /**
         * 未知
         */
        SexType.UNKNOWN = 0;
        /**
         * 男
         */
        SexType.MALE = 1;
        /**
         * 女
         */
        SexType.FEMALE = 2;
        return SexType;
    })();
    egret.SexType = SexType;
    SexType.prototype.__class__ = "egret.SexType";
})(egret || (egret = {}));
