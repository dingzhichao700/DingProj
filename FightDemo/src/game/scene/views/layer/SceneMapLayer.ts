module game {
	export class SceneMapLayer extends egret.DisplayObjectContainer {
		protected _mapBmp: egret.Bitmap;
		protected _mapLoader: egret.URLLoader;
		protected _mapname: string;
		protected _sceneId: number;
		/**加载中 */
		protected _loadState: number = 0;
		/**加载完成 */
		protected _isReLoad: boolean = false;

		public callBack: Function;
		public callBackTarget: any;
	
		// protected _mapRequest:egret.URLRequest
		public constructor() {
			super();
			let self = this;
			if (!self._mapLoader) {
				self._mapLoader = new egret.URLLoader();
				self._mapLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
			}
			self._mapBmp = new egret.Bitmap();
			self._mapBmp.x = 0;
			self._mapBmp.y =  320;
			self.addChild(self._mapBmp);
		}
		public loadMap(mapname: string,sceneId:number): void {
			let self = this;
			if (self._mapname == mapname) {
				return;
			}
		
			if (self._loadState == 1) {
				self._mapLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
				self._mapLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
			}
			if (self._mapBmp && self._mapBmp.texture) {
				self._mapBmp.texture.dispose();
				self._mapBmp.texture = null;
			}
			self._sceneId = sceneId;
			self._mapname = mapname;
			self._isReLoad = false;
		

			let urlRequest: egret.URLRequest = new egret.URLRequest(GAME_PATH.MAP_PATH + mapname + GAME_PATH.TYPE_JPG);
		
			self._mapLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			self._mapLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
			self._mapLoader.load(urlRequest);
		}
		private onLoadComplete(event: egret.Event): void {
		
			let self = this;
			self._loadState = 2;
			self._mapLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
			self._mapLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
		
			let loader: egret.URLLoader = <egret.URLLoader>event.target;
			//获取加载到的纹理对象
			let texture: egret.Texture = <egret.Texture>loader.data;
			self._mapBmp.texture = texture;

			

			if (self.callBack) {
				self.callBack.call(self.callBackTarget);
			}
		}
	

		private onLoadError(): void {
			let self = this;
			if (self._isReLoad == false) {
				
				self._isReLoad = true;
				let urlRequest: egret.URLRequest = new egret.URLRequest(GAME_PATH.MAP_PATH + self._mapname + GAME_PATH.TYPE_JPG);
				self._mapLoader.load(urlRequest);
			} else
			{
				sayError('地图加载失败：', self._mapname);
			}	
		}
		public getMapName(): string {
			return this._mapname;
		}
	}
}