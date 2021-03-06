
module egret {

	export class IsoUtil{
		/**
		 * 测试观察用地图节点查询回调(正式发布时注释掉) function(node:MapNode,index:int):void{}
		 */		
		public static callBack:Function = null;
		/**
		 * 初始查询到的未优化的路径回调  function(node:MapNode,index:int):void{}
		 */		
		public static callBackPath:Function = null;
		/**
		 * 优化后的路径回调 function(node:MapNode,index:int):void{}
		 */		
		public static callBackPathOptimize:Function = null;
		
		//以下为内存优化
		//getHLineObject()专用缓存对象
		private static _hLineObj:any = {};
		//getVLineObject()专用缓存对象
		private static _vLineObj:any = {};
		//getNodes8()专用缓存对象
		private static _vector8:Array<number> = new Array<number>(16);
		//getNodes8()专用缓存对象，因多个方法引用此变量，所以仅适用于单线程
		private static _vectorNodes8:Array<any> = [];
		//optimizePath()专用缓存对象
		private static _optimizeNodes1:Array<MapNode> = [];
		private static _optimizeNodes2:Array<MapNode> = [];
		private static _optimizeNodesA:Array<MapNode> = [];
		private static _optimizeNodesB:Array<MapNode> = [];
		
		//findPathByNode2() 专用缓存对象
		private static _uncheckedMap:Array<MapNode> = [];
		private static _uncheckedIndex:number = 0;
		private static _uncheckedLength:number = 0;
		//缓存10000个，支持单次查询1万个节点，可根据需要修改
		private static _flagMap:Array<MapNode> = [];
		private static _flagIndex:number = 0;
		//getNeerNodeByType2() 专用缓存对象
		private static _typeMap:HashMap = new HashMap();
		
		/**
		 * 等角投影1.2247的精确计算版本 
		 */		
		public static Y_CORRECT:number = Math.cos(-Math.PI / 6) * Math.SQRT2;
		
		/**
		 * 构造函数
		 */
		public constructor(){
		}
		
