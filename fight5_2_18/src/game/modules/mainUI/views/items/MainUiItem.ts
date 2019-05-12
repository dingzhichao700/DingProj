module game {
	export class MainUiItem extends DLG.CItemRenderer {
		public tabId: number;
		public btn: DLG.CButton;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/mainUi/MainUITabBarItem.exml";
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
			self.btn.setScaleClick(true);
			self.btn.setOnClickListener(self, self.onBtnTouchHandler);
			self.tabId = self.data.tabId;
			self.btn["img"].source = self.data.img;
		}

		protected onBtnTouchHandler(): void {
			let self = this;
			MainUIManager.getInstance().selectTabId = self.tabId;
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}