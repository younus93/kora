var $ = jQuery.noConflict();

"use strict";

function debouncer(func, timeout) {
	var timeoutID, timeout = timeout || 500;
	return function () {
		var scope = this,
			args = arguments;
		clearTimeout(timeoutID);
		timeoutID = setTimeout(function () {
			func.apply(scope, Array.prototype.slice.call(args));
		}, timeout);
	}
}
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 */
(function (window) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg(className) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ('classList' in document.documentElement) {
		hasClass = function (elem, c) {
			return elem.classList.contains(c);
		};
		addClass = function (elem, c) {
			elem.classList.add(c);
		};
		removeClass = function (elem, c) {
			elem.classList.remove(c);
		};
	} else {
		hasClass = function (elem, c) {
			return classReg(c).test(elem.className);
		};
		addClass = function (elem, c) {
			if (!hasClass(elem, c)) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function (elem, c) {
			elem.className = elem.className.replace(classReg(c), ' ');
		};
	}

	function toggleClass(elem, c) {
		var fn = hasClass(elem, c) ? removeClass : addClass;
		fn(elem, c);
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

	// transport
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(classie);
	} else {
		// browser global
		window.classie = classie;
	}

})(window);

/* Initialize All Scripts */
$(document).ready(function () {

	var windowW = window.innerWidth || $(window).width(),
		prevW = windowW;

	var menuneg = '-100%';

	// Remove Loader
	$('body').addClass('loaded');

	// Show rev slider

	if ($(".tp-banner-container").length) {
		$(".tp-banner-container").css({
			height: 'auto'
		}).animate({
			"opacity": "1"
		}, 500);
	}

	// Menu Initialization

	function menuIni(windowW) {

		if (windowW > 768) {
			$('ul.navbar-nav > li').addClass('hovernav');
			$('ul.navbar-nav > li.hovernav')
				.on('mouseenter', function () {
					$(this).addClass("open")
				})
				.on('mouseleave', function () {
					$(this).removeClass("open")
				});
			$('ul.navbar-nav > li li')
				.on('mouseenter', function () {
					if ($(this).children('ul.level-menu__dropdown').length) {
						$(this).addClass('active');
						$(this).children('ul.level-menu__dropdown').show().css({
							'opacity': 0,
							'left': $(this).width()
						})
						var off = $(this).children('ul.level-menu__dropdown').offset();
						var l = off.left;
						var w = $(this).children('ul.level-menu__dropdown').width();
						var docW = $(".container").width();
						var isEntirelyVisible = (l + w <= docW);

						if (!isEntirelyVisible) {
							$(this).children('ul.level-menu__dropdown').show().css({
								'opacity': 1,
								'right': $(this).width(),
								'left': 'auto'
							})
						} else {
							$(this).children('ul.level-menu__dropdown').show().css({
								'opacity': 1,
								'left': $(this).width()
							})
						}

					}
				})
				.on('mouseleave', function () {
					if ($(this).children('ul.level-menu__dropdown').length) {
						$(this).removeClass('active');
						$(this).children('ul.level-menu__dropdown').hide().css({
							'left': 'auto',
							'right': 'auto'
						})
					}
				});

		} else {
			$('ul.navbar-nav > li').removeClass('hovernav');
			$('ul.navbar-nav > li li').unbind('mouseenter mouseleave');
			$('.touch ul.navbar-nav > li > a').on('click', function (e) {
				e.preventDefault();
			})
			$('.touch ul.navbar-nav > li a span.caret').on('click', function (e) {
				$(this).parent().parent('li').toggleClass('open');
			});
			$('.touch ul.navbar-nav > li a span.link-name').on('click', function (e) {
				var url = $(this).parent('a').attr("href");
				window.location = url;
			});

		};
		$('.no-touch .hovernav a').on('click', function (e) {
			window.location = this.href;
		});
	}

	// Modal Search Popup

	function modalSearch() {
		if ($('.overlay').length && $('.search-open').length) {
			var triggerBttn = $('.search-open'),
				overlay = document.querySelector('div.overlay'),
				closeBttn = overlay.querySelector('button.overlay-close');
			transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd',
					'transition': 'transitionend'
				},
				transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
				support = {
					transitions: Modernizr.csstransitions
				};

			function toggleOverlay() {
				if (classie.has(overlay, 'open')) {
					$('body').removeClass('modal-open');
					classie.remove(overlay, 'open');
					classie.add(overlay, 'close');
					var onEndTransitionFn = function (ev) {
						if (support.transitions) {
							if (ev.propertyName !== 'visibility') return;
							this.removeEventListener(transEndEventName, onEndTransitionFn);
						}
						classie.remove(overlay, 'close');
					};
					if (support.transitions) {
						overlay.addEventListener(transEndEventName, onEndTransitionFn);
					} else {
						onEndTransitionFn();
					}
				} else if (!classie.has(overlay, 'close')) {
					classie.add(overlay, 'open');
					$('body').addClass('modal-open');
				}

				return false;
			}
			triggerBttn.on('click', toggleOverlay);
			closeBttn.addEventListener('click', toggleOverlay);
		}
	}

	// Slide menu small Header

	function openSlidemenu() {
		$("#openSlidemenu").on('click', function (e) {
			$(".header--small #slidemenu").slideToggle(250, function () {
				$(".header--small #slidemenu").toggleClass('open')
			});
			return false;
		});
	}

	// Back to top button

	function backToTop() {
		var backPos;
		if ($("footer .back-to-top").length) {
			var backPos = $("footer .back-to-top").offset();
			if (backPos.top < $(window).height) {
				$("footer .back-to-top").hide();
			}
		}
		$(".back-to-top > a").on('click', function (e) {
			$("html, body").animate({
				scrollTop: 0
			}, "slow");
			return false;
		});
	}

	// Slide menu mobile

	function slideMobileMenu(windowW) {

		if (windowW < 768) {
			$('#slidemenu').css({
				'height': $(window).height()
			});
		}
		var toggler = '.navbar-toggle';
		var pagewrapper = '#pageContent';
		var footer = '.footer';
		var navigationwrapper = '.navbar-header';
		var menuwidth = '100%';
		var slidewidth = '80%';

		$("#slidemenu .slidemenu-close").on("click", function (e) {

			$('body').removeClass('modal-open');

			if ($('html').css('direction').toLowerCase() == 'rtl') {
				$('#slidemenu').stop().animate({
					right: menuneg
				});
			} else {
				$('#slidemenu').stop().animate({
					left: menuneg
				});
			}
		});

		$("#navbar").on("click", toggler, function (e) {

			$('body').addClass('modal-open');

			var selected = $(this).hasClass('slide-active');


			if ($('html').css('direction').toLowerCase() == 'rtl') {
				$('#slidemenu').stop().show().animate({
					right: selected ? menuneg : '0px'
				});
			} else {
				$('#slidemenu').stop().show().animate({
					left: selected ? menuneg : '0px'
				});
			}

		});
	}

	// Sticky Header

	function stickyHeaderIni(windowW) {

		var sticky = 0;

		var stickyHeader = function (windowW) {
			if ($('header.header--max.header--sticky').length && windowW > 767) {
				sticky = new Waypoint.Sticky({
					element: $('header #slidemenu')[0],
					offset: -1
				})
			} else {
				if ($('header.header--sticky .navbar').length) {
					sticky = new Waypoint.Sticky({
						element: $('header .navbar')[0],
						offset: -1
					})
				}
			}
		}

		if ($('header').length) {
			if ($(document).scrollTop() > 150) {
				$('header .navbar').addClass('stuck--smaller');
			}
			stickyHeader(windowW);
		}


		$("body").on("touchend", function () {
			if ($(document).scrollTop() > 150) {
				if (!$('header .navbar').hasClass('stuck--smaller')) {
					setTimeout(function () {
						$('header .navbar').addClass('stuck--smaller');
					}, 300);
				}
			} else {
				$('header .navbar').removeClass('stuck--smaller');
			}
		});


		var waypoints = $('.no-touch header .navbar').waypoint(function (direction) {
			if (direction === 'down') {
				$('.no-touch header .navbar').addClass('stuck--smaller');
			}
		}, {
			offset: -350
		})
		var waypoints = $('.no-touch header .navbar').waypoint(function (direction) {
			if (direction === 'up') {
				$('.no-touch header .navbar').removeClass('stuck--smaller');
			}
		}, {
			offset: -350
		});

		$(window).resize(function () {

			var curW = window.innerWidth || $(window).width();

			if ($('header').length) {
				sticky.destroy();
				sticky = 0;
				stickyHeader(curW);
			}

			if ($(document).scrollTop() > 50) {
				$('header .navbar').addClass('stuck--smaller');
			}

		});

	}

	// Mobile footer collapse

	function footerCollapse() {
		$('.mobile-collapse__title').on('click', function (e) {
			e.preventDefault;
			$(this).parent('.mobile-collapse').toggleClass('open');
		})
	}

	// Parallax

	function parallaxIni() {
		if ($('.content--parallax').length) {
			$('.content--parallax').each(function () {
				var attr = $(this).attr('data-image');
				$(this).css({
					'background-image': 'url(' + attr + ')'
				}).parallax("50%", 0.01);
			})
		}

		if ($('.parallax').length) {
			$('.parallax').each(function () {
				var attr = $(this).attr('data-image');
				$(this).css({
					'background-image': 'url(' + attr + ')'
				}).parallax("50%", 0);
			})
		}
	}

	// Waypoint

	function onScrollInit(items, container) {
		items.each(function () {
			var element = $(this),
				animationClass = element.attr('data-animation'),
				animationDelay = element.attr('data-animation-delay');

			element.css({
				'-webkit-animation-delay': animationDelay,
				'-moz-animation-delay': animationDelay,
				'animation-delay': animationDelay
			});

			var trigger = (container) ? container : element;

			trigger.waypoint(function () {
				element.addClass('animated').addClass(animationClass);
			}, {
				triggerOnce: true,
				offset: '90%'
			});
		});
	}
	// Post Isotope
	function setPostSize() {
		var windowW = window.innerWidth || $window.width(),
			itemsInRow = 1;
		if (windowW > 1199) {
			itemsInRow = 3;
		} else if (windowW > 767) {
			itemsInRow = 3;
		} else if (windowW > 480) {
			itemsInRow = 1;
		}
		var containerW = $postgallery.parent('.container').width()-60,
			galleryW = containerW / itemsInRow;
		
		$postgallery.find('.blog-post').each(function () {
			if (windowW > 767) {
				if ($(this).hasClass('doubleW')) {
					$(this).css({
						width: galleryW * 2 + 30 + 'px',
					});
				} else {
					$(this).css({
						width: galleryW + 'px'
					});
				}
			} else {
				$(this).css({
					width: galleryW + 60 + 'px'
				});
			}
		});

		setTimeout(function () {
			$('.slick-initialized').slick('setPosition');
			$postgallery.isotope('layout');
		}, 100);
	}
	if ($('.blog-isotope').length) {
		var $postgallery = $('.blog-isotope');
		$postgallery.imagesLoaded(function () {
			setPostSize();
		});
		$postgallery.isotope({
			itemSelector: '.blog-post',
			masonry: {
				gutter: 30,
				columnWidth: '.blog-post:not(.doubleW)'
			}
		});
	}
	// Post More
	$('.view-more-post').on('click', function () {
			var item;
			var target = $(this).attr('data-load');
			$(this).hide();
			$.ajax({
				url: target,
				success: function (data) {
					$('#postPreload').append(data);
					if ($('.blog-isotope').length) {
						$('#postPreload > div').each(function () {
							item = $(this);
							$postgallery.append(item).isotope('appended', item);
							setPostSize();
						});
					}
				}
			});
		})
	
	//Isotope

	function setGallerySize(windowW, gallery) {

		var gallery = $(gallery);
		var itemsInRow = 1;
		if (windowW > 1199) {
			itemsInRow = 5;
		} else if (windowW > 991) {
			itemsInRow = 4;
		} else if (windowW > 767) {
			itemsInRow = 3;
		} else if (windowW > 480) {
			itemsInRow = 2;
		}
		var containerW = gallery.parent('.container').width(),
			galleryW = containerW / itemsInRow;

		gallery.find('.gallery__item').each(function () {
			if ($(this).hasClass('doubleW') && windowW > 767) {
				$(this).css({
					width: galleryW * 2 + 'px',
				});
			} else {
				$(this).css({
					width: galleryW + 'px'
				});
			}
		});

		var galleryH = gallery.find('.gallery__item:not(.doubleH)').height();

		gallery.find('.gallery__item').each(function () {
			$(this).css({
				height: ''
			});
			if ($(this).hasClass('doubleH') && windowW > 767) {
				$(this).css({
					height: galleryH * 2 + 'px'
				});
			}
		});
		gallery.isotope('layout');
	}


	function isotopeGallery(gallery) {

		var gallery = $(gallery);

		if (gallery.length) {
			gallery.imagesLoaded(function () {
				setGallerySize(windowW, gallery);
			});
			gallery.isotope({
				itemSelector: '.gallery__item',
				masonry: {
					columnWidth: '.gallery__item:not(.doubleW)'
				}
			});
		}

		$('.view-more-gallery').on('click', function () {

			var item;
			var target = $(this).attr('data-load');

			$(this).hide();

			$.ajax({
				url: target,
				success: function (data) {
					$('#galleryPreload').append(data);

					$('#galleryPreload > div').each(function () {
						item = $(this);
						gallery.append(item).isotope('appended', item);
						setGallerySize(windowW, '.gallery');
					});


				}
			});

		})
	}

	// Isotope Filters (for gallery)

	function isotopeFilters(gallery) {
		var gallery = $(gallery);
		if (gallery.length) {
			var container = gallery;
			var optionSets = $(".filters-by-category .option-set"),
				optionLinks = optionSets.find("a");
			optionLinks.on('click', function (e) {
				var thisLink = $(this);
				if (thisLink.hasClass("selected")) return false;
				var optionSet = thisLink.parents(".option-set");
				optionSet.find(".selected").removeClass("selected");
				thisLink.addClass("selected");
				var options = {},
					key = optionSet.attr("data-option-key"),
					value = thisLink.attr("data-option-value");
				value = value === "false" ? false : value;
				options[key] = value;
				if (key === "layoutMode" && typeof changeLayoutMode === "function") changeLayoutMode($this, options);
				else {
					container.isotope(options);
					setGallerySize(windowW, gallery);
				}
				return false
			})
		}
	}

	// Gallery magnific Popup

	function galleryPopup(gallery) {
		var gallery = $(gallery);
		if (gallery.length) {
			$('a.btn', gallery).magnificPopup({
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		}
	}

	// Icon Animation

	function iconAnimation(icon) {
		$(icon).on('mouseenter', function () {
			$(this).addClass('hovered');
		}).on('mouseleave', function () {
			var $this = $(this);
			setTimeout(function () {
				$this.removeClass('hovered');
			}, 500);
		});
	}

	// Services

	function slickServices(windowW, carousel) {
		if (windowW < 768) {
			$(carousel).slick({
				mobileFirst: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 767,
					settings: "unslick",
				}]
			});
		}
	}

	// Icon Circle

	function slickIconcircle(windowW, carousel) {
		if (windowW < 768) {
			$(carousel).slick({
				mobileFirst: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: true,
				autoplaySpeed: 2000,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 767,
					settings: "unslick",
				}]
			});
		}
	}

	// Testimonials

	function slickTestimonials(windowW, carousel) {
		if (windowW < 768) {
			$(carousel).slick({
				mobileFirst: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				autoplay: false,
				arrows: false,
				dots: true,
				responsive: [{
					breakpoint: 767,
					settings: "unslick",
				}]
			});
		}
	}


	// post carousel
	function postCarousel(carousel) {
		$(carousel).slick({
			mobileFirst: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 2000,
			arrows: true,
			dots: false
		});
	}

	// double click fo touch devices

	function doubleTapIni(windowW) {
		$('.touch category-block__list a').doubleTapToGo();
		if (windowW > 767) {
			$('.touch ul.navbar-nav > li').each(function () {
				if ($(this).find('a').hasClass('dropdown-toggle')) {
					$(this).doubleTapToGo()
				}
			})
		}
	}

	// Add active class to opened accordion panel

	function panelActive(panel) {
		$(panel)
			.on('show.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').addClass('active');
			})
			.on('hide.bs.collapse', function (e) {
				$(e.target).prev('.panel-heading').removeClass('active');
			});
	}

	// Contact page form

	function contactForm(form) {
		var form = $(form);
		form.validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				message: {
					required: true,
					minlength: 20
				},
				email: {
					required: true,
					email: true
				}

			},
			messages: {
				name: {
					required: "Please enter your name",
					minlength: "Your name must consist of at least 2 characters"
				},
				message: {
					required: "Please enter message",
					minlength: "Your message must consist of at least 20 characters"
				},
				email: {
					required: "Please enter your email"
				}
			},
			submitHandler: function (form) {
				$(form).ajaxSubmit({
					type: "POST",
					data: $(form).serialize(),
					url: "process-contact.php",
					success: function () {
						$('#success').fadeIn();
						$('#contactform').each(function () {
							this.reset();
						});
					},
					error: function () {
						$('#contactform').fadeTo("slow", 0, function () {
							$('#error').fadeIn();
						});
					}
				});
			}
		});
	}

	//Initialize fuctions & methods
	menuIni(windowW);
	slideMobileMenu(windowW);
	stickyHeaderIni(windowW);
	modalSearch();
	openSlidemenu();
	backToTop();
	footerCollapse();
	parallaxIni();
	onScrollInit($('.animation'));
	onScrollInit($('.staggered-animation'), $('.staggered-animation-container'));
	isotopeGallery('.gallery');
	isotopeFilters('.gallery');
	galleryPopup('#gallery');
	slickServices(windowW);
	iconAnimation('.iconmove');
	panelActive('.panel-group');
	doubleTapIni(windowW);
	// Wave effect
	Waves.attach('button.wave');
	Waves.init();

	if ($('#contactform').length) {
		contactForm('#contactform');
	}

	// carousel
	if ($('.iconcircle-wrap').length) {
		slickIconcircle(windowW, '.iconcircle-wrap');
	}
	if ($('.services-block').length) {
		slickServices(windowW, '.services-block');
	}
	if ($('.testimonials-carousel').length) {
		slickTestimonials(windowW, '.testimonials-carousel');
	}
	if ($('.post-carousel').length) {
		postCarousel('.post-carousel');
	}


	$(window).resize(debouncer(function (e) {
		var currentW = window.innerWidth || $(window).width();
		if (currentW != prevW) {
			// start resize events
			menuIni(currentW);
			if ($('.iconcircle-wrap').length) {
				slickIconcircle(currentW, '.iconcircle-wrap');
			}
			if ($('.services-block').length) {
				slickServices(currentW, '.services-block');
			}
			if ($('.testimonials-carousel').length) {
				slickTestimonials(currentW, '.testimonials-carousel')
			}
			if (currentW < 767) {
				$(".header--small #slidemenu").show().removeClass('open');
			} else {
				$(".header--small #slidemenu").hide()
			}
			if (currentW > 767) {
				$('#slidemenu').css({
					'height': ''
				});
				$('body').removeClass('modal-open');
				$('#slidemenu').stop().animate({
					left: menuneg
				});
			} else {
				$('#slidemenu').css({
					'height': $(window).height()
				});
			}
			setGallerySize(currentW, '.gallery');
      setPostSize()
			// end resize events		
		}
		prevW = window.innerWidth || $(window).width();
	}));
})