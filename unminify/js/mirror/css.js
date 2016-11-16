CodeMirror.defineMode("css", function(u, i) {
    if (!i.propertyKeywords) {
        i = CodeMirror.resolveMode("text/css")
    }
    var o = u.indentUnit,
        b = i.tokenHooks,
        t = i.mediaTypes || {},
        k = i.mediaFeatures || {},
        h = i.propertyKeywords || {},
        n = i.colorKeywords || {},
        q = i.valueKeywords || {},
        d = i.fontProperties || {},
        l = i.allowNested;
    var c, m;

    function v(y, z) {
        c = z;
        return y
    }

    function x(B, A) {
        var z = B.next();
        if (b[z]) {
            var y = b[z](B, A);
            if (y !== false) {
                return y
            }
        }
        if (z == "@") {
            B.eatWhile(/[\w\\\-]/);
            return v("def", B.current())
        } else {
            if (z == "=" || (z == "~" || z == "|") && B.eat("=")) {
                return v(null, "compare")
            } else {
                if (z == '"' || z == "'") {
                    A.tokenize = j(z);
                    return A.tokenize(B, A)
                } else {
                    if (z == "#") {
                        B.eatWhile(/[\w\\\-]/);
                        return v("atom", "hash")
                    } else {
                        if (z == "!") {
                            B.match(/^\s*\w*/);
                            return v("keyword", "important")
                        } else {
                            if (/\d/.test(z) || z == "." && B.eat(/\d/)) {
                                B.eatWhile(/[\w.%]/);
                                return v("number", "unit")
                            } else {
                                if (z === "-") {
                                    if (/[\d.]/.test(B.peek())) {
                                        B.eatWhile(/[\w.%]/);
                                        return v("number", "unit")
                                    } else {
                                        if (B.match(/^[^-]+-/)) {
                                            return v("meta", "meta")
                                        }
                                    }
                                } else {
                                    if (/[,+>*\/]/.test(z)) {
                                        return v(null, "select-op")
                                    } else {
                                        if (z == "." && B.match(/^-?[_a-z][_a-z0-9-]*/i)) {
                                            return v("qualifier", "qualifier")
                                        } else {
                                            if (/[:;{}\[\]\(\)]/.test(z)) {
                                                return v(null, z)
                                            } else {
                                                if (z == "u" && B.match("rl(")) {
                                                    B.backUp(1);
                                                    A.tokenize = w;
                                                    return v("property", "word")
                                                } else {
                                                    if (/[\w\\\-]/.test(z)) {
                                                        B.eatWhile(/[\w\\\-]/);
                                                        return v("property", "word")
                                                    } else {
                                                        return v(null, null)
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
    }

    function j(y) {
        return function(C, A) {
            var B = false,
                z;
            while ((z = C.next()) != null) {
                if (z == y && !B) {
                    if (y == ")") {
                        C.backUp(1)
                    }
                    break
                }
                B = !B && z == "\\"
            }
            if (z == y || !B && y != ")") {
                A.tokenize = null
            }
            return v("string", "string")
        }
    }

    function w(z, y) {
        z.next();
        if (!z.match(/\s*[\"\']/, false)) {
            y.tokenize = j(")")
        } else {
            y.tokenize = null
        }
        return v(null, "(")
    }

    function p(z, y, A) {
        this.type = z;
        this.indent = y;
        this.prev = A
    }

    function f(z, A, y) {
        z.context = new p(y, A.indentation() + o, z.context);
        return y
    }

    function r(y) {
        y.context = y.context.prev;
        return y.context.type
    }

    function a(y, A, z) {
        return e[z.context.type](y, A, z)
    }

    function s(z, B, A, C) {
        for (var y = C || 1; y > 0; y--) {
            A.context = A.context.prev
        }
        return a(z, B, A)
    }

    function g(z) {
        var y = z.current().toLowerCase();
        if (q.hasOwnProperty(y)) {
            m = "atom"
        } else {
            if (n.hasOwnProperty(y)) {
                m = "keyword"
            } else {
                m = "variable"
            }
        }
    }
    var e = {};
    e.top = function(y, A, z) {
        if (y == "{") {
            return f(z, A, "block")
        } else {
            if (y == "}" && z.context.prev) {
                return r(z)
            } else {
                if (y == "@media") {
                    return f(z, A, "media")
                } else {
                    if (y == "@font-face") {
                        return "font_face_before"
                    } else {
                        if (y && y.charAt(0) == "@") {
                            return f(z, A, "at")
                        } else {
                            if (y == "hash") {
                                m = "builtin"
                            } else {
                                if (y == "word") {
                                    m = "tag"
                                } else {
                                    if (y == "variable-definition") {
                                        return "maybeprop"
                                    } else {
                                        if (y == "interpolation") {
                                            return f(z, A, "interpolation")
                                        } else {
                                            if (y == ":") {
                                                return "pseudo"
                                            } else {
                                                if (l && y == "(") {
                                                    return f(z, A, "params")
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
        return z.context.type
    };
    e.block = function(y, A, z) {
        if (y == "word") {
            if (h.hasOwnProperty(A.current().toLowerCase())) {
                m = "property";
                return "maybeprop"
            } else {
                if (l) {
                    m = A.match(/^\s*:/, false) ? "property" : "tag";
                    return "block"
                } else {
                    m += " error";
                    return "maybeprop"
                }
            }
        } else {
            if (y == "meta") {
                return "block"
            } else {
                if (!l && (y == "hash" || y == "qualifier")) {
                    m = "error";
                    return "block"
                } else {
                    return e.top(y, A, z)
                }
            }
        }
    };
    e.maybeprop = function(y, A, z) {
        if (y == ":") {
            return f(z, A, "prop")
        }
        return a(y, A, z)
    };
    e.prop = function(y, A, z) {
        if (y == ";") {
            return r(z)
        }
        if (y == "{" && l) {
            return f(z, A, "propBlock")
        }
        if (y == "}" || y == "{") {
            return s(y, A, z)
        }
        if (y == "(") {
            return f(z, A, "parens")
        }
        if (y == "hash" && !/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(A.current())) {
            m += " error"
        } else {
            if (y == "word") {
                g(A)
            } else {
                if (y == "interpolation") {
                    return f(z, A, "interpolation")
                }
            }
        }
        return "prop"
    };
    e.propBlock = function(z, y, A) {
        if (z == "}") {
            return r(A)
        }
        if (z == "word") {
            m = "property";
            return "maybeprop"
        }
        return A.context.type
    };
    e.parens = function(y, A, z) {
        if (y == "{" || y == "}") {
            return s(y, A, z)
        }
        if (y == ")") {
            return r(z)
        }
        return "parens"
    };
    e.pseudo = function(y, A, z) {
        if (y == "word") {
            m = "variable-3";
            return z.context.type
        }
        return a(y, A, z)
    };
    e.media = function(y, B, z) {
        if (y == "(") {
            return f(z, B, "media_parens")
        }
        if (y == "}") {
            return s(y, B, z)
        }
        if (y == "{") {
            return r(z) && f(z, B, l ? "block" : "top")
        }
        if (y == "word") {
            var A = B.current().toLowerCase();
            if (A == "only" || A == "not" || A == "and") {
                m = "keyword"
            } else {
                if (t.hasOwnProperty(A)) {
                    m = "attribute"
                } else {
                    if (k.hasOwnProperty(A)) {
                        m = "property"
                    } else {
                        m = "error"
                    }
                }
            }
        }
        return z.context.type
    };
    e.media_parens = function(y, A, z) {
        if (y == ")") {
            return r(z)
        }
        if (y == "{" || y == "}") {
            return s(y, A, z, 2)
        }
        return e.media(y, A, z)
    };
    e.font_face_before = function(y, A, z) {
        if (y == "{") {
            return f(z, A, "font_face")
        }
        return a(y, A, z)
    };
    e.font_face = function(y, A, z) {
        if (y == "}") {
            return r(z)
        }
        if (y == "word") {
            if (!d.hasOwnProperty(A.current().toLowerCase())) {
                m = "error"
            } else {
                m = "property"
            }
            return "maybeprop"
        }
        return "font_face"
    };
    e.at = function(y, A, z) {
        if (y == ";") {
            return r(z)
        }
        if (y == "{" || y == "}") {
            return s(y, A, z)
        }
        if (y == "word") {
            m = "tag"
        } else {
            if (y == "hash") {
                m = "builtin"
            }
        }
        return "at"
    };
    e.interpolation = function(y, A, z) {
        if (y == "}") {
            return r(z)
        }
        if (y == "{" || y == ";") {
            return s(y, A, z)
        }
        if (y != "variable") {
            m = "error"
        }
        return "interpolation"
    };
    e.params = function(y, A, z) {
        if (y == ")") {
            return r(z)
        }
        if (y == "{" || y == "}") {
            return s(y, A, z)
        }
        if (y == "word") {
            g(A)
        }
        return "params"
    };
    return {
        startState: function(y) {
            return {
                tokenize: null,
                state: "top",
                context: new p("top", y || 0, null)
            }
        },
        token: function(A, z) {
            if (!z.tokenize && A.eatSpace()) {
                return null
            }
            var y = (z.tokenize || x)(A, z);
            if (y && typeof y == "object") {
                c = y[1];
                y = y[0]
            }
            m = y;
            z.state = e[z.state](c, A, z);
            return m
        },
        indent: function(C, A) {
            var z = C.context,
                B = A && A.charAt(0);
            var y = z.indent;
            if (z.prev && (B == "}" && (z.type == "block" || z.type == "top" || z.type == "interpolation" || z.type == "font_face") || B == ")" && (z.type == "parens" || z.type == "params" || z.type == "media_parens") || B == "{" && (z.type == "at" || z.type == "media"))) {
                y = z.indent - o;
                z = z.prev
            }
            return y
        },
        electricChars: "}",
        blockCommentStart: "/*",
        blockCommentEnd: "*/",
        fold: "brace"
    }
});
(function() {
    function d(s) {
        var r = {};
        for (var q = 0; q < s.length; ++q) {
            r[s[q]] = true
        }
        return r
    }
    var m = ["all", "aural", "braille", "handheld", "print", "projection", "screen", "tty", "tv", "embossed"],
        f = d(m);
    var g = ["width", "min-width", "max-width", "height", "min-height", "max-height", "device-width", "min-device-width", "max-device-width", "device-height", "min-device-height", "max-device-height", "aspect-ratio", "min-aspect-ratio", "max-aspect-ratio", "device-aspect-ratio", "min-device-aspect-ratio", "max-device-aspect-ratio", "color", "min-color", "max-color", "color-index", "min-color-index", "max-color-index", "monochrome", "min-monochrome", "max-monochrome", "resolution", "min-resolution", "max-resolution", "scan", "grid"],
        l = d(g);
    var e = ["align-content", "align-items", "align-self", "alignment-adjust", "alignment-baseline", "anchor-point", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "appearance", "azimuth", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "baseline-shift", "binding", "bleed", "bookmark-label", "bookmark-level", "bookmark-state", "bookmark-target", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "color", "color-profile", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "crop", "cue", "cue-after", "cue-before", "cursor", "direction", "display", "dominant-baseline", "drop-initial-after-adjust", "drop-initial-after-align", "drop-initial-before-adjust", "drop-initial-before-align", "drop-initial-size", "drop-initial-value", "elevation", "empty-cells", "fit", "fit-position", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "float-offset", "flow-from", "flow-into", "font", "font-feature-settings", "font-family", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-weight", "grid-cell", "grid-column", "grid-column-align", "grid-column-sizing", "grid-column-span", "grid-columns", "grid-flow", "grid-row", "grid-row-align", "grid-row-sizing", "grid-row-span", "grid-rows", "grid-template", "hanging-punctuation", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "inline-box-align", "justify-content", "left", "letter-spacing", "line-break", "line-height", "line-stacking", "line-stacking-ruby", "line-stacking-shift", "line-stacking-strategy", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marker-offset", "marks", "marquee-direction", "marquee-loop", "marquee-play-count", "marquee-speed", "marquee-style", "max-height", "max-width", "min-height", "min-width", "move-to", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-style", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page", "page-break-after", "page-break-before", "page-break-inside", "page-policy", "pause", "pause-after", "pause-before", "perspective", "perspective-origin", "pitch", "pitch-range", "play-during", "position", "presentation-level", "punctuation-trim", "quotes", "region-break-after", "region-break-before", "region-break-inside", "region-fragment", "rendering-intent", "resize", "rest", "rest-after", "rest-before", "richness", "right", "rotation", "rotation-point", "ruby-align", "ruby-overhang", "ruby-position", "ruby-span", "shape-inside", "shape-outside", "size", "speak", "speak-as", "speak-header", "speak-numeral", "speak-punctuation", "speech-rate", "stress", "string-set", "tab-size", "table-layout", "target", "target-name", "target-new", "target-position", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-style", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-height", "text-indent", "text-justify", "text-outline", "text-overflow", "text-shadow", "text-size-adjust", "text-space-collapse", "text-transform", "text-underline-position", "text-wrap", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "voice-balance", "voice-duration", "voice-family", "voice-pitch", "voice-range", "voice-rate", "voice-stress", "voice-volume", "volume", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index", "zoom", "clip-path", "clip-rule", "mask", "enable-background", "filter", "flood-color", "flood-opacity", "lighting-color", "stop-color", "stop-opacity", "pointer-events", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "fill", "fill-opacity", "fill-rule", "image-rendering", "marker", "marker-end", "marker-mid", "marker-start", "shape-rendering", "stroke", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "text-rendering", "baseline-shift", "dominant-baseline", "glyph-orientation-horizontal", "glyph-orientation-vertical", "kerning", "text-anchor", "writing-mode"],
        n = d(e);
    var k = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"],
        o = d(k);
    var b = ["above", "absolute", "activeborder", "activecaption", "afar", "after-white-space", "ahead", "alias", "all", "all-scroll", "alternate", "always", "amharic", "amharic-abegede", "antialiased", "appworkspace", "arabic-indic", "armenian", "asterisks", "auto", "avoid", "avoid-column", "avoid-page", "avoid-region", "background", "backwards", "baseline", "below", "bidi-override", "binary", "bengali", "blink", "block", "block-axis", "bold", "bolder", "border", "border-box", "both", "bottom", "break", "break-all", "break-word", "button", "button-bevel", "buttonface", "buttonhighlight", "buttonshadow", "buttontext", "cambodian", "capitalize", "caps-lock-indicator", "caption", "captiontext", "caret", "cell", "center", "checkbox", "circle", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "clear", "clip", "close-quote", "col-resize", "collapse", "column", "compact", "condensed", "contain", "content", "content-box", "context-menu", "continuous", "copy", "cover", "crop", "cross", "crosshair", "currentcolor", "cursive", "dashed", "decimal", "decimal-leading-zero", "default", "default-button", "destination-atop", "destination-in", "destination-out", "destination-over", "devanagari", "disc", "discard", "document", "dot-dash", "dot-dot-dash", "dotted", "double", "down", "e-resize", "ease", "ease-in", "ease-in-out", "ease-out", "element", "ellipse", "ellipsis", "embed", "end", "ethiopic", "ethiopic-abegede", "ethiopic-abegede-am-et", "ethiopic-abegede-gez", "ethiopic-abegede-ti-er", "ethiopic-abegede-ti-et", "ethiopic-halehame-aa-er", "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", "ethiopic-halehame-gez", "ethiopic-halehame-om-et", "ethiopic-halehame-sid-et", "ethiopic-halehame-so-et", "ethiopic-halehame-ti-er", "ethiopic-halehame-ti-et", "ethiopic-halehame-tig", "ew-resize", "expanded", "extra-condensed", "extra-expanded", "fantasy", "fast", "fill", "fixed", "flat", "footnotes", "forwards", "from", "geometricPrecision", "georgian", "graytext", "groove", "gujarati", "gurmukhi", "hand", "hangul", "hangul-consonant", "hebrew", "help", "hidden", "hide", "higher", "highlight", "highlighttext", "hiragana", "hiragana-iroha", "horizontal", "hsl", "hsla", "icon", "ignore", "inactiveborder", "inactivecaption", "inactivecaptiontext", "infinite", "infobackground", "infotext", "inherit", "initial", "inline", "inline-axis", "inline-block", "inline-table", "inset", "inside", "intrinsic", "invert", "italic", "justify", "kannada", "katakana", "katakana-iroha", "keep-all", "khmer", "landscape", "lao", "large", "larger", "left", "level", "lighter", "line-through", "linear", "lines", "list-item", "listbox", "listitem", "local", "logical", "loud", "lower", "lower-alpha", "lower-armenian", "lower-greek", "lower-hexadecimal", "lower-latin", "lower-norwegian", "lower-roman", "lowercase", "ltr", "malayalam", "match", "media-controls-background", "media-current-time-display", "media-fullscreen-button", "media-mute-button", "media-play-button", "media-return-to-realtime-button", "media-rewind-button", "media-seek-back-button", "media-seek-forward-button", "media-slider", "media-sliderthumb", "media-time-remaining-display", "media-volume-slider", "media-volume-slider-container", "media-volume-sliderthumb", "medium", "menu", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menutext", "message-box", "middle", "min-intrinsic", "mix", "mongolian", "monospace", "move", "multiple", "myanmar", "n-resize", "narrower", "ne-resize", "nesw-resize", "no-close-quote", "no-drop", "no-open-quote", "no-repeat", "none", "normal", "not-allowed", "nowrap", "ns-resize", "nw-resize", "nwse-resize", "oblique", "octal", "open-quote", "optimizeLegibility", "optimizeSpeed", "oriya", "oromo", "outset", "outside", "outside-shape", "overlay", "overline", "padding", "padding-box", "painted", "page", "paused", "persian", "plus-darker", "plus-lighter", "pointer", "polygon", "portrait", "pre", "pre-line", "pre-wrap", "preserve-3d", "progress", "push-button", "radio", "read-only", "read-write", "read-write-plaintext-only", "rectangle", "region", "relative", "repeat", "repeat-x", "repeat-y", "reset", "reverse", "rgb", "rgba", "ridge", "right", "round", "row-resize", "rtl", "run-in", "running", "s-resize", "sans-serif", "scroll", "scrollbar", "se-resize", "searchfield", "searchfield-cancel-button", "searchfield-decoration", "searchfield-results-button", "searchfield-results-decoration", "semi-condensed", "semi-expanded", "separate", "serif", "show", "sidama", "single", "skip-white-space", "slide", "slider-horizontal", "slider-vertical", "sliderthumb-horizontal", "sliderthumb-vertical", "slow", "small", "small-caps", "small-caption", "smaller", "solid", "somali", "source-atop", "source-in", "source-out", "source-over", "space", "square", "square-button", "start", "static", "status-bar", "stretch", "stroke", "sub", "subpixel-antialiased", "super", "sw-resize", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "telugu", "text", "text-bottom", "text-top", "textarea", "textfield", "thai", "thick", "thin", "threeddarkshadow", "threedface", "threedhighlight", "threedlightshadow", "threedshadow", "tibetan", "tigre", "tigrinya-er", "tigrinya-er-abegede", "tigrinya-et", "tigrinya-et-abegede", "to", "top", "transparent", "ultra-condensed", "ultra-expanded", "underline", "up", "upper-alpha", "upper-armenian", "upper-greek", "upper-hexadecimal", "upper-latin", "upper-norwegian", "upper-roman", "uppercase", "urdu", "url", "vertical", "vertical-text", "visible", "visibleFill", "visiblePainted", "visibleStroke", "visual", "w-resize", "wait", "wave", "wider", "window", "windowframe", "windowtext", "x-large", "x-small", "xor", "xx-large", "xx-small"],
        h = d(b);
    var j = ["font-family", "src", "unicode-range", "font-variant", "font-feature-settings", "font-stretch", "font-weight", "font-style"],
        a = d(j);
    var i = m.concat(g).concat(e).concat(k).concat(b);
    CodeMirror.registerHelper("hintWords", "css", i);

    function p(t, s) {
        var q = false,
            r;
        while ((r = t.next()) != null) {
            if (q && r == "/") {
                s.tokenize = null;
                break
            }
            q = (r == "*")
        }
        return ["comment", "comment"]
    }

    function c(r, q) {
        if (r.skipTo("-->")) {
            r.match("-->");
            q.tokenize = null
        } else {
            r.skipToEnd()
        }
        return ["comment", "comment"]
    }
    CodeMirror.defineMIME("text/css", {
        mediaTypes: f,
        mediaFeatures: l,
        propertyKeywords: n,
        colorKeywords: o,
        valueKeywords: h,
        fontProperties: a,
        tokenHooks: {
            "<": function(r, q) {
                if (!r.match("!--")) {
                    return false
                }
                q.tokenize = c;
                return c(r, q)
            },
            "/": function(r, q) {
                if (!r.eat("*")) {
                    return false
                }
                q.tokenize = p;
                return p(r, q)
            }
        },
        name: "css"
    });
    CodeMirror.defineMIME("text/x-scss", {
        mediaTypes: f,
        mediaFeatures: l,
        propertyKeywords: n,
        colorKeywords: o,
        valueKeywords: h,
        fontProperties: a,
        allowNested: true,
        tokenHooks: {
            "/": function(r, q) {
                if (r.eat("/")) {
                    r.skipToEnd();
                    return ["comment", "comment"]
                } else {
                    if (r.eat("*")) {
                        q.tokenize = p;
                        return p(r, q)
                    } else {
                        return ["operator", "operator"]
                    }
                }
            },
            ":": function(q) {
                if (q.match(/\s*{/)) {
                    return [null, "{"]
                }
                return false
            },
            "$": function(q) {
                q.match(/^[\w-]+/);
                if (q.match(/^\s*:/, false)) {
                    return ["variable-2", "variable-definition"]
                }
                return ["variable-2", "variable"]
            },
            "#": function(q) {
                if (!q.eat("{")) {
                    return false
                }
                return [null, "interpolation"]
            }
        },
        name: "css",
        helperType: "scss"
    });
    CodeMirror.defineMIME("text/x-less", {
        mediaTypes: f,
        mediaFeatures: l,
        propertyKeywords: n,
        colorKeywords: o,
        valueKeywords: h,
        fontProperties: a,
        allowNested: true,
        tokenHooks: {
            "/": function(r, q) {
                if (r.eat("/")) {
                    r.skipToEnd();
                    return ["comment", "comment"]
                } else {
                    if (r.eat("*")) {
                        q.tokenize = p;
                        return p(r, q)
                    } else {
                        return ["operator", "operator"]
                    }
                }
            },
            "@": function(q) {
                if (q.match(/^(charset|document|font-face|import|keyframes|media|namespace|page|supports)\b/, false)) {
                    return false
                }
                q.eatWhile(/[\w\\\-]/);
                if (q.match(/^\s*:/, false)) {
                    return ["variable-2", "variable-definition"]
                }
                return ["variable-2", "variable"]
            },
            "&": function() {
                return ["atom", "atom"]
            }
        },
        name: "css",
        helperType: "less"
    })
})();