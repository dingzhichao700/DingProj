var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var VMCLoadVo = (function () {
    function VMCLoadVo() {
        var self = this;
        self._josnLoader = new egret.URLLoader();
        self._josnLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
    }
    VMCLoadVo.prototype.load = function (url, loadCallBack, loadCallBackTarget) {
        var self = this;
        self._loadCallBack = [];
        self._loadCallBackTarget = [];
        self._url = url;
        self._loadCallBack.push(loadCallBack);
        self._loadCallBackTarget.push(loadCallBackTarget);
        if (!self._urlRequest) {
            self._urlRequest = new egret.URLRequest(url + VMCLoadVo.TYPE_JSON);
        }
        else {
            self._urlRequest.url = url + VMCLoadVo.TYPE_JSON;
        }
        self._jsonReLoad = false;
        self._imageReLoad = false;
        self._josnLoader.addEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
        self._josnLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
        self._josnLoader.load(self._urlRequest);
    };
    VMCLoadVo.prototype.onLoadJsonComplete = function (event) {
        var self = this;
        self._josnLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
        self._josnLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
        var loader = event.target;
        self._jsonObj = JSON.parse(loader.data);
        // self.unbindJosn();
        this.loadTexture();
    };
    VMCLoadVo.prototype.onLoadJsonError = function () {
        var self = this;
        if (self._jsonReLoad == true) {
            self._josnLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
            self._josnLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
            self._loadCallBack = null;
            self._loadCallBackTarget = null;
            sayError('加载资源出错', self._url);
        }
        else {
            self._jsonReLoad = true;
            self._josnLoader.load(self._urlRequest);
        }
    };
    VMCLoadVo.prototype.loadTexture = function () {
        var self = this;
        if (!self._imageLoader) {
            self._imageLoader = new egret.ImageLoader();
            self._imageLoader.addEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
            self._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
        }
        self._imageLoader.load(self._url + VMCLoadVo.TYPE_PNG);
    };
    VMCLoadVo.prototype.onLoadTextureComplete = function (event) {
        var self = this;
        self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
        self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
        self._imageLoader = undefined;
        var loader = event.target;
        //获取加载到的纹理对象
        var s = loader.data;
        //创建纹理对象
        // self._skinTexture = new egret.Texture();
        // self._skinTexture.bitmapData = bitmapData;
        var i = 0;
        var len = self._loadCallBack.length;
        for (i = 0; i < len; i++) {
            self._loadCallBack[i].call(self._loadCallBackTarget[i], self._url, self._jsonObj, bitmapData);
        }
        self._loadCallBack = null;
        self._loadCallBackTarget = null;
    };
    VMCLoadVo.prototype.onLoadTextureError = function () {
        var self = this;
        if (self._imageReLoad == true) {
            self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
            self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
            self._imageLoader = undefined;
            MovieLoadManager.getInstance().returnMovieLoadVo(self);
            self._loadCallBack = null;
            self._loadCallBackTarget = null;
            sayError('加载资源出错', self._url);
        }
        else {
            self._imageReLoad = true;
            self._imageLoader.load(self._url);
        }
    };
    return VMCLoadVo;
}());
VMCLoadVo.TYPE_JPG = '.jpg';
VMCLoadVo.TYPE_PNG = '.png';
VMCLoadVo.TYPE_JSON = '.json';
__reflect(VMCLoadVo.prototype, "VMCLoadVo");
//# sourceMappingURL=VMCLoadVo.js.map