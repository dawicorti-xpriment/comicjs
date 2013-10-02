var Page = require('./view/page');

module.exports = new (Backbone.Router.extend({

    routes: {
        '(:fallback)': 'any'
    },

    any: function (id) {
        if (_.isString(id) && id.match(/^[0-9]+$/)) {
            this.page(id);
        } else {
            this.navigate('1');
        }
    },

    page: function (index) {
        $('#content').html(new Page({
            index: parseInt(index, 10)
        }).render().el);
    },

    start: function () {
        Backbone.history.start();
    }

}));