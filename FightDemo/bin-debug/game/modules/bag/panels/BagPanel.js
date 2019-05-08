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
    var BagPanel = (function (_super) {
        __extends(BagPanel, _super);
        function BagPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        BagPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new BagView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        BagPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            self.main.num_txt.text = game.BagIManager.getInstance().goods.length + "/100";
            self.main.rong_btn.setLabel("熔炼");
            self.main.rong_btn.setScaleClick(true);
            self.main.rong_btn.setOnClickListener(self, self.rongHandler);
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = 30;
            tLayout.verticalGap = 25;
            tLayout.requestedColumnCount = 5;
            self.main.list.layout = tLayout;
            self.main.list.itemRenderer = game.BagItem;
            self.main.list.dataProvider = new eui.ArrayCollection(game.BagIManager.getInstance().goods);
        };
        BagPanel.prototype.initDefaultPanel = function () {
            var self = this;
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.back_btn.setScaleClick(true);
            self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
        };
        BagPanel.prototype.rongHandler = function (e) {
        };
        BagPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
        };
        BagPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return BagPanel;
    }(DLG.VPanel));
    game.BagPanel = BagPanel;
    __reflect(BagPanel.prototype, "game.BagPanel");
})(game || (game = {}));
//# sourceMappingURL=BagPanel.js.map