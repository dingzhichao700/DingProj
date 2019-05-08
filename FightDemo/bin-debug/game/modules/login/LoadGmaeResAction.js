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
    var LoadMainResAction = (function (_super) {
        __extends(LoadMainResAction, _super);
        // protected RES_CreateRole: string = 'createRole';
        // protected RES_Login: string = 'login';
        function LoadMainResAction() {
            var _this = _super.call(this) || this;
            _this.RES_MAIN = 'main';
            _this.isLoadMain = false;
            return _this;
        }
        LoadMainResAction.prototype.onExecute = function () {
            var self = this;
            // if (type == 1) {
            // 	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onCreateLoadComplete, self);
            // 	RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onCreateLoadError, self);
            // 	// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
            // 	RES.loadGroup(self.RES_Login);
            // } else if (type == 2) {
            if (self.isLoadMain == false) {
                DLG.DLGCore.panel.show(game.PanelClassConfig.ID_LoadPanel);
                var loadPanel = DLG.DLGCore.panel.getPanelById(game.PanelClassConfig.ID_LoadPanel);
                loadPanel.startLoad(0, self.loadPanelOk, self);
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
                // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                RES.loadGroup(self.RES_MAIN);
                DLG.Utils.getZipResByUrl(game.GAME_PATH.ZIP, this.onConfigDataComplete, this, RES.ResourceItem.TYPE_BIN);
            }
            // } else if (type == 3)
            // {
            // 	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
            // 	RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
            // 	// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
            // 	RES.loadGroup(self.RES_CreateRole);
            // }	
        };
        // private onCreateLoadComplete(event: RES.ResourceEvent): void {
        // 	let self = this;
        // 	if (event.groupName == self.RES_Login) {
        // 		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onCreateLoadComplete, self);
        // 		RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onCreateLoadError, self);
        // 		DLG.DLGCore.panel.show(PanelClassConfig.ID_ServerPanel);
        // 	}
        // }
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        // private onCreateLoadError(event: RES.ResourceEvent): void {
        // 	debug("Group:" + event.groupName + " has failed to load");
        // }
        // protected loadGameZip(): void
        // {
        //     DLG.Utils.getZipResByUrl(GAME_PATH.ZIP,this.onConfigDataComplete,this,RES.ResourceItem.TYPE_BIN);
        // }
        LoadMainResAction.prototype.onConfigDataComplete = function (zip) {
            for (var key in zip) {
                if (zip.hasOwnProperty(key)) {
                    var element = zip[key];
                    if (element.name.indexOf('.') != -1) {
                        var _name = element.name.replace('config/', "");
                        _name = _name.replace('.json', "_json");
                        game.CfgData.setDataByUrl(_name, element.asText());
                    }
                }
            }
            game.LoginManager.getInstance().loadZip = true;
            game.LoginManager.getInstance().checkComeInGame();
            this.allOk();
        };
        LoadMainResAction.prototype.onMainLoadComplete = function (event) {
            var self = this;
            if (event.groupName == self.RES_MAIN) {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onMainLoadComplete, self);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onMainLoadError, self);
                // RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, self.onResourceProgress, self);
                game.LoginManager.getInstance().loadMainRes = true;
                game.LoginManager.getInstance().checkComeInGame();
                this.allOk();
            }
        };
        LoadMainResAction.prototype.loadPanelOk = function () {
            game.LoginManager.getInstance().loadPanelShowOk = true;
            this.allOk();
        };
        LoadMainResAction.prototype.allOk = function () {
            if (game.LoginManager.getInstance().loadZip && game.LoginManager.getInstance().loadMainRes && game.LoginManager.getInstance().loadPanelShowOk)
                game.SceneManager.getInstance().loadIngPanelOk();
        };
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        LoadMainResAction.prototype.onMainLoadError = function (event) {
            sayError("Group:" + event.groupName + " has failed to load");
        };
        return LoadMainResAction;
    }(DLG.BaseAction));
    game.LoadMainResAction = LoadMainResAction;
    __reflect(LoadMainResAction.prototype, "game.LoadMainResAction");
})(game || (game = {}));
//# sourceMappingURL=LoadGmaeResAction.js.map