
module egret {

	export class SceneElement extends CoreContainer implements ISceneElement{
		
    	/**场景对象*/
		public scene:SceneDriver;
		//场景元素数据
		public _data:SceneElementDataItem = null;
		//id，通常为vo或lo中的id
		public _id:string = null;
		//当前xy
		public _x:number = 0;
		public _y:number = 0;
		//透明度
		public _alpha:number = 0;
		//上次深度x,y
		public _lastX:number = 0;
		public _lastY:number = 0;
		//深度
		public _depth:number = 0;
		//名称面板
		public _namePad:SceneElementNamePad = null;
		//深度坐标点
		private _depthPoint:Point = null;
		private _depthPoint3D:Point3D = null;
		//是否启用
		public _enabled:boolean = true;

		public constructor(){
			super();
			
			this.touchEnabled = false;
			this.touchChildren = false;
			
			this._namePad = new SceneElementNamePad();
			this.addChild(this._namePad);
			
			this._depthPoint = new Point();
			this._depthPoint3D = new egret.Point3D();
			
			this.addListeners();
		}

		public get enabled():boolean{
			return this._enabled;
		}
		
		/**是否启用此对象的鼠标响应 */
		public set enabled(value:boolean){
			if(this._enabled == value) 
    			return;
			
			this._enabled = value;
			
			this.touchEnabled = this._enabled;
		}

		public get alpha():number{
			return this._alpha;
		}

		public set alpha(value:number){
			if(this._alpha == value) 
    			return;
			
			this._alpha = value;
			
			super._setAlpha(value);
		}

		public get y():number{
			return this._y;
		}

		public set y(value:number){
			if(this._y == value)
    			return;
			
			this._y = value;
			
			super._setY(value);
		}

		public get x():number{
			return this._x;
		}

		public set x(value:number){
			if(this._x == value) 
    			return;
			
			this._x = value;
			
			super._setX(value);
		}

		/**名称面板*/
		public get namePad():SceneElementNamePad{
			return this._namePad;
		}

		/**获取元素深度*/		
		public get depth():number{
			return this.getDepth();
		}
		
		/**获取元素深度*/
		public getDepth(): number {
			if(this._lastX != this._x || this._lastY != this._y){
				this._lastX = this._x;
				this._lastY = this._y;

				this._depthPoint.x = this._x;
				this._depthPoint.y = this._y;

				this._depth = IsoUtil.getDepth(IsoUtil.getPoint3D(this._depthPoint,this._depthPoint3D));
			}

			return this._depth;
		}
		
		public get id():string{
			return this._id || this.name;
		}
		
		/**场景元素显示对象id*/		
		public set id(value:string){
			this._id = value;
		}
		
		public get data():SceneElementDataItem{
			return this._data;
		}
		
		/**场景元素数据*/		
		public set data(value:SceneElementDataItem){
			this.setData(value);
		}

		/**
		 * 设置场景元素数据
		 * @param value:SceneElementDataItem
		 *
		 */
		public setData(value:SceneElementDataItem):void{
			this._data = value;

			if(this._data){
				//对于简单类型 + ""比 .toString()更快，复杂类型反之
				if(this._data.vo && this._data.vo.id)
					this._id = this._data.vo.idString;
				else if(this._data.lo && this._data.lo.id)
					this._id = this._data.lo.idString;
				else
					throw new Error("无效的场景元素数据，id 不能为 0");
			}
		}

		/**更新名称面板*/		
		public updateName():void{
			var name:string = null;
			
			if(this._data){
				if(this._data.vo)
					name = this._data.vo.name;// + "-" + _data.vo.id;
				if(!name && this._data.lo)
					name = this._data.lo.name;
			}
			if(name){
				this._namePad.setName(name);
			}
		}

		/**场景元素刷新*/		
		public updateXY():void{
			var vo:SceneElementVo = this._data.vo;
			if(vo){
				this.x = vo.x;
				this.y = vo.y;
			}
		}
		
		/**添加至场景时处理*/		
		public addToScene():void{
			this.updateName();
			this.updateXY();
			
			this.addListeners();
		}
		
		/**从场景移除时处理*/		
		public removeFromScene():void{
		}

		/**添加内部事件 */		
		public addListeners():void{
		}

		/**
		 * 设置名称文本格式
		 * @param format:TextFormat = null 参数为 null 时重置为原格式
		 *
		 */
		public setNameTextFormat(size:number = 20,color:number = 0xffffff):void{
			this._namePad.setNameTextFormat(size,color);
		}

		/**销毁对象，将删除所有事件侦听(包括非组件内部调用addEventListener注册的事件侦听)及变量引用并从显示列表删除，无法重新使用，释放内存资源*/
		public destroy():void{
			if(this._isDestroy) 
    			return;
			
			this._namePad.destroy();
			super.destroy();
		}
		
	}
}