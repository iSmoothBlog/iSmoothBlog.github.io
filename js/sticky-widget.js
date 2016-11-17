          $(document).ready(function() {
              function o() {
                  var o = $("#HTML2");
                  $(window).scrollTop() > o.data("top") ? $("#HTML2").css({
                      position: "fixed",
                      top: "20",
                  }) : $("#HTML2").css({
                      position: "relative",
                      top: "auto",
                  })
              }
              $("#HTML2").data("top", $("#HTML2").offset().top), $(window).scroll(o)
          });