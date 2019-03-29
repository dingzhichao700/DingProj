var egret;
(function (egret) {
    var ActionPartType = (function () {
        function ActionPartType() {
        }
        var __egretProto__ = ActionPartType.prototype;
        /**
        * 主体
        */
        ActionPartType.BODY = "body";
        /**
        * 武器
        */
        ActionPartType.WEAPON = "weapon";
        /**
        * 翅膀
        */
        ActionPartType.WING = "wing";
        /**
        * 坐骑
        */
        ActionPartType.MOUNTS = "mounts";
        /**
         * 全部动作部件类型集合
         */
        ActionPartType.TYPES = [ActionPartType.BODY, ActionPartType.WEAPON, ActionPartType.WING, ActionPartType.MOUNTS];
        /**
         * 普通状态动作部件类型集合
         */
        ActionPartType.TYPES_NORMAL = [ActionPartType.BODY, ActionPartType.WEAPON, ActionPartType.WING];
        /**
         * 只有主体部件
         */
        ActionPartType.TYPES_BODY_ONLY = [ActionPartType.BODY];
        //以下在数组中索引越小层级越高
        /**
         * 上方向，部件层级配置
         */
        ActionPartType.DIRECTION_UP = [
            ActionPartType.WING,
            ActionPartType.WEAPON,
            ActionPartType.BODY,
            ActionPartType.MOUNTS
        ];
        /**
         * 右上方向，部件层级配置
         */
        ActionPartType.DIRECTION_UP_RIGHT = [
            ActionPartType.WING,
            ActionPartType.WEAPON,
            ActionPartType.BODY,
            ActionPartType.MOUNTS
        ];
        /**
         * 右方向，部件层级配置
         */
        ActionPartType.DIRECTION_RIGHT = [
            ActionPartType.WING,
            ActionPartType.WEAPON,
            ActionPartType.BODY,
            ActionPartType.MOUNTS
        ];
        /**
         * 右下方向，部件层级配置
         */
        ActionPartType.DIRECTION_DOWN_RIGHT = [
            ActionPartType.WEAPON,
            ActionPartType.BODY,
            ActionPartType.WING,
            ActionPartType.MOUNTS
        ];
        /**
         * 下方向，部件层级配置
         */
        ActionPartType.DIRECTION_DOWN = [
            ActionPartType.WEAPON,
            ActionPartType.BODY,
            ActionPartType.WING,
            ActionPartType.MOUNTS
        ];
        return ActionPartType;
    })();
    egret.ActionPartType = ActionPartType;
    ActionPartType.prototype.__class__ = "egret.ActionPartType";
})(egret || (egret = {}));
