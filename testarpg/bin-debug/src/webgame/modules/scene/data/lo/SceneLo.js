var egret;
(function (egret) {
    var SceneLo = (function () {
        function SceneLo() {
            /**
             * 编号
             */
            this.id = 0;
            /**
             * 地图 id
             */
            this.mapId = 0;
            /**
             * 场景元素显示的名称
             */
            this.name = "";
            /**
             * 默认出生点id
             */
            this.bornPoint = 0;
            /**
             * 坐标
             */
            this.coorPoint = null;
            /**
             * 势力 InfluenceType
             */
            this.area = 0;
            /**
             * 城市类型
             */
            this.type = 0;
            /**
             * 是否开启
             */
            this.enabled = 0;
            /**
             * 是否显示
             */
            this.visible = 0;
            //坐标点
            this._point = null;
            /**
             * id 的字符串形式，用于内存优化
             */
            this._idString = null;
        }
        var __egretProto__ = SceneLo.prototype;
        Object.defineProperty(__egretProto__, "point", {
            /**
             * 坐标点
             * @return
             *
             */
            get: function () {
                if (!this._point) {
                    var array = this.coorPoint.split(",");
                    this._point = new egret.Point(array[0], array[1]);
                }
                return this._point;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__egretProto__, "idString", {
            //
            /**
             * id 的字符串形式，用于内存优化
             */
            get: function () {
                if (!this._idString)
                    this._idString = this.id + "";
                return this._idString;
            },
            enumerable: true,
            configurable: true
        });
        return SceneLo;
    })();
    egret.SceneLo = SceneLo;
    SceneLo.prototype.__class__ = "egret.SceneLo";
})(egret || (egret = {}));
//# sourceMappingURL=SceneLo.js.map