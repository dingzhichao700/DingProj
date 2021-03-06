
module egret {

	export class ActionMovieClip2 extends BaseMovieClip2{
		/**
		 * 对称方向是否翻转Y轴
		 * @type {boolean}
		 */
		public flipY:boolean = false;
		//当前动作方向
		private _direction:number = ActionMovieClipDirectionType.UP;
		//当前动作类型
		private _actionType:number = ActionType.PREPARE;
		//影片数据
		private _actionMovieClipVo:ActionMovieClipVo = null;
		
		/**
		 * 构造函数
		 */
		public constructor(){
			super();
			
			this.touchChildren = false;
		}

		public get actionType():number{
			return this._actionType;
		}
		/**
		 * 动作类型 
		 * @param value:int
		 * @see ActionMovieClipType
		 */
		public set actionType(value:number){
			if(this._actionType == value) return;
			
			this._actionType = value;
			
			this.setBaseMovieClipVo(this._actionType);
		}

		public get actionMovieClipVo():ActionMovieClipVo{
			return this._actionMovieClipVo;
		}
		/**
		 * 影片数据 
		 * @param value:ActionMovieClipVo
		 * 
		 */
		public set actionMovieClipVo(value:ActionMovieClipVo){
			this._actionMovieClipVo = value;
			
			this.setBaseMovieClipVo(this._actionType,this._direction);
		}

		public get direction():number{
			return this._direction;
		}
		/**
		 * 影片动作方向 
		 * @param value:int
		 * @see ActionMovieClipDirectionType
		 */
		public set direction(value:number){
			if(this._direction == value) return;
			
			this._direction = value;
			
			this.setBaseMovieClipVo(-1,this._direction);
		}
		//
		/**
		 * 获取指定动作类型和方向的数据 
		 * @param actionType:int 动作类型
		 * @param direction:int 方向
		 * @return 
		 * @see ActionMovieClipData.getBaseMovieClipVo()
		 */		
		public getBaseMovieClipVo(actionType:number,direction:number = 0):BaseMovieClipVo{
			return ActionMovieClipData.getInstance().getBaseMovieClipVo(this._actionMovieClipVo,actionType,direction);
		}
		//
		/**
		 * 影片是否存在动作类型数据 
		 * @param actionType:int 动作类型
		 * @return 
		 * @see ActionMovieClipData.hasActionType()
		 */		
		public hasActionType(actionType:number = 0):boolean{
			return ActionMovieClipData.getInstance().hasActionType(this._actionMovieClipVo,actionType);
		}
		//
		/**
		 * 影片是否存在动作类型和方向数据  
		 * @param actionType:int 动作类型
		 * @param direction:int 动作方向
		 * @param checked:Boolean = true 是否检测对称方向数据，为 true 时，如果当前方向无数据，而对称方向有数据仍然返回 true
		 * @return 
		 * @see ActionMovieClipData.hasDirectionType()
		 */		
		public hasDirectionType(actionType:number,direction:number,checked:boolean = true):boolean{
			return ActionMovieClipData.getInstance().hasDirectionType(this._actionMovieClipVo,actionType,direction,checked);
		}
		//
		public destroy():void{
			if(this._isDestroy) return;
			
			super.destroy();
		}
		//
		/**
		 * 设置当前播放数据 
		 * @param actionType:int = -1 动作类型，-1时不设置
		 * @param direction:int = -1 动作方向，-1时不设置
		 * 
		 */		
		public setBaseMovieClipVo(actionType:number = -1,direction:number = -1):void{
			if(actionType == -1 && direction == -1) return;
			
			if(actionType != -1)
				this._actionType = actionType;
			if(direction != -1)
				this._direction = direction;
			
			var index:number = this._direction;
			if(this._actionMovieClipVo){
				var actionVos:Array<any> = this._actionMovieClipVo.baseMovieClipVos[this._actionType];
				if(actionVos)
					var vo:BaseMovieClipVo = actionVos[this._direction];
				
				if(vo){
					this.scaleX = 1;

					if(this.flipY){
						this.scaleY = 1;
					}
				}else if(actionVos){
					//反方向数据
					index = ActionMovieClipData.getInstance().getReverseDir(this._direction);
					vo = actionVos[index];
					if(vo){
						this.scaleX = -1;

						if(this.flipY){
							this.scaleY = -1;
						}
					}
				}
			}
			this.baseMovieClipVo = vo;
		}
		//
		/**
		 * 设置动作影片数据 
		 * @param vo:ActionMovieClipVo 影片数据 
		 * @param actionType:int = -1 动作类型 ActionType
		 * @param direction:int = -1 动作方向 ActionMovieClipDirectionType
		 * 
		 */		
		public setActionMovieClipVo(vo:ActionMovieClipVo,actionType:number = -1,direction:number = -1):void{
			this._actionMovieClipVo = vo;
			
			this.setBaseMovieClipVo(actionType,direction);
		}
		
		public clear():void{
			super.clear();
			
			this._actionMovieClipVo = null;
		}
	}
}