Sudoku.module("Field", function (Field, Sudoku, Backbone, Marionette, $, _) {
  
    var currentCell = null;
    var field = null;

    var API = {
        createField: function () {
            field = new Sudoku.Entities.Field(Sudoku.FieldData.generate());
            Sudoku.field.show(new Field.View({ model: field }));
        },

        setCurrentCell: function (cellModel) {
            currentCell = cellModel;
        },

        getCurrentCell: function () {
            return currentCell;
        },

        openCell: function () {
            var curCell = this.getCurrentCell();
            if (curCell)
                curCell.open();
        },

        checkField: function () {
            alert(Sudoku.FieldData.check(field.getRawFieldData()));
        }
    };

    Field.on('setCurrentCell', function (cellModel) {
        API.setCurrentCell(cellModel);
    });

    Sudoku.commands.setHandler('new:game', function () {
        API.createField();
    });

    Sudoku.commands.setHandler('check:field', function () {
        API.checkField();
    });

    Sudoku.commands.setHandler('open:cell', function () {
        API.openCell();
    });

    Field.on("start", function () {
        API.createField();
    });
});
