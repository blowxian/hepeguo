define(["require","backbone"], function(require) {
	var Backbone = require("backbone");
	var doT = require("doT");
	var Base = {};
	Base.View = Backbone.View.extend({
		doT: doT
	});
	Base.Model = Backbone.Model.extend({});
	Base.Collection = Backbone.Collection.extend({});
	Base.LocalStorage = require("localStorage");
	return Base;
});