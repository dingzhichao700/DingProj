module game {
	export class SceneWindow extends egret.Sprite {
		protected _map: SceneMapLayer;
		protected _driverLayer: DriverRenderLayer;
		protected _effectLayer: egret.Sprite;

		public constructor() {
			super();
			let self = this;
			self._map = new SceneMapLayer();
			self.addChild(self._map);

			self._driverLayer = new DriverRenderLayer();
			self.addChild(self._driverLayer);

			self._effectLayer = new egret.Sprite();
			self.addChild(self._effectLayer);

			SceneManager.getInstance().initLayer(self._driverLayer, self._map, self._effectLayer);
			MovieRenderManager.getInstance();
			// SceneManager.getInstance().changeMap(1001);
			// let stage: egret.Stage = DLG.DLGCore.stage;
			// stage.addChildAt(self, 0);
			ApplicationManager.topStage.addChildAt(self,0);
		
		}
	
	}
}