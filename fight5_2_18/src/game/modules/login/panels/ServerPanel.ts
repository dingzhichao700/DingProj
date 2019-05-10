module game {
	export class ServerPanel extends DLG.VPanel {
		protected main: ServerView;
		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new ServerView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.main.loginBg.source = String("loginBg_jpg");
			self.main.btn_start.setOnClickListener(self, self.loginGame);
			self.main.selectServerBtn.setOnClickListener(self, self.selectServerHandle);
		}

		// public onRefresh(): void {
			// super.onRefresh();
		public renderViews():void{
			let self = this;
			let serverId = LoginManager.getInstance().selectServerId;
			if (serverId <= 10) {
				self.main.serverName.text = "内测" + serverId + "区(新服)";
			} else {
				let qus = serverId - 10;
				self.main.serverName.text = "公测" + qus + "区(新服)";
			}
		}

		/**进入游戏 */
		protected loginGame(): void {
			let configData: ServerCfg = ServerTable.getCfgById<ServerCfg>(LoginManager.getInstance().selectServerId);
			let url = configData.config;
			let connectAction:ConnectAction = DLG.FactoryUtils.getClass(ConnectAction);
			connectAction.connect(url);

			// if (DLG.DLGCore.socket.isConnected) {
			// 	LoginManager.getInstance().reqloginForPlatform();
			// }
		}

		/**选区弹框 */
		private selectServerHandle(): void {
			DLG.DLGCore.panel.show(PanelClassConfig.ID_SelectServerPanel);
		}

		public onDestroy(): void {
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