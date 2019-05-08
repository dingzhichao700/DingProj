class MainUIView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public title_txt:DLG.CLabel;
	public des_txt:DLG.CLabel;

	// public head_icom_img:DLG.CImage;
	// public head_title_img:DLG.CImage;

	/**区服List */
	public mainList: DLG.CList;

	public top_box:DLG.CGroup;
	public bottom_box:DLG.CGroup;

	public top_left:DLG.CGroup;
	public top_right:DLG.CGroup;

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/mainUi/MainUIView.exml";
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