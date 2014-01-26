define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'activitySummaryView'
       ,'hbs!javascripts/views/templates/activitiesTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivitySummaryView, activitiesTemplate) {
    var activitiesView = Backbone.View.extend({

      initialize:  function () {
        _.bindAll(this, 'render', 'refreshView');
        this.collection.bind('add', this.refreshView);
        this.collection.bind('newSave', this.refreshView);
        this.collection.bind('destroy',this.refreshView);
        this.collection.bind('remove',this.refreshView);
        this.render();
      },

      render: function () {
         this.$el.addClass("events");
         $(this.el).append(activitiesTemplate());
         this.collection.each(function(activity) {
             var activitySummaryView = new ActivitySummaryView({model: activity, collection: this.collection});
             this.$('.row.activities').prepend(activitySummaryView.el);
         }.bind(this));
      },
      refreshView : function (model, collections, options) {
            console.log('refreshing view');
            this.$el.empty();
            this.render();
     }
    });
    return activitiesView;
});
