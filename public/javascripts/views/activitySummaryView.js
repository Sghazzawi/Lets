define(['jquery'
       ,'underscore'
       ,'backbone'
       ,'handlebars'
       ,'addTagView'
       ,'addURLView'
       ,'addNoteView'
       ,'addDateView'
       ,'hbs!javascripts/views/templates/activitySummaryTemplate'
       , 'bootstrap'], function($, _, Backbone, HandleBars, AddTagView, AddURLView, AddNoteView, AddDateView, activitySummaryTemplate) {
    var activitySummaryView = Backbone.View.extend({
      events: {
      },

      initialize:  function () {
        _.bindAll(this, 'render','addTag', 'addNote', 'addURL', 'scheduleActivity', 'removeActivity', 'refreshView');
        this.model.on('change',this.refreshView);
        this.render();
      },

      render: function () {
         this.$el.addClass("activity");
         var context = this.model.toJSON();
         $(this.el).prepend(activitySummaryTemplate(context));
         this.$('.tag').on('click', this.addTag);
         this.$('.note').on('click', this.addNote);
         this.$('.url').on('click', this.addURL);
         this.$('.schedule').on('click', this.scheduleActivity);
         this.$('.close').on('click', this.removeActivity);
         this.$('.thumbnail.loading img').load( 
           function() {$(this).parent().removeClass('loading');
         });
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
        var addDateView = new AddDateView({model: this.model});
        this.$('.activityOptions').prepend(addDateView.el);
      },
      
      removeActivity: function() {
        this.model.destroy();
      },

      refreshView: function() {
        this.$el.empty();
        this.render();
      }

    });
    return activitySummaryView;
});
