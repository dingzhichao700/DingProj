module game {
	export class RoleItem extends DLG.CItemRenderer {
		public static onCallBack: Function;
		public static onCallTarget: any;

		public info: RoleVo;
		private icon_img:DLG.CImage;
		private icon_title: DLG.CImage;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/wuHun/RoleItemSkin.exml";
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
				self.icon_title.source = "wuHun_head_title_"+ self.info.wuHunLv +"_png";
				self.icon_img.source = "wuHun_head_"+ self.info.modelId +"_png";
			}
			else{
				self.icon_title.source = null;
				self.icon_img.source = null;
			}
		}

		protected onBtnTouchHandler(): void {
			if (RoleItem.onCallBack) {
				RoleItem.onCallBack.call(RoleItem.onCallTarget,this.info,this.itemIndex);
			}
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}