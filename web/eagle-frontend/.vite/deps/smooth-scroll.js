var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js
var require_smooth_scroll_polyfills_min = __commonJS({
  "../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js"(exports, module) {
    window.Element && !Element.prototype.closest && (Element.prototype.closest = function(e) {
      var t, n = (this.document || this.ownerDocument).querySelectorAll(e), o = this;
      do {
        for (t = n.length; 0 <= --t && n.item(t) !== o; )
          ;
      } while (t < 0 && (o = o.parentElement));
      return o;
    }), function() {
      if ("function" == typeof window.CustomEvent)
        return;
      function e(e2, t) {
        t = t || { bubbles: false, cancelable: false, detail: void 0 };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e2, t.bubbles, t.cancelable, t.detail), n;
      }
      e.prototype = window.Event.prototype, window.CustomEvent = e;
    }(), function() {
      for (var r = 0, e = ["ms", "moz", "webkit", "o"], t = 0; t < e.length && !window.requestAnimationFrame; ++t)
        window.requestAnimationFrame = window[e[t] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[t] + "CancelAnimationFrame"] || window[e[t] + "CancelRequestAnimationFrame"];
      window.requestAnimationFrame || (window.requestAnimationFrame = function(e2, t2) {
        var n = (/* @__PURE__ */ new Date()).getTime(), o = Math.max(0, 16 - (n - r)), a = window.setTimeout(function() {
          e2(n + o);
        }, o);
        return r = n + o, a;
      }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(e2) {
        clearTimeout(e2);
      });
    }(), function(e, t) {
      "function" == typeof define && define.amd ? define([], function() {
        return t(e);
      }) : "object" == typeof exports ? module.exports = t(e) : e.SmoothScroll = t(e);
    }("undefined" != typeof global ? global : "undefined" != typeof window ? window : exports, function(M) {
      "use strict";
      var q = { ignore: "[data-scroll-ignore]", header: null, topOnEmptyHash: true, speed: 500, speedAsDuration: false, durationMax: null, durationMin: null, clip: true, offset: 0, easing: "easeInOutCubic", customEasing: null, updateURL: true, popstate: true, emitEvents: true }, I = function() {
        var n = {};
        return Array.prototype.forEach.call(arguments, function(e) {
          for (var t in e) {
            if (!e.hasOwnProperty(t))
              return;
            n[t] = e[t];
          }
        }), n;
      }, r = function(e) {
        "#" === e.charAt(0) && (e = e.substr(1));
        for (var t, n = String(e), o = n.length, a = -1, r2 = "", i = n.charCodeAt(0); ++a < o; ) {
          if (0 === (t = n.charCodeAt(a)))
            throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
          1 <= t && t <= 31 || 127 == t || 0 === a && 48 <= t && t <= 57 || 1 === a && 48 <= t && t <= 57 && 45 === i ? r2 += "\\" + t.toString(16) + " " : r2 += 128 <= t || 45 === t || 95 === t || 48 <= t && t <= 57 || 65 <= t && t <= 90 || 97 <= t && t <= 122 ? n.charAt(a) : "\\" + n.charAt(a);
        }
        return "#" + r2;
      }, F = function() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
      }, L = function(e) {
        return e ? (t = e, parseInt(M.getComputedStyle(t).height, 10) + e.offsetTop) : 0;
        var t;
      }, x = function(e, t, n) {
        0 === e && document.body.focus(), n || (e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus(), e.style.outline = "none"), M.scrollTo(0, t));
      }, H = function(e, t, n, o) {
        if (t.emitEvents && "function" == typeof M.CustomEvent) {
          var a = new CustomEvent(e, { bubbles: true, detail: { anchor: n, toggle: o } });
          document.dispatchEvent(a);
        }
      };
      return function(o, e) {
        var b, a, A, O, C = {};
        C.cancelScroll = function(e2) {
          cancelAnimationFrame(O), O = null, e2 || H("scrollCancel", b);
        }, C.animateScroll = function(a2, r2, e2) {
          C.cancelScroll();
          var i = I(b || q, e2 || {}), c = "[object Number]" === Object.prototype.toString.call(a2), t2 = c || !a2.tagName ? null : a2;
          if (c || t2) {
            var s = M.pageYOffset;
            i.header && !A && (A = document.querySelector(i.header));
            var n2, o2, u, l, m, d, f, h, p = L(A), g = c ? a2 : function(e3, t3, n3, o3) {
              var a3 = 0;
              if (e3.offsetParent)
                for (; a3 += e3.offsetTop, e3 = e3.offsetParent; )
                  ;
              return a3 = Math.max(a3 - t3 - n3, 0), o3 && (a3 = Math.min(a3, F() - M.innerHeight)), a3;
            }(t2, p, parseInt("function" == typeof i.offset ? i.offset(a2, r2) : i.offset, 10), i.clip), y = g - s, v = F(), w = 0, S = (n2 = y, u = (o2 = i).speedAsDuration ? o2.speed : Math.abs(n2 / 1e3 * o2.speed), o2.durationMax && u > o2.durationMax ? o2.durationMax : o2.durationMin && u < o2.durationMin ? o2.durationMin : parseInt(u, 10)), E = function(e3) {
              var t3, n3, o3;
              l || (l = e3), w += e3 - l, d = s + y * (n3 = m = 1 < (m = 0 === S ? 0 : w / S) ? 1 : m, "easeInQuad" === (t3 = i).easing && (o3 = n3 * n3), "easeOutQuad" === t3.easing && (o3 = n3 * (2 - n3)), "easeInOutQuad" === t3.easing && (o3 = n3 < 0.5 ? 2 * n3 * n3 : (4 - 2 * n3) * n3 - 1), "easeInCubic" === t3.easing && (o3 = n3 * n3 * n3), "easeOutCubic" === t3.easing && (o3 = --n3 * n3 * n3 + 1), "easeInOutCubic" === t3.easing && (o3 = n3 < 0.5 ? 4 * n3 * n3 * n3 : (n3 - 1) * (2 * n3 - 2) * (2 * n3 - 2) + 1), "easeInQuart" === t3.easing && (o3 = n3 * n3 * n3 * n3), "easeOutQuart" === t3.easing && (o3 = 1 - --n3 * n3 * n3 * n3), "easeInOutQuart" === t3.easing && (o3 = n3 < 0.5 ? 8 * n3 * n3 * n3 * n3 : 1 - 8 * --n3 * n3 * n3 * n3), "easeInQuint" === t3.easing && (o3 = n3 * n3 * n3 * n3 * n3), "easeOutQuint" === t3.easing && (o3 = 1 + --n3 * n3 * n3 * n3 * n3), "easeInOutQuint" === t3.easing && (o3 = n3 < 0.5 ? 16 * n3 * n3 * n3 * n3 * n3 : 1 + 16 * --n3 * n3 * n3 * n3 * n3), t3.customEasing && (o3 = t3.customEasing(n3)), o3 || n3), M.scrollTo(0, Math.floor(d)), function(e4, t4) {
                var n4 = M.pageYOffset;
                if (e4 == t4 || n4 == t4 || (s < t4 && M.innerHeight + n4) >= v)
                  return C.cancelScroll(true), x(a2, t4, c), H("scrollStop", i, a2, r2), !(O = l = null);
              }(d, g) || (O = M.requestAnimationFrame(E), l = e3);
            };
            0 === M.pageYOffset && M.scrollTo(0, 0), f = a2, h = i, c || history.pushState && h.updateURL && history.pushState({ smoothScroll: JSON.stringify(h), anchor: f.id }, document.title, f === document.documentElement ? "#top" : "#" + f.id), "matchMedia" in M && M.matchMedia("(prefers-reduced-motion)").matches ? x(a2, Math.floor(g), false) : (H("scrollStart", i, a2, r2), C.cancelScroll(true), M.requestAnimationFrame(E));
          }
        };
        var t = function(e2) {
          if (!e2.defaultPrevented && !(0 !== e2.button || e2.metaKey || e2.ctrlKey || e2.shiftKey) && "closest" in e2.target && (a = e2.target.closest(o)) && "a" === a.tagName.toLowerCase() && !e2.target.closest(b.ignore) && a.hostname === M.location.hostname && a.pathname === M.location.pathname && /#/.test(a.href)) {
            var t2, n2;
            try {
              t2 = r(decodeURIComponent(a.hash));
            } catch (e3) {
              t2 = r(a.hash);
            }
            if ("#" === t2) {
              if (!b.topOnEmptyHash)
                return;
              n2 = document.documentElement;
            } else
              n2 = document.querySelector(t2);
            (n2 = n2 || "#top" !== t2 ? n2 : document.documentElement) && (e2.preventDefault(), function(e3) {
              if (history.replaceState && e3.updateURL && !history.state) {
                var t3 = M.location.hash;
                t3 = t3 || "", history.replaceState({ smoothScroll: JSON.stringify(e3), anchor: t3 || M.pageYOffset }, document.title, t3 || M.location.href);
              }
            }(b), C.animateScroll(n2, a));
          }
        }, n = function(e2) {
          if (null !== history.state && history.state.smoothScroll && history.state.smoothScroll === JSON.stringify(b)) {
            var t2 = history.state.anchor;
            "string" == typeof t2 && t2 && !(t2 = document.querySelector(r(history.state.anchor))) || C.animateScroll(t2, null, { updateURL: false });
          }
        };
        C.destroy = function() {
          b && (document.removeEventListener("click", t, false), M.removeEventListener("popstate", n, false), C.cancelScroll(), O = A = a = b = null);
        };
        return function() {
          if (!("querySelector" in document && "addEventListener" in M && "requestAnimationFrame" in M && "closest" in M.Element.prototype))
            throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
          C.destroy(), b = I(q, e || {}), A = b.header ? document.querySelector(b.header) : null, document.addEventListener("click", t, false), b.updateURL && b.popstate && M.addEventListener("popstate", n, false);
        }(), C;
      };
    });
  }
});
export default require_smooth_scroll_polyfills_min();
/*! Bundled license information:

smooth-scroll/dist/smooth-scroll.polyfills.min.js:
  (*! smooth-scroll v16.1.3 | (c) 2020 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll *)
*/
//# sourceMappingURL=smooth-scroll.js.map
