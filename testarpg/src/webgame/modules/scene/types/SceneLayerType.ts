
module egret {

	export class SceneLayerType{
		/**
		 * 层级配置 
		 */		
		public static LAYER_MOUSE_CONFIGS:Array<any> = 
			[
				//鼠标交互配置
				{touchEnabled:false,touchChildren:false},//0
				{touchEnabled:false,touchChildren:true},
				{touchEnabled:false,touchChildren:false},//2
				{touchEnabled:false,touchChildren:true},
				{touchEnabled:false,touchChildren:true},// 4
				{touchEnabled:false,touchChildren:false},
				{touchEnabled:false,touchChildren:false},//6
				{touchEnabled:false,touchChildren:false}
			];
		/**
		 * 场景提示特效(任务提示特效等) 7
		 */		
		public static TIP_EFFECT:number = 7;
		/**
		 * 前景层(静态或动态景物)  6
		 */		
		public static FRONT_VIEW:number = 6;
		/**
		 * 战斗效果层(上层技能效果等) 5
		 */		
		public static BATTLE_EFFECT:number = 5;
		/**
		 * 生物层(角色，npc等) 4
		 */		
		public static BIOLOGY:number = 4;
		/**
		 * 物品层 3
		 */		
		public static GOODS:number = 3;
		/**
		 * 地面特效层(下层技能效果等) 2 
		 */		
		public static BACKGROUND_EFFECT:number = 2;
		/**
		 * 近景层(地图或静态或动态景物)  1
		 */		
		public static NEARBY_VIEW:number = 1;
		/**
		 * 远景层(静态或动态景物) 0
		 */		
		public static DISTANT_VIEW:number = 0;
	}
}