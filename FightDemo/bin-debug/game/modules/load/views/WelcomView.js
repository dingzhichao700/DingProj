var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var WelcomView = (function (_super) {
    __extends(WelcomView, _super);
    function WelcomView() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = "resource/skins/loading/WelcomViewSkin.exml";
        self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        return _this;
    }
    /** 创建完成*/
    WelcomView.prototype.createCompleteEvent = function (event) {
        var self = this;
        self.isLoad = true;
        self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        if (self.onLoadCallBack) {
            self.onLoadCallBack.call(self.onLoadCallTarget);
        }
    };
    WelcomView.prototype.onDestroy = function () {
        var self = this;
        self.onLoadCallBack = null;
        self.onLoadCallTarget = null;
        self.isLoad = null;
        _super.prototype.onDestroy.call(this);
    };
    return WelcomView;
}(DLG.CComponent));
__reflect(WelcomView.prototype, "WelcomView");
//# sourceMappingURL=WelcomView.js.map