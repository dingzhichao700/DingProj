var egret;
(function (egret) {
    /**
     * 射手
     */
    var PlayerBowman = (function (_super) {
        __extends(PlayerBowman, _super);
        function PlayerBowman() {
            _super.call(this);
        }
        var __egretProto__ = PlayerBowman.prototype;
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
        /**玩家攻击方法*/
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
            //召唤神兽
            if (this.getSkillTime(egret.SkillType.BOWMAN_CALL) > egret.dataManager().fightData.getSkillIntervalTime(egret.SkillType.BOWMAN_CALL)) {
                if (egret.RoleManager.getInstance().isRoleInstance(this)) {
                    if (!egret.RoleManager.getInstance().hasAnimal) {
                        this.setUseSkill(egret.SkillType.BOWMAN_CALL);
                        egret.RoleManager.getInstance().addAnimal(this);
                    }
                }
                else if (!this.hasAnimal) {
                    this.setUseSkill(egret.SkillType.BOWMAN_CALL);
                    this.addAnimal(this);
                }
            }
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
         * 增加神兽
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addAnimal = function (master) {
            var item = egret.dataManager().sceneData.addAnimal();
            this._animal = egret.SceneElementManager.getInstance().getElement(egret.PlayerAnimal);
            this._animal.setData(item);
            this._animal.setHPStyle(egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_red_bg.png"), egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_red.png"), 49, 8);
            this._animal.master = this;
            var radius = this.getAttackRange();
            var radian = Math.PI * 2 * Math.random();
            var x = Math.cos(radian) * radius + master.x;
            var y = Math.sin(radian) * radius + master.y;
            if (this.scene)
                this.scene.addElement(this._animal, egret.SceneLayerType.BIOLOGY, x, y);
            this._animal.chaseArmies(master.armies);
            egret.globalUpdateWindows([egret.UpdateType.ADD_MONSTER], item);
        };
        //
        /**
         * 清空神兽
         */
        __egretProto__.removeAnimal = function () {
            this._animal = null;
        };
        Object.defineProperty(__egretProto__, "hasAnimal", {
            //
            /**
             * 是否已有神兽
             * @returns {PlayerAnimal|boolean}
             */
            get: function () {
                return this._animal && this._animal.data.vo.hp > 0;
            },
            enumerable: true,
            configurable: true
        });
        //
        /**
         * 释放技能
         */
        __egretProto__.playSkill = function () {
            if (!this.scene)
                return;
            //职业及技能类型处理
            var playerVo = this.data.vo;
            if (this._avatar.frameIndex == 2) {
                var mageSkill = egret.SceneElementManager.getInstance().getElement(egret.ElementMageNormalSkill);
                mageSkill.setMovieName(egret.SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, 1));
                this.scene.addElement(mageSkill, egret.SceneLayerType.BATTLE_EFFECT);
                mageSkill.attackTo(this.x, this.y - 50, this._attackTarget, 0, -50, 90, this.getAttackRange());
                this.damage(egret.SkillType.BOWMAN_NORMAL);
            }
            else if (this._avatar.frameIndex == this._avatar.frameIndexMax) {
                this.chaseArmies(this.armies);
            }
        };
        return PlayerBowman;
    })(egret.ElementPlayer);
    egret.PlayerBowman = PlayerBowman;
    PlayerBowman.prototype.__class__ = "egret.PlayerBowman";
})(egret || (egret = {}));
//# sourceMappingURL=PlayerBowman.js.map