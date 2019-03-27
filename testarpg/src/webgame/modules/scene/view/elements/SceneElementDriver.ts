
module egret {

	export class SceneElementDriver extends SceneElementMover{
		/**
		 * 上次使用的技能
		 */
		public skillType:number;
		/**
		 * 是否为释放技能状态
		 */
		public isSkillStatus:boolean;
		/**
		 * 敌人数据
		 */
		public armies:Array<SceneElementDataItem>;
		//攻击目标
		public _attackTarget:SceneElementDataItem;
		/**
		 * 追击目标到达攻击范围时处理 function(target:SceneElementDataItem)
		 */
		public _chaseArriveItem:ScriptItem;
		//追击目标检测距离循环id
		private _chaseId:number;
		//追击目标循环id
		public _chaseTimerId:number;
		//血条
		public _hpBar:HPBar;
		//攻击计数
		public _timerCount:number = 0;
		//追击敌人时帧计数
		public _frameCount:number = 0;
		//是否锁定，锁定时不无法动弹，动画暂停
		public _isLocked:boolean;
		//伤害角度缓存
		public _radiansCache:Array<number> = [];
		//伤害对象缓存
		public _damageTargets:Array<SceneElementDataItem> = [];
		//技能释放时间
		private _skillTimeData:any = {};
		//元素周围角度
		private _positionRadians:Array<number> = [];
		//元素周围6个角度缓存
		private _positionCache:Array<number> = [];
		//元素周围其他元素数据
		private _positionTargets:Array<SceneElementDataItem> = [];
		//元素周围角度排序
		private _positionSort:any;
		private _positionSort2:any;
		//转向目标点
		private _positionPoint:Point = new Point();
		//血量更新类型通知缓存
		private _hpChangeTypes:Array<number> = [UpdateType.DAMAGE_HP_CHANGE];

