module egret{
    export class ButtonWindow extends Window{
        public constructor(){
            super(ApplicationLayerType.UI);
        }
        /**
         * 窗口打开时自动调用的初始化 方法
         *
         */
        public initWindow(){
            var labels:Array<string> = ["攻打下个副本","攻打Boss","进入竞技场","战士换装"];//
            for(var i in labels){
                var textField:TextField = new TextField();
                textField.y = 30 + i * 50;
                textField.name = i;
                textField.text = labels[i];
                //textField.size = 20;
                textField.touchEnabled = true;
                textField.cacheAsBitmap = true;
                //textField.background = true;
                //textField.
                this.addChild(textField);
            }

            this.align = AlignType.TOP_RIGHT;

            this.recall();
        }
        //
        private touchTapHandler(e:TouchEvent):void{
            var index:number = Number(e.target.name);
            switch (index){
                case 0:
                    globalUpdateWindows([UpdateType.CHANGE_COPY]);
                    break;
                case 1:
                    dataManager().sceneData.sceneType = SceneType.BOSS_COPY;
                    globalUpdateWindows([UpdateType.CHANGE_COPY]);
                    break;
                //增加法师
                case 2:
                //增加弓箭手
                case 3:
                    if(RoleManager.getInstance().roles.length < 4){
                        RoleManager.getInstance().addRole(index);
                        //globalUpdateWindows([UpdateType.CHANGE_COPY]);
                    }
                    break;
                //竞技场
                case 4:
                    dataManager().sceneData.sceneType = SceneType.ARENA;
                    globalUpdateWindows([UpdateType.CHANGE_COPY]);
                    break;
                //战士换装
                case 5:
                    var item:SceneElementDataItem = dataManager().roleSceneData.getRoleList()[0];
                    var level:number = (<ScenePlayerVo>item.vo).wingLevel + 1;
                    if(level > 2){
                        level = 1;
                    }

                    dataManager().sceneData.updateSceneElementVo(item,["wingLevel"],[level]);
                    RoleManager.getInstance().updateAvatar(item.vo.id);
                    break;
                //升级
                case 6:
                    RoleManager.getInstance().role.levelUpEffect();
                    break;
            }
        }
        /**
         * 窗口已实例化，重新打开时，通常用于添加事件，重置显示等
         *
         */
        public recall():void {
            super.recall();
        }
        /**
         * 添加窗口事件，此方法只在recall()中自动调用，其它地方无调用，需要时手动调用
         *
         */
        public addEvents():void {
            super.addEvents();

            this.addEventListener(TouchEvent.TOUCH_TAP,this.touchTapHandler,this);
        }
        /**
         * 全局更新时调用，此方法重写时，不用调用super.globalUpdate()
         * @param updateType:int 更新类型
         * @param args
         * @see #ApplicationManager.globalUpdate()
         *
         */
        public globalUpdate(updateType:number, ...args):void {

        }
        /**
         * 自身更新时调用，此方法重写时，不用调用super.update()
         * @param args
         * @see #ApplicationManager.update()
         */
        public update(...args):void {
            
        }
        /**
         * 窗口移除时，主要用于清除事件等
         *
         */
        public remove():void {
            super.remove();
        }

        /**
         * 销毁处理
         */
        public destroy():void {
            if(this._isDestroy) return;

            super.destroy();
        }
    }
}
