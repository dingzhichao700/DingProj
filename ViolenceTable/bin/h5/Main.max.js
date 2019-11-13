
/***********************************/
/*http://www.layabox.com  2017/12/12*/
/***********************************/
var Laya=window.Laya=(function(window,document){
	var Laya={
		__internals:[],
		__packages:{},
		__classmap:{'Object':Object,'Function':Function,'Array':Array,'String':String},
		__sysClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		__propun:{writable: true,enumerable: false,configurable: true},
		__presubstr:String.prototype.substr,
		__substr:function(ofs,sz){return arguments.length==1?Laya.__presubstr.call(this,ofs):Laya.__presubstr.call(this,ofs,sz>0?sz:(this.length+sz));},
		__init:function(_classs){_classs.forEach(function(o){o.__init$ && o.__init$();});},
		__isClass:function(o){return o && (o.__isclass || o==Object || o==String || o==Array);},
		__newvec:function(sz,value){
			var d=[];
			d.length=sz;
			for(var i=0;i<sz;i++) d[i]=value;
			return d;
		},
		__extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var gs=Object.getOwnPropertyDescriptor(b, p);
				var g = gs.get, s = gs.set; 
				if ( g || s ) {
					if ( g && s)
						Object.defineProperty(d,p,gs);
					else{
						g && Object.defineProperty(d, p, g);
						s && Object.defineProperty(d, p, s);
					}
				}
				else d[p] = b[p];
			}
			function __() { Laya.un(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();Laya.un(d.prototype,'__imps',Laya.__copy({},b.prototype.__imps));
		},
		__copy:function(dec,src){
			if(!src) return null;
			dec=dec||{};
			for(var i in src) dec[i]=src[i];
			return dec;
		},
		__package:function(name,o){
			if(Laya.__packages[name]) return;
			Laya.__packages[name]=true;
			var p=window,strs=name.split('.');
			if(strs.length>1){
				for(var i=0,sz=strs.length-1;i<sz;i++){
					var c=p[strs[i]];
					p=c?c:(p[strs[i]]={});
				}
			}
			p[strs[strs.length-1]] || (p[strs[strs.length-1]]=o||{});
		},
		__hasOwnProperty:function(name,o){
			o=o ||this;
		    function classHas(name,o){
				if(Object.hasOwnProperty.call(o.prototype,name)) return true;
				var s=o.prototype.__super;
				return s==null?null:classHas(name,s);
			}
			return (Object.hasOwnProperty.call(o,name)) || classHas(name,o.__class);
		},
		__typeof:function(o,value){
			if(!o || !value) return false;
			if(value===String) return (typeof o==='string');
			if(value===Number) return (typeof o==='number');
			if(value.__interface__) value=value.__interface__;
			else if(typeof value!='string')  return (o instanceof value);
			return (o.__imps && o.__imps[value]) || (o.__class==value);
		},
		__as:function(value,type){
			return (this.__typeof(value,type))?value:null;
		},
        __int:function(value){
            return value?parseInt(value):0;
        },
		interface:function(name,_super){
			Laya.__package(name,{});
			var ins=Laya.__internals;
			var a=ins[name]=ins[name] || {self:name};
			if(_super)
			{
				var supers=_super.split(',');
				a.extend=[];
				for(var i=0;i<supers.length;i++){
					var nm=supers[i];
					ins[nm]=ins[nm] || {self:nm};
					a.extend.push(ins[nm]);
				}
			}
			var o=window,words=name.split('.');
			for(var i=0;i<words.length-1;i++) o=o[words[i]];
			o[words[words.length-1]]={__interface__:name};
		},
		class:function(o,fullName,_super,miniName){
			_super && Laya.__extend(o,_super);
			if(fullName){
				Laya.__package(fullName,o);
				Laya.__classmap[fullName]=o;
				if(fullName.indexOf('.')>0){
					if(fullName.indexOf('laya.')==0){
						var paths=fullName.split('.');
						miniName=miniName || paths[paths.length-1];
						if(Laya[miniName]) console.log("Warning!,this class["+miniName+"] already exist:",Laya[miniName]);
						Laya[miniName]=o;
					}
				}
				else {
					if(fullName=="Main")
						window.Main=o;
					else{
						if(Laya[fullName]){
							console.log("Error!,this class["+fullName+"] already exist:",Laya[fullName]);
						}
						Laya[fullName]=o;
					}
				}
			}
			var un=Laya.un,p=o.prototype;
			un(p,'hasOwnProperty',Laya.__hasOwnProperty);
			un(p,'__class',o);
			un(p,'__super',_super);
			un(p,'__className',fullName);
			un(o,'__super',_super);
			un(o,'__className',fullName);
			un(o,'__isclass',true);
			un(o,'super',function(o){this.__super.call(o);});
		},
		imps:function(dec,src){
			if(!src) return null;
			var d=dec.__imps|| Laya.un(dec,'__imps',{});
			function __(name){
				var c,exs;
				if(! (c=Laya.__internals[name]) ) return;
				d[name]=true;
				if(!(exs=c.extend)) return;
				for(var i=0;i<exs.length;i++){
					__(exs[i].self);
				}
			}
			for(var i in src) __(i);
		},
        superSet:function(clas,o,prop,value){
            var fun = clas.prototype["_$set_"+prop];
            fun && fun.call(o,value);
        },
        superGet:function(clas,o,prop){
            var fun = clas.prototype["_$get_"+prop];
           	return fun?fun.call(o):null;
        },
		getset:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && Laya.un(o,'_$get_'+name,getfn);
				setfn && Laya.un(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) 
				Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false,configurable:true});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false,configurable:true});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false,configurable:true});
			}
		},
		static:function(_class,def){
				for(var i=0,sz=def.length;i<sz;i+=2){
					if(def[i]=='length') 
						_class.length=def[i+1].call(_class);
					else{
						function tmp(){
							var name=def[i];
							var getfn=def[i+1];
							Object.defineProperty(_class,name,{
								get:function(){delete this[name];return this[name]=getfn.call(this);},
								set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});
						}
						tmp();
					}
				}
		},		
		un:function(obj,name,value){
			value || (value=obj[name]);
			Laya.__propun.value=value;
			Object.defineProperty(obj, name, Laya.__propun);
			return value;
		},
		uns:function(obj,names){
			names.forEach(function(o){Laya.un(obj,o)});
		}
	};

    window.console=window.console || ({log:function(){}});
	window.trace=window.console.log;
	Error.prototype.throwError=function(){throw arguments;};
	//String.prototype.substr=Laya.__substr;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});

	return Laya;
})(window,document);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;
//class main.base.action.BaseAction
var BaseAction=(function(){
	function BaseAction(){
		this._player=null;
	}

	__class(BaseAction,'main.base.action.BaseAction');
	var __proto=BaseAction.prototype;
	__proto.action=function(){
		return false;
	}

	__proto.setPlayer=function(obj){
		this._player=obj;
	}

	__proto.recover=function(){}
	__getset(0,__proto,'player',function(){
		return this._player;
	});

	return BaseAction;
})()


