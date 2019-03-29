var egret;
(function (egret) {
    var HashMap = (function () {
        function HashMap() {
            this.length = 0;
            this.length = 0;
            this.content = {};
        }
        var __egretProto__ = HashMap.prototype;
        //-------------------public methods--------------------
        /**
         * Returns the number of keys in this HashMap.
         */
        __egretProto__.size = function () {
            return this.length;
        };
        /**
         * Returns if this HashMap maps no keys to values.
         */
        __egretProto__.isEmpty = function () {
            return (this.length == 0);
        };
        /**
         * Returns an Array of the keys in this HashMap.
         */
        __egretProto__.keys = function () {
            var temp = new Array(this.length);
            var index = 0;
            for (var i in this.content) {
                temp[index] = i;
                index++;
            }
            return temp;
        };
        /**
         * Call func(key) for each key.
         * @param func the function to call
         */
        __egretProto__.eachKey = function (func, thisObj) {
            for (var i in this.content) {
                func.apply(thisObj, [i]);
            }
        };
        /**
         * Call func(value) for each value.
         * @param func the function to call
         */
        __egretProto__.eachValue = function (func, thisObj) {
            for (var i in this.content) {
                func.apply(thisObj, [this.content[i]]);
            }
        };
        /**
         * Returns an Array of the values in this HashMap.
         */
        __egretProto__.values = function () {
            var temp = new Array(this.length);
            var index = 0;
            for (var i in this.content) {
                temp[index] = this.content[i];
                index++;
            }
            return temp;
        };
        /**
         * Tests if some key maps into the specified value in this HashMap.
         * This operation is more expensive than the containsKey method.
         */
        __egretProto__.containsValue = function (value) {
            for (var i in this.content) {
                if (this.content[i] === value) {
                    return true;
                }
            }
            return false;
        };
        /**
         * Tests if the specified object is a key in this HashMap.
         * This operation is very fast if it is a string.
         * @param   key   The key whose presence in this map is to be tested
         * @return <tt>true</tt> if this map contains a mapping for the specified
         */
        __egretProto__.containsKey = function (key) {
            if (this.content[key] != undefined) {
                return true;
            }
            return false;
        };
        /**
         * Returns the value to which the specified key is mapped in this HashMap.
         * Return null if the key is not mapped to any value in this HashMap.
         * This operation is very fast if the key is a string.
         * @param   key the key whose associated value is to be returned.
         * @return  the value to which this map maps the specified key, or
         *          <tt>null</tt> if the map contains no mapping for this key
         *           or it is null value originally.
         */
        __egretProto__.get = function (key) {
            var value = this.content[key];
            if (value !== undefined) {
                return value;
            }
            return null;
        };
        /**
         * Same functionity method with different name to <code>get</code>.
         *
         * @param   key the key whose associated value is to be returned.
         * @return  the value to which this map maps the specified key, or
         *          <tt>null</tt> if the map contains no mapping for this key
         *           or it is null value originally.
         */
        __egretProto__.getValue = function (key) {
            return this.get(key);
        };
        /**
         * Associates the specified value with the specified key in this map.
         * If the map previously contained a mapping for this key, the old value is replaced.
         * If value is null, means remove the key from the map.
         * @param key key with which the specified value is to be associated.
         * @param value value to be associated with the specified key. null to remove the key.
         * @return previous value associated with specified key, or <tt>null</tt>
         *	       if there was no mapping for key.  A <tt>null</tt> return can
         *	       also indicate that the HashMap previously associated
         *	       <tt>null</tt> with the specified key.
         */
        __egretProto__.put = function (key, value) {
            if (key == null) {
                throw new Error("cannot put a value with undefined or null key!");
                return undefined;
            }
            else if (value == null) {
                return this.remove(key);
            }
            else {
                if (typeof (key) != "string" && typeof (key) != "number") {
                    throw new Error("JS不支持对象作为Key");
                }
                var oldValue = this.content[key];
                if (!oldValue) {
                    this.length++;
                }
                this.content[key] = value;
                return oldValue;
            }
        };
        /**
         * Removes the mapping for this key from this map if present.
         *
         * @param  key key whose mapping is to be removed from the map.
         * @return previous value associated with specified key, or <tt>null</tt>
         *	       if there was no mapping for key.  A <tt>null</tt> return can
         *	       also indicate that the map previously associated <tt>null</tt>
         *	       with the specified key.
         */
        __egretProto__.remove = function (key) {
            var exist = this.content[key] != undefined; //containsKey(key);
            if (!exist) {
                return null;
            }
            var temp = this.content[key];
            delete this.content[key];
            this.length--;
            return temp;
        };
        /**
         * Clears this HashMap so that it contains no keys no values.
         */
        __egretProto__.clear = function () {
            HashMap.deleteObjectKey(this.content);
            this.length = 0;
        };
        /**
         * Return a same copy of HashMap object
         */
        __egretProto__.clone = function () {
            var temp = new HashMap();
            for (var i in this.content) {
                temp.put(i, this.content[i]);
            }
            return temp;
        };
        __egretProto__.toString = function () {
            var ks = this.keys();
            var vs = this.values();
            var temp = "HashMap Content:\n";
            for (var i = 0; i < ks.length; i++) {
                temp += ks[i] + " -> " + vs[i] + "\n";
            }
            return temp;
        };
        //
        /**
         * 删除动态对象动态键值
         * @param args 参数列表
         *
         */
        HashMap.deleteObjectKey = function (object) {
            for (var p in object)
                HashMap._keyArray.push(p);
            //不能将键赋值为null或undefined，否则此对象键的数量将增加一倍
            var length = HashMap._keyArray.length;
            for (var i = 0; i < length; i++) {
                delete object[HashMap._keyArray[i]];
            }
            HashMap._keyArray.length = 0;
        };
        //deleteObjectKey() 专用缓存对象
        HashMap._keyArray = [];
        return HashMap;
    })();
    egret.HashMap = HashMap;
    HashMap.prototype.__class__ = "egret.HashMap";
})(egret || (egret = {}));
