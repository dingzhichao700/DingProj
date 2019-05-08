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
    var FontBlood = (function (_super) {
        __extends(FontBlood, _super);
        function FontBlood() {
            var _this = _super.call(this) || this;
            // this._numbmp = [];
            var self = _this;
            var hLayout = new eui.HorizontalLayout();
            hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            hLayout.gap = 0;
            self.layout = hLayout;
            self.anchorOffsetX = 0.5;
            self.anchorOffsetY = 0.5;
            self.scaleX = 0.6;
            self.scaleY = 0.6;
            return _this;
        }
        FontBlood.createFontBlood = function () {
            var self = this;
            if (self._bloodVec.length > 0) {
                return self._bloodVec.shift();
            }
            else {
                return new FontBlood();
            }
        };
        FontBlood.prototype.setNum = function (num) {
            var self = this;
            // if (!self._group)
            // {
            // 	self._group = DLG.FactoryUtils.onCreateComp(DLG.CGroup);
            // 	let hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
            // 	hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            // 	if(_gap)
            // 		hLayout.gap = _gap;
            // 	else
            // 		hLayout.gap = 0;
            // 	self._group.layout = hLayout;
            // 	self.addChild(self._group);
            // } else {
            // 	self.visible = true;
            // 	self._group.alpha = 1
            // }
            if (self.visible != true)
                self.visible = true;
            self._soureUrl = 'Font_Num_json.Font_Num_Cut_Blood_';
            self._num = Math.floor(num);
            self.renderDraw();
        };
        FontBlood.prototype.renderDraw = function () {
            var self = this;
            if (self._soureUrl) {
                var numStr = self._num + "";
                var len = numStr.length;
                var bmp = void 0;
                var hasNumChildren = self.numChildren;
                var i = 0;
                for (i; i < len; i++) {
                    if (i < hasNumChildren) {
                        bmp = self.getChildAt(i);
                    }
                    else {
                        // if(self._numbmp.length > 0)
                        // {
                        // 	bmp = self._numbmp.shift();
                        // }else{
                        bmp = DLG.FactoryUtils.onCreateComp(DLG.CImage);
                    }
                    var url = self._soureUrl + numStr.slice(i, i + 1) + '_png';
                    bmp.source = url;
                    if (!bmp.parent)
                        self.addChild(bmp);
                }
                while (self.numChildren > len) {
                    bmp = self.getChildAt(i);
                    // self._numbmp.push(bmp);
                    bmp.onDestroy();
                    bmp.removeFromParent();
                }
            }
            egret.callLater(self.doAnimation, self);
        };
        FontBlood.prototype.doAnimation = function () {
            var self = this;
            // self.validateProperties();
            self.validateNow();
            // self.validateSize();
            // self._group.x = -self._group.width / 2;
            // self._group.y = -self._group.height / 2;
            // self._group.anchorOffsetX = 0.5;
            // self._group.anchorOffsetY = 0.5;
            // self._group.scaleX = 0.6;
            // self._group.scaleY = 0.6;
            var px1 = 20;
            var px2 = 40;
            if (Math.random() > 0.5) {
                px1 = self.x - px1;
                px2 = self.x - px2;
            }
            else {
                px1 = self.x + px1;
                px2 = self.x + px2;
            }
            var py = self.y;
            egret.Tween.get(self).to({ x: px1, y: py - 50 }, 200).to({ x: px2, y: py + Math.random() * 40 }, 200).wait(500).to({ alpha: 0 }, 300).call(self.onDestroy, self);
        };
        FontBlood.prototype.onDestroy = function () {
            var self = this;
            self._soureUrl = undefined;
            self._num = undefined;
            // if (self)
            // {
            egret.Tween.removeTweens(self);
            self.alpha = 1;
            // }
            // self.parent.removeChild(self);
            self.visible = false;
            // self.x = -500;
            self.y = -500;
            FontBlood._bloodVec.push(self);
        };
        return FontBlood;
    }(DLG.CGroup));
    game.FontBlood = FontBlood;
    __reflect(FontBlood.prototype, "game.FontBlood");
})(game || (game = {}));
//# sourceMappingURL=FontBlood.js.map