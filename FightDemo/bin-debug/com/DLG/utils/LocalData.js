var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    /**
     *
     * @author
     *
     */
    var LocalData = (function () {
        function LocalData() {
        }
        LocalData.setData = function (key, data) {
            if (egret.localStorage)
                egret.localStorage.setItem(this.HEAD_KEY + key, data);
        };
        LocalData.getData = function (key) {
            var data;
            if (egret.localStorage) {
                data = egret.localStorage.getItem(this.HEAD_KEY + key);
            }
            return data ? data : '';
        };
        LocalData.removeData = function (key) {
            if (egret.localStorage)
                egret.localStorage.removeItem(this.HEAD_KEY + key);
        };
        return LocalData;
    }());
    LocalData.HEAD_KEY = '';
    DLG.LocalData = LocalData;
    __reflect(LocalData.prototype, "DLG.LocalData");
})(DLG || (DLG = {}));
//# sourceMappingURL=LocalData.js.map