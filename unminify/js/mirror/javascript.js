CodeMirror.defineMode("javascript", function(W, ag) {
    var i = W.indentUnit;
    var w = ag.statementIndent;
    var v = ag.json;
    var e = ag.typescript;
    var am = function() {
        function aJ(aL) {
            return {
                type: aL,
                style: "keyword"
            }
        }
        var aE = aJ("keyword a"),
            aC = aJ("keyword b"),
            aB = aJ("keyword c");
        var aD = aJ("operator"),
            aH = {
                type: "atom",
                style: "atom"
            };
        var aF = {
            "if": aJ("if"),
            "while": aE,
            "with": aE,
            "else": aC,
            "do": aC,
            "try": aC,
            "finally": aC,
            "return": aB,
            "break": aB,
            "continue": aB,
            "new": aB,
            "delete": aB,
            "throw": aB,
            "debugger": aB,
            "var": aJ("var"),
            "const": aJ("var"),
            let: aJ("var"),
            "function": aJ("function"),
            "catch": aJ("catch"),
            "for": aJ("for"),
            "switch": aJ("switch"),
            "case": aJ("case"),
            "default": aJ("default"),
            "in": aD,
            "typeof": aD,
            "instanceof": aD,
            "true": aH,
            "false": aH,
            "null": aH,
            "undefined": aH,
            "NaN": aH,
            "Infinity": aH,
            "this": aJ("this"),
            module: aJ("module"),
            "class": aJ("class"),
            "super": aJ("atom"),
            yield: aB,
            "export": aJ("export"),
            "import": aJ("import"),
            "extends": aB
        };
        if (e) {
            var aK = {
                type: "variable",
                style: "variable-3"
            };
            var aG = {
                "interface": aJ("interface"),
                "extends": aJ("extends"),
                constructor: aJ("constructor"),
                "public": aJ("public"),
                "private": aJ("private"),
                "protected": aJ("protected"),
                "static": aJ("static"),
                string: aK,
                number: aK,
                bool: aK,
                any: aK
            };
            for (var aI in aG) {
                aF[aI] = aG[aI]
            }
        }
        return aF
    }();
    var L = /[+\-*&%=<>!?|~^]/;

    function B(aE) {
        var aC = false,
            aB, aD = false;
        while ((aB = aE.next()) != null) {
            if (!aC) {
                if (aB == "/" && !aD) {
                    return
                }
                if (aB == "[") {
                    aD = true
                } else {
                    if (aD && aB == "]") {
                        aD = false
                    }
                }
            }
            aC = !aC && aB == "\\"
        }
    }
    var O, C;

    function H(aD, aC, aB) {
        O = aD;
        C = aB;
        return aC
    }

    function Q(aF, aD) {
        var aB = aF.next();
        if (aB == '"' || aB == "'") {
            aD.tokenize = N(aB);
            return aD.tokenize(aF, aD)
        } else {
            if (aB == "." && aF.match(/^\d+(?:[eE][+\-]?\d+)?/)) {
                return H("number", "number")
            } else {
                if (aB == "." && aF.match("..")) {
                    return H("spread", "meta")
                } else {
                    if (/[\[\]{}\(\),;\:\.]/.test(aB)) {
                        return H(aB)
                    } else {
                        if (aB == "=" && aF.eat(">")) {
                            return H("=>", "operator")
                        } else {
                            if (aB == "0" && aF.eat(/x/i)) {
                                aF.eatWhile(/[\da-f]/i);
                                return H("number", "number")
                            } else {
                                if (/\d/.test(aB)) {
                                    aF.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
                                    return H("number", "number")
                                } else {
                                    if (aB == "/") {
                                        if (aF.eat("*")) {
                                            aD.tokenize = at;
                                            return at(aF, aD)
                                        } else {
                                            if (aF.eat("/")) {
                                                aF.skipToEnd();
                                                return H("comment", "comment")
                                            } else {
                                                if (aD.lastType == "operator" || aD.lastType == "keyword c" || aD.lastType == "sof" || /^[\[{}\(,;:]$/.test(aD.lastType)) {
                                                    B(aF);
                                                    aF.eatWhile(/[gimy]/);
                                                    return H("regexp", "string-2")
                                                } else {
                                                    aF.eatWhile(L);
                                                    return H("operator", "operator", aF.current())
                                                }
                                            }
                                        }
                                    } else {
                                        if (aB == "`") {
                                            aD.tokenize = au;
                                            return au(aF, aD)
                                        } else {
                                            if (aB == "#") {
                                                aF.skipToEnd();
                                                return H("error", "error")
                                            } else {
                                                if (L.test(aB)) {
                                                    aF.eatWhile(L);
                                                    return H("operator", "operator", aF.current())
                                                } else {
                                                    aF.eatWhile(/[\w\$_]/);
                                                    var aE = aF.current(),
                                                        aC = am.propertyIsEnumerable(aE) && am[aE];
                                                    return (aC && aD.lastType != ".") ? H(aC.type, aC.style, aE) : H("variable", "variable", aE)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function N(aB) {
        return function(aF, aD) {
            var aE = false,
                aC;
            while ((aC = aF.next()) != null) {
                if (aC == aB && !aE) {
                    break
                }
                aE = !aE && aC == "\\"
            }
            if (!aE) {
                aD.tokenize = Q
            }
            return H("string", "string")
        }
    }

    function at(aE, aD) {
        var aB = false,
            aC;
        while (aC = aE.next()) {
            if (aC == "/" && aB) {
                aD.tokenize = Q;
                break
            }
            aB = (aC == "*")
        }
        return H("comment", "comment")
    }

    function au(aE, aC) {
        var aD = false,
            aB;
        while ((aB = aE.next()) != null) {
            if (!aD && (aB == "`" || aB == "$" && aE.eat("{"))) {
                aC.tokenize = Q;
                break
            }
            aD = !aD && aB == "\\"
        }
        return H("quasi", "string-2", aE.current())
    }
    var j = "([{}])";

    function ap(aH, aE) {
        if (aE.fatArrowAt) {
            aE.fatArrowAt = null
        }
        var aD = aH.string.indexOf("=>", aH.start);
        if (aD < 0) {
            return
        }
        var aG = 0,
            aC = false;
        for (var aI = aD - 1; aI >= 0; --aI) {
            var aB = aH.string.charAt(aI);
            var aF = j.indexOf(aB);
            if (aF >= 0 && aF < 3) {
                if (!aG) {
                    ++aI;
                    break
                }
                if (--aG == 0) {
                    break
                }
            } else {
                if (aF >= 3 && aF < 6) {
                    ++aG
                } else {
                    if (/[$\w]/.test(aB)) {
                        aC = true
                    } else {
                        if (aC && !aG) {
                            ++aI;
                            break
                        }
                    }
                }
            }
        }
        if (aC && !aG) {
            aE.fatArrowAt = aI
        }
    }
    var a = {
        atom: true,
        number: true,
        variable: true,
        string: true,
        regexp: true,
        "this": true
    };

    function F(aG, aC, aB, aF, aD, aE) {
        this.indented = aG;
        this.column = aC;
        this.type = aB;
        this.prev = aD;
        this.info = aE;
        if (aF != null) {
            this.align = aF
        }
    }

    function o(aE, aD) {
        for (var aC = aE.localVars; aC; aC = aC.next) {
            if (aC.name == aD) {
                return true
            }
        }
        for (var aB = aE.context; aB; aB = aB.prev) {
            for (var aC = aB.vars; aC; aC = aC.next) {
                if (aC.name == aD) {
                    return true
                }
            }
        }
    }

    function d(aF, aC, aB, aE, aG) {
        var aH = aF.cc;
        z.state = aF;
        z.stream = aG;
        z.marked = null, z.cc = aH;
        if (!aF.lexical.hasOwnProperty("align")) {
            aF.lexical.align = true
        }
        while (true) {
            var aD = aH.length ? aH.pop() : v ? ak : az;
            if (aD(aB, aE)) {
                while (aH.length && aH[aH.length - 1].lex) {
                    aH.pop()()
                }
                if (z.marked) {
                    return z.marked
                }
                if (aB == "variable" && o(aF, aE)) {
                    return "variable-2"
                }
                return aC
            }
        }
    }
    var z = {
        state: null,
        column: null,
        marked: null,
        cc: null
    };

    function X() {
        for (var aB = arguments.length - 1; aB >= 0; aB--) {
            z.cc.push(arguments[aB])
        }
    }

    function ab() {
        X.apply(null, arguments);
        return true
    }

    function ao(aC) {
        function aB(aF) {
            for (var aE = aF; aE; aE = aE.next) {
                if (aE.name == aC) {
                    return true
                }
            }
            return false
        }
        var aD = z.state;
        if (aD.context) {
            z.marked = "def";
            if (aB(aD.localVars)) {
                return
            }
            aD.localVars = {
                name: aC,
                next: aD.localVars
            }
        } else {
            if (aB(aD.globalVars)) {
                return
            }
            if (ag.globalVars) {
                aD.globalVars = {
                    name: aC,
                    next: aD.globalVars
                }
            }
        }
    }
    var m = {
        name: "this",
        next: {
            name: "arguments"
        }
    };

    function s() {
        z.state.context = {
            prev: z.state.context,
            vars: z.state.localVars
        };
        z.state.localVars = m
    }

    function t() {
        z.state.localVars = z.state.context.vars;
        z.state.context = z.state.context.prev
    }

    function ax(aC, aD) {
        var aB = function() {
            var aF = z.state,
                aE = aF.indented;
            if (aF.lexical.type == "stat") {
                aE = aF.lexical.indented
            }
            aF.lexical = new F(aE, z.stream.column(), aC, null, aF.lexical, aD)
        };
        aB.lex = true;
        return aB
    }

    function f() {
        var aB = z.state;
        if (aB.lexical.prev) {
            if (aB.lexical.type == ")") {
                aB.indented = aB.lexical.indented
            }
            aB.lexical = aB.lexical.prev
        }
    }
    f.lex = true;

    function n(aB) {
        return function(aC) {
            if (aC == aB) {
                return ab()
            } else {
                if (aB == ";") {
                    return X()
                } else {
                    return ab(arguments.callee)
                }
            }
        }
    }

    function az(aB, aC) {
        if (aB == "var") {
            return ab(ax("vardef", aC.length), b, n(";"), f)
        }
        if (aB == "keyword a") {
            return ab(ax("form"), ak, az, f)
        }
        if (aB == "keyword b") {
            return ab(ax("form"), az, f)
        }
        if (aB == "{") {
            return ab(ax("}"), u, f)
        }
        if (aB == ";") {
            return ab()
        }
        if (aB == "if") {
            return ab(ax("form"), ak, az, f, c)
        }
        if (aB == "function") {
            return ab(I)
        }
        if (aB == "for") {
            return ab(ax("form"), q, az, f)
        }
        if (aB == "variable") {
            return ab(ax("stat"), aA)
        }
        if (aB == "switch") {
            return ab(ax("form"), ak, ax("}", "switch"), n("{"), u, f, f)
        }
        if (aB == "case") {
            return ab(ak, n(":"))
        }
        if (aB == "default") {
            return ab(n(":"))
        }
        if (aB == "catch") {
            return ab(ax("form"), s, n("("), ac, n(")"), az, f, t)
        }
        if (aB == "module") {
            return ab(ax("form"), s, D, t, f)
        }
        if (aB == "class") {
            return ab(ax("form"), S, R, f)
        }
        if (aB == "export") {
            return ab(ax("form"), ay, f)
        }
        if (aB == "import") {
            return ab(ax("form"), ad, f)
        }
        return X(ax("stat"), ak, n(";"), f)
    }

    function ak(aB) {
        return V(aB, false)
    }

    function aw(aB) {
        return V(aB, true)
    }

    function V(aC, aE) {
        if (z.state.fatArrowAt == z.stream.start) {
            var aB = aE ? J : T;
            if (aC == "(") {
                return ab(s, ax(")"), an(g, ")"), f, n("=>"), aB, t)
            } else {
                if (aC == "variable") {
                    return X(s, g, n("=>"), aB, t)
                }
            }
        }
        var aD = aE ? h : Y;
        if (a.hasOwnProperty(aC)) {
            return ab(aD)
        }
        if (aC == "function") {
            return ab(I)
        }
        if (aC == "keyword c") {
            return ab(aE ? ah : af)
        }
        if (aC == "(") {
            return ab(ax(")"), af, ar, n(")"), f, aD)
        }
        if (aC == "operator" || aC == "spread") {
            return ab(aE ? aw : ak)
        }
        if (aC == "[") {
            return ab(ax("]"), k, f, aD)
        }
        if (aC == "{") {
            return aq(p, "}", null, aD)
        }
        return ab()
    }

    function af(aB) {
        if (aB.match(/[;\}\)\],]/)) {
            return X()
        }
        return X(ak)
    }

    function ah(aB) {
        if (aB.match(/[;\}\)\],]/)) {
            return X()
        }
        return X(aw)
    }

    function Y(aB, aC) {
        if (aB == ",") {
            return ab(ak)
        }
        return h(aB, aC, false)
    }

    function h(aB, aD, aF) {
        var aC = aF == false ? Y : h;
        var aE = aF == false ? ak : aw;
        if (aD == "=>") {
            return ab(s, aF ? J : T, t)
        }
        if (aB == "operator") {
            if (/\+\+|--/.test(aD)) {
                return ab(aC)
            }
            if (aD == "?") {
                return ab(ak, n(":"), aE)
            }
            return ab(aE)
        }
        if (aB == "quasi") {
            z.cc.push(aC);
            return M(aD)
        }
        if (aB == ";") {
            return
        }
        if (aB == "(") {
            return aq(aw, ")", "call", aC)
        }
        if (aB == ".") {
            return ab(ai, aC)
        }
        if (aB == "[") {
            return ab(ax("]"), af, n("]"), f, aC)
        }
    }

    function M(aB) {
        if (aB.slice(aB.length - 2) != "${") {
            return ab()
        }
        return ab(ak, l)
    }

    function l(aB) {
        if (aB == "}") {
            z.marked = "string-2";
            z.state.tokenize = au;
            return ab()
        }
    }

    function T(aB) {
        ap(z.stream, z.state);
        if (aB == "{") {
            return X(az)
        }
        return X(ak)
    }

    function J(aB) {
        ap(z.stream, z.state);
        if (aB == "{") {
            return X(az)
        }
        return X(aw)
    }

    function aA(aB) {
        if (aB == ":") {
            return ab(f, az)
        }
        return X(Y, n(";"), f)
    }

    function ai(aB) {
        if (aB == "variable") {
            z.marked = "property";
            return ab()
        }
    }

    function p(aB, aC) {
        if (aB == "variable") {
            z.marked = "property";
            if (aC == "get" || aC == "set") {
                return ab(E)
            }
        } else {
            if (aB == "number" || aB == "string") {
                z.marked = aB + " property"
            } else {
                if (aB == "[") {
                    return ab(ak, n("]"), G)
                }
            }
        }
        if (a.hasOwnProperty(aB)) {
            return ab(G)
        }
    }

    function E(aB) {
        if (aB != "variable") {
            return X(G)
        }
        z.marked = "property";
        return ab(I)
    }

    function G(aB) {
        if (aB == ":") {
            return ab(aw)
        }
        if (aB == "(") {
            return X(I)
        }
    }

    function an(aD, aB) {
        function aC(aF) {
            if (aF == ",") {
                var aE = z.state.lexical;
                if (aE.info == "call") {
                    aE.pos = (aE.pos || 0) + 1
                }
                return ab(aD, aC)
            }
            if (aF == aB) {
                return ab()
            }
            return ab(n(aB))
        }
        return function(aE) {
            if (aE == aB) {
                return ab()
            }
            return X(aD, aC)
        }
    }

    function aq(aE, aB, aD) {
        for (var aC = 3; aC < arguments.length; aC++) {
            z.cc.push(arguments[aC])
        }
        return ab(ax(aB, aD), an(aE, aB), f)
    }

    function u(aB) {
        if (aB == "}") {
            return ab()
        }
        return X(az, u)
    }

    function P(aB) {
        if (e && aB == ":") {
            return ab(aa)
        }
    }

    function aa(aB) {
        if (aB == "variable") {
            z.marked = "variable-3";
            return ab()
        }
    }

    function b() {
        return X(g, P, Z, U)
    }

    function g(aB, aC) {
        if (aB == "variable") {
            ao(aC);
            return ab()
        }
        if (aB == "[") {
            return aq(g, "]")
        }
        if (aB == "{") {
            return aq(av, "}")
        }
    }

    function av(aB, aC) {
        if (aB == "variable" && !z.stream.match(/^\s*:/, false)) {
            ao(aC);
            return ab(Z)
        }
        if (aB == "variable") {
            z.marked = "property"
        }
        return ab(n(":"), g, Z)
    }

    function Z(aB, aC) {
        if (aC == "=") {
            return ab(aw)
        }
    }

    function U(aB) {
        if (aB == ",") {
            return ab(b)
        }
    }

    function c(aB, aC) {
        if (aB == "keyword b" && aC == "else") {
            return ab(ax("form"), az, f)
        }
    }

    function q(aB) {
        if (aB == "(") {
            return ab(ax(")"), A, n(")"), f)
        }
    }

    function A(aB) {
        if (aB == "var") {
            return ab(b, n(";"), y)
        }
        if (aB == ";") {
            return ab(y)
        }
        if (aB == "variable") {
            return ab(r)
        }
        return X(ak, n(";"), y)
    }

    function r(aB, aC) {
        if (aC == "in" || aC == "of") {
            z.marked = "keyword";
            return ab(ak)
        }
        return ab(Y, y)
    }

    function y(aB, aC) {
        if (aB == ";") {
            return ab(x)
        }
        if (aC == "in" || aC == "of") {
            z.marked = "keyword";
            return ab(ak)
        }
        return X(ak, n(";"), x)
    }

    function x(aB) {
        if (aB != ")") {
            ab(ak)
        }
    }

    function I(aB, aC) {
        if (aC == "*") {
            z.marked = "keyword";
            return ab(I)
        }
        if (aB == "variable") {
            ao(aC);
            return ab(I)
        }
        if (aB == "(") {
            return ab(s, ax(")"), an(ac, ")"), f, az, t)
        }
    }

    function ac(aB) {
        if (aB == "spread") {
            return ab(ac)
        }
        return X(g, P)
    }

    function S(aB, aC) {
        if (aB == "variable") {
            ao(aC);
            return ab(K)
        }
    }

    function K(aB, aC) {
        if (aC == "extends") {
            return ab(ak)
        }
    }

    function R(aB) {
        if (aB == "{") {
            return aq(p, "}")
        }
    }

    function D(aB, aC) {
        if (aB == "string") {
            return ab(az)
        }
        if (aB == "variable") {
            ao(aC);
            return ab(ae)
        }
    }

    function ay(aB, aC) {
        if (aC == "*") {
            z.marked = "keyword";
            return ab(ae, n(";"))
        }
        if (aC == "default") {
            z.marked = "keyword";
            return ab(ak, n(";"))
        }
        return X(az)
    }

    function ad(aB) {
        if (aB == "string") {
            return ab()
        }
        return X(al, ae)
    }

    function al(aB, aC) {
        if (aB == "{") {
            return aq(al, "}")
        }
        if (aB == "variable") {
            ao(aC)
        }
        return ab()
    }

    function ae(aB, aC) {
        if (aC == "from") {
            z.marked = "keyword";
            return ab(ak)
        }
    }

    function k(aB) {
        if (aB == "]") {
            return ab()
        }
        return X(aw, aj)
    }

    function aj(aB) {
        if (aB == "for") {
            return X(ar, n("]"))
        }
        if (aB == ",") {
            return ab(an(aw, "]"))
        }
        return X(an(aw, "]"))
    }

    function ar(aB) {
        if (aB == "for") {
            return ab(q, ar)
        }
        if (aB == "if") {
            return ab(ak, ar)
        }
    }
    return {
        startState: function(aC) {
            var aB = {
                tokenize: Q,
                lastType: "sof",
                cc: [],
                lexical: new F((aC || 0) - i, 0, "block", false),
                localVars: ag.localVars,
                context: ag.localVars && {
                    vars: ag.localVars
                },
                indented: 0
            };
            if (ag.globalVars) {
                aB.globalVars = ag.globalVars
            }
            return aB
        },
        token: function(aD, aC) {
            if (aD.sol()) {
                if (!aC.lexical.hasOwnProperty("align")) {
                    aC.lexical.align = false
                }
                aC.indented = aD.indentation();
                ap(aD, aC)
            }
            if (aC.tokenize != at && aD.eatSpace()) {
                return null
            }
            var aB = aC.tokenize(aD, aC);
            if (O == "comment") {
                return aB
            }
            aC.lastType = O == "operator" && (C == "++" || C == "--") ? "incdec" : O;
            return d(aC, aB, O, C, aD)
        },
        indent: function(aH, aB) {
            if (aH.tokenize == at) {
                return CodeMirror.Pass
            }
            if (aH.tokenize != Q) {
                return 0
            }
            var aG = aB && aB.charAt(0),
                aE = aH.lexical;
            for (var aD = aH.cc.length - 1; aD >= 0; --aD) {
                var aI = aH.cc[aD];
                if (aI == f) {
                    aE = aE.prev
                } else {
                    if (aI != c) {
                        break
                    }
                }
            }
            if (aE.type == "stat" && aG == "}") {
                aE = aE.prev
            }
            if (w && aE.type == ")" && aE.prev.type == "stat") {
                aE = aE.prev
            }
            var aF = aE.type,
                aC = aG == aF;
            if (aF == "vardef") {
                return aE.indented + (aH.lastType == "operator" || aH.lastType == "," ? aE.info + 1 : 0)
            } else {
                if (aF == "form" && aG == "{") {
                    return aE.indented
                } else {
                    if (aF == "form") {
                        return aE.indented + i
                    } else {
                        if (aF == "stat") {
                            return aE.indented + (aH.lastType == "operator" || aH.lastType == "," ? w || i : 0)
                        } else {
                            if (aE.info == "switch" && !aC && ag.doubleIndentSwitch != false) {
                                return aE.indented + (/^(?:case|default)\b/.test(aB) ? i : 2 * i)
                            } else {
                                if (aE.align) {
                                    return aE.column + (aC ? 0 : 1)
                                } else {
                                    return aE.indented + (aC ? 0 : i)
                                }
                            }
                        }
                    }
                }
            }
        },
        electricChars: ":{}",
        blockCommentStart: v ? null : "/*",
        blockCommentEnd: v ? null : "*/",
        lineComment: v ? null : "//",
        fold: "brace",
        helperType: v ? "json" : "javascript",
        jsonMode: v
    }
});
CodeMirror.defineMIME("text/javascript", "javascript");
CodeMirror.defineMIME("text/ecmascript", "javascript");
CodeMirror.defineMIME("application/javascript", "javascript");
CodeMirror.defineMIME("application/ecmascript", "javascript");
CodeMirror.defineMIME("application/json", {
    name: "javascript",
    json: true
});
CodeMirror.defineMIME("application/x-json", {
    name: "javascript",
    json: true
});
CodeMirror.defineMIME("text/typescript", {
    name: "javascript",
    typescript: true
});
CodeMirror.defineMIME("application/typescript", {
    name: "javascript",
    typescript: true
});