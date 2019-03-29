var egret;
(function (egret) {
    var MapMoveType = (function () {
        function MapMoveType() {
        }
        var __egretProto__ = MapMoveType.prototype;
        /**
         * 匀速移动
         */
        MapMoveType.CONSTANT_VELOCITY = "constantVelocity";
        /**
         * 按距离和系数乘积移动
         */
        MapMoveType.FACTOR = "factor";
        return MapMoveType;
    })();
    egret.MapMoveType = MapMoveType;
    MapMoveType.prototype.__class__ = "egret.MapMoveType";
})(egret || (egret = {}));
