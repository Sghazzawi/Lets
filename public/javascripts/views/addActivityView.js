define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'realTimeModel'
       ,'hbs!javascripts/views/templates/addActivityTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivityModel, addActivityTemplate) {
    var addActivityView = Backbone.View.extend({

      events:{
          'click .addEvent button': 'addEvent'
      },

      initialize:  function () {
        _.bindAll(this, 'render', 'addEvent');
        this.render();
      },

      render: function () {
        this.$el.addClass('addEvent');
        this.$el.append(Handlebars.compile(addActivityTemplate()));
        return this;
      },
      
      addEvent: function () {
        var activityModel= new ActivityModel();
        this.collection.add(activityModel);
        activityModel.set({'title':this.$('.addEvent input[type="text"]').val(),'createdAt': Date.now()});
        this.$('.addEvent input[type="text"]').val("");
      }
    });
    return addActivityView;
});
