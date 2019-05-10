class MainUIView extends DLG.CComponent {
	public onLoadCallBack: Function;
	public onLoadCallTarget: any;
	public isLoad: boolean;

	public title_txt:DLG.CLabel;
	public des_txt:DLG.CLabel;

	// public head_icom_img:DLG.CImage;
	private imgHand:DLG.CImage;

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

		this.tweenCurse();
	}

	private tweenCurse():void {
		let scale:number = 2;
		egret.Tween.get(this.imgHand).to({scaleX:scale, scaleY:scale, alpha:0.2}, 500).call(this.tweenDelay,this);
	}

	private tweenDelay():void {
		this.imgHand.scaleX = this.imgHand.scaleY = 1;
		this.imgHand.alpha = 1;
		this.tweenCurse();
	}

	public onDestroy(): void {
		let self = this;
		self.onLoadCallBack = null;
		self.onLoadCallTarget = null;
		self.isLoad = null;
		super.onDestroy();
	}
}