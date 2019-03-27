
module egret {

	export class TooltipManager{
		//数据表
		private static _hashMap:HashMap = new HashMap();
		//已显示的数据表
		private static _showHashMap:HashMap = new HashMap();
		//实现ITooltip时由tooltip属性返回的数据表
		private static _innerHashMap:HashMap = new HashMap();
		//单例的文本
		private static _textField:TextField = null;
		//单例的容器
		private static _container:CoreSprite = null;
		//舞台
		private static _stage:Stage = null;
		//样式
		private static _style:DisplayObject = null;
		//显示 tooltip 的容器
		private static _tipContainer:DisplayObjectContainer = null; 
		
		//提示内容和边框的水平距离
		private static _gapX:number=5;
		//提示内容和边框的垂直距离
		private static _gapY:number=5;
		//提示容器和鼠标的水平和垂直距离
		private static _offsetX:number=15;
		private static _offsetY:number=15;
		//
		public constructor(){
			
		}
		//
		/**
		 * 初始化 
		 * @param stage:Stage 舞台
		 * @param container:DisplayObjectContainer = null 容器，无效时使用 stage
		 * @param gapX:int = 5 提示内容和提示容器边框的水平距离
		 * @param gapY:int = 5 提示内容和提示容器边框的垂直距离
		 * @param offsetX:int = 15 提示容器和鼠标的水平距离
		 * @param offsetY:int = 15 提示容器和鼠标的垂直距离
		 * 
		 */		
		public static init(stage:Stage,container:DisplayObjectContainer = null,gapX:number = 5,gapY:number = 5,offsetX:number = 15,offsetY:number = 15):void{
			if(!stage){
				LogManager.error(TooltipManager,"舞台不能为空:stage = " + stage);
				return;
			}
			
			TooltipManager._stage = stage;
			TooltipManager._tipContainer = container ? container : TooltipManager._stage;
			TooltipManager._gapX = gapX;
			TooltipManager._gapY = gapY;
			TooltipManager._offsetX = offsetX;
			TooltipManager._offsetY = offsetY;
			
			TooltipManager._stage.addEventListener(TouchEvent.TOUCH_BEGIN,TooltipManager.stageMouseDown,TooltipManager);
		}
		/**
		 * 鼠标按下 
		 * @param event
		 * 
		 */		
		public static stageMouseDown(event:TouchEvent):void{
			var array:Array<any> = TooltipManager._showHashMap.keys();
			var length:number = array.length;
			for(var i:number = 0;i < length;i++){
				var v:any = array[i];
				TooltipManager.hideTooltip(v);
			}
		}
		//
		/**
		 * 设置工具提示 
		 * @param target:InteractiveObject 显示交互对象
		 * @param tooltip:* 提示数据，字符串(支持html文本)或显示对象，为null时移除工具提示
		 * @see ITooltip
		 * @see CoreSprite.tooltip
		 */		
		public static setTooltip(target:DisplayObject,tooltip:any):void{
			if(!TooltipManager._stage){
				LogManager.error(TooltipManager,"未初始化数据，请调用init()方法初始化数据");
				return;
			}
			if(!target){
				LogManager.error(TooltipManager,"target不能为空: target = " + target);
				return;
			}
			if(!tooltip){
				TooltipManager.removeTooltip(target);
				return;
			}
			if(!(typeof(tooltip) == "string") && !(tooltip instanceof DisplayObject)){
				LogManager.error(TooltipManager,"无效的tooltip对象:tooltip = " + tooltip);
				return;
			}
			if(TooltipManager._hashMap.containsKey(target)){
				TooltipManager.removeTooltip(target);
			}
			
			TooltipManager._hashMap.put(target,tooltip);
			target.addEventListener(TouchEvent.TOUCH_OVER,TooltipManager.targetMouseOver,TooltipManager);
		}
		//
		/**
		 * 移除工具提示 
		 * @param target:InteractiveObject 显示交互对象
		 * 
		 */		
		public static removeTooltip(target:DisplayObject):void{
			if(!target){
				LogManager.error(TooltipManager,"target不能为空: target = " + target);
				return;
			}
			
			TooltipManager._innerHashMap.remove(target);
			var tooltip:any = TooltipManager._hashMap.remove(target);
			TooltipManager.hideTooltip(tooltip);
			
			target.removeEventListener(TouchEvent.TOUCH_OVER,TooltipManager.targetMouseOver,TooltipManager);
		}
		//
		/**
		 * 显示工具提示，用于快速临时性显示的工具提示，不基于显示交互对象即可显示某一个工具提示 
		 * @param tooltip:* 提示数据，字符串或显示对象，不能为null
		 * @param x:int = 0  显示的x坐标
		 * @param y:int = 0 显示的y坐标
		 * @see hideTooltip()
		 * 
		 */		
		public static showTooltip(tooltip:any,x:number = 0,y:number = 0):void{
			var content:DisplayObject = null;
			var container:CoreSprite = null;
			var textField:TextField = null;
			
			if(TooltipManager._showHashMap.containsKey(tooltip))
				TooltipManager.hideTooltip(tooltip);
			
			if(typeof(tooltip) == "string"){
				textField = TooltipManager._textField;
				if(!textField || (textField && textField.stage)){
					textField = new TextField();
					textField.multiline = true;
					textField.size = 16;

					//保存单例文本对象
					if(!TooltipManager._textField)
						TooltipManager._textField = textField;
				}
				if(textField.text != tooltip)
					textField.text = tooltip;
				
				content = textField;
			}else if(tooltip instanceof DisplayObject){
				content = tooltip;
			}else{
				LogManager.error(TooltipManager,"无效的tooltip对象:tooltip = " + tooltip);
				return;
			}
			
			if(typeof(tooltip) == "string"){
				container = TooltipManager._container;
				if(!container || (container && container.stage)){
					container = new CoreSprite();
					container.touchChildren = false;
					container.touchEnabled = false;
					
					//if(TooltipManager._style)
					//	container.setStyle(TooltipManager._style,false,false);
					
					//保存单例容器
					if(!TooltipManager._container)
						TooltipManager._container = container;
				}
				
				if(content.parent != container){
					container.addChild(content);
				}
				
				content.x = TooltipManager._gapX;
				content.y = TooltipManager._gapY;
				
				container.width = Math.floor(content.width + TooltipManager._gapX * 2);
				container.height = Math.floor(content.height + TooltipManager._gapY * 2);
				
				if(!TooltipManager._style){
					TooltipManager.drawRect(container,container.width,container.height,0x0,0.6,false);
					TooltipManager.drawRectBorder(container,container.width - 1,container.height - 1,0x333333,1);
				}else{
					container.graphics.clear();
				}
				
				content = container;
			}
			
			TooltipManager._showHashMap.put(tooltip,content);
			
			if(content.parent != TooltipManager._tipContainer)
				TooltipManager._tipContainer.addChild(content);
			TooltipManager.updatePosition(content,x,y);
		}
		//
		/**
		 * 移除快速工具提示 
		 * @param tooltip:* 提示数据，字符串或显示对象
		 * @see showTooltip()
		 * 
		 */		
		public static hideTooltip(tooltip:any):void{
			var content:any = TooltipManager._showHashMap.remove(tooltip);
			if(content){
				DisplayObjectUtil.remove(content);
                //因hasOwnProperty()只能用于动态属性，替换
				if(typeof(tooltip) == "string" && content != TooltipManager._container && "destroy" in content)
					content.destroy();
			}
		}
		//
		/**
		 * 获取显示对象实际显示的工具提示对象 
		 * @param target:InteractiveObject 显示对象
		 * @return 提示数据，字符串(支持html文本)或显示对象
		 * 
		 */		
		public static getTooltip(target:DisplayObject):any{
			var tooltip:any = TooltipManager._hashMap.get(target);
			//若实现ITooltip接口，tooltip属性为自身实例时使用tooltip属性返回的结果，用于鼠标经过时动态生成tooltip
			if(target == tooltip){
                    //因hasOwnProperty()只能用于动态属性，替换
				if("tooltip" in target)
					tooltip = target["tooltip"];
			}
			if(tooltip && !TooltipManager._innerHashMap.containsKey(tooltip)){
				//内部动态tooltip表
				TooltipManager._innerHashMap.put(target,tooltip);
			}
			
			return tooltip;
		}
		//
		/**
		 * 获取显示对象当前正在显示的工具提示对象  
		 * @param target:InteractiveObject 显示对象
		 * @return 提示数据，字符串(支持html文本)或显示对象 
		 * 
		 */		
		public static getCurrentTooltip(target:DisplayObject):any{
			return TooltipManager._innerHashMap.get(target);
		}
		//
		/**
		 * 设置工具提示背景样式 
		 * @param style:DisplayObject:DisplayObject
		 * @see CoreComponent.setStyle()
		 * 
		 */		
		public static setStyle(style:DisplayObject):void{
			if(!style){
				LogManager.error(TooltipManager,"style不能为空: style = " + style);
				return;
			}
			
			TooltipManager._style = style;
			
			for(var i in TooltipManager._showHashMap){
				var container:CoreSprite = TooltipManager._showHashMap[i];
				//container.setStyle(TooltipManager._style,false,false);
			}
		}
		//
		/**
		 * 鼠标经过 
		 * @param e
		 * 
		 */		
		private static targetMouseOver(e:TouchEvent):void{
			if(e.touchDown) return;
			//阻断冒泡，多个显示对象相互包含时只显示最上面的显示对象tooltip
			e.stopPropagation();
			
			var target:DisplayObject = <DisplayObject><any> (e.currentTarget);
			
			var tooltip:any = TooltipManager.getTooltip(target);
			if(tooltip){
				TooltipManager.showTooltip(tooltip,TooltipManager._stage.anchorX + TooltipManager._offsetX,TooltipManager._stage.anchorY + TooltipManager._offsetY);
				
				target.addEventListener(TouchEvent.TOUCH_MOVE,TooltipManager.targetMouseMove,TooltipManager);
				target.addEventListener(TouchEvent.TOUCH_OUT,TooltipManager.targetMouseOut,TooltipManager);
				target.addEventListener(Event.REMOVED_FROM_STAGE,TooltipManager.targetRemoveFromeStage,TooltipManager);
			}
		}
		//
		/**
		 * 鼠标移出 
		 * @param e
		 * 
		 */		
		private static targetMouseOut(e:TouchEvent):void{
			TooltipManager.targetRemoveFromeStage(e);
		}
		//
		/**
		 * 从显示列表移除时 
		 * @param e
		 * 
		 */		
		private static targetRemoveFromeStage(e:Event):void{
			var target:DisplayObject = <DisplayObject><any> (e.currentTarget);
			if(target){
				target.removeEventListener(TouchEvent.TOUCH_MOVE,TooltipManager.targetMouseMove,TooltipManager);
				target.removeEventListener(TouchEvent.TOUCH_OUT,TooltipManager.targetMouseOut,TooltipManager);
				target.removeEventListener(Event.REMOVED_FROM_STAGE,TooltipManager.targetRemoveFromeStage,TooltipManager);
				
				var tooltip:any = TooltipManager._hashMap.get(target);
				if(target == tooltip){
                        //因hasOwnProperty()只能用于动态属性，替换
					if("tooltip" in target)
						tooltip = TooltipManager._innerHashMap.remove(target);
				}
				TooltipManager.hideTooltip(tooltip);
			}
		}
		//
		/**
		 * 鼠标移动时 
		 * @param e
		 * 
		 */		
		private static targetMouseMove(e:TouchEvent):void{
			var target:DisplayObject = <DisplayObject><any> (e.currentTarget);
			
			var tooltip:any = TooltipManager._hashMap.get(target);
			if(target == tooltip)
				tooltip = TooltipManager._innerHashMap.get(target);
			if(tooltip)
				var container:DisplayObjectContainer = TooltipManager._showHashMap.get(tooltip);
			if(container)
				TooltipManager.updatePosition(container,TooltipManager._stage.anchorX + TooltipManager._offsetX,TooltipManager._stage.anchorY + TooltipManager._offsetY);
			
			//e.updateAfterEvent();
		}
		//
		/**
		 * 更新位置 
		 * @param container:DisplayObject tooltip容器
		 * @param x:int x坐标
		 * @param y:int y坐标
		 * 
		 */		
		private static updatePosition(container:DisplayObject,x:number,y:number = 0):void{
			//超出舞台时，调换为对称位置
			if(container.width + x > TooltipManager._stage.stageWidth)
				x -= TooltipManager._offsetX * 2 + container.width;
			if(container.height + y > TooltipManager._stage.stageHeight)
				y -= TooltipManager._offsetY * 2 + container.height;
			
			x = Math.max(x,0);
			y = Math.max(y,0);
			
			container.x = x;
			container.y = y;
		}
		/**
		 * 绘制矩形 
		 * @param target:* Shape或Sprite对象
		 * @param width:Number 绘制宽度
		 * @param height:Number 绘制高度
		 * @param color:uint=0x0 填充颜色
		 * @param alpha:Number=0 填充alpha
		 * @param drawBorder:Boolean=false 是否绘制边框
		 * 
		 */		
		public static drawRect(target:any,width:number,height:number,color:number=0x0,alpha:number=0,drawBorder:boolean=false):void{
			target.graphics.clear();
			
			if(width == 0 || height == 0) return;
			
			if(drawBorder) TooltipManager.drawRectBorder(target,width,height,color,alpha);
			
			target.graphics.beginFill(color,alpha);
			target.graphics.drawRect(0,0,width,height);
			target.graphics.endFill();
		}
		//
		/**
		 * 绘制矩形边框 
		 * @param target:* Shape或Sprite对象
		 * @param width:Number 绘制宽度
		 * @param height:Number 绘制高度
		 * @param color:uint=0x0 边框颜色
		 * @param alpha:Number 边框alpha
		 * @param thickness:Number 边框厚度
		 * 
		 */		
		public static drawRectBorder(target:any,width:number,height:number,color:number=0x0,alpha:number=0,thickness:number=0):void{
			if(width == 0 || height == 0) return;
			
			target.graphics.lineStyle(thickness,color,alpha);
			target.graphics.drawRect(0,0,width,height);
		}
	}
}