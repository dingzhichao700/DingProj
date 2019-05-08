var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ALERT_BUTTON;
(function (ALERT_BUTTON) {
    ALERT_BUTTON[ALERT_BUTTON["ALERT_OK"] = 1] = "ALERT_OK";
    ALERT_BUTTON[ALERT_BUTTON["ALERT_NO"] = 2] = "ALERT_NO";
    ALERT_BUTTON[ALERT_BUTTON["ALERT_CANCEL"] = 4] = "ALERT_CANCEL";
})(ALERT_BUTTON || (ALERT_BUTTON = {}));
var DLG;
(function (DLG) {
    /**
     *
     * @author
     *
     */
    var VDialog = (function (_super) {
        __extends(VDialog, _super);
        function VDialog() {
            var _this = _super.call(this, 0, null) || this;
            _this.btns = 0;
            _this.showClose = false;
            return _this;
        }
        VDialog.prototype.onShow = function (skinName, btns, titleStr, btnText, showClose) {
            _super.prototype.onShow.call(this);
            this.titleStr = titleStr;
            this.btns = btns;
            if (true) {
                if (btnText && btnText.length < 3) {
                    throw new Error('按钮的文本必须一一对应，ok , no ， cancel');
                }
            }
            this.btnTexts = btnText;
            this.skinName = skinName;
            this.onCreate();
        };
        VDialog.prototype.onCreate = function () {
            var self = this;
            var btns = self.btns;
            if (btns > 0) {
                if ((btns & 0x6) == 0) {
                    self.btnOk.removeFromParent();
                    self.btnOk.onDestroy();
                }
                if ((btns >> 1 & 0x2) == 0) {
                    self.btnNo.removeFromParent();
                    self.btnNo.onDestroy();
                }
                if ((btns >> 1) == 0) {
                    self.btncancel.removeFromParent();
                    self.btncancel.onDestroy();
                }
            }
            if (self.btnTexts) {
                if (self.btnOk.parent)
                    self.btnOk.setLabel(self.btnTexts[0]);
                if (self.btnNo.parent)
                    self.btnNo.setLabel(self.btnTexts[1]);
                if (self.btncancel.parent)
                    self.btncancel.setLabel(self.btnTexts[2]);
            }
            self.m_pRichlabel.textAlign = true;
            if (self.titleStr) {
                self.titleLabel.text = this.titleStr;
            }
            if (this.btnClose)
                this.btnClose.visible = this.showClose;
            DLG.DLGCore.event.addTouchScaleListener(this.btnOk, this, this.okClick);
            DLG.DLGCore.event.addTouchScaleListener(this.btnNo, this, this.noClick);
            DLG.DLGCore.event.addTouchScaleListener(this.btnClose, this, this.closeClick);
            DLG.DLGCore.event.addTouchScaleListener(this.btncancel, this, this.closeClick);
        };
        VDialog.prototype.okClick = function (event) {
            var callback = this.funcCallBack;
            this.closeClick();
            if (callback) {
                callback(true);
            }
        };
        VDialog.prototype.noClick = function (event) {
            var callback = this.funcCallBack;
            this.closeClick();
            if (callback) {
                callback(false);
            }
        };
        VDialog.prototype.closeClick = function () {
            this.m_pRichlabel = null;
            this.funcCallBack = null;
            // UpManager.history(false);
        };
        VDialog.prototype.onDestroy = function () {
            this.m_pRichlabel = null;
            this.funcCallBack = null;
            this.btnTexts = null;
            _super.prototype.onDestroy.call(this);
        };
        return VDialog;
    }(DLG.VPanel));
    DLG.VDialog = VDialog;
    __reflect(VDialog.prototype, "DLG.VDialog");
})(DLG || (DLG = {}));
//# sourceMappingURL=VDialog.js.map