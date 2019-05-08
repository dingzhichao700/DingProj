var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MissionView = (function (_super) {
    __extends(MissionView, _super);
    function MissionView() {
        var _this = _super.call(this) || this;
        var self = _this;
        self.skinName = "resource/skins/mission/MissionViewSkin.exml";
        self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        return _this;
    }
    /** 创建完成*/
    MissionView.prototype.createCompleteEvent = function (event) {
        var self = this;
        self.isLoad = true;
        self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
        self.vip_btn["img"].source = "mission_btn_png";
        if (self.onLoadCallBack) {
            self.onLoadCallBack.call(self.onLoadCallTarget);
        }
    };
    MissionView.prototype.initview = function (onAddCallBack, onAddCallTarget) {
        var self = this;
        self.addCom = new AddItem(self.addItem, onAddCallBack, onAddCallTarget);
    };
    MissionView.prototype.onDestroy = function () {
        var self = this;
        self.onLoadCallBack = null;
        self.onLoadCallTarget = null;
        self.isLoad = null;
        _super.prototype.onDestroy.call(this);
    };
    return MissionView;
}(DLG.CComponent));
__reflect(MissionView.prototype, "MissionView");
//# sourceMappingURL=MissionView.js.map