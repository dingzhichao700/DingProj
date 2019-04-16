var egret;
(function (egret) {
    var StoryControl = (function () {
        function StoryControl() {
            this._curMission = 1;
            this._index = 0;
        }
        var __egretProto__ = StoryControl.prototype;
        StoryControl.getInstance = function () {
            if (!StoryControl._instance) {
                StoryControl._instance = new StoryControl();
            }
            return StoryControl._instance;
        };
        __egretProto__.addIndex = function () {
            this._index++;
            egret.MainControl.getInstance().updateMainView();
            egret.MainControl.getInstance().showStory(true);
        };
        __egretProto__.goNextStory = function () {
            egret.MainControl.getInstance().showStory(false);
            switch (this.index) {
                case 0:
                    egret.RoleManager.getInstance().moveTo3(450, 1050);
                    egret.TimerManager.getInstance().addExecute(this.openTalk, this, 1000, [], 1);
                    break;
                case 1:
                    egret.RoleManager.getInstance().moveTo3(650, 650);
                    egret.TimerManager.getInstance().addExecute(function () {
                        egret.dataManager().sceneData.sceneType = egret.SceneType.NORMAL_COPY;
                        egret.globalUpdateWindows([egret.UpdateType.CHANGE_COPY]);
                        egret.MainControl.getInstance().showMission();
                    }, this, 1500, [], 1);
                    break;
                case 2:
                    egret.RoleManager.getInstance().moveTo3(450, 1050);
                    egret.TimerManager.getInstance().addExecute(this.openTalk, this, 1000, [], 1);
                    break;
                case 3:
                    egret.SkillControl.getInstance().openskillView();
                    this._curMission++;
                    if (this._curMission > 9) {
                        this._curMission = 0;
                    }
                    this.addIndex();
                    break;
                case 4:
                    egret.RoleManager.getInstance().moveTo3(450, 1050);
                    egret.TimerManager.getInstance().addExecute(this.openTalk, this, 1500, [], 1);
                    break;
                case 5:
                    egret.SoulRoadControl.getInstance().openSoulRoad();
                    break;
                case 6:
                    egret.RoleManager.getInstance().moveTo3(450, 1050);
                    egret.TimerManager.getInstance().addExecute(this.openTalk, this, 1000, [], 1);
                    break;
                case 7:
                    egret.EquipControl.getInstance().openStrengthView();
                    this._index = 0;
                    egret.MainControl.getInstance().showStory(true);
                    break;
            }
            egret.MainControl.getInstance().updateMainView();
        };
        Object.defineProperty(__egretProto__, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "curMission", {
            get: function () {
                return this._curMission;
            },
            enumerable: true,
            configurable: true
        });
        /**当前剧情标题*/
        __egretProto__.getCurTitle = function () {
            return StoryControl.STORY_TITLE[this.index];
        };
        __egretProto__.openTalk = function () {
            if (!this._talkView) {
                this._talkView = new egret.StoryTalkView();
            }
            this._talkView.open();
        };
        __egretProto__.openMission = function () {
            if (!this._missionView) {
                this._missionView = new egret.StoryMissionView();
            }
            this._missionView.open();
        };
        StoryControl.STORY_TITLE = [
            "向树精询问城外概况",
            "前往城外，肃清山贼",
            "前往安抚树精",
            "升级技能，提升属性",
            "向树精请教斗罗之路",
            "前往斗罗之路闯关",
            "向树精禀报战果",
            "强化装备，提升属性"
        ];
        return StoryControl;
    })();
    egret.StoryControl = StoryControl;
    StoryControl.prototype.__class__ = "egret.StoryControl";
})(egret || (egret = {}));
//# sourceMappingURL=StoryControl.js.map