
module egret{
    export class AnimeClip extends egret.gui.UIComponent {
    
        private anime:egret.MovieClip;
            
	    public constructor() {
            super();
	    }
        
	    public loadUrl(url:string, loop:Boolean = false):void {
            var config = RES.getRes(url + "_json");
            var texture = RES.getRes(url + "_png");
            var clipFactory = new egret.MovieClipDataFactory(config, texture);
            this.anime = new egret.MovieClip(clipFactory.generateMovieClipData(url));
            this.addChild(this.anime);
            if(loop == true){
                this.anime.addEventListener(egret.Event.COMPLETE, this.onLoop,this);
            }
            this.anime.gotoAndPlay(1);
	    }
	    
        private onLoop(e: egret.Event):void {
            this.anime.gotoAndPlay(1);
	    }
    }
}
