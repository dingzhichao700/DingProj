module game {
	export class HpBar extends egret.Sprite {
		private _barBg: egret.Bitmap;
		private _bar: egret.Bitmap;
		private _barWidth: number;
		public constructor() {
			super();
		}
		public showStyle(_style: number = 1): void {
			let self = this;
			if (_style == 1) {
				self._barBg = new egret.Bitmap(RES.getRes('Main_json.Main_HP_Bg_png'));
				self._bar = new egret.Bitmap(RES.getRes('Main_json.Main_HP_Red_png'));
				self.addChild(self._barBg);
				self.addChild(self._bar);
				self._barBg.x = -self._barBg.width / 2;
				self._bar.x = self._barBg.x + 1;
				self._barWidth = self._barBg.width - 2;
			}
		}
		public setValue(value: number, max: number): void {
			let self = this;
			self._bar.width = Math.floor(value / max * self._barWidth)
		}
	}
}