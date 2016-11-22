/*
 * wdAccordion
 * Ver: 0.2.1
 * Simple jQuery Slider
 * Autor: Piotr Soluch <psoluch@wiredot.com>
 * url: http://wdscripts.wiredot.com
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'wdAccordion',
		defaults = {

			animation: 'slide',
			speed: '500',

			boxContainer: 'wdAccordionBox'
		};

	function Plugin ( element, options ) {
		this.link = element;
		this.options = $.extend( {}, defaults, options );
		this._name = pluginName;
		
		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var _ = this;

			_.destroy(_);

			$(_.link).click(function(event){
                event.preventDefault();
                _.anchor = $(_.link).attr('href');

                _.status = _.getStatus(_);

                var group = $(_.link).attr('data-group');
                
                if (group) {

					if (!$(this).hasClass('active')) {
						$('.wdAccordion').each(function(){
							if ($(this).attr('data-group') == group) {
								var groupAnchor = $(this).attr('href');
								_.hide(groupAnchor, this);
							}
						});
						_.show(_.anchor, _.link);
					}

				}
				else {
					if (_.status) {
						_.hide(_.anchor, _.link);
					}
					else {
						_.show(_.anchor, _.link);
					}
                }
            });
		},

		destroy: function(_) {
			$(_.link).unbind();
		},

		show: function(anchor, link) {
			$(anchor).slideDown(function(){
				$(link).addClass('active');
                $(this).addClass('active');
            });
		},

		hide: function(anchor, link) {
			$(anchor).slideUp(function(){
                $(link).removeClass('active');
                $(this).removeClass('active');
            });
		},

		getStatus: function(_) {
			return $(_.anchor).hasClass('active');
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