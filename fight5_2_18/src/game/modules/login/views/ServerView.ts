class ServerView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	/**开始按钮 */
	public btn_start: DLG.CBmpButton;
	/**背景图 */
	public loginBg: DLG.CBigImage;
	/**服务器名字 */
	public serverName: DLG.CLabel;
	/**选区按钮 */
	public selectServerBtn: DLG.CButton;
	/**选区Group */
	public serverGroup: DLG.CGroup;


	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/login/Server.exml";
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