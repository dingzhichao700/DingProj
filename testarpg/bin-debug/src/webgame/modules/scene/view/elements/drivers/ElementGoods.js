var egret;
(function (egret) {
    /**
     * 掉落物品
     */
    var ElementGoods = (function (_super) {
        __extends(ElementGoods, _super);
        function ElementGoods() {
            _super.call(this);
            this._image = new egret.Image(null, 50, 50);
            this._image.isShowLoading = false;
            this._image.x = -this._image.width / 2;
            this._image.y = -this._image.height;
            this.addChild(this._image);
            this._namePad.y = this._image.y - 10;
        }
        var __egretProto__ = ElementGoods.prototype;
        //
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
            var lo = this._data.lo;
            this._image.url = egret.PathData.getInstance().getResourceUrl(egret.PathData.PATH_IMAGES_PROP, lo.iconId);
        };
        return ElementGoods;
    })(egret.SceneElement);
    egret.ElementGoods = ElementGoods;
    ElementGoods.prototype.__class__ = "egret.ElementGoods";
})(egret || (egret = {}));
//# sourceMappingURL=ElementGoods.js.map