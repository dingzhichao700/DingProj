var egret;
(function (egret) {
    var CoreSprite = (function (_super) {
        __extends(CoreSprite, _super);
        //
        function CoreSprite() {
            _super.call(this);
            //是否已销毁
            this._isDestroy = false;
            //侦听数据
            this._listenerData = null;
            //捕获阶段侦听数据
            this._listenerData2 = null;
            this._listenerData = new Object();
            this._listenerData2 = new Object();
        }
        var __egretProto__ = CoreSprite.prototype;
        Object.defineProperty(__egretProto__, "className", {
            //
            /**
             * 返回自身类名，CoreSprite 实例的显示名称:"CoreSprite"
             */
            get: function () {
                return this.constructor["name"];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "tooltip", {
            get: function () {
                return null;
            },
            /**
             * 设置工具提示，若设置 tooltip = this 或 tooltip = 实例本身 时，显示的工具提示使用tooltip属性返回的结果，
             * 重写 get tooltip() 方法即可动态生成工具提示，如: 随等级变化的tooltip，若要获取对象实际显示的tooltip，
             * 使用方法TooltipManager.getTooltip()
             * @param tooltip:* 提示数据，字符串(支持html文本)或显示对象，为null时移除工具提示
             * @see TooltipManager.setTooltip()
             * @see TooltipManager.getTooltip()
             */
            set: function (value) {
                if (value)
                    this.touchEnabled = true;
                egret.TooltipManager.setTooltip(this, value);
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 将CoreSprite实例输出为其在显示列表中的层级格式:Stage.xxx.xxx
         * @return
         *
         */
        __egretProto__.toString = function () {
            var target = this.parent;
            var name = this.className;
            var temp = "";
            while (target != null) {
                if (this.stage != null && target == this.stage) {
                    name = "Stage" + "." + name;
                }
                else {
                    //因hasOwnProperty()无效，替换
                    if ("className" in target) {
                        name = target["className"] + "." + name;
                    }
                    else {
                        name = target.name + "." + name;
                    }
                }
                target = target.parent;
            }
            return name;
        };
        //
        /**
         * 重写事件添加方法，记录所有内部或外部添加的事件，在调用destroy()方法后，将自动移除所有事件侦听
         * @param type
         * @param listener
         * @param useCapture
         * @param priority
         * @param useWeakReference
         *
         */
        __egretProto__.addEventListener = function (type, listener, thisObj, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            if (this._isDestroy)
                return;
            _super.prototype.addEventListener.call(this, type, listener, thisObj, useCapture, priority);
            if (useCapture) {
                this._listenerData2[type] = listener;
            }
            else {
                this._listenerData[type] = listener;
            }
        };
        //
        /**
         * 重写事件移除方法，记录所有内部或外部添加的事件，在调用destroy()方法后，将自动移除所有事件侦听
         * @param type
         * @param listener
         * @param useCapture
         *
         */
        __egretProto__.removeEventListener = function (type, listener, thisObj, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            if (this._isDestroy)
                return;
            _super.prototype.removeEventListener.call(this, type, listener, thisObj, useCapture);
            //缓存机制，不删除key，否则频繁调用addEventListener()和removeEventListener()将大量分配内存
            //			if(useCapture){
            //				delete _listenerData2[type];
            //			}else{
            //				delete _listenerData[type];
            //			}
        };
        //
        /**
         * 销毁对象，将删除所有事件侦听(包括非组件内部调用addEventListener注册的事件侦听)及变量引用并从显示列表删除，无法重新使用，释放内存资源
         */
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            egret.DisplayObjectUtil.destroyChildren(this, false);
            if (this.parent)
                this.parent.removeChild(this);
            for (var p in this._listenerData) {
                this.removeEventListener(p, this._listenerData[p], this, false);
            }
            for (p in this._listenerData2) {
                this.removeEventListener(p, this._listenerData2[p], this, true);
            }
            this._listenerData = null;
            this._listenerData2 = null;
            this._isDestroy = true;
        };
        return CoreSprite;
    })(egret.Sprite);
    egret.CoreSprite = CoreSprite;
    CoreSprite.prototype.__class__ = "egret.CoreSprite";
})(egret || (egret = {}));
//# sourceMappingURL=CoreSprite.js.map