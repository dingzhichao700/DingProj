var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    /**
     * 只是位图按钮，只处理最基本的点击。
     */
    var CBmpButton = (function (_super) {
        __extends(CBmpButton, _super);
        function CBmpButton() {
            return _super.call(this) || this;
            // this.skinName = "resource/skin/main/StartBtn.exml";
        }
        CBmpButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.setScaleClick(false);
            this.m_bEnable = true;
            egret.callLater(this.renderDraw, this);
        };
        CBmpButton.prototype.setScaleClick = function (value) {
            var target;
            // if(this.click_mc)
            // {
            //     target = this.click_mc;
            // }else{
            target = this;
            // }
            DLG.DLGCore.event.removeEventListener(target);
            if (value) {
                DLG.DLGCore.event.addTouchScaleListener(target, this, this.onClick);
            }
            else {
                DLG.DLGCore.event.addTouchTapListener(target, this, this.onClick);
            }
        };
        CBmpButton.prototype.setLabel = function (value) {
            throw new Error('CBmpButton不能使用此方法');
        };
        CBmpButton.prototype.setOnClickListener = function (thisObject, listener, parame) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        };
        CBmpButton.prototype.onClick = function () {
            if (this.m_bEnable) {
                if (this.m_pListenerFunc) {
                    if (this.m_parame == undefined) {
                        this.m_pListenerFunc.call(this.m_pListenerObj);
                    }
                    else {
                        this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                    }
                }
            }
        };
        /**设置是否可以点击 */
        CBmpButton.prototype.setEnable = function (value) {
            this.m_bEnable = value;
        };
        /**设置灰度 */
        CBmpButton.prototype.setGray = function (value) {
            this.m_gray = value;
            egret.callLater(this.renderDraw, this);
        };
        /*灰度 并且不可以点击*/
        CBmpButton.prototype.setDisabled = function (value) {
            this.m_bEnable = this.m_gray = value;
            egret.callLater(this.renderDraw, this);
        };
        CBmpButton.prototype.renderDraw = function () {
            if (this.up_mc) {
                if (this.m_gray && this.up_mc.filters == null) {
                    this.up_mc.filters = [DLG.DLGConfig.grayColorFlilter];
                }
                else {
                    this.up_mc.filters = null;
                }
            }
        };
        CBmpButton.prototype.onDestroy = function () {
            var target;
            // if(this.click_mc)
            // {
            // 	target = this.click_mc;
            // }else{
            target = this;
            // }
            DLG.DLGCore.event.removeEventListener(target);
            if (this.up_mc)
                this.up_mc.filters = null;
            this.m_pListenerFunc = null;
            this.m_pListenerObj = null;
            this.m_parame = null;
            _super.prototype.onDestroy.call(this);
        };
        return CBmpButton;
    }(DLG.CComponent));
    DLG.CBmpButton = CBmpButton;
    __reflect(CBmpButton.prototype, "DLG.CBmpButton", ["DLG.IButton"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CBmpButton.js.map