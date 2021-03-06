var egret;
(function (egret) {
    var SceneElementNamePad = (function (_super) {
        __extends(SceneElementNamePad, _super);
        function SceneElementNamePad() {
            _super.call(this);
            //名称
            this._nameText = null;
            //层容器
            this._layerHashMap = null;
            //容器，元素之间的水平竖直距离 
            this._gapX = 5;
            this._gapY = 5;
            //面板显示的名称
            this._nameValue = null;
            this._defaultColor = 0xffffff;
            this._defaultSize = 20;
            //			this.graphics.lineStyle(1,0xff0000,1);
            //			this.graphics.moveTo(-100,0);
            //			this.graphics.lineTo(100,0);
            this.touchChildren = false;
            this.touchEnabled = false;
            //性能优化
            //this.cacheAsBitmap = true;
            this._layerHashMap = new egret.HashMap();
            this._nameText = new egret.TextField();
            //this._nameText.border = true;
            //this._nameText.filters = [new GlowFilter(0x0,1,2,2,3,1)];
            this.show(this._nameText, this.layersCount);
            this.setName("Name");
            this.setNameTextFormat(this._defaultSize, this._defaultColor);
        }
        var __egretProto__ = SceneElementNamePad.prototype;
        Object.defineProperty(__egretProto__, "nameText", {
            /**名称文本对象*/
            get: function () {
                return this._nameText;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取指定层容器 ，没有时自动创建
         * @param index:int 0为最底层
         * @return
         *
         */
        __egretProto__.getLayerContainer = function (index) {
            if (index === void 0) { index = 0; }
            var container = this._layerHashMap.get(index);
            if (!container) {
                container = new egret.DisplayObjectContainer();
                //container.cacheAsBitmap = true;
                this.addChild(container);
                //				container.graphics.lineStyle(1,0xff0000,1);
                //				container.graphics.moveTo(-10,0);
                //				container.graphics.lineTo(10,0);
                this._layerHashMap.put(index, container);
                var keys = this._layerHashMap.keys();
                keys.sort(egret.ArrayUtil.numeric);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    this.setChildIndex(this._layerHashMap.get(keys[i]), i);
                }
                this.updateLayout();
            }
            return container;
        };
        /**设置名称 */
        __egretProto__.setName = function (name) {
            if (name == this._nameValue)
                return;
            this._nameValue = name;
            this._nameText.text = this._nameValue;
            this.updateLayout();
        };
        //
        /**
         * 设置名称文本格式
         * @param format:TextFormat = null 参数为 null 时重置为原格式
         *
         */
        __egretProto__.setNameTextFormat = function (size, color) {
            if (size === void 0) { size = 20; }
            if (color === void 0) { color = 0xffffff; }
            this._nameText.text = this._nameValue;
            this._nameText.size = size;
            this._nameText.textColor = color;
            this.updateLayout();
        };
        Object.defineProperty(__egretProto__, "layersCount", {
            //
            /**
             * 当前层数
             * @return
             *
             */
            get: function () {
                return this.numChildren;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 显示元素
         * @param target:DisplayObject 元素
         * @param layerIndex:int 层级，没有时自动创建，从 0 开始，名称在第 0 层，层越高，离头像距离越大
         * @param index:int = -1 元素在容器的位置索引 ，从 0 开始，传递给 addChildAt()，默认添加到最后
         * @param x:Number = NaN
         * @param y:Number = NaN
         *
         */
        __egretProto__.show = function (target, layerIndex, index, x, y) {
            if (index === void 0) { index = -1; }
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            var container = this.getLayerContainer(layerIndex);
            if (!isNaN(x))
                target.x = x;
            if (!isNaN(y))
                target.y = y;
            if (index == -1) {
                index = container.numChildren - 1;
                if (index < 0)
                    index = 0;
            }
            if (target.parent != container)
                container.addChildAt(target, index);
            this.updateLayout();
        };
        /**
         * 移除元素
         * @param target
         *
         */
        __egretProto__.hide = function (target) {
            if (target && target.parent) {
                target.parent.removeChild(target);
                this.updateLayout();
            }
        };
        /**更新布局 */
        __egretProto__.updateLayout = function () {
            var length = this.numChildren;
            var height = 0;
            var width = 0;
            var container = null;
            var child = null;
            var num = 0;
            for (var i = 0; i < length; i++) {
                width = 0;
                container = (this.getChildAt(i));
                if (i == 0) {
                    height -= container.height / 2;
                }
                else {
                    height -= container.height;
                    height -= this._gapY;
                }
                num = container.numChildren;
                for (var j = 0; j < num; j++) {
                    child = container.getChildAt(j);
                    child.x = width;
                    child.y = -child.height / 2;
                    width += child.width + this._gapX;
                }
                container.y = height;
                container.x = -container.width / 2;
            }
        };
        return SceneElementNamePad;
    })(egret.CoreContainer);
    egret.SceneElementNamePad = SceneElementNamePad;
    SceneElementNamePad.prototype.__class__ = "egret.SceneElementNamePad";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementNamePad.js.map