module game {
	export class DamageAction extends DLG.BaseAction {
		protected isShowLog: boolean = false;
		protected m_sceneMar: SceneManager;
		/**伤害加深区间 最小值 */
		private hurtDeepMin: number;
		private hurtDeepMax: number;
		/**怪物伤害减免区间 最小值 */
		private hurtImmuneMin: number;
		private hurtImmuneMax: number;
		/**暴击几率区间 最小值 */
		private critRatioMin: number;
		private critRatioMax: number;

		/**暴击伤害倍数区间 最小值 */
		private critDamageMin: number;
		private critDamageMax: number;

		public constructor() {
			super();
			let self = this;
			self.m_sceneMar = SceneManager.getInstance();
			self.createClock();

			let g_value = GlobalTable.getCfgById<GlobalCfg>(ENUM_GLOBAL_ID.G_10001).valueStr.split("|");
			self.hurtDeepMin = parseInt(g_value[0]);
			self.hurtDeepMax = parseInt(g_value[1]);
			g_value = GlobalTable.getCfgById<GlobalCfg>(ENUM_GLOBAL_ID.G_10002).valueStr.split("|");
			self.hurtImmuneMin = parseInt(g_value[0]);
			self.hurtImmuneMax = parseInt(g_value[1]);
			g_value = GlobalTable.getCfgById<GlobalCfg>(ENUM_GLOBAL_ID.G_10003).valueStr.split("|");
			self.critDamageMin = parseInt(g_value[0]);
			self.critDamageMax = parseInt(g_value[1]);
			g_value = GlobalTable.getCfgById<GlobalCfg>(ENUM_GLOBAL_ID.G_10004).valueStr.split("|");
			self.critRatioMin = parseInt(g_value[0]);
			self.critRatioMax = parseInt(g_value[1]);
		}
		/** 子弹打怪 */
		public damageBulletAttack(bulletData: BulletData, monster: MonsterDriver) {

			let self = this;
			let utils = DLG.Utils;
			let hurtData: HurtData = HurtData.getHurtData();
			let monsterData:MonsterData = <MonsterData>monster.getData();
			let bulletAtt: AttrData = bulletData.attr;
			let monsterAttr: AttrData = monsterData.attr;
			
			let hurtExRatio: number = 0;
			let hurtExValue: number = 0;
			if (bulletData.luckHurtExRationMin && bulletData.luckHurtExRationkMax) {
				let add = utils.random(bulletData.luckHurtExRationMin, bulletData.luckHurtExRationkMax);
				hurtExRatio += add;
				hurtData.luckHurt = true;
				if(self.isShowLog) debug('幸运一击伤害加成' + add);
			}
			if (bulletData.farHurtExRatio) {
				let add = (SceneData.boundary - monsterData.y) / SceneData.boundary * bulletData.farHurtExRatio;
				if (add < 0)
				{
					add = 0
				}	
				if (add > bulletData.farHurtExRatio)
				{
					add = bulletData.farHurtExRatio;
				}
				hurtExRatio += add;
				hurtData.farHurt = true;
				if(self.isShowLog) debug('远距离攻击伤害加成' + add);
			}
			if (bulletData.shortHurtExRatio) {
				let add = (1 - (SceneData.boundary - monsterData.y) / SceneData.boundary) * bulletData.shortHurtExRatio;
				if (add < 0)
				{
					add = 0
				}
				if (add > bulletData.shortHurtExRatio)
				{
					add = bulletData.shortHurtExRatio;
				}	
				hurtExRatio += add;
				hurtData.shortHurt = true;
				if(self.isShowLog) debug('近距离攻击伤害加成' + add);
			}
			if (bulletData.anshaRatio && Math.random() * 10000 <= bulletData.anshaRatio) {
				let add = bulletData.anshaHurtExRatio;
				hurtExRatio += add;
				hurtData.anShi = true;
				if(self.isShowLog) debug('暗杀伤害加成' + add);
				if (bulletData.anshaLiSkillId)
				{
					//如果有暗杀之力，给人物增加5秒攻击力增加的buff
					// let masterDriver: IDriver = SceneManager.getInstance().getDriverById(bulletData.masterId, DriverType.role);
					// BuffManager.getInstance().addBuffToTargetData(masterDriver.getData(), bulletData.anshaLiBuffId, 5000, 0, 0);
				}	
			}
			if (bulletData.firstHurtExValue) {
				let add = bulletData.firstHurtExValue;
				hurtExRatio += add;
				hurtData.firstHurt = true;
				if(self.isShowLog) debug('先发制人伤害加成' + add);
			}
			if (bulletData.bigWeaponHurtRatio) {
				let add = bulletData.bigWeaponHurtRatio;
				hurtExRatio += add;
				hurtData.bigWeaponHurt = true;
				if(self.isShowLog) debug('巨型武器伤害加成' + add);
			}
			if (bulletData.mengDuHurtValueExRatio) {
				let add = monsterAttr.getValue(Enum_Attr.hp) * bulletData.mengDuHurtValueExRatio;
				hurtExRatio += add;
				hurtData.mengDu = true;
				if(self.isShowLog) debug('猛毒伤害加成' + add);
			}
			if (bulletData.forceSwoonRatio && Math.random() * 10000 <= bulletData.forceSwoonRatio) {
				//强打眩晕
				// monsterData.isSwoonTime = self.m_clock.getTime() + 3000;
				hurtData.forceSwoon = true;
				let buff: BuffData = BuffManager.getInstance().onAddBuffToTargetData(monsterData, 11101, 3000, 0, 0);
				buff.touch();
				if(self.isShowLog) debug('强打眩晕---');
				//产生眩晕buff;
			}
			if (monsterData.isSwoonTime && bulletData.swoonHurtExRatio) {
				let add = bulletData.swoonHurtExRatio;
				hurtExRatio += add;
				hurtData.swoonHurt = true;
				if(self.isShowLog) debug('眩晕 伤害加成' + add);
			}
			//当前的失去血的比例
			let loseBloodRatio:number
			if (bulletData.hpHurtExValueRatio)
			{
				loseBloodRatio =(monsterAttr.getValue(Enum_Attr.hp) - monsterAttr.getValue(Enum_Attr.totalHp))/monsterAttr.getValue(Enum_Attr.totalHp)
			}	
			if(self.isShowLog) debug('-----------开始计算伤害--------');
			//伤害计算
			self.hurtValue(hurtData,bulletData.job, bulletAtt,monsterAttr, monsterData.buffsAttr,
				hurtExRatio, hurtExValue, 0, bulletData.skillHurtDamage, bulletData.bulletdamage);
			if(self.isShowLog) debug('-----------伤害结果',hurtData.hurt);
			if (bulletData.hpHurtExValueRatio) {
				//根据敌人失去的体力，计算额外伤害
				let hurtHpEx = hurtData.hurt * (1 + loseBloodRatio * (bulletData.hpHurtExValueRatio / 10000));
				hurtData.hurt = hurtData.hurt + hurtHpEx
				if (self.isShowLog) debug('-----------失去体力额外伤害', hurtHpEx);
				if(self.isShowLog) debug('-----------伤害结果',hurtData.hurt);
			}
			if (bulletData.isMolotov)
			{
				//火焰弹
				if(self.isShowLog) debug('触发火焰弹');
				let otherTargets:Array<IDriver> = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 150, monsterData.x, monsterData.y);
				let i:number = 0;
				let len:number = otherTargets.length;
				for( i=0; i < len ; i++)
				{
					let otherMonster: MonsterDriver = <MonsterDriver>otherTargets[i];
					let data: MonsterData = <MonsterData>otherMonster.getData();
					if (data && data.attr.getValue(Enum_Attr.hp) > 0)
					{
						let otherBulletData: BulletData = self.m_sceneMar.createDriverData(ENUM_DriverType.bullet);
						bulletData.clone(otherBulletData);
						otherBulletData.isMolotov = undefined;
						// otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
						self.damageBulletAttack(otherBulletData, otherMonster);
						
					}	
					
				}
			}	
			if (bulletData.isFlamer)
			{
				//火焰枪
				if(self.isShowLog) debug('触发火焰枪');
				let otherTargets:Array<IDriver> = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 40, monsterData.x, monsterData.y,60);
				let i:number = 0;
				let len:number = otherTargets.length;
				for( i=0; i < len ; i++)
				{
					let otherMonster: MonsterDriver = <MonsterDriver>otherTargets[i];
					let data: MonsterData = <MonsterData>otherMonster.getData();
					if (data && data.attr.getValue(Enum_Attr.hp) > 0)
					{
						let otherBulletData: BulletData = self.m_sceneMar.createDriverData(ENUM_DriverType.bullet);
						bulletData.clone(otherBulletData);
						otherBulletData.isFlamer = undefined;
						// otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
						self.damageBulletAttack(otherBulletData, otherMonster);
						
					}	
				}
			}
			
