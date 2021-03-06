(function () {
    var e = ["exports", "require", "vs/base/common/winjs.base", "vs/platform/instantiation/common/instantiation", "vs/base/common/event", "vs/base/common/platform", "vs/base/common/types", "path", "vs/base/common/objects", "vs/base/common/lifecycle", "electron", "vs/base/common/strings", "vs/platform/configuration/common/configuration", "vs/platform/environment/common/environment", "vs/nls!vs/code/electron-main/main", "vs/nls", "vs/platform/node/product", "vs/base/common/errors", "vs/base/common/paths", "vs/base/common/uri", "vs/base/common/arrays", "vs/base/parts/ipc/common/ipc", "vs/platform/platform", "vs/platform/files/common/files", "vs/code/common/windows", "vs/code/electron-main/log", "os", "vs/code/electron-main/storage", "fs", "vs/base/node/event", "vs/base/common/uuid", "vs/code/electron-main/lifecycle", "vs/platform/url/common/url", "vs/platform/configuration/common/configurationRegistry", "vs/base/common/async", "vs/code/electron-main/windows", "vs/platform/telemetry/common/telemetry", "vs/platform/update/common/update", "original-fs", "vs/platform/request/node/request", "vs/base/node/request", "vs/base/node/extfs", "vs/platform/backup/common/backup", "vs/base/common/decorators", "vs/platform/instantiation/common/serviceCollection", "vs/platform/node/package", "vs/platform/windows/common/windows", "vs/base/common/functional", "vs/base/common/map", "crypto", "vs/platform/instantiation/common/descriptors", "vs/base/node/pfs", "vs/platform/environment/node/argv", "vs/platform/jsonschemas/common/jsonContributionRegistry", "vs/base/parts/ipc/node/ipc.net", "vs/code/electron-main/paths", "vs/code/electron-main/window", "vs/base/node/config", "vs/platform/storage/common/storage", "vs/base/common/assert", "vs/code/electron-main/launch", "vs/platform/workspace/common/workspace", "vs/platform/telemetry/common/telemetryUtils", "vs/base/common/json", "vs/nls!vs/code/electron-main/menus", "vs/nls!vs/code/electron-main/window", "vs/nls!vs/code/electron-main/windows", "vs/nls!vs/platform/configuration/common/configurationRegistry", "vs/nls!vs/platform/environment/node/argv", "vs/nls!vs/platform/extensions/common/extensionsRegistry", "vs/nls!vs/platform/request/node/request", "vs/nls!vs/platform/telemetry/common/telemetryService", "vs/nls!vs/workbench/parts/git/electron-main/askpassService", "vs/platform/backup/common/backupIpc", "vs/base/common/callbackList", "vs/platform/request/electron-main/requestService", "vs/base/node/id", "vs/platform/update/electron-main/updateService", "vs/base/common/events", "vs/base/node/paths", "vs/code/electron-main/app", "vs/base/node/profiler", "vs/base/node/proxy", "url", "vs/base/common/labels", "vs/platform/backup/electron-main/backupMainService", "vs/platform/update/electron-main/auto-updater.win32", "vs/platform/instantiation/common/instantiationService", "vs/platform/keybinding/common/keybinding", "vs/platform/lifecycle/common/lifecycle", "events", "vs/platform/environment/node/http", "vs/base/common/cancellation", "vs/base/parts/ipc/common/ipc.electron", "vs/base/parts/ipc/electron-main/ipc.electron-main", "vs/platform/environment/node/environmentService", "vs/base/common/glob", "vs/base/common/mime", "vs/platform/extensions/common/extensionsRegistry", "vs/platform/update/electron-main/auto-updater.linux", "vs/platform/configuration/common/model", "vs/platform/configuration/node/configurationService", "vs/base/node/crypto", "vs/base/common/eventEmitter", "vs/code/electron-main/sharedProcess", "vs/platform/telemetry/common/telemetryIpc", "vs/platform/telemetry/node/commonProperties", "vs/code/electron-main/shellEnv", "vs/platform/update/common/updateIpc", "child_process", "vs/platform/url/electron-main/urlService", "vs/nls!vs/base/common/json", "vs/base/common/graph", "vs/code/node/windowsUtils", "vs/base/common/collections", "vs/platform/request/node/requestService", "vs/base/node/flow", "vs/code/electron-main/menus", "vs/platform/url/common/urlIpc", "vs/platform/windows/common/windowsIpc", "vs/platform/windows/electron-main/windowsService", "assert", "vs/platform/storage/common/storageService", "vs/nls!vs/base/common/severity", "vs/platform/telemetry/common/telemetryService", "vs/workbench/parts/git/common/git", "vs/workbench/parts/git/common/gitIpc", "vs/workbench/parts/git/electron-main/askpassService", "vs/base/common/severity", "net", "https", "zlib", "native-keymap", "minimist", "http", "https-proxy-agent", "http-proxy-agent", "getmac", "vs/base/common/winjs.base.raw", "vs/code/electron-main/main"],
        t = function (t) {
            for (var n = [], r = 0, i = t.length; r < i; r++)n[r] = e[t[r]]
            return n
        }
    define(e[20], t([1, 0]), function (e, t) {
        "use strict"
        function n(e, t) {
            return void 0 === t && (t = 0), e[e.length - (1 + t)]
        }

        function r(e, t, n) {
            if (void 0 === n && (n = function (e, t) {
                    return e === t
                }), e.length !== t.length)return !1
            for (var r = 0, i = e.length; r < i; r++)if (!n(e[r], t[r]))return !1
            return !0
        }

        function i(e, t, n) {
            for (var r = 0, i = e.length - 1; r <= i;) {
                var o = (r + i) / 2 | 0, s = n(e[o], t)
                if (s < 0) r = o + 1
                else {
                    if (!(s > 0))return o
                    i = o - 1
                }
            }
            return -(r + 1)
        }

        function o(e, t) {
            var n = 0, r = e.length
            if (0 === r)return 0
            for (; n < r;) {
                var i = Math.floor((n + r) / 2)
                t(e[i]) ? r = i : n = i + 1
            }
            return n
        }

        function s(e, t, n) {
            for (var r = [], i = [], o = 0, s = 0; ;) {
                if (o === e.length) {
                    i.push.apply(i, t.slice(s))
                    break
                }
                if (s === t.length) {
                    r.push.apply(r, e.slice(o))
                    break
                }
                var a = e[o], c = t[s], u = n(a, c)
                0 === u ? (o += 1, s += 1) : u < 0 ? (r.push(a), o += 1) : u > 0 && (i.push(c), s += 1)
            }
            return {removed: r, added: i}
        }

        function a(e, t, n) {
            if (0 === n)return []
            for (var r = e.slice(0, n).sort(t), i = n, s = e.length; i < s; i++)!function (i, s) {
                var a = e[i]
                if (t(a, r[n - 1]) < 0) {
                    r.pop()
                    var c = o(r, function (e) {
                        return t(a, e) < 0
                    })
                    r.splice(c, 0, a)
                }
            }(i)
            return r
        }

        function c(e) {
            return e ? e.filter(function (e) {
                return !!e
            }) : e
        }

        function u(e, t, n) {
            e.splice(n, 0, e.splice(t, 1)[0])
        }

        function l(e) {
            return !Array.isArray(e) || 0 === e.length
        }

        function f(e, t) {
            if (!t)return e.filter(function (t, n) {
                return e.indexOf(t) === n
            })
            var n = Object.create(null)
            return e.filter(function (e) {
                var r = t(e)
                return !n[r] && (n[r] = !0, !0)
            })
        }

        function p(e) {
            var t = Object.create(null)
            return function (n) {
                var r = e(n)
                return !t[r] && (t[r] = !0, !0)
            }
        }

        function d(e, t) {
            for (var n = 0; n < e.length; n++)if (t(e[n]))return n
            return -1
        }

        function h(e, t, n) {
            void 0 === n && (n = null)
            var r = d(e, t)
            return r < 0 ? n : e[r]
        }

        function v(e, t, n) {
            void 0 === n && (n = function (e, t) {
                return e === t
            })
            for (var r = 0, i = 0, o = Math.min(e.length, t.length); i < o && n(e[i], t[i]); i++)r++
            return r
        }

        function m(e) {
            return e.reduce(function (e, t) {
                return e.concat(t)
            }, [])
        }

        function g(e, t) {
            void 0 === t && (t = 0)
            for (var n = [], r = t; r < e; r++)n.push(r)
            return n
        }

        function y(e, t, n) {
            void 0 === n && (n = [])
            for (var r = 0; r < e; r++)n[r] = t()
            return n
        }

        function w(e, t, n) {
            return void 0 === n && (n = function (e) {
                return e
            }), e.reduce(function (e, r) {
                var i = t(r)
                return e[i] = n(r, e[i]), e
            }, Object.create(null))
        }

        function b(e, t) {
            return e.push(t), function () {
                var n = e.indexOf(t)
                n > -1 && e.splice(n, 1)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.tail = n, t.equals = r, t.binarySearch = i, t.findFirst = o, t.delta = s, t.top = a, t.coalesce = c, t.move = u, t.isFalsyOrEmpty = l, t.distinct = f, t.uniqueFilter = p, t.firstIndex = d, t.first = h, t.commonPrefixLength = v, t.flatten = m, t.range = g, t.fill = y, t.index = w, t.insert = b
    }), define(e[59], t([1, 0]), function (e, t) {
        "use strict"
        function n(e, t) {
            if (!e || null === e)throw new Error(t ? "Assertion failed (" + t + ")" : "Assertion Failed")
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.ok = n
    }), define(e[114], t([1, 0]), function (e, t) {
        "use strict"
        function n(e) {
            var t = []
            for (var n in e)a.call(e, n) && t.push(e[n])
            return t
        }

        function r(e) {
            var t = 0
            for (var n in e)a.call(e, n) && (t += 1)
            return t
        }

        function i(e, t) {
            for (var n in e)if (a.call(e, n)) {
                var r = t({key: n, value: e[n]}, function () {
                    delete e[n]
                })
                if (!1 === r)return
            }
        }

        function o(e, t) {
            return !!a.call(e, t) && (delete e[t], !0)
        }

        function s(e, t) {
            for (var n = Object.create(null), r = 0, i = e; r < i.length; r++) {
                var o = i[r], s = t(o), a = n[s]
                a || (a = n[s] = []), a.push(o)
            }
            return n
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var a = Object.prototype.hasOwnProperty
        t.values = n, t.size = r, t.forEach = i, t.remove = o, t.groupBy = s
    }), define(e[43], t([1, 0]), function (e, t) {
        "use strict"
        function n(e, t, n) {
            var r = null, i = null
            if ("function" == typeof n.value ? (r = "value", i = n.value) : "function" == typeof n.get && (r = "get", i = n.get), !i)throw new Error("not supported")
            var o = "$memoize$" + t
            n[r] = function () {
                for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
                return this.hasOwnProperty(o) || Object.defineProperty(this, o, {
                    configurable: !1,
                    enumerable: !1,
                    writable: !1,
                    value: i.apply(this, e)
                }), this[o]
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.memoize = n
    })
    var n = this && this.__extends || function () {
            var e = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (e, t) {
                    e.__proto__ = t
                } || function (e, t) {
                    for (var n in t)t.hasOwnProperty(n) && (e[n] = t[n])
                }
            return function (t, n) {
                function r() {
                    this.constructor = t
                }

                e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r)
            }
        }()
    define(e[78], t([1, 0]), function (e, t) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r = function () {
            function e(e) {
                this.time = (new Date).getTime(), this.originalEvent = e, this.source = null
            }

            return e
        }()
        t.Event = r
        var i = function (e) {
            function t(t, n, r, i) {
                var o = e.call(this, i) || this
                return o.key = t, o.oldValue = n, o.newValue = r, o
            }

            return n(t, e), t
        }(r)
        t.PropertyChangeEvent = i
        var o = function (e) {
            function t(t, n) {
                var r = e.call(this, n) || this
                return r.element = t, r
            }

            return n(t, e), t
        }(r)
        t.ViewerEvent = o, t.EventType = {
            PROPERTY_CHANGED: "propertyChanged",
            SELECTION: "selection",
            FOCUS: "focus",
            BLUR: "blur",
            HIGHLIGHT: "highlight",
            EXPAND: "expand",
            COLLAPSE: "collapse",
            TOGGLE: "toggle",
            BEFORE_RUN: "beforeRun",
            RUN: "run",
            EDIT: "edit",
            SAVE: "save",
            CANCEL: "cancel",
            CHANGE: "change",
            DISPOSE: "dispose"
        }
    }), define(e[47], t([1, 0]), function (e, t) {
        "use strict"
        function n(e) {
            return function () {
                for (var t = [], n = 0; n < arguments.length; n++)t[n] = arguments[n]
                return !e.apply(void 0, t)
            }
        }

        function r(e) {
            var t, n = this, r = !1
            return function () {
                return r ? t : (r = !0, t = e.apply(n, arguments))
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.not = n, t.once = r
    }), define(e[9], t([1, 0, 47]), function (e, t, r) {
        "use strict"
        function i(e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            return Array.isArray(e) ? (e.forEach(function (e) {
                return e && e.dispose()
            }), []) : 0 !== t.length ? (i(e), i(t), []) : e ? (e.dispose(), e) : void 0
        }

        function o(e) {
            return {
                dispose: function () {
                    return i(e)
                }
            }
        }

        function s() {
            for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
            return o(e.map(function (e) {
                return {dispose: e}
            }))
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.empty = Object.freeze({
            dispose: function () {
            }
        }), t.dispose = i, t.combinedDisposable = o, t.toDisposable = s
        var a = function () {
            function e() {
                this._toDispose = []
            }

            return e.prototype.dispose = function () {
                this._toDispose = i(this._toDispose)
            }, e.prototype._register = function (e) {
                return this._toDispose.push(e), e
            }, e
        }()
        t.Disposable = a
        var c = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return n(t, e), t.prototype.add = function (e) {
                if (!Array.isArray(e))return this._register(e)
                for (var t = 0, n = e; t < n.length; t++) {
                    var r = n[t]
                    return this._register(r)
                }
            }, t
        }(a)
        t.Disposables = c
        var u = function () {
            function e() {
            }

            return Object.defineProperty(e.prototype, "value", {
                set: function (e) {
                    this._value && this._value.dispose(), this._value = e
                }, enumerable: !0, configurable: !0
            }), e.prototype.dispose = function () {
                this.value = null
            }, e
        }()
        t.OneDisposable = u
        var l = function () {
            function e() {
                this.references = Object.create(null)
            }

            return e.prototype.acquire = function (e) {
                var t = this, n = this.references[e]
                n || (n = this.references[e] = {counter: 0, object: this.createReferencedObject(e)})
                var i = n.object, o = r.once(function () {
                    0 == --n.counter && (t.destroyReferencedObject(n.object), delete t.references[e])
                })
                return n.counter++, {object: i, dispose: o}
            }, e
        }()
        t.ReferenceCollection = l
        var f = function () {
            function e(e) {
                this.object = e
            }

            return e.prototype.dispose = function () {
            }, e
        }()
        t.ImmortalReference = f
    }), define(e[48], t([1, 0]), function (e, t) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r = function () {
            function e() {
                this.map = Object.create(null), this._size = 0
            }

            return Object.defineProperty(e.prototype, "size", {
                get: function () {
                    return this._size
                }, enumerable: !0, configurable: !0
            }), e.prototype.get = function (e) {
                var t = this.peek(e)
                return t || null
            }, e.prototype.getOrSet = function (e, t) {
                var n = this.get(e)
                return n || (this.set(e, t), t)
            }, e.prototype.keys = function () {
                var e = []
                for (var t in this.map)e.push(this.map[t].key)
                return e
            }, e.prototype.values = function () {
                var e = []
                for (var t in this.map)e.push(this.map[t].value)
                return e
            }, e.prototype.entries = function () {
                var e = []
                for (var t in this.map)e.push(this.map[t])
                return e
            }, e.prototype.set = function (e, t) {
                return !this.get(e) && (this.push(e, t), !0)
            }, e.prototype["delete"] = function (e) {
                var t = this.get(e)
                return t ? (this.pop(e), t) : null
            }, e.prototype.has = function (e) {
                return !!this.get(e)
            }, e.prototype.clear = function () {
                this.map = Object.create(null), this._size = 0
            }, e.prototype.push = function (e, t) {
                var n = {key: e, value: t}
                this.map[e.toString()] = n, this._size++
            }, e.prototype.pop = function (e) {
                delete this.map[e.toString()], this._size--
            }, e.prototype.peek = function (e) {
                var t = this.map[e.toString()]
                return t ? t.value : null
            }, e
        }()
        t.LinkedMap = r
        var i = function () {
            function e(e, t) {
                void 0 === e && (e = Number.MAX_VALUE), void 0 === t && (t = 1), this.limit = e, this.map = Object.create(null), this._size = 0, this.ratio = e * t
            }

            return Object.defineProperty(e.prototype, "size", {
                get: function () {
                    return this._size
                }, enumerable: !0, configurable: !0
            }), e.prototype.set = function (e, t) {
                if (this.map[e])return !1
                var n = {key: e, value: t}
                return this.push(n), this._size > this.limit && this.trim(), !0
            }, e.prototype.get = function (e) {
                var t = this.map[e]
                return t ? t.value : null
            }, e.prototype.getOrSet = function (e, t) {
                var n = this.get(e)
                return n || (this.set(e, t), t)
            }, e.prototype["delete"] = function (e) {
                var t = this.map[e]
                return t ? (this.map[e] = void 0, this._size--, t.next ? t.next.prev = t.prev : this.head = t.prev, t.prev ? t.prev.next = t.next : this.tail = t.next, t.value) : null
            }, e.prototype.has = function (e) {
                return !!this.map[e]
            }, e.prototype.clear = function () {
                this.map = Object.create(null), this._size = 0, this.head = null, this.tail = null
            }, e.prototype.push = function (e) {
                this.head && (e.prev = this.head, this.head.next = e), this.tail || (this.tail = e), this.head = e, this.map[e.key] = e, this._size++
            }, e.prototype.trim = function () {
                if (this.tail)if (this.ratio < this.limit)for (var e = 0, t = this.tail; t.next;) {
                    if (this.map[t.key] = void 0, this._size--, e === this.ratio) {
                        this.tail = t.next, this.tail.prev = null
                        break
                    }
                    t = t.next, e++
                } else this.map[this.tail.key] = void 0, this._size--, this.tail = this.tail.next, this.tail.prev = null
            }, e
        }()
        t.BoundedLinkedMap = i
        var o = function (e) {
            function t(t) {
                return e.call(this, t) || this
            }

            return n(t, e), t.prototype.get = function (e) {
                var t = this.map[e]
                return t ? (this["delete"](e), this.push(t), t.value) : null
            }, t
        }(i)
        t.LRUCache = o
        var s = function () {
            function e() {
                this.children = new Map
            }

            return e
        }(), a = function () {
            function e(e) {
                this._root = new s, this._splitter = e
            }

            return e.prototype.insert = function (e, t) {
                for (var n = this._splitter(e), r = 0, i = this._root; r < n.length; r++) {
                    var o = i.children.get(n[r])
                    if (!o)break
                    i = o
                }
                for (var a; r < n.length; r++)a = new s, i.children.set(n[r], a), i = a
                i.element = t
            }, e.prototype.lookUp = function (e) {
                for (var t, n = this._splitter(e), r = this._root.children, i = 0, o = n; i < o.length; i++) {
                    var s = o[i]
                    if (!(t = r.get(s)))return
                    r = t.children
                }
                return t.element
            }, e.prototype.findSubstr = function (e) {
                for (var t, n = this._splitter(e), r = this._root.children, i = 0, o = n; i < o.length; i++) {
                    var s = o[i], a = r.get(s)
                    if (!a)break
                    a.element && (t = a), r = a.children
                }
                if (t)return t.element
            }, e.prototype.findSuperstr = function (t) {
                for (var n, r = this._splitter(t), i = this._root.children, o = 0, s = r; o < s.length; o++) {
                    var a = s[o]
                    if (!(n = i.get(a)))return
                    i = n.children
                }
                var c = new e(this._splitter)
                return c._root = n, c
            }, e
        }()
        a.PathSplitter = function (e) {
            return e.split(/[\\\/]/).filter(function (e) {
                return !!e
            })
        }, t.TrieMap = a
        var c = function () {
            function e(e) {
                this.ignoreCase = e, this.map = new Map
            }

            return e.prototype.set = function (e, t) {
                this.map.set(this.toKey(e), t)
            }, e.prototype.get = function (e) {
                return this.map.get(this.toKey(e))
            }, e.prototype.has = function (e) {
                return this.map.has(this.toKey(e))
            }, Object.defineProperty(e.prototype, "size", {
                get: function () {
                    return this.map.size
                }, enumerable: !0, configurable: !0
            }), e.prototype.clear = function () {
                this.map.clear()
            }, e.prototype["delete"] = function (e) {
                return this.map["delete"](this.toKey(e))
            }, e.prototype.forEach = function (e) {
                this.map.forEach(e)
            }, e.prototype.values = function () {
                var e = []
                return this.map.forEach(function (t) {
                    return e.push(t)
                }), e
            }, e.prototype.toKey = function (e) {
                var t = e.toString()
                return this.ignoreCase && (t = t.toLowerCase()), t
            }, e
        }()
        t.ResourceMap = c
    }), define(e[5], t([1, 0]), function (e, t) {
        "use strict"
        function n() {
            return void 0 !== g.Worker
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var r = !1, i = !1, o = !1, s = !1, a = !1, c = !1, u = !1, l = void 0, f = void 0
        if (t.LANGUAGE_DEFAULT = "en", "object" == typeof process) {
            r = "win32" === process.platform, i = "darwin" === process.platform, o = "linux" === process.platform, s = !r && 0 === process.getuid()
            var p = process.env.VSCODE_NLS_CONFIG
            if (p)try {
                var d = JSON.parse(p), h = d.availableLanguages["*"]
                l = d.locale, f = h || t.LANGUAGE_DEFAULT
            } catch (e) {
            }
            a = !0
        } else if ("object" == typeof navigator) {
            var v = navigator.userAgent
            r = v.indexOf("Windows") >= 0, i = v.indexOf("Macintosh") >= 0, o = v.indexOf("Linux") >= 0, c = !0, l = navigator.language, f = l, u = !!self.QUnit
        }
        var m
        !function (e) {
            e[e.Web = 0] = "Web", e[e.Mac = 1] = "Mac", e[e.Linux = 2] = "Linux", e[e.Windows = 3] = "Windows"
        }(m = t.Platform || (t.Platform = {})), t._platform = m.Web, a && (i ? t._platform = m.Mac : r ? t._platform = m.Windows : o && (t._platform = m.Linux)), t.isWindows = r, t.isMacintosh = i, t.isLinux = o, t.isRootUser = s, t.isNative = a, t.isWeb = c, t.isQunit = u, t.platform = t._platform, t.language = f, t.locale = l
        var g = "object" == typeof self ? self : global
        t.globals = g, t.hasWebWorkerSupport = n, t.setTimeout = g.setTimeout.bind(g), t.clearTimeout = g.clearTimeout.bind(g), t.setInterval = g.setInterval.bind(g), t.clearInterval = g.clearInterval.bind(g)
        !function (e) {
            e[e.Windows = 1] = "Windows", e[e.Macintosh = 2] = "Macintosh", e[e.Linux = 3] = "Linux"
        }(t.OperatingSystem || (t.OperatingSystem = {})), t.OS = i ? 2 : r ? 1 : 3
    }), define(e[11], t([1, 0, 48]), function (e, t, n) {
        "use strict"
        function r(e) {
            return !e || "string" != typeof e || 0 === e.trim().length
        }

        function i(e, t, n) {
            void 0 === n && (n = "0")
            for (var r = "" + e, i = [r], o = r.length; o < t; o++)i.push(n)
            return i.reverse().join("")
        }

        function o(e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            return 0 === t.length ? e : e.replace(V, function (e, n) {
                var r = parseInt(n, 10)
                return isNaN(r) || r < 0 || r >= t.length ? e : t[r]
            })
        }

        function s(e) {
            return e.replace(/[<|>|&]/g, function (e) {
                switch (e) {
                    case"<":
                        return "&lt;"
                    case">":
                        return "&gt;"
                    case"&":
                        return "&amp;"
                    default:
                        return e
                }
            })
        }

        function a(e) {
            return e.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, "\\$&")
        }

        function c(e, t) {
            return void 0 === t && (t = " "), l(u(e, t), t)
        }

        function u(e, t) {
            if (!e || !t)return e
            var n = t.length
            if (0 === n || 0 === e.length)return e
            for (var r = 0; e.indexOf(t, r) === r;)r += n
            return e.substring(r)
        }

        function l(e, t) {
            if (!e || !t)return e
            var n = t.length, r = e.length
            if (0 === n || 0 === r)return e
            for (var i = r, o = -1; ;) {
                if (-1 === (o = e.lastIndexOf(t, i - 1)) || o + n !== i)break
                if (0 === o)return ""
                i = o
            }
            return e.substring(0, i)
        }

        function f(e) {
            return e.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, "\\$&").replace(/[\*]/g, ".*")
        }

        function p(e) {
            return e.replace(/\*/g, "")
        }

        function d(e, t) {
            if (e.length < t.length)return !1
            for (var n = 0; n < t.length; n++)if (e[n] !== t[n])return !1
            return !0
        }

        function h(e, t) {
            var n = e.length - t.length
            return n > 0 ? e.indexOf(t, n) === n : 0 === n && e === t
        }

        function v(e, t, n) {
            void 0 === n && (n = 0)
            var r = e.indexOf(t, n)
            return r < 0 && (n > 0 && (e = e.substr(n)), t = a(t), r = e.search(new RegExp(t, "i"))), r
        }

        function m(e, t, n) {
            if (void 0 === n && (n = {}), "" === e)throw new Error("Cannot create regex from empty string")
            t || (e = a(e)), n.wholeWord && (/\B/.test(e.charAt(0)) || (e = "\\b" + e), /\B/.test(e.charAt(e.length - 1)) || (e += "\\b"))
            var r = ""
            return n.global && (r += "g"), n.matchCase || (r += "i"), n.multiline && (r += "m"), new RegExp(e, r)
        }

        function g(e) {
            return "^" !== e.source && "^$" !== e.source && "$" !== e.source && e.exec("") && 0 === e.lastIndex
        }

        function y(e) {
            if (!t.canNormalize || !e)return e
            var n = G.get(e)
            if (n)return n
            var r
            return r = K.test(e) ? e.normalize("NFC") : e, G.set(e, r), r
        }

        function w(e) {
            for (var t = 0, n = e.length; t < n; t++) {
                var r = e.charCodeAt(t)
                if (32 !== r && 9 !== r)return t
            }
            return -1
        }

        function b(e) {
            for (var t = 0, n = e.length; t < n; t++) {
                var r = e.charCodeAt(t)
                if (32 !== r && 9 !== r)return e.substring(0, t)
            }
            return e
        }

        function S(e, t) {
            void 0 === t && (t = e.length - 1)
            for (var n = t; n >= 0; n--) {
                var r = e.charCodeAt(n)
                if (32 !== r && 9 !== r)return n
            }
            return -1
        }

        function _(e, t) {
            return e < t ? -1 : e > t ? 1 : 0
        }

        function E(e, t) {
            for (var n = Math.min(e.length, t.length), r = 0; r < n; r++) {
                var i = e.charCodeAt(r), o = t.charCodeAt(r)
                if (i !== o) {
                    P(i) && (i -= 32), P(o) && (o -= 32)
                    var s = i - o
                    if (0 !== s)return C(i) && C(o) ? s : _(e.toLowerCase(), t.toLowerCase())
                }
            }
            return e.length < t.length ? -1 : e.length > t.length ? 1 : 0
        }

        function C(e) {
            return e >= 97 && e <= 122
        }

        function P(e) {
            return e >= 65 && e <= 90
        }

        function O(e) {
            return C(e) || P(e)
        }

        function k(e, t) {
            return e.length === t.length && I(e, t)
        }

        function I(e, t, n) {
            void 0 === n && (n = e.length)
            for (var r = 0; r < n; r++) {
                var i = e.charCodeAt(r), o = t.charCodeAt(r)
                if (i !== o)if (O(i) && O(o)) {
                    var s = Math.abs(i - o)
                    if (0 !== s && 32 !== s)return !1
                } else if (String.fromCharCode(i).toLowerCase() !== String.fromCharCode(o).toLowerCase())return !1
            }
            return !0
        }

        function T(e, t) {
            var n = t.length
            return !(t.length > e.length) && I(e, t, n)
        }

        function M(e, t) {
            var n, r = Math.min(e.length, t.length)
            for (n = 0; n < r; n++)if (e.charCodeAt(n) !== t.charCodeAt(n))return n
            return r
        }

        function x(e, t) {
            var n, r = Math.min(e.length, t.length), i = e.length - 1, o = t.length - 1
            for (n = 0; n < r; n++)if (e.charCodeAt(i - n) !== t.charCodeAt(o - n))return n
            return r
        }

        function D(e) {
            return 55296 <= e && e <= 56319
        }

        function A(e) {
            return 56320 <= e && e <= 57343
        }

        function W(e) {
            return J.test(e)
        }

        function R(e) {
            return Q.test(e)
        }

        function L(e) {
            return (e = +e) >= 11904 && e <= 55215 || e >= 63744 && e <= 64255 || e >= 65281 && e <= 65374
        }

        function N(e, t, n) {
            void 0 === n && (n = 4)
            var r = Math.abs(e.length - t.length)
            if (r > n)return 0
            var i, o, s = [], a = []
            for (i = 0; i < t.length + 1; ++i)a.push(0)
            for (i = 0; i < e.length + 1; ++i)s.push(a)
            for (i = 1; i < e.length + 1; ++i)for (o = 1; o < t.length + 1; ++o)e[i - 1] === t[o - 1] ? s[i][o] = s[i - 1][o - 1] + 1 : s[i][o] = Math.max(s[i - 1][o], s[i][o - 1])
            return s[e.length][t.length] - Math.sqrt(r)
        }

        function F(e) {
            for (var t = /\r\n|\r|\n/g, n = [0]; t.exec(e);)n.push(t.lastIndex)
            return n
        }

        function U(e, n) {
            if (e.length < n)return e
            for (var r = e.split(/\b/), i = 0, o = r.length - 1; o >= 0; o--)if ((i += r[o].length) > n) {
                r.splice(0, o)
                break
            }
            return r.join(t.empty).replace(/^\s/, t.empty)
        }

        function j(e) {
            return e && (e = e.replace($, ""), e = e.replace(X, ""), e = e.replace(Y, "")), e
        }

        function z(e) {
            return e && e.length > 0 && 65279 === e.charCodeAt(0)
        }

        function B(e, t, n) {
            var r = e.length + t.length
            return r > n && (e = "..." + e.substr(r - n)), t.length > n ? e += t.substr(t.length - n) : e += t, e
        }

        function H(e) {
            return btoa(encodeURIComponent(e))
        }

        function q(e, t) {
            for (var n = "", r = 0; r < t; r++)n += e
            return n
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.empty = "", t.isFalsyOrWhitespace = r, t.pad = i
        var V = /{(\d+)}/g
        t.format = o, t.escape = s, t.escapeRegExpCharacters = a, t.trim = c, t.ltrim = u, t.rtrim = l, t.convertSimple2RegExpPattern = f, t.stripWildcards = p, t.startsWith = d, t.endsWith = h, t.indexOfIgnoreCase = v, t.createRegExp = m, t.regExpLeadsToEndlessLoop = g, t.canNormalize = "function" == typeof"".normalize
        var K = /[^\u0000-\u0080]/, G = new n.BoundedLinkedMap(1e4)
        t.normalizeNFC = y, t.firstNonWhitespaceIndex = w, t.getLeadingWhitespace = b, t.lastNonWhitespaceIndex = S, t.compare = _, t.compareIgnoreCase = E, t.equalsIgnoreCase = k, t.doEqualsIgnoreCase = I, t.beginsWithIgnoreCase = T, t.commonPrefixLength = M, t.commonSuffixLength = x, t.isHighSurrogate = D, t.isLowSurrogate = A
        var J = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/
        t.containsRTL = W
        var Q = /^[\t\n\r\x20-\x7E]*$/
        t.isBasicASCII = R, t.isFullWidthCharacter = L, t.difference = N, t.computeLineStarts = F, t.lcut = U
        var $ = /\x1B\x5B[12]?K/g, X = /\x1b\[\d+m/g, Y = /\x1b\[0?m/g
        t.removeAnsiEscapeCodes = j, t.UTF8_BOM_CHARACTER = String.fromCharCode(65279), t.startsWithUTF8BOM = z, t.appendWithLimit = B, t.safeBtoa = H, t.repeat = q
    }), define(e[18], t([1, 0, 5, 20, 11]), function (e, t, n, r, i) {
        "use strict"
        function o(e, o) {
            for (var s = i.rtrim(l(e), t.sep), a = i.rtrim(l(o), t.sep), c = n.isLinux ? s : s.toLowerCase(), u = n.isLinux ? a : a.toLowerCase(), f = c.split(t.sep), p = u.split(t.sep), d = 0, h = Math.min(f.length, p.length); d < h && f[d] === p[d]; d++);
            return r.fill(f.length - d, function () {
                return ".."
            }).concat(a.split(t.sep).slice(d)).join(t.sep)
        }

        function s(e) {
            var r = ~e.lastIndexOf("/") || ~e.lastIndexOf("\\")
            if (0 === r)return "."
            if (0 == ~r)return e[0]
            var i = e.substring(0, ~r)
            return n.isWindows && ":" === i[i.length - 1] && (i += t.nativeSep), i
        }

        function a(e) {
            var t = ~e.lastIndexOf("/") || ~e.lastIndexOf("\\")
            return 0 === t ? e : ~t == e.length - 1 ? a(e.substring(0, e.length - 1)) : e.substr(1 + ~t)
        }

        function c(e) {
            e = a(e)
            var t = ~e.lastIndexOf(".")
            return t ? e.substring(~t) : ""
        }

        function u(e, t) {
            return t ? !m.test(e) : !v.test(e)
        }

        function l(e, t) {
            if (null === e || void 0 === e)return e
            var r = e.length
            if (0 === r)return "."
            var i = n.isWindows && t
            if (u(e, i))return e
            for (var o = i ? "\\" : "/", s = p(e, o), a = s.length, c = !1, l = "", d = s.length; d <= r; d++)if (d === r || 47 === e.charCodeAt(d) || 92 === e.charCodeAt(d)) {
                if (f(e, a, d, "..")) {
                    var h = l.lastIndexOf(o), v = l.slice(h + 1);
                    (s || v.length > 0) && ".." !== v && (l = -1 === h ? "" : l.slice(0, h), c = !0)
                } else f(e, a, d, ".") && (s || l || d < r - 1) && (c = !0)
                if (!c) {
                    var m = e.slice(a, d)
                    "" !== l && l[l.length - 1] !== o && (l += o), l += m
                }
                a = d + 1, c = !1
            }
            return s + l
        }

        function f(e, t, n, r) {
            return t + r.length === n && e.indexOf(r, t) === t
        }

        function p(e, t) {
            if (void 0 === t && (t = "/"), !e)return ""
            var n = e.length, r = e.charCodeAt(0)
            if (47 === r || 92 === r) {
                if ((47 === (r = e.charCodeAt(1)) || 92 === r) && 47 !== (r = e.charCodeAt(2)) && 92 !== r) {
                    for (var i = 3, o = i; i < n && 47 !== (r = e.charCodeAt(i)) && 92 !== r; i++);
                    if (r = e.charCodeAt(i + 1), o !== i && 47 !== r && 92 !== r)for (i += 1; i < n; i++)if (47 === (r = e.charCodeAt(i)) || 92 === r)return e.slice(0, i + 1).replace(/[\\\/]/g, t)
                }
                return t
            }
            if ((r >= 65 && r <= 90 || r >= 97 && r <= 122) && 58 === e.charCodeAt(1))return r = e.charCodeAt(2), 47 === r || 92 === r ? e.slice(0, 2) + t : e.slice(0, 2)
            var s = e.indexOf("://")
            if (-1 !== s)for (s += 3; s < n; s++)if (47 === (r = e.charCodeAt(s)) || 92 === r)return e.slice(0, s + 1)
            return ""
        }

        function d(e) {
            if (!n.isWindows)return !1
            if (!e || e.length < 5)return !1
            var t = e.charCodeAt(0)
            if (92 !== t)return !1
            if (92 !== (t = e.charCodeAt(1)))return !1
            for (var r = 2, i = r; r < e.length && 92 !== (t = e.charCodeAt(r)); r++);
            return i !== r && (t = e.charCodeAt(r + 1), !isNaN(t) && 92 !== t)
        }

        function h(e) {
            return !(!e || 0 === e.length || /^\s+$/.test(e)) && (g.lastIndex = 0, !g.test(e) && (!n.isWindows || !y.test(e)) && "." !== e && ".." !== e && (!n.isWindows || "." !== e[e.length - 1]) && (!n.isWindows || e.length === e.trim().length))
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.sep = "/", t.nativeSep = n.isWindows ? "\\" : "/", t.relative = o, t.dirname = s, t.basename = a, t.extname = c
        var v = /(\/\.\.?\/)|(\/\.\.?)$|^(\.\.?\/)|(\/\/+)|(\\)/, m = /(\\\.\.?\\)|(\\\.\.?)$|^(\.\.?\\)|(\\\\+)|(\/)/
        t.normalize = l, t.getRoot = p, t.join = function () {
            for (var e = "", n = 0; n < arguments.length; n++) {
                var r = arguments[n]
                if (n > 0) {
                    var i = e.charCodeAt(e.length - 1)
                    if (47 !== i && 92 !== i) {
                        var o = r.charCodeAt(0)
                        47 !== o && 92 !== o && (e += t.sep)
                    }
                }
                e += r
            }
            return l(e)
        }, t.isUNC = d
        var g = n.isWindows ? /[\\\/:\*\?"<>\|]/g : /[\\\/]/g, y = /^(con|prn|aux|clock\$|nul|lpt[0-9]|com[0-9])$/i
        t.isValidBasename = h
    }), define(e[6], t([1, 0]), function (e, t) {
        "use strict"
        function n(e) {
            return Array.isArray ? Array.isArray(e) : !(!e || typeof e.length !== m.number || e.constructor !== Array)
        }

        function r(e) {
            return typeof e === m.string || e instanceof String
        }

        function i(e) {
            return n(e) && e.every(function (e) {
                    return r(e)
                })
        }

        function o(e) {
            return !(typeof e !== m.object || null === e || Array.isArray(e) || e instanceof RegExp || e instanceof Date)
        }

        function s(e) {
            return (typeof e === m.number || e instanceof Number) && !isNaN(e)
        }

        function a(e) {
            return !0 === e || !1 === e
        }

        function c(e) {
            return typeof e === m.undefined
        }

        function u(e) {
            return c(e) || null === e
        }

        function l(e) {
            if (!o(e))return !1
            for (var t in e)if (g.call(e, t))return !1
            return !0
        }

        function f(e) {
            return typeof e === m["function"]
        }

        function p() {
            for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
            return e && e.length > 0 && e.every(f)
        }

        function d(e, t) {
            for (var n = Math.min(e.length, t.length), r = 0; r < n; r++)h(e[r], t[r])
        }

        function h(e, t) {
            if (r(t)) {
                if (typeof e !== t)throw new Error("argument does not match constraint: typeof " + t)
            } else if (f(t)) {
                if (e instanceof t)return
                if (e && e.constructor === t)return
                if (1 === t.length && !0 === t.call(void 0, e))return
                throw new Error("argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true")
            }
        }

        function v(e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            var r = Object.create(e.prototype)
            return e.apply(r, t), r
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var m = {number: "number", string: "string", undefined: "undefined", object: "object", "function": "function"}
        t.isArray = n, t.isString = r, t.isStringArray = i, t.isObject = o, t.isNumber = s, t.isBoolean = a, t.isUndefined = c, t.isUndefinedOrNull = u
        var g = Object.prototype.hasOwnProperty
        t.isEmptyObject = l, t.isFunction = f, t.areFunctions = p, t.validateConstraints = d, t.validateConstraint = h, t.create = v
    }), define(e[17], t([1, 0, 5, 6]), function (e, t, n, r) {
        "use strict"
        function i(e) {
            t.errorHandler.setUnexpectedErrorHandler(e)
        }

        function o(e) {
            u(e) || t.errorHandler.onUnexpectedError(e)
        }

        function s(e) {
            u(e) || t.errorHandler.onUnexpectedExternalError(e)
        }

        function a(e) {
            return e.then(null, o)
        }

        function c(e) {
            if (e instanceof Error)return {
                $isError: !0,
                name: e.name,
                message: e.message,
                stack: e.stacktrace || e.stack
            }
            return e
        }

        function u(e) {
            return e instanceof Error && e.name === y && e.message === y
        }

        function l() {
            var e = new Error(y)
            return e.name = e.message, e
        }

        function f() {
            return new Error("Not Implemented")
        }

        function p(e) {
            return e ? new Error("Illegal argument: " + e) : new Error("Illegal argument")
        }

        function d(e) {
            return e ? new Error("Illegal state: " + e) : new Error("Illegal state")
        }

        function h(e) {
            return e ? new Error("readonly property '" + e + " cannot be changed'") : new Error("readonly property cannot be changed")
        }

        function v(e, t) {
            void 0 === t && (t = {})
            var n = new Error(e)
            return r.isNumber(t.severity) && (n.severity = t.severity), t.actions && (n.actions = t.actions), n
        }

        function m(e) {
            return e ? e.message ? e.message : e.stack ? e.stack.split("\n")[0] : String(e) : "Error"
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var g = function () {
            function e() {
                this.listeners = [], this.unexpectedErrorHandler = function (e) {
                    n.setTimeout(function () {
                        if (e.stack)throw new Error(e.message + "\n\n" + e.stack)
                        throw e
                    }, 0)
                }
            }

            return e.prototype.addListener = function (e) {
                var t = this
                return this.listeners.push(e), function () {
                    t._removeListener(e)
                }
            }, e.prototype.emit = function (e) {
                this.listeners.forEach(function (t) {
                    t(e)
                })
            }, e.prototype._removeListener = function (e) {
                this.listeners.splice(this.listeners.indexOf(e), 1)
            }, e.prototype.setUnexpectedErrorHandler = function (e) {
                this.unexpectedErrorHandler = e
            }, e.prototype.getUnexpectedErrorHandler = function () {
                return this.unexpectedErrorHandler
            }, e.prototype.onUnexpectedError = function (e) {
                this.unexpectedErrorHandler(e), this.emit(e)
            }, e.prototype.onUnexpectedExternalError = function (e) {
                this.unexpectedErrorHandler(e)
            }, e
        }()
        t.ErrorHandler = g, t.errorHandler = new g, t.setUnexpectedErrorHandler = i, t.onUnexpectedError = o, t.onUnexpectedExternalError = s, t.onUnexpectedPromiseError = a, t.transformErrorForSerialization = c
        var y = "Canceled"
        t.isPromiseCanceledError = u, t.canceled = l, t.notImplemented = f, t.illegalArgument = p, t.illegalState = d, t.readonly = h, t.create = v, t.getErrorMessage = m
    }), define(e[74], t([1, 0, 17]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r = function () {
            function e() {
            }

            return e.prototype.add = function (e, t, n) {
                var r = this
                void 0 === t && (t = null), this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(t), Array.isArray(n) && n.push({
                    dispose: function () {
                        return r.remove(e, t)
                    }
                })
            }, e.prototype.remove = function (e, t) {
                if (void 0 === t && (t = null), this._callbacks) {
                    for (var n = !1, r = 0, i = this._callbacks.length; r < i; r++)if (this._callbacks[r] === e) {
                        if (this._contexts[r] === t)return this._callbacks.splice(r, 1), void this._contexts.splice(r, 1)
                        n = !0
                    }
                    if (n)throw new Error("When adding a listener with a context, you should remove it with the same context")
                }
            }, e.prototype.invoke = function () {
                for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
                if (this._callbacks) {
                    for (var r = [], i = this._callbacks.slice(0), o = this._contexts.slice(0), s = 0, a = i.length; s < a; s++)try {
                        r.push(i[s].apply(o[s], e))
                    } catch (e) {
                        n.onUnexpectedError(e)
                    }
                    return r
                }
            }, e.prototype.isEmpty = function () {
                return !this._callbacks || 0 === this._callbacks.length
            }, e.prototype.entries = function () {
                var e = this
                return this._callbacks ? this._callbacks.map(function (t, n) {
                    return [t, e._contexts[n]]
                }) : []
            }, e.prototype.dispose = function () {
                this._callbacks = void 0, this._contexts = void 0
            }, e
        }()
        t["default"] = r
    }), define(e[4], t([1, 0, 9, 74, 47]), function (e, t, n, r, i) {
        "use strict"
        function o(e, t) {
            return function (n, r, i) {
                var o = e.addListener(t, function () {
                    n.apply(r, arguments)
                })
                return Array.isArray(i) && i.push(o), o
            }
        }

        function s(e) {
            var t, n = new w({
                onFirstListenerAdd: function () {
                    return t = e(function (e) {
                        return n.fire(e)
                    })
                }, onLastListenerRemove: function () {
                    return t.dispose()
                }
            })
            return n.event
        }

        function a(e) {
            var t = new w, n = !1
            return e.then(null, function () {
                return null
            }).then(function () {
                n ? t.fire() : setTimeout(function () {
                    return t.fire()
                }, 0)
            }), n = !0, t.event
        }

        function c(e) {
            var t = null, n = null, r = new w({
                onFirstListenerAdd: function () {
                    t = e.then(function (e) {
                        return n = e(function (e) {
                            return r.fire(e)
                        })
                    }, function () {
                        return null
                    })
                }, onLastListenerRemove: function () {
                    t && (t.cancel(), t = null), n && (n.dispose(), n = null)
                }
            })
            return r.event
        }

        function u(e) {
            return function (t, n, r) {
                void 0 === n && (n = null)
                var i = e(function (e) {
                    return i.dispose(), t.call(n, e)
                }, null, r)
                return i
            }
        }

        function l() {
            for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
            return function (t, r, i) {
                return void 0 === r && (r = null), n.combinedDisposable(e.map(function (e) {
                    return e(function (e) {
                        return t.call(r, e)
                    }, null, i)
                }))
            }
        }

        function f(e, t, n, r) {
            void 0 === n && (n = 100), void 0 === r && (r = !1)
            var i, o, s, a = new w({
                onFirstListenerAdd: function () {
                    i = e(function (e) {
                        o = t(o, e), !s && r && a.fire(o), clearTimeout(s), s = setTimeout(function () {
                            var e = o
                            o = void 0, a.fire(e), s = null
                        }, n)
                    })
                }, onLastListenerRemove: function () {
                    i.dispose()
                }
            })
            return a.event
        }

        function p(e, t) {
            return function (n, r, i) {
                return void 0 === r && (r = null), e(function (e) {
                    return n.call(r, t(e))
                }, null, i)
            }
        }

        function d(e, t) {
            return function (n, r, i) {
                return void 0 === r && (r = null), e(function (e) {
                    return t(e) && n.call(r, e)
                }, null, i)
            }
        }

        function h(e) {
            return new _(e)
        }

        function v(e) {
            var t = (new Date).getTime()
            return p(u(e), function (e) {
                return (new Date).getTime() - t
            })
        }

        function m(e, t, n) {
            void 0 === t && (t = !1), void 0 === n && (n = []), n = n.slice()
            var r = e(function (e) {
                n ? n.push(e) : o.fire(e)
            }), i = function () {
                n.forEach(function (e) {
                    return o.fire(e)
                }), n = null
            }, o = new w({
                onFirstListenerAdd: function () {
                    r || (r = e(function (e) {
                        return o.fire(e)
                    }))
                }, onFirstListenerDidAdd: function () {
                    n && (t ? setTimeout(i) : i())
                }, onLastListenerRemove: function () {
                    r.dispose(), r = null
                }
            })
            return o.event
        }

        function g(e, t, n) {
            void 0 === t && (t = !1), void 0 === n && (n = []), n = n.slice(), e(function (e) {
                n.push(e), i.fire(e)
            })
            var r = function (e, t) {
                return n.forEach(function (n) {
                    return e.call(t, n)
                })
            }, i = new w({
                onListenerDidAdd: function (e, n, i) {
                    t ? setTimeout(function () {
                        return r(n, i)
                    }) : r(n, i)
                }
            })
            return i.event
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var y
        !function (e) {
            var t = {
                dispose: function () {
                }
            }
            e.None = function () {
                return t
            }
        }(y || (y = {})), t["default"] = y
        var w = function () {
            function e(e) {
                this._options = e
            }

            return Object.defineProperty(e.prototype, "event", {
                get: function () {
                    var t = this
                    return this._event || (this._event = function (n, i, o) {
                        t._callbacks || (t._callbacks = new r["default"])
                        var s = t._callbacks.isEmpty()
                        s && t._options && t._options.onFirstListenerAdd && t._options.onFirstListenerAdd(t), t._callbacks.add(n, i), s && t._options && t._options.onFirstListenerDidAdd && t._options.onFirstListenerDidAdd(t), t._options && t._options.onListenerDidAdd && t._options.onListenerDidAdd(t, n, i)
                        var a
                        return a = {
                            dispose: function () {
                                a.dispose = e._noop, t._disposed || (t._callbacks.remove(n, i), t._options && t._options.onLastListenerRemove && t._callbacks.isEmpty() && t._options.onLastListenerRemove(t))
                            }
                        }, Array.isArray(o) && o.push(a), a
                    }), this._event
                }, enumerable: !0, configurable: !0
            }), e.prototype.fire = function (e) {
                this._callbacks && this._callbacks.invoke.call(this._callbacks, e)
            }, e.prototype.dispose = function () {
                this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0, this._disposed = !0)
            }, e
        }()
        w._noop = function () {
        }, t.Emitter = w
        var b = function () {
            function e() {
                var e = this
                this.hasListeners = !1, this.events = [], this.emitter = new w({
                    onFirstListenerAdd: function () {
                        return e.onFirstListenerAdd()
                    }, onLastListenerRemove: function () {
                        return e.onLastListenerRemove()
                    }
                })
            }

            return Object.defineProperty(e.prototype, "event", {
                get: function () {
                    return this.emitter.event
                }, enumerable: !0, configurable: !0
            }), e.prototype.add = function (e) {
                var t = this, r = {event: e, listener: null}
                this.events.push(r), this.hasListeners && this.hook(r)
                var o = function () {
                    t.hasListeners && t.unhook(r)
                    var e = t.events.indexOf(r)
                    t.events.splice(e, 1)
                }
                return n.toDisposable(i.once(o))
            }, e.prototype.onFirstListenerAdd = function () {
                var e = this
                this.hasListeners = !0, this.events.forEach(function (t) {
                    return e.hook(t)
                })
            }, e.prototype.onLastListenerRemove = function () {
                var e = this
                this.hasListeners = !1, this.events.forEach(function (t) {
                    return e.unhook(t)
                })
            }, e.prototype.hook = function (e) {
                var t = this
                e.listener = e.event(function (e) {
                    return t.emitter.fire(e)
                })
            }, e.prototype.unhook = function (e) {
                e.listener.dispose(), e.listener = null
            }, e.prototype.dispose = function () {
                this.emitter.dispose()
            }, e
        }()
        t.EventMultiplexer = b, t.fromEventEmitter = o, t.fromCallback = s, t.fromPromise = a, t.delayed = c, t.once = u, t.any = l, t.debounceEvent = f
        var S = function () {
            function e() {
                this.buffers = []
            }

            return e.prototype.wrapEvent = function (e) {
                var t = this
                return function (n, r, i) {
                    return e(function (e) {
                        var i = t.buffers[t.buffers.length - 1]
                        i ? i.push(function () {
                            return n.call(r, e)
                        }) : n.call(r, e)
                    }, void 0, i)
                }
            }, e.prototype.bufferEvents = function (e) {
                var t = []
                this.buffers.push(t), e(), this.buffers.pop(), t.forEach(function (e) {
                    return e()
                })
            }, e
        }()
        t.EventBufferer = S, t.mapEvent = p, t.filterEvent = d
        var _ = function () {
            function e(e) {
                this._event = e
            }

            return Object.defineProperty(e.prototype, "event", {
                get: function () {
                    return this._event
                }, enumerable: !0, configurable: !0
            }), e.prototype.map = function (t) {
                return new e(p(this._event, t))
            }, e.prototype.filter = function (t) {
                return new e(d(this._event, t))
            }, e.prototype.on = function (e, t, n) {
                return this._event(e, t, n)
            }, e
        }()
        t.chain = h, t.stopwatch = v, t.buffer = m, t.echo = g
    }), define(e[92], t([1, 0, 4]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r, i = Object.freeze(function (e, t) {
            var n = setTimeout(e.bind(t), 0)
            return {
                dispose: function () {
                    clearTimeout(n)
                }
            }
        })
        !function (e) {
            e.None = Object.freeze({
                isCancellationRequested: !1,
                onCancellationRequested: n["default"].None
            }), e.Cancelled = Object.freeze({isCancellationRequested: !0, onCancellationRequested: i})
        }(r = t.CancellationToken || (t.CancellationToken = {}))
        var o = function () {
            function e() {
                this._isCancelled = !1
            }

            return e.prototype.cancel = function () {
                this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this._emitter = void 0))
            }, Object.defineProperty(e.prototype, "isCancellationRequested", {
                get: function () {
                    return this._isCancelled
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onCancellationRequested", {
                get: function () {
                    return this._isCancelled ? i : (this._emitter || (this._emitter = new n.Emitter), this._emitter.event)
                }, enumerable: !0, configurable: !0
            }), e
        }(), s = function () {
            function e() {
            }

            return Object.defineProperty(e.prototype, "token", {
                get: function () {
                    return this._token || (this._token = new o), this._token
                }, enumerable: !0, configurable: !0
            }), e.prototype.cancel = function () {
                this._token ? this._token.cancel() : this._token = r.Cancelled
            }, e.prototype.dispose = function () {
                this.cancel()
            }, e
        }()
        t.CancellationTokenSource = s
    }), define(e[103], t([1, 0, 17]), function (e, t, r) {
        "use strict"
        function i(e) {
            try {
                return e()
            } catch (e) {
                r.onUnexpectedError(e)
            }
        }

        function o(e, t) {
            try {
                return e(t)
            } catch (e) {
                r.onUnexpectedError(e)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var s = function () {
            function e(e, t) {
                void 0 === e && (e = null), void 0 === t && (t = null), this.type = e, this.data = t
            }

            return e
        }()
        t.EmitterEvent = s
        var a = function () {
            function e(e) {
                if (void 0 === e && (e = null), this._listeners = {}, this._bulkListeners = [], this._collectedEvents = [], this._deferredCnt = 0, e) {
                    this._allowedEventTypes = {}
                    for (var t = 0; t < e.length; t++)this._allowedEventTypes[e[t]] = !0
                } else this._allowedEventTypes = null
            }

            return e.prototype.dispose = function () {
                this._listeners = {}, this._bulkListeners = [], this._collectedEvents = [], this._deferredCnt = 0, this._allowedEventTypes = null
            }, e.prototype.addListener = function (e, t) {
                if ("*" === e)throw new Error("Use addBulkListener(listener) to register your listener!")
                if (this._allowedEventTypes && !this._allowedEventTypes.hasOwnProperty(e))throw new Error("This object will never emit this event type!")
                this._listeners.hasOwnProperty(e) ? this._listeners[e].push(t) : this._listeners[e] = [t]
                var n = this
                return {
                    dispose: function () {
                        n && (n._removeListener(e, t), n = null, t = null)
                    }
                }
            }, e.prototype.addOneTimeListener = function (e, t) {
                var n = this.addListener(e, function (e) {
                    n.dispose(), t(e)
                })
                return n
            }, e.prototype.addBulkListener = function (e) {
                var t = this
                return this._bulkListeners.push(e), {
                    dispose: function () {
                        t._removeBulkListener(e)
                    }
                }
            }, e.prototype.addEmitter = function (e) {
                var t = this
                return e.addBulkListener(function (e) {
                    0 === t._deferredCnt ? t._emitEvents(e) : t._collectedEvents.push.apply(t._collectedEvents, e)
                })
            }, e.prototype._removeListener = function (e, t) {
                if (this._listeners.hasOwnProperty(e))for (var n = this._listeners[e], r = 0, i = n.length; r < i; r++)if (n[r] === t) {
                    n.splice(r, 1)
                    break
                }
            }, e.prototype._removeBulkListener = function (e) {
                for (var t = 0, n = this._bulkListeners.length; t < n; t++)if (this._bulkListeners[t] === e) {
                    this._bulkListeners.splice(t, 1)
                    break
                }
            }, e.prototype._emitToSpecificTypeListeners = function (e, t) {
                if (this._listeners.hasOwnProperty(e))for (var n = this._listeners[e].slice(0), r = 0, i = n.length; r < i; r++)o(n[r], t)
            }, e.prototype._emitToBulkListeners = function (e) {
                for (var t = this._bulkListeners.slice(0), n = 0, r = t.length; n < r; n++)o(t[n], e)
            }, e.prototype._emitEvents = function (e) {
                this._bulkListeners.length > 0 && this._emitToBulkListeners(e)
                for (var t = 0, n = e.length; t < n; t++) {
                    var r = e[t]
                    this._emitToSpecificTypeListeners(r.type, r.data)
                }
            }, e.prototype.emit = function (e, t) {
                if (void 0 === t && (t = {}), this._allowedEventTypes && !this._allowedEventTypes.hasOwnProperty(e))throw new Error("Cannot emit this event type because it wasn't listed!")
                if (this._listeners.hasOwnProperty(e) || 0 !== this._bulkListeners.length) {
                    var n = new s(e, t)
                    0 === this._deferredCnt ? this._emitEvents([n]) : this._collectedEvents.push(n)
                }
            }, e.prototype.beginDeferredEmit = function () {
                this._deferredCnt = this._deferredCnt + 1
            }, e.prototype.endDeferredEmit = function () {
                this._deferredCnt = this._deferredCnt - 1, 0 === this._deferredCnt && this._emitCollected()
            }, e.prototype.deferredEmit = function (e) {
                this.beginDeferredEmit()
                var t = i(e)
                return this.endDeferredEmit(), t
            }, e.prototype._emitCollected = function () {
                if (0 !== this._collectedEvents.length) {
                    var e = this._collectedEvents
                    this._collectedEvents = [], this._emitEvents(e)
                }
            }, e
        }()
        t.EventEmitter = a
        var c = function () {
            function e(e, t) {
                this.target = e, this.arg = t
            }

            return e
        }(), u = function (e) {
            function t() {
                var t = e.call(this, null) || this
                return t._emitQueue = [], t
            }

            return n(t, e), t.prototype._emitToSpecificTypeListeners = function (e, t) {
                if (this._listeners.hasOwnProperty(e))for (var n = this._listeners[e], r = 0, i = n.length; r < i; r++)this._emitQueue.push(new c(n[r], t))
            }, t.prototype._emitToBulkListeners = function (e) {
                for (var t = this._bulkListeners, n = 0, r = t.length; n < r; n++)this._emitQueue.push(new c(t[n], e))
            }, t.prototype._emitEvents = function (t) {
                for (e.prototype._emitEvents.call(this, t); this._emitQueue.length > 0;) {
                    var n = this._emitQueue.shift()
                    o(n.target, n.arg)
                }
            }, t
        }(a)
        t.OrderGuaranteeEventEmitter = u
    }), define(e[112], t([1, 0, 6, 114]), function (e, t, n, r) {
        "use strict"
        function i(e) {
            return {data: e, incoming: Object.create(null), outgoing: Object.create(null)}
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var o = function () {
            function e(e) {
                this._hashFn = e, this._nodes = Object.create(null)
            }

            return e.prototype.roots = function () {
                var e = []
                return r.forEach(this._nodes, function (t) {
                    n.isEmptyObject(t.value.outgoing) && e.push(t.value)
                }), e
            }, e.prototype.traverse = function (e, t, n) {
                var r = this.lookup(e)
                r && this._traverse(r, t, Object.create(null), n)
            }, e.prototype._traverse = function (e, t, n, i) {
                var o = this, s = this._hashFn(e.data)
                if (!n[s]) {
                    n[s] = !0, i(e.data)
                    var a = t ? e.outgoing : e.incoming
                    r.forEach(a, function (e) {
                        return o._traverse(e.value, t, n, i)
                    })
                }
            }, e.prototype.insertEdge = function (e, t) {
                var n = this.lookupOrInsertNode(e), r = this.lookupOrInsertNode(t)
                n.outgoing[this._hashFn(t)] = r, r.incoming[this._hashFn(e)] = n
            }, e.prototype.removeNode = function (e) {
                var t = this._hashFn(e)
                delete this._nodes[t], r.forEach(this._nodes, function (e) {
                    delete e.value.outgoing[t], delete e.value.incoming[t]
                })
            }, e.prototype.lookupOrInsertNode = function (e) {
                var t = this._hashFn(e), n = this._nodes[t]
                return n || (n = i(e), this._nodes[t] = n), n
            }, e.prototype.lookup = function (e) {
                return this._nodes[this._hashFn(e)]
            }, Object.defineProperty(e.prototype, "length", {
                get: function () {
                    return Object.keys(this._nodes).length
                }, enumerable: !0, configurable: !0
            }), e.prototype.toString = function () {
                var e = []
                return r.forEach(this._nodes, function (t) {
                    e.push(t.key + ", (incoming)[" + Object.keys(t.value.incoming).join(", ") + "], (outgoing)[" + Object.keys(t.value.outgoing).join(",") + "]")
                }), e.join("\n")
            }, e
        }()
        t.Graph = o
    }), define(e[8], t([1, 0, 6]), function (e, t, n) {
        "use strict"
        function r(e) {
            if (!e || "object" != typeof e)return e
            if (e instanceof RegExp)return e
            var t = Array.isArray(e) ? [] : {}
            return Object.keys(e).forEach(function (n) {
                e[n] && "object" == typeof e[n] ? t[n] = r(e[n]) : t[n] = e[n]
            }), t
        }

        function i(e) {
            if (!e || "object" != typeof e)return e
            var t = Array.isArray(e) ? [] : {}
            return Object.getOwnPropertyNames(e).forEach(function (n) {
                e[n] && "object" == typeof e[n] ? t[n] = i(e[n]) : t[n] = e[n]
            }), t
        }

        function o(e, t) {
            return s(e, t, [])
        }

        function s(e, t, r) {
            if (n.isUndefinedOrNull(e))return e
            var i = t(e)
            if (void 0 !== i)return i
            if (n.isArray(e)) {
                for (var o = [], a = 0; a < e.length; a++)o.push(s(e[a], t, r))
                return o
            }
            if (n.isObject(e)) {
                if (r.indexOf(e) >= 0)throw new Error("Cannot clone recursive data-structure")
                r.push(e)
                var c = {}
                for (var u in e)y.call(e, u) && (c[u] = s(e[u], t, r))
                return r.pop(), c
            }
            return e
        }

        function a(e, t, r) {
            return void 0 === r && (r = !0), n.isObject(e) ? (n.isObject(t) && Object.keys(t).forEach(function (i) {
                i in e ? r && (n.isObject(e[i]) && n.isObject(t[i]) ? a(e[i], t[i], r) : e[i] = t[i]) : e[i] = t[i]
            }), e) : t
        }

        function c(e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            return t.forEach(function (t) {
                return Object.keys(t).forEach(function (n) {
                    return e[n] = t[n]
                })
            }), e
        }

        function u(e, t) {
            return e.reduce(function (e, n) {
                return c(e, (r = {}, r[t(n)] = n, r))
                var r
            }, Object.create(null))
        }

        function l(e, t) {
            if (e === t)return !0
            if (null === e || void 0 === e || null === t || void 0 === t)return !1
            if (typeof e != typeof t)return !1
            if ("object" != typeof e)return !1
            if (Array.isArray(e) !== Array.isArray(t))return !1
            var n, r
            if (Array.isArray(e)) {
                if (e.length !== t.length)return !1
                for (n = 0; n < e.length; n++)if (!l(e[n], t[n]))return !1
            } else {
                var i = []
                for (r in e)i.push(r)
                i.sort()
                var o = []
                for (r in t)o.push(r)
                if (o.sort(), !l(i, o))return !1
                for (n = 0; n < i.length; n++)if (!l(e[i[n]], t[i[n]]))return !1
            }
            return !0
        }

        function f(e, t, n) {
            void 0 === e[t] && (e[t] = n)
        }

        function p(e) {
            for (var t = {}, n = 0; n < e.length; ++n)t[e[n]] = !0
            return t
        }

        function d(e, t) {
            void 0 === t && (t = !1), t && (e = e.map(function (e) {
                return e.toLowerCase()
            }))
            var n = p(e)
            return t ? function (e) {
                return void 0 !== n[e.toLowerCase()] && n.hasOwnProperty(e.toLowerCase())
            } : function (e) {
                return void 0 !== n[e] && n.hasOwnProperty(e)
            }
        }

        function h(e, t) {
            for (var n in e)e.hasOwnProperty(n) && (t[n] = e[n])
            t = t || function () {
                }
            var r = e.prototype, i = t.prototype
            t.prototype = Object.create(r)
            for (var n in i)i.hasOwnProperty(n) && Object.defineProperty(t.prototype, n, Object.getOwnPropertyDescriptor(i, n))
            Object.defineProperty(t.prototype, "constructor", {
                value: t,
                writable: !0,
                configurable: !0,
                enumerable: !0
            })
        }

        function v(e) {
            var t = []
            return JSON.stringify(e, function (e, r) {
                if (n.isObject(r) || Array.isArray(r)) {
                    if (-1 !== t.indexOf(r))return "[Circular]"
                    t.push(r)
                }
                return r
            })
        }

        function m(e, t, n) {
            void 0 === n && (n = null)
            var r = t(e)
            return void 0 === r ? n : r
        }

        function g(e, t) {
            var n = Object.create(null)
            return e && t ? (Object.keys(t).forEach(function (r) {
                var i = e[r], o = t[r]
                l(i, o) || (n[r] = o)
            }), n) : n
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.clone = r, t.deepClone = i
        var y = Object.prototype.hasOwnProperty
        t.cloneAndChange = o, t.mixin = a, t.assign = c, t.toObject = u, t.equals = l, t.ensureProperty = f, t.arrayToHash = p, t.createKeywordMatcher = d, t.derive = h, t.safeStringify = v, t.getOrDefault = m, t.distinct = g
    }), define(e[19], t([1, 0, 5]), function (e, t, n) {
        "use strict"
        function r(e) {
            return "%" + e.charCodeAt(0).toString(16).toUpperCase()
        }

        function i(e) {
            return encodeURIComponent(e).replace(/[!'()*]/g, r)
        }

        function o(e) {
            return e.replace(/[#?]/, r)
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var s = function () {
            function e() {
                this._scheme = e._empty, this._authority = e._empty, this._path = e._empty, this._query = e._empty, this._fragment = e._empty, this._formatted = null, this._fsPath = null
            }

            return e.isUri = function (t) {
                return t instanceof e || !!t && "string" == typeof t.authority && "string" == typeof t.fragment && "string" == typeof t.path && "string" == typeof t.query && "string" == typeof t.scheme
            }, Object.defineProperty(e.prototype, "scheme", {
                get: function () {
                    return this._scheme
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "authority", {
                get: function () {
                    return this._authority
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "path", {
                get: function () {
                    return this._path
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "query", {
                get: function () {
                    return this._query
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "fragment", {
                get: function () {
                    return this._fragment
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "fsPath", {
                get: function () {
                    if (!this._fsPath) {
                        var t
                        t = this._authority && this._path && "file" === this.scheme ? "//" + this._authority + this._path : e._driveLetterPath.test(this._path) ? this._path[1].toLowerCase() + this._path.substr(2) : this._path, n.isWindows && (t = t.replace(/\//g, "\\")), this._fsPath = t
                    }
                    return this._fsPath
                }, enumerable: !0, configurable: !0
            }), e.prototype["with"] = function (t) {
                if (!t)return this
                var n = t.scheme, r = t.authority, i = t.path, o = t.query, s = t.fragment
                if (void 0 === n ? n = this.scheme : null === n && (n = ""), void 0 === r ? r = this.authority : null === r && (r = ""), void 0 === i ? i = this.path : null === i && (i = ""), void 0 === o ? o = this.query : null === o && (o = ""), void 0 === s ? s = this.fragment : null === s && (s = ""), n === this.scheme && r === this.authority && i === this.path && o === this.query && s === this.fragment)return this
                var a = new e
                return a._scheme = n, a._authority = r, a._path = i, a._query = o, a._fragment = s, e._validate(a), a
            }, e.parse = function (t) {
                var n = new e, r = e._parseComponents(t)
                return n._scheme = r.scheme, n._authority = decodeURIComponent(r.authority), n._path = decodeURIComponent(r.path), n._query = decodeURIComponent(r.query), n._fragment = decodeURIComponent(r.fragment), e._validate(n), n
            }, e.file = function (t) {
                var r = new e
                if (r._scheme = "file", n.isWindows && (t = t.replace(/\\/g, e._slash)), t[0] === e._slash && t[0] === t[1]) {
                    var i = t.indexOf(e._slash, 2);
                    -1 === i ? r._authority = t.substring(2) : (r._authority = t.substring(2, i), r._path = t.substring(i))
                } else r._path = t
                return r._path[0] !== e._slash && (r._path = e._slash + r._path), e._validate(r), r
            }, e._parseComponents = function (t) {
                var n = {scheme: e._empty, authority: e._empty, path: e._empty, query: e._empty, fragment: e._empty},
                    r = e._regexp.exec(t)
                return r && (n.scheme = r[2] || n.scheme, n.authority = r[4] || n.authority, n.path = r[5] || n.path, n.query = r[7] || n.query, n.fragment = r[9] || n.fragment), n
            }, e.from = function (t) {
                return (new e)["with"](t)
            }, e._validate = function (t) {
                if (t.scheme && !e._schemePattern.test(t.scheme))throw new Error("[UriError]: Scheme contains illegal characters.")
                if (t.path)if (t.authority) {
                    if (!e._singleSlashStart.test(t.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')
                } else if (e._doubleSlashStart.test(t.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')
            }, e.prototype.toString = function (t) {
                return void 0 === t && (t = !1), t ? e._asFormatted(this, !0) : (this._formatted || (this._formatted = e._asFormatted(this, !1)), this._formatted)
            }, e._asFormatted = function (t, n) {
                var r = n ? o : i, s = [], a = t.scheme, c = t.authority, u = t.path, l = t.query, f = t.fragment
                if (a && s.push(a, ":"), (c || "file" === a) && s.push("//"), c) {
                    c = c.toLowerCase()
                    var p = c.indexOf(":");
                    -1 === p ? s.push(r(c)) : s.push(r(c.substr(0, p)), c.substr(p))
                }
                if (u) {
                    var d = e._upperCaseDrive.exec(u)
                    d && (u = d[1] ? "/" + d[2].toLowerCase() + u.substr(3) : d[2].toLowerCase() + u.substr(2))
                    for (var h = 0; ;) {
                        var p = u.indexOf(e._slash, h)
                        if (-1 === p) {
                            s.push(r(u.substring(h)))
                            break
                        }
                        s.push(r(u.substring(h, p)), e._slash), h = p + 1
                    }
                }
                return l && s.push("?", r(l)), f && s.push("#", r(f)), s.join(e._empty)
            }, e.prototype.toJSON = function () {
                var e = {fsPath: this.fsPath, external: this.toString(), $mid: 1}
                return this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e
            }, e.revive = function (t) {
                var n = new e
                return n._scheme = t.scheme || e._empty, n._authority = t.authority || e._empty, n._path = t.path || e._empty, n._query = t.query || e._empty, n._fragment = t.fragment || e._empty, n._fsPath = t.fsPath, n._formatted = t.external, e._validate(n), n
            }, e
        }()
        s._empty = "", s._slash = "/", s._regexp = /^(([^:\/?#]+?):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, s._driveLetterPath = /^\/[a-zA-z]:/, s._upperCaseDrive = /^(\/)?([A-Z]:)/, s._schemePattern = /^\w[\w\d+.-]*$/, s._singleSlashStart = /^\//, s._doubleSlashStart = /^\/\//, t["default"] = s
    }), define(e[30], t([1, 0]), function (e, t) {
        "use strict"
        function r() {
            return new c
        }

        function i(e) {
            return u.test(e)
        }

        function o(e) {
            if (!i(e))throw new Error("invalid uuid")
            return new a(e)
        }

        function s() {
            return r().asHex()
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var a = function () {
            function e(e) {
                this._value = e
            }

            return e.prototype.asHex = function () {
                return this._value
            }, e.prototype.equals = function (e) {
                return this.asHex() === e.asHex()
            }, e
        }(), c = function (e) {
            function t() {
                return e.call(this, [t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), "-", t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), "-", "4", t._randomHex(), t._randomHex(), t._randomHex(), "-", t._oneOf(t._timeHighBits), t._randomHex(), t._randomHex(), t._randomHex(), "-", t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex(), t._randomHex()].join("")) || this
            }

            return n(t, e), t._oneOf = function (e) {
                return e[Math.floor(e.length * Math.random())]
            }, t._randomHex = function () {
                return t._oneOf(t._chars)
            }, t
        }(a)
        c._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"], c._timeHighBits = ["8", "9", "a", "b"], t.v4 = r
        var u = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
        t.isUUID = i, t.parse = o, t.generateUuid = s
    }), function () {
        var e = {}
        e["WinJS/Core/_WinJS"] = {}
        var t = function (t, n, r) {
            var i = {}, o = !1, s = n.map(function (t) {
                return "exports" === t ? (o = !0, i) : e[t]
            }), a = r.apply({}, s)
            e[t] = o ? i : a
        }
        t("WinJS/Core/_Global", [], function () {
            "use strict"
            return "undefined" != typeof window ? window : "undefined" != typeof self ? self : "undefined" != typeof global ? global : {}
        }), t("WinJS/Core/_BaseCoreUtils", ["WinJS/Core/_Global"], function (e) {
            "use strict"
            function t(e) {
                return e.supportedForProcessing = !0, e
            }

            return {
                hasWinRT: !!e.Windows,
                markSupportedForProcessing: t,
                _setImmediate: e.setImmediate ? e.setImmediate.bind(e) : function (t) {
                    e.setTimeout(t, 0)
                }
            }
        }), t("WinJS/Core/_WriteProfilerMark", ["WinJS/Core/_Global"], function (e) {
            "use strict"
            return e.msWriteProfilerMark || function () {
                }
        }), t("WinJS/Core/_Base", ["WinJS/Core/_WinJS", "WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_WriteProfilerMark"], function (e, t, n, r) {
            "use strict"
            function i(e, t, n) {
                var r, i, o, s = Object.keys(t), a = Array.isArray(e)
                for (i = 0, o = s.length; i < o; i++) {
                    var c = s[i], u = 95 !== c.charCodeAt(0), l = t[c]
                    !l || "object" != typeof l || void 0 === l.value && "function" != typeof l.get && "function" != typeof l.set ? u ? a ? e.forEach(function (e) {
                        e[c] = l
                    }) : e[c] = l : (r = r || {}, r[c] = {
                        value: l,
                        enumerable: u,
                        configurable: !0,
                        writable: !0
                    }) : (void 0 === l.enumerable && (l.enumerable = u), n && l.setName && "function" == typeof l.setName && l.setName(n + "." + c), r = r || {}, r[c] = l)
                }
                r && (a ? e.forEach(function (e) {
                    Object.defineProperties(e, r)
                }) : Object.defineProperties(e, r))
            }

            return function () {
                function n(n, r) {
                    var i = n || {}
                    if (r) {
                        var o = r.split(".")
                        i === t && "WinJS" === o[0] && (i = e, o.splice(0, 1))
                        for (var s = 0, a = o.length; s < a; s++) {
                            var c = o[s]
                            i[c] || Object.defineProperty(i, c, {
                                value: {},
                                writable: !1,
                                enumerable: !0,
                                configurable: !0
                            }), i = i[c]
                        }
                    }
                    return i
                }

                function o(e, t, r) {
                    var o = n(e, t)
                    return r && i(o, r, t || "<ANONYMOUS>"), o
                }

                function s(e, n) {
                    return o(t, e, n)
                }

                function a(e) {
                    var t, n, i = l.uninitialized
                    return {
                        setName: function (e) {
                            t = e
                        }, get: function () {
                            switch (i) {
                                case l.initialized:
                                    return n
                                case l.uninitialized:
                                    i = l.working
                                    try {
                                        r("WinJS.Namespace._lazy:" + t + ",StartTM"), n = e()
                                    } finally {
                                        r("WinJS.Namespace._lazy:" + t + ",StopTM"), i = l.uninitialized
                                    }
                                    return e = null, i = l.initialized, n
                                case l.working:
                                    throw"Illegal: reentrancy on initialization"
                                default:
                                    throw"Illegal"
                            }
                        }, set: function (e) {
                            switch (i) {
                                case l.working:
                                    throw"Illegal: reentrancy on initialization"
                                default:
                                    i = l.initialized, n = e
                            }
                        }, enumerable: !0, configurable: !0
                    }
                }

                function c(e, r, o) {
                    var s = [e], a = null
                    return r && (a = n(t, r), s.push(a)), i(s, o, r || "<ANONYMOUS>"), a
                }

                var u = e
                u.Namespace || (u.Namespace = Object.create(Object.prototype))
                var l = {uninitialized: 1, working: 2, initialized: 3}
                Object.defineProperties(u.Namespace, {
                    defineWithParent: {
                        value: o,
                        writable: !0,
                        enumerable: !0,
                        configurable: !0
                    },
                    define: {value: s, writable: !0, enumerable: !0, configurable: !0},
                    _lazy: {value: a, writable: !0, enumerable: !0, configurable: !0},
                    _moduleDefine: {value: c, writable: !0, enumerable: !0, configurable: !0}
                })
            }(), function () {
                function t(e, t, r) {
                    return e = e || function () {
                        }, n.markSupportedForProcessing(e), t && i(e.prototype, t), r && i(e, r), e
                }

                function r(e, r, o, s) {
                    if (e) {
                        r = r || function () {
                            }
                        var a = e.prototype
                        return r.prototype = Object.create(a), n.markSupportedForProcessing(r), Object.defineProperty(r.prototype, "constructor", {
                            value: r,
                            writable: !0,
                            configurable: !0,
                            enumerable: !0
                        }), o && i(r.prototype, o), s && i(r, s), r
                    }
                    return t(r, o, s)
                }

                function o(e) {
                    e = e || function () {
                        }
                    var t, n
                    for (t = 1, n = arguments.length; t < n; t++)i(e.prototype, arguments[t])
                    return e
                }

                e.Namespace.define("WinJS.Class", {define: t, derive: r, mix: o})
            }(), {Namespace: e.Namespace, Class: e.Class}
        }), t("WinJS/Core/_ErrorFromName", ["WinJS/Core/_Base"], function (e) {
            "use strict"
            var t = e.Class.derive(Error, function (e, t) {
                this.name = e, this.message = t || e
            }, {}, {supportedForProcessing: !1})
            return e.Namespace.define("WinJS", {ErrorFromName: t}), t
        }), t("WinJS/Core/_Events", ["exports", "WinJS/Core/_Base"], function (e, t) {
            "use strict"
            function n(e) {
                var t = "_on" + e + "state"
                return {
                    get: function () {
                        var e = this[t]
                        return e && e.userHandler
                    }, set: function (n) {
                        var r = this[t]
                        n ? (r || (r = {
                            wrapper: function (e) {
                                return r.userHandler(e)
                            }, userHandler: n
                        }, Object.defineProperty(this, t, {
                            value: r,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }), this.addEventListener(e, r.wrapper, !1)), r.userHandler = n) : r && (this.removeEventListener(e, r.wrapper, !1), this[t] = null)
                    }, enumerable: !0
                }
            }

            function r() {
                for (var e = {}, t = 0, r = arguments.length; t < r; t++) {
                    var i = arguments[t]
                    e["on" + i] = n(i)
                }
                return e
            }

            var i = t.Class.define(function (e, t, n) {
                this.detail = t, this.target = n, this.timeStamp = Date.now(), this.type = e
            }, {
                bubbles: {value: !1, writable: !1},
                cancelable: {value: !1, writable: !1},
                currentTarget: {
                    get: function () {
                        return this.target
                    }
                },
                defaultPrevented: {
                    get: function () {
                        return this._preventDefaultCalled
                    }
                },
                trusted: {value: !1, writable: !1},
                eventPhase: {value: 0, writable: !1},
                target: null,
                timeStamp: null,
                type: null,
                preventDefault: function () {
                    this._preventDefaultCalled = !0
                },
                stopImmediatePropagation: function () {
                    this._stopImmediatePropagationCalled = !0
                },
                stopPropagation: function () {
                }
            }, {supportedForProcessing: !1}), o = {
                _listeners: null, addEventListener: function (e, t, n) {
                    n = n || !1, this._listeners = this._listeners || {}
                    for (var r = this._listeners[e] = this._listeners[e] || [], i = 0, o = r.length; i < o; i++) {
                        var s = r[i]
                        if (s.useCapture === n && s.listener === t)return
                    }
                    r.push({listener: t, useCapture: n})
                }, dispatchEvent: function (e, t) {
                    var n = this._listeners && this._listeners[e]
                    if (n) {
                        var r = new i(e, t, this)
                        n = n.slice(0, n.length)
                        for (var o = 0, s = n.length; o < s && !r._stopImmediatePropagationCalled; o++)n[o].listener(r)
                        return r.defaultPrevented || !1
                    }
                    return !1
                }, removeEventListener: function (e, t, n) {
                    n = n || !1
                    var r = this._listeners && this._listeners[e]
                    if (r)for (var i = 0, o = r.length; i < o; i++) {
                        var s = r[i]
                        if (s.listener === t && s.useCapture === n) {
                            r.splice(i, 1), 0 === r.length && delete this._listeners[e]
                            break
                        }
                    }
                }
            }
            t.Namespace._moduleDefine(e, "WinJS.Utilities", {
                _createEventProperty: n,
                createEventProperties: r,
                eventMixin: o
            })
        }), t("WinJS/Core/_Trace", ["WinJS/Core/_Global"], function (e) {
            "use strict"
            function t(e) {
                return e
            }

            return {
                _traceAsyncOperationStarting: e.Debug && e.Debug.msTraceAsyncOperationStarting && e.Debug.msTraceAsyncOperationStarting.bind(e.Debug) || t,
                _traceAsyncOperationCompleted: e.Debug && e.Debug.msTraceAsyncOperationCompleted && e.Debug.msTraceAsyncOperationCompleted.bind(e.Debug) || t,
                _traceAsyncCallbackStarting: e.Debug && e.Debug.msTraceAsyncCallbackStarting && e.Debug.msTraceAsyncCallbackStarting.bind(e.Debug) || t,
                _traceAsyncCallbackCompleted: e.Debug && e.Debug.msTraceAsyncCallbackCompleted && e.Debug.msTraceAsyncCallbackCompleted.bind(e.Debug) || t
            }
        }), t("WinJS/Promise/_StateMachine", ["WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_Base", "WinJS/Core/_ErrorFromName", "WinJS/Core/_Events", "WinJS/Core/_Trace"], function (e, t, n, r, i, o) {
            "use strict"
            function s() {
            }

            function a(e, t) {
                var n
                n = t && "object" == typeof t && "function" == typeof t.then ? W : F, e._value = t, e._setState(n)
            }

            function c(e, t, n, r, i, o) {
                return {exception: e, error: t, promise: n, handler: o, id: r, parent: i}
            }

            function u(e, t, n, r) {
                var i = n._isException, o = n._errorId
                return c(i ? t : null, i ? null : t, e, o, n, r)
            }

            function l(e, t, n) {
                var r = n._isException, i = n._errorId
                return b(e, i, r), c(r ? t : null, r ? null : t, e, i, n)
            }

            function f(e, t) {
                var n = ++B
                return b(e, n), c(null, t, e, n)
            }

            function p(e, t) {
                var n = ++B
                return b(e, n, !0), c(t, null, e, n)
            }

            function d(e, t, n, r) {
                w(e, {c: t, e: n, p: r, asyncOpID: o._traceAsyncOperationStarting("WinJS.Promise.done")})
            }

            function h(e, t, n, r) {
                e._value = t, g(e, t, n, r), e._setState(j)
            }

            function v(t, n) {
                var r = t._value, i = t._listeners
                if (i) {
                    t._listeners = null
                    var s, a
                    for (s = 0, a = Array.isArray(i) ? i.length : 1; s < a; s++) {
                        var c = 1 === a ? i : i[s], u = c.c, l = c.promise
                        if (o._traceAsyncOperationCompleted(c.asyncOpID, e.Debug && e.Debug.MS_ASYNC_OP_STATUS_SUCCESS), l) {
                            o._traceAsyncCallbackStarting(c.asyncOpID)
                            try {
                                l._setCompleteValue(u ? u(r) : r)
                            } catch (e) {
                                l._setExceptionValue(e)
                            } finally {
                                o._traceAsyncCallbackCompleted()
                            }
                            l._state !== W && l._listeners && n.push(l)
                        } else J.prototype.done.call(t, u)
                    }
                }
            }

            function m(t, n) {
                var r = t._value, i = t._listeners
                if (i) {
                    t._listeners = null
                    var s, a
                    for (s = 0, a = Array.isArray(i) ? i.length : 1; s < a; s++) {
                        var c = 1 === a ? i : i[s], l = c.e, f = c.promise,
                            p = e.Debug && (r && r.name === T ? e.Debug.MS_ASYNC_OP_STATUS_CANCELED : e.Debug.MS_ASYNC_OP_STATUS_ERROR)
                        if (o._traceAsyncOperationCompleted(c.asyncOpID, p), f) {
                            var d = !1
                            try {
                                l ? (o._traceAsyncCallbackStarting(c.asyncOpID), d = !0, l.handlesOnError || g(f, r, u, t, l), f._setCompleteValue(l(r))) : f._setChainedErrorValue(r, t)
                            } catch (e) {
                                f._setExceptionValue(e)
                            } finally {
                                d && o._traceAsyncCallbackCompleted()
                            }
                            f._state !== W && f._listeners && n.push(f)
                        } else K.prototype.done.call(t, null, l)
                    }
                }
            }

            function g(e, t, n, r, i) {
                if (k._listeners[I]) {
                    if (t instanceof Error && t.message === T)return
                    k.dispatchEvent(I, n(e, t, r, i))
                }
            }

            function y(e, t) {
                var n = e._listeners
                if (n) {
                    var r, i
                    for (r = 0, i = Array.isArray(n) ? n.length : 1; r < i; r++) {
                        var o = 1 === i ? n : n[r], s = o.p
                        if (s)try {
                            s(t)
                        } catch (e) {
                        }
                        o.c || o.e || !o.promise || o.promise._progress(t)
                    }
                }
            }

            function w(e, t) {
                var n = e._listeners
                n ? (n = Array.isArray(n) ? n : [n], n.push(t)) : n = t, e._listeners = n
            }

            function b(e, t, n) {
                e._isException = n || !1, e._errorId = t
            }

            function S(e, t, n, r) {
                e._value = t, g(e, t, n, r), e._setState(z)
            }

            function _(e, t) {
                var n
                n = t && "object" == typeof t && "function" == typeof t.then ? W : U, e._value = t, e._setState(n)
            }

            function E(e, t, n, r) {
                var i = new V(e)
                return w(e, {
                    promise: i,
                    c: t,
                    e: n,
                    p: r,
                    asyncOpID: o._traceAsyncOperationStarting("WinJS.Promise.then")
                }), i
            }

            function C(n) {
                var r
                return new Q(function (i) {
                    n ? r = e.setTimeout(i, n) : t._setImmediate(i)
                }, function () {
                    r && e.clearTimeout(r)
                })
            }

            function P(e, t) {
                var n = function () {
                    t.cancel()
                }, r = function () {
                    e.cancel()
                }
                return e.then(n), t.then(r, r), t
            }

            e.Debug && (e.Debug.setNonUserCodeExceptions = !0)
            var O = n.Class.mix(n.Class.define(null, {}, {supportedForProcessing: !1}), i.eventMixin), k = new O
            k._listeners = {}
            var I = "error", T = "Canceled", M = !1,
                x = {promise: 1, thenPromise: 2, errorPromise: 4, exceptionPromise: 8, completePromise: 16}
            x.all = x.promise | x.thenPromise | x.errorPromise | x.exceptionPromise | x.completePromise
            var D, A, W, R, L, N, F, U, j, z, B = 1
            D = {
                name: "created",
                enter: function (e) {
                    e._setState(A)
                },
                cancel: s,
                done: s,
                then: s,
                _completed: s,
                _error: s,
                _notify: s,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }, A = {
                name: "working",
                enter: s,
                cancel: function (e) {
                    e._setState(L)
                },
                done: d,
                then: E,
                _completed: a,
                _error: h,
                _notify: s,
                _progress: y,
                _setCompleteValue: _,
                _setErrorValue: S
            }, W = {
                name: "waiting",
                enter: function (e) {
                    var t = e._value
                    if (t instanceof V && t._state !== z && t._state !== U) w(t, {promise: e})
                    else {
                        var n = function (r) {
                            t._errorId ? e._chainedError(r, t) : (g(e, r, u, t, n), e._error(r))
                        }
                        n.handlesOnError = !0, t.then(e._completed.bind(e), n, e._progress.bind(e))
                    }
                },
                cancel: function (e) {
                    e._setState(R)
                },
                done: d,
                then: E,
                _completed: a,
                _error: h,
                _notify: s,
                _progress: y,
                _setCompleteValue: _,
                _setErrorValue: S
            }, R = {
                name: "waiting_canceled",
                enter: function (e) {
                    e._setState(N)
                    var t = e._value
                    t.cancel && t.cancel()
                },
                cancel: s,
                done: d,
                then: E,
                _completed: a,
                _error: h,
                _notify: s,
                _progress: y,
                _setCompleteValue: _,
                _setErrorValue: S
            }, L = {
                name: "canceled",
                enter: function (e) {
                    e._setState(N), e._cancelAction()
                },
                cancel: s,
                done: d,
                then: E,
                _completed: a,
                _error: h,
                _notify: s,
                _progress: y,
                _setCompleteValue: _,
                _setErrorValue: S
            }, N = {
                name: "canceling",
                enter: function (e) {
                    var t = new Error(T)
                    t.name = t.message, e._value = t, e._setState(j)
                },
                cancel: s,
                done: s,
                then: s,
                _completed: s,
                _error: s,
                _notify: s,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }, F = {
                name: "complete_notify",
                enter: function (e) {
                    if (e.done = J.prototype.done, e.then = J.prototype.then, e._listeners)for (var t, n = [e]; n.length;)t = n.shift(), t._state._notify(t, n)
                    e._setState(U)
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: v,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }, U = {
                name: "success",
                enter: function (e) {
                    e.done = J.prototype.done, e.then = J.prototype.then, e._cleanupAction()
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: v,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }, j = {
                name: "error_notify",
                enter: function (e) {
                    if (e.done = K.prototype.done, e.then = K.prototype.then, e._listeners)for (var t, n = [e]; n.length;)t = n.shift(), t._state._notify(t, n)
                    e._setState(z)
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: m,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }, z = {
                name: "error",
                enter: function (e) {
                    e.done = K.prototype.done, e.then = K.prototype.then, e._cleanupAction()
                },
                cancel: s,
                done: null,
                then: null,
                _completed: s,
                _error: s,
                _notify: m,
                _progress: s,
                _setCompleteValue: s,
                _setErrorValue: s
            }
            var H, q = n.Class.define(null, {
                _listeners: null, _nextState: null, _state: null, _value: null, cancel: function () {
                    this._state.cancel(this), this._run()
                }, done: function (e, t, n) {
                    this._state.done(this, e, t, n)
                }, then: function (e, t, n) {
                    return this._state.then(this, e, t, n)
                }, _chainedError: function (e, t) {
                    var n = this._state._error(this, e, l, t)
                    return this._run(), n
                }, _completed: function (e) {
                    var t = this._state._completed(this, e)
                    return this._run(), t
                }, _error: function (e) {
                    var t = this._state._error(this, e, f)
                    return this._run(), t
                }, _progress: function (e) {
                    this._state._progress(this, e)
                }, _setState: function (e) {
                    this._nextState = e
                }, _setCompleteValue: function (e) {
                    this._state._setCompleteValue(this, e), this._run()
                }, _setChainedErrorValue: function (e, t) {
                    var n = this._state._setErrorValue(this, e, l, t)
                    return this._run(), n
                }, _setExceptionValue: function (e) {
                    var t = this._state._setErrorValue(this, e, p)
                    return this._run(), t
                }, _run: function () {
                    for (; this._nextState;)this._state = this._nextState, this._nextState = null, this._state.enter(this)
                }
            }, {supportedForProcessing: !1}), V = n.Class.derive(q, function (e) {
                M && (!0 === M || M & x.thenPromise) && (this._stack = Q._getStack()), this._creator = e, this._setState(D), this._run()
            }, {
                _creator: null, _cancelAction: function () {
                    this._creator && this._creator.cancel()
                }, _cleanupAction: function () {
                    this._creator = null
                }
            }, {supportedForProcessing: !1}), K = n.Class.define(function (e) {
                M && (!0 === M || M & x.errorPromise) && (this._stack = Q._getStack()), this._value = e, g(this, e, f)
            }, {
                cancel: function () {
                }, done: function (e, t) {
                    var n = this._value
                    if (t)try {
                        t.handlesOnError || g(null, n, u, this, t)
                        var r = t(n)
                        return void(r && "object" == typeof r && "function" == typeof r.done && r.done())
                    } catch (e) {
                        n = e
                    }
                    n instanceof Error && n.message === T || Q._doneHandler(n)
                }, then: function (e, t) {
                    if (!t)return this
                    var n, r = this._value
                    try {
                        t.handlesOnError || g(null, r, u, this, t), n = new J(t(r))
                    } catch (e) {
                        n = e === r ? this : new G(e)
                    }
                    return n
                }
            }, {supportedForProcessing: !1}), G = n.Class.derive(K, function (e) {
                M && (!0 === M || M & x.exceptionPromise) && (this._stack = Q._getStack()), this._value = e, g(this, e, p)
            }, {}, {supportedForProcessing: !1}), J = n.Class.define(function (e) {
                if (M && (!0 === M || M & x.completePromise) && (this._stack = Q._getStack()), e && "object" == typeof e && "function" == typeof e.then) {
                    var t = new V(null)
                    return t._setCompleteValue(e), t
                }
                this._value = e
            }, {
                cancel: function () {
                }, done: function (e) {
                    if (e)try {
                        var t = e(this._value)
                        t && "object" == typeof t && "function" == typeof t.done && t.done()
                    } catch (e) {
                        Q._doneHandler(e)
                    }
                }, then: function (e) {
                    try {
                        var t = e ? e(this._value) : this._value
                        return t === this._value ? this : new J(t)
                    } catch (e) {
                        return new G(e)
                    }
                }
            }, {supportedForProcessing: !1}), Q = n.Class.derive(q, function (e, t) {
                M && (!0 === M || M & x.promise) && (this._stack = Q._getStack()), this._oncancel = t, this._setState(D), this._run()
                try {
                    e(this._completed.bind(this), this._error.bind(this), this._progress.bind(this))
                } catch (e) {
                    this._setExceptionValue(e)
                }
            }, {
                _oncancel: null, _cancelAction: function () {
                    try {
                        if (!this._oncancel)throw new Error("Promise did not implement oncancel")
                        this._oncancel()
                    } catch (e) {
                        e.message, e.stack
                        k.dispatchEvent("error", e)
                    }
                }, _cleanupAction: function () {
                    this._oncancel = null
                }
            }, {
                addEventListener: function (e, t, n) {
                    k.addEventListener(e, t, n)
                }, any: function (e) {
                    return new Q(function (t, n) {
                        var r = Object.keys(e)
                        0 === r.length && t()
                        var i = 0
                        r.forEach(function (o) {
                            Q.as(e[o]).then(function () {
                                t({key: o, value: e[o]})
                            }, function (s) {
                                if (s instanceof Error && s.name === T)return void(++i === r.length && t(Q.cancel))
                                n({key: o, value: e[o]})
                            })
                        })
                    }, function () {
                        Object.keys(e).forEach(function (t) {
                            var n = Q.as(e[t])
                            "function" == typeof n.cancel && n.cancel()
                        })
                    })
                }, as: function (e) {
                    return e && "object" == typeof e && "function" == typeof e.then ? e : new J(e)
                }, cancel: {
                    get: function () {
                        return H = H || new K(new r(T))
                    }
                }, dispatchEvent: function (e, t) {
                    return k.dispatchEvent(e, t)
                }, is: function (e) {
                    return e && "object" == typeof e && "function" == typeof e.then
                }, join: function (e) {
                    return new Q(function (t, n, r) {
                        var i = Object.keys(e), o = Array.isArray(e) ? [] : {}, s = Array.isArray(e) ? [] : {}, a = 0,
                            c = i.length, u = function (e) {
                                if (0 == --c) {
                                    var a = Object.keys(o).length
                                    if (0 === a) t(s)
                                    else {
                                        var u = 0
                                        i.forEach(function (e) {
                                            var t = o[e]
                                            t instanceof Error && t.name === T && u++
                                        }), u === a ? t(Q.cancel) : n(o)
                                    }
                                } else r({Key: e, Done: !0})
                            }
                        if (i.forEach(function (t) {
                                var n = e[t]
                                void 0 === n ? a++ : Q.then(n, function (e) {
                                    s[t] = e, u(t)
                                }, function (e) {
                                    o[t] = e, u(t)
                                })
                            }), 0 === (c -= a))return void t(s)
                    }, function () {
                        Object.keys(e).forEach(function (t) {
                            var n = Q.as(e[t])
                            "function" == typeof n.cancel && n.cancel()
                        })
                    })
                }, removeEventListener: function (e, t, n) {
                    k.removeEventListener(e, t, n)
                }, supportedForProcessing: !1, then: function (e, t, n, r) {
                    return Q.as(e).then(t, n, r)
                }, thenEach: function (e, t, n, r) {
                    var i = Array.isArray(e) ? [] : {}
                    return Object.keys(e).forEach(function (o) {
                        i[o] = Q.as(e[o]).then(t, n, r)
                    }), Q.join(i)
                }, timeout: function (e, t) {
                    var n = C(e)
                    return t ? P(n, t) : n
                }, wrap: function (e) {
                    return new J(e)
                }, wrapError: function (e) {
                    return new K(e)
                }, _veryExpensiveTagWithStack: {
                    get: function () {
                        return M
                    }, set: function (e) {
                        M = e
                    }
                }, _veryExpensiveTagWithStack_tag: x, _getStack: function () {
                    if (e.Debug && e.Debug.debuggerEnabled)try {
                        throw new Error
                    } catch (e) {
                        return e.stack
                    }
                }, _cancelBlocker: function (e, t) {
                    if (!Q.is(e))return Q.wrap(e)
                    var n, r, i = new Q(function (e, t) {
                        n = e, r = t
                    }, function () {
                        n = null, r = null, t && t()
                    })
                    return e.then(function (e) {
                        n && n(e)
                    }, function (e) {
                        r && r(e)
                    }), i
                }
            })
            return Object.defineProperties(Q, i.createEventProperties(I)), Q._doneHandler = function (e) {
                t._setImmediate(function () {
                    throw e
                })
            }, {PromiseStateMachine: q, Promise: Q, state_created: D}
        }), t("WinJS/Promise", ["WinJS/Core/_Base", "WinJS/Promise/_StateMachine"], function (e, t) {
            "use strict"
            return e.Namespace.define("WinJS", {Promise: t.Promise}), t.Promise
        })
        var n = e["WinJS/Core/_WinJS"]
        "undefined" == typeof exports && "function" == typeof define && define.amd ? define("vs/base/common/winjs.base.raw", n) : module.exports = n, "undefined" != typeof process && "function" == typeof process.nextTick && (e["WinJS/Core/_BaseCoreUtils"]._setImmediate = function (e) {
            return process.nextTick(e)
        })
    }(), define(e[2], t([138, 17]), function (e, t) {
        "use strict"
        function n(e) {
            var n = e.detail, i = n.id
            if (n.parent)return void(n.handler && r && delete r[i])
            r[i] = n, 1 === Object.keys(r).length && setTimeout(function () {
                var e = r
                r = {}, Object.keys(e).forEach(function (n) {
                    var r = e[n]
                    r.exception ? t.onUnexpectedError(r.exception) : r.error && t.onUnexpectedError(r.error), console.log("WARNING: Promise with no error callback:" + r.id), console.log(r), r.exception && console.log(r.exception.stack)
                })
            }, 0)
        }

        var r = {}
        return e.Promise.addEventListener("error", n), {Promise: e.Promise, TPromise: e.Promise, PPromise: e.Promise}
    }), define(e[34], t([1, 0, 17, 5, 2, 92, 9, 4]), function (e, t, r, i, o, s, a, c) {
        "use strict"
        function u(e) {
            return e && "function" == typeof e.then
        }

        function l(e) {
            return u(e) ? e : o.TPromise.as(e)
        }

        function f(e) {
            var t = new s.CancellationTokenSource
            return new o.TPromise(function (n, r, i) {
                var s = e(t.token)
                s instanceof o.TPromise ? s.then(n, r, i) : u(s) ? s.then(n, r) : n(s)
            }, function () {
                t.cancel()
            })
        }

        function p(e, t, n) {
            var i = e.onCancellationRequested(function () {
                return t.cancel()
            })
            return n && (t = t.then(void 0, function (e) {
                if (!r.isPromiseCanceledError(e))return o.TPromise.wrapError(e)
            })), d(t, function () {
                return i.dispose()
            })
        }

        function d(e, t) {
            return new o.TPromise(function (n, i, o) {
                e.done(function (e) {
                    try {
                        t(e)
                    } catch (e) {
                        r.onUnexpectedError(e)
                    }
                    n(e)
                }, function (e) {
                    try {
                        t(e)
                    } catch (e) {
                        r.onUnexpectedError(e)
                    }
                    i(e)
                }, function (e) {
                    o(e)
                })
            }, function () {
                e.cancel()
            })
        }

        function h(e) {
            function t() {
                return e.length ? e.pop()() : null
            }

            function n(e) {
                void 0 !== e && null !== e && r.push(e)
                var i = t()
                return i ? i.then(n) : o.TPromise.as(r)
            }

            var r = []
            return e = e.reverse(), o.TPromise.as(null).then(n)
        }

        function v(e, t) {
            void 0 === t && (t = function (e) {
                return !!e
            }), e = e.reverse().slice()
            var n = function () {
                return 0 === e.length ? o.TPromise.as(null) : e.pop()().then(function (e) {
                    return t(e) ? o.TPromise.as(e) : n()
                })
            }
            return n()
        }

        function m(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++)n[r - 2] = arguments[r]
            var i = setTimeout.apply(void 0, [e, t].concat(n))
            return {
                dispose: function () {
                    clearTimeout(i)
                }
            }
        }

        function g(e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            return new o.Promise(function (n, r) {
                return e.apply(void 0, t.concat([function (e, t) {
                    return e ? r(e) : n(t)
                }]))
            })
        }

        function y(e, t) {
            for (var n = [], r = 2; r < arguments.length; r++)n[r - 2] = arguments[r]
            return new o.Promise(function (r, i) {
                return t.call.apply(t, [e].concat(n, [function (e, t) {
                    return e ? i(e) : r(t)
                }]))
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.toThenable = l, t.asWinJsPromise = f, t.wireCancellationToken = p
        var w = function () {
            function e() {
                this.activePromise = null, this.queuedPromise = null, this.queuedPromiseFactory = null
            }

            return e.prototype.queue = function (e) {
                var t = this
                if (this.activePromise) {
                    if (this.queuedPromiseFactory = e, !this.queuedPromise) {
                        var n = function () {
                            t.queuedPromise = null
                            var e = t.queue(t.queuedPromiseFactory)
                            return t.queuedPromiseFactory = null, e
                        }
                        this.queuedPromise = new o.Promise(function (e, r, i) {
                            t.activePromise.then(n, n, i).done(e)
                        }, function () {
                            t.activePromise.cancel()
                        })
                    }
                    return new o.Promise(function (e, n, r) {
                        t.queuedPromise.then(e, n, r)
                    }, function () {
                    })
                }
                return this.activePromise = e(), new o.Promise(function (e, n, r) {
                    t.activePromise.done(function (n) {
                        t.activePromise = null, e(n)
                    }, function (e) {
                        t.activePromise = null, n(e)
                    }, r)
                }, function () {
                    t.activePromise.cancel()
                })
            }, e
        }()
        t.Throttler = w
        var b = function () {
            function e() {
                this.current = o.TPromise.as(null)
            }

            return e.prototype.queue = function (e) {
                return this.current = this.current.then(function () {
                    return e()
                })
            }, e
        }()
        t.SimpleThrottler = b
        var S = function () {
            function e(e) {
                this.defaultDelay = e, this.timeout = null, this.completionPromise = null, this.onSuccess = null, this.task = null
            }

            return e.prototype.trigger = function (e, t) {
                var n = this
                return void 0 === t && (t = this.defaultDelay), this.task = e, this.cancelTimeout(), this.completionPromise || (this.completionPromise = new o.Promise(function (e) {
                    n.onSuccess = e
                }, function () {
                }).then(function () {
                    n.completionPromise = null, n.onSuccess = null
                    var e = n.task
                    return n.task = null, e()
                })), this.timeout = setTimeout(function () {
                    n.timeout = null, n.onSuccess(null)
                }, t), this.completionPromise
            }, e.prototype.isTriggered = function () {
                return null !== this.timeout
            }, e.prototype.cancel = function () {
                this.cancelTimeout(), this.completionPromise && (this.completionPromise.cancel(), this.completionPromise = null)
            }, e.prototype.cancelTimeout = function () {
                null !== this.timeout && (clearTimeout(this.timeout), this.timeout = null)
            }, e
        }()
        t.Delayer = S
        var _ = function (e) {
            function t(t) {
                var n = e.call(this, t) || this
                return n.throttler = new w, n
            }

            return n(t, e), t.prototype.trigger = function (t, n) {
                var r = this
                return e.prototype.trigger.call(this, function () {
                    return r.throttler.queue(t)
                }, n)
            }, t
        }(S)
        t.ThrottledDelayer = _
        var E = function (e) {
            function t(t, n) {
                void 0 === n && (n = 0)
                var r = e.call(this, t) || this
                return r.minimumPeriod = n, r.periodThrottler = new w, r
            }

            return n(t, e), t.prototype.trigger = function (t, n) {
                var r = this
                return e.prototype.trigger.call(this, function () {
                    return r.periodThrottler.queue(function () {
                        return o.Promise.join([o.TPromise.timeout(r.minimumPeriod), t()]).then(function (e) {
                            return e[1]
                        })
                    })
                }, n)
            }, t
        }(_)
        t.PeriodThrottledDelayer = E
        var C = function () {
            function e() {
                var e = this
                this._value = new o.TPromise(function (t, n) {
                    e._completeCallback = t, e._errorCallback = n
                })
            }

            return Object.defineProperty(e.prototype, "value", {
                get: function () {
                    return this._value
                }, enumerable: !0, configurable: !0
            }), e.prototype.complete = function (e) {
                this._completeCallback(e)
            }, e.prototype.error = function (e) {
                this._errorCallback(e)
            }, e
        }()
        t.PromiseSource = C
        var P = function (e) {
            function t(t) {
                var n, i, o, s = this
                return s = e.call(this, function (e, t, r) {
                        n = e, i = t, o = r
                    }, function () {
                        i(r.canceled())
                    }) || this, t.then(n, i, o), s
            }

            return n(t, e), t
        }(o.TPromise)
        t.ShallowCancelThenPromise = P, t.always = d, t.sequence = h, t.first = v
        var O = function () {
            function e(e) {
                this.maxDegreeOfParalellism = e, this.outstandingPromises = [], this.runningPromises = 0, this._onFinished = new c.Emitter
            }

            return Object.defineProperty(e.prototype, "onFinished", {
                get: function () {
                    return this._onFinished.event
                }, enumerable: !0, configurable: !0
            }), e.prototype.queue = function (e) {
                var t = this
                return new o.TPromise(function (n, r, i) {
                    t.outstandingPromises.push({factory: e, c: n, e: r, p: i}), t.consume()
                })
            }, e.prototype.consume = function () {
                for (var e = this; this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism;) {
                    var t = this.outstandingPromises.shift()
                    this.runningPromises++
                    var n = t.factory()
                    n.done(t.c, t.e, t.p), n.done(function () {
                        return e.consumed()
                    }, function () {
                        return e.consumed()
                    })
                }
            }, e.prototype.consumed = function () {
                this.runningPromises--, this.outstandingPromises.length > 0 ? this.consume() : this._onFinished.fire()
            }, e.prototype.dispose = function () {
                this._onFinished.dispose()
            }, e
        }()
        t.Limiter = O
        var k = function (e) {
            function t() {
                return e.call(this, 1) || this
            }

            return n(t, e), t
        }(O)
        t.Queue = k, t.setDisposableTimeout = m
        var I = function (e) {
            function t() {
                var t = e.call(this) || this
                return t._token = -1, t
            }

            return n(t, e), t.prototype.dispose = function () {
                this.cancel(), e.prototype.dispose.call(this)
            }, t.prototype.cancel = function () {
                -1 !== this._token && (i.clearTimeout(this._token), this._token = -1)
            }, t.prototype.cancelAndSet = function (e, t) {
                var n = this
                this.cancel(), this._token = i.setTimeout(function () {
                    n._token = -1, e()
                }, t)
            }, t.prototype.setIfNotSet = function (e, t) {
                var n = this;
                -1 === this._token && (this._token = i.setTimeout(function () {
                    n._token = -1, e()
                }, t))
            }, t
        }(a.Disposable)
        t.TimeoutTimer = I
        var T = function (e) {
            function t() {
                var t = e.call(this) || this
                return t._token = -1, t
            }

            return n(t, e), t.prototype.dispose = function () {
                this.cancel(), e.prototype.dispose.call(this)
            }, t.prototype.cancel = function () {
                -1 !== this._token && (i.clearInterval(this._token), this._token = -1)
            }, t.prototype.cancelAndSet = function (e, t) {
                this.cancel(), this._token = i.setInterval(function () {
                    e()
                }, t)
            }, t
        }(a.Disposable)
        t.IntervalTimer = T
        var M = function () {
            function e(e, t) {
                this.timeoutToken = -1, this.runner = e, this.timeout = t, this.timeoutHandler = this.onTimeout.bind(this)
            }

            return e.prototype.dispose = function () {
                this.cancel(), this.runner = null
            }, e.prototype.cancel = function () {
                this.isScheduled() && (i.clearTimeout(this.timeoutToken), this.timeoutToken = -1)
            }, e.prototype.setRunner = function (e) {
                this.runner = e
            }, e.prototype.schedule = function (e) {
                void 0 === e && (e = this.timeout), this.cancel(), this.timeoutToken = i.setTimeout(this.timeoutHandler, e)
            }, e.prototype.isScheduled = function () {
                return -1 !== this.timeoutToken
            }, e.prototype.onTimeout = function () {
                this.timeoutToken = -1, this.runner && this.runner()
            }, e
        }()
        t.RunOnceScheduler = M, t.nfcall = g, t.ninvoke = y
    }), define(e[96], t([1, 0, 20, 11, 18, 48, 2]), function (e, t, n, r, i, o, s) {
        "use strict"
        function a(e) {
            switch (e) {
                case 0:
                    return ""
                case 1:
                    return P + "*?"
                default:
                    return "(?:" + C + "|" + P + "+" + C + "|" + C + P + "+)*?"
            }
        }

        function c(e, t) {
            if (!e)return []
            for (var n, r = [], i = !1, o = !1, s = "", a = 0; a < e.length; a++) {
                switch (n = e[a]) {
                    case t:
                        if (!i && !o) {
                            r.push(s), s = ""
                            continue
                        }
                        break
                    case"{":
                        i = !0
                        break
                    case"}":
                        i = !1
                        break
                    case"[":
                        o = !0
                        break
                    case"]":
                        o = !1
                }
                s += n
            }
            return s && r.push(s), r
        }

        function u(e) {
            if (!e)return ""
            var t = "", n = c(e, "/")
            if (n.every(function (e) {
                    return "**" === e
                })) t = ".*"
            else {
                var i = !1
                n.forEach(function (e, o) {
                    if ("**" === e)return void(i || (t += a(2), i = !0))
                    for (var s, l = !1, f = "", p = !1, d = "", h = 0; h < e.length; h++)if ("}" !== (s = e[h]) && l) f += s
                    else if ("]" !== s && p) {
                        var v = void 0
                        switch (s) {
                            case"-":
                            case"^":
                                v = s
                                break
                            default:
                                v = r.escapeRegExpCharacters(s)
                        }
                        d += v
                    } else switch (s) {
                        case"{":
                            l = !0
                            continue
                        case"[":
                            p = !0
                            continue
                        case"}":
                            var m = c(f, ","), g = "(?:" + m.map(function (e) {
                                    return u(e)
                                }).join("|") + ")"
                            t += g, l = !1, f = ""
                            break
                        case"]":
                            t += "[" + d + "]", p = !1, d = ""
                            break
                        case"?":
                            t += P
                            continue
                        case"*":
                            t += a(1)
                            continue
                        default:
                            t += r.escapeRegExpCharacters(s)
                    }
                    o < n.length - 1 && "**" !== n[o + 1] && (t += C), i = !1
                })
            }
            return t
        }

        function l(e, t) {
            if (!e)return R
            e = e.trim()
            var n = e + "_" + !!t.trimForExclusions, i = A.get(n)
            if (i)return i
            var o
            if (k.test(e)) {
                var s = e.substr(4)
                i = function (t, n) {
                    return t && r.endsWith(t, s) ? e : null
                }
            } else i = (o = I.exec(f(e, t))) ? p(o[1], e) : (t.trimForExclusions ? M : T).test(e) ? d(e, t) : (o = x.exec(f(e, t))) ? h(o[1].substr(1), e, !0) : (o = D.exec(f(e, t))) ? h(o[1], e, !1) : v(e)
            return A.set(n, i), i
        }

        function f(e, t) {
            return t.trimForExclusions && r.endsWith(e, "/**") ? e.substr(0, e.length - 2) : e
        }

        function p(e, t) {
            var n = "/" + e, i = "\\" + e, o = function (o, s) {
                return o ? s ? s === e ? t : null : o === e || r.endsWith(o, n) || r.endsWith(o, i) ? t : null : null
            }, s = [e]
            return o.basenames = s, o.patterns = [t], o.allBasenames = s, o
        }

        function d(e, t) {
            var r = E(e.slice(1, -1).split(",").map(function (e) {
                return l(e, t)
            }).filter(function (e) {
                return e !== R
            }), e), i = r.length
            if (!i)return R
            if (1 === i)return r[0]
            var o = function (t, n) {
                for (var i = 0, o = r.length; i < o; i++)if (r[i](t, n))return e
                return null
            }, s = n.first(r, function (e) {
                return !!e.allBasenames
            })
            s && (o.allBasenames = s.allBasenames)
            var a = r.reduce(function (e, t) {
                return t.allPaths ? e.concat(t.allPaths) : e
            }, [])
            return a.length && (o.allPaths = a), o
        }

        function h(e, t, n) {
            var o = i.nativeSep !== i.sep ? e.replace(O, i.nativeSep) : e, s = i.nativeSep + o,
                a = n ? function (e, n) {
                    return e && (e === o || r.endsWith(e, s)) ? t : null
                } : function (e, n) {
                    return e && e === o ? t : null
                }
            return a.allPaths = [(n ? "*/" : "./") + e], a
        }

        function v(e) {
            try {
                var t = new RegExp("^" + u(e) + "$")
                return function (n, r) {
                    return t.lastIndex = 0, n && t.test(n) ? e : null
                }
            } catch (e) {
                return R
            }
        }

        function m(e, t, n) {
            return !(!e || !t) && g(e)(t, void 0, n)
        }

        function g(e, t) {
            if (void 0 === t && (t = {}), !e)return W
            if ("string" == typeof e) {
                var n = l(e, t)
                if (n === R)return W
                var r = function (e, t) {
                    return !!n(e, t)
                }
                return n.allBasenames && (r.allBasenames = n.allBasenames), n.allPaths && (r.allPaths = n.allPaths), r
            }
            return S(e, t)
        }

        function y(e, t) {
            var n = g(e, t)
            return function (e, t, r) {
                return s.TPromise.as(n(e, t, r))
            }
        }

        function w(e) {
            return e.allBasenames || []
        }

        function b(e) {
            return e.allPaths || []
        }

        function S(e, t) {
            var r = E(Object.getOwnPropertyNames(e).map(function (n) {
                return _(n, e[n], t)
            }).filter(function (e) {
                return e !== R
            })), o = r.length
            if (!o)return R
            if (!r.some(function (e) {
                    return e.requiresSiblings
                })) {
                if (1 === o)return r[0]
                var a = function (e, t, n) {
                    for (var i = 0, o = r.length; i < o; i++) {
                        var s = r[i](e, t)
                        if (s)return s
                    }
                    return null
                }, c = n.first(r, function (e) {
                    return !!e.allBasenames
                })
                c && (a.allBasenames = c.allBasenames)
                var u = r.reduce(function (e, t) {
                    return t.allPaths ? e.concat(t.allPaths) : e
                }, [])
                return u.length && (a.allPaths = u), a
            }
            var l = function (e, t, n) {
                function o(n) {
                    if (n && n.length) {
                        t || (t = i.basename(e))
                        return {siblings: n, name: t.substr(0, t.length - i.extname(e).length)}
                    }
                }

                function a() {
                    if (!u) {
                        u = !0
                        var e = n()
                        c = s.TPromise.is(e) ? e.then(o) : o(e)
                    }
                    return c
                }

                for (var c, u = !n, l = 0, f = r.length; l < f; l++) {
                    var p = r[l](e, t, a)
                    if (p)return p
                }
                return null
            }, f = n.first(r, function (e) {
                return !!e.allBasenames
            })
            f && (l.allBasenames = f.allBasenames)
            var p = r.reduce(function (e, t) {
                return t.allPaths ? e.concat(t.allPaths) : e
            }, [])
            return p.length && (l.allPaths = p), l
        }

        function _(e, t, n) {
            if (!1 === t)return R
            var r = l(e, n)
            if (r === R)return R
            if ("boolean" == typeof t)return r
            if (t) {
                var i = t.when
                if ("string" == typeof i) {
                    var o = function (t) {
                        var n = i.replace("$(basename)", t.name)
                        return -1 !== t.siblings.indexOf(n) ? e : null
                    }, a = function (e, t, n) {
                        if (!r(e, t))return null
                        var i = n()
                        return i ? s.TPromise.is(i) ? i.then(o) : o(i) : null
                    }
                    return a.requiresSiblings = !0, a
                }
            }
            return r
        }

        function E(e, t) {
            var n = e.filter(function (e) {
                return !!e.basenames
            })
            if (n.length < 2)return e
            var r, i = n.reduce(function (e, t) {
                return e.concat(t.basenames)
            }, [])
            if (t) {
                r = []
                for (var o = 0, s = i.length; o < s; o++)r.push(t)
            } else r = n.reduce(function (e, t) {
                return e.concat(t.patterns)
            }, [])
            var a = function (e, t) {
                if (!e)return null
                if (!t) {
                    var n = void 0
                    for (n = e.length; n > 0; n--) {
                        var o = e.charCodeAt(n - 1)
                        if (47 === o || 92 === o)break
                    }
                    t = e.substr(n)
                }
                var s = i.indexOf(t)
                return -1 !== s ? r[s] : null
            }
            a.basenames = i, a.patterns = r, a.allBasenames = i
            var c = e.filter(function (e) {
                return !e.basenames
            })
            return c.push(a), c
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var C = "[/\\\\]", P = "[^/\\\\]", O = /\//g
        t.splitGlobAware = c
        var k = /^\*\*\/\*\.[\w\.-]+$/, I = /^\*\*\/([\w\.-]+)\/?$/,
            T = /^{\*\*\/[\*\.]?[\w\.-]+\/?(,\*\*\/[\*\.]?[\w\.-]+\/?)*}$/,
            M = /^{\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?(,\*\*\/[\*\.]?[\w\.-]+(\/(\*\*)?)?)*}$/,
            x = /^\*\*((\/[\w\.-]+)+)\/?$/, D = /^([\w\.-]+(\/[\w\.-]+)*)\/?$/, A = new o.BoundedLinkedMap(1e4),
            W = function () {
                return !1
            }, R = function () {
                return null
            }
        t.match = m, t.parse = g, t.parseToAsync = y, t.getBasenameTerms = w, t.getPathTerms = b
    }), define(e[97], t([1, 0, 18, 6, 11, 96]), function (e, t, n, r, i, o) {
        "use strict"
        function s(e) {
            var t = a(e)
            v.push(t), t.userConfigured ? g.push(t) : m.push(t), t.userConfigured || v.forEach(function (e) {
                e.mime === t.mime || e.userConfigured || (t.extension && e.extension === t.extension && console.warn("Overwriting extension <<" + t.extension + ">> to now point to mime <<" + t.mime + ">>"), t.filename && e.filename === t.filename && console.warn("Overwriting filename <<" + t.filename + ">> to now point to mime <<" + t.mime + ">>"), t.filepattern && e.filepattern === t.filepattern && console.warn("Overwriting filepattern <<" + t.filepattern + ">> to now point to mime <<" + t.mime + ">>"), t.firstline && e.firstline === t.firstline && console.warn("Overwriting firstline <<" + t.firstline + ">> to now point to mime <<" + t.mime + ">>"))
            })
        }

        function a(e) {
            return {
                id: e.id,
                mime: e.mime,
                filename: e.filename,
                extension: e.extension,
                filepattern: e.filepattern,
                firstline: e.firstline,
                userConfigured: e.userConfigured,
                filenameLowercase: e.filename ? e.filename.toLowerCase() : void 0,
                extensionLowercase: e.extension ? e.extension.toLowerCase() : void 0,
                filepatternLowercase: e.filepattern ? e.filepattern.toLowerCase() : void 0,
                filepatternOnPath: !!e.filepattern && e.filepattern.indexOf(n.sep) >= 0
            }
        }

        function c(e) {
            e ? (v = v.filter(function (e) {
                return !e.userConfigured
            }), g = []) : (v = [], m = [], g = [])
        }

        function u(e, r) {
            if (!e)return [t.MIME_UNKNOWN]
            e = e.toLowerCase()
            var i = n.basename(e), o = l(e, i, g)
            if (o)return [o, t.MIME_TEXT]
            var s = l(e, i, m)
            if (s)return [s, t.MIME_TEXT]
            if (r) {
                var a = f(r)
                if (a)return [a, t.MIME_TEXT]
            }
            return [t.MIME_UNKNOWN]
        }

        function l(e, t, n) {
            for (var r, s, a, c = n.length - 1; c >= 0; c--) {
                var u = n[c]
                if (t === u.filenameLowercase) {
                    r = u
                    break
                }
                if (u.filepattern && (!s || u.filepattern.length > s.filepattern.length)) {
                    var l = u.filepatternOnPath ? e : t
                    o.match(u.filepatternLowercase, l) && (s = u)
                }
                u.extension && (!a || u.extension.length > a.extension.length) && i.endsWith(t, u.extensionLowercase) && (a = u)
            }
            return r ? r.mime : s ? s.mime : a ? a.mime : null
        }

        function f(e) {
            if (i.startsWithUTF8BOM(e) && (e = e.substr(1)), e.length > 0)for (var t = 0; t < v.length; ++t) {
                var n = v[t]
                if (n.firstline) {
                    var r = e.match(n.firstline)
                    if (r && r.length > 0)return n.mime
                }
            }
            return null
        }

        function p(e) {
            if (!e)return !1
            var n
            return n = r.isArray(e) ? e : e.split(",").map(function (e) {
                return e.trim()
            }), n.indexOf(t.MIME_BINARY) >= 0
        }

        function d(e) {
            return !e || ("string" == typeof e ? e === t.MIME_BINARY || e === t.MIME_TEXT || e === t.MIME_UNKNOWN : 1 === e.length && d(e[0]))
        }

        function h(e, t) {
            for (var n = 0; n < v.length; n++) {
                var r = v[n]
                if (!r.userConfigured && r.id === e && r.extension)return t + r.extension
            }
            return t
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.MIME_TEXT = "text/plain", t.MIME_BINARY = "application/octet-stream", t.MIME_UNKNOWN = "application/unknown"
        var v = [], m = [], g = []
        t.registerTextMime = s, t.clearTextMimes = c, t.guessMimeTypes = u, t.isBinaryMime = p, t.isUnspecific = d, t.suggestFilename = h
    }), define(e[102], t([1, 0, 28, 49, 2, 47]), function (e, t, n, r, i, o) {
        "use strict"
        function s(e, t) {
            return new i.TPromise(function (t, i) {
                var s = n.createReadStream(e), a = r.createHash("sha1"), c = a
                s.pipe(c)
                var u = o.once(function (e, n) {
                    s.removeAllListeners(), c.removeAllListeners(), e ? i(e) : t(n)
                })
                s.once("error", u), s.once("end", u), c.once("error", u), c.once("data", function (e) {
                    return u(null, e.toString("hex"))
                })
            }).then(function (e) {
                return e !== t ? i.TPromise.wrapError(new Error("Hash mismatch")) : i.TPromise.as(null)
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.checksum = s
    }), define(e[29], t([1, 0, 4]), function (e, t, n) {
        "use strict"
        function r(e, t, r) {
            void 0 === r && (r = function (e) {
                return e
            })
            var i = function () {
                for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
                return a.fire(r.apply(void 0, e))
            }, o = function () {
                return e.on(t, i)
            }, s = function () {
                return e.removeListener(t, i)
            }, a = new n.Emitter({onFirstListenerAdd: o, onLastListenerRemove: s})
            return a.event
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.fromEventEmitter = r
    }), define(e[116], t([1, 0, 121]), function (e, t, n) {
        "use strict"
        function r(e, t, n) {
            var r = new Array(e.length), i = new Array(e.length), o = !1, s = 0
            if (0 === e.length)return n(null, [])
            e.forEach(function (a, c) {
                t(a, function (t, a) {
                    if (t ? (o = !0, r[c] = null, i[c] = t) : (r[c] = a, i[c] = null), ++s === e.length)return n(o ? i : null, r)
                })
            })
        }

        function i(e, t, r) {
            if (n.ok(e, "Missing first parameter"), n.ok("function" == typeof t, "Second parameter must be a function that is called for each element"), n.ok("function" == typeof r, "Third parameter must be a function that is called on error and success"), "function" == typeof e)try {
                e(function (e, n) {
                    e ? r(e, null) : i(n, t, r)
                })
            } catch (e) {
                r(e, null)
            } else {
                var o = [], s = function (n) {
                    if (n < e.length)try {
                        t(e[n], function (e, t) {
                            !0 !== e && !1 !== e || (t = e, e = null), e ? r(e, null) : (t && o.push(t), process.nextTick(function () {
                                s(n + 1)
                            }))
                        }, n, e.length)
                    } catch (e) {
                        r(e, null)
                    } else r(null, o)
                }
                s(0)
            }
        }

        function o(e) {
            n.ok(e.length > 1, "Need at least one error handler and one function to process sequence"), e.forEach(function (e) {
                n.ok("function" == typeof e)
            })
            var t = e.splice(0, 1)[0], r = null
            i(e, function (e, t) {
                var n = function (e, n) {
                    !0 !== e && !1 !== e || (n = e, e = null), e ? t(e, null) : (r = n, t(null, null))
                }
                try {
                    e.call(n, r)
                } catch (e) {
                    t(e, null)
                }
            }, function (e, n) {
                e && t(e)
            })
        }

        function s(e) {
            o(Array.isArray(e) ? e : Array.prototype.slice.call(arguments))
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.parallel = r, t.loop = i, t.sequence = s
    }), define(e[41], t([1, 0, 30, 11, 5, 116, 28, 7]), function (e, t, n, r, i, o, s, a) {
        "use strict"
        function c(e) {
            return i.isMacintosh ? s.readdirSync(e).map(function (e) {
                return r.normalizeNFC(e)
            }) : s.readdirSync(e)
        }

        function u(e, t) {
            return i.isMacintosh ? s.readdir(e, function (e, n) {
                return e ? t(e, null) : t(null, n.map(function (e) {
                    return r.normalizeNFC(e)
                }))
            }) : s.readdir(e, t)
        }

        function l(e, t, n) {
            s.exists(e, function (r) {
                if (r)return f(e, function (t, r) {
                    return t ? n(t) : r ? void n(null) : n(new Error('"' + e + '" is not a directory.'))
                })
                l(a.dirname(e), t, function (r) {
                    if (r)return void n(r)
                    t ? s.mkdir(e, t, function (r) {
                        if (r)return n(r)
                        s.chmod(e, t, n)
                    }) : s.mkdir(e, null, n)
                })
            })
        }

        function f(e, t) {
            s.stat(e, function (e, n) {
                if (e)return t(e)
                t(null, n.isDirectory())
            })
        }

        function p(e, t, n, r) {
            r || (r = Object.create(null)), s.stat(e, function (i, o) {
                return i ? n(i) : o.isDirectory() ? r[e] ? n(null) : (r[e] = !0, void l(t, 511 & o.mode, function (i) {
                    u(e, function (i, o) {
                        b(o, function (n, i) {
                            p(a.join(e, n), a.join(t, n), function (e) {
                                return i(e, void 0)
                            }, r)
                        }, n)
                    })
                })) : d(e, t, 511 & o.mode, n)
            })
        }

        function d(e, t, n, r) {
            var i = !1, o = s.createReadStream(e), a = s.createWriteStream(t, {mode: n}), c = function (e) {
                i || (i = !0, r(e))
            }
            o.on("error", c), a.on("error", c), o.on("end", function () {
                a.end(function () {
                    i || (i = !0, s.chmod(t, n, r))
                })
            }), o.pipe(a, {end: !1})
        }

        function h(e, t, i, o) {
            s.exists(e, function (c) {
                if (!c)return i(null)
                s.stat(e, function (c, u) {
                    if (c || !u)return i(c)
                    if ("." === e[e.length - 1] || r.endsWith(e, "./") || r.endsWith(e, ".\\"))return v(e, i)
                    var l = a.join(t, n.generateUuid())
                    s.rename(e, l, function (t) {
                        if (t)return v(e, i)
                        i(null), v(l, function (e) {
                            e && console.error(e), o && o(e)
                        })
                    })
                })
            })
        }

        function v(e, t) {
            if ("\\" === e || "/" === e)return t(new Error("Will not delete root!"))
            s.exists(e, function (n) {
                n ? s.lstat(e, function (n, r) {
                    if (n || !r) t(n)
                    else if (!r.isDirectory() || r.isSymbolicLink()) {
                        var i = r.mode
                        128 & i ? s.unlink(e, t) : s.chmod(e, 128 | i, function (n) {
                            n ? t(n) : s.unlink(e, t)
                        })
                    } else u(e, function (n, r) {
                        if (n || !r) t(n)
                        else if (0 === r.length) s.rmdir(e, t)
                        else {
                            var i = null, o = r.length
                            r.forEach(function (n) {
                                v(a.join(e, n), function (n) {
                                    o--, n && (i = i || n), 0 === o && (i ? t(i) : s.rmdir(e, t))
                                })
                            })
                        }
                    })
                }) : t(null)
            })
        }

        function m(e) {
            try {
                var t = s.lstatSync(e)
                t.isDirectory() && !t.isSymbolicLink() ? (c(e).forEach(function (t) {
                    return m(a.join(e, t))
                }), s.rmdirSync(e)) : s.unlinkSync(e)
            } catch (e) {
                if ("ENOENT" === e.code)return
                throw e
            }
        }

        function g(e, t, n) {
            function i(e) {
                if (e)return n(e)
                s.stat(t, function (e, r) {
                    return e ? n(e) : r.isDirectory() ? n(null) : void s.open(t, "a", null, function (e, t) {
                        if (e)return n(e)
                        s.futimes(t, r.atime, new Date, function (e) {
                            if (e)return n(e)
                            s.close(t, n)
                        })
                    })
                })
            }

            if (e === t)return n(null)
            s.rename(e, t, function (o) {
                return o ? o && e.toLowerCase() !== t.toLowerCase() && "EXDEV" === o.code || r.endsWith(e, ".") ? p(e, t, function (t) {
                    if (t)return n(t)
                    v(e, i)
                }) : n(o) : i(null)
            })
        }

        function y(e, t, n, r) {
            if (!S)return s.writeFile(e, t, n, r)
            n ? "string" == typeof n && (n = {encoding: n, mode: 438, flag: "w"}) : n = {
                encoding: "utf8",
                mode: 438,
                flag: "w"
            }, s.open(e, n.flag, n.mode, function (e, i) {
                if (e)return r(e)
                s.writeFile(i, t, n.encoding, function (e) {
                    if (e)return s.close(i, function () {
                        return r(e)
                    })
                    s.fdatasync(i, function (e) {
                        return e && (console.warn("[node.js fs] fdatasync is now disabled for this session because it failed: ", e), S = !1), s.close(i, function (e) {
                            return r(e)
                        })
                    })
                })
            })
        }

        function w(e) {
            var t = a.dirname(e)
            if (e === t)return e
            var n = a.basename(e).toLowerCase()
            try {
                var r = c(t), i = r.filter(function (e) {
                    return e.toLowerCase() === n
                })
                if (1 === i.length) {
                    var o = w(t)
                    if (o)return a.join(o, i[0])
                } else if (i.length > 1) {
                    var s = i.indexOf(n)
                    if (s >= 0) {
                        var o = w(t)
                        if (o)return a.join(o, i[s])
                    }
                }
            } catch (e) {
            }
            return null
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var b = o.loop
        t.readdirSync = c, t.readdir = u, t.mkdirp = l, t.copy = p, t.del = h, t.delSync = m, t.mv = g
        var S = !0
        t.writeFileAndFlush = y, t.realpathSync = w
    }), define(e[76], t([1, 0, 137, 49, 2, 17, 30, 26, 48]), function (e, t, n, r, i, o, s, a, c) {
        "use strict"
        function u() {
            return f || (f = l().then(function (e) {
                    return e || s.generateUuid()
                }))
        }

        function l() {
            return new i.TPromise(function (e) {
                try {
                    n.getMac(function (t, n) {
                        e(t ? void 0 : r.createHash("sha256").update(n, "utf8").digest("hex"))
                    })
                } catch (t) {
                    o.onUnexpectedError(t), e(void 0)
                }
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.virtualMachineHint = new (function () {
            function e() {
            }

            return e.prototype._isVirtualMachineMacAdress = function (e) {
                return this._virtualMachineOUIs || (this._virtualMachineOUIs = new c.TrieMap(function (e) {
                    return e.split(/[-:]/)
                }), this._virtualMachineOUIs.insert("00-50-56", !0), this._virtualMachineOUIs.insert("00-0C-29", !0), this._virtualMachineOUIs.insert("00-05-69", !0), this._virtualMachineOUIs.insert("00-03-FF", !0), this._virtualMachineOUIs.insert("00-1C-42", !0)), this._virtualMachineOUIs.findSubstr(e)
            }, e.prototype.value = function () {
                if (void 0 === this._value) {
                    var e = 0, t = 0, n = a.networkInterfaces()
                    for (var r in n)if (Object.prototype.hasOwnProperty.call(n, r))for (var i = 0, o = n[r]; i < o.length; i++) {
                        var s = o[i], c = s.mac, u = s.internal
                        u || (t += 1, this._isVirtualMachineMacAdress(c.toUpperCase()) && (e += 1))
                    }
                    this._value = t > 0 ? e / t : 0
                }
                return this._value
            }, e
        }())
        var f
        t.getMachineId = u
    }), define(e[79], t([1, 0, 19]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r = n["default"].parse(e.toUrl("paths")).fsPath, i = e.__$__nodeRequire(r)
        t.getAppDataPath = i.getAppDataPath, t.getDefaultUserDataPath = i.getDefaultUserDataPath
    }), define(e[51], t([1, 0, 2, 41, 7, 34, 28, 26, 5, 4]), function (e, t, n, r, i, o, s, a, c, u) {
        "use strict"
        function l(e) {
            return o.nfcall(r.readdir, e)
        }

        function f(e) {
            return new n.Promise(function (t) {
                return s.exists(e, t)
            })
        }

        function p(e, t) {
            return o.nfcall(s.chmod, e, t)
        }

        function d(e, t) {
            var r = function () {
                return o.nfcall(s.mkdir, e, t).then(null, function (t) {
                    return "EEXIST" === t.code ? o.nfcall(s.stat, e).then(function (t) {
                        return t.isDirectory ? null : n.Promise.wrapError(new Error("'" + e + "' exists and is not a directory."))
                    }) : n.TPromise.wrapError(t)
                })
            }
            return e === i.dirname(e) ? n.TPromise.as(!0) : r().then(null, function (o) {
                return "ENOENT" === o.code ? d(i.dirname(e), t).then(r) : n.TPromise.wrapError(o)
            })
        }

        function h(e) {
            return g(e).then(function (t) {
                return t.isDirectory() && !t.isSymbolicLink() ? l(e).then(function (t) {
                    return n.TPromise.join(t.map(function (t) {
                        return h(i.join(e, t))
                    }))
                }).then(function () {
                    return w(e)
                }) : b(e)
            }, function (e) {
                if ("ENOENT" !== e.code)return n.TPromise.wrapError(e)
            })
        }

        function v(e) {
            return o.nfcall(s.realpath, e, null)
        }

        function m(e) {
            return o.nfcall(s.stat, e)
        }

        function g(e) {
            return o.nfcall(s.lstat, e)
        }

        function y(e, t) {
            return o.nfcall(s.rename, e, t)
        }

        function w(e) {
            return o.nfcall(s.rmdir, e)
        }

        function b(e) {
            return o.nfcall(s.unlink, e)
        }

        function S(e, t, n) {
            return o.nfcall(s.symlink, e, t, n)
        }

        function _(e) {
            return o.nfcall(s.readlink, e)
        }

        function E(e) {
            var t = Date.now() / 1e3
            return o.nfcall(s.utimes, e, t, t)
        }

        function C(e, t) {
            return o.nfcall(s.readFile, e, t)
        }

        function P(e, t, n) {
            return void 0 === n && (n = "utf8"), k(O(e)).queue(function () {
                return o.nfcall(r.writeFileAndFlush, e, t, n)
            })
        }

        function O(e) {
            var t = e
            return (c.isWindows || c.isMacintosh) && (t = t.toLowerCase()), t
        }

        function k(e) {
            var t = D[e]
            if (!t) {
                t = new o.Queue, D[e] = t
                u.once(t.onFinished)(function () {
                    delete D[e], t.dispose()
                })
            }
            return t
        }

        function I(e) {
            return l(e).then(function (t) {
                return n.TPromise.join(t.map(function (t) {
                    return T(i.join(e, t))
                })).then(function (e) {
                    return t.filter(function (t, n) {
                        return e[n]
                    })
                })
            })
        }

        function T(e) {
            return m(e).then(function (e) {
                return e.isDirectory()
            }, function () {
                return !1
            })
        }

        function M(e) {
            return m(e).then(function (e) {
                return e.isFile()
            }, function () {
                return !1
            })
        }

        function x(e, t) {
            return void 0 === t && (t = A), o.nfcall(r.del, e, t)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.readdir = l, t.exists = f, t.chmod = p, t.mkdirp = d, t.rimraf = h, t.realpath = v, t.stat = m, t.lstat = g, t.rename = y, t.rmdir = w, t.unlink = b, t.symlink = S, t.readlink = _, t.touch = E, t.readFile = C
        var D = Object.create(null)
        t.writeFile = P, t.readDirsInDir = I, t.dirExists = T, t.fileExists = M
        var A = a.tmpdir()
        t.del = x
    }), define(e[81], t([1, 0, 2, 7, 51]), function (e, t, n, r, i) {
        "use strict"
        function o(e) {
            return u.value.then(function (t) {
                return t.startProfiling(e), !0
            })
        }

        function s(e, t) {
            return u.value.then(function (e) {
                return e.stopProfiling()
            }).then(function (o) {
                return new n.TPromise(function (n, s) {
                    c || a(o), o["export"](function (a, u) {
                        if (o["delete"](), a)return void s(a)
                        var l = r.join(e, t + "_" + o.title + ".cpuprofile")
                        c || (l += ".txt"), i.writeFile(l, u).then(function () {
                            return n(l)
                        }, s)
                    })
                })
            })
        }

        function a(e) {
            for (var t = [e.head]; t.length > 0;) {
                var n = t.pop()
                if (n.url) {
                    var i = r.basename(n.url)
                    n.url !== i && (n.url = "pii_removed/" + i)
                }
                n.children && t.push.apply(t, n.children)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.startProfiling = o
        var c = process.env.VSCODE_DEV
        t.stopProfiling = s
        var u = new (function () {
            function t() {
            }

            return Object.defineProperty(t.prototype, "value", {
                get: function () {
                    return this._value || (this._value = new n.TPromise(function (t, n) {
                        e(["v8-profiler"], t, n)
                    })), this._value
                }, enumerable: !0, configurable: !0
            }), t
        }())
    }), define(e[82], t([1, 0, 83, 6, 136, 135]), function (e, t, n, r, i, o) {
        "use strict"
        function s(e) {
            return "http:" === e.protocol ? process.env.HTTP_PROXY || process.env.http_proxy || null : "https:" === e.protocol ? process.env.HTTPS_PROXY || process.env.https_proxy || process.env.HTTP_PROXY || process.env.http_proxy || null : null
        }

        function a(e, t) {
            void 0 === t && (t = {})
            var a = n.parse(e), c = t.proxyUrl || s(a)
            if (!c)return null
            var u = n.parse(c)
            if (!/^https?:$/.test(u.protocol))return null
            var l = {
                host: u.hostname,
                port: Number(u.port),
                auth: u.auth,
                rejectUnauthorized: !r.isBoolean(t.strictSSL) || t.strictSSL
            }
            return "http:" === a.protocol ? new i(l) : new o(l)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.getProxyAgent = a
    }), define(e[21], t([1, 0, 2, 9, 4]), function (e, t, n, r, i) {
        "use strict"
        function o(e) {
            return e >= l.ResponseInitialize
        }

        function s(e) {
            return {
                call: function (t, n) {
                    return e.then(function (e) {
                        return e.call(t, n)
                    })
                }
            }
        }

        function a(e) {
            var t = !1
            return {
                call: function (r, i) {
                    return t ? e.call(r, i) : n.TPromise.timeout(0).then(function () {
                        return t = !0
                    }).then(function () {
                        return e.call(r, i)
                    })
                }
            }
        }

        function c(e, t) {
            void 0 === t && (t = function (e) {
                return e
            })
            var r
            return new n.Promise(function (n, i, o) {
                return r = e(function (e) {
                    return o(t(e))
                })
            }, function () {
                return r.dispose()
            })
        }

        function u(e, t, n, r) {
            void 0 === n && (n = null), void 0 === r && (r = function (e) {
                return e
            })
            var o, s = new i.Emitter({
                onFirstListenerAdd: function () {
                    o = e.call(t, n).then(null, function (e) {
                        return null
                    }, function (e) {
                        return s.fire(r(e))
                    })
                }, onLastListenerRemove: function () {
                    o.cancel(), o = null
                }
            })
            return s.event
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var l
        !function (e) {
            e[e.RequestCommon = 0] = "RequestCommon", e[e.RequestCancel = 1] = "RequestCancel", e[e.ResponseInitialize = 2] = "ResponseInitialize", e[e.ResponseSuccess = 3] = "ResponseSuccess", e[e.ResponseProgress = 4] = "ResponseProgress", e[e.ResponseError = 5] = "ResponseError", e[e.ResponseErrorObj = 6] = "ResponseErrorObj"
        }(l || (l = {}))
        var f
        !function (e) {
            e[e.Uninitialized = 0] = "Uninitialized", e[e.Idle = 1] = "Idle"
        }(f || (f = {}))
        var p = function () {
            function e(e) {
                var t = this
                this.protocol = e, this.channels = Object.create(null), this.activeRequests = Object.create(null), this.protocolListener = this.protocol.onMessage(function (e) {
                    return t.onMessage(e)
                }), this.protocol.send({type: l.ResponseInitialize})
            }

            return e.prototype.registerChannel = function (e, t) {
                this.channels[e] = t
            }, e.prototype.onMessage = function (e) {
                switch (e.type) {
                    case l.RequestCommon:
                        this.onCommonRequest(e)
                        break
                    case l.RequestCancel:
                        this.onCancelRequest(e)
                }
            }, e.prototype.onCommonRequest = function (e) {
                var t, i = this, o = this.channels[e.channelName]
                try {
                    t = o.call(e.name, e.arg)
                } catch (e) {
                    t = n.Promise.wrapError(e)
                }
                var s = e.id, a = t.then(function (t) {
                    i.protocol.send({id: s, data: t, type: l.ResponseSuccess}), delete i.activeRequests[e.id]
                }, function (t) {
                    t instanceof Error ? i.protocol.send({
                        id: s,
                        data: {message: t.message, name: t.name, stack: t.stack ? t.stack.split("\n") : void 0},
                        type: l.ResponseError
                    }) : i.protocol.send({id: s, data: t, type: l.ResponseErrorObj}), delete i.activeRequests[e.id]
                }, function (e) {
                    i.protocol.send({id: s, data: e, type: l.ResponseProgress})
                })
                this.activeRequests[e.id] = r.toDisposable(function () {
                    return a.cancel()
                })
            }, e.prototype.onCancelRequest = function (e) {
                var t = this.activeRequests[e.id]
                t && (t.dispose(), delete this.activeRequests[e.id])
            }, e.prototype.dispose = function () {
                var e = this
                this.protocolListener.dispose(), this.protocolListener = null, Object.keys(this.activeRequests).forEach(function (t) {
                    e.activeRequests[t].dispose()
                }), this.activeRequests = null
            }, e
        }()
        t.ChannelServer = p
        var d = function () {
            function e(e) {
                var t = this
                this.protocol = e, this.state = f.Uninitialized, this.activeRequests = [], this.bufferedRequests = [], this.handlers = Object.create(null), this.lastRequestId = 0, this.protocolListener = this.protocol.onMessage(function (e) {
                    return t.onMessage(e)
                })
            }

            return e.prototype.getChannel = function (e) {
                var t = this
                return {
                    call: function (n, r) {
                        return t.request(e, n, r)
                    }
                }
            }, e.prototype.request = function (e, t, n) {
                var r = this,
                    i = {raw: {id: this.lastRequestId++, type: l.RequestCommon, channelName: e, name: t, arg: n}},
                    o = this.state === f.Uninitialized ? this.bufferRequest(i) : this.doRequest(i)
                return this.activeRequests.push(o), o.then(null, function (e) {
                    return null
                }).done(function () {
                    return r.activeRequests = r.activeRequests.filter(function (e) {
                        return e !== o
                    })
                }), o
            }, e.prototype.doRequest = function (e) {
                var t = this, r = e.raw.id
                return new n.Promise(function (n, i, o) {
                    t.handlers[r] = function (e) {
                        switch (e.type) {
                            case l.ResponseSuccess:
                                delete t.handlers[r], n(e.data)
                                break
                            case l.ResponseError:
                                delete t.handlers[r]
                                var s = new Error(e.data.message)
                                s.stack = e.data.stack, s.name = e.data.name, i(s)
                                break
                            case l.ResponseErrorObj:
                                delete t.handlers[r], i(e.data)
                                break
                            case l.ResponseProgress:
                                o(e.data)
                        }
                    }, t.send(e.raw)
                }, function () {
                    return t.send({id: r, type: l.RequestCancel})
                })
            }, e.prototype.bufferRequest = function (e) {
                var t = this, r = null
                return new n.Promise(function (n, i, o) {
                    t.bufferedRequests.push(e), e.flush = function () {
                        e.flush = null, r = t.doRequest(e).then(n, i, o)
                    }
                }, function () {
                    if (e.flush = null, t.state !== f.Uninitialized)return void(r && (r.cancel(), r = null))
                    var n = t.bufferedRequests.indexOf(e);
                    -1 !== n && t.bufferedRequests.splice(n, 1)
                })
            }, e.prototype.onMessage = function (e) {
                if (o(e.type)) {
                    if (this.state === f.Uninitialized && e.type === l.ResponseInitialize)return this.state = f.Idle, this.bufferedRequests.forEach(function (e) {
                        return e.flush && e.flush()
                    }), void(this.bufferedRequests = null)
                    var t = this.handlers[e.id]
                    t && t(e)
                }
            }, e.prototype.send = function (e) {
                try {
                    this.protocol.send(e)
                } catch (e) {
                }
            }, e.prototype.dispose = function () {
                this.protocolListener.dispose(), this.protocolListener = null, this.activeRequests.forEach(function (e) {
                    return e.cancel()
                }), this.activeRequests = []
            }, e
        }()
        t.ChannelClient = d
        var h = function () {
            function e(e) {
                var t = this
                this.channels = Object.create(null), this.channelClients = Object.create(null), this.onClientAdded = new i.Emitter, e(function (e) {
                    var n = e.protocol, r = e.onDidClientDisconnect
                    i.once(n.onMessage)(function (e) {
                        var i = new p(n), o = new d(n)
                        Object.keys(t.channels).forEach(function (e) {
                            return i.registerChannel(e, t.channels[e])
                        }), t.channelClients[e] = o, t.onClientAdded.fire(e), r(function () {
                            i.dispose(), o.dispose(), delete t.channelClients[e]
                        })
                    })
                })
            }

            return e.prototype.getChannel = function (e, t) {
                var r = this
                return {
                    call: function (i, o) {
                        var s = t.route(i, o)
                        return s ? r.getClient(s).then(function (t) {
                            return t.getChannel(e).call(i, o)
                        }) : n.TPromise.wrapError("Client id should be provided")
                    }
                }
            }, e.prototype.registerChannel = function (e, t) {
                this.channels[e] = t
            }, e.prototype.getClient = function (e) {
                var t = this, r = this.channelClients[e]
                return r ? n.TPromise.as(r) : new n.TPromise(function (n) {
                    i.once(i.filterEvent(t.onClientAdded.event, function (t) {
                        return t === e
                    }))(function () {
                        return n(t.channelClients[e])
                    })
                })
            }, e.prototype.dispose = function () {
                this.channels = null, this.channelClients = null, this.onClientAdded.dispose()
            }, e
        }()
        t.IPCServer = h
        var v = function () {
            function e(e, t) {
                e.send(t), this.channelClient = new d(e), this.channelServer = new p(e)
            }

            return e.prototype.getChannel = function (e) {
                return this.channelClient.getChannel(e)
            }, e.prototype.registerChannel = function (e, t) {
                this.channelServer.registerChannel(e, t)
            }, e.prototype.dispose = function () {
                this.channelClient.dispose(), this.channelClient = null, this.channelServer.dispose(), this.channelServer = null
            }, e
        }()
        t.IPCClient = v, t.getDelayedChannel = s, t.getNextTickChannel = a, t.eventToCall = c, t.eventFromCall = u
    }), define(e[93], t([1, 0, 9, 4]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = function () {
            function e(e, t) {
                this.sender = e, this.onMessageEvent = t
                var n = new r.Emitter
                t(function (e) {
                    return n.fire(e)
                }), this._onMessage = n.event
            }

            return Object.defineProperty(e.prototype, "onMessage", {
                get: function () {
                    return this._onMessage
                }, enumerable: !0, configurable: !0
            }), e.prototype.send = function (e) {
                try {
                    this.sender.send("ipc:message", e)
                } catch (e) {
                }
            }, e.prototype.dispose = function () {
                this.listener = n.dispose(this.listener)
            }, e
        }()
        t.Protocol = i
    }), define(e[94], t([1, 0, 4, 29, 21, 93, 10]), function (e, t, r, i, o, s, a) {
        "use strict"
        function c(e) {
            var t = i.fromEventEmitter(a.ipcMain, "ipc:message", function (e, t) {
                return {event: e, message: t}
            }), n = r.filterEvent(t, function (t) {
                return t.event.sender.getId() === e
            })
            return r.mapEvent(n, function (e) {
                return e.message
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var u = function (e) {
            function t() {
                return e.call(this, t.getOnDidClientConnect()) || this
            }

            return n(t, e), t.getOnDidClientConnect = function () {
                var e = i.fromEventEmitter(a.ipcMain, "ipc:hello", function (e) {
                    return e.sender
                })
                return r.mapEvent(e, function (e) {
                    var t = c(e.getId())
                    return {protocol: new s.Protocol(e, t), onDidClientDisconnect: i.fromEventEmitter(e, "destroyed")}
                })
            }, t
        }(o.IPCServer)
        t.Server = u
    }), define(e[54], t([1, 0, 129, 2, 4, 29, 21, 7, 26, 30]), function (e, t, r, i, o, s, a, c, u, l) {
        "use strict"
        function f() {
            var e = l.generateUuid()
            return "win32" === process.platform ? "\\\\.\\pipe\\vscode-" + e + "-sock" : c.join(u.tmpdir(), "vscode-" + e + ".sock")
        }

        function p(e) {
            return new i.TPromise(function (t, n) {
                var i = r.createServer()
                i.on("error", n), i.listen(e, function () {
                    i.removeListener("error", n), t(new v(i))
                })
            })
        }

        function d(e, t) {
            return new i.TPromise(function (n, i) {
                var o = r.createConnection(e, function () {
                    o.removeListener("error", i), n(new m(o, t))
                })
                o.once("error", i)
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.generateRandomPipeName = f
        var h = function () {
            function e(t) {
                var n = this
                this._socket = t, this._onMessage = new o.Emitter, this.onMessage = this._onMessage.event, this._writeBuffer = new (function () {
                    function e() {
                        this._data = [], this._totalLength = 0
                    }

                    return e.prototype.add = function (e, t) {
                        var n = 0 === this._totalLength
                        return this._data.push(e, t), this._totalLength += e.length + t.length, n
                    }, e.prototype.take = function () {
                        var e = Buffer.concat(this._data, this._totalLength)
                        return this._data.length = 0, this._totalLength = 0, e
                    }, e
                }())
                var r = [], i = 0, s = {readHead: !0, bodyIsJson: !1, bodyLen: -1}
                t.on("data", function (t) {
                    for (r.push(t), i += t.length; i > 0;) {
                        if (s.readHead) {
                            if (!(i >= e._headerLen))break
                            var o = Buffer.concat(r)
                            s.bodyIsJson = 1 === o.readInt8(0), s.bodyLen = o.readInt32BE(1), s.readHead = !1
                            var a = o.slice(e._headerLen)
                            i = a.length, r = [a]
                        }
                        if (!s.readHead) {
                            if (!(i >= s.bodyLen))break
                            var o = Buffer.concat(r), c = o.toString("utf8", 0, s.bodyLen)
                            s.bodyIsJson && (c = JSON.parse(c)), n._onMessage.fire(c)
                            var a = o.slice(s.bodyLen)
                            i = a.length, r = [a], s.bodyIsJson = !1, s.bodyLen = -1, s.readHead = !0
                        }
                    }
                })
            }

            return e.prototype.send = function (t) {
                var n = Buffer.alloc(e._headerLen)
                "string" != typeof t && (t = JSON.stringify(t), n.writeInt8(1, 0))
                var r = Buffer.from(t)
                n.writeInt32BE(r.length, 1), this._writeSoon(n, r)
            }, e.prototype._writeSoon = function (e, t) {
                var n = this
                this._writeBuffer.add(e, t) && setImmediate(function () {
                    n._socket.destroyed || n._socket.write(n._writeBuffer.take())
                })
            }, e
        }()
        h._headerLen = 17, t.Protocol = h
        var v = function (e) {
            function t(n) {
                var r = e.call(this, t.toClientConnectionEvent(n)) || this
                return r.server = n, r
            }

            return n(t, e), t.toClientConnectionEvent = function (e) {
                var t = s.fromEventEmitter(e, "connection")
                return o.mapEvent(t, function (e) {
                    return {protocol: new h(e), onDidClientDisconnect: o.once(s.fromEventEmitter(e, "close"))}
                })
            }, t.prototype.dispose = function () {
                e.prototype.dispose.call(this), this.server.close(), this.server = null
            }, t
        }(a.IPCServer)
        t.Server = v
        var m = function (e) {
            function t(t, n) {
                var r = e.call(this, new h(t), n) || this
                return r.socket = t, r._onClose = new o.Emitter, t.once("close", function () {
                    return r._onClose.fire()
                }), r
            }

            return n(t, e), Object.defineProperty(t.prototype, "onClose", {
                get: function () {
                    return this._onClose.event
                }, enumerable: !0, configurable: !0
            }), t.prototype.dispose = function () {
                e.prototype.dispose.call(this), this.socket.end(), this.socket = null
            }, t
        }(a.IPCClient)
        t.Client = m, t.serve = p, t.connect = d
    }), define(e[55], t([1, 0, 38, 7, 20, 11, 18, 5, 6]), function (e, t, n, r, i, o, s, a, c) {
        "use strict"
        function u(e) {
            var t = l(e._, e["goto"])
            return e._ = t, e.diff = e.diff && 2 === t.length, e
        }

        function l(e, t) {
            var o = process.env.VSCODE_CWD || process.cwd(), c = e.map(function (e) {
                var i, a = String(e)
                t && (i = p(a), a = i.path), a && (a = f(o, a))
                var c
                try {
                    c = n.realpathSync(a)
                } catch (e) {
                    c = r.normalize(r.isAbsolute(a) ? a : r.join(o, a))
                }
                var u = r.basename(c)
                return u && !s.isValidBasename(u) ? null : t ? (i.path = c, d(i)) : c
            }), u = a.isWindows || a.isMacintosh, l = i.distinct(c, function (e) {
                return e && u ? e.toLowerCase() : e
            })
            return i.coalesce(l)
        }

        function f(e, t) {
            return a.isWindows && (t = o.rtrim(t, '"')), t = o.trim(o.trim(t, " "), "	"), a.isWindows && (t = r.resolve(e, t), t = o.rtrim(t, ".")), t
        }

        function p(e) {
            var t, n = e.split(":"), r = null, i = null
            if (n.forEach(function (e) {
                    var n = Number(e)
                    c.isNumber(n) ? null === r ? r = n : null === i && (i = n) : t = t ? [t, e].join(":") : e
                }), !t)throw new Error("Format for `--goto` should be: `FILE:LINE(:COLUMN)`")
            return {path: t, line: null !== r ? r : void 0, column: null !== i ? i : null !== r ? 1 : void 0}
        }

        function d(e) {
            var t = [e.path]
            return c.isNumber(e.line) && t.push(String(e.line)), c.isNumber(e.column) && t.push(String(e.column)), t.join(":")
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.validatePaths = u, t.parseLineAndColumnAware = p
    })
    var r = this && this.__decorate || function (e, t, n, r) {
            var i, o = arguments.length, s = o < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, n, r)
            else for (var a = e.length - 1; a >= 0; a--)(i = e[a]) && (s = (o < 3 ? i(s) : o > 3 ? i(t, n, s) : i(t, n)) || s)
            return o > 3 && s && Object.defineProperty(t, n, s), s
        }
    define(e[104], t([1, 0, 8, 43, 9, 2, 10, 34]), function (e, t, n, i, o, s, a, c) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var u = function () {
            function t(e, t) {
                this.environmentService = e, this.userEnv = t, this.disposables = [], this.spawnPromiseSource = new c.PromiseSource
            }

            return Object.defineProperty(t.prototype, "_whenReady", {
                get: function () {
                    var t = this
                    this.window = new a.BrowserWindow({show: !1})
                    var r = n.assign({
                            appRoot: this.environmentService.appRoot,
                            nodeCachedDataDir: this.environmentService.nodeCachedDataDir,
                            userEnv: this.userEnv
                        }),
                        i = e.toUrl("vs/code/electron-browser/sharedProcess.html") + "?config=" + encodeURIComponent(JSON.stringify(r))
                    this.window.loadURL(i)
                    var c = function (e) {
                        t.window.isVisible() && (e.preventDefault(), t.window.hide())
                    }
                    return this.window.on("close", c), this.disposables.push(o.toDisposable(function () {
                        return t.window.removeListener("close", c)
                    })), this.disposables.push(o.toDisposable(function () {
                        setTimeout(function () {
                            try {
                                t.window.close()
                            } catch (e) {
                            }
                            t.window = null
                        }, 0)
                    })), new s.TPromise(function (e, n) {
                        a.ipcMain.once("handshake:hello", function (n) {
                            n.sender.send("handshake:hey there", {
                                sharedIPCHandle: t.environmentService.sharedIPCHandle,
                                args: t.environmentService.args
                            }), a.ipcMain.once("handshake:im ready", function () {
                                return e(null)
                            })
                        })
                    })
                }, enumerable: !0, configurable: !0
            }), t.prototype.spawn = function () {
                this.spawnPromiseSource.complete()
            }, t.prototype.whenReady = function () {
                var e = this
                return this.spawnPromiseSource.value.then(function () {
                    return e._whenReady
                })
            }, t.prototype.toggle = function () {
                this.window.isVisible() ? this.hide() : this.show()
            }, t.prototype.show = function () {
                this.window.show(), this.window.webContents.openDevTools()
            }, t.prototype.hide = function () {
                this.window.webContents.closeDevTools(), this.window.hide()
            }, t.prototype.dispose = function () {
                this.disposables = o.dispose(this.disposables)
            }, t
        }()
        r([i.memoize], u.prototype, "_whenReady", null), t.SharedProcess = u
    }), define(e[107], t([1, 0, 109, 8, 30, 2, 5]), function (e, t, n, r, i, o, s) {
        "use strict"
        function a() {
            return new o.TPromise(function (e, t) {
                var o = process.env.ELECTRON_RUN_AS_NODE, s = process.env.ELECTRON_NO_ATTACH_CONSOLE,
                    a = i.generateUuid().replace(/-/g, "").substr(0, 12), c = new RegExp(a + "(.*)" + a),
                    u = r.assign({}, process.env, {ELECTRON_RUN_AS_NODE: "1", ELECTRON_NO_ATTACH_CONSOLE: "1"}),
                    l = "'" + process.execPath + "' -p '\"" + a + '" + JSON.stringify(process.env) + "' + a + "\"'",
                    f = n.spawn(process.env.SHELL, ["-ilc", l], {
                        detached: !0,
                        stdio: ["ignore", "pipe", process.stderr],
                        env: u
                    }), p = []
                f.on("error", function () {
                    return e({})
                }), f.stdout.on("data", function (e) {
                    return p.push(e)
                }), f.on("close", function (n, r) {
                    if (0 !== n)return t(new Error("Failed to get environment"))
                    var i = Buffer.concat(p).toString("utf8"), a = c.exec(i), u = a ? a[1] : "{}"
                    try {
                        var l = JSON.parse(u)
                        o ? l.ELECTRON_RUN_AS_NODE = o : delete l.ELECTRON_RUN_AS_NODE, s ? l.ELECTRON_NO_ATTACH_CONSOLE = s : delete l.ELECTRON_NO_ATTACH_CONSOLE, e(l)
                    } catch (e) {
                        t(e)
                    }
                })
            }).then(null, function () {
                return {}
            })
        }

        function c() {
            return void 0 === u && (u = s.isWindows ? o.TPromise.as({}) : "1" === process.env.VSCODE_CLI ? o.TPromise.as({}) : a()), u
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var u
        t.getShellEnvironment = c
    }), define(e[111], t([15, 14]), function (e, t) {
        return e.create("vs/base/common/json", t)
    }), define(e[63], t([1, 0, 111]), function (e, t, n) {
        "use strict"
        function r(e, t) {
            function n(t, n) {
                for (var r = 0, i = 0; r < t || !n;) {
                    var o = e.charCodeAt(p)
                    if (o >= 48 && o <= 57) i = 16 * i + o - 48
                    else if (o >= 65 && o <= 70) i = 16 * i + o - 65 + 10
                    else {
                        if (!(o >= 97 && o <= 102))break
                        i = 16 * i + o - 97 + 10
                    }
                    p++, r++
                }
                return r < t && (i = -1), i
            }

            function r(e) {
                p = e, h = "", v = 0, y = g.Unknown, w = m.None
            }

            function a() {
                var t = p
                if (48 === e.charCodeAt(p)) p++
                else for (p++; p < e.length && s(e.charCodeAt(p));)p++
                if (p < e.length && 46 === e.charCodeAt(p)) {
                    if (!(++p < e.length && s(e.charCodeAt(p))))return w = m.UnexpectedEndOfNumber, e.substring(t, p)
                    for (p++; p < e.length && s(e.charCodeAt(p));)p++
                }
                var n = p
                if (p < e.length && (69 === e.charCodeAt(p) || 101 === e.charCodeAt(p)))if (p++, (p < e.length && 43 === e.charCodeAt(p) || 45 === e.charCodeAt(p)) && p++, p < e.length && s(e.charCodeAt(p))) {
                    for (p++; p < e.length && s(e.charCodeAt(p));)p++
                    n = p
                } else w = m.UnexpectedEndOfNumber
                return e.substring(t, n)
            }

            function c() {
                for (var t = "", r = p; ;) {
                    if (p >= d) {
                        t += e.substring(r, p), w = m.UnexpectedEndOfString
                        break
                    }
                    var i = e.charCodeAt(p)
                    if (34 === i) {
                        t += e.substring(r, p), p++
                        break
                    }
                    if (92 !== i) {
                        if (i >= 0 && i <= 31) {
                            if (o(i)) {
                                t += e.substring(r, p), w = m.UnexpectedEndOfString
                                break
                            }
                            w = m.InvalidCharacter
                        }
                        p++
                    } else {
                        if (t += e.substring(r, p), ++p >= d) {
                            w = m.UnexpectedEndOfString
                            break
                        }
                        switch (i = e.charCodeAt(p++)) {
                            case 34:
                                t += '"'
                                break
                            case 92:
                                t += "\\"
                                break
                            case 47:
                                t += "/"
                                break
                            case 98:
                                t += "\b"
                                break
                            case 102:
                                t += "\f"
                                break
                            case 110:
                                t += "\n"
                                break
                            case 114:
                                t += "\r"
                                break
                            case 116:
                                t += "	"
                                break
                            case 117:
                                var s = n(4, !0)
                                s >= 0 ? t += String.fromCharCode(s) : w = m.InvalidUnicode
                                break
                            default:
                                w = m.InvalidEscapeCharacter
                        }
                        r = p
                    }
                }
                return t
            }

            function u() {
                if (h = "", w = m.None, v = p, p >= d)return v = d, y = g.EOF
                var t = e.charCodeAt(p)
                if (i(t)) {
                    do p++, h += String.fromCharCode(t), t = e.charCodeAt(p)
                    while (i(t))
                    return y = g.Trivia
                }
                if (o(t))return p++, h += String.fromCharCode(t), 13 === t && 10 === e.charCodeAt(p) && (p++, h += "\n"), y = g.LineBreakTrivia
                switch (t) {
                    case 123:
                        return p++, y = g.OpenBraceToken
                    case 125:
                        return p++, y = g.CloseBraceToken
                    case 91:
                        return p++, y = g.OpenBracketToken
                    case 93:
                        return p++, y = g.CloseBracketToken
                    case 58:
                        return p++, y = g.ColonToken
                    case 44:
                        return p++, y = g.CommaToken
                    case 34:
                        return p++, h = c(), y = g.StringLiteral
                    case 47:
                        var n = p - 1
                        if (47 === e.charCodeAt(p + 1)) {
                            for (p += 2; p < d && !o(e.charCodeAt(p));)p++
                            return h = e.substring(n, p), y = g.LineCommentTrivia
                        }
                        if (42 === e.charCodeAt(p + 1)) {
                            p += 2
                            for (var r = d - 1, u = !1; p < r;) {
                                if (42 === e.charCodeAt(p) && 47 === e.charCodeAt(p + 1)) {
                                    p += 2, u = !0
                                    break
                                }
                                p++
                            }
                            return u || (p++, w = m.UnexpectedEndOfComment), h = e.substring(n, p), y = g.BlockCommentTrivia
                        }
                        return h += String.fromCharCode(t), p++, y = g.Unknown
                    case 45:
                        if (h += String.fromCharCode(t), ++p === d || !s(e.charCodeAt(p)))return y = g.Unknown
                    case 48:
                    case 49:
                    case 50:
                    case 51:
                    case 52:
                    case 53:
                    case 54:
                    case 55:
                    case 56:
                    case 57:
                        return h += a(), y = g.NumericLiteral
                    default:
                        for (; p < d && l(t);)p++, t = e.charCodeAt(p)
                        if (v !== p) {
                            switch (h = e.substring(v, p)) {
                                case"true":
                                    return y = g.TrueKeyword
                                case"false":
                                    return y = g.FalseKeyword
                                case"null":
                                    return y = g.NullKeyword
                            }
                            return y = g.Unknown
                        }
                        return h += String.fromCharCode(t), p++, y = g.Unknown
                }
            }

            function l(e) {
                if (i(e) || o(e))return !1
                switch (e) {
                    case 125:
                    case 93:
                    case 123:
                    case 91:
                    case 34:
                    case 58:
                    case 44:
                        return !1
                }
                return !0
            }

            function f() {
                var e
                do e = u()
                while (e >= g.LineCommentTrivia && e <= g.Trivia)
                return e
            }

            void 0 === t && (t = !1)
            var p = 0, d = e.length, h = "", v = 0, y = g.Unknown, w = m.None
            return {
                setPosition: r, getPosition: function () {
                    return p
                }, scan: t ? f : u, getToken: function () {
                    return y
                }, getTokenValue: function () {
                    return h
                }, getTokenOffset: function () {
                    return v
                }, getTokenLength: function () {
                    return p - v
                }, getTokenError: function () {
                    return w
                }
            }
        }

        function i(e) {
            return 32 === e || 9 === e || 11 === e || 12 === e || 160 === e || 5760 === e || e >= 8192 && e <= 8203 || 8239 === e || 8287 === e || 12288 === e || 65279 === e
        }

        function o(e) {
            return 10 === e || 13 === e || 8232 === e || 8233 === e
        }

        function s(e) {
            return e >= 48 && e <= 57
        }

        function a(e, t) {
            var n, i, o = r(e), s = [], a = 0
            do switch (i = o.getPosition(), n = o.scan()) {
                case g.LineCommentTrivia:
                case g.BlockCommentTrivia:
                case g.EOF:
                    a !== i && s.push(e.substring(a, i)), void 0 !== t && s.push(o.getTokenValue().replace(/[^\r\n]/g, t)), a = o.getPosition()
            } while (n !== g.EOF)
            return s.join("")
        }

        function c(e) {
            switch (e) {
                case w.InvalidSymbol:
                    return n.localize(0, null)
                case w.InvalidNumberFormat:
                    return n.localize(1, null)
                case w.PropertyNameExpected:
                    return n.localize(2, null)
                case w.ValueExpected:
                    return n.localize(3, null)
                case w.ColonExpected:
                    return n.localize(4, null)
                case w.CommaExpected:
                    return n.localize(5, null)
                case w.CloseBraceExpected:
                    return n.localize(6, null)
                case w.CloseBracketExpected:
                    return n.localize(7, null)
                case w.EndOfFileExpected:
                    return n.localize(8, null)
                default:
                    return ""
            }
        }

        function u(e) {
            switch (typeof e) {
                case"boolean":
                    return "boolean"
                case"number":
                    return "number"
                case"string":
                    return "string"
                default:
                    return "null"
            }
        }

        function l(e, t) {
            function n(e, t, n, r) {
                s.value = e, s.offset = t, s.length = n, s.type = r, s.columnOffset = void 0, o = s
            }

            var r = [], i = new Object, o = void 0, s = {value: void 0, offset: void 0, length: void 0, type: void 0},
                a = !1
            try {
                v(e, {
                    onObjectBegin: function (e, n) {
                        if (t <= e)throw i
                        o = void 0, a = t > e, r.push("")
                    }, onObjectProperty: function (e, o, s) {
                        if (t < o)throw i
                        if (n(e, o, s, "property"), r[r.length - 1] = e, t <= o + s)throw i
                    }, onObjectEnd: function (e, n) {
                        if (t <= e)throw i
                        o = void 0, r.pop()
                    }, onArrayBegin: function (e, n) {
                        if (t <= e)throw i
                        o = void 0, r.push(0)
                    }, onArrayEnd: function (e, n) {
                        if (t <= e)throw i
                        o = void 0, r.pop()
                    }, onLiteralValue: function (e, r, o) {
                        if (t < r)throw i
                        if (n(e, r, o, u(e)), t <= r + o)throw i
                    }, onSeparator: function (e, n, s) {
                        if (t <= n)throw i
                        if (":" === e && "property" === o.type) o.columnOffset = n, a = !1, o = void 0
                        else if ("," === e) {
                            var c = r[r.length - 1]
                            "number" == typeof c ? r[r.length - 1] = c + 1 : (a = !0, r[r.length - 1] = ""), o = void 0
                        }
                    }
                })
            } catch (e) {
                if (e !== i)throw e
            }
            return {
                path: r, previousNode: o, isAtPropertyKey: a, matches: function (e) {
                    for (var t = 0, n = 0; t < e.length && n < r.length; n++)if (e[t] === r[n] || "*" === e[t]) t++
                    else if ("**" !== e[t])return !1
                    return t === e.length
                }
            }
        }

        function f(e, t, n) {
            function r(e) {
                Array.isArray(o) ? o.push(e) : i && (o[i] = e)
            }

            void 0 === t && (t = [])
            var i = null, o = [], s = []
            return v(e, {
                onObjectBegin: function () {
                    var e = {}
                    r(e), s.push(o), o = e, i = null
                }, onObjectProperty: function (e) {
                    i = e
                }, onObjectEnd: function () {
                    o = s.pop()
                }, onArrayBegin: function () {
                    var e = []
                    r(e), s.push(o), o = e, i = null
                }, onArrayEnd: function () {
                    o = s.pop()
                }, onLiteralValue: r, onError: function (e) {
                    t.push({error: e})
                }
            }, n), o[0]
        }

        function p(e, t, n) {
            function r(e) {
                "property" === o.type && (o.length = e - o.offset, o = o.parent)
            }

            function i(e) {
                return o.children.push(e), e
            }

            void 0 === t && (t = [])
            var o = {type: "array", offset: -1, length: -1, children: []}
            v(e, {
                onObjectBegin: function (e) {
                    o = i({type: "object", offset: e, length: -1, parent: o, children: []})
                }, onObjectProperty: function (e, t, n) {
                    o = i({
                        type: "property",
                        offset: t,
                        length: -1,
                        parent: o,
                        children: []
                    }), o.children.push({type: "string", value: e, offset: t, length: n, parent: o})
                }, onObjectEnd: function (e, t) {
                    o.length = e + t - o.offset, o = o.parent, r(e + t)
                }, onArrayBegin: function (e, t) {
                    o = i({type: "array", offset: e, length: -1, parent: o, children: []})
                }, onArrayEnd: function (e, t) {
                    o.length = e + t - o.offset, o = o.parent, r(e + t)
                }, onLiteralValue: function (e, t, n) {
                    i({type: u(e), offset: t, length: n, parent: o, value: e}), r(t + n)
                }, onSeparator: function (e, t, n) {
                    "property" === o.type && (":" === e ? o.columnOffset = t : "," === e && r(t))
                }, onError: function (e) {
                    t.push({error: e})
                }
            }, n)
            var s = o.children[0]
            return s && delete s.parent, s
        }

        function d(e, t) {
            if (e) {
                for (var n = e, r = 0, i = t; r < i.length; r++) {
                    var o = i[r]
                    if ("string" == typeof o) {
                        if ("object" !== n.type)return
                        for (var s = !1, a = 0, c = n.children; a < c.length; a++) {
                            var u = c[a]
                            if (u.children[0].value === o) {
                                n = u.children[1], s = !0
                                break
                            }
                        }
                        if (!s)return
                    } else {
                        var l = o
                        if ("array" !== n.type || l < 0 || l >= n.children.length)return
                        n = n.children[l]
                    }
                }
                return n
            }
        }

        function h(e) {
            if ("array" === e.type)return e.children.map(h)
            if ("object" === e.type) {
                for (var t = {}, n = 0, r = e.children; n < r.length; n++) {
                    var i = r[n]
                    t[i.children[0].value] = h(i.children[1])
                }
                return t
            }
            return e.value
        }

        function v(e, t, n) {
            function i(e) {
                return e ? function () {
                    return e(h.getTokenOffset(), h.getTokenLength())
                } : function () {
                    return !0
                }
            }

            function o(e) {
                return e ? function (t) {
                    return e(t, h.getTokenOffset(), h.getTokenLength())
                } : function () {
                    return !0
                }
            }

            function s() {
                for (; ;) {
                    var e = h.scan()
                    switch (e) {
                        case g.LineCommentTrivia:
                        case g.BlockCommentTrivia:
                            P && a(w.InvalidSymbol)
                            break
                        case g.Unknown:
                            a(w.InvalidSymbol)
                            break
                        case g.Trivia:
                        case g.LineBreakTrivia:
                            break
                        default:
                            return e
                    }
                }
            }

            function a(e, t, n) {
                if (void 0 === t && (t = []), void 0 === n && (n = []), C(e), t.length + n.length > 0)for (var r = h.getToken(); r !== g.EOF;) {
                    if (-1 !== t.indexOf(r)) {
                        s()
                        break
                    }
                    if (-1 !== n.indexOf(r))break
                    r = s()
                }
            }

            function c(e) {
                var t = h.getTokenValue()
                return e ? _(t) : m(t), s(), !0
            }

            function u() {
                switch (h.getToken()) {
                    case g.NumericLiteral:
                        var e = 0
                        try {
                            e = JSON.parse(h.getTokenValue()), "number" != typeof e && (a(w.InvalidNumberFormat), e = 0)
                        } catch (e) {
                            a(w.InvalidNumberFormat)
                        }
                        _(e)
                        break
                    case g.NullKeyword:
                        _(null)
                        break
                    case g.TrueKeyword:
                        _(!0)
                        break
                    case g.FalseKeyword:
                        _(!1)
                        break
                    default:
                        return !1
                }
                return s(), !0
            }

            function l() {
                return h.getToken() !== g.StringLiteral ? (a(w.PropertyNameExpected, [], [g.CloseBraceToken, g.CommaToken]), !1) : (c(!1), h.getToken() === g.ColonToken ? (E(":"), s(), d() || a(w.ValueExpected, [], [g.CloseBraceToken, g.CommaToken])) : a(w.ColonExpected, [], [g.CloseBraceToken, g.CommaToken]), !0)
            }

            function f() {
                v(), s()
                for (var e = !1; h.getToken() !== g.CloseBraceToken && h.getToken() !== g.EOF;) {
                    if (h.getToken() === g.CommaToken) {
                        if (e || a(w.ValueExpected, [], []), E(","), s(), h.getToken() === g.CloseBraceToken && O)break
                    } else e && a(w.CommaExpected, [], [])
                    l() || a(w.ValueExpected, [], [g.CloseBraceToken, g.CommaToken]), e = !0
                }
                return y(), h.getToken() !== g.CloseBraceToken ? a(w.CloseBraceExpected, [g.CloseBraceToken], []) : s(), !0
            }

            function p() {
                b(), s()
                for (var e = !1; h.getToken() !== g.CloseBracketToken && h.getToken() !== g.EOF;)h.getToken() === g.CommaToken ? (e || a(w.ValueExpected, [], []), E(","), s()) : e && a(w.CommaExpected, [], []), d() || a(w.ValueExpected, [], [g.CloseBracketToken, g.CommaToken]), e = !0
                return S(), h.getToken() !== g.CloseBracketToken ? a(w.CloseBracketExpected, [g.CloseBracketToken], []) : s(), !0
            }

            function d() {
                switch (h.getToken()) {
                    case g.OpenBracketToken:
                        return p()
                    case g.OpenBraceToken:
                        return f()
                    case g.StringLiteral:
                        return c(!0)
                    default:
                        return u()
                }
            }

            var h = r(e, !1), v = i(t.onObjectBegin), m = o(t.onObjectProperty), y = i(t.onObjectEnd),
                b = i(t.onArrayBegin), S = i(t.onArrayEnd), _ = o(t.onLiteralValue), E = o(t.onSeparator),
                C = o(t.onError), P = n && n.disallowComments, O = n && n.allowTrailingComma
            return s(), h.getToken() === g.EOF || (d() ? (h.getToken() !== g.EOF && a(w.EndOfFileExpected, [], []), !0) : (a(w.ValueExpected, [], []), !1))
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var m
        !function (e) {
            e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter"
        }(m = t.ScanError || (t.ScanError = {}))
        var g
        !function (e) {
            e[e.Unknown = 0] = "Unknown", e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.EOF = 16] = "EOF"
        }(g = t.SyntaxKind || (t.SyntaxKind = {})), t.createScanner = r
        var y
        !function (e) {
            e[e.nullCharacter = 0] = "nullCharacter", e[e.maxAsciiCharacter = 127] = "maxAsciiCharacter", e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.lineSeparator = 8232] = "lineSeparator", e[e.paragraphSeparator = 8233] = "paragraphSeparator", e[e.nextLine = 133] = "nextLine", e[e.space = 32] = "space", e[e.nonBreakingSpace = 160] = "nonBreakingSpace", e[e.enQuad = 8192] = "enQuad", e[e.emQuad = 8193] = "emQuad", e[e.enSpace = 8194] = "enSpace", e[e.emSpace = 8195] = "emSpace", e[e.threePerEmSpace = 8196] = "threePerEmSpace", e[e.fourPerEmSpace = 8197] = "fourPerEmSpace", e[e.sixPerEmSpace = 8198] = "sixPerEmSpace", e[e.figureSpace = 8199] = "figureSpace", e[e.punctuationSpace = 8200] = "punctuationSpace", e[e.thinSpace = 8201] = "thinSpace", e[e.hairSpace = 8202] = "hairSpace", e[e.zeroWidthSpace = 8203] = "zeroWidthSpace", e[e.narrowNoBreakSpace = 8239] = "narrowNoBreakSpace", e[e.ideographicSpace = 12288] = "ideographicSpace", e[e.mathematicalSpace = 8287] = "mathematicalSpace", e[e.ogham = 5760] = "ogham", e[e._ = 95] = "_", e[e.$ = 36] = "$", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.ampersand = 38] = "ampersand", e[e.asterisk = 42] = "asterisk", e[e.at = 64] = "at", e[e.backslash = 92] = "backslash", e[e.bar = 124] = "bar", e[e.caret = 94] = "caret", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.closeParen = 41] = "closeParen", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot",e[e.doubleQuote = 34] = "doubleQuote",e[e.equals = 61] = "equals",e[e.exclamation = 33] = "exclamation",e[e.greaterThan = 62] = "greaterThan",e[e.lessThan = 60] = "lessThan",e[e.minus = 45] = "minus",e[e.openBrace = 123] = "openBrace",e[e.openBracket = 91] = "openBracket",e[e.openParen = 40] = "openParen",e[e.percent = 37] = "percent",e[e.plus = 43] = "plus",e[e.question = 63] = "question",e[e.semicolon = 59] = "semicolon",e[e.singleQuote = 39] = "singleQuote",e[e.slash = 47] = "slash",e[e.tilde = 126] = "tilde",e[e.backspace = 8] = "backspace",e[e.formFeed = 12] = "formFeed",e[e.byteOrderMark = 65279] = "byteOrderMark",e[e.tab = 9] = "tab",e[e.verticalTab = 11] = "verticalTab"
        }(y || (y = {})), t.stripComments = a
        var w
        !function (e) {
            e[e.InvalidSymbol = 0] = "InvalidSymbol", e[e.InvalidNumberFormat = 1] = "InvalidNumberFormat", e[e.PropertyNameExpected = 2] = "PropertyNameExpected", e[e.ValueExpected = 3] = "ValueExpected", e[e.ColonExpected = 4] = "ColonExpected", e[e.CommaExpected = 5] = "CommaExpected", e[e.CloseBraceExpected = 6] = "CloseBraceExpected", e[e.CloseBracketExpected = 7] = "CloseBracketExpected", e[e.EndOfFileExpected = 8] = "EndOfFileExpected"
        }(w = t.ParseErrorCode || (t.ParseErrorCode = {})), t.getParseErrorMessage = c, t.getLocation = l, t.parse = f, t.parseTree = p, t.findNodeAtLocation = d, t.getNodeValue = h, t.visit = v
    }), define(e[57], t([1, 0, 28, 7, 8, 9, 4, 63]), function (e, t, n, r, i, o, s, a) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var c = function () {
            function e(e, t) {
                void 0 === t && (t = {
                    changeBufferDelay: 0,
                    defaultConfig: Object.create(null)
                }), this._path = e, this.options = t, this.disposables = [], this._onDidUpdateConfiguration = new s.Emitter, this.disposables.push(this._onDidUpdateConfiguration), this.registerWatcher(), this.initAsync()
            }

            return Object.defineProperty(e.prototype, "path", {
                get: function () {
                    return this._path
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "hasParseErrors", {
                get: function () {
                    return this.parseErrors && this.parseErrors.length > 0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onDidUpdateConfiguration", {
                get: function () {
                    return this._onDidUpdateConfiguration.event
                }, enumerable: !0, configurable: !0
            }), e.prototype.initAsync = function () {
                var e = this
                this.loadAsync(function (t) {
                    e.loaded || e.updateCache(t)
                })
            }, e.prototype.updateCache = function (e) {
                this.cache = e, this.loaded = !0
            }, e.prototype.loadSync = function () {
                try {
                    return this.parse(n.readFileSync(this._path).toString())
                } catch (e) {
                    return this.options.defaultConfig
                }
            }, e.prototype.loadAsync = function (e) {
                var t = this
                n.readFile(this._path, function (n, r) {
                    return e(n ? t.options.defaultConfig : t.parse(r.toString()))
                })
            }, e.prototype.parse = function (e) {
                var t
                try {
                    this.parseErrors = [], t = this.options.parse ? this.options.parse(e, this.parseErrors) : a.parse(e, this.parseErrors)
                } catch (e) {
                }
                return t || this.options.defaultConfig
            }, e.prototype.registerWatcher = function () {
                var e = this, t = r.dirname(this._path)
                this.watch(t), n.lstat(this._path, function (t, r) {
                    t || r.isDirectory() || r.isSymbolicLink() && n.readlink(e._path, function (t, n) {
                        t || e.watch(n)
                    })
                })
            }, e.prototype.watch = function (e) {
                var t = this
                if (!this.disposed)try {
                    var r = n.watch(e)
                    r.on("change", function () {
                        return t.onConfigFileChange()
                    }), this.disposables.push(o.toDisposable(function () {
                        r.removeAllListeners(), r.close()
                    }))
                } catch (t) {
                    n.exists(e, function (n) {
                        n && console.warn("Failed to watch " + e + " for configuration changes (" + t.toString() + ")")
                    })
                }
            }, e.prototype.onConfigFileChange = function () {
                var e = this
                this.timeoutHandle && (global.clearTimeout(this.timeoutHandle), this.timeoutHandle = null), this.timeoutHandle = global.setTimeout(function () {
                    return e.reload()
                }, this.options.changeBufferDelay)
            }, e.prototype.reload = function (e) {
                var t = this
                this.loadAsync(function (n) {
                    if (i.equals(n, t.cache) || (t.updateCache(n), t._onDidUpdateConfiguration.fire({config: t.cache})), e)return e(n)
                })
            }, e.prototype.getConfig = function () {
                return this.ensureLoaded(), this.cache
            }, e.prototype.getValue = function (e, t) {
                if (this.ensureLoaded(), !e)return t
                var n = this.cache ? this.cache[e] : void 0
                return void 0 !== n ? n : t
            }, e.prototype.ensureLoaded = function () {
                this.loaded || this.updateCache(this.loadSync())
            }, e.prototype.dispose = function () {
                this.disposed = !0, this.disposables = o.dispose(this.disposables)
            }, e
        }()
        t.ConfigWatcher = c
    }), define(e[123], t([15, 14]), function (e, t) {
        return e.create("vs/base/common/severity", t)
    }), define(e[128], t([1, 0, 123, 11]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i
        !function (e) {
            e[e.Ignore = 0] = "Ignore", e[e.Info = 1] = "Info", e[e.Warning = 2] = "Warning", e[e.Error = 3] = "Error"
        }(i || (i = {})), function (e) {
            function t(t) {
                return t ? r.equalsIgnoreCase(s, t) ? e.Error : r.equalsIgnoreCase(a, t) || r.equalsIgnoreCase(c, t) ? e.Warning : r.equalsIgnoreCase(u, t) ? e.Info : e.Ignore : e.Ignore
            }

            function i(e) {
                return l[e] || r.empty
            }

            function o(e, t) {
                return t - e
            }

            var s = "error", a = "warning", c = "warn", u = "info", l = Object.create(null)
            l[e.Error] = n.localize(0, null), l[e.Warning] = n.localize(1, null), l[e.Info] = n.localize(2, null), e.fromValue = t, e.toString = i, e.compare = o
        }(i || (i = {})), t["default"] = i
    }), define(e[64], t([15, 14]), function (e, t) {
        return e.create("vs/code/electron-main/menus", t)
    }), define(e[65], t([15, 14]), function (e, t) {
        return e.create("vs/code/electron-main/window", t)
    }), define(e[66], t([15, 14]), function (e, t) {
        return e.create("vs/code/electron-main/windows", t)
    }), define(e[67], t([15, 14]), function (e, t) {
        return e.create("vs/platform/configuration/common/configurationRegistry", t)
    }), define(e[68], t([15, 14]), function (e, t) {
        return e.create("vs/platform/environment/node/argv", t)
    }), define(e[69], t([15, 14]), function (e, t) {
        return e.create("vs/platform/extensions/common/extensionsRegistry", t)
    }), define(e[70], t([15, 14]), function (e, t) {
        return e.create("vs/platform/request/node/request", t)
    }), define(e[71], t([15, 14]), function (e, t) {
        return e.create("vs/platform/telemetry/common/telemetryService", t)
    }), define(e[72], t([15, 14]), function (e, t) {
        return e.create("vs/workbench/parts/git/electron-main/askpassService", t)
    }), define(e[73], t([1, 0]), function (e, t) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var n = function () {
            function e(e) {
                this.service = e
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"getBackupPath":
                        return this.service.getBackupPath(t)
                }
            }, e
        }()
        t.BackupChannel = n
        var r = function () {
            function e(e) {
                this.channel = e
            }

            return e.prototype.getBackupPath = function (e) {
                return this.channel.call("getBackupPath", e)
            }, e
        }()
        t.BackupChannelClient = r
    }), define(e[52], t([1, 0, 26, 133, 121, 20, 68]), function (e, t, n, r, i, o, s) {
        "use strict"
        function a(e) {
            return e["goto"] && e._.forEach(function (e) {
                return i(/^(\w:)?[^:]+(:\d*){0,2}$/.test(e), s.localize(0, null))
            }), e
        }

        function c(e) {
            var t = o.firstIndex(e, function (e) {
                return !/^-/.test(e)
            })
            if (t > -1)return e.slice(0, t).concat(e.slice(t + 1))
        }

        function u(e) {
            var t = e.slice(1)
            return process.env.VSCODE_DEV && (t = c(t)), a(f(t))
        }

        function l(e) {
            var t = e.slice(2)
            return process.env.VSCODE_DEV && (t = c(t)), a(f(t))
        }

        function f(e) {
            return r(e, v)
        }

        function p(e, t) {
            var n = Object.keys(e), r = Math.max.apply(null, n.map(function (e) {
                    return e.length
                })) + 2 + 1
            if (t - r < 25)return n.reduce(function (t, n) {
                return t.concat(["  " + n, "      " + e[n]])
            }, []).join("\n")
            var i = t - r - 1, o = ""
            return n.forEach(function (t) {
                var n = d(e[t], i), s = " ".repeat(r - t.length - 2)
                o.length > 0 && (o += "\n"), o += "  " + t + s + n[0]
                for (var a = 1; a < n.length; a++)o += "\n" + " ".repeat(r) + n[a]
            }), o
        }

        function d(e, t) {
            for (var n = []; e.length;) {
                var r = e.length < t ? e.length : e.lastIndexOf(" ", t), i = e.slice(0, r).trim()
                e = e.slice(r), n.push(i)
            }
            return n
        }

        function h(e, r, i) {
            var o = process.stdout.isTTY ? process.stdout.columns : 80, a = r + ("win32" === n.platform() ? ".exe" : "")
            return e + " " + i + "\n\n" + s.localize(21, null) + ": " + a + " [" + s.localize(22, null) + "] [" + s.localize(23, null) + "...]\n\n" + s.localize(24, null) + ":\n" + p(t.optionsHelp, o)
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var v = {
            string: ["locale", "user-data-dir", "extensions-dir", "extensionDevelopmentPath", "extensionTestsPath", "install-extension", "uninstall-extension", "debugBrkPluginHost", "debugPluginHost", "open-url", "prof-startup-timers", "enable-proposed-api"],
            "boolean": ["help", "version", "wait", "diff", "goto", "new-window", "unity-launch", "reuse-window", "performance", "prof-startup", "verbose", "logExtensionHostCommunication", "disable-extensions", "list-extensions", "show-versions", "nolazy"],
            alias: {
                help: "h",
                version: "v",
                wait: "w",
                diff: "d",
                "goto": "g",
                "new-window": "n",
                "reuse-window": "r",
                performance: "p",
                "disable-extensions": "disableExtensions",
                "extensions-dir": "extensionHomePath"
            }
        }
        t.parseMainProcessArgv = u, t.parseCLIProcessArgv = l, t.parseArgs = f, t.optionsHelp = {
            "-d, --diff": s.localize(1, null),
            "-g, --goto": s.localize(2, null),
            "--locale <locale>": s.localize(3, null),
            "-n, --new-window": s.localize(4, null),
            "-p, --performance": s.localize(5, null),
            "--prof-startup": s.localize(6, null),
            "-r, --reuse-window": s.localize(7, null),
            "--user-data-dir <dir>": s.localize(8, null),
            "--verbose": s.localize(9, null),
            "-w, --wait": s.localize(10, null),
            "--extensions-dir <dir>": s.localize(11, null),
            "--list-extensions": s.localize(12, null),
            "--show-versions": s.localize(13, null),
            "--install-extension <ext>": s.localize(14, null),
            "--uninstall-extension <ext>": s.localize(15, null),
            "--enable-proposed-api <ext>": s.localize(16, null),
            "--disable-extensions": s.localize(17, null),
            "--disable-gpu": s.localize(18, null),
            "-v, --version": s.localize(19, null),
            "-h, --help": s.localize(20, null)
        }, t.formatOptions = p, t.buildHelpMessage = h
    }), define(e[50], t([1, 0, 17]), function (e, t, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = function () {
            function e(e) {
                this._staticArguments = e
            }

            return e.prototype.appendStaticArguments = function (e) {
                this._staticArguments.push.apply(this._staticArguments, e)
            }, e.prototype.staticArguments = function (e) {
                return isNaN(e) ? this._staticArguments.slice(0) : this._staticArguments[e]
            }, e.prototype._validate = function (e) {
                if (!e)throw r.illegalArgument("can not be falsy")
            }, e
        }()
        t.AbstractDescriptor = i
        var o = function (e) {
            function t(t) {
                for (var n = [], r = 1; r < arguments.length; r++)n[r - 1] = arguments[r]
                var i = e.call(this, n) || this
                return i._ctor = t, i
            }

            return n(t, e), Object.defineProperty(t.prototype, "ctor", {
                get: function () {
                    return this._ctor
                }, enumerable: !0, configurable: !0
            }), t.prototype.bind = function () {
                for (var e = [], n = 0; n < arguments.length; n++)e[n] = arguments[n]
                var r = []
                return r = r.concat(this.staticArguments()), r = r.concat(e), new (t.bind.apply(t, [void 0, this._ctor].concat(r)))
            }, t
        }(i)
        t.SyncDescriptor = o, t.createSyncDescriptor = function (e) {
            for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
            return new (o.bind.apply(o, [void 0, e].concat(t)))
        }
        var s = function (e) {
            function t(t, n) {
                for (var r = [], i = 2; i < arguments.length; i++)r[i - 2] = arguments[i]
                var o = e.call(this, r) || this
                if (o._moduleName = t, o._ctorName = n, "string" != typeof t)throw new Error("Invalid AsyncDescriptor arguments, expected `moduleName` to be a string!")
                return o
            }

            return n(t, e), t.create = function (e, n) {
                return new t(e, n)
            }, Object.defineProperty(t.prototype, "moduleName", {
                get: function () {
                    return this._moduleName
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "ctorName", {
                get: function () {
                    return this._ctorName
                }, enumerable: !0, configurable: !0
            }), t.prototype.bind = function () {
                for (var e = [], n = 0; n < arguments.length; n++)e[n] = arguments[n]
                var r = []
                return r = r.concat(this.staticArguments()), r = r.concat(e), new (t.bind.apply(t, [void 0, this.moduleName, this.ctorName].concat(r)))
            }, t
        }(i)
        t.AsyncDescriptor = s
    }), define(e[3], t([1, 0]), function (e, t) {
        "use strict"
        function n(e, t, n, r) {
            t[o.DI_TARGET] === t ? t[o.DI_DEPENDENCIES].push({
                id: e,
                index: n,
                optional: r
            }) : (t[o.DI_DEPENDENCIES] = [{id: e, index: n, optional: r}], t[o.DI_TARGET] = t)
        }

        function r(e) {
            if (o.serviceIds.has(e))return o.serviceIds.get(e)
            var t = function (e, r, i) {
                if (3 !== arguments.length)throw new Error("@IServiceName-decorator can only be used to decorate a parameter")
                n(t, e, i, !1)
            }
            return t.toString = function () {
                return e
            }, o.serviceIds.set(e, t), t
        }

        function i(e) {
            return function (t, r, i) {
                if (3 !== arguments.length)throw new Error("@optional-decorator can only be used to decorate a parameter")
                n(e, t, i, !0)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var o
        !function (e) {
            function t(t) {
                return t[e.DI_DEPENDENCIES] || []
            }

            e.serviceIds = new Map, e.DI_TARGET = "$di$target", e.DI_DEPENDENCIES = "$di$dependencies", e.getServiceDependencies = t
        }(o = t._util || (t._util = {})), t.IInstantiationService = r("instantiationService"), t.createDecorator = r, t.optional = i
    }), define(e[42], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IBackupMainService = n.createDecorator("backupMainService"), t.IBackupService = n.createDecorator("backupService")
    }), define(e[12], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        function r(e, t, n) {
            var r = t.split("."), i = function (e, t) {
                for (var n = e, r = 0; r < t.length; r++) {
                    if ("object" != typeof n || null === n)return
                    n = n[t[r]]
                }
                return n
            }(e, r)
            return void 0 === i ? n : i
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.IConfigurationService = n.createDecorator("configurationService")
        !function (e) {
            e[e.Default = 1] = "Default", e[e.User = 2] = "User", e[e.Workspace = 3] = "Workspace"
        }(t.ConfigurationSource || (t.ConfigurationSource = {})), t.getConfigurationValue = r
    }), define(e[13], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IEnvironmentService = n.createDecorator("environmentService")
    })
    var i = this && this.__param || function (e, t) {
            return function (n, r) {
                t(n, r, e)
            }
        }
    define(e[25], t([1, 0, 3, 13]), function (e, t, n, o) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ILogService = n.createDecorator("logService")
        var s = function () {
            function e(e) {
                this.environmentService = e
            }

            return e.prototype.log = function () {
                for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
                this.environmentService.verbose && console.log.apply(console, ["[93m[main " + (new Date).toLocaleTimeString() + "][0m"].concat(e))
            }, e
        }()
        s = r([i(0, o.IEnvironmentService)], s), t.MainLogService = s
    }), define(e[27], t([1, 0, 7, 38, 13, 3]), function (e, t, n, o, s, a) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IStorageService = a.createDecorator("storageService")
        var c = function () {
            function e(e) {
                this.environmentService = e, this.database = null, this.dbPath = n.join(e.userDataPath, "storage.json")
            }

            return e.prototype.getItem = function (e, t) {
                return this.database || (this.database = this.load()), void 0 === this.database[e] ? t : this.database[e]
            }, e.prototype.setItem = function (e, t) {
                this.database || (this.database = this.load()), ("string" != typeof t && "number" != typeof t && "boolean" != typeof t || this.database[e] !== t) && (this.database[e] = t, this.save())
            }, e.prototype.removeItem = function (e) {
                this.database || (this.database = this.load()), this.database[e] && (delete this.database[e], this.save())
            }, e.prototype.load = function () {
                try {
                    return JSON.parse(o.readFileSync(this.dbPath).toString())
                } catch (e) {
                    return this.environmentService.verbose && console.error(e), {}
                }
            }, e.prototype.save = function () {
                try {
                    o.writeFileSync(this.dbPath, JSON.stringify(this.database, null, 4))
                } catch (e) {
                    this.environmentService.verbose && console.error(e)
                }
            }, e
        }()
        c = r([i(0, s.IEnvironmentService)], c), t.StorageService = c
    }), define(e[23], t([1, 0, 18, 78, 5, 3, 11]), function (e, t, r, i, o, s, a) {
        "use strict"
        function c(e, t, n) {
            var r = e === t
            return !n || r ? r : !(!e || !t) && a.equalsIgnoreCase(e, t)
        }

        function u(e, t, n) {
            return !(!e || !t || e === t) && !(t.length > e.length) && (t.charAt(t.length - 1) !== r.nativeSep && (t += r.nativeSep), n ? a.beginsWithIgnoreCase(e, t) : 0 === e.indexOf(t))
        }

        function l(e, t, n) {
            if (e === t)return !0
            if (!e || !t)return !1
            if (t.length > e.length)return !1
            if (n) {
                if (!a.beginsWithIgnoreCase(e, t))return !1
                if (t.length === e.length)return !0
                var i = t.length
                return t.charAt(t.length - 1) === r.nativeSep && i--, e.charAt(i) === r.nativeSep
            }
            return t.charAt(t.length - 1) !== r.nativeSep && (t += r.nativeSep), 0 === e.indexOf(t)
        }

        function f(e, t, n) {
            return t.length > e.length ? -1 : e === t ? 0 : (n && (e = e.toLowerCase(), t = t.toLowerCase()), e.indexOf(t))
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.IFileService = s.createDecorator("fileService")
        !function (e) {
            e[e.CREATE = 0] = "CREATE", e[e.DELETE = 1] = "DELETE", e[e.MOVE = 2] = "MOVE", e[e.COPY = 3] = "COPY", e[e.IMPORT = 4] = "IMPORT"
        }(t.FileOperation || (t.FileOperation = {}))
        var p = function () {
            function e(e, t, n) {
                this._resource = e, this._operation = t, this._target = n
            }

            return Object.defineProperty(e.prototype, "resource", {
                get: function () {
                    return this._resource
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "target", {
                get: function () {
                    return this._target
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "operation", {
                get: function () {
                    return this._operation
                }, enumerable: !0, configurable: !0
            }), e
        }()
        t.FileOperationEvent = p
        var d
        !function (e) {
            e[e.UPDATED = 0] = "UPDATED", e[e.ADDED = 1] = "ADDED", e[e.DELETED = 2] = "DELETED"
        }(d = t.FileChangeType || (t.FileChangeType = {}))
        var h = function (e) {
            function t(t) {
                var n = e.call(this) || this
                return n._changes = t, n
            }

            return n(t, e), Object.defineProperty(t.prototype, "changes", {
                get: function () {
                    return this._changes
                }, enumerable: !0, configurable: !0
            }), t.prototype.contains = function (e, t) {
                return !!e && this._changes.some(function (n) {
                        return n.type === t && (t === d.DELETED ? l(e.fsPath, n.resource.fsPath, !o.isLinux) : c(e.fsPath, n.resource.fsPath, !o.isLinux))
                    })
            }, t.prototype.getAdded = function () {
                return this.getOfType(d.ADDED)
            }, t.prototype.gotAdded = function () {
                return this.hasType(d.ADDED)
            }, t.prototype.getDeleted = function () {
                return this.getOfType(d.DELETED)
            }, t.prototype.gotDeleted = function () {
                return this.hasType(d.DELETED)
            }, t.prototype.getUpdated = function () {
                return this.getOfType(d.UPDATED)
            }, t.prototype.gotUpdated = function () {
                return this.hasType(d.UPDATED)
            }, t.prototype.getOfType = function (e) {
                return this._changes.filter(function (t) {
                    return t.type === e
                })
            }, t.prototype.hasType = function (e) {
                return this._changes.some(function (t) {
                    return t.type === e
                })
            }, t
        }(i.Event)
        t.FileChangesEvent = h, t.isEqual = c, t.isParent = u, t.isEqualOrParent = l, t.indexOf = f
        !function (e) {
            e[e.FILE_IS_BINARY = 0] = "FILE_IS_BINARY", e[e.FILE_IS_DIRECTORY = 1] = "FILE_IS_DIRECTORY", e[e.FILE_NOT_FOUND = 2] = "FILE_NOT_FOUND", e[e.FILE_NOT_MODIFIED_SINCE = 3] = "FILE_NOT_MODIFIED_SINCE", e[e.FILE_MODIFIED_SINCE = 4] = "FILE_MODIFIED_SINCE", e[e.FILE_MOVE_CONFLICT = 5] = "FILE_MOVE_CONFLICT", e[e.FILE_READ_ONLY = 6] = "FILE_READ_ONLY", e[e.FILE_TOO_LARGE = 7] = "FILE_TOO_LARGE", e[e.FILE_INVALID_PATH = 8] = "FILE_INVALID_PATH"
        }(t.FileOperationResult || (t.FileOperationResult = {})), t.MAX_FILE_SIZE = 52428800, t.AutoSaveConfiguration = {
            OFF: "off",
            AFTER_DELAY: "afterDelay",
            ON_FOCUS_CHANGE: "onFocusChange",
            ON_WINDOW_CHANGE: "onWindowChange"
        }, t.HotExitConfiguration = {
            OFF: "off",
            ON_EXIT: "onExit",
            ON_EXIT_AND_WINDOW_CLOSE: "onExitAndWindowClose"
        }, t.CONTENT_CHANGE_EVENT_BUFFER_DELAY = 1e3, t.SUPPORTED_ENCODINGS = {
            utf8: {
                labelLong: "UTF-8",
                labelShort: "UTF-8",
                order: 1,
                alias: "utf8bom"
            },
            utf8bom: {
                labelLong: "UTF-8 with BOM",
                labelShort: "UTF-8 with BOM",
                encodeOnly: !0,
                order: 2,
                alias: "utf8"
            },
            utf16le: {labelLong: "UTF-16 LE", labelShort: "UTF-16 LE", order: 3},
            utf16be: {labelLong: "UTF-16 BE", labelShort: "UTF-16 BE", order: 4},
            windows1252: {labelLong: "Western (Windows 1252)", labelShort: "Windows 1252", order: 5},
            iso88591: {labelLong: "Western (ISO 8859-1)", labelShort: "ISO 8859-1", order: 6},
            iso88593: {labelLong: "Western (ISO 8859-3)", labelShort: "ISO 8859-3", order: 7},
            iso885915: {labelLong: "Western (ISO 8859-15)", labelShort: "ISO 8859-15", order: 8},
            macroman: {labelLong: "Western (Mac Roman)", labelShort: "Mac Roman", order: 9},
            cp437: {labelLong: "DOS (CP 437)", labelShort: "CP437", order: 10},
            windows1256: {labelLong: "Arabic (Windows 1256)", labelShort: "Windows 1256", order: 11},
            iso88596: {labelLong: "Arabic (ISO 8859-6)", labelShort: "ISO 8859-6", order: 12},
            windows1257: {labelLong: "Baltic (Windows 1257)", labelShort: "Windows 1257", order: 13},
            iso88594: {labelLong: "Baltic (ISO 8859-4)", labelShort: "ISO 8859-4", order: 14},
            iso885914: {labelLong: "Celtic (ISO 8859-14)", labelShort: "ISO 8859-14", order: 15},
            windows1250: {labelLong: "Central European (Windows 1250)", labelShort: "Windows 1250", order: 16},
            iso88592: {labelLong: "Central European (ISO 8859-2)", labelShort: "ISO 8859-2", order: 17},
            cp852: {labelLong: "Central European (CP 852)", labelShort: "CP 852", order: 18},
            windows1251: {labelLong: "Cyrillic (Windows 1251)", labelShort: "Windows 1251", order: 19},
            cp866: {labelLong: "Cyrillic (CP 866)", labelShort: "CP 866", order: 20},
            iso88595: {labelLong: "Cyrillic (ISO 8859-5)", labelShort: "ISO 8859-5", order: 21},
            koi8r: {labelLong: "Cyrillic (KOI8-R)", labelShort: "KOI8-R", order: 22},
            koi8u: {labelLong: "Cyrillic (KOI8-U)", labelShort: "KOI8-U", order: 23},
            iso885913: {labelLong: "Estonian (ISO 8859-13)", labelShort: "ISO 8859-13", order: 24},
            windows1253: {labelLong: "Greek (Windows 1253)", labelShort: "Windows 1253", order: 25},
            iso88597: {labelLong: "Greek (ISO 8859-7)", labelShort: "ISO 8859-7", order: 26},
            windows1255: {labelLong: "Hebrew (Windows 1255)", labelShort: "Windows 1255", order: 27},
            iso88598: {labelLong: "Hebrew (ISO 8859-8)", labelShort: "ISO 8859-8", order: 28},
            iso885910: {labelLong: "Nordic (ISO 8859-10)", labelShort: "ISO 8859-10", order: 29},
            iso885916: {labelLong: "Romanian (ISO 8859-16)", labelShort: "ISO 8859-16", order: 30},
            windows1254: {labelLong: "Turkish (Windows 1254)", labelShort: "Windows 1254", order: 31},
            iso88599: {labelLong: "Turkish (ISO 8859-9)", labelShort: "ISO 8859-9", order: 32},
            windows1258: {labelLong: "Vietnamese (Windows 1258)", labelShort: "Windows 1258", order: 33},
            gbk: {labelLong: "Chinese (GBK)", labelShort: "GBK", order: 34},
            gb18030: {labelLong: "Chinese (GB18030)", labelShort: "GB18030", order: 35},
            cp950: {labelLong: "Traditional Chinese (Big5)", labelShort: "Big5", order: 36},
            big5hkscs: {labelLong: "Traditional Chinese (Big5-HKSCS)", labelShort: "Big5-HKSCS", order: 37},
            shiftjis: {labelLong: "Japanese (Shift JIS)", labelShort: "Shift JIS", order: 38},
            eucjp: {labelLong: "Japanese (EUC-JP)", labelShort: "EUC-JP", order: 39},
            euckr: {labelLong: "Korean (EUC-KR)", labelShort: "EUC-KR", order: 40},
            windows874: {labelLong: "Thai (Windows 874)", labelShort: "Windows 874", order: 41},
            iso885911: {labelLong: "Latin/Thai (ISO 8859-11)", labelShort: "ISO 8859-11", order: 42},
            koi8ru: {labelLong: "Cyrillic (KOI8-RU)", labelShort: "KOI8-RU", order: 43},
            koi8t: {labelLong: "Tajik (KOI8-T)", labelShort: "KOI8-T", order: 44},
            gb2312: {labelLong: "Simplified Chinese (GB 2312)", labelShort: "GB 2312", order: 45}
        }
    }), define(e[84], t([1, 0, 5, 6, 18, 11, 23]), function (e, t, n, r, i, o, s) {
        "use strict"
        function a(e, t, r) {
            var a = c(e)
            if (!a)return null
            var l = t && c(t)
            if (l && s.isEqualOrParent(a, l, !n.isLinux))return s.isEqual(l, a, !n.isLinux) ? "" : i.normalize(o.ltrim(a.substr(l.length), i.nativeSep), !0)
            if (n.isWindows && a && ":" === a[1])return i.normalize(a.charAt(0).toUpperCase() + a.slice(1), !0)
            var f = i.normalize(a, !0)
            return !n.isWindows && r && (f = u(f, r.userHome)), f
        }

        function c(e) {
            if (!e)return null
            if ("string" == typeof e)return e
            if (r.isFunction(e.getWorkspace)) {
                var t = e.getWorkspace()
                return t ? t.resource.fsPath : void 0
            }
            return e.fsPath
        }

        function u(e, t) {
            return e && (n.isMacintosh || n.isLinux) && s.isEqualOrParent(e, t, !n.isLinux) && (e = "~" + e.substr(t.length)), e
        }

        function l(e) {
            for (var t = new Array(e.length), n = !1, r = 0; r < e.length; r++) {
                var s = e[r]
                if ("" !== s)if (s) {
                    n = !0
                    var a = ""
                    0 === s.indexOf(h) ? (a = s.substr(0, s.indexOf(h) + h.length), s = s.substr(s.indexOf(h) + h.length)) : 0 === s.indexOf(i.nativeSep) && (a = s.substr(0, s.indexOf(i.nativeSep) + i.nativeSep.length), s = s.substr(s.indexOf(i.nativeSep) + i.nativeSep.length))
                    for (var c = s.split(i.nativeSep), u = 1; n && u <= c.length; u++)for (var l = c.length - u; n && l >= 0; l--) {
                        n = !1
                        for (var f = c.slice(l, l + u).join(i.nativeSep), p = 0; !n && p < e.length; p++)if (p !== r && e[p] && e[p].indexOf(f) > -1) {
                            var v = l + u === c.length,
                                m = l > 0 && e[p].indexOf(i.nativeSep) > -1 ? i.nativeSep + f : f,
                                g = o.endsWith(e[p], m)
                            n = !v || g
                        }
                        if (!n) {
                            var y = "";
                            (o.endsWith(c[0], ":") || "" !== a) && (1 === l && (l = 0, u++, f = c[0] + i.nativeSep + f), l > 0 && (y = c[0] + i.nativeSep), y = a + y), l > 0 && (y = y + d + i.nativeSep), y += f, l + u < c.length && (y = y + i.nativeSep + d), t[r] = y
                        }
                    }
                    n && (t[r] = s)
                } else t[r] = s
                else t[r] = "."
            }
            return t
        }

        function f(e, t) {
            void 0 === t && (t = Object.create(null))
            for (var n, r = [], i = !1, o = "", s = 0; s < e.length; s++)if ("$" === (n = e[s]) || i && "{" === n) o && r.push({
                value: o,
                type: v.TEXT
            }), o = "", i = !0
            else if ("}" === n && i) {
                var a = t[o]
                if ("string" == typeof a) a.length && r.push({value: a, type: v.VARIABLE})
                else if (a) {
                    var c = r[r.length - 1]
                    c && c.type === v.SEPARATOR || r.push({value: a.label, type: v.SEPARATOR})
                }
                o = "", i = !1
            } else o += n
            return o && !i && r.push({value: o, type: v.TEXT}), r.filter(function (e, t) {
                if (e.type === v.SEPARATOR)return [r[t - 1], r[t + 1]].every(function (e) {
                    return e && e.type === v.VARIABLE && e.value.length > 0
                })
                return !0
            }).map(function (e) {
                return e.value
            }).join("")
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var p = function () {
            function e(e) {
                this.root = e && c(e)
            }

            return e.prototype.getLabel = function (e) {
                return a(c(e), this.root)
            }, e
        }()
        t.PathLabelProvider = p, t.getPathLabel = a, t.tildify = u
        var d = "…", h = "\\\\"
        t.shorten = l
        var v
        !function (e) {
            e[e.TEXT = 0] = "TEXT", e[e.VARIABLE = 1] = "VARIABLE", e[e.SEPARATOR = 2] = "SEPARATOR"
        }(v || (v = {})), t.template = f
    }), define(e[85], t([1, 0, 20, 28, 7, 49, 5, 41, 13, 12, 23, 2]), function (e, t, n, o, s, a, c, u, l, f, p, d) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var h = function () {
            function e(e, t) {
                this.configurationService = t, this.backupHome = e.backupHome, this.workspacesJsonPath = e.backupWorkspacesPath, this.mapWindowToBackupFolder = Object.create(null), this.loadSync()
            }

            return e.prototype.getWorkspaceBackupPaths = function () {
                var e = this.configurationService.getConfiguration()
                return e && e.files && e.files.hotExit === p.HotExitConfiguration.ON_EXIT_AND_WINDOW_CLOSE ? [] : this.backups.folderWorkspaces.slice(0)
            }, e.prototype.getEmptyWorkspaceBackupPaths = function () {
                return this.backups.emptyWorkspaces.slice(0)
            }, e.prototype.getBackupPath = function (e) {
                if (!this.mapWindowToBackupFolder[e])throw new Error("Unknown backup workspace for window " + e)
                return d.TPromise.as(s.join(this.backupHome, this.mapWindowToBackupFolder[e]))
            }, e.prototype.registerWindowForBackupsSync = function (e, t, n, r) {
                t && !n && (n = this.getRandomEmptyWorkspaceId()), this.mapWindowToBackupFolder[e] = t ? n : this.getWorkspaceHash(r), this.pushBackupPathsSync(t ? n : r, t)
            }, e.prototype.pushBackupPathsSync = function (e, t) {
                var n = t ? this.backups.emptyWorkspaces : this.backups.folderWorkspaces
                return -1 === this.indexOf(e, t) && (n.push(e), this.saveSync()), e
            }, e.prototype.removeBackupPathSync = function (e, t) {
                var n = t ? this.backups.emptyWorkspaces : this.backups.folderWorkspaces
                if (n) {
                    var r = this.indexOf(e, t);
                    -1 !== r && (n.splice(r, 1), this.saveSync())
                }
            }, e.prototype.indexOf = function (e, t) {
                var r = this, i = t ? this.backups.emptyWorkspaces : this.backups.folderWorkspaces
                if (!i)return -1
                if (t)return i.indexOf(e)
                var o = this.sanitizePath(e)
                return n.firstIndex(i, function (e) {
                    return r.sanitizePath(e) === o
                })
            }, e.prototype.loadSync = function () {
                var e
                try {
                    e = JSON.parse(o.readFileSync(this.workspacesJsonPath, "utf8").toString())
                } catch (t) {
                    e = Object.create(null)
                }
                if (e.folderWorkspaces) {
                    var t = e.folderWorkspaces
                    Array.isArray(t) && !t.some(function (e) {
                        return "string" != typeof e
                    }) || (e.folderWorkspaces = [])
                } else e.folderWorkspaces = []
                if (e.emptyWorkspaces) {
                    var t = e.emptyWorkspaces
                    Array.isArray(t) && !t.some(function (e) {
                        return "string" != typeof e
                    }) || (e.emptyWorkspaces = [])
                } else e.emptyWorkspaces = []
                this.backups = this.dedupeFolderWorkspaces(e), this.validateBackupWorkspaces(e)
            }, e.prototype.dedupeFolderWorkspaces = function (e) {
                var t = this
                return e.folderWorkspaces = n.distinct(e.folderWorkspaces, function (e) {
                    return t.sanitizePath(e)
                }), e
            }, e.prototype.validateBackupWorkspaces = function (e) {
                var t = this, n = []
                e.folderWorkspaces.forEach(function (e) {
                    var r = s.join(t.backupHome, t.getWorkspaceHash(e)), i = t.hasBackupsSync(r),
                        a = i && !o.existsSync(e)
                    if ((!i || a) && (n.push({workspaceIdentifier: e, backupPath: r, isEmptyWorkspace: !1}), a)) {
                        var c = t.pushBackupPathsSync(t.getRandomEmptyWorkspaceId(), !0), u = s.join(s.dirname(r), c)
                        try {
                            o.renameSync(r, u)
                        } catch (e) {
                            console.error("Backup: Could not rename backup folder for missing workspace: " + e.toString()), t.removeBackupPathSync(c, !0)
                        }
                    }
                }), e.emptyWorkspaces.forEach(function (e) {
                    var r = s.join(t.backupHome, e)
                    t.hasBackupsSync(r) || n.push({workspaceIdentifier: e, backupPath: r, isEmptyWorkspace: !0})
                }), n.forEach(function (e) {
                    var n = e.backupPath, r = e.workspaceIdentifier, i = e.isEmptyWorkspace
                    try {
                        u.delSync(n)
                    } catch (e) {
                        console.error("Backup: Could not delete stale backup: " + e.toString())
                    }
                    t.removeBackupPathSync(r, i)
                })
            }, e.prototype.hasBackupsSync = function (e) {
                try {
                    var t = u.readdirSync(e)
                    return 0 !== t.length && t.some(function (t) {
                            try {
                                return u.readdirSync(s.join(e, t)).length > 0
                            } catch (e) {
                                return !1
                            }
                        })
                } catch (e) {
                    return !1
                }
            }, e.prototype.saveSync = function () {
                try {
                    o.existsSync(this.backupHome) || o.mkdirSync(this.backupHome), o.writeFileSync(this.workspacesJsonPath, JSON.stringify(this.backups))
                } catch (e) {
                    console.error("Backup: Could not save workspaces.json: " + e.toString())
                }
            }, e.prototype.getRandomEmptyWorkspaceId = function () {
                return (Date.now() + Math.round(1e3 * Math.random())).toString()
            }, e.prototype.sanitizePath = function (e) {
                return c.isLinux ? e : e.toLowerCase()
            }, e.prototype.getWorkspaceHash = function (e) {
                return a.createHash("md5").update(this.sanitizePath(e)).digest("hex")
            }, e
        }()
        h = r([i(0, l.IEnvironmentService), i(1, f.IConfigurationService)], h), t.BackupMainService = h
    }), define(e[44], t([1, 0]), function (e, t) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var n = function () {
            function e() {
                for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
                this._entries = new Map
                for (var n = 0, r = e; n < r.length; n++) {
                    var i = r[n], o = i[0], s = i[1]
                    this.set(o, s)
                }
            }

            return e.prototype.set = function (e, t) {
                var n = this._entries.get(e)
                return this._entries.set(e, t), n
            }, e.prototype.forEach = function (e) {
                this._entries.forEach(function (t, n) {
                    return e(n, t)
                })
            }, e.prototype.has = function (e) {
                return this._entries.has(e)
            }, e.prototype.get = function (e) {
                return this._entries.get(e)
            }, e
        }()
        t.ServiceCollection = n
    }), define(e[87], t([1, 0, 2, 17, 6, 59, 112, 50, 3, 44]), function (e, t, n, r, i, o, s, a, c, u) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var l = function () {
            function t(e, t) {
                void 0 === e && (e = new u.ServiceCollection), void 0 === t && (t = !1), this._services = e, this._strict = t, this._services.set(c.IInstantiationService, this)
            }

            return t.prototype.createChild = function (e) {
                var n = this
                return this._services.forEach(function (t, r) {
                    e.has(t) || (r instanceof a.SyncDescriptor && (r = n._createAndCacheServiceInstance(t, r)), e.set(t, r))
                }), new t(e, this._strict)
            }, t.prototype.invokeFunction = function (e) {
                for (var t = this, n = [], i = 1; i < arguments.length; i++)n[i - 1] = arguments[i]
                var o
                try {
                    return o = {
                        get: function (e, n) {
                            var r = t._getOrCreateServiceInstance(e)
                            if (!r && n !== c.optional)throw new Error("[invokeFunction] unkown service '" + e + "'")
                            return r
                        }
                    }, e.apply(void 0, [o].concat(n))
                } finally {
                    o.get = function () {
                        throw r.illegalState("service accessor is only valid during the invocation of its target method")
                    }
                }
            }, t.prototype.createInstance = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
                return e instanceof a.AsyncDescriptor ? this._createInstanceAsync(e, t) : e instanceof a.SyncDescriptor ? this._createInstance(e, t) : this._createInstance(new a.SyncDescriptor(e), t)
            }, t.prototype._createInstanceAsync = function (t, i) {
                var o, s = this
                return new n.TPromise(function (n, c, u) {
                    e([t.moduleName], function (e) {
                        if (o && c(o), !e)return c(r.illegalArgument("module not found: " + t.moduleName))
                        var u
                        if ("function" != typeof(u = t.ctorName ? e[t.ctorName] : e))return c(r.illegalArgument("not a function: " + t.ctorName || t.moduleName))
                        try {
                            i.unshift.apply(i, t.staticArguments()), n(s._createInstance(new a.SyncDescriptor(u), i))
                        } catch (e) {
                            return c(e)
                        }
                    }, c)
                }, function () {
                    o = r.canceled()
                })
            }, t.prototype._createInstance = function (e, t) {
                for (var n = e.staticArguments().concat(t), r = c._util.getServiceDependencies(e.ctor).sort(function (e, t) {
                    return e.index - t.index
                }), o = [], s = 0, a = r; s < a.length; s++) {
                    var u = a[s], l = this._getOrCreateServiceInstance(u.id)
                    if (!l && this._strict && !u.optional)throw new Error("[createInstance] " + e.ctor.name + " depends on UNKNOWN service " + u.id + ".")
                    o.push(l)
                }
                var f = r.length > 0 ? r[0].index : n.length
                if (n.length !== f) {
                    console.warn("[createInstance] First service dependency of " + e.ctor.name + " at position " + (f + 1) + " conflicts with " + n.length + " static arguments")
                    var p = f - n.length
                    n = p > 0 ? n.concat(new Array(p)) : n.slice(0, f)
                }
                var d = [e.ctor]
                d.push.apply(d, n), d.push.apply(d, o)
                var h = i.create.apply(null, d)
                return e._validate(h), h
            }, t.prototype._getOrCreateServiceInstance = function (e) {
                var t = this._services.get(e)
                return t instanceof a.SyncDescriptor ? this._createAndCacheServiceInstance(e, t) : t
            }, t.prototype._createAndCacheServiceInstance = function (e, t) {
                function n() {
                    var e = new Error("[createInstance] cyclic dependency between services")
                    throw e.message = r.toString(), e
                }

                o.ok(this._services.get(e) instanceof a.SyncDescriptor)
                for (var r = new s.Graph(function (e) {
                    return e.id.toString()
                }), i = 0, u = [{id: e, desc: t}]; u.length;) {
                    var l = u.pop()
                    r.lookupOrInsertNode(l), i++ > 100 && n()
                    for (var f = c._util.getServiceDependencies(l.desc.ctor), p = 0, d = f; p < d.length; p++) {
                        var h = d[p], v = this._services.get(h.id)
                        if (v || console.warn("[createInstance] " + e + " depends on " + h.id + " which is NOT registered."), v instanceof a.SyncDescriptor) {
                            var m = {id: h.id, desc: v}
                            r.insertEdge(l, m), u.push(m)
                        }
                    }
                }
                for (; ;) {
                    var g = r.roots()
                    if (0 === g.length) {
                        0 !== r.length && n()
                        break
                    }
                    for (var y = 0, w = g; y < w.length; y++) {
                        var b = w[y], S = this._createInstance(b.data.desc, [])
                        this._services.set(b.data.id, S), r.removeNode(b.data)
                    }
                }
                return this._services.get(e)
            }, t
        }()
        t.InstantiationService = l
    }), define(e[88], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        !function (e) {
            e[e.Default = 1] = "Default", e[e.User = 2] = "User"
        }(t.KeybindingSource || (t.KeybindingSource = {})), t.IKeybindingService = n.createDecorator("keybindingService")
    }), define(e[89], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ILifecycleService = n.createDecorator("lifecycleService")
        !function (e) {
            e[e.CLOSE = 0] = "CLOSE", e[e.QUIT = 1] = "QUIT", e[e.RELOAD = 2] = "RELOAD", e[e.LOAD = 3] = "LOAD"
        }(t.ShutdownReason || (t.ShutdownReason = {})), t.NullLifecycleService = {
            _serviceBrand: null,
            willShutdown: !1,
            onWillShutdown: function () {
                return {
                    dispose: function () {
                    }
                }
            },
            onShutdown: function (e) {
                return {
                    dispose: function () {
                    }
                }
            }
        }
    }), define(e[45], t([1, 0, 7, 19]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = n.dirname(r["default"].parse(e.toUrl("")).fsPath), o = n.join(i, "package.json")
        t["default"] = e.__$__nodeRequire(o)
    }), define(e[91], t([1, 0, 76, 45]), function (e, t, n, r) {
        "use strict"
        function i() {
            return n.getMachineId().then(function (e) {
                return {
                    "X-Market-Client-Id": "VSCode " + r["default"].version,
                    "User-Agent": "VSCode " + r["default"].version,
                    "X-Market-User-Id": e
                }
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.getCommonHTTPHeaders = i
    }), define(e[16], t([1, 0, 7, 19]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = n.dirname(r["default"].parse(e.toUrl("")).fsPath), o = n.join(i, "product.json"),
            s = e.__$__nodeRequire(o)
        process.env.VSCODE_DEV && (s.nameShort += " Dev", s.nameLong += " Dev", s.dataFolderName += "-dev"), t["default"] = s
    }), define(e[56], t([1, 0, 7, 5, 8, 81, 65, 27, 10, 2, 13, 25, 12, 52, 16, 91, 9]), function (e, t, n, o, s, a, c, u, l, f, p, d, h, v, m, g, y) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var w
        !function (e) {
            e[e.Maximized = 0] = "Maximized", e[e.Normal = 1] = "Normal", e[e.Minimized = 2] = "Minimized", e[e.Fullscreen = 3] = "Fullscreen"
        }(w = t.WindowMode || (t.WindowMode = {})), t.defaultWindowState = function (e) {
            return void 0 === e && (e = w.Normal), {width: 1024, height: 768, mode: e}
        }
        var b
        !function (e) {
            e[e.NONE = 0] = "NONE", e[e.LOADING = 1] = "LOADING", e[e.NAVIGATING = 2] = "NAVIGATING", e[e.READY = 3] = "READY"
        }(b = t.ReadyState || (t.ReadyState = {}))
        var S = function () {
            function r(e, t, i, s, a) {
                this.logService = t, this.environmentService = i, this.configurationService = s, this.storageService = a, this.options = e, this._lastFocusTime = -1, this._readyState = b.NONE, this._extensionDevelopmentPath = e.extensionDevelopmentPath, this._isExtensionTestHost = e.isExtensionTestHost, this.whenReadyCallbacks = [], this.toDispose = [], this.restoreWindowState(e.state)
                var c = this.currentWindowMode === w.Maximized || this.currentWindowMode === w.Fullscreen, u = {
                    width: this.windowState.width,
                    height: this.windowState.height,
                    x: this.windowState.x,
                    y: this.windowState.y,
                    backgroundColor: this.getBackgroundColor(),
                    minWidth: r.MIN_WIDTH,
                    minHeight: r.MIN_HEIGHT,
                    show: !c,
                    frame: false,
                    title: m["default"].nameLong,
                    webPreferences: {disableBlinkFeatures: "Auxclick"}
                }
                var f = this.configurationService.getConfiguration("window"), p = !1
                f && f.nativeTabs && (u.tabbingIdentifier = m["default"].nameShort, p = !0)
                var d = !1
                if (o.isMacintosh && (!f || !f.titleBarStyle || "custom" === f.titleBarStyle));
                p && (d = !1), d && (u.titleBarStyle = "hidden", this.hiddenTitleBarStyle = !0), this._win = new l.BrowserWindow(u), this._id = this._win.id, d && this._win.setSheetOffset(22), o.isWindows && m["default"].win32AppUserModelId && "function" == typeof this._win.setAppDetails && this._win.setAppDetails({
                    appId: m["default"].win32AppUserModelId,
                    relaunchCommand: '"' + process.execPath + '" -n',
                    relaunchDisplayName: m["default"].nameLong
                }), c && (this.win.maximize(), this.currentWindowMode === w.Fullscreen && this.win.setFullScreen(!0), this.win.isVisible() || this.win.show()), this._lastFocusTime = Date.now(), this.onConfigurationUpdated(), this.setCommonHTTPHeaders(), this.registerListeners()
            }

            return r.prototype.setCommonHTTPHeaders = function () {
                var e = this
                g.getCommonHTTPHeaders().done(function (t) {
                    if (e._win) {
                        var n = ["https://marketplace.visualstudio.com/*", "https://*.vsassets.io/*"]
                        e._win.webContents.session.webRequest.onBeforeSendHeaders({urls: n}, function (e, n) {
                            n({cancel: !1, requestHeaders: s.assign(e.requestHeaders, t)})
                        })
                    }
                })
            }, r.prototype.hasHiddenTitleBarStyle = function () {
                return this.hiddenTitleBarStyle
            }, Object.defineProperty(r.prototype, "isExtensionDevelopmentHost", {
                get: function () {
                    return !!this._extensionDevelopmentPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "isExtensionTestHost", {
                get: function () {
                    return this._isExtensionTestHost
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "extensionDevelopmentPath", {
                get: function () {
                    return this._extensionDevelopmentPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "config", {
                get: function () {
                    return this.currentConfig
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "id", {
                get: function () {
                    return this._id
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "win", {
                get: function () {
                    return this._win
                }, enumerable: !0, configurable: !0
            }), r.prototype.focus = function () {
                this._win && (this._win.isMinimized() && this._win.restore(), this._win.focus())
            }, Object.defineProperty(r.prototype, "lastFocusTime", {
                get: function () {
                    return this._lastFocusTime
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "openedWorkspacePath", {
                get: function () {
                    return this.currentConfig.workspacePath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(r.prototype, "openedFilePath", {
                get: function () {
                    return this.currentConfig.filesToOpen && this.currentConfig.filesToOpen[0] && this.currentConfig.filesToOpen[0].filePath
                }, enumerable: !0, configurable: !0
            }), r.prototype.setReady = function () {
                for (this._readyState = b.READY; this.whenReadyCallbacks.length;)this.whenReadyCallbacks.pop()(this)
            }, r.prototype.ready = function () {
                var e = this
                return new f.TPromise(function (t) {
                    if (e._readyState === b.READY)return t(e)
                    e.whenReadyCallbacks.push(t)
                })
            }, Object.defineProperty(r.prototype, "readyState", {
                get: function () {
                    return this._readyState
                }, enumerable: !0, configurable: !0
            }), r.prototype.registerNavigationListenerOn = function (e, t, n, r) {
                var i = this
                this._win.on(e, function (e, o) {
                    i.readyState === b.READY && (o === t ? i.send("vscode:runAction", r ? "workbench.action.openPreviousRecentlyUsedEditor" : "workbench.action.navigateBack") : o === n && i.send("vscode:runAction", r ? "workbench.action.openNextRecentlyUsedEditor" : "workbench.action.navigateForward"))
                })
            }, r.prototype.registerListeners = function () {
                var e = this
                this._win.webContents.on("did-finish-load", function () {
                    e._readyState = b.LOADING, e.pendingLoadConfig && (e.currentConfig = e.pendingLoadConfig, e.pendingLoadConfig = null), e.win.isVisible() || (e.currentWindowMode === w.Maximized && e.win.maximize(), e.win.isVisible() || e.win.show())
                }), this.registerNavigationListenerOn("app-command", "browser-backward", "browser-forward", !1), this._win.webContents.on("new-window", function (e, t) {
                    e.preventDefault(), l.shell.openExternal(t)
                }), this._win.on("focus", function () {
                    e._lastFocusTime = Date.now()
                }), this._win.on("enter-full-screen", function () {
                    e.sendWhenReady("vscode:enterFullScreen")
                }), this._win.on("leave-full-screen", function () {
                    e.sendWhenReady("vscode:leaveFullScreen")
                }), o.isWindows && l.systemPreferences.on("inverted-color-scheme-changed", function () {
                    l.systemPreferences.isInvertedColorScheme() ? e.sendWhenReady("vscode:enterHighContrast") : e.sendWhenReady("vscode:leaveHighContrast")
                }), this._win.webContents.on("did-fail-load", function (e, t, n) {
                    console.warn("[electron event]: fail to load, ", n)
                }), this.environmentService.isBuilt && this._win.webContents.on("will-navigate", function (e) {
                    e && e.preventDefault()
                }), this.toDispose.push(this.configurationService.onDidUpdateConfiguration(function (t) {
                    return e.onConfigurationUpdated()
                }))
            }, r.prototype.onConfigurationUpdated = function () {
                var e = this.getMenuBarVisibility()
                if (e !== this.currentMenuBarVisibility && (this.currentMenuBarVisibility = e, this.setMenuBarVisibility(e)), o.isMacintosh) {
                    var t = this.configurationService.getConfiguration()
                    t && t.workbench && t.workbench.editor && t.workbench.editor.swipeToNavigate ? this.registerNavigationListenerOn("swipe", "left", "right", !0) : this._win.removeAllListeners("swipe")
                }
            }, r.prototype.load = function (e) {
                var t = this
                this.readyState === b.NONE ? this.currentConfig = e : (this.pendingLoadConfig = e, this._readyState = b.NAVIGATING), o.isMacintosh && this._win.isDocumentEdited() && this._win.setDocumentEdited(!1), this._win.loadURL(this.getUrl(e)), /*this._win.openDevTools(),*/ this.environmentService.isBuilt || this.environmentService.extensionTestsPath || (this.showTimeoutHandle = setTimeout(function () {
                    !t._win || t._win.isVisible() || t._win.isMinimized() || (t._win.show(), t._win.focus(), t._win.webContents.openDevTools())
                }, 1e4))
                var n = this.environmentService.profileStartup
                n && a.stopProfiling(n.dir, n.prefix).done(void 0, function (e) {
                    return console.error(e)
                })
            }, r.prototype.reload = function (e) {
                var t = s.mixin({}, this.currentConfig)
                delete t.filesToOpen, delete t.filesToCreate, delete t.filesToDiff, this.isExtensionDevelopmentHost && e && (t.verbose = e.verbose, t.debugPluginHost = e.debugPluginHost, t.debugBrkPluginHost = e.debugBrkPluginHost, t["extensions-dir"] = e["extensions-dir"]), t.isInitialStartup = !1, this.load(t)
            }, r.prototype.getUrl = function (t) {
                var n = e.toUrl("vs/layaEditor/h5/index.html"),
                    r = this.configurationService.getConfiguration("window"), i = r && r.zoomLevel
                "number" == typeof i && (t.zoomLevel = i), t.fullscreen = this._win.isFullScreen(), t.highContrast = o.isWindows && l.systemPreferences.isInvertedColorScheme() && (!r || r.autoDetectHighContrast), t.accessibilitySupport = l.app.isAccessibilitySupportEnabled(), t.baseTheme = this.getBaseTheme(), t.backgroundColor = this.getBackgroundColor(), t.perfStartTime = global.perfStartTime, t.perfAppReady = global.perfAppReady, t.perfWindowLoadTime = Date.now()
                var a = v.parseArgs(process.argv), c = s.assign(a, t)
                for (var u in c)c[u] || delete c[u]
                var InnerVer = global.sharedObject.InnerVer;
                return n += "?config=" + encodeURIComponent(JSON.stringify(c)) + "&InnerVer=" + InnerVer;
            }, r.prototype.getBaseTheme = function () {
                return o.isWindows && l.systemPreferences.isInvertedColorScheme() ? "hc-black" : this.storageService.getItem(r.themeStorageKey, "vs-dark").split(" ")[0]
            }, r.prototype.getBackgroundColor = function () {
                if (o.isWindows && l.systemPreferences.isInvertedColorScheme())return "#000000"
                var e = this.storageService.getItem(r.themeBackgroundStorageKey, null)
                if (!e) {
                    var t = this.getBaseTheme()
                    return "hc-black" === t ? "#000000" : "vs" === t ? "#FFFFFF" : o.isMacintosh ? "#171717" : "#1E1E1E"
                }
                return e
            }, r.prototype.serializeWindowState = function () {
                if (this.win.isFullScreen())return {
                    mode: w.Fullscreen,
                    width: this.windowState.width,
                    height: this.windowState.height,
                    x: this.windowState.x,
                    y: this.windowState.y
                }
                var e, t = Object.create(null)
                if (e = !o.isMacintosh && this.win.isMaximized() ? w.Maximized : this.win.isMinimized() ? w.Minimized : w.Normal, e === w.Maximized ? t.mode = w.Maximized : e !== w.Minimized && (t.mode = w.Normal), e === w.Normal || e === w.Maximized) {
                    var n = this.win.getPosition(), r = this.win.getSize()
                    t.x = n[0], t.y = n[1], t.width = r[0], t.height = r[1]
                }
                return t
            }, r.prototype.restoreWindowState = function (e) {
                if (e)try {
                    e = this.validateWindowState(e)
                } catch (e) {
                    this.logService.log("Unexpected error validating window state: " + e + "\n" + e.stack)
                }
                e || (e = t.defaultWindowState()), this.windowState = e, this.currentWindowMode = this.windowState.mode
            }, r.prototype.validateWindowState = function (e) {
                if (!e)return null
                if ([e.x, e.y, e.width, e.height].some(function (e) {
                        return "number" != typeof e
                    }))return null
                if (e.width <= 0 || e.height <= 0)return null
                var n = l.screen.getAllDisplays()
                if (1 === n.length) {
                    var r = n[0].bounds
                    return e.mode !== w.Maximized && r.width > 0 && r.height > 0 && (e.x < r.x && (e.x = r.x), e.y < r.y && (e.y = r.y), e.x > r.x + r.width && (e.x = r.x), e.y > r.y + r.height && (e.y = r.y), e.width > r.width && (e.width = r.width), e.height > r.height && (e.height = r.height)), e.mode === w.Maximized ? t.defaultWindowState(w.Maximized) : e
                }
                var i = {x: e.x, y: e.y, width: e.width, height: e.height}, o = l.screen.getDisplayMatching(i)
                if (o && o.bounds.x + o.bounds.width > i.x && o.bounds.y + o.bounds.height > i.y) {
                    if (e.mode === w.Maximized) {
                        var s = t.defaultWindowState(w.Maximized)
                        return s.x = e.x, s.y = e.y, s
                    }
                    return e
                }
                return null
            }, r.prototype.getBounds = function () {
                var e = this.win.getPosition(), t = this.win.getSize()
                return {x: e[0], y: e[1], width: t[0], height: t[1]}
            }, r.prototype.toggleFullScreen = function () {
                var e = !this.win.isFullScreen()
                this.win.setFullScreen(e), this.setMenuBarVisibility(this.currentMenuBarVisibility, !1)
            }, r.prototype.getMenuBarVisibility = function () {
                var e = this.configurationService.getConfiguration("window")
                if (!e || !e.menuBarVisibility)return "default"
                var t = e.menuBarVisibility
                return ["visible", "toggle", "hidden"].indexOf(t) < 0 && (t = "default"), t
            }, r.prototype.setMenuBarVisibility = function (e, t) {
                var n = this
                if (void 0 === t && (t = !0), !o.isMacintosh) {
                    var r = this.win.isFullScreen()
                    switch (e) {
                        case"default":
                            this.win.setMenuBarVisibility(!r), this.win.setAutoHideMenuBar(r)
                            break
                        case"visible":
                            this.win.setMenuBarVisibility(!0), this.win.setAutoHideMenuBar(!1)
                            break
                        case"toggle":
                            this.win.setMenuBarVisibility(!1), this.win.setAutoHideMenuBar(!0), t && this.send("vscode:showInfoMessage", c.localize(0, null))
                            break
                        case"hidden":
                            setTimeout(function () {
                                n.win.setMenuBarVisibility(!1), n.win.setAutoHideMenuBar(!1)
                            })
                    }
                }
            }, r.prototype.sendWhenReady = function (e) {
                for (var t = this, n = [], r = 1; r < arguments.length; r++)n[r - 1] = arguments[r]
                this.ready().then(function () {
                    t.send.apply(t, [e].concat(n))
                })
            }, r.prototype.send = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n];
                (r = this._win.webContents).send.apply(r, [e].concat(t))
                var r
            }, r.prototype.dispose = function () {
                this.showTimeoutHandle && clearTimeout(this.showTimeoutHandle), this.toDispose = y.dispose(this.toDispose), this._win = null
            }, r
        }()
        S.themeStorageKey = "theme", S.themeBackgroundStorageKey = "themeBackground", S.MIN_WIDTH = 200, S.MIN_HEIGHT = 120, S = r([i(1, d.ILogService), i(2, p.IEnvironmentService), i(3, h.IConfigurationService), i(4, u.IStorageService)], S), t.VSCodeWindow = S
    }), define(e[31], t([1, 0, 10, 2, 56, 13, 25, 27, 4, 3]), function (e, t, n, o, s, a, c, u, l, f) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ILifecycleService = f.createDecorator("lifecycleService")
        var p
        !function (e) {
            e[e.CLOSE = 0] = "CLOSE", e[e.QUIT = 1] = "QUIT", e[e.RELOAD = 2] = "RELOAD", e[e.LOAD = 3] = "LOAD"
        }(p = t.UnloadReason || (t.UnloadReason = {}))
        var d = function () {
            function e(e, t, n) {
                this.environmentService = e, this.logService = t, this.storageService = n, this._onBeforeQuit = new l.Emitter, this.onBeforeQuit = this._onBeforeQuit.event, this._onBeforeWindowClose = new l.Emitter, this.onBeforeWindowClose = this._onBeforeWindowClose.event, this.windowToCloseRequest = Object.create(null), this.quitRequested = !1, this.oneTimeListenerTokenGenerator = 0, this._wasRestarted = !1, this.handleRestarted()
            }

            return e.prototype.handleRestarted = function () {
                this._wasRestarted = !!this.storageService.getItem(e.QUIT_FROM_RESTART_MARKER), this._wasRestarted && this.storageService.removeItem(e.QUIT_FROM_RESTART_MARKER)
            }, Object.defineProperty(e.prototype, "wasRestarted", {
                get: function () {
                    return this._wasRestarted
                }, enumerable: !0, configurable: !0
            }), e.prototype.ready = function () {
                this.registerListeners()
            }, e.prototype.registerListeners = function () {
                var e = this
                n.app.on("before-quit", function (t) {
                    e.logService.log("Lifecycle#before-quit"), e.quitRequested || e._onBeforeQuit.fire(), e.quitRequested = !0
                }), n.app.on("window-all-closed", function () {
                    e.logService.log("Lifecycle#window-all-closed"), (e.quitRequested || "darwin" !== process.platform || e.environmentService.wait) && n.app.quit()
                })
            }, e.prototype.registerWindow = function (e) {
                var t = this
                e.win.on("close", function (n) {
                    var r = e.id
                    if (t.logService.log("Lifecycle#window-before-close", r), t.windowToCloseRequest[r])return t.logService.log("Lifecycle#window-close", r), void delete t.windowToCloseRequest[r]
                    n.preventDefault(), t.unload(e, p.CLOSE).done(function (n) {
                        n ? (t.quitRequested = !1, delete t.windowToCloseRequest[r]) : (t.windowToCloseRequest[r] = !0, t._onBeforeWindowClose.fire(e), e.win.close())
                    })
                })
            }, e.prototype.unload = function (e, t) {
                var r = this
                return e.readyState !== s.ReadyState.READY ? o.TPromise.as(!1) : (this.logService.log("Lifecycle#unload()", e.id), new o.TPromise(function (i) {
                    var o = r.oneTimeListenerTokenGenerator++, s = "vscode:ok" + o, a = "vscode:cancel" + o
                    n.ipcMain.once(s, function () {
                        i(!1)
                    }), n.ipcMain.once(a, function () {
                        r.pendingQuitPromiseComplete && (r.pendingQuitPromiseComplete(!0), r.pendingQuitPromiseComplete = null, r.pendingQuitPromise = null), i(!0)
                    }), e.send("vscode:beforeUnload", {
                        okChannel: s,
                        cancelChannel: a,
                        reason: r.quitRequested ? p.QUIT : t
                    })
                }))
            }, e.prototype.quit = function (t) {
                var r = this
                return this.logService.log("Lifecycle#quit()"), this.pendingQuitPromise || (this.pendingQuitPromise = new o.TPromise(function (i) {
                    r.pendingQuitPromiseComplete = i, n.app.once("will-quit", function () {
                        r.pendingQuitPromiseComplete && (t && r.storageService.setItem(e.QUIT_FROM_RESTART_MARKER, !0), r.pendingQuitPromiseComplete(!1), r.pendingQuitPromiseComplete = null, r.pendingQuitPromise = null)
                    }), n.app.quit()
                })), this.pendingQuitPromise
            }, e.prototype.kill = function (e) {
                n.app.exit(e)
            }, e.prototype.relaunch = function (t) {
                var r = this, i = process.argv.slice(1)
                if (t && t.addArgs && i.push.apply(i, t.addArgs), t && t.removeArgs)for (var o = 0, s = t.removeArgs; o < s.length; o++) {
                    var a = s[o], c = i.indexOf(a)
                    c >= 0 && i.splice(c, 1)
                }
                var u = !1
                n.app.once("quit", function () {
                    u || (r.storageService.setItem(e.QUIT_FROM_RESTART_MARKER, !0), n.app.relaunch({args: i}))
                }), this.quit().then(function (e) {
                    u = e
                })
            }, e.prototype.isQuitRequested = function () {
                return !!this.quitRequested
            }, e
        }()
        d.QUIT_FROM_RESTART_MARKER = "quit.from.restart", d = r([i(0, a.IEnvironmentService), i(1, c.ILogService), i(2, u.IStorageService)], d), t.LifecycleService = d
    }), define(e[95], t([1, 0, 49, 79, 26, 7, 19, 43, 45, 16]), function (e, t, n, i, o, s, a, c, u, l) {
        "use strict"
        function f() {
            var e
            return e = "win32" === process.platform ? process.env.USERNAME : process.env.USER, e ? n.createHash("sha256").update(e).digest("hex").substr(0, 6) : ""
        }

        function p(e, t) {
            return s.join(e, u["default"].version + "-" + t + ".sock")
        }

        function d(e) {
            var t = f()
            return "\\\\.\\pipe\\" + l["default"].applicationName + (t ? "-" + t : "") + "-" + u["default"].version + "-" + e + "-sock"
        }

        function h(e, t) {
            return "win32" === process.platform ? d(t) : p(e, t)
        }

        function v(e, t) {
            var n = e.debugBrkPluginHost || e.debugPluginHost, r = Number(n) || (t ? null : 5870)
            return {port: r, "break": !!r && Boolean(!!e.debugBrkPluginHost)}
        }

        function m(e, t) {
            if (e) {
                var n = s.resolve(e)
                return s.normalize(e) === n ? n : s.resolve(t.env.VSCODE_CWD || t.cwd(), e)
            }
        }

        function g(e, t) {
            return m(e["user-data-dir"], t) || s.resolve(i.getDefaultUserDataPath(t.platform))
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var y = function () {
            function t(e, t) {
                this._args = e, this._execPath = t
            }

            return Object.defineProperty(t.prototype, "args", {
                get: function () {
                    return this._args
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appRoot", {
                get: function () {
                    return s.dirname(a["default"].parse(e.toUrl("")).fsPath)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "execPath", {
                get: function () {
                    return this._execPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "userHome", {
                get: function () {
                    return o.homedir()
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "userDataPath", {
                get: function () {
                    return g(this._args, process)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appNameLong", {
                get: function () {
                    return l["default"].nameLong
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appQuality", {
                get: function () {
                    return l["default"].quality
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appSettingsHome", {
                get: function () {
                    return s.join(this.userDataPath, "User")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appSettingsPath", {
                get: function () {
                    return s.join(this.appSettingsHome, "settings.json")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "appKeybindingsPath", {
                get: function () {
                    return s.join(this.appSettingsHome, "keybindings.json")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "isExtensionDevelopment", {
                get: function () {
                    return !!this._args.extensionDevelopmentPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "backupHome", {
                get: function () {
                    return s.join(this.userDataPath, "Backups")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "backupWorkspacesPath", {
                get: function () {
                    return s.join(this.backupHome, "workspaces.json")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "extensionsPath", {
                get: function () {
                    return m(this._args["extensions-dir"], process) || s.join(this.userHome, l["default"].dataFolderName, "extensions")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "extensionDevelopmentPath", {
                get: function () {
                    return this._args.extensionDevelopmentPath ? s.normalize(this._args.extensionDevelopmentPath) : this._args.extensionDevelopmentPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "extensionTestsPath", {
                get: function () {
                    return this._args.extensionTestsPath ? s.normalize(this._args.extensionTestsPath) : this._args.extensionTestsPath
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "disableExtensions", {
                get: function () {
                    return this._args["disable-extensions"]
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "debugExtensionHost", {
                get: function () {
                    return v(this._args, this.isBuilt)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "isBuilt", {
                get: function () {
                    return !process.env.VSCODE_DEV
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "verbose", {
                get: function () {
                    return this._args.verbose
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "wait", {
                get: function () {
                    return this._args.wait
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "logExtensionHostCommunication", {
                get: function () {
                    return this._args.logExtensionHostCommunication
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "performance", {
                get: function () {
                    return this._args.performance
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "profileStartup", {
                get: function () {
                    return this._args["prof-startup"] ? {
                        prefix: process.env.VSCODE_PROFILES_PREFIX,
                        dir: o.homedir()
                    } : void 0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "mainIPCHandle", {
                get: function () {
                    return h(this.userDataPath, "main")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "sharedIPCHandle", {
                get: function () {
                    return h(this.userDataPath, "shared")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "nodeCachedDataDir", {
                get: function () {
                    return this.isBuilt ? s.join(this.userDataPath, "CachedData", l["default"].commit) : void 0
                }, enumerable: !0, configurable: !0
            }), t
        }()
        r([c.memoize], y.prototype, "appRoot", null), r([c.memoize], y.prototype, "userHome", null), r([c.memoize], y.prototype, "userDataPath", null), r([c.memoize], y.prototype, "appSettingsHome", null), r([c.memoize], y.prototype, "appSettingsPath", null), r([c.memoize], y.prototype, "appKeybindingsPath", null), r([c.memoize], y.prototype, "isExtensionDevelopment", null), r([c.memoize], y.prototype, "backupHome", null), r([c.memoize], y.prototype, "backupWorkspacesPath", null), r([c.memoize], y.prototype, "extensionsPath", null), r([c.memoize], y.prototype, "extensionDevelopmentPath", null), r([c.memoize], y.prototype, "extensionTestsPath", null), r([c.memoize], y.prototype, "debugExtensionHost", null), r([c.memoize], y.prototype, "profileStartup", null), r([c.memoize], y.prototype, "mainIPCHandle", null), r([c.memoize], y.prototype, "sharedIPCHandle", null), r([c.memoize], y.prototype, "nodeCachedDataDir", null), t.EnvironmentService = y, t.parseExtensionHostPort = v, t.parseUserDataDir = g
    }), define(e[22], t([1, 0, 6, 59]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = function () {
            function e() {
                this.data = {}
            }

            return e.prototype.add = function (e, t) {
                r.ok(n.isString(e)), r.ok(n.isObject(t)), r.ok(!this.data.hasOwnProperty(e), "There is already an extension with this id"), this.data[e] = t
            }, e.prototype.knows = function (e) {
                return this.data.hasOwnProperty(e)
            }, e.prototype.as = function (e) {
                return this.data[e] || null
            }, e
        }()
        t.Registry = new i
        var o = function () {
            function e() {
                this.toBeInstantiated = [], this.instances = []
            }

            return e.prototype.setInstantiationService = function (e) {
                for (this.instantiationService = e; this.toBeInstantiated.length > 0;) {
                    var t = this.toBeInstantiated.shift()
                    this.instantiate(t)
                }
            }, e.prototype.instantiate = function (e) {
                var t = this.instantiationService.createInstance(e)
                this.instances.push(t)
            }, e.prototype._register = function (e) {
                this.instantiationService ? this.instantiate(e) : this.toBeInstantiated.push(e)
            }, e.prototype._getInstances = function () {
                return this.instances.slice(0)
            }, e.prototype._setInstances = function (e) {
                this.instances = e
            }, e
        }()
        t.BaseRegistry = o
    }), define(e[53], t([1, 0, 22, 103]), function (e, t, n, r) {
        "use strict"
        function i(e) {
            return e.length > 0 && "#" === e.charAt(e.length - 1) ? e.substring(0, e.length - 1) : e
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.Extensions = {JSONContribution: "base.contributions.json"}
        var o = function () {
            function e() {
                this.schemasById = {}, this.eventEmitter = new r.EventEmitter
            }

            return e.prototype.addRegistryChangedListener = function (e) {
                return this.eventEmitter.addListener("registryChanged", e)
            }, e.prototype.registerSchema = function (e, t) {
                this.schemasById[i(e)] = t, this.eventEmitter.emit("registryChanged", {})
            }, e.prototype.getSchemaContributions = function () {
                return {schemas: this.schemasById}
            }, e
        }(), s = new o
        n.Registry.add(t.Extensions.JSONContribution, s)
    }), define(e[98], t([1, 0, 69, 17, 128, 53, 22]), function (e, t, n, r, i, o, s) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var a = Object.hasOwnProperty, c = s.Registry.as(o.Extensions.JSONContribution), u = function () {
            function e(e, t) {
                this._messageHandler = e, this._source = t
            }

            return e.prototype._msg = function (e, t) {
                this._messageHandler({type: e, message: t, source: this._source})
            }, e.prototype.error = function (e) {
                this._msg(i["default"].Error, e)
            }, e.prototype.warn = function (e) {
                this._msg(i["default"].Warning, e)
            }, e.prototype.info = function (e) {
                this._msg(i["default"].Info, e)
            }, e
        }()
        t.ExtensionMessageCollector = u
        var l = function () {
            function e(e) {
                this.name = e, this._handler = null, this._users = null, this._done = !1
            }

            return e.prototype.setHandler = function (e) {
                if (null !== this._handler || this._done)throw new Error("Handler already set!")
                this._handler = e, this._handle()
            }, e.prototype.acceptUsers = function (e) {
                if (null !== this._users || this._done)throw new Error("Users already set!")
                this._users = e, this._handle()
            }, e.prototype._handle = function () {
                if (null !== this._handler && null !== this._users) {
                    this._done = !0
                    var e = this._handler
                    this._handler = null
                    var t = this._users
                    this._users = null
                    try {
                        e(t)
                    } catch (e) {
                        r.onUnexpectedError(e)
                    }
                }
            }, e
        }()
        t.ExtensionPoint = l
        var f = "vscode://schemas/vscode-extensions", p = {
            properties: {
                engines: {
                    type: "object",
                    properties: {vscode: {type: "string", description: n.localize(0, null), "default": "^0.10.0"}}
                },
                publisher: {description: n.localize(1, null), type: "string"},
                displayName: {description: n.localize(2, null), type: "string"},
                categories: {
                    description: n.localize(3, null),
                    type: "array",
                    uniqueItems: !0,
                    items: {
                        type: "string",
                        "enum": ["Languages", "Snippets", "Linters", "Themes", "Debuggers", "Other", "Keymaps", "Formatters", "Extension Packs"]
                    }
                },
                galleryBanner: {
                    type: "object",
                    description: n.localize(4, null),
                    properties: {
                        color: {description: n.localize(5, null), type: "string"},
                        theme: {description: n.localize(6, null), type: "string", "enum": ["dark", "light"]}
                    }
                },
                contributes: {description: n.localize(7, null), type: "object", properties: {}, "default": {}},
                preview: {type: "boolean", description: n.localize(8, null)},
                activationEvents: {
                    description: n.localize(9, null),
                    type: "array",
                    items: {
                        type: "string",
                        defaultSnippets: [{
                            label: "onLanguage",
                            body: "onLanguage:${1:languageId}"
                        }, {label: "onCommand", body: "onCommand:${2:commandId}"}, {
                            label: "onDebug",
                            body: "onDebug:${3:type}"
                        }, {label: "workspaceContains", body: "workspaceContains:${4:fileName}"}]
                    }
                },
                badges: {
                    type: "array",
                    description: n.localize(10, null),
                    items: {
                        type: "object",
                        required: ["url", "href", "description"],
                        properties: {
                            url: {type: "string", description: n.localize(11, null)},
                            href: {type: "string", description: n.localize(12, null)},
                            description: {type: "string", description: n.localize(13, null)}
                        }
                    }
                },
                extensionDependencies: {
                    description: n.localize(14, null),
                    type: "array",
                    uniqueItems: !0,
                    items: {type: "string"}
                },
                scripts: {
                    type: "object",
                    properties: {"vscode:prepublish": {description: n.localize(15, null), type: "string"}}
                },
                icon: {type: "string", description: n.localize(16, null)}
            }
        }, d = function () {
            function e() {
                this._extensionPoints = {}
            }

            return e.prototype.registerExtensionPoint = function (e, t, n) {
                if (a.call(this._extensionPoints, e))throw new Error("Duplicate extension point: " + e)
                var r = new l(e)
                return this._extensionPoints[e] = r, p.properties.contributes.properties[e] = n, c.registerSchema(f, p), r
            }, e.prototype.getExtensionPoints = function () {
                var e = this
                return Object.keys(this._extensionPoints).map(function (t) {
                    return e._extensionPoints[t]
                })
            }, e
        }()
        t.ExtensionsRegistryImpl = d
        var h = {ExtensionsRegistry: "ExtensionsRegistry"}
        s.Registry.add(h.ExtensionsRegistry, new d), t.ExtensionsRegistry = s.Registry.as(h.ExtensionsRegistry), c.registerSchema(f, p)
    }), define(e[33], t([1, 0, 67, 4, 22, 8, 6, 11, 98, 53]), function (e, t, n, r, i, o, s, a, c, u) {
        "use strict"
        function l(e) {
            switch (Array.isArray(e) ? e[0] : e) {
                case"boolean":
                    return !1
                case"integer":
                case"number":
                    return 0
                case"string":
                    return ""
                case"array":
                    return []
                case"object":
                    return {}
                default:
                    return null
            }
        }

        function f(e) {
            return t.OVERRIDE_PROPERTY_PATTERN.test(e) ? n.localize(6, null, e) : void 0 !== b.getConfigurationProperties()[e] ? n.localize(7, null, e) : null
        }

        function p(e, t) {
            var r = e.properties
            if (r) {
                "object" != typeof r && (t.error(n.localize(8, null)), e.properties = {})
                for (var i in r) {
                    var o = f(i)
                    o && (t.warn(o), delete r[i])
                }
            }
            var s = e.allOf
            if (s)for (var a = 0, c = s; a < c.length; a++) {
                var u = c[a]
                p(u, t)
            }
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.Extensions = {Configuration: "base.contributions.configuration"}
        var d = "vscode://schemas/settings", h = "vscode://schemas/settings/editor",
            v = i.Registry.as(u.Extensions.JSONContribution), m = function () {
                function e() {
                    this.overrideIdentifiers = [], this.configurationContributors = [], this.configurationSchema = {
                        properties: {},
                        patternProperties: {},
                        additionalProperties: !1,
                        errorMessage: "Unknown configuration setting"
                    }, this.editorConfigurationSchema = {
                        properties: {},
                        patternProperties: {},
                        additionalProperties: !1,
                        errorMessage: "Unknown editor configuration setting"
                    }, this._onDidRegisterConfiguration = new r.Emitter, this.configurationProperties = {}, this.computeOverridePropertyPattern(), v.registerSchema(d, this.configurationSchema), v.registerSchema(h, this.editorConfigurationSchema)
                }

                return Object.defineProperty(e.prototype, "onDidRegisterConfiguration", {
                    get: function () {
                        return this._onDidRegisterConfiguration.event
                    }, enumerable: !0, configurable: !0
                }), e.prototype.registerConfiguration = function (e, t) {
                    void 0 === t && (t = !0), this.registerConfigurations([e], t)
                }, e.prototype.registerConfigurations = function (e, t) {
                    var n = this
                    void 0 === t && (t = !0), e.forEach(function (e) {
                        n.validateAndRegisterProperties(e, t), n.configurationContributors.push(e), n.registerJSONConfiguration(e), n.updateSchemaForOverrideSettingsConfiguration(e)
                    }), this._onDidRegisterConfiguration.fire(this)
                }, e.prototype.registerOverrideIdentifiers = function (e) {
                    (t = this.overrideIdentifiers).push.apply(t, e), this.updateOverridePropertyPatternKey()
                    var t
                }, e.prototype.registerDefaultConfigurations = function (e) {
                    for (var r = {
                        id: "defaultOverrides",
                        title: n.localize(0, null),
                        properties: {}
                    }, i = 0, o = e; i < o.length; i++) {
                        var s = o[i]
                        for (var a in s.defaults) {
                            var c = s.defaults[a]
                            t.OVERRIDE_PROPERTY_PATTERN.test(a) && "object" == typeof c && (r.properties[a] = {
                                type: "object",
                                "default": c,
                                description: n.localize(1, null, a),
                                $ref: h
                            })
                        }
                    }
                    Object.keys(r.properties).length && this.registerConfiguration(r, !1)
                }, e.prototype.validateAndRegisterProperties = function (e, t, n) {
                    void 0 === t && (t = !0), void 0 === n && (n = !1), n = e.overridable || n
                    var r = e.properties
                    if (r)for (var i in r) {
                        var o = void 0
                        if (t && (o = f(i))) console.warn(o), delete r[i]
                        else {
                            var a = r[i], c = a["default"]
                            s.isUndefined(c) && (a["default"] = l(a.type)), n && (a.overridable = !0), this.configurationProperties[i] = r[i]
                        }
                    }
                    var u = e.allOf
                    if (u)for (var p = 0, d = u; p < d.length; p++) {
                        var h = d[p]
                        this.validateAndRegisterProperties(h, t, n)
                    }
                }, e.prototype.validateProperty = function (e) {
                    return !t.OVERRIDE_PROPERTY_PATTERN.test(e) && void 0 !== this.getConfigurationProperties()[e]
                }, e.prototype.getConfigurations = function () {
                    return this.configurationContributors
                }, e.prototype.getConfigurationProperties = function () {
                    return this.configurationProperties
                }, e.prototype.registerJSONConfiguration = function (e) {
                    function t(e) {
                        var r = e.properties
                        if (r)for (var i in r)n.properties[i] = r[i]
                        var o = e.allOf
                        o && o.forEach(t)
                    }

                    var n = this.configurationSchema
                    t(e), v.registerSchema(d, n)
                }, e.prototype.updateSchemaForOverrideSettingsConfiguration = function (e) {
                    e.id !== g && (this.update(e, this.editorConfigurationSchema), v.registerSchema(h, this.editorConfigurationSchema))
                }, e.prototype.updateOverridePropertyPatternKey = function () {
                    var e = this.configurationSchema.patternProperties[this.overridePropertyPattern]
                    e || (e = {
                        type: "object",
                        description: n.localize(2, null),
                        errorMessage: "Unknown Identifier. Use language identifiers",
                        $ref: h
                    }), delete this.configurationSchema.patternProperties[this.overridePropertyPattern], this.computeOverridePropertyPattern(), this.configurationSchema.patternProperties[this.overridePropertyPattern] = e, v.registerSchema(d, this.configurationSchema)
                }, e.prototype.update = function (e, t) {
                    var n = this, r = e.properties
                    if (r)for (var i in r)r[i].overridable && (t.properties[i] = this.getConfigurationProperties()[i])
                    var o = e.allOf
                    o && o.forEach(function (e) {
                        return n.update(e, t)
                    })
                }, e.prototype.computeOverridePropertyPattern = function () {
                    this.overridePropertyPattern = this.overrideIdentifiers.length ? w.replace("${0}", this.overrideIdentifiers.map(function (e) {
                        return a.createRegExp(e, !1).source
                    }).join("|")) : y
                }, e
            }(), g = "override", y = "\\[.*\\]$", w = "\\[(${0})\\]$"
        t.OVERRIDE_PROPERTY_PATTERN = new RegExp(y)
        var b = new m
        i.Registry.add(t.Extensions.Configuration, b), c.ExtensionsRegistry.registerExtensionPoint("configuration", [], {
            description: n.localize(3, null),
            type: "object",
            defaultSnippets: [{body: {title: "", properties: {}}}],
            properties: {
                title: {description: n.localize(4, null), type: "string"},
                properties: {
                    description: n.localize(5, null),
                    type: "object",
                    additionalProperties: {
                        anyOf: [{$ref: "http://json-schema.org/draft-04/schema#"}, {
                            type: "object",
                            properties: {isExecutable: {type: "boolean"}}
                        }]
                    }
                }
            }
        }).setHandler(function (e) {
            for (var t = [], r = 0; r < e.length; r++) {
                var i = o.clone(e[r].value), s = e[r].collector
                i.type && "object" !== i.type ? s.warn(n.localize(9, null)) : i.type = "object", i.title && "string" != typeof i.title && s.error(n.localize(10, null)), p(i, s), i.id = e[r].description.id, t.push(i)
            }
            b.registerConfigurations(t, !1)
        }), c.ExtensionsRegistry.registerExtensionPoint("configurationDefaults", [], {
            description: n.localize(11, null),
            type: "object",
            defaultSnippets: [{body: {}}],
            patternProperties: {"\\[.*\\]$": {type: "object", "default": {}, $ref: h}}
        }).setHandler(function (e) {
            var t = e.map(function (e) {
                return {id: e.description.id, name: e.description.name, defaults: o.clone(e.value)}
            })
            b.registerDefaultConfigurations(t)
        })
    }), define(e[100], t([1, 0, 22, 6, 63, 8, 20, 33]), function (e, t, r, i, o, s, a, c) {
        "use strict"
        function u() {
            var e = Object.create(null), t = r.Registry.as(c.Extensions.Configuration).getConfigurationProperties()
            for (var n in t)f(e, n, t[n]["default"], function (e) {
                return console.error("Conflict in default settings: " + e)
            })
            return e
        }

        function l(e, t) {
            var n = Object.create(null)
            for (var r in e)f(n, r, e[r], t)
            return n
        }

        function f(e, t, n, r) {
            for (var i = t.split("."), o = i.pop(), s = e, a = 0; a < i.length; a++) {
                var c = i[a], u = s[c]
                switch (typeof u) {
                    case"undefined":
                        u = s[c] = Object.create(null)
                        break
                    case"object":
                        break
                    default:
                        return void r("Ignoring " + t + " as " + i.slice(0, a + 1).join(".") + " is " + JSON.stringify(u))
                }
                s = u
            }
            "object" == typeof s ? s[o] = n : r("Ignoring " + t + " as " + i.join(".") + " is " + JSON.stringify(s))
        }

        function p() {
            var e = r.Registry.as(c.Extensions.Configuration).getConfigurationProperties()
            return Object.keys(e)
        }

        function d(e, t, n) {
            Object.keys(t).forEach(function (r) {
                r in e ? i.isObject(e[r]) && i.isObject(t[r]) ? d(e[r], t[r], n) : n && (e[r] = t[r]) : e[r] = t[r]
            })
        }

        function h(e) {
            return e.substring(1, e.length - 1)
        }

        function v(e) {
            return "[" + e + "]"
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.getDefaultValues = u, t.toValuesTree = l, t.getConfigurationKeys = p, t.merge = d
        var m = function () {
            function e(e, t) {
                void 0 === e && (e = ""), void 0 === t && (t = ""), this.name = t, this._contents = {}, this._overrides = [], this._keys = [], this._parseErrors = [], e && this.update(e)
            }

            return Object.defineProperty(e.prototype, "contents", {
                get: function () {
                    return this._contents
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "overrides", {
                get: function () {
                    return this._overrides
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "keys", {
                get: function () {
                    return this._keys
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "errors", {
                get: function () {
                    return this._parseErrors
                }, enumerable: !0, configurable: !0
            }), e.prototype.merge = function (t, n) {
                void 0 === n && (n = !0)
                var r = new e(null)
                return this.doMerge(r, this, n), this.doMerge(r, t, n), r
            }, e.prototype.doMerge = function (e, t, n) {
                void 0 === n && (n = !0), d(e.contents, s.clone(t.contents), n)
                for (var r = s.clone(e.overrides), i = 0, o = t.overrides; i < o.length; i++) {
                    var c = o[i]
                    !function (e) {
                        var t = r.filter(function (t) {
                            return a.equals(t.identifiers, e.identifiers)
                        })[0]
                        t ? d(t.contents, e.contents, n) : r.push(e)
                    }(c)
                }
                e._overrides = r
            }, e.prototype.getContentsFor = function (e) {
                return s.clone(this.contents[e])
            }, e.prototype.configWithOverrides = function (t) {
                var n = new e(null), r = s.clone(this.contents)
                if (this.overrides)for (var i = 0, o = this.overrides; i < o.length; i++) {
                    var a = o[i];
                    -1 !== a.identifiers.indexOf(t) && d(r, a.contents, !0)
                }
                return n._contents = r, n
            }, e.prototype.update = function (e) {
                function t(e) {
                    Array.isArray(f) ? f.push(e) : u && (f[u] = e), c.OVERRIDE_PROPERTY_PATTERN.test(u) && n(u, e)
                }

                function n(e, t) {
                    a.push({identifiers: [h(e).trim()], raw: t, contents: null})
                }

                var i = this, s = {}, a = [], u = null, f = [], p = [], d = [], v = {
                    onObjectBegin: function () {
                        var e = {}
                        t(e), p.push(f), f = e, u = null
                    }, onObjectProperty: function (e) {
                        u = e
                    }, onObjectEnd: function () {
                        f = p.pop()
                    }, onArrayBegin: function () {
                        var e = []
                        t(e), p.push(f), f = e, u = null
                    }, onArrayEnd: function () {
                        f = p.pop()
                    }, onLiteralValue: t, onError: function (e) {
                        d.push({error: e})
                    }
                }
                if (e)try {
                    o.visit(e, v), s = f[0] || {}
                } catch (e) {
                    console.error("Error while parsing settings file " + this.name + ": " + e), this._parseErrors = [e]
                }
                this.processRaw(s)
                var m = r.Registry.as(c.Extensions.Configuration).getConfigurationProperties()
                this._overrides = a.map(function (e) {
                    var t = {}
                    for (var n in e.raw)m[n] && m[n].overridable && (t[n] = e.raw[n])
                    return {
                        identifiers: e.identifiers, contents: l(t, function (e) {
                            return console.error("Conflict in settings file " + i.name + ": " + e)
                        })
                    }
                })
            }, e.prototype.processRaw = function (e) {
                var t = this
                this._contents = l(e, function (e) {
                    return console.error("Conflict in settings file " + t.name + ": " + e)
                }), this._keys = Object.keys(e)
            }, e
        }()
        t.ConfigModel = m
        var g = function (e) {
            function t() {
                var t = e.call(this, null) || this
                return t.update(), t
            }

            return n(t, e), Object.defineProperty(t.prototype, "keys", {
                get: function () {
                    return this._keys
                }, enumerable: !0, configurable: !0
            }), t.prototype.update = function () {
                var e = this
                this._contents = u(), this._keys = p(), this._overrides = Object.keys(this._contents).filter(function (e) {
                    return c.OVERRIDE_PROPERTY_PATTERN.test(e)
                }).map(function (t) {
                    return {
                        identifiers: [h(t).trim()], contents: l(e._contents[t], function (e) {
                            return console.error("Conflict in default settings file: " + e)
                        })
                    }
                })
            }, t
        }(m)
        t.DefaultConfigModel = g, t.overrideIdentifierFromKey = h, t.keyFromOverrideIdentifier = v
    }), define(e[101], t([1, 0, 2, 8, 57, 22, 33, 9, 12, 100, 4, 13]), function (e, t, o, s, a, c, u, l, f, p, d, h) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var v = function (e) {
            function t(t) {
                var n = e.call(this) || this
                return n._onDidUpdateConfiguration = n._register(new d.Emitter), n.onDidUpdateConfiguration = n._onDidUpdateConfiguration.event, n.userConfigModelWatcher = new a.ConfigWatcher(t.appSettingsPath, {
                    changeBufferDelay: 300,
                    defaultConfig: new p.ConfigModel(null, t.appSettingsPath),
                    parse: function (e, n) {
                        var r = new p.ConfigModel(e, t.appSettingsPath)
                        return r.errors.slice(), r
                    }
                }), n._register(l.toDisposable(function () {
                    return n.userConfigModelWatcher.dispose()
                })), n._register(n.userConfigModelWatcher.onDidUpdateConfiguration(function () {
                    return n.onConfigurationChange(f.ConfigurationSource.User)
                })), n._register(c.Registry.as(u.Extensions.Configuration).onDidRegisterConfiguration(function () {
                    return n.onConfigurationChange(f.ConfigurationSource.Default)
                })), n
            }

            return n(t, e), t.prototype.onConfigurationChange = function (e) {
                this.cache = void 0
                var t = this.getCache()
                this._onDidUpdateConfiguration.fire({
                    config: this.getConfiguration(),
                    source: e,
                    sourceConfig: e === f.ConfigurationSource.Default ? t.defaults.contents : t.user.contents
                })
            }, t.prototype.reloadConfiguration = function (e) {
                var t = this
                return new o.TPromise(function (n) {
                    t.userConfigModelWatcher.reload(function () {
                        t.cache = void 0, n(t.getConfiguration(e))
                    })
                })
            }, t.prototype.getConfiguration = function (e) {
                var t = this.toOptions(e), n = this.getCache(),
                    r = t.overrideIdentifier ? n.consolidated.configWithOverrides(t.overrideIdentifier) : n.consolidated
                return t.section ? r.getContentsFor(t.section) : r.contents
            }, t.prototype.lookup = function (e, t) {
                var n = this.getCache()
                return {
                    "default": s.clone(f.getConfigurationValue(t ? n.defaults.configWithOverrides(t).contents : n.defaults.contents, e)),
                    user: s.clone(f.getConfigurationValue(t ? n.user.configWithOverrides(t).contents : n.user.contents, e)),
                    value: s.clone(f.getConfigurationValue(t ? n.consolidated.configWithOverrides(t).contents : n.consolidated.contents, e))
                }
            }, t.prototype.keys = function () {
                var e = this.getCache()
                return {"default": e.defaults.keys, user: e.user.keys}
            }, t.prototype.getCache = function () {
                return this.cache || (this.cache = this.consolidateConfigurations())
            }, t.prototype.toOptions = function (e) {
                return "string" == typeof e ? {section: e} : "object" == typeof e ? e : {}
            }, t.prototype.consolidateConfigurations = function () {
                var e = new p.DefaultConfigModel, t = this.userConfigModelWatcher.getConfig()
                return {defaults: e, user: t, consolidated: e.merge(t)}
            }, t
        }(l.Disposable)
        v = r([i(0, h.IEnvironmentService)], v), t.ConfigurationService = v
    }), define(e[39], t([1, 0, 70, 3, 33, 22]), function (e, t, n, r, i, o) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IRequestService = r.createDecorator("requestService2"), o.Registry.as(i.Extensions.Configuration).registerConfiguration({
            id: "http",
            order: 15,
            title: n.localize(0, null),
            type: "object",
            properties: {
                "http.proxy": {
                    type: "string",
                    pattern: "^https?://([^:]*(:[^@]*)?@)?([^:]+)(:\\d+)?/?$|^$",
                    description: n.localize(1, null)
                },
                "http.proxyStrictSSL": {type: "boolean", "default": !0, description: n.localize(2, null)},
                "http.proxyAuthorization": {type: ["null", "string"], "default": null, description: n.localize(3, null)}
            }
        })
    }), define(e[58], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ID = "storageService", t.IStorageService = n.createDecorator(t.ID)
        !function (e) {
            e[e.GLOBAL = 0] = "GLOBAL", e[e.WORKSPACE = 1] = "WORKSPACE"
        }(t.StorageScope || (t.StorageScope = {})), t.NullStorageService = {
            _serviceBrand: void 0, store: function () {
            }, swap: function () {
            }, remove: function () {
            }, get: function (e, t, n) {
                return n
            }, getInteger: function (e, t, n) {
                return n
            }, getBoolean: function (e, t, n) {
                return n
            }
        }
    }), define(e[36], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ITelemetryService = n.createDecorator("telemetryService")
    }), define(e[105], t([1, 0, 2]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var r = function () {
            function e(e) {
                this.appender = e
            }

            return e.prototype.call = function (e, t) {
                var r = t.eventName, i = t.data
                return this.appender.log(r, i), n.TPromise.as(null)
            }, e
        }()
        t.TelemetryAppenderChannel = r
        var i = function () {
            function e(e) {
                this.channel = e
            }

            return e.prototype.log = function (e, t) {
                return this.channel.call("log", {eventName: e, data: t})
            }, e.prototype.dispose = function () {
            }, e
        }()
        t.TelemetryAppenderClient = i
    }), define(e[106], t([1, 0, 5, 26, 2, 30]), function (e, t, n, r, i, o) {
        "use strict"
        function s(e, t) {
            var s = Object.create(null)
            s.sessionID = o.generateUuid() + Date.now(), s.commitHash = e, s.version = t, s["common.osVersion"] = r.release(), s["common.platform"] = n.Platform[n.platform]
            var a = 0, c = Date.now()
            return Object.defineProperties(s, {
                timestamp: {
                    get: function () {
                        return new Date
                    }, enumerable: !0
                }, "common.timesincesessionstart": {
                    get: function () {
                        return Date.now() - c
                    }, enumerable: !0
                }, "common.sequence": {
                    get: function () {
                        return a++
                    }, enumerable: !0
                }
            }), i.TPromise.as(s)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.machineIdStorageKey = "telemetry.machineId", t.machineIdIpcChannel = "vscode:machineId", t.resolveCommonProperties = s
    }), define(e[37], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        !function (e) {
            e[e.Uninitialized = 0] = "Uninitialized", e[e.Idle = 1] = "Idle", e[e.CheckingForUpdate = 2] = "CheckingForUpdate", e[e.UpdateAvailable = 3] = "UpdateAvailable", e[e.UpdateDownloaded = 4] = "UpdateDownloaded"
        }(t.State || (t.State = {}))
        !function (e) {
            e[e.Implicit = 0] = "Implicit", e[e.Explicit = 1] = "Explicit"
        }(t.ExplicitState || (t.ExplicitState = {})), t.IUpdateService = n.createDecorator("updateService")
    }), define(e[108], t([1, 0, 21, 37]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = function () {
            function e(e) {
                this.service = e
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"event:onError":
                        return n.eventToCall(this.service.onError)
                    case"event:onUpdateAvailable":
                        return n.eventToCall(this.service.onUpdateAvailable)
                    case"event:onUpdateNotAvailable":
                        return n.eventToCall(this.service.onUpdateNotAvailable)
                    case"event:onUpdateReady":
                        return n.eventToCall(this.service.onUpdateReady)
                    case"event:onStateChange":
                        return n.eventToCall(this.service.onStateChange)
                    case"checkForUpdates":
                        return this.service.checkForUpdates(t)
                    case"quitAndInstall":
                        return this.service.quitAndInstall()
                }
            }, e
        }()
        t.UpdateChannel = i
        var o = function () {
            function e(e) {
                var t = this
                this.channel = e, this._onError = n.eventFromCall(this.channel, "event:onError"), this._onUpdateAvailable = n.eventFromCall(this.channel, "event:onUpdateAvailable"), this._onUpdateNotAvailable = n.eventFromCall(this.channel, "event:onUpdateNotAvailable"), this._onUpdateReady = n.eventFromCall(this.channel, "event:onUpdateReady"), this._onStateChange = n.eventFromCall(this.channel, "event:onStateChange"), this._state = r.State.Uninitialized, this.onStateChange(function (e) {
                    return t._state = e
                })
            }

            return Object.defineProperty(e.prototype, "onError", {
                get: function () {
                    return this._onError
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateAvailable", {
                get: function () {
                    return this._onUpdateAvailable
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateNotAvailable", {
                get: function () {
                    return this._onUpdateNotAvailable
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateReady", {
                get: function () {
                    return this._onUpdateReady
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onStateChange", {
                get: function () {
                    return this._onStateChange
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "state", {
                get: function () {
                    return this._state
                }, enumerable: !0, configurable: !0
            }), e.prototype.checkForUpdates = function (e) {
                return this.channel.call("checkForUpdates", e)
            }, e.prototype.quitAndInstall = function () {
                return this.channel.call("quitAndInstall")
            }, e
        }()
        t.UpdateChannelClient = o
    }), define(e[32], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ID = "urlService", t.IURLService = n.createDecorator(t.ID)
    }), define(e[110], t([1, 0, 4, 29, 16, 10, 19]), function (e, t, n, r, i, o, s) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var a = function () {
            function e(e) {
                void 0 === e && (e = []), this.openUrlEmitter = new n.Emitter
                var t = global.getOpenUrls() || [], a = ("string" == typeof e ? [e] : e).concat(t)
                o.app.setAsDefaultProtocolClient(i["default"].urlProtocol, process.execPath, ["--open-url"])
                var c = r.fromEventEmitter(o.app, "open-url", function (e, t) {
                    return {event: e, url: t}
                }), u = n.mapEvent(c, function (e) {
                    var t = e.event, n = e.url
                    return t.preventDefault(), n
                }), l = n.echo(u, !0, a)
                this.onOpenURL = n.chain(n.any(l, this.openUrlEmitter.event)).map(function (e) {
                    try {
                        return s["default"].parse(e)
                    } catch (e) {
                        return null
                    }
                }).filter(function (e) {
                    return !!e
                }).event
            }

            return e.prototype.open = function (e) {
                this.openUrlEmitter.fire(e)
            }, e
        }()
        t.URLService = a
    }), define(e[46], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IWindowsService = n.createDecorator("windowsService"), t.IWindowService = n.createDecorator("windowService")
    }), define(e[24], t([1, 0, 9, 46]), function (e, t, n, o) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        !function (e) {
            e[e.CLI = 0] = "CLI", e[e.DOCK = 1] = "DOCK", e[e.MENU = 2] = "MENU", e[e.DIALOG = 3] = "DIALOG", e[e.DESKTOP = 4] = "DESKTOP", e[e.API = 5] = "API"
        }(t.OpenContext || (t.OpenContext = {}))
        var s = function () {
            function e(e) {
                this.disposables = [], e.onWindowOpen(this.setActiveWindow, this, this.disposables), e.onWindowFocus(this.setActiveWindow, this, this.disposables)
            }

            return e.prototype.setActiveWindow = function (e) {
                this._activeWindowId = e
            }, Object.defineProperty(e.prototype, "activeClientId", {
                get: function () {
                    return "window:" + this._activeWindowId
                }, enumerable: !0, configurable: !0
            }), e.prototype.dispose = function () {
                this.disposables = n.dispose(this.disposables)
            }, e
        }()
        s = r([i(0, o.IWindowsService)], s), t.ActiveWindowManager = s
    }), define(e[113], t([1, 0, 7, 28, 5, 18, 24, 23]), function (e, t, n, r, i, o, s, a) {
        "use strict"
        function c(e) {
            var t = e.windows, n = e.newWindow, r = e.reuseWindow, i = e.context, o = e.filePath, a = e.userHome,
                c = e.vscodeFolder,
                f = o && (i === s.OpenContext.DESKTOP || i === s.OpenContext.CLI || i === s.OpenContext.DOCK),
                d = !n && f && u(t, o), h = !n && !r && f && l(o, a, c)
            return !d || h && h.length > d.openedWorkspacePath.length ? h || (n ? null : p(t)) : d
        }

        function u(e, t) {
            var n = e.filter(function (e) {
                return "string" == typeof e.openedWorkspacePath && a.isEqualOrParent(t, e.openedWorkspacePath, !i.isLinux)
            })
            return n.length ? n.sort(function (e, t) {
                return -(e.openedWorkspacePath.length - t.openedWorkspacePath.length)
            })[0] : null
        }

        function l(e, t, r) {
            var s = n.dirname(o.normalize(e, !0)), a = t && o.normalize(t, !0)
            i.isLinux || (a = a && a.toLowerCase())
            var c = null
            try {
                for (; s !== c;) {
                    if (f(s, a, r))return s
                    c = s, s = n.dirname(s)
                }
            } catch (e) {
            }
            return null
        }

        function f(e, t, o) {
            void 0 === o && (o = ".vscode")
            try {
                return (i.isLinux ? e : e.toLowerCase()) === t ? r.statSync(n.join(e, o, "settings.json")).isFile() : r.statSync(n.join(e, o)).isDirectory()
            } catch (e) {
                if (!e || "ENOENT" !== e.code)throw e
            }
            return !1
        }

        function p(e) {
            if (e.length) {
                var t = Math.max.apply(Math, e.map(function (e) {
                    return e.lastFocusTime
                })), n = e.filter(function (e) {
                    return e.lastFocusTime === t
                })
                if (n && n.length)return n[0]
            }
            return null
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.findBestWindowOrFolder = c, t.getLastActiveWindow = p
    })
    var o = this && this.__assign || Object.assign || function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
                t = arguments[n]
                for (var i in t)Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
            }
            return e
        }
    define(e[35], t([1, 0, 7, 38, 5, 66, 6, 20, 8, 42, 11, 13, 27, 56, 10, 55, 31, 12, 25, 84, 3, 113, 4, 16, 24, 36, 23, 132]), function (e, t, n, s, a, c, u, l, f, p, d, h, v, m, g, y, w, b, S, _, E, C, P, O, k, I, T, M) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var x
        !function (e) {
            e[e.UNRESPONSIVE = 0] = "UNRESPONSIVE", e[e.CRASHED = 1] = "CRASHED"
        }(x || (x = {}))
        var D = {ALL: "all", ONE: "one", NONE: "none"}
        t.IWindowsMainService = E.createDecorator("windowsMainService")
        var A = function () {
            function e(e, t, n, r, i, o, s) {
                this.logService = e, this.storageService = t, this.environmentService = n, this.lifecycleService = r, this.backupService = i, this.telemetryService = o, this.configurationService = s, this._onRecentPathsChange = new P.Emitter, this.onRecentPathsChange = this._onRecentPathsChange.event, this._onWindowReady = new P.Emitter, this.onWindowReady = this._onWindowReady.event, this._onWindowClose = new P.Emitter, this.onWindowClose = this._onWindowClose.event, this._onWindowReload = new P.Emitter, this.onWindowReload = this._onWindowReload.event, this._onPathsOpen = new P.Emitter, this.onPathsOpen = this._onPathsOpen.event
            }

            return e.prototype.ready = function (t) {
                this.registerListeners(), this.initialUserEnv = t, this.windowsState = this.storageService.getItem(e.windowsStateStorageKey) || {openedFolders: []}
            }, e.prototype.registerListeners = function () {
                var t = this
                g.app.on("activate", function (e, n) {
                    t.logService.log("App#activate"), n || t.openNewWindow(k.OpenContext.DOCK)
                })
                var n = [], r = null
                g.app.on("open-file", function (e, i) {
                    t.logService.log("App#open-file: ", i), e.preventDefault(), n.push(i), null !== r && (clearTimeout(r), r = null), r = setTimeout(function () {
                        t.open({
                            context: k.OpenContext.DOCK,
                            cli: t.environmentService.args,
                            pathsToOpen: n,
                            preferNewWindow: !0
                        }), n = [], r = null
                    }, 100)
                }), g.ipcMain.on("vscode:workbenchLoaded", function (e, n) {
                    t.logService.log("IPC#vscode-workbenchLoaded")
                    var r = t.getWindowById(n)
                    r && (r.setReady(), t._onWindowReady.fire(r))
                }), g.ipcMain.on("vscode:broadcast", function (n, r, i, o) {
                    if (o.channel && !u.isUndefinedOrNull(o.payload))if (t.logService.log("IPC#vscode:broadcast", i, o.channel, o.payload), t.onBroadcast(o.channel, o.payload), i) {
                        var s = e.WINDOWS.filter(function (e) {
                            return e.id !== r && "string" == typeof e.openedWorkspacePath
                        }), c = s.filter(function (e) {
                            return T.isEqual(i, e.openedWorkspacePath, !a.isLinux)
                        }), l = s.filter(function (e) {
                            return T.isParent(i, e.openedWorkspacePath, !a.isLinux)
                        }), f = c.length ? c[0] : l[0]
                        f && f.send("vscode:broadcast", o)
                    } else t.sendToAll("vscode:broadcast", o, [r])
                }), this.lifecycleService.onBeforeWindowClose(function (e) {
                    return t.onBeforeWindowClose(e)
                }), this.lifecycleService.onBeforeQuit(function () {
                    return t.onBeforeQuit()
                }), W.INSTANCE.onDidChangeKeyboardLayout(function (t) {
                    e.WINDOWS.forEach(function (e) {
                        e.sendWhenReady("vscode:keyboardLayoutChanged", t)
                    })
                })
            }, e.prototype.onBeforeQuit = function () {
                var t = {
                    openedFolders: [],
                    lastPluginDevelopmentHostWindow: this.windowsState.lastPluginDevelopmentHostWindow,
                    lastActiveWindow: this.lastClosedWindowState
                }
                if (!t.lastActiveWindow) {
                    var n = this.getLastActiveWindow()
                    n && !n.isExtensionDevelopmentHost || (n = e.WINDOWS.filter(function (e) {
                        return !e.isExtensionDevelopmentHost
                    })[0]), n && (t.lastActiveWindow = {
                        workspacePath: n.openedWorkspacePath,
                        uiState: n.serializeWindowState()
                    })
                }
                var r = e.WINDOWS.filter(function (e) {
                    return e.isExtensionDevelopmentHost && !e.isExtensionTestHost
                })[0]
                r && (t.lastPluginDevelopmentHostWindow = {
                    workspacePath: r.openedWorkspacePath,
                    uiState: r.serializeWindowState()
                }), this.getWindowCount() > 1 && (t.openedFolders = e.WINDOWS.filter(function (e) {
                    return !!e.openedWorkspacePath && !e.isExtensionDevelopmentHost
                }).map(function (e) {
                    return {workspacePath: e.openedWorkspacePath, uiState: e.serializeWindowState()}
                })), this.storageService.setItem(e.windowsStateStorageKey, t)
            }, e.prototype.onBeforeWindowClose = function (e) {
                if (!this.lifecycleService.isQuitRequested()) {
                    var t = {workspacePath: e.openedWorkspacePath, uiState: e.serializeWindowState()}
                    e.isExtensionDevelopmentHost && !e.isExtensionTestHost ? this.windowsState.lastPluginDevelopmentHostWindow = t : !e.isExtensionDevelopmentHost && e.openedWorkspacePath && this.windowsState.openedFolders.forEach(function (n) {
                            T.isEqual(n.workspacePath, e.openedWorkspacePath, !a.isLinux) && (n.uiState = t.uiState)
                        }), a.isMacintosh || 1 !== this.getWindowCount() || (this.lastClosedWindowState = t)
                }
            }, e.prototype.onBroadcast = function (e, t) {
                if ("vscode:changeColorTheme" === e && "string" == typeof t) {
                    var n = JSON.parse(t)
                    this.storageService.setItem(m.VSCodeWindow.themeStorageKey, n.id), this.storageService.setItem(m.VSCodeWindow.themeBackgroundStorageKey, n.background)
                }
            }, e.prototype.reload = function (e, t) {
                var n = this
                this.lifecycleService.unload(e, w.UnloadReason.RELOAD).done(function (r) {
                    r || (e.reload(t), n._onWindowReload.fire(e.id))
                })
            }, e.prototype.open = function (t) {
                var n, r = this, i = this.configurationService.getConfiguration("window"), o = []
                if (t.pathsToOpen && t.pathsToOpen.length > 0) {
                    if (n = t.pathsToOpen.map(function (e) {
                            var n = r.toIPath(e, !1, t.cli && t.cli["goto"])
                            if (!n) {
                                var i = {
                                    title: O["default"].nameLong,
                                    type: "info",
                                    buttons: [c.localize(0, null)],
                                    message: c.localize(1, null),
                                    detail: c.localize(2, null, e),
                                    noLink: !0
                                }, o = g.BrowserWindow.getFocusedWindow()
                                o ? g.dialog.showMessageBox(o, i) : g.dialog.showMessageBox(i)
                            }
                            return n
                        }), n = l.coalesce(n), 0 === n.length)return null
                } else if (t.forceEmpty) n = [Object.create(null)]
                else {
                    var s = t.cli._.length > 0
                    n = this.cliToPaths(t.cli, s)
                }
                var u = l.distinct(n.filter(function (e) {
                        return e.workspacePath && !e.filePath
                    }).map(function (e) {
                        return e.workspacePath
                    }), function (e) {
                        return a.isLinux ? e : e.toLowerCase()
                    }),
                    f = t.initialStartup && !t.cli.extensionDevelopmentPath ? this.backupService.getWorkspaceBackupPaths() : [],
                    p = [], d = [], h = n.filter(function (e) {
                        return !e.workspacePath && !e.filePath
                    }),
                    v = t.initialStartup && !t.cli.extensionDevelopmentPath ? this.backupService.getEmptyWorkspaceBackupPaths() : [],
                    y = n.filter(function (e) {
                        return !!e.filePath && e.createFilePath
                    }), w = n.filter(function (e) {
                        return !!e.filePath && !e.createFilePath
                    })
                t.diffMode ? (2 === w.length ? d = w : h = [Object.create(null)], u = [], f = [], y = []) : p = w
                var b = (t.preferNewWindow || t.forceNewWindow) && !t.forceReuseWindow
                if (t.forceNewWindow || t.forceReuseWindow || !i || "on" !== i.openFoldersInNewWindow && "off" !== i.openFoldersInNewWindow || (b = "on" === i.openFoldersInNewWindow), !u.length && !f.length && !v.length && (p.length > 0 || y.length > 0 || d.length > 0)) {
                    var S = void 0
                    t.forceNewWindow || t.forceReuseWindow ? S = t.forceNewWindow && !t.forceReuseWindow : (t.context === k.OpenContext.DOCK && (S = !0), t.cli.extensionDevelopmentPath || !i || "on" !== i.openFilesInNewWindow && "off" !== i.openFilesInNewWindow || (S = "on" === i.openFilesInNewWindow))
                    var _ = p[0] || y[0] || d[0], E = C.findBestWindowOrFolder({
                        windows: e.WINDOWS,
                        newWindow: S,
                        reuseWindow: t.forceReuseWindow,
                        context: t.context,
                        filePath: _ && _.filePath,
                        userHome: this.environmentService.userHome
                    })
                    if (E instanceof m.VSCodeWindow) {
                        E.focus()
                        var P = {filesToOpen: p, filesToCreate: y, filesToDiff: d}
                        E.ready().then(function (e) {
                            e.send("vscode:openFiles", P)
                        }), o.push(E)
                    } else {
                        var I = this.toConfiguration(t, E, p, y, d), M = this.openInBrowserWindow(I, !0)
                        o.push(M), b = !0
                    }
                    p = [], y = [], d = []
                }
                var x = l.distinct(u.concat(f), function (e) {
                    return a.isLinux ? e : e.toLowerCase()
                })
                if (x.length > 0) {
                    var D = l.coalesce(x.map(function (e) {
                        return r.findWindow(e)
                    }))
                    if (D.length > 0) {
                        var M = D[0]
                        M.focus()
                        var A = {filesToOpen: p, filesToCreate: y, filesToDiff: d}
                        M.ready().then(function (e) {
                            e.send("vscode:openFiles", A)
                        }), o.push(M), p = [], y = [], d = [], b = !0
                    }
                    x.forEach(function (e) {
                        if (!D.some(function (t) {
                                return T.isEqual(t.openedWorkspacePath, e, !a.isLinux)
                            })) {
                            var n = r.toConfiguration(t, e, p, y, d),
                                i = r.openInBrowserWindow(n, b, b ? void 0 : t.windowToUse)
                            o.push(i), p = [], y = [], d = [], b = !0
                        }
                    })
                }
                if (v.length > 0 ? v.forEach(function (e) {
                        var n = r.toConfiguration(t, void 0, p, y, d), i = r.openInBrowserWindow(n, !0, null, e)
                        o.push(i), p = [], y = [], d = [], b = !0
                    }) : h.length > 0 && h.forEach(function () {
                            var e = r.toConfiguration(t), n = r.openInBrowserWindow(e, b, b ? void 0 : t.windowToUse)
                            o.push(n), b = !0
                        }), !o.some(function (e) {
                        return e.isExtensionDevelopmentHost
                    }) && !t.cli.diff) {
                    var W = []
                    n.forEach(function (e) {
                        (e.filePath || e.workspacePath) && (g.app.addRecentDocument(e.filePath || e.workspacePath), W.push({
                            path: e.filePath || e.workspacePath,
                            isFile: !!e.filePath
                        }))
                    }), W.length && this.addToRecentPathsList(W)
                }
                return this._onPathsOpen.fire(n), l.distinct(o)
            }, e.prototype.addToRecentPathsList = function (t) {
                if (t && t.length) {
                    var n = this.getRecentPathsList()
                    t.forEach(function (t) {
                        var r = t.path
                        t.isFile ? (n.files.unshift(r), n.files = l.distinct(n.files, function (e) {
                            return a.isLinux ? e : e.toLowerCase()
                        })) : (n.folders.unshift(r), n.folders = l.distinct(n.folders, function (e) {
                            return a.isLinux ? e : e.toLowerCase()
                        })), n.folders = n.folders.slice(0, e.MAX_TOTAL_RECENT_ENTRIES), n.files = n.files.slice(0, e.MAX_TOTAL_RECENT_ENTRIES)
                    }), this.storageService.setItem(e.recentPathsListStorageKey, n), this._onRecentPathsChange.fire()
                }
            }, e.prototype.removeFromRecentPathsList = function (t) {
                var n
                n = Array.isArray(t) ? t : [t]
                var r = this.getRecentPathsList(), i = !1
                n.forEach(function (e) {
                    var t = r.files.indexOf(e)
                    t >= 0 && (r.files.splice(t, 1), i = !0), (t = r.folders.indexOf(e)) >= 0 && (r.folders.splice(t, 1), i = !0)
                }), i && (this.storageService.setItem(e.recentPathsListStorageKey, r), this._onRecentPathsChange.fire())
            }, e.prototype.clearRecentPathsList = function () {
                this.storageService.setItem(e.recentPathsListStorageKey, {
                    folders: [],
                    files: []
                }), g.app.clearRecentDocuments(), this._onRecentPathsChange.fire()
            }, e.prototype.getRecentPathsList = function (t, n) {
                var r, i, o = this.storageService.getItem(e.recentPathsListStorageKey)
                return o ? (r = o.files || [], i = o.folders || []) : (r = [], i = []), n && r.unshift.apply(r, n.map(function (e) {
                    return e.filePath
                })), t && i.unshift(t), r = l.distinct(r), i = l.distinct(i), {files: r, folders: i}
            }, e.prototype.getWindowUserEnv = function (e) {
                return f.assign({}, this.initialUserEnv, e.userEnv || {})
            }, e.prototype.openExtensionDevelopmentHostWindow = function (t) {
                var n = e.WINDOWS.filter(function (e) {
                    return e.config && T.isEqual(e.config.extensionDevelopmentPath, t.cli.extensionDevelopmentPath, !a.isLinux)
                })
                if (n && 1 === n.length)return this.reload(n[0], t.cli), void n[0].focus()
                if (0 === t.cli._.length && !t.cli.extensionTestsPath) {
                    var r = this.windowsState.lastPluginDevelopmentHostWindow && this.windowsState.lastPluginDevelopmentHostWindow.workspacePath
                    r && (t.cli._ = [r])
                }
                t.cli._.length > 0 && (n = e.WINDOWS.filter(function (e) {
                    return e.openedWorkspacePath && t.cli._.indexOf(e.openedWorkspacePath) >= 0
                }), n.length && (t.cli._ = [])), this.open({
                    context: t.context,
                    cli: t.cli,
                    forceNewWindow: !0,
                    forceEmpty: 0 === t.cli._.length,
                    userEnv: t.userEnv
                })
            }, e.prototype.toConfiguration = function (e, t, n, r, i) {
                var o = f.mixin({}, e.cli)
                return o.appRoot = this.environmentService.appRoot, o.execPath = process.execPath, o.userEnv = this.getWindowUserEnv(e), o.isInitialStartup = e.initialStartup, o.workspacePath = t, o.filesToOpen = n, o.filesToCreate = r, o.filesToDiff = i, o.nodeCachedDataDir = this.environmentService.nodeCachedDataDir, o.isISOKeyboard = W.INSTANCE.isISOKeyboard(), o
            }, e.prototype.toIPath = function (e, t, r) {
                if (!e)return null
                var i
                r && (i = y.parseLineAndColumnAware(e), e = i.path)
                var o = n.normalize(e)
                try {
                    var a = s.statSync(o)
                    if (a)return a.isFile() ? {
                        filePath: o,
                        lineNumber: r ? i.line : void 0,
                        columnNumber: r ? i.column : void 0
                    } : {workspacePath: o}
                } catch (e) {
                    if (this.removeFromRecentPathsList(o), t)return {filePath: o, createFilePath: !0}
                }
                return null
            }, e.prototype.cliToPaths = function (e, t) {
                var n = this, r = []
                if (e._.length > 0) r = e._
                else {
                    var i = void 0
                    if (this.lifecycleService.wasRestarted) i = D.ALL
                    else {
                        var o = this.configurationService.getConfiguration("window")
                        i = o && o.reopenFolders || D.ONE
                    }
                    var s = this.windowsState.lastActiveWindow && this.windowsState.lastActiveWindow.workspacePath
                    if (i === D.ALL) {
                        var a = this.windowsState.openedFolders.map(function (e) {
                            return e.workspacePath
                        })
                        s && (a.splice(a.indexOf(s), 1), a.push(s)), r.push.apply(r, a)
                    } else!s || i !== D.ONE && i === D.NONE || r.push(s)
                }
                var c = r.map(function (r) {
                    return n.toIPath(r, t, e["goto"])
                }).filter(function (e) {
                    return !!e
                })
                return c.length > 0 ? c : [Object.create(null)]
            }, e.prototype.openInBrowserWindow = function (t, n, r, i) {
                var o, s = this
                if (n || (o = r || this.getLastActiveWindow()) && o.focus(), o) {
                    var a = o.config
                    !t.extensionDevelopmentPath && a && a.extensionDevelopmentPath && (t.extensionDevelopmentPath = a.extensionDevelopmentPath, t.verbose = a.verbose, t.debugBrkPluginHost = a.debugBrkPluginHost, t.debugPluginHost = a.debugPluginHost, t["extensions-dir"] = a["extensions-dir"])
                } else {
                    var c = this.configurationService.getConfiguration("window"), u = this.getNewWindowState(t),
                        l = void 0
                    l = u.hasDefaultState ? c && c.newWindowDimensions && ["fullscreen", "inherit"].indexOf(c.newWindowDimensions) >= 0 : this.lifecycleService.wasRestarted || c && c.restoreFullscreen, u.mode !== m.WindowMode.Fullscreen || l || (u.mode = m.WindowMode.Normal), o = new m.VSCodeWindow({
                        state: u,
                        extensionDevelopmentPath: t.extensionDevelopmentPath,
                        isExtensionTestHost: !!t.extensionTestsPath
                    }, this.logService, this.environmentService, this.configurationService, this.storageService), e.WINDOWS.push(o), o.win.webContents.removeAllListeners("devtools-reload-page"), o.win.webContents.on("devtools-reload-page", function () {
                        return s.reload(o)
                    }), o.win.webContents.on("crashed", function () {
                        return s.onWindowError(o, x.CRASHED)
                    }), o.win.on("unresponsive", function () {
                        return s.onWindowError(o, x.UNRESPONSIVE)
                    }), o.win.on("closed", function () {
                        return s.onWindowClosed(o)
                    }), this.lifecycleService.registerWindow(o)
                }
                return this.lifecycleService.unload(o, w.UnloadReason.LOAD).done(function (e) {
                    e || (t.extensionDevelopmentPath || s.backupService.registerWindowForBackupsSync(o.id, !t.workspacePath, i, t.workspacePath), o.load(t))
                }), o
            }, e.prototype.getNewWindowState = function (e) {
                if (e.extensionDevelopmentPath && this.windowsState.lastPluginDevelopmentHostWindow)return this.windowsState.lastPluginDevelopmentHostWindow.uiState
                if (e.workspacePath) {
                    var t = this.windowsState.openedFolders.filter(function (t) {
                        return T.isEqual(t.workspacePath, e.workspacePath, !a.isLinux)
                    }).map(function (e) {
                        return e.uiState
                    })
                    if (t.length)return t[0]
                }
                var n = this.getLastActiveWindow()
                if (!n && this.windowsState.lastActiveWindow)return this.windowsState.lastActiveWindow.uiState
                var r, i = g.screen.getAllDisplays()
                if (1 === i.length) r = i[0]
                else {
                    if (a.isMacintosh) {
                        var o = g.screen.getCursorScreenPoint()
                        r = g.screen.getDisplayNearestPoint(o)
                    }
                    !r && n && (r = g.screen.getDisplayMatching(n.getBounds())), r || (r = g.screen.getPrimaryDisplay() || i[0])
                }
                var s = m.defaultWindowState()
                s.x = r.bounds.x + r.bounds.width / 2 - s.width / 2, s.y = r.bounds.y + r.bounds.height / 2 - s.height / 2
                var c = this.configurationService.getConfiguration("window"), u = !0
                if (c && c.newWindowDimensions)if ("maximized" === c.newWindowDimensions) s.mode = m.WindowMode.Maximized, u = !1
                else if ("fullscreen" === c.newWindowDimensions) s.mode = m.WindowMode.Fullscreen, u = !1
                else if ("inherit" === c.newWindowDimensions && n) {
                    var l = n.serializeWindowState()
                    l.mode === m.WindowMode.Fullscreen ? s.mode = m.WindowMode.Fullscreen : s = l, u = !1
                }
                return u && (s = this.ensureNoOverlap(s)), s.hasDefaultState = !0, s
            }, e.prototype.ensureNoOverlap = function (t) {
                if (0 === e.WINDOWS.length)return t
                for (var n = e.WINDOWS.map(function (e) {
                    return e.getBounds()
                }); n.some(function (e) {
                    return e.x === t.x || e.y === t.y
                });)t.x += 30, t.y += 30
                return t
            }, e.prototype.openFileFolderPicker = function (e, t) {
                this.doPickAndOpen({pickFolders: !0, pickFiles: !0, forceNewWindow: e}, "openFileFolder", t)
            }, e.prototype.openFilePicker = function (e, t, n, r) {
                this.doPickAndOpen({pickFiles: !0, forceNewWindow: e, path: t, window: n}, "openFile", r)
            }, e.prototype.openFolderPicker = function (e, t, n) {
                this.doPickAndOpen({pickFolders: !0, forceNewWindow: e, window: t}, "openFolder", n)
            }, e.prototype.openAccessibilityOptions = function () {
                var e = new g.BrowserWindow({
                    alwaysOnTop: !0,
                    skipTaskbar: !0,
                    resizable: !1,
                    width: 450,
                    height: 300,
                    show: !0,
                    title: c.localize(3, null)
                })
                e.setMenuBarVisibility(!1), e.loadURL("chrome://accessibility")
            }, e.prototype.doPickAndOpen = function (e, t, n) {
                var r = this
                this.getFileOrFolderPaths(e, function (i) {
                    var s = i ? i.length : 0
                    s && r.open({
                        context: k.OpenContext.DIALOG,
                        cli: r.environmentService.args,
                        pathsToOpen: i,
                        forceNewWindow: e.forceNewWindow
                    }), r.telemetryService.publicLog(t, o({}, n, {outcome: s ? "success" : "canceled", nOfPaths: s}))
                })
            }, e.prototype.getFileOrFolderPaths = function (t, r) {
                var i, o = this, s = t.path || this.storageService.getItem(e.workingDirPickerStorageKey),
                    a = t.window || this.getFocusedWindow()
                i = t.pickFiles && t.pickFolders ? ["multiSelections", "openDirectory", "openFile", "createDirectory"] : ["multiSelections", t.pickFolders ? "openDirectory" : "openFile", "createDirectory"], g.dialog.showOpenDialog(a && a.win, {
                    defaultPath: s,
                    properties: i
                }, function (t) {
                    t && t.length > 0 ? (o.storageService.setItem(e.workingDirPickerStorageKey, n.dirname(t[0])), r(t)) : r(void 0)
                })
            }, e.prototype.focusLastActive = function (e, t) {
                var n = this.getLastActiveWindow()
                if (n)return n.focus(), n
                var r = this.open({context: t, cli: e, forceEmpty: !0})
                return r && r[0]
            }, e.prototype.getLastActiveWindow = function () {
                return C.getLastActiveWindow(e.WINDOWS)
            }, e.prototype.findWindow = function (t, n, r) {
                if (e.WINDOWS.length) {
                    var i = e.WINDOWS.slice(0), o = this.getLastActiveWindow()
                    o && (i.splice(i.indexOf(o), 1), i.unshift(o))
                    var s = i.filter(function (e) {
                        return !("string" != typeof e.openedWorkspacePath || !T.isEqual(e.openedWorkspacePath, t, !a.isLinux)) || !("string" != typeof e.openedFilePath || !T.isEqual(e.openedFilePath, n, !a.isLinux)) || !("string" != typeof e.openedWorkspacePath || !n || !T.isEqualOrParent(n, e.openedWorkspacePath, !a.isLinux)) || !("string" != typeof r || !T.isEqual(e.extensionDevelopmentPath, r, !a.isLinux))
                    })
                    if (s && s.length)return s[0]
                }
                return null
            }, e.prototype.openNewWindow = function (e) {
                this.open({context: e, cli: this.environmentService.args, forceNewWindow: !0, forceEmpty: !0})
            }, e.prototype.sendToFocused = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
                var r = this.getFocusedWindow() || this.getLastActiveWindow()
                r && r.sendWhenReady.apply(r, [e].concat(t))
            }, e.prototype.sendToAll = function (t, n, r) {
                e.WINDOWS.forEach(function (e) {
                    r && r.indexOf(e.id) >= 0 || e.sendWhenReady(t, n)
                })
            }, e.prototype.getFocusedWindow = function () {
                var e = g.BrowserWindow.getFocusedWindow()
                return e ? this.getWindowById(e.id) : null
            }, e.prototype.getWindowById = function (t) {
                var n = e.WINDOWS.filter(function (e) {
                    return e.id === t
                })
                return n && 1 === n.length ? n[0] : null
            }, e.prototype.getWindows = function () {
                return e.WINDOWS
            }, e.prototype.getWindowCount = function () {
                return e.WINDOWS.length
            }, e.prototype.onWindowError = function (e, t) {
                var n = this
                console.error(t === x.CRASHED ? "[VS Code]: render process crashed!" : "[VS Code]: detected unresponsive"), t === x.UNRESPONSIVE ? g.dialog.showMessageBox(e.win, {
                    title: O["default"].nameLong,
                    type: "warning",
                    buttons: [c.localize(4, null), c.localize(5, null), c.localize(6, null)],
                    message: c.localize(7, null),
                    detail: c.localize(8, null),
                    noLink: !0
                }, function (t) {
                    0 === t ? e.reload() : 2 === t && (n.onBeforeWindowClose(e), e.win.destroy())
                }) : g.dialog.showMessageBox(e.win, {
                    title: O["default"].nameLong,
                    type: "warning",
                    buttons: [c.localize(9, null), c.localize(10, null)],
                    message: c.localize(11, null),
                    detail: c.localize(12, null),
                    noLink: !0
                }, function (t) {
                    0 === t ? e.reload() : 1 === t && (n.onBeforeWindowClose(e), e.win.destroy())
                })
            }, e.prototype.onWindowClosed = function (t) {
                t.dispose()
                var n = e.WINDOWS.indexOf(t)
                e.WINDOWS.splice(n, 1), this._onWindowClose.fire(t.id)
            }, e.prototype.updateWindowsJumpList = function () {
                if (a.isWindows) {
                    var e = []
                    e.push({
                        type: "tasks",
                        items: [{
                            type: "task",
                            title: c.localize(13, null),
                            description: c.localize(14, null),
                            program: process.execPath,
                            args: "-n",
                            iconPath: process.execPath,
                            iconIndex: 0
                        }]
                    }), this.getRecentPathsList().folders.length > 0 && (this.removeFromRecentPathsList(g.app.getJumpListSettings().removedItems.map(function (e) {
                        return d.trim(e.args, '"')
                    })), e.push({
                        type: "custom",
                        name: c.localize(15, null),
                        items: this.getRecentPathsList().folders.slice(0, 7).map(function (e) {
                            return {
                                type: "task",
                                title: n.basename(e) || e,
                                description: c.localize(16, null, n.basename(e), _.getPathLabel(n.dirname(e))),
                                program: process.execPath,
                                args: '"' + e + '"',
                                iconPath: "explorer.exe",
                                iconIndex: 0
                            }
                        }).filter(function (e) {
                            return !!e
                        })
                    })), e.push({type: "recent"})
                    try {
                        g.app.setJumpList(e)
                    } catch (e) {
                        this.logService.log("#setJumpList", e)
                    }
                }
            }, e.prototype.quit = function () {
                var e = this, t = this.getFocusedWindow()
                t && t.isExtensionDevelopmentHost && this.getWindowCount() > 1 ? t.win.close() : setTimeout(function () {
                    e.lifecycleService.quit()
                }, 10)
            }, e
        }()
        A.MAX_TOTAL_RECENT_ENTRIES = 100, A.recentPathsListStorageKey = "openedPathsList", A.workingDirPickerStorageKey = "pickerWorkingDir", A.windowsStateStorageKey = "windowsState", A.WINDOWS = [], A = r([i(0, S.ILogService), i(1, v.IStorageService), i(2, h.IEnvironmentService), i(3, w.ILifecycleService), i(4, p.IBackupMainService), i(5, I.ITelemetryService), i(6, b.IConfigurationService)], A), t.WindowsManager = A
        var W = function () {
            function e() {
                this._emitter = new P.Emitter, this._registered = !1, this._isISOKeyboard = this._readIsISOKeyboard()
            }

            return e.prototype.onDidChangeKeyboardLayout = function (e) {
                var t = this
                return this._registered || (this._registered = !0, M.onDidChangeKeyboardLayout(function () {
                    t._emitter.fire(t._isISOKeyboard)
                }), a.isMacintosh && setInterval(function () {
                    var e = t._readIsISOKeyboard()
                    t._isISOKeyboard !== e && (t._isISOKeyboard = e, t._emitter.fire(t._isISOKeyboard))
                }, 3e3)), this._emitter.event(e)
            }, e.prototype._readIsISOKeyboard = function () {
                return !!a.isMacintosh && M.isISOKeyboard()
            }, e.prototype.isISOKeyboard = function () {
                return this._isISOKeyboard
            }, e
        }()
        W.INSTANCE = new W
    }), define(e[60], t([1, 0, 24, 35, 2, 25, 32, 3, 4]), function (e, t, n, o, s, a, c, u, l) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.ID = "launchService", t.ILaunchService = u.createDecorator(t.ID)
        var f = function () {
            function e(e) {
                this.service = e
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"start":
                        var n = t, r = n.args, i = n.userEnv
                        return this.service.start(r, i)
                    case"get-main-process-id":
                        return this.service.getMainProcessId()
                }
            }, e
        }()
        t.LaunchChannel = f
        var p = function () {
            function e(e) {
                this.channel = e
            }

            return e.prototype.start = function (e, t) {
                return this.channel.call("start", {args: e, userEnv: t})
            }, e.prototype.getMainProcessId = function () {
                return this.channel.call("get-main-process-id", null)
            }, e
        }()
        t.LaunchChannelClient = p
        var d = function () {
            function e(e, t, n) {
                this.logService = e, this.windowsService = t, this.urlService = n
            }

            return e.prototype.start = function (e, t) {
                var r = this
                this.logService.log("Received data from other instance: ", e, t)
                var i = e["open-url"] || [], o = "string" == typeof i ? [i] : i,
                    a = t.VSCODE_CLI ? n.OpenContext.CLI : n.OpenContext.DESKTOP
                if (o.length > 0)return o.forEach(function (e) {
                    return r.urlService.open(e)
                }), s.TPromise.as(null)
                var c
                if (e.extensionDevelopmentPath ? this.windowsService.openExtensionDevelopmentHostWindow({
                        context: a,
                        cli: e,
                        userEnv: t
                    }) : c = 0 === e._.length && (e["new-window"] || e["unity-launch"]) ? this.windowsService.open({
                        context: a,
                        cli: e,
                        userEnv: t,
                        forceNewWindow: !0,
                        forceEmpty: !0
                    }) : 0 === e._.length ? [this.windowsService.focusLastActive(e, a)] : this.windowsService.open({
                        context: a,
                        cli: e,
                        userEnv: t,
                        forceNewWindow: e.wait || e["new-window"],
                        preferNewWindow: !e["reuse-window"],
                        forceReuseWindow: e["reuse-window"],
                        diffMode: e.diff
                    }), e.wait && c && 1 === c.length && c[0]) {
                    var u = c[0].id
                    return new s.TPromise(function (e, t) {
                        l.once(r.windowsService.onWindowClose)(function (t) {
                            t === u && e(null)
                        })
                    })
                }
                return s.TPromise.as(null)
            }, e.prototype.getMainProcessId = function () {
                return this.logService.log("Received request for process ID from other instance."), s.TPromise.as(process.pid)
            }, e
        }()
        d = r([i(0, a.ILogService), i(1, o.IWindowsMainService), i(2, c.IURLService)], d), t.LaunchService = d
    }), define(e[117], t([1, 0, 64, 5, 20, 13, 10, 24, 35, 12, 27, 23, 36, 37, 16, 34, 3, 4, 57]), function (e, t, n, o, s, a, c, u, l, f, p, d, h, v, m, g, y, w, b) {
        "use strict"
        function S() {
            return new c.MenuItem({type: "separator"})
        }

        function _(e) {
            return o.isMacintosh ? e.replace(/\(&&\w\)|&&/g, "") : e.replace(/&&/g, "&")
        }

        function E(e) {
            return o.isMacintosh ? e : e.replace(/&/g, "&&")
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var C = function () {
            function e(t, n, r) {
                this.storageService = t, this.windowsService = r, this._onKeybindingsChanged = new w.Emitter, this.onKeybindingsChanged = this._onKeybindingsChanged.event, this.commandIds = new Set, this.keybindings = this.storageService.getItem(e.lastKnownKeybindingsMapStorageKey) || Object.create(null), this.keybindingsWatcher = new b.ConfigWatcher(n.appKeybindingsPath, {changeBufferDelay: 100}), this.registerListeners()
            }

            return e.prototype.registerListeners = function () {
                var t = this
                w.once(this.windowsService.onWindowReady)(function (e) {
                    return t.resolveKeybindings(e)
                }), c.ipcMain.on("vscode:keybindingsResolved", function (n, r) {
                    var i = []
                    try {
                        i = JSON.parse(r)
                    } catch (e) {
                    }
                    var o = !1, s = 0, a = Object.create(null)
                    i.forEach(function (e) {
                        s++, a[e.id] = e, t.keybindings[e.id] && e.label === t.keybindings[e.id].label || (o = !0)
                    }), Object.keys(t.keybindings).length !== s && (o = !0), o && (t.keybindings = a, t.storageService.setItem(e.lastKnownKeybindingsMapStorageKey, t.keybindings), t._onKeybindingsChanged.fire())
                }), this.keybindingsWatcher.onDidUpdateConfiguration(function () {
                    return t.resolveKeybindings()
                }), this.windowsService.onWindowReload(function () {
                    return t.resolveKeybindings()
                })
            }, e.prototype.resolveKeybindings = function (e) {
                if (void 0 === e && (e = this.windowsService.getLastActiveWindow()), this.commandIds.size && e) {
                    var t = []
                    this.commandIds.forEach(function (e) {
                        return t.push(e)
                    }), e.sendWhenReady("vscode:resolveKeybindings", JSON.stringify(t))
                }
            }, e.prototype.getKeybinding = function (e) {
                if (e)return this.commandIds.has(e) || this.commandIds.add(e), this.keybindings[e]
            }, e
        }()
        C.lastKnownKeybindingsMapStorageKey = "lastKnownKeybindings", C = r([i(0, p.IStorageService), i(1, a.IEnvironmentService), i(2, l.IWindowsMainService)], C)
        var P = function () {
            function e(e, t, n, r, i, o) {
                var s = this
                this.updateService = e, this.configurationService = n, this.windowsService = r, this.environmentService = i, this.telemetryService = o, this.extensionViewlets = [], this.menuUpdater = new g.RunOnceScheduler(function () {
                    return s.doUpdateMenu()
                }, 0), this.keybindingsResolver = t.createInstance(C), this.onConfigurationUpdated(this.configurationService.getConfiguration()), this.install(), this.registerListeners()
            }

            return e.prototype.registerListeners = function () {
                var e = this
                c.app.on("will-quit", function () {
                    e.isQuitting = !0
                }), this.windowsService.onPathsOpen(function (t) {
                    return e.updateMenu()
                }), this.windowsService.onRecentPathsChange(function (t) {
                    return e.updateMenu()
                }), this.windowsService.onWindowClose(function (t) {
                    return e.onClose(e.windowsService.getWindowCount())
                }), c.ipcMain.on("vscode:extensionViewlets", function (t, n) {
                    var r = []
                    try {
                        r = JSON.parse(n)
                    } catch (e) {
                    }
                    r.length && (e.extensionViewlets = r, e.updateMenu())
                }), this.configurationService.onDidUpdateConfiguration(function (t) {
                    return e.onConfigurationUpdated(t.config, !0)
                }), this.updateService.onStateChange(function () {
                    return e.updateMenu()
                }), this.keybindingsResolver.onKeybindingsChanged(function () {
                    return e.updateMenu()
                })
            }, e.prototype.onConfigurationUpdated = function (e, t) {
                var n = !1, r = e && e.files && e.files.autoSave
                r !== this.currentAutoSaveSetting && (this.currentAutoSaveSetting = r, n = !0)
                var i = e && e.workbench && e.workbench.sideBar && e.workbench.sideBar.location || "left"
                i !== this.currentSidebarLocation && (this.currentSidebarLocation = i, n = !0)
                var o = e && e.workbench && e.workbench.statusBar && e.workbench.statusBar.visible
                "boolean" != typeof o && (o = !0), o !== this.currentStatusbarVisible && (this.currentStatusbarVisible = o, n = !0)
                var s = e && e.workbench && e.workbench.activityBar && e.workbench.activityBar.visible
                "boolean" != typeof s && (s = !0), s !== this.currentActivityBarVisible && (this.currentActivityBarVisible = s, n = !0), t && n && this.updateMenu()
            }, e.prototype.updateMenu = function () {
                this.menuUpdater.schedule()
            }, e.prototype.doUpdateMenu = function () {
                var e = this
                this.isQuitting || setTimeout(function () {
                    e.isQuitting || e.install()
                }, 10)
            }, e.prototype.onClose = function (e) {
                0 === e && o.isMacintosh && this.updateMenu()
            }, e.prototype.install = function () {
                var e, t = this, r = new c.Menu
                if (o.isMacintosh) {
                    var i = new c.Menu
                    e = new c.MenuItem({label: m["default"].nameShort, submenu: i}), this.setMacApplicationMenu(i)
                }
                var s = new c.Menu, a = new c.MenuItem({label: _(n.localize(0, null)), submenu: s})
                this.setFileMenu(s)
                var l = new c.Menu, f = new c.MenuItem({label: _(n.localize(1, null)), submenu: l})
                this.setEditMenu(l)
                var p = new c.Menu, d = new c.MenuItem({label: _(n.localize(2, null)), submenu: p})
                this.setSelectionMenu(p)
                var h = new c.Menu, v = new c.MenuItem({label: _(n.localize(3, null)), submenu: h})
                this.setViewMenu(h)
                var g = new c.Menu, y = new c.MenuItem({label: _(n.localize(4, null)), submenu: g})
                this.setGotoMenu(g)
                var w = new c.Menu, b = new c.MenuItem({label: _(n.localize(5, null)), submenu: w})
                this.setDebugMenu(w)
                var S
                if (o.isMacintosh) {
                    var E = new c.Menu
                    S = new c.MenuItem({
                        label: _(n.localize(6, null)),
                        submenu: E,
                        role: "window"
                    }), this.setMacWindowMenu(E)
                }
                var C = new c.Menu, P = new c.MenuItem({label: _(n.localize(7, null)), submenu: C, role: "help"})
                if (this.setHelpMenu(C), e && r.append(e), r.append(a), r.append(f), r.append(d), r.append(v), r.append(y), r.append(b), S && r.append(S), r.append(P), o.isMacintosh && !this.appMenuInstalled) {
                    this.appMenuInstalled = !0
                    var O = new c.Menu
                    O.append(new c.MenuItem({
                        label: _(n.localize(8, null)), click: function () {
                            return t.windowsService.openNewWindow(u.OpenContext.DOCK)
                        }
                    })), c.app.dock.setMenu(O)
                }
            }, e.prototype.setMacApplicationMenu = function (e) {
                var t = this, r = new c.MenuItem({label: n.localize(9, null, m["default"].nameLong), role: "about"}),
                    i = this.getUpdateMenuItems(), o = this.getPreferencesMenu(), s = new c.MenuItem({
                        label: n.localize(10, null, m["default"].nameLong),
                        role: "hide",
                        accelerator: "Command+H"
                    }), a = new c.MenuItem({label: n.localize(11, null), role: "hideothers", accelerator: "Command+Alt+H"}),
                    u = new c.MenuItem({label: n.localize(12, null), role: "unhide"}),
                    l = new c.MenuItem(this.likeAction("workbench.action.quit", {
                        label: n.localize(13, null, m["default"].nameLong),
                        click: function () {
                            return t.windowsService.quit()
                        }
                    })), f = [r]
                f.push.apply(f, i), f.push.apply(f, [S(), o, S(), s, a, u, S(), l]), f.forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setFileMenu = function (e) {
                var t, r = this, i = 0 === this.windowsService.getWindowCount()
                t = i ? new c.MenuItem(this.likeAction("workbench.action.files.newUntitledFile", {
                    label: _(n.localize(14, null)),
                    click: function () {
                        return r.windowsService.openNewWindow(u.OpenContext.MENU)
                    }
                })) : this.createMenuItem(n.localize(15, null), "workbench.action.files.newUntitledFile")
                var a, l = new c.MenuItem(this.likeAction("workbench.action.files.openFileFolder", {
                    label: _(n.localize(16, null)),
                    click: function (e, t, n) {
                        return r.windowsService.openFileFolderPicker(r.isOptionClick(n), {from: "menu"})
                    }
                })), f = new c.MenuItem(this.likeAction("workbench.action.files.openFolder", {
                    label: _(n.localize(17, null)),
                    click: function (e, t, n) {
                        return r.windowsService.openFolderPicker(r.isOptionClick(n), void 0, {from: "menu"})
                    }
                }))
                a = i ? new c.MenuItem(this.likeAction("workbench.action.files.openFile", {
                    label: _(n.localize(18, null)),
                    click: function (e, t, n) {
                        return r.windowsService.openFilePicker(r.isOptionClick(n), void 0, void 0, {from: "menu"})
                    }
                })) : this.createMenuItem(n.localize(19, null), ["workbench.action.files.openFile", "workbench.action.files.openFileInNewWindow"])
                var p = new c.Menu
                this.setOpenRecentMenu(p)
                var h = new c.MenuItem({label: _(n.localize(20, null)), submenu: p, enabled: p.items.length > 0}),
                    v = this.createMenuItem(n.localize(21, null), "workbench.action.files.save", this.windowsService.getWindowCount() > 0),
                    m = this.createMenuItem(n.localize(22, null), "workbench.action.files.saveAs", this.windowsService.getWindowCount() > 0),
                    g = this.createMenuItem(n.localize(23, null), "workbench.action.files.saveAll", this.windowsService.getWindowCount() > 0),
                    y = [d.AutoSaveConfiguration.AFTER_DELAY, d.AutoSaveConfiguration.ON_FOCUS_CHANGE, d.AutoSaveConfiguration.ON_WINDOW_CHANGE].some(function (e) {
                        return r.currentAutoSaveSetting === e
                    }), w = new c.MenuItem(this.likeAction("vscode.toggleAutoSave", {
                        label: _(n.localize(24, null)),
                        type: "checkbox",
                        checked: y,
                        enabled: this.windowsService.getWindowCount() > 0,
                        click: function () {
                            return r.windowsService.sendToFocused("vscode.toggleAutoSave")
                        }
                    }, !1)), b = this.getPreferencesMenu(),
                    E = new c.MenuItem(this.likeAction("workbench.action.newWindow", {
                        label: _(n.localize(25, null)),
                        click: function () {
                            return r.windowsService.openNewWindow(u.OpenContext.MENU)
                        }
                    })),
                    C = this.createMenuItem(n.localize(26, null), "workbench.action.files.revert", this.windowsService.getWindowCount() > 0),
                    P = new c.MenuItem(this.likeAction("workbench.action.closeWindow", {
                        label: _(n.localize(27, null)),
                        click: function () {
                            return r.windowsService.getLastActiveWindow().win.close()
                        },
                        enabled: this.windowsService.getWindowCount() > 0
                    })), O = this.createMenuItem(n.localize(28, null), "workbench.action.closeFolder"),
                    k = this.createMenuItem(n.localize(29, null), "workbench.action.closeActiveEditor"),
                    I = new c.MenuItem(this.likeAction("workbench.action.quit", {
                        label: _(n.localize(30, null)),
                        click: function () {
                            return r.windowsService.quit()
                        }
                    }))
                s.coalesce([t, E, S(), o.isMacintosh ? l : null, o.isMacintosh ? null : a, o.isMacintosh ? null : f, h, S(), v, m, g, S(), w, S(), o.isMacintosh ? null : b, o.isMacintosh ? null : S(), C, k, O, o.isMacintosh ? null : P, o.isMacintosh ? null : S(), o.isMacintosh ? null : I]).forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.getPreferencesMenu = function () {
                var e = this.createMenuItem(n.localize(31, null), "workbench.action.openGlobalSettings"),
                    t = this.createMenuItem(n.localize(32, null), "workbench.action.openGlobalKeybindings"),
                    r = this.createMenuItem(n.localize(33, null), "workbench.extensions.action.showRecommendedKeymapExtensions"),
                    i = this.createMenuItem(n.localize(34, null), "workbench.action.openSnippets"),
                    o = this.createMenuItem(n.localize(35, null), "workbench.action.selectTheme"),
                    s = this.createMenuItem(n.localize(36, null), "workbench.action.selectIconTheme"), a = new c.Menu
                return a.append(e), a.append(S()), a.append(t), a.append(r), a.append(S()), a.append(i), a.append(S()), a.append(o), a.append(s), new c.MenuItem({
                    label: _(n.localize(37, null)),
                    submenu: a
                })
            }, e.prototype.setOpenRecentMenu = function (t) {
                t.append(this.createMenuItem(n.localize(38, null), "workbench.action.reopenClosedEditor"))
                var r = this.windowsService.getRecentPathsList(), i = r.folders, o = r.files
                if (i.length > 0) {
                    t.append(S())
                    for (var s = 0; s < e.MAX_MENU_RECENT_ENTRIES && s < i.length; s++)t.append(this.createOpenRecentMenuItem(i[s], "openRecentFolder"))
                }
                if (o.length > 0) {
                    t.append(S())
                    for (var s = 0; s < e.MAX_MENU_RECENT_ENTRIES && s < o.length; s++)t.append(this.createOpenRecentMenuItem(o[s], "openRecentFile"))
                }
                (i.length || o.length) && (t.append(S()), t.append(this.createMenuItem(n.localize(39, null), "workbench.action.clearRecentFiles")))
            }, e.prototype.createOpenRecentMenuItem = function (e, t) {
                var n = this, r = e
                return (o.isMacintosh || o.isLinux) && 0 === e.indexOf(this.environmentService.userHome) && (r = "~" + e.substr(this.environmentService.userHome.length)), new c.MenuItem(this.likeAction(t, {
                    label: E(r), click: function (t, r, i) {
                        var o = n.isOptionClick(i)
                        !!n.windowsService.open({
                            context: u.OpenContext.MENU,
                            cli: n.environmentService.args,
                            pathsToOpen: [e],
                            forceNewWindow: o
                        }) || n.windowsService.removeFromRecentPathsList(e)
                    }
                }, !1))
            }, e.prototype.isOptionClick = function (e) {
                return e && (!o.isMacintosh && (e.ctrlKey || e.shiftKey) || o.isMacintosh && (e.metaKey || e.altKey))
            }, e.prototype.createRoleMenuItem = function (e, t, n) {
                var r = {label: _(e), role: n, enabled: !0}
                return new c.MenuItem(this.withKeybinding(t, r))
            }, e.prototype.setEditMenu = function (e) {
                var t, r, i, s, a
                o.isMacintosh ? (t = this.createDevToolsAwareMenuItem(n.localize(40, null), "undo", function (e) {
                    return e.undo()
                }), r = this.createDevToolsAwareMenuItem(n.localize(41, null), "redo", function (e) {
                    return e.redo()
                }), i = this.createRoleMenuItem(n.localize(42, null), "editor.action.clipboardCutAction", "cut"), s = this.createRoleMenuItem(n.localize(43, null), "editor.action.clipboardCopyAction", "copy"), a = this.createRoleMenuItem(n.localize(44, null), "editor.action.clipboardPasteAction", "paste")) : (t = this.createMenuItem(n.localize(45, null), "undo"), r = this.createMenuItem(n.localize(46, null), "redo"), i = this.createMenuItem(n.localize(47, null), "editor.action.clipboardCutAction"), s = this.createMenuItem(n.localize(48, null), "editor.action.clipboardCopyAction"), a = this.createMenuItem(n.localize(49, null), "editor.action.clipboardPasteAction"))
                var c = this.createMenuItem(n.localize(50, null), "actions.find"),
                    u = this.createMenuItem(n.localize(51, null), "editor.action.startFindReplaceAction"),
                    l = this.createMenuItem(n.localize(52, null), "workbench.action.findInFiles"),
                    f = this.createMenuItem(n.localize(53, null), "workbench.action.replaceInFiles"),
                    p = this.createMenuItem(n.localize(54, null), "editor.emmet.action.expandAbbreviation"),
                    d = this.createMenuItem(n.localize(55, null), "workbench.action.showEmmetCommands"),
                    h = this.createMenuItem(n.localize(56, null), "editor.action.commentLine"),
                    v = this.createMenuItem(n.localize(57, null), "editor.action.blockComment");
                [t, r, S(), i, s, a, S(), c, u, S(), l, f, S(), h, v, p, d].forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setSelectionMenu = function (e) {
                var t, r = this.createMenuItem(n.localize(58, null), "editor.action.insertCursorAbove"),
                    i = this.createMenuItem(n.localize(59, null), "editor.action.insertCursorBelow"),
                    s = this.createMenuItem(n.localize(60, null), "editor.action.insertCursorAtEndOfEachLineSelected"),
                    a = this.createMenuItem(n.localize(61, null), "editor.action.addSelectionToNextFindMatch"),
                    c = this.createMenuItem(n.localize(62, null), "editor.action.addSelectionToPreviousFindMatch"),
                    u = this.createMenuItem(n.localize(63, null), "editor.action.selectHighlights"),
                    l = this.createMenuItem(n.localize(64, null), "editor.action.copyLinesUpAction"),
                    f = this.createMenuItem(n.localize(65, null), "editor.action.copyLinesDownAction"),
                    p = this.createMenuItem(n.localize(66, null), "editor.action.moveLinesUpAction"),
                    d = this.createMenuItem(n.localize(67, null), "editor.action.moveLinesDownAction")
                t = o.isMacintosh ? this.createDevToolsAwareMenuItem(n.localize(68, null), "editor.action.selectAll", function (e) {
                    return e.selectAll()
                }) : this.createMenuItem(n.localize(69, null), "editor.action.selectAll"), [t, this.createMenuItem(n.localize(70, null), "editor.action.smartSelect.grow"), this.createMenuItem(n.localize(71, null), "editor.action.smartSelect.shrink"), S(), l, f, p, d, S(), r, i, s, a, c, u].forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setViewMenu = function (e) {
                var t, r = this, i = this.createMenuItem(n.localize(72, null), "workbench.view.explorer"),
                    a = this.createMenuItem(n.localize(73, null), "workbench.view.search"),
                    u = this.createMenuItem(n.localize(74, null), "workbench.view.git"),
                    l = this.createMenuItem(n.localize(75, null), "workbench.view.debug"),
                    f = this.createMenuItem(n.localize(76, null), "workbench.view.extensions"),
                    p = this.createMenuItem(n.localize(77, null), "workbench.action.output.toggleOutput"),
                    d = this.createMenuItem(n.localize(78, null), "workbench.debug.action.toggleRepl"),
                    h = this.createMenuItem(n.localize(79, null), "workbench.action.terminal.toggleTerminal"),
                    v = this.createMenuItem(n.localize(80, null), "workbench.actions.view.problems")
                if (this.extensionViewlets.length) {
                    var m = new c.Menu
                    this.extensionViewlets.forEach(function (e) {
                        m.append(r.createMenuItem(e.label, e.id))
                    }), t = new c.MenuItem({label: _(n.localize(81, null)), submenu: m, enabled: !0})
                }
                var g, y = this.createMenuItem(n.localize(82, null), "workbench.action.showCommands"),
                    w = new c.MenuItem(this.withKeybinding("workbench.action.toggleFullScreen", {
                        label: _(n.localize(83, null)),
                        click: function () {
                            return r.windowsService.getLastActiveWindow().toggleFullScreen()
                        },
                        enabled: this.windowsService.getWindowCount() > 0
                    })),
                    b = this.createMenuItem(n.localize(84, null), "workbench.action.toggleZenMode", this.windowsService.getWindowCount() > 0),
                    E = this.createMenuItem(n.localize(85, null), "workbench.action.toggleMenuBar"),
                    C = this.createMenuItem(n.localize(86, null), "workbench.action.splitEditor"),
                    P = this.createMenuItem(n.localize(87, null), "workbench.action.toggleEditorGroupLayout"),
                    O = this.createMenuItem(n.localize(88, null), "workbench.action.toggleSidebarVisibility")
                g = "right" !== this.currentSidebarLocation ? n.localize(89, null) : n.localize(90, null)
                var k, I = this.createMenuItem(g, "workbench.action.toggleSidebarPosition"),
                    T = this.createMenuItem(n.localize(91, null), "workbench.action.togglePanel")
                k = this.currentStatusbarVisible ? n.localize(92, null) : n.localize(93, null)
                var M, x = this.createMenuItem(k, "workbench.action.toggleStatusbarVisibility")
                M = this.currentActivityBarVisible ? n.localize(94, null) : n.localize(95, null)
                var D = this.createMenuItem(M, "workbench.action.toggleActivityBarVisibility"),
                    A = this.createMenuItem(n.localize(96, null), "editor.action.toggleWordWrap"),
                    W = this.createMenuItem(n.localize(97, null), "editor.action.toggleRenderWhitespace"),
                    R = this.createMenuItem(n.localize(98, null), "editor.action.toggleRenderControlCharacter"),
                    L = this.createMenuItem(n.localize(99, null), "workbench.action.zoomIn"),
                    N = this.createMenuItem(n.localize(100, null), "workbench.action.zoomOut"),
                    F = this.createMenuItem(n.localize(101, null), "workbench.action.zoomReset")
                s.coalesce([y, S(), i, a, u, l, f, t, S(), p, v, d, h, S(), w, b, o.isWindows || o.isLinux ? E : void 0, S(), C, P, I, O, T, x, D, S(), A, W, R, S(), L, N, F]).forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setGotoMenu = function (e) {
                var t = this.createMenuItem(n.localize(102, null), "workbench.action.navigateBack"),
                    r = this.createMenuItem(n.localize(103, null), "workbench.action.navigateForward"), i = new c.Menu,
                    o = this.createMenuItem(n.localize(104, null), "workbench.action.nextEditor"),
                    s = this.createMenuItem(n.localize(105, null), "workbench.action.previousEditor"),
                    a = this.createMenuItem(n.localize(106, null), "workbench.action.openNextRecentlyUsedEditorInGroup"),
                    u = this.createMenuItem(n.localize(107, null), "workbench.action.openPreviousRecentlyUsedEditorInGroup");
                [o, s, S(), a, u].forEach(function (e) {
                    return i.append(e)
                })
                var l = new c.MenuItem({label: _(n.localize(108, null)), submenu: i, enabled: !0}), f = new c.Menu,
                    p = this.createMenuItem(n.localize(109, null), "workbench.action.focusFirstEditorGroup"),
                    d = this.createMenuItem(n.localize(110, null), "workbench.action.focusSecondEditorGroup"),
                    h = this.createMenuItem(n.localize(111, null), "workbench.action.focusThirdEditorGroup"),
                    v = this.createMenuItem(n.localize(112, null), "workbench.action.focusNextGroup"),
                    m = this.createMenuItem(n.localize(113, null), "workbench.action.focusPreviousGroup");
                [p, d, h, S(), v, m].forEach(function (e) {
                    return f.append(e)
                })
                var g = new c.MenuItem({label: _(n.localize(114, null)), submenu: f, enabled: !0}),
                    y = this.createMenuItem(n.localize(115, null), "workbench.action.quickOpen"),
                    w = this.createMenuItem(n.localize(116, null), "workbench.action.gotoSymbol"),
                    b = this.createMenuItem(n.localize(117, null), "workbench.action.showAllSymbols"),
                    E = this.createMenuItem(n.localize(118, null), "editor.action.goToDeclaration"),
                    C = this.createMenuItem(n.localize(119, null), "workbench.action.gotoLine");
                [t, r, S(), l, g, S(), y, w, b, E, C].forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setDebugMenu = function (e) {
                var t = this.createMenuItem(n.localize(120, null), "workbench.action.debug.start0"),
                    r = this.createMenuItem(n.localize(121, null), "workbench.action.debug.run"),
                    i = this.createMenuItem(n.localize(122, null), "workbench.action.debug.stop"),
                    o = this.createMenuItem(n.localize(123, null), "workbench.action.debug.restart"),
                    s = this.createMenuItem(n.localize(124, null), "workbench.action.debug.configure"),
                    a = this.createMenuItem(n.localize(125, null), "debug.addConfiguration"),
                    u = this.createMenuItem(n.localize(126, null), "workbench.action.debug.stepOver"),
                    l = this.createMenuItem(n.localize(127, null), "workbench.action.debug.stepInto"),
                    f = this.createMenuItem(n.localize(128, null), "workbench.action.debug.stepOut"),
                    p = this.createMenuItem(n.localize(129, null), "workbench.action.debug.continue"),
                    d = this.createMenuItem(n.localize(130, null), "editor.debug.action.toggleBreakpoint"),
                    h = new c.Menu
                h.append(this.createMenuItem(n.localize(131, null), "editor.debug.action.conditionalBreakpoint")), h.append(this.createMenuItem(n.localize(132, null), "editor.debug.action.toggleColumnBreakpoint")), h.append(this.createMenuItem(n.localize(133, null), "workbench.debug.viewlet.action.addFunctionBreakpointAction"))
                var v = new c.MenuItem({label: _(n.localize(134, null)), submenu: h}),
                    m = this.createMenuItem(n.localize(135, null), "workbench.debug.viewlet.action.disableAllBreakpoints"),
                    g = this.createMenuItem(n.localize(136, null), "workbench.debug.viewlet.action.removeAllBreakpoints"),
                    y = this.createMenuItem(n.localize(137, null), "debug.installAdditionalDebuggers");
                [t, r, i, o, S(), s, a, S(), u, l, f, p, S(), d, v, m, g, S(), y].forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.setMacWindowMenu = function (e) {
                var t = new c.MenuItem({
                    label: n.localize(138, null),
                    role: "minimize",
                    accelerator: "Command+M",
                    enabled: this.windowsService.getWindowCount() > 0
                }), r = new c.MenuItem({
                    label: n.localize(139, null),
                    role: "close",
                    accelerator: "Command+W",
                    enabled: this.windowsService.getWindowCount() > 0
                }), i = new c.MenuItem({
                    label: n.localize(140, null),
                    role: "front",
                    enabled: this.windowsService.getWindowCount() > 0
                });
                [t, r, S(), i].forEach(function (t) {
                    return e.append(t)
                })
            }, e.prototype.toggleDevTools = function () {
                var e = this.windowsService.getFocusedWindow()
                if (e && e.win) {
                    var t = e.win.webContents
                    !e.hasHiddenTitleBarStyle() || e.win.isFullScreen() || t.isDevToolsOpened() ? t.toggleDevTools() : t.openDevTools({mode: "undocked"})
                }
            }, e.prototype.setHelpMenu = function (e) {
                var t = this, r = new c.MenuItem(this.likeAction("workbench.action.toggleDevTools", {
                    label: _(n.localize(141, null)),
                    click: function () {
                        return t.toggleDevTools()
                    },
                    enabled: this.windowsService.getWindowCount() > 0
                })), i = new c.MenuItem(this.likeAction("accessibilityOptions", {
                    label: _(n.localize(142, null)),
                    accelerator: null,
                    click: function () {
                        t.windowsService.openAccessibilityOptions()
                    }
                }, !1)), a = null
                if (m["default"].reportIssueUrl) {
                    var u = n.localize(143, null)
                    a = this.windowsService.getWindowCount() > 0 ? this.createMenuItem(u, "workbench.action.reportIssues") : new c.MenuItem({
                        label: _(u),
                        click: function () {
                            return t.openUrl(m["default"].reportIssueUrl, "openReportIssues")
                        }
                    })
                }
                var l = o.isLinux ? m["default"].keyboardShortcutsUrlLinux : o.isMacintosh ? m["default"].keyboardShortcutsUrlMac : m["default"].keyboardShortcutsUrlWin
                if (s.coalesce([new c.MenuItem({
                        label: _(n.localize(144, null)), click: function () {
                            return t.windowsService.sendToFocused("vscode:runAction", "workbench.action.showWelcomePage")
                        }
                    }), m["default"].documentationUrl ? new c.MenuItem({
                        label: _(n.localize(145, null)),
                        click: function () {
                            return t.windowsService.sendToFocused("vscode:runAction", "workbench.action.openDocumentationUrl")
                        }
                    }) : null, m["default"].releaseNotesUrl ? new c.MenuItem({
                        label: _(n.localize(146, null)),
                        click: function () {
                            return t.windowsService.sendToFocused("vscode:runAction", "update.showCurrentReleaseNotes")
                        }
                    }) : null, S(), l ? new c.MenuItem({
                        label: _(n.localize(147, null)), click: function () {
                            return t.windowsService.sendToFocused("vscode:runAction", "workbench.action.keybindingsReference")
                        }
                    }) : null, m["default"].introductoryVideosUrl ? new c.MenuItem({
                        label: _(n.localize(148, null)),
                        click: function () {
                            return t.windowsService.sendToFocused("vscode:runAction", "workbench.action.openIntroductoryVideosUrl")
                        }
                    }) : null, m["default"].introductoryVideosUrl || l ? S() : null, m["default"].twitterUrl ? new c.MenuItem({
                        label: _(n.localize(149, null)),
                        click: function () {
                            return t.openUrl(m["default"].twitterUrl, "openTwitterUrl")
                        }
                    }) : null, m["default"].requestFeatureUrl ? new c.MenuItem({
                        label: _(n.localize(150, null)),
                        click: function () {
                            return t.openUrl(m["default"].requestFeatureUrl, "openUserVoiceUrl")
                        }
                    }) : null, a, m["default"].twitterUrl || m["default"].requestFeatureUrl || m["default"].reportIssueUrl ? S() : null, m["default"].licenseUrl ? new c.MenuItem({
                        label: _(n.localize(151, null)), click: function () {
                            if (o.language) {
                                var e = m["default"].licenseUrl.indexOf("?") > 0 ? "&" : "?"
                                t.openUrl("" + m["default"].licenseUrl + e + "lang=" + o.language, "openLicenseUrl")
                            } else t.openUrl(m["default"].licenseUrl, "openLicenseUrl")
                        }
                    }) : null, m["default"].privacyStatementUrl ? new c.MenuItem({
                        label: _(n.localize(152, null)), click: function () {
                            if (o.language) {
                                var e = m["default"].licenseUrl.indexOf("?") > 0 ? "&" : "?"
                                t.openUrl("" + m["default"].privacyStatementUrl + e + "lang=" + o.language, "openPrivacyStatement")
                            } else t.openUrl(m["default"].privacyStatementUrl, "openPrivacyStatement")
                        }
                    }) : null, m["default"].licenseUrl || m["default"].privacyStatementUrl ? S() : null, r, o.isWindows && "stable" !== m["default"].quality ? i : null]).forEach(function (t) {
                        return e.append(t)
                    }), !o.isMacintosh) {
                    var f = this.getUpdateMenuItems()
                    f.length && (e.append(S()), f.forEach(function (t) {
                        return e.append(t)
                    })), e.append(S()), e.append(new c.MenuItem({
                        label: _(n.localize(153, null)), click: function () {
                            return t.openAboutDialog()
                        }
                    }))
                }
            }, e.prototype.getUpdateMenuItems = function () {
                var e = this
                switch (this.updateService.state) {
                    case v.State.Uninitialized:
                        return []
                    case v.State.UpdateDownloaded:
                        return [new c.MenuItem({
                            label: n.localize(154, null), click: function () {
                                e.reportMenuActionTelemetry("RestartToUpdate"), e.updateService.quitAndInstall()
                            }
                        })]
                    case v.State.CheckingForUpdate:
                        return [new c.MenuItem({label: n.localize(155, null), enabled: !1})]
                    case v.State.UpdateAvailable:
                        if (o.isLinux)return [new c.MenuItem({
                            label: n.localize(156, null), click: function () {
                                e.updateService.quitAndInstall()
                            }
                        })]
                        var t = o.isWindows ? n.localize(157, null) : n.localize(158, null)
                        return [new c.MenuItem({label: t, enabled: !1})]
                    default:
                        return [new c.MenuItem({
                            label: n.localize(159, null), click: function () {
                                return setTimeout(function () {
                                    e.reportMenuActionTelemetry("CheckForUpdate"), e.updateService.checkForUpdates(!0)
                                }, 0)
                            }
                        })]
                }
            }, e.prototype.createMenuItem = function (e, t, n, r) {
                var i, o = this, s = _(e), a = "function" == typeof t ? t : function (e, n, r) {
                        var i = t
                        Array.isArray(t) && (i = o.isOptionClick(r) ? t[1] : t[0]), o.windowsService.sendToFocused("vscode:runAction", i)
                    }, u = "boolean" == typeof n ? n : this.windowsService.getWindowCount() > 0,
                    l = "boolean" == typeof r && r
                "string" == typeof t && (i = t)
                var f = {label: s, click: a, enabled: u}
                return l && (f.type = "checkbox", f.checked = l), new c.MenuItem(this.withKeybinding(i, f))
            }, e.prototype.createDevToolsAwareMenuItem = function (e, t, n) {
                var r = this
                return new c.MenuItem(this.withKeybinding(t, {
                    label: _(e), enabled: this.windowsService.getWindowCount() > 0, click: function () {
                        var e = r.windowsService.getFocusedWindow()
                        e && (e.win.webContents.isDevToolsFocused() ? n(e.win.webContents.devToolsWebContents) : r.windowsService.sendToFocused("vscode:runAction", t))
                    }
                }))
            }, e.prototype.withKeybinding = function (e, t) {
                var n = this.keybindingsResolver.getKeybinding(e)
                if (n && n.label)if (n.isNative) t.accelerator = n.label
                else {
                    var r = t.label.indexOf("[")
                    t.label = r >= 0 ? t.label.substr(0, r) + " [" + n.label + "]" : t.label + " [" + n.label + "]"
                } else t.accelerator = void 0
                return t
            }, e.prototype.likeAction = function (e, t, n) {
                var r = this
                void 0 === n && (n = !t.accelerator), n && (t = this.withKeybinding(e, t))
                var i = t.click
                return t.click = function (t, n, o) {
                    r.reportMenuActionTelemetry(e), i && i(t, n, o)
                }, t
            }, e.prototype.openAboutDialog = function () {
                var e = this.windowsService.getFocusedWindow() || this.windowsService.getLastActiveWindow()
                c.dialog.showMessageBox(e && e.win, {
                    title: m["default"].nameLong,
                    type: "info",
                    message: m["default"].nameLong,
                    detail: n.localize(160, null, c.app.getVersion(), m["default"].commit || "Unknown", m["default"].date || "Unknown", process.versions.electron, process.versions.chrome, process.versions.node),
                    buttons: [n.localize(161, null)],
                    noLink: !0
                }, function (e) {
                    return null
                }), this.reportMenuActionTelemetry("showAboutDialog")
            }, e.prototype.openUrl = function (e, t) {
                c.shell.openExternal(e), this.reportMenuActionTelemetry(t)
            }, e.prototype.reportMenuActionTelemetry = function (e) {
                this.telemetryService.publicLog("workbenchActionExecuted", {id: e, from: "menu"})
            }, e
        }()
        P.MAX_MENU_RECENT_ENTRIES = 10, P = r([i(0, v.IUpdateService), i(1, y.IInstantiationService), i(2, f.IConfigurationService), i(3, l.IWindowsMainService), i(4, a.IEnvironmentService), i(5, h.ITelemetryService)], P), t.VSCodeMenu = P
    }), define(e[118], t([1, 0, 21, 4, 46, 19]), function (e, t, n, o, s, a) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var c = function (e) {
            return e.toJSON()
        }, u = function (e) {
            return a["default"].revive(e)
        }, l = function () {
            function e(e, t) {
                var n = this
                this.service = e, t.onWindowFocus(function (e) {
                    return n.focusedWindowId = e
                })
            }

            return e.prototype.call = function (e, t) {
                var r = this
                switch (e) {
                    case"event:onOpenURL":
                        return n.eventToCall(o.filterEvent(this.service.onOpenURL, function () {
                            return r.isWindowFocused(t)
                        }), c)
                }
            }, e.prototype.isWindowFocused = function (e) {
                return this.focusedWindowId === e
            }, e
        }()
        l = r([i(1, s.IWindowsService)], l), t.URLChannel = l
        var f = function () {
            function e(e, t) {
                this.channel = e, this.windowID = t, this._onOpenURL = n.eventFromCall(this.channel, "event:onOpenURL", this.windowID, u)
            }

            return Object.defineProperty(e.prototype, "onOpenURL", {
                get: function () {
                    return this._onOpenURL
                }, enumerable: !0, configurable: !0
            }), e.prototype.open = function (e) {
            }, e
        }()
        t.URLChannelClient = f
    }), define(e[119], t([1, 0, 4, 21]), function (e, t, n, r) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var i = function () {
            function e(e) {
                this.service = e, this.onWindowOpen = n.buffer(e.onWindowOpen, !0), this.onWindowFocus = n.buffer(e.onWindowFocus, !0)
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"event:onWindowOpen":
                        return r.eventToCall(this.onWindowOpen)
                    case"event:onWindowFocus":
                        return r.eventToCall(this.onWindowFocus)
                    case"openFileFolderPicker":
                        return this.service.openFileFolderPicker(t[0], t[1], t[2])
                    case"openFilePicker":
                        return this.service.openFilePicker(t[0], t[1], t[2], t[3])
                    case"openFolderPicker":
                        return this.service.openFolderPicker(t[0], t[1], t[2])
                    case"reloadWindow":
                        return this.service.reloadWindow(t)
                    case"openDevTools":
                        return this.service.openDevTools(t)
                    case"toggleDevTools":
                        return this.service.toggleDevTools(t)
                    case"closeFolder":
                        return this.service.closeFolder(t)
                    case"toggleFullScreen":
                        return this.service.toggleFullScreen(t)
                    case"setRepresentedFilename":
                        return this.service.setRepresentedFilename(t[0], t[1])
                    case"addToRecentlyOpen":
                        return this.service.addToRecentlyOpen(t)
                    case"removeFromRecentlyOpen":
                        return this.service.removeFromRecentlyOpen(t)
                    case"clearRecentPathsList":
                        return this.service.clearRecentPathsList()
                    case"getRecentlyOpen":
                        return this.service.getRecentlyOpen(t)
                    case"focusWindow":
                        return this.service.focusWindow(t)
                    case"isFocused":
                        return this.service.isFocused(t)
                    case"isMaximized":
                        return this.service.isMaximized(t)
                    case"maximizeWindow":
                        return this.service.maximizeWindow(t)
                    case"unmaximizeWindow":
                        return this.service.unmaximizeWindow(t)
                    case"setDocumentEdited":
                        return this.service.setDocumentEdited(t[0], t[1])
                    case"openWindow":
                        return this.service.openWindow(t[0], t[1])
                    case"openNewWindow":
                        return this.service.openNewWindow()
                    case"showWindow":
                        return this.service.showWindow(t)
                    case"getWindows":
                        return this.service.getWindows()
                    case"getWindowCount":
                        return this.service.getWindowCount()
                    case"relaunch":
                        return this.service.relaunch(t[0])
                    case"whenSharedProcessReady":
                        return this.service.whenSharedProcessReady()
                    case"toggleSharedProcess":
                        return this.service.toggleSharedProcess()
                    case"quit":
                        return this.service.quit()
                    case"log":
                        return this.service.log(t[0], t[1])
                    case"closeExtensionHostWindow":
                        return this.service.closeExtensionHostWindow(t)
                    case"showItemInFolder":
                        return this.service.showItemInFolder(t)
                    case"openExternal":
                        return this.service.openExternal(t)
                    case"startCrashReporter":
                        return this.service.startCrashReporter(t)
                }
            }, e
        }()
        t.WindowsChannel = i
        var o = function () {
            function e(e) {
                this.channel = e, this._onWindowOpen = r.eventFromCall(this.channel, "event:onWindowOpen"), this._onWindowFocus = r.eventFromCall(this.channel, "event:onWindowFocus")
            }

            return Object.defineProperty(e.prototype, "onWindowOpen", {
                get: function () {
                    return this._onWindowOpen
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onWindowFocus", {
                get: function () {
                    return this._onWindowFocus
                }, enumerable: !0, configurable: !0
            }), e.prototype.openFileFolderPicker = function (e, t, n) {
                return this.channel.call("openFileFolderPicker", [e, t, n])
            }, e.prototype.openFilePicker = function (e, t, n, r) {
                return this.channel.call("openFilePicker", [e, t, n, r])
            }, e.prototype.openFolderPicker = function (e, t, n) {
                return this.channel.call("openFolderPicker", [e, t, n])
            }, e.prototype.reloadWindow = function (e) {
                return this.channel.call("reloadWindow", e)
            }, e.prototype.openDevTools = function (e) {
                return this.channel.call("openDevTools", e)
            }, e.prototype.toggleDevTools = function (e) {
                return this.channel.call("toggleDevTools", e)
            }, e.prototype.closeFolder = function (e) {
                return this.channel.call("closeFolder", e)
            }, e.prototype.toggleFullScreen = function (e) {
                return this.channel.call("toggleFullScreen", e)
            }, e.prototype.setRepresentedFilename = function (e, t) {
                return this.channel.call("setRepresentedFilename", [e, t])
            }, e.prototype.addToRecentlyOpen = function (e) {
                return this.channel.call("addToRecentlyOpen", e)
            }, e.prototype.removeFromRecentlyOpen = function (e) {
                return this.channel.call("removeFromRecentlyOpen", e)
            }, e.prototype.clearRecentPathsList = function () {
                return this.channel.call("clearRecentPathsList")
            }, e.prototype.getRecentlyOpen = function (e) {
                return this.channel.call("getRecentlyOpen", e)
            }, e.prototype.focusWindow = function (e) {
                return this.channel.call("focusWindow", e)
            }, e.prototype.isFocused = function (e) {
                return this.channel.call("isFocused", e)
            }, e.prototype.isMaximized = function (e) {
                return this.channel.call("isMaximized", e)
            }, e.prototype.maximizeWindow = function (e) {
                return this.channel.call("maximizeWindow", e)
            }, e.prototype.unmaximizeWindow = function (e) {
                return this.channel.call("unmaximizeWindow", e)
            }, e.prototype.setDocumentEdited = function (e, t) {
                return this.channel.call("setDocumentEdited", [e, t])
            }, e.prototype.quit = function () {
                return this.channel.call("quit")
            }, e.prototype.relaunch = function (e) {
                return this.channel.call("relaunch", [e])
            }, e.prototype.whenSharedProcessReady = function () {
                return this.channel.call("whenSharedProcessReady")
            }, e.prototype.toggleSharedProcess = function () {
                return this.channel.call("toggleSharedProcess")
            }, e.prototype.openWindow = function (e, t) {
                return this.channel.call("openWindow", [e, t])
            }, e.prototype.openNewWindow = function () {
                return this.channel.call("openNewWindow")
            }, e.prototype.showWindow = function (e) {
                return this.channel.call("showWindow", e)
            }, e.prototype.getWindows = function () {
                return this.channel.call("getWindows")
            }, e.prototype.getWindowCount = function () {
                return this.channel.call("getWindowCount")
            }, e.prototype.log = function (e) {
                for (var t = [], n = 1; n < arguments.length; n++)t[n - 1] = arguments[n]
                return this.channel.call("log", [e, t])
            }, e.prototype.closeExtensionHostWindow = function (e) {
                return this.channel.call("closeExtensionHostWindow", e)
            }, e.prototype.showItemInFolder = function (e) {
                return this.channel.call("showItemInFolder", e)
            }, e.prototype.openExternal = function (e) {
                return this.channel.call("openExternal", e)
            }, e.prototype.startCrashReporter = function (e) {
                return this.channel.call("startCrashReporter", e)
            }, e
        }()
        t.WindowsChannelClient = o
    }), define(e[120], t([1, 0, 2, 9, 8, 19, 13, 10, 4, 29, 32, 24, 35, 31]), function (e, t, n, o, s, a, c, u, l, f, p, d, h, v) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var m = function () {
            function e(e, t, n, r, i) {
                this.sharedProcess = e, this.windowsMainService = t, this.environmentService = n, this.lifecycleService = i, this.disposables = [], this.onWindowOpen = f.fromEventEmitter(u.app, "browser-window-created", function (e, t) {
                    return t.id
                }), this.onWindowFocus = f.fromEventEmitter(u.app, "browser-window-focus", function (e, t) {
                    return t.id
                }), l.chain(r.onOpenURL).filter(function (e) {
                    return "file" === e.authority && !!e.path
                }).map(function (e) {
                    return a["default"].file(e.fsPath)
                }).on(this.openFileForURI, this, this.disposables)
            }

            return e.prototype.openFileFolderPicker = function (e, t, r) {
                return this.windowsMainService.openFileFolderPicker(t, r), n.TPromise.as(null)
            }, e.prototype.openFilePicker = function (e, t, r, i) {
                return this.windowsMainService.openFilePicker(t, r, void 0, i), n.TPromise.as(null)
            }, e.prototype.openFolderPicker = function (e, t, r) {
                var i = this.windowsMainService.getWindowById(e)
                return this.windowsMainService.openFolderPicker(t, i, r), n.TPromise.as(null)
            }, e.prototype.reloadWindow = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && this.windowsMainService.reload(t), n.TPromise.as(null)
            }, e.prototype.openDevTools = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.win.webContents.openDevTools(), n.TPromise.as(null)
            }, e.prototype.toggleDevTools = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                if (t) {
                    var r = t.win.webContents
                    !t.hasHiddenTitleBarStyle() || t.win.isFullScreen() || r.isDevToolsOpened() ? r.toggleDevTools() : r.openDevTools({mode: "undocked"})
                }
                return n.TPromise.as(null)
            }, e.prototype.closeFolder = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && this.windowsMainService.open({
                    context: d.OpenContext.API,
                    cli: this.environmentService.args,
                    forceEmpty: !0,
                    windowToUse: t,
                    forceReuseWindow: !0
                }), n.TPromise.as(null)
            }, e.prototype.toggleFullScreen = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.toggleFullScreen(), n.TPromise.as(null)
            }, e.prototype.setRepresentedFilename = function (e, t) {
                var r = this.windowsMainService.getWindowById(e)
                return r && r.win.setRepresentedFilename(t), n.TPromise.as(null)
            }, e.prototype.addToRecentlyOpen = function (e) {
                return this.windowsMainService.addToRecentPathsList(e), n.TPromise.as(null)
            }, e.prototype.removeFromRecentlyOpen = function (e) {
                return this.windowsMainService.removeFromRecentPathsList(e), n.TPromise.as(null)
            }, e.prototype.clearRecentPathsList = function () {
                return this.windowsMainService.clearRecentPathsList(), n.TPromise.as(null)
            }, e.prototype.getRecentlyOpen = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                if (t) {
                    var r = this.windowsMainService.getRecentPathsList(t.config.workspacePath, t.config.filesToOpen),
                        i = r.files, o = r.folders
                    return n.TPromise.as({files: i, folders: o})
                }
                return n.TPromise.as({files: [], folders: []})
            }, e.prototype.focusWindow = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.win.focus(), n.TPromise.as(null)
            }, e.prototype.isFocused = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t ? n.TPromise.as(t.win.isFocused()) : n.TPromise.as(null)
            }, e.prototype.isMaximized = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t ? n.TPromise.as(t.win.isMaximized()) : n.TPromise.as(null)
            }, e.prototype.maximizeWindow = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.win.maximize(), n.TPromise.as(null)
            }, e.prototype.unmaximizeWindow = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.win.unmaximize(), n.TPromise.as(null)
            }, e.prototype.setDocumentEdited = function (e, t) {
                var r = this.windowsMainService.getWindowById(e)
                return r && r.win.isDocumentEdited() !== t && r.win.setDocumentEdited(t), n.TPromise.as(null)
            }, e.prototype.openWindow = function (e, t) {
                return e && e.length ? (this.windowsMainService.open({
                    context: d.OpenContext.API,
                    cli: this.environmentService.args,
                    pathsToOpen: e,
                    forceNewWindow: t && t.forceNewWindow,
                    forceReuseWindow: t && t.forceReuseWindow
                }), n.TPromise.as(null)) : n.TPromise.as(null)
            }, e.prototype.openNewWindow = function () {
                return this.windowsMainService.openNewWindow(d.OpenContext.API), n.TPromise.as(null)
            }, e.prototype.showWindow = function (e) {
                var t = this.windowsMainService.getWindowById(e)
                return t && t.win.show(), n.TPromise.as(null)
            }, e.prototype.getWindows = function () {
                var e = this.windowsMainService.getWindows(), t = e.map(function (e) {
                    return {path: e.openedWorkspacePath, title: e.win.getTitle(), id: e.id}
                })
                return n.TPromise.as(t)
            }, e.prototype.getWindowCount = function () {
                return n.TPromise.as(this.windowsMainService.getWindows().length)
            }, e.prototype.log = function (e) {
                for (var t = [], r = 1; r < arguments.length; r++)t[r - 1] = arguments[r]
                return (i = console[e]).apply.apply(i, [console].concat(t)), n.TPromise.as(null)
                var i
            }, e.prototype.closeExtensionHostWindow = function (e) {
                var t = this.windowsMainService.findWindow(null, null, e)
                return t && t.win.close(), n.TPromise.as(null)
            }, e.prototype.showItemInFolder = function (e) {
                return u.shell.showItemInFolder(e), n.TPromise.as(null)
            }, e.prototype.openExternal = function (e) {
                return n.TPromise.as(u.shell.openExternal(e))
            }, e.prototype.startCrashReporter = function (e) {
                return u.crashReporter.start(e), n.TPromise.as(null)
            }, e.prototype.quit = function () {
                return this.windowsMainService.quit(), n.TPromise.as(null)
            }, e.prototype.relaunch = function (e) {
                return this.lifecycleService.relaunch(e), n.TPromise.as(null)
            }, e.prototype.whenSharedProcessReady = function () {
                return this.sharedProcess.whenReady()
            }, e.prototype.toggleSharedProcess = function () {
                return this.sharedProcess.toggle(), n.TPromise.as(null)
            }, e.prototype.openFileForURI = function (e) {
                var t = s.assign(Object.create(null), this.environmentService.args, {"goto": !0}), r = [e.fsPath]
                return this.windowsMainService.open({
                    context: d.OpenContext.API,
                    cli: t,
                    pathsToOpen: r
                }), n.TPromise.as(null)
            }, e.prototype.dispose = function () {
                this.disposables = o.dispose(this.disposables)
            }, e
        }()
        m = r([i(1, h.IWindowsMainService), i(2, c.IEnvironmentService), i(3, p.IURLService), i(4, v.ILifecycleService)], m), t.WindowsService = m
    }), define(e[61], t([1, 0, 19, 3, 18, 23, 5]), function (e, t, n, r, i, o, s) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0}), t.IWorkspaceContextService = r.createDecorator("contextService")
        var a = function () {
            function e(e) {
                this.workspace = e
            }

            return e.prototype.getWorkspace = function () {
                return this.workspace
            }, e.prototype.hasWorkspace = function () {
                return !!this.workspace
            }, e.prototype.isInsideWorkspace = function (e) {
                return !(!e || !this.workspace) && o.isEqualOrParent(e.fsPath, this.workspace.resource.fsPath, !s.isLinux)
            }, e.prototype.toWorkspaceRelativePath = function (e, t) {
                return this.isInsideWorkspace(e) ? i.normalize(i.relative(this.workspace.resource.fsPath, e.fsPath), t) : null
            }, e.prototype.toResource = function (e) {
                return "string" == typeof e && this.workspace ? n["default"].file(i.join(this.workspace.resource.fsPath, e)) : null
            }, e
        }()
        t.WorkspaceContextService = a
    }), define(e[122], t([1, 0, 6, 17, 11, 58, 61]), function (e, t, n, o, s, a, c) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var u = function () {
            function e(e, t, r) {
                var i = r.getWorkspace()
                this.globalStorage = e, this.workspaceStorage = t || e, this.workspaceKey = this.getWorkspaceKey(i)
                var o = i ? i.uid : void 0
                n.isNumber(o) && this.cleanupWorkspaceScope(o, i.name)
            }

            return e.prototype.getWorkspaceKey = function (t) {
                var n = null
                return t && t.resource && (n = t.resource.toString()), n ? this.calculateWorkspaceKey(n) : e.NO_WORKSPACE_IDENTIFIER
            }, e.prototype.calculateWorkspaceKey = function (e) {
                return 0 === e.indexOf("file:///") ? s.rtrim(e.substr("file:///".length), "/") + "/" : e
            }, e.prototype.cleanupWorkspaceScope = function (t, r) {
                var i = this, o = this.getInteger(e.WORKSPACE_IDENTIFIER, a.StorageScope.WORKSPACE)
                if (n.isNumber(o) && t !== o) {
                    for (var s = this.toStorageKey("", a.StorageScope.WORKSPACE), c = [], u = this.workspaceStorage.length, l = 0; l < u; l++) {
                        var f = this.workspaceStorage.key(l)
                        f.indexOf(e.WORKSPACE_PREFIX) < 0 || 0 === f.indexOf(s) && c.push(f)
                    }
                    c.length > 0 && console.warn("Clearing previous version of local storage for workspace ", r), c.forEach(function (e) {
                        i.workspaceStorage.removeItem(e)
                    })
                }
                t !== o && this.store(e.WORKSPACE_IDENTIFIER, t, a.StorageScope.WORKSPACE)
            }, e.prototype.clear = function () {
                this.globalStorage.clear(), this.workspaceStorage.clear()
            }, e.prototype.store = function (e, t, r) {
                void 0 === r && (r = a.StorageScope.GLOBAL)
                var i = r === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage
                if (n.isUndefinedOrNull(t))return void this.remove(e, r)
                var s = this.toStorageKey(e, r)
                try {
                    i.setItem(s, t)
                } catch (e) {
                    o.onUnexpectedError(e)
                }
            }, e.prototype.get = function (e, t, r) {
                void 0 === t && (t = a.StorageScope.GLOBAL)
                var i = t === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage,
                    o = i.getItem(this.toStorageKey(e, t))
                return n.isUndefinedOrNull(o) ? r : o
            }, e.prototype.remove = function (e, t) {
                void 0 === t && (t = a.StorageScope.GLOBAL)
                var n = t === a.StorageScope.GLOBAL ? this.globalStorage : this.workspaceStorage,
                    r = this.toStorageKey(e, t)
                n.removeItem(r)
            }, e.prototype.swap = function (e, t, r, i, o) {
                void 0 === i && (i = a.StorageScope.GLOBAL)
                var s = this.get(e, i)
                n.isUndefinedOrNull(s) && o ? this.store(e, o, i) : s === t.toString() ? this.store(e, r, i) : this.store(e, t, i)
            }, e.prototype.getInteger = function (e, t, r) {
                void 0 === t && (t = a.StorageScope.GLOBAL)
                var i = this.get(e, t, r)
                return n.isUndefinedOrNull(i) ? r : parseInt(i, 10)
            }, e.prototype.getBoolean = function (e, t, r) {
                void 0 === t && (t = a.StorageScope.GLOBAL)
                var i = this.get(e, t, r)
                return n.isUndefinedOrNull(i) ? r : n.isString(i) ? "true" === i.toLowerCase() : !!i
            }, e.prototype.toStorageKey = function (t, n) {
                return n === a.StorageScope.GLOBAL ? e.GLOBAL_PREFIX + t.toLowerCase() : e.WORKSPACE_PREFIX + this.workspaceKey + t.toLowerCase()
            }, e
        }()
        u.COMMON_PREFIX = "storage://", u.GLOBAL_PREFIX = u.COMMON_PREFIX + "global/", u.WORKSPACE_PREFIX = u.COMMON_PREFIX + "workspace/", u.WORKSPACE_IDENTIFIER = "workspaceIdentifier", u.NO_WORKSPACE_IDENTIFIER = "__$noWorkspace__", u = r([i(2, c.IWorkspaceContextService)], u), t.StorageService = u
        var l = function () {
            function e() {
                this.store = {}
            }

            return Object.defineProperty(e.prototype, "length", {
                get: function () {
                    return Object.keys(this.store).length
                }, enumerable: !0, configurable: !0
            }), e.prototype.key = function (e) {
                var t = Object.keys(this.store)
                return t.length > e ? t[e] : null
            }, e.prototype.clear = function () {
                this.store = {}
            }, e.prototype.setItem = function (e, t) {
                this.store[e] = t.toString()
            }, e.prototype.getItem = function (e) {
                var t = this.store[e]
                return n.isUndefinedOrNull(t) ? null : t
            }, e.prototype.removeItem = function (e) {
                delete this.store[e]
            }, e
        }()
        t.InMemoryLocalStorage = l, t.inMemoryLocalStorageInstance = new l
    }), define(e[62], t([1, 0, 2, 97, 18, 12, 88, 89, 58, 61, 122, 8]), function (e, t, n, r, i, o, s, a, c, u, l, f) {
        "use strict"
        function p(e) {
            var n = e.get(u.IWorkspaceContextService), r = e.get(c.IStorageService), i = e.get(o.IConfigurationService)
            w(i), i.onDidUpdateConfiguration(function (e) {
                return w(i)
            })
            var s = v(), a = s.showNewUserWatermark, l = s.openUntitledFile, f = s.enableWelcomePage,
                p = s.reorderQuickLinks, d = r.get("telemetry.firstSessionDate")
            return (!d || Date.now() - Date.parse(d) < 864e5) && !n.hasWorkspace() || (a = t.defaultExperiments.showNewUserWatermark, l = t.defaultExperiments.openUntitledFile), h({
                showNewUserWatermark: a,
                openUntitledFile: l,
                enableWelcomePage: f,
                reorderQuickLinks: p
            })
        }

        function d() {
            var e = y()
            return "enableWelcomePage" in e ? e.enableWelcomePage : v().enableWelcomePage
        }

        function h(e) {
            var t = y()
            return Object.keys(e).forEach(function (n) {
                n in t && (e[n] = t[n])
            }), e
        }

        function v() {
            var e = m(), t = g(e), n = t[0], r = t[1], i = g(n), o = i[0], s = i[1], a = g(o), c = a[0], u = a[1]
            return {showNewUserWatermark: r, openUntitledFile: s, enableWelcomePage: g(c)[1], reorderQuickLinks: u}
        }

        function m() {
            var e = l.StorageService.GLOBAL_PREFIX + "experiments.randomness", t = window.localStorage.getItem(e)
            return t || (t = Math.random().toString(), window.localStorage.setItem(e, t)), parseFloat(t)
        }

        function g(e) {
            var t = 2 * e, n = Math.floor(t)
            return [t - n, 1 === n]
        }

        function y() {
            var e = window.localStorage.getItem(T)
            return e ? JSON.parse(e) : {}
        }

        function w(e) {
            var t = y(), n = e.getConfiguration("telemetry"), r = n && n.experiments || {}
            f.equals(t, r) || window.localStorage.setItem(T, JSON.stringify(r))
        }

        function b() {
            for (var e = [], t = 0; t < arguments.length; t++)e[t] = arguments[t]
            return {
                log: function (t, n) {
                    return e.forEach(function (e) {
                        return e.log(t, n)
                    })
                }
            }
        }

        function S(e) {
            if (!e)return e
            for (var t = "", n = 0; n < e.length; n++) {
                var r = e[n]
                r >= "0" && r <= "9" ? t += "0" : t += r >= "a" && r <= "z" ? "a" : r >= "A" && r <= "Z" ? "A" : r
            }
            return t
        }

        function _(e) {
            var t = e && e.fsPath
            return t ? {mimeType: r.guessMimeTypes(t).join(", "), ext: i.extname(t), path: S(t)} : {}
        }

        function E(e, t) {
            return t.onDidUpdateConfiguration(function (t) {
                t.source !== o.ConfigurationSource.Default && (e.publicLog("updateConfiguration", {
                    configurationSource: o.ConfigurationSource[t.source],
                    configurationKeys: O(t.sourceConfig)
                }), e.publicLog("updateConfigurationValues", {
                    configurationSource: o.ConfigurationSource[t.source],
                    configurationValues: I(t.sourceConfig, M)
                }))
            })
        }

        function C(e, t) {
            return t.onShutdown(function (t) {
                e.publicLog("shutdown", {reason: a.ShutdownReason[t]})
            })
        }

        function P(e, t) {
            return t.onDidUpdateKeybindings(function (t) {
                t.source === s.KeybindingSource.User && t.keybindings && e.publicLog("updateKeybindings", {
                    bindings: t.keybindings.map(function (e) {
                        return {key: e.key, command: e.command, when: e.when, args: !!e.args || void 0}
                    })
                })
            })
        }

        function O(e) {
            if (!e)return []
            var t = []
            return k(t, "", e), t
        }

        function k(e, t, n) {
            n && "object" == typeof n && !Array.isArray(n) ? Object.keys(n).forEach(function (r) {
                return k(e, t ? t + "." + r : r, n[r])
            }) : e.push(t)
        }

        function I(e, t) {
            return e ? t.reduce(function (t, n) {
                var r = n.split(".").reduce(function (e, t) {
                    return e && "object" == typeof e ? e[t] : void 0
                }, e)
                return void 0 !== r && t.push((i = {}, i[n] = r, i)), t
                var i
            }, []) : []
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.defaultExperiments = {
            showNewUserWatermark: !1,
            openUntitledFile: !0,
            enableWelcomePage: !0,
            reorderQuickLinks: !1
        }, t.NullTelemetryService = {
            _serviceBrand: void 0,
            _experiments: t.defaultExperiments,
            publicLog: function (e, t) {
                return n.TPromise.as(null)
            },
            isOptedIn: !0,
            getTelemetryInfo: function () {
                return n.TPromise.as({
                    instanceId: "someValue.instanceId",
                    sessionId: "someValue.sessionId",
                    machineId: "someValue.machineId"
                })
            },
            getExperiments: function () {
                return this._experiments
            }
        }, t.loadExperiments = p, t.isWelcomePageEnabled = d
        var T = l.StorageService.GLOBAL_PREFIX + "experiments.overrides"
        t.combinedAppender = b, t.NullAppender = {
            log: function () {
                return null
            }
        }, t.anonymize = S, t.telemetryURIDescriptor = _
        var M = ["window.zoomLevel", "editor.fontSize", "editor.fontFamily", "editor.tabSize", "files.autoSave", "files.hotExit", "typescript.check.tscVersion", "editor.renderWhitespace", "editor.cursorBlinking", "editor.cursorStyle", "files.associations", "workbench.statusBar.visible", "editor.wordWrap", "editor.wordWrapColumn", "editor.insertSpaces", "editor.renderIndentGuides", "files.trimTrailingWhitespace", "git.confirmSync", "editor.rulers", "workbench.sideBar.location", "editor.fontLigatures", "editor.wordWrap", "editor.lineHeight", "editor.detectIndentation", "editor.formatOnType", "editor.formatOnSave", "editor.formatOnPaste", "editor.dragAndDrop", "window.openFilesInNewWindow", "javascript.validate.enable", "editor.mouseWheelZoom", "editor.fontWeight", "editor.scrollBeyondLastLine", "editor.lineNumbers", "editor.wrappingIndent", "editor.renderControlCharacters", "editor.autoClosingBrackets", "window.reopenFolders", "extensions.autoUpdate", "editor.tabCompletion", "files.eol", "explorer.openEditors.visible", "workbench.editor.enablePreview", "files.autoSaveDelay", "editor.roundedSelection", "editor.quickSuggestions", "editor.acceptSuggestionOnEnter", "editor.acceptSuggestionOnCommitCharacter", "workbench.editor.showTabs", "files.encoding", "files.autoGuessEncoding", "editor.quickSuggestionsDelay", "editor.snippetSuggestions", "editor.selectionHighlight", "editor.occurrencesHighlight", "editor.glyphMargin", "editor.wordSeparators", "editor.mouseWheelScrollSensitivity", "editor.suggestOnTriggerCharacters", "git.enabled", "http.proxyStrictSSL", "terminal.integrated.fontFamily", "editor.overviewRulerLanes", "editor.overviewRulerBorder", "editor.wordBasedSuggestions", "editor.hideCursorInOverviewRuler", "editor.trimAutoWhitespace", "editor.folding", "editor.matchBrackets", "workbench.editor.enablePreviewFromQuickOpen", "workbench.editor.swipeToNavigate", "php.builtInCompletions.enable", "php.validate.enable", "php.validate.run", "editor.parameterHints", "workbench.welcome.enabled"]
        t.configurationTelemetry = E, t.lifecycleTelemetry = C, t.keybindingsTelemetry = P
    }), define(e[124], t([1, 0, 71, 11, 62, 3, 12, 33, 2, 9, 8, 22]), function (e, t, n, o, s, a, c, u, l, f, p, d) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var h = function () {
            function e(e, t) {
                this._configurationService = t, this._disposables = [], this._cleanupPatterns = [], this._appender = e.appender, this._commonProperties = e.commonProperties || l.TPromise.as({}), this._piiPaths = e.piiPaths || [], this._userOptIn = void 0 === e.userOptIn || e.userOptIn, this._experiments = e.experiments || s.defaultExperiments, this._cleanupPatterns.push([/file:\/\/\/.*?\/resources\/app\//gi, ""], [/file:\/\/\/.*/gi, ""], [/ENOENT: no such file or directory.*?\'([^\']+)\'/gi, "ENOENT: no such file or directory"])
                for (var n = 0, r = this._piiPaths; n < r.length; n++) {
                    var i = r[n]
                    this._cleanupPatterns.push([new RegExp(o.escapeRegExpCharacters(i), "gi"), ""])
                }
                this._configurationService && (this._updateUserOptIn(), this._configurationService.onDidUpdateConfiguration(this._updateUserOptIn, this, this._disposables), this.publicLog("optInStatus", {optIn: this._userOptIn}))
            }

            return e.prototype._updateUserOptIn = function () {
                var e = this._configurationService.getConfiguration(v)
                this._userOptIn = e ? e.enableTelemetry : this._userOptIn
            }, Object.defineProperty(e.prototype, "isOptedIn", {
                get: function () {
                    return this._userOptIn
                }, enumerable: !0, configurable: !0
            }), e.prototype.getExperiments = function () {
                return this._experiments
            }, e.prototype.getTelemetryInfo = function () {
                return this._commonProperties.then(function (e) {
                    return {
                        sessionId: e.sessionID,
                        instanceId: e["common.instanceId"],
                        machineId: e["common.machineId"]
                    }
                })
            }, e.prototype.dispose = function () {
                this._disposables = f.dispose(this._disposables)
            }, e.prototype.publicLog = function (e, t) {
                var n = this
                return this._userOptIn ? this._commonProperties.then(function (r) {
                    t = p.mixin(t, r), t = p.cloneAndChange(t, function (e) {
                        if ("string" == typeof e)return n._cleanupInfo(e)
                    }), n._appender.log(e, t)
                }, function (e) {
                    console.error(e)
                }) : l.TPromise.as(void 0)
            }, e.prototype._cleanupInfo = function (e) {
                for (var t = 0, n = this._cleanupPatterns; t < n.length; t++) {
                    var r = n[t], i = r[0], o = r[1]
                    e = e.replace(i, o)
                }
                return e
            }, e
        }()
        h.IDLE_START_EVENT_NAME = "UserIdleStart", h.IDLE_STOP_EVENT_NAME = "UserIdleStop", h = r([i(1, a.optional(c.IConfigurationService))], h), t.TelemetryService = h
        var v = "telemetry"
        d.Registry.as(u.Extensions.Configuration).registerConfiguration({
            id: v,
            order: 110,
            type: "object",
            title: n.localize(0, null),
            properties: {
                "telemetry.enableTelemetry": {
                    type: "boolean",
                    description: n.localize(1, null),
                    "default": !0
                }
            }
        })
    }), define(e[125], t([1, 0, 3]), function (e, t, n) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        !function (e) {
            e[e.Head = 0] = "Head", e[e.RemoteHead = 1] = "RemoteHead", e[e.Tag = 2] = "Tag"
        }(t.RefType || (t.RefType = {}))
        !function (e) {
            e[e.INDEX = 0] = "INDEX", e[e.WORKING_TREE = 1] = "WORKING_TREE", e[e.MERGE = 2] = "MERGE"
        }(t.StatusType || (t.StatusType = {}))
        !function (e) {
            e[e.INDEX_MODIFIED = 0] = "INDEX_MODIFIED", e[e.INDEX_ADDED = 1] = "INDEX_ADDED", e[e.INDEX_DELETED = 2] = "INDEX_DELETED", e[e.INDEX_RENAMED = 3] = "INDEX_RENAMED", e[e.INDEX_COPIED = 4] = "INDEX_COPIED", e[e.MODIFIED = 5] = "MODIFIED", e[e.DELETED = 6] = "DELETED", e[e.UNTRACKED = 7] = "UNTRACKED", e[e.IGNORED = 8] = "IGNORED", e[e.ADDED_BY_US = 9] = "ADDED_BY_US", e[e.ADDED_BY_THEM = 10] = "ADDED_BY_THEM", e[e.DELETED_BY_US = 11] = "DELETED_BY_US", e[e.DELETED_BY_THEM = 12] = "DELETED_BY_THEM", e[e.BOTH_ADDED = 13] = "BOTH_ADDED", e[e.BOTH_DELETED = 14] = "BOTH_DELETED", e[e.BOTH_MODIFIED = 15] = "BOTH_MODIFIED"
        }(t.Status || (t.Status = {})), t.ModelEvents = {
            MODEL_UPDATED: "ModelUpdated",
            STATUS_MODEL_UPDATED: "StatusModelUpdated",
            HEAD_UPDATED: "HEADUpdated",
            REFS_UPDATED: "RefsUpdated",
            REMOTES_UPDATED: "RemotesUpdated"
        }
        !function (e) {
            e[e.NotInitialized = 0] = "NotInitialized", e[e.NotARepo = 1] = "NotARepo", e[e.NotAtRepoRoot = 2] = "NotAtRepoRoot", e[e.OK = 3] = "OK", e[e.Huge = 4] = "Huge", e[e.NoGit = 5] = "NoGit", e[e.Disabled = 6] = "Disabled", e[e.NotAWorkspace = 7] = "NotAWorkspace"
        }(t.ServiceState || (t.ServiceState = {}))
        !function (e) {
            e[e.OK = 0] = "OK", e[e.GitNotFound = 1] = "GitNotFound", e[e.Disabled = 2] = "Disabled"
        }(t.RawServiceState || (t.RawServiceState = {})), t.GitErrorCodes = {
            BadConfigFile: "BadConfigFile",
            AuthenticationFailed: "AuthenticationFailed",
            NoUserNameConfigured: "NoUserNameConfigured",
            NoUserEmailConfigured: "NoUserEmailConfigured",
            NoRemoteRepositorySpecified: "NoRemoteRepositorySpecified",
            NotAGitRepository: "NotAGitRepository",
            NotAtRepositoryRoot: "NotAtRepositoryRoot",
            Conflict: "Conflict",
            UnmergedChanges: "UnmergedChanges",
            PushRejected: "PushRejected",
            RemoteConnectionError: "RemoteConnectionError",
            DirtyWorkTree: "DirtyWorkTree",
            CantOpenResource: "CantOpenResource",
            GitNotFound: "GitNotFound",
            CantCreatePipe: "CantCreatePipe",
            CantAccessRemote: "CantAccessRemote",
            RepositoryNotFound: "RepositoryNotFound"
        }
        !function (e) {
            e[e.Disabled = 0] = "Disabled", e[e.Inactive = 1] = "Inactive", e[e.Active = 2] = "Active", e[e.Fetching = 3] = "Fetching"
        }(t.AutoFetcherState || (t.AutoFetcherState = {})), t.ServiceEvents = {
            STATE_CHANGED: "stateChanged",
            REPO_CHANGED: "repoChanged",
            OPERATION_START: "operationStart",
            OPERATION_END: "operationEnd",
            OPERATION: "operation",
            ERROR: "error",
            DISPOSE: "dispose"
        }, t.ServiceOperations = {
            STATUS: "status",
            INIT: "init",
            ADD: "add",
            STAGE: "stage",
            BRANCH: "branch",
            CHECKOUT: "checkout",
            CLEAN: "clean",
            UNDO: "undo",
            RESET: "reset",
            REVERT: "revert",
            COMMIT: "commit",
            COMMAND: "command",
            BACKGROUND_FETCH: "backgroundfetch",
            PULL: "pull",
            PUSH: "push",
            SYNC: "sync"
        }, t.GIT_SERVICE_ID = "gitService", t.IGitService = n.createDecorator(t.GIT_SERVICE_ID)
    }), define(e[126], t([1, 0, 2, 21, 125]), function (e, t, n, r, i) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var o = {
            to: function (e) {
                return [e.x, e.y, e.path, e.mimetype, e.rename]
            }, from: function (e) {
                return {x: e[0], y: e[1], path: e[2], mimetype: e[3], rename: e[4]}
            }
        }, s = {
            to: function (e) {
                return [e.name, e.commit, e.type, e.remote, e.upstream, e.ahead, e.behind]
            }, from: function (e) {
                return {name: e[0], commit: e[1], type: e[2], remote: e[3], upstream: e[4], ahead: e[5], behind: e[6]}
            }
        }, a = {
            to: function (e) {
                return [e.name, e.commit, e.type, e.remote]
            }, from: function (e) {
                return {name: e[0], commit: e[1], type: e[2], remote: e[3]}
            }
        }, c = {
            to: function (e) {
                return [e.name, e.url]
            }, from: function (e) {
                return {name: e[0], url: e[1]}
            }
        }, u = {
            to: function (e) {
                return e ? [e.repositoryRoot, e.state, e.status.map(o.to), s.to(e.HEAD), e.refs.map(a.to), e.remotes.map(c.to)] : null
            }, from: function (e) {
                return e ? {
                    repositoryRoot: e[0],
                    state: e[1],
                    status: e[2].map(o.from),
                    HEAD: s.from(e[3]),
                    refs: e[4].map(a.from),
                    remotes: e[5].map(c.from)
                } : null
            }
        }, l = function () {
            function e(e) {
                this.service = e
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"getVersion":
                        return this.service.then(function (e) {
                            return e.getVersion()
                        })
                    case"serviceState":
                        return this.service.then(function (e) {
                            return e.serviceState()
                        })
                    case"statusCount":
                        return this.service.then(function (e) {
                            return e.statusCount()
                        })
                    case"status":
                        return this.service.then(function (e) {
                            return e.status()
                        }).then(u.to)
                    case"init":
                        return this.service.then(function (e) {
                            return e.init()
                        }).then(u.to)
                    case"add":
                        return this.service.then(function (e) {
                            return e.add(t)
                        }).then(u.to)
                    case"stage":
                        return this.service.then(function (e) {
                            return e.stage(t[0], t[1])
                        }).then(u.to)
                    case"branch":
                        return this.service.then(function (e) {
                            return e.branch(t[0], t[1])
                        }).then(u.to)
                    case"checkout":
                        return this.service.then(function (e) {
                            return e.checkout(t[0], t[1])
                        }).then(u.to)
                    case"clean":
                        return this.service.then(function (e) {
                            return e.clean(t)
                        }).then(u.to)
                    case"undo":
                        return this.service.then(function (e) {
                            return e.undo()
                        }).then(u.to)
                    case"reset":
                        return this.service.then(function (e) {
                            return e.reset(t[0], t[1])
                        }).then(u.to)
                    case"revertFiles":
                        return this.service.then(function (e) {
                            return e.revertFiles(t[0], t[1])
                        }).then(u.to)
                    case"fetch":
                        return this.service.then(function (e) {
                            return e.fetch()
                        }).then(u.to)
                    case"pull":
                        return this.service.then(function (e) {
                            return e.pull(t)
                        }).then(u.to)
                    case"push":
                        return this.service.then(function (e) {
                            return e.push(t[0], t[1], t[2])
                        }).then(u.to)
                    case"sync":
                        return this.service.then(function (e) {
                            return e.sync()
                        }).then(u.to)
                    case"commit":
                        return this.service.then(function (e) {
                            return e.commit(t[0], t[1], t[2], t[3])
                        }).then(u.to)
                    case"detectMimetypes":
                        return this.service.then(function (e) {
                            return e.detectMimetypes(t[0], t[1])
                        })
                    case"show":
                        return this.service.then(function (e) {
                            return e.show(t[0], t[1])
                        })
                    case"clone":
                        return this.service.then(function (e) {
                            return e.clone(t[0], t[1])
                        })
                    case"onOutput":
                        return this.service.then(function (e) {
                            return r.eventToCall(e.onOutput)
                        })
                    case"getCommitTemplate":
                        return this.service.then(function (e) {
                            return e.getCommitTemplate()
                        })
                    case"getCommit":
                        return this.service.then(function (e) {
                            return e.getCommit(t)
                        })
                }
            }, e
        }()
        t.GitChannel = l
        var f = function () {
            function e() {
            }

            return e.prototype.call = function (e) {
                switch (e) {
                    case"serviceState":
                        return n.TPromise.as(i.RawServiceState.GitNotFound)
                    default:
                        return n.TPromise.as(null)
                }
            }, e
        }()
        t.UnavailableGitChannel = f
        var p = function () {
            function e(e) {
                this.channel = e, this._onOutput = r.eventFromCall(this.channel, "onOutput")
            }

            return Object.defineProperty(e.prototype, "onOutput", {
                get: function () {
                    return this._onOutput
                }, enumerable: !0, configurable: !0
            }), e.prototype.getVersion = function () {
                return this.channel.call("getVersion")
            }, e.prototype.serviceState = function () {
                return this.channel.call("serviceState")
            }, e.prototype.statusCount = function () {
                return this.channel.call("statusCount")
            }, e.prototype.status = function () {
                return this.channel.call("status").then(u.from)
            }, e.prototype.init = function () {
                return this.channel.call("init").then(u.from)
            }, e.prototype.add = function (e) {
                return this.channel.call("add", e).then(u.from)
            }, e.prototype.stage = function (e, t) {
                return this.channel.call("stage", [e, t]).then(u.from)
            }, e.prototype.branch = function (e, t) {
                return this.channel.call("branch", [e, t]).then(u.from)
            }, e.prototype.checkout = function (e, t) {
                return this.channel.call("checkout", [e, t]).then(u.from)
            }, e.prototype.clean = function (e) {
                return this.channel.call("clean", e).then(u.from)
            }, e.prototype.undo = function () {
                return this.channel.call("undo").then(u.from)
            }, e.prototype.reset = function (e, t) {
                return this.channel.call("reset", [e, t]).then(u.from)
            }, e.prototype.revertFiles = function (e, t) {
                return this.channel.call("revertFiles", [e, t]).then(u.from)
            }, e.prototype.fetch = function () {
                return this.channel.call("fetch").then(u.from)
            }, e.prototype.pull = function (e) {
                return this.channel.call("pull", e).then(u.from)
            }, e.prototype.push = function (e, t, n) {
                return this.channel.call("push", [e, t, n]).then(u.from)
            }, e.prototype.sync = function () {
                return this.channel.call("sync").then(u.from)
            }, e.prototype.commit = function (e, t, n, r) {
                return this.channel.call("commit", [e, t, n, r]).then(u.from)
            }, e.prototype.detectMimetypes = function (e, t) {
                return this.channel.call("detectMimetypes", [e, t])
            }, e.prototype.show = function (e, t) {
                return this.channel.call("show", [e, t])
            }, e.prototype.clone = function (e, t) {
                return this.channel.call("clone", [e, t])
            }, e.prototype.getCommitTemplate = function () {
                return this.channel.call("getCommitTemplate")
            }, e.prototype.getCommit = function (e) {
                return this.channel.call("getCommit", e)
            }, e
        }()
        t.GitChannelClient = p
        var d = function () {
            function e(e) {
                this.service = e
            }

            return e.prototype.call = function (e, t) {
                switch (e) {
                    case"askpass":
                        return this.service.askpass(t[0], t[1], t[2])
                }
            }, e
        }()
        t.AskpassChannel = d
        var h = function () {
            function e(e) {
                this.channel = e
            }

            return e.prototype.askpass = function (e, t, n) {
                return this.channel.call("askpass", [e, t, n])
            }, e
        }()
        t.AskpassChannelClient = h
    }), define(e[127], t([1, 0, 72, 10, 5, 2]), function (e, t, n, r, i, o) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var s = function () {
            function t() {
                var e = this
                this.askpassCache = Object.create(null), r.ipcMain.on("git:askpass", function (t, n) {
                    e.askpassCache[n.id].credentials = n.credentials
                })
            }

            return t.prototype.askpass = function (t, s, a) {
                var c = this
                return new o.TPromise(function (o, u) {
                    var l = c.askpassCache[t]
                    if (void 0 !== l)return o(l.credentials)
                    if ("fetch" === a)return o({username: "", password: ""})
                    var f = new r.BrowserWindow({
                        alwaysOnTop: !0,
                        skipTaskbar: !0,
                        resizable: !1,
                        width: 450,
                        height: i.isWindows ? 280 : 260,
                        show: !0,
                        title: n.localize(0, null)
                    })
                    f.setMenuBarVisibility(!1), c.askpassCache[t] = {
                        window: f,
                        credentials: null
                    }, f.loadURL(e.toUrl("vs/workbench/parts/git/electron-main/index.html")), f.webContents.executeJavaScript("init(" + JSON.stringify({
                            id: t,
                            host: s,
                            command: a
                        }) + ")"), f.once("closed", function () {
                        o(c.askpassCache[t].credentials), setTimeout(function () {
                            return delete c.askpassCache[t]
                        }, 1e4)
                    })
                })
            }, t
        }()
        t.GitAskpassService = s
    }), define(e[40], t([1, 0, 2, 6, 130, 134, 83, 28, 8, 131]), function (e, t, n, r, i, o, s, a, c, u) {
        "use strict"
        function l(e) {
            return "https:" === s.parse(e.url).protocol ? i.request : o.request
        }

        function f(e) {
            var t
            return new n.TPromise(function (n, i) {
                var o = s.parse(e.url), a = e.getRawRequest || l, p = a(e), d = {
                    hostname: o.hostname,
                    port: o.port ? parseInt(o.port) : "https:" === o.protocol ? 443 : 80,
                    protocol: o.protocol,
                    path: o.path,
                    method: e.type || "GET",
                    headers: e.headers,
                    agent: e.agent,
                    rejectUnauthorized: !r.isBoolean(e.strictSSL) || e.strictSSL
                }
                e.user && e.password && (d.auth = e.user + ":" + e.password), t = p(d, function (t) {
                    var o = r.isNumber(e.followRedirects) ? e.followRedirects : 3
                    if (t.statusCode >= 300 && t.statusCode < 400 && o > 0 && t.headers.location) f(c.assign({}, e, {
                        url: t.headers.location,
                        followRedirects: o - 1
                    })).done(n, i)
                    else {
                        var s = t
                        "gzip" === t.headers["content-encoding"] && (s = s.pipe(u.createGunzip())), n({
                            res: t,
                            stream: s
                        })
                    }
                }), t.on("error", i), e.timeout && t.setTimeout(e.timeout), e.data && t.write(e.data), t.end()
            }, function () {
                return t && t.abort()
            })
        }

        function p(e) {
            return e.res.statusCode >= 200 && e.res.statusCode < 300 || 1223 === e.res.statusCode
        }

        function d(e) {
            return 204 === e.res.statusCode
        }

        function h(e, t) {
            return new n.TPromise(function (n, r) {
                var i = a.createWriteStream(e)
                i.once("finish", function () {
                    return n(null)
                }), t.stream.once("error", r), t.stream.pipe(i)
            })
        }

        function v(e) {
            return new n.Promise(function (t, n) {
                if (!p(e))return n("Server returned " + e.res.statusCode)
                if (d(e))return t(null)
                var r = []
                e.stream.on("data", function (e) {
                    return r.push(e)
                }), e.stream.on("end", function () {
                    return t(r.join(""))
                }), e.stream.on("error", n)
            })
        }

        function m(e) {
            return new n.Promise(function (t, n) {
                if (!p(e))return n("Server returned " + e.res.statusCode)
                if (d(e))return t(null)
                if (!/application\/json/.test(e.res.headers["content-type"]))return n("Response doesn't appear to be JSON")
                var r = []
                e.stream.on("data", function (e) {
                    return r.push(e)
                }), e.stream.on("end", function () {
                    return t(JSON.parse(r.join("")))
                }), e.stream.on("error", n)
            })
        }

        Object.defineProperty(t, "__esModule", {value: !0}), t.request = f, t.download = h, t.asText = v, t.asJson = m
    }), define(e[115], t([1, 0, 8, 40, 82, 12]), function (e, t, n, o, s, a) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var c = function () {
            function e(e) {
                this.disposables = [], this.configure(e.getConfiguration()), e.onDidUpdateConfiguration(this.onDidUpdateConfiguration, this, this.disposables)
            }

            return e.prototype.onDidUpdateConfiguration = function (e) {
                this.configure(e.config)
            }, e.prototype.configure = function (e) {
                this.proxyUrl = e.http && e.http.proxy, this.strictSSL = e.http && e.http.proxyStrictSSL, this.authorization = e.http && e.http.proxyAuthorization
            }, e.prototype.request = function (e, t) {
                void 0 === t && (t = o.request)
                var r = this, i = r.proxyUrl, a = r.strictSSL
                return e.agent = e.agent || s.getProxyAgent(e.url, {
                        proxyUrl: i,
                        strictSSL: a
                    }), e.strictSSL = a, this.authorization && (e.headers = n.assign(e.headers || {}, {"Proxy-Authorization": this.authorization})), t(e)
            }, e
        }()
        c = r([i(0, a.IConfigurationService)], c), t.RequestService = c
    }), define(e[75], t([1, 0, 40, 115, 8, 10]), function (e, t, r, i, o, s) {
        "use strict"
        function a(e) {
            return s.net.request
        }

        Object.defineProperty(t, "__esModule", {value: !0})
        var c = function (e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }

            return n(t, e), t.prototype.request = function (t) {
                return e.prototype.request.call(this, t, function (e) {
                    return r.request(o.assign({}, e || {}, {getRawRequest: a}))
                })
            }, t
        }(i.RequestService)
        t.RequestService = c
    }), define(e[99], t([1, 0, 90, 6, 40, 39, 16]), function (e, t, o, s, a, c, u) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var l = function (e) {
            function t(t) {
                var n = e.call(this) || this
                return n.requestService = t, n.url = null, n.currentRequest = null, n
            }

            return n(t, e), t.prototype.setFeedURL = function (e) {
                this.url = e
            }, t.prototype.checkForUpdates = function () {
                var e = this
                if (!this.url)throw new Error("No feed url set.")
                this.currentRequest || (this.emit("checking-for-update"), this.currentRequest = this.requestService.request({url: this.url}).then(a.asJson).then(function (t) {
                    t && t.url && t.version && t.productVersion ? e.emit("update-available", null, u["default"].downloadUrl, t.productVersion) : e.emit("update-not-available")
                }).then(null, function (t) {
                    s.isString(t) && /^Server returned/.test(t) || (e.emit("update-not-available"), e.emit("error", t))
                }).then(function () {
                    return e.currentRequest = null
                }))
            }, t.prototype.quitAndInstall = function () {
            }, t
        }(o.EventEmitter)
        l = r([i(0, c.IRequestService)], l), t.LinuxAutoUpdaterImpl = l
    }), define(e[86], t([1, 0, 7, 51, 102, 90, 26, 109, 41, 6, 2, 40, 39, 16]), function (e, t, o, s, a, c, u, l, f, p, d, h, v, m) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var g = function (e) {
            function t(t) {
                var n = e.call(this) || this
                return n.requestService = t, n.url = null, n.currentRequest = null, n.updatePackagePath = null, n
            }

            return n(t, e), Object.defineProperty(t.prototype, "cachePath", {
                get: function () {
                    var e = o.join(u.tmpdir(), "vscode-update")
                    return new d.TPromise(function (t, n) {
                        return f.mkdirp(e, null, function (r) {
                            return r ? n(r) : t(e)
                        })
                    })
                }, enumerable: !0, configurable: !0
            }), t.prototype.setFeedURL = function (e) {
                this.url = e
            }, t.prototype.checkForUpdates = function () {
                var e = this
                if (!this.url)throw new Error("No feed url set.")
                this.currentRequest || (this.emit("checking-for-update"), this.currentRequest = this.requestService.request({url: this.url}).then(h.asJson).then(function (t) {
                    return t && t.url && t.version ? (e.emit("update-available"), e.cleanup(t.version).then(function () {
                        return e.getUpdatePackagePath(t.version).then(function (n) {
                            return s.exists(n).then(function (r) {
                                if (r)return d.TPromise.as(n)
                                var i = t.url, o = t.hash, c = n + ".tmp"
                                return e.requestService.request({url: i}).then(function (e) {
                                    return h.download(c, e)
                                }).then(o ? function () {
                                    return a.checksum(c, t.hash)
                                } : function () {
                                    return null
                                }).then(function () {
                                    return s.rename(c, n)
                                }).then(function () {
                                    return n
                                })
                            })
                        }).then(function (n) {
                            e.updatePackagePath = n, e.emit("update-downloaded", {}, t.releaseNotes, t.productVersion, new Date, e.url)
                        })
                    })) : (e.emit("update-not-available"), e.cleanup())
                }).then(null, function (t) {
                    p.isString(t) && /^Server returned/.test(t) || (e.emit("update-not-available"), e.emit("error", t))
                }).then(function () {
                    return e.currentRequest = null
                }))
            }, t.prototype.getUpdatePackagePath = function (e) {
                return this.cachePath.then(function (t) {
                    return o.join(t, "CodeSetup-" + m["default"].quality + "-" + e + ".exe")
                })
            }, t.prototype.cleanup = function (e) {
                void 0 === e && (e = null)
                var t = e ? function (t) {
                    return !new RegExp(m["default"].quality + "-" + e + "\\.exe$").test(t)
                } : function () {
                    return !0
                }
                return this.cachePath.then(function (e) {
                    return s.readdir(e).then(function (n) {
                        return d.Promise.join(n.filter(t).map(function (t) {
                            return s.unlink(o.join(e, t)).then(null, function () {
                                return null
                            })
                        }))
                    })
                })
            }, t.prototype.quitAndInstall = function () {
                this.updatePackagePath && l.spawn(this.updatePackagePath, ["/silent", "/mergetasks=runcode,!desktopicon,!quicklaunchicon"], {
                    detached: !0,
                    stdio: ["ignore", "ignore", "ignore"]
                })
            }, t
        }(c.EventEmitter)
        g = r([i(0, v.IRequestService)], g), t.Win32AutoUpdaterImpl = g
    }), define(e[77], t([1, 0, 38, 7, 10, 9, 4, 34, 43, 29, 12, 86, 99, 31, 39, 16, 2, 37, 36]), function (e, t, n, o, s, a, c, u, l, f, p, d, h, v, m, g, y, w, b) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var S = function () {
            function e(e, t, n, r) {
                if (this.lifecycleService = t, this.configurationService = n, this.telemetryService = r, this._state = w.State.Uninitialized, this._availableUpdate = null, this.throttler = new u.Throttler, this._onError = new c.Emitter, this._onCheckForUpdate = new c.Emitter, this._onUpdateAvailable = new c.Emitter, this._onUpdateNotAvailable = new c.Emitter, this._onUpdateReady = new c.Emitter, this._onStateChange = new c.Emitter, "win32" === process.platform) this.raw = new d.Win32AutoUpdaterImpl(e)
                else if ("linux" === process.platform) this.raw = new h.LinuxAutoUpdaterImpl(e)
                else {
                    if ("darwin" !== process.platform)return
                    this.raw = s.autoUpdater
                }
                var i = this.getUpdateChannel(), o = this.getUpdateFeedUrl(i)
                if (o) {
                    try {
                        this.raw.setFeedURL(o)
                    } catch (e) {
                        return
                    }
                    this.state = w.State.Idle, this.scheduleCheckForUpdates(3e4).done(null, function (e) {
                        return console.error(e)
                    })
                }
            }

            return Object.defineProperty(e.prototype, "onError", {
                get: function () {
                    return this._onError.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onCheckForUpdate", {
                get: function () {
                    return this._onCheckForUpdate.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateAvailable", {
                get: function () {
                    return this._onUpdateAvailable.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateNotAvailable", {
                get: function () {
                    return this._onUpdateNotAvailable.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onUpdateReady", {
                get: function () {
                    return this._onUpdateReady.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onStateChange", {
                get: function () {
                    return this._onStateChange.event
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onRawError", {
                get: function () {
                    return f.fromEventEmitter(this.raw, "error", function (e, t) {
                        return t
                    })
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onRawUpdateNotAvailable", {
                get: function () {
                    return f.fromEventEmitter(this.raw, "update-not-available")
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onRawUpdateAvailable", {
                get: function () {
                    return c.filterEvent(f.fromEventEmitter(this.raw, "update-available", function (e, t, n) {
                        return {url: t, version: n}
                    }), function (e) {
                        return !!e.url
                    })
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "onRawUpdateDownloaded", {
                get: function () {
                    return f.fromEventEmitter(this.raw, "update-downloaded", function (e, t, n, r, i) {
                        return {releaseNotes: t, version: n, date: r}
                    })
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "state", {
                get: function () {
                    return this._state
                }, set: function (e) {
                    this._state = e, this._onStateChange.fire(e)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "availableUpdate", {
                get: function () {
                    return this._availableUpdate
                }, enumerable: !0, configurable: !0
            }), e.prototype.scheduleCheckForUpdates = function (e) {
                var t = this
                return void 0 === e && (e = 36e5), y.TPromise.timeout(e).then(function () {
                    return t.checkForUpdates()
                }).then(function (e) {
                    return e ? y.TPromise.as(null) : t.scheduleCheckForUpdates(36e5)
                })
            }, e.prototype.checkForUpdates = function (e) {
                var t = this
                return void 0 === e && (e = !1), this.throttler.queue(function () {
                    return t._checkForUpdates(e)
                }).then(null, function (n) {
                    return e && t._onError.fire(n), null
                })
            }, e.prototype._checkForUpdates = function (e) {
                var t = this
                if (this.state !== w.State.Idle)return y.TPromise.as(null)
                this._onCheckForUpdate.fire(), this.state = w.State.CheckingForUpdate
                var n = [], r = new y.TPromise(function (e, r) {
                    c.once(t.onRawError)(r, null, n), c.once(t.onRawUpdateNotAvailable)(function () {
                        return e(null)
                    }, null, n), c.once(t.onRawUpdateAvailable)(function (t) {
                        var n = t.url, r = t.version
                        return n && e({url: n, version: r})
                    }, null, n), c.once(t.onRawUpdateDownloaded)(function (t) {
                        var n = t.version, r = t.date, i = t.releaseNotes
                        return e({version: n, date: r, releaseNotes: i})
                    }, null, n), t.raw.checkForUpdates()
                }).then(function (n) {
                    if (n)if (n.url) {
                        var r = {url: n.url, releaseNotes: "", version: n.version, date: new Date}
                        t._availableUpdate = r, t._onUpdateAvailable.fire({
                            url: n.url,
                            version: n.version
                        }), t.state = w.State.UpdateAvailable
                    } else {
                        var r = {releaseNotes: n.releaseNotes, version: n.version, date: n.date}
                        t._availableUpdate = r, t._onUpdateReady.fire(r), t.state = w.State.UpdateDownloaded, t.telemetryService.publicLog("update:downloaded", {version: n.version})
                    } else t._onUpdateNotAvailable.fire(e), t.state = w.State.Idle, t.telemetryService.publicLog("update:notAvailable", {explicit: e})
                    return n
                }, function (e) {
                    return t.state = w.State.Idle, y.TPromise.wrapError(e)
                })
                return u.always(r, function () {
                    return a.dispose(n)
                })
            }, e.prototype.getUpdateChannel = function () {
                var e = this.configurationService.getConfiguration("update")
                return "none" === (e && e.channel) ? null : g["default"].quality
            }, e.prototype.getUpdateFeedUrl = function (e) {
                if (!e)return null
                if ("win32" === process.platform && !n.existsSync(o.join(o.dirname(process.execPath), "unins000.exe")))return null
                if (!g["default"].updateUrl || !g["default"].commit)return null
                var t = "linux" === process.platform ? "linux-" + process.arch : process.platform
                return g["default"].updateUrl + "/api/update/" + t + "/" + e + "/" + g["default"].commit
            }, e.prototype.quitAndInstall = function () {
                var e = this
                return this._availableUpdate ? this._availableUpdate.url ? (s.shell.openExternal(this._availableUpdate.url), y.TPromise.as(null)) : (this.lifecycleService.quit(!0).done(function (t) {
                    t || ("darwin" === process.platform && s.session.defaultSession.flushStorageData(), e.raw.quitAndInstall())
                }), y.TPromise.as(null)) : y.TPromise.as(null)
            }, e
        }()
        r([l.memoize], S.prototype, "onRawError", null), r([l.memoize], S.prototype, "onRawUpdateNotAvailable", null), r([l.memoize], S.prototype, "onRawUpdateAvailable", null), r([l.memoize], S.prototype, "onRawUpdateDownloaded", null), S = r([i(0, m.IRequestService), i(1, v.ILifecycleService), i(2, p.IConfigurationService), i(3, b.ITelemetryService)], S), t.UpdateService = S
    }), define(e[80], t([1, 0, 10, 5, 24, 35, 46, 119, 120, 31, 117, 107, 37, 108, 77, 94, 54, 126, 127, 104, 60, 3, 44, 50, 25, 27, 42, 73, 13, 12, 32, 118, 36, 62, 105, 124, 106, 21, 16, 45, 9]), function (e, t, n, o, s, a, c, u, l, f, p, d, h, v, m, g, y, w, b, S, _, E, C, P, O, k, I, T, M, x, D, A, W, R, L, N, F, U, j, z, B) {
        "use strict"
        Object.defineProperty(t, "__esModule", {value: !0})
        var H = function () {
            function t(e, t, n, r, i, o, s, a) {
                this.mainIpcServer = e, this.userEnv = t, this.instantiationService = n, this.logService = r, this.environmentService = i, this.lifecycleService = o, this.configurationService = s, this.storageService = a, this.toDispose = [e, s], this.registerListeners()
            }

            return t.prototype.registerListeners = function () {
                var e = this
                process.on("uncaughtException", function (t) {
                    if (t) {
                        var n = {message: t.message, stack: t.stack}
                        e.windowsMainService && e.windowsMainService.sendToFocused("vscode:reportError", JSON.stringify(n))
                    }
                    console.error("[uncaught exception in main]: " + t), t.stack && console.error(t.stack)
                }), n.app.on("will-quit", function () {
                    e.logService.log("App#will-quit: disposing resources"), e.dispose()
                }), n.ipcMain.on("vscode:exit", function (t, n) {
                    e.logService.log("IPC#vscode:exit", n), e.dispose(), e.lifecycleService.kill(n)
                }), n.ipcMain.on(F.machineIdIpcChannel, function (t, n) {
                    e.logService.log("IPC#vscode-machineId"), e.storageService.setItem(F.machineIdStorageKey, n)
                }), n.ipcMain.on("vscode:fetchShellEnv", function (e, t) {
                    var r = n.BrowserWindow.fromId(t)
                    d.getShellEnvironment().then(function (e) {
                        r.webContents.send("vscode:acceptShellEnv", e)
                    }, function (e) {
                        r.webContents.send("vscode:acceptShellEnv", {}), console.error("Error fetching shell env", e)
                    })
                })
            }, t.prototype.startup = function () {
                var e = this
                this.logService.log("Starting VS Code in verbose mode"), this.logService.log("from: " + this.environmentService.appRoot), this.logService.log("args:", this.environmentService.args), o.isWindows && j["default"].win32AppUserModelId && n.app.setAppUserModelId(j["default"].win32AppUserModelId)
                var t = new b.GitAskpassService, r = new w.AskpassChannel(t)
                this.mainIpcServer.registerChannel("askpass", r), this.electronIpcServer = new g.Server, this.sharedProcess = new S.SharedProcess(this.environmentService, this.userEnv), this.toDispose.push(this.sharedProcess), this.sharedProcessClient = this.sharedProcess.whenReady().then(function () {
                    return y.connect(e.environmentService.sharedIPCHandle, "main")
                })
                var i = this.initServices()
                i.invokeFunction(function (t) {
                    return e.openFirstWindow(t)
                }), i.invokeFunction(function (t) {
                    return e.afterWindowOpen(t)
                })
            }, t.prototype.initServices = function () {
                var e = this, t = new C.ServiceCollection
                if (t.set(h.IUpdateService, new P.SyncDescriptor(m.UpdateService)), t.set(a.IWindowsMainService, new P.SyncDescriptor(a.WindowsManager)), t.set(c.IWindowsService, new P.SyncDescriptor(l.WindowsService, this.sharedProcess)), t.set(_.ILaunchService, new P.SyncDescriptor(_.LaunchService)), this.environmentService.isBuilt && !this.environmentService.isExtensionDevelopment && j["default"].enableTelemetry) {
                    var n = U.getDelayedChannel(this.sharedProcessClient.then(function (e) {
                            return e.getChannel("telemetryAppender")
                        })), r = new L.TelemetryAppenderClient(n),
                        i = F.resolveCommonProperties(j["default"].commit, z["default"].version).then(function (t) {
                            return Object.defineProperty(t, "common.machineId", {
                                get: function () {
                                    return e.storageService.getItem(F.machineIdStorageKey)
                                }, enumerable: !0
                            })
                        }), o = [this.environmentService.appRoot, this.environmentService.extensionsPath],
                        s = {appender: r, commonProperties: i, piiPaths: o}
                    t.set(W.ITelemetryService, new P.SyncDescriptor(N.TelemetryService, s))
                } else t.set(W.ITelemetryService, R.NullTelemetryService)
                return this.instantiationService.createChild(t)
            }, t.prototype.openFirstWindow = function (e) {
                var t = this, n = e.get(E.IInstantiationService)
                this.windowsMainService = e.get(a.IWindowsMainService), this.windowsMainService.onWindowClose(function () {
                    o.isMacintosh || 0 !== t.windowsMainService.getWindowCount() || t.sharedProcess.dispose()
                })
                var r = e.get(_.ILaunchService), i = new _.LaunchChannel(r)
                this.mainIpcServer.registerChannel("launch", i)
                var l = e.get(h.IUpdateService), f = new v.UpdateChannel(l)
                this.electronIpcServer.registerChannel("update", f)
                var p = e.get(D.IURLService), d = n.createInstance(A.URLChannel, p)
                this.electronIpcServer.registerChannel("url", d)
                var m = e.get(I.IBackupMainService), g = n.createInstance(T.BackupChannel, m)
                this.electronIpcServer.registerChannel("backup", g)
                var y = e.get(c.IWindowsService), w = new u.WindowsChannel(y)
                this.electronIpcServer.registerChannel("windows", w), this.sharedProcessClient.done(function (e) {
                    return e.registerChannel("windows", w)
                }), this.lifecycleService.ready(), this.windowsMainService.ready(this.userEnv)
                var b = this.environmentService.args,
                    S = process.env.VSCODE_CLI ? s.OpenContext.CLI : s.OpenContext.DESKTOP
                b["new-window"] && 0 === b._.length ? this.windowsMainService.open({
                    context: S,
                    cli: b,
                    forceNewWindow: !0,
                    forceEmpty: !0,
                    initialStartup: !0
                }) : !global.macOpenFiles || !global.macOpenFiles.length || b._ && b._.length ? this.windowsMainService.open({
                    context: S,
                    cli: b,
                    forceNewWindow: b["new-window"] || !b._.length && b["unity-launch"],
                    diffMode: b.diff,
                    initialStartup: !0
                }) : this.windowsMainService.open({
                    context: s.OpenContext.DOCK,
                    cli: b,
                    pathsToOpen: global.macOpenFiles,
                    initialStartup: !0
                })
            }, t.prototype.afterWindowOpen = function (t) {
                var n = this, r = t.get(E.IInstantiationService), i = null
                if (o.isWindows)try {
                    var s = e.__$__nodeRequire("windows-mutex").Mutex
                    i = new s(j["default"].win32MutexName), this.toDispose.push({
                        dispose: function () {
                            return i.release()
                        }
                    })
                } catch (e) {
                }
                r.createInstance(p.VSCodeMenu), this.windowsMainService.updateWindowsJumpList(), this.windowsMainService.onRecentPathsChange(function () {
                    return n.windowsMainService.updateWindowsJumpList()
                }), this.sharedProcess.spawn()
            }, t.prototype.dispose = function () {
                this.toDispose = B.dispose(this.toDispose)
            }, t
        }()
        H = r([i(2, E.IInstantiationService), i(3, O.ILogService), i(4, M.IEnvironmentService), i(5, f.ILifecycleService), i(6, x.IConfigurationService), i(7, k.IStorageService)], H), t.VSCodeApplication = H
    }), define(e[139], t([1, 0, 10, 8, 5, 52, 51, 55, 31, 54, 2, 60, 87, 44, 50, 25, 27, 42, 85, 13, 95, 12, 101, 39, 75, 32, 110, 38, 80]), function (e, t, n, r, i, o, s, a, c, u, l, f, p, d, h, v, m, g, y, w, b, S, _, E, C, P, O, k, I) {
        "use strict"
        function T(e) {
            var t = new d.ServiceCollection
            return t.set(w.IEnvironmentService, new h.SyncDescriptor(b.EnvironmentService, e, process.execPath)), t.set(v.ILogService, new h.SyncDescriptor(v.MainLogService)), t.set(c.ILifecycleService, new h.SyncDescriptor(c.LifecycleService)), t.set(m.IStorageService, new h.SyncDescriptor(m.StorageService)), t.set(S.IConfigurationService, new h.SyncDescriptor(_.ConfigurationService)), t.set(E.IRequestService, new h.SyncDescriptor(C.RequestService)), t.set(P.IURLService, new h.SyncDescriptor(O.URLService, e["open-url"])), t.set(g.IBackupMainService, new h.SyncDescriptor(y.BackupMainService)), new p.InstantiationService(t, !0)
        }

        function M(e) {
            var t = [e.appSettingsHome, e.extensionsPath, e.nodeCachedDataDir]
            return l.TPromise.join(t.map(function (e) {
                return e && s.mkdirp(e)
            }))
        }

        function x(t) {
            function r(t) {
                var n = l.TPromise.as(void 0)
                return i.isWindows && (n = t.getMainProcessId().then(function (t) {
                    s.log("Sending some foreground love to the running instance:", t)
                    try {
                        (0, e.__$__nodeRequire("windows-foreground-love").allowSetForegroundWindow)(t)
                    } catch (e) {
                    }
                })), n
            }

            function o(e) {
                return u.serve(a.mainIPCHandle).then(function (e) {
                    return i.isMacintosh && n.app.dock.show(), e
                }, function (t) {
                    return "EADDRINUSE" !== t.code ? l.TPromise.wrapError(t) : (i.isMacintosh && n.app.dock.hide(), u.connect(a.mainIPCHandle, "main").then(function (e) {
                        if (a.extensionTestsPath && !a.debugExtensionHost["break"]) {
                            var t = "Running extension tests from the command line is currently only supported if no other instance of Code is running."
                            return console.error(t), e.dispose(), l.TPromise.wrapError(t)
                        }
                        s.log("Sending env to running instance...")
                        var n = e.getChannel("launch"), i = new f.LaunchChannelClient(n)
                        return r(i).then(function () {
                            return i.start(a.args, process.env)
                        }).then(function () {
                            return e.dispose()
                        }).then(function () {
                            return l.TPromise.wrapError("Sent env to running instance. Terminating...")
                        })
                    }, function (t) {
                        if (!e || i.isWindows || "ECONNREFUSED" !== t.code)return l.TPromise.wrapError(t)
                        try {
                            k.unlinkSync(a.mainIPCHandle)
                        } catch (e) {
                            return s.log("Fatal error deleting obsolete instance handle", e), l.TPromise.wrapError(e)
                        }
                        return o(!1)
                    }))
                })
            }

            var s = t.get(v.ILogService), a = t.get(w.IEnvironmentService)
            return o(!0)
        }

        function D(e, t) {
            var n = e.get(v.ILogService), r = e.get(c.ILifecycleService), i = 0
            "string" == typeof t ? n.log(t) : t && (i = 1, t.stack ? console.error(t.stack) : console.error("Startup error: " + t.toString())), r.kill(i)
        }

        Object.defineProperty(t, "__esModule", {value: !0}), function () {
            var e
            try {
                e = o.parseMainProcessArgv(process.argv), e = a.validatePaths(e)
            } catch (e) {
                return console.error(e.message), void n.app.exit(1)
            }
            var t = T(e)
            t.invokeFunction(function (e) {
                var n = e.get(w.IEnvironmentService), i = {
                    VSCODE_PID: String(process.pid),
                    VSCODE_IPC_HOOK: n.mainIPCHandle,
                    VSCODE_NLS_CONFIG: process.env.VSCODE_NLS_CONFIG
                }
                return r.assign(process.env, i), t.invokeFunction(function (e) {
                    return M(e.get(w.IEnvironmentService))
                }).then(function () {
                    return t.invokeFunction(x)
                }).then(function (e) {
                    t.createInstance(I.VSCodeApplication, e, i).startup()
                })
            }).done(null, function (e) {
                return t.invokeFunction(D, e)
            })
        }()
    })
}).call(this)
