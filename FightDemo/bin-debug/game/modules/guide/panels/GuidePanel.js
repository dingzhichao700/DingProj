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
    var GuidePanel = (function (_super) {
        __extends(GuidePanel, _super);
        function GuidePanel(panelId, fromPanelid) {
            var _this = _super.call(this, panelId) || this;
            _this._plus = 1;
            return _this;
        }
        GuidePanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new GuideView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        GuidePanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.main.icon_img.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            self._plus = 1;
            // self.main.icon_img.source = 
            // self.main.arrow_img.source = 
            self.addTween();
            this.onResizeHandler();
            var stage = DLG.DLGCore.stage;
            stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
        };
        GuidePanel.prototype.onResizeHandler = function () {
            var contentH = ApplicationManager.CONTENT_H;
            var windowH = document.documentElement.clientHeight;
            var globalScale = ApplicationManager.globalScale;
            this.main.content_box.y = (windowH + contentH * globalScale) / (2 * globalScale) - 147;
        };
        GuidePanel.prototype.clickItemHandler = function () {
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_MissionPanel);
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_GuidePanel);
        };
        GuidePanel.prototype.addTween = function () {
            var self = this;
            var py = self.main.arrow_img.y;
            self._plus *= -1;
            var targetY = py + self._plus * 40;
            egret.Tween.get(self.main.arrow_img).to({ y: targetY }, 500).call(self.addTween, self);
        };
        GuidePanel.prototype.onDestroy = function () {
            var stage = DLG.DLGCore.stage;
            stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
            egret.Tween.removeTweens(this.main.arrow_img);
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return GuidePanel;
    }(DLG.VPanel));
    game.GuidePanel = GuidePanel;
    __reflect(GuidePanel.prototype, "game.GuidePanel");
})(game || (game = {}));
//# sourceMappingURL=GuidePanel.js.map