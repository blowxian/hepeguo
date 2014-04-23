define(["require", "backbone", "localStorage", "todo"], function(require) {
  var Base = require("Base");
  var Todo = require("todo");  
  var TodoList = Base.Collection.extend({
    model: Todo,
    localStorage: new Base.LocalStorage("todos-backbone"),
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