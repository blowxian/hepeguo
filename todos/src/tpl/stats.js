define(function() {
	var tpl = "{{? it.done}}<a id='clear-completed'>Clear {{= it.done}} completed {{? it.done == 1}}item{{??}}items{{?}}</a>{{?}}<div class='todo-count'><b>{{= it.remaining}}</b> {{? it.remaining == 1}}item{{??}}items{{?}} left</div>";
	return tpl;
});