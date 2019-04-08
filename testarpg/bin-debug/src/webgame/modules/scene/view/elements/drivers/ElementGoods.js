var egret;
(function (egret) {
    /**
     * 掉落物品
     */
    var ElementGoods = (function (_super) {
        __extends(ElementGoods, _super);
        function ElementGoods() {
            _super.call(this);
            this._image = new egret.gui.UIAsset();
            this._image.x = -32;
            this._image.y = -32;
            this.addChild(this._image);
            this._namePad.y = this._image.y - 10;
        }
        var __egretProto__ = ElementGoods.prototype;
        __egretProto__.addToScene = function () {
            _super.prototype.addToScene.call(this);
            var lo = this._data.lo;
            //            this._image.url = PathData.getInstance().getResourceUrl(PathData.PATH_IMAGES_PROP,lo.iconId);
            this._image.source = "resource/item/" + lo.iconId + ".png";
        };
        return ElementGoods;
    })(egret.SceneElement);
    egret.ElementGoods = ElementGoods;
    ElementGoods.prototype.__class__ = "egret.ElementGoods";
})(egret || (egret = {}));
//# sourceMappingURL=ElementGoods.js.map