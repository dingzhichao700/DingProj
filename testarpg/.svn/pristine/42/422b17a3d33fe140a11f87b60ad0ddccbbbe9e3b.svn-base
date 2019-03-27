
module egret {

	export class ActionMovieClipUtil{
		/**
		 * 构造函数
		 */
		public constructor(){
		}

		/**
		 * 构造并获取动作影片数据
		 * @param data 影片json数据
		 * @param sheet 影片纹理集
		 * @returns {ActionMovieClipVo}
		 */
		public static getActionMovieClipVo(data:any,sheet:SpriteSheet):ActionMovieClipVo{
			if(!data || !sheet){
				LogManager.error(ActionMovieClipUtil,"getActionMovieClipVo()参数不能为空");
				return null;
			}

			var vo:ActionMovieClipVo = new ActionMovieClipVo();
			vo.defaultActionType = data.defaultActionType;
			vo.defautlDirectionType = data.defautlDirectionType;

			for(var i in data.baseMovieClipVos){
				if(data.baseMovieClipVos[i]){
					vo.baseMovieClipVos[i] = [];

					for(var j in data.baseMovieClipVos[i]){
						var item:any = data.baseMovieClipVos[i][j];
						if(item){
							var baseVo:BaseMovieClipVo = new BaseMovieClipVo();
							vo.baseMovieClipVos[i][j] = baseVo;

							baseVo.frameRate = item.frameRate;
							baseVo.topLineY = item.topLineY;

							baseVo.centerPoint.x = item.centerPoint.x;
							baseVo.centerPoint.y = item.centerPoint.y;

							baseVo.shadowWidth = item.shadowWidth;
							baseVo.shadowHeight = item.shadowHeight;

							baseVo.dataItems = [];

							for(var k in item.dataItems){
								var temp:any = item.dataItems[k];
								var dataItem:BaseMovieClipDataItem = new BaseMovieClipDataItem();
								dataItem.x = temp.x;
								dataItem.y = temp.y;

								var texture:Texture = sheet.getTexture(i + "_" + j + "_" + k);
								if(texture){
									dataItem.bitmapData = texture;
								}

								baseVo.dataItems.push(dataItem);
							}

							if(dataItem.bitmapData){
								baseVo.hasFrameTexture = true;
							}
						}else{
							vo.baseMovieClipVos[i][j] = null;
						}
					}
				}else{
					vo.baseMovieClipVos[i] = null;
				}
			}

			return vo;
		}
		//
		/**
		 * 构造并获取动作影片数据，动作方向图片拆分
		 * @param vo 影片数据
		 * @param sheet 影片纹理集
		 * @returns {ActionMovieClipVo}
		 */
		public static getActionMovieClipVo2(vo:ActionMovieClipVo,sheet:SpriteSheet):ActionMovieClipVo{
			if(!vo || !sheet){
				LogManager.error(ActionMovieClipUtil,"getActionMovieClipVo()参数不能为空");
				return null;
			}

			for(var i in vo.baseMovieClipVos){
				for(var j in vo.baseMovieClipVos[i]){
					var baseVo:BaseMovieClipVo = vo.baseMovieClipVos[i][j];
                    if(!baseVo) continue;
                    
					for(var k in baseVo.dataItems){
						var dataItem:BaseMovieClipDataItem = baseVo.dataItems[k];
						if(dataItem){
							var texture:Texture = sheet.getTexture(i + "_" + j + "_" + k);
							if(texture){
								dataItem.bitmapData = texture;
							}
						}
					}

					if(dataItem.bitmapData){
						baseVo.hasFrameTexture = true;
					}
				}
			}

			return vo;
		}
	}
}