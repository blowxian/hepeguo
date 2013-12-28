var fs = require('fs');
var path = require('path');
var argv = require('optimist').
default ({
	ext: "md",
	path: "./controls/",
	lan: "en"
}).argv;
var dot = require('dot');
var tpl = require("./tpl.js").tpl();

// var foo = {
// 	foo: "guozy"
// };
// var doc = dot.template(tpl)(foo);

var config = {
	ext: argv.ext,
	path: argv.path,
	lan: argv.lan
};

var data = [],
	lanFile;
var controls = getFile(path.join(config.path, "controls.json"));

start();


function start() {
	if (config.lan == "en") {
		if (config.ext == "html" || config.ext == "MD" || config.ext == "md") {
			getData(config.ext, "en");
		} else if (config.ext == "both") {
			getData("html", "en");
			getData("md", "en");
		} else {
			console.log("ext must be 'md' or 'html' or 'both'!")
		}

	} else if (config.lan == "zh") {
		//getData(config.ext, "zh");
		if (config.ext == "html" || config.ext == "MD" || config.ext == "md") {
			getData(config.ext, "zh");
		} else if (config.ext == "both") {
			getData("html", "zh");
			getData("md", "zh");
		} else {
			console.log("ext must be 'md' or 'html' or 'both'!")
		}
	} else if (config.lan == "both") {
		//getData(config.ext, "zh");
		//getData(config.ext, "en");
		if (config.ext == "html" || config.ext == "MD" || config.ext == "md") {
			getData(config.ext, "en");
			getData(config.ext, "zh");
		} else if (config.ext == "both") {
			getData("html", "en");
			getData("md", "en");
			getData("html", "zh");
			getData("md", "zh");
		} else {
			console.log("ext must be 'md' or 'html' or 'both'!")
		}
	} else {
		console.log("lan must be 'en' or 'zh' or 'both'!");
	}
};

function getFile(path) {
	var data = fs.readFileSync(path, 'utf8');
	data = JSON.parse(data);
	return data;
};

function i18n(object, file) {
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
					object[key] = lanFile[file][keys[0]];
					break;
				case 2:
					object[key] = lanFile[file][keys[0]][keys[1]];
					break;
				case 3:
					object[key] = lanFile[file][keys[0]][keys[1]][keys[2]];
					break;
				case 4:
					object[key] = lanFile[file][keys[0]][keys[1]][keys[2]][keys[3]];
			}
		}
	}
};

function getData(ext, lan) {
	data.length = 0;
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
		if (lan == "en") {
			lanFile = getFile(path.join(config.path, item, "_locales/en-US/package.json"));
		} else if (lan == "zh") {
			lanFile = getFile(path.join(config.path, item, "_locales/zh-CN/package.json"));
		}

		i18n(control.package, "package");
		i18n(control.options, "options");
		if (control.signals) i18n(control.signals, "signals");
		if (control.slots) i18n(control.slots, "slots");

		data.push(control);
	});

	fs.writeFileSync("doc-" + lan + "." + ext, JSON.stringify(data, null, 4));
};

//fs.writeFileSync("doc.json", JSON.stringify(data, null, 4));
//fs.writeFileSync("doc.html", doc);