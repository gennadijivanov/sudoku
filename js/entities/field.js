Sudoku.module("Entities", function (Entities, Sudoku, Backbone, Marionette, $, _) {
    Entities.Field = Backbone.Model.extend({
        constructor: function (data, options) {
            data.rows = new Entities.RowCollection(data);

            Backbone.Model.apply(this, [data, options]);
        },

        getRawFieldData: function () {
            var data = [];
            this.get('rows').each(function (row) {
                data.push(row.get('cells').toJSON());
            });
            return data;
        }
    });
});
