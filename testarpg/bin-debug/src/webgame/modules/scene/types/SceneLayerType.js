var egret;
(function (egret) {
    var SceneLayerType = (function () {
        function SceneLayerType() {
        }
        var __egretProto__ = SceneLayerType.prototype;
        /**
         * 层级配置
         */
        SceneLayerType.LAYER_MOUSE_CONFIGS = [
            { touchEnabled: false, touchChildren: false },
            { touchEnabled: false, touchChildren: true },
            { touchEnabled: false, touchChildren: false },
            { touchEnabled: false, touchChildren: true },
            { touchEnabled: false, touchChildren: true },
            { touchEnabled: false, touchChildren: false },
            { touchEnabled: false, touchChildren: false },
            { touchEnabled: false, touchChildren: false }
        ];
        /**
         * 场景提示特效(任务提示特效等) 7
         */
        SceneLayerType.TIP_EFFECT = 7;
        /**
         * 前景层(静态或动态景物)  6
         */
        SceneLayerType.FRONT_VIEW = 6;
        /**
         * 战斗效果层(上层技能效果等) 5
         */
        SceneLayerType.BATTLE_EFFECT = 5;
        /**
         * 生物层(角色，npc等) 4
         */
        SceneLayerType.BIOLOGY = 4;
        /**
         * 物品层 3
         */
        SceneLayerType.GOODS = 3;
        /**
         * 地面特效层(下层技能效果等) 2
         */
        SceneLayerType.BACKGROUND_EFFECT = 2;
        /**
         * 近景层(地图或静态或动态景物)  1
         */
        SceneLayerType.NEARBY_VIEW = 1;
        /**
         * 远景层(静态或动态景物) 0
         */
        SceneLayerType.DISTANT_VIEW = 0;
        return SceneLayerType;
    })();
    egret.SceneLayerType = SceneLayerType;
    SceneLayerType.prototype.__class__ = "egret.SceneLayerType";
})(egret || (egret = {}));
