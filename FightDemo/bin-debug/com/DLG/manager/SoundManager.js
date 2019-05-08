var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var SoundManager = (function () {
        function SoundManager() {
            this.soundLoad = new RES.SoundAnalyzer();
            this.soundList = {};
            this.lastClickTime = 0;
        }
        SoundManager.prototype.initSoundList = function () {
            var soundArray = RES.getGroupByName("Sound");
            for (var i = 0; i < soundArray.length; i++) {
                var soundItem = soundArray[i];
                var url = soundItem.url;
                if (url.indexOf("/sound/Effect/") != -1) {
                    soundItem["soundType"] = "effect";
                }
                else if (url.indexOf("/sound/Music/") != -1) {
                    soundItem["soundType"] = "music";
                }
                this.soundList[soundItem.name] = soundItem;
            }
            RES.destroyRes("Sound");
        };
        SoundManager.prototype.loadSound = function (soundName, play, startTime, loops, callBack, target) {
            if (play === void 0) { play = false; }
            if (this.isLoad(soundName)) {
                if (play) {
                    this.play(soundName, startTime, loops);
                }
                if (callBack) {
                    if (target) {
                        callBack.call(target);
                    }
                    else {
                        callBack();
                    }
                }
                return;
            }
            if (!this.soundList[soundName + "_mp3"]) {
                sayError("unfind " + soundName + "_mp3");
                return;
            }
            // var soundItem = this.soundList[soundName + "_mp3"];
            // if (soundItem.soundType === egret.Sound.EFFECT
            // 	|| soundItem.soundType === egret.Sound.MUSIC ) {
            // 	return;
            // }
            this.soundLoad.loadFile(this.soundList[soundName + "_mp3"], function () {
                var sound = this.soundLoad.getRes(soundName + "_mp3");
                this.soundList[soundName + "_mp3"]["sound"] = sound;
                if (play) {
                    this.play(soundName, startTime, loops);
                }
                if (callBack) {
                    if (target) {
                        callBack.call(target);
                    }
                    else {
                        callBack();
                    }
                }
            }, this);
        };
        SoundManager.prototype.isLoad = function (soundName) {
            !this.soundLoad.hasRes(soundName + "_mp3") && sayError(soundName + " unload!");
            return this.soundLoad.hasRes(soundName + "_mp3");
        };
        SoundManager.prototype.play = function (soundName, startTime, loops) {
            if (soundName === void 0) { soundName = SoundManager.curMusic; }
            if (!this.isLoad(soundName)) {
                // this.loadSound(soundName);
                return;
            }
            var soundItem = this.soundList[soundName + "_mp3"];
            // if ( soundName == "BtnClick" ) {
            // 	var nowTime = egret.getTimer();
            // 	if (nowTime - this.lastClickTime < 500) {
            // 		sayError("你麻痹，点太快了");
            // 		return;
            // 	}
            // 	this.lastClickTime = nowTime;
            // }
            if (!soundItem["sound"])
                return;
            if (soundItem.soundType === egret.Sound.MUSIC) {
                SoundManager.curMusic = soundName;
            }
            // if (soundItem.soundType === egret.Sound.EFFECT
            // 	|| soundItem.soundType === egret.Sound.MUSIC) {
            // 	return;
            // }
            if (soundItem.soundType === egret.Sound.EFFECT) {
                if (loops == undefined) {
                    loops = 1;
                }
                else {
                    loops = loops;
                }
            }
            soundItem["channel"] = soundItem["sound"].play(startTime, loops);
            soundItem["isPlay"] = true;
            soundItem["loops"] = loops;
        };
        SoundManager.prototype.isPlay = function (soundName) {
            if (soundName === void 0) { soundName = SoundManager.curMusic; }
            if (!this.isLoad(soundName))
                return;
            return this.soundList[soundName + "_mp3"]["isPlay"];
        };
        SoundManager.prototype.stop = function (soundName) {
            if (soundName === void 0) { soundName = SoundManager.curMusic; }
            if (!this.isLoad(soundName))
                return;
            var soundItem = this.soundList[soundName + "_mp3"];
            if (!soundItem["isPlay"])
                return;
            soundItem["channel"].stop();
            soundItem["channel"] = null;
            soundItem["isPlay"] = false;
        };
        SoundManager.prototype.stopAllEffect = function () {
            for (var i in this.soundList) {
                var soundItem = this.soundList[i];
                if (soundItem.sound && soundItem.soundType === egret.Sound.EFFECT) {
                    var soundName = soundItem.name.slice(0, -4);
                    this.stop(soundName);
                }
            }
        };
        SoundManager.prototype.pause = function (soundName) {
            if (soundName === void 0) { soundName = SoundManager.curMusic; }
            if (!this.isLoad(soundName))
                return;
            var soundItem = this.soundList[soundName + "_mp3"];
            if (!soundItem["isPlay"])
                return;
            soundItem["position"] = soundItem["channel"].position;
            this.stop(soundName);
        };
        SoundManager.prototype.resume = function (soundName) {
            if (soundName === void 0) { soundName = SoundManager.curMusic; }
            if (!this.isLoad(soundName))
                return;
            var soundItem = this.soundList[soundName + "_mp3"];
            if (soundItem["isPlay"] || soundItem["isPlay"] === undefined)
                return;
            var loops = soundItem["loops"], position = soundItem["position"];
            this.play(soundName, position, loops);
        };
        SoundManager.prototype.position = function (soundName) {
            if (!this.isLoad(soundName))
                return;
            return this.soundList[soundName + "_mp3"]["channel"].position;
        };
        SoundManager.prototype.setVolume = function (soundName, num) {
            if (!this.isLoad(soundName))
                return;
            this.soundList[soundName + "_mp3"]["channel"].volume = num > 1 ? 1 : num;
        };
        SoundManager.prototype.getVolume = function (soundName) {
            if (!this.isLoad(soundName))
                return;
            return this.soundList[soundName + "_mp3"]["channel"].volume;
        };
        SoundManager.prototype.removeSound = function (soundName) {
            if (!this.isLoad(soundName))
                return;
            var soundItem = this.soundList[soundName + "_mp3"];
            soundItem["sound"].close();
            this.stop(soundName);
            this.soundLoad.destroyRes(soundName + "_mp3");
        };
        return SoundManager;
    }());
    DLG.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "DLG.SoundManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=SoundManager.js.map