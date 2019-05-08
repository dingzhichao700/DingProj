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
    var ItemTipsPanel = (function (_super) {
        __extends(ItemTipsPanel, _super);
        function ItemTipsPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        ItemTipsPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new ItemTipsView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        ItemTipsPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.main.close_btn["img"].source = "common_close_btn1_png";
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            this.main.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePanelHandler, this);
            this.updateView();
        };
        ItemTipsPanel.prototype.updateView = function () {
            this._goodsId = game.ItemTipsControl.getInstance().goodsId;
            this._btnType = game.ItemTipsControl.getInstance().btnType;
            this._callBackFun = game.ItemTipsControl.getInstance().callBackFun;
            this._callBackObj = game.ItemTipsControl.getInstance().callBackObj;
            this._callBackArg = game.ItemTipsControl.getInstance().callBackArg;
            var curH = 195;
            var curW = 410;
            var cfg = game.GoodsTable.getCfgById(this._goodsId);
            this.main.icon_img.source = "goods_" + cfg.id + "_png";
            this.main.name_txt.text = cfg.name;
            this.main.type_txt.text = cfg.typeName;
            this.main.limit_txt.text = cfg.limit;
            if (cfg.type == 1) {
                this.main.other_box.visible = true;
                this.main.hp_txt.text = "生命：" + cfg.hp;
                this.main.atk_txt.text = "攻击：" + cfg.atk;
                this.main.def_txt.text = "防御：" + cfg.atk;
                curH = 390;
                this.main.des_txt.y = 270;
            }
            else {
                this.main.other_box.visible = false;
                this.main.des_txt.y = 148;
            }
            this.main.des_txt.text = cfg.des;
            curH = this.main.des_txt.y + this.main.des_txt.textHeight;
            curH += 20;
            this.main.bg_img.height = curH;
            // this.main.height = curH;
            this.main.btn_box.y = curH - 40;
            this.main.btn_1.setScaleClick(false);
            if (this._btnType == 1) {
                this.main.btn_box.visible = true;
                this.main.btn_1.setScaleClick(true);
                this.main.btn_1.setOnClickListener(this, this.wearHandler);
                this.main.btn_1["img"].source = "common_btn3_png";
                // this.main.btn_1.setLabel("穿戴");
                curW = 490;
                this.main.content_box.x = 90;
            }
            else if (this._btnType == 2) {
                this.main.btn_box.visible = true;
                this.main.btn_1.setScaleClick(true);
                this.main.btn_1.setOnClickListener(this, this.takeOffHandler);
                // this.main.btn_1.setLabel("卸下");
                this.main.btn_1["img"].source = "common_btn4_png";
                curW = 490;
                this.main.content_box.x = 90;
            }
            else {
                this.main.btn_box.visible = false;
                this.main.content_box.x = 127;
            }
            // this.main.content_box.x = (this.stage.stageWidth - curW)/2;
            // this.main.content_box.y = (this.stage.stageHeight - curH)/2 * 0.8;
        };
        ItemTipsPanel.prototype.wearHandler = function () {
            if (this._callBackFun) {
                this._callBackFun.call(this._callBackObj, this._callBackArg);
            }
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_TipsPanel);
        };
        ItemTipsPanel.prototype.takeOffHandler = function () {
            if (this._callBackFun) {
                this._callBackFun.call(this._callBackObj, this._callBackArg);
            }
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_TipsPanel);
        };
        ItemTipsPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.close(game.PanelClassConfig.ID_TipsPanel);
        };
        ItemTipsPanel.prototype.onDestroy = function () {
            this._goodsId = 0;
            this._btnType = 0;
            this._callBackFun = null;
            this._callBackObj = null;
            this._callBackArg = null;
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return ItemTipsPanel;
    }(DLG.VPanel));
    game.ItemTipsPanel = ItemTipsPanel;
    __reflect(ItemTipsPanel.prototype, "game.ItemTipsPanel");
})(game || (game = {}));
//# sourceMappingURL=ItemTipsPanel.js.map