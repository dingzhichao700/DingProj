var egret;
(function (egret) {
    var DisplayObjectUtil = (function () {
        /**
         * 构造函数
         */
        function DisplayObjectUtil() {
            throw new Error("DisplayObjectUtil just is a static class.");
        }
        var __egretProto__ = DisplayObjectUtil.prototype;
        //
        /**
         * 将显示对象从其父容器移除
         * @param args: 显示对象列表
         *
         */
        DisplayObjectUtil.remove = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var displayObject = args[i];
                if (displayObject && displayObject.parent)
                    displayObject.parent.removeChild(displayObject);
            }
        };
        //
        /**
         * 根据参数的属性添加子项
         * @param child 要添加的子项
         * @param container 容器
         * @param xyChild 坐标对象
         * @param offsetContainer 坐标对象所在的容器，为null时不忽然此容器的坐标
         */
        DisplayObjectUtil.addChild = function (child, container, xyChild, offsetContainer) {
            if (offsetContainer === void 0) { offsetContainer = null; }
            var x = xyChild.x;
            var y = xyChild.y;
            if (offsetContainer) {
                x += offsetContainer.x;
                y += offsetContainer.y;
            }
            child.x = x;
            child.y = y;
            container.addChild(child);
        };
        //
        /**
         * 用目标对象替换源对象，将目标数组中的显示对象设置为源数组中的相应显示对象的坐标，并添加到源对象所在容器中，然后移除源对象
         * @param sources:Array 源显示对象数组
         * @param targets:Array 目标显示对象数组
         * @param addToSourceContainer:Boolean = true 是否将目标对象添加至源对象所在的容器，此值为true时将设置xy为sources对象的xy并添加至sources的parent中，
         * 并设为sources所在的层级位置，parent不存在时无效
         */
        DisplayObjectUtil.swap = function (sources, targets, addToSourceContainer) {
            if (addToSourceContainer === void 0) { addToSourceContainer = true; }
            var length = sources.length;
            var index = 0;
            var container = null;
            for (var i = 0; i < length; i++) {
                if (addToSourceContainer) {
                    //因hasOwnProperty()只能用于动态属性，替换
                    if ("parent" in sources[i]) {
                        container = sources[i].parent;
                        if (container) {
                            targets[i].x = sources[i].x;
                            targets[i].y = sources[i].y;
                            index = container.getChildIndex(sources[i]);
                            container.removeChild(sources[i]);
                            container.addChildAt(targets[i], index);
                        }
                    }
                }
            }
        };
        //
        /**
        * 用目标对象替换源对象，将目标数组中的显示对象设置为源数组中的相应显示对象的坐标，并添加到源对象所在容器中，然后移除源对象，此方法针对egret的UI组件调换
        * @param sources:Array 源显示对象数组
        * @param targets:Array 目标显示对象数组
        * @param addToSourceContainer:Boolean = true 是否将目标对象添加至源对象所在的容器，此值为true时将设置xy为sources对象的xy并添加至sources的parent中，
        * 并设为sources所在的层级位置，parent不存在时无效
        */
        DisplayObjectUtil.swap2 = function (sources, targets, addToSourceContainer) {
            if (addToSourceContainer === void 0) { addToSourceContainer = true; }
            var length = sources.length;
            var index = 0;
            var container = null;
            for (var i = 0; i < length; i++) {
                if (addToSourceContainer) {
                    //因hasOwnProperty()只能用于动态属性，替换
                    if ("parent" in sources[i]) {
                        container = sources[i].parent;
                        if (container) {
                            targets[i].x = sources[i].x;
                            targets[i].y = sources[i].y;
                            index = container.getChildIndex(sources[i]);
                            container["removeElement"](sources[i]);
                            container["addElementAt"](targets[i], index);
                        }
                    }
                }
            }
        };
        //
        /**
         * 递归销毁容器中的所有后代显示对象，子项实现IDestroy才能销毁，否则仅从显示列表移除，
         * 此方法销毁可能不全，因变量指向的显示对象不一定在容器中，使用destroyTargets()销毁多个指定对象
         * @param container:DisplayObjectContainer 容器
         * @param recursive:Boolean=false 是否递归子项
         *
         */
        DisplayObjectUtil.destroyChildren = function (container, recursive) {
            if (recursive === void 0) { recursive = true; }
            if (!container)
                return;
            if (container instanceof egret.Stage)
                egret.LogManager.warn(DisplayObjectUtil, "【警告】销毁的对象为 stage");
            var child = null;
            var next = null;
            var num = 0;
            while (container.numChildren > num) {
                try {
                    child = container.getChildAt(num);
                    if (!child)
                        break;
                    if (child.cacheAsBitmap)
                        child.cacheAsBitmap = false;
                    next = child;
                    //因hasOwnProperty()只能用于动态属性，替换
                    if ("destroy" in child)
                        child["destroy"]();
                    //先销毁再删除，防止引用stage无法删除侦听
                    if (child.parent)
                        child.parent.removeChild(child);
                    if (recursive && next)
                        DisplayObjectUtil.destroyChildren(next, recursive);
                }
                catch (e) {
                    num++;
                    egret.LogManager.error(DisplayObjectUtil, e);
                }
            }
        };
        //
        /**
         * 递归销毁所有后代显示对象，子项实现IDestroy才能销毁，否则仅从显示列表移除，销毁后将无法重新使用
         * @param args 要销毁的对象列表
         *
         */
        DisplayObjectUtil.destroyTargets = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var length = args.length;
            for (var i = 0; i < length; i++) {
                var target = args[i];
                if (target instanceof egret.DisplayObjectContainer)
                    DisplayObjectUtil.destroyChildren(target);
                if (target) {
                    //因hasOwnProperty()只能用于动态属性，替换
                    if ("destroy" in target)
                        target.destroy();
                    if (target.parent)
                        target.parent.removeChild(target);
                }
            }
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
        DisplayObjectUtil.drawRect = function (target, width, height, color, alpha, drawBorder, borderColor, borderAlpha, borderThickness) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 1; }
            if (drawBorder === void 0) { drawBorder = false; }
            if (borderColor === void 0) { borderColor = 0x0; }
            if (borderAlpha === void 0) { borderAlpha = 1; }
            if (borderThickness === void 0) { borderThickness = 0; }
            target.graphics.clear();
            if (width == 0 || height == 0)
                return;
            if (drawBorder)
                DisplayObjectUtil.drawRectBorder(target, width, height, borderColor, borderAlpha, borderThickness);
            target.graphics.beginFill(color, alpha);
            target.graphics.drawRect(0, 0, width, height);
            target.graphics.endFill();
        };
        //
        /**
         * 根据矩形绘制矩形
         * @param target:* Shape或Sprite对象
         * @param rect:Rectangle 矩形，宽度为0或高度为0时清除绘制，为null时也清除绘制
         * @param color:uint=0x0 颜色
         * @param alpha:Number=1 透明度
         * @param drawBorder:Boolean=false 是否绘制边框
         * @param borderColor:uint=0x0 边框颜色
         * @param borderAlpha:Number=1 边框透明度
         * @param borderThickness:Number=0 边框线宽
         *
         */
        DisplayObjectUtil.drawRectByRect = function (target, rect, color, alpha, drawBorder, borderColor, borderAlpha, borderThickness) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 1; }
            if (drawBorder === void 0) { drawBorder = false; }
            if (borderColor === void 0) { borderColor = 0x0; }
            if (borderAlpha === void 0) { borderAlpha = 1; }
            if (borderThickness === void 0) { borderThickness = 0; }
            target.graphics.clear();
            if (!rect || rect.width == 0 || rect.height == 0)
                return;
            if (drawBorder)
                DisplayObjectUtil.drawBorderByRect(target, rect, borderColor, borderAlpha, borderThickness);
            target.graphics.beginFill(color, alpha);
            target.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
            target.graphics.endFill();
        };
        //
        /**
         * 根据矩形绘制矩形边框
         * @param target:* Shape或Sprite对象
         * @param rect:Rectangle 矩形，宽度为0或高度为0时清除绘制，为null时也清除绘制
         * @param color:uint=0x0 颜色
         * @param alpha:Number=1 透明度
         * @param thickness:Number=0 线宽
         *
         */
        DisplayObjectUtil.drawBorderByRect = function (target, rect, color, alpha, thickness) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 1; }
            if (thickness === void 0) { thickness = 0; }
            target.graphics.clear();
            if (!rect || rect.width == 0 || rect.height == 0)
                return;
            target.graphics.lineStyle(thickness, color, alpha, true);
            target.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
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
        DisplayObjectUtil.drawRectBorder = function (target, width, height, color, alpha, thickness) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 1; }
            if (thickness === void 0) { thickness = 0; }
            target.graphics.clear();
            if (width == 0 || height == 0)
                return;
            target.graphics.lineStyle(thickness, color, alpha, true);
            target.graphics.drawRect(0, 0, width, height);
        };
        /**
         * 绘制矩形
         * @param target:* Shape或Sprite对象
         * @param width:Number 绘制宽度
         * @param height:Number 绘制高度
         * @param color:uint=0x0 填充颜色
         * @param alpha:Number=0 填充alpha
         * @param drawBorder:Boolean=false 是否绘制边框
         * @param ew:Number 圆角宽度
         * @param eh:Number 圆角高度
         */
        DisplayObjectUtil.drawRoundRect = function (target, width, height, color, alpha, drawBorder, borderColor, borderAlpha, borderThickness, ew, eh) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 0; }
            if (drawBorder === void 0) { drawBorder = false; }
            if (borderColor === void 0) { borderColor = 0x0; }
            if (borderAlpha === void 0) { borderAlpha = 0; }
            if (borderThickness === void 0) { borderThickness = 0; }
            if (ew === void 0) { ew = 0; }
            if (eh === void 0) { eh = 0; }
            target.graphics.clear();
            if (width == 0 || height == 0)
                return;
            if (drawBorder)
                DisplayObjectUtil.drawRoundRectBorder(target, width, height, borderColor, borderAlpha, borderThickness, ew, eh);
            target.graphics.beginFill(color, alpha);
            target.graphics.drawRoundRect(0, 0, width, height, ew, eh);
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
         * @param ew:Number 圆角宽度
         * @param eh:Number 圆角高度
         */
        DisplayObjectUtil.drawRoundRectBorder = function (target, width, height, color, alpha, thickness, ew, eh) {
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 0; }
            if (thickness === void 0) { thickness = 0; }
            if (ew === void 0) { ew = 0; }
            if (eh === void 0) { eh = 0; }
            target.graphics.clear();
            if (width == 0 || height == 0)
                return;
            if (ew != 0 && eh == 0)
                eh = ew;
            if (eh != 0 && ew == 0)
                ew = eh;
            target.graphics.lineStyle(thickness, color, alpha, true);
            target.graphics.drawRoundRect(0, 0, width, height, ew, eh);
        };
        //
        /**
         * 绘制圆形
         * @param target:* 目标对象
         * @param radius:Number 半径
         * @param x:Number = 0  圆心x
         * @param y:Number = 0 圆心y
         * @param color:uint = 0x0 颜色
         * @param alpha:Number = 1 透明度
         * @param border:Boolean = false 是否绘制边框
         * @param borderColor:uint = 0x0 边框颜色
         * @param thickness:Number = 0 边框大小
         * @param borderAlpha:Number = 1 边框透明度
         *
         */
        DisplayObjectUtil.drawCircle = function (target, radius, x, y, color, alpha, border, borderColor, thickness, borderAlpha) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (color === void 0) { color = 0x0; }
            if (alpha === void 0) { alpha = 1; }
            if (border === void 0) { border = false; }
            if (borderColor === void 0) { borderColor = 0x0; }
            if (thickness === void 0) { thickness = 0; }
            if (borderAlpha === void 0) { borderAlpha = 1; }
            target.graphics.clear();
            if (border)
                DisplayObjectUtil.drawCircleBorder(target, radius, x, y, color, thickness, borderAlpha);
            target.graphics.beginFill(color, alpha);
            target.graphics.drawCircle(x, y, radius);
            target.graphics.endFill();
        };
        //
        /**
         * 绘制圆形边框
         * @param target:* 目标对象
         * @param radius:Number 半径
         * @param x:Number = 0 圆心x
         * @param y:Number = 0 圆心y
         * @param color:uint = 0x0 颜色
         * @param thickness:Number = 0 边框大小
         * @param alpha:Number = 1 透明度
         *
         */
        DisplayObjectUtil.drawCircleBorder = function (target, radius, x, y, color, thickness, alpha) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (color === void 0) { color = 0x0; }
            if (thickness === void 0) { thickness = 0; }
            if (alpha === void 0) { alpha = 1; }
            target.graphics.clear();
            target.graphics.lineStyle(thickness, color, alpha, false, "none");
            target.graphics.drawCircle(x, y, radius);
        };
        /**
         * 绘制圆形边框
         * @param target:* 目标对象
         * @param radius:Number 半径
         * @param x:Number = 0 圆心x
         * @param y:Number = 0 圆心y
         * @param color:uint = 0x0 颜色
         * @param thickness:Number = 0 边框大小
         * @param alpha:Number = 1 透明度
         * @param angle:int = 5 虚线间隔角度，最佳为360的因数
         */
        DisplayObjectUtil.drawCircleBorderDotted = function (target, radius, x, y, color, thickness, alpha, angle) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (color === void 0) { color = 0x0; }
            if (thickness === void 0) { thickness = 0; }
            if (alpha === void 0) { alpha = 1; }
            if (angle === void 0) { angle = 5; }
            target.graphics.clear();
            target.graphics.lineStyle(thickness, color, alpha, false, "none");
            var tx = 0;
            var ty = 0;
            var pi = Math.PI;
            for (var i = 0; i < 360; i += angle) {
                tx = Math.cos(i / 180 * pi) * radius + x;
                ty = Math.sin(i / 180 * pi) * radius + y;
                target.graphics.moveTo(tx, ty);
                i += angle;
                tx = Math.cos(i / 180 * pi) * radius + x;
                ty = Math.sin(i / 180 * pi) * radius + y;
                target.graphics.lineTo(tx, ty);
            }
        };
        /**
         * 绘制扇形
         * @param mc 要绘制的对象
         * @param x 圆点x
         * @param y 圆点y
         * @param r 半径
         * @param angle 扇形角度
         * @param startFrom 开始绘制的角度
         * @param color 填充和线条颜色
         * @param alpha 透明度
         *
         */
        DisplayObjectUtil.drawSector = function (mc, x, y, r, angle, startFrom, color, alpha) {
            if (x === void 0) { x = 200; }
            if (y === void 0) { y = 200; }
            if (r === void 0) { r = 100; }
            if (angle === void 0) { angle = 27; }
            if (startFrom === void 0) { startFrom = 270; }
            if (color === void 0) { color = 0xff0000; }
            if (alpha === void 0) { alpha = 1; }
            /*
            * mc the movieclip: the container of the sector.
            * x,y the center position of the sector
            * r the radius of the sector
            * angle the angle of the sector
            * startFrom the start degree counting point : 270 top, 180 left, 0 right, 90 bottom ,
            * it is counting from top in this example.
            * color the fil lin color of the sector
            */
            mc.graphics.clear();
            mc.graphics.beginFill(color, alpha);
            //remove this line to unfill the sector
            /* the border of the secetor with color 0xff0000 (red) , you could replace it with any color
            * you want like 0x00ff00(green) or 0x0000ff (blue).
            */
            mc.graphics.lineStyle(0, color, alpha);
            mc.graphics.moveTo(x, y);
            angle = (Math.abs(angle) > 360) ? 360 : angle;
            var n = Math.ceil(Math.abs(angle) / 45);
            var angleA = angle / n;
            angleA = angleA * Math.PI / 180;
            startFrom = startFrom * Math.PI / 180;
            mc.graphics.lineTo(x + r * Math.cos(startFrom), y + r * Math.sin(startFrom));
            for (var i = 1; i <= n; i++) {
                startFrom += angleA;
                var angleMid = startFrom - angleA / 2;
                var bx = x + r / Math.cos(angleA / 2) * Math.cos(angleMid);
                var by = y + r / Math.cos(angleA / 2) * Math.sin(angleMid);
                var cx = x + r * Math.cos(startFrom);
                var cy = y + r * Math.sin(startFrom);
                mc.graphics.curveTo(bx, by, cx, cy);
            }
            if (angle != 360) {
                mc.graphics.lineTo(x, y);
            }
            mc.graphics.endFill(); // if you want a sector without filling color , please remove this line.
        };
        //
        /**
         * 设置容器中的所有显示对象的  cacheAsBitmap 属性值
         * @param container:Sprite 容器
         * @param value:Boolean 属性值
         *
         */
        DisplayObjectUtil.setChildrenCache = function (container, value) {
            if (value === void 0) { value = true; }
            var length = container.numChildren;
            var target = null;
            for (var i = 0; i < length; i++) {
                target = container.getChildAt(i);
                target.cacheAsBitmap = value;
            }
        };
        //
        /**
         * 获取显示对象实例
         * @param cls 实例类
         * @param parent 要添加到的父容器
         * @param x x坐标
         * @param y y坐标
         * @param w 宽度
         * @param h 高度
         * @returns {any}
         */
        DisplayObjectUtil.getInstance = function (cls, parent, x, y, w, h) {
            if (parent === void 0) { parent = null; }
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            if (w === void 0) { w = NaN; }
            if (h === void 0) { h = NaN; }
            var target = new cls();
            DisplayObjectUtil.addInstance(target, parent, x, y, w, h);
            return target;
        };
        //
        /**
         * 添加显示对象实例
         * @param target 实例
         * @param parent 要添加到的父容器
         * @param x x坐标
         * @param y y坐标
         * @param w 宽度
         * @param h 高度
         * @returns {any}
         */
        DisplayObjectUtil.addInstance = function (target, parent, x, y, w, h) {
            if (parent === void 0) { parent = null; }
            if (x === void 0) { x = NaN; }
            if (y === void 0) { y = NaN; }
            if (w === void 0) { w = NaN; }
            if (h === void 0) { h = NaN; }
            if (!isNaN(x))
                target.x = x;
            if (!isNaN(y))
                target.y = y;
            if (!isNaN(w))
                target.width = w;
            if (!isNaN(h))
                target.height = h;
            if (parent)
                parent.addChild(target);
        };
        /**
         * 画虚线
         *
         * @param    graphics    <b>    Graphics</b>
         * @param    beginPoint    <b>    Point    </b> 起始点坐标
         * @param    endPoint    <b>    Point    </b> 终点坐标
         * @param    width        <b>    Number    </b> 虚线的长度
         * @param    grap        <b>    Number    </b> 虚线短线之间的间隔
         * @param max 最大绘制次数，因egret存在bug，有时绘制超过一定次数时，在runtime中运行会导致绘制失败
         */
        DisplayObjectUtil.drawDashed = function (graphics, x1, y1, x2, y2, width, grap, max) {
            if (max === void 0) { max = 0; }
            if (!graphics || width <= 0 || grap <= 0)
                return;
            var xx = x2 - x1;
            var yy = y2 - y1;
            var radian = Math.atan2(yy, xx);
            var totalLen = Math.sqrt(xx * xx + yy * yy);
            var currLen = 0;
            var x, y;
            var cos = Math.cos(radian);
            var sin = Math.sin(radian);
            var i = 0;
            while (currLen <= totalLen) {
                x = x1 + cos * currLen;
                y = y1 + sin * currLen;
                graphics.moveTo(x, y);
                currLen += width;
                if (currLen > totalLen)
                    currLen = totalLen;
                x = x1 + cos * currLen;
                y = y1 + sin * currLen;
                graphics.lineTo(x, y);
                i++;
                if (max > 0 && i > max)
                    break;
                currLen += grap;
            }
        };
        return DisplayObjectUtil;
    })();
    egret.DisplayObjectUtil = DisplayObjectUtil;
    DisplayObjectUtil.prototype.__class__ = "egret.DisplayObjectUtil";
})(egret || (egret = {}));
//# sourceMappingURL=DisplayObjectUtil.js.map