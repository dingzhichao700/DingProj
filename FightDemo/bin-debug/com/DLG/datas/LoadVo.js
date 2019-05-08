var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var LoadVo = (function () {
        function LoadVo() {
        }
        LoadVo.prototype.load = function (url, loadCallBack, loadCallBackTarget) {
            var self = this;
            self._loadCallBack = [];
            self._loadCallBackTarget = [];
            self._url = url;
            self._loadCallBack.push(loadCallBack);
            self._loadCallBackTarget.push(loadCallBackTarget);
            this.loadTexture();
        };
        LoadVo.prototype.addCallBack = function (loadCallBack, loadCallBackTarget) {
            var self = this;
            self._loadCallBack.push(loadCallBack);
            self._loadCallBackTarget.push(loadCallBackTarget);
        };
        LoadVo.prototype.onLoadJsonError = function () {
        };
        LoadVo.prototype.loadTexture = function () {
            var self = this;
            if (!self._imageLoader) {
                self._imageLoader = new egret.ImageLoader();
                self._imageLoader.addEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
                self._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
            }
            self._reLoad = false;
            self._imageLoader.load(self._url);
        };
        LoadVo.prototype.onLoadTextureComplete = function (event) {
            var self = this;
            self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
            self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
            self._imageLoader = undefined;
            var loader = event.target;
            //获取加载到的纹理对象
            var bitmapData = loader.data;
            //创建纹理对象
            // self._skinTexture = new egret.Texture();
            // self._skinTexture.bitmapData = bitmapData;
            DLG.DLGCore.loader.addData(self._url, bitmapData);
            var i = 0;
            var len = self._loadCallBack.length;
            for (i = 0; i < len; i++) {
                self._loadCallBack[i].call(self._loadCallBackTarget[i], self._url, bitmapData);
            }
            self._loadCallBack = null;
            self._loadCallBackTarget = null;
            DLG.DLGCore.loader.returnLoadVo(self);
        };
        LoadVo.prototype.onLoadTextureError = function () {
            var self = this;
            if (self._reLoad == true) {
                self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
                self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
                self._imageLoader = undefined;
                DLG.DLGCore.loader.returnLoadVo(self);
                self._loadCallBack = null;
                self._loadCallBackTarget = null;
                sayError('加载资源出错', self._url);
            }
            else {
                self._reLoad = true;
                self._imageLoader.load(self._url);
            }
        };
        return LoadVo;
    }());
    DLG.LoadVo = LoadVo;
    __reflect(LoadVo.prototype, "DLG.LoadVo");
})(DLG || (DLG = {}));
//# sourceMappingURL=LoadVo.js.map