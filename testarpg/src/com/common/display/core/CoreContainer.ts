
module egret {

	export class CoreContainer extends DisplayObjectContainer{
		//是否已销毁
		public _isDestroy:boolean = false;
		//侦听数据
		private _listenerData:any=null;
		//捕获阶段侦听数据
		private _listenerData2:any=null;
		///**
		// * 是否在宽高改变时调度resize事件
		// * @defaultValue false
		// */
		//public isResized:boolean = false;
		////上次宽度
		//private _preWidth:number = 0;
		////上次高度
		//private _preHeight:number = 0;
		////舞台对象
		//public _stage:Stage = null;
		/**
		 * 构造函数
		 */
		public constructor(){
			super();

			this._listenerData=new Object();
			this._listenerData2 = new Object();
			
			//this.addEventListener(Event.ADDED_TO_STAGE,this.addedToStage,this);
		}
		//
		/**
		 * 返回自身类名，CoreSprite 实例的显示名称:"CoreSprite"
		 */
		public get className():string{
			return this.constructor["name"];
		}

		//
		/**
		 * 将CoreSprite实例输出为其在显示列表中的层级格式:Stage.xxx.xxx
		 * @return
		 *
		 */
		public toString():string{
			var target:DisplayObject=this.parent;
			var name:string=this.className;
			var temp:string="";
			while(target!=null){
				if(this.stage!=null&&target==this.stage){
					name = "Stage" + "." + name;
				}else{
					//因hasOwnProperty()无效，替换
					if("className" in target){
						name = target["className"] + "." + name;
					}else{
						name = target.name + "." + name;
					}
				}

				target=target.parent;
			}

			return name;
		}
		//
		/**
		 * 重写事件添加方法，记录所有内部或外部添加的事件，在调用destroy()方法后，将自动移除所有事件侦听
		 * @param type
		 * @param listener
		 * @param useCapture
		 * @param priority
		 * @param useWeakReference
		 *
		 */
		public addEventListener(type:string, listener:Function,thisObj:any, useCapture:boolean=false, priority:number=0):void{
			if(this._isDestroy) return;

			super.addEventListener(type,listener,thisObj,useCapture,priority);

			if(useCapture){
				this._listenerData2[type] = listener;
			}else{
				this._listenerData[type] = listener;
			}
		}
		//
		/**
		 * 重写事件移除方法，记录所有内部或外部添加的事件，在调用destroy()方法后，将自动移除所有事件侦听
		 * @param type
		 * @param listener
		 * @param useCapture
		 *
		 */
		public removeEventListener(type:string, listener:Function,thisObj:any, useCapture:boolean=false):void{
			if(this._isDestroy) return;

			super.removeEventListener(type,listener,thisObj,useCapture);

			//缓存机制，不删除key，否则频繁调用addEventListener()和removeEventListener()将大量分配内存
//			if(useCapture){
//				delete _listenerData2[type];
//			}else{
//				delete _listenerData[type];
//			}
		}
		//此方法重写会使egret内部出现width = null
//		public set width(value:number){
//			this.recordWH();
//
////            super.width = value;
//            super._setWidth(value);
//
//			this.checkResize();
//		}
//		//
//		public set height(value:number){
//			this.recordWH();
//
////			super.height = value;
//            super._setHeight(value);
//
//			this.checkResize();
//		}
		//
		//public addChild(child:DisplayObject):DisplayObject{
		//	this.recordWH();
		//
		//	super.addChild(child);
		//
		//	this.checkResize();
		//
		//	return child;
		//}
		////
		//public addChildAt(child:DisplayObject, index:number = 0):DisplayObject{
		//	this.recordWH();
		//
		//	super.addChildAt(child,index);
		//
		//	this.checkResize();
		//
		//	return child;
		//}
		////
		//public removeChild(child:DisplayObject):DisplayObject{
		//	this.recordWH();
		//
		//	super.removeChild(child);
		//
		//	this.checkResize();
		//
		//	return child;
		//}
		////
		//public removeChildAt(index:number = 0):DisplayObject{
		//	this.recordWH();
		//
		//	var child:DisplayObject = super.removeChildAt(index);
		//
		//	this.checkResize();
		//
		//	return child;
		//}
//		//
//		override public function removeChildren(beginIndex:int=0, endIndex:int=int.MAX_VALUE):void{
//			super.removeChildren(beginIndex,endIndex);
//			
//			this.dispatchEvent(new Event(Event.RESIZE,true));
//		}
		//
		/**
		 * 自动销毁所有仍在此容器显示列表中的后代显示对象，若外部有引用此容器中的后代，应将其从此容器中remove掉
		 * 
		 */		
		public destroy():void{
			if(this._isDestroy) return;
			
			DisplayObjectUtil.destroyChildren(this,true);

			if(this.parent)
				this.parent.removeChild(this);

			for(var p in this._listenerData){
				this.removeEventListener(p,this._listenerData[p],this,false);
			}
			for(p in this._listenerData2){
				this.removeEventListener(p,this._listenerData2[p],this,true);
			}

			this._listenerData = null;
			this._listenerData2 = null;

			this._isDestroy = true;
		}
		////
		//public addedToStage(e:Event):void{
		//	this.removeEventListener(Event.ADDED_TO_STAGE,this.addedToStage,this);
		//}
		////
		///**
		// * 记录当前宽高
		// *
		// */
		//private recordWH():void{
		//	this._preHeight = this.height;
		//	this._preWidth = this.width;
		//}
		////
		///**
		// * 检测是否有尺寸变化
		// *
		// */
		//private checkResize():void{
		//	if(!this.isResized) return;
		//
		//	//此事件不要冒泡，影响舞台侦听
		//	if(this._preWidth != this.width || this._preHeight != this.height)
		//		this.dispatchEvent(new Event(Event.RESIZE,false,false));
		//}
	}
}