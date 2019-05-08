var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var DLG;
(function (DLG) {
    var FactoryUtils = (function () {
        function FactoryUtils() {
        }
        FactoryUtils.getClass = function (_class) {
            var _name = _class.prototype.__class__;
            var ac = this.classMap[_name];
            if (!ac) {
                ac = new _class;
                this.classMap[_name] = ac;
            }
            return ac;
        };
        FactoryUtils.removeClass = function (_class) {
            var _name = _class.prototype.__class__;
            var ac = this.classMap[_name];
            if (ac) {
                delete this.classMap[_name];
                ac.onDestroy();
            }
        };
        FactoryUtils.onCreateComp = function (cls) {
            var obj;
            if (true) {
            }
            var uuid;
            var key = cls.prototype.__class__;
            if (this._uiPoolVec.hasOwnProperty(key)) {
                var arr = this._uiPoolVec[key];
                if (arr.length > 0) {
                    obj = arr.shift();
                    return obj;
                }
            }
            if (this._poolUUIDVec.hasOwnProperty(key)) {
                uuid = this._poolUUIDVec[key];
                uuid++;
            }
            else {
                uuid = 1;
            }
            this._poolUUIDVec[key] = uuid;
            obj = new cls();
            obj.UUID = key + "_" + uuid;
            return obj;
        };
        FactoryUtils.onReturnComp = function (obj) {
            if (true) {
                // 	if((obj instanceof DLG.IComponent) == false)
                // 	{
                // 		throw new Error("此类只能创建出IComponent接口的对象")
                // 	}
                if (obj.UUID == undefined) {
                    throw new Error('obj.UUID  Error');
                }
            }
            if (obj.UUID == undefined) {
                return;
            }
            var key = obj.UUID.split('_');
            if (this._uiPoolVec.hasOwnProperty(key[0]) == false) {
                this._uiPoolVec[key[0]] = [];
            }
            var arr = this._uiPoolVec[key[0]];
            arr.push(obj);
            key.length = 0;
            key = null;
        };
        return FactoryUtils;
    }());
    FactoryUtils.classMap = new Object();
    FactoryUtils._uiPoolVec = {};
    FactoryUtils._poolUUIDVec = {};
    DLG.FactoryUtils = FactoryUtils;
    __reflect(FactoryUtils.prototype, "DLG.FactoryUtils");
})(DLG || (DLG = {}));
//# sourceMappingURL=FactoryUtils.js.map