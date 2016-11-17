$(function() {
    if ($("#HTML2").length) {
        var o = $("#HTML2"),
            t = $("#HTML2").offset().top,
        $(window).scroll(function() {
            var f = $(window).scrollTop();
            i = $("#HTML2").height();
            if (f > t ? o.css({
                    position: "fixed",
					width: "auto",
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