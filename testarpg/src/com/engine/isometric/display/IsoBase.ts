
module egret {

	export class IsoBase extends CoreSprite{
		/**
		 * 行索引 
		 */		
		public column:number = 0;
		/**
		 * 列索引 
		 */		
		public line:number = 0;
		
		/**
		 * x轴速度 
		 */		
		public vx:number = 0; 
		/**
		 * y轴速度 
		 */		
		public vy:number = 0; 
		/**
		 * z轴速度 
		 */		
		public vz:number = 0; 
		
		//3D坐标点
		public _position:Point3D; 
		//尺寸px
		public _size:number = 0; 
		//是否可行走
		public _walkable:boolean = false; 
		//3D深度
		public _depth:number = 0;
		//3D空间占用的矩形
		public _rect:Rectangle = null;
		//2D坐标点
		public _point:Point = null;
		
		//更新数据标记
		public _updateData:any = null;
		
		/**
		 * 构造函数 
		 * @param size:Number 尺寸(px)
		 * 
		 */		
		public constructor(size:number) {
			super();
			this._updateData = new Object();
			
			this._rect = new Rectangle(0,0,size,size);
			
			this._size = size;
			this._position = new Point3D();
			this._point = new Point();
			
			this.updateScreenPosition();
		} 
		
		/** 
		 * 自身的具体描述方式 
		 */ 
		public toString():string { 
			return "[IsoObject (x:" + this._position.x + ", y:" + this._position.y+ ", z:" + this._position.z + ")]"; 
		} 
		
		/** 
		 * 设置/读取 3D空间中的 x坐标 
		 */ 
		public set x(value:number) { 
			if(this._position.x == value) return;
			
			this._position.x = value; 
			this.updateScreenPosition(); 
		} 
		public get x():number { 
			return this._position.x; 
		} 
		
		/** 
		 *  设置/读取3D空间中的 y坐标 
		 */ 
		public set y(value:number) { 
			if(this._position.y == value) return;
			
			this._position.y = value; 
			this.updateScreenPosition(); 
		} 
		public get y():number { 
			return this._position.y; 
		} 
		
		/** 
		 *  设置/读取3D空间中的 z 坐标 
		 */ 
		public set z(value:number) { 
			if(this._position.z == value) return;
			
			this._position.z = value; 
			this.updateScreenPosition(); 
		} 
		public get z():number { 
			return this._position.z; 
		}
		
		/** 
		 *  设置/读取3D空间中的坐标点 
		 */ 
		public set position(value:Point3D) { 
			if(this._position.x == value.x && this._position.y == value.y && this._position.z == value.z) return;
			
			this._position = value;
			
			this.updateScreenPosition(); 
		} 
		
		public get position():Point3D { 
			if(this.getUpdateData("position")){
				this._position = IsoUtil.getPoint3D(this._point);
				
				this.setUpdateData("position",false);
			}
			
			return this._position; 
		} 
		
		/** 
		 * 节点位置在3D空间中的深度
		 */ 
		public get depth():number { 
			if(this.getUpdateData("depth")){
				this._depth = (this.position.x + this.position.z) * 0.866 - this.position.y * 0.707;
				
				this.setUpdateData("depth",false);
			}
			
			return this._depth; 
		} 
		
		/** 
		 * 指定其它对象是否可以经过所占的位置 
		 */ 
		public set walkable(value:boolean) { 
			this._walkable = value; 
		} 
		
		public get walkable():boolean { 
			return this._walkable; 
		} 
		
		/** 
		 * 返回尺寸 
		 */ 
		public get size():number { 
			return this._size; 
		} 
		
		/** 
		 * 返回3D空间占用着的矩形 
		 */ 
		public get rect():Rectangle { 
			if(this.getUpdateData("rect")){
				this._rect.x = this.position.x - this._size / 2;
				this._rect.y = this.position.z - this._size / 2;
				
				this.setUpdateData("rect",false);
			}
			
			return this._rect; 
		} 
		/**
		 * 设置2D坐标点 
		 * @param value
		 * 
		 */		
		public set point(value:Point){
			if(this._point.x == value.x && this._point.y == value.y) return;
			
			this._point = value;
			
			this._setX(this._point.x);
			this._setY(this._point.y);
			
			this.invalidate();
		}
		
		public get point():Point{
			return this._point;
		}
		
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
		
		/** 
		 * 把当前时刻的一个 3D坐标点转换成屏幕上的 2D坐标点 
		 * 并将自己安置于该点 
		 */ 
		public updateScreenPosition():void { 
			this.point = IsoUtil.getPoint2D(this._position);
			//position计算point时，position不用标记更新
			this.setUpdateData("position",false);
		} 
		/**
		 * 设置更新属性类型数据 
		 * @param property:String 需要更新的属性
		 * @param updated:Boolean 标记是否需要更新
		 * 
		 */		
		public setUpdateData(property:string,updated:boolean = true):void{
			this._updateData[property] = updated;
		}
		//
		/**
		 * 获取更新数据，多个属性时用||运算，只要有一个属性为true则返回true
		 * @param args 需要更新的属性列表
		 * @return 
		 * 
		 */		
		public getUpdateData(...args):boolean{
			var result:boolean = false;
			if(this._updateData){
				var length:number = args.length;
				for(var i:number = 0;i < length;i++){
					var v:string = args[i];
					result = result || this._updateData[v];

					if(result)
						break;
				}
			}

			return result;
		}
		//
		/**
		 * 更新深度等数据 
		 * 
		 */		
		private invalidate():void{
			this.setUpdateData("depth");
			this.setUpdateData("rect");
			this.setUpdateData("position");
		}
	}
}