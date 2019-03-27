module egret{
    /**
     * 主角多角色数据层
     */
    export class RoleSceneData{
        //角色数据
        private _roleList:Array<SceneElementDataItem> = [];

        public constructor(){

        }
        //
        /**
         * 重置角色hp数据
         */
        public resetRoleData():void{
            for(var i in this._roleList){
                (<SceneDriverVo>this._roleList[i].vo).hp = (<SceneDriverVo>this._roleList[i].vo).hpTotal = 20000;
            }
        }
        //
        /**
         * 增加角色数据
         * @param vocation
         * @returns {SceneElementDataItem}
         */
        public addRole(vocation:number = 1):SceneElementDataItem{
            var item:SceneElementDataItem = new SceneElementDataItem();

            if(vocation == 1){
                var playerVo:ScenePlayerVo = new ScenePlayerVo();

                playerVo.id = SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "德玛西亚"//vo.nickname;
                playerVo.sex = SexType.MALE;
                playerVo.vocation = VocationType.WARRIOR;
            }else if(vocation == 2){
                playerVo = new ScenePlayerVo();
                playerVo.id = SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "小法师"//vo.nickname;
                playerVo.sex = SexType.MALE;
                playerVo.vocation = VocationType.MAGE;
            }else if(vocation == 3){
                playerVo = new ScenePlayerVo();
                playerVo.id = SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "暗影射手"//vo.nickname;
                playerVo.sex = SexType.MALE;
                playerVo.vocation = VocationType.BOWMAN;
            }

            if(playerVo){
                item.vo = playerVo;
                this._roleList.push(item);
            }

            return item;
        }
        //
        /**
         * 删除角色数据
         * @param id 角色数据 id
         */
        public removeRole(id:number):void{
            for(var i in this._roleList){
                if(this._roleList[i].vo.id == id){
                    this._roleList.splice(i,1);
                    break;
                }
            }
        }
        //
        /**
         * 增加神兽数据
         * @returns {SceneElementDataItem}
         */
        public addAnimal(skillLevel:number = 1):SceneElementDataItem{
            var item:SceneElementDataItem = dataManager().sceneData.addAnimal(skillLevel);

            this._roleList.push(item);

            return item;
        }
        //
        /**
         * 获取多角色数据
         * @returns {Array<SceneElementDataItem>}
         */
        public getRoleList():Array<SceneElementDataItem>{
            return this._roleList;
        }
    }
}