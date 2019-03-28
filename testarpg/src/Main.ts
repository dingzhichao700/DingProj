class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
        
        egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
        
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }
    
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        new egret.ApplicationConfig(this,egret.GameRunner);
    }
    
}