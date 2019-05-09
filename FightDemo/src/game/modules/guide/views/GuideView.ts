class GuideView extends DLG.CComponent {
	public onLoadCallBack: Function;
	
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public icon_img:DLG.CImage;
	public arrow_img:DLG.CImage;

	public content_box:DLG.CGroup;

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/guide/GuidSkinView.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		// let name = jobNameAction.getRandomName(self.selectSex);
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