var egret;
(function (egret) {
    var FrameScriptItem = (function (_super) {
        __extends(FrameScriptItem, _super);
        /**
         * 构造函数
         * @param execute:Function 回调函数
         * @param frameInterval:int = 1 执行回调函数的帧数间隔，最小为 1
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        function FrameScriptItem(execute, frameInterval, params, priority, target) {
            if (frameInterval === void 0) { frameInterval = 1; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            _super.call(this, execute, params, priority, target);
            //执行回调函数的帧数间隔，最小值:1 
            this._frameInterval = 1;
            //帧计数
            this._frameAmount = 0;
            if (isNaN(frameInterval) || frameInterval < 1) {
                throw new Error("frameInterval 必须大于等于 1");
            }
            this.frameInterval = frameInterval;
        }
        var __egretProto__ = FrameScriptItem.prototype;
        Object.defineProperty(__egretProto__, "frameInterval", {
            //
            get: function () {
                return this._frameInterval;
            },
            /**
             * 执行回调函数的帧数间隔，最小值:1
             * @param value:int
             *
             */
            set: function (value) {
                if (this._frameInterval == value)
                    return;
                this._frameInterval = value;
                this._frameInterval = Math.max(this._frameInterval, 1);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 每间隔frameInterval指定的帧数执行一次回调函数
         *
         */
        __egretProto__.apply = function () {
            if (this.execute == null)
                return;
            this._frameAmount++;
            if (this._frameAmount >= this.frameInterval) {
                this._currentCount++;
                this._frameAmount %= this.frameInterval;
                this.execute.apply(this.target, this.params);
            }
        };
        //
        __egretProto__.destroy = function () {
            this._frameInterval = 0;
            this._frameAmount = 0;
            _super.prototype.destroy.call(this);
        };
        return FrameScriptItem;
    })(egret.ScriptItem);
    egret.FrameScriptItem = FrameScriptItem;
    FrameScriptItem.prototype.__class__ = "egret.FrameScriptItem";
})(egret || (egret = {}));
