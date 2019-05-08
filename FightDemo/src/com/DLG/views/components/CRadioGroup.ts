module DLG {
	export class CRadioGroup extends CGroup
	{
		protected toggleArr:Array<ISelect>;
		protected m_pListenerObj: any;
        protected m_pListenerFunc: Function;
        protected m_parame:any;
		 /**是否数据改变的时候才会去触发回调 */
        public changeDataTouchListener:boolean = true;
		protected selectIndex:number = -1;
		/**检测是否可以点击的方法 */
		protected _checkCanClickFunc:Function
		protected _checkCanClickFuncObj:any;

		public constructor() {
			super();
		}
		protected createChildren(): void {

			super.createChildren();
			this.toggleArr = [];
			var arr = this.toggleArr ;
			var i:number = 0;
			var len:number = this.numChildren;
			for(i = 0;i< len;i++)
			{
				if(DEBUG)
				{
					if(egret.is(this.getChildAt(i) , 'DLG.ISelect') == false)
					{
						throw new Error("CCRadioGroup 只能存放ISelect组件");
					}
				}
				var item:ISelect = <ISelect><any>this.getChildAt(i);
				arr.push(item);
				item.setOnClickListener(this,this.selectHandler,arr.length - 1);
			}
		}
		/**回调处理方法 */
        public setOnChangeListener(thisObject: any, listener: Function , parame:any) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        }
		/**设置选择索引 */
		public setIndex(select:boolean , index:number):void
		{
			var arr = this.toggleArr ;
			var i:number = 0;
			var len:number = arr.length;
			var item:ISelect;
			var oldSelectIndex = this.selectIndex;
			var _checkCanClickFunc = this._checkCanClickFunc;
			if(_checkCanClickFunc)
			{
				var can:boolean = _checkCanClickFunc.call(this._checkCanClickFuncObj , index);
				if(can == false)
				{
					return;
				}
				
			}
			for(i = 0;i< len;i++)
			{
				item = <ISelect>arr[i];
				if(i == index)
				{
					if(item.isSelect() == false || this.changeDataTouchListener == false)
					{
						if (this.m_pListenerFunc) {
							this.m_pListenerFunc.call(this.m_pListenerObj, index , this.m_parame);
						}
					}
					this.selectIndex = i;
					item.setSelect(true);
				}else
				{
					item.setSelect(false);
				}
			}
		}
		public push(item:ISelect):void
		{
			var arr = this.toggleArr ;
			arr.push(item);
			item.setOnClickListener(this,this.selectHandler,arr.length - 1);
		}
		public getItem(index:number):ISelect
		{
			var item:ISelect = this.toggleArr[index];
			return item;
		}
		public checkCanClickFuncArr( func:Function , target:any):void
		{
			this._checkCanClickFunc = func;
			this._checkCanClickFuncObj = target;
		}

		protected selectHandler(index:number):void
		{
			this.setIndex(true , index);
		}

		public onDestroy(): void
        {
			var arr = this.toggleArr ;
			var item:ISelect;
			while(arr.length > 0)
			{
				this.parent
				item = <ISelect>arr.shift();
				if(item.parent)
				{
					this.removeChild(<egret.DisplayObjectContainer><any>item);
				}
			}
			arr = null;
			this.m_pListenerFunc = null;
            this.m_pListenerObj = null;
            this.m_parame = null;

			this._checkCanClickFunc = null;
			this._checkCanClickFuncObj = null;

			super.onDestroy();

        }
	}
}