
module egret {


	
	/**
	 * NpcLo NPC表数据<br/>
	 * @author Dempsey <br/>
	 * 2013-9-29
	 */
	export class NpcLo extends SceneElementLo{

		public constructor(){
			super();
		}
		/**
		 * 默认头像图片名称 
		 */		
		public imageName:string = null;
		/**
		 * 默认对话内容 
		 */		
		public dialog:string = "";
		/**
		 * npc 类型  NpcType
		 */		
		public type:number = 0;
	}
}