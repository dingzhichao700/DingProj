var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ArraySort;
(function (ArraySort) {
    ArraySort[ArraySort["UPPER"] = 1] = "UPPER";
    ArraySort[ArraySort["LOWER"] = 2] = "LOWER";
})(ArraySort || (ArraySort = {}));
;
var DLG;
(function (DLG) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.stringFormatArr = function (str, args) {
            var new_str = str;
            for (var i in args) {
                var arg = args[i];
                if (new RegExp("(%s|%d)").test(new_str)) {
                    new_str = new_str.replace(RegExp.$1, arg);
                }
            }
            return new_str;
        };
        /**
         * 格式化字符串
         */
        Utils.stringFormat = function (str) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            //过滤掉所有
            str = str.replace(/%%/g, "%");
            return Utils.stringFormatArr(str, args);
        };
        /**随机数 */
        Utils.random = function (min, max) {
            var rand = Math.floor(Math.random() * (max - min + 1)) + min;
            return rand;
        };
        Utils.getZipResByUrl = function (url, compFunc, thisObject, type) {
            RES.getResByUrl(url, function (data) {
                if (data) {
                    var zip = new JSZip(data);
                    compFunc.call(thisObject, zip.files);
                }
            }, this, type);
        };
        Utils.transformResUrl = function (value) {
            if (true) {
                if (value.lastIndexOf("_png") == -1) {
                    throw new Error("ui名字设置有错");
                }
            }
            return value;
        };
        /**获取对象的所有属性的长度 */
        Utils.objectLenght = function (elem) {
            var keys = Object.keys(elem);
            return keys.length;
        };
        /**把str的数据转成number */
        Utils.strToNumberArray = function (value) {
            var numArr = [];
            var i = 0;
            var len = value.length;
            for (i = 0; i < len; i++) {
                numArr.push(parseInt(value[i]));
            }
            return numArr;
        };
        /**
        * 解析语言包的富文本
        */
        Utils.parseLanRich = function (str) {
            var patt1 = new RegExp("(.*)<color=(.*?)>(.*?)<\/color>(.*)");
            var dstText = "";
            var result = null;
            do {
                result = patt1.exec(str);
                if (result) {
                    var color = RegExp.$2;
                    if (color.indexOf("#") == -1) {
                        color = "#" + color.substr(0, 6);
                    }
                    else {
                        color = color.substr(0, 7);
                    }
                    var newStr = RegExp.$1 + "<font color='" + color + "'>" + RegExp.$3 + "</font>" + RegExp.$4;
                    str = newStr;
                }
            } while (result != null);
            return str;
        };
        /**
         * 解析语言包的富文本
         */
        Utils.parseClickRich = function (str) {
            var patt1 = new RegExp("(.*)<clk=(.*?)>(.*?)<\/clk>(.*)");
            var dstText = "";
            var result = null;
            do {
                result = patt1.exec(str);
                if (result) {
                    var event = RegExp.$2;
                    var newStr = RegExp.$1 + "<u><a href='event:" + event + "'>" + RegExp.$3 + "</a></u>" + RegExp.$4;
                    str = newStr;
                }
            } while (result != null);
            return str;
        };
        /**计算两点间的距离 */
        Utils.distance = function (x1, y1, x2, y2) {
            var x = x1 - x2;
            var y = y1 - y2;
            return Math.sqrt(x * x + y * y);
        };
        Utils.onDestroy = function (obj) {
            while (obj.numChildren > 0) {
                var child = obj.removeChildAt(0);
                if (egret.is(child, 'DLG.IComponent')) {
                    child.onDestroy();
                }
                else if (egret.is(child, 'eui.Group')) {
                    while (child.numChildren > 0) {
                        var groupChild = child.removeChildAt(0);
                        if (egret.is(groupChild, 'IComponent')) {
                            groupChild.onDestroy();
                        }
                        else if (egret.is(groupChild, 'eui.Rect')) {
                        }
                        else {
                            sayError('删除了不是CComponent的对象');
                        }
                    }
                }
                else if (egret.is(groupChild, 'eui.Rect')) {
                }
                else {
                    sayError('删除了不是CComponent的对象');
                }
            }
        };
        Utils.probabilityIndex = function (probability, split, ratio) {
            if (split === void 0) { split = '|'; }
            if (ratio === void 0) { ratio = 10000; }
            if (probability == '0' || probability == undefined) {
                return -1;
            }
            var probabilitys = probability.split(split);
            var r = Math.random();
            var p = r * ratio;
            var start_p;
            var end_p;
            var index = -1;
            var i;
            start_p = 0;
            var len = probabilitys.length;
            for (i = 0; i < len; i++) {
                if (probabilitys[i] == undefined) {
                    end_p = 0;
                }
                else {
                    end_p = parseInt(probabilitys[i]);
                }
                if (end_p == 0) {
                    continue;
                }
                if (p >= start_p && p <= end_p) {
                    index = i;
                    break;
                }
                start_p += end_p;
            }
            probabilitys.length = 0;
            probabilitys = null;
            return index;
        };
        return Utils;
    }());
    DLG.Utils = Utils;
    __reflect(Utils.prototype, "DLG.Utils");
})(DLG || (DLG = {}));
//# sourceMappingURL=Utils.js.map