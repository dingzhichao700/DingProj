var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var Table = (function () {
        function Table() {
        }
        Table.prototype.setData = function (dataArr) {
            var parme = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parme[_i - 1] = arguments[_i];
            }
            var self = this;
            self.data_dic = {};
            self.data_dic['id'] = {};
            self.data_vec = [];
            var other = [];
            var i = 0;
            var len;
            //0|p1|p2   obj
            //1|p1|p2	vec
            // if(parme && parme.length > 0)
            // {
            // 	for (let key in parme) {
            // 		if (parme.hasOwnProperty(key)) {
            // 			let element = parme[key];
            // 			let sp = element.split('|');
            // 			let str ;
            // 			len = sp.length;
            // 			for(i = 0 ;i < sp.length ;i ++)
            // 			{
            // 				str += i == 0 ? sp[i] : '_' + sp[i];
            // 			}
            // 			self.data_dic[str ] = sp[0] == '0' ? {}:[];
            // 		}
            // 	}
            // }
            var j;
            var jLen = other.length;
            len = dataArr.length;
            var nameArr = dataArr[1]; //属性名称
            for (i = 2; i < len; i++) {
                var newObj = {};
                var data = dataArr[i];
                var k = 0;
                var kLen = nameArr.length;
                for (k = 0; k < kLen; k++) {
                    newObj[nameArr[k]] = data[k];
                }
                self.data_dic['id'][newObj.id] = newObj;
                for (j = 0; j < jLen; j++) {
                    var str = other[j];
                    var sp = str.split('|');
                    var valueStr = void 0;
                    var s = void 0;
                    for (s = 0; s < sp.length; s++) {
                        valueStr += newObj[sp[s]] + '';
                    }
                    if (valueStr[0] == 0) {
                        self.data_dic[str][valueStr] = newObj;
                    }
                    else {
                        if (self.data_dic[str][valueStr] == undefined) {
                            self.data_dic[str][valueStr] = [];
                        }
                        self.data_dic[str][valueStr].push(newObj);
                    }
                }
                self.data_vec.push(newObj);
            }
        };
        Table.prototype.getObjById = function (id) {
            var self = this;
            var obj = self.data_dic['id'];
            if (obj.hasOwnProperty(id + '')) {
                return obj[id + ''];
            }
            else {
                return null;
            }
        };
        Table.prototype.getDatavec = function () {
            return this.data_vec;
        };
        Table.prototype.getData = function () {
            var self = this;
            return self.data_dic['id'];
        };
        Table.prototype.getVecByAny = function () {
            var parme = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parme[_i] = arguments[_i];
            }
            var data = null;
            return data;
        };
        Table.prototype.getObjByAny = function () {
            var parme = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                parme[_i] = arguments[_i];
            }
            var data = null;
            return data;
        };
        return Table;
    }());
    DLG.Table = Table;
    __reflect(Table.prototype, "DLG.Table");
})(DLG || (DLG = {}));
//# sourceMappingURL=Table.js.map