jQuery(window).load(function() {
	if(document.getElementById("all_click"))
		document.getElementById("all_click").click();
	jQuery('.mask-color').fadeOut('slow');
});

jQuery(document).ready(function() {
    
    // Do our DOM lookups beforehand
    var nav_container = $(".nav-container");
    var nav = $("nav");

    nav_container.waypoint({
    handler: function(event, direction) {
        nav.toggleClass('stuck-sticky')
        console.log('Masuk')
        if (direction == 'down')
          nav_container.css({ 'height':nav.outerHeight() });
        else
          nav_container.css({ 'height':'auto' });
    }
    });
    
    // Init Skrollr
    var s = skrollr.init({
      smoothScrolling: false,
      mobileDeceleration: 0.004, 
    });
    
    $('.main-menu a').click(function(){
      $.scrollTo( this.hash, 1500, { easing:'swing' });
      return false;
    });
});

jQuery(function($){


    var sections = {},
    	header_height = $("#header").height(),
        i        = -1;
    
    // Grab positions of our sections 
    $('.template-wrap').each(function(){
        sections[this.id] = $(this).offset().top;
    });

    $(document).scroll(function(){
        var $this = $(this),
            pos   = $this.scrollTop();
        //console.log(sections);
        for(i in sections){
            var bgcolor = $('#'+i).find('span.line-title').css('backgroundColor');  

			$('#'+i).waypoint(function() {
                $('#menu-res li a').removeClass('active').css('border-bottom-color', 'none');
                $('#menu-res li a').removeAttr( "style" );
                $('#menu-res li a[href="#'+i+'"]')
		                .addClass('active')
		                .css('border-bottom-color', bgcolor);	
			}, { offset: '25%' });
        }
    });
});

function createCookie(name, value, days) {
    var expires;

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
}
