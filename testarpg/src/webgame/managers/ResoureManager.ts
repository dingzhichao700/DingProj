
module egret {

	export class ResoureManager{

    	private static _instance:ResoureManager = null;
		
		public constructor(){
		}

		public static getInstance():ResoureManager{
			return ResoureManager._instance || (ResoureManager._instance = new ResoureManager());
		}

		public loadMapData(url:string,id:number,callback:Function = null,target:any = null):void{
			RES.getResByUrl(url,loadMapDataComplete,null);

			function loadMapDataComplete(data:any,url:string):void{
				var lo:SceneEditLo = new SceneEditLo();
				ObjectUtil.copyProperties(data,lo);

				IsoMapData.getInstance().setData(id,lo);

				if(callback){
					callback.apply(target);
				}
			}
		}
	}
}