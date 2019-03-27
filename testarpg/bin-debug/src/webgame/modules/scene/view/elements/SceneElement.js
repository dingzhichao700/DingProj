var egret;
(function (egret) {
    var SceneElement = (function (_super) {
        __extends(SceneElement, _super);
        /**
         * 构造函数
         */
        function SceneElement() {
            _super.call(this);
            //场景元素数据
            this._data = null;
            //id，通常为vo或lo中的id
            this._id = null;
            //当前xy
            this._x = 0;
            this._y = 0;
            //透明度
            this._alpha = 0;
            //上次深度x,y
            this._lastX = 0;
            this._lastY = 0;
            //深度
            this._depth = 0;
            //名称面板
            this._namePad = null;
            //深度坐标点
            this._depthPoint = null;
            this._depthPoint3D = null;
            //是否启用
            this._enabled = true;
            this.touchEnabled = false;
            this.touchChildren = false;
            this._namePad = new egret.SceneElementNamePad();
            this.addChild(this._namePad);
            //this._data = new SceneElementDataItem();
            this._depthPoint = new egret.Point();
            this._depthPoint3D = new egret.Point3D();
            this.addListeners();
        }
        var __egretProto__ = SceneElement.prototype;
        Object.defineProperty(__egretProto__, "enabled", {
            get: function () {
                return this._enabled;
            },
            /**
             * 是否启用此对象的鼠标响应
             * @param value
             *
             */
            set: function (value) {
                if (this._enabled == value)
                    return;
                this._enabled = value;
                this.touchEnabled = this._enabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "alpha", {
            get: function () {
                return this._alpha;
            },
            set: function (value) {
                if (this._alpha == value)
                    return;
                this._alpha = value;
                _super.prototype._setAlpha.call(this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                if (this._y == value)
                    return;
                this._y = value;
                _super.prototype._setY.call(this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                if (this._x == value)
                    return;
                this._x = value;
                _super.prototype._setX.call(this, value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "namePad", {
            /**
             * 名称面板
             * @return
             *
             */
            get: function () {
                return this._namePad;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "depth", {
            /**
             * 获取元素深度
             * @return
             *
             */
            get: function () {
                return this.getDepth();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取元素深度
         * @return
         *
         */
        __egretProto__.getDepth = function () {
            if (this._lastX != this._x || this._lastY != this._y) {
                this._lastX = this._x;
                this._lastY = this._y;
                this._depthPoint.x = this._x;
                this._depthPoint.y = this._y;
                this._depth = egret.IsoUtil.getDepth(egret.IsoUtil.getPoint3D(this._depthPoint, this._depthPoint3D));
            }
            return this._depth;
        };
        Object.defineProperty(__egretProto__, "id", {
            get: function () {
                return this._id || this.name;
            },
            /**
             * 场景元素显示对象id
             * @param value:String
             *
             */
            set: function (value) {
                this._id = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "data", {
            get: function () {
                return this._data;
            },
            /**
             * 场景元素数据
             * @param value
             *
             */
            set: function (value) {
                this.setData(value);
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 设置场景元素数据
         * @param value:SceneElementDataItem
         *
         */
        __egretProto__.setData = function (value) {
            this._data = value;
            if (this._data) {
                //对于简单类型 + ""比 .toString()更快，复杂类型反之
                if (this._data.vo && this._data.vo.id)
                    this._id = this._data.vo.idString;
                else if (this._data.lo && this._data.lo.id)
                    this._id = this._data.lo.idString;
                else
                    throw new Error("无效的场景元素数据，id 不能为 0");
            }
        };
        //
        /**
         * 更新名称面板
         *
         */
        __egretProto__.updateName = function () {
            var name = null;
            if (this._data) {
                if (this._data.vo)
                    name = this._data.vo.name; // + "-" + _data.vo.id;
                if (!name && this._data.lo)
                    name = this._data.lo.name;
            }
            if (name) {
                this._namePad.setName(name);
            }
        };
        //
        /**
         * 场景元素刷新
         *
         */
        __egretProto__.updateXY = function () {
            var vo = this._data.vo;
            if (vo) {
                this.x = vo.x;
                this.y = vo.y;
            }
            //			var lo:SceneElementLo = _data.lo;
            //			if(lo){
            //				this.x = lo.point.x;
            //				this.y = lo.point.y;
            //			}
        };
        /**
         * 添加至场景时处理
         *
         */
        __egretProto__.addToScene = function () {
            this.updateName();
            this.updateXY();
            this.addListeners();
        };
        /**
         * 从场景移除时处理
         *
         */
        __egretProto__.removeFromScene = function () {
        };
        //
        /**
         * 添加内部事件
         *
         */
        __egretProto__.addListeners = function () {
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
            this._namePad.setNameTextFormat(size, color);
        };
        //
        /**
         * 销毁对象，将删除所有事件侦听(包括非组件内部调用addEventListener注册的事件侦听)及变量引用并从显示列表删除，无法重新使用，释放内存资源
         */
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this._namePad.destroy();
            _super.prototype.destroy.call(this);
        };
        return SceneElement;
    })(egret.CoreContainer);
    egret.SceneElement = SceneElement;
    SceneElement.prototype.__class__ = "egret.SceneElement";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElement.js.map