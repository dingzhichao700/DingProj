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
    var WeaponManager = (function (_super) {
        __extends(WeaponManager, _super);
        function WeaponManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createSocket();
            self.createPanelMar();
            return _this;
        }
        WeaponManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new WeaponManager();
                self._instance.initBagDatas();
            }
            return self._instance;
        };
        WeaponManager.prototype.initBagDatas = function () {
            this._weaponArr = [];
            var info = new WeaponInfo();
            info.name = "袖箭";
            info.weaponId = 1;
            info.isNew = true;
            info.activity = true;
            info.attrHp = 1000;
            info.attrAtk = 300;
            info.attrDef = 280;
            info.skillId = 12008;
            this._weaponArr.push(info);
            info = new WeaponInfo();
            info.name = "龙须针";
            info.weaponId = 2;
            info.activity = false;
            info.attrHp = 2800;
            info.attrAtk = 440;
            info.attrDef = 400;
            info.skillId = 14003;
            this._weaponArr.push(info);
            info = new WeaponInfo();
            info.name = "诸葛神弩";
            info.weaponId = 3;
            info.activity = false;
            info.attrHp = 3501;
            info.attrAtk = 530;
            info.attrDef = 490;
            info.skillId = 14009;
            this._weaponArr.push(info);
            info = new WeaponInfo();
            info.name = "暴雨梨花针";
            info.weaponId = 4;
            info.activity = true;
            info.attrHp = 3591;
            info.attrAtk = 730;
            info.attrDef = 890;
            info.skillId = 14010;
            this._weaponArr.push(info);
            this._weaponArr.push(null);
        };
        Object.defineProperty(WeaponManager.prototype, "weaponArr", {
            get: function () {
                return this._weaponArr;
            },
            enumerable: true,
            configurable: true
        });
        return WeaponManager;
    }(DLG.BaseAction));
    game.WeaponManager = WeaponManager;
    __reflect(WeaponManager.prototype, "game.WeaponManager");
})(game || (game = {}));
//# sourceMappingURL=WeaponManager.js.map