var egret;
(function (egret) {
    var SceneElementType = (function () {
        function SceneElementType() {
        }
        var __egretProto__ = SceneElementType.prototype;
        /**
         * NPC 0
         */
        SceneElementType.NPC = 0;
        /**
         * 传送点 1
         */
        SceneElementType.ENTRY_POINT = 1;
        /**
         * 景物 2
         */
        SceneElementType.SCENERY = 2;
        /**
         * 角色出生点 3
         */
        SceneElementType.ROLE_BORN_POINT = 3;
        /**
         * 怪物出生点 4
         */
        SceneElementType.MONSTER_BORN_POINT = 4;
        /**
         * 采集物5
         */
        SceneElementType.COLLECT_GOODS = 5;
        /**
         * 事件点 6
         */
        SceneElementType.EVENT_POINT = 6;
        /**
         * 巡逻路径 7
         */
        SceneElementType.PATROL_PATH = 7;
        /**
         * 怪物 8
         */
        SceneElementType.MONSTER = 8;
        /**
         * 战士 9
         */
        SceneElementType.PLAYER_WARRIOR = 9;
        /**
         * 法师 10
         */
        SceneElementType.PLAYER_MAGE = 10;
        /**
         * 射手 10
         */
        SceneElementType.PLAYER_BOWMAN = 11;
        /**
         * 掉落物品
         */
        SceneElementType.GOODS = 12;
        return SceneElementType;
    })();
    egret.SceneElementType = SceneElementType;
    SceneElementType.prototype.__class__ = "egret.SceneElementType";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementType.js.map