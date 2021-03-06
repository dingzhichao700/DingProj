module egret{
    /**
     * 法师
     */
    export class PlayerMage extends ElementPlayer{
        //金刚净化效果
        private _jinGan:ElementSkill;
        //金刚净化计时 id
        private _jinGanTimerId:number;
        //金刚净化经过的时间
        private _jinGanTime:number;

        public constructor(){
            super();
        }
        //
        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        public getAttackRange(skillType:number = 0):number{
            return 300;
        }
        //
        /**
         * 检测自动攻击
         */
        public checkAutoAttack():void{
            this.checkJinGan();
        }
        //
        /**
         * 检测释放金刚净化技能
         */
        public checkJinGan():void{
            if(this.getSkillTime(SkillType.MAGE_JINGAN) > dataManager().fightData.getSkillIntervalTime(SkillType.MAGE_JINGAN)) {
                this.setSkillTime(SkillType.MAGE_JINGAN);

                var playerVo:ScenePlayerVo = <ScenePlayerVo>this.data.vo;

                if(!this._jinGan){
                    //buff自身缓存，不用回收，直接new
                    this._jinGan = new egret.ElementSkill();
                    this._jinGan.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,4));
                }

                this._jinGan.playCount = 0;
                this._jinGan.addToScene();
                this.show(this._jinGan,SceneElementLayerType.BUFF_BODY,0,-20);

                this._jinGanTime = 0;

                if(!TimerManager.getInstance().hasExecute(this._jinGanTimerId)){
                    this._jinGanTimerId = TimerManager.getInstance().addExecute(this.removeJinGan,this,1000);
                }
            }
        }
        //
        /**
         * 检测移除金刚净化技能
         */
        private removeJinGan():void{
            this._jinGanTime ++;

            if(this._jinGanTime > 4){
                TimerManager.getInstance().removeExecute(this._jinGanTimerId);

                this.setSkillTime(SkillType.MAGE_JINGAN);

                this.hide(this._jinGan);
                this._jinGan.removeFromScene();
            }
        }
        //
        /**
         * 玩家攻击方法
         */
        public attack():void{
            if(this._isLocked) return;
            if(this.isSkillStatus) return;
            if(!this._attackTarget) return;

            if((<SceneDriverVo>this._attackTarget.vo).hp <= 0) {
                this.chaseArmies(this.armies);
                return;
            }

            this.stopMove();

            var direction:number = ActionMovieClipData.getInstance().calculateDirection(this.x,this.y,this._attackTarget.vo.x,this._attackTarget.vo.y);

            //玄冰雷电
            if(this.getSkillTime(SkillType.MAGE_XUANBING) > dataManager().fightData.getSkillIntervalTime(SkillType.MAGE_XUANBING)){
                this.setUseSkill(SkillType.MAGE_XUANBING);
            }
            //疾光退
            else if(this.getSkillTime(SkillType.MAGE_THUNDER_BACK) > dataManager().fightData.getSkillIntervalTime(SkillType.MAGE_THUNDER_BACK)){
                this.setUseSkill(SkillType.MAGE_THUNDER_BACK);
            }
            //雷电术
            else if(this.getSkillTime(SkillType.MAGE_THUNDER) > dataManager().fightData.getSkillIntervalTime(SkillType.MAGE_THUNDER)) {
                this.setUseSkill(SkillType.MAGE_THUNDER);
            }
            else{
                this.setUseSkill(SkillType.MAGE_NORMAL);
            }

            if(this._avatar.actionType == ActionType.ATTACK){
                this.direction = direction;
            }else{
                this.play(0,ActionType.ATTACK,direction);
                this._avatar.setFrameHandler(this.playSkill,this);
            }
        }
        //
        /**
         * 释放技能
         */
        public playSkill():void {
            if (!this.scene) return;

            //职业及技能类型处理
            var playerVo:ScenePlayerVo = <ScenePlayerVo>this.data.vo;

            if(this._avatar.frameIndex == 5){
                var skillType:number = this.skillType;
                //玄冰雷电
                if(skillType == SkillType.MAGE_XUANBING){
                    var skill:ElementSkill = <ElementSkill>SceneElementManager.getInstance().getElement(ElementSkill);
                    skill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,5));
                    this.scene.addElement(skill,SceneLayerType.BACKGROUND_EFFECT,this._attackTarget.vo.x,this._attackTarget.vo.y);

                    var targets:Array<SceneElementDataItem> = this.getDamageTargets(SkillType.MAGE_XUANBING,this._attackTarget.vo.x,this._attackTarget.vo.y);
                }
                //疾光退
                else if(skillType == SkillType.MAGE_THUNDER_BACK){
                    var skill:ElementSkill = <ElementSkill>SceneElementManager.getInstance().getElement(ElementSkill);
                    skill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,3));
                    this.scene.addElement(skill,SceneLayerType.BATTLE_EFFECT,this._attackTarget.vo.x,this._attackTarget.vo.y);

                    var targets:Array<SceneElementDataItem> = this.getDamageTargets(SkillType.MAGE_THUNDER_BACK,this._attackTarget.vo.x,this._attackTarget.vo.y);
                    var radius:number = this.getAttackRange() / 2;
                    
                    for(var i in targets){
                        var element:SceneElementDriver = <SceneElementDriver>this.scene.getElement(targets[i].vo.idString);

                        if(element){
                            if(targets[i] == this._attackTarget){
                                var x:number = this._x;
                                var y:number = this._y;
                            }else{
                                x = this._attackTarget.vo.x;
                                y = this._attackTarget.vo.y;
                            }

                            var distance:number = DimensionUtil.distance2(this._attackTarget.vo.x,this._attackTarget.vo.y,x,y);

                            element.stepBack(x,y,radius + distance);
                        }
                    }
                }
                //雷电术
                else if(skillType == SkillType.MAGE_THUNDER) {
                    var skill:ElementSkill = <ElementSkill>SceneElementManager.getInstance().getElement(ElementSkill);
                    skill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,2));
                    this.scene.addElement(skill,SceneLayerType.BATTLE_EFFECT,this._attackTarget.vo.x,this._attackTarget.vo.y);
                }
                else{
                    var mageSkill:ElementMageNormalSkill = <ElementMageNormalSkill>SceneElementManager.getInstance().getElement(ElementMageNormalSkill);
                    mageSkill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,1));
                    this.scene.addElement(mageSkill,SceneLayerType.BATTLE_EFFECT);
                    mageSkill.attackTo(this.x,this.y - 50,this._attackTarget,0,-50,90,this.getAttackRange());
                }

                this.damage(skillType,targets);
            }else if(this._avatar.frameIndex == this._avatar.frameIndexMax){
                if(this.skillType == SkillType.MAGE_THUNDER_BACK){
                    this.chaseArmies(this.armies);
                }else{
                    this.checkAutoAttack2();
                }
            }
        }
        //
        /**
         * 获取技能伤害敌人数据，不同技能重写，默认为单体伤害敌人数据
         * @param skillType 技能类型
         * @param x 技能中心点x，用于群攻计算
         * @param y 技能中心点y，用于群攻计算
         * @returns {Array<SceneElementDataItem>}
         */
        public getDamageTargets(skillType:number = 0,x:number = 0,y:number = 0):Array<SceneElementDataItem>{
            this._damageTargets.length = 0;

            switch (skillType){
                case SkillType.MAGE_NORMAL:
                case SkillType.MAGE_THUNDER:
                    this._damageTargets.push(this._attackTarget);
                    break;
                case SkillType.MAGE_THUNDER_BACK:
                case SkillType.MAGE_XUANBING:
                    return this.getDamageTargetsByRange(this.getAttackRange(skillType),x,y);
                    break;
            }

            return this._damageTargets;
        }
    }
}