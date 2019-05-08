var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AddItem = (function () {
    function AddItem(main, onLoadCallBack, onLoadCallTarget) {
        this._main = main;
        this._onLoadCallBack = onLoadCallBack;
        this._onLoadCallTarget = onLoadCallTarget;
        this._bgImg = this._main["bg_img"];
        this._labTxt = this._main["lab_txt"];
        this._btn = this._main["add_btn"];
        this._btn.setScaleClick(true);
        this._btn.setOnClickListener(this, this.clickHandler);
    }
    AddItem.prototype.updateView = function (cur, max) {
        this._labTxt.text = cur + "/" + max;
    };
    AddItem.prototype.clickHandler = function () {
        if (this._onLoadCallBack) {
            this._onLoadCallBack.call(this._onLoadCallTarget);
        }
    };
    Object.defineProperty(AddItem.prototype, "Width", {
        set: function (v) {
            this._w = v;
            this._main.width = this._w;
            this._bgImg.width = v;
            this._labTxt.width = v - this._btn.width;
            this._btn.x = this._labTxt.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddItem.prototype, "Height", {
        set: function (v) {
            this._h = v;
            this._main.height = v;
            this._bgImg.height = v;
            this._labTxt.y = (v - this._labTxt.height) / 2;
            this._btn.y = (v - this._btn.height) / 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddItem.prototype, "btnSkin", {
        set: function (str) {
            this._btn["img"].source = str;
        },
        enumerable: true,
        configurable: true
    });
    return AddItem;
}());
__reflect(AddItem.prototype, "AddItem");
//# sourceMappingURL=AddItem.js.map