$(document).ready(function(){

	// initialize wdForm
	$('.wdForm').wdForm();

	goSpinner();

});

function goSpinner() {
	var opts = {
		lines: 8, // The number of lines to draw
		length: 2, // The length of each line
		width: 2, // The line thickness
		radius: 3, // The radius of the inner circle
		corners: 1, // Corner roundness (0..1)
		rotate: 0, // The rotation offset
		direction: 1, // 1: clockwise, -1: counterclockwise
		color: '#fff', // #rgb or #rrggbb or array of colors
		speed: 1, // Rounds per second
		trail: 60, // Afterglow percentage
		shadow: false, // Whether to render a shadow
		hwaccel: false, // Whether to use hardware acceleration
		className: 'spinner', // The CSS class to assign to the spinner
		zIndex: 2e9, // The z-index (defaults to 2000000000)
		top: 0, // Top position relative to parent in px
		left: 0 // Left position relative to parent in px
	};

	$('.loader').each(function(el){

		var spinner = new Spinner(opts).spin(this);
	});
}