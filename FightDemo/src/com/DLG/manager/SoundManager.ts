
module DLG {
	export class SoundManager {
		public static curMusic: string;

		private soundLoad = new RES.SoundAnalyzer();

		private soundList: Object = {};

		public initSoundList() {
			var soundArray = RES.getGroupByName("Sound");
			for (var i = 0; i < soundArray.length; i++) {
				var soundItem = soundArray[i];
				var url = soundItem.url;
				if (url.indexOf("/sound/Effect/") != -1) {
					soundItem["soundType"] = "effect";
				} else if (url.indexOf("/sound/Music/") != -1) {
					soundItem["soundType"] = "music";
				}
				this.soundList[soundItem.name] = soundItem;
			}
			RES.destroyRes("Sound");
		}

		public loadSound(soundName: string, play: boolean = false, startTime?: number, loops?: number, callBack?: Function, target?: Object) {
			if (this.isLoad(soundName)) {
				if (play) {
					this.play(soundName, startTime, loops);
				}
				if (callBack) {
					if (target) {
						callBack.call(target);
					} else {
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
				var sound: egret.Sound = this.soundLoad.getRes(soundName + "_mp3");
				this.soundList[soundName + "_mp3"]["sound"] = sound;
				if (play) {
					this.play(soundName, startTime, loops);
				}
				if (callBack) {
					if (target) {
						callBack.call(target);
					} else {
						callBack();
					}
				}
			}, this);
		}

		private isLoad(soundName: string) {
			!this.soundLoad.hasRes(soundName + "_mp3") && sayError(soundName + " unload!");
			return this.soundLoad.hasRes(soundName + "_mp3");
		}

		public lastClickTime = 0;

		public play(soundName: string = SoundManager.curMusic, startTime?: number, loops?: number) {

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

			if (!soundItem["sound"]) return;

			if (soundItem.soundType === egret.Sound.MUSIC) {
				SoundManager.curMusic = soundName;
			}

			// if (soundItem.soundType === egret.Sound.EFFECT
			// 	|| soundItem.soundType === egret.Sound.MUSIC) {
			// 	return;
			// }

			if (soundItem.soundType === egret.Sound.EFFECT) {
				if(loops == undefined){
 					loops = 1;
				}else{
					loops = loops;
				}
			}

			soundItem["channel"] = soundItem["sound"].play(startTime, loops);

			soundItem["isPlay"] = true;
			soundItem["loops"] = loops;
		}

		public isPlay(soundName: string = SoundManager.curMusic) {
			if (!this.isLoad(soundName)) return;
			return this.soundList[soundName + "_mp3"]["isPlay"];
		}

		public stop(soundName: string = SoundManager.curMusic) {
			if (!this.isLoad(soundName)) return;
			var soundItem = this.soundList[soundName + "_mp3"];
			if (!soundItem["isPlay"]) return;
			
			soundItem["channel"].stop();
			soundItem["channel"] = null;
			soundItem["isPlay"] = false;
		}

		public stopAllEffect() {
			for (var i in this.soundList) {
				var soundItem = this.soundList[i];
				if (soundItem.sound && soundItem.soundType === egret.Sound.EFFECT) {
					var soundName = soundItem.name.slice(0, -4);
					this.stop(soundName);
				}
			}
		}
		
		public pause(soundName: string = SoundManager.curMusic) {
			if (!this.isLoad(soundName)) return;
			var soundItem = this.soundList[soundName + "_mp3"];
			if (!soundItem["isPlay"]) return;

			soundItem["position"] = soundItem["channel"].position;
			this.stop(soundName);
		}

		public resume(soundName: string = SoundManager.curMusic) {
			if (!this.isLoad(soundName)) return;
			var soundItem = this.soundList[soundName + "_mp3"];
			if (soundItem["isPlay"] || soundItem["isPlay"] === undefined) return;

			var loops = soundItem["loops"], position = soundItem["position"];
			this.play(soundName, position, loops);
		}

		public position(soundName: string) {
			if (!this.isLoad(soundName)) return;
			return this.soundList[soundName + "_mp3"]["channel"].position;
		}

		public setVolume(soundName: string, num: number) {
			if (!this.isLoad(soundName)) return;
			this.soundList[soundName + "_mp3"]["channel"].volume = num > 1 ? 1 : num;
		}

		public getVolume(soundName: string) {
			if (!this.isLoad(soundName)) return;
			return this.soundList[soundName + "_mp3"]["channel"].volume;
		}

		public removeSound(soundName: string) {
			if (!this.isLoad(soundName)) return;
			var soundItem = this.soundList[soundName + "_mp3"];
			soundItem["sound"].close();
			this.stop(soundName);
			this.soundLoad.destroyRes(soundName + "_mp3");
		}
    }
}