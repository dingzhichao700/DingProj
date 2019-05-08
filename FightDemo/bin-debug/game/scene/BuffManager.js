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
    var BuffManager = (function (_super) {
        __extends(BuffManager, _super);
        function BuffManager() {
            var _this = _super.call(this) || this;
            var self = _this;
            self.createClock();
            self.buffTargets = [];
            self.m_clock.addTime(1000, 1, self.onCheckBuffHandler, self, null);
            return _this;
        }
        BuffManager.getInstance = function () {
            var self = this;
            if (!self._instance) {
                self._instance = new BuffManager();
            }
            return self._instance;
        };
        BuffManager.prototype.onCheckBuffHandler = function () {
            var self = this;
            var len;
            var i;
            len = self.buffTargets.length;
            var targetData;
            for (i = 0; i < len;) {
                targetData = self.buffTargets[i];
                if (!targetData.buffs) {
                    //如果怪物已经死亡，清理掉
                    self.buffTargets.splice(i, 1);
                    break;
                }
                self.onActionTargetBuff(targetData, game.Enum_BuffTrigger.time);
                self.checkkBuffTimeOut(targetData);
                i++;
            }
        };
        /**把某个buff加到某个对象上 */
        BuffManager.prototype.onAddBuffToTargetData = function (driverdata, buffId, activeTime, buf_attack_num, buf_attack_per) {
            var self = this;
            var buffCfg = game.BuffTable.getCfgById(buffId);
            var buffs = driverdata.buffs[buffCfg.trigger];
            var buff;
            var i = 0;
            var len = buffs.length;
            var dataT = self.m_clock.getTime();
            var hasBuff = false;
            for (i = 0; i < len; i++) {
                if (buffs[i].buffId == buffId) {
                    // buff = buffs[i];
                    hasBuff = true;
                    break;
                }
            }
            buff = game.BuffData.getBuffData();
            buff.buffId = buffId;
            buffs.push(buff);
            if (buffCfg.trigger == game.Enum_BuffTrigger.time) {
                buff.nextTouchTime = dataT + 1000;
                if (hasBuff == false) {
                    self.buffTargets.push(driverdata);
                }
            }
            buff.actionType = buffCfg.actionType;
            buff.mySelfData = driverdata;
            // buff.targetData = targetDriver;
            // buff.target = buffCfg.target;
            buff.trigger = buffCfg.trigger;
            // buff.activeTime = activeTime;
            buff.buf_attack_num = buf_attack_num;
            buff.buf_attack_per = buf_attack_per;
            if (activeTime == 0) {
                buff.endTime = dataT + 86400000;
            }
            else {
                buff.endTime = dataT + activeTime;
            }
            // if (buffCfg.trigger == Enum_BuffTrigger.create) {
            // 	buff.touch();
            // }
            return buff;
        };
        // public onActionBuff(buff:BuffData): void
        // {
        // 	buff.touch();
        // }
        /**执行某个类型的buff */
        BuffManager.prototype.onActionTargetBuff = function (driverdata, trigger_type) {
            var self = this;
            var buffs = driverdata.buffs[trigger_type];
            var buff;
            var i = 0;
            var len = buffs.length;
            if (trigger_type == game.Enum_BuffTrigger.time) {
                var dataT = self.m_clock.getTime();
                for (i = 0; i < len; i++) {
                    buff = buffs[i];
                    if (dataT > buff.nextTouchTime) {
                        buff.touch();
                    }
                }
            }
            else if (trigger_type == game.Enum_BuffTrigger.die) {
                if (driverdata.attr.getValue(game.Enum_Attr.hp) <= 0) {
                    for (i = 0; i < len; i++) {
                        buff = buffs[i];
                        buff.touch();
                    }
                }
            }
            else if (trigger_type == game.Enum_BuffTrigger.shooting) {
                for (i = 0; i < len; i++) {
                    buff = buffs[i];
                    buff.touch();
                }
            }
            else if (trigger_type == game.Enum_BuffTrigger.create) {
                for (i = 0; i < len; i++) {
                    buff = buffs[i];
                    buff.touch();
                }
            }
        };
        /**检测时间类的buff是否已经过期 */
        BuffManager.prototype.checkkBuffTimeOut = function (driverdata) {
            var self = this;
            var dataT = self.m_clock.getTime();
            var trigger_type = 0;
            var trigger_typeLen = game.Enum_BuffTrigger.max;
            // let driverdata: IDriverData = master.getData();
            for (trigger_type = 1; trigger_type <= trigger_typeLen; trigger_type++) {
                var arr = driverdata.buffs[trigger_typeLen];
                if (arr != undefined) {
                    var i = 0;
                    var len = arr.length;
                    var buff;
                    if (driverdata.attr.getValue(game.Enum_Attr.hp) < 0) {
                        //已经死
                        return;
                    }
                    for (i = 0; i < len;) {
                        buff = arr[i];
                        if (buff == undefined) {
                            break;
                        }
                        if (buff.endTime == -1) {
                            continue;
                        }
                        if (buff.endTime <= dataT) {
                            buff.cancelBuff();
                            //过期
                            // arr.splice(i,1);
                            len = arr.length;
                            continue;
                        }
                        i++;
                    }
                }
            }
        };
        /**清空所有英雄的buff */
        BuffManager.prototype.onClearSceneHeroBuff = function () {
            var self = this;
            var sceneMar = game.SceneManager.getInstance();
            var heroArr = sceneMar.getAllRoles();
            var i = 0;
            var len = heroArr.length;
            ;
            for (i = 0; i < len; i++) {
                var role = sceneMar.getDriverById(heroArr[i], game.ENUM_DriverType.role);
                if (!role)
                    continue;
                var roleData = role.getData();
                roleData.clearBuff();
            }
        };
        return BuffManager;
    }(DLG.BaseAction));
    game.BuffManager = BuffManager;
    __reflect(BuffManager.prototype, "game.BuffManager");
})(game || (game = {}));
//# sourceMappingURL=BuffManager.js.map