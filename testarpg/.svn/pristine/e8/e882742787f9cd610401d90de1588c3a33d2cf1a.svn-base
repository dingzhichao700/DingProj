
module egret {

	export class ActionMovieClipManager{
		private static _instance:ActionMovieClipManager = null;
		
		//加载中的url
		private _loadUrlMap:HashMap = null;
		//回调列表
		private _callBackMap:HashMap = null;
		private _callBackTargetMap:HashMap = null;
		//加载中的url
		private _loadUrlMap2:HashMap = null;
		//回调列表
		private _callBackMap2:HashMap = null;
		private _callBackTargetMap2:HashMap = null;
		private _directionMap2:HashMap = null;
		//加载数量
		private _loadCount:number = 0;
		//动作影片数据层
		private _actionMovieClipData:ActionMovieClipData;

		/**
		 * 构造函数
		 */
		public constructor(){
			this._loadUrlMap = new HashMap();
			this._callBackMap = new HashMap();
			this._callBackTargetMap = new HashMap();

			this._loadUrlMap2 = new HashMap();
			this._callBackMap2 = new HashMap();
			this._callBackTargetMap2 = new HashMap();
			this._directionMap2 = new HashMap();
			
			this._actionMovieClipData = ActionMovieClipData.getInstance();
		}

		public static getInstance():ActionMovieClipManager{
			return ActionMovieClipManager._instance || (ActionMovieClipManager._instance = new ActionMovieClipManager());
		}
		
