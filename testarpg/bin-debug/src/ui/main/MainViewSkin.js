var ui;
(function (ui) {
    var main;
    (function (main) {
        var MainViewSkin = (function (_super) {
            __extends(MainViewSkin, _super);
            function MainViewSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [960, 640]);
                this.elementsContent = [this.boxTop_i(), this.boxBottom_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = MainViewSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return MainViewSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__11_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_coin_png", 507, 6]);
                return t;
            };
            __egretProto__.__12_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("9,2,3,18"), "bg_18_png", 102, 392, 9]);
                return t;
            };
            __egretProto__.__13_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["icon_achi_png", 377, 6]);
                return t;
            };
            __egretProto__.__14_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["bg_mainbottom_png", 531, 55, -83]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("11,1,68,7"), "main_bottomBar_png", 499, 67, -9]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["lock_exppool_png", 527, -143]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg_5_png", 537, -116]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["label_exppool_png", 526, -32]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("237,5,32,32"), "bg_top_4_png", 640, 1, 0]);
                return t;
            };
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["namebg_png", 1, 1]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_2_bg_png", 6, 10]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["head_1_png", 8, 12]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["frame_head_0_png", 0, 2]);
                return t;
            };
            __egretProto__.__8_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["level9_png", 0, 104]);
                return t;
            };
            __egretProto__.__9_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["word_zhandouli_png", 84, 5]);
                return t;
            };
            __egretProto__.boxBottom_i = function () {
                var t = new egret.gui.Group();
                this.boxBottom = t;
                this.__s(t, ["x", "y"], [0, 960]);
                t.elementsContent = [this.__14_i(), this.__15_i(), this.__16_i(), this.btnSoulRoad_i(), this.btnWuhun_i(), this.btnBag_i(), this.btnEquip_i(), this.btnSkill_i(), this.__17_i(), this.__18_i(), this.boxCon_i(), this.txtExp_i()];
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [200, 200, 507, -149]);
                return t;
            };
            __egretProto__.boxTop_i = function () {
                var t = new egret.gui.Group();
                this.boxTop = t;
                this.__s(t, ["x", "y"], [-1, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.txtName_i(), this.txtScore_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.txtCoin_i(), this.txtAchi_i()];
                return t;
            };
            __egretProto__.btnBag_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnBag = t;
                this.__s(t, ["source", "x", "y"], ["btn_beibao_png", 247, -85]);
                return t;
            };
            __egretProto__.btnEquip_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnEquip = t;
                this.__s(t, ["source", "x", "y"], ["btn_renwu_png", 338, -82]);
                return t;
            };
            __egretProto__.btnSkill_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnSkill = t;
                this.__s(t, ["source", "x", "y"], ["btn_skill_png", 427, -81]);
                return t;
            };
            __egretProto__.btnSoulRoad_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnSoulRoad = t;
                this.__s(t, ["source", "x", "y"], ["soulRoad_gray_png", 0, -140]);
                return t;
            };
            __egretProto__.btnWuhun_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnWuhun = t;
                this.__s(t, ["source", "x", "y"], ["btn_jineng_png", 145, -84]);
                return t;
            };
            __egretProto__.__10_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("9,2,3,18"), "bg_18_png", 102, 522, 9]);
                return t;
            };
            __egretProto__.txtAchi_i = function () {
                var t = new egret.gui.Label();
                this.txtAchi = t;
                this.__s(t, ["fontFamily", "size", "text", "width", "x", "y"], ["Arial", 18, "410", 82, 416, 13]);
                return t;
            };
            __egretProto__.txtCoin_i = function () {
                var t = new egret.gui.Label();
                this.txtCoin = t;
                this.__s(t, ["fontFamily", "size", "text", "width", "x", "y"], ["Arial", 18, "10311", 82, 542, 13]);
                return t;
            };
            __egretProto__.txtExp_i = function () {
                var t = new egret.gui.Label();
                this.txtExp = t;
                this.__s(t, ["fontFamily", "text", "textAlign", "width", "x", "y"], ["宋体", "3%", "center", 87, 541, -85]);
                return t;
            };
            __egretProto__.txtName_i = function () {
                var t = new egret.gui.Label();
                this.txtName = t;
                this.__s(t, ["size", "text", "textAlign", "width", "x", "y"], [20, "习浩然", "center", 70, 4, 79]);
                return t;
            };
            __egretProto__.txtScore_i = function () {
                var t = new egret.gui.Label();
                this.txtScore = t;
                this.__s(t, ["fontFamily", "italic", "size", "text", "textAlign", "textColor", "width", "x", "y"], ["Arial", true, 24, "31417", "left", 0xFFE97C, 161, 139, 10]);
                return t;
            };
            MainViewSkin._skinParts = ["txtName", "txtScore", "txtCoin", "txtAchi", "boxTop", "btnSoulRoad", "btnWuhun", "btnBag", "btnEquip", "btnSkill", "boxCon", "txtExp", "boxBottom"];
            return MainViewSkin;
        })(egret.gui.Skin);
        main.MainViewSkin = MainViewSkin;
        MainViewSkin.prototype.__class__ = "ui.main.MainViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MainViewSkin.js.map