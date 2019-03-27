var egret;
(function (egret) {
    /**
     * 生命条
     */
    var HPBar = (function (_super) {
        __extends(HPBar, _super);
        function HPBar() {
            _super.call(this);
            this._hpText = new egret.TextField();
            this._hpText.width = 100;
            this._hpText.height = 16;
            //this._hpText.border = true;
            this._hpText.size = 16;
            this._hpText.textAlign = egret.HorizontalAlign.CENTER;
            this.addChild(this._hpText);
            this._progressBar = new egret.HPProgressBar();
            this._progressBar.y = this._hpText.height;
            this._progressBar.setStyle(egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green_bg.png"), egret.dataManager().pathData.getResourceUrl(egret.PathData.PATH_IMAGES_SCENE, "hp_green.png"));
            this.addChild(this._progressBar);
        }
        var __egretProto__ = HPBar.prototype;
        //
        /**
         * 设置进度条样式
         * @param bgUrl 进度背景地址
         * @param barUrl 进度条地址
         * @param width 进度条宽
         * @param height 进度条高
         */
        __egretProto__.setStyle = function (bgUrl, barUrl, width, height) {
            this._progressBar.setStyle(bgUrl, barUrl);
            this._progressBar.setProperties(width, height);
            this._progressBar.x = (this._hpText.width - this._progressBar.width) / 2;
        };
        //
        /**
         * 设置属性
         * @param text 生命值
         * @param percent 进度条百分比
         */
        __egretProto__.setProperty = function (text, percent) {
            if (text) {
                if (!this._hpText.parent) {
                    this.addChild(this._hpText);
                }
                this._hpText.text = text;
            }
            else if (this._hpText.parent) {
                this._hpText.parent.removeChild(this._hpText);
            }
            this._progressBar.percent = percent;
        };
        return HPBar;
    })(egret.CoreContainer);
    egret.HPBar = HPBar;
    HPBar.prototype.__class__ = "egret.HPBar";
})(egret || (egret = {}));
//# sourceMappingURL=HPBar.js.map