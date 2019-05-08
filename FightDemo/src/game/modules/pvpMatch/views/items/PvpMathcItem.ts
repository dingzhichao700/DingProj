module game {
	export class PvpMathcItem extends DLG.CItemRenderer {
		public info: RoleVo;
		private icon_img:DLG.CImage;
		private label_txt: DLG.CLabel;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/weapon/PvpMathcItemSkin.exml";
			DLG.DLGCore.event.addEventListener(this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
		}

		public dataChanged(): void {
			super.dataChanged();
			var self = this;
			if (self.isInitView == false) {
				return
			}
			self.info = self.data;
			if(self.info){
				self.label_txt.text = self.info.name;
				self.icon_img.source = "wuHun_json.wuHun_head_"+ self.info.sex +"_png";
			}
			else{
				self.label_txt.text = "";
				self.icon_img.source = null;
			}
		}

		protected onBtnTouchHandler(): void {
			
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}