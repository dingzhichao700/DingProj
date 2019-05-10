module game {
	export class JobNameAction extends DLG.BaseAction {
		// private static _instance: JobNameAction;
		/**所有的姓 */
		private firstNameArr: string[];
		/**姓数组的长度 */
		private firstNameLen: number;
		/**所有的男名 */
		private boyNameArr: string[];
		/**男名数组的长度 */
		private boyNameLen: number;
		/**所有的女名 */
		private girlNameArr: string[];
		/**女名数组的长度 */
		private girlNameLen: number; 


		public constructor() {
			super();
		}

		// public static getInstance(): JobNameAction {
		// 	let self = this;
		// 	if (!self._instance) {
		// 		self._instance = new JobNameAction();
		// 	}
		// 	return self._instance;
		// }

		private initNameConfig(): void {
			let self = this;
			let randomNameArr: Array<RandomNameCfg>

			randomNameArr = RandomNameTable.getDataVec<RandomNameCfg>();
			
			let i: number = 0;
			let len: number = randomNameArr.length;
			for (i = 0; i < len; i++) {
				if (randomNameArr[i].type == 1) {
					self.firstNameArr.push(randomNameArr[i].name);
				} else if (randomNameArr[i].type == 2) {
					self.boyNameArr.push(randomNameArr[i].name);
				} else {
					self.girlNameArr.push(randomNameArr[i].name);
				}
			}
			self.firstNameLen = self.firstNameArr.length;
			self.boyNameLen = self.boyNameArr.length;
			self.girlNameLen = self.girlNameArr.length;
		}

		/**随机一个姓 */
		private get firtName(): string {
			let self = this;
			if (!self.firstNameArr) {
				self.initNameConfig();
			}
			let index: number = Math.round(Math.random() * self.firstNameLen);
			if (index < 0 || index >= self.firstNameLen) {
				index = Math.round(Math.random() * self.firstNameLen);
			}
			return self.firstNameArr[index];
		}

		/**随机一个男名 */
		private get boyName(): string {
			let self = this;
			if (!self.boyNameArr) {
				self.initNameConfig();
			}
			let index: number = Math.round(Math.random() * self.boyNameLen);
			if (index < 0 || index >= self.boyNameLen) {
				index = Math.round(Math.random() * self.boyNameLen);
			}
			return self.boyNameArr[index];
		}

		/**随机一个女名 */
		private get girlName(): string {
			let self = this;
			if (!self.girlNameArr) {
				self.initNameConfig();
			}
			let index: number = Math.round(Math.random() * self.girlNameLen);
			if (index < 0 || index >= self.girlNameLen) {
				index = Math.round(Math.random() * self.girlNameLen);
			}
			return self.girlNameArr[index];
		}

		/**获取一个随机姓名 */
		public getRandomName(sex: number): string {
			let self = this;
			if (sex == 1) {
				return self.firtName + self.boyName;
			} else {
				return self.firtName + self.girlName;
			}
		}
		public onDestroy(): void {
			super.onDestroy();
			let self = this;
			if (self.firstNameArr)
			{
				self.firstNameArr.length = 0;
				self.firstNameArr = null;
			}	
			if (self.boyNameArr)
			{
				self.boyNameArr.length = 0;
				self.boyNameArr = null;
			}	
			if (self.girlNameArr)
			{
				self.girlNameArr.length = 0;
				self.girlNameArr = null;
			}	

		}

	}
}