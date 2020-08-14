$(function() {
	var sections = $(".tag");
	var navigation_links = $(".nav-list a");
	
	sections.waypoint({
		handler: function(event, direction) {
		
			var active_section;
			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();
			

			var active_link = $('.nav-list a[href="#' + active_section.attr("id") + '"]');
			navigation_links.removeClass("selected");
			active_link.addClass("selected");

		},
		
	})
});