		//
		/**
		 * 加载动作影片数据，一个动作一张图片
		 * @param url:String 影片地址
		 * @param callBack:Function = null 加载完成回调 function(){}
		 * 
		 */		
		public loadActionMovieClipVo(url:string,callBack:Function = null,callBackTarget:any = null):void{
			var array:HashMap = this._callBackMap.get(url);
			if(!array){
				array = new egret.HashMap();
				this._callBackMap.put(url,array);
			}
			if(!array.containsKey(callBackTarget.hashCode)){
				this._callBackTargetMap.put(callBackTarget.hashCode,callBackTarget);
                array.put(callBackTarget.hashCode,callBack);
			}

			if(this._loadUrlMap.containsKey(url)) return;
			if(this._actionMovieClipData.getActionMovieClipVo(url)) return;
			
			this._loadUrlMap.put(url,true);

			this._loadCount ++;

			//因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
			EnterFrameManager.getInstance().addExecute(RES.getResByUrl,null,this._loadCount % 10 + 2,[url,this.loadActionComplete,this],1);
			//RES.getResByUrl(url,this.loadActionComplete,this);
		}
		//
		/**
		 * 加载动作资源完成，一个动作一张图片
		 * @param loadDataItem
		 * 
		 */	
		private loadActionComplete(data:any,url:string):void{
			if(data instanceof SpriteSheet && url){
				if(data){
					var jsonUrl:string = this._actionMovieClipData.getJsonUrl(url);
					var jsonData:Object = this._actionMovieClipData.getActionData(jsonUrl);
					var vo:ActionMovieClipVo = ActionMovieClipUtil.getActionMovieClipVo(jsonData,<SpriteSheet>data);

					if(vo){
						this._actionMovieClipData.setActionMoveClipVo(jsonUrl,vo);
					}else{
						LogManager.error(this,"无效的ActionMovieClipVo数据:" + url);
					}
				}else{
					LogManager.error(this,"加载到无效的动作数据: url = " + url);
				}

				this._loadUrlMap.remove(jsonUrl);
				var array:HashMap = this._callBackMap.remove(jsonUrl);

				if(array){
					for(var i in array.content){
						var fun:any = array.get(i);
						if(fun != null){
							var target:any = this._callBackTargetMap.get(i);
							fun.apply(target,[jsonUrl]);
						}
					}
				}
			}else if(data instanceof Object){
				this._actionMovieClipData.setActionData(url,data);

				url = this._actionMovieClipData.getSheetUrl(url);

				//因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
				EnterFrameManager.getInstance().addExecute(RES.getResByUrl,null,2,[url,this.loadActionComplete,this,RES.ResourceItem.TYPE_SHEET],1);
				//RES.getResByUrl(url,this.loadActionComplete,this,RES.ResourceItem.TYPE_SHEET);
			}else{
				LogManager.error(this,"加载到无效的动作数据: url = " + url);
			}
		}
		//
		/**
		 * 加载动作影片数据，动作方向图片拆分
		 * @param url:String 影片地址
		 * @param callBack:Function = null 加载完成回调 function(){}
		 *
		 */
		public loadActionMovieClipVo2(url:string,callBack:Function,callBackTarget:Avatar,actionType:number = -1,direction:number = -1):void{
			if(actionType == -1){
				actionType = callBackTarget.actionType;
			}
			if(direction == -1){
				direction = callBackTarget.direction;
			}

			var array:HashMap = this._callBackMap2.get(url);
			if(!array){
				array = new egret.HashMap();
				this._callBackMap2.put(url,array);
			}
			if(callBack && !array.containsKey(callBackTarget.hashCode)){
				this._callBackTargetMap2.put(callBackTarget.hashCode,callBackTarget);
                array.put(callBackTarget.hashCode,callBack);
			}

			var list:Array<number> = this._directionMap2.get(url);
			if(!list){
				list = [];
				this._directionMap2.put(url,list);
			}
			if(list.indexOf(direction) == -1)
				list.push(direction);

			if(this._loadUrlMap2.containsKey(url)) return;

			var vo:ActionMovieClipVo = this._actionMovieClipData.getActionMovieClipVo(url);
			if(vo && !this._actionMovieClipData.hasDirectionTypeTexture(vo,actionType,direction)){
				this.loadActionComplete2(vo,url);
				return;
			}

			this._loadUrlMap2.put(url,true);

			this._loadCount ++;

			//因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
			EnterFrameManager.getInstance().addExecute(RES.getResByUrl,null,this._loadCount % 10 + 2,[url,this.loadActionComplete2,this],1);
			//RES.getResByUrl(url,this.loadActionComplete,this);
		}
		//
		/**
		 * 加载动作资源完成，动作方向图片拆分
		 * @param loadDataItem
		 *
		 */
		private loadActionComplete2(data:any,url:string):void{
			if(data instanceof SpriteSheet){
				if(url){
					this._actionMovieClipData.setSheet(url,data);
				}else{
					url = this._actionMovieClipData.getUrlBySheet(data);
				}

				var jsonUrl:string = this._actionMovieClipData.getJsonUrl2(url);
				var vo:ActionMovieClipVo = this._actionMovieClipData.getActionMovieClipVo(jsonUrl);

				if(vo){
					vo = ActionMovieClipUtil.getActionMovieClipVo2(vo,<SpriteSheet>data);
				}else{
					var jsonData:Object = this._actionMovieClipData.getActionData(jsonUrl);
					vo = ActionMovieClipUtil.getActionMovieClipVo(jsonData,<SpriteSheet>data);

					if(vo){
						this._actionMovieClipData.setActionMoveClipVo(jsonUrl,vo);
					}else{
						LogManager.error(this,"无效的ActionMovieClipVo数据:" + url);
					}
				}

				this._loadUrlMap2.remove(jsonUrl);
				var array:HashMap = this._callBackMap2.remove(jsonUrl);

				if(array){
					for(var i in array.content){
						var fun:any = array.get(i);
						if(fun != null){
							var target:any = this._callBackTargetMap2.get(i);
							fun.apply(target,[jsonUrl]);
						}
					}
				}
			}else if(data instanceof Object){
				if(!(data instanceof ActionMovieClipVo)){
					if(url){
						this._actionMovieClipData.setActionData(url,data);
					}else{
						LogManager.error(this,"url 为空 data = " + data);
					}
				}

				var list:Array<number> = this._directionMap2.get(url);

				i = 0;
				while(list.length > 0){
					var direction:number = list.pop();

					if(direction > ActionMovieClipDirectionType.DOWN){
						direction = this._actionMovieClipData.getReverseDir(direction);
					}

					var sheetUrl:string = this._actionMovieClipData.getSheetUrl2(url,direction);
					var sheet:SpriteSheet = this._actionMovieClipData.getSheet(sheetUrl);
					
					if(sheet){
						this.loadActionComplete2(sheet,sheetUrl);
					}else{
						//因手机性能较低，将加载分布至各个帧加载，减少同时加载的数量，提高性能
						EnterFrameManager.getInstance().addExecute(RES.getResByUrl,null,(2 + Number(i)),[sheetUrl,this.loadActionComplete2,this,RES.ResourceItem.TYPE_SHEET],1);
						//RES.getResByUrl(url,this.loadActionComplete,this,RES.ResourceItem.TYPE_SHEET);
						i++;
					}
				}
			}else{
				LogManager.error(this,"加载到无效的动作数据: url = " + url);
			}
		}
	}
}