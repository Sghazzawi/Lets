define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'activityModel'
       ,'hbs!javascripts/views/templates/addActivityTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivityModel, addActivityTemplate) {
    var mainView = Backbone.View.extend({
      el: $('#addEvent'),

      events:{
          'click .addEvent button': 'addEvent'
      },

      initialize:  function () {
        _.bindAll(this, 'render', 'addEvent');
        this.render();
      },

      render: function () {
        $(this.el).append(Handlebars.compile(addActivityTemplate()));
      },
      
      addEvent: function () {
        var activityModel= new ActivityModel();
        activityModel.set('title', $('.addEvent input[type="text"]').val());
        activityModel.set('createdAt', Date.now());
        this.collection.add(activityModel);
      }
    });
    return mainView;
});
