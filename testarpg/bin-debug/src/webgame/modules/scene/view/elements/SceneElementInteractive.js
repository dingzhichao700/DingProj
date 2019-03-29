var egret;
(function (egret) {
    var SceneElementInteractive = (function (_super) {
        __extends(SceneElementInteractive, _super);
        /**
         * 构造函数
         */
        function SceneElementInteractive() {
            _super.call(this);
            //鼠标经过的滤镜
            this._overFilters = [
                new egret.GlowFilter(0x00ffff, 1, 2, 2, 3, 1)
            ];
            //纸娃娃影片
            this._avatar = null;
            //
            this._sceneAvatarVo = null;
            //层级列表
            this._layerHashMap = null;
            this.touchEnabled = true;
            this._layerHashMap = new egret.HashMap();
            this._sceneAvatarVo = new egret.SceneAvatarVo();
            this._avatar = new egret.Avatar();
            this.show(this._avatar, egret.SceneElementLayerType.ACTION);
        }
        var __egretProto__ = SceneElementInteractive.prototype;
        //
        /**
         * 设置动作图片是否按方向拆分
         * @param value
         */
        __egretProto__.setAvatarDirectionSplit = function (value) {
            this._avatar.directionSplit = value;
        };
        //
        /**
         * 是否自动检测加载资源，单个方向的模型设置为 false
         * @param value
         */
        __egretProto__.setIsCheckResource = function (value) {
            this._avatar.isCheckResource = value;
        };
        /**
         * 快速设置元素数据，自动生成元素id，用于特效类等临时性元素
         * @param name 影片名称
         *
         */
        __egretProto__.setMovieName = function (name) {
            var item = this._data;
            if (!item)
                item = new egret.SceneElementDataItem();
            var lo = item.lo;
            if (!lo) {
                lo = new egret.SceneElementLo();
                lo.id = egret.dataManager().sceneElementData.getAutoElementId();
                lo.idString = lo.id + "";
            }
            lo.movieName = name;
            item.lo = lo;
            this.setData(item);
        };
        Object.defineProperty(__egretProto__, "avatar", {
            //
            /**
             * 纸娃娃影片
             * @return
             *
             */
            get: function () {
                return this._avatar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "sceneAvatarVo", {
            get: function () {
                return this._sceneAvatarVo;
            },
            /**
             * 纸娃娃数据
             * @param value
             */
            set: function (value) {
                this._sceneAvatarVo = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isPlayed", {
            /**
             * 是否正在播放动作影片
             * @return
             *
             */
            get: function () {
                return this._avatar.isPlayed;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "actionType", {
            //
            get: function () {
                return this._avatar.actionType;
            },
            /**
             * 动作类型
             * @param value:int
             * @see ActionMovieClipType
             */
            set: function (value) {
                if (this._avatar.actionType == value)
                    return;
                this._avatar.actionType = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "direction", {
            get: function () {
                return this._avatar.direction;
            },
            /**
             * 影片动作方向
             * @param value:int
             * @see ActionMovieClipDirectionType
             */
            set: function (value) {
                if (this._avatar.direction == value)
                    return;
                this._avatar.direction = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 按指定动作类型和方向播放影片
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
         * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
         * @param thisObj:any = null 播放完成后回调函数所属对象
         * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
         * @param startObj:any = null startFun回调函数所属对象
         */
        __egretProto__.play = function (frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (loopCount === void 0) { loopCount = 0; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (startFun === void 0) { startFun = null; }
            if (startObj === void 0) { startObj = null; }
            if (this._isDestroy)
                return;
            if (!this._sceneAvatarVo.body)
                return;
            if (callBack && !thisObj) {
                throw new Error("未指定回调函数对象");
            }
            this._partTypes = egret.ActionPartType.TYPES_BODY_ONLY;
            //先播放，以设置动作类型和方向
            this._avatar.play(frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj);
            this._avatar.setPartTypes(this._partTypes, this.getPartUrl, this, this.loadActionComplete, this);
            this._namePad.y = this._avatar.topLineY;
        };
        /**
         * 加载影片完成
         *
         */
        __egretProto__.loadActionComplete = function () {
            this._namePad.y = this._avatar.topLineY;
        };
        //
        /**
         * 停止影片在指定动作类型和方向
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         *
         */
        __egretProto__.stop = function (frameIndex, actionType, direction) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            this._avatar.stop(frameIndex, actionType, direction);
        };
        //
        /**
         * 设置动作vo
         * @param actionPartType:String 动作部件类型 ActionPartType
         * @param vo:ActionMovieClipVo 影片数据
         * @see ActionPartType
         */
        __egretProto__.setActionVo = function (actionPartType, vo) {
            this._avatar.setActionPart(actionPartType, vo);
        };
        //
        __egretProto__.getActionVo = function (actionPartType) {
            return this._avatar.getActionVo(actionPartType);
        };
        //
        /**
         * 设置动作资源地址
         * @param actionPartType:String 动作部件类型 ActionPartType
         * @param url:String 资源地址
         * @param callBack:Function = null 加载完成后回调 function():void{}
         *
         */
        __egretProto__.setActionUrl = function (actionPartType, url, callBack) {
            if (callBack === void 0) { callBack = null; }
            this._avatar.setActionUrl(actionPartType, url, callBack);
        };
        /**
         * 获取元素中的层级容器，容器层级会自动调整到层级所在位置
         * @param layerType:int 层级
         * @see SceneElementLayerType
         * @return
         *
         */
        __egretProto__.getLayerContainer = function (layerType) {
            if (layerType === void 0) { layerType = 0; }
            var container = null;
            container = this._layerHashMap.get(layerType);
            if (!container) {
                var layerConfig = egret.SceneElementLayerType.LAYER_MOUSE_CONFIGS[layerType];
                container = new egret.DisplayObjectContainer();
                container.name = "sceneElementInteractiveLayer" + layerType;
                container.touchEnabled = layerConfig.touchEnabled;
                container.touchChildren = layerConfig.touchChildren;
                this.addChild(container);
                this._layerHashMap.put(layerType, container);
                var keys = this._layerHashMap.keys();
                keys.sort(egret.ArrayUtil.numeric);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    this.setChildIndex(this._layerHashMap.get(keys[i]), i);
                }
            }
            return container;
        };
        //
        /**
         * 设置显示对象在元素上的层级并添加到显示列表中，
         * @param target:DisplayObject 显示对象
         * @param layerType:int 层级 @see SceneElementLayerType
         * @param x:Number = NaN 不为NaN时设置
         * @param y:Number = NaN 不为NaN时设置
         * @see #hide()
         */
        __egretProto__.show = function (target, layerType, x, y) {
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            var container = this.getLayerContainer(layerType);
            if (container && target.parent != container)
                container.addChild(target);
            if (!isNaN(x))
                target.x = x;
            if (!isNaN(y))
                target.y = y;
        };
        //
        /**
         * 从元素上移除显示对象
         * @param target:DisplayObject 已呈现在地图上的显示对象
         * @see #show()
         */
        __egretProto__.hide = function (target) {
            if (!target)
                return;
            if (target.parent)
                target.parent.removeChild(target);
        };
        //
        /**
         * 更新动作影片显示
         * @param vo:SceneElementVo
         * @param lo:SceneElementLo
         *
         */
        __egretProto__.updateAvatar = function (value) {
            this.setData(value);
            this._avatar.clear(false);
            if (this.stage && this._partTypes) {
                this._avatar.setPartTypes(this._partTypes, this.getPartUrl, this, this.loadActionComplete, this);
            }
        };
        //
        /**
         * 设置场景元素数据
         * @param value:SceneElementDataItem
         *
         */
        __egretProto__.setData = function (value) {
            _super.prototype.setData.call(this, value);
            egret.SceneElementData.getInstance().setSceneAvatarVo(this._sceneAvatarVo, value.lo);
        };
        /**
         * 添加至场景时处理
         *
         */
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
        };
        __egretProto__.removeFromScene = function () {
            _super.prototype.removeFromScene.call(this);
            //this.removeEventListener(TouchEvent.TOUCH_ROLL_OVER,this.roleOverHandler,this);
            //this.removeEventListener(TouchEvent.TOUCH_ROLL_OUT,this.roleOutHandler,this);
            //this.roleOutHandler();
            this.stop();
            this._avatar.clear();
        };
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            this._avatar.destroy();
            _super.prototype.destroy.call(this);
        };
        __egretProto__.addListeners = function () {
            _super.prototype.addListeners.call(this);
            //this.addEventListener(TouchEvent.TOUCH_ROLL_OVER,this.roleOverHandler,this);
            //this.addEventListener(TouchEvent.TOUCH_ROLL_OUT,this.roleOutHandler,this);
        };
        /**
         * 鼠标经过
         * @param event
         *
         */
        __egretProto__.roleOverHandler = function (event) {
            //EnterFrameManager.getInstance().addExecute(this.checkAlpha,8);
        };
        /**
         * 检测alpha
         *
         */
        __egretProto__.checkAlpha = function () {
            //var isTransparent:boolean = BitmapDataUtil.isTransparent(this,this.mouseX,this.mouseY);
            //if(isTransparent){
            //	this.filters = null;
            //}else{
            //	if(this.filters != this._overFilters)
            //		this.filters = this._overFilters;
            //}
        };
        /**
         * 鼠标移出
         * @param event
         *
         */
        __egretProto__.roleOutHandler = function (event) {
            //EnterFrameManager.getInstance().removeExecute(this.checkAlpha);
            if (event === void 0) { event = null; }
            this.filters = null;
        };
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         *
         */
        __egretProto__.getPartUrl = function (partType) {
            var path = egret.PathData.PATH_MOVIES_COMMON;
            var movie = this._sceneAvatarVo[partType];
            //若动作影片改变时，只需要改变
            //_data.lo.movieName的值即可
            var url = egret.dataManager().sceneElementData.getActionUrl(path, movie, this._avatar.actionType);
            return url;
        };
        return SceneElementInteractive;
    })(egret.SceneElement);
    egret.SceneElementInteractive = SceneElementInteractive;
    SceneElementInteractive.prototype.__class__ = "egret.SceneElementInteractive";
})(egret || (egret = {}));
