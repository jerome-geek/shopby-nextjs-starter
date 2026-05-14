/*! Build Date: 1/21/2026, 4:25:38 AM */
!(function (e, t) {
    'object' == typeof exports && 'object' == typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
          ? define([], t)
          : 'object' == typeof exports
            ? (exports.ShopbyExternalScript = t())
            : (e.ShopbyExternalScript = t());
})(this, () =>
    (() => {
        'use strict';
        var e,
            t,
            r = {
                d: (e, t) => {
                    for (var n in t)
                        r.o(t, n) &&
                            !r.o(e, n) &&
                            Object.defineProperty(e, n, {
                                enumerable: !0,
                                get: t[n],
                            });
                },
                o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
            },
            n = {};
        r.d(n, { default: () => V });
        var i = 'COMMON_HEAD',
            o = 'PAGE_SCRIPT',
            c = 'COMMON_FOOTER',
            a = {
                MAIN: 'MAIN',
                PRODUCT: 'PRODUCT',
                PRODUCT_LIST: 'PRODUCT_LIST',
                PRODUCT_SEARCH: 'PRODUCT_SEARCH',
                CART: 'CART',
                ORDER: 'ORDER',
                ORDER_DETAIL: 'ORDER_DETAIL',
                ORDER_COMPLETE: 'ORDER_COMPLETE',
                DISPLAY_SECTION: 'DISPLAY_SECTION',
                MEMBER_JOIN_COMPLETE: 'MEMBER_JOIN_COMPLETE',
                MY_PAGE: 'MY_PAGE',
                LOGIN: 'LOGIN',
            },
            u =
                (((e = { COMMON: ['getPlatform', 'profile'] })[a.MAIN] = []),
                (e[a.PRODUCT] = ['product']),
                (e[a.PRODUCT_SEARCH] = ['searchedProduct']),
                (e[a.PRODUCT_LIST] = ['searchedProduct', 'currentCategory']),
                (e[a.DISPLAY_SECTION] = ['displaySection']),
                (e[a.CART] = ['cart']),
                (e[a.ORDER] = ['orderSheet']),
                (e[a.ORDER_DETAIL] = ['order']),
                (e[a.ORDER_COMPLETE] = ['order']),
                (e[a.MEMBER_JOIN_COMPLETE] = []),
                (e[a.MY_PAGE] = [
                    'profileInquiriesProgress',
                    'profileInquiriesAnswered',
                    'profileProductInquiriesProgress',
                    'profileProductInquiresAnswered',
                    'profileProductReviewable',
                    'profileProductReviewed',
                    'profileOrdersSummaryStatus',
                ]),
                (e[a.LOGIN] = []),
                e),
            s = 'sb',
            l = (((t = {})[i] = 0), (t[o] = 1), (t[c] = 2), t),
            p = 'shopby-external-script',
            f = 'shopby-page-script',
            h = 'shopby-external-script-common-head',
            d = 'shopby-external-script-common-footer',
            v = function (e, t) {
                var r = 'function' == typeof Symbol && e[Symbol.iterator];
                if (!r) return e;
                var n,
                    i,
                    o = r.call(e),
                    c = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                        c.push(n.value);
                } catch (e) {
                    i = { error: e };
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                return c;
            },
            y = function () {
                var e = this;
                ((this.totalProperties = {}),
                    (this.propertyTrackers = {}),
                    (this.track = function (t, r) {
                        (e.propertyTrackers[t] ||
                            (e.propertyTrackers[t] = new Set()),
                            Object.keys(r).forEach(function (r) {
                                e.propertyTrackers[t].add(r);
                            }));
                    }),
                    (this.isAllPropertiesFilled = function (t) {
                        var r;
                        return (
                            !!t &&
                            (0 === e.totalProperties[t] ||
                                (e.propertyTrackers[t] &&
                                    (null === (r = e.propertyTrackers[t]) ||
                                    void 0 === r
                                        ? void 0
                                        : r.size) === e.totalProperties[t]))
                        );
                    }),
                    (this.clear = function (t) {
                        t
                            ? Object.keys(e.propertyTrackers).forEach(
                                  function (t) {
                                      t.includes('COMMON') ||
                                          delete e.propertyTrackers[t];
                                  },
                              )
                            : (e.propertyTrackers = {});
                    }),
                    Object.entries(u).forEach(function (t) {
                        var r = v(t, 2),
                            n = r[0],
                            i = r[1];
                        e.totalProperties[n] = i.length;
                    }));
            };
        const b = y;
        var S = function (e, t) {
                var r = 'function' == typeof Symbol && e[Symbol.iterator];
                if (!r) return e;
                var n,
                    i,
                    o = r.call(e),
                    c = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                        c.push(n.value);
                } catch (e) {
                    i = { error: e };
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                return c;
            },
            g = function () {
                var e, t, r;
                (null ===
                    (e =
                        null === globalThis || void 0 === globalThis
                            ? void 0
                            : globalThis.naverMarketing) || void 0 === e
                    ? void 0
                    : e.useNaverMarketing) &&
                    (null ===
                        (r =
                            null ===
                                (t =
                                    null === globalThis || void 0 === globalThis
                                        ? void 0
                                        : globalThis.naverMarketing) ||
                            void 0 === t
                                ? void 0
                                : t.setCommonScript) ||
                        void 0 === r ||
                        r.call(t));
            },
            O = function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, o) {
                    function c(e) {
                        try {
                            u(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            u(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function u(e) {
                        var t;
                        e.done
                            ? i(e.value)
                            : ((t = e.value),
                              t instanceof r
                                  ? t
                                  : new r(function (e) {
                                        e(t);
                                    })).then(c, a);
                    }
                    u((n = n.apply(e, t || [])).next());
                });
            },
            T = function (e, t) {
                var r,
                    n,
                    i,
                    o,
                    c = {
                        label: 0,
                        sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    'function' == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (u) {
                        return (function (a) {
                            if (r)
                                throw new TypeError(
                                    'Generator is already executing.',
                                );
                            for (; o && ((o = 0), a[0] && (c = 0)), c; )
                                try {
                                    if (
                                        ((r = 1),
                                        n &&
                                            (i =
                                                2 & a[0]
                                                    ? n.return
                                                    : a[0]
                                                      ? n.throw ||
                                                        ((i = n.return) &&
                                                            i.call(n),
                                                        0)
                                                      : n.next) &&
                                            !(i = i.call(n, a[1])).done)
                                    )
                                        return i;
                                    switch (
                                        ((n = 0),
                                        i && (a = [2 & a[0], i.value]),
                                        a[0])
                                    ) {
                                        case 0:
                                        case 1:
                                            i = a;
                                            break;
                                        case 4:
                                            return (
                                                c.label++,
                                                { value: a[1], done: !1 }
                                            );
                                        case 5:
                                            (c.label++, (n = a[1]), (a = [0]));
                                            continue;
                                        case 7:
                                            ((a = c.ops.pop()), c.trys.pop());
                                            continue;
                                        default:
                                            if (
                                                !((i = c.trys),
                                                (i =
                                                    i.length > 0 &&
                                                    i[i.length - 1]) ||
                                                    (6 !== a[0] && 2 !== a[0]))
                                            ) {
                                                c = 0;
                                                continue;
                                            }
                                            if (
                                                3 === a[0] &&
                                                (!i ||
                                                    (a[1] > i[0] &&
                                                        a[1] < i[3]))
                                            ) {
                                                c.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && c.label < i[1]) {
                                                ((c.label = i[1]), (i = a));
                                                break;
                                            }
                                            if (i && c.label < i[2]) {
                                                ((c.label = i[2]),
                                                    c.ops.push(a));
                                                break;
                                            }
                                            (i[2] && c.ops.pop(), c.trys.pop());
                                            continue;
                                    }
                                    a = t.call(e, c);
                                } catch (e) {
                                    ((a = [6, e]), (n = 0));
                                } finally {
                                    r = i = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, u]);
                    };
                }
            },
            w = function (e, t) {
                var r = 'function' == typeof Symbol && e[Symbol.iterator];
                if (!r) return e;
                var n,
                    i,
                    o = r.call(e),
                    c = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                        c.push(n.value);
                } catch (e) {
                    i = { error: e };
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                return c;
            },
            E = function (e, t, r) {
                if (r || 2 === arguments.length)
                    for (var n, i = 0, o = t.length; i < o; i++)
                        (!n && i in t) ||
                            (n || (n = Array.prototype.slice.call(t, 0, i)),
                            (n[i] = t[i]));
                return e.concat(n || Array.prototype.slice.call(t));
            },
            M = function (e) {
                var t = e.scriptQueue,
                    r = e.pageScriptType,
                    n = e.forceReload,
                    i = this;
                ((this.setPageScriptType = function (e) {
                    i.pageScriptType = e;
                }),
                    (this.setProperty = function (e) {
                        return O(i, void 0, void 0, function () {
                            return T(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return (
                                            this.initializeGlobalObject(),
                                            this.updateGlobalProperties(e),
                                            [4, this.executeQueue(e)]
                                        );
                                    case 1:
                                        return (
                                            t.sent(),
                                            this.processNaverMarketingScript(),
                                            [2]
                                        );
                                }
                            });
                        });
                    }),
                    (this.count = 0),
                    (this.processNaverMarketingScript = function () {
                        if (i.pageScriptType) {
                            var e = i.scriptQueue.hasPageScript(),
                                t = i.scriptQueue.hasCommonHeadScript();
                            if (e) {
                                var r = i.propertyTracker.isAllPropertiesFilled(
                                    i.pageScriptType,
                                );
                                ((i.count += 1),
                                    i.count > 2
                                        ? (i.count = 0)
                                        : r && !t
                                          ? g()
                                          : i.processNaverMarketingScript());
                            }
                        }
                    }),
                    (this.clear = function (e) {
                        if ((i.propertyTracker.clear(e), e))
                            ((i.pageScriptType = null),
                                Object.keys(globalThis[s]).forEach(
                                    function (e) {
                                        var t;
                                        (null == e
                                            ? void 0
                                            : e.includes('COMMON')) ||
                                            ((null === (t = globalThis[s]) ||
                                            void 0 === t
                                                ? void 0
                                                : t.hasOwnProperty(e)) &&
                                                delete globalThis[s][e]);
                                    },
                                ));
                        else {
                            if (
                                i.forceReload.COMMON_HEAD &&
                                i.forceReload.COMMON_FOOTER
                            )
                                return void (globalThis[s] = {});
                            Object.keys(globalThis[s]).forEach(function (e) {
                                var t;
                                ((i.forceReload.COMMON_HEAD &&
                                    i.forceReload.COMMON_FOOTER) ||
                                    !(null == e
                                        ? void 0
                                        : e.includes('COMMON'))) &&
                                    (null === (t = globalThis[s]) ||
                                    void 0 === t
                                        ? void 0
                                        : t.hasOwnProperty(e)) &&
                                    delete globalThis[s][e];
                            });
                        }
                    }),
                    (this.initializeGlobalObject = function () {
                        globalThis[s] || (globalThis[s] = {});
                    }),
                    (this.updateGlobalProperties = function (e) {
                        Object.entries(e).forEach(function (e) {
                            var t = w(e, 2),
                                r = t[0],
                                n = t[1];
                            globalThis[s][r] = n;
                        });
                    }),
                    (this.executeQueue = function (e) {
                        return O(i, void 0, void 0, function () {
                            var t,
                                r = this;
                            return T(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return (
                                            (t = new Set()),
                                            Object.entries(e).forEach(
                                                function (e) {
                                                    var n,
                                                        i = w(e, 2),
                                                        o = i[0],
                                                        c = i[1],
                                                        a = (function (e, t) {
                                                            var r,
                                                                n,
                                                                i =
                                                                    Object.entries(
                                                                        u,
                                                                    ).reduce(
                                                                        function (
                                                                            t,
                                                                            r,
                                                                        ) {
                                                                            var n =
                                                                                    S(
                                                                                        r,
                                                                                        2,
                                                                                    ),
                                                                                i =
                                                                                    n[0],
                                                                                o =
                                                                                    n[1];
                                                                            return (
                                                                                Array.isArray(
                                                                                    o,
                                                                                ) &&
                                                                                    o.includes(
                                                                                        e,
                                                                                    ) &&
                                                                                    t.push(
                                                                                        i,
                                                                                    ),
                                                                                t
                                                                            );
                                                                        },
                                                                        [],
                                                                    );
                                                            return null !==
                                                                (n =
                                                                    null !==
                                                                        (r =
                                                                            null ==
                                                                            i
                                                                                ? void 0
                                                                                : i.find(
                                                                                      function (
                                                                                          e,
                                                                                      ) {
                                                                                          return (
                                                                                              e ===
                                                                                              t
                                                                                          );
                                                                                      },
                                                                                  )) &&
                                                                    void 0 !== r
                                                                        ? r
                                                                        : null ==
                                                                            i
                                                                          ? void 0
                                                                          : i[0]) &&
                                                                void 0 !== n
                                                                ? n
                                                                : null;
                                                        })(o, r.pageScriptType);
                                                    if (a) {
                                                        r.propertyTracker.track(
                                                            a,
                                                            (((n = {})[o] = c),
                                                            n),
                                                        );
                                                        var s = 'COMMON' === a,
                                                            l = s
                                                                ? 'COMMON_HEAD'
                                                                : a;
                                                        (s ||
                                                            r.pageScriptType ===
                                                                l) &&
                                                            t.add(l);
                                                    }
                                                },
                                            ),
                                            [
                                                4,
                                                Promise.all(
                                                    E([], w(t), !1).map(
                                                        function (e) {
                                                            return r.processQueueByKey(
                                                                e,
                                                            );
                                                        },
                                                    ),
                                                ),
                                            ]
                                        );
                                    case 1:
                                        return (n.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (this.processQueueByKey = function (e) {
                        return O(i, void 0, void 0, function () {
                            return T(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return [
                                            4,
                                            this.processHigherPriority(e),
                                        ];
                                    case 1:
                                        return t.sent()
                                            ? this.propertyTracker.isAllPropertiesFilled(
                                                  'COMMON_HEAD' === e ||
                                                      'COMMON_FOOTER' === e
                                                      ? 'COMMON'
                                                      : e,
                                              )
                                                ? [
                                                      4,
                                                      this.scriptQueue.process(
                                                          e,
                                                      ),
                                                  ]
                                                : [3, 4]
                                            : [2];
                                    case 2:
                                        return (
                                            t.sent(),
                                            [4, this.processLowerPriority(e)]
                                        );
                                    case 3:
                                        (t.sent(), (t.label = 4));
                                    case 4:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (this.processHigherPriority = function (e) {
                        return O(i, void 0, void 0, function () {
                            var t, r;
                            return T(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return null === (r = l[e]) ||
                                            void 0 === r ||
                                            r
                                            ? ((t =
                                                  this.scriptQueue.getFirstObjectKey()),
                                              e === t
                                                  ? [2, !0]
                                                  : this.propertyTracker.isAllPropertiesFilled(
                                                          (
                                                              null == t
                                                                  ? void 0
                                                                  : t.includes(
                                                                        'COMMON',
                                                                    )
                                                          )
                                                              ? 'COMMON'
                                                              : t,
                                                      )
                                                    ? [
                                                          4,
                                                          this.scriptQueue.process(
                                                              t,
                                                          ),
                                                      ]
                                                    : [2, !1])
                                            : [2, !0];
                                    case 1:
                                        return (
                                            n.sent(),
                                            [4, this.processHigherPriority(e)]
                                        );
                                    case 2:
                                        return (n.sent(), [2, !0]);
                                }
                            });
                        });
                    }),
                    (this.processLowerPriority = function (e) {
                        return O(i, void 0, void 0, function () {
                            var t, r;
                            return T(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return (t =
                                            this.scriptQueue.getFirstObjectKey())
                                            ? ((r =
                                                  this.pageScriptType ||
                                                  'COMMON'),
                                              this.propertyTracker.isAllPropertiesFilled(
                                                  r,
                                              )
                                                  ? [
                                                        4,
                                                        this.scriptQueue.process(
                                                            t,
                                                        ),
                                                    ]
                                                  : [2])
                                            : [2];
                                    case 1:
                                        return (
                                            n.sent(),
                                            [4, this.processLowerPriority(e)]
                                        );
                                    case 2:
                                        return (n.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (this.scriptQueue = t),
                    (this.propertyTracker = new b()),
                    (this.pageScriptType = r),
                    (this.forceReload = n));
            };
        const m = M;
        var P = function () {
                return (
                    (P =
                        Object.assign ||
                        function (e) {
                            for (var t, r = 1, n = arguments.length; r < n; r++)
                                for (var i in (t = arguments[r]))
                                    Object.prototype.hasOwnProperty.call(
                                        t,
                                        i,
                                    ) && (e[i] = t[i]);
                            return e;
                        }),
                    P.apply(this, arguments)
                );
            },
            R = function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, o) {
                    function c(e) {
                        try {
                            u(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            u(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function u(e) {
                        var t;
                        e.done
                            ? i(e.value)
                            : ((t = e.value),
                              t instanceof r
                                  ? t
                                  : new r(function (e) {
                                        e(t);
                                    })).then(c, a);
                    }
                    u((n = n.apply(e, t || [])).next());
                });
            },
            C = function (e, t) {
                var r,
                    n,
                    i,
                    o,
                    c = {
                        label: 0,
                        sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    'function' == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (u) {
                        return (function (a) {
                            if (r)
                                throw new TypeError(
                                    'Generator is already executing.',
                                );
                            for (; o && ((o = 0), a[0] && (c = 0)), c; )
                                try {
                                    if (
                                        ((r = 1),
                                        n &&
                                            (i =
                                                2 & a[0]
                                                    ? n.return
                                                    : a[0]
                                                      ? n.throw ||
                                                        ((i = n.return) &&
                                                            i.call(n),
                                                        0)
                                                      : n.next) &&
                                            !(i = i.call(n, a[1])).done)
                                    )
                                        return i;
                                    switch (
                                        ((n = 0),
                                        i && (a = [2 & a[0], i.value]),
                                        a[0])
                                    ) {
                                        case 0:
                                        case 1:
                                            i = a;
                                            break;
                                        case 4:
                                            return (
                                                c.label++,
                                                { value: a[1], done: !1 }
                                            );
                                        case 5:
                                            (c.label++, (n = a[1]), (a = [0]));
                                            continue;
                                        case 7:
                                            ((a = c.ops.pop()), c.trys.pop());
                                            continue;
                                        default:
                                            if (
                                                !((i = c.trys),
                                                (i =
                                                    i.length > 0 &&
                                                    i[i.length - 1]) ||
                                                    (6 !== a[0] && 2 !== a[0]))
                                            ) {
                                                c = 0;
                                                continue;
                                            }
                                            if (
                                                3 === a[0] &&
                                                (!i ||
                                                    (a[1] > i[0] &&
                                                        a[1] < i[3]))
                                            ) {
                                                c.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && c.label < i[1]) {
                                                ((c.label = i[1]), (i = a));
                                                break;
                                            }
                                            if (i && c.label < i[2]) {
                                                ((c.label = i[2]),
                                                    c.ops.push(a));
                                                break;
                                            }
                                            (i[2] && c.ops.pop(), c.trys.pop());
                                            continue;
                                    }
                                    a = t.call(e, c);
                                } catch (e) {
                                    ((a = [6, e]), (n = 0));
                                } finally {
                                    r = i = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, u]);
                    };
                }
            },
            k = function (e, t) {
                var r = 'function' == typeof Symbol && e[Symbol.iterator];
                if (!r) return e;
                var n,
                    i,
                    o = r.call(e),
                    c = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                        c.push(n.value);
                } catch (e) {
                    i = { error: e };
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                return c;
            },
            A = function (e, t, r) {
                if (r || 2 === arguments.length)
                    for (var n, i = 0, o = t.length; i < o; i++)
                        (!n && i in t) ||
                            (n || (n = Array.prototype.slice.call(t, 0, i)),
                            (n[i] = t[i]));
                return e.concat(n || Array.prototype.slice.call(t));
            },
            x = {
                alpha: 'https://alpha-shop-api.e-ncp.com',
                real:
                    'MISSING_ENV_VAR'.SHOP_API_URL ||
                    'https://shop-api.e-ncp.com',
            },
            N = function (e) {
                var t,
                    r,
                    n = void 0 === e ? {} : e,
                    i = n.apiOption,
                    o = void 0 === i ? {} : i,
                    c = n.pageScriptType,
                    u = this;
                ((this.setEnvironment = function () {
                    return R(u, void 0, void 0, function () {
                        var e;
                        return C(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return this.apiOption.clientId
                                        ? [2]
                                        : [
                                              4,
                                              R(
                                                  void 0,
                                                  void 0,
                                                  void 0,
                                                  function () {
                                                      var e, t;
                                                      return C(
                                                          this,
                                                          function (r) {
                                                              switch (r.label) {
                                                                  case 0:
                                                                      return globalThis.skinEnvironment
                                                                          ? [
                                                                                2,
                                                                                globalThis.skinEnvironment,
                                                                            ]
                                                                          : [
                                                                                4,
                                                                                fetch(
                                                                                    '/environment.json',
                                                                                ),
                                                                            ];
                                                                  case 1:
                                                                      return (
                                                                          (e =
                                                                              r.sent()),
                                                                          (t =
                                                                              globalThis),
                                                                          [
                                                                              4,
                                                                              e.json(),
                                                                          ]
                                                                      );
                                                                  case 2:
                                                                      return (
                                                                          (t.skinEnvironment =
                                                                              r.sent()),
                                                                          [
                                                                              2,
                                                                              globalThis.skinEnvironment,
                                                                          ]
                                                                      );
                                                              }
                                                          },
                                                      );
                                                  },
                                              ),
                                          ];
                                case 1:
                                    return (
                                        (e = t.sent()),
                                        (this.apiOption.clientId = e.clientId),
                                        (this.profile = e.profile),
                                        [2]
                                    );
                            }
                        });
                    });
                }),
                    (this.fetchScripts = function () {
                        return R(u, void 0, void 0, function () {
                            var e, t, r, n;
                            return C(this, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return this.apiOption.clientId
                                            ? [3, 2]
                                            : [4, this.setEnvironment()];
                                    case 1:
                                        (i.sent(), (i.label = 2));
                                    case 2:
                                        return (
                                            (e = encodeURIComponent(
                                                A(
                                                    [],
                                                    k(this.pageTypes),
                                                    !1,
                                                ).join(','),
                                            )),
                                            (t = ''
                                                .concat(
                                                    x[this.profile],
                                                    '/page/scripts?pageTypes=',
                                                )
                                                .concat(e)),
                                            [
                                                4,
                                                fetch(t, {
                                                    headers: P(
                                                        { version: '1.1' },
                                                        this.apiOption,
                                                    ),
                                                }),
                                            ]
                                        );
                                    case 3:
                                        return (r = i.sent()).ok
                                            ? [3, 5]
                                            : [4, r.json()];
                                    case 4:
                                        throw (
                                            (n = i.sent()),
                                            new Error(JSON.stringify(n))
                                        );
                                    case 5:
                                        return [2, r.json()];
                                }
                            });
                        });
                    }),
                    (this.apiOption = P(
                        {
                            language: 'ko',
                            platform: (
                                r
                                    ? !r.toLowerCase().includes('pc')
                                    : /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
                                          navigator.userAgent,
                                      )
                            )
                                ? 'MOBILE_WEB'
                                : 'PC',
                            clientId: '',
                        },
                        o,
                    )),
                    (this.profile = (
                        null === (t = this.apiOption) || void 0 === t
                            ? void 0
                            : t.profile
                    )
                        ? this.apiOption.profile
                        : 'real'),
                    (this.pageTypes = new Set([
                        'COMMON_HEAD',
                        'COMMON_FOOTER',
                    ])),
                    c
                        ? this.pageTypes.add(c)
                        : (this.pageTypes = new Set(
                              A(
                                  A([], k(Object.keys(a)), !1),
                                  k(this.pageTypes),
                                  !1,
                              ),
                          )));
            };
        const _ = N;
        var I = function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, o) {
                    function c(e) {
                        try {
                            u(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            u(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function u(e) {
                        var t;
                        e.done
                            ? i(e.value)
                            : ((t = e.value),
                              t instanceof r
                                  ? t
                                  : new r(function (e) {
                                        e(t);
                                    })).then(c, a);
                    }
                    u((n = n.apply(e, t || [])).next());
                });
            },
            L = function (e, t) {
                var r,
                    n,
                    i,
                    o,
                    c = {
                        label: 0,
                        sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    'function' == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (u) {
                        return (function (a) {
                            if (r)
                                throw new TypeError(
                                    'Generator is already executing.',
                                );
                            for (; o && ((o = 0), a[0] && (c = 0)), c; )
                                try {
                                    if (
                                        ((r = 1),
                                        n &&
                                            (i =
                                                2 & a[0]
                                                    ? n.return
                                                    : a[0]
                                                      ? n.throw ||
                                                        ((i = n.return) &&
                                                            i.call(n),
                                                        0)
                                                      : n.next) &&
                                            !(i = i.call(n, a[1])).done)
                                    )
                                        return i;
                                    switch (
                                        ((n = 0),
                                        i && (a = [2 & a[0], i.value]),
                                        a[0])
                                    ) {
                                        case 0:
                                        case 1:
                                            i = a;
                                            break;
                                        case 4:
                                            return (
                                                c.label++,
                                                { value: a[1], done: !1 }
                                            );
                                        case 5:
                                            (c.label++, (n = a[1]), (a = [0]));
                                            continue;
                                        case 7:
                                            ((a = c.ops.pop()), c.trys.pop());
                                            continue;
                                        default:
                                            if (
                                                !((i = c.trys),
                                                (i =
                                                    i.length > 0 &&
                                                    i[i.length - 1]) ||
                                                    (6 !== a[0] && 2 !== a[0]))
                                            ) {
                                                c = 0;
                                                continue;
                                            }
                                            if (
                                                3 === a[0] &&
                                                (!i ||
                                                    (a[1] > i[0] &&
                                                        a[1] < i[3]))
                                            ) {
                                                c.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && c.label < i[1]) {
                                                ((c.label = i[1]), (i = a));
                                                break;
                                            }
                                            if (i && c.label < i[2]) {
                                                ((c.label = i[2]),
                                                    c.ops.push(a));
                                                break;
                                            }
                                            (i[2] && c.ops.pop(), c.trys.pop());
                                            continue;
                                    }
                                    a = t.call(e, c);
                                } catch (e) {
                                    ((a = [6, e]), (n = 0));
                                } finally {
                                    r = i = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, u]);
                    };
                }
            },
            j = { meta: 0, base: 1, link: 2, style: 3, title: 4, script: 99 },
            D = function (e) {
                var t = e.forceReload,
                    r = this;
                ((this.appendScriptToHead = function (e) {
                    return I(r, void 0, void 0, function () {
                        return L(this, function (t) {
                            switch (t.label) {
                                case 0:
                                    return [
                                        4,
                                        this.appendScriptsByTarget(
                                            e,
                                            document.head,
                                            h,
                                        ),
                                    ];
                                case 1:
                                    return (t.sent(), [2]);
                            }
                        });
                    });
                }),
                    (this.appendScriptToBody = function (e) {
                        return I(r, void 0, void 0, function () {
                            return L(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return [
                                            4,
                                            this.appendScriptsByTarget(
                                                e,
                                                document.body,
                                                f,
                                            ),
                                        ];
                                    case 1:
                                        return (t.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (this.appendScriptToFooter = function (e) {
                        return I(r, void 0, void 0, function () {
                            return L(this, function (t) {
                                switch (t.label) {
                                    case 0:
                                        return [
                                            4,
                                            this.appendScriptsByTarget(
                                                e,
                                                document.body,
                                                d,
                                            ),
                                        ];
                                    case 1:
                                        return (t.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (this.removeShopbyExternalScript = function (e) {
                        (void 0 === e && (e = !1),
                            e
                                ? document
                                      .querySelectorAll('['.concat(f, ']'))
                                      .forEach(function (e) {
                                          return e.remove();
                                      })
                                : (r.forceReload[i] &&
                                      document
                                          .querySelectorAll('['.concat(h, ']'))
                                          .forEach(function (e) {
                                              return e.remove();
                                          }),
                                  r.forceReload[c] &&
                                      document
                                          .querySelectorAll('['.concat(d, ']'))
                                          .forEach(function (e) {
                                              return e.remove();
                                          })));
                    }),
                    (this.appendScriptsByTarget = function (e, t, n) {
                        return I(r, void 0, void 0, function () {
                            var r,
                                i = this;
                            return L(this, function (o) {
                                switch (o.label) {
                                    case 0:
                                        return (
                                            (r = this.getRenderContents(
                                                e,
                                                n,
                                            ).sort(function (e, t) {
                                                var r,
                                                    n,
                                                    i,
                                                    o,
                                                    c,
                                                    a,
                                                    u =
                                                        null !==
                                                            (n =
                                                                null ===
                                                                    (r =
                                                                        null ==
                                                                        e
                                                                            ? void 0
                                                                            : e.tagName) ||
                                                                void 0 === r
                                                                    ? void 0
                                                                    : r.toLowerCase()) &&
                                                        void 0 !== n
                                                            ? n
                                                            : '',
                                                    s =
                                                        null !==
                                                            (o =
                                                                null ===
                                                                    (i =
                                                                        null ==
                                                                        t
                                                                            ? void 0
                                                                            : t.tagName) ||
                                                                void 0 === i
                                                                    ? void 0
                                                                    : i.toLowerCase()) &&
                                                        void 0 !== o
                                                            ? o
                                                            : '';
                                                return (
                                                    (null !== (c = j[u]) &&
                                                    void 0 !== c
                                                        ? c
                                                        : 50) -
                                                    (null !== (a = j[s]) &&
                                                    void 0 !== a
                                                        ? a
                                                        : 50)
                                                );
                                            })),
                                            [
                                                4,
                                                r.reduce(function (e, r) {
                                                    return I(
                                                        i,
                                                        void 0,
                                                        void 0,
                                                        function () {
                                                            var n;
                                                            return L(
                                                                this,
                                                                function (i) {
                                                                    switch (
                                                                        i.label
                                                                    ) {
                                                                        case 0:
                                                                            return [
                                                                                4,
                                                                                e,
                                                                            ];
                                                                        case 1:
                                                                            (i.sent(),
                                                                                (i.label = 2));
                                                                        case 2:
                                                                            return (
                                                                                i.trys.push(
                                                                                    [
                                                                                        2,
                                                                                        4,
                                                                                        ,
                                                                                        5,
                                                                                    ],
                                                                                ),
                                                                                [
                                                                                    4,
                                                                                    this.appendElementSequentially(
                                                                                        r,
                                                                                        t,
                                                                                    ),
                                                                                ]
                                                                            );
                                                                        case 3:
                                                                            return (
                                                                                i.sent(),
                                                                                [
                                                                                    3,
                                                                                    5,
                                                                                ]
                                                                            );
                                                                        case 4:
                                                                            return (
                                                                                (n =
                                                                                    i.sent()),
                                                                                console.warn(
                                                                                    '[ShopbyExternalScript] 스크립트 실행 실패 → 다음으로 계속 진행',
                                                                                    n,
                                                                                ),
                                                                                [
                                                                                    3,
                                                                                    5,
                                                                                ]
                                                                            );
                                                                        case 5:
                                                                            return [
                                                                                2,
                                                                            ];
                                                                    }
                                                                },
                                                            );
                                                        },
                                                    );
                                                }, Promise.resolve()),
                                            ]
                                        );
                                    case 1:
                                        return (o.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (this.appendElementSequentially = function (e, t) {
                        return new Promise(function (n, i) {
                            if ('SCRIPT' === e.tagName && e.src) {
                                var o = document.createElement('script');
                                (r.setScriptAttribute(o, e.attributes),
                                    (o.onload = function () {
                                        return n();
                                    }),
                                    (o.onerror = function (e) {
                                        (console.error(
                                            '[ShopbyExternalScript] 외부 스크립트 로딩 실패: '.concat(
                                                o.src,
                                            ),
                                        ),
                                            i(e));
                                    }),
                                    (o.async = !1),
                                    (o.src = e.src),
                                    t.appendChild(o));
                            } else (t.appendChild(e), n());
                        });
                    }),
                    (this.getRenderContents = function (e, t) {
                        var n = document.createElement('div');
                        return (
                            (n.innerHTML = e),
                            Array.from(n.children).map(function (e) {
                                var n;
                                if (
                                    (e.setAttribute(p, 'true'),
                                    t && e.setAttribute(t, 'true'),
                                    'SCRIPT' === e.tagName &&
                                        !e.getAttribute('src'))
                                ) {
                                    var i = document.createElement('script');
                                    return (
                                        (i.type = 'text/javascript'),
                                        (i.innerHTML =
                                            null !== (n = e.innerHTML) &&
                                            void 0 !== n
                                                ? n
                                                : ''),
                                        r.setScriptAttribute(i, e.attributes),
                                        i
                                    );
                                }
                                return e;
                            })
                        );
                    }),
                    (this.setScriptAttribute = function (e, t) {
                        if (e)
                            for (var r = 0; r < t.length; r += 1) {
                                var n = t[r],
                                    i = n.name,
                                    o = n.value;
                                e.setAttribute(i, o);
                            }
                    }),
                    (this.forceReload = t));
            };
        const Q = D;
        var q = function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, o) {
                    function c(e) {
                        try {
                            u(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            u(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function u(e) {
                        var t;
                        e.done
                            ? i(e.value)
                            : ((t = e.value),
                              t instanceof r
                                  ? t
                                  : new r(function (e) {
                                        e(t);
                                    })).then(c, a);
                    }
                    u((n = n.apply(e, t || [])).next());
                });
            },
            H = function (e, t) {
                var r,
                    n,
                    i,
                    o,
                    c = {
                        label: 0,
                        sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    'function' == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (u) {
                        return (function (a) {
                            if (r)
                                throw new TypeError(
                                    'Generator is already executing.',
                                );
                            for (; o && ((o = 0), a[0] && (c = 0)), c; )
                                try {
                                    if (
                                        ((r = 1),
                                        n &&
                                            (i =
                                                2 & a[0]
                                                    ? n.return
                                                    : a[0]
                                                      ? n.throw ||
                                                        ((i = n.return) &&
                                                            i.call(n),
                                                        0)
                                                      : n.next) &&
                                            !(i = i.call(n, a[1])).done)
                                    )
                                        return i;
                                    switch (
                                        ((n = 0),
                                        i && (a = [2 & a[0], i.value]),
                                        a[0])
                                    ) {
                                        case 0:
                                        case 1:
                                            i = a;
                                            break;
                                        case 4:
                                            return (
                                                c.label++,
                                                { value: a[1], done: !1 }
                                            );
                                        case 5:
                                            (c.label++, (n = a[1]), (a = [0]));
                                            continue;
                                        case 7:
                                            ((a = c.ops.pop()), c.trys.pop());
                                            continue;
                                        default:
                                            if (
                                                !((i = c.trys),
                                                (i =
                                                    i.length > 0 &&
                                                    i[i.length - 1]) ||
                                                    (6 !== a[0] && 2 !== a[0]))
                                            ) {
                                                c = 0;
                                                continue;
                                            }
                                            if (
                                                3 === a[0] &&
                                                (!i ||
                                                    (a[1] > i[0] &&
                                                        a[1] < i[3]))
                                            ) {
                                                c.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && c.label < i[1]) {
                                                ((c.label = i[1]), (i = a));
                                                break;
                                            }
                                            if (i && c.label < i[2]) {
                                                ((c.label = i[2]),
                                                    c.ops.push(a));
                                                break;
                                            }
                                            (i[2] && c.ops.pop(), c.trys.pop());
                                            continue;
                                    }
                                    a = t.call(e, c);
                                } catch (e) {
                                    ((a = [6, e]), (n = 0));
                                } finally {
                                    r = i = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, u]);
                    };
                }
            },
            F = function (e, t) {
                var r = 'function' == typeof Symbol && e[Symbol.iterator];
                if (!r) return e;
                var n,
                    i,
                    o = r.call(e),
                    c = [];
                try {
                    for (; (void 0 === t || t-- > 0) && !(n = o.next()).done; )
                        c.push(n.value);
                } catch (e) {
                    i = { error: e };
                } finally {
                    try {
                        n && !n.done && (r = o.return) && r.call(o);
                    } finally {
                        if (i) throw i.error;
                    }
                }
                return c;
            },
            G = function (e, t, r) {
                if (r || 2 === arguments.length)
                    for (var n, i = 0, o = t.length; i < o; i++)
                        (!n && i in t) ||
                            (n || (n = Array.prototype.slice.call(t, 0, i)),
                            (n[i] = t[i]));
                return e.concat(n || Array.prototype.slice.call(t));
            },
            B = function (e) {
                var t = e.forceReload,
                    r = this;
                ((this.queueMap = new Map()),
                    (this.hasPageScript = function () {
                        var e;
                        return (
                            (null ===
                                (e = G([], F(r.queueMap.keys()), !1).filter(
                                    function (e) {
                                        return !e.includes('COMMON');
                                    },
                                )) || void 0 === e
                                ? void 0
                                : e.length) > 0
                        );
                    }),
                    (this.hasCommonHeadScript = function () {
                        return r.queueMap.has('COMMON_HEAD');
                    }),
                    (this.enqueue = function (e, t) {
                        r.queueMap.set(e, t);
                    }),
                    (this.getFirstObjectKey = function () {
                        var e = r.queueMap.entries().next().value;
                        return e ? e[0] : null;
                    }),
                    (this.getQueuedScripts = function () {
                        return r.queueMap;
                    }),
                    (this.process = function (e) {
                        return q(r, void 0, void 0, function () {
                            var t, r;
                            return H(this, function (n) {
                                switch (n.label) {
                                    case 0:
                                        return (
                                            (t = this.queueMap.get(e)),
                                            (r = !e.includes('COMMON')),
                                            t ? [4, t()] : [3, 2]
                                        );
                                    case 1:
                                        (n.sent(),
                                            this.dequeue(e),
                                            r && g(),
                                            (n.label = 2));
                                    case 2:
                                        return [2];
                                }
                            });
                        });
                    }),
                    (this.dequeue = function (e) {
                        r.queueMap.delete(e);
                    }),
                    (this.clear = function () {
                        r.queueMap = new Map();
                    }),
                    (this.prioritizeScripts = function (e) {
                        return e.sort(function (e, t) {
                            var r, n;
                            return (
                                (null !== (r = l[e.pageType]) && void 0 !== r
                                    ? r
                                    : l[o]) -
                                (null !== (n = l[t.pageType]) && void 0 !== n
                                    ? n
                                    : l[o])
                            );
                        });
                    }),
                    (this.forceReload = t));
            };
        const U = B;
        var z = function () {
                return (
                    (z =
                        Object.assign ||
                        function (e) {
                            for (var t, r = 1, n = arguments.length; r < n; r++)
                                for (var i in (t = arguments[r]))
                                    Object.prototype.hasOwnProperty.call(
                                        t,
                                        i,
                                    ) && (e[i] = t[i]);
                            return e;
                        }),
                    z.apply(this, arguments)
                );
            },
            Y = function (e, t, r, n) {
                return new (r || (r = Promise))(function (i, o) {
                    function c(e) {
                        try {
                            u(n.next(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function a(e) {
                        try {
                            u(n.throw(e));
                        } catch (e) {
                            o(e);
                        }
                    }
                    function u(e) {
                        var t;
                        e.done
                            ? i(e.value)
                            : ((t = e.value),
                              t instanceof r
                                  ? t
                                  : new r(function (e) {
                                        e(t);
                                    })).then(c, a);
                    }
                    u((n = n.apply(e, t || [])).next());
                });
            },
            K = function (e, t) {
                var r,
                    n,
                    i,
                    o,
                    c = {
                        label: 0,
                        sent: function () {
                            if (1 & i[0]) throw i[1];
                            return i[1];
                        },
                        trys: [],
                        ops: [],
                    };
                return (
                    (o = { next: a(0), throw: a(1), return: a(2) }),
                    'function' == typeof Symbol &&
                        (o[Symbol.iterator] = function () {
                            return this;
                        }),
                    o
                );
                function a(a) {
                    return function (u) {
                        return (function (a) {
                            if (r)
                                throw new TypeError(
                                    'Generator is already executing.',
                                );
                            for (; o && ((o = 0), a[0] && (c = 0)), c; )
                                try {
                                    if (
                                        ((r = 1),
                                        n &&
                                            (i =
                                                2 & a[0]
                                                    ? n.return
                                                    : a[0]
                                                      ? n.throw ||
                                                        ((i = n.return) &&
                                                            i.call(n),
                                                        0)
                                                      : n.next) &&
                                            !(i = i.call(n, a[1])).done)
                                    )
                                        return i;
                                    switch (
                                        ((n = 0),
                                        i && (a = [2 & a[0], i.value]),
                                        a[0])
                                    ) {
                                        case 0:
                                        case 1:
                                            i = a;
                                            break;
                                        case 4:
                                            return (
                                                c.label++,
                                                { value: a[1], done: !1 }
                                            );
                                        case 5:
                                            (c.label++, (n = a[1]), (a = [0]));
                                            continue;
                                        case 7:
                                            ((a = c.ops.pop()), c.trys.pop());
                                            continue;
                                        default:
                                            if (
                                                !((i = c.trys),
                                                (i =
                                                    i.length > 0 &&
                                                    i[i.length - 1]) ||
                                                    (6 !== a[0] && 2 !== a[0]))
                                            ) {
                                                c = 0;
                                                continue;
                                            }
                                            if (
                                                3 === a[0] &&
                                                (!i ||
                                                    (a[1] > i[0] &&
                                                        a[1] < i[3]))
                                            ) {
                                                c.label = a[1];
                                                break;
                                            }
                                            if (6 === a[0] && c.label < i[1]) {
                                                ((c.label = i[1]), (i = a));
                                                break;
                                            }
                                            if (i && c.label < i[2]) {
                                                ((c.label = i[2]),
                                                    c.ops.push(a));
                                                break;
                                            }
                                            (i[2] && c.ops.pop(), c.trys.pop());
                                            continue;
                                    }
                                    a = t.call(e, c);
                                } catch (e) {
                                    ((a = [6, e]), (n = 0));
                                } finally {
                                    r = i = 0;
                                }
                            if (5 & a[0]) throw a[1];
                            return { value: a[0] ? a[1] : void 0, done: !0 };
                        })([a, u]);
                    };
                }
            },
            J = (function () {
                function e() {
                    var e,
                        r = this;
                    if (
                        ((this.loadedScripts = []),
                        (this.pendingPropertiesQueue = []),
                        (this.propertyUpdateQueue = Promise.resolve()),
                        (this.forceReload =
                            (((e = {})[i] = !0), (e[c] = !0), e)),
                        (this.isInitialized = !0),
                        (this.setScriptLoadingState = function (e) {
                            (void 0 === e && (e = !0),
                                (t.isScriptLoadingInprogress = e));
                        }),
                        (this.fetchScriptsPromise = null),
                        (this.ensureScriptsLoaded = function () {
                            return Y(r, void 0, void 0, function () {
                                var e, r, n;
                                return K(this, function (i) {
                                    switch (i.label) {
                                        case 0:
                                            (this.fetchScriptsPromise ||
                                                (this.fetchScriptsPromise =
                                                    null ===
                                                        (n =
                                                            this
                                                                .scriptFetcher) ||
                                                    void 0 === n
                                                        ? void 0
                                                        : n.fetchScripts()),
                                                (i.label = 1));
                                        case 1:
                                            return (
                                                i.trys.push([1, 3, , 4]),
                                                [4, this.fetchScriptsPromise]
                                            );
                                        case 2:
                                            return (
                                                (e = i.sent()),
                                                this.loadedScripts.length ||
                                                    ((this.loadedScripts = e),
                                                    (t.scripts = e),
                                                    this.setScriptLoadingState(
                                                        !1,
                                                    ),
                                                    this.pendingPropertiesQueue.forEach(
                                                        function (e) {
                                                            return (
                                                                e &&
                                                                t.setGlobalObjectSb(
                                                                    e,
                                                                )
                                                            );
                                                        },
                                                    )),
                                                [3, 4]
                                            );
                                        case 3:
                                            return (
                                                (r = i.sent()),
                                                console.error(
                                                    '스크립트 로딩 실패:',
                                                    r,
                                                ),
                                                (this.fetchScriptsPromise =
                                                    null),
                                                [3, 4]
                                            );
                                        case 4:
                                            return [2];
                                    }
                                });
                            });
                        }),
                        (this.initializePageScripts = function (e, t) {
                            (void 0 === t && (t = !1),
                                r.globalObjectSbManager.setPageScriptType(e));
                            var n;
                            if (t)
                                n = r.loadedScripts.filter(function (t) {
                                    return t.pageType === e;
                                });
                            else if (r.isInitialized) {
                                var o = r.loadedScripts.find(function (e) {
                                        return e.pageType === i;
                                    }),
                                    a = r.loadedScripts.find(function (e) {
                                        return e.pageType === c;
                                    });
                                n = [
                                    o,
                                    r.loadedScripts.find(function (t) {
                                        return t.pageType === e;
                                    }),
                                    a,
                                ].filter(Boolean);
                            } else
                                n = r.loadedScripts.filter(function (t) {
                                    return (
                                        t.pageType === e ||
                                        !(
                                            t.pageType !== i ||
                                            !r.forceReload[i]
                                        ) ||
                                        !(t.pageType !== c || !r.forceReload[c])
                                    );
                                });
                            (r.queueScriptsForExecution(n),
                                (r.isInitialized = !1));
                        }),
                        (this.executeScripts = function (e) {
                            var t = e.pageScriptType;
                            return Y(r, void 0, void 0, function () {
                                var e;
                                return K(this, function (r) {
                                    switch (r.label) {
                                        case 0:
                                            return [
                                                4,
                                                this.ensureScriptsLoaded(),
                                            ];
                                        case 1:
                                            return (
                                                r.sent(),
                                                (e = this.loadedScripts.filter(
                                                    function (e) {
                                                        var r = e.pageType;
                                                        return (
                                                            r.includes(
                                                                'COMMON',
                                                            ) ||
                                                            (t && t === r)
                                                        );
                                                    },
                                                )),
                                                this.queueScriptsForExecution(
                                                    e,
                                                ),
                                                [2]
                                            );
                                    }
                                });
                            });
                        }),
                        (this.queueScriptsForExecution = function (e) {
                            r.scriptQueue
                                .prioritizeScripts(e)
                                .forEach(function (e) {
                                    var t = e.pageType,
                                        n = e.content,
                                        i = r.getScriptLoaderBy(t);
                                    r.scriptQueue.enqueue(t, function () {
                                        return Y(
                                            r,
                                            void 0,
                                            void 0,
                                            function () {
                                                return K(this, function (e) {
                                                    switch (e.label) {
                                                        case 0:
                                                            return [4, i(n)];
                                                        case 1:
                                                            return [
                                                                2,
                                                                e.sent(),
                                                            ];
                                                    }
                                                });
                                            },
                                        );
                                    });
                                });
                        }),
                        (this.getScriptLoaderBy = function (e) {
                            return e === i
                                ? r.scriptLoader.appendScriptToHead
                                : e === c
                                  ? r.scriptLoader.appendScriptToFooter
                                  : r.scriptLoader.appendScriptToBody;
                        }),
                        t._instance)
                    )
                        throw new Error(
                            'ShopbyExternalScript.instance를 사용하세요.',
                        );
                }
                var t;
                return (
                    Object.defineProperty(e, 'instance', {
                        get: function () {
                            return (
                                t._instance || (t._instance = new t()),
                                t._instance
                            );
                        },
                        enumerable: !1,
                        configurable: !0,
                    }),
                    (t = e),
                    (e.scripts = []),
                    (e.isScriptLoadingInprogress = !0),
                    (e.initialize = function (e) {
                        return Y(void 0, void 0, void 0, function () {
                            var r, n;
                            return K(t, function (i) {
                                switch (i.label) {
                                    case 0:
                                        return (
                                            ((r = t.instance).forceReload = z(
                                                z({}, r.forceReload),
                                                null !== (n = e.forceReload) &&
                                                    void 0 !== n
                                                    ? n
                                                    : {},
                                            )),
                                            r.setScriptLoadingState(!0),
                                            (r.scriptFetcher = new _(e)),
                                            (r.scriptQueue = new U({
                                                forceReload: r.forceReload,
                                            })),
                                            (r.scriptLoader = new Q({
                                                forceReload: r.forceReload,
                                            })),
                                            (r.globalObjectSbManager = new m({
                                                scriptQueue: r.scriptQueue,
                                                pageScriptType:
                                                    null == e
                                                        ? void 0
                                                        : e.pageScriptType,
                                                forceReload: r.forceReload,
                                            })),
                                            [4, r.executeScripts(e)]
                                        );
                                    case 1:
                                        return (i.sent(), [2]);
                                }
                            });
                        });
                    }),
                    (e.setPageScriptType = function (e, r) {
                        var n;
                        void 0 === r && (r = !1);
                        var i = t.instance;
                        (null === (n = i.scriptLoader) ||
                            void 0 === n ||
                            n.removeShopbyExternalScript(r),
                            i.ensureScriptsLoaded().then(function () {
                                (i.scriptQueue.clear(),
                                    i.initializePageScripts(e, r));
                            }));
                    }),
                    (e.clearGlobalObjectSb = function (e) {
                        (void 0 === e && (e = !1),
                            t.instance.globalObjectSbManager.clear(e));
                    }),
                    (e.setGlobalObjectSb = function (e) {
                        var r = t.instance;
                        t.isScriptLoadingInprogress
                            ? r.pendingPropertiesQueue.push(e)
                            : (r.propertyUpdateQueue =
                                  r.propertyUpdateQueue.then(function () {
                                      return Y(
                                          void 0,
                                          void 0,
                                          void 0,
                                          function () {
                                              var n;
                                              return K(t, function (t) {
                                                  switch (t.label) {
                                                      case 0:
                                                          return [
                                                              4,
                                                              null ===
                                                                  (n =
                                                                      null == r
                                                                          ? void 0
                                                                          : r.globalObjectSbManager) ||
                                                              void 0 === n
                                                                  ? void 0
                                                                  : n.setProperty(
                                                                        e,
                                                                    ),
                                                          ];
                                                      case 1:
                                                          return [2, t.sent()];
                                                  }
                                              });
                                          },
                                      );
                                  }));
                    }),
                    e
                );
            })();
        const V = J;
        return (n = n.default);
    })(),
);
