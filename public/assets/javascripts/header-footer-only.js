function parseCookie(e) {
  var t = JSON.parse(e);
  return "object" != typeof t && (t = JSON.parse(t)), t;
}
!(function (e) {
  var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    l = function (e) {
      e = e.replace(/\x0d\x0a/g, "\n");
      for (var t = "", n = 0; n < e.length; n++) {
        var i = e.charCodeAt(n);
        i < 128
          ? (t += String.fromCharCode(i))
          : (127 < i && i < 2048
              ? (t += String.fromCharCode((i >> 6) | 192))
              : ((t += String.fromCharCode((i >> 12) | 224)),
                (t += String.fromCharCode(((i >> 6) & 63) | 128))),
            (t += String.fromCharCode((63 & i) | 128)));
      }
      return t;
    },
    u = function (e) {
      for (var t = "", n = 0, i = (c1 = c2 = 0); n < e.length; )
        (i = e.charCodeAt(n)) < 128
          ? ((t += String.fromCharCode(i)), n++)
          : 191 < i && i < 224
          ? ((c2 = e.charCodeAt(n + 1)),
            (t += String.fromCharCode(((31 & i) << 6) | (63 & c2))),
            (n += 2))
          : ((c2 = e.charCodeAt(n + 1)),
            (c3 = e.charCodeAt(n + 2)),
            (t += String.fromCharCode(
              ((15 & i) << 12) | ((63 & c2) << 6) | (63 & c3)
            )),
            (n += 3));
      return t;
    };
  e.extend({
    base64Encode: function (e) {
      var t,
        n,
        i,
        o,
        a,
        r,
        s,
        c = "",
        u = 0;
      for (e = l(e); u < e.length; )
        (o = (t = e.charCodeAt(u++)) >> 2),
          (a = ((3 & t) << 4) | ((n = e.charCodeAt(u++)) >> 4)),
          (r = ((15 & n) << 2) | ((i = e.charCodeAt(u++)) >> 6)),
          (s = 63 & i),
          isNaN(n) ? (r = s = 64) : isNaN(i) && (s = 64),
          (c = c + d.charAt(o) + d.charAt(a) + d.charAt(r) + d.charAt(s));
      return c;
    },
    base64Decode: function (e) {
      var t,
        n,
        i,
        o,
        a,
        r,
        s = "",
        c = 0;
      for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); c < e.length; )
        (t =
          (d.indexOf(e.charAt(c++)) << 2) |
          ((o = d.indexOf(e.charAt(c++))) >> 4)),
          (n = ((15 & o) << 4) | ((a = d.indexOf(e.charAt(c++))) >> 2)),
          (i = ((3 & a) << 6) | (r = d.indexOf(e.charAt(c++)))),
          (s += String.fromCharCode(t)),
          64 != a && (s += String.fromCharCode(n)),
          64 != r && (s += String.fromCharCode(i));
      return (s = u(s));
    },
  });
})(jQuery),
  (function () {
    "use strict";
    window.GOVUK = window.GOVUK || {};
    var o = { essential: !0, usage: !1, campaigns: !0 },
      a = {
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
    (window.GOVUK.cookie = function (e, t, n) {
      return void 0 !== t
        ? !1 === t || null === t
          ? window.GOVUK.setCookie(e, "", { days: -1 })
          : (void 0 === n && (n = { days: 30 }),
            window.GOVUK.setCookie(e, t, n))
        : window.GOVUK.getCookie(e);
    }),
      (window.GOVUK.setDefaultConsentCookie = function () {
        window.GOVUK.setConsentCookie(o);
      }),
      (window.GOVUK.approveAllCookieTypes = function () {
        var e = { essential: !0, usage: !0, campaigns: !0 };
        window.GOVUK.setCookie("cookies_policy", JSON.stringify(e), {
          days: 365,
        });
      }),
      (window.GOVUK.getConsentCookie = function () {
        var e,
          t = window.GOVUK.cookie("cookies_policy");
        if (!t) return null;
        try {
          e = JSON.parse(t);
        } catch (n) {
          return null;
        }
        return "object" != typeof e && null !== e && (e = JSON.parse(e)), e;
      }),
      (window.GOVUK.setConsentCookie = function (e) {
        var t = window.GOVUK.getConsentCookie();
        for (var n in (t || (t = JSON.parse(JSON.stringify(o))), e))
          if (((t[n] = e[n]), !e[n]))
            for (var i in a) a[i] === n && window.GOVUK.deleteCookie(i);
        window.GOVUK.setCookie("cookies_policy", JSON.stringify(t), {
          days: 365,
        });
      }),
      (window.GOVUK.checkConsentCookieCategory = function (e, t) {
        var n = window.GOVUK.getConsentCookie();
        if (!n && a[e]) return !0;
        n = window.GOVUK.getConsentCookie();
        try {
          return n[t];
        } catch (i) {
          return console.error(i), !1;
        }
      }),
      (window.GOVUK.checkConsentCookie = function (e, t) {
        if ("cookies_policy" === e || null === t || !1 === t) return !0;
        if (e.match("^govuk_surveySeen") || e.match("^govuk_taken"))
          return window.GOVUK.checkConsentCookieCategory(e, "settings");
        if (a[e]) {
          var n = a[e];
          return window.GOVUK.checkConsentCookieCategory(e, n);
        }
        return !1;
      }),
      (window.GOVUK.setCookie = function (e, t, n) {
        if (window.GOVUK.checkConsentCookie(e, t)) {
          void 0 === n && (n = {});
          var i = e + "=" + t + "; path=/";
          if (n.days) {
            var o = new Date();
            o.setTime(o.getTime() + 24 * n.days * 60 * 60 * 1e3),
              (i = i + "; expires=" + o.toGMTString());
          }
          "https:" === document.location.protocol && (i += "; Secure"),
            (document.cookie = i);
        }
      }),
      (window.GOVUK.getCookie = function (e) {
        for (
          var t = e + "=", n = document.cookie.split(";"), i = 0, o = n.length;
          i < o;
          i++
        ) {
          for (var a = n[i]; " " === a.charAt(0); )
            a = a.substring(1, a.length);
          if (0 === a.indexOf(t))
            return decodeURIComponent(a.substring(t.length));
        }
        return null;
      }),
      (window.GOVUK.getCookieCategory = function (e) {
        return a[e];
      }),
      (window.GOVUK.deleteCookie = function (e) {
        window.GOVUK.cookie(e, null),
          window.GOVUK.cookie(e) &&
            ((document.cookie = e + "=;expires=" + new Date() + ";"),
            (document.cookie =
              e +
              "=;expires=" +
              new Date() +
              ";domain=" +
              window.location.hostname +
              ";path=/"));
      }),
      (window.GOVUK.deleteUnconsentedCookies = function () {
        var e = window.GOVUK.getConsentCookie();
        for (var t in e)
          if (!e[t])
            for (var n in a) a[n] === t && window.GOVUK.deleteCookie(n);
      });
  })(window),
  (function (e) {
    "use strict";
    function t() {
      return 0 < $('meta[name="govuk:static-analytics:strip-dates"]').length;
    }
    function n() {
      return (
        0 < $('meta[name="govuk:static-analytics:strip-postcodes"]').length
      );
    }
    function i() {
      var e = $(
          'meta[name="govuk:static-analytics:strip-query-string-parameters"]'
        ).attr("content"),
        t = [];
      if (e)
        for (var n = e.split(","), i = 0; i < n.length; i++)
          t.push(n[i].trim());
      return t;
    }
    var o = e.GOVUK || {},
      a = /[^\s=/?&]+(?:@|%40)[^\s=/?&]+/g,
      r = /[A-PR-UWYZ][A-HJ-Z]?[0-9][0-9A-HJKMNPR-Y]?(?:[\s+]|%20)*[0-9](?!refund)[ABD-HJLNPQ-Z]{2,3}/gi,
      s = /\d{4}(-?)\d{2}(-?)\d{2}/g,
      c = /[|\\{}()[\]^$+*?.]/g,
      u = /reset_password_token=[a-zA-Z0-9-]+/g,
      d = /unlock_token=[a-zA-Z0-9-]+/g,
      l = /state=.[^&]+/g,
      g = function () {
        (this.stripDatePII = t()),
          (this.stripPostcodePII = n()),
          (this.queryStringParametersToStrip = i());
      };
    (g.prototype.stripPII = function (e) {
      return "string" == typeof e
        ? this.stripPIIFromString(e)
        : "[object Array]" === Object.prototype.toString.call(e) ||
          "[object Arguments]" === Object.prototype.toString.call(e)
        ? this.stripPIIFromArray(e)
        : "object" == typeof e
        ? this.stripPIIFromObject(e)
        : e;
    }),
      (g.prototype.stripPIIFromString = function (e) {
        var t = e.replace(a, "[email]");
        return (
          (t = (t = (t = t.replace(
            u,
            "reset_password_token=[reset_password_token]"
          )).replace(d, "unlock_token=[unlock_token]")).replace(
            l,
            "state=[state]"
          )),
          (t = this.stripQueryStringParameters(t)),
          !0 === this.stripDatePII && (t = t.replace(s, "[date]")),
          !0 === this.stripPostcodePII && (t = t.replace(r, "[postcode]")),
          t
        );
      }),
      (g.prototype.stripPIIFromObject = function (e) {
        if (e) {
          if (e instanceof o.Analytics.PIISafe) return e.value;
          for (var t in e) {
            var n = e[t];
            e[t] = this.stripPII(n);
          }
          return e;
        }
      }),
      (g.prototype.stripPIIFromArray = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var i = e[t];
          e[t] = this.stripPII(i);
        }
        return e;
      }),
      (g.prototype.stripQueryStringParameters = function (e) {
        for (var t = 0; t < this.queryStringParametersToStrip.length; t++) {
          var n = this.queryStringParametersToStrip[t],
            i = n.replace(c, "\\$&"),
            o = new RegExp("((?:\\?|&)" + i + "=)(?:[^&#\\s]*)", "g");
          e = e.replace(o, "$1[" + n + "]");
        }
        return e;
      }),
      (o.Pii = g),
      (e.GOVUK = o);
  })(window),
  (function (s) {
    "use strict";
    function c() {
      "function" == typeof s.ga && s.ga.apply(s, arguments);
    }
    var u,
      r = s.jQuery,
      d = s.GOVUK || {},
      e = function (e, t) {
        function n() {
          c("create", e, t);
        }
        function i() {
          c("set", "anonymizeIp", !0);
        }
        function o() {
          c("set", "allowAdFeatures", !1);
        }
        function a() {
          c("set", "title", u.stripPII(document.title));
        }
        function r() {
          c("set", "location", u.stripPII(window.location.href));
        }
        (u = new d.Pii()),
          "string" == typeof t && (t = { cookieDomain: t }),
          n(),
          i(),
          o(),
          a(),
          r();
      };
    (e.load = function () {
      var e, t, n, i, o, a, r;
      (e = s),
        (t = document),
        (n = "script"),
        (i = "https://www.google-analytics.com/analytics.js"),
        (o = "ga"),
        (e.GoogleAnalyticsObject = o),
        (e[o] =
          e[o] ||
          function () {
            (e[o].q = e[o].q || []).push(arguments);
          }),
        (e[o].l = 1 * new Date()),
        (a = t.createElement(n)),
        (r = t.getElementsByTagName(n)[0]),
        (a.async = 1),
        (a.src = i),
        r.parentNode.insertBefore(a, r);
    }),
      (e.prototype.trackPageview = function (e, t, n) {
        var i,
          o = "";
        "string" == typeof e && (i = { page: e }),
          "string" == typeof t && ((i = i || {}).title = t),
          "object" == typeof n &&
            ((i = r.extend(i || {}, n)),
            "string" == typeof n.trackerName &&
              ((o = n.trackerName + "."), delete n.trackerName)),
          r.isEmptyObject(i)
            ? c(o + "send", "pageview")
            : c(o + "send", "pageview", i);
      }),
      (e.prototype.trackEvent = function (e, t, n) {
        var i,
          o = "",
          a = { hitType: "event", eventCategory: e, eventAction: t };
        "string" == typeof (n = n || {}).label &&
          ((a.eventLabel = n.label), delete n.label),
          (n.value || 0 === n.value) &&
            ("number" != typeof (i = parseInt(n.value, 10)) ||
              isNaN(i) ||
              (n.eventValue = i),
            delete n.value),
          "string" == typeof n.trackerName &&
            ((o = n.trackerName + "."), delete n.trackerName),
          n.nonInteraction && (n.nonInteraction = 1),
          "object" == typeof n && r.extend(a, n),
          c(o + "send", a);
      }),
      (e.prototype.trackSocial = function (e, t, n, i) {
        var o = {
          hitType: "social",
          socialNetwork: e,
          socialAction: t,
          socialTarget: n,
        };
        r.extend(o, i), c("send", o);
      }),
      (e.prototype.addLinkedTrackerDomain = function (e, t, n, i) {
        c("create", e, "auto", { name: t }),
          c(t + ".require", "linker"),
          c(t + ".linker:autoLink", n),
          c(t + ".set", "anonymizeIp", !0),
          c(t + ".set", "allowAdFeatures", !1),
          c(t + ".set", "title", u.stripPII(document.title)),
          c(t + ".set", "location", u.stripPII(window.location.href)),
          (void 0 !== i && !0 !== i) || c(t + ".send", "pageview");
      }),
      (e.prototype.setDimension = function (e, t) {
        c("set", "dimension" + e, String(t));
      }),
      (d.GoogleAnalyticsUniversalTracker = e),
      (s.GOVUK = d);
  })(window),
  (function (n) {
    "use strict";
    var i = n.GOVUK || {},
      e = function (e) {
        if (
          ((this.pii = new i.Pii()),
          (this.trackers = []),
          "undefined" != typeof e.universalId)
        ) {
          var t = e.universalId;
          delete e.universalId,
            this.trackers.push(new i.GoogleAnalyticsUniversalTracker(t, e));
        }
      },
      t = function (e) {
        this.value = e;
      };
    (e.PIISafe = t),
      (e.prototype.sendToTrackers = function (e, t) {
        for (var n = 0, i = this.trackers.length; n < i; n++) {
          var o = this.trackers[n],
            a = o[e];
          "function" == typeof a && a.apply(o, t);
        }
      }),
      (e.load = function () {
        i.GoogleAnalyticsUniversalTracker.load();
      }),
      (e.prototype.defaultPathForTrackPageview = function (e) {
        return this.pii.stripPIIFromString(
          e.href.substring(e.origin.length).split("#")[0]
        );
      }),
      (e.prototype.trackPageview = function () {
        (arguments[0] =
          arguments[0] || this.defaultPathForTrackPageview(window.location)),
          0 === arguments.length && (arguments.length = 1),
          this.sendToTrackers("trackPageview", this.pii.stripPII(arguments));
      }),
      (e.prototype.trackEvent = function () {
        this.sendToTrackers("trackEvent", this.pii.stripPII(arguments));
      }),
      (e.prototype.trackShare = function (e, t) {
        this.sendToTrackers(
          "trackSocial",
          this.pii.stripPII([e, "share", n.location.pathname, t])
        );
      }),
      (e.prototype.setDimension = function () {
        this.sendToTrackers("setDimension", this.pii.stripPII(arguments));
      }),
      (e.prototype.addLinkedTrackerDomain = function () {
        this.sendToTrackers("addLinkedTrackerDomain", arguments);
      }),
      (i.Analytics = e),
      (n.GOVUK = i);
  })(window),
  (function (i) {
    "use strict";
    var o = i.GOVUK || {};
    (o.analyticsPlugins = o.analyticsPlugins || {}),
      (o.analyticsPlugins.printIntent = function () {
        var t = function () {
          o.analytics.trackEvent("Print Intent", document.location.pathname),
            o.analytics.trackPageview("/print" + document.location.pathname);
        };
        if (i.matchMedia) {
          var e = i.matchMedia("print"),
            n = 0;
          e.addListener(function (e) {
            e.matches ||
              0 !== n ||
              (t(),
              n++,
              setTimeout(function () {
                n = 0;
              }, 3e3));
          });
        }
        i.onafterprint && (i.onafterprint = t);
      }),
      (i.GOVUK = o);
  })(window),
  (function (o) {
    "use strict";
    var a = o.GOVUK || {};
    (a.analyticsPlugins = a.analyticsPlugins || {}),
      (a.analyticsPlugins.error = function (e) {
        function i(e) {
          return !e || !t || !!t.test(e);
        }
        var t = (e = e || {}).filenameMustMatch,
          n = function (e) {
            var t = e.filename,
              n = t + ": " + e.lineno;
            i(t) &&
              a.analytics.trackEvent("JavaScript Error", e.message, {
                label: n,
                value: 1,
                nonInteraction: !0,
              });
          };
        o.addEventListener
          ? o.addEventListener("error", n, !1)
          : o.attachEvent
          ? o.attachEvent("onerror", n)
          : (o.onerror = n);
      }),
      (o.GOVUK = a);
  })(window),
  (function (e) {
    "use strict";
    var r = e.jQuery,
      s = e.GOVUK || {};
    (s.analyticsPlugins = s.analyticsPlugins || {}),
      (s.analyticsPlugins.mailtoLinkTracker = function () {
        function e(e) {
          var t = a(e),
            n = { transport: "beacon" },
            i = t.attr("href"),
            o = r.trim(t.text());
          o && (n.label = o),
            s.analytics.trackEvent("Mailto Link Clicked", i, n);
        }
        function a(e) {
          var t = r(e.target);
          return t.is("a") || (t = t.parents("a")), t;
        }
        var t = 'a[href^="mailto:"]';
        r("body").on("click", t, e);
      }),
      (e.GOVUK = s);
  })(window),
  (function (e) {
    "use strict";
    var c = e.jQuery,
      u = e.GOVUK || {};
    (u.analyticsPlugins = u.analyticsPlugins || {}),
      (u.analyticsPlugins.externalLinkTracker = function (e) {
        function t(e) {
          var t = r(e),
            n = { transport: "beacon" },
            i = t.attr("href"),
            o = c.trim(t.text());
          if ((o && (n.label = o), s !== undefined)) {
            var a = i;
            u.analytics.setDimension(s, a);
          }
          u.analytics.trackEvent("External Link Clicked", i, n);
        }
        function r(e) {
          var t = c(e.target);
          return t.is("a") || (t = t.parents("a")), t;
        }
        var s = (e = e || {}).externalLinkUploadCustomDimension,
          n =
            'a[href^="http"]:not(a[href*="' +
            u.analyticsPlugins.externalLinkTracker.getHostname() +
            '"])';
        c("body").on("click", n, t);
      }),
      (u.analyticsPlugins.externalLinkTracker.getHostname = function () {
        return e.location.hostname;
      }),
      (e.GOVUK = u);
  })(window),
  (function (e) {
    "use strict";
    var r = e.jQuery,
      s = e.GOVUK || {};
    (s.analyticsPlugins = s.analyticsPlugins || {}),
      (s.analyticsPlugins.downloadLinkTracker = function (e) {
        function t(e) {
          var t = a(e),
            n = t.attr("href"),
            i = { transport: "beacon" },
            o = r.trim(t.text());
          o && (i.label = o),
            s.analytics.trackEvent("Download Link Clicked", n, i);
        }
        function a(e) {
          var t = r(e.target);
          return t.is("a") || (t = t.parents("a")), t;
        }
        var n = (e = e || {}).selector;
        n && r("body").on("click", n, t);
      }),
      (e.GOVUK = s);
  })(window),
  (function (e) {
    "use strict";
    var r = e.GOVUK || {};
    (r.Modules = r.Modules || {}),
      (r.Modules.AutoTrackEvent = function () {
        this.start = function (e) {
          var t = { nonInteraction: 1 },
            n = e.data("track-category"),
            i = e.data("track-action"),
            o = e.data("track-label"),
            a = e.data("track-value");
          "string" == typeof o && (t.label = o),
            (a || 0 === a) && (t.value = a),
            r.analytics &&
              r.analytics.trackEvent &&
              r.analytics.trackEvent(n, i, t);
        };
      }),
      (e.GOVUK = r);
  })(window),
  (function () {
    "use strict";
    function e() {
      return $('meta[name="govuk:rendering-application"]').attr("content");
    }
    function t() {
      return $('meta[name="govuk:format"]').attr("content");
    }
    function n() {
      return $('meta[name="govuk:navigation-page-type"]').attr("content");
    }
    function i() {
      return "collections" === e() && "taxon" === t() && "grid" === n();
    }
    function o() {
      return "collections" === e() && "taxon" === t() && "accordion" === n();
    }
    function a() {
      return "collections" === e() && "taxon" === t() && "leaf" === n();
    }
    function r() {
      return "collections" === e() && "mainstream_browse_page" === t();
    }
    function s() {
      return "collections" === e() && "topic" === t();
    }
    function c() {
      return "whitehall" === e() && "placeholder_policy_area" === t();
    }
    function u() {
      return "government-frontend" === e() && "document_collection" === t();
    }
    function d() {
      return "finder-frontend" === e() && "finder" === t();
    }
    function l() {
      return "whitehall" === e() && "finder" === t();
    }
    window.GOVUK = window.GOVUK || {};
    var g = function () {};
    (g.getNumberOfSections = function () {
      switch (!0) {
        case i():
          return 1 + $(".parent-topic-contents").length;
        case o():
          return $('[data-track-count="accordionSection"]').length;
        case u():
          return $(".document-collection .group-title").length;
        case r():
          return $("#subsection ul:visible").length || $("#section ul").length;
        case s():
          return $(".topics-page nav.index-list").length;
        case c():
          return $(".topic section h1.label").length;
        case d():
        case l():
        case a():
          return 1;
        default:
          var e = $('[data-track-count="sidebarRelatedItemSection"]').length,
            t = $('[data-track-count="sidebarTaxonSection"]').length;
          return e || t;
      }
    }),
      (g.getNumberOfLinks = function () {
        switch (!0) {
          case i():
            return (
              $('a[data-track-category="navGridLinkClicked"]').length +
              $('a[data-track-category="navGridLeafLinkClicked"]').length
            );
          case o():
            return $('a[data-track-category="navAccordionLinkClicked"]').length;
          case a():
            return $('a[data-track-category="navLeafLinkClicked"]').length;
          case u():
            return $(".document-collection .group-document-list li a").length;
          case r():
            return (
              $("#subsection ul a:visible").length || $("#section ul a").length
            );
          case s():
            return (
              $(".topics-page .index-list ul a").length ||
              $(".topics-page .topics ul a").length
            );
          case c():
            return (
              $("section.document-block a").length +
              $("section .collection-list h2 a").length
            );
          case l():
            return $(".document-list .document-row h3 a").length;
          case d():
            return $(".finder-frontend-content li.document a").length;
          default:
            return $('a[data-track-category="relatedLinkClicked"]').length;
        }
      }),
      (GOVUK.PageContent = g);
  })(),
  (function () {
    "use strict";
    function e() {
      var e = {
        dimension15: window.httpStatusCode || 200,
        dimension16: GOVUK.cookie("TLSversion") || "unknown",
        dimension95: GOVUK.analytics.gaClientId,
      };
      return (
        window.devicePixelRatio && (e.dimension11 = window.devicePixelRatio), e
      );
    }
    function t() {
      var n = {
          section: { dimension: 1 },
          format: { dimension: 2 },
          themes: { dimension: 3, defaultValue: "other" },
          "content-id": {
            dimension: 4,
            defaultValue: "00000000-0000-0000-0000-000000000000",
          },
          "search-result-count": { dimension: 5 },
          "publishing-government": { dimension: 6 },
          "political-status": { dimension: 7 },
          "analytics:organisations": { dimension: 9 },
          "analytics:world-locations": { dimension: 10 },
          withdrawn: { dimension: 12, defaultValue: "not withdrawn" },
          "schema-name": { dimension: 17 },
          "rendering-application": { dimension: 20 },
          "search-autocomplete-status": { dimension: 21 },
          "navigation-legacy": { dimension: 30, defaultValue: "none" },
          "navigation-page-type": { dimension: 32, defaultValue: "none" },
          "taxon-slug": { dimension: 56, defaultValue: "other" },
          "taxon-id": { dimension: 57, defaultValue: "other" },
          "taxon-slugs": { dimension: 58, defaultValue: "other" },
          "taxon-ids": { dimension: 59, defaultValue: "other" },
          "content-has-history": { dimension: 39, defaultValue: "false" },
          "publishing-application": { dimension: 89 },
          stepnavs: { dimension: 96 },
          "relevant-result-shown": { dimension: 83 },
          "spelling-suggestion": { dimension: 81 },
        },
        e = $('meta[name^="govuk:"]'),
        i = {},
        o = {};
      return (
        e.each(function () {
          var e = $(this),
            t = e.attr("name").split("govuk:")[1];
          n[t] && (o[t] = e.attr("content"));
        }),
        $.each(n, function (e, t) {
          var n = o[e] || t.defaultValue;
          void 0 !== n && (i["dimension" + t.dimension] = n);
        }),
        i
      );
    }
    function i() {
      return {
        dimension26: GOVUK.PageContent.getNumberOfSections(),
        dimension27: GOVUK.PageContent.getNumberOfLinks(),
        dimension23: $('main[id="content"]').attr("lang") || "unknown",
        dimension38:
          $('[data-module="global-bar"]').is(":visible") &&
          "Global Banner viewed",
      };
    }
    function o() {
      var e = $('meta[name^="govuk:ab-test"]'),
        i = {};
      return (
        e.each(function () {
          var e = $(this),
            t = parseInt(e.data("analytics-dimension")),
            n = e.attr("content");
          t && (i["dimension" + t] = n);
        }),
        i
      );
    }
    window.GOVUK = window.GOVUK || {};
    var n = function () {};
    (n.getAndExtendDefaultTrackingOptions = function (e) {
      var t = this.customDimensions();
      return $.extend(t, e);
    }),
      (n.customDimensions = function () {
        var n = $.extend({}, e(), t(), i(), o());
        return $.each(n, function (e, t) {
          n[e] = new GOVUK.Analytics.PIISafe(String(t));
        });
      }),
      (GOVUK.CustomDimensions = n);
  })(),
  (function () {
    "use strict";
    function i() {
      try {
        var e = n.prototype.getCookie("analytics_next_page_call");
        return n.prototype.setCookie("analytics_next_page_call", null), e || {};
      } catch (t) {
        return {};
      }
    }
    window.GOVUK = window.GOVUK || {};
    var n = function (e) {
      var t = window.GOVUK.getConsentCookie();
      (t && !t.usage) || (this.analytics = new GOVUK.Analytics(e));
      var n = i();
      ga(
        function (e) {
          (this.gaClientId = e.get("clientId")),
            $(window).trigger("gaClientSet"),
            GOVUK.Ecommerce.start(),
            this.trackPageview(null, null, n),
            GOVUK.analyticsPlugins.error({ filenameMustMatch: /gov\.uk/ }),
            GOVUK.analyticsPlugins.printIntent(),
            GOVUK.analyticsPlugins.mailtoLinkTracker(),
            GOVUK.analyticsPlugins.externalLinkTracker({
              externalLinkUploadCustomDimension: 36,
            }),
            GOVUK.analyticsPlugins.downloadLinkTracker({
              selector:
                'a[href*="/government/uploads"], a[href*="assets.publishing.service.gov.uk"]',
            });
        }.bind(this)
      );
    };
    (n.load = function () {
      GOVUK.Analytics.load();
    }),
      (n.prototype.trackPageview = function (e, t, n) {
        var i = !this.getCookie("seen_cookie_message"),
          o = { dimension100: i ? i.toString() : "false" };
        $.extend(n, o);
        var a = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
        this.analytics.trackPageview(e, t, a);
      }),
      (n.prototype.trackEvent = function (e, t, n) {
        var i = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions(n);
        this.analytics.trackEvent(e, t, i);
      }),
      (n.prototype.setDimension = function (e, t, n, i) {
        void 0 !== t && this.analytics.setDimension(e, t, n, i);
      }),
      (n.prototype.trackShare = function (e) {
        var t = GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions();
        this.analytics.trackShare(e, t);
      }),
      (n.prototype.addLinkedTrackerDomain = function (e, t, n, i) {
        this.analytics.addLinkedTrackerDomain(e, t, n, i);
      }),
      (n.prototype.setOptionsForNextPageview = function (e) {
        if ("object" == typeof e) {
          var t = i();
          $.extend(t, e), this.setCookie("analytics_next_page_call", t);
        }
      }),
      (n.prototype.setCookie = function (e, t) {
        GOVUK.cookie &&
          (t
            ? GOVUK.cookie(e, JSON.stringify(JSON.stringify(t)))
            : GOVUK.cookie(e, null));
      }),
      (n.prototype.getCookie = function (e) {
        if (GOVUK.cookie)
          try {
            return JSON.parse(JSON.parse(GOVUK.cookie(e)));
          } catch (t) {
            return null;
          }
      }),
      (n.prototype.stripPII = function (e) {
        return this.analytics.pii.stripPII(e);
      }),
      (GOVUK.StaticAnalytics = n);
  })(),
  (function () {
    "use strict";
    window.GOVUK = window.GOVUK || {};
    var n = "Site search results",
      i = "Results",
      t = function () {
        function u(e, t, n, i, o, a, r) {
          var s = { position: n, list: i, dimension71: a };
          return (
            o !== undefined && (s.dimension94 = o),
            e !== undefined && (s.id = e),
            t !== undefined && (s.name = t),
            r !== undefined && (s.variant = r),
            s
          );
        }
        function g(e, t, n, i, o, a, r) {
          if (e || t) {
            var s = u(e, t, n, o, a, i, r);
            ga("ec:addImpression", s);
          }
        }
        function p(e, t, n, i, o, a, r, s, c) {
          e.click(function () {
            if (t || n) {
              var e = u(t, n, i, a, r, o, s);
              ga("ec:addProduct", e);
            }
            ga("ec:setAction", "click", { list: a }),
              GOVUK.analytics.trackEvent(
                "UX",
                "click",
                GOVUK.CustomDimensions.getAndExtendDefaultTrackingOptions({
                  label: c,
                })
              );
          });
        }
        this.init = function (e) {
          var s = GOVUK.analytics
              .stripPII(e.attr("data-search-query"))
              .substring(0, 100)
              .toLowerCase(),
            t = e.find("[data-ecommerce-row]"),
            c = parseInt(e.data("ecommerce-start-index"), 10),
            u = e.data("list-title") || n,
            d = e.data("ecommerce-variant"),
            l = e.data("track-click-label") || i;
          t.each(function (e, t) {
            var n = $(t),
              i = n.data("ecommerce-subheading") || undefined,
              o = n.attr("data-ecommerce-content-id"),
              a = n.attr("data-ecommerce-path"),
              r = n.attr("data-ecommerce-index");
            g(o, a, (e = r ? parseInt(r, 10) - 1 : e) + c, s, u, i, d),
              p(n, o, a, e + c, s, u, i, d, l);
          });
        };
      };
    (t.ecLoaded = !1),
      (t.start = function (e) {
        window.ga &&
          0 < (e = e || $("[data-analytics-ecommerce]")).length &&
          (t.ecLoaded || (ga("require", "ec"), (t.ecLoaded = !0)),
          e.each(function () {
            new t().init($(this));
          }));
      }),
      (GOVUK.Ecommerce = t);
  })();
