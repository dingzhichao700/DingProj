module game {
	/**属性枚举 */
	export enum Enum_Attr {
		hp = 1,
		totalHp = 2,
		/**移动速度*/
		speed = 3,
		/**物防*/
		def = 4,
		/**魔防*/
		magicdefense = 5,
		/**攻击 */
		attack = 6,
		/**	暴击机率 */
		crit = 7,
		/**	暴击伤害 */
		critDamage = 8,
		/**韧性 */
		tenacity = 9,
		/**物理破甲 */
		physics_puncture = 10,
		/**魔法破甲 */
		magic_puncture = 11,
		/**物理伤害减免 */
		physics_HurtImmune = 12,
		/**魔法伤害减免*/
		magic_HurtImmune = 13,
		/**命中 */
		hit = 14,
		/**抗暴击机率 */
		resistcrit = 15,
		/**抗暴击伤害 */
		resistdamage = 16
	}
	/***职业 */
	export enum ENUM_JOB_TYPE
	{
		/**战士 */
		JOB_ZS = 1,
		/**弓箭手 */
		JOB_GJS = 2,
		/**刺客 */
		JOB_CK = 3,
		/**法师 */
		JOB_FS = 4,
		/**巫师 */
		JOB_WS = 5
	}	
	/**人物动作类型 */
	export enum ENUM_DriverAction {
		stand = 1,
		run = 2,
		attack = 3
	}
	/**人物方向 */
	export enum ENUM_DriverDirection {
		up = 1,
		down = 5
	}
	/**地图上的物体对象类型 */
	export enum ENUM_DriverType {
		monster = 1,
		role = 2,
		bullet = 3
	}
	/**地图上物休对象渲染层次 */
	export enum ENUM_DriverRenderLayerId {
		monsterLayer = 1,
		bulletLayer = 2,
		roleLayer = 3
	}
	/**怪物类型 */
	export enum ENUM_Monster_type {
		normal = 1,
		elite = 2,
		BOSS = 3,
		minority = 4
	}
	/**buff效果类型 */
	export enum ENUM_BuffEffect {
		/**增加或减少当前生命值 */
		HP = 1,
		/**增加或减少移动速度 */
		SPEED = 2,
		/**增加或减少暴击 */
		CRITIC = 3,
		/**增加或减少物理防御 */
		PHYSICS_DEF = 4,
		/**增加或减少魔法防御 */
		MAGIC_DEF = 5,
		/**增加或减少攻击力 */
		ATTACK = 6,
		/**增加或减少命中 */
		HIT = 7,
		/**增加或减少攻击速度 */
		ATTACK_SPEED = 8,
		/**增加或减少装弹速度 */
		PUTON_BULLET_SPEED = 9,
		/** 增加或减少子弹消耗量*/
		ATTACK_EXPEND_SPEED = 10,
		/**眩晕（不能攻击，不能移动） */
		SWOON = 11,
		/**增加或减少血量上限 */
		HP_MAX = 12,
		/**魔法伤害减免 */
		MAGIC_HURT_IMMUNE = 13,
		/**物理伤害减免 */
		PHYSICS_HURT_IMMUNE = 14,
		/**增加或减少物理破甲 */
		PHYSICS_PUNCTURE = 17,	
		/**增加或减少魔法破甲 */
		MAGIC_PUNCTURE = 18


	}
	/**buff 触发条件*/
	export enum Enum_BuffTrigger {
		create = 1,
		/** 发射子弹*/
		shooting = 2,
		die = 3,
		time = 4,
		max = time
	}
	/**buff作用对象 */
	export enum Enum_BuffTargetType {
		mySelf = 1,
		target = 2,
		teammate = 3,
		/**敌方 */
		enemys = 4
	}
}