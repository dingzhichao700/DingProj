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
    var CNewList = (function (_super) {
        __extends(CNewList, _super);
        function CNewList() {
            var _this = _super.call(this) || this;
            _this._selectIndex = -1;
            return _this;
        }
        CNewList.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var self = this;
            while (self.numChildren > 0) {
                self.removeChildAt(0);
            }
            self.setLayout(new eui.VerticalLayout());
        };
        /**回调处理方法 */
        CNewList.prototype.setOnChangeListener = function (thisObject, listener, parame) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        };
        CNewList.prototype.onShowScroll = function (value) {
            this.m_showScroll = value;
        };
        CNewList.prototype.setItemRenderer = function (item) {
            this._itemRender = item;
        };
        CNewList.prototype.dataProvider = function (arr) {
            var self = this;
            while (self.numChildren > 0) {
                DLG.FactoryUtils.onReturnComp(self.removeChildAt(0));
            }
            self._data = arr;
            var i = 0;
            // let arr = self._data;
            var len = arr.length;
            for (i = 0; i < len; i++) {
                var item = DLG.FactoryUtils.onCreateComp(self._itemRender);
                item.setData(arr[i]);
                self.addChild(item);
                item.setOnClickListener(self, self.selectHandler, i);
            }
        };
        CNewList.prototype.selectHandler = function (index) {
            this.selectedIndex = index;
        };
        Object.defineProperty(CNewList.prototype, "selectedIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (index) {
                var self = this;
                self._selectIndex = index;
                var item;
                var i = 0;
                var len = self.numChildren;
                for (i = 0; i < len; i++) {
                    item = self.getChildAt(i);
                    if (i == index) {
                        // if(item.isSelect() == false )
                        // {
                        if (this.m_pListenerFunc) {
                            this.m_pListenerFunc.call(this.m_pListenerObj, index, this.m_parame);
                        }
                        // }
                        item.setSelect(true);
                    }
                    else {
                        item.setSelect(false);
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        CNewList.prototype.setLayout = function (layout) {
            var self = this;
            self.layout = layout;
        };
        CNewList.prototype.setAlign = function (value) {
            var self = this;
            var _layout = self.layout;
            _layout.horizontalAlign = value;
        };
        /**设置间隔 */
        CNewList.prototype.setGap = function (value) {
            var self = this;
            var _layout = self.layout;
            _layout.gap = value;
        };
        CNewList.prototype.renderDraw = function () {
        };
        CNewList.prototype.onDestroy = function () {
            var self = this;
            self.m_pListenerFunc = null;
            self.m_pListenerObj = null;
            self.m_parame = null;
            self._itemRender = null;
            _super.prototype.onDestroy.call(this);
        };
        return CNewList;
    }(DLG.CGroup));
    DLG.CNewList = CNewList;
    __reflect(CNewList.prototype, "DLG.CNewList");
})(DLG || (DLG = {}));
//# sourceMappingURL=CNewList.js.map