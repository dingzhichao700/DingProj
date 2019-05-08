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
    var VTabPanel = (function (_super) {
        __extends(VTabPanel, _super);
        function VTabPanel(panelId, parame, fromPanelid) {
            var _this = _super.call(this, panelId, 0, fromPanelid) || this;
            _this.m_tabsClassMap = {};
            _this.m_tabBarPagesMap = {};
            return _this;
        }
        // protected onCreate():void
        VTabPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            //由子类来实现 
            // this.setTabsClass
            // this.setTabBarPage
            // this.setTabContent
            // this.setTabBar
            // this.setCloseBtn
        };
        VTabPanel.prototype.setTabsClass = function (page, cls) {
            this.m_tabsClassMap[page] = cls;
        };
        VTabPanel.prototype.setTabBarPage = function (page, tab) {
            this.m_tabBarPagesMap[page] = tab;
        };
        VTabPanel.prototype.setTabContent = function (content) {
            this.m_tabContent = content;
        };
        VTabPanel.prototype.setTabBar = function (bar) {
            this.m_tabBar = bar;
            this.m_tabBar.setOnChangeListener(this, this.onChangePageHandler, null);
        };
        VTabPanel.prototype.onChangePageHandler = function (index, parame) {
            var bar = this.m_tabBar.getItem(index);
            var pageMap = this.m_tabBarPagesMap;
            for (var page in pageMap) {
                if (pageMap.hasOwnProperty(page)) {
                    var element = pageMap[page];
                    if (element == bar) {
                        this.onOpenIndex(parseInt(page));
                        break;
                    }
                }
            }
        };
        /**打开第几页 */
        VTabPanel.prototype.onOpenIndex = function (index, parame) {
            var self = this;
            if (self.m_tabIndex != index) {
                if (self.m_currentTab) {
                    self.m_currentTab.onDestroy();
                    self.m_currentTab.removeFromParent();
                }
                var cls = self.m_tabsClassMap[self.m_tabIndex];
                self.m_currentTab = new cls(self.m_panelId, index);
                self.m_currentTab.onShow();
                self.m_tabContent.addChild(self.m_currentTab);
                self.m_tabIndex = index;
            }
            else {
                sayError("调用 onOpenIndex出错,当前正打开的是第", index, '个标签');
            }
        };
        VTabPanel.prototype.onDestroy = function () {
            var self = this;
            if (self.m_currentTab) {
                self.m_currentTab.onDestroy();
                self.m_currentTab.removeFromParent();
            }
            self.m_tabIndex = undefined;
            self.m_tabsClassMap = undefined;
            self.m_tabBarPagesMap = undefined;
            self.m_fromPanelId = undefined;
            _super.prototype.onDestroy.call(this);
        };
        return VTabPanel;
    }(DLG.VPanel));
    DLG.VTabPanel = VTabPanel;
    __reflect(VTabPanel.prototype, "DLG.VTabPanel", ["DLG.ITabPanel", "DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=VTabPanel.js.map