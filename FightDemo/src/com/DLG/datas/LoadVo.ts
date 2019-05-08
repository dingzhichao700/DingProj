module DLG {
	export class LoadVo {

		protected _imageLoader: egret.ImageLoader;
		protected _url: string;
	
		protected _loadCallBack: Array<Function>;
		protected _loadCallBackTarget: Array<any>;

		protected _reLoad: boolean;

		public constructor() {
			
		}
		public load(url: string, loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			self._loadCallBack = [];
			self._loadCallBackTarget = [];
			self._url = url;
			self._loadCallBack.push(loadCallBack);
			self._loadCallBackTarget.push(loadCallBackTarget);

			this.loadTexture();
		}
		public addCallBack(loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			self._loadCallBack.push(loadCallBack);
			self._loadCallBackTarget.push(loadCallBackTarget);
		}

		private onLoadJsonError(): void {

		}
		protected loadTexture(): void {
			let self = this;
			if (!self._imageLoader)
			{
				self._imageLoader = new egret.ImageLoader();
				self._imageLoader.addEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
				self._imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
			}	
			self._reLoad = false;
			self._imageLoader.load(self._url);
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
			DLG.DLGCore.loader.addData(self._url, bitmapData);
			let i: number = 0;
			let len: number = self._loadCallBack.length;
			for (i = 0; i < len; i++) {
				self._loadCallBack[i].call(self._loadCallBackTarget[i], self._url, bitmapData);
			}
			self._loadCallBack = null;
			self._loadCallBackTarget = null;
			DLG.DLGCore.loader.returnLoadVo(self);
		}

		private onLoadTextureError(): void {
			let self = this;
			if (self._reLoad == true)
			{
				self._imageLoader.removeEventListener(egret.Event.COMPLETE, self.onLoadTextureComplete, self);
				self._imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, self.onLoadTextureError, self);
				self._imageLoader = undefined;
				DLG.DLGCore.loader.returnLoadVo(self);
				self._loadCallBack = null;
				self._loadCallBackTarget = null;
				sayError('加载资源出错', self._url);
			} else
			{
				self._reLoad = true;
				self._imageLoader.load(self._url);
			}	
		}
	
	}
}