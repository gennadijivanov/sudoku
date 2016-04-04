Sudoku.module("Toolbar", function (Toolbar, Sudoku, Backbone, Marionette, $, _) {
  
    Toolbar.View = Backbone.View.extend({
        el: '#toolbar',

        events: {
            "click span.new-game": "onNewGame",
            "click span.check-field": "onCheckField",
            "click span.open-cell": "onOpenCell"
        },

        onNewGame: function () {
            this.trigger("newGame");
        },

        onCheckField: function () {
            this.trigger("checkField");
        },

        onOpenCell: function () {
            this.trigger("openCell");
        }
    });
});
