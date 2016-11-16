/// Initializations

var sessionID = randomString(), started = 0, attempts = 10, allowProcessing = null, progressImg = "button-progress.gif",
    optfields = 0, progress = -1, fileID = randomString(), pImgFor, $idown, editor;

$(document).ready(function() {
    editor = CodeMirror(document.getElementById("text-field"), {
        lineNumbers: true,
        lineWrapping: false,
        autofocus: true,
        mode: "none"
    });
    editor.on("focus", function() {
        if (pImgFor != fileID) reloadPImg();
        $("#text-field").removeClass("text-field-error");
    });
    editor.getWrapperElement().addEventListener("paste", function(e) {
        editor.setOption("mode", "none");
    });

    $(window).resize(function() {
        editor.refresh();
    });

    $("#start-button .action-button").click(function() {
        this.blur();
        if (started == 1) return false;
        var error = 0;  
        if (editor.getValue().length == 0) {
            $("#text-field").addClass("text-field-error");
            error = 1;
        } else {
            $("#text-field").removeClass("text-field-error");
        }
        if (error) return false;
        started = 1;
        startConvert();
        return false;
    });

    $("#clear-button .action-button").click(function() {
        this.blur();
        $("#text-field").removeClass("text-field-error");
        editor.setValue("");
        editor.setOption("mode", "none");
        editor.clearHistory();
        editor.focus();
        return false;
    });

    $("#text-field").resizable({
        minHeight: 360,
        grid: [10000, 20],
        resize: function() {
            editor.setSize($(this).width(), $(this).height());
        }
    });

    reloadPImg();
});

/// Communications

function startConvert() {
    allowProcessing = 1;
    progressOn();
    x_ajax({
        "req" : {
            "url"       : "convert/" + sessionID + "/" + fileID,
            "type"      : "POST",
            "data"      : { "code" : editor.getValue() },
            "dataType"  : "json"
        },
        "onData" : function(data) {
            progressOn();
            getStatus();
        },
        "onError" : function(data) {
            progressOff();
            if (typeof(data.details) == "string") x_prettyError(data.details);
            else x_prettyError("Unexpected error.");
        },
        "onFail" : function() {
            progressOff();
            x_prettyError("Unexpected error.");
        }
    });
}

function getStatus() {
    x_ajax({
        "req" : {
            "url"       : "status/" + sessionID + "/" + fileID,
            "type"      : "GET",
            "dataType"  : "json"
        },
        "onData" : function(data) {
            if (allowProcessing) {
                allowProcessing = null;
                progressOff();
                editor.setValue("");
                if (data.format) {
                    var newFormat;
                    if (data.format == "JS") newFormat = "javascript";
                    else if (data.format == "CSS") newFormat = "css";
                    else if (data.format == "HTML") newFormat = "htmlmixed";
                    editor.setOption("mode", newFormat);
                }
                editor.setValue(data.result);
                editor.focus();
            }
        },
        "onError" : function(data) {
            if (allowProcessing) {
                progressOff();
                if (typeof(data.details) == "string") x_prettyError(data.details);
                else x_prettyError("Unexpected error.");
            }
        },
        "onFail" : function() {
            progressOff();
            x_prettyError("Unexpected error.");
        },
        "silent" : 1
    });
}

/// Functions

function progressOn() {
    $("#start-button .action-button").hide();
    $("#start-button-progress").show();
    progress = 1;
}

function progressOff() {
    allowProcessing = null;
    $("#start-button-progress").hide();
    $("#start-button .action-button").show();
    progress = 0;
    started = 0;
    retries = 0;
    fileID = randomString();
}

function reloadPImg() {
    $("<img>").attr({"src" : "images/" + progressImg + "?" + fileID}).load(function() {
        $("#start-button-progress img").remove();
        $(this).appendTo("#start-button-progress");
        pImgFor = fileID;
    });
}

function prettyPolicy() {
    $(".pretty-policy").remove();
    $.get("/policy", function(text) {
        $("<div />", {
            "class"     : "pretty-policy"
        }).html(text).dialog({
            "width"     : "80%",
            "modal"     : false,
            "resizable" : false,
            "title"     : "Privacy Policy",
            "position"  : { "my" : "center", "at" : "center", "of" : window }
        });
    });
}
