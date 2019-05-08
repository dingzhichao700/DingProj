module game {
	export
		class DriverRenderLayer extends egret.Sprite {
		protected effectDownLayer: egret.Sprite;
		protected monsterLayer: egret.Sprite;
		protected bulletLayer: egret.Sprite;
		protected _wallBmp: egret.Bitmap;
		protected roleLayer: egret.Sprite;
		protected effectUpLayer: egret.Sprite;


		protected _wallLoader: egret.URLLoader;
		
		/**加载中 */
		protected _wallLoadState: number = 0;
		/**加载完成 */
		protected _wallIsReLoad: boolean = false;
		protected _wallId: number;

		public constructor() {

			super();
			let self = this;
			self.effectDownLayer = new egret.Sprite;
			self.addChild(self.effectDownLayer);
			
			self.monsterLayer = new egret.Sprite;
			self.addChild(self.monsterLayer);

			self.bulletLayer = new egret.Sprite;
			self.addChild(self.bulletLayer);
			
			self._wallBmp = new egret.Bitmap();
			self.addChild(self._wallBmp);
			
			self.roleLayer = new egret.Sprite;
			self.addChild(self.roleLayer);

			self.effectUpLayer = new egret.Sprite;
			self.addChild(self.effectUpLayer);

		}
		public addDriver(driver: any, layer: number): void {
			let self = this;
			this.addChild(driver);
			if (layer == ENUM_DriverRenderLayerId.monsterLayer) {
				self.monsterLayer.addChild(driver);
			} else if (layer == ENUM_DriverRenderLayerId.bulletLayer) {
				self.bulletLayer.addChild(driver);
			} else if (layer == ENUM_DriverRenderLayerId.roleLayer) {
				self.roleLayer.addChild(driver);
			}
		}
		public addEffect(effectid:number, playTimes: number, px: number, py: number): void {
			let self = this;
			let effectCfg: EffectCfg = EffectTable.getCfgById<EffectCfg>(effectid);
			let effect: EffectMovie;
			let movieName: string = effectCfg.movie;
			effect = EffectMovie.createEffectMovie(movieName);

			if (effectCfg.layer == 1)
			{
				self.effectDownLayer.addChild(effect);
			} else
			{
				self.effectUpLayer.addChild(effect);
			}	
			
			effect.play(playTimes);
			effect.x = px;
			effect.y = py;
		
		}
		
		public removeDriver(driver: any): void {
			if (driver.parent) {
				driver.parent.removeChild(driver);
			}
		}

		
		public showWall(wallId: number): void
		{
			let self = this;
			if (self._wallId == wallId)
			{
				return;
			}	
			if (!self._wallLoader) {
				self._wallLoader = new egret.URLLoader();
				self._wallLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
			}
			if (self._wallLoadState == 1) {
				self._wallLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
				self._wallLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
			}
			if (self._wallBmp && self._wallBmp.texture) {
				self._wallBmp.texture.dispose();
				self._wallBmp.texture = null;
			}
			let urlRequest: egret.URLRequest = new egret.URLRequest(GAME_PATH.WALL_PATH + 'wall_' + wallId + GAME_PATH.TYPE_PNG);
		
			self._wallLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			self._wallLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
			self._wallLoader.load(urlRequest);
		}
		private onLoadComplete(event: egret.Event): void {
		
			let self = this;
			self._wallLoadState = 2;
			self._wallLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			self._wallLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
		
			let loader: egret.URLLoader = <egret.URLLoader>event.target;
			//获取加载到的纹理对象
			let texture: egret.Texture = <egret.Texture>loader.data;

			self._wallBmp.texture = texture;
			self._wallBmp.x = (GAME_CORE.APP_WIDTH - texture._bitmapWidth )>>1;
			self._wallBmp.y = 660;
		}
		private onLoadError(): void {
			let self = this;
			if (self._wallIsReLoad == false) {
				
				self._wallIsReLoad = true;
				let urlRequest: egret.URLRequest = new egret.URLRequest(GAME_PATH.WALL_PATH + 'wall_' + self._wallId + GAME_PATH.TYPE_JPG);
				self._wallLoader.load(urlRequest);
			} else {
				sayError('城墙加载失败：', self._wallId);
			}
		}
	

	}
}