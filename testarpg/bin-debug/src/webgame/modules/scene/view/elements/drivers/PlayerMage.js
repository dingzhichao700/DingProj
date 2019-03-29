var egret;
(function (egret) {
    /**
     * 法师
     */
    var PlayerMage = (function (_super) {
        __extends(PlayerMage, _super);
        function PlayerMage() {
            _super.call(this);
        }
        var __egretProto__ = PlayerMage.prototype;
        //
        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        __egretProto__.getAttackRange = function (skillType) {
            if (skillType === void 0) { skillType = 0; }
            return 300;
        };
        //
        /**
         * 检测自动攻击
         */
        __egretProto__.checkAutoAttack = function () {
            this.checkJinGan();
        };
        //
        /**
         * 检测释放金刚净化技能
         */
        __egretProto__.checkJinGan = function () {
            if (this.getSkillTime(egret.SkillType.MAGE_JINGAN) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.MAGE_JINGAN)) {
                this.setSkillTime(egret.SkillType.MAGE_JINGAN);
                var playerVo = this.data.vo;
                if (!this._jinGan) {
                    //buff自身缓存，不用回收，直接new
                    this._jinGan = new egret.ElementSkill();
                    this._jinGan.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 4));
                }
                this._jinGan.playCount = 0;
                this._jinGan.addToScene();
                this.show(this._jinGan, egret.SceneElementLayerType.BUFF_BODY, 0, -20);
                this._jinGanTime = 0;
                if (!egret.TimerManager.getInstance().hasExecute(this._jinGanTimerId)) {
                    this._jinGanTimerId = egret.TimerManager.getInstance().addExecute(this.removeJinGan, this, 1000);
                }
            }
        };
        //
        /**
         * 检测移除金刚净化技能
         */
        __egretProto__.removeJinGan = function () {
            this._jinGanTime++;
            if (this._jinGanTime > 4) {
                egret.TimerManager.getInstance().removeExecute(this._jinGanTimerId);
                this.setSkillTime(egret.SkillType.MAGE_JINGAN);
                this.hide(this._jinGan);
                this._jinGan.removeFromScene();
            }
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
            //玄冰雷电
            if (this.getSkillTime(egret.SkillType.MAGE_XUANBING) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.MAGE_XUANBING)) {
                this.setUseSkill(egret.SkillType.MAGE_XUANBING);
            }
            else if (this.getSkillTime(egret.SkillType.MAGE_THUNDER_BACK) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.MAGE_THUNDER_BACK)) {
                this.setUseSkill(egret.SkillType.MAGE_THUNDER_BACK);
            }
            else if (this.getSkillTime(egret.SkillType.MAGE_THUNDER) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.MAGE_THUNDER)) {
                this.setUseSkill(egret.SkillType.MAGE_THUNDER);
            }
            else {
                this.setUseSkill(egret.SkillType.MAGE_NORMAL);
            }
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
         * 释放技能
         */
        __egretProto__.playSkill = function () {
            if (!this.scene)
                return;
            //职业及技能类型处理
            var playerVo = this.data.vo;
            if (this._avatar.frameIndex == 5) {
                var skillType = this.skillType;
                //玄冰雷电
                if (skillType == egret.SkillType.MAGE_XUANBING) {
                    var skill = egret.SceneElementManager.getInstance().getElement(egret.ElementSkill);
                    skill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 5));
                    this.scene.addElement(skill, egret.SceneLayerType.BACKGROUND_EFFECT, this._attackTarget.vo.x, this._attackTarget.vo.y);
                    var targets = this.getDamageTargets(egret.SkillType.MAGE_XUANBING, this._attackTarget.vo.x, this._attackTarget.vo.y);
                }
                else if (skillType == egret.SkillType.MAGE_THUNDER_BACK) {
                    var skill = egret.SceneElementManager.getInstance().getElement(egret.ElementSkill);
                    skill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 3));
                    this.scene.addElement(skill, egret.SceneLayerType.BATTLE_EFFECT, this._attackTarget.vo.x, this._attackTarget.vo.y);
                    var targets = this.getDamageTargets(egret.SkillType.MAGE_THUNDER_BACK, this._attackTarget.vo.x, this._attackTarget.vo.y);
                    var radius = this.getAttackRange() / 2;
                    for (var i in targets) {
                        var element = this.scene.getElement(targets[i].vo.idString);
                        if (element) {
                            if (targets[i] == this._attackTarget) {
                                var x = this._x;
                                var y = this._y;
                            }
                            else {
                                x = this._attackTarget.vo.x;
                                y = this._attackTarget.vo.y;
                            }
                            var distance = egret.DimensionUtil.distance2(this._attackTarget.vo.x, this._attackTarget.vo.y, x, y);
                            element.stepBack(x, y, radius + distance);
                        }
                    }
                }
                else if (skillType == egret.SkillType.MAGE_THUNDER) {
                    var skill = egret.SceneElementManager.getInstance().getElement(egret.ElementSkill);
                    skill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 2));
                    this.scene.addElement(skill, egret.SceneLayerType.BATTLE_EFFECT, this._attackTarget.vo.x, this._attackTarget.vo.y);
                }
                else {
                    var mageSkill = egret.SceneElementManager.getInstance().getElement(egret.ElementMageNormalSkill);
                    mageSkill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 1));
                    this.scene.addElement(mageSkill, egret.SceneLayerType.BATTLE_EFFECT);
                    mageSkill.attackTo(this.x, this.y - 50, this._attackTarget, 0, -50, 90, this.getAttackRange());
                }
                this.damage(skillType, targets);
            }
            else if (this._avatar.frameIndex == this._avatar.frameIndexMax) {
                if (this.skillType == egret.SkillType.MAGE_THUNDER_BACK) {
                    this.chaseArmies(this.armies);
                }
                else {
                    this.checkAutoAttack2();
                }
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
                case egret.SkillType.MAGE_NORMAL:
                case egret.SkillType.MAGE_THUNDER:
                    this._damageTargets.push(this._attackTarget);
                    break;
                case egret.SkillType.MAGE_THUNDER_BACK:
                case egret.SkillType.MAGE_XUANBING:
                    return this.getDamageTargetsByRange(this.getAttackRange(skillType), x, y);
                    break;
            }
            return this._damageTargets;
        };
        return PlayerMage;
    })(egret.ElementPlayer);
    egret.PlayerMage = PlayerMage;
    PlayerMage.prototype.__class__ = "egret.PlayerMage";
})(egret || (egret = {}));
