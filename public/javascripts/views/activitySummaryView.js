define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'addTagView'
       ,'addURLView'
       ,'addNoteView'
       ,'hbs!javascripts/views/templates/activitySummaryTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, AddTagView, AddURLView, AddNoteView, activitySummaryTemplate) {
    var activitySummaryView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render','addTag', 'addNote', 'addURL', 'scheduleActivity', 'removeActivity');
        this.model.on('change',this.render);
        this.render();
      },

      render: function () {
         $(this.el).empty();
         var context = this.model.toJSON();
         $(this.el).append(activitySummaryTemplate(context));
         this.$('.tag').on('click', this.addTag);
         this.$('.note').on('click', this.addNote);
         this.$('.url').on('click', this.addURL);
         this.$('.schedule').on('click', this.scheduleActivity);
         this.$('.close').on('click', this.removeActivity);
         return this;
      },

      addTag: function() {
        var addTagView = new AddTagView({model: this.model});
        this.$('.activityOptions').prepend(addTagView.el);
      },
      
      addNote: function() {
        var addNoteView = new AddNoteView({model: this.model});
        this.$('.activityOptions').prepend(addNoteView.el);
      },

      addURL: function() {
        var addURLView = new AddURLView({model: this.model});
        this.$('.activityOptions').prepend(addURLView.el);
      },

      scheduleActivity: function() {
      },
      
      removeActivity: function() {
        this.collection.remove(this.model);
      }

    });
    return activitySummaryView;
});
