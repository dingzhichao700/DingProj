module game {
	export class MovieLoadManager {

		protected _movieDataMap: Object;
		/**正在加载中的资源 */
		protected _movieLoadMap: Object;
		protected _loadVoPoolArr: Array<MovieLoadVo>;

		private static _instance: MovieLoadManager;
		public static getInstance(): MovieLoadManager {
			let self = this;
			if (!self._instance) {
				self._instance = new MovieLoadManager();
			}
			return self._instance;
		}
	
		public constructor() {
			this.init();
		}

		protected init(): void {
			let self = this;
			self._loadVoPoolArr = [];
			self._movieLoadMap = {};
			self._movieDataMap = {};
		}

		public getRes(url: string): Array<any> {
			let self = this;
			if (self._movieDataMap.hasOwnProperty(url)) {
				return self._movieDataMap[url];
			}
			return null;
		}

		public load(url: string, loadCallBack: Function, loadCallBackTarget: any): void {
			let self = this;
			if (self._movieDataMap.hasOwnProperty(url)) {
				let arr = self._movieDataMap[url];
				loadCallBack.call(loadCallBackTarget, url, arr[0], arr[1]);
				return;
			}
			let loadvo: MovieLoadVo;
			if (self._movieLoadMap.hasOwnProperty(url)) {
				loadvo = self._movieLoadMap[url];
				loadvo.addCallBack(loadCallBack, loadCallBackTarget);
				return;
			}
		
			if (self._loadVoPoolArr.length > 0) {
				loadvo = self._loadVoPoolArr.pop();
			} else {
				loadvo = new MovieLoadVo();
			}
			loadvo.load(url, loadCallBack, loadCallBackTarget);
			self._movieLoadMap[url] = loadvo;
		}

		public addData(url: string, jsonObj: Object, bitmapData: egret.BitmapData): void {
			let self = this;
			self._movieDataMap[url] = [jsonObj, bitmapData];
		}

		public returnMovieLoadVo(vo: MovieLoadVo): void {
			this._loadVoPoolArr.push(vo)
		}
	
	}
}