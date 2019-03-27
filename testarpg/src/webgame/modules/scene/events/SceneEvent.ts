
module egret {

	export class SceneEvent extends Event{
		/**
		 * 到达导航点，data =  SceneNavigatorDataItem，事件不冒泡
		 */		
		public static SCENE_ARRIVE_NAVI_POINT:string = "sceneArriveNaviPoint";
		/**
		 * 事件数据 
		 */		
		public data:any = null;
		/**
		 * 构造函数
		 */
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,data:any = null){
			super(type, bubbles, cancelable);
			
			this.data = data;
		}
	}
}