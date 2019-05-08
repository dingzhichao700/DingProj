var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 加载进度界面
         * loading process interface
         */
        // private loadingView: LoadingUI;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        _this.isPreLoadEnd = false;
        _this.isShowFps = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var self = this;
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        RES.setMaxLoadingThread(5);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onPreLoadComplete, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onPreLoadError, self);
        RES.loadGroup('preload');
        this.stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
    };
    Main.prototype.onResizeHandler = function () {
        var contentW = ApplicationManager.CONTENT_W; //游戏预设宽
        var contentH = ApplicationManager.CONTENT_H; //游戏预设高
        var windowW = document.documentElement.clientWidth; //窗口实际宽
        var windowH = document.documentElement.clientHeight; //窗口实际高
        var ratioContent = contentH / contentW;
        var ratioWindow = windowH / windowW;
        var scale;
        if (ratioWindow >= ratioContent) {
            scale = windowW / contentW;
        }
        else {
            scale = windowH / contentH;
        }
        ApplicationManager.globalScale = scale;
        if (ApplicationManager.topStage) {
            ApplicationManager.topStage.scaleX = ApplicationManager.topStage.scaleY = scale;
            ApplicationManager.topStage.x = (windowW - contentW * scale) / 2;
            ApplicationManager.topStage.y = (windowH - contentH * scale) / 2;
        }
    };
    Main.prototype.onPreLoadComplete = function (event) {
        var self = this;
        if (event.groupName == 'preload') {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onPreLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onPreLoadError, self);
            self.isPreLoadEnd = true;
            self.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onPreLoadError = function (event) {
        sayError("Group:" + event.groupName + " has failed to load");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var self = this;
        self.isResourceLoadEnd = true;
        self.startCreateScene();
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        var self = this;
        self.isThemeLoadEnd = true;
        self.startCreateScene();
    };
    Main.prototype.analysis = function () {
        //这里解析js里读过来的数据
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        var self = this;
        if (self.isThemeLoadEnd == false || self.isResourceLoadEnd == false || self.isPreLoadEnd == false) {
            return;
        }
        this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        self.analysis();
        DLG.DLGCore.init(self.stage);
        // let loadMainAction: LoadMainResAction = DLG.FactoryUtils.getClass(LoadMainResAction);
        // loadMainAction.onExecute(2);
        var gamemain = new game.GameMain();
        // self.addChild(gamemain);
        ApplicationManager.topStage = new egret.Sprite();
        self.addChild(ApplicationManager.topStage);
        ApplicationManager.topStage.addChild(gamemain);
        self.onResizeHandler();
        var action = DLG.FactoryUtils.getClass(game.ConnectAction);
        action.onExecute(false);
        if (true) {
            DLG.DLGCore.event.addEventListener(self, egret.TouchEvent.TOUCH_TAP, self, self.showAndHideFps);
            showfps(self.isShowFps);
        }
    };
    Main.prototype.showAndHideFps = function () {
        var self = this;
        if (self.lastClickTime) {
            if (egret.getTimer() - self.lastClickTime < 300) {
                self.isShowFps = !self.isShowFps;
                showfps(this.isShowFps);
            }
        }
        self.lastClickTime = egret.getTimer();
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map