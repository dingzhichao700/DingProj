var egret;
(function (egret) {
    var ScriptItemManager = (function () {
        /**
         * 构造函数
         */
        function ScriptItemManager() {
            //类表
            this._hashMap = null;
            this._hashMap = new egret.HashMap();
        }
        var __egretProto__ = ScriptItemManager.prototype;
        //
        /**
         * 单例
         * @return
         *
         */
        ScriptItemManager.getInstance = function () {
            return ScriptItemManager._instance || (ScriptItemManager._instance = new ScriptItemManager());
        };
        //
        /**
         * 获取逐帧回调函数项目
         * @param execute:Function 回调函数
         * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        __egretProto__.getFrameScriptItem = function (execute, frameInterval, params, priority, target) {
            if (frameInterval === void 0) { frameInterval = 1; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            var items = this.getItems(ScriptItemManager.FRAME_SCRIPT_ITEM);
            var item = null;
            if (items.length > 0) {
                item = items.pop();
                item.execute = execute;
                item.frameInterval = frameInterval;
                item.params = params;
                item.priority = priority;
                item.target = target;
            }
            else {
                item = new egret.FrameScriptItem(execute, frameInterval, params, 0, target);
            }
            return item;
        };
        //
        /**
         * 获取计时回调函数项目
         * @param execute:Function 回调函数
         * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        __egretProto__.getTimerScriptItem = function (execute, delay, params, priority, target) {
            if (delay === void 0) { delay = 20; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            var items = this.getItems(ScriptItemManager.TIMER_SCRIPT_ITEM);
            var item = null;
            if (items.length > 0) {
                item = items.pop();
                item.execute = execute;
                item.delay = delay;
                item.params = params;
                item.priority = priority;
                item.target = target;
            }
            else {
                item = new egret.TimerScriptItem(execute, delay, params, priority, target);
            }
            return item;
        };
        //
        /**
         * 获取影片帧回调函数项目
         * @param execute:Function 回调函数
         * @param frameIndex:int = 1
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        __egretProto__.getClipScriptItem = function (execute, frameIndex, params, priority, target) {
            if (frameIndex === void 0) { frameIndex = 1; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            var items = this.getItems(ScriptItemManager.CLIP_SCRIPT_ITEM);
            var item = null;
            if (items.length > 0) {
                item = items.pop();
                item.execute = execute;
                item.frameIndex = frameIndex;
                item.params = params;
                item.priority = priority;
                item.target = target;
            }
            else {
                item = new egret.ClipScriptItem(execute, frameIndex, params, priority, target);
            }
            return item;
        };
        //
        /**
         * 回收回调函数数据对象
         * @param item:ScriptItem
         *
         */
        __egretProto__.recoverScriptItem = function (item) {
            if (!item)
                return null;
            //去除外部对象引用
            item.destroy();
            var type = null;
            if (item instanceof egret.FrameScriptItem) {
                type = ScriptItemManager.FRAME_SCRIPT_ITEM;
            }
            else if (item instanceof egret.TimerScriptItem) {
                type = ScriptItemManager.TIMER_SCRIPT_ITEM;
            }
            else if (item instanceof egret.ClipScriptItem) {
                type = ScriptItemManager.CLIP_SCRIPT_ITEM;
            }
            var array = this.getItems(type);
            array.push(item);
            return item;
        };
        //
        /**
         * 获取数据数组
         * @param classType:* 类或类字符串
         * @return
         *
         */
        __egretProto__.getItems = function (classType) {
            var array = this._hashMap.get(classType);
            if (!array) {
                array = [];
                this._hashMap.put(classType, array);
            }
            return array;
        };
        ScriptItemManager.FRAME_SCRIPT_ITEM = "FrameScriptItem";
        ScriptItemManager.TIMER_SCRIPT_ITEM = "TimerScriptItem";
        ScriptItemManager.CLIP_SCRIPT_ITEM = "ClipScriptItem";
        //单例 
        ScriptItemManager._instance = null;
        return ScriptItemManager;
    })();
    egret.ScriptItemManager = ScriptItemManager;
    ScriptItemManager.prototype.__class__ = "egret.ScriptItemManager";
})(egret || (egret = {}));
