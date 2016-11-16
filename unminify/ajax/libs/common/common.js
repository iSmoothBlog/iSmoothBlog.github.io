function x_ajax(t) {
    t.req.success = function(e) {
        if ("html" == t.req.dataType) e && "string" == typeof e ? (t.onData && t.onData(e), attempts = t.attempts || 10) : (attempts--, attempts > 0 ? setTimeout(function() {
            t.req.data.rnd = Math.random(), $.ajax(t.req)
        }, 500) : (t.silent || x_prettyError(text.js_conerror ? text.js_conerror : "Connection error."), t.onFail && t.onFail()));
        else if ("json" == t.req.dataType)
            if (e && "string" == typeof e.status) {
                if ("processing" == e.status) {
                    if (allowProcessing) {
                        var i = setTimeout(function() {
                            t.req.data.rnd = Math.random(), $.ajax(t.req)
                        }, 1e3);
                        if (t.onProcessing) {
                            var n = t.onProcessing(e);
                            "stop" == n && clearTimeout(i)
                        }
                    }
                } else "success" == e.status ? t.onData && t.onData(e) : "error" == e.status && (t.silent || x_prettyError(e.details), t.onError && t.onError(e));
                attempts = t.attempts || 10
            } else attempts--, attempts > 0 ? setTimeout(function() {
                t.req.data.rnd = Math.random(), $.ajax(t.req)
            }, 500) : (t.silent || x_prettyError(text.js_conerror ? text.js_conerror : "Connection error."), t.onFail && t.onFail())
    }, t.req.error = function() {
        t.req.success({})
    }, t.req.data ? t.req.data.rnd = Math.random() : t.req.data = {
        rnd: Math.random()
    }, $.ajax(t.req)
}

function x_prettyError(t) {
    x_prettyAlert(text.js_error ? text.js_error : "Error", t)
}

function x_prettyAlert(t, e) {
    $(".ui-dialog").remove(), jQuery.ui ? $("<div />", {
        "class": "x-pretty-alert"
    }).html(e).dialog({
        height: 140,
        modal: !0,
        resizable: !1,
        title: t,
        position: {
            my: "center",
            at: "center",
            of: window
        }
    }) : alert(e)
}

function randomString() {
    for (var t = "0123456789abcdefghiklmnopqrstuvwxyz", e = 16, i = "", n = 0; e > n; n++) {
        var a = Math.floor(Math.random() * t.length);
        i += t.substring(a, a + 1)
    }
    return i
}

function replaceContent(t, e, i) {
    $(t).fadeTo(125, 0, function() {
        $(t).html(e), $(t).fadeTo(125, 1, function() {
            "undefined" != typeof jQuery.browser && jQuery.browser.msie && $(this).get(0).style.removeAttribute("filter"), void 0 != i && i()
        })
    })
}

