module game {
	export class LoginInputView extends DLG.CComponent {
		public onLoadCallBack: Function;
		public onLoadCallTarget: any;
		public isLoad: boolean;
		/**服务器输入文本框 */
		public serverId: DLG.CTextInput;
		/**用户名输入文本框 */
		public userName: DLG.CTextInput;
		/**密码输入文本框 */
		public password: DLG.CTextInput;
		/**确定按钮 */
		public confirmBtn: DLG.CButton;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/login/LoginInput.exml";
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