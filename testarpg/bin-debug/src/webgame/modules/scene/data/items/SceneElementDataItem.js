var egret;
(function (egret) {
    var SceneElementDataItem = (function () {
        function SceneElementDataItem() {
            /**
             * 场景元素表数据
             */
            this.lo = null;
            /**
             * 场景元素服务端数据
             */
            this.vo = null;
        }
        var __egretProto__ = SceneElementDataItem.prototype;
        Object.defineProperty(__egretProto__, "id", {
            get: function () {
                if (this.vo) {
                    if (this.vo.idString)
                        return this.vo.idString;
                    if (this.vo.id)
                        return this.vo.id + "";
                }
                if (this.lo && this.lo.id)
                    return this.lo.id + "";
                return null;
            },
            enumerable: true,
            configurable: true
        });
        return SceneElementDataItem;
    })();
    egret.SceneElementDataItem = SceneElementDataItem;
    SceneElementDataItem.prototype.__class__ = "egret.SceneElementDataItem";
})(egret || (egret = {}));
