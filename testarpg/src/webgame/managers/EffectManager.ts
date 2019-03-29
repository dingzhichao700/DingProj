module egret{
    export class EffectManager{
        
        private static _instance: EffectManager = null;

        public static getInstance(): EffectManager {
            return EffectManager._instance || (EffectManager._instance = new EffectManager());
        }
        
        public constructor(){
        }

        /**
         * 播放非场景特效
         * @param name 特效名称
         * @param x 特效播放x
         * @param y 特效播放y
         * @param fun 回调函数
         * @param target 回调函数对象
         * @param frameIndex 回调函数调用帧索引
         * @param args 回调函数参数
         * @returns {ElementEffect}
         */
        public playEff(name:string,x:number,y:number,fun:Function = null,target:Object = null,frameIndex:number = -1,...args):ElementEffect{
            var container:DisplayObjectContainer = ApplicationManager.getInstance().getApplicationLayer(ApplicationLayerType.EFFECT);

            var effect:ElementEffect = <ElementEffect>SceneElementManager.getInstance().getElement(ElementEffect);
            effect.setMovieName(name);
            effect.x = x;
            effect.y = y;
            effect.addToScene();
            container.addChild(effect);

            if(fun){
                effect.setHitHandler.apply(effect,[fun,target,frameIndex].concat(args));
            }

            return effect;
        }
    }
}