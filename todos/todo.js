define(["require", "backbone", "localStorage", "todoList"], function(require) {
  require("backbone");

  require("localStorage");
  //var TodoList = require("todoList");
  //var Todos = new TodoList;
  var Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        //order: Todos.nextOrder(),
        done: false
      };
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({
        done: !this.get("done")
      });
    }

  });
  return Todo;
})