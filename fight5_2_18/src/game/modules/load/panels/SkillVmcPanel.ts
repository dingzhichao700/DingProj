module game {
	export class SkillVmcPanel extends DLG.VPanel {

		public static VmcConfig: Object = [
			[{ "path": "anqi_xj_01", "x": 300, "y": 400, "dalay": 0,"scaleX":2,"scaleY":2 }, { "path": "anqi_xj_02", "x": 300, "y": 400, "dalay": 0,"scaleX":2,"scaleY":2 }, { "path": "anqi_xj_03", "x": 300, "y": 400, "dalay": 0,"scaleX":2,"scaleY":2 }],
			[{ "path": "anqi_lxz_01", "x": 300, "y": 400, "dalay": 0 ,"scaleX":2,"scaleY":2}, { "path": "anqi_lxz_02", "x": 300, "y": 400, "dalay": 0,"scaleX":2,"scaleY":2 }, { "path": "anqi_lxz_03", "x": 300, "y": 400, "dalay": 0,"scaleX":2,"scaleY":2 }]
		]

		protected main: SkillVmcView;
		private _curTime: number;
		private _maxTime: number;
		private _loadCompeltedFun: Function;
		private _loadCompeltedObj: any;

		private _timeOutKeyArr: Array<number>;
		private _allVmcNum: number;

		public constructor(panelId: number, fromPanelid?: string) {
			super(panelId);
		}
		
		public onShow(...arg): void {
			super.onShow(...arg);
			let self = this;
			self.main = new SkillVmcView();
			self.addChild(self.main);
			self.main.onLoadCallBack = self.initView;
			self.main.onLoadCallTarget = self;
			self._timeOutKeyArr = [];
		}

		protected initView(): void {
			super.initView();
			this._timeOutKeyArr.length = 0;
			this._allVmcNum = 0;

			var radom: number = Math.random() < 0.5 ? 0 : 1;
			var cfgArr: Array<Array<Object>> = SkillVmcPanel.VmcConfig[radom];
			for (let i: number = 0; i < cfgArr.length; i++) {
				let obj: Object = cfgArr[i];

				this._allVmcNum++;
				let effect: VMCView = new VMCView();
				effect.updatePose(obj["path"], 90, false, true, "", this.vmcPlayEnd, this);
				effect.play();
				this.main.vmc_box.addChild(effect);
				effect.x = obj["x"];
				effect.y = obj["y"];
				effect.scaleX = obj["scaleX"];
				effect.scaleY = obj["scaleY"];
				this._timeOutKeyArr.push(egret.setTimeout(effect.play, effect, obj["dalay"]) );
			}
		}

		private vmcPlayEnd(): void {
			this._allVmcNum--;
			if (this._allVmcNum <= 0) {
				if(this.main && this.main.vmc_box)
					this.main.vmc_box.removeChildren();
				DLG.DLGCore.panel.close(PanelClassConfig.ID_SkillVmcPanel);
			}
		}

		public onDestroy(): void {
			this.main.vmc_box.removeChildren();
			while(this._timeOutKeyArr.length> 0 ){
				let key :number = this._timeOutKeyArr.pop();
				egret.clearTimeout(key);
			}

			super.onDestroy();
			let self = this;
			self._loadCompeltedFun = null;
			self._loadCompeltedObj = null;
			if (self.main) {
				self.main.onLoadCallBack = undefined;
				self.main.onLoadCallTarget = undefined;
				self.main.onDestroy();
			}
			self.main = undefined;
		}

	}
}