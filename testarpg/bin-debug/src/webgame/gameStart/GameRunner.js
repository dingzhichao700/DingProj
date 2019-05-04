var egret;
(function (egret) {
    /**
     * 游戏启动器，因egret的Main类为外部类，所以使用启动器，使游戏逻辑回到egret包中
     */
    var GameRunner = (function (_super) {
        __extends(GameRunner, _super);
        function GameRunner() {
            _super.call(this);
            //性能数据显示(fps,draw,cost)
            //            egret.Profiler.getInstance().run();
            this.loadRes();
        }
        var __egretProto__ = GameRunner.prototype;
        __egretProto__.loadRes = function () {
            var arr = ["main", "equip", "wuhun", "clip", "soulRoad", "skill"];
            egret.LoadManager.getInstance().loadResList(arr, this.startGame);
        };
        __egretProto__.startGame = function () {
            egret.ApplicationManager.getInstance().initLayer();
            egret.MainControl.getInstance().openLogin();
        };
        return GameRunner;
    })(egret.ApplicationRunner);
    egret.GameRunner = GameRunner;
    GameRunner.prototype.__class__ = "egret.GameRunner";
})(egret || (egret = {}));
//# sourceMappingURL=GameRunner.js.map