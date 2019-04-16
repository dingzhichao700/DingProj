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
                    cfg.desc = strList[3];
                    var attrs = strList[4];
                    if (attrs) {
                        var attrList = attrs.split("|");
                        cfg.attrs = new Object();
                        for (var j = 0; j < attrList.length; j++) {
                            var value = attrList[j].split(":");
                            cfg.attrs[value[0]] = Number(value[1]);
                        }
                    }
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
        ItemManager.getNameByType = function (type) {
            var str = "";
            switch (type) {
                case "atk":
                    str = "攻击";
                    break;
                case "def":
                    str = "防御";
                    break;
                case "hp":
                    str = "生命";
                    break;
                case "str":
                    str = "力量";
                    break;
                case "agili":
                    str = "敏捷";
                    break;
                case "luc":
                    str = "运气";
                    break;
                case "intel":
                    str = "智力";
                    break;
            }
            return str;
        };
        ItemManager.ITEM_QUALITY = ["", "白色", "橙色", "紫色", "红色", "幻彩"];
        ItemManager.ITEM_CONFIG = [
            "1,暴雨梨花针,1,唐门特制暗器之一，是镇门至宝，只有门中高人才配使用,atk:70|agili:20",
            "2,血刃,1,刃边阴冷无比，会吸收敌人的血液，是种十分阴邪的武器,atk:50|agili:30",
            "3,血滴子,1,杀人利器，杀人于无形之中，造成创口面积小，但是威力巨大,atk:90",
            "4,袖爪,1,隐藏在长袍中，可发动出其不意的进攻，常用于刺杀,atk:100|str:40|agili:40",
            "5,孔明扇,1,一扇生水二扇生火，对敌人造成毁灭性的打击,atk:30|intel:50",
            "6,风轮,1,其速如风，无可闪避，外圈的刀刃可脱离轮心,atk:40|agili:40",
            "7,子母雷,1,双雷一起爆，杀伤力极大，非一般人所能抵御,str:10|agili:10",
            "8,阎王贴,1,中者难活，阎王难救，世间罕有的独门武器，一经发现必会兴起一场腥风血雨,intel:10|agili:20",
            "9,龙须针,1,针体细小，伤害巨大，蜷缩在人体筋肉中，非特定手法不可取出,atk:10|agili:20",
            "10,明珠结,1,佩戴可辅助修炼，定心顺气，由预防走火入魔的功效,hp:100|agili:20",
            "11,秘银胸甲,1,佩戴后防御提升，以秘银打造，是军士常用的防具,def:100|str:50",
            "12,秘银护手,1,以古法对秘银进行萃取，提升秘银韧性的护手，也常用作饰品,def:70|str:30",
            "13,镀金护手,2,富人用来满足虚荣心而镀的真金护手，虚有其表,def:120|str:50",
            "14,绛蓝护手,3,被强大僧人施加法咒的护手，是防具种对攻杀加成的部位,def:210|str:50",
            "15,秘银护腿,1,佩戴后减少腿部受到的伤害，以秘银打造，附带自我修复能力,def:70|str:50",
            "16,镀金护腿,2,传说中永不染血的护腿，亦受众多大师推崇,def:120|str:50",
            "17,绛蓝护腿,3,被法咒加成的护腿，大大提升防御力，有价无市,def:210|str:50",
            "18,秘银长靴,1,佩戴后可提升行进速度，以秘银打造，易被重型武器穿透,def:70|str:50",
            "19,镀金长靴,2,比秘银长靴耐久更高的长靴，是重型骑兵常备装备,def:120|str:50",
            "20,绛蓝长靴,3,穿戴后行走如风，身姿轻盈，可日行千里,def:210|str:50",
            "21,护心戒,4,世家供奉的戒指，世间少有，防御力惊人,atk:90|def:90|hp:180|intel:50",
            "22,无畏戒,5,佩戴后提升佩戴者勇气，可鼓舞士气，与人以无所畏惧的气势,atk:250|hp:800|str:200|intel:200|luc:200",
            "23,修罗头盔,4,传说战场战神佩戴的头盔，煞气浓厚，常有佩戴者被此盔吞噬灵魂,str:100|agili:100|def:80|hp:150",
            "24,紫水晶,3,战斗时可镇定人心神，大大提升士气，长期使用会使人精神疲惫,str:100|agili:100|hp:100",
            "25,蓝水晶,2,战斗时可提升使用者防御，常镶嵌在盔甲上，对盔甲进行防御加成,intel:30|hp:150",
            "26,强化石,2,用于装备强化，使用后提升装备属性"
        ];
        return ItemManager;
    })();
    egret.ItemManager = ItemManager;
    ItemManager.prototype.__class__ = "egret.ItemManager";
})(egret || (egret = {}));
//# sourceMappingURL=ItemManager.js.map