var egret;
(function (egret) {
    var ButtonWindow = (function (_super) {
        __extends(ButtonWindow, _super);
        function ButtonWindow() {
            _super.call(this, egret.ApplicationLayerType.UI);
        }
        var __egretProto__ = ButtonWindow.prototype;
        /**
         * 窗口打开时自动调用的初始化 方法
         *
         */
        __egretProto__.initWindow = function () {
            var labels = ["攻打下个副本", "攻打Boss", "进入竞技场", "战士换装"]; //
            for (var i in labels) {
                var textField = new egret.TextField();
                textField.y = 30 + i * 50;
                textField.name = i;
                textField.text = labels[i];
                //textField.size = 20;
                textField.touchEnabled = true;
                textField.cacheAsBitmap = true;
                //textField.background = true;
                //textField.
                this.addChild(textField);
            }
            this.align = egret.AlignType.TOP_RIGHT;
            this.recall();
        };
        __egretProto__.touchTapHandler = function (e) {
            var index = Number(e.target.name);
            switch (index) {
                case 0:
                    egret.globalUpdateWindows([egret.UpdateType.CHANGE_COPY]);
                    break;
                case 1:
                    egret.dataManager().sceneData.sceneType = egret.SceneType.BOSS_COPY;
                    egret.globalUpdateWindows([egret.UpdateType.CHANGE_COPY]);
                    break;
                case 2:
                case 3:
                    if (egret.RoleManager.getInstance().roles.length < 4) {
                        egret.RoleManager.getInstance().addRole(index);
                    }
                    break;
                case 4:
                    egret.dataManager().sceneData.sceneType = egret.SceneType.ARENA;
                    egret.globalUpdateWindows([egret.UpdateType.CHANGE_COPY]);
                    break;
                case 5:
                    var item = egret.dataManager().roleSceneData.getRoleList()[0];
                    var level = item.vo.wingLevel + 1;
                    if (level > 2) {
                        level = 1;
                    }
                    egret.dataManager().sceneData.updateSceneElementVo(item, ["wingLevel"], [level]);
                    egret.RoleManager.getInstance().updateAvatar(item.vo.id);
                    break;
                case 6:
                    egret.RoleManager.getInstance().role.levelUpEffect();
                    break;
            }
        };
        /**
         * 窗口已实例化，重新打开时，通常用于添加事件，重置显示等
         *
         */
        __egretProto__.recall = function () {
            _super.prototype.recall.call(this);
        };
        /**
         * 添加窗口事件，此方法只在recall()中自动调用，其它地方无调用，需要时手动调用
         *
         */
        __egretProto__.addEvents = function () {
            _super.prototype.addEvents.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchTapHandler, this);
        };
        /**
         * 全局更新时调用，此方法重写时，不用调用super.globalUpdate()
         * @param updateType:int 更新类型
         * @param args
         * @see #ApplicationManager.globalUpdate()
         *
         */
        __egretProto__.globalUpdate = function (updateType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
        };
        /**
         * 自身更新时调用，此方法重写时，不用调用super.update()
         * @param args
         * @see #ApplicationManager.update()
         */
        __egretProto__.update = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
        };
        /**
         * 窗口移除时，主要用于清除事件等
         *
         */
        __egretProto__.remove = function () {
            _super.prototype.remove.call(this);
        };
        /**
         * 销毁处理
         */
        __egretProto__.destroy = function () {
            if (this._isDestroy)
                return;
            _super.prototype.destroy.call(this);
        };
        return ButtonWindow;
    })(egret.Window);
    egret.ButtonWindow = ButtonWindow;
    ButtonWindow.prototype.__class__ = "egret.ButtonWindow";
})(egret || (egret = {}));
//# sourceMappingURL=ButtonWindow.js.map