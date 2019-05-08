var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    /**
     *大背景图
     */
    var CBigImage = (function (_super) {
        __extends(CBigImage, _super);
        function CBigImage(source) {
            var _this = _super.call(this, source) || this;
            _this.resArr = [];
            return _this;
        }
        Object.defineProperty(CBigImage.prototype, "source", {
            set: function (value) {
                if (true) {
                    // if (egret.is(value, 'string') == false)
                    // {
                    //     throw new Error('CImage 控件只能设置string');
                    // }
                    if (value.indexOf('_json') != -1) {
                        throw new Error("大背景图URL有错：" + value);
                    }
                }
                if (this.resArr.indexOf(value) == -1) {
                    this.resArr.push(value);
                }
                egret.superSetter(CBigImage, this, "source", value);
            },
            enumerable: true,
            configurable: true
        });
        CBigImage.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CBigImage.prototype.setData = function (value) {
            // let self = this;
            // self._data = value;
            throw new Error('请使用source');
        };
        CBigImage.prototype.getData = function (value) {
            // let self = this;
            // return self._data;
            throw new Error('请使用source');
        };
        CBigImage.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
            self.onDestroy();
        };
        CBigImage.prototype.onDestroy = function () {
            var self = this;
            if (self.resArr) {
                var i = 0;
                var len = self.resArr.length;
                for (i = 0; i < len; i++) {
                    RES.destroyRes(self.resArr[i]);
                }
                self.resArr.length = 0;
                self.resArr = undefined;
            }
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                return;
            }
            DLG.Utils.onDestroy(this);
        };
        return CBigImage;
    }(eui.Image));
    DLG.CBigImage = CBigImage;
    __reflect(CBigImage.prototype, "DLG.CBigImage", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CBigImage.js.map