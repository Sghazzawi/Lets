define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'hbs!javascripts/views/templates/addTagTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, addTagTemplate) {
    var addTagView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render', 'addTag', 'removeView');
        this.render();
      },

      render: function () {
       $(this.el).append(addTagTemplate({title: 'Add Tag'}));
       this.$('.add').on('click', this.addTag);
       this.$('.close').on('click', this.removeView);
       return this;
      },

      addTag: function() {
        var tags = _.clone(this.model.get('tags'));
        tags.push(this.$('input').val());
        this.model.set('tags',tags);
        console.log(this.model);
        this.remove();
      },


      removeView: function() {
        this.remove();
      }

    });
    return addTagView;
});
