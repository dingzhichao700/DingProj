module game {
	export class CfgData {
		public static global_json: string = 'cfg_Global_json';
		public static lan_json: string = 'cfg_Lan_json';
		public static monster_json: string = 'cfg_Monster_json';
		public static bullet_json: string = 'cfg_Bullet_json';
		public static skill_json: string = 'cfg_skill_json';
		public static scene_json: string = 'cfg_Scene_json';
		public static goods_json: string = 'cfg_goods_json';
		public static server_json: string = 'cfg_Server_json';
		public static buff_json: string = 'cfg_buff_json';
		public static effect_json: string = 'cfg_effect_json';
		public static randomName_json: string = 'cfg_random_name_json';

		protected static josnData: Object = {};
		public static getDataByUrl(url: string): any {
			let self = this;
			if (self.josnData.hasOwnProperty(url)) {
				return self.josnData[url];
			}
			return null;
		}
		public static setDataByUrl(url: string, data: string): void {
			let self = this;
			data = data.replace(/\r/g, '');
			data = data.replace(/\n/g, '');
			data = data.replace(/\[,(.+)]/g, '');
			// data = data.replace(/\,,/g, ',0,');
			// data = data.replace(/\,,/g, ',"-",');
			if (data.slice(data.length - 1, data.length) == ',') {
				data = data.slice(0, data.length - 1) + ']';
			}
			let s

			debug("开始解析配置" + url);
			do {
				s = data.slice(0, 1);
				if (s != '[' && s != '{') {
					data = data.slice(1);
				}
			} while (s != '[' && s != '{');
			let jData = JSON.parse(data);
			self.josnData[url] = jData;
		}
	}
}