module game {
	export class WeaponItem extends DLG.CItemRenderer {
		public static onCallBack: Function;
		public static onCallTarget: any;

		public info: WeaponInfo;

		private icon_img:DLG.CImage; 
		private new_icon:DLG.CImage;
		private icon_lock:DLG.CImage;
		private title_img:DLG.CImage;
		private name_img:DLG.CImage;
		private label_txt:eui.Label;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/weapon/WeaponItemSkin.exml";
			DLG.DLGCore.event.addEventListener(this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
		}

		public dataChanged(): void {
			super.dataChanged();
			var self = this;
			if (self.isInitView == false) {
				return
			}
			self.info = self.data;
			self.title_img.visible = self.info ? true :false;
			// self.label_txt.visible = self.info ? true :false;
			self.label_txt.visible = false;
			self.icon_lock.visible = self.info ? false :true;
			
			if(self.info){
				// self.label_txt.text = self.info.name;
				self.new_icon.visible = self.info.isNew;
				self.icon_img.source = "head_icon"+ self.info.weaponId +"_png";
				self.name_img.source = "weapon_title_"+ self.info.weaponId +"_png";
			}
			else{
				self.new_icon.visible = false;
				// self.label_txt.text = "";
				self.icon_img.source = null;
				self.name_img.source = null;
			}
		}

		protected onBtnTouchHandler(): void {
			if (WeaponItem.onCallBack) {
				WeaponItem.onCallBack.call(WeaponItem.onCallTarget,this.info,this.itemIndex);
			}
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}