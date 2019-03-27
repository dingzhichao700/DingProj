
module egret {

	export class IsoTile extends IsoBase{
		/**
		 * 节点的3D高度 
		 */		
		public _isoHeight:number = 0; 
		/**
		 * 绘制颜色 
		 */		
		public _color:number = 0x666666; 
		//透明度
		public _alpha:number = 1;
		//是否填充绘制
		public _fill:boolean = true;
		//线宽
		public _thickness:number = 1;
		
		/**
		 * 构造函数 
		 * @param size:Number 尺寸(px)
		 * @param color:uint = 0x666666 颜色
		 * @param alpha:Number = 1 透明度
		 * @param isoHeight:Number = 0 3D高度
		 * 
		 */		
		public constructor(size:number, color:number = 0x666666,alpha:number = 1, isoHeight:number = 0,thickness:number = 1,fill:boolean = true) { 
			super(size); 
			
			this._color = color; 
			this._isoHeight = isoHeight; 
			this._alpha = alpha;
			this._fill = fill;
			this._thickness = thickness;
			
			this.draw(); 
		} 
		
		/** 
		 * Draws the tile. 
		 */ 
		public draw():void { 
			this.graphics.clear(); 
			if(this._fill)
				this.graphics.beginFill(this._color,this._alpha); 
			this.graphics.lineStyle(this._thickness, this._color, this._alpha); 
			this.graphics.moveTo(-this._size, 0); 
			this.graphics.lineTo(0, -this._size / 2); 
			this.graphics.lineTo(this._size, 0); 
			this.graphics.lineTo(0, this._size / 2); 
			this.graphics.lineTo(-this._size, 0); 
			if(this._fill)
				this.graphics.endFill();
		}
		
		/** 
		 * Sets / gets the height of this object. Not used in this class, but can be used in subclasses. 
		 */ 
		/**
		 * 设置3D高度，对于本类无效，用于IsoBox 
		 * @param value
		 * 
		 */		
		public set isoHeight(value:number) { 
			if(this._isoHeight == value) return;
			
			this._isoHeight = value; 
			this.draw(); 
		} 
		
		public get isoHeight():number { 
			return this._isoHeight; 
		} 
		
		/** 
		 * Sets / gets the color of this tile. 
		 */ 
		/**
		 * 设置绘制颜色 
		 * @param value
		 * 
		 */		
		public set color(value:number) {
			if(this._color == value) return;
			
			this._color = value; 
			this.draw(); 
		}
		
		public get color():number {
			return this._color; 
		}
	}
}