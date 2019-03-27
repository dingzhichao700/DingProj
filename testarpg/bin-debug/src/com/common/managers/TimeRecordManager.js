var egret;
(function (egret) {
    var TimeRecordManager = (function () {
        //
        function TimeRecordManager() {
            //时间记录
            this._timeDict = null;
            //相对时间记录
            this._relativeMap = null;
            this._timeDict = new Object();
            this._relativeMap = new egret.HashMap();
        }
        var __egretProto__ = TimeRecordManager.prototype;
        //
        /**
         * 单例
         * @return
         *
         */
        TimeRecordManager.getInstance = function () {
            return TimeRecordManager._instance || (TimeRecordManager._instance = new TimeRecordManager());
        };
        //
        /**
         * 记录运行时间 ，使用getTimer()计算，单位为ms
         * @param id:* 标识
         * @param isPrint:Boolean = true 是否输出
         * @param message:String = null 消息
         *
         */
        __egretProto__.recordTime = function (id, isPrint, message) {
            if (isPrint === void 0) { isPrint = true; }
            if (message === void 0) { message = ""; }
            var result = 0;
            var time = egret.getTimer();
            if (this._timeDict[id]) {
                result = (time - this._timeDict[id]);
                if (isPrint) {
                    console.log("[id=" + id + "]:" + message + " 距离上次记录用时:" + result);
                }
            }
            this._timeDict[id] = time;
            return result;
        };
        //
        /**
         * 重置相对时间
         * @param id:* 标识符
         *
         */
        __egretProto__.resetRelativeTime = function (id) {
            this._relativeMap.put(id, new Date().getTime());
        };
        //
        /**
         * 获取重置相对时间后，经过的时间(实际经过的系统时间，非getTimer())，单位为ms
         * @param id:* 标识符
         * @return 未使用resetRelativeTime()重置时间时返回 -1
         *
         */
        __egretProto__.getRelativeTime = function (id) {
            if (this._relativeMap.containsKey(id)) {
                var time = this._relativeMap.get(id);
                return new Date().getTime() - time;
            }
            return -1;
        };
        //单例
        TimeRecordManager._instance = null;
        return TimeRecordManager;
    })();
    egret.TimeRecordManager = TimeRecordManager;
    TimeRecordManager.prototype.__class__ = "egret.TimeRecordManager";
})(egret || (egret = {}));
//# sourceMappingURL=TimeRecordManager.js.map