/**
*AI基类
*@author dingzhichao
*
*/
//class main.base.BaseAIManager
var BaseAIManager=(function(){
	function BaseAIManager(){
		this._owner=null;
		this._actions=null;
	}

	__class(BaseAIManager,'main.base.BaseAIManager');
	var __proto=BaseAIManager.prototype;
	/**设置生效*/
	__proto.setActive=function(boo){
		if (boo){
			/*no*/this.Laya.timer.loop(5,this,this.loop,null,true);
			}else {
			/*no*/this.Laya.timer.clear(this,this.loop);
		}
	}

	__proto.loop=function(){}
	__proto.addAction=function(action){
		if (!this.owner){
			console.log("错误！ai拥有者为空："+this);
		}
		if (!this._actions){
			this._actions=new Array;
		}
		if (this._actions.indexOf(action)< 0){
			action.setPlayer(this.owner);
			this._actions.push(action);
		}
	}

	__proto.removeAction=function(action){
		if (this._actions.indexOf(action)>=0){
			this._actions.splice(this._actions.indexOf(action),1);
			action.recover();
		}
	}

	__proto.recover=function(){}
	/**AI持有者*/
	__getset(0,__proto,'owner',function(){
		return this._owner;
		},function($owner){
		this._owner=$owner;
	});

	return BaseAIManager;
})()


//class main.module.ball.BallManager
var BallManager=(function(){
	function BallManager(){
		this.ballPool=null;
		this.ballPool=new Array;
	}

	__class(BallManager,'main.module.ball.BallManager');
	var __proto=BallManager.prototype;
	__proto.getBall=function(type){
		if (this.ballPool.length > 0){
			for (var i=0;i < this.ballPool.length;i++){
				if ((this.ballPool [i]).type==type){
					return this.ballPool.slice(i,1);
				}
			}
		};
		var target;
		switch (type){
			case 0:
				target=new HitBall();
				break ;
			case 1:;
				var enemy=new BaseBall();
				var ai=new EnemyBallAiManager();
				ai.owner=enemy;
				enemy.setAi(ai);
				enemy.setAiActive(true);
				target=enemy;
				break ;
			}
		target.type=type;
		return target;
	}

	__proto.returnBall=function(item){
		this.ballPool.push(item);
	}

	__getset(1,BallManager,'ins',function(){BallManager._ins=BallManager._ins|| new BallManager();
		return BallManager._ins;
	});

	BallManager._ins=null;
	return BallManager;
})()


//class main.module.scene.SceneControl
var SceneControl=(function(){
	function SceneControl(){
		this.curScene=null;
	}

	__class(SceneControl,'main.module.scene.SceneControl');
	var __proto=SceneControl.prototype;
	__proto.init=function(){
		this.curScene=new GameScene();
		this.curScene.init();
		/*no*/this.Laya.stage.addChild(this.curScene);
		/*no*/this.Laya.stage.on(laya.events.Event.KEY_DOWN,this,this.onDown);
		/*no*/this.Laya.timer.once(1,this,function(){
			this.centerX=0;
			this.centerY=0;
		});
	}

	__proto.onDown=function(){
		/*no*/this.Laya.stage.on(laya.events.Event.KEY_UP,this,this.onUp);
		laya.media.SoundManager.setMusicVolume(0.05);
		Params.ins.timeScale=0.02;
	}

	__proto.onUp=function(){
		/*no*/this.Laya.stage.off(laya.events.Event.KEY_UP,this,this.onUp);
		laya.media.SoundManager.setMusicVolume(0.5);
		Params.ins.timeScale=1;
	}

	__getset(1,SceneControl,'ins',function(){SceneControl._ins=SceneControl._ins|| new SceneControl();
		return SceneControl._ins;
	});

	SceneControl._ins=null;
	return SceneControl;
})()


//class main.Params
var Params=(function(){
	function Params(){
		/**时间倍率*/
		this.timeScale=1;
	}

	__class(Params,'main.Params');
	__getset(1,Params,'ins',function(){Params._ins=Params._ins|| new Params();
		return Params._ins;
	});

	Params._ins=null;
	return Params;
})()


