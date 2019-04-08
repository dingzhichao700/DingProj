var egret;
(function (egret) {
    /**
     * 飘血动画管理
     */
    var HPTweenManager = (function () {
        function HPTweenManager() {
            //文本数量计数
            this._count = 0;
            this._textFields = [];
            this._params = [];
            this._objects = [];
            this._cacheData = {};
        }
        var __egretProto__ = HPTweenManager.prototype;
        //
        HPTweenManager.getInstance = function () {
            return this._instance || (this._instance = new egret.HPTweenManager());
        };
        //
        /**
         * 飘血动画
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radian 飘出弧度
         * @param radius 飘出半径
         * @param text 伤害文本值
         * @param color 文本颜色
         * @param size 文本大小
         */
        __egretProto__.tween = function (container, x, y, radian, radius, text, color, size) {
            if (color === void 0) { color = 0xffff00; }
            if (size === void 0) { size = 20; }
            this._count++;
            var frameIndex = this._count % 10 + 1;
            var params = this._params.pop();
            if (!params) {
                params = [];
            }
            params.length = 0;
            for (var i in arguments) {
                params[i] = arguments[i];
            }
            params[params.length] = this._count;
            this._cacheData[this._count] = params;
            //按帧分开播放，提高性能
            egret.EnterFrameManager.getInstance().addExecute(this.tweenExecute, this, frameIndex, params, 1);
        };
        //
        /**
         * 飘血动画
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radian 飘出弧度
         * @param radius 飘出半径
         * @param text 伤害文本值
         * @param color 文本颜色
         * @param size 文本大小
         * @param cacheId 回收数组参数id
         */
        __egretProto__.tweenExecute = function (container, x, y, radian, radius, text, color, size, cacheId) {
            if (color === void 0) { color = 0xffff00; }
            if (size === void 0) { size = 20; }
            if (cacheId === void 0) { cacheId = 0; }
            this._count++;
            var textField = this.getTextField(x, y, text, color, size);
            container.addChild(textField);
            var tx = Math.cos(radian) * radius + (x - textField.width / 2);
            var ty = Math.sin(radian) * radius + y;
            var params = this._params.pop();
            if (!params) {
                params = [];
            }
            params.length = 0;
            params[0] = textField;
            params[1] = cacheId;
            params[2] = this._count;
            this._cacheData[this._count] = params;
            var toParam = this._objects.pop();
            if (!toParam) {
                toParam = {};
            }
            toParam.x = tx;
            toParam.y = ty;
            params[3] = toParam;
            egret.Tween.get(textField).to(toParam, 1000, egret.Ease.circInOut).call(this.randomDirComplete, this, params);
        };
        //
        /**
         * 飘血动画结束，回收文本对象
         * @param textField 文本对象
         * @param cacheId 回收数组参数id
         * @param cacheId2  回收数组参数id
         * @param toParam 回收缓存数据对象
         */
        __egretProto__.randomDirComplete = function (textField, cacheId, cacheId2, toParam) {
            if (textField.parent)
                textField.parent.removeChild(textField);
            this._textFields.push(textField);
            this._objects.push(toParam);
            if (cacheId > 0) {
                this._params.push(this._cacheData[cacheId]);
                delete this._cacheData[cacheId];
            }
            if (cacheId2 > 0) {
                this._params.push(this._cacheData[cacheId2]);
                delete this._cacheData[cacheId2];
            }
        };
        //
        /**
         * 直线动画，向上或向下运动
         * @param container 文本容器
         * @param x 文本x
         * @param y 文本y
         * @param radius 飘出半径
         * @param text 文本值
         * @param color 文本颜色
         * @param size 文本大小
         */
        __egretProto__.tweenLine = function (container, x, y, radius, text, color, size) {
            if (color === void 0) { color = 0xffff00; }
            if (size === void 0) { size = 20; }
            this._count++;
            var textField = this.getTextField(x, y, text, color, size);
            container.addChild(textField);
            var tx = x - textField.width / 2;
            ;
            var ty = radius + y;
            var params = this._params.pop();
            if (!params) {
                params = [];
            }
            params.length = 0;
            params[0] = textField;
            params[1] = this._count;
            params[2] = 0;
            this._cacheData[this._count] = params;
            var toParam = this._objects.pop();
            if (!toParam) {
                toParam = {};
            }
            toParam.x = tx;
            toParam.y = ty;
            params[3] = toParam;
            egret.Tween.get(textField).to(toParam, 1000).call(this.randomDirComplete, this, params);
        };
        //
        /**
         * 获取文本对象
         * @param x 文本x
         * @param y 文本y
         * @param text 文本值
         * @param color 文本颜色
         * @param size 文本大小
         * @returns {TextField}
         */
        __egretProto__.getTextField = function (x, y, text, color, size) {
            if (color === void 0) { color = 0xffff00; }
            if (size === void 0) { size = 20; }
            var textField = this._textFields.pop();
            if (!textField)
                textField = new egret.TextField();
            textField.text = text;
            textField.height = size;
            textField.width = 200;
            textField.textAlign = egret.HorizontalAlign.CENTER;
            textField.textColor = color;
            textField.x = x - textField.width / 2;
            textField.y = y;
            return textField;
        };
        return HPTweenManager;
    })();
    egret.HPTweenManager = HPTweenManager;
    HPTweenManager.prototype.__class__ = "egret.HPTweenManager";
})(egret || (egret = {}));
//# sourceMappingURL=HPTweenManager.js.map