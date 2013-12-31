var fs = require('fs');
var path = require('path');
var argv = require('optimist').
default ({
	ext: "md",
	path: "./controls/",
	lan: "zh",
	tpl: "./home.md"
}).argv;
var dot = require('dot');
var toMarkDown = require("to-markdown").toMarkDown;
//var tpl = require("./tpl.js").tpl();

var config = {
	ext: argv.ext.toLowerCase(),
	lan: argv.lan.toLowerCase(),
	path: argv.path,
	tpl: argv.tpl
};

var data = [],
	lanFile;
var controls = getFile(path.join(config.path, "controls.json"));
var tpl = fs.readFileSync(config.tpl, "utf8");

if(controls) {	
	start();
}

function start() {
	if (config.lan == "en") {
		if (config.ext.to == "html" || config.ext == "md") {
			getData(config.ext, "en");
		} else if (config.ext == "both") {
			getData("html", "en");
			getData("md", "en");
		} else {
			console.log("ext must be 'md' or 'html' or 'both'!")
		}

	} else if (config.lan == "zh") {
		if (config.ext == "html" || config.ext == "md") {
			getData(config.ext, "zh");
		} else if (config.ext == "both") {
			getData("html", "zh");
			getData("md", "zh");
		} else {
			console.log("ext must be 'md' or 'html' or 'both'!")
		}
	} else if (config.lan == "both") {
		if (config.ext == "html" || config.ext == "md") {
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
			name: item.substring(0, 1).toUpperCase() + item.substring(1),
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
		control.signals = obj2array(control.signals);
		control.slots = obj2array(control.slots);

		data.push(control);
	});
	var doc = dot.template(tpl)(data);
	fs.writeFileSync("doc-" + lan + "." + ext, doc);
};

function obj2array(obj) {
	if(!obj || typeof obj != "object") {
		return obj;
	}
	var A = [];
	for(var key in obj) {
		obj[key].name = key;
		A.push(obj[key]);
	}
	return A;
}

//fs.writeFileSync("doc.json", JSON.stringify(data, null, 4));
//fs.writeFileSync("doc.html", doc);