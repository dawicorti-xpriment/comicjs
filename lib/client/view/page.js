module.exports = Backbone.View.extend({

    tagName: 'canvas',
    className: 'reader',

    initialize: function (options) {
        this.index = options.index;
    },

    render: function () {
        this.$el.css('width', window.innerWidth).css('height', window.innerHeight);
        return this;
    }

});