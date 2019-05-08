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
    var CNumClip = (function (_super) {
        __extends(CNumClip, _super);
        // public UUID:string;
        function CNumClip() {
            var _this = _super.call(this) || this;
            _this._num = -1;
            var self = _this;
            self.touchEnabled = false;
            self.touchChildren = false;
            var hLayout = new eui.HorizontalLayout();
            // hLayout.gap = 10;
            // hLayout.paddingTop = 30;
            // hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            self.layout = hLayout; /// 水平布局
            self._numbmp = [];
            return _this;
        }
        CNumClip.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var self = this;
            var bmp;
            bmp = self.getChildAt(0);
            var url = bmp.source;
            self._soureUrl = url.slice(0, url.length - 1);
            egret.callLater(self.renderDraw, self);
        };
        /**
         * @param value egret.HorizontalAlign
         */
        CNumClip.prototype.setAlign = function (value) {
            var self = this;
            var hLayout = self.layout;
            // if(value == NumClipAlign.LEFT)
            // {
            hLayout.horizontalAlign = value;
            // }else if(value == NumClipAlign.RIGHT)
            // {
            // 	hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
            // }
        };
        /**设置间隔 */
        CNumClip.prototype.setGap = function (value) {
            var self = this;
            var hLayout = self.layout;
            hLayout.gap = value;
        };
        /**设置数字值 */
        CNumClip.prototype.setValue = function (value) {
            var self = this;
            self._num = value;
            egret.callLater(self.renderDraw, self);
        };
        CNumClip.prototype.renderDraw = function () {
            var self = this;
            if (self._soureUrl) {
                var numStr = self._num + "";
                var len = numStr.length;
                var bmp = void 0;
                var hasNumChildren = self.numChildren;
                var i = void 0;
                for (i = 0; i < len; i++) {
                    if (i < hasNumChildren) {
                        bmp = self.getChildAt(i);
                    }
                    else {
                        if (self._numbmp.length > 0) {
                            bmp = self._numbmp.shift();
                        }
                        else {
                            bmp = new DLG.CImage();
                        }
                        self.addChild(bmp);
                    }
                    bmp.source = self._soureUrl + numStr.slice(i, i + 1) + '_png';
                }
                while (self.numChildren > len) {
                    bmp = self.getChildAt(i);
                    self._numbmp.push(bmp);
                }
            }
        };
        CNumClip.prototype.onDestroy = function () {
            var self = this;
            self._soureUrl = null;
            self.layout = null;
            var bmp;
            while (self._numbmp.length > 0) {
                bmp = self._numbmp.shift();
                bmp.onDestroy();
                bmp.removeFromParent();
            }
            self._numbmp = null;
            self.layout = null;
            _super.prototype.onDestroy.call(this);
        };
        return CNumClip;
    }(DLG.CGroup));
    DLG.CNumClip = CNumClip;
    __reflect(CNumClip.prototype, "DLG.CNumClip");
})(DLG || (DLG = {}));
//# sourceMappingURL=CNumClip.js.map