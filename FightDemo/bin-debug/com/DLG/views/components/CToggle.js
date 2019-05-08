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
     * 开关按钮
     * 同时如果点击了一下后，会变成另一个状态，
     * 例如单选 多选 用此类
     * 如果 isRadio ， changeDataTouchListener 都为true，那等同于CTabItem
     */
    var CToggle = (function (_super) {
        __extends(CToggle, _super);
        function CToggle() {
            var _this = 
            // console.log('CheckBox');
            _super.call(this) || this;
            _this.isRadio = false;
            /**是否数据改变的时候才会去触发回调 */
            _this.changeDataTouchListener = false;
            return _this;
        }
        // protected createChildren(): void {
        //     super.createChildren();
        //     if(this.select_img) this.select_img.visible = false;
        // }
        CToggle.prototype.onClick = function () {
            if (this.m_bEnable) {
                var value = !this.select_mc.visible;
                var needCHange = true;
                if (this.isRadio) {
                    if (this.select_mc.visible == value) {
                        needCHange = false;
                    }
                }
                if (needCHange) {
                    this.setSelect(value);
                }
                if (this.changeDataTouchListener == false || needCHange == true) {
                    if (this.m_pListenerFunc) {
                        this.m_pListenerFunc.call(this.m_pListenerObj, this.m_parame);
                    }
                }
            }
        };
        return CToggle;
    }(DLG.CButton));
    DLG.CToggle = CToggle;
    __reflect(CToggle.prototype, "DLG.CToggle");
})(DLG || (DLG = {}));
//# sourceMappingURL=CToggle.js.map