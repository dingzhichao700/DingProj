
module egret {

	export class ActionMovieClipData{
		private static _instance:ActionMovieClipData = null;

		//图片打包前缀
		private static SHEET_PREFIX:string = "sheet_";

		//弧度对应方向表
		private static RADIANS_MAP:Array<number> = [
			-Math.PI,
			-Math.PI * 3 / 4,
			-Math.PI / 2,
			-Math.PI / 4,
			0,
			Math.PI / 4,
			Math.PI / 2,
			Math.PI * 3 / 4,
			Math.PI
		];
		private static DIRECTION_MAP:Array<number> = [
			ActionMovieClipDirectionType.LEFT,
			ActionMovieClipDirectionType.UP_LEFT,
			ActionMovieClipDirectionType.UP,
			ActionMovieClipDirectionType.UP_RIGHT,
			ActionMovieClipDirectionType.RIGHT,
			ActionMovieClipDirectionType.DOWN_RIGHT,
			ActionMovieClipDirectionType.DOWN,
			ActionMovieClipDirectionType.DOWN_LEFT,
			ActionMovieClipDirectionType.LEFT
		];
		
		//水平对称方向解析表
		private _dirMap:HashMap = null;
		//动作url对应vo表
		private _actionVoMap:HashMap = null;
		//动作数据json表
		private _actionDataMap:HashMap;
		//动作图片数据
		private _sheetMap:HashMap;
		//动作图片地址数据
		private _sheetUrlMap:HashMap;

