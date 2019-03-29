var egret;
(function (egret) {
    /**
     * 战士
     */
    var PlayerWarrior = (function (_super) {
        __extends(PlayerWarrior, _super);
        function PlayerWarrior() {
            _super.call(this);
        }
        var __egretProto__ = PlayerWarrior.prototype;
        //
        __egretProto__.removeFromScene = function () {
            if (this._collideTarget) {
                this._collideTarget.unlock();
                this._collideTarget = null;
            }
            _super.prototype.removeFromScene.call(this);
        };
        //
        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        __egretProto__.getAttackRange = function (skillType) {
            //switch (skillType){
            //    case SkillType.WARRIOR_ZHANHUN:
            //    case SkillType.WARRIOR_LIEHUO:
            //        return 300;
            //        break;
            //    default:
            //        return 150;
            //        break;
            //}
            if (skillType === void 0) { skillType = 0; }
            return 150;
        };
        //
        /**
         * 玩家攻击方法
         */
        __egretProto__.attack = function () {
            if (this._isLocked)
                return;
            if (this.isSkillStatus)
                return;
            if (!this._attackTarget)
                return;
            if (this._attackTarget.vo.hp <= 0) {
                this.chaseArmies(this.armies);
                return;
            }
            this.stopMove();
            var direction = egret.ActionMovieClipData.getInstance().calculateDirection(this.x, this.y, this._attackTarget.vo.x, this._attackTarget.vo.y);
            var skillType;
            //烈火爆破
            if (this.getSkillTime(egret.SkillType.WARRIOR_LIEHUO) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.WARRIOR_LIEHUO)) {
                skillType = egret.SkillType.WARRIOR_LIEHUO;
            }
            else if (this.getSkillTime(egret.SkillType.WARRIOR_COLLIDE) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.WARRIOR_COLLIDE)) {
                //目标数据
                var target = this.scene.getElement(this._attackTarget.vo.idString);
                if (!target)
                    return;
                this._collideTarget = target;
                this.setUseSkill(egret.SkillType.WARRIOR_COLLIDE);
                this.isSkillStatus = true;
                var radian = Math.atan2(this._attackTarget.vo.y - this._y, this._attackTarget.vo.x - this._x);
                var radius = 300;
                var time = 500;
                target.lock();
                target.onCollide(this, target, radian, radius, time);
                //释放技能对象数据
                this.play(0, egret.ActionType.WALK, direction);
                radius -= this.getAttackRange();
                //释放技能对象增加时间，因时间相同时，释放技能对象会有可能先于被攻击对象调用结束回调函数
                time += 100;
                this.onCollide(this, target, radian, radius, time);
                this.damage(egret.SkillType.WARRIOR_COLLIDE);
                return;
            }
            else if (this.getSkillTime(egret.SkillType.WARRIOR_ZHANHUN) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.WARRIOR_ZHANHUN)) {
                skillType = egret.SkillType.WARRIOR_ZHANHUN;
            }
            else if (this.getSkillTime(egret.SkillType.WARRIOR_CISHA) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.WARRIOR_CISHA)) {
                skillType = egret.SkillType.WARRIOR_CISHA;
            }
            else {
                skillType = egret.SkillType.WARRIOR_NORMAL;
            }
            this.setUseSkill(skillType);
            //攻击
            if (this._avatar.actionType == egret.ActionType.ATTACK) {
                this.direction = direction;
            }
            else {
                this.play(0, egret.ActionType.ATTACK, direction);
                this._avatar.setFrameHandler(this.playSkill, this);
            }
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
            if (master == this) {
                target.unlock();
                this._collideTarget = null;
                this.setUseSkill(egret.SkillType.WARRIOR_COLLIDE);
                this.isSkillStatus = false;
                if (this._attackTarget && this._attackTarget.vo.hp <= 0) {
                    this.checkAutoAttack2();
                }
                else {
                    this.attack();
                }
            }
        };
        //
        /**
         * 检测自动攻击2，玩家在攻击结束时检测，不使用定时器方法checkAutoAttack()
         */
        __egretProto__.checkAutoAttack2 = function () {
            if (this._isLocked)
                return;
            if (this._attackTarget && this._attackTarget.vo.hp <= 0) {
                this.chaseArmies(this.armies);
            }
            else {
                this.attack();
            }
        };
        //
        /**
         * 释放技能
         */
        __egretProto__.playSkill = function () {
            if (!this.scene)
                return;
            //职业及技能类型处理
            var playerVo = this.data.vo;
            //攻击动作第2帧开始播放技能
            if (this._avatar.frameIndex == 1) {
                var skillType = this.skillType;
                var skillLevel;
                var skillLevel2 = 0;
                var direction = 0;
                var layerType = egret.SceneLayerType.BATTLE_EFFECT;
                var x = this._x;
                var y = this._y;
                var range = 0;
                var master;
                var offsetY = 50;
                var rotation;
                //烈火爆破
                if (skillType == egret.SkillType.WARRIOR_LIEHUO) {
                    skillLevel = 5;
                    layerType = egret.SceneLayerType.BACKGROUND_EFFECT;
                    range = this.getAttackRange(skillType);
                }
                else if (skillType == egret.SkillType.WARRIOR_ZHANHUN) {
                    skillLevel = 3;
                    y -= offsetY;
                    range = this.getAttackRange(skillType);
                    master = this;
                }
                else if (skillType == egret.SkillType.WARRIOR_CISHA) {
                    skillLevel = 2;
                    y -= offsetY;
                    var tx = this._attackTarget.vo.x;
                    var ty = this._attackTarget.vo.y - offsetY;
                    var radian = Math.atan2(ty - y, tx - x);
                    rotation = radian / Math.PI * 180 + 90;
                }
                else {
                    skillLevel = 1;
                    skillLevel2 = 1;
                    direction = this.direction;
                    //x = this._attackTarget.vo.x;
                    y -= offsetY;
                }
                var skill = egret.SceneElementManager.getInstance().getElement(egret.ElementSkill);
                skill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, skillLevel, skillLevel2));
                if (direction > 0)
                    skill.direction = direction;
                if (master)
                    skill.setMaster(master, 0, -offsetY);
                if (rotation != null)
                    skill.setEffProperties(rotation);
                this.scene.addElement(skill, layerType, x, y);
                this.damage(skillType, null, range);
            }
            else if (this._avatar.frameIndex == this._avatar.frameIndexMax) {
                this.chaseArmies(this.armies);
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
            switch (skillType) {
                case egret.SkillType.WARRIOR_NORMAL:
                case egret.SkillType.WARRIOR_COLLIDE:
                case egret.SkillType.WARRIOR_CISHA:
                    this._damageTargets.push(this._attackTarget);
                    break;
                case egret.SkillType.WARRIOR_ZHANHUN:
                case egret.SkillType.WARRIOR_LIEHUO:
                    return this.getDamageTargetsByRange(this.getAttackRange(skillType), x, y);
                    break;
            }
            return this._damageTargets;
        };
        return PlayerWarrior;
    })(egret.ElementPlayer);
    egret.PlayerWarrior = PlayerWarrior;
    PlayerWarrior.prototype.__class__ = "egret.PlayerWarrior";
})(egret || (egret = {}));
