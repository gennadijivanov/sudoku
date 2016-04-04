Sudoku.module("Entities", function (Entities, Sudoku, Backbone, Marionette, $, _) {
    Entities.Cell = Backbone.Model.extend({
        defaults: {
            opened: true,
            value: 0,
            'user-value': 0
        },

        open: function () {
            this.set({ opened: true });
        }
    });
    
    Entities.CellCollection = Backbone.Collection.extend({
        model: Entities.Cell
    });
});