//class main.utils.ShockUtil
var ShockUtil=(function(){
	function ShockUtil(){}
	__class(ShockUtil,'main.utils.ShockUtil');
	ShockUtil.play=function(view,time,range,speed,dir,handler){
		(speed===void 0)&& (speed=0);
		(dir===void 0)&& (dir=0);
		if (ShockUtil.infoDic[view]){
			ShockUtil.stop(view);
		};
		var beginX=view.x;
		var beginY=view.y;
		ShockUtil.infoDic[view]=[beginX,beginY,time,laya.utils.Browser.now(),range,speed,dir,handler];
		/*no*/this.Laya.timer.loop(1,view,ShockUtil.doShock,[view]);
	}

	ShockUtil.doShock=function(view){
		var arr=ShockUtil.infoDic[view];
		var maxTime=arr[2];
		var passTime=laya.utils.Browser.now()-arr[3];
		if (passTime >=maxTime){
			ShockUtil.stop(view);
			return;
		};
		var beginX=arr[0];
		var beginY=arr[1];
		var range=arr[4];
		var speed=arr[5];
		var dir=arr[6];
		if (dir==0 || dir==1){
			var addX=Math.sin(passTime *speed / 100)*range;
			view.x=beginX+addX;
		}
		if (dir==0 || dir==2){
			var addY=Math.cos(passTime *speed / 100)*range;
			view.y=beginY+addY;
		}
	}

	ShockUtil.stop=function(view){
		if (ShockUtil.infoDic[view]){
			/*no*/this.Laya.timer.clearAll(view);
			var arr=ShockUtil.infoDic[view];
			var beginX=arr[0];
			var beginY=arr[1];
			view.x=beginX;
			view.y=beginY;
			var handler=arr[7];
			if (handler){
				handler.run();
			}
			delete ShockUtil.infoDic[view];
		}
	}

	ShockUtil.infoDic={};
	return ShockUtil;
})()


//class Main
var Main=(function(){
	function Main(){
		this.loadCount=0;
		this.loadList=["comp","ball"];
		/*no*/this.Laya.Config.isAntialias=true;
		/*no*/this.Laya.init(768,1080,laya.webgl.WebGL);
		/*no*/this.Laya.stage.scaleMode=laya.display.Stage.SCALE_FIXED_AUTO;
		this.loadCount=0;
		for (var i=0;i < this.loadList.length;i++){
			var url=this.loadList[i];
			/*no*/this.Laya.loader.load("res/"+url+".atlas",laya.utils.Handler.create(this,this.onLoaded));
		}
	}

	__class(Main,'Main');
	var __proto=Main.prototype;
	__proto.onLoaded=function(e){
		this.loadCount++;
		if (this.loadCount==this.loadList.length){
			console.log("预加载图集完成，耗时：");
			SceneControl.ins.init();
		}
	}

	return Main;
})()


//class main.ui.BallItemUI extends View
var BallItemUI=(function(_super){
	function BallItemUI(){
		this.boxBottom=null;
		this.boxPhantom=null;
		this.boxBall=null;
		BallItemUI.__super.call(this);
	}

	__class(BallItemUI,'main.ui.BallItemUI');
	var __proto=BallItemUI.prototype;
	__proto.createChildren=function(){
		_super.prototype.createChildren();
		/*no*/this.createView(BallItemUI.uiView);
	}

	BallItemUI.uiView={"type":"View","props":{"width":39,"mouseEnabled":true,"height":39},"child":[{"type":"Box","props":{"y":0,"x":0,"var":"boxBottom","mouseThrough":true,"mouseEnabled":true}},{"type":"Box","props":{"y":0,"x":0,"var":"boxPhantom","mouseThrough":true,"mouseEnabled":true}},{"type":"Box","props":{"y":0,"x":0,"var":"boxBall","mouseThrough":true,"mouseEnabled":true}}]};
	return BallItemUI;
})(View)


//class main.module.item.BlockItem extends laya.ui.View
var BlockItem=(function(_super){
	function BlockItem(){
		this._data=null;
		this._lines=null;
		this._pUp=0;
		this._pDown=0;
		this._pLeft=0;
		this._pRight=0;
		BlockItem.__super.call(this);
		this.alpha=0.5;
	}

	__class(BlockItem,'main.module.item.BlockItem');
	var __proto=BlockItem.prototype;
	__proto.onDrag=function(){
		this.off(laya.events.Event.MOUSE_DOWN,this,this.onDrag);
		/*no*/this.Laya.stage.on(laya.events.Event.MOUSE_UP,this,this.endDrag);
		this.startDrag();
	}

	__proto.endDrag=function(){
		this.stopDrag();
		/*no*/this.Laya.stage.off(laya.events.Event.MOUSE_UP,this,this.endDrag);
		this.on(laya.events.Event.MOUSE_DOWN,this,this.onDrag);
	}

	__proto.setRect=function(width,height){
		this.data=[0,0,width,0,width,height,0,height];
	}

	__proto.drawBlock=function(){
		this.graphics.clear();
		this.graphics.drawPoly(0,0,this._data.slice(2),"#FF0000");
	}

	__getset(0,__proto,'data',function(){
		return this._data;
		},function(arr){
		this._data=arr;
		this._data.push(0);
		this._data.push(0);
		this._pUp=0;
		this._pDown=0;
		this._pLeft=0;
		this._pRight=0;
		this._lines=[];
		for (var i=0;i < this._data.length-2;i+=2){
			var point1=new laya.maths.Point(this._data[i],this._data[i+1]);
			var point2=new laya.maths.Point(this._data[i+2],this._data[i+3]);
			this._lines.push([point1,point2]);
			if (point2.x < this._pLeft){
				this._pLeft=point2.x;
				}else if (point2.x > this._pRight){
				this._pRight=point2.x;
			}
			if (point2.y < this._pUp){
				this._pUp=point2.y;
				}else if (point2.y > this._pDown){
				this._pDown=point2.y;
			}
		}
		this.width=this._pRight-this._pLeft;
		this.height=this._pDown-this._pUp;
		this.on(laya.events.Event.MOUSE_DOWN,this,this.onDrag);
		this.mouseEnabled=true;
	});

	__getset(0,__proto,'lines',function(){
		return this._lines;
	});

	__getset(0,__proto,'pUp',function(){
		return this._pUp;
	});

	__getset(0,__proto,'pRight',function(){
		return this._pRight;
	});

	__getset(0,__proto,'pDown',function(){
		return this._pDown;
	});

	__getset(0,__proto,'pLeft',function(){
		return this._pLeft;
	});

	return BlockItem;
})(laya.ui.View)


