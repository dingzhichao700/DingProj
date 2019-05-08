var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var HurtData = (function () {
        function HurtData() {
        }
        HurtData.prototype.clear = function () {
            var self = this;
            self.hurt = undefined;
            self.luckHurt = undefined;
            self.farHurt = undefined;
            self.shortHurt = undefined;
            self.anShi = undefined;
            self.firstHurt = undefined;
            self.mengDu = undefined;
            self.bigWeaponHurt = undefined;
            self.forceSwoon = undefined;
            self.swoonHurt = undefined;
            self.baoFaHurt = undefined;
            self.isSwoon = undefined;
        };
        HurtData.getHurtData = function () {
            if (HurtData._pool.length > 0) {
                return HurtData._pool.shift();
            }
            var hurt = new HurtData();
            return hurt;
        };
        HurtData.returnHurtData = function (hurt) {
            hurt.clear();
            HurtData._pool.push(hurt);
        };
        return HurtData;
    }());
    HurtData._pool = [];
    game.HurtData = HurtData;
    __reflect(HurtData.prototype, "game.HurtData");
})(game || (game = {}));
//# sourceMappingURL=HurtData.js.map