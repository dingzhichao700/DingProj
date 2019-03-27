
module egret {

	export class SceneWindow extends SceneDriver{
		//场景数据
		public _sceneData:SceneData = null;
		//场景元素数据
		public _sceneElementData:SceneElementData = null;
		//元素管理器
		public _sceneElementManager:SceneElementManager = null;
		//当前怪物元素
		private _monsters:Array<SceneElementDriver> = [];
		//任意一个场景之外的其他场景元素
		private _otherElements:Array<SceneElementDriver> = [];
		//掉落物品元素
		private _goodsList:Array<ElementGoods> = [];
		private _goodsDataList:Array<SceneElementDataItem> = [];
		//捡物品顺序
		private _goodsIndex:number;
		//显示物品计时id
		private _showGoodsId:number;
		//检测捡物品计时id
		private _goodsLoopId:number;
		//是否已掉落物品
		private _hasGoods:boolean;

		/**
		 * 构造函数
		 */
		public constructor(){
			super();

			this._sceneData = dataManager().sceneData;
			this._sceneElementData = dataManager().sceneElementData;
			this._sceneElementManager = SceneElementManager.getInstance();
			
			this._elementRadius = SceneElementData.ARRIVE_ELEMENT_RADIUS;
		}
		
		public initWindow():void{
			super.initWindow();
			
			this.addUpdateType(
				UpdateType.PLAYER_EXIT_SCENE,
				UpdateType.PLAYER_ENTER_SCENE,
				UpdateType.PLAYER_VO_CHANGED,
				UpdateType.COPY_MONSTER_BORN,
				UpdateType.DAMAGE_HP_CHANGE,
				UpdateType.CHANGE_COPY,
				UpdateType.ADD_MONSTER

			);
		}
		
		public initData(data:SceneEditLo):void{
			super.initData(data);
			
			if(this._sceneData.isChanged){
				this._sceneData.isChanged = false;
				
				var sceneLo:SceneLo = LocalData.getInstance().getSceneLo(this._sceneData.cityId);
				var id:number = sceneLo.bornPoint;
				var lo:RoleBornPointLo = LocalData.getInstance().getRoleBornPointLo(id);
				
				if(lo){
					this.gotoXY(lo.point.x,lo.point.y);
				}
			}else{
				//this.gotoXY(this._role.x,this._role.y);
				//测试
				openWindow(ButtonWindow);

				var sceneEditLo:SceneEditLo = IsoMapData.getInstance().getData(this._sceneData.sceneId);
				this.gotoXY(sceneEditLo.width / 2,sceneEditLo.height / 2);
			}
		}
		//
		/**
		 * 切换副本
		 */
		public changeCopy():void{
			this.clearCopy();
			RoleManager.getInstance().changeSceneEffect();

			TimerManager.getInstance().addExecute(this.nextCopy,this,3000,null,1);
		}
		//
		/**
		 * 进入下一个副本
		 */
		public nextCopy():void{
			SceneManager.getInstance().enterScene(this._sceneData.sceneType,this._sceneData.getNextSceneId());

			RoleManager.getInstance().enterSceneEffect();

			this.nextTurn();
		}
		//
		/**
		 * 下一波怪物
		 */
		public nextTurn():void{
			TimerManager.getInstance().addExecute(function():void{
				globalUpdateWindows([UpdateType.COPY_MONSTER_BORN]);

				//Role.getInstance().moveTo2(0,0);
				//RoleManager.getInstance().play(0,-1,ActionMovieClipDirectionType.DOWN_LEFT);
			},null,3000,null,1);
		}
		
		public addEvents():void{
			super.addEvents();
			
			//this.addEventListener(SceneEvent.SCENE_ARRIVE_NAVI_POINT,this.sceneArriveNiviPoint,this);
			this.arriveNaviPointHandler = this.sceneArriveNiviPoint;
		}
		
		public remove():void{
			super.remove();
			
			//this.removeEventListener(SceneEvent.SCENE_ARRIVE_NAVI_POINT,this.sceneArriveNiviPoint,this);
			this.arriveNaviPointHandler = null;
		}
		
