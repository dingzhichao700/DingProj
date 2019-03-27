var egret;
(function (egret) {
    var BaseMovieClip2 = (function (_super) {
        __extends(BaseMovieClip2, _super);
        /**
         * 构造函数
         */
        function BaseMovieClip2() {
            _super.call(this);
            //动作位图
            this._bitmap = null;
            //阴影
            this._shadow = null;
            //动作数据
            this._baseMovieClipVo = null;
            //帧数据数组
            this._dataItems = null;
            //是否存在数据数组
            this._hasData = false;
            //总帧数，默认值 0 表示无效值
            this._totalFrames = 0;
            //手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理
            this._totalFramesManual = 0;
            //最大帧索引
            this._frameIndexMax = 0;
            //帧频，默认值 0 表示无效
            this._frameRate = 0;
            this._shadow = new egret.Bitmap();
            this._shadow.cacheAsBitmap = true;
            this.addChild(this._shadow);
            this._bitmap = new egret.Bitmap();
            this.addChild(this._bitmap);
        }
        var __egretProto__ = BaseMovieClip2.prototype;
        Object.defineProperty(__egretProto__, "totalFramesManual", {
            get: function () {
                return this._totalFramesManual;
            },
            /**
             * 手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理，使其从头开始循环取帧 ，默认值 0 表示无效值
             * @param value
             *
             */
            set: function (value) {
                this._totalFramesManual = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "frameRate", {
            /**
             * 帧频，默认值 0 表示无效值
             * @return
             *
             */
            get: function () {
                return this._frameRate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "totalFrames", {
            /**
             * 总帧数，默认值 0 表示无效值
             * @return
             *
             */
            get: function () {
                return this._totalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "baseMovieClipVo", {
            get: function () {
                return this._baseMovieClipVo;
            },
            /**
             * 影片数据对象
             * @param value:BaseMovieClipVo
             *
             */
            set: function (value) {
                this._baseMovieClipVo = value;
                if (this._baseMovieClipVo) {
                    this._dataItems = this._baseMovieClipVo.dataItems;
                    this._hasData = true;
                    this._totalFrames = this._dataItems.length;
                    this._frameIndexMax = this._totalFrames - 1;
                    this._frameRate = this._baseMovieClipVo.frameRate;
                }
                else if (this._bitmap && this._bitmap.texture) {
                    this._dataItems = null;
                    this._hasData = false;
                    this._totalFrames = 0;
                    this._frameIndexMax = 0;
                    this._frameRate = 0;
                }
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 清空当前显示数据并停止影片
         *
         */
        __egretProto__.clear = function () {
            this.baseMovieClipVo = null;
            this._bitmap.texture = null;
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this.clear();
            _super.prototype.destroy.call(this);
        };
        //
        /**
         * 显示当前帧
         * @param index:int 当前帧索引
         *
         */
        __egretProto__.setFrameIndex = function (index) {
            if (index === void 0) { index = 0; }
            if (this._hasData) {
                if (this._totalFramesManual > 0) {
                    //多个动作帧数不一致时，取当前有效帧，使其从头开始循环取帧
                    if (index > this._frameIndexMax) {
                        index %= this._frameIndexMax;
                    }
                }
                else if (index >= this._totalFrames) {
                    index = 0;
                }
                var item = this._dataItems[index];
            }
            if (item) {
                this._bitmap.x = item.x;
                this._bitmap.y = item.y;
                this._bitmap.texture = item.bitmapData;
            }
            else {
                this._bitmap.texture = null;
            }
        };
        return BaseMovieClip2;
    })(egret.CoreContainer);
    egret.BaseMovieClip2 = BaseMovieClip2;
    BaseMovieClip2.prototype.__class__ = "egret.BaseMovieClip2";
})(egret || (egret = {}));
//# sourceMappingURL=BaseMovieClip2.js.map