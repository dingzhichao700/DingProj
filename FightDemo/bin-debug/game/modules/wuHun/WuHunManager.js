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
    var WuHunManager = (function (_super) {
        __extends(WuHunManager, _super);
        function WuHunManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        WuHunManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new WuHunManager();
                self._instance.initBagDatas();
            }
            return self._instance;
        };
        WuHunManager.prototype.initBagDatas = function () {
            var i = 0;
            this._roleInfo = [];
            for (i = 0; i < 5; i++) {
                var info = new RoleVo();
                info.lv = i * 4 + 5;
                info.name = "poopy" + i;
                info.modelId = i % 5 + 1;
                info.activity = i % 2 == 0;
                info.wuHunLv = i % 2 + 1;
                info.itemId1 = 10001;
                info.itemId2 = 10002;
                info.itemId3 = 10003;
                info.itemId4 = 10004;
                info.itemId5 = 10005;
                ;
                info.itemId6 = 10006;
                info.open1 = i % 2 == 0;
                info.open2 = i % 3 == 0;
                info.open3 = i % 2 == 0;
                info.open4 = i % 3 == 0;
                info.open5 = i % 2 == 0;
                info.open6 = i % 1 == 0;
                info.score = 100;
                info.attrHp = 1424 + i * 10;
                info.attrAtk = 859 + i * 10;
                info.attrDef = 702 + i * 10;
                info.skillId = 12011 + i;
                this._roleInfo.push(info);
            }
        };
        Object.defineProperty(WuHunManager.prototype, "roleInfo", {
            get: function () {
                return this._roleInfo;
            },
            enumerable: true,
            configurable: true
        });
        return WuHunManager;
    }(DLG.BaseAction));
    game.WuHunManager = WuHunManager;
    __reflect(WuHunManager.prototype, "game.WuHunManager");
})(game || (game = {}));
//# sourceMappingURL=WuHunManager.js.map