		/**
		 * 把等角空间中的一个3D坐标点转换成屏幕上的2D坐标点 
		 * @param pos:Point3D 3D坐标点
		 * @return 
		 * 
		 */		
		public static getPoint2D(pos:Point3D):Point{ 
			var x:number = pos.x;
			var z:number = pos.z;
			var screenX:number = x - z; 
			var screenY:number = pos.y * IsoUtil.Y_CORRECT + (x + z) / 2;
			
			return new Point(screenX, screenY);
		}
		/**
		 * 把屏幕上的2D坐标点转换成等角空间中的一个3D坐标点，设y=0 
		 * @param point 2D坐标点 
		 * @return 
		 * 
		 */		
		public static getPoint3D(point:Point,point3D:Point3D = null):Point3D{
			var x:number = point.x / 2;
			var y:number = point.y;
			var xpos:number = y + x;
			var ypos:number = 0;
			var zpos:number = y - x;

			if(!point3D){
				point3D = new egret.Point3D();
			}

			point3D.x = xpos;
			point3D.y = ypos;
			point3D.z = zpos;

			return point3D;
		}
		//
		/**
		 * 获取等角投影3D空间中的点的深度 
		 * @param point3D:Point3D
		 * @return 
		 * 
		 */		
		public static getDepth(point3D:Point3D):number{
			return (point3D.x + point3D.z) * 0.866 - point3D.y * 0.707;
		}
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
		public static drawTiles(container:DisplayObjectContainer,width:number,height:number,size:number,color:number = 0x666666,alpha:number = 0.5,thickness:number = 1,fill:boolean = true):Array<any>{
			var tiles:Array<any> = [];
			
			var half:number = size / 2;
			var size2:number = size * 2;
			
			var lines:number = Math.ceil(height / size);
			var columns:number = Math.ceil(width / size2);
			
			//因节点坐标在中心，宽度为尺寸倍数时增加一列，节点区域永远大于目标区域
			if(width % (size2) == 0)
				columns ++;
			if(height % size == 0)
				lines ++;
			
			var lineCount:number = 0;
			
			var tile:IsoTile = null;
			var x:number = 0;
			var y:number = 0;
			var lineIndex:number = 0;
			
			for(var i:number = 0; i < lines; i++){
				tiles[lineCount] = [];
				tiles[lineCount + 1] = [];
				
				//每次绘制2行1列
				for(var j:number = 0; j < columns; j++){
					x = j * size2;
					y = i * size;
					
					tile = IsoUtil.getTile(size,lineCount,j,new Point(x,y),color,alpha,thickness,fill);
					container.addChild(tile);
					tiles[lineCount][j] = tile;
					
					x += size;
					y += half;
					
					lineIndex = lineCount + 1;
					
					tile = IsoUtil.getTile(size,lineIndex,j,new Point(x,y),color,alpha,thickness,fill);
					container.addChild(tile);
					tiles[lineIndex][j] = tile;
				}
				
				lineCount += 2;
			}
			
			return tiles;
		}
		//
		private static getTile(size:number,line:number,column:number,point:Point,color:number = 0x666666,alpha:number = 0.5,thickness:number = 1,fill:boolean = true):IsoTile{
			var tile:IsoTile = new IsoTile(size,color,alpha,0,thickness,fill);
			tile.line = line;
			tile.column = column;
			tile.point = point;
			
			return tile;
		}
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
		private static get8Nodes(node:MapNode,endNode:MapNode,nodes:Array<Array<MapNode>>,typeMap:Array<any>,checkFactor:boolean,ignoreOpposite:boolean = false,weakH:boolean = false):Array<any>{
//			var nodes8:Vector.<MapNode> = new Vector.<MapNode>();
			IsoUtil._vectorNodes8.length = 0;
//			var vector:Vector.<int> = null;
			var row:number = node.row;
			var column:number = node.column;
			
			var preRow:number = row - 1;
			var nextRow:number = row + 1;
			var preColumn:number = column - 1;
			var nextColumn:number = column + 1;
			
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
			if(row % 2 == 0){
				//内存优化，取消每次都new一个数组
				IsoUtil._vector8[3] = preColumn;
				IsoUtil._vector8[7] = column;
				IsoUtil._vector8[11] = column;
				IsoUtil._vector8[15] = preColumn;
				
//				vector = new <int>[
//					row,preColumn,
//					preRow,preColumn,
//					row - 2,column,
//					preRow,column,
//					row,nextColumn,
//					nextRow,column,
//					row + 2,column,
//					nextRow,preColumn
//				];
			}else{
				//内存优化，取消每次都new一个数组
				IsoUtil._vector8[3] = column;
				IsoUtil._vector8[7] = nextColumn;
				IsoUtil._vector8[11] = nextColumn;
				IsoUtil._vector8[15] = column;
				
//				vector = new <int>[
//					row,preColumn,
//					preRow,column,
//					row - 2,column,
//					preRow,nextColumn,
//					row,nextColumn,
//					nextRow,nextColumn,
//					row + 2,column,
//					nextRow,column
//				];
			}
			
			var temp:MapNode = null;
			var rows:number = nodes.length;
			var columns:number = nodes[0].length;
			var g:number = 0;
			var point:Point3D = node.point3D;
			var ePoint:Point3D = endNode.point3D;
			var tPoint:Point3D = null;
			var size:number = node.size;
			var nodeG:number = node.g;
			var cValue:number = 0;
			var iValue:number = 0;
			
			for(var i:number = 0; i < 16; i += 2){
				cValue = IsoUtil._vector8[i + 1];
				iValue = IsoUtil._vector8[i];
				
				if(iValue >= 0 && iValue < rows && cValue >= 0 && cValue < columns){
					
					temp = nodes[iValue][cValue];
					
					if(temp){
						if(temp.flag) continue;
						if(typeMap[temp.type] == undefined) continue;
						
						tPoint = temp.point3D;
						
						//忽略对角线距离时和上一节点的代价为1个单位
						if(ignoreOpposite){
							g = size;
						}else{
							g = DimensionUtil.distance3D(tPoint,point);
						}
						
						temp.preNode = node;
						temp.g = nodeG + g;
						temp.h = DimensionUtil.distance3D(tPoint,ePoint);
						//弱化h值，使寻路时g值为主导值，路径将出现先转向走斜线再走直线
						if(weakH)
							temp.h /= 2;
						
						//行走难度加成至当前代价
						if(checkFactor && temp.factor > 0)
							temp.g *= temp.factor;
						
						temp.f = temp.g + temp.h;
						
						IsoUtil._vectorNodes8.push(temp);
						IsoUtil.setFlag(temp);						
					}
				}
			}
			
			return IsoUtil._vectorNodes8;
		}
		/**
		 * 获取等角投影目标节点周围的8个节点 (函数结尾为3表示引用此方法的函数结尾也为3)，此方法忽略G值及其他高级功能检测，效率比get8Nodes()提高40%
		 * @param node:MapNode 当前节点
		 * @param endNode:MapNode
		 * @param nodes:Vector.<Vector.<MapNode>> 要查找的结点2维数组
		 * @param typeMap:Array 标记查找的节点类型
		 * @return 
		 * 
		 */		
		private static get8Nodes3(node:MapNode,endNode:MapNode,nodes:Array<Array<MapNode>>,typeMap:Array<any>):Array<any>{
			var row:number = node.row;
			var column:number = node.column;
			
			var preRow:number = row - 1;
			var nextRow:number = row + 1;
			var preColumn:number = column - 1;
			var nextColumn:number = column + 1;
			
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
			if(row % 2 == 0){
				//内存优化，取消每次都new一个数组
				IsoUtil._vector8[3] = preColumn;
				IsoUtil._vector8[7] = column;
				IsoUtil._vector8[11] = column;
				IsoUtil._vector8[15] = preColumn;
			}else{
				//内存优化，取消每次都new一个数组
				IsoUtil._vector8[3] = column;
				IsoUtil._vector8[7] = nextColumn;
				IsoUtil._vector8[11] = nextColumn;
				IsoUtil._vector8[15] = column;
			}
			
			var temp:MapNode = null;
			var rows:number = nodes.length;
			var columns:number = nodes[0].length;
			var g:number = 0;
			var point:Point3D = node.point3D;
			var ePoint:Point3D = endNode.point3D;
			var tPoint:Point3D = null;
			var size:number = node.size;
			var nodeG:number = node.g;
			var cValue:number = 0;
			var iValue:number = 0;
			var index:number = 0;
			
			for(var i:number = 0; i < 16; i += 2){
				cValue = IsoUtil._vector8[i + 1];
				iValue = IsoUtil._vector8[i];
				
				if(iValue >= 0 && iValue < rows && cValue >= 0 && cValue < columns){
					
					temp = nodes[iValue][cValue];
					
					if(temp){
						if(temp.flag) continue;
						if(typeMap[temp.type] == undefined) continue;
						
						tPoint = temp.point3D;
						
						g = DimensionUtil.distance3D(tPoint,point);
						
						temp.preNode = node;
						temp.g = nodeG + g;
						temp.h = DimensionUtil.distance3D(tPoint,ePoint);
						
						temp.f = temp.g + temp.h;
						
						IsoUtil._vectorNodes8[index] = temp;
						index ++;
						
						IsoUtil.setFlag(temp);
						IsoUtil.setUncheckedNode(temp);
					}
				}
			}
			
			IsoUtil._vectorNodes8.length = index;
			
			return IsoUtil._vectorNodes8;
		}
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
		public static getNeerNodeByType(startNode:MapNode,endNode:MapNode,nodes:Array<Array<MapNode>>,types:Array<any>,checkFactor:boolean = true,ignoreOpposite:boolean = false):MapNode{
			if(!nodes || !nodes.length || !nodes[0] || !nodes[0].length){
				LogManager.error(IsoUtil,"地图节点数据为空或空数组:nodes = " + nodes);
				return null;
			}
			
			var nodes8:Array<any> = null;
			var node:MapNode = startNode;
			
			//已标记过的节点
			var flagMap:HashMap = new HashMap();
			//待考察列表
			var uncheckedMap:Array<any> = [];
			
			//最大查找次数为总节点数
			var maxCount:number = nodes.length * nodes[0].length;
			var findCount:number = 0;
			var length:number = types.length;
			
			//用HashMap标记类型，不用每次都Array.indexOf()查找是否为查找类型之一
			var typeMap:HashMap = new HashMap();
			var typeMap2:Array<any> = [];
			
			for(var j:number = 0; j < length; j++){
				typeMap.put(types[j],true);
				typeMap2[types[j]] = true;
			}
			//typeMap2.put(startNode.type,true);
			
			var f:number = Number.POSITIVE_INFINITY;
			var neerNode:MapNode = null;
			var nodeF:number = 0;
			var length2:number = 0;
			var curIndex:number = 0;
			var temp:MapNode = null;
			
			while(!typeMap.containsKey(node.type)){
				
				findCount ++;
				if(findCount > maxCount){
					LogManager.error(IsoUtil,"地图节点数组数据有误，已达到最大查找次数，无法查找最近的节点: types = " + types);
					break;
				}
				flagMap.put(node,true);
				
				nodes8 = IsoUtil.get8Nodes(node,endNode,nodes,typeMap2,checkFactor,ignoreOpposite);
				
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
				ArrayUtil.quickSortOn2(nodes8,"f",0,length - 1);
				
				//
				//查找指定类型节点
				for(var i:number = 0; i < length; i++){
					node = nodes8[i];
					nodeF = node.f;
					
					//(此处未完全检测，待优化)
					if(typeMap.containsKey(node.type) && nodeF < f){
						neerNode = node;
						f = nodeF;
					}
					
					uncheckedMap.push(nodes8[i]);
				}
				//找到最近的指定类型节点
				if(neerNode)
					break;
				
				//从待考察列表取出代价最小的节点
//				uncheckedMap.sortOn("f",Array.NUMERIC | Array.DESCENDING);
				//
				length = uncheckedMap.length;
				
				for(i = length2; i < length; i++){
					curIndex = i - 1;
					node = uncheckedMap[i];
					
					if(curIndex > -1)
						while(uncheckedMap[curIndex].f < node.f){
							//检测新节点代价比待考察中的更大，则位置向前一步
							//如:a,b,c,d, d若代价大于c，d位置向前一步到c的位置，
							//再递归检测d和b，若d代价大于b，d位置向前一步到b的位置，依此类推
							temp = uncheckedMap[curIndex];
							uncheckedMap[curIndex] = node;
							uncheckedMap[curIndex + 1] = temp;
							
							curIndex --;
							if(curIndex < 0) break;
						}
				}
				//
				node = uncheckedMap.pop();
				
				if(!node)
					break;
			}
			
			return neerNode;
		}
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
		public static getNeerNodeByType2(startNode:MapNode,endNode:MapNode,nodes:Array<Array<MapNode>>,types:Array<any>,checkFactor:boolean = true,ignoreOpposite:boolean = false):MapNode{
			if(!nodes || !nodes.length || !nodes[0] || !nodes[0].length){
				LogManager.error(IsoUtil,"地图节点数据为空或空数组:nodes = " + nodes);
				return null;
			}
			
			var nodes8:Array<any> = null;
			var node:MapNode = startNode;
			
			//最大查找次数为总节点数
			var maxCount:number = nodes.length * nodes[0].length;
			var findCount:number = 0;
			var length:number = types.length;
			
			//用HashMap标记类型，不用每次都Array.indexOf()查找是否为查找类型之一
			var typeMap2:Array<any> = [];
			
			for(var j:number = 0; j < length; j++){
				typeMap2[types[j]] = true;
			}
			typeMap2[startNode.type] = true;
			
			var typesMap:Array<any> = [];
			
			for(j = 0; j < types.length; j ++){
				typesMap[types[j]] = true;
			}
			
			var f:number = Number.POSITIVE_INFINITY;
			var neerNode:MapNode = null;
			var nodeF:number = 0;
			var length2:number = 0;
			var curIndex:number = 0;
			var temp:MapNode = null;
			
			while(typesMap[node.type] == undefined){
				
				findCount ++;
				if(findCount > maxCount){
					LogManager.error(IsoUtil,"地图节点数组数据有误，已达到最大查找次数，无法查找最近的节点: types = " + types);
					break;
				}
				IsoUtil.setFlag(node);
				
				nodes8 = IsoUtil.get8Nodes(node,endNode,nodes,typeMap2,checkFactor,ignoreOpposite);
				
				//节点排序算法优化，改为：只排序最新取出的节点，
				//然后连接到待考察列表最后位置，再递归检测新的节点是否比前面的一个节点代价大，
				//代价大则位置向前一步
				length = nodes8.length;
				//内存优化，性能比上面差，但Array.sortOn()大量使用内存会导致fp执行内存回收卡fp
				ArrayUtil.quickSortOn2(nodes8,"f",0,length - 1);
				
				//
				//查找指定类型节点
				for(var i:number = 0; i < length; i++){
					node = nodes8[i];
					nodeF = node.f;
					
					//(此处未完全检测，待优化)
					if(typesMap[node.type] != undefined && nodeF < f){
						neerNode = node;
						f = nodeF;
					}

					IsoUtil.setUncheckedNode(nodes8[i]);
				}
				//找到最近的指定类型节点
				if(neerNode)
					break;
				
				//从待考察列表取出代价最小的节点
				for(i = IsoUtil._uncheckedLength; i < IsoUtil._uncheckedIndex; i++){
					curIndex = i - 1;
					node = IsoUtil._uncheckedMap[i];
					
					if(curIndex > -1)
						while(IsoUtil._uncheckedMap[curIndex].f < node.f){
							//检测新节点代价比待考察中的更大，则位置向前一步
							//如:a,b,c,d, d若代价大于c，d位置向前一步到c的位置，
							//再递归检测d和b，若d代价大于b，d位置向前一步到b的位置，依此类推
							temp = IsoUtil._uncheckedMap[curIndex];
							IsoUtil._uncheckedMap[curIndex] = node;
							IsoUtil._uncheckedMap[curIndex + 1] = temp;
							
							curIndex --;
							if(curIndex < 0) break;
						}
				}
				//
				node = IsoUtil.getUncheckedNode();
				
				if(!node)
					break;
			}
			
			//内存清理
			IsoUtil._typeMap.clear();
			
			IsoUtil.resetFlag();
			IsoUtil.resetUnchecked();
			
			return neerNode;
		}
		//
		/**
		 * 路径优化 
		 * @param pathNodes:Vector.<MapNode> 路径节点
		 * @param mapNodes:Vector.<Vector.<MapNode>> 地图所有节点
		 * @param types:Array 可通过的路径类型
		 * @return 
		 * 
		 */		
		public static optimizePath(pathNodes:Array<MapNode>,mapNodes:Array<Array<MapNode>>,types:Array<any>,length:number = 0):Array<MapNode>{
			//3个或3个以上节点，才需要优化
			if(length < 3) return pathNodes;
//			if(pathNodes.length < 3) return pathNodes;
			
			//内存优化
			var nodes:Array<MapNode> = IsoUtil._optimizeNodes1;//new Vector.<MapNode>();
			
			var nLength:number = 0;
			
			var curNode:MapNode = null;
			var nextNode:MapNode = null;
			var index:number = 0;
			var startNode:MapNode = null;
			
			nodes.push(pathNodes[0]);
			
			//第1次优化，取出相同直线上的节点端点作为路径节点
			length --;
			for(var i:number = 1; i < length; i++){
				startNode = pathNodes[index];
				curNode = pathNodes[i];
				nextNode = pathNodes[i + 1];
				
				if(!IsoUtil.isLineNode(startNode,curNode,nextNode)){
					nodes.push(curNode);
					index = i;
				}
			}
			
			nodes.push(pathNodes[length]);
			
			nLength = nodes.length;
			
			//第2次优化，判断节点和节点之间是否能直接连线通过
			if(nLength > 2){
				
				//内存优化
				var nodes2:Array<MapNode> = IsoUtil._optimizeNodes2;//new Vector.<MapNode>();
				
				length = nLength - 1;
				index = 0;
				
				nodes2.push(nodes[0]);
				
				//递归的最后一个节点索引，如有4个节点，节点3和节点4已经相连了，只需要递归至节点2
				var lastIndex:number = nLength - 2;
				var hasNode:boolean = false;
				
				outer:while(index < lastIndex){
					hasNode = false;
					
					for(i = length; i > index; i--){
						startNode = nodes[index];
						nextNode = nodes[i];
						
						//可直接连线的节点
						if(IsoUtil.isCrossNode(startNode,nextNode,mapNodes,types)){
							hasNode = true;
							
							for(var j:number = i; j <= length; j++){
								nodes2.push(nodes[j]);
							}
							
							nodes = nodes2;
							nLength = nodes.length;
							
							if(nLength <= 3){
								break outer;
							}else{
								length = index + 1;
								if(length >= nLength){
									length = nLength - 1;
								}
								
								//取出前面的节点
								//此处因递归，数组指向不断变化，暂时只能 new
								if(nodes2 != IsoUtil._optimizeNodesA)
									nodes2 = IsoUtil._optimizeNodesA;//new Vector.<MapNode>();
								else
									nodes2 = IsoUtil._optimizeNodesB;
								
								nodes2.length = 0;
								
								for(j = 0; j <= length; j++){
									nodes2.push(nodes[j]);
								}
								
								length = nLength - 1;
								lastIndex = nLength - 2;
								i = 0;
							}
						}
					}
					
					index ++;
					
					//如果后面的节点都不能和当前节点连线，当前节点保留
					if(!hasNode && index < nLength){
						nodes2.push(nodes[index]);
					}
				}
			}
			
			length = pathNodes.length;
			for(i = 0; i < length; i++){
				pathNodes[i] = null;
			}
			
			//内存优化
//			pathNodes.length = 0;
			index = 0;
			var length1:number = nodes.length;
			for(var i1:number = 0;i1 < length1;i1++){
				var node:any = nodes[i1];
				pathNodes[index] = node;
				index ++;
//				pathNodes.push(node);
			}
			
			IsoUtil._optimizeNodes1.length = 0;
			IsoUtil._optimizeNodes2.length = 0;
			
			return pathNodes;
		}
		//
		/**
		 * 检测3个节点是否在同一直线上 
		 * @param starNode:MapNode 开始节点
		 * @param curNode:MapNode 第2个节点
		 * @param nextNode:MapNode 最后一个节点
		 * @return 
		 * 
		 */		
		public static isLineNode(starNode:MapNode,curNode:MapNode,nextNode:MapNode):boolean{
			var row:number = nextNode.row;
			if(curNode.row == row && starNode.row == row){
				return true;
			}else{
				var cPoint:Point = curNode.point2D;
				var nPoint:Point = nextNode.point2D;
				var sPoint:Point = starNode.point2D;
				
				var cx:number = cPoint.x;
				var nx:number = nPoint.x;
				var sx:number = sPoint.x;
				
				if(cx == nx && sx == nx)
					return true;
				
				var cy:number = cPoint.y;
				var ny:number = nPoint.y;
				var sy:number = sPoint.y;
				
				//角度相同，此方法可通用判断是否3个节点在同一直线上，但以上方式效率更高
				var radians:number = Math.atan2(ny - cy,nx - cx);
				var radians2:number = Math.atan2(ny - sy,nx - sx);
				if(radians == radians2)
					return true;
			}
			
			return false;
		}
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
		public static isCrossNode(startNode:MapNode,endNode:MapNode,nodes:Array<Array<MapNode>>,types:Array<any>):boolean{
			var startRow:number = startNode.row;
			var startColumn:number = startNode.column;
			var endRow:number = endNode.row;
			var endColumn:number = endNode.column;
			
			var temp:number = 0;
			
			if(startRow > endRow){
				temp = startRow;
				startRow = endRow;
				endRow = temp;
			}
			if(startColumn > endColumn){
				temp = startColumn;
				startColumn = endColumn;
				endColumn = temp;
			}
			
			var point:Point = startNode.point2D;
			var sx:number = point.x;
			var sy:number = point.y;
			
			point = endNode.point2D;
			var x:number = point.x - sx;
			var y:number = point.y - sy;
			
			//斜率角度
			var radians:number = Math.atan2(y,x);
			var hLineObject:any = null;
			var vLineObject:any = null;
			var curNode:MapNode = null;
			var rate:number = Math.tan(radians);
			
			x = sx;
			y = sy;
			
			//斜率线段上坐标点
			var targetX:number = 0;
			var targetY:number = 0;
			
			//是否竖线
			var isVLine:boolean = Math.abs(radians) == Math.PI / 2;
			var size:number = startNode.size;
			var halfSize:number = size / 2;
			var cPoint:Point = null;
			
			//计算开始节点与结束节点之间的经过的方块是否可通过
			for(var i:number = startRow; i <= endRow; i++){
				for(var j:number = startColumn; j <= endColumn; j++){
					curNode = nodes[i][j];
					cPoint = curNode.point2D;
					hLineObject = IsoUtil.getHLineObject(cPoint,size);
					vLineObject = IsoUtil.getVLineObject(cPoint,halfSize);
					
					//连线为水平线或在当前节点在水平线上
					if(rate == 0)
						targetX = cPoint.x;
					else
						targetX = (hLineObject.y - y) / rate + x;
					
					if(isVLine){
						targetY = cPoint.y;
					}else{
						targetY = (vLineObject.x - x) * rate + y;
					}
					
					//方块的水平直线或竖线和斜线是否相交
					if((targetX >= hLineObject.x1 && targetX <= hLineObject.x2) || 
						(targetY >= vLineObject.y1 && targetY <= vLineObject.y2)){
						if(types.indexOf(curNode.type) == -1){
							return false;
						}
					}
				}
			}
			
			return true;
		}
		//
		/**
		 * 获取方块的水平线段数据 
		 * @param point:Point 方块中心点
		 * @param size:int 方块尺寸
		 * @return 
		 * 
		 */		
		private static getHLineObject(point:Point,size:number = 0):any{
			var x:number = point.x;
			var y:number = point.y;
			
			IsoUtil._hLineObj.x1 = x - size;
			IsoUtil._hLineObj.x2 = x + size;
			IsoUtil._hLineObj.y = y;
			
			return  IsoUtil._hLineObj;
		}
		//
		/**
		 * 获取方块的竖直线段数据 
		 * @param point:Point 方块中心点
		 * @param size:int 方块尺寸
		 * @return 
		 * 
		 */
		private static getVLineObject(point:Point,size:number = 0):any{
			var x:number = point.x;
			var y:number = point.y;
			
			IsoUtil._vLineObj.x = x;
			IsoUtil._vLineObj.y1 = y - size;
			IsoUtil._vLineObj.y2 = y + size;
			
			return  IsoUtil._vLineObj;
		}
		//
		private static setFlag(node:MapNode):void{
			if(node.flag) return;
			
			IsoUtil._flagMap[IsoUtil._flagIndex] = node;
			IsoUtil._flagIndex ++;
			node.flag = true;
			
			if(IsoUtil.callBack != null){
				IsoUtil.callBack(node,IsoUtil._flagIndex);
			}
		}
		//
		private static resetFlag():void{
			var node:MapNode = null;
			
			for(var i:number = 0; i < IsoUtil._flagIndex; i++){
				node = IsoUtil._flagMap[i];
				node.flag = false;
				IsoUtil._flagMap[i] = null;
			}
			
			IsoUtil._flagIndex = 0;
		}
		//
		private static setUncheckedNode(node:MapNode):void{
			IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex] = node;
			IsoUtil._uncheckedIndex ++;
		}
		//
		private static getUncheckedNode():MapNode{
			IsoUtil._uncheckedIndex --;
			if(IsoUtil._uncheckedIndex < 0)
				IsoUtil._uncheckedIndex = 0;
			IsoUtil._uncheckedLength = IsoUtil._uncheckedIndex;
			
			var result:MapNode = IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex];
			IsoUtil._uncheckedMap[IsoUtil._uncheckedIndex] = null;
			
			return result;
		}
		//
		private static resetUnchecked():void{
			for(var i:number = 0; i < IsoUtil._uncheckedIndex; i++){
				IsoUtil._uncheckedMap[i] = null;
			}
			
			IsoUtil._uncheckedIndex = 0;
			IsoUtil._uncheckedLength = 0;
		}
	}
}