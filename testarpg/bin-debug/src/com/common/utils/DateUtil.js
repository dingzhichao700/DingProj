var egret;
(function (egret) {
    var DateUtil = (function () {
        /**
         * 构造函数
         */
        function DateUtil() {
            throw new Error("TimeUtil just is a static class.");
        }
        var __egretProto__ = DateUtil.prototype;
        //
        /**
         * 根据时间量返回时间对象(相对于1970年标准时间):x年x月x日x时x分x秒x毫秒 具有以下属性:<br/>
         * years 年<br/>
         * months 月 0-29<br/>
         * days 日 0-11<br/>
         * hours 时 0-23<br/>
         * minutes 分 0-59<br/>
         * seconds 秒 0-59<br/>
         * milliseconds 毫秒 0-999<br/>
         * @param millisecond:Number毫秒
         * @return Object
         */
        DateUtil.getTimeObject = function (millisecond) {
            var mYear = millisecond % DateUtil.VALUE_YEAR;
            var mMonth = mYear % DateUtil.VALUE_MONTH;
            var mDate = mMonth % DateUtil.VALUE_DATE;
            var mHour = mDate % DateUtil.VALUE_HOUR;
            var mMinute = mHour % DateUtil.VALUE_MINUTE;
            var o = new Object();
            o.years = Math.floor(millisecond / DateUtil.VALUE_YEAR);
            o.months = Math.floor(mYear / DateUtil.VALUE_MONTH);
            o.days = Math.floor(mMonth / DateUtil.VALUE_DATE);
            o.hours = Math.floor(mDate / DateUtil.VALUE_HOUR);
            o.minutes = Math.floor(mHour / DateUtil.VALUE_MINUTE);
            o.seconds = Math.floor(mMinute / DateUtil.VALUE_SECOND);
            o.milliseconds = Math.floor(mMinute % DateUtil.VALUE_SECOND);
            return o;
        };
        //
        /**
         * 由指定毫秒数返回倒计时时间:y-m-d h:m:s，如果y,m,d为0则省略，h,m,s始终不省略
         * @param time:Number 毫秒
         * @return
         *
         */
        DateUtil.getTime = function (time) {
            var o = DateUtil.getTimeObject(time);
            var result = "";
            var array = [o.years, o.months, o.days, o.hours, o.minutes, o.seconds];
            var signs = DateUtil.SIGNS;
            for (var i = 0; i < array.length; i++) {
                if (i > 2 || array[i] != 0) {
                    result += egret.NumberUtil.getMultipleValue(array[i]) + signs[i];
                }
            }
            return result;
        };
        //
        /**
         * 获取本地时间对象
         * @param time:Number 毫秒值
         * @return
         *
         */
        DateUtil.getDate = function (time) {
            return new Date(time + DateUtil.TIMEZONE_OFFSET);
        };
        /**
         * 毫秒值
         */
        DateUtil.VALUE_MILLISECOND = 1;
        /**
         * 一秒毫秒值
         */
        DateUtil.VALUE_SECOND = 1000;
        /**
         * 一分钟毫秒值
         */
        DateUtil.VALUE_MINUTE = 60 * DateUtil.VALUE_SECOND;
        /**
         * 5分钟毫秒值
         */
        DateUtil.VALUE_MINUTE_5 = 5 * 60 * DateUtil.VALUE_SECOND;
        /**
         * 10分钟毫秒值
         */
        DateUtil.VALUE_MINUTE_10 = 1 * 60 * DateUtil.VALUE_SECOND * 10;
        /**
         * 一小时毫秒值
         */
        DateUtil.VALUE_HOUR = 3600 * DateUtil.VALUE_SECOND;
        /**
         * 一天毫秒值
         */
        DateUtil.VALUE_DATE = 24 * DateUtil.VALUE_HOUR;
        /**
         * 一星期毫秒值
         */
        DateUtil.VALUE_WEEK = 7 * DateUtil.VALUE_DATE;
        /**
         * 一月毫秒值(30天)
         */
        DateUtil.VALUE_MONTH = 30 * DateUtil.VALUE_DATE;
        /**
         * 一年毫秒值(365天)
         */
        DateUtil.VALUE_YEAR = 365 * DateUtil.VALUE_DATE;
        /**
         * 当前时区时间差毫秒值
         */
        DateUtil.TIMEZONE_OFFSET = new Date().getTimezoneOffset() * DateUtil.VALUE_MINUTE;
        DateUtil.SIGNS = ["-", "-", "  ", ":", ":", ""];
        return DateUtil;
    })();
    egret.DateUtil = DateUtil;
    DateUtil.prototype.__class__ = "egret.DateUtil";
})(egret || (egret = {}));
