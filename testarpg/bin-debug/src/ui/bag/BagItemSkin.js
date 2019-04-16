var ui;
(function (ui) {
    var bag;
    (function (bag) {
        var BagItemSkin = (function (_super) {
            __extends(BagItemSkin, _super);
            function BagItemSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [74, 72]);
                this.elementsContent = [this.imgBg_i(), this.imgIcon_i(), this.txtNum_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BagItemSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BagItemSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgIcon_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgIcon = t;
                this.__s(t, ["x", "y"], [3, 2]);
                return t;
            };
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                t.source = "img_block_png";
                return t;
            };
            __egretProto__.txtNum_i = function () {
                var t = new egret.gui.Label();
                this.txtNum = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["微软雅黑", 25, 18, "1", "right", 0x000000, 69, 1, 50]);
                return t;
            };
            BagItemSkin._skinParts = ["imgBg", "imgIcon", "txtNum"];
            return BagItemSkin;
        })(egret.gui.Skin);
        bag.BagItemSkin = BagItemSkin;
        BagItemSkin.prototype.__class__ = "ui.bag.BagItemSkin";
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
//# sourceMappingURL=BagItemSkin.js.map