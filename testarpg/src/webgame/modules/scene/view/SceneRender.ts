
module egret {

	export class SceneRender extends Window implements ISceneLayer{
		//渲染区域和视口的水平偏移量和垂直偏移量
		private RENDER_OFFSET_WIDTH:number = 100;
		private RENDER_OFFSET_HEIGHT:number = 100;
		//生物层排序时间间隔
		private DELAY_SORT:number = 8;
		
		//路径类型，用于观察测试
		private PATH_TYPES:Array<any> = [{label:"不可通过",data:{type:PathType.OBSTACLE,color:0xff0000}},{label:"可行走",data:{type:PathType.WALKABLE,color:0x0}},{label:"透明",data:{type:PathType.TRANSPARENT,color:0xff}}
		];
		
		//视口宽高
		public _viewWidth:number = 600;
		public _viewHeight:number = 400;
		
		//等角地图
		public _isoMap:IsoMap = null;
		//碎片地图
		public _pieceMap:PieceMap2 = null;
		
		//场景元素数据id对应的元素表
		public _elementsIdMap:HashMap = null;
		//场景元素数据，标记是否已渲染此元素
		public _elementsMap:HashMap = null;
		//生物层元素表
		public _biologyMap:Array<any> = null;
		//生物层元素表索引，用于缓存机制
		public _biologyIndex:number = 0;
		//是否已清除地图
		public _isClear:boolean = false;
		//主角
		public _role:ElementPlayer = null;
		//主角在场景上的偏移量，超过时地图移动
		public _roleOffsetX:number = 0;
		public _roleOffsetY:number = 0;
		//场景编辑数据
		public _sceneEditLo:SceneEditLo = null;
		//排序字段
		private _sortFields:Array<any> = null;
		//排序表，用于优化排序场景元素
		private _indexMap:HashMap = null;
		private _sortId:number;
		/**
		 * 构造函数
		 */
		public constructor(){
			super(ApplicationLayerType.BOTTOM);

			this._elementsIdMap = new HashMap();
			this._elementsMap = new HashMap();
			this._indexMap = new HashMap();
			this._biologyMap = [];
			this._sortFields = ["depth","id"];
		}
		//
		/**
		 * 等角地图，用于地图相关操作，如移动等 
		 * @return 
		 * 
		 */
		public get isoMap():IsoMap{
			return this._isoMap;
		}
		//
		/**
		 * 获取生物层所有元素
		 * @returns {Array<any>}
		 */
		public getBiologyMap():Array<any>{
			return this._biologyMap;
		}
		
