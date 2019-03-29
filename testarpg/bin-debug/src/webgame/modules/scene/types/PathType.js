var egret;
(function (egret) {
    var PathType = (function () {
        function PathType() {
        }
        var __egretProto__ = PathType.prototype;
        /**
         * 无法通过的，障碍 -1
         */
        PathType.OBSTACLE = -1;
        /**
         * 可行走 0
         */
        PathType.WALKABLE = 0;
        /**
         * 透明 1
         */
        PathType.TRANSPARENT = 1;
        return PathType;
    })();
    egret.PathType = PathType;
    PathType.prototype.__class__ = "egret.PathType";
})(egret || (egret = {}));
