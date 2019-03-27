
module egret {
	/**
	 * 职业枚举
	 */
	export class VocationType{
		/**
		 * 无职业 
		 */		
 		public static NONE:number = 0;
		/**
		 * 战士  1
		 */
		public static WARRIOR:number = 1;
		/**
		 * 法师  2
		 */
		public static  MAGE:number = 2;
		/**
		 * 射手  3
		 */
		public static BOWMAN:number = 3;

		public static TYPES:Array<number> = [VocationType.WARRIOR,VocationType.MAGE,VocationType.BOWMAN];
	}
}