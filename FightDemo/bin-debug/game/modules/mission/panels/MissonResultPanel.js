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
    var MissonResultPanel = (function (_super) {
        __extends(MissonResultPanel, _super);
        function MissonResultPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        MissonResultPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new MissionResultView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        MissonResultPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            self.main.close_btn.setLabel("");
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = 35;
            tLayout.verticalGap = 25;
            tLayout.requestedColumnCount = 3;
            self.main.list.layout = tLayout;
            self.main.list.itemRenderer = game.BagItem;
            self.main.list.dataProvider = new eui.ArrayCollection(game.BagIManager.getInstance().results);
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_WelcomePanel);
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_GuidePanel);
        };
        MissonResultPanel.prototype.initDefaultPanel = function () {
        };
        MissonResultPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
            var nextId = game.MissonIManager.getInstance().getNextMission(game.MainUIManager.getInstance().sceneId);
            game.SceneManager.getInstance().changeMap(nextId, true);
        };
        MissonResultPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return MissonResultPanel;
    }(DLG.VPanel));
    game.MissonResultPanel = MissonResultPanel;
    __reflect(MissonResultPanel.prototype, "game.MissonResultPanel");
})(game || (game = {}));
//# sourceMappingURL=MissonResultPanel.js.map