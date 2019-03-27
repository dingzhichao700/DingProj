module egret{
    /**
     * 战士
     */
    export class PlayerWarrior extends ElementPlayer{
        /**
         * 被冲撞对象
         */
        private _collideTarget:SceneElementDriver;

        public constructor(){
            super();
        }
        //
        public removeFromScene():void{
            if(this._collideTarget){
                this._collideTarget.unlock();
                this._collideTarget = null;
            }

            super.removeFromScene();
        }
        //
        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        public getAttackRange(skillType:number = 0):number{
            //switch (skillType){
            //    case SkillType.WARRIOR_ZHANHUN:
            //    case SkillType.WARRIOR_LIEHUO:
            //        return 300;
            //        break;
            //    default:
            //        return 150;
            //        break;
            //}

            return 150;
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
            var skillType:number;

            //烈火爆破
            if(this.getSkillTime(SkillType.WARRIOR_LIEHUO) > dataManager().fightData.getSkillIntervalTime(SkillType.WARRIOR_LIEHUO)) {
                skillType = SkillType.WARRIOR_LIEHUO;
            }
            //野蛮冲撞
            else  if(this.getSkillTime(SkillType.WARRIOR_COLLIDE) > dataManager().fightData.getSkillIntervalTime(SkillType.WARRIOR_COLLIDE)){
                //目标数据
                var target:SceneElementDriver = <SceneElementDriver>this.scene.getElement(this._attackTarget.vo.idString);
                if(!target) return;

                this._collideTarget = target;
                this.setUseSkill(SkillType.WARRIOR_COLLIDE);
                this.isSkillStatus = true;

                var radian:number = Math.atan2(this._attackTarget.vo.y - this._y,this._attackTarget.vo.x - this._x);
                var radius:number = 300;
                var time:number = 500;

                target.lock();
                target.onCollide(this,target,radian,radius,time);

                //释放技能对象数据
                this.play(0,ActionType.WALK,direction);
                radius -= this.getAttackRange();
                //释放技能对象增加时间，因时间相同时，释放技能对象会有可能先于被攻击对象调用结束回调函数
                time += 100;
                this.onCollide(this,target,radian,radius,time);

                this.damage(SkillType.WARRIOR_COLLIDE);

                return;
            }
            //战魂真悟
            else if(this.getSkillTime(SkillType.WARRIOR_ZHANHUN) > dataManager().fightData.getSkillIntervalTime(SkillType.WARRIOR_ZHANHUN)) {
                skillType = SkillType.WARRIOR_ZHANHUN;
            }
            //刺杀剑术
            else if(this.getSkillTime(SkillType.WARRIOR_CISHA) > dataManager().fightData.getSkillIntervalTime(SkillType.WARRIOR_CISHA)) {
                skillType = SkillType.WARRIOR_CISHA;
            }
            else{
                skillType = SkillType.WARRIOR_NORMAL;
            }

            this.setUseSkill(skillType);

            //攻击
            if(this._avatar.actionType == ActionType.ATTACK){
                this.direction = direction;
            }else{
                this.play(0,ActionType.ATTACK,direction);
                this._avatar.setFrameHandler(this.playSkill,this);
            }
        }
        //
        /**
         * 野蛮冲撞移动时
         */
        public onChangeCollide():void{
            if(this.scene){
                this.setXY(this._x,this._y);

                if(RoleManager.getInstance().role == this){
                    this.scene.isoMap.gotoXY2(this._x,this._y);
                }
            }
        }
        //
        /**
         * 野蛮冲撞结束
         * @param master 移动结束对象
         * @param target 冲撞目标对象
         * @param x 移动目标点x
         * @param y 移动目标点y
         */
        public collideComplete(master:SceneElementDriver,target:SceneElementDriver,x:number,y:number):void{
            this.setXY(x,y);

            if(master == this){
                target.unlock();

                this._collideTarget = null;

                this.setUseSkill(SkillType.WARRIOR_COLLIDE);
                this.isSkillStatus = false;

                if(this._attackTarget && (<SceneDriverVo>this._attackTarget.vo).hp <= 0){
                    this.checkAutoAttack2();
                }else{
                    this.attack();
                }
            }
        }
        //
        /**
         * 检测自动攻击2，玩家在攻击结束时检测，不使用定时器方法checkAutoAttack()
         */
        public checkAutoAttack2():void{
            if(this._isLocked) return;
            if(this._attackTarget && (<SceneDriverVo>this._attackTarget.vo).hp <= 0){
                this.chaseArmies(this.armies);
            }else{
                this.attack();
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

            //攻击动作第2帧开始播放技能
            if(this._avatar.frameIndex == 1){
                var skillType:number = this.skillType;
                var skillLevel:number;
                var skillLevel2:number = 0;
                var direction:number = 0;
                var layerType:number = SceneLayerType.BATTLE_EFFECT;
                var x:number = this._x;
                var y:number= this._y;
                var range:number = 0;
                var master:any;
                var offsetY:number = 50;
                var rotation:number;

                //烈火爆破
                if(skillType == SkillType.WARRIOR_LIEHUO) {
                    skillLevel = 5;
                    layerType = SceneLayerType.BACKGROUND_EFFECT;

                    range =  this.getAttackRange(skillType);
                }
                //战魂真悟
                else if(skillType == SkillType.WARRIOR_ZHANHUN) {
                    skillLevel = 3;
                    y -= offsetY;

                    range =  this.getAttackRange(skillType);
                    master = this;
                }
                //刺杀剑术
                else if(skillType == SkillType.WARRIOR_CISHA) {
                    skillLevel = 2;
                    y -= offsetY;

                    var tx:number = this._attackTarget.vo.x;
                    var ty:number = this._attackTarget.vo.y -offsetY;
                    var radian:number = Math.atan2(ty - y , tx - x);
                    rotation = radian / Math.PI * 180 + 90;
                }
                else{
                    skillLevel = 1;
                    skillLevel2 = 1;
                    direction = this.direction;
                    //x = this._attackTarget.vo.x;
                    y -= offsetY;
                }

                var skill:ElementSkill = <ElementSkill>SceneElementManager.getInstance().getElement(ElementSkill);
                skill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation, skillLevel,skillLevel2));
                if(direction > 0)
                    skill.direction = direction;
                if(master)
                    skill.setMaster(master,0,-offsetY);
                if(rotation != null)
                    skill.setEffProperties(rotation);
                this.scene.addElement(skill,layerType,x,y);

                this.damage(skillType,null,range);

            }else if(this._avatar.frameIndex == this._avatar.frameIndexMax){
                this.chaseArmies(this.armies);
                //this.checkAutoAttack2();
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
                case SkillType.WARRIOR_NORMAL:
                case SkillType.WARRIOR_COLLIDE:
                case SkillType.WARRIOR_CISHA:
                    this._damageTargets.push(this._attackTarget);
                    break;
                case SkillType.WARRIOR_ZHANHUN:
                case SkillType.WARRIOR_LIEHUO:
                    return this.getDamageTargetsByRange(this.getAttackRange(skillType),x,y);
                    break;
            }

            return this._damageTargets;
        }
    }
}