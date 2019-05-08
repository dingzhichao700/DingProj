var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DLG;
(function (DLG) {
    /**
     *
     * @author
     *
     */
    var IRichElement;
    (function (IRichElement) {
        IRichElement[IRichElement["text"] = 0] = "text";
        IRichElement[IRichElement["image"] = 1] = "image";
    })(IRichElement || (IRichElement = {}));
    ;
    var CRichText = (function (_super) {
        __extends(CRichText, _super);
        function CRichText() {
            var _this = _super.call(this) || this;
            _this.label = null;
            _this.m_pIsCenter = false;
            _this.m_pX = 0;
            _this.m_pY = 0;
            _this.m_pOldText = "";
            return _this;
        }
        CRichText.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            var self = this;
            var label = self.getChildAt(0);
            self.horizontalCenter = label.horizontalCenter;
            self.verticalCenter = label.verticalCenter;
            self.top = label.top;
            self.bottom = label.bottom;
            self.left = label.left;
            self.right = label.right;
            self.label = new CRichLabel(label.width);
            self.setStyle(label);
            self.addChild(self.label);
            if (label.parent) {
                label.onDestroy();
                label.parent.removeChild(label);
                label = null;
            }
        };
        CRichText.prototype.onDestroy = function () {
            var self = this;
            if (self.label) {
                self.label.onDestroy();
                self.label = null;
            }
            self.m_pOldText = null;
            _super.prototype.onDestroy.call(this);
        };
        CRichText.prototype.setStyle = function (lblStyle) {
            var self = this;
            self.m_pWidth = lblStyle.width;
            self.m_pHeight = lblStyle.height;
            self.m_pX = lblStyle.x;
            self.m_pY = lblStyle.y;
            self.label.setStyle(lblStyle);
            self.setPosition(lblStyle.x, lblStyle.y);
            self.label.setText(lblStyle.text);
        };
        CRichText.prototype.getLabel = function () {
            var self = this;
            return self.label;
        };
        Object.defineProperty(CRichText.prototype, "textAlign", {
            set: function (center) {
                var self = this;
                self.m_pIsCenter = center;
                self.setPosition(self.m_pX, self.m_pY);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "subText", {
            set: function (text) {
                var self = this;
                if (self.label) {
                    self.label.isSubStr = true;
                    self.text = text;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "lineNum", {
            get: function () {
                var self = this;
                if (self.label)
                    return self.label.lineNum;
                else
                    return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "text", {
            set: function (text) {
                var self = this;
                text = DLG.Utils.parseLanRich(text);
                text = DLG.Utils.parseClickRich(text);
                if (self.m_pOldText != text) {
                    self.label.setText(text);
                    self.width = self.label.textWidth;
                    self.height = self.label.textHeight;
                    self.setPosition(self.m_pX, self.m_pY);
                    self.m_pOldText = text;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "imageScale", {
            set: function (scale) {
                var self = this;
                self.label.imageScale = scale;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "imgOffsetX", {
            set: function (x) {
                var self = this;
                self.label.imgOffsetX = x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "imgOffsetY", {
            set: function (y) {
                var self = this;
                self.label.imgOffsetY = y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "textWidth", {
            get: function () {
                var self = this;
                if (self.label == null)
                    return 0;
                return self.label.textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "textHeight", {
            get: function () {
                var self = this;
                if (self.label == null)
                    return 0;
                return self.label.textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CRichText.prototype, "textColor", {
            set: function (color) {
                var self = this;
                self.label.textColor = color;
            },
            enumerable: true,
            configurable: true
        });
        CRichText.prototype.setWidth = function (width) {
            var self = this;
            self.m_pWidth = width;
        };
        CRichText.prototype.setPosition = function (x, y) {
            var self = this;
            if (self.m_pIsCenter) {
                var centerX = x + self.m_pWidth / 2;
                var centerY = y + self.m_pHeight / 2;
                self.x = centerX - self.label.textWidth / 2;
                self.y = centerY - self.label.height / 2;
            }
            else {
                self.x = x;
                self.y = y;
            }
        };
        //限制文字行数 超过不显示 可能导致subText有问题
        CRichText.prototype.limitHeight = function (numLine) {
            var self = this;
            self.label.limitLines = numLine;
        };
        return CRichText;
    }(DLG.CGroup));
    DLG.CRichText = CRichText;
    __reflect(CRichText.prototype, "DLG.CRichText");
    var CRichTextEvent = (function (_super) {
        __extends(CRichTextEvent, _super);
        function CRichTextEvent(type, bubbles, cancelable, text) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            var _this = _super.call(this, type, bubbles, cancelable) || this;
            _this.text = "";
            var self = _this;
            self.text = text;
            return _this;
        }
        return CRichTextEvent;
    }(egret.Event));
    CRichTextEvent.Link = "link";
    DLG.CRichTextEvent = CRichTextEvent;
    __reflect(CRichTextEvent.prototype, "DLG.CRichTextEvent");
    var CRichLabel = (function (_super) {
        __extends(CRichLabel, _super);
        function CRichLabel(defaultWidth) {
            var _this = _super.call(this) || this;
            _this.m_pTextParser = new CRichLabelTextParser();
            _this.m_pLineLabel = new DLG.CLabel();
            _this.m_pLabels = [];
            _this.m_pLabelEvents = [];
            _this.m_pLine = 0;
            _this.m_pImages = {};
            _this.lineWidth = 300;
            _this.m_pWidth = 0;
            _this.callFunc = null;
            _this.lineSpacing = 0;
            _this.size = 0;
            _this.strokeColor = 0;
            _this.textWidth = 0;
            _this.textHeight = 0;
            _this.fontFamily = '';
            _this.isSubStr = false;
            _this.isSubEnd = false;
            _this.limitLines = 0;
            _this.imageScale = 1;
            _this.imgOffsetX = 0;
            _this.imgOffsetY = 0;
            var self = _this;
            if (defaultWidth) {
                self.lineWidth = defaultWidth;
            }
            return _this;
        }
        Object.defineProperty(CRichLabel.prototype, "lineNum", {
            get: function () {
                var self = this;
                return self.numChildren;
            },
            enumerable: true,
            configurable: true
        });
        CRichLabel.prototype.setCompleteFunc = function (callFunc) {
            var self = this;
            self.callFunc = callFunc;
        };
        CRichLabel.prototype.genSpaceStr = function (spaceWidth) {
            var spaceStr = '';
            var self = this;
            while (spaceWidth > 0) {
                spaceStr += ' ';
                spaceWidth -= self.size < 10 ? 4 : self.size / 3.3333; //空格的宽度
            }
            return [spaceStr, spaceWidth];
        };
        CRichLabel.prototype.showElement = function (textArr) {
            var self = this;
            // sayError("textArr",textArr);
            var elements = [];
            var arrLen = textArr.length;
            for (var i = 0; i < arrLen; i++) {
                var el = textArr[i];
                if (el.text == '')
                    continue;
                if (el['type'] == IRichElement.image) {
                    var bitmap = new egret.Bitmap(RES.getRes(el.text));
                    bitmap.width = bitmap.width * self.imageScale;
                    bitmap.height = bitmap.height * self.imageScale;
                    var spaces = self.genSpaceStr(bitmap.width + self.imgOffsetX);
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
        };
        CRichLabel.prototype.createLineLabel = function (element, newText) {
            var self = this;
            var newEl = {};
            if (element.style) {
                newEl = { 'text': newText, 'style': element.style };
            }
            else {
                newEl = { 'text': newText };
            }
            if (!self.m_pLabels[self.m_pLine]) {
                self.m_pLabels[self.m_pLine] = [];
            }
            self.m_pLabels[self.m_pLine].push(newEl);
        };
        CRichLabel.prototype.createLineImage = function (element, line, offsetX) {
            var self = this;
            if (!self.m_pImages[line]) {
                self.m_pImages[line] = { lineHeight: 0, list: [] };
            }
            element['x'] = offsetX;
            element['line'] = line;
            self.m_pImages[line]['list'].push(element);
            if (self.m_pImages[line]['lineHeight'] < element['bitmap']['height']) {
                self.m_pImages[line]['lineHeight'] = element['bitmap']['height'];
            }
        };
        CRichLabel.prototype.appendElement = function (element, isEnd) {
            var self = this;
            var startIndex = 0;
            var labelText = self.m_pLineLabel.text;
            var lineLabelWidth = self.m_pLineLabel.width;
            var bitmapWidth = element['bitmap'] ? element['bitmap']['width'] : 0;
            var text = element.text;
            var sub_text;
            var textArr = text.split('\n');
            var textArrlen = textArr.length;
            for (var idx = 0; idx < textArrlen; idx++) {
                text = textArr[idx];
                for (var i = 0; i <= text.length; i++) {
                    sub_text = text.substring(startIndex, i);
                    self.m_pLineLabel.text = labelText + sub_text;
                    var line_width = self.m_pLineLabel.textWidth;
                    if (self.isSubStr && self.limitLines > 0 && element['type'] == IRichElement.image) {
                        line_width += 10;
                    }
                    if (line_width >= (self.lineWidth - 10)) {
                        if (self.m_pLineLabel.width > self.lineWidth) {
                            sub_text = text.substring(startIndex, i - 1);
                            startIndex = i - 1;
                        }
                        else {
                            startIndex = i;
                        }
                        if (self.isSubStr) {
                            if (self.limitLines > 0) {
                                if (self.m_pLine == self.limitLines - 1) {
                                    sub_text = element['type'] == IRichElement.text ? sub_text + '...' : '...';
                                    self.isSubEnd = true;
                                }
                            }
                            else {
                                if (element['type'] == IRichElement.text) {
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
                            }
                            else {
                                if (self.isSubStr) {
                                    return;
                                }
                                var spaces = self.genSpaceStr(bitmapWidth + self.imgOffsetX);
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
        };
        CRichLabel.prototype._textFlow = function (text) {
            var self = this;
            self.m_pImages = [];
            var textArr = self.m_pTextParser.parser(text);
            self.showElement(textArr);
            self.displayLables();
            egret.callLater(function () {
                self.displayImages();
                if (self.callFunc) {
                    self.callFunc();
                }
            }, self);
        };
        CRichLabel.prototype.linkClick = function (evt) {
            var self = this;
            self.dispatchEvent(new CRichTextEvent(CRichTextEvent.Link, true, false, evt.text));
        };
        CRichLabel.prototype.isExistContent = function (line) {
            var self = this;
            var lineContent = self.m_pLabels[line];
            for (var key in lineContent) {
                var text = lineContent[key].text;
                if (!text.match(/^[ ]+$/)) {
                    return false;
                }
            }
            return true;
        };
        CRichLabel.prototype.displayLables = function () {
            var self = this;
            // sayError("self.m_pLabels",self.m_pLabels);
            var offsetY = 0;
            var length = self.m_pLabels.length;
            for (var line = 0; line < length; line++) {
                if (self.limitLines && line >= self.limitLines) {
                    break;
                }
                var label = self.createLabel();
                var imageHeight = self.m_pImages[line] ? self.m_pImages[line]['lineHeight'] : self.size;
                var lineLabels = self.m_pLabels[line];
                if (!lineLabels)
                    continue;
                for (var i = 0; i < lineLabels.length; i++) {
                    var element = lineLabels[i];
                    label.appendElement(element);
                    if (element.style && element.style.href) {
                        label.addEventListener(egret.TextEvent.LINK, self.linkClick, self);
                        self.m_pLabelEvents.push({ label: label, type: egret.TextEvent.LINK });
                    }
                }
                offsetY += self.imgOffsetY ? self.imgOffsetY : imageHeight > self.size ? (imageHeight - self.size) / 2 : 0;
                offsetY += self.imgOffsetY ? self.isExistContent(line) ? (self.lineSpacing / 4 * 3) : 0 : 0;
                //offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;
                label.y = line * (self.size + self.lineSpacing);
                self.addChild(label);
                if (self.textWidth < label.textWidth)
                    self.textWidth = label.textWidth;
            }
            offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;
            self.textHeight = length * (self.size + self.lineSpacing) + offsetY - self.lineSpacing;
            //self.m_pLabels = [];
            //            console.log("displayLables:",self.m_pLabels,length,self.textHeight);
        };
        CRichLabel.prototype.displayImages = function () {
            var self = this;
            var offsetY = 0;
            var addHeight = 0;
            // sayError("self.m_pImages",self.m_pImages);
            for (var line in self.m_pImages) {
                if (self.limitLines && Number(line) >= self.limitLines) {
                    break;
                }
                var images = self.m_pImages[line]['list'];
                var imageHeight = self.m_pImages[line]['lineHeight'];
                offsetY += self.imgOffsetY ? (self.isExistContent(0) ? self.lineSpacing : 0) : 0;
                offsetY += self.imgOffsetY ? self.imgOffsetY : imageHeight > self.size ? (imageHeight - self.size) / 2 : 0;
                for (var i = 0; i < images.length; i++) {
                    var image = images[i];
                    var height = self.size;
                    var x = image.x;
                    var y = (height + self.lineSpacing) * image.line;
                    if (!self.getChildByName(image.bitmap.hashCode)) {
                        self.addChild(image.bitmap);
                        image.bitmap.name = image.bitmap.hashCode;
                    }
                    image.bitmap.x = x - image.bitmap.width;
                    image.bitmap.y = y + self.size - image.bitmap.height + offsetY;
                }
            }
            self.m_pImages = {};
            self.m_pLabels = [];
        };
        CRichLabel.prototype.createLabel = function () {
            var self = this;
            var label = new DLG.CLabel();
            label.textColor = self.textColor;
            label.size = self.size;
            label.bold = self.bold;
            label.stroke = self.stroke;
            label.strokeColor = self.strokeColor;
            label.fontFamily = self.fontFamily;
            return label;
        };
        CRichLabel.prototype.setLineLabelStyle = function () {
            var self = this;
            self.m_pLineLabel.size = self.size;
            self.m_pLineLabel.bold = self.bold;
            self.m_pLineLabel.stroke = self.stroke;
            self.m_pLineLabel.strokeColor = self.strokeColor;
            self.m_pLineLabel.fontFamily = self.fontFamily;
        };
        CRichLabel.prototype.setStyle = function (lblStyle) {
            var self = this;
            self.textColor = lblStyle.textColor;
            self.size = lblStyle.size;
            self.lineSpacing = lblStyle.lineSpacing;
            self.bold = lblStyle.bold;
            self.stroke = lblStyle.stroke;
            self.strokeColor = lblStyle.strokeColor;
            self.fontFamily = lblStyle.fontFamily;
        };
        CRichLabel.prototype.setText = function (text, width) {
            var self = this;
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
        };
        CRichLabel.prototype.removeLabelEvent = function () {
            var self = this;
            var event, i;
            for (i = 0; i < self.m_pLabelEvents.length; i++) {
                event = self.m_pLabelEvents[i];
                event['label'].removeEventListener(event['type'], self.linkClick, self);
            }
            self.m_pLabelEvents.length = 0;
        };
        CRichLabel.prototype.onDestroy = function () {
            var self = this;
            self.removeLabelEvent();
            self.m_pImages.length = 0;
            self.m_pLabels.length = 0;
            if (self.m_pTextParser) {
                self.m_pTextParser.onDestroy();
                self.m_pTextParser = null;
            }
            self.callFunc = null;
        };
        return CRichLabel;
    }(egret.DisplayObjectContainer));
    DLG.CRichLabel = CRichLabel;
    __reflect(CRichLabel.prototype, "DLG.CRichLabel");
    var CRichLabelTextParser = (function (_super) {
        __extends(CRichLabelTextParser, _super);
        function CRichLabelTextParser() {
            var _this = _super.call(this) || this;
            _this.m_pTexts = [];
            return _this;
        }
        CRichLabelTextParser.prototype.addToResults = function (text, type, objectText) {
            var self = this;
            if (objectText.style) {
                self.m_pTexts.push({ 'text': text, 'type': type, 'style': objectText.style });
            }
            else {
                self.m_pTexts.push({ 'text': text, 'type': type });
            }
        };
        CRichLabelTextParser.prototype.parseImage = function (objectText) {
            var self = this;
            var htmltext = objectText.text;
            var firstIdx = 0; //文本段开始位置
            var length = htmltext.length;
            while (firstIdx < length) {
                var starIdx = htmltext.indexOf("[img]", firstIdx);
                if (starIdx < 0) {
                    self.addToResults(htmltext.substring(firstIdx), IRichElement.text, objectText);
                    firstIdx = length;
                }
                else {
                    self.addToResults(htmltext.substring(firstIdx, starIdx), IRichElement.text, objectText);
                    var fontEnd = htmltext.indexOf("[/img]", starIdx);
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
        };
        CRichLabelTextParser.prototype.parser = function (htmltext) {
            var self = this;
            self.m_pTexts = [];
            var result = _super.prototype.parser.call(this, htmltext);
            for (var i = 0; i < result.length; i++) {
                self.parseImage(result[i]);
            }
            return self.m_pTexts;
        };
        CRichLabelTextParser.prototype.onDestroy = function () {
            var self = this;
            self.m_pTexts.length = 0;
        };
        return CRichLabelTextParser;
    }(egret.HtmlTextParser));
    DLG.CRichLabelTextParser = CRichLabelTextParser;
    __reflect(CRichLabelTextParser.prototype, "DLG.CRichLabelTextParser");
})(DLG || (DLG = {}));
//# sourceMappingURL=CRichText.js.map