//class main.ui.HpBarViewUI extends View
var HpBarViewUI=(function(_super){
	function HpBarViewUI(){
		this.imgHp=null;
		HpBarViewUI.__super.call(this);
	}

	__class(HpBarViewUI,'main.ui.HpBarViewUI');
	var __proto=HpBarViewUI.prototype;
	__proto.createChildren=function(){
		_super.prototype.createChildren();
		/*no*/this.createView(HpBarViewUI.uiView);
	}

	HpBarViewUI.uiView={"type":"View","props":{"width":52,"height":7},"child":[{"type":"Image","props":{"y":2,"x":2,"var":"imgHp","skin":"comp/progress_1_1.png"}},{"type":"Image","props":{"skin":"comp/progress_1_bg.png"}}]};
	return HpBarViewUI;
})(View)


/**
*场景基类
*@author dingzhichao
*
*/
//class main.module.scene.BaseScene extends laya.display.Sprite
var BaseScene=(function(_super){
	function BaseScene(){
		this.totalSpeed=NaN;
		this._layerBlock=null;
		this._layerBall=null;
		this.ballList=null;
		this.blockList=null;
		this.WALL_POS=[];
		// private const WALL_POS:Array=[[42,19,0,0,490,0,490,22,0,22],[528,47,0,0,26,0,26,880,0,880],[41,937,0,0,490,0,490,22,0,22],[16,52,0,0,26,0,26,880,0,880]];
		this.WALL_POS2=[[0,0,0,0,490,0,490,22],[481,20,0,0,26,0,26,880],[0,880,0,0,490,0,490,22],[0,0,0,0,26,0,26,880]];
		BaseScene.__super.call(this);
	}

	__class(BaseScene,'main.module.scene.BaseScene');
	var __proto=BaseScene.prototype;
	__proto.init=function(){
		this.initLayers();
		this.initBlock();
		this.initBall();
		this.initListener();
		this.onResize();
	}

	__proto.initListener=function(){
		/*no*/this.Laya.timer.frameLoop(1,this,this.onFrame);
		/*no*/this.Laya.stage.on(laya.events.Event.KEY_DOWN,this,this.onKeyDown);
		/*no*/this.Laya.stage.on(laya.events.Event.RESIZE,this,this.onResize);
	}

	/**初始化层级*/
	__proto.initLayers=function(){
		var bg=new laya.ui.Image();
		bg.skin="unpack/img_bg.jpg";
		/*no*/this.addChild(bg);
		this._layerBlock=new laya.display.Sprite();
		/*no*/this.addChild(this._layerBlock);
		this._layerBall=new laya.display.Sprite();
		/*no*/this.addChild(this._layerBall);
	}

	/**初始化障碍物*/
	__proto.initBlock=function(){
		this.blockList=[];
		var targetConf=this.WALL_POS;
		for (var j=0;j < targetConf.length;j++){
			var item=new BlockItem();
			item.data=(targetConf [j]).slice(2);
			item.x=targetConf[j][0];
			item.y=targetConf[j][1];
			this._layerBlock.addChild(item);
			this.blockList.push(item);
		}
	}

	/**初始化球*/
	__proto.initBall=function(){
		this.ballList=[];
		for (var i=0;i < 1;i++){
			var ball=this.addBall(280+100 *Math.floor(i / 5),600+100 *(i % 5),1,1);
			ball.ballRotation=0;
		};
		var ball0=this.addBall(280,300,0,0);
	}

	/**
	*添加一个球到容器中
	*@param x
	*@param y
	*@param type 球类型
	*@param camp 阵营，0为玩家球，1为被敌方球
	*/
	__proto.addBall=function(x,y,type,camp){
		(type===void 0)&& (type=1);
		(camp===void 0)&& (camp=1);
		var item=BallManager.ins.getBall(type);
		item.pos(x,y);
		item.camp=camp;
		this.ballList.push(item);
		this._layerBall.addChild(item);
		return item;
	}

	__proto.onResize=function(){
		this.width=/*no*/this.Laya.stage.width;
		this.height=/*no*/this.Laya.stage.height;
	}

	__proto.onFrame=function(){
		this.totalSpeed=0;
		for (var i=0;i < this.ballList.length;i++){
			var ball=this.ballList [i];
			var hitBlock=false;
			for (var j=0;j < this.blockList.length;j++){
				var block=this.blockList [j];
				var findLine=false;
				var shortestApeakData;
				if (this.hitTestBlock(ball,block)){
					for (var k=0;k < block.lines.length;k++){
						var apeak=this.getApeakData(ball.x,ball.y,block,block.lines [k]);
						if (apeak[0] < ball.radius){
							var clipAngle=Math.abs(ball.ballRotation-apeak[1])% 360;
							if (clipAngle > 180){
								clipAngle=Math.abs(360-clipAngle);
							}
							if (clipAngle < 90){
								if (!findLine){
									shortestApeakData=apeak;
									findLine=true;
								}
								if (apeak[0] <=shortestApeakData[0]){
									shortestApeakData=apeak;
								}
							}
						}
					}
					if (findLine){
						var range=Math.min(ball.speed,5);
						ShockUtil.play(this,200,range,100);
						laya.media.SoundManager.playSound("sound/hit_wall_1.mp3");
						laya.media.SoundManager.setSoundVolume(range / 5,"sound/hit_wall_1.mp3");
						var rotationAdd=shortestApeakData[1]-ball.ballRotation;
						ball.ballRotation=ball.ballRotation-180+rotationAdd *2;
						while (ball.ballRotation <-180){
							ball.ballRotation+=360;
						}
						while (ball.ballRotation > 180){
							ball.ballRotation-=360;
						}
						hitBlock=true;
					}
				}
			};
			var hitBall=false;
			for (j=0;j < this.ballList.length;j++){
				var ball2=this.ballList [j];
				if (ball2 !=ball){
					if (this.hitTestBall(ball,ball2)){
						var hitAngle=parseInt(Math.atan2(ball2.y-ball.y,ball2.x-ball.x)*180 / Math.PI+"");
						var angleHit1=(ball.ballRotation-hitAngle)% 360;
						var angleHit2=(ball2.ballRotation-hitAngle)% 360;
						var speedHit1=ball.speed *Math.cos(angleHit1 / 180 *Math.PI);
						var speedHit2=ball2.speed *Math.cos(angleHit2 / 180 *Math.PI);
						if (speedHit2 < speedHit1){
							hitBall=true;
							ShockUtil.play(this,200,1,100);
							var soundUrl="sound/hit_iron.mp3";
							laya.media.SoundManager.playSound(soundUrl,1);
							var volume=Math.abs(speedHit1-speedHit2)/ 5;
							laya.media.SoundManager.setSoundVolume(Math.min(volume,1),soundUrl);
							var angleHitSpit1=hitAngle+180;
							var angleHitSpit2=hitAngle;
							var speedHitSpit1=(Math.abs(speedHit1)+Math.abs(speedHit2))/ 2;
							var speedHitSpit2=(Math.abs(speedHit1)+Math.abs(speedHit2))/ 2;
							while (angleHit1 < 0){
								angleHit1+=360;
							}
							while (angleHit1 > 360){
								angleHit1-=360;
							};
							var angleSide1=hitAngle+((0 < angleHit1 && angleHit1 < 180)? 90 :-90);
							while (angleHit2 < 0){
								angleHit2+=360;
							}
							while (angleHit2 > 360){
								angleHit2-=360;
							};
							var angleSide2=hitAngle+((0 < angleHit2 && angleHit2 < 180)? 90 :-90);
							var speedSide1=ball.speed *Math.abs(angleHit1 % 180==0 ? Math.round(Math.sin(angleHit1 / 180 *Math.PI)):Math.sin(angleHit1 / 180 *Math.PI));
							var speedSide2=ball2.speed *Math.abs(angleHit1 % 180==0 ? Math.round(Math.sin(angleHit2 / 180 *Math.PI)):Math.sin(angleHit2 / 180 *Math.PI));
							var result=[];
							result=this.getSpeedCombine([[speedHitSpit1,angleHitSpit1],[speedSide1,angleSide1]]);
							ball.speed=result[0];
							ball.ballRotation=result[1];
							result=this.getSpeedCombine([[speedHitSpit2,angleHitSpit2],[speedSide2,angleSide2]]);
							ball2.speed=result[0];
							ball2.ballRotation=result[1];
						}
					}
				}
			}
			if (!hitBlock && !hitBall && ball.speed !=0){
				ball.speed=ball.speed *(ball.speedCost+(1-ball.speedCost)*(1-this.timeScale));
				var xDis=Math.cos(ball.ballRotation / 180 *Math.PI)*ball.speed *this.timeScale;
				var yDis=Math.sin(ball.ballRotation / 180 *Math.PI)*ball.speed *this.timeScale;
				ball.x+=xDis;
				ball.y+=yDis;
			}
			this.totalSpeed+=ball.speed;
		}
	}

	/**
	*获取垂线数据
	*@param x
	*@param y
	*@param block 线数组，包含2个端点Point
	*@param line block内部的某条线，包含2个端点Point
	*@return [垂线长度，角度]
	*/
	__proto.getApeakData=function(x,y,block,line){
		var point1=line[0];
		var point2=line[1];
		var disX=point2.x-point1.x;
		var disY=point2.y-point1.y;
		if (disY==0){
			return [Math.abs(y-block.y-point1.y),y > (block.y+point1.y)?-90 :90];
		}
		if (disX==0){
			return [Math.abs(x-block.x-point1.x),x > (block.x+point1.x)? 180 :0];
		};
		var angle1=Math.atan(disY / disX)*180 / Math.PI;
		var param1=(block.y+point2.y)-(block.x+point2.x)*Math.tan(angle1 / 180 *Math.PI);
		var angle2=angle1-90;
		var param2=y-x *Math.tan(angle2 / 180 *Math.PI);
		var peakX=(param2-param1)/ (Math.tan(angle1 / 180 *Math.PI)-Math.tan(angle2 / 180 *Math.PI));
		var peakY=Math.tan(angle1 / 180 *Math.PI)*peakX+param1;
		var peakDis=Math.sqrt((peakX-x)*(peakX-x)+(peakY-y)*(peakY-y));
		var peakRotation=Math.atan2(peakY-y,peakX-x)*180 / Math.PI;
		return [peakDis,peakRotation];
	}

	/**
	*求和速度
	*@param speedList 分速度列表[[速度1，角度1],[速度2，角度2]...]
	*@return [合速度，角度]
	*
	*/
	__proto.getSpeedCombine=function(speedList){
		var speedX=0;
		var speedY=0;
		for (var i=0;i < speedList.length;i++){
			speedX+=speedList[i][0] *Math.cos(speedList[i][1] / 180 *Math.PI);
			speedY+=speedList[i][0] *Math.sin(speedList[i][1] / 180 *Math.PI);
		};
		var speedCombine=Math.sqrt(speedX *speedX+speedY *speedY);
		var angleCombine=Math.atan2(speedY,speedX)*180 / Math.PI;
		return [speedCombine,angleCombine];
	}

	/**碰撞检测(球对障碍)-只检测障碍边界范围*/
	__proto.hitTestBlock=function(item,block){
		var radius=item.radius;
		var finalX=item.x;
		var finalY=item.y;
		if ((block.x+block.pLeft-radius)< finalX && finalX < (block.x+block.pRight+radius)){
			if ((block.y+block.pUp-radius)< finalY && finalY < (block.y+block.pDown+radius)){
				return true;
			}
		}
		return false;
	}

	/**碰撞检测(球对球)-根据球心距离和半径和来检测*/
	__proto.hitTestBall=function(item,item2){
		var disX=item2.x-item.x;
		var disY=item2.y-item.y;
		var dis=Math.sqrt(disX *disX+disY *disY);
		return dis < (item.radius+item2.radius);
	}

	__proto.onKeyDown=function(){
		var outStr="[";
		for (var i=0;i < this.blockList.length;i++){
			var item=this.blockList[i];
			outStr+="["+item.x+","+item.y+","+item.data.slice(0,item.data.length-2)+"]"+(i==this.blockList.length-1 ? "" :",");
		}
		outStr+="]";
		console.log(outStr);
	}

	__getset(0,__proto,'timeScale',function(){
		return Params.ins.timeScale;
	});

	return BaseScene;
})(laya.display.Sprite)


