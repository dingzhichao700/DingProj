class SkillVmcView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public vmc_box:DLG.CComponent;

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/loading/SkillVMCSkin.exml";
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