
module egret {
	/**
	 * 基础技能，只需要播放即可
	 */
	export class ElementSkill extends ElementEffect{
		/**
		 * 构造函数
		 */
		public constructor(){
			super();
		}
		//
		/**
		 * 获取部件影片地址
		 * @param partType:String ActionPartType 动作影片类型
		 * @return
		 */
		public getPartUrl(partType:string):string{
			var path:string = PathData.PATH_MOVIES_SKILL;

			var movie:string = this._sceneAvatarVo[partType];

			var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);

			return url;
		}
	}
}