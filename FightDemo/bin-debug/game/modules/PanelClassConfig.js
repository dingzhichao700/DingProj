var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var PanelClassConfig = (function () {
        function PanelClassConfig() {
        }
        PanelClassConfig.getCfg = function () {
            var arr = [
                ["id", "类路径", "超类", "层级"],
                ["id", "classpath", "superclass", "layer", "canClose"],
                [PanelClassConfig.ID_CreateRolePanel, "CreateRolePanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_ServerPanel, "ServerPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_LoginInputPanel, "LoginInputPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_SelectServerPanel, "SelectServerPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_MissionPanel, "MissionPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_BagPanel, "BagPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_WuHunPanel, "WuHunPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_HideWeaponPanel, "WeaponPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_PvpMatchPanel, "PvpMatchPanel", "IPanel", game.PanelLayer.CENTER, 1],
                [PanelClassConfig.ID_MainUiPanel, "MainUIPanel", "IPanel", game.PanelLayer.MAIN_UI, 0],
                [PanelClassConfig.ID_LoadPanel, "LoadPanel", "IPanel", game.PanelLayer.LOADING, 0],
                [PanelClassConfig.ID_GuidePanel, "GuidePanel", "IPanel", game.PanelLayer.GUIDE, 0],
                [PanelClassConfig.ID_WelcomePanel, "WelcomPanel", "IPanel", game.PanelLayer.GUIDE, 0],
                [PanelClassConfig.ID_SkillVmcPanel, "SkillVmcPanel", "IPanel", game.PanelLayer.BOTTOM, 0],
                [PanelClassConfig.ID_TipsPanel, "ItemTipsPanel", "IPanel", game.PanelLayer.Dialog, 1],
                [PanelClassConfig.ID_ResultPanel, "MissonResultPanel", "IPanel", game.PanelLayer.CENTER, 1],
            ];
            return arr;
        };
        return PanelClassConfig;
    }());
    /**创角界面 */
    PanelClassConfig.ID_CreateRolePanel = 1;
    /**选区开始游戏界面 */
    PanelClassConfig.ID_ServerPanel = 2;
    /**登录界面 */
    PanelClassConfig.ID_LoginInputPanel = 3;
    /**选区弹框界面 */
    PanelClassConfig.ID_SelectServerPanel = 5;
    /**主界面ui界面 */
    PanelClassConfig.ID_MainUiPanel = 6;
    /**背包界面 */
    PanelClassConfig.ID_BagPanel = 7;
    /**武魂真身界面 */
    PanelClassConfig.ID_WuHunPanel = 8;
    /**暗器界面 */
    PanelClassConfig.ID_HideWeaponPanel = 9;
    /**斗魂场界面 */
    PanelClassConfig.ID_PvpMatchPanel = 10;
    /**关卡界面 */
    PanelClassConfig.ID_MissionPanel = 11;
    /**loading界面 */
    PanelClassConfig.ID_LoadPanel = 12;
    /**guide界面 */
    PanelClassConfig.ID_GuidePanel = 13;
    PanelClassConfig.ID_WelcomePanel = 14;
    PanelClassConfig.ID_SkillVmcPanel = 15;
    PanelClassConfig.ID_TipsPanel = 16;
    PanelClassConfig.ID_ResultPanel = 17;
    game.PanelClassConfig = PanelClassConfig;
    __reflect(PanelClassConfig.prototype, "game.PanelClassConfig");
})(game || (game = {}));
//# sourceMappingURL=PanelClassConfig.js.map