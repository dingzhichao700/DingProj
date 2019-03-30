var ui;
(function (ui) {
    var item;
    (function (item) {
        var ItemTipsSkin = (function (_super) {
            __extends(ItemTipsSkin, _super);
            function ItemTipsSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.imgMask_i(), this.imgBg_i(), this.__3_i(), this.item_i(), this.txtName_i(), this.txtQuality_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = ItemTipsSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return ItemTipsSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.imgBg_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgBg = t;
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [428, egret.gui.getScale9Grid("30,20,14,29"), "bg_tips_png", 400, 112, 220]);
                return t;
            };
            __egretProto__.imgMask_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgMask = t;
                this.__s(t, ["height", "scale9Grid", "source", "width"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640]);
                return t;
            };
            __egretProto__.item_i = function () {
                var t = new egret.BagItem();
                this.item = t;
                this.__s(t, ["height", "skinName", "width", "x", "y"], [73, ui.bag.BagItemSkin, 73, 143, 255]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [100, egret.gui.getScale9Grid("4,4,4,4"), "bg_20_png", 360, 131, 241]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["size", "text", "textAlign", "width", "x", "y"], [24, "峨眉刺", "left", 205, 227, 261]);
                return t;
            };
            __egretProto__.txtQuality_i = function () {
                var t = new egret.gui.Label();
                this.txtQuality = t;
                this.__s(t, ["size", "text", "textAlign", "width", "x", "y"], [24, "品质：白色", "left", 163, 227, 296]);
                return t;
            };
            ItemTipsSkin._skinParts = ["imgMask", "imgBg", "item", "txtName", "txtQuality"];
            return ItemTipsSkin;
        })(egret.gui.Skin);
        item.ItemTipsSkin = ItemTipsSkin;
        ItemTipsSkin.prototype.__class__ = "ui.item.ItemTipsSkin";
    })(item = ui.item || (ui.item = {}));
})(ui || (ui = {}));