module game {
	export class ItemTipsPanel extends DLG.VPanel {
		protected main: ItemTipsView;

		private _goodsId:number;
		private _btnType:number;
		private _callBackFun:Function;
		private _callBackObj:any;
		private _callBackArg:Array<any>;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}

		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new ItemTipsView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.main.close_btn["img"].source = "common_close_btn1_png";
			self.main.close_btn.setScaleClick(true);
			self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
			
			this.main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this);

			this.updateView();
		}
		public updateView():void{
			this._goodsId = ItemTipsControl.getInstance().goodsId;
			this._btnType = ItemTipsControl.getInstance().btnType;
			this._callBackFun = ItemTipsControl.getInstance().callBackFun;
			this._callBackObj = ItemTipsControl.getInstance().callBackObj;
			this._callBackArg = ItemTipsControl.getInstance().callBackArg;

			let curH:number = 195;
			let curW:number = 410;
			var cfg:GoodsCfg = GoodsTable.getCfgById(this._goodsId) as GoodsCfg;
			this.main.icon_img.source = "goods_"+cfg.id+"_png";
			this.main.name_txt.text = cfg.name;
			this.main.type_txt.text = cfg.typeName;
			this.main.limit_txt.text = cfg.limit;

			if(cfg.type==1){
				this.main.other_box.visible = true;
				this.main.hp_txt.text = "生命：" + cfg.hp;
				this.main.atk_txt.text = "攻击：" + cfg.atk;
				this.main.def_txt.text = "防御：" + cfg.atk;
				curH = 390;
				this.main.des_txt.y = 270;
			}
			else{
				this.main.other_box.visible = false;
				this.main.des_txt.y = 148;
			}
			
			this.main.des_txt.text = cfg.des;
			curH = this.main.des_txt.y + this.main.des_txt.textHeight;

			curH += 20;
			this.main.bg_img.height = curH;
			// this.main.height = curH;

			this.main.btn_box.y = curH - 40;

			this.main.btn_1.setScaleClick(false);

			if(this._btnType == 1){
				this.main.btn_box.visible = true;

				this.main.btn_1.setScaleClick(true);
				this.main.btn_1.setOnClickListener(this, this.wearHandler);
				this.main.btn_1["img"].source = "common_btn3_png";
				// this.main.btn_1.setLabel("穿戴");
				curW = 490;
				this.main.content_box.x = 90;
			}
			else if(this._btnType == 2){
				this.main.btn_box.visible = true;

				this.main.btn_1.setScaleClick(true);
				this.main.btn_1.setOnClickListener(this, this.takeOffHandler);
				// this.main.btn_1.setLabel("卸下");
				this.main.btn_1["img"].source = "common_btn4_png";
				curW = 490;
				this.main.content_box.x = 90;
			}
			else {
				this.main.btn_box.visible = false;
				this.main.content_box.x = 127;
			}

			// this.main.content_box.x = (this.stage.stageWidth - curW)/2;
			// this.main.content_box.y = (this.stage.stageHeight - curH)/2 * 0.8;

		}

		private wearHandler():void{
			if(this._callBackFun){
				this._callBackFun.call(this._callBackObj,this._callBackArg);
			}
			DLG.DLGCore.panel.close(PanelClassConfig.ID_TipsPanel);
		}
		private takeOffHandler():void{
			if(this._callBackFun){
				this._callBackFun.call(this._callBackObj,this._callBackArg);
			}
			DLG.DLGCore.panel.close(PanelClassConfig.ID_TipsPanel);
		}
		private closePanelHandler(e: eui.UIEvent): void {
			DLG.DLGCore.panel.close(PanelClassConfig.ID_TipsPanel);
		}
		
		public onDestroy(): void {
			this._goodsId = 0;
			this._btnType = 0;
			this._callBackFun = null;
			this._callBackObj = null;
			this._callBackArg = null;

			super.onDestroy();
			let self = this;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			
			self.main = undefined;
		}
	}
}