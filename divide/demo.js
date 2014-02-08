var num2 = function(arr) {
	var html = "";
	for (var i = 1; i < arr.length; i++) {
		for (var j = 0; j < arr[i].length; j++) {
			if (arr[i][j].getValue() == -1) {
				html += "<div class='number hide row" + i + "'>&nbsp</div>";
			} else {
				html += "<div class='number row" + i + "'>" + arr[i][j].getValue() + "</div>";
			}
		}
		html += "<br />";
	}
	document.getElementById("num2").innerHTML = html;
}
var num1 = function(arr) {
	var html = "";
	for (var i = 0; i < arr.length; i++) {
		html += "<div class='number row0'>" + arr[i].getValue() + "</div>";
		document.getElementById("num1").innerHTML = html;
	}
}

var answer = new Divide(19, 181900);
answer.getAnswer();
num2(answer.list);
num1(answer.list[0])