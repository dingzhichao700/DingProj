class WuHunItem {
	private _main: eui.Component
	private icon_img: DLG.CImage;

	public constructor(main: eui.Component) {
		this._main = main;
		this.icon_img = this._main["icon_img"];
	}

	public updateView(open:boolean,itemId1:number): void {
		this.icon_img.source = open ? "goods_"+ itemId1 +"_png" : "wuHun_add_icon_png";
	}
	
}