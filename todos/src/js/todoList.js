define(["require", "backbone", "localStorage", "todo"], function() {
  var Backbone = require("backbone");
  //require("localStorage");
  var Todo = require("todo");  
  var TodoList = Backbone.Collection.extend({
    model: Todo,
    localStorage: new Backbone.LocalStorage("todos-backbone"),
    done: function() {
      return this.where({
        done: true
      });
    },
    remaining: function() {
      return this.where({
        done: false
      });
    },

    nextOrder: function() {
      if (!this.length) return 1;
      return this.last().get('order') + 1;
    },
    comparator: 'order'
  });
  return TodoList;
})