var egret;
(function (egret) {
    var ActionMovieClipUtil = (function () {
        /**
         * 构造函数
         */
        function ActionMovieClipUtil() {
        }
        var __egretProto__ = ActionMovieClipUtil.prototype;
        /**
         * 构造并获取动作影片数据
         * @param data 影片json数据
         * @param sheet 影片纹理集
         * @returns {ActionMovieClipVo}
         */
        ActionMovieClipUtil.getActionMovieClipVo = function (data, sheet) {
            if (!data || !sheet) {
                egret.LogManager.error(ActionMovieClipUtil, "getActionMovieClipVo()参数不能为空");
                return null;
            }
            var vo = new egret.ActionMovieClipVo();
            vo.defaultActionType = data.defaultActionType;
            vo.defautlDirectionType = data.defautlDirectionType;
            for (var i in data.baseMovieClipVos) {
                if (data.baseMovieClipVos[i]) {
                    vo.baseMovieClipVos[i] = [];
                    for (var j in data.baseMovieClipVos[i]) {
                        var item = data.baseMovieClipVos[i][j];
                        if (item) {
                            var baseVo = new egret.BaseMovieClipVo();
                            vo.baseMovieClipVos[i][j] = baseVo;
                            baseVo.frameRate = item.frameRate;
                            baseVo.topLineY = item.topLineY;
                            baseVo.centerPoint.x = item.centerPoint.x;
                            baseVo.centerPoint.y = item.centerPoint.y;
                            baseVo.shadowWidth = item.shadowWidth;
                            baseVo.shadowHeight = item.shadowHeight;
                            baseVo.dataItems = [];
                            for (var k in item.dataItems) {
                                var temp = item.dataItems[k];
                                var dataItem = new egret.BaseMovieClipDataItem();
                                dataItem.x = temp.x;
                                dataItem.y = temp.y;
                                var texture = sheet.getTexture(i + "_" + j + "_" + k);
                                if (texture) {
                                    dataItem.bitmapData = texture;
                                }
                                baseVo.dataItems.push(dataItem);
                            }
                            if (dataItem.bitmapData) {
                                baseVo.hasFrameTexture = true;
                            }
                        }
                        else {
                            vo.baseMovieClipVos[i][j] = null;
                        }
                    }
                }
                else {
                    vo.baseMovieClipVos[i] = null;
                }
            }
            return vo;
        };
        //
        /**
         * 构造并获取动作影片数据，动作方向图片拆分
         * @param vo 影片数据
         * @param sheet 影片纹理集
         * @returns {ActionMovieClipVo}
         */
        ActionMovieClipUtil.getActionMovieClipVo2 = function (vo, sheet) {
            if (!vo || !sheet) {
                egret.LogManager.error(ActionMovieClipUtil, "getActionMovieClipVo()参数不能为空");
                return null;
            }
            for (var i in vo.baseMovieClipVos) {
                for (var j in vo.baseMovieClipVos[i]) {
                    var baseVo = vo.baseMovieClipVos[i][j];
                    if (!baseVo)
                        continue;
                    for (var k in baseVo.dataItems) {
                        var dataItem = baseVo.dataItems[k];
                        if (dataItem) {
                            var texture = sheet.getTexture(i + "_" + j + "_" + k);
                            if (texture) {
                                dataItem.bitmapData = texture;
                            }
                        }
                    }
                    if (dataItem.bitmapData) {
                        baseVo.hasFrameTexture = true;
                    }
                }
            }
            return vo;
        };
        return ActionMovieClipUtil;
    })();
    egret.ActionMovieClipUtil = ActionMovieClipUtil;
    ActionMovieClipUtil.prototype.__class__ = "egret.ActionMovieClipUtil";
})(egret || (egret = {}));
//# sourceMappingURL=ActionMovieClipUtil.js.map