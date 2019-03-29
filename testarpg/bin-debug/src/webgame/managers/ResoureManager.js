var egret;
(function (egret) {
    var ResoureManager = (function () {
        function ResoureManager() {
        }
        var __egretProto__ = ResoureManager.prototype;
        ResoureManager.getInstance = function () {
            return ResoureManager._instance || (ResoureManager._instance = new ResoureManager());
        };
        __egretProto__.loadMapData = function (url, id, callback, target) {
            if (callback === void 0) { callback = null; }
            if (target === void 0) { target = null; }
            RES.getResByUrl(url, loadMapDataComplete, null);
            function loadMapDataComplete(data, url) {
                var lo = new egret.SceneEditLo();
                egret.ObjectUtil.copyProperties(data, lo);
                egret.IsoMapData.getInstance().setData(id, lo);
                if (callback) {
                    callback.apply(target);
                }
            }
        };
        ResoureManager._instance = null;
        return ResoureManager;
    })();
    egret.ResoureManager = ResoureManager;
    ResoureManager.prototype.__class__ = "egret.ResoureManager";
})(egret || (egret = {}));
