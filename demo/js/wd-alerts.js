$(document).ready(function(){

	//$.wdAlert();
	//$.wdAlert({'type': 'info'});
	//$.wdAlert('notification', {'sadasd': 'asdas'});
	//$.wdAlert();

	// initialize wdAlert
	$('.showInfo').click(function(event) {
		event.preventDefault();
		var element = $.wdAlert({
			title: 'Hello World',
			list: {
				asdads: 'asdasd',
				qweq: 'asdasd',
				xcv: 'asdasd'
			},
			container: '#wrapper'
		});

		console.log(element);
	});

	$('.showError').click(function(event) {
		event.preventDefault();
		$.wdAlert({
			type: 'error',
			title: 'Ups!',
			message: 'Something <a href="#">went wrong</a>.'
		});
	});

	$('.showSuccess').click(function(event) {
		event.preventDefault();
		$.wdAlert({
			type: 'success',
			title: 'Hello World',
			hideAfter: 2000,
			animationIn: 'dissolve'
		});
	});

	$('.showWarning').click(function(event) {
		event.preventDefault();
		$.wdAlert({
			type: 'warning',
			title: 'Hello World',
			animationIn: 'none'
		});
	});

	$('.removeAll').click(function(event) {
		event.preventDefault();
		$.wdAlert('removeAllAlerts');
	});
});