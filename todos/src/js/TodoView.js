define(function(require) {
  var Base = require("Base");
  var Todo = require("todo");
  var item = require("text!../tpl/item.tpl");
  var TodoView = Base.View.extend({
    tagName: "li",
    events: {
      "touchend .toggle": "toggleDone",
      "dblclick .view": "edit",
      "click a.destroy": "clear",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "close",
      "touchend .view": "toggleDone"
    },

    initialize: function() {
      this.template = this.doT.template(item),
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },

    toggleDone: function() {
      this.model.toggle();
      console.log("toggleDone");
      //let input auto blur
      $("#new-todo").blur();
    },

    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },

    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({
          title: value
        });
        this.$el.removeClass("editing");
      }
    },

    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    clear: function() {
      this.model.destroy();
    }

  });
  return TodoView;
});