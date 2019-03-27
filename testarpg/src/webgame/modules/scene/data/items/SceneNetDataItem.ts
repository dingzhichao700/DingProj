
module egret {

	export class SceneNetDataItem{
		/**
		 * 场景id 
		 */		
		public id:number = 0;
		/**
		 * 场景中的传送项目数组 (SceneNetDataItem)
		 */		
		public entrySceneItems:Array<any> = [];
		/**
		 * 场景传送点lo数组 
		 */		
		public enterPoints:Array<any> = [];
	}
}