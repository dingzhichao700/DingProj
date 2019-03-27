
module egret {

	export class AlignItem{
		/**
		 * 对齐方式 AlignType 
		 */		
		public align:number = 0;
		/**
		 * 与上边框的距离
		 * @param value:Number 默认值:0px
		 * 
		 */
		public top:number = 0;
		/**
		 * 与下边框的距离 
		 * @param value:Number 默认值:0px
		 * 
		 */
		public bottom:number = 0;
		/**
		 * 与左边框的距离 
		 * @param value:Number 默认值:0px
		 * 
		 */
		public left:number = 0;
		/**
		 * 与右边框的距离
		 * @param value:Number 默认值:0px
		 * 
		 */
		public right:number = 0;
		
		/**
		 * 构造函数
		 */
		public constructor(){
		}
	}
}