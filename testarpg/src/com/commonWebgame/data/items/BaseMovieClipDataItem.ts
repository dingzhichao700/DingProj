
module egret {

	export class BaseMovieClipDataItem{
		/**
		 * 图片x坐标 
		 */		
		public x:number = 0;
		/**
		 * 图片y坐标 
		 */		
		public y:number = 0;
		/**
		 * 图片数据 
		 */		
		public bitmapData:Texture = null;
		/**
		 * 编码或解码 bitmapData 数据时的使用的数组对象
		 */		
		public bytes:ByteArray = null;
		
		/**
		 * 销毁数据 
		 * 
		 */		
		public destroy():void{
			if(this.bitmapData)
				this.bitmapData.dispose();
			if(this.bytes)
				this.bytes.clear();
			
			this.bitmapData = null;
			this.bytes = null;
		}
	}
}