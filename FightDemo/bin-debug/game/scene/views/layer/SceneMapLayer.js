var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var SceneMapLayer = (function (_super) {
        __extends(SceneMapLayer, _super);
        // protected _mapRequest:egret.URLRequest
        function SceneMapLayer() {
            var _this = _super.call(this) || this;
            /**加载中 */
            _this._loadState = 0;
            /**加载完成 */
            _this._isReLoad = false;
            var self = _this;
            if (!self._mapLoader) {
                self._mapLoader = new egret.URLLoader();
                self._mapLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            }
            self._mapBmp = new egret.Bitmap();
            self._mapBmp.x = 0;
            self._mapBmp.y = 320;
            self.addChild(self._mapBmp);
            return _this;
        }
        SceneMapLayer.prototype.loadMap = function (mapname, sceneId) {
            var self = this;
            if (self._mapname == mapname) {
                return;
            }
            if (self._loadState == 1) {
                self._mapLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                self._mapLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            }
            if (self._mapBmp && self._mapBmp.texture) {
                self._mapBmp.texture.dispose();
                self._mapBmp.texture = null;
            }
            self._sceneId = sceneId;
            self._mapname = mapname;
            self._isReLoad = false;
            var urlRequest = new egret.URLRequest(game.GAME_PATH.MAP_PATH + mapname + game.GAME_PATH.TYPE_JPG);
            self._mapLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            self._mapLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            self._mapLoader.load(urlRequest);
        };
        SceneMapLayer.prototype.onLoadComplete = function (event) {
            var self = this;
            self._loadState = 2;
            self._mapLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            self._mapLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var loader = event.target;
            //获取加载到的纹理对象
            var texture = loader.data;
            self._mapBmp.texture = texture;
            if (self.callBack) {
                self.callBack.call(self.callBackTarget);
            }
        };
        SceneMapLayer.prototype.onLoadError = function () {
            var self = this;
            if (self._isReLoad == false) {
                self._isReLoad = true;
                var urlRequest = new egret.URLRequest(game.GAME_PATH.MAP_PATH + self._mapname + game.GAME_PATH.TYPE_JPG);
                self._mapLoader.load(urlRequest);
            }
            else {
                sayError('地图加载失败：', self._mapname);
            }
        };
        SceneMapLayer.prototype.getMapName = function () {
            return this._mapname;
        };
        return SceneMapLayer;
    }(egret.DisplayObjectContainer));
    game.SceneMapLayer = SceneMapLayer;
    __reflect(SceneMapLayer.prototype, "game.SceneMapLayer");
})(game || (game = {}));
//# sourceMappingURL=SceneMapLayer.js.map