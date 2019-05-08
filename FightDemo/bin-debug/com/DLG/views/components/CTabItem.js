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
     * 同时如果点击了一下后，会变成另一个状态，
     * 在选中状态下再点击这个按钮 点击事件不触发 皮肤也不会发生改变
     */
    var CTabItem = (function (_super) {
        __extends(CTabItem, _super);
        function CTabItem() {
            return _super.call(this) || this;
        }
        CTabItem.prototype.onClick = function () {
            if (this.m_bEnable) {
                var value = !this._isSelect;
                if (value == true) {
                    return;
                }
                this.setSelect(value);
                if (this.m_pListenerFunc) {
                    this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                }
            }
        };
        return CTabItem;
    }(DLG.CButton));
    DLG.CTabItem = CTabItem;
    __reflect(CTabItem.prototype, "DLG.CTabItem", ["DLG.ITabItem", "DLG.IButton"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CTabItem.js.map