var egret;
(function (egret) {
    var SceneElementLo = (function () {
        function SceneElementLo() {
            this.id = 0;
            /**id 的字符串形式，用于内存优化 */
            this._idString = null;
            /**场景元素显示的名称*/
            this.name = "";
            /**表中坐标点数据 */
            this.coorPoint = null;
            /**场景id */
            this.sceneId = 0;
            /**影片名称，不包括路径 */
            this.movieName = null;
            /**动作类型配置，为空表示有全部动作，有固定类型动作则为模式:0_1_5，表示有3个数值表示的动作类型 */
            this.actionConfig = null;
            //坐标点
            this._point = null;
        }
        var __egretProto__ = SceneElementLo.prototype;
        Object.defineProperty(__egretProto__, "point", {
            /**获取表中的坐标点数据*/
            get: function () {
                if (!this._point) {
                    var array = this.coorPoint.split(",");
                    this._point = new egret.Point(array[0], array[1]);
                }
                return this._point;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "idString", {
            /**id 的字符串形式，用于内存优化 */
            get: function () {
                if (!this._idString)
                    this._idString = this.id + "";
                return this._idString;
            },
            set: function (value) {
            },
            enumerable: true,
            configurable: true
        });
        return SceneElementLo;
    })();
    egret.SceneElementLo = SceneElementLo;
    SceneElementLo.prototype.__class__ = "egret.SceneElementLo";
})(egret || (egret = {}));
//# sourceMappingURL=SceneElementLo.js.map