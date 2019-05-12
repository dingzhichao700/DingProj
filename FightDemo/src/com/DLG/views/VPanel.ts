module DLG {
	export class VPanel extends DLG.CComponent implements IPanel{
		
		protected m_panelId:number;
		protected m_subPanelId:number;
		
		// protected m_parame:any;
		protected m_showMask:boolean;

		protected lan = null;
		protected isInitView: boolean;
		// protected isResourceLoadEnd:boolean =false;
		// protected reLoad:boolean = false;
		// protected exmlID:string

		//从哪个界面打开的，关闭以后要回到这个界面
		protected m_fromPanelId:string; // 格式 m_panelId + '_' + m_subPanelId
		
		public constructor(panelId:number , subPanelId?:number /*,parame?:any*/ , fromPanelid?:string) {
			super();
			this.m_panelId = panelId;
			this.m_subPanelId = subPanelId;
			// this.m_parame = parame;
			if (this.m_subPanelId)
			{
				this.name = "View_" + this.m_panelId + '_' + this.m_subPanelId;
			} else
			{
				this.name = "View_" + this.m_panelId;
			}	
			
			// this.exmlID = 'view' + this.m_panelId + '_' + this.m_subPanelId;
			this.m_fromPanelId = fromPanelid;
		}
		 /**窗体显示函数  真正的显示界面的方法**/
        public onShow(...arg): void {
			this.lan = DLGCore.lan;
			// this.setCloseBtn
        }
		protected initView(): void {
			let self = this;
			self.isInitView = true;
			egret.callLater(self.onRefresh, self);
		}
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
		protected setCloseBtn(btn:DLG.CComponent )
		{
			let self = this;
			if (!self.isInitView)
			{
				return;
			}	
			DLGCore.event.addScaleListener(btn,0.9,self,self.onBack);
		}
		/**
         * 界面返回或者关闭时调用
         */
        protected onBack(event: egret.Event):void
		{
            if(this.m_fromPanelId)
			{
				//打开上一个界面
				let arr = this.m_fromPanelId.split('_');
				let panel: IPanel = DLGCore.panel.show(parseInt(arr[0]));
				if (panel instanceof VTabPanel)
				{
					panel.onOpenIndex(parseInt(arr[1]))
				}	
				arr.length = 0;
				arr = null;
			} else {
				DLG.DLGCore.panel.close(this.m_panelId);
			}
        }
		/**
         * 刷新函数 播完特效 切换标签 返回 都会调用 
         * setTab 当切换的时候=true 其他全是false
         */
        public onRefresh(): void 
		{
			let self = this;
			if (!self.isInitView)
			{
				return;
			}
            // debug("BasePanel on refresh");
			self.renderViews();
		}
		protected renderViews(): void
		{

		}

		public setMask(value:boolean):void{
			this.m_showMask = value;
		}
		public getMask():boolean
		{
			return this.m_showMask
		}
		
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
		public getPanelId(): number
		{
			return this.m_panelId;
		}
		public onDestroy(): void
		{
			let self = this;
			self.m_subPanelId = undefined;
			self.m_panelId = undefined;

			self.isInitView = undefined;
			self.lan = null;
			DLGCore.event.removeEventListeners(self);
            super.onDestroy();
        }
	}
}