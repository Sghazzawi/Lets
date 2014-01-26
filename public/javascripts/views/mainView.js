define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'activitiesView'
       ,'addActivityView'
       ,'activityModel'
       ,'activitiesCollection'
       ,'socketio'
       ,'hbs!javascripts/views/templates/mainTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivitiesView, AddActivityView, ActivityModel, ActivitiesCollection, io, mainTemplate) {
    var mainView = Backbone.View.extend({

      initialize:  function () {
        _.bindAll(this, 'render');
        this.render();
      },

      render: function () {
        this.$el.addClass("main container");
        this.$el.append(Handlebars.compile(mainTemplate()));
        this.addActivityView = new AddActivityView({collection: this.collection});
        this.activitiesView = new ActivitiesView({collection: this.collection});
        this.$el.append(this.addActivityView.$el);
        this.$el.append(this.activitiesView.$el);
      }
    });
    return mainView;
});