/**
*有点多余的类，球基类ai，应该没什么用
*@author Administrator
*
*/
//class main.base.action.BaseBallAction extends main.base.action.BaseAction
var BaseBallAction=(function(_super){
	function BaseBallAction(){
		BaseBallAction.__super.call(this);
	}

	__class(BaseBallAction,'main.base.action.BaseBallAction',_super);
	return BaseBallAction;
})(BaseAction)


/**
*基本小怪AI
*@author dingzhichao
*
*/
//class main.base.EnemyBallAiManager extends main.base.BaseAIManager
var EnemyBallAiManager=(function(_super){
	function EnemyBallAiManager(){
		this.moveAction=null;
		EnemyBallAiManager.__super.call(this);
		this.moveAction=laya.utils.Pool.getItemByClass("base.ai.action.BaseEnemyMoveAction",BaseEnemyMoveAction);
		this.addAction(this.moveAction);
	}

	__class(EnemyBallAiManager,'main.base.EnemyBallAiManager',_super);
	var __proto=EnemyBallAiManager.prototype;
	__proto.loop=function(){}
	return EnemyBallAiManager;
})(BaseAIManager)


/**
*球基类
*@author Administrator
*
*/
//class main.module.ball.BaseBall extends main.ui.BallItemUI
var BaseBall=(function(_super){
	function BaseBall(){
		this._type=0;
		this._camp=0;
		this._speed=0;
		this._radius=0;
		this._ballRotation=NaN;
		this.hpBar=null;
		this._ai=null;
		this.ballImage=null;
		this._speedCost=0.99;
		BaseBall.__super.call(this);
		this.ballRotation=0;
		this.boxBall.cacheAsBitmap=true;
	}

	__class(BaseBall,'main.module.ball.BaseBall',_super);
	var __proto=BaseBall.prototype;
	__proto.showHpBar=function(){this.hpBar=this.hpBar|| new HpBarView();
		/*no*/this.addChild(this.hpBar);
	}

	/**速度被设置后调度*/
	__proto.speedSetHandler=function(){}
	__proto.addSpeed=function(rotation,addSpeed){
		var speedTotalX=addSpeed *Math.cos(rotation / 180 *Math.PI)+this.speed *Math.cos(this.ballRotation / 180 *Math.PI);
		var speedTotalY=addSpeed *Math.sin(rotation / 180 *Math.PI)+this.speed *Math.sin(this.ballRotation / 180 *Math.PI);
		this.speed=Math.sqrt(speedTotalX *speedTotalX+speedTotalY *speedTotalY);
		this.ballRotation=Math.atan2(speedTotalY,speedTotalX)*180 / Math.PI;
	}

	/**设置ai*/
	__proto.setAi=function(value){
		this._ai=value;
	}

	/**设置ai是否启动*/
	__proto.setAiActive=function(boo){
		this._ai && this._ai.setActive(boo);
	}

	__getset(0,__proto,'ballRotation',function(){
		return this._ballRotation;
		},function(value){
		this._ballRotation=value;
	});

	__getset(0,__proto,'speedCost',function(){
		return this._speedCost;
		},function(value){
		this._speedCost=value;
	});

	__getset(0,__proto,'type',function(){
		return this._type;
		},function(value){
		this._type=value;this.ballImage=this.ballImage|| new laya.ui.Image();
		this.boxBall.addChild(this.ballImage);
		switch (this._type){
			case 0:
				this._radius=39;
				break ;
			case 1:
				this._radius=39;
				break ;
			case 2:
				this._radius=39;
				break ;
			}
		this.ballImage.skin="ball/ball_"+this._type+".png";
		this._radius=this.ballImage.width / 2;
		this.ballImage.x=-this.radius;
		this.ballImage.y=-this.radius;
		this.speedSetHandler();
	});

	/**球碰撞半径*/
	__getset(0,__proto,'radius',function(){
		return this._radius;
	});

	__getset(0,__proto,'camp',function(){
		return this._camp;
		},function(value){
		this._camp=value;
	});

	__getset(0,__proto,'speed',function(){
		return this._speed;
		},function(value){
		if (value < 0.1){
			value=0;
		}
		this._speed=Math.min(this.radius,value);
		this._speed=value;
		this.speedSetHandler();
	});

	return BaseBall;
})(BallItemUI)


