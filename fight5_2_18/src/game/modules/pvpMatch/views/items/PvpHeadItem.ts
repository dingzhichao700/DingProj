class PvpHeadItem {
	private _main: eui.Component
	private _w: number;
	private _h: number;
	private _info:FightInfo;

	private bg_img: DLG.CImage;
	private icon_img: DLG.CImage;
	private icon_title: DLG.CImage;
	private label_txt: DLG.CLabel;

	public constructor(main: eui.Component) {
		this._main = main;

		this.bg_img = this._main["bg_img"];
		this.icon_img = this._main["icon_img"];
		this.label_txt = this._main["label_txt"];
		this.icon_title = this._main["icon_title"];



	}

	public updateView(info:FightInfo): void {
		this._info = info;
		this.icon_img.source = "pvp_head_"+ this._info.sex +"_png";
		this.icon_title.source = "pvp_lv_img_png";
		this.label_txt.text = this._info.name;
	}
	

}