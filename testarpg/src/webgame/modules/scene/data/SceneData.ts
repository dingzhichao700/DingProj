
module egret {

	export class SceneData{
    	
		/**********************以下为通用场景数据***********************/
		/**当前场景类型 */		
		public sceneType:number = 0;
		/**当前场景 id，包括所有类型场景 */		
		public sceneId:number = 0;
		
		/**********************以下为城市场景数据***********************/
		/**当前城市场景基础 id*/		
		public cityId:number = 0;
		/**是否已切换场景 */		
		public isChanged:boolean = false;

		//元素管理器
        public _sceneElementManager: SceneElementManager = null;
        /**主城npc数据*/
        private _npcList: Array<SceneElementDataItem>;
		/**普通副本怪物数据*/
		private _normalMonsterList:Array<SceneElementDataItem>;
		/**Boss副本怪物数据*/
		private _bossMonsterList:Array<SceneElementDataItem>;
		/**竞技场怪物数据*/
		private _arenaMonsterList:Array<SceneElementDataItem>;
		/**怪物出生点缓存*/
		private _bornPoint:Point;
		private _monsterPoint:Point;
		//胜利次数
		private _winCount:number = 0;

		public constructor(){
			this._bornPoint = new egret.Point();
			this._monsterPoint = new egret.Point();

            this._npcList = [];
			this._normalMonsterList = [];
			this._bossMonsterList = [];
			this._arenaMonsterList = [];

			this.initMapData();
		}

		/**初始化场景数据*/
		public initMapData():void{
			for(var i = 1001; i < 1004; i++){
				var lo:SceneEditLo = new SceneEditLo();
				lo.id = i;
				lo.width = 1280;
				lo.height = 1800;
				lo.pieceWidth = 300;
				lo.pieceHeight = 300;

				IsoMapData.getInstance().setData(i,lo);
			}
		}

		/**增加胜利次数*/
		public addWinCount():void{
            if(StoryControl.getInstance().index == 1) { //野外
                this._winCount++;

                if(this._winCount < 1) {//刷n波山贼小怪
                    dataManager().sceneData.sceneType = SceneType.NORMAL_COPY;
                    globalUpdateWindows([UpdateType.COPY_MONSTER_BORN]);
                } else if(this._winCount == 1) {//一波山贼boss
                    dataManager().sceneData.sceneType = SceneType.ARENA;
                    globalUpdateWindows([UpdateType.COPY_MONSTER_BORN]);
                } else if(this._winCount == 2) {//打完山贼boss,弹结算
                    StoryControl.getInstance().addIndex();
                    StoryControl.getInstance().openMission();
                    this._winCount = 0;
                }
            } else if(StoryControl.getInstance().index == 5) { //BOSS(就是斗罗之路)
                SoulRoadControl.getInstance().addIndex(); 
                SoulRoadControl.getInstance().closeSoulRoad(); 
                
                StoryControl.getInstance().addIndex();
                StoryControl.getInstance().openMission();
    		}
		}

		/**获取下一个场景 id*/
		public getNextSceneId():number{
			var id:number = this.sceneId;
			id ++;
			if(id > 1002){
				id = 1001;
			}
			return id;
		}

		/**检测是否还有敌人存在*/
		public checkArmy():boolean{
			var list:Array<SceneElementDataItem> = this.getArmies(false);

			for(var i in list){
				if(list[i] && list[i].vo && list[i].vo["hp"] > 0){
					return true;
				}
			}
			return false;
        }

		/**
		 * 获取主城npc数据
		 * @param isNew 是否生成新数据
		 * @returns {Array<SceneElementDataItem>}
		 */
        public getNpcList(isNew: boolean = true): Array<SceneElementDataItem> {
            if(isNew) {
                this._npcList.length = 0;
                for(var i: number = 0;i < 1;i++) {
                    var npcPoint: Point = this.getNpcPoint();
                    var item: SceneElementDataItem = new egret.SceneElementDataItem();
                    var vo: SceneMonsterVo = new SceneMonsterVo();

                    vo.id = SceneElementData.getInstance().getAutoElementId();
                    vo.idString = vo.id + "";
                    vo.hp = 10000;
                    vo.hpTotal = 10000;

                    item.vo = vo;
                    item.lo = new MonsterLo();
                    item.lo.movieName = "monster_035";
                    vo.x = npcPoint.x;
                    vo.y = npcPoint.y;
                    vo.name = "树精";

                    this._npcList[i] = item;
                }
            }
            return this._npcList;
        }

