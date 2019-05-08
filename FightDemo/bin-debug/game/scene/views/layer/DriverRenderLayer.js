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
    var DriverRenderLayer = (function (_super) {
        __extends(DriverRenderLayer, _super);
        function DriverRenderLayer() {
            var _this = _super.call(this) || this;
            /**加载中 */
            _this._wallLoadState = 0;
            /**加载完成 */
            _this._wallIsReLoad = false;
            var self = _this;
            self.effectDownLayer = new egret.Sprite;
            self.addChild(self.effectDownLayer);
            self.monsterLayer = new egret.Sprite;
            self.addChild(self.monsterLayer);
            self.bulletLayer = new egret.Sprite;
            self.addChild(self.bulletLayer);
            self._wallBmp = new egret.Bitmap();
            self.addChild(self._wallBmp);
            self.roleLayer = new egret.Sprite;
            self.addChild(self.roleLayer);
            self.effectUpLayer = new egret.Sprite;
            self.addChild(self.effectUpLayer);
            return _this;
        }
        DriverRenderLayer.prototype.addDriver = function (driver, layer) {
            var self = this;
            this.addChild(driver);
            if (layer == game.ENUM_DriverRenderLayerId.monsterLayer) {
                self.monsterLayer.addChild(driver);
            }
            else if (layer == game.ENUM_DriverRenderLayerId.bulletLayer) {
                self.bulletLayer.addChild(driver);
            }
            else if (layer == game.ENUM_DriverRenderLayerId.roleLayer) {
                self.roleLayer.addChild(driver);
            }
        };
        DriverRenderLayer.prototype.addEffect = function (effectid, playTimes, px, py) {
            var self = this;
            var effectCfg = game.EffectTable.getCfgById(effectid);
            var effect;
            var movieName = effectCfg.movie;
            effect = game.EffectMovie.createEffectMovie(movieName);
            if (effectCfg.layer == 1) {
                self.effectDownLayer.addChild(effect);
            }
            else {
                self.effectUpLayer.addChild(effect);
            }
            effect.play(playTimes);
            effect.x = px;
            effect.y = py;
        };
        DriverRenderLayer.prototype.removeDriver = function (driver) {
            if (driver.parent) {
                driver.parent.removeChild(driver);
            }
        };
        DriverRenderLayer.prototype.showWall = function (wallId) {
            var self = this;
            if (self._wallId == wallId) {
                return;
            }
            if (!self._wallLoader) {
                self._wallLoader = new egret.URLLoader();
                self._wallLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
            }
            if (self._wallLoadState == 1) {
                self._wallLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                self._wallLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            }
            if (self._wallBmp && self._wallBmp.texture) {
                self._wallBmp.texture.dispose();
                self._wallBmp.texture = null;
            }
            var urlRequest = new egret.URLRequest(game.GAME_PATH.WALL_PATH + 'wall_' + wallId + game.GAME_PATH.TYPE_PNG);
            self._wallLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            self._wallLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            self._wallLoader.load(urlRequest);
        };
        DriverRenderLayer.prototype.onLoadComplete = function (event) {
            var self = this;
            self._wallLoadState = 2;
            self._wallLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            self._wallLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            var loader = event.target;
            //获取加载到的纹理对象
            var texture = loader.data;
            self._wallBmp.texture = texture;
            self._wallBmp.x = (game.GAME_CORE.APP_WIDTH - texture._bitmapWidth) >> 1;
            self._wallBmp.y = 660;
        };
        DriverRenderLayer.prototype.onLoadError = function () {
            var self = this;
            if (self._wallIsReLoad == false) {
                self._wallIsReLoad = true;
                var urlRequest = new egret.URLRequest(game.GAME_PATH.WALL_PATH + 'wall_' + self._wallId + game.GAME_PATH.TYPE_JPG);
                self._wallLoader.load(urlRequest);
            }
            else {
                sayError('城墙加载失败：', self._wallId);
            }
        };
        return DriverRenderLayer;
    }(egret.Sprite));
    game.DriverRenderLayer = DriverRenderLayer;
    __reflect(DriverRenderLayer.prototype, "game.DriverRenderLayer");
})(game || (game = {}));
//# sourceMappingURL=DriverRenderLayer.js.map