var egret;
(function (egret) {
    var IsoMapData = (function () {
        /**
         * 构造函数
         */
        function IsoMapData() {
            //地图数据
            this._hashMap = null;
            this._hashMap = new egret.HashMap();
        }
        var __egretProto__ = IsoMapData.prototype;
        IsoMapData.getInstance = function () {
            return IsoMapData._instance || (IsoMapData._instance = new IsoMapData());
        };
        //
        /**
         * 设置地图数据
         * @param id:* 数据  id
         * @param data:* 数据对象
         *
         */
        __egretProto__.setData = function (id, data) {
            if (this._hashMap.containsKey(id)) {
                egret.LogManager.error(this, "重复设置地图数据 id = " + id);
            }
            else {
                this._hashMap.put(id, data);
            }
        };
        //
        /**
         * 获取地图数据
         * @param id:* 数据  id
         * @return
         *
         */
        __egretProto__.getData = function (id) {
            return this._hashMap.get(id);
        };
        IsoMapData._instance = null;
        return IsoMapData;
    })();
    egret.IsoMapData = IsoMapData;
    IsoMapData.prototype.__class__ = "egret.IsoMapData";
})(egret || (egret = {}));
//# sourceMappingURL=IsoMapData.js.map