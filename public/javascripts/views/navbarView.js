define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'hbs!javascripts/views/templates/navbarTemplate'], function ($,_,Backbone,navbarTemplate) {
  var navbarView = Backbone.View.extend({
    tagName: 'header',
    initialize: function () {
      _.bindAll(this,'render');
      this.render();
    },
    render: function () {
      this.$el.addClass('navbar navbar-default navbar-fixed-top');
      this.$el.append(navbarTemplate());
    }
  });
  return navbarView;
});
