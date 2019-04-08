var egret;
(function (egret) {
    var SceneManager = (function () {
        function SceneManager() {
            /**当前场景对象*/
            this.scene = null;
            //场景数据
            this._sceneData = null;
            this._sceneData = egret.dataManager().sceneData;
        }
        var __egretProto__ = SceneManager.prototype;
        SceneManager.getInstance = function () {
            return SceneManager._instance || (SceneManager._instance = new SceneManager());
        };
        /**
         * 请求成功后进入场景
         * @param id:Number 场景id
         *
         */
        __egretProto__.enterScene = function (type, id) {
            if (id === void 0) { id = -1; }
            if (this._sceneData.sceneType == type && this._sceneData.sceneId == id) {
                throw new Error("重复进入当前场景, type = " + type + ", id = " + id);
            }
            var cls = null;
            var isClear = true;
            var mapId = 0;
            switch (type) {
                default:
                    cls = egret.SceneWindow;
                    this._sceneData.cityId = id;
                    break;
            }
            this.exitScene(isClear);
            this._sceneData.sceneType = type;
            this._sceneData.sceneId = id;
            id = mapId > 0 ? mapId : id;
            if (!this.scene) {
                this.scene = (egret.openWindow(cls, false));
                this.scene.scaleX = this.scene.scaleY = 1.2;
                this.scene.y = -200;
            }
            this.scene.loadData(id);
        };
        /**
         * 退出场景
         * @param isClear:Boolean = true 是否清理场景数据
         */
        __egretProto__.exitScene = function (isClear) {
            if (isClear === void 0) { isClear = true; }
            this.clearScene(isClear);
            egret.closeWindow(this.scene);
            this.scene = null;
            switch (this._sceneData.sceneType) {
                case egret.SceneType.NORMAL_COPY:
                    break;
            }
        };
        /**
         * 清空场景
         * @param isClear:Boolean = true 是否清理场景数据
         */
        __egretProto__.clearScene = function (isClear) {
            if (isClear === void 0) { isClear = true; }
            if (this.scene)
                this.scene.clearScene();
            switch (this._sceneData.sceneType) {
                case egret.SceneType.NORMAL_COPY:
                    break;
            }
        };
        /**
         * 移动场景元素
         * @param id:String 场景元素id
         * @param x:int 目标x
         * @param y:int 目标y
         *
         */
        __egretProto__.moveElement = function (id, x, y) {
            if (y === void 0) { y = 0; }
            if (!this.scene)
                return;
            this.scene.moveElement(id + "", x, y);
        };
        /**
         * 主角跳转至场景x,y处
         * @param x
         * @param y
         *
         */
        __egretProto__.gotoXY = function (x, y) {
            if (y === void 0) { y = 0; }
            if (!this.scene)
                return;
            this.scene.gotoXY(x, y);
        };
        SceneManager._instance = null;
        return SceneManager;
    })();
    egret.SceneManager = SceneManager;
    SceneManager.prototype.__class__ = "egret.SceneManager";
})(egret || (egret = {}));
//# sourceMappingURL=SceneManager.js.map