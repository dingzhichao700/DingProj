var egret;
(function (egret) {
    /**
     * 主角多角色数据层
     */
    var RoleSceneData = (function () {
        function RoleSceneData() {
            //角色数据
            this._roleList = [];
        }
        var __egretProto__ = RoleSceneData.prototype;
        //
        /**
         * 重置角色hp数据
         */
        __egretProto__.resetRoleData = function () {
            for (var i in this._roleList) {
                this._roleList[i].vo.hp = this._roleList[i].vo.hpTotal = 20000;
            }
        };
        //
        /**
         * 增加角色数据
         * @param vocation
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addRole = function (vocation) {
            if (vocation === void 0) { vocation = 1; }
            var item = new egret.SceneElementDataItem();
            if (vocation == 1) {
                var playerVo = new egret.ScenePlayerVo();
                playerVo.id = egret.SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "德玛西亚"; //vo.nickname;
                playerVo.sex = egret.SexType.MALE;
                playerVo.vocation = egret.VocationType.WARRIOR;
            }
            else if (vocation == 2) {
                playerVo = new egret.ScenePlayerVo();
                playerVo.id = egret.SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "小法师"; //vo.nickname;
                playerVo.sex = egret.SexType.MALE;
                playerVo.vocation = egret.VocationType.MAGE;
            }
            else if (vocation == 3) {
                playerVo = new egret.ScenePlayerVo();
                playerVo.id = egret.SceneElementData.getInstance().getAutoElementId();
                playerVo.idString = playerVo.id + "";
                playerVo.name = "暗影射手"; //vo.nickname;
                playerVo.sex = egret.SexType.MALE;
                playerVo.vocation = egret.VocationType.BOWMAN;
            }
            if (playerVo) {
                item.vo = playerVo;
                this._roleList.push(item);
            }
            return item;
        };
        //
        /**
         * 删除角色数据
         * @param id 角色数据 id
         */
        __egretProto__.removeRole = function (id) {
            for (var i in this._roleList) {
                if (this._roleList[i].vo.id == id) {
                    this._roleList.splice(i, 1);
                    break;
                }
            }
        };
        //
        /**
         * 增加神兽数据
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addAnimal = function (skillLevel) {
            if (skillLevel === void 0) { skillLevel = 1; }
            var item = egret.dataManager().sceneData.addAnimal(skillLevel);
            this._roleList.push(item);
            return item;
        };
        //
        /**
         * 获取多角色数据
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getRoleList = function () {
            return this._roleList;
        };
        return RoleSceneData;
    })();
    egret.RoleSceneData = RoleSceneData;
    RoleSceneData.prototype.__class__ = "egret.RoleSceneData";
})(egret || (egret = {}));
//# sourceMappingURL=RoleSceneData.js.map