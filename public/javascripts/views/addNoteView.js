define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'hbs!javascripts/views/templates/addTagTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, addTagTemplate) {
    var addNoteView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render', 'addNote', 'removeView');
        this.render();
      },

      render: function () {
       $(this.el).append(addTagTemplate({title: 'Add Note'}));
       this.$('.add').on('click', this.addNote);
       this.$('.close').on('click', this.removeView);
       this.$('input').focus();
       return this;
      },

      addNote: function() {
        var notes = _.clone(this.model.get('notes'));
        notes.push(this.$('input').val());
        this.model.set('notes',notes);
        console.log(this.model);
        this.remove();
      },

      removeView: function() {
        this.remove();
      }


    });
    return addNoteView;
});
