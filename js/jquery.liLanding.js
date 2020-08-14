/*
 * jQuery liLanding v 1.0
 *
 * Copyright 2013, Linnik Yura | LI MASS CODE | http://masscode.ru
 * Free to use
 *
 * 03.12.2013
 */
(function ($) {
	var methods = {
		init: function (options) {
			var p = {
				show: function (linkEl, landingItem) {}, 
				hide: function (linkEl, landingItem) {}
			};
			if (options) {
				$.extend(p, options);
			}
			return this.each(function () {
				var el = $(this);
				var elPos = el.offset().top;
				var wHalf = $(window).height()/1
				var scrollId = function(){};
				
				//assign events only links with anchors
				$('a[href^=#]',el).on('click',function(){
					var linkItem = $(this);
					if(!linkItem.is('.cur')){
						var linkHref = linkItem.attr('href');
						var linkTarget = $(linkHref);
						var linkTargetPos = linkTarget.offset().top;
						var windowPos = $(window).scrollTop();
						var animDuration = linkTargetPos - windowPos
						if(animDuration < 0){
							animDuration = animDuration*-1	
						}
						//scroll the page to the desired block
						if(linkTarget.length){
							$('html, body').stop(true).animate({scrollTop:linkTargetPos},animDuration,function(){
								$(window).trigger('scroll');
							});
						}
					}
					return false;
				})
				//stop the animation by scrolling
				var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
				if (document.attachEvent) //if IE (and Opera depending on user setting)
					document.attachEvent("on"+mousewheelevt, function(e){
						$('html, body').stop(true);		
					});
				else if (document.addEventListener) //WC3 browsers
					document.addEventListener(mousewheelevt, function(e){
						//e.detail //direction
						$('html, body').stop(true);
					}, false)
				//highlight the desired link in the menu by scrolling
				$(window).on('scroll',function(e){
					clearTimeout(scrollId);
					var windowPos = $(window).scrollTop();
					if(windowPos > elPos){
						el.addClass('landingFix');	
					}else{
						el.removeClass('landingFix');	
					}
					scrollId = setTimeout(function(){
						$('.landingItem').each(function(){
							var landingItem = $(this);
							var landingItemHeight = landingItem.height();
							var landingItemTop = landingItem.offset().top - wHalf;
							var linkHref = landingItem.attr('id');
							var linkEl = $('a[href="#'+linkHref+'"]',el);
							var status;

							if(windowPos > landingItemTop && windowPos < (landingItemTop + landingItemHeight)){
								if(!linkEl.is('.cur')){
									linkEl.addClass('cur');
									if (p.show !== undefined) {
										p.show(linkEl, landingItem);
									}
								}
							}else{
								if(linkEl.is('.cur')){
									linkEl.removeClass('cur');
									if (p.hide !== undefined) {
										p.hide(linkEl, landingItem);
									}
								}
							}
						});
					},10);
				})
				$(window).trigger('scroll');
			});
		}
	};
	$.fn.liLanding = function (method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Метод ' + method + ' в jQuery.liLanding не существует');
		}
	};
})(jQuery);