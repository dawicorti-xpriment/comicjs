module.exports = new (Backbone.Model.extend({

    defaults: {
        width: window.innerWidth,
        height: window.innerHeight
    }

}));