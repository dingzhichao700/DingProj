var egret;
(function (egret) {
    var ItemManager = (function () {
        function ItemManager() {
        }
        var __egretProto__ = ItemManager.prototype;
        ItemManager.getInstance = function () {
            if (!ItemManager._instance) {
                ItemManager._instance = new ItemManager();
            }
            return ItemManager._instance;
        };
        __egretProto__.initCfg = function () {
            if (!this.itemCfgs) {
                this.itemCfgs = [];
                for (var i = 0; i < ItemManager.ITEM_CONFIG.length; i++) {
                    var str = ItemManager.ITEM_CONFIG[i];
                    var strList = str.split(",");
                    var cfg = new egret.ItemConfig();
                    cfg.id = Number(strList[0]);
                    cfg.name = strList[1];
                    cfg.quality = Number(strList[2]);
                    this.itemCfgs.push(cfg);
                }
            }
        };
        /**获取item配置*/
        __egretProto__.getCfg = function (id) {
            this.initCfg();
            for (var i = 0; i < this.itemCfgs.length; i++) {
                var cfg = this.itemCfgs[i];
                if (cfg.id == id) {
                    return cfg;
                }
            }
            return null;
        };
        __egretProto__.getQuaByType = function (index) {
            return ItemManager.ITEM_QUALITY[index];
        };
        ItemManager.ITEM_QUALITY = ["", "白色", "橙色", "紫色", "红色", "幻彩"];
        ItemManager.ITEM_CONFIG = [
            "1,千钧,2",
            "2,回旋刃,1",
            "3,血滴子,1",
            "4,峨眉爪,1",
            "5,峨眉刺,1",
            "6,峨眉刺,1",
            "7,峨眉刺,1",
            "8,峨眉刺,1",
            "9,双股剑,5",
            "10,乾坤宝珠,4",
            "11,峨眉刺,1",
            "12,峨眉刺,1",
            "13,峨眉刺,3",
            "14,峨眉刺,3",
            "15,峨眉刺,3",
            "16,峨眉刺,3",
            "17,峨眉刺,3",
            "18,峨眉刺,3",
            "19,峨眉刺,3",
            "20,峨眉刺,3",
            "21,峨眉刺,3",
            "22,峨眉刺,3",
            "23,峨眉刺,3",
            "24,峨眉刺,3",
            "25,峨眉刺,3",
            "26,峨眉刺,3"
        ];
        return ItemManager;
    })();
    egret.ItemManager = ItemManager;
    ItemManager.prototype.__class__ = "egret.ItemManager";
})(egret || (egret = {}));
