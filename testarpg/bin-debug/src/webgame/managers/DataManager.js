var egret;
(function (egret) {
    /**
     * 数据层
     */
    var DataManager = (function () {
        function DataManager() {
            this.pathData = egret.PathData.getInstance();
            this.sceneElementData = egret.SceneElementData.getInstance();
            //因此类在基础数据未加载完成时有使用，所有数据类，不能在构造函数中使用基础数据，请使用init()方法初始化数据层
            this.userData = new egret.UserData();
            //场景
            this.sceneData = new egret.SceneData();
            //战斗
            this.fightData = new egret.FightData();
            //多角色数据
            this.roleSceneData = new egret.RoleSceneData();
        }
        var __egretProto__ = DataManager.prototype;
        //
        DataManager.getInstance = function () {
            return DataManager._instance || (DataManager._instance = new egret.DataManager());
        };
        //
        /**
         * 初始化数据
         */
        __egretProto__.init = function () {
        };
        return DataManager;
    })();
    egret.DataManager = DataManager;
    DataManager.prototype.__class__ = "egret.DataManager";
})(egret || (egret = {}));
//# sourceMappingURL=DataManager.js.map