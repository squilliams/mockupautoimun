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

    $("nav a").click(function(evn){
        evn.preventDefault();
        $('html,body').scrollTo(this.hash, 700); 
    });
    
});

(function(){
	var d = document,
	accordionToggles = d.querySelectorAll('.js-accordionTrigger'),
	setAria,
	setAccordionAria,
	switchAccordion,
  touchSupported = ('ontouchstart' in window),
  pointerSupported = ('pointerdown' in window);
  
  skipClickDelay = function(e){
    e.preventDefault();
    e.target.click();
  }

		setAriaAttr = function(el, ariaType, newProperty){
		el.setAttribute(ariaType, newProperty);
	};
	setAccordionAria = function(el1, el2, expanded){
		switch(expanded) {
      case "true":
      	setAriaAttr(el1, 'aria-expanded', 'true');
      	setAriaAttr(el2, 'aria-hidden', 'false');
      	break;
      case "false":
      	setAriaAttr(el1, 'aria-expanded', 'false');
      	setAriaAttr(el2, 'aria-hidden', 'true');
      	break;
      default:
				break;
		}
	};
//function
switchAccordion = function(e) {
  console.log("triggered");
	e.preventDefault();
	var thisAnswer = e.target.parentNode.nextElementSibling;
	var thisQuestion = e.target;
	if(thisAnswer.classList.contains('is-collapsed')) {
		setAccordionAria(thisQuestion, thisAnswer, 'true');
	} else {
		setAccordionAria(thisQuestion, thisAnswer, 'false');
	}
  	thisQuestion.classList.toggle('is-collapsed');
  	thisQuestion.classList.toggle('is-expanded');
		thisAnswer.classList.toggle('is-collapsed');
		thisAnswer.classList.toggle('is-expanded');
 	
  	thisAnswer.classList.toggle('animateIn');
	};
	for (var i=0,len=accordionToggles.length; i<len; i++) {
		if(touchSupported) {
      accordionToggles[i].addEventListener('touchstart', skipClickDelay, false);
    }
    if(pointerSupported){
      accordionToggles[i].addEventListener('pointerdown', skipClickDelay, false);
    }
    accordionToggles[i].addEventListener('click', switchAccordion, false);
  }
})();