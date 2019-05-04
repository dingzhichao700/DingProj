
module egret {

	export class SceneElementDataItem{
    	
		/**场景元素表数据 */		
		public lo:SceneElementLo = null;
		/**场景元素服务端数据 */		
		public vo:SceneElementVo = null;

		public get id():string{
			if(this.vo){
				if(this.vo.idString)
					return this.vo.idString
				if(this.vo.id)
					return this.vo.id + "";
			}

			if(this.lo && this.lo.id)
				return this.lo.id + "";

			return null;
		}
	}
}