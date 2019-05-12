module game {
	export class LoginInputPanel extends DLG.VPanel {
		protected main: LoginInputView;
		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new LoginInputView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.y = 250;
			self.main.confirmBtn.setScaleClick(true);
			self.main.confirmBtn.setOnClickListener(self, self.showLoginView);
		}

		/**显示选区界面 */
		protected showLoginView(): void {
			let self = this;
			if (self.main.userName.text.length <= 0) {
				return;
			}
			LoginManager.getInstance().loginUserName = self.main.userName.text;
			LoginManager.getInstance().agentPlusdata = self.main.password.text;
			DLG.DLGCore.panel.close(PanelClassConfig.ID_LoginInputPanel);
			//显示选择区服界面
			DLG.DLGCore.panel.show(PanelClassConfig.ID_ServerPanel);
			
			let loadMainAction: LoadMainResAction = DLG.FactoryUtils.getClass(LoadMainResAction);
			loadMainAction.onExecute();
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