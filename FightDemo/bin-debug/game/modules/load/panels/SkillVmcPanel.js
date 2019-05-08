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
    var SkillVmcPanel = (function (_super) {
        __extends(SkillVmcPanel, _super);
        function SkillVmcPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        SkillVmcPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new SkillVmcView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
            self._timeOutKeyArr = [];
        };
        SkillVmcPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this._timeOutKeyArr.length = 0;
            this._allVmcNum = 0;
            var radom = Math.random() < 0.5 ? 0 : 1;
            var cfgArr = SkillVmcPanel.VmcConfig[radom];
            for (var i = 0; i < cfgArr.length; i++) {
                var obj = cfgArr[i];
                this._allVmcNum++;
                var effect = new game.VMCView();
                effect.updatePose(obj["path"], 90, false, true, "", this.vmcPlayEnd, this);
                effect.play();
                this.main.vmc_box.addChild(effect);
                effect.x = obj["x"];
                effect.y = obj["y"];
                effect.scaleX = obj["scaleX"];
                effect.scaleY = obj["scaleY"];
                this._timeOutKeyArr.push(egret.setTimeout(effect.play, effect, obj["dalay"]));
            }
            // let effect: VMCView = new VMCView();
            // effect.updatePose("anqi_lxz_03", 90, true, true, "", this.vmcPlayEnd, this);
            // effect.play();
            // this.main.vmc_box.addChild(effect);
            // effect.x = 300;
            // effect.y = 400;
            // effect.scaleX = 2
            // effect.scaleY = 2
            // let effect2: VMCView = new VMCView();
            // effect2.updatePose("anqi_lxz_02", 90, true, true, "", this.vmcPlayEnd, this);
            // effect2.play();
            // this.main.vmc_box.addChild(effect2);
            // effect2.x = 300;
            // effect2.y = 400;
            // let effect1: VMCView = new VMCView();
            // effect1.updatePose("anqi_lxz_01", 90, true, true, "", this.vmcPlayEnd, this);
            // effect1.play();
            // this.main.vmc_box.addChild(effect1);
            // effect1.x = 300;
            // effect1.y = 400;
        };
        SkillVmcPanel.prototype.vmcPlayEnd = function () {
            this._allVmcNum--;
            if (this._allVmcNum <= 0) {
                if (this.main && this.main.vmc_box)
                    this.main.vmc_box.removeChildren();
                DLG.DLGCore.panel.close(game.PanelClassConfig.ID_SkillVmcPanel);
            }
        };
        SkillVmcPanel.prototype.onDestroy = function () {
            this.main.vmc_box.removeChildren();
            while (this._timeOutKeyArr.length > 0) {
                var key = this._timeOutKeyArr.pop();
                egret.clearTimeout(key);
            }
            _super.prototype.onDestroy.call(this);
            var self = this;
            self._loadCompeltedFun = null;
            self._loadCompeltedObj = null;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return SkillVmcPanel;
    }(DLG.VPanel));
    SkillVmcPanel.VmcConfig = [
        [{ "path": "anqi_xj_01", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }, { "path": "anqi_xj_02", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }, { "path": "anqi_xj_03", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }],
        [{ "path": "anqi_lxz_01", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }, { "path": "anqi_lxz_02", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }, { "path": "anqi_lxz_03", "x": 300, "y": 400, "dalay": 0, "scaleX": 2, "scaleY": 2 }]
    ];
    game.SkillVmcPanel = SkillVmcPanel;
    __reflect(SkillVmcPanel.prototype, "game.SkillVmcPanel");
})(game || (game = {}));
//# sourceMappingURL=SkillVmcPanel.js.map