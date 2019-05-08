var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var BaseTable = (function () {
        function BaseTable() {
        }
        BaseTable.init = function () {
        };
        BaseTable.analysis = function (dataArr) {
            if (this._table == undefined) {
                // var dataArr = JSON.parse(RES.getRes(name));
                if (!dataArr) {
                    throw new Error('配置文件不存在：' + name);
                }
                this._table = new DLG.Table();
                this._table.setData(dataArr);
            }
        };
        BaseTable.getCfgById = function (id) {
            var self = this;
            if (!self._table) {
                self.init();
            }
            var cfg;
            cfg = self._table.getObjById(id);
            if (!cfg) {
                throw new Error('配置文件不存在：' + id);
            }
            return cfg;
        };
        BaseTable.getDataVec = function () {
            var self = this;
            if (!self._table) {
                self.init();
            }
            var arr;
            arr = self._table.getDatavec();
            return arr;
        };
        return BaseTable;
    }());
    DLG.BaseTable = BaseTable;
    __reflect(BaseTable.prototype, "DLG.BaseTable");
})(DLG || (DLG = {}));
//# sourceMappingURL=BaseTable.js.map