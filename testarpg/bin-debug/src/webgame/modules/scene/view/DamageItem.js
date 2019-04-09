var egret;
(function (egret) {
    var DamageItem = (function (_super) {
        __extends(DamageItem, _super);
        function DamageItem() {
            _super.call(this);
        }
        var __egretProto__ = DamageItem.prototype;
        __egretProto__.setData = function (text, color) {
            if (!this.imgState) {
                this.imgState = new egret.gui.UIAsset();
                this.addChild(this.imgState);
            }
            if (!this.boxCon) {
                this.boxCon = new egret.gui.Group();
                this.addChild(this.boxCon);
            }
            this.boxCon.removeAllElements();
            if (text.indexOf("闪避") >= 0) {
                this.imgState.visible = true;
                this.imgState.source = "resource/main/dodge.png";
            }
            else if (text.indexOf("暴") >= 0) {
                this.imgState.visible = true;
                this.imgState.source = "resource/main/critical.png";
                var startX = 32;
                this.getImage("mark_minus", this.boxCon, startX, 0);
                var text = text.slice(2);
                for (var i = 0; i < text.length; i++) {
                    this.getImage("damage_" + text[i], this.boxCon, startX + 19 * (i + 1), 0);
                }
            }
            else {
                this.imgState.visible = false;
                var startX = 0;
                this.getImage("mark_minus", this.boxCon, startX, 0);
                var text = text.slice(1);
                for (var i = 0; i < text.length; i++) {
                    this.getImage("damage_" + text[i], this.boxCon, startX + 19 * (i + 1), 0);
                }
            }
        };
        __egretProto__.getImage = function (url, con, _x, _y) {
            if (_x === void 0) { _x = 0; }
            if (_y === void 0) { _y = 0; }
            var img = new egret.gui.UIAsset();
            img.source = "resource/main/" + url + ".png";
            img.x = _x;
            img.y = _y;
            con.addElement(img);
            return img;
        };
        return DamageItem;
    })(egret.gui.UIComponent);
    egret.DamageItem = DamageItem;
    DamageItem.prototype.__class__ = "egret.DamageItem";
})(egret || (egret = {}));
//# sourceMappingURL=DamageItem.js.map