
module egret {


	/**
	 * ScenePlayerVo 场景玩家数据 <br/>
	 * @author Dempsey <br/>
	 * 2013-10-5
	 */
	export class ScenePlayerVo extends SceneDriverVo{

		public constructor(){
			super();
		}
		/**
		 * 性别 SexType 0：未知，1:男，2：女
		 */		
		public sex:number = 1;
		/**
		 * 等级 
		 */		
		public level:number = 0;
		/**
		 * 职业 VocationType
		 */		
		public vocation:number = 0;

		/**
		 * 角色主体等级 
		 */		
		public bodyLevel:number = 1;
		/**
		 * 武器等级 
		 */		
		public weaponLevel:number = 1;
		/**
		 * 翅膀等级 
		 */		
		public wingLevel:number = 1;
		/**
		 * 坐骑等级 
		 */		
		public mountsLevel:number = 1;
		/**
		 * 坐骑状态 MountedType 
		 */		
		public mountsState:number = 1;//1,2,3，正常，坐骑，飞骑
	}
}