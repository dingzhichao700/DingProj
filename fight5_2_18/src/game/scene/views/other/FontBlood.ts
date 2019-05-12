module game {
	export class FontBlood extends DLG.CGroup {
		// private _numbmp: Array<DLG.CImage>;
		// protected _group: DLG.CGroup;
		protected _num: number;
		protected _soureUrl: string;
		public constructor() {
			super();
			// this._numbmp = [];
			let self = this;
			let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
			hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
			hLayout.gap = 0;
			self.layout = hLayout;

			self.anchorOffsetX = 0.5;
			self.anchorOffsetY = 0.5;
			self.scaleX = 0.6;
			self.scaleY = 0.6;
		}
		public static _bloodVec: Array<FontBlood>;
		public static createFontBlood(): FontBlood {
			let self = this;
			if (self._bloodVec.length > 0) {
				return self._bloodVec.shift();
			} else {
				return new FontBlood();
			}
		}
		public setNum(num: number): void {
			let self = this;
			// if (!self._group)
			// {
			// 	self._group = DLG.FactoryUtils.onCreateComp(DLG.CGroup);
			// 	let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
			// 	hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
			// 	if(_gap)
			// 		hLayout.gap = _gap;
			// 	else
			// 		hLayout.gap = 0;
			// 	self._group.layout = hLayout;
			// 	self.addChild(self._group);
			// } else {
			// 	self.visible = true;
			// 	self._group.alpha = 1
			// }
			if (self.visible != true) self.visible = true;
			self._soureUrl = 'Font_Num_json.Font_Num_Cut_Blood_';
			self._num = Math.floor(num);
			self.renderDraw();
		}
		protected renderDraw(): void {
			let self = this;
			if (self._soureUrl) {
				let numStr: string = self._num + "";
				let len: number = numStr.length;
			
				let bmp: DLG.CImage;
				let hasNumChildren: number = self.numChildren;
				let i: number = 0
				for (i; i < len; i++) {
					if (i < hasNumChildren) {
						bmp = <DLG.CImage>self.getChildAt(i);
					} else {
						// if(self._numbmp.length > 0)
						// {
						// 	bmp = self._numbmp.shift();
						// }else{
						bmp = DLG.FactoryUtils.onCreateComp(DLG.CImage);
						// }
					
					}
					let url = self._soureUrl + numStr.slice(i, i + 1) + '_png';
					bmp.source = url;
					if (!bmp.parent)
						self.addChild(bmp);
				
				}
				while (self.numChildren > len) {
					bmp = <DLG.CImage>self.getChildAt(i);
					// self._numbmp.push(bmp);
					bmp.onDestroy();
					bmp.removeFromParent();
				
				}
			}
			egret.callLater(self.doAnimation, self)
		
		
		}
		private doAnimation(): void {
			let self = this;
			// self.validateProperties();
			self.validateNow();
			// self.validateSize();
		
			// self._group.x = -self._group.width / 2;
			// self._group.y = -self._group.height / 2;
			// self._group.anchorOffsetX = 0.5;
			// self._group.anchorOffsetY = 0.5;
			// self._group.scaleX = 0.6;
			// self._group.scaleY = 0.6;

		
			let px1 = 20;
			let px2 = 40;
			if (Math.random() > 0.5) {
				px1 = self.x - px1;
				px2 = self.x - px2;
			} else {
				px1 = self.x + px1;
				px2 = self.x + px2;
			}
			let py = self.y;
			egret.Tween.get(self).to({ x: px1, y: py - 50 }, 200).to({ x: px2, y: py + Math.random() * 40 }, 200).wait(500).to({ alpha: 0 }, 300).call(self.onDestroy, self);
		}
		public onDestroy(): void {
			let self = this;
			self._soureUrl = undefined;
			self._num = undefined;
		
			// if (self)
			// {
			egret.Tween.removeTweens(self);
			
			self.alpha = 1;
			// }
			// self.parent.removeChild(self);
			self.visible = false;
			// self.x = -500;
			self.y = -500;
			FontBlood._bloodVec.push(self);
		}
	}
}