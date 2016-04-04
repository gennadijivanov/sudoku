var Sudoku = new Backbone.Marionette.Application();

Sudoku.addRegions({
    toolbar: '#toolbar',
    field: '#field'
});

$(function () {
    Sudoku.start();
});
