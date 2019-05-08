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
     * 带有文本的按钮 能控制是否选中状态
     */
    var CButton = (function (_super) {
        __extends(CButton, _super);
        function CButton() {
            return _super.call(this) || this;
        }
        CButton.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            if (this.label_txt) {
                this._text = this.label_txt.text;
            }
        };
        CButton.prototype.onClick = function () {
            if (this.m_bEnable) {
                var value = this._isSelect ? this._isSelect : false;
                value = !value;
                this.setSelect(value);
                if (this.m_pListenerFunc) {
                    this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                }
            }
        };
        CButton.prototype.setLabel = function (value) {
            this._text = value;
            egret.callLater(this.renderDraw, this);
        };
        CButton.prototype.setLabelColor = function (value) {
            this.textColorArr = DLG.Utils.strToNumberArray(value.split(","));
            egret.callLater(this.renderDraw, this);
        };
        CButton.prototype.setStrokeColor = function (value) {
            this.strokeColorArr = DLG.Utils.strToNumberArray(value.split(","));
            egret.callLater(this.renderDraw, this);
        };
        CButton.prototype.setStroke = function (value) {
            this.stroke = value;
            egret.callLater(this.renderDraw, this);
        };
        CButton.prototype.setSelect = function (value) {
            this._isSelect = value;
            egret.callLater(this.renderDraw, this);
        };
        CButton.prototype.isSelect = function () {
            return this._isSelect;
        };
        CButton.prototype.renderDraw = function () {
            if (this._isSelect == undefined) {
                this._isSelect = false;
            }
            var _isSelect = this._isSelect;
            if (_isSelect) {
                if (this.up_mc)
                    this.up_mc.filters = null;
                if (this.select_mc) {
                    if (this.m_gray && this.select_mc.filters == null) {
                        this.select_mc.filters = [DLG.DLGConfig.grayColorFlilter];
                    }
                    else {
                        this.select_mc.filters = null;
                    }
                }
            }
            else {
                if (this.up_mc) {
                    if (this.m_gray && this.up_mc.filters == null) {
                        this.up_mc.filters = [DLG.DLGConfig.grayColorFlilter];
                    }
                    else {
                        this.up_mc.filters = null;
                    }
                }
                if (this.select_mc && this.select_mc.filters != null)
                    this.select_mc.filters = null;
            }
            if (this.up_mc && this.up_mc.visible == _isSelect)
                this.up_mc.visible = !_isSelect;
            if (this.select_mc && this.select_mc.visible == !_isSelect)
                this.select_mc.visible = _isSelect;
            if (this.label_txt) {
                var label = this.label_txt;
                if (this.textColorArr) {
                    label.textColor = _isSelect ? this.textColorArr[1] : this.textColorArr[0];
                }
                if (this.strokeColorArr) {
                    label.strokeColor = _isSelect ? this.strokeColorArr[1] : this.strokeColorArr[0];
                }
                if (this.stroke) {
                    label.stroke = this.stroke;
                }
                label.text = this._text;
            }
        };
        CButton.prototype.onDestroy = function () {
            if (this.select_mc)
                this.select_mc.filters = null;
            this.textColorArr = null;
            this.strokeColorArr = null;
            this._text = null;
            _super.prototype.onDestroy.call(this);
        };
        return CButton;
    }(DLG.CBmpButton));
    DLG.CButton = CButton;
    __reflect(CButton.prototype, "DLG.CButton", ["DLG.ISelect", "DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CButton.js.map