		/**
		 * 初始化数据 
		 * @param data:SceneEditLo 地图编辑数据
		 * 
		 */		
		public initData(data:SceneEditLo):void{
			this._sceneEditLo = data;
			
			this.clearScene();
			
			this.setRoleViewProperties();
			
			this._isoMap.setProperties(data.width,data.height,data.gridSize,this._viewWidth,this._viewHeight);
			this._isoMap.setMapNodes(data.nodeTypes);
//			this._isoMap.setMapNodes2(data.width,data.height,PathType.WALKABLE);

			this._pieceMap.initData(data);
			
			this._isClear = false;
		}
		//
		/**
		 * 设置主角场景元素，应在初始化数据后设置 
		 * @param role:ElementPlayer 主角场景元素
		 * 
		 */		
		public setRole(role:ElementPlayer):void{
			this._role = role;

			this._role.addEventListener(SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED,this.sceneElementPathChanged,this);
		}
		//
		/**
		 * 坐标是否在渲染区域中 
		 * @param x:int x坐标
		 * @param y:int y坐标
		 * @return 
		 * 
		 */		
		public isInRenderRect(x:number,y:number = 0):boolean{
			var rect:Rectangle = this._isoMap.renderRect;
			
			return rect.contains(x,y);
		}
		//
		/**
		 * 添加场景元素 
		 * @param target:DisplayObject 场景元素
		 * @param layerType:int 层级 SceneLayerType  @see SceneLayerType
		 * @param x:Number = int.MAX_VALUE x坐标，不为 int.MAX_VALUE 时设置
		 * @param y:Number = int.MAX_VALUE y坐标，不为 int.MAX_VALUE 时设置
		 * @return 
		 * 
		 */		
		public addElement(target:DisplayObject,layerType:number,x:number = NaN,y:number = NaN):DisplayObject{
			if(this._elementsMap.containsKey(target.hashCode)) return null;
			
			this._isoMap.show(target,layerType,x,y);
			
			var id:string = null;
			
			if(target instanceof SceneElement){
				id = (<SceneElement><any> target).id;

				if(target instanceof SceneElementMover){
					var mover:SceneElementMover = <SceneElementMover> target;
					mover.setMapData(this._isoMap);
					//mover.speed = this.getElementSpeed();
					if(!isNaN(x) && !isNaN(y))
					mover.setXY(x,y);
				}
				(<SceneElement><any> target).addToScene();
			}else{
				id = target.name;
			}
			
			if(id == null){
                throw new Error("场景元素 id 不能为空");
			}
			
			this._elementsMap.put(target.hashCode,true);
			this._elementsIdMap.put(id,target);
			
			if(layerType == SceneLayerType.BIOLOGY){
				this._biologyMap[this._biologyIndex] = target;
				this._biologyIndex ++;
				this._indexMap.put(target.hashCode,target.parent.getChildIndex(target));
				
				//不要每次显示鼠标点影片都排序，性能优化，新加元素不排序
//				if(target != _mousePoint)
//					sortBiology(true);
			}
			
			return target;
		}
		//
		/**
		 * 获取场景元素速度 
		 * @return 
		 * 
		 */		
		public getElementSpeed():number{
			LogManager.error(this,"子类应重写此方法");
			
			return 0;
		}
		//
		/**
		 * 移除场景元素 
		 * @param target:DisplayObject 场景元素 
		 * @param isRecover:Boolean = true 是否自动回收，特殊元素不回收，直接移除，如鼠标点击影片
		 * @return 
		 * 
		 */		
		public removeElement(target:DisplayObject,isRecover:boolean = true):DisplayObject{
			if(!target) return target;

			var onStage:boolean = target.stage != null;
			
			this._isoMap.hide(target);
			
			var id:string = null;
			
			if(target instanceof SceneElement){
				id = (<SceneElement><any> target).id;
				(<SceneElement><any> target).removeFromScene();
			}else{
				id = target.name;
			}
			
			this._elementsMap.remove(target.hashCode);
			this._elementsIdMap.remove(id);
			this.removeBiology(target);
			
			if(isRecover && onStage && target instanceof SceneElement)
				this.recoverElement(<SceneElement><any> target);
			
			return target;
		}
		//
		/**
		 * 从数组中移除生物层元素 
		 * @param target
		 * 
		 */		
		private removeBiology(target:DisplayObject):void{
			if(!target) return;
			
			var length:number = this._biologyIndex;
			var index:number = 0;
			
			for(var i:number = 0; i < length; i++){
				if(target == this._biologyMap[i]){
					index = length -1;
					
					//缓存机制，将最后一个与当前项目交换
					if(i < index){
						this._biologyMap[i] = this._biologyMap[index];
					}
					this._biologyMap[index] = null;
					this._biologyIndex --;
					
					break;
				}
			}
			
			if(this._biologyIndex < 0){
				throw new Error("removeBiology");
			}
			
			this._indexMap.remove(target.hashCode);
		}
		//
		/**
		 * 回收场景元素 
		 * @param element:SceneElement 场景元素
		 * 
		 */		
		public recoverElement(element:SceneElement):void{
			//子类重写
		}
		//
		/**
		 * 根据id移除场景元素  
		 * @param id:String 场景元素id
		 * @return 
		 * 
		 */		
		public removeElementById(id:string):DisplayObject{
			var target:DisplayObject = this._elementsIdMap.remove(id);
			this._elementsMap.remove(target.hashCode);
			this.removeBiology(target);
			
			if(!target) return null;
			
			return this.removeElement(target);
		}
		//
		/**
		 * 获取当前显示的场景元素 
		 * @param id:String 场景元素id 
		 * @return 
		 * 
		 */		
		public getElement(id:string):SceneElement{
			return this._elementsIdMap.get(id);
		}
		//
		/**
		 * 根据数据项目渲染场景元素 
		 * @param item:SceneElementDataItem 场景元素数据项目
		 * 
		 */		
		public renderElement(item:SceneElementDataItem):void{
			
		}
		//
		/**
		 * 静态场景元素渲染 
		 * @param rect:Rectangle 渲染区域
		 * 
		 */		
		public renderFixedElements(rect:Rectangle):void{
			//子类重写
		}
		//
		/**
		 * 渲染动态场景元素 
		 * @param rect:Rectangle 渲染区域
		 */		
		public renderDynamicElements(rect:Rectangle):void{
			
		}
		//
		/**
		 * 静态(坐标不变)场景元素数据表
		 * @return 
		 * 
		 */		
		public getFixedElementMap():HashMap{
			//子类重写
			return null;
		}
		//
		/**
		 * 渲染场景元素 
		 * @param type:int 场景类型 SceneElementType
		 * @param id:String vo或lo中的id
		 * @param x:Number = NaN x坐标，不为NaN时设置
		 * @param y:Number = NaN y坐标，不为NaN时设置
		 * @param lo:SceneElementLo = null 场景元素 lo
		 * @param vo:SceneElementVo = null 场景元素 vo
		 * @return 
		 * 
		 */		
		public renderElementInternal(type:number,data:SceneElementDataItem,layerType:number):SceneElement{
			//子类重写
			return null;
		}
		//
		/**
		 * 清空场景  
		 * 
		 */		
		public clearScene():void{
			this._isClear = true;
			
			this._pieceMap.clearMap();
			
			var values:Array<any> = this._elementsIdMap.values();
			var length:number = values.length;
			for(var i:number = 0;i < length;i++){
				var target:DisplayObject = values[i];
				this.removeElement(target);
			}
		}
		//
		public initWindow():void{
			super.initWindow();
			
			this._pieceMap = new PieceMap2();
			this._pieceMap.rootPath = dataManager().pathData.getResourceUrl(PathData.PATH_MAP);
			//this._pieceMap.version = "?version=" + WebData.getInstance().configLo.version;
			
			this._isoMap = new IsoMap(0,0,0,0,0,this.RENDER_OFFSET_WIDTH,this.RENDER_OFFSET_HEIGHT);
			this._isoMap.pathPolicy = PathPolicyType.ALL;
			//this._isoMap.showMapTile(true);
			this._isoMap.showPath(false);
//									_isoMap.showRenderRect(true);
//									_isoMap.showViewport(true);
			//禁用交互绘制提高性能
			this._isoMap.isDrawInteractive = false;
			this.addChild(this._isoMap);
			
			var length:number = this.PATH_TYPES.length;
			for(var i:number = 0;i < length;i++){
				var object:any = this.PATH_TYPES[i];
				this._isoMap.setTileTypeColor(object.data.type,object.data.color);
			}
			
			this._isoMap.pathTypes = [PathType.WALKABLE,PathType.TRANSPARENT];
			this._isoMap.speed = 6;
			
			//层级配置及组装
			this._isoMap.layerConfigs = SceneLayerType.LAYER_MOUSE_CONFIGS;
			this._isoMap.show(this._pieceMap,SceneLayerType.NEARBY_VIEW);
			this._isoMap.show(this._isoMap.mapTileContainer,SceneLayerType.NEARBY_VIEW);
			
			this.recall();
		}
		//
		public addEvents():void{
			super.addEvents();
			
			//this._isoMap.addEventListener(IsoMapEvent.ISO_MAP_RENDER_CHANGED,this.renderChangedHandler,this);
			this._isoMap.setRenderChangeHandler(this.renderChangedHandler,this);
			this._isoMap.addEventListener(IsoMapEvent.ISO_MAP_PROPERTY_CHANGED,this.mapChanged,this);
			ApplicationManager.getInstance().stage.addEventListener(Event.RESIZE,this.stageResize,this);

			if(!EnterFrameManager.getInstance().hasExecute(this._sortId))
				this._sortId = EnterFrameManager.getInstance().addExecute(this.sortBiology,this,this.DELAY_SORT);
		}
		//
		public remove():void{
			super.remove();
			
			//this._isoMap.removeEventListener(IsoMapEvent.ISO_MAP_RENDER_CHANGED,this.renderChangedHandler,this);
			this._isoMap.setRenderChangeHandler(null);
			if(this._role)
				this._role.removeEventListener(SceneElementEvent.SCENE_ELEMENT_PATH_CHANGED,this.sceneElementPathChanged,this);
			ApplicationManager.getInstance().stage.removeEventListener(Event.RESIZE,this.stageResize,this);
			
			EnterFrameManager.getInstance().removeExecute(this._sortId);
			
			this.clearScene();
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			this.clearScene();
			
			this._isoMap.destroy();
			this._pieceMap.destroy();

			super.destroy();
		}
		//
		/**
		 * 地图数据改变 
		 * @param e
		 * 
		 */		
		private mapChanged(e:IsoMapEvent):void{
			var length:number = this._biologyMap.length;
			for(var i:number = 0;i < length;i++){
				var target:any = this._biologyMap[i];
				if(target instanceof SceneElementMover){
					(<SceneElementMover><any> target).setMapData(this._isoMap);
				}
			}
		}
		//
		/**
		 * 渲染区域更新事件 
		 * @param e
		 * 
		 */		
		public renderChangedHandler(isoMap:IsoMapDriver):void{
			//已清除地图时不进行渲染
			if(this._isClear) return;
			
			this.updateRenderRect();
		}
		//
		/**
		 * 主角线路改变 
		 * @param event
		 * 
		 */		
		public sceneElementPathChanged(event:Event):void{
			if(this._role){
				this._isoMap.pathNodes = this._role.pathNodes.concat();
				this._isoMap.drawCurrentPath();
			}
		}
		//
		/**
		 * 渲染区域更新  
		 * 
		 */		
		public updateRenderRect():void{
			var rect:Rectangle = this._isoMap.renderRect;
			this._pieceMap.renderMap(this._isoMap.viewRect,rect);
			
			this.renderFixedElements(rect);
			this.renderDynamicElements(rect);
		}
		//
		/**
		 * 生物层元素排序 
		 * @param isForcible:Boolean = false 是否忽略时间间隔强制排序
		 * 
		 */		
		public sortBiology(isForcible:boolean = false):void{
			if(this._biologyIndex > 1)
			this._biologyMap.sort(this.sortElement);
			
			var container:DisplayObjectContainer = this._isoMap.getLayerContainer(SceneLayerType.BIOLOGY);
			
			var length:number = this._biologyIndex;
			var se:SceneElement = null;
			
			for(var i:number = 0; i < length; i++){
				se = this._biologyMap[i];
				
				if(se && this._indexMap.get(se.hashCode) != i){
					this._indexMap.put(se.hashCode,i);
					container.setChildIndex(se,i);
				}
			}
		}
		//
		/**
		 * 深度排序
		 * @param a
		 * @param b
		 * @returns {number}
		 */
		private sortElement(a:SceneElement,b:SceneElement):number{
			if(!a || !b) return 0;
			var ad:number = a.getDepth();
			var bd:number = b.getDepth();

			if(ad > bd){
				return 1;
			}else if(ad < bd){
				return -1;
			}else{
				return 0;
			}
		}
		//
		/**
		 * 舞台尺寸改变  
		 * @param e
		 * 
		 */		
		public stageResize(e:Event = null):void{
			this.setRoleViewProperties();
			
			if(this._sceneEditLo){
				if(this._role)
					this._isoMap.setCurrentMapXY(this._role.x,this._role.y);
				this._isoMap.setProperties(this._sceneEditLo.width,this._sceneEditLo.height,this._sceneEditLo.gridSize,this._viewWidth,this._viewHeight);
			}
		}
		//
		/**
		 * 更新视口数据 
		 * 
		 */		
		public setRoleViewProperties():void{
			this._viewWidth = ApplicationManager.getInstance().stage.stageWidth;
			this._viewHeight = ApplicationManager.getInstance().stage.stageHeight;
			
			this._roleOffsetX = this._viewWidth / 2;
			this._roleOffsetY = this._viewHeight / 2;
		}
	}
}