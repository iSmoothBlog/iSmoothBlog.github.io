$(function() {
    if ($("#HTML2").length) {
        var o = $("#HTML2"),
            t = $("#HTML2").offset().top,
            i = $("#HTML2").height();
        $(window).scroll(function() {
            var s = $("#footer-wrapper").offset().top - i - 100,
                f = $(window).scrollTop();
            if (f > t ? o.css({
                    position: "fixed",
                    width: 300,
                    top: 20
                }) : o.css("position", "static"), f > s) {
                var n = s - f;
                o.css({
                    top: n
                })
            }
        })
    }
});