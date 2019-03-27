
module egret {

	export class Image extends CoreContainer{
		/**
		 * 默认样式类 ，若实例的 isShowLoading = true 则加载过程显示此样式
		 */
		public static defaultLoadingStyle:any = null;
		//加载到的图片表
		private static _contentMap:HashMap = new HashMap();

		/**
		 * 内容宽高是否自动调整为组件宽高  默认为 true
		 */		
		public autoFixed:boolean = true;
		
		/**
		 * 加载完成回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 */		
		public loadComplete:Function = null;
		/**
		 * 加载过程回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 */		
		public loadProgress:Function = null;
		/**
		 * 加载出现错误时回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 */		
		public loadError:Function = null;
		//是否显示加载样式
		private _isShowLoading:boolean = true;
		
		//图片地址
		private _url:string = null;
		//宽度
		private _width:number = 0;
		//高度
		private _height:number = 0;
		
		//加载到的内容
		private _content:DisplayObject = null;
		//加载样式
		private _loadingStyle:any = null;
		//是否已加载完成，加载开始时才设为false
		private _isCompleted:boolean = true;
		private _thisObj:any;
		
		/**
		 * 构造函数  图片组件，默认不响应鼠标事件
		 * @param url:String = null 加载的图片地址，为null时清空已加载的图片
		 * @param width:Number = 0  图片宽度，未设置时加载到图片后设为图片的宽度，若要显示加载样式应设置此属性，使加载样式居中
		 * @param height:Number = 0  图片高度，未设置时加载到图片后设为图片的高度，若要显示加载样式应设置此属性，使加载样式居中
		 * @param isShowLoading:Boolean = true 是否显示加载样式
		 * @param loadComplete:Function = null 加载完成回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 * @param loadProgress:Function = null 加载过程回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 * @param loadError:Function = null 加载出现错误时回调函数 function(image:Image){}，在设置url属性前或构造函数中设置此属性有效
		 * 
		 */		
		public constructor(url:string = null,width:number = 0,height:number = 0,isShowLoading:boolean = true,
							  thisObj:any = null,loadComplete:Function = null,loadProgress:Function = null,loadError:Function = null){
			super();
			
			this.touchEnabled = false;
			this.touchChildren = false;

			this._thisObj = thisObj;

			this._width = width;
			this._height = height;
			
			this._isShowLoading = isShowLoading;
			
			this.loadComplete = loadComplete;
			this.loadProgress = loadProgress;
			this.loadError = loadError;
			
			this.url = url;
			
			//this.drawRectBorder(this,this._width,height);
		}
		/**
		 * 获取已存在的图片资源数据 
		 * @param url
		 * @return 
		 * 
		 */		
		public static getTexture(url:string):Texture{
			return Image._contentMap.get(url);
		}
		//
		/**
		 * 销毁已存在的图片资源数据 
		 * @param args 图片url数组
		 * 
		 */		
		public static destroyResource(...args):void{
			var bmd:Texture = null;
			
			var length:number = args.length;
			for(var i:number = 0;i < length;i++){
				var url:string = args[i];
				bmd = Image._contentMap.remove(url);
				if(bmd)
					bmd.dispose();
			}
		}
		
		public get isShowLoading():boolean{
			return this._isShowLoading;
		}
		
		/**
		 * 是否显示加载样式 
		 * @param value:Boolean 默认值:true
		 * 
		 */		
		public set isShowLoading(value:boolean){
			if(this._isShowLoading == value) return;
			
			this._isShowLoading = value;
			
			if(this._isCompleted)
				this.showLoadingStyle(false);
			else
				this.showLoadingStyle(this._isShowLoading);
		}
		
		public get content():DisplayObject{
			return this._content;
		}
		
		/**
		 * 设置图片内容 ，将覆盖之前加载或显示的内容
		 * @param content:DisplayObject
		 * 
		 */		
		public set content(content:DisplayObject){
			this.showLoadingStyle(false);
			
			if(content != this._content && this._content && this._content.parent)
				this._content.parent.removeChild(this._content);
			
			this._content = content;
			
			if(this._content){
				if(this._content.parent != this)
					this.addChild(this._content);
				
				this._content.x = 0;
				this._content.y = 0;
				
				//未设置宽高时，使用图片宽高
				if(this._width == 0 || this._height == 0){
					this._width = this._content.width;
					this._height = this._content.height;
					
					//this.drawRectBorder(this,this._width,this.height);
				}else if(this.autoFixed){
					this._content.width = this._width;
					this._content.height = this._height;
				}
			}else{
				this._url = null;
			}
		}
		
		public get url():string{
			return this._url;
		}
		/**
		 * 加载的图片地址，为null时清空已加载的图片 
		 * @param value:String 
		 * 
		 */
		public set url(value:string){
			if(this._url == value) return;
			this.content = null;
			
			this._url = value;
			
			if(this._url){
				var bmd:Texture = Image._contentMap.get(this.url);
				if(bmd){
					this.createBitmap(bmd);
				}else{
					RES.getResByUrl(this._url,this.loadActionComplete,this);
					this.showLoadingStyle(this._isShowLoading);
				}
			}else{
				this.showLoadingStyle(false);
				this._isCompleted = true;
			}
		}

		//
		private createBitmap(texture:Texture):void{
			var bitmap:Bitmap = <Bitmap> (this._content);
			if(bitmap)
				bitmap.texture = texture;
			else
				bitmap = new Bitmap(texture);

			this.content = bitmap;
		}

		/**
		 * 加载动作资源完成
		 * @param loadDataItem
		 *
		 */
		private loadActionComplete(data:any,url:string):void{
			if(data)
				Image._contentMap.put(url,data);

			if(url == this._url){
				this._isCompleted = true;
				this.createBitmap(data);

				if(this.loadComplete != null)
					this.loadComplete.apply(this._thisObj,[this]);
			}
		}

