var egret;
(function (egret) {
    var MountedType = (function () {
        function MountedType() {
        }
        var __egretProto__ = MountedType.prototype;
        /**
         * 普通无骑乘状态
         */
        MountedType.NONE = 1;
        /**
         * 骑乘状态
         */
        MountedType.MOUNTED = 2;
        /**
         * 飞骑状态
         */
        MountedType.FLYED = 3;
        return MountedType;
    })();
    egret.MountedType = MountedType;
    MountedType.prototype.__class__ = "egret.MountedType";
})(egret || (egret = {}));
//# sourceMappingURL=MountedType.js.map