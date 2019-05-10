module game {
	export class SceneData {
		/**角色站脚位置 */
		public static roleStandPoint: Array<number> = [320, 210, 430, 100, 540];
		public static boundary: number = 680;
		public monsterDic: Object;
		public roleDic: Object;
		public bulletDic: Object;
		public monsterLen: number = 0;
		public monsterIdList: Array<number>;
		public roleIdList: Array<number>;
		public bulletIdList: Array<number>;

		public static borntBossWeight: Array<any> = [
			"", "", "6000|4000", "4000|3000|3000", "3000|3000|2000|2000", "3000|2000|2000|1500|1500"
		]

		public constructor() {

			let self = this;
			self.monsterDic = {};
			self.roleDic = {};
			self.bulletDic = {};
			self.monsterIdList = [];
			self.roleIdList = [];
			self.bulletIdList = [];
		}
	
	}
}