module DLG {
/**
 * 只是位图按钮，只处理最基本的点击。
 */
	export class CBmpButton extends CComponent implements IButton
	{
		protected up_mc: any;
		/**触发事件区域 */
		// protected click_mc: DLG.CGroup;

		protected m_bEnable: boolean;
		protected m_gray:boolean;

		protected m_pListenerObj: any;
        protected m_pListenerFunc: Function;
        protected m_parame:any;


		public constructor() {
			super();
			// this.skinName = "resource/skin/main/StartBtn.exml";
		}

		protected createChildren(): void {
            super.createChildren();
			this.setScaleClick(false);
            this.m_bEnable = true;
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
		public setLabel(value:string):void{
			throw new Error('CBmpButton不能使用此方法')
		}
		public setOnClickListener(thisObject: any, listener: Function , parame?:any) {
            this.m_pListenerObj = thisObject;
            this.m_pListenerFunc = listener;
            this.m_parame = parame;
        }
		protected onClick() {
            if (this.m_bEnable) {
				if (this.m_pListenerFunc) {
					if(this.m_parame == undefined)
					{
						this.m_pListenerFunc.call(this.m_pListenerObj);
					}else
					{
						this.m_pListenerFunc.call(this.m_pListenerObj , this.m_parame);
					}
				}
            }
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
		protected renderDraw():void
		{
			if(this.up_mc)
			{
				if(this.m_gray && this.up_mc.filters == null)
				{
					this.up_mc.filters = [DLGConfig.grayColorFlilter];
				}else{
					this.up_mc.filters = null;
				}
			}	
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
			if(this.up_mc) this.up_mc.filters = null;
			this.m_pListenerFunc = null;
			this.m_pListenerObj = null;
			this.m_parame = null;
			super.onDestroy();
        }
	}
}