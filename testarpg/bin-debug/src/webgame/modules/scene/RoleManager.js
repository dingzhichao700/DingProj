var egret;
(function (egret) {
    /**主角多角色管理器*/
    var RoleManager = (function () {
        function RoleManager() {
            //主角角色
            this._roles = [];
            //当前场景
            this._scene = null;
            //角色目标点
            this._rolePoints = [];
            this.addRole(1);
            //            this.addRole(2);
            //            this.addRole(3);
        }
        var __egretProto__ = RoleManager.prototype;
        RoleManager.getInstance = function () {
            return this._instance || (this._instance = new egret.RoleManager());
        };
        Object.defineProperty(__egretProto__, "roles", {
            /**主角角色数组*/
            get: function () {
                return this._roles;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "role", {
            /**主角色*/
            get: function () {
                return this._roles[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "isDead", {
            /**主角色是否死亡*/
            get: function () {
                return this.role.data.vo.hp <= 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "hasAnimal", {
            /**
             * 是否有神兽
             * @returns {PlayerAnimal|SceneElementDataItem|boolean}
             */
            get: function () {
                return this._animal && this._animal.data && this._animal.data.vo.hp > 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 增加角色数据
         * @param vocation
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addRole = function (vocation) {
            if (vocation === void 0) { vocation = 1; }
            var item = egret.dataManager().roleSceneData.addRole(vocation);
            var role;
            if (vocation == egret.VocationType.WARRIOR) {
                role = egret.SceneElementManager.getInstance().getElement(egret.PlayerWarrior);
            }
            else if (vocation == egret.VocationType.MAGE) {
                role = egret.SceneElementManager.getInstance().getElement(egret.PlayerMage);
            }
            else if (vocation == egret.VocationType.BOWMAN) {
                role = egret.SceneElementManager.getInstance().getElement(egret.PlayerBowman);
            }
            role.setData(item);
            role.setHPStyle(egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green_bg.png"), egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green.png"), 49, 8);
            this._roles.push(role);
            if (this._roles.length > 1) {
                if (this._scene) {
                    var radius = 150;
                    var radian = Math.PI * 2 * Math.random();
                    var x = Math.cos(radian) * radius + this.role.x;
                    var y = Math.sin(radian) * radius + this.role.y;
                    this._scene.addElement(role, egret.SceneLayerType.BIOLOGY, x, y);
                }
                role.chaseArmies(this.role.armies);
                egret.globalUpdateWindows([egret.UpdateType.ADD_ROLE]);
            }
        };
        /**删除角色*/
        __egretProto__.removeRole = function (id) {
            //主角色不回收，次角色可回收
            if (id == this.role.data.vo.id) {
                if (this._scene)
                    this._scene.removeElement(this.role, false);
                return;
            }
            egret.dataManager().roleSceneData.removeRole(id);
            for (var i in this._roles) {
                if (this._roles[i].data.vo.id == id) {
                    //先删除才能回收
                    var targets = this._roles.splice(i, 1);
                    if (this._scene)
                        this._scene.removeElement(targets[0]);
                    if (this._roles[i] instanceof egret.PlayerAnimal) {
                        this._animal = null;
                    }
                    break;
                }
            }
        };
        /**
         * 增加神兽
         * @returns {SceneElementDataItem}
         */
        __egretProto__.addAnimal = function (master) {
            var item = egret.dataManager().roleSceneData.addAnimal();
            this._animal = egret.SceneElementManager.getInstance().getElement(egret.PlayerAnimal);
            this._animal.setData(item);
            this._animal.setHPStyle(egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green_bg.png"), egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green.png"), 49, 8);
            this._roles.push(this._animal);
            var radius = 150;
            var radian = Math.PI * 2 * Math.random();
            var x = Math.cos(radian) * radius + master.x;
            var y = Math.sin(radian) * radius + master.y;
            if (this._scene)
                this._scene.addElement(this._animal, egret.SceneLayerType.BIOLOGY, x, y);
            this._animal.chaseArmies(master.armies);
            egret.globalUpdateWindows([egret.UpdateType.ADD_ROLE]);
        };
        /**复活主角色*/
        __egretProto__.revive = function () {
            egret.dataManager().roleSceneData.resetRoleData();
            RoleManager.getInstance().updateHp();
            if (this._scene)
                this._scene.addElement(this.role, egret.SceneLayerType.BIOLOGY, this.role.x, this.role.y);
        };
        /**
         * 设置主角坐标数据
         * @param x:int x坐标
         * @param y:int y坐标
         */
        __egretProto__.setElementPlayerXY = function (x, y) {
            if (y === void 0) { y = 0; }
            var points = this.getElementPlayersPoints(x, y);
            for (var i in this._roles) {
                this._roles[i].data.vo.x = points[i].x;
                this._roles[i].data.vo.y = points[i].y;
                this._roles[i].updateXY();
            }
        };
        /**
         * 获取所有角色目标点
         * @param x 主角色目标点x
         * @param y 主角色目标点y
         * @returns {Array<Point>}
         */
        __egretProto__.getElementPlayersPoints = function (x, y) {
            var radius = 150;
            var radian = 0;
            for (var i = 0; i < this._roles.length; i++) {
                var point = this._rolePoints[i];
                if (!point) {
                    point = new egret.Point();
                    this._rolePoints[i] = point;
                }
                if (i == 0) {
                    rx = x;
                    ry = y;
                }
                else {
                    var rx = x + Math.cos(radian) * radius;
                    var ry = y + Math.sin(radian) * radius;
                    radian += Math.PI / 2;
                }
                point.x = rx;
                point.y = ry;
            }
            return this._rolePoints;
        };
        /**
         * 主角移动至坐标
         * @param x:Number
         * @param y:Number
         */
        __egretProto__.moveTo = function (x, y, isCheckPart) {
            if (isCheckPart === void 0) { isCheckPart = true; }
            if (!this._scene)
                return;
            var points = this.getElementPlayersPoints(x, y);
            for (var i in this._roles) {
                this._roles[i].moveTo(points[i].x, points[i].y, isCheckPart);
            }
        };
        /**
         * 主角移动至坐标，不寻路，移动到节点
         * @param x:Number
         * @param y:Number
         */
        __egretProto__.moveTo2 = function (x, y) {
            if (!this._scene)
                return;
            var points = this.getElementPlayersPoints(x, y);
            for (var i in this._roles) {
                this._roles[i].moveTo2(points[i].x, points[i].y);
            }
        };
        /**
         * 移动至目标位置，不寻路，忽略节点数据
         * @param x:Number x坐标
         * @param y:Number y坐标
         */
        __egretProto__.moveTo3 = function (x, y) {
            if (!this._scene)
                return;
            var points = this.getElementPlayersPoints(x, y);
            for (var i in this._roles) {
                this._roles[i].moveTo3(points[i].x, points[i].y);
            }
        };
        /**所有角色停止移动*/
        __egretProto__.stopMove = function () {
            for (var i in this._roles) {
                this._roles[i].stopMove();
            }
        };
        /**所有角色停止所有战斗行为*/
        __egretProto__.stopAll = function () {
            for (var i in this._roles) {
                this._roles[i].stopAll();
            }
        };
        /**
         * 按指定动作类型和方向播放影片
         * @param frameIndex:int = -1 开始播放的帧索引，-1时不设置开始播放的帧索引，从当前帧开始播放或从第0帧开始播放
         * @param actionType:int = -1 动作类型，-1时不设置
         * @param direction:int = -1 动作方向，-1时不设置
         * @param loopCount:int = 0  播放循环次数，播放至最后一帧时即算循环了一次，0表示无限循环
         * @param callBack:Function = null 设置播放次数时，播放完成后回调，仅执行一次
         * @param thisObj:any = null 播放完成后回调函数所属对象
         * @param startFun:Function = null 循环播放中开始播放时回调函数，每次循环执行一次
         * @param startObj:any = null startFun回调函数所属对象
         */
        __egretProto__.play = function (frameIndex, actionType, direction, loopCount, callBack, thisObj, startFun, startObj) {
            if (frameIndex === void 0) { frameIndex = -1; }
            if (actionType === void 0) { actionType = -1; }
            if (direction === void 0) { direction = -1; }
            if (loopCount === void 0) { loopCount = 0; }
            if (callBack === void 0) { callBack = null; }
            if (thisObj === void 0) { thisObj = null; }
            if (startFun === void 0) { startFun = null; }
            if (startObj === void 0) { startObj = null; }
            for (var i in this._roles) {
                this._roles[i].play.apply(this._roles[i], arguments);
            }
        };
        /**
         * 显示主角
         * @param scene:SceneDriver 场景
         * @param x:Number x 坐标
         * @param y:Number y 坐标
         */
        __egretProto__.showPlayer = function (scene, x, y) {
            if (scene && this._scene != scene) {
                this._scene = scene;
                for (var i in this._roles) {
                    this._scene.addElement(this._roles[i], egret.SceneLayerType.BIOLOGY);
                }
            }
            this.setElementPlayerXY(x, y);
            this.stopMove();
            this.play(-1, egret.ActionType.PREPARE, egret.ActionMovieClipDirectionType.DOWN);
        };
        /**移除主角*/
        __egretProto__.hidePlayer = function () {
            if (this._scene) {
                this.stopMove();
                for (var i in this._roles) {
                    this._scene.removeElement(this._roles[i], false);
                }
                this._scene = null;
            }
        };
        /**场景切换*/
        __egretProto__.changeScene = function (scene) {
            if (scene != this._scene)
                return;
            for (var i in this._roles) {
                this._roles[i].clearFollowPoints();
                this._roles[i].stopMove();
            }
        };
        /**更新血量显示*/
        __egretProto__.updateHp = function () {
            for (var i in this._roles) {
                this._roles[i].updateHp();
            }
        };
        /**
         * 换装更新
         * @param id 角色 id
         */
        __egretProto__.updateAvatar = function (id) {
            for (var i in this._roles) {
                if (this._roles[i].data.vo.id == id) {
                    this._roles[i].updateAvatar(this._roles[i].data);
                    break;
                }
            }
        };
        /**
         * 追击敌人
         * @param armies 敌人数据
         */
        __egretProto__.chaseArmies = function (armies) {
            for (var i in this._roles) {
                this._roles[i].chaseArmies(armies);
            }
        };
        /**
         * 是否为主角角色
         * @param element 角色
         * @returns {boolean}
         */
        __egretProto__.isRoleInstance = function (element) {
            return this._roles.indexOf(element) > -1;
        };
        /**切换场景特效*/
        __egretProto__.changeSceneEffect = function () {
            for (var i in this._roles) {
                this._roles[i].changeSceneEffect();
            }
        };
        /**进入场景特效*/
        __egretProto__.enterSceneEffect = function () {
            for (var i in this._roles) {
                this._roles[i].enterSceneEffect();
            }
        };
        return RoleManager;
    })();
    egret.RoleManager = RoleManager;
    RoleManager.prototype.__class__ = "egret.RoleManager";
})(egret || (egret = {}));
//# sourceMappingURL=RoleManager.js.map