		public globalUpdate(updateType:number, ...parameters):void{
			switch(updateType){
				//玩家离开当前场景
				case UpdateType.PLAYER_EXIT_SCENE:
					this.removePlayer(parameters[0]);
					break;
				//玩家进入当前场景
				case UpdateType.PLAYER_ENTER_SCENE:
					this.renderElement(parameters[0]);
					break;
				//玩家场景数据改变
				case UpdateType.PLAYER_VO_CHANGED:

					break;
				//怪物出生
				case UpdateType.COPY_MONSTER_BORN:
					dataManager().roleSceneData.resetRoleData();
					//Role.getInstance().updateHp();
					RoleManager.getInstance().updateHp();

					//var roles:Array<SceneElementDataItem> = [Role.getInstance().data];
					var roles:Array<SceneElementDataItem> = dataManager().roleSceneData.getRoleList();

					this._monsters.length = 0;
					var list:Array<SceneElementDataItem> = this._sceneData.getArmies();

					for(var i in list){
						var monster:ElementMonster = this.renderMonster(list[i]);

						if(monster)
							this._monsters[i] = monster;
						monster.chaseArmies(roles);
					}

					//Role.getInstance().chaseArmies(list);
					RoleManager.getInstance().chaseArmies(list);
					break;
				//伤害生命变化
				case UpdateType.DAMAGE_HP_CHANGE:
					list = parameters[0];
					var damageValues:Array<DamageDataItem> = parameters[1];
					var radians:Array<number> = parameters[2];
					var container:DisplayObjectContainer = this._isoMap.getLayerContainer(SceneLayerType.TIP_EFFECT);

					for(var i in list){
						var vo:SceneDriverVo = <SceneDriverVo>list[i].vo;
						var driver:SceneElementDriver = <SceneElementDriver>this.getElement(vo.idString);
						if(driver){
							driver.updateHp();

							if(!damageValues[i]){
								LogManager.debug(this,"damageValues[i]为空 i = " + i);
							}

							if(damageValues[i].isDodge){
								var color:number = 0x00ff00;
								var size:number = 20;
								var value:string = "闪避";

								HPTweenManager.getInstance().tweenLine(container,vo.x,vo.y - 50,-100,value,color,size);
							}else{
								if(damageValues[i].isCritical){
									color = 0xff0000;
									size = 20;
									value = "暴" + damageValues[i].value;
								}else{
									color = 0xffff00;
									size = 16;
									value = damageValues[i].value + "";
								}

								HPTweenManager.getInstance().tween(container,vo.x,vo.y - 50,radians[i],200,value,color,size);
							}

							if(vo.hp <= 0){
								//主角
								if(RoleManager.getInstance().isRoleInstance(driver)){
									RoleManager.getInstance().removeRole(vo.id);

									if(RoleManager.getInstance().isDead){
										this._sceneData.sceneType = SceneType.NORMAL_COPY;
									}
								}else{
									this.removeElement(driver);

									if(driver instanceof PlayerAnimal){
										(<PlayerAnimal>driver).master.removeAnimal();
									}
								}

								if(!this._sceneData.checkArmy()){
									this.showGoods(vo.x,vo.y);

									//if(Math.random() > 0.3)
									//	this._sceneData.sceneType = SceneType.ARENA;
									//else
                                        this._sceneData.sceneType = SceneType.NORMAL_COPY;
								}
							}
						}

						dataManager().fightData.recoverDamage(damageValues);
					}
					break;
				//进入下一个副本
				case UpdateType.CHANGE_COPY:
					this.changeCopy();
					break;
				//增加角色
				case UpdateType.ADD_ROLE:
					for(var i in this._monsters){
						this._monsters[i].chaseArmies(dataManager().roleSceneData.getRoleList());
					}
					break;
				//增加怪物
				case UpdateType.ADD_MONSTER:
					var list:Array<SceneElementDataItem> = this._sceneData.getArmies(false);
					list.push(parameters[0]);

					RoleManager.getInstance().chaseArmies(list);
					break;
			}
		}
		/**
		 * 物品掉落
		 * @param x 掉落点x
		 * @param y 掉落点y
		 */
		private showGoods(x:number,y:number):void{
			if(this._hasGoods) return;

			RoleManager.getInstance().stopAll();

			this._hasGoods = true;

            //LogManager.debug(this,"showGoods");
            
			this._goodsList.length = 0;
			this._goodsIndex = 0;

			this._goodsDataList = this._sceneData.getGoodsList(x,y);

			if(!EnterFrameManager.getInstance().hasExecute(this._showGoodsId))
				this._showGoodsId = EnterFrameManager.getInstance().addExecute(this.showNextGoods,this,2);
		}
		//
		/**
		 * 显示下一个物品，为提高性能，逐帧显示物品
		 */
		private showNextGoods():void{
			var goods:ElementGoods = <ElementGoods>this.renderElementInternal(SceneElementType.GOODS,this._goodsDataList[this._goodsIndex],SceneLayerType.GOODS);

			if(goods){
				this._goodsList.push(goods);
			}

			this._goodsIndex ++;

			if(this._goodsList.length == this._goodsDataList.length){
				EnterFrameManager.getInstance().removeExecute(this._showGoodsId);

				if(this._goodsList.length > 0){
					this._goodsIndex = 0;

					if(!EnterFrameManager.getInstance().hasExecute(this._goodsLoopId))
						this._goodsLoopId = EnterFrameManager.getInstance().addExecute(this.checkTakeGoods,this,6);
				}
			}
		}
		//
		/**
		 * 检测捡物品，因角色技能状态可能未结束，需要通过循环检测
		 */
		private checkTakeGoods():boolean{
			if(!RoleManager.getInstance().role.isSkillStatus && !RoleManager.getInstance().role.isMoving){
				//LogManager.debug(this,"checkTakeGoods");

				EnterFrameManager.getInstance().removeExecute(this._goodsLoopId);

				this.navigateToElement(this._goodsList[this._goodsIndex].data.vo.id);

				return true;
			}

			return false;
		}
		//
		/**
		 * 清空指定的元素
		 * @param list
		 */
		public clearTargets(list:Array<SceneElement>):void{
			if(list){
				for(var i in list){
					this.removeElement(list[i]);
				}

				list.length = 0;
			}

			if(list == this._goodsList){
				this._hasGoods = false;
			}
		}
		//
		/**
		 * 清空副本相关元素
		 */
		public clearCopy():void{
			this.clearTargets(this._goodsList);
			this.clearTargets(this._monsters);
		}

