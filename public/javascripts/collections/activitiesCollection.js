define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'realTimeModel'
       ,'socketFactory'], function($, _, Backbone, ActivityModel,SocketFactory) {
    var activitiesCollection = Backbone.Collection.extend({
        initialize: function() {
          var self = this;
          _.bindAll(this, 'sendCreate','persistModel');
          this.on('add', this.persistModel);
          this.socket = SocketFactory.getSocket(); 
          this.socket.on('delete',function(id) {
            self.remove(self.get(id));
          });
          this.socket.on('create',function(model) {
            self.add(new ActivityModel(model),{serverPush: true});
          });
        },
        model: ActivityModel,
        url: '/letsdoit/activities',
        sendCreate: function(model) {
          model.trigger('newSave');
          this.socket.emit('create',model);
        },
        persistModel: function (model, collection, options) {
          if (!options.serverPush) {
            model.save(null,{success:this.sendCreate});
          }
        }
    });
    return activitiesCollection;
});
