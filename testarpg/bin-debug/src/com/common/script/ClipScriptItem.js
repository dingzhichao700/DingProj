var egret;
(function (egret) {
    var ClipScriptItem = (function (_super) {
        __extends(ClipScriptItem, _super);
        /**
         * 构造函数
         * @param execute:Function 回调函数
         * @param frameIndex:int = 1
         * @param params:Array <code>execute</code>函数参数列表，数组的每个元素将作为函数的一个参数进行传递，而不将数组作为一个参数传递
         * @param priority:int = 0  函数优先级，优先级数值大的优先执行，最小值:0
         * @param target:Object = null 执行函数的对象，可能为null
         *
         */
        function ClipScriptItem(execute, frameIndex, params, priority, target) {
            if (frameIndex === void 0) { frameIndex = 1; }
            if (params === void 0) { params = null; }
            if (priority === void 0) { priority = 0; }
            if (target === void 0) { target = null; }
            _super.call(this, execute, params, priority, target);
            //帧索引，最小值:1 
            this._frameIndex = 0;
            if (isNaN(frameIndex) || frameIndex < 1) {
                throw new Error("frameIndex 必须大于等于 1");
            }
            this.frameIndex = frameIndex;
        }
        var __egretProto__ = ClipScriptItem.prototype;
        Object.defineProperty(__egretProto__, "frameIndex", {
            get: function () {
                return this._frameIndex;
            },
            /**
             * 帧索引，最小值:1，添加至影片后设置此属性将不能使数据对象在正确的帧中执行，应在添加至影片前设置
             * @param value:int
             *
             */
            set: function (value) {
                if (this._frameIndex == value)
                    return;
                this._frameIndex = value;
                this._frameIndex = Math.max(this._frameIndex, 1);
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.destroy = function () {
            this._frameIndex = 0;
            _super.prototype.destroy.call(this);
        };
        return ClipScriptItem;
    })(egret.ScriptItem);
    egret.ClipScriptItem = ClipScriptItem;
    ClipScriptItem.prototype.__class__ = "egret.ClipScriptItem";
})(egret || (egret = {}));
//# sourceMappingURL=ClipScriptItem.js.map