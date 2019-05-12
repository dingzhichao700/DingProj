module game {
	export class CreateRoleView extends DLG.CComponent {
		public onLoadCallBack: Function;
		public onLoadCallTarget: any;
		public isLoad: boolean;

		/**开始游戏按钮 */
		public btn_create: DLG.CBmpButton;
		/**输入名字 */
		public inputName: DLG.CTextInput;
		/**角色模型图片 */
		public jobModel: DLG.CImage;
		/**随机角色名按钮 */
		public btn_random: DLG.CBmpButton;
		/**选择角色List */
		public selectJobList: DLG.CList;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/createRole/CreateRole.exml";
			self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
		}

		/** 创建完成*/
		public createCompleteEvent(event: eui.UIEvent): void {
			let self = this;
			self.isLoad = true;
			self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
			if (self.onLoadCallBack) {
				self.onLoadCallBack.call(self.onLoadCallTarget);
			}
		}
		public onDestroy(): void {
			let self = this;
			self.onLoadCallBack = null;
			self.onLoadCallTarget = null;
			self.isLoad = null;
			super.onDestroy();
		}

	}
}