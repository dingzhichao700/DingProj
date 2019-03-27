var egret;
(function (egret) {
    var ObjectUtil = (function () {
        /**
         * 构造函数
         */
        function ObjectUtil() {
            throw new Error("ClassUtil just is a static class.");
        }
        var __egretProto__ = ObjectUtil.prototype;
        //
        /**
         * 删除动态对象动态键值
         * @param args 参数列表
         *
         */
        ObjectUtil.deleteObjectKey = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            //Object对象在使用for..in..或for each..in..时不能用delete删除键，否则只能遍历一半数量的属性或值
            var array = [];
            var length = 0;
            var length1 = args.length;
            for (var i1 = 0; i1 < length1; i1++) {
                var object = args[i1];
                if (!object)
                    continue;
                for (var p in object)
                    array.push(p);
                //不能将键赋值为null或undefined，否则此对象键的数量将增加一倍
                length = array.length;
                while (length > 0) {
                    delete object[array.pop()];
                    length--;
                }
            }
        };
        //
        /**
         * 对象是否为3个基元数据类型之一
         * @param target
         * @return
         *
         */
        ObjectUtil.isBaseType = function (target) {
            var length = ObjectUtil.BASE_TYPES.length;
            for (var i = 0; i < length; i++) {
                var v = ObjectUtil.BASE_TYPES[i];
                if (typeof (target) == v) {
                    return true;
                }
            }
            var length1 = ObjectUtil.BASE_TYPES2.length;
            for (var i1 = 0; i1 < length1; i1++) {
                var v = ObjectUtil.BASE_TYPES2[i1];
                if (target == v) {
                    return true;
                }
            }
            return false;
        };
        //
        /**
         * 获取动态对象是否含有动态键值，
         * @param object:Object
         * @return 只要参数存在一个或以上键值则返回true
         *
         */
        ObjectUtil.hasKey = function (object) {
            for (var v in object) {
                return true;
            }
            return false;
        };
        /**
         * 对象属性浅复制，复杂对象属性直接赋值，未创建新对象
         * @param source:* 源对象
         * @param target:* 目标对象
         */
        ObjectUtil.copyProperties = function (source, target) {
            if (!source || !target)
                return;
            for (var p in source) {
                try {
                    target[p] = source[p];
                }
                catch (e) {
                }
            }
        };
        //
        ObjectUtil.clone = function (data) {
            var result = new Object();
            ObjectUtil.copyProperties(data, result);
            return result;
        };
        //基本数据类型
        ObjectUtil.BASE_TYPES = ["number", "string", "boolean"];
        ObjectUtil.BASE_TYPES2 = [null, undefined];
        return ObjectUtil;
    })();
    egret.ObjectUtil = ObjectUtil;
    ObjectUtil.prototype.__class__ = "egret.ObjectUtil";
})(egret || (egret = {}));
//# sourceMappingURL=ObjectUtil.js.map