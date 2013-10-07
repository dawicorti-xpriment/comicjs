var display = require('./model/display');

var requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 1000 / 60);
            };
})();

function drawLoop() {
    Backbone.Events.trigger('comicjs:draw');
    requestAnimFrame(drawLoop);
}

function updateLoop() {
    Backbone.Events.trigger('comicjs:update');
    _.delay(updateLoop, 1000 / 30);
}



drawLoop();
updateLoop();

$(window).on('resize', function () {
    display.set({
        width: window.innerWidth,
        height: window.innerHeight
    })
});

$(require('./router').start);