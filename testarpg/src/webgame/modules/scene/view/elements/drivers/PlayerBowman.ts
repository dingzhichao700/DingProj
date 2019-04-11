module egret{
    /**射手*/
    export class PlayerBowman extends ElementPlayer{
        
        //神兽
        private _animal:PlayerAnimal;

        public constructor(){
            super();
        }

        /**
         * 获取攻击范围，不同职业和怪物重写
         * @param skillType 技能类型
         * @returns {number}
         */
        public getAttackRange(skillType:number = 0):number{
            return 300;
        }
        
        /**玩家攻击方法*/
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

            //召唤神兽
            if(this.getSkillTime(SkillType.BOWMAN_CALL) > dataManager().fightData.getSkillIntervalTime(SkillType.BOWMAN_CALL)){
                if(RoleManager.getInstance().isRoleInstance(this)){
                    if(!RoleManager.getInstance().hasAnimal){
                        this.setUseSkill(SkillType.BOWMAN_CALL);
                        RoleManager.getInstance().addAnimal(this);
                    }
                }else if(!this.hasAnimal){
                    this.setUseSkill(SkillType.BOWMAN_CALL);
                    this.addAnimal(this);
                }
            }

            //攻击
            if(this._avatar.actionType == ActionType.ATTACK){
                this.direction = direction;
            }else{
                this.play(0,ActionType.ATTACK,direction);
                this._avatar.setFrameHandler(this.playSkill,this);
            }
        }

        /**
         * 增加神兽
         * @returns {SceneElementDataItem}
         */
        public addAnimal(master:ElementPlayer):void{
            var item:SceneElementDataItem = dataManager().sceneData.addAnimal();
            this._animal = <PlayerAnimal>SceneElementManager.getInstance().getElement(PlayerAnimal);
            this._animal.setData(item);
            this._animal.setHPStyle(
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_red_bg.png"),
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_red.png"),
                49,8
            )
            this._animal.master = this;

            var radius:number = this.getAttackRange();
            var radian:number = Math.PI * 2 * Math.random();
            var x:number = Math.cos(radian) * radius + master.x;
            var y:number = Math.sin(radian) * radius + master.y;

            if(this.scene)
                this.scene.addElement(this._animal,SceneLayerType.BIOLOGY,x,y);
            this._animal.chaseArmies(master.armies);

            globalUpdateWindows([UpdateType.ADD_MONSTER],item);
        }

        /**清空神兽*/
        public removeAnimal():void{
            this._animal = null;
        }

        /**
         * 是否已有神兽
         * @returns {PlayerAnimal|boolean}
         */
        public get hasAnimal():boolean{
            return this._animal && (<SceneDriverVo>this._animal.data.vo).hp > 0;
        }

        /**释放技能*/
        public playSkill():void {
            if (!this.scene) return;

            //职业及技能类型处理
            var playerVo:ScenePlayerVo = <ScenePlayerVo>this.data.vo;

            if(this._avatar.frameIndex == 2){
                var mageSkill:ElementMageNormalSkill = <ElementMageNormalSkill>SceneElementManager.getInstance().getElement(ElementMageNormalSkill);
                mageSkill.setMovieName(SceneElementData.getInstance().getSkillMovieName(playerVo.vocation,1));
                this.scene.addElement(mageSkill,SceneLayerType.BATTLE_EFFECT);
                mageSkill.attackTo(this.x,this.y - 50,this._attackTarget,0,-50,90,this.getAttackRange());

                this.damage(SkillType.BOWMAN_NORMAL);
            }else if(this._avatar.frameIndex == this._avatar.frameIndexMax){
                this.chaseArmies(this.armies);
                //this.checkAutoAttack2();
            }
        }
        
    }
}