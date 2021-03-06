
module egret {

	export class BaseMovieClipVo{
		/**
		 * 帧数据 BaseMovieClipDataItem 数组，按帧索引排列
		 */		
		public dataItems:Array<any> = [];
		/**
		 * 帧频 
		 */		
		public frameRate:number = 0;
		/**
		 * 头顶线 y坐标
		 */		
		public topLineY:number = 0;
		/**
		 * 中心点坐标 
		 */		
		public centerPoint:Point = new Point();
		/**
		 * 阴影宽度，为0时无阴影 
		 */		
		public shadowWidth:number = 0;
		/**
		 * 阴影高度，为0时无阴影  
		 */		
		public shadowHeight:number = 0;
		/**
		 * 是否有帧图片
		 */
		public hasFrameTexture:boolean;
		/**
		 * 销毁 
		 * 
		 */		
		public destroy():void{
			var length:number = this.dataItems.length;
			for(var i:number = 0;i < length;i++){
				var item:BaseMovieClipDataItem = this.dataItems[i];
				item.destroy();
			}
			
			this.dataItems = null;
			this.centerPoint = null;
		}
		////
		///**
		// * 是否有帧图片
		// * @returns {Array<any>|boolean}
		// */
		//public get hasFrameTexture():boolean{
		//	return this.dataItems && this.dataItems.length > 0 && this.dataItems[0];
		//}
	}
}