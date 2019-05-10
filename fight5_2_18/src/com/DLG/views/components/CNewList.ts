module DLG {
	export class CNewList extends CGroup{
		private _itemRender: any;
		private _selectIndex: number = -1;
		protected m_pListenerObj: any;
        protected m_pListenerFunc: Function;
		protected m_parame: any;
		protected m_showScroll: boolean;
		protected m_scrollBar:eui.Scroller
		
		public constructor() {
			super();
		}
		
		protected createChildren(): void {
			super.createChildren();
			let self = this;
			while (self.numChildren > 0) {
				self.removeChildAt(0);
			}
			self.setLayout(new eui.VerticalLayout());
		}
		/**回调处理方法 */
        public setOnChangeListener(thisObject: any, listener: Function , parame:any) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
		}
		public onShowScroll(value:boolean): void{
			this.m_showScroll = value;
		}
		public setItemRenderer(item: any): void
		{
			this._itemRender = item;
		}
		public dataProvider(arr: Array<any>): void
		{
			let self = this;
			while (self.numChildren > 0) {
				FactoryUtils.onReturnComp(self.removeChildAt(0))
			}
			self._data = arr;
			let i: number = 0;
			// let arr = self._data;
			let len:number = arr.length;
			for( i=0; i < len ; i++)
			{
				let item:ISelect = FactoryUtils.onCreateComp(self._itemRender);
				item.setData(arr[i]);
				self.addChild(item);
				item.setOnClickListener(self,self.selectHandler,i);
			}
		}
		protected selectHandler(index:number):void
		{
			this.selectedIndex = index;
		}
		public set selectedIndex(index:number)
		{
			let self = this;
			self._selectIndex = index;
			var item:ISelect;
			var i:number = 0;
			var len:number = self.numChildren;
			for(i = 0;i< len;i++)
			{
				item = <ISelect>self.getChildAt(i);
				if(i == index)
				{
					// if(item.isSelect() == false )
					// {
						if (this.m_pListenerFunc) {
							this.m_pListenerFunc.call(this.m_pListenerObj, index , this.m_parame);
						}
					// }
					
					item.setSelect(true);
				}else
				{
					item.setSelect(false);
				}
			}
		}
		public get selectedIndex(): number
		{
			return this._selectIndex;
		}
		public setLayout(layout:any): void
		{
			let self = this;
			self.layout = layout;
		}
		public setAlign(value:string):void
		{
			let self = this;
			let _layout = <eui.VerticalLayout>self.layout;
			_layout.horizontalAlign = value;
		}
		/**设置间隔 */
		public setGap(value:number):void
		{
			let self = this;
			let _layout:eui.VerticalLayout = <eui.VerticalLayout>self.layout;
			_layout.gap = value;

		}
		protected renderDraw(): void {
			
			
		}
		public onDestroy(): void {
			let self = this;
			self.m_pListenerFunc = null;
            self.m_pListenerObj = null;
            self.m_parame = null;
			self._itemRender = null;
			super.onDestroy();
		}
	}
}