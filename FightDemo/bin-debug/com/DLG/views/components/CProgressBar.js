var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    var CProgressBar = (function (_super) {
        __extends(CProgressBar, _super);
        function CProgressBar() {
            var _this = _super.call(this) || this;
            _this.thumbInitX = 0;
            _this.thumbInitY = 0;
            /**
             * @private
             */
            _this._direction = eui.Direction.LTR;
            _this._labelFunction = null;
            return _this;
        }
        CProgressBar.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var thumb = this.thumb;
            this.thumbInitX = thumb.x;
            this.thumbInitY = thumb.y;
            var thumbIndex = this.getChildIndex(this.thumb);
            this.thumbMask = new eui.Rect();
            if (thumbIndex >= this.numChildren) {
                this.addChild(this.thumbMask);
            }
            else {
                this.addChildAt(this.thumbMask, thumbIndex + 1);
            }
            this.invalidateDisplayList();
        };
        Object.defineProperty(CProgressBar.prototype, "direction", {
            /**
             * ProgressBar 填充在逐步完成过程中扩展的方向。使用 <code>Direction</code> 类定义的常量。
             *
             * @default Direction.LTR
             *
             * @version Egret 2.4
             * @version eui 1.0
             * @platform Web,Native
             * @language zh_CN
             */
            get: function () {
                return this._direction;
            },
            set: function (value) {
                if (this._direction == value)
                    return;
                // if(this.thumb) this.thumb.x = this.thumbInitX;
                // if(this.thumb) this.thumb.y = this.thumbInitY;
                this._direction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        CProgressBar.prototype.updateDisplayList = function (w, h) {
            _super.prototype.updateDisplayList.call(this, w, h);
            egret.callLater(this.updateSkinDisplayList, this);
        };
        // $setValue(newValue:number):boolean {
        //     if (this.value === newValue)
        //         return false;
        //     let values = this.$Range;
        // 	this.value
        //     let result:boolean = super.$setValue(newValue);
        //     if (this._slideDuration > 0 && this.$stage) {
        //         // this.validateProperties();//最大值最小值发生改变时要立即应用，防止当前起始值不正确。
        //         let animation = this.animation;
        //         if (animation.isPlaying) {
        //             this.animationValue = this.slideToValue;
        //             this.invalidateDisplayList();
        //             animation.stop();
        //         }
        //         this.slideToValue = this.nearestValidValue(newValue, values[sys.RangeKeys.snapInterval]);
        //         if (this.slideToValue === this.animationValue)
        //             return result;
        //         let duration = this._slideDuration *
        //             (Math.abs(this.animationValue - this.slideToValue) / (values[sys.RangeKeys.maximum] - values[sys.RangeKeys.minimum]));
        //         animation.duration = duration === Infinity ? 0 : duration;
        //         animation.from = this.animationValue;
        //         animation.to = this.slideToValue;
        //         animation.play();
        //     }
        //     else {
        //         this.animationValue = this.value;
        //     }
        //     return result;
        // }
        CProgressBar.prototype.updateSkinDisplayList = function () {
            var currentValue = this.value;
            var maxValue = this.maximum;
            var thumb = this.thumb;
            var thumbMask = this.thumbMask;
            var followThumb = this.followThumb;
            if (thumb && thumbMask) {
                var thumbWidth = thumb.width;
                var thumbHeight = thumb.height;
                var clipWidth = Math.round((currentValue / maxValue) * thumbWidth);
                if (clipWidth < 0 || clipWidth === Infinity)
                    clipWidth = 0;
                var clipHeight = Math.round((currentValue / maxValue) * thumbHeight);
                if (clipHeight < 0 || clipHeight === Infinity)
                    clipHeight = 0;
                // let rect = thumb.$scrollRect;
                // if (!rect) {
                //     rect = egret.$TempRectangle;
                // }
                // rect.setTo(0,0,thumbWidth,thumbHeight);
                // let thumbPosX = thumb.x - rect.x;
                // let thumbPosY = thumb.y - rect.y;
                switch (this._direction) {
                    case eui.Direction.LTR:
                        thumbMask.width = clipWidth;
                        thumbMask.height = thumbHeight;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb)
                            followThumb.x = clipWidth + this.thumbInitX;
                        break;
                    case eui.Direction.RTL:
                        thumbMask.width = clipWidth;
                        thumbMask.height = thumbHeight;
                        thumbMask.x = thumbWidth - clipWidth;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb)
                            followThumb.x = thumbMask.x - followThumb.width;
                        break;
                    case eui.Direction.TTB:
                        thumbMask.height = clipHeight;
                        thumbMask.width = thumbWidth;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = this.thumbInitY;
                        if (followThumb)
                            followThumb.y = clipHeight + this.thumbInitY;
                        break;
                    case eui.Direction.BTT:
                        thumbMask.height = clipHeight;
                        thumbMask.width = thumbWidth;
                        thumbMask.x = this.thumbInitX;
                        thumbMask.y = thumbHeight - clipHeight;
                        if (followThumb)
                            followThumb.y = thumbMask.y - followThumb.height;
                        break;
                }
            }
            if (this.label) {
                this.label.text = this.valueToLabel(currentValue, maxValue);
            }
        };
        Object.defineProperty(CProgressBar.prototype, "labelFunction", {
            /**
             * 进度条文本格式化回调函数。示例：
             * <code>labelFunction(value:Number,maximum:Number):String;</code>
             */
            get: function () {
                return this._labelFunction;
            },
            set: function (value) {
                if (this._labelFunction == value)
                    return;
                this._labelFunction = value;
                this.invalidateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 将当前value转换成文本
         */
        CProgressBar.prototype.valueToLabel = function (value, maximum) {
            if (this.labelFunction != null) {
                return this._labelFunction(value, maximum);
            }
            return value + " / " + maximum;
        };
        CProgressBar.prototype.renderDraw = function () {
        };
        CProgressBar.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CProgressBar.prototype.setData = function (value) {
            this._data = value;
        };
        CProgressBar.prototype.getData = function (value) {
            return this._data;
        };
        CProgressBar.prototype.removeFromParent = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        CProgressBar.prototype.onDestroy = function () {
            this._data = null;
            if (this.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            while (this.numChildren > 0) {
                this.removeChildAt(0);
            }
        };
        return CProgressBar;
    }(eui.Range));
    DLG.CProgressBar = CProgressBar;
    __reflect(CProgressBar.prototype, "DLG.CProgressBar", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CProgressBar.js.map