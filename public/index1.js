/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const st = window, Nt = st.ShadowRoot && (st.ShadyCSS === void 0 || st.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Dt = Symbol(), Mt = /* @__PURE__ */ new WeakMap();
class ce {
  constructor(t, n, r) {
    if (this._$cssResult$ = !0, r !== Dt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = n;
  }
  get styleSheet() {
    let t = this.o;
    const n = this.t;
    if (Nt && t === void 0) {
      const r = n !== void 0 && n.length === 1;
      r && (t = Mt.get(n)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Mt.set(n, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const Be = (e) => new ce(typeof e == "string" ? e : e + "", void 0, Dt), z = (e, ...t) => {
  const n = e.length === 1 ? e[0] : t.reduce((r, s, o) => r + ((i) => {
    if (i._$cssResult$ === !0)
      return i.cssText;
    if (typeof i == "number")
      return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s) + e[o + 1], e[0]);
  return new ce(n, e, Dt);
}, je = (e, t) => {
  Nt ? e.adoptedStyleSheets = t.map((n) => n instanceof CSSStyleSheet ? n : n.styleSheet) : t.forEach((n) => {
    const r = document.createElement("style"), s = st.litNonce;
    s !== void 0 && r.setAttribute("nonce", s), r.textContent = n.cssText, e.appendChild(r);
  });
}, zt = Nt ? (e) => e : (e) => e instanceof CSSStyleSheet ? ((t) => {
  let n = "";
  for (const r of t.cssRules)
    n += r.cssText;
  return Be(n);
})(e) : e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Et;
const ct = window, It = ct.trustedTypes, He = It ? It.emptyScript : "", Kt = ct.reactiveElementPolyfillSupport, Ot = { toAttribute(e, t) {
  switch (t) {
    case Boolean:
      e = e ? He : null;
      break;
    case Object:
    case Array:
      e = e == null ? e : JSON.stringify(e);
  }
  return e;
}, fromAttribute(e, t) {
  let n = e;
  switch (t) {
    case Boolean:
      n = e !== null;
      break;
    case Number:
      n = e === null ? null : Number(e);
      break;
    case Object:
    case Array:
      try {
        n = JSON.parse(e);
      } catch {
        n = null;
      }
  }
  return n;
} }, ue = (e, t) => t !== e && (t == t || e == e), vt = { attribute: !0, type: String, converter: Ot, reflect: !1, hasChanged: ue };
class k extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = !1, this.hasUpdated = !1, this._$El = null, this.u();
  }
  static addInitializer(t) {
    var n;
    this.finalize(), ((n = this.h) !== null && n !== void 0 ? n : this.h = []).push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((n, r) => {
      const s = this._$Ep(r, n);
      s !== void 0 && (this._$Ev.set(s, r), t.push(s));
    }), t;
  }
  static createProperty(t, n = vt) {
    if (n.state && (n.attribute = !1), this.finalize(), this.elementProperties.set(t, n), !n.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const r = typeof t == "symbol" ? Symbol() : "__" + t, s = this.getPropertyDescriptor(t, r, n);
      s !== void 0 && Object.defineProperty(this.prototype, t, s);
    }
  }
  static getPropertyDescriptor(t, n, r) {
    return { get() {
      return this[n];
    }, set(s) {
      const o = this[t];
      this[n] = s, this.requestUpdate(t, o, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || vt;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (t.finalize(), t.h !== void 0 && (this.h = [...t.h]), this.elementProperties = new Map(t.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const n = this.properties, r = [...Object.getOwnPropertyNames(n), ...Object.getOwnPropertySymbols(n)];
      for (const s of r)
        this.createProperty(s, n[s]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }
  static finalizeStyles(t) {
    const n = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const s of r)
        n.unshift(zt(s));
    } else
      t !== void 0 && n.push(zt(t));
    return n;
  }
  static _$Ep(t, n) {
    const r = n.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  u() {
    var t;
    this._$E_ = new Promise((n) => this.enableUpdating = n), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), (t = this.constructor.h) === null || t === void 0 || t.forEach((n) => n(this));
  }
  addController(t) {
    var n, r;
    ((n = this._$ES) !== null && n !== void 0 ? n : this._$ES = []).push(t), this.renderRoot !== void 0 && this.isConnected && ((r = t.hostConnected) === null || r === void 0 || r.call(t));
  }
  removeController(t) {
    var n;
    (n = this._$ES) === null || n === void 0 || n.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, n) => {
      this.hasOwnProperty(n) && (this._$Ei.set(n, this[n]), delete this[n]);
    });
  }
  createRenderRoot() {
    var t;
    const n = (t = this.shadowRoot) !== null && t !== void 0 ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return je(n, this.constructor.elementStyles), n;
  }
  connectedCallback() {
    var t;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
      var r;
      return (r = n.hostConnected) === null || r === void 0 ? void 0 : r.call(n);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$ES) === null || t === void 0 || t.forEach((n) => {
      var r;
      return (r = n.hostDisconnected) === null || r === void 0 ? void 0 : r.call(n);
    });
  }
  attributeChangedCallback(t, n, r) {
    this._$AK(t, r);
  }
  _$EO(t, n, r = vt) {
    var s;
    const o = this.constructor._$Ep(t, r);
    if (o !== void 0 && r.reflect === !0) {
      const i = (((s = r.converter) === null || s === void 0 ? void 0 : s.toAttribute) !== void 0 ? r.converter : Ot).toAttribute(n, r.type);
      this._$El = t, i == null ? this.removeAttribute(o) : this.setAttribute(o, i), this._$El = null;
    }
  }
  _$AK(t, n) {
    var r;
    const s = this.constructor, o = s._$Ev.get(t);
    if (o !== void 0 && this._$El !== o) {
      const i = s.getPropertyOptions(o), c = typeof i.converter == "function" ? { fromAttribute: i.converter } : ((r = i.converter) === null || r === void 0 ? void 0 : r.fromAttribute) !== void 0 ? i.converter : Ot;
      this._$El = o, this[o] = c.fromAttribute(n, i.type), this._$El = null;
    }
  }
  requestUpdate(t, n, r) {
    let s = !0;
    t !== void 0 && (((r = r || this.constructor.getPropertyOptions(t)).hasChanged || ue)(this[t], n) ? (this._$AL.has(t) || this._$AL.set(t, n), r.reflect === !0 && this._$El !== t && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t, r))) : s = !1), !this.isUpdatePending && s && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (n) {
      Promise.reject(n);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((s, o) => this[o] = s), this._$Ei = void 0);
    let n = !1;
    const r = this._$AL;
    try {
      n = this.shouldUpdate(r), n ? (this.willUpdate(r), (t = this._$ES) === null || t === void 0 || t.forEach((s) => {
        var o;
        return (o = s.hostUpdate) === null || o === void 0 ? void 0 : o.call(s);
      }), this.update(r)) : this._$Ek();
    } catch (s) {
      throw n = !1, this._$Ek(), s;
    }
    n && this._$AE(r);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var n;
    (n = this._$ES) === null || n === void 0 || n.forEach((r) => {
      var s;
      return (s = r.hostUpdated) === null || s === void 0 ? void 0 : s.call(r);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
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
    this._$EC !== void 0 && (this._$EC.forEach((n, r) => this._$EO(r, this[r], n)), this._$EC = void 0), this._$Ek();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
k.finalized = !0, k.elementProperties = /* @__PURE__ */ new Map(), k.elementStyles = [], k.shadowRootOptions = { mode: "open" }, Kt == null || Kt({ ReactiveElement: k }), ((Et = ct.reactiveElementVersions) !== null && Et !== void 0 ? Et : ct.reactiveElementVersions = []).push("1.4.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _t;
const ut = window, j = ut.trustedTypes, Jt = j ? j.createPolicy("lit-html", { createHTML: (e) => e }) : void 0, T = `lit$${(Math.random() + "").slice(9)}$`, he = "?" + T, Fe = `<${he}>`, H = document, q = (e = "") => H.createComment(e), V = (e) => e === null || typeof e != "object" && typeof e != "function", de = Array.isArray, Me = (e) => de(e) || typeof (e == null ? void 0 : e[Symbol.iterator]) == "function", K = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Vt = />/g, N = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Wt = /'/g, Xt = /"/g, pe = /^(?:script|style|textarea|title)$/i, ze = (e) => (t, ...n) => ({ _$litType$: e, strings: t, values: n }), E = ze(1), F = Symbol.for("lit-noChange"), b = Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), B = H.createTreeWalker(H, 129, null, !1), Ie = (e, t) => {
  const n = e.length - 1, r = [];
  let s, o = t === 2 ? "<svg>" : "", i = K;
  for (let u = 0; u < n; u++) {
    const a = e[u];
    let d, h, m = -1, y = 0;
    for (; y < a.length && (i.lastIndex = y, h = i.exec(a), h !== null); )
      y = i.lastIndex, i === K ? h[1] === "!--" ? i = qt : h[1] !== void 0 ? i = Vt : h[2] !== void 0 ? (pe.test(h[2]) && (s = RegExp("</" + h[2], "g")), i = N) : h[3] !== void 0 && (i = N) : i === N ? h[0] === ">" ? (i = s != null ? s : K, m = -1) : h[1] === void 0 ? m = -2 : (m = i.lastIndex - h[2].length, d = h[1], i = h[3] === void 0 ? N : h[3] === '"' ? Xt : Wt) : i === Xt || i === Wt ? i = N : i === qt || i === Vt ? i = K : (i = N, s = void 0);
    const p = i === N && e[u + 1].startsWith("/>") ? " " : "";
    o += i === K ? a + Fe : m >= 0 ? (r.push(d), a.slice(0, m) + "$lit$" + a.slice(m) + T + p) : a + T + (m === -2 ? (r.push(void 0), u) : p);
  }
  const c = o + (e[n] || "<?>") + (t === 2 ? "</svg>" : "");
  if (!Array.isArray(e) || !e.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [Jt !== void 0 ? Jt.createHTML(c) : c, r];
};
class W {
  constructor({ strings: t, _$litType$: n }, r) {
    let s;
    this.parts = [];
    let o = 0, i = 0;
    const c = t.length - 1, u = this.parts, [a, d] = Ie(t, n);
    if (this.el = W.createElement(a, r), B.currentNode = this.el.content, n === 2) {
      const h = this.el.content, m = h.firstChild;
      m.remove(), h.append(...m.childNodes);
    }
    for (; (s = B.nextNode()) !== null && u.length < c; ) {
      if (s.nodeType === 1) {
        if (s.hasAttributes()) {
          const h = [];
          for (const m of s.getAttributeNames())
            if (m.endsWith("$lit$") || m.startsWith(T)) {
              const y = d[i++];
              if (h.push(m), y !== void 0) {
                const p = s.getAttribute(y.toLowerCase() + "$lit$").split(T), f = /([.?@])?(.*)/.exec(y);
                u.push({ type: 1, index: o, name: f[2], strings: p, ctor: f[1] === "." ? Je : f[1] === "?" ? Ve : f[1] === "@" ? We : ft });
              } else
                u.push({ type: 6, index: o });
            }
          for (const m of h)
            s.removeAttribute(m);
        }
        if (pe.test(s.tagName)) {
          const h = s.textContent.split(T), m = h.length - 1;
          if (m > 0) {
            s.textContent = j ? j.emptyScript : "";
            for (let y = 0; y < m; y++)
              s.append(h[y], q()), B.nextNode(), u.push({ type: 2, index: ++o });
            s.append(h[m], q());
          }
        }
      } else if (s.nodeType === 8)
        if (s.data === he)
          u.push({ type: 2, index: o });
        else {
          let h = -1;
          for (; (h = s.data.indexOf(T, h + 1)) !== -1; )
            u.push({ type: 7, index: o }), h += T.length - 1;
        }
      o++;
    }
  }
  static createElement(t, n) {
    const r = H.createElement("template");
    return r.innerHTML = t, r;
  }
}
function M(e, t, n = e, r) {
  var s, o, i, c;
  if (t === F)
    return t;
  let u = r !== void 0 ? (s = n._$Co) === null || s === void 0 ? void 0 : s[r] : n._$Cl;
  const a = V(t) ? void 0 : t._$litDirective$;
  return (u == null ? void 0 : u.constructor) !== a && ((o = u == null ? void 0 : u._$AO) === null || o === void 0 || o.call(u, !1), a === void 0 ? u = void 0 : (u = new a(e), u._$AT(e, n, r)), r !== void 0 ? ((i = (c = n)._$Co) !== null && i !== void 0 ? i : c._$Co = [])[r] = u : n._$Cl = u), u !== void 0 && (t = M(e, u._$AS(e, t.values), u, r)), t;
}
class Ke {
  constructor(t, n) {
    this.u = [], this._$AN = void 0, this._$AD = t, this._$AM = n;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t) {
    var n;
    const { el: { content: r }, parts: s } = this._$AD, o = ((n = t == null ? void 0 : t.creationScope) !== null && n !== void 0 ? n : H).importNode(r, !0);
    B.currentNode = o;
    let i = B.nextNode(), c = 0, u = 0, a = s[0];
    for (; a !== void 0; ) {
      if (c === a.index) {
        let d;
        a.type === 2 ? d = new Q(i, i.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(i, a.name, a.strings, this, t) : a.type === 6 && (d = new Xe(i, this, t)), this.u.push(d), a = s[++u];
      }
      c !== (a == null ? void 0 : a.index) && (i = B.nextNode(), c++);
    }
    return o;
  }
  p(t) {
    let n = 0;
    for (const r of this.u)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, n), n += r.strings.length - 2) : r._$AI(t[n])), n++;
  }
}
class Q {
  constructor(t, n, r, s) {
    var o;
    this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t, this._$AB = n, this._$AM = r, this.options = s, this._$Cm = (o = s == null ? void 0 : s.isConnected) === null || o === void 0 || o;
  }
  get _$AU() {
    var t, n;
    return (n = (t = this._$AM) === null || t === void 0 ? void 0 : t._$AU) !== null && n !== void 0 ? n : this._$Cm;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const n = this._$AM;
    return n !== void 0 && t.nodeType === 11 && (t = n.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, n = this) {
    t = M(this, t, n), V(t) ? t === b || t == null || t === "" ? (this._$AH !== b && this._$AR(), this._$AH = b) : t !== this._$AH && t !== F && this.g(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Me(t) ? this.k(t) : this.g(t);
  }
  O(t, n = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, n);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  g(t) {
    this._$AH !== b && V(this._$AH) ? this._$AA.nextSibling.data = t : this.T(H.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var n;
    const { values: r, _$litType$: s } = t, o = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = W.createElement(s.h, this.options)), s);
    if (((n = this._$AH) === null || n === void 0 ? void 0 : n._$AD) === o)
      this._$AH.p(r);
    else {
      const i = new Ke(o, this), c = i.v(this.options);
      i.p(r), this.T(c), this._$AH = i;
    }
  }
  _$AC(t) {
    let n = Zt.get(t.strings);
    return n === void 0 && Zt.set(t.strings, n = new W(t)), n;
  }
  k(t) {
    de(this._$AH) || (this._$AH = [], this._$AR());
    const n = this._$AH;
    let r, s = 0;
    for (const o of t)
      s === n.length ? n.push(r = new Q(this.O(q()), this.O(q()), this, this.options)) : r = n[s], r._$AI(o), s++;
    s < n.length && (this._$AR(r && r._$AB.nextSibling, s), n.length = s);
  }
  _$AR(t = this._$AA.nextSibling, n) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, n); t && t !== this._$AB; ) {
      const s = t.nextSibling;
      t.remove(), t = s;
    }
  }
  setConnected(t) {
    var n;
    this._$AM === void 0 && (this._$Cm = t, (n = this._$AP) === null || n === void 0 || n.call(this, t));
  }
}
class ft {
  constructor(t, n, r, s, o) {
    this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t, this.name = n, this._$AM = s, this.options = o, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = b;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, n = this, r, s) {
    const o = this.strings;
    let i = !1;
    if (o === void 0)
      t = M(this, t, n, 0), i = !V(t) || t !== this._$AH && t !== F, i && (this._$AH = t);
    else {
      const c = t;
      let u, a;
      for (t = o[0], u = 0; u < o.length - 1; u++)
        a = M(this, c[r + u], n, u), a === F && (a = this._$AH[u]), i || (i = !V(a) || a !== this._$AH[u]), a === b ? t = b : t !== b && (t += (a != null ? a : "") + o[u + 1]), this._$AH[u] = a;
    }
    i && !s && this.j(t);
  }
  j(t) {
    t === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t != null ? t : "");
  }
}
class Je extends ft {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === b ? void 0 : t;
  }
}
const qe = j ? j.emptyScript : "";
class Ve extends ft {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    t && t !== b ? this.element.setAttribute(this.name, qe) : this.element.removeAttribute(this.name);
  }
}
class We extends ft {
  constructor(t, n, r, s, o) {
    super(t, n, r, s, o), this.type = 5;
  }
  _$AI(t, n = this) {
    var r;
    if ((t = (r = M(this, t, n, 0)) !== null && r !== void 0 ? r : b) === F)
      return;
    const s = this._$AH, o = t === b && s !== b || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, i = t !== b && (s === b || o);
    o && this.element.removeEventListener(this.name, this, s), i && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var n, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (n = this.options) === null || n === void 0 ? void 0 : n.host) !== null && r !== void 0 ? r : this.element, t) : this._$AH.handleEvent(t);
  }
}
class Xe {
  constructor(t, n, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = n, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const Qt = ut.litHtmlPolyfillSupport;
Qt == null || Qt(W, Q), ((_t = ut.litHtmlVersions) !== null && _t !== void 0 ? _t : ut.litHtmlVersions = []).push("2.4.0");
const Ze = (e, t, n) => {
  var r, s;
  const o = (r = n == null ? void 0 : n.renderBefore) !== null && r !== void 0 ? r : t;
  let i = o._$litPart$;
  if (i === void 0) {
    const c = (s = n == null ? void 0 : n.renderBefore) !== null && s !== void 0 ? s : null;
    o._$litPart$ = i = new Q(t.insertBefore(q(), c), c, void 0, n != null ? n : {});
  }
  return i._$AI(e), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var wt, $t;
class x extends k {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var t, n;
    const r = super.createRenderRoot();
    return (t = (n = this.renderOptions).renderBefore) !== null && t !== void 0 || (n.renderBefore = r.firstChild), r;
  }
  update(t) {
    const n = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ze(n, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) === null || t === void 0 || t.setConnected(!1);
  }
  render() {
    return F;
  }
}
x.finalized = !0, x._$litElement$ = !0, (wt = globalThis.litElementHydrateSupport) === null || wt === void 0 || wt.call(globalThis, { LitElement: x });
const Yt = globalThis.litElementPolyfillSupport;
Yt == null || Yt({ LitElement: x });
(($t = globalThis.litElementVersions) !== null && $t !== void 0 ? $t : globalThis.litElementVersions = []).push("3.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = (e) => (t) => typeof t == "function" ? ((n, r) => (customElements.define(n, r), r))(e, t) : ((n, r) => {
  const { kind: s, elements: o } = r;
  return { kind: s, elements: o, finisher(i) {
    customElements.define(n, i);
  } };
})(e, t);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Qe = (e, t) => t.kind === "method" && t.descriptor && !("value" in t.descriptor) ? { ...t, finisher(n) {
  n.createProperty(t.key, e);
} } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: t.key, initializer() {
  typeof t.initializer == "function" && (this[t.key] = t.initializer.call(this));
}, finisher(n) {
  n.createProperty(t.key, e);
} };
function _(e) {
  return (t, n) => n !== void 0 ? ((r, s, o) => {
    s.constructor.createProperty(o, r);
  })(e, t, n) : Qe(e, t);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var At;
((At = window.HTMLSlotElement) === null || At === void 0 ? void 0 : At.prototype.assignedElements) != null;
function fe(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: me } = Object.prototype, { getPrototypeOf: Ut } = Object, Lt = ((e) => (t) => {
  const n = me.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), C = (e) => (e = e.toLowerCase(), (t) => Lt(t) === e), mt = (e) => (t) => typeof t === e, { isArray: I } = Array, X = mt("undefined");
function Ye(e) {
  return e !== null && !X(e) && e.constructor !== null && !X(e.constructor) && D(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const ye = C("ArrayBuffer");
function Ge(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && ye(e.buffer), t;
}
const tn = mt("string"), D = mt("function"), ge = mt("number"), kt = (e) => e !== null && typeof e == "object", en = (e) => e === !0 || e === !1, it = (e) => {
  if (Lt(e) !== "object")
    return !1;
  const t = Ut(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, nn = C("Date"), rn = C("File"), sn = C("Blob"), on = C("FileList"), an = (e) => kt(e) && D(e.pipe), ln = (e) => {
  const t = "[object FormData]";
  return e && (typeof FormData == "function" && e instanceof FormData || me.call(e) === t || D(e.toString) && e.toString() === t);
}, cn = C("URLSearchParams"), un = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function G(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, s;
  if (typeof e != "object" && (e = [e]), I(e))
    for (r = 0, s = e.length; r < s; r++)
      t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), i = o.length;
    let c;
    for (r = 0; r < i; r++)
      c = o[r], t.call(null, e[c], c, e);
  }
}
function be(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, s;
  for (; r-- > 0; )
    if (s = n[r], t === s.toLowerCase())
      return s;
  return null;
}
const Ee = typeof self > "u" ? typeof global > "u" ? globalThis : global : self, ve = (e) => !X(e) && e !== Ee;
function Rt() {
  const { caseless: e } = ve(this) && this || {}, t = {}, n = (r, s) => {
    const o = e && be(t, s) || s;
    it(t[o]) && it(r) ? t[o] = Rt(t[o], r) : it(r) ? t[o] = Rt({}, r) : I(r) ? t[o] = r.slice() : t[o] = r;
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && G(arguments[r], n);
  return t;
}
const hn = (e, t, n, { allOwnKeys: r } = {}) => (G(t, (s, o) => {
  n && D(s) ? e[o] = fe(s, n) : e[o] = s;
}, { allOwnKeys: r }), e), dn = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), pn = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, fn = (e, t, n, r) => {
  let s, o, i;
  const c = {};
  if (t = t || {}, e == null)
    return t;
  do {
    for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
      i = s[o], (!r || r(i, e, t)) && !c[i] && (t[i] = e[i], c[i] = !0);
    e = n !== !1 && Ut(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, mn = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, yn = (e) => {
  if (!e)
    return null;
  if (I(e))
    return e;
  let t = e.length;
  if (!ge(t))
    return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, gn = ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && Ut(Uint8Array)), bn = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = r.next()) && !s.done; ) {
    const o = s.value;
    t.call(e, o[0], o[1]);
  }
}, En = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, vn = C("HTMLFormElement"), _n = (e) => e.toLowerCase().replace(
  /[_-\s]([a-z\d])(\w*)/g,
  function(n, r, s) {
    return r.toUpperCase() + s;
  }
), Gt = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), wn = C("RegExp"), _e = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  G(n, (s, o) => {
    t(s, o, e) !== !1 && (r[o] = s);
  }), Object.defineProperties(e, r);
}, $n = (e) => {
  _e(e, (t, n) => {
    if (D(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (!!D(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, An = (e, t) => {
  const n = {}, r = (s) => {
    s.forEach((o) => {
      n[o] = !0;
    });
  };
  return I(e) ? r(e) : r(String(e).split(t)), n;
}, Sn = () => {
}, xn = (e, t) => (e = +e, Number.isFinite(e) ? e : t), On = (e) => {
  const t = new Array(10), n = (r, s) => {
    if (kt(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[s] = r;
        const o = I(r) ? [] : {};
        return G(r, (i, c) => {
          const u = n(i, s + 1);
          !X(u) && (o[c] = u);
        }), t[s] = void 0, o;
      }
    }
    return r;
  };
  return n(e, 0);
}, l = {
  isArray: I,
  isArrayBuffer: ye,
  isBuffer: Ye,
  isFormData: ln,
  isArrayBufferView: Ge,
  isString: tn,
  isNumber: ge,
  isBoolean: en,
  isObject: kt,
  isPlainObject: it,
  isUndefined: X,
  isDate: nn,
  isFile: rn,
  isBlob: sn,
  isRegExp: wn,
  isFunction: D,
  isStream: an,
  isURLSearchParams: cn,
  isTypedArray: gn,
  isFileList: on,
  forEach: G,
  merge: Rt,
  extend: hn,
  trim: un,
  stripBOM: dn,
  inherits: pn,
  toFlatObject: fn,
  kindOf: Lt,
  kindOfTest: C,
  endsWith: mn,
  toArray: yn,
  forEachEntry: bn,
  matchAll: En,
  isHTMLForm: vn,
  hasOwnProperty: Gt,
  hasOwnProp: Gt,
  reduceDescriptors: _e,
  freezeMethods: $n,
  toObjectSet: An,
  toCamelCase: _n,
  noop: Sn,
  toFiniteNumber: xn,
  findKey: be,
  global: Ee,
  isContextDefined: ve,
  toJSONObject: On
};
function g(e, t, n, r, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), s && (this.response = s);
}
l.inherits(g, Error, {
  toJSON: function() {
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
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const we = g.prototype, $e = {};
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
  "ERR_INVALID_URL"
].forEach((e) => {
  $e[e] = { value: e };
});
Object.defineProperties(g, $e);
Object.defineProperty(we, "isAxiosError", { value: !0 });
g.from = (e, t, n, r, s, o) => {
  const i = Object.create(we);
  return l.toFlatObject(e, i, function(u) {
    return u !== Error.prototype;
  }, (c) => c !== "isAxiosError"), g.call(i, e.message, t, n, r, s), i.cause = e, i.name = e.name, o && Object.assign(i, o), i;
};
var Rn = typeof self == "object" ? self.FormData : window.FormData;
const Cn = Rn;
function Ct(e) {
  return l.isPlainObject(e) || l.isArray(e);
}
function Ae(e) {
  return l.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function te(e, t, n) {
  return e ? e.concat(t).map(function(s, o) {
    return s = Ae(s), !n && o ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function Pn(e) {
  return l.isArray(e) && !e.some(Ct);
}
const Tn = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Nn(e) {
  return e && l.isFunction(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator];
}
function yt(e, t, n) {
  if (!l.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (Cn || FormData)(), n = l.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(f, S) {
    return !l.isUndefined(S[f]);
  });
  const r = n.metaTokens, s = n.visitor || d, o = n.dots, i = n.indexes, u = (n.Blob || typeof Blob < "u" && Blob) && Nn(t);
  if (!l.isFunction(s))
    throw new TypeError("visitor must be a function");
  function a(p) {
    if (p === null)
      return "";
    if (l.isDate(p))
      return p.toISOString();
    if (!u && l.isBlob(p))
      throw new g("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(p) || l.isTypedArray(p) ? u && typeof Blob == "function" ? new Blob([p]) : Buffer.from(p) : p;
  }
  function d(p, f, S) {
    let $ = p;
    if (p && !S && typeof p == "object") {
      if (l.endsWith(f, "{}"))
        f = r ? f : f.slice(0, -2), p = JSON.stringify(p);
      else if (l.isArray(p) && Pn(p) || l.isFileList(p) || l.endsWith(f, "[]") && ($ = l.toArray(p)))
        return f = Ae(f), $.forEach(function(rt, ke) {
          !(l.isUndefined(rt) || rt === null) && t.append(
            i === !0 ? te([f], ke, o) : i === null ? f : f + "[]",
            a(rt)
          );
        }), !1;
    }
    return Ct(p) ? !0 : (t.append(te(S, f, o), a(p)), !1);
  }
  const h = [], m = Object.assign(Tn, {
    defaultVisitor: d,
    convertValue: a,
    isVisitable: Ct
  });
  function y(p, f) {
    if (!l.isUndefined(p)) {
      if (h.indexOf(p) !== -1)
        throw Error("Circular reference detected in " + f.join("."));
      h.push(p), l.forEach(p, function($, L) {
        (!(l.isUndefined($) || $ === null) && s.call(
          t,
          $,
          l.isString(L) ? L.trim() : L,
          f,
          m
        )) === !0 && y($, f ? f.concat(L) : [L]);
      }), h.pop();
    }
  }
  if (!l.isObject(e))
    throw new TypeError("data must be an object");
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
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Bt(e, t) {
  this._pairs = [], e && yt(e, this, t);
}
const Se = Bt.prototype;
Se.append = function(t, n) {
  this._pairs.push([t, n]);
};
Se.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, ee);
  } : ee;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function Dn(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function xe(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || Dn, s = n && n.serialize;
  let o;
  if (s ? o = s(t, n) : o = l.isURLSearchParams(t) ? t.toString() : new Bt(t, n).toString(r), o) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Un {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    l.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const ne = Un, Oe = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ln = typeof URLSearchParams < "u" ? URLSearchParams : Bt, kn = FormData, Bn = (() => {
  let e;
  return typeof navigator < "u" && ((e = navigator.product) === "ReactNative" || e === "NativeScript" || e === "NS") ? !1 : typeof window < "u" && typeof document < "u";
})(), O = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ln,
    FormData: kn,
    Blob
  },
  isStandardBrowserEnv: Bn,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function jn(e, t) {
  return yt(e, new O.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, s, o) {
      return O.isNode && l.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Hn(e) {
  return l.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Fn(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++)
    o = n[r], t[o] = e[o];
  return t;
}
function Re(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    const c = Number.isFinite(+i), u = o >= n.length;
    return i = !i && l.isArray(s) ? s.length : i, u ? (l.hasOwnProp(s, i) ? s[i] = [s[i], r] : s[i] = r, !c) : ((!s[i] || !l.isObject(s[i])) && (s[i] = []), t(n, r, s[i], o) && l.isArray(s[i]) && (s[i] = Fn(s[i])), !c);
  }
  if (l.isFormData(e) && l.isFunction(e.entries)) {
    const n = {};
    return l.forEachEntry(e, (r, s) => {
      t(Hn(r), s, n, 0);
    }), n;
  }
  return null;
}
const Mn = {
  "Content-Type": void 0
};
function zn(e, t, n) {
  if (l.isString(e))
    try {
      return (t || JSON.parse)(e), l.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const gt = {
  transitional: Oe,
  adapter: ["xhr", "http"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", s = r.indexOf("application/json") > -1, o = l.isObject(t);
    if (o && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return s && s ? JSON.stringify(Re(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let c;
    if (o) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return jn(t, this.formSerializer).toString();
      if ((c = l.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const u = this.env && this.env.FormData;
        return yt(
          c ? { "files[]": t } : t,
          u && new u(),
          this.formSerializer
        );
      }
    }
    return o || s ? (n.setContentType("application/json", !1), zn(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || gt.transitional, r = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (t && l.isString(t) && (r && !this.responseType || s)) {
      const i = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (c) {
        if (i)
          throw c.name === "SyntaxError" ? g.from(c, g.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return t;
  }],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: O.classes.FormData,
    Blob: O.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*"
    }
  }
};
l.forEach(["delete", "get", "head"], function(t) {
  gt.headers[t] = {};
});
l.forEach(["post", "put", "patch"], function(t) {
  gt.headers[t] = l.merge(Mn);
});
const jt = gt, In = l.toObjectSet([
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
  "user-agent"
]), Kn = (e) => {
  const t = {};
  let n, r, s;
  return e && e.split(`
`).forEach(function(i) {
    s = i.indexOf(":"), n = i.substring(0, s).trim().toLowerCase(), r = i.substring(s + 1).trim(), !(!n || t[n] && In[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, re = Symbol("internals");
function J(e) {
  return e && String(e).trim().toLowerCase();
}
function ot(e) {
  return e === !1 || e == null ? e : l.isArray(e) ? e.map(ot) : String(e);
}
function Jn(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
function qn(e) {
  return /^[-_a-zA-Z]+$/.test(e.trim());
}
function se(e, t, n, r) {
  if (l.isFunction(r))
    return r.call(this, t, n);
  if (!!l.isString(t)) {
    if (l.isString(r))
      return t.indexOf(r) !== -1;
    if (l.isRegExp(r))
      return r.test(t);
  }
}
function Vn(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function Wn(e, t) {
  const n = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0
    });
  });
}
class bt {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(c, u, a) {
      const d = J(u);
      if (!d)
        throw new Error("header name must be a non-empty string");
      const h = l.findKey(s, d);
      (!h || s[h] === void 0 || a === !0 || a === void 0 && s[h] !== !1) && (s[h || u] = ot(c));
    }
    const i = (c, u) => l.forEach(c, (a, d) => o(a, d, u));
    return l.isPlainObject(t) || t instanceof this.constructor ? i(t, n) : l.isString(t) && (t = t.trim()) && !qn(t) ? i(Kn(t), n) : t != null && o(n, t, r), this;
  }
  get(t, n) {
    if (t = J(t), t) {
      const r = l.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n)
          return s;
        if (n === !0)
          return Jn(s);
        if (l.isFunction(n))
          return n.call(this, s, r);
        if (l.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = J(t), t) {
      const r = l.findKey(this, t);
      return !!(r && (!n || se(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (i = J(i), i) {
        const c = l.findKey(r, i);
        c && (!n || se(r, r[c], c, n)) && (delete r[c], s = !0);
      }
    }
    return l.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear() {
    return Object.keys(this).forEach(this.delete.bind(this));
  }
  normalize(t) {
    const n = this, r = {};
    return l.forEach(this, (s, o) => {
      const i = l.findKey(r, o);
      if (i) {
        n[i] = ot(s), delete n[o];
        return;
      }
      const c = t ? Vn(o) : String(o).trim();
      c !== o && delete n[o], n[c] = ot(s), r[c] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (r, s) => {
      r != null && r !== !1 && (n[s] = t && l.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[re] = this[re] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function o(i) {
      const c = J(i);
      r[c] || (Wn(s, i), r[c] = !0);
    }
    return l.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
bt.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent"]);
l.freezeMethods(bt.prototype);
l.freezeMethods(bt);
const R = bt;
function St(e, t) {
  const n = this || jt, r = t || n, s = R.from(r.headers);
  let o = r.data;
  return l.forEach(e, function(c) {
    o = c.call(n, o, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), o;
}
function Ce(e) {
  return !!(e && e.__CANCEL__);
}
function tt(e, t, n) {
  g.call(this, e == null ? "canceled" : e, g.ERR_CANCELED, t, n), this.name = "CanceledError";
}
l.inherits(tt, g, {
  __CANCEL__: !0
});
const Xn = null;
function Zn(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new g(
    "Request failed with status code " + n.status,
    [g.ERR_BAD_REQUEST, g.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
const Qn = O.isStandardBrowserEnv ? function() {
  return {
    write: function(n, r, s, o, i, c) {
      const u = [];
      u.push(n + "=" + encodeURIComponent(r)), l.isNumber(s) && u.push("expires=" + new Date(s).toGMTString()), l.isString(o) && u.push("path=" + o), l.isString(i) && u.push("domain=" + i), c === !0 && u.push("secure"), document.cookie = u.join("; ");
    },
    read: function(n) {
      const r = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
      return r ? decodeURIComponent(r[3]) : null;
    },
    remove: function(n) {
      this.write(n, "", Date.now() - 864e5);
    }
  };
}() : function() {
  return {
    write: function() {
    },
    read: function() {
      return null;
    },
    remove: function() {
    }
  };
}();
function Yn(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Gn(e, t) {
  return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Pe(e, t) {
  return e && !Yn(t) ? Gn(e, t) : t;
}
const tr = O.isStandardBrowserEnv ? function() {
  const t = /(msie|trident)/i.test(navigator.userAgent), n = document.createElement("a");
  let r;
  function s(o) {
    let i = o;
    return t && (n.setAttribute("href", i), i = n.href), n.setAttribute("href", i), {
      href: n.href,
      protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
      host: n.host,
      search: n.search ? n.search.replace(/^\?/, "") : "",
      hash: n.hash ? n.hash.replace(/^#/, "") : "",
      hostname: n.hostname,
      port: n.port,
      pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
    };
  }
  return r = s(window.location.href), function(i) {
    const c = l.isString(i) ? s(i) : i;
    return c.protocol === r.protocol && c.host === r.host;
  };
}() : function() {
  return function() {
    return !0;
  };
}();
function er(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function nr(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let s = 0, o = 0, i;
  return t = t !== void 0 ? t : 1e3, function(u) {
    const a = Date.now(), d = r[o];
    i || (i = a), n[s] = u, r[s] = a;
    let h = o, m = 0;
    for (; h !== s; )
      m += n[h++], h = h % e;
    if (s = (s + 1) % e, s === o && (o = (o + 1) % e), a - i < t)
      return;
    const y = d && a - d;
    return y ? Math.round(m * 1e3 / y) : void 0;
  };
}
function ie(e, t) {
  let n = 0;
  const r = nr(50, 250);
  return (s) => {
    const o = s.loaded, i = s.lengthComputable ? s.total : void 0, c = o - n, u = r(c), a = o <= i;
    n = o;
    const d = {
      loaded: o,
      total: i,
      progress: i ? o / i : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && i && a ? (i - o) / u : void 0,
      event: s
    };
    d[t ? "download" : "upload"] = !0, e(d);
  };
}
const rr = typeof XMLHttpRequest < "u", sr = rr && function(e) {
  return new Promise(function(n, r) {
    let s = e.data;
    const o = R.from(e.headers).normalize(), i = e.responseType;
    let c;
    function u() {
      e.cancelToken && e.cancelToken.unsubscribe(c), e.signal && e.signal.removeEventListener("abort", c);
    }
    l.isFormData(s) && O.isStandardBrowserEnv && o.setContentType(!1);
    let a = new XMLHttpRequest();
    if (e.auth) {
      const y = e.auth.username || "", p = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : "";
      o.set("Authorization", "Basic " + btoa(y + ":" + p));
    }
    const d = Pe(e.baseURL, e.url);
    a.open(e.method.toUpperCase(), xe(d, e.params, e.paramsSerializer), !0), a.timeout = e.timeout;
    function h() {
      if (!a)
        return;
      const y = R.from(
        "getAllResponseHeaders" in a && a.getAllResponseHeaders()
      ), f = {
        data: !i || i === "text" || i === "json" ? a.responseText : a.response,
        status: a.status,
        statusText: a.statusText,
        headers: y,
        config: e,
        request: a
      };
      Zn(function($) {
        n($), u();
      }, function($) {
        r($), u();
      }, f), a = null;
    }
    if ("onloadend" in a ? a.onloadend = h : a.onreadystatechange = function() {
      !a || a.readyState !== 4 || a.status === 0 && !(a.responseURL && a.responseURL.indexOf("file:") === 0) || setTimeout(h);
    }, a.onabort = function() {
      !a || (r(new g("Request aborted", g.ECONNABORTED, e, a)), a = null);
    }, a.onerror = function() {
      r(new g("Network Error", g.ERR_NETWORK, e, a)), a = null;
    }, a.ontimeout = function() {
      let p = e.timeout ? "timeout of " + e.timeout + "ms exceeded" : "timeout exceeded";
      const f = e.transitional || Oe;
      e.timeoutErrorMessage && (p = e.timeoutErrorMessage), r(new g(
        p,
        f.clarifyTimeoutError ? g.ETIMEDOUT : g.ECONNABORTED,
        e,
        a
      )), a = null;
    }, O.isStandardBrowserEnv) {
      const y = (e.withCredentials || tr(d)) && e.xsrfCookieName && Qn.read(e.xsrfCookieName);
      y && o.set(e.xsrfHeaderName, y);
    }
    s === void 0 && o.setContentType(null), "setRequestHeader" in a && l.forEach(o.toJSON(), function(p, f) {
      a.setRequestHeader(f, p);
    }), l.isUndefined(e.withCredentials) || (a.withCredentials = !!e.withCredentials), i && i !== "json" && (a.responseType = e.responseType), typeof e.onDownloadProgress == "function" && a.addEventListener("progress", ie(e.onDownloadProgress, !0)), typeof e.onUploadProgress == "function" && a.upload && a.upload.addEventListener("progress", ie(e.onUploadProgress)), (e.cancelToken || e.signal) && (c = (y) => {
      !a || (r(!y || y.type ? new tt(null, e, a) : y), a.abort(), a = null);
    }, e.cancelToken && e.cancelToken.subscribe(c), e.signal && (e.signal.aborted ? c() : e.signal.addEventListener("abort", c)));
    const m = er(d);
    if (m && O.protocols.indexOf(m) === -1) {
      r(new g("Unsupported protocol " + m + ":", g.ERR_BAD_REQUEST, e));
      return;
    }
    a.send(s || null);
  });
}, at = {
  http: Xn,
  xhr: sr
};
l.forEach(at, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const ir = {
  getAdapter: (e) => {
    e = l.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    for (let s = 0; s < t && (n = e[s], !(r = l.isString(n) ? at[n.toLowerCase()] : n)); s++)
      ;
    if (!r)
      throw r === !1 ? new g(
        `Adapter ${n} is not supported by the environment`,
        "ERR_NOT_SUPPORT"
      ) : new Error(
        l.hasOwnProp(at, n) ? `Adapter '${n}' is not available in the build` : `Unknown adapter '${n}'`
      );
    if (!l.isFunction(r))
      throw new TypeError("adapter is not a function");
    return r;
  },
  adapters: at
};
function xt(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new tt();
}
function oe(e) {
  return xt(e), e.headers = R.from(e.headers), e.data = St.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), ir.getAdapter(e.adapter || jt.adapter)(e).then(function(r) {
    return xt(e), r.data = St.call(
      e,
      e.transformResponse,
      r
    ), r.headers = R.from(r.headers), r;
  }, function(r) {
    return Ce(r) || (xt(e), r && r.response && (r.response.data = St.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = R.from(r.response.headers))), Promise.reject(r);
  });
}
const ae = (e) => e instanceof R ? e.toJSON() : e;
function Z(e, t) {
  t = t || {};
  const n = {};
  function r(a, d, h) {
    return l.isPlainObject(a) && l.isPlainObject(d) ? l.merge.call({ caseless: h }, a, d) : l.isPlainObject(d) ? l.merge({}, d) : l.isArray(d) ? d.slice() : d;
  }
  function s(a, d, h) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(a))
        return r(void 0, a, h);
    } else
      return r(a, d, h);
  }
  function o(a, d) {
    if (!l.isUndefined(d))
      return r(void 0, d);
  }
  function i(a, d) {
    if (l.isUndefined(d)) {
      if (!l.isUndefined(a))
        return r(void 0, a);
    } else
      return r(void 0, d);
  }
  function c(a, d, h) {
    if (h in t)
      return r(a, d);
    if (h in e)
      return r(void 0, a);
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
    headers: (a, d) => s(ae(a), ae(d), !0)
  };
  return l.forEach(Object.keys(e).concat(Object.keys(t)), function(d) {
    const h = u[d] || s, m = h(e[d], t[d], d);
    l.isUndefined(m) && h !== c || (n[d] = m);
  }), n;
}
const Te = "1.2.0", Ht = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Ht[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const le = {};
Ht.transitional = function(t, n, r) {
  function s(o, i) {
    return "[Axios v" + Te + "] Transitional option '" + o + "'" + i + (r ? ". " + r : "");
  }
  return (o, i, c) => {
    if (t === !1)
      throw new g(
        s(i, " has been removed" + (n ? " in " + n : "")),
        g.ERR_DEPRECATED
      );
    return n && !le[i] && (le[i] = !0, console.warn(
      s(
        i,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(o, i, c) : !0;
  };
};
function or(e, t, n) {
  if (typeof e != "object")
    throw new g("options must be an object", g.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s], i = t[o];
    if (i) {
      const c = e[o], u = c === void 0 || i(c, o, e);
      if (u !== !0)
        throw new g("option " + o + " must be " + u, g.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new g("Unknown option " + o, g.ERR_BAD_OPTION);
  }
}
const Pt = {
  assertOptions: or,
  validators: Ht
}, P = Pt.validators;
class ht {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new ne(),
      response: new ne()
    };
  }
  request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Z(this.defaults, n);
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 && Pt.assertOptions(r, {
      silentJSONParsing: P.transitional(P.boolean),
      forcedJSONParsing: P.transitional(P.boolean),
      clarifyTimeoutError: P.transitional(P.boolean)
    }, !1), s !== void 0 && Pt.assertOptions(s, {
      encode: P.function,
      serialize: P.function
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let i;
    i = o && l.merge(
      o.common,
      o[n.method]
    ), i && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (p) => {
        delete o[p];
      }
    ), n.headers = R.concat(i, o);
    const c = [];
    let u = !0;
    this.interceptors.request.forEach(function(f) {
      typeof f.runWhen == "function" && f.runWhen(n) === !1 || (u = u && f.synchronous, c.unshift(f.fulfilled, f.rejected));
    });
    const a = [];
    this.interceptors.response.forEach(function(f) {
      a.push(f.fulfilled, f.rejected);
    });
    let d, h = 0, m;
    if (!u) {
      const p = [oe.bind(this), void 0];
      for (p.unshift.apply(p, c), p.push.apply(p, a), m = p.length, d = Promise.resolve(n); h < m; )
        d = d.then(p[h++], p[h++]);
      return d;
    }
    m = c.length;
    let y = n;
    for (h = 0; h < m; ) {
      const p = c[h++], f = c[h++];
      try {
        y = p(y);
      } catch (S) {
        f.call(this, S);
        break;
      }
    }
    try {
      d = oe.call(this, y);
    } catch (p) {
      return Promise.reject(p);
    }
    for (h = 0, m = a.length; h < m; )
      d = d.then(a[h++], a[h++]);
    return d;
  }
  getUri(t) {
    t = Z(this.defaults, t);
    const n = Pe(t.baseURL, t.url);
    return xe(n, t.params, t.paramsSerializer);
  }
}
l.forEach(["delete", "get", "head", "options"], function(t) {
  ht.prototype[t] = function(n, r) {
    return this.request(Z(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(o, i, c) {
      return this.request(Z(c || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: i
      }));
    };
  }
  ht.prototype[t] = n(), ht.prototype[t + "Form"] = n(!0);
});
const lt = ht;
class Ft {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners)
        return;
      let o = r._listeners.length;
      for (; o-- > 0; )
        r._listeners[o](s);
      r._listeners = null;
    }), this.promise.then = (s) => {
      let o;
      const i = new Promise((c) => {
        r.subscribe(c), o = c;
      }).then(s);
      return i.cancel = function() {
        r.unsubscribe(o);
      }, i;
    }, t(function(o, i, c) {
      r.reason || (r.reason = new tt(o, i, c), n(r.reason));
    });
  }
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  static source() {
    let t;
    return {
      token: new Ft(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
const ar = Ft;
function lr(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function cr(e) {
  return l.isObject(e) && e.isAxiosError === !0;
}
function Ne(e) {
  const t = new lt(e), n = fe(lt.prototype.request, t);
  return l.extend(n, lt.prototype, t, { allOwnKeys: !0 }), l.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return Ne(Z(e, s));
  }, n;
}
const v = Ne(jt);
v.Axios = lt;
v.CanceledError = tt;
v.CancelToken = ar;
v.isCancel = Ce;
v.VERSION = Te;
v.toFormData = yt;
v.AxiosError = g;
v.Cancel = v.CanceledError;
v.all = function(t) {
  return Promise.all(t);
};
v.spread = lr;
v.isAxiosError = cr;
v.AxiosHeaders = R;
v.formToJSON = (e) => Re(l.isHTMLForm(e) ? new FormData(e) : e);
v.default = v;
const ur = v, et = z`
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
const hr = (e, t, n) => {
  for (const r of t)
    if (r[0] === e)
      return (0, r[1])();
  return n == null ? void 0 : n();
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* De(e, t) {
  if (e !== void 0) {
    let n = 0;
    for (const r of e)
      yield t(r, n++);
  }
}
var dr = Object.defineProperty, pr = Object.getOwnPropertyDescriptor, Ue = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? pr(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (s = (r ? i(t, n, s) : i(s)) || s);
  return r && s && dr(t, n, s), s;
};
let dt = class extends x {
  render() {
    var e, t;
    return E` <div class="category-panel-wrapper">
            <h4 class="category-panel-title">${((e = this.categoryData) == null ? void 0 : e.title) || "Category Title"}</h4>
            < div class="divider-h"></div>
            <div class="integrations-logos d-flex">
            
            ${De(
      (t = this.categoryData) == null ? void 0 : t.integrationList,
      (n, r) => E`
                <div class="integration-logo" key=${r}>
                  ${n != null && n.smallLogo ? E`<img
                        src=${n.smallLogo}
                        alt=${n.title || "Integrayion Lgo"}
                      />` : null}
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
    `
];
Ue([
  _({ reflect: !0 })
], dt.prototype, "categoryData", 2);
dt = Ue([
  Y("category-panel")
], dt);
var fr = Object.defineProperty, mr = Object.getOwnPropertyDescriptor, Le = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? mr(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (s = (r ? i(t, n, s) : i(s)) || s);
  return r && s && fr(t, n, s), s;
};
let pt = class extends x {
  constructor() {
    super(...arguments), this.categoryList = [];
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
        categoryTitle: e
      }
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
    `
];
Le([
  _()
], pt.prototype, "categoryList", 2);
pt = Le([
  Y("category-selection")
], pt);
var yr = Object.defineProperty, gr = Object.getOwnPropertyDescriptor, br = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? gr(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (s = (r ? i(t, n, s) : i(s)) || s);
  return r && s && yr(t, n, s), s;
};
let Tt = class extends x {
  render() {
    return E` <div class="integration-selection-step"></div> `;
  }
};
Tt.styles = [et, z``];
Tt = br([
  Y("integration-selection")
], Tt);
var Er = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, nt = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? vr(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (s = (r ? i(t, n, s) : i(s)) || s);
  return r && s && Er(t, n, s), s;
};
let U = class extends x {
  constructor() {
    super(...arguments), this.step = 0, this.appsDataLoaded = !1, this.appsData = [], this.appsApiError = !1;
  }
  render() {
    return E`
      <div class="dialog-wrapper" role="dialog">
        <div class="popup-container">
          ${this.appsDataLoaded ? this.appsApiError ? E`
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
                ` : E`
                  <div class="popup-header d-flex">
                    <div class="header-left w-50  text-left">
                      ${this.step == 0 ? E`` : E`<button
                            class="header-btn bg-transparent color-grey back-btn"
                            @click="${this._back}"
                          >
                            < Back
                          </button>`}
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
                  ${hr(this.step, [
      [
        0,
        () => E`<category-selection
                          categoryList="${this.appsData}"
                          @nextStep=${this._nextStep}
                          @selectCategory=${this._setSelectedCategory}
                        ></category-selection>`
      ],
      [
        1,
        () => E`<integration-selection
                          @nextStep=${this._nextStep}
                        ></integration-selection>`
      ]
    ])}
                ` : E`<div class="full-page-wrapper  align-items-center">
                <h4 class="w-100 text-center">Loading...</h4>
              </div>`}
        </div>
      </div>
    `;
  }
  _togglePopup(e) {
    e == null || e.preventDefault();
    const t = new CustomEvent("togglePopup", {
      bubbles: !0
    });
    this.dispatchEvent(t);
  }
  _setSelectedCategory(e) {
    var t;
    e == null || e.preventDefault(), console.log((t = e == null ? void 0 : e.detail) == null ? void 0 : t.categoryTitle);
  }
  _nextStep(e) {
    e == null || e.preventDefault(), this.step = this.step + 1;
  }
  _prevStep(e) {
    e == null || e.preventDefault(), this.step = this.step - 1;
  }
  _refreshAccess(e) {
    e == null || e.preventDefault();
    const t = new CustomEvent("refreshAccess", {
      bubbles: !0
    });
    this.dispatchEvent(t);
  }
  _forceExit(e) {
    this._togglePopup(e), this._refreshAccess(e);
  }
  _back(e) {
    e == null || e.preventDefault(), this.step > 0 && this._prevStep();
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
    `
];
nt([
  _({ type: Number, state: !0 })
], U.prototype, "step", 2);
nt([
  _({ type: Boolean })
], U.prototype, "appsDataLoaded", 2);
nt([
  _()
], U.prototype, "appsData", 2);
nt([
  _({ type: Boolean })
], U.prototype, "appsApiError", 2);
U = nt([
  Y("knit-popup")
], U);
var _r = Object.defineProperty, wr = Object.getOwnPropertyDescriptor, A = (e, t, n, r) => {
  for (var s = r > 1 ? void 0 : r ? wr(t, n) : t, o = e.length - 1, i; o >= 0; o--)
    (i = e[o]) && (s = (r ? i(t, n, s) : i(s)) || s);
  return r && s && _r(t, n, s), s;
};
const $r = (e) => JSON.parse(e);
let w = class extends x {
  constructor() {
    super(...arguments), this.docsHint = "Click on the Vite and Lit logos to learn more", this.isReady = !1, this.count = 0, this.onRefreshKnit = function() {
    }, this.knitKey = "", this.popupEnabled = !1, this.appsDataLoaded = !1, this.appsData = [], this.appsApiError = !1;
  }
  render() {
    return E`
      <div class="component-wrapper">
        ${this.popupEnabled ? E`
              <knit-popup
                appsDataLoaded=${this.appsDataLoaded}
                appsApiError=${this.appsApiError}
                @togglePopup=${this._togglePopup}
                @refreshAccess=${this._refreshAccess}
              ></knit-popup>
            ` : ""}
        Hi
        ${E`<slot name="initiator" @click=${this._onInitiatorClick}></slot>`}
      </div>
    `;
  }
  _onInitiatorClick(e) {
    e == null || e.preventDefault, console.log("clicked", this.isReady, "key", this.knitKey), this.isReady && this._togglePopup();
  }
  _togglePopup(e) {
    e == null || e.preventDefault(), this.popupEnabled = !this.popupEnabled;
  }
  _refreshAccess(e) {
    e == null || e.preventDefault(), console.log("refresh event called "), this.onRefreshKnit();
  }
  updated(e) {
    console.log("updated called"), e.has("knitKey") && (console.log("knitKey", this.knitKey), this.knitKey.length > 0 && !this.isReady && (this.isReady = !0)), e.has("popupEnabled") && this.popupEnabled && this._fetchAppsData(), e.has("onRefreshKnit") && console.log("knit", this.onRefreshKnit);
  }
  _fetchAppsData() {
    console.log("Fetching Apps Data"), ur.get("apiCall").then((e) => {
      var t;
      console.log(e == null ? void 0 : e.data), this.appsData = ((t = e == null ? void 0 : e.data) == null ? void 0 : t.apps) || [];
    }).catch((e) => {
      console.error(e), this.appsApiError = !0;
    }).finally(() => {
      this.appsDataLoaded = !0;
    });
  }
};
w.styles = [
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
    `
];
A([
  _()
], w.prototype, "docsHint", 2);
A([
  _({ type: Boolean, state: !0 })
], w.prototype, "isReady", 2);
A([
  _({ type: Number, state: !0 })
], w.prototype, "count", 2);
A([
  _({ type: $r })
], w.prototype, "onRefreshKnit", 2);
A([
  _({ type: String })
], w.prototype, "knitKey", 2);
A([
  _({ type: Boolean, state: !0 })
], w.prototype, "popupEnabled", 2);
A([
  _({ type: Boolean, state: !0 })
], w.prototype, "appsDataLoaded", 2);
A([
  _()
], w.prototype, "appsData", 2);
A([
  _({ type: Boolean, state: !0 })
], w.prototype, "appsApiError", 2);
w = A([
  Y("knit-auth")
], w);
export {
  w as KnitAuth
};
