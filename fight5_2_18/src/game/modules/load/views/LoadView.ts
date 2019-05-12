class LoadView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public loginBg:DLG.CBigImage;
	public loginBg1:DLG.CBigImage;
	public loginBg2:DLG.CBigImage;
	public bar:BarItem;
	private barItem: eui.Component;

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/loading/LoadViewSkin.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		let self = this;
		self.isLoad = true;
		self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);

		self.bar = new BarItem(this.barItem);
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