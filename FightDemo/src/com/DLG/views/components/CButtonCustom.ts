module DLG {
	export class CButtonCustom  extends DLG.CComponent implements ISelect{
		protected up_Group: DLG.CGroup;
		protected select_Group:DLG.CGroup;
		/**触发事件区域 */
		// protected click_mc: DLG.CGroup;

		protected m_bEnable: boolean;
		protected m_gray:boolean;

		protected m_pListenerObj: any;
        protected m_pListenerFunc: Function;
        protected m_parame:any;

		protected _isSelect:boolean;

		public constructor() {
			super();
		}
		protected createChildren(): void {
            // var target:any ;
            // if(this.click_mc)
            // {
            //     target = this.click_mc;
            // }else{
                // target = this;
            // }
				let self = this;
            // DLGCore.event.removeEventListener(target);
            // DLGCore.event.addTouchTapListener(target, this, this.onClick);
			self.setScaleClick(false);
            this.m_bEnable = true;
            super.createChildren();
			egret.callLater(this.renderDraw,this);
		}
		public setScaleClick(value: boolean): void{
			var target:any ;
            // if(this.click_mc)
            // {
            //     target = this.click_mc;
            // }else{
                target = this;
            // }

            DLGCore.event.removeEventListener(target);
			if (value)
			{
				DLGCore.event.addTouchScaleListener(target, this, this.onClick);
			} else
			{
				DLGCore.event.addTouchTapListener(target, this, this.onClick);
			}
		}
		protected onClick() {
            if (this.m_bEnable) {
				if (this.m_pListenerFunc) {
					this.m_pListenerFunc.call(this.m_pListenerObj , this.m_parame);
				}
            }
        }
		public setOnClickListener(thisObject: any, listener: Function , parame:any) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        }
		public setLabel(value:string):void{
			throw new Error('CButtonCustom不能使用此方法')
		}
		/**设置是否可以点击 */
		public setEnable(value: boolean):void {
            this.m_bEnable = value;
        }
		/**设置灰度 */
		public setGray(value:boolean):void
		{
			this.m_gray = value;
			egret.callLater(this.renderDraw,this);
		}
		/*灰度 并且不可以点击*/
		public setDisabled(value:boolean):void
		{
			this.m_bEnable = this.m_gray = value;
			egret.callLater(this.renderDraw,this);
		}

		public isSelect():boolean
		{
			return this._isSelect;
		}
		public setSelect(value:boolean):void
		{
			this._isSelect = value;
			egret.callLater(this.renderDraw,this);
		}
		protected renderDraw():void
		{
			let _isSelect:boolean = this._isSelect;
			if(_isSelect)
			{
				if(this.up_Group) this.up_Group.filters = null;
				
				if(this.select_Group)
				{
					if(this.m_gray && this.select_Group.filters == null)
					{
						this.select_Group.filters = [DLGConfig.grayColorFlilter];
					}else{
						this.select_Group.filters = null;
					}
				}	
			}else{
				if(this.up_Group)
				{
					if(this.m_gray && this.up_Group.filters == null)
					{
						this.up_Group.filters = [DLGConfig.grayColorFlilter];
					}else{
						this.up_Group.filters = null;
					}
				}	
				if(this.select_Group && this.select_Group.filters != null) this.select_Group.filters = null;
			}
			if(this.up_Group && this.up_Group.visible == false) this.up_Group.visible = !_isSelect;
			if(this.select_Group && this.select_Group.visible == true) this.select_Group.visible = _isSelect;
		}
		public onDestroy(): void
        {
			var target:any ;
			// if(this.click_mc)
			// {
			// 	target = this.click_mc;
			// }else{
				target = this;
			// }

			DLGCore.event.removeEventListener(target);
			if(this.select_Group) this.select_Group.filters = null;
			if(this.up_Group) this.up_Group.filters = null;
			this.m_pListenerFunc = null;
			this.m_pListenerObj = null;
			this.m_parame = null;
			
			super.onDestroy();
        }
	}
}