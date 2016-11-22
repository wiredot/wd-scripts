/*
 * wd Nav
 * Ver: 0.0.1
 * Simple responsive navigation
 * Autor: Piotr Soluch <psoluch@wiredot.com>
 * url: http://wiredot.com
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'wdNav',
		defaults = {

			navigationButtonClass: 'wdnav_show_navigation',
			navigationButtonContent: '☰',

			container: 'body',
			navigation: 'ul',

			containerMargin: $('body').css('margin-left'),

			menuSpeed: 300,
			menuWidth: '200px',

			minWidth: '500px'
		};

	function Plugin ( element, options ) {
		this.nav = element;
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var _ = this;

			_.windowResize(_);

			$('.' + _.options.navigationButtonClass).click(function(event) {
				_.toggleNavigation(_);
			});

			$(window).resize(function(){
				_.windowResize(_);
			})
		},

		toggleNavigation: function (_) {
			if ($('html').hasClass('wdnav_opened')) {
				_.closeNavigation(_);
			} else {
				_.openNavigation(_);
			}
		},

		openNavigation: function (_) {
			$('html').addClass('wdnav_opened');
			
			$(_.nav).children(_.options.navigation).animate({
				'margin-left': '0'
			},
				_.options.menuSpeed, function() {
			});

			$(_.options.container).animate({
				'margin-left': _.addSizes(_.options.menuWidth, _.options.containerMargin)
			},
				_.options.menuSpeed, function() {
				$(_.options.container).click(function(event) {
					_.closeNavigation(_);
				});
			});
		},

		closeNavigation: function (_) {
			$('html').removeClass('wdnav_opened');

			$(_.options.container).unbind('click');

			$(_.nav).children(_.options.navigation).animate({
				'margin-left': '-' + _.options.menuWidth
			},
				_.options.menuSpeed, function() {
			});

			$(_.options.container).animate({
				'margin-left': _.options.containerMargin
			},
				_.options.menuSpeed, function() {
			});
		},

		windowResize: function (_) {
			var windowWidth = $(window).width();
			var minWidth = _.options.minWidth.replace('px', '');
			if (windowWidth <= minWidth) {
				$('html').addClass('wdnav_show');
			} else {
				$('html').removeClass('wdnav_show');
			}
		},

		addSizes: function (sizea, sizeb) {
			var size = sizea.replace('px', '') * 1 + sizeb.replace('px', '') * 1;

			return size + 'px';
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