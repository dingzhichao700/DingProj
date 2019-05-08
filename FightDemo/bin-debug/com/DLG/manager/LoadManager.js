var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var LoadManager = (function () {
        function LoadManager() {
            this.init();
        }
        LoadManager.prototype.init = function () {
            var self = this;
            self._loadVoPoolArr = [];
            self._movieLoadMap = {};
            self._bmpDataMap = {};
        };
        LoadManager.prototype.getRes = function (url) {
            var self = this;
            if (self._bmpDataMap.hasOwnProperty(url)) {
                return self._bmpDataMap[url];
            }
            return null;
        };
        LoadManager.prototype.load = function (url, loadCallBack, loadCallBackTarget) {
            var self = this;
            if (self._bmpDataMap.hasOwnProperty(url)) {
                loadCallBack.call(loadCallBackTarget, url, self._bmpDataMap[url]);
                return;
            }
            var loadvo;
            if (self._movieLoadMap.hasOwnProperty(url)) {
                loadvo = self._movieLoadMap[url];
                loadvo.addCallBack(loadCallBack, loadCallBackTarget);
                return;
            }
            if (self._loadVoPoolArr.length > 0) {
                loadvo = self._loadVoPoolArr.pop();
            }
            else {
                loadvo = new DLG.LoadVo();
            }
            loadvo.load(url, loadCallBack, loadCallBackTarget);
            self._movieLoadMap[url] = loadvo;
        };
        LoadManager.prototype.addData = function (url, bitmapData) {
            var self = this;
            self._bmpDataMap[url] = bitmapData;
        };
        LoadManager.prototype.returnLoadVo = function (vo) {
            this._loadVoPoolArr.push(vo);
        };
        return LoadManager;
    }());
    DLG.LoadManager = LoadManager;
    __reflect(LoadManager.prototype, "DLG.LoadManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=LoadManager.js.map