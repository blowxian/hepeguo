/*
*iscroll
*
*/
/*
var onload = function() {
	var ISL = new IScroll("#wrapper", {
		probeType: 3,
		mouseWheel: true
	});
	var titles = document.getElementsByClassName("title");
	console.log(titles);
	ISL.on("scroll", function() {
		console.log(this.y);
	})
}
*/

/*
 *
 *自动隐藏地址栏和状态栏 < ios7
 *
 */
/*
 window.addEventListener("load", function() {
 	// Set a timeout...
 	setTimeout(function() {
 		// Hide the address bar!
 		window.scrollTo(0, 1);
 	}, 0);
 });
*/


/*
 *
 *在web app模式 添加到主屏之后，解决点击链接又跳转回Safari的问题
 *
 */
$(document).ready(function() {
	addToHomescreen();
	if (("standalone" in window.navigator) && window.navigator.standalone) {
		// For iOS Apps
		$('a').on('click', function(e) {
			e.preventDefault();
			var new_location = $(this).attr('href');
			if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined) {
				window.location = new_location;
			}
		});
	}
});