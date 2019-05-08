var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var PanelManager = (function () {
        function PanelManager() {
        }
        PanelManager.prototype.init = function (parentLayer, cfg_cls, panelModule) {
            var self = this;
            self.parentLayer = parentLayer;
            // self.loadResPanelMap = {};
            self.openPanelMap = {};
            self.panel_class = cfg_cls;
            self.panelModule = panelModule;
        };
        PanelManager.prototype.showDialog = function (skinName, btns, titleStr, btnText, showClose, showMask) {
            var self = this;
            var panel;
            panel = new DLG.VDialog();
            panel.onShow(skinName, btns, titleStr, btnText, showClose);
            if (showMask == undefined) {
                showMask = true;
            }
            if (showMask) {
                panel.setMask(showMask);
            }
            var layer = self.parentLayer.numChildren - 1;
            // while(self.parentLayer.numChildren < layer)
            // {
            // 	self.parentLayer.addChild(new DLG.CGroup);
            // }
            self.parentLayer.getChildAt(layer).addChild(panel);
            return panel;
        };
        PanelManager.prototype.show = function (panelId, tabIndex, parame, tabParame, fromPanelid, showMask, isShow) {
            if (tabIndex === void 0) { tabIndex = 0; }
            var self = this;
            var panel;
            var id = panelId + '';
            // if(self.loadResPanelMap.hasOwnProperty(id))
            // {
            // 	return;
            // }
            if (self.openPanelMap.hasOwnProperty(id)) {
                panel = self.openPanelMap[id];
                return panel;
            }
            var clsCfg = self.panel_class.getObjById(parseInt(id));
            var __class = self.panelModule[clsCfg.classpath];
            if (true) {
                if (!__class) {
                    throw new Error("指定的类不存在" + clsCfg.classpath);
                }
            }
            if (clsCfg.superclass == 'ITabPanel') {
                panel = new __class(panelId, parame, fromPanelid);
                panel.onOpenIndex(tabIndex, tabParame);
            }
            else if (clsCfg.superclass == 'IPanel') {
                panel = new __class(panelId, parame, fromPanelid);
            }
            if (panel == undefined) {
                throw new Error('panel没有实例化');
            }
            if (isShow == undefined)
                isShow = true;
            if (isShow)
                panel.onShow();
            // let showMask:boolean = panel.getMask();
            if (showMask) {
                panel.setMask(showMask);
            }
            // while(self.parentLayer.numChildren < layer)
            // {
            // 	self.parentLayer.addChild(new DLG.CGroup);
            // }
            var layer = parseInt(clsCfg.layer);
            self.parentLayer.getChildAt(layer).addChild(panel);
            self.openPanelMap[id] = panel;
            self.checkMask();
            return panel;
        };
        PanelManager.prototype.checkMask = function () {
            var self = this;
            var layer;
            var panel;
            if (!self.m_pMask) {
                var stage = DLG.DLGCore.stage;
                self.m_pMask = new DLG.CRect(stage.stageWidth, stage.stageHeight, 0x000000);
                self.m_pMask.alpha = 0.5;
            }
            var mask = self.m_pMask;
            var maskIndex;
            if (mask.parent) {
                maskIndex = mask.parent.getChildIndex(mask);
            }
            var parentLayer = self.parentLayer;
            var i = parentLayer.numChildren - 1;
            var k;
            for (i; i >= 0; i--) {
                layer = parentLayer.getChildAt(i);
                k = layer.numChildren - 1;
                for (k; k >= 0; k--) {
                    panel = layer.getChildAt(k);
                    if (panel.getMask() == true) {
                        if (maskIndex && mask.parent == layer) {
                            if (maskIndex != k) {
                                layer.setChildIndex(mask, k);
                            }
                        }
                        else {
                            layer.addChildAt(mask, k);
                        }
                        break;
                    }
                }
            }
        };
        PanelManager.prototype.close = function (panelId) {
            var self = this;
            var panel;
            var id = panelId + '';
            // if(self.loadResPanelMap.hasOwnProperty(id))
            // {
            // 	panel = self.loadResPanelMap[id];
            // }else
            if (self.openPanelMap.hasOwnProperty(id)) {
                panel = self.openPanelMap[id];
            }
            if (panel) {
                panel.removeFromParent();
                panel.onDestroy();
                panel = null;
                delete self.openPanelMap[id];
                self.checkMask();
            }
        };
        /*关闭某一层上的所有界面
        excludeIds  不会被关闭的UI界面id*/
        // public closeAllByLayer(layer:number , ...excludeIds:Array<number|string>): void
        // {
        // 	let self = this;
        // 	let map = self.openPanelMap;
        // 	let panel:IPanel ;
        // 	let delKeyArr:Array<string> = [];
        // 	for (let key in map) {
        // 		if (map.hasOwnProperty(key)) {
        // 			panel = map[key];
        // 			let clsCfg = self.panel_class.getObjById(panel.getPanelId());
        // 			if (clsCfg && parseInt(clsCfg.layer) != layer)
        // 			{
        // 				continue;
        // 			}	
        // 			if(excludeIds && excludeIds.indexOf(parseInt(key)) != -1)
        // 			{
        // 				continue;
        // 			}
        // 			if(panel)
        // 			{
        // 				panel.removeFromParent();
        // 				panel.onDestroy();
        // 				panel = null;
        // 				map[key] = null;
        // 				delKeyArr.push(key);
        // 			}
        // 		}
        // 	}
        // 	for(let i:number = 0  ;i < delKeyArr.length ;i++)
        // 	{
        // 		delete self.openPanelMap[delKeyArr[i]];
        // 	}
        // 	self.checkMask();
        // }
        /**关闭所有界面
         * excludeIds  不会被关闭的UI界面id
         */
        PanelManager.prototype.closeAll = function () {
            var excludeIds = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                excludeIds[_i] = arguments[_i];
            }
            var self = this;
            var map = self.openPanelMap;
            var panel;
            var delKeyArr = [];
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    if (excludeIds && excludeIds.indexOf(parseInt(key)) != -1) {
                        continue;
                    }
                    panel = map[key];
                    if (panel) {
                        var clsCfg = self.panel_class.getObjById(panel.getPanelId());
                        if (clsCfg.canClose == 1) {
                            panel.removeFromParent();
                            panel.onDestroy();
                            panel = null;
                            map[key] = null;
                            delKeyArr.push(key);
                        }
                    }
                }
            }
            for (var i = 0; i < delKeyArr.length; i++) {
                delete self.openPanelMap[delKeyArr[i]];
            }
            self.checkMask();
        };
        PanelManager.prototype.getPanelById = function (panelId) {
            var self = this;
            var panel;
            var id = panelId + '';
            if (self.openPanelMap.hasOwnProperty(id)) {
                panel = self.openPanelMap[id];
            }
            return panel;
        };
        return PanelManager;
    }());
    DLG.PanelManager = PanelManager;
    __reflect(PanelManager.prototype, "DLG.PanelManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=PanelManager.js.map