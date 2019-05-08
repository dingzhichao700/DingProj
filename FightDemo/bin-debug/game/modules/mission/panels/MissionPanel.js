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
    var MissionPanel = (function (_super) {
        __extends(MissionPanel, _super);
        function MissionPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        MissionPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new MissionView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        MissionPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            self.main.vip_btn.setLabel("");
            self.main.vip_btn.setScaleClick(true);
            self.main.vip_btn.setOnClickListener(self, self.vipHandler);
            var tLayout = new eui.TileLayout();
            tLayout.verticalGap = -5;
            tLayout.requestedColumnCount = 1;
            self.main.list.layout = tLayout;
            self.main.list.itemRenderer = game.MissionItem;
            self.updateView();
        };
        MissionPanel.prototype.initDefaultPanel = function () {
            var self = this;
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.back_btn.setScaleClick(true);
            self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.tipLab.setLabel("目前挑战1000年及以上的魂兽，伤害前三名发放宗门宝箱");
        };
        MissionPanel.prototype.updateView = function () {
            var self = this;
            self.main.initview(self.addHandler, self);
            self.main.addCom.updateView(game.MissonIManager.getInstance().curTimes, game.MissonIManager.getInstance().maxTimes);
            self.main.list.dataProvider = new eui.ArrayCollection(game.MissonIManager.getInstance().mission);
        };
        MissionPanel.prototype.vipHandler = function (e) {
        };
        MissionPanel.prototype.addHandler = function (e) {
            game.MissonIManager.getInstance().curTimes = Math.min(game.MissonIManager.getInstance().curTimes + 1, game.MissonIManager.getInstance().maxTimes);
            var self = this;
            self.main.addCom.updateView(game.MissonIManager.getInstance().curTimes, game.MissonIManager.getInstance().maxTimes);
        };
        MissionPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
        };
        MissionPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return MissionPanel;
    }(DLG.VPanel));
    game.MissionPanel = MissionPanel;
    __reflect(MissionPanel.prototype, "game.MissionPanel");
})(game || (game = {}));
//# sourceMappingURL=MissionPanel.js.map