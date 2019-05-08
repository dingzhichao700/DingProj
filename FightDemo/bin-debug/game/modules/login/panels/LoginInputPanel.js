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
    var LoginInputPanel = (function (_super) {
        __extends(LoginInputPanel, _super);
        function LoginInputPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        LoginInputPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new game.LoginInputView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        LoginInputPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.y = 250;
            self.main.confirmBtn.setScaleClick(true);
            self.main.confirmBtn.setOnClickListener(self, self.showLoginView);
        };
        /**显示选区界面 */
        LoginInputPanel.prototype.showLoginView = function () {
            var self = this;
            if (self.main.userName.text.length <= 0) {
                return;
            }
            game.LoginManager.getInstance().loginUserName = self.main.userName.text;
            game.LoginManager.getInstance().agentPlusdata = self.main.password.text;
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_LoginInputPanel);
            //显示选择区服界面
            DLG.DLGCore.panel.show(game.PanelClassConfig.ID_ServerPanel);
            var loadMainAction = DLG.FactoryUtils.getClass(game.LoadMainResAction);
            loadMainAction.onExecute();
        };
        LoginInputPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return LoginInputPanel;
    }(DLG.VPanel));
    game.LoginInputPanel = LoginInputPanel;
    __reflect(LoginInputPanel.prototype, "game.LoginInputPanel");
})(game || (game = {}));
//# sourceMappingURL=LoginInputPanel.js.map