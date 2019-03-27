
module egret {

	/**
	 * MapNode 地图节点数据<br/>
	 * @author Dempsey <br/>
	 * 2013-8-29
	 */
	export class MapNode extends IsoNode{

		public constructor(){
			super();
		}
		/**
		 * 节点类型 
		 */		
		public type:number = 0;
		/**
		 * 是否可行走 
		 */		
		public isWalkable:boolean = true;
		
		public toString():string{
			return "[MapNode(row = " + this.row + ",column = " + this.column + ",depth = " + this.depth + ",type = " + this.type + ")]" 
		}
	}
}