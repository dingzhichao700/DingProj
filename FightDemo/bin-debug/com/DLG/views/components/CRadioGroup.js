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
    var CRadioGroup = (function (_super) {
        __extends(CRadioGroup, _super);
        function CRadioGroup() {
            var _this = _super.call(this) || this;
            /**是否数据改变的时候才会去触发回调 */
            _this.changeDataTouchListener = true;
            _this.selectIndex = -1;
            return _this;
        }
        CRadioGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.toggleArr = [];
            var arr = this.toggleArr;
            var i = 0;
            var len = this.numChildren;
            for (i = 0; i < len; i++) {
                if (true) {
                    if (egret.is(this.getChildAt(i), 'DLG.ISelect') == false) {
                        throw new Error("CCRadioGroup 只能存放ISelect组件");
                    }
                }
                var item = this.getChildAt(i);
                arr.push(item);
                item.setOnClickListener(this, this.selectHandler, arr.length - 1);
            }
        };
        /**回调处理方法 */
        CRadioGroup.prototype.setOnChangeListener = function (thisObject, listener, parame) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        };
        /**设置选择索引 */
        CRadioGroup.prototype.setIndex = function (select, index) {
            var arr = this.toggleArr;
            var i = 0;
            var len = arr.length;
            var item;
            var oldSelectIndex = this.selectIndex;
            var _checkCanClickFunc = this._checkCanClickFunc;
            if (_checkCanClickFunc) {
                var can = _checkCanClickFunc.call(this._checkCanClickFuncObj, index);
                if (can == false) {
                    return;
                }
            }
            for (i = 0; i < len; i++) {
                item = arr[i];
                if (i == index) {
                    if (item.isSelect() == false || this.changeDataTouchListener == false) {
                        if (this.m_pListenerFunc) {
                            this.m_pListenerFunc.call(this.m_pListenerObj, index, this.m_parame);
                        }
                    }
                    this.selectIndex = i;
                    item.setSelect(true);
                }
                else {
                    item.setSelect(false);
                }
            }
        };
        CRadioGroup.prototype.push = function (item) {
            var arr = this.toggleArr;
            arr.push(item);
            item.setOnClickListener(this, this.selectHandler, arr.length - 1);
        };
        CRadioGroup.prototype.getItem = function (index) {
            var item = this.toggleArr[index];
            return item;
        };
        CRadioGroup.prototype.checkCanClickFuncArr = function (func, target) {
            this._checkCanClickFunc = func;
            this._checkCanClickFuncObj = target;
        };
        CRadioGroup.prototype.selectHandler = function (index) {
            this.setIndex(true, index);
        };
        CRadioGroup.prototype.onDestroy = function () {
            var arr = this.toggleArr;
            var item;
            while (arr.length > 0) {
                this.parent;
                item = arr.shift();
                if (item.parent) {
                    this.removeChild(item);
                }
            }
            arr = null;
            this.m_pListenerFunc = null;
            this.m_pListenerObj = null;
            this.m_parame = null;
            this._checkCanClickFunc = null;
            this._checkCanClickFuncObj = null;
            _super.prototype.onDestroy.call(this);
        };
        return CRadioGroup;
    }(DLG.CGroup));
    DLG.CRadioGroup = CRadioGroup;
    __reflect(CRadioGroup.prototype, "DLG.CRadioGroup");
})(DLG || (DLG = {}));
//# sourceMappingURL=CRadioGroup.js.map