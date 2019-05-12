declare function showfps(value: boolean)

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    // private loadingView: LoadingUI;
    private isThemeLoadEnd: boolean = false;
    private isResourceLoadEnd: boolean = false;
    private isPreLoadEnd: boolean = false;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        let self = this;
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        RES.setMaxLoadingThread(5);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onPreLoadComplete, self);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onPreLoadError, self);
        RES.loadGroup('preload');

        this.stage.addEventListener(egret.Event.RESIZE, this.onResizeHandler, this);
    }
    private onResizeHandler(): void {
        var contentW: number = ApplicationManager.CONTENT_W; //游戏预设宽
        var contentH: number = ApplicationManager.CONTENT_H;//游戏预设高
        var windowW: number = document.documentElement.clientWidth; //窗口实际宽
        var windowH: number = document.documentElement.clientHeight;//窗口实际高
        var ratioContent: number = contentH / contentW;
        var ratioWindow: number = windowH / windowW;

        var scale: number;
        if (ratioWindow >= ratioContent) {
            scale = windowW / contentW;
        } else {
            scale = windowH / contentH;
        }
        ApplicationManager.globalScale = scale;

        if (ApplicationManager.topStage) {  //设置游戏舞台宽高 和缩放
            ApplicationManager.topStage.scaleX = ApplicationManager.topStage.scaleY = scale;
            ApplicationManager.topStage.x = (windowW - contentW * scale) / 2;
            ApplicationManager.topStage.y = (windowH - contentH * scale) / 2;
        }

    }

    private onPreLoadComplete(event: RES.ResourceEvent): void {
        let self = this;
        if (event.groupName == 'preload') {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, self.onPreLoadComplete, self);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, self.onPreLoadError, self);

            self.isPreLoadEnd = true;
            self.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onPreLoadError(event: RES.ResourceEvent): void {
        sayError("Group:" + event.groupName + " has failed to load");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        let self = this;
        self.isResourceLoadEnd = true;
        self.startCreateScene();
    }

    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        let self = this;
        self.isThemeLoadEnd = true;
        self.startCreateScene();

    }
    protected analysis(): void {
        //这里解析js里读过来的数据
    }

    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        let self = this;
        if (self.isThemeLoadEnd == false || self.isResourceLoadEnd == false || self.isPreLoadEnd == false) {
            return;
        }


        //grim this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;

        self.analysis();
        DLG.DLGCore.init(self.stage);
        // let loadMainAction: LoadMainResAction = DLG.FactoryUtils.getClass(LoadMainResAction);
        // loadMainAction.onExecute(2);


        let gamemain: game.GameMain = new game.GameMain();
        // self.addChild(gamemain);

        ApplicationManager.topStage = new egret.Sprite();
        self.addChild(ApplicationManager.topStage);
        ApplicationManager.topStage.addChild(gamemain);

        self.onResizeHandler();
        let action: game.ConnectAction = DLG.FactoryUtils.getClass(game.ConnectAction);
        action.onExecute(false);
        if (DEBUG) {
            DLG.DLGCore.event.addEventListener(self, egret.TouchEvent.TOUCH_TAP, self, self.showAndHideFps);
            showfps(self.isShowFps);
        }
    }

    private isShowFps: boolean = false;
    private lastClickTime: number
    private showAndHideFps(): void {
        let self = this;
        if (self.lastClickTime) {
            if (egret.getTimer() - self.lastClickTime < 300) {
                self.isShowFps = !self.isShowFps;
                showfps(this.isShowFps);
            }
        }
        self.lastClickTime = egret.getTimer();

    }
}
