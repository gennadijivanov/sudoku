Sudoku.module("Field", function (Field, Sudoku, Backbone, Marionette, $, _) {
  
    Field.Cell = Backbone.Marionette.ItemView.extend({
        tagName: 'td',
        template: '#fieldCellTpl',

        ui: {
            input: 'input'
        },

        events: {
            'focus input': 'inputFocus',
            'keypress input': 'onInputKeyPress',
            'change input': 'onInputChange'
        },

        initialize: function () {
            this.listenTo(this.model, 'change:opened', this.render);
        },

        inputFocus: function () {
            Field.trigger('setCurrentCell', this.model);
        },

        onInputKeyPress: function (evt) {
            var key = evt.keyCode || evt.which;
            key = String.fromCharCode(key);
            
            var regex = /[1-9]/;
            if (regex.test(key)) {
                this.ui.input.val('');
                return;
            }
            evt.returnValue = false;
            if (evt.preventDefault)
                evt.preventDefault();
        },

        onInputChange: function () {
            var val = parseInt(this.ui.input.val());
            val = isNaN(val) ? 0 : val;
            this.model.set({ 'user-value': val });
        }
    });

    Field.Row = Backbone.Marionette.CollectionView.extend({
        tagName: 'tr',
        itemView: Field.Cell,

        initialize: function () {
            this.collection = this.model.get('cells');
        }
    });

    Field.View = Backbone.Marionette.CollectionView.extend({
        tagName: 'table',
        itemView: Field.Row,

        events: {
            'focus input': 'inputFocus'
        },

        initialize: function () {
            this.collection = this.model.get('rows');
        },

        inputFocus: function (evt) {
            this.$('input').removeClass('focused');
            $(evt.currentTarget).addClass('focused');
        }
    });
});
