module DLG {
	export class VTabPanel extends DLG.VPanel implements ITabPanel{
		

		protected m_tabIndex:number;
		protected m_tabsClassMap:Object;
		protected m_tabBarPagesMap:Object;
		protected m_currentTab:IPanel;
		//子类的容器
		protected m_tabContent:DLG.CGroup;
		protected m_tabBar: DLG.CTabBarGroup;
		
		public constructor(panelId:number , parame:any , fromPanelid?:string) {
			super(panelId,0,fromPanelid);
			this.m_tabsClassMap = {};
			this.m_tabBarPagesMap = {};

		}
		// protected onCreate():void
		public onShow(...arg):void
		{
			super.onShow(...arg);
			//由子类来实现 
			// this.setTabsClass
			// this.setTabBarPage
			// this.setTabContent
			// this.setTabBar
			// this.setCloseBtn
		}
		protected setTabsClass(page:number , cls:IPanel):void
		{
			this.m_tabsClassMap[page] = cls;
		}
		protected setTabBarPage(page:number , tab:ISelect):void
		{
			this.m_tabBarPagesMap[page] = tab;
		}
		
		protected setTabContent(content:DLG.CGroup )
		{
			this.m_tabContent = content
		}
		protected setTabBar(bar:DLG.CTabBarGroup )
		{
			this.m_tabBar = bar;
			this.m_tabBar.setOnChangeListener(this,this.onChangePageHandler,null);
		}
		protected onChangePageHandler(index:number , parame:any):void
		{
			var bar =  this.m_tabBar.getItem(index);
			var pageMap = this.m_tabBarPagesMap;
			for (var page in pageMap) {
				if (pageMap.hasOwnProperty(page)) {
					var element = pageMap[page];
					if(element == bar)
					{
						this.onOpenIndex(parseInt(page));
						break;
					}
				}
			}
		}

		
		/**打开第几页 */
		public onOpenIndex(index:number,parame?:any):void
		{
			var self = this;
			if(self.m_tabIndex != index)
			{
				if(self.m_currentTab)
				{
					self.m_currentTab.onDestroy();
					self.m_currentTab.removeFromParent();
				}
				let cls = self.m_tabsClassMap[self.m_tabIndex]
				self.m_currentTab = new cls(self.m_panelId ,index);
				self.m_currentTab.onShow();
				self.m_tabContent.addChild(self.m_currentTab);
				self.m_tabIndex = index;
			} else {
				sayError("调用 onOpenIndex出错,当前正打开的是第", index, '个标签');
			}
		}
		
		
		public onDestroy(): void
        {
			var self = this;
			if(self.m_currentTab)
			{
				self.m_currentTab.onDestroy();
				self.m_currentTab.removeFromParent();
			}
			self.m_tabIndex = undefined;
			self.m_tabsClassMap = undefined;
			self.m_tabBarPagesMap = undefined;
			self.m_fromPanelId = undefined;
            super.onDestroy();
        }
	}
}