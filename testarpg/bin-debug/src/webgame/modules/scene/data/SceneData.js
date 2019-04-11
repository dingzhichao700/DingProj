var egret;
(function (egret) {
    var SceneData = (function () {
        function SceneData() {
            /**********************以下为通用场景数据***********************/
            /**当前场景类型 */
            this.sceneType = 0;
            /**当前场景 id，包括所有类型场景 */
            this.sceneId = 0;
            /**********************以下为城市场景数据***********************/
            /**当前城市场景基础 id*/
            this.cityId = 0;
            /**是否已切换场景 */
            this.isChanged = false;
            //元素管理器
            this._sceneElementManager = null;
            //胜利次数
            this._winCount = 0;
            this._bornPoint = new egret.Point();
            this._monsterPoint = new egret.Point();
            this._normalMonsterList = [];
            this._bossMonsterList = [];
            this._arenaMonsterList = [];
            this.initMapData();
        }
        var __egretProto__ = SceneData.prototype;
        /**初始化场景数据*/
        __egretProto__.initMapData = function () {
            for (var i = 1001; i < 1004; i++) {
                var lo = new egret.SceneEditLo();
                lo.id = i;
                lo.width = 1280;
                lo.height = 1800;
                lo.pieceWidth = 300;
                lo.pieceHeight = 300;
                egret.IsoMapData.getInstance().setData(i, lo);
            }
        };
        /**增加胜利次数*/
        __egretProto__.addWinCount = function () {
            this._winCount++;
            if (this._winCount % 2 == 0) {
                egret.globalUpdateWindows([egret.UpdateType.CHANGE_COPY]);
            }
            else {
                egret.globalUpdateWindows([egret.UpdateType.COPY_MONSTER_BORN]);
            }
        };
        /**获取下一个场景 id*/
        __egretProto__.getNextSceneId = function () {
            var id = this.sceneId;
            id++;
            if (id > 1002) {
                id = 1001;
            }
            return id;
        };
        /**检测是否还有敌人存在*/
        __egretProto__.checkArmy = function () {
            var list = this.getArmies(false);
            for (var i in list) {
                if (list[i] && list[i].vo && list[i].vo["hp"] > 0) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 获取当前怪物数据
         * @param isNew 是否生成新数据
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getArmies = function (isNew) {
            if (isNew === void 0) { isNew = true; }
            var list;
            switch (this.sceneType) {
                case egret.SceneType.NORMAL_COPY:
                    list = this.getNormalMonsterList(isNew);
                    break;
                case egret.SceneType.BOSS_COPY:
                    list = this.getBossMonsterList(isNew);
                    break;
                case egret.SceneType.ARENA:
                    list = this.getArenaMonsterList(isNew);
                    break;
            }
            return list;
        };
        /**
         * 获取野外副本怪物数据
         * @param isNew 是否生成新数据
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getNormalMonsterList = function (isNew) {
            if (isNew === void 0) { isNew = true; }
            if (isNew) {
                var point = this.getBornPoint();
                this._normalMonsterList.length = 0;
                for (var i = 0; i < 3; i++) {
                    var monsterPoint = this.getMonsterPoint(point);
                    var item = new egret.SceneElementDataItem();
                    var vo = new egret.SceneMonsterVo();
                    vo.id = egret.SceneElementData.getInstance().getAutoElementId();
                    vo.idString = vo.id + "";
                    vo.name = "怪物" + i;
                    vo.x = monsterPoint.x;
                    vo.y = monsterPoint.y;
                    vo.hp = 10000;
                    vo.hpTotal = 10000;
                    item.vo = vo;
                    item.lo = new egret.MonsterLo();
                    item.lo.movieName = "monster_001";
                    this._normalMonsterList[i] = item;
                }
            }
            return this._normalMonsterList;
        };
        /**
         * 获取Boss副本怪物数据
         * @param isNew 是否生成新数据
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getBossMonsterList = function (isNew) {
            if (isNew === void 0) { isNew = true; }
            if (isNew) {
                var point = this.getBornPoint();
                this._bossMonsterList.length = 0;
                for (var i = 0; i < 1; i++) {
                    var monsterPoint = this.getMonsterPoint(point);
                    var item = new egret.SceneElementDataItem();
                    var vo = new egret.SceneMonsterVo();
                    vo.id = egret.SceneElementData.getInstance().getAutoElementId();
                    vo.idString = vo.id + "";
                    vo.name = "BOSS";
                    vo.x = monsterPoint.x;
                    vo.y = monsterPoint.y;
                    vo.hp = 20000;
                    vo.hpTotal = 20000;
                    item.vo = vo;
                    item.lo = new egret.MonsterLo();
                    item.lo.movieName = "boss_001";
                    this._bossMonsterList[i] = item;
                }
            }
            return this._bossMonsterList;
        };
        /**
         * 获取怪物随机8个方向的出生坐标
         * @returns {Point}
         */
        __egretProto__.getBornPoint = function () {
            var sceneLo = egret.IsoMapData.getInstance().getData(this.sceneId);
            /*var index:number = Math.floor(Math.random() * 8);
            var radian:number = Math.PI / 4 * index;
            var cx:number = sceneLo.width / 4;
            var cy:number = sceneLo.height / 2;
            var radius:number = cx > cy ? cy : cx;
            radius *= 2/3;

            this._bornPoint.x = Math.cos(radian) * radius + cx;
            this._bornPoint.y = Math.sin(radian) * radius + cy;*/
            this._bornPoint.x = 640;
            this._bornPoint.y = 500 + Math.random() * 200;
            return this._bornPoint;
        };
        /**
         * 获取怪物坐标
         * @param point 出生坐标中心点
         * @param offsetX x轴随机偏移量
         * @param offsetY y轴随机偏移量
         * @returns {Point}
         */
        __egretProto__.getMonsterPoint = function (point, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 160; }
            if (offsetY === void 0) { offsetY = 160; }
            var sceneLo = egret.IsoMapData.getInstance().getData(this.sceneId);
            this._monsterPoint.x = point.x + Math.random() * offsetX - offsetX / 2;
            this._monsterPoint.y = point.y + Math.random() * offsetY - offsetY / 2;
            this._monsterPoint.x = this.limitValue(0, sceneLo.width, this._monsterPoint.x);
            this._monsterPoint.y = this.limitValue(0, sceneLo.height, this._monsterPoint.y);
            return this._monsterPoint;
        };
        /**
         * 限制数值大小
         * @param min 最小值
         * @param max 最大值
         * @param value 当前值
         * @returns {number}
         */
        __egretProto__.limitValue = function (min, max, value) {
            if (value < min) {
                value = min;
            }
            if (value > max) {
                value = max;
            }
            return value;
        };
        /**
         * 获取竞技场怪物数据
         * @param isNew
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getArenaMonsterList = function (isNew) {
            if (isNew === void 0) { isNew = true; }
            if (isNew) {
                this._arenaMonsterList.length = 0;
                var point = this.getBornPoint();
                var length = egret.dataManager().roleSceneData.getRoleList().length;
                if (length > 3)
                    length = 3;
                for (var i = 0; i < length; i++) {
                    var monsterPoint = this.getMonsterPoint(point);
                    var item = new egret.SceneElementDataItem();
                    var playerVo = new egret.ScenePlayerVo();
                    playerVo.id = egret.SceneElementData.getInstance().getAutoElementId();
                    playerVo.idString = playerVo.id + "";
                    if (i == 0) {
                        playerVo.name = "剑圣"; //vo.nickname;
                        playerVo.sex = egret.SexType.MALE;
                        playerVo.vocation = egret.VocationType.WARRIOR;
                    }
                    else if (i == 1) {
                        playerVo.name = "邪恶法师"; //vo.nickname;
                        playerVo.sex = egret.SexType.MALE;
                        playerVo.vocation = egret.VocationType.MAGE;
                    }
                    else if (i == 2) {
                        playerVo.name = "寒冰射手"; //vo.nickname;
                        playerVo.sex = egret.SexType.MALE;
                        playerVo.vocation = egret.VocationType.BOWMAN;
                    }
                    playerVo.x = monsterPoint.x;
                    playerVo.y = monsterPoint.y;
                    playerVo.hp = 5000;
                    playerVo.hpTotal = 5000;
                    item.vo = playerVo;
                    this._arenaMonsterList[i] = item;
                }
            }
            return this._arenaMonsterList;
        };
        /**
         * 增加神兽数据
         * @param skillLevel 射手神兽技能等级
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addAnimal = function (skillLevel) {
            if (skillLevel === void 0) { skillLevel = 1; }
            var item = new egret.SceneElementDataItem();
            item.vo = new egret.SceneMonsterVo();
            item.vo.id = egret.SceneElementData.getInstance().getAutoElementId();
            item.vo.idString = item.vo.id + "";
            item.vo.name = "阿斯兰";
            item.vo.hp = 500;
            item.vo.hpTotal = 500;
            item.lo = new egret.MonsterLo();
            item.lo.movieName = "animal_001";
            return item;
        };
        /**
         * 获取物品数据
         * @param x 物品掉落点x
         * @param y 物品掉落点y
         * @returns {Array<SceneElementDataItem>}
         */
        __egretProto__.getGoodsList = function (x, y) {
            var sceneLo = egret.IsoMapData.getInstance().getData(this.sceneId);
            var array = [];
            //物品排列列数
            var column = 4;
            //物品数量
            var length = 6;
            //物品离掉落点偏移量x,y
            var offsetX = 200;
            var offsetY = 0;
            //物品x,y间隔
            var gap = 100;
            for (var i = 0; i < length; i++) {
                var item = new egret.SceneElementDataItem();
                var vo = new egret.SceneElementVo();
                vo.id = egret.SceneElementData.getInstance().getAutoElementId();
                vo.idString = vo.id + "";
                vo.x = x + (i % column) * gap - offsetX;
                while (vo.x < 100) {
                    offsetX -= gap;
                    vo.x += gap;
                }
                while ((i == 0 && vo.x > sceneLo.width - column * gap)) {
                    offsetX += gap;
                    vo.x -= gap;
                }
                vo.y = y - Math.floor(i / column) * gap + offsetY;
                while (i == 0 && vo.y < column * gap) {
                    offsetY += gap;
                    vo.y += gap;
                }
                vo.name = "金币";
                item.vo = vo;
                var lo = new egret.GoodsLo();
                lo.iconId = "27";
                item.lo = lo;
                array.push(item);
            }
            return array;
        };
        /**
         * 更新场景元素vo
         * @param item:SceneElementDataItem 数据
         * @param attr:Array 属性列表
         * @param values:Array 值列表
         */
        __egretProto__.updateSceneElementVo = function (item, attr, values) {
            if (!item.vo)
                return;
            for (var p in attr) {
                item.vo[attr[p]] = values[p];
            }
        };
        return SceneData;
    })();
    egret.SceneData = SceneData;
    SceneData.prototype.__class__ = "egret.SceneData";
})(egret || (egret = {}));
//# sourceMappingURL=SceneData.js.map