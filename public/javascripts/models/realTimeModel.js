define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'socketFactory'], function($, _, Backbone,SocketFactory) {
    var realTimeModel = Backbone.Model.extend({
      idAttribute: "_id",
      joinedRoom: false,
      initialize: function() {
        _.bindAll(this, 'sendChange','persistModel','sendDelete');
        var self = this;
        this.socket = SocketFactory.getSocket();
        this.on("change", this.persistModel);
        this.on("destroy", this.sendDelete);
        this.socket.on('change',function(data) {
          if (data._id == self.id) {
            self.set(data,{serverPush:true}); 
          }
        });
        if (!this.isNew() && !this.joinedRoom){
          this.socket.emit('join',this.id);
          this.joinedRoom = true;
        }
 
      },

      sendDelete: function() {
        this.socket.emit('delete',this.id);
      },
      persistModel: function(model, options) {
        console.dir(this.changedAttributes());
        console.log(this.isNew());
        if (!this.isNew()) {
          model.save(null,{
            success: this.sendChange
          });
        }
      },
      sendChange: function() {
        if (!this.isNew()){
          this.socket.emit('change', this.toJSON());
          if (!this.joinedRoom) {
            this.socket.emit('join',this.id);
            this.joinedRoom = true;
          }
        }
      }
    });
    return realTimeModel;
});
