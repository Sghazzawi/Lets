define(['socketio'],function(io){
  var socket;
  var factory = function(){};
  factory.prototype.getSocket = function () {
    if (!socket) {
      socket = io.connect('senetgam.es');
    } 
    return socket;
  }
  return new factory();
});
