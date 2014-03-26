(function() {
	var fs = require('fs');
	var path = require('path');
	var argv = require('optimist').
	default ({
		ext: "md",
		path: "../../",
		lang: "zh",
		tpl: "./template.md"
	}).argv;
	var dot = require('dot');
	var toMD = require('to-markdown').toMarkdown;

	//var tpl = require("./tpl.js").tpl();

	var config = {
		ext: argv.ext.toLowerCase(),
		lang: argv.lang.toLowerCase(),
		path: argv.path,
		tpl: argv.tpl
	};

	var data = [],
		langFile;
	var controls = getFile(path.join(config.path, "controls.json"));
	var tpl = fs.readFileSync(config.tpl, "utf8");

	if (controls) {
		start();
	}

	function start() {
		if (config.lang == "en") {
			if (config.ext.to == "html" || config.ext == "md") {
				getData(config.ext, "en");
			} else if (config.ext == "both") {
				getData("html", "en");
				getData("md", "en");
			} else {
				console.log("ext must be 'md' or 'html' or 'both'!")
			}

		} else if (config.lang == "zh") {
			if (config.ext == "html" || config.ext == "md") {
				getData(config.ext, "zh");
			} else if (config.ext == "both") {
				getData("html", "zh");
				getData("md", "zh");
			} else {
				console.log("ext must be 'md' or 'html' or 'both'!")
			}
		} else if (config.lang == "both") {
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
			console.log("lang must be 'en' or 'zh' or 'both'!");
		}
	};

	function getFile(path) {
		if (!fs.existsSync(path)) {
			console.log(path + " can not find!!!");
			return
		}
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
						object[key] = langFile[file][keys[0]];
						break;
					case 2:
						object[key] = langFile[file][keys[0]][keys[1]];
						break;
					case 3:
						object[key] = langFile[file][keys[0]][keys[1]][keys[2]];
						break;
					case 4:
						object[key] = langFile[file][keys[0]][keys[1]][keys[2]][keys[3]];
				}
			}
		}
	};

	function getData(ext, lang) {
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
			if (lang == "en") {
				langFile = getFile(path.join(config.path, item, "_locales/en-US/package.json"));
			} else if (lang == "zh") {
				langFile = getFile(path.join(config.path, item, "_locales/zh-CN/package.json"));
			}

			i18n(control.package, "package");
			i18n(control.options, "options");
			if (control.signals) i18n(control.signals, "signals");
			if (control.slots) i18n(control.slots, "slots");
			control.signals = obj2array(control.signals);
			control.slots = obj2array(control.slots);

			author(control.package);

			data.push(control);
		});
		data.date = _date();
		//console.log(data);
		var doc = dot.template(tpl)(data);
		if (ext == "md") {
			doc = toMD(doc)
		}
		fs.writeFileSync("doc-" + lang + "." + ext, doc);
	};

	function author(obj) {
		for (var key in obj) {
			if (key == "author") {
				var author = obj.author;
				obj.author = author.split("<")[0].split(" ")[0];
				obj.mail = author.split("<")[1].split(">")[0];
			}
		}
	}

	function obj2array(obj) {
		if (!obj || typeof obj != "object") {
			return obj;
		}
		var A = [];
		for (var key in obj) {
			obj[key].name = key;
			A.push(obj[key]);
		}
		return A;
	}

	function _date() {
		var date = new Date();
		return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
	}
}());

//fs.writeFileSync("doc.json", JSON.stringify(data, null, 4));