module DLG {
	export class PanelManager {

		protected parentLayer:DLG.CGroup;
		// protected loadResPanelMap:Object;
		protected openPanelMap:Object;
		protected m_pMask: DLG.CRect;

		protected panel_class:Table;
		protected panelModule:any;
		public constructor() {

		}
		public init(parentLayer:DLG.CGroup , cfg_cls:Table , panelModule:any):void
		{
			let self = this;
			self.parentLayer = parentLayer;
			// self.loadResPanelMap = {};
			self.openPanelMap = {};
			self.panel_class = cfg_cls;
			self.panelModule = panelModule;
			
		}
		public showDialog(skinName:string , btns:number , titleStr:string ,  btnText?:string[] , showClose?:boolean , showMask?:boolean):VDialog
		{
			let self = this;
			let panel :VDialog;
			panel = new VDialog();
			panel.onShow(skinName,btns , titleStr , btnText, showClose);
			if(showMask == undefined)
			{
				showMask = true;
			}
			if(showMask)
			{
				panel.setMask(showMask);
			}
			let layer: number = self.parentLayer.numChildren - 1;
			// while(self.parentLayer.numChildren < layer)
			// {
			// 	self.parentLayer.addChild(new DLG.CGroup);
			// }
			(<DLG.CGroup>self.parentLayer.getChildAt(layer)).addChild(panel);
			
			return panel;
			
		}
		public show(panelId:number , tabIndex:number = 0 , parame?:any , tabParame?:any , fromPanelid?:string , showMask?:boolean , isShow?:boolean):IPanel
		{
			let self = this;
			let panel :IPanel;
			let id = panelId + ''
			// if(self.loadResPanelMap.hasOwnProperty(id))
			// {
			// 	return;
			// }
			if(self.openPanelMap.hasOwnProperty(id))
			{
				panel = self.openPanelMap[id];
				return panel;
			}

			let clsCfg = self.panel_class.getObjById(parseInt(id));
			let __class = self.panelModule[clsCfg.classpath];
			if (DEBUG)
			{
				if (!__class)
				{
					throw new Error("指定的类不存在" + clsCfg.classpath);
				}	
			}	
			if(clsCfg.superclass == 'ITabPanel')
			{
				panel = new __class(panelId, parame, fromPanelid);
				(<ITabPanel>panel).onOpenIndex(tabIndex, tabParame);
			}else if(clsCfg.superclass == 'IPanel')
			{
				panel = new __class(panelId,parame,fromPanelid);
			}
			if(panel == undefined)
			{
				throw new Error('panel没有实例化');
			}
			if (isShow == undefined) isShow = true;
			if(isShow)
				panel.onShow();
			// let showMask:boolean = panel.getMask();
			if(showMask)
			{
				panel.setMask(showMask);
			}
			// while(self.parentLayer.numChildren < layer)
			// {
			// 	self.parentLayer.addChild(new DLG.CGroup);
			// }
			let layer = parseInt(clsCfg.layer);
			(<DLG.CGroup>self.parentLayer.getChildAt(layer)).addChild(panel);
			self.openPanelMap[id] = panel;
			self.checkMask();
			return panel;
		}
		private checkMask():void
		{
			let self = this;
			let layer:CGroup
			let panel:IPanel;
			if (!self.m_pMask) {
				let stage = DLGCore.stage
                self.m_pMask = new DLG.CRect(stage.stageWidth, stage.stageHeight, 0x000000);
                self.m_pMask.alpha = 0.5;
            }
			let mask = self.m_pMask;
			let maskIndex ;
			if(mask.parent)
			{
				maskIndex = mask.parent.getChildIndex(mask);
			}
			let parentLayer = self.parentLayer
			let i = parentLayer.numChildren - 1;
			let k
			for( i ; i >= 0; i -- )
			{
				layer = <CGroup>parentLayer.getChildAt(i);
				k = layer.numChildren - 1;
				for( k ; k >= 0; k -- )
				{
					panel = <IPanel>layer.getChildAt(k);
					if(panel.getMask() == true)
					{
						if(maskIndex && mask.parent == layer)
						{
							if(maskIndex != k)
							{
								layer.setChildIndex(mask,k);
							}
						}else
						{
							layer.addChildAt(mask , k);
						}
						break;
					}
				}
			}
		}
		public close(panelId:number ):void
		{
			let self = this;
			let panel:IPanel ;
			let id = panelId + ''
			// if(self.loadResPanelMap.hasOwnProperty(id))
			// {
			// 	panel = self.loadResPanelMap[id];
			// }else
			if(self.openPanelMap.hasOwnProperty(id))
			{
				panel = self.openPanelMap[id];
			}
			if(panel)
			{
				panel.removeFromParent();
				panel.onDestroy();
				panel = null;
				delete self.openPanelMap[id];
				self.checkMask();
			}
		}
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
		public closeAll(...excludeIds:Array<number|string>):void
		{
			let self = this;
			let map = self.openPanelMap;
			let panel:IPanel ;
			let delKeyArr:Array<string> = [];
			for (let key in map) {
				if (map.hasOwnProperty(key)) {
					if(excludeIds && excludeIds.indexOf(parseInt(key)) != -1)
					{
						continue;
					}
					panel = map[key];
					if(panel)
					{
						let clsCfg = self.panel_class.getObjById(panel.getPanelId());
						if (clsCfg.canClose == 1)
						{
							panel.removeFromParent();
							panel.onDestroy();
							panel = null;
							map[key] = null;
							delKeyArr.push(key);
						}	
						
					}
				}
			}
			for(let i:number = 0  ;i < delKeyArr.length ;i++)
			{
				delete self.openPanelMap[delKeyArr[i]];
			}
			self.checkMask();
		}
		public getPanelById(panelId:number):IPanel
		{
			let self = this;
			let panel:IPanel ;
			let id = panelId + ''
			if(self.openPanelMap.hasOwnProperty(id))
			{
				panel = self.openPanelMap[id];
			}
			return panel;
		}
	}
}