var analyticsInit = function () {
  "use strict";
  if (window.GOVUK.analyticsVars || !1)
    var e = window.GOVUK.analyticsVars.gaProperty || !1,
      t = window.GOVUK.analyticsVars.gaPropertyCrossDomain || !1,
      n = window.GOVUK.analyticsVars.linkedDomains || !1;
  var i = window.GOVUK.getConsentCookie(),
    o = {
      addLinkedTrackerDomain: function () {},
      setDimension: function () {},
      setOptionsForNextPageView: function () {},
      trackEvent: function () {},
      trackPageview: function () {},
      trackShare: function () {},
    },
    a = "ga-disable-" + e;
  if (((window[a] = !0), i && i.usage)) {
    if (((window[a] = !1), window.GOVUK.StaticAnalytics.load(), e)) {
      var r =
          "www.gov.uk" === document.domain ? ".www.gov.uk" : document.domain,
        s = new window.GOVUK.StaticAnalytics({
          universalId: e,
          cookieDomain: r,
          allowLinker: !0,
        });
      (window.GOVUK.analytics = s),
        n &&
          0 < n.length &&
          window.GOVUK.analytics.addLinkedTrackerDomain(t, "govuk", n);
    }
  } else window.GOVUK.analytics = o;
};
(window.GOVUK.analyticsInit = analyticsInit),
  (function () {
    "use strict";
    function a(e) {
      (this.config = this.getConfigForCurrentPath(e)),
        (this.SCROLL_TIMEOUT_DELAY = 10),
        this.config
          ? ((this.enabled = !0),
            (this.trackedNodes = this.buildNodes(this.config)),
            $(window).scroll($.proxy(this.onScroll, this)),
            this.trackVisibleNodes())
          : (this.enabled = !1);
    }
    window.GOVUK = window.GOVUK || {};
    var e = {
      "/transition": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/government/publications/coronavirus-outbreak-faqs-what-you-can-and-cant-do/coronavirus-outbreak-faqs-what-you-can-and-cant-do": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/government/publications/coronavirus-covid-19-online-education-resources/coronavirus-covid-19-list-of-online-education-resources-for-home-education": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/guidance/coronavirus-covid-19-information-for-the-public": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/guidance/saving-for-retirement-if-youre-aged-16-to-50": [
        ["Heading", "Keep track of your State Pension"],
        ["Heading", "Consider ways to improve your State Pension"],
        ["Heading", "Personal and stakeholder pensions"],
      ],
      "/guidance/planning-for-retirement-if-youre-aged-50-or-over": [
        ["Heading", "Find out your State Pension age"],
        ["Heading", "Consider ways to improve your State Pension"],
        ["Heading", "Workplace, personal and stakeholder pensions"],
        ["Heading", "Personal and stakeholder pensions"],
      ],
      "/guidance/retirement-planning-for-current-pensioners": [
        ["Heading", "If you reached State Pension age before 6 April 2016"],
        ["Heading", "Other ways to increase your income in retirement"],
        ["Heading", "Further support in retirement"],
        ["Heading", "Winter Fuel Payments"],
      ],
      "/government/collections/disability-confident-campaign": [
        ["Heading", "Become a Disability Confident employer"],
        ["Heading", "Aims and objectives"],
        ["Heading", "Inclusive communication"],
      ],
      "/government/publications/the-essential-trustee-what-you-need-to-know-cc3/the-essential-trustee-what-you-need-to-know-what-you-need-to-do": [
        ["Heading", "1. About this guidance"],
        ["Heading", "2. Trustees\u2019 duties at a glance"],
        ["Heading", "3. Who can be a trustee and how trustees are appointed"],
        [
          "Heading",
          "4. Ensure your charity is carrying out its purposes for the public benefit",
        ],
        [
          "Heading",
          "5. Comply with your charity\u2019s governing document and the law",
        ],
        ["Heading", "6. Act in your charity\u2019s best interests"],
        ["Heading", "7. Manage your charity\u2019s resources responsibly"],
        ["Heading", "8. Act with reasonable care and skill"],
        ["Heading", "9. Ensure your charity is accountable"],
        ["Heading", "10. Reduce the risk of liability"],
        [
          "Heading",
          "11. Your charity\u2019s legal structure and what it means",
        ],
        ["Heading", "12. Charity officers - the chair and treasurer"],
        ["Heading", "13. Technical terms used in this guidance"],
      ],
      "/guidance/universal-credit-how-it-helps-you-into-work": [
        ["Heading", "Support from your work coach"],
        ["Heading", "Help available for parents"],
        ["Heading", "When you can claim Universal Credit"],
        ["Heading", "More detailed advice"],
      ],
      "/openingupwork": [
        ["Heading", "How Universal Credit makes work pay"],
        ["Heading", "When you can claim Universal Credit"],
        ["Heading", "Help and advice"],
      ],
      "/government/publications/spring-budget-2017-documents/spring-budget-2017": [
        ["Heading", "1. Executive summary"],
        ["Heading", "2. Economic context and public finances"],
        ["Heading", "3. Policy decisions"],
        ["Heading", "4. Tax"],
        ["Heading", "5. Productivity"],
        ["Heading", "6. Public services and markets"],
        ["Heading", "7. Annex A: Financing"],
        [
          "Heading",
          "8. Annex B: Office for Budget Responsibility's Economic and fiscal outlook",
        ],
      ],
      "/guidance/living-in-the-eu-prepare-for-brexit": [
        ["Heading", "Travelling in the EU"],
      ],
      "/guidance/driving-in-the-eu-after-brexit-driving-licence-exchange": [
        ["Heading", "Belgium"],
      ],
      "/settled-status-eu-citizens-families": [
        ["Heading", "When you can apply"],
      ],
      "/guidance/returning-to-the-uk": [
        ["Heading", "Ending your time living abroad"],
      ],
      "/council-housing": [["Heading", "Choice-based lettings"]],
      "/guidance/foreign-travel-insurance": [
        ["Heading", "What your travel insurance policy should cover"],
      ],
      "/guidance/passport-rules-for-travel-to-europe-after-brexit": [
        ["Heading", "List of countries affected"],
      ],
      "/visit-europe-brexit": [["Heading", "Travel"]],
      "/guidance/uk-nationals-in-the-eu-benefits-and-pensions-in-a-no-deal-scenario": [
        [
          "Heading",
          "Pensions and benefits paid by an EEA state or Switzerland",
        ],
      ],
      "/guidance/uk-students-in-the-eu-continuing-your-studies": [
        ["Heading", "Check whether you\u2019ll get financial help"],
      ],
      "/government/publications/cross-border-maintenance-cases-after-brexit-guidance-for-public/cross-border-maintenance-cases-after-brexit": [
        ["Heading", "2. New cases after Brexit"],
      ],
      "/guidance/social-security-contributions-for-uk-and-eu-workers-if-the-uk-leaves-the-eu-with-no-deal": [
        ["Heading", "UK employers"],
        ["Heading", "UK employees and self-employed"],
      ],
      "/guidance/student-finance-arrangements-in-a-no-deal-scenario": [
        ["Heading", "Other overseas study placements"],
      ],
      "/guidance/advice-for-british-nationals-travelling-and-living-in-europe": [
        ["Heading", "Travelling to the UK"],
      ],
      "/guidance/living-in-france": [["Heading", "Passports and travel"]],
      "/family-permit": [["Heading", "EEA family permit"]],
      "/guidance/european-temporary-leave-to-remain-in-the-uk": [
        ["Heading", "Applying for European temporary leave to remain"],
      ],
      "/guidance/visiting-the-uk-after-brexit": [
        ["Heading", "If the UK leaves the EU without a deal"],
      ],
      "/guidance/healthcare-for-eu-and-efta-citizens-visiting-the-uk": [
        ["Heading", "Travel insurance"],
      ],
      "/guidance/qualified-teacher-status-qts": [
        ["Heading", "Teachers recognised in the EEA or Switzerland"],
      ],
      "/guidance/driving-in-the-eu-after-brexit": [
        ["Heading", "GB stickers and number plates"],
      ],
      "/visit-europe-brexit#travel": [
        ["Heading", "Compensation if your travel is disrupted"],
      ],
      "/apply-for-a-uk-residence-card": [["Heading", "Fees"]],
      "/guidance/studying-in-the-european-union-after-brexit": [
        ["Heading", "Applying for Erasmus+"],
      ],
      "/settled-status-eu-citizens-families/not-EU-EEA-Swiss-citizen": [
        [
          "Heading",
          "If you\u2019re a family member of an EU, EEA or Swiss citizen",
        ],
      ],
      "/guidance/get-your-eea-qualification-recognised-in-the-uk-after-brexit": [
        ["Heading", "Professionals already working in the UK"],
      ],
      "/guidance/visiting-the-uk-after-brexit#if-your-vehicle-is-not-insured-in-the-uk": [
        ["Heading", "If your vehicle is not insured in the UK"],
      ],
      "/guidance/uk-residents-visiting-the-eueea-and-switzerland-healthcare": [
        ["Heading", "European Health Insurance Cards (EHIC)"],
      ],
      "/guidance/pet-travel-to-europe-after-brexit": [
        ["Heading", "Pet travel if there\u2019s a no-deal Brexit"],
      ],
      "/guidance/driving-in-the-eu-after-brexit-international-driving-permits": [
        ["Heading", "Check which type of IDP you need"],
      ],
      "/guidance/driving-in-the-eu-after-brexit#insurance-for-your-vehicle-caravan-or-trailer": [
        ["Heading", "Trailer registration"],
      ],
      "/driving-abroad": [
        [
          "Heading",
          "Check your insurance if you\u2019re taking your own vehicle",
        ],
      ],
      "/get-a-passport-urgently": [["Heading", "Ways to apply"]],
      "/guidance/mobile-roaming-after-eu-exit": [
        ["Heading", "If you live in Northern Ireland"],
      ],
      "/government/publications/mobile-roaming-after-eu-exit/mobile-roaming-if-theres-no-brexit-deal": [
        ["Heading", "1.2 If there\u2019s no deal"],
      ],
      "/driving-abroad/international-driving-permit": [
        ["Heading", "Check which IDP you need"],
      ],
      "/vehicle-insurance/driving-abroad": [
        ["Heading", "Driving in other countries"],
      ],
      "/guidance/driving-in-the-eu-after-brexit#gb-stickers-and-number-plates": [
        ["Heading", "GB stickers and number plates"],
      ],
      "/guidance/importing-and-exporting-plants-and-plant-products-if-theres-no-withdrawal-deal": [
        ["Heading", "Movement of wood packaging material"],
      ],
      "/guidance/egg-marketing-standards-if-theres-a-no-deal-brexit": [
        ["Heading", "Customs checks"],
      ],
      "/guidance/hatching-eggs-and-chicks-marketing-standards-when-the-uk-leaves-the-eu": [
        ["Heading", "Customs checks"],
      ],
      "/guidance/poultry-meat-marketing-standards-when-the-uk-leaves-the-eu": [
        ["Heading", "Marketing standards checks"],
      ],
      "/guidance/plant-variety-rights-and-marketing-plant-reproductive-material-if-the-uk-leaves-the-eu-without-a-deal": [
        [
          "Heading",
          "Rules for applying for plant variety rights if there\u2019s a no deal Brexit",
        ],
      ],
      "/guidance/exporting-animals-animal-products-fish-and-fishery-products-if-the-uk-leaves-the-eu-with-no-deal": [
        [
          "Heading",
          "Exports to non-EU countries (third countries) from the UK",
        ],
      ],
      "/guidance/the-farming-sector-and-preparing-for-eu-exit": [
        [
          "Heading",
          "Farm and rural payments: Basic Payment Scheme and Rural Development Programme for England",
        ],
      ],
      "/guidance/protecting-food-and-drink-names-if-theres-no-brexit-deal": [
        ["Heading", "New product applications"],
      ],
      "/guidance/trading-and-labelling-organic-food-if-theres-no-brexit-deal": [
        ["Heading", "Exporting organic food to the EU"],
      ],
      "/guidance/hops-and-hops-products-marketing-standards-if-the-uk-leaves-the-eu-without-a-deal": [
        ["Heading", "How to apply for an EU Attestation of Equivalence"],
      ],
      "/guidance/guidance-for-suppliers-of-cattle-sheep-and-goat-ear-tags": [
        ["Heading", "Tagging information for livestock keepers"],
      ],
      "/government/publications/meeting-climate-change-requirements-if-theres-no-brexit-deal/meeting-climate-change-requirements-if-theres-no-brexit-deal": [
        ["Heading", "Summary of actions"],
      ],
      "/guidance/food-labelling-changes-after-brexit": [
        ["Heading", "Goods sold in the UK"],
      ],
      "/guidance/export-horses-and-ponies-special-rules": [
        ["Heading", "Moving equines to the EU in a no-deal Brexit"],
      ],
      "/guidance/trading-and-moving-endangered-species-protected-by-cites-if-theres-no-withdrawal-deal": [
        ["Heading", "Trading with the EU"],
      ],
      "/guidance/wine-trade-regulations": [
        ["Heading", "Rules for transporting wine into the UK"],
      ],
      "/guidance/the-food-and-drink-sector-and-preparing-for-eu-exit": [
        ["Heading", "Importing and exporting"],
      ],
      "/guidance/exporting-and-importing-fish-if-theres-no-brexit-deal": [
        ["Heading", "Send fish to an EU border control post"],
      ],
      "/guidance/the-fisheries-sector-and-preparing-for-eu-exit": [
        ["Heading", "Licensing arrangements"],
      ],
      "/guidance/import-fish-after-a-no-deal-brexit": [
        ["Heading", "Direct landings into the UK"],
      ],
      "/guidance/the-chemicals-sector-and-preparing-for-eu-exit": [
        ["Heading", "Energy and climate"],
      ],
      "/government/publications/trading-electricity-if-theres-no-brexit-deal/trading-electricity-if-theres-no-brexit-deal": [
        ["Heading", "Summary of actions"],
      ],
      "/guidance/how-to-move-goods-between-or-through-common-transit-countries-including-the-eu": [
        ["Heading", "Start moving your goods"],
      ],
      "/guidance/ecmt-international-road-haulage-permits": [
        ["Heading", "Apply for permits"],
      ],
      "/guidance/transporting-goods-between-the-uk-and-eu-in-a-no-deal-brexit-guidance-for-hauliers": [
        ["Heading", "Cross-border responsibilities when moving goods"],
      ],
      "/guidance/carry-out-international-road-haulage-after-brexit": [
        ["Heading", "Vehicle and trailer insurance"],
      ],
      "/guidance/prepare-to-drive-in-the-eu-after-brexit-lorry-and-goods-vehicle-drivers": [
        ["Heading", "Driver CPC for lorry drivers"],
      ],
      "/guidance/run-international-bus-or-coach-services-after-brexit": [
        ["Heading", "Run regular international services"],
      ],
      "/guidance/vehicle-type-approval-if-theres-no-brexit-deal": [
        ["Heading", "Existing vehicle and component type-approvals"],
      ],
      "/guidance/hauliers-and-commercial-drivers-you-will-need-new-documents-to-transport-goods-into-the-eu-after-brexit": [
        ["Heading", "Driver documents"],
      ],
      "/guidance/how-to-move-goods-through-roro-locations-in-a-no-deal-brexit-eu-to-uk-and-uk-to-eu": [
        ["Heading", "EU to UK: pre-journey from EU to the UK"],
      ],
      "/guidance/the-retail-sector-and-preparing-for-eu-exit": [
        ["Heading", "Importing and exporting"],
      ],
      "/guidance/the-consumer-goods-sector-and-preparing-for-eu-exit": [
        ["Heading", "Importing and exporting"],
      ],
      "/guidance/textile-labelling-after-brexit": [
        ["Heading", "Labelling requirements"],
      ],
      "/guidance/footwear-labelling-after-brexit": [
        ["Heading", "Labelling requirements"],
      ],
      "/government/publications/banking-insurance-and-other-financial-services-if-theres-no-brexit-deal/banking-insurance-and-other-financial-services-if-theres-no-brexit-deal-information-for-financial-services-institutions": [
        ["Heading", "3. Action taken by the UK"],
      ],
      "/government/publications/eu-lawyers-in-the-uk-after-a-no-deal-brexit/eu-lawyers-in-the-uk-after-a-no-deal-brexit": [
        [
          "Heading",
          "Lawyers with EU, Norway, Iceland or Liechtenstein qualifications and professional titles",
        ],
      ],
      "/government/publications/further-guidance-note-on-the-regulation-of-medicines-medical-devices-and-clinical-trials-if-theres-no-brexit-deal/further-guidance-note-on-the-regulation-of-medicines-medical-devices-and-clinical-trials-if-theres-no-brexit-deal": [
        ["Heading", "1.4 Orphan medicines"],
      ],
      "/guidance/accounting-if-theres-no-brexit-deal": [
        ["Heading", "UK public companies with an EEA listing"],
      ],
      "/guidance/broadcasting-and-video-on-demand-if-theres-no-brexit-deal": [
        [
          "Heading",
          "Get local legal advice about your video on-demand services",
        ],
      ],
      "/guidance/changes-to-copyright-law-after-brexit": [
        ["Heading", "Artist\u2019s resale right"],
      ],
      "/guidance/changes-to-eu-and-international-designs-and-trade-mark-protection-after-brexit": [
        ["Heading", "Registered design"],
      ],
      "/guidance/check-temporary-rates-of-customs-duty-on-imports-after-eu-exit": [
        ["Heading", "Tariff-rate quotas (TRQ)"],
      ],
      "/guidance/construction-products-regulation-if-there-is-no-brexit-deal": [
        ["Heading", "UK manufacturers exporting to the EU"],
      ],
      "/guidance/european-and-domestic-funding-after-brexit": [
        ["Heading", "What you need to do"],
      ],
      "/guidance/exhaustion-of-ip-rights-and-parallel-trade-after-brexit": [
        ["Heading", "Actions for IP rights holders"],
      ],
      "/guidance/exporting-nuclear-related-items-after-brexit": [
        ["Heading", "Exporting dual-use items"],
      ],
      "/guidance/guidance-on-substantial-amendments-to-a-clinical-trial-if-the-uk-leaves-the-eu-with-no-deal": [
        [
          "Heading",
          "Investigational medicinal product (IMP) certification and importation",
        ],
      ],
      "/guidance/importing-and-exporting-waste-if-theres-no-brexit-deal": [
        ["Heading", "Rules after the UK leaves the EU"],
      ],
      "/guidance/merger-review-and-anti-competitive-activity-after-brexit": [
        ["Heading", "Mergers"],
      ],
      "/guidance/nis-regulations-what-uk-digital-service-providers-operating-in-the-eu-should-do-after-brexit": [
        ["Heading", "How RDSPs are regulated in the UK"],
      ],
      "/guidance/placing-manufactured-goods-on-the-eu-internal-market-if-theres-no-deal": [
        [
          "Heading",
          "Appointing an authorised representative or responsible person in the EU",
        ],
      ],
      "/guidance/prepare-to-import-relevant-nuclear-materials-from-the-eu-after-brexit-licensing-requirements": [
        ["Heading", "More information"],
      ],
      "/guidance/prepare-to-use-the-ukca-mark-after-brexit": [
        ["Heading", "Check whether you will need to use the new UKCA marking"],
      ],
      "/guidance/prepare-to-work-and-operate-in-the-european-aviation-sector-after-brexit": [
        [
          "Heading",
          "Requirements for aviation businesses operating in Europe after the UK leaves the EU",
        ],
      ],
      "/guidance/public-sector-procurement-after-a-no-deal-brexit": [
        [
          "Heading",
          "What will change for contracting authorities and entities",
        ],
      ],
      "/guidance/satellites-and-space-programmes-after-brexit": [
        ["Heading", "Copernicus"],
      ],
      "/guidance/shipping-radioactive-waste-and-spent-fuel-after-brexit": [
        ["Heading", "After Brexit"],
      ],
      "/guidance/trading-timber-imports-and-exports-if-theres-no-brexit-deal": [
        ["Heading", "Importing timber for the UK market"],
      ],
      "/guidance/what-you-need-to-move-goods-between-or-through-common-transit-countries-including-the-eu": [
        ["Heading", "Getting a guarantee"],
      ],
      "/taking-goods-out-uk-temporarily/get-an-ata-carnet": [
        ["Heading", "Using an ATA Carnet"],
      ],
      "/wood-packaging-import-export": [
        ["Heading", "Export solid wood packaging"],
      ],
      "/government/publications/vat-for-businesses-if-theres-no-brexit-deal/vat-for-businesses-if-theres-no-brexit-deal": [
        ["Heading", "UK businesses importing goods from the EU"],
      ],
      "/guidance/answers-to-the-most-common-topics-asked-about-by-the-public-for-the-coronavirus-press-conference": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/eubusiness": [["Heading", "Additional help and support"]],
      "/coronavirus": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/coronavirus/education-and-childcare": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/coronavirus/worker-support": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
      "/coronavirus/business-support": [
        ["Percent", 20],
        ["Percent", 40],
        ["Percent", 60],
        ["Percent", 80],
        ["Percent", 100],
      ],
    };
    (a.prototype.getConfigForCurrentPath = function (e) {
      for (var t in e)
        if (
          this.normalisePath(window.location.pathname) === this.normalisePath(t)
        )
          return e[t];
    }),
      (a.prototype.buildNodes = function (e) {
        for (var t, n, i = [], o = 0; o < e.length; o++)
          (t = a[e[o][0] + "Node"]), (n = e[o][1]), i.push(new t(n));
        return i;
      }),
      (a.prototype.normalisePath = function (e) {
        return e.split("/").join("");
      }),
      (a.prototype.onScroll = function () {
        clearTimeout(this.scrollTimeout),
          (this.scrollTimeout = setTimeout(
            $.proxy(this.trackVisibleNodes, this),
            this.SCROLL_TIMEOUT_DELAY
          ));
      }),
      (a.prototype.trackVisibleNodes = function () {
        for (var e = 0; e < this.trackedNodes.length; e++)
          if (
            this.trackedNodes[e].isVisible() &&
            !this.trackedNodes[e].alreadySeen
          ) {
            this.trackedNodes[e].alreadySeen = !0;
            var t = this.trackedNodes[e].eventData.action,
              n = this.trackedNodes[e].eventData.label;
            GOVUK.analytics.trackEvent("ScrollTo", t, {
              label: n,
              nonInteraction: !0,
            });
          }
      }),
      (a.PercentNode = function (e) {
        (this.percentage = e),
          (this.eventData = { action: "Percent", label: String(e) });
      }),
      (a.PercentNode.prototype.isVisible = function () {
        return this.currentScrollPercent() >= this.percentage;
      }),
      (a.PercentNode.prototype.currentScrollPercent = function () {
        var e = $(document),
          t = $(window);
        return (t.scrollTop() / (e.height() - t.height())) * 100;
      }),
      (a.HeadingNode = function (e) {
        function t(e) {
          for (var t = $("h1, h2, h3, h4, h5, h6"), n = 0; n < t.length; n++)
            if ($.trim(t.eq(n).text()).replace(/\s/g, " ") === e)
              return t.eq(n);
        }
        (this.$element = t(e)),
          (this.eventData = { action: "Heading", label: e });
      }),
      (a.HeadingNode.prototype.isVisible = function () {
        return !!this.$element && this.elementIsVisible(this.$element);
      }),
      (a.HeadingNode.prototype.elementIsVisible = function (e) {
        var t = $(window),
          n = e.offset().top;
        return n > t.scrollTop() && n < t.scrollTop() + t.height();
      }),
      $().ready(function () {
        window.GOVUK.scrollTracker = new a(e);
      }),
      (window.GOVUK.ScrollTracker = a);
  })(),
  (function (a) {
    "use strict";
    var e = a.GOVUK || {};
    (e.Modules = e.Modules || {}),
      (e.Modules.ExplicitCrossDomainLinks = function () {
        this.start = function (e) {
          var o = e[0];
          a.ga &&
            a.ga(function () {
              var e = a.ga.getAll();
              if (e.length) {
                var t = new a.gaplugins.Linker(e[0]),
                  n = o.getAttribute("action");
                n && o.setAttribute("action", t.decorate(n));
                var i = o.getAttribute("href");
                i && (o.href = t.decorate(i));
              }
            });
        };
      }),
      (a.GOVUK = e);
  })(window);
