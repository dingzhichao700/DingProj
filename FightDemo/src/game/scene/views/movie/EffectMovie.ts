module game {
	export class EffectMovie extends MovieSkin {
		/**换帧的时间 */
		public static EffectNextFrameTimes: number = 150
		/**重复播次数 */
		protected _totalPlayTimes: number;
		/**当前播放的次数 */
		protected _currentTimes: number;
		protected _timeId: number;
		/**播放的结束时间 */
		protected _playEndTime: number;

		public onPlayEndCallBack: Function;
		public onPlayEndTaget: any;

		public constructor() {
			super(true);
		
		}
		public getTotalPlayTimes(): number {
			return this._totalPlayTimes;
		}
		/**以次数播放 */
		public play(totalPlayTimes: number): void {
			let self = this;
			if (self._totalPlayTimes == totalPlayTimes) {
				return
			}
			self._currentTimes = 0
			self._totalPlayTimes = totalPlayTimes;
			self._playEndTime = undefined;
			if (self._timeId) {
				DLG.DLGCore.clock.removeTime(self._timeId, false);
				self._timeId = undefined;
			}
			self.loadMovie();
			self._timeId = DLG.DLGCore.clock.addTime(EffectMovie.EffectNextFrameTimes, 0, self.nextFrame, self, null);
		}
		/**以时间播放 */
		public playByTime(time: number): void {
			let self = this;
			self._totalPlayTimes = 0;
			self._currentTimes = undefined
			self._playEndTime = DLG.DLGCore.clock.getTime() + time;
			if (self._timeId) {
				DLG.DLGCore.clock.removeTime(self._timeId, false);
				self._timeId = undefined;
			}
			self._timeId = DLG.DLGCore.clock.addTime(EffectMovie.EffectNextFrameTimes, 0, self.nextFrame, self, null);
		}

		public nextFrame(): void {
			let self = this;
			super.nextFrame();
			if (self._playEndTime) {
				if (DLG.DLGCore.clock.getTime() - self._playEndTime > 0) {
					self.removeEffect();
					self.destroy();
					if (self.onPlayEndCallBack) {
						self.onPlayEndCallBack.call(self.onPlayEndTaget);
					}
				}
				return;
			}
			if (self._loadEnd) {
				if (self._playFrame == self._totalFrame - 1) {
					if (self._totalPlayTimes > 0) {
						self._currentTimes++;
						if (self._currentTimes == self._totalPlayTimes) {
							self.removeEffect();
							self.destroy();
							if (self.onPlayEndCallBack) {
								self.onPlayEndCallBack.call(self.onPlayEndTaget);
							}
						}
					}
				}
			}
		}
		protected removeEffect(): void {
			let self = this;
			if (self.parent) {
				self.parent.removeChild(self)
			}
			EffectMovie.returnEffectMovie(self);
		}
		public reset(): void {
			let self = this;
			self.clear();
			self._playFrame = -1;
			self.goToAndStop(0);
		}
		public clear(): void {
			let self = this;
			if (self._timeId) {
				DLG.DLGCore.clock.removeTime(self._timeId, false);
				self._timeId = undefined;
			}
			self._totalPlayTimes = undefined;
			self._currentTimes = undefined;
			self._playEndTime = undefined;

			self.onPlayEndCallBack = undefined;
			self.onPlayEndTaget = undefined;

			self.x = 0;
			self.y = 0;
		}
		public destroy(): void {
			this.clear();
			super.destroy();
		}
		private static _effectPool: Array<EffectMovie> = [];
		public static createEffectMovie(movieName: string): EffectMovie {
			let effect: EffectMovie;
			if (EffectMovie._effectPool.length > 0) {
				effect = EffectMovie._effectPool.shift();
			} else {
				effect = new EffectMovie();
			}
			effect.setAction(0);
			effect.setDirection(ENUM_DriverDirection.up);
			effect.setMovieName(GAME_PATH.MOVIE_EFFECT_PATH, movieName);
			return effect;
		}
		public static returnEffectMovie(effect: EffectMovie): void {
		
			effect.destroy();
			EffectMovie._effectPool.push(effect);
		}
	}
}