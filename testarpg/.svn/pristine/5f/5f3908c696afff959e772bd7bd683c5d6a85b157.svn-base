
module egret {

	export class DimensionUtil{
		//
		/**
		 * 计算3D空间两点的距离 
		 * @param point1:Point3D
		 * @param point2:Point3D
		 * @return 
		 * 
		 */		
		public static distance3D(point1:Point3D,point2:Point3D):number{
			var x:number = point1.x - point2.x;
			var y:number = point1.y - point2.y;
			var z:number = point1.z - point2.z;
			//不用Math.pow()函数，提高效率
			return Math.sqrt(x * x + y * y + z * z);
		}
		//
		/**
		 * 计算2D空间中两点的距离 
		 * @param point1:Point
		 * @param point2:Point
		 * @return 
		 * 
		 */		
		public static distance(point1:Point,point2:Point):number{
			var x:number = point1.x - point2.x;
			var y:number = point1.y - point2.y;
			
			//不用Math.pow()函数，提高效率
			return Math.sqrt(x * x + y * y);
		}
		//
		/**
		 * 计算2D空间中两点的距离
		 * @return
		 *
		 */
		public static distance2(x1:number,y1:number,x2:number,y2:number):number{
			var x:number = x1 - x2;
			var y:number = y1 - y2;

			//不用Math.pow()函数，提高效率
			return Math.sqrt(x * x + y * y);
		}
	}
}