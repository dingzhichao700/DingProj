
module egret {
    export class DamageItem extends egret.gui.UIComponent{
        
        private imgState:egret.gui.UIAsset;
        private boxCon:egret.gui.Group;
        
        public constructor() {
            super();
        }
        
        public setData(text:string, color:number):void {
            if(!this.imgState){
                this.imgState = new egret.gui.UIAsset();
                this.addChild(this.imgState);
            }
            if(!this.boxCon) {
                this.boxCon = new egret.gui.Group();
                this.addChild(this.boxCon);
            }

            this.boxCon.removeAllElements();
            if(text.indexOf("闪避") >= 0) {
                this.imgState.visible = true;
                this.imgState.source = "resource/main/dodge.png";
            } else if(text.indexOf("暴") >= 0) {
                this.imgState.visible = true;
                this.imgState.source = "resource/main/critical.png";
                var startX:number = 32;

                this.getImage("mark_minus",this.boxCon,startX ,0);
                
                var text:string = text.slice(2);
                for(var i: number = 0;i < text.length;i++){
                    this.getImage("damage_" + text[i], this.boxCon, startX+19*(i+1), 0);
                }
            } else {
                this.imgState.visible = false;
                var startX: number = 0;
                
                this.getImage("mark_minus",this.boxCon,startX,0);

                var text: string = text.slice(1);
                for(var i: number = 0;i < text.length;i++) {
                    this.getImage("damage_" + text[i],this.boxCon,startX + 19 * (i + 1),0);
                }
            }
        }
        
        private getImage(url:string, con:egret.gui.Group, _x:number=0, _y:number=0):egret.gui.UIAsset {
            var img:egret.gui.UIAsset = new egret.gui.UIAsset();
            img.source = "resource/main/" + url + ".png";
            img.x = _x;
            img.y = _y;
            con.addElement(img);
            return img;
        }
        
    }
}