		/**
		 * 构造函数
		 */
		public constructor(){
			this._dirMap = new HashMap();
			//左下与右下对称，依此类推
			this._dirMap.put(ActionMovieClipDirectionType.DOWN_LEFT,ActionMovieClipDirectionType.DOWN_RIGHT);
			this._dirMap.put(ActionMovieClipDirectionType.LEFT,ActionMovieClipDirectionType.RIGHT);
			this._dirMap.put(ActionMovieClipDirectionType.UP_LEFT,ActionMovieClipDirectionType.UP_RIGHT);
			//反之
			this._dirMap.put(ActionMovieClipDirectionType.DOWN_RIGHT,ActionMovieClipDirectionType.DOWN_LEFT);
			this._dirMap.put(ActionMovieClipDirectionType.RIGHT,ActionMovieClipDirectionType.LEFT);
			this._dirMap.put(ActionMovieClipDirectionType.UP_RIGHT,ActionMovieClipDirectionType.UP_LEFT);
			
			this._actionVoMap = new HashMap();
			this._actionDataMap = new egret.HashMap();
			this._sheetMap = new egret.HashMap();
			this._sheetUrlMap = new egret.HashMap();
		}
		//
		public static getInstance():ActionMovieClipData{
			return ActionMovieClipData._instance || (ActionMovieClipData._instance = new ActionMovieClipData());
		}
		//
		/**
		 * 获取图片对应影片数据 json 文件
		 * @param url
		 * @returns {string}
		 */
		public getJsonUrl(url:string):string{
			url = url.replace(ActionMovieClipData.SHEET_PREFIX, "");

			return url;
		}
		//
		/**
		 * 获取图片对应影片数据 json 文件，动作方向图片拆分
		 * @param url
		 * @returns {string}
		 */
		public getJsonUrl2(url:string):string{
			url = url.replace(ActionMovieClipData.SHEET_PREFIX, "");
			var array:Array<string> = url.split("_");
			array.pop();

			url = array.join("_") + ".json";

			return url;
		}
		//
		/**
		 * 根据影片配置地址获取图片配置地址
		 * @param url
		 * @returns {string}
		 */
		public getSheetUrl(url:string):string{
			var array:Array<string> = url.split("\/");
			var name:string = array[array.length - 1].split(".")[0];
			url = url.replace(name,ActionMovieClipData.SHEET_PREFIX + name);

			return url;
		}
		//
		/**
		 * 根据影片配置地址获取图片配置地址，动作方向图片拆分
		 * @param url
		 * @returns {string}
		 */
		public getSheetUrl2(url:string,direction:number):string{
			var array:Array<string> = url.split("\/");
			var name:string = array[array.length - 1].split(".")[0];
			url = url.replace(name,ActionMovieClipData.SHEET_PREFIX + name + "_" + direction);

			return url;
		}
		//
		/**
		 * 保存影片数据
		 * @param url:String 地址
		 * @param data 影片数据
		 *
		 */
		public setActionData(url:string,data:Object):void{
			if(this._actionDataMap.containsKey(url)){
				LogManager.error(this,"重复添加影片数据: url = " + url);
			}else{
				this._actionDataMap.put(url,data);
			}
		}
		//
		/**
		 * 获取影片数据
		 * @param url:String 地址
		 * @return
		 *
		 */
		public getActionData(url:string):Object{
			return this._actionDataMap.get(url);
		}
		//
		/**
		 * 保存动作图片纹理集
		 * @param url 图片地址
		 * @param sheet 图片集
		 */
		public setSheet(url:string,sheet:SpriteSheet):void{
			this._sheetMap.put(url,sheet);
			this._sheetUrlMap.put(sheet.hashCode,url);
		}
		//
		/**
		 * 获取动作图片
		 * @param url 图片地址
		 * @returns {any}
		 */
		public getSheet(url:string):SpriteSheet{
			return this._sheetMap.get(url);
		}
		//
		/**
		 * 获取动作图片地址
		 * @param sheet 动作图片
		 * @returns {any}
		 */
		public getUrlBySheet(sheet:SpriteSheet):string{
			return this._sheetUrlMap.get(sheet.hashCode);
		}
		//
		/**
		 * 保存影片数据 
		 * @param url:String 地址
		 * @param vo:ActionMovieClipVo 数据
		 * 
		 */		
		public setActionMoveClipVo(url:string,vo:ActionMovieClipVo):void{
			if(this._actionVoMap.containsKey(url)){
				LogManager.error(this,"重复添加ActionMovieClipVo数据: url = " + url);
			}else{
				this._actionVoMap.put(url,vo);
			}
		}
		//
		/**
		 * 获取影片数据 
		 * @param url:String 地址 
		 * @return 
		 * 
		 */		
		public getActionMovieClipVo(url:string):ActionMovieClipVo{
			return this._actionVoMap.get(url);
		}
		//
		/**
		 * 合成Vo，将不同类型的动作数据合成，对于相同 url 的影片数据，只需要加载一次，即可全局共用
		 * @param source:ActionMovieClipVo 原始vo，为空时返avo参数的值
		 * @param avo:ActionMovieClipVo 要合成到原始vo的新数据
		 * @return 
		 * 
		 */		
		public combinneActionMovieClipVo(source:ActionMovieClipVo,avo:ActionMovieClipVo):ActionMovieClipVo{
			if(!avo){
				LogManager.error(this,"合成到原始vo的新数据不能为空: avo = " + avo);
				return null;
			}
			
			if(!source){
				return avo;
			}else{
				for(var p in avo.baseMovieClipVos){
					if(avo.baseMovieClipVos[p])
						source.baseMovieClipVos[p] = avo.baseMovieClipVos[p];
				}
			}
			
			return source;
		}
		/**
		 * 获取影片数据第一个有效动作的类型和方向数据 
		 * @param vo:ActionMovieClipVo 影片数据
		 * @param actionType:int = -1 动作类型，-1时使用默认值:ActionMovieClipDirectionType.UP
		 * @return 没有时返回null，否则返回{actionType:value,direction:value}
		 * 
		 */		
		public getValidateActionData(vo:ActionMovieClipVo,actionType:number = -1):any{
			if(!vo) return null;
			
			var direction:number = ActionMovieClipDirectionType.UP;
			
			if(actionType == - 1)
				actionType = ActionType.PREPARE ;
			
			while(!ActionMovieClipData.getInstance().hasDirectionType(vo,actionType,direction)){
				direction ++;
				
				if(actionType >= ActionType.MAX && direction >= ActionMovieClipDirectionType.MAX){
					return null;
				}
				
				if(direction > ActionMovieClipDirectionType.MAX){
					direction = ActionMovieClipDirectionType.UP;
					
					actionType ++;
					if(actionType > ActionType.MAX){
						actionType = ActionType.PREPARE;
					}
				}
			}
			
			return {actionType:actionType,direction:direction};
		}
		//
		/**
		 * 获取影片Vo，指定方向没有数据时自动检测水平对称方向是否有数据 
		 * @param actionMovieClipVo:ActionMovieClipVo 动作Vo
		 * @param actionType:int 动作类型
		 * @param direction:int 动作方向
		 * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据则返回对称方向的数据
		 * @return 
		 * 
		 */		
		public getBaseMovieClipVo(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,checked:boolean = true):BaseMovieClipVo{
			if(actionMovieClipVo)
			var actionVos:Array<any> = actionMovieClipVo.baseMovieClipVos[actionType];
			if(actionVos){
				var vo:BaseMovieClipVo = actionVos[direction];
				
				if(!vo && checked){
					//检测水平对称方向是否有数据
					var index:number = this.getReverseDir(direction);
					vo = actionVos[index];
				}
			}
			
			return vo;
		}
		//
		/**
		 * 获取影片Vo，指定方向没有数据时自动检测水平对称方向是否有数据 
		 * @param actionMovieClipVo:ActionMovieClipVo 动作Vo
		 * @param actionType:int 动作类型
		 * @param direction:int 动作方向
		 * @return 
		 * 
		 */		
		public getBaseMovieClipVo2(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number = 0):BaseMovieClipVo{
			var actionVos:Array<any> = actionMovieClipVo.baseMovieClipVos[actionType];
			if(actionVos){
				var vo:BaseMovieClipVo = actionVos[direction];
				
				if(!vo){
					//检测水平对称方向是否有数据
					var index:number = this.getReverseDir(direction);
					vo = actionVos[index];
				}
			}
			
			return vo;
		}
		//
		public hasActionType(actionMovieClipVo:ActionMovieClipVo,actionType:number = 0):boolean{
			var actionVos:Array<any> = actionMovieClipVo.baseMovieClipVos[actionType];
			
			return actionVos != null;
		}
		//
		/**
		 * 影片是否存在动作类型和方向数据  
		 * @param actionType:int 动作类型
		 * @param direction:int 动作方向
		 * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据仍然返回 true
		 * @return 
		 */
		public hasDirectionType(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,checked:boolean = true):boolean{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction,checked);
			
