var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret;
(function (egret) {
    var ItemManager = (function () {
        function ItemManager() {
        }
        ItemManager.getInstance = function () {
            if (!ItemManager._instance) {
                ItemManager._instance = new ItemManager();
            }
            return ItemManager._instance;
        };
        ItemManager.prototype.initCfg = function () {
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
        ItemManager.prototype.getCfg = function (id) {
            this.initCfg();
            for (var i = 0; i < this.itemCfgs.length; i++) {
                var cfg = this.itemCfgs[i];
                if (cfg.id == id) {
                    return cfg;
                }
            }
            return null;
        };
        ItemManager.prototype.getQuaByType = function (index) {
            return ItemManager.ITEM_QUALITY[index];
        };
        return ItemManager;
    }());
    ItemManager.ITEM_QUALITY = ["白色", "橙色", "紫色", "红色", "幻彩"];
    ItemManager.ITEM_CONFIG = [
        "1,千钧,2",
        "2,回旋刃,1",
        "3,血滴子,1",
        "4,峨眉爪,1",
        "5,峨眉刺,1",
        "6,峨眉刺,1",
        "7,峨眉刺,1",
        "8,峨眉刺,1",
        "9,峨眉刺,1",
        "10,峨眉刺,1",
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
    egret.ItemManager = ItemManager;
    __reflect(ItemManager.prototype, "egret.ItemManager");
})(egret || (egret = {}));
//# sourceMappingURL=ItemManager.js.map