
module egret {
    export class StoryControl {

        private _curMission:number;
        private _index:number;
        private _talkView: StoryTalkView; 
        private _missionView: StoryMissionView; 
        
        public static STORY_TITLE:Array<string> = [
            "寻找城中避难的树精，打探城外概况",
            "召集人马，前往山林，肃清山贼",
            "向树精禀告家园收复的消息",
            "提升技能等级，获得强力效果",
            "寻找避难的树精，请教斗罗之路的开启",
            "与树精告别，进入斗罗之路",
            "询问树精其他提升实力的途径",
            "使用斗罗之路宝物，稳固自身实力"
        ];

        private static _instance: StoryControl;

        public static getInstance(): StoryControl {
            if(!StoryControl._instance) {
                StoryControl._instance = new StoryControl();
            }
            return StoryControl._instance;
        }
        
        public constructor() {
            this._curMission = 1;
            this._index = 0;
        }
        
        public addIndex():void {
            this._index++;
            MainControl.getInstance().updateMainView();
            MainControl.getInstance().showStory(true);
        }
        
        public goNextStory(): void {
            MainControl.getInstance().showStory(false);
            switch(this.index){
                case 0://主城，走向npc(去野外)
                    RoleManager.getInstance().moveTo3(450,1050);
                    TimerManager.getInstance().addExecute(this.openTalk,this,1000,[],1);
                    break;
                case 1://主城，走向传送阵
                    RoleManager.getInstance().moveTo3(650,520);
                    TimerManager.getInstance().addExecute(function(): void {
                        dataManager().sceneData.sceneType = SceneType.NORMAL_COPY; 
                        globalUpdateWindows([UpdateType.CHANGE_COPY]);
                        MainControl.getInstance().showMission();
                    },this,1500,[],1);
                    break;
                case 2://主城，已杀完怪，向树精汇报
                    RoleManager.getInstance().moveTo3(450,1050);
                    TimerManager.getInstance().addExecute(this.openTalk,this,1000,[],1);
                    break;
                case 3://打开技能界面，升级
                    SkillControl.getInstance().openskillView();
                    this._curMission++;
                    if(this._curMission > 9){
                        this._curMission = 0;
                    }
                    this.addIndex();
                    break;
                case 4://主城，走向npc(打开斗罗)
                    RoleManager.getInstance().moveTo3(450,1050);
                    TimerManager.getInstance().addExecute(this.openTalk,this,1500,[],1);
                    break;
                case 5://打开斗罗
                    SoulRoadControl.getInstance().openSoulRoad();
                    break;
                case 6://通过斗罗，向树精汇报
                    RoleManager.getInstance().moveTo3(450,1050);
                    TimerManager.getInstance().addExecute(this.openTalk,this,1000,[],1);
                    break;
                case 7://打开强化装备，索引归零
                    EquipControl.getInstance().openStrengthView();
                    this._index = 0;
                    MainControl.getInstance().showStory(true);
                    break;
            }
            MainControl.getInstance().updateMainView();
        }
        
        public get index():number {
            return this._index;
        }
        
        public get curMission():number {
            return this._curMission;
        }
        
        /**当前剧情标题*/
        public getCurTitle():string {
            return StoryControl.STORY_TITLE[this.index];
        } 
        
        public openTalk():void {
            if(!this._talkView){
                this._talkView = new StoryTalkView();
            }
            this._talkView.open();
        }
        
        public openMission(): void {
            if(!this._missionView) {
                this._missionView = new StoryMissionView();
            }
            this._missionView.open();
        }
        
    }
}
