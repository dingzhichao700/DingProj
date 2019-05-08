var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var SceneWindow = (function (_super) {
        __extends(SceneWindow, _super);
        function SceneWindow() {
            var _this = _super.call(this) || this;
            var self = _this;
            self._map = new game.SceneMapLayer();
            self.addChild(self._map);
            self._driverLayer = new game.DriverRenderLayer();
            self.addChild(self._driverLayer);
            self._effectLayer = new egret.Sprite();
            self.addChild(self._effectLayer);
            game.SceneManager.getInstance().initLayer(self._driverLayer, self._map, self._effectLayer);
            game.MovieRenderManager.getInstance();
            // SceneManager.getInstance().changeMap(1001);
            // let stage: egret.Stage = DLG.DLGCore.stage;
            // stage.addChildAt(self, 0);
            ApplicationManager.topStage.addChildAt(self, 0);
            return _this;
        }
        return SceneWindow;
    }(egret.Sprite));
    game.SceneWindow = SceneWindow;
    __reflect(SceneWindow.prototype, "game.SceneWindow");
})(game || (game = {}));
//# sourceMappingURL=SceneWindow.js.map