define(function(require, exports, module) {
    var Base = require("Base");
    var TodoList = require("todoList");
    var TodoView = require("TodoView");
    var item = require("text!../tpl/stats.tpl");
    var iScroll = require("iScroll");
    var Todos = new TodoList;
    var AppView = Base.View.extend({
        el: $("#todoapp"),
        events: {
            "keypress #new-todo": "createOnEnter",
            "click #clear-completed": "clearCompleted",
            "click #toggle-all": "toggleAllComplete"
        },
        initialize: function() {
            this.statsTemplate = this.doT.template(item),
            this.input = this.$("#new-todo");
            this.allCheckbox = this.$("#toggle-all")[0];

            this.listenTo(Todos, 'add', this.addOne);
            this.listenTo(Todos, 'reset', this.addAll);
            this.listenTo(Todos, 'all', this.render);

            this.footer = this.$('footer');
            this.main = $('#main');
            this.scroller = new IScroll("#wrapper", {
                mouseWheel: true,
                click: true,
                tap: true
            });

            Todos.fetch();
        },
        render: function() {
            var done = Todos.done().length;
            var remaining = Todos.remaining().length;

            if (Todos.length) {
                this.main.show();
                this.footer.show();
                this.footer.html(this.statsTemplate({
                    done: done,
                    remaining: remaining
                }));
            } else {
                this.main.hide();
                this.footer.hide();
            }
            this.scroller.refresh();
            this.allCheckbox.checked = !remaining;
        },
        addOne: function(todo) {
            var view = new TodoView({
                model: todo
            });
            this.$("#todo-list").append(view.render().el);
        },
        addAll: function() {
            Todos.each(this.addOne, this);
        },

        createOnEnter: function(e) {
            if (e.keyCode != 13) return;
            if (!this.input.val()) return;

            Todos.create({
                title: this.input.val()
            });
            this.input.val('');
            this.input.blur();
        },

        clearCompleted: function() {
            _.invoke(Todos.done(), 'destroy');
            return false;
        },

        toggleAllComplete: function() {
            var done = this.allCheckbox.checked;
            Todos.each(function(todo) {
                todo.save({
                    'done': done
                });
            });
        }

    });
    return AppView;
});
