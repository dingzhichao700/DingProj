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
    var PvpMatchManager = (function (_super) {
        __extends(PvpMatchManager, _super);
        function PvpMatchManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        PvpMatchManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new PvpMatchManager();
                self._instance.initDatas();
            }
            return self._instance;
        };
        PvpMatchManager.prototype.initDatas = function () {
            this._pvpMsgInfo = new PvpMsgInfo(true);
            this._pvpMsgInfo.atkInfo;
        };
        Object.defineProperty(PvpMatchManager.prototype, "pvpMsgInfo", {
            get: function () {
                return this._pvpMsgInfo;
            },
            enumerable: true,
            configurable: true
        });
        return PvpMatchManager;
    }(DLG.BaseAction));
    game.PvpMatchManager = PvpMatchManager;
    __reflect(PvpMatchManager.prototype, "game.PvpMatchManager");
})(game || (game = {}));
//# sourceMappingURL=PvpMatchManager.js.map