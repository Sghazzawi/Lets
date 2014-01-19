define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'activityModel'], function($, _, Backbone, ActivityModel) {
    var activitiesCollection = Backbone.Collection.extend({
        initialize: function() {
          this.on("change", this.updateModel);
        },
        model: ActivityModel,
        url: '/letsdoit/activities',
        updateModel: function(model) {
          model.save();
        }
    });
    return activitiesCollection;
});
