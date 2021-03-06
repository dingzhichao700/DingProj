
module egret {

	export class BaseMovieClip2 extends CoreContainer{
		//动作位图
		public _bitmap:Bitmap = null;
		//阴影
		public _shadow:Bitmap = null;
		//动作数据
		public _baseMovieClipVo:BaseMovieClipVo = null;
		//帧数据数组
		public _dataItems:Array<any> = null;
		//是否存在数据数组
		public _hasData:boolean = false;
		//总帧数，默认值 0 表示无效值
		public _totalFrames:number = 0;
		//手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理
		public _totalFramesManual:number = 0;
		//最大帧索引
		public _frameIndexMax:number = 0;
		//帧频，默认值 0 表示无效
		public _frameRate:number = 0;
		
		/**
		 * 构造函数
		 */
		public constructor(){
			super();
			
			this._shadow = new Bitmap();
			this._shadow.cacheAsBitmap = true;
			this.addChild(this._shadow);
			
			this._bitmap = new Bitmap();
			this.addChild(this._bitmap);
		}

		public get totalFramesManual():number{
			return this._totalFramesManual;
		}
		/**
		 * 手动设置的总帧数，用于多个动作帧数不一致时的帧显示处理，使其从头开始循环取帧 ，默认值 0 表示无效值
		 * @param value
		 * 
		 */
		public set totalFramesManual(value:number){
			this._totalFramesManual = value;
		}

		/**
		 * 帧频，默认值 0 表示无效值 
		 * @return 
		 * 
		 */		
		public get frameRate():number{
			return this._frameRate;
		}
		/**
		 * 总帧数，默认值 0 表示无效值
		 * @return 
		 * 
		 */
		public get totalFrames():number{
			return this._totalFrames;
		}

		public get baseMovieClipVo():BaseMovieClipVo{
			return this._baseMovieClipVo;
		}
		/**
		 * 影片数据对象 
		 * @param value:BaseMovieClipVo
		 * 
		 */
		public set baseMovieClipVo(value:BaseMovieClipVo){
			this._baseMovieClipVo = value;
			
			if(this._baseMovieClipVo){
				this._dataItems = this._baseMovieClipVo.dataItems;
				this._hasData = true;
				this._totalFrames = this._dataItems.length;
				this._frameIndexMax = this._totalFrames - 1;
				this._frameRate = this._baseMovieClipVo.frameRate;
			}else if(this._bitmap && this._bitmap.texture){
				this._dataItems = null;
				this._hasData = false;
				this._totalFrames = 0;
				this._frameIndexMax = 0;
				this._frameRate = 0;
			}
		}
		//
		/**
		 * 清空当前显示数据并停止影片 
		 * 
		 */		
		public clear():void{
			this.baseMovieClipVo = null;
			this._bitmap.texture = null;
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			this.clear();
			
			super.destroy();
		}
		//
		/**
		 * 显示当前帧
		 * @param index:int 当前帧索引
		 * 
		 */		
		public setFrameIndex(index:number = 0):void{
			if(this._hasData){
				if(this._totalFramesManual > 0){
					//多个动作帧数不一致时，取当前有效帧，使其从头开始循环取帧
					if(index > this._frameIndexMax){
						index %= this._frameIndexMax;
					}
				}else if(index >= this._totalFrames){
					index = 0;
				}
				
				var item:BaseMovieClipDataItem = this._dataItems[index];
			}
			if(item){
				this._bitmap.x = item.x;
				this._bitmap.y = item.y;
				this._bitmap.texture = item.bitmapData;
			}else{
				this._bitmap.texture = null;
			}
		}
	}
}