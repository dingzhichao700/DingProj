var egret;
(function (egret) {
    /**
     * 数据管理器
     * @returns {DataManager}
     */
    function dataManager() {
        return egret.DataManager.getInstance();
    }
    egret.dataManager = dataManager;
})(egret || (egret = {}));
//# sourceMappingURL=dataManager.js.map