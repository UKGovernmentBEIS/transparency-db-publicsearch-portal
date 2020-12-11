!function() {
    "use strict";
    var n = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    (function o(e, t) {
        return e(t = {
            exports: {}
        }, t.exports),
        t.exports
    }
    )(function(e, t) {
        (function(e) {
            var t = "Window"in this;
            t || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && function(e) {
                e.constructor ? e.Window = e.constructor : (e.Window = e.constructor = new Function("return function Window() {}")()).prototype = this
            }(this)
        }
        ).call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof n && n || {}),
        function(e) {
            var t = "Document"in this;
            t || "undefined" == typeof WorkerGlobalScope && "function" != typeof importScripts && (this.HTMLDocument ? this.Document = this.HTMLDocument : (this.Document = this.HTMLDocument = document.constructor = new Function("return function Document() {}")(),
            this.Document.prototype = document))
        }
        .call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof n && n || {}),
        function(e) {
            var t = "Element"in this && "HTMLElement"in this;
            t || function() {
                if (!window.Element || window.HTMLElement) {
                    window.Element = window.HTMLElement = new Function("return function Element() {}")();
                    var e, t = document.appendChild(document.createElement("body")), n = t.appendChild(document.createElement("iframe")), o = n.contentWindow.document, u = Element.prototype = o.appendChild(o.createElement("*")), a = {}, l = function(e, t) {
                        var n, o, r, i = e.childNodes || [], c = -1;
                        if (1 === e.nodeType && e.constructor !== Element)
                            for (n in e.constructor = Element,
                            a)
                                o = a[n],
                                e[n] = o;
                        for (; r = t && i[++c]; )
                            l(r, t);
                        return e
                    }, s = document.getElementsByTagName("*"), r = document.createElement, i = 100;
                    u.attachEvent("onpropertychange", function(e) {
                        for (var t, n = e.propertyName, o = !a.hasOwnProperty(n), r = u[n], i = a[n], c = -1; t = s[++c]; )
                            1 === t.nodeType && (o || t[n] === i) && (t[n] = r);
                        a[n] = r
                    }),
                    u.constructor = Element,
                    u.hasAttribute || (u.hasAttribute = function(e) {
                        return null !== this.getAttribute(e)
                    }
                    ),
                    c() || (document.onreadystatechange = c,
                    e = setInterval(c, 25)),
                    document.createElement = function(e) {
                        var t = r(String(e).toLowerCase());
                        return l(t)
                    }
                    ,
                    document.removeChild(t)
                } else
                    window.HTMLElement = window.Element;
                function c() {
                    return i-- || clearTimeout(e),
                    !(!document.body || document.body.prototype || !/(complete|interactive)/.test(document.readyState) || (l(document, !0),
                    e && document.body.prototype && clearTimeout(e),
                    !document.body.prototype))
                }
            }()
        }
        .call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof n && n || {}),
        function(e) {
            var t = "defineProperty"in Object && function() {
                try {
                    return Object.defineProperty({}, "test", {
                        value: 42
                    }),
                    !0
                } catch (e) {
                    return !1
                }
            }();
            t || function(u) {
                var a = Object.prototype.hasOwnProperty("__defineGetter__")
                  , l = "Getters & setters cannot be defined on this javascript engine"
                  , s = "A property cannot both have accessors and be writable or have a value";
                Object.defineProperty = function(e, t, n) {
                    if (u && (e === window || e === document || e === Element.prototype || e instanceof Element))
                        return u(e, t, n);
                    if (null === e || !(e instanceof Object || "object" == typeof e))
                        throw new TypeError("Object.defineProperty called on non-object");
                    if (!(n instanceof Object))
                        throw new TypeError("Property description must be an object");
                    var o = String(t)
                      , r = "value"in n || "writable"in n
                      , i = "get"in n && typeof n.get
                      , c = "set"in n && typeof n.set;
                    if (i) {
                        if ("function" !== i)
                            throw new TypeError("Getter must be a function");
                        if (!a)
                            throw new TypeError(l);
                        if (r)
                            throw new TypeError(s);
                        Object.__defineGetter__.call(e, o, n.get)
                    } else
                        e[o] = n.value;
                    if (c) {
                        if ("function" !== c)
                            throw new TypeError("Setter must be a function");
                        if (!a)
                            throw new TypeError(l);
                        if (r)
                            throw new TypeError(s);
                        Object.__defineSetter__.call(e, o, n.set)
                    }
                    return "value"in n && (e[o] = n.value),
                    e
                }
            }(Object.defineProperty)
        }
        .call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof n && n || {}),
        function(i) {
            var e = function(e) {
                if (!("Event"in e))
                    return !1;
                if ("function" == typeof e.Event)
                    return !0;
                try {
                    return new Event("click"),
                    !0
                } catch (t) {
                    return !1
                }
            }(this);
            e || function() {
                var n = {
                    click: 1,
                    dblclick: 1,
                    keyup: 1,
                    keypress: 1,
                    keydown: 1,
                    mousedown: 1,
                    mouseup: 1,
                    mousemove: 1,
                    mouseover: 1,
                    mouseenter: 1,
                    mouseleave: 1,
                    mouseout: 1,
                    storage: 1,
                    storagecommit: 1,
                    textinput: 1
                };
                if ("undefined" != typeof document && "undefined" != typeof window) {
                    var e = window.Event && window.Event.prototype || null;
                    window.Event = Window.prototype.Event = function(e, t) {
                        if (!e)
                            throw new Error("Not enough arguments");
                        var n;
                        if ("createEvent"in document) {
                            n = document.createEvent("Event");
                            var o = !(!t || t.bubbles === i) && t.bubbles
                              , r = !(!t || t.cancelable === i) && t.cancelable;
                            return n.initEvent(e, o, r),
                            n
                        }
                        return (n = document.createEventObject()).type = e,
                        n.bubbles = !(!t || t.bubbles === i) && t.bubbles,
                        n.cancelable = !(!t || t.cancelable === i) && t.cancelable,
                        n
                    }
                    ,
                    e && Object.defineProperty(window.Event, "prototype", {
                        configurable: !1,
                        enumerable: !1,
                        writable: !0,
                        value: e
                    }),
                    "createEvent"in document || (window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function() {
                        var c = this
                          , e = arguments[0]
                          , t = arguments[1];
                        if (c === window && e in n)
                            throw new Error("In IE8 the event: " + e + " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");
                        c._events || (c._events = {}),
                        c._events[e] || (c._events[e] = function(e) {
                            var t, n = c._events[e.type].list, o = n.slice(), r = -1, i = o.length;
                            for (e.preventDefault = function() {
                                !1 !== e.cancelable && (e.returnValue = !1)
                            }
                            ,
                            e.stopPropagation = function() {
                                e.cancelBubble = !0
                            }
                            ,
                            e.stopImmediatePropagation = function() {
                                e.cancelBubble = !0,
                                e.cancelImmediate = !0
                            }
                            ,
                            e.currentTarget = c,
                            e.relatedTarget = e.fromElement || null,
                            e.target = e.target || e.srcElement || c,
                            e.timeStamp = (new Date).getTime(),
                            e.clientX && (e.pageX = e.clientX + document.documentElement.scrollLeft,
                            e.pageY = e.clientY + document.documentElement.scrollTop); ++r < i && !e.cancelImmediate; )
                                r in o && (t = o[r],
                                -1 !== u(n, t) && "function" == typeof t && t.call(c, e))
                        }
                        ,
                        c._events[e].list = [],
                        c.attachEvent && c.attachEvent("on" + e, c._events[e])),
                        c._events[e].list.push(t)
                    }
                    ,
                    window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function() {
                        var e, t = this, n = arguments[0], o = arguments[1];
                        t._events && t._events[n] && t._events[n].list && -1 !== (e = u(t._events[n].list, o)) && (t._events[n].list.splice(e, 1),
                        t._events[n].list.length || (t.detachEvent && t.detachEvent("on" + n, t._events[n]),
                        delete t._events[n]))
                    }
                    ,
                    window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function(e) {
                        if (!arguments.length)
                            throw new Error("Not enough arguments");
                        if (!e || "string" != typeof e.type)
                            throw new Error("DOM Events Exception 0");
                        var t = this
                          , n = e.type;
                        try {
                            if (!e.bubbles) {
                                e.cancelBubble = !0;
                                var o = function(e) {
                                    e.cancelBubble = !0,
                                    (t || window).detachEvent("on" + n, o)
                                };
                                this.attachEvent("on" + n, o)
                            }
                            this.fireEvent("on" + n, e)
                        } catch (r) {
                            for (e.target = t; "_events"in (e.currentTarget = t) && "function" == typeof t._events[n] && t._events[n].call(t, e),
                            "function" == typeof t["on" + n] && t["on" + n].call(t, e),
                            (t = 9 === t.nodeType ? t.parentWindow : t.parentNode) && !e.cancelBubble; )
                                ;
                        }
                        return !0
                    }
                    ,
                    document.attachEvent("onreadystatechange", function() {
                        "complete" === document.readyState && document.dispatchEvent(new Event("DOMContentLoaded",{
                            bubbles: !0
                        }))
                    }))
                }
                function u(e, t) {
                    for (var n = -1, o = e.length; ++n < o; )
                        if (n in e && e[n] === t)
                            return n;
                    return -1
                }
            }()
        }
        .call("object" == typeof window && window || "object" == typeof self && self || "object" == typeof n && n || {})
    });
    function e(e) {
        this.$module = e
    }
    e.prototype.init = function() {
        var e = this.$module;
        if (e) {
            var t = e.querySelector('form[action="/form-handler"]');
            this.preventFormSubmission(t)
        }
    }
    ,
    e.prototype.preventFormSubmission = function(e) {
        if (!e)
            return !1;
        e.addEventListener("submit", function(e) {
            e.preventDefault()
        })
    }
    ,
    new e(document).init()
}();
//# sourceMappingURL=example.js.map
