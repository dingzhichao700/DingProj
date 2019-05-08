var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var KeyBoardManager = (function () {
        function KeyBoardManager() {
            this.isListening = false;
            // this.list = {};  
            var self = this;
            self.list = [];
        }
        KeyBoardManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new KeyBoardManager();
            }
            return self._instance;
        };
        KeyBoardManager.prototype.onKeyDown = function (evt) {
            // console.log("evt.keyCode:" + evt.keyCode);  
            var self = KeyBoardManager.getInstance();
            var target;
            var i = 0;
            var len = self.list.length;
            for (i = 0; i < len; i++) {
                var vo = self.list[i];
                if (vo.keyCode == evt.keyCode) {
                    vo.callback.call(vo.target, evt);
                }
            }
        };
        /**
         * 注册监听
         * @param callback 回调方法
         * @param target
         */
        KeyBoardManager.prototype.addListener = function (callback, target, keyCode) {
            var temp = egret.getQualifiedClassName(target);
            var vo = new KeyVo(temp, target, callback, keyCode);
            var self = KeyBoardManager.getInstance();
            self.list.push(vo);
            if (self.isListening == false) {
                self.isListening = true;
                document.addEventListener("keydown", self.onKeyDown);
            }
        };
        return KeyBoardManager;
    }());
    DLG.KeyBoardManager = KeyBoardManager;
    __reflect(KeyBoardManager.prototype, "DLG.KeyBoardManager");
    var KeyVo = (function () {
        function KeyVo(name, tar, call, keyCode) {
            this.name = "";
            this.name = name;
            this.target = tar;
            this.callback = call;
            this.keyCode = keyCode;
        }
        return KeyVo;
    }());
    __reflect(KeyVo.prototype, "KeyVo");
})(DLG || (DLG = {}));
//# sourceMappingURL=KeyBoardManager.js.map