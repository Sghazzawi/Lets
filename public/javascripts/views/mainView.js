define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'activitiesView'
       ,'addActivityView'
       ,'activityModel'
       ,'activitiesCollection'
       ,'hbs!javascripts/views/templates/mainTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivitiesView, AddActivityView, ActivityModel, ActivitiesCollection, mainTemplate) {
    var mainView = Backbone.View.extend({
      el: $('#header'),

      initialize:  function () {
        _.bindAll(this, 'render');
        this.activitiesCollection = new ActivitiesCollection();
        this.activitiesCollection.fetch();
        this.render();
      },

      render: function () {
        $(this.el).append(Handlebars.compile(mainTemplate()));
        var addActivityView = new AddActivityView({collection: this.activitiesCollection})
        var activitiesView = new ActivitiesView({collection: this.activitiesCollection})
      }
    });
    return mainView;
});
