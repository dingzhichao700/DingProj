var egret;
(function (egret) {
    var HtmlUtil = (function () {
        /**
         * 构造函数
         */
        function HtmlUtil() {
        }
        var __egretProto__ = HtmlUtil.prototype;
        //
        /**
         * 获取html文本
         * @param text:String 原始文本
         * @param size:int = 12  字体大小
         * @param color:String = null 文本颜色，为空不设置
         * @param underline:Boolean = false 是否下划线
         * @param bold:Boolean = false 是否加粗
         * @param anchor:String = null 链接地址或事件(http:www.xxx.com | event:xxx)
         * @param italic:Boolean = false 是否斜体
         * @return
         *
         */
        HtmlUtil.getHtml = function (text, size, color, underline, bold, anchor, target, italic) {
            if (size === void 0) { size = 12; }
            if (color === void 0) { color = null; }
            if (underline === void 0) { underline = false; }
            if (bold === void 0) { bold = false; }
            if (anchor === void 0) { anchor = null; }
            if (target === void 0) { target = null; }
            if (italic === void 0) { italic = false; }
            var values = [bold, italic, underline];
            for (var i = 0; i < values.length; i++) {
                if (values[i])
                    text = HtmlUtil.getTag(HtmlUtil._tags[i]) + text + HtmlUtil.getTag(HtmlUtil._tags[i], false);
            }
            if (anchor)
                text = HtmlUtil.setAnchor(text, anchor, target);
            return HtmlUtil.setFont(text, size, color);
        };
        //
        /**
         * 文本添加或清除html链接标签
         * @param text:String 原始文本
         * @param anchor:String 链接地址或事件(event:xxx)，清除标签时设置为 null
         * @param target:String = "_blank" 打开窗口类型，清除标签时设置为 null
         * @param added:Boolean = true 添加还是清除标签
         * @return
         *
         */
        HtmlUtil.setAnchor = function (text, anchor, target, added) {
            if (target === void 0) { target = "_blank"; }
            if (added === void 0) { added = true; }
            if (added)
                return HtmlUtil.getTag(HtmlUtil.TAG_A, true, [HtmlUtil.TAG_HREF, HtmlUtil.TAG_TARGET], [anchor, target]) + text + HtmlUtil.getTag(HtmlUtil.TAG_A, false);
            return HtmlUtil.clearTag(text, HtmlUtil.TAG_A);
        };
        //
        /**
         * 文本添加或清除html粗体标签
         * @param text:String 原始文本
         * @param added:Boolean = true 添加还是清除标签
         * @return
         *
         */
        HtmlUtil.setBold = function (text, added) {
            if (added === void 0) { added = true; }
            if (added)
                return HtmlUtil.getTag(HtmlUtil.TAG_B) + text + HtmlUtil.getTag(HtmlUtil.TAG_B, false);
            return HtmlUtil.clearTag(text, HtmlUtil.TAG_B);
        };
        //
        /**
         * 文本添加或清除html斜体标签
         * @param text:String 原始文本
         * @param added:Boolean = true 添加还是清除标签
         * @return
         *
         */
        HtmlUtil.setItalic = function (text, added) {
            if (added === void 0) { added = true; }
            if (added)
                return HtmlUtil.getTag(HtmlUtil.TAG_I) + text + HtmlUtil.getTag(HtmlUtil.TAG_I, false);
            return HtmlUtil.clearTag(text, HtmlUtil.TAG_I);
        };
        //
        /**
         * 文本添加或清除html下划线标签
         * @param text:String 原始文本
         * @param added:Boolean = true 添加还是清除标签
         * @return
         *
         */
        HtmlUtil.setUnderline = function (text, added) {
            if (added === void 0) { added = true; }
            if (added)
                return HtmlUtil.getTag(HtmlUtil.TAG_U) + text + HtmlUtil.getTag(HtmlUtil.TAG_U, false);
            return HtmlUtil.clearTag(text, HtmlUtil.TAG_U);
        };
        //
        /**
         * 文本添加或清除html字体标签
         * @param text:String 原始文本
         * @param size:int = 12 字体大小
         * @parem color:String = null 颜色
         * @param added:Boolean = true 添加还是清除标签
         * @return
         *
         */
        HtmlUtil.setFont = function (text, size, color, added) {
            if (size === void 0) { size = 12; }
            if (color === void 0) { color = null; }
            if (added === void 0) { added = true; }
            if (added) {
                if (color)
                    return HtmlUtil.getTag(HtmlUtil.TAG_FONT, true, [HtmlUtil.TAG_SIZE, HtmlUtil.TAG_COLOR], [size, color]) + text + HtmlUtil.getTag(HtmlUtil.TAG_FONT, false);
                else
                    return HtmlUtil.getTag(HtmlUtil.TAG_FONT, true, [HtmlUtil.TAG_SIZE], [size]) + text + HtmlUtil.getTag(HtmlUtil.TAG_FONT, false);
            }
            return HtmlUtil.clearTag(text, HtmlUtil.TAG_FONT);
        };
        //
        /**
         * 清除文本中的所有指定html标签
         * @param text:String html文本
         * @param name:String 标签名，如:"a":表示链接标签
         * @return
         *
         */
        HtmlUtil.clearTag = function (text, name) {
            var sReg = new RegExp("<" + name + "[^<]*" + ">", "gis");
            var eReg = new RegExp("</" + name + ">", "gi");
            text = text.replace(sReg, "");
            text = text.replace(eReg, "");
            return text;
        };
        //
        /**
         * 获取标签html对
         * @param name:String 标签名，如:"a"表示链接标签
         * @param startOrEnd:Boolean = true 开始还结束标签
         * @param attributeNames:Array = null 属性名称数组，如["href"]
         * @param attributeValues:Array = null 属性值数组，如["event:xxx"]或["http://www.xxx.com"]
         * @return 以上示例将返回:&lt;a href='event:xxx'&gt;或&lt;a href='http://www.xxx.com'&gt;
         *
         */
        HtmlUtil.getTag = function (name, startOrEnd, attributeNames, attributeValues) {
            if (startOrEnd === void 0) { startOrEnd = true; }
            if (attributeNames === void 0) { attributeNames = null; }
            if (attributeValues === void 0) { attributeValues = null; }
            //<a href='event:e'>或</a>
            var slash = "";
            var attribute = "";
            if (startOrEnd) {
                if (attributeNames && attributeValues)
                    for (var i = 0; i < attributeNames.length; i++) {
                        attribute += " " + attributeNames[i] + "='" + attributeValues[i] + "'";
                    }
            }
            else {
                slash = "/";
            }
            return "<" + slash + name + attribute + ">";
        };
        //标签数组
        HtmlUtil._tags = [
            "b",
            "i",
            "u"
        ];
        HtmlUtil.TAG_A = "a";
        HtmlUtil.TAG_B = "b";
        HtmlUtil.TAG_I = "i";
        HtmlUtil.TAG_U = "u";
        HtmlUtil.TAG_HREF = "href";
        HtmlUtil.TAG_TARGET = "target";
        HtmlUtil.TAG_FONT = "font";
        HtmlUtil.TAG_SIZE = "size";
        HtmlUtil.TAG_COLOR = "color";
        return HtmlUtil;
    })();
    egret.HtmlUtil = HtmlUtil;
    HtmlUtil.prototype.__class__ = "egret.HtmlUtil";
})(egret || (egret = {}));
