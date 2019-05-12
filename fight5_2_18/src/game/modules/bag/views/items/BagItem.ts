module game {
	export class BagItem extends DLG.CItemRenderer {
		public modelId: number;
		private label_txt: DLG.CLabel;
		private bg_img:DLG.CImage;
		private icon_img:DLG.CImage;
		private icon_lock:DLG.CImage;
		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/bag/BagItemSkin.exml";
			DLG.DLGCore.event.addEventListener(this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
		}

		public dataChanged(): void {
			super.dataChanged();
			var self = this;
			if (self.data == null) {
				return;
			}
			if (self.isInitView == false) {
				return
			}
			self.modelId = self.data;
			self.icon_lock.visible = self.modelId<0;
			if(self.modelId<0){
				self.label_txt.text = "";
				self.icon_img.source = null;
			}
			else if(self.modelId ==0){
				self.label_txt.text = "";
				self.icon_img.source = null;
			}
			else{
				self.label_txt.text = self.modelId+"";
				self.icon_img.source = "goods_"+self.modelId+"_png";
			}
		}

		protected onBtnTouchHandler(): void {
			if(this.modelId<=0)
				return;
			ItemTipsControl.getInstance().initTips(this.modelId,0,null,null,null);
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}