module game {
	export class MonsterDriver extends egret.Sprite implements IDriver {
		protected _bodySkin: MovieSkin;
		protected _actionState: number;
		// protected _movieName: string;
		protected _direction: number;
		protected _data: IDriverData;
		protected _effectDownSprite: egret.Sprite;
		protected _effectUpSprite: egret.Sprite;

		protected _testSprite: egret.Sprite;
		protected _hpBar: HpBar
		public constructor() {
			super();
			let self = this;
			self.touchEnabled = false;
			self._direction = ENUM_DriverDirection.down;
			self._bodySkin = new MovieSkin(GAME_CORE.SHOW_MAP_MOVIE);
			self._bodySkin.filters = undefined;
			self._bodySkin.onPlayFrameCallBack = self.onPlayFrameCallBack;
			self._bodySkin.onPlayFrameTaget = self;
			self.addChild(self._bodySkin);
		}

		protected init(): void {
			let self = this;
		
			self._bodySkin.setDirection(self._direction);
			self._bodySkin.setMovieName(GAME_PATH.MOVIE_MONSTER_PATH, self._data.movieName);
			self.stand();
			self.update();
			self.stand();

			if (DEBUG) {
				if (SceneManager.showRang) {
					if (!self._testSprite) {
						self._testSprite = new egret.Sprite();
						self.addChild(self._testSprite);
					}
					let sp1: egret.Sprite;
					let sp2: egret.Sprite;
					if (self._testSprite.numChildren > 0) {
						sp1 = <any>self._testSprite.getChildAt(0);
						sp2 = <any>self._testSprite.getChildAt(1);
					} else {
						sp1 = new egret.Sprite();
						sp2 = new egret.Sprite();
						sp1.alpha = 0.5
						// sp2.alpha = 0.5
						this._testSprite.addChild(sp1);
						this._testSprite.addChild(sp2);
					}
					sp1.graphics.clear();
					sp1.graphics.beginFill(0x000000);
					sp1.graphics.lineStyle(1, 0x0);
					let data: MonsterData = <MonsterData>self._data;
					sp1.graphics.drawRect(-data.byAttackRangeW, data.byAttackRangeY - data.byAttackRangeH, data.byAttackRangeW * 2, data.byAttackRangeH * 2);
					sp1.graphics.endFill();

					sp2.graphics.clear();
					sp2.graphics.beginFill(0xFFFFFF);
					sp2.graphics.lineStyle(1, 0x0);
					sp2.graphics.drawCircle(0, 0, 2);
					sp2.graphics.endFill();
				}
			}
		}

		public showHpBar(value: boolean): void {
			let self = this;
			if (value && !self._hpBar) {
				self._hpBar = new HpBar();
				self._hpBar.showStyle();
			}
			if (self._hpBar) {
				if (value) {
					if (self._hpBar.parent == null) self.addChild(self._hpBar);
				} else {
					if (self._hpBar.parent) self.removeChild(self._hpBar);
				}
			}	
		}
	
		public showEffect(effectid:number, playTimes: number = 1): void {
			let self = this;
			if (effectid == 0) {
				return;
			}	
			let effectCfg: EffectCfg = EffectTable.getCfgById<EffectCfg>(effectid);
			let movieName: string = effectCfg.movie;
			let isBoss:boolean
			if (self._data.driverType == ENUM_DriverType.monster)
			{
				let data: MonsterData = <MonsterData>self._data;
				
				if (data.isBoss)
				{
					let isBoss = true;
					if (effectCfg.bigmovie != '0' )
					{
						movieName = effectCfg.bigmovie;
					}
				}	
			}	
			
			let effect: EffectMovie;
			if (effectCfg.layer == 1)
			{
				if (!self._effectDownSprite) {
					self._effectDownSprite = new egret.Sprite();
					self.addChild(self._effectDownSprite);
				}
				effect = <EffectMovie>self._effectDownSprite.getChildByName(movieName);
			} else
			{
				if (!self._effectUpSprite) {
					self._effectUpSprite = new egret.Sprite();
					self.addChild(self._effectUpSprite);
				}
				effect = <EffectMovie>self._effectUpSprite.getChildByName(movieName);
			}	
			
			if (!effect) {
				effect = EffectMovie.createEffectMovie(movieName);
				if (effectCfg.layer == 1) {
					self._effectDownSprite.addChild(effect);
				} else
				{
					self._effectUpSprite.addChild(effect);
				}	
				if (self._data.driverType == ENUM_DriverType.monster) {
					if (effectCfg.site == 1)
					{
						effect.y = (<MonsterData>self._data).byAttackRangeY + (<MonsterData>self._data).byAttackRangeH;
					}else if (effectCfg.site == 2)
					{
						effect.y = (<MonsterData>self._data).byAttackRangeY;
					}else if (effectCfg.site == 3)
					{
						effect.y = 0;
					}
				}
				
				if (effectCfg.py != 0) {
					effect.y += effectCfg.py;
				}
				if (effectCfg.range && isBoss) {
					let _px: number = DLG.Utils.random(-effectCfg.range, effectCfg.range);
					let _py: number = DLG.Utils.random(-effectCfg.range, effectCfg.range);
					effect.y += _py;
					effect.x += _px;
				}	
				effect.play(playTimes);
				effect.name = movieName;
				effect.onPlayEndCallBack = self.removeEffectCallBack;
				effect.onPlayEndTaget = self;
			}
		}

