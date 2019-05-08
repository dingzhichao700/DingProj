var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WuHunView = (function (_super) {
    __extends(WuHunView, _super);
    function WuHunView() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = "resource/skins/wuHun/WuHunView.exml";
        self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        return _this;
    }
    /** 创建完成*/
    WuHunView.prototype.createCompleteEvent = function (event) {
        var self = this;
        self.isLoad = true;
        self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        this.item1 = new WuHunItem(self.item_1);
        this.item2 = new WuHunItem(self.item_2);
        this.item3 = new WuHunItem(self.item_3);
        this.item4 = new WuHunItem(self.item_4);
        this.item5 = new WuHunItem(self.item_5);
        this.item6 = new WuHunItem(self.item_6);
        if (self.onLoadCallBack) {
            self.onLoadCallBack.call(self.onLoadCallTarget);
        }
    };
    WuHunView.prototype.onDestroy = function () {
        var self = this;
        self.onLoadCallBack = null;
        self.onLoadCallTarget = null;
        self.isLoad = null;
        _super.prototype.onDestroy.call(this);
    };
    return WuHunView;
}(DLG.CComponent));
__reflect(WuHunView.prototype, "WuHunView");
//# sourceMappingURL=WuHunView.js.map