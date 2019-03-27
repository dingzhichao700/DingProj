var egret;
(function (egret) {
    var ScriptModel = (function () {
        /**
         * 构造函数
         */
        function ScriptModel(sharedCount) {
            if (sharedCount === void 0) { sharedCount = 0; }
            //函数表
            this._hashMap = null;
            //函数按优先级分组数组
            this._items = null;
            //项目数量
            this._itemsCount = 0;
            //共享个数
            this._sharedCount = 0;
            //当前优先级最大值
            this._priorityMax = 0;
            //缓存机制
            this._sharedCount = sharedCount;
            if (this._sharedCount <= 0) {
                throw new Error("sharedCount 必须大于 0");
            }
            this._hashMap = new egret.HashMap();
            this._items = new Array(egret.ScriptItem.PRIORITY_MAX);
        }
        var __egretProto__ = ScriptModel.prototype;
        Object.defineProperty(__egretProto__, "priorityMax", {
            //
            /**
             * 当前优先级最大值
             * @return
             *
             */
            get: function () {
                return this._priorityMax;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "itemsCount", {
            //
            /**
             * 项目数量
             * @return
             *
             */
            get: function () {
                return this._itemsCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "hashMap", {
            /**
             * 回函函数表
             * @return
             *
             */
            get: function () {
                return this._hashMap;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "items", {
            //
            /**
             * 回函函数项目数组
             * @return
             *
             */
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 是否已存在数据对象
         * @param scriptItem:ScriptItem
         * @return
         *
         */
        __egretProto__.hasScriptItem = function (scriptItem) {
            return this._hashMap.containsKey(scriptItem.id);
        };
        //
        /**
         * 添加回调函数对象
         * @param scriptItem:ScriptItem 回调函数数据对象
         * @return ScriptItem
         *
         */
        __egretProto__.addScript = function (scriptItem) {
            if (this._hashMap.containsKey(scriptItem.id))
                return scriptItem;
            var items = this._items[scriptItem.priority];
            if (!items) {
                items = new Array(this._sharedCount);
                this._items[scriptItem.priority] = items;
            }
            items[this._itemsCount] = scriptItem;
            this._hashMap.put(scriptItem.id, true);
            this._itemsCount++;
            this._priorityMax = Math.max(this._priorityMax, scriptItem.priority);
            return scriptItem;
        };
        //
        /**
         * 移除回调函数对象，若已移除所有回调函数，将停止处理
         * @param scriptItem:ScriptItem 回调函数数据对象
         * @param destroy:Boolean = false 是否销毁数据对象，若销毁，则无法重新使用，并且返回 null
         * @return ScriptItem 或  null
         *
         */
        __egretProto__.removeScript = function (scriptItem, destroy) {
            if (destroy === void 0) { destroy = false; }
            if (!this._hashMap.containsKey(scriptItem.id))
                return scriptItem;
            var items = this._items[scriptItem.priority];
            if (items) {
                var length = this._itemsCount;
                var index = 0;
                for (var i = 0; i < length; i++) {
                    if (items[i] == scriptItem) {
                        index = length - 1;
                        //把当前位置的项目与最后一个调换
                        if (i < index) {
                            items[i] = items[index];
                        }
                        items[index] = null;
                        this._itemsCount--;
                        if (this._itemsCount < 0) {
                            this._itemsCount = 0;
                            this._priorityMax = 0;
                        }
                        break;
                    }
                }
            }
            this._hashMap.remove(scriptItem.id);
            if (destroy)
                scriptItem.destroy();
            return scriptItem;
        };
        //
        /**
         * 停止所有回调函数并销毁所有回调函数，所有ScriptItem对象将不能重新使用
         *
         */
        __egretProto__.destroy = function () {
            this._hashMap = null;
            var items = null;
            var scriptItem = null;
            var length = this._priorityMax;
            for (var i = 0; i < length; i++) {
                items = this._items[i];
                var length1 = this._itemsCount;
                for (var i1 = 0; i1 < length1; i1++) {
                    scriptItem = items[i1];
                    if (scriptItem)
                        scriptItem.destroy();
                }
            }
            this._items = null;
            this._itemsCount = 0;
        };
        return ScriptModel;
    })();
    egret.ScriptModel = ScriptModel;
    ScriptModel.prototype.__class__ = "egret.ScriptModel";
})(egret || (egret = {}));
//# sourceMappingURL=ScriptModel.js.map