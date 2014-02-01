/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , routes = require('./routes')
  , passport = require('passport')
  , authenticator = require('./auth')();


var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
  socket.on('change', function (data) {
    this.broadcast.to(data._id).emit('change', data);
  });
  socket.on('delete', function (data){
    this.broadcast.to(data).emit('delete', data);
  });
  socket.on('create', function(model) {
    console.log('sending create for '+model._id);
    this.broadcast.emit('create',model);
  });
  socket.on('join', function (room) {
    socket.join(room);
    console.log(this.id+' joined '+room);
  });
});

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
mongoose.connect('mongodb://localhost/activities');
db = mongoose.connection;

// Routes
app.get('/auth/google',
  authenticator.authenticate('google'),
  function(req, res){
});

app.get('/auth/google/callback',
  authenticator.authenticate('google', 
    {  
      successRedirect: 'http://senetgam.es/letsdoit', 
      failureRedirect: 'http://senetgam.es/login' 
    }),
  function(req, res) {
   console.log('redirecting');
});

app.get('/auth/twitter',
  authenticator.authenticate('twitter'),
  function(req, res){
});

app.get('/auth/twitter/callback',
  authenticator.authenticate('twitter', 
    {  
      successRedirect: 'http://senetgam.es/letsdoit', 
      failureRedirect: 'http://senetgam.es/login' 
    }),
  function(req, res) {
   console.log('redirecting');
});

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
