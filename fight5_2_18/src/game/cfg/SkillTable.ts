module game {
	export class SkillCfg {
		id: number;
		/**名字 */
		name: string;
		/**技能描述 */
		desc: string;
		/**职业 */
		occupations: number;
		/*学习技能等级*/
		studyGrade: number;
		/**图标 */
		icon: number;
		/** 触发类型 1-出手   2-受击 3-出场  4-装弹*/
		trigger: number;
		/** 激活条件*/
		jihuoitem: number;
		/**冷却回合 */
		cd: number;
		/**使用距离 */
		distance: number;
		/**作用范围 */
		range: number;
		/**子弹 */
		bullet: number;
	

		/**作用方  1-自己  2-目标  */
		target: number;
		/** （BUFF编号|BUFF编号）*/
		buffIds: string;
		/**BUFF持续时间 */
		buffTime: string;


		
		/**特效 用|分开 */
		effect: number;

	}
	export class SkillTable extends DLG.BaseTable {
		public static init() {
			this.analysis(CfgData.getDataByUrl(CfgData.skill_json));
		}
	}
}