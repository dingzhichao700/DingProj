var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BarItem = (function () {
    function BarItem(main) {
        this._main = main;
        this._bgImg = this._main["bg_img"];
        this._barImg = this._main["bar_img"];
        this._bar_point = this._main["bar_point"];
        this._labTxt = this._main["lab_txt"];
    }
    BarItem.prototype.updateView = function (cur, max, show, gap) {
        if (show === void 0) { show = true; }
        if (gap === void 0) { gap = 30; }
        cur = Math.min(cur, max);
        this._labTxt.text = show ? (cur + "/" + max) : "";
        this._barImg.width = cur / max * (this._bgImg.width - gap);
        if (this._bar_point) {
            this._bar_point.x = cur / max * this._bgImg.width - 28;
        }
    };
    Object.defineProperty(BarItem.prototype, "bgSkin", {
        set: function (str) {
            this._bgImg.source = str;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BarItem.prototype, "barSkin", {
        set: function (str) {
            this._barImg.source = str;
        },
        enumerable: true,
        configurable: true
    });
    return BarItem;
}());
__reflect(BarItem.prototype, "BarItem");
//# sourceMappingURL=BarItem.js.map