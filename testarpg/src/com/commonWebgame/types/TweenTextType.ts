
module egret {

	export class TweenTextType{
		/**
		 * 向上缓动，停留一段时间，然后向上缓动渐隐，通常用于显示提示信息等  
		 */		
		public static MOVE_UP:number = 0;
		/**
		 * 向下缓动，停留一段时间，然后向下渐隐 ，通常用于剧情信息
		 */		
		public static MOVE_DOWN:number = 1;
		/**
		 * Alpha值缓动，渐显渐隐，通常用于显示属性值或获得物品等
		 */		
		public static ALPHA:number = 2;
	}
}