var egret;
(function (egret) {
    /**
     * 游戏启动器，因egret的Main类为外部类，所以使用启动器，使游戏逻辑回到egret包中
     */
    var GameRunner = (function (_super) {
        __extends(GameRunner, _super);
        function GameRunner() {
            _super.call(this);
            egret.Profiler.getInstance().run();
            this.loadRes();
        }
        var __egretProto__ = GameRunner.prototype;
        __egretProto__.loadRes = function () {
            var arr = ["main", "equip", "wuhun", "clip", "soulRoad"];
            egret.LoadManager.getInstance().loadResList(arr, this.startGame);
        };
        __egretProto__.startGame = function () {
            egret.SceneManager.getInstance().enterScene(egret.SceneType.NORMAL_COPY, 1001);
            egret.SceneManager.getInstance().scene.nextTurn();
            var effect = egret.SceneElementManager.getInstance().getElement(egret.ElementEffect);
            effect.setIsCheckResource(false);
            effect.x = 200;
            effect.y = 200;
            effect.setMovieName(egret.MovieName.EFFECT_01);
            effect.addToScene();
        };
        return GameRunner;
    })(egret.ApplicationRunner);
    egret.GameRunner = GameRunner;
    GameRunner.prototype.__class__ = "egret.GameRunner";
})(egret || (egret = {}));
