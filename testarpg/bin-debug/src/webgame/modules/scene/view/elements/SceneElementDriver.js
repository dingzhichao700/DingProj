var egret;
(function (egret) {
    var SceneElementDriver = (function (_super) {
        __extends(SceneElementDriver, _super);
        /**
         * 构造函数
         */
        function SceneElementDriver() {
            _super.call(this);
            //攻击计数
            this._timerCount = 0;
            //追击敌人时帧计数
            this._frameCount = 0;
            //伤害角度缓存
            this._radiansCache = [];
            //伤害对象缓存
            this._damageTargets = [];
            //技能释放时间
            this._skillTimeData = {};
            //元素周围角度
            this._positionRadians = [];
            //元素周围6个角度缓存
            this._positionCache = [];
            //元素周围其他元素数据
            this._positionTargets = [];
            //转向目标点
            this._positionPoint = new egret.Point();
            //血量更新类型通知缓存
            this._hpChangeTypes = [egret.UpdateType.DAMAGE_HP_CHANGE];
            this.speed = 6;
            this._hpBar = new egret.HPBar();
            this._namePad.show(this._hpBar, -1);
            for (var i = 0; i < 6; i++) {
                this._positionRadians[i] = i * 60 / 180 * Math.PI;
            }
            var self = this;
            //元素周围6个角度缓存排序，将远离其他元素的角度排前面
            this._positionSort = function (a, b) {
                var width = egret.SceneElementMover.MOVER_WIDTH / 2;
                var height = egret.SceneElementMover.MOVER_HEIGHT;
                var radius = self.getAttackRange();
                var x1 = Math.cos(a) * radius + self._x;
                var y1 = Math.sin(a) * radius + self._y;
                x1 = self.limitValue(x1, width, self._maxX - width);
                y1 = self.limitValue(y1, height, self._maxY);
                var x2 = Math.cos(b) * radius + self._x;
                var y2 = Math.sin(b) * radius + self._y;
                x2 = self.limitValue(x2, width, self._maxX - width);
                y2 = self.limitValue(y2, height, self._maxY);
                var distance1 = 0;
                var distance2 = 0;
                for (var i in self._positionTargets) {
                    distance1 += egret.DimensionUtil.distance2(x1, y1, self._positionTargets[i].vo.x, self._positionTargets[i].vo.y);
                    distance2 += egret.DimensionUtil.distance2(x2, y2, self._positionTargets[i].vo.x, self._positionTargets[i].vo.y);
                }
                if (distance1 > distance2) {
                    return -1;
                }
                else if (distance1 < distance2) {
                    return 1;
                }
                return 0;
            };
            //元素周围3个角度缓存排序，将靠近攻击目标的角度排前面
            this._positionSort2 = function (a, b) {
                var width = egret.SceneElementMover.MOVER_WIDTH / 2;
                var height = egret.SceneElementMover.MOVER_HEIGHT;
                var radius = self.getAttackRange();
                var x1 = Math.cos(a) * radius + self._x;
                var y1 = Math.sin(a) * radius + self._y;
                x1 = self.limitValue(x1, width, self._maxX - width);
                y1 = self.limitValue(y1, height, self._maxY);
                var x2 = Math.cos(b) * radius + self._x;
                var y2 = Math.sin(b) * radius + self._y;
                x2 = self.limitValue(x2, width, self._maxX - width);
                y2 = self.limitValue(y2, height, self._maxY);
                var distance1 = egret.DimensionUtil.distance2(x1, y1, self._attackTarget.vo.x, self._attackTarget.vo.y);
                var distance2 = egret.DimensionUtil.distance2(x2, y2, self._attackTarget.vo.x, self._attackTarget.vo.y);
                if (distance1 < distance2) {
                    return -1;
                }
                else if (distance1 > distance2) {
                    return 1;
                }
                return 0;
            };
        }
        var __egretProto__ = SceneElementDriver.prototype;
        //
        /**
         * 设置血条进度条样式
         * @param bgUrl 进度背景地址
         * @param barUrl 进度条地址
         * @param width 进度条宽
         * @param height 进度条高
         */
        __egretProto__.setHPStyle = function (bgUrl, barUrl, width, height) {
            this._hpBar.setStyle(bgUrl, barUrl, width, height);
            this._namePad.updateLayout();
        };
        //
        __egretProto__.updateXY = function () {
            _super.prototype.updateXY.call(this);
        };
        //
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
            this.updateHp();
        };
        //
        /**
         * 更新血量显示
         */
        __egretProto__.updateHp = function () {
            var vo = this._data.vo;
            this._hpBar.setProperty(vo.hp + "", vo.hp / vo.hpTotal);
        };
        /**
         * 按指定动作类型和方向播放影片
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
         * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
         * @param thisObj:any = null 播放完成后回调函数所属对象
         * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
         * @param startObj:any = null startFun回调函数所属对象
         */
        __egretProto__.play = function (frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (loopCount === void 0) { loopCount = 0; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (startFun === void 0) { startFun = null; }
            if (startObj === void 0) { startObj = null; }
            if (this._isLocked)
                return;
            _super.prototype.play.apply(this, arguments);
            this.clearAttack();
        };
        /**
         * 从场景移除时处理
         *
         */
        __egretProto__.removeFromScene = function () {
            this.stopAll();
            _super.prototype.removeFromScene.call(this);
        };
        //
        /**
         * 追击目标到达攻击范围时处理
         * @param fun 回调函数 function(target:SceneElementDataItem) target:攻击目标
         * @param target 回调函数所属对象
         */
        __egretProto__.setChaseArriveHandler = function (fun, target) {
            if (!this._chaseArriveItem) {
                this._chaseArriveItem = new egret.ScriptItem();
            }
            this._chaseArriveItem.execute = fun;
            this._chaseArriveItem.target = target;
        };
        //
        /**
         * 追击敌人
         * @param armies 敌人数据
         */
        __egretProto__.chaseArmies = function (armies) {
            if (this.data.vo.hp <= 0)
                return;
            this.armies = armies;
            if (this.armies) {
                if (!egret.TimerManager.getInstance().hasExecute(this._chaseTimerId))
                    this._chaseTimerId = egret.TimerManager.getInstance().addExecute(this.checkAutoAttack, this, 500);
                var max = 100000;
                var distance;
                var target = this.getPriorityTarget();
                var x = this.x;
                var y = this.y;
                if (!target) {
                    for (var i in this.armies) {
                        var vo = this.armies[i].vo;
                        if (vo.hp > 0) {
                            distance = egret.DimensionUtil.distance2(x, y, vo.x, vo.y);
                            if (distance < max) {
                                max = distance;
                                target = this.armies[i];
                            }
                        }
                    }
                }
                if (target) {
                    this._attackTarget = target;
                    if (!this.checkChaseArrive()) {
                        if (!egret.EnterFrameManager.getInstance().hasExecute(this._chaseId)) {
                            this._chaseId = egret.EnterFrameManager.getInstance().addExecute(this.checkChaseArrive, this, 3);
                        }
                    }
                }
                else {
                    this._attackTarget = null;
                    this.attackEnd();
                }
            }
            else {
                this._attackTarget = null;
                this.attackEnd();
            }
        };
        //
        /**
         * 获取优先攻击对象，各职业重写
         * @returns {null}
         */
        __egretProto__.getPriorityTarget = function () {
            return null;
        };
        //
        /**
         * 检测自动攻击
         */
        __egretProto__.checkAutoAttack = function () {
            this._timerCount++;
            //1==500ms
            if (this._timerCount % 2 == 0) {
                this.chaseArmies(this.armies);
            }
        };
        //
        /**
         * 检测是否已到达攻击目标周围
         */
        __egretProto__.checkChaseArrive = function () {
            this._frameCount++;
            var distance;
            var minRange = this.getElementMinRange();
            //检测场景元素之间是否太靠近
            if (this.checkRange())
                return false;
            if (this._isLocked)
                return false;
            //检测是否已到达攻击目标周围
            distance = egret.DimensionUtil.distance2(this._x, this._y, this._attackTarget.vo.x, this._attackTarget.vo.y);
            //if(this.data.vo["vocation"]){
            //	LogManager.debug(this,"checkChaseArrive() distance = " + distance.toFixed(0) + "  vocation = " + this.data.vo["vocation"],this._x.toFixed(0),this._y.toFixed(0),this._attackTarget.vo.x.toFixed(0),this._attackTarget.vo.y.toFixed(0));
            //}
            if (distance < this.getAttackRange()) {
                //LogManager.debug(this,"checkChaseArrive:" + this.data.vo.name);
                egret.EnterFrameManager.getInstance().removeExecute(this._chaseId);
                this.attack();
                if (this._chaseArriveItem) {
                    this._chaseArriveItem.params = [this._attackTarget];
                    this._chaseArriveItem.apply();
                }
                return true;
            }
            else if (this._frameCount % 3 == 0) {
                this.moveTo3(this._attackTarget.vo.x, this._attackTarget.vo.y);
            }
            return false;
        };
        //
        /**
         * 元素之间的距离太近时，自动分开的目标点
         */
        __egretProto__.resetPositionPoint = function () {
            this._positionPoint.x = 0;
            this._positionPoint.y = 0;
        };
        //
        /**
         * 检测元素之间的距离，距离太近时自动分开
         * @returns {boolean} 返回 true 表示距离太近
         */
        __egretProto__.checkRange = function () {
            if (!this._attackTarget || this._attackTarget.vo.hp <= 0)
                return false;
            if (this._positionPoint.x > 0 && this._positionPoint.y > 0) {
                if (this._x + "" != this._positionPoint.x + "" && this._y + "" != this._positionPoint.y + "") {
                    return true;
                }
                else {
                    this.resetPositionPoint();
                }
            }
            var minRange = this.getElementMinRange();
            //检测场景元素之间是否太靠近
            if (this.scene) {
                var array = this.scene.getBiologyMap();
                this._positionTargets.length = 0;
                for (var i in array) {
                    if (array[i] instanceof SceneElementDriver && array[i] != this) {
                        var driver = array[i];
                        var distance = egret.DimensionUtil.distance2(this._x, this._y, driver.data.vo.x, driver.data.vo.y);
                        if (distance < minRange) {
                            this._positionTargets.push(driver.data);
                        }
                    }
                }
                if (this._positionTargets.length > 0) {
                    this._positionRadians.sort(this._positionSort);
                    this._positionCache.length = 0;
                    var length = (this._positionRadians.length / 3) | 0;
                    for (var j = 0; j < length; j++) {
                        this._positionCache.push(this._positionRadians[j]);
                    }
                    this._positionCache.sort(this._positionSort2);
                    var width = egret.SceneElementMover.MOVER_WIDTH / 2;
                    var height = egret.SceneElementMover.MOVER_HEIGHT;
                    var radius = this.getAttackRange();
                    var radian = this._positionCache[0];
                    var x = Math.cos(radian) * radius + this._x;
                    var y = Math.sin(radian) * radius + this._y;
                    x = this.limitValue(x, width, this._maxX - width);
                    y = this.limitValue(y, height, this._maxY);
                    this._positionPoint.x = x;
                    this._positionPoint.y = y;
                    this.moveTo3(x, y);
                    //LogManager.debug(this,"checkRange2:" + this.data.vo.name,this._positionPoint);
                    return true;
                }
            }
            //LogManager.debug(this,"checkRange3:" + this.data.vo.name);
            return false;
        };
        //
        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        __egretProto__.getAttackRange = function (skillType) {
            if (skillType === void 0) { skillType = 0; }
            return 150;
        };
        //
        /**
         * 获取场景元素之间最小距离，小于此距离时，场景元素自动朝不同方向分开
         * @returns {number}
         */
        __egretProto__.getElementMinRange = function () {
            return 80;
        };
        //
        /**
         * 默认攻击方法，不同职业和怪物重写
         */
        __egretProto__.attack = function () {
            if (this._isLocked)
                return;
            if (!this._attackTarget)
                return;
            if (this._attackTarget.vo.hp <= 0) {
                this.chaseArmies(this.armies);
                return;
            }
            //LogManager.debug(this,"attack:" + this.data.vo.name);
            this.stopMove();
            var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this.x, this.y, this._attackTarget.vo.x, this._attackTarget.vo.y);
            this.play(0, egret.ActionType.ATTACK, direction, 1, this.attackEnd, this);
            this._avatar.setFrameHandler(this.playSkill, this);
        };
        //
        /**
         * 单次攻击结束
         */
        __egretProto__.attackEnd = function () {
            this.resetPositionPoint();
            if (!this._attackTarget) {
                egret.TimerManager.getInstance().removeExecute(this._chaseTimerId);
            }
            if (this._avatar.actionType == egret.ActionType.ATTACK)
                this.play(0, egret.ActionType.PREPARE);
        };
        //
        /**
         * 清理攻击相关数据和回调
         */
        __egretProto__.clearAttack = function () {
            this._timerCount = 0;
            this._avatar.setFrameHandler(null);
        };
        //
        /**
         * 释放默认技能
         */
        __egretProto__.playSkill = function () {
        };
        //
        /**
         * 停止所有攻击相关的行为，用于战斗结束
         */
        __egretProto__.stopAll = function () {
            egret.Tween.removeTweens(this);
            egret.EnterFrameManager.getInstance().removeExecute(this._chaseId);
            egret.TimerManager.getInstance().removeExecute(this._chaseTimerId);
            this.isSkillStatus = false;
            this.armies = null;
            this._attackTarget = null;
            this.setXY(this._x, this._y);
            this.unlock();
            this.stopMove();
            this.attackEnd();
            this.clearAttack();
        };
        //
        /**
         * 切换场景特效
         */
        __egretProto__.changeSceneEffect = function () {
            this.stopAll();
            this.enterSceneEffect();
        };
        //
        /**
         * 进入场景特效
         */
        __egretProto__.enterSceneEffect = function () {
            if (this.scene) {
                var effect = egret.SceneElementManager.getInstance().getElement(egret.ElementEffect);
                effect.setIsCheckResource(false);
                effect.setMovieName(egret.MovieName.EFFECT_01);
                this.scene.addElement(effect, egret.SceneLayerType.BATTLE_EFFECT, this.x, this.y);
            }
        };
        //
        /**
         * 升级特效
         */
        __egretProto__.levelUpEffect = function () {
            if (this.scene) {
                var effect = egret.SceneElementManager.getInstance().getElement(egret.ElementEffect);
                effect.setIsCheckResource(false);
                effect.setMaster(this);
                effect.setMovieName(egret.MovieName.LEVEL_UP);
                this.scene.addElement(effect, egret.SceneLayerType.BATTLE_EFFECT, this.x, this.y);
            }
        };
        //
        /**
         * 计算伤害
         * @param skillType 技能类型
         * @param range 范围值
         * @param x 技能中心点x，用于群攻计算
         * @param y 技能中心点y，用于群攻计算
         */
        __egretProto__.damage = function (skillType, targets, range, x, y) {
            if (skillType === void 0) { skillType = 0; }
            if (targets === void 0) { targets = null; }
            if (range === void 0) { range = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (this._attackTarget) {
                if (range > 0)
                    targets = this.getDamageTargetsByRange(range, x, y);
                if (!targets)
                    targets = this.getDamageTargets(skillType, x, y);
                var radians = this.getDamageRadians(targets);
                var damageValues = egret.dataManager().fightData.damage(this.data, skillType, targets);
                egret.globalUpdateWindows(this._hpChangeTypes, targets, damageValues, radians);
            }
        };
        //
        /**
         * 获取技能伤害敌人数据，不同技能重写，默认为单体伤害敌人数据
         * @param skillType 技能类型
         * @param x 技能中心点x，用于群攻计算
         * @param y 技能中心点y，用于群攻计算
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getDamageTargets = function (skillType, x, y) {
            if (skillType === void 0) { skillType = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._damageTargets.length = 0;
            this._damageTargets.push(this._attackTarget);
            return this._damageTargets;
        };
        //
        /**
         * 获取伤害飘字角度数据
         * @param targets 敌人数据
         * @returns {Array<number>}
         */
        __egretProto__.getDamageRadians = function (targets) {
            this._radiansCache.length = 0;
            for (var i in targets) {
                this._radiansCache.push(Math.atan2(targets[i].vo.y - this.y, targets[i].vo.x - this.x));
            }
            return this._radiansCache;
        };
        //
        /**
         * 获取范围内的受伤害敌人数据
         * @param range 范围值
         * @param x 技能中心点x，用于群攻计算
         * @param y 技能中心点y，用于群攻计算
         */
        __egretProto__.getDamageTargetsByRange = function (range, x, y) {
            if (range === void 0) { range = 0; }
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._damageTargets.length = 0;
            this._damageTargets.push(this._attackTarget);
            if (range == 0)
                this.getAttackRange();
            if (x == 0)
                x = this._x;
            if (y == 0)
                y = this._y;
            for (var i in this.armies) {
                if (this.armies[i] && this._attackTarget != this.armies[i]) {
                    var vo = this.armies[i].vo;
                    if (vo.hp > 0) {
                        var distance = egret.DimensionUtil.distance2(x, y, vo.x, vo.y);
                        if (distance <= range) {
                            this._damageTargets.push(this.armies[i]);
                        }
                    }
                }
            }
            return this._damageTargets;
        };
        //
        /**
         * 记录技能使用时间
         * @param skillType
         */
        __egretProto__.setSkillTime = function (skillType) {
            this._skillTimeData[skillType] = egret.getTimer();
        };
        //
        /**
         * 获取上次使用技能经过的时间
         * @param skillType
         * @returns {number}
         */
        __egretProto__.getSkillTime = function (skillType) {
            if (this._skillTimeData[skillType])
                return egret.getTimer() - this._skillTimeData[skillType];
            return 1000000000;
        };
        //
        /**
         * 标记使用技能
         * @param skillType
         */
        __egretProto__.setUseSkill = function (skillType) {
            this.setSkillTime(skillType);
            this.skillType = skillType;
        };
        //
        /**
         * 野蛮冲撞
         * @param master 播放技能对象
         * @param target 冲撞目标对象
         * @param radian 冲撞角度
         * @param radius 冲撞移动半径
         * @param time 移动时间
         */
        __egretProto__.onCollide = function (master, target, radian, radius, time) {
            var width = egret.SceneElementMover.MOVER_WIDTH / 2;
            var height = egret.SceneElementMover.MOVER_HEIGHT;
            var x = master._x + Math.cos(radian) * radius;
            var y = master._y + Math.sin(radian) * radius;
            x = this.limitValue(x, width, this._maxX - width);
            y = this.limitValue(y, height, this._maxY);
            egret.Tween.get(this, { onChange: this.onChangeCollide, onChangeObj: this }).to({ x: x, y: y }, time).call(this.collideComplete, this, [master, target, x, y]);
        };
        //
        /**
         * 野蛮冲撞移动时
         */
        __egretProto__.onChangeCollide = function () {
            if (this.scene) {
                this.setXY(this._x, this._y);
                if (egret.RoleManager.getInstance().role == this) {
                    this.scene.isoMap.gotoXY2(this._x, this._y);
                }
            }
        };
        //
        /**
         * 野蛮冲撞结束
         * @param master 移动结束对象
         * @param target 冲撞目标对象
         * @param x 移动目标点x
         * @param y 移动目标点y
         */
        __egretProto__.collideComplete = function (master, target, x, y) {
            this.setXY(x, y);
        };
        //
        /**
         * 锁定，锁定时不无法动弹，动画暂停
         */
        __egretProto__.lock = function () {
            this._isLocked = true;
            this._avatar.stopMovie();
        };
        //
        /**
         * 解锁，恢复锁定前的动画播放
         */
        __egretProto__.unlock = function () {
            this.resetPositionPoint();
            this._isLocked = false;
            if (this.scene)
                this._avatar.playMovie();
            if (!egret.EnterFrameManager.getInstance().hasExecute(this._chaseId)) {
                this.chaseArmies(this.armies);
            }
        };
        //
        /**
         * 被击退，从击退中心点以半径计算退后的坐标
         * @param x 击退中心x
         * @param y 击退中心x
         * @param radius 击退半径
         */
        __egretProto__.stepBack = function (x, y, radius) {
            this.stopMove();
            var radian = Math.atan2(this._y - y, this._x - x);
            var tx = Math.cos(radian) * radius + x;
            var ty = Math.sin(radian) * radius + y;
            egret.Tween.get(this).to({ x: tx, y: ty }, 200).call(this.stepBackComplete, this, [tx, ty]);
        };
        //
        /**
         * 击退结束
         * @param x 击退目标点x
         * @param y 击退目标点y
         */
        __egretProto__.stepBackComplete = function (x, y) {
            this.setXY(x, y);
            this.resetPositionPoint();
            this.chaseArmies(this.armies);
        };
        return SceneElementDriver;
    })(egret.SceneElementMover);
    egret.SceneElementDriver = SceneElementDriver;
    SceneElementDriver.prototype.__class__ = "egret.SceneElementDriver";
})(egret || (egret = {}));
