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
    var HpBar = (function (_super) {
        __extends(HpBar, _super);
        function HpBar() {
            return _super.call(this) || this;
        }
        HpBar.prototype.showStyle = function (_style) {
            if (_style === void 0) { _style = 1; }
            var self = this;
            if (_style == 1) {
                self._barBg = new egret.Bitmap(RES.getRes('Main_json.Main_HP_Bg_png'));
                self._bar = new egret.Bitmap(RES.getRes('Main_json.Main_HP_Red_png'));
                self.addChild(self._barBg);
                self.addChild(self._bar);
                self._barBg.x = -self._barBg.width / 2;
                self._bar.x = self._barBg.x + 1;
                self._barWidth = self._barBg.width - 2;
            }
        };
        HpBar.prototype.setValue = function (value, max) {
            var self = this;
            self._bar.width = Math.floor(value / max * self._barWidth);
        };
        return HpBar;
    }(egret.Sprite));
    game.HpBar = HpBar;
    __reflect(HpBar.prototype, "game.HpBar");
})(game || (game = {}));
//# sourceMappingURL=HpBar.js.map