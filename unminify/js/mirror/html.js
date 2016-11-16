CodeMirror.defineMode("htmlmixed", function(b, c) {
    var a = CodeMirror.getMode(b, {
        name: "xml",
        htmlMode: true
    });
    var m = CodeMirror.getMode(b, "css");
    var k = [],
        j = c && c.scriptTypes;
    k.push({
        matches: /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
        mode: CodeMirror.getMode(b, "javascript")
    });
    if (j) {
        for (var d = 0; d < j.length; ++d) {
            var h = j[d];
            k.push({
                matches: h.matches,
                mode: h.mode && CodeMirror.getMode(b, h.mode)
            })
        }
    }
    k.push({
        matches: /./,
        mode: CodeMirror.getMode(b, "text/plain")
    });

    function e(s, q) {
        var o = q.htmlState.tagName;
        var p = a.token(s, q.htmlState);
        if (o == "script" && /\btag\b/.test(p) && s.current() == ">") {
            var t = s.string.slice(Math.max(0, s.pos - 100), s.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
            t = t ? t[1] : "";
            if (t && /[\"\']/.test(t.charAt(0))) {
                t = t.slice(1, t.length - 1)
            }
            for (var n = 0; n < k.length; ++n) {
                var r = k[n];
                if (typeof r.matches == "string" ? t == r.matches : r.matches.test(t)) {
                    if (r.mode) {
                        q.token = l;
                        q.localMode = r.mode;
                        q.localState = r.mode.startState && r.mode.startState(a.indent(q.htmlState, ""))
                    }
                    break
                }
            }
        } else {
            if (o == "style" && /\btag\b/.test(p) && s.current() == ">") {
                q.token = f;
                q.localMode = m;
                q.localState = m.startState(a.indent(q.htmlState, ""))
            }
        }
        return p
    }

    function g(r, n, o) {
        var q = r.current();
        var p = q.search(n),
            i;
        if (p > -1) {
            r.backUp(q.length - p)
        } else {
            if (i = q.match(/<\/?$/)) {
                r.backUp(q.length);
                if (!r.match(n, false)) {
                    r.match(q)
                }
            }
        }
        return o
    }

    function l(n, i) {
        if (n.match(/^<\/\s*script\s*>/i, false)) {
            i.token = e;
            i.localState = i.localMode = null;
            return e(n, i)
        }
        return g(n, /<\/\s*script\s*>/, i.localMode.token(n, i.localState))
    }

    function f(n, i) {
        if (n.match(/^<\/\s*style\s*>/i, false)) {
            i.token = e;
            i.localState = i.localMode = null;
            return e(n, i)
        }
        return g(n, /<\/\s*style\s*>/, m.token(n, i.localState))
    }
    return {
        startState: function() {
            var i = a.startState();
            return {
                token: e,
                localMode: null,
                localState: null,
                htmlState: i
            }
        },
        copyState: function(n) {
            if (n.localState) {
                var i = CodeMirror.copyState(n.localMode, n.localState)
            }
            return {
                token: n.token,
                localMode: n.localMode,
                localState: i,
                htmlState: CodeMirror.copyState(a, n.htmlState)
            }
        },
        token: function(n, i) {
            return i.token(n, i)
        },
        indent: function(n, i) {
            if (!n.localMode || /^\s*<\//.test(i)) {
                return a.indent(n.htmlState, i)
            } else {
                if (n.localMode.indent) {
                    return n.localMode.indent(n.localState, i)
                } else {
                    return CodeMirror.Pass
                }
            }
        },
        innerMode: function(i) {
            return {
                state: i.localState || i.htmlState,
                mode: i.localMode || a
            }
        }
    }
}, "xml", "javascript", "css");
CodeMirror.defineMIME("text/html", "htmlmixed");