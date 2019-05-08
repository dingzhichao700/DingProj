var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var MainUIPanel = (function (_super) {
        __extends(MainUIPanel, _super);
        function MainUIPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        MainUIPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new MainUIView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        MainUIPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.mainUiArr = [
                { "tabId": game.PanelClassConfig.ID_MissionPanel, "img": "menubar_json.menubar_fight_png" },
                { "tabId": game.PanelClassConfig.ID_WuHunPanel, "img": "menubar_json.menubar_wuHun_png_png" },
                { "tabId": game.PanelClassConfig.ID_HideWeaponPanel, "img": "menubar_json.menubar_weapon_png" },
                { "tabId": game.PanelClassConfig.ID_PvpMatchPanel, "img": "menubar_json.menubar_pvp_png" },
                { "tabId": game.PanelClassConfig.ID_BagPanel, "img": "menubar_json.menubar_bag_png" }
            ];
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = -3;
            tLayout.verticalGap = 0;
            tLayout.requestedRowCount = 1;
            tLayout.requestedColumnCount = 5;
            self.main.mainList.layout = tLayout;
            self.main.mainList.itemRenderer = game.MainUiItem;
            self.main.mainList.dataProvider = new eui.ArrayCollection(self.mainUiArr);
            this.onResizeHandler();
            this.stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
            // self.main.head_icom_img.source = "wuHun_head_4_png";
            // self.main.head_title_img.source = "wuHun_head_title_1_png";
        };
        MainUIPanel.prototype.onResizeHandler = function () {
            var contentH = ApplicationManager.CONTENT_H;
            var windowH = document.documentElement.clientHeight;
            var globalScale = ApplicationManager.globalScale;
            this.main.top_box.y = -(windowH - contentH * globalScale) / (2 * globalScale);
            this.main.bottom_box.y = (windowH + contentH * globalScale) / (2 * globalScale) - 107;
            // var contenW: number = ApplicationManager.CONTENT_W;
            // var windoW: number = document.documentElement.clientWidth;
            // var globalScale: number = ApplicationManager.globalScale;
            // this.main.top_left.x = -(windoW - contenW * globalScale) / (2 * globalScale);
            // this.main.top_right.x = (windoW + contenW * globalScale) / (2 * globalScale);
        };
        MainUIPanel.prototype.onRefresh = function () {
            if (game.MainUIManager.getInstance().sceneId <= 0)
                return;
            var missionCfg = game.SceneTable.getCfgById(game.MainUIManager.getInstance().sceneId);
            if (!missionCfg)
                return;
            this.main.title_txt.text = missionCfg.name;
            this.main.des_txt.text = missionCfg.des;
        };
        MainUIPanel.prototype.onDestroy = function () {
            this.stage.removeEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return MainUIPanel;
    }(DLG.VPanel));
    game.MainUIPanel = MainUIPanel;
    __reflect(MainUIPanel.prototype, "game.MainUIPanel");
})(game || (game = {}));
//# sourceMappingURL=MainUIPanel.js.map