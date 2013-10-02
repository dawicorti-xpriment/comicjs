var express = require('express');
var app = express();
var browserify = require('browserify');
var less = require('less');
var fs = require('fs');

app.set('view engine', 'jade');
app.set('views', __dirname);

app.get(/^\/*$/, function (req, res) {
    res.render('index');
});

app.get(/^\/*comic\.js/, function (req, res) {
    browserify().add('./lib/client/index.js').bundle(function (err, data) {
        res.send(data);
    });
});

app.get(/^\/*styles\.css/, function (req, res) {
    fs.readFile('./lib/client/style/main.less', function (e, data) {
        var parser = new(less.Parser)({paths: ['./lib/client/style']});

        parser.parse(data.toString(), function (e, tree) {
            if (!!e) {
                res.send(e);
            } else {
                res.send(tree.toCSS({ compress: true }));
            }
        });

    });
});

app.use('/components', express.static(__dirname + '/bower_components'));

app.listen(8888);
console.log('Listening on port 8888');