module game {
	export class SelectBtnItem extends DLG.CItemRenderer {
		public serverId: number;
		public static onCallBack: Function;
		public static onCallTarget: any;
		/**区服类别 */
		public serverType: DLG.CLabel;
		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/login/SelectBtn.exml";
			DLG.DLGCore.event.addEventListener(self, egret.TouchEvent.TOUCH_TAP, self, self.onSelfClick);
		}

		public dataChanged(): void {
			var self = this;
			if (self._data == null) {
				return;
			}
			if (self.isInitView == false) {
				return;
			}
			self.serverType.text = this.data + "";
		}

		protected onSelfClick(): void {
			if (SelectBtnItem.onCallBack) {
				SelectBtnItem.onCallBack.call(SelectBtnItem.onCallTarget);
			}
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}