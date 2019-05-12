class MissionResultView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public close_btn:DLG.CButton;
	public list: DLG.CList;


	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/mission/MissionResultViewSkin.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		let self = this;
		self.isLoad = true;
		self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);

		self.close_btn["img"].source = "mission_result_btn_png";

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