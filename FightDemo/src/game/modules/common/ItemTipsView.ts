class ItemTipsView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public bg_img:DLG.CImage;
	public icon_bg_img:DLG.CImage;
	public icon_img:DLG.CImage;

	public name_txt:DLG.CLabel;
	public type_txt:DLG.CLabel;
	public limit_txt:DLG.CLabel;

	public other_box:DLG.CGroup;
	public btn_box:DLG.CGroup;

	public content_box:DLG.CGroup;
	

	
	public hp_txt:DLG.CLabel;
	public atk_txt:DLG.CLabel;
	public def_txt:DLG.CLabel;
	public des_txt:DLG.CLabel;

	public btn_1:DLG.CButton;
	public close_btn:DLG.CButton;


	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/common/ItemTipsSkin.exml";
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