var linkedDomains = [
  "access.service.gov.uk",
  "access.tax.service.gov.uk",
  "accounts.manage-apprenticeships.service.gov.uk",
  "account.publishing.service.gov.uk",
  "add-driving-licence-check-code.service.gov.uk",
  "analyse-school-performance.service.gov.uk",
  "appeal-tax-tribunal.service.gov.uk",
  "apply-basic-criminal-record-check.service.gov.uk",
  "apply-blue-badge.service.gov.uk",
  "apply-company-tachograph-card.service.gov.uk",
  "apply-for-bankruptcy.service.gov.uk",
  "apply-for-debt-relief-order.service.gov.uk",
  "apply-for-environmental-permit.service.gov.uk",
  "apply-for-eu-settled-status.homeoffice.gov.uk",
  "apply-for-innovation-funding.service.gov.uk",
  "apply-licence.ozone-depleting-substances.service.gov.uk",
  "apply-quota.fluorinated-gas.service.gov.uk",
  "apply-quota.ozone-depleting-substances.service.gov.uk",
  "beta.companieshouse.gov.uk",
  "biometric-residence-permit.service.gov.uk",
  "businessreadinessfund.beis.gov.uk",
  "catchreturn.service.gov.uk",
  "checklegalaid.service.gov.uk",
  "check-mot.service.gov.uk",
  "check-payment-practices.service.gov.uk",
  "check-vehicle-recalls.service.gov.uk",
  "civil-service-careers.gov.uk",
  "civilservicejobs.service.gov.uk",
  "claim.redundancy-payments.service.gov.uk",
  "claim-power-of-attorney-refund.service.gov.uk",
  "compare-school-performance.service.gov.uk",
  "complete-deputy-report.service.gov.uk",
  "contractsfinder.service.gov.uk",
  "coronavirus.data.gov.uk",
  "coronavirus-business-volunteers.service.gov.uk",
  "coronavirus-shielding-support.service.gov.uk",
  "coronavirus-vulnerable-people.service.gov.uk",
  "courttribunalfinder.service.gov.uk",
  "create-energy-label.service.gov.uk",
  "create-qr-code-poster.service.gov.uk",
  "cymraeg.registertovote.service.gov.uk",
  "dartford-crossing-charge.service.gov.uk",
  "design-system.service.gov.uk",
  "devtracker.dfid.gov.uk",
  "digitalmarketplace.service.gov.uk",
  "eforms.homeoffice.gov.uk",
  "electronic-visa-waiver.service.gov.uk",
  "employmenttribunals.service.gov.uk",
  "eu-settled-status-enquiries.service.gov.uk",
  "faster-uk-entry.service.gov.uk",
  "finance.manage-apprenticeships.service.gov.uk",
  "findapprenticeship.service.gov.uk",
  "find-coronavirus-support.service.gov.uk",
  "flood-map-for-planning.service.gov.uk",
  "flood-warning-information.service.gov.uk",
  "gender-pay-gap.service.gov.uk",
  "get-fishing-licence.service.gov.uk",
  "get-information-schools.service.gov.uk",
  "gro.gov.uk",
  "helpwithcourtfees.service.gov.uk",
  "help-with-prison-visits.service.gov.uk",
  "import-products-animals-food-feed.service.gov.uk",
  "lastingpowerofattorney.service.gov.uk",
  "live.email-dvla.service.gov.uk",
  "live.dvla-web-chat.service.gov.uk",
  "loststolenpassport.service.gov.uk",
  "makeaplea.service.gov.uk",
  "managefleetvehicles.service.gov.uk",
  "manage-apprenticeships.service.gov.uk",
  "manage-fish-exports.service.gov.uk",
  "manage-quota.fluorinated-gas.service.gov.uk",
  "manage-water-abstraction-impoundment-licence.service.gov.uk",
  "match.redundancy-payments.service.gov.uk",
  "mot-testing.service.gov.uk",
  "nominate-uk-honour.service.gov.uk",
  "notice.redundancy-payments.service.gov.uk",
  "passport.service.gov.uk",
  "paydvlafine.service.gov.uk",
  "payments.service.gov.uk",
  "publish-payment-practices.service.gov.uk",
  "queens-awards-enterprise.service.gov.uk",
  "recruit.manage-apprenticeships.service.gov.uk",
  "register.fluorinated-gas.service.gov.uk",
  "register-trailer.service.gov.uk",
  "register.ozone-depleting-substances.service.gov.uk",
  "registertovote.service.gov.uk",
  "register-vehicle.service.gov.uk",
  "registers.service.gov.uk",
  "reminders.mot-testing.service.gov.uk",
  "renewable-heat-calculator.service.gov.uk",
  "reply-jury-summons.service.gov.uk",
  "report-director-conduct.service.gov.uk",
  "report.fluorinated-gas.service.gov.uk",
  "report.ozone-depleting-substances.service.gov.uk",
  "right-to-rent.homeoffice.gov.uk",
  "right-to-work.service.gov.uk",
  "ruralpayments.service.gov.uk",
  "schools-financial-benchmarking.service.gov.uk",
  "secured.studentfinanceni.co.uk",
  "secured.studentfinancewales.co.uk",
  "selfservice.payments.service.gov.uk",
  "send-money-to-prisoner.service.gov.uk",
  "signin.service.gov.uk",
  "sorn.service.gov.uk",
  "staff.helpwithcourtfees.service.gov.uk",
  "student-finance.service.gov.uk",
  "tax.service.gov.uk",
  "teacherservices.education.gov.uk",
  "teaching-vacancies.service.gov.uk",
  "to-visit-or-stay-in-the-uk.homeoffice.gov.uk",
  "trade-tariff.service.gov.uk",
  "tribunal-response.employmenttribunals.service.gov.uk",
  "ukri.org",
  "update-student-loan-employment-details.service.gov.uk",
  "vehicle-operator-licensing.service.gov.uk",
  "vehicleenquiry.service.gov.uk",
  "viewdrivingrecord.service.gov.uk",
  "view-and-prove-your-rights.homeoffice.gov.uk",
  "view-immigration-status.service.gov.uk",
  "visa-address-update.service.gov.uk",
  "visas-immigration.service.gov.uk",
  "your-defra-account.defra.gov.uk",
];
(window.GOVUK.analyticsVars = window.GOVUK.analyticsVars || {}),
  (window.GOVUK.analyticsVars.gaProperty = "UA-26179049-1"),
  (window.GOVUK.analyticsVars.gaPropertyCrossDomain = "UA-145652997-1"),
  (window.GOVUK.analyticsVars.linkedDomains = linkedDomains),
  "undefined" != typeof window.GOVUK.analyticsInit &&
    window.GOVUK.analyticsInit(),
  (function (e) {
    "use strict";
    var l = e.jQuery,
      g = e.GOVUK || {};
    (g.Modules = g.Modules || {}),
      (g.modules = {
        find: function (e) {
          var t,
            n = "[data-module]";
          return (
            (t = (e = e || l(document)).find(n)), e.is(n) && (t = t.add(e)), t
          );
        },
        start: function (e) {
          function t(e) {
            return i(n(e));
          }
          function n(e) {
            return e.replace(/-([a-z])/g, function (e) {
              return e.charAt(1).toUpperCase();
            });
          }
          function i(e) {
            return e.charAt(0).toUpperCase() + e.slice(1);
          }
          for (var o = this.find(e), a = 0, r = o.length; a < r; a++) {
            var s = l(o[a]),
              c = t(s.data("module")),
              u = s.data("module-started"),
              d = c.replace("Govuk", "");
            "function" != typeof g.Modules[c] ||
            g.Modules[c].prototype.init ||
            u
              ? "function" == typeof g.Modules[d] &&
                g.Modules[d].prototype.init &&
                !u &&
                (new g.Modules[d](s[0]).init(), s.data("module-started", !0))
              : (new g.Modules[c]().start(s), s.data("module-started", !0));
          }
        },
      }),
      (e.GOVUK = g);
  })(window),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (e) {
    function t() {}
    (t.prototype.start = function (e) {
      (this.$module = e[0]),
        (this.$module.hideCookieMessage = this.hideCookieMessage.bind(this)),
        (this.$module.showConfirmationMessage = this.showConfirmationMessage.bind(
          this
        )),
        (this.$module.setCookieConsent = this.setCookieConsent.bind(this)),
        (this.$module.rejectCookieConsent = this.rejectCookieConsent.bind(
          this
        )),
        (this.$module.cookieBanner = document.querySelector(
          ".gem-c-cookie-banner"
        )),
        (this.$module.cookieBannerConfirmationMessage = this.$module.querySelector(
          ".gem-c-cookie-banner__confirmation"
        )),
        (this.$module.cookieBannerConfirmationMessageText = this.$module.querySelector(
          ".gem-c-cookie-banner__confirmation-message"
        )),
        this.setupCookieMessage();
    }),
      (t.prototype.setupCookieMessage = function () {
        if (
          ((this.$hideLinks = this.$module.querySelectorAll(
            "button[data-hide-cookie-banner]"
          )),
          this.$hideLinks && this.$hideLinks.length)
        )
          for (var e = 0; e < this.$hideLinks.length; e++)
            this.$hideLinks[e].addEventListener(
              "click",
              this.$module.hideCookieMessage
            );
        (this.$acceptCookiesButton = this.$module.querySelector(
          "button[data-accept-cookies]"
        )),
          this.$acceptCookiesButton &&
            ((this.$acceptCookiesButton.style.display = "block"),
            this.$acceptCookiesButton.addEventListener(
              "click",
              this.$module.setCookieConsent
            )),
          (this.$rejectCookiesButton = this.$module.querySelector(
            "button[data-reject-cookies]"
          )),
          this.$rejectCookiesButton &&
            ((this.$rejectCookiesButton.style.display = "block"),
            this.$rejectCookiesButton.addEventListener(
              "click",
              this.$module.rejectCookieConsent
            )),
          this.showCookieMessage();
      }),
      (t.prototype.showCookieMessage = function () {
        this.isInCookiesPage() || this.isInIframe()
          ? (this.$module.style.display = "none")
          : this.$module &&
            "true" !== window.GOVUK.cookie("cookies_preferences_set")
          ? ((this.$module.style.display = "block"),
            window.GOVUK.cookie("cookies_policy") ||
              window.GOVUK.setDefaultConsentCookie(),
            window.GOVUK.deleteUnconsentedCookies())
          : (this.$module.style.display = "none");
      }),
      (t.prototype.hideCookieMessage = function (e) {
        this.$module &&
          ((this.$module.hidden = !0),
          (this.$module.style.display = "none"),
          window.GOVUK.cookie("cookies_preferences_set", "true", {
            days: 365,
          })),
          e.target && e.preventDefault();
      }),
      (t.prototype.setCookieConsent = function () {
        "all" === this.$acceptCookiesButton.getAttribute("data-cookie-types") &&
          this.$module.cookieBannerConfirmationMessageText.insertAdjacentHTML(
            "afterbegin",
            "You have accepted additional cookies. "
          ),
          window.GOVUK.approveAllCookieTypes(),
          this.$module.showConfirmationMessage(),
          this.$module.cookieBannerConfirmationMessage.focus(),
          window.GOVUK.cookie("cookies_preferences_set", "true", { days: 365 }),
          window.GOVUK.analyticsInit && window.GOVUK.analyticsInit(),
          window.GOVUK.globalBarInit && window.GOVUK.globalBarInit.init();
      }),
      (t.prototype.rejectCookieConsent = function () {
        this.$module.cookieBannerConfirmationMessageText.insertAdjacentHTML(
          "afterbegin",
          "You have rejected additional cookies. "
        ),
          this.$module.showConfirmationMessage(),
          this.$module.cookieBannerConfirmationMessage.focus(),
          window.GOVUK.cookie("cookies_preferences_set", "true", { days: 365 });
      }),
      (t.prototype.showConfirmationMessage = function () {
        (this.$cookieBannerMainContent = document.querySelector(
          ".js-banner-wrapper"
        )),
          (this.$cookieBannerMainContent.hidden = !0),
          (this.$module.cookieBannerConfirmationMessage.style.display =
            "block"),
          (this.$module.cookieBannerConfirmationMessage.hidden = !1);
      }),
      (t.prototype.isInCookiesPage = function () {
        return "/help/cookies" === window.location.pathname;
      }),
      (t.prototype.isInIframe = function () {
        return window.parent && window.location !== window.parent.location;
      }),
      (e.CookieBanner = t);
  })(window.GOVUK.Modules),
  this.Element &&
    (function (e) {
      e.matches =
        e.matches ||
        e.matchesSelector ||
        e.webkitMatchesSelector ||
        e.msMatchesSelector ||
        function (e) {
          for (
            var t = this,
              n = (t.parentNode || t.document).querySelectorAll(e),
              i = -1;
            n[++i] && n[i] != t;

          );
          return !!n[i];
        };
    })(Element.prototype),
  this.Element &&
    (function (e) {
      e.closest =
        e.closest ||
        function (e) {
          for (var t = this; t.matches && !t.matches(e); ) t = t.parentNode;
          return t.matches ? t : null;
        };
    })(Element.prototype),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (e) {
    function t() {}
    (t.prototype.start = function (e) {
      (this.$module = e[0]),
        (this.$module.handleClick = this.handleClick.bind(this));
      var t = this;
      this.$module.addEventListener("click", function (e) {
        t.$module.handleClick(e.target);
      });
    }),
      (t.prototype.handleClick = function (e) {
        var t = { transport: "beacon" };
        if (
          (e.hasAttribute("data-track-category") ||
            e.hasAttribute("data-track-action") ||
            (e = e.closest("[data-track-category][data-track-action]")),
          e)
        ) {
          var n = e.getAttribute("data-track-category"),
            i = e.getAttribute("data-track-action"),
            o = e.getAttribute("data-track-label"),
            a = e.getAttribute("data-track-value"),
            r = e.getAttribute("data-track-dimension"),
            s = e.getAttribute("data-track-dimension-index"),
            c = e.getAttribute("data-track-options");
          if (
            (o && (t.label = o),
            a && (t.value = a),
            r && s && (t["dimension" + s] = r),
            c)
          )
            for (var u in (c = JSON.parse(c))) t[u] = c[u];
          window.GOVUK.analytics &&
            window.GOVUK.analytics.trackEvent &&
            window.GOVUK.analytics.trackEvent(n, i, t);
        }
      }),
      (e.GemTrackClick = t);
  })(window.GOVUK.Modules),
  (function () {
    "use strict";
    window.GOVUK.Modules.GlobalBar = function () {
      this.start = function (e) {
        function t() {
          a($(this).attr("href"));
        }
        function n(e) {
          var t = parseCookie(GOVUK.getCookie(r)),
            n = u;
          t && (n = t.version);
          var i = JSON.stringify({ count: 999, version: n });
          GOVUK.setCookie(r, i, { days: 84 }),
            $(".global-bar-additional").removeClass(
              "global-bar-additional--show"
            ),
            $(".global-bar__dismiss").removeClass("global-bar__dismiss--show"),
            a("Manually dismissed"),
            e.preventDefault();
        }
        function i(e) {
          e += 1;
          var t = JSON.stringify({ count: e, version: u });
          GOVUK.setCookie(r, t, { days: 84 }),
            2 === e && a("Automatically dismissed");
        }
        function o() {
          var e = GOVUK.getCookie(r),
            t = parseInt(parseCookie(e).count, 10);
          return isNaN(t) && (t = 0), t;
        }
        function a(e) {
          GOVUK.analytics &&
            "function" == typeof GOVUK.analytics.trackEvent &&
            GOVUK.analytics.trackEvent("Global bar", e, { nonInteraction: 1 });
        }
        var r = "global_bar_seen",
          s = e.data("global-bar-permanent"),
          c = GOVUK.getCookieCategory(r);
        if (GOVUK.getConsentCookie()[c]) {
          (null !== GOVUK.getCookie(r) &&
            parseCookie(GOVUK.getCookie(r)).count !== undefined) ||
            GOVUK.setCookie(
              "global_bar_seen",
              JSON.stringify({ count: 0, version: 0 }),
              { days: 84 }
            );
          var u = parseCookie(GOVUK.getCookie(r)).version,
            d = o();
        }
        e.on("click", ".dismiss", n),
          e.on("click", ".js-call-to-action", t),
          e.is(":visible") && (s || i(d));
      };
    };
  })(),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (function (a) {
    "use strict";
    var i = window.$;
    (a.crossDomainLinkedTrackers = []),
      (a.CrossDomainTracking = function () {
        function n(e) {
          var t = e.attr("data-tracking-name"),
            n = e.attr("data-tracking-code"),
            i = "true" === e.attr("data-tracking-track-event");
          if ("undefined" !== GOVUK.analytics) {
            if (-1 === a.crossDomainLinkedTrackers.indexOf(t)) {
              var o = e.prop("hostname");
              GOVUK.analytics.addLinkedTrackerDomain(n, t, o),
                a.crossDomainLinkedTrackers.push(t);
            }
            i &&
              e.click({ text: e.text(), name: t }, function (e) {
                GOVUK.analytics.trackEvent(
                  "External Link Clicked",
                  e.data.text,
                  { trackerName: e.data.name }
                );
              });
          }
        }
        this.start = function (e) {
          var t = "[href][data-tracking-code][data-tracking-name]";
          e.is(t)
            ? n(e)
            : e.find(t).each(function () {
                n(i(this));
              });
        };
      });
  })(window.GOVUK.Modules),
  $(document).ready(function () {
    GOVUK.modules.start();
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define("GOVUKFrontend", t)
      : (e.GOVUKFrontend = t());
  })(this, function () {
    "use strict";
    function e(e) {
      (this.$module = e),
        (this.$menuButton = e && e.querySelector(".govuk-js-header-toggle")),
        (this.$menu =
          this.$menuButton &&
          e.querySelector(
            "#" + this.$menuButton.getAttribute("aria-controls")
          ));
    }
    return (
      function () {
        "Window" in this ||
          ("undefined" == typeof WorkerGlobalScope &&
            "function" != typeof importScripts &&
            (function (e) {
              e.constructor
                ? (e.Window = e.constructor)
                : ((e.Window = e.constructor = new Function(
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
            function e() {
              return (
                a-- || clearTimeout(t),
                !(
                  !document.body ||
                  document.body.prototype ||
                  !/(complete|interactive)/.test(document.readyState)
                ) &&
                  (u(document, !0),
                  t && document.body.prototype && clearTimeout(t),
                  !!document.body.prototype)
              );
            }
            if (!window.Element || window.HTMLElement) {
              window.Element = window.HTMLElement = new Function(
                "return function Element() {}"
              )();
              var t,
                n = document.appendChild(document.createElement("body")),
                i = n.appendChild(document.createElement("iframe"))
                  .contentWindow.document,
                s = (Element.prototype = i.appendChild(i.createElement("*"))),
                c = {},
                u = function (e, t) {
                  var n,
                    i,
                    o,
                    a = e.childNodes || [],
                    r = -1;
                  if (1 === e.nodeType && e.constructor !== Element)
                    for (n in ((e.constructor = Element), c))
                      (i = c[n]), (e[n] = i);
                  for (; (o = t && a[++r]); ) u(o, t);
                  return e;
                },
                d = document.getElementsByTagName("*"),
                o = document.createElement,
                a = 100;
              s.attachEvent("onpropertychange", function (e) {
                for (
                  var t,
                    n = e.propertyName,
                    i = !c.hasOwnProperty(n),
                    o = s[n],
                    a = c[n],
                    r = -1;
                  (t = d[++r]);

                )
                  1 === t.nodeType && (i || t[n] === a) && (t[n] = o);
                c[n] = o;
              }),
                (s.constructor = Element),
                s.hasAttribute ||
                  (s.hasAttribute = function r(e) {
                    return null !== this.getAttribute(e);
                  }),
                e() ||
                  ((document.onreadystatechange = e), (t = setInterval(e, 25))),
                (document.createElement = function l(e) {
                  var t = o(String(e).toLowerCase());
                  return u(t);
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
        var s, c, u, d;
        ("defineProperty" in Object &&
          (function () {
            try {
              var e = {};
              return Object.defineProperty(e, "test", { value: 42 }), !0;
            } catch (t) {
              return !1;
            }
          })()) ||
          ((s = Object.defineProperty),
          (c = Object.prototype.hasOwnProperty("__defineGetter__")),
          (u = "Getters & setters cannot be defined on this javascript engine"),
          (d =
            "A property cannot both have accessors and be writable or have a value"),
          (Object.defineProperty = function l(e, t, n) {
            if (
              s &&
              (e === window ||
                e === document ||
                e === Element.prototype ||
                e instanceof Element)
            )
              return s(e, t, n);
            if (null === e || !(e instanceof Object || "object" == typeof e))
              throw new TypeError("Object.defineProperty called on non-object");
            if (!(n instanceof Object))
              throw new TypeError("Property description must be an object");
            var i = String(t),
              o = "value" in n || "writable" in n,
              a = "get" in n && typeof n.get,
              r = "set" in n && typeof n.set;
            if (a) {
              if ("function" !== a)
                throw new TypeError("Getter must be a function");
              if (!c) throw new TypeError(u);
              if (o) throw new TypeError(d);
              Object.__defineGetter__.call(e, i, n.get);
            } else e[i] = n.value;
            if (r) {
              if ("function" !== r)
                throw new TypeError("Setter must be a function");
              if (!c) throw new TypeError(u);
              if (o) throw new TypeError(d);
              Object.__defineSetter__.call(e, i, n.set);
            }
            return "value" in n && (e[i] = n.value), e;
          }));
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function (u) {
        (function (e) {
          if (!("Event" in e)) return !1;
          if ("function" == typeof e.Event) return !0;
          try {
            return new Event("click"), !0;
          } catch (t) {
            return !1;
          }
        })(this) ||
          (function () {
            function d(e, t) {
              for (var n = -1, i = e.length; ++n < i; )
                if (n in e && e[n] === t) return n;
              return -1;
            }
            var o = {
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
              var e = (window.Event && window.Event.prototype) || null;
              (window.Event = Window.prototype.Event = function a(e, t) {
                if (!e) throw new Error("Not enough arguments");
                var n;
                if ("createEvent" in document) {
                  n = document.createEvent("Event");
                  var i = !(!t || t.bubbles === u) && t.bubbles,
                    o = !(!t || t.cancelable === u) && t.cancelable;
                  return n.initEvent(e, i, o), n;
                }
                return (
                  ((n = document.createEventObject()).type = e),
                  (n.bubbles = !(!t || t.bubbles === u) && t.bubbles),
                  (n.cancelable = !(!t || t.cancelable === u) && t.cancelable),
                  n
                );
              }),
                e &&
                  Object.defineProperty(window.Event, "prototype", {
                    configurable: !1,
                    enumerable: !1,
                    writable: !0,
                    value: e,
                  }),
                "createEvent" in document ||
                  ((window.addEventListener = Window.prototype.addEventListener = Document.prototype.addEventListener = Element.prototype.addEventListener = function r(
                    e,
                    t
                  ) {
                    var u = this,
                      n = e,
                      i = t;
                    if (u === window && n in o)
                      throw new Error(
                        "In IE8 the event: " +
                          n +
                          " is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information."
                      );
                    u._events || (u._events = {}),
                      u._events[n] ||
                        ((u._events[n] = function (e) {
                          var t,
                            n = u._events[e.type].list,
                            i = n.slice(),
                            o = -1,
                            a = i.length;
                          for (
                            e.preventDefault = function r() {
                              !1 !== e.cancelable && (e.returnValue = !1);
                            },
                              e.stopPropagation = function s() {
                                e.cancelBubble = !0;
                              },
                              e.stopImmediatePropagation = function c() {
                                (e.cancelBubble = !0), (e.cancelImmediate = !0);
                              },
                              e.currentTarget = u,
                              e.relatedTarget = e.fromElement || null,
                              e.target = e.target || e.srcElement || u,
                              e.timeStamp = new Date().getTime(),
                              e.clientX &&
                                ((e.pageX =
                                  e.clientX +
                                  document.documentElement.scrollLeft),
                                (e.pageY =
                                  e.clientY +
                                  document.documentElement.scrollTop));
                            ++o < a && !e.cancelImmediate;

                          )
                            o in i &&
                              -1 !== d(n, (t = i[o])) &&
                              "function" == typeof t &&
                              t.call(u, e);
                        }),
                        (u._events[n].list = []),
                        u.attachEvent && u.attachEvent("on" + n, u._events[n])),
                      u._events[n].list.push(i);
                  }),
                  (window.removeEventListener = Window.prototype.removeEventListener = Document.prototype.removeEventListener = Element.prototype.removeEventListener = function s(
                    e,
                    t
                  ) {
                    var n,
                      i = this,
                      o = e,
                      a = t;
                    i._events &&
                      i._events[o] &&
                      i._events[o].list &&
                      -1 !== (n = d(i._events[o].list, a)) &&
                      (i._events[o].list.splice(n, 1),
                      i._events[o].list.length ||
                        (i.detachEvent && i.detachEvent("on" + o, i._events[o]),
                        delete i._events[o]));
                  }),
                  (window.dispatchEvent = Window.prototype.dispatchEvent = Document.prototype.dispatchEvent = Element.prototype.dispatchEvent = function c(
                    e
                  ) {
                    if (!arguments.length)
                      throw new Error("Not enough arguments");
                    if (!e || "string" != typeof e.type)
                      throw new Error("DOM Events Exception 0");
                    var t = this,
                      n = e.type;
                    try {
                      if (!e.bubbles) {
                        e.cancelBubble = !0;
                        var i = function (e) {
                          (e.cancelBubble = !0),
                            (t || window).detachEvent("on" + n, i);
                        };
                        this.attachEvent("on" + n, i);
                      }
                      this.fireEvent("on" + n, e);
                    } catch (o) {
                      for (
                        e.target = t;
                        "_events" in (e.currentTarget = t) &&
                          "function" == typeof t._events[n] &&
                          t._events[n].call(t, e),
                          "function" == typeof t["on" + n] &&
                            t["on" + n].call(t, e),
                          (t =
                            9 === t.nodeType ? t.parentWindow : t.parentNode) &&
                            !e.cancelBubble;

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
      function (g) {
        var e, t, n;
        ("DOMTokenList" in this &&
          (!("classList" in (e = document.createElement("x"))) ||
            (!e.classList.toggle("x", !1) && !e.className))) ||
          (("DOMTokenList" in (t = this) &&
            t.DOMTokenList &&
            (!document.createElementNS ||
              !document.createElementNS("http://www.w3.org/2000/svg", "svg") ||
              document.createElementNS("http://www.w3.org/2000/svg", "svg")
                .classList instanceof DOMTokenList)) ||
            (t.DOMTokenList = (function () {
              var o = !0,
                n = function (e, t, n, i) {
                  Object.defineProperty
                    ? Object.defineProperty(e, t, {
                        configurable: !1 === o || !!i,
                        get: n,
                      })
                    : e.__defineGetter__(t, n);
                };
              try {
                n({}, "support");
              } catch (e) {
                o = !1;
              }
              return function (o, a) {
                var r = this,
                  s = [],
                  c = {},
                  u = 0,
                  e = 0,
                  t = function (e) {
                    n(
                      r,
                      e,
                      function () {
                        return l(), s[e];
                      },
                      !1
                    );
                  },
                  d = function () {
                    if (e <= u) for (; e < u; ++e) t(e);
                  },
                  l = function () {
                    var e,
                      t,
                      n = arguments,
                      i = /\s+/;
                    if (n.length)
                      for (t = 0; t < n.length; ++t)
                        if (i.test(n[t]))
                          throw (
                            (((e = new SyntaxError(
                              'String "' +
                                n[t] +
                                '" contains an invalid character'
                            )).code = 5),
                            (e.name = "InvalidCharacterError"),
                            e)
                          );
                    for (
                      "" ===
                        (s =
                          "object" == typeof o[a]
                            ? ("" + o[a].baseVal)
                                .replace(/^\s+|\s+$/g, "")
                                .split(i)
                            : ("" + o[a])
                                .replace(/^\s+|\s+$/g, "")
                                .split(i))[0] && (s = []),
                        c = {},
                        t = 0;
                      t < s.length;
                      ++t
                    )
                      c[s[t]] = !0;
                    (u = s.length), d();
                  };
                return (
                  l(),
                  n(r, "length", function () {
                    return l(), u;
                  }),
                  (r.toLocaleString = r.toString = function () {
                    return l(), s.join(" ");
                  }),
                  (r.item = function (e) {
                    return l(), s[e];
                  }),
                  (r.contains = function (e) {
                    return l(), !!c[e];
                  }),
                  (r.add = function () {
                    l.apply(r, (e = arguments));
                    for (var e, t, n = 0, i = e.length; n < i; ++n)
                      (t = e[n]), c[t] || (s.push(t), (c[t] = !0));
                    u !== s.length &&
                      ((u = s.length >>> 0),
                      "object" == typeof o[a]
                        ? (o[a].baseVal = s.join(" "))
                        : (o[a] = s.join(" ")),
                      d());
                  }),
                  (r.remove = function () {
                    l.apply(r, (e = arguments));
                    for (var e, t = {}, n = 0, i = []; n < e.length; ++n)
                      (t[e[n]] = !0), delete c[e[n]];
                    for (n = 0; n < s.length; ++n) t[s[n]] || i.push(s[n]);
                    (u = (s = i).length >>> 0),
                      "object" == typeof o[a]
                        ? (o[a].baseVal = s.join(" "))
                        : (o[a] = s.join(" ")),
                      d();
                  }),
                  (r.toggle = function (e, t) {
                    return (
                      l.apply(r, [e]),
                      g !== t
                        ? t
                          ? (r.add(e), !0)
                          : (r.remove(e), !1)
                        : c[e]
                        ? (r.remove(e), !1)
                        : (r.add(e), !0)
                    );
                  }),
                  r
                );
              };
            })()),
          "classList" in (n = document.createElement("span")) &&
            (n.classList.toggle("x", !1),
            n.classList.contains("x") &&
              (n.classList.constructor.prototype.toggle = function o(e, t) {
                var n = t;
                if (n !== g) return this[(n = !!n) ? "add" : "remove"](e), n;
                var i = !this.contains(e);
                return this[i ? "add" : "remove"](e), i;
              })),
          (function () {
            var e = document.createElement("span");
            if (
              "classList" in e &&
              (e.classList.add("a", "b"), !e.classList.contains("b"))
            ) {
              var i = e.classList.constructor.prototype.add;
              e.classList.constructor.prototype.add = function () {
                for (var e = arguments, t = arguments.length, n = 0; n < t; n++)
                  i.call(this, e[n]);
              };
            }
          })(),
          (function () {
            var e = document.createElement("span");
            if (
              "classList" in e &&
              (e.classList.add("a"),
              e.classList.add("b"),
              e.classList.remove("a", "b"),
              e.classList.contains("b"))
            ) {
              var i = e.classList.constructor.prototype.remove;
              e.classList.constructor.prototype.remove = function () {
                for (var e = arguments, t = arguments.length, n = 0; n < t; n++)
                  i.call(this, e[n]);
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
        var e;
        ("document" in this &&
          "classList" in document.documentElement &&
          "Element" in this &&
          "classList" in Element.prototype &&
          ((e = document.createElement("span")).classList.add("a", "b"),
          e.classList.contains("b"))) ||
          (function (e) {
            var d = !0,
              l = function (e, t, n, i) {
                Object.defineProperty
                  ? Object.defineProperty(e, t, {
                      configurable: !1 === d || !!i,
                      get: n,
                    })
                  : e.__defineGetter__(t, n);
              };
            try {
              l({}, "support");
            } catch (t) {
              d = !1;
            }
            var g = function (e, c, u) {
              l(
                e.prototype,
                c,
                function () {
                  var e,
                    t = this,
                    n = "__defineGetter__DEFINE_PROPERTY" + c;
                  if (t[n]) return e;
                  if (!(t[n] = !0) === d) {
                    for (
                      var i,
                        o = g.mirror || document.createElement("div"),
                        a = o.childNodes,
                        r = a.length,
                        s = 0;
                      s < r;
                      ++s
                    )
                      if (a[s]._R === t) {
                        i = a[s];
                        break;
                      }
                    i || (i = o.appendChild(document.createElement("div"))),
                      (e = DOMTokenList.call(i, t, u));
                  } else e = new DOMTokenList(t, u);
                  return (
                    l(t, c, function () {
                      return e;
                    }),
                    delete t[n],
                    e
                  );
                },
                !0
              );
            };
            g(e.Element, "classList", "className"),
              g(e.HTMLElement, "classList", "className"),
              g(e.HTMLLinkElement, "relList", "rel"),
              g(e.HTMLAnchorElement, "relList", "rel"),
              g(e.HTMLAreaElement, "relList", "rel");
          })(this);
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      function () {
        "bind" in Function.prototype ||
          Object.defineProperty(Function.prototype, "bind", {
            value: function U(t) {
              var n,
                e = Array,
                i = Object,
                o = i.prototype,
                a = e.prototype,
                r = function r() {},
                s = o.toString,
                c =
                  "function" == typeof Symbol &&
                  "symbol" == typeof Symbol.toStringTag,
                u = Function.prototype.toString,
                d = function d(e) {
                  try {
                    return u.call(e), !0;
                  } catch (t) {
                    return !1;
                  }
                },
                l = "[object Function]",
                g = "[object GeneratorFunction]";
              n = function n(e) {
                if ("function" != typeof e) return !1;
                if (c) return d(e);
                var t = s.call(e);
                return t === l || t === g;
              };
              var p = a.slice,
                f = a.concat,
                h = a.push,
                v = Math.max,
                m = this;
              if (!n(m))
                throw new TypeError(
                  "Function.prototype.bind called on incompatible " + m
                );
              for (
                var k,
                  y = p.call(arguments, 1),
                  w = function () {
                    if (this instanceof k) {
                      var e = m.apply(this, f.call(y, p.call(arguments)));
                      return i(e) === e ? e : this;
                    }
                    return m.apply(t, f.call(y, p.call(arguments)));
                  },
                  b = v(0, m.length - y.length),
                  O = [],
                  C = 0;
                C < b;
                C++
              )
                h.call(O, "$" + C);
              return (
                (k = Function(
                  "binder",
                  "return function (" +
                    O.join(",") +
                    "){ return binder.apply(this, arguments); }"
                )(w)),
                m.prototype &&
                  ((r.prototype = m.prototype),
                  (k.prototype = new r()),
                  (r.prototype = null)),
                k
              );
            },
          });
      }.call(
        ("object" == typeof window && window) ||
          ("object" == typeof self && self) ||
          ("object" == typeof global && global) ||
          {}
      ),
      (e.prototype.init = function () {
        this.$module &&
          this.$menuButton &&
          this.$menu &&
          (this.syncState(
            this.$menu.classList.contains("govuk-header__navigation--open")
          ),
          this.$menuButton.addEventListener(
            "click",
            this.handleMenuButtonClick.bind(this)
          ));
      }),
      (e.prototype.syncState = function (e) {
        this.$menuButton.classList.toggle("govuk-header__menu-button--open", e),
          this.$menuButton.setAttribute("aria-expanded", e);
      }),
      (e.prototype.handleMenuButtonClick = function () {
        var e = this.$menu.classList.toggle("govuk-header__navigation--open");
        this.syncState(e);
      }),
      e
    );
  }),
  (window.GOVUK = window.GOVUK || {}),
  (window.GOVUK.Modules = window.GOVUK.Modules || {}),
  (window.GOVUK.Modules.Header = window.GOVUKFrontend);
