var ui;
(function (ui) {
    var main;
    (function (main) {
        var LoadingViewSkin = (function (_super) {
            __extends(LoadingViewSkin, _super);
            function LoadingViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.boxCon_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return LoadingViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["fx_loading_png", 141, 251]);
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width"], [200, 200]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.txtTitle_i()];
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bgLoading_jpg", -64, -220]);
                return t;
            };
            __egretProto__.txtTitle_i = function () {
                var t = new egret.gui.Label();
                this.txtTitle = t;
                this.__s(t, ["height", "size", "text", "textAlign", "textColor", "width", "x", "y"], [23, 20, "标签", "center", 0x000000, 115, 260, 419]);
                return t;
            };
            LoadingViewSkin._skinParts = ["txtTitle", "boxCon"];
            return LoadingViewSkin;
        })(egret.gui.Skin);
        main.LoadingViewSkin = LoadingViewSkin;
        LoadingViewSkin.prototype.__class__ = "ui.main.LoadingViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=LoadingViewSkin.js.map