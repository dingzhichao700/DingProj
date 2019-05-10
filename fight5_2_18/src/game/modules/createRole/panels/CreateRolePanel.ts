module game {
	export class CreateRolePanel extends DLG.VPanel {
		protected main: CreateRoleView;
		/**选中的职业 */
		protected selectJob: number = 1;
		/**选中职业的性别  1为男 2 为女*/
		protected selectSex: number = 1;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new CreateRoleView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
		}
		protected initView(): void {
			super.initView();
			let self = this;
			self.main.selectJobList.itemRenderer = SelectJobItem;
			let jobArray: Array<number> = [1, 2];
			self.main.selectJobList.dataProvider = new eui.ArrayCollection(jobArray);
			self.main.selectJobList.selectedIndex = 0;//默认选中第一个职业
			self.main.btn_create.setOnClickListener(self, self.onCreateRole);
			self.main.btn_random.setOnClickListener(self, self.onRandomName);

		}

		// public onRefresh(): void {
			// super.onRefresh();
		public renderViews():void{
			let self = this;
			let index: number = self.main.selectJobList.selectedIndex;
			if (index == 0) {
				self.selectJob = 1;
				self.selectSex = 1;
				self.main.jobModel.source = "jobMan0_png";
			} else {
				self.selectJob = 2;
				self.selectSex = 2;
				self.main.jobModel.source = "jobWoman1_png";
			}
			self.onRandomName();
		}

		/**创建角色 */
		protected onCreateRole(): void {
			let self = this;
			//发送创角消息
			if (self.main.inputName.text.length <= 0) {
				return;
			}
			let sendData = new GCreateCharacterM();
			sendData.name = self.main.inputName.text;
			sendData.sex = self.selectSex;
			sendData.auto = self.selectJob;
			sendData.icon = "brid";
			DLG.DLGCore.socket.onSend(CmdCode.REQ_CreateCharacter, sendData);
		}

		/**随机取一个名字 */
		protected onRandomName(): void {
			let self = this;
			let jobNameAction:JobNameAction = DLG.FactoryUtils.getClass(JobNameAction);
			self.main.inputName.text = jobNameAction.getRandomName(self.selectSex);
		}

		public onDestroy(): void {
			super.onDestroy();
			let self = this;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			DLG.FactoryUtils.removeClass(JobNameAction);
			self.main = undefined;
		}
	}
}