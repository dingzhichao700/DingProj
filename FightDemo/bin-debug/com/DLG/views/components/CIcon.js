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
    var CIcon = (function (_super) {
        __extends(CIcon, _super);
        function CIcon(w, h) {
            var _this = _super.call(this) || this;
            var self = _this;
            self._w = w;
            self._h = h;
            return _this;
        }
        CIcon.prototype.onLoad = function (_url) {
            var self = this;
            if (self._url != _url) {
                self._url = _url;
                if (!self._bmp) {
                    self._bmp = new egret.Bitmap();
                    self.addChild(self._bmp);
                }
                if (self._w) {
                    self._bmp.width = self._w;
                }
                if (self._h) {
                    self._bmp.height = self._h;
                }
                DLG.DLGCore.loader.load(_url, self.showBmp, self);
            }
        };
        Object.defineProperty(CIcon.prototype, "width", {
            set: function (value) {
                var self = this;
                self._w = value;
                if (self._bmp) {
                    self._bmp.width = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CIcon.prototype, "height", {
            set: function (value) {
                var self = this;
                self._h = value;
                if (self._bmp) {
                    self._bmp.height = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        CIcon.prototype.showBmp = function (url, bitmapData) {
            var self = this;
            if (url == self._url) {
                self._bmp.bitmapData = bitmapData;
                if (!self._w)
                    self.width = bitmapData.width;
                if (!self._h)
                    self.height = bitmapData.height;
            }
        };
        CIcon.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CIcon.prototype.setData = function (value) {
            var self = this;
            self._data = value;
        };
        CIcon.prototype.getData = function (value) {
            var self = this;
            return self._data;
        };
        CIcon.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(self);
            }
        };
        CIcon.prototype.onDestroy = function () {
            var self = this;
            self._url = undefined;
            self._w = undefined;
            self._h = undefined;
            if (self._bmp) {
                self.removeChild(self._bmp);
                if (self._bmp.bitmapData) {
                    self._bmp.bitmapData = undefined;
                }
            }
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(self);
                self.UUID = undefined;
                return;
            }
            DLG.Utils.onDestroy(self);
        };
        return CIcon;
    }(DLG.CComponent));
    DLG.CIcon = CIcon;
    __reflect(CIcon.prototype, "DLG.CIcon");
})(DLG || (DLG = {}));
//# sourceMappingURL=CIcon.js.map