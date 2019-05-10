module game {
	export class BulletDriver extends egret.Sprite implements IDriver {
		protected _bodySkin: MovieSkin;
		protected _direction: number;
		protected _data: BulletData;
		protected _testSprite: egret.Sprite;
		public constructor() {
			super();
			let self = this;
			// self._data = new DriverData();
			self.touchEnabled = false;
			self._direction = ENUM_DriverDirection.up;
			self._bodySkin = new MovieSkin(true);
			self.addChild(self._bodySkin);
		}
		protected init(): void {
			let self = this;

			self._bodySkin.setDirection(self._direction);
			self._bodySkin.setMovieName(GAME_PATH.MOVIE_BULLET_PATH, self._data.movieName);
			self.update();
			self._bodySkin.setAction(0);
			self._bodySkin.loadMovie();
			if (DEBUG) {
				if (SceneManager.showRang) {
					self._testSprite = new egret.Sprite();
					self.addChild(self._testSprite);
					self._testSprite.graphics.beginFill(0x000000);
					self._testSprite.graphics.lineStyle(1, 0x0);
					self._testSprite.graphics.drawCircle(0, 0, 5);
					self._testSprite.graphics.endFill();
				}
			}		
		
		}
	

		public update(): void {
			let self = this;
			let data = self._data;
			if (!data) {
				return;
			}

			if (self.x != data.x) self.x = data.x;
			if (self.y != data.y) self.y = data.y;
			if (self.rotation != data.rotation) self.rotation = data.rotation;

		}
		public nextFrame(): void {
			let self = this;
			self._bodySkin.nextFrame();
		}

		public move(): void {
			let self = this;
			let data = self._data;
			let speed: number = data.attr.getValue(Enum_Attr.speed);
			if (self._direction == ENUM_DriverDirection.up) {
				if (data.rotation) {
					let px = Math.sin(data.rotation * Math.PI / 180) * speed;
					let py = Math.cos(data.rotation * Math.PI / 180) * speed;
					data.x += px;
					data.y -= py;
					self.y = data.y;
					self.x = data.x;
				} else {
					data.y -= speed;
					self.y = data.y;
				}
			
			}
			if (data.rotateMove) {
				self.rotation += 30;
			}
		}
	
		public setData(value: BulletData): void {
			let self = this;
			if (!self._data) {
				self._data = value;
				self.init();
			} else {
				self._data = value;
				self.update();
			}
		}
		public getData(): DriverData {
			return this._data;
		}

		public stand(): void {
		
		}
		public attack(): void {
		
		}
		public isAttack(): boolean {
		
			return false;
		}
		public run(): void {
		
		}
		public clear(): void {
			let self = this;
			self.rotation = 0;
			// self._bodySkin.destroy();
		}
	}
}