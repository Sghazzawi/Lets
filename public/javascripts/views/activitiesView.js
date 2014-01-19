define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'activitySummaryView'
       ,'hbs!javascripts/views/templates/activitiesTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, ActivitySummaryView, activitiesTemplate) {
    var mainView = Backbone.View.extend({
      el: $('#events'),

      initialize:  function () {
        _.bindAll(this, 'render','onSuccess','appendEvent', 'removeEvent');
        this.collection.bind('add', this.appendEvent);
        this.collection.bind('remove', this.removeEvent);
        this.render();
      },

      render: function () {
         $(this.el).append(activitiesTemplate());
         this.collection.each(function(activity) {
             var activitySummaryView = new ActivitySummaryView({model: activity, collection: this.collection});
             this.$('.row.activities').append(activitySummaryView.el);
         }.bind(this));
      },
      onSuccess : function (model) {
            console.log(model);
            this.$el.empty();
            this.render();
      },
      appendEvent: function (model) {
        model.save( null, {
          success: this.onSuccess(model) 
        });
      },
      removeEvent: function (model) {
        model.destroy({
          success: this.onSuccess(model) 
        });
      }
    });
    return mainView;
});
