
module egret {

	export class ActionMovieClipVo{
		/**
		 * 动作影片 数据集 BaseMovieClipVo 2维数组，第1维为动作类型，第2维为方向 
		 */		
		public baseMovieClipVos:Array<any> = [];
		/**
		 * 默认动作类型 
		 */		
		public defaultActionType:number = ActionType.PREPARE;
		/**
		 * 默认动作方向 
		 */		
		public defautlDirectionType:number = ActionMovieClipDirectionType.DOWN;
		//未合成时的动作类型
		private _actionType:number = -1;
		
		/**
		 * 未合成时的动作类型  ActionType
		 * @return 
		 * 
		 */		
		public get actionType():number{
			if(this._actionType == -1){
                for(var i = 1;i < this.baseMovieClipVos.length; i++){
    			    if(this.baseMovieClipVos[i]){
                        this._actionType = i;
                        break; 
    			    }
    			}
			}
			
			return this._actionType;
		}
		/**
		 * 是否含有指定动作类型 
		 * @param actionType:int ActionType
		 * @return 
		 * 
		 */		
		public hasActionType(actionType:number = 0):boolean{
			return this.baseMovieClipVos[actionType];
		}
		
		/**
		 * 销毁数据 
		 * 
		 */		
		public destroy():void{
			var length:number = this.baseMovieClipVos.length;
			for(var i:number = 0;i < length;i++){
				var array:Array<any> = this.baseMovieClipVos[i];
				var length1:number = array.length;
				for(var i1:number = 0;i1 < length1;i1++){
					var vo:BaseMovieClipVo = array[i1];
					vo.destroy();
				}
			}
			
			this.baseMovieClipVos = null;
		}
	}
}