//class main.module.item.HpBarView extends main.ui.HpBarViewUI
var HpBarView=(function(_super){
	function HpBarView(){
		HpBarView.__super.call(this);
	}

	__class(HpBarView,'main.module.item.HpBarView',_super);
	return HpBarView;
})(HpBarViewUI)


//class main.module.scene.GameScene extends main.module.scene.BaseScene
var GameScene=(function(_super){
	function GameScene(){
		this.txtSpeed=null;
		GameScene.__super.call(this);
	}

	__class(GameScene,'main.module.scene.GameScene',_super);
	var __proto=GameScene.prototype;
	__proto.init=function(){
		_super.prototype.init.call(this);
		laya.media.SoundManager.setMusicVolume(0.5);
	}

	__proto.onFrame=function(){
		_super.prototype.onFrame.call(this);
	}

	return GameScene;
})(BaseScene)


/**
*基本小怪-移动action
*@author dingzhichao
*
*/
//class main.base.action.BaseEnemyMoveAction extends main.base.action.BaseBallAction
var BaseEnemyMoveAction=(function(_super){
	function BaseEnemyMoveAction(){
		BaseEnemyMoveAction.__super.call(this);
	}

	__class(BaseEnemyMoveAction,'main.base.action.BaseEnemyMoveAction',_super);
	var __proto=BaseEnemyMoveAction.prototype;
	__proto.action=function(){
		return false;
	}

	return BaseEnemyMoveAction;
})(BaseBallAction)


