module DLG {
	export class LoadManager {

		protected _bmpDataMap: Object;
		/**正在加载中的资源 */
		protected _movieLoadMap: Object;
		protected _loadVoPoolArr: Array<LoadVo>;
		public constructor() {
			this.init();
		}

	
		protected init(): void {
			let self = this;
			self._loadVoPoolArr = [];
			self._movieLoadMap = {};
			self._bmpDataMap = {};
		}
		public getRes(url: string): egret.BitmapData {
			let self = this;
			if (self._bmpDataMap.hasOwnProperty(url)) {
				return self._bmpDataMap[url];
			}
			return null;
		}
		public load(url: string, loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			if (self._bmpDataMap.hasOwnProperty(url)) {
				loadCallBack.call(loadCallBackTarget, url, self._bmpDataMap[url]);
				return;
			}
			let loadvo: LoadVo;
			if (self._movieLoadMap.hasOwnProperty(url)) {
				loadvo = self._movieLoadMap[url];
				loadvo.addCallBack(loadCallBack, loadCallBackTarget);
				return;
			}
		
			if (self._loadVoPoolArr.length > 0) {
				loadvo = self._loadVoPoolArr.pop();
			} else {
				loadvo = new LoadVo();
			}
			loadvo.load(url, loadCallBack, loadCallBackTarget);
			self._movieLoadMap[url] = loadvo;
		}
		public addData(url: string, bitmapData: egret.BitmapData): void {
			let self = this;
			self._bmpDataMap[url] = bitmapData;
		}
		public returnLoadVo(vo: LoadVo): void {
			this._loadVoPoolArr.push(vo)
		}
	
	}
}