			let hp = monsterAttr.getValue(Enum_Attr.hp);
			hp += hurtData.hurt;
			if (hp <= 0) {
				hp = 0;
				//如果死亡，则判断有没有死亡发动的buff
				BuffManager.getInstance().onActionTargetBuff(bulletData, Enum_BuffTrigger.die);

				if (bulletData.baoFaHurtRatio) {
					//灵魂爆发：对周围造成x%的伤害
					if(self.isShowLog) debug('触发灵魂爆发');
					let otherTargets:Array<IDriver> = self.m_sceneMar.getNearRangeDriverByType(monsterData.driverType, 150, monsterData.x, monsterData.y);
					let i:number = 0;
					let len:number = otherTargets.length;
					for( i=0; i < len ; i++)
					{
						let otherMonster: MonsterDriver = <MonsterDriver>otherTargets[i];
						let data: MonsterData = <MonsterData>otherMonster.getData();
						if (data && data.attr.getValue(Enum_Attr.hp) > 0)
						{
							let otherBulletData: BulletData = self.m_sceneMar.createDriverData(ENUM_DriverType.bullet);
							bulletData.clone(otherBulletData);
							otherBulletData.baoFaHurtRatio = undefined;
							otherBulletData.skillHurtDamage = bulletData.baoFaHurtRatio / 10000;
							self.damageBulletAttack(otherBulletData, otherMonster);
							
						}	
						
					}
				}
			}
			if(self.isShowLog) debug('==========================一次伤害结算完毕');
			self.playHurtResult(monster, hurtData, bulletData.effect);
			HurtData.returnHurtData(hurtData);
		}
		/**处理伤害表现效果与属性更新  */
		public playHurtResult(monster:MonsterDriver,hurtData:HurtData,effectid:number): void
		{
			let self = this;
			let monsterData: MonsterData = <MonsterData>monster.getData();
			let monsterAttr: AttrData = monsterData.attr;
			let hp = monsterAttr.getValue(Enum_Attr.hp);
			hp += hurtData.hurt;
			monsterAttr.setValue(Enum_Attr.hp, hp);
			monster.showHpBar(true);
			monster.update();
			self.showBlood(self.m_sceneMar.getEffectLayer(), monsterData.x, monsterData.y + monsterData.byAttackRangeY, hurtData.hurt);
			monster.showEffect(effectid);
			monster.showHitEffect();
			
		}
		/**伤害计算 */
		public hurtValue(hurt: HurtData, job: number, attrdata: AttrData, monsterAttr: AttrData, monsterBuffAttr: AttrData,
			attackExRatio: number, attackExValue: number, hurtDeep: number,
			skillHurtDamage:number,bulletdamage:number): void
		{
			let self = this;
			//attackExRatio  传过来的是万分比。

			// 普攻伤害=（（基础攻击*（1+∑攻击百分比加成）+∑固定值加成）-（怪物防御*（1+∑怪物防御百分比加成）+∑怪物防御固定值加成-破甲攻击））*（1+伤害加深）*（1-怪物免伤）
			// 暴击伤害=（（基础攻击*（1+∑攻击百分比加成）+∑固定值加成）-（怪物防御*（1+∑怪物防御百分比加成）+∑怪物防御固定值加成-破甲攻击））*（1+伤害加深）*（1-怪物免伤）*暴击伤害百分比
			let def: number;
			/** 破甲*/
			let puncture: number;
			/**怪物免伤 */
			let hurtImmune: number;
			
			if (job == ENUM_JOB_TYPE.JOB_WS)
			{
				//魔法系
				def = monsterAttr.getValue(Enum_Attr.magicdefense) + monsterBuffAttr.getValue(Enum_Attr.magicdefense);
				hurtImmune = monsterBuffAttr.getValue(Enum_Attr.magic_HurtImmune);
				puncture = attrdata.getValue(Enum_Attr.magic_puncture);
			}else
			{
				def = monsterAttr.getValue(Enum_Attr.def) + monsterBuffAttr.getValue(Enum_Attr.def);
				hurtImmune = monsterBuffAttr.getValue(Enum_Attr.physics_HurtImmune);
				puncture = attrdata.getValue(Enum_Attr.physics_puncture);
			}
			

			let attack:number = attrdata.getValue(Enum_Attr.attack);
			let utils = DLG.Utils;
			let value: number;

			hurtDeep = hurtDeep / 10000;
			if (self.isShowLog) {
				debug('-----------实质伤害加深', hurtDeep);
			}
			if (hurtDeep < self.hurtDeepMin) hurtDeep = self.hurtDeepMin
			else if (hurtDeep > self.hurtDeepMax) hurtDeep = self.hurtDeepMax
			hurtDeep = 1 + hurtDeep;

			hurtImmune = hurtImmune / 10000;
			if (self.isShowLog) debug('-----------实质怪物免伤', hurtImmune);
			if (hurtImmune < self.hurtImmuneMin) hurtImmune = self.hurtImmuneMin
			else if (hurtImmune > self.hurtImmuneMax) hurtImmune = self.hurtImmuneMax;
			hurtImmune = 1 - hurtImmune ;

			let attackvalue = attack * (1 + attackExRatio / 10000) + attackExValue;
			let defValue = def - puncture;
			if (self.isShowLog) {
				debug('-----------攻：'+ attack + '----攻击加成比：'+ attackExRatio+ '----攻击加成值：'+ attackExValue);
				debug('-----------防：'+ def + '----破甲：'+ puncture);
			}
			value = (attackvalue - defValue) * hurtDeep * hurtImmune;
			if (self.isShowLog) debug('-----------伤害值', -value);

			
			let critRatio: number = attrdata.getValue(Enum_Attr.crit) ;
			if (self.isShowLog) debug('-----------实质暴击率', critRatio / 10000);
			if (critRatio < self.critRatioMin) critRatio = self.critRatioMin
			else if (critRatio > self.critRatioMax) critRatio = self.critRatioMax;
			let resistRatio: number = monsterAttr.getValue(Enum_Attr.resistcrit);
			critRatio = (critRatio - resistRatio) / 10000;

			

			if (critRatio && Math.random() * 10000 < critRatio)
			{
				let critdamage: number = attrdata.getValue(Enum_Attr.critDamage) ;
				if (self.isShowLog) debug('-----------实质暴击伤害倍数', critdamage / 10000);
				if (critdamage < self.critDamageMin) critdamage = self.critDamageMin
				else if (critdamage > self.critDamageMax) critdamage = self.critDamageMax
				let resistdamage: number = monsterAttr.getValue(Enum_Attr.resistdamage);
				critdamage = (critdamage - resistdamage) / 10000;
				value = value * (1.5 - critdamage);
				if (self.isShowLog) debug('-----------暴击后的伤害值', -value);
				hurt.isCrit = true;
			}
			//真实伤害=理论伤害*技能伤害系数*子弹伤害系数*rand[0.95,1.05]
			value = value * skillHurtDamage * bulletdamage * (utils.random(95, 105) / 100);
			if (self.isShowLog) debug('-----------技能伤害系数', skillHurtDamage);
			if (self.isShowLog) debug('-----------子弹伤害系数', bulletdamage);
			hurt.hurt = -Math.floor(value);
			if (self.isShowLog) debug('-----------真实伤害值', value);
		}
		
		
		/**   怪攻击基地*/
		public damageMonsterAttack(monster: MonsterDriver,monsterNotHit:number): void {
			let monsterData: MonsterData = <MonsterData>monster.getData();
			let hit: number = monsterData.attr.getValue(Enum_Attr.hit);
			let buffHit: number = monsterData.buffsAttr.getValue(Enum_Attr.hit);
			if (buffHit)
			{
				hit += buffHit;
			}
			hit -= monsterNotHit;
			if (Math.random() * 10000 < hit)
			{
				let attack: number = monsterData.attr.getValue(Enum_Attr.attack);
				attack += monsterData.buffsAttr.getValue(Enum_Attr.attack);
			}	
			

		}
		private showBlood(_layer: egret.Sprite, x: number, y: number, value: number): void {
			let self = this;
			let font: FontBlood = FontBlood.createFontBlood();
			font.x = x;
			font.y = y;
			_layer.addChild(font);
			font.setNum(value);
		}
	}
}