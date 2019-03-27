
module egret {

	export class TreePathItem{
		/**
		 * 父项目 
		 */		
		public parent:TreePathItem = null;
		/**
		 * 项目数据 
		 */		
		public data:any = null;
		/**
		 * 子节点项目数组 
		 */		
		public children:Array<any> = null;
		/**
		 * 构造函数
		 */
		public constructor(data:any = null,parent:TreePathItem = null){
			this.data = data;
			this.parent = parent;
			
			this.children = [];
			
			if(this.parent)
				this.parent.children.push(this);
		}
	}
}