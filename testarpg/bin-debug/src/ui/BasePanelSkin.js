var ui;
(function (ui) {
    var BasePanelSkin = (function (_super) {
        __extends(BasePanelSkin, _super);
        function BasePanelSkin() {
            _super.call(this);
            this.__s = egret.gui.setProperties;
            this.__s(this, ["height", "width"], [960, 640]);
            this.elementsContent = [this.__8_i()];
            this.states = [
                new egret.gui.State("normal", []),
                new egret.gui.State("disabled", [])
            ];
        }
        var __egretProto__ = BasePanelSkin.prototype;
        Object.defineProperty(__egretProto__, "skinParts", {
            get: function () {
                return BasePanelSkin._skinParts;
            },
            enumerable: true,
            configurable: true
        });
        __egretProto__.__4_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [756, egret.gui.getScale9Grid("9,3,12,24"), "bg_6_png", 548, 40, 59]);
            return t;
        };
        __egretProto__.__5_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("55,14,4,87"), "bg_14_png", 566, 31, 815]);
            return t;
        };
        __egretProto__.__6_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("76,9,99,57"), "bg_7_png", 564, 32, 21]);
            return t;
        };
        __egretProto__.__7_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["source", "x", "y"], ["bg_13_png", 31, 775]);
            return t;
        };
        __egretProto__.__8_i = function () {
            var t = new egret.gui.Group();
            this.__s(t, ["height", "width", "x"], [960, 640, 0]);
            t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.btnClose_i()];
            return t;
        };
        __egretProto__.btnClose_i = function () {
            var t = new egret.gui.UIAsset();
            this.btnClose = t;
            this.__s(t, ["source", "x", "y"], ["btn_close1_png", 538, 26]);
            return t;
        };
        __egretProto__.__3_i = function () {
            var t = new egret.gui.UIAsset();
            this.__s(t, ["height", "scale9Grid", "source", "width", "x", "y"], [960, egret.gui.getScale9Grid("4,4,24,24"), "bg_19_png", 640, 0, 0]);
            return t;
        };
        BasePanelSkin._skinParts = ["btnClose"];
        return BasePanelSkin;
    })(egret.gui.Skin);
    ui.BasePanelSkin = BasePanelSkin;
    BasePanelSkin.prototype.__class__ = "ui.BasePanelSkin";
})(ui || (ui = {}));
//# sourceMappingURL=BasePanelSkin.js.map