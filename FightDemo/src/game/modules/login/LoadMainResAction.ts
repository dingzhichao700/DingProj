module game {
	export class LoadMainResAction extends DLG.BaseAction {

		protected RES_MAIN: string = 'main';
		protected isLoadMain: boolean = false;

		private loadCount:number;
		private cfg_list: Array<string>;

		public static global_json: string = 'cfg_Global.json';
		public static lan_json: string = 'cfg_Lan.json';
		public static monster_json: string = 'cfg_Monster.json';
		public static bullet_json: string = 'cfg_Bullet.json';
		public static skill_json: string = 'cfg_skill.json';
		public static scene_json: string = 'cfg_Scene.json';
		public static goods_json: string = 'cfg_goods.json';
		public static buff_json: string = 'cfg_buff.json';
		public static effect_json: string = 'cfg_effect.json';

		public constructor() {
			super();
		}
		
		public onExecute(): void {
			let self = this;
			if (self.isLoadMain == false) {
				DLG.DLGCore.panel.show(PanelClassConfig.ID_LoadPanel);
				let loadPanel: LoadPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_LoadPanel) as LoadPanel;
				loadPanel.startLoad(0,self.loadPanelOk,self);

				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
				// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
				RES.loadGroup(self.RES_MAIN);

				// DLG.Utils.getZipResByUrl(GAME_PATH.ZIP, this.onConfigDataComplete, this, RES.ResourceItem.TYPE_BIN);
				this.cfg_list =  [LoadMainResAction.lan_json,
								LoadMainResAction.global_json,
								LoadMainResAction.monster_json,
								LoadMainResAction.bullet_json,
								LoadMainResAction.skill_json,
								LoadMainResAction.scene_json,
								LoadMainResAction.goods_json,
								LoadMainResAction.buff_json,
								LoadMainResAction.effect_json];
				this.loadCount = 0;
				this.loadCfg();
			}
		}

		private loadCfg(): void {
			let url:string = this.cfg_list[this.loadCount];
			RES.getResByUrl(GAME_PATH.CONFIG + url, this.onCfg, this, RES.ResourceItem.TYPE_JSON);
		}

		private onCfg(data): void {
			let _name:string = this.cfg_list[this.loadCount];
			_name = _name.replace('.json', "_json");
			CfgData.setCfgData(_name, data);
			this.loadCount++;
			if(this.loadCount >= this.cfg_list.length){
				LoginManager.getInstance().cfgLoaded = true;
				LoginManager.getInstance().checkComeInGame();
				this.allOk();
			} else {
				this.loadCfg();
			}
		}

		private onConfigDataComplete(zip: any): void {
			for (var key in zip) {
				if (zip.hasOwnProperty(key)) {
					var element = zip[key];
					if (element.name.indexOf('.') != -1) {
						let _name = element.name.replace('config/', "");
						_name = _name.replace('.json', "_json");
						CfgData.setDataByUrl(_name, element.asText());
					}
				}
			}
			LoginManager.getInstance().cfgLoaded = true;
			LoginManager.getInstance().checkComeInGame();
			this.allOk();
		}

		private onMainLoadComplete(event: RES.ResourceEvent): void {
			let self = this;
			if (event.groupName == self.RES_MAIN) {
				RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
				RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
				// RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
			
				LoginManager.getInstance().loadMainRes = true;
				LoginManager.getInstance().checkComeInGame();
				this.allOk();
			}
		}

		private loadPanelOk():void{
			LoginManager.getInstance().loadPanelShowOk = true;
			this.allOk();
		}

		private allOk():void{
			if(LoginManager.getInstance().cfgLoaded && LoginManager.getInstance().loadMainRes && LoginManager.getInstance().loadPanelShowOk)
				SceneManager.getInstance().loadIngPanelOk();
		}

		/**
		 * 资源组加载出错
		 * Resource group loading failed
		 */
		private onMainLoadError(event: RES.ResourceEvent): void {
			sayError("Group:" + event.groupName + " has failed to load");
		}

	}
}