var egret;
(function (egret) {
    var PathPolicyType = (function () {
        function PathPolicyType() {
        }
        var __egretProto__ = PathPolicyType.prototype;
        /**
         * 绘制全部路径
         */
        PathPolicyType.ALL = "all";
        /**
         * 只绘制视口中的路径
         */
        PathPolicyType.VIEW = "view";
        /**
         * 只绘制渲染区域中的路径
         */
        PathPolicyType.RENDER = "render";
        return PathPolicyType;
    })();
    egret.PathPolicyType = PathPolicyType;
    PathPolicyType.prototype.__class__ = "egret.PathPolicyType";
})(egret || (egret = {}));
//# sourceMappingURL=PathPolicyType.js.map