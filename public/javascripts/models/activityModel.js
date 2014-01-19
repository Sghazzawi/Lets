define(['jquery'
       ,'underscore'
       ,'backbone'], function($, _, Backbone) {
    var activityModel = Backbone.Model.extend({
      idAttribute: "_id"

    });
    return activityModel;
});