		/**
		 * 移除一个玩家 
		 * @param id
		 * 
		 */		
		public removePlayer(id:string):void{
			this.removeElementById(id);
		}
		//
		/**
		 * 清空场景  
		 * 
		 */		
		public clearScene():void{
			super.clearScene();

			this.clearCopy();

			EnterFrameManager.getInstance().removeExecute(this._goodsLoopId);
			EnterFrameManager.getInstance().removeExecute(this._showGoodsId);
		}

		/**
		 * 到达导航点事件处理 
		 * @param event
		 * 
		 */		
		public sceneArriveNiviPoint(item:SceneNavigatorDataItem):void{
			//var item:SceneNavigatorDataItem = <SceneNavigatorDataItem><any> (event.data);

			//LogManager.debug(this,"sceneArriveNiviPoint , item = " + item);
			
			if(item){
				//LogManager.debug(this,"sceneArriveNiviPoint ,item.elementId = " + item.elementId);

				//固定场景元素
				if(item.elementId != 0){
					this.removeElementById(item.elementId + "");

					this._goodsIndex ++;
					if(this._goodsList[this._goodsIndex]){
						this.navigateToElement(this._goodsList[this._goodsIndex].data.vo.id);
					}else{
						this._hasGoods = false;
						this._sceneData.addWinCount();
					}
				}else if(item.sceneId > 0){
					//场景坐标
				}
			}
		}
		//
		/**
		 * 获取场景元素速度 
		 * @return 
		 * 
		 */		
		public getElementSpeed():number{
			return this._sceneElementData.getElementSpeed();
		}
		//
		/**
		 * 回收场景元素 
		 * @param element:SceneElement 场景元素
		 * 
		 */		
		public recoverElement(element:SceneElement):void{
			this._sceneElementManager.recoverElement(element);
		}
		//
		/**
		 * 场景元素移动结束 
		 * @param target:SceneElement 场景元素
		 * 
		 */		
		public elementMovingEnd(target:SceneElement):void{
			if(target == this._role){
				if(this._currentNaviItem){
					//调度导航事件
					this.checkArriveNaviPoint();
				}
			}else{
				//var item:SceneElementDataItem = (<SceneElement><any> target).data;
				//
				//if(!this.isInRenderRect(item.vo.x,item.vo.y)){
				//	this.removeElementById(item.vo.idString);
				//}
			}
		}
		//
		/**
		 * 渲染动态场景元素 
		 * 
		 */		
		public renderDynamicElements(rect:Rectangle):void{

		}
		//
		/**
		 * 根据数据项目渲染场景元素 
		 * @param item:SceneElementDataItem 场景元素数据项目
		 * 
		 */		
		public renderElement(item:SceneElementDataItem):void{
			if(this._elementsIdMap.containsKey(item.vo.idString)) return;

			var vo:SceneElementVo = item.vo;

			this.renderElementInternal(SceneElementType.PLAYER_WARRIOR,item,SceneLayerType.BIOLOGY);
		}
		//
		/**
		 * 渲染怪物
		 * @param item  场景元素数据项目
		 */
		public renderMonster(item:SceneElementDataItem):SceneElementDriver{
			var monster:SceneElementDriver = <SceneElementDriver>this.getElement(item.id);
			if(monster){
				monster.setData(item);
			}else{
				var type:number;

				if(item.vo instanceof ScenePlayerVo){
					switch ((<ScenePlayerVo>item.vo).vocation){
						case VocationType.WARRIOR:
							type = SceneElementType.PLAYER_WARRIOR;
							break;
						case VocationType.MAGE:
							type = SceneElementType.PLAYER_MAGE;
							break;
						case VocationType.BOWMAN:
							type = SceneElementType.PLAYER_BOWMAN;
							break;
					}
				}else{
					type = SceneElementType.MONSTER;
				}

				monster = <SceneElementDriver>this.renderElementInternal(type,item,SceneLayerType.BIOLOGY);
				monster.setHPStyle(
					dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_red_bg.png"),
					dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_red.png"),
					49,8
				)
				monster.play(0,ActionType.PREPARE,ActionMovieClipDirectionType.DOWN);
			}

			return monster;
		}
		//
		/**
		 * 渲染场景元素
		 * @param type:int 场景类型 SceneElementType
		 * @param data:SceneElementDataItem 场景元素数据
		 * @return
		 *
		 */
		public renderElementInternal(type:number,data:SceneElementDataItem,layerType:number):SceneElement{
			if(this._elementsIdMap.containsKey(data.id)) return null;

			var element:SceneElement = null;

			switch(type){
				case SceneElementType.MONSTER:
					element = this._sceneElementManager.getElement(ElementMonster);
					break;
				case SceneElementType.GOODS:
					element = this._sceneElementManager.getElement(ElementGoods);
					break;
				case SceneElementType.PLAYER_WARRIOR:
					element = this._sceneElementManager.getElement(PlayerWarrior);
					break;
				case SceneElementType.PLAYER_MAGE:
					element = this._sceneElementManager.getElement(PlayerMage);
					break;
				case SceneElementType.PLAYER_BOWMAN:
					element = this._sceneElementManager.getElement(PlayerBowman);
					break;
			}
			if(element){
				element.setData(data);

				this.addElement(element,layerType);
			}

			return element;
		}
		//
		/**
		 * 主角移动 
		 * 
		 */		
		public roleMoving():void{
			super.roleMoving();
		}
		/**
		 * 玩家主动开始移动 
		 */		
		public startMove():void{
			super.startMove();
		}
		//
		/**
		 * 导航至当前场景中的元素，元素可以是非固定场景元素
		 * @param id:Number 元素lo或vo中的id
		 *
		 */
		public navigateToElement(id:number):void{
			if(!this._currentNaviItem){
				this._currentNaviItem = new SceneNavigatorDataItem();
			}
			this._currentNaviItem.elementId = id;

			var element:SceneElement = this.getElement(id + "");
			if(element)
				this.navigateTo(element.x,element.y);
		}
		//
		/**
		 * 导航至当前场景中的坐标
		 * @param x:Number
		 * @param y:Number
		 *
		 */
		public navigateTo(x:number,y:number):void{
			if(this.checkArriveNaviPoint())
				return;

			super.navigateTo(x,y);

			//this.sendData(ModuleNumber.SCENE,SceneCommand.MOVING,{x:x,y:y},null,false);
		}
		//
		/**
		 * 获取场景元素坐标点
		 * @return
		 *
		 */
		public getElementPoint(id:string):Point{
			var element:SceneElement = this.getElement(id);
			if(element)
				return new Point(element.x,element.y);

			return new Point();
		}
		/**
		 * 节点改变时
		 * @param target 节点改变的目标对象
		 * return 是否允许移动
		 */
		public nodeChanged(target:SceneElementMover):boolean{
			var curNode:MapNode = <MapNode>target.currentNode;
			var lastNode:MapNode = <MapNode>target.lastNode;

			if(curNode){
				this._isoMap.setMapNodeType(curNode.row,curNode.column,PathType.OBSTACLE);
			}
			if(lastNode){
				this._isoMap.setMapNodeType(lastNode.row,lastNode.column,PathType.WALKABLE);
			}

			return true;
		}
	}
}