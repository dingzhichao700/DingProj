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
    var GoodsCfg = (function () {
        function GoodsCfg() {
        }
        return GoodsCfg;
    }());
    game.GoodsCfg = GoodsCfg;
    __reflect(GoodsCfg.prototype, "game.GoodsCfg");
    var GoodsTable = (function (_super) {
        __extends(GoodsTable, _super);
        function GoodsTable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GoodsTable.init = function () {
            this.analysis(game.CfgData.getDataByUrl(game.CfgData.goods_json));
        };
        GoodsTable.findSceneArrByType = function (type) {
            var self = this;
            if (!self._table)
                self.init();
            if (self.type_arr) {
                return self.type_arr;
            }
            self.type_arr = [];
            var data = self._table.getData();
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var element = data[key];
                    if (element.type == type) {
                        self.type_arr.push(element);
                    }
                }
            }
            return self.type_arr;
        };
        return GoodsTable;
    }(DLG.BaseTable));
    game.GoodsTable = GoodsTable;
    __reflect(GoodsTable.prototype, "game.GoodsTable");
})(game || (game = {}));
//# sourceMappingURL=GoodsTable.js.map