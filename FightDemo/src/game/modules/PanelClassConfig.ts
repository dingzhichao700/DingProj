module game {
	export class PanelClassConfig {
		/**创角界面 */
		public static ID_CreateRolePanel: number = 1;
		/**选区开始游戏界面 */
		public static ID_ServerPanel: number = 2;
		/**登录界面 */
		public static ID_LoginInputPanel: number = 3;
		/**选区弹框界面 */
		public static ID_SelectServerPanel: number = 5;

		/**主界面ui界面 */
		public static ID_MainUiPanel: number = 6;
		/**背包界面 */
		public static ID_BagPanel: number = 7;
		/**武魂真身界面 */
		public static ID_WuHunPanel: number = 8;
		/**暗器界面 */
		public static ID_HideWeaponPanel: number = 9;
		/**斗魂场界面 */
		public static ID_PvpMatchPanel: number = 10;
		/**关卡界面 */
		public static ID_MissionPanel: number = 11;

		/**loading界面 */
		public static ID_LoadPanel: number = 12;

		/**guide界面 */
		public static ID_GuidePanel: number = 13;
		public static ID_WelcomePanel: number = 14;
		public static ID_SkillVmcPanel: number = 15;
		public static ID_TipsPanel: number = 16;
		public static ID_ResultPanel: number = 17;

		public static getCfg(): Array<any> {
			var arr: Array<any> =
				[
					["id", "类路径", "超类", "层级"],
					["id", "classpath", "superclass", "layer","canClose"],
					[PanelClassConfig.ID_CreateRolePanel, "CreateRolePanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_ServerPanel, "ServerPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_LoginInputPanel, "LoginInputPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_SelectServerPanel, "SelectServerPanel", "IPanel", PanelLayer.CENTER,1],

					[PanelClassConfig.ID_MissionPanel, "MissionPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_BagPanel, "BagPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_WuHunPanel, "WuHunPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_HideWeaponPanel, "WeaponPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_PvpMatchPanel, "PvpMatchPanel", "IPanel", PanelLayer.CENTER,1],
					[PanelClassConfig.ID_MainUiPanel, "MainUIPanel", "IPanel", PanelLayer.MAIN_UI,0],

					[PanelClassConfig.ID_LoadPanel, "LoadPanel", "IPanel", PanelLayer.LOADING,0],
					[PanelClassConfig.ID_GuidePanel, "GuidePanel", "IPanel", PanelLayer.GUIDE,0],
					[PanelClassConfig.ID_WelcomePanel, "WelcomPanel", "IPanel", PanelLayer.GUIDE,0],
					[PanelClassConfig.ID_SkillVmcPanel, "SkillVmcPanel", "IPanel", PanelLayer.BOTTOM,0],
					[PanelClassConfig.ID_TipsPanel, "ItemTipsPanel", "IPanel", PanelLayer.Dialog,1],
					[PanelClassConfig.ID_ResultPanel, "MissonResultPanel", "IPanel", PanelLayer.CENTER,1],
					
				]
			return arr;
		}
	}
}