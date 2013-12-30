exports.tpl = function () {
	return '{{~ it:v:i}}<h1>{{=i + 1}}{{=v.name}}</h1>{{~ v.options:vv}}<h3>{{= vv.displayName}}</h3>{{~}}{{~}}';
};