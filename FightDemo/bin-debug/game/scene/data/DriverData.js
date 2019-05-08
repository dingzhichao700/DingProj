var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var DriverData = (function () {
        function DriverData() {
        }
        DriverData.prototype.clearBuff = function () {
            var self = this;
            if (self.buffs) {
                var i = 0;
                var len = self.buffs.length;
                for (i = 0; i < len; i++) {
                    var buffs = self.buffs[i];
                    while (buffs.length > 0) {
                        game.BuffData.returnBuffData(buffs.shift());
                    }
                }
            }
            if (self.buffsAttr) {
                self.buffsAttr.clear();
            }
        };
        DriverData.prototype.clear = function () {
            var self = this;
            self.x = undefined;
            self.y = undefined;
            self.id = undefined;
            self.name = undefined;
            self.movieName = undefined;
            if (self.skills && self.skills.length > 0) {
                self.skills.length = 0;
            }
            self.skills = undefined;
            // self.lastUseSkill = undefined;
            if (self.attr) {
                self.attr.clear();
                self.attr = undefined;
            }
            self.clearBuff();
            if (self.buffs) {
                self.buffs = undefined;
            }
            if (self.buffsAttr) {
                self.buffsAttr.clear();
                self.buffsAttr = undefined;
            }
        };
        return DriverData;
    }());
    game.DriverData = DriverData;
    __reflect(DriverData.prototype, "game.DriverData", ["game.IDriverData"]);
})(game || (game = {}));
//# sourceMappingURL=DriverData.js.map