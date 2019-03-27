
module egret {

	export class ActionMovieClipEvent extends Event{
		/**
		 * "clipEnterFrame"，影片剪辑入帧事件类型
		 */		
		public static CLIP_ENTER_FRAME:string = "clipEnterFrame";
		/**
		 * "clipExitFrame"，影片剪辑入帧事件类型
		 */		
		public static CLIP_EXIT_FRAME:string = "clipExitFrame";
		/**
		 * 当前帧数，从0开始
		 * @defaultValue 0
		 */		
		public frameIndex:number = 0;
		/**
		 * 构造函数
		 * @param type
		 * @param bubbles
		 * @param cancelable
		 * @param frameIndex:int = frameIndex 触发事件的帧索引
		 * 
		 */		
		public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false,frameIndex:number = 0){
			super(type, bubbles, cancelable);
			
			this.frameIndex = frameIndex;
		}
	}
}