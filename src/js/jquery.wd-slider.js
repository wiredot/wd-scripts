/*
 * wdSlider
 * Ver: {version}
 * Simple jQuery Slider
 * Autor: Piotr Soluch <psoluch@wiredot.com>
 * url: http://wiredot.com
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'wdSlider',
		defaults = {

			tagSlides: 'ul',
			tagSlide: 'li',

			tagNext: '.next',
			tagPrevious: '.previous',
			tagLegend: '.legend',

			showNavigation: true,
			showLegend: true,

			navigationHistory: true,

			autoplay: 0,

			loop: false,

			animationTime: 500,
		};

	function Plugin ( element, options ) {
		this.slider = element;
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		
		this.slides = $(this.slider).children(this.options.tagSlides);
		this.slide = $(this.slides).children(this.options.tagSlide);

		if (this.options.showNavigation) {
			this.previous = $(this.slider).find(this.options.tagPrevious);
			this.next = $(this.slider).find(this.options.tagNext);
		}

		if (this.options.showLegend) {
			this.legend = $(this.slider).find(this.options.tagLegend);
		}
		

		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var _ = this;

			//console.log(_);

			// get number of slides
			_.sliderCount = $(_.slider).children().children().length;

			// get the width of slider
			_.sliderWidth = $(_.slider).width();

			// calculate the total width of all slides
			_.sliderTotalWidth = _.sliderCount * _.sliderWidth;

			// set the total width of slider
			//$(_.slides).width(_.sliderTotalWidth);

			// set the width of each slide
			//$(_.slide).width(_.sliderWidth);

			$(_.slide).first().addClass('active');


			$(_.slide).each(function( index ){
				if (!$(this).attr('id')) {
					 var slideNr = index+1;
				} else {
					var slideNr = $(this).attr('id');
				}

				$(this).attr('id', 'slide_'+slideNr);
			});

			$(document).on('keyup', function(k) {
				// Next
				if (k.keyCode === 39) {
					_.showNextSlide(_);
				}

				// Prev
				if (k.keyCode === 37) {
					_.showPreviousSlide(_);
				}
			});

			_.showNavigation(_);
			_.showLegend(_);

			jQuery(window).on('hashchange', function(e){
				e.preventDefault();
				_.hashChange(_);
				return false;
			});
			
			_.hashChange(_);
		},

		hashChange: function(_) {
			var hash = location.hash;
			var slideNr = hash.replace('#','');
			if (!slideNr) {
				slideNr = 1;
			}
			_.showSlide(_, (slideNr - 1));
		},

		showNextSlide: function(_) {

			var activeSlide = _.returnActiveSlide(_);

			if (activeSlide < (_.sliderCount - 1)) {
				if (_.options.navigationHistory) {
					window.location.hash = '#'+(activeSlide + 2);
				} else {
					_.showSlide(_, (activeSlide + 1));
				}
			}
			else if (_.options.loop) {
				_.showSlide(_, (0));
			}
		},

		showPreviousSlide: function(_) {
			var activeSlide = _.returnActiveSlide(_);

			if (activeSlide > 0) {
				if (_.options.navigationHistory) {
					window.location.hash = '#'+(activeSlide);
				} else {
					_.showSlide(_, (activeSlide - 1));
				}
			}
			else if (_.options.loop) {
				_.showSlide(_, (_.sliderCount - 1));
			}
		},

		showSlide: function(_, slideIndex) {
			console.log(slideIndex);
			$(_.slides).animate({
						'margin-left': 0 - (_.sliderWidth * slideIndex)
				}, _.options.animationTime, function() {
					$(_.slide).removeClass('active');
					$(_.slide).eq(slideIndex).addClass('active');
					_.showNavigation(_);
			});
		},

		showNavigation: function(_) {
			var activeSlide = _.returnActiveSlide(_);

			if (activeSlide > 0 || _.options.loop) {
				$(_.previous).show().unbind().click(function(event) {
					event.preventDefault();

					_.showPreviousSlide(_);
				});
			}
			else {
				$(_.previous).hide();
			}

			if (activeSlide < (_.sliderCount - 1) || _.options.loop) {
				$(_.next).show().unbind().click(function(event) {
					event.preventDefault();

					_.showNextSlide(_);
				});
			}
			else {
				$(_.next).hide();
			}
		},

		showLegend: function(_) {

		},

		returnActiveSlide: function(_) {
			var activeSlide = 0;
			$(_.slide).each(function( index ){
				if ($(this).hasClass('active')) {
					//console.log(index);
					activeSlide = index;
				}
			});

			return activeSlide;
		}
	};

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
		});
	};

})( jQuery, window, document );