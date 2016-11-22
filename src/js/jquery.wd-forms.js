/*
 * wdForms
 * Ver: {version}
 * Simple jQuery Form Handler
 * Autor: Piotr Soluch <psoluch@wiredot.com>
 * url: http://wiredot.com
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'wdForm',
		defaults = {

			hideAnimation: 'slideUp',
			hideSpeed: 1000,

			messageAnimation: 'slideDown',
			messageSpeed: 1000,
			messagePosition: 'before',

			textContainer: 'span',
			loaderContainer: '.loading'
		};

	function Plugin ( element, options ) {
		this.form = element;
		this.options = $.extend( {}, defaults, options );
		this._name = pluginName;
		
		this.init();
	}

	Plugin.prototype = {

		init: function () {
			var _ = this;

			$(_.form).find('button').each(function(index, val) {
				$(this).click(function(){
					$(this).addClass('clicked');
				});
			});

			$(_.form).submit(function(){
				_.submitForm(_);
				return false;
			});
		},

		submitForm: function(_) {
			var formAction = $(_.form).attr('action');
			var formValues = $(_.form).serialize();

			_.showLoader(_);

			$.ajax({
                type: "POST",
                url: formAction,
                data: formValues,

                success: function(response) {
					_.hideLoader(_);

					$(_.form).removeClass('error');

					if (response.error) {
						$(_.form).addClass('error');
					}

					if (response.reset) {
						_.resetForm(_);
					}

					if (response.redirect) {
                        if (!response.redirect.delay) {
                            response.redirect.delay = 0;
                        }
                        setTimeout(function() {
                            window.location.href = response.redirect.url;
                        }, response.redirect.delay);
                    }

                    if (response.hide) {
						_.hideForm(_);
                    }

                    if (response.message) {
						_.showMessage(response.message, _);
                    }

                    if (response.alert) {
						_.showAlert(response.alert, _);
                    }

                    if (response.callback) {
						_.doCallback(response.callback, _);
                    }

                },
                error: function() {
					_.hideLoader(_);
                }
            });
		},

		showLoader: function(_) {
			// disable all buttons
			$(_.form).find('button').attr('disabled', 'disabled');
			
			// get a clicked button
			var button = $(_.form).find('button.clicked');
			if (button.size()) {
				button.find(_.options.textContainer).animate({'opacity': 0}, 200);
				button.find(_.options.loaderContainer).show().animate({'opacity': 1}, 200);
			}

			$(_.form).addClass('loading').find(':submit').attr('disabled', 'disabled');
		},

		hideLoader: function(_) {
			//enable all buttons
			$(_.form).find('button').removeAttr('disabled');

			// get a clicked button
			var button = $(_.form).find('button.clicked');
			if (button.size()) {
				button.removeClass('clicked');
				button.find(_.options.textContainer).animate({'opacity': 1}, 200);
				button.find(_.options.loaderContainer).show().animate({'opacity': 0}, 200);
			}

			$(_.form).removeClass('loading').find(':submit').removeAttr('disabled');
		},

		resetForm: function(_) {
			$(_.form)[0].reset();
		},

		hideForm: function(_) {

			if (_.options.hideAnimation == 'slideUp') {
				$(_.form).slideUp(_.options.hideSpeed);
			}
			else {
				$(_.form).hide();
			}
		},

		showMessage: function(message, _) {
			var messageBox = document.createElement( "div" );
			
			if (_.options.messagePosition == 'before') {
				$(_.form).before(messageBox);
			}
			else {
				$(_.form).after(messageBox);
			}

			if (_.options.messageAnimation == 'slideDown') {
				$(messageBox).hide().html(message).slideDown(_.options.messageSpeed);
			}
		},

		showAlert: function(alerts, _) {
			if (typeof $.wdAlert == 'function') {
				var alertOptions = $.extend( {}, _.options.alert, alerts );
				
				$.wdAlert(alertOptions);
			}
			else {
				var message = '';
				if (alerts.title) {
					message += alerts.title;
				}

				if (alerts.message) {
					if (alerts.title) {
						message += '\n';
					}
					message += alerts.message;
				}

				if (message.length) {
					alert(message);
				}
			}
		},

		doCallback: function(callback, _) {
			var fn = window[callback.function];
			fn(callback);
		},

		// -------------- PUBLIC METHODS --------------
		
		_resetForm: function(_) {
			_.resetForm(_);
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
