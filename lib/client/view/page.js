var display = require('../model/display');

module.exports = Backbone.View.extend({

    className: 'reader',

    initialize: function (options) {
        _.bindAll(this, 'draw', 'resize');
        this.index = options.index;
        this.y = 0;
        display.on('change', this.resize)
    },

    draw: function () {
        if ($('#board').width()) {
            this.y -= 1;
            this.ctx.drawImage(
                $('#board').get(0), 
                0, this.y,
                display.get('width'),
                $('#board').height() * display.get('width') / $('#board').width()
                
            );
        }
    },

    resize: function () {
        $(this.canvas)
            .attr('width', display.get('width'))
            .attr('height', display.get('height'));
    },

    render: function () {
        this.canvas = document.createElement('canvas');

        this.ctx = this.canvas.getContext('2d');
        this.$el.html(this.canvas);
        this.resize();
        return this;
    }

});