		/**
		 * 构造函数
		 */
		public constructor(){
			super();

			this.speed = 6;

			this._hpBar = new egret.HPBar();
			this._namePad.show(this._hpBar,-1);

			for(var i:number = 0; i < 6; i++){
				this._positionRadians[i] = i * 60 / 180 * Math.PI;
			}

			var self:SceneElementDriver = this;

			//元素周围6个角度缓存排序，将远离其他元素的角度排前面
			this._positionSort = function(a:number,b:number):number{
				var width:number = SceneElementMover.MOVER_WIDTH / 2;
				var height:number = SceneElementMover.MOVER_HEIGHT;
				var radius:number = self.getAttackRange();
				var x1:number = Math.cos(a) * radius + self._x;
				var y1:number = Math.sin(a) * radius + self._y;

				x1 = self.limitValue(x1,width,self._maxX - width);
				y1 = self.limitValue(y1,height,self._maxY);

				var x2:number = Math.cos(b) * radius + self._x;
				var y2:number = Math.sin(b) * radius + self._y;

				x2 = self.limitValue(x2,width,self._maxX - width);
				y2 = self.limitValue(y2,height,self._maxY);

				var distance1:number = 0;
				var distance2:number = 0;

				for(var i in self._positionTargets){
					distance1 += DimensionUtil.distance2(x1,y1,self._positionTargets[i].vo.x,self._positionTargets[i].vo.y);
					distance2 += DimensionUtil.distance2(x2,y2,self._positionTargets[i].vo.x,self._positionTargets[i].vo.y);
				}

				if(distance1 > distance2){
					return -1;
				}else if(distance1 < distance2){
					return 1;
				}
				return 0;
			}
			//元素周围3个角度缓存排序，将靠近攻击目标的角度排前面
			this._positionSort2 = function(a:number,b:number):number{
				var width:number = SceneElementMover.MOVER_WIDTH / 2;
				var height:number = SceneElementMover.MOVER_HEIGHT;
				var radius:number = self.getAttackRange();
				var x1:number = Math.cos(a) * radius + self._x;
				var y1:number = Math.sin(a) * radius + self._y;

				x1 = self.limitValue(x1,width,self._maxX - width);
				y1 = self.limitValue(y1,height,self._maxY);

				var x2:number = Math.cos(b) * radius + self._x;
				var y2:number = Math.sin(b) * radius + self._y;

				x2 = self.limitValue(x2,width,self._maxX - width);
				y2 = self.limitValue(y2,height,self._maxY);

				var distance1:number = DimensionUtil.distance2(x1,y1,self._attackTarget.vo.x,self._attackTarget.vo.y);
				var distance2:number = DimensionUtil.distance2(x2,y2,self._attackTarget.vo.x,self._attackTarget.vo.y);

				if(distance1 < distance2){
					return -1;
				}else if(distance1 > distance2){
					return 1;
				}
				return 0;
			}
		}
		//
		/**
		 * 设置血条进度条样式
		 * @param bgUrl 进度背景地址
		 * @param barUrl 进度条地址
		 * @param width 进度条宽
		 * @param height 进度条高
		 */
		public setHPStyle(bgUrl:string,barUrl:string,width:number,height:number):void{
			this._hpBar.setStyle(bgUrl,barUrl,width,height);
			this._namePad.updateLayout();
		}
		//
		public updateXY():void{
			super.updateXY();
		}
		//
		public addToScene():void{
			super.addToScene();

			this.updateHp();
		}
		//
		/**
		 * 更新血量显示
		 */
		public updateHp():void{
			var vo:SceneDriverVo = <SceneDriverVo>this._data.vo;
			this._hpBar.setProperty(vo.hp + "",vo.hp / vo.hpTotal);
		}
		/**
		 * 按指定动作类型和方向播放影片
		 * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
		 * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
		 * @param thisObj:any = null 播放完成后回调函数所属对象
		 * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
		 * @param startObj:any = null startFun回调函数所属对象
		 */
		public play(frameIndex:number = -1,actionType:number = -1,direction:number = -1,loopCount:number = 0,callBack:Function = null,thisObj:any = null,startFun:Function = null,startObj:any = null):void{
			if(this._isLocked) return;

			super.play.apply(this,arguments);

			this.clearAttack();
		}
		/**
		 * 从场景移除时处理 
		 * 
		 */		
		public removeFromScene():void{
			this.stopAll();
			super.removeFromScene();
		}
		//
		/**
		 * 追击目标到达攻击范围时处理
		 * @param fun 回调函数 function(target:SceneElementDataItem) target:攻击目标
		 * @param target 回调函数所属对象
		 */
		public setChaseArriveHandler(fun:Function,target:any):void{
			if(!this._chaseArriveItem){
				this._chaseArriveItem = new egret.ScriptItem();
			}

			this._chaseArriveItem.execute = fun;
			this._chaseArriveItem.target = target;
		}
		//
		/**
		 * 追击敌人
		 * @param armies 敌人数据
		 */
		public chaseArmies(armies:Array<SceneElementDataItem>):void{
			if((<SceneDriverVo>this.data.vo).hp <= 0) return;

			this.armies = armies;

			if(this.armies){
				if (!TimerManager.getInstance().hasExecute(this._chaseTimerId))
					this._chaseTimerId = TimerManager.getInstance().addExecute(this.checkAutoAttack, this, 500);

				var max:number = 100000;
				var distance:number;
				var target:SceneElementDataItem = this.getPriorityTarget();
				var x:number = this.x;
				var y:number = this.y;

				if(!target){
					for(var i in this.armies){
						var vo:SceneDriverVo = <SceneDriverVo>this.armies[i].vo;
						if(vo.hp > 0){
							distance = DimensionUtil.distance2(x,y,vo.x,vo.y);

							if(distance < max){
								max = distance;

								target = this.armies[i];
							}
						}
					}
				}

				if(target){
					this._attackTarget = target;

					if(!this.checkChaseArrive()){
						if(!EnterFrameManager.getInstance().hasExecute(this._chaseId)){
							this._chaseId = EnterFrameManager.getInstance().addExecute(this.checkChaseArrive,this,3);
						}
					}
				}else{
					this._attackTarget = null;
					this.attackEnd();
				}
			}else{
				this._attackTarget = null;
				this.attackEnd();
			}
		}
		//
		/**
		 * 获取优先攻击对象，各职业重写
		 * @returns {null}
		 */
		public getPriorityTarget():SceneElementDataItem{
			return null;
		}
		//
		/**
		 * 检测自动攻击
		 */
		public checkAutoAttack():void{
			this._timerCount ++;

			//1==500ms
			if(this._timerCount % 2 == 0){
				this.chaseArmies(this.armies);
			}
		}
		//
		/**
		 * 检测是否已到达攻击目标周围
		 */
		public checkChaseArrive():boolean{
			this._frameCount ++;
			var distance:number;
			var minRange:number = this.getElementMinRange();

			//检测场景元素之间是否太靠近
			if(this.checkRange()) return false;

			if(this._isLocked) return false;

			//检测是否已到达攻击目标周围
			distance = DimensionUtil.distance2(this._x,this._y,this._attackTarget.vo.x,this._attackTarget.vo.y);

			//if(this.data.vo["vocation"]){
			//	LogManager.debug(this,"checkChaseArrive() distance = " + distance.toFixed(0) + "  vocation = " + this.data.vo["vocation"],this._x.toFixed(0),this._y.toFixed(0),this._attackTarget.vo.x.toFixed(0),this._attackTarget.vo.y.toFixed(0));
			//}

			if(distance < this.getAttackRange()){
				//LogManager.debug(this,"checkChaseArrive:" + this.data.vo.name);

				EnterFrameManager.getInstance().removeExecute(this._chaseId);

				this.attack();

				if(this._chaseArriveItem){
					this._chaseArriveItem.params = [this._attackTarget];
					this._chaseArriveItem.apply();
				}

				return true;
			}else if(this._frameCount % 3 == 0){
				this.moveTo3(this._attackTarget.vo.x,this._attackTarget.vo.y);
			}

			return false;
		}
		//
		/**
		 * 元素之间的距离太近时，自动分开的目标点
		 */
		public resetPositionPoint():void{
			this._positionPoint.x = 0;
			this._positionPoint.y = 0;
		}
		//
		/**
		 * 检测元素之间的距离，距离太近时自动分开
		 * @returns {boolean} 返回 true 表示距离太近
		 */
		private checkRange():boolean{
			if(!this._attackTarget || (<SceneDriverVo>this._attackTarget.vo).hp <= 0) return false;

			if(this._positionPoint.x > 0 && this._positionPoint.y > 0){
                if(this._x + "" != this._positionPoint.x + "" && this._y + "" != this._positionPoint.y + ""){
					return true;
				}else{
                    this.resetPositionPoint();
				}
			}

			var minRange:number = this.getElementMinRange();

			//检测场景元素之间是否太靠近
			if(this.scene){
				var array:Array<any> = this.scene.getBiologyMap();
				this._positionTargets.length = 0;

				for(var i in array){
					if(array[i] instanceof SceneElementDriver && array[i] != this){
						var driver:SceneElementDriver = array[i];
						var distance:number = DimensionUtil.distance2(this._x,this._y,driver.data.vo.x,driver.data.vo.y);

						if(distance < minRange){
							this._positionTargets.push(driver.data);
						}
					}
				}

				if(this._positionTargets.length > 0){
					this._positionRadians.sort(this._positionSort);

					this._positionCache.length = 0;

					var length:number = (this._positionRadians.length / 3) | 0;
					for(var j = 0; j < length; j++){
						this._positionCache.push(this._positionRadians[j]);
					}

					this._positionCache.sort(this._positionSort2);

					var width:number = SceneElementMover.MOVER_WIDTH / 2;
					var height:number = SceneElementMover.MOVER_HEIGHT;
					var radius:number = this.getAttackRange();
					var radian:number = this._positionCache[0];
					var x:number = Math.cos(radian) * radius + this._x;
					var y:number = Math.sin(radian) * radius + this._y;

                    x = this.limitValue(x,width,this._maxX - width);
                    y = this.limitValue(y,height,this._maxY);

					this._positionPoint.x = x;
					this._positionPoint.y = y;

					this.moveTo3(x,y);

					//LogManager.debug(this,"checkRange2:" + this.data.vo.name,this._positionPoint);

					return true;
				}
			}

			//LogManager.debug(this,"checkRange3:" + this.data.vo.name);

			return false;
		}
		//
		/**
		 * 获取攻击范围，不同职业和怪物重写
		 * @param skillType 技能类型
		 * @returns {number}
		 */
		public getAttackRange(skillType:number = 0):number{
			return 150;
		}
		//
		/**
		 * 获取场景元素之间最小距离，小于此距离时，场景元素自动朝不同方向分开
		 * @returns {number}
		 */
		public getElementMinRange():number{
			return 80;
		}
		//
		/**
		 * 默认攻击方法，不同职业和怪物重写
		 */
		public attack():void{
			if(this._isLocked) return;
			if(!this._attackTarget) return;

			if((<SceneDriverVo>this._attackTarget.vo).hp <= 0) {
				this.chaseArmies(this.armies);
				return;
			}

			//LogManager.debug(this,"attack:" + this.data.vo.name);

			this.stopMove();

			var direction:number = ActionMovieClipData.getInstance().calculateDirection(this.x,this.y,this._attackTarget.vo.x,this._attackTarget.vo.y);
			this.play(0,ActionType.ATTACK,direction,1,this.attackEnd,this);
			this._avatar.setFrameHandler(this.playSkill,this);
		}
		//
		/**
		 * 单次攻击结束
		 */
		public attackEnd():void{
			this.resetPositionPoint();

			if(!this._attackTarget){
				TimerManager.getInstance().removeExecute(this._chaseTimerId);
			}
			if(this._avatar.actionType == ActionType.ATTACK)
				this.play(0,ActionType.PREPARE);
		}
		//
		/**
		 * 清理攻击相关数据和回调
		 */
		public clearAttack():void{
			this._timerCount = 0;
			this._avatar.setFrameHandler(null);
		}
		//
		/**
		 * 释放默认技能
		 */
		public playSkill():void{

		}
		//
		/**
		 * 停止所有攻击相关的行为，用于战斗结束
		 */
		public stopAll():void{
			Tween.removeTweens(this);
			EnterFrameManager.getInstance().removeExecute(this._chaseId);
			TimerManager.getInstance().removeExecute(this._chaseTimerId);

			this.isSkillStatus = false;
			this.armies = null;
			this._attackTarget = null;

			this.setXY(this._x,this._y);
			this.unlock();
			this.stopMove();
			this.attackEnd();
			this.clearAttack();
		}
		//
		/**
		 * 切换场景特效
		 */
		public changeSceneEffect():void{
			this.stopAll();

			this.enterSceneEffect();
		}
		//
		/**
		 * 进入场景特效
		 */
		public enterSceneEffect():void{
			if(this.scene){
				var effect:ElementEffect = <ElementEffect>SceneElementManager.getInstance().getElement(ElementEffect);
				effect.setIsCheckResource(false);
				effect.setMovieName(MovieName.EFFECT_01);
				this.scene.addElement(effect,SceneLayerType.BATTLE_EFFECT,this.x,this.y);
			}
		}
		//
		/**
		 * 升级特效
		 */
		public levelUpEffect():void{
			if(this.scene){
				var effect:ElementEffect = <ElementEffect>SceneElementManager.getInstance().getElement(ElementEffect);
				effect.setIsCheckResource(false);
				effect.setMaster(this);
				effect.setMovieName(MovieName.LEVEL_UP);
				this.scene.addElement(effect,SceneLayerType.BATTLE_EFFECT,this.x,this.y);
			}
		}
		//
		/**
		 * 计算伤害
		 * @param skillType 技能类型
		 * @param range 范围值
		 * @param x 技能中心点x，用于群攻计算
		 * @param y 技能中心点y，用于群攻计算
		 */
		public damage(skillType:number = 0, targets:Array<SceneElementDataItem> = null,range:number = 0,x:number = 0,y:number = 0):void{
			if(this._attackTarget){
				if(range > 0)
					targets = this.getDamageTargetsByRange(range,x,y);
				if(!targets)
					targets = this.getDamageTargets(skillType,x,y);

				var radians:Array<number> = this.getDamageRadians(targets);
				var damageValues:Array<DamageDataItem> = dataManager().fightData.damage(this.data,skillType,targets);

				globalUpdateWindows(this._hpChangeTypes,targets,damageValues,radians);
			}
		}
		//
		/**
		 * 获取技能伤害敌人数据，不同技能重写，默认为单体伤害敌人数据
		 * @param skillType 技能类型
		 * @param x 技能中心点x，用于群攻计算
		 * @param y 技能中心点y，用于群攻计算
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getDamageTargets(skillType:number = 0,x:number = 0,y:number = 0):Array<SceneElementDataItem>{
			this._damageTargets.length = 0;
			this._damageTargets.push(this._attackTarget);
			return this._damageTargets;
		}
		//
		/**
		 * 获取伤害飘字角度数据
		 * @param targets 敌人数据
		 * @returns {Array<number>}
		 */
		public getDamageRadians(targets:Array<SceneElementDataItem>):Array<number>{
			this._radiansCache.length = 0;

			for(var i in targets){
				this._radiansCache.push(Math.atan2(targets[i].vo.y - this.y,targets[i].vo.x - this.x))
			}

			return this._radiansCache;
		}
		//
		/**
		 * 获取范围内的受伤害敌人数据
		 * @param range 范围值
		 * @param x 技能中心点x，用于群攻计算
		 * @param y 技能中心点y，用于群攻计算
		 */
		public getDamageTargetsByRange(range:number = 0,x:number = 0,y:number = 0):Array<SceneElementDataItem>{
			this._damageTargets.length = 0;

			this._damageTargets.push(this._attackTarget);
			if(range == 0)
				this.getAttackRange();
			if(x == 0)
				x = this._x;
			if(y == 0)
				y = this._y;

			for(var i in this.armies){
				if(this.armies[i] && this._attackTarget != this.armies[i]){
					var vo:SceneDriverVo = <SceneDriverVo>this.armies[i].vo;
					if(vo.hp > 0) {
						var distance:number = DimensionUtil.distance2(x,y,vo.x, vo.y);

						if(distance <= range){
							this._damageTargets.push(this.armies[i]);
						}
					}
				}
			}

			return this._damageTargets;
		}
		//
		/**
		 * 记录技能使用时间
		 * @param skillType
		 */
		public setSkillTime(skillType:number):void{
			this._skillTimeData[skillType] = getTimer();
		}
		//
		/**
		 * 获取上次使用技能经过的时间
		 * @param skillType
		 * @returns {number}
		 */
		public getSkillTime(skillType:number):number{
			if(this._skillTimeData[skillType])
				return getTimer() - this._skillTimeData[skillType];

			return 1000000000;
		}
		//
		/**
		 * 标记使用技能
		 * @param skillType
		 */
		public setUseSkill(skillType:number):void{
			this.setSkillTime(skillType);
			this.skillType = skillType;
		}
		//
		/**
		 * 野蛮冲撞
		 * @param master 播放技能对象
		 * @param target 冲撞目标对象
		 * @param radian 冲撞角度
		 * @param radius 冲撞移动半径
		 * @param time 移动时间
		 */
		public onCollide(master:SceneElementDriver,target:SceneElementDriver,radian:number,radius:number,time:number):void{
			var width:number = SceneElementMover.MOVER_WIDTH / 2;
			var height:number = SceneElementMover.MOVER_HEIGHT;

			var x:number = master._x + Math.cos(radian) * radius;
			var y:number = master._y + Math.sin(radian) * radius;
			x = this.limitValue(x,width,this._maxX - width);
			y = this.limitValue(y,height,this._maxY);

			Tween.get(this,{onChange:this.onChangeCollide,onChangeObj:this}).to({x:x,y:y},time).call(this.collideComplete,this,[master,target,x,y]);
		}
		//
		/**
		 * 野蛮冲撞移动时
		 */
		public onChangeCollide():void{
			if(this.scene){
				this.setXY(this._x,this._y);

				if(RoleManager.getInstance().role == this){
					this.scene.isoMap.gotoXY2(this._x,this._y);
				}
			}
		}
		//
		/**
		 * 野蛮冲撞结束
		 * @param master 移动结束对象
		 * @param target 冲撞目标对象
		 * @param x 移动目标点x
		 * @param y 移动目标点y
		 */
		public collideComplete(master:SceneElementDriver,target:SceneElementDriver,x:number,y:number):void{
			this.setXY(x,y);
		}
		//
		/**
		 * 锁定，锁定时不无法动弹，动画暂停
		 */
		public lock():void{
			this._isLocked = true;
			this._avatar.stopMovie();
		}
		//
		/**
		 * 解锁，恢复锁定前的动画播放
		 */
		public unlock():void{
			this.resetPositionPoint();
			this._isLocked = false;
			
			if(this.scene)
				this._avatar.playMovie();

			if(!EnterFrameManager.getInstance().hasExecute(this._chaseId)){
				this.chaseArmies(this.armies);
			}
		}
		//
		/**
		 * 被击退，从击退中心点以半径计算退后的坐标
		 * @param x 击退中心x
		 * @param y 击退中心x
		 * @param radius 击退半径
		 */
		public stepBack(x:number,y:number,radius:number):void{
			this.stopMove();

			var radian:number = Math.atan2(this._y - y, this._x - x);
			var tx:number = Math.cos(radian) * radius + x;
			var ty:number = Math.sin(radian) * radius + y;

			Tween.get(this).to({x:tx,y:ty},200).call(this.stepBackComplete,this,[tx,ty]);
		}
		//
		/**
		 * 击退结束
		 * @param x 击退目标点x
		 * @param y 击退目标点y
		 */
		public stepBackComplete(x:number,y:number):void{
			this.setXY(x,y);
			this.resetPositionPoint();

			this.chaseArmies(this.armies);
		}
	}
}