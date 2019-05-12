class MissionView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	/**** */
	public back_btn: DLG.CButton;
	public close_btn: DLG.CButton;
	public tipLab: DLG.CButton;
	/**** */
	public list: DLG.CList;
	public vip_btn:DLG.CButton;
	private addItem: eui.Component;
	/**** */
	public addCom:AddItem;
	
	
	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/mission/MissionViewSkin.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		let self = this;
		self.isLoad = true;
		self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);

		self.vip_btn["img"].source = "mission_btn_png";
		if (self.onLoadCallBack) {
			self.onLoadCallBack.call(self.onLoadCallTarget);
		}
	}
	public initview(onAddCallBack: Function, onAddCallTarget: any):void{
		let self = this;
		self.addCom = new AddItem(self.addItem,onAddCallBack,onAddCallTarget);
	}
	

	public onDestroy(): void {
		let self = this;
		self.onLoadCallBack = null;
		self.onLoadCallTarget = null;
		self.isLoad = null;
		super.onDestroy();
	}
}