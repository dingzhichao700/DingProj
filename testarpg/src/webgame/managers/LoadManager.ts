module egret {
    export class LoadManager {
        
        private loadList:Array<any> = null;
        private loadIndex:number = 0;
        private _handler: Function;
        
        private static _instance: LoadManager = null;
        
        public constructor() {
        }

        public static getInstance(): LoadManager {
            return LoadManager._instance || (LoadManager._instance = new LoadManager());
        }
        
        public loadResList(groupList: Array<any>,handler: Function): void {
            this.loadList = groupList;
            this.loadIndex = 0;
            this._handler = handler;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.loadGroup(this.loadList[0]);
        }
        
        /**资源组加载完成*/
        private onResourceLoadComplete(event: RES.ResourceEvent): void {
            if(this.loadIndex < this.loadList.length - 1) {
                this.loadIndex++;
                RES.loadGroup(this.loadList[this.loadIndex]);
            } else {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
                this._handler();
            }
        }
    
        /**资源组加载出错*/
        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " 中有加载失败的项目");
            this.onResourceLoadComplete(event);
        }
    
        /**preload资源组加载进度*/
        private onResourceProgress(event: RES.ResourceEvent): void {
            if(event.groupName == "main") {
//            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
            }
            console.info("--------------onResourceProgress***********321----------------------");
        }
        
    }
}
