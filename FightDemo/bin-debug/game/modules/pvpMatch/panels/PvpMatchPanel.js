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
    var PvpMatchPanel = (function (_super) {
        __extends(PvpMatchPanel, _super);
        function PvpMatchPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        PvpMatchPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new PvpMatchView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        PvpMatchPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            self.main.vip_btn.setLabel("");
            self.main.vip_btn.setScaleClick(true);
            self.main.vip_btn.setOnClickListener(self, self.vipHandler);
            self.updateView();
        };
        PvpMatchPanel.prototype.initDefaultPanel = function () {
            var self = this;
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.back_btn.setScaleClick(true);
            self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.tipLab.setLabel("每日5点结算奖励");
        };
        PvpMatchPanel.prototype.updateView = function () {
            var self = this;
            var info = game.PvpMatchManager.getInstance().pvpMsgInfo;
            self.main.initview(self.addHandler, self);
            self.main.headItem1.updateView(info.atkInfo);
            self.main.headItem2.updateView(info.defInfo);
            self.main.bar.updateView(info.curPro, info.maxPro);
            self.main.pvp_match_lab.text = "赛季场次：" + info.matchTimes;
            self.main.pvp_winTimes.text = "赛季胜场：" + info.winTimes;
            self.main.pvp_resTimes.text = "剩余次数：" + info.resTimes;
            self.main.addCom.updateView(info.resTimes, info.maxTimes);
        };
        PvpMatchPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
        };
        PvpMatchPanel.prototype.addHandler = function (e) {
            var info = game.PvpMatchManager.getInstance().pvpMsgInfo;
            info.resTimes += 1;
            info.resTimes = Math.min(info.resTimes, info.maxTimes);
            this.main.addCom.updateView(info.resTimes, info.maxTimes);
        };
        PvpMatchPanel.prototype.vipHandler = function (e) {
            game.MissonIManager.getInstance().enterMission(100020);
        };
        PvpMatchPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return PvpMatchPanel;
    }(DLG.VPanel));
    game.PvpMatchPanel = PvpMatchPanel;
    __reflect(PvpMatchPanel.prototype, "game.PvpMatchPanel");
})(game || (game = {}));
//# sourceMappingURL=PvpMatchPanel.js.map