			return vo != null;
		}
		//
		/**
		 * 影片是否存在动作类型和方向数据和图片
		 * @param actionType:int 动作类型
		 * @param direction:int 动作方向
		 * @return
		 */
		public hasDirectionTypeTexture(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number):boolean{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction,true);

			return vo && vo.hasFrameTexture;
		}
		//
		public setFrameRate(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,frameRate:number = 0):void{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction);
			
			if(vo){
				vo.frameRate = Math.max(1,frameRate);
			}else{
				LogManager.error(this,"setFrameRate()没有播放数据:actionType = " + actionType + ",direction = " + direction);
			}
		}
		//
		public setShadow(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,width:number,height:number = 0):void{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction);
			
			if(vo){
				vo.shadowWidth = width;
				vo.shadowHeight = height;
			}else{
				LogManager.error(this,"setShadow()没有播放数据:actionType = " + actionType + ",direction = " + direction);
			}
		}
		//
		public setCenterPoint(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,x:number,y:number = 0):void{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction);
			
			if(vo){
				vo.centerPoint.x = x;
				vo.centerPoint.y = y;
			}else{
				LogManager.error(this,"setCenterPoint()没有播放数据:actionType = " + actionType + ",direction = " + direction);
			}
		}
		//
		public setOriginalPoint(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,offsetX:number,offsetY:number = 0):void{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction);
			
			if(vo){
				var length:number = vo.dataItems.length;
				for(var i:number = 0;i < length;i++){
					var item:BaseMovieClipDataItem = vo.dataItems[i];
					item.x += offsetX;
					item.y += offsetY;
				}
			}else{
				LogManager.error(this,"setCenterPoint()没有播放数据:actionType = " + actionType + ",direction = " + direction);
			}
		}
		//
		public setTopLineY(actionMovieClipVo:ActionMovieClipVo,actionType:number,direction:number,y:number = 0):void{
			var vo:BaseMovieClipVo = this.getBaseMovieClipVo(actionMovieClipVo,actionType,direction);
			
			if(vo){
				vo.topLineY = y;
			}else{
				LogManager.error(this,"setTopLineY()没有播放数据:actionType = " + actionType + ",direction = " + direction);
			}
		}
		//
		/**
		 * 计算方向数据 
		 * @param ox:Number 当前x坐标
		 * @param oy:Number 当前y坐标
		 * @param x:Number 目标x坐标
		 * @param y:Number 目标y坐标
		 * @return 
		 * 
		 */		
		public calculateDirection(ox:number,oy:number,x:number,y:number,isTwo:boolean = false):number{
			var dx:number = x - ox;
			var dy:number = y - oy;
			
			var value:number = Math.atan2(dy,dx);
			var next:number = 0;
			
			var pv:number = 0;
			var nv:number = 0;
			
			var length:number = ActionMovieClipData.RADIANS_MAP.length;
			
			for(var i:number = 0; i < length; i++){
				if(value >= ActionMovieClipData.RADIANS_MAP[i]){
					next = i + 1;
					if(isTwo)
						next = i + 4;
					
					//最多循环到第8个，不可能循环到第9个
					if(value <= ActionMovieClipData.RADIANS_MAP[next]){
						
						//计算离上一值和下一个值的距离
						pv = value - ActionMovieClipData.RADIANS_MAP[i];
						nv = ActionMovieClipData.RADIANS_MAP[next] - value;
						
						if(pv <= nv)
							return ActionMovieClipData.DIRECTION_MAP[i];
						else
							return ActionMovieClipData.DIRECTION_MAP[next];
					}
					
					if(isTwo)
						i += 3;
				}
			}
			
			LogManager.error(this,"找不到方向数据");
			
			return ActionMovieClipDirectionType.UP;
		}
		//
		/**
		 * 获取水平对称方向 
		 * @param direction:int 
		 * @return 
		 * @see ActionMovieClipDirectionType
		 */		
		public getReverseDir(direction:number):number{
			return this._dirMap.get(direction);
		}
	}
}