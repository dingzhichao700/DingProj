var egret;
(function (egret) {
    /**
     * 血量进度条
     */
    var HPProgressBar = (function (_super) {
        __extends(HPProgressBar, _super);
        function HPProgressBar() {
            _super.call(this);
            //百分比
            this._percent = 0;
            //进度条总宽高
            this._barWidth = 0;
            this._barHeight = 0;
            this._bg = new egret.Image(null, 0, 0, false);
            this.addChild(this._bg);
            this._bar = new egret.Image(null, 0, 0, false);
            this.addChild(this._bar);
        }
        var __egretProto__ = HPProgressBar.prototype;
        Object.defineProperty(__egretProto__, "width", {
            //
            get: function () {
                return this._barWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "height", {
            //
            get: function () {
                return this._barHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "percent", {
            //
            get: function () {
                return this._percent;
            },
            /**
             * 进度百分比
             * @param value
             */
            set: function (value) {
                if (this._percent == value)
                    return;
                if (value > 1)
                    value = 1;
                if (value < 0)
                    value = 0;
                this._percent = value;
                this.updateDisplayList();
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 设置进度条样式
         * @param bgUrl 进度背景地址
         * @param barUrl 进度条地址
         */
        __egretProto__.setStyle = function (bgUrl, barUrl) {
            this._bg.url = bgUrl;
            this._bar.url = barUrl;
            this.setProperties(this._barWidth, this._barHeight);
        };
        //
        /**
         * 设置进度条总宽高
         * @param width 进度条宽
         * @param height 进度条高
         */
        __egretProto__.setProperties = function (width, height) {
            this._barWidth = width;
            this._barHeight = height;
            this._bg.width = width;
            this.updateDisplayList();
        };
        //
        /**
         * 更新进度显示
         */
        __egretProto__.updateDisplayList = function () {
            this._bar.width = this._percent * this._barWidth;
        };
        return HPProgressBar;
    })(egret.DisplayObjectContainer);
    egret.HPProgressBar = HPProgressBar;
    HPProgressBar.prototype.__class__ = "egret.HPProgressBar";
})(egret || (egret = {}));
//# sourceMappingURL=HPProgressBar.js.map