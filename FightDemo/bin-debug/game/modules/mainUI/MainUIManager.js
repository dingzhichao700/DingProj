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
    var MainUIManager = (function (_super) {
        __extends(MainUIManager, _super);
        function MainUIManager() {
            var _this = _super.call(this) || this;
            _this._selectTabId = 0;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        MainUIManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new MainUIManager();
            }
            return self._instance;
        };
        Object.defineProperty(MainUIManager.prototype, "selectTabId", {
            set: function (value) {
                var self = this;
                self._selectTabId = value;
                self.m_panelMar.show(self._selectTabId);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MainUIManager.prototype, "sceneId", {
            get: function () {
                return this._sceneId;
            },
            set: function (id) {
                this._sceneId = id;
                var mainUI = DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_MainUiPanel);
                mainUI.onRefresh();
            },
            enumerable: true,
            configurable: true
        });
        return MainUIManager;
    }(DLG.BaseAction));
    game.MainUIManager = MainUIManager;
    __reflect(MainUIManager.prototype, "game.MainUIManager");
})(game || (game = {}));
//# sourceMappingURL=MainUIManager.js.map