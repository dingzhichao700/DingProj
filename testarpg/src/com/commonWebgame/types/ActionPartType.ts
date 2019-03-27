
module egret {

	export class ActionPartType{
        /**
        * 主体 
        */		
        public static BODY:string = "body";
        /**
        * 武器 
        */		
        public static WEAPON:string = "weapon";
        /**
        * 翅膀 
        */		
        public static WING:string = "wing";
        /**
        * 坐骑 
        */		
        public static MOUNTS:string = "mounts";
        
		/**
		 * 全部动作部件类型集合
		 */		
		public static TYPES:Array<string> = [ActionPartType.BODY,ActionPartType.WEAPON,ActionPartType.WING,ActionPartType.MOUNTS];
		/**
		 * 普通状态动作部件类型集合 
		 */		
		public static TYPES_NORMAL:Array<string> = [ActionPartType.BODY,ActionPartType.WEAPON,ActionPartType.WING];
		/**
		 * 只有主体部件 
		 */		
		public static TYPES_BODY_ONLY:Array<string> = [ActionPartType.BODY];
		
		//以下在数组中索引越小层级越高
		/**
		 * 上方向，部件层级配置 
		 */		
		public static DIRECTION_UP:Array<string> = [
			ActionPartType.WING,
			ActionPartType.WEAPON,
			ActionPartType.BODY,
			ActionPartType.MOUNTS
		];
		/**
		 * 右上方向，部件层级配置 
		 */		
		public static DIRECTION_UP_RIGHT:Array<string> = [
			ActionPartType.WING,
			ActionPartType.WEAPON,
			ActionPartType.BODY,
			ActionPartType.MOUNTS
		];
		/**
		 * 右方向，部件层级配置 
		 */		
		public static DIRECTION_RIGHT:Array<string> = [
			ActionPartType.WING,
			ActionPartType.WEAPON,
			ActionPartType.BODY,
			ActionPartType.MOUNTS
		];
		/**
		 * 右下方向，部件层级配置 
		 */		
		public static DIRECTION_DOWN_RIGHT:Array<string> = [
			ActionPartType.WEAPON,
			ActionPartType.BODY,
			ActionPartType.WING,
			ActionPartType.MOUNTS
		];
		/**
		 * 下方向，部件层级配置 
		 */		
		public static DIRECTION_DOWN:Array<string> = [
			ActionPartType.WEAPON,
			ActionPartType.BODY,
			ActionPartType.WING,
			ActionPartType.MOUNTS
		];
	}
}