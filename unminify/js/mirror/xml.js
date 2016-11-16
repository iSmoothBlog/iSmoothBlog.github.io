CodeMirror.defineMode("xml", function(w, j) {
    var p = w.indentUnit;
    var v = j.multilineTagIndentFactor || 1;
    var b = j.multilineTagIndentPastTag || true;
    var u = j.htmlMode ? {
        autoSelfClosers: {
            area: true,
            base: true,
            br: true,
            col: true,
            command: true,
            embed: true,
            frame: true,
            hr: true,
            img: true,
            input: true,
            keygen: true,
            link: true,
            meta: true,
            param: true,
            source: true,
            track: true,
            wbr: true
        },
        implicitlyClosed: {
            dd: true,
            li: true,
            optgroup: true,
            option: true,
            p: true,
            rp: true,
            rt: true,
            tbody: true,
            td: true,
            tfoot: true,
            th: true,
            tr: true
        },
        contextGrabbers: {
            dd: {
                dd: true,
                dt: true
            },
            dt: {
                dd: true,
                dt: true
            },
            li: {
                li: true
            },
            option: {
                option: true,
                optgroup: true
            },
            optgroup: {
                optgroup: true
            },
            p: {
                address: true,
                article: true,
                aside: true,
                blockquote: true,
                dir: true,
                div: true,
                dl: true,
                fieldset: true,
                footer: true,
                form: true,
                h1: true,
                h2: true,
                h3: true,
                h4: true,
                h5: true,
                h6: true,
                header: true,
                hgroup: true,
                hr: true,
                menu: true,
                nav: true,
                ol: true,
                p: true,
                pre: true,
                section: true,
                table: true,
                ul: true
            },
            rp: {
                rp: true,
                rt: true
            },
            rt: {
                rp: true,
                rt: true
            },
            tbody: {
                tbody: true,
                tfoot: true
            },
            td: {
                td: true,
                th: true
            },
            tfoot: {
                tbody: true
            },
            th: {
                td: true,
                th: true
            },
            thead: {
                tbody: true,
                tfoot: true
            },
            tr: {
                tr: true
            }
        },
        doNotIndent: {
            pre: true
        },
        allowUnquoted: true,
        allowMissing: true
    } : {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: false,
        allowMissing: false
    };
    var a = j.alignCDATA;
    var d, e, f;

    function m(E, D) {
        function B(G) {
            D.tokenize = G;
            return G(E, D)
        }
        var C = E.next();
        if (C == "<") {
            if (E.eat("!")) {
                if (E.eat("[")) {
                    if (E.match("CDATA[")) {
                        return B(t("atom", "]]>"))
                    } else {
                        return null
                    }
                } else {
                    if (E.match("--")) {
                        return B(t("comment", "-->"))
                    } else {
                        if (E.match("DOCTYPE", true, true)) {
                            E.eatWhile(/[\w\._\-]/);
                            return B(x(1))
                        } else {
                            return null
                        }
                    }
                }
            } else {
                if (E.eat("?")) {
                    E.eatWhile(/[\w\._\-]/);
                    D.tokenize = t("meta", "?>");
                    return "meta"
                } else {
                    var z = E.eat("/");
                    d = "";
                    var F;
                    while ((F = E.eat(/[^\s\u00a0=<>\"\'\/?]/))) {
                        d += F
                    }
                    if (!d) {
                        return "tag error"
                    }
                    e = z ? "closeTag" : "openTag";
                    D.tokenize = l;
                    return "tag"
                }
            }
        } else {
            if (C == "&") {
                var A;
                if (E.eat("#")) {
                    if (E.eat("x")) {
                        A = E.eatWhile(/[a-fA-F\d]/) && E.eat(";")
                    } else {
                        A = E.eatWhile(/[\d]/) && E.eat(";")
                    }
                } else {
                    A = E.eatWhile(/[\w\.\-:]/) && E.eat(";")
                }
                return A ? "atom" : "error"
            } else {
                E.eatWhile(/[^&<]/);
                return null
            }
        }
    }

    function l(C, B) {
        var A = C.next();
        if (A == ">" || (A == "/" && C.eat(">"))) {
            B.tokenize = m;
            e = A == ">" ? "endTag" : "selfcloseTag";
            return "tag"
        } else {
            if (A == "=") {
                e = "equals";
                return null
            } else {
                if (A == "<") {
                    B.tokenize = m;
                    B.state = k;
                    B.tagName = B.tagStart = null;
                    var z = B.tokenize(C, B);
                    return z ? z + " error" : "error"
                } else {
                    if (/[\'\"]/.test(A)) {
                        B.tokenize = i(A);
                        B.stringStartCol = C.column();
                        return B.tokenize(C, B)
                    } else {
                        C.eatWhile(/[^\s\u00a0=<>\"\']/);
                        return "word"
                    }
                }
            }
        }
    }

    function i(z) {
        var A = function(C, B) {
            while (!C.eol()) {
                if (C.next() == z) {
                    B.tokenize = l;
                    break
                }
            }
            return "string"
        };
        A.isInAttribute = true;
        return A
    }

    function t(A, z) {
        return function(C, B) {
            while (!C.eol()) {
                if (C.match(z)) {
                    B.tokenize = m;
                    break
                }
                C.next()
            }
            return A
        }
    }

    function x(z) {
        return function(C, B) {
            var A;
            while ((A = C.next()) != null) {
                if (A == "<") {
                    B.tokenize = x(z + 1);
                    return B.tokenize(C, B)
                } else {
                    if (A == ">") {
                        if (z == 1) {
                            B.tokenize = m;
                            break
                        } else {
                            B.tokenize = x(z - 1);
                            return B.tokenize(C, B)
                        }
                    }
                }
            }
            return "meta"
        }
    }

    function q(A, z, B) {
        this.prev = A.context;
        this.tagName = z;
        this.indent = A.indented;
        this.startOfLine = B;
        if (u.doNotIndent.hasOwnProperty(z) || (A.context && A.context.noIndent)) {
            this.noIndent = true
        }
    }

    function s(z) {
        if (z.context) {
            z.context = z.context.prev
        }
    }

    function o(B, A) {
        var z;
        while (true) {
            if (!B.context) {
                return
            }
            z = B.context.tagName.toLowerCase();
            if (!u.contextGrabbers.hasOwnProperty(z) || !u.contextGrabbers[z].hasOwnProperty(A)) {
                return
            }
            s(B)
        }
    }

    function k(z, C, B) {
        if (z == "openTag") {
            B.tagName = d;
            B.tagStart = C.column();
            return c
        } else {
            if (z == "closeTag") {
                var A = false;
                if (B.context) {
                    if (B.context.tagName != d) {
                        if (u.implicitlyClosed.hasOwnProperty(B.context.tagName.toLowerCase())) {
                            s(B)
                        }
                        A = !B.context || B.context.tagName != d
                    }
                } else {
                    A = true
                }
                if (A) {
                    f = "error"
                }
                return A ? y : r
            } else {
                return k
            }
        }
    }

    function r(A, z, B) {
        if (A != "endTag") {
            f = "error";
            return r
        }
        s(B);
        return k
    }

    function y(z, B, A) {
        f = "error";
        return r(z, B, A)
    }

    function c(C, A, D) {
        if (C == "word") {
            f = "attribute";
            return h
        } else {
            if (C == "endTag" || C == "selfcloseTag") {
                var B = D.tagName,
                    z = D.tagStart;
                D.tagName = D.tagStart = null;
                if (C == "selfcloseTag" || u.autoSelfClosers.hasOwnProperty(B.toLowerCase())) {
                    o(D, B.toLowerCase())
                } else {
                    o(D, B.toLowerCase());
                    D.context = new q(D, B, z == D.indented)
                }
                return k
            }
        }
        f = "error";
        return c
    }

    function h(z, B, A) {
        if (z == "equals") {
            return n
        }
        if (!u.allowMissing) {
            f = "error"
        }
        return c(z, B, A)
    }

    function n(z, B, A) {
        if (z == "string") {
            return g
        }
        if (z == "word" && u.allowUnquoted) {
            f = "string";
            return c
        }
        f = "error";
        return c(z, B, A)
    }

    function g(z, B, A) {
        if (z == "string") {
            return g
        }
        return c(z, B, A)
    }
    return {
        startState: function() {
            return {
                tokenize: m,
                state: k,
                indented: 0,
                tagName: null,
                tagStart: null,
                context: null
            }
        },
        token: function(B, A) {
            if (!A.tagName && B.sol()) {
                A.indented = B.indentation()
            }
            if (B.eatSpace()) {
                return null
            }
            d = e = null;
            var z = A.tokenize(B, A);
            if ((z || e) && z != "comment") {
                f = null;
                A.state = A.state(e || z, B, A);
                if (f) {
                    z = f == "error" ? z + " error" : f
                }
            }
            return z
        },
        indent: function(C, z, B) {
            var A = C.context;
            if (C.tokenize.isInAttribute) {
                return C.stringStartCol + 1
            }
            if (A && A.noIndent) {
                return CodeMirror.Pass
            }
            if (C.tokenize != l && C.tokenize != m) {
                return B ? B.match(/^(\s*)/)[0].length : 0
            }
            if (C.tagName) {
                if (b) {
                    return C.tagStart + C.tagName.length + 2
                } else {
                    return C.tagStart + p * v
                }
            }
            if (a && /<!\[CDATA\[/.test(z)) {
                return 0
            }
            if (A && /^<\//.test(z)) {
                A = A.prev
            }
            while (A && !A.startOfLine) {
                A = A.prev
            }
            if (A) {
                return A.indent + p
            } else {
                return 0
            }
        },
        electricChars: "/",
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: j.htmlMode ? "html" : "xml",
        helperType: j.htmlMode ? "html" : "xml"
    }
});
CodeMirror.defineMIME("text/xml", "xml");
CodeMirror.defineMIME("application/xml", "xml");
if (!CodeMirror.mimeModes.hasOwnProperty("text/html")) {
    CodeMirror.defineMIME("text/html", {
        name: "xml",
        htmlMode: true
    })
};