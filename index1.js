/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = window,
  Nt =
    st.ShadowRoot &&
    (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) &&
    "adoptedStyleSheets" in Document.prototype &&
    "replace" in CSSStyleSheet.prototype,
  Dt = Symbol(),
  Mt = /* @__PURE__ */ new WeakMap();
class ce {
  constructor(t, r, n) {
    if (((this._$cssResult$ = !0), n !== Dt))
      throw Error(
        "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
      );
    (this.cssText = t), (this.t = r);
  }
  get styleSheet() {
    let t = this.o;
    const r = this.t;
    if (Nt && t === void 0) {
      const n = r !== void 0 && r.length === 1;
      n && (t = Mt.get(r)),
        t === void 0 &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          n && Mt.set(r, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Be = (e) => new ce(typeof e == "string" ? e : e + "", void 0, Dt),
  z = (e, ...t) => {
    const r =
      e.length === 1
        ? e[0]
        : t.reduce(
            (n, s, o) =>
              n +
              ((i) => {
                if (i._$cssResult$ === !0) return i.cssText;
                if (typeof i == "number") return i;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    i +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(s) +
              e[o + 1],
            e[0]
          );
    return new ce(r, e, Dt);
  },
  je = (e, t) => {
    Nt
      ? (e.adoptedStyleSheets = t.map((r) =>
          r instanceof CSSStyleSheet ? r : r.styleSheet
        ))
      : t.forEach((r) => {
          const n = document.createElement("style"),
            s = st.litNonce;
          s !== void 0 && n.setAttribute("nonce", s),
            (n.textContent = r.cssText),
            e.appendChild(n);
        });
  },
  zt = Nt
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((t) => {
              let r = "";
              for (const n of t.cssRules) r += n.cssText;
              return Be(r);
            })(e)
          : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Et;
const ct = window,
  It = ct.trustedTypes,
  He = It ? It.emptyScript : "",
  Jt = ct.reactiveElementPolyfillSupport,
  Ot = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? He : null;
          break;
        case Object:
        case Array:
          e = e == null ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let r = e;
      switch (t) {
        case Boolean:
          r = e !== null;
          break;
        case Number:
          r = e === null ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            r = JSON.parse(e);
          } catch {
            r = null;
          }
      }
      return r;
    },
  },
  ue = (e, t) => t !== e && (t == t || e == e),
  vt = {
    attribute: !0,
    type: String,
    converter: Ot,
    reflect: !1,
    hasChanged: ue,
  };
class k extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = /* @__PURE__ */ new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(t) {
    var r;
    this.finalize(),
      ((r = this.h) !== null && r !== void 0 ? r : (this.h = [])).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((r, n) => {
        const s = this._$Ep(n, r);
        s !== void 0 && (this._$Ev.set(s, n), t.push(s));
      }),
      t
    );
  }
  static createProperty(t, r = vt) {
    if (
      (r.state && (r.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, r),
      !r.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const n = typeof t == "symbol" ? Symbol() : "__" + t,
        s = this.getPropertyDescriptor(t, n, r);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, r, n) {
    return {
      get() {
        return this[r];
      },
      set(s) {
        const o = this[t];
        (this[r] = s), this.requestUpdate(t, o, n);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || vt;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      t.h !== void 0 && (this.h = [...t.h]),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = /* @__PURE__ */ new Map()),
      this.hasOwnProperty("properties"))
    ) {
      const r = this.properties,
        n = [
          ...Object.getOwnPropertyNames(r),
          ...Object.getOwnPropertySymbols(r),
        ];
      for (const s of n) this.createProperty(s, r[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const r = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const s of n) r.unshift(zt(s));
    } else t !== void 0 && r.push(zt(t));
    return r;
  }
  static _$Ep(t, r) {
    const n = r.attribute;
    return n === !1
      ? void 0
      : typeof n == "string"
      ? n
      : typeof t == "string"
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._$E_ = new Promise((r) => (this.enableUpdating = r))),
      (this._$AL = /* @__PURE__ */ new Map()),
      this._$Eg(),
      this.requestUpdate(),
      (t = this.constructor.h) === null ||
        t === void 0 ||
        t.forEach((r) => r(this));
  }
  addController(t) {
    var r, n;
    ((r = this._$ES) !== null && r !== void 0 ? r : (this._$ES = [])).push(t),
      this.renderRoot !== void 0 &&
        this.isConnected &&
        ((n = t.hostConnected) === null || n === void 0 || n.call(t));
  }
  removeController(t) {
    var r;
    (r = this._$ES) === null ||
      r === void 0 ||
      r.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, r) => {
      this.hasOwnProperty(r) && (this._$Ei.set(r, this[r]), delete this[r]);
    });
  }
  createRenderRoot() {
    var t;
    const r =
      (t = this.shadowRoot) !== null && t !== void 0
        ? t
        : this.attachShadow(this.constructor.shadowRootOptions);
    return je(r, this.constructor.elementStyles), r;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      (t = this._$ES) === null ||
        t === void 0 ||
        t.forEach((r) => {
          var n;
          return (n = r.hostConnected) === null || n === void 0
            ? void 0
            : n.call(r);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null ||
      t === void 0 ||
      t.forEach((r) => {
        var n;
        return (n = r.hostDisconnected) === null || n === void 0
          ? void 0
          : n.call(r);
      });
  }
  attributeChangedCallback(t, r, n) {
    this._$AK(t, n);
  }
  _$EO(t, r, n = vt) {
    var s;
    const o = this.constructor._$Ep(t, n);
    if (o !== void 0 && n.reflect === !0) {
      const i = (
        ((s = n.converter) === null || s === void 0
          ? void 0
          : s.toAttribute) !== void 0
          ? n.converter
          : Ot
      ).toAttribute(r, n.type);
      (this._$El = t),
        i == null ? this.removeAttribute(o) : this.setAttribute(o, i),
        (this._$El = null);
    }
  }
  _$AK(t, r) {
    var n;
    const s = this.constructor,
      o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const i = s.getPropertyOptions(o),
        c =
          typeof i.converter == "function"
            ? { fromAttribute: i.converter }
            : ((n = i.converter) === null || n === void 0
                ? void 0
                : n.fromAttribute) !== void 0
            ? i.converter
            : Ot;
      (this._$El = o),
        (this[o] = c.fromAttribute(r, i.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, r, n) {
    let s = !0;
    t !== void 0 &&
      (((n = n || this.constructor.getPropertyOptions(t)).hasChanged || ue)(
        this[t],
        r
      )
        ? (this._$AL.has(t) || this._$AL.set(t, r),
          n.reflect === !0 &&
            this._$El !== t &&
            (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()),
            this._$EC.set(t, n)))
        : (s = !1)),
      !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (r) {
      Promise.reject(r);
    }
    const t = this.scheduleUpdate();
    return t != null && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((s, o) => (this[o] = s)), (this._$Ei = void 0));
    let r = !1;
    const n = this._$AL;
    try {
      (r = this.shouldUpdate(n)),
        r
          ? (this.willUpdate(n),
            (t = this._$ES) === null ||
              t === void 0 ||
              t.forEach((s) => {
                var o;
                return (o = s.hostUpdate) === null || o === void 0
                  ? void 0
                  : o.call(s);
              }),
            this.update(n))
          : this._$Ek();
    } catch (s) {
      throw ((r = !1), this._$Ek(), s);
    }
    r && this._$AE(n);
  }
  willUpdate(t) {}
  _$AE(t) {
    var r;
    (r = this._$ES) === null ||
      r === void 0 ||
      r.forEach((n) => {
        var s;
        return (s = n.hostUpdated) === null || s === void 0
          ? void 0
          : s.call(n);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = /* @__PURE__ */ new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$EC !== void 0 &&
      (this._$EC.forEach((r, n) => this._$EO(n, this[n], r)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
(k.finalized = !0),
  (k.elementProperties = /* @__PURE__ */ new Map()),
  (k.elementStyles = []),
  (k.shadowRootOptions = { mode: "open" }),
  Jt == null || Jt({ ReactiveElement: k }),
  ((Et = ct.reactiveElementVersions) !== null && Et !== void 0
    ? Et
    : (ct.reactiveElementVersions = [])
  ).push("1.4.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _t;
const ut = window,
  j = ut.trustedTypes,
  qt = j ? j.createPolicy("lit-html", { createHTML: (e) => e }) : void 0,
  T = `lit$${(Math.random() + "").slice(9)}$`,
  he = "?" + T,
  Fe = `<${he}>`,
  H = document,
  V = (e = "") => H.createComment(e),
  K = (e) => e === null || (typeof e != "object" && typeof e != "function"),
  de = Array.isArray,
  Me = (e) =>
    de(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function",
  J = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  Vt = /-->/g,
  Kt = />/g,
  N = RegExp(
    `>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,
    "g"
  ),
  Wt = /'/g,
  Xt = /"/g,
  pe = /^(?:script|style|textarea|title)$/i,
  ze =
    (e) =>
    (t, ...r) => ({ _$litType$: e, strings: t, values: r }),
  E = ze(1),
  F = Symbol.for("lit-noChange"),
  b = Symbol.for("lit-nothing"),
  Zt = /* @__PURE__ */ new WeakMap(),
  B = H.createTreeWalker(H, 129, null, !1),
  Ie = (e, t) => {
    const r = e.length - 1,
      n = [];
    let s,
      o = t === 2 ? "<svg>" : "",
      i = J;
    for (let u = 0; u < r; u++) {
      const a = e[u];
      let d,
        h,
        m = -1,
        y = 0;
      for (; y < a.length && ((i.lastIndex = y), (h = i.exec(a)), h !== null); )
        (y = i.lastIndex),
          i === J
            ? h[1] === "!--"
              ? (i = Vt)
              : h[1] !== void 0
              ? (i = Kt)
              : h[2] !== void 0
              ? (pe.test(h[2]) && (s = RegExp("</" + h[2], "g")), (i = N))
              : h[3] !== void 0 && (i = N)
            : i === N
            ? h[0] === ">"
              ? ((i = s != null ? s : J), (m = -1))
              : h[1] === void 0
              ? (m = -2)
              : ((m = i.lastIndex - h[2].length),
                (d = h[1]),
                (i = h[3] === void 0 ? N : h[3] === '"' ? Xt : Wt))
            : i === Xt || i === Wt
            ? (i = N)
            : i === Vt || i === Kt
            ? (i = J)
            : ((i = N), (s = void 0));
      const p = i === N && e[u + 1].startsWith("/>") ? " " : "";
      o +=
        i === J
          ? a + Fe
          : m >= 0
          ? (n.push(d), a.slice(0, m) + "$lit$" + a.slice(m) + T + p)
          : a + T + (m === -2 ? (n.push(void 0), u) : p);
    }
    const c = o + (e[r] || "<?>") + (t === 2 ? "</svg>" : "");
    if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [qt !== void 0 ? qt.createHTML(c) : c, n];
  };
class W {
  constructor({ strings: t, _$litType$: r }, n) {
    let s;
    this.parts = [];
    let o = 0,
      i = 0;
    const c = t.length - 1,
      u = this.parts,
      [a, d] = Ie(t, r);
    if (
      ((this.el = W.createElement(a, n)),
      (B.currentNode = this.el.content),
      r === 2)
    ) {
      const h = this.el.content,
        m = h.firstChild;
      m.remove(), h.append(...m.childNodes);
    }
    for (; (s = B.nextNode()) !== null && u.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const m of s.getAttributeNames())
            if (m.endsWith("$lit$") || m.startsWith(T)) {
              const y = d[i++];
              if ((h.push(m), y !== void 0)) {
                const p = s.getAttribute(y.toLowerCase() + "$lit$").split(T),
                  f = /([.?@])?(.*)/.exec(y);
                u.push({
                  type: 1,
                  index: o,
                  name: f[2],
                  strings: p,
                  ctor:
                    f[1] === "."
                      ? qe
                      : f[1] === "?"
                      ? Ke
                      : f[1] === "@"
                      ? We
                      : ft,
                });
              } else u.push({ type: 6, index: o });
            }
          for (const m of h) s.removeAttribute(m);
        }
        if (pe.test(s.tagName)) {
          const h = s.textContent.split(T),
            m = h.length - 1;
          if (m > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let y = 0; y < m; y++)
              s.append(h[y], V()),
                B.nextNode(),
                u.push({ type: 2, index: ++o });
            s.append(h[m], V());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === he) u.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(T, h + 1)) !== -1; )
            u.push({ type: 7, index: o }), (h += T.length - 1);
        }
      o++;
    }
  }
  static createElement(t, r) {
    const n = H.createElement("template");
    return (n.innerHTML = t), n;
  }
}
function M(e, t, r = e, n) {
  var s, o, i, c;
  if (t === F) return t;
  let u =
    n !== void 0
      ? (s = r._$Co) === null || s === void 0
        ? void 0
        : s[n]
      : r._$Cl;
  const a = K(t) ? void 0 : t._$litDirective$;
  return (
    (u == null ? void 0 : u.constructor) !== a &&
      ((o = u == null ? void 0 : u._$AO) === null ||
        o === void 0 ||
        o.call(u, !1),
      a === void 0 ? (u = void 0) : ((u = new a(e)), u._$AT(e, r, n)),
      n !== void 0
        ? (((i = (c = r)._$Co) !== null && i !== void 0 ? i : (c._$Co = []))[
            n
          ] = u)
        : (r._$Cl = u)),
    u !== void 0 && (t = M(e, u._$AS(e, t.values), u, n)),
    t
  );
}
class Je {
  constructor(t, r) {
    (this.u = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = r);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var r;
    const {
        el: { content: n },
        parts: s,
      } = this._$AD,
      o = (
        (r = t == null ? void 0 : t.creationScope) !== null && r !== void 0
          ? r
          : H
      ).importNode(n, !0);
    B.currentNode = o;
    let i = B.nextNode(),
      c = 0,
      u = 0,
      a = s[0];
    for (; a !== void 0; ) {
      if (c === a.index) {
        let d;
        a.type === 2
          ? (d = new Q(i, i.nextSibling, this, t))
          : a.type === 1
          ? (d = new a.ctor(i, a.name, a.strings, this, t))
          : a.type === 6 && (d = new Xe(i, this, t)),
          this.u.push(d),
          (a = s[++u]);
      }
      c !== (a == null ? void 0 : a.index) && ((i = B.nextNode()), c++);
    }
    return o;
  }
  p(t) {
    let r = 0;
    for (const n of this.u)
      n !== void 0 &&
        (n.strings !== void 0
          ? (n._$AI(t, n, r), (r += n.strings.length - 2))
          : n._$AI(t[r])),
        r++;
  }
}
class Q {
  constructor(t, r, n, s) {
    var o;
    (this.type = 2),
      (this._$AH = b),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = r),
      (this._$AM = n),
      (this.options = s),
      (this._$Cm =
        (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o);
  }
  get _$AU() {
    var t, r;
    return (r = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !==
      null && r !== void 0
      ? r
      : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && t.nodeType === 11 && (t = r.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, r = this) {
    (t = M(this, t, r)),
      K(t)
        ? t === b || t == null || t === ""
          ? (this._$AH !== b && this._$AR(), (this._$AH = b))
          : t !== this._$AH && t !== F && this.g(t)
        : t._$litType$ !== void 0
        ? this.$(t)
        : t.nodeType !== void 0
        ? this.T(t)
        : Me(t)
        ? this.k(t)
        : this.g(t);
  }
  O(t, r = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, r);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)));
  }
  g(t) {
    this._$AH !== b && K(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.T(H.createTextNode(t)),
      (this._$AH = t);
  }
  $(t) {
    var r;
    const { values: n, _$litType$: s } = t,
      o =
        typeof s == "number"
          ? this._$AC(t)
          : (s.el === void 0 && (s.el = W.createElement(s.h, this.options)), s);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === o)
      this._$AH.p(n);
    else {
      const i = new Je(o, this),
        c = i.v(this.options);
      i.p(n), this.T(c), (this._$AH = i);
    }
  }
  _$AC(t) {
    let r = Zt.get(t.strings);
    return r === void 0 && Zt.set(t.strings, (r = new W(t))), r;
  }
  k(t) {
    de(this._$AH) || ((this._$AH = []), this._$AR());
    const r = this._$AH;
    let n,
      s = 0;
    for (const o of t)
      s === r.length
        ? r.push((n = new Q(this.O(V()), this.O(V()), this, this.options)))
        : (n = r[s]),
        n._$AI(o),
        s++;
    s < r.length && (this._$AR(n && n._$AB.nextSibling, s), (r.length = s));
  }
  _$AR(t = this._$AA.nextSibling, r) {
    var n;
    for (
      (n = this._$AP) === null || n === void 0 || n.call(this, !1, !0, r);
      t && t !== this._$AB;

    ) {
      const s = t.nextSibling;
      t.remove(), (t = s);
    }
  }
  setConnected(t) {
    var r;
    this._$AM === void 0 &&
      ((this._$Cm = t),
      (r = this._$AP) === null || r === void 0 || r.call(this, t));
  }
}
class ft {
  constructor(t, r, n, s, o) {
    (this.type = 1),
      (this._$AH = b),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = r),
      (this._$AM = s),
      (this.options = o),
      n.length > 2 || n[0] !== "" || n[1] !== ""
        ? ((this._$AH = Array(n.length - 1).fill(new String())),
          (this.strings = n))
        : (this._$AH = b);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, r = this, n, s) {
    const o = this.strings;
    let i = !1;
    if (o === void 0)
      (t = M(this, t, r, 0)),
        (i = !K(t) || (t !== this._$AH && t !== F)),
        i && (this._$AH = t);
    else {
      const c = t;
      let u, a;
      for (t = o[0], u = 0; u < o.length - 1; u++)
        (a = M(this, c[n + u], r, u)),
          a === F && (a = this._$AH[u]),
          i || (i = !K(a) || a !== this._$AH[u]),
          a === b ? (t = b) : t !== b && (t += (a != null ? a : "") + o[u + 1]),
          (this._$AH[u] = a);
    }
    i && !s && this.j(t);
  }
  j(t) {
    t === b
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class qe extends ft {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const Ve = j ? j.emptyScript : "";
class Ke extends ft {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  j(t) {
    t && t !== b
      ? this.element.setAttribute(this.name, Ve)
      : this.element.removeAttribute(this.name);
  }
}
class We extends ft {
  constructor(t, r, n, s, o) {
    super(t, r, n, s, o), (this.type = 5);
  }
  _$AI(t, r = this) {
    var n;
    if ((t = (n = M(this, t, r, 0)) !== null && n !== void 0 ? n : b) === F)
      return;
    const s = this._$AH,
      o =
        (t === b && s !== b) ||
        t.capture !== s.capture ||
        t.once !== s.once ||
        t.passive !== s.passive,
      i = t !== b && (s === b || o);
    o && this.element.removeEventListener(this.name, this, s),
      i && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var r, n;
    typeof this._$AH == "function"
      ? this._$AH.call(
          (n =
            (r = this.options) === null || r === void 0 ? void 0 : r.host) !==
            null && n !== void 0
            ? n
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class Xe {
  constructor(t, r, n) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = r),
      (this.options = n);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const Qt = ut.litHtmlPolyfillSupport;
Qt == null || Qt(W, Q),
  ((_t = ut.litHtmlVersions) !== null && _t !== void 0
    ? _t
    : (ut.litHtmlVersions = [])
  ).push("2.4.0");
const Ze = (e, t, r) => {
  var n, s;
  const o =
    (n = r == null ? void 0 : r.renderBefore) !== null && n !== void 0 ? n : t;
  let i = o._$litPart$;
  if (i === void 0) {
    const c =
      (s = r == null ? void 0 : r.renderBefore) !== null && s !== void 0
        ? s
        : null;
    o._$litPart$ = i = new Q(
      t.insertBefore(V(), c),
      c,
      void 0,
      r != null ? r : {}
    );
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wt, $t;
class S extends k {
  constructor() {
    super(...arguments),
      (this.renderOptions = { host: this }),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, r;
    const n = super.createRenderRoot();
    return (
      ((t = (r = this.renderOptions).renderBefore) !== null && t !== void 0) ||
        (r.renderBefore = n.firstChild),
      n
    );
  }
  update(t) {
    const r = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = Ze(r, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return F;
  }
}
(S.finalized = !0),
  (S._$litElement$ = !0),
  (wt = globalThis.litElementHydrateSupport) === null ||
    wt === void 0 ||
    wt.call(globalThis, { LitElement: S });
const Yt = globalThis.litElementPolyfillSupport;
Yt == null || Yt({ LitElement: S });
(($t = globalThis.litElementVersions) !== null && $t !== void 0
  ? $t
  : (globalThis.litElementVersions = [])
).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (e) => (t) =>
  typeof t == "function"
    ? ((r, n) => (customElements.define(r, n), n))(e, t)
    : ((r, n) => {
        const { kind: s, elements: o } = n;
        return {
          kind: s,
          elements: o,
          finisher(i) {
            customElements.define(r, i);
          },
        };
      })(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (e, t) =>
  t.kind === "method" && t.descriptor && !("value" in t.descriptor)
    ? {
        ...t,
        finisher(r) {
          r.createProperty(t.key, e);
        },
      }
    : {
        kind: "field",
        key: Symbol(),
        placement: "own",
        descriptor: {},
        originalKey: t.key,
        initializer() {
          typeof t.initializer == "function" &&
            (this[t.key] = t.initializer.call(this));
        },
        finisher(r) {
          r.createProperty(t.key, e);
        },
      };
function _(e) {
  return (t, r) =>
    r !== void 0
      ? ((n, s, o) => {
          s.constructor.createProperty(o, n);
        })(e, t, r)
      : Qe(e, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var At;
((At = window.HTMLSlotElement) === null || At === void 0
  ? void 0
  : At.prototype.assignedElements) != null;
function fe(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: me } = Object.prototype,
  { getPrototypeOf: Ut } = Object,
  Lt = ((e) => (t) => {
    const r = me.call(t);
    return e[r] || (e[r] = r.slice(8, -1).toLowerCase());
  })(/* @__PURE__ */ Object.create(null)),
  C = (e) => ((e = e.toLowerCase()), (t) => Lt(t) === e),
  mt = (e) => (t) => typeof t === e,
  { isArray: I } = Array,
  X = mt("undefined");
function Ye(e) {
  return (
    e !== null &&
    !X(e) &&
    e.constructor !== null &&
    !X(e.constructor) &&
    D(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const ye = C("ArrayBuffer");
function Ge(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && ye(e.buffer)),
    t
  );
}
const tr = mt("string"),
  D = mt("function"),
  ge = mt("number"),
  kt = (e) => e !== null && typeof e == "object",
  er = (e) => e === !0 || e === !1,
  it = (e) => {
    if (Lt(e) !== "object") return !1;
    const t = Ut(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  rr = C("Date"),
  nr = C("File"),
  sr = C("Blob"),
  ir = C("FileList"),
  or = (e) => kt(e) && D(e.pipe),
  ar = (e) => {
    const t = "[object FormData]";
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        me.call(e) === t ||
        (D(e.toString) && e.toString() === t))
    );
  },
  lr = C("URLSearchParams"),
  cr = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function G(e, t, { allOwnKeys: r = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let n, s;
  if ((typeof e != "object" && (e = [e]), I(e)))
    for (n = 0, s = e.length; n < s; n++) t.call(null, e[n], n, e);
  else {
    const o = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let c;
    for (n = 0; n < i; n++) (c = o[n]), t.call(null, e[c], c, e);
  }
}
function be(e, t) {
  t = t.toLowerCase();
  const r = Object.keys(e);
  let n = r.length,
    s;
  for (; n-- > 0; ) if (((s = r[n]), t === s.toLowerCase())) return s;
  return null;
}
const Ee =
    typeof self > "u" ? (typeof global > "u" ? globalThis : global) : self,
  ve = (e) => !X(e) && e !== Ee;
function Ct() {
  const { caseless: e } = (ve(this) && this) || {},
    t = {},
    r = (n, s) => {
      const o = (e && be(t, s)) || s;
      it(t[o]) && it(n)
        ? (t[o] = Ct(t[o], n))
        : it(n)
        ? (t[o] = Ct({}, n))
        : I(n)
        ? (t[o] = n.slice())
        : (t[o] = n);
    };
  for (let n = 0, s = arguments.length; n < s; n++)
    arguments[n] && G(arguments[n], r);
  return t;
}
const ur = (e, t, r, { allOwnKeys: n } = {}) => (
    G(
      t,
      (s, o) => {
        r && D(s) ? (e[o] = fe(s, r)) : (e[o] = s);
      },
      { allOwnKeys: n }
    ),
    e
  ),
  hr = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  dr = (e, t, r, n) => {
    (e.prototype = Object.create(t.prototype, n)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", {
        value: t.prototype,
      }),
      r && Object.assign(e.prototype, r);
  },
  pr = (e, t, r, n) => {
    let s, o, i;
    const c = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        (i = s[o]), (!n || n(i, e, t)) && !c[i] && ((t[i] = e[i]), (c[i] = !0));
      e = r !== !1 && Ut(e);
    } while (e && (!r || r(e, t)) && e !== Object.prototype);
    return t;
  },
  fr = (e, t, r) => {
    (e = String(e)),
      (r === void 0 || r > e.length) && (r = e.length),
      (r -= t.length);
    const n = e.indexOf(t, r);
    return n !== -1 && n === r;
  },
  mr = (e) => {
    if (!e) return null;
    if (I(e)) return e;
    let t = e.length;
    if (!ge(t)) return null;
    const r = new Array(t);
    for (; t-- > 0; ) r[t] = e[t];
    return r;
  },
  yr = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Ut(Uint8Array)),
  gr = (e, t) => {
    const n = (e && e[Symbol.iterator]).call(e);
    let s;
    for (; (s = n.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  br = (e, t) => {
    let r;
    const n = [];
    for (; (r = e.exec(t)) !== null; ) n.push(r);
    return n;
  },
  Er = C("HTMLFormElement"),
  vr = (e) =>
    e.toLowerCase().replace(/[_-\s]([a-z\d])(\w*)/g, function (r, n, s) {
      return n.toUpperCase() + s;
    }),
  Gt = (
    ({ hasOwnProperty: e }) =>
    (t, r) =>
      e.call(t, r)
  )(Object.prototype),
  _r = C("RegExp"),
  _e = (e, t) => {
    const r = Object.getOwnPropertyDescriptors(e),
      n = {};
    G(r, (s, o) => {
      t(s, o, e) !== !1 && (n[o] = s);
    }),
      Object.defineProperties(e, n);
  },
  wr = (e) => {
    _e(e, (t, r) => {
      if (D(e) && ["arguments", "caller", "callee"].indexOf(r) !== -1)
        return !1;
      const n = e[r];
      if (!!D(n)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + r + "'");
          });
      }
    });
  },
  $r = (e, t) => {
    const r = {},
      n = (s) => {
        s.forEach((o) => {
          r[o] = !0;
        });
      };
    return I(e) ? n(e) : n(String(e).split(t)), r;
  },
  Ar = () => {},
  Sr = (e, t) => ((e = +e), Number.isFinite(e) ? e : t),
  xr = (e) => {
    const t = new Array(10),
      r = (n, s) => {
        if (kt(n)) {
          if (t.indexOf(n) >= 0) return;
          if (!("toJSON" in n)) {
            t[s] = n;
            const o = I(n) ? [] : {};
            return (
              G(n, (i, c) => {
                const u = r(i, s + 1);
                !X(u) && (o[c] = u);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return n;
      };
    return r(e, 0);
  },
  l = {
    isArray: I,
    isArrayBuffer: ye,
    isBuffer: Ye,
    isFormData: ar,
    isArrayBufferView: Ge,
    isString: tr,
    isNumber: ge,
    isBoolean: er,
    isObject: kt,
    isPlainObject: it,
    isUndefined: X,
    isDate: rr,
    isFile: nr,
    isBlob: sr,
    isRegExp: _r,
    isFunction: D,
    isStream: or,
    isURLSearchParams: lr,
    isTypedArray: yr,
    isFileList: ir,
    forEach: G,
    merge: Ct,
    extend: ur,
    trim: cr,
    stripBOM: hr,
    inherits: dr,
    toFlatObject: pr,
    kindOf: Lt,
    kindOfTest: C,
    endsWith: fr,
    toArray: mr,
    forEachEntry: gr,
    matchAll: br,
    isHTMLForm: Er,
    hasOwnProperty: Gt,
    hasOwnProp: Gt,
    reduceDescriptors: _e,
    freezeMethods: wr,
    toObjectSet: $r,
    toCamelCase: vr,
    noop: Ar,
    toFiniteNumber: Sr,
    findKey: be,
    global: Ee,
    isContextDefined: ve,
    toJSONObject: xr,
  };
function g(e, t, r, n, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    r && (this.config = r),
    n && (this.request = n),
    s && (this.response = s);
}
l.inherits(g, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: l.toJSONObject(this.config),
      code: this.code,
      status:
        this.response && this.response.status ? this.response.status : null,
    };
  },
});
const we = g.prototype,
  $e = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  $e[e] = { value: e };
});
Object.defineProperties(g, $e);
Object.defineProperty(we, "isAxiosError", { value: !0 });
g.from = (e, t, r, n, s, o) => {
  const i = Object.create(we);
  return (
    l.toFlatObject(
      e,
      i,
      function (u) {
        return u !== Error.prototype;
      },
      (c) => c !== "isAxiosError"
    ),
    g.call(i, e.message, t, r, n, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
var Or = typeof self == "object" ? self.FormData : window.FormData;
const Cr = Or;
function Rt(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function Ae(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function te(e, t, r) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return (s = Ae(s)), !r && o ? "[" + s + "]" : s;
        })
        .join(r ? "." : "")
    : t;
}
function Rr(e) {
  return l.isArray(e) && !e.some(Rt);
}
const Pr = l.toFlatObject(l, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function Tr(e) {
  return (
    e &&
    l.isFunction(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
function yt(e, t, r) {
  if (!l.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new (Cr || FormData)()),
    (r = l.toFlatObject(
      r,
      {
        metaTokens: !0,
        dots: !1,
        indexes: !1,
      },
      !1,
      function (f, A) {
        return !l.isUndefined(A[f]);
      }
    ));
  const n = r.metaTokens,
    s = r.visitor || d,
    o = r.dots,
    i = r.indexes,
    u = (r.Blob || (typeof Blob < "u" && Blob)) && Tr(t);
  if (!l.isFunction(s)) throw new TypeError("visitor must be a function");
  function a(p) {
    if (p === null) return "";
    if (l.isDate(p)) return p.toISOString();
    if (!u && l.isBlob(p))
      throw new g("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(p) || l.isTypedArray(p)
      ? u && typeof Blob == "function"
        ? new Blob([p])
        : Buffer.from(p)
      : p;
  }
  function d(p, f, A) {
    let w = p;
    if (p && !A && typeof p == "object") {
      if (l.endsWith(f, "{}"))
        (f = n ? f : f.slice(0, -2)), (p = JSON.stringify(p));
      else if (
        (l.isArray(p) && Rr(p)) ||
        l.isFileList(p) ||
        (l.endsWith(f, "[]") && (w = l.toArray(p)))
      )
        return (
          (f = Ae(f)),
          w.forEach(function (nt, ke) {
            !(l.isUndefined(nt) || nt === null) &&
              t.append(
                i === !0 ? te([f], ke, o) : i === null ? f : f + "[]",
                a(nt)
              );
          }),
          !1
        );
    }
    return Rt(p) ? !0 : (t.append(te(A, f, o), a(p)), !1);
  }
  const h = [],
    m = Object.assign(Pr, {
      defaultVisitor: d,
      convertValue: a,
      isVisitable: Rt,
    });
  function y(p, f) {
    if (!l.isUndefined(p)) {
      if (h.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + f.join("."));
      h.push(p),
        l.forEach(p, function (w, L) {
          (!(l.isUndefined(w) || w === null) &&
            s.call(t, w, l.isString(L) ? L.trim() : L, f, m)) === !0 &&
            y(w, f ? f.concat(L) : [L]);
        }),
        h.pop();
    }
  }
  if (!l.isObject(e)) throw new TypeError("data must be an object");
  return y(e), t;
}
function ee(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (n) {
    return t[n];
  });
}
function Bt(e, t) {
  (this._pairs = []), e && yt(e, this, t);
}
const Se = Bt.prototype;
Se.append = function (t, r) {
  this._pairs.push([t, r]);
};
Se.toString = function (t) {
  const r = t
    ? function (n) {
        return t.call(this, n, ee);
      }
    : ee;
  return this._pairs
    .map(function (s) {
      return r(s[0]) + "=" + r(s[1]);
    }, "")
    .join("&");
};
function Nr(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function xe(e, t, r) {
  if (!t) return e;
  const n = (r && r.encode) || Nr,
    s = r && r.serialize;
  let o;
  if (
    (s
      ? (o = s(t, r))
      : (o = l.isURLSearchParams(t) ? t.toString() : new Bt(t, r).toString(n)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class Dr {
  constructor() {
    this.handlers = [];
  }
  use(t, r, n) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: r,
        synchronous: n ? n.synchronous : !1,
        runWhen: n ? n.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    l.forEach(this.handlers, function (n) {
      n !== null && t(n);
    });
  }
}
const re = Dr,
  Oe = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  Ur = typeof URLSearchParams < "u" ? URLSearchParams : Bt,
  Lr = FormData,
  kr = (() => {
    let e;
    return typeof navigator < "u" &&
      ((e = navigator.product) === "ReactNative" ||
        e === "NativeScript" ||
        e === "NS")
      ? !1
      : typeof window < "u" && typeof document < "u";
  })(),
  x = {
    isBrowser: !0,
    classes: {
      URLSearchParams: Ur,
      FormData: Lr,
      Blob,
    },
    isStandardBrowserEnv: kr,
    protocols: ["http", "https", "file", "blob", "url", "data"],
  };
function Br(e, t) {
  return yt(
    e,
    new x.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (r, n, s, o) {
          return x.isNode && l.isBuffer(r)
            ? (this.append(n, r.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function jr(e) {
  return l
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function Hr(e) {
  const t = {},
    r = Object.keys(e);
  let n;
  const s = r.length;
  let o;
  for (n = 0; n < s; n++) (o = r[n]), (t[o] = e[o]);
  return t;
}
function Ce(e) {
  function t(r, n, s, o) {
    let i = r[o++];
    const c = Number.isFinite(+i),
      u = o >= r.length;
    return (
      (i = !i && l.isArray(s) ? s.length : i),
      u
        ? (l.hasOwnProp(s, i) ? (s[i] = [s[i], n]) : (s[i] = n), !c)
        : ((!s[i] || !l.isObject(s[i])) && (s[i] = []),
          t(r, n, s[i], o) && l.isArray(s[i]) && (s[i] = Hr(s[i])),
          !c)
    );
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const r = {};
    return (
      l.forEachEntry(e, (n, s) => {
        t(jr(n), s, r, 0);
      }),
      r
    );
  }
  return null;
}
const Fr = {
  "Content-Type": void 0,
};
function Mr(e, t, r) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (n) {
      if (n.name !== "SyntaxError") throw n;
    }
  return (r || JSON.stringify)(e);
}
const gt = {
  transitional: Oe,
  adapter: ["xhr", "http"],
  transformRequest: [
    function (t, r) {
      const n = r.getContentType() || "",
        s = n.indexOf("application/json") > -1,
        o = l.isObject(t);
      if ((o && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t)))
        return s && s ? JSON.stringify(Ce(t)) : t;
      if (
        l.isArrayBuffer(t) ||
        l.isBuffer(t) ||
        l.isStream(t) ||
        l.isFile(t) ||
        l.isBlob(t)
      )
        return t;
      if (l.isArrayBufferView(t)) return t.buffer;
      if (l.isURLSearchParams(t))
        return (
          r.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let c;
      if (o) {
        if (n.indexOf("application/x-www-form-urlencoded") > -1)
          return Br(t, this.formSerializer).toString();
        if ((c = l.isFileList(t)) || n.indexOf("multipart/form-data") > -1) {
          const u = this.env && this.env.FormData;
          return yt(
            c ? { "files[]": t } : t,
            u && new u(),
            this.formSerializer
          );
        }
      }
      return o || s ? (r.setContentType("application/json", !1), Mr(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const r = this.transitional || gt.transitional,
        n = r && r.forcedJSONParsing,
        s = this.responseType === "json";
      if (t && l.isString(t) && ((n && !this.responseType) || s)) {
        const i = !(r && r.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (c) {
          if (i)
            throw c.name === "SyntaxError"
              ? g.from(c, g.ERR_BAD_RESPONSE, this, null, this.response)
              : c;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: x.classes.FormData,
    Blob: x.classes.Blob,
  },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
};
l.forEach(["delete", "get", "head"], function (t) {
  gt.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function (t) {
  gt.headers[t] = l.merge(Fr);
});
const jt = gt,
  zr = l.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  Ir = (e) => {
    const t = {};
    let r, n, s;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (s = i.indexOf(":")),
              (r = i.substring(0, s).trim().toLowerCase()),
              (n = i.substring(s + 1).trim()),
              !(!r || (t[r] && zr[r])) &&
                (r === "set-cookie"
                  ? t[r]
                    ? t[r].push(n)
                    : (t[r] = [n])
                  : (t[r] = t[r] ? t[r] + ", " + n : n));
          }),
      t
    );
  },
  ne = Symbol("internals");
function q(e) {
  return e && String(e).trim().toLowerCase();
}
function ot(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(ot) : String(e);
}
function Jr(e) {
  const t = /* @__PURE__ */ Object.create(null),
    r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let n;
  for (; (n = r.exec(e)); ) t[n[1]] = n[2];
  return t;
}
function qr(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function se(e, t, r, n) {
  if (l.isFunction(n)) return n.call(this, t, r);
  if (!!l.isString(t)) {
    if (l.isString(n)) return t.indexOf(n) !== -1;
    if (l.isRegExp(n)) return n.test(t);
  }
}
function Vr(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, r, n) => r.toUpperCase() + n);
}
function Kr(e, t) {
  const r = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((n) => {
    Object.defineProperty(e, n + r, {
      value: function (s, o, i) {
        return this[n].call(this, t, s, o, i);
      },
      configurable: !0,
    });
  });
}
class bt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, r, n) {
    const s = this;
    function o(c, u, a) {
      const d = q(u);
      if (!d) throw new Error("header name must be a non-empty string");
      const h = l.findKey(s, d);
      (!h || s[h] === void 0 || a === !0 || (a === void 0 && s[h] !== !1)) &&
        (s[h || u] = ot(c));
    }
    const i = (c, u) => l.forEach(c, (a, d) => o(a, d, u));
    return (
      l.isPlainObject(t) || t instanceof this.constructor
        ? i(t, r)
        : l.isString(t) && (t = t.trim()) && !qr(t)
        ? i(Ir(t), r)
        : t != null && o(r, t, n),
      this
    );
  }
  get(t, r) {
    if (((t = q(t)), t)) {
      const n = l.findKey(this, t);
      if (n) {
        const s = this[n];
        if (!r) return s;
        if (r === !0) return Jr(s);
        if (l.isFunction(r)) return r.call(this, s, n);
        if (l.isRegExp(r)) return r.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, r) {
    if (((t = q(t)), t)) {
      const n = l.findKey(this, t);
      return !!(n && (!r || se(this, this[n], n, r)));
    }
    return !1;
  }
  delete(t, r) {
    const n = this;
    let s = !1;
    function o(i) {
      if (((i = q(i)), i)) {
        const c = l.findKey(n, i);
        c && (!r || se(n, n[c], c, r)) && (delete n[c], (s = !0));
      }
    }
    return l.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const r = this,
      n = {};
    return (
      l.forEach(this, (s, o) => {
        const i = l.findKey(n, o);
        if (i) {
          (r[i] = ot(s)), delete r[o];
          return;
        }
        const c = t ? Vr(o) : String(o).trim();
        c !== o && delete r[o], (r[c] = ot(s)), (n[c] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const r = /* @__PURE__ */ Object.create(null);
    return (
      l.forEach(this, (n, s) => {
        n != null && n !== !1 && (r[s] = t && l.isArray(n) ? n.join(", ") : n);
      }),
      r
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, r]) => t + ": " + r).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...r) {
    const n = new this(t);
    return r.forEach((s) => n.set(s)), n;
  }
  static accessor(t) {
    const n = (this[ne] = this[ne] =
        {
          accessors: {},
        }).accessors,
      s = this.prototype;
    function o(i) {
      const c = q(i);
      n[c] || (Kr(s, i), (n[c] = !0));
    }
    return l.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
bt.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
]);
l.freezeMethods(bt.prototype);
l.freezeMethods(bt);
const O = bt;
function St(e, t) {
  const r = this || jt,
    n = t || r,
    s = O.from(n.headers);
  let o = n.data;
  return (
    l.forEach(e, function (c) {
      o = c.call(r, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function Re(e) {
  return !!(e && e.__CANCEL__);
}
function tt(e, t, r) {
  g.call(this, e == null ? "canceled" : e, g.ERR_CANCELED, t, r),
    (this.name = "CanceledError");
}
l.inherits(tt, g, {
  __CANCEL__: !0,
});
const Wr = null;
function Xr(e, t, r) {
  const n = r.config.validateStatus;
  !r.status || !n || n(r.status)
    ? e(r)
    : t(
        new g(
          "Request failed with status code " + r.status,
          [g.ERR_BAD_REQUEST, g.ERR_BAD_RESPONSE][
            Math.floor(r.status / 100) - 4
          ],
          r.config,
          r.request,
          r
        )
      );
}
const Zr = x.isStandardBrowserEnv
  ? (function () {
      return {
        write: function (r, n, s, o, i, c) {
          const u = [];
          u.push(r + "=" + encodeURIComponent(n)),
            l.isNumber(s) && u.push("expires=" + new Date(s).toGMTString()),
            l.isString(o) && u.push("path=" + o),
            l.isString(i) && u.push("domain=" + i),
            c === !0 && u.push("secure"),
            (document.cookie = u.join("; "));
        },
        read: function (r) {
          const n = document.cookie.match(
            new RegExp("(^|;\\s*)(" + r + ")=([^;]*)")
          );
          return n ? decodeURIComponent(n[3]) : null;
        },
        remove: function (r) {
          this.write(r, "", Date.now() - 864e5);
        },
      };
    })()
  : (function () {
      return {
        write: function () {},
        read: function () {
          return null;
        },
        remove: function () {},
      };
    })();
function Qr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Yr(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Pe(e, t) {
  return e && !Qr(t) ? Yr(e, t) : t;
}
const Gr = x.isStandardBrowserEnv
  ? (function () {
      const t = /(msie|trident)/i.test(navigator.userAgent),
        r = document.createElement("a");
      let n;
      function s(o) {
        let i = o;
        return (
          t && (r.setAttribute("href", i), (i = r.href)),
          r.setAttribute("href", i),
          {
            href: r.href,
            protocol: r.protocol ? r.protocol.replace(/:$/, "") : "",
            host: r.host,
            search: r.search ? r.search.replace(/^\?/, "") : "",
            hash: r.hash ? r.hash.replace(/^#/, "") : "",
            hostname: r.hostname,
            port: r.port,
            pathname:
              r.pathname.charAt(0) === "/" ? r.pathname : "/" + r.pathname,
          }
        );
      }
      return (
        (n = s(window.location.href)),
        function (i) {
          const c = l.isString(i) ? s(i) : i;
          return c.protocol === n.protocol && c.host === n.host;
        }
      );
    })()
  : (function () {
      return function () {
        return !0;
      };
    })();
function tn(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function en(e, t) {
  e = e || 10;
  const r = new Array(e),
    n = new Array(e);
  let s = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (u) {
      const a = Date.now(),
        d = n[o];
      i || (i = a), (r[s] = u), (n[s] = a);
      let h = o,
        m = 0;
      for (; h !== s; ) (m += r[h++]), (h = h % e);
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), a - i < t)) return;
      const y = d && a - d;
      return y ? Math.round((m * 1e3) / y) : void 0;
    }
  );
}
function ie(e, t) {
  let r = 0;
  const n = en(50, 250);
  return (s) => {
    const o = s.loaded,
      i = s.lengthComputable ? s.total : void 0,
      c = o - r,
      u = n(c),
      a = o <= i;
    r = o;
    const d = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && i && a ? (i - o) / u : void 0,
      event: s,
    };
    (d[t ? "download" : "upload"] = !0), e(d);
  };
}
const rn = typeof XMLHttpRequest < "u",
  nn =
    rn &&
    function (e) {
      return new Promise(function (r, n) {
        let s = e.data;
        const o = O.from(e.headers).normalize(),
          i = e.responseType;
        let c;
        function u() {
          e.cancelToken && e.cancelToken.unsubscribe(c),
            e.signal && e.signal.removeEventListener("abort", c);
        }
        l.isFormData(s) && x.isStandardBrowserEnv && o.setContentType(!1);
        let a = new XMLHttpRequest();
        if (e.auth) {
          const y = e.auth.username || "",
            p = e.auth.password
              ? unescape(encodeURIComponent(e.auth.password))
              : "";
          o.set("Authorization", "Basic " + btoa(y + ":" + p));
        }
        const d = Pe(e.baseURL, e.url);
        a.open(e.method.toUpperCase(), xe(d, e.params, e.paramsSerializer), !0),
          (a.timeout = e.timeout);
        function h() {
          if (!a) return;
          const y = O.from(
              "getAllResponseHeaders" in a && a.getAllResponseHeaders()
            ),
            f = {
              data:
                !i || i === "text" || i === "json"
                  ? a.responseText
                  : a.response,
              status: a.status,
              statusText: a.statusText,
              headers: y,
              config: e,
              request: a,
            };
          Xr(
            function (w) {
              r(w), u();
            },
            function (w) {
              n(w), u();
            },
            f
          ),
            (a = null);
        }
        if (
          ("onloadend" in a
            ? (a.onloadend = h)
            : (a.onreadystatechange = function () {
                !a ||
                  a.readyState !== 4 ||
                  (a.status === 0 &&
                    !(a.responseURL && a.responseURL.indexOf("file:") === 0)) ||
                  setTimeout(h);
              }),
          (a.onabort = function () {
            !a ||
              (n(new g("Request aborted", g.ECONNABORTED, e, a)), (a = null));
          }),
          (a.onerror = function () {
            n(new g("Network Error", g.ERR_NETWORK, e, a)), (a = null);
          }),
          (a.ontimeout = function () {
            let p = e.timeout
              ? "timeout of " + e.timeout + "ms exceeded"
              : "timeout exceeded";
            const f = e.transitional || Oe;
            e.timeoutErrorMessage && (p = e.timeoutErrorMessage),
              n(
                new g(
                  p,
                  f.clarifyTimeoutError ? g.ETIMEDOUT : g.ECONNABORTED,
                  e,
                  a
                )
              ),
              (a = null);
          }),
          x.isStandardBrowserEnv)
        ) {
          const y =
            (e.withCredentials || Gr(d)) &&
            e.xsrfCookieName &&
            Zr.read(e.xsrfCookieName);
          y && o.set(e.xsrfHeaderName, y);
        }
        s === void 0 && o.setContentType(null),
          "setRequestHeader" in a &&
            l.forEach(o.toJSON(), function (p, f) {
              a.setRequestHeader(f, p);
            }),
          l.isUndefined(e.withCredentials) ||
            (a.withCredentials = !!e.withCredentials),
          i && i !== "json" && (a.responseType = e.responseType),
          typeof e.onDownloadProgress == "function" &&
            a.addEventListener("progress", ie(e.onDownloadProgress, !0)),
          typeof e.onUploadProgress == "function" &&
            a.upload &&
            a.upload.addEventListener("progress", ie(e.onUploadProgress)),
          (e.cancelToken || e.signal) &&
            ((c = (y) => {
              !a ||
                (n(!y || y.type ? new tt(null, e, a) : y),
                a.abort(),
                (a = null));
            }),
            e.cancelToken && e.cancelToken.subscribe(c),
            e.signal &&
              (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)));
        const m = tn(d);
        if (m && x.protocols.indexOf(m) === -1) {
          n(new g("Unsupported protocol " + m + ":", g.ERR_BAD_REQUEST, e));
          return;
        }
        a.send(s || null);
      });
    },
  at = {
    http: Wr,
    xhr: nn,
  };
l.forEach(at, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const sn = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let r, n;
    for (
      let s = 0;
      s < t && ((r = e[s]), !(n = l.isString(r) ? at[r.toLowerCase()] : r));
      s++
    );
    if (!n)
      throw n === !1
        ? new g(
            `Adapter ${r} is not supported by the environment`,
            "ERR_NOT_SUPPORT"
          )
        : new Error(
            l.hasOwnProp(at, r)
              ? `Adapter '${r}' is not available in the build`
              : `Unknown adapter '${r}'`
          );
    if (!l.isFunction(n)) throw new TypeError("adapter is not a function");
    return n;
  },
  adapters: at,
};
function xt(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new tt();
}
function oe(e) {
  return (
    xt(e),
    (e.headers = O.from(e.headers)),
    (e.data = St.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    sn
      .getAdapter(e.adapter || jt.adapter)(e)
      .then(
        function (n) {
          return (
            xt(e),
            (n.data = St.call(e, e.transformResponse, n)),
            (n.headers = O.from(n.headers)),
            n
          );
        },
        function (n) {
          return (
            Re(n) ||
              (xt(e),
              n &&
                n.response &&
                ((n.response.data = St.call(
                  e,
                  e.transformResponse,
                  n.response
                )),
                (n.response.headers = O.from(n.response.headers)))),
            Promise.reject(n)
          );
        }
      )
  );
}
const ae = (e) => (e instanceof O ? e.toJSON() : e);
function Z(e, t) {
  t = t || {};
  const r = {};
  function n(a, d, h) {
    return l.isPlainObject(a) && l.isPlainObject(d)
      ? l.merge.call({ caseless: h }, a, d)
      : l.isPlainObject(d)
      ? l.merge({}, d)
      : l.isArray(d)
      ? d.slice()
      : d;
  }
  function s(a, d, h) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(a)) return n(void 0, a, h);
    } else return n(a, d, h);
  }
  function o(a, d) {
    if (!l.isUndefined(d)) return n(void 0, d);
  }
  function i(a, d) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(a)) return n(void 0, a);
    } else return n(void 0, d);
  }
  function c(a, d, h) {
    if (h in t) return n(a, d);
    if (h in e) return n(void 0, a);
  }
  const u = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: c,
    headers: (a, d) => s(ae(a), ae(d), !0),
  };
  return (
    l.forEach(Object.keys(e).concat(Object.keys(t)), function (d) {
      const h = u[d] || s,
        m = h(e[d], t[d], d);
      (l.isUndefined(m) && h !== c) || (r[d] = m);
    }),
    r
  );
}
const Te = "1.2.0",
  Ht = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Ht[e] = function (n) {
      return typeof n === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const le = {};
Ht.transitional = function (t, r, n) {
  function s(o, i) {
    return (
      "[Axios v" +
      Te +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (n ? ". " + n : "")
    );
  }
  return (o, i, c) => {
    if (t === !1)
      throw new g(
        s(i, " has been removed" + (r ? " in " + r : "")),
        g.ERR_DEPRECATED
      );
    return (
      r &&
        !le[i] &&
        ((le[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              r +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, c) : !0
    );
  };
};
function on(e, t, r) {
  if (typeof e != "object")
    throw new g("options must be an object", g.ERR_BAD_OPTION_VALUE);
  const n = Object.keys(e);
  let s = n.length;
  for (; s-- > 0; ) {
    const o = n[s],
      i = t[o];
    if (i) {
      const c = e[o],
        u = c === void 0 || i(c, o, e);
      if (u !== !0)
        throw new g("option " + o + " must be " + u, g.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (r !== !0) throw new g("Unknown option " + o, g.ERR_BAD_OPTION);
  }
}
const Pt = {
    assertOptions: on,
    validators: Ht,
  },
  P = Pt.validators;
class ht {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = {
        request: new re(),
        response: new re(),
      });
  }
  request(t, r) {
    typeof t == "string" ? ((r = r || {}), (r.url = t)) : (r = t || {}),
      (r = Z(this.defaults, r));
    const { transitional: n, paramsSerializer: s, headers: o } = r;
    n !== void 0 &&
      Pt.assertOptions(
        n,
        {
          silentJSONParsing: P.transitional(P.boolean),
          forcedJSONParsing: P.transitional(P.boolean),
          clarifyTimeoutError: P.transitional(P.boolean),
        },
        !1
      ),
      s !== void 0 &&
        Pt.assertOptions(
          s,
          {
            encode: P.function,
            serialize: P.function,
          },
          !0
        ),
      (r.method = (r.method || this.defaults.method || "get").toLowerCase());
    let i;
    (i = o && l.merge(o.common, o[r.method])),
      i &&
        l.forEach(
          ["delete", "get", "head", "post", "put", "patch", "common"],
          (p) => {
            delete o[p];
          }
        ),
      (r.headers = O.concat(i, o));
    const c = [];
    let u = !0;
    this.interceptors.request.forEach(function (f) {
      (typeof f.runWhen == "function" && f.runWhen(r) === !1) ||
        ((u = u && f.synchronous), c.unshift(f.fulfilled, f.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function (f) {
      a.push(f.fulfilled, f.rejected);
    });
    let d,
      h = 0,
      m;
    if (!u) {
      const p = [oe.bind(this), void 0];
      for (
        p.unshift.apply(p, c),
          p.push.apply(p, a),
          m = p.length,
          d = Promise.resolve(r);
        h < m;

      )
        d = d.then(p[h++], p[h++]);
      return d;
    }
    m = c.length;
    let y = r;
    for (h = 0; h < m; ) {
      const p = c[h++],
        f = c[h++];
      try {
        y = p(y);
      } catch (A) {
        f.call(this, A);
        break;
      }
    }
    try {
      d = oe.call(this, y);
    } catch (p) {
      return Promise.reject(p);
    }
    for (h = 0, m = a.length; h < m; ) d = d.then(a[h++], a[h++]);
    return d;
  }
  getUri(t) {
    t = Z(this.defaults, t);
    const r = Pe(t.baseURL, t.url);
    return xe(r, t.params, t.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function (t) {
  ht.prototype[t] = function (r, n) {
    return this.request(
      Z(n || {}, {
        method: t,
        url: r,
        data: (n || {}).data,
      })
    );
  };
});
l.forEach(["post", "put", "patch"], function (t) {
  function r(n) {
    return function (o, i, c) {
      return this.request(
        Z(c || {}, {
          method: t,
          headers: n
            ? {
                "Content-Type": "multipart/form-data",
              }
            : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (ht.prototype[t] = r()), (ht.prototype[t + "Form"] = r(!0));
});
const lt = ht;
class Ft {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let r;
    this.promise = new Promise(function (o) {
      r = o;
    });
    const n = this;
    this.promise.then((s) => {
      if (!n._listeners) return;
      let o = n._listeners.length;
      for (; o-- > 0; ) n._listeners[o](s);
      n._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const i = new Promise((c) => {
          n.subscribe(c), (o = c);
        }).then(s);
        return (
          (i.cancel = function () {
            n.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, c) {
        n.reason || ((n.reason = new tt(o, i, c)), r(n.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const r = this._listeners.indexOf(t);
    r !== -1 && this._listeners.splice(r, 1);
  }
  static source() {
    let t;
    return {
      token: new Ft(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
}
const an = Ft;
function ln(e) {
  return function (r) {
    return e.apply(null, r);
  };
}
function cn(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
function Ne(e) {
  const t = new lt(e),
    r = fe(lt.prototype.request, t);
  return (
    l.extend(r, lt.prototype, t, { allOwnKeys: !0 }),
    l.extend(r, t, null, { allOwnKeys: !0 }),
    (r.create = function (s) {
      return Ne(Z(e, s));
    }),
    r
  );
}
const v = Ne(jt);
v.Axios = lt;
v.CanceledError = tt;
v.CancelToken = an;
v.isCancel = Re;
v.VERSION = Te;
v.toFormData = yt;
v.AxiosError = g;
v.Cancel = v.CanceledError;
v.all = function (t) {
  return Promise.all(t);
};
v.spread = ln;
v.isAxiosError = cn;
v.AxiosHeaders = O;
v.formToJSON = (e) => Ce(l.isHTMLForm(e) ? new FormData(e) : e);
v.default = v;
const un = v,
  et = z`
  .d-flex {
    display: flex;
    flex-wrap: wrap;
  }
  .w-inherit {
    width: inherit;
  }
  .w-50 {
    width: 50%;
  }
  .w-100 {
    width: 100%;
  }
  .h-50 {
    height: 50%;
  }
  .h-80 {
    height: 80%;
  }
  .h-20 {
    height: 20%;
  }
  .h-100 {
    height: 100%;
  }
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .align-items-center {
    align-items: center;
  }
  .align-content-space {
    align-content: space-between;
  }
  .justify-content-center {
    justify-content: center;
  }
  .bg-transparent {
    background: transparent;
  }
  .color-grey {
    color: grey !important;
  }
  .header-btn {
    background: transparent;
    color: grey;
    border: unset;
    outline: unset;
    border-radius: 5px;
    padding: 0.3rem 0.5rem;
  }
  .header-btn:hover {
    background: lightgrey;
  }

  .divider-h {
    border: 1px solid black;
    width: 100%;
    margin: 0.5rem 0;
  }

  .base-btn {
    background: transparent;
    color: black;
    border: unset;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .fixed-bottom {
    position: absolute;
    bottom: 0;
  }
`;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const hn = (e, t, r) => {
  for (const n of t) if (n[0] === e) return (0, n[1])();
  return r == null ? void 0 : r();
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* De(e, t) {
  if (e !== void 0) {
    let r = 0;
    for (const n of e) yield t(n, r++);
  }
}
var dn = Object.defineProperty,
  pn = Object.getOwnPropertyDescriptor,
  Ue = (e, t, r, n) => {
    for (
      var s = n > 1 ? void 0 : n ? pn(t, r) : t, o = e.length - 1, i;
      o >= 0;
      o--
    )
      (i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
    return n && s && dn(t, r, s), s;
  };
let dt = class extends S {
  render() {
    var e, t;
    return E` <div class="category-panel-wrapper">
            <h4 class="category-panel-title">${
              ((e = this.categoryData) == null ? void 0 : e.title) ||
              "Category Title"
            }</h4>
            < div class="divider-h"></div>
            <div class="integrations-logos d-flex">
            
            ${De(
              (t = this.categoryData) == null ? void 0 : t.integrationList,
              (r, n) => E`
                <div class="integration-logo" key=${n}>
                  ${
                    r != null && r.smallLogo
                      ? E`<img
                        src=${r.smallLogo}
                        alt=${r.title || "Integrayion Lgo"}
                      />`
                      : null
                  }
                  <div></div>
                </div>
              `
            )}</div>
    
    </div> `;
  }
};
dt.styles = [
  et,
  z`
      .category-panel-wrapper {
        border: 1px solid lightgrey;
        border-radius: 5px;
        width: 100%;
      }

      .integrations-logos {
        padding: 0.5rem 0.3rem;
      }
      .integration-logo {
        border: 1px solid lightgrey;
        border-raidus: 5px;
      }
    `,
];
Ue([_({ reflect: !0 })], dt.prototype, "categoryData", 2);
dt = Ue([Y("category-panel")], dt);
var fn = Object.defineProperty,
  mn = Object.getOwnPropertyDescriptor,
  Le = (e, t, r, n) => {
    for (
      var s = n > 1 ? void 0 : n ? mn(t, r) : t, o = e.length - 1, i;
      o >= 0;
      o--
    )
      (i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
    return n && s && fn(t, r, s), s;
  };
let pt = class extends S {
  constructor() {
    super(...arguments), (this.categoryList = []);
  }
  render() {
    return E`
      <div class="category-selection-step">
        <div class="category-selection-step-header">
          <h3 class="category-selection-title text-center w-100">
            Select Category
          </h3>
          <h6 class="category-selection-description w-100 text-center">
            Click to see available integration options
          </h6>
        </div>
        <div class="category-panel-list">
          ${De(
            this.categoryList,
            (e, t) => E`
              <category-panel
                @click=${this._setSelectedCategory(e.title)}
                categoryData=${e}
                key=${t}
              ></category-panel>
            `
          )}
        </div>
      </div>
    `;
  }
  _setSelectedCategory(e) {
    const t = new CustomEvent("selectCategory", {
      bubbles: !0,
      detail: {
        categoryTitle: e,
      },
    });
    this.dispatchEvent(t);
  }
};
pt.styles = [
  et,
  z`
      category-selection-step-header {
        padding: 1rem 0;
      }
      .category-selection-title {
        font-size: 2.5rem;
        padding: 1rem 0;
      }
    `,
];
Le([_()], pt.prototype, "categoryList", 2);
pt = Le([Y("category-selection")], pt);
var yn = Object.defineProperty,
  gn = Object.getOwnPropertyDescriptor,
  bn = (e, t, r, n) => {
    for (
      var s = n > 1 ? void 0 : n ? gn(t, r) : t, o = e.length - 1, i;
      o >= 0;
      o--
    )
      (i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
    return n && s && yn(t, r, s), s;
  };
let Tt = class extends S {
  render() {
    return E` <div class="integration-selection-step"></div> `;
  }
};
Tt.styles = [et, z``];
Tt = bn([Y("integration-selection")], Tt);
var En = Object.defineProperty,
  vn = Object.getOwnPropertyDescriptor,
  rt = (e, t, r, n) => {
    for (
      var s = n > 1 ? void 0 : n ? vn(t, r) : t, o = e.length - 1, i;
      o >= 0;
      o--
    )
      (i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
    return n && s && En(t, r, s), s;
  };
let U = class extends S {
  constructor() {
    super(...arguments),
      (this.step = 0),
      (this.appsDataLoaded = !1),
      (this.appsData = []),
      (this.appsApiError = !1);
  }
  render() {
    return E`
      <div class="dialog-wrapper" role="dialog">
        <div class="popup-container">
          ${
            this.appsDataLoaded
              ? this.appsApiError
                ? E`
                  <div class="h-80 d-flex align-items-center w-100">
                    <h4 class="w-inherit text-center">
                      There is some issue with token
                    </h4>
                  </div>

                  <div
                    @click="${this._forceExit}"
                    class="exit-btn-wrapper fixed-bottom cursor-pointer w-inherit align-items-center justify-content-center d-flex "
                  >
                    <button class="base-btn color-grey">Exit</button>
                  </div>
                `
                : E`
                  <div class="popup-header d-flex">
                    <div class="header-left w-50  text-left">
                      ${
                        this.step == 0
                          ? E``
                          : E`<button
                            class="header-btn bg-transparent color-grey back-btn"
                            @click="${this._back}"
                          >
                            < Back
                          </button>`
                      }
                    </div>
                    <div class="header-right w-50 text-right">
                      <div
                        class="header-btn close-btn "
                        @click="${this._togglePopup}"
                      >
                        X
                      </div>
                    </div>
                  </div>
                  ${hn(this.step, [
                    [
                      0,
                      () => E`<category-selection
                          categoryList="${this.appsData}"
                          @nextStep=${this._nextStep}
                          @selectCategory=${this._setSelectedCategory}
                        ></category-selection>`,
                    ],
                    [
                      1,
                      () => E`<integration-selection
                          @nextStep=${this._nextStep}
                        ></integration-selection>`,
                    ],
                  ])}
                `
              : E`<div class="full-page-wrapper  align-items-center">
                <h4 class="w-100 text-center">Loading...</h4>
              </div>`
          }
        </div>
      </div>
    `;
  }
  _togglePopup(e) {
    e == null || e.preventDefault();
    const t = new CustomEvent("togglePopup", {
      bubbles: !0,
    });
    this.dispatchEvent(t);
  }
  _setSelectedCategory(e) {
    var t;
    e == null || e.preventDefault(),
      console.log(
        (t = e == null ? void 0 : e.detail) == null ? void 0 : t.categoryTitle
      );
  }
  _nextStep(e) {
    e == null || e.preventDefault(), (this.step = this.step + 1);
  }
  _prevStep(e) {
    e == null || e.preventDefault(), (this.step = this.step - 1);
  }
  _refreshAccess(e) {
    e == null || e.preventDefault();
    const t = new CustomEvent("refreshAccess", {
      bubbles: !0,
    });
    this.dispatchEvent(t);
  }
  _forceExit(e) {
    this._togglePopup(e), this._refreshAccess(e);
  }
  _back(e) {
    e == null || e.preventDefault(), this.step > 0 && this._prevStep(null);
  }
};
U.styles = [
  et,
  z`
      .dialog-wrapper {
        height: 100vh;
        width: 100vw;
        z-index: 200;
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;

        background-color: rgba(33, 33, 33, 0.46);
        border-color: rgb(33, 33, 33);
      }
      .popup-container {
        background: white;
        padding: 1rem;
        position: relative;
        min-height: 400px;
        height: 100%;
        max-height: 720px;
        width: 375px;
        border-radius: 12px;
        box-shadow: rgb(0 0 0 / 15%) 0px 2px 20px, rgb(0 0 0 / 10%) 0px 2px 5px;
      }
      .close-btn {
        float: right;
        color: grey;
        cursor: pointer;
        padding: 0.2rem;
      }
      .full-page-wrapper {
        height: 100%;
      }

      .exit-btn-wrapper {
        padding: 1rem 0;
        border: 2px solid transparent;
        border-radius: 5px;
      }
      .exit-btn-wrapper:hover {
        border-color: lightgrey;
      }
    `,
];
rt([_({ type: Number, state: !0 })], U.prototype, "step", 2);
rt([_({ type: Boolean })], U.prototype, "appsDataLoaded", 2);
rt([_()], U.prototype, "appsData", 2);
rt([_({ type: Boolean })], U.prototype, "appsApiError", 2);
U = rt([Y("knit-popup")], U);
var _n = Object.defineProperty,
  wn = Object.getOwnPropertyDescriptor,
  R = (e, t, r, n) => {
    for (
      var s = n > 1 ? void 0 : n ? wn(t, r) : t, o = e.length - 1, i;
      o >= 0;
      o--
    )
      (i = e[o]) && (s = (n ? i(t, r, s) : i(s)) || s);
    return n && s && _n(t, r, s), s;
  };
let $ = class extends S {
  constructor() {
    super(...arguments),
      (this.docsHint = "Click on the Vite and Lit logos to learn more"),
      (this.isReady = !1),
      (this.count = 0),
      (this.knitKey = ""),
      (this.popupEnabled = !1),
      (this.appsDataLoaded = !1),
      (this.appsData = []),
      (this.appsApiError = !1);
  }
  render() {
    return E`
      <div class="component-wrapper">
        ${
          this.popupEnabled
            ? E`
              <knit-popup
                appsDataLoaded=${this.appsDataLoaded}
                appsApiError=${this.appsApiError}
                @togglePopup=${this._togglePopup}
                @refreshAccess=${this._refreshAccess}
              ></knit-popup>
            `
            : ""
        }
        Hi
        ${E`<slot name="initiator" @click=${this._onInitiatorClick}></slot>`}
      </div>
    `;
  }
  _onInitiatorClick(e) {
    e.preventDefault,
      console.log("clicked", this.isReady, "key", this.knitKey),
      this.isReady && this._togglePopup(null);
  }
  _togglePopup(e) {
    e == null || e.preventDefault(), (this.popupEnabled = !this.popupEnabled);
  }
  _refreshAccess(e) {
    console.log("refresh event called "), e == null || e.preventDefault();
    const t = new CustomEvent("refreshKnitCall", {
      detail: {
        id: "adakwhdkajhd",
      },
    });
    this.dispatchEvent(t);
  }
  updated(e) {
    e.has("knitKey") &&
      this.knitKey.length > 0 &&
      !this.isReady &&
      (this.isReady = !0),
      e.has("popupEnabled") && this.popupEnabled && this._fetchAppsData();
  }
  _fetchAppsData() {
    console.log("Fetching Apps Data"),
      un
        .get("apiCall")
        .then((e) => {
          var t;
          console.log(e == null ? void 0 : e.data),
            (this.appsData =
              ((t = e == null ? void 0 : e.data) == null ? void 0 : t.apps) ||
              []);
        })
        .catch((e) => {
          console.error(e), (this.appsApiError = !0);
        })
        .finally(() => {
          this.appsDataLoaded = !0;
        });
  }
};
$.styles = [
  et,
  z`
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }

      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.lit:hover {
        filter: drop-shadow(0 0 2em #325cffaa);
      }

      .card {
        padding: 2em;
      }

      .read-the-docs {
        color: #888;
      }

      h3 {
        font-size: 3.2em;
        line-height: 1.1;
      }

      a {
        font-weight: 500;
        color: #646cff;
        text-decoration: inherit;
      }
      a:hover {
        color: #535bf2;
      }

      button {
        border-radius: 8px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        font-family: inherit;
        background-color: #1a1a1a;
        cursor: pointer;
        transition: border-color 0.25s;
      }
      button:hover {
        border-color: #646cff;
      }
      button:focus,
      button:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
      }

      @media (prefers-color-scheme: light) {
        a:hover {
          color: #747bff;
        }
        button {
          background-color: #f9f9f9;
        }
      }
    `,
];
R([_()], $.prototype, "docsHint", 2);
R([_({ type: Boolean, state: !0 })], $.prototype, "isReady", 2);
R([_({ type: Number, state: !0 })], $.prototype, "count", 2);
R([_({ type: String })], $.prototype, "knitKey", 2);
R([_({ type: Boolean, state: !0 })], $.prototype, "popupEnabled", 2);
R([_({ type: Boolean, state: !0 })], $.prototype, "appsDataLoaded", 2);
R([_()], $.prototype, "appsData", 2);
R([_({ type: Boolean, state: !0 })], $.prototype, "appsApiError", 2);
$ = R([Y("knit-auth")], $);
export { $ as KnitAuth };
