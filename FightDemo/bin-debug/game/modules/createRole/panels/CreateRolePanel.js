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
    var CreateRolePanel = (function (_super) {
        __extends(CreateRolePanel, _super);
        function CreateRolePanel(panelId, fromPanelid) {
            var _this = _super.call(this, panelId) || this;
            /**选中的职业 */
            _this.selectJob = 1;
            /**选中职业的性别  1为男 2 为女*/
            _this.selectSex = 1;
            return _this;
        }
        CreateRolePanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new game.CreateRoleView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        CreateRolePanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.main.selectJobList.itemRenderer = game.SelectJobItem;
            var jobArray = [1, 2];
            self.main.selectJobList.dataProvider = new eui.ArrayCollection(jobArray);
            self.main.selectJobList.selectedIndex = 0; //默认选中第一个职业
            self.main.btn_create.setOnClickListener(self, self.onCreateRole);
            self.main.btn_random.setOnClickListener(self, self.onRandomName);
        };
        // public onRefresh(): void {
        // super.onRefresh();
        CreateRolePanel.prototype.renderViews = function () {
            var self = this;
            var index = self.main.selectJobList.selectedIndex;
            if (index == 0) {
                self.selectJob = 1;
                self.selectSex = 1;
                self.main.jobModel.source = "jobMan0_png";
            }
            else {
                self.selectJob = 2;
                self.selectSex = 2;
                self.main.jobModel.source = "jobWoman1_png";
            }
            self.onRandomName();
        };
        /**创建角色 */
        CreateRolePanel.prototype.onCreateRole = function () {
            var self = this;
            //发送创角消息
            if (self.main.inputName.text.length <= 0) {
                return;
            }
            var sendData = new game.GCreateCharacterM();
            sendData.name = self.main.inputName.text;
            sendData.sex = self.selectSex;
            sendData.auto = self.selectJob;
            sendData.icon = "brid";
            DLG.DLGCore.socket.onSend(game.CmdCode.REQ_CreateCharacter, sendData);
        };
        /**随机取一个名字 */
        CreateRolePanel.prototype.onRandomName = function () {
            var self = this;
            var jobNameAction = DLG.FactoryUtils.getClass(game.JobNameAction);
            self.main.inputName.text = jobNameAction.getRandomName(self.selectSex);
        };
        CreateRolePanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            DLG.FactoryUtils.removeClass(game.JobNameAction);
            self.main = undefined;
        };
        return CreateRolePanel;
    }(DLG.VPanel));
    game.CreateRolePanel = CreateRolePanel;
    __reflect(CreateRolePanel.prototype, "game.CreateRolePanel");
})(game || (game = {}));
//# sourceMappingURL=CreateRolePanel.js.map