		private hitEffectID: number;
		public showHitEffect(): void {
			let self = this;
			if (self._bodySkin.filters !== undefined)
			{
				return;
			}	
			self._bodySkin.filters = [DLG.DLGConfig.lightColorFlilter];
			self.hitEffectID = DLG.DLGCore.clock.addTime(150, 1, self.removeHitEffect, self, null);
		}

		private removeHitEffect(): void {
			let self = this;
			if (self.hitEffectID) {
				DLG.DLGCore.clock.removeTime(self.hitEffectID)
				self.hitEffectID = undefined;
			}
			if (self._bodySkin.filters) {
				self._bodySkin.filters = [];
				self._bodySkin.filters = undefined;
			}	
		}

		public removeEffectCallBack(): void {
			let self = this;
		}
	
		public stand(): void {
			let self = this;
			self._actionState = ENUM_DriverAction.stand;
			self._bodySkin.setAction(self._actionState);
			self._bodySkin.loadMovie();
		}
		
		public attack(skillId: number, px: number, py: number,monsterNotHit?:number): void {
			let self = this;
			let data: DriverData = self._data;
			if (!data) {
				return;
			}
			if ((<MonsterData>data).isSwoonTime ) {
				return;
			}
			
			if (self.isAttack() == false) {
				self._actionState = ENUM_DriverAction.attack;
				self._bodySkin.setAction(self._actionState);
				self._bodySkin.loadMovie();
			}
			if (data.driverType == ENUM_DriverType.monster) {
				let useSkillAction: UseSkillAction = DLG.FactoryUtils.getClass(UseSkillAction);
				useSkillAction.useSkill(self, skillId,monsterNotHit);
			}
		}

		public run(): void {
			let self = this;
			if ((<MonsterData>self._data).isSwoonTime ) {
				return;
			}
			self._actionState = ENUM_DriverAction.run;
			self._bodySkin.setAction(self._actionState);
			self._bodySkin.loadMovie();
		}

		public isAttack(): boolean {
			let self = this;
			if (self._actionState == ENUM_DriverAction.attack) {
				return true;
			}
			return false;
		}

		public update(): void {
			let self = this;
			let data = self._data;
			if (!data) {
				return;
			}
			if (self.x != data.x) self.x = data.x;
			if (self.y != data.y) self.y = data.y;
			if (self._hpBar && self._hpBar.parent) {
				self._hpBar.setValue(data.attr.getValue(Enum_Attr.hp), data.attr.getValue(Enum_Attr.totalHp));
			}
		}

		public nextFrame(): void {
			let self = this;
			if ((<MonsterData>self._data).isSwoonTime)
			{
				return;
			}
			self._bodySkin.nextFrame();
		}

		public onPlayFrameCallBack(frame: number, _totalFrame: number): void {
			let self = this;
			if (self._actionState == ENUM_DriverAction.attack) {
				if (frame == _totalFrame) {
					self.stand();
				}
			}
		}

		public move(): void {
			let self = this;
			let data: DriverData = self._data;
			if (!data) {
				return;
			}
			if ((<MonsterData>data).isSwoonTime)
			{
				return;
			}
			let speed: number = self._data.attr.getValue(Enum_Attr.speed);
			if (self._direction == ENUM_DriverDirection.down) {
				data.y += speed;
				self.y = self._data.y;
			} else if (self._direction == ENUM_DriverDirection.up) {
				data.y -= speed;
				self.y = self._data.y;
			}
		}
	
		public setData(value: DriverData): void {
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
		
		public clear(): void {
			let self = this;
			self.rotation = 0;
			self.removeHitEffect();
			self.showHpBar(false);
		}

	}
}