module DLG {
	export class KeyBoardManager {
		private static _instance: KeyBoardManager
		private list: Array<KeyVo>;  
		private isListening: boolean = false;  
		public static getInstance(): KeyBoardManager {
			let self = this;
			if (!self._instance) {
				self._instance = new KeyBoardManager();
			}
			return self._instance;
		}
		public constructor() {  
			// this.list = {};  
			let self = this;
			self.list = [];
		}  
	
		private onKeyDown(evt:KeyboardEvent): void {  
			// console.log("evt.keyCode:" + evt.keyCode);  
			let self = KeyBoardManager.getInstance();
			var target: any;  
			let i:number = 0;
			let len:number = self.list.length;
			for( i=0; i < len ; i++)
			{
				var vo: KeyVo = self.list[i];
				if (vo.keyCode == evt.keyCode)
				{
					vo.callback.call(vo.target,evt);  
				}
			}
			 
		}  
	
	
		/**  
		 * 注册监听  
		 * @param callback 回调方法  
		 * @param target   
		 */  
		public addListener(callback: any,target: any,keyCode:number): void {  
			var temp: string = egret.getQualifiedClassName(target);  
			var vo: KeyVo = new KeyVo(temp, target, callback, keyCode);  
			let self = KeyBoardManager.getInstance();
			self.list.push(vo);  
			if(self.isListening == false) {  
				self.isListening = true;  
				document.addEventListener("keydown",self.onKeyDown);  
			} 
		}  
	
	
		/**  
		 * 移出监听  
		
		public removeListener(target: any): void {  
			var temp: string = egret.getQualifiedClassName(target);  
			let list  = KeyBoardManager.getInstance().list
			if(list[temp] != null) {  
				delete list[temp];  
			}  
			this.checkCount();  
		}   */  
	
	
		// private checkCount(): void {  
		// 	for(var key in this.list) {  
		// 		return;  
		// 	}  
		// 	document.removeEventListener("keydown",this.onKeyDown);  
		// 	this.isListening = false;  
		// }  
	}
	class KeyVo {  
		public name: string = "";  
		public target: egret.DisplayObject;  
		public callback: Function;  
		public keyCode:number
	
		public constructor(name: string,tar: any,call: any,keyCode:number) {  
			this.name = name;  
			this.target = tar;  
			this.callback = call;  
			this.keyCode = keyCode
		}  
	}  
}