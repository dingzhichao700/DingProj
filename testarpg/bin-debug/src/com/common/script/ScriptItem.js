var egret;
(function (egret) {
    var ScriptItem = (function () {
        /**
         * 构造函数
         * @param execute:Function 回调函数
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:uint = 0  函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        function ScriptItem(execute, params, priority, target) {
            //if(execute == null)
            //	throw new Error("execute 不能为空");
            if (execute === void 0) { execute = null; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            //函数优先级，优先级数值大的优先执行，最小值:0
            this._priority = 0;
            /**
             * 标记此对象的唯一ID值
             * @type {number}
             */
            this.id = NaN;
            /**
             * 执行函数的对象，可能为null
             */
            this.target = null;
            /**
             * 回调函数
             */
            this.execute = null;
            /**
             * <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
             */
            this.params = null;
            /**
             * 执行次数
             */
            this.repeatCount = 0;
            //已执行次数
            this._currentCount = 0;
            this.execute = execute;
            this.params = params;
            this.priority = priority;
            this.target = target;
            this._currentCount = 0;
        }
        var __egretProto__ = ScriptItem.prototype;
        Object.defineProperty(__egretProto__, "currentCount", {
            /**
             * 当前已执行次数
             * @return
             *
             */
            get: function () {
                return this._currentCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "priority", {
            //
            get: function () {
                return this._priority;
            },
            /**
             * 函数优先级，优先级数值大的优先执行，最小值:0，最大值10
             * @param value:uint
             *
             */
            set: function (value) {
                if (this._priority == value)
                    return;
                value = Math.max(value, ScriptItem.PRIORITY_MIN);
                value = Math.min(value, ScriptItem.PRIORITY_MAX);
                this._priority = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isCompleted", {
            //
            get: function () {
                return this.repeatCount > 0 && this._currentCount >= this.repeatCount;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 执行回调函数
         * @param args 逻辑条件参数
         *
         */
        __egretProto__.apply = function () {
            if (this.execute == null)
                return null;
            this._currentCount++;
            return this.execute.apply(this.target, this.params);
        };
        //
        /**
         * 销毁对象 ，数据清空，对象可重用
         *
         */
        __egretProto__.destroy = function () {
            this._currentCount = 0;
            this.repeatCount = 0;
            this._priority = 0;
            this.target = null;
            this.execute = null;
            this.params = null;
        };
        /**
         *  优先级最大值
         */
        ScriptItem.PRIORITY_MAX = 10;
        /**
         *  优先级最小值
         */
        ScriptItem.PRIORITY_MIN = 0;
        return ScriptItem;
    })();
    egret.ScriptItem = ScriptItem;
    ScriptItem.prototype.__class__ = "egret.ScriptItem";
})(egret || (egret = {}));
