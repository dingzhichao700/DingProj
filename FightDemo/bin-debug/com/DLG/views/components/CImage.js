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
    var CImage = (function (_super) {
        __extends(CImage, _super);
        function CImage(source) {
            return _super.call(this, source) || this;
        }
        Object.defineProperty(CImage.prototype, "source", {
            set: function (value) {
                // if (DEBUG)
                // {
                //     if (value !== null && value !== undefined )
                //     {
                //         if (value.indexOf('_png') == -1 )
                //         {
                //             throw new Error('CImage 图片格式有错');
                //         }
                //         if ((<string>value).indexOf('Texture') != -1 && (<string>value).indexOf('_json') == -1)
                //         {
                //             throw new Error("图集URL有错一：" + value);
                //         }
                //         let arr = (<string>value).split("_json.");
                //         if (arr[1].indexOf(arr[0]) == -1)
                //         {
                //             throw new Error("图集URL有错二：" + value);
                //         }
                //     }
                // }
                egret.superSetter(CImage, this, "source", value);
            },
            enumerable: true,
            configurable: true
        });
        CImage.prototype.setSkinName = function (value) {
            // this.skinName = value;
        };
        CImage.prototype.setData = function (value) {
            // let self = this;
            // self._data = value;
            throw new Error('请使用source');
        };
        CImage.prototype.getData = function (value) {
            // let self = this;
            // return self._data;
            throw new Error('请使用source');
        };
        CImage.prototype.removeFromParent = function () {
            var self = this;
            if (self.parent) {
                self.parent.removeChild(this);
            }
        };
        CImage.prototype.onDestroy = function () {
            var self = this;
            if (self.texture && self.texture.bitmapData) {
                self.texture = undefined;
            }
            if (self.UUID != undefined) {
                DLG.FactoryUtils.onReturnComp(this);
                self.UUID = undefined;
                self.source = undefined;
                return;
            }
            DLG.Utils.onDestroy(this);
        };
        return CImage;
    }(eui.Image));
    DLG.CImage = CImage;
    __reflect(CImage.prototype, "DLG.CImage", ["DLG.IComponent", "eui.UIComponent", "egret.DisplayObject"]);
})(DLG || (DLG = {}));
//# sourceMappingURL=CImage.js.map