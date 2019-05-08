var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    var CEffect = (function (_super) {
        __extends(CEffect, _super);
        function CEffect() {
            var _this = _super.call(this) || this;
            _this._totalFrame = 0;
            _this._playIndex = -1;
            return _this;
        }
        CEffect.prototype.setEffectMovie = function (value) {
            var self = this;
            if (self._effectName != value) {
                RES.getResByUrl(self._effectName, self.onComplete, self, RES.ResourceItem.TYPE_SHEET);
            }
            self._effectName = value;
        };
        /**以次数播放 */
        CEffect.prototype.play = function (totalPlayTimes, nextFrameTimes, playEndRemove) {
            if (nextFrameTimes === void 0) { nextFrameTimes = 150; }
            if (playEndRemove === void 0) { playEndRemove = false; }
            var self = this;
            if (true) {
                if (self._effectName == undefined) {
                    throw new Error('先要设置effectName');
                }
            }
            self._currentTimes = 0;
            self._totalPlayTimes = totalPlayTimes;
            if (self._timeId) {
                DLG.DLGCore.clock.removeTime(self._timeId, false);
                self._timeId = undefined;
            }
            self.nextFrameTimes = nextFrameTimes;
            self._playEndRemove = playEndRemove;
            self._timeId = DLG.DLGCore.clock.addTime(self.nextFrameTimes, 0, self.nextFrame, self, null);
        };
        CEffect.prototype.setPlayEndRemove = function (value) {
            this._playEndRemove = value;
        };
        /**总共要播放的次数 */
        CEffect.prototype.getTotalPlayTimes = function () {
            return this._totalPlayTimes;
        };
        CEffect.prototype.nextFrame = function () {
            var self = this;
            if (self._loadEnd) {
                self._playIndex++;
                return;
            }
            var index = self._playIndex;
            index++;
            if (index >= self._totalFrame) {
                index = 0;
            }
            self.renderEffect(index);
            if (self._playIndex == self._totalFrame - 1) {
                if (self._totalPlayTimes > 0) {
                    self._currentTimes++;
                    if (self._currentTimes == self._totalPlayTimes) {
                        if (self._playEndRemove) {
                            self.removeFromParent();
                        }
                        if (self.onPlayEndCallBack) {
                            self.onPlayEndCallBack.call(self.onPlayEndTaget);
                        }
                    }
                }
            }
        };
        CEffect.prototype.renderEffect = function (index, exRender) {
            if (exRender === void 0) { exRender = true; }
            var self = this;
            if (exRender == false && self._playIndex == index) {
                return;
            }
            self._playIndex = index;
            var indexStr = index + '';
            if (indexStr.length < 2) {
                indexStr = '0' + indexStr;
            }
            var spriteSheet = RES.getRes(self._effectName);
            self._bmp.texture = spriteSheet.getTexture(indexStr);
            indexStr = undefined;
        };
        CEffect.prototype.onComplete = function (event) {
            var self = this;
            self._loadEnd = true;
            if (self._playIndex != -1) {
                self._playIndex = self._playIndex % self._totalFrame;
                self.renderEffect(self._playIndex, true);
            }
            else {
                self.nextFrame();
            }
        };
        CEffect.prototype.destroy = function () {
            var self = this;
            if (self._effectName) {
                RES.destroyRes(self._effectName);
            }
            if (self._timeId) {
                DLG.DLGCore.clock.removeTime(self._timeId, false);
                self._timeId = undefined;
            }
            self._totalPlayTimes = undefined;
            self._currentTimes = undefined;
            self._effectName = undefined;
            self._playIndex = -1;
        };
        return CEffect;
    }(DLG.CGroup));
    DLG.CEffect = CEffect;
    __reflect(CEffect.prototype, "DLG.CEffect");
})(DLG || (DLG = {}));
//# sourceMappingURL=CEffect.js.map