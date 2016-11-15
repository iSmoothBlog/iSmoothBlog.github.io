$(function() {
    var ks_widget_top = $(&#39;#HTML2&#39;).offset().top;
    var ks_sticky_widgets = function(){
        var ks_current_top = $(window).scrollTop();
           
        if (ks_current_top &gt; ks_widget_top) {
		$(&#39;#HTML2&#39;).css({ &#39;position&#39;: &#39;fixed&#39;, &#39;top&#39;:20, &#39;width&#39;:300 });
        } else {
            $(&#39;#HTML2&#39;).css({ &#39;position&#39;: &#39;static&#39; }); 
        }  
    };
    ks_sticky_widgets();
      $(window).scroll(function() {
         ks_sticky_widgets();
    });

});