var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PvpMatchView = (function (_super) {
    __extends(PvpMatchView, _super);
    /**** */
    /*** */
    function PvpMatchView() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = "resource/skins/pvpMatch/PvpMatchViewSkin.exml";
        self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        return _this;
    }
    /** 创建完成*/
    PvpMatchView.prototype.createCompleteEvent = function (event) {
        var self = this;
        self.isLoad = true;
        self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        self.vip_btn["img"].source = "pvp_btn_png";
        self.bar = new BarItem(this.barItem);
        self.headItem1 = new PvpHeadItem(self.item1);
        self.headItem2 = new PvpHeadItem(self.item2);
        if (self.onLoadCallBack) {
            self.onLoadCallBack.call(self.onLoadCallTarget);
        }
    };
    PvpMatchView.prototype.initview = function (onAddCallBack, onAddCallTarget) {
        var self = this;
        self.addCom = new AddItem(self.addItem, onAddCallBack, onAddCallTarget);
    };
    PvpMatchView.prototype.onDestroy = function () {
        var self = this;
        self.onLoadCallBack = null;
        self.onLoadCallTarget = null;
        self.isLoad = null;
        _super.prototype.onDestroy.call(this);
    };
    return PvpMatchView;
}(DLG.CComponent));
__reflect(PvpMatchView.prototype, "PvpMatchView");
//# sourceMappingURL=PvpMatchView.js.map