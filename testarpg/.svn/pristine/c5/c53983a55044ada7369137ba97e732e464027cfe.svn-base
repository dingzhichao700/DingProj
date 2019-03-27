
module egret {

	export class SceneElementManager{
		private static _instance:SceneElementManager = null;

		/**
		 * 场景元素缓存字段
		 * @type {string}
		 */
		private static ELEMENT_PLAYER:string = "ElementPlayer";
		private static ELEMENT_MONSTER:string = "ElementMonster";
		private static ELEMENT_EFFECT:string = "ElementEffect";
		private static ELEMENT_SKILL:string = "ElementSkill";
		private static ELEMENT_GOODS:string = "ElementGoods";
		private static ELEMENT_MAGE_NORMAL_SKILL:string = "ElementMageNormalSkill";
		private static ELEMENT_PLAYER_ANIMAL:string = "PlayerAnimal";
		private static ELEMENT_PLAYER_WARRIOR:string = "PlayerWarrior";
		private static ELEMENT_PLAYER_MAGE:string = "PlayerMage";
		private static ELEMENT_PLAYER_BOWMAN:string = "PlayerBowman";

		private static ELEMENT_COLLECT_GOODS:string = "ElementCollectGoods";
		
		//场景元素缓存数量配置
		private COUNT_ELEMENT_CACHE:any = {
			ElementMonster:6,
			ElementSkill:5,
			ElementEffect:5,
			ElementGoods:8,
			ElementMageNormalSkill:3,
			PlayerAnimal:2,
			PlayerWarrior:2,
			PlayerMage:2,
			PlayerBowman:2
		};
		
		//场景元素缓存 
		private _elementCache:HashMap = null;
		//标记场景元素是否已回收
		private _elementFlagMap:HashMap = null;
		
		//场景数据
		private _sceneData:SceneData = null;
		/**
		 * 构造函数
		 */
		public constructor(){
			this._elementCache = new HashMap();
			this._elementFlagMap = new HashMap();
			
			this._sceneData = dataManager().sceneData;
		}

		public static getInstance():SceneElementManager{
            if(!SceneElementManager._instance)
                SceneElementManager._instance = new SceneElementManager();
			return SceneElementManager._instance;
		}
		//
		/**
		 * 获取场景元素实例，并缓存
		 * @param cls:Class:Class 场景元素类
		 * @return 
		 * 
		 */		
		public getElement(cls:any):SceneElement{
			var array:Array<any> = this.getElementCacheArray(this.getElementType(cls));
			
			var element:SceneElement = null;
			
			if(array.length > 0){
				element = array.pop();
				
				this._elementFlagMap.remove(element.hashCode);
			}else{
				element = new cls();
			}
			
			return element;
		}
		//
		/**
		 * 回收场景元素 
		 * @param element:SceneElement
		 * 
		 */		
		public recoverElement(element:SceneElement):void{
			if(!element){
				LogManager.error(this,"回收场景元素element为空");
				return;
			}
			if(this._elementFlagMap.containsKey(element.hashCode)){
				LogManager.error(this,"重复回收场景元素:element = " + element + ",id = " + element.id);
				return;
			}
			//if(element == Role.getInstance()){
			//	//主角，宠物等不用回收
			//	return;
			//}
			if(RoleManager.getInstance().isRoleInstance(element)){
				//主角，宠物等不用回收
				return;
			}

			var type:string = this.getElementType(element);
			var array:Array<any> = this.getElementCacheArray(type);
			if(!this.COUNT_ELEMENT_CACHE[type]){
				LogManager.error(this,"未配置场景元素缓存数量 type = " + type);
				
				//测试
				throw new Error("未配置场景元素缓存数量 type = " + type);
			}
			
			if(array.length < this.COUNT_ELEMENT_CACHE[type]){
				array.push(element);
				
				this._elementFlagMap.put(element.hashCode,true);
			}else{
				var index:number = array.indexOf(element);
				if(index != -1)
					array.splice(index,1);
				this._elementFlagMap.remove(element.hashCode);
				element.destroy();
			}
		}
		//
		/**
		 * 获取场景元素缓存 
		 * @param element:*
		 * @return 
		 * 
		 */		
		private getElementCacheArray(type:string):Array<any>{
			var array:Array<any> = this._elementCache.get(type);
			
			if(!array){
				array = [];
				this._elementCache.put(type,array);
			}
			
			return array;
		}
		//
		/**
		 * 根据场景元素实例获取类型 
		 * @param target:* 场景元素实例
		 * @return 
		 * 
		 */		
		private getElementType(target:any):string{
			var type:string = null;
			
			if(target == PlayerAnimal || target instanceof PlayerAnimal){
				type = SceneElementManager.ELEMENT_PLAYER_ANIMAL;
			}
			else if(target == PlayerWarrior || target instanceof PlayerWarrior){
				type = SceneElementManager.ELEMENT_PLAYER_WARRIOR;
			}
			else if(target == PlayerMage || target instanceof PlayerMage){
				type = SceneElementManager.ELEMENT_PLAYER_MAGE;
			}
			else if(target == PlayerBowman || target instanceof PlayerBowman){
				type = SceneElementManager.ELEMENT_PLAYER_BOWMAN;
			}
			else if(target == ElementMonster || target instanceof ElementMonster){
				type = SceneElementManager.ELEMENT_MONSTER;
			}else if(target == ElementSkill || target instanceof ElementSkill){
				type = SceneElementManager.ELEMENT_SKILL;
			}else if(target == ElementMageNormalSkill || target instanceof ElementMageNormalSkill){
				type = SceneElementManager.ELEMENT_MAGE_NORMAL_SKILL;
			}else if(target == ElementEffect || target instanceof ElementEffect){
				type = SceneElementManager.ELEMENT_EFFECT;
			}else if(target == ElementGoods || target instanceof ElementGoods){
				type = SceneElementManager.ELEMENT_GOODS;
			}
			
			return type;
		}
	}
}