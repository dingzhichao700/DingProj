
module game {
	export class ConnectAction extends DLG.BaseAction {

		// protected needShowCreate: boolean = false;

		public constructor() {
			super();
			this.createSocket();
			this.createClock();
			this.createPanelMar();
		}
		public onExecute(quFu: boolean): void {
			let self = this;
			if (quFu) {
				//显示选择区服界面
				self.m_panelMar.show(PanelClassConfig.ID_ServerPanel);
				let loadMainAction: LoadMainResAction = DLG.FactoryUtils.getClass(LoadMainResAction);
				loadMainAction.onExecute();
			} else {
				if (LoginManager.getInstance().agent == 'test') {
					//显示输入账号界面 
					self.m_panelMar.show(PanelClassConfig.ID_LoginInputPanel);
				}
				else if (LoginManager.getInstance().agent == 'debug') {
					let loadMainAction: LoadMainResAction = DLG.FactoryUtils.getClass(LoadMainResAction);
					loadMainAction.onExecute();
				}
				 else {
					let arr: Array<ServerCfg> = ServerTable.getDataVec<ServerCfg>();
					self.connect(arr[arr.length - 1].config);
					arr.length = 0;
					arr = null;
				}

			}
		}

		/**开始建立网络链接 */
		public connect(url: string): void {
			let self = this;
			self.m_socket.onConnectByUrl(url, self.onConnectSocket, self.onConnectClose, self);
			
		}

		/**成功建立连接 */
		protected onConnectSocket(): void {
			let self = this;
			//注册协议
			HeroManager.getInstance().registProtocol();
			LoginManager.getInstance().registProtocol();
			//发送登陆消息
			LoginManager.getInstance().reqloginForPlatform();
		}

		/**建立链接失败 */
		protected onConnectClose(): void {

		}

		public onDestroy(): void {
			// let self = this;
			// self.needShowCreate = undefined;
			// super.onDestroy();
		}
		


	}
}