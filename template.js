window.Flourish = {
  "static_prefix": "static",
  "environment": "preview"
};

var LineRace = function (d,t) {
  "use strict";
  var _ = {},
    r = "http://www.w3.org/1999/xhtml",
    i = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: r,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

  function o(t) {
    var e = t += "",
      n = e.indexOf(":");
    return 0 <= n && "xmlns" !== (e = t.slice(0, n)) && (t = t.slice(n + 1)), i.hasOwnProperty(e) ? {
      space: i[e],
      local: t
    } : t
  }

  function a(t) {
    var e = o(t);
    return (e.local ? function (t) {
      return function () {
        return this.ownerDocument.createElementNS(t.space, t.local)
      }
    } : function (n) {
      return function () {
        var t = this.ownerDocument,
          e = this.namespaceURI;
        return e === r && t.documentElement.namespaceURI === r ? t.createElement(n) : t.createElementNS(e,
          n)
      }
    })(e)
  }

  function e() { }

  function p(t) {
    return null == t ? e : function () {
      return this.querySelector(t)
    }
  }

  function n() {
    return []
  }

  function y(t) {
    return null == t ? n : function () {
      return this.querySelectorAll(t)
    }
  }

  function c(t) {
    return function () {
      return this.matches(t)
    }
  }

  function s(t) {
    return new Array(t.length)
  }

  function g(t, e) {
    this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t,
      this.__data__ = e
  }
  g.prototype = {
    constructor: g,
    appendChild: function (t) {
      return this._parent.insertBefore(t, this._next)
    },
    insertBefore: function (t, e) {
      return this._parent.insertBefore(t, e)
    },
    querySelector: function (t) {
      return this._parent.querySelector(t)
    },
    querySelectorAll: function (t) {
      return this._parent.querySelectorAll(t)
    }
  };
  var m = "$";

  function b(t, e, n, r, i, o) {
    for (var a, s = 0, l = e.length, u = o.length; s < u; ++s)(a = e[s]) ? (a.__data__ = o[s], r[s] = a) : n[s] =
      new g(t, o[s]);
    for (; s < l; ++s)(a = e[s]) && (i[s] = a)
  }

  function w(t, e, n, r, i, o, a) {
    var s, l, u, c = {},
      h = e.length,
      f = o.length,
      _ = new Array(h);
    for (s = 0; s < h; ++s)(l = e[s]) && (_[s] = u = m + a.call(l, l.__data__, s, e), u in c ? i[s] = l : c[u] =
      l);
    for (s = 0; s < f; ++s)(l = c[u = m + a.call(t, o[s], s, o)]) ? ((r[s] = l).__data__ = o[s], c[u] = null) : n[
      s] = new g(t, o[s]);
    for (s = 0; s < h; ++s)(l = e[s]) && c[_[s]] === l && (i[s] = l)
  }

  function h(t, e) {
    return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN
  }

  function l(t) {
    return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView
  }

  function u(t, e) {
    return t.style.getPropertyValue(e) || l(t).getComputedStyle(t, null).getPropertyValue(e)
  }

  function f(t) {
    return t.trim().split(/^|\s+/)
  }

  function v(t) {
    return t.classList || new x(t)
  }

  function x(t) {
    this._node = t, this._names = f(t.getAttribute("class") || "")
  }

  function k(t, e) {
    for (var n = v(t), r = -1, i = e.length; ++r < i;) n.add(e[r])
  }

  function M(t, e) {
    for (var n = v(t), r = -1, i = e.length; ++r < i;) n.remove(e[r])
  }

  function T() {
    this.textContent = ""
  }

  function z() {
    this.innerHTML = ""
  }

  function C() {
    this.nextSibling && this.parentNode.appendChild(this)
  }

  function N() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild)
  }

  function A() {
    return null
  }

  function S() {
    var t = this.parentNode;
    t && t.removeChild(this)
  }

  function E() {
    return this.parentNode.insertBefore(this.cloneNode(!1), this.nextSibling)
  }

  function F() {
    return this.parentNode.insertBefore(this.cloneNode(!0), this.nextSibling)
  }
  x.prototype = {
    add: function (t) {
      this._names.indexOf(t) < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(
        " ")))
    },
    remove: function (t) {
      var e = this._names.indexOf(t);
      0 <= e && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")))
    },
    contains: function (t) {
      return 0 <= this._names.indexOf(t)
    }
  };
  var L = {},
    P = null;
  "undefined" != typeof document && ("onmouseenter" in document.documentElement || (L = {
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  }));

  function D(n, t, e) {
    return n = H(n, t, e),
      function (t) {
        var e = t.relatedTarget;
        e && (e === this || 8 & e.compareDocumentPosition(this)) || n.call(this, t)
      }
  }

  function H(n, r, i) {
    return function (t) {
      var e = P;
      P = t;
      try {
        n.call(this, this.__data__, r, i)
      } finally {
        P = e
      }
    }
  }

  function O(o) {
    return function () {
      var t = this.__on;
      if (t) {
        for (var e, n = 0, r = -1, i = t.length; n < i; ++n) e = t[n], o.type && e.type !== o.type || e.name !==
          o.name ? t[++r] = e : this.removeEventListener(e.type, e.listener, e.capture);
        ++r ? t.length = r : delete this.__on
      }
    }
  }

  function U(l, u, c) {
    var h = L.hasOwnProperty(l.type) ? D : H;
    return function (t, e, n) {
      var r, i = this.__on,
        o = h(u, e, n);
      if (i)
        for (var a = 0, s = i.length; a < s; ++a)
          if ((r = i[a]).type === l.type && r.name === l.name) return this.removeEventListener(r.type, r
            .listener, r.capture), this.addEventListener(r.type, r.listener = o, r.capture = c), void (r
              .value = u);
      this.addEventListener(l.type, o, c), r = {
        type: l.type,
        name: l.name,
        value: u,
        listener: o,
        capture: c
      }, i ? i.push(r) : this.__on = [r]
    }
  }

  function R(t, e, n) {
    var r = l(t),
      i = r.CustomEvent;
    "function" == typeof i ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n
      .bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i)
  }
  var Y = [null];

  function q(t, e) {
    this._groups = t, this._parents = e
  }

  function j() {
    return new q([
      [document.documentElement]
    ], Y)
  }

  function B(t) {
    return "string" == typeof t ? new q([
      [document.querySelector(t)]
    ], [document.documentElement]) : new q([
      [t]
    ], Y)
  }

  function I(t) {
    var e = function () {
      for (var t, e = P; t = e.sourceEvent;) e = t;
      return e
    }();
    return e.changedTouches && (e = e.changedTouches[0]),
      function (t, e) {
        var n = t.ownerSVGElement || t;
        if (n.createSVGPoint) {
          var r = n.createSVGPoint();
          return r.x = e.clientX, r.y = e.clientY, [(r = r.matrixTransform(t.getScreenCTM().inverse())).x, r.y]
        }
        var i = t.getBoundingClientRect();
        return [e.clientX - i.left - t.clientLeft, e.clientY - i.top - t.clientTop]
      }(t, e)
  }

  function X(t) {
    return "string" == typeof t ? new q([document.querySelectorAll(t)], [document.documentElement]) : new q([
      null == t ? [] : t
    ], Y)
  }
  q.prototype = j.prototype = {
    constructor: q,
    select: function (t) {
      "function" != typeof t && (t = p(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o, a, s = e[i], l = s.length, u = r[i] = new Array(l), c = 0; c < l; ++c)(o = s[c]) && (a = t
          .call(o, o.__data__, c, s)) && ("__data__" in o && (a.__data__ = o.__data__), u[c] = a);
      return new q(r, this._parents)
    },
    selectAll: function (t) {
      "function" != typeof t && (t = y(t));
      for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
        for (var a, s = e[o], l = s.length, u = 0; u < l; ++u)(a = s[u]) && (r.push(t.call(a, a.__data__, u,
          s)), i.push(a));
      return new q(r, i)
    },
    filter: function (t) {
      "function" != typeof t && (t = c(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o, a = e[i], s = a.length, l = r[i] = [], u = 0; u < s; ++u)(o = a[u]) && t.call(o, o
          .__data__, u, a) && l.push(o);
      return new q(r, this._parents)
    },
    data: function (t, e) {
      if (!t) return _ = new Array(this.size()), u = -1, this.each(function (t) {
        _[++u] = t
      }), _;
      var n = e ? w : b,
        r = this._parents,
        i = this._groups;
      "function" != typeof t && (t = function (t) {
        return function () {
          return t
        }
      }(t));
      for (var o = i.length, a = new Array(o), s = new Array(o), l = new Array(o), u = 0; u < o; ++u) {
        var c = r[u],
          h = i[u],
          f = h.length,
          _ = t.call(c, c && c.__data__, u, r),
          d = _.length,
          p = s[u] = new Array(d),
          g = a[u] = new Array(d);
        n(c, h, p, g, l[u] = new Array(f), _, e);
        for (var y, m, v = 0, x = 0; v < d; ++v)
          if (y = p[v]) {
            for (x <= v && (x = v + 1); !(m = g[x]) && ++x < d;);
            y._next = m || null
          }
      }
      return (a = new q(a, r))._enter = s, a._exit = l, a
    },
    enter: function () {
      return new q(this._enter || this._groups.map(s), this._parents)
    },
    exit: function () {
      return new q(this._exit || this._groups.map(s), this._parents)
    },
    join: function (t, e, n) {
      var r = this.enter(),
        i = this,
        o = this.exit();
      return r = "function" == typeof t ? t(r) : r.append(t + ""), null != e && (i = e(i)), null == n ? o
        .remove() : n(o), r && i ? r.merge(i).order() : i
    },
    merge: function (t) {
      for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(
        r), s = 0; s < o; ++s)
        for (var l, u = e[s], c = n[s], h = u.length, f = a[s] = new Array(h), _ = 0; _ < h; ++_)(l = u[_] ||
          c[_]) && (f[_] = l);
      for (; s < r; ++s) a[s] = e[s];
      return new q(a, this._parents)
    },
    order: function () {
      for (var t = this._groups, e = -1, n = t.length; ++e < n;)
        for (var r, i = t[e], o = i.length - 1, a = i[o]; 0 <= --o;)(r = i[o]) && (a && 4 ^ r
          .compareDocumentPosition(a) && a.parentNode.insertBefore(r, a), a = r);
      return this
    },
    sort: function (n) {
      function t(t, e) {
        return t && e ? n(t.__data__, e.__data__) : !t - !e
      }
      n = n || h;
      for (var e = this._groups, r = e.length, i = new Array(r), o = 0; o < r; ++o) {
        for (var a, s = e[o], l = s.length, u = i[o] = new Array(l), c = 0; c < l; ++c)(a = s[c]) && (u[c] =
          a);
        u.sort(t)
      }
      return new q(i, this._parents).order()
    },
    call: function () {
      var t = arguments[0];
      return arguments[0] = this, t.apply(null, arguments), this
    },
    nodes: function () {
      var t = new Array(this.size()),
        e = -1;
      return this.each(function () {
        t[++e] = this
      }), t
    },
    node: function () {
      for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
        for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
          var a = r[i];
          if (a) return a
        }
      return null
    },
    size: function () {
      var t = 0;
      return this.each(function () {
        ++t
      }), t
    },
    empty: function () {
      return !this.node()
    },
    each: function (t) {
      for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
        for (var i, o = e[n], a = 0, s = o.length; a < s; ++a)(i = o[a]) && t.call(i, i.__data__, a, o);
      return this
    },
    attr: function (t, e) {
      var n = o(t);
      if (arguments.length < 2) {
        var r = this.node();
        return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n)
      }
      return this.each((null == e ? n.local ? function (t) {
        return function () {
          this.removeAttributeNS(t.space, t.local)
        }
      } : function (t) {
        return function () {
          this.removeAttribute(t)
        }
      } : "function" == typeof e ? n.local ? function (e, n) {
        return function () {
          var t = n.apply(this, arguments);
          null == t ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local,
            t)
        }
      } : function (e, n) {
        return function () {
          var t = n.apply(this, arguments);
          null == t ? this.removeAttribute(e) : this.setAttribute(e, t)
        }
      } : n.local ? function (t, e) {
        return function () {
          this.setAttributeNS(t.space, t.local, e)
        }
      } : function (t, e) {
        return function () {
          this.setAttribute(t, e)
        }
      })(n, e))
    },
    style: function (t, e, n) {
      return 1 < arguments.length ? this.each((null == e ? function (t) {
        return function () {
          this.style.removeProperty(t)
        }
      } : "function" == typeof e ? function (e, n, r) {
        return function () {
          var t = n.apply(this, arguments);
          null == t ? this.style.removeProperty(e) : this.style.setProperty(e, t, r)
        }
      } : function (t, e, n) {
        return function () {
          this.style.setProperty(t, e, n)
        }
      })(t, e, null == n ? "" : n)) : u(this.node(), t)
    },
    property: function (t, e) {
      return 1 < arguments.length ? this.each((null == e ? function (t) {
        return function () {
          delete this[t]
        }
      } : "function" == typeof e ? function (e, n) {
        return function () {
          var t = n.apply(this, arguments);
          null == t ? delete this[e] : this[e] = t
        }
      } : function (t, e) {
        return function () {
          this[t] = e
        }
      })(t, e)) : this.node()[t]
    },
    classed: function (t, e) {
      var n = f(t + "");
      if (arguments.length < 2) {
        for (var r = v(this.node()), i = -1, o = n.length; ++i < o;)
          if (!r.contains(n[i])) return !1;
        return !0
      }
      return this.each(("function" == typeof e ? function (t, e) {
        return function () {
          (e.apply(this, arguments) ? k : M)(this, t)
        }
      } : e ? function (t) {
        return function () {
          k(this, t)
        }
      } : function (t) {
        return function () {
          M(this, t)
        }
      })(n, e))
    },
    text: function (t) {
      return arguments.length ? this.each(null == t ? T : ("function" == typeof t ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.textContent = null == t ? "" : t
        }
      } : function (t) {
        return function () {
          this.textContent = t
        }
      })(t)) : this.node().textContent
    },
    html: function (t) {
      return arguments.length ? this.each(null == t ? z : ("function" == typeof t ? function (e) {
        return function () {
          var t = e.apply(this, arguments);
          this.innerHTML = null == t ? "" : t
        }
      } : function (t) {
        return function () {
          this.innerHTML = t
        }
      })(t)) : this.node().innerHTML
    },
    raise: function () {
      return this.each(C)
    },
    lower: function () {
      return this.each(N)
    },
    append: function (t) {
      var e = "function" == typeof t ? t : a(t);
      return this.select(function () {
        return this.appendChild(e.apply(this, arguments))
      })
    },
    insert: function (t, e) {
      var n = "function" == typeof t ? t : a(t),
        r = null == e ? A : "function" == typeof e ? e : p(e);
      return this.select(function () {
        return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null)
      })
    },
    remove: function () {
      return this.each(S)
    },
    clone: function (t) {
      return this.select(t ? F : E)
    },
    datum: function (t) {
      return arguments.length ? this.property("__data__", t) : this.node().__data__
    },
    on: function (t, e, n) {
      var r, i, o = function (t) {
        return t.trim().split(/^|\s+/).map(function (t) {
          var e = "",
            n = t.indexOf(".");
          return 0 <= n && (e = t.slice(n + 1), t = t.slice(0, n)), {
            type: t,
            name: e
          }
        })
      }(t + ""),
        a = o.length;
      if (!(arguments.length < 2)) {
        for (s = e ? U : O, null == n && (n = !1), r = 0; r < a; ++r) this.each(s(o[r], e, n));
        return this
      }
      var s = this.node().__on;
      if (s)
        for (var l, u = 0, c = s.length; u < c; ++u)
          for (r = 0, l = s[u]; r < a; ++r)
            if ((i = o[r]).type === l.type && i.name === l.name) return l.value
    },
    dispatch: function (t, e) {
      return this.each(("function" == typeof e ? function (t, e) {
        return function () {
          return R(this, t, e.apply(this, arguments))
        }
      } : function (t, e) {
        return function () {
          return R(this, t, e)
        }
      })(t, e))
    }
  };
  var V = {
    value: function () { }
  };

  function W() {
    for (var t, e = 0, n = arguments.length, r = {}; e < n; ++e) {
      if (!(t = arguments[e] + "") || t in r) throw new Error("illegal type: " + t);
      r[t] = []
    }
    return new $(r)
  }

  function $(t) {
    this._ = t
  }

  function Z(t, e) {
    for (var n, r = 0, i = t.length; r < i; ++r)
      if ((n = t[r]).name === e) return n.value
  }

  function Q(t, e, n) {
    for (var r = 0, i = t.length; r < i; ++r)
      if (t[r].name === e) {
        t[r] = V, t = t.slice(0, r).concat(t.slice(r + 1));
        break
      } return null != n && t.push({
        name: e,
        value: n
      }), t
  }
  $.prototype = W.prototype = {
    constructor: $,
    on: function (t, e) {
      var n, r = this._,
        i = function (t, r) {
          return t.trim().split(/^|\s+/).map(function (t) {
            var e = "",
              n = t.indexOf(".");
            if (0 <= n && (e = t.slice(n + 1), t = t.slice(0, n)), t && !r.hasOwnProperty(t))
              throw new Error("unknown type: " + t);
            return {
              type: t,
              name: e
            }
          })
        }(t + "", r),
        o = -1,
        a = i.length;
      if (!(arguments.length < 2)) {
        if (null != e && "function" != typeof e) throw new Error("invalid callback: " + e);
        for (; ++o < a;)
          if (n = (t = i[o]).type) r[n] = Q(r[n], t.name, e);
          else if (null == e)
            for (n in r) r[n] = Q(r[n], t.name, null);
        return this
      }
      for (; ++o < a;)
        if ((n = (t = i[o]).type) && (n = Z(r[n], t.name))) return n
    },
    copy: function () {
      var t = {},
        e = this._;
      for (var n in e) t[n] = e[n].slice();
      return new $(t)
    },
    call: function (t, e) {
      if (0 < (n = arguments.length - 2))
        for (var n, r, i = new Array(n), o = 0; o < n; ++o) i[o] = arguments[o + 2];
      if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      for (o = 0, n = (r = this._[t]).length; o < n; ++o) r[o].value.apply(e, i)
    },
    apply: function (t, e, n) {
      if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
      for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n)
    }
  };
  var J, G, K = 0,
    tt = 0,
    et = 0,
    nt = 1e3,
    rt = 0,
    it = 0,
    ot = 0,
    at = "object" == typeof performance && performance.now ? performance : Date,
    st = "object" == typeof window && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) :
      function (t) {
        setTimeout(t, 17)
      };

  function lt() {
    return it || (st(ut), it = at.now() + ot)
  }

  function ut() {
    it = 0
  }

  function ct() {
    this._call = this._time = this._next = null
  }

  function ht(t, e, n) {
    var r = new ct;
    return r.restart(t, e, n), r
  }

  function ft() {
    it = (rt = at.now()) + ot, K = tt = 0;
    try {
      ! function () {
        lt(), ++K;
        for (var t, e = J; e;) 0 <= (t = it - e._time) && e._call.call(null, t), e = e._next;
        --K
      }()
    } finally {
      K = 0,
        function () {
          var t, e, n = J,
            r = 1 / 0;
          for (; n;) n = n._call ? (r > n._time && (r = n._time), (t = n)._next) : (e = n._next, n._next = null,
            t ? t._next = e : J = e);
          G = t, dt(r)
        }(), it = 0
    }
  }

  function _t() {
    var t = at.now(),
      e = t - rt;
    nt < e && (ot -= e, rt = t)
  }

  function dt(t) {
    K || (tt = tt && clearTimeout(tt), 24 < t - it ? (t < 1 / 0 && (tt = setTimeout(ft, t - at.now() - ot)), et =
      et && clearInterval(et)) : (et || (rt = at.now(), et = setInterval(_t, nt)), K = 1, st(ft)))
  }

  function pt(e, n, t) {
    var r = new ct;
    return n = null == n ? 0 : +n, r.restart(function (t) {
      r.stop(), e(t + n)
    }, n, t), r
  }
  ct.prototype = ht.prototype = {
    constructor: ct,
    restart: function (t, e, n) {
      if ("function" != typeof t) throw new TypeError("callback is not a function");
      n = (null == n ? lt() : +n) + (null == e ? 0 : +e), this._next || G === this || (G ? G._next = this :
        J = this, G = this), this._call = t, this._time = n, dt()
    },
    stop: function () {
      this._call && (this._call = null, this._time = 1 / 0, dt())
    }
  };
  var gt = W("start", "end", "cancel", "interrupt"),
    yt = [],
    mt = 0,
    vt = 1,
    xt = 2,
    bt = 3,
    wt = 4,
    kt = 5,
    Mt = 6;

  function Tt(t, e, n, r, i, o) {
    var a = t.__transition;
    if (a) {
      if (n in a) return
    } else t.__transition = {};
    ! function (o, a, s) {
      var l, u = o.__transition;

      function c(t) {
        var e, n, r, i;
        if (s.state !== vt) return f();
        for (e in u)
          if ((i = u[e]).name === s.name) {
            if (i.state === bt) return pt(c);
            i.state === wt ? (i.state = Mt, i.timer.stop(), i.on.call("interrupt", o, o.__data__, i.index, i
              .group), delete u[e]) : +e < a && (i.state = Mt, i.timer.stop(), i.on.call("cancel", o, o
                .__data__, i.index, i.group), delete u[e])
          } if (pt(function () {
            s.state === bt && (s.state = wt, s.timer.restart(h, s.delay, s.time), h(t))
          }), s.state = xt, s.on.call("start", o, o.__data__, s.index, s.group), s.state === xt) {
          for (s.state = bt, l = new Array(r = s.tween.length), e = 0, n = -1; e < r; ++e)(i = s.tween[e].value
            .call(o, o.__data__, s.index, s.group)) && (l[++n] = i);
          l.length = n + 1
        }
      }

      function h(t) {
        for (var e = t < s.duration ? s.ease.call(null, t / s.duration) : (s.timer.restart(f), s.state = kt, 1),
          n = -1, r = l.length; ++n < r;) l[n].call(o, e);
        s.state === kt && (s.on.call("end", o, o.__data__, s.index, s.group), f())
      }

      function f() {
        for (var t in s.state = Mt, s.timer.stop(), delete u[a], u) return;
        delete o.__transition
      } (u[a] = s).timer = ht(function (t) {
        s.state = vt, s.timer.restart(c, s.delay, s.time), s.delay <= t && c(t - s.delay)
      }, 0, s.time)
    }(t, n, {
      name: e,
      index: r,
      group: i,
      on: gt,
      tween: yt,
      time: o.time,
      delay: o.delay,
      duration: o.duration,
      ease: o.ease,
      timer: null,
      state: mt
    })
  }

  function zt(t, e) {
    var n = Nt(t, e);
    if (n.state > mt) throw new Error("too late; already scheduled");
    return n
  }

  function Ct(t, e) {
    var n = Nt(t, e);
    if (n.state > bt) throw new Error("too late; already running");
    return n
  }

  function Nt(t, e) {
    var n = t.__transition;
    if (!n || !(n = n[e])) throw new Error("transition not found");
    return n
  }

  function At(t, e, n) {
    t.prototype = e.prototype = n, n.constructor = t
  }

  function St(t, e) {
    var n = Object.create(t.prototype);
    for (var r in e) n[r] = e[r];
    return n
  }

  function Et() { }
  var Ft = 1 / .7,
    Lt = "\\s*([+-]?\\d+)\\s*",
    Pt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    Dt = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    Ht = /^#([0-9a-f]{3,8})$/,
    Ot = new RegExp("^rgb\\(" + [Lt, Lt, Lt] + "\\)$"),
    Ut = new RegExp("^rgb\\(" + [Dt, Dt, Dt] + "\\)$"),
    Rt = new RegExp("^rgba\\(" + [Lt, Lt, Lt, Pt] + "\\)$"),
    Yt = new RegExp("^rgba\\(" + [Dt, Dt, Dt, Pt] + "\\)$"),
    qt = new RegExp("^hsl\\(" + [Pt, Dt, Dt] + "\\)$"),
    jt = new RegExp("^hsla\\(" + [Pt, Dt, Dt, Pt] + "\\)$"),
    Bt = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074
    };

  function It() {
    return this.rgb().formatHex()
  }

  function Xt() {
    return this.rgb().formatRgb()
  }

  function Vt(t) {
    var e, n;
    return t = (t + "").trim().toLowerCase(), (e = Ht.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), 6 ===
      n ? Wt(e) : 3 === n ? new Jt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, (15 & e) << 4 | 15 & e,
        1) : 8 === n ? new Jt(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (255 & e) / 255) : 4 === n ? new Jt(
          e >>
          12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | 240 & e, ((15 & e) << 4 | 15 & e) /
        255) : null) : (e = Ot.exec(t)) ? new Jt(e[1], e[2], e[3], 1) : (e = Ut.exec(t)) ? new Jt(255 * e[1] /
          100, 255 * e[2] / 100, 255 * e[3] / 100, 1) : (e = Rt.exec(t)) ? $t(e[1], e[2], e[3], e[4]) : (e = Yt
            .exec(t)) ? $t(255 * e[1] / 100, 255 * e[2] / 100, 255 * e[3] / 100, e[4]) : (e = qt.exec(t)) ? ee(e[1],
              e[2] / 100, e[3] / 100, 1) : (e = jt.exec(t)) ? ee(e[1], e[2] / 100, e[3] / 100, e[4]) : Bt
                .hasOwnProperty(t) ? Wt(Bt[t]) : "transparent" === t ? new Jt(NaN, NaN, NaN, 0) : null
  }

  function Wt(t) {
    return new Jt(t >> 16 & 255, t >> 8 & 255, 255 & t, 1)
  }

  function $t(t, e, n, r) {
    return r <= 0 && (t = e = n = NaN), new Jt(t, e, n, r)
  }

  function Zt(t) {
    return t instanceof Et || (t = Vt(t)), t ? new Jt((t = t.rgb()).r, t.g, t.b, t.opacity) : new Jt
  }

  function Qt(t, e, n, r) {
    return 1 === arguments.length ? Zt(t) : new Jt(t, e, n, null == r ? 1 : r)
  }

  function Jt(t, e, n, r) {
    this.r = +t, this.g = +e, this.b = +n, this.opacity = +r
  }

  function Gt() {
    return "#" + te(this.r) + te(this.g) + te(this.b)
  }

  function Kt() {
    var t = this.opacity;
    return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255,
      Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(
        0, Math.min(255, Math.round(this.b) || 0)) + (1 === t ? ")" : ", " + t + ")")
  }

  function te(t) {
    return ((t = Math.max(0, Math.min(255, Math.round(t) || 0))) < 16 ? "0" : "") + t.toString(16)
  }

  function ee(t, e, n, r) {
    return r <= 0 ? t = e = n = NaN : n <= 0 || 1 <= n ? t = e = NaN : e <= 0 && (t = NaN), new re(t, e, n, r)
  }

  function ne(t) {
    if (t instanceof re) return new re(t.h, t.s, t.l, t.opacity);
    if (t instanceof Et || (t = Vt(t)), !t) return new re;
    if (t instanceof re) return t;
    var e = (t = t.rgb()).r / 255,
      n = t.g / 255,
      r = t.b / 255,
      i = Math.min(e, n, r),
      o = Math.max(e, n, r),
      a = NaN,
      s = o - i,
      l = (o + i) / 2;
    return s ? (a = e === o ? (n - r) / s + 6 * (n < r) : n === o ? (r - e) / s + 2 : (e - n) / s + 4, s /= l <
      .5 ? o + i : 2 - o - i, a *= 60) : s = 0 < l && l < 1 ? 0 : a, new re(a, s, l, t.opacity)
  }

  function re(t, e, n, r) {
    this.h = +t, this.s = +e, this.l = +n, this.opacity = +r
  }

  function ie(t, e, n) {
    return 255 * (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e)
  }
  At(Et, Vt, {
    copy: function (t) {
      return Object.assign(new this.constructor, this, t)
    },
    displayable: function () {
      return this.rgb().displayable()
    },
    hex: It,
    formatHex: It,
    formatHsl: function () {
      return ne(this).formatHsl()
    },
    formatRgb: Xt,
    toString: Xt
  }), At(Jt, Qt, St(Et, {
    brighter: function (t) {
      return t = null == t ? Ft : Math.pow(Ft, t), new Jt(this.r * t, this.g * t, this.b * t, this
        .opacity)
    },
    darker: function (t) {
      return t = null == t ? .7 : Math.pow(.7, t), new Jt(this.r * t, this.g * t, this.b * t, this
        .opacity)
    },
    rgb: function () {
      return this
    },
    displayable: function () {
      return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this
        .b < 255.5 && 0 <= this.opacity && this.opacity <= 1
    },
    hex: Gt,
    formatHex: Gt,
    formatRgb: Kt,
    toString: Kt
  })), At(re, function (t, e, n, r) {
    return 1 === arguments.length ? ne(t) : new re(t, e, n, null == r ? 1 : r)
  }, St(Et, {
    brighter: function (t) {
      return t = null == t ? Ft : Math.pow(Ft, t), new re(this.h, this.s, this.l * t, this.opacity)
    },
    darker: function (t) {
      return t = null == t ? .7 : Math.pow(.7, t), new re(this.h, this.s, this.l * t, this.opacity)
    },
    rgb: function () {
      var t = this.h % 360 + 360 * (this.h < 0),
        e = isNaN(t) || isNaN(this.s) ? 0 : this.s,
        n = this.l,
        r = n + (n < .5 ? n : 1 - n) * e,
        i = 2 * n - r;
      return new Jt(ie(240 <= t ? t - 240 : 120 + t, i, r), ie(t, i, r), ie(t < 120 ? 240 + t : t - 120,
        i, r), this.opacity)
    },
    displayable: function () {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this
        .opacity && this.opacity <= 1
    },
    formatHsl: function () {
      var t = this.opacity;
      return (1 === (t = isNaN(t) ? 1 : Math.max(0, Math.min(1, t))) ? "hsl(" : "hsla(") + (this.h || 0) +
        ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === t ? ")" : ", " + t + ")")
    }
  }));
  var oe = Math.PI / 180,
    ae = 180 / Math.PI,
    se = .96422,
    le = 1,
    ue = .82521,
    ce = 4 / 29,
    he = 6 / 29,
    fe = 3 * he * he,
    _e = he * he * he;

  function de(t) {
    if (t instanceof pe) return new pe(t.l, t.a, t.b, t.opacity);
    if (t instanceof be) return we(t);
    t instanceof Jt || (t = Zt(t));
    var e, n, r = ve(t.r),
      i = ve(t.g),
      o = ve(t.b),
      a = ge((.2225045 * r + .7168786 * i + .0606169 * o) / le);
    return r === i && i === o ? e = n = a : (e = ge((.4360747 * r + .3850649 * i + .1430804 * o) / se), n = ge((
      .0139322 * r + .0971045 * i + .7141733 * o) / ue)), new pe(116 * a - 16, 500 * (e - a), 200 * (a - n), t
        .opacity)
  }

  function pe(t, e, n, r) {
    this.l = +t, this.a = +e, this.b = +n, this.opacity = +r
  }

  function ge(t) {
    return _e < t ? Math.pow(t, 1 / 3) : t / fe + ce
  }

  function ye(t) {
    return he < t ? t * t * t : fe * (t - ce)
  }

  function me(t) {
    return 255 * (t <= .0031308 ? 12.92 * t : 1.055 * Math.pow(t, 1 / 2.4) - .055)
  }

  function ve(t) {
    return (t /= 255) <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
  }

  function xe(t, e, n, r) {
    return 1 === arguments.length ? function (t) {
      if (t instanceof be) return new be(t.h, t.c, t.l, t.opacity);
      if (t instanceof pe || (t = de(t)), 0 === t.a && 0 === t.b) return new be(NaN, 0 < t.l && t.l < 100 ? 0 :
        NaN, t.l, t.opacity);
      var e = Math.atan2(t.b, t.a) * ae;
      return new be(e < 0 ? 360 + e : e, Math.sqrt(t.a * t.a + t.b * t.b), t.l, t.opacity)
    }(t) : new be(t, e, n, null == r ? 1 : r)
  }

  function be(t, e, n, r) {
    this.h = +t, this.c = +e, this.l = +n, this.opacity = +r
  }

  function we(t) {
    if (isNaN(t.h)) return new pe(t.l, 0, 0, t.opacity);
    var e = t.h * oe;
    return new pe(t.l, Math.cos(e) * t.c, Math.sin(e) * t.c, t.opacity)
  }
  At(pe, function (t, e, n, r) {
    return 1 === arguments.length ? de(t) : new pe(t, e, n, null == r ? 1 : r)
  }, St(Et, {
    brighter: function (t) {
      return new pe(this.l + 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
    },
    darker: function (t) {
      return new pe(this.l - 18 * (null == t ? 1 : t), this.a, this.b, this.opacity)
    },
    rgb: function () {
      var t = (this.l + 16) / 116,
        e = isNaN(this.a) ? t : t + this.a / 500,
        n = isNaN(this.b) ? t : t - this.b / 200;
      return new Jt(me(3.1338561 * (e = se * ye(e)) - 1.6168667 * (t = le * ye(t)) - .4906146 * (n = ue *
        ye(n))), me(-.9787684 * e + 1.9161415 * t + .033454 * n), me(.0719453 * e - .2289914 * t +
          1.4052427 * n), this.opacity)
    }
  })), At(be, xe, St(Et, {
    brighter: function (t) {
      return new be(this.h, this.c, this.l + 18 * (null == t ? 1 : t), this.opacity)
    },
    darker: function (t) {
      return new be(this.h, this.c, this.l - 18 * (null == t ? 1 : t), this.opacity)
    },
    rgb: function () {
      return we(this).rgb()
    }
  }));
  var ke = 1.78277,
    Me = -.29227,
    Te = -.90649,
    ze = 1.97294,
    Ce = ze * Te,
    Ne = ze * ke,
    Ae = ke * Me - -.14861 * Te;

  function Se(t, e, n, r) {
    this.h = +t, this.s = +e, this.l = +n, this.opacity = +r
  }

  function Ee(t) {
    return function () {
      return t
    }
  }

  function Fe(n) {
    return 1 == (n = +n) ? Le : function (t, e) {
      return e - t ? function (e, n, r) {
        return e = Math.pow(e, r), n = Math.pow(n, r) - e, r = 1 / r,
          function (t) {
            return Math.pow(e + t * n, r)
          }
      }(t, e, n) : Ee(isNaN(t) ? e : t)
    }
  }

  function Le(t, e) {
    var n = e - t;
    return n ? function (e, n) {
      return function (t) {
        return e + t * n
      }
    }(t, n) : Ee(isNaN(t) ? e : t)
  }
  At(Se, function (t, e, n, r) {
    return 1 === arguments.length ? function (t) {
      if (t instanceof Se) return new Se(t.h, t.s, t.l, t.opacity);
      t instanceof Jt || (t = Zt(t));
      var e = t.r / 255,
        n = t.g / 255,
        r = t.b / 255,
        i = (Ae * r + Ce * e - Ne * n) / (Ae + Ce - Ne),
        o = r - i,
        a = (ze * (n - i) - Me * o) / Te,
        s = Math.sqrt(a * a + o * o) / (ze * i * (1 - i)),
        l = s ? Math.atan2(a, o) * ae - 120 : NaN;
      return new Se(l < 0 ? l + 360 : l, s, i, t.opacity)
    }(t) : new Se(t, e, n, null == r ? 1 : r)
  }, St(Et, {
    brighter: function (t) {
      return t = null == t ? Ft : Math.pow(Ft, t), new Se(this.h, this.s, this.l * t, this.opacity)
    },
    darker: function (t) {
      return t = null == t ? .7 : Math.pow(.7, t), new Se(this.h, this.s, this.l * t, this.opacity)
    },
    rgb: function () {
      var t = isNaN(this.h) ? 0 : (this.h + 120) * oe,
        e = +this.l,
        n = isNaN(this.s) ? 0 : this.s * e * (1 - e),
        r = Math.cos(t),
        i = Math.sin(t);
      return new Jt(255 * (e + n * (-.14861 * r + ke * i)), 255 * (e + n * (Me * r + Te * i)), 255 * (e +
        ze * r * n), this.opacity)
    }
  }));
  var Pe = function t(e) {
    var a = Fe(e);

    function n(e, t) {
      var n = a((e = Qt(e)).r, (t = Qt(t)).r),
        r = a(e.g, t.g),
        i = a(e.b, t.b),
        o = Le(e.opacity, t.opacity);
      return function (t) {
        return e.r = n(t), e.g = r(t), e.b = i(t), e.opacity = o(t), e + ""
      }
    }
    return n.gamma = t, n
  }(1);

  function De(e, n) {
    return n -= e = +e,
      function (t) {
        return e + n * t
      }
  }
  var He = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    Oe = new RegExp(He.source, "g");

  function Ue(t, r) {
    var e, n, i, o = He.lastIndex = Oe.lastIndex = 0,
      a = -1,
      s = [],
      l = [];
    for (t += "", r += "";
      (e = He.exec(t)) && (n = Oe.exec(r));)(i = n.index) > o && (i = r.slice(o, i), s[a] ? s[a] += i : s[++a] =
        i), (e = e[0]) === (n = n[0]) ? s[a] ? s[a] += n : s[++a] = n : (s[++a] = null, l.push({
          i: a,
          x: De(e, n)
        })), o = Oe.lastIndex;
    return o < r.length && (i = r.slice(o), s[a] ? s[a] += i : s[++a] = i), s.length < 2 ? l[0] ? function (e) {
      return function (t) {
        return e(t) + ""
      }
    }(l[0].x) : function (t) {
      return function () {
        return t
      }
    }(r) : (r = l.length, function (t) {
      for (var e, n = 0; n < r; ++n) s[(e = l[n]).i] = e.x(t);
      return s.join("")
    })
  }

  function Re(t, e) {
    var n, r = typeof e;
    return null == e || "boolean" == r ? Ee(e) : ("number" == r ? De : "string" == r ? (n = Vt(e)) ? (e = n, Pe) :
      Ue : e instanceof Vt ? Pe : e instanceof Date ? function (e, n) {
        var r = new Date;
        return n -= e = +e,
          function (t) {
            return r.setTime(e + n * t), r
          }
      } : Array.isArray(e) ? function (t, e) {
        var n, r = e ? e.length : 0,
          i = t ? Math.min(r, t.length) : 0,
          o = new Array(i),
          a = new Array(r);
        for (n = 0; n < i; ++n) o[n] = Re(t[n], e[n]);
        for (; n < r; ++n) a[n] = e[n];
        return function (t) {
          for (n = 0; n < i; ++n) a[n] = o[n](t);
          return a
        }
      } : "function" != typeof e.valueOf && "function" != typeof e.toString || isNaN(e) ? function (t, e) {
        var n, r = {},
          i = {};
        for (n in null !== t && "object" == typeof t || (t = {}), null !== e && "object" == typeof e || (
          e = {}), e) n in t ? r[n] = Re(t[n], e[n]) : i[n] = e[n];
        return function (t) {
          for (n in r) i[n] = r[n](t);
          return i
        }
      } : De)(t, e)
  }

  function Ye(e, n) {
    return n -= e = +e,
      function (t) {
        return Math.round(e + n * t)
      }
  }
  var qe, je, Be, Ie, Xe = 180 / Math.PI,
    Ve = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

  function We(t, e, n, r, i, o) {
    var a, s, l;
    return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (l = t * n + e * r) && (n -= t * l, r -= e * l), (
      s = Math.sqrt(n * n + r * r)) && (n /= s, r /= s, l /= s), t * r < e * n && (t = -t, e = -e, l = -l, a = -
        a), {
      translateX: i,
      translateY: o,
      rotate: Math.atan2(e, t) * Xe,
      skewX: Math.atan(l) * Xe,
      scaleX: a,
      scaleY: s
    }
  }

  function $e(n, s, l, a) {
    function u(t) {
      return t.length ? t.pop() + " " : ""
    }
    return function (t, e) {
      var i = [],
        o = [];
      return t = n(t), e = n(e),
        function (t, e, n, r, i, o) {
          if (t !== n || e !== r) {
            var a = i.push("translate(", null, s, null, l);
            o.push({
              i: a - 4,
              x: De(t, n)
            }, {
              i: a - 2,
              x: De(e, r)
            })
          } else (n || r) && i.push("translate(" + n + s + r + l)
        }(t.translateX, t.translateY, e.translateX, e.translateY, i, o),
        function (t, e, n, r) {
          t !== e ? (180 < t - e ? e += 360 : 180 < e - t && (t += 360), r.push({
            i: n.push(u(n) + "rotate(", null, a) - 2,
            x: De(t, e)
          })) : e && n.push(u(n) + "rotate(" + e + a)
        }(t.rotate, e.rotate, i, o),
        function (t, e, n, r) {
          t !== e ? r.push({
            i: n.push(u(n) + "skewX(", null, a) - 2,
            x: De(t, e)
          }) : e && n.push(u(n) + "skewX(" + e + a)
        }(t.skewX, e.skewX, i, o),
        function (t, e, n, r, i, o) {
          if (t !== n || e !== r) {
            var a = i.push(u(i) + "scale(", null, ",", null, ")");
            o.push({
              i: a - 4,
              x: De(t, n)
            }, {
              i: a - 2,
              x: De(e, r)
            })
          } else 1 === n && 1 === r || i.push(u(i) + "scale(" + n + "," + r + ")")
        }(t.scaleX, t.scaleY, e.scaleX, e.scaleY, i, o), t = e = null,
        function (t) {
          for (var e, n = -1, r = o.length; ++n < r;) i[(e = o[n]).i] = e.x(t);
          return i.join("")
        }
    }
  }
  var Ze = $e(function (t) {
    return "none" === t ? Ve : (qe || (qe = document.createElement("DIV"), je = document.documentElement, Be =
      document.defaultView), qe.style.transform = t, t = Be.getComputedStyle(je.appendChild(qe), null)
        .getPropertyValue("transform"), je.removeChild(qe), We(+(t = t.slice(7, -1).split(","))[0], +t[1], +t[
          2], +t[3], +t[4], +t[5]))
  }, "px, ", "px)", "deg)"),
    Qe = $e(function (t) {
      return null == t ? Ve : ((Ie = Ie || document.createElementNS("http://www.w3.org/2000/svg", "g"))
        .setAttribute("transform", t), (t = Ie.transform.baseVal.consolidate()) ? We((t = t.matrix).a, t.b, t
          .c, t.d, t.e, t.f) : Ve)
    }, ", ", ")", ")");
  Math.SQRT2;

  function Je(t, e, n) {
    var r = t._id;
    return t.each(function () {
      var t = Ct(this, r);
      (t.value || (t.value = {}))[e] = n.apply(this, arguments)
    }),
      function (t) {
        return Nt(t, r).value[e]
      }
  }

  function Ge(t, e) {
    var n;
    return ("number" == typeof e ? De : e instanceof Vt ? Pe : (n = Vt(e)) ? (e = n, Pe) : Ue)(t, e)
  }
  var Ke = j.prototype.constructor;

  function tn(t) {
    return function () {
      this.style.removeProperty(t)
    }
  }
  var en = 0;

  function nn(t, e, n, r) {
    this._groups = t, this._parents = e, this._name = n, this._id = r
  }

  function rn() {
    return ++en
  }
  var on = j.prototype;
  nn.prototype = function (t) {
    return j().transition(t)
  }.prototype = {
    constructor: nn,
    select: function (t) {
      var e = this._name,
        n = this._id;
      "function" != typeof t && (t = p(t));
      for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
        for (var s, l, u = r[a], c = u.length, h = o[a] = new Array(c), f = 0; f < c; ++f)(s = u[f]) && (l = t
          .call(s, s.__data__, f, u)) && ("__data__" in s && (l.__data__ = s.__data__), h[f] = l, Tt(h[f],
            e, n, f, h, Nt(s, n)));
      return new nn(o, this._parents, e, n)
    },
    selectAll: function (t) {
      var e = this._name,
        n = this._id;
      "function" != typeof t && (t = y(t));
      for (var r = this._groups, i = r.length, o = [], a = [], s = 0; s < i; ++s)
        for (var l, u = r[s], c = u.length, h = 0; h < c; ++h)
          if (l = u[h]) {
            for (var f, _ = t.call(l, l.__data__, h, u), d = Nt(l, n), p = 0, g = _.length; p < g; ++p)(f = _[
              p]) && Tt(f, e, n, p, _, d);
            o.push(_), a.push(l)
          } return new nn(o, a, e, n)
    },
    filter: function (t) {
      "function" != typeof t && (t = c(t));
      for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
        for (var o, a = e[i], s = a.length, l = r[i] = [], u = 0; u < s; ++u)(o = a[u]) && t.call(o, o
          .__data__, u, a) && l.push(o);
      return new nn(r, this._parents, this._name, this._id)
    },
    merge: function (t) {
      if (t._id !== this._id) throw new Error;
      for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(
        r), s = 0; s < o; ++s)
        for (var l, u = e[s], c = n[s], h = u.length, f = a[s] = new Array(h), _ = 0; _ < h; ++_)(l = u[_] ||
          c[_]) && (f[_] = l);
      for (; s < r; ++s) a[s] = e[s];
      return new nn(a, this._parents, this._name, this._id)
    },
    selection: function () {
      return new Ke(this._groups, this._parents)
    },
    transition: function () {
      for (var t = this._name, e = this._id, n = rn(), r = this._groups, i = r.length, o = 0; o < i; ++o)
        for (var a, s = r[o], l = s.length, u = 0; u < l; ++u)
          if (a = s[u]) {
            var c = Nt(a, e);
            Tt(a, t, n, u, s, {
              time: c.time + c.delay + c.duration,
              delay: 0,
              duration: c.duration,
              ease: c.ease
            })
          } return new nn(r, this._parents, t, n)
    },
    call: on.call,
    nodes: on.nodes,
    node: on.node,
    size: on.size,
    empty: on.empty,
    each: on.each,
    on: function (t, e) {
      var n = this._id;
      return arguments.length < 2 ? Nt(this.node(), n).on.on(t) : this.each(function (n, r, i) {
        var o, a, s = function (t) {
          return (t + "").trim().split(/^|\s+/).every(function (t) {
            var e = t.indexOf(".");
            return 0 <= e && (t = t.slice(0, e)), !t || "start" === t
          })
        }(r) ? zt : Ct;
        return function () {
          var t = s(this, n),
            e = t.on;
          e !== o && (a = (o = e).copy()).on(r, i), t.on = a
        }
      }(n, t, e))
    },
    attr: function (t, e) {
      var n = o(t),
        r = "transform" === n ? Qe : Ge;
      return this.attrTween(t, "function" == typeof e ? (n.local ? function (r, i, o) {
        var a, s, l;
        return function () {
          var t, e, n = o(this);
          if (null != n) return (t = this.getAttributeNS(r.space, r.local)) === (e = n + "") ? null :
            t === a && e === s ? l : (s = e, l = i(a = t, n));
          this.removeAttributeNS(r.space, r.local)
        }
      } : function (r, i, o) {
        var a, s, l;
        return function () {
          var t, e, n = o(this);
          if (null != n) return (t = this.getAttribute(r)) === (e = n + "") ? null : t === a && e ===
            s ? l : (s = e, l = i(a = t, n));
          this.removeAttribute(r)
        }
      })(n, r, Je(this, "attr." + t, e)) : null == e ? (n.local ? function (t) {
        return function () {
          this.removeAttributeNS(t.space, t.local)
        }
      } : function (t) {
        return function () {
          this.removeAttribute(t)
        }
      })(n) : (n.local ? function (e, n, r) {
        var i, o, a = r + "";
        return function () {
          var t = this.getAttributeNS(e.space, e.local);
          return t === a ? null : t === i ? o : o = n(i = t, r)
        }
      } : function (e, n, r) {
        var i, o, a = r + "";
        return function () {
          var t = this.getAttribute(e);
          return t === a ? null : t === i ? o : o = n(i = t, r)
        }
      })(n, r, e))
    },
    attrTween: function (t, e) {
      var n = "attr." + t;
      if (arguments.length < 2) return (n = this.tween(n)) && n._value;
      if (null == e) return this.tween(n, null);
      if ("function" != typeof e) throw new Error;
      var r = o(t);
      return this.tween(n, (r.local ? function (e, n) {
        var r, i;

        function t() {
          var t = n.apply(this, arguments);
          return t !== i && (r = (i = t) && function (e, n) {
            return function (t) {
              this.setAttributeNS(e.space, e.local, n(t))
            }
          }(e, t)), r
        }
        return t._value = n, t
      } : function (e, n) {
        var r, i;

        function t() {
          var t = n.apply(this, arguments);
          return t !== i && (r = (i = t) && function (e, n) {
            return function (t) {
              this.setAttribute(e, n(t))
            }
          }(e, t)), r
        }
        return t._value = n, t
      })(r, e))
    },
    style: function (t, e, n) {
      var r = "transform" == (t += "") ? Ze : Ge;
      return null == e ? this.styleTween(t, function (n, r) {
        var i, o, a;
        return function () {
          var t = u(this, n),
            e = (this.style.removeProperty(n), u(this, n));
          return t === e ? null : t === i && e === o ? a : a = r(i = t, o = e)
        }
      }(t, r)).on("end.style." + t, tn(t)) : "function" == typeof e ? this.styleTween(t, function (r, i,
        o) {
        var a, s, l;
        return function () {
          var t = u(this, r),
            e = o(this),
            n = e + "";
          return null == e && (this.style.removeProperty(r), n = e = u(this, r)), t === n ? null : t ===
            a && n === s ? l : (s = n, l = i(a = t, e))
        }
      }(t, r, Je(this, "style." + t, e))).each(function (r, i) {
        var o, a, s, l, u = "style." + i,
          c = "end." + u;
        return function () {
          var t = Ct(this, r),
            e = t.on,
            n = null == t.value[u] ? l = l || tn(i) : void 0;
          e === o && s === n || (a = (o = e).copy()).on(c, s = n), t.on = a
        }
      }(this._id, t)) : this.styleTween(t, function (e, n, r) {
        var i, o, a = r + "";
        return function () {
          var t = u(this, e);
          return t === a ? null : t === i ? o : o = n(i = t, r)
        }
      }(t, r, e), n).on("end.style." + t, null)
    },
    styleTween: function (t, e, n) {
      var r = "style." + (t += "");
      if (arguments.length < 2) return (r = this.tween(r)) && r._value;
      if (null == e) return this.tween(r, null);
      if ("function" != typeof e) throw new Error;
      return this.tween(r, function (e, n, r) {
        var i, o;

        function t() {
          var t = n.apply(this, arguments);
          return t !== o && (i = (o = t) && function (e, n, r) {
            return function (t) {
              this.style.setProperty(e, n(t), r)
            }
          }(e, t, r)), i
        }
        return t._value = n, t
      }(t, e, null == n ? "" : n))
    },
    text: function (t) {
      return this.tween("text", "function" == typeof t ? function (e) {
        return function () {
          var t = e(this);
          this.textContent = null == t ? "" : t
        }
      }(Je(this, "text", t)) : function (t) {
        return function () {
          this.textContent = t
        }
      }(null == t ? "" : t + ""))
    },
    remove: function () {
      return this.on("end.remove", function (n) {
        return function () {
          var t = this.parentNode;
          for (var e in this.__transition)
            if (+e !== n) return;
          t && t.removeChild(this)
        }
      }(this._id))
    },
    tween: function (t, e) {
      var n = this._id;
      if (t += "", arguments.length < 2) {
        for (var r, i = Nt(this.node(), n).tween, o = 0, a = i.length; o < a; ++o)
          if ((r = i[o]).name === t) return r.value;
        return null
      }
      return this.each((null == e ? function (i, o) {
        var a, s;
        return function () {
          var t = Ct(this, i),
            e = t.tween;
          if (e !== a)
            for (var n = 0, r = (s = a = e).length; n < r; ++n)
              if (s[n].name === o) {
                (s = s.slice()).splice(n, 1);
                break
              } t.tween = s
        }
      } : function (o, a, s) {
        var l, u;
        if ("function" != typeof s) throw new Error;
        return function () {
          var t = Ct(this, o),
            e = t.tween;
          if (e !== l) {
            u = (l = e).slice();
            for (var n = {
              name: a,
              value: s
            }, r = 0, i = u.length; r < i; ++r)
              if (u[r].name === a) {
                u[r] = n;
                break
              } r === i && u.push(n)
          }
          t.tween = u
        }
      })(n, t, e))
    },
    delay: function (t) {
      var e = this._id;
      return arguments.length ? this.each(("function" == typeof t ? function (t, e) {
        return function () {
          zt(this, t).delay = +e.apply(this, arguments)
        }
      } : function (t, e) {
        return e = +e,
          function () {
            zt(this, t).delay = e
          }
      })(e, t)) : Nt(this.node(), e).delay
    },
    duration: function (t) {
      var e = this._id;
      return arguments.length ? this.each(("function" == typeof t ? function (t, e) {
        return function () {
          Ct(this, t).duration = +e.apply(this, arguments)
        }
      } : function (t, e) {
        return e = +e,
          function () {
            Ct(this, t).duration = e
          }
      })(e, t)) : Nt(this.node(), e).duration
    },
    ease: function (t) {
      var e = this._id;
      return arguments.length ? this.each(function (t, e) {
        if ("function" != typeof e) throw new Error;
        return function () {
          Ct(this, t).ease = e
        }
      }(e, t)) : Nt(this.node(), e).ease
    },
    end: function () {
      var i, o, a = this,
        s = a._id,
        l = a.size();
      return new Promise(function (t, e) {
        var n = {
          value: e
        },
          r = {
            value: function () {
              0 == --l && t()
            }
          };
        a.each(function () {
          var t = Ct(this, s),
            e = t.on;
          e !== i && ((o = (i = e).copy())._.cancel.push(n), o._.interrupt.push(n), o._.end.push(r)),
            t.on = o
        })
      })
    }
  };
  Math.PI, Math.PI;
  var an = {
    time: null,
    delay: 0,
    duration: 250,
    ease: function (t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
    }
  };

  function sn(t, e) {
    for (var n; !(n = t.__transition) || !(n = n[e]);)
      if (!(t = t.parentNode)) return an.time = lt(), an;
    return n
  }

  function ln(t, e) {
    return t < e ? -1 : e < t ? 1 : e <= t ? 0 : NaN
  }
  j.prototype.interrupt = function (t) {
    return this.each(function () {
      ! function (t, e) {
        var n, r, i, o = t.__transition,
          a = !0;
        if (o) {
          for (i in e = null == e ? null : e + "", o) (n = o[i]).name === e ? (r = n.state > xt && n.state <
            kt, n.state = Mt, n.timer.stop(), n.on.call(r ? "interrupt" : "cancel", t, t.__data__, n
              .index, n.group), delete o[i]) : a = !1;
          a && delete t.__transition
        }
      }(this, t)
    })
  }, j.prototype.transition = function (t) {
    var e, n;
    t = t instanceof nn ? (e = t._id, t._name) : (e = rn(), (n = an).time = lt(), null == t ? null : t + "");
    for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
      for (var a, s = r[o], l = s.length, u = 0; u < l; ++u)(a = s[u]) && Tt(a, t, e, u, s, n || sn(a, e));
    return new nn(r, this._parents, t, e)
  };
  var un, cn, hn = (1 === (cn = ln).length && (un = cn, cn = function (t, e) {
    return ln(un(t), e)
  }), {
    left: function (t, e, n, r) {
      for (null == n && (n = 0), null == r && (r = t.length); n < r;) {
        var i = n + r >>> 1;
        cn(t[i], e) < 0 ? n = 1 + i : r = i
      }
      return n
    },
    right: function (t, e, n, r) {
      for (null == n && (n = 0), null == r && (r = t.length); n < r;) {
        var i = n + r >>> 1;
        0 < cn(t[i], e) ? r = i : n = 1 + i
      }
      return n
    }
  }).right;
  var fn = Math.sqrt(50),
    _n = Math.sqrt(10),
    dn = Math.sqrt(2);

  function pn(t, e, n) {
    var r, i, o, a, s = -1;
    if (n = +n, (t = +t) === (e = +e) && 0 < n) return [t];
    if ((r = e < t) && (i = t, t = e, e = i), 0 === (a = gn(t, e, n)) || !isFinite(a)) return [];
    if (0 < a)
      for (t = Math.ceil(t / a), e = Math.floor(e / a), o = new Array(i = Math.ceil(e - t + 1)); ++s < i;) o[s] =
        (t + s) * a;
    else
      for (t = Math.floor(t * a), e = Math.ceil(e * a), o = new Array(i = Math.ceil(t - e + 1)); ++s < i;) o[s] =
        (t - s) / a;
    return r && o.reverse(), o
  }

  function gn(t, e, n) {
    var r = (e - t) / Math.max(0, n),
      i = Math.floor(Math.log(r) / Math.LN10),
      o = r / Math.pow(10, i);
    return 0 <= i ? (fn <= o ? 10 : _n <= o ? 5 : dn <= o ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (fn <=
      o ? 10 : _n <= o ? 5 : dn <= o ? 2 : 1)
  }

  function yn(t, e, n) {
    var r = Math.abs(e - t) / Math.max(0, n),
      i = Math.pow(10, Math.floor(Math.log(r) / Math.LN10)),
      o = r / i;
    return fn <= o ? i *= 10 : _n <= o ? i *= 5 : dn <= o && (i *= 2), e < t ? -i : i
  }

  function mn(t, e) {
    var n, r, i = t.length,
      o = -1;
    if (null == e) {
      for (; ++o < i;)
        if (null != (n = t[o]) && n <= n)
          for (r = n; ++o < i;) null != (n = t[o]) && r < n && (r = n)
    } else
      for (; ++o < i;)
        if (null != (n = e(t[o], o, t)) && n <= n)
          for (r = n; ++o < i;) null != (n = e(t[o], o, t)) && r < n && (r = n);
    return r
  }

  function vn(t, e) {
    var n, r, i = t.length,
      o = -1;
    if (null == e) {
      for (; ++o < i;)
        if (null != (n = t[o]) && n <= n)
          for (r = n; ++o < i;) null != (n = t[o]) && n < r && (r = n)
    } else
      for (; ++o < i;)
        if (null != (n = e(t[o], o, t)) && n <= n)
          for (r = n; ++o < i;) null != (n = e(t[o], o, t)) && n < r && (r = n);
    return r
  }
  var xn = Math.PI,
    bn = 2 * xn,
    wn = 1e-6,
    kn = bn - wn;

  function Mn() {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = ""
  }

  function Tn() {
    return new Mn
  }

  function zn(t) {
    return function () {
      return t
    }
  }
  Mn.prototype = Tn.prototype = {
    constructor: Mn,
    moveTo: function (t, e) {
      this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e)
    },
    closePath: function () {
      null !== this._x1 && (this._x1 = this._x0, this._y1 = this._y0, this._ += "Z")
    },
    lineTo: function (t, e) {
      this._ += "L" + (this._x1 = +t) + "," + (this._y1 = +e)
    },
    quadraticCurveTo: function (t, e, n, r) {
      this._ += "Q" + +t + "," + +e + "," + (this._x1 = +n) + "," + (this._y1 = +r)
    },
    bezierCurveTo: function (t, e, n, r, i, o) {
      this._ += "C" + +t + "," + +e + "," + +n + "," + +r + "," + (this._x1 = +i) + "," + (this._y1 = +o)
    },
    arcTo: function (t, e, n, r, i) {
      t = +t, e = +e, n = +n, r = +r, i = +i;
      var o = this._x1,
        a = this._y1,
        s = n - t,
        l = r - e,
        u = o - t,
        c = a - e,
        h = u * u + c * c;
      if (i < 0) throw new Error("negative radius: " + i);
      if (null === this._x1) this._ += "M" + (this._x1 = t) + "," + (this._y1 = e);
      else if (wn < h)
        if (Math.abs(c * s - l * u) > wn && i) {
          var f = n - o,
            _ = r - a,
            d = s * s + l * l,
            p = f * f + _ * _,
            g = Math.sqrt(d),
            y = Math.sqrt(h),
            m = i * Math.tan((xn - Math.acos((d + h - p) / (2 * g * y))) / 2),
            v = m / y,
            x = m / g;
          Math.abs(v - 1) > wn && (this._ += "L" + (t + v * u) + "," + (e + v * c)), this._ += "A" + i + "," +
            i + ",0,0," + +(u * _ < c * f) + "," + (this._x1 = t + x * s) + "," + (this._y1 = e + x * l)
        } else this._ += "L" + (this._x1 = t) + "," + (this._y1 = e);
      else;
    },
    arc: function (t, e, n, r, i, o) {
      t = +t, e = +e, o = !!o;
      var a = (n = +n) * Math.cos(r),
        s = n * Math.sin(r),
        l = t + a,
        u = e + s,
        c = 1 ^ o,
        h = o ? r - i : i - r;
      if (n < 0) throw new Error("negative radius: " + n);
      null === this._x1 ? this._ += "M" + l + "," + u : (Math.abs(this._x1 - l) > wn || Math.abs(this._y1 -
        u) > wn) && (this._ += "L" + l + "," + u), n && (h < 0 && (h = h % bn + bn), kn < h ? this._ +=
          "A" + n + "," + n + ",0,1," + c + "," + (t - a) + "," + (e - s) + "A" + n + "," + n + ",0,1," + c +
          "," + (this._x1 = l) + "," + (this._y1 = u) : wn < h && (this._ += "A" + n + "," + n + ",0," + +(
            xn <= h) + "," + c + "," + (this._x1 = t + n * Math.cos(i)) + "," + (this._y1 = e + n * Math
              .sin(i))))
    },
    rect: function (t, e, n, r) {
      this._ += "M" + (this._x0 = this._x1 = +t) + "," + (this._y0 = this._y1 = +e) + "h" + +n + "v" + +r +
        "h" + -n + "Z"
    },
    toString: function () {
      return this._
    }
  };
  var Cn = Math.abs,
    Nn = Math.atan2,
    An = Math.cos,
    Sn = Math.max,
    En = Math.min,
    Fn = Math.sin,
    Ln = Math.sqrt,
    Pn = 1e-12,
    Dn = Math.PI,
    Hn = Dn / 2,
    On = 2 * Dn;

  function Un(t) {
    return 1 <= t ? Hn : t <= -1 ? -Hn : Math.asin(t)
  }

  function Rn(t) {
    return t.innerRadius
  }

  function Yn(t) {
    return t.outerRadius
  }

  function qn(t) {
    return t.startAngle
  }

  function jn(t) {
    return t.endAngle
  }

  function Bn(t) {
    return t && t.padAngle
  }

  function In(t, e, n, r, i, o, a) {
    var s = t - n,
      l = e - r,
      u = (a ? o : -o) / Ln(s * s + l * l),
      c = u * l,
      h = -u * s,
      f = t + c,
      _ = e + h,
      d = n + c,
      p = r + h,
      g = (f + d) / 2,
      y = (_ + p) / 2,
      m = d - f,
      v = p - _,
      x = m * m + v * v,
      b = i - o,
      w = f * p - d * _,
      k = (v < 0 ? -1 : 1) * Ln(Sn(0, b * b * x - w * w)),
      M = (w * v - m * k) / x,
      T = (-w * m - v * k) / x,
      z = (w * v + m * k) / x,
      C = (-w * m + v * k) / x,
      N = M - g,
      A = T - y,
      S = z - g,
      E = C - y;
    return S * S + E * E < N * N + A * A && (M = z, T = C), {
      cx: M,
      cy: T,
      x01: -c,
      y01: -h,
      x11: M * (i / b - 1),
      y11: T * (i / b - 1)
    }
  }

  function Xn(t) {
    this._context = t
  }

  function Vn(t) {
    return new Xn(t)
  }

  function Wn(t) {
    return t[0]
  }

  function $n(t) {
    return t[1]
  }

  function Zn() {
    var a = Wn,
      s = $n,
      l = zn(!0),
      u = null,
      c = Vn,
      h = null;

    function e(t) {
      var e, n, r, i = t.length,
        o = !1;
      for (null == u && (h = c(r = Tn())), e = 0; e <= i; ++e) !(e < i && l(n = t[e], e, t)) === o && ((o = !o) ?
        h.lineStart() : h.lineEnd()), o && h.point(+a(n, e, t), +s(n, e, t));
      if (r) return h = null, r + "" || null
    }
    return e.x = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : zn(+t), e) : a
    }, e.y = function (t) {
      return arguments.length ? (s = "function" == typeof t ? t : zn(+t), e) : s
    }, e.defined = function (t) {
      return arguments.length ? (l = "function" == typeof t ? t : zn(!!t), e) : l
    }, e.curve = function (t) {
      return arguments.length ? (c = t, null != u && (h = c(u)), e) : c
    }, e.context = function (t) {
      return arguments.length ? (null == t ? u = h = null : h = c(u = t), e) : u
    }, e
  }

  function Qn() {
    var c = Wn,
      h = null,
      f = zn(0),
      _ = $n,
      d = zn(!0),
      p = null,
      g = Vn,
      y = null;

    function e(t) {
      var e, n, r, i, o, a = t.length,
        s = !1,
        l = new Array(a),
        u = new Array(a);
      for (null == p && (y = g(o = Tn())), e = 0; e <= a; ++e) {
        if (!(e < a && d(i = t[e], e, t)) === s)
          if (s = !s) n = e, y.areaStart(), y.lineStart();
          else {
            for (y.lineEnd(), y.lineStart(), r = e - 1; n <= r; --r) y.point(l[r], u[r]);
            y.lineEnd(), y.areaEnd()
          } s && (l[e] = +c(i, e, t), u[e] = +f(i, e, t), y.point(h ? +h(i, e, t) : l[e], _ ? +_(i, e, t) : u[e]))
      }
      if (o) return y = null, o + "" || null
    }

    function t() {
      return Zn().defined(d).curve(g).context(p)
    }
    return e.x = function (t) {
      return arguments.length ? (c = "function" == typeof t ? t : zn(+t), h = null, e) : c
    }, e.x0 = function (t) {
      return arguments.length ? (c = "function" == typeof t ? t : zn(+t), e) : c
    }, e.x1 = function (t) {
      return arguments.length ? (h = null == t ? null : "function" == typeof t ? t : zn(+t), e) : h
    }, e.y = function (t) {
      return arguments.length ? (f = "function" == typeof t ? t : zn(+t), _ = null, e) : f
    }, e.y0 = function (t) {
      return arguments.length ? (f = "function" == typeof t ? t : zn(+t), e) : f
    }, e.y1 = function (t) {
      return arguments.length ? (_ = null == t ? null : "function" == typeof t ? t : zn(+t), e) : _
    }, e.lineX0 = e.lineY0 = function () {
      return t().x(c).y(f)
    }, e.lineY1 = function () {
      return t().x(c).y(_)
    }, e.lineX1 = function () {
      return t().x(h).y(f)
    }, e.defined = function (t) {
      return arguments.length ? (d = "function" == typeof t ? t : zn(!!t), e) : d
    }, e.curve = function (t) {
      return arguments.length ? (g = t, null != p && (y = g(p)), e) : g
    }, e.context = function (t) {
      return arguments.length ? (null == t ? p = y = null : y = g(p = t), e) : p
    }, e
  }

  function Jn(t, e) {
    return e < t ? -1 : t < e ? 1 : t <= e ? 0 : NaN
  }

  function Gn(t) {
    return t
  }
  Xn.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._point = 0
    },
    lineEnd: function () {
      (this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
        default:
          this._context.lineTo(t, e)
      }
    }
  };
  var Kn = er(Vn);

  function tr(t) {
    this._curve = t
  }

  function er(e) {
    function t(t) {
      return new tr(e(t))
    }
    return t._curve = e, t
  }

  function nr(t) {
    var e = t.curve;
    return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t.curve = function (t) {
      return arguments.length ? e(er(t)) : e()._curve
    }, t
  }

  function rr() {
    return nr(Zn().curve(Kn))
  }

  function ir() {
    var t = Qn().curve(Kn),
      e = t.curve,
      n = t.lineX0,
      r = t.lineX1,
      i = t.lineY0,
      o = t.lineY1;
    return t.angle = t.x, delete t.x, t.startAngle = t.x0, delete t.x0, t.endAngle = t.x1, delete t.x1, t.radius =
      t.y, delete t.y, t.innerRadius = t.y0, delete t.y0, t.outerRadius = t.y1, delete t.y1, t.lineStartAngle =
      function () {
        return nr(n())
      }, delete t.lineX0, t.lineEndAngle = function () {
        return nr(r())
      }, delete t.lineX1, t.lineInnerRadius = function () {
        return nr(i())
      }, delete t.lineY0, t.lineOuterRadius = function () {
        return nr(o())
      }, delete t.lineY1, t.curve = function (t) {
        return arguments.length ? e(er(t)) : e()._curve
      }, t
  }

  function or(t, e) {
    return [(e = +e) * Math.cos(t -= Math.PI / 2), e * Math.sin(t)]
  }
  tr.prototype = {
    areaStart: function () {
      this._curve.areaStart()
    },
    areaEnd: function () {
      this._curve.areaEnd()
    },
    lineStart: function () {
      this._curve.lineStart()
    },
    lineEnd: function () {
      this._curve.lineEnd()
    },
    point: function (t, e) {
      this._curve.point(e * Math.sin(t), e * -Math.cos(t))
    }
  };
  var ar = Array.prototype.slice;

  function sr(t) {
    return t.source
  }

  function lr(t) {
    return t.target
  }

  function ur(i) {
    var o = sr,
      a = lr,
      s = Wn,
      l = $n,
      u = null;

    function e() {
      var t, e = ar.call(arguments),
        n = o.apply(this, e),
        r = a.apply(this, e);
      if (u = u || (t = Tn()), i(u, +s.apply(this, (e[0] = n, e)), +l.apply(this, e), +s.apply(this, (e[0] = r,
        e)), +l.apply(this, e)), t) return u = null, t + "" || null
    }
    return e.source = function (t) {
      return arguments.length ? (o = t, e) : o
    }, e.target = function (t) {
      return arguments.length ? (a = t, e) : a
    }, e.x = function (t) {
      return arguments.length ? (s = "function" == typeof t ? t : zn(+t), e) : s
    }, e.y = function (t) {
      return arguments.length ? (l = "function" == typeof t ? t : zn(+t), e) : l
    }, e.context = function (t) {
      return arguments.length ? (u = null == t ? null : t, e) : u
    }, e
  }

  function cr(t, e, n, r, i) {
    t.moveTo(e, n), t.bezierCurveTo(e = (e + r) / 2, n, e, i, r, i)
  }

  function hr(t, e, n, r, i) {
    t.moveTo(e, n), t.bezierCurveTo(e, n = (n + i) / 2, r, n, r, i)
  }

  function fr(t, e, n, r, i) {
    var o = or(e, n),
      a = or(e, n = (n + i) / 2),
      s = or(r, n),
      l = or(r, i);
    t.moveTo(o[0], o[1]), t.bezierCurveTo(a[0], a[1], s[0], s[1], l[0], l[1])
  }
  var _r = {
    draw: function (t, e) {
      var n = Math.sqrt(e / Dn);
      t.moveTo(n, 0), t.arc(0, 0, n, 0, On)
    }
  },
    dr = {
      draw: function (t, e) {
        var n = Math.sqrt(e / 5) / 2;
        t.moveTo(-3 * n, -n), t.lineTo(-n, -n), t.lineTo(-n, -3 * n), t.lineTo(n, -3 * n), t.lineTo(n, -n), t
          .lineTo(3 * n, -n), t.lineTo(3 * n, n), t.lineTo(n, n), t.lineTo(n, 3 * n), t.lineTo(-n, 3 * n), t
            .lineTo(-n, n), t.lineTo(-3 * n, n), t.closePath()
      }
    },
    pr = Math.sqrt(1 / 3),
    gr = 2 * pr,
    yr = {
      draw: function (t, e) {
        var n = Math.sqrt(e / gr),
          r = n * pr;
        t.moveTo(0, -n), t.lineTo(r, 0), t.lineTo(0, n), t.lineTo(-r, 0), t.closePath()
      }
    },
    mr = Math.sin(Dn / 10) / Math.sin(7 * Dn / 10),
    vr = Math.sin(On / 10) * mr,
    xr = -Math.cos(On / 10) * mr,
    br = {
      draw: function (t, e) {
        var n = Math.sqrt(.8908130915292852 * e),
          r = vr * n,
          i = xr * n;
        t.moveTo(0, -n), t.lineTo(r, i);
        for (var o = 1; o < 5; ++o) {
          var a = On * o / 5,
            s = Math.cos(a),
            l = Math.sin(a);
          t.lineTo(l * n, -s * n), t.lineTo(s * r - l * i, l * r + s * i)
        }
        t.closePath()
      }
    },
    wr = {
      draw: function (t, e) {
        var n = Math.sqrt(e),
          r = -n / 2;
        t.rect(r, r, n, n)
      }
    },
    kr = Math.sqrt(3),
    Mr = {
      draw: function (t, e) {
        var n = -Math.sqrt(e / (3 * kr));
        t.moveTo(0, 2 * n), t.lineTo(-kr * n, -n), t.lineTo(kr * n, -n), t.closePath()
      }
    },
    Tr = -.5,
    zr = Math.sqrt(3) / 2,
    Cr = 1 / Math.sqrt(12),
    Nr = 3 * (Cr / 2 + 1),
    Ar = {
      draw: function (t, e) {
        var n = Math.sqrt(e / Nr),
          r = n / 2,
          i = n * Cr,
          o = r,
          a = n * Cr + n,
          s = -o,
          l = a;
        t.moveTo(r, i), t.lineTo(o, a), t.lineTo(s, l), t.lineTo(Tr * r - zr * i, zr * r + Tr * i), t.lineTo(
          Tr * o - zr * a, zr * o + Tr * a), t.lineTo(Tr * s - zr * l, zr * s + Tr * l), t.lineTo(Tr * r +
            zr * i, Tr * i - zr * r), t.lineTo(Tr * o + zr * a, Tr * a - zr * o), t.lineTo(Tr * s + zr * l, Tr *
              l - zr * s), t.closePath()
      }
    },
    Sr = [_r, dr, yr, wr, br, Mr, Ar];

  function Er() { }

  function Fr(t, e, n) {
    t._context.bezierCurveTo((2 * t._x0 + t._x1) / 3, (2 * t._y0 + t._y1) / 3, (t._x0 + 2 * t._x1) / 3, (t._y0 +
      2 * t._y1) / 3, (t._x0 + 4 * t._x1 + e) / 6, (t._y0 + 4 * t._y1 + n) / 6)
  }

  function Lr(t) {
    this._context = t
  }

  function Pr(t) {
    this._context = t
  }

  function Dr(t) {
    this._context = t
  }

  function Hr(t, e) {
    this._basis = new Lr(t), this._beta = e
  }
  Lr.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 3:
          Fr(this, this._x1, this._y1);
        case 2:
          this._context.lineTo(this._x1, this._y1)
      }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
        default:
          Fr(this, t, e)
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
    }
  }, Pr.prototype = {
    areaStart: Er,
    areaEnd: Er,
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this
        ._y4 = NaN, this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x2, this._y2), this._context.closePath();
          break;
        case 2:
          this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context
            .lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
          break;
        case 3:
          this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4)
      }
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._x2 = t, this._y2 = e;
          break;
        case 1:
          this._point = 2, this._x3 = t, this._y3 = e;
          break;
        case 2:
          this._point = 3, this._x4 = t, this._y4 = e, this._context.moveTo((this._x0 + 4 * this._x1 + t) / 6,
            (this._y0 + 4 * this._y1 + e) / 6);
          break;
        default:
          Fr(this, t, e)
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
    }
  }, Dr.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0
    },
    lineEnd: function () {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
          var n = (this._x0 + 4 * this._x1 + t) / 6,
            r = (this._y0 + 4 * this._y1 + e) / 6;
          this._line ? this._context.lineTo(n, r) : this._context.moveTo(n, r);
          break;
        case 3:
          this._point = 4;
        default:
          Fr(this, t, e)
      }
      this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e
    }
  }, Hr.prototype = {
    lineStart: function () {
      this._x = [], this._y = [], this._basis.lineStart()
    },
    lineEnd: function () {
      var t = this._x,
        e = this._y,
        n = t.length - 1;
      if (0 < n)
        for (var r, i = t[0], o = e[0], a = t[n] - i, s = e[n] - o, l = -1; ++l <= n;) r = l / n, this._basis
          .point(this._beta * t[l] + (1 - this._beta) * (i + r * a), this._beta * e[l] + (1 - this._beta) * (
            o + r * s));
      this._x = this._y = null, this._basis.lineEnd()
    },
    point: function (t, e) {
      this._x.push(+t), this._y.push(+e)
    }
  };
  var Or = function e(n) {
    function t(t) {
      return 1 === n ? new Lr(t) : new Hr(t, n)
    }
    return t.beta = function (t) {
      return e(+t)
    }, t
  }(.85);

  function Ur(t, e, n) {
    t._context.bezierCurveTo(t._x1 + t._k * (t._x2 - t._x0), t._y1 + t._k * (t._y2 - t._y0), t._x2 + t._k * (t
      ._x1 - e), t._y2 + t._k * (t._y1 - n), t._x2, t._y2)
  }

  function Rr(t, e) {
    this._context = t, this._k = (1 - e) / 6
  }
  Rr.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);
          break;
        case 3:
          Ur(this, this._x1, this._y1)
      }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2, this._x1 = t, this._y1 = e;
          break;
        case 2:
          this._point = 3;
        default:
          Ur(this, t, e)
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this
        ._y2 = e
    }
  };
  var Yr = function e(n) {
    function t(t) {
      return new Rr(t, n)
    }
    return t.tension = function (t) {
      return e(+t)
    }, t
  }(0);

  function qr(t, e) {
    this._context = t, this._k = (1 - e) / 6
  }
  qr.prototype = {
    areaStart: Er,
    areaEnd: Er,
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this
        ._y3 = this._y4 = this._y5 = NaN, this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;
        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;
        case 3:
          this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
      }
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._x3 = t, this._y3 = e;
          break;
        case 1:
          this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
          break;
        case 2:
          this._point = 3, this._x5 = t, this._y5 = e;
          break;
        default:
          Ur(this, t, e)
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this
        ._y2 = e
    }
  };
  var jr = function e(n) {
    function t(t) {
      return new qr(t, n)
    }
    return t.tension = function (t) {
      return e(+t)
    }, t
  }(0);

  function Br(t, e) {
    this._context = t, this._k = (1 - e) / 6
  }
  Br.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0
    },
    lineEnd: function () {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this
            ._x2, this._y2);
          break;
        case 3:
          this._point = 4;
        default:
          Ur(this, t, e)
      }
      this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this._y2, this
        ._y2 = e
    }
  };
  var Ir = function e(n) {
    function t(t) {
      return new Br(t, n)
    }
    return t.tension = function (t) {
      return e(+t)
    }, t
  }(0);

  function Xr(t, e, n) {
    var r = t._x1,
      i = t._y1,
      o = t._x2,
      a = t._y2;
    if (t._l01_a > Pn) {
      var s = 2 * t._l01_2a + 3 * t._l01_a * t._l12_a + t._l12_2a,
        l = 3 * t._l01_a * (t._l01_a + t._l12_a);
      r = (r * s - t._x0 * t._l12_2a + t._x2 * t._l01_2a) / l, i = (i * s - t._y0 * t._l12_2a + t._y2 * t
        ._l01_2a) / l
    }
    if (t._l23_a > Pn) {
      var u = 2 * t._l23_2a + 3 * t._l23_a * t._l12_a + t._l12_2a,
        c = 3 * t._l23_a * (t._l23_a + t._l12_a);
      o = (o * u + t._x1 * t._l23_2a - e * t._l12_2a) / c, a = (a * u + t._y1 * t._l23_2a - n * t._l12_2a) / c
    }
    t._context.bezierCurveTo(r, i, o, a, t._x2, t._y2)
  }

  function Vr(t, e) {
    this._context = t, this._alpha = e
  }
  Vr.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this
        ._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x2, this._y2);
          break;
        case 3:
          this.point(this._x2, this._y2)
      }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      if (t = +t, e = +e, this._point) {
        var n = this._x2 - t,
          r = this._y2 - e;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
      }
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3;
        default:
          Xr(this, t, e)
      }
      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this
        ._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this
          ._y2, this._y2 = e
    }
  };
  var Wr = function e(n) {
    function t(t) {
      return n ? new Vr(t, n) : new Rr(t, 0)
    }
    return t.alpha = function (t) {
      return e(+t)
    }, t
  }(.5);

  function $r(t, e) {
    this._context = t, this._alpha = e
  }
  $r.prototype = {
    areaStart: Er,
    areaEnd: Er,
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this
        ._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this
          ._l12_2a = this._l23_2a = this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 1:
          this._context.moveTo(this._x3, this._y3), this._context.closePath();
          break;
        case 2:
          this._context.lineTo(this._x3, this._y3), this._context.closePath();
          break;
        case 3:
          this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5)
      }
    },
    point: function (t, e) {
      if (t = +t, e = +e, this._point) {
        var n = this._x2 - t,
          r = this._y2 - e;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
      }
      switch (this._point) {
        case 0:
          this._point = 1, this._x3 = t, this._y3 = e;
          break;
        case 1:
          this._point = 2, this._context.moveTo(this._x4 = t, this._y4 = e);
          break;
        case 2:
          this._point = 3, this._x5 = t, this._y5 = e;
          break;
        default:
          Xr(this, t, e)
      }
      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this
        ._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this
          ._y2, this._y2 = e
    }
  };
  var Zr = function e(n) {
    function t(t) {
      return n ? new $r(t, n) : new qr(t, 0)
    }
    return t.alpha = function (t) {
      return e(+t)
    }, t
  }(.5);

  function Qr(t, e) {
    this._context = t, this._alpha = e
  }
  Qr.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this
        ._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0
    },
    lineEnd: function () {
      (this._line || 0 !== this._line && 3 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      if (t = +t, e = +e, this._point) {
        var n = this._x2 - t,
          r = this._y2 - e;
        this._l23_a = Math.sqrt(this._l23_2a = Math.pow(n * n + r * r, this._alpha))
      }
      switch (this._point) {
        case 0:
          this._point = 1;
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this
            ._x2, this._y2);
          break;
        case 3:
          this._point = 4;
        default:
          Xr(this, t, e)
      }
      this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this
        ._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = t, this._y0 = this._y1, this._y1 = this
          ._y2, this._y2 = e
    }
  };
  var Jr = function e(n) {
    function t(t) {
      return n ? new Qr(t, n) : new Br(t, 0)
    }
    return t.alpha = function (t) {
      return e(+t)
    }, t
  }(.5);

  function Gr(t) {
    this._context = t
  }

  function Kr(t) {
    return t < 0 ? -1 : 1
  }

  function ti(t, e, n) {
    var r = t._x1 - t._x0,
      i = e - t._x1,
      o = (t._y1 - t._y0) / (r || i < 0 && -0),
      a = (n - t._y1) / (i || r < 0 && -0),
      s = (o * i + a * r) / (r + i);
    return (Kr(o) + Kr(a)) * Math.min(Math.abs(o), Math.abs(a), .5 * Math.abs(s)) || 0
  }

  function ei(t, e) {
    var n = t._x1 - t._x0;
    return n ? (3 * (t._y1 - t._y0) / n - e) / 2 : e
  }

  function ni(t, e, n) {
    var r = t._x0,
      i = t._y0,
      o = t._x1,
      a = t._y1,
      s = (o - r) / 3;
    t._context.bezierCurveTo(r + s, i + s * e, o - s, a - s * n, o, a)
  }

  function ri(t) {
    this._context = t
  }

  function ii(t) {
    this._context = new oi(t)
  }

  function oi(t) {
    this._context = t
  }

  function ai(t) {
    this._context = t
  }

  function si(t) {
    var e, n, r = t.length - 1,
      i = new Array(r),
      o = new Array(r),
      a = new Array(r);
    for (o[i[0] = 0] = 2, a[0] = t[0] + 2 * t[1], e = 1; e < r - 1; ++e) i[e] = 1, o[e] = 4, a[e] = 4 * t[e] + 2 *
      t[e + 1];
    for (i[r - 1] = 2, o[r - 1] = 7, a[r - 1] = 8 * t[r - 1] + t[r], e = 1; e < r; ++e) n = i[e] / o[e - 1], o[
      e] -= n, a[e] -= n * a[e - 1];
    for (i[r - 1] = a[r - 1] / o[r - 1], e = r - 2; 0 <= e; --e) i[e] = (a[e] - i[e + 1]) / o[e];
    for (o[r - 1] = (t[r] + i[r - 1]) / 2, e = 0; e < r - 1; ++e) o[e] = 2 * t[e + 1] - i[e + 1];
    return [i, o]
  }

  function li(t, e) {
    this._context = t, this._t = e
  }

  function ui(t, e) {
    if (1 < (i = t.length))
      for (var n, r, i, o = 1, a = t[e[0]], s = a.length; o < i; ++o)
        for (r = a, a = t[e[o]], n = 0; n < s; ++n) a[n][1] += a[n][0] = isNaN(r[n][1]) ? r[n][0] : r[n][1]
  }

  function ci(t) {
    for (var e = t.length, n = new Array(e); 0 <= --e;) n[e] = e;
    return n
  }

  function hi(t, e) {
    return t[e]
  }

  function fi(t) {
    var n = t.map(_i);
    return ci(t).sort(function (t, e) {
      return n[t] - n[e]
    })
  }

  function _i(t) {
    for (var e, n = -1, r = 0, i = t.length, o = -1 / 0; ++n < i;)(e = +t[n][1]) > o && (o = e, r = n);
    return r
  }

  function di(t) {
    var n = t.map(pi);
    return ci(t).sort(function (t, e) {
      return n[t] - n[e]
    })
  }

  function pi(t) {
    for (var e, n = 0, r = -1, i = t.length; ++r < i;)(e = +t[r][1]) && (n += e);
    return n
  }
  Gr.prototype = {
    areaStart: Er,
    areaEnd: Er,
    lineStart: function () {
      this._point = 0
    },
    lineEnd: function () {
      this._point && this._context.closePath()
    },
    point: function (t, e) {
      t = +t, e = +e, this._point ? this._context.lineTo(t, e) : (this._point = 1, this._context.moveTo(t, e))
    }
  }, ri.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0
    },
    lineEnd: function () {
      switch (this._point) {
        case 2:
          this._context.lineTo(this._x1, this._y1);
          break;
        case 3:
          ni(this, this._t0, ei(this, this._t0))
      }(this._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), this._line = 1 -
        this._line
    },
    point: function (t, e) {
      var n = NaN;
      if (e = +e, (t = +t) !== this._x1 || e !== this._y1) {
        switch (this._point) {
          case 0:
            this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
            break;
          case 1:
            this._point = 2;
            break;
          case 2:
            this._point = 3, ni(this, ei(this, n = ti(this, t, e)), n);
            break;
          default:
            ni(this, this._t0, n = ti(this, t, e))
        }
        this._x0 = this._x1, this._x1 = t, this._y0 = this._y1, this._y1 = e, this._t0 = n
      }
    }
  }, (ii.prototype = Object.create(ri.prototype)).point = function (t, e) {
    ri.prototype.point.call(this, e, t)
  }, oi.prototype = {
    moveTo: function (t, e) {
      this._context.moveTo(e, t)
    },
    closePath: function () {
      this._context.closePath()
    },
    lineTo: function (t, e) {
      this._context.lineTo(e, t)
    },
    bezierCurveTo: function (t, e, n, r, i, o) {
      this._context.bezierCurveTo(e, t, r, n, o, i)
    }
  }, ai.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x = [], this._y = []
    },
    lineEnd: function () {
      var t = this._x,
        e = this._y,
        n = t.length;
      if (n)
        if (this._line ? this._context.lineTo(t[0], e[0]) : this._context.moveTo(t[0], e[0]), 2 === n) this
          ._context.lineTo(t[1], e[1]);
        else
          for (var r = si(t), i = si(e), o = 0, a = 1; a < n; ++o, ++a) this._context.bezierCurveTo(r[0][o],
            i[0][o], r[1][o], i[1][o], t[a], e[a]);
      (this._line || 0 !== this._line && 1 === n) && this._context.closePath(), this._line = 1 - this._line,
        this._x = this._y = null
    },
    point: function (t, e) {
      this._x.push(+t), this._y.push(+e)
    }
  }, li.prototype = {
    areaStart: function () {
      this._line = 0
    },
    areaEnd: function () {
      this._line = NaN
    },
    lineStart: function () {
      this._x = this._y = NaN, this._point = 0
    },
    lineEnd: function () {
      0 < this._t && this._t < 1 && 2 === this._point && this._context.lineTo(this._x, this._y), (this
        ._line || 0 !== this._line && 1 === this._point) && this._context.closePath(), 0 <= this._line && (
          this._t = 1 - this._t, this._line = 1 - this._line)
    },
    point: function (t, e) {
      switch (t = +t, e = +e, this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(t, e) : this._context.moveTo(t, e);
          break;
        case 1:
          this._point = 2;
        default:
          if (this._t <= 0) this._context.lineTo(this._x, e), this._context.lineTo(t, e);
          else {
            var n = this._x * (1 - this._t) + t * this._t;
            this._context.lineTo(n, this._y), this._context.lineTo(n, e)
          }
      }
      this._x = t, this._y = e
    }
  };
  var gi = Object.freeze({
    arc: function () {
      var U = Rn,
        R = Yn,
        Y = zn(0),
        q = null,
        j = qn,
        B = jn,
        I = Bn,
        X = null;

      function e() {
        var t, e, n = +U.apply(this, arguments),
          r = +R.apply(this, arguments),
          i = j.apply(this, arguments) - Hn,
          o = B.apply(this, arguments) - Hn,
          a = Cn(o - i),
          s = i < o;
        if (X = X || (t = Tn()), r < n && (e = r, r = n, n = e), Pn < r)
          if (On - Pn < a) X.moveTo(r * An(i), r * Fn(i)), X.arc(0, 0, r, i, o, !s), Pn < n && (X.moveTo(n *
            An(o), n * Fn(o)), X.arc(0, 0, n, o, i, s));
          else {
            var l, u, c = i,
              h = o,
              f = i,
              _ = o,
              d = a,
              p = a,
              g = I.apply(this, arguments) / 2,
              y = Pn < g && (q ? +q.apply(this, arguments) : Ln(n * n + r * r)),
              m = En(Cn(r - n) / 2, +Y.apply(this, arguments)),
              v = m,
              x = m;
            if (Pn < y) {
              var b = Un(y / n * Fn(g)),
                w = Un(y / r * Fn(g));
              (d -= 2 * b) > Pn ? (f += b *= s ? 1 : -1, _ -= b) : (d = 0, f = _ = (i + o) / 2), (p -= 2 *
                w) > Pn ? (c += w *= s ? 1 : -1, h -= w) : (p = 0, c = h = (i + o) / 2)
            }
            var k = r * An(c),
              M = r * Fn(c),
              T = n * An(_),
              z = n * Fn(_);
            if (Pn < m) {
              var C, N = r * An(h),
                A = r * Fn(h),
                S = n * An(f),
                E = n * Fn(f);
              if (a < Dn && (C = function (t, e, n, r, i, o, a, s) {
                var l = n - t,
                  u = r - e,
                  c = a - i,
                  h = s - o,
                  f = h * l - c * u;
                if (!(f * f < Pn)) return [t + (f = (c * (e - o) - h * (t - i)) / f) * l, e + f * u]
              }(k, M, S, E, N, A, T, z))) {
                var F = k - C[0],
                  L = M - C[1],
                  P = N - C[0],
                  D = A - C[1],
                  H = 1 / Fn(function (t) {
                    return 1 < t ? 0 : t < -1 ? Dn : Math.acos(t)
                  }((F * P + L * D) / (Ln(F * F + L * L) * Ln(P * P + D * D))) / 2),
                  O = Ln(C[0] * C[0] + C[1] * C[1]);
                v = En(m, (n - O) / (H - 1)), x = En(m, (r - O) / (1 + H))
              }
            }
            Pn < p ? Pn < x ? (l = In(S, E, k, M, r, x, s), u = In(N, A, T, z, r, x, s), X.moveTo(l.cx + l
              .x01, l.cy + l.y01), x < m ? X.arc(l.cx, l.cy, x, Nn(l.y01, l.x01), Nn(u.y01, u.x01), !
                s) : (X.arc(l.cx, l.cy, x, Nn(l.y01, l.x01), Nn(l.y11, l.x11), !s), X.arc(0, 0, r, Nn(l
                  .cy +
                  l.y11, l.cx + l.x11), Nn(u.cy + u.y11, u.cx + u.x11), !s), X.arc(u.cx, u.cy, x, Nn(u
                    .y11, u.x11), Nn(u.y01, u.x01), !s))) : (X.moveTo(k, M), X.arc(0, 0, r, c, h, !s)) : X
                      .moveTo(k, M), Pn < n && Pn < d ? Pn < v ? (l = In(T, z, N, A, n, -v, s), u = In(k, M, S, E,
                        n, -v, s), X.lineTo(l.cx + l.x01, l.cy + l.y01), v < m ? X.arc(l.cx, l.cy, v, Nn(l.y01, l
                          .x01), Nn(u.y01, u.x01), !s) : (X.arc(l.cx, l.cy, v, Nn(l.y01, l.x01), Nn(l.y11, l.x11), !
                            s), X.arc(0, 0, n, Nn(l.cy + l.y11, l.cx + l.x11), Nn(u.cy + u.y11, u.cx + u.x11), s), X
                              .arc(u.cx, u.cy, v, Nn(u.y11, u.x11), Nn(u.y01, u.x01), !s))) : X.arc(0, 0, n, _, f, s) : X
                                .lineTo(T, z)
          }
        else X.moveTo(0, 0);
        if (X.closePath(), t) return X = null, t + "" || null
      }
      return e.centroid = function () {
        var t = (+U.apply(this, arguments) + +R.apply(this, arguments)) / 2,
          e = (+j.apply(this, arguments) + +B.apply(this, arguments)) / 2 - Dn / 2;
        return [An(e) * t, Fn(e) * t]
      }, e.innerRadius = function (t) {
        return arguments.length ? (U = "function" == typeof t ? t : zn(+t), e) : U
      }, e.outerRadius = function (t) {
        return arguments.length ? (R = "function" == typeof t ? t : zn(+t), e) : R
      }, e.cornerRadius = function (t) {
        return arguments.length ? (Y = "function" == typeof t ? t : zn(+t), e) : Y
      }, e.padRadius = function (t) {
        return arguments.length ? (q = null == t ? null : "function" == typeof t ? t : zn(+t), e) : q
      }, e.startAngle = function (t) {
        return arguments.length ? (j = "function" == typeof t ? t : zn(+t), e) : j
      }, e.endAngle = function (t) {
        return arguments.length ? (B = "function" == typeof t ? t : zn(+t), e) : B
      }, e.padAngle = function (t) {
        return arguments.length ? (I = "function" == typeof t ? t : zn(+t), e) : I
      }, e.context = function (t) {
        return arguments.length ? (X = null == t ? null : t, e) : X
      }, e
    },
    area: Qn,
    line: Zn,
    pie: function () {
      var d = Gn,
        p = Jn,
        g = null,
        y = zn(0),
        m = zn(On),
        v = zn(0);

      function e(n) {
        var t, e, r, i, o, a = n.length,
          s = 0,
          l = new Array(a),
          u = new Array(a),
          c = +y.apply(this, arguments),
          h = Math.min(On, Math.max(-On, m.apply(this, arguments) - c)),
          f = Math.min(Math.abs(h) / a, v.apply(this, arguments)),
          _ = f * (h < 0 ? -1 : 1);
        for (t = 0; t < a; ++t) 0 < (o = u[l[t] = t] = +d(n[t], t, n)) && (s += o);
        for (null != p ? l.sort(function (t, e) {
          return p(u[t], u[e])
        }) : null != g && l.sort(function (t, e) {
          return g(n[t], n[e])
        }), t = 0, r = s ? (h - a * _) / s : 0; t < a; ++t, c = i) e = l[t], i = c + (0 < (o = u[e]) ? o *
          r : 0) + _, u[e] = {
            data: n[e],
            index: t,
            value: o,
            startAngle: c,
            endAngle: i,
            padAngle: f
          };
        return u
      }
      return e.value = function (t) {
        return arguments.length ? (d = "function" == typeof t ? t : zn(+t), e) : d
      }, e.sortValues = function (t) {
        return arguments.length ? (p = t, g = null, e) : p
      }, e.sort = function (t) {
        return arguments.length ? (g = t, p = null, e) : g
      }, e.startAngle = function (t) {
        return arguments.length ? (y = "function" == typeof t ? t : zn(+t), e) : y
      }, e.endAngle = function (t) {
        return arguments.length ? (m = "function" == typeof t ? t : zn(+t), e) : m
      }, e.padAngle = function (t) {
        return arguments.length ? (v = "function" == typeof t ? t : zn(+t), e) : v
      }, e
    },
    areaRadial: ir,
    radialArea: ir,
    lineRadial: rr,
    radialLine: rr,
    pointRadial: or,
    linkHorizontal: function () {
      return ur(cr)
    },
    linkVertical: function () {
      return ur(hr)
    },
    linkRadial: function () {
      var t = ur(fr);
      return t.angle = t.x, delete t.x, t.radius = t.y, delete t.y, t
    },
    symbol: function () {
      var e = zn(_r),
        n = zn(64),
        r = null;

      function i() {
        var t;
        if (r = r || (t = Tn()), e.apply(this, arguments).draw(r, +n.apply(this, arguments)), t) return r =
          null, t + "" || null
      }
      return i.type = function (t) {
        return arguments.length ? (e = "function" == typeof t ? t : zn(t), i) : e
      }, i.size = function (t) {
        return arguments.length ? (n = "function" == typeof t ? t : zn(+t), i) : n
      }, i.context = function (t) {
        return arguments.length ? (r = null == t ? null : t, i) : r
      }, i
    },
    symbols: Sr,
    symbolCircle: _r,
    symbolCross: dr,
    symbolDiamond: yr,
    symbolSquare: wr,
    symbolStar: br,
    symbolTriangle: Mr,
    symbolWye: Ar,
    curveBasisClosed: function (t) {
      return new Pr(t)
    },
    curveBasisOpen: function (t) {
      return new Dr(t)
    },
    curveBasis: function (t) {
      return new Lr(t)
    },
    curveBundle: Or,
    curveCardinalClosed: jr,
    curveCardinalOpen: Ir,
    curveCardinal: Yr,
    curveCatmullRomClosed: Zr,
    curveCatmullRomOpen: Jr,
    curveCatmullRom: Wr,
    curveLinearClosed: function (t) {
      return new Gr(t)
    },
    curveLinear: Vn,
    curveMonotoneX: function (t) {
      return new ri(t)
    },
    curveMonotoneY: function (t) {
      return new ii(t)
    },
    curveNatural: function (t) {
      return new ai(t)
    },
    curveStep: function (t) {
      return new li(t, .5)
    },
    curveStepAfter: function (t) {
      return new li(t, 1)
    },
    curveStepBefore: function (t) {
      return new li(t, 0)
    },
    stack: function () {
      var h = zn([]),
        f = ci,
        _ = ui,
        d = hi;

      function e(t) {
        var e, n, r = h.apply(this, arguments),
          i = t.length,
          o = r.length,
          a = new Array(o);
        for (e = 0; e < o; ++e) {
          for (var s, l = r[e], u = a[e] = new Array(i), c = 0; c < i; ++c) u[c] = s = [0, +d(t[c], l, c,
            t)], s.data = t[c];
          u.key = l
        }
        for (e = 0, n = f(a); e < o; ++e) a[n[e]].index = e;
        return _(a, n), a
      }
      return e.keys = function (t) {
        return arguments.length ? (h = "function" == typeof t ? t : zn(ar.call(t)), e) : h
      }, e.value = function (t) {
        return arguments.length ? (d = "function" == typeof t ? t : zn(+t), e) : d
      }, e.order = function (t) {
        return arguments.length ? (f = null == t ? ci : "function" == typeof t ? t : zn(ar.call(t)), e) :
          f
      }, e.offset = function (t) {
        return arguments.length ? (_ = null == t ? ui : t, e) : _
      }, e
    },
    stackOffsetExpand: function (t, e) {
      if (0 < (r = t.length)) {
        for (var n, r, i, o = 0, a = t[0].length; o < a; ++o) {
          for (i = n = 0; n < r; ++n) i += t[n][o][1] || 0;
          if (i)
            for (n = 0; n < r; ++n) t[n][o][1] /= i
        }
        ui(t, e)
      }
    },
    stackOffsetDiverging: function (t, e) {
      if (0 < (s = t.length))
        for (var n, r, i, o, a, s, l = 0, u = t[e[0]].length; l < u; ++l)
          for (o = a = 0, n = 0; n < s; ++n) 0 <= (i = (r = t[e[n]][l])[1] - r[0]) ? (r[0] = o, r[1] = o +=
            i) : i < 0 ? (r[1] = a, r[0] = a += i) : r[0] = o
    },
    stackOffsetNone: ui,
    stackOffsetSilhouette: function (t, e) {
      if (0 < (n = t.length)) {
        for (var n, r = 0, i = t[e[0]], o = i.length; r < o; ++r) {
          for (var a = 0, s = 0; a < n; ++a) s += t[a][r][1] || 0;
          i[r][1] += i[r][0] = -s / 2
        }
        ui(t, e)
      }
    },
    stackOffsetWiggle: function (t, e) {
      if (0 < (i = t.length) && 0 < (r = (n = t[e[0]]).length)) {
        for (var n, r, i, o = 0, a = 1; a < r; ++a) {
          for (var s = 0, l = 0, u = 0; s < i; ++s) {
            for (var c = t[e[s]], h = c[a][1] || 0, f = (h - (c[a - 1][1] || 0)) / 2, _ = 0; _ < s; ++_) {
              var d = t[e[_]];
              f += (d[a][1] || 0) - (d[a - 1][1] || 0)
            }
            l += h, u += f * h
          }
          n[a - 1][1] += n[a - 1][0] = o, l && (o -= u / l)
        }
        n[a - 1][1] += n[a - 1][0] = o, ui(t, e)
      }
    },
    stackOrderAppearance: fi,
    stackOrderAscending: di,
    stackOrderDescending: function (t) {
      return di(t).reverse()
    },
    stackOrderInsideOut: function (t) {
      var e, n, r = t.length,
        i = t.map(pi),
        o = fi(t),
        a = 0,
        s = 0,
        l = [],
        u = [];
      for (e = 0; e < r; ++e) n = o[e], a < s ? (a += i[n], l.push(n)) : (s += i[n], u.push(n));
      return u.reverse().concat(l)
    },
    stackOrderNone: ci,
    stackOrderReverse: function (t) {
      return ci(t).reverse()
    }
  }),
    yi = Object.freeze({
      transform_labels: !1,
      transform: "multiply",
      multiply_divide_constant: 1,
      exponentiate_constant: 0,
      multiplier: 1,
      prefix: "",
      n_dec: 2,
      suffix: "",
      strip_zeros: !0,
      strip_separator: !0
    });

  function mi(i, t) {
    var o = 0 <= i.n_dec ? Math.floor(i.n_dec) : Math.ceil(i.n_dec),
      a = t(",." + (0 < o ? o : "0") + "f"),
      e = t.decimal,
      s = t.thousands,
      l = i.strip_zeros && 0 < o ? new RegExp("\\" + e + "?0+$") : null,
      u = i.strip_separator && s,
      c = function (t) {
        var e = 1;
        return t.transform_labels && (e = "multiply" === t.transform ? t.multiply_divide_constant : "divide" === t
          .transform ? 1 / t.multiply_divide_constant : Math.pow(10, t.exponentiate_constant)),
          function (t) {
            return t * e
          }
      }(i);
    return o < 0 ? function (t) {
      var e = function (t, e) {
        if (!e) return Math.round(t);
        e = 0 < e ? Math.floor(e) : Math.ceil(e);
        var n = Math.pow(10, e);
        return Math.round(t * n) / n
      }(c(t), o),
        n = u && 1e3 <= e && e < 1e4,
        r = a(e);
      return n && (r = r.replace(s, "")), i.prefix + r + i.suffix
    } : function (t) {
      var e = c(t),
        n = u && s && 1e3 <= e && e < 1e4,
        r = a(e);
      return l && (r = r.replace(l, "")), n && (r = r.replace(s, "")), i.prefix + r + i.suffix
    }
  }

  function vi(e) {
    for (var t in yi) void 0 === e[t] && (e[t] = yi[t]);
    return function (t) {
      return mi(e, t)
    }
  }

  function xi(t, e) {
    if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
    var n, r = t.slice(0, n);
    return [1 < r.length ? r[0] + r.slice(2) : r, +t.slice(n + 1)]
  }

  function bi(t) {
    return (t = xi(Math.abs(t))) ? t[1] : NaN
  }
  var wi, ki = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

  function Mi(t) {
    if (!(e = ki.exec(t))) throw new Error("invalid format: " + t);
    var e;
    return new Ti({
      fill: e[1],
      align: e[2],
      sign: e[3],
      symbol: e[4],
      zero: e[5],
      width: e[6],
      comma: e[7],
      precision: e[8] && e[8].slice(1),
      trim: e[9],
      type: e[10]
    })
  }

  function Ti(t) {
    this.fill = void 0 === t.fill ? " " : t.fill + "", this.align = void 0 === t.align ? ">" : t.align + "", this
      .sign = void 0 === t.sign ? "-" : t.sign + "", this.symbol = void 0 === t.symbol ? "" : t.symbol + "", this
        .zero = !!t.zero, this.width = void 0 === t.width ? void 0 : +t.width, this.comma = !!t.comma, this
          .precision = void 0 === t.precision ? void 0 : +t.precision, this.trim = !!t.trim, this.type = void 0 === t
            .type ? "" : t.type + ""
  }

  function zi(t, e) {
    var n = xi(t, e);
    if (!n) return t + "";
    var r = n[0],
      i = n[1];
    return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i +
      1) : r + new Array(i - r.length + 2).join("0")
  }
  Mi.prototype = Ti.prototype, Ti.prototype.toString = function () {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (void 0 === this.width ?
      "" : Math.max(1, 0 | this.width)) + (this.comma ? "," : "") + (void 0 === this.precision ? "" : "." +
        Math.max(0, 0 | this.precision)) + (this.trim ? "~" : "") + this.type
  };
  var Ci = {
    "%": function (t, e) {
      return (100 * t).toFixed(e)
    },
    b: function (t) {
      return Math.round(t).toString(2)
    },
    c: function (t) {
      return t + ""
    },
    d: function (t) {
      return Math.round(t).toString(10)
    },
    e: function (t, e) {
      return t.toExponential(e)
    },
    f: function (t, e) {
      return t.toFixed(e)
    },
    g: function (t, e) {
      return t.toPrecision(e)
    },
    o: function (t) {
      return Math.round(t).toString(8)
    },
    p: function (t, e) {
      return zi(100 * t, e)
    },
    r: zi,
    s: function (t, e) {
      var n = xi(t, e);
      if (!n) return t + "";
      var r = n[0],
        i = n[1],
        o = i - (wi = 3 * Math.max(-8, Math.min(8, Math.floor(i / 3)))) + 1,
        a = r.length;
      return o === a ? r : a < o ? r + new Array(o - a + 1).join("0") : 0 < o ? r.slice(0, o) + "." + r.slice(
        o) : "0." + new Array(1 - o).join("0") + xi(t, Math.max(0, e + o - 1))[0]
    },
    X: function (t) {
      return Math.round(t).toString(16).toUpperCase()
    },
    x: function (t) {
      return Math.round(t).toString(16)
    }
  };

  function Ni(t) {
    return t
  }
  var Ai, Si, Ei, Fi = Array.prototype.map,
    Li = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];

  function Pi(t) {
    var w = void 0 === t.grouping || void 0 === t.thousands ? Ni : function (s, l) {
      return function (t, e) {
        for (var n = t.length, r = [], i = 0, o = s[0], a = 0; 0 < n && 0 < o && (e < a + o + 1 && (o = Math
          .max(1, e - a)), r.push(t.substring(n -= o, n + o)), !((a += o + 1) > e));) o = s[i = (i + 1) % s
            .length];
        return r.reverse().join(l)
      }
    }(Fi.call(t.grouping, Number), t.thousands + ""),
      r = void 0 === t.currency ? "" : t.currency[0] + "",
      i = void 0 === t.currency ? "" : t.currency[1] + "",
      k = void 0 === t.decimal ? "." : t.decimal + "",
      M = void 0 === t.numerals ? Ni : function (e) {
        return function (t) {
          return t.replace(/[0-9]/g, function (t) {
            return e[+t]
          })
        }
      }(Fi.call(t.numerals, String)),
      o = void 0 === t.percent ? "%" : t.percent + "",
      T = void 0 === t.minus ? "-" : t.minus + "",
      z = void 0 === t.nan ? "NaN" : t.nan + "";

    function a(t) {
      var u = (t = Mi(t)).fill,
        c = t.align,
        h = t.sign,
        e = t.symbol,
        f = t.zero,
        _ = t.width,
        d = t.comma,
        p = t.precision,
        g = t.trim,
        y = t.type;
      "n" === y ? (d = !0, y = "g") : Ci[y] || (void 0 === p && (p = 12), g = !0, y = "g"), (f || "0" === u &&
        "=" === c) && (f = !0, u = "0", c = "=");
      var m = "$" === e ? r : "#" === e && /[boxX]/.test(y) ? "0" + y.toLowerCase() : "",
        v = "$" === e ? i : /[%p]/.test(y) ? o : "",
        x = Ci[y],
        b = /[defgprs%]/.test(y);

      function n(t) {
        var e, n, r, i = m,
          o = v;
        if ("c" === y) o = x(t) + o, t = "";
        else {
          var a = (t = +t) < 0;
          if (t = isNaN(t) ? z : x(Math.abs(t), p), g && (t = function (t) {
            t: for (var e, n = t.length, r = 1, i = -1; r < n; ++r) switch (t[r]) {
              case ".":
                i = e = r;
                break;
              case "0":
                0 === i && (i = r), e = r;
                break;
              default:
                if (0 < i) {
                  if (!+t[r]) break t;
                  i = 0
                }
            }
            return 0 < i ? t.slice(0, i) + t.slice(e + 1) : t
          }(t)), a && 0 == +t && (a = !1), i = (a ? "(" === h ? h : T : "-" === h || "(" === h ? "" : h) + i,
            o = ("s" === y ? Li[8 + wi / 3] : "") + o + (a && "(" === h ? ")" : ""), b)
            for (e = -1, n = t.length; ++e < n;)
              if ((r = t.charCodeAt(e)) < 48 || 57 < r) {
                o = (46 === r ? k + t.slice(e + 1) : t.slice(e)) + o, t = t.slice(0, e);
                break
              }
        }
        d && !f && (t = w(t, 1 / 0));
        var s = i.length + t.length + o.length,
          l = s < _ ? new Array(_ - s + 1).join(u) : "";
        switch (d && f && (t = w(l + t, l.length ? _ - o.length : 1 / 0), l = ""), c) {
          case "<":
            t = i + t + o + l;
            break;
          case "=":
            t = i + l + t + o;
            break;
          case "^":
            t = l.slice(0, s = l.length >> 1) + i + t + o + l.slice(s);
            break;
          default:
            t = l + i + t + o
        }
        return M(t)
      }
      return p = void 0 === p ? 6 : /[gprs]/.test(y) ? Math.max(1, Math.min(21, p)) : Math.max(0, Math.min(20,
        p)), n.toString = function () {
          return t + ""
        }, n
    }
    return {
      format: a,
      formatPrefix: function (t, e) {
        var n = a(((t = Mi(t)).type = "f", t)),
          r = 3 * Math.max(-8, Math.min(8, Math.floor(bi(e) / 3))),
          i = Math.pow(10, -r),
          o = Li[8 + r / 3];
        return function (t) {
          return n(i * t) + o
        }
      }
    }
  }

  function Di(t) {
    return Math.max(0, -bi(Math.abs(t)))
  }

  function Hi(t, e) {
    return Math.max(0, 3 * Math.max(-8, Math.min(8, Math.floor(bi(e) / 3))) - bi(Math.abs(t)))
  }

  function Oi(t, e) {
    return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, bi(e) - bi(t)) + 1
  }
  Ai = Pi({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    minus: "-"
  }), Si = Ai.format, Ei = Ai.formatPrefix;
  var Ui = Object.freeze({
    input_decimal_separator: ".",
    output_separators: ",."
  });
  var Ri, Yi, qi, ji, Bi, Ii = function (t) {
    for (var e in Ui) void 0 === t[e] && (t[e] = Ui[e]);
    return {
      getParser: function () {
        return function (e) {
          var n = new RegExp("[^-0-9eE" + e + "]", "g");
          return function (t) {
            return "number" == typeof t ? t : "" === t || void 0 === t ? NaN : parseFloat(t.replace(n, "")
              .replace(e, "."))
          }
        }(t.input_decimal_separator)
      },
      getFormatterFunction: function () {
        return function (t) {
          var e = 1 < t.length,
            n = e ? t.charAt(1) : t.charAt(0),
            r = e ? t.charAt(0) : "",
            i = Pi(function (t, e) {
              return {
                decimal: t,
                thousands: e,
                grouping: [3],
                currency: ["", ""]
              }
            }(n, r)).format;
          return i.decimal = n, i.thousands = r, i
        }(t.output_separators)
      }
    }
  }(d.localization);

  function Xi() {
    Ri = Ii.getParser();
    var r, a = [];
    Yi = 0, _.horserace.forEach(function (t, e) {
      t.unfiltered_index = e
    }), r = null === d.filter || d.filter === d.filter_all_label ? _.horserace : _.horserace.filter(function (
      t) {
      return t.filter === d.filter
    });
    _.horserace.column_names.stages.forEach(function (t, i) {
      var o = [];
      r.forEach(function (t, e) {
        if (void 0 !== t.stages[i]) {
          var n = t.stages[i],
            r = "" == n || isNaN(Ri(n)) ? null : Ri(n);
          t.index = e, o.push({
            name: t.name,
            index: e,
            score: r
          })
        }
      }), o.sort(function (t, e) {
        return d.higher_scores_win ? function (t, e) {
          return e < t ? -1 : t < e ? 1 : t <= e ? 0 : NaN
        }(t.score, e.score) : ln(t.score, e.score)
      }), ("dense" === d.ties_mode ? function (t) {
        var e = void 0,
          n = 0;
        t.forEach(function (t) {
          null == t.score ? t.rank = null : t.score == e ? t.rank = n : t.rank = ++n, e = t.score,
            Yi = Math.max(Yi, t.rank)
        })
      } : function (t) {
        var e = void 0,
          n = 0,
          r = 0;
        t.forEach(function (t) {
          null == t.score ? t.rank = null : t.score == e ? (t.rank = n, r++) : (t.rank = n + r + 1,
            n = t.rank, r = 0), e = t.score, Yi = Math.max(Yi, t.rank)
        })
      })(o);
      var e = {};
      o.forEach(function (t) {
        e[t.index] = t
      }), a.push(e);
      var n = function (t, e) {
        var n, r, i, o = t.length,
          a = -1;
        if (null == e) {
          for (; ++a < o;)
            if (null != (n = t[a]) && n <= n)
              for (r = i = n; ++a < o;) null != (n = t[a]) && (n < r && (r = n), i < n && (i = n))
        } else
          for (; ++a < o;)
            if (null != (n = e(t[a], a, t)) && n <= n)
              for (r = i = n; ++a < o;) null != (n = e(t[a], a, t)) && (n < r && (r = n), i < n && (i = n));
        return [r, i]
      }(o.map(function (t) {
        return t.score
      }));
      a[i].min_score = Math.min(1 / 0, n[0]), a[i].max_score = Math.max(-1 / 0, n[1])
    });
    var t = r.map(function (n, r) {
      var i = null;
      return n.ranks = n.stages.map(function (t, e) {
        return a[e][r].rank
      }), n.line = n.stages.map(function (t, e) {
        return {
          i: e,
          value: "ranks" == d.value_type ? a[e][r].rank : a[e][r].score
        }
      }), n.missing_line = n.line.map(function (t, e) {
        return null !== t.value || 0 === e ? null !== t.value && i ? (i = null, t) : {
          i: t.i,
          value: null
        } : i ? void 0 : (i = !0, {
          i: t.i - 1,
          value: n.line[e - 1].value
        })
      }).filter(function (t) {
        return void 0 !== t
      }), n.start_circle = n.line.filter(function (t) {
        return null != t.value
      })[0], n
    }).filter(function (t) {
      return t.start_circle
    });
    return t.max_rank = Yi, t.timeslices = a, _.horserace.processed ? t.new_data = !1 : (t.new_data = !0, _
      .horserace.processed = !0), t
  }
  var Vi, Wi, $i, Zi, Qi, Ji, Gi, Ki, to, eo = Object.freeze({
    "stack-default": ["header", "controls", "primary", "footer"],
    "stack-2": ["primary", "header", "controls", "footer"],
    "stack-3": ["header", "primary", "controls", "footer"],
    "stack-4": ["controls", "primary", "header", "footer"]
  });

  function no() {
    Vi.style.textAlign = co.header_align, Vi.style.margin = 0, Vi.style.borderTop = "top" == co.header_border ? co
      .header_border_width + "px " + co.header_border_style + " " + co.header_border_color : null, Vi.style
        .borderBottom = "bottom" == co.header_border ? co.header_border_width + "px " + co.header_border_style +
          " " + co.header_border_color : null, Vi.style.paddingBottom = co.title || co.subtitle ? co.text ? (
            "custom" != co.text_size ? co.text_size / 2 : co.text_size_custom / 2) + "rem" : co.subtitle ? (
              "custom" != co.subtitle_size ? co.subtitle_size / 2 : co.subtitle_size_custom / 2) + "rem" : co.title ? (
                "custom" != co.title_size ? co.title_size / 2 : co.title_size_custom / 2) + "rem" : void 0 : "", Wi
                  .innerHTML = co.title ? co.title : "", Wi.style.fontSize = ("custom" != co.title_size ? co.title_size : co
                    .title_size_custom) + "rem", Wi.style.lineHeight = co.title_line_height, Wi.style.fontWeight = co
                      .title_weight, Wi.style.color = co.title_color, Wi.style.margin = 0, Wi.style.lineHeight = co.title_color,
      Wi.style.paddingTop = co.title ? ("custom" == co.title_space_above ? co.title_space_above_custom : co
        .title_space_above) + "rem" : 0, $i.innerHTML = co.subtitle ? co.subtitle : "", $i.style.fontSize = (
          "custom" != co.subtitle_size ? co.subtitle_size : co.subtitle_size_custom) + "rem", $i.style.lineHeight =
      co.subtitle_line_height, $i.style.fontWeight = co.subtitle_weight, $i.style.color = co.subtitle_color, $i
        .style.margin = 0, $i.style.paddingTop = co.subtitle ? ("custom" == co.subtitle_space_above ? co
          .subtitle_space_above_custom : co.subtitle_space_above) + "rem" : 0, Zi.innerHTML = co.text ? co.text :
            "", Zi.style.fontSize = ("custom" != co.text_size ? co.text_size : co.text_size_custom) + "rem", Zi.style
              .lineHeight = co.text_line_height, Zi.style.fontWeight = co.text_weight, Zi.style.margin = 0, Zi.style
                .color = co.text_color, Zi.style.paddingTop = co.text ? ("custom" == co.text_space_above ? co
                  .text_space_above_custom : co.text_space_above) + "rem" : 0, Qi.style.display = co.header_logo_enabled ?
                    "" : "none", Qi.style.position = "inside" == co.header_logo_align ? "" : "fixed", Qi.style.height = co
                      .header_logo_height + "rem", Qi.style.top = "outside" == co.header_logo_align ? 0 : "", Qi.style.left =
      "outside" == co.header_logo_align && "left" == co.header_logo_position_outside ? 0 : "", Qi.style.right =
      "outside" == co.header_logo_align && "right" == co.header_logo_position_outside ? 0 : "", Qi.style
        .marginTop = co.header_logo_margin_top + "rem", Qi.style.marginBottom = co.header_logo_margin_bottom +
        "rem", Qi.style.marginLeft = co.header_logo_margin_left + "rem", Qi.style.marginRight = co
          .header_logo_margin_right + "rem", Qi.style.float = "top" == co.header_logo_position_inside || "outside" ==
            co.header_logo_align ? "" : co.header_logo_position_inside, Qi.style.width = "auto", Qi.src = co
              .header_logo_src
  }

  function ro(t) {
    return "string" == typeof t && null != t.match(/^https?:\/\//i)
  }
  var io = !1;

  function oo(t) {
    return 0 !== t.indexOf("http://") && 0 !== t.indexOf("https://") ? "http://" + t : t
  }

  function ao() {
    return function () {
      var t = document.createElement("style");
      t.type = "text/css", t.innerHTML =
        ".flourish-footer { margin: 0; } .flourish-footer p { margin: 0; display: inline; } .flourish-footer p:empty { height: 0; } .flourish-footer a { color: inherit; }",
        document.head.appendChild(t)
    }(), (Ji = document.createElement("footer")).className = "flourish-footer", (Gi = document.createElement(
      "div")).className = "flourish-footer-text", (to = document.createElement("a")).target = "_blank", (Ki =
        document.createElement("img")).className = "flourish-footer-logo", to.appendChild(Ki), Ji.appendChild(Gi),
      Ji.appendChild(to), Ji
  }

  function so() {
    var t = [{
      name: co.source_name,
      url: co.source_url
    }, {
      name: co.multiple_sources ? co.source_name_2 : "",
      url: co.multiple_sources ? co.source_url_2 : ""
    }, {
      name: co.multiple_sources ? co.source_name_3 : "",
      url: co.multiple_sources ? co.source_url_3 : ""
    }].filter(function (t) {
      return t.name || t.url
    });
    io = 0 < t.length || co.footer_note || ro(co.footer_logo_src) && co.footer_logo_enabled, Ji.style.display =
      "flex", Ji.style.height = io ? null : 0, Ji.style.width = "100%", Ji.style.paddingTop = co.source_name || co
        .source_name_2 || co.source_name_3 || co.source_url || co.source_url_2 || co.source_url_3 || co
          .footer_note || ro(co.footer_logo_src) && co.footer_logo_enabled ? Lo(co.footer_text_size) / 2 + "px" : "",
      Ji.style.borderTop = "top" == co.footer_border ? co.footer_border_width + "px " + co.footer_border_style +
        " " + co.footer_border_color : "", Ji.style.borderBottom = "bottom" == co.footer_border ? co
          .footer_border_width + "px " + co.footer_border_style + " " + co.footer_border_color : "", "justify" == co
            .footer_align ? Ji.style.justifyContent = "space-between" : "left" == co.footer_align ? Ji.style
              .justifyContent = "flex-start" : "right" == co.footer_align ? Ji.style.justifyContent = "flex-end" :
            "center" == co.footer_align && (Ji.style.justifyContent = "center"), Ji.style.fontSize = co
              .footer_text_size + "rem", Ji.style.color = co.footer_text_color;
    var i = document.createElement("span");
    t.forEach(function (t, e) {
      var n = document.createElement("p");
      if (0 < e && (n.innerText = ", "), t.url) {
        var r = document.createElement("a");
        r.innerText = t.name || t.url, r.href = oo(t.url), r.target = "_blank", n.appendChild(r)
      } else n.innerText += t.name || t.url;
      i.innerHTML += n.innerHTML
    }), Gi.style.order = "left" == co.footer_logo_order ? 2 : "", Gi.style.display = "flex", Gi.style
      .alignItems = co.footer_align_vertical;
    var e = "<p>";
    e += "" !== i.innerHTML ? co.source_label + " " + i.innerHTML : "", e += co.footer_note ? ("" !== i
      .innerHTML ? " • " : "") + co.footer_note : "", e += "</p>", Gi.innerHTML = e, Ki.src = ro(co
        .footer_logo_src) ? co.footer_logo_src : "", Ki.style.height = co.footer_logo_height + "rem", Ki.style
          .marginLeft = "right" == co.footer_logo_order ? co.footer_logo_margin + "rem" : "", Ki.style.marginRight =
      "left" == co.footer_logo_order ? co.footer_logo_margin + "rem" : "", Ki.style.verticalAlign = co
        .footer_align_vertical, Ki.style.display = ro(co.footer_logo_src) && co.footer_logo_enabled ? "" : "none",
      to.href = "" == co.footer_logo_link_url ? "" : oo(co.footer_logo_link_url), to.style.cursor = "" == co
        .footer_logo_link_url ? "default" : "pointer"
  }

  function lo() {
    ! function () {
      if (co.body_font && co.body_font.url !== ji) {
        ji = co.body_font.url, Bi.setAttribute("href", ji), document.body.style.fontFamily = co.body_font.name;
        var i = "";
        ["mobile_small", "mobile_big", "tablet", "desktop", "big_screen"].forEach(function (t, e) {
          var n = "@media(min-width: " + co["breakpoint_" + t] + "px) {\n",
            r = "html { font-size:" + co["font_size_" + t] + "%; }";
          i += (0 == e ? "" : n) + r + (0 == e ? "" : "\n}") + "\n\n"
        }), qi.innerHTML = i
      }
    }(), no(), so(), document.body.style.backgroundColor = co.background_color_enabled ? co.background_color :
      "transparent", document.body.style.backgroundImage = co.background_image_enabled ? "url(" + co
        .background_image_src + ")" : "", document.body.style.backgroundSize = co.background_image_size, document
          .body.style.backgroundRepeat = "no-repeat", document.body.style.backgroundPosition = co
            .background_image_position;
    var t = po.wrapper.style;
    t.maxWidth = co.max_width ? co.max_width + "px" : "", t.padding = co.margin_top + "rem " +
      co.margin_right + "rem " + co.margin_bottom + "rem " + co.margin_left + "rem", t.borderTop = co.border
        .enabled ? co.border.top.width + "px " + co.border.top.style + " " + co.border.top.color : "", t
          .borderRight = co.border.enabled ? co.border.right.width + "px " + co.border.right.style + " " + co.border
            .right.color : "", t.borderBottom = co.border.enabled ? co.border.bottom.width + "px " + co.border.bottom
              .style + " " + co.border.bottom.color : "", t.borderLeft = co.border.enabled ? co.border.left.width +
                "px " + co.border.left.style + " " + co.border.left.color : "";
    var e = po.primary.outer.style,
      n = po.legend.outer.style,
      r = parseFloat(e.order) > parseFloat(n.order) ? "above" : "below";
    eo[co.layout_order].forEach(function (t, e) {
      po[t].outer.style.order = 10 * e
    }), e.flex = "1 1 auto", e.height = null, Eo(r), n.textAlign = co.header_align, po.controls.outer.style
      .textAlign = co.header_align, po.primary.inner.style.height = "100%";
    var i = ("custom" == co.space_between_sections ? co.space_between_sections_custom : co
      .space_between_sections) / 2 + "rem";
    _o.map(function (t) {
      var e = po[t],
        n = e.outer.style;
      return {
        name: t,
        height: yo(e.inner),
        order: parseFloat(n.order),
        style: n
      }
    }).sort(function (t, e) {
      return t.order - e.order
    }).filter(function (t) {
      if (t.height) return !0;
      t.style.paddingBottom = "", t.style.paddingTop = ""
    }).forEach(function (t, e, n) {
      t.style.paddingTop = e ? i : "", t.style.paddingBottom = e < n.length - 1 ? i : ""
    })
  }
  var uo = Object.freeze({
    body_font: {
      name: "Source Sans Pro",
      url: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
    },
    border: {
      enabled: !1,
      top: {
        width: 1,
        color: "#dddddd",
        style: "solid"
      },
      right: {
        width: 1,
        color: "#dddddd",
        style: "solid"
      },
      bottom: {
        width: 1,
        color: "#dddddd",
        style: "solid"
      },
      left: {
        width: 1,
        color: "#dddddd",
        style: "solid"
      }
    },
    layout_order: "stack-default",
    margin_top: .75,
    margin_right: .75,
    margin_bottom: .75,
    margin_left: .75,
    space_between_sections: 0,
    space_between_sections_custom: 1,
    background_color_enabled: !0,
    background_color: "#ffffff",
    background_image_enabled: !1,
    background_image_src: "",
    background_image_size: "cover",
    background_image_position: "center center",
    max_width: null,
    breakpoint_mobile_small: 0,
    breakpoint_mobile_big: 380,
    breakpoint_tablet: 580,
    breakpoint_desktop: 1080,
    breakpoint_big_screen: 1280,
    font_size_mobile_small: 62.5,
    font_size_mobile_big: 75,
    font_size_tablet: 87.5,
    font_size_desktop: 100,
    font_size_big_screen: 120,
    header_align: "left",
    header_border: "none",
    header_border_width: 1,
    header_border_color: "#dddddd",
    header_border_style: "solid",
    header_logo_enabled: !1,
    header_logo_align: "inside",
    header_logo_src: "",
    header_logo_height: 3,
    header_logo_position_inside: "left",
    header_logo_position_outside: "left",
    header_logo_margin_top: .25,
    header_logo_margin_right: .5,
    header_logo_margin_bottom: 0,
    header_logo_margin_left: 0,
    title: "",
    title_size: 1.6,
    title_size_custom: 1.6,
    title_line_height: 1.2,
    title_color: "#333333",
    title_weight: "bold",
    title_space_above: 0,
    title_space_above_custom: 1.5,
    subtitle: "",
    subtitle_size: 1.6,
    subtitle_size_custom: 1.6,
    subtitle_line_height: 1.2,
    subtitle_color: "#666666",
    subtitle_weight: "normal",
    subtitle_space_above: 0,
    subtitle_space_above_custom: 1.5,
    text: "",
    text_size: 1.2,
    text_size_custom: 1.2,
    text_line_height: 1.2,
    text_color: "#666666",
    text_weight: "normal",
    text_space_above: .5,
    text_space_above_custom: 1.5,
    source_label: "Source: ",
    source_name: "",
    source_url: "",
    source_name_2: "",
    source_url_2: "",
    source_name_3: "",
    source_url_3: "",
    footer_note: "",
    footer_text_size: 1,
    footer_text_color: "#aaaaaa",
    footer_align: "justify",
    footer_align_vertical: "center",
    footer_border: "none",
    footer_border_width: 1,
    footer_border_color: "#dddddd",
    footer_border_style: "solid",
    footer_logo_enabled: !1,
    footer_logo_src: "",
    footer_logo_link_url: "",
    footer_logo_height: 1.5,
    footer_logo_margin: .25,
    footer_logo_order: "right"
  });
  var co, ho, fo =
    "Your web browser does not support the features used by this content. Consider updating to a modern browser.",
    _o = ["header", "controls", "legend", "primary", "footer"],
    po = {};

  function go(t) {
    return t.getBoundingClientRect().width
  }

  function yo(t) {
    return t.getBoundingClientRect().height
  }

  function mo() {
    return po.wrapper
  }

  function vo(t) {
    return -1 !== _o.indexOf(t) ? po[t].inner : null
  }

  function xo(t) {
    return po[t] || void 0 === t ? go("wrapper" == t || void 0 === t ? po.wrapper : po[t].outer) : null
  }

  function bo(t) {
    return po[t] || void 0 === t ? "wrapper" == t || void 0 === t ? go(po.wrapper) - No("horizontal") - Ao(
      "horizontal") : go(po[t].inner) : null
  }

  function wo(t) {
    return po[t] || void 0 === t ? yo("wrapper" == t || void 0 === t ? po.wrapper : po[t].outer) : null
  }

  function ko(t) {
    return po[t] || void 0 === t ? "wrapper" == t || void 0 === t ? yo(po.wrapper) - No("vertical") - Ao(
      "vertical") : yo(po[t].inner) : null
  }

  function Mo() {
    return yo(po.primary.outer) - zo(po.primary.outer)
  }

  function To() {
    return go(po.primary.inner)
  }

  function zo(t) {
    return (parseFloat(getComputedStyle(t).paddingTop) || 0) + (parseFloat(getComputedStyle(t).paddingBottom) ||
      0)
  }

  function Co() {
    return function () {
      if (Flourish.fixed_height) return window.innerHeight;
      var t = window.innerWidth;
      return 999 < t ? 650 : 599 < t ? 575 : 400
    }() - No("vertical") - Ao("vertical") - ["header", "controls", "legend", "footer"].reduce(function (t, e) {
      return t + wo(e)
    }, 0) - zo(po.primary.outer)
  }

  function No(t) {
    var e;
    return "left" == t ? e = co.margin_left : "right" == t ? e = co.margin_right : "top" == t ? e = co
      .margin_top : "bottom" == t ? e = co.margin_bottom : "horizontal" == t ? e = co.margin_left + co
        .margin_right : "vertical" == t && (e = co.margin_top + co.margin_bottom), Lo(e)
  }

  function Ao(t) {
    return co.border.enabled ? "vertical" == t ? co.border.top.width + co.border.bottom.width : "horizontal" ==
      t ? co.border.left.width + co.border.right.width : null : 0
  }

  function So(t) {
    if (!Flourish.fixed_height && void 0 !== Flourish.fixed_height) {
      var e = null === t,
        n = po.primary,
        r = e ? Co() : t;
      r + zo(po.primary.outer) !== parseFloat(n.outer.style.height) && (po.wrapper.style.height = "", n.outer
        .style.flex = "", n.inner.style.height = r + "px", Flourish.setHeight(e ? null : wo()))
    }
  }

  function Eo(t) {
    var e = parseFloat(po.primary.outer.style.order);
    po.legend.outer.style.order = e + 1 * ("below" === t.trim().toLowerCase() ? 1 : -1)
  }

  function Fo(t) {
    var e = ho.querySelector(".fl-layout-overlay-message");
    if (t) {
      ho.style.display = "block";
      var n = "string" == typeof t ? t : fo;
      e.innerHTML = n
    } else e.textContent = "", ho.style.display = "none"
  }

  function Lo(t) {
    return t * parseFloat(getComputedStyle(document.documentElement).fontSize)
  }

  function Po() {
    return ho
  }
  var Do = "$";

  function Ho() { }

  function Oo(t, e) {
    var n = new Ho;
    if (t instanceof Ho) t.each(function (t, e) {
      n.set(e, t)
    });
    else if (Array.isArray(t)) {
      var r, i = -1,
        o = t.length;
      if (null == e)
        for (; ++i < o;) n.set(i, t[i]);
      else
        for (; ++i < o;) n.set(e(r = t[i], i, t), r)
    } else if (t)
      for (var a in t) n.set(a, t[a]);
    return n
  }

  function Uo() { }
  Ho.prototype = Oo.prototype = {
    constructor: Ho,
    has: function (t) {
      return Do + t in this
    },
    get: function (t) {
      return this[Do + t]
    },
    set: function (t, e) {
      return this[Do + t] = e, this
    },
    remove: function (t) {
      var e = Do + t;
      return e in this && delete this[e]
    },
    clear: function () {
      for (var t in this) t[0] === Do && delete this[t]
    },
    keys: function () {
      var t = [];
      for (var e in this) e[0] === Do && t.push(e.slice(1));
      return t
    },
    values: function () {
      var t = [];
      for (var e in this) e[0] === Do && t.push(this[e]);
      return t
    },
    entries: function () {
      var t = [];
      for (var e in this) e[0] === Do && t.push({
        key: e.slice(1),
        value: this[e]
      });
      return t
    },
    size: function () {
      var t = 0;
      for (var e in this) e[0] === Do && ++t;
      return t
    },
    empty: function () {
      for (var t in this)
        if (t[0] === Do) return !1;
      return !0
    },
    each: function (t) {
      for (var e in this) e[0] === Do && t(this[e], e.slice(1), this)
    }
  };
  var Ro = Oo.prototype;

  function Yo(t, e) {
    var n = new Uo;
    if (t instanceof Uo) t.each(function (t) {
      n.add(t)
    });
    else if (t) {
      var r = -1,
        i = t.length;
      if (null == e)
        for (; ++r < i;) n.add(t[r]);
      else
        for (; ++r < i;) n.add(e(t[r], r, t))
    }
    return n
  }
  Uo.prototype = Yo.prototype = {
    constructor: Uo,
    has: Ro.has,
    add: function (t) {
      return this[Do + (t += "")] = t, this
    },
    remove: Ro.remove,
    clear: Ro.clear,
    values: Ro.keys,
    size: Ro.size,
    empty: Ro.empty,
    each: Ro.each
  };
  var qo = Array.prototype,
    jo = qo.map,
    Bo = qo.slice;

  function Io(t) {
    return +t
  }
  var Xo = [0, 1];

  function Vo(t) {
    return t
  }

  function Wo(e, n) {
    return (n -= e = +e) ? function (t) {
      return (t - e) / n
    } : function (t) {
      return function () {
        return t
      }
    }(isNaN(n) ? NaN : .5)
  }

  function $o(t) {
    var e, n = t[0],
      r = t[t.length - 1];
    return r < n && (e = n, n = r, r = e),
      function (t) {
        return Math.max(n, Math.min(r, t))
      }
  }

  function Zo(t, e, n) {
    var r = t[0],
      i = t[1],
      o = e[0],
      a = e[1];
    return o = i < r ? (r = Wo(i, r), n(a, o)) : (r = Wo(r, i), n(o, a)),
      function (t) {
        return o(r(t))
      }
  }

  function Qo(n, t, e) {
    var r = Math.min(n.length, t.length) - 1,
      i = new Array(r),
      o = new Array(r),
      a = -1;
    for (n[r] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++a < r;) i[a] = Wo(n[a], n[a + 1]),
      o[a] = e(t[a], t[a + 1]);
    return function (t) {
      var e = hn(n, t, 1, r) - 1;
      return o[e](i[e](t))
    }
  }

  function Jo(t, e) {
    return function () {
      var n, r, e, i, o, a, s = Xo,
        l = Xo,
        u = Re,
        c = Vo;

      function h() {
        return i = 2 < Math.min(s.length, l.length) ? Qo : Zo, o = a = null, f
      }

      function f(t) {
        return isNaN(t = +t) ? e : (o = o || i(s.map(n), l, u))(n(c(t)))
      }
      return f.invert = function (t) {
        return c(r((a = a || i(l, s.map(n), De))(t)))
      }, f.domain = function (t) {
        return arguments.length ? (s = jo.call(t, Io), c === Vo || (c = $o(s)), h()) : s.slice()
      }, f.range = function (t) {
        return arguments.length ? (l = Bo.call(t), h()) : l.slice()
      }, f.rangeRound = function (t) {
        return l = Bo.call(t), u = Ye, h()
      }, f.clamp = function (t) {
        return arguments.length ? (c = t ? $o(s) : Vo, f) : c !== Vo
      }, f.interpolate = function (t) {
        return arguments.length ? (u = t, h()) : u
      }, f.unknown = function (t) {
        return arguments.length ? (e = t, f) : e
      },
        function (t, e) {
          return n = t, r = e, h()
        }
    }()(t, e)
  }

  function Go(s) {
    var l = s.domain;
    return s.ticks = function (t) {
      var e = l();
      return pn(e[0], e[e.length - 1], null == t ? 10 : t)
    }, s.tickFormat = function (t, e) {
      var n = l();
      return function (t, e, n, r) {
        var i, o = yn(t, e, n);
        switch ((r = Mi(null == r ? ",f" : r)).type) {
          case "s":
            var a = Math.max(Math.abs(t), Math.abs(e));
            return null != r.precision || isNaN(i = Hi(o, a)) || (r.precision = i), Ei(r, a);
          case "":
          case "e":
          case "g":
          case "p":
          case "r":
            null != r.precision || isNaN(i = Oi(o, Math.max(Math.abs(t), Math.abs(e)))) || (r.precision = i -
              ("e" === r.type));
            break;
          case "f":
          case "%":
            null != r.precision || isNaN(i = Di(o)) || (r.precision = i - 2 * ("%" === r.type))
        }
        return Si(r)
      }(n[0], n[n.length - 1], null == t ? 10 : t, e)
    }, s.nice = function (t) {
      null == t && (t = 10);
      var e, n = l(),
        r = 0,
        i = n.length - 1,
        o = n[r],
        a = n[i];
      return a < o && (e = o, o = a, a = e, e = r, r = i, i = e), 0 < (e = gn(o, a, t)) ? e = gn(o = Math.floor(
        o / e) * e, a = Math.ceil(a / e) * e, t) : e < 0 && (e = gn(o = Math.ceil(o * e) / e, a = Math.floor(
          a * e) / e, t)), 0 < e ? (n[r] = Math.floor(o / e) * e, n[i] = Math.ceil(a / e) * e, l(n)) : e < 0 &&
            (n[r] = Math.ceil(o * e) / e, n[i] = Math.floor(a * e) / e, l(n)), s
    }, s
  }

  function Ko() {
    var t = Jo(Vo, Vo);
    return t.copy = function () {
      return function (t, e) {
        return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t
          .unknown())
      }(t, Ko())
    },
      function (t, e) {
        switch (arguments.length) {
          case 0:
            break;
          case 1:
            this.range(t);
            break;
          default:
            this.range(e).domain(t)
        }
        return this
      }.apply(t, arguments), Go(t)
  }
  var ta = new Date,
    ea = new Date;

  function na(o, a, n, r) {
    function s(t) {
      return o(t = 0 === arguments.length ? new Date : new Date(+t)), t
    }
    return s.floor = function (t) {
      return o(t = new Date(+t)), t
    }, s.ceil = function (t) {
      return o(t = new Date(t - 1)), a(t, 1), o(t), t
    }, s.round = function (t) {
      var e = s(t),
        n = s.ceil(t);
      return t - e < n - t ? e : n
    }, s.offset = function (t, e) {
      return a(t = new Date(+t), null == e ? 1 : Math.floor(e)), t
    }, s.range = function (t, e, n) {
      var r, i = [];
      if (t = s.ceil(t), n = null == n ? 1 : Math.floor(n), !(t < e && 0 < n)) return i;
      for (; i.push(r = new Date(+t)), a(t, n), o(t), r < t && t < e;);
      return i
    }, s.filter = function (n) {
      return na(function (t) {
        if (t <= t)
          for (; o(t), !n(t);) t.setTime(t - 1)
      }, function (t, e) {
        if (t <= t)
          if (e < 0)
            for (; ++e <= 0;)
              for (; a(t, -1), !n(t););
          else
            for (; 0 <= --e;)
              for (; a(t, 1), !n(t););
      })
    }, n && (s.count = function (t, e) {
      return ta.setTime(+t), ea.setTime(+e), o(ta), o(ea), Math.floor(n(ta, ea))
    }, s.every = function (e) {
      return e = Math.floor(e), isFinite(e) && 0 < e ? 1 < e ? s.filter(r ? function (t) {
        return r(t) % e == 0
      } : function (t) {
        return s.count(0, t) % e == 0
      }) : s : null
    }), s
  }
  var ra = na(function () { }, function (t, e) {
    t.setTime(+t + e)
  }, function (t, e) {
    return e - t
  });
  ra.every = function (n) {
    return n = Math.floor(n), isFinite(n) && 0 < n ? 1 < n ? na(function (t) {
      t.setTime(Math.floor(t / n) * n)
    }, function (t, e) {
      t.setTime(+t + e * n)
    }, function (t, e) {
      return (e - t) / n
    }) : ra : null
  };
  ra.range, na(function (t) {
    t.setTime(t - t.getMilliseconds())
  }, function (t, e) {
    t.setTime(+t + 1e3 * e)
  }, function (t, e) {
    return (e - t) / 1e3
  }, function (t) {
    return t.getUTCSeconds()
  }).range, na(function (t) {
    t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds())
  }, function (t, e) {
    t.setTime(+t + 6e4 * e)
  }, function (t, e) {
    return (e - t) / 6e4
  }, function (t) {
    return t.getMinutes()
  }).range, na(function (t) {
    t.setTime(t - t.getMilliseconds() - 1e3 * t.getSeconds() - 6e4 * t.getMinutes())
  }, function (t, e) {
    t.setTime(+t + 36e5 * e)
  }, function (t, e) {
    return (e - t) / 36e5
  }, function (t) {
    return t.getHours()
  }).range;
  var ia = na(function (t) {
    t.setHours(0, 0, 0, 0)
  }, function (t, e) {
    t.setDate(t.getDate() + e)
  }, function (t, e) {
    return (e - t - 6e4 * (e.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5
  }, function (t) {
    return t.getDate() - 1
  });
  ia.range;

  function oa(e) {
    return na(function (t) {
      t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setDate(t.getDate() + 7 * e)
    }, function (t, e) {
      return (e - t - 6e4 * (e.getTimezoneOffset() - t.getTimezoneOffset())) / 6048e5
    })
  }
  var aa = oa(0),
    sa = oa(1),
    la = (oa(2), oa(3), oa(4)),
    ua = (oa(5), oa(6), aa.range, na(function (t) {
      t.setDate(1), t.setHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setMonth(t.getMonth() + e)
    }, function (t, e) {
      return e.getMonth() - t.getMonth() + 12 * (e.getFullYear() - t.getFullYear())
    }, function (t) {
      return t.getMonth()
    }).range, na(function (t) {
      t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setFullYear(t.getFullYear() + e)
    }, function (t, e) {
      return e.getFullYear() - t.getFullYear()
    }, function (t) {
      return t.getFullYear()
    }));
  ua.every = function (n) {
    return isFinite(n = Math.floor(n)) && 0 < n ? na(function (t) {
      t.setFullYear(Math.floor(t.getFullYear() / n) * n), t.setMonth(0, 1), t.setHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setFullYear(t.getFullYear() + e * n)
    }) : null
  };
  ua.range, na(function (t) {
    t.setUTCSeconds(0, 0)
  }, function (t, e) {
    t.setTime(+t + 6e4 * e)
  }, function (t, e) {
    return (e - t) / 6e4
  }, function (t) {
    return t.getUTCMinutes()
  }).range, na(function (t) {
    t.setUTCMinutes(0, 0, 0)
  }, function (t, e) {
    t.setTime(+t + 36e5 * e)
  }, function (t, e) {
    return (e - t) / 36e5
  }, function (t) {
    return t.getUTCHours()
  }).range;
  var ca = na(function (t) {
    t.setUTCHours(0, 0, 0, 0)
  }, function (t, e) {
    t.setUTCDate(t.getUTCDate() + e)
  }, function (t, e) {
    return (e - t) / 864e5
  }, function (t) {
    return t.getUTCDate() - 1
  });
  ca.range;

  function ha(e) {
    return na(function (t) {
      t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setUTCDate(t.getUTCDate() + 7 * e)
    }, function (t, e) {
      return (e - t) / 6048e5
    })
  }
  var fa = ha(0),
    _a = ha(1),
    da = (ha(2), ha(3), ha(4)),
    pa = (ha(5), ha(6), fa.range, na(function (t) {
      t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setUTCMonth(t.getUTCMonth() + e)
    }, function (t, e) {
      return e.getUTCMonth() - t.getUTCMonth() + 12 * (e.getUTCFullYear() - t.getUTCFullYear())
    }, function (t) {
      return t.getUTCMonth()
    }).range, na(function (t) {
      t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0)
    }, function (t, e) {
      t.setUTCFullYear(t.getUTCFullYear() + e)
    }, function (t, e) {
      return e.getUTCFullYear() - t.getUTCFullYear()
    }, function (t) {
      return t.getUTCFullYear()
    }));
  pa.every = function (n) {
    return isFinite(n = Math.floor(n)) && 0 < n ? na(function (t) {
      t.setUTCFullYear(Math.floor(t.getUTCFullYear() / n) * n), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0,
        0)
    }, function (t, e) {
      t.setUTCFullYear(t.getUTCFullYear() + e * n)
    }) : null
  };
  pa.range;

  function ga(t) {
    if (0 <= t.y && t.y < 100) {
      var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
      return e.setFullYear(t.y), e
    }
    return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L)
  }

  function ya(t) {
    if (0 <= t.y && t.y < 100) {
      var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
      return e.setUTCFullYear(t.y), e
    }
    return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L))
  }

  function ma(t) {
    return {
      y: t,
      m: 0,
      d: 1,
      H: 0,
      M: 0,
      S: 0,
      L: 0
    }
  }
  var va, xa, ba, wa, ka, Ma, Ta, za, Ca, Na, Aa, Sa, Ea, Fa, La, Pa, Da, Ha, Oa, Ua, Ra, Ya, qa, ja, Ba, Ia = {
    "-": "",
    _: " ",
    0: "0"
  },
    Xa = /^\s*\d+/,
    Va = /^%/,
    Wa = /[\\^$*+?|[\]().{}]/g;

  function $a(t, e, n) {
    var r = t < 0 ? "-" : "",
      i = (r ? -t : t) + "",
      o = i.length;
    return r + (o < n ? new Array(n - o + 1).join(e) + i : i)
  }

  function Za(t) {
    return t.replace(Wa, "\\$&")
  }

  function Qa(t) {
    return new RegExp("^(?:" + t.map(Za).join("|") + ")", "i")
  }

  function Ja(t) {
    for (var e = {}, n = -1, r = t.length; ++n < r;) e[t[n].toLowerCase()] = n;
    return e
  }

  function Ga(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 1));
    return r ? (t.w = +r[0], n + r[0].length) : -1
  }

  function Ka(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 1));
    return r ? (t.u = +r[0], n + r[0].length) : -1
  }

  function ts(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.U = +r[0], n + r[0].length) : -1
  }

  function es(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.V = +r[0], n + r[0].length) : -1
  }

  function ns(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.W = +r[0], n + r[0].length) : -1
  }

  function rs(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 4));
    return r ? (t.y = +r[0], n + r[0].length) : -1
  }

  function is(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.y = +r[0] + (68 < +r[0] ? 1900 : 2e3), n + r[0].length) : -1
  }

  function os(t, e, n) {
    var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
    return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1
  }

  function as(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.m = r[0] - 1, n + r[0].length) : -1
  }

  function ss(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.d = +r[0], n + r[0].length) : -1
  }

  function ls(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 3));
    return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1
  }

  function us(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.H = +r[0], n + r[0].length) : -1
  }

  function cs(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.M = +r[0], n + r[0].length) : -1
  }

  function hs(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 2));
    return r ? (t.S = +r[0], n + r[0].length) : -1
  }

  function fs(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 3));
    return r ? (t.L = +r[0], n + r[0].length) : -1
  }

  function _s(t, e, n) {
    var r = Xa.exec(e.slice(n, n + 6));
    return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1
  }

  function ds(t, e, n) {
    var r = Va.exec(e.slice(n, n + 1));
    return r ? n + r[0].length : -1
  }

  function ps(t, e, n) {
    var r = Xa.exec(e.slice(n));
    return r ? (t.Q = +r[0], n + r[0].length) : -1
  }

  function gs(t, e, n) {
    var r = Xa.exec(e.slice(n));
    return r ? (t.Q = 1e3 * +r[0], n + r[0].length) : -1
  }

  function ys(t, e) {
    return $a(t.getDate(), e, 2)
  }

  function ms(t, e) {
    return $a(t.getHours(), e, 2)
  }

  function vs(t, e) {
    return $a(t.getHours() % 12 || 12, e, 2)
  }

  function xs(t, e) {
    return $a(1 + ia.count(ua(t), t), e, 3)
  }

  function bs(t, e) {
    return $a(t.getMilliseconds(), e, 3)
  }

  function ws(t, e) {
    return bs(t, e) + "000"
  }

  function ks(t, e) {
    return $a(t.getMonth() + 1, e, 2)
  }

  function Ms(t, e) {
    return $a(t.getMinutes(), e, 2)
  }

  function Ts(t, e) {
    return $a(t.getSeconds(), e, 2)
  }

  function zs(t) {
    var e = t.getDay();
    return 0 === e ? 7 : e
  }

  function Cs(t, e) {
    return $a(aa.count(ua(t), t), e, 2)
  }

  function Ns(t, e) {
    var n = t.getDay();
    return t = 4 <= n || 0 === n ? la(t) : la.ceil(t), $a(la.count(ua(t), t) + (4 === ua(t).getDay()), e, 2)
  }

  function As(t) {
    return t.getDay()
  }

  function Ss(t, e) {
    return $a(sa.count(ua(t), t), e, 2)
  }

  function Es(t, e) {
    return $a(t.getFullYear() % 100, e, 2)
  }

  function Fs(t, e) {
    return $a(t.getFullYear() % 1e4, e, 4)
  }

  function Ls(t) {
    var e = t.getTimezoneOffset();
    return (0 < e ? "-" : (e *= -1, "+")) + $a(e / 60 | 0, "0", 2) + $a(e % 60, "0", 2)
  }

  function Ps(t, e) {
    return $a(t.getUTCDate(), e, 2)
  }

  function Ds(t, e) {
    return $a(t.getUTCHours(), e, 2)
  }

  function Hs(t, e) {
    return $a(t.getUTCHours() % 12 || 12, e, 2)
  }

  function Os(t, e) {
    return $a(1 + ca.count(pa(t), t), e, 3)
  }

  function Us(t, e) {
    return $a(t.getUTCMilliseconds(), e, 3)
  }

  function Rs(t, e) {
    return Us(t, e) + "000"
  }

  function Ys(t, e) {
    return $a(t.getUTCMonth() + 1, e, 2)
  }

  function qs(t, e) {
    return $a(t.getUTCMinutes(), e, 2)
  }

  function js(t, e) {
    return $a(t.getUTCSeconds(), e, 2)
  }

  function Bs(t) {
    var e = t.getUTCDay();
    return 0 === e ? 7 : e
  }

  function Is(t, e) {
    return $a(fa.count(pa(t), t), e, 2)
  }

  function Xs(t, e) {
    var n = t.getUTCDay();
    return t = 4 <= n || 0 === n ? da(t) : da.ceil(t), $a(da.count(pa(t), t) + (4 === pa(t).getUTCDay()), e, 2)
  }

  function Vs(t) {
    return t.getUTCDay()
  }

  function Ws(t, e) {
    return $a(_a.count(pa(t), t), e, 2)
  }

  function $s(t, e) {
    return $a(t.getUTCFullYear() % 100, e, 2)
  }

  function Zs(t, e) {
    return $a(t.getUTCFullYear() % 1e4, e, 4)
  }

  function Qs() {
    return "+0000"
  }

  function Js() {
    return "%"
  }

  function Gs(t) {
    return +t
  }

  function Ks(t) {
    return Math.floor(+t / 1e3)
  }

  function tl(l, u) {
    return function (t) {
      var e, n, r, i = [],
        o = -1,
        a = 0,
        s = l.length;
      for (t instanceof Date || (t = new Date(+t)); ++o < s;) 37 === l.charCodeAt(o) && (i.push(l.slice(a, o)),
        null != (n = Ia[e = l.charAt(++o)]) ? e = l.charAt(++o) : n = "e" === e ? " " : "0", (r = u[e]) && (
          e = r(t, n)), i.push(e), a = o + 1);
      return i.push(l.slice(a, o)), i.join("")
    }
  }

  function el(i, o) {
    return function (t) {
      var e, n, r = ma(1900);
      if (nl(r, i, t += "", 0) != t.length) return null;
      if ("Q" in r) return new Date(r.Q);
      if ("p" in r && (r.H = r.H % 12 + 12 * r.p), "V" in r) {
        if (r.V < 1 || 53 < r.V) return null;
        "w" in r || (r.w = 1), "Z" in r ? (e = 4 < (n = (e = ya(ma(r.y))).getUTCDay()) || 0 === n ? _a.ceil(e) :
          _a(e), e = ca.offset(e, 7 * (r.V - 1)), r.y = e.getUTCFullYear(), r.m = e.getUTCMonth(), r.d = e
            .getUTCDate() + (r.w + 6) % 7) : (e = 4 < (n = (e = o(ma(r.y))).getDay()) || 0 === n ? sa.ceil(e) :
              sa(e), e = ia.offset(e, 7 * (r.V - 1)), r.y = e.getFullYear(), r.m = e.getMonth(), r.d = e
                .getDate() + (r.w + 6) % 7)
      } else ("W" in r || "U" in r) && ("w" in r || (r.w = "u" in r ? r.u % 7 : "W" in r ? 1 : 0), n = "Z" in r ?
        ya(ma(r.y)).getUTCDay() : o(ma(r.y)).getDay(), r.m = 0, r.d = "W" in r ? (r.w + 6) % 7 + 7 * r.W - (
          n + 5) % 7 : r.w + 7 * r.U - (n + 6) % 7);
      return "Z" in r ? (r.H += r.Z / 100 | 0, r.M += r.Z % 100, ya(r)) : o(r)
    }
  }

  function nl(t, e, n, r) {
    for (var i, o, a = 0, s = e.length, l = n.length; a < s;) {
      if (l <= r) return -1;
      if (37 === (i = e.charCodeAt(a++))) {
        if (i = e.charAt(a++), !(o = Ba[i in Ia ? e.charAt(a++) : i]) || (r = o(t, n, r)) < 0) return -1
      } else if (i != n.charCodeAt(r++)) return -1
    }
    return r
  }
  ka = (wa = {
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
      "November", "December"
    ],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  }).dateTime, Ma = wa.date, Ta = wa.time, za = wa.periods, Ca = wa.days, Na = wa.shortDays, Aa = wa.months,
    Sa = wa.shortMonths, Ea = Qa(za), Fa = Ja(za), La = Qa(Ca), Pa = Ja(Ca), Da = Qa(Na), Ha = Ja(Na), Oa = Qa(
      Aa), Ua = Ja(Aa), Ra = Qa(Sa), Ya = Ja(Sa), ja = {
        a: function (t) {
          return Na[t.getUTCDay()]
        },
        A: function (t) {
          return Ca[t.getUTCDay()]
        },
        b: function (t) {
          return Sa[t.getUTCMonth()]
        },
        B: function (t) {
          return Aa[t.getUTCMonth()]
        },
        c: null,
        d: Ps,
        e: Ps,
        f: Rs,
        H: Ds,
        I: Hs,
        j: Os,
        L: Us,
        m: Ys,
        M: qs,
        p: function (t) {
          return za[+(12 <= t.getUTCHours())]
        },
        Q: Gs,
        s: Ks,
        S: js,
        u: Bs,
        U: Is,
        V: Xs,
        w: Vs,
        W: Ws,
        x: null,
        X: null,
        y: $s,
        Y: Zs,
        Z: Qs,
        "%": Js
      }, Ba = {
        a: function (t, e, n) {
          var r = Da.exec(e.slice(n));
          return r ? (t.w = Ha[r[0].toLowerCase()], n + r[0].length) : -1
        },
        A: function (t, e, n) {
          var r = La.exec(e.slice(n));
          return r ? (t.w = Pa[r[0].toLowerCase()], n + r[0].length) : -1
        },
        b: function (t, e, n) {
          var r = Ra.exec(e.slice(n));
          return r ? (t.m = Ya[r[0].toLowerCase()], n + r[0].length) : -1
        },
        B: function (t, e, n) {
          var r = Oa.exec(e.slice(n));
          return r ? (t.m = Ua[r[0].toLowerCase()], n + r[0].length) : -1
        },
        c: function (t, e, n) {
          return nl(t, ka, e, n)
        },
        d: ss,
        e: ss,
        f: _s,
        H: us,
        I: us,
        j: ls,
        L: fs,
        m: as,
        M: cs,
        p: function (t, e, n) {
          var r = Ea.exec(e.slice(n));
          return r ? (t.p = Fa[r[0].toLowerCase()], n + r[0].length) : -1
        },
        Q: ps,
        s: gs,
        S: hs,
        u: Ka,
        U: ts,
        V: es,
        w: Ga,
        W: ns,
        x: function (t, e, n) {
          return nl(t, Ma, e, n)
        },
        X: function (t, e, n) {
          return nl(t, Ta, e, n)
        },
        y: is,
        Y: rs,
        Z: os,
        "%": ds
      }, (qa = {
        a: function (t) {
          return Na[t.getDay()]
        },
        A: function (t) {
          return Ca[t.getDay()]
        },
        b: function (t) {
          return Sa[t.getMonth()]
        },
        B: function (t) {
          return Aa[t.getMonth()]
        },
        c: null,
        d: ys,
        e: ys,
        f: ws,
        H: ms,
        I: vs,
        j: xs,
        L: bs,
        m: ks,
        M: Ms,
        p: function (t) {
          return za[+(12 <= t.getHours())]
        },
        Q: Gs,
        s: Ks,
        S: Ts,
        u: zs,
        U: Cs,
        V: Ns,
        w: As,
        W: Ss,
        x: null,
        X: null,
        y: Es,
        Y: Fs,
        Z: Ls,
        "%": Js
      }).x = tl(Ma, qa), qa.X = tl(Ta, qa), qa.c = tl(ka, qa), ja.x = tl(Ma, ja), ja.X = tl(Ta, ja), ja.c = tl(ka,
        ja), va = {
          format: function (t) {
            var e = tl(t += "", qa);
            return e.toString = function () {
              return t
            }, e
          },
          parse: function (t) {
            var e = el(t += "", ga);
            return e.toString = function () {
              return t
            }, e
          },
          utcFormat: function (t) {
            var e = tl(t += "", ja);
            return e.toString = function () {
              return t
            }, e
          },
          utcParse: function (t) {
            var e = el(t, ya);
            return e.toString = function () {
              return t
            }, e
          }
        }, va.parse, xa = va.utcFormat, ba = va.utcParse;
  var rl = "%Y-%m-%dT%H:%M:%S.%LZ";
  Date.prototype.toISOString || xa(rl);
  var il, ol, al, sl, ll, ul, cl, hl, fl, _l, dl, pl, gl; + new Date("2000-01-01T00:00:00.000Z") || ba(rl);
  var yl = {
    x_axis: {},
    line: {}
  };

  function ml(t, e, n) {
    var r;
    yl = {
      x: {
        size: 0
      },
      line: {
        size: 0
      }
    }, _.horserace.forEach(function (t) {
      t.name.length > yl.line.size && (yl.line.text = t.name, yl.line.size = t.name.length)
    }), yl.line.el = _u.append("text").text(yl.line.text).style("font-size", il(d.label_font_size) + "px"), yl
      .line.width = yl.line.el.node().getBoundingClientRect().width, yl.line.el.remove(), _.horserace.column_names
        .stages.forEach(function (t) {
          t.length > yl.x.size && (yl.x.text = t, yl.x.size = t.length)
        }), yl.x.el = _u.append("text").text(yl.x.text).style("font-size", il(d.x_axis_label_size) + "px").attr(
          "transform", "rotate(" + -d.x_axis_rotate + ")"), yl.x.height = yl.x.el.node().getBoundingClientRect()
            .height, yl.x.el.remove(), gl = gl || document.getElementById("viz-ui");
    var i, o = Cu.getInnerWidth();
    sl = il(d.start_circle_r), ol = il(d.end_circle_r), al = il(d.end_circle_stroke), ul = il(d.shade_width), ll =
      il(d.line_width), cl = Math.max(2 * ol + al, 2 * sl, ll, ul), i = d.zoom_enabled ? il(Lu ? d
        .margin_right_mobile : d.margin_right) : Lu ? ol + il(d.margin_right_mobile) : il(d.margin_right) + yl
          .line.width + (d.rank_outside_picture ? 15 : 0) + ol + al, hl = il(.1);
    var a = cl / 2 + il(d.margin_bottom),
      s = cl / 2 + yl.x.height + hl,
      l = Math.max(cl / 2, 5) + il(d.margin_left) + ("ranks" == d.value_type ? 0 : (d.y_axis_format.suffix
        .length + d.y_axis_format.prefix.length) * (.5 * il(d.y_axis_label_size))),
      u = null != d.y_axis_max_rank && "" != d.y_axis_max_rank ? d.y_axis_max_rank : _.horserace.length,
      c = il(d.circle_space_between),
      h = u * cl + (u - 1) * c;
    Flourish.fixed_height ? r = Cu.getPrimaryHeight() : "flexible" == d.height_mode || "auto" == d.height_mode &&
      h > Cu.getDefaultPrimaryHeight() ? (r = s + a - cl + h, Cu.setHeight(r)) : (Cu.setHeight(null), r = Cu
        .getPrimaryHeight()), _u.attr("width", o).attr("height", r), du.attr("transform", "translate(" + l + "," +
          s + ")"), fl = Math.max(0, o - l - i), _l = Math.max(0, r - s - a), dl = Ko().range([0, fl]), vl(t), pl =
      Ko().range([_l, 0]), xl(t);
    var f = d.zoom_enabled ? 0 : Math.max(sl, ll / 2, ul / 2) + il(d.margin_left);
    B("#clip rect").attr("height", _l + s + a).transition().duration(n).attr("transform", "translate(0,-" + s +
      ")").attr("width", dl(t) + f).attr("x", -f)
  }

  function vl(t) {
    var e = _.horserace.column_names.stages.length,
      n = d.zoom_enabled ? Math.max(0, t - d.zoom_steps_to_show) : 0,
      r = Math.min(e, d.zoom_steps_to_show),
      i = [n, d.zoom_enabled ? Math.max(t + r, 2 * r) : e - 1];
    dl.domain(i)
  }

  function xl(t) {
    var e, n, r;
    if ("ranks" == d.value_type) e = [d.y_axis_max_rank || Fu.max_rank, d.y_axis_min_rank || 1];
    else {
      if (d.zoom_enabled && d.zoom_y_axis) {
        var i = Math.floor(t),
          o = Math.ceil(t),
          a = Fu.timeslices[i].min_score,
          s = Fu.timeslices[i].max_score;
        n = a + (Fu.timeslices[o].min_score - a) * (t - i);
        var l = (r = s + (Fu.timeslices[o].max_score - s) * (t - i)) - n,
          u = d.zoom_y_padding / 100;
        n -= l * u, r += l * u
      } else r = d.zoom_y_axis ? (n = vn(_.horserace, function (t) {
        return null !== d.filter && d.filter != d.filter_all_label && d.filter != t.filter ? null : vn(t
          .stages,
          function (t) {
            return Ri(t)
          })
      }), mn(_.horserace, function (t) {
        return null !== d.filter && d.filter != d.filter_all_label && d.filter != t.filter ? null : mn(t
          .stages,
          function (t) {
            return Ri(t)
          })
      })) : (n = vn(_.horserace, function (t) {
        return vn(t.stages, function (t) {
          return Ri(t)
        })
      }), mn(_.horserace, function (t) {
        return mn(t.stages, function (t) {
          return Ri(t)
        })
      }));
      "" !== d.y_axis_min && null !== d.y_axis_min && (n = d.y_axis_min), "" !== d.y_axis_max && null !== d
        .y_axis_max && (r = d.y_axis_max), e = d.higher_scores_win ? [n, r] : [r, n]
    }
    pl.domain(e)
  }
  var bl = Array.prototype.slice;

  function wl(t) {
    return t
  }
  var kl = 1,
    Ml = 2,
    Tl = 3,
    zl = 4,
    Cl = 1e-6;

  function Nl(t) {
    return "translate(" + (t + .5) + ",0)"
  }

  function Al(t) {
    return "translate(0," + (t + .5) + ")"
  }

  function Sl() {
    return !this.__axis
  }

  function El(p, g) {
    var y = [],
      m = null,
      v = null,
      x = 6,
      b = 6,
      w = 3,
      k = p === kl || p === zl ? -1 : 1,
      M = p === zl || p === Ml ? "x" : "y",
      T = p === kl || p === Tl ? Nl : Al;

    function e(t) {
      var e = null == m ? g.ticks ? g.ticks.apply(g, y) : g.domain() : m,
        n = null == v ? g.tickFormat ? g.tickFormat.apply(g, y) : wl : v,
        r = Math.max(x, 0) + w,
        i = g.range(),
        o = +i[0] + .5,
        a = +i[i.length - 1] + .5,
        s = (g.bandwidth ? function (e) {
          var n = Math.max(0, e.bandwidth() - 1) / 2;
          return e.round() && (n = Math.round(n)),
            function (t) {
              return +e(t) + n
            }
        } : function (e) {
          return function (t) {
            return +e(t)
          }
        })(g.copy()),
        l = t.selection ? t.selection() : t,
        u = l.selectAll(".domain").data([null]),
        c = l.selectAll(".tick").data(e, g).order(),
        h = c.exit(),
        f = c.enter().append("g").attr("class", "tick"),
        _ = c.select("line"),
        d = c.select("text");
      u = u.merge(u.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), c = c
        .merge(f), _ = _.merge(f.append("line").attr("stroke", "currentColor").attr(M + "2", k * x)), d = d.merge(
          f.append("text").attr("fill", "currentColor").attr(M, k * r).attr("dy", p === kl ? "0em" : p === Tl ?
            "0.71em" : "0.32em")), t !== l && (u = u.transition(t), c = c.transition(t), _ = _.transition(t), d =
              d.transition(t), h = h.transition(t).attr("opacity", Cl).attr("transform", function (t) {
                return isFinite(t = s(t)) ? T(t) : this.getAttribute("transform")
              }), f.attr("opacity", Cl).attr("transform", function (t) {
                var e = this.parentNode.__axis;
                return T(e && isFinite(e = e(t)) ? e : s(t))
              })), h.remove(), u.attr("d", p === zl || p == Ml ? b ? "M" + k * b + "," + o + "H0.5V" + a + "H" + k *
                b : "M0.5," + o + "V" + a : b ? "M" + o + "," + k * b + "V0.5H" + a + "V" + k * b : "M" + o + ",0.5H" +
                  a), c.attr("opacity", 1).attr("transform", function (t) {
                    return T(s(t))
                  }), _.attr(M + "2", k * x), d.attr(M, k * r).text(n), l.filter(Sl).attr("fill", "none").attr("font-size",
                    10).attr("font-family", "sans-serif").attr("text-anchor", p === Ml ? "start" : p === zl ? "end" :
                      "middle"), l.each(function () {
                        this.__axis = s
                      })
    }
    return e.scale = function (t) {
      return arguments.length ? (g = t, e) : g
    }, e.ticks = function () {
      return y = bl.call(arguments), e
    }, e.tickArguments = function (t) {
      return arguments.length ? (y = null == t ? [] : bl.call(t), e) : y.slice()
    }, e.tickValues = function (t) {
      return arguments.length ? (m = null == t ? null : bl.call(t), e) : m && m.slice()
    }, e.tickFormat = function (t) {
      return arguments.length ? (v = t, e) : v
    }, e.tickSize = function (t) {
      return arguments.length ? (x = b = +t, e) : x
    }, e.tickSizeInner = function (t) {
      return arguments.length ? (x = +t, e) : x
    }, e.tickSizeOuter = function (t) {
      return arguments.length ? (b = +t, e) : b
    }, e.tickPadding = function (t) {
      return arguments.length ? (w = +t, e) : w
    }, e
  }
  var Fl = vi(d.y_axis_format);

  function Ll(t) {
    var n, e = _.horserace.column_names.stages.reduce(function (t, e, n) {
      return e && t.push(n), t
    }, []),
      r = function (t) {
        return El(kl, t)
      }(t).tickValues(e).tickFormat(function (t) {
        return _.horserace.column_names.stages[t]
      }),
      i = cl / 2,
      o = -d.x_axis_rotate,
      a = il(d.x_axis_label_size),
      s = 1.5 * a;
    "90" == d.x_axis_rotate ? s = a : "0" == d.x_axis_rotate && (s = 6 * a), B(".x.axis").attr("transform",
      "translate(0, -" + hl + ")").call(r).selectAll(".tick").select("text").style("text-anchor", "0" == o ?
        "middle" : "start").style("font-size", a + "px").style("fill", d.x_axis_label_color).attr(
          "data-tick-index",
          function (t) {
            return t
          }).attr("dx", function () {
            return "0" == d.x_axis_rotate ? 0 : "90" == d.x_axis_rotate ? i : .68 * i + 2
          }).attr("dy", function () {
            return "0" == d.x_axis_rotate ? -i : "90" == d.x_axis_rotate ? "0.25em" : .68 * -i - 2
          }).attr("y", 0).attr("transform", "rotate(" + o + ")").attr("opacity", function () {
            var t = this.getBoundingClientRect().left,
              e = n && t < n;
            return n = e ? n : t + s, e ? 0 : 1
          })
  }

  function Pl(t, e, n) {
    var r = Ii.getFormatterFunction(),
      i = Fl(r),
      o = function (t) {
        return El(zl, t)
      }(t).tickSize(-e).tickFormat(function (t) {
        return "ranks" == d.value_type ? t % 1 == 0 ? t : "" : i(t)
      }).tickPadding(5);
    "ranks" == d.value_type && o.ticks(Math.min(_.horserace.length, d.y_axis_max_rank || 1 / 0)), B(".y.axis")
      .transition().duration(n).call(o), X(".y.axis text").attr("dx", -sl).style("font-size", il(d
        .y_axis_label_size) + "px").style("fill", d.y_axis_label_colors), B(".y.axis path").style("opacity", 0),
      B(".y.axis .y-axis-edge").attr("stroke", "red").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", _l), X(
        ".y.axis line").style("stroke", d.y_axis_stroke_color).style("stroke-dasharray", d.y_axis_stroke_dash ? d
          .y_axis_stroke_dash + "," + d.y_axis_stroke_dash : null)
  }

  function Dl(t, e, n, r) {
    Ll(t), Pl(e, n, r)
  }
  var Hl = 0;

  function Ol() {
    var n = {},
      r = tc();
    for (var t in X(".labels-group").each(function (t) {
      var e = t.ranks[r];
      null != e && (e in n ? n[e].push(this) : n[e] = [this])
    }), n) {
      var e = n[t].sort(function (t, e) {
        return ln(t.__data__.index, e.__data__.index)
      });
      if (1 < e.length)
        for (var i = 0; i < e.length; i++) {
          var o = .5 * (ol + al) * (i - .5);
          B(e[i]).select(".end-circle-container").attr("transform", "translate(" + o + ",0)"), B(e[i]).classed(
            "tied", !0), B(e[i]).selectAll(".name-bg, .name-fg").attr("x", function () {
              return !Lu || d.zoom_enabled ? e.length * (.5 * (ol + al)) + ol / 2 : -(ol + al)
            })
        }
    }
  }

  function Ul() {
    d.target_position = 0, Hl = 0, d.target_position = _.horserace.column_names.stages.length, Bl()
  }
  var Rl, Yl, ql = null;

  function jl(t) {
    var e, n = tc();
    if (!Rl) return Rl = t, ql = requestAnimationFrame(jl), void (Yl = Hl < n);
    (e = Yl ? n < (Hl += (t - Rl) / d.stage_duration) : (Hl -= (t - Rl) / d.stage_duration) < n) && (Hl = n), d
      .zoom_enabled && (vl(Hl), xl(Hl));
    var r = Hl - Math.floor(Hl),
      i = e ? null : Yl ? "ahead" : "behind",
      o = d.zoom_enabled ? 0 : Math.max(sl, ll / 2, ul / 2) + il(d.margin_left);
    if (B("#clip rect").attr("width", dl(Hl) + o).attr("x", -o), Ou.interrupt().attr("transform", Wu).selectAll(
      ".rank-number").text(function (t) {
        return d.rank_outside_picture ? "" : Xu(t, i, r)
      }), Ou.selectAll(".name-rank").text(function (t) {
        return d.rank_outside_picture ? Xu(t, i, r) : ""
      }).each(function () {
        B(this.parentNode).attr("x", function () {
          return !Lu || d.zoom_enabled ? ol + al / 2 + 4 : -ol - al / 2 - 4
        })
      }), d.zoom_enabled) {
      $u(), Bu(0), Iu(0);
      var a = Math.min(dl(_.horserace.column_names.stages.length - 1), fl);
      Dl(dl, pl, a, 0)
    }
    e ? (ql = null, Ol()) : (ql = requestAnimationFrame(jl), Rl = t)
  }

  function Bl() {
    Rl = null, ql && cancelAnimationFrame(ql), ql = requestAnimationFrame(jl)
  }
  var Il =
    ".controls-container {\tdisplay: inline-block;}.controls-container, .controls-container * {\tbox-sizing: border-box;\ttext-align: left;\tvertical-align: bottom;}.button-container .button, .dropdown .current {\toverflow: hidden;\ttext-overflow: ellipsis;\theight: 100%;\twhite-space: nowrap;\ttext-align: left;\tfont-size: 12px;\tline-height: 21px;}.button-container .button, .dropdown .current, .dropdown .list .list-item {\twhite-space: nowrap;}.slider, .slider-play {\tpointer-events: all;\tvertical-align: bottom}.button {\tdisplay: inline-block;\tcursor: pointer}.button:hover {\topacity: .5}.button.selected, .button.selected:hover {\tcolor: #fff;\tcursor: default;\topacity: 1;\tbackground-image: linear-gradient(transparent, rgba(0, 0, 0, .05) 40%, rgba(0, 0, 0, .1))}.button-container {\tpointer-events: all;\twidth: auto;\tline-height: 0;\tmargin-bottom: 18px;\twidth: 100%;\ttext-align: center;}.button-container.button-group {\tdisplay: table;\tborder: 1px solid #ccc;\twidth: 100%;\ttable-layout: fixed;\tborder-radius: 3px;\tmargin-bottom: 20px;\toverflow: hidden;}.button-container .button {\tfont-size: 12px;\tborder: 1px solid #ccc;\tbackground: #fff;\tpadding: 0.1em 0.6em 0;\tcolor: #333;\tfont-weight: 400;\ttext-align: center;\theight: 24px;\tborder-radius: 3px;\tmargin: 0 1px 2px;}.button-container.button-group .button {\tborder: none;\tborder-left: 1px solid #ccc;\tborder-radius: 0;\tdisplay: table-cell;\ttext-align: center;\tvertical-align: middle;\tmargin: 0;\theight: 22px;}.button-container .button:hover {\tbackground: #eee;\topacity: .8}.button-container.button-group .button:first-child {\tborder: none}.button-container .button.selected, .button-container .button.selected:hover {\topacity: 1;\tbackground: #ececec;\tcolor: #333}.dropdown {\tpointer-events: all;\tdisplay: inline-table;\tcolor: #333;\tfont-weight: 400;\tfont-size: 16px;\tposition: relative}.dropdown .heading {\tmargin-bottom: .4em;\tfont-weight: 300}.dropdown .main {\tbackground: #fff;\tpadding: 0 20px 0 6px;\tcursor: pointer;\tposition: relative;\tborder: 1px solid #ccc;\tborder-radius: 3px;\theight: 24px;\tline-height: 26px}.dropdown .list, .dropdown .symbol {\tposition: absolute}.dropdown .current {\theight: 100%;\twidth: 100%;\tdisplay: inline-block;\tvertical-align: top;\tpadding: 0.1em 0 0;}.dropdown .symbol {\twidth: 30px;\theight: 100%;\tright: 0;\ttop: 0;\tbackground: 80% 40% no-repeat;\tbackground-size: auto 50%;\tdisplay: inline-block}.dropdown .list {\ttop: 100%;\tleft: 2px;\tmin-width: calc(100% - 4px);\tbackground: rgba(255, 255, 255, 1);\tpadding: 0 2px;\ttext-align: left;\tdisplay: none;\tline-height: 1.4em;\tmax-height: 160px;\toverflow-y: scroll;\tcolor: #333;\tbox-shadow: 0 1px 2px rgba(0, 0, 0, .2)}.dropdown .list .list-item {\tfont-size: 12px;\theight: 24px;\tpadding: 0 5px}.dropdown .list .list-item:hover {\tcursor: pointer;\tbackground: #eee}.dropdown.open .list {\tdisplay: block;\tz-index: 1}.dropdown .list .list-item.selected, .dropdown .list .list-item.selected:hover {\tcolor: #57c1fc;\tcursor: default;\topacity: 1}.dropdown .list .list-item.header, .dropdown .list .list-item.header:hover {\tfont-size: .66em;\tletter-spacing: 1px;\ttext-transform: uppercase;\tcolor: #888;\topacity: 1;\tcursor: default;\tfont-weight: 300;\tmargin-top: .5em}.dropdown .list .list-item.header:first-child {\tmargin-top: 0}.controls-container .dropdown {\tmargin: 0 0 20px;}.controls-container .dropdown .heading {\tcolor: #333}.slider-holder {\tmargin-bottom: 20px}.slider-play {\twidth: 24px;\theight: 24px;\tbackground-repeat: no-repeat;\tbackground-size: 100% 100%;\tbackground-position: center;\tcursor: pointer;\tdisplay: none;\tmargin-right: 2px}.slider, .slider-holder.animatable .slider-play {\tdisplay: inline-block}.slider-play:hover {\topacity: .7}.slider {\theight: 46px;\twidth: 100%;\tbottom: 0}.slider-holder.animatable .slider {\twidth: calc(100% - 37px)}.slider-holder.playing .slider {\tpointer-events: none}.slider .tick line {\tstroke: #333}.slider text {\tfill: #333}.slider .slider-end-labels {\tfont-size: 11px;\tfill: #9e9e9e}@media(min-width:520px) {\t.dropdown .main {\t\theight: 30px;\t}\t.slider-play {\t\twidth: 30px;\t\theight: 30px\t}\t.button-container .button, .dropdown .current {\t\tfont-size: 14px;\t\tline-height: 26px;\t\theight: 30px;\t}\t.button-container.button-group .button {\t\theight: 28px;\t}\t.dropdown .list .list-item {\t\theight: 30px;\t\tfont-size: 14px;\t\tline-height: 27px;\t}}";

  function Xl(t) {
    return "url('data:image/svg+xml;base64," + window.btoa(t) + "')"
  }
  var Vl = !1;
  var Wl = Object.freeze(["auto-buttons", "grouped-buttons", "floating-buttons", "dropdown", "slider", "none"]);

  function $l(t) {
    ! function (t) {
      if (!Vl && "undefined" != typeof document) {
        var e = document.head || document.getElementsByTagName("head")[0],
          n = document.createElement("style");
        n.type = "text/css", e.appendChild(n), n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document
          .createTextNode(t)), Vl = !0
      }
    }(Il);
    var n = {},
      r = {
        slider_step_time: 2,
        slider_loop: !0,
        slider_loop_pause: 0,
        slider_play_button: !0,
        slider_handle_colour: "#333",
        slider_label: !0,
        dropdown_icon_colour: "#333333"
      };
    Object.keys(r).forEach(function (e) {
      var t = e.replace(/_\w/g, function (t) {
        return t.charAt(1).toUpperCase()
      });
      n[t] = function (t) {
        return void 0 === t ? r[e] : (r[e] = t, n)
      }
    }), r.type = "auto_buttons", n.type = function (t) {
      return void 0 === t ? r.type : (r.type = -1 !== Wl.indexOf(t) ? t : "auto-buttons", n)
    }, Object.defineProperty(r, "control", {
      get: function () {
        var t = r.type;
        return "dropdown" === t || "slider" === t || "none" === t ? r.type : "buttons"
      },
      set: function () {
        console.warn("Nothing changed: control is read only")
      }
    }), Object.defineProperty(r, "buttons_type", {
      get: function () {
        if ("buttons" === r.control) return "auto-buttons" === r.type ? "auto" : "grouped-buttons" === r
          .type ? "grouped" : "floating"
      },
      set: function () {
        console.warn("Nothing changed: button_type is read only")
      }
    }), r.index = 0, n.index = function (t) {
      if (void 0 === t) return r.n_options ? r.index : null;
      if (null !== t) {
        if (! function (t) {
          return "number" == typeof t && isFinite(t)
        }(t)) throw TypeError("index must be a number greater than or equal to 0.");
        if (t < 0) throw RangeError("index must be greater than or equal to 0.");
        r.index = Math.floor(t)
      }
      return n
    }, r.options = [], Object.defineProperty(r, "n_options", {
      get: function () {
        return r.options.length
      },
      set: function () {
        console.warn("Nothing changed: n_options is read only")
      }
    }), n.options = function (t) {
      if (void 0 === t) return r.options.slice();
      if (!Array.isArray(t)) throw TypeError("opts must be an array.");
      return r.options = Object.freeze(t.slice()), n
    }, Object.defineProperty(r, "value", {
      get: function () {
        return r.n_options ? r.options[r.index] : null
      },
      set: function () {
        console.warn("Nothing changed: value is read only")
      }
    }), n.value = function (t) {
      if (void 0 === t) return r.value;
      if (null !== t) {
        var e = r.options.indexOf(t); - 1 !== e ? r.index = e : console.warn(
          "Nothing changed: value not in options list")
      }
      return n
    }, Object.defineProperty(r, "width", {
      get: function () {
        return o.getBoundingClientRect().width + "px"
      },
      set: function () {
        console.warn("Nothing changed: width is read only")
      }
    }), r.changeHandlers = [], n.on = function (t, e) {
      return "change" === t && r.changeHandlers.push(e.bind(n)), n
    };
    Object.seal(r);
    var e, i = B(t);
    e = !i.classed("controls-container") && (i.classed("controls-container", !0), !0);
    var o = i.node();
    return n.container = i, {
      output_obj: n,
      props: r,
      onChangeCallbacks: function () {
        var e = r.value,
          n = r.index;
        r.changeHandlers.forEach(function (t) {
          t(e, n)
        })
      },
      container: i,
      container_node: o,
      container_selector: t,
      added_class: e
    }
  }

  function Zl(t) {
    function r() {
      o.classed("open", !1)
    }
    var e = t.container,
      n = t.props,
      i = t.onChangeCallbacks,
      o = e.append("div").attr("class", "dropdown"),
      a = o.append("div").attr("class", "main"),
      s = a.append("span").attr("class", "current"),
      l = a.append("span").attr("class", "symbol"),
      u = o.append("div").attr("class", "list"),
      c = o.node();
    document.querySelector("body").addEventListener("click", function (t) {
      if (o.classed("open")) {
        for (var e = t.target, n = e.parentElement; n;) {
          if (e === c) return;
          n = (e = n).parentElement
        }
        r()
      }
    }, !1), a.on("click", function () {
      o.classed("open", !o.classed("open"))
    });
    var h, f = function () {
      h !== n.dropdown_icon_colour && (h = n.dropdown_icon_colour, l.style("background-image", function (t) {
        return Xl(
          '<svg width="6px" height="12px" viewBox="0 0 6 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g transform="translate(-442.000000, -44.000000)" fill="' +
          t +
          '"> <g id="Group" transform="translate(442.000000, 44.000000)"> <polygon id="Triangle-2" points="3 0 6 5 0 5"></polygon> <polygon id="Triangle-2-Copy" points="3 12 0 7 6 7"></polygon> </g> </g> </svg>'
        )
      }(h)))
    },
      _ = {
        handle: o
      };
    return _.show = function () {
      return f(), o.style("width", n.width).style("display", "inline-table"), o.select(".main").style("width", n
        .width), _
    }, _.hide = function () {
      return r(), o.style("display", "none"), _
    }, _.setValue = function () {
      return s.text(n.value).attr("title", n.value), _
    }, _.setOptions = function () {
      return u.text("").selectAll(".list-item").data(n.options).enter().append("div").attr("class", "list-item")
        .text(function (t) {
          return t
        }).on("click", function (t, e) {
          r(), B(this).classed("selected") || (n.index = e, i())
        }), _
    }, _.remove = function () {
      return o.remove(), _
    }, _
  }

  function Ql(t, e) {
    var n, r, i = t.container,
      o = t.props,
      a = t.onChangeCallbacks,
      s = i.append("div").attr("class", "button-container"),
      l = function () {
        s.style("display", "none")
      },
      u = {
        handle: s
      };
    return u.show = function () {
      return "floating" === o.buttons_type ? s.style("width", null).style("display", "inline-block").classed(
        "button-group", !1) : (s.style("width", o.width).style("display", "table").classed("button-group", !
          0), "auto" === o.buttons_type && (r.every(function (t) {
            return t.offsetWidth >= t.scrollWidth
          }) || (l(), e.show()))), u
    }, u.hide = function () {
      return l(), u
    }, u.setValue = function () {
      return n && n.each(function (t, e) {
        B(this).classed("selected", e === o.index)
      }), u
    }, u.setOptions = function () {
      return n = s.text("").selectAll(".button").data(o.options).enter().append("div").attr("class", "button")
        .classed("selected", function (t, e) {
          return e === o.index
        }).text(function (t) {
          return t
        }).attr("title", function (t) {
          return t
        }).on("click", function (t, e) {
          e !== o.index && (o.index = e, a())
        }), r = n.nodes(), u
    }, u.remove = function () {
      return s.remove(), u
    }, u
  }
  var Jl = Array.prototype,
    Gl = Jl.map,
    Kl = Jl.slice;

  function tu(t) {
    return +t
  }
  var eu = [0, 1];

  function nu(e, n) {
    return (n -= e = +e) ? function (t) {
      return (t - e) / n
    } : function (t) {
      return function () {
        return t
      }
    }(n)
  }

  function ru(t, e, n, r) {
    var i = t[0],
      o = t[1],
      a = e[0],
      s = e[1];
    return a = o < i ? (i = n(o, i), r(s, a)) : (i = n(i, o), r(a, s)),
      function (t) {
        return a(i(t))
      }
  }

  function iu(n, t, e, r) {
    var i = Math.min(n.length, t.length) - 1,
      o = new Array(i),
      a = new Array(i),
      s = -1;
    for (n[i] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++s < i;) o[s] = e(n[s], n[s + 1]), a[
      s] = r(t[s], t[s + 1]);
    return function (t) {
      var e = hn(n, t, 1, i) - 1;
      return a[e](o[e](t))
    }
  }

  function ou(s) {
    var l = s.domain;
    return s.ticks = function (t) {
      var e = l();
      return pn(e[0], e[e.length - 1], null == t ? 10 : t)
    }, s.tickFormat = function (t, e) {
      return function (t, e, n) {
        var r, i = t[0],
          o = t[t.length - 1],
          a = yn(i, o, null == e ? 10 : e);
        switch ((n = Mi(null == n ? ",f" : n)).type) {
          case "s":
            var s = Math.max(Math.abs(i), Math.abs(o));
            return null != n.precision || isNaN(r = Hi(a, s)) || (n.precision = r), Ei(n, s);
          case "":
          case "e":
          case "g":
          case "p":
          case "r":
            null != n.precision || isNaN(r = Oi(a, Math.max(Math.abs(i), Math.abs(o)))) || (n.precision = r -
              ("e" === n.type));
            break;
          case "f":
          case "%":
            null != n.precision || isNaN(r = Di(a)) || (n.precision = r - 2 * ("%" === n.type))
        }
        return Si(n)
      }(l(), t, e)
    }, s.nice = function (t) {
      null == t && (t = 10);
      var e, n = l(),
        r = 0,
        i = n.length - 1,
        o = n[r],
        a = n[i];
      return a < o && (e = o, o = a, a = e, e = r, r = i, i = e), 0 < (e = gn(o, a, t)) ? e = gn(o = Math.floor(
        o / e) * e, a = Math.ceil(a / e) * e, t) : e < 0 && (e = gn(o = Math.ceil(o * e) / e, a = Math.floor(
          a * e) / e, t)), 0 < e ? (n[r] = Math.floor(o / e) * e, n[i] = Math.ceil(a / e) * e, l(n)) : e < 0 &&
            (n[r] = Math.ceil(o * e) / e, n[i] = Math.floor(a * e) / e, l(n)), s
    }, s
  }

  function au() {
    var t = function (e, n) {
      var r, i, o, a = eu,
        s = eu,
        l = Re,
        u = !1;

      function c() {
        return r = 2 < Math.min(a.length, s.length) ? iu : ru, i = o = null, t
      }

      function t(t) {
        return (i = i || r(a, s, u ? function (t) {
          return function (e, n) {
            var r = t(e = +e, n = +n);
            return function (t) {
              return t <= e ? 0 : n <= t ? 1 : r(t)
            }
          }
        }(e) : e, l))(+t)
      }
      return t.invert = function (t) {
        return (o = o || r(s, a, nu, u ? function (t) {
          return function (e, n) {
            var r = t(e = +e, n = +n);
            return function (t) {
              return t <= 0 ? e : 1 <= t ? n : r(t)
            }
          }
        }(n) : n))(+t)
      }, t.domain = function (t) {
        return arguments.length ? (a = Gl.call(t, tu), c()) : a.slice()
      }, t.range = function (t) {
        return arguments.length ? (s = Kl.call(t), c()) : s.slice()
      }, t.rangeRound = function (t) {
        return s = Kl.call(t), l = Ye, c()
      }, t.clamp = function (t) {
        return arguments.length ? (u = !!t, c()) : u
      }, t.interpolate = function (t) {
        return arguments.length ? (l = t, c()) : l
      }, c()
    }(nu, De);
    return t.copy = function () {
      return function (t, e) {
        return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp())
      }(t, au())
    }, ou(t)
  }

  function su(t) {
    this.container = B(t), this._width = null, this._height = null, this._handleRadius = 15, this._channelHeight =
      5, this._channelRadius = null, this._handleFill = "black", this._channelFill = "#eee", this._margin = {
        top: null,
        left: null,
        right: null
      }, this._domain = [0, 1], this._value = null, this._snap = !1, this._scale = null, this._axis = !1, this
        ._ticks = null, this._tickFormat = null, this._tickSize = null, this._label = null, this._labelSize = 18,
      this._startLabel = null, this._startLabelBelow = !1, this._endLabel = null, this._endLabelBelow = !1, this
        ._startEndLabelSize = 16, this.handlers = {
          change: []
        }
  }

  function lu(e) {
    0 < e.length && "_" == e.charAt(0) && (su.prototype[e.substr(1)] = function (t) {
      return void 0 === t ? this[e] : (this[e] = t, this)
    })
  }
  var uu, cu, hu, fu, _u, du, pu, gu, yu, mu, vu, xu = new su;
  for (var bu in xu) lu(bu);

  function wu(t, e) {
    return "boolean" == typeof t ? t ? Math.round(e) : e : function t(e, n, r, i) {
      if (void 0 === r && (r = 0), void 0 === i && (i = e.length), i - r == 0) return n;
      if (i - r == 1) return e[r];
      if (i - r == 2) return Math.abs(e[r] - n) <= Math.abs(e[r + 1] - n) ? e[r] : e[r + 1];
      var o = r + Math.floor((i - r) / 2),
        a = e[o],
        s = e[o - 1];
      return s <= n && n <= a ? Math.abs(s - n) <= Math.abs(a - n) ? s : a : a <= n ? t(e, n, o, i) : t(e, n, r,
        o)
    }(t, e)
  }

  function ku(t) {
    return new su(t)
  }

  function Mu(t) {
    var e, i, n = t.container,
      o = t.props,
      a = t.onChangeCallbacks,
      r = t.container_selector,
      s = n.append("div").attr("class", "slider-holder animatable"),
      l = s.append("div").attr("class", "slider-play");
    s.append("div").attr("class", "slider");

    function u() {
      c && (clearInterval(c), c = void 0, s.classed("playing", !1), l.style("background-image", e))
    }
    var c, h = ku(r + " .slider-holder .slider").channelHeight(6).snap(!0).on("change", function (t) {
      t !== o.index && (o.index = t, a())
    }),
      f = function (n) {
        if (0 !== n || o.slider_loop) {
          var t = 1e3 * (Math.abs(o.slider_step_time) + (n ? 0 : o.slider_loop_pause));
          c = setTimeout(function () {
            var t = o.n_options,
              e = 0 <= o.slider_step_time ? n : t - (1 + n);
            h.value(e).update(), o.index = e, a(), f((n + 1) % t)
          }, t)
        } else u()
      };
    l.on("click", function () {
      s.classed("playing") ? u() : o.slider_play_button && function () {
        var t = o.n_options;
        if (!(t < 2)) {
          var e = t - 1,
            n = o.index,
            r = o.slider_step_time;
          s.classed("playing", !0), l.style("background-image", i), 0 < r && n === e ? (n = 0, h.value(n)
            .update(), o.index = n, a()) : r < 0 && 0 === n && (n = e, h.value(n).update(), o.index = n,
              a()), f((0 < r ? n : t - (1 + n)) + 1)
        }
      }()
    });

    function _() {
      ! function () {
        s.style("width", o.width);
        var t = window.innerWidth,
          e = t < 520 ? 12 : 15;
        h.labelSize(t < 520 ? 12 : 14).handleRadius(e).margin({
          left: 5 + e,
          right: e,
          top: t < 520 ? 33 : 31
        })
      }(), p(),
        function () {
          var t;
          t = !0 === o.slider_label ? o.value : "string" == typeof o.slider_label ? o.slider_label : null, h
            .label(t)
        }()
    }
    var d, p = function () {
      o.slider_play_button ? (s.classed("animatable", !0), l.style("transform", o.slider_step_time < 0 ?
        "rotate(180deg)" : null)) : (u(), s.classed("animatable", !1)), d !== o.slider_handle_colour && (h
          .update(), d = o.slider_handle_colour, s.select(".slider-handle").style("fill", d), e = function (t) {
            return Xl(
              '<svg width="25px" height="30px" viewBox="0 0 25 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <polygon id="Triangle" fill="' +
              t + '" stroke="none" points="25 15 0 30 0 0"></polygon> </svg>')
          }(d), i = function (t) {
            return Xl(
              '<svg width="26px" height="30px" viewBox="0 0 26 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g stroke="none" stroke-width="1" fill="' +
              t +
              '"><rect x="2" y="2" width="9" height="26"></rect> <rect x="15" y="2" width="9" height="26"></rect> </g> </svg>'
            )
          }(d), l.style("background-image", c ? i : e))
    },
      g = {
        handle: s
      };
    return g.show = function () {
      return s.style("display", "inline-block"), _(), h.update(), g
    }, g.hide = function () {
      return u(), s.style("display", "none"), g
    }, g.setValue = function () {
      return h.value(o.index), g
    }, g.setOptions = function () {
      return h.domain([0, o.n_options - 1]).update(), g
    }, g.remove = function () {
      return s.remove(), g
    }, g
  }

  function Tu(t) {
    function e(t) {
      "none" === t ? u.style("display", "none") : u.style("display", null), "dropdown" === t ? c.show() : c
        .hide(), "slider" === t ? f.show() : f.hide(), "buttons" === t ? h.show() : h.hide()
    }

    function n() {
      var t = _();
      if (l.n_options < 2) return l.index = 0, void e("none");
      (d() || t) && (t && (c.setOptions(), h.setOptions(), f.setOptions()), c.setValue(), h.setValue(), f
        .setValue()), e(l.control)
    }
    var r, i, o, a = $l(t),
      s = a.output_obj,
      l = a.props,
      u = a.container,
      c = Zl(a),
      h = Ql(a, c),
      f = Mu(a),
      _ = (r = [], function () {
        var t = l.options,
          e = t.length;
        if (!(e < 2)) return !(r && t.length === r.length && t.every(function (t, e) {
          return t === r[e]
        }) || (r = Object.freeze(t.slice()), l.index > e - 1 && (l.index = e - 1), 0))
      }),
      d = function () {
        if (i === l.index && o === l.value) return !1;
        var t = l.n_options;
        return l.index > t - 1 && (l.index = t - 1), i = l.index, o = l.value, !0
      };
    return window.addEventListener("resize", n), s.update = function () {
      return n(), this
    }, s.remove = function () {
      return c.remove(), h.remove(), f.remove(), a.added_class && u.classed("controls-container", !1), window
        .removeEventListener("resize", n), this
    }, s
  }

  function zu() {
    ! function () {
      var t = hu.getBoundingClientRect().width,
        e = fu.getBoundingClientRect().width;
      cu.style("width", Math.min(d.filter_width, t - e) + "px"), cu.node().getBoundingClientRect().width + e >
        t && cu.style("width", Math.min(d.filter_width, t) + "px")
    }();
    var t = function () {
      if (void 0 === _.horserace.column_names.filter) return null;
      var t = Yo(_.horserace, function (t) {
        return t.filter
      }),
        e = [];
      return t.each(function (t) {
        e.push(t)
      }), e.length && d.filter_include_all && e.unshift(d.filter_all_label), e
    }();
    t ? uu.options(t).value(d.filter).type(d.filter_control_type).update() : uu.options([]).update(), d.filter =
      uu.value()
  }
  su.prototype.margin = function (t) {
    if (!t) return this._margin;
    for (bu in t) {
      if (!(bu in this._margin)) throw "Slider.margin: unrecognised option " + bu;
      this._margin[bu] = t[bu]
    }
    return this
  }, su.prototype.on = function (t, e) {
    if (!(t in this.handlers)) throw "Slider.on: No such event: " + t;
    return this.handlers[t].push(e), this
  }, su.prototype.fire = function (t, e) {
    if (!(t in this.handlers)) throw "Slider.fire: No such event: " + t;
    for (var n = this.handlers[t], r = 0; r < n.length; r++) n[r].call(this, e);
    return this
  }, su.prototype.update = su.prototype.draw = function () {
    var i = this,
      t = this._width,
      e = this._height,
      n = this.container.node();
    if (!t) {
      var r = n.getBoundingClientRect();
      if (!r || 0 == r.width) return this;
      t = r.width, e = r.height
    }
    var o, a = null == this._channelRadius ? this._channelHeight / 2 : this._channelRadius,
      s = null == this._margin.left ? Math.max(this._handleRadius, a) : this._margin.left,
      l = null == this._margin.right ? Math.max(this._handleRadius, a) : this._margin.right,
      u = null == this._margin.top ? Math.max(this._handleRadius, this._channelHeight / 2) : this._margin.top,
      c = t - s - l,
      h = c + 2 * a,
      f = 1.5 * this._labelSize;
    null != this._label && null == this._margin.top && (u += f), "http://www.w3.org/2000/svg" == n
      .namespaceURI ? o = this.container : ((o = this.container.selectAll("svg").data([{
        width: t,
        height: e
      }])).exit().remove(), (o = o.enter().append("svg").merge(o)).attr("width", function (t) {
        return t.width
      }).attr("height", function (t) {
        return t.height
      }));
    var _ = o.selectAll("g.slider-container").data([{
      left: s,
      top: u,
      id: this._id
    }]);
    _.exit().remove(), (_ = _.enter().append("g").attr("class", "slider-container").merge(_)).attr("transform",
      function (t) {
        return "translate(" + t.left + "," + t.top + ")"
      }).attr("id", function (t) {
        return t.id
      }), this.scale = (this._scale ? this._scale() : au()).domain(this._domain).range([0, c]), null == this
        ._value || this._value < this._domain[0] ? this._value = this._domain[0] : this._value > this._domain[
        1] && (this._value = this._domain[1]), this._snap && (this._value = wu(this._snap, this._value));
    var d, p = [];
    this._axis && (d = "boolean" != typeof this._axis ? this._axis(this.scale) : function (t) {
      return El(Tl, t)
    }().scale(this.scale).tickPadding(6), this._ticks && d.ticks(this._ticks), this._tickFormat && d
      .tickFormat(this._tickFormat), this._tickSize ? d.tickSize(this._tickSize) : d.tickSize(Math.max(5, this
        ._handleRadius - this._channelHeight - 2)), p.push(d));
    var g, y, m, v, x = _.selectAll(".slider-axis").data(p).enter();

    function b() {
      document.removeEventListener("mouseup", b, !1), document.removeEventListener("mousemove", w, !1)
    }

    function w(t) {
      T(t.clientX - m)
    }

    function k() {
      document.removeEventListener("touchend", k, !1), document.removeEventListener("touchmove", M, !1)
    }

    function M(t) {
      1 == t.touches.length && T(t.touches[0].clientX - m)
    }

    function T(t) {
      var e = v + t,
        n = Math.max(0, Math.min(c, e)),
        r = i.scale.invert(n);
      i._snap && (r = wu(i._snap, r)), y.attr("cx", i.scale(r)), r != i._value && (i._value = r, i.fire(
        "change", i._value))
    }
    x.append("g").attr("class", "slider-axis").attr("transform", "translate(0," + this._channelHeight / 2 + ")")
      .each(function (t) {
        t(B(this))
      }), x.select(".domain").attr("fill", "none"), x.selectAll(".tick line").attr("stroke", "black"), x.exit()
        .remove(), (g = _.selectAll(".slider-channel").data([{
          width: h,
          height: this._channelHeight,
          channel_r: a
        }])).exit().remove(), (g = g.enter().append("rect").attr("class", "slider-channel").attr("cursor",
          "pointer").on("click", function () {
            var t = Math.max(0, Math.min(c, I(this)[0]));
            i._value = i.scale.invert(t), i._snap && (i._value = wu(i._snap, i._value)), y.attr("cx", i.scale(i
              ._value)), i.fire("change", i._value)
          }).merge(g)).attr("width", function (t) {
            return t.width
          }).attr("fill", this._channelFill).attr("height", function (t) {
            return t.height
          }).attr("y", function (t) {
            return -t.height / 2
          }).attr("x", function (t) {
            return -t.channel_r
          }).attr("rx", function (t) {
            return t.channel_r
          }), (y = (y = _.selectAll(".slider-handle").data([{
            v: this._value,
            x: this.scale(this._value)
          }])).enter().append("circle").attr("class", "slider-handle").attr("cursor", "col-resize").merge(y)).attr(
            "cx",
            function (t) {
              return t.x
            }).attr("r", this._handleRadius).attr("fill", this._handleFill).on("mousedown", function () {
              P.preventDefault(),
                function (t) {
                  document.addEventListener("mouseup", b, !1), document.addEventListener("mousemove", w, !1), m = t
                    .clientX, v = i.scale(i._value)
                }(P)
            }).on("touchstart", function () {
              P.preventDefault(),
                function (t) {
                  1 == t.touches.length && (document.addEventListener("touchend", k, !1), document.addEventListener(
                    "touchmove", M, !1), m = t.touches[0].clientX, v = i.scale(i._value))
                }(P)
            });
    var z = [];
    this._label && z.push({
      label: this._label,
      x: c / 2,
      y: -f,
      font_size: this._labelSize
    });
    var C = _.selectAll(".slider-label").data(z);
    C.exit().remove(), (C = C.enter().append("text").attr("class", "slider-label").attr("text-anchor", "middle")
      .attr("cursor", "default").merge(C)).text(function (t) {
        return t.label
      }).attr("x", function (t) {
        return t.x
      }).attr("y", function (t) {
        return t.y
      }).attr("font-size", this._labelSize);
    var N = [];
    this._startLabel && N.push({
      label: this._startLabel,
      x: this._startLabelBelow ? 0 : -(a + 5 + Math.max(0, this._handleRadius - a)),
      y: this._startLabelBelow ? a + 15 : this._startEndLabelSize / 1.75 - a / 2,
      anchor: this._startLabelBelow ? "middle" : "end",
      font_size: this._startEndLabelSize
    }), this._endLabel && N.push({
      label: this._endLabel,
      x: this._endLabelBelow ? c : c + (a + Math.max(0, this._handleRadius - a) + 5),
      y: this._startLabelBelow ? a + 15 : this._startEndLabelSize / 1.75 - a / 2,
      anchor: this._endLabelBelow ? "middle" : "start",
      font_size: this._startEndLabelSize
    });
    var A = _.selectAll(".slider-end-labels").data(N);
    return A.exit().remove(), (A = A.enter().append("text").attr("class", "slider-end-labels").attr(
      "pointer-events", "none").merge(A)).text(function (t) {
        return t.label
      }).attr("font-size", function (t) {
        return t.font_size
      }).attr("x", function (t) {
        return t.x
      }).attr("y", function (t) {
        return t.y
      }).attr("text-anchor", function (t) {
        return t.anchor
      }), this
  }, ku.version = "1.3.2";
  var Cu = function (t) {
    for (var e in co = t, uo) void 0 === co[e] && (co[e] = uo[e]);
    return (qi = document.createElement("style")).id = "flourish-page-styles", qi.type = "text/css", document
      .head.appendChild(qi), (Bi = document.createElement("link")).setAttribute("rel", "stylesheet"), document
        .body.appendChild(Bi), po.wrapper = function () {
          var t = document.querySelector("#fl-layout-wrapper") || document.createElement("main");
          t.id = "fl-layout-wrapper";
          var e = t.style;
          return e.display = "flex", e.height = "100%", e.flexDirection = "column", e.boxSizing = "border-box", e
            .marginLeft =
            "auto", e.marginRight = "auto", t
        }(), _o.forEach(function (t, e) {
          po[t] = function (t, e) {
            var n = "fl-layout-" + t,
              r = document.createElement("section");
            r.className = "fl-layout-container", r.id = n + "-container", r.style.width = "100%", r.style
              .position = "relative", r.style.order = e;
            var i = document.createElement("div");
            return i.className = "fl-layout-inner", i.id = n, i.style.width = "100%", i.style.overflow =
              "hidden", i.style.position = "relative", r.appendChild(i), po.wrapper.appendChild(r), {
              outer: r,
              inner: i
            }
          }(t, e)
        }), vo("header").appendChild(function () {
          (Vi = document.createElement("header")).className = "flourish-header";
          var t = document.createElement("hgroup");
          return Wi = document.createElement("h1"), $i = document.createElement("h2"), Zi = document
            .createElement("p"), Qi = document.createElement("img"), Vi.appendChild(Qi), Vi.appendChild(t), t
              .appendChild(Wi), t.appendChild($i), Vi.appendChild(Zi), Vi
        }()), vo("footer").appendChild(ao()), po.primary.outer.style.overflow = "hidden", po.controls.inner.style
          .overflow = "", document.body.appendChild(po.wrapper),
      function () {
        var t = po.primary.outer;
        t.style.position = "relative", (ho = document.createElement("div")).id = "fl-layout-overlay";
        var e = ho.style;
        e.position = "absolute", e.display = "none", e.width = "100%", e.height = "100%", e.top = 0, e.left = 0,
          e.backgroundColor = "rgb(200,200,200)", e.zIndex = 999999, e.pointerEvents = "none";
        var n = document.createElement("p");
        n.className = "fl-layout-overlay-message", (e = n.style).color = "#333333", e.fontSize = "1.5rem", e
          .paddingLeft = "15%", e.paddingRight = "15%", e.width = "100%", e.boxSizing = "border-box", e
            .position = "absolute", e.top = "50%", e.transform = "translate(0, -50%)", e.margin = "0", e
              .textAlign = "center", ho.appendChild(n), t.appendChild(ho)
      }(), lo(), {
      update: lo,
      getWrapper: mo,
      getSection: vo,
      getOuterWidth: xo,
      getInnerWidth: bo,
      getOuterHeight: wo,
      getInnerHeight: ko,
      getPrimaryHeight: Mo,
      getPrimaryWidth: To,
      getDefaultPrimaryHeight: Co,
      setHeight: So,
      setLegendPosition: Eo,
      showOverlay: Fo,
      remToPx: Lo,
      getOverlay: Po
    }
  }(d.layout);

  function Nu() {
    P.target && (P.target.getAttribute("class"), "check-rect" == P.target.getAttribute("class")) || (d
      .selected_horse = null, nc())
  }

  function Au() {
    vu = B(Cu.getSection("controls")).append("div").attr("id", "viz-ui"), _u = B(Cu.getSection("primary")).append(
      "svg").on("click", Nu), (du = _u.append("g").attr("id", "plot")).append("clipPath").attr("id", "clip")
        .append("rect").attr("width", 0), du.append("clipPath").attr("id", "circleClip").append("circle"), mu = du
          .append("g").attr("class", "g-checks"), du.append("g").attr("class", "x axis").style("pointer-events",
            "none"), du.append("g").attr("class", "y axis").style("pointer-events", "none"), du.select(".y.axis")
              .append("line").attr("class", "y-axis-edge"), pu = du.append("g").attr("class", "g-lines").attr("clip-path",
                "url(#clip)"), yu = du.append("g").attr("class", "g-start-circles"), gu = du.append("g").attr("class",
                  "g-labels");
    var t = vu.append("div").attr("id", "horse-controls");
    t.append("button").attr("id", "replay").text(d.label_replay).on("click", Ul);
    var e = t.append("div").attr("id", "rank-toggle");
    e.append("button").attr("id", "ranks").text(d.label_ranks).attr("data-type", "ranks"), e.append("button")
      .attr("id", "scores").text(d.label_scores).attr("data-type", "scores"), e.selectAll("button").on("click",
        function () {
          d.value_type = B(this).attr("data-type"), nc()
        }).classed("selected", function () {
          return B(this).attr("data-type") === ("ranks" == d.value_type ? d.label_ranks : d.label_scores)
        }), vu.append("div").attr("id", "filter-control").style("display", "inline-block"),
      function () {
        var t = "#filter-control";
        uu = Tu(t).on("change", function (t) {
          d.filter = t, nc()
        }), cu = B(t), hu = vu.node(), fu = vu.select("#horse-controls").node()
      }()
  }
  var Su = (1 + Math.sqrt(5)) / 2;
  var Eu = Object.freeze({
    palette: ["#1D6996", "#EDAD08", "#73AF48", "#94346E", "#38A6A5", "#E17C05", "#5F4690", "#0F8554",
      "#6F4070", "#CC503E", "#994E95", "#666666"
    ],
    extend: !0,
    advanced: !1,
    hue_rotation_angle: 222.49,
    custom_palette: ""
  });
  var Fu, Lu, Pu = function (h, e) {
    function i(t) {
      if ("string" == typeof t) return "function" == typeof e ? e(t) : e ? t.toLowerCase().replace(/\s+/g, "") :
        t;
      t = "" + t
    }
    var f = {};
    for (var t in Eu) void 0 === h[t] && (h[t] = Eu[t]);
    return {
      find: function (t) {
        return f[i(t)]
      },
      updateColors: function (t) {
        f = {};
        var l, e = Yo(t.map(i)).values(),
          u = h.palette,
          c = u.length;
        h.extend ? e.forEach(function (t, e) {
          if (e < c) f[t] = u[e];
          else {
            if (e === c) {
              for (var n, r = u.map(function (t) {
                return xe(t)
              }), i = r.reduce(function (t, e) {
                return t + e.c
              }, 0) / c, o = r.reduce(function (t, e) {
                return t + e.l
              }, 0) / c, a = c; n = r[--a].h, isNaN(n) && 0 < a;);
              var s = h.advanced ? h.hue_rotation_angle : Eu.hue_rotation_angle;
              (l = function (t, e) {
                e = void 0 !== e ? e : 360 / Su;
                var n = xe(t = t || "#FF0000"),
                  r = n.h,
                  i = n.c,
                  o = n.l,
                  a = 0;
                return function () {
                  var t = a++ * e;
                  return Vt(xe((r + t) % 360, i, o)).hex()
                }
              }(xe(n, i, o).toString(), s))()
            }
            f[t] = l()
          }
        }) : e.forEach(function (t, e) {
          f[t] = u[e % c]
        }), h.custom_palette.split("\n").filter(function (t) {
          return t
        }).forEach(function (t) {
          var e = t.lastIndexOf(":");
          if (-1 !== e) {
            var n = i(t.slice(0, e).trim()),
              r = t.slice(e + 1).trim();
            n && r && (f[n] = r)
          }
        })
      }
    }
  }(d.color, !0);
  var Du, Hu, Ou, Uu, Ru = null,
    Yu = [],
    qu = Zn().x(function (t) {
      return dl(t.i)
    }).y(function (t) {
      return pl(t.value)
    }).defined(function (t) {
      return null != t.value
    }),
    ju = vi(d.label_format);

  function Bu(t) {
    var e = pu.selectAll(".line-group").data(Fu, function (t) {
      return t.name
    }),
      n = e.enter().append("g").attr("class", "horse line-group").on("mouseenter", Ju).on("mouseleave", Gu).on(
        "click", Ku).attr("clip-path", "url(#clip)").attr("stroke-linejoin", "round").attr("stroke-linecap",
          "round").attr("fill", "none");
    n.append("path").attr("class", "missing"), n.append("path").attr("class", "line"), n.append("path").attr(
      "class", "shade"), (Uu = e.merge(n)).attr("opacity", Qu).attr("stroke", function (t) {
        return Pu.find(t.name)
      }), Uu.select(".line").transition().duration(t).attr("d", function (t) {
        return qu(t.line)
      }).attr("opacity", d.line_opacity).attr("stroke-width", ll), Uu.select(".shade").transition().duration(t)
        .attr("d", function (t) {
          return qu(t.line)
        }).attr("display", d.shade ? "block" : "none").attr("opacity", d.shade_opacity).attr("stroke-width", ul), Uu
          .select(".missing").transition().duration(t).attr("d", function (t) {
            return qu(t.missing_line)
          }).attr("opacity", d.missing ? d.missing_opacity : 0).attr("stroke-dasharray", d.missing_stroke_dash + "," +
            d.missing_stroke_dash).attr("stroke-width", Lu ? Math.max(Math.round(d.missing_width / 2), 2) : d
              .missing_width), e.exit().remove()
  }

  function Iu(t) {
    var e = yu.selectAll(".start-circle").data(Fu, function (t) {
      return t.name
    }),
      n = e.enter().append("circle").attr("class", "horse start-circle").attr("cy", function (t) {
        return pl(t.start_circle.value)
      }).attr("cx", function (t) {
        return dl(t.start_circle.i)
      }).attr("clip-path", "url(#clip)");
    e.merge(n).attr("opacity", Qu).transition().duration(t).attr("cy", function (t) {
      return pl(t.start_circle.value)
    }).attr("cx", function (t) {
      return dl(t.start_circle.i)
    }).attr("r", sl).attr("fill", function (t) {
      return Pu.find(t.name)
    }), e.exit().remove()
  }

  function Xu(t, e, n) {
    var r, i, o = t.line[Math.floor(Hl)],
      a = null,
      s = "scores" === d.value_type && d.animate_scores;
    "ahead" == e ? s ? a = t.line[Math.floor(Hl + 1)] : o = t.line[Math.floor(Hl + 1)] : "behind" == e && (s && (
      a = t.line[Math.floor(Hl)]), o = t.line[Math.floor(Hl + 1)]), a && (r = (a.value - o.value) * n, i = o
        .value + r);
    var l = (a ? i : o.value) || t.line[Vu(t)].value;
    return "" == l ? "" : ("ranks" === d.value_type ? l : Hu(l)) + " "
  }

  function Vu(t) {
    for (var e = 0, n = Math.floor(Hl); 0 < n; n--)
      if (null != t.line[n].value) {
        e = n;
        break
      } return e
  }

  function Wu(t) {
    var e = Hl < t.start_circle.i ? 0 : 1,
      n = Math.floor(Hl),
      r = t.line[n].value,
      i = t.line[n + 1] ? t.line[n + 1].value : null,
      o = Hl - Math.floor(Hl),
      a = Math.floor(Hl),
      s = r;
    if (null == r || n < t.stages.length && null == i && 0 < o) {
      var l = Vu(t);
      a = l, s = t.line[l].value
    } else a = Hl, s = r + (i - r) * o;
    return "translate(" + dl(a) + "," + pl(s) + ") scale(" + e + ")"
  }

  function $u() {
    var n = d.zoom_enabled ? dl(Math.max(Hl - d.zoom_steps_to_show + 1, 1)) : dl(1),
      r = cl / 2,
      t = mu.selectAll(".check").data(_.horserace.column_names.stages),
      e = t.enter().append("g").attr("class", "check");
    e.append("rect").attr("class", "check-rect"), e.append("line"), e.append("circle");
    var i = t.merge(e);
    i.on("mouseenter", function (t, e) {
      Ru = "check-" + e, B(this).select("line").attr("opacity", "1"), B(this).select("circle").attr("opacity",
        "1"), d.x_axis_show_hidden && B(".x.axis").select("text[data-tick-index='" + e + "']").raise()
          .transition().style("opacity", .75)
    }).on("mouseleave", function (t, e) {
      Ru = null, B(this).select("line").attr("opacity", "0"), B(this).select("circle").attr("opacity", "0"), d
        .x_axis_show_hidden && B(".x.axis").select("text[data-tick-index='" + e + "']").transition().style(
          "opacity", null)
    }).on("click", function (t, e) {
      d.target_position = e + 1, nc()
    }), i.attr("transform", function (t, e) {
      return "translate(" + (dl(e) - n / 2) + ", -" + r + ")"
    }), i.select("rect").attr("x", 0).attr("y", -100).attr("height", _l + r + 100).attr("fill", "none").style(
      "pointer-events", "all").attr("width", n), i.select("line").attr("x1", n / 2).attr("x2", n / 2).attr("y1",
        r).attr("y2", _l + r).attr("stroke", d.y_axis_stroke_color).attr("opacity", function (t, e) {
          return "check-" + e === Ru ? 1 : 0
        }).style("pointer-events", "none"), i.select("circle").attr("r", 3).attr("cx", n / 2).attr("cy", r).attr(
          "fill", d.y_axis_stroke_color).attr("opacity", function (t, e) {
            return "check-" + e === Ru ? 1 : 0
          }).style("pointer-events", "none"), t.exit().remove()
  }

  function Zu(t) {
    Bu(t), Iu(t),
      function (t) {
        var e = gu.selectAll(".labels-group").data(Fu, function (t) {
          return t.name
        }),
          n = e.enter().append("g").attr("class", "horse labels-group").on("mouseenter", Ju).on("mouseleave", Gu)
            .on("click", Ku).attr("transform", Wu),
          r = !Lu || d.zoom_enabled,
          i = n.append("g").attr("class", "end-circle-container");
        if (i.append("circle").attr("class", "circle bg"), i.append("circle").attr("class", "end circle"), i
          .append("image").attr("clip-path", "url(#circleClip)").attr("preserveAspectRatio", "xMidYMid slice"), i
            .append("text").attr("class", "rank-number").attr("alignment-baseline", "central").attr("fill", "white")
            .attr("dominant-baseline", "central").attr("text-anchor", "middle"), n.append("g").attr("class",
              "name"), n.select(".name").append("text").attr("class", "name-bg").attr("alignment-baseline",
                "central")
                .attr("dominant-baseline", "central").attr("stroke-width", "0.25em"), n.select(".name").append("text")
                  .attr("class", "name-fg").attr("alignment-baseline", "central").attr("dominant-baseline", "central"),
          r && n.selectAll(".name-fg, .name-bg").append("tspan").attr("class", "name-label").attr("font-weight",
            "bold"), n.selectAll(".name-fg, .name-bg").append("tspan").attr("class", "name-rank"), r || n
              .selectAll(".name-fg, .name-bg").append("tspan").attr("class", "name-label").attr("font-weight",
                "bold"), (Ou = e.merge(n)).attr("fill", function (t) {
                  return "auto" === d.label_color_mode ? Pu.find(t.name) : d.label_color
                }).classed("tied", !1).each(function (t) {
                  var e = !1;
                  0 < Yu.length && -1 < Yu.indexOf(String(t.unfiltered_index)) && (e = !0), 0 == Yu.length && null !=
                    d.mouseover_horse && t.unfiltered_index == d.mouseover_horse && (e = !0), e && this.parentNode
                      .appendChild(this)
                }).transition().duration(t).attr("transform", Wu), Ou.select(".end-circle-container").attr("transform",
                  null), Ou.select(".end.circle").attr("r", ol).attr("fill", function (t) {
                    return Pu.find(t.name)
                  }).attr("opacity", Qu).attr("stroke-width", al).attr("stroke", function () {
                    return d.end_circle_stroke_bg && d.layout.background_color_enabled ? d.layout.background_color :
                      "#ffffff"
                  }), Ou.select(".bg.circle").attr("r", ol).attr("fill", d.layout.background_color_enabled ? d.layout
                    .background_color : "#ffffff"), Ou.select(".name-bg").attr("stroke", d.layout
                      .background_color_enabled ? d.layout.background_color : "#ffffff"), d.horse_images) {
          var o = 2 * ol - al;
          Ou.select("image").attr("xlink:href", function (t) {
            return t.pic
          }).style("display", "inherit").attr("opacity", Qu).attr("height", o).attr("width", o).attr("x", -o /
            2).attr("y", -o / 2), du.select("#circleClip circle").attr("r", ol - al / 2)
        } else Ou.select("image").style("display", "none");
        var a = il(d.rank_font_size),
          s = il(d.label_font_size);
        Ou.select(".rank-number").attr("font-size", a).text(function (t) {
          return d.rank_outside_picture ? "" : Xu(t)
        }), Ou.select(".name-bg .name-label").text(function (t) {
          return t.name + " "
        }), Ou.select(".name-fg .name-label").text(function (t) {
          return t.name + " "
        }), Ou.select(".name-bg .name-rank").attr("font-size", a).text(function (t) {
          return d.rank_outside_picture ? Xu(t) : ""
        }), Ou.select(".name-fg .name-rank").attr("font-size", a).text(function (t) {
          return d.rank_outside_picture ? Xu(t) : ""
        }), Ou.selectAll(".name-fg, .name-bg").attr("font-size", s + "px").attr("text-anchor", !Lu || d
          .zoom_enabled ? null : "end").attr("x", function () {
            return !Lu || d.zoom_enabled ? ol + al / 2 + 4 : -ol - al / 2 - 4
          }).attr("y", 0), Ou.select(".name-fg").attr("opacity", Qu), Ou.select(".name-bg").attr("opacity", Qu), e
            .exit().remove()
      }(t), $u()
  }

  function Qu(t) {
    return 0 < Yu.length ? -1 < Yu.indexOf(String(t.unfiltered_index)) ? 1 : .1 : null != d.mouseover_horse ? t
      .unfiltered_index == d.mouseover_horse ? 1 : .1 : d.hide_labels && (B(this).classed("name-bg") || B(this)
        .classed("name-fg")) ? t.unfiltered_index == d.mouseover_horse ? 1 : 0 : 1
  }

  function Ju(t, n) {
    t.unfiltered_index !== d.mouseover_horse && (d.mouseover_horse = t.unfiltered_index, 0 == Yu.length && (Ou
      .select(".end.circle").attr("opacity", Qu), Ou.select("image").attr("opacity", Qu), Ou.select(
        ".name-fg").attr("opacity", Qu), Ou.select(".name-bg").attr("opacity", Qu), Ou.each(function (t, e) {
          n === e && this.parentNode.appendChild(this)
        }), Uu.attr("opacity", Qu), X(".start-circle").attr("opacity", Qu)))
  }

  function Gu() {
    if (d.mouseover_horse = null, 0 == Yu.length) {
      Ou.select(".end.circle").attr("opacity", Qu), Ou.select("image").attr("opacity", Qu), Ou.select(".name-fg")
        .attr("opacity", Qu), Ou.select(".name-bg").attr("opacity", Qu), Uu.attr("opacity", Qu);
      var e = [];
      Ou.each(function (t) {
        B(this).classed("tied") && e.push([t.index, this])
      }), e.sort(function (t, e) {
        return ln(t[0], e[0])
      }).forEach(function (t) {
        t[1].parentNode.appendChild(t[1])
      }), X(".start-circle").attr("opacity", Qu)
    }
  }

  function Ku(t) {
    (d.mouseover_horse = null, P.stopPropagation(), null == d.selected_horse) ? Yu = [String(t.unfiltered_index)] :
      -1 < Yu.indexOf(String(t.unfiltered_index)) ? 1 < Yu.length ? Yu.splice(Yu.indexOf(String(t
        .unfiltered_index)), 1) : Yu = [] : Yu.push(String(t.unfiltered_index));
    d.selected_horse = Yu.join(), nc()
  }

  function tc() {
    var t = _.horserace.column_names.stages.length;
    return null == d.target_position ? t - 1 : Math.max(0, Math.min(t - 1, d.target_position - 1))
  }

  function ec(t) {
    Lu = window.innerWidth <= 420,
      function () {
        var e = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        il = function (t) {
          return t * e
        }
      }(), Du = Ii.getFormatterFunction(), Hu = ju(Du), B("#viz-ui").style("margin-top", d.show_buttons || d
        .show_replay ? null : 0), B("#rank-toggle").style("border-radius", d.controls_border_radius + "px").style(
          "display", d.show_buttons ? null : "none").selectAll("button").classed("selected", function () {
            return B(this).attr("data-type") === ("ranks" == d.value_type ? "ranks" : "scores")
          }), B("#ranks").text(d.label_ranks), B("#scores").text(d.label_scores), B("#replay").style("display", d
            .show_replay ? null : "none").style("border-radius", d.controls_border_radius + "px").text(d
              .label_replay), X(".axis").style("font-family", d.layout.body_font.name), zu(), Cu.update(), Fu = Xi(),
      Yu =
      d.selected_horse ? d.selected_horse.split(",") : [],
      function (t) {
        var e = _.horserace.column_names.stages.length;
        e - 1 < Hl && (Hl = e - 1), t && (Hl = 1)
      }(Fu.new_data), ml(Hl, Fu.max_rank, t), qu.curve(gi[d.curve]), Pu.updateColors(_.horserace.map(function (
        t) {
        return t.name
      }));
    var e = d.zoom_enabled ? Math.min(dl(_.horserace.column_names.stages.length - 1), fl) : fl;
    Dl(dl, pl, e, t), Zu(t), Hl != tc() ? Bl() : Ol()
  }

  function nc() {
    ec(d.update_duration)
  }
  return t.data = _, t.state = d, t.draw = function () {
    window.onresize = function () {
      ec(0)
    }, Au(), nc()
  }, t.update = nc, t
}