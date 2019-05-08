class BarItem {
	private _main: eui.Component
	private _w: number;
	private _h: number;

	private _bgImg: DLG.CImage;
	private _barImg: DLG.CImage;
	private _bar_point: DLG.CImage;
	private _labTxt: DLG.CLabel;

	public constructor(main: eui.Component) {
		this._main = main;

		this._bgImg = this._main["bg_img"];
		this._barImg = this._main["bar_img"];
		this._bar_point = this._main["bar_point"];
		this._labTxt = this._main["lab_txt"];
	}

	public updateView(cur: number, max: number,show:boolean=true,gap:number=30): void {
		cur = Math.min(cur,max);
		this._labTxt.text = show ? (cur + "/" + max) : "";
		this._barImg.width = cur/max*(this._bgImg.width - gap);
		if(this._bar_point){
			this._bar_point.x =  cur/max*this._bgImg.width - 28;
		}
	}
	
	public set bgSkin(str:string){
		this._bgImg.source = str;
	}
	public set barSkin(str:string){
		this._barImg.source = str;
	}
}