//class main.module.ball.HitBall extends main.module.ball.BaseBall
var HitBall=(function(_super){
	function HitBall(){
		this.phantom=null;
		this.renderTarget=null;
		this.wing_left=null;
		this.wing_right=null;
		this.wing_center=null;
		this.donwPos=null;
		this.downImgPos=null;
		/**拖动最大距离*/
		this.pull_max_dis=200;
		/**拖动最大单侧张角弧度*/
		this.pull_max_angel=30;
		HitBall.__super.call(this);
		this.boxBottom.alpha=0.9;
		this._speedCost=0.993;
	}

	__class(HitBall,'main.module.ball.HitBall',_super);
	var __proto=HitBall.prototype;
	__proto.speedSetHandler=function(){
		var hitarea=new laya.utils.HitArea();
		hitarea.hit=this.boxBottom.graphics;
		this.hitArea=hitarea;
		if (this.speed==0){
			this.showHitAble();
			}else {
			this.boxBottom.graphics.clear();
		}
	}

	__proto.showHitAble=function(){
		this.boxBottom.alpha=1;
		this.boxBottom.scale(0.1,0.1);
		this.boxBottom.graphics.clear();
		this.boxBottom.graphics.drawCircle(0,0,this.radius+15,"#ffff00");
		laya.utils.Tween.to(this.boxBottom,{scaleX:1.5,scaleY:1.5,alpha:0},1000,null,laya.utils.Handler.create(this,this.showComp));
	}

	__proto.showComp=function(){
		this.boxBottom.scale(1,1);
		this.on(laya.events.Event.MOUSE_DOWN,this,this.onDown);
	}

	__proto.onDown=function(){
		this.off(laya.events.Event.MOUSE_DOWN,this,this.onDown);
		this.donwPos=new laya.maths.Point(/*no*/this.mouseX,/*no*/this.mouseY);
		this.downImgPos=new laya.maths.Point(this.boxBall.x,this.boxBall.y);
		laya.utils.Tween.to(this.boxBottom,{scaleX:0.1,scaleY:0.1},1000);
		laya.media.SoundManager.playSound("sound/hit_hold.mp3",1);
		/*no*/this.stage.on(laya.events.Event.MOUSE_MOVE,this,this.onMove);
		/*no*/this.stage.on(laya.events.Event.MOUSE_UP,this,this.onUp);
		/*no*/this.stage.on(laya.events.Event.MOUSE_OUT,this,this.onUp);
		var stLayer=this.ballImage;
		this.renderTarget=laya.webgl.resource.RenderTarget2D.create(Math.floor(this.radius *2),Math.floor(this.radius *2),laya.webgl.WebGLContext.RGBA,laya.webgl.WebGLContext.UNSIGNED_BYTE,0,false);
		this.renderTarget.start();
		this.renderTarget.clear(0,0,0,0);
		laya.renders.Render.context.clear();
		this.renderTarget.sourceWidth=this.renderTarget.width;
		this.renderTarget.sourceHeight=this.renderTarget.height;
		laya.renders.RenderSprite.renders[stLayer._renderType]._fun(stLayer,laya.renders.Render.context,0,laya.webgl.utils.RenderState2D.height-Math.floor(stLayer.height));
		laya.renders.RenderSprite.renders[stLayer._renderType]._fun(stLayer,laya.renders.Render.context,0,laya.webgl.utils.RenderState2D.height-Math.floor(stLayer.height));
		laya.renders.Render.context.flush();
		this.renderTarget.end();
		this.renderTarget.sourceWidth=this.renderTarget.width;
		this.renderTarget.sourceHeight=this.renderTarget.height;this.phantom=this.phantom|| new laya.ui.Box();
		this.phantom.alpha=0;
		this.phantom.graphics.clear();
		this.phantom.graphics.drawTexture(this.renderTarget,0,0,this.renderTarget.width,this.renderTarget.height);
		this.phantom.x=this.boxBall.x-this.radius;
		this.phantom.y=this.boxBall.y-this.radius;
	}

	__proto.onMove=function(e){
		var posX=(/*no*/this.mouseX-this.donwPos.x);
		var posY=(/*no*/this.mouseY-this.donwPos.y);
		var pullDis=Math.sqrt(posX *posX+posY *posY);
		var pullRadian=Math.atan2(posY,posX);
		var phantomDis=pullDis *2 / 3;
		if (phantomDis < this.pull_max_dis){
			this.phantom.alpha=phantomDis *5 / this.pull_max_dis;
			this.phantom.x=this.downImgPos.x+phantomDis *Math.cos(pullRadian)-this.radius;
			this.phantom.y=this.downImgPos.y+phantomDis *Math.sin(pullRadian)-this.radius;
			}else {
			this.phantom.alpha=1;
			var targetX=Math.cos(pullRadian)*this.pull_max_dis;
			var targetY=Math.sin(pullRadian)*this.pull_max_dis;
			this.phantom.x=this.downImgPos.x+targetX-this.radius;
			this.phantom.y=this.downImgPos.y+targetY-this.radius;
		};
		var ballAlpha=NaN;
		if (pullDis < this.radius *2){
			ballAlpha=1;
			}else {
			ballAlpha=Math.max(-0.7 / this.radius *pullDis+2.4,0.3);
		}
		this.boxBall.alpha=ballAlpha;
		this.updateWing();
	}

	__proto.updateWing=function(){
		var disX=this.phantom.x-this.ballImage.x;
		var disY=this.phantom.y-this.ballImage.y;
		var phantomDis=Math.sqrt(disX *disX+disY *disY);
		var phantomRadian=Math.atan2(disY,disX);
		var wingRotation=phantomDis / this.pull_max_dis *this.pull_max_angel;
		wingRotation=Math.min(wingRotation,this.pull_max_angel);
		var leftAngle=phantomRadian+wingRotation / 180 *Math.PI;this.wing_left=this.wing_left|| new laya.ui.Image();
		this.wing_left.skin="comp/pull_bar.png";
		this.wing_left.pivotY=this.wing_left.height;
		this.wing_left.x=this.phantom.x+this.radius+Math.cos(leftAngle)*(this.radius-2);
		this.wing_left.y=this.phantom.y+this.radius+Math.sin(leftAngle)*(this.radius-2);
		this.wing_left.rotation=leftAngle *180 / Math.PI+90;
		this.boxPhantom.addChild(this.wing_left);
		var rightAngle=phantomRadian-wingRotation / 180 *Math.PI;this.wing_right=this.wing_right|| new laya.ui.Image();
		this.wing_right.skin="comp/pull_bar.png";
		this.wing_right.x=this.phantom.x+this.radius+Math.cos(rightAngle)*(this.radius-2);
		this.wing_right.y=this.phantom.y+this.radius+Math.sin(rightAngle)*(this.radius-2);
		this.wing_right.rotation=rightAngle *180 / Math.PI-90;
		this.boxPhantom.addChild(this.wing_right);
		var pullRotation=phantomRadian *180 / Math.PI;this.wing_center=this.wing_center|| new laya.ui.Image();
		this.wing_center.graphics.clear();
		this.wing_center.graphics.drawPie(this.phantom.x+this.radius,this.phantom.y+this.radius,this.radius+this.wing_left.height-2,pullRotation-wingRotation,pullRotation+wingRotation,"#d1aa26");
		this.boxPhantom.addChild(this.wing_center);
		this.boxPhantom.addChild(this.phantom);
		this.wing_center.alpha=this.wing_left.alpha=this.wing_right.alpha=(phantomDis-this.pull_max_dis / 5)/ this.pull_max_dis;
	}

	__proto.onUp=function(e){
		if (this.phantom){
			if (this.phantom.parent){
				this.phantom.removeSelf();
			}
			this.phantom=null;
		}
		if (this.renderTarget){
			this.renderTarget.destroy(true);
			this.renderTarget=null;
		}
		/*no*/this.stage.off(laya.events.Event.MOUSE_MOVE,this,this.onMove);
		/*no*/this.stage.off(laya.events.Event.MOUSE_OUT,this,this.onUp);
		/*no*/this.stage.off(laya.events.Event.MOUSE_UP,this,this.onUp);
		laya.media.SoundManager.playSound("sound/hit_ball.mp3",1);
		this.speed=0;
	}

	return HitBall;
})(BaseBall)



	/**LayaGameStart**/
	new Main();

})(window,document,Laya);


