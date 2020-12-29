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

document.addEventListener('dblclick', e => {
  let pre = getClosest(e.target, "PRE");
  if (pre) {
    let range = new Range();
    range.setStart(pre, 0);
    range.setEnd(pre, 1);
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);
  }
});

// Copy Button

jQuery(document).ready(function($){
	var copyid = 0;
	$('pre').each(function(){
		copyid++;
		$(this).attr( 'data-copyid', copyid).wrap( '<div class="pre-wrapper"/>');
		$(this).parent().css( 'margin', $(this).css( 'margin') );
		$('<button class="copy-snippet">Copy</button>').insertAfter( $(this) ).data( 'copytarget',copyid );
	});

	$('body').on( 'click', '.copy-snippet', function(ev){
		ev.preventDefault();

		var $copyButton = $(this);

		$pre = $(document).find('pre[data-copyid=' + $copyButton.data('copytarget' ) + ']');
		if ( $pre.length ) {
			var textArea = document.createElement("textarea");

			// Place in top-left corner of screen regardless of scroll position.
			textArea.style.position = 'fixed';
			textArea.style.top = 0;
			textArea.style.left = 0;

			// Ensure it has a small width and height. Setting to 1px / 1em
			// doesn't work as this gives a negative w/h on some browsers.
			textArea.style.width = '2em';
			textArea.style.height = '2em';
			
			// We don't need padding, reducing the size if it does flash render.
			textArea.style.padding = 0;

			// Clean up any borders.
			textArea.style.border = 'none';
			textArea.style.outline = 'none';
			textArea.style.boxShadow = 'none';

			// Avoid flash of white box if rendered for any reason.
			textArea.style.background = 'transparent';

			//Set value to text to be copied
			textArea.value = $pre.html();

			document.body.appendChild(textArea);
			textArea.select();

			try {
				document.execCommand('copy');
				$copyButton.text( 'Copied').prop('disabled', true);;
			} catch (err) {
				$copyButton.text( 'FAILED: Could not copy').prop('disabled', true);;
			}
			setTimeout(function(){
				$copyButton.text( 'Copy').prop('disabled', false);;
			}, 3000);
		}
	});
});