		/**
		 * 设置宽高
		 * @param width 宽
		 * @param height 高
		 */
		public setWH(width:number,height:number):void{
			if(this._width == width && this._height == height) return;

			this._width = width;

			if(this._content && this.autoFixed)
				this._content.width = width;

			this._height = height;

			if(this._content && this.autoFixed)
				this._content.height = height;

			//this.drawRectBorder(this,this._width,this.height);
			this.updateLayout();
		}
		
		public get height():number{
			return this._height;
		}
		/**
		 * 图片宽度，未设置时加载到图片后设为图片的宽度，若要显示加载样式应设置此属性，使加载样式居中 
		 * @param value:Number
		 * 
		 */		
		public set height(value:number){
			if(this._height == value) return;
			
			this._height = value;
			
			if(this._content && this.autoFixed)
				this._content.height = value;
			
			//this.drawRectBorder(this,this._width,this.height);
			this.updateLayout();
		}
		
		public get width():number{
			return this._width;
		}
		/**
		 * 图片高度，未设置时加载到图片后设为图片的高度，若要显示加载样式应设置此属性，使加载样式居中 
		 * @param value:Number
		 * 
		 */		
		public set width(value:number){
			if(this._width == value) return;
			
			this._width = value;
			
			if(this._content && this.autoFixed)
				this._content.width = value;
			
			//this.drawRectBorder(this,this._width,this.height);
			this.updateLayout();
		}
		/**
		 * 设置加载样式，若要显示不同于默认的加载样式 则调用此方法设置
		 * @param style:DisplayObject 样式将被设置为不响应鼠标事件
		 * 
		 */		
		public setLoadingStyle(style:DisplayObject):void{
			if(this._loadingStyle == style) return;
			
			this.showLoadingStyle(false);
			
			this._loadingStyle = style;
			
			this._loadingStyle.touchEnabled = false;
			if("touchChildren" in this._loadingStyle)
				this._loadingStyle.touchChildren = false;
			
			this.showLoadingStyle(this._isShowLoading);
		}
		
		//
		public destroy():void{
			if(this._isDestroy) return;

			this.loadComplete = null;
			this.loadProgress = null;
			this.loadError = null;

			super.destroy();
		}
		
		//
		/**
		 * 显示或隐藏加载样式 
		 * @param isShow:Boolean
		 * 
		 */		
		private showLoadingStyle(isShow:boolean):void{
			if(isShow){
				if(!this._loadingStyle){
					if(Image.defaultLoadingStyle){
						this._loadingStyle = new Image.defaultLoadingStyle();
						if("touchChildren" in this._loadingStyle)
							this._loadingStyle.touchChildren = false;
					}else{
						//无默认样式时，使用文本
						this._loadingStyle = new TextField();
						if(this._width > 0){
							this._loadingStyle.width = this._width;
							this._loadingStyle.height = this._height;
						}else{
							this._loadingStyle.width = 50;
							this._loadingStyle.height = 50;
						}
						this._loadingStyle.size = 20;
						this._loadingStyle.textAlign = HorizontalAlign.CENTER;
						this._loadingStyle.verticalAlign = VerticalAlign.MIDDLE;
						this._loadingStyle.text = "Loading..";
					}
					
					this._loadingStyle.touchEnabled = false;
				}
				
				if(this._loadingStyle){
					if(this._loadingStyle.parent != this)
						this.addChild(this._loadingStyle);
					
					if(this._loadingStyle instanceof MovieClip)
						this._loadingStyle.gotoAndPlay(2);
					
					this.updateLayout();
				}
			}else if(this._loadingStyle){
				if(this._loadingStyle.parent)
					this._loadingStyle.parent.removeChild(this._loadingStyle);
				if(this._loadingStyle instanceof MovieClip)
					this._loadingStyle.gotoAndStop(1);
			}
		}
		//
		/**
		 * 更新布局 
		 * 
		 */		
 		private updateLayout():void{
			if(this._loadingStyle && this._loadingStyle.parent){
				this._loadingStyle.x = (this._width - this._loadingStyle.width) / 2;
				this._loadingStyle.y = (this._height - this._loadingStyle.height) / 2;
			}
		}
		///**
		// * 绘制矩形
		// * @param target:* Shape或Sprite对象
		// * @param width:Number 绘制宽度
		// * @param height:Number 绘制高度
		// * @param color:uint=0x0 填充颜色
		// * @param alpha:Number=0 填充alpha
		// * @param drawBorder:Boolean=false 是否绘制边框
		// *
		// */
		//public drawRect(target:any,width:number,height:number,color:number=0x0,alpha:number=0,drawBorder:boolean=false):void{
		//	target.graphics.clear();
		//
		//	if(width == 0 || height == 0) return;
		//
		//	if(drawBorder) this.drawRectBorder(target,width,height,color,alpha);
		//
		//	target.graphics.beginFill(color,alpha);
		//	target.graphics.drawRect(0,0,width,height);
		//	target.graphics.endFill();
		//}
		////
		///**
		// * 绘制矩形边框
		// * @param target:* Shape或Sprite对象
		// * @param width:Number 绘制宽度
		// * @param height:Number 绘制高度
		// * @param color:uint=0x0 边框颜色
		// * @param alpha:Number 边框alpha
		// * @param thickness:Number 边框厚度
		// *
		// */
		//public drawRectBorder(target:any,width:number,height:number,color:number=0x0,alpha:number=0,thickness:number=0):void{
		//	if(width == 0 || height == 0) return;
        //
		//	target.graphics.clear();
		//	target.graphics.lineStyle(thickness,color,alpha);
		//	target.graphics.drawRect(0,0,width,height);
		//}
	}
}