		/**
		 * 获取当前怪物数据
		 * @param isNew 是否生成新数据
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getArmies(isNew:boolean = true):Array<SceneElementDataItem>{
			var list:Array<SceneElementDataItem>;

			switch (this.sceneType){
				case SceneType.NORMAL_COPY:
					list = this.getNormalMonsterList(isNew);
					break;
				case  SceneType.BOSS_COPY:
					list = this.getBossMonsterList(isNew);
					break;
				case  SceneType.ARENA:
					list = this.getArenaMonsterList(isNew);
					break;
			}
			return list;
		}

		/**
		 * 获取野外副本怪物数据
		 * @param isNew 是否生成新数据
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getNormalMonsterList(isNew:boolean = true):Array<SceneElementDataItem>{
			if(isNew){
				var point:Point = this.getBornPoint();

				this._normalMonsterList.length = 0;

				for(var i:number = 0; i < 3; i++){
					var monsterPoint:Point = this.getMonsterPoint(point);
					var item:SceneElementDataItem = new egret.SceneElementDataItem();
					var vo:SceneMonsterVo = new SceneMonsterVo();

					vo.id = SceneElementData.getInstance().getAutoElementId();
					vo.idString = vo.id + "";
					var nameStr:string = "";
					switch(i){
					    case 0:
                            nameStr = "山贼喽啰";
                            break;
                        case 1:
                            nameStr = "山贼精英";
                            break;
                        case 2:
                            nameStr = "山贼小将";
                            break;
					}
                    vo.name = nameStr;
					vo.x = monsterPoint.x;
					vo.y = monsterPoint.y;
					vo.hp = 10000;
					vo.hpTotal = 10000;

					item.vo = vo;
					item.lo = new MonsterLo();
					item.lo.movieName = "monster_001";

					this._normalMonsterList[i] = item;
				}
			}
			return this._normalMonsterList;
		}

		/**
		 * 获取Boss副本怪物数据
		 * @param isNew 是否生成新数据
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getBossMonsterList(isNew:boolean = true):Array<SceneElementDataItem>{
			if(isNew){
				var point:Point = this.getBornPoint();

				this._bossMonsterList.length = 0;

				for(var i:number = 0; i < 1; i++){
					var monsterPoint:Point = this.getMonsterPoint(point);
					var item:SceneElementDataItem = new egret.SceneElementDataItem();
					var vo:SceneMonsterVo = new SceneMonsterVo();

					vo.id = SceneElementData.getInstance().getAutoElementId();
					vo.idString = vo.id + "";
					vo.name = "BOSS";
					vo.x = monsterPoint.x;
					vo.y = monsterPoint.y;
					vo.hp = 20000;
					vo.hpTotal = 20000;

					item.vo = vo;
					item.lo = new MonsterLo();
					item.lo.movieName = "boss_001";

					this._bossMonsterList[i] = item;
				}
			}
			return this._bossMonsterList;
		}

		/**获取怪物随机8个方向的出生坐标*/
		public getBornPoint():Point{
			/*var sceneLo:SceneEditLo = IsoMapData.getInstance().getData(this.sceneId);

			var index:number = Math.floor(Math.random() * 8);
			var radian:number = Math.PI / 4 * index;
			var cx:number = sceneLo.width / 4;
			var cy:number = sceneLo.height / 2;
			var radius:number = cx > cy ? cy : cx;
			radius *= 2/3;

			this._bornPoint.x = Math.cos(radian) * radius + cx;
			this._bornPoint.y = Math.sin(radian) * radius + cy;*/
            this._bornPoint.x = 640;
            this._bornPoint.y = 500 + Math.random() * 200;
			return this._bornPoint;
		}

		/**
		 * 获取怪物坐标
		 * @param point 出生坐标中心点
		 * @param offsetX x轴随机偏移量
		 * @param offsetY y轴随机偏移量
		 * @returns {Point}
		 */
		public getMonsterPoint(point:Point,offsetX:number = 160,offsetY:number = 160):Point{
			var sceneLo:SceneEditLo = IsoMapData.getInstance().getData(this.sceneId);

			this._monsterPoint.x = point.x + Math.random() * offsetX - offsetX / 2;
			this._monsterPoint.y = point.y +Math.random() * offsetY - offsetY / 2;

			this._monsterPoint.x = this.limitValue(0,sceneLo.width,this._monsterPoint.x);
			this._monsterPoint.y = this.limitValue(0,sceneLo.height,this._monsterPoint.y);

			return this._monsterPoint;
        }
        
		/**
		 * 获取怪物坐标
		 * @param point 出生坐标中心点
		 * @param offsetX x轴随机偏移量
		 * @param offsetY y轴随机偏移量
		 * @returns {Point}
		 */
        public getNpcPoint(): Point {
            this._bornPoint.x = 440;
            this._bornPoint.y = 1000;
            return this._bornPoint;
        }

		/**
		 * 限制数值大小
		 * @param min 最小值
		 * @param max 最大值
		 * @param value 当前值
		 * @returns {number}
		 */
		public limitValue(min:number,max:number,value:number):number{
			if(value < min){
				value = min;
			}
			if(value > max){
				value = max;
			}
			return value;
		}

