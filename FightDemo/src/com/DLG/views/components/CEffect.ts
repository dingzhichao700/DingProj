module DLG {
	export class CEffect extends CGroup{
		protected _totalFrame: number = 0;
		protected _playIndex: number = -1;
		
		protected _effectName: string;
		protected _bmp: egret.Bitmap;
		protected _playEndRemove: boolean;
		protected _loadEnd:boolean
		/**换帧的时间 */
		public nextFrameTimes: number;
		/**重复播次数 */
		protected _totalPlayTimes: number;
		/**当前播放的次数 */
		protected _currentTimes: number;
		protected _timeId: number;
		
		/**播放到最后一帧回调 */
		public onPlayEndCallBack: Function;
		public onPlayEndTaget: any;

		public constructor() {
			super();
		}
		public setEffectMovie(value: string): void
		{
			let self = this;
			if (self._effectName != value)
			{
				RES.getResByUrl(self._effectName,self.onComplete,self,RES.ResourceItem.TYPE_SHEET);
			}	
			self._effectName = value;
		}
		
		
		/**以次数播放 */
		public play(totalPlayTimes:number,nextFrameTimes:number = 150,playEndRemove:boolean = false): void
		{
			let self = this;
			if (DEBUG)
			{
				if (self._effectName == undefined)
				{
					throw new Error('先要设置effectName');
				}
			}
			self._currentTimes = 0
			self._totalPlayTimes = totalPlayTimes;
			
			if (self._timeId)
			{
				DLGCore.clock.removeTime(self._timeId, false);
				self._timeId = undefined;
			}
			self.nextFrameTimes = nextFrameTimes;
			self._playEndRemove = playEndRemove;
			self._timeId = DLGCore.clock.addTime(self.nextFrameTimes, 0, self.nextFrame, self, null);
		}
		public setPlayEndRemove(value: boolean): void
		{
			this._playEndRemove = value;
		}
		/**总共要播放的次数 */
		public getTotalPlayTimes(): number
		{
			return this._totalPlayTimes;
		}
		protected nextFrame(): void
		{
			let self = this;
			
			
			if (self._loadEnd)
			{
				self._playIndex++;
				return;
			}
			let index = self._playIndex;
			index++;
			if (index >= self._totalFrame)
			{
				index = 0;
			}	
			
			self.renderEffect(index);
			if (self._playIndex == self._totalFrame -1)
			{
				if (self._totalPlayTimes > 0)
				{
					self._currentTimes ++;
					if (self._currentTimes == self._totalPlayTimes)
					{
						if (self._playEndRemove)
						{
							self.removeFromParent();
						}
						if (self.onPlayEndCallBack)
						{
							self.onPlayEndCallBack.call(self.onPlayEndTaget);
						}
					}	
				}	
			}
			
		}
		protected renderEffect(index:number,exRender: boolean = true): void
		{
			let self = this;
			if (exRender == false && self._playIndex == index)
			{
				return;
			}
			self._playIndex = index;
			let indexStr = index + '';
			if (indexStr.length < 2)
			{
				indexStr = '0' + indexStr;
			}	
			var spriteSheet: egret.SpriteSheet = RES.getRes(self._effectName);
			self._bmp.texture = spriteSheet.getTexture(indexStr);
			indexStr = undefined;
		}
		private onComplete(event: any): void {
			let self = this;
			self._loadEnd = true;
			if (self._playIndex != -1)
			{
				self._playIndex = self._playIndex % self._totalFrame;
				self.renderEffect(self._playIndex,true);
			} else
			{
				self.nextFrame();
			}
		}

		public destroy(): void
		{
			let self = this;
			if (self._effectName)
			{
				RES.destroyRes(self._effectName);
			}	
			if (self._timeId)
			{
				DLGCore.clock.removeTime(self._timeId, false);
				self._timeId = undefined;
			}
			self._totalPlayTimes = undefined;
			self._currentTimes = undefined;
			self._effectName = undefined;
			self._playIndex = -1;
		}
		
	}
}