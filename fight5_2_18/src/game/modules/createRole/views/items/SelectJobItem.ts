module game {
	export class SelectJobItem extends DLG.CItemRenderer {
		/**职业头像 */
		private jobIcon: DLG.CImage;
		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/createRole/SelectJobItem.exml";
			DLG.DLGCore.event.addEventListener(this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
		}

		public dataChanged(): void {
			var self = this;
			if (self._data == null) {
				return;
			}
			if (self.isInitView == false) {
				return;
			}
			if (self.data == 1) {
				self.jobIcon.source = "CreateRole_json.CreateRole_HeroIcon_1_png";
			} else {
				self.jobIcon.source = "CreateRole_json.CreateRole_HeroIcon_2_png";
			}
		}

		protected onBtnTouchHandler(): void {
			let rolePanel: DLG.IPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_CreateRolePanel);
			rolePanel.onRefresh();
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}