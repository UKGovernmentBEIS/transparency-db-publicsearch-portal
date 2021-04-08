function nodeListForEach(t, e) {
  if (window.NodeList.prototype.forEach) return t.forEach(e);
  for (var n = 0; n < t.length; n++) e.call(window, t[n], n, t);
}
this.Element &&
  (function (t) {
    t.matches =
      t.matches ||
      t.matchesSelector ||
      t.webkitMatchesSelector ||
      t.msMatchesSelector ||
      function (t) {
        for (
          var e = this,
            n = (e.parentNode || e.document).querySelectorAll(t),
            o = -1;
          n[++o] && n[o] != e;

        );
        return !!n[o];
      };
  })(Element.prototype),
  this.Element &&
    (function (t) {
      t.closest =
        t.closest ||
        function (t) {
          for (var e = this; e.matches && !e.matches(t); ) e = e.parentNode;
          return e.matches ? e : null;
        };
    })(Element.prototype),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (t, e) {
      for (var n = e || 0, o = this.length; n < o; n++)
        if (this[n] === t) return n;
      return -1;
    }),
  (function () {
    "use strict";
    window.GOVUK = window.GOVUK || {};
    var i = { essential: !0, usage: !1 },
      r = {
        cookies_policy: "essential",
        seen_cookie_message: "essential",
        cookie_preferences_set: "essential",
        cookies_preferences_set: "essential",
        "_email-alert-frontend_session": "essential",
        licensing_session: "essential",
        govuk_contact_referrer: "essential",
        multivariatetest_cohort_coronavirus_extremely_vulnerable_rate_limit:
          "essential",
        dgu_beta_banner_dismissed: "settings",
        global_bar_seen: "settings",
        govuk_browser_upgrade_dismisssed: "settings",
        govuk_not_first_visit: "settings",
        analytics_next_page_call: "usage",
        _ga: "usage",
        _gid: "usage",
        _gat: "usage",
        "JS-Detection": "usage",
        TLSversion: "usage",
      };
    (window.GOVUK.cookie = function (t, e, n) {
      return void 0 !== e
        ? !1 === e || null === e
          ? window.GOVUK.setCookie(t, "", { days: -1 })
          : (void 0 === n && (n = { days: 30 }),
            window.GOVUK.setCookie(t, e, n))
        : window.GOVUK.getCookie(t);
    }),
      (window.GOVUK.setDefaultConsentCookie = function () {
        window.GOVUK.setConsentCookie(i);
      }),
      (window.GOVUK.approveAllCookieTypes = function () {
        var t = { essential: !0, usage: !0 };
        window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
          days: 365,
        });
      }),
      (window.GOVUK.getConsentCookie = function () {
        var t,
          e = window.GOVUK.cookie("cookies_policy");
        if (!e) return null;
        try {
          t = JSON.parse(e);
        } catch (n) {
          return null;
        }
        return "object" != typeof t && null !== t && (t = JSON.parse(t)), t;
      }),
      (window.GOVUK.setConsentCookie = function (t) {
        var e = window.GOVUK.getConsentCookie();
        for (var n in (e || (e = JSON.parse(JSON.stringify(i))), t))
          if (((e[n] = t[n]), !t[n]))
            for (var o in r) r[o] === n && window.GOVUK.deleteCookie(o);
        window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
          days: 365,
        });
      }),
      (window.GOVUK.checkConsentCookieCategory = function (t, e) {
        var n = window.GOVUK.getConsentCookie();
        if (!n && r[t]) return !0;
        n = window.GOVUK.getConsentCookie();
        try {
          return n[e];
        } catch (o) {
          return console.error(o), !1;
        }
      }),
      (window.GOVUK.checkConsentCookie = function (t, e) {
        if ("cookies_policy" === t || null === e || !1 === e) return !0;
        if (t.match("^govuk_surveySeen") || t.match("^govuk_taken"))
          return window.GOVUK.checkConsentCookieCategory(t, "settings");
        if (r[t]) {
          var n = r[t];
          return window.GOVUK.checkConsentCookieCategory(t, n);
        }
        return !1;
      }),
      (window.GOVUK.setCookie = function (t, e, n) {
        if (window.GOVUK.checkConsentCookie(t, e)) {
          void 0 === n && (n = {});
          var o = t + "=" + e + "; path=/";
          if (n.days) {
            var i = new Date();
            i.setTime(i.getTime() + 24 * n.days * 60 * 60 * 1e3),
              (o = o + "; expires=" + i.toGMTString());
          }
          "https:" === document.location.protocol && (o += "; Secure"),
            (document.cookie = o);
        }
      }),
      (window.GOVUK.getCookie = function (t) {
        for (
          var e = t + "=", n = document.cookie.split(";"), o = 0, i = n.length;
          o < i;
          o++
        ) {
          for (var r = n[o]; " " === r.charAt(0); )
            r = r.substring(1, r.length);
          if (0 === r.indexOf(e))
            return decodeURIComponent(r.substring(e.length));
        }
        return null;
      }),
      (window.GOVUK.getCookieCategory = function (t) {
        return r[t];
      }),
      (window.GOVUK.deleteCookie = function (t) {
        window.GOVUK.cookie(t, null),
          window.GOVUK.cookie(t) &&
            ((document.cookie = t + "=;expires=" + new Date() + ";"),
            (document.cookie =
              t +
              "=;expires=" +
              new Date() +
              ";domain=" +
              window.location.hostname +
              ";path=/"));
      }),
      (window.GOVUK.deleteUnconsentedCookies = function () {
        var t = window.GOVUK.getConsentCookie();
        for (var e in t)
          if (!t[e])
            for (var n in r) r[n] === e && window.GOVUK.deleteCookie(n);
      });
  })(window),
  (function (t) {
    "use strict";
    (window.GOVUK = window.GOVUK || {}),
      (window.GOVUK.getCurrentLocation = function () {
        return t.location;
      });
  })(window),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? e()
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : e();
  })(0, function () {
    "use strict";
    (function () {
      var a, c, l, u;
      ("defineProperty" in Object &&
        (function () {
          try {
            var t = {};
            return Object.defineProperty(t, "test", { value: 42 }), !0;
          } catch (e) {
            return !1;
          }
        })()) ||
        ((a = Object.defineProperty),
        (c = Object.prototype.hasOwnProperty("__defineGetter__")),
        (l = "Getters & setters cannot be defined on this javascript engine"),
        (u =
          "A property cannot both have accessors and be writable or have a value"),
        (Object.defineProperty = function d(t, e, n) {
          if (
            a &&
            (t === window ||
              t === document ||
              t === Element.prototype ||
              t instanceof Element)
          )
            return a(t, e, n);
          if (null === t || !(t instanceof Object || "object" == typeof t))
            throw new TypeError("Object.defineProperty called on non-object");
          if (!(n instanceof Object))
            throw new TypeError("Property description must be an object");
          var o = String(e),
            i = "value" in n || "writable" in n,
            r = "get" in n && typeof n.get,
            s = "set" in n && typeof n.set;
          if (r) {
            if ("function" !== r)
              throw new TypeError("Getter must be a function");
            if (!c) throw new TypeError(l);
            if (i) throw new TypeError(u);
            Object.__defineGetter__.call(t, o, n.get);
          } else t[o] = n.value;
          if (s) {
            if ("function" !== s)
              throw new TypeError("Setter must be a function");
            if (!c) throw new TypeError(l);
            if (i) throw new TypeError(u);
            Object.__defineSetter__.call(t, o, n.set);
          }
          return "value" in n && (t[o] = n.value), t;
        }));
    }.call(
      ("object" == typeof window && window) ||
        ("object" == typeof self && self) ||
        ("object" == typeof global && global) ||
        {}
    ),
      function (p) {
        var t, e, n;
        ("DOMTokenList" in this &&
          (!("classList" in (t = document.createElement("x"))) ||
            (!t.classList.toggle("x", !1) && !t.className))) ||
          (("DOMTokenList" in (e = this) &&
            e.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS("http://www.w3.org/2000/svg", "svg") ||
              document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .classList instanceof DOMTokenList)) ||
            (e.DOMTokenList = (function () {
              var i = !0,
                n = function (t, e, n, o) {
                  Object.defineProperty
                    ? Object.defineProperty(t, e, {
                        configurable: !1 === i || !!o,
                        get: n,
                      })
                    : t.__defineGetter__(e, n);
                };
              try {
                n({}, "support");
              } catch (t) {
                i = !1;
              }
              return function (i, r) {
                var s = this,
                  a = [],
                  c = {},
                  l = 0,
                  t = 0,
                  e = function (t) {
                    n(
                      s,
                      t,
                      function () {
                        return d(), a[t];
                      },
                      !1
                    );
                  },
                  u = function () {
                    if (t <= l) for (; t < l; ++t) e(t);
                  },
                  d = function () {
                    var t,
                      e,
                      n = arguments,
                      o = /\s+/;
                    if (n.length)
                      for (e = 0; e < n.length; ++e)
                        if (o.test(n[e]))
                          throw (
                            (((t = new SyntaxError(
                              'String "' +
                                n[e] +
                                '" contains an invalid character'
                            )).code = 5),
                            (t.name = "InvalidCharacterError"),
                            t)
                          );
                    for (
                      "" ===
                        (a =
                          "object" == typeof i[r]
                            ? ("" + i[r].baseVal)
                                .replace(/^\s+|\s+$/g, "")
                                .split(o)
                            : ("" + i[r])
                                .replace(/^\s+|\s+$/g, "")
                                .split(o))[0] && (a = []),
                        c = {},
                        e = 0;
                      e < a.length;
                      ++e
                    )
                      c[a[e]] = !0;
                    (l = a.length), u();
                  };
                return (
                  d(),
                  n(s, "length", function () {
                    return d(), l;
                  }),
                  (s.toLocaleString = s.toString = function () {
                    return d(), a.join(" ");
                  }),
                  (s.item = function (t) {
                    return d(), a[t];
                  }),
                  (s.contains = function (t) {
                    return d(), !!c[t];
                  }),
                  (s.add = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e, n = 0, o = t.length; n < o; ++n)
                      (e = t[n]), c[e] || (a.push(e), (c[e] = !0));
                    l !== a.length &&
                      ((l = a.length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u());
                  }),
                  (s.remove = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                      (e[t[n]] = !0), delete c[t[n]];
                    for (n = 0; n < a.length; ++n) e[a[n]] || o.push(a[n]);
                    (l = (a = o).length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u();
                  }),
                  (s.toggle = function (t, e) {
                    return (
                      d.apply(s, [t]),
                      p !== e
                        ? e
                          ? (s.add(t), !0)
                          : (s.remove(t), !1)
                        : c[t]
                        ? (s.remove(t), !1)
                        : (s.add(t), !0)
                    );
                  }),
                  s
                );
              };
            })()),
          "classList" in (n = document.createElement("span")) &&
            (n.classList.toggle("x", !1),
            n.classList.contains("x") &&
              (n.classList.constructor.prototype.toggle = function i(t, e) {
                var n = e;
                if (n !== p) return this[(n = !!n) ? "add" : "remove"](t), n;
                var o = !this.contains(t);
                return this[o ? "add" : "remove"](t), o;
              })),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a", "b"), !t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.add;
              t.classList.constructor.prototype.add = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })(),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a"),
              t.classList.add("b"),
              t.classList.remove("a", "b"),
              t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.remove;
              t.classList.constructor.prototype.remove = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })());
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        var t;
        ("document" in this &&
          "classList" in document.documentElement &&
          "Element" in this &&
          "classList" in Element.prototype &&
          ((t = document.createElement("span")).classList.add("a", "b"),
          t.classList.contains("b"))) ||
          (function (t) {
            var u = !0,
              d = function (t, e, n, o) {
                Object.defineProperty
                  ? Object.defineProperty(t, e, {
                      configurable: !1 === u || !!o,
                      get: n,
                    })
                  : t.__defineGetter__(e, n);
              };
            try {
              d({}, "support");
            } catch (e) {
              u = !1;
            }
            var p = function (t, c, l) {
              d(
                t.prototype,
                c,
                function () {
                  var t,
                    e = this,
                    n = "__defineGetter__DEFINE_PROPERTY" + c;
                  if (e[n]) return t;
                  if (!(e[n] = !0) === u) {
                    for (
                      var o,
                        i = p.mirror || document.createElement("div"),
                        r = i.childNodes,
                        s = r.length,
                        a = 0;
                      a < s;
                      ++a
                    )
                      if (r[a]._R === e) {
                        o = r[a];
                        break;
                      }
                    o || (o = i.appendChild(document.createElement("div"))),
                      (t = DOMTokenList.call(o, e, l));
                  } else t = new DOMTokenList(e, l);
                  return (
                    d(e, c, function () {
                      return t;
                    }),
                    delete e[n],
                    t
                  );
                },
                !0
              );
            };
            p(t.Element, "classList", "className"),
              p(t.HTMLElement, "classList", "className"),
              p(t.HTMLLinkElement, "relList", "rel"),
              p(t.HTMLAnchorElement, "relList", "rel"),
              p(t.HTMLAreaElement, "relList", "rel");
          })(this);
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ));
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t, e) {
      for (var n in ((this.$module = t[0]),
      (this.options = {
        outOf: 65,
        applyOnInit: !0,
        autoOutdent: !1,
        outdentAll: !1,
        chartVisibleText: "Change to table and accessible view",
        tableVisibleText: "Change to chart view",
        chartAlertText: "Chart visible",
        tableAlertText: "Table visible",
        toggleAfter: !1,
        returnReference: !1,
      }),
      e))
        this.options[n] = e[n];
      this.detectIEVersion(),
        (this.ENABLED = !(this.ie && this.ie < 8)),
        (this.$table = t),
        (this.$graphContainer = document.createElement("div")),
        (this.$graphContainer.className = "mc-chart-container"),
        (this.$graph = document.createElement("div")),
        this.$graph.setAttribute("aria-hidden", "true"),
        this.$graph.setAttribute("class", this.$table.className),
        this.$graph.classList.add("mc-chart"),
        (this.chartId = this.getChartId(t)),
        (this.options.stacked = this.$table.classList.contains("mc-stacked")),
        (this.options.negative = this.$table.classList.contains("mc-negative"));
      var o =
        2 <
        this.$table.querySelectorAll("tbody tr")[0].querySelectorAll("th, td")
          .length;
      if (
        ((this.options.multiple =
          !this.options.stacked &&
          (this.$table.classList.contains("mc-multiple") || o)),
        (this.options.autoOutdent =
          this.options.autoOutdent ||
          this.$table.classList.contains("mc-auto-outdent")),
        (this.options.outdentAll =
          this.options.outdentAll ||
          this.$table.classList.contains("mc-outdented")),
        this.options.multiple && this.$graph.classList.add("mc-multiple"),
        (this.options.hasCaption = !!this.$table.querySelectorAll("caption")
          .length),
        this.ENABLED &&
          (this.apply(), this.options.applyOnInit || this.toggleLink.click()),
        this.options.returnReference)
      )
        return this;
    }),
      (e.prototype.detectIEVersion = function () {
        this.ie = (function () {
          for (
            var t,
              e = 3,
              n = document.createElement("div"),
              o = n.getElementsByTagName("i");
            (n.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->"),
              e < 10 && o[0];

          );
          return 4 < e ? e : t;
        })();
      }),
      (e.prototype.apply = function () {
        this.ENABLED &&
          (this.constructChart(),
          this.addClassesToHeader(),
          this.applyWidths(),
          this.insert(),
          this.$table.classList.add("mc-hidden"),
          this.applyOutdent());
      }),
      (e.prototype.construct = {}),
      (e.prototype.construct.thead = function () {
        var t = document.createElement("div");
        t.classList.add("mc-thead");
        var e = document.createElement("div");
        e.classList.add("mc-tr");
        for (
          var n = "", o = this.$table.querySelectorAll("thead th"), i = 0;
          i < o.length;
          i++
        )
          (n += '<div class="mc-th">'), (n += o[i].innerHTML), (n += "</div>");
        return (e.innerHTML = n), t.appendChild(e), t;
      }),
      (e.prototype.construct.tbody = function () {
        var t = document.createElement("div");
        t.classList.add("mc-tbody");
        for (
          var e = this.$table.querySelectorAll("tbody tr"), n = 0;
          n < e.length;
          n++
        ) {
          var o = document.createElement("div");
          o.classList.add("mc-tr");
          for (
            var i = "", r = e[n].querySelectorAll("th, td"), s = 0;
            s < r.length;
            s++
          )
            (i += '<div class="mc-td">'),
              (i += r[s].innerHTML),
              (i += "</div>");
          (o.innerHTML = i), t.appendChild(o);
        }
        return t;
      }),
      (e.prototype.construct.caption = function () {
        return this.$table.querySelector("caption").cloneNode(!0);
      }),
      (e.prototype.construct.toggleLink = function (t) {
        var e = document.createElement("button"),
          n = document.createElement("span"),
          o = document.createElement("span");
        return (
          n.classList.add("mc-toggle-text"),
          (n.innerHTML = t),
          o.classList.add("govuk-visually-hidden", "mc-toggle-status"),
          o.setAttribute("role", "alert"),
          e.classList.add("mc-toggle-button"),
          e.appendChild(n),
          e.appendChild(o),
          e
        );
      }),
      (e.prototype.addToggleClick = function (o, i, r, s) {
        var a = this;
        this.toggleLink.addEventListener("click", function (t) {
          t.preventDefault();
          var e = a.toggleLink.querySelector(".mc-toggle-text"),
            n = a.toggleLink.querySelector(".mc-toggle-status");
          a.$graphContainer.classList.toggle("mc-hidden"),
            a.$table.classList.toggle("mc-hidden"),
            (e.innerHTML = e.innerHTML === i ? o : i),
            (n.innerHTML = n.innerHTML === s ? r : s);
        });
      }),
      (e.prototype.constructChart = function () {
        var t = this.construct.thead.call(this),
          e = this.construct.tbody.call(this);
        if (
          ((this.toggleLink = this.construct.toggleLink(
            this.options.chartVisibleText
          )),
          this.addToggleClick(
            this.options.chartVisibleText,
            this.options.tableVisibleText,
            this.options.chartAlertText,
            this.options.tableAlertText
          ),
          this.options.hasCaption)
        ) {
          var n = this.construct.caption.call(this);
          this.$graph.appendChild(n);
        }
        this.options.toggleAfter
          ? this.$table.insertAdjacentElement("afterend", this.toggleLink)
          : this.$table.insertAdjacentElement("beforebegin", this.toggleLink),
          this.$graph.appendChild(t),
          this.$graph.appendChild(e);
      }),
      (e.prototype.utils = {
        isFloat: function (t) {
          return !isNaN(parseFloat(t));
        },
        stripValue: function (t) {
          return t.replace(/,|\xa3|%|[a-z]/gi, "");
        },
        returnMax: function (t) {
          for (var e = 0, n = 0; n < t.length; n++) t[n] > e && (e = t[n]);
          return e;
        },
        isNegative: function (t) {
          return t < 0;
        },
      }),
      (e.prototype.addClassesToHeader = function () {
        var t = this.$graph.querySelectorAll(".mc-th"),
          e = t.length;
        this.options.stacked &&
          (t[e - 1].classList.add("mc-stacked-header", "mc-header-total"),
          (e -= 1));
        for (var n = 1; n < e; n++)
          t[n].classList.add("mc-key-header"),
            t[n].classList.contains("mc-stacked-header") ||
              t[n].classList.add("mc-key-" + n);
      }),
      (e.prototype.calculateMaxWidth = function () {
        for (
          var t = [], e = 0, n = this.$graph.querySelectorAll(".mc-tr"), o = 0;
          o < n.length;
          o++
        ) {
          for (
            var i = n[o], r = i.querySelectorAll(".mc-td"), s = [], a = 1;
            a < r.length;
            a++
          )
            s.push(r[a]);
          var c = s.length;
          if (c) {
            this.options.stacked &&
              (s[c - 1].classList.add("mc-stacked-total"), (c -= 1));
            var l = i.querySelector(".mc-td");
            l && l.classList.add("mc-key-cell");
            for (var u = 0, d = 0; d < c; d++) {
              var p = s[d];
              p.classList.add("mc-bar-cell"),
                p.classList.add("mc-bar-" + (d + 1));
              var h = this.utils.stripValue(p.innerText);
              if (this.utils.isFloat(h)) {
                var f = parseFloat(h, 10),
                  m = Math.abs(f);
                0 === f && p.classList.add("mc-bar-zero"),
                  this.options.negative &&
                    (this.utils.isNegative(f)
                      ? (p.classList.add("mc-bar-negative"), e < m && (e = m))
                      : p.classList.add("mc-bar-positive")),
                  (f = m),
                  this.options.stacked ? (u += f) : ((u = f), t.push(f));
              }
            }
          }
          this.options.stacked && t.push(u);
        }
        var v = {};
        return (
          (v.max = parseFloat(this.utils.returnMax(t), 10)),
          (v.single = parseFloat(this.options.outOf / v.max, 10)),
          this.options.negative &&
            ((v.marginLeft = parseFloat(e, 10) * v.single),
            (v.maxNegative = parseFloat(e, 10))),
          v
        );
      }),
      (e.prototype.applyWidths = function () {
        this.dimensions = this.calculateMaxWidth();
        for (
          var t = this.$graph.querySelectorAll(".mc-tr"), e = 0;
          e < t.length;
          e++
        )
          for (
            var n = t[e].querySelectorAll(".mc-bar-cell"), o = 0;
            o < n.length;
            o++
          ) {
            var i = n[o],
              r = parseFloat(this.utils.stripValue(i.innerText), 10),
              s = r * this.dimensions.single,
              a = Math.abs(r),
              c = Math.abs(s);
            if (this.options.negative)
              if (i.classList.contains("mc-bar-positive"))
                i.style.marginLeft = this.dimensions.marginLeft + "%";
              else if (a < this.dimensions.maxNegative) {
                var l =
                  (this.dimensions.maxNegative - a) * this.dimensions.single;
                i.style.marginLeft = l + "%";
              }
            (i.innerHTML = "<span>" + i.innerHTML + "</span>"),
              (i.style.width = c + "%");
          }
      }),
      (e.prototype.insert = function () {
        var t = document.createElement("span"),
          e = "mc-chart-not-accessible-" + this.chartId;
        (t.innerHTML = "This content is not accessible - switch to table"),
          (t.className = "mc-hidden"),
          (t.id = e),
          this.$graphContainer.setAttribute("aria-labelledby", e),
          this.$graphContainer.appendChild(this.$graph),
          this.$graphContainer.appendChild(t),
          this.$table.insertAdjacentElement("afterend", this.$graphContainer);
      }),
      (e.prototype.applyOutdent = function () {
        for (
          var t = this.$graph.querySelectorAll(".mc-bar-cell"), e = 0;
          e < t.length;
          e++
        ) {
          var n = t[e],
            o = parseFloat(this.utils.stripValue(n.innerText), 10),
            i = n.querySelector("span"),
            r = n.querySelector("span").offsetWidth + 5,
            s = n.offsetWidth;
          this.options.stacked
            ? ((s < r && 0 < o) || o < 1) &&
              n.classList.add("mc-value-overflow")
            : (0 === o && n.classList.add("mc-bar-outdented"),
              (this.options.autoOutdent && s <= r) || this.options.outdentAll
                ? (n.classList.add("mc-bar-outdented"),
                  (i.style.marginLeft = "100%"),
                  (i.style.display = "inline-block"))
                : n.classList.add("mc-bar-indented"));
        }
      }),
      (e.prototype.getChartId = function (n) {
        var t = document.querySelectorAll("table.js-barchart-table"),
          o = null;
        return (
          t.forEach(function (t, e) {
            t === n && (o = e);
          }),
          o
        );
      }),
      (t.MagnaCharta = e);
  })(window.GOVUK.Modules),
  (window.GOVUK = window.GOVUK || {}),
  (function (s) {
    "use strict";
    var t = function (t) {
      this.$element = t;
    };
    (t.prototype.init = function () {
      for (
        var t = this.$element.querySelectorAll(".js-barchart-table"),
          e = [],
          n = 0;
        n < t.length;
        n++
      ) {
        var o = t[n].className;
        -1 === o.indexOf("mc-chart") &&
          -1 === o.indexOf("js-barchart-table-init") &&
          e.push(t[n]);
      }
      for (var i = 0; i < e.length; i++) {
        var r = e[i];
        new s.Modules.MagnaCharta().start(r, {
          toggleText: "Change between chart and table",
        }),
          (r.className = r.className + " js-barchart-table-init");
      }
    }),
      (s.GovspeakBarchartEnhancement = t);
  })(window.GOVUK, window.jQuery),
  (function () {
    "use strict";
    window.GOVUK = window.GOVUK || {};
    var t = window.GOVUK || {},
      c = function (t) {
        this.$element = t;
      };
    (c.prototype.init = function () {
      if (this.campaignCookiesAllowed()) {
        var t = this.$element.querySelectorAll(
          'a[href*="youtube.com"], a[href*="youtu.be"]'
        );
        0 < t.length && c.insertApiScript();
        for (var e = 0; e < t.length; ++e) {
          var n = t[e],
            o = n.getAttribute("href"),
            i = n.hasAttribute("data-youtube-player-analytics"),
            r = { link: n };
          if (
            (i &&
              (r.tracking = {
                hasTracking: i,
                category: n.getAttribute(
                  "data-youtube-player-analytics-category"
                ),
              }),
            0 <= o.indexOf("/live_stream"))
          ) {
            var s = c.parseLivestream(o);
            !this.hasDisabledEmbed(n) &&
              s &&
              ((r.channel = s), this.setupVideo(r));
          } else {
            var a = c.parseVideoId(o);
            !this.hasDisabledEmbed(n) &&
              a &&
              ((r.videoId = a), this.setupVideo(r));
          }
        }
      }
    }),
      (c.prototype.hasDisabledEmbed = function (t) {
        return "off" === t.getAttribute("data-youtube-player");
      }),
      (c.prototype.setupVideo = function (t) {
        var e = c.nextId(),
          n = t.link,
          o = t.videoId ? t.videoId : t.channel,
          i = n.parentNode,
          r = i.parentNode,
          s = document.createElement("div");
        (s.className += "gem-c-govspeak__youtube-video"),
          (s.innerHTML =
            '<span id="' + e + '" data-video-id="' + o + '"></span>'),
          (t.title = n.textContent),
          r.replaceChild(s, i),
          this.insertVideo(e, t);
      }),
      (c.prototype.insertVideo = function (t, r) {
        var e = "",
          n = "";
        r.channel ? ((e = r.channel), (n = "live_stream")) : (n = r.videoId);
        var o = function () {
          new window.YT.Player(t, {
            videoId: n,
            host: "https://www.youtube-nocookie.com",
            playerVars: {
              enablejsapi: 1,
              origin: window.location.origin,
              rel: 0,
              disablekb: 1,
              modestbranding: 1,
              channel: e,
            },
            events: {
              onReady: function (t) {
                var e = r.title;
                t.target.getIframe().title = e + " (video)";
              },
              onStateChange: function (t) {
                var e = t.data,
                  n = t.target,
                  o = {
                    "-1": "VideoUnstarted",
                    0: "VideoEnded",
                    1: "VideoPlaying",
                    2: "VideoPaused",
                    3: "VideoBuffering",
                    5: "VideoCued",
                  };
                if (
                  o[e] &&
                  r.tracking &&
                  r.tracking.hasTracking &&
                  window.GOVUK.analytics &&
                  window.GOVUK.analytics.trackEvent
                ) {
                  var i = {
                    category: r.tracking.category,
                    action: o[e],
                    label: {
                      transport: "beacon",
                      label: n.getVideoData && n.getVideoData().title,
                    },
                  };
                  window.GOVUK.analytics.trackEvent(
                    i.category,
                    i.action,
                    i.label
                  );
                }
              },
            },
          });
        };
        (o = o.bind(this)),
          c.playerApiReady ? o.call() : c.queuedInserts.push(o);
      }),
      (c.prototype.campaignCookiesAllowed = function () {
        var t = window.GOVUK.getConsentCookie();
        return null === t || t.campaigns;
      }),
      (c.nextId = function () {
        return (
          (this.embedCount = this.embedCount || 0),
          (this.embedCount += 1),
          "youtube-" + this.embedCount
        );
      }),
      (c.insertApiScript = function () {
        if (!this.apiScriptInserted) {
          var t = document.createElement("script");
          t.src = "https://www.youtube.com/player_api";
          var e = document.getElementsByTagName("script")[0];
          e.parentNode.insertBefore(t, e), (this.apiScriptInserted = !0);
        }
      }),
      (c.parseLivestream = function (t) {
        var e = t.match(/channel=([^&]*)/);
        if (e) return e[1];
      }),
      (c.parseVideoId = function (t) {
        var e;
        if (-1 < t.indexOf("youtube.com")) {
          var n = {};
          if (1 === (e = t.split("?")).length) return;
          e = e[1].split("&");
          for (var o = 0; o < e.length; o++) {
            var i = e[o].split("=");
            n[i[0]] = i[1];
          }
          return n.v;
        }
        if (-1 < t.indexOf("youtu.be")) return (e = t.split("/")).pop();
      }),
      (c.apiScriptInserted = !1),
      (c.playerApiReady = !1),
      (c.queuedInserts = []),
      (window.onYouTubePlayerAPIReady = function () {
        c.playerApiReady = !0;
        for (var t = 0; t < c.queuedInserts.length; t++)
          c.queuedInserts[t].call();
      }),
      (t.GovspeakYoutubeLinkEnhancement = c);
  })(),
  function () {
    "use strict";
    if (document.querySelectorAll && document.addEventListener) {
      var t,
        e,
        n = document.querySelectorAll(".js-header-toggle");
      for (t = 0, e = n.length; t < e; t++)
        n[t].addEventListener("click", function (t) {
          t.preventDefault();
          var e = this.getAttribute("href")
              ? document.getElementById(this.getAttribute("href").substr(1))
              : document.getElementById(
                  this.getAttribute("data-search-toggle-for")
                ),
            n = e.getAttribute("class") || "",
            o = this.getAttribute("class") || "",
            i = o.match("search-toggle"),
            r = this.getAttribute("data-show-text") || "Show search",
            s = this.getAttribute("data-hide-text") || "Hide search";
          -1 !== n.indexOf("js-visible")
            ? e.setAttribute("class", n.replace(/(^|\s)js-visible(\s|$)/, ""))
            : e.setAttribute("class", n + " js-visible"),
            -1 !== o.indexOf("js-visible")
              ? (this.setAttribute(
                  "class",
                  o.replace(/(^|\s)js-visible(\s|$)/, "")
                ),
                i && (this.innerText = r))
              : (this.setAttribute("class", o + " js-visible"),
                i && (this.innerText = s)),
            this.setAttribute(
              "aria-expanded",
              "true" !== this.getAttribute("aria-expanded")
            ),
            e.setAttribute(
              "aria-hidden",
              "false" === e.getAttribute("aria-hidden")
            );
        });
    }
  }.call(this),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]), this.$module.focus();
    }),
      (t.InitialFocus = e);
  })(window.GOVUK.Modules),
  (function (t) {
    "use strict";
    var o = t.jQuery,
      i = t.GOVUK || {},
      e = function (t, e) {
        (this.$el = o(t)),
          (this.$extraLinks = this.$el.find("li:not(" + e + ")")),
          1 < this.$extraLinks.length &&
            (this.addToggleLink(), this.hideExtraLinks());
      };
    (e.prototype = {
      toggleText: function () {
        return 1 < this.$extraLinks.length
          ? "+" + this.$extraLinks.length + " others"
          : "+" + this.$extraLinks.length + " other";
      },
      addToggleLink: function () {
        (this.$toggleLink = o('<a href="#">' + this.toggleText() + "</a>")),
          this.$toggleLink.click(o.proxy(this.toggleLinks, this)),
          this.$toggleLink.insertAfter(this.$el);
      },
      toggleLinks: function (t) {
        t.preventDefault(), this.$toggleLink.remove(), this.showExtraLinks();
      },
      hideExtraLinks: function () {
        this.$extraLinks.addClass("visuallyhidden"),
          o(window).trigger("govuk.pageSizeChanged");
      },
      showExtraLinks: function () {
        this.$extraLinks.removeClass("visuallyhidden"),
          o(window).trigger("govuk.pageSizeChanged");
      },
    }),
      (i.PrimaryList = e),
      (i.primaryLinks = {
        init: function (n) {
          o(n)
            .parent()
            .each(function (t, e) {
              new i.PrimaryList(e, n);
            });
        },
      }),
      (t.GOVUK = i);
  })(window),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.$module.trackChange = this.trackChange.bind(this)),
        (this.$module.fireTrackingChange = this.fireTrackingChange.bind(this)),
        this.$module.addEventListener("change", this.trackChange);
    }),
      (e.prototype.trackChange = function () {
        var t = this.options[this.selectedIndex];
        t.hasAttribute("data-track-category") &&
          t.hasAttribute("data-track-action") &&
          this.fireTrackingChange(t);
      }),
      (e.prototype.fireTrackingChange = function (t) {
        var e = { transport: "beacon" },
          n = t.getAttribute("data-track-category"),
          o = t.getAttribute("data-track-action"),
          i = t.getAttribute("data-track-label"),
          r = t.getAttribute("data-track-value"),
          s = t.getAttribute("data-track-dimension"),
          a = t.getAttribute("data-track-dimension-index"),
          c = t.getAttribute("data-track-options");
        if (
          (i && (e.label = i),
          r && (e.value = r),
          s && a && (e["dimension" + a] = s),
          c)
        )
          for (var l in (c = JSON.parse(c))) e[l] = c[l];
        window.GOVUK.analytics &&
          window.GOVUK.analytics.trackEvent &&
          window.GOVUK.analytics.trackEvent(n, o, e);
      }),
      (t.TrackSelectChange = e);
  })(window.GOVUK.Modules),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.toggleTarget = this.$module.querySelector(".js-class-toggle")),
        (this.$module.addFocusClass = this.addFocusClass.bind(this)),
        (this.$module.removeFocusClassFromEmptyInput = this.removeFocusClassFromEmptyInput.bind(
          this
        )),
        this.inputIsEmpty() || this.addFocusClass(),
        this.toggleTarget.addEventListener("focus", this.$module.addFocusClass),
        this.toggleTarget.addEventListener(
          "blur",
          this.$module.removeFocusClassFromEmptyInput
        );
    }),
      (e.prototype.inputIsEmpty = function () {
        return "" === this.toggleTarget.value;
      }),
      (e.prototype.addFocusClass = function () {
        this.toggleTarget.classList.add("focus");
      }),
      (e.prototype.removeFocusClassFromEmptyInput = function () {
        this.inputIsEmpty() && this.toggleTarget.classList.remove("focus");
      }),
      (t.GemToggleInputClassOnFocus = e);
  })(window.GOVUK.Modules),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.$module.toggleTrigger = this.$module.querySelector(
          "[data-controls][data-expanded]"
        )),
        this.$module.toggleTrigger &&
          ((this.$module.toggleClass =
            this.$module.getAttribute("data-toggle-class") || "js-hidden"),
          (this.$module.isTrackable =
            this.$module.toggleTrigger.hasAttribute("data-track-category") &&
            this.$module.toggleTrigger.hasAttribute("data-track-action")),
          this.$module.isTrackable &&
            ((this.$module.trackCategory = this.$module.toggleTrigger.getAttribute(
              "data-track-category"
            )),
            (this.$module.trackAction = this.$module.toggleTrigger.getAttribute(
              "data-track-action"
            ))),
          this.addAriaAttrs(),
          this.toggleOnClick());
    }),
      (e.prototype.addAriaAttrs = function () {
        this.$module.toggleTrigger.setAttribute("role", "button"),
          this.$module.toggleTrigger.setAttribute(
            "aria-controls",
            this.$module.toggleTrigger.getAttribute("data-controls")
          ),
          this.$module.toggleTrigger.setAttribute(
            "aria-expanded",
            this.$module.toggleTrigger.getAttribute("data-expanded")
          ),
          (this.$module.targets = this.getTargetElements());
        for (var t = 0; t < this.$module.targets.length; t++)
          this.$module.targets[t].setAttribute("aria-live", "polite"),
            this.$module.targets[t].setAttribute("role", "region");
      }),
      (e.prototype.getTargetElements = function () {
        var t =
          "#" +
          this.$module.toggleTrigger
            .getAttribute("aria-controls")
            .split(" ")
            .join(", #");
        return this.$module.querySelectorAll(t);
      }),
      (e.prototype.toggleOnClick = function () {
        var i = this;
        this.$module.toggleTrigger.addEventListener("click", function (t) {
          if (
            (t.preventDefault(), "true" === this.getAttribute("aria-expanded"))
          ) {
            this.setAttribute("aria-expanded", !1);
            for (var e = 0; e < i.$module.targets.length; e++)
              i.$module.targets[e].classList.add(i.$module.toggleClass);
          } else {
            this.setAttribute("aria-expanded", !0);
            for (var n = 0; n < i.$module.targets.length; n++)
              i.$module.targets[n].classList.remove(i.$module.toggleClass);
          }
          var o = this.getAttribute("data-toggled-text");
          "string" == typeof o &&
            (this.setAttribute("data-toggled-text", this.innerText),
            (this.innerText = o)),
            window.GOVUK.analytics &&
              window.GOVUK.analytics.trackEvent &&
              i.$module.isTrackable &&
              i.track();
        });
      }),
      (e.prototype.track = function () {
        var t = {
          label:
            this.$module.toggleTrigger.getAttribute("data-toggled-text") ||
            this.$module.toggleTrigger.innerText,
        };
        window.GOVUK.analytics.trackEvent(
          this.$module.trackCategory,
          this.$module.trackAction,
          t
        );
      }),
      (t.GemToggle = e);
  })(window.GOVUK.Modules),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.$module.handleClick = this.handleClick.bind(this));
      var e = this;
      this.$module.addEventListener("click", function (t) {
        e.$module.handleClick(t.target);
      });
    }),
      (e.prototype.handleClick = function (t) {
        var e = { transport: "beacon" };
        if (
          (t.hasAttribute("data-track-category") ||
            t.hasAttribute("data-track-action") ||
            (t = t.closest("[data-track-category][data-track-action]")),
          t)
        ) {
          var n = t.getAttribute("data-track-category"),
            o = t.getAttribute("data-track-action"),
            i = t.getAttribute("data-track-label"),
            r = t.getAttribute("data-track-value"),
            s = t.getAttribute("data-track-dimension"),
            a = t.getAttribute("data-track-dimension-index"),
            c = t.getAttribute("data-track-options");
          if (
            (i && (e.label = i),
            r && (e.value = r),
            s && a && (e["dimension" + a] = s),
            c)
          )
            for (var l in (c = JSON.parse(c))) e[l] = c[l];
          window.GOVUK.analytics &&
            window.GOVUK.analytics.trackEvent &&
            window.GOVUK.analytics.trackEvent(n, o, e);
        }
      }),
      (t.GemTrackClick = e);
  })(window.GOVUK.Modules),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : (t.GOVUKFrontend = e());
  })(this, function () {
    "use strict";
    function t(t) {
      (this.$module = t), (this.debounceFormSubmitTimer = null);
    }
    (function () {
      "Window" in this ||
        ("undefined" == typeof WorkerGlobalScope &&
          "function" != typeof importScripts &&
          (function (t) {
            t.constructor
              ? (t.Window = t.constructor)
              : ((t.Window = t.constructor = new Function(
                  "return function Window() {}"
                )()).prototype = this);
          })(this));
    }.call(
      ("object" == typeof window && window) ||
        ("object" == typeof self && self) ||
        ("object" == typeof global && global) ||
        {}
    ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        var a, c, l, u;
        ("defineProperty" in Object &&
          (function () {
            try {
              var t = {};
              return Object.defineProperty(t, "test", { value: 42 }), !0;
            } catch (e) {
              return !1;
            }
          })()) ||
          ((a = Object.defineProperty),
          (c = Object.prototype.hasOwnProperty("__defineGetter__")),
          (l = "Getters & setters cannot be defined on this javascript engine"),
          (u =
            "A property cannot both have accessors and be writable or have a value"),
          (Object.defineProperty = function d(t, e, n) {
            if (
              a &&
              (t === window ||
                t === document ||
                t === Element.prototype ||
                t instanceof Element)
            )
              return a(t, e, n);
            if (null === t || !(t instanceof Object || "object" == typeof t))
              throw new TypeError("Object.defineProperty called on non-object");
            if (!(n instanceof Object))
              throw new TypeError("Property description must be an object");
            var o = String(e),
              i = "value" in n || "writable" in n,
              r = "get" in n && typeof n.get,
              s = "set" in n && typeof n.set;
            if (r) {
              if ("function" !== r)
                throw new TypeError("Getter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineGetter__.call(t, o, n.get);
            } else t[o] = n.value;
            if (s) {
              if ("function" !== s)
                throw new TypeError("Setter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineSetter__.call(t, o, n.set);
            }
            return "value" in n && (t[o] = n.value), t;
          }));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (l) {
        (function (t) {
          if (!("Event" in t)) return !1;
          if ("function" == typeof t.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (e) {
            return !1;
          }
        })(this) ||
          (function () {
            function u(t, e) {
              for (var n = -1, o = t.length; ++n < o; )
                if (n in t && t[n] === e) return n;
              return -1;
            }
            var i = {
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
              textinput: 1,
            };
            if (
              "undefined" != typeof document &&
              "undefined" != typeof window
            ) {
              var t = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function r(t, e) {
                if (!t) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var o = !(!e || e.bubbles === l) && e.bubbles,
                    i = !(!e || e.cancelable === l) && e.cancelable;
                  return n.initEvent(t, o, i), n;
                }
                return (
                  ((n = document.createEventObject()).type = t),
                  (n.bubbles = !(!e || e.bubbles === l) && e.bubbles),
                  (n.cancelable = !(!e || e.cancelable === l) && e.cancelable),
                  n
                );
              }),
                t &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: t,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(
                    t,
                    e
                  ) {
                    var l = this,
                      n = t,
                      o = e;
                    if (l === window && n in i)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    l._events || (l._events = {}),
                      l._events[n] ||
                        ((l._events[n] = function (t) {
                          var e,
                            n = l._events[t.type].list,
                            o = n.slice(),
                            i = -1,
                            r = o.length;
                          for (
                            t.preventDefault = function s() {
                              !1 !== t.cancelable && (t.returnValue = !1);
                            },
                              t.stopPropagation = function a() {
                                t.cancelBubble = !0;
                              },
                              t.stopImmediatePropagation = function c() {
                                (t.cancelBubble = !0), (t.cancelImmediate = !0);
                              },
                              t.currentTarget = l,
                              t.relatedTarget = t.fromElement || null,
                              t.target = t.target || t.srcElement || l,
                              t.timeStamp = new Date().getTime(),
                              t.clientX &&
                                ((t.pageX =
                                  t.clientX +
                                  document.documentElement.scrollLeft),
                                (t.pageY =
                                  t.clientY +
                                  document.documentElement.scrollTop));
                            ++i < r && !t.cancelImmediate;

                          )
                            i in o &&
                              -1 !== u(n, (e = o[i])) &&
                              "function" == typeof e &&
                              e.call(l, t);
                        }),
                        (l._events[n].list = []),
                        l.attachEvent && l.attachEvent("on" + n, l._events[n])),
                      l._events[n].list.push(o);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(
                    t,
                    e
                  ) {
                    var n,
                      o = this,
                      i = t,
                      r = e;
                    o._events &&
                      o._events[i] &&
                      o._events[i].list &&
                      -1 !== (n = u(o._events[i].list, r)) &&
                      (o._events[i].list.splice(n, 1),
                      o._events[i].list.length ||
                        (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
                        delete o._events[i]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    t
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!t || "string" != typeof t.type)
                      throw new Error("DOM Events Exception 0");
                    var e = this,
                      n = t.type;
                    try {
                      if (!t.bubbles) {
                        t.cancelBubble = !0;
                        var o = function (t) {
                          (t.cancelBubble = !0),
                            (e || window).detachEvent("on" + n, o);
                        };
                        this.attachEvent("on" + n, o);
                      }
                      this.fireEvent("on" + n, t);
                    } catch (i) {
                      for (
                        t.target = e;
                        "_events" in (t.currentTarget = e) &&
                          "function" == typeof e._events[n] &&
                          e._events[n].call(e, t),
                          "function" == typeof e["on" + n] &&
                            e["on" + n].call(e, t),
                          (e =
                            9 === e.nodeType ? e.parentWindow : e.parentNode) &&
                            !t.cancelBubble;

                      );
                    }
                    return !0;
                  }),
                  document.attachEvent("onreadystatechange", function () {
                    "complete" === document.readyState &&
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", { bubbles: !0 })
                      );
                  }));
            }
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function O(e) {
              var n,
                t = Array,
                o = Object,
                i = o.prototype,
                r = t.prototype,
                s = function s() {},
                a = i.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                l = Function.prototype.toString,
                u = function u(t) {
                  try {
                    return l.call(t), !0;
                  } catch (e) {
                    return !1;
                  }
                },
                d = "[object Function]",
                p = "[object GeneratorFunction]";
              n = function n(t) {
                if ("function" != typeof t) return !1;
                if (c) return u(t);
                var e = a.call(t);
                return e === d || e === p;
              };
              var h = r.slice,
                f = r.concat,
                m = r.push,
                v = Math.max,
                g = this;
              if (!n(g))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + g
                );
              for (
                var b,
                  y = h.call(arguments, 1),
                  w = function () {
                    if (this instanceof b) {
                      var t = g.apply(this, f.call(y, h.call(arguments)));
                      return o(t) === t ? t : this;
                    }
                    return g.apply(e, f.call(y, h.call(arguments)));
                  },
                  E = v(0, g.length - y.length),
                  k = [],
                  L = 0;
                L < E;
                L++
              )
                m.call(k, "$" + L);
              return (
                (b = Function(
                  "binder",
                  "return function (" +
                    k.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                g.prototype &&
                  ((s.prototype = g.prototype),
                  (b.prototype = new s()),
                  (s.prototype = null)),
                b
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ));
    var n = 32,
      e = 1;
    return (
      (t.prototype.handleKeyDown = function (t) {
        var e = t.target;
        "button" === e.getAttribute("role") &&
          t.keyCode === n &&
          (t.preventDefault(), e.click());
      }),
      (t.prototype.debounce = function (t) {
        if ("true" === t.target.getAttribute("data-prevent-double-click"))
          return this.debounceFormSubmitTimer
            ? (t.preventDefault(), !1)
            : void (this.debounceFormSubmitTimer = setTimeout(
                function () {
                  this.debounceFormSubmitTimer = null;
                }.bind(this),
                1e3 * e
              ));
      }),
      (t.prototype.init = function () {
        this.$module.addEventListener("keydown", this.handleKeyDown),
          this.$module.addEventListener("click", this.debounce);
      }),
      t
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (window.GOVUK.Modules.Button = window.GOVUKFrontend),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : (t.GOVUKFrontend = e());
  })(this, function () {
    "use strict";
    function t(t) {
      (this.$module = t),
        (this.$textarea = t.querySelector(".govuk-js-character-count")),
        this.$textarea &&
          (this.$countMessage = t.querySelector(
            '[id="' + this.$textarea.id + '-info"]'
          ));
    }
    return (
      function () {
        var a, c, l, u;
        ("defineProperty" in Object &&
          (function () {
            try {
              var t = {};
              return Object.defineProperty(t, "test", { value: 42 }), !0;
            } catch (e) {
              return !1;
            }
          })()) ||
          ((a = Object.defineProperty),
          (c = Object.prototype.hasOwnProperty("__defineGetter__")),
          (l = "Getters & setters cannot be defined on this javascript engine"),
          (u =
            "A property cannot both have accessors and be writable or have a value"),
          (Object.defineProperty = function d(t, e, n) {
            if (
              a &&
              (t === window ||
                t === document ||
                t === Element.prototype ||
                t instanceof Element)
            )
              return a(t, e, n);
            if (null === t || !(t instanceof Object || "object" == typeof t))
              throw new TypeError("Object.defineProperty called on non-object");
            if (!(n instanceof Object))
              throw new TypeError("Property description must be an object");
            var o = String(e),
              i = "value" in n || "writable" in n,
              r = "get" in n && typeof n.get,
              s = "set" in n && typeof n.set;
            if (r) {
              if ("function" !== r)
                throw new TypeError("Getter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineGetter__.call(t, o, n.get);
            } else t[o] = n.value;
            if (s) {
              if ("function" !== s)
                throw new TypeError("Setter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineSetter__.call(t, o, n.set);
            }
            return "value" in n && (t[o] = n.value), t;
          }));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function O(e) {
              var n,
                t = Array,
                o = Object,
                i = o.prototype,
                r = t.prototype,
                s = function s() {},
                a = i.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                l = Function.prototype.toString,
                u = function u(t) {
                  try {
                    return l.call(t), !0;
                  } catch (e) {
                    return !1;
                  }
                },
                d = "[object Function]",
                p = "[object GeneratorFunction]";
              n = function n(t) {
                if ("function" != typeof t) return !1;
                if (c) return u(t);
                var e = a.call(t);
                return e === d || e === p;
              };
              var h = r.slice,
                f = r.concat,
                m = r.push,
                v = Math.max,
                g = this;
              if (!n(g))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + g
                );
              for (
                var b,
                  y = h.call(arguments, 1),
                  w = function () {
                    if (this instanceof b) {
                      var t = g.apply(this, f.call(y, h.call(arguments)));
                      return o(t) === t ? t : this;
                    }
                    return g.apply(e, f.call(y, h.call(arguments)));
                  },
                  E = v(0, g.length - y.length),
                  k = [],
                  L = 0;
                L < E;
                L++
              )
                m.call(k, "$" + L);
              return (
                (b = Function(
                  "binder",
                  "return function (" +
                    k.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                g.prototype &&
                  ((s.prototype = g.prototype),
                  (b.prototype = new s()),
                  (s.prototype = null)),
                b
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Window" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (function (t) {
              t.constructor
                ? (t.Window = t.constructor)
                : ((t.Window = t.constructor = new Function(
                    "return function Window() {}"
                  )()).prototype = this);
            })(this));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (l) {
        (function (t) {
          if (!("Event" in t)) return !1;
          if ("function" == typeof t.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (e) {
            return !1;
          }
        })(this) ||
          (function () {
            function u(t, e) {
              for (var n = -1, o = t.length; ++n < o; )
                if (n in t && t[n] === e) return n;
              return -1;
            }
            var i = {
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
              textinput: 1,
            };
            if (
              "undefined" != typeof document &&
              "undefined" != typeof window
            ) {
              var t = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function r(t, e) {
                if (!t) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var o = !(!e || e.bubbles === l) && e.bubbles,
                    i = !(!e || e.cancelable === l) && e.cancelable;
                  return n.initEvent(t, o, i), n;
                }
                return (
                  ((n = document.createEventObject()).type = t),
                  (n.bubbles = !(!e || e.bubbles === l) && e.bubbles),
                  (n.cancelable = !(!e || e.cancelable === l) && e.cancelable),
                  n
                );
              }),
                t &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: t,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(
                    t,
                    e
                  ) {
                    var l = this,
                      n = t,
                      o = e;
                    if (l === window && n in i)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    l._events || (l._events = {}),
                      l._events[n] ||
                        ((l._events[n] = function (t) {
                          var e,
                            n = l._events[t.type].list,
                            o = n.slice(),
                            i = -1,
                            r = o.length;
                          for (
                            t.preventDefault = function s() {
                              !1 !== t.cancelable && (t.returnValue = !1);
                            },
                              t.stopPropagation = function a() {
                                t.cancelBubble = !0;
                              },
                              t.stopImmediatePropagation = function c() {
                                (t.cancelBubble = !0), (t.cancelImmediate = !0);
                              },
                              t.currentTarget = l,
                              t.relatedTarget = t.fromElement || null,
                              t.target = t.target || t.srcElement || l,
                              t.timeStamp = new Date().getTime(),
                              t.clientX &&
                                ((t.pageX =
                                  t.clientX +
                                  document.documentElement.scrollLeft),
                                (t.pageY =
                                  t.clientY +
                                  document.documentElement.scrollTop));
                            ++i < r && !t.cancelImmediate;

                          )
                            i in o &&
                              -1 !== u(n, (e = o[i])) &&
                              "function" == typeof e &&
                              e.call(l, t);
                        }),
                        (l._events[n].list = []),
                        l.attachEvent && l.attachEvent("on" + n, l._events[n])),
                      l._events[n].list.push(o);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(
                    t,
                    e
                  ) {
                    var n,
                      o = this,
                      i = t,
                      r = e;
                    o._events &&
                      o._events[i] &&
                      o._events[i].list &&
                      -1 !== (n = u(o._events[i].list, r)) &&
                      (o._events[i].list.splice(n, 1),
                      o._events[i].list.length ||
                        (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
                        delete o._events[i]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    t
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!t || "string" != typeof t.type)
                      throw new Error("DOM Events Exception 0");
                    var e = this,
                      n = t.type;
                    try {
                      if (!t.bubbles) {
                        t.cancelBubble = !0;
                        var o = function (t) {
                          (t.cancelBubble = !0),
                            (e || window).detachEvent("on" + n, o);
                        };
                        this.attachEvent("on" + n, o);
                      }
                      this.fireEvent("on" + n, t);
                    } catch (i) {
                      for (
                        t.target = e;
                        "_events" in (t.currentTarget = e) &&
                          "function" == typeof e._events[n] &&
                          e._events[n].call(e, t),
                          "function" == typeof e["on" + n] &&
                            e["on" + n].call(e, t),
                          (e =
                            9 === e.nodeType ? e.parentWindow : e.parentNode) &&
                            !t.cancelBubble;

                      );
                    }
                    return !0;
                  }),
                  document.attachEvent("onreadystatechange", function () {
                    "complete" === document.readyState &&
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", { bubbles: !0 })
                      );
                  }));
            }
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (p) {
        var t, e, n;
        ("DOMTokenList" in this &&
          (!("classList" in (t = document.createElement("x"))) ||
            (!t.classList.toggle("x", !1) && !t.className))) ||
          (("DOMTokenList" in (e = this) &&
            e.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS("http://www.w3.org/2000/svg", "svg") ||
              document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .classList instanceof DOMTokenList)) ||
            (e.DOMTokenList = (function () {
              var i = !0,
                n = function (t, e, n, o) {
                  Object.defineProperty
                    ? Object.defineProperty(t, e, {
                        configurable: !1 === i || !!o,
                        get: n,
                      })
                    : t.__defineGetter__(e, n);
                };
              try {
                n({}, "support");
              } catch (t) {
                i = !1;
              }
              return function (i, r) {
                var s = this,
                  a = [],
                  c = {},
                  l = 0,
                  t = 0,
                  e = function (t) {
                    n(
                      s,
                      t,
                      function () {
                        return d(), a[t];
                      },
                      !1
                    );
                  },
                  u = function () {
                    if (t <= l) for (; t < l; ++t) e(t);
                  },
                  d = function () {
                    var t,
                      e,
                      n = arguments,
                      o = /\s+/;
                    if (n.length)
                      for (e = 0; e < n.length; ++e)
                        if (o.test(n[e]))
                          throw (
                            (((t = new SyntaxError(
                              'String "' +
                                n[e] +
                                '" contains an invalid character'
                            )).code = 5),
                            (t.name = "InvalidCharacterError"),
                            t)
                          );
                    for (
                      "" ===
                        (a =
                          "object" == typeof i[r]
                            ? ("" + i[r].baseVal)
                                .replace(/^\s+|\s+$/g, "")
                                .split(o)
                            : ("" + i[r])
                                .replace(/^\s+|\s+$/g, "")
                                .split(o))[0] && (a = []),
                        c = {},
                        e = 0;
                      e < a.length;
                      ++e
                    )
                      c[a[e]] = !0;
                    (l = a.length), u();
                  };
                return (
                  d(),
                  n(s, "length", function () {
                    return d(), l;
                  }),
                  (s.toLocaleString = s.toString = function () {
                    return d(), a.join(" ");
                  }),
                  (s.item = function (t) {
                    return d(), a[t];
                  }),
                  (s.contains = function (t) {
                    return d(), !!c[t];
                  }),
                  (s.add = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e, n = 0, o = t.length; n < o; ++n)
                      (e = t[n]), c[e] || (a.push(e), (c[e] = !0));
                    l !== a.length &&
                      ((l = a.length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u());
                  }),
                  (s.remove = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                      (e[t[n]] = !0), delete c[t[n]];
                    for (n = 0; n < a.length; ++n) e[a[n]] || o.push(a[n]);
                    (l = (a = o).length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u();
                  }),
                  (s.toggle = function (t, e) {
                    return (
                      d.apply(s, [t]),
                      p !== e
                        ? e
                          ? (s.add(t), !0)
                          : (s.remove(t), !1)
                        : c[t]
                        ? (s.remove(t), !1)
                        : (s.add(t), !0)
                    );
                  }),
                  s
                );
              };
            })()),
          "classList" in (n = document.createElement("span")) &&
            (n.classList.toggle("x", !1),
            n.classList.contains("x") &&
              (n.classList.constructor.prototype.toggle = function i(t, e) {
                var n = e;
                if (n !== p) return this[(n = !!n) ? "add" : "remove"](t), n;
                var o = !this.contains(t);
                return this[o ? "add" : "remove"](t), o;
              })),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a", "b"), !t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.add;
              t.classList.constructor.prototype.add = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })(),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a"),
              t.classList.add("b"),
              t.classList.remove("a", "b"),
              t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.remove;
              t.classList.constructor.prototype.remove = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })());
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        var t;
        ("document" in this &&
          "classList" in document.documentElement &&
          "Element" in this &&
          "classList" in Element.prototype &&
          ((t = document.createElement("span")).classList.add("a", "b"),
          t.classList.contains("b"))) ||
          (function (t) {
            var u = !0,
              d = function (t, e, n, o) {
                Object.defineProperty
                  ? Object.defineProperty(t, e, {
                      configurable: !1 === u || !!o,
                      get: n,
                    })
                  : t.__defineGetter__(e, n);
              };
            try {
              d({}, "support");
            } catch (e) {
              u = !1;
            }
            var p = function (t, c, l) {
              d(
                t.prototype,
                c,
                function () {
                  var t,
                    e = this,
                    n = "__defineGetter__DEFINE_PROPERTY" + c;
                  if (e[n]) return t;
                  if (!(e[n] = !0) === u) {
                    for (
                      var o,
                        i = p.mirror || document.createElement("div"),
                        r = i.childNodes,
                        s = r.length,
                        a = 0;
                      a < s;
                      ++a
                    )
                      if (r[a]._R === e) {
                        o = r[a];
                        break;
                      }
                    o || (o = i.appendChild(document.createElement("div"))),
                      (t = DOMTokenList.call(o, e, l));
                  } else t = new DOMTokenList(e, l);
                  return (
                    d(e, c, function () {
                      return t;
                    }),
                    delete e[n],
                    t
                  );
                },
                !0
              );
            };
            p(t.Element, "classList", "className"),
              p(t.HTMLElement, "classList", "className"),
              p(t.HTMLLinkElement, "relList", "rel"),
              p(t.HTMLAnchorElement, "relList", "rel"),
              p(t.HTMLAreaElement, "relList", "rel");
          })(this);
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      (t.prototype.defaults = {
        characterCountAttribute: "data-maxlength",
        wordCountAttribute: "data-maxwords",
      }),
      (t.prototype.init = function () {
        var t = this.$module,
          e = this.$textarea,
          n = this.$countMessage;
        if (e && n) {
          e.insertAdjacentElement("afterend", n),
            (this.options = this.getDataset(t));
          var o = this.defaults.characterCountAttribute;
          this.options.maxwords && (o = this.defaults.wordCountAttribute),
            (this.maxLength = t.getAttribute(o)),
            this.maxLength &&
              (t.removeAttribute("maxlength"),
              "onpageshow" in window
                ? window.addEventListener("pageshow", this.sync.bind(this))
                : window.addEventListener(
                    "DOMContentLoaded",
                    this.sync.bind(this)
                  ),
              this.sync());
        }
      }),
      (t.prototype.sync = function () {
        this.bindChangeEvents(), this.updateCountMessage();
      }),
      (t.prototype.getDataset = function (t) {
        var e = {},
          n = t.attributes;
        if (n)
          for (var o = 0; o < n.length; o++) {
            var i = n[o],
              r = i.name.match(/^data-(.+)/);
            r && (e[r[1]] = i.value);
          }
        return e;
      }),
      (t.prototype.count = function (t) {
        var e;
        this.options.maxwords
          ? (e = (t.match(/\S+/g) || []).length)
          : (e = t.length);
        return e;
      }),
      (t.prototype.bindChangeEvents = function () {
        var t = this.$textarea;
        t.addEventListener("keyup", this.checkIfValueChanged.bind(this)),
          t.addEventListener("focus", this.handleFocus.bind(this)),
          t.addEventListener("blur", this.handleBlur.bind(this));
      }),
      (t.prototype.checkIfValueChanged = function () {
        this.$textarea.oldValue || (this.$textarea.oldValue = ""),
          this.$textarea.value !== this.$textarea.oldValue &&
            ((this.$textarea.oldValue = this.$textarea.value),
            this.updateCountMessage());
      }),
      (t.prototype.updateCountMessage = function () {
        var t = this.$textarea,
          e = this.options,
          n = this.$countMessage,
          o = this.count(t.value),
          i = this.maxLength,
          r = i - o;
        o < (i * (e.threshold ? e.threshold : 0)) / 100
          ? (n.classList.add("govuk-character-count__message--disabled"),
            n.setAttribute("aria-hidden", !0))
          : (n.classList.remove("govuk-character-count__message--disabled"),
            n.removeAttribute("aria-hidden")),
          r < 0
            ? (t.classList.add("govuk-textarea--error"),
              n.classList.remove("govuk-hint"),
              n.classList.add("govuk-error-message"))
            : (t.classList.remove("govuk-textarea--error"),
              n.classList.remove("govuk-error-message"),
              n.classList.add("govuk-hint"));
        var s = "remaining",
          a = "character",
          c = r;
        e.maxwords && (a = "word"),
          (a += -1 === r || 1 === r ? "" : "s"),
          (s = r < 0 ? "too many" : "remaining"),
          (c = Math.abs(r)),
          (n.innerHTML = "You have " + c + " " + a + " " + s);
      }),
      (t.prototype.handleFocus = function () {
        this.valueChecker = setInterval(
          this.checkIfValueChanged.bind(this),
          1e3
        );
      }),
      (t.prototype.handleBlur = function () {
        clearInterval(this.valueChecker);
      }),
      t
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (window.GOVUK.Modules.CharacterCount = window.GOVUKFrontend),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : (t.GOVUKFrontend = e());
  })(this, function () {
    "use strict";
    function o() {
      var n = new Date().getTime();
      return (
        "undefined" != typeof window.performance &&
          "function" == typeof window.performance.now &&
          (n += window.performance.now()),
        "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (t) {
          var e = (n + 16 * Math.random()) % 16 | 0;
          return (
            (n = Math.floor(n / 16)), ("x" === t ? e : (3 & e) | 8).toString(16)
          );
        })
      );
    }
    function t(t) {
      this.$module = t;
    }
    (function () {
      var a, c, l, u;
      ("defineProperty" in Object &&
        (function () {
          try {
            var t = {};
            return Object.defineProperty(t, "test", { value: 42 }), !0;
          } catch (e) {
            return !1;
          }
        })()) ||
        ((a = Object.defineProperty),
        (c = Object.prototype.hasOwnProperty("__defineGetter__")),
        (l = "Getters & setters cannot be defined on this javascript engine"),
        (u =
          "A property cannot both have accessors and be writable or have a value"),
        (Object.defineProperty = function d(t, e, n) {
          if (
            a &&
            (t === window ||
              t === document ||
              t === Element.prototype ||
              t instanceof Element)
          )
            return a(t, e, n);
          if (null === t || !(t instanceof Object || "object" == typeof t))
            throw new TypeError("Object.defineProperty called on non-object");
          if (!(n instanceof Object))
            throw new TypeError("Property description must be an object");
          var o = String(e),
            i = "value" in n || "writable" in n,
            r = "get" in n && typeof n.get,
            s = "set" in n && typeof n.set;
          if (r) {
            if ("function" !== r)
              throw new TypeError("Getter must be a function");
            if (!c) throw new TypeError(l);
            if (i) throw new TypeError(u);
            Object.__defineGetter__.call(t, o, n.get);
          } else t[o] = n.value;
          if (s) {
            if ("function" !== s)
              throw new TypeError("Setter must be a function");
            if (!c) throw new TypeError(l);
            if (i) throw new TypeError(u);
            Object.__defineSetter__.call(t, o, n.set);
          }
          return "value" in n && (t[o] = n.value), t;
        }));
    }.call(
      ("object" == typeof window && window) ||
        ("object" == typeof self && self) ||
        ("object" == typeof global && global) ||
        {}
    ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function O(e) {
              var n,
                t = Array,
                o = Object,
                i = o.prototype,
                r = t.prototype,
                s = function s() {},
                a = i.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                l = Function.prototype.toString,
                u = function u(t) {
                  try {
                    return l.call(t), !0;
                  } catch (e) {
                    return !1;
                  }
                },
                d = "[object Function]",
                p = "[object GeneratorFunction]";
              n = function n(t) {
                if ("function" != typeof t) return !1;
                if (c) return u(t);
                var e = a.call(t);
                return e === d || e === p;
              };
              var h = r.slice,
                f = r.concat,
                m = r.push,
                v = Math.max,
                g = this;
              if (!n(g))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + g
                );
              for (
                var b,
                  y = h.call(arguments, 1),
                  w = function () {
                    if (this instanceof b) {
                      var t = g.apply(this, f.call(y, h.call(arguments)));
                      return o(t) === t ? t : this;
                    }
                    return g.apply(e, f.call(y, h.call(arguments)));
                  },
                  E = v(0, g.length - y.length),
                  k = [],
                  L = 0;
                L < E;
                L++
              )
                m.call(k, "$" + L);
              return (
                (b = Function(
                  "binder",
                  "return function (" +
                    k.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                g.prototype &&
                  ((s.prototype = g.prototype),
                  (b.prototype = new s()),
                  (s.prototype = null)),
                b
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Window" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (function (t) {
              t.constructor
                ? (t.Window = t.constructor)
                : ((t.Window = t.constructor = new Function(
                    "return function Window() {}"
                  )()).prototype = this);
            })(this));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (l) {
        (function (t) {
          if (!("Event" in t)) return !1;
          if ("function" == typeof t.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (e) {
            return !1;
          }
        })(this) ||
          (function () {
            function u(t, e) {
              for (var n = -1, o = t.length; ++n < o; )
                if (n in t && t[n] === e) return n;
              return -1;
            }
            var i = {
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
              textinput: 1,
            };
            if (
              "undefined" != typeof document &&
              "undefined" != typeof window
            ) {
              var t = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function r(t, e) {
                if (!t) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var o = !(!e || e.bubbles === l) && e.bubbles,
                    i = !(!e || e.cancelable === l) && e.cancelable;
                  return n.initEvent(t, o, i), n;
                }
                return (
                  ((n = document.createEventObject()).type = t),
                  (n.bubbles = !(!e || e.bubbles === l) && e.bubbles),
                  (n.cancelable = !(!e || e.cancelable === l) && e.cancelable),
                  n
                );
              }),
                t &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: t,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(
                    t,
                    e
                  ) {
                    var l = this,
                      n = t,
                      o = e;
                    if (l === window && n in i)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    l._events || (l._events = {}),
                      l._events[n] ||
                        ((l._events[n] = function (t) {
                          var e,
                            n = l._events[t.type].list,
                            o = n.slice(),
                            i = -1,
                            r = o.length;
                          for (
                            t.preventDefault = function s() {
                              !1 !== t.cancelable && (t.returnValue = !1);
                            },
                              t.stopPropagation = function a() {
                                t.cancelBubble = !0;
                              },
                              t.stopImmediatePropagation = function c() {
                                (t.cancelBubble = !0), (t.cancelImmediate = !0);
                              },
                              t.currentTarget = l,
                              t.relatedTarget = t.fromElement || null,
                              t.target = t.target || t.srcElement || l,
                              t.timeStamp = new Date().getTime(),
                              t.clientX &&
                                ((t.pageX =
                                  t.clientX +
                                  document.documentElement.scrollLeft),
                                (t.pageY =
                                  t.clientY +
                                  document.documentElement.scrollTop));
                            ++i < r && !t.cancelImmediate;

                          )
                            i in o &&
                              -1 !== u(n, (e = o[i])) &&
                              "function" == typeof e &&
                              e.call(l, t);
                        }),
                        (l._events[n].list = []),
                        l.attachEvent && l.attachEvent("on" + n, l._events[n])),
                      l._events[n].list.push(o);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(
                    t,
                    e
                  ) {
                    var n,
                      o = this,
                      i = t,
                      r = e;
                    o._events &&
                      o._events[i] &&
                      o._events[i].list &&
                      -1 !== (n = u(o._events[i].list, r)) &&
                      (o._events[i].list.splice(n, 1),
                      o._events[i].list.length ||
                        (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
                        delete o._events[i]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    t
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!t || "string" != typeof t.type)
                      throw new Error("DOM Events Exception 0");
                    var e = this,
                      n = t.type;
                    try {
                      if (!t.bubbles) {
                        t.cancelBubble = !0;
                        var o = function (t) {
                          (t.cancelBubble = !0),
                            (e || window).detachEvent("on" + n, o);
                        };
                        this.attachEvent("on" + n, o);
                      }
                      this.fireEvent("on" + n, t);
                    } catch (i) {
                      for (
                        t.target = e;
                        "_events" in (t.currentTarget = e) &&
                          "function" == typeof e._events[n] &&
                          e._events[n].call(e, t),
                          "function" == typeof e["on" + n] &&
                            e["on" + n].call(e, t),
                          (e =
                            9 === e.nodeType ? e.parentWindow : e.parentNode) &&
                            !t.cancelBubble;

                      );
                    }
                    return !0;
                  }),
                  document.attachEvent("onreadystatechange", function () {
                    "complete" === document.readyState &&
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", { bubbles: !0 })
                      );
                  }));
            }
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ));
    var i = 13,
      r = 32;
    return (
      (t.prototype.init = function () {
        this.$module &&
          ("boolean" == typeof this.$module.open || this.polyfillDetails());
      }),
      (t.prototype.polyfillDetails = function () {
        var t = this.$module,
          e = (this.$summary = t.getElementsByTagName("summary").item(0)),
          n = (this.$content = t.getElementsByTagName("div").item(0));
        e &&
          n &&
          (n.id || (n.id = "details-content-" + o()),
          t.setAttribute("role", "group"),
          e.setAttribute("role", "button"),
          e.setAttribute("aria-controls", n.id),
          !(e.tabIndex = 0) === (null !== t.getAttribute("open"))
            ? (e.setAttribute("aria-expanded", "true"),
              n.setAttribute("aria-hidden", "false"))
            : (e.setAttribute("aria-expanded", "false"),
              n.setAttribute("aria-hidden", "true"),
              (n.style.display = "none")),
          this.polyfillHandleInputs(e, this.polyfillSetAttributes.bind(this)));
      }),
      (t.prototype.polyfillSetAttributes = function () {
        var t = this.$module,
          e = this.$summary,
          n = this.$content,
          o = "true" === e.getAttribute("aria-expanded"),
          i = "true" === n.getAttribute("aria-hidden");
        return (
          e.setAttribute("aria-expanded", o ? "false" : "true"),
          n.setAttribute("aria-hidden", i ? "false" : "true"),
          (n.style.display = o ? "none" : ""),
          null !== t.getAttribute("open")
            ? t.removeAttribute("open")
            : t.setAttribute("open", "open"),
          !0
        );
      }),
      (t.prototype.polyfillHandleInputs = function (t, n) {
        t.addEventListener("keypress", function (t) {
          var e = t.target;
          (t.keyCode !== i && t.keyCode !== r) ||
            ("summary" === e.nodeName.toLowerCase() &&
              (t.preventDefault(), e.click ? e.click() : n(t)));
        }),
          t.addEventListener("keyup", function (t) {
            var e = t.target;
            t.keyCode === r &&
              "summary" === e.nodeName.toLowerCase() &&
              t.preventDefault();
          }),
          t.addEventListener("click", n);
      }),
      t
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      if (
        ((this.$module = t[0]), this.$module.getAttribute("data-track-label"))
      ) {
        new window.GOVUK.Modules.GemTrackClick().start(t);
      } else {
        var e = this.$module.querySelector("[data-details-track-click]");
        e &&
          e.addEventListener(
            "click",
            function () {
              this.trackDefault(this.$module);
            }.bind(this)
          );
      }
    }),
      (e.prototype.trackDefault = function (t) {
        if (window.GOVUK.analytics && window.GOVUK.analytics.trackEvent) {
          var e = null == t.getAttribute("open") ? "open" : "closed",
            n = t.getAttribute("data-track-category"),
            o = t.getAttribute("data-track-action"),
            i = t.getAttribute("data-track-options");
          i && (i = JSON.parse(i)),
            ("object" == typeof i && null !== i) || (i = {}),
            (i.label = e),
            o && n && window.GOVUK.analytics.trackEvent(n, o, i);
        }
      }),
      (t.GovukDetails = e);
  })(window.GOVUK.Modules),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function () {
    "use strict";
    window.GOVUK.Modules.Feedback = function () {
      this.start = function (n) {
        function o(t) {
          t.find('input[type="submit"]').prop("disabled", !0);
        }
        function i(t) {
          t.find('input[type="submit"]').removeAttr("disabled");
        }
        function r() {
          h.$forms.attr("aria-hidden", !0),
            h.$pageIsNotUsefulButton.attr("aria-expanded", !1),
            h.$somethingIsWrongButton.attr("aria-expanded", !1);
        }
        function t() {
          h.$somethingIsWrongForm.append(
            '<input type="hidden" name="javascript_enabled" value="true"/>'
          ),
            h.$somethingIsWrongForm.append(
              $('<input type="hidden" name="referrer">').val(
                document.referrer || "unknown"
              )
            ),
            (h.somethingIsWrongForm.invalidInfoError = [
              "<h2>",
              "  Sorry, we\u2019re unable to send your message as you haven\u2019t given us any information.",
              "</h2>",
              "<p>Please tell us what you were doing or what went wrong</p>",
            ].join(""));
        }
        function e(t) {
          var e = window.location.pathname.replace(
              /[^\s=?&]+(?:@|%40)[^\s=?&]+/,
              "[email]"
            ),
            n = encodeURI(e);
          (h.surveyForm.invalidInfoError = [
            "<h2>",
            "  Sorry, we\u2019re unable to send your message as you haven\u2019t given us a valid email address. ",
            "</h2>",
            "<p>Enter an email address in the correct format, like name@example.com</p>",
          ].join("")),
            0 ===
              document.querySelectorAll(
                '[name="email_survey_signup[ga_client_id]"]'
              ).length &&
              h.$surveyForm.append(
                $(
                  '<input name="email_survey_signup[ga_client_id]" type="hidden">'
                ).val(t || "0")
              ),
            0 ===
              document.querySelectorAll(
                ".gem-c-feedback__email-link#take-survey"
              ).length &&
              h.$surveyWrapper.append(
                '<a href="https://www.smartsurvey.co.uk/s/gov-uk-banner/?c=' +
                  n +
                  "&amp;gcl=" +
                  t +
                  '" class="gem-c-feedback__email-link govuk-link" id="take-survey" target="_blank" rel="noopener noreferrer">Don\u2019t have an email address?</a>'
              );
        }
        function s(t) {
          t.attr("aria-expanded", !0),
            $("#" + t.attr("aria-controls")).attr("aria-hidden", !1);
        }
        function a(t) {
          (h.activeForm = h.element.querySelector("#" + t)),
            (h.$activeForm = $(h.activeForm)),
            h.$activeForm.toggleClass(f),
            h.$prompt.toggleClass(f),
            !h.$activeForm.hasClass(f)
              ? h.$activeForm.find(".gem-c-input").first().focus()
              : (h.$activeForm = !1);
        }
        function c(t) {
          return {
            category: t.data("track-category"),
            action: t.data("track-action"),
          };
        }
        function l(t) {
          window.GOVUK.analytics &&
            window.GOVUK.analytics.trackEvent &&
            window.GOVUK.analytics.trackEvent(t.category, t.action);
        }
        function u(t) {
          var e = [
            "<h2>",
            "  Sorry, we\u2019re unable to receive your message right now. ",
            "</h2>",
            "<p>If the problem persists, we have other ways for you to provide",
            ' feedback on the <a href="/contact/govuk">contact page</a>.</p>',
          ].join("");
          "undefined" != typeof t.responseJSON
            ? "email survey sign up failure" ===
                (t =
                  "undefined" == typeof t.responseJSON.message
                    ? e
                    : t.responseJSON.message) && (t = e)
            : (t = (422 === t.status && h.activeForm.invalidInfoError) || e),
            h.$activeForm.find(".js-errors").html(t).removeClass(f).focus();
        }
        function d() {
          h.$promptQuestions.addClass(f),
            h.$promptSuccessMessage.removeClass(f).focus();
        }
        function p() {
          h.$prompt.removeClass(f), h.$prompt.focus();
        }
        (this.element = n[0]),
          (this.somethingIsWrongForm = this.element.querySelector(
            "#something-is-wrong"
          )),
          (this.surveyForm = this.element.querySelector("#page-is-not-useful")),
          (this.$prompt = n.find(".js-prompt")),
          (this.$fields = n.find(".gem-c-feedback__form-field")),
          (this.$forms = n.find(".js-feedback-form")),
          (this.$toggleForms = n.find(".js-toggle-form")),
          (this.$closeForms = n.find(".js-close-form")),
          (this.activeForm = !1),
          (this.$activeForm = !1),
          (this.$pageIsUsefulButton = n.find(".js-page-is-useful")),
          (this.$pageIsNotUsefulButton = n.find(".js-page-is-not-useful")),
          (this.$somethingIsWrongButton = n.find(".js-something-is-wrong")),
          (this.$promptQuestions = n.find(".js-prompt-questions")),
          (this.$promptSuccessMessage = n.find(".js-prompt-success")),
          (this.$somethingIsWrongForm = $(this.somethingIsWrongForm)),
          (this.$surveyForm = $(this.surveyForm)),
          (this.$surveyWrapper = n.find("#survey-wrapper"));
        var h = this,
          f = "js-hidden";
        r(),
          t(),
          this.$toggleForms.on("click", function (t) {
            t.preventDefault(),
              a($(t.target).attr("aria-controls")),
              l(c($(this))),
              s($(this));
          }),
          this.$closeForms.on("click", function (t) {
            t.preventDefault(),
              a($(t.target).attr("aria-controls")),
              l(c($(this))),
              r(),
              p();
            var e = ".js-" + $(t.target).attr("aria-controls");
            n.find(e).focus();
          }),
          this.$pageIsUsefulButton.on("click", function (t) {
            t.preventDefault(), l(c(h.$pageIsUsefulButton)), d(), p();
          }),
          this.$pageIsNotUsefulButton.on("click", function () {
            var t = "111111111.1111111111";
            e(
              null === window.GOVUK.cookie("_ga") ||
                "" === window.GOVUK.cookie("_ga")
                ? t
                : window.GOVUK.cookie("_ga").split(".").slice(-2).join(".")
            );
          }),
          n.find("form").on("submit", function (t) {
            t.preventDefault();
            var e = $(this);
            $.ajax({
              type: "POST",
              url: e.attr("action"),
              dataType: "json",
              data: e.serialize(),
              beforeSend: o(e),
              timeout: 6e3,
            })
              .done(function (t) {
                l(c(e)), d(t.message), p(), r(), h.$activeForm.toggleClass(f);
              })
              .fail(function (t) {
                u(t), i(e);
              });
          });
      };
    };
  })(),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        -1 === this.$module.className.indexOf("disable-youtube") &&
          this.embedYoutube(),
        this.createBarcharts();
    }),
      (e.prototype.embedYoutube = function () {
        new window.GOVUK.GovspeakYoutubeLinkEnhancement(this.$module).init();
      }),
      (e.prototype.createBarcharts = function () {
        new window.GOVUK.GovspeakBarchartEnhancement(this.$module).init();
      }),
      (t.Govspeak = e);
  })(window.GOVUK.Modules),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : (t.GOVUKFrontend = e());
  })(this, function () {
    "use strict";
    function e(t, e) {
      if (window.NodeList.prototype.forEach) return t.forEach(e);
      for (var n = 0; n < t.length; n++) e.call(window, t[n], n, t);
    }
    function t(t) {
      (this.$module = t),
        (this.$inputs = t.querySelectorAll('input[type="radio"]'));
    }
    return (
      function () {
        var a, c, l, u;
        ("defineProperty" in Object &&
          (function () {
            try {
              var t = {};
              return Object.defineProperty(t, "test", { value: 42 }), !0;
            } catch (e) {
              return !1;
            }
          })()) ||
          ((a = Object.defineProperty),
          (c = Object.prototype.hasOwnProperty("__defineGetter__")),
          (l = "Getters & setters cannot be defined on this javascript engine"),
          (u =
            "A property cannot both have accessors and be writable or have a value"),
          (Object.defineProperty = function d(t, e, n) {
            if (
              a &&
              (t === window ||
                t === document ||
                t === Element.prototype ||
                t instanceof Element)
            )
              return a(t, e, n);
            if (null === t || !(t instanceof Object || "object" == typeof t))
              throw new TypeError("Object.defineProperty called on non-object");
            if (!(n instanceof Object))
              throw new TypeError("Property description must be an object");
            var o = String(e),
              i = "value" in n || "writable" in n,
              r = "get" in n && typeof n.get,
              s = "set" in n && typeof n.set;
            if (r) {
              if ("function" !== r)
                throw new TypeError("Getter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineGetter__.call(t, o, n.get);
            } else t[o] = n.value;
            if (s) {
              if ("function" !== s)
                throw new TypeError("Setter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineSetter__.call(t, o, n.set);
            }
            return "value" in n && (t[o] = n.value), t;
          }));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function O(e) {
              var n,
                t = Array,
                o = Object,
                i = o.prototype,
                r = t.prototype,
                s = function s() {},
                a = i.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                l = Function.prototype.toString,
                u = function u(t) {
                  try {
                    return l.call(t), !0;
                  } catch (e) {
                    return !1;
                  }
                },
                d = "[object Function]",
                p = "[object GeneratorFunction]";
              n = function n(t) {
                if ("function" != typeof t) return !1;
                if (c) return u(t);
                var e = a.call(t);
                return e === d || e === p;
              };
              var h = r.slice,
                f = r.concat,
                m = r.push,
                v = Math.max,
                g = this;
              if (!n(g))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + g
                );
              for (
                var b,
                  y = h.call(arguments, 1),
                  w = function () {
                    if (this instanceof b) {
                      var t = g.apply(this, f.call(y, h.call(arguments)));
                      return o(t) === t ? t : this;
                    }
                    return g.apply(e, f.call(y, h.call(arguments)));
                  },
                  E = v(0, g.length - y.length),
                  k = [],
                  L = 0;
                L < E;
                L++
              )
                m.call(k, "$" + L);
              return (
                (b = Function(
                  "binder",
                  "return function (" +
                    k.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                g.prototype &&
                  ((s.prototype = g.prototype),
                  (b.prototype = new s()),
                  (s.prototype = null)),
                b
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Window" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (function (t) {
              t.constructor
                ? (t.Window = t.constructor)
                : ((t.Window = t.constructor = new Function(
                    "return function Window() {}"
                  )()).prototype = this);
            })(this));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (l) {
        (function (t) {
          if (!("Event" in t)) return !1;
          if ("function" == typeof t.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (e) {
            return !1;
          }
        })(this) ||
          (function () {
            function u(t, e) {
              for (var n = -1, o = t.length; ++n < o; )
                if (n in t && t[n] === e) return n;
              return -1;
            }
            var i = {
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
              textinput: 1,
            };
            if (
              "undefined" != typeof document &&
              "undefined" != typeof window
            ) {
              var t = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function r(t, e) {
                if (!t) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var o = !(!e || e.bubbles === l) && e.bubbles,
                    i = !(!e || e.cancelable === l) && e.cancelable;
                  return n.initEvent(t, o, i), n;
                }
                return (
                  ((n = document.createEventObject()).type = t),
                  (n.bubbles = !(!e || e.bubbles === l) && e.bubbles),
                  (n.cancelable = !(!e || e.cancelable === l) && e.cancelable),
                  n
                );
              }),
                t &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: t,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(
                    t,
                    e
                  ) {
                    var l = this,
                      n = t,
                      o = e;
                    if (l === window && n in i)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    l._events || (l._events = {}),
                      l._events[n] ||
                        ((l._events[n] = function (t) {
                          var e,
                            n = l._events[t.type].list,
                            o = n.slice(),
                            i = -1,
                            r = o.length;
                          for (
                            t.preventDefault = function s() {
                              !1 !== t.cancelable && (t.returnValue = !1);
                            },
                              t.stopPropagation = function a() {
                                t.cancelBubble = !0;
                              },
                              t.stopImmediatePropagation = function c() {
                                (t.cancelBubble = !0), (t.cancelImmediate = !0);
                              },
                              t.currentTarget = l,
                              t.relatedTarget = t.fromElement || null,
                              t.target = t.target || t.srcElement || l,
                              t.timeStamp = new Date().getTime(),
                              t.clientX &&
                                ((t.pageX =
                                  t.clientX +
                                  document.documentElement.scrollLeft),
                                (t.pageY =
                                  t.clientY +
                                  document.documentElement.scrollTop));
                            ++i < r && !t.cancelImmediate;

                          )
                            i in o &&
                              -1 !== u(n, (e = o[i])) &&
                              "function" == typeof e &&
                              e.call(l, t);
                        }),
                        (l._events[n].list = []),
                        l.attachEvent && l.attachEvent("on" + n, l._events[n])),
                      l._events[n].list.push(o);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(
                    t,
                    e
                  ) {
                    var n,
                      o = this,
                      i = t,
                      r = e;
                    o._events &&
                      o._events[i] &&
                      o._events[i].list &&
                      -1 !== (n = u(o._events[i].list, r)) &&
                      (o._events[i].list.splice(n, 1),
                      o._events[i].list.length ||
                        (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
                        delete o._events[i]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    t
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!t || "string" != typeof t.type)
                      throw new Error("DOM Events Exception 0");
                    var e = this,
                      n = t.type;
                    try {
                      if (!t.bubbles) {
                        t.cancelBubble = !0;
                        var o = function (t) {
                          (t.cancelBubble = !0),
                            (e || window).detachEvent("on" + n, o);
                        };
                        this.attachEvent("on" + n, o);
                      }
                      this.fireEvent("on" + n, t);
                    } catch (i) {
                      for (
                        t.target = e;
                        "_events" in (t.currentTarget = e) &&
                          "function" == typeof e._events[n] &&
                          e._events[n].call(e, t),
                          "function" == typeof e["on" + n] &&
                            e["on" + n].call(e, t),
                          (e =
                            9 === e.nodeType ? e.parentWindow : e.parentNode) &&
                            !t.cancelBubble;

                      );
                    }
                    return !0;
                  }),
                  document.attachEvent("onreadystatechange", function () {
                    "complete" === document.readyState &&
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", { bubbles: !0 })
                      );
                  }));
            }
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (p) {
        var t, e, n;
        ("DOMTokenList" in this &&
          (!("classList" in (t = document.createElement("x"))) ||
            (!t.classList.toggle("x", !1) && !t.className))) ||
          (("DOMTokenList" in (e = this) &&
            e.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS("http://www.w3.org/2000/svg", "svg") ||
              document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .classList instanceof DOMTokenList)) ||
            (e.DOMTokenList = (function () {
              var i = !0,
                n = function (t, e, n, o) {
                  Object.defineProperty
                    ? Object.defineProperty(t, e, {
                        configurable: !1 === i || !!o,
                        get: n,
                      })
                    : t.__defineGetter__(e, n);
                };
              try {
                n({}, "support");
              } catch (t) {
                i = !1;
              }
              return function (i, r) {
                var s = this,
                  a = [],
                  c = {},
                  l = 0,
                  t = 0,
                  e = function (t) {
                    n(
                      s,
                      t,
                      function () {
                        return d(), a[t];
                      },
                      !1
                    );
                  },
                  u = function () {
                    if (t <= l) for (; t < l; ++t) e(t);
                  },
                  d = function () {
                    var t,
                      e,
                      n = arguments,
                      o = /\s+/;
                    if (n.length)
                      for (e = 0; e < n.length; ++e)
                        if (o.test(n[e]))
                          throw (
                            (((t = new SyntaxError(
                              'String "' +
                                n[e] +
                                '" contains an invalid character'
                            )).code = 5),
                            (t.name = "InvalidCharacterError"),
                            t)
                          );
                    for (
                      "" ===
                        (a =
                          "object" == typeof i[r]
                            ? ("" + i[r].baseVal)
                                .replace(/^\s+|\s+$/g, "")
                                .split(o)
                            : ("" + i[r])
                                .replace(/^\s+|\s+$/g, "")
                                .split(o))[0] && (a = []),
                        c = {},
                        e = 0;
                      e < a.length;
                      ++e
                    )
                      c[a[e]] = !0;
                    (l = a.length), u();
                  };
                return (
                  d(),
                  n(s, "length", function () {
                    return d(), l;
                  }),
                  (s.toLocaleString = s.toString = function () {
                    return d(), a.join(" ");
                  }),
                  (s.item = function (t) {
                    return d(), a[t];
                  }),
                  (s.contains = function (t) {
                    return d(), !!c[t];
                  }),
                  (s.add = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e, n = 0, o = t.length; n < o; ++n)
                      (e = t[n]), c[e] || (a.push(e), (c[e] = !0));
                    l !== a.length &&
                      ((l = a.length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u());
                  }),
                  (s.remove = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                      (e[t[n]] = !0), delete c[t[n]];
                    for (n = 0; n < a.length; ++n) e[a[n]] || o.push(a[n]);
                    (l = (a = o).length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u();
                  }),
                  (s.toggle = function (t, e) {
                    return (
                      d.apply(s, [t]),
                      p !== e
                        ? e
                          ? (s.add(t), !0)
                          : (s.remove(t), !1)
                        : c[t]
                        ? (s.remove(t), !1)
                        : (s.add(t), !0)
                    );
                  }),
                  s
                );
              };
            })()),
          "classList" in (n = document.createElement("span")) &&
            (n.classList.toggle("x", !1),
            n.classList.contains("x") &&
              (n.classList.constructor.prototype.toggle = function i(t, e) {
                var n = e;
                if (n !== p) return this[(n = !!n) ? "add" : "remove"](t), n;
                var o = !this.contains(t);
                return this[o ? "add" : "remove"](t), o;
              })),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a", "b"), !t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.add;
              t.classList.constructor.prototype.add = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })(),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a"),
              t.classList.add("b"),
              t.classList.remove("a", "b"),
              t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.remove;
              t.classList.constructor.prototype.remove = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })());
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        var t;
        ("document" in this &&
          "classList" in document.documentElement &&
          "Element" in this &&
          "classList" in Element.prototype &&
          ((t = document.createElement("span")).classList.add("a", "b"),
          t.classList.contains("b"))) ||
          (function (t) {
            var u = !0,
              d = function (t, e, n, o) {
                Object.defineProperty
                  ? Object.defineProperty(t, e, {
                      configurable: !1 === u || !!o,
                      get: n,
                    })
                  : t.__defineGetter__(e, n);
              };
            try {
              d({}, "support");
            } catch (e) {
              u = !1;
            }
            var p = function (t, c, l) {
              d(
                t.prototype,
                c,
                function () {
                  var t,
                    e = this,
                    n = "__defineGetter__DEFINE_PROPERTY" + c;
                  if (e[n]) return t;
                  if (!(e[n] = !0) === u) {
                    for (
                      var o,
                        i = p.mirror || document.createElement("div"),
                        r = i.childNodes,
                        s = r.length,
                        a = 0;
                      a < s;
                      ++a
                    )
                      if (r[a]._R === e) {
                        o = r[a];
                        break;
                      }
                    o || (o = i.appendChild(document.createElement("div"))),
                      (t = DOMTokenList.call(o, e, l));
                  } else t = new DOMTokenList(e, l);
                  return (
                    d(e, c, function () {
                      return t;
                    }),
                    delete e[n],
                    t
                  );
                },
                !0
              );
            };
            p(t.Element, "classList", "className"),
              p(t.HTMLElement, "classList", "className"),
              p(t.HTMLLinkElement, "relList", "rel"),
              p(t.HTMLAnchorElement, "relList", "rel"),
              p(t.HTMLAreaElement, "relList", "rel");
          })(this);
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      (t.prototype.init = function () {
        var n = this.$module;
        e(this.$inputs, function (t) {
          var e = t.getAttribute("data-aria-controls");
          e &&
            n.querySelector("#" + e) &&
            (t.setAttribute("aria-controls", e),
            t.removeAttribute("data-aria-controls"));
        }),
          "onpageshow" in window
            ? window.addEventListener(
                "pageshow",
                this.syncAllConditionalReveals.bind(this)
              )
            : window.addEventListener(
                "DOMContentLoaded",
                this.syncAllConditionalReveals.bind(this)
              ),
          this.syncAllConditionalReveals(),
          n.addEventListener("click", this.handleClick.bind(this));
      }),
      (t.prototype.syncAllConditionalReveals = function () {
        e(this.$inputs, this.syncConditionalRevealWithInputState.bind(this));
      }),
      (t.prototype.syncConditionalRevealWithInputState = function (t) {
        var e = document.querySelector("#" + t.getAttribute("aria-controls"));
        if (e && e.classList.contains("govuk-radios__conditional")) {
          var n = t.checked;
          t.setAttribute("aria-expanded", n),
            e.classList.toggle("govuk-radios__conditional--hidden", !n);
        }
      }),
      (t.prototype.handleClick = function (t) {
        var n = t.target;
        "radio" === n.type &&
          e(
            document.querySelectorAll('input[type="radio"][aria-controls]'),
            function (t) {
              var e = t.form === n.form;
              t.name === n.name &&
                e &&
                this.syncConditionalRevealWithInputState(t);
            }.bind(this)
          );
      }),
      t
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (window.GOVUK.Modules.Radios = window.GOVUKFrontend),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function e() {}
    (e.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.$module.actions = {}),
        (this.$module.rememberShownStep = !1),
        (this.$module.stepNavSize = !1),
        (this.$module.sessionStoreLink = "govuk-step-nav-active-link"),
        (this.$module.activeLinkClass = "gem-c-step-nav__list-item--active"),
        (this.$module.activeStepClass = "gem-c-step-nav__step--active"),
        (this.$module.activeLinkHref = "#content"),
        (this.$module.uniqueId = !1),
        this.$module.classList.add("gem-c-step-nav--active"),
        this.$module.classList.remove("js-hidden"),
        (this.$module.stepNavSize = this.$module.classList.contains(
          "gem-c-step-nav--large"
        )
          ? "Big"
          : "Small"),
        (this.$module.rememberShownStep =
          !!this.$module.hasAttribute("data-remember") &&
          "Big" === this.$module.stepNavSize),
        (this.$module.steps = this.$module.querySelectorAll(".js-step")),
        (this.$module.stepHeaders = this.$module.querySelectorAll(
          ".js-toggle-panel"
        )),
        (this.$module.totalSteps = this.$module.querySelectorAll(
          ".js-panel"
        ).length),
        (this.$module.totalLinks = this.$module.querySelectorAll(
          ".gem-c-step-nav__link"
        ).length),
        (this.$module.showOrHideAllButton = !1),
        (this.$module.uniqueId = this.$module.getAttribute("data-id") || !1),
        this.$module.uniqueId &&
          (this.$module.sessionStoreLink =
            this.$module.sessionStoreLink + "_" + this.$module.uniqueId),
        (this.$module.upChevronSvg =
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="gem-c-step-nav__chevron-stroke" d="M19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.499997 15.2467 0.499998 10C0.499999 4.7533 4.7533 0.500001 10 0.500002C15.2467 0.500003 19.5 4.7533 19.5 10Z" stroke="#1D70B8"/><path class="gem-c-step-nav__chevron-stroke" d="M6.32617 12.3262L10 8.65234L13.6738 12.3262" stroke="#1D70B8" stroke-width="2"/></svg>'),
        (this.$module.downChevronSvg =
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="gem-c-step-nav__chevron-stroke" d="M0.499997 10C0.499998 4.75329 4.75329 0.499999 10 0.499999C15.2467 0.5 19.5 4.75329 19.5 10C19.5 15.2467 15.2467 19.5 10 19.5C4.75329 19.5 0.499997 15.2467 0.499997 10Z" stroke="#1D70B8"/><path class="gem-c-step-nav__chevron-stroke" d="M13.6738 8.67383L10 12.3477L6.32617 8.67383" stroke="#1D70B8" stroke-width="2"/></svg>');
      var e = new this.StepNavTracker(
        this.$module.uniqueId,
        this.$module.totalSteps,
        this.$module.totalLinks
      );
      this.getTextForInsertedElements(),
        this.addButtonstoSteps(),
        this.addShowHideAllButton(),
        this.addShowHideToggle(),
        this.addAriaControlsAttrForShowHideAllButton(),
        this.ensureOnlyOneActiveLink(),
        this.showPreviouslyOpenedSteps(),
        this.bindToggleForSteps(e),
        this.bindToggleShowHideAllButton(e),
        this.bindComponentLinkClicks(e);
    }),
      (e.prototype.getTextForInsertedElements = function () {
        (this.$module.actions.showText = this.$module.getAttribute(
          "data-show-text"
        )),
          (this.$module.actions.hideText = this.$module.getAttribute(
            "data-hide-text"
          )),
          (this.$module.actions.showAllText = this.$module.getAttribute(
            "data-show-all-text"
          )),
          (this.$module.actions.hideAllText = this.$module.getAttribute(
            "data-hide-all-text"
          ));
      }),
      (e.prototype.addShowHideAllButton = function () {
        var t = document.createElement("div");
        (t.className = "gem-c-step-nav__controls"),
          (t.innerHTML =
            '<button aria-expanded="false" class="gem-c-step-nav__button gem-c-step-nav__button--controls js-step-controls-button"><span class="gem-c-step-nav__button-text gem-c-step-nav__button-text--all js-step-controls-button-text">' +
            this.$module.actions.showAllText +
            '</span><span class="gem-c-step-nav__chevron js-step-controls-button-icon">' +
            this.$module.downChevronSvg +
            "</span></button>");
        var e = this.$module.querySelectorAll(".gem-c-step-nav__steps")[0];
        this.$module.insertBefore(t, e),
          (this.$module.showOrHideAllButton = this.$module.querySelectorAll(
            ".js-step-controls-button"
          )[0]);
      }),
      (e.prototype.addShowHideToggle = function () {
        for (var t = 0; t < this.$module.stepHeaders.length; t++) {
          var e = this.$module.stepHeaders[t];
          if (!e.querySelectorAll(".js-toggle-link").length) {
            var n = document.createElement("span"),
              o = document.createElement("span"),
              i = document.createElement("span"),
              r = document.createElement("span"),
              s = document.createElement("span"),
              a = document.createElement("span");
            (o.className = "gem-c-step-nav__toggle-link js-toggle-link"),
              (i.className = "gem-c-step-nav__button-text js-toggle-link-text"),
              (r.className = "gem-c-step-nav__chevron js-toggle-link-icon"),
              (s.className = "govuk-visually-hidden"),
              (a.className = "govuk-visually-hidden"),
              o.appendChild(i),
              o.appendChild(r),
              (s.innerHTML = ", "),
              (a.innerHTML = " this section"),
              n.appendChild(s),
              n.appendChild(o),
              n.appendChild(a),
              e.querySelectorAll(".js-step-title-button")[0].appendChild(n);
          }
        }
      }),
      (e.prototype.headerIsOpen = function (t) {
        return void 0 !== t.parentNode.getAttribute("show");
      }),
      (e.prototype.addAriaControlsAttrForShowHideAllButton = function () {
        var t = this.$module
          .querySelectorAll(".js-panel")[0]
          .getAttribute("id");
        this.$module.showOrHideAllButton.setAttribute("aria-controls", t);
      }),
      (e.prototype.setAllStepsShownState = function (t) {
        for (var e = [], n = 0; n < this.$module.steps.length; n++) {
          new this.StepView(this.$module.steps[n], this.$module).setIsShown(t),
            t && e.push(this.$module.steps[n].getAttribute("id"));
        }
        t
          ? this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(e))
          : this.removeFromSessionStorage(this.$module.uniqueId);
      }),
      (e.prototype.showPreviouslyOpenedSteps = function () {
        for (
          var t = this.loadFromSessionStorage(this.$module.uniqueId) || [],
            e = 0;
          e < this.$module.steps.length;
          e++
        ) {
          var n = this.$module.steps[e],
            o = n.getAttribute("id"),
            i = new this.StepView(n, this.$module),
            r = n.hasAttribute("data-show");
          (this.$module.rememberShownStep && -1 < t.indexOf(o)) ||
          (r && "undefined" !== r)
            ? i.setIsShown(!0)
            : i.setIsShown(!1);
        }
        0 < t.length &&
          (this.$module.showOrHideAllButton.setAttribute("aria-expanded", !0),
          this.setShowHideAllText());
      }),
      (e.prototype.addButtonstoSteps = function () {
        for (var t = 0; t < this.$module.steps.length; t++) {
          var e = this.$module.steps[t],
            n = e.querySelectorAll(".js-step-title")[0],
            o = e.querySelectorAll(".js-panel")[0].getAttribute("id"),
            i = n.textContent || n.innerText;
          n.outerHTML =
            '<span class="js-step-title"><button class="gem-c-step-nav__button gem-c-step-nav__button--title js-step-title-button" aria-expanded="false" aria-controls="' +
            o +
            '"><span class="gem-c-step-nav__title-text js-step-title-text">' +
            i +
            "</span></button></span>";
        }
      }),
      (e.prototype.bindToggleForSteps = function (o) {
        for (
          var i = this,
            t = this.$module.querySelectorAll(".js-toggle-panel"),
            e = 0;
          e < t.length;
          e++
        )
          t[e].addEventListener("click", function (t) {
            var e = new i.StepView(this.parentNode, i.$module);
            e.toggle();
            var n = this.parentNode.hasAttribute("data-optional");
            new i.StepToggleClick(
              t,
              e,
              o,
              n,
              i.$module.stepNavSize
            ).trackClick(),
              i.setShowHideAllText(),
              i.rememberStepState(this.parentNode);
          });
      }),
      (e.prototype.rememberStepState = function (t) {
        if (this.$module.rememberShownStep) {
          var e =
              JSON.parse(this.loadFromSessionStorage(this.$module.uniqueId)) ||
              [],
            n = t.getAttribute("id");
          if (t.classList.contains("step-is-shown")) e.push(n);
          else {
            var o = e.indexOf(n);
            -1 < o && e.splice(o, 1);
          }
          this.saveToSessionStorage(this.$module.uniqueId, JSON.stringify(e));
        }
      }),
      (e.prototype.bindComponentLinkClicks = function (n) {
        for (
          var t = this.$module.querySelectorAll(".js-link"), o = this, e = 0;
          e < t.length;
          e++
        )
          t[e].addEventListener("click", function (t) {
            var e = this.getAttribute("data-position");
            new o.ComponentLinkClick(
              t,
              n,
              e,
              o.$module.stepNavSize
            ).trackClick(),
              "external" !== this.getAttribute("rel") &&
                o.saveToSessionStorage(o.$module.sessionStoreLink, e),
              this.getAttribute("href") === o.$module.activeLinkHref &&
                (o.setOnlyThisLinkActive(this), o.setActiveStepClass());
          });
      }),
      (e.prototype.saveToSessionStorage = function (t, e) {
        window.sessionStorage.setItem(t, e);
      }),
      (e.prototype.loadFromSessionStorage = function (t) {
        return window.sessionStorage.getItem(t);
      }),
      (e.prototype.removeFromSessionStorage = function (t) {
        window.sessionStorage.removeItem(t);
      }),
      (e.prototype.setOnlyThisLinkActive = function (t) {
        for (
          var e = this.$module.querySelectorAll(
              "." + this.$module.activeLinkClass
            ),
            n = 0;
          n < e.length;
          n++
        )
          e[n].classList.remove(this.$module.activeLinkClass);
        t.parentNode.classList.add(this.$module.activeLinkClass);
      }),
      (e.prototype.ensureOnlyOneActiveLink = function () {
        var t = this.$module.querySelectorAll(
          ".js-list-item." + this.$module.activeLinkClass
        );
        if (!(t.length <= 1)) {
          var e = this.loadFromSessionStorage(this.$module.sessionStoreLink),
            n = this.$module
              .querySelectorAll("." + this.$module.activeLinkClass)[0]
              .firstChild.getAttribute("data-position"),
            o = e || n,
            i = this.$module.querySelectorAll('[data-position="' + o + '"]')[0];
          i
            ? i.parentNode.classList.contains(this.$module.activeLinkClass) ||
              (o = i)
            : (o = n),
            this.removeActiveStateFromAllButCurrent(t, o),
            this.setActiveStepClass();
        }
      }),
      (e.prototype.removeActiveStateFromAllButCurrent = function (t, e) {
        for (var n = 0; n < t.length; n++) {
          var o = t[n];
          if (
            o
              .querySelectorAll(".js-link")[0]
              .getAttribute("data-position")
              .toString() !== e.toString()
          ) {
            o.classList.remove(this.$module.activeLinkClass);
            var i = o.querySelectorAll(".visuallyhidden");
            i.length && i[0].parentNode.removeChild(i[0]);
          }
        }
      }),
      (e.prototype.setActiveStepClass = function () {
        for (
          var t = this.$module.querySelectorAll(
              "." + this.$module.activeStepClass
            ),
            e = 0;
          e < t.length;
          e++
        )
          t[e].classList.remove(this.$module.activeStepClass),
            t[e].removeAttribute("data-show");
        var n = this.$module.querySelectorAll(
          "." + this.$module.activeLinkClass
        )[0];
        if (n) {
          var o = n.closest(".gem-c-step-nav__step");
          o.classList.add(this.$module.activeStepClass),
            o.setAttribute("data-show", "");
        }
      }),
      (e.prototype.bindToggleShowHideAllButton = function (e) {
        var n = this;
        this.$module.showOrHideAllButton.addEventListener("click", function () {
          var t =
            (this.textContent || this.innerText) ===
            n.$module.actions.showAllText;
          return (
            e.trackClick(
              "pageElementInteraction",
              t ? "stepNavAllShown" : "stepNavAllHidden",
              {
                label:
                  (t
                    ? n.$module.actions.showAllText
                    : n.$module.actions.hideAllText) +
                  ": " +
                  n.$module.stepNavSize,
              }
            ),
            n.setAllStepsShownState(t),
            n.$module.showOrHideAllButton.setAttribute("aria-expanded", t),
            n.setShowHideAllText(),
            !1
          );
        });
      }),
      (e.prototype.setShowHideAllText = function () {
        var t =
          this.$module.querySelectorAll(".step-is-shown").length ===
          this.$module.totalSteps;
        (this.$module.showOrHideAllButton.querySelector(
          ".js-step-controls-button-text"
        ).innerHTML = t
          ? this.$module.actions.hideAllText
          : this.$module.actions.showAllText),
          (this.$module.showOrHideAllButton.querySelector(
            ".js-step-controls-button-icon"
          ).innerHTML = t
            ? this.$module.upChevronSvg
            : this.$module.downChevronSvg);
      }),
      (e.prototype.StepView = function (t, e) {
        (this.stepElement = t),
          (this.stepContent = this.stepElement.querySelectorAll(
            ".js-panel"
          )[0]),
          (this.titleButton = this.stepElement.querySelectorAll(
            ".js-step-title-button"
          )[0]);
        var n = this.stepElement.querySelectorAll(".js-step-title-text")[0];
        (this.title = n.textContent || n.innerText),
          (this.title = this.title.replace(/^\s+|\s+$/g, "")),
          (this.showText = e.actions.showText),
          (this.hideText = e.actions.hideText),
          (this.upChevronSvg = e.upChevronSvg),
          (this.downChevronSvg = e.downChevronSvg),
          (this.show = function () {
            this.setIsShown(!0);
          }),
          (this.hide = function () {
            this.setIsShown(!1);
          }),
          (this.toggle = function () {
            this.setIsShown(this.isHidden());
          }),
          (this.setIsShown = function (t) {
            t
              ? (this.stepElement.classList.add("step-is-shown"),
                this.stepContent.classList.remove("js-hidden"))
              : (this.stepElement.classList.remove("step-is-shown"),
                this.stepContent.classList.add("js-hidden")),
              this.titleButton.setAttribute("aria-expanded", t);
            var e = this.stepElement.querySelectorAll(".js-toggle-link")[0];
            (e.querySelector(".js-toggle-link-text").innerHTML = t
              ? this.hideText
              : this.showText),
              (e.querySelector(".js-toggle-link-icon").innerHTML = t
                ? this.upChevronSvg
                : this.downChevronSvg);
          }),
          (this.isShown = function () {
            return this.stepElement.classList.contains("step-is-shown");
          }),
          (this.isHidden = function () {
            return !this.isShown();
          }),
          (this.numberOfContentItems = function () {
            return this.stepContent.querySelectorAll(".js-link").length;
          });
      }),
      (e.prototype.StepToggleClick = function (t, e, n, o, i) {
        (this.target = t.target),
          (this.stepIsOptional = o),
          (this.stepNavSize = i),
          (this.trackClick = function () {
            var t = {
              label: this.trackingLabel(),
              dimension28: e.numberOfContentItems().toString(),
            };
            n.trackClick("pageElementInteraction", this.trackingAction(), t);
          }),
          (this.trackingLabel = function () {
            return (
              this.target
                .closest(".js-step")
                .querySelectorAll(".js-toggle-panel")[0]
                .getAttribute("data-position") +
              " - " +
              e.title +
              " - " +
              this.locateClickElement() +
              ": " +
              this.stepNavSize +
              this.isOptional()
            );
          }),
          (this.stepIndex = function () {
            return this.$module.steps.index(e.element) + 1;
          }),
          (this.trackingAction = function () {
            return e.isHidden() ? "stepNavHidden" : "stepNavShown";
          }),
          (this.locateClickElement = function () {
            return this.clickedOnIcon()
              ? this.iconType() + " click"
              : this.clickedOnHeading()
              ? "Heading click"
              : "Elsewhere click";
          }),
          (this.clickedOnIcon = function () {
            return this.target.classList.contains("js-toggle-link");
          }),
          (this.clickedOnHeading = function () {
            return this.target.classList.contains("js-step-title-text");
          }),
          (this.iconType = function () {
            return e.isHidden() ? "Minus" : "Plus";
          }),
          (this.isOptional = function () {
            return this.stepIsOptional ? " ; optional" : "";
          });
      }),
      (e.prototype.ComponentLinkClick = function (t, n, o, e) {
        (this.size = e),
          (this.target = t.target),
          (this.trackClick = function () {
            var t = {
                label: this.target.getAttribute("href") + " : " + this.size,
              },
              e = this.target
                .closest(".gem-c-step-nav__list")
                .getAttribute("data-length");
            e && (t.dimension28 = e), n.trackClick("stepNavLinkClicked", o, t);
          });
      }),
      (e.prototype.StepNavTracker = function (t, e, n) {
        (this.totalSteps = e),
          (this.totalLinks = n),
          (this.uniqueId = t),
          (this.trackClick = function (t, e, n) {
            window.GOVUK.analytics &&
              window.GOVUK.analytics.trackEvent &&
              (((n = n || {}).dimension26 =
                n.dimension26 || this.totalSteps.toString()),
              (n.dimension27 = n.dimension27 || this.totalLinks.toString()),
              (n.dimension96 = n.dimension96 || this.uniqueId),
              window.GOVUK.analytics.trackEvent(t, e, n));
          });
      }),
      (t.Gemstepnav = e);
  })(window.GOVUK.Modules),
  (function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = e())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", e)
      : (t.GOVUKFrontend = e());
  })(this, function () {
    "use strict";
    function r(t, e) {
      if (window.NodeList.prototype.forEach) return t.forEach(e);
      for (var n = 0; n < t.length; n++) e.call(window, t[n], n, t);
    }
    function t(t) {
      (this.$module = t),
        (this.$tabs = t.querySelectorAll(".govuk-tabs__tab")),
        (this.keys = { left: 37, right: 39, up: 38, down: 40 }),
        (this.jsHiddenClass = "govuk-tabs__panel--hidden");
    }
    return (
      function () {
        var a, c, l, u;
        ("defineProperty" in Object &&
          (function () {
            try {
              var t = {};
              return Object.defineProperty(t, "test", { value: 42 }), !0;
            } catch (e) {
              return !1;
            }
          })()) ||
          ((a = Object.defineProperty),
          (c = Object.prototype.hasOwnProperty("__defineGetter__")),
          (l = "Getters & setters cannot be defined on this javascript engine"),
          (u =
            "A property cannot both have accessors and be writable or have a value"),
          (Object.defineProperty = function d(t, e, n) {
            if (
              a &&
              (t === window ||
                t === document ||
                t === Element.prototype ||
                t instanceof Element)
            )
              return a(t, e, n);
            if (null === t || !(t instanceof Object || "object" == typeof t))
              throw new TypeError("Object.defineProperty called on non-object");
            if (!(n instanceof Object))
              throw new TypeError("Property description must be an object");
            var o = String(e),
              i = "value" in n || "writable" in n,
              r = "get" in n && typeof n.get,
              s = "set" in n && typeof n.set;
            if (r) {
              if ("function" !== r)
                throw new TypeError("Getter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineGetter__.call(t, o, n.get);
            } else t[o] = n.value;
            if (s) {
              if ("function" !== s)
                throw new TypeError("Setter must be a function");
              if (!c) throw new TypeError(l);
              if (i) throw new TypeError(u);
              Object.__defineSetter__.call(t, o, n.set);
            }
            return "value" in n && (t[o] = n.value), t;
          }));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function O(e) {
              var n,
                t = Array,
                o = Object,
                i = o.prototype,
                r = t.prototype,
                s = function s() {},
                a = i.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                l = Function.prototype.toString,
                u = function u(t) {
                  try {
                    return l.call(t), !0;
                  } catch (e) {
                    return !1;
                  }
                },
                d = "[object Function]",
                p = "[object GeneratorFunction]";
              n = function n(t) {
                if ("function" != typeof t) return !1;
                if (c) return u(t);
                var e = a.call(t);
                return e === d || e === p;
              };
              var h = r.slice,
                f = r.concat,
                m = r.push,
                v = Math.max,
                g = this;
              if (!n(g))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + g
                );
              for (
                var b,
                  y = h.call(arguments, 1),
                  w = function () {
                    if (this instanceof b) {
                      var t = g.apply(this, f.call(y, h.call(arguments)));
                      return o(t) === t ? t : this;
                    }
                    return g.apply(e, f.call(y, h.call(arguments)));
                  },
                  E = v(0, g.length - y.length),
                  k = [],
                  L = 0;
                L < E;
                L++
              )
                m.call(k, "$" + L);
              return (
                (b = Function(
                  "binder",
                  "return function (" +
                    k.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                g.prototype &&
                  ((s.prototype = g.prototype),
                  (b.prototype = new s()),
                  (s.prototype = null)),
                b
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (p) {
        var t, e, n;
        ("DOMTokenList" in this &&
          (!("classList" in (t = document.createElement("x"))) ||
            (!t.classList.toggle("x", !1) && !t.className))) ||
          (("DOMTokenList" in (e = this) &&
            e.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS("http://www.w3.org/2000/svg", "svg") ||
              document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .classList instanceof DOMTokenList)) ||
            (e.DOMTokenList = (function () {
              var i = !0,
                n = function (t, e, n, o) {
                  Object.defineProperty
                    ? Object.defineProperty(t, e, {
                        configurable: !1 === i || !!o,
                        get: n,
                      })
                    : t.__defineGetter__(e, n);
                };
              try {
                n({}, "support");
              } catch (t) {
                i = !1;
              }
              return function (i, r) {
                var s = this,
                  a = [],
                  c = {},
                  l = 0,
                  t = 0,
                  e = function (t) {
                    n(
                      s,
                      t,
                      function () {
                        return d(), a[t];
                      },
                      !1
                    );
                  },
                  u = function () {
                    if (t <= l) for (; t < l; ++t) e(t);
                  },
                  d = function () {
                    var t,
                      e,
                      n = arguments,
                      o = /\s+/;
                    if (n.length)
                      for (e = 0; e < n.length; ++e)
                        if (o.test(n[e]))
                          throw (
                            (((t = new SyntaxError(
                              'String "' +
                                n[e] +
                                '" contains an invalid character'
                            )).code = 5),
                            (t.name = "InvalidCharacterError"),
                            t)
                          );
                    for (
                      "" ===
                        (a =
                          "object" == typeof i[r]
                            ? ("" + i[r].baseVal)
                                .replace(/^\s+|\s+$/g, "")
                                .split(o)
                            : ("" + i[r])
                                .replace(/^\s+|\s+$/g, "")
                                .split(o))[0] && (a = []),
                        c = {},
                        e = 0;
                      e < a.length;
                      ++e
                    )
                      c[a[e]] = !0;
                    (l = a.length), u();
                  };
                return (
                  d(),
                  n(s, "length", function () {
                    return d(), l;
                  }),
                  (s.toLocaleString = s.toString = function () {
                    return d(), a.join(" ");
                  }),
                  (s.item = function (t) {
                    return d(), a[t];
                  }),
                  (s.contains = function (t) {
                    return d(), !!c[t];
                  }),
                  (s.add = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e, n = 0, o = t.length; n < o; ++n)
                      (e = t[n]), c[e] || (a.push(e), (c[e] = !0));
                    l !== a.length &&
                      ((l = a.length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u());
                  }),
                  (s.remove = function () {
                    d.apply(s, (t = arguments));
                    for (var t, e = {}, n = 0, o = []; n < t.length; ++n)
                      (e[t[n]] = !0), delete c[t[n]];
                    for (n = 0; n < a.length; ++n) e[a[n]] || o.push(a[n]);
                    (l = (a = o).length >>> 0),
                      "object" == typeof i[r]
                        ? (i[r].baseVal = a.join(" "))
                        : (i[r] = a.join(" ")),
                      u();
                  }),
                  (s.toggle = function (t, e) {
                    return (
                      d.apply(s, [t]),
                      p !== e
                        ? e
                          ? (s.add(t), !0)
                          : (s.remove(t), !1)
                        : c[t]
                        ? (s.remove(t), !1)
                        : (s.add(t), !0)
                    );
                  }),
                  s
                );
              };
            })()),
          "classList" in (n = document.createElement("span")) &&
            (n.classList.toggle("x", !1),
            n.classList.contains("x") &&
              (n.classList.constructor.prototype.toggle = function i(t, e) {
                var n = e;
                if (n !== p) return this[(n = !!n) ? "add" : "remove"](t), n;
                var o = !this.contains(t);
                return this[o ? "add" : "remove"](t), o;
              })),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a", "b"), !t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.add;
              t.classList.constructor.prototype.add = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })(),
          (function () {
            var t = document.createElement("span");
            if (
              "classList" in t &&
              (t.classList.add("a"),
              t.classList.add("b"),
              t.classList.remove("a", "b"),
              t.classList.contains("b"))
            ) {
              var o = t.classList.constructor.prototype.remove;
              t.classList.constructor.prototype.remove = function () {
                for (var t = arguments, e = arguments.length, n = 0; n < e; n++)
                  o.call(this, t[n]);
              };
            }
          })());
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Document" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (this.HTMLDocument
              ? (this.Document = this.HTMLDocument)
              : ((this.Document = this.HTMLDocument = document.constructor = new Function(
                  "return function Document() {}"
                )()),
                (this.Document.prototype = document))));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("Element" in this && "HTMLElement" in this) ||
          (function () {
            function t() {
              return (
                r-- || clearTimeout(e),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (l(document, !0),
                  e && document.body.prototype && clearTimeout(e),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var e,
                n = document.appendChild(document.createElement("body")),
                o = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                a = (Element.prototype = o.appendChild(o.createElement("*"))),
                c = {},
                l = function (t, e) {
                  var n,
                    o,
                    i,
                    r = t.childNodes || [],
                    s = -1;
                  if (1 === t.nodeType && t.constructor !== Element)
                    for (n in ((t.constructor = Element), c))
                      (o = c[n]), (t[n] = o);
                  for (; (i = e && r[++s]); ) l(i, e);
                  return t;
                },
                u = document.getElementsByTagName("*"),
                i = document.createElement,
                r = 100;
              a.attachEvent("onpropertychange", function (t) {
                for (
                  var e,
                    n = t.propertyName,
                    o = !c.hasOwnProperty(n),
                    i = a[n],
                    r = c[n],
                    s = -1;
                  (e = u[++s]);

                )
                  1 === e.nodeType && (o || e[n] === r) && (e[n] = i);
                c[n] = i;
              }),
                (a.constructor = Element),
                a.hasAttribute ||
                  (a.hasAttribute = function s(t) {
                    return null !== this.getAttribute(t);
                  }),
                t() ||
                  ((document.onreadystatechange = t), (e = setInterval(t, 25))),
                (document.createElement = function d(t) {
                  var e = i(String(t).toLowerCase());
                  return l(e);
                }),
                document.removeChild(n);
            } else window.HTMLElement = window.Element;
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        var t;
        ("document" in this &&
          "classList" in document.documentElement &&
          "Element" in this &&
          "classList" in Element.prototype &&
          ((t = document.createElement("span")).classList.add("a", "b"),
          t.classList.contains("b"))) ||
          (function (t) {
            var u = !0,
              d = function (t, e, n, o) {
                Object.defineProperty
                  ? Object.defineProperty(t, e, {
                      configurable: !1 === u || !!o,
                      get: n,
                    })
                  : t.__defineGetter__(e, n);
              };
            try {
              d({}, "support");
            } catch (e) {
              u = !1;
            }
            var p = function (t, c, l) {
              d(
                t.prototype,
                c,
                function () {
                  var t,
                    e = this,
                    n = "__defineGetter__DEFINE_PROPERTY" + c;
                  if (e[n]) return t;
                  if (!(e[n] = !0) === u) {
                    for (
                      var o,
                        i = p.mirror || document.createElement("div"),
                        r = i.childNodes,
                        s = r.length,
                        a = 0;
                      a < s;
                      ++a
                    )
                      if (r[a]._R === e) {
                        o = r[a];
                        break;
                      }
                    o || (o = i.appendChild(document.createElement("div"))),
                      (t = DOMTokenList.call(o, e, l));
                  } else t = new DOMTokenList(e, l);
                  return (
                    d(e, c, function () {
                      return t;
                    }),
                    delete e[n],
                    t
                  );
                },
                !0
              );
            };
            p(t.Element, "classList", "className"),
              p(t.HTMLElement, "classList", "className"),
              p(t.HTMLLinkElement, "relList", "rel"),
              p(t.HTMLAnchorElement, "relList", "rel"),
              p(t.HTMLAreaElement, "relList", "rel");
          })(this);
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("document" in this &&
          "nextElementSibling" in document.documentElement) ||
          Object.defineProperty(Element.prototype, "nextElementSibling", {
            get: function () {
              for (var t = this.nextSibling; t && 1 !== t.nodeType; )
                t = t.nextSibling;
              return t;
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        ("document" in this &&
          "previousElementSibling" in document.documentElement) ||
          Object.defineProperty(Element.prototype, "previousElementSibling", {
            get: function () {
              for (var t = this.previousSibling; t && 1 !== t.nodeType; )
                t = t.previousSibling;
              return t;
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "Window" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (function (t) {
              t.constructor
                ? (t.Window = t.constructor)
                : ((t.Window = t.constructor = new Function(
                    "return function Window() {}"
                  )()).prototype = this);
            })(this));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (l) {
        (function (t) {
          if (!("Event" in t)) return !1;
          if ("function" == typeof t.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (e) {
            return !1;
          }
        })(this) ||
          (function () {
            function u(t, e) {
              for (var n = -1, o = t.length; ++n < o; )
                if (n in t && t[n] === e) return n;
              return -1;
            }
            var i = {
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
              textinput: 1,
            };
            if (
              "undefined" != typeof document &&
              "undefined" != typeof window
            ) {
              var t = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function r(t, e) {
                if (!t) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var o = !(!e || e.bubbles === l) && e.bubbles,
                    i = !(!e || e.cancelable === l) && e.cancelable;
                  return n.initEvent(t, o, i), n;
                }
                return (
                  ((n = document.createEventObject()).type = t),
                  (n.bubbles = !(!e || e.bubbles === l) && e.bubbles),
                  (n.cancelable = !(!e || e.cancelable === l) && e.cancelable),
                  n
                );
              }),
                t &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: t,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function s(
                    t,
                    e
                  ) {
                    var l = this,
                      n = t,
                      o = e;
                    if (l === window && n in i)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    l._events || (l._events = {}),
                      l._events[n] ||
                        ((l._events[n] = function (t) {
                          var e,
                            n = l._events[t.type].list,
                            o = n.slice(),
                            i = -1,
                            r = o.length;
                          for (
                            t.preventDefault = function s() {
                              !1 !== t.cancelable && (t.returnValue = !1);
                            },
                              t.stopPropagation = function a() {
                                t.cancelBubble = !0;
                              },
                              t.stopImmediatePropagation = function c() {
                                (t.cancelBubble = !0), (t.cancelImmediate = !0);
                              },
                              t.currentTarget = l,
                              t.relatedTarget = t.fromElement || null,
                              t.target = t.target || t.srcElement || l,
                              t.timeStamp = new Date().getTime(),
                              t.clientX &&
                                ((t.pageX =
                                  t.clientX +
                                  document.documentElement.scrollLeft),
                                (t.pageY =
                                  t.clientY +
                                  document.documentElement.scrollTop));
                            ++i < r && !t.cancelImmediate;

                          )
                            i in o &&
                              -1 !== u(n, (e = o[i])) &&
                              "function" == typeof e &&
                              e.call(l, t);
                        }),
                        (l._events[n].list = []),
                        l.attachEvent && l.attachEvent("on" + n, l._events[n])),
                      l._events[n].list.push(o);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function a(
                    t,
                    e
                  ) {
                    var n,
                      o = this,
                      i = t,
                      r = e;
                    o._events &&
                      o._events[i] &&
                      o._events[i].list &&
                      -1 !== (n = u(o._events[i].list, r)) &&
                      (o._events[i].list.splice(n, 1),
                      o._events[i].list.length ||
                        (o.detachEvent && o.detachEvent("on" + i, o._events[i]),
                        delete o._events[i]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    t
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!t || "string" != typeof t.type)
                      throw new Error("DOM Events Exception 0");
                    var e = this,
                      n = t.type;
                    try {
                      if (!t.bubbles) {
                        t.cancelBubble = !0;
                        var o = function (t) {
                          (t.cancelBubble = !0),
                            (e || window).detachEvent("on" + n, o);
                        };
                        this.attachEvent("on" + n, o);
                      }
                      this.fireEvent("on" + n, t);
                    } catch (i) {
                      for (
                        t.target = e;
                        "_events" in (t.currentTarget = e) &&
                          "function" == typeof e._events[n] &&
                          e._events[n].call(e, t),
                          "function" == typeof e["on" + n] &&
                            e["on" + n].call(e, t),
                          (e =
                            9 === e.nodeType ? e.parentWindow : e.parentNode) &&
                            !t.cancelBubble;

                      );
                    }
                    return !0;
                  }),
                  document.attachEvent("onreadystatechange", function () {
                    "complete" === document.readyState &&
                      document.dispatchEvent(
                        new Event("DOMContentLoaded", { bubbles: !0 })
                      );
                  }));
            }
          })();
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      (t.prototype.init = function () {
        "function" == typeof window.matchMedia
          ? this.setupResponsiveChecks()
          : this.setup();
      }),
      (t.prototype.setupResponsiveChecks = function () {
        (this.mql = window.matchMedia("(min-width: 40.0625em)")),
          this.mql.addListener(this.checkMode.bind(this)),
          this.checkMode();
      }),
      (t.prototype.checkMode = function () {
        this.mql.matches ? this.setup() : this.teardown();
      }),
      (t.prototype.setup = function () {
        var t = this.$module,
          e = this.$tabs,
          n = t.querySelector(".govuk-tabs__list"),
          o = t.querySelectorAll(".govuk-tabs__list-item");
        if (e && n && o) {
          n.setAttribute("role", "tablist"),
            r(o, function (t) {
              t.setAttribute("role", "presentation");
            }),
            r(
              e,
              function (t) {
                this.setAttributes(t),
                  (t.boundTabClick = this.onTabClick.bind(this)),
                  (t.boundTabKeydown = this.onTabKeydown.bind(this)),
                  t.addEventListener("click", t.boundTabClick, !0),
                  t.addEventListener("keydown", t.boundTabKeydown, !0),
                  this.hideTab(t);
              }.bind(this)
            );
          var i = this.getTab(window.location.hash) || this.$tabs[0];
          this.showTab(i),
            (t.boundOnHashChange = this.onHashChange.bind(this)),
            window.addEventListener("hashchange", t.boundOnHashChange, !0);
        }
      }),
      (t.prototype.teardown = function () {
        var t = this.$module,
          e = this.$tabs,
          n = t.querySelector(".govuk-tabs__list"),
          o = t.querySelectorAll(".govuk-tabs__list-item");
        e &&
          n &&
          o &&
          (n.removeAttribute("role"),
          r(o, function (t) {
            t.removeAttribute("role", "presentation");
          }),
          r(
            e,
            function (t) {
              t.removeEventListener("click", t.boundTabClick, !0),
                t.removeEventListener("keydown", t.boundTabKeydown, !0),
                this.unsetAttributes(t);
            }.bind(this)
          ),
          window.removeEventListener("hashchange", t.boundOnHashChange, !0));
      }),
      (t.prototype.onHashChange = function () {
        var t = window.location.hash,
          e = this.getTab(t);
        if (e)
          if (this.changingHash) this.changingHash = !1;
          else {
            var n = this.getCurrentTab();
            this.hideTab(n), this.showTab(e), e.focus();
          }
      }),
      (t.prototype.hideTab = function (t) {
        this.unhighlightTab(t), this.hidePanel(t);
      }),
      (t.prototype.showTab = function (t) {
        this.highlightTab(t), this.showPanel(t);
      }),
      (t.prototype.getTab = function (t) {
        return this.$module.querySelector('.govuk-tabs__tab[href="' + t + '"]');
      }),
      (t.prototype.setAttributes = function (t) {
        var e = this.getHref(t).slice(1);
        t.setAttribute("id", "tab_" + e),
          t.setAttribute("role", "tab"),
          t.setAttribute("aria-controls", e),
          t.setAttribute("aria-selected", "false"),
          t.setAttribute("tabindex", "-1");
        var n = this.getPanel(t);
        n.setAttribute("role", "tabpanel"),
          n.setAttribute("aria-labelledby", t.id),
          n.classList.add(this.jsHiddenClass);
      }),
      (t.prototype.unsetAttributes = function (t) {
        t.removeAttribute("id"),
          t.removeAttribute("role"),
          t.removeAttribute("aria-controls"),
          t.removeAttribute("aria-selected"),
          t.removeAttribute("tabindex");
        var e = this.getPanel(t);
        e.removeAttribute("role"),
          e.removeAttribute("aria-labelledby"),
          e.classList.remove(this.jsHiddenClass);
      }),
      (t.prototype.onTabClick = function (t) {
        if (!t.target.classList.contains("govuk-tabs__tab")) return !1;
        t.preventDefault();
        var e = t.target,
          n = this.getCurrentTab();
        this.hideTab(n), this.showTab(e), this.createHistoryEntry(e);
      }),
      (t.prototype.createHistoryEntry = function (t) {
        var e = this.getPanel(t),
          n = e.id;
        (e.id = ""),
          (this.changingHash = !0),
          (window.location.hash = this.getHref(t).slice(1)),
          (e.id = n);
      }),
      (t.prototype.onTabKeydown = function (t) {
        switch (t.keyCode) {
          case this.keys.left:
          case this.keys.up:
            this.activatePreviousTab(), t.preventDefault();
            break;
          case this.keys.right:
          case this.keys.down:
            this.activateNextTab(), t.preventDefault();
        }
      }),
      (t.prototype.activateNextTab = function () {
        var t = this.getCurrentTab(),
          e = t.parentNode.nextElementSibling;
        if (e) var n = e.querySelector(".govuk-tabs__tab");
        n &&
          (this.hideTab(t),
          this.showTab(n),
          n.focus(),
          this.createHistoryEntry(n));
      }),
      (t.prototype.activatePreviousTab = function () {
        var t = this.getCurrentTab(),
          e = t.parentNode.previousElementSibling;
        if (e) var n = e.querySelector(".govuk-tabs__tab");
        n &&
          (this.hideTab(t),
          this.showTab(n),
          n.focus(),
          this.createHistoryEntry(n));
      }),
      (t.prototype.getPanel = function (t) {
        return this.$module.querySelector(this.getHref(t));
      }),
      (t.prototype.showPanel = function (t) {
        this.getPanel(t).classList.remove(this.jsHiddenClass);
      }),
      (t.prototype.hidePanel = function (t) {
        this.getPanel(t).classList.add(this.jsHiddenClass);
      }),
      (t.prototype.unhighlightTab = function (t) {
        t.setAttribute("aria-selected", "false"),
          t.parentNode.classList.remove("govuk-tabs__list-item--selected"),
          t.setAttribute("tabindex", "-1");
      }),
      (t.prototype.highlightTab = function (t) {
        t.setAttribute("aria-selected", "true"),
          t.parentNode.classList.add("govuk-tabs__list-item--selected"),
          t.setAttribute("tabindex", "0");
      }),
      (t.prototype.getCurrentTab = function () {
        return this.$module.querySelector(
          ".govuk-tabs__list-item--selected .govuk-tabs__tab"
        );
      }),
      (t.prototype.getHref = function (t) {
        var e = t.getAttribute("href");
        return e.slice(e.indexOf("#"), e.length);
      }),
      t
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (window.GOVUK.Modules.Tabs = window.GOVUKFrontend),
  (function () {
    "use strict";
    (window.GOVUK = window.GOVUK || {}),
      (window.GOVUK.Transactions = {
        trackStartPageTabs: function (t) {
          var e = t.target.href;
          GOVUK.analytics.trackEvent("startpages", "tab", {
            label: e,
            nonInteraction: !0,
          });
        },
        appendGaClientIdToAskSurvey: function () {
          window.ga &&
            $(
              '.transaction a[href="https://surveys.publishing.service.gov.uk/ss/govuk-coronavirus-ask"]'
            ).each(function () {
              var e = $(this);
              window.ga(function (t) {
                e.prop("search", "?_ga=" + t.get("clientId"));
              });
            });
        },
      }),
      $(document).ready(function () {
        $("form#completed-transaction-form")
          .append(
            '<input type="hidden" name="service_feedback[javascript_enabled]" value="true"/>'
          )
          .append(
            $('<input type="hidden" name="referrer">').val(
              document.referrer || "unknown"
            )
          ),
          $('#completed-transaction-form button[type="submit"]').click(
            function () {
              $(this).attr("disabled", "disabled"),
                $(this).parents("form").submit();
            }
          ),
          $(".transaction .govuk-tabs__tab").click(
            window.GOVUK.Transactions.trackStartPageTabs
          ),
          window.GOVUK.Transactions.appendGaClientIdToAskSurvey();
      });
  })(),
  "undefined" == typeof window.GOVUK && (window.GOVUK = {}),
  "undefined" == typeof window.GOVUK.support && (window.GOVUK.support = {}),
  (window.GOVUK.support.history = function () {
    return (
      window.history && window.history.pushState && window.history.replaceState
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (t) {
    function o() {}
    (o.prototype.start = function (t) {
      (this.$module = t[0]),
        (this.$module.submitSettingsForm = this.submitSettingsForm.bind(this)),
        document
          .querySelector("form[data-module=cookie-settings]")
          .addEventListener("submit", this.$module.submitSettingsForm),
        this.setInitialFormValues();
    }),
      (o.prototype.setInitialFormValues = function () {
        window.GOVUK.cookie("cookies_policy") ||
          window.GOVUK.setDefaultConsentCookie();
        var t = window.GOVUK.cookie("cookies_policy"),
          e = JSON.parse(t);
        for (var n in (delete e.essential, e)) {
          (e[n]
            ? document.querySelector("input[name=cookies-" + n + "][value=on]")
            : document.querySelector("input[name=cookies-" + n + "][value=off]")
          ).checked = !0;
        }
      }),
      (o.prototype.submitSettingsForm = function (t) {
        t.preventDefault();
        for (
          var e = t.target.getElementsByTagName("input"), n = {}, o = 0;
          o < e.length;
          o++
        ) {
          var i = e[o];
          if (i.checked) {
            var r = i.name.replace("cookies-", ""),
              s = "on" === i.value;
            n[r] = s;
          }
        }
        return (
          window.GOVUK.setConsentCookie(n),
          window.GOVUK.setCookie("cookies_preferences_set", !0, { days: 365 }),
          this.fireAnalyticsEvent(n),
          this.showConfirmationMessage(),
          !1
        );
      }),
      (o.prototype.fireAnalyticsEvent = function (t) {
        var e = "";
        for (var n in t) {
          e += n + "-" + (t[n] ? "yes" : "no") + " ";
        }
        GOVUK.analytics &&
          GOVUK.analytics.trackEvent &&
          GOVUK.analytics.trackEvent("cookieSettings", "Save changes", {
            label: e,
          });
      }),
      (o.prototype.showConfirmationMessage = function () {
        var t = document.querySelector("div[data-cookie-confirmation]");
        t.style.display = "none";
        var e = document.querySelector(".cookie-settings__prev-page"),
          n = o.prototype.getReferrerLink();
        (document.body.scrollTop = document.documentElement.scrollTop = 0),
          n && n !== document.location.pathname
            ? ((e.href = n), (e.style.display = "inline"))
            : (e.style.display = "none"),
          (t.style.display = "block");
      }),
      (o.prototype.getReferrerLink = function () {
        return !!document.referrer && new URL(document.referrer).pathname;
      }),
      (t.CookieSettings = o);
  })(window.GOVUK.Modules),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function () {
    "use strict";
    window.GOVUK.Modules.TrackSmartAnswer = function () {
      (this.start = function (t) {
        var e = t.data("smart-answer-node-type"),
          n = t.data("smart-answer-slug");
        if (e !== undefined && n !== undefined) {
          var o = { label: n, nonInteraction: !0, page: this.currentPath() },
            i = function (t, e) {
              GOVUK.analytics &&
                GOVUK.analytics.trackEvent &&
                GOVUK.analytics.trackEvent(t, e, o);
            };
          switch (e) {
            case "outcome":
              i("Simple Smart Answer", "Completed", o);
          }
        }
      }),
        (this.currentPath = function () {
          return window.location.pathname;
        });
    };
  })(),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function () {
    "use strict";
    window.GOVUK.Modules.TrackSubmit = function () {
      this.start = function (t) {
        function e() {
          GOVUK.analytics &&
            GOVUK.analytics.trackEvent &&
            GOVUK.analytics.trackEvent(n, o);
        }
        t.on("submit", "form", e);
        var n = t.data("track-category"),
          o = t.data("track-action");
      };
    };
  })();
