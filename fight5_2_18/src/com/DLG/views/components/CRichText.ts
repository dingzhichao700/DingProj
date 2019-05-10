module DLG {
	/**
	 *
	 * @author
	 *
	 */
    enum IRichElement { text, image };
    
    

    export class CRichText extends CGroup {
        private label: CRichLabel = null;
        private m_pWidth: number;
        private m_pHeight: number;
        private m_pIsCenter: boolean = false;
        private m_pX: number = 0;
        private m_pY: number = 0;
        private m_pOldText: string = "";

        public constructor() {
            super();
            
        }
        protected createChildren(): void {
            super.createChildren();
            let self = this;
			let label: CLabel = <CLabel>self.getChildAt(0);

            self.horizontalCenter = label.horizontalCenter;
            self.verticalCenter = label.verticalCenter;

            self.top = label.top;
            self.bottom = label.bottom;
            self.left = label.left;
            self.right = label.right;

            self.label = new CRichLabel(label.width);
            self.setStyle(label);
            self.addChild(self.label);

            
            if(label.parent)
            {
                label.onDestroy();
                label.parent.removeChild(label);
                label = null;
            }

		}

        public onDestroy(): void {
            let self = this;
            if(self.label){
                self.label.onDestroy();
                self.label = null;
            }
            self.m_pOldText = null;

            super.onDestroy();
        }

        public setStyle(lblStyle: CLabel): void {
            let self = this;
            self.m_pWidth = lblStyle.width;
            self.m_pHeight = lblStyle.height;
            self.m_pX = lblStyle.x;
            self.m_pY = lblStyle.y;

            self.label.setStyle(lblStyle);
            self.setPosition(lblStyle.x, lblStyle.y);
            self.label.setText(lblStyle.text);
        }

        public getLabel() {
            let self = this;
            return self.label;
        }

        public set textAlign(center: boolean) {
            let self = this;
            self.m_pIsCenter = center;
            self.setPosition(self.m_pX, self.m_pY);
        }

        public set subText(text: string) {
            let self = this;
            if(self.label) 
            {
                self.label.isSubStr = true;
                self.text = text;
            }
            
        }

        public get lineNum(): number{
            let self = this;
             if(self.label) return self.label.lineNum;
             else return 0;
        }

        public set text(text: string) {
            let self = this;
            text = Utils.parseLanRich(text);
            text = Utils.parseClickRich(text);
            if (self.m_pOldText != text) {
                self.label.setText(text);

                self.width = self.label.textWidth;
                self.height = self.label.textHeight;

                self.setPosition(self.m_pX, self.m_pY);
                self.m_pOldText = text;
            }
        }

        public set imageScale(scale) {
            let self = this;
            self.label.imageScale = scale;
        }

        public set imgOffsetX(x) {
            let self = this;
            self.label.imgOffsetX = x;
        }

        public set imgOffsetY(y) {
            let self = this;
            self.label.imgOffsetY = y;
        }

        public get textWidth(): number {
            let self = this;
            if(self.label == null) return 0;
            return self.label.textWidth;
        }

        public get textHeight(): number {
            let self = this;
            if(self.label == null) return 0;
            return self.label.textHeight;
        }

        public set textColor(color) {
            let self = this;
            self.label.textColor = color;
        }

        public setWidth(width: number): void {
            let self = this;
            self.m_pWidth = width;
        }

        public setPosition(x: number, y: number): void {
            let self = this;
            if (self.m_pIsCenter) {
                let centerX: number = x + self.m_pWidth / 2;
                let centerY: number = y + self.m_pHeight / 2;
                self.x = centerX - self.label.textWidth / 2;
                self.y = centerY - self.label.height / 2;
            } else {
                self.x = x;
                self.y = y;
            }
        }

        //限制文字行数 超过不显示 可能导致subText有问题
        public limitHeight(numLine) {
            let self = this;
            self.label.limitLines = numLine;
        }
    }
    export class CRichTextEvent extends egret.Event {
        public static Link: string = "link";
        public text: string = "";
        public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false, text?: string) {
            super(type, bubbles, cancelable);
            let self = this;
            self.text = text;
        }
    }

    export class CRichLabel extends egret.DisplayObjectContainer {
        private m_pTextParser: CRichLabelTextParser = new CRichLabelTextParser();
        private m_pLineLabel: CLabel = new CLabel();
        private m_pLabels: any[] = [];
        private m_pLabelEvents: any[] = [];
        private m_pLine: number = 0;
        private m_pImages: any = {};
        public lineWidth: number = 300;
        private m_pWidth: number = 0;
        private callFunc :any = null;
        public lineSpacing: number = 0;
        public size: number = 0;
        public textColor: number;
        public bold: boolean;
        public stroke: number;
        public strokeColor: number = 0;
        public textWidth: number = 0;
        public textHeight: number = 0;
        public fontFamily: string = '';
        public isSubStr: boolean = false;
        public isSubEnd: boolean = false;
        public limitLines: number = 0;
        public imageScale:number = 1;
        public imgOffsetX:number = 0;
        public imgOffsetY:number = 0;

        public constructor(defaultWidth?: number) {
            super();
            let self = this;
            if (defaultWidth) {
                self.lineWidth = defaultWidth
            }
        }

        public get lineNum() {
            let self = this;
            return self.numChildren;
        }
        public setCompleteFunc(callFunc) {
            let self = this;
            self.callFunc = callFunc;
        }

        private genSpaceStr(spaceWidth: number): any[] {
            let spaceStr: string = '';
            let self = this;
            while (spaceWidth > 0) {
                spaceStr += ' ';
                
                spaceWidth -= self.size < 10 ? 4 : self.size / 3.3333;//空格的宽度
            }
            return [spaceStr, spaceWidth];
        }

        private showElement(textArr: egret.ITextElement[]): void{
            let self = this;
            // sayError("textArr",textArr);

            let elements: egret.ITextElement[] = [];
            let arrLen = textArr.length;
            for (let i: number = 0; i < arrLen; i++) {
                let el: egret.ITextElement = textArr[i];
                if (el.text == '') continue;
                if (el['type'] == IRichElement.image) {
                    let bitmap: egret.Bitmap = new egret.Bitmap(RES.getRes(el.text));
                        bitmap.width = bitmap.width * self.imageScale;
                        bitmap.height = bitmap.height * self.imageScale;

                    let spaces: any[] = self.genSpaceStr(bitmap.width + self.imgOffsetX);
                    el['bitmap'] = bitmap;
                    el['offsetX'] = spaces[1];
                    el.text = spaces[0];
                    elements.push(el);
                }

                self.appendElement(el, arrLen - 1 == i);
                if (self.isSubStr && self.isSubEnd) {
                    return;
                }
            }
        }

        private createLineLabel(element: egret.ITextElement, newText: string): void {
            let self = this;
            let newEl: any = {};
            if (element.style) {
                newEl = { 'text': newText, 'style': element.style };
            } else {
                newEl = { 'text': newText };
            }

            if (!self.m_pLabels[self.m_pLine]) {
                self.m_pLabels[self.m_pLine] = [];
            }
            self.m_pLabels[self.m_pLine].push(newEl);
        }

        private createLineImage(element: egret.ITextElement, line: number, offsetX): void {
            let self = this;
            if (!self.m_pImages[line]) {
                self.m_pImages[line] = { lineHeight: 0, list: [] };
            }
            element['x'] = offsetX;
            element['line'] = line;
            self.m_pImages[line]['list'].push(element);
            if (self.m_pImages[line]['lineHeight'] < element['bitmap']['height']) {
                self.m_pImages[line]['lineHeight'] = element['bitmap']['height'];
            }
        }

        private appendElement(element: egret.ITextElement, isEnd?): void {
            let self = this;
            let startIndex: number = 0;
            let labelText: string = self.m_pLineLabel.text;
            let lineLabelWidth: number = self.m_pLineLabel.width;
            let bitmapWidth: number = element['bitmap'] ? element['bitmap']['width'] : 0;
            let text: string = element.text;
            let sub_text: string;

            let textArr: string[] = text.split('\n');
            let textArrlen: number = textArr.length;

            for (let idx: number = 0; idx < textArrlen; idx++) {
                text = textArr[idx];
                for (let i: number = 0; i <= text.length; i++) {
                    sub_text = text.substring(startIndex, i);

                    self.m_pLineLabel.text = labelText + sub_text;
                    let line_width =  self.m_pLineLabel.textWidth;
                    if (self.isSubStr && self.limitLines > 0 && element['type'] == IRichElement.image){
                        line_width += 10;
                    }

                    if ( line_width >= (self.lineWidth -10)) {
                        if (self.m_pLineLabel.width > self.lineWidth) {
                            sub_text = text.substring(startIndex, i - 1);
                            startIndex = i - 1;
                        } else {
                            startIndex = i;
                        }

                        if (self.isSubStr) {
                            if (self.limitLines > 0){
                                if (self.m_pLine == self.limitLines -1){
                                    sub_text = element['type'] == IRichElement.text ? sub_text + '...' : '...';
                                    self.isSubEnd = true;
                                }
                            }else{
                                if (element['type'] == IRichElement.text){
                                    sub_text += '...';
                                    self.isSubEnd = true;
                                }
                            }
                        }

                        self.createLineLabel(element, sub_text);
                        self.m_pLine += 1;

                        labelText = '';
                        self.m_pLineLabel.text = '';

                        if (element['type'] == IRichElement.image) {
                            if (self.m_pLineLabel.width - lineLabelWidth > bitmapWidth / 1.5) {
                                self.createLineImage(element, self.m_pLine - 1, lineLabelWidth + bitmapWidth);
                            } else {
                                if (self.isSubStr){
                                    return;
                                }
                                let spaces: any[] = self.genSpaceStr(bitmapWidth + self.imgOffsetX);
                                self.m_pLineLabel.text = element.text;
                                self.createLineImage(element, self.m_pLine, bitmapWidth);
                                self.createLineLabel(element, spaces[0]);
                            }
                            return;
                        }

                    }
                }
                if (textArrlen > 1 && idx < textArrlen - 1) {
                    self.createLineLabel(element, sub_text);
                    self.m_pLine += 1;
                    labelText = '';
                    self.m_pLineLabel.text = '';
                }
            }

            if (element['type'] == IRichElement.image) {
                self.createLineImage(element, self.m_pLine, self.m_pLineLabel.width);
            }
            sub_text = text.substring(startIndex);
            if (sub_text) {
                self.createLineLabel(element, sub_text);
            }
        }

        private _textFlow(text: string): void {
            let self = this;
            self.m_pImages = [];
            let textArr = self.m_pTextParser.parser(text);

            self.showElement(textArr);
            self.displayLables();
            egret.callLater(function () {
                self.displayImages();
                if(self.callFunc){
                    self.callFunc();
                }
            }, self);


        }

        private linkClick(evt: egret.TextEvent): void {
            let self = this;
            self.dispatchEvent(new CRichTextEvent(CRichTextEvent.Link, true, false, evt.text));
        }

        private isExistContent(line) {
            let self = this;
            let lineContent = self.m_pLabels[line];
            for(let key in lineContent){
                let text = lineContent[key].text;
                if(!text.match(/^[ ]+$/)){
                    return false;
                }
            }
            return true;
        }

        private displayLables(): void {
            let self = this;
            // sayError("self.m_pLabels",self.m_pLabels);
            let offsetY: number = 0;
            let length: number = self.m_pLabels.length;
            for (let line: number = 0; line < length; line++) {
                 if (self.limitLines && line >= self.limitLines) {
                     break;
                 }
                let label: CLabel = self.createLabel();
                let imageHeight: number = self.m_pImages[line] ? self.m_pImages[line]['lineHeight'] : self.size;
                let lineLabels: any[] = self.m_pLabels[line];
                if (!lineLabels) continue;
                for (let i: number = 0; i < lineLabels.length; i++) {
                    let element: any = lineLabels[i];

                    label.appendElement(element);

                    if (element.style && element.style.href) {
                        label.addEventListener(egret.TextEvent.LINK, self.linkClick, self);
                        self.m_pLabelEvents.push({ label: label, type: egret.TextEvent.LINK });
                    }
                }
                offsetY += self.imgOffsetY ? self.imgOffsetY : imageHeight > self.size ? (imageHeight - self.size) / 2 : 0;
                offsetY += self.imgOffsetY ? self.isExistContent(line) ? (self.lineSpacing/4*3): 0 : 0;
               //offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;
                label.y = line * (self.size + self.lineSpacing);
                self.addChild(label);
                if (self.textWidth < label.textWidth) self.textWidth = label.textWidth;
            }
            offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;
            self.textHeight = length * (self.size + self.lineSpacing) + offsetY - self.lineSpacing;
            //self.m_pLabels = [];
            //            console.log("displayLables:",self.m_pLabels,length,self.textHeight);
        }

        private displayImages(): void {
            let self = this;
            let offsetY: number = 0;
            let addHeight:number = 0;
            // sayError("self.m_pImages",self.m_pImages);
            for (let line in self.m_pImages) {
                if (self.limitLines && Number(line) >= self.limitLines) {
                    break;
                }
                let images: any[] = self.m_pImages[line]['list'];
                let imageHeight: number = self.m_pImages[line]['lineHeight'];

                offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;

                offsetY += self.imgOffsetY ? self.imgOffsetY : imageHeight > self.size ? (imageHeight - self.size) / 2 : 0;
                for (let i: number = 0; i < images.length; i++) {
                    let image: any = images[i];
                    let height: number = self.size;
                    let x: number = image.x;
                    let y: number = (height + self.lineSpacing) * image.line;
                    if (!self.getChildByName(image.bitmap.hashCode)) {
                        self.addChild(image.bitmap);
                        image.bitmap.name = image.bitmap.hashCode;
                    }
                    image.bitmap.x = x - image.bitmap.width;
                    image.bitmap.y = y + self.size - image.bitmap.height + offsetY;
                    //                    console.log("displayImages:",image.line,offsetY,y,image.bitmap.height,offsetY,image.bitmap.y);
                }
            }
            self.m_pImages = {};
            self.m_pLabels = [];
        }

        private createLabel(): CLabel {
            let self = this;
            let label: CLabel = new CLabel();
            label.textColor = self.textColor;
            label.size = self.size;
            label.bold = self.bold;
            label.stroke = self.stroke;
            label.strokeColor = self.strokeColor;
            label.fontFamily = self.fontFamily;

            return label;
        }

        private setLineLabelStyle(): void {
            let self = this;
            self.m_pLineLabel.size = self.size;
            self.m_pLineLabel.bold = self.bold;
            self.m_pLineLabel.stroke = self.stroke;
            self.m_pLineLabel.strokeColor = self.strokeColor;
            self.m_pLineLabel.fontFamily = self.fontFamily;
        }

        public setStyle(lblStyle: CLabel): void {
            let self = this;
            self.textColor = lblStyle.textColor;
            self.size = lblStyle.size;
            self.lineSpacing = lblStyle.lineSpacing;
            self.bold = lblStyle.bold;
            self.stroke = lblStyle.stroke;
            self.strokeColor = lblStyle.strokeColor;
            self.fontFamily = lblStyle.fontFamily;
        }

        public setText(text: string, width?: number): void {
            let self = this;
            self.setLineLabelStyle();
            self.textWidth = 0;
            self.textHeight = 0;
            self.isSubEnd = false;
            self.m_pLabels = [];
            self.removeLabelEvent();
            self.m_pLineLabel.text = "";
            self.removeChildren();
            self.m_pLine = 0;
            self.m_pImages = {};
            self._textFlow(text);
            self.width = width ? width : self.lineWidth;
        }

        private removeLabelEvent(): void {
            let self = this;
            let event: any, i: number;
            for (i = 0; i < self.m_pLabelEvents.length; i++) {
                event = self.m_pLabelEvents[i];
                event['label'].removeEventListener(event['type'], self.linkClick, self);
            }
            self.m_pLabelEvents.length = 0;
        }

        public onDestroy(): void {
            let self = this;
            self.removeLabelEvent();
            self.m_pImages.length = 0;
            self.m_pLabels.length = 0;
            if(self.m_pTextParser){
                self.m_pTextParser.onDestroy();
                self.m_pTextParser = null;
            }
            self.callFunc = null;
        }
    }
    
    export class CRichLabelTextParser extends egret.HtmlTextParser {
        private m_pTexts: any[] = [];
        public constructor() {
            super();
        }

        private addToResults(text: string, type: IRichElement, objectText: any): void {
            let self = this;
            if (objectText.style) {
                self.m_pTexts.push({ 'text': text, 'type': type, 'style': objectText.style });
            } else {
                self.m_pTexts.push({ 'text': text, 'type': type });
            }
        }

        private parseImage(objectText: any): void {
            let self = this;
            let htmltext: string = objectText.text;
            let firstIdx: number = 0; //文本段开始位置
            let length: number = htmltext.length;

            while (firstIdx < length) {
                let starIdx: number = htmltext.indexOf("[img]", firstIdx);
                if (starIdx < 0) {
                    self.addToResults(htmltext.substring(firstIdx), IRichElement.text, objectText);
                    firstIdx = length;
                }
                else {
                    self.addToResults(htmltext.substring(firstIdx, starIdx), IRichElement.text, objectText);
                    let fontEnd: number = htmltext.indexOf("[/img]", starIdx);
                    if (fontEnd == -1) {
                        egret.$error(1038);
                        fontEnd = starIdx;
                    }
                    else {
                        self.addToResults(htmltext.substring(starIdx + 5, fontEnd), IRichElement.image, objectText);
                    }
                    firstIdx = fontEnd + 6;
                }
            }
        }

        public parser(htmltext: string): Array<egret.ITextElement> {
            let self = this;
            self.m_pTexts = [];
            let result: any[] = super.parser(htmltext);

            for (let i: number = 0; i < result.length; i++) {
                self.parseImage(result[i]);
            }

            return self.m_pTexts;
        }

        public onDestroy(): void {
            let self = this;
            self.m_pTexts.length = 0;
        }
    }
}