		/**
		 * 获取竞技场怪物数据
		 * @param isNew
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getArenaMonsterList(isNew:boolean = true):Array<SceneElementDataItem>{
			if(isNew){
				this._arenaMonsterList.length = 0;

				var point:Point = this.getBornPoint();
				var length:number = dataManager().roleSceneData.getRoleList().length;
				if(length > 3)
					length = 3;

				for(var i:number = 0; i < length; i++){
					var monsterPoint:Point = this.getMonsterPoint(point);
					var item:SceneElementDataItem = new SceneElementDataItem();
					var playerVo:ScenePlayerVo = new ScenePlayerVo();

					playerVo.id = SceneElementData.getInstance().getAutoElementId();
					playerVo.idString = playerVo.id + "";

					if(i == 0){
						playerVo.name = "山贼首领";
						playerVo.sex = SexType.MALE;
						playerVo.vocation = VocationType.WARRIOR;
					}else if(i == 1){
                        playerVo.name = "山贼术士";
						playerVo.sex = SexType.MALE;
						playerVo.vocation = VocationType.MAGE;
					}else if(i == 2){
                        playerVo.name = "山贼弓手";
						playerVo.sex = SexType.MALE;
						playerVo.vocation = VocationType.BOWMAN;
					}

					playerVo.x = monsterPoint.x;
					playerVo.y = monsterPoint.y;

					playerVo.hp = 5000;
					playerVo.hpTotal = 5000;

					item.vo  = playerVo;

					this._arenaMonsterList[i] = item;
				}
			}
			return this._arenaMonsterList;
		}

		/**
		 * 增加神兽数据
		 * @param skillLevel 射手神兽技能等级
		 * @returns {SceneElementDataItem}
		 */
		public addAnimal(skillLevel:number = 1):SceneElementDataItem{
			var item:SceneElementDataItem = new egret.SceneElementDataItem();
			item.vo = new SceneMonsterVo();
			item.vo.id = SceneElementData.getInstance().getAutoElementId();
			item.vo.idString = item.vo.id + "";
			item.vo.name = "白虎";

			(<SceneMonsterVo>item.vo).hp = 500;
			(<SceneMonsterVo>item.vo).hpTotal = 500;

			item.lo = new MonsterLo();
			item.lo.movieName = "animal_001";
			return item;
		}

		/**
		 * 获取物品数据
		 * @param x 物品掉落点x
		 * @param y 物品掉落点y
		 * @returns {Array<SceneElementDataItem>}
		 */
		public getGoodsList(x:number,y:number):Array<SceneElementDataItem>{
			var sceneLo:SceneEditLo = IsoMapData.getInstance().getData(this.sceneId);

			var array:Array<SceneElementDataItem> = [];
			//物品排列列数
			var column:number = 4;
			//物品数量
			var length:number = 6;
			//物品离掉落点偏移量x,y
			var offsetX:number = 200;
			var offsetY:number = 0;
			//物品x,y间隔
			var gap:number = 100;

			for(var i = 0; i < length; i++){
				var item:SceneElementDataItem = new SceneElementDataItem();
				var vo:SceneElementVo = new SceneElementVo();
				vo.id = SceneElementData.getInstance().getAutoElementId();
				vo.idString = vo.id + "";

				vo.x = x + (i % column) * gap - offsetX;
				//限制x最小值
				while(vo.x < 100){
					offsetX -= gap;
					vo.x += gap;
				}
				//限制x最大值
				while((i == 0 && vo.x > sceneLo.width - column * gap)){
					offsetX += gap;
					vo.x -= gap;
				}

				vo.y = y - Math.floor(i / column) * gap + offsetY;
				//限制y最小值
				while(i == 0 && vo.y < column * gap){
					offsetY += gap;
					vo.y += gap;
				}
				if(this.sceneType == SceneType.BOSS_COPY){
                    vo.name = "强化材料";
                    var lo: GoodsLo = new GoodsLo();
                    lo.iconId = 26;
                } else {
                    vo.name = "金币";
                    var lo: GoodsLo = new GoodsLo();
                    lo.iconId = 27;
				}

                item.vo = vo;
				item.lo = lo;

				array.push(item);
			}
			return array;
		}

		/**
		 * 更新场景元素vo 
		 * @param item:SceneElementDataItem 数据
		 * @param attr:Array 属性列表
		 * @param values:Array 值列表
		 */		
		public updateSceneElementVo(item:SceneElementDataItem,attr:Array<any>,values:Array<any>):void{
			if(!item.vo) return;
			
			for(var p in attr){
				item.vo[attr[p]] = values[p];
			}
		}
		
	}
}