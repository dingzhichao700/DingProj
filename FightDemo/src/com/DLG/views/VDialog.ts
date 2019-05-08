enum ALERT_BUTTON
{
    ALERT_OK = 1,
    ALERT_NO = 1<<1,
    ALERT_CANCEL = 1<<2,
}
module DLG {
	/**
	 *
	 * @author 
	 *
	 */
	export class VDialog extends VPanel {
        protected titleLabel:CLabel;
        protected btnClose:IButton;

        protected btnOk:IButton;
        protected btnNo:IButton;
        protected btncancel:IButton;
        /**富文本 */
        protected m_pRichlabel:CRichText;

        public funcCallBack:Function;


        protected titleStr:string;
        protected btns:number = 0;
        protected btnTexts:string[];
        protected showClose = false;

		public constructor() {
    		super(0,null);
   
		}
        public onShow(skinName:string , btns:number , titleStr:string , btnText?:string[] , showClose?:boolean): void {
			super.onShow();
            this.titleStr = titleStr; 
            this.btns = btns;
            if(DEBUG)
            {
                if(btnText && btnText.length < 3)
                {
                    throw new Error('按钮的文本必须一一对应，ok , no ， cancel');
                }
            }
            this.btnTexts = btnText;
            this.skinName = skinName;

            this.onCreate();
        }
		
        protected onCreate():void
		{
            var self = this;
            var btns = self.btns;
            if(btns > 0)
            {
                if((btns & 0x6)  == 0)
                {
                    self.btnOk.removeFromParent();
                    self.btnOk.onDestroy();
                }
                if((btns >> 1 & 0x2)  == 0)
                {
                    self.btnNo.removeFromParent();
                    self.btnNo.onDestroy();
                }
                if((btns >> 1)  == 0)
                {
                    self.btncancel.removeFromParent();
                    self.btncancel.onDestroy();
                }
            }
            if(self.btnTexts)
            {
                if(self.btnOk.parent) self.btnOk.setLabel(self.btnTexts[0]);
                if(self.btnNo.parent) self.btnNo.setLabel(self.btnTexts[1]);
                if(self.btncancel.parent) self.btncancel.setLabel(self.btnTexts[2]);
            }

            self.m_pRichlabel.textAlign = true;
            
            if(self.titleStr){
                self.titleLabel.text = this.titleStr;
            }

            if(this.btnClose) this.btnClose.visible = this.showClose;
           

            DLGCore.event.addTouchScaleListener(this.btnOk, this, this.okClick);
            DLGCore.event.addTouchScaleListener(this.btnNo, this, this.noClick);
            DLGCore.event.addTouchScaleListener(this.btnClose, this, this.closeClick);
            DLGCore.event.addTouchScaleListener(this.btncancel, this, this.closeClick);

        }
        
        private okClick(event: egret.Event):void{
            var callback:Function = this.funcCallBack;
            this.closeClick();
            if(callback) {
               callback(true);
            }
        }

        private noClick(event: egret.Event): void {
            var callback:Function = this.funcCallBack;
            this.closeClick();
            if(callback) {
               callback(false);
            }
        }
        
        private closeClick():void{
            this.m_pRichlabel = null;

            this.funcCallBack = null;
            // UpManager.history(false);
        }
        
        public onDestroy():void{
            this.m_pRichlabel = null;
            this.funcCallBack = null;
            this.btnTexts = null;
            super.onDestroy();
        }

    }
}
