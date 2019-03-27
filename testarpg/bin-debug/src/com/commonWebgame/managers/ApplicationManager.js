var egret;
(function (egret) {
    var ApplicationManager = (function (_super) {
        __extends(ApplicationManager, _super);
        /**
         * 构造函数
         */
        function ApplicationManager() {
            _super.call(this);
            /**
             * 主应用程序，程序启动后设置
             */
            this.application = null;
            /**
             * 应用程序舞台
             */
            this.stage = null;
            //层级列表
            this._layerHashMap = null;
            //显示对象列表
            this._winHashMap = null;
            //显示对象存在时长列表
            this._timeHashMap = null;
            //显示对象对齐列表
            this._alignHashMap = null;
            this._layerHashMap = new egret.HashMap();
            this._winHashMap = new egret.HashMap();
            this._timeHashMap = new egret.HashMap();
            this._alignHashMap = new egret.HashMap();
        }
        var __egretProto__ = ApplicationManager.prototype;
        /**
         * 单例
         * @return
         *
         */
        ApplicationManager.getInstance = function () {
            return ApplicationManager._instance || (ApplicationManager._instance = new ApplicationManager());
        };
        Object.defineProperty(__egretProto__, "isFullScreen", {
            //
            /**
             * 当前是否处于全屏窗口状态
             * @return
             *
             */
            get: function () {
                var array = [egret.ApplicationLayerType.FULL_SCREEN, egret.ApplicationLayerType.FULL_SCREEN_TOP];
                var length = array.length;
                for (var i = 0; i < length; i++) {
                    var v = array[i];
                    var container = this._layerHashMap.get(v);
                    if (container && container.numChildren > 0)
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 初始化主程序和舞台，若多次调用，上次调用时已存在的相关数据将清空，如已保存的而未销毁的窗口
         * @param application:Application 应用程序
         *
         */
        __egretProto__.init = function (application) {
            if (this.application)
                this.application.destroy();
            //application.focusRect = false;
            this.application = application;
            if (!this.stage) {
                this.stage = application.stage;
                //this.stage.scaleMode = StageScaleMode.NO_SCALE;
                //this.stage.align = StageAlign.TOP_LEFT;
                //PopupManager.getInstance().init(this.stage);
                this.stage.addEventListener(egret.Event.RESIZE, this.stageResize, this);
            }
            //以下为重置数据
            //点击某个对象时，对象成为舞台焦点，当焦点一直不变时此属性将一直引用之前的对象，有可能导致内存泄漏
            this.stage.focus = null;
            //销毁之前的窗口及相关资源
            var length = this._winHashMap.size();
            for (var i in this._winHashMap.content) {
                var wins = this._winHashMap.content[i];
                var length1 = wins.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var win = wins[i1];
                    if ("remove" in win)
                        win["remove"]();
                    if ("destroy" in win)
                        win["destroy"]();
                }
            }
            this._layerHashMap.clear();
            this._winHashMap.clear();
            this._timeHashMap.clear();
            this._alignHashMap.clear();
            this.removeTimer();
        };
        //
        /**
         * 获取应用程序中的层级容器，容器层级会自动调整到层级所在位置
         * @param layerType:int 层级
         * @see ApplicationLayerType
         * @return
         *
         */
        __egretProto__.getApplicationLayer = function (layerType) {
            if (layerType === void 0) { layerType = 0; }
            var container = this._layerHashMap.get(layerType);
            if (!container) {
                var layerConfig = egret.ApplicationLayerType.LAYER_MOUSE_CONFIGS[layerType];
                container = new egret.Sprite();
                container.name = "applicationLayer" + layerType;
                container.touchChildren = layerConfig.touchChildren;
                container.touchEnabled = layerConfig.touchEnabled;
                this.application.addChild(container);
                this._layerHashMap.put(layerType, container);
                var keys = this._layerHashMap.keys();
                keys.sort(egret.ArrayUtil.numeric);
                var length = keys.length;
                for (var i = 0; i < length; i++) {
                    this.application.setChildIndex(this._layerHashMap.get(keys[i]), i);
                }
            }
            return container;
        };
        //
        /**
         * 打开显示对象类，并显示在舞台上，并返回显示对象实例 ，如果是IWindow对象将自动调用initWindow()或recall()方法
         * @param targetClass:Class 显示对象类名称
         * @param layerType:int = -1 显示对象打开时所处的层级，若targetClass对象存在layerType属性，使用默认值时将自动使用些属性 @see ApplicationLayerType
         * @param align:int = -1  设置 显示对象在舞台上的对齐类型 ，默认值时不设置对齐，若targetClass对象存在align属性，使用默认值时将自动使用些属性，@see AlignType
         * @param name:String = null 显示对象名称，若isNew == true时，将设置显示对象的名称为此值，否则将搜索名称为此值的显示对象实例
         * @param isNew:Boolean = false 是否创建新的实例，为true时，将强制创建一个新的实例，否则会先搜索已存在的实例
         * @return
         * @see #close()
         */
        __egretProto__.open = function (targetClass, layerType, align, name, isNew) {
            if (layerType === void 0) { layerType = -1; }
            if (align === void 0) { align = -1; }
            if (name === void 0) { name = null; }
            if (isNew === void 0) { isNew = false; }
            if (!targetClass) {
                egret.LogManager.error(this, "targetClass不能为空.");
                return null;
            }
            var className = egret.getQualifiedClassName(targetClass);
            var win = null;
            var array = null;
            var recall = null;
            var initWindow = null;
            array = this._winHashMap.get(className);
            //创建新实例并保存
            if (isNew) {
                win = new targetClass();
                win.name = name ? name : win.name;
                if ("initWindow" in win)
                    initWindow = win["initWindow"];
                if (!array) {
                    array = [];
                    this._winHashMap.put(className, array);
                }
                array.push(win);
            }
            else {
                //搜索已存在的实例
                if (name && array) {
                    var length = array.length;
                    for (var i = 0; i < length; i++) {
                        if (array[i].name == name) {
                            win = array[i];
                            break;
                        }
                    }
                }
                else if (array && array.length > 0) {
                    win = array[0];
                }
                if (!win)
                    return this.open(targetClass, layerType, align, name, true);
                else if ("recall" in win)
                    recall = win["recall"];
            }
            //设置层级
            if (layerType == -1) {
                if ("layerType" in win)
                    layerType = win["layerType"];
                else
                    layerType = 0;
            }
            //设置对齐方式
            if (align == -1) {
                if ("align" in win)
                    align = win["align"];
                else
                    align = 0;
            }
            if ("applicationManager" in win)
                win["applicationManager"] = this;
            //显示显示对象
            this.show(win, layerType, align);
            if (initWindow != null)
                win['initWindow']();
            if (recall != null)
                win["recall"]();
            if (this.hasEventListener(egret.ApplicationEvent.WINDOW_OPEN))
                this.dispatchEvent(new egret.ApplicationEvent(egret.ApplicationEvent.WINDOW_OPEN, false, false, win));
            return win;
        };
        //
        /**
         * 将显示对象从舞台上移除，若存在remove()将自动调用此方法
         * @param target:* 值为实例时，只对当前实例做处理，值为类时将对此类的所有实例进行处理
         * @see #open()
         */
        __egretProto__.close = function (target) {
            if (!target)
                return;
            if (isClass(target)) {
                var className = egret.getQualifiedClassName(target);
                if (className) {
                    var array = this._winHashMap.get(className);
                    if (array) {
                        var length = array.length;
                        for (var i = 0; i < length; i++) {
                            var win = array[i];
                            this.hide(win);
                            if (this.hasEventListener(egret.ApplicationEvent.WINDOW_CLOSE))
                                this.dispatchEvent(new egret.ApplicationEvent(egret.ApplicationEvent.WINDOW_CLOSE, false, false, win));
                        }
                    }
                }
            }
            else {
                this.hide(target);
                if (this.hasEventListener(egret.ApplicationEvent.WINDOW_CLOSE))
                    this.dispatchEvent(new egret.ApplicationEvent(egret.ApplicationEvent.WINDOW_CLOSE, false, false, target));
            }
        };
        //
        /**
         * 获取显示对象类的实例，不存在时返回null
         * @param targetClass:Class 显示对象类
         * @param addedToStage:Boolean = false 是否已添加到舞台
         * @param name:String = null 实例名称，使用默认值时不检测名称
         * @return
         *
         */
        __egretProto__.getTargetInstance = function (targetClass, addedToStage, name) {
            if (addedToStage === void 0) { addedToStage = false; }
            if (name === void 0) { name = null; }
            var className = egret.getQualifiedClassName(targetClass);
            var array = this._winHashMap.get(className);
            var result = null;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var win = array[i];
                if (addedToStage && name) {
                    if (win.stage && win.name == name) {
                        result = win;
                        break;
                    }
                }
                else if (addedToStage && !name) {
                    if (win.stage) {
                        result = win;
                        break;
                    }
                }
                else if (!addedToStage && name) {
                    if (!win.stage && win.name == name) {
                        result = win;
                        break;
                    }
                }
                else if (!addedToStage && !name) {
                    if (!win.stage) {
                        result = win;
                        break;
                    }
                }
            }
            return result;
        };
        //
        /**
         * 打开的窗口中是否存在类实例，仅能获知通过open()打开的窗口对象
         * @param args 类列表
         * @return
         *
         */
        __egretProto__.hasInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var targetClass = args[i];
                var className = egret.getQualifiedClassName(targetClass);
                var array = this._winHashMap.get(className);
                if (array && array.length > 0)
                    return true;
            }
            return false;
        };
        //
        /**
         * 全局更新，调用已注册相关全局更新类型的IWindow的globalUpdate()方法，对象不在舞台时忽略
         * @param updateTypes:Array 全局更新类型
         * @param args globalUpdate()方法的参数列表
         * @see IWindow.globalUpdate
         * @see IWindow.addUpdateType
         */
        __egretProto__.globalUpdate = function (updateTypes) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var params = null;
            //此方法不能直接遍历 _winHashMap.content ，因有可能在全局更新方法中打开新窗口，导致其遍历顺序改变
            var mapArray = this._winHashMap.values();
            var length = mapArray.length;
            for (var i = 0; i < length; i++) {
                var wins = mapArray[i];
                var length1 = wins.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var win = wins[i1];
                    if (!win["stage"])
                        continue;
                    var length2 = updateTypes.length;
                    for (var i2 = 0; i2 < length2; i2++) {
                        var type = updateTypes[i2];
                        if (win["hasUpdateType"](type)) {
                            params = [];
                            params.push(type);
                            params = params.concat(args);
                            win["globalUpdate"].apply(win, params);
                        }
                    }
                }
            }
        };
        //
        /**
         * 局部更新，调用目标对象的update()方法 ,对象不在舞台时忽略
         * @param targets:Array 类对象数组或实例对象数组
         * @param args 传递给update()方法的参数列表
         *
         */
        __egretProto__.update = function (targets) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var className = null;
            var wins = null;
            var params = null;
            var length = targets.length;
            for (var i = 0; i < length; i++) {
                var cls = targets[i];
                className = egret.getQualifiedClassName(cls);
                wins = this._winHashMap.get(className);
                var length1 = wins.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var win = wins[i1];
                    if (!win["stage"])
                        continue;
                    params = args.concat();
                    win.update.apply(win, params);
                }
            }
        };
        //
        /**
         * 设置显示对象对齐方式 ，取消对齐方式或取删除相关对齐方式引用align使用AlignType.NON，
         * 用此方法设置对齐的并且不是IWindow对象或子类对象，对象不使用时要主动删除相关引用，否则会导致内存泄漏
         * @param target:DisplayObject 显示对象
         * @param align:int 对齐方式
         * @param top:int 与舞台上边框的距离 ，align属性有顶对齐时有效
         * @param bottom:int 与舞台下边框的距离 ，align属性有底对齐时有效
         * @param left:int 与舞台左边框的距离 ，align属性有左对齐时有效
         * @param right:int 与舞台右边框的距离 ，align属性有右对齐时有效
         * @see AlignType
         */
        __egretProto__.setAlign = function (target, align, top, bottom, left, right) {
            if (top === void 0) { top = 0; }
            if (bottom === void 0) { bottom = 0; }
            if (left === void 0) { left = 0; }
            if (right === void 0) { right = 0; }
            if (!target) {
                egret.LogManager.error(this, "显示对象不能为:" + target);
                return;
            }
            //无对齐
            if (align == egret.AlignType.NONE) {
                data = this._alignHashMap.remove(target.hashCode);
                return;
            }
            //已是当前对齐方式，注释掉(因有可能宽高已改变)
            //			if(_alignHashMap.containsKey(target.hashCode) && _alignHashMap.getValue(target.hashCode) == align){
            //				return;
            //			}
            var data = this._alignHashMap.get(target.hashCode);
            if (!data)
                data = new egret.AlignItem();
            data.align = align;
            data.top = top == 0 && "top" in target ? target["top"] : top;
            data.bottom = bottom == 0 && "bottom" in target ? target["bottom"] : bottom;
            data.left = left == 0 && "left" in target ? target["left"] : left;
            data.right = right == 0 && "right" in target ? target["right"] : right;
            this._alignHashMap.put(target.hashCode, data);
            this.layout(target);
        };
        //
        /**
         * 布局显示对象
         * @param target:DisplayObject 显示对象
         *
         */
        __egretProto__.layout = function (target) {
            if (!target || !target.stage)
                return;
            var data = this._alignHashMap.get(target.hashCode);
            var x = 0;
            var y = 0;
            var width = this.stage.stageWidth;
            var height = this.stage.stageHeight;
            var top = data.top;
            var bottom = data.bottom;
            var left = data.left;
            var right = data.right;
            var align = data.align;
            switch (align) {
                case egret.AlignType.TOP_LEFT:
                    x += left;
                    y += top;
                    break;
                case egret.AlignType.TOP_CENTER:
                    x = (width - target.width) / 2;
                    y += top;
                    break;
                case egret.AlignType.TOP_RIGHT:
                    x = width - target.width;
                    x -= right;
                    y += top;
                    break;
                case egret.AlignType.CENTER_LEFT:
                    y = (height - target.height) / 2;
                    x += left;
                    break;
                case egret.AlignType.CENTER:
                    x = (width - target.width) / 2;
                    y = (height - target.height) / 2;
                    break;
                case egret.AlignType.CENTER_RIGHT:
                    x = width - target.width;
                    y = (height - target.height) / 2;
                    x -= right;
                    break;
                case egret.AlignType.BOTTOM_LEFT:
                    y = height - target.height;
                    x += left;
                    y -= bottom;
                    break;
                case egret.AlignType.BOTTOM_CENTER:
                    x = (width - target.width) / 2;
                    y = height - target.height;
                    y -= bottom;
                    break;
                case egret.AlignType.BOTTOM_RIGHT:
                    x = width - target.width;
                    y = height - target.height;
                    x -= right;
                    y -= bottom;
                    break;
            }
            target.x = x;
            target.y = y;
        };
        //
        /**
         * 设置显示对象在舞台上的层级并添加到显示列表中，
         * 用此方法显示而非用open()打开的并且不是IWindow对象或子类对象，要用hide()方法删除相关引用，否则会导致内存泄漏
         * @param target:DisplayObject 显示对象
         * @param layerType:int 层级 @see ApplicationLayerType
         * @param align:int 对齐方式
         * @param top:int 与舞台上边框的距离 ，align属性有顶对齐时有效
         * @param bottom:int 与舞台下边框的距离 ，align属性有底对齐时有效
         * @param left:int 与舞台左边框的距离 ，align属性有左对齐时有效
         * @param right:int 与舞台右边框的距离 ，align属性有右对齐时有效
         * @see AlignType
         * @see #hide()
         */
        __egretProto__.show = function (target, layerType, align, top, bottom, left, right) {
            if (align === void 0) { align = -1; }
            if (top === void 0) { top = 0; }
            if (bottom === void 0) { bottom = 0; }
            if (left === void 0) { left = 0; }
            if (right === void 0) { right = 0; }
            var container = (this.getApplicationLayer(layerType));
            if (target.parent != container) {
                var lastParent = (target.parent);
                container.addChild(target);
                this.checkModel(lastParent);
            }
            this.setAlign(target, align, top, bottom, left, right);
            this.setModel(container, layerType);
        };
        //
        /**
         * 从舞台上移除显示对象
         * @param target:DisplayObject 已呈现在舞台上的显示对象
         * @see #show()
         */
        __egretProto__.hide = function (target) {
            if (!target)
                return;
            var container = (target.parent);
            //			try{
            //因容器destroy()有调用remove(),有可能发生，Error #2094: 事件调度递归溢出
            if (target.parent)
                target.parent.removeChild(target);
            //			}catch(e:Error){}
            this.checkModel(container);
            if ("remove" in target)
                target["remove"]();
            var className = egret.getQualifiedClassName(target);
            if (this._winHashMap.containsKey(className)) {
                if (className) {
                    //重置显示对象最后打开的存在时间
                    this._timeHashMap.put(className, 0);
                    if (!egret.TimerManager.getInstance().hasExecute(this._timerId)) {
                        this._timerId = egret.TimerManager.getInstance().addExecute(this.timerHandler, this, egret.DateUtil.VALUE_MINUTE, null);
                    }
                }
            }
            else {
                this._alignHashMap.remove(target.hashCode);
            }
        };
        //
        /**
         * 将窗口切换至指定层
         * @param target:Class 窗口类或实例
         * @param layerType:int 层级 ApplicationLayerType
         * @param addedToStage:Boolean = true 是否已添加至舞台
         */
        __egretProto__.setWindowLayer = function (target, layerType, addedToStage) {
            if (addedToStage === void 0) { addedToStage = true; }
            //instanceof 子类也会返回true
            if (target instanceof egret.Window)
                var win = target;
            else if (isClass(target))
                win = (this.getTargetInstance(target, addedToStage));
            if (win)
                this.show(win, layerType, win.align);
        };
        Object.defineProperty(__egretProto__, "centerPoint", {
            //
            /**
             * 获取舞台中心点
             * @return
             *
             */
            get: function () {
                return new egret.Point(this.stage.stageWidth / 2, this.stage.stageHeight / 2);
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 计时器处理
         * @param e
         *
         */
        __egretProto__.timerHandler = function () {
            this._timeHashMap.eachKey(this.checkDestroy, this);
            var hasCloseTarget = false;
            var array = this._winHashMap.values();
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var wins = array[i];
                var length1 = wins.length;
                for (var i1 = 0; i1 < length1; i1++) {
                    var win = wins[i1];
                    if (!win.stage) {
                        hasCloseTarget = true;
                        break;
                    }
                }
            }
            if (!hasCloseTarget) {
                this.removeTimer();
                for (var p in this._timeHashMap.content) {
                    this._timeHashMap.content[p] = 0;
                }
            }
        };
        //
        /**
         * 显示对象存在时间处理
         * @param key
         *
         */
        __egretProto__.checkDestroy = function (key) {
            var time = this._timeHashMap.get(key);
            time += egret.DateUtil.VALUE_MINUTE;
            var isDestroy = false;
            //长时间未使用的显示对象将被销毁
            if (time >= egret.DateUtil.VALUE_MINUTE) {
                var array = this._winHashMap.get(key);
                var win = null;
                for (var i = 0; i < array.length; i++) {
                    win = array[i];
                    if (!win.stage) {
                        //移除并销毁
                        if ("destroy" in win) {
                            win["destroy"]();
                        }
                        else {
                            if (win.parent)
                                win.parent.removeChild(win);
                        }
                        this._alignHashMap.remove(win.hashCode);
                        array.splice(i, 1);
                        i--;
                    }
                }
                if (array.length == 0) {
                    //显示对象全部销毁时，停止计时器
                    var winCount = 0;
                    array = this._winHashMap.values();
                    var length1 = array.length;
                    for (var i1 = 0; i1 < length1; i1++) {
                        var wins = array[i1];
                        winCount += wins.length;
                        if (winCount > 0)
                            break;
                    }
                    if (winCount == 0) {
                        this.removeTimer();
                    }
                    this._winHashMap.remove(key);
                    this._timeHashMap.remove(key);
                    isDestroy = true;
                }
                time = 0;
            }
            if (!isDestroy)
                this._timeHashMap.put(key, time);
        };
        //
        /**
         * 舞台尺寸更改时处理
         * @param e
         *
         */
        __egretProto__.stageResize = function (e) {
            for (var key in this._layerHashMap.content) {
                this.setModel(this._layerHashMap.get(key), key);
            }
            for (key in this._alignHashMap.content) {
                this.layout(key);
            }
        };
        /**
         * 节流事件处理
         * @param event
         *
         */
        //private throttleHandler(event:ThrottleEvent):void{
        //	if(event.state == ThrottleType.THROTTLE || event.state == ThrottleType.PAUSE){
        //		SystemManager.keepFPS(true);
        //	}else if(event.state == ThrottleType.RESUME){
        //		SystemManager.keepFPS(false);
        //	}
        //}
        //
        ///**
        // * GC处理
        // *
        // */
        //private gcHandler():void{
        //var value:number = 1 / 1024 / 1024;
        //
        //LogManager.debug(this,"Before gc total memory:" + (System.totalMemory * value).toFixed(2) + "M");
        //SystemManager.gc();
        //LogManager.debug(this,"After gc total memory:" + (System.totalMemory * value).toFixed(2) + "M");
        //}
        //
        /**
         * 删除计时回调
         *
         */
        __egretProto__.removeTimer = function () {
            egret.TimerManager.getInstance().removeExecute(this._timerId);
        };
        //
        /**
         * 设置是否绘制下层交互遮罩
         * @param container
         * @param layerType
         *
         */
        __egretProto__.setModel = function (container, layerType) {
            if (layerType === void 0) { layerType = 0; }
            var layerConfig = egret.ApplicationLayerType.LAYER_MOUSE_CONFIGS[layerType];
            container.graphics.clear();
            if (layerConfig.model && container.numChildren > 0) {
                container.graphics.beginFill(0x0, layerConfig.alpha);
                container.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
                container.graphics.endFill();
            }
        };
        //
        /**
         * 检测模态是否显示
         * @param container
         *
         */
        __egretProto__.checkModel = function (container) {
            //处理下层交互遮罩
            if (container)
                for (var key in this._layerHashMap.content) {
                    if (this._layerHashMap.get(key) == container) {
                        this.setModel(container, key);
                        break;
                    }
                }
        };
        //
        /**
         * 调度 recall() 事件
         * @param win:IWindow 当前调用 recall() 的窗口
         *
         */
        __egretProto__.dispatchRecall = function (win) {
            if (this.hasEventListener(egret.ApplicationEvent.WINDOW_RECALL))
                this.dispatchEvent(new egret.ApplicationEvent(egret.ApplicationEvent.WINDOW_RECALL, false, false, win));
        };
        //单例
        ApplicationManager._instance = null;
        return ApplicationManager;
    })(egret.EventDispatcher);
    egret.ApplicationManager = ApplicationManager;
    ApplicationManager.prototype.__class__ = "egret.ApplicationManager";
})(egret || (egret = {}));
//# sourceMappingURL=ApplicationManager.js.map