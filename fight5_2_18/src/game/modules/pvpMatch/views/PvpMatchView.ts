class PvpMatchView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	/**** */
	public back_btn: DLG.CButton;
	public close_btn: DLG.CButton;
	public tipLab: DLG.CButton;
	/**** */
	public pvp_time: DLG.CLabel;
	public pvp_title_txt: DLG.CLabel;
	public pvp_match_lab: DLG.CLabel;
	public pvp_winTimes: DLG.CLabel;
	public pvp_resTimes: DLG.CLabel;
	public vip_btn: DLG.CButton;

	private item1: eui.Component;
	private item2: eui.Component;
	private barItem: eui.Component;
	private addItem: eui.Component;
	/**** */
	public headItem1:PvpHeadItem;
	public headItem2:PvpHeadItem;
	public bar:BarItem;
	public addCom:AddItem;
	/**** */
	/*** */

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/pvpMatch/PvpMatchViewSkin.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		let self = this;
		self.isLoad = true;
		self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);

		self.vip_btn["img"].source = "pvp_btn_png";
		self.bar = new BarItem(this.barItem);
		self.headItem1 = new PvpHeadItem(self.item1);
		self.headItem2 = new PvpHeadItem(self.item2);
		
		
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