var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
function debug(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (true) {
        if (optionalParams) {
            // if (NativeHelper.isNative()) {
            //     egret.log("nav-sdk-DLG:" + message, ...optionalParams);
            // } else {
            console.log.apply(console, [message].concat(optionalParams));
        }
        else {
            console.log(message);
        }
    }
}
function sayError(message) {
    var optionalParams = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        optionalParams[_i - 1] = arguments[_i];
    }
    if (true) {
        if (optionalParams)
            console.error.apply(console, [message].concat(optionalParams));
        else
            console.log(message);
    }
}
var DLG;
(function (DLG) {
    var DLGCore = (function () {
        function DLGCore() {
        }
        DLGCore.init = function (stage) {
            var self = this;
            self.stage = stage;
            self.event = new DLG.EventManager();
            // self.httpClient = new HttpClient('');
            self.sound = new DLG.SoundManager();
            self.sound.initSoundList();
            // self.animate = new AnimateTimer();
            self.lan = new DLG.LanguageManager();
            self.socket = new DLG.Socket;
            self.panel = new DLG.PanelManager();
            self.clock = new DLG.ClockManager();
            self.loader = new DLG.LoadManager();
        };
        return DLGCore;
    }());
    DLG.DLGCore = DLGCore;
    __reflect(DLGCore.prototype, "DLG.DLGCore");
})(DLG || (DLG = {}));
//# sourceMappingURL=DLGCore.js.map