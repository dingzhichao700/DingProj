var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var JobNameAction = (function (_super) {
        __extends(JobNameAction, _super);
        function JobNameAction() {
            return _super.call(this) || this;
        }
        // public static getInstance(): JobNameAction {
        // 	let self = this;
        // 	if (!self._instance) {
        // 		self._instance = new JobNameAction();
        // 	}
        // 	return self._instance;
        // }
        JobNameAction.prototype.initNameConfig = function () {
            var self = this;
            var randomNameArr;
            randomNameArr = game.RandomNameTable.getDataVec();
            var i = 0;
            var len = randomNameArr.length;
            for (i = 0; i < len; i++) {
                if (randomNameArr[i].type == 1) {
                    self.firstNameArr.push(randomNameArr[i].name);
                }
                else if (randomNameArr[i].type == 2) {
                    self.boyNameArr.push(randomNameArr[i].name);
                }
                else {
                    self.girlNameArr.push(randomNameArr[i].name);
                }
            }
            self.firstNameLen = self.firstNameArr.length;
            self.boyNameLen = self.boyNameArr.length;
            self.girlNameLen = self.girlNameArr.length;
        };
        Object.defineProperty(JobNameAction.prototype, "firtName", {
            /**随机一个姓 */
            get: function () {
                var self = this;
                if (!self.firstNameArr) {
                    self.initNameConfig();
                }
                var index = Math.round(Math.random() * self.firstNameLen);
                if (index < 0 || index >= self.firstNameLen) {
                    index = Math.round(Math.random() * self.firstNameLen);
                }
                return self.firstNameArr[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JobNameAction.prototype, "boyName", {
            /**随机一个男名 */
            get: function () {
                var self = this;
                if (!self.boyNameArr) {
                    self.initNameConfig();
                }
                var index = Math.round(Math.random() * self.boyNameLen);
                if (index < 0 || index >= self.boyNameLen) {
                    index = Math.round(Math.random() * self.boyNameLen);
                }
                return self.boyNameArr[index];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(JobNameAction.prototype, "girlName", {
            /**随机一个女名 */
            get: function () {
                var self = this;
                if (!self.girlNameArr) {
                    self.initNameConfig();
                }
                var index = Math.round(Math.random() * self.girlNameLen);
                if (index < 0 || index >= self.girlNameLen) {
                    index = Math.round(Math.random() * self.girlNameLen);
                }
                return self.girlNameArr[index];
            },
            enumerable: true,
            configurable: true
        });
        /**获取一个随机姓名 */
        JobNameAction.prototype.getRandomName = function (sex) {
            var self = this;
            if (sex == 1) {
                return self.firtName + self.boyName;
            }
            else {
                return self.firtName + self.girlName;
            }
        };
        JobNameAction.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.firstNameArr) {
                self.firstNameArr.length = 0;
                self.firstNameArr = null;
            }
            if (self.boyNameArr) {
                self.boyNameArr.length = 0;
                self.boyNameArr = null;
            }
            if (self.girlNameArr) {
                self.girlNameArr.length = 0;
                self.girlNameArr = null;
            }
        };
        return JobNameAction;
    }(DLG.BaseAction));
    game.JobNameAction = JobNameAction;
    __reflect(JobNameAction.prototype, "game.JobNameAction");
})(game || (game = {}));
//# sourceMappingURL=JobNameAction.js.map