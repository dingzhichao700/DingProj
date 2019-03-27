module egret{
    /**
     * 召唤兽
     */
    export class PlayerAnimal extends ElementPlayer{
        /**
         * 所属主人
         */
        public master:PlayerBowman;
        //
        public constructor(){
            super();
        }
        //
        /**
         * 设置场景元素数据
         * @param value:SceneElementDataItem
         *
         */
        public setData(value:SceneElementDataItem):void{
            super.setData(value);

            SceneElementData.getInstance().setSceneAvatarVo(this._sceneAvatarVo,value.lo);
        }
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
        public play(frameIndex:number = -1,actionType:number = -1,direction:number = -1,loopCount:number = 0,callBack:Function = null,thisObj:any = null,startFun:Function = null,startObj:any = null):void{
            if(this._isDestroy) return;
            if(!this._sceneAvatarVo.body) return;

            if(callBack && !thisObj){
                throw new Error("未指定回调函数对象");
            }

            this._partTypes = ActionPartType.TYPES_BODY_ONLY;
            //先播放，以设置动作类型和方向
            this._avatar.play(frameIndex,actionType,direction,loopCount,callBack,thisObj,startFun,startObj);
            this._avatar.setPartTypes(this._partTypes,this.getPartUrl,this,this.loadActionComplete,this);

            this._namePad.y = this._avatar.topLineY;

            this.clearAttack();
        }
        //
        /**
         * 获取优先攻击对象，各职业重写
         * @returns {null}
         */
        public getPriorityTarget():SceneElementDataItem{
            return null;
        }
        //
        /**
         * 获取部件影片地址
         * @param partType:String ActionPartType 动作影片类型
         * @return
         */
        public getPartUrl(partType:string):string{
            var path:string = PathData.PATH_MOVIES_MONSTER;

            var movie:string = this._sceneAvatarVo[partType];

            var url:string = dataManager().sceneElementData.getActionUrl(path,movie,this._avatar.actionType);

            return url;
        }
        //
        /**
         * 释放默认技能
         */
        public playSkill():void{
            if(this._avatar.frameIndex == 1){
                this.damage();
            }else if(this._avatar.frameIndex == this._avatar.frameIndexMax){
                this.chaseArmies(this.armies);
            }
        }
    }
}