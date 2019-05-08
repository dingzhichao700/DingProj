module game {
	export class LoadMainResAction extends DLG.BaseAction {
		protected RES_MAIN: string = 'main';
		protected isLoadMain: boolean = false;

		// protected RES_CreateRole: string = 'createRole';
		// protected RES_Login: string = 'login';

		public constructor() {
			super();
		}
		public onExecute(): void {
			let self = this;
			// if (type == 1) {
			// 	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onCreateLoadComplete, self);
			// 	RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onCreateLoadError, self);
			// 	// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
			// 	RES.loadGroup(self.RES_Login);
			// } else if (type == 2) {
			if (self.isLoadMain == false) {
				DLG.DLGCore.panel.show(PanelClassConfig.ID_LoadPanel);
				let loadPanel: LoadPanel = DLG.DLGCore.panel.getPanelById(PanelClassConfig.ID_LoadPanel) as LoadPanel;
				loadPanel.startLoad(0,self.loadPanelOk,self);

				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
				RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
				// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
				RES.loadGroup(self.RES_MAIN);

				DLG.Utils.getZipResByUrl(GAME_PATH.ZIP, this.onConfigDataComplete, this, RES.ResourceItem.TYPE_BIN);
			}
			// } else if (type == 3)
			// {
			// 	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
			// 	RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
			// 	// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
			// 	RES.loadGroup(self.RES_CreateRole);
			// }	
		}
		// private onCreateLoadComplete(event: RES.ResourceEvent): void {
		// 	let self = this;
		// 	if (event.groupName == self.RES_Login) {
		// 		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onCreateLoadComplete, self);
		// 		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onCreateLoadError, self);
		// 		DLG.DLGCore.panel.show(PanelClassConfig.ID_ServerPanel);
		// 	}
		// }
		/**
		 * 资源组加载出错
		 * Resource group loading failed
		 */
		// private onCreateLoadError(event: RES.ResourceEvent): void {
		// 	debug("Group:" + event.groupName + " has failed to load");
		// }
		// protected loadGameZip(): void
		// {
		//     DLG.Utils.getZipResByUrl(GAME_PATH.ZIP,this.onConfigDataComplete,this,RES.ResourceItem.TYPE_BIN);
		// }
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
			LoginManager.getInstance().loadZip = true;
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
			if(LoginManager.getInstance().loadZip && LoginManager.getInstance().loadMainRes && LoginManager.getInstance().loadPanelShowOk)
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