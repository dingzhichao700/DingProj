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
    var CButtonCustom = (function (_super) {
        __extends(CButtonCustom, _super);
        function CButtonCustom() {
            return _super.call(this) || this;
        }
        CButtonCustom.prototype.createChildren = function () {
            // var target:any ;
            // if(this.click_mc)
            // {
            //     target = this.click_mc;
            // }else{
            // target = this;
            // }
            var self = this;
            // DLGCore.event.removeEventListener(target);
            // DLGCore.event.addTouchTapListener(target, this, this.onClick);
            self.setScaleClick(false);
            this.m_bEnable = true;
            _super.prototype.createChildren.call(this);
            egret.callLater(this.renderDraw, this);
        };
        CButtonCustom.prototype.setScaleClick = function (value) {
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
        CButtonCustom.prototype.onClick = function () {
            if (this.m_bEnable) {
                if (this.m_pListenerFunc) {
                    this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                }
            }
        };
        CButtonCustom.prototype.setOnClickListener = function (thisObject, listener, parame) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        };
        CButtonCustom.prototype.setLabel = function (value) {
            throw new Error('CButtonCustom不能使用此方法');
        };
        /**设置是否可以点击 */
        CButtonCustom.prototype.setEnable = function (value) {
            this.m_bEnable = value;
        };
        /**设置灰度 */
        CButtonCustom.prototype.setGray = function (value) {
            this.m_gray = value;
            egret.callLater(this.renderDraw, this);
        };
        /*灰度 并且不可以点击*/
        CButtonCustom.prototype.setDisabled = function (value) {
            this.m_bEnable = this.m_gray = value;
            egret.callLater(this.renderDraw, this);
        };
        CButtonCustom.prototype.isSelect = function () {
            return this._isSelect;
        };
        CButtonCustom.prototype.setSelect = function (value) {
            this._isSelect = value;
            egret.callLater(this.renderDraw, this);
        };
        CButtonCustom.prototype.renderDraw = function () {
            var _isSelect = this._isSelect;
            if (_isSelect) {
                if (this.up_Group)
                    this.up_Group.filters = null;
                if (this.select_Group) {
                    if (this.m_gray && this.select_Group.filters == null) {
                        this.select_Group.filters = [DLG.DLGConfig.grayColorFlilter];
                    }
                    else {
                        this.select_Group.filters = null;
                    }
                }
            }
            else {
                if (this.up_Group) {
                    if (this.m_gray && this.up_Group.filters == null) {
                        this.up_Group.filters = [DLG.DLGConfig.grayColorFlilter];
                    }
                    else {
                        this.up_Group.filters = null;
                    }
                }
                if (this.select_Group && this.select_Group.filters != null)
                    this.select_Group.filters = null;
            }
            if (this.up_Group && this.up_Group.visible == false)
                this.up_Group.visible = !_isSelect;
            if (this.select_Group && this.select_Group.visible == true)
                this.select_Group.visible = _isSelect;
        };
        CButtonCustom.prototype.onDestroy = function () {
            var target;
            // if(this.click_mc)
            // {
            // 	target = this.click_mc;
            // }else{
            target = this;
            // }
            DLG.DLGCore.event.removeEventListener(target);
            if (this.select_Group)
                this.select_Group.filters = null;
            if (this.up_Group)
                this.up_Group.filters = null;
            this.m_pListenerFunc = null;
            this.m_pListenerObj = null;
            this.m_parame = null;
            _super.prototype.onDestroy.call(this);
        };
        return CButtonCustom;
    }(DLG.CComponent));
    DLG.CButtonCustom = CButtonCustom;
    __reflect(CButtonCustom.prototype, "DLG.CButtonCustom", ["DLG.ISelect", "DLG.IButton"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CButtonCustom.js.map