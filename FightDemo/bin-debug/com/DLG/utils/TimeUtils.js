var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var TimeUtil = (function () {
        function TimeUtil() {
        }
        /**
         * 将时间长度格式化
         *08:08:08
        @repairZero 是否补0
         */
        TimeUtil.FormatTime1 = function (fmt, time, repairZero) {
            if (repairZero === void 0) { repairZero = true; }
            var day = time / 86400;
            var hour = time % 86400 / 3600;
            var minutent = time % 3600 / 60;
            var seconds = time % 60;
            if (!new RegExp("(d+)").test(fmt)) {
                hour += day * 24;
            }
            if (!new RegExp("(h+)").test(fmt)) {
                minutent += hour * 60;
            }
            var o = {
                "d+": day,
                "h+": hour,
                "m+": minutent,
                "s+": seconds,
            };
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) {
                    if (repairZero) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ("" + o[k]).length == 1 ? "0" + o[k] : o[k]);
                    }
                    else {
                        fmt = fmt.replace(RegExp.$1, o[k]);
                    }
                }
            return fmt;
        };
        /*
        // 传入时间戳，转换成天/时/分/秒
        public static FormatTime5Up(second) {
            var left = second;

            var day = Math.floor(left / (3600 * 24));

            left = second % (3600 * 24);

            var hour = Math.floor(left / 3600);

            left = second % 3600;

            var min = Math.floor(left / 60);

            var sec = second % 60;

            if (day > 0) {
                return Utils.stringFormat(Language.getLanguage(730128), day + 1);;
            } else if (hour > 0) {
                return Utils.stringFormat(Language.getLanguage(730129), hour + 1);;
            } else if (min > 0) {
                return Utils.stringFormat(Language.getLanguage(730130), min + 1);;
            } else {
                return Utils.stringFormat(Language.getLanguage(730131), sec);;
            }
        }

        // 传入时间戳，转换成天/时/分/秒
        public static FormatTime5(second, digits = 1) {
            var left = second;


            var day = Math.floor(left / (3600 * 24));
            var day_str = Utils.stringFormat(Language.getLanguage(730128), day);

            left = second % (3600 * 24);

            var hour = Math.floor(left / 3600);
            var hour_str = Utils.stringFormat(Language.getLanguage(730129), hour);

            left = second % 3600;

            var min = Math.floor(left / 60);
            var min_str = Utils.stringFormat(Language.getLanguage(730130), min);

            var sec = second % 60;
            var sec_str = Utils.stringFormat(Language.getLanguage(730131), sec);

            if (digits == 1) {
                if (day > 0) {
                    return day_str;
                } else if (hour > 0) {
                    return hour_str;
                } else if (min > 0) {
                    return min_str;
                } else {
                    return sec_str;
                }
            } else if (digits == 2) {
                if (day > 0) {
                    if (hour > 0) {
                        return day_str + hour_str;
                    } else {
                        return day_str;
                    }
                } else if (hour > 0) {
                    if (min > 0) {
                        return hour_str + min_str;
                    } else {
                        return hour_str;
                    }
                } else if (min > 0) {
                    if (sec > 0) {
                        return min_str + sec_str;
                    } else {
                        return min_str;
                    }
                } else {
                    return sec_str;
                }
            }
        }
        */
        // 传入时间戳，转换成  固定的digits长度 %d天%d时%d分%d秒
        TimeUtil.FormatTime2 = function (second, digits, fmt) {
            if (digits === void 0) { digits = 1; }
            if (fmt === void 0) { fmt = '秒'; }
            digits = digits || 1;
            var left = second;
            if (digits == 1) {
                return DLG.Utils.stringFormat(fmt, second);
            }
            else if (digits == 2) {
                var min = Math.floor(second / 60);
                var sec = Math.floor(second % 60);
                var min_str = DLG.Utils.stringFormat(fmt.slice(0, 1), min);
                var sec_str = DLG.Utils.stringFormat(fmt.slice(1, 2), sec);
                return min_str + sec_str;
            }
            else if (digits == 3) {
                var hour = Math.floor(second / 3600);
                var hour_str = DLG.Utils.stringFormat(fmt.slice(0, 1), hour);
                left = second % 3600;
                var min = Math.floor(left / 60);
                var min_str = DLG.Utils.stringFormat(fmt.slice(1, 2), min);
                var sec = Math.floor(second % 60);
                var sec_str = DLG.Utils.stringFormat(fmt.slice(2, 3), sec);
                return hour_str + min_str + sec_str;
            }
            else if (digits == 4) {
                var day = Math.floor(left / (3600 * 24));
                var day_str = DLG.Utils.stringFormat(fmt.slice(0, 1), day);
                left = second % (3600 * 24);
                var hour = Math.floor(left / 3600);
                var hour_str = DLG.Utils.stringFormat(fmt.slice(1, 2), hour);
                left = second % 3600;
                var min = Math.floor(left / 60);
                var min_str = DLG.Utils.stringFormat(fmt.slice(2, 3), min);
                var sec = Math.floor(second % 60);
                var sec_str = DLG.Utils.stringFormat(fmt.slice(3, 4), sec);
                return day_str + hour_str + min_str + sec_str;
            }
        };
        //传入xxxx秒 转换成 天、时、分、秒格式的字符串
        TimeUtil.FormatTime3 = function (second1, fmt) {
            if (fmt === void 0) { fmt = '天时分秒'; }
            var left_second = second1;
            var day = Math.floor(left_second / (3600 * 24));
            left_second = second % (3600 * 24);
            var hour = Math.floor(left_second / 3600);
            left_second = second % 3600;
            var minite = Math.floor(left_second / 60);
            left_second = second % 60;
            var second = Math.floor(left_second) % 60;
            if (day != 0) {
                return DLG.Utils.stringFormat(fmt.slice(0, 1), day) + DLG.Utils.stringFormat(fmt.slice(1, 2), hour);
            }
            else if (hour != 0) {
                return DLG.Utils.stringFormat(fmt.slice(1, 2), hour) + DLG.Utils.stringFormat(fmt.slice(2, 3), minite);
            }
            else if (minite != 0) {
                return DLG.Utils.stringFormat(fmt.slice(2, 3), minite) + DLG.Utils.stringFormat(fmt.slice(3, 4), second);
            }
            else {
                if (second == 0) {
                    second = 1;
                }
                return DLG.Utils.stringFormat(fmt.slice(3, 4), second);
            }
        };
        return TimeUtil;
    }());
    DLG.TimeUtil = TimeUtil;
    __reflect(TimeUtil.prototype, "DLG.TimeUtil");
})(DLG || (DLG = {}));
//# sourceMappingURL=TimeUtils.js.map