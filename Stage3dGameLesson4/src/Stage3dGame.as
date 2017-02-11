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
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;
	import flash.utils.getTimer;

	[SWF(width = "640", height = "480", frameRate = "60", backgroundcolor = "#ffffff")]
	public class Stage3dGame extends Sprite {

		private var fpsLast:uint = getTimer();
		private var fpsTicks:uint = 0;
		private var fpsTf:TextField;

		private const swfWidth:int = 640;
		private const swfHeight:int = 480;
		private const textureSize:int = 512;

		/**舞台上的3D图形窗口*/
		private var context3D:Context3D;
		/**用于渲染我们网格的着色器*/
		private var shaderProgram1:Program3D;
		private var shaderProgram2:Program3D;
		private var shaderProgram3:Program3D;
		private var shaderProgram4:Program3D;
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
		private var looptemp:int = 0;

		[Embed(source = "123.jpg")]
		private var myTextureBitmap:Class;
		private var myTextureData:Bitmap = new myTextureBitmap();
		private var myTexture:Texture;

		public function Stage3dGame() {
			init();
		}

		private function init(e:Event = null):void {
			stage.frameRate = 60;
			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;

			initGUI();

			stage.stage3Ds[0].addEventListener(Event.CONTEXT3D_CREATE, onContext3DCreate);
			stage.stage3Ds[0].requestContext3D();
		}

		private function initGUI():void {
			//一个用于所有GUI标签的字体描述
			var myformat:TextFormat = new TextFormat();
			myformat.color = 0xFFFFFF;
			myformat.size = 13;

			//创建一个在屏幕上显示帧频的字体描述
			fpsTf = new TextField();
			fpsTf.x = 0;
			fpsTf.y = 0;
			fpsTf.selectable = false;
			fpsTf.autoSize = TextFieldAutoSize.LEFT;
			fpsTf.defaultTextFormat = myformat;
			fpsTf.text = "Initializing Stage3D...";
			addChild(fpsTf);

			var label1:TextField = new TextField();
			label1.x = 100;
			label1.y = 180;
			label1.selectable = false;
			label1.autoSize = TextFieldAutoSize.LEFT;
			label1.defaultTextFormat = myformat;
			label1.text = "Shader 1: Textured";
			addChild(label1);

			var label2:TextField = new TextField();
			label2.x = 400;
			label2.y = 180;
			label2.selectable = false;
			label2.autoSize = TextFieldAutoSize.LEFT;
			label2.defaultTextFormat = myformat;
			label2.text = "Shader 2: Vertex RGB";
			addChild(label2);

			var label3:TextField = new TextField();
			label3.x = 80;
			label3.y = 440;
			label3.selectable = false;
			label3.autoSize = TextFieldAutoSize.LEFT;
			label3.defaultTextFormat = myformat;
			label3.text = "Shader 3: Vertext RGB + Textured";
			addChild(label3);

			var label4:TextField = new TextField();
			label4.x = 340;
			label4.y = 440;
			label4.selectable = false;
			label4.autoSize = TextFieldAutoSize.LEFT;
			label4.defaultTextFormat = myformat;
			label4.text = "Shader 4: Textured + setProgramConstants";
			addChild(label4);
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

			//初始化我们的网格数据
			initData();

			/*3D后备缓冲区的像素尺寸*/
			context3D.configureBackBuffer(swfWidth, swfHeight, 0, true);

			//编译我们所需要的所有着色器
			initShaders();

			/*上传网格索引*/
			indexBuffer = context3D.createIndexBuffer(meshIndexData.length);
			indexBuffer.uploadFromVector(meshIndexData, 0, meshIndexData.length);

			/*上传网格顶点数据
			 *因为包含X、Y、Z、U、V、nX、nY、nZ、r、g、b、a, 所以每个顶点各占12个数组元素
			*/
			vertexBuffer = context3D.createVertexBuffer(meshVertexData.length / 12, 12);
			vertexBuffer.uploadFromVector(meshVertexData, 0, meshVertexData.length / 12);

			/*产生MIP映射*/
			myTexture = context3D.createTexture(textureSize, textureSize, Context3DTextureFormat.BGRA, false);
			uploadTextureWithMipmaps(myTexture, myTextureData.bitmapData);

			/*为场景创建透视矩阵*/
			perspectiveMatrix.identity()
			/*45°视域，640/480长宽比，0.1=近裁剪面 100=远裁剪面*/
			perspectiveMatrix.perspectiveFieldOfViewRH(45.0, swfWidth / swfHeight, 0.01, 100);

			/*创建一个定义相机位置的矩阵*/
			cameraMatrix.identity();
			cameraMatrix.appendTranslation(0, 0, -10);

			addEventListener(Event.ENTER_FRAME, enterFrame);
		}
		
		public function uploadTextureWithMipmaps(dest:Texture, src:BitmapData):void {
			var ws:int = src.width;
			var hs:int = src.height;
			var level:int = 0;
			var tmp:BitmapData;
			var transform:Matrix = new Matrix();
			
			tmp = new BitmapData(src.width, src.height, true, 0x00000000);
			
			while ( ws >= 1 && hs >= 1 ) { 
				tmp.draw(src, transform, null, null, null, true); 
				dest.uploadFromBitmapData(tmp, level);
				transform.scale(0.5, 0.5);
				level++;
				ws >>= 1;
				hs >>= 1;
				if (hs && ws) 
				{
					tmp.dispose();
					tmp = new BitmapData(ws, hs, true, 0x00000000);
				}
			}
			tmp.dispose();
		}

		/**创建4种不同的着色器*/
		private function initShaders():void {

			//一个做了3D变换的简单顶点着色器
			//为了简单起见，所有4种着色器都使用了它
			var vertexShaderAssembler:AGALMiniAssembler = new AGALMiniAssembler();
			vertexShaderAssembler.assemble(Context3DProgramType.VERTEX,
				//4x4矩阵乘以相机角度
				"m44 op, va0, vc0\n" +
				//告诉片段着色器x,y,z的值
				"mov v0, va0\n" +
				//告诉片段着色u,v的值
				"mov v1, va1\n" +
				//告诉片段着色器r,g,b,a的值
				"mov v2, va2\n");

			//使用u,v坐标进行纹理采样
			var fragmentShaderAssembler1:AGALMiniAssembler = new AGALMiniAssembler();
			fragmentShaderAssembler1.assemble(Context3DProgramType.FRAGMENT,
				// 从纹理采样寄存器0中获取纹理颜色
				// 从变量寄存器1中获取u,v坐标
				// 最后把差值的结果存在ft0中
				"tex ft0, v1, fs0 <2d, repeat, miplinear>\n" +
				// 将结果移给颜色寄存器
				"mov oc, ft0\n");

			//没有纹理，使用顶点缓冲数据中的r,g,b,a值
			var fragmentShaderAssembler2:AGALMiniAssembler = new AGALMiniAssembler();
			fragmentShaderAssembler2.assemble(Context3DProgramType.FRAGMENT,
				// 从v2寄存器中获取颜色，这个值是被顶点着色器插入的
				"mov oc v2\n");

			var fragmentShaderAssembler3:AGALMiniAssembler = new AGALMiniAssembler();
			fragmentShaderAssembler3.assemble(Context3DProgramType.FRAGMENT,
				// 从纹理采样寄存器0中获取纹理颜色
				// 从变量寄存器1中获取u,v坐标
				"tex ft0, v1, fs0<2d,repeat,miplinear>\n" +
				// 乘以存储在v2中的值（顶点颜色）
				"mul ft1, v2, ft0\n" +
				// 将结果移给颜色寄存器
				"mov oc, ft1\n");

			var fragmentShaderAssembler4:AGALMiniAssembler = new AGALMiniAssembler();
			fragmentShaderAssembler4.assemble(Context3DProgramType.FRAGMENT,
				// 从纹理采样寄存器0中获取纹理颜色
				// 从变量寄存器1中获取u,v坐标
				"tex ft0, v1, fs0<2d,repeat,miplinear>\n" +
				// 乘以存储在fc0中的值
				"mul ft1, fc0, ft0\n" +
				// 将结果移给颜色寄存器
				"mov oc, ft1\n");

			//将它们混合成完整的着色器，随后上传给GPU
			shaderProgram1 = context3D.createProgram();
			shaderProgram1.upload(vertexShaderAssembler.agalcode, fragmentShaderAssembler1.agalcode);

			shaderProgram2 = context3D.createProgram();
			shaderProgram2.upload(vertexShaderAssembler.agalcode, fragmentShaderAssembler2.agalcode);

			shaderProgram3 = context3D.createProgram();
			shaderProgram3.upload(vertexShaderAssembler.agalcode, fragmentShaderAssembler3.agalcode);

			shaderProgram4 = context3D.createProgram();
			shaderProgram4.upload(vertexShaderAssembler.agalcode, fragmentShaderAssembler4.agalcode);
		}

		private function enterFrame(e:Event):void {

			/*渲染前，先清除旧的一帧*/
			context3D.clear();

			t += 2.0;

			for (looptemp = 0; looptemp < 4; looptemp++) {
				modelMatrix.identity();

				switch (looptemp) {
					case 0:
						context3D.setTextureAt(0, myTexture);
						context3D.setProgram(shaderProgram1);
						modelMatrix.appendRotation(t * 0.7, Vector3D.Y_AXIS);
						modelMatrix.appendRotation(t * 0.6, Vector3D.X_AXIS);
						modelMatrix.appendRotation(t * 1.0, Vector3D.Y_AXIS);
						modelMatrix.appendTranslation(-3, 3, 0);
						break;
					case 1:
						context3D.setTextureAt(0, null);
						context3D.setProgram(shaderProgram2);
						modelMatrix.appendRotation(t * -0.2, Vector3D.Y_AXIS);
						modelMatrix.appendRotation(t * 0.4, Vector3D.X_AXIS);
						modelMatrix.appendRotation(t * 0.7, Vector3D.Y_AXIS);
						modelMatrix.appendTranslation(3, 3, 0);
						break;
					case 2:
						context3D.setTextureAt(0, myTexture);
						context3D.setProgram(shaderProgram3);
						modelMatrix.appendRotation(t * 1.0, Vector3D.Y_AXIS);
						modelMatrix.appendRotation(t * -0.2, Vector3D.X_AXIS);
						modelMatrix.appendRotation(t * 0.3, Vector3D.Y_AXIS);
						modelMatrix.appendTranslation(-3, -3, 0);
						break;
					case 3:
						context3D.setProgramConstantsFromVector(Context3DProgramType.FRAGMENT, 0, Vector.<Number>([1, Math.abs(Math.cos(t/50)), 0, 1]));
						context3D.setTextureAt(0, myTexture);
						context3D.setProgram(shaderProgram4);
						modelMatrix.appendRotation(t * 0.3, Vector3D.Y_AXIS);
						modelMatrix.appendRotation(t * 0.3, Vector3D.X_AXIS);
						modelMatrix.appendRotation(t * -0.3, Vector3D.Y_AXIS);
						modelMatrix.appendTranslation(3, -3, 0);
						break;
				}
				/*重置矩阵，然后添加新的角度*/
				assembleMatrix.identity();
				assembleMatrix.append(modelMatrix); //附加模型矩阵变换
				assembleMatrix.append(cameraMatrix); //附加相机
				assembleMatrix.append(perspectiveMatrix); //附加透视
	
				/*矩阵被存入了常量寄存器0（vc0）,以供顶点着色器使用*/
				context3D.setProgramConstantsFromMatrix(Context3DProgramType.VERTEX, 0, assembleMatrix, true);
	
				//顶点位置x,y,z在顶点属性寄存器0（va0）
				context3D.setVertexBufferAt(0, vertexBuffer, 0, Context3DVertexBufferFormat.FLOAT_3);
				//纹理u,v坐标在顶点属性寄存器1（va1）
				context3D.setVertexBufferAt(1, vertexBuffer, 3, Context3DVertexBufferFormat.FLOAT_2);
				//顶点r,g,b,a在顶点属性寄存器（va2）
				context3D.setVertexBufferAt(2, vertexBuffer, 8, Context3DVertexBufferFormat.FLOAT_4);
	
				/*最后，绘制三角面*/
				/*为了渲染，向drawTriangles方法传递索引缓冲*/
				context3D.drawTriangles(indexBuffer, 0, meshIndexData.length / 3);
			}

			//在这帧，你可能还会多次调用drawTriangles方法，以渲染所有需要的网格模型
			//你可以为每个网格选用相同或不同的着色器
			/*所有网格都画好后，就把它们显示到屏幕上*/
			context3D.present();
			
			fpsTicks++;
			var now:uint = getTimer();
			var delta:uint = now - fpsLast;
			if (delta >= 1000) {
				var fps:Number = fpsTicks / delta * 1000;
				fpsTf.text = fps.toFixed(1) + "fps";
				fpsTicks = 0;
				fpsLast = now;
			}
		}

		private function initData():void {
			/*为多边形定义他们各自使用的顶点*/
			meshIndexData = Vector.<uint>
			([
				0, 1, 2, 	0, 2, 3,
			]);

			/*
			 * 4个顶点所使用的原始数据
			 * 位置x,y,z, 纹理坐标u,v, 法线nx,ny,nz, 顶点r,g,b,a
			 */
			meshVertexData = Vector.<Number>([
				//X, Y, Z,  U,V,  nX,nY,nZ	   r,   g,   b,   a
				 -1,-1, 0,  0, 0,  0, 0, 1,  1.0, 0.0, 0.0, 1.0,
				  1,-1, 0,  1, 0,  0, 0, 1,  0.0, 1.0, 0.0, 1.0,
				  1, 1, 0,  1, 1,  0, 0, 1,  0.0, 0.0, 1.0, 1.0,
				 -1, 1, 0,  0, 1,  0, 0, 1,  1.0, 1.0, 1.0, 1.0
			]);
		}
	}
}
