
module egret {

	export class IsoNode{
		/**
		 * 行索引，默认 -1 为无效行
		 */		
		public row:number = -1;
		/**
		 * 列索引，默认 -1 为无效列 
		 */		
		public column:number = -1;
		/**
		 * 等角尺寸(px) 
		 */		
		public size:number = 0;
		/**
		 * 2D坐标点 
		 */		
		public point2D:Point = null;
		/**
		 * 3D深度 
		 */		
		public depth:number = 0;
		/**
		 * 3D坐标点 
		 */		
		public point3D:Point3D = null;
		/**
		 * 路径中的上一个节点 
		 */		
		public preNode:IsoNode = null;
		/**
		 * 路径中的下一个节点 
		 */		
		public nextNode:IsoNode = null;
		/**
		 * 寻路总代价值 f = g + h 
		 */		
		public f:number = 0;
		/**
		 * 寻路起点至当前节点的代价值 
		 */		
		public g:number = 0;
		/**
		 * 寻路当前节点到终点的代价值 
		 */		
		public h:number = 0;
		/**
		 * 节点行走的难度系数，值越大表示越难行走，如山坡节点比平地节点更难行走，此值应大于0，默认值:1
		 */		
		public factor:number = 1;
		/**
		 * 寻路算法专用标记，表示是否已查询过此节点
		 */		
		public flag:boolean = false;
		
		public toString():string{
			return "[IsoNode(row = " + this.row + ",column = " + this.column + ",depth = " + this.depth + ")]" 
		}
		//
		/**
		 * 复制参数属性值，注意 point2D,point3D,nextNode,preNode 必须不为 null 时才能复制对应属性值
		 * @param node
		 * 
		 */		
		public copyBy(node:IsoNode):void{
			this.row = node.row;
			this.column = node.column;
			this.size = node.size;
			this.depth = node.depth;
			this.f = node.f;
			this.g = node.g;
			this.h = node.h;
			this.factor = node.factor;
			
			if(this.nextNode && node.nextNode)
				this.nextNode.copyBy(node.nextNode);
			if(this.preNode && node.preNode)
				this.preNode.copyBy(node.preNode);
			
			if(this.point2D && node.point2D){
				this.point2D.x = node.point2D.x;
				this.point2D.y = node.point2D.y;
			}
			
			if(this.point3D && node.point3D){
				this.point3D.x = node.point3D.x;
				this.point3D.y = node.point3D.y;
				this.point3D.z = node.point3D.z;
			}
		}
		//
		/**
		 * 初始化节点数据中的复杂数据字段 
		 * 
		 */		
		public init():void{
			this.preNode = new IsoNode();
			this.nextNode = new IsoNode();
			this.point2D = new Point();
			this.point3D = new Point3D();
		}
	}
}