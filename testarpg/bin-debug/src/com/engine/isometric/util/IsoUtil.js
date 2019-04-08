var egret;
(function (egret) {
    var IsoUtil = (function () {
        /**
         * 构造函数
         */
        function IsoUtil() {
        }
        var __egretProto__ = IsoUtil.prototype;
        /**
         * 把等角空间中的一个3D坐标点转换成屏幕上的2D坐标点
         * @param pos:Point3D 3D坐标点
         * @return
         *
         */
        IsoUtil.getPoint2D = function (pos) {
            var x = pos.x;
            var z = pos.z;
            var screenX = x - z;
            var screenY = pos.y * IsoUtil.Y_CORRECT + (x + z) / 2;
            return new egret.Point(screenX, screenY);
        };
        /**
         * 把屏幕上的2D坐标点转换成等角空间中的一个3D坐标点，设y=0
         * @param point 2D坐标点
         * @return
         *
         */
        IsoUtil.getPoint3D = function (point, point3D) {
            if (point3D === void 0) { point3D = null; }
            var x = point.x / 2;
            var y = point.y;
            var xpos = y + x;
            var ypos = 0;
            var zpos = y - x;
            if (!point3D) {
                point3D = new egret.Point3D();
            }
            point3D.x = xpos;
            point3D.y = ypos;
            point3D.z = zpos;
            return point3D;
        };
        //
        /**
         * 获取等角投影3D空间中的点的深度
         * @param point3D:Point3D
         * @return
         *
         */
        IsoUtil.getDepth = function (point3D) {
            return (point3D.x + point3D.z) * 0.866 - point3D.y * 0.707;
        };
        //
        /**
         * 在容器中绘制节点并返回2维节点数组
         * @param container:Sprite 容器
         * @param width:int 绘制宽度
         * @param height:int 绘制高度
         * @param size:int 节点尺寸，即半个节点的宽度
         * @param color:uint = 0x666666 节点颜色
         * @param alpha:Number = 1 节点透明度
         * @param fill:Boolean = true 节点是否填充绘制
         * @param thickness 节点线宽
         * @return
         *
         */
        IsoUtil.drawTiles = function (container, width, height, size, color, alpha, thickness, fill) {
            if (color === void 0) { color = 0x666666; }
            if (alpha === void 0) { alpha = 0.5; }
            if (thickness === void 0) { thickness = 1; }
            if (fill === void 0) { fill = true; }
            var tiles = [];
            var half = size / 2;
            var size2 = size * 2;
            var lines = Math.ceil(height / size);
            var columns = Math.ceil(width / size2);
            //因节点坐标在中心，宽度为尺寸倍数时增加一列，节点区域永远大于目标区域
            if (width % (size2) == 0)
                columns++;
            if (height % size == 0)
                lines++;
            var lineCount = 0;
            var tile = null;
            var x = 0;
            var y = 0;
            var lineIndex = 0;
            for (var i = 0; i < lines; i++) {
                tiles[lineCount] = [];
                tiles[lineCount + 1] = [];
                for (var j = 0; j < columns; j++) {
                    x = j * size2;
                    y = i * size;
                    tile = IsoUtil.getTile(size, lineCount, j, new egret.Point(x, y), color, alpha, thickness, fill);
                    container.addChild(tile);
                    tiles[lineCount][j] = tile;
                    x += size;
                    y += half;
                    lineIndex = lineCount + 1;
                    tile = IsoUtil.getTile(size, lineIndex, j, new egret.Point(x, y), color, alpha, thickness, fill);
                    container.addChild(tile);
                    tiles[lineIndex][j] = tile;
                }
                lineCount += 2;
            }
            return tiles;
        };
        //
        IsoUtil.getTile = function (size, line, column, point, color, alpha, thickness, fill) {
            if (color === void 0) { color = 0x666666; }
            if (alpha === void 0) { alpha = 0.5; }
            if (thickness === void 0) { thickness = 1; }
            if (fill === void 0) { fill = true; }
            var tile = new egret.IsoTile(size, color, alpha, 0, thickness, fill);
            tile.line = line;
            tile.column = column;
            tile.point = point;
            return tile;
        };
        /**
         * 获取等角投影目标节点周围的8个节点
         * @param node:MapNode 当前节点
         * @param endNode:MapNode
         * @param nodes:Vector.<Vector.<MapNode>> 要查找的结点2维数组
         * @param typeMap:Array 标记查找的节点类型
         * @param checkFactor:Boolean 是否检测节点行走的难度系数
         * @param ignoreOpposite = false 是否忽略对角线上的额外距离，true时表示对角线上的节点和水平或垂直方向上的节点与中心节点的距离相等，使用true路径总体上将是比较长的直线相连，而false时路径总体上是波浪线组合
         * @param weakH:Boolean = false 是否弱化h值，true时使寻路时g值为主导值，路径将出现先转向走斜线再走直线，flase时，则没有主导值路径为先走直线再走斜线
         * @return
         *
         */
        IsoUtil.get8Nodes = function (node, endNode, nodes, typeMap, checkFactor, ignoreOpposite, weakH) {
            if (ignoreOpposite === void 0) { ignoreOpposite = false; }
            if (weakH === void 0) { weakH = false; }
            //			var nodes8:Vector.<MapNode> = new Vector.<MapNode>();
            IsoUtil._vectorNodes8.length = 0;
            //			var vector:Vector.<int> = null;
            var row = node.row;
            var column = node.column;
            var preRow = row - 1;
            var nextRow = row + 1;
            var preColumn = column - 1;
            var nextColumn = column + 1;
            //内存优化，取消每次都new一个数组
            IsoUtil._vector8[0] = row;
            IsoUtil._vector8[1] = preColumn;
            IsoUtil._vector8[2] = preRow;
            IsoUtil._vector8[4] = row - 2;
            IsoUtil._vector8[5] = column;
            IsoUtil._vector8[6] = preRow;
            IsoUtil._vector8[8] = row;
            IsoUtil._vector8[9] = nextColumn;
            IsoUtil._vector8[10] = nextRow;
            IsoUtil._vector8[12] = row + 2;
            IsoUtil._vector8[13] = column;
            IsoUtil._vector8[14] = nextRow;
            //获取节点周围的8个节点行列数据
            if (row % 2 == 0) {
                //内存优化，取消每次都new一个数组
                IsoUtil._vector8[3] = preColumn;
                IsoUtil._vector8[7] = column;
                IsoUtil._vector8[11] = column;
                IsoUtil._vector8[15] = preColumn;
            }
            else {
                //内存优化，取消每次都new一个数组
                IsoUtil._vector8[3] = column;
                IsoUtil._vector8[7] = nextColumn;
                IsoUtil._vector8[11] = nextColumn;
                IsoUtil._vector8[15] = column;
            }
            var temp = null;
            var rows = nodes.length;
            var columns = nodes[0].length;
            var g = 0;
            var point = node.point3D;
            var ePoint = endNode.point3D;
            var tPoint = null;
            var size = node.size;
            var nodeG = node.g;
            var cValue = 0;
            var iValue = 0;
            for (var i = 0; i < 16; i += 2) {
                cValue = IsoUtil._vector8[i + 1];
                iValue = IsoUtil._vector8[i];
                if (iValue >= 0 && iValue < rows && cValue >= 0 && cValue < columns) {
                    temp = nodes[iValue][cValue];
                    if (temp) {
                        if (temp.flag)
                            continue;
                        if (typeMap[temp.type] == undefined)
                            continue;
                        tPoint = temp.point3D;
                        //忽略对角线距离时和上一节点的代价为1个单位
                        if (ignoreOpposite) {
                            g = size;
                        }
                        else {
                            g = egret.DimensionUtil.distance3D(tPoint, point);
                        }
                        temp.preNode = node;
                        temp.g = nodeG + g;
                        temp.h = egret.DimensionUtil.distance3D(tPoint, ePoint);
                        //弱化h值，使寻路时g值为主导值，路径将出现先转向走斜线再走直线
                        if (weakH)
                            temp.h /= 2;
                        //行走难度加成至当前代价
                        if (checkFactor && temp.factor > 0)
                            temp.g *= temp.factor;
                        temp.f = temp.g + temp.h;
                        IsoUtil._vectorNodes8.push(temp);
                        IsoUtil.setFlag(temp);
                    }
                }
            }
            return IsoUtil._vectorNodes8;
        };
        /**
         * 获取等角投影目标节点周围的8个节点 (函数结尾为3表示引用此方法的函数结尾也为3)，此方法忽略G值及其他高级功能检测，效率比get8Nodes()提高40%
         * @param node:MapNode 当前节点
         * @param endNode:MapNode
         * @param nodes:Vector.<Vector.<MapNode>> 要查找的结点2维数组
         * @param typeMap:Array 标记查找的节点类型
         * @return
         *
         */
        IsoUtil.get8Nodes3 = function (node, endNode, nodes, typeMap) {
            var row = node.row;
            var column = node.column;
            var preRow = row - 1;
            var nextRow = row + 1;
            var preColumn = column - 1;
            var nextColumn = column + 1;
            //内存优化，取消每次都new一个数组
            IsoUtil._vector8[0] = row;
            IsoUtil._vector8[1] = preColumn;
            IsoUtil._vector8[2] = preRow;
            IsoUtil._vector8[4] = row - 2;
            IsoUtil._vector8[5] = column;
            IsoUtil._vector8[6] = preRow;
            IsoUtil._vector8[8] = row;
            IsoUtil._vector8[9] = nextColumn;
            IsoUtil._vector8[10] = nextRow;
            IsoUtil._vector8[12] = row + 2;
            IsoUtil._vector8[13] = column;
            IsoUtil._vector8[14] = nextRow;
            //获取节点周围的8个节点行列数据
            if (row % 2 == 0) {
                //内存优化，取消每次都new一个数组
                IsoUtil._vector8[3] = preColumn;
                IsoUtil._vector8[7] = column;
                IsoUtil._vector8[11] = column;
                IsoUtil._vector8[15] = preColumn;
            }
            else {
                //内存优化，取消每次都new一个数组
                IsoUtil._vector8[3] = column;
                IsoUtil._vector8[7] = nextColumn;
                IsoUtil._vector8[11] = nextColumn;
                IsoUtil._vector8[15] = column;
            }
            var temp = null;
            var rows = nodes.length;
            var columns = nodes[0].length;
            var g = 0;
            var point = node.point3D;
            var ePoint = endNode.point3D;
            var tPoint = null;
            var size = node.size;
            var nodeG = node.g;
            var cValue = 0;
            var iValue = 0;
            var index = 0;
            for (var i = 0; i < 16; i += 2) {
                cValue = IsoUtil._vector8[i + 1];
                iValue = IsoUtil._vector8[i];
                if (iValue >= 0 && iValue < rows && cValue >= 0 && cValue < columns) {
                    temp = nodes[iValue][cValue];
                    if (temp) {
                        if (temp.flag)
                            continue;
                        if (typeMap[temp.type] == undefined)
                            continue;
                        tPoint = temp.point3D;
                        g = egret.DimensionUtil.distance3D(tPoint, point);
                        temp.preNode = node;
                        temp.g = nodeG + g;
                        temp.h = egret.DimensionUtil.distance3D(tPoint, ePoint);
                        temp.f = temp.g + temp.h;
                        IsoUtil._vectorNodes8[index] = temp;
                        index++;
                        IsoUtil.setFlag(temp);
                        IsoUtil.setUncheckedNode(temp);
                    }
                }
            }
            IsoUtil._vectorNodes8.length = index;
            return IsoUtil._vectorNodes8;
        };
        //
        /**
         * 获取开始节点周围最近的指定类型节点，用于查找不可通过的节点周围最近的可行走节点，不存在指定类型节点时返回null(此方法未完全检测，待优化)
         * @param startNode:MapNode 开始节点
         * @param endNode:MapNode 结束节点，此节点类型必须和查找类型一致，否则返回无元素数组
         * @param nodes:Vector.<Vector.<MapNode>> 要查找的结点2维数组
         * @param types:Array 查找的节点类型
         * @param checkFactor:Boolean = true 是否检测节点行走的难度系数，如果节点难度系数相同应使用flase提高查找效率
         * @param ignoreOpposite = false 是否忽略对角线上的额外距离，true时表示对角线上的节点和水平或垂直方向上的节点与中心节点的距离相等
         * @return
         *
         */
        IsoUtil.getNeerNodeByType = function (startNode, endNode, nodes, types, checkFactor, ignoreOpposite) {
            if (checkFactor === void 0) { checkFactor = true; }
            if (ignoreOpposite === void 0) { ignoreOpposite = false; }
            if (!nodes || !nodes.length || !nodes[0] || !nodes[0].length) {
                egret.LogManager.error(IsoUtil, "地图节点数据为空或空数组:nodes = " + nodes);
                return null;
            }
            var nodes8 = null;
            var node = startNode;
            //已标记过的节点
            var flagMap = new egret.HashMap();
            //待考察列表
            var uncheckedMap = [];
            //最大查找次数为总节点数
            var maxCount = nodes.length * nodes[0].length;
            var findCount = 0;
            var length = types.length;
            //用HashMap标记类型，不用每次都Array.indexOf()查找是否为查找类型之一
            var typeMap = new egret.HashMap();
            var typeMap2 = [];
            for (var j = 0; j < length; j++) {
                typeMap.put(types[j], true);
                typeMap2[types[j]] = true;
            }
            //typeMap2.put(startNode.type,true);
            var f = Number.POSITIVE_INFINITY;
            var neerNode = null;
            var nodeF = 0;
            var length2 = 0;
            var curIndex = 0;
            var temp = null;
            while (!typeMap.containsKey(node.type)) {
                findCount++;
                if (findCount > maxCount) {
                    egret.LogManager.error(IsoUtil, "地图节点数组数据有误，已达到最大查找次数，无法查找最近的节点: types = " + types);
                    break;
                }
                flagMap.put(node, true);
                nodes8 = IsoUtil.get8Nodes(node, endNode, nodes, typeMap2, checkFactor, ignoreOpposite);
                //节点排序算法优化，改为：只排序最新取出的节点，
                //然后连接到待考察列表最后位置，再递归检测新的节点是否比前面的一个节点代价大，
                //代价大则位置向前一步
                length2 = uncheckedMap.length;
                //				nodes8.sortOn("f",Array.NUMERIC | Array.DESCENDING);
                //性能优化，比两个参数排序快
                //				nodes8.sortOn("f",Array.NUMERIC);
                //				nodes8.reverse();
                length = nodes8.length;
                //内存优化，性能比上面差，但Array.sortOn()大量使用内存会导致fp执行内存回收卡fp
                egret.ArrayUtil.quickSortOn2(nodes8, "f", 0, length - 1);
                for (var i = 0; i < length; i++) {
                    node = nodes8[i];
                    nodeF = node.f;
                    //(此处未完全检测，待优化)
                    if (typeMap.containsKey(node.type) && nodeF < f) {
                        neerNode = node;
                        f = nodeF;
                    }
                    uncheckedMap.push(nodes8[i]);
                }
                //找到最近的指定类型节点
                if (neerNode)
                    break;
                //从待考察列表取出代价最小的节点
                //				uncheckedMap.sortOn("f",Array.NUMERIC | Array.DESCENDING);
                //
                length = uncheckedMap.length;
                for (i = length2; i < length; i++) {
                    curIndex = i - 1;
                    node = uncheckedMap[i];
                    if (curIndex > -1)
                        while (uncheckedMap[curIndex].f < node.f) {
                            //检测新节点代价比待考察中的更大，则位置向前一步
                            //如:a,b,c,d, d若代价大于c，d位置向前一步到c的位置，
                            //再递归检测d和b，若d代价大于b，d位置向前一步到b的位置，依此类推
                            temp = uncheckedMap[curIndex];
                            uncheckedMap[curIndex] = node;
                            uncheckedMap[curIndex + 1] = temp;
                            curIndex--;
                            if (curIndex < 0)
                                break;
                        }
                }
                //
                node = uncheckedMap.pop();
                if (!node)
                    break;
            }
            return neerNode;
        };
        //
        /**
         * 获取开始节点周围最近的指定类型节点，用于查找不可通过的节点周围最近的可行走节点，不存在指定类型节点时返回null(此方法未完全检测，待优化)
         * @param startNode:MapNode 开始节点
         * @param endNode:MapNode 结束节点，此节点类型必须和查找类型一致，否则返回无元素数组
         * @param nodes:Vector.<Vector.<MapNode>> 要查找的结点2维数组
         * @param types:Array 查找的节点类型
         * @param checkFactor:Boolean = true 是否检测节点行走的难度系数，如果节点难度系数相同应使用flase提高查找效率
         * @param ignoreOpposite = false 是否忽略对角线上的额外距离，true时表示对角线上的节点和水平或垂直方向上的节点与中心节点的距离相等
         * @return
         *
         */
        IsoUtil.getNeerNodeByType2 = function (startNode, endNode, nodes, types, checkFactor, ignoreOpposite) {
            if (checkFactor === void 0) { checkFactor = true; }
            if (ignoreOpposite === void 0) { ignoreOpposite = false; }
            if (!nodes || !nodes.length || !nodes[0] || !nodes[0].length) {
                egret.LogManager.error(IsoUtil, "地图节点数据为空或空数组:nodes = " + nodes);
                return null;
            }
            var nodes8 = null;
            var node = startNode;
            //最大查找次数为总节点数
            var maxCount = nodes.length * nodes[0].length;
            var findCount = 0;
            var length = types.length;
            //用HashMap标记类型，不用每次都Array.indexOf()查找是否为查找类型之一
            var typeMap2 = [];
            for (var j = 0; j < length; j++) {
                typeMap2[types[j]] = true;
            }
            typeMap2[startNode.type] = true;
            var typesMap = [];
            for (j = 0; j < types.length; j++) {
                typesMap[types[j]] = true;
            }
            var f = Number.POSITIVE_INFINITY;
            var neerNode = null;
            var nodeF = 0;
            var length2 = 0;
            var curIndex = 0;
            var temp = null;
            while (typesMap[node.type] == undefined) {
                findCount++;
                if (findCount > maxCount) {
                    egret.LogManager.error(IsoUtil, "地图节点数组数据有误，已达到最大查找次数，无法查找最近的节点: types = " + types);
                    break;
                }
                IsoUtil.setFlag(node);
                nodes8 = IsoUtil.get8Nodes(node, endNode, nodes, typeMap2, checkFactor, ignoreOpposite);
                //节点排序算法优化，改为：只排序最新取出的节点，
                //然后连接到待考察列表最后位置，再递归检测新的节点是否比前面的一个节点代价大，
                //代价大则位置向前一步
                length = nodes8.length;
                //内存优化，性能比上面差，但Array.sortOn()大量使用内存会导致fp执行内存回收卡fp
                egret.ArrayUtil.quickSortOn2(nodes8, "f", 0, length - 1);
                for (var i = 0; i < length; i++) {
                    node = nodes8[i];
                    nodeF = node.f;
                    //(此处未完全检测，待优化)
                    if (typesMap[node.type] != undefined && nodeF < f) {
                        neerNode = node;
                        f = nodeF;
                    }
                    IsoUtil.setUncheckedNode(nodes8[i]);
                }
                //找到最近的指定类型节点
                if (neerNode)
                    break;
                for (i = IsoUtil._uncheckedLength; i < IsoUtil._uncheckedIndex; i++) {
                    curIndex = i - 1;
                    node = IsoUtil._uncheckedMap[i];
                    if (curIndex > -1)
                        while (IsoUtil._uncheckedMap[curIndex].f < node.f) {
                            //检测新节点代价比待考察中的更大，则位置向前一步
                            //如:a,b,c,d, d若代价大于c，d位置向前一步到c的位置，
                            //再递归检测d和b，若d代价大于b，d位置向前一步到b的位置，依此类推
                            temp = IsoUtil._uncheckedMap[curIndex];
                            IsoUtil._uncheckedMap[curIndex] = node;
                            IsoUtil._uncheckedMap[curIndex + 1] = temp;
                            curIndex--;
                            if (curIndex < 0)
                                break;
                        }
                }
                //
                node = IsoUtil.getUncheckedNode();
                if (!node)
                    break;
            }
            //内存清理
            IsoUtil._typeMap.clear();
            IsoUtil.resetFlag();
            IsoUtil.resetUnchecked();
            return neerNode;
        };
        //
        /**
         * 路径优化
         * @param pathNodes:Vector.<MapNode> 路径节点
         * @param mapNodes:Vector.<Vector.<MapNode>> 地图所有节点
         * @param types:Array 可通过的路径类型
         * @return
         *
         */
        IsoUtil.optimizePath = function (pathNodes, mapNodes, types, length) {
            if (length === void 0) { length = 0; }
            //3个或3个以上节点，才需要优化
            if (length < 3)
                return pathNodes;
            //			if(pathNodes.length < 3) return pathNodes;
            //内存优化
            var nodes = IsoUtil._optimizeNodes1; //new Vector.<MapNode>();
            var nLength = 0;
            var curNode = null;
            var nextNode = null;
            var index = 0;
            var startNode = null;
            nodes.push(pathNodes[0]);
            //第1次优化，取出相同直线上的节点端点作为路径节点
            length--;
            for (var i = 1; i < length; i++) {
                startNode = pathNodes[index];
                curNode = pathNodes[i];
                nextNode = pathNodes[i + 1];
                if (!IsoUtil.isLineNode(startNode, curNode, nextNode)) {
                    nodes.push(curNode);
                    index = i;
                }
            }
            nodes.push(pathNodes[length]);
            nLength = nodes.length;
            //第2次优化，判断节点和节点之间是否能直接连线通过
            if (nLength > 2) {
                //内存优化
                var nodes2 = IsoUtil._optimizeNodes2; //new Vector.<MapNode>();
                length = nLength - 1;
                index = 0;
                nodes2.push(nodes[0]);
                //递归的最后一个节点索引，如有4个节点，节点3和节点4已经相连了，只需要递归至节点2
                var lastIndex = nLength - 2;
                var hasNode = false;
                outer: while (index < lastIndex) {
                    hasNode = false;
                    for (i = length; i > index; i--) {
                        startNode = nodes[index];
                        nextNode = nodes[i];
                        //可直接连线的节点
                        if (IsoUtil.isCrossNode(startNode, nextNode, mapNodes, types)) {
                            hasNode = true;
                            for (var j = i; j <= length; j++) {
                                nodes2.push(nodes[j]);
                            }
                            nodes = nodes2;
                            nLength = nodes.length;
                            if (nLength <= 3) {
                                break outer;
                            }
                            else {
                                length = index + 1;
                                if (length >= nLength) {
                                    length = nLength - 1;
                                }
                                //取出前面的节点
                                //此处因递归，数组指向不断变化，暂时只能 new
                                if (nodes2 != IsoUtil._optimizeNodesA)
                                    nodes2 = IsoUtil._optimizeNodesA; //new Vector.<MapNode>();
                                else
                                    nodes2 = IsoUtil._optimizeNodesB;
                                nodes2.length = 0;
                                for (j = 0; j <= length; j++) {
                                    nodes2.push(nodes[j]);
                                }
                                length = nLength - 1;
                                lastIndex = nLength - 2;
                                i = 0;
                            }
                        }
                    }
                    index++;
                    //如果后面的节点都不能和当前节点连线，当前节点保留
                    if (!hasNode && index < nLength) {
                        nodes2.push(nodes[index]);
                    }
                }
            }
            length = pathNodes.length;
            for (i = 0; i < length; i++) {
                pathNodes[i] = null;
            }
            //内存优化
            //			pathNodes.length = 0;
            index = 0;
            var length1 = nodes.length;
            for (var i1 = 0; i1 < length1; i1++) {
                var node = nodes[i1];
                pathNodes[index] = node;
                index++;
            }
            IsoUtil._optimizeNodes1.length = 0;
            IsoUtil._optimizeNodes2.length = 0;
            return pathNodes;
        };
        //
        /**
         * 检测3个节点是否在同一直线上
         * @param starNode:MapNode 开始节点
         * @param curNode:MapNode 第2个节点
         * @param nextNode:MapNode 最后一个节点
         * @return
         *
         */
        IsoUtil.isLineNode = function (starNode, curNode, nextNode) {
            var row = nextNode.row;
            if (curNode.row == row && starNode.row == row) {
                return true;
            }
            else {
                var cPoint = curNode.point2D;
                var nPoint = nextNode.point2D;
                var sPoint = starNode.point2D;
                var cx = cPoint.x;
                var nx = nPoint.x;
                var sx = sPoint.x;
                if (cx == nx && sx == nx)
                    return true;
                var cy = cPoint.y;
                var ny = nPoint.y;
                var sy = sPoint.y;
                //角度相同，此方法可通用判断是否3个节点在同一直线上，但以上方式效率更高
                var radians = Math.atan2(ny - cy, nx - cx);
                var radians2 = Math.atan2(ny - sy, nx - sx);
                if (radians == radians2)
                    return true;
            }
            return false;
        };
        //
        /**
         * 检测两个节点是否可直接连线通过，若连接这两个节点的线段经过的所有节点都可通过时为true
         * @param startNode:MapNode 开始节点
         * @param endNode:MapNode 结束节点
         * @param nodes:Vector.<Vector.<MapNode>> 地图所有节点
         * @param types:Array 可通过的路径 类型
         * @return
         *
         */
        IsoUtil.isCrossNode = function (startNode, endNode, nodes, types) {
            var startRow = startNode.row;
            var startColumn = startNode.column;
            var endRow = endNode.row;
            var endColumn = endNode.column;
            var temp = 0;
            if (startRow > endRow) {
                temp = startRow;
                startRow = endRow;
                endRow = temp;
            }
            if (startColumn > endColumn) {
                temp = startColumn;
                startColumn = endColumn;
                endColumn = temp;
            }
            var point = startNode.point2D;
            var sx = point.x;
            var sy = point.y;
            point = endNode.point2D;
            var x = point.x - sx;
            var y = point.y - sy;
            //斜率角度
            var radians = Math.atan2(y, x);
            var hLineObject = null;
            var vLineObject = null;
            var curNode = null;
            var rate = Math.tan(radians);
            x = sx;
            y = sy;
            //斜率线段上坐标点
            var targetX = 0;
            var targetY = 0;
            //是否竖线
            var isVLine = Math.abs(radians) == Math.PI / 2;
            var size = startNode.size;
            var halfSize = size / 2;
            var cPoint = null;
            for (var i = startRow; i <= endRow; i++) {
                for (var j = startColumn; j <= endColumn; j++) {
                    curNode = nodes[i][j];
                    cPoint = curNode.point2D;
                    hLineObject = IsoUtil.getHLineObject(cPoint, size);
                    vLineObject = IsoUtil.getVLineObject(cPoint, halfSize);
                    //连线为水平线或在当前节点在水平线上
                    if (rate == 0)
                        targetX = cPoint.x;
                    else
                        targetX = (hLineObject.y - y) / rate + x;
                    if (isVLine) {
                        targetY = cPoint.y;
                    }
                    else {
                        targetY = (vLineObject.x - x) * rate + y;
                    }
                    //方块的水平直线或竖线和斜线是否相交
                    if ((targetX >= hLineObject.x1 && targetX <= hLineObject.x2) || (targetY >= vLineObject.y1 && targetY <= vLineObject.y2)) {
                        if (types.indexOf(curNode.type) == -1) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        //
        /**
         * 获取方块的水平线段数据
         * @param point:Point 方块中心点
         * @param size:int 方块尺寸
         * @return
         *
         */
        IsoUtil.getHLineObject = function (point, size) {
            if (size === void 0) { size = 0; }
            var x = point.x;
            var y = point.y;
            IsoUtil._hLineObj.x1 = x - size;
            IsoUtil._hLineObj.x2 = x + size;
            IsoUtil._hLineObj.y = y;
            return IsoUtil._hLineObj;
        };
        //
        /**
         * 获取方块的竖直线段数据
         * @param point:Point 方块中心点
         * @param size:int 方块尺寸
         * @return
         *
         */
        IsoUtil.getVLineObject = function (point, size) {
            if (size === void 0) { size = 0; }
            var x = point.x;
            var y = point.y;
            IsoUtil._vLineObj.x = x;
            IsoUtil._vLineObj.y1 = y - size;
            IsoUtil._vLineObj.y2 = y + size;
            return IsoUtil._vLineObj;
        };
        //
        IsoUtil.setFlag = function (node) {
            if (node.flag)
                return;
            IsoUtil._flagMap[IsoUtil._flagIndex] = node;
            IsoUtil._flagIndex++;
            node.flag = true;
            if (IsoUtil.callBack != null) {
                IsoUtil.callBack(node, IsoUtil._flagIndex);
            }
        };
        //
        IsoUtil.resetFlag = function () {
            var node = null;
            for (var i = 0; i < IsoUtil._flagIndex; i++) {
                node = IsoUtil._flagMap[i];
                node.flag = false;
                IsoUtil._flagMap[i] = null;
            }
            IsoUtil._flagIndex = 0;
        };
        //
        IsoUtil.setUncheckedNode = function (node) {
            IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex] = node;
            IsoUtil._uncheckedIndex++;
        };
        //
        IsoUtil.getUncheckedNode = function () {
            IsoUtil._uncheckedIndex--;
            if (IsoUtil._uncheckedIndex < 0)
                IsoUtil._uncheckedIndex = 0;
            IsoUtil._uncheckedLength = IsoUtil._uncheckedIndex;
            var result = IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex];
            IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex] = null;
            return result;
        };
        //
        IsoUtil.resetUnchecked = function () {
            for (var i = 0; i < IsoUtil._uncheckedIndex; i++) {
                IsoUtil._uncheckedMap[i] = null;
            }
            IsoUtil._uncheckedIndex = 0;
            IsoUtil._uncheckedLength = 0;
        };
        /**
         * 测试观察用地图节点查询回调(正式发布时注释掉) function(node:MapNode,index:int):void{}
         */
        IsoUtil.callBack = null;
        /**
         * 初始查询到的未优化的路径回调  function(node:MapNode,index:int):void{}
         */
        IsoUtil.callBackPath = null;
        /**
         * 优化后的路径回调 function(node:MapNode,index:int):void{}
         */
        IsoUtil.callBackPathOptimize = null;
        //以下为内存优化
        //getHLineObject()专用缓存对象
        IsoUtil._hLineObj = {};
        //getVLineObject()专用缓存对象
        IsoUtil._vLineObj = {};
        //getNodes8()专用缓存对象
        IsoUtil._vector8 = new Array(16);
        //getNodes8()专用缓存对象，因多个方法引用此变量，所以仅适用于单线程
        IsoUtil._vectorNodes8 = [];
        //optimizePath()专用缓存对象
        IsoUtil._optimizeNodes1 = [];
        IsoUtil._optimizeNodes2 = [];
        IsoUtil._optimizeNodesA = [];
        IsoUtil._optimizeNodesB = [];
        //findPathByNode2() 专用缓存对象
        IsoUtil._uncheckedMap = [];
        IsoUtil._uncheckedIndex = 0;
        IsoUtil._uncheckedLength = 0;
        //缓存10000个，支持单次查询1万个节点，可根据需要修改
        IsoUtil._flagMap = [];
        IsoUtil._flagIndex = 0;
        //getNeerNodeByType2() 专用缓存对象
        IsoUtil._typeMap = new egret.HashMap();
        /**
         * 等角投影1.2247的精确计算版本
         */
        IsoUtil.Y_CORRECT = Math.cos(-Math.PI / 6) * Math.SQRT2;
        return IsoUtil;
    })();
    egret.IsoUtil = IsoUtil;
    IsoUtil.prototype.__class__ = "egret.IsoUtil";
})(egret || (egret = {}));
//# sourceMappingURL=IsoUtil.js.map