function validURL(t) {
    var e = $(t).val();
    return e ? (e = e.replace(/^\s+/, ""), e = e.replace(/\s+$/, ""), 0 == e.length ? !1 : (/^(https?|ftp):\/\//i.test(e) || (e = "http://" + e), $(t).val(e), /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e))) : !1
}

function str2hash(t) {
    t = t.replace(/^#/, "");
    for (var e = t.split("&"), i = {}, n = 0; n < e.length; n++) {
        var a = e[n].split("=");
        i[a[0]] = a[1]
    }
    return i
}

function hash2str(t) {
    var e = "";
    if ("object" == typeof t) {
        for (var i in t) e += i + "=" + t[i] + "&";
        e = e.replace(/&$/, "")
    }
    return "#" + e
}
var text = {};
! function($) {
    "use strict";
    var escape = /["\\\x00-\x1f\x7f-\x9f]/g,
        meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        hasOwn = Object.prototype.hasOwnProperty;
    $.toJSON = "object" == typeof JSON && JSON.stringify ? JSON.stringify : function(t) {
        if (null === t) return "null";
        var e, i, n, a, r = $.type(t);
        if ("undefined" === r) return void 0;
        if ("number" === r || "boolean" === r) return String(t);
        if ("string" === r) return $.quoteString(t);
        if ("function" == typeof t.toJSON) return $.toJSON(t.toJSON());
        if ("date" === r) {
            var o = t.getUTCMonth() + 1,
                s = t.getUTCDate(),
                u = t.getUTCFullYear(),
                c = t.getUTCHours(),
                d = t.getUTCMinutes(),
                l = t.getUTCSeconds(),
                p = t.getUTCMilliseconds();
            return 10 > o && (o = "0" + o), 10 > s && (s = "0" + s), 10 > c && (c = "0" + c), 10 > d && (d = "0" + d), 10 > l && (l = "0" + l), 100 > p && (p = "0" + p), 10 > p && (p = "0" + p), '"' + u + "-" + o + "-" + s + "T" + c + ":" + d + ":" + l + "." + p + 'Z"'
        }
        if (e = [], $.isArray(t)) {
            for (i = 0; i < t.length; i++) e.push($.toJSON(t[i]) || "null");
            return "[" + e.join(",") + "]"
        }
        if ("object" == typeof t) {
            for (i in t)
                if (hasOwn.call(t, i)) {
                    if (r = typeof i, "number" === r) n = '"' + i + '"';
                    else {
                        if ("string" !== r) continue;
                        n = $.quoteString(i)
                    }
                    r = typeof t[i], "function" !== r && "undefined" !== r && (a = $.toJSON(t[i]), e.push(n + ":" + a))
                }
            return "{" + e.join(",") + "}"
        }
    }, $.evalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function(str) {
        return eval("(" + str + ")")
    }, $.secureEvalJSON = "object" == typeof JSON && JSON.parse ? JSON.parse : function(str) {
        var filtered = str.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "");
        if (/^[\],:{}\s]*$/.test(filtered)) return eval("(" + str + ")");
        throw new SyntaxError("Error parsing JSON, source is not valid.")
    }, $.quoteString = function(t) {
        return t.match(escape) ? '"' + t.replace(escape, function(t) {
            var e = meta[t];
            return "string" == typeof e ? e : (e = t.charCodeAt(), "\\u00" + Math.floor(e / 16).toString(16) + (e % 16).toString(16))
        }) + '"' : '"' + t + '"'
    }
}(jQuery),
function(t) {
    t.xCarousel = function(e, i) {
        var n = this;
        n.$el = t(e), n.el = e, n.$el.data("xCarousel", n), n.init = function() {
            n.options = t.extend({}, t.xCarousel.defaultOptions, i);
            var e = n.options;
            n.current = e.start;
            var a = t(n.el),
                r = t("ul", a),
                o = t("li", r);
            o.css({
                overflow: "hidden",
                "float": e.vertical ? "none" : "left"
            }), r.css({
                margin: "0",
                padding: "0",
                position: "relative",
                "list-style-type": "none",
                "z-index": "1"
            }), a.css({
                overflow: "hidden",
                position: "relative",
                "z-index": "2",
                left: "0px"
            }), a.css("visibility", "visible"), e.btnPrev && t(e.btnPrev).click(function() {
                return n.go(n.current - e.visible), !1
            }), e.btnNext && t(e.btnNext).click(function() {
                return n.go(n.current + e.visible), !1
            }), e.mouseWheel && a.mousewheel && a.mousewheel(function(t, i) {
                return n.go(i > 0 ? n.current - e.visible : n.current + e.visible)
            }), n.updateWH(), n.go(n.current)
        }, n.updateWH = function() {
            var e = n.options,
                i = t(n.el),
                a = t("ul", i),
                r = t("li", a),
                o = e.vertical ? "height" : "width";
            r.css({
                width: "100%",
                height: "100%"
            }), a.css({
                width: "100%",
                height: "100%"
            }), r.css(o, (100 / r.size()).toFixed(4) + "%"), r.last().css(o, (99 / r.size()).toFixed(4) + "%"), a.css(o, (100 / e.visible * r.size()).toFixed(4) + "%")
        }, n.go = function(e, i) {
            var a = n.options,
                r = t(n.el),
                o = t("ul", r),
                s = t("li", o),
                u = s.size(),
                c = a.vertical ? "top" : "left";
            0 > e || e > u - 1 || (n.current = e, o.animate("left" == c ? {
                left: -(100 * n.current / a.visible).toFixed(4) + "%"
            } : {
                top: -(100 * n.current / a.visible).toFixed(3) + "%"
            }, i ? 0 : a.speed, a.easing), n.updateButtons(u), a.updateItems && a.updateItems.call())
        }, n.addItem = function(e) {
            var i = n.options,
                a = t(n.el),
                r = t("ul", a);
            r.append(e), n.updateWH();
            var o = t("li", r).size();
            n.current + i.visible < o && n.go(o - o % i.visible), n.updateButtons(o)
        }, n.removeItem = function(e) {
            var i = n.options,
                a = t(n.el),
                r = t("ul", a);
            t(e, r).remove(), n.updateWH();
            var o = t("li", r).size();
            o <= n.current && n.go(o - 1 - (o - 1) % i.visible), n.updateButtons(o)
        }, n.updateButtons = function(e) {
            var i = n.options;
            t(i.btnPrev + "," + i.btnNext).removeClass("disabled"), n.current - i.visible < 0 && t(i.btnPrev).addClass("disabled"), n.current + i.visible > e - 1 && t(i.btnNext).addClass("disabled"), i.updateButtons && i.updateButtons.call()
        }, n.init()
    }, t.xCarousel.defaultOptions = {
        btnPrev: null,
        btnNext: null,
        mouseWheel: !1,
        speed: 200,
        easing: null,
        vertical: !1,
        visible: 3,
        start: 0,
        updateButtons: null,
        updateItems: null
    }, t.fn.xCarousel = function(e, i) {
        if (!e || "string" != typeof e) return this.each(function() {
            new t.xCarousel(this, e)
        });
        var n = this.data("xCarousel");
        if ("addItem" == e) n.addItem(i);
        else if ("removeItem" == e) n.removeItem(i);
        else {
            if ("getCurrent" == e) return n.current;
            "updateWH" == e ? (n.updateWH(), n.go(n.current)) : "setVisible" == e && (n.options.visible = i, n.updateWH(), n.go(0, 1))
        }
    }
}(jQuery),
function(t, e) {
    e.document;
    t.fn.share = function(i) {
        var n = {
                init: function(i) {
                    this.share.settings = t.extend({}, this.share.defaults, i);
                    var n = (this.share.settings, this.share.settings.networks),
                        r = this.share.settings.theme,
                        o = this.share.settings.orientation,
                        s = this.share.settings.affix,
                        u = this.share.settings.margin;
                    return this.each(function() {
                        var i, c = t(this),
                            d = c.attr("id"),
                            l = encodeURIComponent(t(this).attr("data-url")),
                            p = encodeURIComponent(t(this).attr("data-media") || ""),
                            h = encodeURIComponent(t(this).attr("data-title") || "");
                        for (var f in n) f = n[f], i = a.networkDefs[f].url, i = i.replace("|u|", l).replace("|t|", h).replace("|d|", h).replace("|m|", p).replace("|140|", h.substring(0, 130)), t("<a href='" + i + "' title='" + (text.js_share ? text.js_share : "Share this item on") + " " + f + "' class='pop share-" + r + " share-" + r + "-" + f + "'></a>").appendTo(c);
                        t('<div style="clear: both;"></div>').appendTo(c), t("#" + d + ".share-" + r).css("margin", u), "horizontal" != o ? t("#" + d + " a.share-" + r).css("display", "block") : t("#" + d + " a.share-" + r).css("display", "inline-block"), "undefined" != typeof s && (c.addClass("share-affix"), -1 != s.indexOf("right") ? (c.css("left", "auto"), c.css("right", "0px"), -1 != s.indexOf("center") && c.css("top", "40%")) : -1 != s.indexOf("left center") && c.css("top", "40%"), -1 != s.indexOf("bottom") && (c.css("bottom", "0px"), c.css("top", "auto"), -1 != s.indexOf("center") && c.css("left", "40%"))), t("#" + d + " .pop").click(function() {
                            return e.open(t(this).attr("href"), "t", "toolbar=0,resizable=1,status=0,width=640,height=528"), !1
                        })
                    })
                }
            },
            a = {
                networkDefs: {
                    facebook: {
                        url: "http://www.facebook.com/sharer.php?u=|u|"
                    },
                    twitter: {
                        url: "https://twitter.com/home?status=|t|+|u|"
                    },
                    tumblr: {
                        url: "http://www.tumblr.com/share/photo?source=|m|&caption=|t|&click_thru=|u|"
                    },
                    googleplus: {
                        url: "https://plus.google.com/share?url=|u|"
                    },
                    reddit: {
                        url: "http://www.reddit.com/submit?url=|u|&title=|t|"
                    },
                    pinterest: {
                        url: "http://pinterest.com/pin/create/button/?url=|u|&media=|m|&description=|t|"
                    },
                    stumbleupon: {
                        url: "http://www.stumbleupon.com/submit?url=|u|&title=|t|"
                    },
                    vkontakte: {
                        url: "http://vkontakte.ru/share.php?url=|u|&title=|t|"
                    }
                }
            };
        return n[i] ? n[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error('Method "' + i + '" does not exist in social plugin') : n.init.apply(this, arguments)
    }, t.fn.share.defaults = {
        networks: ["facebook", "twitter", "googleplus", "stumbleupon"],
        theme: "icon",
        autoShow: !0,
        margin: "3px",
        orientation: "horizontal"
    }, t.fn.share.settings = {}
}(jQuery, window),
function($) {
    $.timer = function(func, time, autostart) {
        return this.set = function(func, time, autostart) {
            if (this.init = !0, "object" == typeof func) {
                var paramList = ["autostart", "time"];
                for (var arg in paramList) void 0 != func[paramList[arg]] && eval(paramList[arg] + " = func[paramList[arg]]");
                func = func.action
            }
            return "function" == typeof func && (this.action = func), isNaN(time) || (this.intervalTime = time), autostart && !this.active && (this.active = !0, this.setTimer()), this
        }, this.once = function(t) {
            var e = this;
            return isNaN(t) && (t = 0), window.setTimeout(function() {
                e.action()
            }, t), this
        }, this.play = function(t) {
            return this.active || (t ? this.setTimer() : this.setTimer(this.remaining), this.active = !0), this
        }, this.pause = function() {
            return this.active && (this.active = !1, this.remaining -= new Date - this.last, this.clearTimer()), this
        }, this.stop = function() {
            return this.active = !1, this.remaining = this.intervalTime, this.clearTimer(), this
        }, this.toggle = function(t) {
            return this.active ? this.pause() : t ? this.play(!0) : this.play(), this
        }, this.reset = function() {
            return this.active = !1, this.play(!0), this
        }, this.clearTimer = function() {
            window.clearTimeout(this.timeoutObject)
        }, this.setTimer = function(t) {
            var e = this;
            "function" == typeof this.action && (isNaN(t) && (t = this.intervalTime), this.remaining = t, this.last = new Date, this.clearTimer(), this.timeoutObject = window.setTimeout(function() {
                e.go()
            }, t))
        }, this.go = function() {
            this.active && (this.action(), this.setTimer())
        }, this.init ? new $.timer(func, time, autostart) : (this.set(func, time, autostart), this)
    }, $.fn.polyglotLanguageSwitcher = function(t) {
        function e(t) {
            w[t.name] && w[t.name].call($(this), t)
        }

        function i() {
            F || (e({
                name: "beforeOpen",
                element: v,
                instance: m
            }), h.addClass("active"), o(!0), setTimeout(function() {
                F = !0, e({
                    name: "afterOpen",
                    element: v,
                    instance: m
                })
            }, 100))
        }

        function n() {
            F && (e({
                name: "beforeClose",
                element: v,
                instance: m
            }), o(!1), h.removeClass("active"), F = !1, f && f.active && f.clearTimer(), e({
                name: "afterClose",
                element: v,
                instance: m
            }))
        }

        function a() {
            f && f.active && f.pause()
        }

        function r() {
            f && f.play(!1)
        }

        function o(t) {
            "fade" == w.effect ? t ? b.fadeIn(w.animSpeed) : b.fadeOut(w.animSpeed) : t ? b.slideDown(w.animSpeed) : b.slideUp(w.animSpeed)
        }

        function s(t) {
            n();
            var e = $(t).children(":first-child"),
                i = $(e).attr("id"),
                a = $(e).text();
            $(b).children().each(function() {
                $(this).detach()
            });
            for (var r = 0; r < x.length; r++) $(x[r]).children(":first-child").attr("id") != i && b.append(x[r]);
            var o = h.children(":first-child");
            h.attr("id", i), h.text(a), h.append(o)
        }

        function u() {
            $(document).click(function() {
                n()
            }), $(document).keyup(function(t) {
                27 == t.which && n()
            }), "hover" == w.openMode && (f = $.timer(function() {
                n()
            }), f.set({
                time: w.hoverTimeout,
                autostart: !0
            }))
        }

        function c() {
            var t, e = $("#" + g + " > form > select > option");
            if (y) {
                var n, o = window.location.href;
                e.each(function() {
                    var t = $(this).attr("id");
                    o.indexOf("/" + t + "/") >= 0 && (n = t)
                })
            }
            e.each(function() {
                var e, o = $(this).attr("id");
                e = y ? n === o : $(this).attr("selected");
                var s = d($(this));
                e && (t = s), x.push(s), A > 0 ? b.append(s) : (h = $('<a id="' + $(this).attr("id") + '" class="current" href="#">' + $(this).text() + ' <span class="trigger">&raquo;</span></a>'), "hover" == w.openMode ? h.hover(function() {
                    i(), a()
                }, function() {
                    r()
                }).click(function(t) {
                    t.preventDefault()
                }) : h.click(function(t) {
                    t.preventDefault(), i()
                })), A++
            }), $("#" + g + " form:first-child").remove(), v.append(h), v.append(b), t && s(t)
        }

        function d(t) {
            var i, n = $(t).attr("id"),
                o = $(t).attr("value"),
                u = $(t).text();
            if (y) {
                var c = window.location.href,
                    d = c.substring(c.lastIndexOf("/") + 1),
                    h = "/" + w.pagePrefix + n + "/" + d;
                i = $('<li><a id="' + n + '" href="' + h + '">' + u + "</a></li>")
            } else {
                var f = document.URL.replace("#", ""),
                    g = l();
                g[w.paramName] = o, f.indexOf("?") > 0 && (f = f.substring(0, f.indexOf("?"))), f += p(g), i = $('<li><a id="' + n + '" href="' + f + '">' + u + "</a></li>")
            }
            return i.bind("click", function() {
                e({
                    name: "onChange",
                    selectedItem: $(this).children(":first").attr("id"),
                    element: v,
                    instance: m
                }), s($(this))
            }), "hover" == w.openMode && i.hover(function() {
                a()
            }, function() {
                r()
            }), i
        }

        function l() {
            var t = {},
                e = window.location.search.substr(1).split("&");
            if (e.length > 0)
                for (var i = 0; i < e.length; ++i) {
                    var n = e[i].split("=");
                    2 == n.length && (t[n[0]] = decodeURIComponent(n[1].replace(/\+/g, " ")))
                }
            return t
        }

        function p(t) {
            if (w.testMode) return "#";
            var e = "?",
                i = 0;
            for (var n in t) {
                var a = "";
                i > 0 && (a = "&"), e += a + n + "=" + t[n], i++
            }
            return e
        }
        var h, f, m = $.fn.polyglotLanguageSwitcher,
            v = $(this),
            g = $(this).attr("id"),
            b = $('<ul class="dropdown">'),
            A = 0,
            F = !1,
            x = [],
            w = $.extend({}, m.defaults, t),
            y = "static" == w.websiteType;
        return c(), u(), m.open = function() {
            i()
        }, m.close = function() {
            n()
        }, e({
            name: "afterLoad",
            element: v,
            instance: m
        }), m
    };
    var ls = $.fn.polyglotLanguageSwitcher;
    ls.defaults = {
        openMode: "hover",
        hoverTimeout: 1500,
        animSpeed: 200,
        effect: "slide",
        paramName: "lang",
        pagePrefix: "",
        websiteType: "static",
        testMode: !1,
        onChange: 0 / 0,
        afterLoad: 0 / 0,
        beforeOpen: 0 / 0,
        afterOpen: 0 / 0,
        beforeClose: 0 / 0,
        afterClose: 0 / 0
    }
}(jQuery),
function(t) {
    if (void 0 === t.fuckAdBlock) {
        var e = function(e) {
            void 0 !== e && this.setOption(e);
            var i = this,
                n = function() {
                    setTimeout(function() {
                        i._options.checkOnLoad === !0 && (null === i._var.bait && i._creatBait(), setTimeout(function() {
                            i.check()
                        }, 1))
                    }, 1)
                };
            t.addEventListener ? t.addEventListener("load", n, !1) : t.attachEvent("onload", n)
        };
        e.prototype._options = {
            checkOnLoad: !0,
            resetOnEnd: !0,
            loopCheckTime: 50,
            loopMaxNumber: 5,
            baitClass: "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",
            baitStyle: "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;"
        }, e.prototype._var = {
            version: "3.0.1",
            bait: null,
            checking: !1,
            loop: null,
            loopNumber: 0,
            event: {
                detected: [],
                notDetected: []
            }
        }, e.prototype._bait = null, e.prototype.setOption = function(t, e) {
            if (void 0 !== e) {
                var i = t;
                t = {}, t[i] = e
            }
            for (option in t) this._options[option] = t[option];
            return this
        }, e.prototype._creatBait = function() {
            var e = document.createElement("div");
            e.setAttribute("class", this._options.baitClass), e.setAttribute("style", this._options.baitStyle), this._var.bait = t.document.body.appendChild(e), this._var.bait.offsetParent, this._var.bait.offsetHeight, this._var.bait.offsetLeft, this._var.bait.offsetTop, this._var.bait.offsetWidth, this._var.bait.clientHeight, this._var.bait.clientWidth
        }, e.prototype._destroyBait = function() {
            t.document.body.removeChild(this._var.bait), this._var.bait = null
        }, e.prototype.check = function(t) {
            if (void 0 === t && (t = !0), this._var.checking === !0) return !1;
            this._var.checking = !0, null === this._var.bait && this._creatBait();
            var e = this;
            return this._var.loopNumber = 0, t === !0 && (this._var.loop = setInterval(function() {
                e._checkBait(t)
            }, this._options.loopCheckTime)), this._checkBait(t), !0
        }, e.prototype._checkBait = function(e) {
            var i = !1;
            if (null === this._var.bait && this._creatBait(), (null !== t.document.body.getAttribute("abp") || null === this._var.bait.offsetParent || 0 == this._var.bait.offsetHeight || 0 == this._var.bait.offsetLeft || 0 == this._var.bait.offsetTop || 0 == this._var.bait.offsetWidth || 0 == this._var.bait.clientHeight || 0 == this._var.bait.clientWidth) && (i = !0), void 0 !== t.getComputedStyle) {
                var n = t.getComputedStyle(this._var.bait, null);
                ("none" == n.getPropertyValue("display") || "hidden" == n.getPropertyValue("visibility")) && (i = !0)
            }
            e === !0 && (this._var.loopNumber++, this._var.loopNumber >= this._options.loopMaxNumber && (clearInterval(this._var.loop), this._var.loop = null, this._var.loopNumber = 0)), i === !0 ? (e === !0 && (this._var.checking = !1), this._destroyBait(), this.emitEvent(!0)) : (null === this._var.loop || e === !1) && (e === !0 && (this._var.checking = !1), this._destroyBait(), this.emitEvent(!1))
        }, e.prototype.emitEvent = function(t) {
            var e = this._var.event[t === !0 ? "detected" : "notDetected"];
            for (i in e) e[i]();
            return this._options.resetOnEnd === !0 && this.clearEvent(), this
        }, e.prototype.clearEvent = function() {
            this._var.event.detected = [], this._var.event.notDetected = []
        }, e.prototype.on = function(t, e) {
            return this._var.event[t === !0 ? "detected" : "notDetected"].push(e), this
        }, e.prototype.onDetected = function(t) {
            return this.on(!0, t)
        }, e.prototype.onNotDetected = function(t) {
            return this.on(!1, t)
        }, t.fuckAdBlock = new e
    }
}(window), $(function() {
    "undefined" == typeof fuckAdBlock ? $("body").addClass("adb") : fuckAdBlock.onDetected(function() {
        $("body").addClass("adb")
    }).onNotDetected(function() {
        $("body").addClass("no-adb")
    })
}), ! function(t, e) {
    var i = e.createElement("style");
    i.type = "text/css", i.innerHTML = '.bitcoinate{background-image:-webkit-gradient(linear, left top, left bottom, color-stop(0, #f7931a), color-stop(1, #c16c07));background-image:-webkit-linear-gradient(top, #f7931a 0%, #c16c07 100%);background-image:-moz-linear-gradient(top, #f7931a 0%, #c16c07 100%);background-image:-o-linear-gradient(top, #f7931a 0%, #c16c07 100%);background-image:-ms-linear-gradient(top, #f7931a 0%, #c16c07 100%);background-image:linear-gradient(top, #f7931a 0%, #c16c07 100%);font:900 12px/18px Arial,sans-serif;color:#fff;text-shadow:0 -1px 0 rgba(0,0,0,0.5);border:1px solid #c16c07;margin:0;cursor:pointer;}.bitcoinate:hover,.bitcoinate:focus{background-image:-webkit-gradient(linear, left top, left bottom, color-stop(0, #f89e34), color-stop(1, #e88208));background-image:-webkit-linear-gradient(top, #f89e34 0%, #e88208 100%);background-image:-moz-linear-gradient(top, #f89e34 0%, #e88208 100%);background-image:-o-linear-gradient(top, #f89e34 0%, #e88208 100%);background-image:-ms-linear-gradient(top, #f89e34 0%, #e88208 100%);background-image:linear-gradient(top, #f89e34 0%, #e88208 100%)}.bitcoinate span{background-repeat:no-repeat;display:inline-block;vertical-align:middle;position:relative;margin:0 4px 0 0}.bitcoinate[data-size="20"]{padding:0 3px;-webkit-border-radius:2px;border-radius:2px;}.bitcoinate[data-size="20"]:active{-webkit-box-shadow:inset 0 0 4px rgba(0,0,0,0.5);box-shadow:inset 0 0 4px rgba(0,0,0,0.5)}.bitcoinate[data-size="20"] span{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAQAAAC8qkUgAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAACM8AAAjPAXtFbpsAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAAA7UlEQVQY002Pv0sCAQBGP3AOW24paSkayy36Q5ra+w9sqyFwCxtMCIIgKMHEwQqaAoPAiFxaRBDi7AiE47zq6n543WvoSN/2PfiGJ0na3dw/2c6VrwuLmvBwYA8v8nC1nopSo9R4fP7wqrdQri5syJCUhEwRx2c1ZST1j+B9hMGSXYdoXMlLahXAdTSrueIegD2fSj9o3t91vC9oX2omlfE4fAq7PyF8+8eHk7sksiMTXk0pWyuC68hQTmu9PniOTuumBUFw02513oYAbkXBIP6MI5IkgsCKz9ki85/ZXJnKlCRrx3/pLkNv9W//AvkYphZShvCzAAAAAElFTkSuQmCC");width:10px;height:14px;bottom:2px}.bitcoinate[data-size="30"]{padding:0 8px;font-size:18px;line-height:28px;-webkit-border-radius:4px;border-radius:4px;}.bitcoinate[data-size="30"]:active{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.5);box-shadow:inset 0 0 6px rgba(0,0,0,0.5)}.bitcoinate[data-size="30"] span{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAQAAAC1Bg6SAAAAAnNCSVQICFXsRgQAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAZdEVYdFNvZnR3YXJlAHd3dy5pbmtzY2FwZS5vcmeb7jwaAAABYUlEQVQoz2NgAAN+Qf4W/gwGBr5o/hZOWQZ0sFHv//9n9xgY7p7+/3+7HwnSGSDoWPf//8PHDEWXrv3/n9PCYM0gDpV9+QYE3777///P369f//z9///R01UHEuZypTJwAKX/4wDPXjhFgqQt/rt/vAsS+PTuf9r//P9t/55DFBzZD7XgzAIQ99VjCO+/yJ9fIP7bh9ikmRgMn70A8V8eQpF+/owhkSGTu2LqFqj1aSjSP389fPrqzfcfELkdRxkcGViRpFHB3787T+hFIEm/f/Hf7L/Df6//LX9eQ5ScOovF5QwMX00h0t++YJNmFLX59g0k8us7A4M2g+PmnSDOi6cMLgzeDIGseQt3Q3S/PcUwa/7Okx8/gzhfvuw4cejc6SvvP8Ddl8Lw8j6OQP/9vx4UhFv/H/5/9PdFIP/n/wu/gHb+uPB/3v/i/5LUSC1g8F3x//9/JxkY/m0EWmKJEAcA/Mp0SJF0rKkAAAAASUVORK5CYII=");width:15px;height:22px;bottom:2px}.bitcoinate[data-size="50"]{padding:0 12px;font-size:32px;line-height:48px;-webkit-border-radius:5px;border-radius:5px;text-shadow:0 -2px 0 rgba(0,0,0,0.5);}.bitcoinate[data-size="50"]:active{-webkit-box-shadow:inset 0 0 10px rgba(0,0,0,0.5);box-shadow:inset 0 0 10px rgba(0,0,0,0.5)}.bitcoinate[data-size="50"] span{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAkCAYAAAB8DZEQAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAVqgAAFaoBKQGivQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO0SURBVEiJ7ZZPSCNXHMe/bzJNxkkm2ZmMZlnrv2VpUVk2sbgJ9iIUsUJ78bB0QfbUQ/FQWKo3LT0URArdgwfPgULpXvRgQSxtQVLqWsq2AZEG7EK2W7JRkyE1f9DM/Hpwxu2Ok2yypj31Cw++vN+b93nvzfu99xhq620AMdP/AmDV9B8AuGz6VTNWV3ytwOLi4nVFUWIAoGkaZmdnVwFgaWnppiAIVwAgk8kk5+fnXwipqWQyuUKmdnd3v7Pqs9nsY6t+c3Pz40b64l56FE3oP4HwAN53Cuzv7wctr2laAMBdAFy1Wj37jzs7O9cAvAtgH8BjAE8cIVNTUzGngCRJiuUVRVHm5uZiPM8zQRDarHq/398ZDAZjh4eHJ2ZVFsADAD8/1xldUIZhUC6Xy29tbSWnp6fjHMd9gtPt3zqIXZlMJjs8PHwPwNC/BiEiyufz2tjY2EcWgxFR2PRBAHfM8pxyuVxaUZR7ALz/KG8AeNPpfwLA+vr6jxMTE28BKNuXjj86OirYR7a3t/eTU0dEdIOIEk6z0TStoKqqBNjyhDFWrVQqZacOncQY+7VcLr/nFAsEAtL29rZyDvIyEkXxUqFQ+Msp1tfXVwTqHJAvEA/gCoCbvb29Q5Ik+ewNiOgPxthhw5BSqSQC+BCAxyw8AEQiESkej7/DGGP2bxhjnzPGqGGIKIrSzMxMVJZlwe/3ewKBgGdwcLAzHA6/znHcuSXf2NiIj4+Pf1Wzw4ODg6cXyZFUKvVoYGDgMwDzON3mrYcQEem6ricSiYeyLH+KZ7dofYhhGFUiqjQLS6fTTxRFudUQxEpGInIRkUREl4noKhHdJqJvicioBVpeXv6iKUgtEVFU13XHmabT6UctuRkZYw9SqdTXTjGfzye16voVE4mE7hgQRd6eJy4iOpdYdeQHEAEw1N/f/5pTA13X/+QBXANgHfedhmGcm12lUhEA3ALgxrOs9wDwi6LoWlhYCI+MjNxwgnAct8J3dXUNBAKBGABMTk52q6qq2BsSkScSiURVVfWoquqRZdkty7InGo2+Ojo6GpYkyVtrqoIgrGBtbe1+s/u/Cd0nIsaFQqGrddb8IvoSwG3GGOHk5ORhC0euE9E3dJqkLovG8zz/O4Cn9mGUSqWIKIodAHB8fFxwu92/AXBVq9XrPM+/AgDFYnHX6/V+DyBtlh8YY+mG5/r/g7spSEdHR97y7e3tZ97n8xUt39PTk7d/1xQkFAoVLB8MBs9eI21tbRXLd3d3O75S7PobZkIr5VWOUa4AAAAASUVORK5CYII=");width:25px;height:36px;margin:0 8px 0 0;bottom:4px}', e.getElementsByTagName("head")[0].appendChild(i), e.addEventListener("DOMContentLoaded", function() {
        var i, n, a = e.getElementsByClassName("bitcoinate"),
            r = "Please donate bitcoins to: ";
        for (n = 0; n < a.length; n++) a[n].title = r + a[n].dataset.address, a[n].innerHTML = "<span></span>bitcoinate", a[n].addEventListener("click", function() {
            i = this.dataset, "URI" == i.type ? t.location.href = "bitcoin:" + i.address + "?amount=" + i.address + "&label=" + i.label : t.prompt(r, i.address)
        }, !1)
    }, !1)
}(window, document);