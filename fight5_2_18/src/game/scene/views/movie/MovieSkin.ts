module game {
	export class MovieSkin extends egret.DisplayObjectContainer {
		protected _movieName: string;
		protected _path: string;
		protected _url: string;

		/**显示当前侦位图 */
		protected _skinRenderBmp: egret.Bitmap;
		protected _renderTexture: egret.RenderTexture
		/**切图区域 */
		protected _rect: egret.Rectangle;
	
		/**图集 */
		protected _skinBitMap: egret.Bitmap;
	
		// protected _jsonObj: Object;
		protected _poses: string[];
		/**加载状态 */
		protected _loadEnd: boolean = false;

		protected _totalFrame: number = 0;
		protected _playFrame: number = 0;

		protected _direction: number;
		protected _action: number;

		public onPlayFrameCallBack: Function;
		public onPlayFrameTaget: any;
		protected _isStop: boolean;
		

		public constructor(showMovie:boolean) {
			super();
			let self = this;
			self.touchEnabled = false;
			self.setShowMovie(showMovie);

		}
		public setShowMovie(value: boolean): void
		{
			let self = this;
			if (value == true)
			{
				if (!self._skinRenderBmp) {
					self._skinRenderBmp = new egret.Bitmap();
					self.addChild(self._skinRenderBmp);
				}
				if(!self._renderTexture) self._renderTexture = new egret.RenderTexture();
				if(!self._rect) self._rect = new egret.Rectangle();
				if(!self._skinBitMap) self._skinBitMap = new egret.Bitmap();
			} else
			{
				
			}	
		}
		// protected _isPlay: boolean = false;
		// public play(): void
		// {
		// 	let self = this;
		// 	self._isPlay = true;
		// }
		// public stop(): void
		// {
		// 	let self = this;
		// 	self._isPlay = false;
		// }
		public setDirection(value: number): void {
			let self = this;
			self._direction = value;
			// if (self._action != undefined && self._movieName && self._path)
			// {
			// 	self._playIndex = 0;
			// 	self.loadMovie();
			// }
		}
		public setAction(value: number): void {
			let self = this;
			if (self._action != value) {
				self._action = value;
				// if (self._direction && self._movieName && self._path)
				// {
				// 	self._playIndex = 0;
				// 	self.loadMovie();
				// }
			}
		}
		public goToAndStop(frame: number): void {
			let self = this;
			self._isStop = true;
			self._playFrame = frame
			if (self._loadEnd == false) {
				// self._playIndex = index;
				return;
			}

			self.renderSkin(frame, true);
		
			if (self.onPlayFrameCallBack) {
				self.onPlayFrameCallBack.call(self.onPlayFrameTaget, frame, self._totalFrame);
			}
		}
		public nextFrame(): void {
			let self = this;
			if (self._isStop == true) {
				return;
			}
			if (self._loadEnd == false) {
				self._playFrame++;
				return;
			}
			// if (self._playIndex > self._totalFrame)
			// {
			// 	//加载完后，设置在播放点上
			// 	self._playIndex = self._playIndex % self._totalFrame;
			// 	self.renderSkin(self._playIndex);
			// } else {
			let frame = self._playFrame;
			frame++;
			if (frame > self._totalFrame) {
				frame = 1;
			}
			self.renderSkin(frame);
			// }
			if (self.onPlayFrameCallBack) {
				self.onPlayFrameCallBack.call(self.onPlayFrameTaget, self._playFrame, self._totalFrame);
			}
		}
		protected renderSkin(index: number, exRender: boolean = true): void {
			let self = this;
			if (!self._skinRenderBmp) {
				return;
			}
			// if (self._playIndex == -1)
			// {
			// 	return;
			// }	
			if (exRender == false && self._playFrame == index) {
				return;
			}
			self._playFrame = index;
			let frameData: any = self._poses[self._playFrame - 1]
			let frame: any = frameData.frame;
			if (self._rect.x == frame.x && self._rect.y == frame.y) {
				return;
			}
			let spriteSourceSize: any = frameData.spriteSourceSize;
			let sourceSize: any = frameData.sourceSize;
			self._rect.x = frame.x;
			self._rect.y = frame.y;
			if (frameData.rotated == true) {
				self._rect.width = frame.h;
				self._rect.height = frame.w;
			} else {
				self._rect.width = frame.w;
				self._rect.height = frame.h;
			}
			
			//使用 RenderTexture 进行显示
			// self._renderTexture.drawToTexture(new egret.Bitmap(self._skinBitMap), self._rect);
			self._renderTexture.drawToTexture(self._skinBitMap, self._rect);
			//将绘制好的 RenderTexture 进行显示
			let bmp: egret.Bitmap = self._skinRenderBmp;
			if (bmp.$bitmapData) bmp.$bitmapData.$dispose();
			if (bmp.texture) bmp.texture = null;
			bmp.texture = self._renderTexture;
	
			if (frameData.rotated == true) {
				bmp.rotation = -90;
				bmp.x = spriteSourceSize.x - sourceSize.w / 2;
				bmp.y = spriteSourceSize.y - sourceSize.h / 2 + frame.h;
			} else {
				bmp.rotation = 0;
				bmp.x = spriteSourceSize.x - sourceSize.w / 2;
				bmp.y = spriteSourceSize.y - sourceSize.h / 2;
			}
			bmp.width = self._rect.width;
			bmp.height = self._rect.height;
			
		
		}
		// protected _footX: number;
		// protected _footY: number;
		// /**设置脚点 */
		// public setFootPoint(x: number, y: number): void
		// {
		// 	let self = this;
		// 	self._footX = x;
		// 	self._footY = y;
		// 	egret.callLater(self.renderSkin, this);
		// }
		public setMovieName(path: string, movieName: string): void {
			let self = this;
			if (self._path == path && self._movieName == movieName) {
				return;
			}
			self._movieName = movieName;
			self._path = path;
			self._playFrame = 0;
			self._totalFrame = 0;
			// if (self._action != undefined && self._direction)
			// {
			// 	self.loadMovie();
			// }
		}
		public loadMovie(): void {
			let self = this;
			let url;
			if (self._action == 0) {
				url = self._path + self._movieName + '/' + self._direction;
			} else {
				url = self._path + self._movieName + '/' + MovieSkin.getActionPath(self._action) + '/' + self._direction;
			}
		
			if (url != self._url) {
				self._url = url;
				self._loadEnd = false;
				if(self._rect) self._rect.x = -1;
				let loadMar: MovieLoadManager = MovieLoadManager.getInstance();
				let arr = loadMar.getRes(url);
				if (arr) {
					self.onLoadComplete(self._url, arr[0], arr[1]);
				} else {
					MovieLoadManager.getInstance().load(url, self.onLoadComplete, self);
				}
			}
		}
		private onLoadComplete(url: string, jsonObj: Object, bitmapData: egret.BitmapData): void {
			let self = this;
			// if (!self.parent)
			// {
			// 	return;
			// }	
			if (url == self._url) {

				self.unbindJosn(jsonObj);
			

				//创建纹理对象
				// if (self._skinTexture && self._skinTexture.bitmapData)
				// {
				// 	self._skinTexture.bitmapData.$dispose();
				// }	
			
				if(self._skinBitMap) self._skinBitMap.$bitmapData = bitmapData;
				self._loadEnd = true;

				if (self._playFrame != 0) {
					if (self._playFrame > self._totalFrame) {
						self._playFrame = self._playFrame % self._totalFrame;
						if (self._playFrame == 0) {
							self._playFrame = 1
						}
					}
					self.renderSkin(self._playFrame, true);
				} else {
					self.nextFrame();
				}
			}
		
		}
	
	
		/**解析json */
		protected unbindJosn(jsonObj): void {
			let self = this;
			self._totalFrame = 0;
		
			let framesObj = jsonObj.frames;
			let i: number = 0;
			let len: number = framesObj.length;
			if (self._poses)
			{
				self._poses.length = 0;
			}	
			self._poses = [];
			for (i = 0; i < len; i++) {
				self._poses[self._totalFrame] = framesObj[i];
				self._totalFrame++;
			}
			if (DEBUG) {
				if (self._totalFrame == 0) {
					throw new Error('皮肤json不正确' + self._url);
				}
			}
		}

	
		private static getActionPath(_action): string {

			if (_action == ENUM_DriverAction.attack) {
				return 'attack';
			} else if (_action == ENUM_DriverAction.run) {
				return 'run';
			} else if (_action == ENUM_DriverAction.stand) {
				return 'stand';
			}
			return '';
		}
		public destroy(): void {
			let self = this;
			self.onPlayFrameCallBack = undefined;
			self.onPlayFrameTaget = undefined;
			// self._jsonObj = undefined;
			self._poses = undefined;
			self._playFrame = 0;
			self._totalFrame = 0;
			self._url = undefined;
			self._path = undefined;
			self._movieName = undefined;
			self._direction = undefined;
			self._action = undefined;
			self._isStop = undefined;
		}
	
	}
}