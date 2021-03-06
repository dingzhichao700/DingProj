
module egret {

	export class SceneElementNamePad extends CoreContainer{
		//名称
		private _nameText:TextField = null;
		//层容器
		private _layerHashMap:HashMap = null;
		//容器，元素之间的水平竖直距离 
		private _gapX:number = 5;
		private _gapY:number = 5;
		//面板显示的名称
		private _nameValue:string = null;
		private _defaultColor:number = 0xffffff;
		private _defaultSize:number = 20;

		public constructor(){
			super();
//			this.graphics.lineStyle(1,0xff0000,1);
//			this.graphics.moveTo(-100,0);
//			this.graphics.lineTo(100,0);
			
			this.touchChildren = false;
			this.touchEnabled = false;
			
			//性能优化
			//this.cacheAsBitmap = true;
			
			this._layerHashMap = new HashMap();
			
			this._nameText = new TextField();
			//this._nameText.border = true;
			//this._nameText.filters = [new GlowFilter(0x0,1,2,2,3,1)];

			this.show(this._nameText,this.layersCount);
			this.setName("Name");
			this.setNameTextFormat(this._defaultSize,this._defaultColor);
		}

		/**名称文本对象*/		
		public get nameText():TextField{
			return this._nameText;
		}
		
		/**
		 * 获取指定层容器 ，没有时自动创建
		 * @param index:int 0为最底层
		 * @return 
		 * 
		 */
		public getLayerContainer(index:number = 0):DisplayObjectContainer{
			var container:DisplayObjectContainer = this._layerHashMap.get(index);
			
			if(!container){
				container = new DisplayObjectContainer();
				//container.cacheAsBitmap = true;
				this.addChild(container);
				
//				container.graphics.lineStyle(1,0xff0000,1);
//				container.graphics.moveTo(-10,0);
//				container.graphics.lineTo(10,0);
				
				this._layerHashMap.put(index,container);
				
				var keys:Array<any> = this._layerHashMap.keys();
				keys.sort(ArrayUtil.numeric);
				
				var length:number = keys.length;
				for(var i:number = 0; i < length; i++){
					this.setChildIndex(this._layerHashMap.get(keys[i]),i);
				}
				
				this.updateLayout();
			}
			
			return container;
		}

		/**设置名称 */		
		public setName(name:string):void{
			if(name == this._nameValue) 
    			return;
			
			this._nameValue = name;
			this._nameText.text = this._nameValue;
			
			this.updateLayout();
		}
		//
		/**
		 * 设置名称文本格式 
		 * @param format:TextFormat = null 参数为 null 时重置为原格式
		 * 
		 */		
		public setNameTextFormat(size:number = 20,color:number = 0xffffff):void{
			this._nameText.text = this._nameValue;
			this._nameText.size = size;
			this._nameText.textColor = color;
			
			this.updateLayout();
		}
		//
		/**
		 * 当前层数 
		 * @return 
		 * 
		 */		
		public get layersCount():number{
			return this.numChildren;
		}
		//
		/**
		 * 显示元素 
		 * @param target:DisplayObject 元素
		 * @param layerIndex:int 层级，没有时自动创建，从 0 开始，名称在第 0 层，层越高，离头像距离越大
		 * @param index:int = -1 元素在容器的位置索引 ，从 0 开始，传递给 addChildAt()，默认添加到最后
		 * @param x:Number = NaN
		 * @param y:Number = NaN
		 * 
		 */		
		public show(target:DisplayObject,layerIndex:number,index:number = -1,x:number = NaN,y:number = NaN):void{
			var container:DisplayObjectContainer = this.getLayerContainer(layerIndex);

			if(!isNaN(x))
				target.x = x;
			if(!isNaN(y))
				target.y = y;
			
			if(index == -1){
				index = container.numChildren - 1;
				if(index < 0)
					index = 0;
			}
			
			if(target.parent != container)
				container.addChildAt(target,index);
			
			this.updateLayout();
		}

		/**
		 * 移除元素 
		 * @param target
		 * 
		 */		
		public hide(target:DisplayObject):void{
			if(target && target.parent){
				target.parent.removeChild(target);
				
				this.updateLayout();
			}
		}

		/**更新布局 */		
		public updateLayout():void{
			var length:number = this.numChildren;
			var height:number = 0;
			var width:number = 0;
			var container:DisplayObjectContainer = null;
			var child:DisplayObject = null;
			var num:number = 0;
			
			for(var i:number = 0; i < length; i++){
				width = 0;
				
				container = <DisplayObjectContainer><any> (this.getChildAt(i));
				
				if(i == 0){
					height -= container.height / 2;
				}else{
					height -= container.height;
					height -= this._gapY;
				}
				
				num = container.numChildren;
				for(var j:number = 0; j < num; j++){
					child = container.getChildAt(j);
					child.x = width;
					child.y = -child.height / 2;
					
					width += child.width + this._gapX;
				}
				
				container.y = height;
				container.x = -container.width / 2;
			}
		}
		
	}
}