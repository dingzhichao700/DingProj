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
    var WelcomPanel = (function (_super) {
        __extends(WelcomPanel, _super);
        function WelcomPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        WelcomPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new WelcomView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        WelcomPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            // this.main.welcom_img.source
            this.main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        WelcomPanel.prototype.clickHandler = function () {
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_WelcomePanel);
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_GuidePanel);
        };
        WelcomPanel.prototype.onDestroy = function () {
            this.main.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            _super.prototype.onDestroy.call(this);
            var self = this;
            self._loadCompeltedFun = null;
            self._loadCompeltedObj = null;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return WelcomPanel;
    }(DLG.VPanel));
    game.WelcomPanel = WelcomPanel;
    __reflect(WelcomPanel.prototype, "game.WelcomPanel");
})(game || (game = {}));
//# sourceMappingURL=WelcomPanel.js.map