/*
1 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/base/BaseAIManager.as (34):warning:Laya.timer.loop This variable is not defined.
2 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/base/BaseAIManager.as (36):warning:Laya.timer.clear This variable is not defined.
3 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/SceneControl.as (23):warning:Laya.stage.addChild This variable is not defined.
4 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/SceneControl.as (24):warning:Laya.stage.on This variable is not defined.
5 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/SceneControl.as (25):warning:Laya.timer.once This variable is not defined.
6 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/SceneControl.as (32):warning:Laya.stage.on This variable is not defined.
7 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/SceneControl.as (39):warning:Laya.stage.off This variable is not defined.
8 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/utils/ShockUtil.as (30):warning:Laya.timer.loop This variable is not defined.
9 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/utils/ShockUtil.as (58):warning:Laya.timer.clearAll This variable is not defined.
10 file:///E:/DingWorks/DingProj/ViolenceTable/src/Main.as (18):warning:Laya.Config.isAntialias This variable is not defined.
11 file:///E:/DingWorks/DingProj/ViolenceTable/src/Main.as (20):warning:Laya.init This variable is not defined.
12 file:///E:/DingWorks/DingProj/ViolenceTable/src/Main.as (21):warning:Laya.stage.scaleMode This variable is not defined.
13 file:///E:/DingWorks/DingProj/ViolenceTable/src/Main.as (31):warning:Laya.loader.load This variable is not defined.
14 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/ui/BallItemUI.as (5):warning:main.ui.BallItemUI extends View,This class  is not defined;
15 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/ui/BallItemUI.as (13):warning:createView This variable is not defined.
16 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/item/BlockItem.as (6):warning:main.module.item.BlockItem extends laya.ui.View,This class  is not defined;
17 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/item/BlockItem.as (60):warning:Laya.stage.on This variable is not defined.
18 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/item/BlockItem.as (66):warning:Laya.stage.off This variable is not defined.
19 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/ui/HpBarViewUI.as (5):warning:main.ui.HpBarViewUI extends View,This class  is not defined;
20 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/ui/HpBarViewUI.as (11):warning:createView This variable is not defined.
21 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (20):warning:main.module.scene.BaseScene extends laya.display.Sprite,This class  is not defined;
22 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (48):warning:Laya.timer.frameLoop This variable is not defined.
23 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (49):warning:Laya.stage.on This variable is not defined.
24 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (50):warning:Laya.stage.on This variable is not defined.
25 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (57):warning:addChild This variable is not defined.
26 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (59):warning:addChild This variable is not defined.
27 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (61):warning:addChild This variable is not defined.
28 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (110):warning:Laya.stage.width This variable is not defined.
29 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/scene/BaseScene.as (111):warning:Laya.stage.height This variable is not defined.
30 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/BaseBall.as (37):warning:addChild This variable is not defined.
31 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (59):warning:mouseX This variable is not defined.
32 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (59):warning:mouseY This variable is not defined.
33 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (65):warning:stage.on This variable is not defined.
34 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (66):warning:stage.on This variable is not defined.
35 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (67):warning:stage.on This variable is not defined.
36 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (99):warning:mouseX This variable is not defined.
37 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (100):warning:mouseY This variable is not defined.
38 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (178):warning:stage.off This variable is not defined.
39 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (179):warning:stage.off This variable is not defined.
40 file:///E:/DingWorks/DingProj/ViolenceTable/src/main/module/ball/HitBall.as (180):warning:stage.off This variable is not defined.
*/
if (typeof define === 'function' && define.amd){
	define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
			var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}