module DLG {
	/**
	 *
	 * @author 
	 *
	 */
	export class LocalData {
		public static HEAD_KEY: string = '';
		public static setData(key:string, data:any):void{
			if(egret.localStorage)egret.localStorage.setItem(this.HEAD_KEY + key, data);
		}
		
		public static getData(key:string):any{
			var data: any;
			if(egret.localStorage){
				data = egret.localStorage.getItem(this.HEAD_KEY + key);
			}
			return data ? data : '';
		}

		public static removeData(key:string){
			if(egret.localStorage)egret.localStorage.removeItem(this.HEAD_KEY + key);
		}
	}
}
