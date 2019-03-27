var egret;
(function (egret) {
    /***
     * 特殊动画名称
     */
    var MovieName = (function () {
        function MovieName() {
        }
        var __egretProto__ = MovieName.prototype;
        /**
         * 切换场景特效
         * @type {string}
         */
        MovieName.EFFECT_01 = "effect_01";
        /**
         * 升级特效
         * @type {string}
         */
        MovieName.LEVEL_UP = "levelUp";
        return MovieName;
    })();
    egret.MovieName = MovieName;
    MovieName.prototype.__class__ = "egret.MovieName";
})(egret || (egret = {}));
//# sourceMappingURL=MovieName.js.map