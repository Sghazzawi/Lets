define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'hbs!javascripts/views/templates/addTagTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, addTagTemplate) {
    var addURLView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render', 'addURL', 'removeView');
        this.render();
      },

      render: function () {
       $(this.el).append(addTagTemplate({title: 'Add URL'}));
       this.$('.add').on('click', this.addURL);
       this.$('.close').on('click', this.removeView);
       this.$('input').focus();
       return this;
      },

      addURL: function() {
        var links = _.clone(this.model.get('links'));
        links.push({url:this.$('input').val()});
        this.model.set('links',links);
        console.log(this.model);
        this.remove();
      },

      removeView: function() {
        this.remove();
      }


    });
    return addURLView;
});
