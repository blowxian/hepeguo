define(function() {
	var tpl = '<div class="view"><input class="toggle" type="checkbox" {{? it.done}}checked="checked"{{?}} /><label>{{= it.title}}</label><a class="destroy"></a></div><input class="edit" type="text" value="{{= it.title}}" />';
	return tpl;
})