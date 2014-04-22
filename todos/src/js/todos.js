(function() {
  "use strict";
  var paths, shim, lib;
  lib = "../../lib/";
  shim = {
    "backbone": {
      deps: ["underscore", "jquery", "doT"],
      exports: "Backbone"
    },
    "underscore": {
      exports: "_"
    }
  };
  /**
   * Paths of Javascript Library
   */
  paths = {
    "jquery": lib + "jquery-2.0.3",
    "backbone": lib + "backbone",
    "underscore": lib + "underscore",
    "doT": lib + "doT",
    "json2": lib + "json2",
    "localStorage": lib + "backbone.localStorage",
    "text": lib + "text"
  };
  /**
   * Configure requirejs.
   */
  require.config({
    shim: shim,
    paths: paths
  });
}());


define(function(require, exports, module) {
  var AppView = require("AppView");
  var App = new AppView;
  //var tpl = require("text!../../tpl/item.tpl");
  //console.log(tpl);

  /* add doT

  var doT = require("doT");
  console.log(doT);
  var nameTpl = doT.template("<h1>{{=it.name}}</h1>");
  var guo = nameTpl({name: "guozhenyong"});
  console.log(guo);
  $("#main").html(guo);
  */
});