class WuHunView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public back_btn: DLG.CButton;
	public close_btn: DLG.CButton;
	public tipLab: DLG.CButton;

	public list: DLG.CList;
	public wuhun_img: DLG.CImage;


	public item_1: DLG.CComponent;
	public item_2: DLG.CComponent;
	public item_3: DLG.CComponent;
	public item_4: DLG.CComponent;
	public item_5: DLG.CComponent;
	public item_6: DLG.CComponent;

	public attr_hp: DLG.CLabel;
	public attr_atk: DLG.CLabel;
	public attr_def: DLG.CLabel;

	public skill_icom: DLG.CImage;

	public score_100: DLG.CImage;
	public score_10: DLG.CImage;
	public score_1: DLG.CImage;

	public strength_btn: DLG.CButton;
	public bag_btn: DLG.CButton;


	public item1: WuHunItem;
	public item2: WuHunItem;
	public item3: WuHunItem
	public item4: WuHunItem
	public item5: WuHunItem
	public item6: WuHunItem

	public constructor() {
		super();
		let self = this;
		self.skinName = "resource/skins/wuHun/WuHunView.exml";
		self.addEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);
	}

	/** 创建完成*/
	public createCompleteEvent(event: eui.UIEvent): void {
		let self = this;
		self.isLoad = true;
		self.removeEventListener(eui.UIEvent.CREATION_COMPLETE, self.createCompleteEvent, self);

		this.item1 = new WuHunItem(self.item_1);
		this.item2 = new WuHunItem(self.item_2);
		this.item3 = new WuHunItem(self.item_3);
		this.item4 = new WuHunItem(self.item_4);
		this.item5 = new WuHunItem(self.item_5);
		this.item6 = new WuHunItem(self.item_6);

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