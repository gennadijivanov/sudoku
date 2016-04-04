Sudoku.module("FieldData", function (FieldData, Sudoku, Backbone, Marionette, $, _) {
    var ERROR_TEXT = 'В решении есть ошибки';
    var NO_ERROR_TEXT = 'В решении нет ошибок';
    var COMPLETE_TEXT = 'Поздравляю Вас! Вы правильно решили Судоку';

    var AREA_SIZE = 3;
    var FIELD_SIZE = AREA_SIZE * AREA_SIZE;

    var OPENED_CELLS_PERCENT = 0.4;
    var MATRIX_MIX_DEFAULT_COUNT = 5;

    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    var getRandomIndexInArea = function () {
        return getRandomInt(0, AREA_SIZE - 1);
    };

    var createBaseMatrix = function () {
        var matrix = [];

        for (var i = 0; i < AREA_SIZE; i++)
            for (var j = 0; j < AREA_SIZE; j++) {
                var row = [];

                for (var k = 0; k < FIELD_SIZE; k++)
                    row.push({
                        value: (k + i + j * AREA_SIZE) % FIELD_SIZE + 1,
                        opened: true
                    });

                matrix[i * AREA_SIZE + j] = row;
            }

        return matrix;
    };

    var transpose = function (matrix) {
        return _.zip.apply(_, matrix);
    };

    var swapRows = function (matrix, n1, n2) {
        if (!n1) {
            var area = getRandomIndexInArea();
            var line1 = getRandomIndexInArea();
            n1 = area * AREA_SIZE + line1;

            var line2 = getRandomIndexInArea();
            while (line1 == line2)
                line2 = getRandomIndexInArea();

            n2 = area * AREA_SIZE + line2;
        }

        var tmpRow = matrix[n1];
        matrix[n1] = matrix[n2];
        matrix[n2] = tmpRow;

        return matrix;
    };

    var swapColumns = function (matrix) {
        return transpose(swapRows(transpose(matrix)));
    };

    var swapRowsArea = function (matrix) {
        var area1 = getRandomIndexInArea();
        var area2 = getRandomIndexInArea();
        while (area1 == area2)
            area2 = getRandomIndexInArea();

        for (var i = 0; i < AREA_SIZE; i++) {
            var n1 = area1 * AREA_SIZE + i;
            var n2 = area2 * AREA_SIZE + i;
            matrix = swapRows(matrix, n1, n2);
        }

        return matrix;
    };

    var swapColumnsArea = function (matrix) {
        return transpose(swapRowsArea(transpose(matrix)));
    };

    var mix = function (matrix, mixCount) {
        if (!mixCount)
            mixCount = MATRIX_MIX_DEFAULT_COUNT;

        var mixFunc = [
            transpose,
            swapRows,
            swapColumns,
            swapRowsArea,
            swapColumnsArea
        ];

        for (var i = 0; i < mixCount; i++) {
            matrix = mixFunc[getRandomInt(0, mixFunc.length - 1)](matrix);
        }

        return matrix;
    };

    var closeCells = function (matrix) {
        var cellsForClose = FIELD_SIZE * FIELD_SIZE * (1 - OPENED_CELLS_PERCENT);

        while (cellsForClose > 0) {
            var cell = matrix[getRandomInt(0, FIELD_SIZE - 1)][getRandomInt(0, FIELD_SIZE - 1)];

            if (cell.opened) {
                cell.opened = false;
                cellsForClose--;
            }
        }

        return matrix;
    };

    var checkMatrix = function (matrix) {
        var matrixForSolver = _.map(matrix, function (row) {
            return _.map(row, function (cell) {
                return cell.opened ? cell.value : '.';
            }).join('');
        }).join('');
        var solver = sudoku_solver();
        var solutionsCount = solver(matrixForSolver).length;
        return solutionsCount == 1;
    };

    FieldData.generate = function () {
        var matrix;
        do {
            matrix = closeCells(mix(createBaseMatrix()));
        } while (!checkMatrix(matrix));
        return matrix;
    };

    FieldData.check = function (fieldData) {
        var hasEmptyCells = false;

        for (var r = 0, rLen = fieldData.length; r < rLen; r++) {
            var row = fieldData[r];

            for (var c = 0, cLen = row.length; c < cLen; c++) {
                var cell = row[c];

                if (cell.opened)
                    continue;

                if (!cell['user-value']) {
                    hasEmptyCells = true;
                    continue;
                }

                if (cell.value != cell['user-value'])
                    return ERROR_TEXT;
            }
        }

        return hasEmptyCells ? NO_ERROR_TEXT : COMPLETE_TEXT;
    };
});
