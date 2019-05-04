
module egret {

	export class ElementNpc extends SceneElementDriver{

    	public constructor(){
			super();
			this.setIsCheckResource(false);
		}

		/**
		 * 获取部件影片地址 
		 * @param partType:String ActionPartType 动作影片类型
		 * @return
		 */		
		public getPartUrl(partType:string):string{
			var path:string = PathData.PATH_MOVIES_MONSTER;
			
			var movie:string = this._sceneAvatarVo[partType];
			
			var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);
			
			return url;
		}

		/**释放默认技能*/
		public playSkill():void{
			if(this._avatar.frameIndex == 1){
				this.damage();
			}
		}
	}
}