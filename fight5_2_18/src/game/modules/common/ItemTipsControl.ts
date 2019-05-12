module game {
	export class ItemTipsControl extends DLG.BaseAction {
		private static _instance: ItemTipsControl

		public goodsId:number;
		public btnType:number;
		public callBackFun:Function;
		public callBackObj:any;
		public callBackArg:Array<any>;
		

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		public static getInstance(): ItemTipsControl {
			let self = this;
			if (!self._instance) {
				self._instance = new ItemTipsControl();
			}
			return self._instance;
		}
		public initTips(goodsId:number,btnType:number,callBackFun:Function,callBackObj:any,callBackArg:Array<any>):void{
            this.goodsId = goodsId;
			this.btnType = btnType;
			this.callBackFun = callBackFun;
			this.callBackObj = callBackObj;
			this.callBackArg = callBackArg;
            DLG.DLGCore.panel.show(PanelClassConfig.ID_TipsPanel);
		}

	}
}