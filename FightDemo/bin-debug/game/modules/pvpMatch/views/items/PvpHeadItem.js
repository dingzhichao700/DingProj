var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var PvpHeadItem = (function () {
    function PvpHeadItem(main) {
        this._main = main;
        this.bg_img = this._main["bg_img"];
        this.icon_img = this._main["icon_img"];
        this.label_txt = this._main["label_txt"];
        this.icon_title = this._main["icon_title"];
    }
    PvpHeadItem.prototype.updateView = function (info) {
        this._info = info;
        this.icon_img.source = "pvp_head_" + this._info.sex + "_png";
        this.icon_title.source = "pvp_lv_img_png";
        this.label_txt.text = this._info.name;
    };
    return PvpHeadItem;
}());
__reflect(PvpHeadItem.prototype, "PvpHeadItem");
//# sourceMappingURL=PvpHeadItem.js.map