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
    var BagIManager = (function (_super) {
        __extends(BagIManager, _super);
        function BagIManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        BagIManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new BagIManager();
                self._instance.initBagDatas();
            }
            return self._instance;
        };
        BagIManager.prototype.initBagDatas = function () {
            var i = 0;
            this._goods = [];
            for (i = 0; i < 70; i++) {
                if (i < 8) {
                    this._goods.push(i + 1);
                }
                else if (i < 20) {
                    this._goods.push(0);
                }
                else {
                    this._goods.push(-1);
                }
            }
            this._results = [];
            for (i = 0; i < 6; i++) {
                this._results.push(10001 + i);
            }
        };
        Object.defineProperty(BagIManager.prototype, "goods", {
            get: function () {
                return this._goods;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BagIManager.prototype, "results", {
            get: function () {
                return this._results;
            },
            enumerable: true,
            configurable: true
        });
        return BagIManager;
    }(DLG.BaseAction));
    game.BagIManager = BagIManager;
    __reflect(BagIManager.prototype, "game.BagIManager");
})(game || (game = {}));
//# sourceMappingURL=BagIManager.js.map