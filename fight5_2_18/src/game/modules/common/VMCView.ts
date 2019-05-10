module game {
	export class VMCView extends egret.Sprite {

		/**播放间隔(单位：毫秒)*/
		private _interval: number = 0;
		private _inters: Array<number>;
		private offset: Array<Array<number>>;
		private _poseProgress: number = -1;
		private _count: number = 0;
		private _isPlaying: boolean = false;
		private _url: string = null;
		private _actName: string = null;

		private _direct: number = 0;

		private _completeFunc: Function;
		private _completeObj: any;


		private _repeat: boolean = false;
		private _lastPoseTime: number = 0;
		private _poseInfo: Object = null;
		private _playInterMultiple: number = 1;

		private _offsetX: number = 0;
		private _offsetY: number = 0;

		private _vmcHeight: number = 0;
		private _dirName: number = null;


		/********************************************* */
		/**显示当前侦位图 */
		protected _skinRenderBmp: egret.Bitmap;
		protected _renderTexture: egret.RenderTexture
		/**切图区域 */
		protected _rect: egret.Rectangle;
		/**源图集 */
		protected _skinBitMap: egret.Bitmap;
		protected _framesObj: any;

		private _autoDestory: boolean;

		public constructor() {
			super();
			// this.once(egret.Event.ADDED_TO_STAGE, onDisplay, this);
		}
		public destroy(): void {
			this.stop();
			if (this._skinRenderBmp){
				if(this._skinRenderBmp.parent)
				this._skinRenderBmp.parent.removeChild(this._skinRenderBmp);
				this._skinRenderBmp = null;
			}
		}



		/**
		*播放动作，这个函数是这个类最主要的对外接口，调用后不必调用play了，play是动作没有变的情况下stop之后恢复播放用的
		*@param _url 动作地址.传.json文件地址进来
		*@param dir 方向,一般角色是0度向上，特效是0度向右
		*@param repeat 是否循环播
		*@param actName 动作名
		*@param completeFunc
		*@param completeObj 
		*/
		public updatePose(url: string, dir: number, repeat: boolean, autoDestory: boolean, actName: string, completeFunc: Function, completeObj: any): void {
			if (!url)
				return;
			let self = this;
			if (!self._rect)
				self._rect = new egret.Rectangle();

			if (!self._skinRenderBmp)
				self._skinRenderBmp = new egret.Bitmap();
			this.addChild(self._skinRenderBmp);

			if (!self._renderTexture)
				self._renderTexture = new egret.RenderTexture();

			self._autoDestory = autoDestory;
			if (!self._skinBitMap) {
				self._skinBitMap = new egret.Bitmap();
			}
			this._direct = this.getTargetAnglt(dir);
			this._repeat = repeat;
			if (actName == "") {
				this._actName = null;
			}
			this._actName = actName ? actName.replace("90", Math.abs(this._direct).toString()) : Math.abs(this._direct).toString();
			this._completeFunc = completeFunc;
			this._completeObj = completeObj;


			this._poseInfo = null;
			this._interval = 0;

			this._poseProgress = -1;
			this._count = 0;


			// let loadvo: VMCLoadVo = new VMCLoadVo();
			// loadvo.load(_url, self.loadCfgComplete, self);


			self._url = 'resource/movie/effect/' + url + "/1";
			let loadMar: MovieLoadManager = MovieLoadManager.getInstance();
			let arr = loadMar.getRes(self._url);
			if (arr) {
				self.loadCfgComplete(self._url, arr[0], arr[1]);
			} else {
				MovieLoadManager.getInstance().load(self._url, self.loadCfgComplete, self);
			}
		}
		private loadCfgComplete(url: string, josnObj: Object, bitmapData: egret.BitmapData): void {

			this._poseInfo = josnObj;
			this._skinBitMap.$bitmapData = bitmapData;
			if (!this._poseInfo) {
				return;
			}
			this._inters = this._poseInfo["cfgs"]["inter"];
			if (((this._poseInfo["cfgs"]["offset"]) instanceof Array)) {
				this.offset = this._poseInfo["cfgs"]["offset"];
			} else {
				this.offset = this._poseInfo["cfgs"]["offset"][this._actName];
				if (!this.offset) {
					var arr;
					for (var $each_arr in this._poseInfo["cfgs"]["offset"]) {
						arr = this._poseInfo["cfgs"]["offset"][$each_arr];
						this.offset = arr;
					}
				}
			}
			if (this.offset && this.offset.length > 0 && (typeof (this.offset[0][0]) == 'string')) {
				// for(var i=0;i<this.offset.length;++i){
				// 	var arr=this.offset[i];
				// 	if(arr.length!=2)
				// 		continue ;
				// 	if((typeof (arr[0])=='string'))arr[0]=parseFloat(arr[0]);
				// 	if((typeof (arr[1])=='string'))arr[1]=parseFloat(arr[1]);
				// }
			};
			var cfgsScale = this._poseInfo["cfgs"]["scale"] ? this._poseInfo["cfgs"]["scale"] : 1;
			this._vmcHeight = Math.abs(this.offset[0][1]) * cfgsScale;
			this._dirName = this._poseInfo["dirName"];

			this._offsetX = (this._poseInfo["cfgs"]["offsetX"] ? parseFloat(this._poseInfo["cfgs"]["offsetX"]) : 0) * cfgsScale;
			this._offsetY = parseFloat(this._poseInfo["cfgs"]["offsetY"]);
			this._framesObj = this._poseInfo["frames"];

			this._count = this.offset.length;

			this.startPlay();

		}
		/**
		*播放动画。
		*/
		public play(): void {
			this._isPlaying = true;
			if (!this._poseInfo) {
				return;
			}
			this.startPlay();
		}
		private startPlay(): void {
			if (!this._isPlaying) {
				return;
			}
			this._lastPoseTime = egret.getTimer();
			this._poseProgress = -1
			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
		}

		public loop(): void {
			if (!this._isPlaying)
				return;
			var nowTime = egret.getTimer();
			if (this._lastPoseTime == 0 || nowTime - this._lastPoseTime > 1000) {
				this._lastPoseTime = nowTime;
				this.nextFrame();
			} else {
				var oldUrl = this._url;
				while (nowTime - this._lastPoseTime > this._interval) {
					this._lastPoseTime += this._interval > 0 ? this._interval : 30;
					this.nextFrame();
					if (!this._isPlaying || this._url != oldUrl) {
						return;
					}
				}
			}
		}

		public nextFrame(): void {
			if (this._count <= 0)
				return;
			var isOver = false;
			if (this._poseProgress < this._count - 1) {
				++this._poseProgress;
			} else {
				if (this._repeat)
					this._poseProgress = 0;
				else
					isOver = true;
			}

			this.paint();
			if (isOver) {
				if (this._completeFunc != null) {
					this._completeFunc.apply(this._completeObj);
					this._completeFunc = null;
				}
				this.stop();
				if (this._autoDestory) {
					this.recover();
				}
			}
		}

		private recover(): void {
			this.stop();
			if (this.parent) {
				this.parent.removeChild(this);
			}
		}

		public stop(): void {
			var isPlayingBefore = this._isPlaying;
			this._isPlaying = false;

			let stage: egret.Stage = DLG.DLGCore.stage;
			stage.removeEventListener(egret.Event.ENTER_FRAME, this.loop, this);
		}
		private getTargetAnglt(dir: number): number {
			if (isNaN(dir)) {
				return dir;
			};
			var targetDir = dir % 360;
			targetDir = (targetDir + 360) % 360;
			if (targetDir >= 180)
				targetDir = targetDir - 360;
			return targetDir;
		}
		public paint(): void {
			let self = this;
			let frameData: any = self._framesObj[this._actName + "_" + self._poseProgress + ".png"];
			let frame: any = frameData ? frameData.frame : null;
			self._rect.x = frame ? frame.x : 0;
			self._rect.y = frame ? frame.y : 0;
			self._rect.width = frame ? frame.w : 0;
			self._rect.height = frame ? frame.h : 0;

			//使用 RenderTexture 进行显示
			// self._renderTexture.drawToTexture(new egret.Bitmap(self._skinBitMap), self._rect);
			self._renderTexture.drawToTexture(self._skinBitMap, self._rect);
			//将绘制好的 RenderTexture 进行显示
			let bmp: egret.Bitmap = self._skinRenderBmp;
			if (bmp.$bitmapData) bmp.$bitmapData.$dispose();
			if (bmp.texture) bmp.texture = null;
			bmp.texture = self._renderTexture;


			bmp.width = self._rect.width;
			bmp.height = self._rect.height;

			bmp.rotation = 0;
			bmp.x = this.offset[self._poseProgress][0];
			bmp.y = this.offset[self._poseProgress][1];

			this.countInter();
		}



		private countInter() {
			if (!this._inters || this._inters.length == 0)
				return;
			this._interval = this._inters[this._poseProgress];
			if (this._playInterMultiple != 1) {
				this._interval = Math.ceil(this._interval * this._playInterMultiple);
			}
		}



	}
}