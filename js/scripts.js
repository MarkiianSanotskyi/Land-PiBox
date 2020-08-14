$(document).ready(function(){
   $('a[href*=#]').bind("click", function(e){
      var anchor = $(this);
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1400);
      e.preventDefault();
   });
   return false;
});

/*placeholder*/
$(document).ready(function(){
        $.Placeholder.init({ color : "#797979" });
 });
 


(function($){
	'use strict';



	$('.where-userful-list li').on('click', function(e){
		DO(this, e);
	});

	$('.where-userful-list li').on('tap', function(e){
		DO(this, e);
	});
})(jQuery);



