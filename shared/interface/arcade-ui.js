var cg = (i) => {
  throw TypeError(i);
};
var sg = (i, o, c) => o.has(i) || cg("Cannot " + c);
var pe = (i, o, c) => (sg(i, o, "read from private field"), c ? c.call(i) : o.get(i)), fg = (i, o, c) => o.has(i) ? cg("Cannot add the same private member more than once") : o instanceof WeakSet ? o.add(i) : o.set(i, c), Bs = (i, o, c, r) => (sg(i, o, "write to private field"), r ? r.call(i, c) : o.set(i, c), c);
function FS(i, o) {
  for (var c = 0; c < o.length; c++) {
    const r = o[c];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const f in r)
        if (f !== "default" && !(f in i)) {
          const d = Object.getOwnPropertyDescriptor(r, f);
          d && Object.defineProperty(i, f, d.get ? d : {
            enumerable: !0,
            get: () => r[f]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(i, Symbol.toStringTag, { value: "Module" }));
}
function $S(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Ls = { exports: {} }, $u = {};
var dg;
function PS() {
  if (dg) return $u;
  dg = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.fragment");
  function c(r, f, d) {
    var h = null;
    if (d !== void 0 && (h = "" + d), f.key !== void 0 && (h = "" + f.key), "key" in f) {
      d = {};
      for (var g in f)
        g !== "key" && (d[g] = f[g]);
    } else d = f;
    return f = d.ref, {
      $$typeof: i,
      type: r,
      key: h,
      ref: f !== void 0 ? f : null,
      props: d
    };
  }
  return $u.Fragment = o, $u.jsx = c, $u.jsxs = c, $u;
}
var mg;
function WS() {
  return mg || (mg = 1, Ls.exports = PS()), Ls.exports;
}
var S = WS(), Vs = { exports: {} }, mt = {};
var vg;
function t1() {
  if (vg) return mt;
  vg = 1;
  var i = /* @__PURE__ */ Symbol.for("react.transitional.element"), o = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.fragment"), r = /* @__PURE__ */ Symbol.for("react.strict_mode"), f = /* @__PURE__ */ Symbol.for("react.profiler"), d = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), g = /* @__PURE__ */ Symbol.for("react.forward_ref"), C = /* @__PURE__ */ Symbol.for("react.suspense"), E = /* @__PURE__ */ Symbol.for("react.memo"), _ = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), T = /* @__PURE__ */ Symbol.for("react.view_transition"), U = Symbol.iterator;
  function G(x) {
    return x === null || typeof x != "object" ? null : (x = U && x[U] || x["@@iterator"], typeof x == "function" ? x : null);
  }
  var w = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, M = Object.assign, K = {};
  function X(x, V, F) {
    this.props = x, this.context = V, this.refs = K, this.updater = F || w;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(x, V) {
    if (typeof x != "object" && typeof x != "function" && x != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, x, V, "setState");
  }, X.prototype.forceUpdate = function(x) {
    this.updater.enqueueForceUpdate(this, x, "forceUpdate");
  };
  function Y() {
  }
  Y.prototype = X.prototype;
  function k(x, V, F) {
    this.props = x, this.context = V, this.refs = K, this.updater = F || w;
  }
  var J = k.prototype = new Y();
  J.constructor = k, M(J, X.prototype), J.isPureReactComponent = !0;
  var Q = Array.isArray;
  function q() {
  }
  var L = { H: null, A: null, T: null, S: null }, it = Object.prototype.hasOwnProperty;
  function Ot(x, V, F) {
    var et = F.ref;
    return {
      $$typeof: i,
      type: x,
      key: V,
      ref: et !== void 0 ? et : null,
      props: F
    };
  }
  function ht(x, V) {
    return Ot(x.type, V, x.props);
  }
  function ot(x) {
    return typeof x == "object" && x !== null && x.$$typeof === i;
  }
  function Ht(x) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + x.replace(/[=:]/g, function(F) {
      return V[F];
    });
  }
  var Lt = /\/+/g;
  function bt(x, V) {
    return typeof x == "object" && x !== null && x.key != null ? Ht("" + x.key) : V.toString(36);
  }
  function Z(x) {
    switch (x.status) {
      case "fulfilled":
        return x.value;
      case "rejected":
        throw x.reason;
      default:
        switch (typeof x.status == "string" ? x.then(q, q) : (x.status = "pending", x.then(
          function(V) {
            x.status === "pending" && (x.status = "fulfilled", x.value = V);
          },
          function(V) {
            x.status === "pending" && (x.status = "rejected", x.reason = V);
          }
        )), x.status) {
          case "fulfilled":
            return x.value;
          case "rejected":
            throw x.reason;
        }
    }
    throw x;
  }
  function $(x, V, F, et, pt) {
    var ut = typeof x;
    (ut === "undefined" || ut === "boolean") && (x = null);
    var vt = !1;
    if (x === null) vt = !0;
    else
      switch (ut) {
        case "bigint":
        case "string":
        case "number":
          vt = !0;
          break;
        case "object":
          switch (x.$$typeof) {
            case i:
            case o:
              vt = !0;
              break;
            case _:
              return vt = x._init, $(
                vt(x._payload),
                V,
                F,
                et,
                pt
              );
          }
      }
    if (vt)
      return pt = pt(x), vt = et === "" ? "." + bt(x, 0) : et, Q(pt) ? (F = "", vt != null && (F = vt.replace(Lt, "$&/") + "/"), $(pt, V, F, "", function(je) {
        return je;
      })) : pt != null && (ot(pt) && (pt = ht(
        pt,
        F + (pt.key == null || x && x.key === pt.key ? "" : ("" + pt.key).replace(
          Lt,
          "$&/"
        ) + "/") + vt
      )), V.push(pt)), 1;
    vt = 0;
    var P = et === "" ? "." : et + ":";
    if (Q(x))
      for (var ct = 0; ct < x.length; ct++)
        et = x[ct], ut = P + bt(et, ct), vt += $(
          et,
          V,
          F,
          ut,
          pt
        );
    else if (ct = G(x), typeof ct == "function")
      for (x = ct.call(x), ct = 0; !(et = x.next()).done; )
        et = et.value, ut = P + bt(et, ct++), vt += $(
          et,
          V,
          F,
          ut,
          pt
        );
    else if (ut === "object") {
      if (typeof x.then == "function")
        return $(
          Z(x),
          V,
          F,
          et,
          pt
        );
      throw V = String(x), Error(
        "Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return vt;
  }
  function at(x, V, F) {
    if (x == null) return x;
    var et = [], pt = 0;
    return $(x, et, "", "", function(ut) {
      return V.call(F, ut, pt++);
    }), et;
  }
  function ft(x) {
    if (x._status === -1) {
      var V = x._result, F = V();
      F.then(
        function(et) {
          (x._status === 0 || x._status === -1) && (x._status = 1, x._result = et, F.status === void 0 && (F.status = "fulfilled", F.value = et));
        },
        function(et) {
          (x._status === 0 || x._status === -1) && (x._status = 2, x._result = et, F.status === void 0 && (F.status = "rejected", F.reason = et));
        }
      ), x._status === -1 && (x._status = 0, x._result = F);
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var j = typeof reportError == "function" ? reportError : function(x) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var V = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof x == "object" && x !== null && typeof x.message == "string" ? String(x.message) : String(x),
        error: x
      });
      if (!window.dispatchEvent(V)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", x);
      return;
    }
    console.error(x);
  };
  function dt(x) {
    var V = L.T, F = {};
    F.types = V !== null ? V.types : null, L.T = F;
    try {
      var et = x(), pt = L.S;
      pt !== null && pt(F, et), typeof et == "object" && et !== null && typeof et.then == "function" && et.then(q, j);
    } catch (ut) {
      j(ut);
    } finally {
      V !== null && F.types !== null && (V.types = F.types), L.T = V;
    }
  }
  function Zt(x) {
    var V = L.T;
    if (V !== null) {
      var F = V.types;
      F === null ? V.types = [x] : F.indexOf(x) === -1 && F.push(x);
    } else dt(Zt.bind(null, x));
  }
  var ee = {
    map: at,
    forEach: function(x, V, F) {
      at(
        x,
        function() {
          V.apply(this, arguments);
        },
        F
      );
    },
    count: function(x) {
      var V = 0;
      return at(x, function() {
        V++;
      }), V;
    },
    toArray: function(x) {
      return at(x, function(V) {
        return V;
      }) || [];
    },
    only: function(x) {
      if (!ot(x))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return x;
    }
  };
  return mt.Activity = v, mt.Children = ee, mt.Component = X, mt.Fragment = c, mt.Profiler = f, mt.PureComponent = k, mt.StrictMode = r, mt.Suspense = C, mt.ViewTransition = T, mt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = L, mt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(x) {
      return L.H.useMemoCache(x);
    }
  }, mt.addTransitionType = Zt, mt.cache = function(x) {
    return function() {
      return x.apply(null, arguments);
    };
  }, mt.cacheSignal = function() {
    return null;
  }, mt.cloneElement = function(x, V, F) {
    if (x == null)
      throw Error(
        "The argument must be a React element, but you passed " + x + "."
      );
    var et = M({}, x.props), pt = x.key;
    if (V != null)
      for (ut in V.key !== void 0 && (pt = "" + V.key), V)
        !it.call(V, ut) || ut === "key" || ut === "__self" || ut === "__source" || ut === "ref" && V.ref === void 0 || (et[ut] = V[ut]);
    var ut = arguments.length - 2;
    if (ut === 1) et.children = F;
    else if (1 < ut) {
      for (var vt = Array(ut), P = 0; P < ut; P++)
        vt[P] = arguments[P + 2];
      et.children = vt;
    }
    return Ot(x.type, pt, et);
  }, mt.createContext = function(x) {
    return x = {
      $$typeof: h,
      _currentValue: x,
      _currentValue2: x,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, x.Provider = x, x.Consumer = {
      $$typeof: d,
      _context: x
    }, x;
  }, mt.createElement = function(x, V, F) {
    var et, pt = {}, ut = null;
    if (V != null)
      for (et in V.key !== void 0 && (ut = "" + V.key), V)
        it.call(V, et) && et !== "key" && et !== "__self" && et !== "__source" && (pt[et] = V[et]);
    var vt = arguments.length - 2;
    if (vt === 1) pt.children = F;
    else if (1 < vt) {
      for (var P = Array(vt), ct = 0; ct < vt; ct++)
        P[ct] = arguments[ct + 2];
      pt.children = P;
    }
    if (x && x.defaultProps)
      for (et in vt = x.defaultProps, vt)
        pt[et] === void 0 && (pt[et] = vt[et]);
    return Ot(x, ut, pt);
  }, mt.createRef = function() {
    return { current: null };
  }, mt.forwardRef = function(x) {
    return { $$typeof: g, render: x };
  }, mt.isValidElement = ot, mt.lazy = function(x) {
    return {
      $$typeof: _,
      _payload: { _status: -1, _result: x },
      _init: ft
    };
  }, mt.memo = function(x, V) {
    return {
      $$typeof: E,
      type: x,
      compare: V === void 0 ? null : V
    };
  }, mt.startTransition = dt, mt.unstable_useCacheRefresh = function() {
    return L.H.useCacheRefresh();
  }, mt.use = function(x) {
    return L.H.use(x);
  }, mt.useActionState = function(x, V, F) {
    return L.H.useActionState(x, V, F);
  }, mt.useCallback = function(x, V) {
    return L.H.useCallback(x, V);
  }, mt.useContext = function(x) {
    return L.H.useContext(x);
  }, mt.useDebugValue = function() {
  }, mt.useDeferredValue = function(x, V) {
    return L.H.useDeferredValue(x, V);
  }, mt.useEffect = function(x, V) {
    return L.H.useEffect(x, V);
  }, mt.useEffectEvent = function(x) {
    return L.H.useEffectEvent(x);
  }, mt.useId = function() {
    return L.H.useId();
  }, mt.useImperativeHandle = function(x, V, F) {
    return L.H.useImperativeHandle(x, V, F);
  }, mt.useInsertionEffect = function(x, V) {
    return L.H.useInsertionEffect(x, V);
  }, mt.useLayoutEffect = function(x, V) {
    return L.H.useLayoutEffect(x, V);
  }, mt.useMemo = function(x, V) {
    return L.H.useMemo(x, V);
  }, mt.useOptimistic = function(x, V) {
    return L.H.useOptimistic(x, V);
  }, mt.useReducer = function(x, V, F) {
    return L.H.useReducer(x, V, F);
  }, mt.useRef = function(x) {
    return L.H.useRef(x);
  }, mt.useState = function(x) {
    return L.H.useState(x);
  }, mt.useSyncExternalStore = function(x, V, F) {
    return L.H.useSyncExternalStore(
      x,
      V,
      F
    );
  }, mt.useTransition = function() {
    return L.H.useTransition();
  }, mt.version = "19.3.1", mt;
}
var hg;
function yf() {
  return hg || (hg = 1, Vs.exports = t1()), Vs.exports;
}
var b = yf();
const e1 = /* @__PURE__ */ $S(b), Pl = /* @__PURE__ */ FS({
  __proto__: null,
  default: e1
}, [b]);
var Gs = { exports: {} }, Pu = {}, Ys = { exports: {} }, qs = {};
var gg;
function n1() {
  return gg || (gg = 1, (function(i) {
    function o(Z, $) {
      var at = Z.length;
      Z.push($);
      t: for (; 0 < at; ) {
        var ft = at - 1 >>> 1, j = Z[ft];
        if (0 < f(j, $))
          Z[ft] = $, Z[at] = j, at = ft;
        else break t;
      }
    }
    function c(Z) {
      return Z.length === 0 ? null : Z[0];
    }
    function r(Z) {
      if (Z.length === 0) return null;
      var $ = Z[0], at = Z.pop();
      if (at !== $) {
        Z[0] = at;
        t: for (var ft = 0, j = Z.length, dt = j >>> 1; ft < dt; ) {
          var Zt = 2 * (ft + 1) - 1, ee = Z[Zt], x = Zt + 1, V = Z[x];
          if (0 > f(ee, at))
            x < j && 0 > f(V, ee) ? (Z[ft] = V, Z[x] = at, ft = x) : (Z[ft] = ee, Z[Zt] = at, ft = Zt);
          else if (x < j && 0 > f(V, at))
            Z[ft] = V, Z[x] = at, ft = x;
          else break t;
        }
      }
      return $;
    }
    function f(Z, $) {
      var at = Z.sortIndex - $.sortIndex;
      return at !== 0 ? at : Z.id - $.id;
    }
    if (i.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var d = performance;
      i.unstable_now = function() {
        return d.now();
      };
    } else {
      var h = Date, g = h.now();
      i.unstable_now = function() {
        return h.now() - g;
      };
    }
    var C = [], E = [], _ = 1, v = null, T = 3, U = !1, G = !1, w = !1, M = !1, K = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
    function k(Z) {
      for (var $ = c(E); $ !== null; ) {
        if ($.callback === null) r(E);
        else if ($.startTime <= Z)
          r(E), $.sortIndex = $.expirationTime, o(C, $);
        else break;
        $ = c(E);
      }
    }
    function J(Z) {
      if (w = !1, k(Z), !G)
        if (c(C) !== null)
          G = !0, Q || (Q = !0, ot());
        else {
          var $ = c(E);
          $ !== null && bt(J, $.startTime - Z);
        }
    }
    var Q = !1, q = -1, L = 5, it = -1;
    function Ot() {
      return M ? !0 : !(i.unstable_now() - it < L);
    }
    function ht() {
      if (M = !1, Q) {
        var Z = i.unstable_now();
        it = Z;
        var $ = !0;
        try {
          t: {
            G = !1, w && (w = !1, X(q), q = -1), U = !0;
            var at = T;
            try {
              e: {
                for (k(Z), v = c(C); v !== null && !(v.expirationTime > Z && Ot()); ) {
                  var ft = v.callback;
                  if (typeof ft == "function") {
                    v.callback = null, T = v.priorityLevel;
                    var j = ft(
                      v.expirationTime <= Z
                    );
                    if (Z = i.unstable_now(), typeof j == "function") {
                      v.callback = j, k(Z), $ = !0;
                      break e;
                    }
                    v === c(C) && r(C), k(Z);
                  } else r(C);
                  v = c(C);
                }
                if (v !== null) $ = !0;
                else {
                  var dt = c(E);
                  dt !== null && bt(
                    J,
                    dt.startTime - Z
                  ), $ = !1;
                }
              }
              break t;
            } finally {
              v = null, T = at, U = !1;
            }
            $ = void 0;
          }
        } finally {
          $ ? ot() : Q = !1;
        }
      }
    }
    var ot;
    if (typeof Y == "function")
      ot = function() {
        Y(ht);
      };
    else if (typeof MessageChannel < "u") {
      var Ht = new MessageChannel(), Lt = Ht.port2;
      Ht.port1.onmessage = ht, ot = function() {
        Lt.postMessage(null);
      };
    } else
      ot = function() {
        K(ht, 0);
      };
    function bt(Z, $) {
      q = K(function() {
        Z(i.unstable_now());
      }, $);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(Z) {
      Z.callback = null;
    }, i.unstable_forceFrameRate = function(Z) {
      0 > Z || 125 < Z ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : L = 0 < Z ? Math.floor(1e3 / Z) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return T;
    }, i.unstable_next = function(Z) {
      switch (T) {
        case 1:
        case 2:
        case 3:
          var $ = 3;
          break;
        default:
          $ = T;
      }
      var at = T;
      T = $;
      try {
        return Z();
      } finally {
        T = at;
      }
    }, i.unstable_requestPaint = function() {
      M = !0;
    }, i.unstable_runWithPriority = function(Z, $) {
      switch (Z) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Z = 3;
      }
      var at = T;
      T = Z;
      try {
        return $();
      } finally {
        T = at;
      }
    }, i.unstable_scheduleCallback = function(Z, $, at) {
      var ft = i.unstable_now();
      switch (typeof at == "object" && at !== null ? (at = at.delay, at = typeof at == "number" && 0 < at ? ft + at : ft) : at = ft, Z) {
        case 1:
          var j = -1;
          break;
        case 2:
          j = 250;
          break;
        case 5:
          j = 1073741823;
          break;
        case 4:
          j = 1e4;
          break;
        default:
          j = 5e3;
      }
      return j = at + j, Z = {
        id: _++,
        callback: $,
        priorityLevel: Z,
        startTime: at,
        expirationTime: j,
        sortIndex: -1
      }, at > ft ? (Z.sortIndex = at, o(E, Z), c(C) === null && Z === c(E) && (w ? (X(q), q = -1) : w = !0, bt(J, at - ft))) : (Z.sortIndex = j, o(C, Z), G || U || (G = !0, Q || (Q = !0, ot()))), Z;
    }, i.unstable_shouldYield = Ot, i.unstable_wrapCallback = function(Z) {
      var $ = T;
      return function() {
        var at = T;
        T = $;
        try {
          return Z.apply(this, arguments);
        } finally {
          T = at;
        }
      };
    };
  })(qs)), qs;
}
var yg;
function l1() {
  return yg || (yg = 1, Ys.exports = n1()), Ys.exports;
}
var Xs = { exports: {} }, Se = {};
var bg;
function a1() {
  if (bg) return Se;
  bg = 1;
  var i = yf();
  function o(_) {
    var v = "https://react.dev/errors/" + _;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var T = 2; T < arguments.length; T++)
        v += "&args[]=" + encodeURIComponent(arguments[T]);
    }
    return "Minified React error #" + _ + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c() {
  }
  var r = {
    d: {
      f: c,
      r: function() {
        throw Error(o(522));
      },
      D: c,
      C: c,
      L: c,
      m: c,
      X: c,
      S: c,
      M: c
    },
    p: 0,
    findDOMNode: null
  }, f = /* @__PURE__ */ Symbol.for("react.portal"), d = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function g(_, v, T) {
    var U = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: f,
      key: U == null ? null : U === h ? h : "" + U,
      children: _,
      containerInfo: v,
      implementation: T
    };
  }
  var C = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function E(_, v) {
    if (_ === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Se.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Se.browser = function(_) {
    return { $$typeof: d, _reason: _ };
  }, Se.createPortal = function(_, v) {
    var T = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(o(299));
    return g(_, v, null, T);
  }, Se.flushSync = function(_) {
    var v = C.T, T = r.p;
    try {
      if (C.T = null, r.p = 2, _) return _();
    } finally {
      C.T = v, r.p = T, r.d.f();
    }
  }, Se.preconnect = function(_, v) {
    typeof _ == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, r.d.C(_, v));
  }, Se.prefetchDNS = function(_) {
    typeof _ == "string" && r.d.D(_);
  }, Se.preinit = function(_, v) {
    if (typeof _ == "string" && v && typeof v.as == "string") {
      var T = v.as, U = E(T, v.crossOrigin), G = typeof v.integrity == "string" ? v.integrity : void 0, w = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      T === "style" ? r.d.S(
        _,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: U,
          integrity: G,
          fetchPriority: w
        }
      ) : T === "script" && r.d.X(_, {
        crossOrigin: U,
        integrity: G,
        fetchPriority: w,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Se.preinitModule = function(_, v) {
    if (typeof _ == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var T = E(
            v.as,
            v.crossOrigin
          );
          r.d.M(_, {
            crossOrigin: T,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && r.d.M(_);
  }, Se.preload = function(_, v) {
    if (typeof _ == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var T = v.as, U = E(T, v.crossOrigin);
      r.d.L(_, T, {
        crossOrigin: U,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Se.preloadModule = function(_, v) {
    if (typeof _ == "string")
      if (v) {
        var T = E(v.as, v.crossOrigin);
        r.d.m(_, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: T,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else r.d.m(_);
  }, Se.requestFormReset = function(_) {
    r.d.r(_);
  }, Se.unstable_batchedUpdates = function(_, v) {
    return _(v);
  }, Se.useFormState = function(_, v, T) {
    return C.H.useFormState(_, v, T);
  }, Se.useFormStatus = function() {
    return C.H.useHostTransitionStatus();
  }, Se.version = "19.3.1", Se;
}
var pg;
function Pg() {
  if (pg) return Xs.exports;
  pg = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (o) {
        console.error(o);
      }
  }
  return i(), Xs.exports = a1(), Xs.exports;
}
var Sg;
function u1() {
  if (Sg) return Pu;
  Sg = 1;
  var i = l1(), o = yf(), c = Pg();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function f(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function d(t) {
    for (var e = t, n = e; n && !n.alternate; )
      e = n, (e.flags & 4098) !== 0 && (t = e.return), n = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function C(t) {
    if (d(t) !== t)
      throw Error(r(188));
  }
  function E(t) {
    var e = t.alternate;
    if (!e) {
      if (e = d(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, l = e; ; ) {
      var a = n.return;
      if (a === null) break;
      var u = a.alternate;
      if (u === null) {
        if (l = a.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (a.child === u.child) {
        for (u = a.child; u; ) {
          if (u === n) return C(a), t;
          if (u === l) return C(a), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== l.return) n = a, l = u;
      else {
        for (var s = !1, m = a.child; m; ) {
          if (m === n) {
            s = !0, n = a, l = u;
            break;
          }
          if (m === l) {
            s = !0, l = a, n = u;
            break;
          }
          m = m.sibling;
        }
        if (!s) {
          for (m = u.child; m; ) {
            if (m === n) {
              s = !0, n = u, l = a;
              break;
            }
            if (m === l) {
              s = !0, l = u, n = a;
              break;
            }
            m = m.sibling;
          }
          if (!s) throw Error(r(189));
        }
      }
      if (n.alternate !== l) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function _(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = _(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function v(t, e, n, l, a, u) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, l, a, u) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && v(
        t.child,
        e,
        n,
        l,
        a,
        u
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function T(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function U(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function G(t) {
    var e = [null, null], n = T(t);
    return n === null || w(
      e,
      t,
      n.child,
      { foundSelf: !1 }
    ), e;
  }
  function w(t, e, n, l) {
    for (; n !== null; ) {
      if (n === e) l.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (l.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && w(
        t,
        e,
        n.child,
        l
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function M(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(r(559));
    }
  }
  var K = null, X = null;
  function Y(t, e, n) {
    return t === n ? !0 : t === e ? (K = t, !0) : !1;
  }
  function k(t, e, n) {
    return t === n ? (X = t, !1) : t === e ? (X !== null && (K = t), !0) : !1;
  }
  function J(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function Q(t, e, n) {
    for (var l = 0, a = t; a; a = n(a)) l++;
    a = 0;
    for (var u = e; u; u = n(u)) a++;
    for (; 0 < l - a; ) t = n(t), l--;
    for (; 0 < a - l; ) e = n(e), a--;
    for (; l--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var q = Object.assign, L = /* @__PURE__ */ Symbol.for("react.element"), it = /* @__PURE__ */ Symbol.for("react.transitional.element"), Ot = /* @__PURE__ */ Symbol.for("react.portal"), ht = /* @__PURE__ */ Symbol.for("react.fragment"), ot = /* @__PURE__ */ Symbol.for("react.strict_mode"), Ht = /* @__PURE__ */ Symbol.for("react.profiler"), Lt = /* @__PURE__ */ Symbol.for("react.consumer"), bt = /* @__PURE__ */ Symbol.for("react.context"), Z = /* @__PURE__ */ Symbol.for("react.forward_ref"), $ = /* @__PURE__ */ Symbol.for("react.suspense"), at = /* @__PURE__ */ Symbol.for("react.suspense_list"), ft = /* @__PURE__ */ Symbol.for("react.memo"), j = /* @__PURE__ */ Symbol.for("react.lazy"), dt = /* @__PURE__ */ Symbol.for("react.activity"), Zt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), ee = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), x = /* @__PURE__ */ Symbol.for("react.view_transition"), V = /* @__PURE__ */ Symbol.for("react.recoverable"), F = Symbol.iterator;
  function et(t) {
    return t === null || typeof t != "object" ? null : (t = F && t[F] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var pt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ut(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === pt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case ht:
        return "Fragment";
      case Ht:
        return "Profiler";
      case ot:
        return "StrictMode";
      case $:
        return "Suspense";
      case at:
        return "SuspenseList";
      case dt:
        return "Activity";
      case x:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Ot:
          return "Portal";
        case bt:
          return t.displayName || "Context";
        case Lt:
          return (t._context.displayName || "Context") + ".Consumer";
        case Z:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case ft:
          return e = t.displayName || null, e !== null ? e : ut(t.type) || "Memo";
        case j:
          e = t._payload, t = t._init;
          try {
            return ut(t(e));
          } catch {
          }
      }
    return null;
  }
  var vt = Array.isArray, P = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ct = c.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, je = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, Jn = [], na = -1;
  function mn(t) {
    return { current: t };
  }
  function de(t) {
    0 > na || (t.current = Jn[na], Jn[na] = null, na--);
  }
  function Vt(t, e) {
    na++, Jn[na] = t.current, t.current = e;
  }
  var vn = mn(null), lu = mn(null), In = mn(null), ui = mn(null);
  function ii(t, e) {
    switch (Vt(In, e), Vt(lu, t), Vt(vn, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? bh(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = bh(e), t = ph(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    de(vn), Vt(vn, t);
  }
  function la() {
    de(vn), de(lu), de(In);
  }
  function lr(t) {
    var e = t.memoizedState;
    e !== null && (Qa._currentValue = e.memoizedState, Vt(ui, t)), e = vn.current;
    var n = ph(e, t.type);
    e !== n && (Vt(lu, t), Vt(vn, n));
  }
  function oi(t) {
    lu.current === t && (de(vn), de(lu)), ui.current === t && (de(ui), Qa._currentValue = je);
  }
  var ar, Vf;
  function Fn(t) {
    if (ar === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        ar = e && e[1] || "", Vf = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ar + t + Vf;
  }
  var ur = !1;
  function ir(t, e) {
    if (!t || ur) return "";
    ur = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var B = function() {
                throw Error();
              };
              if (Object.defineProperty(B.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(B, []);
                } catch (I) {
                  var O = I;
                }
                Reflect.construct(t, [], B);
              } else {
                try {
                  B.call();
                } catch (I) {
                  O = I;
                }
                B = !1;
                try {
                  var N = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), B = !0, new t();
                } finally {
                  B && (N !== void 0 ? Object.defineProperty(t.prototype, "props", N) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (I) {
                O = I;
              }
              (B = t()) && typeof B.catch == "function" && B.catch(function() {
              });
            }
          } catch (I) {
            if (I && O && typeof I.stack == "string")
              return [I.stack, O.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var a = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      a && a.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = l.DetermineComponentFrameRoot(), s = u[0], m = u[1];
      if (s && m) {
        var y = s.split(`
`), z = m.split(`
`);
        for (a = l = 0; l < y.length && !y[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; a < z.length && !z[a].includes(
          "DetermineComponentFrameRoot"
        ); )
          a++;
        if (l === y.length || a === z.length)
          for (l = y.length - 1, a = z.length - 1; 1 <= l && 0 <= a && y[l] !== z[a]; )
            a--;
        for (; 1 <= l && 0 <= a; l--, a--)
          if (y[l] !== z[a]) {
            if (l !== 1 || a !== 1)
              do
                if (l--, a--, 0 > a || y[l] !== z[a]) {
                  var D = `
` + y[l].replace(" at new ", " at ");
                  return t.displayName && D.includes("<anonymous>") && (D = D.replace("<anonymous>", t.displayName)), D;
                }
              while (1 <= l && 0 <= a);
            break;
          }
      }
    } finally {
      ur = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Fn(n) : "";
  }
  function tb(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Fn(t.type);
      case 16:
        return Fn("Lazy");
      case 13:
        return t.child !== e && e !== null ? Fn("Suspense Fallback") : Fn("Suspense");
      case 19:
        return Fn("SuspenseList");
      case 0:
      case 15:
        return ir(t.type, !1);
      case 11:
        return ir(t.type.render, !1);
      case 1:
        return ir(t.type, !0);
      case 31:
        return Fn("Activity");
      case 30:
        return Fn("ViewTransition");
      default:
        return "";
    }
  }
  function Gf(t) {
    try {
      var e = "", n = null;
      do
        e += tb(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var or = Object.prototype.hasOwnProperty, rr = i.unstable_scheduleCallback, cr = i.unstable_cancelCallback, eb = i.unstable_shouldYield, nb = i.unstable_requestPaint, Ue = i.unstable_now, lb = i.unstable_getCurrentPriorityLevel, Yf = i.unstable_ImmediatePriority, qf = i.unstable_UserBlockingPriority, ri = i.unstable_NormalPriority, ab = i.unstable_LowPriority, Xf = i.unstable_IdlePriority, ub = i.log, ib = i.unstable_setDisableYieldValue, au = null, He = null;
  function $n(t) {
    if (typeof ub == "function" && ib(t), He && typeof He.setStrictMode == "function")
      try {
        He.setStrictMode(au, t);
      } catch {
      }
  }
  var Be = Math.clz32 ? Math.clz32 : cb, ob = Math.log, rb = Math.LN2;
  function cb(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ob(t) / rb | 0) | 0;
  }
  var ci = 256, si = 262144, fi = 4194304;
  function Al(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function di(t, e, n) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var a = 0, u = t.suspendedLanes, s = t.pingedLanes;
    t = t.warmLanes;
    var m = l & 134217727;
    return m !== 0 ? (l = m & ~u, l !== 0 ? a = Al(l) : (s &= m, s !== 0 ? a = Al(s) : n || (n = m & ~t, n !== 0 && (a = Al(n))))) : (m = l & ~u, m !== 0 ? a = Al(m) : s !== 0 ? a = Al(s) : n || (n = l & ~t, n !== 0 && (a = Al(n)))), a === 0 ? 0 : e !== 0 && e !== a && (e & u) === 0 && (u = a & -a, n = e & -e, u >= n || u === 32 && (n & 4194048) !== 0) ? e : a;
  }
  function uu(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Qf(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var l = 31 - Be(n), a = 1 << l;
        e |= t[l], n &= ~a;
      }
    return e;
  }
  function sb(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Zf() {
    var t = fi;
    return fi <<= 1, (fi & 62914560) === 0 && (fi = 4194304), t;
  }
  function sr(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function iu(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function fb(t, e, n, l, a, u) {
    var s = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var m = t.entanglements, y = t.expirationTimes, z = t.hiddenUpdates;
    for (n = s & ~n; 0 < n; ) {
      var D = 31 - Be(n), B = 1 << D;
      m[D] = 0, y[D] = -1;
      var O = z[D];
      if (O !== null)
        for (z[D] = null, D = 0; D < O.length; D++) {
          var N = O[D];
          N !== null && (N.lane &= -536870913);
        }
      n &= ~B;
    }
    l !== 0 && Kf(t, l, 0), u !== 0 && a === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(s & ~e));
  }
  function Kf(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - Be(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
  }
  function kf(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - Be(n), a = 1 << l;
      a & e | t[l] & e && (t[l] |= e), n &= ~a;
    }
  }
  function Jf(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : fr(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function fr(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function dr(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function If() {
    var t = ct.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : ng(t.type));
  }
  function Ff(t, e) {
    var n = ct.p;
    try {
      return ct.p = t, e();
    } finally {
      ct.p = n;
    }
  }
  var Rn = Math.random().toString(36).slice(2), me = "__reactFiber$" + Rn, Ae = "__reactProps$" + Rn, aa = "__reactContainer$" + Rn, $f = "__reactEvents$" + Rn, db = "__reactListeners$" + Rn, mb = "__reactHandles$" + Rn, Pf = "__reactResources$" + Rn, ou = "__reactMarker$" + Rn, mi = "__reactLoad$" + Rn;
  function vi(t) {
    delete t[me], delete t[Ae], delete t[db], delete t[mb];
  }
  function zl(t) {
    var e;
    if (e = t[me]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[aa] || n[me]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Hh(t); t !== null; ) {
            if (n = t[me]) return n;
            t = Hh(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ua(t) {
    if (t = t[me] || t[aa]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function ru(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function ia(t) {
    var e = t[Pf];
    return e || (e = t[Pf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function oe(t) {
    t[ou] = !0;
  }
  function Wf(t) {
    t[mi] = void 0;
  }
  var td = /* @__PURE__ */ new Set(), ed = {};
  function Rl(t, e) {
    oa(t, e), oa(t + "Capture", e);
  }
  function oa(t, e) {
    for (ed[t] = e, t = 0; t < e.length; t++)
      td.add(e[t]);
  }
  var vb = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), nd = {}, ld = {};
  function hb(t) {
    return or.call(ld, t) ? !0 : or.call(nd, t) ? !1 : vb.test(t) ? ld[t] = !0 : (nd[t] = !0, !1);
  }
  var Rt = !1;
  function ad() {
    var t = Rt;
    return Rt = !1, t;
  }
  function hi(t, e, n) {
    if (hb(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function gi(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, n);
    }
  }
  function Nn(t, e, n, l) {
    if (l === null) t.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, l);
    }
  }
  function Le(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function ud(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function gb(t, e, n) {
    var l = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var a = l.get, u = l.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return a.call(this);
        },
        set: function(s) {
          n = "" + s, u.call(this, s);
        }
      }), Object.defineProperty(t, e, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(s) {
          n = "" + s;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function mr(t) {
    if (!t._valueTracker) {
      var e = ud(t) ? "checked" : "value";
      t._valueTracker = gb(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function id(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = ud(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  var yb = /[\n"\\]/g;
  function Je(t) {
    return t.replace(
      yb,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function vr(t, e, n, l, a, u, s, m) {
    t.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? t.type = s : t.removeAttribute("type"), e != null ? s === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + Le(e)) : t.value !== "" + Le(e) && (t.value = "" + Le(e)) : s !== "submit" && s !== "reset" || t.removeAttribute("value"), e != null ? s === "number" && t.value == e ? hr(t, Le(t.value)) : hr(t, Le(e)) : n != null ? hr(t, Le(n)) : l != null && t.removeAttribute("value"), a == null && u != null && (t.defaultChecked = !!u), a != null && (t.checked = a && typeof a != "function" && typeof a != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.name = "" + Le(m) : t.removeAttribute("name");
  }
  function od(t, e, n, l, a, u, s, m) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        mr(t);
        return;
      }
      n = n != null ? "" + Le(n) : "", e = e != null ? "" + Le(e) : n, m || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? a, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = m ? t.checked : !!l, t.defaultChecked = !!l, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.name = s), mr(t);
  }
  function hr(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function ra(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var a = 0; a < n.length; a++)
        e["$" + n[a]] = !0;
      for (n = 0; n < t.length; n++)
        a = e.hasOwnProperty("$" + t[n].value), t[n].selected !== a && (t[n].selected = a), a && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + Le(n), e = null, a = 0; a < t.length; a++) {
        if (t[a].value === n) {
          t[a].selected = !0, l && (t[a].defaultSelected = !0);
          return;
        }
        e !== null || t[a].disabled || (e = t[a]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function rd(t, e, n) {
    if (e != null && (e = "" + Le(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + Le(n) : "";
  }
  function cd(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(r(92));
        if (vt(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = Le(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), mr(t);
  }
  function ca(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var bb = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function sd(t, e, n) {
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || bb.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function fd(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "", Rt = !0);
      for (var a in e)
        l = e[a], e.hasOwnProperty(a) && n[a] !== l && (sd(t, a, l), Rt = !0);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && sd(t, u, e[u]);
  }
  function gr(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var pb = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Sb = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function yi(t) {
    return Sb.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function hn() {
  }
  var yr = null;
  function br(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var sa = null, fa = null;
  function dd(t) {
    var e = ua(t);
    if (e && (t = e.stateNode)) {
      var n = t[Ae] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (vr(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Je(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var a = l[Ae] || null;
                if (!a) throw Error(r(90));
                vr(
                  l,
                  a.value,
                  a.defaultValue,
                  a.defaultValue,
                  a.checked,
                  a.defaultChecked,
                  a.type,
                  a.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              l = n[e], l.form === t.form && id(l);
          }
          break t;
        case "textarea":
          rd(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && ra(t, !!n.multiple, e, !1);
      }
    }
  }
  var pr = !1;
  function md(t, e, n) {
    if (pr) return t(e, n);
    pr = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (pr = !1, (sa !== null || fa !== null) && (bo(), sa && (e = sa, t = fa, fa = sa = null, dd(e), t)))
        for (e = 0; e < t.length; e++) dd(t[e]);
    }
  }
  function cu(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var l = n[Ae] || null;
    if (l === null) return null;
    n = l[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, e, typeof n)
      );
    return n;
  }
  var Dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Sr = !1;
  if (Dn)
    try {
      var su = {};
      Object.defineProperty(su, "passive", {
        get: function() {
          Sr = !0;
        }
      }), window.addEventListener("test", su, su), window.removeEventListener("test", su, su);
    } catch {
      Sr = !1;
    }
  var Pn = null, Er = null, bi = null;
  function vd() {
    if (bi) return bi;
    var t, e = Er, n = e.length, l, a = "value" in Pn ? Pn.value : Pn.textContent, u = a.length;
    for (t = 0; t < n && e[t] === a[t]; t++) ;
    var s = n - t;
    for (l = 1; l <= s && e[n - l] === a[u - l]; l++) ;
    return bi = a.slice(t, 1 < l ? 1 - l : void 0);
  }
  function pi(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Si() {
    return !0;
  }
  function hd() {
    return !1;
  }
  function Te(t) {
    function e(n, l, a, u, s) {
      this._reactName = n, this._targetInst = a, this.type = l, this.nativeEvent = u, this.target = s, this.currentTarget = null;
      for (var m in t)
        t.hasOwnProperty(m) && (n = t[m], this[m] = n ? n(u) : u[m]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? Si : hd, this.isPropagationStopped = hd, this;
    }
    return q(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Si);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Si);
      },
      persist: function() {
      },
      isPersistent: Si
    }), e;
  }
  var Wn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ei = Te(Wn), fu = q({}, Wn, { view: 0, detail: 0 }), Eb = Te(fu), Tr, xr, du, Ti = q({}, fu, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: _r,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== du && (du && t.type === "mousemove" ? (Tr = t.screenX - du.screenX, xr = t.screenY - du.screenY) : xr = Tr = 0, du = t), Tr);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : xr;
    }
  }), gd = Te(Ti), Tb = q({}, Ti, { dataTransfer: 0 }), xb = Te(Tb), Cb = q({}, fu, { relatedTarget: 0 }), Cr = Te(Cb), _b = q({}, Wn, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ob = Te(_b), Ab = q({}, Wn, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), zb = Te(Ab), Rb = q({}, Wn, { data: 0 }), yd = Te(Rb), Nb = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Db = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Mb = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function wb(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Mb[t]) ? !!e[t] : !1;
  }
  function _r() {
    return wb;
  }
  var jb = q({}, fu, {
    key: function(t) {
      if (t.key) {
        var e = Nb[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = pi(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Db[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: _r,
    charCode: function(t) {
      return t.type === "keypress" ? pi(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? pi(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Ub = Te(jb), Hb = q({}, Ti, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), bd = Te(Hb), Bb = q({}, Wn, { submitter: 0 }), Lb = Te(Bb), Vb = q({}, fu, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: _r
  }), Gb = Te(Vb), Yb = q({}, Wn, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), qb = Te(Yb), Xb = q({}, Ti, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Qb = Te(Xb), Zb = q({}, Wn, {
    newState: 0,
    oldState: 0,
    source: 0
  }), Kb = Te(Zb), kb = [9, 13, 27, 32], Or = Dn && "CompositionEvent" in window, mu = null;
  Dn && "documentMode" in document && (mu = document.documentMode);
  var Jb = Dn && "TextEvent" in window && !mu, pd = Dn && (!Or || mu && 8 < mu && 11 >= mu), Sd = " ", Ed = !1;
  function Td(t, e) {
    switch (t) {
      case "keyup":
        return kb.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function xd(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var da = !1;
  function Ib(t, e) {
    switch (t) {
      case "compositionend":
        return xd(e);
      case "keypress":
        return e.which !== 32 ? null : (Ed = !0, Sd);
      case "textInput":
        return t = e.data, t === Sd && Ed ? null : t;
      default:
        return null;
    }
  }
  function Fb(t, e) {
    if (da)
      return t === "compositionend" || !Or && Td(t, e) ? (t = vd(), bi = Er = Pn = null, da = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return pd && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var $b = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Cd(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!$b[t.type] : e === "textarea";
  }
  function _d(t, e, n, l) {
    sa ? fa ? fa.push(l) : fa = [l] : sa = l, e = Co(e, "onChange"), 0 < e.length && (n = new Ei(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var vu = null, hu = null;
  function Pb(t) {
    dh(t, 0);
  }
  function xi(t) {
    var e = ru(t);
    if (id(e)) return t;
  }
  function Od(t, e) {
    if (t === "change") return e;
  }
  var Ad = !1;
  if (Dn) {
    var Ar;
    if (Dn) {
      var zr = "oninput" in document;
      if (!zr) {
        var zd = document.createElement("div");
        zd.setAttribute("oninput", "return;"), zr = typeof zd.oninput == "function";
      }
      Ar = zr;
    } else Ar = !1;
    Ad = Ar && (!document.documentMode || 9 < document.documentMode);
  }
  function Rd() {
    vu && (vu.detachEvent("onpropertychange", Nd), hu = vu = null);
  }
  function Nd(t) {
    if (t.propertyName === "value" && xi(hu)) {
      var e = [];
      _d(
        e,
        hu,
        t,
        br(t)
      ), md(Pb, e);
    }
  }
  function Wb(t, e, n) {
    t === "focusin" ? (Rd(), vu = e, hu = n, vu.attachEvent("onpropertychange", Nd)) : t === "focusout" && Rd();
  }
  function tp(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xi(hu);
  }
  function ep(t, e) {
    if (t === "click") return xi(e);
  }
  function np(t, e) {
    if (t === "input" || t === "change")
      return xi(e);
  }
  function lp(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Ve = typeof Object.is == "function" ? Object.is : lp;
  function gu(t, e) {
    if (Ve(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var a = n[l];
      if (!or.call(e, a) || !Ve(t[a], e[a]))
        return !1;
    }
    return !0;
  }
  function Rr(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Dd(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Md(t, e) {
    var n = Dd(t);
    t = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = t + n.textContent.length, t <= e && l >= e)
          return { node: n, offset: e - t };
        t = l;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Dd(n);
    }
  }
  function wd(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? wd(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function jd(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Rr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Rr(t.document);
    }
    return e;
  }
  function Nr(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var ap = Dn && "documentMode" in document && 11 >= document.documentMode, ma = null, Dr = null, yu = null, Mr = !1;
  function Ud(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Mr || ma == null || ma !== Rr(l) || (l = ma, "selectionStart" in l && Nr(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), yu && gu(yu, l) || (yu = l, l = Co(Dr, "onSelect"), 0 < l.length && (e = new Ei(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = ma)));
  }
  function Nl(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var va = {
    animationend: Nl("Animation", "AnimationEnd"),
    animationiteration: Nl("Animation", "AnimationIteration"),
    animationstart: Nl("Animation", "AnimationStart"),
    transitionrun: Nl("Transition", "TransitionRun"),
    transitionstart: Nl("Transition", "TransitionStart"),
    transitioncancel: Nl("Transition", "TransitionCancel"),
    transitionend: Nl("Transition", "TransitionEnd")
  }, wr = {}, Hd = {};
  Dn && (Hd = document.createElement("div").style, "AnimationEvent" in window || (delete va.animationend.animation, delete va.animationiteration.animation, delete va.animationstart.animation), "TransitionEvent" in window || delete va.transitionend.transition);
  function Dl(t) {
    if (wr[t]) return wr[t];
    if (!va[t]) return t;
    var e = va[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Hd)
        return wr[t] = e[n];
    return t;
  }
  var Bd = Dl("animationend"), Ld = Dl("animationiteration"), Vd = Dl("animationstart"), up = Dl("transitionrun"), ip = Dl("transitionstart"), op = Dl("transitioncancel"), Gd = Dl("transitionend"), Yd = /* @__PURE__ */ new Map(), jr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  jr.push("scrollEnd");
  function un(t, e) {
    Yd.set(t, e), Rl(e, [t]);
  }
  var rp = 0;
  function Mn(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = sn.identifierPrefix;
    var n = rp++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function qd(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = ja;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = t[n[l]];
        if (a != null) {
          if (a === "none") return "none";
          e = e == null ? a : e + (" " + a);
        }
      }
    return e ?? t.default;
  }
  function wn(t, e) {
    return t = qd(t), e = qd(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Ci = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Ie = [], ha = 0, Ur = 0;
  function _i() {
    for (var t = ha, e = Ur = ha = 0; e < t; ) {
      var n = Ie[e];
      Ie[e++] = null;
      var l = Ie[e];
      Ie[e++] = null;
      var a = Ie[e];
      Ie[e++] = null;
      var u = Ie[e];
      if (Ie[e++] = null, l !== null && a !== null) {
        var s = l.pending;
        s === null ? a.next = a : (a.next = s.next, s.next = a), l.pending = a;
      }
      u !== 0 && Xd(n, a, u);
    }
  }
  function Oi(t, e, n, l) {
    Ie[ha++] = t, Ie[ha++] = e, Ie[ha++] = n, Ie[ha++] = l, Ur |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function Hr(t, e, n, l) {
    return Oi(t, e, n, l), Ai(t);
  }
  function Ml(t, e) {
    return Oi(t, null, null, e), Ai(t);
  }
  function Xd(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var a = !1, u = t.return; u !== null; )
      u.childLanes |= n, l = u.alternate, l !== null && (l.childLanes |= n), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (a = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, a && e !== null && (a = 31 - Be(n), t = u.hiddenUpdates, l = t[a], l === null ? t[a] = [e] : l.push(e), e.lane = n | 536870912), u) : null;
  }
  function Ai(t) {
    if (50 < Vu)
      throw Vu = 0, yo = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var ga = {};
  function cp(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ze(t, e, n, l) {
    return new cp(t, e, n, l);
  }
  function Br(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function jn(t, e) {
    var n = t.alternate;
    return n === null ? (n = ze(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function Qd(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function zi(t, e, n, l, a, u) {
    var s = 0;
    if (l = t, typeof l == "function") Br(l) && (s = 1);
    else if (typeof l == "string")
      s = BS(
        t,
        n,
        vn.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (l) {
        case dt:
          return t = ze(31, n, e, a), t.elementType = dt, t.lanes = u, t;
        case ht:
          return wl(n.children, a, u, e);
        case ot:
          s = 8, a |= 24;
          break;
        case Ht:
          return t = ze(12, n, e, a | 2), t.elementType = Ht, t.lanes = u, t;
        case $:
          return t = ze(13, n, e, a), t.elementType = $, t.lanes = u, t;
        case at:
          return t = ze(19, n, e, a), t.elementType = at, t.lanes = u, t;
        case Zt:
        case x:
          return t = a | 32, t = ze(30, n, e, t), t.elementType = x, t.lanes = u, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case bt:
                s = 10;
                break t;
              case Lt:
                s = 9;
                break t;
              case Z:
                s = 11;
                break t;
              case ft:
                s = 14;
                break t;
              case j:
                s = 16, l = null;
                break t;
            }
          s = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = ze(s, n, e, a), e.elementType = t, e.type = l, e.lanes = u, e;
  }
  function wl(t, e, n, l) {
    return t = ze(7, t, l, e), t.lanes = n, t;
  }
  function Lr(t, e, n) {
    return t = ze(6, t, null, e), t.lanes = n, t;
  }
  function Zd(t) {
    var e = ze(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Vr(t, e, n) {
    return e = ze(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var Kd = /* @__PURE__ */ new WeakMap();
  function Fe(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = Kd.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Gf(e)
      }, Kd.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Gf(e)
    };
  }
  var ya = [], ba = 0, Ri = null, bu = 0, $e = [], Pe = 0, tl = null, gn = 1, yn = "";
  function Un(t, e) {
    ya[ba++] = bu, ya[ba++] = Ri, Ri = t, bu = e;
  }
  function kd(t, e, n) {
    $e[Pe++] = gn, $e[Pe++] = yn, $e[Pe++] = tl, tl = t;
    var l = gn;
    t = yn;
    var a = 32 - Be(l) - 1;
    l &= ~(1 << a), n += 1;
    var u = 32 - Be(e) + a;
    if (30 < u) {
      var s = a - a % 5;
      u = (l & (1 << s) - 1).toString(32), l >>= s, a -= s, gn = 1 << 32 - Be(e) + a | n << a | l, yn = u + t;
    } else
      gn = 1 << u | n << a | l, yn = t;
  }
  function Ni(t) {
    t.return !== null && (Un(t, 1), kd(t, 1, 0));
  }
  function Gr(t) {
    for (; t === Ri; )
      Ri = ya[--ba], ya[ba] = null, bu = ya[--ba], ya[ba] = null;
    for (; t === tl; )
      tl = $e[--Pe], $e[Pe] = null, yn = $e[--Pe], $e[Pe] = null, gn = $e[--Pe], $e[Pe] = null;
  }
  function Jd(t, e) {
    $e[Pe++] = gn, $e[Pe++] = yn, $e[Pe++] = tl, gn = e.id, yn = e.overflow, tl = t;
  }
  var re = null, Gt = null, St = !1, el = null, We = !1, Yr = Error(r(519));
  function nl(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw pu(Fe(e, t)), Yr;
  }
  function Id(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[me] = t, e[Ae] = l, n) {
      case "dialog":
        xt("cancel", e), xt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        xt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Yu.length; n++)
          xt(Yu[n], e);
        break;
      case "source":
        xt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        xt("error", e), xt("load", e);
        break;
      case "details":
        xt("toggle", e);
        break;
      case "input":
        xt("invalid", e), od(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        xt("invalid", e);
        break;
      case "textarea":
        xt("invalid", e), cd(e, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || gh(e.textContent, n) ? (l.popover != null && (xt("beforetoggle", e), xt("toggle", e)), l.onScroll != null && xt("scroll", e), l.onScrollEnd != null && xt("scrollend", e), l.onClick != null && (e.onclick = hn), e = !0) : e = !1, e || nl(t, !0);
  }
  function Di(t) {
    for (re = t.return; re; )
      switch (re.tag) {
        case 5:
        case 31:
        case 13:
          We = !1;
          return;
        case 27:
        case 3:
          We = !0;
          return;
        default:
          re = re.return;
      }
  }
  function pa(t) {
    if (t !== re) return !1;
    if (!St) return Di(t), St = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || ys(t.type, t.memoizedProps)), n = !n), n && Gt && nl(t), Di(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Gt = Uh(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      Gt = Uh(t);
    } else
      e === 27 ? (e = Gt, bl(t.type) ? (t = Os, Os = null, Gt = t) : Gt = e) : Gt = re ? en(t.stateNode.nextSibling) : null;
    return !0;
  }
  function jl() {
    Gt = re = null, St = !1;
  }
  function qr() {
    var t = el;
    return t !== null && (De === null ? De = t : De.push.apply(
      De,
      t
    ), el = null), t;
  }
  function pu(t) {
    el === null ? el = [t] : el.push(t);
  }
  var Xr = mn(null), Ul = null, Hn = null;
  function ll(t, e, n) {
    Vt(Xr, e._currentValue), e._currentValue = n;
  }
  function Bn(t) {
    t._currentValue = Xr.current, de(Xr);
  }
  function Mi(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Qr(t, e, n, l) {
    var a = t.child;
    for (a !== null && (a.return = t); a !== null; ) {
      var u = a.dependencies;
      if (u !== null) {
        var s = a.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var m = u;
          u = a;
          for (var y = 0; y < e.length; y++)
            if (m.context === e[y]) {
              u.lanes |= n, m = u.alternate, m !== null && (m.lanes |= n), Mi(
                u.return,
                n,
                t
              ), l || (s = null);
              break t;
            }
          u = m.next;
        }
      } else if (a.tag === 18) {
        if (s = a.return, s === null) throw Error(r(341));
        s.lanes |= n, u = s.alternate, u !== null && (u.lanes |= n), Mi(s, n, t), s = null;
      } else
        a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), Mi(
          a.return,
          n,
          t
        ), s = a.child, s = s !== null ? s.sibling : null) : s = a.child;
      if (s !== null) s.return = a;
      else
        for (s = a; s !== null; ) {
          if (s === t) {
            s = null;
            break;
          }
          if (a = s.sibling, a !== null) {
            a.return = s.return, s = a;
            break;
          }
          s = s.return;
        }
      a = s;
    }
  }
  function Hl(t, e, n, l) {
    t = null;
    for (var a = e, u = !1; a !== null; ) {
      if (!u) {
        if ((a.flags & 524288) !== 0) u = !0;
        else if ((a.flags & 262144) !== 0) break;
      }
      if (a.tag === 10) {
        var s = a.alternate;
        if (s === null) throw Error(r(387));
        if (s = s.memoizedProps, s !== null) {
          var m = a.type;
          Ve(a.pendingProps.value, s.value) || (t !== null ? t.push(m) : t = [m]);
        }
      } else if (a === ui.current) {
        if (s = a.alternate, s === null) throw Error(r(387));
        s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (t !== null ? t.push(Qa) : t = [Qa]);
      }
      a = a.return;
    }
    return t !== null && Qr(
      e,
      t,
      n,
      l
    ), e.flags |= 262144, t !== null;
  }
  function wi(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Ve(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Bl(t) {
    Ul = t, Hn = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function ve(t) {
    return Fd(Ul, t);
  }
  function ji(t, e) {
    return Ul === null && Bl(t), Fd(t, e);
  }
  function Fd(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Hn === null) {
      if (t === null) throw Error(r(308));
      Hn = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Hn = Hn.next = e;
    return n;
  }
  var sp = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, fp = i.unstable_scheduleCallback, dp = i.unstable_NormalPriority, Ft = {
    $$typeof: bt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Zr() {
    return {
      controller: new sp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Su(t) {
    t.refCount--, t.refCount === 0 && fp(dp, function() {
      t.controller.abort();
    });
  }
  function $d(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var l = e[t];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var Eu = null;
  function mp(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var Tu = null, Kr = 0, Ll = 0, Sa = null;
  function vp(t, e) {
    if (Tu === null) {
      var n = Tu = [];
      Kr = 0, Ll = rs(), Sa = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Kr++, e.then(Pd, Pd), e;
  }
  function Pd() {
    if (--Kr === 0 && (Eu = null, Tu !== null)) {
      Sa !== null && (Sa.status = "fulfilled");
      var t = Tu;
      Tu = null, Ll = 0, Sa = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function hp(t, e) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(a) {
        n.push(a);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = e;
        for (var a = 0; a < n.length; a++) (0, n[a])(e);
      },
      function(a) {
        for (l.status = "rejected", l.reason = a, a = 0; a < n.length; a++)
          (0, n[a])(void 0);
      }
    ), l;
  }
  var Wd = P.S;
  P.S = function(t, e) {
    if (Zv = Ue(), typeof e == "object" && e !== null && typeof e.then == "function" && vp(t, e), Eu !== null)
      for (var n = La; n !== null; )
        $d(n, Eu), n = n.next;
    if (n = t.types, n !== null) {
      for (var l = La; l !== null; )
        $d(l, n), l = l.next;
      if (Ll !== 0) {
        l = Eu, l === null && (l = Eu = []);
        for (var a = 0; a < n.length; a++) {
          var u = n[a];
          l.indexOf(u) === -1 && l.push(u);
        }
      }
    }
    Wd !== null && Wd(t, e);
  };
  var Vl = mn(null);
  function kr() {
    var t = Vl.current;
    return t !== null ? t : Bt.pooledCache;
  }
  function Ui(t, e) {
    e === null ? Vt(Vl, Vl.current) : Vt(Vl, e.pool);
  }
  function tm() {
    var t = kr();
    return t === null ? null : { parent: Ft._currentValue, pool: t };
  }
  var Ea = Error(r(460)), Jr = Error(r(474)), Hi = Error(r(542)), Bi = { then: function() {
  } };
  function em(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function nm(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(hn, hn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, am(t), t === void 0 && !("reason" in e) ? Error(r(600)) : t;
      default:
        if (typeof e.status == "string") e.then(hn, hn);
        else {
          if (t = Bt, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(l) {
              if (e.status === "pending") {
                var a = e;
                a.status = "fulfilled", a.value = l;
              }
            },
            function(l) {
              if (e.status === "pending") {
                var a = e;
                a.status = "rejected", a.reason = l;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, am(t), t;
        }
        throw Yl = e, Ea;
    }
  }
  function Gl(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Yl = n, Ea) : n;
    }
  }
  var Yl = null;
  function lm() {
    if (Yl === null) throw Error(r(459));
    var t = Yl;
    return Yl = null, t;
  }
  function am(t) {
    if (t === Ea || t === Hi)
      throw Error(r(483));
  }
  var Ta = null, xu = 0;
  function Li(t) {
    var e = xu;
    return xu += 1, Ta === null && (Ta = []), nm(Ta, t, e);
  }
  function al(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Vi(t, e) {
    throw e.$$typeof === L ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function um(t) {
    function e(A, p) {
      if (t) {
        var R = A.deletions;
        R === null ? (A.deletions = [p], A.flags |= 16) : R.push(p);
      }
    }
    function n(A, p) {
      if (!t) return null;
      for (; p !== null; )
        e(A, p), p = p.sibling;
      return null;
    }
    function l(A) {
      for (var p = /* @__PURE__ */ new Map(); A !== null; )
        A.key === null ? p.set(A.index, A) : p.set(A.key, A), A = A.sibling;
      return p;
    }
    function a(A, p) {
      return A = jn(A, p), A.index = 0, A.sibling = null, A;
    }
    function u(A, p, R) {
      return A.index = R, t ? (R = A.alternate, R !== null ? (R = R.index, R < p ? (A.flags |= 2, p) : R) : (A.flags |= 134217730, p)) : (A.flags |= 1048576, p);
    }
    function s(A) {
      return t && A.alternate === null && (A.flags |= 134217730), A;
    }
    function m(A, p, R, H) {
      return p === null || p.tag !== 6 ? (p = Lr(R, A.mode, H), p.return = A, p) : (p = a(p, R), p.return = A, p);
    }
    function y(A, p, R, H) {
      var W = R.type;
      return W === ht ? (A = D(
        A,
        p,
        R.props.children,
        H,
        R.key
      ), al(A, R), A) : p !== null && (p.elementType === W || typeof W == "object" && W !== null && W.$$typeof === j && Gl(W) === p.type) ? (p = a(p, R.props), al(p, R), p.return = A, p) : (p = zi(
        R.type,
        R.key,
        R.props,
        null,
        A.mode,
        H
      ), al(p, R), p.return = A, p);
    }
    function z(A, p, R, H) {
      return p === null || p.tag !== 4 || p.stateNode.containerInfo !== R.containerInfo || p.stateNode.implementation !== R.implementation ? (p = Vr(R, A.mode, H), p.return = A, p) : (p = a(p, R.children || []), p.return = A, p);
    }
    function D(A, p, R, H, W) {
      return p === null || p.tag !== 7 ? (p = wl(
        R,
        A.mode,
        H,
        W
      ), p.return = A, p) : (p = a(p, R), p.return = A, p);
    }
    function B(A, p, R) {
      if (typeof p == "string" && p !== "" || typeof p == "number" || typeof p == "bigint")
        return p = Lr(
          "" + p,
          A.mode,
          R
        ), p.return = A, p;
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case it:
            return R = zi(
              p.type,
              p.key,
              p.props,
              null,
              A.mode,
              R
            ), al(R, p), R.return = A, R;
          case Ot:
            return p = Vr(
              p,
              A.mode,
              R
            ), p.return = A, p;
          case j:
            return p = Gl(p), B(A, p, R);
        }
        if (vt(p) || et(p))
          return p = wl(
            p,
            A.mode,
            R,
            null
          ), p.return = A, p;
        if (typeof p.then == "function")
          return B(A, Li(p), R);
        if (p.$$typeof === bt)
          return B(
            A,
            ji(A, p),
            R
          );
        Vi(A, p);
      }
      return null;
    }
    function O(A, p, R, H) {
      var W = p !== null ? p.key : null;
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return W !== null ? null : m(A, p, "" + R, H);
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case it:
            return R.key === W ? y(A, p, R, H) : null;
          case Ot:
            return R.key === W ? z(A, p, R, H) : null;
          case j:
            return R = Gl(R), O(A, p, R, H);
        }
        if (vt(R) || et(R))
          return W !== null ? null : D(A, p, R, H, null);
        if (typeof R.then == "function")
          return O(
            A,
            p,
            Li(R),
            H
          );
        if (R.$$typeof === bt)
          return O(
            A,
            p,
            ji(A, R),
            H
          );
        Vi(A, R);
      }
      return null;
    }
    function N(A, p, R, H, W) {
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return A = A.get(R) || null, m(p, A, "" + H, W);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case it:
            return A = A.get(
              H.key === null ? R : H.key
            ) || null, y(p, A, H, W);
          case Ot:
            return A = A.get(
              H.key === null ? R : H.key
            ) || null, z(p, A, H, W);
          case j:
            return H = Gl(H), N(
              A,
              p,
              R,
              H,
              W
            );
        }
        if (vt(H) || et(H))
          return A = A.get(R) || null, D(p, A, H, W, null);
        if (typeof H.then == "function")
          return N(
            A,
            p,
            R,
            Li(H),
            W
          );
        if (H.$$typeof === bt)
          return N(
            A,
            p,
            R,
            ji(p, H),
            W
          );
        Vi(p, H);
      }
      return null;
    }
    function I(A, p, R, H) {
      for (var W = null, _t = null, rt = p, st = p = 0, Wt = null; rt !== null && st < R.length; st++) {
        rt.index > st ? (Wt = rt, rt = null) : Wt = rt.sibling;
        var At = O(
          A,
          rt,
          R[st],
          H
        );
        if (At === null) {
          rt === null && (rt = Wt);
          break;
        }
        t && rt && At.alternate === null && e(A, rt), p = u(At, p, st), _t === null ? W = At : _t.sibling = At, _t = At, rt = Wt;
      }
      if (st === R.length)
        return n(A, rt), St && Un(A, st), W;
      if (rt === null) {
        for (; st < R.length; st++)
          rt = B(A, R[st], H), rt !== null && (p = u(
            rt,
            p,
            st
          ), _t === null ? W = rt : _t.sibling = rt, _t = rt);
        return St && Un(A, st), W;
      }
      for (rt = l(rt); st < R.length; st++)
        Wt = N(
          rt,
          A,
          st,
          R[st],
          H
        ), Wt !== null && (t && (At = Wt.alternate, At !== null && rt.delete(At.key === null ? st : At.key)), p = u(
          Wt,
          p,
          st
        ), _t === null ? W = Wt : _t.sibling = Wt, _t = Wt);
      return t && rt.forEach(function(xl) {
        return e(A, xl);
      }), St && Un(A, st), W;
    }
    function lt(A, p, R, H) {
      if (R == null) throw Error(r(151));
      for (var W = null, _t = null, rt = p, st = p = 0, Wt = null, At = R.next(); rt !== null && !At.done; st++, At = R.next()) {
        rt.index > st ? (Wt = rt, rt = null) : Wt = rt.sibling;
        var xl = O(A, rt, At.value, H);
        if (xl === null) {
          rt === null && (rt = Wt);
          break;
        }
        t && rt && xl.alternate === null && e(A, rt), p = u(xl, p, st), _t === null ? W = xl : _t.sibling = xl, _t = xl, rt = Wt;
      }
      if (At.done)
        return n(A, rt), St && Un(A, st), W;
      if (rt === null) {
        for (; !At.done; st++, At = R.next())
          At = B(A, At.value, H), At !== null && (p = u(At, p, st), _t === null ? W = At : _t.sibling = At, _t = At);
        return St && Un(A, st), W;
      }
      for (rt = l(rt); !At.done; st++, At = R.next())
        At = N(rt, A, st, At.value, H), At !== null && (t && (Wt = At.alternate, Wt !== null && rt.delete(
          Wt.key === null ? st : Wt.key
        )), p = u(At, p, st), _t === null ? W = At : _t.sibling = At, _t = At);
      return t && rt.forEach(function(IS) {
        return e(A, IS);
      }), St && Un(A, st), W;
    }
    function yt(A, p, R, H) {
      if (typeof R == "object" && R !== null && R.type === ht && R.key === null && R.props.ref === void 0 && (R = R.props.children), typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case it:
            t: {
              for (var W = R.key; p !== null; ) {
                if (p.key === W) {
                  if (W = R.type, W === ht) {
                    if (p.tag === 7) {
                      n(
                        A,
                        p.sibling
                      ), H = a(
                        p,
                        R.props.children
                      ), al(H, R), H.return = A, A = H;
                      break t;
                    }
                  } else if (p.elementType === W || typeof W == "object" && W !== null && W.$$typeof === j && Gl(W) === p.type) {
                    n(
                      A,
                      p.sibling
                    ), H = a(p, R.props), al(H, R), H.return = A, A = H;
                    break t;
                  }
                  n(A, p);
                  break;
                } else e(A, p);
                p = p.sibling;
              }
              R.type === ht ? (H = wl(
                R.props.children,
                A.mode,
                H,
                R.key
              ), al(H, R), H.return = A, A = H) : (H = zi(
                R.type,
                R.key,
                R.props,
                null,
                A.mode,
                H
              ), al(H, R), H.return = A, A = H);
            }
            return s(A);
          case Ot:
            t: {
              for (W = R.key; p !== null; ) {
                if (p.key === W)
                  if (p.tag === 4 && p.stateNode.containerInfo === R.containerInfo && p.stateNode.implementation === R.implementation) {
                    n(
                      A,
                      p.sibling
                    ), H = a(p, R.children || []), H.return = A, A = H;
                    break t;
                  } else {
                    n(A, p);
                    break;
                  }
                else e(A, p);
                p = p.sibling;
              }
              H = Vr(R, A.mode, H), H.return = A, A = H;
            }
            return s(A);
          case j:
            return R = Gl(R), yt(
              A,
              p,
              R,
              H
            );
        }
        if (vt(R))
          return I(
            A,
            p,
            R,
            H
          );
        if (et(R)) {
          if (W = et(R), typeof W != "function") throw Error(r(150));
          return R = W.call(R), lt(
            A,
            p,
            R,
            H
          );
        }
        if (typeof R.then == "function")
          return yt(
            A,
            p,
            Li(R),
            H
          );
        if (R.$$typeof === bt)
          return yt(
            A,
            p,
            ji(A, R),
            H
          );
        Vi(A, R);
      }
      return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (R = "" + R, p !== null && p.tag === 6 ? (n(A, p.sibling), H = a(p, R), H.return = A, A = H) : (n(A, p), H = Lr(R, A.mode, H), H.return = A, A = H), s(A)) : n(A, p);
    }
    return function(A, p, R, H) {
      try {
        xu = 0;
        var W = yt(
          A,
          p,
          R,
          H
        );
        return Ta = null, W;
      } catch (rt) {
        if (rt === Ea || rt === Hi) throw rt;
        var _t = ze(29, rt, null, A.mode);
        return _t.lanes = H, _t.return = A, _t;
      }
    };
  }
  var ql = um(!0), im = um(!1), ul = !1;
  function Ir(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Fr(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function il(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ol(t, e, n) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Nt & 2) !== 0) {
      var a = l.pending;
      return a === null ? e.next = e : (e.next = a.next, a.next = e), l.pending = e, e = Ai(t), Xd(t, null, n), e;
    }
    return Oi(t, l, e, n), Ai(t);
  }
  function Cu(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, kf(t, n);
    }
  }
  function $r(t, e) {
    var n = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var a = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var s = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? a = u = s : u = u.next = s, n = n.next;
        } while (n !== null);
        u === null ? a = u = e : u = u.next = e;
      } else a = u = e;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var Pr = !1;
  function _u() {
    if (Pr) {
      var t = Sa;
      if (t !== null) throw t;
    }
  }
  function Ou(t, e, n, l) {
    Pr = !1;
    var a = t.updateQueue;
    ul = !1;
    var u = a.firstBaseUpdate, s = a.lastBaseUpdate, m = a.shared.pending;
    if (m !== null) {
      a.shared.pending = null;
      var y = m, z = y.next;
      y.next = null, s === null ? u = z : s.next = z, s = y;
      var D = t.alternate;
      D !== null && (D = D.updateQueue, m = D.lastBaseUpdate, m !== s && (m === null ? D.firstBaseUpdate = z : m.next = z, D.lastBaseUpdate = y));
    }
    if (u !== null) {
      var B = a.baseState;
      s = 0, D = z = y = null, m = u;
      do {
        var O = m.lane & -536870913, N = O !== m.lane;
        if (N ? (Ct & O) === O : (l & O) === O) {
          O !== 0 && O === Ll && (Pr = !0), D !== null && (D = D.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          t: {
            var I = t, lt = m;
            O = e;
            var yt = n;
            switch (lt.tag) {
              case 1:
                if (I = lt.payload, typeof I == "function") {
                  B = I.call(yt, B, O);
                  break t;
                }
                B = I;
                break t;
              case 3:
                I.flags = I.flags & -65537 | 128;
              case 0:
                if (I = lt.payload, O = typeof I == "function" ? I.call(yt, B, O) : I, O == null) break t;
                B = q({}, B, O);
                break t;
              case 2:
                ul = !0;
            }
          }
          O = m.callback, O !== null && (t.flags |= 64, N && (t.flags |= 8192), N = a.callbacks, N === null ? a.callbacks = [O] : N.push(O));
        } else
          N = {
            lane: O,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, D === null ? (z = D = N, y = B) : D = D.next = N, s |= O;
        if (m = m.next, m === null) {
          if (m = a.shared.pending, m === null)
            break;
          N = m, m = N.next, N.next = null, a.lastBaseUpdate = N, a.shared.pending = null;
        }
      } while (!0);
      D === null && (y = B), a.baseState = y, a.firstBaseUpdate = z, a.lastBaseUpdate = D, u === null && (a.shared.lanes = 0), vl |= s, t.lanes = s, t.memoizedState = B;
    }
  }
  function om(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function rm(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        om(n[t], e);
  }
  var rl = mn(null), Gi = mn(0);
  function cm(t, e) {
    t = qn, Vt(Gi, t), Vt(rl, e), qn = t | e.baseLanes;
  }
  function Wr() {
    Vt(Gi, qn), Vt(rl, rl.current);
  }
  function tc() {
    qn = Gi.current, de(rl), de(Gi);
  }
  var he = mn(null), Ee = null;
  function cl(t) {
    var e = t.alternate;
    Vt(ge, ge.current & 1), Vt(he, t), Ee === null && (e === null || rl.current !== null || e.memoizedState !== null) && (Ee = t);
  }
  function ec(t) {
    Vt(ge, ge.current), Vt(he, t), Ee === null && (Ee = t);
  }
  function sm(t) {
    t.tag === 22 ? (Vt(ge, ge.current), Vt(he, t), Ee === null && (Ee = t)) : sl();
  }
  function sl() {
    Vt(ge, ge.current), Vt(he, he.current);
  }
  function Ge(t) {
    de(he), Ee === t && (Ee = null), de(ge);
  }
  var ge = mn(0);
  function Au(t, e) {
    Vt(he, he.current), Vt(ge, e);
  }
  function nc(t) {
    de(ge), de(he), Ee === t && (Ee = null);
  }
  function Yi(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Cs(n) || _s(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Ln = 0, gt = null, Ut = null, $t = null, qi = !1, xa = !1, Xl = !1, Xi = 0, zu = 0, Ca = null, gp = 0;
  function Kt() {
    throw Error(r(321));
  }
  function lc(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Ve(t[n], e[n])) return !1;
    return !0;
  }
  function ac(t, e, n, l, a, u) {
    return Ln = u, gt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, P.H = t === null || t.memoizedState === null ? km : Jm, Xl = !1, u = n(l, a), Xl = !1, xa && (u = dm(
      e,
      n,
      l,
      a
    )), fm(t), u;
  }
  function fm(t) {
    P.H = Fi;
    var e = Ut !== null && Ut.next !== null;
    if (Ln = 0, $t = Ut = gt = null, qi = !1, zu = 0, Ca = null, e) throw Error(r(300));
    t === null || Pt || (t = t.dependencies, t !== null && wi(t) && (Pt = !0));
  }
  function dm(t, e, n, l) {
    gt = t;
    var a = 0;
    do {
      if (xa && (Ca = null), zu = 0, xa = !1, 25 <= a) throw Error(r(301));
      if (a += 1, $t = Ut = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      P.H = Cp, u = e(n, l);
    } while (xa);
    return u;
  }
  function yp() {
    var t = P.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? Ru(e) : e, t = t.useState()[0], (Ut !== null ? Ut.memoizedState : null) !== t && (gt.flags |= 1024), e;
  }
  function uc() {
    var t = Xi !== 0;
    return Xi = 0, t;
  }
  function ic(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function oc(t) {
    if (qi) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      qi = !1;
    }
    Ln = 0, $t = Ut = gt = null, xa = !1, zu = Xi = 0, Ca = null;
  }
  function xe() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return $t === null ? gt.memoizedState = $t = t : $t = $t.next = t, $t;
  }
  function Jt() {
    if (Ut === null) {
      var t = gt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ut.next;
    var e = $t === null ? gt.memoizedState : $t.next;
    if (e !== null)
      $t = e, Ut = t;
    else {
      if (t === null)
        throw gt.alternate === null ? Error(r(467)) : Error(r(310));
      Ut = t, t = {
        memoizedState: Ut.memoizedState,
        baseState: Ut.baseState,
        baseQueue: Ut.baseQueue,
        queue: Ut.queue,
        next: null
      }, $t === null ? gt.memoizedState = $t = t : $t = $t.next = t;
    }
    return $t;
  }
  function Qi() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Ru(t) {
    var e = zu;
    return zu += 1, Ca === null && (Ca = []), t = nm(Ca, t, e), e = gt, ($t === null ? e.memoizedState : $t.next) === null && (e = e.alternate, P.H = e === null || e.memoizedState === null ? km : Jm), t;
  }
  function Zi(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return Ru(t);
      if (t.$$typeof === V) return;
      if (t.$$typeof === bt) return ve(t);
    }
    throw Error(r(438, String(t)));
  }
  function rc(t) {
    var e = null, n = gt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var l = gt.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(a) {
          return a.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Qi(), gt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = ee;
    return e.index++, n;
  }
  function Vn(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Ki(t) {
    var e = Jt();
    return cc(e, Ut, t);
  }
  function cc(t, e, n) {
    var l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = n;
    var a = t.baseQueue, u = l.pending;
    if (u !== null) {
      if (a !== null) {
        var s = a.next;
        a.next = u.next, u.next = s;
      }
      e.baseQueue = a = u, l.pending = null;
    }
    if (u = t.baseState, a === null) t.memoizedState = u;
    else {
      e = a.next;
      var m = s = null, y = null, z = e, D = !1;
      do {
        var B = z.lane & -536870913;
        if (B !== z.lane ? (Ct & B) === B : (Ln & B) === B) {
          var O = z.revertLane;
          if (O === 0)
            y !== null && (y = y.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }), B === Ll && (D = !0);
          else if ((Ln & O) === O) {
            z = z.next, O === Ll && (D = !0);
            continue;
          } else
            B = {
              lane: 0,
              revertLane: z.revertLane,
              gesture: null,
              action: z.action,
              hasEagerState: z.hasEagerState,
              eagerState: z.eagerState,
              next: null
            }, y === null ? (m = y = B, s = u) : y = y.next = B, gt.lanes |= O, vl |= O;
          B = z.action, Xl && n(u, B), u = z.hasEagerState ? z.eagerState : n(u, B);
        } else
          O = {
            lane: B,
            revertLane: z.revertLane,
            gesture: z.gesture,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          }, y === null ? (m = y = O, s = u) : y = y.next = O, gt.lanes |= B, vl |= B;
        z = z.next;
      } while (z !== null && z !== e);
      if (y === null ? s = u : y.next = m, !Ve(u, t.memoizedState) && (Pt = !0, D && (n = Sa, n !== null)))
        throw n;
      t.memoizedState = u, t.baseState = s, t.baseQueue = y, l.lastRenderedState = u;
    }
    return a === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function sc(t) {
    var e = Jt(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var l = n.dispatch, a = n.pending, u = e.memoizedState;
    if (a !== null) {
      n.pending = null;
      var s = a = a.next;
      do
        u = t(u, s.action), s = s.next;
      while (s !== a);
      Ve(u, e.memoizedState) || (Pt = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), n.lastRenderedState = u;
    }
    return [u, l];
  }
  function mm(t, e, n) {
    var l = gt, a = Jt(), u = St;
    if (u) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var s = !Ve(
      (Ut || a).memoizedState,
      n
    );
    if (s && (a.memoizedState = n, Pt = !0), a = a.queue, mc(gm.bind(null, l, a, t), [
      t
    ]), t = a.getSnapshot !== e || s || $t !== null && ($t.memoizedState.tag & 1) !== 0, _a(
      t ? 9 : 8,
      { destroy: void 0 },
      hm.bind(null, l, a, n, e),
      null
    ), t) {
      if (l.flags |= 2048, Bt === null) throw Error(r(349));
      u || (Ln & 127) !== 0 || vm(l, e, n);
    }
    return n;
  }
  function vm(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = gt.updateQueue, e === null ? (e = Qi(), gt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function hm(t, e, n, l) {
    e.value = n, e.getSnapshot = l, ym(e) && bm(t);
  }
  function gm(t, e, n) {
    return n(function() {
      ym(e) && bm(t);
    });
  }
  function ym(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Ve(t, n);
    } catch {
      return !0;
    }
  }
  function bm(t) {
    var e = Ml(t, 2);
    e !== null && Me(e, t, 2);
  }
  function fc(t) {
    var e = xe();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), Xl) {
        $n(!0);
        try {
          n();
        } finally {
          $n(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vn,
      lastRenderedState: t
    }, e;
  }
  function pm(t, e, n, l) {
    return t.baseState = n, cc(
      t,
      Ut,
      typeof l == "function" ? l : Vn
    );
  }
  function bp(t, e, n, l, a) {
    if (Ii(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: a,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(s) {
          u.listeners.push(s);
        }
      };
      P.T !== null ? n(!0) : u.isTransition = !1, l(u), n = e.pending, n === null ? (u.next = e.pending = u, Sm(e, u)) : (u.next = n.next, e.pending = n.next = u);
    }
  }
  function Sm(t, e) {
    var n = e.action, l = e.payload, a = t.state;
    if (e.isTransition) {
      var u = P.T, s = {};
      s.types = u !== null ? u.types : null, P.T = s;
      try {
        var m = n(a, l), y = P.S;
        y !== null && y(s, m), Em(t, e, m);
      } catch (z) {
        dc(t, e, z);
      } finally {
        u !== null && s.types !== null && (u.types = s.types), P.T = u;
      }
    } else
      try {
        u = n(a, l), Em(t, e, u);
      } catch (z) {
        dc(t, e, z);
      }
  }
  function Em(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Tm(t, e, l);
      },
      function(l) {
        return dc(t, e, l);
      }
    ) : Tm(t, e, n);
  }
  function Tm(t, e, n) {
    e.status = "fulfilled", e.value = n, xm(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Sm(t, n)));
  }
  function dc(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, xm(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function xm(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Cm(t, e) {
    return e;
  }
  function _m(t, e) {
    if (St) {
      var n = Bt.formState;
      if (n !== null) {
        t: {
          var l = gt;
          if (St) {
            if (Gt) {
              e: {
                for (var a = Gt, u = We; a.nodeType !== 8; ) {
                  if (!u) {
                    a = null;
                    break e;
                  }
                  if (a = en(
                    a.nextSibling
                  ), a === null) {
                    a = null;
                    break e;
                  }
                }
                u = a.data, a = u === "F!" || u === "F" ? a : null;
              }
              if (a) {
                Gt = en(
                  a.nextSibling
                ), l = a.data === "F!";
                break t;
              }
            }
            nl(l);
          }
          l = !1;
        }
        l && (e = n[0]);
      }
    }
    return n = xe(), n.memoizedState = n.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Cm,
      lastRenderedState: e
    }, n.queue = l, n = Qm.bind(
      null,
      gt,
      l
    ), l.dispatch = n, l = fc(!1), u = bc.bind(
      null,
      gt,
      !1,
      l.queue
    ), l = xe(), a = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = a, n = bp.bind(
      null,
      gt,
      a,
      u,
      n
    ), a.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function Om(t) {
    var e = Jt();
    return Am(e, Ut, t);
  }
  function Am(t, e, n) {
    if (e = cc(
      t,
      e,
      Cm
    )[0], t = Ki(Vn)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = Ru(e);
      } catch (s) {
        throw s === Ea ? Hi : s;
      }
    else l = e;
    e = Jt();
    var a = e.queue, u = a.dispatch;
    return n !== e.memoizedState && (gt.flags |= 2048, _a(
      9,
      { destroy: void 0 },
      pp.bind(null, a, n),
      null
    )), [l, u, t];
  }
  function pp(t, e) {
    t.action = e;
  }
  function zm(t) {
    var e = Jt(), n = Ut;
    if (n !== null)
      return Am(e, n, t);
    Jt(), e = e.memoizedState, n = Jt();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function _a(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = gt.updateQueue, e === null && (e = Qi(), gt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Rm() {
    return Jt().memoizedState;
  }
  function ki(t, e, n, l) {
    var a = xe();
    gt.flags |= t, a.memoizedState = _a(
      1 | e,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Ji(t, e, n, l) {
    var a = Jt();
    l = l === void 0 ? null : l;
    var u = a.memoizedState.inst;
    Ut !== null && l !== null && lc(l, Ut.memoizedState.deps) ? a.memoizedState = _a(e, u, n, l) : (gt.flags |= t, a.memoizedState = _a(
      1 | e,
      u,
      n,
      l
    ));
  }
  function Nm(t, e) {
    ki(8390656, 8, t, e);
  }
  function mc(t, e) {
    Ji(2048, 8, t, e);
  }
  function Sp(t) {
    gt.flags |= 4;
    var e = gt.updateQueue;
    if (e === null)
      e = Qi(), gt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function Dm(t) {
    var e = Jt().memoizedState;
    return Sp({ ref: e, nextImpl: t }), function() {
      if ((Nt & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Mm(t, e) {
    return Ji(4, 2, t, e);
  }
  function wm(t, e) {
    return Ji(4, 4, t, e);
  }
  function jm(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Um(t, e, n) {
    n = n != null ? n.concat([t]) : null, Ji(4, 4, jm.bind(null, e, t), n);
  }
  function vc() {
  }
  function Hm(t, e) {
    var n = Jt();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && lc(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function Bm(t, e) {
    var n = Jt();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && lc(e, l[1]))
      return l[0];
    if (l = t(), Xl) {
      $n(!0);
      try {
        t();
      } finally {
        $n(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function hc(t, e, n) {
    return n === void 0 || (Ln & 1073741824) !== 0 && (Ct & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = kv(), gt.lanes |= t, vl |= t, n);
  }
  function Lm(t, e, n, l) {
    return Ve(n, e) ? n : rl.current !== null ? (t = hc(t, n, l), Ve(t, e) || (Pt = !0), t) : (Ln & 106) === 0 || (Ln & 1073741824) !== 0 && (Ct & 261930) === 0 ? (Pt = !0, t.memoizedState = n) : (t = kv(), gt.lanes |= t, vl |= t, e);
  }
  function Vm(t, e, n, l, a) {
    var u = ct.p;
    ct.p = u !== 0 && 8 > u ? u : 8;
    var s = P.T, m = {};
    m.types = s !== null ? s.types : null, P.T = m, bc(t, !1, e, n);
    try {
      var y = a(), z = P.S;
      if (z !== null && z(m, y), y !== null && typeof y == "object" && typeof y.then == "function") {
        var D = hp(
          y,
          l
        );
        Nu(
          t,
          e,
          D,
          Qe(t)
        );
      } else
        Nu(
          t,
          e,
          l,
          Qe(t)
        );
    } catch (B) {
      Nu(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: B },
        Qe()
      );
    } finally {
      ct.p = u, s !== null && m.types !== null && (s.types = m.types), P.T = s;
    }
  }
  function Ep() {
  }
  function gc(t, e, n, l) {
    if (t.tag !== 5) throw Error(r(476));
    var a = Gm(t).queue;
    Vm(
      t,
      a,
      e,
      je,
      n === null ? Ep : function() {
        return Ym(t), n(l);
      }
    );
  }
  function Gm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: je,
      baseState: je,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vn,
        lastRenderedState: je
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vn,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function Ym(t) {
    var e = Gm(t);
    e.next === null && (e = t.alternate.memoizedState), Nu(
      t,
      e.next.queue,
      {},
      Qe()
    );
  }
  function yc() {
    return ve(Qa);
  }
  function qm() {
    return Jt().memoizedState;
  }
  function Xm() {
    return Jt().memoizedState;
  }
  function Tp(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Qe();
          t = il(n);
          var l = ol(e, t, n);
          l !== null && (Me(l, e, n), Cu(l, e, n)), e = { cache: Zr() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function xp(t, e, n) {
    var l = Qe();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ii(t) ? Zm(e, n) : (n = Hr(t, e, n, l), n !== null && (Me(n, t, l), Km(n, e, l)));
  }
  function Qm(t, e, n) {
    var l = Qe();
    Nu(t, e, n, l);
  }
  function Nu(t, e, n, l) {
    var a = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ii(t)) Zm(e, a);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var s = e.lastRenderedState, m = u(s, n);
          if (a.hasEagerState = !0, a.eagerState = m, Ve(m, s))
            return Oi(t, e, a, 0), Bt === null && _i(), !1;
        } catch {
        }
      if (n = Hr(t, e, a, l), n !== null)
        return Me(n, t, l), Km(n, e, l), !0;
    }
    return !1;
  }
  function bc(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: rs(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ii(t)) {
      if (e) throw Error(r(479));
    } else
      e = Hr(
        t,
        n,
        l,
        2
      ), e !== null && Me(e, t, 2);
  }
  function Ii(t) {
    var e = t.alternate;
    return t === gt || e !== null && e === gt;
  }
  function Zm(t, e) {
    xa = qi = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function Km(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, kf(t, n);
    }
  }
  var Fi = {
    readContext: ve,
    use: Zi,
    useCallback: Kt,
    useContext: Kt,
    useEffect: Kt,
    useImperativeHandle: Kt,
    useLayoutEffect: Kt,
    useInsertionEffect: Kt,
    useMemo: Kt,
    useReducer: Kt,
    useRef: Kt,
    useState: Kt,
    useDebugValue: Kt,
    useDeferredValue: Kt,
    useTransition: Kt,
    useSyncExternalStore: Kt,
    useId: Kt,
    useHostTransitionStatus: Kt,
    useFormState: Kt,
    useActionState: Kt,
    useOptimistic: Kt,
    useMemoCache: Kt,
    useCacheRefresh: Kt,
    useEffectEvent: Kt
  }, km = {
    readContext: ve,
    use: Zi,
    useCallback: function(t, e) {
      return xe().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: ve,
    useEffect: Nm,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, ki(
        4194308,
        4,
        jm.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return ki(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      ki(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = xe();
      e = e === void 0 ? null : e;
      var l = t();
      if (Xl) {
        $n(!0);
        try {
          t();
        } finally {
          $n(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = xe();
      if (n !== void 0) {
        var a = n(e);
        if (Xl) {
          $n(!0);
          try {
            n(e);
          } finally {
            $n(!1);
          }
        }
      } else a = e;
      return l.memoizedState = l.baseState = a, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: a
      }, l.queue = t, t = t.dispatch = xp.bind(
        null,
        gt,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = xe();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = fc(t);
      var e = t.queue, n = Qm.bind(null, gt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: vc,
    useDeferredValue: function(t, e) {
      var n = xe();
      return hc(n, t, e);
    },
    useTransition: function() {
      var t = fc(!1);
      return t = Vm.bind(
        null,
        gt,
        t.queue,
        !0,
        !1
      ), xe().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var l = gt, a = xe();
      if (St) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), Bt === null)
          throw Error(r(349));
        (Ct & 127) !== 0 || vm(l, e, n);
      }
      a.memoizedState = n;
      var u = { value: n, getSnapshot: e };
      return a.queue = u, Nm(gm.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, _a(
        9,
        { destroy: void 0 },
        hm.bind(
          null,
          l,
          u,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = xe(), e = Bt.identifierPrefix;
      if (St) {
        var n = yn, l = gn;
        n = (l & ~(1 << 32 - Be(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Xi++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = gp++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: yc,
    useFormState: _m,
    useActionState: _m,
    useOptimistic: function(t) {
      var e = xe();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = bc.bind(
        null,
        gt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: rc,
    useCacheRefresh: function() {
      return xe().memoizedState = Tp.bind(
        null,
        gt
      );
    },
    useEffectEvent: function(t) {
      var e = xe(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((Nt & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, Jm = {
    readContext: ve,
    use: Zi,
    useCallback: Hm,
    useContext: ve,
    useEffect: mc,
    useImperativeHandle: Um,
    useInsertionEffect: Mm,
    useLayoutEffect: wm,
    useMemo: Bm,
    useReducer: Ki,
    useRef: Rm,
    useState: function() {
      return Ki(Vn);
    },
    useDebugValue: vc,
    useDeferredValue: function(t, e) {
      var n = Jt();
      return Lm(
        n,
        Ut.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ki(Vn)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ru(t),
        e
      ];
    },
    useSyncExternalStore: mm,
    useId: qm,
    useHostTransitionStatus: yc,
    useFormState: Om,
    useActionState: Om,
    useOptimistic: function(t, e) {
      var n = Jt();
      return pm(n, Ut, t, e);
    },
    useMemoCache: rc,
    useCacheRefresh: Xm,
    useEffectEvent: Dm
  }, Cp = {
    readContext: ve,
    use: Zi,
    useCallback: Hm,
    useContext: ve,
    useEffect: mc,
    useImperativeHandle: Um,
    useInsertionEffect: Mm,
    useLayoutEffect: wm,
    useMemo: Bm,
    useReducer: sc,
    useRef: Rm,
    useState: function() {
      return sc(Vn);
    },
    useDebugValue: vc,
    useDeferredValue: function(t, e) {
      var n = Jt();
      return Ut === null ? hc(n, t, e) : Lm(
        n,
        Ut.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = sc(Vn)[0], e = Jt().memoizedState;
      return [
        typeof t == "boolean" ? t : Ru(t),
        e
      ];
    },
    useSyncExternalStore: mm,
    useId: qm,
    useHostTransitionStatus: yc,
    useFormState: zm,
    useActionState: zm,
    useOptimistic: function(t, e) {
      var n = Jt();
      return Ut !== null ? pm(n, Ut, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: rc,
    useCacheRefresh: Xm,
    useEffectEvent: Dm
  };
  function pc(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : q({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Sc = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = Qe(), a = il(l);
      a.payload = e, n != null && (a.callback = n), e = ol(t, a, l), e !== null && (Me(e, t, l), Cu(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = Qe(), a = il(l);
      a.tag = 1, a.payload = e, n != null && (a.callback = n), e = ol(t, a, l), e !== null && (Me(e, t, l), Cu(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Qe(), l = il(n);
      l.tag = 2, e != null && (l.callback = e), e = ol(t, l, n), e !== null && (Me(e, t, n), Cu(e, t, n));
    }
  };
  function Im(t, e, n, l, a, u, s) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, s) : e.prototype && e.prototype.isPureReactComponent ? !gu(n, l) || !gu(a, u) : !0;
  }
  function Fm(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && Sc.enqueueReplaceState(e, e.state, null);
  }
  function Ql(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = q({}, n));
      for (var a in t)
        n[a] === void 0 && (n[a] = t[a]);
    }
    return n;
  }
  function $m(t) {
    Ci(t);
  }
  function Pm(t) {
    console.error(t);
  }
  function Wm(t) {
    Ci(t);
  }
  function $i(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function tv(t, e, n) {
    try {
      var l = t.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (a) {
      setTimeout(function() {
        throw a;
      });
    }
  }
  function Ec(t, e, n) {
    return n = il(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      $i(t, e);
    }, n;
  }
  function ev(t) {
    return t = il(t), t.tag = 3, t;
  }
  function nv(t, e, n, l) {
    var a = n.type.getDerivedStateFromError;
    if (typeof a == "function") {
      var u = l.value;
      t.payload = function() {
        return a(u);
      }, t.callback = function() {
        tv(e, n, l);
      };
    }
    var s = n.stateNode;
    s !== null && typeof s.componentDidCatch == "function" && (t.callback = function() {
      tv(e, n, l), typeof a != "function" && (hl === null ? hl = /* @__PURE__ */ new Set([this]) : hl.add(this));
      var m = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function _p(t, e, n, l, a) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = n.alternate, e !== null && Hl(
        e,
        n,
        a,
        !0
      ), n = he.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Ee === null ? po() : n.alternate === null && kt === 0 && (kt = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, l === Bi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), us(t, l, a)), !1;
          case 22:
            return n.flags |= 65536, l === Bi ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), us(t, l, a)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return us(t, l, a), po(), !1;
    }
    if (St)
      return e = he.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = a, l !== Yr && (t = Error(r(422), { cause: l }), pu(Fe(t, n)))) : (l !== Yr && (e = Error(r(423), {
        cause: l
      }), pu(
        Fe(e, n)
      )), t = t.current.alternate, t.flags |= 65536, a &= -a, t.lanes |= a, l = Fe(l, n), a = Ec(
        t.stateNode,
        l,
        a
      ), $r(t, a), kt !== 4 && (kt = 2)), !1;
    var u = Error(r(520), { cause: l });
    if (u = Fe(u, n), Lu === null ? Lu = [u] : Lu.push(u), kt !== 4 && (kt = 2), e === null) return !0;
    l = Fe(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = a & -a, n.lanes |= t, t = Ec(n.stateNode, l, t), $r(n, t), !1;
        case 1:
          if (e = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (hl === null || !hl.has(u))))
            return n.flags |= 65536, a &= -a, n.lanes |= a, a = ev(a), nv(
              a,
              t,
              n,
              l
            ), $r(n, a), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Tc = Error(r(461)), Pt = !1;
  function ne(t, e, n, l) {
    e.child = t === null ? im(e, null, n, l) : ql(
      e,
      t.child,
      n,
      l
    );
  }
  function lv(t, e, n, l, a) {
    n = n.render;
    var u = e.ref;
    if ("ref" in l) {
      var s = {};
      for (var m in l)
        m !== "ref" && (s[m] = l[m]);
    } else s = l;
    return Bl(e), l = ac(
      t,
      e,
      n,
      s,
      u,
      a
    ), m = uc(), t !== null && !Pt ? (ic(t, e, a), Gn(t, e, a)) : (St && m && Ni(e), e.flags |= 1, ne(t, e, l, a), e.child);
  }
  function av(t, e, n, l, a) {
    if (t === null) {
      var u = n.type;
      return typeof u == "function" && !Br(u) && u.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = u, uv(
        t,
        e,
        u,
        l,
        a
      )) : (t = zi(
        n.type,
        null,
        l,
        e,
        e.mode,
        a
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !Nc(t, a)) {
      var s = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : gu, n(s, l) && t.ref === e.ref)
        return Gn(t, e, a);
    }
    return e.flags |= 1, t = jn(u, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function uv(t, e, n, l, a) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (gu(u, l) && t.ref === e.ref)
        if (Pt = !1, e.pendingProps = l = u, Nc(t, a))
          (t.flags & 131072) !== 0 && (Pt = !0);
        else
          return e.lanes = t.lanes, Gn(t, e, a);
    }
    return xc(
      t,
      e,
      n,
      l,
      a
    );
  }
  function iv(t, e, n, l) {
    var a = l.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, t !== null) {
          for (l = e.child = t.child, a = 0; l !== null; )
            a = a | l.lanes | l.childLanes, l = l.sibling;
          l = a & ~u;
        } else l = 0, e.child = null;
        return ov(
          t,
          e,
          u,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Ui(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? cm(e, u) : Wr(), sm(e);
      else
        return l = e.lanes = 536870912, ov(
          t,
          e,
          u !== null ? u.baseLanes | n : n,
          n,
          l
        );
    } else
      u !== null ? (Ui(e, u.cachePool), cm(e, u), sl(), e.memoizedState = null) : (t !== null && Ui(e, null), Wr(), sl());
    return ne(t, e, a, n), e.child;
  }
  function Du(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function ov(t, e, n, l, a) {
    var u = kr();
    return u = u === null ? null : { parent: Ft._currentValue, pool: u }, e.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, t !== null && Ui(e, null), Wr(), sm(e), t !== null && Hl(t, e, l, !0), e.childLanes = a, null;
  }
  function Pi(t, e) {
    return e = Wi(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function rv(t, e, n) {
    return ql(e, t.child, null, n), t = Pi(e, e.pendingProps), t.flags |= 2, Ge(e), e.memoizedState = null, t;
  }
  function Op(t, e, n) {
    var l = e.pendingProps, a = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (St) {
        if (l.mode === "hidden")
          return t = Pi(e, l), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, Du(null, t);
        if (ec(e), (t = Gt) ? (t = jh(
          t,
          We
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: tl !== null ? { id: gn, overflow: yn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Zd(t), n.return = e, e.child = n, re = e, Gt = null)) : t = null, t === null) throw nl(e);
        return e.lanes = 536870912, null;
      }
      return Pi(e, l);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var s = u.dehydrated;
      if (ec(e), a)
        if (e.flags & 256)
          e.flags &= -257, e = rv(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (Pt || Hl(t, e, n, !1), a = (n & t.childLanes) !== 0, Pt || a) {
        if (rl.current === null) {
          if (l = Bt, l !== null && (s = Jf(l, n), s !== 0 && s !== u.retryLane))
            throw u.retryLane = s, Ml(t, s), Me(l, t, s), Tc;
          po();
        }
        e = rv(
          t,
          e,
          n
        );
      } else
        t = u.treeContext, Gt = en(s.nextSibling), re = e, St = !0, el = null, We = !1, t !== null && Jd(e, t), e = Pi(e, l), e.flags |= 134221824;
      return e;
    }
    return t = jn(t.child, {
      mode: l.mode,
      children: l.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Oa(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function xc(t, e, n, l, a) {
    return Bl(e), n = ac(
      t,
      e,
      n,
      l,
      void 0,
      a
    ), l = uc(), t !== null && !Pt ? (ic(t, e, a), Gn(t, e, a)) : (St && l && Ni(e), e.flags |= 1, ne(t, e, n, a), e.child);
  }
  function cv(t, e, n, l, a, u) {
    return Bl(e), e.updateQueue = null, n = dm(
      e,
      l,
      n,
      a
    ), fm(t), l = uc(), t !== null && !Pt ? (ic(t, e, u), Gn(t, e, u)) : (St && l && Ni(e), e.flags |= 1, ne(t, e, n, u), e.child);
  }
  function sv(t, e, n, l, a) {
    if (Bl(e), e.stateNode === null) {
      var u = ga, s = n.contextType;
      typeof s == "object" && s !== null && (u = ve(s)), u = new n(l, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = Sc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = l, u.state = e.memoizedState, u.refs = {}, Ir(e), s = n.contextType, u.context = typeof s == "object" && s !== null ? ve(s) : ga, u.state = e.memoizedState, s = n.getDerivedStateFromProps, typeof s == "function" && (pc(
        e,
        n,
        s,
        l
      ), u.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (s = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), s !== u.state && Sc.enqueueReplaceState(u, u.state, null), Ou(e, l, u, a), _u(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = e.stateNode;
      var m = e.memoizedProps, y = Ql(n, m);
      u.props = y;
      var z = u.context, D = n.contextType;
      s = ga, typeof D == "object" && D !== null && (s = ve(D));
      var B = n.getDerivedStateFromProps;
      D = typeof B == "function" || typeof u.getSnapshotBeforeUpdate == "function", m = e.pendingProps !== m, D || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (m || z !== s) && Fm(
        e,
        u,
        l,
        s
      ), ul = !1;
      var O = e.memoizedState;
      u.state = O, Ou(e, l, u, a), _u(), z = e.memoizedState, m || O !== z || ul ? (typeof B == "function" && (pc(
        e,
        n,
        B,
        l
      ), z = e.memoizedState), (y = ul || Im(
        e,
        n,
        y,
        l,
        O,
        z,
        s
      )) ? (D || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = z), u.props = l, u.state = z, u.context = s, l = y) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      u = e.stateNode, Fr(t, e), s = e.memoizedProps, D = Ql(n, s), u.props = D, B = e.pendingProps, O = u.context, z = n.contextType, y = ga, typeof z == "object" && z !== null && (y = ve(z)), m = n.getDerivedStateFromProps, (z = typeof m == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s !== B || O !== y) && Fm(
        e,
        u,
        l,
        y
      ), ul = !1, O = e.memoizedState, u.state = O, Ou(e, l, u, a), _u();
      var N = e.memoizedState;
      s !== B || O !== N || ul || t !== null && t.dependencies !== null && wi(t.dependencies) ? (typeof m == "function" && (pc(
        e,
        n,
        m,
        l
      ), N = e.memoizedState), (D = ul || Im(
        e,
        n,
        D,
        l,
        O,
        N,
        y
      ) || t !== null && t.dependencies !== null && wi(t.dependencies)) ? (z || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, N, y), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        N,
        y
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || s === t.memoizedProps && O === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && O === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = N), u.props = l, u.state = N, u.context = y, l = D) : (typeof u.componentDidUpdate != "function" || s === t.memoizedProps && O === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === t.memoizedProps && O === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return u = l, Oa(t, e), l = (e.flags & 128) !== 0, u || l ? (u = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && l ? (e.child = ql(
      e,
      t.child,
      null,
      a
    ), e.child = ql(
      e,
      null,
      n,
      a
    )) : ne(t, e, n, a), e.memoizedState = u.state, t = e.child) : t = Gn(
      t,
      e,
      a
    ), t;
  }
  function fv(t, e, n, l) {
    return jl(), e.flags |= 256, ne(t, e, n, l), e.child;
  }
  var Cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function _c(t) {
    return { baseLanes: t, cachePool: tm() };
  }
  function Oc(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Xe), t;
  }
  function dv(t, e, n) {
    var l = e.pendingProps, a = !1, u = (e.flags & 128) !== 0, s;
    if ((s = u) || (s = t !== null && t.memoizedState === null ? !1 : (ge.current & 2) !== 0), s && (a = !0, e.flags &= -129), s = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (St) {
        if (a ? cl(e) : sl(), (t = Gt) ? (t = jh(
          t,
          We
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: tl !== null ? { id: gn, overflow: yn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = Zd(t), n.return = e, e.child = n, re = e, Gt = null)) : t = null, t === null) throw nl(e);
        return _s(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return u = l.children, l = l.fallback, a ? (sl(), a = e.mode, u = Wi(
        { mode: "hidden", children: u },
        a
      ), l = wl(
        l,
        a,
        n,
        null
      ), u.return = e, l.return = e, u.sibling = l, e.child = u, l = e.child, l.memoizedState = _c(n), l.childLanes = Oc(
        t,
        s,
        n
      ), e.memoizedState = Cc, Du(null, l)) : (cl(e), Ac(e, u));
    }
    var m = t.memoizedState;
    if (m !== null) {
      var y = m.dehydrated;
      if (y !== null)
        return Ap(
          t,
          e,
          u,
          s,
          l,
          y,
          m,
          n
        );
    }
    return a ? (sl(), a = l.fallback, u = e.mode, m = t.child, y = m.sibling, l = jn(m, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = m.subtreeFlags & 1206910976, y !== null ? a = jn(y, a) : (a = wl(
      a,
      u,
      n,
      null
    ), a.flags |= 2), a.return = e, l.return = e, l.sibling = a, e.child = l, Du(null, l), l = e.child, a = t.child.memoizedState, a === null ? a = _c(n) : (u = a.cachePool, u !== null ? (m = Ft._currentValue, u = u.parent !== m ? { parent: m, pool: m } : u) : u = tm(), a = {
      baseLanes: a.baseLanes | n,
      cachePool: u
    }), l.memoizedState = a, l.childLanes = Oc(
      t,
      s,
      n
    ), e.memoizedState = Cc, Du(t.child, l)) : (cl(e), n = t.child, t = n.sibling, n = jn(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (s = e.deletions, s === null ? (e.deletions = [t], e.flags |= 16) : s.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Ac(t, e) {
    return e = Wi(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Wi(t, e) {
    return t = ze(22, t, null, e), t.lanes = 0, t;
  }
  function to(t, e, n) {
    return ql(e, t.child, null, n), t = Ac(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Ap(t, e, n, l, a, u, s, m) {
    if (n)
      return e.flags & 256 ? (cl(e), e.flags &= -257, to(
        t,
        e,
        m
      )) : e.memoizedState !== null ? (sl(), e.child = t.child, e.flags |= 128, null) : (sl(), u = a.fallback, s = e.mode, a = Wi(
        { mode: "visible", children: a.children },
        s
      ), u = wl(
        u,
        s,
        m,
        null
      ), u.flags |= 2, a.return = e, u.return = e, a.sibling = u, e.child = a, ql(e, t.child, null, m), a = e.child, a.memoizedState = _c(m), a.childLanes = Oc(
        t,
        l,
        m
      ), e.memoizedState = Cc, Du(null, a));
    if (cl(e), _s(u)) {
      if (l = u.nextSibling && u.nextSibling.dataset, l) var y = l.dgst;
      return l = y, l !== "" && (a = Error(r(419)), a.stack = "", a.digest = l, pu({ value: a, source: null, stack: null })), to(
        t,
        e,
        m
      );
    }
    if (Pt || Hl(t, e, m, !1), l = (m & t.childLanes) !== 0, Pt || l) {
      if (rl.current !== null)
        return to(
          t,
          e,
          m
        );
      if (l = Bt, l !== null && (a = Jf(
        l,
        m
      ), a !== 0 && a !== s.retryLane))
        throw s.retryLane = a, Ml(t, a), Me(l, t, a), Tc;
      return Cs(u) || po(), to(
        t,
        e,
        m
      );
    }
    return Cs(u) ? (e.flags |= 192, e.child = t.child, null) : (t = s.treeContext, Gt = en(u.nextSibling), re = e, St = !0, el = null, We = !1, t !== null && Jd(e, t), e = Ac(
      e,
      a.children
    ), e.flags |= 134221824, e);
  }
  function mv(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), Mi(t.return, e, n);
  }
  function vv(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Yi(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function eo(t, e, n, l, a, u) {
    var s = t.memoizedState;
    s === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: a,
      treeForkCount: u
    } : (s.isBackwards = e, s.rendering = null, s.renderingStartTime = 0, s.last = l, s.tail = n, s.tailMode = a, s.treeForkCount = u);
  }
  function zc(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Rc(t, e, n) {
    var l = e.pendingProps, a = l.revealOrder, u = l.tail;
    l = l.children;
    var s = ge.current;
    if (e.flags & 128)
      return Au(e, s), null;
    var m = (s & 2) !== 0;
    if (m ? (s = s & 1 | 2, e.flags |= 128) : s &= 1, Au(e, s), a === "backwards" && t !== null ? (zc(t), ne(t, e, l, n), zc(t)) : ne(t, e, l, n), l = St ? bu : 0, !m && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && mv(t, n, e);
        else if (t.tag === 19)
          mv(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (a) {
      case "backwards":
        n = vv(e.child), n === null ? (a = e.child, e.child = null) : (a = n.sibling, n.sibling = null, zc(e)), eo(
          e,
          !0,
          a,
          null,
          u,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, a = e.child, e.child = null; a !== null; ) {
          if (t = a.alternate, t !== null && Yi(t) === null) {
            e.child = a;
            break;
          }
          t = a.sibling, a.sibling = n, n = a, a = t;
        }
        eo(
          e,
          !0,
          n,
          null,
          u,
          l
        );
        break;
      case "together":
        eo(
          e,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = vv(e.child), n === null ? (a = e.child, e.child = null) : (a = n.sibling, n.sibling = null), eo(
          e,
          !1,
          a,
          n,
          u,
          l
        );
    }
    return e.child;
  }
  function hv(t, e, n) {
    var l = e.pendingProps;
    return ll(e, e.type, l.value), ne(t, e, l.children, n), e.child;
  }
  function Gn(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), vl |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Hl(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, n = jn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = jn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Nc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && wi(t)));
  }
  function zp(t, e, n) {
    switch (e.tag) {
      case 3:
        ii(e, e.stateNode.containerInfo), ll(e, Ft, t.memoizedState.cache), jl();
        break;
      case 27:
      case 5:
        lr(e);
        break;
      case 4:
        ii(e, e.stateNode.containerInfo);
        break;
      case 10:
        ll(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, ec(e), null;
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return cl(e), e.flags |= 128, null;
          l = Hl(
            t,
            e,
            n,
            !1
          );
          var a = e.child.childLanes;
          return l || (n & a) !== 0 ? dv(t, e, n) : (cl(e), t = Gn(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        cl(e);
        break;
      case 19:
        if (e.flags & 128)
          return Rc(
            t,
            e,
            n
          );
        if (a = (t.flags & 128) !== 0, l = (n & e.childLanes) !== 0, l || (Hl(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), a) {
          if (l)
            return Rc(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (a = e.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), Au(e, ge.current), l) break;
        return null;
      case 22:
        return e.lanes = 0, iv(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ll(e, Ft, t.memoizedState.cache);
    }
    return Gn(t, e, n);
  }
  function gv(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        Pt = !0;
      else {
        if (!Nc(t, n) && (e.flags & 128) === 0)
          return Pt = !1, zp(
            t,
            e,
            n
          );
        Pt = (t.flags & 131072) !== 0;
      }
    else
      Pt = !1, St && (e.flags & 1048576) !== 0 && kd(e, bu, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (t = Gl(e.elementType), e.type = t, typeof t == "function")
            Br(t) ? (l = Ql(t, l), e.tag = 1, e = sv(
              null,
              e,
              t,
              l,
              n
            )) : (e.tag = 0, e = xc(
              null,
              e,
              t,
              l,
              n
            ));
          else {
            if (t != null) {
              var a = t.$$typeof;
              if (a === Z) {
                e.tag = 11, e = lv(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (a === ft) {
                e.tag = 14, e = av(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (a === bt) {
                e.tag = 10, e.type = t, e = hv(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = ut(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return xc(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return l = e.type, a = Ql(
          l,
          e.pendingProps
        ), sv(
          t,
          e,
          l,
          a,
          n
        );
      case 3:
        t: {
          if (ii(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          l = e.pendingProps;
          var u = e.memoizedState;
          a = u.element, Fr(t, e), Ou(e, l, null, n);
          var s = e.memoizedState;
          if (l = s.cache, ll(e, Ft, l), l !== u.cache && Qr(
            e,
            [Ft],
            n,
            !0
          ), _u(), l = s.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: s.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = fv(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== a) {
              a = Fe(
                Error(r(424)),
                e
              ), pu(a), e = fv(
                t,
                e,
                l,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Gt = en(t.firstChild), re = e, St = !0, el = null, We = !0, n = im(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (jl(), l === a) {
              e = Gn(
                t,
                e,
                n
              );
              break t;
            }
            ne(t, e, l, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Oa(t, e), t === null ? (n = Yh(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : St || (e.stateNode = Sh(
          e.type,
          e.pendingProps,
          In.current,
          e
        )) : e.memoizedState = Yh(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return lr(e), t === null && St && (l = e.stateNode = Bh(
          e.type,
          e.pendingProps,
          In.current
        ), re = e, We = !0, a = Gt, bl(e.type) ? (Os = a, Gt = en(l.firstChild)) : Gt = a), ne(
          t,
          e,
          e.pendingProps.children,
          n
        ), Oa(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && St && ((a = l = Gt) && (l = TS(
          l,
          e.type,
          e.pendingProps,
          We
        ), l !== null ? (e.stateNode = l, re = e, Gt = en(l.firstChild), We = !1, a = !0) : a = !1), a || nl(e)), lr(e), a = e.type, u = e.pendingProps, s = t !== null ? t.memoizedProps : null, l = u.children, ys(a, u) ? l = null : s !== null && ys(a, s) && (e.flags |= 32), e.memoizedState !== null && (a = ac(
          t,
          e,
          yp,
          null,
          null,
          n
        ), Qa._currentValue = a), Oa(t, e), ne(t, e, l, n), e.child;
      case 6:
        return t === null && St && ((t = n = Gt) && (n = xS(
          n,
          e.pendingProps,
          We
        ), n !== null ? (e.stateNode = n, re = e, Gt = null, t = !0) : t = !1), t || nl(e)), null;
      case 13:
        return dv(t, e, n);
      case 4:
        return ii(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = ql(
          e,
          null,
          l,
          n
        ) : ne(t, e, l, n), e.child;
      case 11:
        return lv(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return l = e.pendingProps, Oa(t, e), ne(t, e, l, n), e.child;
      case 8:
        return ne(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return ne(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return hv(t, e, n);
      case 9:
        return a = e.type._context, l = e.pendingProps.children, Bl(e), a = ve(a), l = l(a), e.flags |= 1, ne(t, e, l, n), e.child;
      case 14:
        return av(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return uv(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Rc(t, e, n);
      case 31:
        return Op(t, e, n);
      case 22:
        return iv(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Bl(e), l = ve(Ft), t === null ? (a = kr(), a === null && (a = Bt, u = Zr(), a.pooledCache = u, u.refCount++, u !== null && (a.pooledCacheLanes |= n), a = u), e.memoizedState = { parent: l, cache: a }, Ir(e), ll(e, Ft, a)) : ((t.lanes & n) !== 0 && (Fr(t, e), Ou(e, null, null, n), _u()), a = t.memoizedState, u = e.memoizedState, a.parent !== l ? (a = { parent: l, cache: l }, e.memoizedState = a, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = a), ll(e, Ft, l)) : (l = u.cache, ll(e, Ft, l), l !== a.cache && Qr(
          e,
          [Ft],
          n,
          !0
        ))), ne(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), l = e.pendingProps, l.name != null && l.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : St && Ni(e), t !== null && t.memoizedProps.name !== l.name ? e.flags |= 4194816 : Oa(t, e), ne(t, e, l.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function Yn(t) {
    t.flags |= 4;
  }
  function Dc(t, e, n, l, a) {
    var u;
    if ((u = (t.mode & 32) !== 0) && (u = n === null ? Zh(e, l) : Zh(e, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), u) {
      if (t.flags |= 16777216, (a & 335544128) === a)
        if (t.stateNode.complete) t.flags |= 8192;
        else if ($v()) t.flags |= 8192;
        else
          throw Yl = Bi, Jr;
    } else t.flags &= -16777217;
  }
  function yv(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Kh(e))
      if ($v()) t.flags |= 8192;
      else
        throw Yl = Bi, Jr;
  }
  function no(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? Zf() : 536870912, t.lanes |= e, Da |= e);
  }
  function Mu(t, e) {
    if (!St)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Yt(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
    if (e)
      for (var a = t.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags & 1206910976, l |= a.flags & 1206910976, a.return = t, a = a.sibling;
    else
      for (a = t.child; a !== null; )
        n |= a.lanes | a.childLanes, l |= a.subtreeFlags, l |= a.flags, a.return = t, a = a.sibling;
    return t.subtreeFlags |= l, t.childLanes = n, e;
  }
  function Rp(t, e, n) {
    var l = e.pendingProps;
    switch (Gr(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Yt(e), null;
      case 1:
        return Yt(e), null;
      case 3:
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Bn(Ft), la(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (pa(e) ? Yn(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, qr())), Yt(e), null;
      case 26:
        var a = e.type, u = e.memoizedState;
        return t === null ? (Yn(e), u !== null ? (Yt(e), yv(e, u)) : (Yt(e), Dc(
          e,
          a,
          null,
          l,
          n
        ))) : u ? u !== t.memoizedState ? (Yn(e), Yt(e), yv(e, u)) : (Yt(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && Yn(e), Yt(e), Dc(
          e,
          a,
          t,
          l,
          n
        )), null;
      case 27:
        if (oi(e), n = In.current, a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Yn(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Yt(e), e.subtreeFlags &= -33554433, null;
          }
          t = vn.current, pa(e) ? Id(e) : (t = Bh(a, l, n), e.stateNode = t, Yn(e));
        }
        return Yt(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (oi(e), a = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Yn(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(r(166));
            return Yt(e), e.subtreeFlags &= -33554433, null;
          }
          if (u = vn.current, pa(e))
            Id(e);
          else {
            var s = Xu(
              In.current
            );
            switch (u) {
              case 1:
                u = s.createElementNS(
                  "http://www.w3.org/2000/svg",
                  a
                );
                break;
              case 2:
                u = s.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  a
                );
                break;
              default:
                switch (a) {
                  case "svg":
                    u = s.createElementNS(
                      "http://www.w3.org/2000/svg",
                      a
                    );
                    break;
                  case "math":
                    u = s.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      a
                    );
                    break;
                  case "script":
                    u = s.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof l.is == "string" ? s.createElement("select", {
                      is: l.is
                    }) : s.createElement("select"), l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                    break;
                  default:
                    u = typeof l.is == "string" ? s.createElement(a, { is: l.is }) : s.createElement(a);
                }
            }
            u[me] = e, u[Ae] = l;
            t: for (s = e.child; s !== null; ) {
              if (s.tag === 5 || s.tag === 6)
                u.appendChild(s.stateNode);
              else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                s.child.return = s, s = s.child;
                continue;
              }
              if (s === e) break t;
              for (; s.sibling === null; ) {
                if (s.return === null || s.return === e)
                  break t;
                s = s.return;
              }
              s.sibling.return = s.return, s = s.sibling;
            }
            e.stateNode = u;
            t: switch (be(u, a, l), a) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break t;
              case "img":
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && Yn(e);
          }
        }
        return Yt(e), e.subtreeFlags &= -33554433, Dc(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && Yn(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = In.current, pa(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, a = re, a !== null)
              switch (a.tag) {
                case 27:
                case 5:
                  l = a.memoizedProps;
              }
            t[me] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || gh(t.nodeValue, n)), t || nl(e, !0);
          } else
            t = Xu(t).createTextNode(
              l
            ), t[me] = e, e.stateNode = t;
        }
        return Yt(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (l = pa(e), n !== null) {
            if (t === null) {
              if (!l) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[me] = e;
            } else
              jl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Yt(e), t = !1;
          } else
            n = qr(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return Yt(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (a = pa(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!a) throw Error(r(318));
              if (a = e.memoizedState, a = a !== null ? a.dehydrated : null, !a) throw Error(r(317));
              a[me] = e;
            } else
              jl(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Yt(e), a = !1;
          } else
            a = qr(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = a), a = !0;
          if (!a)
            return e.flags & 256 ? (Ge(e), e) : (Ge(e), null);
        }
        return Ge(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, a = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (a = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== a && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), no(e, e.updateQueue), Yt(e), null);
      case 4:
        return la(), t === null && ds(e.stateNode.containerInfo), e.flags |= 67108864, Yt(e), null;
      case 10:
        return Bn(e.type), Yt(e), null;
      case 19:
        if (nc(e), l = e.memoizedState, l === null) return Yt(e), null;
        if (a = (e.flags & 128) !== 0, u = l.rendering, u === null)
          if (a) Mu(l, !1);
          else {
            if (kt !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Yi(t), u !== null) {
                  for (e.flags |= 128, Mu(l, !1), t = u.updateQueue, e.updateQueue = t, no(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    Qd(n, t), n = n.sibling;
                  return Au(
                    e,
                    ge.current & 1 | 2
                  ), St && Un(e, l.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            l.tail !== null && Ue() > ho && (e.flags |= 128, a = !0, Mu(l, !1), e.lanes = 4194304);
          }
        else {
          if (!a)
            if (t = Yi(u), t !== null) {
              if (e.flags |= 128, a = !0, t = t.updateQueue, e.updateQueue = t, no(e, t), Mu(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !u.alternate && !St)
                return Yt(e), null;
            } else
              2 * Ue() - l.renderingStartTime > ho && n !== 536870912 && (e.flags |= 128, a = !0, Mu(l, !1), e.lanes = 4194304);
          l.isBackwards ? (u.sibling = e.child, e.child = u) : (t = l.last, t !== null ? t.sibling = u : e.child = u, l.last = u);
        }
        if (l.tail !== null) {
          t = l.tail;
          t: {
            for (n = t; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break t;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return l.rendering = t, l.tail = t.sibling, l.renderingStartTime = Ue(), t.sibling = null, u = ge.current, u = a ? u & 1 | 2 : u & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || St ? Au(e, u) : (n = u, Vt(he, e), Vt(ge, n), Ee === null && (Ee = e)), St && Un(e, l.treeForkCount), t;
        }
        return Yt(e), null;
      case 22:
      case 23:
        return Ge(e), tc(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Yt(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Yt(e), n = e.updateQueue, n !== null && no(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && de(Vl), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Bn(Ft), Yt(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Yt(e), null;
    }
    throw Error(r(156, e.tag));
  }
  function Np(t, e) {
    switch (Gr(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Bn(Ft), la(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return oi(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (Ge(e), e.alternate === null)
            throw Error(r(340));
          jl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (Ge(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          jl();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return nc(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return la(), null;
      case 10:
        return Bn(e.type), null;
      case 22:
      case 23:
        return Ge(e), tc(), t !== null && de(Vl), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Bn(Ft), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function bv(t, e) {
    switch (Gr(e), e.tag) {
      case 3:
        Bn(Ft), la();
        break;
      case 26:
      case 27:
      case 5:
        oi(e);
        break;
      case 4:
        la();
        break;
      case 31:
        e.memoizedState !== null && Ge(e);
        break;
      case 13:
        Ge(e);
        break;
      case 19:
        nc(e);
        break;
      case 10:
        Bn(e.type);
        break;
      case 22:
      case 23:
        Ge(e), tc(), t !== null && de(Vl);
        break;
      case 24:
        Bn(Ft);
    }
  }
  function wu(t, e) {
    try {
      var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var a = l.next;
        n = a;
        do {
          if ((n.tag & t) === t) {
            l = void 0;
            var u = n.create, s = n.inst;
            l = u(), s.destroy = l;
          }
          n = n.next;
        } while (n !== a);
      }
    } catch (m) {
      wt(e, e.return, m);
    }
  }
  function fl(t, e, n) {
    try {
      var l = e.updateQueue, a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var u = a.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            var s = l.inst, m = s.destroy;
            if (m !== void 0) {
              s.destroy = void 0, a = e;
              var y = n, z = m;
              try {
                z();
              } catch (D) {
                wt(
                  a,
                  y,
                  D
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (D) {
      wt(e, e.return, D);
    }
  }
  function pv(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        rm(e, n);
      } catch (l) {
        wt(t, t.return, l);
      }
    }
  }
  function Sv(t, e, n) {
    n.props = Ql(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      wt(t, e, l);
    }
  }
  function bn(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            var a = t.stateNode, u = Mn(t.memoizedProps, a);
            (a.ref === null || a.ref.name !== u) && (a.ref = Ah(u)), l = a.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var s = new Ze(t);
              v(
                t.child,
                !1,
                SS,
                s,
                void 0,
                void 0
              ), t.stateNode = s;
            }
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(l) : n.current = l;
      }
    } catch (m) {
      wt(t, e, m);
    }
  }
  function ye(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (a) {
          wt(t, e, a);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (a) {
          wt(t, e, a);
        }
      else n.current = null;
  }
  function lo(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        wh(
          t.stateNode,
          e[n]
        );
  }
  function Ev(t) {
    for (var e = t.return; e !== null && (wc(e) && wh(t.stateNode, e.stateNode), !Mc(e)); )
      e = e.return;
  }
  function ju(t) {
    for (var e = t.return; e !== null && (wc(e) && ES(t.stateNode, e.stateNode), !Mc(e)); )
      e = e.return;
  }
  function Mc(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function wc(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function jc(t) {
    var e = t.type, n = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break t;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (a) {
      wt(t, t.return, a);
    }
  }
  function Uc(t, e, n) {
    try {
      var l = t.stateNode;
      nS(l, t.type, n, e), l[Ae] = e;
    } catch (a) {
      wt(t, t.return, a);
    }
  }
  function Tv(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && bl(t.type) || t.tag === 4;
  }
  function Hc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Tv(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && bl(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Bc(t, e, n, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(a, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(a), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = hn)), lo(t, l), Rt = !0;
    else if (a !== 4 && (a === 27 && (lo(t, l), l = null, bl(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Bc(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        Bc(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function ao(t, e, n, l) {
    var a = t.tag;
    if (a === 5 || a === 6)
      a = t.stateNode, e ? n.insertBefore(a, e) : n.appendChild(a), lo(t, l), Rt = !0;
    else if (a !== 4 && (a === 27 && (lo(t, l), l = null, bl(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (ao(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        ao(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function xv(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, a = e.attributes; a.length; )
        e.removeAttributeNode(a[0]);
      be(e, l, n), e[me] = t, e[Ae] = n;
    } catch (u) {
      wt(t, t.return, u);
    }
  }
  var uo = !1, Ye = null;
  function Cv(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (uo = !0);
  }
  var pn = null;
  function _v() {
    var t = pn;
    return pn = null, t;
  }
  var Re = 0;
  function Aa(t, e, n, l, a) {
    return Re = 0, Ov(
      t.child,
      e,
      n,
      l,
      a
    );
  }
  function Ov(t, e, n, l, a) {
    for (var u = !1; t !== null; ) {
      if (t.tag === 5) {
        var s = t.stateNode;
        if (l !== null) {
          var m = Ss(s);
          l.push(m), m.view && (u = !0);
        } else
          u || Ss(s).view && (u = !0);
        uo = !0, _h(
          s,
          Re === 0 ? e : e + "_" + Re,
          n
        ), Re++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && a || Ov(
        t.child,
        e,
        n,
        l,
        a
      ) && (u = !0));
      t = t.sibling;
    }
    return u;
  }
  function Sn(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Oh(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || Sn(
        t.child,
        e
      )), t = t.sibling;
  }
  function io(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (io(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(r(544));
          var n = e.name;
          e = wn(e.default, e.share), e !== "none" && (Aa(
            t,
            n,
            e,
            null,
            !1
          ) || Sn(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Lc(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, l = t.memoizedProps, a = Mn(l, n), u = wn(
        l.default,
        n.paired ? l.share : l.enter
      );
      u !== "none" ? Aa(t, a, u, null, !1) ? (io(t), n.paired || e || Ua(t, l.onEnter)) : Sn(t.child, !1) : io(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Lc(t, e), t = t.sibling;
    else io(t);
  }
  function Vc(t) {
    if (Ye !== null && Ye.size !== 0) {
      var e = Ye;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var a = e.get(l);
                if (a !== void 0) {
                  var u = wn(
                    n.default,
                    n.share
                  );
                  if (u !== "none" && (Aa(
                    t,
                    l,
                    u,
                    null,
                    !1
                  ) ? (u = t.stateNode, a.paired = u, u.paired = a, Ua(t, n.onShare)) : Sn(t.child, !1)), e.delete(l), e.size === 0) break;
                }
              }
            }
            Vc(t);
          }
          t = t.sibling;
        }
    }
  }
  function Gc(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Mn(e, t.stateNode), l = Ye !== null ? Ye.get(n) : void 0, a = wn(
        e.default,
        l !== void 0 ? e.share : e.exit
      );
      a !== "none" && (Aa(t, n, a, null, !1) ? l !== void 0 ? (a = t.stateNode, l.paired = a, a.paired = l, Ye.delete(n), Ua(t, e.onShare)) : Ua(t, e.onExit) : Sn(t.child, !1)), Ye !== null && Vc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Gc(t), t = t.sibling;
    else
      Ye !== null && Vc(t);
  }
  function Av(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Mn(e, t.stateNode);
        e = wn(e.default, e.update), t.flags &= -5, e !== "none" && Aa(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Av(t);
      t = t.sibling;
    }
  }
  function Yc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, Sn(t.child, !1));
          }
          Yc(t);
        }
        t = t.sibling;
      }
  }
  function oo(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, Sn(t.child, !1), Yc(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        oo(t), t = t.sibling;
    else Yc(t);
  }
  function zv(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? Sn(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && zv(t), t = t.sibling;
  }
  function qc(t, e, n, l, a, u, s) {
    for (var m = !1; e !== null; ) {
      if (e.tag === 5) {
        var y = e.stateNode;
        if (u !== null && Re < u.length) {
          var z = u[Re], D = Ss(y);
          (z.view || D.view) && (m = !0);
          var B;
          if (B = (t.flags & 4) === 0)
            if (D.clip) B = !0;
            else {
              B = z.rect;
              var O = D.rect;
              B = B.y !== O.y || B.x !== O.x || B.height !== O.height || B.width !== O.width;
            }
          B && (t.flags |= 4), D.abs ? D = !z.abs : (z = z.rect, D = D.rect, D = z.height !== D.height || z.width !== D.width), D && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && _h(
          y,
          Re === 0 ? n : n + "_" + Re,
          a
        ), m && (t.flags & 4) !== 0 || (pn === null && (pn = []), pn.push(
          y,
          Re === 0 ? l : l + "_" + Re,
          e.memoizedProps
        )), Re++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && s ? t.flags |= e.flags & 32 : qc(
        t,
        e.child,
        n,
        l,
        a,
        u,
        s
      ) && (m = !0));
      e = e.sibling;
    }
    return m;
  }
  function Rv(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, l = t.stateNode, a = Mn(n, l), u = wn(n.default, n.update), s;
        s = t.memoizedState, t.memoizedState = null, l = t;
        var m = t.child;
        Re = 0, a = qc(
          l,
          m,
          a,
          a,
          u,
          s,
          !1
        ), (t.flags & 4) !== 0 && a && Ua(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Rv(t);
      t = t.sibling;
    }
  }
  var ce = !1, Dt = !1, En = !1, Xc = !1, Nv = typeof WeakSet == "function" ? WeakSet : Set, se = null, Tn = !1, Uu = !1, ro = !1, Qc = !1;
  function Dp(t, e, n) {
    if (t = t.containerInfo, hs = Za, t = jd(t), Nr(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var u = a.anchorOffset, s = a.focusNode;
            a = a.focusOffset;
            try {
              l.nodeType, s.nodeType;
            } catch {
              l = null;
              break t;
            }
            var m = 0, y = -1, z = -1, D = 0, B = 0, O = t, N = null;
            e: for (; ; ) {
              for (var I; O !== l || u !== 0 && O.nodeType !== 3 || (y = m + u), O !== s || a !== 0 && O.nodeType !== 3 || (z = m + a), O.nodeType === 3 && (m += O.nodeValue.length), (I = O.firstChild) !== null; )
                N = O, O = I;
              for (; ; ) {
                if (O === t) break e;
                if (N === l && ++D === u && (y = m), N === s && ++B === a && (z = m), (I = O.nextSibling) !== null) break;
                O = N, N = O.parentNode;
              }
              O = I;
            }
            l = y === -1 || z === -1 ? null : { start: y, end: z };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (gs = { focusedElem: t, selectionRange: l }, Za = !1, n = (n & 335544064) === n, se = e, e = n ? 9270 : 1024; se !== null; ) {
      if (t = se, n && (l = t.deletions, l !== null))
        for (u = 0; u < l.length; u++)
          n && Gc(l[u]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && Cv(t), co(n);
      else {
        if (t.tag === 22) {
          if (l = t.alternate, t.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && Gc(l), co(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && Cv(t), co(n);
            continue;
          }
        }
        l = t.child, (t.subtreeFlags & e) !== 0 && l !== null ? (l.return = t, se = l) : (n && Av(t), co(n));
      }
    }
    Ye = null;
  }
  function co(t) {
    for (; se !== null; ) {
      var e = se, n = t, l = e.alternate, a = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((a & 1024) !== 0 && l !== null) {
            n = void 0, a = l.memoizedProps, l = l.memoizedState;
            var u = e.stateNode;
            try {
              var s = Ql(
                e.type,
                a
              );
              n = u.getSnapshotBeforeUpdate(
                s,
                l
              ), u.__reactInternalSnapshotBeforeUpdate = n;
            } catch (m) {
              wt(e, e.return, m);
            }
          }
          break;
        case 3:
          if ((a & 1024) !== 0) {
            if (l = e.stateNode.containerInfo, n = l.nodeType, n === 9)
              xs(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  xs(l);
                  break;
                default:
                  l.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && l !== null && (n = Mn(
            l.memoizedProps,
            l.stateNode
          ), a = e.memoizedProps, a = wn(a.default, a.update), a !== "none" && Aa(
            l,
            n,
            a,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((a & 1024) !== 0) throw Error(r(163));
      }
      if (l = e.sibling, l !== null) {
        l.return = e.return, se = l;
        break;
      }
      se = e.return;
    }
  }
  function Dv(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xn(t, n), l & 4 && wu(5, n);
        break;
      case 1:
        if (xn(t, n), l & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (s) {
              wt(n, n.return, s);
            }
          else {
            var a = Ql(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                a,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (s) {
              wt(
                n,
                n.return,
                s
              );
            }
          }
        l & 64 && pv(n), l & 512 && bn(n, n.return);
        break;
      case 3:
        if (xn(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            rm(t, e);
          } catch (s) {
            wt(n, n.return, s);
          }
        }
        break;
      case 27:
        e === null && l & 4 && xv(n);
      case 26:
      case 5:
        xn(t, n), e === null && l & 4 && jc(n), l & 512 && bn(n, n.return);
        break;
      case 12:
        xn(t, n);
        break;
      case 31:
        xn(t, n), l & 4 && Uv(t, n);
        break;
      case 13:
        xn(t, n), l & 4 && Hv(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = Xp.bind(
          null,
          n
        ), CS(t, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || ce, !l) {
          var u = e !== null && e.memoizedState !== null || Dt;
          e = ce, a = Dt, ce = l, (Dt = u) && !a ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), cn(
            t,
            n,
            l
          )) : xn(t, n), ce = e, Dt = a;
        }
        break;
      case 30:
        xn(t, n), l & 512 && bn(n, n.return);
        break;
      case 7:
        l & 512 && bn(n, n.return);
      default:
        xn(t, n);
    }
  }
  function Zc(t, e) {
    for (t = t.child; t !== null; )
      Mv(t, e), t = t.sibling;
  }
  function Mv(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var a = t.stateNode, u = t.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null;
            a.style.display = s == null || typeof s == "boolean" ? "" : ("" + s).trim();
          }
        } catch (y) {
          wt(t, t.return, y);
        }
        Kc(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, Rt = !0;
        } catch (y) {
          wt(t, t.return, y);
        }
        break;
      case 18:
        try {
          var m = t.stateNode;
          e ? Ch(m, !0) : Ch(t.stateNode, !1);
        } catch (y) {
          wt(t, t.return, y);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && Zc(t, e);
        break;
      default:
        Zc(t, e);
    }
  }
  function Kc(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, l = e;
          switch (n.tag) {
            case 4:
              Mv(n, l);
              break t;
            case 22:
              n.memoizedState === null && Kc(n, l);
              break t;
            default:
              Kc(n, l);
          }
        }
        t = t.sibling;
      }
  }
  function wv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, wv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && vi(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Xt = null, Ne = !1;
  function on(t, e, n) {
    for (n = n.child; n !== null; )
      jv(t, e, n), n = n.sibling;
  }
  function jv(t, e, n) {
    if (He && typeof He.onCommitFiberUnmount == "function")
      try {
        He.onCommitFiberUnmount(au, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        Dt || ye(n, e), on(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !Dt && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        Dt || ye(n, e), ju(n);
        var l = Xt, a = Ne;
        bl(n.type) && (Xt = n.stateNode, Ne = !1), on(
          t,
          e,
          n
        ), Lh(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Xt = l, Ne = a;
        break;
      case 5:
        Dt || ye(n, e), ju(n);
      case 6:
        if (n.tag === 6 && ju(n), l = Xt, a = Ne, Xt = null, on(
          t,
          e,
          n
        ), Xt = l, Ne = a, Xt !== null)
          if (Ne)
            try {
              (Xt.nodeType === 9 ? Xt.body : Xt.nodeName === "HTML" ? Xt.ownerDocument.body : Xt).removeChild(n.stateNode), Rt = !0;
            } catch (u) {
              wt(
                n,
                e,
                u
              );
            }
          else
            try {
              Xt.removeChild(n.stateNode), Rt = !0;
            } catch (u) {
              wt(
                n,
                e,
                u
              );
            }
        break;
      case 18:
        Xt !== null && (Ne ? (t = Xt, xh(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), Ka(t)) : xh(Xt, n.stateNode));
        break;
      case 4:
        l = Xt, a = Ne, Xt = n.stateNode.containerInfo, Ne = !0, on(
          t,
          e,
          n
        ), Xt = l, Ne = a;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        fl(2, n, e), Dt || fl(4, n, e), on(
          t,
          e,
          n
        );
        break;
      case 1:
        Dt || (ye(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Sv(
          n,
          e,
          l
        )), on(
          t,
          e,
          n
        );
        break;
      case 21:
        on(
          t,
          e,
          n
        );
        break;
      case 22:
        Dt = (l = Dt) || n.memoizedState !== null, on(
          t,
          e,
          n
        ), Dt = l;
        break;
      case 30:
        ye(n, e), on(
          t,
          e,
          n
        );
        break;
      case 7:
        Dt || ye(n, e), on(
          t,
          e,
          n
        );
        break;
      default:
        on(
          t,
          e,
          n
        );
    }
  }
  function Uv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        Ka(t);
      } catch (n) {
        wt(e, e.return, n);
      }
    }
  }
  function Hv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        Ka(t);
      } catch (n) {
        wt(e, e.return, n);
      }
  }
  function Mp(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Nv()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Nv()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function so(t, e) {
    var n = Mp(t);
    e.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var a = Qp.bind(null, t, l);
        l.then(a, a);
      }
    });
  }
  function Ce(t, e, n) {
    var l = e.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var u = l[a], s = t, m = e, y = m;
        t: for (; y !== null; ) {
          switch (y.tag) {
            case 27:
              if (bl(y.type)) {
                Xt = y.stateNode, Ne = !1;
                break t;
              }
              break;
            case 5:
              Xt = y.stateNode, Ne = !1;
              break t;
            case 3:
            case 4:
              Xt = y.stateNode.containerInfo, Ne = !0;
              break t;
          }
          y = y.return;
        }
        if (Xt === null) throw Error(r(160));
        jv(s, m, u), Xt = null, Ne = !1, s = u.alternate, s !== null && (s.return = null), u.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Bv(e, t, n), e = e.sibling;
  }
  var rn = null;
  function Bv(t, e, n) {
    var l = t.alternate, a = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (a & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var u = 0; u < l.length; u++) {
            var s = l[u];
            s.ref.impl = s.nextImpl;
          }
        Ce(e, t, n), _e(t), a & 4 && (fl(3, t, t.return), wu(3, t), fl(5, t, t.return));
        break;
      case 1:
        Ce(e, t, n), _e(t), a & 512 && (Dt || l === null || ye(l, l.return)), a & 64 && ce && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (u = rn, Ce(e, t, n), _e(t), a & 512 && (Dt || l === null || ye(l, l.return)), a & 4)
          if (a = l !== null ? l.memoizedState : null, n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null)
                if (ce)
                  t.stateNode = Sh(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, a = u.ownerDocument || u;
                    e: switch (e) {
                      case "title":
                        l = a.getElementsByTagName("title")[0], (!l || l[ou] || l[me] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = a.createElement(e), a.head.insertBefore(
                          l,
                          a.querySelector("head > title")
                        )), be(l, e, n), l[me] = t, oe(l), e = l;
                        break t;
                      case "link":
                        if (u = Qh(
                          "link",
                          "href",
                          a
                        ).get(e + (n.href || ""))) {
                          for (s = 0; s < u.length; s++)
                            if (l = u[s], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              u.splice(s, 1);
                              break e;
                            }
                        }
                        l = a.createElement(e), be(l, e, n), a.head.appendChild(l);
                        break;
                      case "meta":
                        if (u = Qh(
                          "meta",
                          "content",
                          a
                        ).get(e + (n.content || ""))) {
                          for (s = 0; s < u.length; s++)
                            if (l = u[s], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              u.splice(s, 1);
                              break e;
                            }
                        }
                        l = a.createElement(e), be(l, e, n), a.head.appendChild(l);
                        break;
                      default:
                        throw Error(r(468, e));
                    }
                    l[me] = t, oe(l), e = l;
                  }
                  t.stateNode = e;
                }
              else
                ce || Ns(u, t.type, t.stateNode);
            else
              t.stateNode = Xh(
                u,
                n,
                t.memoizedProps
              );
          else
            a !== n ? (a === null ? (e = l.stateNode, e === null || Dt || e.parentNode.removeChild(e)) : a.count--, n === null ? ce || Ns(u, t.type, t.stateNode) : Xh(u, n, t.memoizedProps)) : n === null && t.stateNode !== null && Uc(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Ce(e, t, n), _e(t), a & 512 && (Dt || l === null || ye(l, l.return)), l !== null && a & 4 && Uc(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (u = En, En = !1, Ce(e, t, n), En = u, _e(t), a & 512 && (Dt || l === null || ye(l, l.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            ca(e, ""), Rt = !0;
          } catch (D) {
            wt(t, t.return, D);
          }
        }
        a & 4 && t.stateNode != null && (e = t.memoizedProps, Uc(
          t,
          e,
          l !== null ? l.memoizedProps : e
        )), a & 1024 && (Xc = !0);
        break;
      case 6:
        if (Ce(e, t, n), _e(t), a & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, Rt = !0;
          } catch (D) {
            wt(t, t.return, D);
          }
        }
        break;
      case 3:
        if (Rt = !1, Oo = null, u = rn, rn = Qu(e.containerInfo), Ce(e, t, n), rn = u, _e(t), a & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            Ka(e.containerInfo);
          } catch (D) {
            wt(t, t.return, D);
          }
        Xc && (Xc = !1, Lv(t)), Rt = !1;
        break;
      case 4:
        a = En, En = ce, l = ad(), u = rn, rn = Qu(
          t.stateNode.containerInfo
        ), Ce(e, t, n), _e(t), rn = u, Rt && Uu && (ro = !0), Rt = l, En = a;
        break;
      case 12:
        Ce(e, t, n), _e(t);
        break;
      case 31:
        Ce(e, t, n), _e(t), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, so(t, e)));
        break;
      case 13:
        Ce(e, t, n), _e(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (vo = Ue()), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, so(t, e)));
        break;
      case 22:
        u = t.memoizedState !== null, s = l !== null && l.memoizedState !== null;
        var m = ce, y = Dt, z = En;
        ce = m || u, En = z || u, Dt = y || s, Ce(e, t, n), Dt = y, En = z, ce = m, _e(t), a & 8192 && (e = t.stateNode, e._visibility = u ? e._visibility & -2 : e._visibility | 1, !u || l === null || s || ce || Dt || (e = s || Dt, n = ce, l = Dt, ce = u || ce, Dt = e, dl(t, 2), ce = n, Dt = l), !u && En || Zc(t, u)), a & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, so(t, n))));
        break;
      case 19:
        Ce(e, t, n), _e(t), a & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, so(t, e)));
        break;
      case 30:
        a & 512 && (Dt || l === null || ye(l, l.return)), a = ad(), u = Uu, s = (n & 335544064) === n, m = t.memoizedProps, Uu = s && wn(
          m.default,
          m.update
        ) !== "none", Ce(e, t, n), _e(t), s && l !== null && Rt && (t.flags |= 4), Uu = u, Rt = a;
        break;
      case 21:
        break;
      case 7:
        a & 512 && (Dt || l === null || ye(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = t);
      default:
        Ce(e, t, n), _e(t);
    }
  }
  function _e(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (Tv(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var a = t.return; a !== null; ) {
          if (wc(a)) {
            var u = a.stateNode;
            l === null ? l = [u] : l.push(u);
          }
          if (Mc(a)) break;
          a = a.return;
        }
        var s = l;
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var m = n.stateNode, y = Hc(t);
            ao(
              t,
              y,
              m,
              s
            );
            break;
          case 5:
            var z = n.stateNode;
            n.flags & 32 && (ca(z, ""), n.flags &= -33);
            var D = Hc(t);
            ao(
              t,
              D,
              z,
              s
            );
            break;
          case 3:
          case 4:
            var B = n.stateNode.containerInfo, O = Hc(t);
            Bc(
              t,
              O,
              B,
              s
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (N) {
        wt(t, t.return, N);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Lv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Lv(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, Za = !0, e.reset(), Za = !1), t = t.sibling;
      }
  }
  function za(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Vv(e, t), e = e.sibling;
    else Rv(e);
  }
  function Vv(t, e) {
    var n = t.alternate;
    if (n === null) Lc(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Qc = Tn = !1, _v(), za(e, t), !Tn && !ro) {
            if (t = pn, t !== null)
              for (var l = 0; l < t.length; l += 3) {
                n = t[l];
                var a = t[l + 1];
                Oh(n, t[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + a + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), Qc = !0;
          }
          pn = null;
          break;
        case 5:
          za(e, t);
          break;
        case 4:
          l = Tn, Tn = !1, za(e, t), Tn && (ro = !0), Tn = l;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? Lc(t, !1) : za(e, t));
          break;
        case 30:
          l = Tn, a = _v(), Tn = !1, za(e, t), Tn && (t.flags |= 4);
          var u = t.memoizedProps, s = t.stateNode;
          e = Mn(u, s), s = Mn(n.memoizedProps, s);
          var m = wn(u.default, u.update);
          m === "none" ? e = !1 : (u = n.memoizedState, n.memoizedState = null, n = t.child, Re = 0, e = qc(
            t,
            n,
            e,
            s,
            m,
            u,
            !0
          ), Re !== (u === null ? 0 : u.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Ua(
            t,
            t.memoizedProps.onUpdate
          ), pn = a) : a !== null && (a.push.apply(a, pn), pn = a), Tn = (t.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          za(e, t);
      }
  }
  function xn(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Dv(t, e.alternate, e), e = e.sibling;
  }
  function dl(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, l = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          fl(4, n, n.return), dl(
            n,
            l
          );
          break;
        case 1:
          ye(n, n.return);
          var a = n.stateNode;
          typeof a.componentWillUnmount == "function" && Sv(
            n,
            n.return,
            a
          ), dl(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && Lh(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          ye(n, n.return), n.tag !== 5 && n.tag !== 27 || ju(n), dl(
            n,
            l
          );
          break;
        case 6:
          ju(n);
          break;
        case 26:
          ye(n, n.return), a = n.stateNode, n.memoizedState !== null || a === null || Dt || a.parentNode.removeChild(a), dl(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && dl(
            n,
            l
          );
          break;
        case 30:
          ye(n, n.return), dl(
            n,
            l
          );
          break;
        case 7:
          ye(n, n.return);
        default:
          dl(
            n,
            l
          );
      }
      t = t.sibling;
    }
  }
  function cn(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var l = e.alternate, a = t, u = e, s = u.flags, m = (n & 1) !== 0;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          cn(
            a,
            u,
            n
          ), wu(4, u);
          break;
        case 1:
          if (cn(
            a,
            u,
            n
          ), l = u, a = l.stateNode, typeof a.componentDidMount == "function")
            try {
              a.componentDidMount();
            } catch (D) {
              wt(l, l.return, D);
            }
          if (l = u, a = l.updateQueue, a !== null) {
            var y = l.stateNode;
            try {
              var z = a.shared.hiddenCallbacks;
              if (z !== null)
                for (a.shared.hiddenCallbacks = null, a = 0; a < z.length; a++)
                  om(z[a], y);
            } catch (D) {
              wt(l, l.return, D);
            }
          }
          m && s & 64 && pv(u), bn(u, u.return);
          break;
        case 27:
          (n & 2) !== 0 && xv(u);
        case 5:
          u.tag !== 5 && u.tag !== 27 || Ev(u), cn(
            a,
            u,
            n
          ), m && l === null && s & 4 && jc(u), bn(u, u.return);
          break;
        case 6:
          Ev(u);
          break;
        case 26:
          y = u.stateNode, u.memoizedState !== null || y === null || ce || Ns(
            Qu(y.ownerDocument),
            u.type,
            y
          ), cn(
            a,
            u,
            n
          ), m && l === null && s & 4 && jc(u), bn(u, u.return);
          break;
        case 12:
          cn(
            a,
            u,
            n
          );
          break;
        case 31:
          cn(
            a,
            u,
            n
          ), m && s & 4 && Uv(a, u);
          break;
        case 13:
          cn(
            a,
            u,
            n
          ), m && s & 4 && Hv(a, u);
          break;
        case 22:
          u.memoizedState === null && cn(
            a,
            u,
            n
          ), bn(u, u.return);
          break;
        case 30:
          cn(
            a,
            u,
            n
          ), bn(u, u.return);
          break;
        case 7:
          bn(u, u.return);
        default:
          cn(
            a,
            u,
            n
          );
      }
      e = e.sibling;
    }
  }
  function kc(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Su(n));
  }
  function Jc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Su(t));
  }
  function tn(t, e, n, l) {
    var a = (n & 335544064) === n;
    if (e.subtreeFlags & (a ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Gv(
          t,
          e,
          n,
          l
        ), e = e.sibling;
    else a && zv(e);
  }
  function Gv(t, e, n, l) {
    var a = (n & 335544064) === n;
    a && e.alternate === null && e.return !== null && e.return.alternate !== null && oo(e);
    var u = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        tn(
          t,
          e,
          n,
          l
        ), u & 2048 && wu(9, e);
        break;
      case 1:
        tn(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        tn(
          t,
          e,
          n,
          l
        ), a && Qc && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), u & 2048 && (u = null, e.alternate !== null && (u = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== u && (e.refCount++, u != null && Su(u)));
        break;
      case 12:
        if (u & 2048) {
          tn(
            t,
            e,
            n,
            l
          ), u = e.stateNode;
          try {
            var s = e.memoizedProps, m = s.id, y = s.onPostCommit;
            typeof y == "function" && y(
              m,
              e.alternate === null ? "mount" : "update",
              u.passiveEffectDuration,
              -0
            );
          } catch (z) {
            wt(e, e.return, z);
          }
        } else
          tn(
            t,
            e,
            n,
            l
          );
        break;
      case 31:
        tn(
          t,
          e,
          n,
          l
        );
        break;
      case 13:
        tn(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        s = e.stateNode, m = e.alternate, e.memoizedState !== null ? (a && m !== null && m.memoizedState === null && oo(m), s._visibility & 2 ? tn(
          t,
          e,
          n,
          l
        ) : Hu(
          t,
          e
        )) : (a && m !== null && m.memoizedState !== null && oo(e), s._visibility & 2 ? tn(
          t,
          e,
          n,
          l
        ) : (s._visibility |= 2, Ra(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), u & 2048 && kc(m, e);
        break;
      case 24:
        tn(
          t,
          e,
          n,
          l
        ), u & 2048 && Jc(e.alternate, e);
        break;
      case 30:
        a && (u = e.alternate, u !== null && (Sn(u.child, !0), Sn(e.child, !0))), tn(
          t,
          e,
          n,
          l
        );
        break;
      default:
        tn(
          t,
          e,
          n,
          l
        );
    }
  }
  function Ra(t, e, n, l, a) {
    for (a = a && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, s = e, m = n, y = l, z = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Ra(
            u,
            s,
            m,
            y,
            a
          ), wu(8, s);
          break;
        case 23:
          break;
        case 22:
          var D = s.stateNode;
          s.memoizedState !== null ? D._visibility & 2 ? Ra(
            u,
            s,
            m,
            y,
            a
          ) : Hu(
            u,
            s
          ) : (D._visibility |= 2, Ra(
            u,
            s,
            m,
            y,
            a
          )), a && z & 2048 && kc(
            s.alternate,
            s
          );
          break;
        case 24:
          Ra(
            u,
            s,
            m,
            y,
            a
          ), a && z & 2048 && Jc(s.alternate, s);
          break;
        default:
          Ra(
            u,
            s,
            m,
            y,
            a
          );
      }
      e = e.sibling;
    }
  }
  function Hu(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, l = e, a = l.flags;
        switch (l.tag) {
          case 22:
            Hu(n, l), a & 2048 && kc(
              l.alternate,
              l
            );
            break;
          case 24:
            Hu(n, l), a & 2048 && Jc(l.alternate, l);
            break;
          default:
            Hu(n, l);
        }
        e = e.sibling;
      }
  }
  var Zl = 8192;
  function Kl(t, e, n) {
    if (t.subtreeFlags & Zl)
      for (t = t.child; t !== null; )
        Yv(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Yv(t, e, n) {
    switch (t.tag) {
      case 26:
        Kl(
          t,
          e,
          n
        ), t.flags & Zl && (t.memoizedState !== null ? LS(
          n,
          rn,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && Jh(n, t)));
        break;
      case 5:
        Kl(
          t,
          e,
          n
        ), t.flags & Zl && (t = t.stateNode, (e & 335544128) === e && Jh(n, t));
        break;
      case 3:
      case 4:
        var l = rn;
        rn = Qu(t.stateNode.containerInfo), Kl(
          t,
          e,
          n
        ), rn = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Zl, Zl = 16777216, Kl(
          t,
          e,
          n
        ), Zl = l) : Kl(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & Zl) !== 0 && (l = t.memoizedProps.name, l != null && l !== "auto")) {
          var a = t.stateNode;
          a.paired = null, Ye === null && (Ye = /* @__PURE__ */ new Map()), Ye.set(l, a);
        }
        Kl(
          t,
          e,
          n
        );
        break;
      default:
        Kl(
          t,
          e,
          n
        );
    }
  }
  function qv(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function Bu(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          se = l, Qv(
            l,
            t
          );
        }
      qv(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Xv(t), t = t.sibling;
  }
  function Xv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        Bu(t), t.flags & 2048 && fl(9, t, t.return);
        break;
      case 3:
        Bu(t);
        break;
      case 12:
        Bu(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, fo(t)) : Bu(t);
        break;
      default:
        Bu(t);
    }
  }
  function fo(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          se = l, Qv(
            l,
            t
          );
        }
      qv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          fl(8, e, e.return), fo(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, fo(e));
          break;
        default:
          fo(e);
      }
      t = t.sibling;
    }
  }
  function Qv(t, e) {
    for (; se !== null; ) {
      var n = se;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          fl(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Su(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, se = l;
      else
        t: for (n = t; se !== null; ) {
          l = se;
          var a = l.sibling, u = l.return;
          if (wv(l), l === n) {
            se = null;
            break t;
          }
          if (a !== null) {
            a.return = u, se = a;
            break t;
          }
          se = u;
        }
    }
  }
  var wp = {
    getCacheForType: function(t) {
      var e = ve(Ft), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return ve(Ft).controller.signal;
    }
  }, jp = typeof WeakMap == "function" ? WeakMap : Map, Nt = 0, Bt = null, Tt = null, Ct = 0, Mt = 0, qe = null, ml = !1, Na = !1, Ic = !1, qn = 0, kt = 0, vl = 0, kl = 0, mo = 0, Xe = 0, Da = 0, Lu = null, De = null, Fc = !1, vo = 0, Zv = 0, ho = 1 / 0, go = null, hl = null, Qt = 0, sn = null, Jl = null, Cn = 0, $c = 0, Pc = null, Kv = null, Ma = null, wa = null, ja = null, Vu = 0, yo = null;
  function Qe() {
    return (Nt & 2) !== 0 && Ct !== 0 ? Ct & -Ct : P.T !== null ? rs() : If();
  }
  function kv() {
    if (Xe === 0)
      if ((Ct & 536870912) === 0 || St) {
        var t = si;
        si <<= 1, (si & 3932160) === 0 && (si = 262144), Xe = t;
      } else Xe = 536870912;
    return t = he.current, t !== null && (t.flags |= 32), Xe;
  }
  function Ua(t, e) {
    if (e != null) {
      var n = t.stateNode, l = n.ref;
      l === null && (l = n.ref = Ah(
        Mn(t.memoizedProps, n)
      )), wa === null && (wa = []), wa.push(e.bind(null, l));
    }
  }
  function Me(t, e, n) {
    (t === Bt && (Mt === 2 || Mt === 9) || t.cancelPendingCommit !== null) && (Ha(t, 0), gl(
      t,
      Ct,
      Xe,
      !1
    )), iu(t, n), ((Nt & 2) === 0 || t !== Bt) && (t === Bt && ((Nt & 2) === 0 && (kl |= n), kt === 4 && gl(
      t,
      Ct,
      Xe,
      !1
    )), _n(t));
  }
  function Jv(t, e, n) {
    if ((Nt & 6) !== 0) throw Error(r(327));
    var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || uu(t, e), a = l ? Bp(t, e) : ts(t, e, !0), u = l;
    do {
      if (a === 0) {
        Na && !l && gl(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, u && !Up(n)) {
          a = ts(t, e, !1), u = !1;
          continue;
        }
        if (a === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var s = 0;
          else
            s = t.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
          if (s !== 0) {
            e = s;
            t: {
              var m = t;
              a = Lu;
              var y = m.current.memoizedState.isDehydrated;
              if (y && (Ha(m, s).flags |= 256), s = ts(
                m,
                s,
                !1
              ), s !== 2 && s !== 6) {
                if (Ic && !y) {
                  m.errorRecoveryDisabledLanes |= u, kl |= u, a = 4;
                  break t;
                }
                u = De, De = a, u !== null && (De === null ? De = u : De.push.apply(
                  De,
                  u
                ));
              }
              a = s;
            }
            if (u = !1, a !== 2) continue;
          }
        }
        if (a === 1) {
          Ha(t, 0), gl(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, u = a, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              gl(
                l,
                e,
                Xe,
                !ml
              );
              break t;
            case 2:
              De = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (a = vo + 300 - Ue(), 10 < a)) {
            if (gl(
              l,
              e,
              Xe,
              !ml
            ), di(l, 0, !0) !== 0) break t;
            Cn = e, l.timeoutHandle = ps(
              Iv.bind(
                null,
                l,
                n,
                De,
                go,
                Fc,
                e,
                Xe,
                kl,
                Da,
                ml,
                u,
                "Throttled",
                -0,
                0
              ),
              a
            );
            break t;
          }
          Iv(
            l,
            n,
            De,
            go,
            Fc,
            e,
            Xe,
            kl,
            Da,
            ml,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    _n(t);
  }
  function Iv(t, e, n, l, a, u, s, m, y, z, D, B, O, N) {
    t.timeoutHandle = -1;
    var I = e.subtreeFlags, lt = (u & 335544064) === u;
    if (B = null, (lt || I & 8192 || (I & 16785408) === 16785408) && (B = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: hn
    }, Ye = null, Yv(
      e,
      u,
      B
    ), lt && (I = B, lt = t.containerInfo, lt = (lt.nodeType === 9 ? lt : lt.ownerDocument).__reactViewTransition, lt != null && (I.count++, I.waitingForViewTransition = !0, I = ku.bind(I), lt.finished.then(I, I))), I = (u & 62914560) === u ? vo - Ue() : (u & 4194048) === u ? Zv - Ue() : 0, I = VS(
      B,
      I
    ), I !== null)) {
      Cn = u, t.cancelPendingCommit = I(
        lh.bind(
          null,
          t,
          e,
          u,
          n,
          l,
          a,
          s,
          m,
          y,
          z,
          D,
          B,
          null,
          O,
          N
        )
      ), gl(t, u, s, !z);
      return;
    }
    lh(
      t,
      e,
      u,
      n,
      l,
      a,
      s,
      m,
      y,
      z,
      D,
      B
    );
  }
  function Up(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var a = n[l], u = a.getSnapshot;
          a = a.value;
          try {
            if (!Ve(u(), a)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function gl(t, e, n, l) {
    e = Qf(t, e), e &= ~mo, e &= ~kl, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var a = e; 0 < a; ) {
      var u = 31 - Be(a), s = 1 << u;
      l[u] = -1, a &= ~s;
    }
    n !== 0 && Kf(t, n, e);
  }
  function bo() {
    return (Nt & 6) === 0 ? (Gu(0), !1) : !0;
  }
  function Wc() {
    if (Tt !== null) {
      if (Mt === 0)
        var t = Tt.return;
      else
        t = Tt, Hn = Ul = null, oc(t), Ta = null, xu = 0, t = Tt;
      for (; t !== null; )
        bv(t.alternate, t), t = t.return;
      Tt = null;
    }
  }
  function Ha(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, uS(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Cn = 0, Wc(), Bt = t, Tt = n = jn(t.current, null), Ct = e, Mt = 0, qe = null, ml = !1, Na = uu(t, e), Ic = !1, Da = Xe = mo = kl = vl = kt = 0, De = Lu = null, Fc = !1, qn = Qf(t, e), _i(), n;
  }
  function Fv(t, e) {
    gt = null, P.H = Fi, e === Ea || e === Hi ? (e = lm(), Mt = 3) : e === Jr ? (e = lm(), Mt = 4) : Mt = e === Tc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, qe = e, Tt === null && (kt = 1, $i(
      t,
      Fe(e, t.current)
    ));
  }
  function $v() {
    var t = he.current;
    return t === null ? !0 : (Ct & 4194048) === Ct ? Ee === null : (Ct & 62914560) === Ct || (Ct & 536870912) !== 0 ? t === Ee : !1;
  }
  function Pv() {
    var t = P.H;
    return P.H = Fi, t === null ? Fi : t;
  }
  function Wv() {
    var t = P.A;
    return P.A = wp, t;
  }
  function po() {
    kt = 4, ml || (Ct & 4194048) !== Ct && he.current !== null || (Na = !0), (vl & 134217727) === 0 && (kl & 134217727) === 0 || Bt === null || gl(
      Bt,
      Ct,
      Xe,
      !1
    );
  }
  function ts(t, e, n) {
    var l = Nt;
    Nt |= 2;
    var a = Pv(), u = Wv();
    (Bt !== t || Ct !== e) && (go = null, Ha(t, e)), e = !1;
    var s = kt;
    t: do
      try {
        if (Mt !== 0 && Tt !== null) {
          var m = Tt, y = qe;
          switch (Mt) {
            case 8:
              Wc(), s = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              he.current === null && (e = !0);
              var z = Mt;
              if (Mt = 0, qe = null, Ba(t, m, y, z), n && Na) {
                s = 0;
                break t;
              }
              break;
            default:
              z = Mt, Mt = 0, qe = null, Ba(t, m, y, z);
          }
        }
        Hp(), s = kt;
        break;
      } catch (D) {
        Fv(t, D);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Hn = Ul = null, Nt = l, P.H = a, P.A = u, Tt === null && (Bt = null, Ct = 0, _i()), s;
  }
  function Hp() {
    for (; Tt !== null; ) th(Tt);
  }
  function Bp(t, e) {
    var n = Nt;
    Nt |= 2;
    var l = Pv(), a = Wv();
    Bt !== t || Ct !== e ? (go = null, ho = Ue() + 500, Ha(t, e)) : Na = uu(
      t,
      e
    );
    t: do
      try {
        if (Mt !== 0 && Tt !== null) {
          e = Tt;
          var u = qe;
          e: switch (Mt) {
            case 1:
              Mt = 0, qe = null, Ba(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (em(u)) {
                Mt = 0, qe = null, eh(e);
                break;
              }
              e = function() {
                Mt !== 2 && Mt !== 9 || Bt !== t || (Mt = 7), _n(t);
              }, u.then(e, e);
              break t;
            case 3:
              Mt = 7;
              break t;
            case 4:
              Mt = 5;
              break t;
            case 7:
              em(u) ? (Mt = 0, qe = null, eh(e)) : (Mt = 0, qe = null, Ba(t, e, u, 7));
              break;
            case 5:
              var s = null;
              switch (Tt.tag) {
                case 26:
                  s = Tt.memoizedState;
                case 5:
                case 27:
                  var m = Tt;
                  if (s ? Kh(s) : m.stateNode.complete) {
                    Mt = 0, qe = null;
                    var y = m.sibling;
                    if (y !== null) Tt = y;
                    else {
                      var z = m.return;
                      z !== null ? (Tt = z, So(z)) : Tt = null;
                    }
                    break e;
                  }
              }
              Mt = 0, qe = null, Ba(t, e, u, 5);
              break;
            case 6:
              Mt = 0, qe = null, Ba(t, e, u, 6);
              break;
            case 8:
              Wc(), kt = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        Lp();
        break;
      } catch (D) {
        Fv(t, D);
      }
    while (!0);
    return Hn = Ul = null, P.H = l, P.A = a, Nt = n, Tt !== null ? 0 : (Bt = null, Ct = 0, _i(), kt);
  }
  function Lp() {
    for (; Tt !== null && !eb(); )
      th(Tt);
  }
  function th(t) {
    var e = gv(t.alternate, t, qn);
    t.memoizedProps = t.pendingProps, e === null ? So(t) : Tt = e;
  }
  function eh(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = cv(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Ct
        );
        break;
      case 11:
        e = cv(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Ct
        );
        break;
      case 5:
        oc(e);
        var l = e;
        l === re && (St ? (Di(l), l.tag === 5 && l.stateNode != null && (Gt = l.stateNode)) : (Di(l), St = !0));
      default:
        bv(n, e), e = Tt = Qd(e, qn), e = gv(n, e, qn);
    }
    t.memoizedProps = t.pendingProps, e === null ? So(t) : Tt = e;
  }
  function Ba(t, e, n, l) {
    Hn = Ul = null, oc(e), Ta = null, xu = 0;
    var a = e.return;
    try {
      if (_p(
        t,
        a,
        e,
        n,
        Ct
      )) {
        kt = 1, $i(
          t,
          Fe(n, t.current)
        ), Tt = null;
        return;
      }
    } catch (u) {
      if (a !== null) throw Tt = a, u;
      kt = 1, $i(
        t,
        Fe(n, t.current)
      ), Tt = null;
      return;
    }
    e.flags & 32768 ? (St || l === 1 ? t = !0 : Na || (Ct & 536870912) !== 0 ? t = !1 : (ml = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = he.current, l !== null && l.tag === 13 && (l.flags |= 16384))), nh(e, t)) : So(e);
  }
  function So(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        nh(
          e,
          ml
        );
        return;
      }
      t = e.return;
      var n = Rp(
        e.alternate,
        e,
        qn
      );
      if (n !== null) {
        Tt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        Tt = e;
        return;
      }
      Tt = e = t;
    } while (e !== null);
    kt === 0 && (kt = 5);
  }
  function nh(t, e) {
    do {
      var n = Np(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, Tt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        Tt = t;
        return;
      }
      Tt = t = n;
    } while (t !== null);
    kt = 6, Tt = null;
  }
  function lh(t, e, n, l, a, u, s, m, y, z, D, B) {
    t.cancelPendingCommit = null;
    do
      Eo();
    while (Qt !== 0);
    if ((Nt & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      t === Bt && (Tt = Bt = null, Ct = 0), Jl = e, sn = t, Cn = n, Pc = a, Kv = l, Vp(
        t,
        e,
        n,
        s,
        m,
        y,
        B
      );
    }
  }
  function Vp(t, e, n, l, a, u, s) {
    var m = e.lanes | e.childLanes;
    if ($c = m, m |= Ur, fb(
      t,
      n,
      m,
      l,
      a,
      u
    ), wa = null, (n & 335544064) === n ? (ja = mp(t), l = 10262) : (ja = null, l = 10256), (e.subtreeFlags & l) !== 0 || (e.flags & l) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, Zp(ri, function() {
      return as(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), uo = !1, l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
      l = P.T, P.T = null, a = ct.p, ct.p = 2, u = Nt, Nt |= 4;
      try {
        Dp(t, e, n);
      } finally {
        Nt = u, ct.p = a, P.T = l;
      }
    }
    Qt = 1, uo ? Ma = fS(
      s,
      t.containerInfo,
      ja,
      es,
      ns,
      Yp,
      ls,
      as,
      Gp
    ) : (es(), ns(), ls());
  }
  function Gp(t) {
    if (Qt !== 0) {
      var e = sn.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function Yp() {
    Qt === 3 && (Qt = 0, Vv(Jl, sn), Qt = 4);
  }
  function es() {
    if (Qt === 1) {
      Qt = 0;
      var t = sn, e = Jl, n = Cn, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = P.T, P.T = null;
        var a = ct.p;
        ct.p = 2;
        var u = Nt;
        Nt |= 4;
        try {
          Uu = ro = !1, Bv(e, t, n), n = gs;
          var s = jd(t.containerInfo), m = n.focusedElem, y = n.selectionRange;
          if (s !== m && m && m.ownerDocument && wd(
            m.ownerDocument.documentElement,
            m
          )) {
            if (y !== null && Nr(m)) {
              var z = y.start, D = y.end;
              if (D === void 0 && (D = z), "selectionStart" in m)
                m.selectionStart = z, m.selectionEnd = Math.min(
                  D,
                  m.value.length
                );
              else {
                var B = m.ownerDocument || document, O = B && B.defaultView || window;
                if (O.getSelection) {
                  var N = O.getSelection(), I = m.textContent.length, lt = Math.min(y.start, I), yt = y.end === void 0 ? lt : Math.min(y.end, I);
                  !N.extend && lt > yt && (s = yt, yt = lt, lt = s);
                  var A = Md(
                    m,
                    lt
                  ), p = Md(
                    m,
                    yt
                  );
                  if (A && p && (N.rangeCount !== 1 || N.anchorNode !== A.node || N.anchorOffset !== A.offset || N.focusNode !== p.node || N.focusOffset !== p.offset)) {
                    var R = B.createRange();
                    R.setStart(A.node, A.offset), N.removeAllRanges(), lt > yt ? (N.addRange(R), N.extend(p.node, p.offset)) : (R.setEnd(p.node, p.offset), N.addRange(R));
                  }
                }
              }
            }
            for (B = [], N = m; N = N.parentNode; )
              N.nodeType === 1 && B.push({
                element: N,
                left: N.scrollLeft,
                top: N.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < B.length; m++) {
              var H = B[m];
              H.element.scrollLeft = H.left, H.element.scrollTop = H.top;
            }
          }
          Za = !!hs, gs = hs = null;
        } finally {
          Nt = u, ct.p = a, P.T = l;
        }
      }
      t.current = e, Qt = 2;
    }
  }
  function ns() {
    if (Qt === 2) {
      Qt = 0;
      var t = sn, e = Jl, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = P.T, P.T = null;
        var l = ct.p;
        ct.p = 2;
        var a = Nt;
        Nt |= 4;
        try {
          Dv(t, e.alternate, e);
        } finally {
          Nt = a, ct.p = l, P.T = n;
        }
      }
      Qt = 3;
    }
  }
  function ls() {
    if (Qt === 4 || Qt === 3) {
      Qt = 0;
      var t = Ma;
      Ma = null, nb();
      var e = sn, n = Jl, l = Cn, a = Kv, u = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & u) !== 0 || (n.flags & u) !== 0 ? Qt = 5 : (Qt = 0, Jl = sn = null, ah(e, e.pendingLanes)), u = e.pendingLanes, u === 0 && (hl = null), dr(l), n = n.stateNode, He && typeof He.onCommitFiberRoot == "function")
        try {
          He.onCommitFiberRoot(
            au,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (a !== null) {
        n = P.T, u = ct.p, ct.p = 2, P.T = null;
        try {
          for (var s = e.onRecoverableError, m = 0; m < a.length; m++) {
            var y = a[m];
            s(y.value, {
              componentStack: y.stack
            });
          }
        } finally {
          P.T = n, ct.p = u;
        }
      }
      if (a = wa, s = ja, ja = null, a !== null && (wa = null, s === null && (s = []), t !== null))
        for (y = 0; y < a.length; y++)
          n = (0, a[y])(
            s
          ), n !== void 0 && t.finished.finally(n);
      (Cn & 3) !== 0 && Eo(), _n(e), u = e.pendingLanes, (l & 261930) !== 0 && (u & 42) !== 0 ? e === yo ? Vu++ : (Vu = 0, yo = e) : (Vu = 0, yo = null), Gu(0);
    }
  }
  function ah(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Su(e)));
  }
  function Eo() {
    return Ma !== null && (Ma.skipTransition(), Ma = null), es(), ns(), ls(), as();
  }
  function as() {
    if (Qt !== 5) return !1;
    var t = sn, e = $c;
    $c = 0;
    var n = dr(Cn), l = P.T, a = ct.p;
    try {
      ct.p = 32 > n ? 32 : n, P.T = null, n = Pc, Pc = null;
      var u = sn, s = Cn;
      if (Qt = 0, Jl = sn = null, Cn = 0, (Nt & 6) !== 0) throw Error(r(331));
      var m = Nt;
      if (Nt |= 4, Xv(u.current), Gv(
        u,
        u.current,
        s,
        n
      ), Nt = m, Gu(0, !1), He && typeof He.onPostCommitFiberRoot == "function")
        try {
          He.onPostCommitFiberRoot(au, u);
        } catch {
        }
      return !0;
    } finally {
      ct.p = a, P.T = l, ah(t, e);
    }
  }
  function uh(t, e, n) {
    e = Fe(n, e), e = Ec(t.stateNode, e, 2), t = ol(t, e, 2), t !== null && (iu(t, 2), _n(t));
  }
  function wt(t, e, n) {
    if (t.tag === 3)
      uh(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          uh(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (hl === null || !hl.has(l))) {
            t = Fe(n, t), n = ev(2), l = ol(e, n, 2), l !== null && (nv(
              n,
              l,
              e,
              t
            ), iu(l, 2), _n(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function us(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new jp();
      var a = /* @__PURE__ */ new Set();
      l.set(e, a);
    } else
      a = l.get(e), a === void 0 && (a = /* @__PURE__ */ new Set(), l.set(e, a));
    a.has(n) || (Ic = !0, a.add(n), t = qp.bind(null, t, e, n), e.then(t, t));
  }
  function qp(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Bt === t && (Ct & n) === n && ((kt === 4 || kt === 3 && (Ct & 62914560) === Ct && 300 > Ue() - vo) && (Nt & 2) === 0 ? Ha(t, 0) : mo |= n, Da === Ct && (Da = 0)), _n(t);
  }
  function ih(t, e) {
    e === 0 && (e = Zf()), t = Ml(t, e), t !== null && (iu(t, e), _n(t));
  }
  function Xp(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), ih(t, n);
  }
  function Qp(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode, a = t.memoizedState;
        a !== null && (n = a.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    l !== null && l.delete(e), ih(t, n);
  }
  function Zp(t, e) {
    return rr(t, e);
  }
  var La = null, Va = null, is = !1, To = !1, os = !1, yl = 0;
  function _n(t) {
    t !== Va && t.next === null && (Va === null ? La = Va = t : Va = Va.next = t), To = !0, is || (is = !0, kp());
  }
  function Gu(t, e) {
    if (!os && To) {
      os = !0;
      do
        for (var n = !1, l = La; l !== null; ) {
          if (t !== 0) {
            var a = l.pendingLanes;
            if (a === 0) var u = 0;
            else {
              var s = l.suspendedLanes, m = l.pingedLanes;
              u = (1 << 31 - Be(42 | t) + 1) - 1, u &= a & ~(s & ~m), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, sh(l, u));
          } else
            u = Ct, u = di(
              l,
              l === Bt ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || uu(l, u) || (n = !0, sh(l, u));
          l = l.next;
        }
      while (n);
      os = !1;
    }
  }
  function Kp() {
    oh();
  }
  function oh() {
    To = is = !1;
    var t = 0;
    yl !== 0 && aS() && (t = yl);
    for (var e = Ue(), n = null, l = La; l !== null; ) {
      var a = l.next, u = rh(l, e);
      u === 0 ? (l.next = null, n === null ? La = a : n.next = a, a === null && (Va = n)) : (n = l, (t !== 0 || (u & 3) !== 0) && (To = !0)), l = a;
    }
    Qt !== 0 && Qt !== 5 || Gu(t), yl !== 0 && (yl = 0);
  }
  function rh(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, a = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var s = 31 - Be(u), m = 1 << s, y = a[s];
      y === -1 ? ((m & n) === 0 || (m & l) !== 0) && (a[s] = sb(m, e)) : y <= e && (t.expiredLanes |= m), u &= ~m;
    }
    if (e = Bt, n = Ct, n = di(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (Mt === 2 || Mt === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && cr(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || uu(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && cr(l), dr(n)) {
        case 2:
        case 8:
          n = qf;
          break;
        case 32:
          n = ri;
          break;
        case 268435456:
          n = Xf;
          break;
        default:
          n = ri;
      }
      return l = ch.bind(null, t), n = rr(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && cr(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function ch(t, e) {
    if (Qt !== 0 && Qt !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (Eo() && t.callbackNode !== n)
      return null;
    var l = Ct;
    return l = di(
      t,
      t === Bt ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (Jv(t, l, e), rh(t, Ue()), t.callbackNode != null && t.callbackNode === n ? ch.bind(null, t) : null);
  }
  function sh(t, e) {
    if (Eo()) return null;
    Jv(t, e, !0);
  }
  function kp() {
    iS(function() {
      (Nt & 6) !== 0 ? rr(
        Yf,
        Kp
      ) : oh();
    });
  }
  function rs() {
    if (yl === 0) {
      var t = Ll;
      t === 0 && (t = ci, ci <<= 1, (ci & 261888) === 0 && (ci = 256)), yl = t;
    }
    return yl;
  }
  function fh(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : yi(t);
  }
  function Jp(t, e, n, l, a) {
    if (e === "submit" && n && n.stateNode === a) {
      var u = fh(
        (a[Ae] || null).action
      ), s = l.submitter;
      s && (e = (e = s[Ae] || null) ? fh(e.formAction) : s.getAttribute("formAction"), e !== null && (u = e, s = null));
      var m = new Ei(
        "action",
        "action",
        null,
        l,
        a
      );
      t.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (yl !== 0) {
                  var y = new FormData(a, s);
                  gc(
                    n,
                    {
                      pending: !0,
                      data: y,
                      method: a.method,
                      action: u
                    },
                    null,
                    y
                  );
                }
              } else
                typeof u == "function" && (m.preventDefault(), y = new FormData(a, s), gc(
                  n,
                  {
                    pending: !0,
                    data: y,
                    method: a.method,
                    action: u
                  },
                  u,
                  y
                ));
            },
            currentTarget: a
          }
        ]
      });
    }
  }
  for (var cs = 0; cs < jr.length; cs++) {
    var ss = jr[cs], Ip = ss.toLowerCase(), Fp = ss[0].toUpperCase() + ss.slice(1);
    un(
      Ip,
      "on" + Fp
    );
  }
  un(Bd, "onAnimationEnd"), un(Ld, "onAnimationIteration"), un(Vd, "onAnimationStart"), un("dblclick", "onDoubleClick"), un("focusin", "onFocus"), un("focusout", "onBlur"), un(up, "onTransitionRun"), un(ip, "onTransitionStart"), un(op, "onTransitionCancel"), un(Gd, "onTransitionEnd"), oa("onMouseEnter", ["mouseout", "mouseover"]), oa("onMouseLeave", ["mouseout", "mouseover"]), oa("onPointerEnter", ["pointerout", "pointerover"]), oa("onPointerLeave", ["pointerout", "pointerover"]), Rl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Rl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Rl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Rl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Rl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Rl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Yu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), $p = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yu)
  );
  function dh(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], a = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var s = l.length - 1; 0 <= s; s--) {
            var m = l[s], y = m.instance, z = m.currentTarget;
            if (m = m.listener, y !== u && a.isPropagationStopped())
              break t;
            u = m, a.currentTarget = z;
            try {
              u(a);
            } catch (D) {
              Ci(D);
            }
            a.currentTarget = null, u = y;
          }
        else
          for (s = 0; s < l.length; s++) {
            if (m = l[s], y = m.instance, z = m.currentTarget, m = m.listener, y !== u && a.isPropagationStopped())
              break t;
            u = m, a.currentTarget = z;
            try {
              u(a);
            } catch (D) {
              Ci(D);
            }
            a.currentTarget = null, u = y;
          }
      }
    }
  }
  function xt(t, e) {
    var n = e[$f];
    n === void 0 && (n = e[$f] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (mh(e, t, 2, !1), n.add(l));
  }
  function fs(t, e, n) {
    var l = 0;
    e && (l |= 4), mh(
      n,
      t,
      l,
      e
    );
  }
  var xo = "_reactListening" + Math.random().toString(36).slice(2);
  function ds(t) {
    if (!t[xo]) {
      t[xo] = !0, td.forEach(function(n) {
        n !== "selectionchange" && ($p.has(n) || fs(n, !1, t), fs(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[xo] || (e[xo] = !0, fs("selectionchange", !1, e));
    }
  }
  function mh(t, e, n, l) {
    switch (ng(e)) {
      case 2:
        var a = XS;
        break;
      case 8:
        a = QS;
        break;
      default:
        a = Ms;
    }
    n = a.bind(
      null,
      e,
      n,
      t
    ), a = void 0, !Sr || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (a = !0), l ? a !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: a
    }) : t.addEventListener(e, n, !0) : a !== void 0 ? t.addEventListener(e, n, {
      passive: a
    }) : t.addEventListener(e, n, !1);
  }
  function ms(t, e, n, l, a) {
    var u = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var s = l.tag;
        if (s === 3 || s === 4) {
          var m = l.stateNode.containerInfo;
          if (m === a) break;
          if (s === 4)
            for (s = l.return; s !== null; ) {
              var y = s.tag;
              if ((y === 3 || y === 4) && s.stateNode.containerInfo === a)
                return;
              s = s.return;
            }
          for (; m !== null; ) {
            if (s = zl(m), s === null) return;
            if (y = s.tag, y === 5 || y === 6 || y === 26 || y === 27) {
              l = u = s;
              continue t;
            }
            m = m.parentNode;
          }
        }
        l = l.return;
      }
    md(function() {
      var z = u, D = br(n), B = [];
      t: {
        var O = Yd.get(t);
        if (O !== void 0) {
          var N = Ei, I = t;
          switch (t) {
            case "keypress":
              if (pi(n) === 0) break t;
            case "keydown":
            case "keyup":
              N = Ub;
              break;
            case "focusin":
              I = "focus", N = Cr;
              break;
            case "focusout":
              I = "blur", N = Cr;
              break;
            case "beforeblur":
            case "afterblur":
              N = Cr;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              N = gd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              N = xb;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              N = Gb;
              break;
            case Bd:
            case Ld:
            case Vd:
              N = Ob;
              break;
            case Gd:
              N = qb;
              break;
            case "scroll":
            case "scrollend":
              N = Eb;
              break;
            case "wheel":
              N = Qb;
              break;
            case "copy":
            case "cut":
            case "paste":
              N = zb;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              N = bd;
              break;
            case "submit":
              N = Lb;
              break;
            case "toggle":
            case "beforetoggle":
              N = Kb;
          }
          var lt = (e & 4) !== 0, yt = !lt && (t === "scroll" || t === "scrollend"), A = lt ? O !== null ? O + "Capture" : null : O;
          lt = [];
          for (var p = z, R; p !== null; ) {
            var H = p;
            if (R = H.stateNode, H = H.tag, H !== 5 && H !== 26 && H !== 27 || R === null || A === null || (H = cu(p, A), H != null && lt.push(
              qu(p, H, R)
            )), yt) break;
            p = p.return;
          }
          0 < lt.length && (O = new N(
            O,
            I,
            null,
            n,
            D
          ), B.push({ event: O, listeners: lt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (N = t === "mouseover" || t === "pointerover", O = t === "mouseout" || t === "pointerout", N && n !== yr && (I = n.relatedTarget || n.fromElement) && (zl(I) || I[aa]))
            break t;
          (O || N) && (I = D.window === D ? D : (N = D.ownerDocument) ? N.defaultView || N.parentWindow : window, O ? (N = n.relatedTarget || n.toElement, O = z, N = N ? zl(N) : null, N !== null && (yt = d(N), lt = N.tag, N !== yt || lt !== 5 && lt !== 27 && lt !== 6) && (N = null)) : (O = null, N = z), O !== N && (lt = gd, H = "onMouseLeave", A = "onMouseEnter", p = "mouse", (t === "pointerout" || t === "pointerover") && (lt = bd, H = "onPointerLeave", A = "onPointerEnter", p = "pointer"), yt = O == null ? I : ru(O), R = N == null ? I : ru(N), I = new lt(
            H,
            p + "leave",
            O,
            n,
            D
          ), I.target = yt, I.relatedTarget = R, H = null, zl(D) === z && (lt = new lt(
            A,
            p + "enter",
            N,
            n,
            D
          ), lt.target = R, lt.relatedTarget = yt, H = lt), yt = H, lt = O && N ? Q(
            O,
            N,
            Pp
          ) : null, O !== null && vh(
            B,
            I,
            O,
            lt,
            !1
          ), N !== null && yt !== null && vh(
            B,
            yt,
            N,
            lt,
            !0
          )));
        }
        t: {
          if (O = z ? ru(z) : window, N = O.nodeName && O.nodeName.toLowerCase(), N === "select" || N === "input" && O.type === "file")
            var W = Od;
          else if (Cd(O))
            if (Ad)
              W = np;
            else {
              W = tp;
              var _t = Wb;
            }
          else
            N = O.nodeName, !N || N.toLowerCase() !== "input" || O.type !== "checkbox" && O.type !== "radio" ? z && gr(z.elementType) && (W = Od) : W = ep;
          if (W && (W = W(t, z))) {
            _d(
              B,
              W,
              n,
              D
            );
            break t;
          }
          _t && _t(t, O, z);
        }
        switch (_t = z ? ru(z) : window, t) {
          case "focusin":
            (Cd(_t) || _t.contentEditable === "true") && (ma = _t, Dr = z, yu = null);
            break;
          case "focusout":
            yu = Dr = ma = null;
            break;
          case "mousedown":
            Mr = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Mr = !1, Ud(B, n, D);
            break;
          case "selectionchange":
            if (ap) break;
          case "keydown":
          case "keyup":
            Ud(B, n, D);
        }
        var rt;
        if (Or)
          t: {
            switch (t) {
              case "compositionstart":
                var st = "onCompositionStart";
                break t;
              case "compositionend":
                st = "onCompositionEnd";
                break t;
              case "compositionupdate":
                st = "onCompositionUpdate";
                break t;
            }
            st = void 0;
          }
        else
          da ? Td(t, n) && (st = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (st = "onCompositionStart");
        st && (pd && n.locale !== "ko" && (da || st !== "onCompositionStart" ? st === "onCompositionEnd" && da && (rt = vd()) : (Pn = D, Er = "value" in Pn ? Pn.value : Pn.textContent, da = !0)), _t = Co(z, st), 0 < _t.length && (st = new yd(
          st,
          t,
          null,
          n,
          D
        ), B.push({ event: st, listeners: _t }), rt ? st.data = rt : (rt = xd(n), rt !== null && (st.data = rt)))), (rt = Jb ? Ib(t, n) : Fb(t, n)) && (st = Co(z, "onBeforeInput"), 0 < st.length && (_t = new yd(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          D
        ), B.push({
          event: _t,
          listeners: st
        }), _t.data = rt)), Jp(
          B,
          t,
          z,
          n,
          D
        );
      }
      dh(B, e);
    });
  }
  function qu(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Co(t, e) {
    for (var n = e + "Capture", l = []; t !== null; ) {
      var a = t, u = a.stateNode;
      if (a = a.tag, a !== 5 && a !== 26 && a !== 27 || u === null || (a = cu(t, n), a != null && l.unshift(
        qu(t, a, u)
      ), a = cu(t, e), a != null && l.push(
        qu(t, a, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function Pp(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function vh(t, e, n, l, a) {
    for (var u = e._reactName, s = []; n !== null && n !== l; ) {
      var m = n, y = m.alternate, z = m.stateNode;
      if (m = m.tag, y !== null && y === l) break;
      m !== 5 && m !== 26 && m !== 27 || z === null || (y = z, a ? (z = cu(n, u), z != null && s.unshift(
        qu(n, z, y)
      )) : a || (z = cu(n, u), z != null && s.push(
        qu(n, z, y)
      ))), n = n.return;
    }
    s.length !== 0 && t.push({ event: e, listeners: s });
  }
  var Wp = /\r\n?/g, tS = /\u0000|\uFFFD/g;
  function hh(t) {
    return (typeof t == "string" ? t : "" + t).replace(Wp, `
`).replace(tS, "");
  }
  function gh(t, e) {
    return e = hh(e), hh(t) === e;
  }
  function jt(t, e, n, l, a, u) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          e === "body" || e === "textarea" && l === "" || ca(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          e !== "body" && ca(t, "" + l);
        else return;
        break;
      case "className":
        gi(t, "class", l);
        break;
      case "tabIndex":
        gi(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        gi(t, n, l);
        break;
      case "style":
        fd(t, l, u);
        return;
      case "data":
        if (e !== "object") {
          gi(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = yi(l), t.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (n === "formAction" ? (e !== "input" && jt(t, e, "name", a.name, a, null), jt(
            t,
            e,
            "formEncType",
            a.formEncType,
            a,
            null
          ), jt(
            t,
            e,
            "formMethod",
            a.formMethod,
            a,
            null
          ), jt(
            t,
            e,
            "formTarget",
            a.formTarget,
            a,
            null
          )) : (jt(t, e, "encType", a.encType, a, null), jt(t, e, "method", a.method, a, null), jt(t, e, "target", a.target, a, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = yi(l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = hn);
        return;
      case "onScroll":
        l != null && xt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && xt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(r(60));
            u?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = yi(l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(n) : t.setAttribute(n, l);
        break;
      case "popover":
        xt("beforetoggle", t), xt("toggle", t), hi(t, "popover", l);
        break;
      case "xlinkActuate":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Nn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Nn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Nn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Nn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        hi(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = pb.get(n) || n, hi(t, n, l);
        else return;
    }
    Rt = !0;
  }
  function vs(t, e, n, l, a, u) {
    switch (n) {
      case "style":
        fd(t, l, u);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (a.children != null) throw Error(r(60));
            u?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") ca(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          ca(t, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && xt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && xt("scrollend", t);
        return;
      case "onClick":
        l != null && (t.onclick = hn);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!ed.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), u = n.slice(2, a ? n.length - 7 : void 0), e = t[Ae] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(u, e, a), typeof l == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(u, l, a);
              break t;
            }
            Rt = !0, n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : hi(t, n, l);
          }
        return;
    }
    Rt = !0;
  }
  function be(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        xt("error", t), xt("load", t);
        var l = !1, a = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var s = n[u];
            if (s != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  a = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  jt(t, e, u, s, n, null);
              }
          }
        a && jt(t, e, "srcSet", n.srcSet, n, null), l && jt(t, e, "src", n.src, n, null);
        return;
      case "input":
        xt("invalid", t);
        var m = u = s = a = null, y = null, z = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var D = n[l];
            if (D != null)
              switch (l) {
                case "name":
                  a = D;
                  break;
                case "type":
                  s = D;
                  break;
                case "checked":
                  y = D;
                  break;
                case "defaultChecked":
                  z = D;
                  break;
                case "value":
                  u = D;
                  break;
                case "defaultValue":
                  m = D;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (D != null)
                    throw Error(r(137, e));
                  break;
                default:
                  jt(t, e, l, D, n, null);
              }
          }
        od(
          t,
          u,
          m,
          y,
          z,
          s,
          a,
          !1
        );
        return;
      case "select":
        xt("invalid", t), l = s = u = null;
        for (a in n)
          if (n.hasOwnProperty(a) && (m = n[a], m != null))
            switch (a) {
              case "value":
                u = m;
                break;
              case "defaultValue":
                s = m;
                break;
              case "multiple":
                l = m;
              default:
                jt(t, e, a, m, n, null);
            }
        e = u, n = s, t.multiple = !!l, e != null ? ra(t, !!l, e, !1) : n != null && ra(t, !!l, n, !0);
        return;
      case "textarea":
        xt("invalid", t), u = a = l = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (m = n[s], m != null))
            switch (s) {
              case "value":
                l = m;
                break;
              case "defaultValue":
                a = m;
                break;
              case "children":
                u = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(r(91));
                break;
              default:
                jt(t, e, s, m, n, null);
            }
        cd(t, l, a, u);
        return;
      case "option":
        for (y in n)
          n.hasOwnProperty(y) && (l = n[y], l != null) && (y === "selected" ? t.selected = l && typeof l != "function" && typeof l != "symbol" : jt(t, e, y, l, n, null));
        return;
      case "dialog":
        xt("beforetoggle", t), xt("toggle", t), xt("cancel", t), xt("close", t);
        break;
      case "iframe":
      case "object":
        xt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < Yu.length; l++)
          xt(Yu[l], t);
        break;
      case "image":
        xt("error", t), xt("load", t);
        break;
      case "details":
        xt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        xt("error", t), xt("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (z in n)
          if (n.hasOwnProperty(z) && (l = n[z], l != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                jt(t, e, z, l, n, null);
            }
        return;
      default:
        if (gr(e)) {
          for (D in n)
            n.hasOwnProperty(D) && (l = n[D], l !== void 0 && vs(
              t,
              e,
              D,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (m in n)
      n.hasOwnProperty(m) && (l = n[m], l != null && jt(t, e, m, l, n, null));
  }
  var eS = {};
  function nS(t, e, n, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var a = null, u = null, s = null, m = null, y = null, z = null, D = null;
        for (N in n) {
          var B = n[N];
          if (n.hasOwnProperty(N) && B != null)
            switch (N) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                y = B;
              default:
                l.hasOwnProperty(N) || jt(t, e, N, null, l, B);
            }
        }
        for (var O in l) {
          var N = l[O];
          if (B = n[O], l.hasOwnProperty(O) && (N != null || B != null))
            switch (O) {
              case "type":
                N !== B && (Rt = !0), u = N;
                break;
              case "name":
                N !== B && (Rt = !0), a = N;
                break;
              case "checked":
                N !== B && (Rt = !0), z = N;
                break;
              case "defaultChecked":
                N !== B && (Rt = !0), D = N;
                break;
              case "value":
                N !== B && (Rt = !0), s = N;
                break;
              case "defaultValue":
                N !== B && (Rt = !0), m = N;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (N != null)
                  throw Error(r(137, e));
                break;
              default:
                N !== B && jt(
                  t,
                  e,
                  O,
                  N,
                  l,
                  B
                );
            }
        }
        vr(
          t,
          s,
          m,
          y,
          z,
          D,
          u,
          a
        );
        return;
      case "select":
        N = s = m = O = null;
        for (u in n)
          if (y = n[u], n.hasOwnProperty(u) && y != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                N = y;
              default:
                l.hasOwnProperty(u) || jt(
                  t,
                  e,
                  u,
                  null,
                  l,
                  y
                );
            }
        for (a in l)
          if (u = l[a], y = n[a], l.hasOwnProperty(a) && (u != null || y != null))
            switch (a) {
              case "value":
                u !== y && (Rt = !0), O = u;
                break;
              case "defaultValue":
                u !== y && (Rt = !0), m = u;
                break;
              case "multiple":
                u !== y && (Rt = !0), s = u;
              default:
                u !== y && jt(
                  t,
                  e,
                  a,
                  u,
                  l,
                  y
                );
            }
        e = m, n = s, l = N, O != null ? ra(t, !!n, O, !1) : !!l != !!n && (e != null ? ra(t, !!n, e, !0) : ra(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        N = O = null;
        for (m in n)
          if (a = n[m], n.hasOwnProperty(m) && a != null && !l.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                jt(t, e, m, null, l, a);
            }
        for (s in l)
          if (a = l[s], u = n[s], l.hasOwnProperty(s) && (a != null || u != null))
            switch (s) {
              case "value":
                a !== u && (Rt = !0), O = a;
                break;
              case "defaultValue":
                a !== u && (Rt = !0), N = a;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (a != null) throw Error(r(91));
                break;
              default:
                a !== u && jt(t, e, s, a, l, u);
            }
        rd(t, O, N);
        return;
      case "option":
        for (var I in n)
          O = n[I], n.hasOwnProperty(I) && O != null && !l.hasOwnProperty(I) && (I === "selected" ? t.selected = !1 : jt(
            t,
            e,
            I,
            null,
            l,
            O
          ));
        for (y in l)
          O = l[y], N = n[y], l.hasOwnProperty(y) && O !== N && (O != null || N != null) && (y === "selected" ? (O !== N && (Rt = !0), t.selected = O && typeof O != "function" && typeof O != "symbol") : jt(
            t,
            e,
            y,
            O,
            l,
            N
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var lt in n)
          O = n[lt], n.hasOwnProperty(lt) && O != null && !l.hasOwnProperty(lt) && jt(t, e, lt, null, l, O);
        for (z in l)
          if (O = l[z], N = n[z], l.hasOwnProperty(z) && O !== N && (O != null || N != null))
            switch (z) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (O != null)
                  throw Error(r(137, e));
                break;
              default:
                jt(
                  t,
                  e,
                  z,
                  O,
                  l,
                  N
                );
            }
        return;
      default:
        if (gr(e)) {
          for (var yt in n)
            O = n[yt], n.hasOwnProperty(yt) && O !== void 0 && !l.hasOwnProperty(yt) && vs(
              t,
              e,
              yt,
              void 0,
              l,
              O
            );
          for (D in l)
            O = l[D], N = n[D], !l.hasOwnProperty(D) || O === N || O === void 0 && N === void 0 || vs(
              t,
              e,
              D,
              O,
              l,
              N
            );
          return;
        }
    }
    for (var A in n)
      O = n[A], n.hasOwnProperty(A) && O != null && !l.hasOwnProperty(A) && jt(t, e, A, null, l, O);
    for (B in l)
      O = l[B], N = n[B], !l.hasOwnProperty(B) || O === N || O == null && N == null || jt(t, e, B, O, l, N);
  }
  function yh(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function lS() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var a = n[l], u = a.transferSize, s = a.initiatorType, m = a.duration;
        if (u && m && yh(s)) {
          for (s = 0, m = a.responseEnd, l += 1; l < n.length; l++) {
            var y = n[l], z = y.startTime;
            if (z > m) break;
            var D = y.transferSize, B = y.initiatorType;
            D && yh(B) && (y = y.responseEnd, s += D * (y < m ? 1 : (m - z) / (y - z)));
          }
          if (--l, e += 8 * (u + s) / (a.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var hs = null, gs = null;
  function Xu(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function bh(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function ph(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Sh(t, e, n, l) {
    return n = Xu(
      n
    ).createElement(t), n[me] = l, n[Ae] = e, be(n, t, e), oe(n), n;
  }
  function ys(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var bs = null;
  function aS() {
    var t = window.event;
    return t && t.type === "popstate" ? t === bs ? !1 : (bs = t, !0) : (bs = null, !1);
  }
  var ps = typeof setTimeout == "function" ? setTimeout : void 0, uS = typeof clearTimeout == "function" ? clearTimeout : void 0, Eh = typeof Promise == "function" ? Promise : void 0, Th = typeof requestAnimationFrame == "function" ? requestAnimationFrame : ps, iS = typeof queueMicrotask == "function" ? queueMicrotask : typeof Eh < "u" ? function(t) {
    return Eh.resolve(null).then(t).catch(oS);
  } : ps;
  function oS(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function bl(t) {
    return t === "head";
  }
  function xh(t, e) {
    var n = e, l = 0;
    do {
      var a = n.nextSibling;
      if (t.removeChild(n), a && a.nodeType === 8)
        if (n = a.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(a), Ka(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          As(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, As(n);
          for (var u = n.firstChild; u; ) {
            var s = u.nextSibling, m = u.nodeName;
            u[ou] || m === "SCRIPT" || m === "STYLE" || m === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = s;
          }
        } else
          n === "body" && As(t.ownerDocument.body);
      n = a;
    } while (n);
    Ka(e);
  }
  function Ch(t, e) {
    var n = t;
    t = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = l;
    } while (n);
  }
  function _h(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var l = 1;
      else
        for (var a = l = 0; a < e.length; a++) {
          var u = e[a];
          0 < u.width && 0 < u.height && l++;
        }
      l === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Oh(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function rS(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function Ss(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return rS(e, n, t);
  }
  function cS(t) {
    return t.documentElement.clientHeight;
  }
  function sS(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function fS(t, e, n, l, a, u, s, m, y) {
    var z = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var D = z.startViewTransition({
        update: function() {
          var O = z.defaultView, N = O.navigation && O.navigation.transition, I = z.fonts.status;
          l();
          var lt = [];
          if (I === "loaded" && (cS(z), z.fonts.status === "loading" && lt.push(z.fonts.ready)), I = lt.length, t !== null)
            for (var yt = t.suspenseyImages, A = 0, p = 0; p < yt.length; p++) {
              var R = yt[p];
              if (!R.complete) {
                var H = R.getBoundingClientRect();
                if (0 < H.bottom && 0 < H.right && H.top < O.innerHeight && H.left < O.innerWidth) {
                  if (A += kh(R), A > Ao) {
                    lt.length = I;
                    break;
                  }
                  R = new Promise(
                    sS.bind(R)
                  ), lt.push(R);
                }
              }
            }
          if (0 < lt.length)
            return O = Promise.race([
              Promise.all(lt),
              new Promise(function(W) {
                return setTimeout(W, 500);
              })
            ]).then(a, a), (N ? Promise.allSettled([N.finished, O]) : O).then(u, u);
          if (a(), N)
            return N.finished.then(
              u,
              u
            );
          u();
        },
        types: n
      });
      z.__reactViewTransition = D;
      var B = [];
      return D.ready.then(
        function() {
          for (var O = z.documentElement.getAnimations({
            subtree: !0
          }), N = 0; N < O.length; N++) {
            var I = O[N], lt = I.effect, yt = lt.pseudoElement;
            if (yt != null && yt.startsWith("::view-transition")) {
              B.push(I), I = lt.getKeyframes();
              for (var A = yt = void 0, p = !0, R = 0; R < I.length; R++) {
                var H = I[R], W = H.width;
                if (yt === void 0) yt = W;
                else if (yt !== W) {
                  p = !1;
                  break;
                }
                if (W = H.height, A === void 0) A = W;
                else if (A !== W) {
                  p = !1;
                  break;
                }
                delete H.width, delete H.height, H.transform === "none" && delete H.transform;
              }
              p && yt !== void 0 && A !== void 0 && (lt.setKeyframes(I), p = getComputedStyle(
                lt.target,
                lt.pseudoElement
              ), p.width !== yt || p.height !== A) && (p = I[0], p.width = yt, p.height = A, p = I[I.length - 1], p.width = yt, p.height = A, lt.setKeyframes(I));
            }
          }
          s();
        },
        function(O) {
          z.__reactViewTransition === D && (z.__reactViewTransition = null);
          try {
            typeof O == "object" && O !== null && O.name === "InvalidStateError" && (O.message === "View transition was skipped because document visibility state is hidden." || O.message === "Skipping view transition because document visibility state has become hidden." || O.message === "Skipping view transition because viewport size changed." || O.message === "Transition was aborted because of invalid state") && (O = null), O !== null && y(O);
          } finally {
            l(), a(), s();
          }
        }
      ), D.finished.finally(function() {
        for (var O = 0; O < B.length; O++)
          B[O].cancel();
        z.__reactViewTransition === D && (z.__reactViewTransition = null), m();
      }), D;
    } catch {
      return l(), a(), s(), null;
    }
  }
  function Il(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  Il.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : q({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, Il.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), l = [], a = 0; a < n.length; a++) {
      var u = n[a].effect;
      u !== null && u.target === t && u.pseudoElement === e && l.push(n[a]);
    }
    return l;
  }, Il.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Ah(t) {
    return {
      name: t,
      group: new Il("group", t),
      imagePair: new Il("image-pair", t),
      old: new Il("old", t),
      new: new Il("new", t)
    };
  }
  function Ze(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Ze.prototype.addEventListener = function(t, e, n) {
    var l = null, a = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var u = this._eventListeners;
      if (Rh(u, t, e, n) === -1) {
        var s = this, m = e;
        n != null && typeof n != "boolean" && n.once === !0 && (m = function(y) {
          s.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, y) : e.handleEvent(y);
        }), l !== null && (a = s.removeEventListener.bind(
          s,
          t,
          e,
          n
        ), l.addEventListener("abort", a, { once: !0 }), a = l.removeEventListener.bind(l, "abort", a)), l = Ga(n), u.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: m,
          cleanup: a
        }), v(
          this._fragmentFiber.child,
          !1,
          dS,
          t,
          m,
          l
        );
      }
      this._eventListeners = u;
    }
  };
  function dS(t, e, n, l) {
    return M(t).addEventListener(
      e,
      n,
      l
    ), !1;
  }
  Ze.prototype.removeEventListener = function(t, e, n) {
    var l = this._eventListeners;
    if (l !== null && (e = Rh(
      l,
      t,
      e,
      n
    ), e !== -1)) {
      var a = l[e];
      n = a.attachedListener;
      var u = a.cleanup;
      a = Ga(a.optionsOrUseCapture), v(
        this._fragmentFiber.child,
        !1,
        mS,
        t,
        n,
        a
      ), l.splice(e, 1), u !== null && u();
    }
  };
  function mS(t, e, n, l) {
    return M(t).removeEventListener(
      e,
      n,
      l
    ), !1;
  }
  function Ga(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function zh(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Rh(t, e, n, l) {
    if (t.length === 0) return -1;
    l = zh(l);
    for (var a = 0; a < t.length; a++) {
      var u = t[a];
      if (u.type === e && u.listener === n && zh(u.optionsOrUseCapture) === l)
        return a;
    }
    return -1;
  }
  Ze.prototype.dispatchEvent = function(t) {
    var e = T(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = M(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var l = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var a = 0; a < n.length; a++) {
          var u = n[a];
          l.addEventListener(
            u.type,
            u.attachedListener,
            Ga(u.optionsOrUseCapture)
          );
        }
      if (e.appendChild(l), t = l.dispatchEvent(t), n)
        for (a = 0; a < n.length; a++)
          u = n[a], l.removeEventListener(
            u.type,
            u.attachedListener,
            Ga(u.optionsOrUseCapture)
          );
      return e.removeChild(l), t;
    }
    return e.dispatchEvent(t);
  }, Ze.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      Nh,
      t,
      void 0,
      void 0
    );
  };
  function Nh(t, e) {
    return t.tag === 6 ? !1 : (t = M(t), _S(t, e));
  }
  Ze.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Es,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !Nh(e[n], t); n--) ;
  };
  function Es(t, e) {
    return e.push(t), !1;
  }
  Ze.prototype.blur = function() {
    var t = T(
      this._fragmentFiber
    );
    t !== null && (t = M(t), t = Xu(t).activeElement, t !== null && v(
      this._fragmentFiber.child,
      !1,
      vS,
      t,
      void 0,
      void 0
    ));
  };
  function vS(t, e) {
    return t.tag === 6 ? !1 : (t = M(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  Ze.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), v(
      this._fragmentFiber.child,
      !1,
      hS,
      t,
      void 0,
      void 0
    );
  };
  function hS(t, e) {
    return t.tag === 6 || (t = M(t), e.observe(t)), !1;
  }
  Ze.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), v(
        this._fragmentFiber.child,
        !1,
        gS,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < fn.length; n++) {
        var l = fn[n];
        l.fragmentInstance === this && l.observer === t ? t.unobserve(l.instance) : fn[e++] = l;
      }
      fn.length = e;
    }
  };
  function gS(t, e) {
    return t.tag === 6 || (t = M(t), e.unobserve(t)), !1;
  }
  var fn = [], Ts = !1;
  function yS(t, e, n) {
    fn.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Ts || (Ts = !0, OS(function() {
      Ts = !1;
      var l = fn;
      fn = [];
      for (var a = 0; a < l.length; a++) {
        var u = l[a];
        u.observer.unobserve(u.instance);
      }
    }));
  }
  Ze.prototype.getClientRects = function() {
    var t = [];
    return v(
      this._fragmentFiber.child,
      !1,
      bS,
      t,
      void 0,
      void 0
    ), t;
  };
  function bS(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = M(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  Ze.prototype.getRootNode = function(t) {
    var e = T(
      this._fragmentFiber
    );
    return e === null ? this : M(e).getRootNode(t);
  }, Ze.prototype.compareDocumentPosition = function(t) {
    var e = T(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    v(
      this._fragmentFiber.child,
      !1,
      Es,
      n,
      void 0,
      void 0
    );
    var l = M(e);
    if (n.length === 0) {
      if (n = l, U(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (n = e);
      }
      e = this._fragmentFiber;
      var a = l = n.compareDocumentPosition(t);
      return n === t ? a = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = G(e)[1], n === null ? a = Node.DOCUMENT_POSITION_PRECEDING : (t = M(n).compareDocumentPosition(
        t
      ), a = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), a |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = M(n[0]), a = M(n[n.length - 1]);
    var u = U(this._fragmentFiber) ? e.parentElement : l;
    if (u == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = u.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, u = u.compareDocumentPosition(a) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var s = e.compareDocumentPosition(t), m = a.compareDocumentPosition(t), y = s & Node.DOCUMENT_POSITION_CONTAINED_BY || m & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return m = l && u && s & Node.DOCUMENT_POSITION_FOLLOWING && m & Node.DOCUMENT_POSITION_PRECEDING, e = l && e === t || u && a === t || y || m ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && e === t || !u && a === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : s, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || pS(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function pS(t, e, n, l, a) {
    var u = zl(a);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!u)
        t: {
          for (; u !== null; ) {
            if (u.tag === 7 && (u === e || u.alternate === e)) {
              n = !0;
              break t;
            }
            u = u.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (u === null)
        return u = a.ownerDocument, a === u || a === u.documentElement || a === u.body;
      t: {
        for (u = e, e = T(e); u !== null; ) {
          if (!(u.tag !== 5 && u.tag !== 3 && u.tag !== 27 || u !== e && u.alternate !== e)) {
            u = !0;
            break t;
          }
          u = u.return;
        }
        u = !1;
      }
      return u;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!u) && !(e = u === n) && (e = Q(
      n,
      u,
      J
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Y,
      u,
      n
    ), u = K, K = null, e = u !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!u) && !(e = u === l) && (e = Q(
      l,
      u,
      J
    ), e === null ? e = !1 : (v(
      e,
      !0,
      k,
      u,
      l
    ), u = K, X = K = null, e = u !== null)), e) : !1;
  }
  function Dh(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Ze.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(r(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Es,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var l = G(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || T(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        t = M(l), Dh(t, n);
        return;
      }
      if (l = M(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          n = "host" in l ? l.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        l.scrollIntoView(t);
      }
    }
    for (l = n ? e.length - 1 : 0; l !== (n ? -1 : e.length); ) {
      var a = e[l];
      a.tag === 6 ? (a = M(a), Dh(a, n)) : M(a).scrollIntoView(t), l += n ? -1 : 1;
    }
  };
  function SS(t, e) {
    return t = M(t), Mh(t, e), !1;
  }
  function Mh(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function wh(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        t.addEventListener(
          a.type,
          a.attachedListener,
          Ga(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(u) {
      for (var s = 0, m = 0; m < fn.length; m++) {
        var y = fn[m];
        (y.fragmentInstance !== e || y.observer !== u || y.instance !== t) && (fn[s++] = y);
      }
      fn.length = s, u.observe(t);
    }), Mh(t, e));
  }
  function ES(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var a = n[l];
        t.removeEventListener(
          a.type,
          a.attachedListener,
          Ga(a.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(u) {
      typeof u.rootMargin == "string" ? yS(
        e,
        u,
        t
      ) : u.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function xs(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          xs(n), vi(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function TS(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var a = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[ou])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== a.rel || t.getAttribute("href") !== (a.href == null || a.href === "" ? null : a.href) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin) || t.getAttribute("title") !== (a.title == null ? null : a.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (a.src == null ? null : a.src) || t.getAttribute("type") !== (a.type == null ? null : a.type) || t.getAttribute("crossorigin") !== (a.crossOrigin == null ? null : a.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = a.name == null ? null : "" + a.name;
        if (a.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = en(t.nextSibling), t === null) break;
    }
    return null;
  }
  function xS(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function jh(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = en(t.nextSibling), t === null)) return null;
    return t;
  }
  function Cs(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function _s(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function CS(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var l = function() {
        e(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function en(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Os = null;
  function Uh(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return en(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Hh(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function _S(t, e) {
    function n() {
      l = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var l = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return l;
  }
  function OS(t) {
    Th(function() {
      Th(function(e) {
        return t(e);
      });
    });
  }
  function Bh(t, e, n) {
    switch (e = Xu(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Lh(t, e, n) {
    for (var l in n) {
      var a = n[l];
      n.hasOwnProperty(l) && a != null && jt(t, e, l, null, eS, a);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === hn && (t.onclick = null), vi(t);
  }
  function As(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    vi(t);
  }
  var nn = /* @__PURE__ */ new Map(), Vh = /* @__PURE__ */ new Set();
  function Qu(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Xn = ct.d;
  ct.d = {
    f: AS,
    r: zS,
    D: RS,
    C: NS,
    L: DS,
    m: MS,
    X: jS,
    S: wS,
    M: US
  };
  function AS() {
    var t = Xn.f(), e = bo();
    return t || e;
  }
  function zS(t) {
    var e = ua(t);
    e !== null && e.tag === 5 && e.type === "form" ? Ym(e) : Xn.r(t);
  }
  var Ya = typeof document > "u" ? null : document;
  function Gh(t, e, n) {
    var l = Ya;
    if (l && typeof e == "string" && e) {
      var a = Je(e);
      a = 'link[rel="' + t + '"][href="' + a + '"]', typeof n == "string" && (a += '[crossorigin="' + n + '"]'), Vh.has(a) || (Vh.add(a), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(a) === null && (e = l.createElement("link"), be(e, "link", t), oe(e), l.head.appendChild(e)));
    }
  }
  function RS(t) {
    Xn.D(t), Gh("dns-prefetch", t, null);
  }
  function NS(t, e) {
    Xn.C(t, e), Gh("preconnect", t, e);
  }
  function DS(t, e, n) {
    Xn.L(t, e, n);
    var l = Ya;
    if (l && t && e) {
      var a = 'link[rel="preload"][as="' + Je(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (a += '[imagesrcset="' + Je(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (a += '[imagesizes="' + Je(
        n.imageSizes
      ) + '"]')) : a += '[href="' + Je(t) + '"]';
      var u = a;
      switch (e) {
        case "style":
          u = qa(t);
          break;
        case "script":
          u = Xa(t);
      }
      if (!(nn.has(u) || (t = q(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), nn.set(u, t), l.querySelector(a) !== null || e === "style" && l.querySelector(Zu(u)) || e === "script" && l.querySelector(Ku(u))))) {
        var s = l.createElement("link");
        be(s, "link", t), e === "style" && (s[mi] = !0, s.onload = s.onerror = function() {
          Wf(s);
        }), oe(s), l.head.appendChild(s);
      }
    }
  }
  function MS(t, e) {
    Xn.m(t, e);
    var n = Ya;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", a = 'link[rel="modulepreload"][as="' + Je(l) + '"][href="' + Je(t) + '"]', u = a;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = Xa(t);
      }
      if (!nn.has(u) && (t = q({ rel: "modulepreload", href: t }, e), nn.set(u, t), n.querySelector(a) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ku(u)))
              return;
        }
        l = n.createElement("link"), be(l, "link", t), oe(l), n.head.appendChild(l);
      }
    }
  }
  function wS(t, e, n) {
    Xn.S(t, e, n);
    var l = Ya;
    if (l && t) {
      var a = ia(l).hoistableStyles, u = qa(t);
      e = e || "default";
      var s = a.get(u);
      if (!s) {
        var m = { loading: 0, preload: null };
        if (s = l.querySelector(
          Zu(u)
        ))
          m.loading = 5;
        else {
          t = q(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = nn.get(u)) && zs(t, n);
          var y = s = l.createElement("link");
          oe(y), be(y, "link", t), y._p = new Promise(function(z, D) {
            y.onload = z, y.onerror = D;
          }), y.addEventListener("load", function() {
            m.loading |= 1;
          }), y.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, _o(s, e, l);
        }
        s = {
          type: "stylesheet",
          instance: s,
          count: 1,
          state: m
        }, a.set(u, s);
      }
    }
  }
  function jS(t, e) {
    Xn.X(t, e);
    var n = Ya;
    if (n && t) {
      var l = ia(n).hoistableScripts, a = Xa(t), u = l.get(a);
      u || (u = n.querySelector(Ku(a)), u || (t = q({ src: t, async: !0 }, e), (e = nn.get(a)) && Rs(t, e), u = n.createElement("script"), oe(u), be(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(a, u));
    }
  }
  function US(t, e) {
    Xn.M(t, e);
    var n = Ya;
    if (n && t) {
      var l = ia(n).hoistableScripts, a = Xa(t), u = l.get(a);
      u || (u = n.querySelector(Ku(a)), u || (t = q({ src: t, async: !0, type: "module" }, e), (e = nn.get(a)) && Rs(t, e), u = n.createElement("script"), oe(u), be(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(a, u));
    }
  }
  function Yh(t, e, n, l) {
    var a = (a = In.current) ? Qu(a) : null;
    if (!a) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = qa(n.href), e = ia(
          a
        ).hoistableStyles, l = e.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = qa(n.href);
          var u = ia(
            a
          ).hoistableStyles, s = u.get(t);
          if (s || (a = a.ownerDocument || a, s = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, s), (u = a.querySelector(
            Zu(t)
          )) ? u._p || (s.instance = u, s.state.loading = 5) : (u = nn.get(t), u || (u = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, nn.set(t, u)), HS(
            a,
            t,
            u,
            s.state
          ))), e && l === null)
            throw Error(r(528, ""));
          return s;
        }
        if (e && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = Xa(n), e = ia(
          a
        ).hoistableScripts, l = e.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function qa(t) {
    return 'href="' + Je(t) + '"';
  }
  function Zu(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function qh(t) {
    return q({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function HS(t, e, n, l) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[mi] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[mi] = !0, e.onload = e.onerror = Wf.bind(null, e), be(e, "link", n), oe(e), t.head.appendChild(e);
    l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function Xa(t) {
    return '[src="' + Je(t) + '"]';
  }
  function Ku(t) {
    return "script[async]" + t;
  }
  function Xh(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + Je(n.href) + '"]'
          );
          if (l)
            return e.instance = l, oe(l), l;
          var a = q({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), oe(l), be(l, "style", a), _o(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          a = qa(n.href);
          var u = t.querySelector(
            Zu(a)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, oe(u), u;
          l = qh(n), (a = nn.get(a)) && zs(l, a), u = (t.ownerDocument || t).createElement("link"), oe(u);
          var s = u;
          return s._p = new Promise(function(m, y) {
            s.onload = m, s.onerror = y;
          }), be(u, "link", l), e.state.loading |= 4, _o(u, n.precedence, t), e.instance = u;
        case "script":
          return u = Xa(n.src), (a = t.querySelector(
            Ku(u)
          )) ? (e.instance = a, oe(a), a) : (l = n, (a = nn.get(u)) && (l = q({}, n), Rs(l, a)), t = t.ownerDocument || t, a = t.createElement("script"), oe(a), be(a, "link", l), t.head.appendChild(a), e.instance = a);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, _o(l, n.precedence, t));
    return e.instance;
  }
  function _o(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), a = l.length ? l[l.length - 1] : null, u = a, s = 0; s < l.length; s++) {
      var m = l[s];
      if (m.dataset.precedence === e) u = m;
      else if (u !== a) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function zs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Rs(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Oo = null;
  function Qh(t, e, n) {
    if (Oo === null) {
      var l = /* @__PURE__ */ new Map(), a = Oo = /* @__PURE__ */ new Map();
      a.set(n, l);
    } else
      a = Oo, l = a.get(n), l || (l = /* @__PURE__ */ new Map(), a.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), a = 0; a < n.length; a++) {
      var u = n[a];
      if (!(u[ou] || u[me] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var s = u.getAttribute(e) || "";
        s = t + s;
        var m = l.get(s);
        m ? m.push(u) : l.set(s, [u]);
      }
    }
    return l;
  }
  function Ns(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function BS(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Zh(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function Kh(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function kh(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function Jh(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += kh(e), t.suspenseyImages.push(e)), t = GS.bind(t), e.decode().then(t, t));
  }
  function LS(t, e, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var a = qa(l.href), u = e.querySelector(
          Zu(a)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ku.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = u, oe(u);
          return;
        }
        u = e.ownerDocument || e, l = qh(l), (a = nn.get(a)) && zs(l, a), u = u.createElement("link"), oe(u);
        var s = u;
        s._p = new Promise(function(m, y) {
          s.onload = m, s.onerror = y;
        }), be(u, "link", l), n.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ku.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Ao = 0;
  function VS(t, e) {
    return t.stylesheets && t.count === 0 && Ro(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (t.stylesheets && Ro(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ao === 0 && (Ao = 62500 * lS());
      var a = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Ro(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Ao ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(a);
      };
    } : null;
  }
  function Ih(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Ro(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function ku() {
    this.count--, Ih(this);
  }
  function GS() {
    this.imgCount--, Ih(this);
  }
  var zo = null;
  function Ro(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, zo = /* @__PURE__ */ new Map(), e.forEach(YS, t), zo = null, ku.call(t));
  }
  function YS(t, e) {
    if (!(e.state.loading & 4)) {
      var n = zo.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), zo.set(t, n);
        for (var a = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < a.length; u++) {
          var s = a[u];
          (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (n.set(s.dataset.precedence, s), l = s);
        }
        l && n.set(null, l);
      }
      a = e.instance, s = a.getAttribute("data-precedence"), u = n.get(s) || l, u === l && n.set(null, a), n.set(s, a), this.count++, l = ku.bind(this), a.addEventListener("load", l), a.addEventListener("error", l), u ? u.parentNode.insertBefore(a, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(a, t.firstChild)), e.state.loading |= 4;
    }
  }
  var Qa = {
    $$typeof: bt,
    Provider: null,
    Consumer: null,
    _currentValue: je,
    _currentValue2: je,
    _threadCount: 0
  };
  function qS(t, e, n, l, a, u, s, m, y) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = sr(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = sr(0), this.hiddenUpdates = sr(null), this.identifierPrefix = l, this.onUncaughtError = a, this.onCaughtError = u, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = y, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Fh(t, e, n, l, a, u, s, m, y, z, D, B) {
    return t = new qS(
      t,
      e,
      n,
      s,
      y,
      z,
      D,
      B,
      m
    ), e = 1, u === !0 && (e |= 24), u = ze(3, null, null, e), t.current = u, u.stateNode = t, e = Zr(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, Ir(u), t;
  }
  function $h(t) {
    return t ? (t = ga, t) : ga;
  }
  function Ph(t, e, n, l, a, u) {
    a = $h(a), l.context === null ? l.context = a : l.pendingContext = a, l = il(e), l.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (l.callback = u), n = ol(t, l, e), n !== null && (Me(n, t, e), Cu(n, t, e));
  }
  function Wh(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Ds(t, e) {
    Wh(t, e), (t = t.alternate) && Wh(t, e);
  }
  function tg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ml(t, 67108864);
      e !== null && Me(e, t, 67108864), Ds(t, 67108864);
    }
  }
  function eg(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Qe();
      e = fr(e);
      var n = Ml(t, e);
      n !== null && Me(n, t, e), Ds(t, e);
    }
  }
  var Za = !0;
  function XS(t, e, n, l) {
    var a = P.T;
    P.T = null;
    var u = ct.p;
    try {
      ct.p = 2, Ms(t, e, n, l);
    } finally {
      ct.p = u, P.T = a;
    }
  }
  function QS(t, e, n, l) {
    var a = P.T;
    P.T = null;
    var u = ct.p;
    try {
      ct.p = 8, Ms(t, e, n, l);
    } finally {
      ct.p = u, P.T = a;
    }
  }
  function Ms(t, e, n, l) {
    if (Za) {
      var a = ws(l);
      if (a === null)
        ms(
          t,
          e,
          l,
          No,
          n
        ), lg(t, l);
      else if (KS(
        a,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (lg(t, l), e & 4 && -1 < ZS.indexOf(t)) {
        for (; a !== null; ) {
          var u = ua(a);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var s = Al(u.pendingLanes);
                  if (s !== 0) {
                    var m = u;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; s; ) {
                      var y = 1 << 31 - Be(s);
                      m.entanglements[1] |= y, s &= ~y;
                    }
                    _n(u), (Nt & 6) === 0 && (ho = Ue() + 500, Gu(0));
                  }
                }
                break;
              case 31:
              case 13:
                m = Ml(u, 2), m !== null && Me(m, u, 2), bo(), Ds(u, 2);
            }
          if (u = ws(l), u === null && ms(
            t,
            e,
            l,
            No,
            n
          ), u === a) break;
          a = u;
        }
        a !== null && l.stopPropagation();
      } else
        ms(
          t,
          e,
          l,
          null,
          n
        );
    }
  }
  function ws(t) {
    return t = br(t), js(t);
  }
  var No = null;
  function js(t) {
    if (No = null, t = zl(t), t !== null) {
      var e = d(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = g(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return No = t, null;
  }
  function ng(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (lb()) {
          case Yf:
            return 2;
          case qf:
            return 8;
          case ri:
          case ab:
            return 32;
          case Xf:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Us = !1, pl = null, Sl = null, El = null, Ju = /* @__PURE__ */ new Map(), Iu = /* @__PURE__ */ new Map(), Tl = [], ZS = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function lg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        pl = null;
        break;
      case "dragenter":
      case "dragleave":
        Sl = null;
        break;
      case "mouseover":
      case "mouseout":
        El = null;
        break;
      case "pointerover":
      case "pointerout":
        Ju.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Iu.delete(e.pointerId);
    }
  }
  function Fu(t, e, n, l, a, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [a]
    }, e !== null && (e = ua(e), e !== null && tg(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, a !== null && e.indexOf(a) === -1 && e.push(a), t);
  }
  function KS(t, e, n, l, a) {
    switch (e) {
      case "focusin":
        return pl = Fu(
          pl,
          t,
          e,
          n,
          l,
          a
        ), !0;
      case "dragenter":
        return Sl = Fu(
          Sl,
          t,
          e,
          n,
          l,
          a
        ), !0;
      case "mouseover":
        return El = Fu(
          El,
          t,
          e,
          n,
          l,
          a
        ), !0;
      case "pointerover":
        var u = a.pointerId;
        return Ju.set(
          u,
          Fu(
            Ju.get(u) || null,
            t,
            e,
            n,
            l,
            a
          )
        ), !0;
      case "gotpointercapture":
        return u = a.pointerId, Iu.set(
          u,
          Fu(
            Iu.get(u) || null,
            t,
            e,
            n,
            l,
            a
          )
        ), !0;
    }
    return !1;
  }
  function ag(t) {
    var e = zl(t.target);
    if (e !== null) {
      var n = d(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, Ff(t.priority, function() {
              eg(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = g(n), e !== null) {
            t.blockedOn = e, Ff(t.priority, function() {
              eg(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Do(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = ws(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        yr = l, n.target.dispatchEvent(l), yr = null;
      } else
        return e = ua(n), e !== null && tg(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function ug(t, e, n) {
    Do(t) && n.delete(e);
  }
  function kS() {
    Us = !1, pl !== null && Do(pl) && (pl = null), Sl !== null && Do(Sl) && (Sl = null), El !== null && Do(El) && (El = null), Ju.forEach(ug), Iu.forEach(ug);
  }
  function Mo(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Us || (Us = !0, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      kS
    )));
  }
  var wo = null;
  function ig(t) {
    wo !== t && (wo = t, i.unstable_scheduleCallback(
      i.unstable_NormalPriority,
      function() {
        wo === t && (wo = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], a = t[e + 2];
          if (typeof l != "function") {
            if (js(l || n) === null)
              continue;
            break;
          }
          var u = ua(n);
          u !== null && (t.splice(e, 3), e -= 3, gc(
            u,
            {
              pending: !0,
              data: a,
              method: n.method,
              action: l
            },
            l,
            a
          ));
        }
      }
    ));
  }
  function Ka(t) {
    function e(y) {
      return Mo(y, t);
    }
    pl !== null && Mo(pl, t), Sl !== null && Mo(Sl, t), El !== null && Mo(El, t), Ju.forEach(e), Iu.forEach(e);
    for (var n = 0; n < Tl.length; n++) {
      var l = Tl[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Tl.length && (n = Tl[0], n.blockedOn === null); )
      ag(n), n.blockedOn === null && Tl.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var a = n[l], u = n[l + 1], s = a[Ae] || null;
        if (typeof u == "function")
          s || ig(n);
        else if (s) {
          var m = null;
          if (u && u.hasAttribute("formAction")) {
            if (a = u, s = u[Ae] || null)
              m = s.formAction;
            else if (js(a) !== null) continue;
          } else m = s.action;
          typeof m == "function" ? n[l + 1] = m : (n.splice(l, 3), l -= 3), ig(n);
        }
      }
  }
  function og() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(s) {
            return a = s;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      a !== null && (a(), a = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, a = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), a !== null && (a(), a = null);
      };
    }
  }
  function Hs(t) {
    this._internalRoot = t;
  }
  jo.prototype.render = Hs.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, l = Qe();
    Ph(n, l, t, e, null, null);
  }, jo.prototype.unmount = Hs.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Ph(t.current, 2, null, t, null, null), bo(), e[aa] = null;
    }
  };
  function jo(t) {
    this._internalRoot = t;
  }
  jo.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = If();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Tl.length && e !== 0 && e < Tl[n].priority; n++) ;
      Tl.splice(n, 0, t), n === 0 && ag(t);
    }
  };
  var rg = o.version;
  if (rg !== "19.3.1")
    throw Error(
      r(
        527,
        rg,
        "19.3.1"
      )
    );
  ct.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = E(e), t = t !== null ? _(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var JS = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: P,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Uo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Uo.isDisabled && Uo.supportsFiber)
      try {
        au = Uo.inject(
          JS
        ), He = Uo;
      } catch {
      }
  }
  return Pu.createRoot = function(t, e) {
    if (!f(t)) throw Error(r(299));
    var n = !1, l = "", a = $m, u = Pm, s = Wm;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (a = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (s = e.onRecoverableError)), e = Fh(
      t,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      a,
      u,
      s,
      og
    ), t[aa] = e.current, ds(t), new Hs(e);
  }, Pu.hydrateRoot = function(t, e, n) {
    if (!f(t)) throw Error(r(299));
    var l = !1, a = "", u = $m, s = Pm, m = Wm, y = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (a = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (m = n.onRecoverableError), n.formState !== void 0 && (y = n.formState)), e = Fh(
      t,
      1,
      !0,
      e,
      n ?? null,
      l,
      a,
      y,
      u,
      s,
      m,
      og
    ), e.context = $h(null), n = e.current, l = Qe(), l = fr(l), a = il(l), a.callback = null, ol(n, a, l), n = l, e.current.lanes = n, iu(e, n), _n(e), t[aa] = e.current, ds(t), new jo(e);
  }, Pu.version = "19.3.1", Pu;
}
var Eg;
function i1() {
  if (Eg) return Gs.exports;
  Eg = 1;
  function i() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i);
      } catch (o) {
        console.error(o);
      }
  }
  return i(), Gs.exports = u1(), Gs.exports;
}
var Wg = i1();
function ty(i) {
  var o, c, r = "";
  if (typeof i == "string" || typeof i == "number") r += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var f = i.length;
    for (o = 0; o < f; o++) i[o] && (c = ty(i[o])) && (r && (r += " "), r += c);
  } else for (c in i) i[c] && (r && (r += " "), r += c);
  return r;
}
function ey() {
  for (var i, o, c = 0, r = "", f = arguments.length; c < f; c++) (i = arguments[c]) && (o = ty(i)) && (r && (r += " "), r += o);
  return r;
}
const Tg = (i) => typeof i == "boolean" ? `${i}` : i === 0 ? "0" : i, xg = ey, bf = (i, o) => (c) => {
  var r;
  if (o?.variants == null) return xg(i, c?.class, c?.className);
  const { variants: f, defaultVariants: d } = o, h = Object.keys(f).map((E) => {
    const _ = c?.[E], v = d?.[E];
    if (_ === null) return null;
    const T = Tg(_) || Tg(v);
    return f[E][T];
  }), g = c && Object.entries(c).reduce((E, _) => {
    let [v, T] = _;
    return T === void 0 || (E[v] = T), E;
  }, {}), C = o == null || (r = o.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((E, _) => {
    let { class: v, className: T, ...U } = _;
    return Object.entries(U).every((G) => {
      let [w, M] = G;
      return Array.isArray(M) ? M.includes({
        ...d,
        ...g
      }[w]) : {
        ...d,
        ...g
      }[w] === M;
    }) ? [
      ...E,
      v,
      T
    ] : E;
  }, []);
  return xg(i, h, C, c?.class, c?.className);
}, o1 = (i, o) => {
  const c = new Array(i.length + o.length);
  for (let r = 0; r < i.length; r++)
    c[r] = i[r];
  for (let r = 0; r < o.length; r++)
    c[i.length + r] = o[r];
  return c;
}, r1 = (i, o) => ({
  classGroupId: i,
  validator: o
}), ny = (i = /* @__PURE__ */ new Map(), o = null, c) => ({
  nextPart: i,
  validators: o,
  classGroupId: c
}), Jo = "-", Cg = [], c1 = "arbitrary..", s1 = (i) => {
  const o = d1(i), {
    conflictingClassGroups: c,
    conflictingClassGroupModifiers: r
  } = i;
  return {
    getClassGroupId: (h) => {
      if (h.startsWith("[") && h.endsWith("]"))
        return f1(h);
      const g = h.split(Jo), C = g[0] === "" && g.length > 1 ? 1 : 0;
      return ly(g, C, o);
    },
    getConflictingClassGroupIds: (h, g) => {
      if (g) {
        const C = r[h], E = c[h];
        return C ? E ? o1(E, C) : C : E || Cg;
      }
      return c[h] || Cg;
    }
  };
}, ly = (i, o, c) => {
  if (i.length - o === 0)
    return c.classGroupId;
  const f = i[o], d = c.nextPart.get(f);
  if (d) {
    const E = ly(i, o + 1, d);
    if (E) return E;
  }
  const h = c.validators;
  if (h === null)
    return;
  const g = o === 0 ? i.join(Jo) : i.slice(o).join(Jo), C = h.length;
  for (let E = 0; E < C; E++) {
    const _ = h[E];
    if (_.validator(g))
      return _.classGroupId;
  }
}, f1 = (i) => i.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const o = i.slice(1, -1), c = o.indexOf(":"), r = o.slice(0, c);
  return r ? c1 + r : void 0;
})(), d1 = (i) => {
  const {
    theme: o,
    classGroups: c
  } = i;
  return m1(c, o);
}, m1 = (i, o) => {
  const c = ny();
  for (const r in i) {
    const f = i[r];
    pf(f, c, r, o);
  }
  return c;
}, pf = (i, o, c, r) => {
  const f = i.length;
  for (let d = 0; d < f; d++) {
    const h = i[d];
    v1(h, o, c, r);
  }
}, v1 = (i, o, c, r) => {
  if (typeof i == "string") {
    h1(i, o, c);
    return;
  }
  if (typeof i == "function") {
    g1(i, o, c, r);
    return;
  }
  y1(i, o, c, r);
}, h1 = (i, o, c) => {
  const r = i === "" ? o : ay(o, i);
  r.classGroupId = c;
}, g1 = (i, o, c, r) => {
  if (b1(i)) {
    pf(i(r), o, c, r);
    return;
  }
  o.validators === null && (o.validators = []), o.validators.push(r1(c, i));
}, y1 = (i, o, c, r) => {
  const f = Object.entries(i), d = f.length;
  for (let h = 0; h < d; h++) {
    const [g, C] = f[h];
    pf(C, ay(o, g), c, r);
  }
}, ay = (i, o) => {
  let c = i;
  const r = o.split(Jo), f = r.length;
  for (let d = 0; d < f; d++) {
    const h = r[d];
    let g = c.nextPart.get(h);
    g || (g = ny(), c.nextPart.set(h, g)), c = g;
  }
  return c;
}, b1 = (i) => "isThemeGetter" in i && i.isThemeGetter === !0, p1 = (i) => {
  if (i < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let o = 0, c = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  const f = (d, h) => {
    c[d] = h, o++, o > i && (o = 0, r = c, c = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(d) {
      let h = c[d];
      if (h !== void 0)
        return h;
      if ((h = r[d]) !== void 0)
        return f(d, h), h;
    },
    set(d, h) {
      d in c ? c[d] = h : f(d, h);
    }
  };
}, ef = "!", _g = ":", S1 = [], Og = (i, o, c, r, f) => ({
  modifiers: i,
  hasImportantModifier: o,
  baseClassName: c,
  maybePostfixModifierPosition: r,
  isExternal: f
}), E1 = (i) => {
  const {
    prefix: o,
    experimentalParseClassName: c
  } = i;
  let r = (f) => {
    const d = [];
    let h = 0, g = 0, C = 0, E;
    const _ = f.length;
    for (let w = 0; w < _; w++) {
      const M = f[w];
      if (h === 0 && g === 0) {
        if (M === _g) {
          d.push(f.slice(C, w)), C = w + 1;
          continue;
        }
        if (M === "/") {
          E = w;
          continue;
        }
      }
      M === "[" ? h++ : M === "]" ? h-- : M === "(" ? g++ : M === ")" && g--;
    }
    const v = d.length === 0 ? f : f.slice(C);
    let T = v, U = !1;
    v.endsWith(ef) ? (T = v.slice(0, -1), U = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      v.startsWith(ef) && (T = v.slice(1), U = !0)
    );
    const G = E && E > C ? E - C : void 0;
    return Og(d, U, T, G);
  };
  if (o) {
    const f = o + _g, d = r;
    r = (h) => h.startsWith(f) ? d(h.slice(f.length)) : Og(S1, !1, h, void 0, !0);
  }
  if (c) {
    const f = r;
    r = (d) => c({
      className: d,
      parseClassName: f
    });
  }
  return r;
}, T1 = (i) => {
  const o = /* @__PURE__ */ new Map();
  return i.orderSensitiveModifiers.forEach((c, r) => {
    o.set(c, 1e6 + r);
  }), (c) => {
    const r = [];
    let f = [];
    for (let d = 0; d < c.length; d++) {
      const h = c[d], g = h[0] === "[", C = o.has(h);
      g || C ? (f.length > 0 && (f.sort(), r.push(...f), f = []), r.push(h)) : f.push(h);
    }
    return f.length > 0 && (f.sort(), r.push(...f)), r;
  };
}, x1 = (i) => ({
  cache: p1(i.cacheSize),
  parseClassName: E1(i),
  sortModifiers: T1(i),
  postfixLookupClassGroupIds: C1(i),
  ...s1(i)
}), C1 = (i) => {
  const o = /* @__PURE__ */ Object.create(null), c = i.postfixLookupClassGroups;
  if (c)
    for (let r = 0; r < c.length; r++)
      o[c[r]] = !0;
  return o;
}, _1 = /\s+/, O1 = (i, o) => {
  const {
    parseClassName: c,
    getClassGroupId: r,
    getConflictingClassGroupIds: f,
    sortModifiers: d,
    postfixLookupClassGroupIds: h
  } = o, g = [], C = i.trim().split(_1);
  let E = "";
  for (let _ = C.length - 1; _ >= 0; _ -= 1) {
    const v = C[_], {
      isExternal: T,
      modifiers: U,
      hasImportantModifier: G,
      baseClassName: w,
      maybePostfixModifierPosition: M
    } = c(v);
    if (T) {
      E = v + (E.length > 0 ? " " + E : E);
      continue;
    }
    let K = !!M, X;
    if (K) {
      const q = w.substring(0, M);
      X = r(q);
      const L = X && h[X] ? r(w) : void 0;
      L && L !== X && (X = L, K = !1);
    } else
      X = r(w);
    if (!X) {
      if (!K) {
        E = v + (E.length > 0 ? " " + E : E);
        continue;
      }
      if (X = r(w), !X) {
        E = v + (E.length > 0 ? " " + E : E);
        continue;
      }
      K = !1;
    }
    const Y = U.length === 0 ? "" : U.length === 1 ? U[0] : d(U).join(":"), k = G ? Y + ef : Y, J = k + X;
    if (g.indexOf(J) > -1)
      continue;
    g.push(J);
    const Q = f(X, K);
    for (let q = 0; q < Q.length; ++q) {
      const L = Q[q];
      g.push(k + L);
    }
    E = v + (E.length > 0 ? " " + E : E);
  }
  return E;
}, A1 = (...i) => {
  let o = 0, c, r, f = "";
  for (; o < i.length; )
    (c = i[o++]) && (r = uy(c)) && (f && (f += " "), f += r);
  return f;
}, uy = (i) => {
  if (typeof i == "string")
    return i;
  let o, c = "";
  for (let r = 0; r < i.length; r++)
    i[r] && (o = uy(i[r])) && (c && (c += " "), c += o);
  return c;
}, z1 = (i, ...o) => {
  let c, r, f, d;
  const h = (C) => {
    const E = o.reduce((_, v) => v(_), i());
    return c = x1(E), r = c.cache.get, f = c.cache.set, d = g, g(C);
  }, g = (C) => {
    const E = r(C);
    if (E)
      return E;
    const _ = O1(C, c);
    return f(C, _), _;
  };
  return d = h, (...C) => d(A1(...C));
}, R1 = [], le = (i) => {
  const o = (c) => c[i] || R1;
  return o.isThemeGetter = !0, o.themeKey = i, o;
}, iy = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, oy = /^\((?:(\w[\w-]*):)?(.+)\)$/i, N1 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, D1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, M1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, w1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, j1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, U1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Cl = (i) => N1.test(i), Et = (i) => !!i && !Number.isNaN(Number(i)), On = (i) => !!i && Number.isInteger(Number(i)), Qs = (i) => i.endsWith("%") && Et(i.slice(0, -1)), Qn = (i) => D1.test(i), ry = () => !0, H1 = (i) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  M1.test(i) && !w1.test(i)
), Sf = () => !1, B1 = (i) => j1.test(i), L1 = (i) => U1.test(i), V1 = (i) => !tt(i) && !nt(i), G1 = (i) => i.startsWith("@container") && (i[10] === "/" && i[11] !== void 0 || i[11] === "s" && i[16] !== void 0 && i.startsWith("-size/", 10) || i[11] === "n" && i[18] !== void 0 && i.startsWith("-normal/", 10)), Y1 = (i) => Ol(i, fy, Sf), tt = (i) => iy.test(i), Fl = (i) => Ol(i, dy, H1), Ag = (i) => Ol(i, I1, Et), q1 = (i) => Ol(i, vy, ry), X1 = (i) => Ol(i, my, Sf), zg = (i) => Ol(i, cy, Sf), Q1 = (i) => Ol(i, sy, L1), Ho = (i) => Ol(i, hy, B1), nt = (i) => oy.test(i), Wu = (i) => Wl(i, dy), Z1 = (i) => Wl(i, my), Rg = (i) => Wl(i, cy), K1 = (i) => Wl(i, fy), k1 = (i) => Wl(i, sy), Bo = (i) => Wl(i, hy, !0), J1 = (i) => Wl(i, vy, !0), Ol = (i, o, c) => {
  const r = iy.exec(i);
  return r ? r[1] ? o(r[1]) : c(r[2]) : !1;
}, Wl = (i, o, c = !1) => {
  const r = oy.exec(i);
  return r ? r[1] ? o(r[1]) : c : !1;
}, cy = (i) => i === "position" || i === "percentage", sy = (i) => i === "image" || i === "url", fy = (i) => i === "length" || i === "size" || i === "bg-size", dy = (i) => i === "length", I1 = (i) => i === "number", my = (i) => i === "family-name", vy = (i) => i === "number" || i === "weight", hy = (i) => i === "shadow", F1 = () => {
  const i = le("color"), o = le("font"), c = le("text"), r = le("font-weight"), f = le("tracking"), d = le("leading"), h = le("breakpoint"), g = le("container"), C = le("spacing"), E = le("radius"), _ = le("shadow"), v = le("inset-shadow"), T = le("text-shadow"), U = le("drop-shadow"), G = le("blur"), w = le("perspective"), M = le("aspect"), K = le("ease"), X = le("animate"), Y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], k = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], J = () => [...k(), nt, tt], Q = () => ["auto", "hidden", "clip", "visible", "scroll"], q = () => ["auto", "contain", "none"], L = () => [nt, tt, C], it = () => [Cl, "full", "auto", ...L()], Ot = () => [On, "none", "subgrid", nt, tt], ht = () => ["auto", {
    span: ["full", On, nt, tt]
  }, On, nt, tt], ot = () => [On, "auto", nt, tt], Ht = () => ["auto", "min", "max", "fr", nt, tt], Lt = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], bt = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], Z = () => ["auto", ...L()], $ = () => [Cl, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...L()], at = () => [g, Cl, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...L()], ft = () => [Cl, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...L()], j = () => [i, nt, tt], dt = () => [...k(), Rg, zg, {
    position: [nt, tt]
  }], Zt = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ee = () => ["auto", "cover", "contain", K1, Y1, {
    size: [nt, tt]
  }], x = () => [Qs, Wu, Fl], V = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    E,
    nt,
    tt
  ], F = () => ["", Et, Wu, Fl], et = () => ["solid", "dashed", "dotted", "double"], pt = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], ut = () => [Et, Qs, Rg, zg], vt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    G,
    nt,
    tt
  ], P = () => ["none", Et, nt, tt], ct = () => ["none", Et, nt, tt], je = () => [Et, nt, tt], Jn = () => [Cl, "full", ...L()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Qn],
      breakpoint: [Qn],
      color: [ry],
      container: [Qn],
      "drop-shadow": [Qn],
      ease: ["in", "out", "in-out"],
      font: [V1],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Qn],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Qn],
      shadow: [Qn],
      spacing: ["px", Et],
      text: [Qn],
      "text-shadow": [Qn],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Cl, tt, nt, M]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", nt, tt]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [G1],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Et, "auto", tt, nt, g]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": Y()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": Y()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: J()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Q()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Q()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Q()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: q()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": q()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": q()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: it()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": it()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": it()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": it(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: it()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": it(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: it()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": it()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": it()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: it()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: it()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: it()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: it()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [On, "auto", nt, tt]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Cl, "full", "auto", g, ...L()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Et, Cl, "auto", "initial", "none", tt]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Et, nt, tt]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Et, nt, tt]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [On, "first", "last", "none", nt, tt]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": Ot()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ht()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": ot()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": ot()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": Ot()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ht()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": ot()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": ot()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": Ht()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": Ht()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: L()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": L()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": L()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Lt(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...bt(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...bt()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Lt()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...bt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...bt(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Lt()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...bt(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...bt()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: L()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: L()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: L()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: L()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: L()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: L()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: L()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: L()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: L()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: L()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: L()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: Z()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: Z()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: Z()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: Z()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: Z()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: Z()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: Z()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: Z()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: Z()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: Z()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: Z()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": L()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": L()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: $()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/inline-size
       */
      "inline-size": [{
        inline: ["auto", ...at()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-inline-size
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...at()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-inline-size
       */
      "max-inline-size": [{
        "max-inline": ["none", ...at()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/block-size
       */
      "block-size": [{
        block: ["auto", ...ft()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-block-size
       */
      "min-block-size": [{
        "min-block": ["auto", ...ft()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-block-size
       */
      "max-block-size": [{
        "max-block": ["none", ...ft()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [g, "screen", ...$()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          g,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...$()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          g,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [h]
          },
          ...$()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...$()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...$()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", "none", ...$()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", c, Wu, Fl]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, J1, q1]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Qs, tt]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Z1, X1, o]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [tt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [f, nt, tt]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Et, "none", nt, Ag]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          d,
          ...L()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", nt, tt]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", nt, tt]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: j()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: j()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...et(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Et, "from-font", "auto", nt, Fl]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: j()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Et, "auto", nt, tt]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: L()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [On, nt, tt]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", nt, tt]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", nt, tt]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: dt()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: Zt()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ee()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, On, nt, tt],
          radial: ["", nt, tt],
          conic: ["", On, nt, tt]
        }, k1, Q1]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: j()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: x()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: x()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: x()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: j()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: j()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: j()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: V()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": V()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": V()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": V()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": V()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": V()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": V()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": V()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": V()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": V()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": V()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": V()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": V()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": V()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": V()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: F()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": F()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": F()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": F()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": F()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": F()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": F()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": F()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": F()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": F()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": F()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": F()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": F()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...et(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...et(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: j()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": j()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": j()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": j()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": j()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": j()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": j()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": j()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": j()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": j()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": j()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: j()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...et(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Et, nt, tt]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Et, Wu, Fl]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: j()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          // Deprecated since Tailwind CSS v4.0.0
          "inner",
          "none",
          _,
          Bo,
          Ho
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: j()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", v, Bo, Ho]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": j()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: F()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: j()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Et, Fl]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": j()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": F()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": j()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", T, Bo, Ho]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": j()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Et, nt, tt]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...pt(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": pt()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Et]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": ut()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": ut()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": j()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": ut()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": ut()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": j()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": ut()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": ut()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": j()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": ut()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": ut()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": j()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": ut()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": ut()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": j()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": ut()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": ut()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": j()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": ut()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": ut()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": j()
      }],
      "mask-image-radial": [{
        "mask-radial": [nt, tt]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": ut()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": ut()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": j()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": k()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Et]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": ut()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": ut()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": j()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: dt()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: Zt()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ee()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", nt, tt]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          nt,
          tt
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: vt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Et, nt, tt]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Et, nt, tt]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          U,
          Bo,
          Ho
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": j()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Et, nt, tt]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Et, nt, tt]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Et, nt, tt]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Et, nt, tt]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Et, nt, tt]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          nt,
          tt
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": vt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Et, nt, tt]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Et, nt, tt]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Et, nt, tt]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Et, nt, tt]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Et, nt, tt]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Et, nt, tt]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Et, nt, tt]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Et, nt, tt]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": L()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": L()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": L()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", nt, tt]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Et, "initial", nt, tt]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", K, nt, tt]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Et, nt, tt]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", X, nt, tt]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [w, nt, tt]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": J()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: P()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": P()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": P()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": P()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ct()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ct()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ct()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ct()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: je()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": je()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": je()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [nt, tt, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: J()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: Jn()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": Jn()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": Jn()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": Jn()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [On, nt, tt]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: j()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: j()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", nt, tt]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": j()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": j()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": L()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": L()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": L()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": L()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": L()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": L()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": L()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": L()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": L()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": L()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": L()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": L()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": L()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": L()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": L()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": L()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": L()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": L()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": L()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": L()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": L()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": L()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", nt, tt]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...j()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Et, Wu, Fl, Ag]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...j()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["start", "end", "right", "left"],
      "inset-y": ["inset-bs", "inset-be", "top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["ps", "pe", "pr", "pl"],
      py: ["pbs", "pbe", "pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["ms", "me", "mr", "ml"],
      my: ["mbs", "mbe", "mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-s", "border-w-e", "border-w-r", "border-w-l"],
      "border-w-y": ["border-w-bs", "border-w-be", "border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-s", "border-color-e", "border-color-r", "border-color-l"],
      "border-color-y": ["border-color-bs", "border-color-be", "border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-ms", "scroll-me", "scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-ps", "scroll-pe", "scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, $1 = /* @__PURE__ */ z1(F1);
function Oe(...i) {
  return $1(ey(i));
}
var gy = Pg(), P1 = Object.defineProperty, Ef = (i, o) => P1(i, "name", { value: o, configurable: !0 });
function nf(i, o) {
  if (typeof i == "function")
    return i(o);
  i != null && (i.current = o);
}
Ef(nf, "setRef");
function yy(...i) {
  return (o) => {
    let c = !1;
    const r = i.map((f) => {
      const d = nf(f, o);
      return !c && typeof d == "function" && (c = !0), d;
    });
    if (c)
      return () => {
        for (let f = 0; f < r.length; f++) {
          const d = r[f];
          typeof d == "function" ? d() : nf(i[f], null);
        }
      };
  };
}
Ef(yy, "composeRefs");
function ue(...i) {
  return b.useCallback(yy(...i), i);
}
Ef(ue, "useComposedRefs");
var W1 = Object.defineProperty, ke = (i, o) => W1(i, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function _l(i) {
  const o = b.forwardRef((c, r) => {
    let { children: f, ...d } = c, h = null, g = !1;
    const C = [];
    f = Cy(f), b.Children.forEach(f, (T) => {
      if (Ty(T)) {
        g = !0;
        const U = T;
        let G = "child" in U.props ? U.props.child : U.props.children;
        for (; Tf(G) && typeof Io == "function"; )
          G = Io(G._payload);
        h = eE(U, G), C.push(h?.props?.children);
      } else
        C.push(T);
    }), h ? h = b.cloneElement(h, void 0, C) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !g && b.Children.count(f) === 1 && b.isValidElement(f) && (h = f)
    );
    const E = h ? Ey(h) : void 0, _ = ue(r, E);
    if (!h) {
      if (f || f === 0)
        throw new Error(
          g ? aE(i) : lE(i)
        );
      return f;
    }
    const v = Sy(d, h.props ?? {});
    return h.type !== b.Fragment && (v.ref = r ? _ : E), b.cloneElement(h, v);
  });
  return o.displayName = `${i}.Slot`, o;
}
ke(_l, "createSlot");
var by = /* @__PURE__ */ _l("Slot"), py = /* @__PURE__ */ Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function tE(i) {
  const o = /* @__PURE__ */ ke((c) => "child" in c ? c.children(c.child) : c.children, "Slottable");
  return o.displayName = `${i}.Slottable`, o.__radixId = py, o;
}
ke(tE, "createSlottable");
var eE = /* @__PURE__ */ ke((i, o) => "child" in i.props ? b.isValidElement(o) ? b.cloneElement(o, void 0, i.props.children(o.props.children)) : null : b.isValidElement(o) ? o : null, "getSlottableElementFromSlottable");
function Sy(i, o) {
  const c = { ...o };
  for (const r in o) {
    const f = i[r], d = o[r];
    /^on[A-Z]/.test(r) ? f && d ? c[r] = (...g) => {
      const C = d(...g);
      return f(...g), C;
    } : f && (c[r] = f) : r === "style" ? c[r] = { ...f, ...d } : r === "className" ? c[r] = [f, d].filter(Boolean).join(" ") : r === "aria-describedby" && (c[r] = _y(d, f));
  }
  return { ...i, ...c };
}
ke(Sy, "mergeProps");
function Ey(i) {
  let o = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, c = o && "isReactWarning" in o && o.isReactWarning;
  return c ? i.ref : (o = Object.getOwnPropertyDescriptor(i, "ref")?.get, c = o && "isReactWarning" in o && o.isReactWarning, c ? i.props.ref : i.props.ref || i.ref);
}
ke(Ey, "getElementRef");
function Ty(i) {
  return b.isValidElement(i) && typeof i.type == "function" && "__radixId" in i.type && i.type.__radixId === py;
}
ke(Ty, "isSlottable");
var nE = /* @__PURE__ */ Symbol.for("react.lazy");
function Tf(i) {
  return i != null && typeof i == "object" && "$$typeof" in i && i.$$typeof === nE && "_payload" in i && xy(i._payload);
}
ke(Tf, "isLazyComponent");
function xy(i) {
  return typeof i == "object" && i !== null && "then" in i;
}
ke(xy, "isPromiseLike");
function Cy(i) {
  let o = i;
  for (; Tf(o) && typeof Io == "function"; )
    o = Io(o._payload);
  return o;
}
ke(Cy, "useUnwrappedLazy");
function _y(...i) {
  const o = /* @__PURE__ */ new Set();
  for (const c of i)
    if (typeof c == "string")
      for (const r of String(c).trim().split(/\s+/))
        r && o.add(r);
  return o.size > 0 ? Array.from(o).join(" ") : void 0;
}
ke(_y, "concatAriaDescribedby");
var lE = /* @__PURE__ */ ke((i) => `${i} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), aE = /* @__PURE__ */ ke((i) => `${i} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), Io = Pl[" use ".trim().toString()], uE = Object.defineProperty, iE = (i, o) => uE(i, "name", { value: o, configurable: !0 }), oE = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ie = oE.reduce((i, o) => {
  const c = /* @__PURE__ */ _l(`Primitive.${o}`), r = b.forwardRef((f, d) => {
    const { asChild: h, ...g } = f, C = h ? c : o;
    return typeof window < "u" && (window[/* @__PURE__ */ Symbol.for("radix-ui")] = !0), /* @__PURE__ */ S.jsx(C, { ...g, ref: d });
  });
  return r.displayName = `Primitive.${o}`, { ...i, [o]: r };
}, {});
function Oy(i, o) {
  i && gy.flushSync(() => i.dispatchEvent(o));
}
iE(Oy, "dispatchDiscreteCustomEvent");
var rE = Object.defineProperty, ln = (i, o) => rE(i, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function cE(i, o) {
  const c = b.createContext(o);
  c.displayName = i + "Context";
  const r = /* @__PURE__ */ ln((d) => {
    const { children: h, ...g } = d, C = b.useMemo(() => g, Object.values(g));
    return /* @__PURE__ */ S.jsx(c.Provider, { value: C, children: h });
  }, "Provider");
  r.displayName = i + "Provider";
  function f(d, h = {}) {
    const { optional: g = !1 } = h, C = b.useContext(c);
    if (C) return C;
    if (o !== void 0) return o;
    if (!g)
      throw new Error(`\`${d}\` must be used within \`${i}\``);
  }
  return ln(f, "useContext"), [r, f];
}
ln(cE, "createContext");
// @__NO_SIDE_EFFECTS__
function ta(i, o = []) {
  let c = [];
  function r(d, h) {
    const g = b.createContext(h);
    g.displayName = d + "Context";
    const C = c.length;
    c = [...c, h];
    const E = /* @__PURE__ */ ln((v) => {
      const { scope: T, children: U, ...G } = v, w = T?.[i]?.[C] || g, M = b.useMemo(() => G, Object.values(G));
      return /* @__PURE__ */ S.jsx(w.Provider, { value: M, children: U });
    }, "Provider");
    E.displayName = d + "Provider";
    function _(v, T, U = {}) {
      const { optional: G = !1 } = U, w = T?.[i]?.[C] || g, M = b.useContext(w);
      if (M) return M;
      if (h !== void 0) return h;
      if (!G)
        throw new Error(`\`${v}\` must be used within \`${d}\``);
    }
    return ln(_, "useContext"), [E, _];
  }
  ln(r, "createContext");
  const f = /* @__PURE__ */ ln(() => {
    const d = c.map((h) => b.createContext(h));
    return /* @__PURE__ */ ln(function(g) {
      const C = g?.[i] || d;
      return b.useMemo(
        () => ({ [`__scope${i}`]: { ...g, [i]: C } }),
        [g, C]
      );
    }, "useScope");
  }, "createScope");
  return f.scopeName = i, [r, Ay(f, ...o)];
}
ln(ta, "createContextScope");
function Ay(...i) {
  const o = i[0];
  if (i.length === 1) return o;
  const c = /* @__PURE__ */ ln(() => {
    const r = i.map((f) => ({
      useScope: f(),
      scopeName: f.scopeName
    }));
    return /* @__PURE__ */ ln(function(d) {
      const h = r.reduce((g, { useScope: C, scopeName: E }) => {
        const v = C(d)[`__scope${E}`];
        return { ...g, ...v };
      }, {});
      return b.useMemo(() => ({ [`__scope${o.scopeName}`]: h }), [h]);
    }, "useComposedScopes");
  }, "createScope");
  return c.scopeName = o.scopeName, c;
}
ln(Ay, "composeContextScopes");
var an = globalThis?.document ? b.useLayoutEffect : () => {
}, sE = Object.defineProperty, ae = (i, o) => sE(i, "name", { value: o, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function xf(i) {
  const o = i + "CollectionProvider", [c, r] = /* @__PURE__ */ ta(o), [f, d] = c(
    o,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), h = /* @__PURE__ */ ae((w) => {
    const { scope: M, children: K } = w, X = b.useRef(null), Y = b.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ S.jsx(f, { scope: M, itemMap: Y, collectionRef: X, children: K });
  }, "CollectionProvider");
  h.displayName = o;
  const g = i + "CollectionSlot", C = /* @__PURE__ */ _l(g), E = b.forwardRef(
    (w, M) => {
      const { scope: K, children: X } = w, Y = d(g, K), k = ue(M, Y.collectionRef);
      return /* @__PURE__ */ S.jsx(C, { ref: k, children: X });
    }
  );
  E.displayName = g;
  const _ = i + "CollectionItemSlot", v = "data-radix-collection-item", T = /* @__PURE__ */ _l(_), U = b.forwardRef(
    (w, M) => {
      const { scope: K, children: X, ...Y } = w, k = b.useRef(null), J = ue(M, k), Q = d(_, K);
      return b.useEffect(() => (Q.itemMap.set(k, { ref: k, ...Y }), () => {
        Q.itemMap.delete(k);
      })), /* @__PURE__ */ S.jsx(T, { [v]: "", ref: J, children: X });
    }
  );
  U.displayName = _;
  function G(w) {
    const M = d(i + "CollectionConsumer", w);
    return b.useCallback(() => {
      const X = M.collectionRef.current;
      if (!X) return [];
      const Y = Array.from(X.querySelectorAll(`[${v}]`));
      return Array.from(M.itemMap.values()).sort(
        (Q, q) => Y.indexOf(Q.ref.current) - Y.indexOf(q.ref.current)
      );
    }, [M.collectionRef, M.itemMap]);
  }
  return ae(G, "useCollection"), [
    { Provider: h, Slot: E, ItemSlot: U },
    G,
    r
  ];
}
ae(xf, "createCollection");
var Ng = /* @__PURE__ */ new WeakMap(), It, Ke, Lo = (Ke = class extends Map {
  constructor(c) {
    super(c);
    fg(this, It);
    Bs(this, It, [...super.keys()]), Ng.set(this, !0);
  }
  set(c, r) {
    return Ng.get(this) && !this.has(c) && pe(this, It).push(c), super.set(c, r), this;
  }
  /**
   * Sets a key-value pair so that it ends up at the given index.
   * - Existing keys are moved
   * - Negative indices count from the end of the resulting dictionary, so
   *   inserting at -1 makes the item the last one, -2 the second to last, etc.
   * - Out-of-range indices are clamped
   */
  insert(c, r, f) {
    const d = this.has(r), h = d ? this.size : this.size + 1, g = Cf(c), C = g >= 0 ? Math.min(g, h - 1) : Math.max(h + g, 0);
    if (d ? pe(this, It).indexOf(r) === C : C === this.size)
      return this.set(r, f), this;
    const E = pe(this, It).filter((v) => v !== r);
    E.splice(C, 0, r);
    const _ = E.map((v) => [
      v,
      v === r ? f : this.get(v)
    ]);
    this.clear();
    for (const [v, T] of _)
      this.set(v, T);
    return this;
  }
  with(c, r, f) {
    const d = new Ke(this);
    return d.insert(c, r, f), d;
  }
  before(c) {
    const r = pe(this, It).indexOf(c) - 1;
    if (!(r < 0))
      return this.entryAt(r);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(c, r, f) {
    const d = pe(this, It).indexOf(c);
    if (d === -1)
      return this;
    const h = pe(this, It).indexOf(r), g = h !== -1 && h < d ? d - 1 : d;
    return this.insert(g, r, f);
  }
  after(c) {
    let r = pe(this, It).indexOf(c);
    if (r = r === -1 || r === this.size - 1 ? -1 : r + 1, r !== -1)
      return this.entryAt(r);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(c, r, f) {
    const d = pe(this, It).indexOf(c);
    if (d === -1)
      return this;
    const h = pe(this, It).indexOf(r), g = h !== -1 && h <= d ? d : d + 1;
    return this.insert(g, r, f);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return Bs(this, It, []), super.clear();
  }
  delete(c) {
    const r = super.delete(c);
    return r && pe(this, It).splice(pe(this, It).indexOf(c), 1), r;
  }
  deleteAt(c) {
    const r = this.keyAt(c);
    return r !== void 0 ? this.delete(r) : !1;
  }
  at(c) {
    const r = Qo(pe(this, It), c);
    if (r !== void 0)
      return this.get(r);
  }
  entryAt(c) {
    const r = Qo(pe(this, It), c);
    if (r !== void 0)
      return [r, this.get(r)];
  }
  indexOf(c) {
    return pe(this, It).indexOf(c);
  }
  keyAt(c) {
    return Qo(pe(this, It), c);
  }
  from(c, r) {
    const f = this.indexOf(c);
    if (f === -1)
      return;
    let d = f + r;
    return d < 0 && (d = 0), d >= this.size && (d = this.size - 1), this.at(d);
  }
  keyFrom(c, r) {
    const f = this.indexOf(c);
    if (f === -1)
      return;
    let d = f + r;
    return d < 0 && (d = 0), d >= this.size && (d = this.size - 1), this.keyAt(d);
  }
  find(c, r) {
    let f = 0;
    for (const d of this) {
      if (Reflect.apply(c, r, [d, f, this]))
        return d;
      f++;
    }
  }
  findIndex(c, r) {
    let f = 0;
    for (const d of this) {
      if (Reflect.apply(c, r, [d, f, this]))
        return f;
      f++;
    }
    return -1;
  }
  filter(c, r) {
    const f = [];
    let d = 0;
    for (const h of this)
      Reflect.apply(c, r, [h, d, this]) && f.push(h), d++;
    return new Ke(f);
  }
  map(c, r) {
    const f = [];
    let d = 0;
    for (const h of this)
      f.push([h[0], Reflect.apply(c, r, [h, d, this])]), d++;
    return new Ke(f);
  }
  reduce(...c) {
    const [r, f] = c, d = c.length > 1;
    if (!d && this.size === 0)
      throw new TypeError("Reduce of empty OrderedDict with no initial value");
    let h = 0, g = f;
    for (const C of this)
      h === 0 && !d ? g = C : g = Reflect.apply(r, this, [g, C, h, this]), h++;
    return g;
  }
  reduceRight(...c) {
    const [r, f] = c, d = c.length > 1;
    if (!d && this.size === 0)
      throw new TypeError("Reduce of empty OrderedDict with no initial value");
    let h = f;
    for (let g = this.size - 1; g >= 0; g--) {
      const C = this.entryAt(g);
      g === this.size - 1 && !d ? h = C : h = Reflect.apply(r, this, [h, C, g, this]);
    }
    return h;
  }
  /**
   * Sorts the dictionary in place. This method mutates the dictionary and
   * returns a reference to the same object
   *
   * @param compareFn Function used to determine the order of the elements. It
   * is expected to return a negative value if the first argument is less than
   * the second argument, zero if they're equal, and a positive value otherwise.
   */
  sort(c) {
    if (typeof c != "function")
      throw new TypeError("OrderedDict.sort requires a compare function");
    const r = [...this.entries()].sort(c);
    this.clear();
    for (const [f, d] of r)
      this.set(f, d);
    return this;
  }
  /**
   * Returns a copy of the dictionary with its elements sorted.
   *
   * @param compareFn Function used to determine the order of the elements. It
   * is expected to return a negative value if the first argument is less than
   * the second argument, zero if they're equal, and a positive value otherwise.
   */
  toSorted(c) {
    if (typeof c != "function")
      throw new TypeError("OrderedDict.toSorted requires a compare function");
    const r = [...this.entries()].sort(c);
    return new Ke(r);
  }
  toReversed() {
    const c = new Ke();
    for (let r = this.size - 1; r >= 0; r--) {
      const f = this.keyAt(r), d = this.get(f);
      c.set(f, d);
    }
    return c;
  }
  toSpliced(...c) {
    const r = [...this.entries()];
    return r.splice(...c), new Ke(r);
  }
  slice(c, r) {
    const f = new Ke();
    for (const d of pe(this, It).slice(c, r))
      f.set(d, this.get(d));
    return f;
  }
  every(c, r) {
    let f = 0;
    for (const d of this) {
      if (!Reflect.apply(c, r, [d, f, this]))
        return !1;
      f++;
    }
    return !0;
  }
  some(c, r) {
    let f = 0;
    for (const d of this) {
      if (Reflect.apply(c, r, [d, f, this]))
        return !0;
      f++;
    }
    return !1;
  }
}, It = new WeakMap(), ae(Ke, "OrderedDict"), Ke);
function Qo(i, o) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(i, o);
  const c = zy(i, o);
  return c === -1 ? void 0 : i[c];
}
ae(Qo, "at");
function zy(i, o) {
  const c = i.length, r = Cf(o), f = r >= 0 ? r : c + r;
  return f < 0 || f >= c ? -1 : f;
}
ae(zy, "toSafeIndex");
function Cf(i) {
  return i !== i || i === 0 ? 0 : Math.trunc(i);
}
ae(Cf, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function fE(i) {
  const o = i + "CollectionProvider", [c, r] = /* @__PURE__ */ ta(o), [f, d] = c(o);
  f.displayName = i + "CollectionStableContextProvider";
  const [h, g] = c(o);
  h.displayName = i + "CollectionStatefulContextProvider";
  const C = /* @__PURE__ */ ae(({ state: Q, ...q }) => Q ? /* @__PURE__ */ S.jsx(_, { ...q, state: Q }) : /* @__PURE__ */ S.jsx(E, { ...q }), "CollectionProvider");
  C.displayName = o;
  const E = /* @__PURE__ */ ae((Q) => {
    const q = X();
    return /* @__PURE__ */ S.jsx(_, { ...Q, state: q });
  }, "CollectionInit");
  E.displayName = i + "CollectionInit";
  const _ = /* @__PURE__ */ ae((Q) => {
    const { scope: q, children: L, state: it } = Q, Ot = b.useRef(null), [ht, ot] = b.useState(
      null
    ), Ht = ue(Ot, ot), [Lt, bt] = it, Z = b.useRef(
      new Lo()
    ), $ = b.useCallback(() => {
      const at = Z.current;
      return Dy(at) || at.sort(Zo), at;
    }, []);
    return b.useEffect(() => {
      if (!ht)
        return;
      const at = My(() => {
        bt((ft) => {
          const j = ft.toSorted(Zo);
          return j.some(([Zt], ee) => ft.keyAt(ee) !== Zt) ? j : ft;
        });
      });
      return at.observe(ht, {
        childList: !0,
        subtree: !0
      }), () => {
        at.disconnect();
      };
    }, [ht, bt]), /* @__PURE__ */ S.jsx(
      f,
      {
        scope: q,
        collectionElementRef: Ht,
        collectionElementRefObject: Ot,
        getCollection: $,
        setCollection: bt,
        registryRef: Z,
        children: /* @__PURE__ */ S.jsx(
          h,
          {
            scope: q,
            collectionElement: ht,
            collection: Lt,
            children: L
          }
        )
      }
    );
  }, "CollectionProviderImpl");
  _.displayName = i + "CollectionProviderImpl";
  const v = i + "CollectionSlot", T = /* @__PURE__ */ _l(v), U = b.forwardRef(
    (Q, q) => {
      const { scope: L, children: it } = Q, Ot = d(v, L), ht = ue(q, Ot.collectionElementRef);
      return /* @__PURE__ */ S.jsx(T, { ref: ht, children: it });
    }
  );
  U.displayName = v;
  const G = i + "CollectionItemSlot", w = "data-radix-collection-item", M = /* @__PURE__ */ _l(G), K = b.forwardRef(
    (Q, q) => {
      const { scope: L, children: it, ...Ot } = Q, ht = b.useRef(null), ot = d(G, L), { setCollection: Ht, registryRef: Lt } = ot, bt = b.useRef(Ot);
      Ry(bt.current, Ot) || (bt.current = Ot);
      const Z = bt.current, $ = b.useCallback(
        (j) => {
          const dt = Lt.current;
          j ? dt.set(j, {
            ...bt.current,
            element: j
          }) : ht.current && dt.delete(ht.current);
        },
        [Lt]
      ), at = ue(q, $, ht);
      an(() => {
        const j = ht.current, dt = Lt.current;
        j && dt.has(j) && dt.set(j, { ...Z, element: j });
      }, [Z, Lt]);
      const ft = b.useRef(null);
      return b.useEffect(() => {
        const j = ht.current, dt = ft.current;
        (dt?.element ?? null) === j && (!j || dt?.itemData === Z) || (ft.current = j ? { element: j, itemData: Z } : null, Ht((Zt) => {
          const ee = new Lo(Zt);
          return dt && dt.element !== j && ee.delete(dt.element), j && ee.set(j, { ...Z, element: j }), ee.sort(Zo);
        }));
      }), b.useEffect(() => () => {
        const j = ft.current;
        ft.current = null, j && Ht((dt) => {
          if (!dt.has(j.element))
            return dt;
          const Zt = new Lo(dt);
          return Zt.delete(j.element), Zt;
        });
      }, [Ht]), /* @__PURE__ */ S.jsx(M, { [w]: "", ref: at, children: it });
    }
  );
  K.displayName = G;
  function X() {
    return b.useState(new Lo());
  }
  ae(X, "useInitCollection");
  function Y(Q) {
    const { collection: q } = g(i + "CollectionConsumer", Q);
    return q;
  }
  ae(Y, "useCollection");
  function k(Q) {
    const { getCollection: q } = d(i + "CollectionConsumer", Q);
    return q;
  }
  return ae(k, "useGetCollection"), [
    { Provider: C, Slot: U, ItemSlot: K },
    {
      createCollectionScope: r,
      useCollection: Y,
      useGetCollection: k,
      useInitCollection: X
    }
  ];
}
ae(fE, "createCollection");
function Ry(i, o) {
  if (i === o) return !0;
  if (typeof i != "object" || typeof o != "object" || i == null || o == null) return !1;
  const c = Object.keys(i), r = Object.keys(o);
  if (c.length !== r.length) return !1;
  for (const f of c)
    if (!Object.prototype.hasOwnProperty.call(o, f) || i[f] !== o[f]) return !1;
  return !0;
}
ae(Ry, "shallowEqual");
function Ny(i, o) {
  return !!(o.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_PRECEDING);
}
ae(Ny, "isElementPreceding");
function Dy(i) {
  let o;
  for (const c of i.keys()) {
    if (o) {
      const r = o.compareDocumentPosition(c);
      if (!(r & Node.DOCUMENT_POSITION_DISCONNECTED) && r & Node.DOCUMENT_POSITION_PRECEDING)
        return !1;
    }
    o = c;
  }
  return !0;
}
ae(Dy, "isInDocumentOrder");
function Zo(i, o) {
  return !i[1].element || !o[1].element ? 0 : Ny(i[1].element, o[1].element) ? -1 : 1;
}
ae(Zo, "sortByDocumentPosition");
function My(i) {
  return new MutationObserver((c) => {
    for (const r of c)
      if (r.type === "childList") {
        i();
        return;
      }
  });
}
ae(My, "getChildListObserver");
var dE = Object.defineProperty, tu = (i, o) => dE(i, "name", { value: o, configurable: !0 }), wy = !!(typeof window < "u" && window.document && window.document.createElement);
function qt(i, o, { checkForDefaultPrevented: c = !0 } = {}) {
  return /* @__PURE__ */ tu(function(f) {
    if (i?.(f), c === !1 || !f || !f.defaultPrevented)
      return o?.(f);
  }, "handleEvent");
}
tu(qt, "composeEventHandlers");
function mE(i) {
  if (!wy)
    throw new Error("Cannot access window outside of the DOM");
  return i?.ownerDocument?.defaultView ?? window;
}
tu(mE, "getOwnerWindow");
function lf(i) {
  if (!wy)
    throw new Error("Cannot access document outside of the DOM");
  return i?.ownerDocument ?? document;
}
tu(lf, "getOwnerDocument");
function jy(i, o = !1) {
  const { activeElement: c } = lf(i);
  if (!c?.nodeName)
    return null;
  if (Uy(c) && c.contentDocument)
    return jy(c.contentDocument.body, o);
  if (o) {
    const r = c.getAttribute("aria-activedescendant");
    if (r) {
      const f = lf(c).getElementById(r);
      if (f)
        return f;
    }
  }
  return c;
}
tu(jy, "getActiveElement");
function Uy(i) {
  return i.tagName === "IFRAME";
}
tu(Uy, "isFrame");
var vE = Object.defineProperty, hE = (i, o) => vE(i, "name", { value: o, configurable: !0 }), Dg = Pl[" useEffectEvent ".trim().toString()], Mg = Pl[" useInsertionEffect ".trim().toString()];
function Hy(i) {
  if (typeof Dg == "function")
    return Dg(i);
  const o = b.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof Mg == "function" ? Mg(() => {
    o.current = i;
  }) : an(() => {
    o.current = i;
  }), b.useMemo(() => ((...c) => o.current?.(...c)), []);
}
hE(Hy, "useEffectEvent");
var gE = Object.defineProperty, ni = (i, o) => gE(i, "name", { value: o, configurable: !0 }), yE = Pl[" useInsertionEffect ".trim().toString()] || an;
function li({
  prop: i,
  defaultProp: o,
  onChange: c = /* @__PURE__ */ ni(() => {
  }, "onChange"),
  caller: r
}) {
  const [f, d, h] = By({
    defaultProp: o,
    onChange: c
  }), g = i !== void 0, C = g ? i : f, E = b.useCallback(
    (_) => {
      if (g) {
        const v = Ly(_) ? _(i) : _;
        v !== i && h.current?.(v);
      } else
        d(_);
    },
    [g, i, d, h]
  );
  return [C, E];
}
ni(li, "useControllableState");
function By({
  defaultProp: i,
  onChange: o
}) {
  const [c, r] = b.useState(i), f = b.useRef(c), d = b.useRef(o);
  return yE(() => {
    d.current = o;
  }, [o]), b.useEffect(() => {
    f.current !== c && (d.current?.(c), f.current = c);
  }, [c, f]), [c, r, d];
}
ni(By, "useUncontrolledState");
function Ly(i) {
  return typeof i == "function";
}
ni(Ly, "isFunction");
var wg = /* @__PURE__ */ Symbol("RADIX:SYNC_STATE");
function bE(i, o, c, r) {
  const { prop: f, defaultProp: d, onChange: h, caller: g } = o, C = f !== void 0, E = Hy(h), _ = [{ ...c, state: d }];
  r && _.push(r);
  const [v, T] = b.useReducer(
    (M, K) => {
      if (K.type === wg)
        return { ...M, state: K.state };
      const X = i(M, K);
      return C && !Object.is(X.state, M.state) && E(X.state), X;
    },
    ..._
  ), U = v.state, G = b.useRef(U);
  b.useEffect(() => {
    G.current !== U && (G.current = U, C || E(U));
  }, [U, G, C]);
  const w = b.useMemo(() => f !== void 0 ? { ...v, state: f } : v, [v, f]);
  return b.useEffect(() => {
    C && !Object.is(f, v.state) && T({ type: wg, state: f });
  }, [f, v.state, C]), [w, T];
}
ni(bE, "useControllableStateReducer");
var pE = Object.defineProperty, kn = (i, o) => pE(i, "name", { value: o, configurable: !0 });
function Vy(i, o) {
  return b.useReducer((c, r) => o[c][r] ?? c, i);
}
kn(Vy, "useStateMachine");
var $o = /* @__PURE__ */ kn((i) => {
  const { present: o, children: c } = i, r = Gy(o), f = typeof c == "function" ? c({ present: r.isPresent }) : b.Children.only(c), d = Yy(r.ref, qy(f));
  return typeof c == "function" || r.isPresent ? b.cloneElement(f, { ref: d }) : null;
}, "Presence");
function Gy(i) {
  const [o, c] = b.useState(), r = b.useRef(null), f = b.useRef(i), d = b.useRef("none"), h = b.useRef(void 0), g = i ? "mounted" : "unmounted", [C, E] = Vy(g, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return b.useEffect(() => {
    C === "mounted" ? (d.current = h.current ?? $a(r.current), h.current = void 0) : d.current = "none";
  }, [C]), an(() => {
    const _ = r.current, v = f.current;
    if (v !== i) {
      const U = d.current, G = $a(_);
      i ? (h.current = G, E("MOUNT")) : G === "none" || _?.display === "none" ? E("UNMOUNT") : E(v && U !== G ? "ANIMATION_OUT" : "UNMOUNT"), f.current = i;
    }
  }, [i, E]), an(() => {
    if (o) {
      let _;
      const v = o.ownerDocument.defaultView ?? window, T = /* @__PURE__ */ kn((G) => {
        const M = $a(r.current).includes(CSS.escape(G.animationName));
        if (G.target === o && M && (E("ANIMATION_END"), !f.current)) {
          const K = o.style.animationFillMode;
          o.style.animationFillMode = "forwards", _ = v.setTimeout(() => {
            o.style.animationFillMode === "forwards" && (o.style.animationFillMode = K);
          });
        }
      }, "handleAnimationEnd"), U = /* @__PURE__ */ kn((G) => {
        G.target === o && (d.current = $a(r.current));
      }, "handleAnimationStart");
      return o.addEventListener("animationstart", U), o.addEventListener("animationcancel", T), o.addEventListener("animationend", T), () => {
        v.clearTimeout(_), o.removeEventListener("animationstart", U), o.removeEventListener("animationcancel", T), o.removeEventListener("animationend", T);
      };
    } else
      E("ANIMATION_END");
  }, [o, E]), {
    isPresent: ["mounted", "unmountSuspended"].includes(C),
    ref: b.useCallback((_) => {
      if (_) {
        const v = getComputedStyle(_);
        r.current = v, h.current = $a(v);
      } else
        r.current = null;
      c(_);
    }, [])
  };
}
kn(Gy, "usePresence");
function af(i, o) {
  if (typeof i == "function")
    return i(o);
  i != null && (i.current = o);
}
kn(af, "setRef");
function Yy(...i) {
  const o = b.useRef(i);
  return o.current = i, b.useCallback((c) => {
    const r = o.current;
    let f = !1;
    const d = r.map((h) => {
      const g = af(h, c);
      return !f && typeof g == "function" && (f = !0), g;
    });
    if (f)
      return () => {
        for (let h = 0; h < d.length; h++) {
          const g = d[h];
          typeof g == "function" ? g() : af(r[h], null);
        }
      };
  }, []);
}
kn(Yy, "useStableComposedRefs");
function $a(i) {
  return i?.animationName || "none";
}
kn($a, "getAnimationName");
function qy(i) {
  let o = Object.getOwnPropertyDescriptor(i.props, "ref")?.get, c = o && "isReactWarning" in o && o.isReactWarning;
  return c ? i.ref : (o = Object.getOwnPropertyDescriptor(i, "ref")?.get, c = o && "isReactWarning" in o && o.isReactWarning, c ? i.props.ref : i.props.ref || i.ref);
}
kn(qy, "getElementRef");
var SE = Object.defineProperty, EE = (i, o) => SE(i, "name", { value: o, configurable: !0 }), TE = Pl[" useId ".trim().toString()] || (() => {
}), xE = 0;
function Pa(i) {
  const [o, c] = b.useState(TE());
  return an(() => {
    i || c((r) => r ?? String(xE++));
  }, [i]), i || (o ? `radix-${o}` : "");
}
EE(Pa, "useId");
var CE = Object.defineProperty, _E = (i, o) => CE(i, "name", { value: o, configurable: !0 }), OE = {
  LTR: "ltr"
}, AE = b.createContext(void 0);
function Po(i) {
  const o = b.useContext(AE);
  return i || o || OE.LTR;
}
_E(Po, "useDirection");
var zE = Object.defineProperty, RE = (i, o) => zE(i, "name", { value: o, configurable: !0 }), jg = Pl[" useInsertionEffect ".trim().toString()];
function $l(i) {
  const o = b.useRef(i);
  return typeof jg == "function" ? jg(() => {
    o.current = i;
  }) : an(() => {
    o.current = i;
  }), b.useMemo(() => ((...c) => o.current?.(...c)), []);
}
RE($l, "useCallbackRef");
var NE = Object.defineProperty, fe = (i, o) => NE(i, "name", { value: o, configurable: !0 }), uf = "dismissableLayer.update", DE = "dismissableLayer.pointerDownOutside", ME = "dismissableLayer.focusOutside", Ug, Xy = b.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), wE = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ fe(function(o, c) {
    const {
      disableOutsidePointerEvents: r = !1,
      deferPointerDownOutside: f = !1,
      onEscapeKeyDown: d,
      onPointerDownOutside: h,
      onFocusOutside: g,
      onInteractOutside: C,
      onDismiss: E,
      ..._
    } = o, v = b.useContext(Xy), [T, U] = b.useState(null), G = T?.ownerDocument ?? globalThis?.document, [, w] = b.useState({}), M = ue(c, U), K = Array.from(v.layers), [X] = [
      ...v.layersWithOutsidePointerEventsDisabled
    ].slice(-1), Y = X ? K.indexOf(X) : -1, k = T ? K.indexOf(T) : -1, J = v.layersWithOutsidePointerEventsDisabled.size > 0, Q = k >= Y, q = b.useRef(!1), L = Zy(
      (ot) => {
        h?.(ot), C?.(ot), ot.defaultPrevented || E?.();
      },
      {
        ownerDocument: G,
        deferPointerDownOutside: f,
        isDeferredPointerDownOutsideRef: q,
        dismissableSurfaces: v.dismissableSurfaces,
        shouldHandlePointerDownOutside: b.useCallback(
          (ot) => {
            if (!(ot instanceof Node))
              return !1;
            const Ht = [...v.branches].some(
              (Lt) => Lt.contains(ot)
            );
            return Q && !Ht;
          },
          [v.branches, Q]
        )
      }
    ), it = Ky((ot) => {
      if (f && q.current)
        return;
      const Ht = ot.target;
      [...v.branches].some((bt) => bt.contains(Ht)) || (g?.(ot), C?.(ot), ot.defaultPrevented || E?.());
    }, G), Ot = T ? k === K.length - 1 : !1, ht = $l((ot) => {
      ot.key === "Escape" && (d?.(ot), !ot.defaultPrevented && E && (ot.preventDefault(), E()));
    });
    return b.useEffect(() => {
      if (Ot)
        return G.addEventListener("keydown", ht, { capture: !0 }), () => G.removeEventListener("keydown", ht, { capture: !0 });
    }, [G, Ot, ht]), b.useEffect(() => {
      if (T)
        return r && (v.layersWithOutsidePointerEventsDisabled.size === 0 && (Ug = G.body.style.pointerEvents, G.body.style.pointerEvents = "none"), v.layersWithOutsidePointerEventsDisabled.add(T)), v.layers.add(T), of(), () => {
          r && (v.layersWithOutsidePointerEventsDisabled.delete(T), v.layersWithOutsidePointerEventsDisabled.size === 0 && (G.body.style.pointerEvents = Ug));
        };
    }, [T, G, r, v]), b.useEffect(() => () => {
      T && (v.layers.delete(T), v.layersWithOutsidePointerEventsDisabled.delete(T), of());
    }, [T, v]), b.useEffect(() => {
      const ot = /* @__PURE__ */ fe(() => w({}), "handleUpdate");
      return document.addEventListener(uf, ot), () => document.removeEventListener(uf, ot);
    }, []), /* @__PURE__ */ S.jsx(
      ie.div,
      {
        ..._,
        ref: M,
        style: {
          pointerEvents: J ? Q ? "auto" : "none" : void 0,
          ...o.style
        },
        onFocusCapture: qt(o.onFocusCapture, it.onFocusCapture),
        onBlurCapture: qt(o.onBlurCapture, it.onBlurCapture),
        onPointerDownCapture: qt(
          o.onPointerDownCapture,
          L.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
);
function Qy() {
  const i = b.useContext(Xy), [o, c] = b.useState(null);
  return b.useEffect(() => {
    if (o)
      return i.dismissableSurfaces.add(o), () => {
        i.dismissableSurfaces.delete(o);
      };
  }, [o, i.dismissableSurfaces]), c;
}
fe(Qy, "useDismissableLayerSurface");
var jE = /* @__PURE__ */ fe(() => !0, "IS_TRUE");
function Zy(i, o) {
  const {
    ownerDocument: c = globalThis?.document,
    deferPointerDownOutside: r = !1,
    isDeferredPointerDownOutsideRef: f,
    dismissableSurfaces: d,
    shouldHandlePointerDownOutside: h = jE
  } = o, g = $l(i), C = b.useRef(!1), E = b.useRef(!1), _ = b.useRef(/* @__PURE__ */ new Map()), v = b.useRef(() => {
  });
  return b.useEffect(() => {
    function T() {
      E.current = !1, f.current = !1, _.current.clear();
    }
    fe(T, "resetOutsideInteraction");
    function U() {
      return Array.from(_.current.values()).some(Boolean);
    }
    fe(U, "isOutsideInteractionIntercepted");
    function G(Y) {
      if (!E.current)
        return;
      const k = Y.target;
      k instanceof Node && [...d].some((Q) => Q.contains(k)) || _.current.set(Y.type, !0), Y.type === "click" && window.setTimeout(() => {
        E.current && v.current();
      }, 0);
    }
    fe(G, "handleInteractionCapture");
    function w(Y) {
      E.current && _.current.set(Y.type, !1);
    }
    fe(w, "handleInteractionBubble");
    const M = /* @__PURE__ */ fe((Y) => {
      if (Y.target && !C.current) {
        let k = function() {
          c.removeEventListener("click", v.current);
          const Q = U();
          T(), Q || _f(
            DE,
            g,
            J,
            { discrete: !0 }
          );
        };
        if (fe(k, "handleAndDispatchPointerDownOutsideEvent"), !h(Y.target)) {
          c.removeEventListener("click", v.current), T(), C.current = !1;
          return;
        }
        const J = { originalEvent: Y };
        E.current = !0, f.current = r && Y.button === 0, _.current.clear(), !r || Y.button !== 0 ? k() : (c.removeEventListener("click", v.current), v.current = k, c.addEventListener("click", v.current, { once: !0 }));
      } else
        c.removeEventListener("click", v.current), T();
      C.current = !1;
    }, "handlePointerDown"), K = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const Y of K)
      c.addEventListener(Y, G, !0), c.addEventListener(Y, w);
    const X = window.setTimeout(() => {
      c.addEventListener("pointerdown", M);
    }, 0);
    return () => {
      window.clearTimeout(X), c.removeEventListener("pointerdown", M), c.removeEventListener("click", v.current);
      for (const Y of K)
        c.removeEventListener(Y, G, !0), c.removeEventListener(Y, w);
    };
  }, [
    c,
    g,
    r,
    f,
    d,
    h
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ fe(() => C.current = !0, "onPointerDownCapture")
  };
}
fe(Zy, "usePointerDownOutside");
function Ky(i, o = globalThis?.document) {
  const c = $l(i), r = b.useRef(!1);
  return b.useEffect(() => {
    const f = /* @__PURE__ */ fe((d) => {
      d.target && !r.current && _f(ME, c, { originalEvent: d }, {
        discrete: !1
      });
    }, "handleFocus");
    return o.addEventListener("focusin", f), () => o.removeEventListener("focusin", f);
  }, [o, c]), {
    onFocusCapture: /* @__PURE__ */ fe(() => r.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ fe(() => r.current = !1, "onBlurCapture")
  };
}
fe(Ky, "useFocusOutside");
function of() {
  const i = new CustomEvent(uf);
  document.dispatchEvent(i);
}
fe(of, "dispatchUpdate");
function _f(i, o, c, { discrete: r }) {
  const f = c.originalEvent.target, d = new CustomEvent(i, { bubbles: !1, cancelable: !0, detail: c });
  o && f.addEventListener(i, o, { once: !0 }), r ? Oy(f, d) : f.dispatchEvent(d);
}
fe(_f, "handleAndDispatchCustomEvent");
var UE = Object.defineProperty, te = (i, o) => UE(i, "name", { value: o, configurable: !0 }), Zs = "focusScope.autoFocusOnMount", Ks = "focusScope.autoFocusOnUnmount", Hg = { bubbles: !1, cancelable: !0 }, HE = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ te(function(o, c) {
    const {
      loop: r = !1,
      trapped: f = !1,
      branches: d,
      onMountAutoFocus: h,
      onUnmountAutoFocus: g,
      ...C
    } = o, [E, _] = b.useState(null), v = $l(h), T = $l(g), U = b.useRef(null), G = ue(c, _), w = b.useRef(d);
    b.useEffect(() => {
      w.current = d;
    });
    const M = b.useCallback(
      (Y) => Y ? E?.contains(Y) ? !0 : !!w.current?.some((k) => k.contains(Y)) : !1,
      [E]
    ), K = b.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    b.useEffect(() => {
      if (f) {
        let Y = function(q) {
          if (K.paused || !E) return;
          const L = q.target;
          M(L) ? U.current = L : Zn(U.current, { select: !0 });
        }, k = function(q) {
          if (K.paused || !E) return;
          const L = q.relatedTarget;
          L !== null && (M(L) || Zn(U.current, { select: !0 }));
        }, J = function(q) {
          if (document.activeElement === document.body)
            for (const it of q)
              it.removedNodes.length > 0 && Zn(E);
        };
        te(Y, "handleFocusIn"), te(k, "handleFocusOut"), te(J, "handleMutations"), document.addEventListener("focusin", Y), document.addEventListener("focusout", k);
        const Q = new MutationObserver(J);
        return E && Q.observe(E, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", Y), document.removeEventListener("focusout", k), Q.disconnect();
        };
      }
    }, [f, E, K.paused, M]), b.useEffect(() => {
      if (E) {
        Bg.add(K);
        const Y = document.activeElement;
        if (!E.contains(Y)) {
          const J = new CustomEvent(Zs, Hg);
          E.addEventListener(Zs, v), E.dispatchEvent(J), J.defaultPrevented || (Fy(e0(Of(E)), { select: !0 }), document.activeElement === Y && Zn(E));
        }
        return () => {
          E.removeEventListener(Zs, v);
          const J = E.ownerDocument, Q = CustomEvent;
          setTimeout(() => {
            const q = new Q(Ks, Hg);
            E.addEventListener(Ks, T), E.dispatchEvent(q), q.defaultPrevented || Zn(Y ?? J.body, { select: !0 }), E.removeEventListener(Ks, T), Bg.remove(K);
          }, 0);
        };
      }
    }, [E, v, T, K]);
    const X = b.useCallback(
      (Y) => {
        if (!r && !f || K.paused) return;
        const k = Y.key === "Tab" && !Y.altKey && !Y.ctrlKey && !Y.metaKey, J = document.activeElement;
        if (k && J) {
          const Q = Y.currentTarget, [q, L] = $y(Q);
          q && L ? !Y.shiftKey && J === L ? (Y.preventDefault(), r && Zn(q, { select: !0 })) : Y.shiftKey && J === q && (Y.preventDefault(), r && Zn(L, { select: !0 })) : J === Q && Y.preventDefault();
        }
      },
      [r, f, K.paused]
    );
    return /* @__PURE__ */ S.jsx(ie.div, { tabIndex: -1, ...C, ref: G, onKeyDown: X });
  }, "FocusScope")
), ky = b.createContext(null);
function Jy({ registry: i, children: o }) {
  return i ? /* @__PURE__ */ S.jsx(ky.Provider, { value: i, children: o }) : o;
}
te(Jy, "FocusScopeBranchProvider");
function Iy() {
  const [i, o] = b.useState([]), c = b.useMemo(
    () => ({
      add: /* @__PURE__ */ te((r) => o((f) => f.includes(r) ? f : [...f, r]), "add"),
      remove: /* @__PURE__ */ te((r) => o((f) => f.filter((d) => d !== r)), "remove")
    }),
    []
  );
  return { nodes: i, registry: c };
}
te(Iy, "useFocusScopeBranchRegistry");
function BE(i) {
  const o = b.useContext(ky);
  b.useEffect(() => {
    if (!(!i || !o))
      return o.add(i), () => o.remove(i);
  }, [i, o]);
}
te(BE, "useFocusScopeBranch");
function Fy(i, { select: o = !1 } = {}) {
  const c = document.activeElement;
  for (const r of i)
    if (Zn(r, { select: o }), document.activeElement !== c) return;
}
te(Fy, "focusFirst");
function $y(i) {
  const o = Of(i), c = rf(o, i), r = rf(o.reverse(), i);
  return [c, r];
}
te($y, "getTabbableEdges");
function Of(i) {
  const o = [], r = i.ownerDocument.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ te((f) => {
      const d = f.tagName === "INPUT" && f.type === "hidden";
      return f.disabled || f.hidden || d ? NodeFilter.FILTER_SKIP : f.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; r.nextNode(); )
    o.push(r.currentNode);
  return o;
}
te(Of, "getTabbableCandidates");
function rf(i, o) {
  const c = typeof o.checkVisibility == "function" && o.checkVisibility({ checkVisibilityCSS: !0 });
  for (const r of i)
    if (!(c ? !r.checkVisibility({ checkVisibilityCSS: !0 }) : Py(r, { upTo: o })))
      return r;
}
te(rf, "findVisible");
function Py(i, { upTo: o }) {
  if (getComputedStyle(i).visibility === "hidden") return !0;
  for (; i; ) {
    if (o !== void 0 && i === o) return !1;
    if (getComputedStyle(i).display === "none") return !0;
    i = i.parentElement;
  }
  return !1;
}
te(Py, "isHidden");
function Wy(i) {
  return i.tagName === "INPUT" && typeof i.select == "function";
}
te(Wy, "isSelectableInput");
function Zn(i, { select: o = !1 } = {}) {
  if (i && i.focus) {
    const r = (i.ownerDocument ?? document).activeElement;
    i.focus({ preventScroll: !0 }), i !== r && Wy(i) && o && i.select();
  }
}
te(Zn, "focus");
var Bg = t0();
function t0() {
  let i = [];
  return {
    add(o) {
      const c = i[0];
      o !== c && c?.pause(), i = cf(i, o), i.unshift(o);
    },
    remove(o) {
      i = cf(i, o), i[0]?.resume();
    }
  };
}
te(t0, "createFocusScopesStack");
function cf(i, o) {
  const c = [...i], r = c.indexOf(o);
  return r !== -1 && c.splice(r, 1), c;
}
te(cf, "arrayRemove");
function e0(i) {
  return i.filter((o) => o.tagName !== "A");
}
te(e0, "removeLinks");
var LE = Object.defineProperty, VE = (i, o) => LE(i, "name", { value: o, configurable: !0 }), GE = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ VE(function(o, c) {
    const { container: r, ...f } = o, [d, h] = b.useState(!1);
    an(() => h(!0), []);
    const g = r || d && globalThis?.document?.body;
    return g ? gy.createPortal(/* @__PURE__ */ S.jsx(ie.div, { ...f, ref: c }), g) : null;
  }, "Portal")
), YE = Object.defineProperty, Af = (i, o) => YE(i, "name", { value: o, configurable: !0 }), Vo = 0, ka = null;
function qE(i) {
  return zf(), i.children;
}
Af(qE, "FocusGuards");
function zf() {
  b.useEffect(() => {
    ka || (ka = { start: sf(), end: sf() });
    const { start: i, end: o } = ka;
    return document.body.firstElementChild !== i && document.body.insertAdjacentElement("afterbegin", i), document.body.lastElementChild !== o && document.body.insertAdjacentElement("beforeend", o), Vo++, () => {
      Vo === 1 && (ka?.start.remove(), ka?.end.remove(), ka = null), Vo = Math.max(0, Vo - 1);
    };
  }, []);
}
Af(zf, "useFocusGuards");
function sf() {
  const i = document.createElement("span");
  return i.setAttribute("data-radix-focus-guard", ""), i.tabIndex = 0, i.style.outline = "none", i.style.opacity = "0", i.style.position = "fixed", i.style.pointerEvents = "none", i;
}
Af(sf, "createFocusGuard");
var An = function() {
  return An = Object.assign || function(o) {
    for (var c, r = 1, f = arguments.length; r < f; r++) {
      c = arguments[r];
      for (var d in c) Object.prototype.hasOwnProperty.call(c, d) && (o[d] = c[d]);
    }
    return o;
  }, An.apply(this, arguments);
};
function n0(i, o) {
  var c = {};
  for (var r in i) Object.prototype.hasOwnProperty.call(i, r) && o.indexOf(r) < 0 && (c[r] = i[r]);
  if (i != null && typeof Object.getOwnPropertySymbols == "function")
    for (var f = 0, r = Object.getOwnPropertySymbols(i); f < r.length; f++)
      o.indexOf(r[f]) < 0 && Object.prototype.propertyIsEnumerable.call(i, r[f]) && (c[r[f]] = i[r[f]]);
  return c;
}
function XE(i, o, c) {
  if (c || arguments.length === 2) for (var r = 0, f = o.length, d; r < f; r++)
    (d || !(r in o)) && (d || (d = Array.prototype.slice.call(o, 0, r)), d[r] = o[r]);
  return i.concat(d || Array.prototype.slice.call(o));
}
var Ko = "right-scroll-bar-position", ko = "width-before-scroll-bar", QE = "with-scroll-bars-hidden", ZE = "--removed-body-scroll-bar-size";
function ks(i, o) {
  return typeof i == "function" ? i(o) : i && (i.current = o), i;
}
function KE(i, o) {
  var c = b.useState(function() {
    return {
      // value
      value: i,
      // last callback
      callback: o,
      // "memoized" public interface
      facade: {
        get current() {
          return c.value;
        },
        set current(r) {
          var f = c.value;
          f !== r && (c.value = r, c.callback(r, f));
        }
      }
    };
  })[0];
  return c.callback = o, c.facade;
}
var kE = typeof window < "u" ? b.useLayoutEffect : b.useEffect, Lg = /* @__PURE__ */ new WeakMap();
function JE(i, o) {
  var c = KE(null, function(r) {
    return i.forEach(function(f) {
      return ks(f, r);
    });
  });
  return kE(function() {
    var r = Lg.get(c);
    if (r) {
      var f = new Set(r), d = new Set(i), h = c.current;
      f.forEach(function(g) {
        d.has(g) || ks(g, null);
      }), d.forEach(function(g) {
        f.has(g) || ks(g, h);
      });
    }
    Lg.set(c, i);
  }, [i]), c;
}
function IE(i) {
  return i;
}
function FE(i, o) {
  o === void 0 && (o = IE);
  var c = [], r = !1, f = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return c.length ? c[c.length - 1] : i;
    },
    useMedium: function(d) {
      var h = o(d, r);
      return c.push(h), function() {
        c = c.filter(function(g) {
          return g !== h;
        });
      };
    },
    assignSyncMedium: function(d) {
      for (r = !0; c.length; ) {
        var h = c;
        c = [], h.forEach(d);
      }
      c = {
        push: function(g) {
          return d(g);
        },
        filter: function() {
          return c;
        }
      };
    },
    assignMedium: function(d) {
      r = !0;
      var h = [];
      if (c.length) {
        var g = c;
        c = [], g.forEach(d), h = c;
      }
      var C = function() {
        var _ = h;
        h = [], _.forEach(d);
      }, E = function() {
        return Promise.resolve().then(C);
      };
      E(), c = {
        push: function(_) {
          h.push(_), E();
        },
        filter: function(_) {
          return h = h.filter(_), c;
        }
      };
    }
  };
  return f;
}
function $E(i) {
  i === void 0 && (i = {});
  var o = FE(null);
  return o.options = An({ async: !0, ssr: !1 }, i), o;
}
var l0 = function(i) {
  var o = i.sideCar, c = n0(i, ["sideCar"]);
  if (!o)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = o.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return b.createElement(r, An({}, c));
};
l0.isSideCarExport = !0;
function PE(i, o) {
  return i.useMedium(o), l0;
}
var a0 = $E(), Js = function() {
}, Wo = b.forwardRef(function(i, o) {
  var c = b.useRef(null), r = b.useState({
    onScrollCapture: Js,
    onWheelCapture: Js,
    onTouchMoveCapture: Js
  }), f = r[0], d = r[1], h = i.forwardProps, g = i.children, C = i.className, E = i.removeScrollBar, _ = i.enabled, v = i.shards, T = i.sideCar, U = i.noRelative, G = i.noIsolation, w = i.inert, M = i.allowPinchZoom, K = i.as, X = K === void 0 ? "div" : K, Y = i.gapMode, k = n0(i, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), J = T, Q = JE([c, o]), q = An(An({}, k), f);
  return b.createElement(
    b.Fragment,
    null,
    _ && b.createElement(J, { sideCar: a0, removeScrollBar: E, shards: v, noRelative: U, noIsolation: G, inert: w, setCallbacks: d, allowPinchZoom: !!M, lockRef: c, gapMode: Y }),
    h ? b.cloneElement(b.Children.only(g), An(An({}, q), { ref: Q })) : b.createElement(X, An({}, q, { className: C, ref: Q }), g)
  );
});
Wo.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Wo.classNames = {
  fullWidth: ko,
  zeroRight: Ko
};
var WE = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function tT() {
  if (!document)
    return null;
  var i = document.createElement("style");
  i.type = "text/css";
  var o = WE();
  return o && i.setAttribute("nonce", o), i;
}
function eT(i, o) {
  i.styleSheet ? i.styleSheet.cssText = o : i.appendChild(document.createTextNode(o));
}
function nT(i) {
  var o = document.head || document.getElementsByTagName("head")[0];
  o.appendChild(i);
}
var lT = function() {
  var i = 0, o = null;
  return {
    add: function(c) {
      i == 0 && (o = tT()) && (eT(o, c), nT(o)), i++;
    },
    remove: function() {
      i--, !i && o && (o.parentNode && o.parentNode.removeChild(o), o = null);
    }
  };
}, aT = function() {
  var i = lT();
  return function(o, c) {
    b.useEffect(function() {
      return i.add(o), function() {
        i.remove();
      };
    }, [o && c]);
  };
}, u0 = function() {
  var i = aT(), o = function(c) {
    var r = c.styles, f = c.dynamic;
    return i(r, f), null;
  };
  return o;
}, uT = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Is = function(i) {
  return parseInt(i || "", 10) || 0;
}, iT = function(i) {
  var o = window.getComputedStyle(document.body), c = o[i === "padding" ? "paddingLeft" : "marginLeft"], r = o[i === "padding" ? "paddingTop" : "marginTop"], f = o[i === "padding" ? "paddingRight" : "marginRight"];
  return [Is(c), Is(r), Is(f)];
}, oT = function(i) {
  if (i === void 0 && (i = "margin"), typeof window > "u")
    return uT;
  var o = iT(i), c = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: o[0],
    top: o[1],
    right: o[2],
    gap: Math.max(0, r - c + o[2] - o[0])
  };
}, rT = u0(), Wa = "data-scroll-locked", cT = function(i, o, c, r) {
  var f = i.left, d = i.top, h = i.right, g = i.gap;
  return c === void 0 && (c = "margin"), `
  .`.concat(QE, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(g, "px ").concat(r, `;
  }
  body[`).concat(Wa, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    o && "position: relative ".concat(r, ";"),
    c === "margin" && `
    padding-left: `.concat(f, `px;
    padding-top: `).concat(d, `px;
    padding-right: `).concat(h, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(g, "px ").concat(r, `;
    `),
    c === "padding" && "padding-right: ".concat(g, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ko, ` {
    right: `).concat(g, "px ").concat(r, `;
  }
  
  .`).concat(ko, ` {
    margin-right: `).concat(g, "px ").concat(r, `;
  }
  
  .`).concat(Ko, " .").concat(Ko, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(ko, " .").concat(ko, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Wa, `] {
    `).concat(ZE, ": ").concat(g, `px;
  }
`);
}, Vg = function() {
  var i = parseInt(document.body.getAttribute(Wa) || "0", 10);
  return isFinite(i) ? i : 0;
}, sT = function() {
  b.useEffect(function() {
    return document.body.setAttribute(Wa, (Vg() + 1).toString()), function() {
      var i = Vg() - 1;
      i <= 0 ? document.body.removeAttribute(Wa) : document.body.setAttribute(Wa, i.toString());
    };
  }, []);
}, fT = function(i) {
  var o = i.noRelative, c = i.noImportant, r = i.gapMode, f = r === void 0 ? "margin" : r;
  sT();
  var d = b.useMemo(function() {
    return oT(f);
  }, [f]);
  return b.createElement(rT, { styles: cT(d, !o, f, c ? "" : "!important") });
}, ff = !1;
if (typeof window < "u")
  try {
    var Go = Object.defineProperty({}, "passive", {
      get: function() {
        return ff = !0, !0;
      }
    });
    window.addEventListener("test", Go, Go), window.removeEventListener("test", Go, Go);
  } catch {
    ff = !1;
  }
var Ja = ff ? { passive: !1 } : !1, dT = function(i) {
  return i.tagName === "TEXTAREA";
}, i0 = function(i, o) {
  if (!(i instanceof Element))
    return !1;
  var c = window.getComputedStyle(i);
  return (
    // not-not-scrollable
    c[o] !== "hidden" && // contains scroll inside self
    !(c.overflowY === c.overflowX && !dT(i) && c[o] === "visible")
  );
}, mT = function(i) {
  return i0(i, "overflowY");
}, vT = function(i) {
  return i0(i, "overflowX");
}, Gg = function(i, o) {
  var c = o.ownerDocument, r = o;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var f = o0(i, r);
    if (f) {
      var d = r0(i, r), h = d[1], g = d[2];
      if (h > g)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== c.body);
  return !1;
}, hT = function(i) {
  var o = i.scrollTop, c = i.scrollHeight, r = i.clientHeight;
  return [
    o,
    c,
    r
  ];
}, gT = function(i) {
  var o = i.scrollLeft, c = i.scrollWidth, r = i.clientWidth;
  return [
    o,
    c,
    r
  ];
}, o0 = function(i, o) {
  return i === "v" ? mT(o) : vT(o);
}, r0 = function(i, o) {
  return i === "v" ? hT(o) : gT(o);
}, yT = function(i, o) {
  return i === "h" && o === "rtl" ? -1 : 1;
}, bT = function(i, o, c, r, f) {
  var d = yT(i, window.getComputedStyle(o).direction), h = d * r, g = c.target, C = o.contains(g), E = !1, _ = h > 0, v = 0, T = 0;
  do {
    if (!g)
      break;
    var U = r0(i, g), G = U[0], w = U[1], M = U[2], K = w - M - d * G;
    (G || K) && o0(i, g) && (v += K, T += G);
    var X = g.parentNode;
    g = X && X.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? X.host : X;
  } while (
    // portaled content
    !C && g !== document.body || // self content
    C && (o.contains(g) || o === g)
  );
  return (_ && Math.abs(v) < 1 || !_ && Math.abs(T) < 1) && (E = !0), E;
}, Yo = function(i) {
  return "changedTouches" in i ? [i.changedTouches[0].clientX, i.changedTouches[0].clientY] : [0, 0];
}, Yg = function(i) {
  return [i.deltaX, i.deltaY];
}, qg = function(i) {
  return i && "current" in i ? i.current : i;
}, pT = function(i, o) {
  return i[0] === o[0] && i[1] === o[1];
}, ST = function(i) {
  return `
  .block-interactivity-`.concat(i, ` {pointer-events: none;}
  .allow-interactivity-`).concat(i, ` {pointer-events: all;}
`);
}, ET = 0, Ia = [];
function TT(i) {
  var o = b.useRef([]), c = b.useRef([0, 0]), r = b.useRef(), f = b.useState(ET++)[0], d = b.useState(u0)[0], h = b.useRef(i);
  b.useEffect(function() {
    h.current = i;
  }, [i]), b.useEffect(function() {
    if (i.inert) {
      document.body.classList.add("block-interactivity-".concat(f));
      var w = XE([i.lockRef.current], (i.shards || []).map(qg), !0).filter(Boolean);
      return w.forEach(function(M) {
        return M.classList.add("allow-interactivity-".concat(f));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(f)), w.forEach(function(M) {
          return M.classList.remove("allow-interactivity-".concat(f));
        });
      };
    }
  }, [i.inert, i.lockRef.current, i.shards]);
  var g = b.useCallback(function(w, M) {
    if ("touches" in w && w.touches.length === 2 || w.type === "wheel" && w.ctrlKey)
      return !h.current.allowPinchZoom;
    var K = Yo(w), X = c.current, Y = "deltaX" in w ? w.deltaX : X[0] - K[0], k = "deltaY" in w ? w.deltaY : X[1] - K[1], J, Q = w.target, q = Math.abs(Y) > Math.abs(k) ? "h" : "v";
    if ("touches" in w && q === "h" && Q.type === "range")
      return !1;
    var L = window.getSelection(), it = L && L.anchorNode, Ot = it ? it === Q || it.contains(Q) : !1;
    if (Ot)
      return !1;
    var ht = Gg(q, Q);
    if (!ht)
      return !0;
    if (ht ? J = q : (J = q === "v" ? "h" : "v", ht = Gg(q, Q)), !ht)
      return !1;
    if (!r.current && "changedTouches" in w && (Y || k) && (r.current = J), !J)
      return !0;
    var ot = r.current || J;
    return bT(ot, M, w, ot === "h" ? Y : k);
  }, []), C = b.useCallback(function(w) {
    var M = w;
    if (!(!Ia.length || Ia[Ia.length - 1] !== d)) {
      var K = "deltaY" in M ? Yg(M) : Yo(M), X = o.current.filter(function(J) {
        return J.name === M.type && (J.target === M.target || M.target === J.shadowParent) && pT(J.delta, K);
      })[0];
      if (X && X.should) {
        M.cancelable && M.preventDefault();
        return;
      }
      if (!X) {
        var Y = (h.current.shards || []).map(qg).filter(Boolean).filter(function(J) {
          return J.contains(M.target);
        }), k = Y.length > 0 ? g(M, Y[0]) : !h.current.noIsolation;
        k && M.cancelable && M.preventDefault();
      }
    }
  }, []), E = b.useCallback(function(w, M, K, X) {
    var Y = { name: w, delta: M, target: K, should: X, shadowParent: xT(K) };
    o.current.push(Y), setTimeout(function() {
      o.current = o.current.filter(function(k) {
        return k !== Y;
      });
    }, 1);
  }, []), _ = b.useCallback(function(w) {
    c.current = Yo(w), r.current = void 0;
  }, []), v = b.useCallback(function(w) {
    E(w.type, Yg(w), w.target, g(w, i.lockRef.current));
  }, []), T = b.useCallback(function(w) {
    E(w.type, Yo(w), w.target, g(w, i.lockRef.current));
  }, []);
  b.useEffect(function() {
    return Ia.push(d), i.setCallbacks({
      onScrollCapture: v,
      onWheelCapture: v,
      onTouchMoveCapture: T
    }), document.addEventListener("wheel", C, Ja), document.addEventListener("touchmove", C, Ja), document.addEventListener("touchstart", _, Ja), function() {
      Ia = Ia.filter(function(w) {
        return w !== d;
      }), document.removeEventListener("wheel", C, Ja), document.removeEventListener("touchmove", C, Ja), document.removeEventListener("touchstart", _, Ja);
    };
  }, []);
  var U = i.removeScrollBar, G = i.inert;
  return b.createElement(
    b.Fragment,
    null,
    G ? b.createElement(d, { styles: ST(f) }) : null,
    U ? b.createElement(fT, { noRelative: i.noRelative, gapMode: i.gapMode }) : null
  );
}
function xT(i) {
  for (var o = null; i !== null; )
    i instanceof ShadowRoot && (o = i.host, i = i.host), i = i.parentNode;
  return o;
}
const CT = PE(a0, TT);
var c0 = b.forwardRef(function(i, o) {
  return b.createElement(Wo, An({}, i, { ref: o, sideCar: CT }));
});
c0.classNames = Wo.classNames;
var _T = function(i) {
  if (typeof document > "u")
    return null;
  var o = Array.isArray(i) ? i[0] : i;
  return o.ownerDocument.body;
}, Fa = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Xo = {}, Fs = 0, s0 = function(i) {
  return i && (i.host || s0(i.parentNode));
}, OT = function(i, o) {
  return o.map(function(c) {
    if (i.contains(c))
      return c;
    var r = s0(c);
    return r && i.contains(r) ? r : (console.error("aria-hidden", c, "in not contained inside", i, ". Doing nothing"), null);
  }).filter(function(c) {
    return !!c;
  });
}, AT = function(i, o, c, r) {
  var f = OT(o, Array.isArray(i) ? i : [i]);
  Xo[c] || (Xo[c] = /* @__PURE__ */ new WeakMap());
  var d = Xo[c], h = [], g = /* @__PURE__ */ new Set(), C = new Set(f), E = function(v) {
    !v || g.has(v) || (g.add(v), E(v.parentNode));
  };
  f.forEach(E);
  var _ = function(v) {
    !v || C.has(v) || Array.prototype.forEach.call(v.children, function(T) {
      if (g.has(T))
        _(T);
      else
        try {
          var U = T.getAttribute(r), G = U !== null && U !== "false", w = (Fa.get(T) || 0) + 1, M = (d.get(T) || 0) + 1;
          Fa.set(T, w), d.set(T, M), h.push(T), w === 1 && G && qo.set(T, !0), M === 1 && T.setAttribute(c, "true"), G || T.setAttribute(r, "true");
        } catch (K) {
          console.error("aria-hidden: cannot operate on ", T, K);
        }
    });
  };
  return _(o), g.clear(), Fs++, function() {
    h.forEach(function(v) {
      var T = Fa.get(v) - 1, U = d.get(v) - 1;
      Fa.set(v, T), d.set(v, U), T || (qo.has(v) || v.removeAttribute(r), qo.delete(v)), U || v.removeAttribute(c);
    }), Fs--, Fs || (Fa = /* @__PURE__ */ new WeakMap(), Fa = /* @__PURE__ */ new WeakMap(), qo = /* @__PURE__ */ new WeakMap(), Xo = {});
  };
}, zT = function(i, o, c) {
  c === void 0 && (c = "data-aria-hidden");
  var r = Array.from(Array.isArray(i) ? i : [i]), f = _T(i);
  return f ? (r.push.apply(r, Array.from(f.querySelectorAll("[aria-live], script"))), AT(r, f, c, "aria-hidden")) : function() {
    return null;
  };
}, RT = Object.defineProperty, we = (i, o) => RT(i, "name", { value: o, configurable: !0 }), Rf = "Dialog", [f0, c2] = /* @__PURE__ */ ta(Rf), [NT, dn] = f0(Rf), DT = /* @__PURE__ */ we((i) => {
  const {
    __scopeDialog: o,
    children: c,
    open: r,
    defaultOpen: f,
    onOpenChange: d,
    modal: h = !0
  } = i, g = b.useRef(null), C = b.useRef(null), { nodes: E, registry: _ } = Iy(), [v, T] = li({
    prop: r,
    defaultProp: f ?? !1,
    onChange: d,
    caller: Rf
  }), [U, G] = b.useState(0), [w, M] = b.useState(0);
  return /* @__PURE__ */ S.jsx(
    NT,
    {
      scope: o,
      triggerRef: g,
      contentRef: C,
      contentId: Pa(),
      titleId: Pa(),
      descriptionId: Pa(),
      titlePresent: U > 0,
      descriptionPresent: w > 0,
      setTitleCount: G,
      setDescriptionCount: M,
      open: v,
      onOpenChange: T,
      onOpenToggle: b.useCallback(() => T((K) => !K), [T]),
      modal: h,
      branchNodes: E,
      branchRegistry: _,
      children: c
    }
  );
}, "Dialog"), MT = "DialogTrigger", wT = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ we(function(o, c) {
    const { __scopeDialog: r, ...f } = o, d = dn(MT, r), h = ue(c, d.triggerRef);
    return /* @__PURE__ */ S.jsx(
      ie.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": d.open,
        "aria-controls": d.open ? d.contentId : void 0,
        "data-state": tr(d.open),
        ...f,
        ref: h,
        onClick: qt(o.onClick, d.onOpenToggle)
      }
    );
  }, "DialogTrigger")
), d0 = "DialogPortal", [jT, m0] = f0(d0, {
  forceMount: void 0
}), UT = /* @__PURE__ */ we((i) => {
  const { __scopeDialog: o, forceMount: c, children: r, container: f } = i, d = dn(d0, o);
  return /* @__PURE__ */ S.jsx(jT, { scope: o, forceMount: c, children: b.Children.map(r, (h) => /* @__PURE__ */ S.jsx($o, { present: c || d.open, children: /* @__PURE__ */ S.jsx(GE, { asChild: !0, container: f, children: h }) })) });
}, "DialogPortal"), df = "DialogOverlay", HT = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ we(function(o, c) {
    const r = m0(df, o.__scopeDialog), { forceMount: f = r.forceMount, ...d } = o, h = dn(df, o.__scopeDialog);
    return h.modal ? /* @__PURE__ */ S.jsx($o, { present: f || h.open, children: /* @__PURE__ */ S.jsx(LT, { ...d, ref: c }) }) : null;
  }, "DialogOverlay")
), BT = /* @__PURE__ */ _l("DialogOverlay.RemoveScroll"), LT = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ we(function(o, c) {
    const { __scopeDialog: r, ...f } = o, d = dn(df, r), h = Qy(), g = ue(c, h);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside
      // `RemoveScroll` (eg. when `Overlay` and `Content` are siblings). Nested
      // layers are registered as branches and added as shards so they remain
      // scrollable too. See https://github.com/radix-ui/primitives/issues/3423
      /* @__PURE__ */ S.jsx(
        c0,
        {
          as: BT,
          allowPinchZoom: !0,
          shards: b.useMemo(
            () => [d.contentRef, ...d.branchNodes.map((C) => ({ current: C }))],
            [d.contentRef, d.branchNodes]
          ),
          children: /* @__PURE__ */ S.jsx(
            ie.div,
            {
              "data-state": tr(d.open),
              ...f,
              ref: g,
              style: { pointerEvents: "auto", ...f.style }
            }
          )
        }
      )
    );
  }, "DialogOverlayImpl")
), ei = "DialogContent", VT = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ we(function(o, c) {
    const r = m0(ei, o.__scopeDialog), { forceMount: f = r.forceMount, ...d } = o, h = dn(ei, o.__scopeDialog);
    return /* @__PURE__ */ S.jsx($o, { present: f || h.open, children: h.modal ? /* @__PURE__ */ S.jsx(GT, { ...d, ref: c }) : /* @__PURE__ */ S.jsx(YT, { ...d, ref: c }) });
  }, "DialogContent")
), GT = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ we(function(o, c) {
    const r = dn(ei, o.__scopeDialog), f = b.useRef(null), d = ue(c, r.contentRef, f);
    return b.useEffect(() => {
      const h = f.current;
      if (h) return zT(h);
    }, []), /* @__PURE__ */ S.jsx(
      v0,
      {
        ...o,
        ref: d,
        trapFocus: r.open,
        disableOutsidePointerEvents: r.open,
        onCloseAutoFocus: qt(o.onCloseAutoFocus, (h) => {
          h.preventDefault(), r.triggerRef.current?.focus();
        }),
        onPointerDownOutside: qt(o.onPointerDownOutside, (h) => {
          const g = h.detail.originalEvent, C = g.button === 0 && g.ctrlKey === !0;
          (g.button === 2 || C) && h.preventDefault();
        }),
        onFocusOutside: qt(
          o.onFocusOutside,
          (h) => h.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), YT = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ we(function(o, c) {
    const r = dn(ei, o.__scopeDialog), f = b.useRef(!1), d = b.useRef(!1);
    return /* @__PURE__ */ S.jsx(
      v0,
      {
        ...o,
        ref: c,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (h) => {
          o.onCloseAutoFocus?.(h), h.defaultPrevented || (f.current || r.triggerRef.current?.focus(), h.preventDefault()), f.current = !1, d.current = !1;
        },
        onInteractOutside: (h) => {
          o.onInteractOutside?.(h), h.defaultPrevented || (f.current = !0, h.detail.originalEvent.type === "pointerdown" && (d.current = !0));
          const g = h.target;
          r.triggerRef.current?.contains(g) && h.preventDefault(), h.detail.originalEvent.type === "focusin" && d.current && h.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), v0 = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ we(function(o, c) {
    const {
      __scopeDialog: r,
      trapFocus: f,
      onOpenAutoFocus: d,
      onCloseAutoFocus: h,
      "aria-describedby": g,
      children: C,
      ...E
    } = o, _ = dn(ei, r);
    return zf(), /* @__PURE__ */ S.jsx(Jy, { registry: _.branchRegistry, children: /* @__PURE__ */ S.jsx(
      HE,
      {
        asChild: !0,
        loop: !0,
        trapped: f,
        branches: _.branchNodes,
        onMountAutoFocus: d,
        onUnmountAutoFocus: h,
        children: /* @__PURE__ */ S.jsx(
          wE,
          {
            role: "dialog",
            id: _.contentId,
            "aria-labelledby": _.titlePresent ? _.titleId : void 0,
            "aria-describedby": _.descriptionPresent ? g0(g, _.descriptionId) : g,
            "data-state": tr(_.open),
            ...E,
            ref: c,
            deferPointerDownOutside: !0,
            onDismiss: () => _.onOpenChange(!1),
            children: C
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), qT = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ we(function(o, c) {
    const { __scopeDialog: r, ...f } = o, d = dn("DialogTitle", r), { setTitleCount: h } = d;
    return an(() => (h((g) => g + 1), () => h((g) => g - 1)), [h]), /* @__PURE__ */ S.jsx(ie.h2, { id: d.titleId, ...f, ref: c });
  }, "DialogTitle")
), XT = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ we(function(o, c) {
    const { __scopeDialog: r, ...f } = o, d = dn("DialogDescription", r), { setDescriptionCount: h } = d;
    return an(() => (h((g) => g + 1), () => h((g) => g - 1)), [h]), /* @__PURE__ */ S.jsx(ie.p, { id: d.descriptionId, ...f, ref: c });
  }, "DialogDescription")
), QT = "DialogClose", h0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ we(function(o, c) {
    const { __scopeDialog: r, ...f } = o, d = dn(QT, r);
    return /* @__PURE__ */ S.jsx(
      ie.button,
      {
        type: "button",
        ...f,
        ref: c,
        onClick: qt(o.onClick, () => d.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function g0(...i) {
  const o = /* @__PURE__ */ new Set();
  for (const c of i)
    if (typeof c == "string")
      for (const r of String(c).trim().split(/\s+/))
        r && o.add(r);
  return o.size > 0 ? Array.from(o).join(" ") : void 0;
}
we(g0, "concatAriaDescribedby");
function tr(i) {
  return i ? "open" : "closed";
}
we(tr, "getState");
var ZT = Object.defineProperty, KT = (i, o) => ZT(i, "name", { value: o, configurable: !0 });
function y0(i) {
  const [o, c] = b.useState(void 0);
  return an(() => {
    if (i) {
      c({ width: i.offsetWidth, height: i.offsetHeight });
      let r = 0;
      const f = new ResizeObserver((d) => {
        if (!Array.isArray(d) || !d.length)
          return;
        const h = d[0];
        window.cancelAnimationFrame(r), r = window.requestAnimationFrame(() => {
          let g, C;
          if ("borderBoxSize" in h) {
            const E = h.borderBoxSize, _ = Array.isArray(E) ? E[0] : E;
            g = _.inlineSize, C = _.blockSize;
          } else
            g = i.offsetWidth, C = i.offsetHeight;
          c({ width: g, height: C });
        });
      });
      return f.observe(i, { box: "border-box" }), () => {
        window.cancelAnimationFrame(r), f.unobserve(i);
      };
    } else
      c(void 0);
  }, [i]), o;
}
KT(y0, "useSize");
var kT = Object.defineProperty, Nf = (i, o) => kT(i, "name", { value: o, configurable: !0 }), $s = !1;
function b0() {
  const [i, o] = b.useState($s);
  return b.useEffect(() => {
    $s || ($s = !0, o(!0));
  }, []), i;
}
Nf(b0, "useIsHydrated");
var p0 = Pl[" useSyncExternalStore ".trim().toString()];
function S0() {
  return () => {
  };
}
Nf(S0, "subscribe");
function E0() {
  return p0(
    S0,
    () => !0,
    () => !1
  );
}
Nf(E0, "useIsHydratedModern");
var JT = typeof p0 == "function" ? E0 : b0, IT = Object.defineProperty, ea = (i, o) => IT(i, "name", { value: o, configurable: !0 }), Ps = "rovingFocusGroup.onEntryFocus", FT = { bubbles: !1, cancelable: !0 }, er = "RovingFocusGroup", [mf, T0, $T] = /* @__PURE__ */ xf(er), [PT, x0] = /* @__PURE__ */ ta(
  er,
  [$T]
), Xg = {
  Vertical: "vertical",
  Horizontal: "horizontal"
}, WT = {
  RTL: "rtl"
}, [tx, ex] = PT(er), nx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ea(function(o, c) {
    return /* @__PURE__ */ S.jsx(mf.Provider, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(mf.Slot, { scope: o.__scopeRovingFocusGroup, children: /* @__PURE__ */ S.jsx(lx, { ...o, ref: c }) }) });
  }, "RovingFocusGroup")
), lx = /* @__PURE__ */ b.forwardRef(/* @__PURE__ */ ea(function(o, c) {
  const {
    __scopeRovingFocusGroup: r,
    orientation: f,
    loop: d = !1,
    dir: h,
    currentTabStopId: g,
    defaultCurrentTabStopId: C,
    onCurrentTabStopIdChange: E,
    onEntryFocus: _,
    preventScrollOnEntryFocus: v = !1,
    ...T
  } = o, U = b.useRef(null), G = ue(c, U), w = Po(h), [M, K] = li({
    prop: g,
    defaultProp: C ?? null,
    onChange: E,
    caller: er
  }), [X, Y] = b.useState(!1), k = $l(_), J = T0(r), Q = b.useRef(!1), [q, L] = b.useState(0);
  return b.useEffect(() => {
    const it = U.current;
    if (it)
      return it.addEventListener(Ps, k), () => it.removeEventListener(Ps, k);
  }, [k]), /* @__PURE__ */ S.jsx(
    tx,
    {
      scope: r,
      orientation: f,
      dir: w,
      loop: d,
      currentTabStopId: M,
      onItemFocus: b.useCallback(
        (it) => K(it),
        [K]
      ),
      onItemShiftTab: b.useCallback(() => Y(!0), []),
      onFocusableItemAdd: b.useCallback(
        () => L((it) => it + 1),
        []
      ),
      onFocusableItemRemove: b.useCallback(
        () => L((it) => it - 1),
        []
      ),
      children: /* @__PURE__ */ S.jsx(
        ie.div,
        {
          tabIndex: X || q === 0 ? -1 : 0,
          "data-orientation": f,
          ...T,
          ref: G,
          style: { outline: "none", ...o.style },
          onMouseDown: qt(o.onMouseDown, () => {
            Q.current = !0;
          }),
          onFocus: qt(o.onFocus, (it) => {
            const Ot = !Q.current;
            if (it.target === it.currentTarget && Ot && !X) {
              const ht = new CustomEvent(Ps, FT);
              if (it.currentTarget.dispatchEvent(ht), !ht.defaultPrevented) {
                const ot = J().filter(($) => $.focusable), Ht = ot.find(($) => $.active), Lt = ot.find(($) => $.id === M), Z = [Ht, Lt, ...ot].filter(
                  Boolean
                ).map(($) => $.ref.current);
                Df(Z, v);
              }
            }
            Q.current = !1;
          }),
          onBlur: qt(o.onBlur, () => Y(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), ax = "RovingFocusGroupItem", ux = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ ea(function(o, c) {
    const {
      __scopeRovingFocusGroup: r,
      focusable: f = !0,
      active: d = !1,
      tabStopId: h,
      children: g,
      ...C
    } = o, E = Pa(), _ = h || E, v = ex(ax, r), T = v.currentTabStopId === _, U = T0(r), { onFocusableItemAdd: G, onFocusableItemRemove: w, currentTabStopId: M } = v, K = JT();
    return an(() => {
      if (!(!K || !f))
        return G(), () => w();
    }, [K, f, G, w]), b.useEffect(() => {
      if (!(K || !f))
        return G(), () => w();
    }, [K, f, G, w]), /* @__PURE__ */ S.jsx(
      mf.ItemSlot,
      {
        scope: r,
        id: _,
        focusable: f,
        active: d,
        children: /* @__PURE__ */ S.jsx(
          ie.span,
          {
            tabIndex: T ? 0 : -1,
            "data-orientation": v.orientation,
            ...C,
            ref: c,
            onMouseDown: qt(o.onMouseDown, (X) => {
              f ? v.onItemFocus(_) : X.preventDefault();
            }),
            onFocus: qt(o.onFocus, () => v.onItemFocus(_)),
            onKeyDown: qt(o.onKeyDown, (X) => {
              if (X.key === "Tab" && X.shiftKey) {
                v.onItemShiftTab();
                return;
              }
              if (X.target !== X.currentTarget) return;
              const Y = _0(X, v.orientation, v.dir);
              if (Y !== void 0) {
                if (X.metaKey || X.ctrlKey || X.altKey || X.shiftKey) return;
                X.preventDefault();
                let J = U().filter((Q) => Q.focusable).map((Q) => Q.ref.current);
                if (Y === "last") J.reverse();
                else if (Y === "prev" || Y === "next") {
                  Y === "prev" && J.reverse();
                  const Q = J.indexOf(X.currentTarget);
                  J = v.loop ? O0(J, Q + 1) : J.slice(Q + 1);
                }
                setTimeout(() => Df(J));
              }
            }),
            children: typeof g == "function" ? g({ isCurrentTabStop: T, hasTabStop: M != null }) : g
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), ix = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function C0(i, o) {
  return o !== WT.RTL ? i : i === "ArrowLeft" ? "ArrowRight" : i === "ArrowRight" ? "ArrowLeft" : i;
}
ea(C0, "getDirectionAwareKey");
function _0(i, o, c) {
  const r = C0(i.key, c);
  if (!(o === Xg.Vertical && ["ArrowLeft", "ArrowRight"].includes(r)) && !(o === Xg.Horizontal && ["ArrowUp", "ArrowDown"].includes(r)))
    return ix[r];
}
ea(_0, "getFocusIntent");
function Df(i, o = !1) {
  const c = document.activeElement;
  for (const r of i)
    if (r === c || (r.focus({ preventScroll: o }), document.activeElement !== c)) return;
}
ea(Df, "focusFirst");
function O0(i, o) {
  return i.map((c, r) => i[(o + r) % i.length]);
}
ea(O0, "wrapArray");
var ox = Object.defineProperty, rx = (i, o) => ox(i, "name", { value: o, configurable: !0 });
function Fo(i, [o, c]) {
  return Math.min(c, Math.max(o, i));
}
rx(Fo, "clamp");
var cx = Object.defineProperty, zt = (i, o) => cx(i, "name", { value: o, configurable: !0 }), Qg = {
  Horizontal: "horizontal"
}, sx = {
  LTR: "ltr"
}, A0 = ["PageUp", "PageDown"], z0 = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], R0 = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, ai = "Slider", [vf, fx, dx] = /* @__PURE__ */ xf(ai), [Mf, s2] = /* @__PURE__ */ ta(ai, [
  dx
]), [mx, eu] = Mf(ai), vx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ zt(function(o, c) {
    const {
      name: r,
      min: f = 0,
      max: d = 100,
      step: h = 1,
      orientation: g = Qg.Horizontal,
      disabled: C = !1,
      minStepsBetweenThumbs: E = 0,
      preserveThumbOrder: _ = !1,
      defaultValue: v = [f],
      value: T,
      onValueChange: U = /* @__PURE__ */ zt(() => {
      }, "onValueChange"),
      onValueCommit: G = /* @__PURE__ */ zt(() => {
      }, "onValueCommit"),
      inverted: w = !1,
      form: M,
      ...K
    } = o, X = b.useRef(/* @__PURE__ */ new Set()), Y = b.useRef(0), k = b.useRef(!1), [J, Q] = b.useState(null), L = g === Qg.Horizontal ? hx : gx, [it, Ot] = b.useState(null), ht = ue(c, Ot), [ot = [], Ht] = li({
      prop: T,
      defaultProp: v,
      onChange: /* @__PURE__ */ zt((j) => {
        [...X.current][Y.current]?.focus({
          preventScroll: !0,
          focusVisible: k.current
        }), k.current = !1, U(j);
      }, "onChange")
    }), Lt = b.useRef(ot), bt = b.useRef(ot);
    b.useEffect(() => {
      const j = M ? it?.ownerDocument.getElementById(M) : it?.closest("form");
      if (j instanceof HTMLFormElement) {
        const dt = /* @__PURE__ */ zt(() => Ht(bt.current), "reset");
        return j.addEventListener("reset", dt), () => j.removeEventListener("reset", dt);
      }
    }, [it, M, Ht]);
    function Z(j) {
      const dt = B0(ot, j);
      ft(j, dt);
    }
    zt(Z, "handleSlideStart");
    function $(j) {
      ft(j, Y.current);
    }
    zt($, "handleSlideMove");
    function at() {
      String(ot) !== String(Lt.current) && G(ot);
    }
    zt(at, "handleSlideEnd");
    function ft(j, dt, { commit: Zt } = { commit: !1 }) {
      const ee = jf(h), x = ti(Math.round((j - f) / h) * h + f, ee), V = Fo(x, [f, d]), F = E * h;
      function et(ut) {
        const vt = _ ? Fo(V, [
          ut[dt - 1] === void 0 ? f : ut[dt - 1] + F,
          ut[dt + 1] === void 0 ? d : ut[dt + 1] - F
        ]) : V, P = U0(ut, vt, dt);
        return G0(P, F) ? {
          nextValues: P,
          changedIndex: _ ? dt : P.indexOf(vt),
          hasChanged: String(P) !== String(ut)
        } : null;
      }
      zt(et, "getNextValues");
      const pt = et(ot);
      pt?.hasChanged && Q(pt.nextValues), Ht((ut = []) => {
        const vt = et(ut);
        return vt ? (Y.current = vt.changedIndex, vt.hasChanged && Zt && G(vt.nextValues), vt.hasChanged ? vt.nextValues : ut) : ut;
      });
    }
    return zt(ft, "updateValues"), /* @__PURE__ */ S.jsx(
      mx,
      {
        scope: o.__scopeSlider,
        name: r,
        disabled: C,
        min: f,
        max: d,
        valueIndexToChangeRef: Y,
        thumbs: X.current,
        values: ot,
        orientation: g,
        form: M,
        userRequestedValues: J,
        children: /* @__PURE__ */ S.jsx(vf.Provider, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(vf.Slot, { scope: o.__scopeSlider, children: /* @__PURE__ */ S.jsx(
          L,
          {
            "aria-disabled": C,
            "data-disabled": C ? "" : void 0,
            ...K,
            ref: ht,
            onPointerDown: qt(K.onPointerDown, () => {
              C || (Lt.current = ot, k.current = !1);
            }),
            min: f,
            max: d,
            inverted: w,
            onSlideStart: C ? void 0 : Z,
            onSlideMove: C ? void 0 : $,
            onSlideEnd: C ? void 0 : at,
            onHomeKeyDown: () => {
              C || (k.current = !0, ft(f, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              C || (k.current = !0, ft(d, ot.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: j, direction: dt }) => {
              if (!C) {
                k.current = !0;
                const x = A0.includes(j.key) || j.shiftKey && z0.includes(j.key) ? 10 : 1, V = Y.current, F = ot[V], et = Y0(F, {
                  min: f,
                  step: h,
                  direction: dt,
                  multiplier: x
                });
                ft(et, V, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [N0, D0] = Mf(ai, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), hx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ zt(function(o, c) {
    const {
      min: r,
      max: f,
      dir: d,
      inverted: h,
      onSlideStart: g,
      onSlideMove: C,
      onSlideEnd: E,
      onStepKeyDown: _,
      ...v
    } = o, [T, U] = b.useState(null), G = ue(c, U), w = b.useRef(void 0), M = Po(d), K = M === sx.LTR, X = K && !h || !K && h;
    function Y(k) {
      const J = w.current || T.getBoundingClientRect(), Q = [0, J.width], L = nr(Q, X ? [r, f] : [f, r]);
      return w.current = J, L(k - J.left);
    }
    return zt(Y, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      N0,
      {
        scope: o.__scopeSlider,
        startEdge: X ? "left" : "right",
        endEdge: X ? "right" : "left",
        direction: X ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ S.jsx(
          M0,
          {
            dir: M,
            "data-orientation": "horizontal",
            ...v,
            ref: G,
            style: {
              ...v.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (k) => {
              const J = Y(k.clientX);
              g?.(J);
            },
            onSlideMove: (k) => {
              const J = Y(k.clientX);
              C?.(J);
            },
            onSlideEnd: () => {
              w.current = void 0, E?.();
            },
            onStepKeyDown: (k) => {
              const Q = R0[X ? "from-left" : "from-right"].includes(k.key);
              _?.({ event: k, direction: Q ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), gx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ zt(function(o, c) {
    const {
      min: r,
      max: f,
      inverted: d,
      onSlideStart: h,
      onSlideMove: g,
      onSlideEnd: C,
      onStepKeyDown: E,
      ..._
    } = o, v = b.useRef(null), T = ue(c, v), U = b.useRef(void 0), G = !d;
    function w(M) {
      const K = U.current || v.current.getBoundingClientRect(), X = [0, K.height], k = nr(X, G ? [f, r] : [r, f]);
      return U.current = K, k(M - K.top);
    }
    return zt(w, "getValueFromPointer"), /* @__PURE__ */ S.jsx(
      N0,
      {
        scope: o.__scopeSlider,
        startEdge: G ? "bottom" : "top",
        endEdge: G ? "top" : "bottom",
        size: "height",
        direction: G ? 1 : -1,
        children: /* @__PURE__ */ S.jsx(
          M0,
          {
            "data-orientation": "vertical",
            ..._,
            ref: T,
            style: {
              ..._.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (M) => {
              const K = w(M.clientY);
              h?.(K);
            },
            onSlideMove: (M) => {
              const K = w(M.clientY);
              g?.(K);
            },
            onSlideEnd: () => {
              U.current = void 0, C?.();
            },
            onStepKeyDown: (M) => {
              const X = R0[G ? "from-bottom" : "from-top"].includes(M.key);
              E?.({ event: M, direction: X ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), M0 = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ zt(function(o, c) {
    const {
      __scopeSlider: r,
      onSlideStart: f,
      onSlideMove: d,
      onSlideEnd: h,
      onHomeKeyDown: g,
      onEndKeyDown: C,
      onStepKeyDown: E,
      ..._
    } = o, v = eu(ai, r);
    return /* @__PURE__ */ S.jsx(
      ie.span,
      {
        ..._,
        ref: c,
        onKeyDown: qt(o.onKeyDown, (T) => {
          T.key === "Home" ? (g(T), T.preventDefault()) : T.key === "End" ? (C(T), T.preventDefault()) : A0.concat(z0).includes(T.key) && (E(T), T.preventDefault());
        }),
        onPointerDown: qt(o.onPointerDown, (T) => {
          const U = T.target;
          U.setPointerCapture(T.pointerId), T.preventDefault(), v.thumbs.has(U) ? U.focus({ preventScroll: !0, focusVisible: !1 }) : f(T);
        }),
        onPointerMove: qt(o.onPointerMove, (T) => {
          T.target.hasPointerCapture(T.pointerId) && d(T);
        }),
        onPointerUp: qt(o.onPointerUp, (T) => {
          const U = T.target;
          U.hasPointerCapture(T.pointerId) && (U.releasePointerCapture(T.pointerId), h(T));
        })
      }
    );
  }, "SliderImpl")
), yx = "SliderTrack", bx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ zt(function(o, c) {
    const { __scopeSlider: r, ...f } = o, d = eu(yx, r);
    return /* @__PURE__ */ S.jsx(
      ie.span,
      {
        "data-disabled": d.disabled ? "" : void 0,
        "data-orientation": d.orientation,
        ...f,
        ref: c
      }
    );
  }, "SliderTrack")
), Zg = "SliderRange", px = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ zt(function(o, c) {
    const { __scopeSlider: r, ...f } = o, d = eu(Zg, r), h = D0(Zg, r), g = b.useRef(null), C = ue(c, g), E = d.values.length, _ = d.values.map(
      (U) => wf(U, d.min, d.max)
    ), v = E > 1 ? Math.min(..._) : 0, T = 100 - Math.max(..._);
    return /* @__PURE__ */ S.jsx(
      ie.span,
      {
        "data-orientation": d.orientation,
        "data-disabled": d.disabled ? "" : void 0,
        ...f,
        ref: C,
        style: {
          ...o.style,
          [h.startEdge]: v + "%",
          [h.endEdge]: T + "%"
        }
      }
    );
  }, "SliderRange")
), Sx = "SliderThumb", [Ex, w0] = Mf(Sx), Tx = "SliderThumbProvider";
function j0(i) {
  const {
    __scopeSlider: o,
    name: c,
    children: r,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: f
  } = i, d = eu(Tx, o), h = fx(o), [g, C] = b.useState(null), E = b.useMemo(
    () => g ? h().findIndex((M) => M.ref.current === g) : -1,
    [h, g]
  ), _ = y0(g), v = g ? !!d.form || !!g.closest("form") : !0, T = d.values[E], U = c ?? (d.name ? d.name + (d.values.length > 1 ? "[]" : "") : void 0), G = T === void 0 ? 0 : wf(T, d.min, d.max);
  b.useEffect(() => {
    if (g)
      return d.thumbs.add(g), () => {
        d.thumbs.delete(g);
      };
  }, [g, d.thumbs]);
  const w = {
    value: T,
    name: U,
    form: d.form,
    isFormControl: v,
    index: E,
    thumb: g,
    onThumbChange: C,
    percent: G,
    size: _
  };
  return /* @__PURE__ */ S.jsx(Ex, { scope: o, ...w, children: q0(f) ? f(w) : r });
}
zt(j0, "SliderThumbProvider");
var Ws = "SliderThumbTrigger", xx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ zt(function(o, c) {
    const { __scopeSlider: r, ...f } = o, d = eu(Ws, r), h = D0(Ws, r), { index: g, value: C, percent: E, size: _, onThumbChange: v } = w0(
      Ws,
      r
    ), T = ue(c, v), U = H0(g, d.values.length), G = _?.[h.size], w = G ? L0(G, E, h.direction) : 0;
    return /* @__PURE__ */ S.jsx(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [h.startEdge]: `calc(${E}% + ${w}px)`
        },
        children: /* @__PURE__ */ S.jsx(vf.ItemSlot, { scope: r, children: /* @__PURE__ */ S.jsx(
          ie.span,
          {
            role: "slider",
            "aria-label": o["aria-label"] || U,
            "aria-valuemin": d.min,
            "aria-valuenow": C,
            "aria-valuemax": d.max,
            "aria-orientation": d.orientation,
            "data-orientation": d.orientation,
            "data-disabled": d.disabled ? "" : void 0,
            tabIndex: d.disabled ? void 0 : 0,
            ...f,
            ref: T,
            style: C === void 0 ? { display: "none" } : o.style,
            onFocus: qt(o.onFocus, () => {
              d.valueIndexToChangeRef.current = g;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), Cx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ zt(function(o, c) {
    const { __scopeSlider: r, name: f, ...d } = o;
    return /* @__PURE__ */ S.jsx(
      j0,
      {
        __scopeSlider: r,
        name: f,
        internal_do_not_use_render: ({ index: h, isFormControl: g }) => /* @__PURE__ */ S.jsxs(S.Fragment, { children: [
          /* @__PURE__ */ S.jsx(
            xx,
            {
              ...d,
              ref: c,
              __scopeSlider: r
            }
          ),
          g ? /* @__PURE__ */ S.jsx(
            _x,
            {
              __scopeSlider: r
            },
            h
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), Kg = "SliderBubbleInput", _x = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ zt(function({ __scopeSlider: o, onInput: c, ...r }, f) {
    const { index: d, value: h, name: g, form: C } = w0(Kg, o), { userRequestedValues: E } = eu(Kg, o), _ = b.useRef(null), v = ue(_, f), T = b.useRef(!1), U = b.useRef(h), G = b.useRef(E), w = b.useRef(E);
    return b.useEffect(() => {
      const M = _.current;
      if (!M)
        return;
      const K = window.HTMLInputElement.prototype, Y = Object.getOwnPropertyDescriptor(K, "value").set, k = U.current, J = k !== h;
      U.current = h;
      const Q = E !== w.current;
      if (w.current = E, J && Y) {
        const q = E !== G.current;
        G.current = E;
        const L = E?.[d], it = q && (Q && L !== k || L === h);
        T.current = !it;
        const Ot = new Event("input", { bubbles: !0 });
        Y.call(M, h), M.dispatchEvent(Ot), T.current = !1;
      }
    }, [d, h, E]), /* @__PURE__ */ S.jsx(
      ie.input,
      {
        style: { display: "none" },
        name: g,
        form: C,
        ...r,
        ref: v,
        defaultValue: h,
        onInput: qt(c, (M) => {
          T.current && M.stopPropagation();
        })
      }
    );
  }, "SliderBubbleInput")
);
function U0(i = [], o, c) {
  const r = [...i];
  return r[c] = o, r.sort((f, d) => f - d);
}
zt(U0, "getNextSortedValues");
function wf(i, o, c) {
  const d = 100 / (c - o) * (i - o);
  return Fo(d, [0, 100]);
}
zt(wf, "convertValueToPercentage");
function H0(i, o) {
  return o > 2 ? `Value ${i + 1} of ${o}` : o === 2 ? ["Minimum", "Maximum"][i] : void 0;
}
zt(H0, "getLabel");
function B0(i, o) {
  if (i.length === 1) return 0;
  const c = i.map((f) => Math.abs(f - o)), r = Math.min(...c);
  return c.indexOf(r);
}
zt(B0, "getClosestValueIndex");
function L0(i, o, c) {
  const r = i / 2, d = nr([0, 50], [0, r]);
  return (r - d(o) * c) * c;
}
zt(L0, "getThumbInBoundsOffset");
function V0(i) {
  return i.slice(0, -1).map((o, c) => i[c + 1] - o);
}
zt(V0, "getStepsBetweenValues");
function G0(i, o) {
  if (o > 0) {
    const c = V0(i);
    return Math.min(...c) >= o;
  }
  return !0;
}
zt(G0, "hasMinStepsBetweenValues");
function nr(i, o) {
  return (c) => {
    if (i[0] === i[1] || o[0] === o[1]) return o[0];
    const r = (o[1] - o[0]) / (i[1] - i[0]);
    return o[0] + r * (c - i[0]);
  };
}
zt(nr, "linearScale");
function jf(i) {
  if (!Number.isFinite(i)) return 0;
  const o = i.toString();
  if (o.includes("e")) {
    const [r, f] = o.split("e"), d = r.split(".")[1] || "", h = Number(f);
    return Math.max(0, d.length - h);
  }
  const c = o.split(".")[1];
  return c ? c.length : 0;
}
zt(jf, "getDecimalCount");
function ti(i, o) {
  const c = Math.pow(10, o);
  return Math.round(i * c) / c;
}
zt(ti, "roundValue");
function Y0(i, {
  min: o,
  step: c,
  direction: r,
  multiplier: f
}) {
  const d = jf(c), h = (i - o) / c, g = Math.round(h), C = ti(g * c + o, d) === ti(i, d);
  let E;
  return C ? E = g + f * r : r > 0 ? E = Math.ceil(h) : E = Math.floor(h), ti(E * c + o, d);
}
zt(Y0, "getNextStepValue");
function q0(i) {
  return typeof i == "function";
}
zt(q0, "isFunction");
var Ox = Object.defineProperty, nu = (i, o) => Ox(i, "name", { value: o, configurable: !0 }), X0 = {
  Automatic: "automatic",
  Manual: "manual"
}, Uf = "Tabs", [Ax, f2] = /* @__PURE__ */ ta(Uf, [
  x0
]), Q0 = x0(), [zx, Hf] = Ax(Uf), Rx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ nu(function(o, c) {
    const {
      __scopeTabs: r,
      value: f,
      onValueChange: d,
      defaultValue: h,
      orientation: g = "horizontal",
      dir: C,
      activationMode: E = X0.Automatic,
      ..._
    } = o, v = Po(C), [T, U] = li({
      prop: f,
      onChange: d,
      defaultProp: h ?? "",
      caller: Uf
    });
    return /* @__PURE__ */ S.jsx(
      zx,
      {
        scope: r,
        baseId: Pa(),
        value: T,
        onValueChange: U,
        orientation: g,
        dir: v,
        activationMode: E,
        children: /* @__PURE__ */ S.jsx(
          ie.div,
          {
            dir: v,
            "data-orientation": g,
            ..._,
            ref: c
          }
        )
      }
    );
  }, "Tabs")
), Nx = "TabsList", Dx = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ nu(function(o, c) {
    const { __scopeTabs: r, loop: f = !0, ...d } = o, h = Hf(Nx, r), g = Q0(r);
    return /* @__PURE__ */ S.jsx(
      nx,
      {
        asChild: !0,
        ...g,
        orientation: h.orientation,
        dir: h.dir,
        loop: f,
        children: /* @__PURE__ */ S.jsx(
          ie.div,
          {
            role: "tablist",
            "aria-orientation": h.orientation,
            ...d,
            ref: c
          }
        )
      }
    );
  }, "TabsList")
), Mx = "TabsTrigger", wx = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ nu(function(o, c) {
    const { __scopeTabs: r, value: f, disabled: d = !1, ...h } = o, g = Hf(Mx, r), C = Q0(r), E = Bf(g.baseId, f), _ = Lf(g.baseId, f), v = f === g.value;
    return /* @__PURE__ */ S.jsx(
      ux,
      {
        asChild: !0,
        ...C,
        focusable: !d,
        active: v,
        children: /* @__PURE__ */ S.jsx(
          ie.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": v,
            "aria-controls": _,
            "data-state": v ? "active" : "inactive",
            "data-disabled": d ? "" : void 0,
            disabled: d,
            id: E,
            ...h,
            ref: c,
            onMouseDown: qt(o.onMouseDown, (T) => {
              !d && T.button === 0 && T.ctrlKey === !1 ? (T.currentTarget.focus(), g.onValueChange(f)) : T.preventDefault();
            }),
            onKeyDown: qt(o.onKeyDown, (T) => {
              d || T.target !== T.currentTarget || [" ", "Enter"].includes(T.key) && g.onValueChange(f);
            }),
            onFocus: qt(o.onFocus, () => {
              const T = g.activationMode !== X0.Manual;
              !v && !d && T && g.onValueChange(f);
            })
          }
        )
      }
    );
  }, "TabsTrigger")
), jx = "TabsContent", Ux = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ nu(function(o, c) {
    const { __scopeTabs: r, value: f, forceMount: d, children: h, ...g } = o, C = Hf(jx, r), E = Bf(C.baseId, f), _ = Lf(C.baseId, f), v = f === C.value, T = b.useRef(v);
    return b.useEffect(() => {
      const U = requestAnimationFrame(() => T.current = !1);
      return () => cancelAnimationFrame(U);
    }, []), /* @__PURE__ */ S.jsx($o, { present: d || v, children: ({ present: U }) => /* @__PURE__ */ S.jsx(
      ie.div,
      {
        "data-state": v ? "active" : "inactive",
        "data-orientation": C.orientation,
        role: "tabpanel",
        "aria-labelledby": E,
        hidden: !U,
        id: _,
        tabIndex: 0,
        ...g,
        ref: c,
        style: {
          ...o.style,
          animationDuration: T.current ? "0s" : void 0
        },
        children: U && h
      }
    ) });
  }, "TabsContent")
);
function Bf(i, o) {
  return `${i}-trigger-${o}`;
}
nu(Bf, "makeTriggerId");
function Lf(i, o) {
  return `${i}-content-${o}`;
}
nu(Lf, "makeContentId");
const Hx = bf(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Kn({
  className: i,
  variant: o = "default",
  size: c = "default",
  asChild: r = !1,
  ...f
}) {
  const d = r ? by : "button";
  return /* @__PURE__ */ S.jsx(
    d,
    {
      "data-slot": "button",
      "data-variant": o,
      "data-size": c,
      className: Oe(Hx({ variant: o, size: c, className: i })),
      ...f
    }
  );
}
const Bx = (i) => i.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Z0 = (...i) => i.filter((o, c, r) => !!o && o.trim() !== "" && r.indexOf(o) === c).join(" ").trim();
var Lx = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
const Vx = b.forwardRef(
  ({
    color: i = "currentColor",
    size: o = 24,
    strokeWidth: c = 2,
    absoluteStrokeWidth: r,
    className: f = "",
    children: d,
    iconNode: h,
    ...g
  }, C) => b.createElement(
    "svg",
    {
      ref: C,
      ...Lx,
      width: o,
      height: o,
      stroke: i,
      strokeWidth: r ? Number(c) * 24 / Number(o) : c,
      className: Z0("lucide", f),
      ...g
    },
    [
      ...h.map(([E, _]) => b.createElement(E, _)),
      ...Array.isArray(d) ? d : [d]
    ]
  )
);
const zn = (i, o) => {
  const c = b.forwardRef(
    ({ className: r, ...f }, d) => b.createElement(Vx, {
      ref: d,
      iconNode: o,
      className: Z0(`lucide-${Bx(i)}`, r),
      ...f
    })
  );
  return c.displayName = `${i}`, c;
};
const K0 = zn("ArrowUpRight", [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
]);
const Gx = zn("Headphones", [
  [
    "path",
    {
      d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
      key: "1xhozi"
    }
  ]
]);
const Yx = zn("ListMusic", [
  ["path", { d: "M21 15V6", key: "h1cx4g" }],
  ["path", { d: "M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z", key: "8saifv" }],
  ["path", { d: "M12 12H3", key: "18klou" }],
  ["path", { d: "M16 6H3", key: "1wxfjs" }],
  ["path", { d: "M12 18H3", key: "11ftsu" }]
]);
const qx = zn("Menu", [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
]);
const Xx = zn("Pause", [
  ["rect", { x: "14", y: "4", width: "4", height: "16", rx: "1", key: "zuxfzm" }],
  ["rect", { x: "6", y: "4", width: "4", height: "16", rx: "1", key: "1okwgv" }]
]);
const hf = zn("Play", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
const Qx = zn("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
const Zx = zn("SkipBack", [
  ["polygon", { points: "19 20 9 12 19 4 19 20", key: "o2sva" }],
  ["line", { x1: "5", x2: "5", y1: "19", y2: "5", key: "1ocqjk" }]
]);
const Kx = zn("SkipForward", [
  ["polygon", { points: "5 4 15 12 5 20 5 4", key: "16p6eg" }],
  ["line", { x1: "19", x2: "19", y1: "5", y2: "19", key: "futhcm" }]
]);
const kx = zn("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]);
function k0({ ...i }) {
  return /* @__PURE__ */ S.jsx(DT, { "data-slot": "sheet", ...i });
}
function J0({
  ...i
}) {
  return /* @__PURE__ */ S.jsx(wT, { "data-slot": "sheet-trigger", ...i });
}
function Jx({
  ...i
}) {
  return /* @__PURE__ */ S.jsx(h0, { "data-slot": "sheet-close", ...i });
}
function Ix({
  ...i
}) {
  return /* @__PURE__ */ S.jsx(UT, { "data-slot": "sheet-portal", ...i });
}
function Fx({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    HT,
    {
      "data-slot": "sheet-overlay",
      className: Oe(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        i
      ),
      ...o
    }
  );
}
function I0({
  className: i,
  children: o,
  side: c = "right",
  showCloseButton: r = !0,
  ...f
}) {
  return /* @__PURE__ */ S.jsxs(Ix, { children: [
    /* @__PURE__ */ S.jsx(Fx, {}),
    /* @__PURE__ */ S.jsxs(
      VT,
      {
        "data-slot": "sheet-content",
        className: Oe(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          c === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          c === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          c === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          c === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          i
        ),
        ...f,
        children: [
          o,
          r && /* @__PURE__ */ S.jsxs(h0, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ S.jsx(kx, { className: "size-4" }),
            /* @__PURE__ */ S.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function F0({ className: i, ...o }) {
  return /* @__PURE__ */ S.jsx(
    "div",
    {
      "data-slot": "sheet-header",
      className: Oe("flex flex-col gap-1.5 p-4", i),
      ...o
    }
  );
}
function $0({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    qT,
    {
      "data-slot": "sheet-title",
      className: Oe("font-semibold text-foreground", i),
      ...o
    }
  );
}
function P0({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    XT,
    {
      "data-slot": "sheet-description",
      className: Oe("text-sm text-muted-foreground", i),
      ...o
    }
  );
}
function kg({
  className: i,
  defaultValue: o,
  value: c,
  min: r = 0,
  max: f = 100,
  ...d
}) {
  const h = b.useMemo(
    () => Array.isArray(c) ? c : Array.isArray(o) ? o : [r, f],
    [c, o, r, f]
  );
  return /* @__PURE__ */ S.jsxs(
    vx,
    {
      "data-slot": "slider",
      defaultValue: o,
      value: c,
      min: r,
      max: f,
      className: Oe(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        i
      ),
      ...d,
      children: [
        /* @__PURE__ */ S.jsx(
          bx,
          {
            "data-slot": "slider-track",
            className: Oe(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ S.jsx(
              px,
              {
                "data-slot": "slider-range",
                className: Oe(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: h.length }, (g, C) => /* @__PURE__ */ S.jsx(
          Cx,
          {
            "data-slot": "slider-thumb",
            "aria-label": d["aria-label"],
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          C
        ))
      ]
    }
  );
}
function $x({
  className: i,
  orientation: o = "horizontal",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    Rx,
    {
      "data-slot": "tabs",
      "data-orientation": o,
      orientation: o,
      className: Oe(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        i
      ),
      ...c
    }
  );
}
const Px = bf(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-[orientation=horizontal]/tabs:h-9 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Wx({
  className: i,
  variant: o = "default",
  ...c
}) {
  return /* @__PURE__ */ S.jsx(
    Dx,
    {
      "data-slot": "tabs-list",
      "data-variant": o,
      className: Oe(Px({ variant: o }), i),
      ...c
    }
  );
}
function t2({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    wx,
    {
      "data-slot": "tabs-trigger",
      className: Oe(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:bg-background data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 dark:data-[state=active]:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        i
      ),
      ...o
    }
  );
}
function e2({
  className: i,
  ...o
}) {
  return /* @__PURE__ */ S.jsx(
    Ux,
    {
      "data-slot": "tabs-content",
      className: Oe("flex-1 outline-none", i),
      ...o
    }
  );
}
const n2 = bf(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function gf({
  className: i,
  variant: o = "default",
  asChild: c = !1,
  ...r
}) {
  const f = c ? by : "span";
  return /* @__PURE__ */ S.jsx(
    f,
    {
      "data-slot": "badge",
      "data-variant": o,
      className: Oe(n2({ variant: o }), i),
      ...r
    }
  );
}
function l2({ className: i, type: o, ...c }) {
  return /* @__PURE__ */ S.jsx(
    "input",
    {
      type: o,
      "data-slot": "input",
      className: Oe(
        "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        i
      ),
      ...c
    }
  );
}
const Jg = [
  ["Play", "/#library"],
  ["Watch", "/watch/"],
  ["Listen", "/#listen"],
  ["Greatest Hits", "/greatest-hits/"]
], a2 = [
  ["My city", "/city/"],
  ["How giving works", "/#how"],
  ["Read the comic", "/comics/"],
  ["About Tony", "/about/"],
  ["Community Pot", "/community-pot/"],
  ["Newsletter", "/#dispatch"],
  ["Support on Patreon", "https://www.patreon.com/c/PoliticalArcade"]
];
function u2() {
  return /* @__PURE__ */ S.jsxs("div", { className: "pa-ui pa-navigation", children: [
    /* @__PURE__ */ S.jsx("nav", { className: "pa-primary", "aria-label": "Main navigation", children: Jg.map(([i, o]) => /* @__PURE__ */ S.jsx(
      "a",
      {
        href: o,
        "aria-current": o === "/watch/" && location.pathname.startsWith("/watch/") ? "page" : void 0,
        children: i
      },
      o
    )) }),
    /* @__PURE__ */ S.jsxs(k0, { children: [
      /* @__PURE__ */ S.jsx(J0, { asChild: !0, children: /* @__PURE__ */ S.jsxs(Kn, { variant: "outline", className: "pa-menu", children: [
        /* @__PURE__ */ S.jsx(qx, { "aria-hidden": "true" }),
        /* @__PURE__ */ S.jsx("span", { children: "Explore" })
      ] }) }),
      /* @__PURE__ */ S.jsxs(I0, { className: "pa-ui pa-sheet", children: [
        /* @__PURE__ */ S.jsxs(F0, { children: [
          /* @__PURE__ */ S.jsx($0, { children: "Welcome to the arcade." }),
          /* @__PURE__ */ S.jsx(P0, { children: "Play a little. Find your next favorite." })
        ] }),
        /* @__PURE__ */ S.jsx("nav", { "aria-label": "Explore Political Arcades", children: [...Jg, ...a2].map(([i, o]) => /* @__PURE__ */ S.jsx(Jx, { asChild: !0, children: /* @__PURE__ */ S.jsxs("a", { href: o, children: [
          i,
          /* @__PURE__ */ S.jsx(K0, { "aria-hidden": "true", size: 16 })
        ] }) }, o)) }),
        /* @__PURE__ */ S.jsx("p", { className: "pa-note", children: "Free games. Original music. A little good trouble." })
      ] })
    ] })
  ] });
}
function i2({ films: i }) {
  const [o, c] = b.useState(i[0]), [r, f] = b.useState(""), [d, h] = b.useState("All"), [g, C] = b.useState(!1), E = b.useRef(null), _ = i.filter(
    (v) => (d === "All" || d === v.person) && `${v.title} ${v.person} ${v.description}`.toLowerCase().includes(r.toLowerCase())
  );
  return /* @__PURE__ */ S.jsxs("div", { className: "pa-ui pa-watch", children: [
    /* @__PURE__ */ S.jsxs("section", { className: "pa-feature", children: [
      /* @__PURE__ */ S.jsx("div", { className: "pa-screen", children: /* @__PURE__ */ S.jsx(
        "video",
        {
          ref: E,
          controls: !0,
          playsInline: !0,
          preload: "none",
          poster: o.poster,
          src: o.src,
          "aria-label": `${o.title} music video`,
          onError: () => C(!0)
        },
        o.src
      ) }),
      /* @__PURE__ */ S.jsxs("div", { className: "pa-feature-copy", children: [
        /* @__PURE__ */ S.jsx(gf, { children: "THE SCREENING ROOM" }),
        /* @__PURE__ */ S.jsx("h2", { children: o.title }),
        /* @__PURE__ */ S.jsx("p", { children: o.description }),
        /* @__PURE__ */ S.jsxs("div", { className: "pa-actions", children: [
          /* @__PURE__ */ S.jsxs(
            Kn,
            {
              onClick: () => {
                C(!1), E.current?.play().catch(() => C(!0));
              },
              children: [
                /* @__PURE__ */ S.jsx(hf, { "aria-hidden": "true" }),
                "Watch now"
              ]
            }
          ),
          /* @__PURE__ */ S.jsx(Kn, { asChild: !0, variant: "outline", children: /* @__PURE__ */ S.jsxs("a", { href: o.url, children: [
            "Story & credits ",
            /* @__PURE__ */ S.jsx(K0, { "aria-hidden": "true" })
          ] }) })
        ] }),
        g && /* @__PURE__ */ S.jsxs("p", { role: "alert", children: [
          "The video couldn’t start.",
          " ",
          /* @__PURE__ */ S.jsx("a", { href: o.src, children: "Open the video directly" }),
          " or try again."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: "pa-library-heading", children: [
      /* @__PURE__ */ S.jsxs("div", { children: [
        /* @__PURE__ */ S.jsx("p", { className: "pa-eyebrow", children: "THE COLLECTION" }),
        /* @__PURE__ */ S.jsx("h2", { children: "Find your next favorite." })
      ] }),
      /* @__PURE__ */ S.jsxs("label", { className: "pa-search", children: [
        /* @__PURE__ */ S.jsx(Qx, { "aria-hidden": "true", size: 18 }),
        /* @__PURE__ */ S.jsx(
          l2,
          {
            "aria-label": "Search music videos",
            placeholder: "Search videos…",
            value: r,
            onChange: (v) => f(v.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ S.jsxs($x, { value: d, onValueChange: h, children: [
      /* @__PURE__ */ S.jsx(Wx, { "aria-label": "Filter videos by featured candidate", children: ["All", ...new Set(i.map((v) => v.person))].map((v) => /* @__PURE__ */ S.jsx(t2, { value: v, children: v }, v)) }),
      /* @__PURE__ */ S.jsxs(e2, { value: d, children: [
        /* @__PURE__ */ S.jsxs("p", { className: "pa-note", role: "status", children: [
          _.length,
          " ",
          _.length === 1 ? "video" : "videos"
        ] }),
        /* @__PURE__ */ S.jsx("div", { className: "pa-film-grid", children: _.map((v) => /* @__PURE__ */ S.jsxs("article", { className: "pa-film", children: [
          /* @__PURE__ */ S.jsxs(
            "button",
            {
              className: "pa-film-image",
              "aria-label": `Select ${v.title}`,
              onClick: () => {
                c(v), C(!1), document.querySelector(".pa-feature")?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
                  block: "center"
                });
              },
              children: [
                /* @__PURE__ */ S.jsx("img", { src: v.poster, alt: "", loading: "lazy" }),
                /* @__PURE__ */ S.jsx("span", { children: /* @__PURE__ */ S.jsx(hf, { "aria-hidden": "true", size: 20 }) })
              ]
            }
          ),
          /* @__PURE__ */ S.jsxs("div", { className: "pa-film-copy", children: [
            /* @__PURE__ */ S.jsx(gf, { variant: "secondary", children: v.person }),
            /* @__PURE__ */ S.jsx("h3", { children: /* @__PURE__ */ S.jsx("a", { href: v.url, children: v.title }) }),
            /* @__PURE__ */ S.jsx("p", { children: v.description }),
            /* @__PURE__ */ S.jsx(
              Kn,
              {
                variant: "outline",
                onClick: () => {
                  c(v), C(!1), document.querySelector(".pa-feature")?.scrollIntoView({ block: "center" });
                },
                children: "Choose video"
              }
            )
          ] })
        ] }, v.url)) }),
        !_.length && /* @__PURE__ */ S.jsxs("div", { className: "pa-empty", children: [
          /* @__PURE__ */ S.jsx("h3", { children: "No videos found." }),
          /* @__PURE__ */ S.jsx("p", { children: "Try another title or candidate." }),
          /* @__PURE__ */ S.jsx(
            Kn,
            {
              variant: "outline",
              onClick: () => {
                f(""), h("All");
              },
              children: "Clear filters"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
const Ig = (i) => `${Math.floor((i || 0) / 60)}:${String(Math.floor((i || 0) % 60)).padStart(2, "0")}`;
function o2({ tracks: i }) {
  const o = b.useRef(null), [c, r] = b.useState(0), [f, d] = b.useState(!1), [h, g] = b.useState(0), [C, E] = b.useState(0), [_, v] = b.useState(0.8), [T, U] = b.useState(""), [G, w] = b.useState(!1), M = b.useRef(!1), [K, X] = b.useState(!1);
  async function Y() {
    U(""), X(!0);
    try {
      o.current?.error && o.current.load(), await o.current?.play();
    } catch (Q) {
      Q.name !== "AbortError" && U(
        "This track couldn’t start. Try Play again or choose another track."
      );
    } finally {
      X(!1);
    }
  }
  function k(Q) {
    M.current = !0, U("");
    const q = (Q + i.length) % i.length;
    if (q === c) {
      Y();
      return;
    }
    g(0), E(0), r(q);
  }
  b.useEffect(() => {
    M.current && Y();
  }, [c]);
  const J = /* @__PURE__ */ S.jsx("ol", { className: "pa-tracks", children: i.map((Q, q) => /* @__PURE__ */ S.jsx("li", { children: /* @__PURE__ */ S.jsxs(
    "button",
    {
      onClick: () => k(q),
      "aria-label": `Play ${Q[1]}`,
      "aria-current": q === c ? "true" : void 0,
      children: [
        /* @__PURE__ */ S.jsx("span", { className: "pa-track-number", children: q === c && f ? /* @__PURE__ */ S.jsx("span", { "aria-label": "Playing", children: "♫" }) : String(q + 1).padStart(2, "0") }),
        /* @__PURE__ */ S.jsxs("span", { children: [
          /* @__PURE__ */ S.jsx("strong", { children: Q[1] }),
          /* @__PURE__ */ S.jsx("small", { children: Q[2] })
        ] }),
        /* @__PURE__ */ S.jsx("span", { children: Q[3] })
      ]
    }
  ) }, Q[0])) });
  return /* @__PURE__ */ S.jsxs("div", { className: "pa-ui pa-jukebox", children: [
    /* @__PURE__ */ S.jsx(
      "audio",
      {
        ref: o,
        preload: "none",
        src: `/horse/assets/music/${i[c][0]}.mp3`,
        onPlay: () => d(!0),
        onPause: () => d(!1),
        onEnded: () => k(c + 1),
        onError: () => {
          d(!1), X(!1), U(
            "This track is unavailable. Try again or choose another track."
          );
        },
        onLoadedMetadata: () => {
          E(o.current?.duration || 0), o.current && (o.current.volume = _);
        },
        onTimeUpdate: () => g(o.current?.currentTime || 0)
      }
    ),
    /* @__PURE__ */ S.jsxs("div", { className: "pa-player", children: [
      /* @__PURE__ */ S.jsx("div", { className: "pa-record", "aria-hidden": "true", children: /* @__PURE__ */ S.jsx(Gx, { size: 42 }) }),
      /* @__PURE__ */ S.jsxs("div", { className: "pa-now", children: [
        /* @__PURE__ */ S.jsx("p", { className: "pa-eyebrow", role: "status", children: K ? "Loading…" : f ? "NOW PLAYING" : "READY WHEN YOU ARE" }),
        /* @__PURE__ */ S.jsx("h3", { children: i[c][1] }),
        /* @__PURE__ */ S.jsxs("p", { children: [
          i[c][2],
          " · Political Arcades"
        ] })
      ] }),
      /* @__PURE__ */ S.jsxs("div", { className: "pa-transport", children: [
        /* @__PURE__ */ S.jsx(
          Kn,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Previous track",
            onClick: () => k(c - 1),
            children: /* @__PURE__ */ S.jsx(Zx, {})
          }
        ),
        /* @__PURE__ */ S.jsxs(
          Kn,
          {
            "aria-label": f ? "Pause music" : "Play music",
            onClick: () => f ? o.current?.pause() : void Y(),
            children: [
              f ? /* @__PURE__ */ S.jsx(Xx, {}) : /* @__PURE__ */ S.jsx(hf, {}),
              f ? "Pause" : "Play"
            ]
          }
        ),
        /* @__PURE__ */ S.jsx(
          Kn,
          {
            variant: "outline",
            size: "icon",
            "aria-label": "Next track",
            onClick: () => k(c + 1),
            children: /* @__PURE__ */ S.jsx(Kx, {})
          }
        )
      ] }),
      /* @__PURE__ */ S.jsxs("div", { className: "pa-progress", children: [
        /* @__PURE__ */ S.jsx("span", { children: Ig(h) }),
        /* @__PURE__ */ S.jsx(
          kg,
          {
            "aria-label": "Seek within track",
            min: 0,
            max: C || 1,
            step: 1,
            value: [h],
            disabled: !C,
            onValueChange: ([Q]) => {
              o.current && (o.current.currentTime = Q), g(Q);
            }
          }
        ),
        /* @__PURE__ */ S.jsx("span", { children: Ig(C) })
      ] }),
      /* @__PURE__ */ S.jsxs("div", { className: "pa-player-bottom", children: [
        /* @__PURE__ */ S.jsxs("label", { className: "pa-volume", children: [
          "Volume",
          /* @__PURE__ */ S.jsx(
            kg,
            {
              "aria-label": "Volume",
              min: 0,
              max: 1,
              step: 0.05,
              value: [_],
              onValueChange: ([Q]) => {
                v(Q), o.current && (o.current.volume = Q);
              }
            }
          )
        ] }),
        /* @__PURE__ */ S.jsxs(k0, { open: G, onOpenChange: w, children: [
          /* @__PURE__ */ S.jsx(J0, { asChild: !0, children: /* @__PURE__ */ S.jsxs(Kn, { variant: "outline", children: [
            /* @__PURE__ */ S.jsx(Yx, {}),
            "Queue · ",
            i.length
          ] }) }),
          /* @__PURE__ */ S.jsxs(I0, { className: "pa-ui pa-sheet pa-queue", children: [
            /* @__PURE__ */ S.jsxs(F0, { children: [
              /* @__PURE__ */ S.jsx($0, { children: "The soundtrack" }),
              /* @__PURE__ */ S.jsx(P0, { children: "Choose a track. Music starts only when you press play." })
            ] }),
            J
          ] })
        ] })
      ] }),
      T && /* @__PURE__ */ S.jsx("p", { role: "alert", className: "pa-error", children: T })
    ] }),
    /* @__PURE__ */ S.jsxs("div", { className: "pa-desktop-tracks", children: [
      /* @__PURE__ */ S.jsxs("h3", { children: [
        "On the jukebox",
        " ",
        /* @__PURE__ */ S.jsxs(gf, { variant: "secondary", children: [
          i.length,
          " tracks"
        ] })
      ] }),
      J
    ] })
  ] });
}
function W0(i, o) {
  const c = document.createElement("div");
  i.after(c), Wg.createRoot(c).render(o), i.classList.add("pa-replaced");
}
const tf = document.querySelector("#site-nav");
if (tf) {
  const i = document.createElement("div");
  i.className = "pa-nav-host", tf.after(i), Wg.createRoot(i).render(/* @__PURE__ */ S.jsx(u2, {})), tf.classList.add("pa-replaced"), document.querySelector("#menu-toggle")?.classList.add("pa-replaced");
}
const Fg = document.querySelector("[data-pa-watch]");
Fg && W0(
  Fg,
  /* @__PURE__ */ S.jsx(
    i2,
    {
      films: JSON.parse(document.getElementById("pa-films").textContent)
    }
  )
);
const $g = document.querySelector("[data-pa-jukebox]");
$g && W0(
  $g,
  /* @__PURE__ */ S.jsx(
    o2,
    {
      tracks: JSON.parse(document.getElementById("pa-tracks").textContent)
    }
  )
);
document.addEventListener(
  "play",
  (i) => {
    const o = i.target;
    o instanceof HTMLMediaElement && !o.muted && document.querySelectorAll("audio,video").forEach((c) => {
      c !== o && c instanceof HTMLMediaElement && !c.muted && c.pause();
    });
  },
  !0
);
