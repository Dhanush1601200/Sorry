/*
 * http://love.hackerzhou.me
 * Script for typewriter effect and relationship timer
 */

// Get window size
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

// Refresh the page if window size changes (both width and height)
$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        location.replace(location); // Reloads the page
    }
});

// jQuery plugin for typewriter effect
(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this),
			    str = $ele.html(), // Store original HTML
			    progress = 0;

			$ele.html(''); // Clear current content

			var timer = setInterval(function() {
				var current = str.substr(progress, 1);

				// Skip over HTML tags
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}

				// Show text with a blinking underscore effect
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));

				// Stop when all text is typed
				if (progress >= str.length) {
					clearInterval(timer);
				}
			}, 75); // Speed: 75ms per character
		});
		return this;
	};
})(jQuery);

// Function to calculate time elapsed since a given date
function timeElapse(date) {
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);

	var hours = Math.floor(seconds / 3600);
	if (hours < 10) hours = "0" + hours;

	seconds = seconds % 3600;

	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) minutes = "0" + minutes;

	seconds = seconds % 60;
	if (seconds < 10) seconds = "0" + seconds;

	// Format the result in English
	var result = "Day <span class=\"digit\">" + days + "</span>, " +
	             "<span class=\"digit\">" + hours + "</span> Hours, " +
	             "<span class=\"digit\">" + minutes + "</span> Minutes, " +
	             "<span class=\"digit\">" + seconds + "</span> Seconds";

	// Display the result inside the #clock element
	$("#clock").html(result);
}
