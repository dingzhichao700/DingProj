
module egret {


	/**
	 * EntryPointLo 传送点lo<br/>
	 * @author Dempsey <br/>
	 * 2013-11-11
	 */
	export class EntryPointLo extends SceneElementLo{

		public constructor(){
			super();
		}
		/**
		 * 传送场景id 
		 */		
		public entryId:number = 0;
		/**
		 * 角色出生点id 
		 */		
		public roleBornPointId:number = 0;
	}
}