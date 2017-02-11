package {
	import com.adobe.AGALMiniAssembler;
	import com.adobe.PerspectiveMatrix3D;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.display.Stage3D;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.display3D.Context3D;
	import flash.display3D.Context3DProgramType;
	import flash.display3D.Context3DTextureFormat;
	import flash.display3D.Context3DVertexBufferFormat;
	import flash.display3D.IndexBuffer3D;
	import flash.display3D.Program3D;
	import flash.display3D.VertexBuffer3D;
	import flash.display3D.textures.Texture;
	import flash.events.Event;
	import flash.geom.Matrix;
	import flash.geom.Matrix3D;
	import flash.geom.Vector3D;
	import flash.utils.getTimer;

	[SWF(width = "640", height = "480", frameRate = "60", backgroundcolor = "#ffffff")]
	public class Stage3dGame extends Sprite {

		private const swfWidth:int = 640;
		private const swfHeight:int = 480;
		private const textureSize:int = 512;

		/**舞台上的3D图形窗口*/
		private var context3D:Context3D;
		/**用于渲染我们网格的着色器*/
		private var shaderProgram:Program3D;
		/**网格用到的顶点*/
		private var vertexBuffer:VertexBuffer3D;
		/**网格的顶点索引*/
		private var indexBuffer:IndexBuffer3D;
		/**用于定义网格模型的数据*/
		private var meshVertexData:Vector.<Number>;
		/**定义了每个顶点用到哪些数据的索引*/
		private var meshIndexData:Vector.<uint>;

		/*影响模型位置和相机角度一些矩阵*/
		/**模型变换矩阵*/
		private var modelMatrix:Matrix3D = new Matrix3D();
		/**相机矩阵*/
		private var cameraMatrix:Matrix3D = new Matrix3D();
		/**场景透视矩阵*/
		private var perspectiveMatrix:PerspectiveMatrix3D = new PerspectiveMatrix3D();
		/**集合矩阵*/
		private var assembleMatrix:Matrix3D = new Matrix3D();

		private var t:Number = 0;

		[Embed(source = "123.jpg")]private var myTextureBitmap:Class;
		private var myTextureData:Bitmap = new myTextureBitmap();
		private var myTexture:Texture;

		public function Stage3dGame() {
			init();
		}

		private function init(e:Event = null):void {
			stage.frameRate = 60;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
			
			stage.stage3Ds[0].addEventListener(Event.CONTEXT3D_CREATE, onContext3DCreate);
			stage.stage3Ds[0].requestContext3D();
		}

		private function onContext3DCreate(e:Event):void {
			if (hasEventListener(Event.ENTER_FRAME)) {
				removeEventListener(Event.ENTER_FRAME, enterFrame);
			}
			
			context3D = Stage3D(e.target).context3D;

			if (context3D == null) {
				return;
			}
			
			/*禁用错误检查将大幅度提高执行效率
			 *如果设置成true，则Flash将会发送有用的错误信息 
			 *比如AGAL编译错误、未初始化的着色器异常等
			*/
			context3D.enableErrorChecking = true;
			
			initData();
			
			/*3D后备缓冲区的像素尺寸*/
			context3D.configureBackBuffer(swfWidth, swfHeight, 0, true);
			
			/**一个简单的顶点着色器，实现3D变换*/
			var vertexShaderAssembler:AGALMiniAssembler = new AGALMiniAssembler();
			vertexShaderAssembler.assemble(Context3DProgramType.VERTEX, 
				"m44 op, va0, vc0\n" + 
				"mov v0, va0\n" + 
				"mov v1, va1\n");
			
			/**一个简单的片段着色器，使用顶点位置和纹理颜色*/
			var fragmentShaderAssembler:AGALMiniAssembler = new AGALMiniAssembler();
			fragmentShaderAssembler.assemble(Context3DProgramType.FRAGMENT,
				"tex ft0, v1, fs0 <2d, repeat, minilinear>\n" + 
				"mov oc, ft0\n");
			
			/*将两者混合成着色器，随后上传给GPU*/
			shaderProgram = context3D.createProgram();
			shaderProgram.upload(vertexShaderAssembler.agalcode, fragmentShaderAssembler.agalcode);
			
			/*上传网格索引*/
			indexBuffer = context3D.createIndexBuffer(meshIndexData.length);
			indexBuffer.uploadFromVector(meshIndexData, 0, meshIndexData.length);
			
			/*上传网格顶点数据
			 *因为包含X、Y、Z、U、V、nX、nY、nZ, 所以每个顶点各占8个数组元素
			*/
			vertexBuffer = context3D.createVertexBuffer(meshVertexData.length/8, 8);
			vertexBuffer.uploadFromVector(meshVertexData, 0, meshVertexData.length/8);
			
			/*产生MIP映射*/
			myTexture = context3D.createTexture(textureSize, textureSize, Context3DTextureFormat.BGRA, false);
			var ws:int = myTextureData.bitmapData.width;
			var hs:int = myTextureData.bitmapData.height;
			var level:int = 0;
			var tmp:BitmapData;
			var transform:Matrix = new Matrix();
			tmp = new BitmapData(ws, hs, true, 0x00000000);
			while (ws >= 1 && hs >= 1) {
				tmp.draw(myTextureData.bitmapData, transform, null, null, null, true);
				myTexture.uploadFromBitmapData(tmp, level);
				transform.scale(0.5, 0.5);
				level++;
				ws >>= 1;
				hs >>= 1;
				if (hs && ws) {
					tmp.dispose();
					tmp = new BitmapData(ws, hs, true, 0x000000);
				}
			}
			tmp.dispose();
			
			/*为场景创建透视矩阵*/
			perspectiveMatrix.identity()
			/*45°视域，640/480长宽比，0.1=近裁剪面 100=远裁剪面*/
			perspectiveMatrix.perspectiveFieldOfViewRH(45.0, swfWidth/swfHeight, 0.1, 100);
			
			/*创建一个定义相机位置的矩阵*/
			cameraMatrix.identity();
			cameraMatrix.appendTranslation(0, 0, -4);
			
			addEventListener(Event.ENTER_FRAME, enterFrame);
		}

		private function enterFrame(e:Event):void {
			
			/*渲染前，先清除旧的一帧*/
			context3D.clear();
			
			/*顶点位置在属性寄存器0（va0）*/
			context3D.setVertexBufferAt(0, vertexBuffer, 0, Context3DVertexBufferFormat.FLOAT_3);
			/*纹理u,v坐标在属性寄存器1（va1）*/
			context3D.setVertexBufferAt(1, vertexBuffer, 3, Context3DVertexBufferFormat.FLOAT_3); 
			
			/*将纹理赋给纹理采样寄存器0（fs0）*/
			context3D.setTextureAt(0, myTexture);
			
			/*选择着色器*/
			context3D.setProgram(shaderProgram);
			
			/*把变换矩阵传给着色器*/
			modelMatrix.identity();
			modelMatrix.appendRotation(t*0.7, Vector3D.Y_AXIS);
			modelMatrix.appendRotation(t*0.6, Vector3D.X_AXIS);
			modelMatrix.appendRotation(t*1, Vector3D.Y_AXIS);
			modelMatrix.appendTranslation(0, 0, 0);
			modelMatrix.appendRotation(90, Vector3D.X_AXIS);
			
			t += 2.0;
			
			/*重置矩阵，然后添加新的角度*/
			assembleMatrix.identity();
			assembleMatrix.append(modelMatrix); //附加模型矩阵变换
			assembleMatrix.append(cameraMatrix); //附加相机
			assembleMatrix.append(perspectiveMatrix); //附加透视
			
//			var m:Matrix3D = new Matrix3D();
//			m.appendRotation(getTimer()/100, Vector3D.Z_AXIS);
			
			/*矩阵被存入了常量寄存器0（vc0）,以供顶点着色器使用*/
			context3D.setProgramConstantsFromMatrix(Context3DProgramType.VERTEX, 0, assembleMatrix, true);
			
			/*最后，绘制三角面*/
			/*为了渲染，向drawTriangles方法传递索引缓冲*/
			context3D.drawTriangles(indexBuffer, 0, meshIndexData.length/3);
			
			//在这帧，你可能还会多次调用drawTriangles方法，以渲染所有需要的网格模型
			//你可以为每个网格选用相同或不同的着色器
			/*所有网格都画好后，就把它们显示到屏幕上*/
			context3D.present();
		}

		private function initData():void {
			/*为多边形定义他们各自使用的顶点*/
			meshIndexData = Vector.<uint> 
				([
					0, 1, 2, 	0, 2, 3,
				]);
			
			/*
			 * 4个顶点所使用的原始数据
			 * 位置x,y，z, 纹理坐标u,v, 法线x,y,z
			 */
			meshVertexData = Vector.<Number> 
			([
				//X,  Y,  Z,   U, V,   nX, nY, nZ	
				-1, -1,  0,   0, 0,   0,  0,  1,
				 1, -1,  0,   1, 0,   0,  0,  1,
				 1,  1,  0,   1, 1,   0,  0,  1,
				-1,  1,  0,   0, 1,   0,  0,  1
			]);
		}
	}
}
