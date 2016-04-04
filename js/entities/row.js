Sudoku.module("Entities", function (Entities, Sudoku, Backbone, Marionette, $, _) {
    Entities.Row = Backbone.Model.extend({
        constructor: function (data, options) {
            data.cells = new Entities.CellCollection(data);

            Backbone.Model.apply(this, [data, options]);
        }
    });

    Entities.RowCollection = Backbone.Collection.extend({
        model: Entities.Row
    });
});
