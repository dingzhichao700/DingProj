var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var AttrData = (function () {
        function AttrData() {
            this.attr_dic = new Object();
        }
        AttrData.prototype.setValue = function (key, value) {
            this.attr_dic[key + ''] = value;
        };
        AttrData.prototype.getValue = function (key) {
            var self = this;
            if (self.attr_dic.hasOwnProperty(key + '')) {
                return self.attr_dic[key + ''];
            }
            return 0;
        };
        AttrData.prototype.clear = function () {
            var self = this;
            self.attr_dic = null;
        };
        AttrData.prototype.clone = function (attr) {
            var self = this;
            attr.setValue(game.Enum_Attr.hp, self.getValue(game.Enum_Attr.hp));
            attr.setValue(game.Enum_Attr.totalHp, self.getValue(game.Enum_Attr.totalHp));
            attr.setValue(game.Enum_Attr.speed, self.getValue(game.Enum_Attr.speed));
            attr.setValue(game.Enum_Attr.def, self.getValue(game.Enum_Attr.def));
            attr.setValue(game.Enum_Attr.magicdefense, self.getValue(game.Enum_Attr.magicdefense));
            attr.setValue(game.Enum_Attr.attack, self.getValue(game.Enum_Attr.attack));
            attr.setValue(game.Enum_Attr.crit, self.getValue(game.Enum_Attr.crit));
            attr.setValue(game.Enum_Attr.critDamage, self.getValue(game.Enum_Attr.critDamage));
            attr.setValue(game.Enum_Attr.tenacity, self.getValue(game.Enum_Attr.tenacity));
            attr.setValue(game.Enum_Attr.physics_puncture, self.getValue(game.Enum_Attr.physics_puncture));
            attr.setValue(game.Enum_Attr.magic_puncture, self.getValue(game.Enum_Attr.magic_puncture));
            attr.setValue(game.Enum_Attr.physics_HurtImmune, self.getValue(game.Enum_Attr.physics_HurtImmune));
            attr.setValue(game.Enum_Attr.magic_HurtImmune, self.getValue(game.Enum_Attr.magic_HurtImmune));
            attr.setValue(game.Enum_Attr.hit, self.getValue(game.Enum_Attr.hit));
            attr.setValue(game.Enum_Attr.resistcrit, self.getValue(game.Enum_Attr.resistcrit));
            attr.setValue(game.Enum_Attr.resistdamage, self.getValue(game.Enum_Attr.resistdamage));
        };
        return AttrData;
    }());
    game.AttrData = AttrData;
    __reflect(AttrData.prototype, "game.AttrData");
})(game || (game = {}));
//# sourceMappingURL=AttrData.js.map