var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    var ClockData = (function () {
        function ClockData() {
        }
        ClockData.prototype.clear = function () {
            var self = this;
            self.id = undefined;
            self.doTimes = undefined;
            self.time = undefined;
            self.callBack = undefined;
            self.callBackObj = undefined;
            self.callBackParame = undefined;
            self.nextTime = undefined;
            self.endTime = undefined;
            self.fillFrame = undefined;
            self.isApply = undefined;
        };
        return ClockData;
    }());
    ClockData.ID = 1;
    DLG.ClockData = ClockData;
    __reflect(ClockData.prototype, "DLG.ClockData");
    var ClockManager = (function (_super) {
        __extends(ClockManager, _super);
        function ClockManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            var date = new Date();
            self.setCurrentTime(date.getTime());
            date = null;
            self.clockVec = [];
            self.clockFillFrameVec = [];
            self.clockDataPoolVec = [];
            DLG.DLGCore.event.addEventListener(DLG.DLGCore.stage, egret.Event.ENTER_FRAME, self, self.timeHandler, false);
            return _this;
        }
        ClockManager.prototype.timeHandler = function (event) {
            var self = this;
            if (!self._currentTime) {
                return;
            }
            var gt = egret.getTimer();
            var ct = self._currentTime + gt - self._startTime;
            self._realTime = ct;
            var i = 0;
            var arr = self.clockVec;
            var len = arr.length;
            var vo;
            for (i = 0; i < len; i++) {
                vo = arr[i];
                if (!vo) {
                    break;
                }
                if (vo.nextTime > ct) {
                    continue;
                }
                if (vo.endTime == -1) {
                    var oldt = vo.nextTime;
                    vo.nextTime = ct + vo.time;
                    if (vo.isApply) {
                        vo.callBack.apply(vo.callBackObj, vo.callBackParame);
                    }
                    else {
                        vo.callBack.call(vo.callBackObj, vo.callBackParame);
                    }
                }
                else if (ct >= vo.endTime && vo.doTimes > 0) {
                    // let times = Math.floor(ct - vo.doTimes);
                    // vo.doTimes -= times;
                    vo.nextTime = ct + vo.time;
                    vo.doTimes--;
                    if (vo.isApply) {
                        vo.callBack.apply(vo.callBackObj, vo.callBackParame);
                    }
                    else {
                        vo.callBack.call(vo.callBackObj, vo.callBackParame);
                    }
                    if (vo.doTimes <= 0) {
                        // debug("删除时间对象",vo.id)
                        arr.splice(i, 1);
                        vo.clear();
                        self.clockDataPoolVec.push(vo);
                        break;
                    }
                }
            }
            ///需要补帧数处理的方法
            arr = self.clockFillFrameVec;
            len = arr.length;
            for (i = 0; i < len; i++) {
                vo = arr[i];
                if (!vo) {
                    break;
                }
                if (ct >= vo.nextTime && ct <= vo.endTime) {
                    if (vo.doTimes > 0) {
                        var times = Math.floor(ct - vo.doTimes);
                        vo.doTimes -= times;
                        vo.nextTime = ct + vo.time;
                        while (times > 0) {
                            if (vo.isApply) {
                                vo.callBack.apply(vo.callBackObj, vo.callBackParame);
                            }
                            else {
                                vo.callBack.call(vo.callBackObj, vo.callBackParame);
                            }
                            times--;
                        }
                        if (vo.doTimes <= 0) {
                            arr.splice(i, 1);
                            vo.clear();
                            self.clockDataPoolVec.push(vo);
                            break;
                        }
                    }
                }
                else if (ct >= vo.nextTime && vo.endTime == -1) {
                    if (vo.endTime == -1) {
                        var times = Math.floor(ct - vo.doTimes);
                        vo.nextTime = ct + vo.time;
                        while (times > 0) {
                            if (vo.isApply) {
                                vo.callBack.apply(vo.callBackObj, vo.callBackParame);
                            }
                            else {
                                vo.callBack.call(vo.callBackObj, vo.callBackParame);
                            }
                            times--;
                        }
                    }
                }
            }
        };
        ClockManager.prototype.addTime = function (time, doTimes, m_callBack, m_callBackObj, m_callBackParame, isApply, fillFrame) {
            var self = this;
            if (!self._currentTime) {
                throw new Error("clock里的currentTime还没有设置");
            }
            var vo;
            if (self.clockDataPoolVec.length > 0) {
                vo = self.clockDataPoolVec.shift();
            }
            else {
                vo = new ClockData();
            }
            //= new ClockData();
            vo.id = ClockData.ID;
            // debug("生成时间对象",vo.id)
            if (vo.id == 0) {
                throw new Error("clockdata_idID值出错");
            }
            ClockData.ID++;
            if (ClockData.ID >= Number.MAX_VALUE) {
                ClockData.ID = Number.MIN_VALUE;
            }
            vo.time = time;
            vo.doTimes = doTimes;
            vo.callBack = m_callBack;
            vo.callBackObj = m_callBackObj;
            vo.callBackParame = m_callBackParame;
            vo.isApply = isApply;
            vo.nextTime = self.getTime() + vo.time;
            if (vo.doTimes != 0) {
                vo.endTime = self.getTime() + (vo.time * vo.doTimes);
            }
            else {
                vo.endTime = -1;
            }
            vo.fillFrame = fillFrame ? fillFrame : false;
            if (vo.fillFrame == false) {
                self.clockVec.push(vo);
            }
            else {
                self.clockFillFrameVec.push(vo);
            }
            return vo.id;
        };
        ClockManager.prototype.removeTime = function (id, fillFrame) {
            var self = this;
            if (!self._currentTime) {
                throw new Error("clock里的currentTime还没有设置");
            }
            if (fillFrame == false || fillFrame == undefined) {
                var arr = self.clockVec;
                var i = 0;
                var len = arr.length;
                for (i = 0; i < len; i++) {
                    var vo = void 0;
                    vo = arr[i];
                    if (vo.id == id) {
                        // debug("----删除时间对象",vo.id)
                        arr.splice(i, 1);
                        vo.clear();
                        self.clockDataPoolVec.push(vo);
                        return;
                    }
                }
            }
            if (fillFrame == true || fillFrame == undefined) {
                var arr = self.clockFillFrameVec;
                var i = 0;
                var len = arr.length;
                for (i = 0; i < len; i++) {
                    var vo = void 0;
                    vo = arr[i];
                    if (vo.id == id) {
                        arr.splice(i, 1);
                        vo.clear();
                        self.clockDataPoolVec.push(vo);
                        return;
                    }
                }
            }
        };
        /**设置时间毫秒数 */
        ClockManager.prototype.setCurrentTime = function (value) {
            var self = this;
            self._currentTime = value;
            self._startTime = egret.getTimer();
            self._realTime = self._currentTime;
        };
        ClockManager.prototype.getTime = function () {
            return this._realTime;
        };
        return ClockManager;
    }(egret.EventDispatcher));
    DLG.ClockManager = ClockManager;
    __reflect(ClockManager.prototype, "DLG.ClockManager");
})(DLG || (DLG = {}));
//# sourceMappingURL=ClockManager.js.map