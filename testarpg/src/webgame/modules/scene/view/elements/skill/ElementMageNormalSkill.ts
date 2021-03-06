module egret{
    /**
     * 法师和射手普通攻击技能，打出去后
     */
    export class ElementMageNormalSkill extends ElementEffect{
        //攻击目标
        private _attackTarget:SceneElementDataItem;
        //攻击目标点偏移x,y
        private _offsetAttackX:number;
        private _offsetAttackY:number;
        //是否已移动达到目标点
        private _isEnd:boolean;
        //缓动缓存
        private _tweenChangeParam:any = {};
        private _tweenToParam:any = {};

        public constructor(){
            super();
        }
        //
        public addToScene():void{
            super.addToScene();

            this.play(0,ActionType.PREPARE,this._avatar.direction,this.playCount,this.playEnd,this);
        }
        //
        public removeFromScene():void{
            super.removeFromScene();

            this.playCount = 0;
        }
        //
        /**
         * 攻击目标
         * @param x 技能初始x
         * @param y 技能初始y
         * @param data 攻击目标数据
         * @param offsetX 攻击目标点偏移x
         * @param offsetY 攻击目标点偏移y
         * @param offsetRotation 攻击目标点偏移角度，因动作图片本身可能已有角度，用此参数纠正
         * @param radius 技能移动半径
         * @param time 移动时间
         */
        public attackTo(x:number,y:number,data:SceneElementDataItem,offsetX:number,offsetY:number,offsetRotation:number,radius:number,time:number = 600):void{
            if(!data){
                this.moveComplete();
                return;
            }

            this._attackTarget = data;
            this._offsetAttackX = offsetX;
            this._offsetAttackY = offsetY;

            this.x = x;
            this.y = y;

            var tx:number = this._attackTarget.vo.x + this._offsetAttackX;
            var ty:number = this._attackTarget.vo.y + this._offsetAttackY;

            var radian:number = Math.atan2(ty - y , tx - x);

            tx = Math.cos(radian) * radius + x;
            ty = Math.sin(radian) * radius + y;

            radian = radian / Math.PI * 180;
            this.rotation = radian + offsetRotation;

            this._isEnd = false;

            this._tweenChangeParam.onChange = this.onChange;
            this._tweenChangeParam.onChangeObj = this;

            this._tweenToParam.x = tx;
            this._tweenToParam.y = ty;

            Tween.get(this,this._tweenChangeParam).to(this._tweenToParam,time).call(this.moveComplete,this);
        }
        //
        /**
         * 技能移动时
         */
        private onChange():void{
            if(this._isEnd){
                this.moveComplete();
                return;
            }

            var x:number = this._attackTarget.vo.x + this._offsetAttackX;
            var y:number = this._attackTarget.vo.y + this._offsetAttackY;

            var distance:number = DimensionUtil.distance2(this._x,this._y,x,y);

            if(Math.abs(distance) < 10){
                this._isEnd = true;
            }
        }
        //
        /**
         * 技能移动结束
         */
        private moveComplete():void{
            Tween.removeTweens(this);
            this.playEnd();
        }
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        public getPartUrl(partType:string):string{
            var path:string = PathData.PATH_MOVIES_SKILL;

            var movie:string = this._sceneAvatarVo[partType];

            var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);

            return url;
        }
    }
}