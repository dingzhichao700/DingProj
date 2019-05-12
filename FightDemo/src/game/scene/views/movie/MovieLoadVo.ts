module game {
	export class MovieLoadVo {
		protected _josnLoader: egret.URLLoader;
		protected _imageLoader: egret.ImageLoader;
		protected _urlRequest: egret.URLRequest
		protected _url: string;
		protected _jsonObj: Object;
		protected _loadCallBack: Array<Function>;
		protected _loadCallBackTarget: Array<any>;

		protected _jsonReLoad:boolean
		protected _imageReLoad:boolean

		public constructor() {
			let self = this;
			self._josnLoader = new egret.URLLoader();
			self._josnLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
		}
		public load(url: string, loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			self._loadCallBack = [];
			self._loadCallBackTarget = [];
			self._url = url;
			self._loadCallBack.push(loadCallBack);
			self._loadCallBackTarget.push(loadCallBackTarget);
			if (!self._urlRequest)
			{
				self._urlRequest = new egret.URLRequest(url + GAME_PATH.TYPE_JSON);
			} else
			{
				self._urlRequest.url = url + GAME_PATH.TYPE_JSON;
			}	
			self._jsonReLoad = false;
			self._imageReLoad = false;
			self._josnLoader.addEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
			self._josnLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
			self._josnLoader.load(self._urlRequest);
			
		}
		public addCallBack(loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			self._loadCallBack.push(loadCallBack);
			self._loadCallBackTarget.push(loadCallBackTarget);
		}
		private onLoadJsonComplete(event: egret.Event): void {
		
			let self = this;
	
			self._josnLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
			self._josnLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
		
			let loader: egret.URLLoader = <egret.URLLoader>event.target;
			self._jsonObj = JSON.parse(loader.data);
			// self.unbindJosn();

			this.loadTexture();
		}
		private onLoadJsonError(): void {
			let self = this;
			if (self._jsonReLoad == true)
			{
				self._josnLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadJsonComplete, self);
				self._josnLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadJsonError, self);
				MovieLoadManager.getInstance().returnMovieLoadVo(self);
				self._loadCallBack = null;
				self._loadCallBackTarget = null;
				sayError('加载资源出错', self._url);
			} else
			{
				self._jsonReLoad = true;
				self._josnLoader.load(self._urlRequest);
			}	
		}
		protected loadTexture(): void {
			let self = this;
			if (!self._imageLoader) {
				self._imageLoader = new egret.ImageLoader();
				self._imageLoader.addEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
				self._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
			}
			self._imageLoader.load(self._url + GAME_PATH.TYPE_PNG);
		}
		private onLoadTextureComplete(event: egret.Event): void {
		
			let self = this;
		
			self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
			self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
			self._imageLoader = undefined;
			let loader: egret.ImageLoader = <egret.ImageLoader>event.target;
			//获取加载到的纹理对象
			let bitmapData: egret.BitmapData = loader.data;
			//创建纹理对象
			// self._skinTexture = new egret.Texture();
			// self._skinTexture.bitmapData = bitmapData;
			MovieLoadManager.getInstance().addData(self._url, self._jsonObj, bitmapData);
			let i: number = 0;
			let len: number = self._loadCallBack.length;
			for (i = 0; i < len; i++) {
				self._loadCallBack[i].call(self._loadCallBackTarget[i], self._url, self._jsonObj, bitmapData);
			}
			MovieLoadManager.getInstance().returnMovieLoadVo(self);
			self._loadCallBack = null;
			self._loadCallBackTarget = null;
		}

		private onLoadTextureError(): void {
			let self = this;
			if (self._imageReLoad == true)
			{
				self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
				self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
				self._imageLoader = undefined;
				MovieLoadManager.getInstance().returnMovieLoadVo(self);
				self._loadCallBack = null;
				self._loadCallBackTarget = null;
				sayError('加载资源出错', self._url);
			} else
			{
				self._imageReLoad = true;
				self._imageLoader.load(self._url);
			}
		}
	
	}
}