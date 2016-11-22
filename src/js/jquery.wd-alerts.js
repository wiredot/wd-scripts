/*
 * wdAlerts
 * Ver: {version}
 * Simple jQuery Alerts
 * Autor: Piotr Soluch <psoluch@wiredot.com>
 * url: http://wiredot.com
 */

;(function ( $, window, document, undefined ) {

	var pluginName = 'wdAlert',
		defaults = {
			type: 'info',
			
			animationIn: 'moveDown', // moveDown, slideDown, dissolve, none
			animationInSpeed: 500,
			
			animationOut: 'dissolve', // slideDown, none
			animationOutSpeed: 500,
			hideAfter: 0,

			container: 'body',
			width: 'auto'

		};

	function Plugin ( method, options ) {
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		

		if (this[method]) {
			return this[method](this);
		}
	}

	Plugin.prototype = {

		showAlert: function(_) {
			_.removeAllAlerts(_);
            var alertId = _.generatealertId();
            _.alertId = alertId;
            
            var alertMessage = '<div id="' + alertId + '" class="wdAlert ' + _.options.type + '">';
            alertMessage+= '<a class="close">×</a>';
            alertMessage+= '<p class="title">' + _.options.title + '</p>';

            if (_.options.message) {
                alertMessage+= '<p>' + _.options.message + '</p>';
            }

            if (_.options.list) {
                alertMessage+= '<ul>';
                $.each(_.options.list, function( key, value ) {
                    alertMessage+= '<li>' + value + '</li>';
                });
                alertMessage+= '</ul>';
            }

            alertMessage+= '</div>';

            $(_.options.container).first().prepend(alertMessage);

            var alert = $('#' + alertId);
			
			// get alert width from options
			var alertWidth = _.options.width;
			
			// if alert width is auto, get the width of container
			if (_.options.width == 'auto') {
				alertWidth = $(_.options.container).width();
			}

			// set the width and hide the alert
			alert.outerWidth(alertWidth).hide();

            if (_.options.animationIn == 'slideDown') {
				alert.slideDown(_.options.animationInSpeed);
            }
            else if (_.options.animationIn == 'moveDown') {
				var alertHeight = alert.outerHeight();
				alert.css({
					'top': 0 - alertHeight / 2,
					'opacity': 0
				});
				alert.show().animate({
					'top': 20, 
					'opacity': 1
				}, _.options.animationInSpeed, 'swing');
            }
            else if (_.options.animationIn == 'dissolve') {
				alert.css('opacity',0).show().animate({'opacity': 1}, _.options.animationInSpeed);
            }
            else {
				alert.show();
            }

            if (_.options.hideAfter) {
				window.setTimeout(_.removeAlert, _.options.hideAfter, alertId, _);
            }

            $('#' + alertId + ' .close').click(function(event){
                event.preventDefault();
                _.removeAlert(alertId, _);
            });
		},

		removeAlert: function(alertId, _) {
			var alert = $('#' + alertId);
            alert.unbind();

			if (_.options.animationOut == 'moveUp') {
				alert.slideUp(_.options.animationOutSpeed, function(){
					alert.remove();
				});
            }
            else if (_.options.animationOut == 'dissolve') {
				alert.animate({opacity: 0}, _.options.animationOutSpeed, function(){
					alert.remove();
				});
            }
            else {
				alert.remove();
            }
		},

		removeAllAlerts: function(_) {
			$('.wdAlert').each(function(element){
				var alertId = $(this).attr('id');
				_.removeAlert(alertId, _);
			});
		},

		generatealertId: function(_) {
			var randomNumber = Math.floor(Math.random()*10001);
			var alertId = 'alert_' + randomNumber;

			if ($(alertId).lenght) {
				return _.generatealertId(_);
			}

			return alertId;
		},

		// ----------- PUBLIC METHODS ---------------
		
		_removeAllAlerts: function(_) {
			_.removeAllAlerts(_);
		},
	};

	$[pluginName] = function ( method , options) {
		var t = document.body;

		if (method === undefined || typeof method === 'object') {
			options = method;
			return $.data(t, pluginName, new Plugin('showAlert', options));
		}
		else {
			return $.data(t, pluginName, new Plugin('_' + method, options));
		}
		
	};

})( jQuery, window, document );