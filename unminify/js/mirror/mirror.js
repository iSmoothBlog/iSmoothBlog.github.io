window.CodeMirror = (function() {
    var bI = /gecko\/\d/i.test(navigator.userAgent);
    var cf = /MSIE \d/.test(navigator.userAgent);
    var bF = cf && (document.documentMode == null || document.documentMode < 8);
    var bE = cf && (document.documentMode == null || document.documentMode < 9);
    var dC = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent);
    var cA = cf || dC;
    var b8 = /WebKit\//.test(navigator.userAgent);
    var cD = b8 && /Qt\/\d+\.\d+/.test(navigator.userAgent);
    var cg = /Chrome\//.test(navigator.userAgent);
    var d1 = /Opera\//.test(navigator.userAgent);
    var ag = /Apple Computer/.test(navigator.vendor);
    var aH = /KHTML\//.test(navigator.userAgent);
    var bT = /Mac OS X 1\d\D([7-9]|\d\d)\D/.test(navigator.userAgent);
    var cc = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent);
    var dY = /PhantomJS/.test(navigator.userAgent);
    var dy = /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
    var cV = dy || /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent);
    var bq = dy || /Mac/.test(navigator.platform);
    var ao = /win/i.test(navigator.platform);
    var c8 = d1 && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
    if (c8) {
        c8 = Number(c8[1])
    }
    if (c8 && c8 >= 15) {
        d1 = false;
        b8 = true
    }
    var be = bq && (cD || d1 && (c8 == null || c8 < 12.11));
    var bX = bI || (cf && !bE);
    var eq = false,
        aD = false;

    function B(ew, ex) {
        if (!(this instanceof B)) {
            return new B(ew, ex)
        }
        this.options = ex = ex || {};
        for (var ey in dA) {
            if (!ex.hasOwnProperty(ey) && dA.hasOwnProperty(ey)) {
                ex[ey] = dA[ey]
            }
        }
        by(ex);
        var eC = typeof ex.value == "string" ? 0 : ex.value.first;
        var eB = this.display = f(ew, eC);
        eB.wrapper.CodeMirror = this;
        cR(this);
        if (ex.autofocus && !cV) {
            db(this)
        }
        this.state = {
            keyMaps: [],
            overlays: [],
            modeGen: 0,
            overwrite: false,
            focused: false,
            suppressEdits: false,
            pasteIncoming: false,
            cutIncoming: false,
            draggingText: false,
            highlight: new ev()
        };
        b2(this);
        if (ex.lineWrapping) {
            this.display.wrapper.className += " CodeMirror-wrap"
        }
        var eA = ex.value;
        if (typeof eA == "string") {
            eA = new aa(ex.value, ex.mode)
        }
        b9(this, cQ)(this, eA);
        if (cf) {
            setTimeout(bO(dU, this, true), 20)
        }
        ee(this);
        var eD;
        try {
            eD = (document.activeElement == eB.input)
        } catch (ez) {}
        if (eD || (ex.autofocus && !cV)) {
            setTimeout(bO(bS, this), 20)
        } else {
            au(this)
        }
        b9(this, function() {
            for (var eF in aK) {
                if (aK.propertyIsEnumerable(eF)) {
                    aK[eF](this, ex[eF], bw)
                }
            }
            for (var eE = 0; eE < aE.length; ++eE) {
                aE[eE](this)
            }
        })()
    }

    function f(ew, ey) {
        var ez = {};
        var ex = ez.input = ej("textarea", null, null, "position: absolute; padding: 0; width: 1px; height: 1em; outline: none; font-size: 4px;");
        if (b8) {
            ex.style.width = "1000px"
        } else {
            ex.setAttribute("wrap", "off")
        }
        if (dy) {
            ex.style.border = "1px solid black"
        }
        ex.setAttribute("autocorrect", "off");
        ex.setAttribute("autocapitalize", "off");
        ex.setAttribute("spellcheck", "false");
        ez.inputDiv = ej("div", [ex], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        ez.scrollbarH = ej("div", [ej("div", null, null, "height: 1px")], "CodeMirror-hscrollbar");
        ez.scrollbarV = ej("div", [ej("div", null, null, "width: 1px")], "CodeMirror-vscrollbar");
        ez.scrollbarFiller = ej("div", null, "CodeMirror-scrollbar-filler");
        ez.gutterFiller = ej("div", null, "CodeMirror-gutter-filler");
        ez.lineDiv = ej("div", null, "CodeMirror-code");
        ez.selectionDiv = ej("div", null, null, "position: relative; z-index: 1");
        ez.cursor = ej("div", "\u00a0", "CodeMirror-cursor");
        ez.otherCursor = ej("div", "\u00a0", "CodeMirror-cursor CodeMirror-secondarycursor");
        ez.measure = ej("div", null, "CodeMirror-measure");
        ez.lineSpace = ej("div", [ez.measure, ez.selectionDiv, ez.lineDiv, ez.cursor, ez.otherCursor], null, "position: relative; outline: none");
        ez.mover = ej("div", [ej("div", [ez.lineSpace], "CodeMirror-lines")], null, "position: relative");
        ez.sizer = ej("div", [ez.mover], "CodeMirror-sizer");
        ez.heightForcer = ej("div", null, null, "position: absolute; height: " + aO + "px; width: 1px;");
        ez.gutters = ej("div", null, "CodeMirror-gutters");
        ez.lineGutter = null;
        ez.scroller = ej("div", [ez.sizer, ez.heightForcer, ez.gutters], "CodeMirror-scroll");
        ez.scroller.setAttribute("tabIndex", "-1");
        ez.wrapper = ej("div", [ez.inputDiv, ez.scrollbarH, ez.scrollbarV, ez.scrollbarFiller, ez.gutterFiller, ez.scroller], "CodeMirror");
        if (bF) {
            ez.gutters.style.zIndex = -1;
            ez.scroller.style.paddingRight = 0
        }
        if (ew.appendChild) {
            ew.appendChild(ez.wrapper)
        } else {
            ew(ez.wrapper)
        }
        if (dy) {
            ex.style.width = "0px"
        }
        if (!b8) {
            ez.scroller.draggable = true
        }
        if (aH) {
            ez.inputDiv.style.height = "1px";
            ez.inputDiv.style.position = "absolute"
        } else {
            if (bF) {
                ez.scrollbarH.style.minWidth = ez.scrollbarV.style.minWidth = "18px"
            }
        }
        ez.viewOffset = ez.lastSizeC = 0;
        ez.showingFrom = ez.showingTo = ey;
        ez.lineNumWidth = ez.lineNumInnerWidth = ez.lineNumChars = null;
        ez.prevInput = "";
        ez.alignWidgets = false;
        ez.pollingFast = false;
        ez.poll = new ev();
        ez.cachedCharWidth = ez.cachedTextHeight = null;
        ez.measureLineCache = [];
        ez.measureLineCachePos = 0;
        ez.inaccurateSelection = false;
        ez.maxLine = null;
        ez.maxLineLength = 0;
        ez.maxLineChanged = false;
        ez.wheelDX = ez.wheelDY = ez.wheelStartX = ez.wheelStartY = null;
        return ez
    }

    function aW(ew) {
        ew.doc.mode = B.getMode(ew.options, ew.doc.modeOption);
        cZ(ew)
    }

    function cZ(ew) {
        ew.doc.iter(function(ex) {
            if (ex.stateAfter) {
                ex.stateAfter = null
            }
            if (ex.styles) {
                ex.styles = null
            }
        });
        ew.doc.frontier = ew.doc.first;
        cU(ew, 100);
        ew.state.modeGen++;
        if (ew.curOp) {
            Q(ew)
        }
    }

    function dj(ew) {
        if (ew.options.lineWrapping) {
            ew.display.wrapper.className += " CodeMirror-wrap";
            ew.display.sizer.style.minWidth = ""
        } else {
            ew.display.wrapper.className = ew.display.wrapper.className.replace(" CodeMirror-wrap", "");
            em(ew)
        }
        L(ew);
        Q(ew);
        T(ew);
        setTimeout(function() {
            dw(ew)
        }, 100)
    }

    function aJ(ew) {
        var ey = aw(ew.display),
            ex = ew.options.lineWrapping;
        var ez = ex && Math.max(5, ew.display.scroller.clientWidth / cy(ew.display) - 3);
        return function(eA) {
            if (dZ(ew.doc, eA)) {
                return 0
            } else {
                if (ex) {
                    return (Math.ceil(eA.text.length / ez) || 1) * ey
                } else {
                    return ey
                }
            }
        }
    }

    function L(ew) {
        var ey = ew.doc,
            ex = aJ(ew);
        ey.iter(function(ez) {
            var eA = ex(ez);
            if (eA != ez.height) {
                eo(ez, eA)
            }
        })
    }

    function et(ew) {
        var ey = dF[ew.options.keyMap],
            ex = ey.style;
        ew.display.wrapper.className = ew.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") + (ex ? " cm-keymap-" + ex : "")
    }

    function b2(ew) {
        ew.display.wrapper.className = ew.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + ew.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        T(ew)
    }

    function ct(ew) {
        cR(ew);
        Q(ew);
        setTimeout(function() {
            df(ew)
        }, 20)
    }

    function cR(ew) {
        var ex = ew.display.gutters,
            eB = ew.options.gutters;
        cK(ex);
        for (var ey = 0; ey < eB.length; ++ey) {
            var ez = eB[ey];
            var eA = ex.appendChild(ej("div", null, "CodeMirror-gutter " + ez));
            if (ez == "CodeMirror-linenumbers") {
                ew.display.lineGutter = eA;
                eA.style.width = (ew.display.lineNumWidth || 1) + "px"
            }
        }
        ex.style.display = ey ? "" : "none"
    }

    function c0(eA, ey) {
        if (ey.height == 0) {
            return 0
        }
        var ex = ey.text.length,
            ew, eB = ey;
        while (ew = dn(eB)) {
            var ez = ew.find();
            eB = dJ(eA, ez.from.line);
            ex += ez.from.ch - ez.to.ch
        }
        eB = ey;
        while (ew = c5(eB)) {
            var ez = ew.find();
            ex -= eB.text.length - ez.from.ch;
            eB = dJ(eA, ez.to.line);
            ex += eB.text.length - ez.to.ch
        }
        return ex
    }

    function em(ew) {
        var ey = ew.display,
            ex = ew.doc;
        ey.maxLine = dJ(ex, ex.first);
        ey.maxLineLength = c0(ex, ey.maxLine);
        ey.maxLineChanged = true;
        ex.iter(function(eA) {
            var ez = c0(ex, eA);
            if (ez > ey.maxLineLength) {
                ey.maxLineLength = ez;
                ey.maxLine = eA
            }
        })
    }

    function by(ew) {
        var ex = cl(ew.gutters, "CodeMirror-linenumbers");
        if (ex == -1 && ew.lineNumbers) {
            ew.gutters = ew.gutters.concat(["CodeMirror-linenumbers"])
        } else {
            if (ex > -1 && !ew.lineNumbers) {
                ew.gutters = ew.gutters.slice(0);
                ew.gutters.splice(ex, 1)
            }
        }
    }

    function dw(ew) {
        var eC = ew.display,
            ex = ew.doc.height;
        var ez = ex + a7(eC);
        eC.sizer.style.minHeight = eC.heightForcer.style.top = ez + "px";
        eC.gutters.style.height = Math.max(ez, eC.scroller.clientHeight - aO) + "px";
        var eA = Math.max(ez, eC.scroller.scrollHeight);
        var eB = eC.scroller.scrollWidth > (eC.scroller.clientWidth + 1);
        var ey = eA > (eC.scroller.clientHeight + 1);
        if (ey) {
            eC.scrollbarV.style.display = "block";
            eC.scrollbarV.style.bottom = eB ? i(eC.measure) + "px" : "0";
            eC.scrollbarV.firstChild.style.height = (eA - eC.scroller.clientHeight + eC.scrollbarV.clientHeight) + "px"
        } else {
            eC.scrollbarV.style.display = "";
            eC.scrollbarV.firstChild.style.height = "0"
        }
        if (eB) {
            eC.scrollbarH.style.display = "block";
            eC.scrollbarH.style.right = ey ? i(eC.measure) + "px" : "0";
            eC.scrollbarH.firstChild.style.width = (eC.scroller.scrollWidth - eC.scroller.clientWidth + eC.scrollbarH.clientWidth) + "px"
        } else {
            eC.scrollbarH.style.display = "";
            eC.scrollbarH.firstChild.style.width = "0"
        }
        if (eB && ey) {
            eC.scrollbarFiller.style.display = "block";
            eC.scrollbarFiller.style.height = eC.scrollbarFiller.style.width = i(eC.measure) + "px"
        } else {
            eC.scrollbarFiller.style.display = ""
        }
        if (eB && ew.options.coverGutterNextToScrollbar && ew.options.fixedGutter) {
            eC.gutterFiller.style.display = "block";
            eC.gutterFiller.style.height = i(eC.measure) + "px";
            eC.gutterFiller.style.width = eC.gutters.offsetWidth + "px"
        } else {
            eC.gutterFiller.style.display = ""
        }
        if (bT && i(eC.measure) === 0) {
            eC.scrollbarV.style.minWidth = eC.scrollbarH.style.minHeight = cc ? "18px" : "12px";
            eC.scrollbarV.style.pointerEvents = eC.scrollbarH.style.pointerEvents = "none"
        }
    }

    function bp(eB, eA, ez) {
        var ey = eB.scroller.scrollTop,
            ew = eB.wrapper.clientHeight;
        if (typeof ez == "number") {
            ey = ez
        } else {
            if (ez) {
                ey = ez.top;
                ew = ez.bottom - ez.top
            }
        }
        ey = Math.floor(ey - dD(eB));
        var ex = Math.ceil(ey + ew);
        return {
            from: a5(eA, ey),
            to: a5(eA, ex)
        }
    }

    function df(ew) {
        var eC = ew.display;
        if (!eC.alignWidgets && (!eC.gutters.firstChild || !ew.options.fixedGutter)) {
            return
        }
        var ez = cJ(eC) - eC.scroller.scrollLeft + ew.doc.scrollLeft;
        var eB = eC.gutters.offsetWidth,
            ey = ez + "px";
        for (var eD = eC.lineDiv.firstChild; eD; eD = eD.nextSibling) {
            if (eD.alignable) {
                for (var eA = 0, ex = eD.alignable; eA < ex.length; ++eA) {
                    ex[eA].style.left = ey
                }
            }
        }
        if (ew.options.fixedGutter) {
            eC.gutters.style.left = (ez + eB) + "px"
        }
    }

    function cM(ew) {
        if (!ew.options.lineNumbers) {
            return false
        }
        var eB = ew.doc,
            ex = c3(ew.options, eB.first + eB.size - 1),
            eA = ew.display;
        if (ex.length != eA.lineNumChars) {
            var eC = eA.measure.appendChild(ej("div", [ej("div", ex)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
            var ey = eC.firstChild.offsetWidth,
                ez = eC.offsetWidth - ey;
            eA.lineGutter.style.width = "";
            eA.lineNumInnerWidth = Math.max(ey, eA.lineGutter.offsetWidth - ez);
            eA.lineNumWidth = eA.lineNumInnerWidth + ez;
            eA.lineNumChars = eA.lineNumInnerWidth ? ex.length : -1;
            eA.lineGutter.style.width = eA.lineNumWidth + "px";
            return true
        }
        return false
    }

    function c3(ew, ex) {
        return String(ew.lineNumberFormatter(ex + ew.firstLineNumber))
    }

    function cJ(ew) {
        return an(ew.scroller).left - an(ew.sizer).left
    }

    function cB(eB, eA, eE, eF) {
        var eD = eB.display.showingFrom,
            eC = eB.display.showingTo,
            ez;
        var ew = bp(eB.display, eB.doc, eE);
        for (var ey = true;; ey = false) {
            var ex = eB.display.scroller.clientWidth;
            if (!cj(eB, eA, ew, eF)) {
                break
            }
            ez = true;
            eA = [];
            a2(eB);
            dw(eB);
            if (ey && eB.options.lineWrapping && ex != eB.display.scroller.clientWidth) {
                eF = true;
                continue
            }
            eF = false;
            if (eE) {
                eE = Math.min(eB.display.scroller.scrollHeight - eB.display.scroller.clientHeight, typeof eE == "number" ? eE : eE.top)
            }
            ew = bp(eB.display, eB.doc, eE);
            if (ew.from >= eB.display.showingFrom && ew.to <= eB.display.showingTo) {
                break
            }
        }
        if (ez) {
            O(eB, "update", eB);
            if (eB.display.showingFrom != eD || eB.display.showingTo != eC) {
                O(eB, "viewportChange", eB, eB.display.showingFrom, eB.display.showingTo)
            }
        }
        return ez
    }

    function cj(eA, eO, ex, eM) {
        var eG = eA.display,
            eP = eA.doc;
        if (!eG.wrapper.offsetWidth) {
            eG.showingFrom = eG.showingTo = eP.first;
            eG.viewOffset = 0;
            return
        }
        if (!eM && eO.length == 0 && ex.from > eG.showingFrom && ex.to < eG.showingTo) {
            return
        }
        if (cM(eA)) {
            eO = [{
                from: eP.first,
                to: eP.first + eP.size
            }]
        }
        var eL = eG.sizer.style.marginLeft = eG.gutters.offsetWidth + "px";
        eG.scrollbarH.style.left = eA.options.fixedGutter ? eL : "0";
        var ey = Infinity;
        if (eA.options.lineNumbers) {
            for (var eH = 0; eH < eO.length; ++eH) {
                if (eO[eH].diff && eO[eH].from < ey) {
                    ey = eO[eH].from
                }
            }
        }
        var ez = eP.first + eP.size;
        var eF = Math.max(ex.from - eA.options.viewportMargin, eP.first);
        var ew = Math.min(ez, ex.to + eA.options.viewportMargin);
        if (eG.showingFrom < eF && eF - eG.showingFrom < 20) {
            eF = Math.max(eP.first, eG.showingFrom)
        }
        if (eG.showingTo > ew && eG.showingTo - ew < 20) {
            ew = Math.min(ez, eG.showingTo)
        }
        if (aD) {
            eF = bc(u(eP, dJ(eP, eF)));
            while (ew < ez && dZ(eP, dJ(eP, ew))) {
                ++ew
            }
        }
        var eJ = [{
            from: Math.max(eG.showingFrom, eP.first),
            to: Math.min(eG.showingTo, ez)
        }];
        if (eJ[0].from >= eJ[0].to) {
            eJ = []
        } else {
            eJ = dT(eJ, eO)
        }
        if (aD) {
            for (var eH = 0; eH < eJ.length; ++eH) {
                var eC = eJ[eH],
                    eK;
                while (eK = c5(dJ(eP, eC.to - 1))) {
                    var eN = eK.find().from.line;
                    if (eN > eC.from) {
                        eC.to = eN
                    } else {
                        eJ.splice(eH--, 1);
                        break
                    }
                }
            }
        }
        var eE = 0;
        for (var eH = 0; eH < eJ.length; ++eH) {
            var eC = eJ[eH];
            if (eC.from < eF) {
                eC.from = eF
            }
            if (eC.to > ew) {
                eC.to = ew
            }
            if (eC.from >= eC.to) {
                eJ.splice(eH--, 1)
            } else {
                eE += eC.to - eC.from
            }
        }
        if (!eM && eE == ew - eF && eF == eG.showingFrom && ew == eG.showingTo) {
            h(eA);
            return
        }
        eJ.sort(function(eR, eQ) {
            return eR.from - eQ.from
        });
        try {
            var eB = document.activeElement
        } catch (eI) {}
        if (eE < (ew - eF) * 0.7) {
            eG.lineDiv.style.display = "none"
        }
        bG(eA, eF, ew, eJ, ey);
        eG.lineDiv.style.display = "";
        if (eB && document.activeElement != eB && eB.offsetHeight) {
            eB.focus()
        }
        var eD = eF != eG.showingFrom || ew != eG.showingTo || eG.lastSizeC != eG.wrapper.clientHeight;
        if (eD) {
            eG.lastSizeC = eG.wrapper.clientHeight;
            cU(eA, 400)
        }
        eG.showingFrom = eF;
        eG.showingTo = ew;
        eG.gutters.style.height = "";
        aF(eA);
        h(eA);
        return true
    }

    function aF(eE) {
        var eB = eE.display;
        var ex = eB.lineDiv.offsetTop;
        for (var ew = eB.lineDiv.firstChild, eF; ew; ew = ew.nextSibling) {
            if (ew.lineObj) {
                if (bF) {
                    var eA = ew.offsetTop + ew.offsetHeight;
                    eF = eA - ex;
                    ex = eA
                } else {
                    var ez = an(ew);
                    eF = ez.bottom - ez.top
                }
                var eD = ew.lineObj.height - eF;
                if (eF < 2) {
                    eF = aw(eB)
                }
                if (eD > 0.001 || eD < -0.001) {
                    eo(ew.lineObj, eF);
                    var eC = ew.lineObj.widgets;
                    if (eC) {
                        for (var ey = 0; ey < eC.length; ++ey) {
                            eC[ey].height = eC[ey].node.offsetHeight
                        }
                    }
                }
            }
        }
    }

    function h(ew) {
        var ex = ew.display.viewOffset = bb(ew, dJ(ew.doc, ew.display.showingFrom));
        ew.display.mover.style.top = ex + "px"
    }

    function dT(eF, eD) {
        for (var eA = 0, ey = eD.length || 0; eA < ey; ++eA) {
            var eC = eD[eA],
                ew = [],
                eE = eC.diff || 0;
            for (var ez = 0, ex = eF.length; ez < ex; ++ez) {
                var eB = eF[ez];
                if (eC.to <= eB.from && eC.diff) {
                    ew.push({
                        from: eB.from + eE,
                        to: eB.to + eE
                    })
                } else {
                    if (eC.to <= eB.from || eC.from >= eB.to) {
                        ew.push(eB)
                    } else {
                        if (eC.from > eB.from) {
                            ew.push({
                                from: eB.from,
                                to: eC.from
                            })
                        }
                        if (eC.to < eB.to) {
                            ew.push({
                                from: eC.to + eE,
                                to: eB.to + eE
                            })
                        }
                    }
                }
            }
            eF = ew
        }
        return eF
    }

    function dG(ew) {
        var eA = ew.display,
            ez = {},
            ey = {};
        for (var eB = eA.gutters.firstChild, ex = 0; eB; eB = eB.nextSibling, ++ex) {
            ez[ew.options.gutters[ex]] = eB.offsetLeft;
            ey[ew.options.gutters[ex]] = eB.offsetWidth
        }
        return {
            fixedPos: cJ(eA),
            gutterTotalWidth: eA.gutters.offsetWidth,
            gutterLeft: ez,
            gutterWidth: ey,
            wrapperWidth: eA.wrapper.clientWidth
        }
    }

    function bG(eF, eC, eD, eI, ex) {
        var eE = dG(eF);
        var eB = eF.display,
            eH = eF.options.lineNumbers;
        if (!eI.length && (!b8 || !eF.display.currentWheelTarget)) {
            cK(eB.lineDiv)
        }
        var ew = eB.lineDiv,
            eG = ew.firstChild;

        function eA(eK) {
            var eJ = eK.nextSibling;
            if (b8 && bq && eF.display.currentWheelTarget == eK) {
                eK.style.display = "none";
                eK.lineObj = null
            } else {
                eK.parentNode.removeChild(eK)
            }
            return eJ
        }
        var ey = eI.shift(),
            ez = eC;
        eF.doc.iter(eC, eD, function(eS) {
            if (ey && ey.to == ez) {
                ey = eI.shift()
            }
            if (dZ(eF.doc, eS)) {
                if (eS.height != 0) {
                    eo(eS, 0)
                }
                if (eS.widgets && eG && eG.previousSibling) {
                    for (var eN = 0; eN < eS.widgets.length; ++eN) {
                        var eP = eS.widgets[eN];
                        if (eP.showIfHidden) {
                            var eL = eG.previousSibling;
                            if (/pre/i.test(eL.nodeName)) {
                                var eK = ej("div", null, null, "position: relative");
                                eL.parentNode.replaceChild(eK, eL);
                                eK.appendChild(eL);
                                eL = eK
                            }
                            var eQ = eL.appendChild(ej("div", [eP.node], "CodeMirror-linewidget"));
                            if (!eP.handleMouseEvents) {
                                eQ.ignoreEvents = true
                            }
                            a4(eP, eQ, eL, eE)
                        }
                    }
                }
            } else {
                if (ey && ey.from <= ez && ey.to > ez) {
                    while (eG.lineObj != eS) {
                        eG = eA(eG)
                    }
                    if (eH && ex <= ez && eG.lineNumber) {
                        l(eG.lineNumber, c3(eF.options, ez))
                    }
                    eG = eG.nextSibling
                } else {
                    if (eS.widgets) {
                        for (var eM = 0, eR = eG, eO; eR && eM < 20; ++eM, eR = eR.nextSibling) {
                            if (eR.lineObj == eS && /div/i.test(eR.nodeName)) {
                                eO = eR;
                                break
                            }
                        }
                    }
                    var eJ = ai(eF, eS, ez, eE, eO);
                    if (eJ != eO) {
                        ew.insertBefore(eJ, eG)
                    } else {
                        while (eG != eO) {
                            eG = eA(eG)
                        }
                        eG = eG.nextSibling
                    }
                    eJ.lineObj = eS
                }
            }++ez
        });
        while (eG) {
            eG = eA(eG)
        }
    }

    function ai(eD, eF, eG, eJ, ey) {
        var eC = dq(eD, eF),
            eP = eC.pre;
        var eS = eF.gutterMarkers,
            eQ = eD.display,
            eE;
        var ex = eC.bgClass ? eC.bgClass + " " + (eF.bgClass || "") : eF.bgClass;
        if (!eD.options.lineNumbers && !eS && !ex && !eF.wrapClass && !eF.widgets) {
            return eP
        }
        if (ey) {
            ey.alignable = null;
            var eT = true,
                eB = 0,
                ez = null;
            for (var eL = ey.firstChild, eK; eL; eL = eK) {
                eK = eL.nextSibling;
                if (!/\bCodeMirror-linewidget\b/.test(eL.className)) {
                    ey.removeChild(eL)
                } else {
                    for (var eR = 0; eR < eF.widgets.length; ++eR) {
                        var eA = eF.widgets[eR];
                        if (eA.node == eL.firstChild) {
                            if (!eA.above && !ez) {
                                ez = eL
                            }
                            a4(eA, eL, ey, eJ);
                            ++eB;
                            break
                        }
                    }
                    if (eR == eF.widgets.length) {
                        eT = false;
                        break
                    }
                }
            }
            ey.insertBefore(eP, ez);
            if (eT && eB == eF.widgets.length) {
                eE = ey;
                ey.className = eF.wrapClass || ""
            }
        }
        if (!eE) {
            eE = ej("div", null, eF.wrapClass, "position: relative");
            eE.appendChild(eP)
        }
        if (ex) {
            eE.insertBefore(ej("div", null, ex + " CodeMirror-linebackground"), eE.firstChild)
        }
        if (eD.options.lineNumbers || eS) {
            var eN = eE.insertBefore(ej("div", null, "CodeMirror-gutter-wrapper", "position: absolute; left: " + (eD.options.fixedGutter ? eJ.fixedPos : -eJ.gutterTotalWidth) + "px"), eP);
            if (eD.options.fixedGutter) {
                (eE.alignable || (eE.alignable = [])).push(eN)
            }
            if (eD.options.lineNumbers && (!eS || !eS["CodeMirror-linenumbers"])) {
                eE.lineNumber = eN.appendChild(ej("div", c3(eD.options, eG), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + eJ.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + eQ.lineNumInnerWidth + "px"))
            }
            if (eS) {
                for (var eO = 0; eO < eD.options.gutters.length; ++eO) {
                    var eI = eD.options.gutters[eO],
                        eH = eS.hasOwnProperty(eI) && eS[eI];
                    if (eH) {
                        eN.appendChild(ej("div", [eH], "CodeMirror-gutter-elt", "left: " + eJ.gutterLeft[eI] + "px; width: " + eJ.gutterWidth[eI] + "px"))
                    }
                }
            }
        }
        if (bF) {
            eE.style.zIndex = 2
        }
        if (eF.widgets && eE != ey) {
            for (var eR = 0, ew = eF.widgets; eR < ew.length; ++eR) {
                var eA = ew[eR],
                    eM = ej("div", [eA.node], "CodeMirror-linewidget");
                if (!eA.handleMouseEvents) {
                    eM.ignoreEvents = true
                }
                a4(eA, eM, eE, eJ);
                if (eA.above) {
                    eE.insertBefore(eM, eD.options.lineNumbers && eF.height != 0 ? eN : eP)
                } else {
                    eE.appendChild(eM)
                }
                O(eA, "redraw")
            }
        }
        return eE
    }

    function a4(ez, ey, ex, eA) {
        if (ez.noHScroll) {
            (ex.alignable || (ex.alignable = [])).push(ey);
            var ew = eA.wrapperWidth;
            ey.style.left = eA.fixedPos + "px";
            if (!ez.coverGutter) {
                ew -= eA.gutterTotalWidth;
                ey.style.paddingLeft = eA.gutterTotalWidth + "px"
            }
            ey.style.width = ew + "px"
        }
        if (ez.coverGutter) {
            ey.style.zIndex = 5;
            ey.style.position = "relative";
            if (!ez.noHScroll) {
                ey.style.marginLeft = -eA.gutterTotalWidth + "px"
            }
        }
    }

    function a2(ew) {
        var ez = ew.display;
        var eA = d8(ew.doc.sel.from, ew.doc.sel.to);
        if (eA || ew.options.showCursorWhenSelecting) {
            C(ew)
        } else {
            ez.cursor.style.display = ez.otherCursor.style.display = "none"
        }
        if (!eA) {
            V(ew)
        } else {
            ez.selectionDiv.style.display = "none"
        }
        if (ew.options.moveInputWithCursor) {
            var eB = cH(ew, ew.doc.sel.head, "div");
            var ex = an(ez.wrapper),
                ey = an(ez.lineDiv);
            ez.inputDiv.style.top = Math.max(0, Math.min(ez.wrapper.clientHeight - 10, eB.top + ey.top - ex.top)) + "px";
            ez.inputDiv.style.left = Math.max(0, Math.min(ez.wrapper.clientWidth - 10, eB.left + ey.left - ex.left)) + "px"
        }
    }

    function C(ew) {
        var ex = ew.display,
            ey = cH(ew, ew.doc.sel.head, "div");
        ex.cursor.style.left = ey.left + "px";
        ex.cursor.style.top = ey.top + "px";
        ex.cursor.style.height = Math.max(0, ey.bottom - ey.top) * ew.options.cursorHeight + "px";
        ex.cursor.style.display = "";
        if (ey.other) {
            ex.otherCursor.style.display = "";
            ex.otherCursor.style.left = ey.other.left + "px";
            ex.otherCursor.style.top = ey.other.top + "px";
            ex.otherCursor.style.height = (ey.other.bottom - ey.other.top) * 0.85 + "px"
        } else {
            ex.otherCursor.style.display = "none"
        }
    }

    function V(eH) {
        var eC = eH.display,
            eG = eH.doc,
            ew = eH.doc.sel;
        var eA = document.createDocumentFragment();
        var eF = eC.lineSpace.offsetWidth,
            ey = av(eH.display);

        function eJ(eN, eM, eL, eK) {
            if (eM < 0) {
                eM = 0
            }
            eA.appendChild(ej("div", null, "CodeMirror-selected", "position: absolute; left: " + eN + "px; top: " + eM + "px; width: " + (eL == null ? eF - eN : eL) + "px; height: " + (eK - eM) + "px"))
        }

        function eE(eL, eN, eQ) {
            var eM = dJ(eG, eL);
            var eO = eM.text.length;
            var eR, eK;

            function eP(eT, eS) {
                return bZ(eH, K(eL, eT), "div", eM, eS)
            }
            cL(a(eM), eN || 0, eQ == null ? eO : eQ, function(eZ, eY, eS) {
                var eV = eP(eZ, "left"),
                    eW, eX, eU;
                if (eZ == eY) {
                    eW = eV;
                    eX = eU = eV.left
                } else {
                    eW = eP(eY - 1, "right");
                    if (eS == "rtl") {
                        var eT = eV;
                        eV = eW;
                        eW = eT
                    }
                    eX = eV.left;
                    eU = eW.right
                }
                if (eN == null && eZ == 0) {
                    eX = ey
                }
                if (eW.top - eV.top > 3) {
                    eJ(eX, eV.top, null, eV.bottom);
                    eX = ey;
                    if (eV.bottom < eW.top) {
                        eJ(eX, eV.bottom, null, eW.top)
                    }
                }
                if (eQ == null && eY == eO) {
                    eU = eF
                }
                if (!eR || eV.top < eR.top || eV.top == eR.top && eV.left < eR.left) {
                    eR = eV
                }
                if (!eK || eW.bottom > eK.bottom || eW.bottom == eK.bottom && eW.right > eK.right) {
                    eK = eW
                }
                if (eX < ey + 1) {
                    eX = ey
                }
                eJ(eX, eW.top, eU - eX, eW.bottom)
            });
            return {
                start: eR,
                end: eK
            }
        }
        if (ew.from.line == ew.to.line) {
            eE(ew.from.line, ew.from.ch, ew.to.ch)
        } else {
            var ez = dJ(eG, ew.from.line),
                ex = dJ(eG, ew.to.line);
            var eB = u(eG, ez) == u(eG, ex);
            var eI = eE(ew.from.line, ew.from.ch, eB ? ez.text.length : null).end;
            var eD = eE(ew.to.line, eB ? 0 : null, ew.to.ch).start;
            if (eB) {
                if (eI.top < eD.top - 2) {
                    eJ(eI.right, eI.top, null, eI.bottom);
                    eJ(ey, eD.top, eD.left, eD.bottom)
                } else {
                    eJ(eI.right, eI.top, eD.left - eI.right, eI.bottom)
                }
            }
            if (eI.bottom < eD.top) {
                eJ(ey, eI.bottom, null, eD.top)
            }
        }
        bf(eC.selectionDiv, eA);
        eC.selectionDiv.style.display = ""
    }

    function k(ew) {
        if (!ew.state.focused) {
            return
        }
        var ey = ew.display;
        clearInterval(ey.blinker);
        var ex = true;
        ey.cursor.style.visibility = ey.otherCursor.style.visibility = "";
        if (ew.options.cursorBlinkRate > 0) {
            ey.blinker = setInterval(function() {
                ey.cursor.style.visibility = ey.otherCursor.style.visibility = (ex = !ex) ? "" : "hidden"
            }, ew.options.cursorBlinkRate)
        }
    }

    function cU(ew, ex) {
        if (ew.doc.mode.startState && ew.doc.frontier < ew.display.showingTo) {
            ew.state.highlight.set(ex, bO(b3, ew))
        }
    }

    function b3(ew) {
        var ez = ew.doc;
        if (ez.frontier < ez.first) {
            ez.frontier = ez.first
        }
        if (ez.frontier >= ew.display.showingTo) {
            return
        }
        var ex = +new Date + ew.options.workTime;
        var ey = bo(ez.mode, cw(ew, ez.frontier));
        var eB = [],
            eA;
        ez.iter(ez.frontier, Math.min(ez.first + ez.size, ew.display.showingTo + 500), function(eC) {
            if (ez.frontier >= ew.display.showingFrom) {
                var eE = eC.styles;
                eC.styles = d4(ew, eC, ey, true);
                var eF = !eE || eE.length != eC.styles.length;
                for (var eD = 0; !eF && eD < eE.length; ++eD) {
                    eF = eE[eD] != eC.styles[eD]
                }
                if (eF) {
                    if (eA && eA.end == ez.frontier) {
                        eA.end++
                    } else {
                        eB.push(eA = {
                            start: ez.frontier,
                            end: ez.frontier + 1
                        })
                    }
                }
                eC.stateAfter = bo(ez.mode, ey)
            } else {
                cu(ew, eC.text, ey);
                eC.stateAfter = ez.frontier % 5 == 0 ? bo(ez.mode, ey) : null
            }++ez.frontier;
            if (+new Date > ex) {
                cU(ew, ew.options.workDelay);
                return true
            }
        });
        if (eB.length) {
            b9(ew, function() {
                for (var eC = 0; eC < eB.length; ++eC) {
                    Q(this, eB[eC].start, eB[eC].end)
                }
            })()
        }
    }

    function bQ(eC, ew, ez) {
        var ex, eA, eB = eC.doc;
        var ey = ez ? -1 : ew - (eC.doc.mode.innerMode ? 1000 : 100);
        for (var eF = ew; eF > ey; --eF) {
            if (eF <= eB.first) {
                return eB.first
            }
            var eE = dJ(eB, eF - 1);
            if (eE.stateAfter && (!ez || eF <= eB.frontier)) {
                return eF
            }
            var eD = bg(eE.text, null, eC.options.tabSize);
            if (eA == null || ex > eD) {
                eA = eF - 1;
                ex = eD
            }
        }
        return eA
    }

    function cw(ew, eC, ex) {
        var eA = ew.doc,
            ez = ew.display;
        if (!eA.mode.startState) {
            return true
        }
        var eB = bQ(ew, eC, ex),
            ey = eB > eA.first && dJ(eA, eB - 1).stateAfter;
        if (!ey) {
            ey = bm(eA.mode)
        } else {
            ey = bo(eA.mode, ey)
        }
        eA.iter(eB, eC, function(eD) {
            cu(ew, eD.text, ey);
            var eE = eB == eC - 1 || eB % 5 == 0 || eB >= ez.showingFrom && eB < ez.showingTo;
            eD.stateAfter = eE ? bo(eA.mode, ey) : null;
            ++eB
        });
        if (ex) {
            eA.frontier = eB
        }
        return ey
    }

    function dD(ew) {
        return ew.lineSpace.offsetTop
    }

    function a7(ew) {
        return ew.mover.offsetHeight - ew.lineSpace.offsetHeight
    }

    function av(ex) {
        var ew = bf(ex.measure, ej("pre", null, null, "text-align: left")).appendChild(ej("span", "x"));
        return ew.offsetLeft
    }

    function cW(eD, eE, ex, eA, eB) {
        var ez = -1;
        eA = eA || a8(eD, eE);
        if (eA.crude) {
            var ey = eA.left + ex * eA.width;
            return {
                left: ey,
                right: ey + eA.width,
                top: eA.top,
                bottom: eA.bottom
            }
        }
        for (var eC = ex;; eC += ez) {
            var ew = eA[eC];
            if (ew) {
                break
            }
            if (ez < 0 && eC == 0) {
                ez = 1
            }
        }
        eB = eC > ex ? "left" : eC < ex ? "right" : eB;
        if (eB == "left" && ew.leftSide) {
            ew = ew.leftSide
        } else {
            if (eB == "right" && ew.rightSide) {
                ew = ew.rightSide
            }
        }
        return {
            left: eC < ex ? ew.right : ew.left,
            right: eC > ex ? ew.left : ew.right,
            top: ew.top,
            bottom: ew.bottom
        }
    }

    function dB(ew, ex) {
        var ez = ew.display.measureLineCache;
        for (var eA = 0; eA < ez.length; ++eA) {
            var ey = ez[eA];
            if (ey.text == ex.text && ey.markedSpans == ex.markedSpans && ew.display.scroller.clientWidth == ey.width && ey.classes == ex.textClass + "|" + ex.wrapClass) {
                return ey
            }
        }
    }

    function ec(ew, ex) {
        var ey = dB(ew, ex);
        if (ey) {
            ey.text = ey.measure = ey.markedSpans = null
        }
    }

    function a8(ew, ex) {
        var eB = dB(ew, ex);
        if (eB) {
            return eB.measure
        }
        var eA = ci(ew, ex);
        var ez = ew.display.measureLineCache;
        var ey = {
            text: ex.text,
            width: ew.display.scroller.clientWidth,
            markedSpans: ex.markedSpans,
            measure: eA,
            classes: ex.textClass + "|" + ex.wrapClass
        };
        if (ez.length == 16) {
            ez[++ew.display.measureLineCachePos % 16] = ey
        } else {
            ez.push(ey)
        }
        return eA
    }

    function ci(eD, eF) {
        if (!eD.options.lineWrapping && eF.text.length >= eD.options.crudeMeasuringFrom) {
            return ek(eD, eF)
        }
        var eL = eD.display,
            eB = U(eF.text.length);
        var eI = dq(eD, eF, eB, true).pre;
        if (cf && !bF && !eD.options.lineWrapping && eI.childNodes.length > 100) {
            var ey = document.createDocumentFragment();
            var eG = 10,
                eJ = eI.childNodes.length;
            for (var eN = 0, eH = Math.ceil(eJ / eG); eN < eH; ++eN) {
                var eE = ej("div", null, null, "display: inline-block");
                for (var eM = 0; eM < eG && eJ; ++eM) {
                    eE.appendChild(eI.firstChild);
                    --eJ
                }
                ey.appendChild(eE)
            }
            eI.appendChild(ey)
        }
        bf(eL.measure, eI);
        var ex = an(eL.lineDiv);
        var ew = [],
            eQ = U(eF.text.length),
            eP = eI.offsetHeight;
        if (bE && eL.measure.first != eI) {
            bf(eL.measure, eI)
        }

        function eO(eT) {
            var eV = eT.top - ex.top,
                eX = eT.bottom - ex.top;
            if (eX > eP) {
                eX = eP
            }
            if (eV < 0) {
                eV = 0
            }
            for (var eS = ew.length - 2; eS >= 0; eS -= 2) {
                var eU = ew[eS],
                    eW = ew[eS + 1];
                if (eU > eX || eW < eV) {
                    continue
                }
                if (eU <= eV && eW >= eX || eV <= eU && eX >= eW || Math.min(eX, eW) - Math.max(eV, eU) >= (eX - eV) >> 1) {
                    ew[eS] = Math.min(eV, eU);
                    ew[eS + 1] = Math.max(eX, eW);
                    break
                }
            }
            if (eS < 0) {
                eS = ew.length;
                ew.push(eV, eX)
            }
            return {
                left: eT.left - ex.left,
                right: eT.right - ex.left,
                top: eS,
                bottom: null
            }
        }

        function eR(eS) {
            eS.bottom = ew[eS.top + 1];
            eS.top = ew[eS.top]
        }
        for (var eN = 0, eA; eN < eB.length; ++eN) {
            if (eA = eB[eN]) {
                var eK = eA,
                    ez = null;
                if (/\bCodeMirror-widget\b/.test(eA.className) && eA.getClientRects) {
                    if (eA.firstChild.nodeType == 1) {
                        eK = eA.firstChild
                    }
                    var eC = eK.getClientRects();
                    if (eC.length > 1) {
                        ez = eQ[eN] = eO(eC[0]);
                        ez.rightSide = eO(eC[eC.length - 1])
                    }
                }
                if (!ez) {
                    ez = eQ[eN] = eO(an(eK))
                }
                if (eA.measureRight) {
                    ez.right = an(eA.measureRight).left - ex.left
                }
                if (eA.leftSide) {
                    ez.leftSide = eO(an(eA.leftSide))
                }
            }
        }
        cK(eD.display.measure);
        for (var eN = 0, eA; eN < eQ.length; ++eN) {
            if (eA = eQ[eN]) {
                eR(eA);
                if (eA.leftSide) {
                    eR(eA.leftSide)
                }
                if (eA.rightSide) {
                    eR(eA.rightSide)
                }
            }
        }
        return eQ
    }

    function ek(ew, ex) {
        var eB = new en(ex.text.slice(0, 100), null);
        if (ex.textClass) {
            eB.textClass = ex.textClass
        }
        var ez = ci(ew, eB);
        var eA = cW(ew, eB, 0, ez, "left");
        var ey = cW(ew, eB, 99, ez, "right");
        return {
            crude: true,
            top: eA.top,
            left: eA.left,
            bottom: eA.bottom,
            width: (ey.right - eA.left) / 100
        }
    }

    function dg(ew, ey) {
        var eD = false;
        if (ey.markedSpans) {
            for (var ez = 0; ez < ey.markedSpans; ++ez) {
                var eB = ey.markedSpans[ez];
                if (eB.collapsed && (eB.to == null || eB.to == ey.text.length)) {
                    eD = true
                }
            }
        }
        var eA = !eD && dB(ew, ey);
        if (eA || ey.text.length >= ew.options.crudeMeasuringFrom) {
            return cW(ew, ey, ey.text.length, eA && eA.measure, "right").right
        }
        var eC = dq(ew, ey, null, true).pre;
        var ex = eC.appendChild(aS(ew.display.measure));
        bf(ew.display.measure, eC);
        return an(ex).right - an(ew.display.lineDiv).left
    }

    function T(ew) {
        ew.display.measureLineCache.length = ew.display.measureLineCachePos = 0;
        ew.display.cachedCharWidth = ew.display.cachedTextHeight = null;
        if (!ew.options.lineWrapping) {
            ew.display.maxLineChanged = true
        }
        ew.display.lineNumChars = null
    }

    function bN() {
        return window.pageXOffset || (document.documentElement || document.body).scrollLeft
    }

    function bM() {
        return window.pageYOffset || (document.documentElement || document.body).scrollTop
    }

    function dp(eC, ez, eB, ex) {
        if (ez.widgets) {
            for (var ey = 0; ey < ez.widgets.length; ++ey) {
                if (ez.widgets[ey].above) {
                    var eE = b6(ez.widgets[ey]);
                    eB.top += eE;
                    eB.bottom += eE
                }
            }
        }
        if (ex == "line") {
            return eB
        }
        if (!ex) {
            ex = "local"
        }
        var eA = bb(eC, ez);
        if (ex == "local") {
            eA += dD(eC.display)
        } else {
            eA -= eC.display.viewOffset
        }
        if (ex == "page" || ex == "window") {
            var ew = an(eC.display.lineSpace);
            eA += ew.top + (ex == "window" ? 0 : bM());
            var eD = ew.left + (ex == "window" ? 0 : bN());
            eB.left += eD;
            eB.right += eD
        }
        eB.top += eA;
        eB.bottom += eA;
        return eB
    }

    function es(ex, eA, ey) {
        if (ey == "div") {
            return eA
        }
        var eC = eA.left,
            eB = eA.top;
        if (ey == "page") {
            eC -= bN();
            eB -= bM()
        } else {
            if (ey == "local" || !ey) {
                var ez = an(ex.display.sizer);
                eC += ez.left;
                eB += ez.top
            }
        }
        var ew = an(ex.display.lineSpace);
        return {
            left: eC - ew.left,
            top: eB - ew.top
        }
    }

    function bZ(ew, eA, ez, ey, ex) {
        if (!ey) {
            ey = dJ(ew.doc, eA.line)
        }
        return dp(ew, ey, cW(ew, ey, eA.ch, null, ex), ez)
    }

    function cH(eF, eE, ey, eD, eB) {
        eD = eD || dJ(eF.doc, eE.line);
        if (!eB) {
            eB = a8(eF, eD)
        }

        function eA(eJ, eI) {
            var eH = cW(eF, eD, eJ, eB, eI ? "right" : "left");
            if (eI) {
                eH.left = eH.right
            } else {
                eH.right = eH.left
            }
            return dp(eF, eD, eH, ey)
        }

        function eG(eK, eH) {
            var eI = eC[eH],
                eJ = eI.level % 2;
            if (eK == cv(eI) && eH && eI.level < eC[eH - 1].level) {
                eI = eC[--eH];
                eK = er(eI) - (eI.level % 2 ? 0 : 1);
                eJ = true
            } else {
                if (eK == er(eI) && eH < eC.length - 1 && eI.level < eC[eH + 1].level) {
                    eI = eC[++eH];
                    eK = cv(eI) - eI.level % 2;
                    eJ = false
                }
            }
            if (eJ && eK == eI.to && eK > eI.from) {
                return eA(eK - 1)
            }
            return eA(eK, eJ)
        }
        var eC = a(eD),
            ew = eE.ch;
        if (!eC) {
            return eA(ew)
        }
        var ex = aj(eC, ew);
        var ez = eG(ew, ex);
        if (dz != null) {
            ez.other = eG(ew, dz)
        }
        return ez
    }

    function ei(ew, ex, ey, eA) {
        var ez = new K(ew, ex);
        ez.xRel = eA;
        if (ey) {
            ez.outside = true
        }
        return ez
    }

    function ed(eD, eA, ez) {
        var eC = eD.doc;
        ez += eD.display.viewOffset;
        if (ez < 0) {
            return ei(eC.first, 0, true, -1)
        }
        var ex = a5(eC, ez),
            eE = eC.first + eC.size - 1;
        if (ex > eE) {
            return ei(eC.first + eC.size - 1, dJ(eC, eE).text.length, true, 1)
        }
        if (eA < 0) {
            eA = 0
        }
        for (;;) {
            var ey = dJ(eC, ex);
            var eF = b7(eD, ey, ex, eA, ez);
            var eB = c5(ey);
            var ew = eB && eB.find();
            if (eB && (eF.ch > ew.from.ch || eF.ch == ew.from.ch && eF.xRel > 0)) {
                ex = ew.to.line
            } else {
                return eF
            }
        }
    }

    function b7(eG, ey, eJ, eI, eH) {
        var eF = eH - bb(eG, ey);
        var eC = false,
            eP = 2 * eG.display.wrapper.clientWidth;
        var eO = a8(eG, ey);

        function eT(eV) {
            var eW = cH(eG, K(eJ, eV), "line", ey, eO);
            eC = true;
            if (eF > eW.bottom) {
                return eW.left - eP
            } else {
                if (eF < eW.top) {
                    return eW.left + eP
                } else {
                    eC = false
                }
            }
            return eW.left
        }
        var eL = a(ey),
            eN = ey.text.length;
        var eQ = bU(ey),
            ez = b4(ey);
        var eM = eT(eQ),
            ew = eC,
            ex = eT(ez),
            eB = eC;
        if (eI > ex) {
            return ei(eJ, ez, eB, 1)
        }
        for (;;) {
            if (eL ? ez == eQ || ez == q(ey, eQ, 1) : ez - eQ <= 1) {
                var eK = eI < eM || eI - eM <= ex - eI ? eQ : ez;
                var eS = eI - (eK == eQ ? eM : ex);
                while (dV(ey.text.charAt(eK))) {
                    ++eK
                }
                var eE = ei(eJ, eK, eK == eQ ? ew : eB, eS < 0 ? -1 : eS ? 1 : 0);
                return eE
            }
            var eD = Math.ceil(eN / 2),
                eU = eQ + eD;
            if (eL) {
                eU = eQ;
                for (var eR = 0; eR < eD; ++eR) {
                    eU = q(ey, eU, 1)
                }
            }
            var eA = eT(eU);
            if (eA > eI) {
                ez = eU;
                ex = eA;
                if (eB = eC) {
                    ex += 1000
                }
                eN = eD
            } else {
                eQ = eU;
                eM = eA;
                ew = eC;
                eN -= eD
            }
        }
    }
    var ak;

    function aw(ey) {
        if (ey.cachedTextHeight != null) {
            return ey.cachedTextHeight
        }
        if (ak == null) {
            ak = ej("pre");
            for (var ex = 0; ex < 49; ++ex) {
                ak.appendChild(document.createTextNode("x"));
                ak.appendChild(ej("br"))
            }
            ak.appendChild(document.createTextNode("x"))
        }
        bf(ey.measure, ak);
        var ew = ak.offsetHeight / 50;
        if (ew > 3) {
            ey.cachedTextHeight = ew
        }
        cK(ey.measure);
        return ew || 1
    }

    function cy(ez) {
        if (ez.cachedCharWidth != null) {
            return ez.cachedCharWidth
        }
        var ew = ej("span", "x");
        var ey = ej("pre", [ew]);
        bf(ez.measure, ey);
        var ex = ew.offsetWidth;
        if (ex > 2) {
            ez.cachedCharWidth = ex
        }
        return ex || 10
    }
    var cO = 0;

    function bY(ew) {
        ew.curOp = {
            changes: [],
            forceUpdate: false,
            updateInput: null,
            userSelChange: null,
            textChanged: null,
            selectionChanged: false,
            cursorActivity: false,
            updateMaxLine: false,
            updateScrollPos: false,
            id: ++cO
        };
        if (!bL++) {
            aT = []
        }
    }

    function W(eK) {
        var eE = eK.curOp,
            eJ = eK.doc,
            eF = eK.display;
        eK.curOp = null;
        if (eE.updateMaxLine) {
            em(eK)
        }
        if (eF.maxLineChanged && !eK.options.lineWrapping && eF.maxLine) {
            var ex = dg(eK, eF.maxLine);
            eF.sizer.style.minWidth = Math.max(0, ex + 3 + aO) + "px";
            eF.maxLineChanged = false;
            var eH = Math.max(0, eF.sizer.offsetLeft + eF.sizer.offsetWidth - eF.scroller.clientWidth);
            if (eH < eJ.scrollLeft && !eE.updateScrollPos) {
                a3(eK, Math.min(eF.scroller.scrollLeft, eH), true)
            }
        }
        var ey, eC;
        if (eE.updateScrollPos) {
            ey = eE.updateScrollPos
        } else {
            if (eE.selectionChanged && eF.scroller.clientHeight) {
                var eI = cH(eK, eJ.sel.head);
                ey = A(eK, eI.left, eI.top, eI.left, eI.bottom)
            }
        }
        if (eE.changes.length || eE.forceUpdate || ey && ey.scrollTop != null) {
            eC = cB(eK, eE.changes, ey && ey.scrollTop, eE.forceUpdate);
            if (eK.display.scroller.offsetHeight) {
                eK.doc.scrollTop = eK.display.scroller.scrollTop
            }
        }
        if (!eC && eE.selectionChanged) {
            a2(eK)
        }
        if (eE.updateScrollPos) {
            var eG = Math.max(0, Math.min(eF.scroller.scrollHeight - eF.scroller.clientHeight, ey.scrollTop));
            var ez = Math.max(0, Math.min(eF.scroller.scrollWidth - eF.scroller.clientWidth, ey.scrollLeft));
            eF.scroller.scrollTop = eF.scrollbarV.scrollTop = eJ.scrollTop = eG;
            eF.scroller.scrollLeft = eF.scrollbarH.scrollLeft = eJ.scrollLeft = ez;
            df(eK);
            if (eE.scrollToPos) {
                x(eK, d9(eK.doc, eE.scrollToPos.from), d9(eK.doc, eE.scrollToPos.to), eE.scrollToPos.margin)
            }
        } else {
            if (ey) {
                ae(eK)
            }
        }
        if (eE.selectionChanged) {
            k(eK)
        }
        if (eK.state.focused && eE.updateInput) {
            dU(eK, eE.userSelChange)
        }
        var eD = eE.maybeHiddenMarkers,
            ew = eE.maybeUnhiddenMarkers;
        if (eD) {
            for (var eB = 0; eB < eD.length; ++eB) {
                if (!eD[eB].lines.length) {
                    ah(eD[eB], "hide")
                }
            }
        }
        if (ew) {
            for (var eB = 0; eB < ew.length; ++eB) {
                if (ew[eB].lines.length) {
                    ah(ew[eB], "unhide")
                }
            }
        }
        var eA;
        if (!--bL) {
            eA = aT;
            aT = null
        }
        if (eE.textChanged) {
            ah(eK, "change", eK, eE.textChanged)
        }
        if (eE.cursorActivity) {
            ah(eK, "cursorActivity", eK)
        }
        if (eA) {
            for (var eB = 0; eB < eA.length; ++eB) {
                eA[eB]()
            }
        }
    }

    function b9(ew, ex) {
        return function() {
            var ez = ew || this,
                eA = !ez.curOp;
            if (eA) {
                bY(ez)
            }
            try {
                var ey = ex.apply(ez, arguments)
            } finally {
                if (eA) {
                    W(ez)
                }
            }
            return ey
        }
    }

    function d3(ew) {
        return function() {
            var ey = this.cm && !this.cm.curOp,
                ex;
            if (ey) {
                bY(this.cm)
            }
            try {
                ex = ew.apply(this, arguments)
            } finally {
                if (ey) {
                    W(this.cm)
                }
            }
            return ex
        }
    }

    function b1(ex, ez) {
        var ey = !ex.curOp,
            ew;
        if (ey) {
            bY(ex)
        }
        try {
            ew = ez()
        } finally {
            if (ey) {
                W(ex)
            }
        }
        return ew
    }

    function Q(ew, ez, ey, ex) {
        if (ez == null) {
            ez = ew.doc.first
        }
        if (ey == null) {
            ey = ew.doc.first + ew.doc.size
        }
        ew.curOp.changes.push({
            from: ez,
            to: ey,
            diff: ex
        })
    }

    function aR(ew) {
        if (ew.display.pollingFast) {
            return
        }
        ew.display.poll.set(ew.options.pollInterval, function() {
            bB(ew);
            if (ew.state.focused) {
                aR(ew)
            }
        })
    }

    function w(ew) {
        var ex = false;
        ew.display.pollingFast = true;

        function ey() {
            var ez = bB(ew);
            if (!ez && !ex) {
                ex = true;
                ew.display.poll.set(60, ey)
            } else {
                ew.display.pollingFast = false;
                aR(ew)
            }
        }
        ew.display.poll.set(20, ey)
    }

    function bB(eK) {
        var eF = eK.display.input,
            eC = eK.display.prevInput,
            eJ = eK.doc,
            ew = eJ.sel;
        if (!eK.state.focused || aX(eF) || S(eK) || eK.options.disableInput) {
            return false
        }
        if (eK.state.pasteIncoming && eK.state.fakedLastChar) {
            eF.value = eF.value.substring(0, eF.value.length - 1);
            eK.state.fakedLastChar = false
        }
        var eL = eF.value;
        if (eL == eC && d8(ew.from, ew.to)) {
            return false
        }
        if (cA && !bE && eK.display.inputHasSelection === eL) {
            dU(eK, true);
            return false
        }
        var ey = !eK.curOp;
        if (ey) {
            bY(eK)
        }
        ew.shift = false;
        var eE = 0,
            ex = Math.min(eC.length, eL.length);
        while (eE < ex && eC.charCodeAt(eE) == eL.charCodeAt(eE)) {
            ++eE
        }
        var eI = ew.from,
            eH = ew.to;
        var eA = eL.slice(eE);
        if (eE < eC.length) {
            eI = K(eI.line, eI.ch - (eC.length - eE))
        } else {
            if (eK.state.overwrite && d8(eI, eH) && !eK.state.pasteIncoming) {
                eH = K(eH.line, Math.min(dJ(eJ, eH.line).text.length, eH.ch + eA.length))
            }
        }
        var eD = eK.curOp.updateInput;
        var eG = {
            from: eI,
            to: eH,
            text: ay(eA),
            origin: eK.state.pasteIncoming ? "paste" : eK.state.cutIncoming ? "cut" : "+input"
        };
        aL(eK.doc, eG, "end");
        eK.curOp.updateInput = eD;
        O(eK, "inputRead", eK, eG);
        if (eA && !eK.state.pasteIncoming && eK.options.electricChars && eK.options.smartIndent && ew.head.ch < 100) {
            var ez = eK.getModeAt(ew.head).electricChars;
            if (ez) {
                for (var eB = 0; eB < ez.length; eB++) {
                    if (eA.indexOf(ez.charAt(eB)) > -1) {
                        N(eK, ew.head.line, "smart");
                        break
                    }
                }
            }
        }
        if (eL.length > 1000 || eL.indexOf("\n") > -1) {
            eF.value = eK.display.prevInput = ""
        } else {
            eK.display.prevInput = eL
        }
        if (ey) {
            W(eK)
        }
        eK.state.pasteIncoming = eK.state.cutIncoming = false;
        return true
    }

    function dU(ew, ey) {
        var ex, ez, eB = ew.doc;
        if (!d8(eB.sel.from, eB.sel.to)) {
            ew.display.prevInput = "";
            ex = ce && (eB.sel.to.line - eB.sel.from.line > 100 || (ez = ew.getSelection()).length > 1000);
            var eA = ex ? "-" : ez || ew.getSelection();
            ew.display.input.value = eA;
            if (ew.state.focused) {
                cC(ew.display.input)
            }
            if (cA && !bE) {
                ew.display.inputHasSelection = eA
            }
        } else {
            if (ey) {
                ew.display.prevInput = ew.display.input.value = "";
                if (cA && !bE) {
                    ew.display.inputHasSelection = null
                }
            }
        }
        ew.display.inaccurateSelection = ex
    }

    function db(ew) {
        if (ew.options.readOnly != "nocursor" && (!cV || document.activeElement != ew.display.input)) {
            ew.display.input.focus()
        }
    }

    function S(ew) {
        return ew.options.readOnly || ew.doc.cantEdit
    }

    function ee(ex) {
        var eC = ex.display;
        bk(eC.scroller, "mousedown", b9(ex, c4));
        if (cf) {
            bk(eC.scroller, "dblclick", b9(ex, function(eF) {
                if (ar(ex, eF)) {
                    return
                }
                var eG = bH(ex, eF);
                if (!eG || j(ex, eF) || aG(ex.display, eF)) {
                    return
                }
                bV(eF);
                var eE = ab(dJ(ex.doc, eG.line).text, eG);
                eg(ex.doc, eE.from, eE.to)
            }))
        } else {
            bk(eC.scroller, "dblclick", function(eE) {
                ar(ex, eE) || bV(eE)
            })
        }
        bk(eC.lineSpace, "selectstart", function(eE) {
            if (!aG(eC, eE)) {
                bV(eE)
            }
        });
        if (!bX) {
            bk(eC.scroller, "contextmenu", function(eE) {
                ad(ex, eE)
            })
        }
        bk(eC.scroller, "scroll", function() {
            if (eC.scroller.clientHeight) {
                F(ex, eC.scroller.scrollTop);
                a3(ex, eC.scroller.scrollLeft, true);
                ah(ex, "scroll", ex)
            }
        });
        bk(eC.scrollbarV, "scroll", function() {
            if (eC.scroller.clientHeight) {
                F(ex, eC.scrollbarV.scrollTop)
            }
        });
        bk(eC.scrollbarH, "scroll", function() {
            if (eC.scroller.clientHeight) {
                a3(ex, eC.scrollbarH.scrollLeft)
            }
        });
        bk(eC.scroller, "mousewheel", function(eE) {
            b(ex, eE)
        });
        bk(eC.scroller, "DOMMouseScroll", function(eE) {
            b(ex, eE)
        });

        function eD() {
            if (ex.state.focused) {
                setTimeout(bO(db, ex), 0)
            }
        }
        bk(eC.scrollbarH, "mousedown", eD);
        bk(eC.scrollbarV, "mousedown", eD);
        bk(eC.wrapper, "scroll", function() {
            eC.wrapper.scrollTop = eC.wrapper.scrollLeft = 0
        });
        var ew;

        function eA() {
            if (ew == null) {
                ew = setTimeout(function() {
                    ew = null;
                    eC.cachedCharWidth = eC.cachedTextHeight = c6 = null;
                    T(ex);
                    b1(ex, bO(Q, ex))
                }, 100)
            }
        }
        bk(window, "resize", eA);

        function ez() {
            for (var eE = eC.wrapper.parentNode; eE && eE != document.body; eE = eE.parentNode) {}
            if (eE) {
                setTimeout(ez, 5000)
            } else {
                cT(window, "resize", eA)
            }
        }
        setTimeout(ez, 5000);
        bk(eC.input, "keyup", b9(ex, function(eE) {
            if (ar(ex, eE) || ex.options.onKeyEvent && ex.options.onKeyEvent(ex, Y(eE))) {
                return
            }
            if (eE.keyCode == 16) {
                ex.doc.sel.shift = false
            }
        }));
        bk(eC.input, "input", function() {
            if (cA && !bE && ex.display.inputHasSelection) {
                ex.display.inputHasSelection = null
            }
            w(ex)
        });
        bk(eC.input, "keydown", b9(ex, m));
        bk(eC.input, "keypress", b9(ex, bP));
        bk(eC.input, "focus", bO(bS, ex));
        bk(eC.input, "blur", bO(au, ex));

        function ey(eE) {
            if (ar(ex, eE) || ex.options.onDragEvent && ex.options.onDragEvent(ex, Y(eE))) {
                return
            }
            c2(eE)
        }
        if (ex.options.dragDrop) {
            bk(eC.scroller, "dragstart", function(eE) {
                I(ex, eE)
            });
            bk(eC.scroller, "dragenter", ey);
            bk(eC.scroller, "dragover", ey);
            bk(eC.scroller, "drop", b9(ex, aN))
        }
        bk(eC.scroller, "paste", function(eE) {
            if (aG(eC, eE)) {
                return
            }
            db(ex);
            w(ex)
        });
        bk(eC.input, "paste", function() {
            if (b8 && !ex.state.fakedLastChar && !(new Date - ex.state.lastMiddleDown < 200)) {
                var eF = eC.input.selectionStart,
                    eE = eC.input.selectionEnd;
                eC.input.value += "$";
                eC.input.selectionStart = eF;
                eC.input.selectionEnd = eE;
                ex.state.fakedLastChar = true
            }
            ex.state.pasteIncoming = true;
            w(ex)
        });

        function eB(eE) {
            if (eC.inaccurateSelection) {
                eC.prevInput = "";
                eC.inaccurateSelection = false;
                eC.input.value = ex.getSelection();
                cC(eC.input)
            }
            if (eE.type == "cut") {
                ex.state.cutIncoming = true
            }
        }
        bk(eC.input, "cut", eB);
        bk(eC.input, "copy", eB);
        if (aH) {
            bk(eC.sizer, "mouseup", function() {
                if (document.activeElement == eC.input) {
                    eC.input.blur()
                }
                db(ex)
            })
        }
    }

    function aG(ex, ew) {
        for (var ey = D(ew); ey != ex.wrapper; ey = ey.parentNode) {
            if (!ey || ey.ignoreEvents || ey.parentNode == ex.sizer && ey != ex.mover) {
                return true
            }
        }
    }

    function bH(ex, eC, ez) {
        var eB = ex.display;
        if (!ez) {
            var eA = D(eC);
            if (eA == eB.scrollbarH || eA == eB.scrollbarH.firstChild || eA == eB.scrollbarV || eA == eB.scrollbarV.firstChild || eA == eB.scrollbarFiller || eA == eB.gutterFiller) {
                return null
            }
        }
        var ew, eD, ey = an(eB.lineSpace);
        try {
            ew = eC.clientX;
            eD = eC.clientY
        } catch (eC) {
            return null
        }
        return ed(ex, ew - ey.left, eD - ey.top)
    }
    var cn, ch;

    function c4(eO) {
        if (ar(this, eO)) {
            return
        }
        var ez = this,
            eJ = ez.display,
            eQ = ez.doc,
            eH = eQ.sel;
        eH.shift = eO.shiftKey;
        if (aG(eJ, eO)) {
            if (!b8) {
                eJ.scroller.draggable = false;
                setTimeout(function() {
                    eJ.scroller.draggable = true
                }, 100)
            }
            return
        }
        if (j(ez, eO)) {
            return
        }
        var ey = bH(ez, eO);
        switch (eb(eO)) {
            case 3:
                if (bX) {
                    ad.call(ez, ez, eO)
                }
                return;
            case 2:
                if (b8) {
                    ez.state.lastMiddleDown = +new Date
                }
                if (ey) {
                    eg(ez.doc, ey)
                }
                setTimeout(bO(db, ez), 20);
                bV(eO);
                return
        }
        if (!ey) {
            if (D(eO) == eJ.scroller) {
                bV(eO)
            }
            return
        }
        if (!ez.state.focused) {
            bS(ez)
        }
        var ew = +new Date,
            ex = "single";
        if (ch && ch.time > ew - 400 && d8(ch.pos, ey)) {
            ex = "triple";
            bV(eO);
            setTimeout(bO(db, ez), 20);
            aQ(ez, ey.line)
        } else {
            if (cn && cn.time > ew - 400 && d8(cn.pos, ey)) {
                ex = "double";
                ch = {
                    time: ew,
                    pos: ey
                };
                bV(eO);
                var eL = ab(dJ(eQ, ey.line).text, ey);
                eg(ez.doc, eL.from, eL.to)
            } else {
                cn = {
                    time: ew,
                    pos: ey
                }
            }
        }
        var eA = ey;
        if (ez.options.dragDrop && dm && !S(ez) && !d8(eH.from, eH.to) && !dK(ey, eH.from) && !dK(eH.to, ey) && ex == "single") {
            var eK = b9(ez, function(eR) {
                if (b8) {
                    eJ.scroller.draggable = false
                }
                ez.state.draggingText = false;
                cT(document, "mouseup", eK);
                cT(eJ.scroller, "drop", eK);
                if (Math.abs(eO.clientX - eR.clientX) + Math.abs(eO.clientY - eR.clientY) < 10) {
                    bV(eR);
                    eg(ez.doc, ey);
                    db(ez);
                    if (cf && !bE) {
                        setTimeout(function() {
                            document.body.focus();
                            db(ez)
                        }, 20)
                    }
                }
            });
            if (b8) {
                eJ.scroller.draggable = true
            }
            ez.state.draggingText = eK;
            if (eJ.scroller.dragDrop) {
                eJ.scroller.dragDrop()
            }
            bk(document, "mouseup", eK);
            bk(eJ.scroller, "drop", eK);
            return
        }
        bV(eO);
        if (ex == "single") {
            eg(ez.doc, d9(eQ, ey))
        }
        var eP = eH.from,
            eE = eH.to,
            eI = ey;

        function eM(eS) {
            if (d8(eI, eS)) {
                return
            }
            eI = eS;
            if (ex == "single") {
                eg(ez.doc, d9(eQ, ey), eS);
                return
            }
            eP = d9(eQ, eP);
            eE = d9(eQ, eE);
            if (ex == "double") {
                var eR = ab(dJ(eQ, eS.line).text, eS);
                if (dK(eS, eP)) {
                    eg(ez.doc, eR.from, eE)
                } else {
                    eg(ez.doc, eP, eR.to)
                }
            } else {
                if (ex == "triple") {
                    if (dK(eS, eP)) {
                        eg(ez.doc, eE, d9(eQ, K(eS.line, 0)))
                    } else {
                        eg(ez.doc, eP, d9(eQ, K(eS.line + 1, 0)))
                    }
                }
            }
        }
        var eF = an(eJ.wrapper);
        var eB = 0;

        function eN(eT) {
            var eR = ++eB;
            var eV = bH(ez, eT, true);
            if (!eV) {
                return
            }
            if (!d8(eV, eA)) {
                if (!ez.state.focused) {
                    bS(ez)
                }
                eA = eV;
                eM(eV);
                var eU = bp(eJ, eQ);
                if (eV.line >= eU.to || eV.line < eU.from) {
                    setTimeout(b9(ez, function() {
                        if (eB == eR) {
                            eN(eT)
                        }
                    }), 150)
                }
            } else {
                var eS = eT.clientY < eF.top ? -20 : eT.clientY > eF.bottom ? 20 : 0;
                if (eS) {
                    setTimeout(b9(ez, function() {
                        if (eB != eR) {
                            return
                        }
                        eJ.scroller.scrollTop += eS;
                        eN(eT)
                    }), 50)
                }
            }
        }

        function eD(eR) {
            eB = Infinity;
            bV(eR);
            db(ez);
            cT(document, "mousemove", eG);
            cT(document, "mouseup", eC)
        }
        var eG = b9(ez, function(eR) {
            if (!cf && !eb(eR)) {
                eD(eR)
            } else {
                eN(eR)
            }
        });
        var eC = b9(ez, eD);
        bk(document, "mousemove", eG);
        bk(document, "mouseup", eC)
    }

    function eu(eH, eD, eF, eG, ez) {
        try {
            var ex = eD.clientX,
                ew = eD.clientY
        } catch (eD) {
            return false
        }
        if (ex >= Math.floor(an(eH.display.gutters).right)) {
            return false
        }
        if (eG) {
            bV(eD)
        }
        var eE = eH.display;
        var eC = an(eE.lineDiv);
        if (ew > eC.bottom || !dP(eH, eF)) {
            return ba(eD)
        }
        ew -= eC.top - eE.viewOffset;
        for (var eA = 0; eA < eH.options.gutters.length; ++eA) {
            var eB = eE.gutters.childNodes[eA];
            if (eB && an(eB).right >= ex) {
                var eI = a5(eH.doc, ew);
                var ey = eH.options.gutters[eA];
                ez(eH, eF, eH, eI, ey, eD);
                return ba(eD)
            }
        }
    }

    function ck(ew, ex) {
        if (!dP(ew, "gutterContextMenu")) {
            return false
        }
        return eu(ew, ex, "gutterContextMenu", false, ah)
    }

    function j(ew, ex) {
        return eu(ew, ex, "gutterClick", true, O)
    }
    var P = 0;

    function aN(eC) {
        var eE = this;
        if (ar(eE, eC) || aG(eE.display, eC) || (eE.options.onDragEvent && eE.options.onDragEvent(eE, Y(eC)))) {
            return
        }
        bV(eC);
        if (cA) {
            P = +new Date
        }
        var eD = bH(eE, eC, true),
            ew = eC.dataTransfer.files;
        if (!eD || S(eE)) {
            return
        }
        if (ew && ew.length && window.FileReader && window.File) {
            var ey = ew.length,
                eG = Array(ey),
                ex = 0;
            var ez = function(eJ, eI) {
                var eH = new FileReader;
                eH.onload = function() {
                    eG[eI] = eH.result;
                    if (++ex == ey) {
                        eD = d9(eE.doc, eD);
                        aL(eE.doc, {
                            from: eD,
                            to: eD,
                            text: ay(eG.join("\n")),
                            origin: "paste"
                        }, "around")
                    }
                };
                eH.readAsText(eJ)
            };
            for (var eA = 0; eA < ey; ++eA) {
                ez(ew[eA], eA)
            }
        } else {
            if (eE.state.draggingText && !(dK(eD, eE.doc.sel.from) || dK(eE.doc.sel.to, eD))) {
                eE.state.draggingText(eC);
                setTimeout(bO(db, eE), 20);
                return
            }
            try {
                var eG = eC.dataTransfer.getData("Text");
                if (eG) {
                    var eF = eE.doc.sel.from,
                        eB = eE.doc.sel.to;
                    bh(eE.doc, eD, eD);
                    if (eE.state.draggingText) {
                        az(eE.doc, "", eF, eB, "paste")
                    }
                    eE.replaceSelection(eG, null, "paste");
                    db(eE)
                }
            } catch (eC) {}
        }
    }

    function I(ex, ez) {
        if (cA && (!ex.state.draggingText || +new Date - P < 100)) {
            c2(ez);
            return
        }
        if (ar(ex, ez) || aG(ex.display, ez)) {
            return
        }
        var ew = ex.getSelection();
        ez.dataTransfer.setData("Text", ew);
        if (ez.dataTransfer.setDragImage && !ag) {
            var ey = ej("img", null, null, "position: fixed; left: 0; top: 0;");
            ey.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            if (d1) {
                ey.width = ey.height = 1;
                ex.display.wrapper.appendChild(ey);
                ey._top = ey.offsetTop
            }
            ez.dataTransfer.setDragImage(ey, 0, 0);
            if (d1) {
                ey.parentNode.removeChild(ey)
            }
        }
    }

    function F(ew, ex) {
        if (Math.abs(ew.doc.scrollTop - ex) < 2) {
            return
        }
        ew.doc.scrollTop = ex;
        if (!bI) {
            cB(ew, [], ex)
        }
        if (ew.display.scroller.scrollTop != ex) {
            ew.display.scroller.scrollTop = ex
        }
        if (ew.display.scrollbarV.scrollTop != ex) {
            ew.display.scrollbarV.scrollTop = ex
        }
        if (bI) {
            cB(ew, [])
        }
        cU(ew, 100)
    }

    function a3(ew, ey, ex) {
        if (ex ? ey == ew.doc.scrollLeft : Math.abs(ew.doc.scrollLeft - ey) < 2) {
            return
        }
        ey = Math.min(ey, ew.display.scroller.scrollWidth - ew.display.scroller.clientWidth);
        ew.doc.scrollLeft = ey;
        df(ew);
        if (ew.display.scroller.scrollLeft != ey) {
            ew.display.scroller.scrollLeft = ey
        }
        if (ew.display.scrollbarH.scrollLeft != ey) {
            ew.display.scrollbarH.scrollLeft = ey
        }
    }
    var dQ = 0,
        bA = null;
    if (cf) {
        bA = -0.53
    } else {
        if (bI) {
            bA = 15
        } else {
            if (cg) {
                bA = -0.7
            } else {
                if (ag) {
                    bA = -1 / 3
                }
            }
        }
    }

    function b(eC, ex) {
        var eF = ex.wheelDeltaX,
            eE = ex.wheelDeltaY;
        if (eF == null && ex.detail && ex.axis == ex.HORIZONTAL_AXIS) {
            eF = ex.detail
        }
        if (eE == null && ex.detail && ex.axis == ex.VERTICAL_AXIS) {
            eE = ex.detail
        } else {
            if (eE == null) {
                eE = ex.wheelDelta
            }
        }
        var ez = eC.display,
            eB = ez.scroller;
        if (!(eF && eB.scrollWidth > eB.clientWidth || eE && eB.scrollHeight > eB.clientHeight)) {
            return
        }
        if (eE && bq && b8) {
            for (var eD = ex.target; eD != eB; eD = eD.parentNode) {
                if (eD.lineObj) {
                    eC.display.currentWheelTarget = eD;
                    break
                }
            }
        }
        if (eF && !bI && !d1 && bA != null) {
            if (eE) {
                F(eC, Math.max(0, Math.min(eB.scrollTop + eE * bA, eB.scrollHeight - eB.clientHeight)))
            }
            a3(eC, Math.max(0, Math.min(eB.scrollLeft + eF * bA, eB.scrollWidth - eB.clientWidth)));
            bV(ex);
            ez.wheelStartX = null;
            return
        }
        if (eE && bA != null) {
            var ew = eE * bA;
            var eA = eC.doc.scrollTop,
                ey = eA + ez.wrapper.clientHeight;
            if (ew < 0) {
                eA = Math.max(0, eA + ew - 50)
            } else {
                ey = Math.min(eC.doc.height, ey + ew + 50)
            }
            cB(eC, [], {
                top: eA,
                bottom: ey
            })
        }
        if (dQ < 20) {
            if (ez.wheelStartX == null) {
                ez.wheelStartX = eB.scrollLeft;
                ez.wheelStartY = eB.scrollTop;
                ez.wheelDX = eF;
                ez.wheelDY = eE;
                setTimeout(function() {
                    if (ez.wheelStartX == null) {
                        return
                    }
                    var eG = eB.scrollLeft - ez.wheelStartX;
                    var eI = eB.scrollTop - ez.wheelStartY;
                    var eH = (eI && ez.wheelDY && eI / ez.wheelDY) || (eG && ez.wheelDX && eG / ez.wheelDX);
                    ez.wheelStartX = ez.wheelStartY = null;
                    if (!eH) {
                        return
                    }
                    bA = (bA * dQ + eH) / (dQ + 1);
                    ++dQ
                }, 200)
            } else {
                ez.wheelDX += eF;
                ez.wheelDY += eE
            }
        }
    }

    function ef(ex, eA, ew) {
        if (typeof eA == "string") {
            eA = dd[eA];
            if (!eA) {
                return false
            }
        }
        if (ex.display.pollingFast && bB(ex)) {
            ex.display.pollingFast = false
        }
        var eB = ex.doc,
            ez = eB.sel.shift,
            ey = false;
        try {
            if (S(ex)) {
                ex.state.suppressEdits = true
            }
            if (ew) {
                eB.sel.shift = false
            }
            ey = eA(ex) != bv
        } finally {
            eB.sel.shift = ez;
            ex.state.suppressEdits = false
        }
        return ey
    }

    function cr(ew) {
        var ex = ew.state.keyMaps.slice(0);
        if (ew.options.extraKeys) {
            ex.push(ew.options.extraKeys)
        }
        ex.push(ew.options.keyMap);
        return ex
    }
    var Z;

    function dN(ew, eC) {
        var ex = eh(ew.options.keyMap),
            eA = ex.auto;
        clearTimeout(Z);
        if (eA && !dc(eC)) {
            Z = setTimeout(function() {
                if (eh(ew.options.keyMap) == ex) {
                    ew.options.keyMap = (eA.call ? eA.call(null, ew) : eA);
                    et(ew)
                }
            }, 50)
        }
        var ez = dW(eC, true),
            eB = false;
        if (!ez) {
            return false
        }
        var ey = cr(ew);
        if (eC.shiftKey) {
            eB = g("Shift-" + ez, ey, function(eD) {
                return ef(ew, eD, true)
            }) || g(ez, ey, function(eD) {
                if (typeof eD == "string" ? /^go[A-Z]/.test(eD) : eD.motion) {
                    return ef(ew, eD)
                }
            })
        } else {
            eB = g(ez, ey, function(eD) {
                return ef(ew, eD)
            })
        }
        if (eB) {
            bV(eC);
            k(ew);
            if (bE) {
                eC.oldKeyCode = eC.keyCode;
                eC.keyCode = 0
            }
            O(ew, "keyHandled", ew, ez, eC)
        }
        return eB
    }

    function cX(ew, ez, ex) {
        var ey = g("'" + ex + "'", cr(ew), function(eA) {
            return ef(ew, eA, true)
        });
        if (ey) {
            bV(ez);
            k(ew);
            O(ew, "keyHandled", ew, "'" + ex + "'", ez)
        }
        return ey
    }
    var cm = null;

    function m(ez) {
        var ew = this;
        if (!ew.state.focused) {
            bS(ew)
        }
        if (ar(ew, ez) || ew.options.onKeyEvent && ew.options.onKeyEvent(ew, Y(ez))) {
            return
        }
        if (cf && ez.keyCode == 27) {
            ez.returnValue = false
        }
        var ex = ez.keyCode;
        ew.doc.sel.shift = ex == 16 || ez.shiftKey;
        var ey = dN(ew, ez);
        if (d1) {
            cm = ey ? ex : null;
            if (!ey && ex == 88 && !ce && (bq ? ez.metaKey : ez.ctrlKey)) {
                ew.replaceSelection("")
            }
        }
    }

    function bP(eA) {
        var ew = this;
        if (ar(ew, eA) || ew.options.onKeyEvent && ew.options.onKeyEvent(ew, Y(eA))) {
            return
        }
        var ez = eA.keyCode,
            ex = eA.charCode;
        if (d1 && ez == cm) {
            cm = null;
            bV(eA);
            return
        }
        if (((d1 && (!eA.which || eA.which < 10)) || aH) && dN(ew, eA)) {
            return
        }
        var ey = String.fromCharCode(ex == null ? ez : ex);
        if (cX(ew, eA, ey)) {
            return
        }
        if (cA && !bE) {
            ew.display.inputHasSelection = null
        }
        w(ew)
    }

    function bS(ew) {
        if (ew.options.readOnly == "nocursor") {
            return
        }
        if (!ew.state.focused) {
            ah(ew, "focus", ew);
            ew.state.focused = true;
            if (ew.display.wrapper.className.search(/\bCodeMirror-focused\b/) == -1) {
                ew.display.wrapper.className += " CodeMirror-focused"
            }
            if (!ew.curOp) {
                dU(ew, true);
                if (b8) {
                    setTimeout(bO(dU, ew, true), 0)
                }
            }
        }
        aR(ew);
        k(ew)
    }

    function au(ew) {
        if (ew.state.focused) {
            ah(ew, "blur", ew);
            ew.state.focused = false;
            ew.display.wrapper.className = ew.display.wrapper.className.replace(" CodeMirror-focused", "")
        }
        clearInterval(ew.display.blinker);
        setTimeout(function() {
            if (!ew.state.focused) {
                ew.doc.sel.shift = false
            }
        }, 150)
    }
    var d5;

    function ad(eG, eB) {
        if (ar(eG, eB, "contextmenu")) {
            return
        }
        var eD = eG.display,
            ex = eG.doc.sel;
        if (aG(eD, eB) || ck(eG, eB)) {
            return
        }
        var eF = bH(eG, eB),
            ew = eD.scroller.scrollTop;
        if (!eF || d1) {
            return
        }
        var eA = eG.options.resetSelectionOnContextMenu;
        if (eA && (d8(ex.from, ex.to) || dK(eF, ex.from) || !dK(eF, ex.to))) {
            b9(eG, bh)(eG.doc, eF, eF)
        }
        var eC = eD.input.style.cssText;
        eD.inputDiv.style.position = "absolute";
        eD.input.style.cssText = "position: fixed; width: 30px; height: 30px; top: " + (eB.clientY - 5) + "px; left: " + (eB.clientX - 5) + "px; z-index: 1000; background: transparent; outline: none;border-width: 0; outline: none; overflow: hidden; opacity: .05; -ms-opacity: .05; filter: alpha(opacity=5);";
        db(eG);
        dU(eG, true);
        if (d8(ex.from, ex.to)) {
            eD.input.value = eD.prevInput = " "
        }

        function ez() {
            if (eD.input.selectionStart != null) {
                var eH = eD.input.value = "\u200b" + (d8(ex.from, ex.to) ? "" : eD.input.value);
                eD.prevInput = "\u200b";
                eD.input.selectionStart = 1;
                eD.input.selectionEnd = eH.length
            }
        }

        function eE() {
            eD.inputDiv.style.position = "relative";
            eD.input.style.cssText = eC;
            if (bE) {
                eD.scrollbarV.scrollTop = eD.scroller.scrollTop = ew
            }
            aR(eG);
            if (eD.input.selectionStart != null) {
                if (!cf || bE) {
                    ez()
                }
                clearTimeout(d5);
                var eH = 0,
                    eI = function() {
                        if (eD.prevInput == "\u200b" && eD.input.selectionStart == 0) {
                            b9(eG, dd.selectAll)(eG)
                        } else {
                            if (eH++ < 10) {
                                d5 = setTimeout(eI, 500)
                            } else {
                                dU(eG)
                            }
                        }
                    };
                d5 = setTimeout(eI, 200)
            }
        }
        if (cf && !bE) {
            ez()
        }
        if (bX) {
            c2(eB);
            var ey = function() {
                cT(window, "mouseup", ey);
                setTimeout(eE, 20)
            };
            bk(window, "mouseup", ey)
        } else {
            setTimeout(eE, 50)
        }
    }
    var b5 = B.changeEnd = function(ew) {
        if (!ew.text) {
            return ew.to
        }
        return K(ew.from.line + ew.text.length - 1, d7(ew.text).length + (ew.text.length == 1 ? ew.from.ch : 0))
    };

    function de(eA, eC, eB) {
        if (!dK(eC.from, eB)) {
            return d9(eA, eB)
        }
        var ez = (eC.text.length - 1) - (eC.to.line - eC.from.line);
        if (eB.line > eC.to.line + ez) {
            var ey = eB.line - ez,
                ex = eA.first + eA.size - 1;
            if (ey > ex) {
                return K(ex, dJ(eA, ex).text.length)
            }
            return dX(eB, dJ(eA, ey).text.length)
        }
        if (eB.line == eC.to.line + ez) {
            return dX(eB, d7(eC.text).length + (eC.text.length == 1 ? eC.from.ch : 0) + dJ(eA, eC.to.line).text.length - eC.to.ch)
        }
        var ew = eB.line - eC.from.line;
        return dX(eB, eC.text[ew].length + (ew ? 0 : eC.from.ch))
    }

    function dO(ex, eA, ey) {
        if (ey && typeof ey == "object") {
            return {
                anchor: de(ex, eA, ey.anchor),
                head: de(ex, eA, ey.head)
            }
        }
        if (ey == "start") {
            return {
                anchor: eA.from,
                head: eA.from
            }
        }
        var ew = b5(eA);
        if (ey == "around") {
            return {
                anchor: eA.from,
                head: ew
            }
        }
        if (ey == "end") {
            return {
                anchor: ew,
                head: ew
            }
        }
        var ez = function(eD) {
            if (dK(eD, eA.from)) {
                return eD
            }
            if (!dK(eA.to, eD)) {
                return ew
            }
            var eB = eD.line + eA.text.length - (eA.to.line - eA.from.line) - 1,
                eC = eD.ch;
            if (eD.line == eA.to.line) {
                eC += ew.ch - eA.to.ch
            }
            return K(eB, eC)
        };
        return {
            anchor: ez(ex.sel.anchor),
            head: ez(ex.sel.head)
        }
    }

    function cG(ex, ez, ey) {
        var ew = {
            canceled: false,
            from: ez.from,
            to: ez.to,
            text: ez.text,
            origin: ez.origin,
            cancel: function() {
                this.canceled = true
            }
        };
        if (ey) {
            ew.update = function(eD, eC, eB, eA) {
                if (eD) {
                    this.from = d9(ex, eD)
                }
                if (eC) {
                    this.to = d9(ex, eC)
                }
                if (eB) {
                    this.text = eB
                }
                if (eA !== undefined) {
                    this.origin = eA
                }
            }
        }
        ah(ex, "beforeChange", ex, ew);
        if (ex.cm) {
            ah(ex.cm, "beforeChange", ex.cm, ew)
        }
        if (ew.canceled) {
            return null
        }
        return {
            from: ew.from,
            to: ew.to,
            text: ew.text,
            origin: ew.origin
        }
    }

    function aL(ez, eB, eA, ey) {
        if (ez.cm) {
            if (!ez.cm.curOp) {
                return b9(ez.cm, aL)(ez, eB, eA, ey)
            }
            if (ez.cm.state.suppressEdits) {
                return
            }
        }
        if (dP(ez, "beforeChange") || ez.cm && dP(ez.cm, "beforeChange")) {
            eB = cG(ez, eB, true);
            if (!eB) {
                return
            }
        }
        var ex = eq && !ey && bW(ez, eB.from, eB.to);
        if (ex) {
            for (var ew = ex.length - 1; ew >= 1; --ew) {
                ap(ez, {
                    from: ex[ew].from,
                    to: ex[ew].to,
                    text: [""]
                })
            }
            if (ex.length) {
                ap(ez, {
                    from: ex[0].from,
                    to: ex[0].to,
                    text: eB.text
                }, eA)
            }
        } else {
            ap(ez, eB, eA)
        }
    }

    function ap(ey, eA, ez) {
        if (eA.text.length == 1 && eA.text[0] == "" && d8(eA.from, eA.to)) {
            return
        }
        var ex = dO(ey, eA, ez);
        di(ey, eA, ex, ey.cm ? ey.cm.curOp.id : NaN);
        cS(ey, eA, ex, cY(ey, eA));
        var ew = [];
        cN(ey, function(eC, eB) {
            if (!eB && cl(ew, eC.history) == -1) {
                cz(eC.history, eA);
                ew.push(eC.history)
            }
            cS(eC, eA, null, cY(eC, eA))
        })
    }

    function bs(eF, eC) {
        if (eF.cm && eF.cm.state.suppressEdits) {
            return
        }
        var eB = eF.history;
        var ex = (eC == "undo" ? eB.done : eB.undone).pop();
        if (!ex) {
            return
        }
        var eD = {
            changes: [],
            anchorBefore: ex.anchorAfter,
            headBefore: ex.headAfter,
            anchorAfter: ex.anchorBefore,
            headAfter: ex.headBefore,
            generation: eB.generation
        };
        (eC == "undo" ? eB.undone : eB.done).push(eD);
        eB.generation = ex.generation || ++eB.maxGeneration;
        var ey = dP(eF, "beforeChange") || eF.cm && dP(eF.cm, "beforeChange");
        for (var ez = ex.changes.length - 1; ez >= 0; --ez) {
            var eE = ex.changes[ez];
            eE.origin = eC;
            if (ey && !cG(eF, eE, false)) {
                (eC == "undo" ? eB.done : eB.undone).length = 0;
                return
            }
            eD.changes.push(cs(eF, eE));
            var ew = ez ? dO(eF, eE, null) : {
                anchor: ex.anchorBefore,
                head: ex.headBefore
            };
            cS(eF, eE, ew, cP(eF, eE));
            var eA = [];
            cN(eF, function(eH, eG) {
                if (!eG && cl(eA, eH.history) == -1) {
                    cz(eH.history, eE);
                    eA.push(eH.history)
                }
                cS(eH, eE, null, cP(eH, eE))
            })
        }
    }

    function dR(ew, ey) {
        function ex(ez) {
            return K(ez.line + ey, ez.ch)
        }
        ew.first += ey;
        if (ew.cm) {
            Q(ew.cm, ew.first, ew.first, ey)
        }
        ew.sel.head = ex(ew.sel.head);
        ew.sel.anchor = ex(ew.sel.anchor);
        ew.sel.from = ex(ew.sel.from);
        ew.sel.to = ex(ew.sel.to)
    }

    function cS(eA, eB, ez, ex) {
        if (eA.cm && !eA.cm.curOp) {
            return b9(eA.cm, cS)(eA, eB, ez, ex)
        }
        if (eB.to.line < eA.first) {
            dR(eA, eB.text.length - 1 - (eB.to.line - eB.from.line));
            return
        }
        if (eB.from.line > eA.lastLine()) {
            return
        }
        if (eB.from.line < eA.first) {
            var ew = eB.text.length - 1 - (eA.first - eB.from.line);
            dR(eA, ew);
            eB = {
                from: K(eA.first, 0),
                to: K(eB.to.line + ew, eB.to.ch),
                text: [d7(eB.text)],
                origin: eB.origin
            }
        }
        var ey = eA.lastLine();
        if (eB.to.line > ey) {
            eB = {
                from: eB.from,
                to: K(ey, dJ(eA, ey).text.length),
                text: [eB.text[0]],
                origin: eB.origin
            }
        }
        eB.removed = el(eA, eB.from, eB.to);
        if (!ez) {
            ez = dO(eA, eB, null)
        }
        if (eA.cm) {
            al(eA.cm, eB, ex, ez)
        } else {
            d2(eA, eB, ex, ez)
        }
    }

    function al(eG, eC, ez, ew) {
        var eF = eG.doc,
            eB = eG.display,
            eD = eC.from,
            eE = eC.to;
        var ex = false,
            ey = eD.line;
        if (!eG.options.lineWrapping) {
            ey = bc(u(eF, dJ(eF, eD.line)));
            eF.iter(ey, eE.line + 1, function(eJ) {
                if (eJ == eB.maxLine) {
                    ex = true;
                    return true
                }
            })
        }
        if (!dK(eF.sel.head, eC.from) && !dK(eC.to, eF.sel.head)) {
            eG.curOp.cursorActivity = true
        }
        d2(eF, eC, ez, ew, aJ(eG));
        if (!eG.options.lineWrapping) {
            eF.iter(ey, eD.line + eC.text.length, function(eK) {
                var eJ = c0(eF, eK);
                if (eJ > eB.maxLineLength) {
                    eB.maxLine = eK;
                    eB.maxLineLength = eJ;
                    eB.maxLineChanged = true;
                    ex = false
                }
            });
            if (ex) {
                eG.curOp.updateMaxLine = true
            }
        }
        eF.frontier = Math.min(eF.frontier, eD.line);
        cU(eG, 400);
        var eI = eC.text.length - (eE.line - eD.line) - 1;
        Q(eG, eD.line, eE.line + 1, eI);
        if (dP(eG, "change")) {
            var eA = {
                from: eD,
                to: eE,
                text: eC.text,
                removed: eC.removed,
                origin: eC.origin
            };
            if (eG.curOp.textChanged) {
                for (var eH = eG.curOp.textChanged; eH.next; eH = eH.next) {}
                eH.next = eA
            } else {
                eG.curOp.textChanged = eA
            }
        }
    }

    function az(ez, ey, eB, eA, ew) {
        if (!eA) {
            eA = eB
        }
        if (dK(eA, eB)) {
            var ex = eA;
            eA = eB;
            eB = ex
        }
        if (typeof ey == "string") {
            ey = ay(ey)
        }
        aL(ez, {
            from: eB,
            to: eA,
            text: ey,
            origin: ew
        }, null)
    }

    function K(ew, ex) {
        if (!(this instanceof K)) {
            return new K(ew, ex)
        }
        this.line = ew;
        this.ch = ex
    }
    B.Pos = K;

    function d8(ex, ew) {
        return ex.line == ew.line && ex.ch == ew.ch
    }

    function dK(ex, ew) {
        return ex.line < ew.line || (ex.line == ew.line && ex.ch < ew.ch)
    }

    function bz(ex, ew) {
        return ex.line - ew.line || ex.ch - ew.ch
    }

    function bC(ew) {
        return K(ew.line, ew.ch)
    }

    function cb(ew, ex) {
        return Math.max(ew.first, Math.min(ex, ew.first + ew.size - 1))
    }

    function d9(ex, ey) {
        if (ey.line < ex.first) {
            return K(ex.first, 0)
        }
        var ew = ex.first + ex.size - 1;
        if (ey.line > ew) {
            return K(ew, dJ(ex, ew).text.length)
        }
        return dX(ey, dJ(ex, ey.line).text.length)
    }

    function dX(ey, ex) {
        var ew = ey.ch;
        if (ew == null || ew > ex) {
            return K(ey.line, ex)
        } else {
            if (ew < 0) {
                return K(ey.line, 0)
            } else {
                return ey
            }
        }
    }

    function bt(ex, ew) {
        return ew >= ex.first && ew < ex.first + ex.size
    }

    function eg(eA, eB, ew, ex) {
        if (eA.sel.shift || eA.sel.extend) {
            var ez = eA.sel.anchor;
            if (ew) {
                var ey = dK(eB, ez);
                if (ey != dK(ew, ez)) {
                    ez = eB;
                    eB = ew
                } else {
                    if (ey != dK(eB, ew)) {
                        eB = ew
                    }
                }
            }
            bh(eA, ez, eB, ex)
        } else {
            bh(eA, eB, ew || eB, ex)
        }
        if (eA.cm) {
            eA.cm.curOp.userSelChange = true
        }
    }

    function c(ez, ew, ex) {
        var ey = {
            anchor: ew,
            head: ex
        };
        ah(ez, "beforeSelectionChange", ez, ey);
        if (ez.cm) {
            ah(ez.cm, "beforeSelectionChange", ez.cm, ey)
        }
        ey.anchor = d9(ez, ey.anchor);
        ey.head = d9(ez, ey.head);
        return ey
    }

    function bh(eD, eA, eB, ey, ex) {
        if (!ex && dP(eD, "beforeSelectionChange") || eD.cm && dP(eD.cm, "beforeSelectionChange")) {
            var ez = c(eD, eA, eB);
            eB = ez.head;
            eA = ez.anchor
        }
        var eC = eD.sel;
        eC.goalColumn = null;
        if (ey == null) {
            ey = dK(eB, eC.head) ? -1 : 1
        }
        if (ex || !d8(eA, eC.anchor)) {
            eA = bi(eD, eA, ey, ex != "push")
        }
        if (ex || !d8(eB, eC.head)) {
            eB = bi(eD, eB, ey, ex != "push")
        }
        if (d8(eC.anchor, eA) && d8(eC.head, eB)) {
            return
        }
        eC.anchor = eA;
        eC.head = eB;
        var ew = dK(eB, eA);
        eC.from = ew ? eB : eA;
        eC.to = ew ? eA : eB;
        if (eD.cm) {
            eD.cm.curOp.updateInput = eD.cm.curOp.selectionChanged = eD.cm.curOp.cursorActivity = true
        }
        O(eD, "cursorActivity", eD)
    }

    function c7(ew) {
        bh(ew.doc, ew.doc.sel.from, ew.doc.sel.to, null, "push")
    }

    function bi(eF, eE, eB, eC) {
        var eG = false,
            ey = eE;
        var ez = eB || 1;
        eF.cantEdit = false;
        search: for (;;) {
            var eH = dJ(eF, ey.line);
            if (eH.markedSpans) {
                for (var eA = 0; eA < eH.markedSpans.length; ++eA) {
                    var ew = eH.markedSpans[eA],
                        ex = ew.marker;
                    if ((ew.from == null || (ex.inclusiveLeft ? ew.from <= ey.ch : ew.from < ey.ch)) && (ew.to == null || (ex.inclusiveRight ? ew.to >= ey.ch : ew.to > ey.ch))) {
                        if (eC) {
                            ah(ex, "beforeCursorEnter");
                            if (ex.explicitlyCleared) {
                                if (!eH.markedSpans) {
                                    break
                                } else {
                                    --eA;
                                    continue
                                }
                            }
                        }
                        if (!ex.atomic) {
                            continue
                        }
                        var eD = ex.find()[ez < 0 ? "from" : "to"];
                        if (d8(eD, ey)) {
                            eD.ch += ez;
                            if (eD.ch < 0) {
                                if (eD.line > eF.first) {
                                    eD = d9(eF, K(eD.line - 1))
                                } else {
                                    eD = null
                                }
                            } else {
                                if (eD.ch > eH.text.length) {
                                    if (eD.line < eF.first + eF.size - 1) {
                                        eD = K(eD.line + 1, 0)
                                    } else {
                                        eD = null
                                    }
                                }
                            }
                            if (!eD) {
                                if (eG) {
                                    if (!eC) {
                                        return bi(eF, eE, eB, true)
                                    }
                                    eF.cantEdit = true;
                                    return K(eF.first, 0)
                                }
                                eG = true;
                                eD = eE;
                                ez = -ez
                            }
                        }
                        ey = eD;
                        continue search
                    }
                }
            }
            return ey
        }
    }

    function ae(ex) {
        var eA = x(ex, ex.doc.sel.head, null, ex.options.cursorScrollMargin);
        if (!ex.state.focused) {
            return
        }
        var eB = ex.display,
            ey = an(eB.sizer),
            ew = null;
        if (eA.top + ey.top < 0) {
            ew = true
        } else {
            if (eA.bottom + ey.top > (window.innerHeight || document.documentElement.clientHeight)) {
                ew = false
            }
        }
        if (ew != null && !dY) {
            var ez = ej("div", "\u200b", null, "position: absolute; top: " + (eA.top - eB.viewOffset) + "px; height: " + (eA.bottom - eA.top + aO) + "px; left: " + eA.left + "px; width: 2px;");
            ex.display.lineSpace.appendChild(ez);
            ez.scrollIntoView(ew);
            ex.display.lineSpace.removeChild(ez)
        }
    }

    function x(eF, eD, eA, ez) {
        if (ez == null) {
            ez = 0
        }
        for (;;) {
            var eB = false,
                eE = cH(eF, eD);
            var ew = !eA || eA == eD ? eE : cH(eF, eA);
            var ey = A(eF, Math.min(eE.left, ew.left), Math.min(eE.top, ew.top) - ez, Math.max(eE.left, ew.left), Math.max(eE.bottom, ew.bottom) + ez);
            var eC = eF.doc.scrollTop,
                ex = eF.doc.scrollLeft;
            if (ey.scrollTop != null) {
                F(eF, ey.scrollTop);
                if (Math.abs(eF.doc.scrollTop - eC) > 1) {
                    eB = true
                }
            }
            if (ey.scrollLeft != null) {
                a3(eF, ey.scrollLeft);
                if (Math.abs(eF.doc.scrollLeft - ex) > 1) {
                    eB = true
                }
            }
            if (!eB) {
                return eE
            }
        }
    }

    function z(ew, ey, eA, ex, ez) {
        var eB = A(ew, ey, eA, ex, ez);
        if (eB.scrollTop != null) {
            F(ew, eB.scrollTop)
        }
        if (eB.scrollLeft != null) {
            a3(ew, eB.scrollLeft)
        }
    }

    function A(eC, eK, ez, eJ, ey) {
        var eH = eC.display,
            eG = aw(eC.display);
        if (ez < 0) {
            ez = 0
        }
        var ex = eH.scroller.clientHeight - aO,
            eF = eH.scroller.scrollTop,
            eE = {};
        var eM = eC.doc.height + a7(eH);
        var eN = ez < eG,
            eI = ey > eM - eG;
        if (ez < eF) {
            eE.scrollTop = eN ? 0 : ez
        } else {
            if (ey > eF + ex) {
                var eD = Math.min(ez, (eI ? eM : ey) - ex);
                if (eD != eF) {
                    eE.scrollTop = eD
                }
            }
        }
        var eB = eH.scroller.clientWidth - aO,
            ew = eH.scroller.scrollLeft;
        eK += eH.gutters.offsetWidth;
        eJ += eH.gutters.offsetWidth;
        var eA = eH.gutters.offsetWidth;
        var eL = eK < eA + 10;
        if (eK < ew + eA || eL) {
            if (eL) {
                eK = 0
            }
            eE.scrollLeft = Math.max(0, eK - 10 - eA)
        } else {
            if (eJ > eB + ew - 3) {
                eE.scrollLeft = eJ + 10 - eB
            }
        }
        return eE
    }

    function y(ew, ey, ex) {
        ew.curOp.updateScrollPos = {
            scrollLeft: ey == null ? ew.doc.scrollLeft : ey,
            scrollTop: ex == null ? ew.doc.scrollTop : ex
        }
    }

    function b0(ex, ez, ey) {
        var eA = ex.curOp.updateScrollPos || (ex.curOp.updateScrollPos = {
            scrollLeft: ex.doc.scrollLeft,
            scrollTop: ex.doc.scrollTop
        });
        var ew = ex.display.scroller;
        eA.scrollTop = Math.max(0, Math.min(ew.scrollHeight - ew.clientHeight, eA.scrollTop + ey));
        eA.scrollLeft = Math.max(0, Math.min(ew.scrollWidth - ew.clientWidth, eA.scrollLeft + ez))
    }

    function N(eI, ez, eH, ey) {
        var eG = eI.doc;
        if (eH == null) {
            eH = "add"
        }
        if (eH == "smart") {
            if (!eI.doc.mode.indent) {
                eH = "prev"
            } else {
                var ex = cw(eI, ez)
            }
        }
        var eC = eI.options.tabSize;
        var eJ = dJ(eG, ez),
            eB = bg(eJ.text, null, eC);
        var ew = eJ.text.match(/^\s*/)[0],
            eE;
        if (!ey && !/\S/.test(eJ.text)) {
            eE = 0;
            eH = "not"
        } else {
            if (eH == "smart") {
                eE = eI.doc.mode.indent(ex, eJ.text.slice(ew.length), eJ.text);
                if (eE == bv) {
                    if (!ey) {
                        return
                    }
                    eH = "prev"
                }
            }
        }
        if (eH == "prev") {
            if (ez > eG.first) {
                eE = bg(dJ(eG, ez - 1).text, null, eC)
            } else {
                eE = 0
            }
        } else {
            if (eH == "add") {
                eE = eB + eI.options.indentUnit
            } else {
                if (eH == "subtract") {
                    eE = eB - eI.options.indentUnit
                } else {
                    if (typeof eH == "number") {
                        eE = eB + eH
                    }
                }
            }
        }
        eE = Math.max(0, eE);
        var eF = "",
            eD = 0;
        if (eI.options.indentWithTabs) {
            for (var eA = Math.floor(eE / eC); eA; --eA) {
                eD += eC;
                eF += "\t"
            }
        }
        if (eD < eE) {
            eF += bJ(eE - eD)
        }
        if (eF != ew) {
            az(eI.doc, eF, K(ez, 0), K(ez, ew.length), "+input")
        } else {
            if (eG.sel.head.line == ez && eG.sel.head.ch < ew.length) {
                bh(eG, K(ez, ew.length), K(ez, ew.length), 1)
            }
        }
        eJ.stateAfter = null
    }

    function c9(ew, ey, eB) {
        var eA = ey,
            ex = ey,
            ez = ew.doc;
        if (typeof ey == "number") {
            ex = dJ(ez, cb(ez, ey))
        } else {
            eA = bc(ey)
        }
        if (eA == null) {
            return null
        }
        if (eB(ex, eA)) {
            Q(ew, eA, eA + 1)
        } else {
            return null
        }
        return ex
    }

    function aZ(eN, ez, eH, eG, eB) {
        var eE = ez.line,
            eF = ez.ch,
            eM = eH;
        var ew = dJ(eN, eE);
        var eK = true;

        function eL() {
            var eO = eE + eH;
            if (eO < eN.first || eO >= eN.first + eN.size) {
                return (eK = false)
            }
            eE = eO;
            return ew = dJ(eN, eO)
        }

        function eJ(eP) {
            var eO = (eB ? q : R)(ew, eF, eH, true);
            if (eO == null) {
                if (!eP && eL()) {
                    if (eB) {
                        eF = (eH < 0 ? b4 : bU)(ew)
                    } else {
                        eF = eH < 0 ? ew.text.length : 0
                    }
                } else {
                    return (eK = false)
                }
            } else {
                eF = eO
            }
            return true
        }
        if (eG == "char") {
            eJ()
        } else {
            if (eG == "column") {
                eJ(true)
            } else {
                if (eG == "word" || eG == "group") {
                    var eI = null,
                        eC = eG == "group";
                    for (var eA = true;; eA = false) {
                        if (eH < 0 && !eJ(!eA)) {
                            break
                        }
                        var ex = ew.text.charAt(eF) || "\n";
                        var ey = bR(ex) ? "w" : !eC ? null : /\s/.test(ex) ? null : "p";
                        if (eI && eI != ey) {
                            if (eH < 0) {
                                eH = 1;
                                eJ()
                            }
                            break
                        }
                        if (ey) {
                            eI = ey
                        }
                        if (eH > 0 && !eJ(!eA)) {
                            break
                        }
                    }
                }
            }
        }
        var eD = bi(eN, K(eE, eF), eM, true);
        if (!eK) {
            eD.hitSide = true
        }
        return eD
    }

    function aV(eE, ez, ew, eD) {
        var eC = eE.doc,
            eB = ez.left,
            eA;
        if (eD == "page") {
            var ey = Math.min(eE.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
            eA = ez.top + ew * (ey - (ew < 0 ? 1.5 : 0.5) * aw(eE.display))
        } else {
            if (eD == "line") {
                eA = ew > 0 ? ez.bottom + 3 : ez.top - 3
            }
        }
        for (;;) {
            var ex = ed(eE, eB, eA);
            if (!ex.outside) {
                break
            }
            if (ew < 0 ? eA <= 0 : eA >= eC.height) {
                ex.hitSide = true;
                break
            }
            eA += ew * 5
        }
        return ex
    }

    function ab(ez, eB) {
        var eA = eB.ch,
            ey = eB.ch;
        if (ez) {
            if ((eB.xRel < 0 || ey == ez.length) && eA) {
                --eA
            } else {
                ++ey
            }
            var ex = ez.charAt(eA);
            var ew = bR(ex) ? bR : /\s/.test(ex) ? function(eC) {
                return /\s/.test(eC)
            } : function(eC) {
                return !/\s/.test(eC) && !bR(eC)
            };
            while (eA > 0 && ew(ez.charAt(eA - 1))) {
                --eA
            }
            while (ey < ez.length && ew(ez.charAt(ey))) {
                ++ey
            }
        }
        return {
            from: K(eB.line, eA),
            to: K(eB.line, ey)
        }
    }

    function aQ(ew, ex) {
        eg(ew.doc, K(ex, 0), d9(ew.doc, K(ex + 1, 0)))
    }
    B.prototype = {
        constructor: B,
        focus: function() {
            window.focus();
            db(this);
            w(this)
        },
        setOption: function(ey, ez) {
            var ex = this.options,
                ew = ex[ey];
            if (ex[ey] == ez && ey != "mode") {
                return
            }
            ex[ey] = ez;
            if (aK.hasOwnProperty(ey)) {
                b9(this, aK[ey])(this, ez, ew)
            }
        },
        getOption: function(ew) {
            return this.options[ew]
        },
        getDoc: function() {
            return this.doc
        },
        addKeyMap: function(ex, ew) {
            this.state.keyMaps[ew ? "push" : "unshift"](ex)
        },
        removeKeyMap: function(ex) {
            var ey = this.state.keyMaps;
            for (var ew = 0; ew < ey.length; ++ew) {
                if (ey[ew] == ex || (typeof ey[ew] != "string" && ey[ew].name == ex)) {
                    ey.splice(ew, 1);
                    return true
                }
            }
        },
        addOverlay: b9(null, function(ew, ex) {
            var ey = ew.token ? ew : B.getMode(this.options, ew);
            if (ey.startState) {
                throw new Error("Overlays may not be stateful.")
            }
            this.state.overlays.push({
                mode: ey,
                modeSpec: ew,
                opaque: ex && ex.opaque
            });
            this.state.modeGen++;
            Q(this)
        }),
        removeOverlay: b9(null, function(ew) {
            var ey = this.state.overlays;
            for (var ex = 0; ex < ey.length; ++ex) {
                var ez = ey[ex].modeSpec;
                if (ez == ew || typeof ew == "string" && ez.name == ew) {
                    ey.splice(ex, 1);
                    this.state.modeGen++;
                    Q(this);
                    return
                }
            }
        }),
        indentLine: b9(null, function(ey, ew, ex) {
            if (typeof ew != "string" && typeof ew != "number") {
                if (ew == null) {
                    ew = this.options.smartIndent ? "smart" : "prev"
                } else {
                    ew = ew ? "add" : "subtract"
                }
            }
            if (bt(this.doc, ey)) {
                N(this, ey, ew, ex)
            }
        }),
        indentSelection: b9(null, function(ex) {
            var ey = this.doc.sel;
            if (d8(ey.from, ey.to)) {
                return N(this, ey.from.line, ex, true)
            }
            var ez = ey.to.line - (ey.to.ch ? 0 : 1);
            for (var ew = ey.from.line; ew <= ez; ++ew) {
                N(this, ew, ex)
            }
        }),
        getTokenAt: function(eD, ex) {
            var eA = this.doc;
            eD = d9(eA, eD);
            var ez = cw(this, eD.line, ex),
                eC = this.doc.mode;
            var ew = dJ(eA, eD.line);
            var eB = new ds(ew.text, this.options.tabSize);
            while (eB.pos < eD.ch && !eB.eol()) {
                eB.start = eB.pos;
                var ey = eC.token(eB, ez)
            }
            return {
                start: eB.start,
                end: eB.pos,
                string: eB.current(),
                className: ey || null,
                type: ey || null,
                state: ez
            }
        },
        getTokenTypeAt: function(eB) {
            eB = d9(this.doc, eB);
            var ey = cd(this, dJ(this.doc, eB.line));
            var ez = 0,
                eA = (ey.length - 1) / 2,
                ex = eB.ch;
            if (ex == 0) {
                return ey[2]
            }
            for (;;) {
                var ew = (ez + eA) >> 1;
                if ((ew ? ey[ew * 2 - 1] : 0) >= ex) {
                    eA = ew
                } else {
                    if (ey[ew * 2 + 1] < ex) {
                        ez = ew + 1
                    } else {
                        return ey[ew * 2 + 2]
                    }
                }
            }
        },
        getModeAt: function(ex) {
            var ew = this.doc.mode;
            if (!ew.innerMode) {
                return ew
            }
            return B.innerMode(ew, this.getTokenAt(ex).state).mode
        },
        getHelper: function(ex, ew) {
            return this.getHelpers(ex, ew)[0]
        },
        getHelpers: function(eD, ey) {
            var ez = [];
            if (!dS.hasOwnProperty(ey)) {
                return dS
            }
            var ew = dS[ey],
                eC = this.getModeAt(eD);
            if (typeof eC[ey] == "string") {
                if (ew[eC[ey]]) {
                    ez.push(ew[eC[ey]])
                }
            } else {
                if (eC[ey]) {
                    for (var ex = 0; ex < eC[ey].length; ex++) {
                        var eB = ew[eC[ey][ex]];
                        if (eB) {
                            ez.push(eB)
                        }
                    }
                } else {
                    if (eC.helperType && ew[eC.helperType]) {
                        ez.push(ew[eC.helperType])
                    } else {
                        if (ew[eC.name]) {
                            ez.push(ew[eC.name])
                        }
                    }
                }
            }
            for (var ex = 0; ex < ew._global.length; ex++) {
                var eA = ew._global[ex];
                if (eA.pred(eC, this) && cl(ez, eA.val) == -1) {
                    ez.push(eA.val)
                }
            }
            return ez
        },
        getStateAfter: function(ex, ew) {
            var ey = this.doc;
            ex = cb(ey, ex == null ? ey.first + ey.size - 1 : ex);
            return cw(this, ex + 1, ew)
        },
        cursorCoords: function(ez, ex) {
            var ey, ew = this.doc.sel;
            if (ez == null) {
                ey = ew.head
            } else {
                if (typeof ez == "object") {
                    ey = d9(this.doc, ez)
                } else {
                    ey = ez ? ew.from : ew.to
                }
            }
            return cH(this, ey, ex || "page")
        },
        charCoords: function(ex, ew) {
            return bZ(this, d9(this.doc, ex), ew || "page")
        },
        coordsChar: function(ew, ex) {
            ew = es(this, ew, ex || "page");
            return ed(this, ew.left, ew.top)
        },
        lineAtHeight: function(ew, ex) {
            ew = es(this, {
                top: ew,
                left: 0
            }, ex || "page").top;
            return a5(this.doc, ew + this.display.viewOffset)
        },
        heightAtLine: function(ex, eA) {
            var ew = false,
                ez = this.doc.first + this.doc.size - 1;
            if (ex < this.doc.first) {
                ex = this.doc.first
            } else {
                if (ex > ez) {
                    ex = ez;
                    ew = true
                }
            }
            var ey = dJ(this.doc, ex);
            return dp(this, dJ(this.doc, ex), {
                top: 0,
                left: 0
            }, eA || "page").top + (ew ? ey.height : 0)
        },
        defaultTextHeight: function() {
            return aw(this.display)
        },
        defaultCharWidth: function() {
            return cy(this.display)
        },
        setGutterMarker: b9(null, function(ew, ex, ey) {
            return c9(this, ew, function(ez) {
                var eA = ez.gutterMarkers || (ez.gutterMarkers = {});
                eA[ex] = ey;
                if (!ey && dt(eA)) {
                    ez.gutterMarkers = null
                }
                return true
            })
        }),
        clearGutter: b9(null, function(ey) {
            var ew = this,
                ez = ew.doc,
                ex = ez.first;
            ez.iter(function(eA) {
                if (eA.gutterMarkers && eA.gutterMarkers[ey]) {
                    eA.gutterMarkers[ey] = null;
                    Q(ew, ex, ex + 1);
                    if (dt(eA.gutterMarkers)) {
                        eA.gutterMarkers = null
                    }
                }++ex
            })
        }),
        addLineClass: b9(null, function(ey, ex, ew) {
            return c9(this, ey, function(ez) {
                var eA = ex == "text" ? "textClass" : ex == "background" ? "bgClass" : "wrapClass";
                if (!ez[eA]) {
                    ez[eA] = ew
                } else {
                    if (new RegExp("(?:^|\\s)" + ew + "(?:$|\\s)").test(ez[eA])) {
                        return false
                    } else {
                        ez[eA] += " " + ew
                    }
                }
                return true
            })
        }),
        removeLineClass: b9(null, function(ey, ex, ew) {
            return c9(this, ey, function(eA) {
                var eD = ex == "text" ? "textClass" : ex == "background" ? "bgClass" : "wrapClass";
                var eC = eA[eD];
                if (!eC) {
                    return false
                } else {
                    if (ew == null) {
                        eA[eD] = null
                    } else {
                        var eB = eC.match(new RegExp("(?:^|\\s+)" + ew + "(?:$|\\s+)"));
                        if (!eB) {
                            return false
                        }
                        var ez = eB.index + eB[0].length;
                        eA[eD] = eC.slice(0, eB.index) + (!eB.index || ez == eC.length ? "" : " ") + eC.slice(ez) || null
                    }
                }
                return true
            })
        }),
        addLineWidget: b9(null, function(ey, ex, ew) {
            return a6(this, ey, ex, ew)
        }),
        removeLineWidget: function(ew) {
            ew.clear()
        },
        lineInfo: function(ew) {
            if (typeof ew == "number") {
                if (!bt(this.doc, ew)) {
                    return null
                }
                var ex = ew;
                ew = dJ(this.doc, ew);
                if (!ew) {
                    return null
                }
            } else {
                var ex = bc(ew);
                if (ex == null) {
                    return null
                }
            }
            return {
                line: ex,
                handle: ew,
                text: ew.text,
                gutterMarkers: ew.gutterMarkers,
                textClass: ew.textClass,
                bgClass: ew.bgClass,
                wrapClass: ew.wrapClass,
                widgets: ew.widgets
            }
        },
        getViewport: function() {
            return {
                from: this.display.showingFrom,
                to: this.display.showingTo
            }
        },
        addWidget: function(eB, ey, eD, ez, eF) {
            var eA = this.display;
            eB = cH(this, d9(this.doc, eB));
            var eC = eB.bottom,
                ex = eB.left;
            ey.style.position = "absolute";
            eA.sizer.appendChild(ey);
            if (ez == "over") {
                eC = eB.top
            } else {
                if (ez == "above" || ez == "near") {
                    var ew = Math.max(eA.wrapper.clientHeight, this.doc.height),
                        eE = Math.max(eA.sizer.clientWidth, eA.lineSpace.clientWidth);
                    if ((ez == "above" || eB.bottom + ey.offsetHeight > ew) && eB.top > ey.offsetHeight) {
                        eC = eB.top - ey.offsetHeight
                    } else {
                        if (eB.bottom + ey.offsetHeight <= ew) {
                            eC = eB.bottom
                        }
                    }
                    if (ex + ey.offsetWidth > eE) {
                        ex = eE - ey.offsetWidth
                    }
                }
            }
            ey.style.top = eC + "px";
            ey.style.left = ey.style.right = "";
            if (eF == "right") {
                ex = eA.sizer.clientWidth - ey.offsetWidth;
                ey.style.right = "0px"
            } else {
                if (eF == "left") {
                    ex = 0
                } else {
                    if (eF == "middle") {
                        ex = (eA.sizer.clientWidth - ey.offsetWidth) / 2
                    }
                }
                ey.style.left = ex + "px"
            }
            if (eD) {
                z(this, ex, eC, ex + ey.offsetWidth, eC + ey.offsetHeight)
            }
        },
        triggerOnKeyDown: b9(null, m),
        execCommand: function(ew) {
            if (dd.hasOwnProperty(ew)) {
                return dd[ew](this)
            }
        },
        findPosH: function(eC, ez, eA, ex) {
            var ew = 1;
            if (ez < 0) {
                ew = -1;
                ez = -ez
            }
            for (var ey = 0, eB = d9(this.doc, eC); ey < ez; ++ey) {
                eB = aZ(this.doc, eB, ew, eA, ex);
                if (eB.hitSide) {
                    break
                }
            }
            return eB
        },
        moveH: b9(null, function(ew, ex) {
            var ey = this.doc.sel,
                ez;
            if (ey.shift || ey.extend || d8(ey.from, ey.to)) {
                ez = aZ(this.doc, ey.head, ew, ex, this.options.rtlMoveVisually)
            } else {
                ez = ew < 0 ? ey.from : ey.to
            }
            eg(this.doc, ez, ez, ew)
        }),
        deleteH: b9(null, function(ew, ex) {
            var ey = this.doc.sel;
            if (!d8(ey.from, ey.to)) {
                az(this.doc, "", ey.from, ey.to, "+delete")
            } else {
                az(this.doc, "", ey.from, aZ(this.doc, ey.head, ew, ex, false), "+delete")
            }
            this.curOp.userSelChange = true
        }),
        findPosV: function(eB, ey, eC, eE) {
            var ew = 1,
                eA = eE;
            if (ey < 0) {
                ew = -1;
                ey = -ey
            }
            for (var ex = 0, eD = d9(this.doc, eB); ex < ey; ++ex) {
                var ez = cH(this, eD, "div");
                if (eA == null) {
                    eA = ez.left
                } else {
                    ez.left = eA
                }
                eD = aV(this, ez, ew, eC);
                if (eD.hitSide) {
                    break
                }
            }
            return eD
        },
        moveV: b9(null, function(ex, ey) {
            var ez = this.doc.sel,
                eA, ew;
            if (ez.shift || ez.extend || d8(ez.from, ez.to)) {
                var eB = cH(this, ez.head, "div");
                if (ez.goalColumn != null) {
                    eB.left = ez.goalColumn
                }
                eA = aV(this, eB, ex, ey);
                if (ey == "page") {
                    b0(this, 0, bZ(this, eA, "div").top - eB.top)
                }
                ew = eB.left
            } else {
                eA = ex < 0 ? ez.from : ez.to
            }
            eg(this.doc, eA, eA, ex);
            if (ew != null) {
                ez.goalColumn = ew
            }
        }),
        toggleOverwrite: function(ew) {
            if (ew != null && ew == this.state.overwrite) {
                return
            }
            if (this.state.overwrite = !this.state.overwrite) {
                this.display.cursor.className += " CodeMirror-overwrite"
            } else {
                this.display.cursor.className = this.display.cursor.className.replace(" CodeMirror-overwrite", "")
            }
        },
        hasFocus: function() {
            return this.state.focused
        },
        scrollTo: b9(null, function(ew, ex) {
            y(this, ew, ex)
        }),
        getScrollInfo: function() {
            var ew = this.display.scroller,
                ex = aO;
            return {
                left: ew.scrollLeft,
                top: ew.scrollTop,
                height: ew.scrollHeight - ex,
                width: ew.scrollWidth - ex,
                clientHeight: ew.clientHeight - ex,
                clientWidth: ew.clientWidth - ex
            }
        },
        scrollIntoView: b9(null, function(ex, ez) {
            if (ex == null) {
                ex = {
                    from: this.doc.sel.head,
                    to: null
                }
            } else {
                if (typeof ex == "number") {
                    ex = {
                        from: K(ex, 0),
                        to: null
                    }
                } else {
                    if (ex.from == null) {
                        ex = {
                            from: ex,
                            to: null
                        }
                    }
                }
            }
            if (!ex.to) {
                ex.to = ex.from
            }
            if (!ez) {
                ez = 0
            }
            var ey = ex;
            if (ex.from.line != null) {
                this.curOp.scrollToPos = {
                    from: ex.from,
                    to: ex.to,
                    margin: ez
                };
                ey = {
                    from: cH(this, ex.from),
                    to: cH(this, ex.to)
                }
            }
            var ew = A(this, Math.min(ey.from.left, ey.to.left), Math.min(ey.from.top, ey.to.top) - ez, Math.max(ey.from.right, ey.to.right), Math.max(ey.from.bottom, ey.to.bottom) + ez);
            y(this, ew.scrollLeft, ew.scrollTop)
        }),
        setSize: b9(null, function(ey, ew) {
            function ex(ez) {
                return typeof ez == "number" || /^\d+$/.test(String(ez)) ? ez + "px" : ez
            }
            if (ey != null) {
                this.display.wrapper.style.width = ex(ey)
            }
            if (ew != null) {
                this.display.wrapper.style.height = ex(ew)
            }
            if (this.options.lineWrapping) {
                this.display.measureLineCache.length = this.display.measureLineCachePos = 0
            }
            this.curOp.forceUpdate = true
        }),
        operation: function(ew) {
            return b1(this, ew)
        },
        refresh: b9(null, function() {
            var ew = this.display.cachedTextHeight == null;
            T(this);
            y(this, this.doc.scrollLeft, this.doc.scrollTop);
            Q(this);
            if (ew) {
                L(this)
            }
        }),
        swapDoc: b9(null, function(ex) {
            var ew = this.doc;
            ew.cm = null;
            cQ(this, ex);
            T(this);
            dU(this, true);
            y(this, ex.scrollLeft, ex.scrollTop);
            O(this, "swapDoc", this, ew);
            return ew
        }),
        getInputField: function() {
            return this.display.input
        },
        getWrapperElement: function() {
            return this.display.wrapper
        },
        getScrollerElement: function() {
            return this.display.scroller
        },
        getGutterElement: function() {
            return this.display.gutters
        }
    };
    a0(B);
    var aK = B.optionHandlers = {};
    var dA = B.defaults = {};

    function o(ew, ez, ey, ex) {
        B.defaults[ew] = ez;
        if (ey) {
            aK[ew] = ex ? function(eA, eC, eB) {
                if (eB != bw) {
                    ey(eA, eC, eB)
                }
            } : ey
        }
    }
    var bw = B.Init = {
        toString: function() {
            return "CodeMirror.Init"
        }
    };
    o("value", "", function(ew, ex) {
        ew.setValue(ex)
    }, true);
    o("mode", null, function(ew, ex) {
        ew.doc.modeOption = ex;
        aW(ew)
    }, true);
    o("indentUnit", 2, aW, true);
    o("indentWithTabs", false);
    o("smartIndent", true);
    o("tabSize", 4, function(ew) {
        cZ(ew);
        T(ew);
        Q(ew)
    }, true);
    o("specialChars", /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g, function(ew, ex) {
        ew.options.specialChars = new RegExp(ex.source + (ex.test("\t") ? "" : "|\t"), "g");
        ew.refresh()
    }, true);
    o("specialCharPlaceholder", dH, function(ew) {
        ew.refresh()
    }, true);
    o("electricChars", true);
    o("rtlMoveVisually", !ao);
    o("wholeLineUpdateBefore", true);
    o("theme", "default", function(ew) {
        b2(ew);
        ct(ew)
    }, true);
    o("keyMap", "default", et);
    o("extraKeys", null);
    o("onKeyEvent", null);
    o("onDragEvent", null);
    o("lineWrapping", false, dj, true);
    o("gutters", [], function(ew) {
        by(ew.options);
        ct(ew)
    }, true);
    o("fixedGutter", true, function(ew, ex) {
        ew.display.gutters.style.left = ex ? cJ(ew.display) + "px" : "0";
        ew.refresh()
    }, true);
    o("coverGutterNextToScrollbar", false, dw, true);
    o("lineNumbers", false, function(ew) {
        by(ew.options);
        ct(ew)
    }, true);
    o("firstLineNumber", 1, ct, true);
    o("lineNumberFormatter", function(ew) {
        return ew
    }, ct, true);
    o("showCursorWhenSelecting", false, a2, true);
    o("resetSelectionOnContextMenu", true);
    o("readOnly", false, function(ew, ex) {
        if (ex == "nocursor") {
            au(ew);
            ew.display.input.blur();
            ew.display.disabled = true
        } else {
            ew.display.disabled = false;
            if (!ex) {
                dU(ew, true)
            }
        }
    });
    o("disableInput", false, function(ew, ex) {
        if (!ex) {
            dU(ew, true)
        }
    }, true);
    o("dragDrop", true);
    o("cursorBlinkRate", 530);
    o("cursorScrollMargin", 0);
    o("cursorHeight", 1);
    o("workTime", 100);
    o("workDelay", 100);
    o("flattenSpans", true, cZ, true);
    o("addModeClass", false, cZ, true);
    o("pollInterval", 100);
    o("undoDepth", 40, function(ew, ex) {
        ew.doc.history.undoDepth = ex
    });
    o("historyEventDelay", 500);
    o("viewportMargin", 10, function(ew) {
        ew.refresh()
    }, true);
    o("maxHighlightLength", 10000, cZ, true);
    o("crudeMeasuringFrom", 10000);
    o("moveInputWithCursor", true, function(ew, ex) {
        if (!ex) {
            ew.display.inputDiv.style.top = ew.display.inputDiv.style.left = 0
        }
    });
    o("tabindex", null, function(ew, ex) {
        ew.display.input.tabIndex = ex || ""
    });
    o("autofocus", null);
    var cq = B.modes = {},
        at = B.mimeModes = {};
    B.defineMode = function(ew, ey) {
        if (!B.defaults.mode && ew != "null") {
            B.defaults.mode = ew
        }
        if (arguments.length > 2) {
            ey.dependencies = [];
            for (var ex = 2; ex < arguments.length; ++ex) {
                ey.dependencies.push(arguments[ex])
            }
        }
        cq[ew] = ey
    };
    B.defineMIME = function(ex, ew) {
        at[ex] = ew
    };
    B.resolveMode = function(ew) {
        if (typeof ew == "string" && at.hasOwnProperty(ew)) {
            ew = at[ew]
        } else {
            if (ew && typeof ew.name == "string" && at.hasOwnProperty(ew.name)) {
                var ex = at[ew.name];
                ew = bD(ex, ew);
                ew.name = ex.name
            } else {
                if (typeof ew == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(ew)) {
                    return B.resolveMode("application/xml")
                }
            }
        }
        if (typeof ew == "string") {
            return {
                name: ew
            }
        } else {
            return ew || {
                name: "null"
            }
        }
    };
    B.getMode = function(ex, ew) {
        var ew = B.resolveMode(ew);
        var ez = cq[ew.name];
        if (!ez) {
            return B.getMode(ex, "text/plain")
        }
        var eA = ez(ex, ew);
        if (co.hasOwnProperty(ew.name)) {
            var ey = co[ew.name];
            for (var eB in ey) {
                if (!ey.hasOwnProperty(eB)) {
                    continue
                }
                if (eA.hasOwnProperty(eB)) {
                    eA["_" + eB] = eA[eB]
                }
                eA[eB] = ey[eB]
            }
        }
        eA.name = ew.name;
        if (ew.helperType) {
            eA.helperType = ew.helperType
        }
        if (ew.modeProps) {
            for (var eB in ew.modeProps) {
                eA[eB] = ew.modeProps[eB]
            }
        }
        return eA
    };
    B.defineMode("null", function() {
        return {
            token: function(ew) {
                ew.skipToEnd()
            }
        }
    });
    B.defineMIME("text/plain", "null");
    var co = B.modeExtensions = {};
    B.extendMode = function(ey, ex) {
        var ew = co.hasOwnProperty(ey) ? co[ey] : (co[ey] = {});
        am(ex, ew)
    };
    B.defineExtension = function(ew, ex) {
        B.prototype[ew] = ex
    };
    B.defineDocExtension = function(ew, ex) {
        aa.prototype[ew] = ex
    };
    B.defineOption = o;
    var aE = [];
    B.defineInitHook = function(ew) {
        aE.push(ew)
    };
    var dS = B.helpers = {};
    B.registerHelper = function(ex, ew, ey) {
        if (!dS.hasOwnProperty(ex)) {
            dS[ex] = B[ex] = {
                _global: []
            }
        }
        dS[ex][ew] = ey
    };
    B.registerGlobalHelper = function(ey, ex, ew, ez) {
        B.registerHelper(ey, ex, ez);
        dS[ey]._global.push({
            pred: ew,
            val: ez
        })
    };
    B.isWordChar = bR;

    function bo(ez, ew) {
        if (ew === true) {
            return ew
        }
        if (ez.copyState) {
            return ez.copyState(ew)
        }
        var ey = {};
        for (var eA in ew) {
            var ex = ew[eA];
            if (ex instanceof Array) {
                ex = ex.concat([])
            }
            ey[eA] = ex
        }
        return ey
    }
    B.copyState = bo;

    function bm(ey, ex, ew) {
        return ey.startState ? ey.startState(ex, ew) : true
    }
    B.startState = bm;
    B.innerMode = function(ey, ew) {
        while (ey.innerMode) {
            var ex = ey.innerMode(ew);
            if (!ex || ex.mode == ey) {
                break
            }
            ew = ex.state;
            ey = ex.mode
        }
        return ex || {
            mode: ey,
            state: ew
        }
    };
    var dd = B.commands = {
        selectAll: function(ew) {
            ew.setSelection(K(ew.firstLine(), 0), K(ew.lastLine()))
        },
        killLine: function(ew) {
            var ez = ew.getCursor(true),
                ey = ew.getCursor(false),
                ex = !d8(ez, ey);
            if (!ex && ew.getLine(ez.line).length == ez.ch) {
                ew.replaceRange("", ez, K(ez.line + 1, 0), "+delete")
            } else {
                ew.replaceRange("", ez, ex ? ey : K(ez.line), "+delete")
            }
        },
        deleteLine: function(ew) {
            var ex = ew.getCursor().line;
            ew.replaceRange("", K(ex, 0), K(ex), "+delete")
        },
        delLineLeft: function(ew) {
            var ex = ew.getCursor();
            ew.replaceRange("", K(ex.line, 0), ex, "+delete")
        },
        undo: function(ew) {
            ew.undo()
        },
        redo: function(ew) {
            ew.redo()
        },
        goDocStart: function(ew) {
            ew.extendSelection(K(ew.firstLine(), 0))
        },
        goDocEnd: function(ew) {
            ew.extendSelection(K(ew.lastLine()))
        },
        goLineStart: function(ew) {
            ew.extendSelection(aY(ew, ew.getCursor().line))
        },
        goLineStartSmart: function(ex) {
            var eB = ex.getCursor(),
                eC = aY(ex, eB.line);
            var ey = ex.getLineHandle(eC.line);
            var ew = a(ey);
            if (!ew || ew[0].level == 0) {
                var eA = Math.max(0, ey.text.search(/\S/));
                var ez = eB.line == eC.line && eB.ch <= eA && eB.ch;
                ex.extendSelection(K(eC.line, ez ? 0 : eA))
            } else {
                ex.extendSelection(eC)
            }
        },
        goLineEnd: function(ew) {
            ew.extendSelection(cE(ew, ew.getCursor().line))
        },
        goLineRight: function(ew) {
            var ex = ew.charCoords(ew.getCursor(), "div").top + 5;
            ew.extendSelection(ew.coordsChar({
                left: ew.display.lineDiv.offsetWidth + 100,
                top: ex
            }, "div"))
        },
        goLineLeft: function(ew) {
            var ex = ew.charCoords(ew.getCursor(), "div").top + 5;
            ew.extendSelection(ew.coordsChar({
                left: 0,
                top: ex
            }, "div"))
        },
        goLineUp: function(ew) {
            ew.moveV(-1, "line")
        },
        goLineDown: function(ew) {
            ew.moveV(1, "line")
        },
        goPageUp: function(ew) {
            ew.moveV(-1, "page")
        },
        goPageDown: function(ew) {
            ew.moveV(1, "page")
        },
        goCharLeft: function(ew) {
            ew.moveH(-1, "char")
        },
        goCharRight: function(ew) {
            ew.moveH(1, "char")
        },
        goColumnLeft: function(ew) {
            ew.moveH(-1, "column")
        },
        goColumnRight: function(ew) {
            ew.moveH(1, "column")
        },
        goWordLeft: function(ew) {
            ew.moveH(-1, "word")
        },
        goGroupRight: function(ew) {
            ew.moveH(1, "group")
        },
        goGroupLeft: function(ew) {
            ew.moveH(-1, "group")
        },
        goWordRight: function(ew) {
            ew.moveH(1, "word")
        },
        delCharBefore: function(ew) {
            ew.deleteH(-1, "char")
        },
        delCharAfter: function(ew) {
            ew.deleteH(1, "char")
        },
        delWordBefore: function(ew) {
            ew.deleteH(-1, "word")
        },
        delWordAfter: function(ew) {
            ew.deleteH(1, "word")
        },
        delGroupBefore: function(ew) {
            ew.deleteH(-1, "group")
        },
        delGroupAfter: function(ew) {
            ew.deleteH(1, "group")
        },
        indentAuto: function(ew) {
            ew.indentSelection("smart")
        },
        indentMore: function(ew) {
            ew.indentSelection("add")
        },
        indentLess: function(ew) {
            ew.indentSelection("subtract")
        },
        insertTab: function(ew) {
            ew.replaceSelection("\t", "end", "+input")
        },
        defaultTab: function(ew) {
            if (ew.somethingSelected()) {
                ew.indentSelection("add")
            } else {
                ew.replaceSelection("\t", "end", "+input")
            }
        },
        transposeChars: function(ew) {
            var ey = ew.getCursor(),
                ex = ew.getLine(ey.line);
            if (ey.ch > 0 && ey.ch < ex.length - 1) {
                ew.replaceRange(ex.charAt(ey.ch) + ex.charAt(ey.ch - 1), K(ey.line, ey.ch - 1), K(ey.line, ey.ch + 1))
            }
        },
        newlineAndIndent: function(ew) {
            b9(ew, function() {
                ew.replaceSelection("\n", "end", "+input");
                ew.indentLine(ew.getCursor().line, null, true)
            })()
        },
        toggleOverwrite: function(ew) {
            ew.toggleOverwrite()
        }
    };
    var dF = B.keyMap = {};
    dF.basic = {
        Left: "goCharLeft",
        Right: "goCharRight",
        Up: "goLineUp",
        Down: "goLineDown",
        End: "goLineEnd",
        Home: "goLineStartSmart",
        PageUp: "goPageUp",
        PageDown: "goPageDown",
        Delete: "delCharAfter",
        Backspace: "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        Tab: "defaultTab",
        "Shift-Tab": "indentAuto",
        Enter: "newlineAndIndent",
        Insert: "toggleOverwrite"
    };
    dF.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Alt-Up": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Down": "goDocEnd",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        fallthrough: "basic"
    };
    dF.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineStart",
        "Cmd-Right": "goLineEnd",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delLineLeft",
        fallthrough: ["basic", "emacsy"]
    };
    dF["default"] = bq ? dF.macDefault : dF.pcDefault;
    dF.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Alt-F": "goWordRight",
        "Alt-B": "goWordLeft",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-D": "delWordAfter",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars"
    };

    function eh(ew) {
        if (typeof ew == "string") {
            return dF[ew]
        } else {
            return ew
        }
    }

    function g(ex, eB, ez) {
        function eA(eH) {
            eH = eh(eH);
            var eF = eH[ex];
            if (eF === false) {
                return "stop"
            }
            if (eF != null && ez(eF)) {
                return true
            }
            if (eH.nofallthrough) {
                return "stop"
            }
            var eE = eH.fallthrough;
            if (eE == null) {
                return false
            }
            if (Object.prototype.toString.call(eE) != "[object Array]") {
                return eA(eE)
            }
            for (var eD = 0, eG = eE.length; eD < eG; ++eD) {
                var eC = eA(eE[eD]);
                if (eC) {
                    return eC
                }
            }
            return false
        }
        for (var ey = 0; ey < eB.length; ++ey) {
            var ew = eA(eB[ey]);
            if (ew) {
                return ew != "stop"
            }
        }
    }

    function dc(ex) {
        var ew = dL[ex.keyCode];
        return ew == "Ctrl" || ew == "Alt" || ew == "Shift" || ew == "Mod"
    }

    function dW(ex, ey) {
        if (d1 && ex.keyCode == 34 && ex["char"]) {
            return false
        }
        var ew = dL[ex.keyCode];
        if (ew == null || ex.altGraphKey) {
            return false
        }
        if (ex.altKey) {
            ew = "Alt-" + ew
        }
        if (be ? ex.metaKey : ex.ctrlKey) {
            ew = "Ctrl-" + ew
        }
        if (be ? ex.ctrlKey : ex.metaKey) {
            ew = "Cmd-" + ew
        }
        if (!ey && ex.shiftKey) {
            ew = "Shift-" + ew
        }
        return ew
    }
    B.lookupKey = g;
    B.isModifierKey = dc;
    B.keyName = dW;
    B.fromTextArea = function(eD, eE) {
        if (!eE) {
            eE = {}
        }
        eE.value = eD.value;
        if (!eE.tabindex && eD.tabindex) {
            eE.tabindex = eD.tabindex
        }
        if (!eE.placeholder && eD.placeholder) {
            eE.placeholder = eD.placeholder
        }
        if (eE.autofocus == null) {
            var ew = document.body;
            try {
                ew = document.activeElement
            } catch (ey) {}
            eE.autofocus = ew == eD || eD.getAttribute("autofocus") != null && ew == document.body
        }

        function eA() {
            eD.value = eC.getValue()
        }
        if (eD.form) {
            bk(eD.form, "submit", eA);
            if (!eE.leaveSubmitMethodAlone) {
                var ex = eD.form,
                    eB = ex.submit;
                try {
                    var ez = ex.submit = function() {
                        eA();
                        ex.submit = eB;
                        ex.submit();
                        ex.submit = ez
                    }
                } catch (ey) {}
            }
        }
        eD.style.display = "none";
        var eC = B(function(eF) {
            eD.parentNode.insertBefore(eF, eD.nextSibling)
        }, eE);
        eC.save = eA;
        eC.getTextArea = function() {
            return eD
        };
        eC.toTextArea = function() {
            eA();
            eD.parentNode.removeChild(eC.getWrapperElement());
            eD.style.display = "";
            if (eD.form) {
                cT(eD.form, "submit", eA);
                if (typeof eD.form.submit == "function") {
                    eD.form.submit = eB
                }
            }
        };
        return eC
    };

    function ds(ew, ex) {
        this.pos = this.start = 0;
        this.string = ew;
        this.tabSize = ex || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0
    }
    ds.prototype = {
        eol: function() {
            return this.pos >= this.string.length
        },
        sol: function() {
            return this.pos == this.lineStart
        },
        peek: function() {
            return this.string.charAt(this.pos) || undefined
        },
        next: function() {
            if (this.pos < this.string.length) {
                return this.string.charAt(this.pos++)
            }
        },
        eat: function(ew) {
            var ey = this.string.charAt(this.pos);
            if (typeof ew == "string") {
                var ex = ey == ew
            } else {
                var ex = ey && (ew.test ? ew.test(ey) : ew(ey))
            }
            if (ex) {
                ++this.pos;
                return ey
            }
        },
        eatWhile: function(ew) {
            var ex = this.pos;
            while (this.eat(ew)) {}
            return this.pos > ex
        },
        eatSpace: function() {
            var ew = this.pos;
            while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
                ++this.pos
            }
            return this.pos > ew
        },
        skipToEnd: function() {
            this.pos = this.string.length
        },
        skipTo: function(ew) {
            var ex = this.string.indexOf(ew, this.pos);
            if (ex > -1) {
                this.pos = ex;
                return true
            }
        },
        backUp: function(ew) {
            this.pos -= ew
        },
        column: function() {
            if (this.lastColumnPos < this.start) {
                this.lastColumnValue = bg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
                this.lastColumnPos = this.start
            }
            return this.lastColumnValue - (this.lineStart ? bg(this.string, this.lineStart, this.tabSize) : 0)
        },
        indentation: function() {
            return bg(this.string, null, this.tabSize) - (this.lineStart ? bg(this.string, this.lineStart, this.tabSize) : 0)
        },
        match: function(eA, ex, ew) {
            if (typeof eA == "string") {
                var eB = function(eC) {
                    return ew ? eC.toLowerCase() : eC
                };
                var ez = this.string.substr(this.pos, eA.length);
                if (eB(ez) == eB(eA)) {
                    if (ex !== false) {
                        this.pos += eA.length
                    }
                    return true
                }
            } else {
                var ey = this.string.slice(this.pos).match(eA);
                if (ey && ey.index > 0) {
                    return null
                }
                if (ey && ex !== false) {
                    this.pos += ey[0].length
                }
                return ey
            }
        },
        current: function() {
            return this.string.slice(this.start, this.pos)
        },
        hideFirstChars: function(ex, ew) {
            this.lineStart += ex;
            try {
                return ew()
            } finally {
                this.lineStart -= ex
            }
        }
    };
    B.StringStream = ds;

    function H(ex, ew) {
        this.lines = [];
        this.type = ew;
        this.doc = ex
    }
    B.TextMarker = H;
    a0(H);
    H.prototype.clear = function() {
        if (this.explicitlyCleared) {
            return
        }
        var eD = this.doc.cm,
            ex = eD && !eD.curOp;
        if (ex) {
            bY(eD)
        }
        if (dP(this, "clear")) {
            var eE = this.find();
            if (eE) {
                O(this, "clear", eE.from, eE.to)
            }
        }
        var ey = null,
            eB = null;
        for (var ez = 0; ez < this.lines.length; ++ez) {
            var eF = this.lines[ez];
            var eC = dE(eF.markedSpans, this);
            if (eC.to != null) {
                eB = bc(eF)
            }
            eF.markedSpans = dk(eF.markedSpans, eC);
            if (eC.from != null) {
                ey = bc(eF)
            } else {
                if (this.collapsed && !dZ(this.doc, eF) && eD) {
                    eo(eF, aw(eD.display))
                }
            }
        }
        if (eD && this.collapsed && !eD.options.lineWrapping) {
            for (var ez = 0; ez < this.lines.length; ++ez) {
                var ew = u(eD.doc, this.lines[ez]),
                    eA = c0(eD.doc, ew);
                if (eA > eD.display.maxLineLength) {
                    eD.display.maxLine = ew;
                    eD.display.maxLineLength = eA;
                    eD.display.maxLineChanged = true
                }
            }
        }
        if (ey != null && eD) {
            Q(eD, ey, eB + 1)
        }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
            this.doc.cantEdit = false;
            if (eD) {
                c7(eD)
            }
        }
        if (ex) {
            W(eD)
        }
    };
    H.prototype.find = function(eA) {
        var eC, eB;
        for (var ex = 0; ex < this.lines.length; ++ex) {
            var ew = this.lines[ex];
            var ey = dE(ew.markedSpans, this);
            if (ey.from != null || ey.to != null) {
                var ez = bc(ew);
                if (ey.from != null) {
                    eC = K(ez, ey.from)
                }
                if (ey.to != null) {
                    eB = K(ez, ey.to)
                }
            }
        }
        if (this.type == "bookmark" && !eA) {
            return eC
        }
        return eC && {
            from: eC,
            to: eB
        }
    };
    H.prototype.changed = function() {
        var ez = this.find(),
            ew = this.doc.cm;
        if (!ez || !ew) {
            return
        }
        if (this.type != "bookmark") {
            ez = ez.from
        }
        var ex = dJ(this.doc, ez.line);
        ec(ew, ex);
        if (ez.line >= ew.display.showingFrom && ez.line < ew.display.showingTo) {
            for (var ey = ew.display.lineDiv.firstChild; ey; ey = ey.nextSibling) {
                if (ey.lineObj == ex) {
                    if (ey.offsetHeight != ex.height) {
                        eo(ex, ey.offsetHeight)
                    }
                    break
                }
            }
            b1(ew, function() {
                ew.curOp.selectionChanged = ew.curOp.forceUpdate = ew.curOp.updateMaxLine = true
            })
        }
    };
    H.prototype.attachLine = function(ew) {
        if (!this.lines.length && this.doc.cm) {
            var ex = this.doc.cm.curOp;
            if (!ex.maybeHiddenMarkers || cl(ex.maybeHiddenMarkers, this) == -1) {
                (ex.maybeUnhiddenMarkers || (ex.maybeUnhiddenMarkers = [])).push(this)
            }
        }
        this.lines.push(ew)
    };
    H.prototype.detachLine = function(ew) {
        this.lines.splice(cl(this.lines, ew), 1);
        if (!this.lines.length && this.doc.cm) {
            var ex = this.doc.cm.curOp;
            (ex.maybeHiddenMarkers || (ex.maybeHiddenMarkers = [])).push(this)
        }
    };
    var aB = 0;

    function dh(eC, eA, eB, eE, ez) {
        if (eE && eE.shared) {
            return G(eC, eA, eB, eE, ez)
        }
        if (eC.cm && !eC.cm.curOp) {
            return b9(eC.cm, dh)(eC, eA, eB, eE, ez)
        }
        var ey = new H(eC, ez);
        if (eE) {
            am(eE, ey)
        }
        if (dK(eB, eA) || d8(eA, eB) && ey.clearWhenEmpty !== false) {
            return ey
        }
        if (ey.replacedWith) {
            ey.collapsed = true;
            ey.replacedWith = ej("span", [ey.replacedWith], "CodeMirror-widget");
            if (!eE.handleMouseEvents) {
                ey.replacedWith.ignoreEvents = true
            }
        }
        if (ey.collapsed) {
            if (v(eC, eA.line, eA, eB, ey) || eA.line != eB.line && v(eC, eB.line, eA, eB, ey)) {
                throw new Error("Inserting collapsed marker partially overlapping an existing one")
            }
            aD = true
        }
        if (ey.addToHistory) {
            di(eC, {
                from: eA,
                to: eB,
                origin: "markText"
            }, {
                head: eC.sel.head,
                anchor: eC.sel.anchor
            }, NaN)
        }
        var ex = eA.line,
            eD = eC.cm,
            ew;
        eC.iter(ex, eB.line + 1, function(eF) {
            if (eD && ey.collapsed && !eD.options.lineWrapping && u(eC, eF) == eD.display.maxLine) {
                ew = true
            }
            var eG = {
                from: null,
                to: null,
                marker: ey
            };
            if (ex == eA.line) {
                eG.from = eA.ch
            }
            if (ex == eB.line) {
                eG.to = eB.ch
            }
            if (ey.collapsed && ex != eA.line) {
                eo(eF, 0)
            }
            bx(eF, eG);
            ++ex
        });
        if (ey.collapsed) {
            eC.iter(eA.line, eB.line + 1, function(eF) {
                if (dZ(eC, eF)) {
                    eo(eF, 0)
                }
            })
        }
        if (ey.clearOnEnter) {
            bk(ey, "beforeCursorEnter", function() {
                ey.clear()
            })
        }
        if (ey.readOnly) {
            eq = true;
            if (eC.history.done.length || eC.history.undone.length) {
                eC.clearHistory()
            }
        }
        if (ey.collapsed) {
            ey.id = ++aB;
            ey.atomic = true
        }
        if (eD) {
            if (ew) {
                eD.curOp.updateMaxLine = true
            }
            if (ey.className || ey.title || ey.startStyle || ey.endStyle || ey.collapsed) {
                Q(eD, eA.line, eB.line + 1)
            }
            if (ey.atomic) {
                c7(eD)
            }
        }
        return ey
    }

    function t(ez, ex) {
        this.markers = ez;
        this.primary = ex;
        for (var ew = 0, ey = this; ew < ez.length; ++ew) {
            ez[ew].parent = this;
            bk(ez[ew], "clear", function() {
                ey.clear()
            })
        }
    }
    B.SharedTextMarker = t;
    a0(t);
    t.prototype.clear = function() {
        if (this.explicitlyCleared) {
            return
        }
        this.explicitlyCleared = true;
        for (var ew = 0; ew < this.markers.length; ++ew) {
            this.markers[ew].clear()
        }
        O(this, "clear")
    };
    t.prototype.find = function() {
        return this.primary.find()
    };

    function G(eA, eD, eC, ew, ey) {
        ew = am(ew);
        ew.shared = false;
        var eB = [dh(eA, eD, eC, ew, ey)],
            ex = eB[0];
        var ez = ew.replacedWith;
        cN(eA, function(eF) {
            if (ez) {
                ew.replacedWith = ez.cloneNode(true)
            }
            eB.push(dh(eF, d9(eF, eD), d9(eF, eC), ew, ey));
            for (var eE = 0; eE < eF.linked.length; ++eE) {
                if (eF.linked[eE].isParent) {
                    return
                }
            }
            ex = d7(eB)
        });
        return new t(eB, ex)
    }

    function dE(ey, ew) {
        if (ey) {
            for (var ex = 0; ex < ey.length; ++ex) {
                var ez = ey[ex];
                if (ez.marker == ew) {
                    return ez
                }
            }
        }
    }

    function dk(ex, ey) {
        for (var ez, ew = 0; ew < ex.length; ++ew) {
            if (ex[ew] != ey) {
                (ez || (ez = [])).push(ex[ew])
            }
        }
        return ez
    }

    function bx(ew, ex) {
        ew.markedSpans = ew.markedSpans ? ew.markedSpans.concat([ex]) : [ex];
        ex.marker.attachLine(ew)
    }

    function aq(ex, ey, eC) {
        if (ex) {
            for (var eA = 0, eD; eA < ex.length; ++eA) {
                var eE = ex[eA],
                    eB = eE.marker;
                var ew = eE.from == null || (eB.inclusiveLeft ? eE.from <= ey : eE.from < ey);
                if (ew || eE.from == ey && eB.type == "bookmark" && (!eC || !eE.marker.insertLeft)) {
                    var ez = eE.to == null || (eB.inclusiveRight ? eE.to >= ey : eE.to > ey);
                    (eD || (eD = [])).push({
                        from: eE.from,
                        to: ez ? null : eE.to,
                        marker: eB
                    })
                }
            }
        }
        return eD
    }

    function af(ex, ez, eC) {
        if (ex) {
            for (var eA = 0, eD; eA < ex.length; ++eA) {
                var eE = ex[eA],
                    eB = eE.marker;
                var ey = eE.to == null || (eB.inclusiveRight ? eE.to >= ez : eE.to > ez);
                if (ey || eE.from == ez && eB.type == "bookmark" && (!eC || eE.marker.insertLeft)) {
                    var ew = eE.from == null || (eB.inclusiveLeft ? eE.from <= ez : eE.from < ez);
                    (eD || (eD = [])).push({
                        from: ew ? null : eE.from - ez,
                        to: eE.to == null ? null : eE.to - ez,
                        marker: eB
                    })
                }
            }
        }
        return eD
    }

    function cY(eI, eF) {
        var eE = bt(eI, eF.from.line) && dJ(eI, eF.from.line).markedSpans;
        var eL = bt(eI, eF.to.line) && dJ(eI, eF.to.line).markedSpans;
        if (!eE && !eL) {
            return null
        }
        var ex = eF.from.ch,
            eA = eF.to.ch,
            eD = d8(eF.from, eF.to);
        var eC = aq(eE, ex, eD);
        var eK = af(eL, eA, eD);
        var eJ = eF.text.length == 1,
            ey = d7(eF.text).length + (eJ ? ex : 0);
        if (eC) {
            for (var ez = 0; ez < eC.length; ++ez) {
                var eH = eC[ez];
                if (eH.to == null) {
                    var eM = dE(eK, eH.marker);
                    if (!eM) {
                        eH.to = ex
                    } else {
                        if (eJ) {
                            eH.to = eM.to == null ? null : eM.to + ey
                        }
                    }
                }
            }
        }
        if (eK) {
            for (var ez = 0; ez < eK.length; ++ez) {
                var eH = eK[ez];
                if (eH.to != null) {
                    eH.to += ey
                }
                if (eH.from == null) {
                    var eM = dE(eC, eH.marker);
                    if (!eM) {
                        eH.from = ey;
                        if (eJ) {
                            (eC || (eC = [])).push(eH)
                        }
                    }
                } else {
                    eH.from += ey;
                    if (eJ) {
                        (eC || (eC = [])).push(eH)
                    }
                }
            }
        }
        if (eC) {
            eC = n(eC)
        }
        if (eK && eK != eC) {
            eK = n(eK)
        }
        var eB = [eC];
        if (!eJ) {
            var eG = eF.text.length - 2,
                ew;
            if (eG > 0 && eC) {
                for (var ez = 0; ez < eC.length; ++ez) {
                    if (eC[ez].to == null) {
                        (ew || (ew = [])).push({
                            from: null,
                            to: null,
                            marker: eC[ez].marker
                        })
                    }
                }
            }
            for (var ez = 0; ez < eG; ++ez) {
                eB.push(ew)
            }
            eB.push(eK)
        }
        return eB
    }

    function n(ex) {
        for (var ew = 0; ew < ex.length; ++ew) {
            var ey = ex[ew];
            if (ey.from != null && ey.from == ey.to && ey.marker.clearWhenEmpty !== false) {
                ex.splice(ew--, 1)
            }
        }
        if (!ex.length) {
            return null
        }
        return ex
    }

    function cP(eE, eC) {
        var ew = br(eE, eC);
        var eF = cY(eE, eC);
        if (!ew) {
            return eF
        }
        if (!eF) {
            return ew
        }
        for (var ez = 0; ez < ew.length; ++ez) {
            var eA = ew[ez],
                eB = eF[ez];
            if (eA && eB) {
                spans: for (var ey = 0; ey < eB.length; ++ey) {
                    var eD = eB[ey];
                    for (var ex = 0; ex < eA.length; ++ex) {
                        if (eA[ex].marker == eD.marker) {
                            continue spans
                        }
                    }
                    eA.push(eD)
                }
            } else {
                if (eB) {
                    ew[ez] = eB
                }
            }
        }
        return ew
    }

    function bW(eG, eE, eF) {
        var ez = null;
        eG.iter(eE.line, eF.line + 1, function(eH) {
            if (eH.markedSpans) {
                for (var eI = 0; eI < eH.markedSpans.length; ++eI) {
                    var eJ = eH.markedSpans[eI].marker;
                    if (eJ.readOnly && (!ez || cl(ez, eJ) == -1)) {
                        (ez || (ez = [])).push(eJ)
                    }
                }
            }
        });
        if (!ez) {
            return null
        }
        var eA = [{
            from: eE,
            to: eF
        }];
        for (var eB = 0; eB < ez.length; ++eB) {
            var eC = ez[eB],
                ex = eC.find();
            for (var ey = 0; ey < eA.length; ++ey) {
                var ew = eA[ey];
                if (dK(ew.to, ex.from) || dK(ex.to, ew.from)) {
                    continue
                }
                var eD = [ey, 1];
                if (dK(ew.from, ex.from) || !eC.inclusiveLeft && d8(ew.from, ex.from)) {
                    eD.push({
                        from: ew.from,
                        to: ex.from
                    })
                }
                if (dK(ex.to, ew.to) || !eC.inclusiveRight && d8(ew.to, ex.to)) {
                    eD.push({
                        from: ex.to,
                        to: ew.to
                    })
                }
                eA.splice.apply(eA, eD);
                ey += eD.length - 1
            }
        }
        return eA
    }

    function r(ew) {
        return ew.inclusiveLeft ? -1 : 0
    }

    function bj(ew) {
        return ew.inclusiveRight ? 1 : 0
    }

    function cF(ez, ex) {
        var eB = ez.lines.length - ex.lines.length;
        if (eB != 0) {
            return eB
        }
        var ey = ez.find(),
            eC = ex.find();
        var ew = bz(ey.from, eC.from) || r(ez) - r(ex);
        if (ew) {
            return -ew
        }
        var eA = bz(ey.to, eC.to) || bj(ez) - bj(ex);
        if (eA) {
            return eA
        }
        return ex.id - ez.id
    }

    function aC(ex, eB) {
        var ew = aD && ex.markedSpans,
            eA;
        if (ew) {
            for (var ez, ey = 0; ey < ew.length; ++ey) {
                ez = ew[ey];
                if (ez.marker.collapsed && (eB ? ez.from : ez.to) == null && (!eA || cF(eA, ez.marker) < 0)) {
                    eA = ez.marker
                }
            }
        }
        return eA
    }

    function dn(ew) {
        return aC(ew, true)
    }

    function c5(ew) {
        return aC(ew, false)
    }

    function v(eE, ey, eC, eD, eA) {
        var eH = dJ(eE, ey);
        var ew = aD && eH.markedSpans;
        if (ew) {
            for (var ez = 0; ez < ew.length; ++ez) {
                var ex = ew[ez];
                if (!ex.marker.collapsed) {
                    continue
                }
                var eG = ex.marker.find(true);
                var eF = bz(eG.from, eC) || r(ex.marker) - r(eA);
                var eB = bz(eG.to, eD) || bj(ex.marker) - bj(eA);
                if (eF >= 0 && eB <= 0 || eF <= 0 && eB >= 0) {
                    continue
                }
                if (eF <= 0 && (bz(eG.to, eC) || bj(ex.marker) - r(eA)) > 0 || eF >= 0 && (bz(eG.from, eD) || r(ex.marker) - bj(eA)) < 0) {
                    return true
                }
            }
        }
    }

    function u(ey, ex) {
        var ew;
        while (ew = dn(ex)) {
            ex = dJ(ey, ew.find().from.line)
        }
        return ex
    }

    function dZ(eA, ex) {
        var ew = aD && ex.markedSpans;
        if (ew) {
            for (var ez, ey = 0; ey < ew.length; ++ey) {
                ez = ew[ey];
                if (!ez.marker.collapsed) {
                    continue
                }
                if (ez.from == null) {
                    return true
                }
                if (ez.marker.replacedWith) {
                    continue
                }
                if (ez.from == 0 && ez.marker.inclusiveLeft && J(eA, ex, ez)) {
                    return true
                }
            }
        }
    }

    function J(eC, ex, ez) {
        if (ez.to == null) {
            var ew = ez.marker.find().to,
                eA = dJ(eC, ew.line);
            return J(eC, eA, dE(eA.markedSpans, ez.marker))
        }
        if (ez.marker.inclusiveRight && ez.to == ex.text.length) {
            return true
        }
        for (var eB, ey = 0; ey < ex.markedSpans.length; ++ey) {
            eB = ex.markedSpans[ey];
            if (eB.marker.collapsed && !eB.marker.replacedWith && eB.from == ez.to && (eB.to == null || eB.to != ez.from) && (eB.marker.inclusiveLeft || ez.marker.inclusiveRight) && J(eC, ex, eB)) {
                return true
            }
        }
    }

    function ep(ew) {
        var ey = ew.markedSpans;
        if (!ey) {
            return
        }
        for (var ex = 0; ex < ey.length; ++ex) {
            ey[ex].marker.detachLine(ew)
        }
        ew.markedSpans = null
    }

    function ca(ew, ey) {
        if (!ey) {
            return
        }
        for (var ex = 0; ex < ey.length; ++ex) {
            ey[ex].marker.attachLine(ew)
        }
        ew.markedSpans = ey
    }
    var cx = B.LineWidget = function(ew, ez, ex) {
        if (ex) {
            for (var ey in ex) {
                if (ex.hasOwnProperty(ey)) {
                    this[ey] = ex[ey]
                }
            }
        }
        this.cm = ew;
        this.node = ez
    };
    a0(cx);

    function E(ew) {
        return function() {
            var ey = !this.cm.curOp;
            if (ey) {
                bY(this.cm)
            }
            try {
                var ex = ew.apply(this, arguments)
            } finally {
                if (ey) {
                    W(this.cm)
                }
            }
            return ex
        }
    }
    cx.prototype.clear = E(function() {
        var ex = this.line.widgets,
            ez = bc(this.line);
        if (ez == null || !ex) {
            return
        }
        for (var ey = 0; ey < ex.length; ++ey) {
            if (ex[ey] == this) {
                ex.splice(ey--, 1)
            }
        }
        if (!ex.length) {
            this.line.widgets = null
        }
        var ew = bb(this.cm, this.line) < this.cm.doc.scrollTop;
        eo(this.line, Math.max(0, this.line.height - b6(this)));
        if (ew) {
            b0(this.cm, 0, -this.height)
        }
        Q(this.cm, ez, ez + 1)
    });
    cx.prototype.changed = E(function() {
        var ew = this.height;
        this.height = null;
        var ex = b6(this) - ew;
        if (!ex) {
            return
        }
        eo(this.line, this.line.height + ex);
        var ey = bc(this.line);
        Q(this.cm, ey, ey + 1)
    });

    function b6(ew) {
        if (ew.height != null) {
            return ew.height
        }
        if (!ew.node.parentNode || ew.node.parentNode.nodeType != 1) {
            bf(ew.cm.display.measure, ej("div", [ew.node], null, "position: relative"))
        }
        return ew.height = ew.node.offsetHeight
    }

    function a6(ew, eA, ey, ex) {
        var ez = new cx(ew, ey, ex);
        if (ez.noHScroll) {
            ew.display.alignWidgets = true
        }
        c9(ew, eA, function(eC) {
            var eD = eC.widgets || (eC.widgets = []);
            if (ez.insertAt == null) {
                eD.push(ez)
            } else {
                eD.splice(Math.min(eD.length - 1, Math.max(0, ez.insertAt)), 0, ez)
            }
            ez.line = eC;
            if (!dZ(ew.doc, eC) || ez.showIfHidden) {
                var eB = bb(ew, eC) < ew.doc.scrollTop;
                eo(eC, eC.height + b6(ez));
                if (eB) {
                    b0(ew, 0, ez.height)
                }
            }
            return true
        });
        return ez
    }
    var en = B.Line = function(ey, ex, ew) {
        this.text = ey;
        ca(this, ex);
        this.height = ew ? ew(this) : 1
    };
    a0(en);
    en.prototype.lineNo = function() {
        return bc(this)
    };

    function c1(ex, eA, ey, ew) {
        ex.text = eA;
        if (ex.stateAfter) {
            ex.stateAfter = null
        }
        if (ex.styles) {
            ex.styles = null
        }
        if (ex.order != null) {
            ex.order = null
        }
        ep(ex);
        ca(ex, ey);
        var ez = ew ? ew(ex) : 1;
        if (ez != ex.height) {
            eo(ex, ez)
        }
    }

    function a1(ew) {
        ew.parent = null;
        ep(ew)
    }

    function s(eF, eH, eA, ex, eB, ez) {
        var ey = eA.flattenSpans;
        if (ey == null) {
            ey = eF.options.flattenSpans
        }
        var eD = 0,
            eC = null;
        var eG = new ds(eH, eF.options.tabSize),
            ew;
        if (eH == "" && eA.blankLine) {
            eA.blankLine(ex)
        }
        while (!eG.eol()) {
            if (eG.pos > eF.options.maxHighlightLength) {
                ey = false;
                if (ez) {
                    cu(eF, eH, ex, eG.pos)
                }
                eG.pos = eH.length;
                ew = null
            } else {
                ew = eA.token(eG, ex)
            }
            if (eF.options.addModeClass) {
                var eI = B.innerMode(eA, ex).mode.name;
                if (eI) {
                    ew = "m-" + (ew ? eI + " " + ew : eI)
                }
            }
            if (!ey || eC != ew) {
                if (eD < eG.start) {
                    eB(eG.start, eC)
                }
                eD = eG.start;
                eC = ew
            }
            eG.start = eG.pos
        }
        while (eD < eG.pos) {
            var eE = Math.min(eG.pos, eD + 50000);
            eB(eE, eC);
            eD = eE
        }
    }

    function d4(eC, eE, ew, ez) {
        var eD = [eC.state.modeGen];
        s(eC, eE.text, eC.doc.mode, ew, function(eF, eG) {
            eD.push(eF, eG)
        }, ez);
        for (var ex = 0; ex < eC.state.overlays.length; ++ex) {
            var eA = eC.state.overlays[ex],
                eB = 1,
                ey = 0;
            s(eC, eE.text, eA.mode, true, function(eF, eH) {
                var eJ = eB;
                while (ey < eF) {
                    var eG = eD[eB];
                    if (eG > eF) {
                        eD.splice(eB, 1, eF, eD[eB + 1], eG)
                    }
                    eB += 2;
                    ey = Math.min(eF, eG)
                }
                if (!eH) {
                    return
                }
                if (eA.opaque) {
                    eD.splice(eJ, eB - eJ, eF, eH);
                    eB = eJ + 2
                } else {
                    for (; eJ < eB; eJ += 2) {
                        var eI = eD[eJ + 1];
                        eD[eJ + 1] = eI ? eI + " " + eH : eH
                    }
                }
            })
        }
        return eD
    }

    function cd(ew, ex) {
        if (!ex.styles || ex.styles[0] != ew.state.modeGen) {
            ex.styles = d4(ew, ex, ex.stateAfter = cw(ew, bc(ex)))
        }
        return ex.styles
    }

    function cu(ew, eB, ey, ex) {
        var eA = ew.doc.mode;
        var ez = new ds(eB, ew.options.tabSize);
        ez.start = ez.pos = ex || 0;
        if (eB == "" && eA.blankLine) {
            eA.blankLine(ey)
        }
        while (!ez.eol() && ez.pos <= ew.options.maxHighlightLength) {
            eA.token(ez, ey);
            ez.start = ez.pos
        }
    }
    var cI = {},
        bn = {};

    function du(ez, ey) {
        if (!ez) {
            return null
        }
        for (;;) {
            var ex = ez.match(/(?:^|\s)line-(background-)?(\S+)/);
            if (!ex) {
                break
            }
            ez = ez.slice(0, ex.index) + ez.slice(ex.index + ex[0].length);
            var eA = ex[1] ? "bgClass" : "textClass";
            if (ey[eA] == null) {
                ey[eA] = ex[2]
            } else {
                if (!(new RegExp("(?:^|s)" + ex[2] + "(?:$|s)")).test(ey[eA])) {
                    ey[eA] += " " + ex[2]
                }
            }
        }
        var ew = ey.cm.options.addModeClass ? bn : cI;
        return ew[ez] || (ew[ez] = "cm-" + ez.replace(/ +/g, " cm-"))
    }

    function dq(eF, eJ, ew, eI) {
        var eG, eK = eJ,
            eB = true;
        while (eG = dn(eK)) {
            eK = dJ(eF.doc, eG.find().from.line)
        }
        var eC = {
            pre: ej("pre"),
            col: 0,
            pos: 0,
            measure: null,
            measuredSomething: false,
            cm: eF,
            copyWidgets: eI
        };
        do {
            if (eK.text) {
                eB = false
            }
            eC.measure = eK == eJ && ew;
            eC.pos = 0;
            eC.addToken = eC.measure ? e : p;
            if ((cf || b8) && eF.getOption("lineWrapping")) {
                eC.addToken = d6(eC.addToken)
            }
            var eA = aU(eK, eC, cd(eF, eK));
            if (ew && eK == eJ && !eC.measuredSomething) {
                ew[0] = eC.pre.appendChild(aS(eF.display.measure));
                eC.measuredSomething = true
            }
            if (eA) {
                eK = dJ(eF.doc, eA.to.line)
            }
        } while (eA);
        if (ew && !eC.measuredSomething && !ew[0]) {
            ew[0] = eC.pre.appendChild(eB ? ej("span", "\u00a0") : aS(eF.display.measure))
        }
        if (!eC.pre.firstChild && !dZ(eF.doc, eJ)) {
            eC.pre.appendChild(document.createTextNode("\u00a0"))
        }
        var ex;
        if (ew && cA && (ex = a(eK))) {
            var ez = ex.length - 1;
            if (ex[ez].from == ex[ez].to) {
                --ez
            }
            var eH = ex[ez],
                ey = ex[ez - 1];
            if (eH.from + 1 == eH.to && ey && eH.level < ey.level) {
                var eE = ew[eC.pos - 1];
                if (eE) {
                    eE.parentNode.insertBefore(eE.measureRight = aS(eF.display.measure), eE.nextSibling)
                }
            }
        }
        var eD = eC.textClass ? eC.textClass + " " + (eJ.textClass || "") : eJ.textClass;
        if (eD) {
            eC.pre.className = eD
        }
        ah(eF, "renderLine", eF, eJ, eC.pre);
        return eC
    }

    function dH(ex) {
        var ew = ej("span", "\u2022", "cm-invalidchar");
        ew.title = "\\u" + ex.charCodeAt(0).toString(16);
        return ew
    }

    function p(eA, eJ, ew, ez, eK, eI) {
        if (!eJ) {
            return
        }
        var eE = eA.cm.options.specialChars;
        if (!eE.test(eJ)) {
            eA.col += eJ.length;
            var eD = document.createTextNode(eJ)
        } else {
            var eD = document.createDocumentFragment(),
                eG = 0;
            while (true) {
                eE.lastIndex = eG;
                var ex = eE.exec(eJ);
                var eC = ex ? ex.index - eG : eJ.length - eG;
                if (eC) {
                    eD.appendChild(document.createTextNode(eJ.slice(eG, eG + eC)));
                    eA.col += eC
                }
                if (!ex) {
                    break
                }
                eG += eC + 1;
                if (ex[0] == "\t") {
                    var eB = eA.cm.options.tabSize,
                        eF = eB - eA.col % eB;
                    eD.appendChild(ej("span", bJ(eF), "cm-tab"));
                    eA.col += eF
                } else {
                    var ey = eA.cm.options.specialCharPlaceholder(ex[0]);
                    eD.appendChild(ey);
                    eA.col += 1
                }
            }
        }
        if (ew || ez || eK || eA.measure) {
            var eH = ew || "";
            if (ez) {
                eH += ez
            }
            if (eK) {
                eH += eK
            }
            var ey = ej("span", [eD], eH);
            if (eI) {
                ey.title = eI
            }
            return eA.pre.appendChild(ey)
        }
        eA.pre.appendChild(eD)
    }

    function e(eD, eG, ex, eA, eH) {
        var eC = eD.cm.options.lineWrapping;
        for (var eB = 0; eB < eG.length; ++eB) {
            var ey = eB == 0,
                eF = eB + 1;
            while (eF < eG.length && dV(eG.charAt(eF))) {
                ++eF
            }
            var ew = eG.slice(eB, eF);
            eB = eF - 1;
            if (eB && eC && bu(eG, eB)) {
                eD.pre.appendChild(ej("wbr"))
            }
            var ez = eD.measure[eD.pos];
            var eE = eD.measure[eD.pos] = p(eD, ew, ex, ey && eA, eB == eG.length - 1 && eH);
            if (ez) {
                eE.leftSide = ez.leftSide || ez
            }
            if (cf && eC && ew == " " && eB && !/\s/.test(eG.charAt(eB - 1)) && eB < eG.length - 1 && !/\s/.test(eG.charAt(eB + 1))) {
                eE.style.whiteSpace = "normal"
            }
            eD.pos += ew.length
        }
        if (eG.length) {
            eD.measuredSomething = true
        }
    }

    function d6(ew) {
        function ex(ey) {
            var ez = " ";
            for (var eA = 0; eA < ey.length - 2; ++eA) {
                ez += eA % 2 ? " " : "\u00a0"
            }
            ez += " ";
            return ez
        }
        return function(ez, eD, eA, ey, eC, eB) {
            return ew(ez, eD.replace(/ {3,}/g, ex), eA, ey, eC, eB)
        }
    }

    function M(ex, eA, ew, ez) {
        var eB = !ez && ew.replacedWith;
        if (eB) {
            if (ex.copyWidgets) {
                eB = eB.cloneNode(true)
            }
            ex.pre.appendChild(eB);
            if (ex.measure) {
                if (eA) {
                    ex.measure[ex.pos] = eB
                } else {
                    var ey = aS(ex.cm.display.measure);
                    if (ew.type == "bookmark" && !ew.insertLeft) {
                        ex.measure[ex.pos] = ex.pre.appendChild(ey)
                    } else {
                        if (ex.measure[ex.pos]) {
                            return
                        } else {
                            ex.measure[ex.pos] = ex.pre.insertBefore(ey, eB)
                        }
                    }
                }
                ex.measuredSomething = true
            }
        }
        ex.pos += eA
    }

    function aU(eF, eL, eE) {
        var eB = eF.markedSpans,
            eD = eF.text,
            eJ = 0;
        if (!eB) {
            for (var eO = 1; eO < eE.length; eO += 2) {
                eL.addToken(eL, eD.slice(eJ, eJ = eE[eO]), du(eE[eO + 1], eL))
            }
            return
        }
        var eP = eD.length,
            eA = 0,
            eO = 1,
            eH = "",
            eQ;
        var eS = 0,
            ew, eR, eI, eT, ey;
        for (;;) {
            if (eS == eA) {
                ew = eR = eI = eT = "";
                ey = null;
                eS = Infinity;
                var eC = [];
                for (var eM = 0; eM < eB.length; ++eM) {
                    var eN = eB[eM],
                        eK = eN.marker;
                    if (eN.from <= eA && (eN.to == null || eN.to > eA)) {
                        if (eN.to != null && eS > eN.to) {
                            eS = eN.to;
                            eR = ""
                        }
                        if (eK.className) {
                            ew += " " + eK.className
                        }
                        if (eK.startStyle && eN.from == eA) {
                            eI += " " + eK.startStyle
                        }
                        if (eK.endStyle && eN.to == eS) {
                            eR += " " + eK.endStyle
                        }
                        if (eK.title && !eT) {
                            eT = eK.title
                        }
                        if (eK.collapsed && (!ey || cF(ey.marker, eK) < 0)) {
                            ey = eN
                        }
                    } else {
                        if (eN.from > eA && eS > eN.from) {
                            eS = eN.from
                        }
                    }
                    if (eK.type == "bookmark" && eN.from == eA && eK.replacedWith) {
                        eC.push(eK)
                    }
                }
                if (ey && (ey.from || 0) == eA) {
                    M(eL, (ey.to == null ? eP : ey.to) - eA, ey.marker, ey.from == null);
                    if (ey.to == null) {
                        return ey.marker.find()
                    }
                }
                if (!ey && eC.length) {
                    for (var eM = 0; eM < eC.length; ++eM) {
                        M(eL, 0, eC[eM])
                    }
                }
            }
            if (eA >= eP) {
                break
            }
            var eG = Math.min(eP, eS);
            while (true) {
                if (eH) {
                    var ex = eA + eH.length;
                    if (!ey) {
                        var ez = ex > eG ? eH.slice(0, eG - eA) : eH;
                        eL.addToken(eL, ez, eQ ? eQ + ew : ew, eI, eA + ez.length == eS ? eR : "", eT)
                    }
                    if (ex >= eG) {
                        eH = eH.slice(eG - eA);
                        eA = eG;
                        break
                    }
                    eA = ex;
                    eI = ""
                }
                eH = eD.slice(eJ, eJ = eE[eO++]);
                eQ = du(eE[eO++], eL)
            }
        }
    }

    function d2(eN, eE, eA, eI, eC) {
        function ez(eO) {
            return eA ? eA[eO] : null
        }

        function eD(eO, eQ, eP) {
            c1(eO, eQ, eP, eC);
            O(eO, "change", eO, eE)
        }
        var eJ = eE.from,
            ex = eE.to,
            eG = eE.text;
        var eF = dJ(eN, eJ.line),
            ew = dJ(eN, ex.line);
        var ey = d7(eG),
            eL = ez(eG.length - 1),
            eH = ex.line - eJ.line;
        if (eJ.ch == 0 && ex.ch == 0 && ey == "" && (!eN.cm || eN.cm.options.wholeLineUpdateBefore)) {
            for (var eK = 0, eM = eG.length - 1, eB = []; eK < eM; ++eK) {
                eB.push(new en(eG[eK], ez(eK), eC))
            }
            eD(ew, ew.text, eL);
            if (eH) {
                eN.remove(eJ.line, eH)
            }
            if (eB.length) {
                eN.insert(eJ.line, eB)
            }
        } else {
            if (eF == ew) {
                if (eG.length == 1) {
                    eD(eF, eF.text.slice(0, eJ.ch) + ey + eF.text.slice(ex.ch), eL)
                } else {
                    for (var eB = [], eK = 1, eM = eG.length - 1; eK < eM; ++eK) {
                        eB.push(new en(eG[eK], ez(eK), eC))
                    }
                    eB.push(new en(ey + eF.text.slice(ex.ch), eL, eC));
                    eD(eF, eF.text.slice(0, eJ.ch) + eG[0], ez(0));
                    eN.insert(eJ.line + 1, eB)
                }
            } else {
                if (eG.length == 1) {
                    eD(eF, eF.text.slice(0, eJ.ch) + eG[0] + ew.text.slice(ex.ch), ez(0));
                    eN.remove(eJ.line + 1, eH)
                } else {
                    eD(eF, eF.text.slice(0, eJ.ch) + eG[0], ez(0));
                    eD(ew, ey + ew.text.slice(ex.ch), eL);
                    for (var eK = 1, eM = eG.length - 1, eB = []; eK < eM; ++eK) {
                        eB.push(new en(eG[eK], ez(eK), eC))
                    }
                    if (eH > 1) {
                        eN.remove(eJ.line + 1, eH - 1)
                    }
                    eN.insert(eJ.line + 1, eB)
                }
            }
        }
        O(eN, "change", eN, eE);
        bh(eN, eI.anchor, eI.head, null, true)
    }

    function dx(ex) {
        this.lines = ex;
        this.parent = null;
        for (var ey = 0, ez = ex.length, ew = 0; ey < ez; ++ey) {
            ex[ey].parent = this;
            ew += ex[ey].height
        }
        this.height = ew
    }
    dx.prototype = {
        chunkSize: function() {
            return this.lines.length
        },
        removeInner: function(ew, eA) {
            for (var ey = ew, ez = ew + eA; ey < ez; ++ey) {
                var ex = this.lines[ey];
                this.height -= ex.height;
                a1(ex);
                O(ex, "delete")
            }
            this.lines.splice(ew, eA)
        },
        collapse: function(ew) {
            ew.splice.apply(ew, [ew.length, 0].concat(this.lines))
        },
        insertInner: function(ex, ey, ew) {
            this.height += ew;
            this.lines = this.lines.slice(0, ex).concat(ey).concat(this.lines.slice(ex));
            for (var ez = 0, eA = ey.length; ez < eA; ++ez) {
                ey[ez].parent = this
            }
        },
        iterN: function(ew, ez, ey) {
            for (var ex = ew + ez; ew < ex; ++ew) {
                if (ey(this.lines[ew])) {
                    return true
                }
            }
        }
    };

    function d0(ez) {
        this.children = ez;
        var ey = 0,
            ew = 0;
        for (var ex = 0, eB = ez.length; ex < eB; ++ex) {
            var eA = ez[ex];
            ey += eA.chunkSize();
            ew += eA.height;
            eA.parent = this
        }
        this.size = ey;
        this.height = ew;
        this.parent = null
    }
    d0.prototype = {
        chunkSize: function() {
            return this.size
        },
        removeInner: function(ew, eD) {
            this.size -= eD;
            for (var ey = 0; ey < this.children.length; ++ey) {
                var eC = this.children[ey],
                    eA = eC.chunkSize();
                if (ew < eA) {
                    var ez = Math.min(eD, eA - ew),
                        eB = eC.height;
                    eC.removeInner(ew, ez);
                    this.height -= eB - eC.height;
                    if (eA == ez) {
                        this.children.splice(ey--, 1);
                        eC.parent = null
                    }
                    if ((eD -= ez) == 0) {
                        break
                    }
                    ew = 0
                } else {
                    ew -= eA
                }
            }
            if (this.size - eD < 25) {
                var ex = [];
                this.collapse(ex);
                this.children = [new dx(ex)];
                this.children[0].parent = this
            }
        },
        collapse: function(ew) {
            for (var ex = 0, ey = this.children.length; ex < ey; ++ex) {
                this.children[ex].collapse(ew)
            }
        },
        insertInner: function(ex, eE, eD) {
            this.size += eE.length;
            this.height += eD;
            for (var ey = 0, eA = this.children.length; ey < eA; ++ey) {
                var ew = this.children[ey],
                    eB = ew.chunkSize();
                if (ex <= eB) {
                    ew.insertInner(ex, eE, eD);
                    if (ew.lines && ew.lines.length > 50) {
                        while (ew.lines.length > 50) {
                            var ez = ew.lines.splice(ew.lines.length - 25, 25);
                            var eC = new dx(ez);
                            ew.height -= eC.height;
                            this.children.splice(ey + 1, 0, eC);
                            eC.parent = this
                        }
                        this.maybeSpill()
                    }
                    break
                }
                ex -= eB
            }
        },
        maybeSpill: function() {
            if (this.children.length <= 10) {
                return
            }
            var ez = this;
            do {
                var ex = ez.children.splice(ez.children.length - 5, 5);
                var ey = new d0(ex);
                if (!ez.parent) {
                    var eA = new d0(ez.children);
                    eA.parent = ez;
                    ez.children = [eA, ey];
                    ez = eA
                } else {
                    ez.size -= ey.size;
                    ez.height -= ey.height;
                    var ew = cl(ez.parent.children, ez);
                    ez.parent.children.splice(ew + 1, 0, ey)
                }
                ey.parent = ez.parent
            } while (ez.children.length > 10);
            ez.parent.maybeSpill()
        },
        iterN: function(ew, eD, eC) {
            for (var ex = 0, eA = this.children.length; ex < eA; ++ex) {
                var eB = this.children[ex],
                    ez = eB.chunkSize();
                if (ew < ez) {
                    var ey = Math.min(eD, ez - ew);
                    if (eB.iterN(ew, ey, eC)) {
                        return true
                    }
                    if ((eD -= ey) == 0) {
                        break
                    }
                    ew = 0
                } else {
                    ew -= ez
                }
            }
        }
    };
    var bK = 0;
    var aa = B.Doc = function(ey, ex, ew) {
        if (!(this instanceof aa)) {
            return new aa(ey, ex, ew)
        }
        if (ew == null) {
            ew = 0
        }
        d0.call(this, [new dx([new en("", null)])]);
        this.first = ew;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.history = ac();
        this.cleanGeneration = 1;
        this.frontier = ew;
        var ez = K(ew, 0);
        this.sel = {
            from: ez,
            to: ez,
            head: ez,
            anchor: ez,
            shift: false,
            extend: false,
            goalColumn: null
        };
        this.id = ++bK;
        this.modeOption = ex;
        if (typeof ey == "string") {
            ey = ay(ey)
        }
        d2(this, {
            from: ez,
            to: ez,
            text: ey
        }, null, {
            head: ez,
            anchor: ez
        })
    };
    aa.prototype = bD(d0.prototype, {
        constructor: aa,
        iter: function(ey, ex, ew) {
            if (ew) {
                this.iterN(ey - this.first, ex - ey, ew)
            } else {
                this.iterN(this.first, this.first + this.size, ey)
            }
        },
        insert: function(ex, ey) {
            var ew = 0;
            for (var ez = 0, eA = ey.length; ez < eA; ++ez) {
                ew += ey[ez].height
            }
            this.insertInner(ex - this.first, ey, ew)
        },
        remove: function(ew, ex) {
            this.removeInner(ew - this.first, ex)
        },
        getValue: function(ex) {
            var ew = aA(this, this.first, this.first + this.size);
            if (ex === false) {
                return ew
            }
            return ew.join(ex || "\n")
        },
        setValue: function(ex) {
            var ey = K(this.first, 0),
                ew = this.first + this.size - 1;
            aL(this, {
                from: ey,
                to: K(ew, dJ(this, ew).text.length),
                text: ay(ex),
                origin: "setValue"
            }, {
                head: ey,
                anchor: ey
            }, true)
        },
        replaceRange: function(ex, ez, ey, ew) {
            ez = d9(this, ez);
            ey = ey ? d9(this, ey) : ez;
            az(this, ex, ez, ey, ew)
        },
        getRange: function(ez, ey, ex) {
            var ew = el(this, d9(this, ez), d9(this, ey));
            if (ex === false) {
                return ew
            }
            return ew.join(ex || "\n")
        },
        getLine: function(ex) {
            var ew = this.getLineHandle(ex);
            return ew && ew.text
        },
        setLine: function(ew, ex) {
            if (bt(this, ew)) {
                az(this, ex, K(ew, 0), d9(this, K(ew)))
            }
        },
        removeLine: function(ew) {
            if (ew) {
                az(this, "", d9(this, K(ew - 1)), d9(this, K(ew)))
            } else {
                az(this, "", K(0, 0), d9(this, K(1, 0)))
            }
        },
        getLineHandle: function(ew) {
            if (bt(this, ew)) {
                return dJ(this, ew)
            }
        },
        getLineNumber: function(ew) {
            return bc(ew)
        },
        getLineHandleVisualStart: function(ew) {
            if (typeof ew == "number") {
                ew = dJ(this, ew)
            }
            return u(this, ew)
        },
        lineCount: function() {
            return this.size
        },
        firstLine: function() {
            return this.first
        },
        lastLine: function() {
            return this.first + this.size - 1
        },
        clipPos: function(ew) {
            return d9(this, ew)
        },
        getCursor: function(ey) {
            var ew = this.sel,
                ex;
            if (ey == null || ey == "head") {
                ex = ew.head
            } else {
                if (ey == "anchor") {
                    ex = ew.anchor
                } else {
                    if (ey == "end" || ey === false) {
                        ex = ew.to
                    } else {
                        ex = ew.from
                    }
                }
            }
            return bC(ex)
        },
        somethingSelected: function() {
            return !d8(this.sel.head, this.sel.anchor)
        },
        setCursor: d3(function(ew, ex, ez) {
            var ey = d9(this, typeof ew == "number" ? K(ew, ex || 0) : ew);
            if (ez) {
                eg(this, ey)
            } else {
                bh(this, ey, ey)
            }
        }),
        setSelection: d3(function(ex, ey, ew) {
            bh(this, d9(this, ex), d9(this, ey || ex), ew)
        }),
        extendSelection: d3(function(ey, ex, ew) {
            eg(this, d9(this, ey), ex && d9(this, ex), ew)
        }),
        getSelection: function(ew) {
            return this.getRange(this.sel.from, this.sel.to, ew)
        },
        replaceSelection: function(ex, ey, ew) {
            aL(this, {
                from: this.sel.from,
                to: this.sel.to,
                text: ay(ex),
                origin: ew
            }, ey || "around")
        },
        undo: d3(function() {
            bs(this, "undo")
        }),
        redo: d3(function() {
            bs(this, "redo")
        }),
        setExtending: function(ew) {
            this.sel.extend = ew
        },
        historySize: function() {
            var ew = this.history;
            return {
                undo: ew.done.length,
                redo: ew.undone.length
            }
        },
        clearHistory: function() {
            this.history = ac(this.history.maxGeneration)
        },
        markClean: function() {
            this.cleanGeneration = this.changeGeneration(true)
        },
        changeGeneration: function(ew) {
            if (ew) {
                this.history.lastOp = this.history.lastOrigin = null
            }
            return this.history.generation
        },
        isClean: function(ew) {
            return this.history.generation == (ew || this.cleanGeneration)
        },
        getHistory: function() {
            return {
                done: bd(this.history.done),
                undone: bd(this.history.undone)
            }
        },
        setHistory: function(ex) {
            var ew = this.history = ac(this.history.maxGeneration);
            ew.done = ex.done.slice(0);
            ew.undone = ex.undone.slice(0)
        },
        markText: function(ey, ex, ew) {
            return dh(this, d9(this, ey), d9(this, ex), ew, "range")
        },
        setBookmark: function(ey, ew) {
            var ex = {
                replacedWith: ew && (ew.nodeType == null ? ew.widget : ew),
                insertLeft: ew && ew.insertLeft,
                clearWhenEmpty: false
            };
            ey = d9(this, ey);
            return dh(this, ey, ey, ex, "bookmark")
        },
        findMarksAt: function(eA) {
            eA = d9(this, eA);
            var ez = [],
                ex = dJ(this, eA.line).markedSpans;
            if (ex) {
                for (var ew = 0; ew < ex.length; ++ew) {
                    var ey = ex[ew];
                    if ((ey.from == null || ey.from <= eA.ch) && (ey.to == null || ey.to >= eA.ch)) {
                        ez.push(ey.marker.parent || ey.marker)
                    }
                }
            }
            return ez
        },
        getAllMarks: function() {
            var ew = [];
            this.iter(function(ey) {
                var ex = ey.markedSpans;
                if (ex) {
                    for (var ez = 0; ez < ex.length; ++ez) {
                        if (ex[ez].from != null) {
                            ew.push(ex[ez].marker)
                        }
                    }
                }
            });
            return ew
        },
        posFromIndex: function(ex) {
            var ew, ey = this.first;
            this.iter(function(ez) {
                var eA = ez.text.length + 1;
                if (eA > ex) {
                    ew = ex;
                    return true
                }
                ex -= eA;
                ++ey
            });
            return d9(this, K(ey, ew))
        },
        indexFromPos: function(ex) {
            ex = d9(this, ex);
            var ew = ex.ch;
            if (ex.line < this.first || ex.ch < 0) {
                return 0
            }
            this.iter(this.first, ex.line, function(ey) {
                ew += ey.text.length + 1
            });
            return ew
        },
        copy: function(ew) {
            var ex = new aa(aA(this, this.first, this.first + this.size), this.modeOption, this.first);
            ex.scrollTop = this.scrollTop;
            ex.scrollLeft = this.scrollLeft;
            ex.sel = {
                from: this.sel.from,
                to: this.sel.to,
                head: this.sel.head,
                anchor: this.sel.anchor,
                shift: this.sel.shift,
                extend: false,
                goalColumn: this.sel.goalColumn
            };
            if (ew) {
                ex.history.undoDepth = this.history.undoDepth;
                ex.setHistory(this.getHistory())
            }
            return ex
        },
        linkedDoc: function(ew) {
            if (!ew) {
                ew = {}
            }
            var ez = this.first,
                ey = this.first + this.size;
            if (ew.from != null && ew.from > ez) {
                ez = ew.from
            }
            if (ew.to != null && ew.to < ey) {
                ey = ew.to
            }
            var ex = new aa(aA(this, ez, ey), ew.mode || this.modeOption, ez);
            if (ew.sharedHist) {
                ex.history = this.history
            }(this.linked || (this.linked = [])).push({
                doc: ex,
                sharedHist: ew.sharedHist
            });
            ex.linked = [{
                doc: this,
                isParent: true,
                sharedHist: ew.sharedHist
            }];
            return ex
        },
        unlinkDoc: function(ex) {
            if (ex instanceof B) {
                ex = ex.doc
            }
            if (this.linked) {
                for (var ey = 0; ey < this.linked.length; ++ey) {
                    var ez = this.linked[ey];
                    if (ez.doc != ex) {
                        continue
                    }
                    this.linked.splice(ey, 1);
                    ex.unlinkDoc(this);
                    break
                }
            }
            if (ex.history == this.history) {
                var ew = [ex.id];
                cN(ex, function(eA) {
                    ew.push(eA.id)
                }, true);
                ex.history = ac();
                ex.history.done = bd(this.history.done, ew);
                ex.history.undone = bd(this.history.undone, ew)
            }
        },
        iterLinkedDocs: function(ew) {
            cN(this, ew)
        },
        getMode: function() {
            return this.mode
        },
        getEditor: function() {
            return this.cm
        }
    });
    aa.prototype.eachLine = aa.prototype.iter;
    var d = "iter insert remove copy getEditor".split(" ");
    for (var a9 in aa.prototype) {
        if (aa.prototype.hasOwnProperty(a9) && cl(d, a9) < 0) {
            B.prototype[a9] = (function(ew) {
                return function() {
                    return ew.apply(this.doc, arguments)
                }
            })(aa.prototype[a9])
        }
    }
    a0(aa);

    function cN(ez, ey, ex) {
        function ew(eF, eD, eB) {
            if (eF.linked) {
                for (var eC = 0; eC < eF.linked.length; ++eC) {
                    var eA = eF.linked[eC];
                    if (eA.doc == eD) {
                        continue
                    }
                    var eE = eB && eA.sharedHist;
                    if (ex && !eE) {
                        continue
                    }
                    ey(eA.doc, eE);
                    ew(eA.doc, eF, eE)
                }
            }
        }
        ew(ez, null, true)
    }

    function cQ(ew, ex) {
        if (ex.cm) {
            throw new Error("This document is already in use.")
        }
        ew.doc = ex;
        ex.cm = ew;
        L(ew);
        aW(ew);
        if (!ew.options.lineWrapping) {
            em(ew)
        }
        ew.options.mode = ex.modeOption;
        Q(ew)
    }

    function dJ(ew, eA) {
        eA -= ew.first;
        while (!ew.lines) {
            for (var ex = 0;; ++ex) {
                var ez = ew.children[ex],
                    ey = ez.chunkSize();
                if (eA < ey) {
                    ew = ez;
                    break
                }
                eA -= ey
            }
        }
        return ew.lines[eA]
    }

    function el(ey, eA, ew) {
        var ex = [],
            ez = eA.line;
        ey.iter(eA.line, ew.line + 1, function(eB) {
            var eC = eB.text;
            if (ez == ew.line) {
                eC = eC.slice(0, ew.ch)
            }
            if (ez == eA.line) {
                eC = eC.slice(eA.ch)
            }
            ex.push(eC);
            ++ez
        });
        return ex
    }

    function aA(ex, ez, ey) {
        var ew = [];
        ex.iter(ez, ey, function(eA) {
            ew.push(eA.text)
        });
        return ew
    }

    function eo(ex, ew) {
        var ey = ew - ex.height;
        for (var ez = ex; ez; ez = ez.parent) {
            ez.height += ey
        }
    }

    function bc(ew) {
        if (ew.parent == null) {
            return null
        }
        var eA = ew.parent,
            ez = cl(eA.lines, ew);
        for (var ex = eA.parent; ex; eA = ex, ex = ex.parent) {
            for (var ey = 0;; ++ey) {
                if (ex.children[ey] == eA) {
                    break
                }
                ez += ex.children[ey].chunkSize()
            }
        }
        return ez + eA.first
    }

    function a5(eC, eA) {
        var ey = eC.first;
        outer: do {
            for (var ez = 0, eB = eC.children.length; ez < eB; ++ez) {
                var ex = eC.children[ez],
                    ew = ex.height;
                if (eA < ew) {
                    eC = ex;
                    continue outer
                }
                eA -= ew;
                ey += ex.chunkSize()
            }
            return ey
        } while (!eC.lines);
        for (var ez = 0, eB = eC.lines.length; ez < eB; ++ez) {
            var eE = eC.lines[ez],
                eD = eE.height;
            if (eA < eD) {
                break
            }
            eA -= eD
        }
        return ey + ez
    }

    function bb(ew, ez) {
        ez = u(ew.doc, ez);
        var eB = 0,
            ey = ez.parent;
        for (var eA = 0; eA < ey.lines.length; ++eA) {
            var ex = ey.lines[eA];
            if (ex == ez) {
                break
            } else {
                eB += ex.height
            }
        }
        for (var eC = ey.parent; eC; ey = eC, eC = ey.parent) {
            for (var eA = 0; eA < eC.children.length; ++eA) {
                var eD = eC.children[eA];
                if (eD == ey) {
                    break
                } else {
                    eB += eD.height
                }
            }
        }
        return eB
    }

    function a(ex) {
        var ew = ex.order;
        if (ew == null) {
            ew = ex.order = aM(ex.text)
        }
        return ew
    }

    function ac(ew) {
        return {
            done: [],
            undone: [],
            undoDepth: Infinity,
            lastTime: 0,
            lastOp: null,
            lastOrigin: null,
            generation: ew || 1,
            maxGeneration: ew || 1
        }
    }

    function bl(ex, eB, eA, ez) {
        var ew = eB["spans_" + ex.id],
            ey = 0;
        ex.iter(Math.max(ex.first, eA), Math.min(ex.first + ex.size, ez), function(eC) {
            if (eC.markedSpans) {
                (ew || (ew = eB["spans_" + ex.id] = {}))[ey] = eC.markedSpans
            }++ey
        })
    }

    function cs(ew, ez) {
        var ey = {
            line: ez.from.line,
            ch: ez.from.ch
        };
        var ex = {
            from: ey,
            to: b5(ez),
            text: el(ew, ez.from, ez.to)
        };
        bl(ew, ex, ez.from.line, ez.to.line + 1);
        cN(ew, function(eA) {
            bl(eA, ex, ez.from.line, ez.to.line + 1)
        }, true);
        return ex
    }

    function di(eB, eD, eA, ew) {
        var ez = eB.history;
        ez.undone.length = 0;
        var ey = +new Date,
            eC = d7(ez.done);
        if (eC && (ez.lastOp == ew || ez.lastOrigin == eD.origin && eD.origin && ((eD.origin.charAt(0) == "+" && eB.cm && ez.lastTime > ey - eB.cm.options.historyEventDelay) || eD.origin.charAt(0) == "*"))) {
            var ex = d7(eC.changes);
            if (d8(eD.from, eD.to) && d8(eD.from, ex.to)) {
                ex.to = b5(eD)
            } else {
                eC.changes.push(cs(eB, eD))
            }
            eC.anchorAfter = eA.anchor;
            eC.headAfter = eA.head
        } else {
            eC = {
                changes: [cs(eB, eD)],
                generation: ez.generation,
                anchorBefore: eB.sel.anchor,
                headBefore: eB.sel.head,
                anchorAfter: eA.anchor,
                headAfter: eA.head
            };
            ez.done.push(eC);
            while (ez.done.length > ez.undoDepth) {
                ez.done.shift()
            }
        }
        ez.generation = ++ez.maxGeneration;
        ez.lastTime = ey;
        ez.lastOp = ew;
        ez.lastOrigin = eD.origin
    }

    function aP(ey) {
        if (!ey) {
            return null
        }
        for (var ex = 0, ew; ex < ey.length; ++ex) {
            if (ey[ex].marker.explicitlyCleared) {
                if (!ew) {
                    ew = ey.slice(0, ex)
                }
            } else {
                if (ew) {
                    ew.push(ey[ex])
                }
            }
        }
        return !ew ? ey : ew.length ? ew : null
    }

    function br(ez, eA) {
        var ey = eA["spans_" + ez.id];
        if (!ey) {
            return null
        }
        for (var ex = 0, ew = []; ex < eA.text.length; ++ex) {
            ew.push(aP(ey[ex]))
        }
        return ew
    }

    function bd(eG, ez) {
        for (var eC = 0, ex = []; eC < eG.length; ++eC) {
            var ey = eG[eC],
                eE = ey.changes,
                eF = [];
            ex.push({
                changes: eF,
                anchorBefore: ey.anchorBefore,
                headBefore: ey.headBefore,
                anchorAfter: ey.anchorAfter,
                headAfter: ey.headAfter
            });
            for (var eB = 0; eB < eE.length; ++eB) {
                var eD = eE[eB],
                    eA;
                eF.push({
                    from: eD.from,
                    to: eD.to,
                    text: eD.text
                });
                if (ez) {
                    for (var ew in eD) {
                        if (eA = ew.match(/^spans_(\d+)$/)) {
                            if (cl(ez, Number(eA[1])) > -1) {
                                d7(eF)[ew] = eD[ew];
                                delete eD[ew]
                            }
                        }
                    }
                }
            }
        }
        return ex
    }

    function dv(ez, ey, ex, ew) {
        if (ex < ez.line) {
            ez.line += ew
        } else {
            if (ey < ez.line) {
                ez.line = ey;
                ez.ch = 0
            }
        }
    }

    function dM(ez, eB, eC, eD) {
        for (var ey = 0; ey < ez.length; ++ey) {
            var ew = ez[ey],
                eA = true;
            for (var ex = 0; ex < ew.changes.length; ++ex) {
                var eE = ew.changes[ex];
                if (!ew.copied) {
                    eE.from = bC(eE.from);
                    eE.to = bC(eE.to)
                }
                if (eC < eE.from.line) {
                    eE.from.line += eD;
                    eE.to.line += eD
                } else {
                    if (eB <= eE.to.line) {
                        eA = false;
                        break
                    }
                }
            }
            if (!ew.copied) {
                ew.anchorBefore = bC(ew.anchorBefore);
                ew.headBefore = bC(ew.headBefore);
                ew.anchorAfter = bC(ew.anchorAfter);
                ew.readAfter = bC(ew.headAfter);
                ew.copied = true
            }
            if (!eA) {
                ez.splice(0, ey + 1);
                ey = 0
            } else {
                dv(ew.anchorBefore);
                dv(ew.headBefore);
                dv(ew.anchorAfter);
                dv(ew.headAfter)
            }
        }
    }

    function cz(ex, eA) {
        var ez = eA.from.line,
            ey = eA.to.line,
            ew = eA.text.length - (ey - ez) - 1;
        dM(ex.done, ez, ey, ew);
        dM(ex.undone, ez, ey, ew)
    }

    function dr() {
        c2(this)
    }

    function Y(ew) {
        if (!ew.stop) {
            ew.stop = dr
        }
        return ew
    }

    function bV(ew) {
        if (ew.preventDefault) {
            ew.preventDefault()
        } else {
            ew.returnValue = false
        }
    }

    function cp(ew) {
        if (ew.stopPropagation) {
            ew.stopPropagation()
        } else {
            ew.cancelBubble = true
        }
    }

    function ba(ew) {
        return ew.defaultPrevented != null ? ew.defaultPrevented : ew.returnValue == false
    }

    function c2(ew) {
        bV(ew);
        cp(ew)
    }
    B.e_stop = c2;
    B.e_preventDefault = bV;
    B.e_stopPropagation = cp;

    function D(ew) {
        return ew.target || ew.srcElement
    }

    function eb(ex) {
        var ew = ex.which;
        if (ew == null) {
            if (ex.button & 1) {
                ew = 1
            } else {
                if (ex.button & 2) {
                    ew = 3
                } else {
                    if (ex.button & 4) {
                        ew = 2
                    }
                }
            }
        }
        if (bq && ex.ctrlKey && ew == 1) {
            ew = 3
        }
        return ew
    }

    function bk(ez, ex, ey) {
        if (ez.addEventListener) {
            ez.addEventListener(ex, ey, false)
        } else {
            if (ez.attachEvent) {
                ez.attachEvent("on" + ex, ey)
            } else {
                var eA = ez._handlers || (ez._handlers = {});
                var ew = eA[ex] || (eA[ex] = []);
                ew.push(ey)
            }
        }
    }

    function cT(eA, ey, ez) {
        if (eA.removeEventListener) {
            eA.removeEventListener(ey, ez, false)
        } else {
            if (eA.detachEvent) {
                eA.detachEvent("on" + ey, ez)
            } else {
                var ew = eA._handlers && eA._handlers[ey];
                if (!ew) {
                    return
                }
                for (var ex = 0; ex < ew.length; ++ex) {
                    if (ew[ex] == ez) {
                        ew.splice(ex, 1);
                        break
                    }
                }
            }
        }
    }

    function ah(eA, ez) {
        var ew = eA._handlers && eA._handlers[ez];
        if (!ew) {
            return
        }
        var ex = Array.prototype.slice.call(arguments, 2);
        for (var ey = 0; ey < ew.length; ++ey) {
            ew[ey].apply(null, ex)
        }
    }
    var aT, bL = 0;

    function O(eB, eA) {
        var ew = eB._handlers && eB._handlers[eA];
        if (!ew) {
            return
        }
        var ey = Array.prototype.slice.call(arguments, 2);
        if (!aT) {
            ++bL;
            aT = [];
            setTimeout(da, 0)
        }

        function ex(eC) {
            return function() {
                eC.apply(null, ey)
            }
        }
        for (var ez = 0; ez < ew.length; ++ez) {
            aT.push(ex(ew[ez]))
        }
    }

    function ar(ew, ey, ex) {
        ah(ew, ex || ey.type, ew, ey);
        return ba(ey) || ey.codemirrorIgnore
    }

    function da() {
        --bL;
        var ew = aT;
        aT = null;
        for (var ex = 0; ex < ew.length; ++ex) {
            ew[ex]()
        }
    }

    function dP(ey, ex) {
        var ew = ey._handlers && ey._handlers[ex];
        return ew && ew.length > 0
    }
    B.on = bk;
    B.off = cT;
    B.signal = ah;

    function a0(ew) {
        ew.prototype.on = function(ex, ey) {
            bk(this, ex, ey)
        };
        ew.prototype.off = function(ex, ey) {
            cT(this, ex, ey)
        }
    }
    var aO = 30;
    var bv = B.Pass = {
        toString: function() {
            return "CodeMirror.Pass"
        }
    };

    function ev() {
        this.id = null
    }
    ev.prototype = {
        set: function(ew, ex) {
            clearTimeout(this.id);
            this.id = setTimeout(ex, ew)
        }
    };

    function bg(ey, ew, eA, eB, ex) {
        if (ew == null) {
            ew = ey.search(/[^\s\u00a0]/);
            if (ew == -1) {
                ew = ey.length
            }
        }
        for (var ez = eB || 0, eC = ex || 0; ez < ew; ++ez) {
            if (ey.charAt(ez) == "\t") {
                eC += eA - (eC % eA)
            } else {
                ++eC
            }
        }
        return eC
    }
    B.countColumn = bg;
    var ax = [""];

    function bJ(ew) {
        while (ax.length <= ew) {
            ax.push(d7(ax) + " ")
        }
        return ax[ew]
    }

    function d7(ew) {
        return ew[ew.length - 1]
    }

    function cC(ex) {
        if (dy) {
            ex.selectionStart = 0;
            ex.selectionEnd = ex.value.length
        } else {
            try {
                ex.select()
            } catch (ew) {}
        }
    }

    function cl(ez, ew) {
        if (ez.indexOf) {
            return ez.indexOf(ew)
        }
        for (var ex = 0, ey = ez.length; ex < ey; ++ex) {
            if (ez[ex] == ew) {
                return ex
            }
        }
        return -1
    }

    function bD(ez, ex) {
        function ew() {}
        ew.prototype = ez;
        var ey = new ew();
        if (ex) {
            am(ex, ey)
        }
        return ey
    }

    function am(ex, ew) {
        if (!ew) {
            ew = {}
        }
        for (var ey in ex) {
            if (ex.hasOwnProperty(ey)) {
                ew[ey] = ex[ey]
            }
        }
        return ew
    }

    function U(ey) {
        for (var ew = [], ex = 0; ex < ey; ++ex) {
            ew.push(undefined)
        }
        return ew
    }

    function bO(ex) {
        var ew = Array.prototype.slice.call(arguments, 1);
        return function() {
            return ex.apply(null, ew)
        }
    }
    var aI = /[\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;

    function bR(ew) {
        return /\w/.test(ew) || ew > "\x80" && (ew.toUpperCase() != ew.toLowerCase() || aI.test(ew))
    }

    function dt(ew) {
        for (var ex in ew) {
            if (ew.hasOwnProperty(ex) && ew[ex]) {
                return false
            }
        }
        return true
    }
    var dl = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;

    function dV(ew) {
        return ew.charCodeAt(0) >= 768 && dl.test(ew)
    }

    function ej(ew, eA, ez, ey) {
        var eB = document.createElement(ew);
        if (ez) {
            eB.className = ez
        }
        if (ey) {
            eB.style.cssText = ey
        }
        if (typeof eA == "string") {
            l(eB, eA)
        } else {
            if (eA) {
                for (var ex = 0; ex < eA.length; ++ex) {
                    eB.appendChild(eA[ex])
                }
            }
        }
        return eB
    }

    function cK(ex) {
        for (var ew = ex.childNodes.length; ew > 0; --ew) {
            ex.removeChild(ex.firstChild)
        }
        return ex
    }

    function bf(ew, ex) {
        return cK(ew).appendChild(ex)
    }

    function l(ew, ex) {
        if (bE) {
            ew.innerHTML = "";
            ew.appendChild(document.createTextNode(ex))
        } else {
            ew.textContent = ex
        }
    }

    function an(ew) {
        return ew.getBoundingClientRect()
    }
    B.replaceGetRect = function(ew) {
        an = ew
    };
    var dm = function() {
        if (bE) {
            return false
        }
        var ew = ej("div");
        return "draggable" in ew || "dragDrop" in ew
    }();

    function bu() {
        return false
    }
    if (bI) {
        bu = function(ex, ew) {
            return ex.charCodeAt(ew - 1) == 36 && ex.charCodeAt(ew) == 39
        }
    } else {
        if (ag && !/Version\/([6-9]|\d\d)\b/.test(navigator.userAgent)) {
            bu = function(ex, ew) {
                return /\-[^ \-?]|\?[^ !\'\"\),.\-\/:;\?\]\}]/.test(ex.slice(ew - 1, ew + 1))
            }
        } else {
            if (b8 && /Chrome\/(?:29|[3-9]\d|\d\d\d)\./.test(navigator.userAgent)) {
                bu = function(ey, ew) {
                    var ex = ey.charCodeAt(ew - 1);
                    return ex >= 8208 && ex <= 8212
                }
            } else {
                if (b8) {
                    bu = function(ex, ew) {
                        if (ew > 1 && ex.charCodeAt(ew - 1) == 45) {
                            if (/\w/.test(ex.charAt(ew - 2)) && /[^\-?\.]/.test(ex.charAt(ew))) {
                                return true
                            }
                            if (ew > 2 && /[\d\.,]/.test(ex.charAt(ew - 2)) && /[\d\.,]/.test(ex.charAt(ew))) {
                                return false
                            }
                        }
                        return /[~!#%&*)=+}\]\\|\"\.>,:;][({[<]|-[^\-?\.\u2010-\u201f\u2026]|\?[\w~`@#$%\^&*(_=+{[|><]|\u2026[\w~`@#$%\^&*(_=+{[><]/.test(ex.slice(ew - 1, ew + 1))
                    }
                }
            }
        }
    }
    var c6;

    function i(ew) {
        if (c6 != null) {
            return c6
        }
        var ex = ej("div", null, null, "width: 50px; height: 50px; overflow-x: scroll");
        bf(ew, ex);
        if (ex.offsetWidth) {
            c6 = ex.offsetHeight - ex.clientHeight
        }
        return c6 || 0
    }
    var ea;

    function aS(ew) {
        if (ea == null) {
            var ex = ej("span", "\u200b");
            bf(ew, ej("span", [ex, document.createTextNode("x")]));
            if (ew.firstChild.offsetHeight != 0) {
                ea = ex.offsetWidth <= 1 && ex.offsetHeight > 2 && !bF
            }
        }
        if (ea) {
            return ej("span", "\u200b")
        } else {
            return ej("span", "\u00a0", null, "display: inline-block; width: 1px; margin-right: -1px")
        }
    }
    var ay = "\n\nb".split(/\n/).length != 3 ? function(eB) {
        var eC = 0,
            ew = [],
            eA = eB.length;
        while (eC <= eA) {
            var ez = eB.indexOf("\n", eC);
            if (ez == -1) {
                ez = eB.length
            }
            var ey = eB.slice(eC, eB.charAt(ez - 1) == "\r" ? ez - 1 : ez);
            var ex = ey.indexOf("\r");
            if (ex != -1) {
                ew.push(ey.slice(0, ex));
                eC += ex + 1
            } else {
                ew.push(ey);
                eC = ez + 1
            }
        }
        return ew
    } : function(ew) {
        return ew.split(/\r\n?|\n/)
    };
    B.splitLines = ay;
    var aX = window.getSelection ? function(ex) {
        try {
            return ex.selectionStart != ex.selectionEnd
        } catch (ew) {
            return false
        }
    } : function(ey) {
        try {
            var ew = ey.ownerDocument.selection.createRange()
        } catch (ex) {}
        if (!ew || ew.parentElement() != ey) {
            return false
        }
        return ew.compareEndPoints("StartToEnd", ew) != 0
    };
    var ce = (function() {
        var ew = ej("div");
        if ("oncopy" in ew) {
            return true
        }
        ew.setAttribute("oncopy", "return;");
        return typeof ew.oncopy == "function"
    })();
    var dL = {
        3: "Enter",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        107: "=",
        109: "-",
        127: "Delete",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
    };
    B.keyNames = dL;
    (function() {
        for (var ew = 0; ew < 10; ew++) {
            dL[ew + 48] = dL[ew + 96] = String(ew)
        }
        for (var ew = 65; ew <= 90; ew++) {
            dL[ew] = String.fromCharCode(ew)
        }
        for (var ew = 1; ew <= 12; ew++) {
            dL[ew + 111] = dL[ew + 63235] = "F" + ew
        }
    })();

    function cL(ew, eC, eB, eA) {
        if (!ew) {
            return eA(eC, eB, "ltr")
        }
        var ez = false;
        for (var ey = 0; ey < ew.length; ++ey) {
            var ex = ew[ey];
            if (ex.from < eB && ex.to > eC || eC == eB && ex.to == eC) {
                eA(Math.max(ex.from, eC), Math.min(ex.to, eB), ex.level == 1 ? "rtl" : "ltr");
                ez = true
            }
        }
        if (!ez) {
            eA(eC, eB, "ltr")
        }
    }

    function cv(ew) {
        return ew.level % 2 ? ew.to : ew.from
    }

    function er(ew) {
        return ew.level % 2 ? ew.from : ew.to
    }

    function bU(ex) {
        var ew = a(ex);
        return ew ? cv(ew[0]) : 0
    }

    function b4(ex) {
        var ew = a(ex);
        if (!ew) {
            return ex.text.length
        }
        return er(d7(ew))
    }

    function aY(ex, eA) {
        var ey = dJ(ex.doc, eA);
        var eB = u(ex.doc, ey);
        if (eB != ey) {
            eA = bc(eB)
        }
        var ew = a(eB);
        var ez = !ew ? 0 : ew[0].level % 2 ? b4(eB) : bU(eB);
        return K(eA, ez)
    }

    function cE(ey, eB) {
        var ex, ez;
        while (ex = c5(ez = dJ(ey.doc, eB))) {
            eB = ex.find().to.line
        }
        var ew = a(ez);
        var eA = !ew ? ez.text.length : ew[0].level % 2 ? bU(ez) : b4(ez);
        return K(eB, eA)
    }

    function X(ex, ey, ew) {
        var ez = ex[0].level;
        if (ey == ez) {
            return true
        }
        if (ew == ez) {
            return false
        }
        return ey < ew
    }
    var dz;

    function aj(ew, eA) {
        dz = null;
        for (var ex = 0, ey; ex < ew.length; ++ex) {
            var ez = ew[ex];
            if (ez.from < eA && ez.to > eA) {
                return ex
            }
            if ((ez.from == eA || ez.to == eA)) {
                if (ey == null) {
                    ey = ex
                } else {
                    if (X(ew, ez.level, ew[ey].level)) {
                        if (ez.from != ez.to) {
                            dz = ey
                        }
                        return ex
                    } else {
                        if (ez.from != ez.to) {
                            dz = ex
                        }
                        return ey
                    }
                }
            }
        }
        return ey
    }

    function dI(ew, ez, ex, ey) {
        if (!ey) {
            return ez + ex
        }
        do {
            ez += ex
        } while (ez > 0 && dV(ew.text.charAt(ez)));
        return ez
    }

    function q(ew, eD, ey, ez) {
        var eA = a(ew);
        if (!eA) {
            return R(ew, eD, ey, ez)
        }
        var eC = aj(eA, eD),
            ex = eA[eC];
        var eB = dI(ew, eD, ex.level % 2 ? -ey : ey, ez);
        for (;;) {
            if (eB > ex.from && eB < ex.to) {
                return eB
            }
            if (eB == ex.from || eB == ex.to) {
                if (aj(eA, eB) == eC) {
                    return eB
                }
                ex = eA[eC += ey];
                return (ey > 0) == ex.level % 2 ? ex.to : ex.from
            } else {
                ex = eA[eC += ey];
                if (!ex) {
                    return null
                }
                if ((ey > 0) == ex.level % 2) {
                    eB = dI(ew, ex.to, -1, ez)
                } else {
                    eB = dI(ew, ex.from, 1, ez)
                }
            }
        }
    }

    function R(ew, eA, ex, ey) {
        var ez = eA + ex;
        if (ey) {
            while (ez > 0 && dV(ew.text.charAt(ez))) {
                ez += ex
            }
        }
        return ez < 0 || ez > ew.text.length ? null : ez
    }
    var aM = (function() {
        var eC = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLL";
        var eA = "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmmrrrrrrrrrrrrrrrrrr";

        function ez(eF) {
            if (eF <= 255) {
                return eC.charAt(eF)
            } else {
                if (1424 <= eF && eF <= 1524) {
                    return "R"
                } else {
                    if (1536 <= eF && eF <= 1791) {
                        return eA.charAt(eF - 1536)
                    } else {
                        if (1792 <= eF && eF <= 2220) {
                            return "r"
                        } else {
                            return "L"
                        }
                    }
                }
            }
        }
        var ew = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var eE = /[stwN]/,
            ey = /[LRr]/,
            ex = /[Lb1n]/,
            eB = /[1n]/;
        var eD = "L";
        return function(eP) {
            if (!ew.test(eP)) {
                return false
            }
            var eV = eP.length,
                eL = [];
            for (var eU = 0, eH; eU < eV; ++eU) {
                eL.push(eH = ez(eP.charCodeAt(eU)))
            }
            for (var eU = 0, eO = eD; eU < eV; ++eU) {
                var eH = eL[eU];
                if (eH == "m") {
                    eL[eU] = eO
                } else {
                    eO = eH
                }
            }
            for (var eU = 0, eF = eD; eU < eV; ++eU) {
                var eH = eL[eU];
                if (eH == "1" && eF == "r") {
                    eL[eU] = "n"
                } else {
                    if (ey.test(eH)) {
                        eF = eH;
                        if (eH == "r") {
                            eL[eU] = "R"
                        }
                    }
                }
            }
            for (var eU = 1, eO = eL[0]; eU < eV - 1; ++eU) {
                var eH = eL[eU];
                if (eH == "+" && eO == "1" && eL[eU + 1] == "1") {
                    eL[eU] = "1"
                } else {
                    if (eH == "," && eO == eL[eU + 1] && (eO == "1" || eO == "n")) {
                        eL[eU] = eO
                    }
                }
                eO = eH
            }
            for (var eU = 0; eU < eV; ++eU) {
                var eH = eL[eU];
                if (eH == ",") {
                    eL[eU] = "N"
                } else {
                    if (eH == "%") {
                        for (var eI = eU + 1; eI < eV && eL[eI] == "%"; ++eI) {}
                        var eW = (eU && eL[eU - 1] == "!") || (eI < eV && eL[eI] == "1") ? "1" : "N";
                        for (var eS = eU; eS < eI; ++eS) {
                            eL[eS] = eW
                        }
                        eU = eI - 1
                    }
                }
            }
            for (var eU = 0, eF = eD; eU < eV; ++eU) {
                var eH = eL[eU];
                if (eF == "L" && eH == "1") {
                    eL[eU] = "L"
                } else {
                    if (ey.test(eH)) {
                        eF = eH
                    }
                }
            }
            for (var eU = 0; eU < eV; ++eU) {
                if (eE.test(eL[eU])) {
                    for (var eI = eU + 1; eI < eV && eE.test(eL[eI]); ++eI) {}
                    var eM = (eU ? eL[eU - 1] : eD) == "L";
                    var eG = (eI < eV ? eL[eI] : eD) == "L";
                    var eW = eM || eG ? "L" : "R";
                    for (var eS = eU; eS < eI; ++eS) {
                        eL[eS] = eW
                    }
                    eU = eI - 1
                }
            }
            var eT = [],
                eQ;
            for (var eU = 0; eU < eV;) {
                if (ex.test(eL[eU])) {
                    var eJ = eU;
                    for (++eU; eU < eV && ex.test(eL[eU]); ++eU) {}
                    eT.push({
                        from: eJ,
                        to: eU,
                        level: 0
                    })
                } else {
                    var eK = eU,
                        eN = eT.length;
                    for (++eU; eU < eV && eL[eU] != "L"; ++eU) {}
                    for (var eS = eK; eS < eU;) {
                        if (eB.test(eL[eS])) {
                            if (eK < eS) {
                                eT.splice(eN, 0, {
                                    from: eK,
                                    to: eS,
                                    level: 1
                                })
                            }
                            var eR = eS;
                            for (++eS; eS < eU && eB.test(eL[eS]); ++eS) {}
                            eT.splice(eN, 0, {
                                from: eR,
                                to: eS,
                                level: 2
                            });
                            eK = eS
                        } else {
                            ++eS
                        }
                    }
                    if (eK < eU) {
                        eT.splice(eN, 0, {
                            from: eK,
                            to: eU,
                            level: 1
                        })
                    }
                }
            }
            if (eT[0].level == 1 && (eQ = eP.match(/^\s+/))) {
                eT[0].from = eQ[0].length;
                eT.unshift({
                    from: 0,
                    to: eQ[0].length,
                    level: 0
                })
            }
            if (d7(eT).level == 1 && (eQ = eP.match(/\s+$/))) {
                d7(eT).to -= eQ[0].length;
                eT.push({
                    from: eV - eQ[0].length,
                    to: eV,
                    level: 0
                })
            }
            if (eT[0].level != d7(eT).level) {
                eT.push({
                    from: eV,
                    to: eV,
                    level: eT[0].level
                })
            }
            return eT
        }
    })();
    B.version = "3.21.0";
    return B
})();