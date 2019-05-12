module game {
	export class SkillType {
		/**	普通攻击*/
		public static JOB_ZS_10001: number = 10001;
		/**	无影剑（必杀）		随机对某一敌人造成20次每次204%的伤害*/
		public static JOB_ZS_10002: number = 10002;
		/**	守护之力			攻击力增加3.5%*/
		public static JOB_ZS_10003: number = 10003;
		/**	瞬间装弹（队伍）	自动重装弹几率有5.25%*/
		public static JOB_ZS_10004: number = 10004;
		/**	暴击				暴击几率增加3.5%*/
		public static JOB_ZS_10005: number = 10005;
		/**	三剑术				召唤3把剑的几率有16%*/
		public static JOB_ZS_10006: number = 10006;
		/**	双重打击			10.5%几率瞬间攻击2次*/
		public static JOB_ZS_10007: number = 10007;
		/**	物理穿刺			物理破甲增加%*/
		public static JOB_ZS_10008: number = 10008;
		/**	幸运一击			增加加1~55%的随机伤害*/
		public static JOB_ZS_10009: number = 10009;
		/**	巨型武器			巨型普通攻击*/
		public static JOB_ZS_10010: number = 10010;
		/**呐喊（队伍）			本职业攻击增加%*/
		public static JOB_ZS_10011: number = 10011;

		/**	普通攻击*/
		public static JOB_GJS_11001: number = 11001;
		/**剑雨（必杀）		   向敌人发射25支箭，每支剑造成310%的伤害。*/
		public static JOB_GJS_11002: number = 11002;
		/**	额外射击			16%的几率发射3颗子弹*/
		public static JOB_GJS_11003: number = 11003;
		/**	连射速度			攻击速度增加4%*/
		public static JOB_GJS_11004: number = 11004;
		/**	暴击				  暴击几率增加3.5%*/
		public static JOB_GJS_11005: number = 11005;
		/**	远距离攻击			对远处的敌人造成更多的伤害，最多增加10%*/
		public static JOB_GJS_11006: number = 11006;
		/**	威慑（队伍）			敌人移动速度减少10%*/
		public static JOB_GJS_11007: number = 11007;
		/**分裂箭				 5.5%的几率发射5颗子弹*/
		public static JOB_GJS_11008: number = 11008;
		/**无限弓箭				30秒冷却时间，按10次必定触发额外射击*/
		public static JOB_GJS_11009: number = 11009;
		/**呐喊（队伍）			本职业攻击增加%*/
		public static JOB_GJS_11010: number = 11010;
		/**	物理破甲			物理破甲增加%*/
		public static JOB_GJS_11011: number = 11011;

		
		/**	普通攻击*/
		public static JOB_CK_12001: number = 12001;
		/**	战斗呐喊（必杀）		6.1秒内，队友攻击力增加105%*/
		public static JOB_CK_12002: number = 12002;
		/**	攻击无效（队伍）		敌方攻击无效几率提升4%*/
		public static JOB_CK_12003: number = 12003;
		/**	额外射击				16%的几率发射3颗子弹*/
		public static JOB_CK_12004: number = 12004;
		/**	暗杀					2%几率造成1000%的伤害*/
		public static JOB_CK_12005: number = 12005;
		/**	守护者之力				攻击力增加3%*/
		public static JOB_CK_12006: number = 12006;
		/**	攻击速度				攻击速度增加4%*/
		public static JOB_CK_12007: number = 12007;
		/**	先发制人				装弹的第一发伤害增加200%*/
		public static JOB_CK_12008: number = 12008;
		/**	猛毒						造成敌人当前体力的0.5%额外伤害*/
		public static JOB_CK_12009: number = 12009;
		/**	暗杀之力				触发暗杀时，攻击力+0.1%持续5秒*/
		public static JOB_CK_12010: number = 12010;
		/**狂暴（队伍）				本职业暴击增加%*/
		public static JOB_CK_12011: number = 12011;
		/**	物理破甲  				物理破甲增加%*/
		public static JOB_CK_12012: number = 12012;
		

		/**	普通攻击*/
		public static JOB_FS_13001: number = 13001;
		/**	守护者之力		    攻击力增加3%*/
		public static JOB_FS_13002: number = 13002;
		/**	建筑师（队伍）		   基地建筑费用减少3%*/
		public static JOB_FS_13003: number = 13003;
		/**	近距离攻击			对附近的敌人造成更多的伤害，最多增加20%*/
		public static JOB_FS_13004: number = 13004;
		/**	冲击波（必杀）		   敌军造成300%伤害*/
		public static JOB_FS_13005: number = 13005;
		/**	火焰弹				造成圆形范围伤害*/
		public static JOB_FS_13006: number = 13006;
		/**狂暴（队伍）		 本职业暴击增加%*/
		public static JOB_FS_13007: number = 13007;
		/**	物理破甲 			 魔法破甲增加%*/
		public static JOB_FS_13008: number = 13008;
		/**	双重打击			%几率攻击2次*/
		public static JOB_FS_13009: number = 13009;

		// /**13006	巨型武器*/
		// public static JOB_FS_13006: number = 13006;
		// /**13002	巨型攻击*/
		// public static JOB_FS_13002: number = 13002;
		// /**13008	强打*/
		// public static JOB_FS_13008: number = 13008;
		// /**13009	进步的武器*/
		// public static JOB_FS_13009: number = 13009;
		// /**13010	弱肉强食*/
		// public static JOB_FS_13010: number = 13010;
		// /**13011	疯狂打击*/
		// public static JOB_FS_13011: number = 13011;


		/**普通攻击*/
		public static JOB_WS_14001: number = 14001;
		/**暴风雪（必杀）			对全体敌军造成255%的伤害，造成3次*/
		public static JOB_WS_14002: number = 14002;
		/**灵魂爆发				  击杀敌人时，有100%的几率对周围造成307%的伤害*/
		public static JOB_WS_14003: number = 14003;
		/**收尾					根据敌人失去的体力，最多造成100%的伤害*/
		public static JOB_WS_14004: number = 14004;
		/**魔法破甲				  魔法破甲增加%*/
		public static JOB_WS_14005: number = 14005;
		/**守护者之力			 攻击力增加3%*/
		public static JOB_WS_14006: number = 14006;
		/**银行员（队伍）			在线和离线收入增加6%*/
		public static JOB_WS_14007: number = 14007;
		/**双重攻击				  10.5%几率攻击2次*/
		public static JOB_WS_14008: number = 14008;
		/**连发射击				   5.5%的几率发射5颗子弹*/
		public static JOB_WS_14009: number = 14009;
		/**幸运一击					追加1~55%的随机伤害*/
		public static JOB_WS_14010: number = 14010;
		/**火焰枪					造成长方形范围伤害*/
		public static JOB_WS_14011: number = 14011;
		/**狂暴（队伍）			 本职业暴击增加%*/
		public static JOB_WS_14012: number = 14012;

	}
}