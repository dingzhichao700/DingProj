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
                this.__s(t, ["source", "x", "y"], ["bg_copyTitle_png", 0, 0]);
                return t;
            };
            __egretProto__.__15_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["tz_png", 116, 24]);
                return t;
            };
            __egretProto__.__16_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["copy_1_png", 3, 1]);
                return t;
            };
            __egretProto__.__17_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "width", "x", "y"], ["bg_mainbottom_png", 531, 55, -83]);
                return t;
            };
            __egretProto__.__18_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["scale9Grid", "source", "width", "x", "y"], [egret.gui.getScale9Grid("11,1,68,7"), "main_bottomBar_png", 499, 67, -9]);
                return t;
            };
            __egretProto__.__19_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["lock_exppool_png", 527, -143]);
                return t;
            };
            __egretProto__.__20_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["bg_5_png", 537, -116]);
                return t;
            };
            __egretProto__.__21_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["label_exppool_png", 526, -32]);
                return t;
            };
            __egretProto__.__22_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["height", "scale9Grid", "source", "width", "x"], [126, egret.gui.getScale9Grid("19,16,117,22"), "bg_story_png", 495, -56]);
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
                t.elementsContent = [this.__17_i(), this.__18_i(), this.__19_i(), this.btnSoulRoad_i(), this.btnWuhun_i(), this.btnBag_i(), this.btnEquip_i(), this.btnSkill_i(), this.btnStrength_i(), this.__20_i(), this.__21_i(), this.boxCon_i(), this.txtExp_i(), this.boxStory_i()];
                return t;
            };
            __egretProto__.boxCon_i = function () {
                var t = new egret.gui.Group();
                this.boxCon = t;
                this.__s(t, ["height", "width", "x", "y"], [200, 200, 507, -149]);
                return t;
            };
            __egretProto__.boxMission_i = function () {
                var t = new egret.gui.Group();
                this.boxMission = t;
                this.__s(t, ["x", "y"], [111, 133]);
                t.elementsContent = [this.__14_i(), this.__15_i(), this.boxNum_i()];
                return t;
            };
            __egretProto__.boxNum_i = function () {
                var t = new egret.gui.Group();
                this.boxNum = t;
                this.__s(t, ["width", "x", "y"], [42, 244, 23]);
                t.elementsContent = [this.__16_i()];
                return t;
            };
            __egretProto__.boxStory_i = function () {
                var t = new egret.gui.Group();
                this.boxStory = t;
                this.__s(t, ["height", "width", "x", "y"], [124, 380, 131, -270]);
                t.elementsContent = [this.__22_i(), this.txtTarget_i(), this.btnGo_i(), this.imgArrow_i()];
                return t;
            };
            __egretProto__.boxTop_i = function () {
                var t = new egret.gui.Group();
                this.boxTop = t;
                this.__s(t, ["x", "y"], [-1, 0]);
                t.elementsContent = [this.__3_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i(), this.txtName_i(), this.txtPower_i(), this.__8_i(), this.__9_i(), this.__10_i(), this.__11_i(), this.__12_i(), this.__13_i(), this.txtCoin_i(), this.txtAchi_i(), this.boxMission_i()];
                return t;
            };
            __egretProto__.btnBag_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnBag = t;
                this.__s(t, ["source", "x", "y"], ["btn_beibao_png", 211, -85]);
                return t;
            };
            __egretProto__.btnEquip_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnEquip = t;
                this.__s(t, ["source", "x", "y"], ["btn_renwu_png", 292, -82]);
                return t;
            };
            __egretProto__.btnGo_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnGo = t;
                this.__s(t, ["source", "x", "y"], ["btnOk_png", 111, 53]);
                return t;
            };
            __egretProto__.btnSkill_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnSkill = t;
                this.__s(t, ["source", "x", "y"], ["btn_skill_png", 370, -81]);
                return t;
            };
            __egretProto__.btnSoulRoad_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnSoulRoad = t;
                this.__s(t, ["source", "x", "y"], ["soulRoad_gray_png", 0, -140]);
                return t;
            };
            __egretProto__.btnStrength_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnStrength = t;
                this.__s(t, ["source", "x", "y"], ["btn_strength_png", 445, -81]);
                return t;
            };
            __egretProto__.btnWuhun_i = function () {
                var t = new egret.gui.UIAsset();
                this.btnWuhun = t;
                this.__s(t, ["source", "x", "y"], ["btn_jineng_png", 125, -84]);
                return t;
            };
            __egretProto__.imgArrow_i = function () {
                var t = new egret.gui.UIAsset();
                this.imgArrow = t;
                this.__s(t, ["source", "x", "y"], ["guideArrow_png", 6, 48]);
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
            __egretProto__.txtPower_i = function () {
                var t = new egret.gui.Label();
                this.txtPower = t;
                this.__s(t, ["bold", "fontFamily", "italic", "size", "text", "textAlign", "textColor", "width", "x", "y"], [true, "Arial", true, 26, "0", "left", 0xFFE97C, 161, 139, 10]);
                return t;
            };
            __egretProto__.txtTarget_i = function () {
                var t = new egret.gui.Label();
                this.txtTarget = t;
                this.__s(t, ["fontFamily", "height", "size", "text", "textAlign", "width", "x", "y"], ["微软雅黑 Light", 30, 24, "前往黑风寨，击败蛮族剑圣", "center", 451, -40, 20]);
                return t;
            };
            MainViewSkin._skinParts = ["txtName", "txtPower", "txtCoin", "txtAchi", "boxNum", "boxMission", "boxTop", "btnSoulRoad", "btnWuhun", "btnBag", "btnEquip", "btnSkill", "btnStrength", "boxCon", "txtExp", "txtTarget", "btnGo", "imgArrow", "boxStory", "boxBottom"];
            return MainViewSkin;
        })(egret.gui.Skin);
        main.MainViewSkin = MainViewSkin;
        MainViewSkin.prototype.__class__ = "ui.main.MainViewSkin";
    })(main = ui.main || (ui.main = {}));
})(ui || (ui = {}));
//# sourceMappingURL=MainViewSkin.js.map