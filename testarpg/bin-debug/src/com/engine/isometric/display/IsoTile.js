var egret;
(function (egret) {
    var IsoTile = (function (_super) {
        __extends(IsoTile, _super);
        /**
         * 构造函数
         * @param size:Number 尺寸(px)
         * @param color:uint = 0x666666 颜色
         * @param alpha:Number = 1 透明度
         * @param isoHeight:Number = 0 3D高度
         *
         */
        function IsoTile(size, color, alpha, isoHeight, thickness, fill) {
            if (color === void 0) { color = 0x666666; }
            if (alpha === void 0) { alpha = 1; }
            if (isoHeight === void 0) { isoHeight = 0; }
            if (thickness === void 0) { thickness = 1; }
            if (fill === void 0) { fill = true; }
            _super.call(this, size);
            /**
             * 节点的3D高度
             */
            this._isoHeight = 0;
            /**
             * 绘制颜色
             */
            this._color = 0x666666;
            //透明度
            this._alpha = 1;
            //是否填充绘制
            this._fill = true;
            //线宽
            this._thickness = 1;
            this._color = color;
            this._isoHeight = isoHeight;
            this._alpha = alpha;
            this._fill = fill;
            this._thickness = thickness;
            this.draw();
        }
        var __egretProto__ = IsoTile.prototype;
        /**
         * Draws the tile.
         */
        __egretProto__.draw = function () {
            this.graphics.clear();
            if (this._fill)
                this.graphics.beginFill(this._color, this._alpha);
            this.graphics.lineStyle(this._thickness, this._color, this._alpha);
            this.graphics.moveTo(-this._size, 0);
            this.graphics.lineTo(0, -this._size / 2);
            this.graphics.lineTo(this._size, 0);
            this.graphics.lineTo(0, this._size / 2);
            this.graphics.lineTo(-this._size, 0);
            if (this._fill)
                this.graphics.endFill();
        };
        Object.defineProperty(__egretProto__, "isoHeight", {
            get: function () {
                return this._isoHeight;
            },
            /**
             * Sets / gets the height of this object. Not used in this class, but can be used in subclasses.
             */
            /**
             * 设置3D高度，对于本类无效，用于IsoBox
             * @param value
             *
             */
            set: function (value) {
                if (this._isoHeight == value)
                    return;
                this._isoHeight = value;
                this.draw();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "color", {
            get: function () {
                return this._color;
            },
            /**
             * Sets / gets the color of this tile.
             */
            /**
             * 设置绘制颜色
             * @param value
             *
             */
            set: function (value) {
                if (this._color == value)
                    return;
                this._color = value;
                this.draw();
            },
            enumerable: true,
            configurable: true
        });
        return IsoTile;
    })(egret.IsoBase);
    egret.IsoTile = IsoTile;
    IsoTile.prototype.__class__ = "egret.IsoTile";
})(egret || (egret = {}));
