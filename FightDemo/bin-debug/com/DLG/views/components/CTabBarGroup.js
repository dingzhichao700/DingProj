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
    var CTabBarGroup = (function (_super) {
        __extends(CTabBarGroup, _super);
        function CTabBarGroup() {
            var _this = _super.call(this) || this;
            // this.m_tabItemsData = [];
            _this.m_hideItemMap = {};
            return _this;
        }
        CTabBarGroup.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            egret.callLater(this.renderDraw, this);
        };
        CTabBarGroup.prototype.setItemRenderer = function (renderClass) {
            this.m_renderClass = renderClass;
        };
        CTabBarGroup.prototype.setItemRenderSkin = function (skin) {
            this.m_renderSkin = skin;
        };
        CTabBarGroup.prototype.dataSource = function (value) {
            this.m_tabItemsData = value;
            egret.callLater(this.renderDraw, this);
        };
        CTabBarGroup.prototype.renderDraw = function () {
            var arr = this.toggleArr;
            var item;
            while (arr.length > 0) {
                item = arr.shift();
                if (item.parent) {
                    this.removeChild(item);
                }
            }
            arr.length = 0;
            if (this.m_tabItemsData) {
                var i = 0;
                var tabItem;
                var len = this.m_tabItemsData.length;
                var itemdata;
                for (i = 0; i < len; i++) {
                    tabItem = DLG.FactoryUtils.onCreateComp(this.m_renderClass);
                    tabItem.setSkinName(this.m_renderSkin);
                    itemdata = this.m_tabItemsData[i];
                    if (itemdata.color)
                        tabItem.setLabelColor(itemdata.color);
                    if (itemdata.strokeColor)
                        tabItem.setStrokeColor(itemdata.strokeColor);
                    if (itemdata.stroke)
                        tabItem.setStroke(itemdata.stroke);
                    if (itemdata.label)
                        tabItem.setLabel(itemdata.label);
                    tabItem.setData(itemdata.data);
                    this.push(tabItem);
                }
            }
        };
        CTabBarGroup.prototype.hideItemByIndex = function (index) {
            if (this.m_hideItemMap.hasOwnProperty(index + '') == false) {
                var arr = this.toggleArr;
                var item = arr[index];
                this.m_hideItemMap[index + ''] = item;
                item.removeFromParent();
            }
        };
        CTabBarGroup.prototype.showItemByIndex = function (index) {
            if (this.m_hideItemMap.hasOwnProperty(index + '') == true) {
                // var arr = this.toggleArr ;
                var item = this.m_hideItemMap[index + ''];
                this.addChild(item);
                delete this.m_hideItemMap[index + ''];
            }
        };
        CTabBarGroup.prototype.onDestroy = function () {
            if (this.m_tabItemsData) {
                this.m_tabItemsData.length = 0;
                this.m_tabItemsData = null;
            }
            var obj = this.m_hideItemMap;
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var item = obj[key];
                    item.removeFromParent();
                }
            }
            this.m_hideItemMap = null;
            _super.prototype.onDestroy.call(this);
        };
        return CTabBarGroup;
    }(DLG.CRadioGroup));
    DLG.CTabBarGroup = CTabBarGroup;
    __reflect(CTabBarGroup.prototype, "DLG.CTabBarGroup");
})(DLG || (DLG = {}));
//# sourceMappingURL=CTabBarGroup.js.map