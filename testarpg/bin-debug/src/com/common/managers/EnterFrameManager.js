var egret;
(function (egret) {
    var EnterFrameManager = (function () {
        /**
         * 构造函数
         *
         */
        function EnterFrameManager() {
            /**
             * 共用驱动器(EnterFrame执行对象)的项目数量，0为不限制
             */
            this.sharedCount = 100;
            //逐帧侦听对象
            this._frameSprite = null;
            //回调方法项目
            this._executeHashMap = null;
            //计时器与回调对象列表
            this._driverDatas = null;
            //enterFrameHandler()专用缓存对象
            this._completeArray = null;
            //计时器映射model表
            this._modelMap = null;
            //
            this._gcId = NaN;
            this._executeHashMap = new egret.HashMap();
            this._modelMap = new egret.HashMap();
            this._driverDatas = [];
            this._completeArray = [];
            this._idGenerator = new egret.IDGenerator();
        }
        var __egretProto__ = EnterFrameManager.prototype;
        //
        /**
         * 单例
         * @return
         *
         */
        EnterFrameManager.getInstance = function () {
            return EnterFrameManager._instance || (EnterFrameManager._instance = new EnterFrameManager());
        };
        //
        /**
         * 是否已注册回调
         * @param execute:Function 回调函数
         * @return
         *
         */
        __egretProto__.hasExecute = function (id) {
            return this._executeHashMap.containsKey(id);
        };
        //
        /**
         * 获取方法对应的回调函数数据项目
         * @param execute:Function 回调函数
         * @return
         *
         */
        __egretProto__.getItem = function (id) {
            return this._executeHashMap.get(id);
        };
        /**
         * 添加逐帧回调函数，若要循环添加方法，应在添加前调用removeExecute()移除，通过返回的 id 自行判断是否已添加某函数的回调，用于保存此 id 的变量初始化时应设为NaN，否则根据 id 移除回调时，有可能把其它回调移除
         * @param execute:Function 回调函数
         * @param target:Object = null 执行函数的对象
         * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param repeatCount:int = 0  执行次数，0 不限制
         * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
         *
         */
        __egretProto__.addExecute = function (execute, target, frameInterval, params, repeatCount, priority) {
            if (frameInterval === void 0) { frameInterval = 1; }
            if (params === void 0) { params = null; }
            if (repeatCount === void 0) { repeatCount = 0; }
            if (priority === void 0) { priority = 0; }
            var id = this._idGenerator.getID();
            while (this._executeHashMap.containsKey(id)) {
                id = this._idGenerator.getID();
            }
            if (execute == null) {
                egret.LogManager.error(this, "execute不能为空: execute = " + execute);
                return id;
            }
            //js函数实现相同时，会被认为是同一个函数，即使属于不同对象
            //if(this._executeHashMap.containsKey(execute)) return;
            var item = egret.ScriptItemManager.getInstance().getFrameScriptItem(execute, frameInterval, params, priority, target);
            item.repeatCount = repeatCount;
            item.id = id;
            this.addScriptItem(item);
            return id;
        };
        //
        /**
         * 移除计时回调函数
         * @param execute:Function 回调函数
         *
         */
        __egretProto__.removeExecute = function (id) {
            var item = this._executeHashMap.remove(id);
            this.removeScriptItem(item);
            egret.ScriptItemManager.getInstance().recoverScriptItem(item);
        };
        //
        /**
         * 添加逐帧回调项目
         * @param scriptItem:FrameScriptItem 逐帧回调项目
         *
         */
        __egretProto__.addScriptItem = function (scriptItem) {
            if (!scriptItem || isNaN(scriptItem.id))
                return null;
            if (scriptItem.execute != null)
                this._executeHashMap.put(scriptItem.id, scriptItem);
            var isFull = false;
            var model = null;
            var length = this._driverDatas.length;
            for (var i = 0; i < length; i++) {
                var object = this._driverDatas[i];
                model = object.model;
                if (this.sharedCount > 0 && model.itemsCount >= this.sharedCount) {
                    isFull = true;
                }
                else {
                    isFull = false;
                    break;
                }
            }
            if (!object || isFull) {
                object = {
                    driver: this.addDriver(null),
                    model: new egret.ScriptModel(this.sharedCount)
                };
                this._driverDatas.push(object);
                this._modelMap.put(object.driver.hashCode, object.model);
            }
            else {
                this.addDriver(object.driver);
            }
            //计时，长时间未使用则从内存中清理
            object.time = 0;
            model = object.model;
            model.addScript(scriptItem);
            return scriptItem;
        };
        //
        /**
         * 移除逐帧回调项目，若已移除所有回调函数，将停止逐帧处理
         * @param scriptItem:FrameScriptItem 逐帧回调项目
         * @param destroy:Boolean = false 是否销毁回调项目数据对象，若销毁，则项目属性清空
         * @return FrameScriptItem 或  null
         *
         */
        __egretProto__.removeScriptItem = function (scriptItem, destroy) {
            if (destroy === void 0) { destroy = false; }
            if (!scriptItem)
                return null;
            var model = null;
            var length = this._driverDatas.length;
            for (var i = 0; i < length; i++) {
                var object = this._driverDatas[i];
                model = object.model;
                if (model.hasScriptItem(scriptItem)) {
                    this._executeHashMap.remove(scriptItem.id);
                    var result = (model.removeScript(scriptItem, destroy));
                    //检测是否已移除所有回调
                    if (model.itemsCount == 0) {
                        //计时，长时间未使用则从内存中清理
                        object.time = 0;
                        this.removeDriver(object.driver);
                        this.setTimer(true);
                    }
                    break;
                }
            }
            return result;
        };
        //
        /**
         * 停止计时处理
         *
         */
        __egretProto__.stop = function () {
            if (!this._frameSprite)
                return;
            this._frameSprite.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        //
        /**
         * 停止所有逐帧回调函数并销毁所有逐帧回调函数，所有FrameScriptItem对象属性清空
         * 因组件有使用此类，禁止调用
         */
        __egretProto__.destroy = function () {
            this.stop();
            this._frameSprite = null;
        };
        //
        /**
         * 启动计时处理
         *
         */
        __egretProto__.start = function () {
            if (!this._frameSprite)
                this._frameSprite = new egret.DisplayObjectContainer();
            if (!this._frameSprite.hasEventListener(egret.Event.ENTER_FRAME))
                this._frameSprite.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        //
        /**
         * 停止计时处理
         *
         */
        __egretProto__.removeDriver = function (driver) {
            if (!driver)
                return;
            driver.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
        };
        //
        /**
         * 启动计时处理
         *
         */
        __egretProto__.addDriver = function (driver) {
            if (!driver)
                driver = new egret.DisplayObjectContainer();
            driver.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
            return driver;
        };
        //
        /**
         * 开启或停止计时器
         * @param isStart
         *
         */
        __egretProto__.setTimer = function (isStart) {
            if (isStart) {
                if (!isNaN(this._gcId))
                    egret.TimerManager.getInstance().removeExecute(this._gcId);
                this._gcId = egret.TimerManager.getInstance().addExecute(this.gcTimerHandler, this, egret.DateUtil.VALUE_MINUTE);
            }
            else {
                egret.TimerManager.getInstance().removeExecute(this._gcId);
            }
        };
        //
        /**
         * 逐帧处理
         * @param e
         *
         */
        __egretProto__.enterFrameHandler = function (e) {
            var items = null;
            var scriptItem = null;
            var model = null;
            var length = 0;
            model = this._modelMap.get(e.target.hashCode);
            length = model.priorityMax;
            for (var i = length; i >= 0; i--) {
                items = model.items[i];
                var length1 = model.itemsCount;
                for (var i1 = 0; i1 < length1; i1++) {
                    scriptItem = items[i1];
                    if (!scriptItem)
                        break;
                    //防止一个对象发生错误时导致后面的对象无法执行脚本而崩溃
                    //					try{
                    scriptItem.apply();
                    if (scriptItem.isCompleted)
                        this._completeArray.push(scriptItem);
                }
            }
            var length2 = this._completeArray.length;
            for (var i2 = 0; i2 < length2; i2++) {
                scriptItem = this._completeArray[i2];
                this.removeScriptItem(scriptItem);
            }
            this._completeArray.length = 0;
        };
        //
        /**
         * 计时器处理
         * @param e
         *
         */
        __egretProto__.gcTimerHandler = function () {
            var model = null;
            var length = 0;
            var object = null;
            var driver = null;
            for (var i = 0; i < this._driverDatas.length; i++) {
                object = this._driverDatas[i];
                //10分钟未使用并且计时器已停止的对象则清理
                object.time += egret.DateUtil.VALUE_MINUTE;
                if (object.time >= egret.DateUtil.VALUE_MINUTE_10) {
                    driver = object.driver;
                    if (driver.hasEventListener(egret.Event.ENTER_FRAME)) {
                        object.time = 0;
                    }
                    else {
                        model = object.model;
                        model.destroy();
                        this._modelMap.remove(driver.hashCode);
                        this._driverDatas.splice(i, 1);
                        i--;
                    }
                }
            }
            length = this._driverDatas.length;
            //全部清理时，停止GC计时器
            if (length == 0)
                this.setTimer(false);
        };
        //单例 
        EnterFrameManager._instance = null;
        return EnterFrameManager;
    })();
    egret.EnterFrameManager = EnterFrameManager;
    EnterFrameManager.prototype.__class__ = "egret.EnterFrameManager";
})(egret || (egret = {}));
