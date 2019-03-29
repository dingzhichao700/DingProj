var egret;
(function (egret) {
    var ActionType = (function () {
        function ActionType() {
        }
        var __egretProto__ = ActionType.prototype;
        /**
         * 最大值
         */
        ActionType.MAX = ActionType.ATTACK_GROUP;
        /**
         * 待机
         */
        ActionType.PREPARE = 1;
        /**
         * 行走
         */
        ActionType.WALK = 2;
        /**
         * 攻击
         */
        ActionType.ATTACK = 3;
        /**
         * 受击
         */
        ActionType.HIT = 4;
        /**
         * 死亡
         */
        ActionType.DEAD = 5;
        /**
         * 单体攻击
         */
        ActionType.ATTACK_SINGLE = 6;
        /**
         * 群体攻击
         */
        ActionType.ATTACK_GROUP = 7;
        return ActionType;
    })();
    egret.ActionType = ActionType;
    ActionType.prototype.__class__ = "egret.ActionType";
})(egret || (egret = {}));
