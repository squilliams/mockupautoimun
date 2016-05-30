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
        if (direction == 'down')
          nav_container.css({ 'height':nav.outerHeight() });
        else
          nav_container.css({ 'height':'auto' });
    }
    });
    
    var menu_item = $("#overview");
    var li = $("ul li.main-menu");
    
    menu_item.waypoint({
    handler: function(event, direction) {
        li.toggleClass('current')
    }
    });
    // Init Skrollr
    var s = skrollr.init({
      smoothScrolling: false,
      mobileDeceleration: 0.004, 
    });
    
//      var sections = $('section');
//      var navigation_links = $('nav ul.main-menu li a');
//
//      sections.waypoint({
//        handler: function(event, direction) {
//              var active_section;
//              active_section = $(this);
//              console.log(this.tagName);
//                console.log("yes masuk");
//              if (direction === "up") active_section = active_section.prev();
//                
////              var active_link = $('.nav a[href="#' + active_section.attr("id") + '"]');
//              var active_link = $('nav ul.main-menu li a[href="#' + active_section.attr("id") + '"]');
//              navigation_links.removeClass("selected");
//              active_link.addClass("selected");
//        },
//        offset: '35%'
//      });
    var aChildren = $("nav ul.main-menu li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("selected");
            } else {
                $("a[href='" + theID + "']").removeClass("selected");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$("nav ul.main-menu li:last-child a").hasClass("selected")) {
                var navActiveCurrent = $(".selected").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("selected");
                $("nav ul.main-menu li:last-child a").addClass("selected");
            }
        }
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
