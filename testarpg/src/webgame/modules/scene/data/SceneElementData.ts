
module egret {

	export class SceneElementData{
		/**
		 * 到达元素周围半径，和元素距离小于此半径时，判定已到达
		 */		
		public static ARRIVE_ELEMENT_RADIUS:number = 40;
		/**
		 * 传送点半径，应 >= 地图节点的尺寸
		 */		
		public static ENTRY_POINT_RADIUS:number = 20;
		
		private static _instance:SceneElementData = null;
		private _idGenerator:IDGenerator;
		
		/**
		 * 构造函数
		 */
		public constructor(){
			this._idGenerator = new egret.IDGenerator(-1);
		}
		public static getInstance():SceneElementData{
			return SceneElementData._instance || (SceneElementData._instance = new SceneElementData());
		}
		//
		/**
		 * 获取自动生成的场景元素id，非填表id，开始值为 -1，生成负数，避免与服务端数据冲突
		 * @return
		 *
		 */
		public getAutoElementId():number{
			return this._idGenerator.getID(false);
		}
		//
		/**
		 * 场景元素速度  
		 * @return 
		 * 
		 */		
		public getElementSpeed():number{
			return 6;
		}
		//
		/**
		 * 获取动作影片地址 
		 * @param path:String 路径
		 * @param movieName:String 影片名称
		 * @param actionType:int 动作类型
		 * @return 
		 * 
		 */		
		public getActionUrl(path:string,movieName:string,actionType:number = 1):string{
			var fileName:string = movieName + "/" + movieName + "_" + actionType + ExtensionType.JSON;
			return dataManager().pathData.getResourceUrl(path,fileName);
		}
		//
		/**
		 * Lo的动作配置数据中是否有指定动作类型 
		 * @param config:String 动作配置数据
		 * @param actionType:int 动作类型 
		 * @return 
		 * 
		 */		
		public hasActionType(config:string,actionType:number = 0):boolean{
			return config.indexOf(actionType.toString()) != -1;
		}
		//
		/**
		 * 设置玩家纸娃娃数据，有坐骑
		 * @param vo:SceneAvatarVo 纸娃娃数据对象
		 * @param vocation:int 职业
		 * @param sex:int 性别
		 * @param mountsState:int 坐骑状态
		 * @param bodyLevel:int 主体等级
		 * @param weaponLevel:int 武器等级
		 * @param wingLevel:int 翅膀等级
		 * @param mountsLevel:int 坐骑等级
		 * @return 
		 * 
		 */		
		public setSceneAvatarVoPlayer(vo:SceneAvatarVo,vocation:number,sex:number,mountsState:number,bodyLevel:number,weaponLevel:number,wingLevel:number,mountsLevel:number = 0):SceneAvatarVo{
			//以下为多个部件时
			vo.body = "player_" + vocation + "_" + sex + "_"  + bodyLevel + "_"  + mountsState;
			vo.weapon = "weapon_" + vocation + "_"  + sex + "_"  +  weaponLevel + "_"  + mountsState;
			vo.wing = "wing_" + vocation + "_"  + sex + "_"  + wingLevel + "_"  + mountsState;
			vo.mounts = "mounts_" + vocation + "_"  + sex + "_"  + mountsLevel + "_"  + mountsState;
			
			return vo;
		}
		//
		/**
		 * 设置玩家纸娃娃数据，无坐骑
		 * @param vo:SceneAvatarVo 纸娃娃数据对象
		 * @param vocation:int 职业
		 * @param sex:int 性别
		 * @param bodyLevel:int 主体等级
		 * @param weaponLevel:int 武器等级
		 * @param wingLevel:int 翅膀等级
		 * @return
		 *
		 */
		public setSceneAvatarVoPlayer2(vo:SceneAvatarVo,vocation:number,sex:number,bodyLevel:number,weaponLevel:number,wingLevel:number):SceneAvatarVo{
			//以下为多个部件时
			vo.body = "player_" + vocation + "_" + sex + "_"  + bodyLevel;
			vo.weapon = "weapon_" + vocation + "_"  + sex + "_"  +  weaponLevel;
			vo.wing = "wing_" + vocation + "_"  + sex + "_"  + wingLevel;

			return vo;
		}
		//
		/**
		 * 设置 普通 纸娃娃数据
		 * @param vo
		 * @param npcLo
		 * @return 
		 * 
		 */		
		public setSceneAvatarVo(vo:SceneAvatarVo,lo:SceneElementLo):SceneAvatarVo{
			if(lo)
				vo.body = lo.movieName;
			
			return vo;
		}
		//
		/**
		 * 获取技能动作名称
		 * @param vocation 玩家职业
		 * @param skillLevel 玩家技能等级
		 * @param skillLevel2 玩家普攻技能等级
		 * @returns {string}
		 */
		public getSkillMovieName(vocation:number,skillLevel:number,skillLevel2:number = 0):string{
			if(skillLevel2 > 0)
				return "skill_" + vocation + "_" + skillLevel + "_" + skillLevel2;

			return "skill_" + vocation + "_" + skillLevel;
		}
	}
}