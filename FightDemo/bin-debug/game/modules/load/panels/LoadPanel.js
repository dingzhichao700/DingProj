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
    var LoadPanel = (function (_super) {
        __extends(LoadPanel, _super);
        function LoadPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        LoadPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new LoadView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        LoadPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.onResizeHandler();
            var stage = DLG.DLGCore.stage;
            stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
        };
        LoadPanel.prototype.onResizeHandler = function () {
            // var contentH: number = ApplicationManager.CONTENT_H;
            // var windowH: number = document.documentElement.clientHeight;
            // // var globalScale: number = ApplicationManager.globalScale;
            // // this.main.top_box.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            // // this.main.bottom_box.y = -(windowH + contentH * globalScale) / (2 * globalScale);
            // var contentW: number = ApplicationManager.CONTENT_W;
            // var contentH: number = ApplicationManager.CONTENT_H;
            // var windowW: number = document.documentElement.clientWidth;
            // var windowH: number = document.documentElement.clientHeight;
            // var ratioContent: number = contentH / contentW;
            // var ratioWindow: number = windowH / windowW;
            // var scale: number;
            // if (ratioWindow >= ratioContent) {
            // 	scale = windowW / contentW;
            // } else {
            // 	scale = windowH / contentH;
            // }
            // // ApplicationManager.globalScale = scale;
            // // if (ApplicationManager.topStage) {
            // // 	ApplicationManager.topStage.scaleX = ApplicationManager.topStage.scaleY = scale;
            // // 	ApplicationManager.topStage.x = (windowW - contentW * scale) / 2;
            // // 	ApplicationManager.topStage.y = (windowH - contentH * scale) / 2;
            // // }
        };
        LoadPanel.prototype.startLoad = function (type, loadCompeltedFun, loadCompeltedObj) {
            var self = this;
            self._type = type;
            self.main.loginBg.source = self._type == 0 ? "loginBg_jpg" : "loginBg1_jpg";
            self.main.loginBg1.visible = type == 0;
            self.main.loginBg2.visible = type == 0;
            self._loadCompeltedFun = loadCompeltedFun;
            self._loadCompeltedObj = loadCompeltedObj;
            self._curTime = egret.getTimer();
            self._maxTime = 1500;
            var stage = DLG.DLGCore.stage;
            stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        };
        LoadPanel.prototype.loop = function () {
            var self = this;
            var passTime = egret.getTimer() - self._curTime;
            self.main.bar.updateView(passTime, self._maxTime, false, 0);
            if (self._maxTime - passTime <= 0) {
                if (self._loadCompeltedFun) {
                    self._loadCompeltedFun.call(self._loadCompeltedObj);
                }
                DLG.DLGCore.panel.close(game.PanelClassConfig.ID_LoadPanel);
            }
        };
        LoadPanel.prototype.onDestroy = function () {
            var stage = DLG.DLGCore.stage;
            stage.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
            stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
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
        return LoadPanel;
    }(DLG.VPanel));
    game.LoadPanel = LoadPanel;
    __reflect(LoadPanel.prototype, "game.LoadPanel");
})(game || (game = {}));
//# sourceMappingURL=LoadPanel.js.map