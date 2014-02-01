define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'hbs!javascripts/views/templates/activityTemplate'], function ($,_,Backbone,activityTemplate) {
  var ActivityView = Backbone.View.extend ({
  initialize: function() {
    _.bindAll(this, 'render');
    this.render();
  },

  render: function () {
    this.$el.addClass('activity container');
    var context = this.model.toJSON();
    $(this.el).prepend(activityTemplate(context));
  }
  });
  return ActivityView;     
});
