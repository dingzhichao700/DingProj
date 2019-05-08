var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadView = (function (_super) {
    __extends(LoadView, _super);
    function LoadView() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = "resource/skins/loading/LoadViewSkin.exml";
        self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        return _this;
    }
    /** 创建完成*/
    LoadView.prototype.createCompleteEvent = function (event) {
        var self = this;
        self.isLoad = true;
        self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        self.bar = new BarItem(this.barItem);
        if (self.onLoadCallBack) {
            self.onLoadCallBack.call(self.onLoadCallTarget);
        }
    };
    LoadView.prototype.onDestroy = function () {
        var self = this;
        self.onLoadCallBack = null;
        self.onLoadCallTarget = null;
        self.isLoad = null;
        _super.prototype.onDestroy.call(this);
    };
    return LoadView;
}(DLG.CComponent));
__reflect(LoadView.prototype, "LoadView");
//# sourceMappingURL=LoadView.js.map