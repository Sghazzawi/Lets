define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'hbs!javascripts/views/templates/addDateTemplate'
       , 'bootstrap'
       , 'datePicker'], function($, _, Backbone, HandleBars, addDateTemplate) {
    var addDateView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render','addDate','removeView');
        this.render();
      },

      render: function () {
       $(this.el).append(addDateTemplate({title: 'Add Date'}));
       this.$('.add').on('click', this.addDate);
       this.$('.close').on('click', this.removeView);
       this.$('.datePicker').datepicker();
       return this;
     },
 
      addDate: function() {
        this.model.set('date',new Date(this.$('.datePicker').val()));
        console.log(this.model);
        this.remove();
      },

      removeView: function() {
        this.remove();
      }

    });
  return addDateView;
}); 
