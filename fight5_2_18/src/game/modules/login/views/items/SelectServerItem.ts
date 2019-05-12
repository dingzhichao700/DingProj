module game {
	export class SelectServerItem extends DLG.CItemRenderer {
		public serverId: number;
		/**区服名字 */
		private serverName: DLG.CLabel;
		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/login/SelectServerItem.exml";
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
			self.serverId = self.data.serverId;
			if (self.data.serverId <= 10) {
				self.serverName.text = "内测" + this.data.serverId + "区";
			} else {
				self.serverName.text = "公测" + (this.data.serverId - 10) + "区";
			}
		}

		protected onBtnTouchHandler(): void {
			let self = this;
			LoginManager.getInstance().selectServerId = self.serverId;
			DLG.DLGCore.panel.close(PanelClassConfig.ID_SelectServerPanel);
			let serverPanel: DLG.IPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_ServerPanel);
			serverPanel.onRefresh();
		}

		public onDestroy(): void {
			super.onDestroy();
		}
	}
}