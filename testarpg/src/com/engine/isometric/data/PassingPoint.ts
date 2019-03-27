
module egret {

	export class PassingPoint{
		/**
		 * x坐标 
		 */		
		public x:number = 0;
		/**
		 * y坐标 
		 */		
		public y:number = 0;
		/**
		 * 目标点x坐标,NaN表示未指定目标点 
		 */		
		public tx:number = NaN;
		/**
		 * 目标点y坐标,NaN表示未指定目标点   
		 */		
		public ty:number = NaN;
		
		public toString():string{
			return "[PassingPoint(x = " + this.x + ", y = " + this.y + ", tx = " + this.tx + ", ty = " + this.ty + ")]";
		}
	}
}