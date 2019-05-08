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
    var SelectServerPanel = (function (_super) {
        __extends(SelectServerPanel, _super);
        function SelectServerPanel(panelId, fromPanelid) {
            var _this = _super.call(this, panelId) || this;
            _this.serverArr = [];
            return _this;
        }
        SelectServerPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new SelectServerView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        SelectServerPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            game.SelectBtnItem.onCallTarget = self;
            game.SelectBtnItem.onCallBack = self.onSelectClick;
            self.serverArr = game.LoginManager.getInstance().getServerData();
            self.setCloseBtn(self.main.btn_close);
            self.main.serverList.itemRenderer = game.SelectServerItem;
            self.main.selectList.itemRenderer = game.SelectBtnItem;
            self.main.selectList.selectedIndex = 0;
            self.onSelectClick();
        };
        // public onRefresh(): void {
        // super.onRefresh();
        SelectServerPanel.prototype.renderViews = function () {
            var self = this;
            var serverArray = ["最近登录", "火爆新区"];
            var len = Math.ceil(self.serverArr.length / 10);
            for (var i = 0; i < len; i++) {
                serverArray.push(i + "1" + "-" + ((i + 1) * 10) + "区");
            }
            self.main.selectList.dataProvider = new eui.ArrayCollection(serverArray);
        };
        /**选区按钮的回调 */
        SelectServerPanel.prototype.onSelectClick = function () {
            var self = this;
            var svrList = [];
            switch (self.main.selectList.selectedIndex) {
                case 0:
                    break;
                case 1:
                    if (self.serverArr.length <= 4) {
                        svrList = self.serverArr;
                    }
                    else {
                        svrList = self.serverArr.slice(self.serverArr.length - 3, self.serverArr.length);
                    }
                    break;
                default:
                    var len = self.serverArr.length;
                    var starNum = (self.main.selectList.selectedIndex - 2) * 10;
                    var endNum = void 0;
                    if (len > starNum + 10) {
                        endNum = starNum + 10;
                    }
                    else {
                        endNum = len;
                    }
                    svrList = self.serverArr.slice(starNum, endNum);
                    break;
            }
            self.main.serverList.dataProvider = new eui.ArrayCollection(svrList);
        };
        SelectServerPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return SelectServerPanel;
    }(DLG.VPanel));
    game.SelectServerPanel = SelectServerPanel;
    __reflect(SelectServerPanel.prototype, "game.SelectServerPanel");
})(game || (game = {}));
//# sourceMappingURL=SelectServerPanel.js.map