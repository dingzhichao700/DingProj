module game {
	export class BagIManager extends DLG.BaseAction {
		private static _instance: BagIManager

		private _goods:Array<number>;
		private _results:Array<number>;

		public constructor() {
			super();
			let self = this;
			self.createSocket();
			self.createPanelMar();
		}
		public static getInstance(): BagIManager {
			let self = this;
			if (!self._instance) {
				self._instance = new BagIManager();
				self._instance.initBagDatas();
			}
			return self._instance;
		}
		private initBagDatas():void{
			let i:number=0
			this._goods = [];
			
			for(i=0;i<70;i++){
				if(i<8){
					this._goods.push(i+1);
				}
				else if(i<20){
					this._goods.push(0);
				}
				else{
					this._goods.push(-1);
				}
			}

			this._results = [];
			for(i=0;i<6;i++){
				this._results.push(10001+i);
			}
		}

		public get goods() :Array<number>{
			return this._goods;
		}

		public get results() :Array<number>{
			return this._results;
		}

	}
}