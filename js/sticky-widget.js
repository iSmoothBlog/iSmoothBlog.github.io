$(function () {
    if ($("#HTML1").length) {
        var o = $("#HTML1"),
            t = $("#HTML1").offset().top,
            i = $("#HTML1").height();
        $(window).scroll(function () {
            var s = $("#blog-pager").offset().top - i - 100,
                f = $(window).scrollTop();
            if (
                (f > t
                    ? o.css({
                          position: "fixed",
                          width: 300,
                          top: 20,
                      })
                    : o.css({
                          position: "relative",
                          top: 0,
                      }),
                f > s)
            ) {
                var n = s - f;
                o.css({
                    top: n,
                });
            }
        });
    }
});
