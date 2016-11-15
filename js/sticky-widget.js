$(function() {
    var ks_widget_top = $('#HTML2').offset().top;
    var ks_sticky_widgets = function(){
        var ks_current_top = $(window).scrollTop();
           
        if (ks_current_top > ks_widget_top) {
		$('#HTML2').css({ 'position': 'fixed', 'top':20, 'width':300 });
        } else {
            $('#HTML2').css({ 'position': 'static' }); 
        }  
    };
    ks_sticky_widgets();
      $(window).scroll(function() {
         ks_sticky_widgets();
    });

});