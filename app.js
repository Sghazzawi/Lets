/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger());
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
mongoose.connect('mongodb://localhost/activities');
db = mongoose.connection;

// Routes

app.get('/', routes.index);
app.get('/activities', routes.getAllActivities);
app.post('/activities',routes.addActivity);
app.put('/activities/:id', routes.updateActivity);
app.del('/activities/:id', routes.deleteActivity);

db.once('open', function() {
    app.listen(3001, function(){
        console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
    });
});
