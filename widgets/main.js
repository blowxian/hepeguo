var fs = require('fs');
var path = require('path');
var argv = require('optimist').
default ({
	ext: "json",
	path: "./controls/",
	lan: "en"
}).argv;

var config = {
	ext: argv.ext,
	path: argv.path,
	lan: argv.lan
};

var getFile = function(path) {
	var data = fs.readFileSync(path, 'utf8');
	data = JSON.parse(data);
	return data;
};
var i18n = function(object, file) {
	for (var key in object) {
		var value = object[key] ? object[key] : "";
		if (typeof value == "object") {
			if (value.length) {
				value.forEach(function(item, index) {
					i18n(item, file);
				});
			} else {
				i18n(value, file);
			}
		} else if (value.toString().indexOf("__MSG_") > -1) {
			var keys = value.split("__MSG_")[1].split("__")[0].split(".");
			var length = keys.length;
			switch (length) {
				case 1:
					object[key] = en[file][keys[0]];
					break;
				case 2:
					object[key] = en[file][keys[0]][keys[1]];
					break;
				case 3:
					object[key] = en[file][keys[0]][keys[1]][keys[2]];
					break;
				case 4:
					object[key] = en[file][keys[0]][keys[1]][keys[2]][keys[3]];
			}
		}
	}
};

var dataEn = [],
	dataCh = [],
	en, zh;

var controls = getFile(path.join(config.path, "controls.json"));
controls.forEach(function(item, index) {
	var package = getFile(path.join(config.path, item, "/package.json"));
	var signal, slot, option;
	if (package.options) option = getFile(path.join(config.path, item, package.options));
	if (package.signals) signal = getFile(path.join(config.path, item, package.signals));
	if (package.slots) slot = getFile(path.join(config.path, item, package.slots));
	var control = {
		name: item,
		package: package,
		options: option,
		signals: signal,
		slots: slot
	};
	en = getFile(path.join(config.path, item, "_locales/en-US/package.json"));
	zh = getFile(path.join(config.path, item, "_locales/zh-CN/package.json"));

	i18n(control.package, "package");
	i18n(control.options, "options");
	if (control.signals) i18n(control.signals, "signals");
	if (control.slots) i18n(control.slots, "slots");

	dataEn.push(control);
});


console.log(dataEn);

//console.log(config);