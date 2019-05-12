module DLG {
	export class CTabBarGroup extends CRadioGroup{
		public m_tabItemsData:Array<TabItemData>;
		private m_hideItemMap: Object;
		private m_renderClass: any;
		private m_renderSkin: string;
		public constructor() {
			super();
			// this.m_tabItemsData = [];
			this.m_hideItemMap = {};
		}
		protected createChildren(): void {

			super.createChildren();
			egret.callLater(this.renderDraw,this);
		}
		public setItemRenderer(renderClass:any): void
		{
			this.m_renderClass = renderClass;
			
		}
		public setItemRenderSkin(skin: string): void
		{
			this.m_renderSkin = skin;
		}
		public dataSource(value:Array<TabItemData>)
		{
			this.m_tabItemsData = value;
			egret.callLater(this.renderDraw,this);
			
		}
		protected renderDraw():void
		{
			var arr = this.toggleArr ;
			var item:ISelect;
			while(arr.length > 0)
			{
				item = <ISelect>arr.shift();
				if(item.parent)
				{
					this.removeChild(<egret.DisplayObjectContainer><any>item);
				}
			}
			arr.length = 0;
			if(this.m_tabItemsData)
			{
				
				var i:number = 0;
				var tabItem:ITabItem;
				var len:number = this.m_tabItemsData.length;
				var itemdata:TabItemData;
				for(i = 0;i< len;i++)
				{
					tabItem = FactoryUtils.onCreateComp(this.m_renderClass);
					tabItem.setSkinName(this.m_renderSkin);
					itemdata = this.m_tabItemsData[i];
					if(itemdata.color) tabItem.setLabelColor(itemdata.color);
					if(itemdata.strokeColor) tabItem.setStrokeColor(itemdata.strokeColor);
					if(itemdata.stroke) tabItem.setStroke(itemdata.stroke);
					if(itemdata.label) tabItem.setLabel(itemdata.label);
					tabItem.setData(itemdata.data);
					this.push(tabItem);
				}
			}
		}
		public hideItemByIndex(index:number):void
		{
			
			if(this.m_hideItemMap.hasOwnProperty(index + '')  == false)
			{
				var arr = this.toggleArr ;
				var item:ITabItem = <ITabItem>arr[index];
				this.m_hideItemMap[index + ''] = item;
				item.removeFromParent();
			}
		}
		public showItemByIndex(index:number):void
		{
			
			if(this.m_hideItemMap.hasOwnProperty(index + '')  == true)
			{
				// var arr = this.toggleArr ;
				var item:ITabItem = <ITabItem>this.m_hideItemMap[index + ''];
				this.addChild(<any>item);
			    delete this.m_hideItemMap[index + ''];
			}
		}
		public onDestroy(): void
        {
			if(this.m_tabItemsData)
			{
				this.m_tabItemsData.length = 0;
				this.m_tabItemsData = null;
			}
			var obj = this.m_hideItemMap;
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					var item:ITabItem  = obj[key];
					item.removeFromParent();
				}
			}
			this.m_hideItemMap = null;
			super.onDestroy();
		}

	}
}