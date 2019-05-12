module game {
	export class MissionItem extends DLG.CItemRenderer {
		public vo: MissionVo;
		private _missionCfg:SceneCfg;
		private bg_img: DLG.CImage;
		private mask_img: DLG.CImage;
		private label_txt1: DLG.CLabel;
		private label_txt2: DLG.CLabel;
		private arrow_img: DLG.CImage;

		private _plus:number=1;

		public constructor() {
			super();
			let self = this;
			self.skinName = "resource/skins/mission/MissionItemSkin.exml";
			DLG.DLGCore.event.addEventListener(this, egret.TouchEvent.TOUCH_TAP, self, self.onBtnTouchHandler);
		}

		public dataChanged(): void {
			super.dataChanged();
			var self = this;
			if (self.data == null) {
				return;
			}
			if (self.isInitView == false) {
				return
			}
			self.arrow_img.visible = self.itemIndex==0 && !MissonIManager.getInstance().clickFirstMission;
			if(self.arrow_img.visible){
				self.addTween();
			}
			else{
				egret.Tween.removeTweens(this.arrow_img);
			}
			self.vo = self.data;
			if (self.vo) {
				self._missionCfg = SceneTable.getCfgById<SceneCfg>(self.vo.missionId);
				self.mask_img.visible = !self.vo.open;
				self.label_txt1.text = self._missionCfg.name;
				self.label_txt2.text = self._missionCfg.age;
				self.bg_img.source = self.vo.pass ? "mission_bg2_png" : "mission_bg1_png";
			}
			else {
				self.mask_img.visible = false;
				self.label_txt1.text = "";
				self.label_txt2.text = "";
				self.bg_img.source = "mission_bg1_png";
			}
		}
		private addTween():void{
			let self = this;
			let px = self.arrow_img.x;
			self._plus *=-1;
			let targetX:number = px + self._plus*30;
			egret.Tween.get(self.arrow_img).to({x: targetX }, 500).call(self.addTween,self);
		}

		protected onBtnTouchHandler(): void {
			if(this.vo && this.vo.open){
				if(this.itemIndex == 0){
					MissonIManager.getInstance().clickFirstMission = true;	
				}	
				MissonIManager.getInstance().enterMission(this.vo.missionId);
			}
		}

		public onDestroy(): void {
			egret.Tween.removeTweens(this.arrow_img);
			super.onDestroy();
		}
	}
}