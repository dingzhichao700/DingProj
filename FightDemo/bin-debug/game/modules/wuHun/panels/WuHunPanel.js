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
    var WuHunPanel = (function (_super) {
        __extends(WuHunPanel, _super);
        function WuHunPanel(panelId, fromPanelid) {
            return _super.call(this, panelId) || this;
        }
        WuHunPanel.prototype.onShow = function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            _super.prototype.onShow.apply(this, arg);
            var self = this;
            self.main = new WuHunView();
            self.addChild(self.main);
            self.main.onLoadCallBack = self.initView;
            self.main.onLoadCallTarget = self;
        };
        WuHunPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            var self = this;
            self.initDefaultPanel();
            self.main.strength_btn["img"].source = "common_btn1_png";
            self.main.strength_btn.setLabel("魂核强化");
            self.main.strength_btn.setScaleClick(true);
            self.main.strength_btn.setOnClickListener(self, self.StrengthlHandler);
            self.main.bag_btn.setLabel("魂核背包");
            self.main.bag_btn.setScaleClick(true);
            self.main.bag_btn.setOnClickListener(self, self.openBaglHandler);
            self.main.item_1["myIndex"] = 1;
            self.main.item_1.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            // DLG.DLGCore.event.addEventListener(self.main.item_1, egret.TouchEvent.TOUCH_TAP, self, self.clickItemHandler,true,1000,1);
            self.main.item_2["myIndex"] = 2;
            self.main.item_2.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            self.main.item_3["myIndex"] = 3;
            self.main.item_3.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            self.main.item_4["myIndex"] = 4;
            self.main.item_4.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            self.main.item_5["myIndex"] = 5;
            self.main.item_5.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            self.main.item_6["myIndex"] = 6;
            self.main.item_6.addEventListener(egret.TouchEvent.TOUCH_TAP, self.clickItemHandler, self);
            var tLayout = new eui.TileLayout();
            tLayout.horizontalGap = 0;
            tLayout.verticalGap = 0;
            tLayout.requestedColumnCount = 5;
            self.main.list.layout = tLayout;
            self.main.list.itemRenderer = game.RoleItem;
            game.RoleItem.onCallTarget = self;
            game.RoleItem.onCallBack = self.onSelectClick;
            self.main.list.dataProvider = new eui.ArrayCollection(game.WuHunManager.getInstance().roleInfo);
            self.main.list.selectedIndex = 0;
            self._curIndex = 0;
            self._preIndex = 0;
            self._curInfo = game.WuHunManager.getInstance().roleInfo[0];
            self.updateView();
        };
        WuHunPanel.prototype.initDefaultPanel = function () {
            var self = this;
            self.main.close_btn.setScaleClick(true);
            self.main.close_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.back_btn.setScaleClick(true);
            self.main.back_btn.setOnClickListener(self, self.closePanelHandler);
            self.main.tipLab.setLabel("规则说明");
        };
        WuHunPanel.prototype.onSelectClick = function (info, index) {
            var self = this;
            if (!info) {
                self.main.list.selectedIndex = self._curIndex;
                return;
            }
            if (index == self._curIndex)
                return;
            self._preIndex = self._curIndex;
            self._curIndex = index;
            self._curInfo = info;
            self.updateView();
        };
        WuHunPanel.prototype.updateView = function () {
            var self = this;
            self.main.item1.updateView(self._curInfo.open1, self._curInfo.itemId1);
            self.main.item2.updateView(self._curInfo.open2, self._curInfo.itemId2);
            self.main.item3.updateView(self._curInfo.open3, self._curInfo.itemId3);
            self.main.item4.updateView(self._curInfo.open4, self._curInfo.itemId4);
            self.main.item5.updateView(self._curInfo.open5, self._curInfo.itemId5);
            self.main.item6.updateView(self._curInfo.open6, self._curInfo.itemId6);
            self.main.attr_hp.text = "+" + self._curInfo.attrHp;
            self.main.attr_atk.text = "+" + self._curInfo.attrAtk;
            self.main.attr_def.text = "+" + self._curInfo.attrDef;
            self.main.skill_icom.source = "goods_99926_png";
            self.main.wuhun_img.source = "wuHun_" + self._curInfo.modelId + "_png";
            this.updateScore();
        };
        WuHunPanel.prototype.updateScore = function () {
            this._curInfo.score = 0;
            if (this._curInfo.open1) {
                this._curInfo.score += 13;
            }
            if (this._curInfo.open2) {
                this._curInfo.score += 25;
            }
            if (this._curInfo.open3) {
                this._curInfo.score += 47;
            }
            if (this._curInfo.open4) {
                this._curInfo.score += 89;
            }
            if (this._curInfo.open5) {
                this._curInfo.score += 123;
            }
            if (this._curInfo.open6) {
                this._curInfo.score += 250;
            }
            var tempV100 = Math.floor(this._curInfo.score / 100);
            this.main.score_100.source = tempV100 > 0 ? "wuHun_score_" + tempV100 + "_png" : null;
            var tempV10 = this._curInfo.score - Math.floor(this._curInfo.score / 100) * 100;
            tempV10 = Math.floor(tempV10 / 10);
            this.main.score_10.source = (tempV100 <= 0 && tempV10 <= 0) ? null : "wuHun_score_" + tempV10 + "_png";
            var tempV = this._curInfo.score - Math.floor(this._curInfo.score / 10) * 10;
            this.main.score_1.source = "wuHun_score_" + tempV + "_png";
        };
        WuHunPanel.prototype.closePanelHandler = function (e) {
            DLG.DLGCore.panel.closeAll();
        };
        WuHunPanel.prototype.StrengthlHandler = function (e) {
        };
        WuHunPanel.prototype.openBaglHandler = function (e) {
        };
        // private clickItemHandler(e: egret.TouchEvent): void {
        // 	let opne: boolean;
        // 	let itemId: number;
        // 	let item: WuHunItem;
        // 	let value: number;
        // 	let index: number = e.currentTarget["myIndex"];
        // 	switch (index) {
        // 		case 1: this._curInfo.open1 = !this._curInfo.open1; opne = this._curInfo.open1; itemId = this._curInfo.itemId1; item = this.main.item1; break;
        // 		case 2: this._curInfo.open2 = !this._curInfo.open2; opne = this._curInfo.open2; itemId = this._curInfo.itemId2; item = this.main.item2; break;
        // 		case 3: this._curInfo.open3 = !this._curInfo.open3; opne = this._curInfo.open3; itemId = this._curInfo.itemId3; item = this.main.item3; break;
        // 		case 4: this._curInfo.open4 = !this._curInfo.open4; opne = this._curInfo.open4; itemId = this._curInfo.itemId4; item = this.main.item4; break;
        // 		case 5: this._curInfo.open5 = !this._curInfo.open5; opne = this._curInfo.open5; itemId = this._curInfo.itemId5; item = this.main.item5; break;
        // 		case 6: this._curInfo.open6 = !this._curInfo.open6; opne = this._curInfo.open6; itemId = this._curInfo.itemId6; item = this.main.item6; break;
        // 	}
        // 	item.updateView(opne, itemId);
        // 	this.updateScore();
        // }
        WuHunPanel.prototype.clickItemHandler = function (e) {
            var opne;
            var itemId;
            // let item: WuHunItem;
            // let value: number;
            var index = e.currentTarget["myIndex"];
            switch (index) {
                case 1:
                    opne = this._curInfo.open1;
                    itemId = this._curInfo.itemId1;
                    break;
                case 2:
                    opne = this._curInfo.open2;
                    itemId = this._curInfo.itemId2;
                    break;
                case 3:
                    opne = this._curInfo.open3;
                    itemId = this._curInfo.itemId3;
                    break;
                case 4:
                    opne = this._curInfo.open4;
                    itemId = this._curInfo.itemId4;
                    break;
                case 5:
                    opne = this._curInfo.open5;
                    itemId = this._curInfo.itemId5;
                    break;
                case 6:
                    opne = this._curInfo.open6;
                    itemId = this._curInfo.itemId6;
                    break;
            }
            game.ItemTipsControl.getInstance().initTips(itemId, opne ? 2 : 1, this.clickBackFunc, this, [index]);
            // item.updateView(opne, itemId);
            // this.updateScore();
        };
        WuHunPanel.prototype.clickBackFunc = function (arg) {
            var opne;
            var itemId;
            var item;
            var value;
            var index = arg[0];
            switch (index) {
                case 1:
                    this._curInfo.open1 = !this._curInfo.open1;
                    opne = this._curInfo.open1;
                    itemId = this._curInfo.itemId1;
                    item = this.main.item1;
                    break;
                case 2:
                    this._curInfo.open2 = !this._curInfo.open2;
                    opne = this._curInfo.open2;
                    itemId = this._curInfo.itemId2;
                    item = this.main.item2;
                    break;
                case 3:
                    this._curInfo.open3 = !this._curInfo.open3;
                    opne = this._curInfo.open3;
                    itemId = this._curInfo.itemId3;
                    item = this.main.item3;
                    break;
                case 4:
                    this._curInfo.open4 = !this._curInfo.open4;
                    opne = this._curInfo.open4;
                    itemId = this._curInfo.itemId4;
                    item = this.main.item4;
                    break;
                case 5:
                    this._curInfo.open5 = !this._curInfo.open5;
                    opne = this._curInfo.open5;
                    itemId = this._curInfo.itemId5;
                    item = this.main.item5;
                    break;
                case 6:
                    this._curInfo.open6 = !this._curInfo.open6;
                    opne = this._curInfo.open6;
                    itemId = this._curInfo.itemId6;
                    item = this.main.item6;
                    break;
            }
            item.updateView(opne, itemId);
            this.updateScore();
        };
        WuHunPanel.prototype.onDestroy = function () {
            _super.prototype.onDestroy.call(this);
            var self = this;
            if (self.main) {
                self.main.onLoadCallBack = undefined;
                self.main.onLoadCallTarget = undefined;
                self.main.onDestroy();
            }
            self.main = undefined;
        };
        return WuHunPanel;
    }(DLG.VPanel));
    game.WuHunPanel = WuHunPanel;
    __reflect(WuHunPanel.prototype, "game.WuHunPanel");
})(game || (game = {}));
//# sourceMappingURL=WuHunPanel.js.map