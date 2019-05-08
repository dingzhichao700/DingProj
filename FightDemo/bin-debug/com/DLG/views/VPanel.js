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
    var VPanel = (function (_super) {
        __extends(VPanel, _super);
        function VPanel(panelId, subPanelId /*,parame?:any*/, fromPanelid) {
            var _this = _super.call(this) || this;
            _this.lan = null;
            _this.m_panelId = panelId;
            _this.m_subPanelId = subPanelId;
            // this.m_parame = parame;
            if (_this.m_subPanelId) {
                _this.name = "View_" + _this.m_panelId + '_' + _this.m_subPanelId;
            }
            else {
                _this.name = "View_" + _this.m_panelId;
            }
            // this.exmlID = 'view' + this.m_panelId + '_' + this.m_subPanelId;
            _this.m_fromPanelId = fromPanelid;
            return _this;
        }
        /**窗体显示函数  真正的显示界面的方法**/
        VPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            this.lan = DLG.DLGCore.lan;
            // this.setCloseBtn
        };
        VPanel.prototype.initView = function () {
            var self = this;
            self.isInitView = true;
            egret.callLater(self.onRefresh, self);
        };
        // protected isLoading:boolean = false;
        // protected loadExml():boolean
        // {
        // 	let exmlID = this.exmlID;
        // 	var resArr = this.getShowBeforeREs();
        // 	if(resArr.length > 0)
        // 	{
        // 		RES.createGroup(exmlID,resArr,true);
        // 		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        // 		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // 		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        // 		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // 		RES.loadGroup(exmlID);
        // 		return true;
        // 	}else
        // 	{
        // 		return false;
        // 	}
        // }
        // protected onCreate():void
        // {
        // }
        VPanel.prototype.setCloseBtn = function (btn) {
            var self = this;
            if (!self.isInitView) {
                return;
            }
            DLG.DLGCore.event.addScaleListener(btn, 0.9, self, self.onBack);
        };
        /**
         * 界面返回或者关闭时调用
         */
        VPanel.prototype.onBack = function (event) {
            if (this.m_fromPanelId) {
                //打开上一个界面
                var arr = this.m_fromPanelId.split('_');
                var panel = DLG.DLGCore.panel.show(parseInt(arr[0]));
                if (panel instanceof DLG.VTabPanel) {
                    panel.onOpenIndex(parseInt(arr[1]));
                }
                arr.length = 0;
                arr = null;
            }
            else {
                DLG.DLGCore.panel.close(this.m_panelId);
            }
        };
        /**
         * 刷新函数 播完特效 切换标签 返回 都会调用
         * setTab 当切换的时候=true 其他全是false
         */
        VPanel.prototype.onRefresh = function () {
            var self = this;
            if (!self.isInitView) {
                return;
            }
            // debug("BasePanel on refresh");
            self.renderViews();
        };
        VPanel.prototype.renderViews = function () {
        };
        VPanel.prototype.setMask = function (value) {
            this.m_showMask = value;
        };
        VPanel.prototype.getMask = function () {
            return this.m_showMask;
        };
        // protected onResourceLoadComplete(event:RES.ResourceEvent): void {
        //     if (event.groupName == this.exmlID) {
        // 		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        // 		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        // 		RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        // 		RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // 		this.isResourceLoadEnd = true;
        // 		this.onShow();
        // 	}
        // }
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        // protected onItemLoadError(event:RES.ResourceEvent):void {
        // 	debug("Url:" + event.resItem.url + " has failed to load");
        // }
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        // protected onResourceLoadError(event:RES.ResourceEvent):void {
        // 	//TODO
        // 	debug("Group:" + event.groupName + " has failed to load");
        // 	if(this.reLoad == false)
        // 	{
        // 		this.reLoad = true;
        // 		RES.loadGroup(this.exmlID);
        // 	}else
        // 	{
        // 		this.onResourceLoadComplete(event);
        // 	}
        // }
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        // protected onResourceProgress(event:RES.ResourceEvent):void {
        // 	if (event.groupName == this.exmlID) {
        // 		// this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        // 	}
        // }
        // protected createChildren() {
        // 	super.createChildren();
        // 	this.onCreate();
        // }
        /**获取显示前需要加载的所有RES资源*/
        // public getShowBeforeREs():Array<string>
        // {
        // 	return [];
        // }
        VPanel.prototype.getPanelId = function () {
            return this.m_panelId;
        };
        VPanel.prototype.onDestroy = function () {
            var self = this;
            self.m_subPanelId = undefined;
            self.m_panelId = undefined;
            self.isInitView = undefined;
            self.lan = null;
            DLG.DLGCore.event.removeEventListeners(self);
            _super.prototype.onDestroy.call(this);
        };
        return VPanel;
    }(DLG.CComponent));
    DLG.VPanel = VPanel;
    __reflect(VPanel.prototype, "DLG.VPanel", ["DLG.IPanel"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=VPanel.js.map