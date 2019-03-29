var egret;
(function (egret) {
    var SceneElementManager = (function () {
        /**
         * 构造函数
         */
        function SceneElementManager() {
            //场景元素缓存数量配置
            this.COUNT_ELEMENT_CACHE = {
                ElementMonster: 6,
                ElementSkill: 5,
                ElementEffect: 5,
                ElementGoods: 8,
                ElementMageNormalSkill: 3,
                PlayerAnimal: 2,
                PlayerWarrior: 2,
                PlayerMage: 2,
                PlayerBowman: 2
            };
            //场景元素缓存 
            this._elementCache = null;
            //标记场景元素是否已回收
            this._elementFlagMap = null;
            //场景数据
            this._sceneData = null;
            this._elementCache = new egret.HashMap();
            this._elementFlagMap = new egret.HashMap();
            this._sceneData = egret.dataManager().sceneData;
        }
        var __egretProto__ = SceneElementManager.prototype;
        SceneElementManager.getInstance = function () {
            if (!SceneElementManager._instance)
                SceneElementManager._instance = new SceneElementManager();
            return SceneElementManager._instance;
        };
        //
        /**
         * 获取场景元素实例，并缓存
         * @param cls:Class:Class 场景元素类
         * @return
         *
         */
        __egretProto__.getElement = function (cls) {
            var array = this.getElementCacheArray(this.getElementType(cls));
            var element = null;
            if (array.length > 0) {
                element = array.pop();
                this._elementFlagMap.remove(element.hashCode);
            }
            else {
                element = new cls();
            }
            return element;
        };
        //
        /**
         * 回收场景元素
         * @param element:SceneElement
         *
         */
        __egretProto__.recoverElement = function (element) {
            if (!element) {
                egret.LogManager.error(this, "回收场景元素element为空");
                return;
            }
            if (this._elementFlagMap.containsKey(element.hashCode)) {
                egret.LogManager.error(this, "重复回收场景元素:element = " + element + ",id = " + element.id);
                return;
            }
            //if(element == Role.getInstance()){
            //	//主角，宠物等不用回收
            //	return;
            //}
            if (egret.RoleManager.getInstance().isRoleInstance(element)) {
                //主角，宠物等不用回收
                return;
            }
            var type = this.getElementType(element);
            var array = this.getElementCacheArray(type);
            if (!this.COUNT_ELEMENT_CACHE[type]) {
                egret.LogManager.error(this, "未配置场景元素缓存数量 type = " + type);
                throw new Error("未配置场景元素缓存数量 type = " + type);
            }
            if (array.length < this.COUNT_ELEMENT_CACHE[type]) {
                array.push(element);
                this._elementFlagMap.put(element.hashCode, true);
            }
            else {
                var index = array.indexOf(element);
                if (index != -1)
                    array.splice(index, 1);
                this._elementFlagMap.remove(element.hashCode);
                element.destroy();
            }
        };
        //
        /**
         * 获取场景元素缓存
         * @param element:*
         * @return
         *
         */
        __egretProto__.getElementCacheArray = function (type) {
            var array = this._elementCache.get(type);
            if (!array) {
                array = [];
                this._elementCache.put(type, array);
            }
            return array;
        };
        //
        /**
         * 根据场景元素实例获取类型
         * @param target:* 场景元素实例
         * @return
         *
         */
        __egretProto__.getElementType = function (target) {
            var type = null;
            if (target == egret.PlayerAnimal || target instanceof egret.PlayerAnimal) {
                type = SceneElementManager.ELEMENT_PLAYER_ANIMAL;
            }
            else if (target == egret.PlayerWarrior || target instanceof egret.PlayerWarrior) {
                type = SceneElementManager.ELEMENT_PLAYER_WARRIOR;
            }
            else if (target == egret.PlayerMage || target instanceof egret.PlayerMage) {
                type = SceneElementManager.ELEMENT_PLAYER_MAGE;
            }
            else if (target == egret.PlayerBowman || target instanceof egret.PlayerBowman) {
                type = SceneElementManager.ELEMENT_PLAYER_BOWMAN;
            }
            else if (target == egret.ElementMonster || target instanceof egret.ElementMonster) {
                type = SceneElementManager.ELEMENT_MONSTER;
            }
            else if (target == egret.ElementSkill || target instanceof egret.ElementSkill) {
                type = SceneElementManager.ELEMENT_SKILL;
            }
            else if (target == egret.ElementMageNormalSkill || target instanceof egret.ElementMageNormalSkill) {
                type = SceneElementManager.ELEMENT_MAGE_NORMAL_SKILL;
            }
            else if (target == egret.ElementEffect || target instanceof egret.ElementEffect) {
                type = SceneElementManager.ELEMENT_EFFECT;
            }
            else if (target == egret.ElementGoods || target instanceof egret.ElementGoods) {
                type = SceneElementManager.ELEMENT_GOODS;
            }
            return type;
        };
        SceneElementManager._instance = null;
        /**
         * 场景元素缓存字段
         * @type {string}
         */
        SceneElementManager.ELEMENT_PLAYER = "ElementPlayer";
        SceneElementManager.ELEMENT_MONSTER = "ElementMonster";
        SceneElementManager.ELEMENT_EFFECT = "ElementEffect";
        SceneElementManager.ELEMENT_SKILL = "ElementSkill";
        SceneElementManager.ELEMENT_GOODS = "ElementGoods";
        SceneElementManager.ELEMENT_MAGE_NORMAL_SKILL = "ElementMageNormalSkill";
        SceneElementManager.ELEMENT_PLAYER_ANIMAL = "PlayerAnimal";
        SceneElementManager.ELEMENT_PLAYER_WARRIOR = "PlayerWarrior";
        SceneElementManager.ELEMENT_PLAYER_MAGE = "PlayerMage";
        SceneElementManager.ELEMENT_PLAYER_BOWMAN = "PlayerBowman";
        SceneElementManager.ELEMENT_COLLECT_GOODS = "ElementCollectGoods";
        return SceneElementManager;
    })();
    egret.SceneElementManager = SceneElementManager;
    SceneElementManager.prototype.__class__ = "egret.SceneElementManager";
})(egret || (egret = {}));
