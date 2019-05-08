class AddItem {
	private _main: eui.Component
	private _w: number;
	private _h: number;
	private _onLoadCallBack: Function;
	private _onLoadCallTarget: any;

	private _bgImg: DLG.CImage;
	private _labTxt: DLG.CLabel;
	private _btn: DLG.CButton;

	public constructor(main: eui.Component, onLoadCallBack: Function, onLoadCallTarget: any) {
		this._main = main;
		this._onLoadCallBack = onLoadCallBack;
		this._onLoadCallTarget = onLoadCallTarget;

		this._bgImg = this._main["bg_img"];
		this._labTxt = this._main["lab_txt"];
		this._btn = this._main["add_btn"];

		this._btn.setScaleClick(true);
		this._btn.setOnClickListener(this, this.clickHandler);
	}

	public updateView(cur: number, max: number): void {
		this._labTxt.text = cur + "/" + max;
	}
	private clickHandler(): void {
		if (this._onLoadCallBack) {
			this._onLoadCallBack.call(this._onLoadCallTarget);
		}
	}

	public set Width(v: number) {
		this._w = v;
		this._main.width = this._w;

		this._bgImg.width = v;
		this._labTxt.width = v - this._btn.width;
		this._btn.x = this._labTxt.width;

	}
	public set Height(v: number) {
		this._h = v;
		this._main.height = v;

		this._bgImg.height = v;
		this._labTxt.y = (v - this._labTxt.height) / 2;
		this._btn.y = (v - this._btn.height) / 2;
	}
	public set btnSkin(str:string){
		this._btn["img"].source = str;
	}
}