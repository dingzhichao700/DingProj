var egret;
(function (egret) {
    var Window = (function (_super) {
        __extends(Window, _super);
        /**
         * 构造函数
         */
        function Window(layerType, align) {
            if (layerType === void 0) { layerType = 0; }
            if (align === void 0) { align = -1; }
            _super.call(this);
            /**
             * 因有两个管理器，因此在打开时设置
             */
            this.applicationManager = null;
            //窗口层级
            this._layerType = 0;
            //窗口对齐方式，默认无对齐方式
            this._align = egret.AlignType.NONE;
            //更新类型注册
            this._updateHashMap = null;
            //上下左右
            this._top = 0;
            this._bottom = 0;
            this._left = 0;
            this._right = 0;
            this._layerType = layerType;
            this._align = align;
            this._updateHashMap = new egret.HashMap();
        }
        var __egretProto__ = Window.prototype;
        Object.defineProperty(__egretProto__, "right", {
            //
            get: function () {
                return this._right;
            },
            /**
             * 与舞台右边框的距离 ，align属性有右对齐时有效
             * @param value:Number 默认值:0px
             * @see AlignType
             *
             */
            set: function (value) {
                if (this._right == value)
                    return;
                this._right = value;
                this.align = this._align;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "left", {
            get: function () {
                return this._left;
            },
            /**
             * 与舞台左边框的距离 ，align属性有左对齐时有效
             * @param value:Number 默认值:0px
             * @see AlignType
             *
             */
            set: function (value) {
                if (this._left == value)
                    return;
                this._left = value;
                this.align = this._align;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "bottom", {
            get: function () {
                return this._bottom;
            },
            /**
             * 与舞台下边框的距离 ，align属性有底对齐时有效
             * @param value:Number 默认值:0px
             * @see AlignType
             *
             */
            set: function (value) {
                if (this._bottom == value)
                    return;
                this._bottom = value;
                this.align = this._align;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "top", {
            get: function () {
                return this._top;
            },
            /**
             * 与舞台上边框的距离 ，align属性有顶对齐时有效
             * @param value:Number 默认值:0px
             * @see AlignType
             *
             */
            set: function (value) {
                if (this._top == value)
                    return;
                this._top = value;
                this.align = this._align;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "align", {
            get: function () {
                return this._align;
            },
            /**
             * 窗口对齐方式，宽高若有改变时，在宽高改变之后设置
             * @param value:int @see AlignType
             *
             */
            set: function (value) {
                this._align = value;
                if (this.applicationManager)
                    this.applicationManager.setAlign(this, this._align);
                else
                    egret.ApplicationManager.getInstance().setAlign(this, this._align);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "layerType", {
            get: function () {
                return this._layerType;
            },
            /**
             * 窗口层级
             * @param value:int @see ApplicationLayerType
             *
             */
            set: function (value) {
                if (this._layerType == value)
                    return;
                this._layerType = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * ApplicationManager.open()方法打开时自动调用的初始化 方法
         *
         */
        __egretProto__.initWindow = function () {
        };
        //
        /**
         * 添加窗口事件，此方法只在recall()中自动调用，其它地方无调用，需要时手动调用
         *
         */
        __egretProto__.addEvents = function () {
        };
        //
        /**
         * 全局更新时调用，此方法重写时，不用调用super.globalUpdate()
         * @param updateType:int 更新类型
         * @param args
         * @see #ApplicationManager.globalUpdate()
         *
         */
        __egretProto__.globalUpdate = function (updateType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        //
        /**
         * 自身更新时调用，此方法重写时，不用调用super.update()
         * @param args
         * @see #ApplicationManager.update()
         */
        __egretProto__.update = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        //
        /**
         * 窗口已实例化，重新打开时，通常用于添加事件，重置显示等
         *
         */
        __egretProto__.recall = function () {
            //不在舞台上时不添加事件，因如果加载界面未完成时，被关闭了，
            //当加载完成时又会调用此方法，导致事件被添加，有可能导致内存泄漏
            if (this.stage)
                this.addEvents();
            if (this.applicationManager)
                this.applicationManager.dispatchRecall(this);
            else
                egret.ApplicationManager.getInstance().dispatchRecall(this);
        };
        //
        /**
         * 窗口移除时，主要用于清除事件等
         *
         */
        __egretProto__.remove = function () {
        };
        //
        /**
         * 添加全局更新类型，当有此类型的更新时，将调用已添加更新类型的窗口的globalUpdate()方法
         * @param args 全局更新类型数组
         *
         */
        __egretProto__.addUpdateType = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var updateType = args[i];
                if (!this._updateHashMap.containsKey(updateType))
                    this._updateHashMap.put(updateType, true);
            }
        };
        //
        /**
         * 移除全局更新类型
         * @param args 全局更新类型数组
         *
         */
        __egretProto__.removeUpdateType = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var updateType = args[i];
                this._updateHashMap.remove(updateType);
            }
        };
        //
        /**
         * 检测是否已注册指定的全局更新类型
         * @param updateType:int
         * @return
         *
         */
        __egretProto__.hasUpdateType = function (updateType) {
            if (updateType === void 0) { updateType = 0; }
            return this._updateHashMap.get(updateType);
        };
        //
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        return Window;
    })(egret.CoreContainer);
    egret.Window = Window;
    Window.prototype.__class__ = "egret.Window";
})(egret || (egret = {}));
