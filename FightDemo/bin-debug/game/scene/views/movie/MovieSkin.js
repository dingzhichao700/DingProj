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
    var MovieSkin = (function (_super) {
        __extends(MovieSkin, _super);
        function MovieSkin(showMovie) {
            var _this = _super.call(this) || this;
            /**加载状态 */
            _this._loadEnd = false;
            _this._totalFrame = 0;
            _this._playFrame = 0;
            var self = _this;
            self.touchEnabled = false;
            self.setShowMovie(showMovie);
            return _this;
        }
        MovieSkin.prototype.setShowMovie = function (value) {
            var self = this;
            if (value == true) {
                if (!self._skinRenderBmp) {
                    self._skinRenderBmp = new egret.Bitmap();
                    self.addChild(self._skinRenderBmp);
                }
                if (!self._renderTexture)
                    self._renderTexture = new egret.RenderTexture();
                if (!self._rect)
                    self._rect = new egret.Rectangle();
                if (!self._skinBitMap)
                    self._skinBitMap = new egret.Bitmap();
            }
            else {
            }
        };
        // protected _isPlay: boolean = false;
        // public play(): void
        // {
        // 	let self = this;
        // 	self._isPlay = true;
        // }
        // public stop(): void
        // {
        // 	let self = this;
        // 	self._isPlay = false;
        // }
        MovieSkin.prototype.setDirection = function (value) {
            var self = this;
            self._direction = value;
            // if (self._action != undefined && self._movieName && self._path)
            // {
            // 	self._playIndex = 0;
            // 	self.loadMovie();
            // }
        };
        MovieSkin.prototype.setAction = function (value) {
            var self = this;
            if (self._action != value) {
                self._action = value;
            }
        };
        MovieSkin.prototype.goToAndStop = function (frame) {
            var self = this;
            self._isStop = true;
            self._playFrame = frame;
            if (self._loadEnd == false) {
                // self._playIndex = index;
                return;
            }
            self.renderSkin(frame, true);
            if (self.onPlayFrameCallBack) {
                self.onPlayFrameCallBack.call(self.onPlayFrameTaget, frame, self._totalFrame);
            }
        };
        MovieSkin.prototype.nextFrame = function () {
            var self = this;
            if (self._isStop == true) {
                return;
            }
            if (self._loadEnd == false) {
                self._playFrame++;
                return;
            }
            // if (self._playIndex > self._totalFrame)
            // {
            // 	//加载完后，设置在播放点上
            // 	self._playIndex = self._playIndex % self._totalFrame;
            // 	self.renderSkin(self._playIndex);
            // } else {
            var frame = self._playFrame;
            frame++;
            if (frame > self._totalFrame) {
                frame = 1;
            }
            self.renderSkin(frame);
            // }
            if (self.onPlayFrameCallBack) {
                self.onPlayFrameCallBack.call(self.onPlayFrameTaget, self._playFrame, self._totalFrame);
            }
        };
        MovieSkin.prototype.renderSkin = function (index, exRender) {
            if (exRender === void 0) { exRender = true; }
            var self = this;
            if (!self._skinRenderBmp) {
                return;
            }
            // if (self._playIndex == -1)
            // {
            // 	return;
            // }	
            if (exRender == false && self._playFrame == index) {
                return;
            }
            self._playFrame = index;
            var frameData = self._poses[self._playFrame - 1];
            var frame = frameData.frame;
            if (self._rect.x == frame.x && self._rect.y == frame.y) {
                return;
            }
            var spriteSourceSize = frameData.spriteSourceSize;
            var sourceSize = frameData.sourceSize;
            self._rect.x = frame.x;
            self._rect.y = frame.y;
            if (frameData.rotated == true) {
                self._rect.width = frame.h;
                self._rect.height = frame.w;
            }
            else {
                self._rect.width = frame.w;
                self._rect.height = frame.h;
            }
            //使用 RenderTexture 进行显示
            // self._renderTexture.drawToTexture(new egret.Bitmap(self._skinBitMap), self._rect);
            self._renderTexture.drawToTexture(self._skinBitMap, self._rect);
            //将绘制好的 RenderTexture 进行显示
            var bmp = self._skinRenderBmp;
            if (bmp.bitmapData)
                bmp.bitmapData.$dispose();
            if (bmp.texture)
                bmp.texture = null;
            bmp.texture = self._renderTexture;
            if (frameData.rotated == true) {
                bmp.rotation = -90;
                bmp.x = spriteSourceSize.x - sourceSize.w / 2;
                bmp.y = spriteSourceSize.y - sourceSize.h / 2 + frame.h;
            }
            else {
                bmp.rotation = 0;
                bmp.x = spriteSourceSize.x - sourceSize.w / 2;
                bmp.y = spriteSourceSize.y - sourceSize.h / 2;
            }
            bmp.width = self._rect.width;
            bmp.height = self._rect.height;
        };
        // protected _footX: number;
        // protected _footY: number;
        // /**设置脚点 */
        // public setFootPoint(x: number, y: number): void
        // {
        // 	let self = this;
        // 	self._footX = x;
        // 	self._footY = y;
        // 	egret.callLater(self.renderSkin, this);
        // }
        MovieSkin.prototype.setMovieName = function (path, movieName) {
            var self = this;
            if (self._path == path && self._movieName == movieName) {
                return;
            }
            self._movieName = movieName;
            self._path = path;
            self._playFrame = 0;
            self._totalFrame = 0;
            // if (self._action != undefined && self._direction)
            // {
            // 	self.loadMovie();
            // }
        };
        MovieSkin.prototype.loadMovie = function () {
            var self = this;
            var url;
            if (self._action == 0) {
                url = self._path + self._movieName + '/' + self._direction;
            }
            else {
                url = self._path + self._movieName + '/' + MovieSkin.getActionPath(self._action) + '/' + self._direction;
            }
            if (url != self._url) {
                self._url = url;
                self._loadEnd = false;
                if (self._rect)
                    self._rect.x = -1;
                var loadMar = game.MovieLoadManager.getInstance();
                var arr = loadMar.getRes(url);
                if (arr) {
                    self.onLoadComplete(self._url, arr[0], arr[1]);
                }
                else {
                    game.MovieLoadManager.getInstance().load(url, self.onLoadComplete, self);
                }
            }
        };
        MovieSkin.prototype.onLoadComplete = function (url, jsonObj, bitmapData) {
            var self = this;
            // if (!self.parent)
            // {
            // 	return;
            // }	
            if (url == self._url) {
                self.unbindJosn(jsonObj);
                //创建纹理对象
                // if (self._skinTexture && self._skinTexture.bitmapData)
                // {
                // 	self._skinTexture.bitmapData.$dispose();
                // }	
                if (self._skinBitMap)
                    self._skinBitMap.bitmapData = bitmapData;
                self._loadEnd = true;
                if (self._playFrame != 0) {
                    if (self._playFrame > self._totalFrame) {
                        self._playFrame = self._playFrame % self._totalFrame;
                        if (self._playFrame == 0) {
                            self._playFrame = 1;
                        }
                    }
                    self.renderSkin(self._playFrame, true);
                }
                else {
                    self.nextFrame();
                }
            }
        };
        /**解析json */
        MovieSkin.prototype.unbindJosn = function (jsonObj) {
            var self = this;
            self._totalFrame = 0;
            var framesObj = jsonObj.frames;
            var i = 0;
            var len = framesObj.length;
            if (self._poses) {
                self._poses.length = 0;
            }
            self._poses = [];
            for (i = 0; i < len; i++) {
                self._poses[self._totalFrame] = framesObj[i];
                self._totalFrame++;
            }
            if (true) {
                if (self._totalFrame == 0) {
                    throw new Error('皮肤json不正确' + self._url);
                }
            }
        };
        MovieSkin.getActionPath = function (_action) {
            if (_action == game.ENUM_DriverAction.attack) {
                return 'attack';
            }
            else if (_action == game.ENUM_DriverAction.run) {
                return 'run';
            }
            else if (_action == game.ENUM_DriverAction.stand) {
                return 'stand';
            }
            return '';
        };
        MovieSkin.prototype.destroy = function () {
            var self = this;
            self.onPlayFrameCallBack = undefined;
            self.onPlayFrameTaget = undefined;
            // self._jsonObj = undefined;
            self._poses = undefined;
            self._playFrame = 0;
            self._totalFrame = 0;
            self._url = undefined;
            self._path = undefined;
            self._movieName = undefined;
            self._direction = undefined;
            self._action = undefined;
            self._isStop = undefined;
        };
        return MovieSkin;
    }(egret.DisplayObjectContainer));
    game.MovieSkin = MovieSkin;
    __reflect(MovieSkin.prototype, "game.MovieSkin");
})(game || (game = {}));
//# sourceMappingURL=MovieSkin.js.map