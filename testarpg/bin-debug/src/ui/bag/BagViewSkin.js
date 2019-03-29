var ui;
(function (ui) {
    var bag;
    (function (bag) {
        var BagViewSkin = (function (_super) {
            __extends(BagViewSkin, _super);
            function BagViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.window_i(), this.__3_i(), this.itemCon_i(), this.__4_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = BagViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return BagViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["title_bag_png", 280, 29]);
                return t;
            };
            __egretProto__.itemCon_i = function () {
                var t = new egret.gui.Group();
                this.itemCon = t;
                this.__s(t, ["height", "width", "x", "y"], [653, 495, 66, 102]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [675, egret.gui.getScale9Grid("3,3,24,24"), "bg_21_png", 516, 56, 94]);
                return t;
            };
            __egretProto__.window_i = function () {
                var t = new egret.BasePanel();
                this.window = t;
                this.__s(t, ["height", "skinName", "width"], [200, ui.WindowViewSkin, 200]);
                return t;
            };
            BagViewSkin._skinParts = ["window", "itemCon"];
            return BagViewSkin;
        })(egret.gui.Skin);
        bag.BagViewSkin = BagViewSkin;
        BagViewSkin.prototype.__class__ = "ui.bag.BagViewSkin";
    })(bag = ui.bag || (ui.bag = {}));
})(ui || (ui = {}));
