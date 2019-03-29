var egret;
(function (egret) {
    var TooltipManager = (function () {
        //
        function TooltipManager() {
        }
        var __egretProto__ = TooltipManager.prototype;
        //
        /**
         * 初始化
         * @param stage:Stage 舞台
         * @param container:DisplayObjectContainer = null 容器，无效时使用 stage
         * @param gapX:int = 5 提示内容和提示容器边框的水平距离
         * @param gapY:int = 5 提示内容和提示容器边框的垂直距离
         * @param offsetX:int = 15 提示容器和鼠标的水平距离
         * @param offsetY:int = 15 提示容器和鼠标的垂直距离
         *
         */
        TooltipManager.init = function (stage, container, gapX, gapY, offsetX, offsetY) {
            if (container === void 0) { container = null; }
            if (gapX === void 0) { gapX = 5; }
            if (gapY === void 0) { gapY = 5; }
            if (offsetX === void 0) { offsetX = 15; }
            if (offsetY === void 0) { offsetY = 15; }
            if (!stage) {
                egret.LogManager.error(TooltipManager, "舞台不能为空:stage = " + stage);
                return;
            }
            TooltipManager._stage = stage;
            TooltipManager._tipContainer = container ? container : TooltipManager._stage;
            TooltipManager._gapX = gapX;
            TooltipManager._gapY = gapY;
            TooltipManager._offsetX = offsetX;
            TooltipManager._offsetY = offsetY;
            TooltipManager._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, TooltipManager.stageMouseDown, TooltipManager);
        };
        /**
         * 鼠标按下
         * @param event
         *
         */
        TooltipManager.stageMouseDown = function (event) {
            var array = TooltipManager._showHashMap.keys();
            var length = array.length;
            for (var i = 0; i < length; i++) {
                var v = array[i];
                TooltipManager.hideTooltip(v);
            }
        };
        //
        /**
         * 设置工具提示
         * @param target:InteractiveObject 显示交互对象
         * @param tooltip:* 提示数据，字符串(支持html文本)或显示对象，为null时移除工具提示
         * @see ITooltip
         * @see CoreSprite.tooltip
         */
        TooltipManager.setTooltip = function (target, tooltip) {
            if (!TooltipManager._stage) {
                egret.LogManager.error(TooltipManager, "未初始化数据，请调用init()方法初始化数据");
                return;
            }
            if (!target) {
                egret.LogManager.error(TooltipManager, "target不能为空: target = " + target);
                return;
            }
            if (!tooltip) {
                TooltipManager.removeTooltip(target);
                return;
            }
            if (!(typeof (tooltip) == "string") && !(tooltip instanceof egret.DisplayObject)) {
                egret.LogManager.error(TooltipManager, "无效的tooltip对象:tooltip = " + tooltip);
                return;
            }
            if (TooltipManager._hashMap.containsKey(target)) {
                TooltipManager.removeTooltip(target);
            }
            TooltipManager._hashMap.put(target, tooltip);
            target.addEventListener(egret.TouchEvent.TOUCH_OVER, TooltipManager.targetMouseOver, TooltipManager);
        };
        //
        /**
         * 移除工具提示
         * @param target:InteractiveObject 显示交互对象
         *
         */
        TooltipManager.removeTooltip = function (target) {
            if (!target) {
                egret.LogManager.error(TooltipManager, "target不能为空: target = " + target);
                return;
            }
            TooltipManager._innerHashMap.remove(target);
            var tooltip = TooltipManager._hashMap.remove(target);
            TooltipManager.hideTooltip(tooltip);
            target.removeEventListener(egret.TouchEvent.TOUCH_OVER, TooltipManager.targetMouseOver, TooltipManager);
        };
        //
        /**
         * 显示工具提示，用于快速临时性显示的工具提示，不基于显示交互对象即可显示某一个工具提示
         * @param tooltip:* 提示数据，字符串或显示对象，不能为null
         * @param x:int = 0  显示的x坐标
         * @param y:int = 0 显示的y坐标
         * @see hideTooltip()
         *
         */
        TooltipManager.showTooltip = function (tooltip, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var content = null;
            var container = null;
            var textField = null;
            if (TooltipManager._showHashMap.containsKey(tooltip))
                TooltipManager.hideTooltip(tooltip);
            if (typeof (tooltip) == "string") {
                textField = TooltipManager._textField;
                if (!textField || (textField && textField.stage)) {
                    textField = new egret.TextField();
                    textField.multiline = true;
                    textField.size = 16;
                    //保存单例文本对象
                    if (!TooltipManager._textField)
                        TooltipManager._textField = textField;
                }
                if (textField.text != tooltip)
                    textField.text = tooltip;
                content = textField;
            }
            else if (tooltip instanceof egret.DisplayObject) {
                content = tooltip;
            }
            else {
                egret.LogManager.error(TooltipManager, "无效的tooltip对象:tooltip = " + tooltip);
                return;
            }
            if (typeof (tooltip) == "string") {
                container = TooltipManager._container;
                if (!container || (container && container.stage)) {
                    container = new egret.CoreSprite();
                    container.touchChildren = false;
                    container.touchEnabled = false;
                    //if(TooltipManager._style)
                    //	container.setStyle(TooltipManager._style,false,false);
                    //保存单例容器
                    if (!TooltipManager._container)
                        TooltipManager._container = container;
                }
                if (content.parent != container) {
                    container.addChild(content);
                }
                content.x = TooltipManager._gapX;
                content.y = TooltipManager._gapY;
                container.width = Math.floor(content.width + TooltipManager._gapX * 2);
                container.height = Math.floor(content.height + TooltipManager._gapY * 2);
                if (!TooltipManager._style) {
                    TooltipManager.drawRect(container, container.width, container.height, 0x0, 0.6, false);
                    TooltipManager.drawRectBorder(container, container.width - 1, container.height - 1, 0x333333, 1);
                }
                else {
                    container.graphics.clear();
                }
                content = container;
            }
            TooltipManager._showHashMap.put(tooltip, content);
            if (content.parent != TooltipManager._tipContainer)
                TooltipManager._tipContainer.addChild(content);
            TooltipManager.updatePosition(content, x, y);
        };
        //
        /**
         * 移除快速工具提示
         * @param tooltip:* 提示数据，字符串或显示对象
         * @see showTooltip()
         *
         */
        TooltipManager.hideTooltip = function (tooltip) {
            var content = TooltipManager._showHashMap.remove(tooltip);
            if (content) {
                egret.DisplayObjectUtil.remove(content);
                //因hasOwnProperty()只能用于动态属性，替换
                if (typeof (tooltip) == "string" && content != TooltipManager._container && "destroy" in content)
                    content.destroy();
            }
        };
        //
        /**
         * 获取显示对象实际显示的工具提示对象
         * @param target:InteractiveObject 显示对象
         * @return 提示数据，字符串(支持html文本)或显示对象
         *
         */
        TooltipManager.getTooltip = function (target) {
            var tooltip = TooltipManager._hashMap.get(target);
            //若实现ITooltip接口，tooltip属性为自身实例时使用tooltip属性返回的结果，用于鼠标经过时动态生成tooltip
            if (target == tooltip) {
                //因hasOwnProperty()只能用于动态属性，替换
                if ("tooltip" in target)
                    tooltip = target["tooltip"];
            }
            if (tooltip && !TooltipManager._innerHashMap.containsKey(tooltip)) {
                //内部动态tooltip表
                TooltipManager._innerHashMap.put(target, tooltip);
            }
            return tooltip;
        };
        //
        /**
         * 获取显示对象当前正在显示的工具提示对象
         * @param target:InteractiveObject 显示对象
         * @return 提示数据，字符串(支持html文本)或显示对象
         *
         */
        TooltipManager.getCurrentTooltip = function (target) {
            return TooltipManager._innerHashMap.get(target);
        };
        //
        /**
         * 设置工具提示背景样式
         * @param style:DisplayObject:DisplayObject
         * @see CoreComponent.setStyle()
         *
         */
        TooltipManager.setStyle = function (style) {
            if (!style) {
                egret.LogManager.error(TooltipManager, "style不能为空: style = " + style);
                return;
            }
            TooltipManager._style = style;
            for (var i in TooltipManager._showHashMap) {
                var container = TooltipManager._showHashMap[i];
            }
        };
        //
        /**
         * 鼠标经过
         * @param e
         *
         */
        TooltipManager.targetMouseOver = function (e) {
            if (e.touchDown)
                return;
            //阻断冒泡，多个显示对象相互包含时只显示最上面的显示对象tooltip
            e.stopPropagation();
            var target = (e.currentTarget);
            var tooltip = TooltipManager.getTooltip(target);
            if (tooltip) {
                TooltipManager.showTooltip(tooltip, TooltipManager._stage.anchorX + TooltipManager._offsetX, TooltipManager._stage.anchorY + TooltipManager._offsetY);
                target.addEventListener(egret.TouchEvent.TOUCH_MOVE, TooltipManager.targetMouseMove, TooltipManager);
                target.addEventListener(egret.TouchEvent.TOUCH_OUT, TooltipManager.targetMouseOut, TooltipManager);
                target.addEventListener(egret.Event.REMOVED_FROM_STAGE, TooltipManager.targetRemoveFromeStage, TooltipManager);
            }
        };
        //
        /**
         * 鼠标移出
         * @param e
         *
         */
        TooltipManager.targetMouseOut = function (e) {
            TooltipManager.targetRemoveFromeStage(e);
        };
        //
        /**
         * 从显示列表移除时
         * @param e
         *
         */
        TooltipManager.targetRemoveFromeStage = function (e) {
            var target = (e.currentTarget);
            if (target) {
                target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, TooltipManager.targetMouseMove, TooltipManager);
                target.removeEventListener(egret.TouchEvent.TOUCH_OUT, TooltipManager.targetMouseOut, TooltipManager);
                target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, TooltipManager.targetRemoveFromeStage, TooltipManager);
                var tooltip = TooltipManager._hashMap.get(target);
                if (target == tooltip) {
                    //因hasOwnProperty()只能用于动态属性，替换
                    if ("tooltip" in target)
                        tooltip = TooltipManager._innerHashMap.remove(target);
                }
                TooltipManager.hideTooltip(tooltip);
            }
        };
        //
        /**
         * 鼠标移动时
         * @param e
         *
         */
        TooltipManager.targetMouseMove = function (e) {
            var target = (e.currentTarget);
            var tooltip = TooltipManager._hashMap.get(target);
            if (target == tooltip)
                tooltip = TooltipManager._innerHashMap.get(target);
            if (tooltip)
                var container = TooltipManager._showHashMap.get(tooltip);
            if (container)
                TooltipManager.updatePosition(container, TooltipManager._stage.anchorX + TooltipManager._offsetX, TooltipManager._stage.anchorY + TooltipManager._offsetY);
            //e.updateAfterEvent();
        };
        //
        /**
         * 更新位置
         * @param container:DisplayObject tooltip容器
         * @param x:int x坐标
         * @param y:int y坐标
         *
         */
        TooltipManager.updatePosition = function (container, x, y) {
            if (y === void 0) { y = 0; }
            //超出舞台时，调换为对称位置
            if (container.width + x > TooltipManager._stage.stageWidth)
                x -= TooltipManager._offsetX * 2 + container.width;
            if (container.height + y > TooltipManager._stage.stageHeight)
                y -= TooltipManager._offsetY * 2 + container.height;
            x = Math.max(x, 0);
            y = Math.max(y, 0);
            container.x = x;
            container.y = y;
        };
        /**
         * 绘制矩形
         * @param target:* Shape或Sprite对象
         * @param width:Number 绘制宽度
         * @param height:Number 绘制高度
         * @param color:uint=0x0 填充颜色
         * @param alpha:Number=0 填充alpha
         * @param drawBorder:Boolean=false 是否绘制边框
         *
         */
        TooltipManager.drawRect = function (target, width, height, color, alpha, drawBorder) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 0; }
            if (drawBorder === void 0) { drawBorder = false; }
            target.graphics.clear();
            if (width == 0 || height == 0)
                return;
            if (drawBorder)
                TooltipManager.drawRectBorder(target, width, height, color, alpha);
            target.graphics.beginFill(color, alpha);
            target.graphics.drawRect(0, 0, width, height);
            target.graphics.endFill();
        };
        //
        /**
         * 绘制矩形边框
         * @param target:* Shape或Sprite对象
         * @param width:Number 绘制宽度
         * @param height:Number 绘制高度
         * @param color:uint=0x0 边框颜色
         * @param alpha:Number 边框alpha
         * @param thickness:Number 边框厚度
         *
         */
        TooltipManager.drawRectBorder = function (target, width, height, color, alpha, thickness) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 0; }
            if (thickness === void 0) { thickness = 0; }
            if (width == 0 || height == 0)
                return;
            target.graphics.lineStyle(thickness, color, alpha);
            target.graphics.drawRect(0, 0, width, height);
        };
        //数据表
        TooltipManager._hashMap = new egret.HashMap();
        //已显示的数据表
        TooltipManager._showHashMap = new egret.HashMap();
        //实现ITooltip时由tooltip属性返回的数据表
        TooltipManager._innerHashMap = new egret.HashMap();
        //单例的文本
        TooltipManager._textField = null;
        //单例的容器
        TooltipManager._container = null;
        //舞台
        TooltipManager._stage = null;
        //样式
        TooltipManager._style = null;
        //显示 tooltip 的容器
        TooltipManager._tipContainer = null;
        //提示内容和边框的水平距离
        TooltipManager._gapX = 5;
        //提示内容和边框的垂直距离
        TooltipManager._gapY = 5;
        //提示容器和鼠标的水平和垂直距离
        TooltipManager._offsetX = 15;
        TooltipManager._offsetY = 15;
        return TooltipManager;
    })();
    egret.TooltipManager = TooltipManager;
    TooltipManager.prototype.__class__ = "egret.TooltipManager";
})(egret || (egret = {}));
