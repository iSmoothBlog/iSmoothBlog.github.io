// Smooth Scroll to Top

$(function () {
    $(document).on("scroll", function () {
        if ($(window).scrollTop() > 700) {
            $(".smoothscroll").addClass("show");
        } else {
            $(".smoothscroll").removeClass("show");
        }
    });

    $(".smoothscroll").on("click", scrollToTop);
});
function scrollToTop() {
    verticalOffset = typeof verticalOffset != "undefined" ? verticalOffset : 0;
    element = $("html");
    offset = element.offset();
    offsetTop = offset.top;
    $("html, body").animate({ scrollTop: offsetTop }, 800, "linear");
}
$('.post-comments-button[href="#discussion"]').click(function () {
    $("html, body").animate(
        {
            scrollTop: $("#discussion").offset().top,
        },
        1000
    );
});

// Dialog Box

function CustomAlert() {
    this.render = function (dialog) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById("dialogoverlay");
        var dialogbox = document.getElementById("dialogbox");
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH + "px";
        dialogbox.style.left = winW / 2 - 350 * 0.5 + "px";
        dialogbox.style.top = "150px";
        dialogbox.style.display = "block";
        document.getElementById("dialogboxhead").innerHTML = "Welcome!";
        document.getElementById("dialogboxbody").innerHTML = dialog;
        document.getElementById("dialogboxfoot").innerHTML = '<button onclick="Alert.ok()" title="Close this">&#215;</button>';
    };
    this.ok = function () {
        document.getElementById("dialogbox").style.top = "-300px";
        document.getElementById("dialogoverlay").style.display = "none";
    };
}

var Alert = new CustomAlert();

// Double Click (Select All)

$('i[rel="pre"]').replaceWith(function () {
    return $("<pre><code>" + $(this).html() + "</code></pre>");
});

for (var pres = document.querySelectorAll("pre,code,blockquote,i"), i = 1; i < pres.length; i++)
    pres[i].addEventListener(
        "dblclick",
        function () {
            var e = getSelection(),
                t = document.createRange();
            t.selectNodeContents(this), e.removeAllRanges(), e.addRange(t);
        },
        !1
    );
