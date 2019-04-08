var egret;
(function (egret) {
    var TimerScriptItem = (function (_super) {
        __extends(TimerScriptItem, _super);
        /**
         * 构造函数
         * @param execute:Function 回调函数
         * @param delay:Number 执行回调函数的时间间隔 ，单位 ms，最小值:20
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0 函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        function TimerScriptItem(execute, delay, params, priority, target) {
            if (delay === void 0) { delay = 20; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            _super.call(this, execute, params, priority, target);
            //执行回调函数的时间间隔 ，单位 ms，最小值:20
            this._delay = 20;
            if (isNaN(delay) || delay < 1) {
                throw new Error("delay 必须大于等于 1");
            }
            this.delay = delay;
        }
        var __egretProto__ = TimerScriptItem.prototype;
        Object.defineProperty(__egretProto__, "delay", {
            //
            /**
             *
             */
            get: function () {
                return this._delay;
            },
            /**
             * 执行回调函数的时间间隔 ，单位 ms，最小值:20
             * @param value:Number 毫秒数
             *
             */
            set: function (value) {
                if (this._delay == value)
                    return;
                this._delay = value;
                this._delay = Math.max(this._delay, 20);
            },
            enumerable: true,
            configurable: true
        });
        //
        __egretProto__.destroy = function () {
            this._delay = 20;
            _super.prototype.destroy.call(this);
        };
        return TimerScriptItem;
    })(egret.ScriptItem);
    egret.TimerScriptItem = TimerScriptItem;
    TimerScriptItem.prototype.__class__ = "egret.TimerScriptItem";
})(egret || (egret = {}));
//# sourceMappingURL=TimerScriptItem.js.map