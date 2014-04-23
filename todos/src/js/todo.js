define(["require", "todoList"], function(require) {
  var Base = require("Base");
  //var TodoList = require("todoList");
  //var Todos = new TodoList;
  var Todo = Base.Model.extend({

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