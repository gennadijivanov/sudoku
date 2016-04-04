Sudoku.module("Toolbar", function (Toolbar, Sudoku, Backbone, Marionette, $, _) {

    Toolbar.Controller = {
        showToolbar: function () {
            var view = new Toolbar.View();

            view.on('newGame', function () {
                Sudoku.execute('new:game');
            });

            view.on('checkField', function () {
                Sudoku.execute('check:field');
            });

            view.on('openCell', function () {
                Sudoku.execute('open:cell');
            });

            Sudoku.toolbar.attachView(view);
        }
    };

    Toolbar.on("start", function () {
        Toolbar.Controller.showToolbar();
    });
});
