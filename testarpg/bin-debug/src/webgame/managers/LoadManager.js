var egret;
(function (egret) {
    var LoadManager = (function () {
        function LoadManager() {
            this.loadList = null;
            this.loadIndex = 0;
        }
        var __egretProto__ = LoadManager.prototype;
        LoadManager.getInstance = function () {
            return LoadManager._instance || (LoadManager._instance = new LoadManager());
        };
        __egretProto__.loadResList = function (groupList, handler) {
            this.loadList = groupList;
            this.loadIndex = 0;
            this._handler = handler;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(this.loadList[0]);
        };
        /**资源组加载完成*/
        __egretProto__.onResourceLoadComplete = function (event) {
            if (this.loadIndex < this.loadList.length - 1) {
                this.loadIndex++;
                RES.loadGroup(this.loadList[this.loadIndex]);
            }
            else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                this._handler();
            }
        };
        /**资源组加载出错*/
        __egretProto__.onResourceLoadError = function (event) {
            console.warn("Group:" + event.groupName + " 中有加载失败的项目");
            this.onResourceLoadComplete(event);
        };
        /**preload资源组加载进度*/
        __egretProto__.onResourceProgress = function (event) {
            if (event.groupName == "main") {
            }
            console.info("--------------onResourceProgress***********321----------------------");
        };
        LoadManager._instance = null;
        return LoadManager;
    })();
    egret.LoadManager = LoadManager;
    LoadManager.prototype.__class__ = "egret.LoadManager";
})(egret || (egret = {}));
//# sourceMappingURL=LoadManager.js.map