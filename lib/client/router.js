var Page = require('./view/page');

module.exports = new (Backbone.Router.extend({

    routes: {
        '(:fallback)': 'any'
    },

    events: {
        'comicjs:draw': 'draw',
        'comicjs:update': 'update'
    },

    initialize: function () {
        _.bindAll(this, 'start', 'draw', 'update');
    },

    any: function (id) {
        if (_.isString(id) && id.match(/^[0-9]+$/)) {
            this.page(id);
        } else {
            this.navigate('1');
        }
    },

    page: function (index) {
        this.page = new Page({
            index: parseInt(index, 10)
        }).render()
        $('#content').html(this.page.el);
    },

    draw: function () {
        if (this.page && _.isFunction(this.page.draw)) {
            this.page.draw();
        }
    },

    update: function () {},

    start: function () {
        Backbone.history.start();
        _.each(_.keys(this.events), function (event) {
            Backbone.Events.on(event, this[this.events[event]]);
        }, this);
    }

}));