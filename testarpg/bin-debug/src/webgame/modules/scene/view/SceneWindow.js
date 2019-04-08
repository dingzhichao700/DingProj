var egret;
(function (egret) {
    var SceneWindow = (function (_super) {
        __extends(SceneWindow, _super);
        function SceneWindow() {
            _super.call(this);
            //场景数据
            this._sceneData = null;
            //场景元素数据
            this._sceneElementData = null;
            //元素管理器
            this._sceneElementManager = null;
            //当前怪物元素
            this._monsters = [];
            //任意一个场景之外的其他场景元素
            this._otherElements = [];
            //掉落物品元素
            this._goodsList = [];
            this._goodsDataList = [];
            this._sceneData = egret.dataManager().sceneData;
            this._sceneElementData = egret.dataManager().sceneElementData;
            this._sceneElementManager = egret.SceneElementManager.getInstance();
            this._elementRadius = egret.SceneElementData.ARRIVE_ELEMENT_RADIUS;
        }
        var __egretProto__ = SceneWindow.prototype;
        __egretProto__.initWindow = function () {
            _super.prototype.initWindow.call(this);
            this.addUpdateType(egret.UpdateType.PLAYER_EXIT_SCENE, egret.UpdateType.PLAYER_ENTER_SCENE, egret.UpdateType.PLAYER_VO_CHANGED, egret.UpdateType.COPY_MONSTER_BORN, egret.UpdateType.DAMAGE_HP_CHANGE, egret.UpdateType.CHANGE_SOULROAD, egret.UpdateType.CHANGE_COPY, egret.UpdateType.ADD_MONSTER);
        };
        __egretProto__.initData = function (data) {
            _super.prototype.initData.call(this, data);
            if (this._sceneData.isChanged) {
                this._sceneData.isChanged = false;
                var sceneLo = egret.LocalData.getInstance().getSceneLo(this._sceneData.cityId);
                var id = sceneLo.bornPoint;
                var lo = egret.LocalData.getInstance().getRoleBornPointLo(id);
                if (lo) {
                    this.gotoXY(lo.point.x, lo.point.y);
                }
            }
            else {
                //this.gotoXY(this._role.x,this._role.y);
                //测试
                //				openWindow(ButtonWindow);
                var sceneEditLo = egret.IsoMapData.getInstance().getData(this._sceneData.sceneId);
                this.gotoXY(sceneEditLo.width / 4, sceneEditLo.height * 3 / 4);
            }
        };
        /**切换副本*/
        __egretProto__.changeCopy = function (title) {
            this.clearCopy();
            egret.RoleManager.getInstance().changeSceneEffect();
            egret.TimerManager.getInstance().addExecute(this.nextCopy, this, 3000, null, 1);
            egret.MainControl.getInstance().openLoading(title);
        };
        /**进入下一个副本*/
        __egretProto__.nextCopy = function () {
            egret.SceneManager.getInstance().enterScene(this._sceneData.sceneType, this._sceneData.getNextSceneId());
            egret.RoleManager.getInstance().enterSceneEffect();
            this.nextTurn();
        };
        /**下一波怪物*/
        __egretProto__.nextTurn = function () {
            egret.TimerManager.getInstance().addExecute(function () {
                egret.globalUpdateWindows([egret.UpdateType.COPY_MONSTER_BORN]);
                //Role.getInstance().moveTo2(0,0);
                //RoleManager.getInstance().play(0,-1,ActionMovieClipDirectionType.DOWN_LEFT);
            }, null, 3000, null, 1);
        };
        __egretProto__.addEvents = function () {
            _super.prototype.addEvents.call(this);
            //this.addEventListener(SceneEvent.SCENE_ARRIVE_NAVI_POINT,this.sceneArriveNiviPoint,this);
            this.arriveNaviPointHandler = this.sceneArriveNiviPoint;
        };
        __egretProto__.remove = function () {
            _super.prototype.remove.call(this);
            //this.removeEventListener(SceneEvent.SCENE_ARRIVE_NAVI_POINT,this.sceneArriveNiviPoint,this);
            this.arriveNaviPointHandler = null;
        };
        __egretProto__.globalUpdate = function (updateType) {
            var parameters = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parameters[_i - 1] = arguments[_i];
            }
            switch (updateType) {
                case egret.UpdateType.PLAYER_EXIT_SCENE:
                    this.removePlayer(parameters[0]);
                    break;
                case egret.UpdateType.PLAYER_ENTER_SCENE:
                    this.renderElement(parameters[0]);
                    break;
                case egret.UpdateType.PLAYER_VO_CHANGED:
                    break;
                case egret.UpdateType.COPY_MONSTER_BORN:
                    egret.dataManager().roleSceneData.resetRoleData();
                    //Role.getInstance().updateHp();
                    egret.RoleManager.getInstance().updateHp();
                    //var roles:Array<SceneElementDataItem> = [Role.getInstance().data];
                    var roles = egret.dataManager().roleSceneData.getRoleList();
                    this._monsters.length = 0;
                    var list = this._sceneData.getArmies();
                    for (var i in list) {
                        var monster = this.renderMonster(list[i]);
                        if (monster)
                            this._monsters[i] = monster;
                        monster.chaseArmies(roles);
                    }
                    //Role.getInstance().chaseArmies(list);
                    egret.RoleManager.getInstance().chaseArmies(list);
                    break;
                case egret.UpdateType.DAMAGE_HP_CHANGE:
                    list = parameters[0];
                    var damageValues = parameters[1];
                    var radians = parameters[2];
                    var container = this._isoMap.getLayerContainer(egret.SceneLayerType.TIP_EFFECT);
                    for (var i in list) {
                        var vo = list[i].vo;
                        var driver = this.getElement(vo.idString);
                        if (driver) {
                            driver.updateHp();
                            if (!damageValues[i]) {
                                egret.LogManager.debug(this, "damageValues[i]为空 i = " + i);
                            }
                            if (damageValues[i].isDodge) {
                                var color = 0x00ff00;
                                var size = 20;
                                var value = "闪避";
                                egret.HPTweenManager.getInstance().tweenLine(container, vo.x, vo.y - 50, -100, value, color, size);
                            }
                            else {
                                if (damageValues[i].isCritical) {
                                    color = 0xff0000;
                                    size = 20;
                                    value = "暴" + damageValues[i].value;
                                }
                                else {
                                    color = 0xffff00;
                                    size = 16;
                                    value = damageValues[i].value + "";
                                }
                                egret.HPTweenManager.getInstance().tween(container, vo.x, vo.y - 50, radians[i], 200, value, color, size);
                            }
                            if (vo.hp <= 0) {
                                //主角
                                if (egret.RoleManager.getInstance().isRoleInstance(driver)) {
                                    egret.RoleManager.getInstance().removeRole(vo.id);
                                    if (egret.RoleManager.getInstance().isDead) {
                                        this._sceneData.sceneType = egret.SceneType.NORMAL_COPY;
                                    }
                                }
                                else {
                                    this.removeElement(driver);
                                    if (driver instanceof egret.PlayerAnimal) {
                                        driver.master.removeAnimal();
                                    }
                                }
                                if (!this._sceneData.checkArmy()) {
                                    this.showGoods(vo.x, vo.y);
                                    //if(Math.random() > 0.3)
                                    //	this._sceneData.sceneType = SceneType.ARENA;
                                    //else
                                    this._sceneData.sceneType = egret.SceneType.NORMAL_COPY;
                                }
                            }
                        }
                        egret.dataManager().fightData.recoverDamage(damageValues);
                    }
                    break;
                case egret.UpdateType.CHANGE_SOULROAD:
                    this.changeCopy("斗罗之路");
                    break;
                case egret.UpdateType.CHANGE_COPY:
                    this.changeCopy("历练副本");
                    break;
                case egret.UpdateType.ADD_ROLE:
                    for (var i in this._monsters) {
                        this._monsters[i].chaseArmies(egret.dataManager().roleSceneData.getRoleList());
                    }
                    break;
                case egret.UpdateType.ADD_MONSTER:
                    var list = this._sceneData.getArmies(false);
                    list.push(parameters[0]);
                    egret.RoleManager.getInstance().chaseArmies(list);
                    break;
            }
        };
        /**
         * 物品掉落
         * @param x 掉落点x
         * @param y 掉落点y
         */
        __egretProto__.showGoods = function (x, y) {
            if (this._hasGoods)
                return;
            egret.RoleManager.getInstance().stopAll();
            this._hasGoods = true;
            //LogManager.debug(this,"showGoods");
            this._goodsList.length = 0;
            this._goodsIndex = 0;
            this._goodsDataList = this._sceneData.getGoodsList(x, y);
            if (!egret.EnterFrameManager.getInstance().hasExecute(this._showGoodsId))
                this._showGoodsId = egret.EnterFrameManager.getInstance().addExecute(this.showNextGoods, this, 2);
        };
        /**显示下一个物品，为提高性能，逐帧显示物品*/
        __egretProto__.showNextGoods = function () {
            var goods = this.renderElementInternal(egret.SceneElementType.GOODS, this._goodsDataList[this._goodsIndex], egret.SceneLayerType.GOODS);
            if (goods) {
                this._goodsList.push(goods);
            }
            this._goodsIndex++;
            if (this._goodsList.length == this._goodsDataList.length) {
                egret.EnterFrameManager.getInstance().removeExecute(this._showGoodsId);
                if (this._goodsList.length > 0) {
                    this._goodsIndex = 0;
                    if (!egret.EnterFrameManager.getInstance().hasExecute(this._goodsLoopId))
                        this._goodsLoopId = egret.EnterFrameManager.getInstance().addExecute(this.checkTakeGoods, this, 6);
                }
            }
        };
        /**检测捡物品，因角色技能状态可能未结束，需要通过循环检测*/
        __egretProto__.checkTakeGoods = function () {
            if (!egret.RoleManager.getInstance().role.isSkillStatus && !egret.RoleManager.getInstance().role.isMoving) {
                //LogManager.debug(this,"checkTakeGoods");
                egret.EnterFrameManager.getInstance().removeExecute(this._goodsLoopId);
                this.navigateToElement(this._goodsList[this._goodsIndex].data.vo.id);
                return true;
            }
            return false;
        };
        /**
         * 清空指定的元素
         * @param list
         */
        __egretProto__.clearTargets = function (list) {
            if (list) {
                for (var i in list) {
                    this.removeElement(list[i]);
                }
                list.length = 0;
            }
            if (list == this._goodsList) {
                this._hasGoods = false;
            }
        };
        /**清空副本相关元素*/
        __egretProto__.clearCopy = function () {
            this.clearTargets(this._goodsList);
            this.clearTargets(this._monsters);
        };
        /**移除一个玩家 */
        __egretProto__.removePlayer = function (id) {
            this.removeElementById(id);
        };
        /**清空场景*/
        __egretProto__.clearScene = function () {
            _super.prototype.clearScene.call(this);
            this.clearCopy();
            egret.EnterFrameManager.getInstance().removeExecute(this._goodsLoopId);
            egret.EnterFrameManager.getInstance().removeExecute(this._showGoodsId);
        };
        /**
         * 到达导航点事件处理
         * @param event
         *
         */
        __egretProto__.sceneArriveNiviPoint = function (item) {
            //var item:SceneNavigatorDataItem = <SceneNavigatorDataItem><any> (event.data);
            //LogManager.debug(this,"sceneArriveNiviPoint , item = " + item);
            if (item) {
                //LogManager.debug(this,"sceneArriveNiviPoint ,item.elementId = " + item.elementId);
                //固定场景元素
                if (item.elementId != 0) {
                    this.removeElementById(item.elementId + "");
                    this._goodsIndex++;
                    if (this._goodsList[this._goodsIndex]) {
                        this.navigateToElement(this._goodsList[this._goodsIndex].data.vo.id);
                    }
                    else {
                        this._hasGoods = false;
                        this._sceneData.addWinCount();
                    }
                }
                else if (item.sceneId > 0) {
                }
            }
        };
        /**获取场景元素速度 */
        __egretProto__.getElementSpeed = function () {
            return this._sceneElementData.getElementSpeed();
        };
        /**
         * 回收场景元素
         * @param element:SceneElement 场景元素
         */
        __egretProto__.recoverElement = function (element) {
            this._sceneElementManager.recoverElement(element);
        };
        /**
         * 场景元素移动结束
         * @param target:SceneElement 场景元素
         */
        __egretProto__.elementMovingEnd = function (target) {
            if (target == this._role) {
                if (this._currentNaviItem) {
                    //调度导航事件
                    this.checkArriveNaviPoint();
                }
            }
            else {
            }
        };
        /**渲染动态场景元素 */
        __egretProto__.renderDynamicElements = function (rect) {
        };
        /**
         * 根据数据项目渲染场景元素
         * @param item:SceneElementDataItem 场景元素数据项目
         */
        __egretProto__.renderElement = function (item) {
            if (this._elementsIdMap.containsKey(item.vo.idString))
                return;
            var vo = item.vo;
            this.renderElementInternal(egret.SceneElementType.PLAYER_WARRIOR, item, egret.SceneLayerType.BIOLOGY);
        };
        /**
         * 渲染怪物
         * @param item  场景元素数据项目
         */
        __egretProto__.renderMonster = function (item) {
            var monster = this.getElement(item.id);
            if (monster) {
                monster.setData(item);
            }
            else {
                var type;
                if (item.vo instanceof egret.ScenePlayerVo) {
                    switch (item.vo.vocation) {
                        case egret.VocationType.WARRIOR:
                            type = egret.SceneElementType.PLAYER_WARRIOR;
                            break;
                        case egret.VocationType.MAGE:
                            type = egret.SceneElementType.PLAYER_MAGE;
                            break;
                        case egret.VocationType.BOWMAN:
                            type = egret.SceneElementType.PLAYER_BOWMAN;
                            break;
                    }
                }
                else {
                    type = egret.SceneElementType.MONSTER;
                }
                monster = this.renderElementInternal(type, item, egret.SceneLayerType.BIOLOGY);
                monster.setHPStyle(egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_red_bg.png"), egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_red.png"), 49, 8);
                monster.play(0, egret.ActionType.PREPARE, egret.ActionMovieClipDirectionType.DOWN);
            }
            return monster;
        };
        /**
         * 渲染场景元素
         * @param type:int 场景类型 SceneElementType
         * @param data:SceneElementDataItem 场景元素数据
         * @return
         */
        __egretProto__.renderElementInternal = function (type, data, layerType) {
            if (this._elementsIdMap.containsKey(data.id))
                return null;
            var element = null;
            switch (type) {
                case egret.SceneElementType.MONSTER:
                    element = this._sceneElementManager.getElement(egret.ElementMonster);
                    break;
                case egret.SceneElementType.GOODS:
                    element = this._sceneElementManager.getElement(egret.ElementGoods);
                    break;
                case egret.SceneElementType.PLAYER_WARRIOR:
                    element = this._sceneElementManager.getElement(egret.PlayerWarrior);
                    break;
                case egret.SceneElementType.PLAYER_MAGE:
                    element = this._sceneElementManager.getElement(egret.PlayerMage);
                    break;
                case egret.SceneElementType.PLAYER_BOWMAN:
                    element = this._sceneElementManager.getElement(egret.PlayerBowman);
                    break;
            }
            if (element) {
                element.setData(data);
                this.addElement(element, layerType);
            }
            return element;
        };
        /**主角移动*/
        __egretProto__.roleMoving = function () {
            _super.prototype.roleMoving.call(this);
        };
        /**玩家主动开始移动*/
        __egretProto__.startMove = function () {
            _super.prototype.startMove.call(this);
        };
        /**
         * 导航至当前场景中的元素，元素可以是非固定场景元素
         * @param id:Number 元素lo或vo中的id
         */
        __egretProto__.navigateToElement = function (id) {
            if (!this._currentNaviItem) {
                this._currentNaviItem = new egret.SceneNavigatorDataItem();
            }
            this._currentNaviItem.elementId = id;
            var element = this.getElement(id + "");
            if (element)
                this.navigateTo(element.x, element.y);
        };
        /**
         * 导航至当前场景中的坐标
         * @param x:Number
         * @param y:Number
         */
        __egretProto__.navigateTo = function (x, y) {
            if (this.checkArriveNaviPoint())
                return;
            _super.prototype.navigateTo.call(this, x, y);
        };
        /**获取场景元素坐标点*/
        __egretProto__.getElementPoint = function (id) {
            var element = this.getElement(id);
            if (element)
                return new egret.Point(element.x, element.y);
            return new egret.Point();
        };
        /**
         * 节点改变时
         * @param target 节点改变的目标对象
         * return 是否允许移动
         */
        __egretProto__.nodeChanged = function (target) {
            var curNode = target.currentNode;
            var lastNode = target.lastNode;
            if (curNode) {
                this._isoMap.setMapNodeType(curNode.row, curNode.column, egret.PathType.OBSTACLE);
            }
            if (lastNode) {
                this._isoMap.setMapNodeType(lastNode.row, lastNode.column, egret.PathType.WALKABLE);
            }
            return true;
        };
        return SceneWindow;
    })(egret.SceneDriver);
    egret.SceneWindow = SceneWindow;
    SceneWindow.prototype.__class__ = "egret.SceneWindow";
})(egret || (egret = {}));
//# sourceMappingURL=SceneWindow.js.map