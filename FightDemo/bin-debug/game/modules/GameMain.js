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
    var PanelLayer;
    (function (PanelLayer) {
        PanelLayer[PanelLayer["LOADING"] = 6] = "LOADING";
        PanelLayer[PanelLayer["GUIDE"] = 5] = "GUIDE";
        PanelLayer[PanelLayer["Dialog"] = 4] = "Dialog";
        PanelLayer[PanelLayer["TOP"] = 3] = "TOP";
        PanelLayer[PanelLayer["CENTER"] = 2] = "CENTER";
        PanelLayer[PanelLayer["BOTTOM"] = 1] = "BOTTOM";
        PanelLayer[PanelLayer["MAIN_UI"] = 0] = "MAIN_UI";
    })(PanelLayer = game.PanelLayer || (game.PanelLayer = {}));
    var GameMain = (function (_super) {
        __extends(GameMain, _super);
        function GameMain() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.tipsLayer = new DLG.CGroup;
            self.panelLayer = new DLG.CGroup;
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.panelLayer.addChild(new DLG.CGroup);
            self.addChild(self.panelLayer);
            self.addChild(self.tipsLayer);
            _this.initData();
            return _this;
        }
        GameMain.prototype.initData = function () {
            var cfg = new DLG.Table();
            cfg.setData(game.PanelClassConfig.getCfg());
            DLG.DLGCore.panel.init(this.panelLayer, cfg, game);
        };
        return GameMain;
    }(egret.Sprite));
    game.GameMain = GameMain;
    __reflect(GameMain.prototype, "game.GameMain");
})(game || (game = {}));
//# sourceMappingURL=GameMain.js.map