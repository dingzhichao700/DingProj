var egret;
(function (egret) {
    var TimerManager = (function () {
        /**
         * 构造函数
         *
         */
        function TimerManager() {
            /**
             * 共用驱动器(Timer执行者)的项目数量，0为不限制
             */
            this.sharedCount = 100;
            //计时器与回调对象列表
            this._hashMap = null;
            //回调方法项目
            this._executeHashMap = null;
            //GC计时器
            this._gcTimer = null;
            //timerHandler()专用缓存对象
            this._completeArray = null;
            //计时器映射model表
            this._modelMap = null;
            this._hashMap = new egret.HashMap();
            this._executeHashMap = new egret.HashMap();
            this._modelMap = new egret.HashMap();
            this._completeArray = [];
            this._idGenerator = new egret.IDGenerator();
        }
        var __egretProto__ = TimerManager.prototype;
        //
        /**
         * 单例
         * @return
         *
         */
        TimerManager.getInstance = function () {
            return TimerManager._instance || (TimerManager._instance = new TimerManager());
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
        //
        /**
         * 添加计时回调函数，若要循环添加方法，应在添加前调用removeExecute()移除，通过返回的 id 自行判断是否已添加某函数的回调，用于保存此 id 的变量初始化时应设为NaN，否则根据 id 移除回调时，有可能把其它回调移除
         * @param execute:Function 回调函数
         * @param target:Object = null 执行函数的对象
         * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param repeatCount:int = 0  执行次数，0 不限制
         * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0
         *
         */
        __egretProto__.addExecute = function (execute, target, delay, params, repeatCount, priority) {
            if (delay === void 0) { delay = 20; }
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
            //if(this._executeHashMap.containsKey(execute)) return;
            var item = egret.ScriptItemManager.getInstance().getTimerScriptItem(execute, delay, params, priority, target);
            item.repeatCount = repeatCount;
            item.id = id;
            this.addScriptItem(item);
            return id;
        };
        //
        /**
         * 移除计时回调函数
         * @param execute:Function 回调函数
         */
        __egretProto__.removeExecute = function (id) {
            var item = this._executeHashMap.remove(id);
            this.removeScriptItem(item);
            egret.ScriptItemManager.getInstance().recoverScriptItem(item);
        };
        //
        /**
         * 添加计时回调项目
         * @param scriptItem:TimerScriptItem 计时回调项目
         *
         */
        __egretProto__.addScriptItem = function (scriptItem) {
            if (!scriptItem || isNaN(scriptItem.id))
                return null;
            if (scriptItem.execute != null)
                this._executeHashMap.put(scriptItem.id, scriptItem);
            var array = this._hashMap.get(scriptItem.delay);
            if (!array) {
                array = [];
                this._hashMap.put(scriptItem.delay, array);
            }
            var isFull = false;
            var model = null;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var object = array[i];
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
                    timer: this.addTimer(null, scriptItem.delay),
                    model: new egret.ScriptModel(this.sharedCount)
                };
                array.push(object);
                this._modelMap.put(object.timer.hashCode, object.model);
            }
            else {
                this.addTimer(object.timer);
            }
            //计时，长时间未使用则从内存中清理
            object.time = 0;
            model = object.model;
            model.addScript(scriptItem);
            return scriptItem;
        };
        //
        /**
         * 移除计时回调项目，若已移除所有回调函数，将停止计时处理
         * @param scriptItem:TimerScriptItem 计时回调项目
         * @param destroy:Boolean = false 是否销毁回调项目数据对象，若销毁，则项目属性清空
         * @return ScriptItem 或  null
         *
         */
        __egretProto__.removeScriptItem = function (scriptItem, destroy) {
            if (destroy === void 0) { destroy = false; }
            if (!scriptItem)
                return null;
            var array = this._hashMap.get(scriptItem.delay);
            var model = null;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var object = array[i];
                model = object.model;
                if (model.hasScriptItem(scriptItem)) {
                    this._executeHashMap.remove(scriptItem.id);
                    var result = (model.removeScript(scriptItem, destroy));
                    //检测是否已移除所有回调
                    if (model.itemsCount == 0) {
                        //计时，长时间未使用则从内存中清理
                        object.time = 0;
                        this.removeTimer(object.timer);
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
        __egretProto__.removeTimer = function (timer) {
            if (!timer)
                return;
            timer.reset();
            timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        };
        //
        /**
         * 启动计时处理
         *
         */
        __egretProto__.addTimer = function (timer, delay) {
            if (delay === void 0) { delay = 0; }
            if (!timer)
                timer = new egret.Timer(delay);
            timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
            timer.start();
            return timer;
        };
        //
        /**
         * 计时处理
         * @param e
         *
         */
        __egretProto__.timerHandler = function (e) {
            var timer = (e.target);
            var items = null;
            var scriptItem = null;
            var array = this._hashMap.get(timer.delay);
            var model = null;
            var length = 0;
            model = this._modelMap.get(timer.hashCode);
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
         * 开启或停止计时器
         * @param isStart
         *
         */
        __egretProto__.setTimer = function (isStart) {
            if (isStart) {
                if (!this._gcTimer) {
                    this._gcTimer = new egret.Timer(egret.DateUtil.VALUE_MINUTE);
                }
                if (!this._gcTimer.running) {
                    this._gcTimer.addEventListener(egret.TimerEvent.TIMER, this.gcTimerHandler, this);
                    this._gcTimer.start();
                }
            }
            else if (this._gcTimer) {
                this._gcTimer.reset();
                this._gcTimer.removeEventListener(egret.TimerEvent.TIMER, this.gcTimerHandler, this);
            }
        };
        //
        /**
         * 计时器处理
         * @param e
         *
         */
        __egretProto__.gcTimerHandler = function (e) {
            var model = null;
            var timer = null;
            var length = 0;
            var object = null;
            for (var key in this._hashMap.content) {
                var values = this._hashMap.content[key];
                for (var i = 0; i < values.length; i++) {
                    object = values[i];
                    //10分钟未使用并且计时器已停止的对象则清理
                    object.time += e.target.delay;
                    if (object.time >= egret.DateUtil.VALUE_MINUTE_10) {
                        timer = object.timer;
                        if (timer.running) {
                            object.time = 0;
                        }
                        else {
                            model = object.model;
                            model.destroy();
                            this._modelMap.remove(timer.hashCode);
                            values.splice(i, 1);
                            i--;
                        }
                    }
                }
                length += values.length;
            }
            //全部清理时，停止GC计时器
            if (length == 0)
                this.setTimer(false);
        };
        //单例
        TimerManager._instance = null;
        return TimerManager;
    })();
    egret.TimerManager = TimerManager;
    TimerManager.prototype.__class__ = "egret.TimerManager";
})(egret || (egret = {}));
