var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var game;
(function (game) {
    var MonsterDriver = (function (_super) {
        __extends(MonsterDriver, _super);
        function MonsterDriver() {
            var _this = _super.call(this) || this;
            var self = _this;
            // self._data = new DriverData();
            self.touchEnabled = false;
            self._direction = game.ENUM_DriverDirection.down;
            self._bodySkin = new game.MovieSkin(game.GAME_CORE.SHOW_MAP_MOVIE);
            self._bodySkin.filters = undefined;
            self._bodySkin.onPlayFrameCallBack = self.onPlayFrameCallBack;
            self._bodySkin.onPlayFrameTaget = self;
            self.addChild(self._bodySkin);
            return _this;
        }
        MonsterDriver.prototype.init = function () {
            var self = this;
            self._bodySkin.setDirection(self._direction);
            self._bodySkin.setMovieName(game.GAME_PATH.MOVIE_MONSTER_PATH, self._data.movieName);
            // self._bodySkin.setAction(DriverAction.run);
            // self._bodySkin.loadMovie();
            self.stand();
            self.update();
            self.stand();
            if (true) {
                if (game.SceneManager.showRang) {
                    if (!self._testSprite) {
                        self._testSprite = new egret.Sprite();
                        self.addChild(self._testSprite);
                    }
                    var sp1 = void 0;
                    var sp2 = void 0;
                    if (self._testSprite.numChildren > 0) {
                        sp1 = self._testSprite.getChildAt(0);
                        sp2 = self._testSprite.getChildAt(1);
                    }
                    else {
                        sp1 = new egret.Sprite();
                        sp2 = new egret.Sprite();
                        sp1.alpha = 0.5;
                        // sp2.alpha = 0.5
                        this._testSprite.addChild(sp1);
                        this._testSprite.addChild(sp2);
                    }
                    sp1.graphics.clear();
                    sp1.graphics.beginFill(0x000000);
                    sp1.graphics.lineStyle(1, 0x0);
                    var data = self._data;
                    sp1.graphics.drawRect(-data.byAttackRangeW, data.byAttackRangeY - data.byAttackRangeH, data.byAttackRangeW * 2, data.byAttackRangeH * 2);
                    sp1.graphics.endFill();
                    sp2.graphics.clear();
                    sp2.graphics.beginFill(0xFFFFFF);
                    sp2.graphics.lineStyle(1, 0x0);
                    sp2.graphics.drawCircle(0, 0, 2);
                    sp2.graphics.endFill();
                }
            }
        };
        MonsterDriver.prototype.showHpBar = function (value) {
            var self = this;
            if (value && !self._hpBar) {
                self._hpBar = new game.HpBar();
                self._hpBar.showStyle();
            }
            if (self._hpBar) {
                if (value) {
                    if (self._hpBar.parent == null)
                        self.addChild(self._hpBar);
                }
                else {
                    if (self._hpBar.parent)
                        self.removeChild(self._hpBar);
                }
            }
        };
        MonsterDriver.prototype.showEffect = function (effectid, playTimes) {
            if (playTimes === void 0) { playTimes = 1; }
            var self = this;
            if (effectid == 0) {
                return;
            }
            var effectCfg = game.EffectTable.getCfgById(effectid);
            var movieName = effectCfg.movie;
            var isBoss;
            if (self._data.driverType == game.ENUM_DriverType.monster) {
                var data = self._data;
                if (data.isBoss) {
                    var isBoss_1 = true;
                    if (effectCfg.bigmovie != '0') {
                        movieName = effectCfg.bigmovie;
                    }
                }
            }
            var effect;
            if (effectCfg.layer == 1) {
                if (!self._effectDownSprite) {
                    self._effectDownSprite = new egret.Sprite();
                    self.addChild(self._effectDownSprite);
                }
                effect = self._effectDownSprite.getChildByName(movieName);
            }
            else {
                if (!self._effectUpSprite) {
                    self._effectUpSprite = new egret.Sprite();
                    self.addChild(self._effectUpSprite);
                }
                effect = self._effectUpSprite.getChildByName(movieName);
            }
            if (!effect) {
                effect = game.EffectMovie.createEffectMovie(movieName);
                if (effectCfg.layer == 1) {
                    self._effectDownSprite.addChild(effect);
                }
                else {
                    self._effectUpSprite.addChild(effect);
                }
                if (self._data.driverType == game.ENUM_DriverType.monster) {
                    if (effectCfg.site == 1) {
                        effect.y = self._data.byAttackRangeY + self._data.byAttackRangeH;
                    }
                    else if (effectCfg.site == 2) {
                        effect.y = self._data.byAttackRangeY;
                    }
                    else if (effectCfg.site == 3) {
                        effect.y = 0;
                    }
                }
                if (effectCfg.py != 0) {
                    effect.y += effectCfg.py;
                }
                if (effectCfg.range && isBoss) {
                    var _px = DLG.Utils.random(-effectCfg.range, effectCfg.range);
                    var _py = DLG.Utils.random(-effectCfg.range, effectCfg.range);
                    effect.y += _py;
                    effect.x += _px;
                }
                effect.play(playTimes);
                effect.name = movieName;
                effect.onPlayEndCallBack = self.removeEffectCallBack;
                effect.onPlayEndTaget = self;
            }
            // else
            // {
            // 	effect.clear();
            // 	effect.play(playTimes);	
            // }
        };
        MonsterDriver.prototype.showHitEffect = function () {
            var self = this;
            if (self._bodySkin.filters !== undefined) {
                return;
            }
            self._bodySkin.filters = [DLG.DLGConfig.lightColorFlilter];
            self.hitEffectID = DLG.DLGCore.clock.addTime(150, 1, self.removeHitEffect, self, null);
        };
        MonsterDriver.prototype.removeHitEffect = function () {
            var self = this;
            if (self.hitEffectID) {
                DLG.DLGCore.clock.removeTime(self.hitEffectID);
                self.hitEffectID = undefined;
            }
            if (self._bodySkin.filters) {
                // self._bodySkin.filters.length = 0;
                self._bodySkin.filters = [];
                self._bodySkin.filters = undefined;
            }
        };
        MonsterDriver.prototype.removeEffectCallBack = function () {
            var self = this;
            // if (self._effectSprite && self._effectSprite.numChildren == 0) {
            // 	self.removeChild(self._effectSprite);
            // 	self._effectSprite = undefined;
            // }
        };
        // public removeEffect(movieName: string ): void
        // {
        // 	let self = this;
        // 	if (!self._effectSprite)
        // 	{
        // 		return;
        // 	}
        // 	let effect: EffectMovie = <EffectMovie>self._effectSprite.getChildByName(movieName);
        // 	self._effectSprite.removeChild(effect);
        // 	EffectMovie.returnEffectMovie(effect);
        // 	if (self._effectSprite.numChildren == 0)
        // 	{
        // 		self.removeChild(self._effectSprite);
        // 		self._effectSprite = undefined;
        // 	}
        // }
        MonsterDriver.prototype.stand = function () {
            var self = this;
            self._actionState = game.ENUM_DriverAction.stand;
            self._bodySkin.setAction(self._actionState);
            self._bodySkin.loadMovie();
        };
        MonsterDriver.prototype.attack = function (skillId, px, py, monsterNotHit) {
            var self = this;
            var data = self._data;
            if (!data) {
                return;
            }
            if (data.isSwoonTime) {
                return;
            }
            // data.lastUseSkill = skillId;
            if (self.isAttack() == false) {
                self._actionState = game.ENUM_DriverAction.attack;
                self._bodySkin.setAction(self._actionState);
                self._bodySkin.loadMovie();
            }
            if (data.driverType == game.ENUM_DriverType.monster) {
                var useSkillAction = DLG.FactoryUtils.getClass(game.UseSkillAction);
                useSkillAction.useSkill(self, skillId, monsterNotHit);
            }
        };
        MonsterDriver.prototype.run = function () {
            var self = this;
            if (self._data.isSwoonTime) {
                return;
            }
            self._actionState = game.ENUM_DriverAction.run;
            self._bodySkin.setAction(self._actionState);
            self._bodySkin.loadMovie();
        };
        MonsterDriver.prototype.isAttack = function () {
            var self = this;
            if (self._actionState == game.ENUM_DriverAction.attack) {
                return true;
            }
            return false;
        };
        MonsterDriver.prototype.update = function () {
            var self = this;
            var data = self._data;
            if (!data) {
                return;
            }
            if (self.x != data.x)
                self.x = data.x;
            if (self.y != data.y)
                self.y = data.y;
            if (self._hpBar && self._hpBar.parent) {
                self._hpBar.setValue(data.attr.getValue(game.Enum_Attr.hp), data.attr.getValue(game.Enum_Attr.totalHp));
            }
        };
        MonsterDriver.prototype.nextFrame = function () {
            var self = this;
            if (self._data.isSwoonTime) {
                return;
            }
            self._bodySkin.nextFrame();
        };
        MonsterDriver.prototype.onPlayFrameCallBack = function (frame, _totalFrame) {
            var self = this;
            if (self._actionState == game.ENUM_DriverAction.attack) {
                if (frame == _totalFrame) {
                    self.stand();
                }
            }
        };
        MonsterDriver.prototype.move = function () {
            var self = this;
            var data = self._data;
            if (!data) {
                return;
            }
            if (data.isSwoonTime) {
                return;
            }
            var speed = self._data.attr.getValue(game.Enum_Attr.speed);
            if (self._direction == game.ENUM_DriverDirection.down) {
                data.y += speed;
                self.y = self._data.y;
            }
            else if (self._direction == game.ENUM_DriverDirection.up) {
                data.y -= speed;
                self.y = self._data.y;
            }
        };
        MonsterDriver.prototype.setData = function (value) {
            var self = this;
            if (!self._data) {
                self._data = value;
                self.init();
            }
            else {
                self._data = value;
                self.update();
            }
        };
        MonsterDriver.prototype.getData = function () {
            return this._data;
        };
        // public getActionState(): number
        // {
        // 	return this._actionState;
        // }
        MonsterDriver.prototype.clear = function () {
            var self = this;
            self.rotation = 0;
            self.removeHitEffect();
            self.showHpBar(false);
            // self._bodySkin.destroy();
        };
        return MonsterDriver;
    }(egret.Sprite));
    game.MonsterDriver = MonsterDriver;
    __reflect(MonsterDriver.prototype, "game.MonsterDriver", ["game.IDriver"]);
})(game || (game = {}));
//# sourceMappingURL=MonsterDriver.js.map