var egret;
(function (egret) {
    var LogManager = (function () {
        /**
         * 构造函数
         *
         */
        function LogManager() {
        }
        var __egretProto__ = LogManager.prototype;
        Object.defineProperty(LogManager, "logDatas", {
            /**
             * 日志数据
             * @return
             *
             */
            get: function () {
                return LogManager._logDatas;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 输出警告日志
         * @param target:Object 输出日志当前类
         * @param args 日志列表
         *
         */
        LogManager.warn = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            LogManager.print(LogManager.LEVEL_WARN, target, args);
        };
        //
        /**
         * 输出信息日志
         * @param target:Object 输出日志当前类
         * @param args 日志列表
         *
         */
        LogManager.info = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            LogManager.print(LogManager.LEVEL_INFO, target, args);
        };
        //
        /**
         * 输出调试日志
         * @param target:Object 输出日志当前类
         * @param args 日志列表
         *
         */
        LogManager.debug = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            LogManager.print(LogManager.LEVEL_DEBUG, target, args);
        };
        //
        /**
         * 输出错误日志
         * @param target :Object 输出日志当前类
         * @param args 日志列表
         *
         */
        LogManager.error = function (target) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            LogManager.print(LogManager.LEVEL_ERROR, target, args);
        };
        //
        /**
         * 获取所有日志 html 格式标记级别颜色
         * @return
         *
         */
        LogManager.getAllMessageHtml = function () {
            var line = "\n";
            var message = "";
            var length = LogManager._logDatas.length;
            for (var i = 0; i < length; i++) {
                if (LogManager._logDatas[i].level == LogManager.LEVEL_ERROR) {
                    message += egret.HtmlUtil.getHtml(LogManager._logDatas[i].message, 12, "#ff0000");
                }
                else if (LogManager._logDatas[i].level == LogManager.LEVEL_WARN) {
                    message += egret.HtmlUtil.getHtml(LogManager._logDatas[i].message, 12, "#FF6600");
                }
                else {
                    message += LogManager._logDatas[i].message;
                }
                message += line;
            }
            return message;
        };
        //
        /**
         * 获取所有错误日志 html
         * @return
         *
         */
        LogManager.getErrorMessage = function () {
            var line = "\n";
            var message = "";
            var length = LogManager._errDatas.length;
            for (var i = 0; i < length; i++) {
                message += egret.HtmlUtil.getHtml(LogManager._errDatas[i], 12, "#ff0000") + line;
            }
            return message;
        };
        //
        /**
         * 设置日志级别
         * @param level:int 日志级别
         *
         */
        LogManager.setLevel = function (level) {
            if (level === void 0) { level = 0; }
            LogManager.init();
            LogManager._level = level;
            for (var i = 0; i < LogManager._logDatas.length; i++) {
                if (LogManager._logDatas[i].level < LogManager._level) {
                    LogManager._logDatas.splice(i, 1);
                    i--;
                }
            }
        };
        //
        /**
         * 设置当前日志的数量长度，超出的将删除
         * @param length
         *
         */
        LogManager.setMaxLength = function (length) {
            if (length === void 0) { length = 0; }
            LogManager._length = length;
            while (LogManager._logDatas.length > LogManager._length) {
                LogManager._logDatas.shift();
            }
        };
        //
        /**
         * 设置输出日志的对象，非此对象中输出的日志将删除 ，重置为全部输出时时使用 null 作为参数
         * @param target:Object
         *
         */
        LogManager.setTarget = function (target) {
            LogManager._target = target;
            for (var i = 0; i < LogManager._logDatas.length; i++) {
                if (LogManager._logDatas[i].target != target) {
                    LogManager._logDatas.splice(i, 1);
                    i--;
                }
            }
        };
        //
        /**
         * 输出日志
         * @param level:int 级别
         * @param target:Object 输出日志的对象
         * @param array:Array
         * @return
         *
         */
        LogManager.print = function (level, target, array) {
            LogManager.init();
            var content = "";
            if (level >= LogManager._level && (LogManager._target == null || target == LogManager._target)) {
                var data = {
                    level: level,
                    target: target,
                    message: LogManager.getMessage(array)
                };
                var className = egret.getQualifiedClassName(target);
                var date = new Date();
                content = "【" + LogManager.LEVEL_LABELS[level] + "】" + "【#" + (LogManager._index) + " " + date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "】[class " + className + "] " + data.message;
                data.message = content;
                LogManager._logDatas.push(data);
                if (level == LogManager.LEVEL_ERROR) {
                    LogManager._errDatas.push(content);
                }
                if (LogManager._logDatas.length > LogManager._length) {
                    LogManager._logDatas.shift();
                }
                if (LogManager._errDatas.length > LogManager._length) {
                    LogManager._errDatas.shift();
                }
                LogManager._index++;
                if (LogManager._index > LogManager._length) {
                    LogManager._index = 1;
                }
                console.log(content);
            }
            return content;
        };
        //
        /**
         * 组装一条日志
         * @param array:Array 日志信息数组
         * @return
         *
         */
        LogManager.getMessage = function (array) {
            var message = "";
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var item = array[i];
                message += item + " ";
            }
            return message;
        };
        //
        /**
         * 初始化
         *
         */
        LogManager.init = function () {
            if (LogManager._logDatas != null)
                return;
            LogManager._logDatas = [];
            LogManager._errDatas = [];
            LogManager.setLevel(LogManager.LEVEL_ALL);
            LogManager.setMaxLength(LogManager.MAX_LENGTH);
        };
        /**
         * 输出所有日志
         */
        LogManager.LEVEL_ALL = 0;
        /**
         * 输出信息和更高级别日志
         */
        LogManager.LEVEL_INFO = 1;
        /**
         * 输出调试和更高级别日志
         */
        LogManager.LEVEL_DEBUG = 2;
        /**
         * 输出警告级别和更高级别日志
         */
        LogManager.LEVEL_WARN = 3;
        /**
         * 输出错误级别和更高级别日志
         */
        LogManager.LEVEL_ERROR = 4;
        //控制台最大日志数量
        LogManager.MAX_LENGTH = 500;
        //级别标识
        LogManager.LEVEL_LABELS = Array("ALL", "INFO", "DEBUG", "WARN", "ERROR");
        //日志数据对象
        LogManager._logDatas = null;
        //错误日志
        LogManager._errDatas = null;
        //当前级别
        LogManager._level = LogManager.LEVEL_ALL;
        //当前长度
        LogManager._length = 0;
        //针对的日志对象
        LogManager._target = null;
        //编辑索引
        LogManager._index = 1;
        return LogManager;
    })();
    egret.LogManager = LogManager;
    LogManager.prototype.__class__ = "egret.LogManager";
})(egret || (egret = {}));
