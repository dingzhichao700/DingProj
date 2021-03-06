module egret{
    
    /**主角多角色管理器*/
    export class RoleManager{
        
        //主角角色
        private _roles:Array<ElementPlayer> = [];
        //当前场景
        private _scene:SceneDriver = null;
        //角色目标点
        private _rolePoints:Array<Point> = [];
        //神兽
        private _animal:PlayerAnimal;

        private static _instance: RoleManager;
        
        public static  getInstance():egret.RoleManager {
            return this._instance || (this._instance = new egret.RoleManager());
        }

        public constructor() {
            this.addRole(1);
            this.addRole(2);
            this.addRole(3);
        }

        /**主角角色数组*/
        public get roles():Array<ElementPlayer>{
            return this._roles;
        }

        /**主角色*/
        public get role():ElementPlayer{
            return this._roles[0];
        }

        /**主角色是否死亡*/
        public get isDead():boolean{
            return (<ScenePlayerVo>this.role.data.vo).hp <= 0;
        }

        /**
         * 是否有神兽
         * @returns {PlayerAnimal|SceneElementDataItem|boolean}
         */
        public get hasAnimal():boolean {
            return this._animal && this._animal.data && (<SceneDriverVo>this._animal.data.vo).hp > 0;
        }

        /**
         * 增加角色数据
         * @param vocation
         * @returns {SceneElementDataItem}
         */
        public addRole(vocation:number = 1):void{
            var item:SceneElementDataItem = dataManager().roleSceneData.addRole(vocation);

            var role:ElementPlayer;

            if(vocation == VocationType.WARRIOR){
                role = <PlayerWarrior>SceneElementManager.getInstance().getElement(PlayerWarrior);
            }else if(vocation == VocationType.MAGE){
                role = <PlayerMage>SceneElementManager.getInstance().getElement(PlayerMage);
            }else if(vocation == VocationType.BOWMAN){
                role = <PlayerBowman>SceneElementManager.getInstance().getElement(PlayerBowman);
            }

            role.setData(item);
            role.setHPStyle(
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_green_bg.png"),
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_green.png"),
                49,8
            )
            this._roles.push(role);

            if(this._roles.length > 1){
                if(this._scene) {
                    var radius: number = 150;
                    var radian: number = Math.PI * 2 * Math.random();
                    var x: number = Math.cos(radian) * radius + this.role.x;
                    var y: number = Math.sin(radian) * radius + this.role.y;
                    this._scene.addElement(role,SceneLayerType.BIOLOGY,x,y);
                }
                role.chaseArmies(this.role.armies);

                globalUpdateWindows([UpdateType.ADD_ROLE]);
            }
        }

        /**删除角色*/
        public removeRole(id:number):void{
            //主角色不回收，次角色可回收
            if(id == this.role.data.vo.id){
                if(this._scene)
                    this._scene.removeElement(this.role,false);
                return;
            }

            dataManager().roleSceneData.removeRole(id);

            for(var i in this._roles){
                if(this._roles[i].data.vo.id == id){
                    //先删除才能回收
                    var targets:Array<any> = this._roles.splice(i,1);

                    if(this._scene)
                        this._scene.removeElement(targets[0]);

                    if(this._roles[i] instanceof PlayerAnimal){
                        this._animal = null;
                    }
                    break;
                }
            }
        }

        /**
         * 增加神兽
         * @returns {SceneElementDataItem}
         */
        public addAnimal(master:ElementPlayer):void{
            var item:SceneElementDataItem = dataManager().roleSceneData.addAnimal();
            this._animal = <PlayerAnimal>SceneElementManager.getInstance().getElement(PlayerAnimal);
            this._animal.setData(item);
            this._animal.setHPStyle(
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_green_bg.png"),
                dataManager().pathData.getResourceUrl(PathData.PATH_IMAGES_SCENE,"hp_green.png"),
                49,8
            )
            this._roles.push(this._animal);

            var radius:number = 150;
            var radian:number = Math.PI * 2 * Math.random();
            var x:number = Math.cos(radian) * radius + master.x;
            var y:number = Math.sin(radian) * radius + master.y;

            if(this._scene)
                this._scene.addElement(this._animal,SceneLayerType.BIOLOGY,x,y);
            this._animal.chaseArmies(master.armies);

            globalUpdateWindows([UpdateType.ADD_ROLE]);
        }

        /**复活主角色*/
        public revive():void{
            dataManager().roleSceneData.resetRoleData();
            RoleManager.getInstance().updateHp();
            if(this._scene)
                this._scene.addElement(this.role,SceneLayerType.BIOLOGY,this.role.x,this.role.y);
        }

        /**
         * 设置主角坐标数据
         * @param x:int x坐标
         * @param y:int y坐标
         */
        public setElementPlayerXY(x:number,y:number = 0):void{
            var points:Array<Point> = this.getElementPlayersPoints(x,y);
            for(var i in this._roles){
                this._roles[i].data.vo.x = points[i].x;
                this._roles[i].data.vo.y = points[i].y;
                this._roles[i].updateXY();
                //LogManager.debug(this,"setElementPlayerXY() vocation = " + this._roles[i].data.vo["vocation"],points[i].x,points[i].y,this._roles[i].x,this._roles[i].y);
            }
        }

        /**
         * 获取所有角色目标点
         * @param x 主角色目标点x
         * @param y 主角色目标点y
         * @returns {Array<Point>}
         */
        private getElementPlayersPoints(x:number,y:number):Array<Point>{
            var radius:number = 150;
            var radian:number = 0;

            for(var i = 0; i < this._roles.length; i++){
                var point:Point = this._rolePoints[i];
                if(!point){
                    point = new egret.Point();
                    this._rolePoints[i] = point;
                }

                if(i == 0){
                    rx = x;
                    ry = y;
                }else{
                    var rx:number = x + Math.cos(radian) * radius;
                    var ry:number = y + Math.sin(radian) * radius;

                    radian += Math.PI / 2;
                }
                point.x = rx;
                point.y = ry;
            }
            return this._rolePoints;
        }

        /**
         * 主角移动至坐标
         * @param x:Number
         * @param y:Number
         */
        public moveTo(x:number,y:number,isCheckPart:boolean = true):void{
            if(!this._scene) 
                return;

            var points:Array<Point> = this.getElementPlayersPoints(x,y);
            for(var i in this._roles){
                this._roles[i].moveTo(points[i].x,points[i].y,isCheckPart);
            }
        }

        /**
         * 主角移动至坐标，不寻路，移动到节点
         * @param x:Number
         * @param y:Number
         */
        public moveTo2(x:number,y:number):void{
            if(!this._scene) return;

            var points:Array<Point> = this.getElementPlayersPoints(x,y);
            for(var i in this._roles){
                this._roles[i].moveTo2(points[i].x,points[i].y);
            }
        }

        /**
         * 移动至目标位置，不寻路，忽略节点数据
         * @param x:Number x坐标
         * @param y:Number y坐标
         */
        public moveTo3(x:number,y:number):void{
            if(!this._scene) return;

            var points:Array<Point> = this.getElementPlayersPoints(x,y);
            for(var i in this._roles){
                this._roles[i].moveTo3(points[i].x,points[i].y);
            }
        }

        /**所有角色停止移动*/
        public stopMove():void{
            for(var i in this._roles){
                this._roles[i].stopMove();
            }
        }
        
        /**所有角色停止所有战斗行为*/
        public stopAll():void{
            for(var i in this._roles){
                this._roles[i].stopAll();
            }
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
            for(var i in this._roles){
                this._roles[i].play.apply(this._roles[i],arguments);
            }
        }

        /**
         * 显示主角
         * @param scene:SceneDriver 场景
         * @param x:Number x 坐标
         * @param y:Number y 坐标
         */
        public showPlayer(scene:SceneDriver,x:number,y:number):void{
            if(scene && this._scene != scene){
                this._scene = scene;

                for(var i in this._roles){
                    this._scene.addElement(this._roles[i],SceneLayerType.BIOLOGY);
                }
            }

            this.setElementPlayerXY(x,y);
            this.stopMove();
            this.play(-1,ActionType.PREPARE,ActionMovieClipDirectionType.DOWN);
        }
        
        /**移除主角*/
        public hidePlayer():void{
            if(this._scene){
                this.stopMove();
                for(var i in this._roles){
                    this._scene.removeElement(this._roles[i],false);
                }
                this._scene = null;
            }
        }

        /**场景切换*/
        public changeScene(scene:SceneDriver):void{
            if(scene != this._scene) return;

            for(var i in this._roles){
                this._roles[i].clearFollowPoints();
                this._roles[i].stopMove();
            }
        }

        /**更新血量显示*/
        public updateHp():void{
            for(var i in this._roles){
                this._roles[i].updateHp();
            }
        }
        /**
         * 换装更新
         * @param id 角色 id
         */
        public updateAvatar(id:number):void{
            for(var i in this._roles){
                if(this._roles[i].data.vo.id == id){
                    this._roles[i].updateAvatar(this._roles[i].data);
                    break;
                }
            }
        }
        
        /**
         * 追击敌人
         * @param armies 敌人数据
         */
        public chaseArmies(armies:Array<SceneElementDataItem>):void{
            for(var i in this._roles){
                this._roles[i].chaseArmies(armies);
            }
        }

        /**
         * 是否为主角角色
         * @param element 角色
         * @returns {boolean}
         */
        public isRoleInstance(element:any):boolean{
            return this._roles.indexOf(element) > -1;
        }

        /**切换场景特效*/
        public changeSceneEffect():void{
            for(var i in this._roles){
                this._roles[i].changeSceneEffect();
            }
        }

        /**进入场景特效*/
        public enterSceneEffect():void{
            for(var i in this._roles){
                this._roles[i].enterSceneEffect();
            }
        }
        
    }
}