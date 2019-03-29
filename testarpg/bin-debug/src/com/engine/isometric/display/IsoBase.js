var egret;
(function (egret) {
    var IsoBase = (function (_super) {
        __extends(IsoBase, _super);
        /**
         * 构造函数
         * @param size:Number 尺寸(px)
         *
         */
        function IsoBase(size) {
            _super.call(this);
            /**
             * 行索引
             */
            this.column = 0;
            /**
             * 列索引
             */
            this.line = 0;
            /**
             * x轴速度
             */
            this.vx = 0;
            /**
             * y轴速度
             */
            this.vy = 0;
            /**
             * z轴速度
             */
            this.vz = 0;
            //尺寸px
            this._size = 0;
            //是否可行走
            this._walkable = false;
            //3D深度
            this._depth = 0;
            //3D空间占用的矩形
            this._rect = null;
            //2D坐标点
            this._point = null;
            //更新数据标记
            this._updateData = null;
            this._updateData = new Object();
            this._rect = new egret.Rectangle(0, 0, size, size);
            this._size = size;
            this._position = new egret.Point3D();
            this._point = new egret.Point();
            this.updateScreenPosition();
        }
        var __egretProto__ = IsoBase.prototype;
        /**
         * 自身的具体描述方式
         */
        __egretProto__.toString = function () {
            return "[IsoObject (x:" + this._position.x + ", y:" + this._position.y + ", z:" + this._position.z + ")]";
        };
        Object.defineProperty(__egretProto__, "x", {
            get: function () {
                return this._position.x;
            },
            /**
             * 设置/读取 3D空间中的 x坐标
             */
            set: function (value) {
                if (this._position.x == value)
                    return;
                this._position.x = value;
                this.updateScreenPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "y", {
            get: function () {
                return this._position.y;
            },
            /**
             *  设置/读取3D空间中的 y坐标
             */
            set: function (value) {
                if (this._position.y == value)
                    return;
                this._position.y = value;
                this.updateScreenPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "z", {
            get: function () {
                return this._position.z;
            },
            /**
             *  设置/读取3D空间中的 z 坐标
             */
            set: function (value) {
                if (this._position.z == value)
                    return;
                this._position.z = value;
                this.updateScreenPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "position", {
            get: function () {
                if (this.getUpdateData("position")) {
                    this._position = egret.IsoUtil.getPoint3D(this._point);
                    this.setUpdateData("position", false);
                }
                return this._position;
            },
            /**
             *  设置/读取3D空间中的坐标点
             */
            set: function (value) {
                if (this._position.x == value.x && this._position.y == value.y && this._position.z == value.z)
                    return;
                this._position = value;
                this.updateScreenPosition();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "depth", {
            /**
             * 节点位置在3D空间中的深度
             */
            get: function () {
                if (this.getUpdateData("depth")) {
                    this._depth = (this.position.x + this.position.z) * 0.866 - this.position.y * 0.707;
                    this.setUpdateData("depth", false);
                }
                return this._depth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "walkable", {
            get: function () {
                return this._walkable;
            },
            /**
             * 指定其它对象是否可以经过所占的位置
             */
            set: function (value) {
                this._walkable = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "size", {
            /**
             * 返回尺寸
             */
            get: function () {
                return this._size;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "rect", {
            /**
             * 返回3D空间占用着的矩形
             */
            get: function () {
                if (this.getUpdateData("rect")) {
                    this._rect.x = this.position.x - this._size / 2;
                    this._rect.y = this.position.z - this._size / 2;
                    this.setUpdateData("rect", false);
                }
                return this._rect;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "point", {
            get: function () {
                return this._point;
            },
            /**
             * 设置2D坐标点
             * @param value
             *
             */
            set: function (value) {
                if (this._point.x == value.x && this._point.y == value.y)
                    return;
                this._point = value;
                this._setX(this._point.x);
                this._setY(this._point.y);
                this.invalidate();
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        /**
         * 把当前时刻的一个 3D坐标点转换成屏幕上的 2D坐标点
         * 并将自己安置于该点
         */
        __egretProto__.updateScreenPosition = function () {
            this.point = egret.IsoUtil.getPoint2D(this._position);
            //position计算point时，position不用标记更新
            this.setUpdateData("position", false);
        };
        /**
         * 设置更新属性类型数据
         * @param property:String 需要更新的属性
         * @param updated:Boolean 标记是否需要更新
         *
         */
        __egretProto__.setUpdateData = function (property, updated) {
            if (updated === void 0) { updated = true; }
            this._updateData[property] = updated;
        };
        //
        /**
         * 获取更新数据，多个属性时用||运算，只要有一个属性为true则返回true
         * @param args 需要更新的属性列表
         * @return
         *
         */
        __egretProto__.getUpdateData = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var result = false;
            if (this._updateData) {
                var length = args.length;
                for (var i = 0; i < length; i++) {
                    var v = args[i];
                    result = result || this._updateData[v];
                    if (result)
                        break;
                }
            }
            return result;
        };
        //
        /**
         * 更新深度等数据
         *
         */
        __egretProto__.invalidate = function () {
            this.setUpdateData("depth");
            this.setUpdateData("rect");
            this.setUpdateData("position");
        };
        return IsoBase;
    })(egret.CoreSprite);
    egret.IsoBase = IsoBase;
    IsoBase.prototype.__class__ = "egret.IsoBase";
})(egret || (egret = {}));
